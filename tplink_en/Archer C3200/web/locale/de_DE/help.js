(function($) {

    $.helpContent = {
        trafficCtrl: {
            TITLE: "Datenratenkontrolle",
            CONTENT: [{
                type: "paragraph",
                content: "Mit der Datenratenkontrolle können Sie die Upstream- und Downstream-Transferrate des Netzwerks konfigurieren, wobei der kombinierte Durchsatz 1.000.000 kBit/s nicht überschreiten sollte. Wählen Sie für optimale Datenratenkontrolle den korrekten Leitungstyp, und erkundigen Sie sich bei Ihrem Internetanbieter über die zulässige Gesamt-Transferrate für Upstream und Downstream."
            }, {
                type: "name",
                title: "Aktivieren",
                content: "Markieren Sie das Kontrollkästchen, um die Datenratenkontroll-Funktion zu aktivieren."
            }, {
                type: "name",
                title: "Gesamt-Upstream-Transferrate ",
                content: "Geben Sie die Gesamt-Upload-Geschwindigkeit durch den WAN-Port ein."
            }, {
                type: "name",
                title: "Gesamt-Downstream-Transferrate",
                content: "Geben Sie die Download-Geschwindigkeit durch den WAN-Port ein."
            }, {
                type: "title",
                content: "Kontrollbedingungen"
            }, {
                type: "name",
                title: "Beschreibung",
                content: "Zeigt den kontrollierten IP-Bereich oder Port-Bereich an."
            }, {
                type: "name",
                title: "Priorität",
                content: "Zeigt die Prioritätsstufe der Regel an, wobei 1 die höchste Prioritätsstufe ist, und 8 die niedrigste. Die Gesamt-Upload- und Download-Transferrate wird zugeteilt, um die Mindestrate aller Datenratenkontrollregeln zu gewährleisten."
            }, {
                type: "name",
                title: "Up (min/max) ",
                content: "Zeigt die minimale und maximale Upload-Transferrate in kBit/s an."
            }, {
                type: "name",
                title: "Down (min/max)",
                content: "Zeigt die minimale und maximale Download-Transferrate in kBit/s an."
            }, {
                type: "name",
                title: "Aktivieren",
                content: "Zeigt den aktuellen Status einer Regel an. Durch Klicken auf das Ballonsymbol wird die Regel aktiviert oder deaktiviert."
            }, {
                type: "name",
                title: "Ändern",
                content: "Zeigt die Optionen an, um die entsprechende Regel zu ändern oder zu löschen."
            }, {
                type: "note",
                title: "Hinzufügen einer neuen Regel",
                content: [
                    "Klicken Sie auf „Hinzufügen“. ",
                    "Geben Sie einen Bereich von zu kontrollierenden IP-Adressen ein.",
                    "Geben Sie einen Bereich von zu kontrollierenden Portnummern ein.",
                    "Wählen Sie den Protokolltyp für diese Regel.",
                    "Wählen Sie eine Prioritätsstufe für diese Regel. (Die höchste Prioritätsstufe ist 1.)",
                    "Geben Sie die minimale und maximale Upload-Transferrate (in kBit/s) durch den WAN-Port an.",
                    "Geben Sie die minimale und maximale Download-Transferrate (in kBit/s) durch den WAN-Port an.",
                    "Klicken Sie auf „Diesen Eintrag aktivieren“.",
                    "Klicken Sie auf OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Löschen mehrerer Regeln</strong><br>Markieren Sie in der Liste der Kontrollregeln alle Kontrollkästchen der Regeln, die Sie löschen möchten, und klicken Sie oberhalb der Tabelle auf „Löschen“."
            }]
        },
        accessControl: {
            TITLE: "Zugriffskontrolle",
            CONTENT: [{
                type: "paragraph",
                content: "Mit Hilfe der Zugriffskontrolle kann der Zugriff auf Ihr Netzwerk für bestimmte Computer und andere Geräte gestattet oder blockiert werden. Wenn ein Gerät blockiert ist, kann es zwar vom Router eine IP-Adresse bekommen, jedoch nicht mit anderen Geräten kommunizieren oder sich mit dem Internet verbinden. "
            }, {
                type: "paragraph",
                content: "<strong>Hinweis: </strong>Um die Zugriffskontrolle zu verwenden, aktivieren Sie diese Funktion und befolgen Sie die Anweisungen der Bedienungsanleitung. Wenn die Zugriffskontrolle deaktiviert ist, können alle Geräte auf Ihr Netzwerk zugreifen, auch jene auf der Blacklist."
            }, {
                type: "name",
                title: "Zugriffskontrolle",
                content: "Schalten Sie dies ein, um die Zugriffskontrollfunktion zu aktivieren."
            }, {
                type: "title",
                content: "Zugriffsmodus"
            }, {
                type: "name",
                title: "Blacklist",
                content: "Der Zugriff von den Geräten in der Liste unten wird verhindert."
            }, {
                type: "name",
                title: "Whitelist",
                content: "Der Zugriff wird nur von den Geräten in der Liste unten gestattet."
            }, {
                type: "title",
                content: "Geräte auf der Blacklist/Whitelist"
            }, {
                type: "note",
                title: "<strong>So setzen Sie ein Gerät auf die Whitelist bzw. auf die Blacklist</strong>",
                content: [
                    "Klicken Sie Hinzufügen.",
                    "Geben Sie den Gerätenamen ein.",
                    "Geben Sie die MAC-Adresse des Geräts ein.",
                    "Klicken Sie auf OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Ändern oder Löschen eines Geräts in der Blacklist/Whitelist</strong><br>Klicken Sie in der Blacklist/Whitelist-Tabelle auf das „Bearbeiten“-Symbol oder das „Papierkorb“-Symbol des Geräts, das Sie bearbeiten oder löschen möchten."
            }, {
                type: "paragraph",
                content: "<strong>Löschen mehrerer Geräte in der Blacklist/Whitelist</strong><br>Wählen Sie in der Blacklist/Whitelist-Tabelle alle Geräte, die Sie löschen möchten, und klicken Sie oberhalb der Tabelle auf „Löschen“."
            }, {
                type: "title",
                content: "Geräte online"
            }, {
                type: "name",
                title: "Gerätename",
                content: "Zeigt den Namen des verbundenen Geräts an."
            }, {
                type: "name",
                title: "IP-Adresse",
                content: "Zeigt die IP-Adresse des verbundenen Geräts an."
            }, {
                type: "name",
                title: "MAC-Adresse",
                content: "Zeigt die MAC-Adresse des verbundenen Geräts an."
            }, {
                type: "name",
                title: "Verbindungstyp",
                content: "Zeigt die Art der Verbindung des verbundenen Geräts an (kabelgebunden oder drahtlos). "
            }, {
                type: "paragraph",
                content: "<strong>Ein oder mehrere Geräte blockieren</strong><br>Wählen Sie in der Tabelle „Geräte online“ jene Geräte, die Sie blockieren möchten, und klicken Sie oberhalb der Tabelle auf „Blockieren“. Die ausgewählten Geräte werden automatisch zu den Geräten in der Blacklist hinzugefügt."
            }]
        },
        arpBind: {
            TITLE: "Einstellungen",
            CONTENT: [{
                type: "paragraph",
                content: "Die IP-/MAC-Adressbindung (auch als ARP-Bindung bekannt) ist nützlich zur Kontrolle des Zugriffs eines bestimmten Computers im LAN durch Binden der IP-Adresse und der MAC-Adresse des Geräts. Die IP-/MAC-Adressbindung verhindert auch, dass andere Geräte eine bestimmten IP-Adresse verwenden."
            }, {
                type: "name",
                title: "IP-/MAC-Adressbindung",
                content: "Aktivieren Sie dies, um die IP-/MAC-Adressbindungs-Funktion zu aktivieren."
            }, {
                type: "title",
                title: "Bindungsliste"
            }, {
                type: "note",
                title: "<strong>Einrichten eines Geräts mit ARP-Bindung</strong>",
                content: [
                    "Klicken Sie auf „Hinzufügen“.",
                    "Geben Sie die MAC-Adresse des Geräts ein.",
                    "Geben Sie eine IP-Adresse an, die Sie an die obige MAC-Adresse binden möchten.",
                    "Wählen Sie „Aktivieren“.",
                    "Klicken Sie auf OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Ändern oder Löschen eines Eintrags</strong><br>Klicken Sie in der Bindungsliste auf das „Bearbeiten“-Symbol oder das „Papierkorb“-Symbol des Eintrags, den Sie bearbeiten oder löschen möchten."
            }, {
                type: "paragraph",
                content: "<strong>Löschen mehrerer Einträge</strong><br>Wählen Sie in der Bindungsliste alle Einträge, die Sie löschen möchten, und klicken Sie oberhalb der Tabelle auf „Löschen“."
            }, {
                type: "title",
                title: "ARP-Liste"
            }, {
                type: "paragraph",
                content: "Zeigt die MAC- und IP-Adressen der aktuell verbundenen Geräte an."
            }, {
                type: "name",
                title: "Gerätename",
                content: "Zeigt den Namen des verbundenen Geräts an."
            }, {
                type: "name",
                title: "MAC-Adresse",
                content: "Zeigt die MAC-Adresse des verbundenen Geräts an."
            }, {
                type: "name",
                title: "IP-Adresse",
                content: "Zeigt die dem verbundenen Gerät zugewiesene IP-Adresse an."
            }, {
                type: "name",
                title: "Gebunden",
                content: "Zeigt an, ob die MAC- und IP-Adressen gebunden sind oder nicht."
            }, {
                type: "name",
                title: "Ändern",
                content: "Zeigt Optionen zum Löschen der entsprechenden Einträge aus der Liste an."
            }, {
                type: "paragraph",
                content: "<strong>Hinweis: </strong>Sie können dieselbe IP-Adresse nur an eine MAC-Adresse binden."
            }, {
                type: "paragraph",
                content: "<strong>Binden mehrerer Geräte</strong><br>Wählen Sie in der ARP-Liste alle Geräte aus, deren IP-Adressen an ihre MAC-Adressen gebunden werden sollen, und klicken Sie oberhalb der Tabelle auf „Binden“."
            }]
        },
        alg: {
            TITLE: "Application Layer Gateway (ALG)",
            CONTENT: [{
                    type: "paragraph",
                    content: "Ein ALG gibt Ihnen die Möglichkeit, Network Address Translation (NAT) Verschubfilter an das Gateway anzustecken, um die Adress- und Portübersetzung für bestimmte Anwendungsschicht-„Kontroll/Daten“-Protokolle zu unterstützen. FTP, TFTP, H323 etc. Das Aktivieren von ALG wird empfohlen."
                }, {
                    type: "name",
                    title: "PPTP-Passthrough",
                    content: "Wenn Sie dieses Kontrollkästchen markieren, wird die PPTP-Passthrough-Funktion aktiviert, um zu ermöglichen, dass Punkt-zu-Punkt-Sitzungen durch ein IP-Netzwerk getunnelt und durch den Router geführt werden."
                }, {
                    type: "name",
                    title: "L2TP-Passthrough",
                    content: "Wenn Sie dieses Kontrollkästchen markieren, wird die L2TP-Passthrough-Funktion aktiviert, um zu ermöglichen, dass Layer-2-Punkt-zu-Punkt-Sitzungen durch ein IP-Netzwerk getunnelt und durch den Router geführt werden."
                }, {
                    type: "name",
                    title: "IPsec-Passthrough",
                    content: "Wenn Sie dieses Kontrollkästchen markieren, wird die IPsec-Passthrough-Funktion aktiviert, um zu ermöglichen, dass die Internet-Protokoll-Sicherheit (IPsec) durch ein IP-Netzwerk getunnelt und durch den Router geführt wird. Bei IPsec werden kryptografische Sicherheitsdienste eingesetzt, um private und sichere Kommunikation über IP-Netzwerke zu gewährleisten."
                }, {
                    type: "name",
                    title: "FTP-ALG",
                    content: "Markieren Sie dieses Kontrollkästchen, um die FTP-ALG-Funktion zu aktivieren, damit FTP- (File Transfer Protocol) -Clients und -Server Daten über NAT übertragen können."
                }, {
                    type: "name",
                    title: "TFTP-ALG",
                    content: "Markieren Sie dieses Kontrollkästchen, um die TFTP-ALG-Funktion zu aktivieren, damit TFTP- (Trivial File Transfer Protocol) -Clients und -Server Daten über NAT übertragen können."
                }, {
                    type: "name",
                    title: "RTSP-ALG",
                    content: "Wenn dies ausgewählt ist, können Mediaplayer-Clients mit Streaming-Media-Servern über NAT kommunizieren."
                }, {
                    type: "name",
                    title: "H323-ALG",
                    content: "Markieren Sie dieses Kontrollkästchen, um die H323-ALG-Funktion zu aktivieren, damit Microsoft NetMeeting-Clients über NAT kommunizieren können."
                }, {
                    type: "name",
                    title: "SIP-ALG",
                    content: "Markieren Sie dieses Kontrollkästchen, um die SIP-ALG-Funktion zu aktivieren, damit SIP-Clients und -Server Daten über NAT übertragen können."
                }, {
                    type: "name",
                    title: "Speichern",
                    content: "Klicken Sie hier, um alle Ihre Einstellungen zu speichern."
                }

            ]
        },
        virtualServer: {
            TITLE: "Virtuelle Server",
            CONTENT: [{
                type: "paragraph",
                content: "Virtuelle Server werden verwendet, um in Ihrem lokalen Netzwerk öffentliche Dienste zur Verfügung zu stellen. Ein virtueller Server ist als externer Port definiert, und alle Anforderungen vom Internet an diesen externen Port werden an einen bestimmten Computer weitergeleitet, der mit einer statischen oder reservierten IP-Adresse konfiguriert sein muss."
            }, {
                type: "name",
                title: "Diensttyp",
                content: " Zeigt den Namen Ihres virtuellen Servers an."
            }, {
                type: "name",
                title: "Externer Port",
                content: "Zeigt die Portnummer eines vom virtuellen Server verwendeten Bereichs an Ports an. "
            }, {
                type: "name",
                title: "Interne IP-Adresse",
                content: "Zeigt die IP-Adresse des Computers an, der die Dienstanwendung ausführt."
            }, {
                type: "name",
                title: "Interner Port",
                content: "Zeigt die Portnummer des Computers an, der die Dienstanwendung ausführt."
            }, {
                type: "name",
                title: "Protokoll",
                content: "Zeigt das für die Dienstanwendung verwendete Protokoll an: TCP, UDP oder Alle (alle vom Router unterstützten Protokolle)."
            }, {
                type: "name",
                title: "Status",
                content: "Zeigt den aktuellen Status eines virtuellen Servers an. Durch Klicken auf das Ballonsymbol wird der Eintrag des virtuellen Servers aktiviert oder deaktiviert."
            }, {
                type: "name",
                title: "Ändern",
                content: "Zeigt die Optionen an, um die entsprechende Regel zu ändern oder zu löschen."
            }, {
                type: "note",
                title: "<strong>Hinzufügen eines virtuellen Server-Eintrags</strong>",
                content: [
                    "Klicken Sie auf „Hinzufügen“.",
                    "Wählen Sie einen Schnittstellennamen aus der Dropdown-Liste aus.",
                    "Klicken Sie auf „Beliebte Anwendungen anzeigen“, um aus der Liste einen Dienst auszuwählen und automatisch die entsprechende Portnummer in den Feldern des externen und internen Ports auszufüllen. Wenn der Dienst nicht aufgeführt ist, geben Sie die Nummer des externen Ports ein (z. B. 21) oder einen Bereich von Ports (z. B. 21–25) an. Lassen Sie das Feld „Interner Port“ leer, wenn es sich um denselben handelt wie der externe Port, oder geben Sie eine bestimmte Portnummer (z. B. 21) ein, wenn der externe Port ein einzelner Port ist. ",
                    "Geben Sie die IP-Adresse des Computers, der die Dienstanwendung ausführt, in Dezimalpunktschreibweise in das Feld der internen IP-Adresse ein.",
                    "Wählen Sie ein Protokoll für die Dienstanwendung: TCP, UDP oder Alle (aus der Protokoll-Dropdown-Liste).",
                    "Klicken Sie auf „Diesen Eintrag aktivieren“.",
                    "Klicken Sie auf OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Ändern oder Löschen eines virtuellen Server-Eintrags</strong><br>Klicken Sie auf das „Bearbeiten“- oder „Löschen“-Symbol des entsprechenden Eintrags."
            }, {
                type: "paragraph",
                content: "<strong>Löschen mehrerer Einträge</strong><br>Wählen Sie alle Einträge virtueller Server, die Sie löschen möchten, und klicken Sie oberhalb der Tabelle auf „Löschen“."
            }, {
                type: "paragraph",
                content: "<strong>Hinweis:</strong><br>Wenn Ihr lokales Host-Gerät mehr als eine Art verfügbarer Dienste hostet, müssen Sie für jeden Dienst einen eigenen virtuellen Server erstellen."
            }]
        },
        portTrigger: {
            TITLE: "Port-Triggering",
            CONTENT: [{
                type: "paragraph",
                content: "Port-Triggering wird verwendet, um Datenverkehr an einem bestimmten Port auf einen bestimmten Server im Netzwerk weiterzuleiten.  "
            }, {
                type: "name",
                title: "Anwendung",
                content: "Zeigt den Namen der Anwendung an."
            }, {
                type: "name",
                title: "Triggering-Port",
                content: "Zeigt den Port für ausgehenden Datenverkehr an, der verwendet wird, um eine Filterregel einer ausgehenden Verbindung auszulösen."
            }, {
                type: "name",
                title: "Triggering-Protokoll",
                content: "Zeigt das für den Triggering-Port verwendete Protokoll an. TCP, UDP oder Alle (alle vom Router unterstützten Protokolle)."
            }, {
                type: "name",
                title: "Externer Port",
                content: "Zeigt den vom Remote-System verwendeten Port oder Portbereich an. Eine Antwort, die einen dieser Ports verwendet, wird an den PC weitergeleitet, der diese Regel auslöst. Sie können höchstens 5 Gruppen von Ports (oder Portabschnitten) eingeben. Jede Gruppe von Ports muss durch ein Komma von den anderen getrennt sein, zum Beispiel: 2000–2038, 2046, 2050–2051, 2085, 3010–3030."
            }, {
                type: "name",
                title: "Externes Protokoll",
                content: "Zeigt das für den eingehenden Port verwendete Protokoll an: TCP, UDP oder Alle (alle vom Router unterstützten Protokolle)."
            }, {
                type: "name",
                title: "Status",
                content: "Zeigt den aktuellen Status eines Port-Triggering-Eintrags an. Durch Klicken auf das Ballonsymbol wird der Eintrag aktiviert oder deaktiviert."
            }, {
                type: "name",
                title: "Ändern",
                content: "Zeigt die Optionen an, um den entsprechenden Eintrag zu ändern oder zu löschen."
            }, {
                type: "note",
                title: "<strong>Einrichten eines Port-Triggering-Eintrags</strong><br><strong>Hinweis: </strong> Jeder Eintrag kann nur von einem Host gleichzeitig verwendet werden.",
                content: [
                    "Klicken Sie auf „Hinzufügen“.",
                    "Wählen Sie einen Schnittstellennamen aus der Dropdown-Liste aus.",
                    "Klicken Sie auf „Beliebte Anwendungen anzeigen“, um aus der Liste eine Anwendung auszuwählen und automatisch die Standardwerte in den entsprechenden Feldern auszufüllen. Wenn Sie eine nicht aufgeführte Anwendung hinzufügen möchten, geben Sie manuell die Anwendung, Triggering-Port, Triggering-Protokoll, externen Port und externes Protokoll ein. </strong> Die Bereiche der Port-Triggering-Einträge dürfen sich nicht überlappen (Eintrag 1 hat z. B. den Portbereich 4200–4205, Eintrag 2 kann also nicht den Portbereich 4203–4206 haben).",
                    "Klicken Sie auf „Diesen Eintrag aktivieren“.",
                    "Klicken Sie auf OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Ändern oder Löschen eines Port-Triggering-Eintrags</strong><br>Klicken Sie in der Tabelle auf das „Bearbeiten“-Symbol oder das „Papierkorb“-Symbol des Eintrags, den Sie bearbeiten oder löschen möchten."
            }, {
                type: "paragraph",
                content: "<strong>Löschen mehrerer Port-Triggering-Einträge</strong><br>Wählen Sie in der Tabelle alle Einträge, die Sie löschen möchten, und klicken Sie oberhalb der Tabelle auf „Löschen“."
            }]
        },
        dmz: {
            TITLE: "DMZ",
            CONTENT: [{
                type: "paragraph",
                content: "Die Host-Funktion DMZ (Demilitarized Zone, entmilitarisierte Zone) ermöglicht einem lokalen Host, für einen speziellen Dienst dem Internet ausgesetzt zu werden, wie z. B. Internetspiele oder Videokonferenzen. Grundsätzlich ermöglicht DMZ einem einzelnen Computer in Ihrem LAN, alle seine Ports zu öffnen. Dieser Computer muss mit einer statischen IP-Adresse konfiguriert werden, und seine DHCP-Client-Funktion muss deaktiviert sein."
            }, {
                type: "note",
                title: "<strong>Einen Computer oder Server als DMZ-Server definieren</strong>",
                content: [
                    "Wählen Sie „DMZ aktivieren“.",
                    "Geben Sie die IP-Adresse des lokalen Computers ein, der der DMZ-Host sein soll.",
                    "Klicken Sie auf „Speichern“."
                ]
            }]
        },
        upnp: {
            TITLE: "UPnP",
            CONTENT: [{
                type: "paragraph",
                content: "Standardmäßig ist die Universal-Plug-and-Play-Funktion (UPnP) aktiviert, so dass alle Geräte, wie z. B. Computer und Internetgeräte, automatisch einander erkennen und miteinander kommunizieren können."
            }, {
                type: "name",
                title: "UPnP",
                content: "Aktivieren/Deaktivieren von UPnP."
            }, {
                type: "title",
                content: "UPnP-Dienstliste"
            }, {
                type: "paragraph",
                content: "Die UPnP-Dienstliste zeigt die Informationen des UPnP-Geräts an."
            }, {
                type: "name",
                title: "Gesamtanzahl Clients",
                content: "Zeigt die Gesamtanzahl der UPnP-Geräte an."
            }, {
                type: "name",
                title: "Dienstbeschreibung",
                content: "Zeigt eine kurze Beschreibung des lokalen Hosts, der die UPnP-Anforderung einleitet."
            }, {
                type: "name",
                title: "Externer Port",
                content: "Zeigt den externen Port an, der vom lokalen Host geöffnet wird."
            }, {
                type: "name",
                title: "Protokoll",
                content: "Zeigt den Netzwerk-Protokolltyp an, der vom lokalen Host verwendet wird."
            }, {
                type: "name",
                title: "Interne IP-Adresse",
                content: "Zeigt die IP-Adresse des lokalen Hosts an."
            }, {
                type: "name",
                title: "Interner Port",
                content: "Zeigt den internen Port an, der vom lokalen Host geöffnet wird."
            }, {
                type: "paragraph",
                content: "Klicken Sie auf <strong>Aktualisieren</strong>, um die UPnP-Serverliste zu aktualisieren."
            }]
        },
        wlGuestDulBandAdv: {
            TITLE: "Gastnetz",
            CONTENT: [{
                type: "paragraph",
                content: "Mit der Gastnetz-Funktion können Sie ein separates drahtloses Netzwerk mit einem eigenen Netzwerknamen (SSID) und Passwort einrichten, das Ihre Gäste verwenden können, um auf das Internet zuzugreifen."
            }, {
                type: "title",
                content: "Einstellungen"
            }, {
                type: "name",
                title: "Gäste dürfen einander sehen",
                content: "Markieren Sie dieses Kontrollkästchen, damit drahtlose Geräte im Gastnetz miteinander kommunizieren können."
            }, {
                type: "name",
                title: "Gäste dürfen auf mein lokales Netz zugreifen",
                content: "Markieren Sie dieses Kontrollkästchen, damit drahtlose Geräte im Gastnetz auf Ihr lokales Netzwerk zugreifen können."
            }, {
                type: "name",
                title: "Speichern",
                content: "Klicken Sie hierauf, um alle Ihre Einstellungen zu speichern."
            }, {
                type: "title",
                content: "WLAN-Einstellungen"
            }, {
                type: "name",
                title: "2,4 GHz | 5 GHz-1 | 5 GHz-2 Gastnetz",
                content: "Klicken Sie auf die entsprechende Schaltfläche, um das 2,4 GHz | 5 GHz-1 | 5 GHz-2 Gastnetz zu aktivieren."
            }, {
                type: "name",
                title: "Gastnetz-SSID",
                content: "Sie können entweder die standardmäßige SSID verwenden oder einen neuen Namen mit 1 bis 32 Zeichen erstellen. Dieses Feld unterscheidet zwischen Groß- und Kleinschreibung."
            }, {
                type: "name",
                title: "Sicherheit",
                content: "Wählen Sie eine Sicherheitsoption für das Gastnetz:",
                children: [{
                    type: "name",
                    title: " Keine",
                    content: "Standardmäßig ist die Gastnetz-Sicherheit auf „Keine“ gesetzt; jeder kann darauf zugreifen."
                }, {
                    type: "name",
                    title: "WPA/WPA2 – Persönlich",
                    content: "Wählen Sie diese Option, um die standardmäßige Authentifizierungsmethode, basierend auf einem Pre-shared Key (PSK), auch Passphrase bezeichnet, zu aktivieren. Wenn es gewählt ist, konfigurieren Sie Folgendes.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Wählen Sie eine Sicherheitsversion für Ihr Gastnetz.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Diese Option unterstützt die mehrfache Umsetzung des WPA-Standards (Wi-Fi Protected Access), wie z. B. WPA und WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Diese Option unterstützt die AES-Verschlüsselung, die eine höhere Sicherheitsstufe als WPA-PSK bietet, und wird deshalb empfohlen."
                        }]
                    }, {
                        type: "name",
                        title: "Verschlüsselung",
                        content: "Wählen Sie eine Sicherheits-Verschlüsselungsart: Auto (für TKIP und AES), TKIP (Temporal Key Integrity Protocol) oder AES (Advanced Encryption Standard). Es wird NICHT empfohlen, die TKIP-Verschlüsselung zu wählen, wenn der Router im 802.11n-Modus betrieben wird, denn TKIP wird von 802.11n nicht unterstützt. Wenn TKIP ausgewählt ist, wird die WPS-Funktion deaktiviert."
                    }]
                }]
            }, {
                type: "name",
                title: "Passwort",
                content: "Legen Sie ein Passwort mit 8 bis 63 ASCII-Zeichen bzw. 8 bis 64 hexadezimalen Zeichen (0–9, a–f, A–F) fest."
            }, {
                type: "paragraph",
                content: "Die Hinweise für das 2,4-GHz-Gastnetz oben gelten auch für Ihre beiden 5 GHz-1 | 5 GHz-2 Gastnetz."
            }, {
                type: "name",
                title: "Speichern",
                content: "Klicken Sie hierauf, um alle Ihre Einstellungen zu speichern."
            }]
        },
        wirelessStat: {
            TITLE: "Geräte Online",
            CONTENT: [{
                type: "name",
                title: "MAC-Adresse",
                content: "Zeigt die MAC-Adresse des zugehörigen WLAN-Clients an."
            }, {
                type: "name",
                title: "Verbindungstyp",
                content: "Zeigt das Frequenzband (2,4 GHz oder 5 GHz) an, durch das der WLAN-Client verbunden ist."
            }, {
                type: "name",
                title: "Sicherheit",
                content: "Zeigt die Art der Sicherheit (Keine, WEP, WPA/WPA2-Persönlich oder WPA/WPA2-Enterprise) des zugehörigen WLAN-Clients an."
            }, {
                type: "name",
                title: "Empfangene Pakete",
                content: "Zeigt die Anzahl der vom zugehörigen WLAN-Client empfangenen Datenpakete an."
            }, {
                type: "name",
                title: "Gesendete Pakete",
                content: "Zeigt die Anzahl der vom zugehörigen WLAN-Client gesendeten Datenpakete an."
            }, {
				type: "name",
				title: "Übertragungsrate",
				content: "Zeigt die zuletzt gemessene Übertragungsrate des WLAN-Gerätes an."
			}, {
                type: "paragraph",
                content: "Klicken Sie auf <strong>Aktualisieren</strong>, um die Informationen auf dieser Seite zu aktualisieren."
            }]
        },
        wirelessAdv: {
            TITLE: "Erweiterte Einstellungen",
            CONTENT: [{
                type: "name",
                title: "2,4 GHz | 5 GHz-1 | 5 GHz-2",
                content: "Wählen Sie 2,4 GHz | 5 GHz-1 | 5 GHz-2 aus, um die erweiterten WLAN-Einstellungen festzulegen."
            }, {
                type: "name",
                title: "Ortungsintervall",
                content: "Geben Sie einen Wert zwischen 25 und 1000 in Millisekunden ein, um das Zeitintervall festzulegen, in dem der Router Ortungspakete aussendet, um das WLAN zu synchronisieren. Der Standardwert beträgt 100 Millisekunden."
            }, {
                type: "name",
                title: "RTS-Grenzwert",
                content: "Geben Sie einen Wert zwischen 1 und 2346 ein, um die Paketgröße der Datenübertragung durch den Router festzulegen. Standardmäßig beträgt die Größe des RTS-Grenzwerts (Request to Send; Sendeanforderung) 2346. Wenn die Paketgröße über den voreingestellten Grenzwert hinausgeht, sendet der Router Sendeanforderungs-Blöcke an eine bestimmte Empfangsstation und verhandelt das Senden eines Datenblocks, andernfalls wird das Paket sofort gesendet."
            }, {
                type: "name",
                title: "DTIM-Intervall",
                content: "Geben Sie einen Wert zwischen 1 und 255 ein, um das Intervall der Delivery Traffic Indication Message (DTIM) festzulegen. 1 bedeutet, dass das DTIM-Intervall dasselbe ist, wie das Ortungsintervall."
            }, {
                type: "name",
                title: "Gruppenschlüssel-Aktualisierungsintervall",
                content: " Geben Sie die Anzahl der Sekunden (mindestens 30) als Zeitintervall ein, nach dem der Schlüssel automatisch aktualisiert werden soll. Der Standardwert beträgt 0, das heißt, keine Schlüsselaktualisierung."
            }, {
                type: "name",
                title: "WMM",
                content: "Diese Funktion gewährleistet, dass Pakete mit Nachrichten hoher Priorität bevorzugt übertragen werden. WMM ist im 802.11n- oder 802.11ac-Modus zwingend aktiviert. Es wird dringend empfohlen, WMM zu aktivieren."
            }, {
                type: "name",
                title: "Short-GI",
                content: "Diese Funktion ist standardmäßig aktiviert, und sie wird empfohlen, um die Datenkapazität durch Verringerung des Schutzintervalls (Guard Interval, GI) zu erhöhen."
            }, {
                type: "name",
                title: "AP-Isolation",
                content: " Markieren Sie dieses Kontrollkästchen, um die AP-Isolationsfunktion zu aktivieren, die Ihnen gestattet, allen WLAN-Geräten in Ihrem Netzwerk zu verbieten, miteinander zu kommunizieren, ohne dabei deren Internetzugang einzuschränken. Standardmäßig ist die AP-Isolation aktiviert."
            }, {
                type: "title",
                content: "WDS"
            }, {
                type: "name",
                title: "WDS-Bridging",
                content: "Markieren Sie dieses Kontrollkästchen, um die WDS-Brückenfunktion (WDS = Wireless Distribution System) zu aktivieren, die dem Router erlaubt, eine Brücke mit einem anderen Zugangspunkt (Access Point, AP) in einem WLAN zu bilden. Wenn es aktiviert ist, konfigurieren Sie Folgendes:"
            }, {
                type: "name",
                title: "(zu überbrückende) SSID",
                content: "Geben Sie die SSID des WAP (Wireless Access Point) ein, an den sich Ihr Router als Client verbinden wird, oder verwenden Sie die Suchfunktion, um alle verfügbaren Netzwerke in Reichweite zu scannen und anzuzeigen."
            }, {
                type: "name",
                title: "(zu überbrückende) MAC-Adresse",
                content: "Geben Sie die MAC-Adresse des WAP, zu dem der Router als Client verbinden wird, in 12 hexadezimalen Zeichen (0–9, a–f, A–F), getrennt durch Bindestriche, ein. Wenn Sie ein Netzwerk durch die Suchfunktion wählen, wird das Feld der MAC-Adresse automatisch ausgefüllt."
            }, {
                type: "name",
                title: "Suchen",
                content: "Klicken Sie auf diese Schaltfläche, um MAC-Adresse, SSID, Signalstärke, Kanal und Sicherheitsinformationen aller in Reichweite verfügbaren drahtlosen Netzwerke anzuzeigen. Wenn Sie ein Netzwerk auswählen, werden seine SSID, MAC-Adresse und Sicherheit automatisch angezeigt.",
                children: [{
                    type: "name",
                    title: "AP-Liste",
                    content: "Zeigt die Informationen des APs an, an den sich Ihr Router verbinden kann."
                }, {
                    type: "name",
                    title: "MAC-Adresse",
                    content: "Zeigt die MAC-Adresse des APs an, an den sich Ihr Router als Client verbinden wird."
                }, {
                    type: "name",
                    title: "SSID",
                    content: "Zeigt die SSID des APs an, an den sich Ihr Router als Client verbinden wird."
                }, {
                    type: "name",
                    title: "Signalstärke",
                    content: "Zeigt die Signalstärke des APs an, an den sich Ihr Router als Client verbinden wird."
                }, {
                    type: "name",
                    title: "Kanal",
                    content: "Zeigt den Kanal des APs an, an den sich Ihr Router als Client verbinden wird."
                }, {
                    type: "name",
                    title: "Verschlüsselung",
                    content: "Zeigt die Art der Verschlüsselung des APs an, an den sich Ihr Router als Client verbinden wird."
                }, {
                    type: "name",
                    title: "Verbinden",
                    content: "Klicken Sie auf dieses Symbol, um sich mit dem entsprechenden AP zu verbinden, oder sich von ihm zu trennen."
                }]
            }, {
                type: "name",
                title: "Sicherheit",
                content: "Wählen Sie eine der folgenden Sicherheitsoptionen:",
                children: [{
                    type: "name",
                    title: "Keine",
                    content: "Wählen Sie diese Option, um die WLAN-Sicherheit zu deaktivieren. Es wird dringend empfohlen, die WLAN-Sicherheit zu aktivieren, um Ihr drahtloses Netzwerk vor unbefugtem Zugriff zu schützen."
                }, {
                    type: "name",
                    title: "WPA/WPA2 – Persönlich",
                    content: "Wählen Sie diese Option, um die standardmäßige Authentifizierungsmethode, basierend auf einem Pre-shared Key (PSK), auch Passphrase bezeichnet, zu aktivieren. Diese Option wird empfohlen. Wenn es gewählt ist, konfigurieren Sie Folgendes.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Wählen Sie eine Sicherheitsversion für Ihr WLAN.",
                        children: [{
                            type: "name",
                            title: "WPA-PSK",
                            content: "Diese Option unterstützt die AES-Verschlüsselung, die eine niedrigere Sicherheitsstufe als WPA2-PSK bietet."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Diese Option unterstützt die AES-Verschlüsselung, die eine höhere Sicherheitsstufe als WPA-PSK bietet, und wird deshalb empfohlen."
                        }]
                    }, {
                        type: "name",
                        title: "Verschlüsselung",
                        content: "Wählen Sie eine Sicherheits-Verschlüsselungsart: TKIP (Temporal Key Integrity Protocol) oder AES (Advanced Encryption Standard). Es wird NICHT empfohlen, die TKIP-Verschlüsselung zu wählen, wenn der Router im 802.11n-Modus betrieben wird, denn TKIP wird von 802.11n nicht unterstützt. Wenn TKIP ausgewählt ist, wird die WPS-Funktion deaktiviert."
                    }, {
                        type: "name",
                        title: "Passwort",
                        content: "Geben Sie ein WLAN-Passwort mit 8 bis 63 ASCII-Zeichen bzw. 8 bis 64 hexadezimalen Zeichen in dieses Feld ein."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Wählen Sie diese Option, um die grundlegende Authentifizierung zu aktivieren, sofern irgendeiner Ihrer Clients nur mittels WEP (Wired Equivalent Privacy) auf das WLAN zugreifen kann.",
                    children: [{
                        type: "name",
                        title: "Typ",
                        content: "Wählen Sie einen Authentifizierungstyp für Ihr WLAN. Wählen Sie Open System (Offenes System) oder Shared Key (Freigegebener Schlüssel), je nach Kapazität und Zugriffsanforderung des WLAN-Clients."
                    }, {
                        type: "name",
                        title: "WEP-Schlüsselformat",
                        content: "Wählen Sie entweder das ASCII-Format oder hexadezimal. Das ASCII-Format ist eine Kombination aus alphabetischen und numerischen Zeichen. Das hexadezimale Format ist eine Kombination aus Ziffern (0–9) und Buchstaben (A–F, a–f)."
                    }, {
                        type: "name",
                        title: "Schlüsselindex",
                        content: "Wählen Sie, welcher der vier Schlüssel verwendet wird, und geben Sie den korrekten WEP-Schlüssel ein, den Sie im Feld „Schlüsselwert“ erstellt haben. Vergewissern Sie sich, dass diese Werte auf allen drahtlosen Stationen Ihres Netzwerks identisch sind."
                    }, {
                        type: "name",
                        title: "Schlüsselwert",
                        content: "Geben Sie den passenden WEP-Schlüssel ein, den Sie erstellen."
                    }]
                }]
            }, {
                type: "name",
                title: "Speichern",
                content: "Klicken Sie hier, um die Einstellungen zu speichern."
            }]
        },
        wirelessSchedule: {
            TITLE: "WLAN-Zeitplanung",
            CONTENT: [{
                    type: "paragraph",
                    content: "Die effektive Zeitplanung basiert auf der Systemzeit des Routers. Diese Zeit kann unter „System-Tools -> Uhrzeiteinstellungen“ eingestellt werden."
                }, {
                    type: "name",
                    title: "2,4 GHz | 5 GHz-1 | 5 GHz-2",
                    content: "Wählen Sie 2,4 GHz | 5 GHz-1 | 5 GHz-2 aus, um das WLAN-Band für Ihre WLAN-Zeitplanung festzulegen."
                }, {
                    type: "name",
                    title: "WLAN-Zeitplanung",
                    content: "Schalten Sie dies ein, um diese Funktion zu aktivieren. Klicken und ziehen Sie dann über die Zellen, um die Zeiträume festzulegen, in denen Ihr WLAN ausgeschaltet sein soll."
                }, {
                    type: "name",
                    title: "Wiederherstellen",
                    content: "Klicken Sie hier, um die Zeitauswahl zurückzusetzen."
                }, {
                    type: "name",
                    title: "Speichern",
                    content: "Klicken Sie hier, um die Einstellungen zu speichern."
                }

            ]
        },
        macFilter: {
            TITLE: "MAC-Adressfiltereinstellungen",
            CONTENT: [{
                    type: "name",
                    title: "MAC-Adressfilterung",
                    content: "Schalten Sie dies ein, um den WLAN-Zugang einzelner Geräte mit Hilfe ihrer MAC-Adressen zu steuern."
                }, {
                    type: "title",
                    title: "Filterregeln"
                }, {
                    type: "name",
                    title: "WLAN-Zugriff von den Geräten in der unten stehenden Liste blockieren.",
                    content: "Der WLAN-Zugriff von den Geräten in der Liste unten wird verhindert."
                }, {
                    type: "name",
                    title: "WLAN-Zugriff nur von den Geräten in der unten stehenden Liste zulassen.",
                    content: "Der WLAN-Zugriff wird nur von den Geräten in der Liste unten gestattet."
                }, {
                    type: "title",
                    title: "Geräteliste"
                }, {
                    type: "name",
                    title: "MAC-Adresse/Beschreibung",
                    content: "Zeigt die MAC-Adresse und Beschreibung des Geräts an."
                }, {
                    type: "name",
                    title: "Aktivieren",
                    content: "Durch Klicken auf das Ballonsymbol wird die MAC-Adressfilterung des Geräts aktiviert oder deaktiviert."
                }, {
                    type: "name",
                    title: "Ändern",
                    content: "Zeigt die Optionen an, um den entsprechenden Eintrag zu ändern oder zu löschen."
                }, {
                    type: "note",
                    title: "Hinzufügen eines neuen Geräts",
                    content: [
                        "Klicken Sie auf „Hinzufügen“.",
                        "Geben Sie die MAC-Adresse des Geräts ein.",
                        "Geben Sie eine Beschreibung des Geräts ein.",
                        "Klicken Sie auf „Diesen Eintrag aktivieren“.",
                        "Klicken Sie auf OK."
                    ]
                }


            ]
        },
        wirelessSettings: {
            TITLE: "WLAN-Einstellungen",
            CONTENT: [/*{
                    type: "name",
                    title: "Region",
                    content: "Wählen Sie Ihre Region aus der Dropdown-Liste aus. In diesem Feld ist die Region angegeben, in der die WLAN-Funktion des Routers verwendet werden kann. Es kann sogar illegal sein, die WLAN-Funktion in einer Region zu verwenden, die nicht in diesem Feld angegeben ist. Sollte Ihr Land oder Ihre Region nicht aufgeführt sein, wenden Sie sich bitte an Ihre lokale Behörde zur Unterstützung."
                }, */{
                    type: "name",
                    title: "Smart Connect",
                    content: "Markieren Sie dieses Kontrollkästchen, um Smart Connect zu aktivieren. Dank dieser Funktion können die Geräte schneller arbeiten, indem sie, basierend auf den tatsächlichen Bedingungen, den besten WLAN-Bändern zugeteilt werden, um auf diese Weise die Netzwerkanforderungen auszugleichen."
                }, {
                    type: "name",
                    title: "2,4 GHz | 5 GHz-1 | 5 GHz-2",
                    content: "Wählen Sie 2,4 GHz | 5 GHz-1 | 5 GHz-2 aus, um die entsprechenden Einstellungen zu ändern."
                }, {
                    type: "name",
                    title: "WLAN-Frequenz",
                    content: "Markieren Sie dieses Kontrollkästchen, um Ihr 2,4 GHz | 5 GHz-1 | 5 GHz-2 WLAN zu aktivieren."
                }, {
                    type: "name",
                    title: "WLAN-Name (SSID)",
                    content: "Sie können entweder den standardmäßigen Netzwerknamen (SSID) belassen, oder einen neuen Namen mit 1 bis 32 Zeichen erstellen. Dieses Feld unterscheidet zwischen Groß- und Kleinschreibung."
                }, {
                    type: "name",
                    title: "SSID verbergen",
                    content: "Markieren Sie dieses Kontrollkästchen, um den Namen des 2,4 GHz | 5 GHz-1 | 5 GHz-2 WLANs (SSID) aus der WLAN-Liste auszublenden."
                }, {
                    type: "name",
                    title: "Sicherheit",
                    content: "Wählen Sie eine der folgenden Sicherheitsoptionen:",
                    children: [{
                        type: "name",
                        title: "Keine Sicherheit",
                        content: "Wählen Sie diese Option, um die WLAN-Sicherheit zu deaktivieren. Es wird dringend empfohlen, die WLAN-Sicherheit zu aktivieren, um Ihr drahtloses Netzwerk vor unbefugtem Zugriff zu schützen."
                    }, {
                        type: "name",
                        title: "WPA/WPA2 – Persönlich",
                        content: "Wählen Sie diese Option, um die standardmäßige Authentifizierungsmethode, basierend auf einem Pre-shared Key (PSK), auch Passphrase bezeichnet, zu aktivieren. Diese Option wird empfohlen. Wenn es gewählt ist, konfigurieren Sie Folgendes.",
                        children: [{
                            type: "name",
                            title: "Version",
                            content: "Wählen Sie eine Sicherheitsversion für Ihr WLAN.",
                            children: [{
                                type: "name",
                                title: "Auto",
                                content: "Diese Option unterstützt die mehrfache Umsetzung des WPA-Standards (Wi-Fi Protected Access), wie z. B. WPA und WPA2."
                            }, {
                                type: "name",
                                title: "WPA2-PSK",
                                content: "Diese Option unterstützt die AES-Verschlüsselung, die eine höhere Sicherheitsstufe als WPA-PSK bietet, und wird deshalb empfohlen."
                            }]
                        }, {
                            type: "name",
                            title: "Verschlüsselung",
                            content: "Wählen Sie eine Sicherheits-Verschlüsselungsart: Auto (für TKIP und AES), TKIP (Temporal Key Integrity Protocol) oder AES (Advanced Encryption Standard). Es wird NICHT empfohlen, die TKIP-Verschlüsselung zu wählen, wenn der Router im 802.11n-Modus betrieben wird, denn TKIP wird von 802.11n nicht unterstützt. Wenn TKIP ausgewählt ist, wird die WPS-Funktion deaktiviert."
                        }, {
                            type: "name",
                            title: "Passwort",
                            content: "Geben Sie ein WLAN-Passwort mit 8 bis 63 ASCII-Zeichen bzw. 8 bis 64 hexadezimalen Zeichen in dieses Feld ein."
                        }]
                    }, {
                        type: "name",
                        title: "WPA/WPA2 Enterprise",
                        content: "Wählen Sie diese Option, um die erweiterte Authentifizierungsmethode mit einem RADIUS (Remote Authentication Dial In User Service) -Server zu aktivieren. Wenn dies ausgewählt ist, wird die WPS-Funktion deaktiviert.",
                        children: [{
                            type: "name",
                            title: "Version",
                            content: "Wählen Sie eine Sicherheitsversion für Ihr WLAN.",
                            children: [{
                                type: "name",
                                title: "Auto",
                                content: "Diese Option unterstützt die mehrfache Umsetzung des WPA-Standards (Wi-Fi Protected Access), wie z. B. WPA und WPA2."
                            }, {
                                type: "name",
                                title: "WPA2-PSK",
                                content: "Diese Option unterstützt die AES-Verschlüsselung, die eine höhere Sicherheitsstufe als WPA bietet, und wird deshalb empfohlen."
                            }]
                        }, {
                            type: "name",
                            title: "Verschlüsselung",
                            content: "Wählen Sie eine Sicherheits-Verschlüsselungsart: Auto (für TKIP und AES), TKIP (Temporal Key Integrity Protocol) oder AES (Advanced Encryption Standard). Es wird NICHT empfohlen, die TKIP-Verschlüsselung zu wählen, wenn der Router im 802.11n-Modus betrieben wird, denn TKIP wird von 802.11n nicht unterstützt. Wenn TKIP ausgewählt ist, wird die WPS-Funktion deaktiviert."
                        }, {
                            type: "name",
                            title: "RADIUS-Server-IP-Adresse",
                            content: "Geben Sie die IP-Adresse des RADIUS-Servers ein."
                        }, {
                            type: "name",
                            title: "RADIUS-Serverport",
                            content: "Geben Sie die Portnummer des RADIUS-Servers ein."
                        }, {
                            type: "name",
                            title: "RADIUS-Server-Passwort",
                            content: " Geben Sie das gemeinsame Passwort des RADIUS-Servers ein."
                        }]
                    }, {
                        type: "name",
                        title: "WEP",
                        content: "Wählen Sie diese Option, um die grundlegende Authentifizierung zu aktivieren, sofern irgendeiner Ihrer Clients nur mittels WEP (Wired Equivalent Privacy) auf das WLAN zugreifen kann.",
                        children: [{
                            type: "name",
                            title: "Typ",
                            content: "Wählen Sie einen Authentifizierungstyp für Ihr WLAN. Die Standardeinstellung ist AUTO, bei der automatisch „Open System“ (Offenes System) oder „Shared Key“ (Freigegebener Schlüssel) gewählt wird, je nach Kapazität und Zugriffsanforderung des WLAN-Clients."
                        }, {
                            type: "name",
                            title: "Gewählter Schlüssel",
                            content: "Wählen Sie, welcher der vier Schlüssel verwendet wird, und erstellen Sie einen WEP-Schlüssel im Feld „Schlüsselwert“. Alle WLAN-Clients müssen den korrekten WEP-Schlüssel eingeben, um sich mit Ihrem Netzwerk verbinden zu können."
                        }, {
                            type: "name",
                            title: "WEP-Schlüsselformat",
                            content: "Verwenden Sie entweder das ASCII-Format oder Hexadezimal. Das ASCII-Format ist eine Kombination aus alphabetischen und numerischen Zeichen. Das hexadezimale Format ist eine Kombination aus Ziffern (0–9) und Buchstaben (A–F, a–f)."
                        }, {
                            type: "name",
                            title: "Schlüsselart",
                            content: "Wählen Sie eine WEP-Schlüssellänge.",
                            children: [{
                                type: "name",
                                title: "64-Bit-Verschlüsselung",
                                content: "Sie können 10 Hexadezimalzeichen (0–9, A–F, a–f) oder 5 ASCII-Zeichen in das Feld „WEP-Wert“ eingeben."
                            }, {
                                type: "name",
                                title: "128-Bit-Verschlüsselung",
                                content: "Sie können 26 Hexadezimalzeichen (0–9, A–F, a–f) oder 13 ASCII-Zeichen in das Feld „WEP-Wert“ eingeben."
                            }]
                        }, {
                            type: "name",
                            title: "Schlüsselwert",
                            content: "Erstellen Sie einen WEP-Schlüssel."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "Modus",
                    content: "Wählen Sie den gewünschten Übertragungsmodus."
                }, {
                    type: "name",
                    title: "Kanal",
                    content: "Wählen Sie einen Betriebskanal für das WLAN. Der Standard-Kanal ist „Auto“. Ändern Sie diesen nicht, es sei denn, Ihre WLAN-Verbindung wird ständig unterbrochen."
                }, {
                    type: "name",
                    title: "Kanalbreite",
                    content: "Wählen Sie eine Kanalbreite (Bandbreite) für das WLAN."
                }, {
                    type: "name",
                    title: "Übertragungsleistung",
                    content: "Wählen Sie für die Datenübertragungs-Leistung entweder „Hoch“ , „Mittel“ oder „Niedrig“ . Die voreingestellte und empfohlene Leistung ist „Hoch“."
                }, {
                    type: "paragraph",
                    content: "Klicken Sie auf <strong>Speichern</strong>, um alle Ihre Einstellungen zu speichern."
                }

            ]
        },
        wps: {
            TITLE: "Router-PIN",
            CONTENT: [{
                    type: "name",
                    title: "Router-PIN",
                    content: "Schalten Sie dies ein, um drahtlosen Geräten zu gestatten, sich unter Verwendung der PIN (Personal Identification Number) des Routers mit ihm zu verbinden."
                }, {
                    type: "name",
                    title: "Aktuelle PIN",
                    content: "Zeigt die aktuelle PIN des Routers an. Die Standard-PIN finden Sie auf dem Etikett des Routers bzw. in der Bedienungsanleitung. Klicken Sie auf „Erzeugen“ , um eine neue zufällige PIN zu erzeugen, oder auf „Wiederherstellen“ , um die aktuelle PIN wieder auf die Standard-PIN zurückzusetzen."
                }, {
                    type: "title",
                    content: "WPS-Einstellungen"
                }, {
                    type: "name",
                    title: "Tastendruck (empfohlen)",
                    content: "Wenn Sie diese Setup-Methode wählen, aktivieren Sie die WPS-Funktion, mit deren Hilfe Sie einfach jedes WPS-fähige Gerät mit dem WLAN verbinden können. Hierzu drücken Sie einfach die WPS-Taste oder virtuell die „Verbinden“-Schaltfläche."
                }, {
                    type: "name",
                    title: "PIN-Code",
                    content: "Wählen Sie diese Setup-Methode, um ein Gerät manuell durch Eingabe der WPS-PIN des Geräts in das Feld zu verbinden."
                }, {
                    type: "name",
                    title: "Verbinden",
                    content: "Klicken Sie hier, um den WPS-Verbindungsvorgang zu starten."
                }



            ]
        },
        parentCtrl: {
            TITLE: "Kindersicherung",
            CONTENT: [{
                type: "paragraph",
                content: "Mit der Kindersicherung können Sie unangemessene, freizügige und schädliche Websites blockieren, oder den Zugriff zu bestimmten Tageszeiten einschränken (z. B. Facebook oder YouTube während der Hausaufgaben-Zeit)."
            }, {
                type: "name",
                title: "Status",
                content: "Schalten Sie dies ein, um die Kindersicherungs-Funktion zu aktivieren. Standardmäßig ist diese Funktion deaktiviert."
            }, {
                type: "title",
                content: "Von der Kindersicherung betroffene Geräte"
            }, {
                type: "paragraph",
                content: "„Von der Kindersicherung betroffene Geräte“ ist eine Liste aller Geräte, die durch die Kindersicherung eingeschränkt sind."
            }, {
                type: "name",
                title: "Gerätename",
                content: "Zeigt die Namen aller verbundenen Clientgeräte an, die zurzeit von der Kindersicherung betroffen sind."
            }, {
                type: "name",
                title: "MAC-Adresse",
                content: " Zeigt die MAC-Adressen aller verbundenen Clientgeräte an, die zurzeit von der Kindersicherung betroffen sind."
            }, {
                type: "name",
                title: "Wirksamkeitszeit",
                content: "Zeigt die Zeiträume an, in denen die Zugriffsbeschränkung wirksam ist."
            }, {
                type: "name",
                title: "Beschreibung",
                content: "Zeigt eine kurze Beschreibung des verbundenen Geräts an. "
            }, {
                type: "name",
                title: "Status",
                content: "Zeigt an, ob die Kindersicherung für das entsprechende Gerät aktiviert ist oder nicht. Durch Klicken auf das Ballonsymbol wird sie aktiviert oder deaktiviert."
            }, {
                type: "name",
                title: "Ändern",
                content: "Zeigt die Optionen an, um das entsprechende Gerät zu ändern oder zu löschen."
            }, {
                type: "note",
                title: "<strong>Ein neues Clientgerät einschränken</strong>",
                content: [
                    "Klicken Sie auf „Hinzufügen“.",
                    "Klicken Sie auf „Bestehende Geräte anzeigen“, um ein aktuell verbundenes Gerät auszuwählen, oder geben Sie den Gerätenamen und die MAC-Adresse manuell ein, um ein nicht verbundenes Gerät einzugeben.",
                    "Klicken Sie auf das „Wirksamkeitszeit“-Symbol, um den Zeitraum festzulegen, für den die Beschränkung gilt.",
                    "Geben Sie eine kurze Beschreibung in das Feld „Beschreibung“ ein. Dieses Feld ist optional.",
                    "Wählen Sie „Aktivieren“.",
                    "Klicken Sie auf OK, um den Eintrag zu speichern."
                ]
            }, {
                type: "paragraph",
                content: "<b>Ändern oder Löschen eines Geräts</b><br>Klicken Sie in der Liste „Von der Kindersicherung betroffene Geräte“ einfach auf das „Bearbeiten“-Symbol oder das „Papierkorb“-Symbol des Geräts, das Sie bearbeiten oder löschen möchten."
            }, {
                type: "paragraph",
                content: "<b>Löschen mehrerer Geräte</b><br>Markieren Sie in der Liste „Von der Kindersicherung betroffene Geräte“ alle Geräte, die Sie löschen möchten, und klicken Sie oberhalb der Tabelle auf „Löschen“."
            }, {
                type: "title",
                title: "Inhalts-Beschränkung"
            }, {
                type: "paragraph",
                content: "Die Inhalts-Beschränkung gibt Ihnen die Möglichkeit, den Zugriff auf Inhalte durch die Verwendung von Schlüsselwörtern und Domainnamen so einzuschränken, dass die von der Kindersicherung betroffenen Clientgeräte je nach Art der Beschränkung auf die Inhalte zugreifen können oder nicht."
            }, {
                type: "name",
                title: "Art der Beschränkung",
                content: "Wählen Sie aus den folgenden Arten der Beschränkung:",
                children: [{
                    type: "name",
                    title: "Blacklist",
                    content: "Enthält Schlüsselwörter und Domainnamen, die verwendet werden, um den Zugriff auf die Website durch die in der Liste „Von der Kindersicherung betroffene Geräte“ aufgeführten Clientgeräte zu verhindern."
                }, {
                    type: "name",
                    title: "Whitelist",
                    content: "Enthält Schlüsselwörter und Domainnamen der Websites, auf die die in der Liste „Von der Kindersicherung betroffene Geräte“ festgelegten Clientgeräte zugreifen dürfen."
                }]
            }, {
                type: "name",
                title: "Ein neues Schlüsselwort hinzufügen",
                content: "Klicken Sie darauf, um ein neues Schlüsselwort oder einen Domainnamen zur Blacklist oder Whitelist hinzuzufügen. "
            }, {
                type: "paragraph",
                content: "Um ein Schlüsselwort oder einen Domainnamen zu löschen, klicken Sie auf das „–“ (Minus)-Symbol neben dem Element, das Sie löschen möchten."
            }, {
                type: "name",
                title: "Speichern",
                content: "Klicken Sie hier, um Ihre Konfiguration zu speichern."
            }]
        },
        wlGuestDulBandBasic: {
            TITLE: "Gastnetz",
            CONTENT: [{
                type: "paragraph",
                content: "Mit der Gastnetz-Funktion können Sie ein separates drahtloses Netzwerk mit einem eigenen Netzwerknamen (SSID) und Passwort einrichten, das Ihre Gäste verwenden können, um auf das Internet zuzugreifen."
            }, {
                type: "name",
                title: "Gäste dürfen einander sehen",
                content: "Markieren Sie dieses Kontrollkästchen, damit drahtlose Geräte im Gastnetz miteinander kommunizieren können."
            }, {
                type: "name",
                title: "Gäste dürfen auf mein lokales Netz zugreifen",
                content: "Markieren Sie dieses Kontrollkästchen, damit drahtlose Geräte im Gastnetz auf Ihr lokales Netzwerk zugreifen können."
            }, {
                type: "name",
                title: "WLAN 2,4 GHz | 5 GHz-1 | 5 GHz-2",
                content: "Klicken Sie auf die entsprechende Schaltfläche, um das 2,4 GHz | 5 GHz-1 | 5 GHz-2 Gastnetz zu aktivieren."
            }, {
                type: "name",
                title: "Gastnetz-SSID",
                content: "Sie können entweder die standardmäßige SSID verwenden oder einen neuen Namen mit 1 bis 32 Zeichen erstellen. Dieses Feld unterscheidet zwischen Groß- und Kleinschreibung."
            }, {
                type: "name",
                title: "SSID verbergen",
                content: "Markieren Sie dieses Kontrollkästchen, wenn Sie die SSID des Gastnetzes ausblenden möchten."
            }, {
                type: "name",
                title: "Sicherheit",
                content: "Wählen Sie eine Sicherheitsoption für das Gastnetz:",
                children: [{
                    type: "name",
                    title: "Keine",
                    content: "Standardmäßig ist die Gastnetz-Sicherheit auf „Keine“ gesetzt; jeder kann darauf zugreifen."
                }, {
                    type: "name",
                    title: "Passwort festlegen",
                    content: "Geben Sie ein Passwort für das Gastnetz mit 8 bis 63 ASCII-Zeichen bzw. 8 bis 64 hexadezimalen Zeichen (0–9, a–f, A–F) in das Feld „Passwort“ ein."
                }]
            }]
        },
        networkMap: {
            TITLE: "Internet",
            CONTENT: [{
                type: "name",
                title: "Internet-Status",
                content: "Zeigt den aktuellen Status der Internetverbindung des Routers an."
            }, {
                type: "name",
                title: "Verbindungstyp",
                content: "Zeigt die Art Ihrer Internetverbindung an. "
            }, {
                type: "name",
                title: "IP-Adresse",
                content: "Zeigt die aktuell Ihrem Router zugewiesene IP-Adresse an."
            }, {
                type: "name",
                title: "DNS-Server",
                content: " Zeigt die IP-Adressen des primären und des sekundären DNS-Servers an."
            }, {
                type: "name",
                title: "Gateway",
                content: "Zeigt die IP-Adresse des Gateways an."
            }, {
                type: "title",
                title: "Router"
            }, {
                type: "title2",
                content: "2,4 GHz | 5 GHz-1 | 5 GHz-2 WLAN"
            }, {/*
                type: "name",
                title: "Status",
                content: "Zeigt an, ob das 2,4 GHz | 5 GHz-1 | 5 GHz-2 WLAN eingeschaltet (aktiviert) oder ausgeschaltet (deaktiviert) ist."
            }, {*/
                type: "name",
                title: "SSID",
                content: "Zeigt den aktuellen WLAN-Namen auf 2,4 GHz | 5 GHz-1 | 5 GHz-2 an."
            }, {
                type: "name",
                title: "Kanal",
                content: "Zeigt den Kanal an, auf dem das 2,4 GHz | 5 GHz-1 | 5 GHz-2 WLAN überträgt."
            }, {
                type: "name",
                title: "MAC",
                content: "Zeigt die aktuelle MAC-Adresse Ihres 2,4 GHz | 5 GHz-1 | 5 GHz-2 WLANs an."
            }, {
                type: "title2",
                content: "2,4 GHz | 5 GHz-1 | 5 GHz-2 Gastnetz"
            }, {
                type: "name",
                title: "Status",
                content: "Zeigt an, ob das 2,4 GHz | 5 GHz-1 | 5 GHz-2 Gastnetz eingeschaltet (aktiviert) oder ausgeschaltet (deaktiviert) ist."
            }, {
                type: "name",
                title: "SSID",
                content: "Zeigt den WLAN-Namen des Gastnetzes an."
            }, {
                type: "title",
                title: "WLAN-/kabelgebundene Clients"
            }, {
                type: "name",
                title: "Name",
                content: " Zeigt den Namen des mit dem Router verbundenen Clients an. "
            }, {
                type: "name",
                title: "IP-Adresse",
                content: "Zeigt die zugewiesene IP-Adresse des Clients an."
            }, {
                type: "name",
                title: "MAC-Adresse",
                content: "Zeigt die MAC-Adresse des Clients an."
            }, {
                type: "title",
                display: "INCLUDE_VOIP",
                title: "Telefon"
            }, {
                type: "name",
                display: "INCLUDE_VOIP",
                title: "Telefonname",
                content: "Zeigt den Namen Ihres Telefons an."
            }, {
                type: "name",
                display: "INCLUDE_VOIP",
                title: "Eingehende Rufnummern",
                content: "Zeigt die von Ihren Telefoniegeräten verwendeten Nummern an, um Anrufe durch Ihren Router zu empfangen. "
            }, {
                type: "name",
                display: "INCLUDE_VOIP",
                title: "Interne Nummer",
                content: "Zeigt die Telefonnummern an, die verwendet werden, um Anrufe zwischen Telefoniegeräten zu machen, die am selben Router angeschlossen sind. Diese ist voreingestellt und kann nicht geändert werden."
            }, {
                type: "name",
                display: "INCLUDE_VOIP",
                title: "Ausgehende Rufnummern",
                content: "Zeigt die von Ihren Telefoniegeräten verwendeten Nummern an, um Anrufe durch Ihren Router zu tätigen. Die Standardeinstellung ist Auto, dies bedeutet, dass der Router selbst eine verfügbare Nummer auswählt, die als ausgehende Nummer verwendet wird. Dies kann auf der VoIP-Seite geändert werden."
            }, {
                type: "title",
                display: "INCLUDE_USB",
                title: "Drucker"
            }, {
                type: "name",
                display: "INCLUDE_USB",
                title: "Name",
                content: "Zeigt den Namen des mit dem Router über USB verbundenen Druckers an. "
            }, {
                type: "title",
                display: "INCLUDE_USB",
                title: "USB-Datenträger"
            }, {
                type: "name",
                display: "INCLUDE_USB",
                title: "Marke",
                content: "Zeigt die Marke des mit dem Router verbundenen USB-Datenträgers an."
            }, {
                type: "name",
                display: "INCLUDE_USB",
                title: "Gesamt",
                content: "Zeigt den Gesamtspeicherplatz des USB-Datenträgers an."
            }, {
                type: "name",
                display: "INCLUDE_USB",
                title: "Verfügbar",
                content: "Zeigt den verfügbaren Speicherplatz des USB-Datenträgers an."
            }]
        },
        wirelessBasic: {
            TITLE: "WLAN-Einstellungen",
            CONTENT: [{
                type: "name",
                title: "2,4 GHz | 5 GHz-1 | 5 GHz-2 WLAN",
                content: "Markieren Sie dieses Kontrollkästchen, um Ihr 2,4 GHz | 5 GHz-1 | 5 GHz-2 WLAN-Funkfrequenz zu aktivieren."
            }, {
                type: "name",
                title: "WLAN-Name (SSID)",
                content: "Sie können entweder den standardmäßigen Netzwerknamen (SSID) belassen, oder einen neuen Namen mit 1 bis 32 Zeichen erstellen. Dieses Feld unterscheidet zwischen Groß- und Kleinschreibung."
            }, {
                type: "name",
                title: "Passwort",
                content: "Geben Sie ein WLAN-Passwort mit 8 bis 63 ASCII-Zeichen bzw. 8 bis 64 hexadezimalen Zeichen ein. Dieses Feld unterscheidet zwischen Groß- und Kleinschreibung."
            }, {
                type: "name",
                title: "SSID verbergen",
                content: "Markieren Sie dieses Kontrollkästchen, um die Namen des 2,4 GHz | 5 GHz-1 | 5 GHz-2 SSID aus der WLAN-Liste auszublenden."
            }]
        },
        status: {
            TITLE: "Internet",
            CONTENT: [{
                type: "paragraph",
                content: "Zeigt relevante Informationen über die Internetverbindung an."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                /*type: "name",
                title: "Name",
                content: "Zeigt den Namen des Internet-Ports des Routers an."
            }, {*/
                type: "name",
                title: "MAC-Adresse",
                content: "Die eindeutige physische Adresse, die dem Internet/WAN-Port des Routers zugewiesen ist."
            }, {
                type: "name",
                title: "IP-Adresse",
                content: "Die IP-Adresse, die dem Internet/WAN-Port des Routers zugewiesen ist. Wenn die IP-Adresse 0.0.0.0 lautet, bedeutet dies, dass kein Internetzugang vorhanden ist."
            }, {
                type: "name",
                title: "Subnetzmaske",
                content: "Dieser Parameter bestimmt den Netzwerkanteil und Hostanteil einer IP-Adresse. "
            }, {
                type: "name",
                title: "Standard-Gateway",
                content: " Die IP-Adresse, mit der der Router mit dem Netzwerk verbunden ist."
            }, {
                type: "name",
                title: "Primärer/Sekundärer DNS-Server",
                content: "Das Domain Name System (DNS) übersetzt Hostnamen und Internet-Domains in IP-Adressen. Die Informationen dieser DNS-Server wird vom Internetanbieter (Internet Service Provider, ISP) zugewiesen."
            }, {
                type: "name",
                title: "Verbindungstyp",
                content: "Der aktuelle Verbindungstyp Ihres Internetzugangs."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "MAC-Adresse",
                content: "Die eindeutige physische Adresse, die dem Internet/WAN-Port des Routers zugewiesen ist."
            }, {
                type: "name",
                title: "IP-Adresse",
                content: " Die IPv6-Adresse, die dem Internet/WAN-Port des Routers zugewiesen ist."
            }, {
                type: "name",
                title: "Standard-Gateway",
                content: " Die IP-Adresse, mit der der Router mit dem Netzwerk verbunden ist."
            }, {
                type: "name",
                title: "Primärer/Sekundärer DNS-Server",
                content: "Das Domain Name System (DNS) übersetzt Hostnamen und Internet-Domains in IP-Adressen. Die Informationen dieser DNS-Server wird vom Internetanbieter (Internet Service Provider, ISP) zugewiesen."
            }, {
                type: "name",
                title: "Verbindungstyp",
                content: "Der aktuelle Verbindungstyp Ihres Internetzugangs."
            }, {
                type: "title",
                title: "WLAN"
            }, {
                type: "name",
                title: "2,4G | 5G-1 | 5G-2",
                content: "Wählen Sie hier, um die 2,4 GHz | 5 GHz-1 | 5 GHz-2 WLAN-Einstellungen und -Informationen anzuzeigen."
            }, {
                type: "name",
                title: "Netzwerkname",
                content: "Der Name des drahtlosen Netzwerks (WLAN), auch bekannt als SSID (Service Set Identifier)."
            }, {
                type: "name",
                title: "WLAN-Frequenz",
                content: "Der aktuelle Status (EIN oder AUS) des WLANs."
            }, {
                type: "name",
                title: "Modus",
                content: "Der aktuelle WLAN-Modus."
            }, {
                type: "name",
                title: "Kanalbreite",
                content: "Die Kanalbandbreite des drahtlosen Netzwerks."
            }, {
                type: "name",
                title: "Kanal",
                content: "Der aktuelle WLAN-Kanal und seine entsprechende Frequenz (in GHz)."
            }, {
                type: "name",
                title: "MAC-Adresse",
                content: "Die MAC-Adresse der WLAN-Einheit."
            }, {
                type: "title",
                title: "LAN"
            }, {
                type: "paragraph",
                content: "Zeigt Informationen über die LAN-Ports an."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                type: "name",
                title: "MAC-Adresse",
                content: "Die eindeutige physische Adresse, die dem Ethernet- (LAN)Port des Routers zugewiesen ist."
            }, {
                type: "name",
                title: "IP-Adresse",
                content: "Die IPv4-Adresse, die dem Ethernet- (LAN)Port des Routers zugewiesen ist."
            }, {
                type: "name",
                title: "Subnetzmaske",
                content: "Dieser Parameter bestimmt den Netzwerkanteil und Hostanteil einer IP-Adresse."
            }, {
                type: "name",
                title: "DHCP",
                content: "Zeigt an, ob der eingebaute DHCP-Server des Routers für Geräte an den LAN-Ports aktiviert ist oder nicht."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "MAC-Adresse",
                content: "Die eindeutige physische Adresse, die dem Ethernet- (LAN)Port des Routers zugewiesen ist."
            }, {
                type: "name",
                title: "IP-Adresse",
                content: "Die IPv6-Adresse, die dem Ethernet- (LAN)Port des Routers zugewiesen ist."
            }, {
                type: "name",
                title: "Präfixlänge",
                content: "Die Länge des IPv6-Adresspräfix."
            }, {
                type: "name",
                title: "Zugewiesene Art",
                content: "Die Art der IPv6-Adresse, die der LAN-Schnittstelle zugewiesen ist."
            }, {
                type: "title",
                title: "Gastnetz"
            }, {
                type: "name",
                title: "2,4G | 5G-1 | 5G-2",
                content: "Wählen Sie hier, um die 2,4 GHz | 5 GHz-1 | 5 GHz-2 Gastnetz-Einstellungen und -Informationen anzuzeigen."
            }, {
                type: "name",
                title: "Gastnetz-SSID",
                content: " Der WLAN-Name (SSID) Ihres Gastnetzes."
            }, {
                type: "name",
                title: "SSID verbergen",
                content: "Zeigt an, ob der WLAN-Name (SSID) des Gastnetzes ausgeblendet (EIN) ist oder nicht (AUS)."
            }, {
                type: "name",
                title: "WLAN-Frequenz",
                content: "Zeigt den aktuellen Status (EIN oder AUS) des Gastnetzes an."
            }, {
                type: "name",
                title: "Einander sehen",
                content: "Zeigt an, ob alle Geräte im Gastnetz die Erlaubnis haben, miteinander zu kommunizieren oder nicht."
            }, {
                type: "title",
                display: "$.sysMode == 'DSL'",
                title: "DSL"
            }, {
                type: "paragraph",
                display: "$.sysMode == 'DSL'",
                content: "Zeigt Informationen über die DSL-Verbindung an."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Leitungs-Status",
                content: "Zeigt an, ob die DSL-Verbindung angeschlossen ist oder nicht."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "DSL-Modulationsart",
                content: "Zeigt die Modulationsart an, die Ihre DSL-Verbindung im DSL-Betrieb verwendet."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Erweiterungsart",
                content: "Zeigt die Erweiterungsart an, die Ihre DSL-Verbindung im DSL-Betrieb verwendet."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Aktuelle Rate (kBit/s)",
                content: "Zeigt die aktuelle Upload- und Download-Geschwindigkeit durch die DSL-Verbindung an."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Max. Rate (kBit/s)",
                content: "Zeigt die maximale Upload- und Download-Geschwindigkeit durch die DSL-Verbindung an."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "SNR-Margin (dB)",
                content: "Zeigt den Upload- und Download-SNR-Margin der DSL-Verbindung an."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Leitungsdämpfung (dB)",
                content: "Zeigt die Leitungsdämpfung des DSL-Anschlusses an."
            }, {
                type: "name",
                display: "$.sysMode == 'DSL'",
                title: "Fehler (pkts)",
                content: "Zeigt die Anzahl der Upstream- und Downstreamfehler der DSL-Verbindung an."
            }]
        },
        time: {
            TITLE: "Zeit-Einstellungen",
            CONTENT: [{
                type: "name",
                title: "Zeitzone",
                content: "Wählen Sie Ihre lokale Zeitzone aus der Dropdown-Liste aus."
            }, {
                type: "name",
                title: "Datum",
                content: "Geben Sie Ihr lokales Datum im Format MM/TT/JJJJ in das Feld ein."
            }, {
                type: "name",
                title: "Uhrzeit",
                content: "Wählen Sie Ihre lokale Uhrzeit aus der Dropdown-Liste."
            }, {
                type: "name",
                title: "NTP-Server I/NTP-Server II",
                content: "Geben Sie die IP-Adresse des NTP-Servers I bzw. NTP-Servers II ein, und der Router bezieht automatisch die Uhrzeit vom NTP-Server. Zusätzlich hat der Router einige gebräuchliche NTP-Server integriert, die sich automatisch synchronisieren, sobald er sich mit dem Internet verbindet."
            }, {
                type: "name",
                title: "Vom PC holen",
                content: "Klicken Sie hier, um die Uhrzeit mit der Systemzeit des Computers zu synchronisieren."
            }, {
                type: "name",
                title: "GMT abrufen",
                content: "Klicken Sie hier, um die Systemzeit Ihres Routers über das Internet zu synchronisieren."
            }, {
                type: "name",
                title: "Speichern",
                content: "Klicken Sie hier, um die Einstellungen zu speichern."
            }, {
                type: "title",
                content: "Sommerzeit"
            }, {
                type: "note",
                title: "Einstellen der Sommerzeit",
                content: [
                    "Wählen Sie <b>Sommerzeit aktivieren</b>.",
                    "Wählen Sie den korrekten <b>Start</b>-Zeitpunkt (Datum und Uhrzeit) aus, zu dem in Ihrer Zeitzone die Sommerzeit beginnt.",
                    "Wählen Sie den korrekten <b>End</b>-Zeitpunkt (Datum und Uhrzeit) aus, zu dem in Ihrer Zeitzone die Sommerzeit endet.",
                    "Klicken Sie auf <b>Speichern</b>."
                ]
            }]
        },
        DIGNOSTIC: {
            TITLE: "Diagnosetools",
            CONTENT: [{
                    type: "paragraph",
                    content: "Der Router ist mit zwei Diagnosetools ausgestattet: Ping und Trace."
                }, {
                    type: "note",
                    title: "Diagnose mittels Ping:",
                    content: [
                        "Klicken Sie das Optionsfeld (Radioknopf) vor „Ping“ an.",
                        "Geben Sie die IP-Adresse oder den Domainnamen ein.",
                        "Klicken Sie auf das Dropdown-Symbol vor „Erweitert“, um „Ping-Zähler“, „Ping-Paketgröße“ und „Ping-Timeout“ anzuzeigen. Belassen Sie diese Parameter auf ihren Standardwerten, oder konfigurieren Sie sie nach Ihren Bedürfnissen.",
                        "Klicken Sie auf die Schaltfläche „Start“, um die Diagnose zu starten."
                    ]
                }, {
                    type: "paragraph",
                    content: "ODER"
                }, {
                    type: "note",
                    title: "Diagnose mittels Traceroute:",
                    content: [
                        "Klicken Sie das Optionsfeld (Radioknopf) vor „Traceroute“ an.",
                        "Geben Sie die IP-Adresse oder den Domainnamen ein.",
                        "Klicken Sie auf das Dropdown-Symbol vor „Erweitert“, um die „Traceroute Max TTL“ anzuzeigen. Belassen Sie dies auf dem Standardwert, oder konfigurieren Sie es nach Ihren Bedürfnissen.",
                        "Klicken Sie auf die Schaltfläche „Start“, um die Diagnose zu starten."
                    ]
                }


            ]
        },
        softup: {
            TITLE: "Firmware-Upgrade",
            CONTENT: [{
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Ein Firmwareupgrade aktualisiert die Routersoftware auf den neuesten Stand hinsichtlich Funktionen, Fehlerbehebungen und Performanceverbesserungen. Gibt es eine neue Firmware, werden Sie mit einem Update-Symbol oben rechts in der Weboberfläche benachrichtigt. Klicken Sie auf dieses, um auf die Firmware-Upgradeseite weitergeleitet zu werden."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "<b>WICHTIG: Bitte folgen Sie diesen Anweisungen, um Fehler beim Upgrade zu vermeiden.</b>"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "Bevor Sie die Firmware aktualisieren:",
                content: [
                    "Verbinden Sie Ihren Computer über ein Ethernetkabel mit Ihrem Router. Ein Upgrade über eine WLAN-Verbindung wird NICHT empfohlen.",
                    "Entfernen Sie alle verbundenen USB-Speichermedien von Ihrem Router.",
                    "Sichern Sie die Routerkonfiguration."
                ]
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Bitte beachten während des Upgradeprozesses:<br>Belassen Sie Ihren Router eingeschaltet und tätigen Sie keine weiteren Aktionen."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Firmware online aktualisieren"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Klicken Sie Upgrade und bestätigen Sie. Der Router lädt die neueste Firmware automatisch herunter und installiert sie. Anschließend startet er neu.<br><b>Hinweis</b>: Eventuell müssen Sie Nach Upgrades überprüfen klicken, um festzustellen, ob neue Firmware verfügbar ist."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Firmware manuell aktualisieren"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "",
                content: [
                    "Besuchen Sie www.tp-link.de und laden Sie sich von der Produktseite die neueste Firmware für Ihr Modell herunter. Stellen Sie sicher, dass die gewählte Firmwaredatei zu Ihrer Hardwareversion passt.",
                    "Klicken Sie <b>Durchsuchen</b> und wählen Sie die heruntergeladene Firmwaredatei aus.",
                    "Klicken Sie <b>Upgrade</b>. Das Firmware-Upgrade wird einige Minuten dauern. Anschließend startet der Router automatisch neu.",
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "paragraph",
                content: "Bevor Sie die Firmware Ihres Routers aktualisieren, müssen Sie die neueste Firmware von unserer <a href='http://tp-link.de/support/download/'>Downloadseite</a> auf Ihren Computer herunterladen."
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "<B>WICHTIG: Um Fehler beim Upgrade zu vermeiden, nehmen Sie Folgendes zur Kenntnis:</B>",
                content: [
                    "Stellen Sie sicher, dass die Firmwaredatei für Ihre Hardwareversion (siehe Seite <b>Firmware-Upgrade</b> im Router) für Ihr Gerät freigegeben ist.",
                    "Stellen Sie sicher, dass Sie eine zuverlässige Verbindung zu Ihrem Router haben. Es wird <b>NICHT</b> empfohlen, das Upgrade über eine WLAN-Verbindung durchzuführen.",
                    "Stellen Sie sicher, dass die angeschlossenen USB-Datenträger vom Router getrennt wurden, um Datenverluste zu vermeiden.",
                    "Sichern Sie Ihre Routerkonfiguration.",
                    "Trennen Sie den Router während des Firmwareupgrades nicht von der Versorgungsspannung."
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "Zum Upgrade der Router-Firmware",
                content: [
                    "Klicken Sie <b>Durchsuchen</b>.",
                    "Wählen Sie die Firmwaredatei aus.",
                    "Klicken Sie <b>Upgrade</b>."
                ]
            }]
        },
        backNRestore: {
            TITLE: "Backup",
            CONTENT: [{
                    type: "paragraph",
                    content: "Es wird dringend empfohlen, ein Backup (Sicherungskopie) Ihrer aktuellen Konfigurationen anzulegen, falls es einmal notwendig sein sollte, das System auf einen früheren Zustand oder auf die Werkseinstellungen zurückzusetzen."
                }, {
                    type: "paragraph",
                    content: "Klicken Sie auf <b>Backup</b> (Sichern), um eine Kopie der aktuellen Konfigurationen auf Ihrem Computer zu speichern. Stellen Sie sicher, dass die Backup-Datei an einem sicheren Ort gespeichert ist, von dem Sie im Bedarfsfall die Konfiguration des Routers später wieder herstellen können."
                }, {
                    type: "title",
                    content: "Wiederherstellen"
                }, {
                    type: "note",
                    title: "Wiederherstellen aus einer Backup-Datei (Sicherungskopie)",
                    content: [
                        "Klicken Sie auf <b>Durchsuchen</b>.",
                        "Suchen und wählen Sie die Backup-Datei.",
                        "Klicken Sie auf <b>Wiederherstellen</b>."
                    ]
                }, {
                    type: "title",
                    content: "Zurücksetzen auf die Werkseinstellungen"
                }, {
                    type: "paragraph",
                    content: "Klicken Sie auf <b>Werkseinstellungen wiederherstellen</b>, um Ihren Router wieder auf die Werkseinstellungen zurückzusetzen."
                }, {
                    type: "note",
                    title: "Hinweise:",
                    content: [
                        "Wenn Sie auf die Werkseinstellungen zurücksetzen, werden alle Einstellungen, die Sie am Router geändert haben, wieder auf die Standard-Einstellungen zurückgesetzt. Nachdem Sie den Router zurückgesetzt und neu gestartet haben, erstellen Sie ein neues Passwort, um sich an der Weboberfläche anzumelden.",
                        "Schalten Sie den Router während des Backup- oder Wiederherstellungs-Prozesses keinesfalls aus."
                    ]
                }

            ]
        },
        manageCtrl: {
            TITLE: "Kontoverwaltung",
            CONTENT: [{
                    type: "paragraph",
                    content: "Auf dieser Seite können Sie Ihr Login-Passwort ändern."
                }, {
                    type: "name",
                    title: "Alter Benutzername",
                    content: "Geben Sie Ihren aktuellen Benutzernamen ein."
                }, {
                    type: "name",
                    title: "Altes Passwort",
                    content: "Geben Sie Ihr aktuelles Passwort ein."
                }, {
                    type: "name",
                    title: "Neuer Benutzername",
                    content: "Geben Sie Ihren neuen Benutzernamen ein."
                }, {
                    type: "name",
                    title: "Neues Passwort",
                    content: "Geben Sie Ihr neues Passwort ein."
                }, {
                    type: "name",
                    title: "Neues Kennwort bestätigen",
                    content: "Geben Sie Ihr neues Passwort erneut ein."
                }, {
                    type: "title",
                    content: "Lokale Verwaltung"
                }, {
                    type: "paragraph",
                    content: "Mit der lokalen Verwaltung können Sie gezielt ein Clientgerät in Ihrem Netzwerk bestimmen, das auf den Router mittels der MAC-Adressen-basierten Authentifizierung zugreifen und ihn verwalten darf."
                }, {
                    type: "name",
                    title: "Port",
                    content: "Geben Sie die Portnummer ein (1024 bis 65535), die verwendet wird, um auf den Router zuzugreifen. Die Standard-Portnummer ist 80."
                }, {
                    type: "name",
                    title: "IP/MAC-Adresse",
                    content: "Geben Sie eine gültige lokale IP-Adresse oder MAC-Adresse des Geräts ein, das auf den Router zugreifen darf."
                }, {
                    type: "title",
                    content: "Fernwartung"
                }, {
                    type: "paragraph",
                    content: "Mit der Funktion „Fernwartung“ können Sie aus der Ferne, über das Internet, auf Ihren Router zugreifen und ihn konfigurieren."
                }, {
                    type: "name",
                    title: "Fernwartung",
                    content: "Markieren Sie das Kontrollkästchen, um die Fernwartung zu aktivieren."
                }, {
                    type: "name",
                    title: "Port",
                    content: "Geben Sie die Portnummer ein (1024 bis 65535), die verwendet wird, um mit höherer Sicherheit auf den Router zuzugreifen. Normalerweise verwenden Web-Browser den Standard-Serviceport 80."
                }, {
                    type: "name",
                    title: "IP/MAC-Adresse",
                    content: "Geben Sie eine gültige Remote-IP-Adresse oder MAC-Adresse ein, die auf den Router zugreifen darf."
                }


            ]
        },
        log: {
            TITLE: "Systemprotokoll",
            CONTENT: [{
                    type: "paragraph",
                    content: "Auf der Systemprotokollseite wird eine Liste der letzten Aktivitäten (Ereignisse) des Routers angezeigt. Sie können festlegen, welche Arten von Protokollen und/oder Protokollstufen Sie anzeigen möchten. Auf dieser Seite kann auch der Router das Systemprotokoll zu einem Computer exportieren bzw. es automatisch an einen bestimmten Remoteserver senden."
                }, {
                    type: "name",
                    title: "Art",
                    content: "Wählen Sie die anzuzeigende Art des Systemprotokolls aus."
                }, {
                    type: "name",
                    title: "Stufe",
                    content: "Wählen Sie die anzuzeigende Stufe des Systemprotokolls aus."
                }, {
                    type: "name",
                    title: "Aktualisieren",
                    content: "Klicken Sie auf dieses Symbol, um das Systemprotokoll zu aktualisieren."
                }, {
                    type: "name",
                    title: "Alle löschen",
                    content: "Klicken Sie auf dieses Symbol, um das Systemprotokoll zu löschen."
                }, {
                    type: "name",
                    title: "Protokolleinstellungen",
                    content: "Klicken Sie hier, um die Einstellungen der Protokolldatei festzulegen.",
                    children: [{
                        type: "name",
                        title: "Lokal speichern",
                        content: "Wählen Sie dies, um das Systemprotokoll im lokalen Cache Ihres Routers zu speichern. Das Protokoll wird in der Tabelle auf der Systemprotokollseite angezeigt.",
                        children: [{
                            type: "name",
                            title: "Mindeststufe",
                            content: "Wählen Sie aus der Dropdown-Liste die Mindeststufe des Systemprotokolls aus, die gespeichert werden soll. Die Liste wird in absteigender Reihenfolge angezeigt, mit der niedrigsten Stufe zuletzt."
                        }]
                    }, {
                        type: "name",
                        title: "Remote speichern",
                        content: "Wählen Sie dies, um das Systemprotokoll auf einem Remoteserver zu speichern. Wenn der Remoteserver einen Protokollviewer-Client oder ein Sniffer-Tool eingebaut hat, können Sie das Systemprotokoll aus der Ferne in Echtzeit anzeigen und analysieren.",
                        children: [{
                            type: "name",
                            title: "Mindeststufe",
                            content: "Wählen Sie aus der Dropdown-Liste die Mindeststufe des Systemprotokolls aus, die gespeichert werden soll. Die Liste wird in absteigender Reihenfolge angezeigt, mit der niedrigsten Stufe zuletzt."
                        }, {
                            type: "name",
                            title: "Server-IP-Adresse",
                            content: "Geben Sie die IP-Adresse des Systemprotokoll-Remoteservers ein."
                        }, {
                            type: "name",
                            title: "Serverport",
                            content: "Geben Sie die Portnummer des Systemprotokoll-Remoteservers ein."
                        }, {
                            type: "name",
                            title: "Lokaler Einrichtungsname",
                            content: "Wählen Sie den lokalen Einrichtungsnamen des Remoteservers aus der Dropdown-Liste."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "Protokoll speichern",
                    content: "Klicken Sie auf diese Schaltfläche, um das Systemprotokoll auf Ihren lokalen Computer herunterzuladen."
                }

            ]
        },
        snmp: {
            TITLE: "SNMP-Einstellungen",
            CONTENT: [{
                    type: "name",
                    title: "SNMP-Agent",
                    content: "Klicken Sie hier, um den eingebauten SNMP-Agent zu aktivieren, der dem Router gestattet, die SNMP-Nachrichten zu empfangen und zu verarbeiten, Antworten an den SNMP-Manager zu schicken und SNMP-Traps auslöst, wenn ein Ereignis eintritt."
                }, {
                    type: "name",
                    title: "Read-Only-Community",
                    content: "Zeigt den öffentlichen Standard-Community-String an, der den Router vor unberechtigtem Zugriff schützt."
                }, {
                    type: "name",
                    title: "Schreib-Community",
                    content: "Zeigt den Standard-Lese-und-Schreib-Community-String an, der den Router vor unberechtigtem Zugriff schützt."
                }, {
                    type: "name",
                    title: "Systemname",
                    content: "Zeigt den vom Administrator zugewiesenen Namen für dieses verwaltete Gerät an."
                }, {
                    type: "name",
                    title: "Systembeschreibung",
                    content: "Zeigt die textuelle Beschreibung für dieses verwaltete Gerät an.  Dieser Wert sollte den vollständigen Namen und die Versions-ID der Hardware des Systems beinhalten, der Software des Betriebssystems sowie der Netzwerk-Software."
                }, {
                    type: "name",
                    title: "Systemstandort",
                    content: "Zeigt den physischen Standort des Geräts an (z. B. Telefonraum, 3. Stock).  "
                }, {
                    type: "name",
                    title: "Systemkontakt",
                    content: "Zeigt die textuelle Kennzeichnung der Kontaktperson für dieses verwaltete Gerät an, gemeinsam mit der Information, wie diese Person kontaktiert werden kann."
                }, {
                    type: "name",
                    title: "Trap-Manager-IP-Adresse",
                    content: "Zeigt die IP-Adresse des Hosts an, der die Traps empfängt."
                }


            ]
        },
        stat: {
            TITLE: "Trafficstatistik",
            CONTENT: [{
                    type: "name",
                    title: "Trafficstatistik",
                    content: "Aktivieren der Trafficstatistik-Funktion."
                }, {
                    type: "title",
                    content: "Trafficstatistikliste"
                }, {
                    type: "name",
                    title: "IP/MAC-Adresse",
                    content: "Zeigt die IP- und MAC-Adressen der verbundenen Clients an."
                }, {
                    type: "name",
                    title: "Pakete gesamt",
                    content: "Die Gesamtzahl der vom Router empfangenen und übertragenen Pakete."
                }, {
                    type: "name",
                    title: "Bytes gesamt",
                    content: "Die Gesamtzahl der vom Router empfangenen und übertragenen Bytes."
                }, {
                    type: "name",
                    title: "Pakete aktuell",
                    content: "Die Gesamtzahl der empfangenen und übertragenen Pakete während eines bestimmten Zeitintervalls (in Sekunden)."
                }, {
                    type: "name",
                    title: "Bytes aktuell",
                    content: "Die Gesamtzahl der empfangenen und übertragenen Bytes während eines bestimmten Zeitintervalls (in Sekunden)."
                }, {
                    type: "name",
                    title: "Aktuelle ICMP Tx",
                    content: "Zeigt die aktuelle Übertragungsrate der ICMP-Pakete an, die durch den WAN-Port mit der maximalen Übertragungsrate pro Sekunde übertragen werden."
                }, {
                    type: "name",
                    title: "Aktuelle UDP Tx",
                    content: "Zeigt die aktuelle Übertragungsrate der UDP-Pakete an, die durch den WAN-Port mit der maximalen Übertragungsrate pro Sekunde übertragen werden."
                }, {
                    type: "name",
                    title: "Aktuelle SYN Tx",
                    content: "Zeigt die aktuelle Übertragungsrate der TCP-SYN-Pakete an, die durch den WAN-Port mit der maximalen Übertragungsrate pro Sekunde übertragen werden."
                }, {
                    type: "name",
                    title: "Ändern",
                    content: "Klicken Sie auf das <b>Papierkorb</b>-Symbol, um die entsprechende Statistik zu löschen."
                }, {
                    type: "name",
                    title: "Aktualisieren",
                    content: "Klicken Sie hier, um die Statistikdaten auf dieser Seite zu aktualisieren."
                }, {
                    type: "name",
                    title: "Reset",
                    content: "Klicken Sie hier, um alle Werte der Statistik in der Liste auf Null zurückzusetzen."
                }, {
                    type: "name",
                    title: "Alle löschen",
                    content: "Klicken Sie hier, um alle Statistikdaten in der Liste zu löschen."
                }



            ]
        },
        ethWan: {
            TITLE: "WAN-Schnittstelle",
            CONTENT: [{
                type: "title2",
                content: "Verbindungstyp: Dynamische IP-Adresse"
            }, {
                type: "name",
                title: "Dynamische IP-Adresse",
                content: "Wählen Sie diesen Typ, wenn Sie von Ihrem Internetanbieter eine DHCP-Serververbindung erhalten haben."
            }, {
                type: "name",
                title: "IP-Adresse/Subnetzmaske/Gateway/Standard-Gateway",
                content: "Diese Parameter werden vom DHCP-Server Ihres Internetanbieters automatisch zugewiesen."
            }, {
                type: "name",
                title: "Erneuern/Freigeben",
                content: "Klicken Sie auf diese Schaltfläche, um die IP-Parameter von Ihrem Internetanbieter zu erneuern/freizugeben."
            }, {
                type: "name",
                title: "Erweitert",
                children: [{
                    type: "name",
                    title: "MTU-Größe (in Bytes)",
                    content: "Die Standard- und typische MTU-Größe (Maximum Transmission Unit) der meisten Ethernet-Netzwerke beträgt <b>1500 Bytes</b>. Diese MTU-Größe sollte nur dann geändert werden, wenn es vom Internetanbieter verlangt wird."
                }, {
                    type: "name",
                    title: "IGMP-Proxy",
                    content: "IGMP (Internet Group Management Protocol) wird verwendet, um Multicasting auf TCP/IP-Netzwerken zu verwalten. Einige Internetanbieter setzen IGMP ein, um am Router eine Fernkonfiguration durchzuführen. Standardmäßig ist dies aktiviert."
                }, {
                    type: "name",
                    title: "IP durch Unicast-DHCP beziehen",
                    content: "Markieren Sie dieses Kontrollkästchen, wenn der DHCP-Server Ihres Internetanbieters die Übertragung von Anwendungen nicht unterstützt, und Sie die IP-Adresse nicht dynamisch beziehen können."
                }, {
                    type: "name",
                    title: "Folgende DNS-Adresse verwenden",
                    content: "Wählen Sie dieses Kontrollkästchen und geben Sie die DNS-Server-Adresse(n) in Dezimalpunktschreibweise ein, wie von Ihrem Internetanbieter zugeteilt. Diese WAN-Schnittstelle verwendet vorrangig den angegebenen DNS-Server."
                }, {
                    type: "name",
                    title: "Hostname",
                    content: "Geben Sie den Hostnamen dieser WAN-Schnittstelle ein."
                }]
            }, {
                type: "title2",
                content: "Verbindungstyp: Statische IP-Adresse"
            }, {
                type: "name",
                title: "Statische IP-Adresse",
                content: "Verwenden Sie diesen Typ, wenn Sie von Ihrem Internetanbieter eine bestimmte (feste) IP-Adresse, Subnetzmaske, Gateway und DNS-Parameter erhalten haben."
            }, {
                type: "name",
                title: "IP-Adresse/Subnetzmaske/Gateway/DNS-Server/sekundärer DNS-Server",
                content: "Geben Sie die von Ihrem Internetanbieter erhaltenen IP-Informationen in Dezimalpunktschreibweise ein."
            }, {
                type: "paragraph",
                content: "Klicken Sie auf <b>Erweitert</b>, um die erweiterten Einstellungen anzuzeigen."
            }, {
                type: "name",
                title: "Erweitert",
                children: [{
                    type: "name",
                    title: "MTU-Größe (in Bytes)",
                    content: "Die Standard- und typische MTU-Größe (Maximum Transmission Unit) der meisten Ethernet-Netzwerke beträgt <b>1500 Bytes</b>. Diese MTU-Größe sollte nur dann geändert werden, wenn es vom Internetanbieter verlangt wird."
                }, {
                    type: "name",
                    title: "IGMP-Proxy",
                    content: "IGMP (Internet Group Management Protocol) wird verwendet, um Multicasting auf TCP/IP-Netzwerken zu verwalten. Einige Internetanbieter setzen IGMP ein, um am Router eine Fernkonfiguration durchzuführen. Standardmäßig ist dies aktiviert."
                }]
            }, {
                type: "title2",
                content: "Verbindungstyp: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Wählen Sie diesen Typ, wenn Sie einen DSL-Dienst  (Digital Subscriber Line) verwenden, und von Ihrem Internetanbieter einen Benutzernamen und ein Passwort erhalten haben."
            }, {
                type: "name",
                title: "PPPoE-Benutzername/PPPoE-Passwort/Passwort bestätigen",
                content: "Geben Sie Benutzername und Passwort ein, die Sie von Ihrem Internetanbieter erhalten haben. Diese Felder unterscheiden zwischen Groß- und Kleinschreibung."
            }, {
                type: "name",
                title: "Sekundäre Verbindung",
                content: "Dies ist nur für eine PPPoE-Verbindung verfügbar. Wenn Ihr Internetanbieter für die Verbindung mit einem lokalen Netzwerk (LAN) einen eigenen Verbindungstyp zur Verfügung stellt, wie z. B. Dynamische/Statische IP-Adresse, dann können Sie das Optionsfeld „Dynamische/Statische IP-Adresse“ markieren, um diese sekundäre Verbindung zu aktivieren.<br>Die sekundäre Verbindung ist standardmäßig deaktiviert, d. h. es ist nur die PPPoE-Verbindung vorhanden. Aktivieren Sie dies nur, wenn es unvermeidlich ist."
            }, {
                type: "name",
                title: "Verbindungsmodus",
                content: "Wählen Sie einen der unten angeführten Verbindungsmodi, die festlegen, wie mit dem Internet verbunden wird:",
                children: [{
                    type: "name",
                    title: "Immer",
                    content: "Wählen Sie diesen Modus, um sich jederzeit automatisch wieder zu verbinden, wenn die Verbindung unterbrochen wird."
                }, {
                    type: "name",
                    title: "Bei Bedarf verbinden",
                    content: "Wählen Sie diesen Modus, um die Internetverbindung nach einer bestimmten Inaktivitätszeit („Max. Leerlaufzeit“) zu trennen. Die Verbindung wird wieder hergestellt, wenn Sie erneut versuchen, auf das Internet zuzugreifen."
                }, {
                    type: "name",
                    title: "Manuell verbinden",
                    content: "Wählen Sie diesen Modus, um die Internetverbindung manuell herzustellen oder zu trennen, bzw. basierend auf einer bestimmten Inaktivitätszeit („Max. Leerlaufzeit“)."
                }, {
                    type: "name",
                    title: "Max. Leerlaufzeit",
                    content: "<b>15 Minuten</b> – Geben Sie die Anzahl der Minuten ein, die die Internetverbindung im Leerlauf sein darf, bevor sie getrennt wird. Die Standard-Leerlaufzeit ist 15 Minuten."
                }]
            }, {
                type: "name",
                title: "Authentifizierungstyp",
                content: "Wählen Sie einen Authentifizierungstyp aus der Dropdown-Liste aus. Die Standardmethode ist AUTO_AUTH."
            }, {
                type: "name",
                title: "Verbinden/Trennen",
                content: "Klicken Sie hier, um sofort zu verbinden/trennen."
            }, {
                type: "paragraph",
                content: "Klicken Sie auf <b>Erweitert</b>, um die erweiterten Einstellungen anzuzeigen."
            }, {
                type: "name",
                title: "Erweitert",
                children: [{
                    type: "name",
                    title: "Dienstname",
                    content: "Geben Sie den Namen des Dienstes ein, den Sie von Ihrem Internetanbieter erhalten haben. Andernfalls lassen Sie dieses Feld leer."
                }, {
                    type: "name",
                    title: "Servername",
                    content: "Geben Sie den Namen des Servers ein, den Sie von Ihrem Internetanbieter erhalten haben. Andernfalls lassen Sie dieses Feld leer."
                }, {
                    type: "name",
                    title: "MTU-Größe (in Bytes)",
                    content: "Die typische MTU-Größe (Maximum Transmission Unit) von Ethernet-Netzwerken ist 1480 Bytes.",
                    children: [{
                        type: "paragraph",
                        content: "<b>Hinweis</b>: In manchen Fällen kann Ihnen Ihr Internetanbieter empfehlen, für bessere Netzwerkleistung die MTU-Größe anzupassen. Sie sollten diesen Wert nur ändern, wenn es unbedingt notwendig ist."
                    }]
                }, {
                    type: "name",
                    title: "IGMP-Proxy",
                    content: "IGMP (Internet Group Management Protocol) wird verwendet, um Multicasting auf TCP/IP-Netzwerken zu verwalten. Einige Internetanbieter setzen IGMP ein, um am Router eine Fernkonfiguration durchzuführen. Standardmäßig ist dies aktiviert."
                }, {
                    type: "name",
                    title: "Vom Internetanbieter erhaltene IP-Adresse verwenden",
                    content: "Wählen Sie diese Option, und geben Sie die von Ihrem Internetanbieter zugeteilte IP-Adresse ein."
                }, {
                    type: "name",
                    title: "Echo-Anfragen-Intervall",
                    content: "Geben Sie ein Zeitintervall zwischen 0 und 120 (in Sekunden) ein, in dem der Router den Zugangskonzentrator (Access Concentrator) auffordert, ein Echo zu senden. Der Standardwert ist 30. 0 bedeutet keine Erkennung."
                }, {
                    type: "name",
                    title: "Folgende DNS-Adresse verwenden",
                    content: "Wählen Sie dieses Kontrollkästchen und geben Sie die DNS-Server-Adresse(n) in Dezimalpunktschreibweise ein, wie von Ihrem Internetanbieter zugeteilt. Diese WAN-Schnittstelle verwendet vorrangig den angegebenen DNS-Server."
                }]
            }, {
                type: "title2",
                content: "Verbindungstyp: L2TP/PPTP"
            }, {
                type: "name",
                title: "L2TP/PPTP",
                content: "Wählen Sie diesen Typ, wenn Sie sich mit einem L2TP/PPTP VPN-Server verbinden möchten, und von Ihrem Internetanbieter Benutzername, Passwort und IP-Adresse/Domainname des Servers erhalten haben."
            }, {
                type: "name",
                title: "Benutzername/Passwort",
                content: "Geben Sie Benutzername und Passwort ein, die Sie von Ihrem Internetanbieter erhalten haben. Diese Felder unterscheiden zwischen Groß- und Kleinschreibung."
            }, {
                type: "name",
                title: "IP-Adresse/Primärer DNS-Server",
                content: "Diese Parameter werden vom DHCP-Server Ihres Internetanbieters automatisch zugewiesen."
            }, {
                type: "name",
                title: "Sekundäre Verbindung (dynamische oder statische IP-Adresse)",
                children: [{
                    type: "name",
                    title: "Dynamische IP-Adresse",
                    content: "Wählen Sie diese Option, wenn IP-Adresse und Subnetzmaske von Ihrem Internetanbieter automatisch zugewiesen werden."
                }, {
                    type: "name",
                    title: "Statische IP-Adresse",
                    content: "Wählen Sie diese Option, wenn Sie IP-Adresse, Subnetzmaske, Gateway und DNS-Adressen von Ihrem Internetanbieter erhalten haben, und geben Sie diese Informationen in die entsprechenden Felder ein."
                }]
            }, {
                type: "name",
                title: "VPN-Server-IP/Domainname",
                content: "Geben Sie die IP-Adresse oder den Domainnamen des VPN-Servers ein, die Sie von Ihrem Internetdiensteanbieter erhalten haben."
            }, {
                type: "name",
                title: "MTU-Größe",
                content: "Die Standard- und typische MTU-Größe (Maximum Transmission Unit) der meisten Ethernet-Netzwerke beträgt 1460 Bytes (1420 bei PPTP). Die MTU-Größe sollte nur dann geändert werden, wenn es vom Internetanbieter verlangt wird."
            }, {
                type: "name",
                title: "Verbindungsmodus",
                content: "Wählen Sie einen geeigneten Verbindungsmodus, der festlegt, wie mit dem Internet verbunden wird.",
                children: [{
                    type: "name",
                    title: "Immer EIN",
                    content: "In diesem Modus wird die Internetverbindung automatisch wieder hergestellt, wenn sie unterbrochen wird."
                }, {
                    type: "name",
                    title: "Bei Bedarf verbinden",
                    content: "In diesem Modus wird die Internetverbindung nach einer bestimmten Zeit der Inaktivität (Max. Leerlaufzeit) automatisch getrennt. Die Verbindung wird wieder hergestellt, wenn Sie erneut versuchen, auf das Internet zuzugreifen."
                }, {
                    type: "name",
                    title: "Manuell verbinden",
                    content: "In diesem Modus wird die Internetverbindung manuell durch Anklicken der Schaltfläche „Verbinden“ bzw. „Trennen“ gesteuert. Dieser Modus unterstützt auch die „Max. Leerlaufzeit“-Funktion. Geben Sie eine maximale Leerlaufzeit (in Minuten) ein, die das Internet maximal inaktiv sein darf, bevor die Verbindung getrennt wird. Der Standardwert ist 15 Minuten. Wenn Sie möchten, dass die Internetverbindung stets aktiv bleibt, geben Sie 0 (Null) ein."
                }]
            }, {
                type: "title",
                content: "MAC-Klon"
            }, {
                type: "name",
                title: "Standard-MAC-Adresse verwenden",
                content: "Wählen Sie diese Option, um die Standard-MAC-Adresse zu verwenden, falls der Internetanbieter der MAC-Adresse des Routers keine IP-Adresse zugewiesen hat."
            }, {
                type: "name",
                title: "Aktuelle Computer-MAC-Adresse verwenden",
                content: "Wählen Sie diese Option, um die MAC-Adresse des derzeit angeschlossenen Computers zu verwenden, falls der Internetanbieter den Internetzugang nur über diesen Computer erlaubt."
            }, {
                type: "name",
                title: "Benutzerdefinierte MAC-Adresse verwenden",
                content: "Wählen Sie diese Option, um die registrierte MAC-Adresse manuell einzugeben."
            }]
        },
        route: {
            TITLE: "Erweitertes Routing",
            CONTENT: [{
                    type: "paragraph",
                    content: "Erweitertes Routing wird verwendet, um eine feste Route zu bestimmen, die die Netzwerk-Informationspakete nehmen müssen, um einen bestimmten Host oder ein bestimmtes Netzwerk zu erreichen."
                }, {
                    type: "title",
                    content: "Statisches Routing"
                }, {
                    type: "name",
                    title: "Ziel-IP-Adresse/Subnetzmaske/Gateway",
                    content: "Zeigt IP-Adresse, Subnetzmaske und Gateway der statischen Route an."
                }, {
                    type: "name",
                    title: "Aktivieren",
                    content: "Zeigt den aktuellen Status einer statischen Route an. Klicken Sie auf das <b>Ballonsymbol</b>, um die statische Route zu aktivieren oder deaktivieren."
                }, {
                    type: "name",
                    title: "Ändern",
                    content: "Zeigt die Optionen an, um den entsprechenden Eintrag zu <b>Ändern</b> oder zu <b>Löschen</b>."
                }, {
                    type: "note",
                    title: "Einrichten eines statischen Routings",
                    content: [
                        "Klicken Sie auf <b>Hinzufügen</b>.",
                        "Geben Sie eine Ziel-IP-Adresse ein, die der statischen Route für diesen Eintrag zugewiesen werden soll.",
                        "Geben Sie eine Subnetzmaske ein, um den Netzwerk- und den Hostanteil der IP-Adresse zu bestimmen.",
                        "Geben Sie ein Gateway-IP-Adressformat ein, um den Router mit dem Netzwerk zu verbinden.",
                        "Wählen Sie <b>LAN</b> oder eine WAN-Schnittstelle, um die Art der Ziel-IP-Adresse anzugeben.",
                        "Klicken Sie auf <b>Diesen Eintrag aktivieren</b>.",
                        "Klicken Sie auf <b>OK</b>."
                    ]
                }, {
                    type: "title",
                    content: "System-Routing-Tabelle"
                }, {
                    type: "paragraph",
                    content: "Die System-Routing-Tabelle zeigt alle gültigen Routeneinträge an, die derzeit in Gebrauch sind."
                }, {
                    type: "paragraph",
                    content: "Klicken Sie auf „Aktualisieren“, um die Routing-Tabelle zu aktualisieren."
                }

            ]
        },
        ddns: {
            TITLE: "Einstellungen des Dynamischen DNS",
            CONTENT: [{
                    type: "paragraph",
                    content: "Das dynamische DNS (Domain Name System) ermöglicht Ihnen, einer dynamischen IP-Adresse einen festen Host- und Domainnamen zuzuweisen. Dies ist nützlich, wenn Sie Ihre eigene Website, FTP-Server oder einen anderen Server hinter dem Router hosten. Zuvor müssen Sie sich bei einem DDNS-Dienstanbieter anmelden, wie z. B. <a href='http://www.dyndns.com'>www.dyndns.com</a>."
                }, {
                    type: "name",
                    title: "Dienstanbieter",
                    content: "Wählen Sie Ihren DDNS-Dienstanbieter. Falls Sie noch kein DDNS-Konto registriert haben, klicken Sie auf <b>Zur Registrierung</b>."
                }, {
                    type: "name",
                    title: "Benutzername/Passwort",
                    content: "Geben Sie den Benutzernamen und das Passwort Ihres DDNS-Kontos ein."
                }, {
                    type: "name",
                    title: "Domainname",
                    content: "Geben Sie den Namen der Domain ein, den Sie von Ihrem DDNS-Dienstanbieter erhalten haben."
                }, {
                    type: "name",
                    title: "Anmelden/Abmelden",
                    content: "Klicken Sie hier, um sich beim DDNS-Dienst an- oder von ihm abzumelden."
                }, {
                    type: "name",
                    title: "Speichern",
                    content: "Klicken Sie hierauf, um alle Einstellungen zu speichern."
                }, {
                    type: "paragraph",
                    content: "Um zwischen Ihren DDNS-Konten umzuschalten, müssen Sie zuerst auf „Abmelden“ klicken, um sich von Ihrem aktuellen Konto abzumelden, und sich dann wieder bei einem anderen Konto anmelden."
                }


            ]
        },
        dhcp: {
            TITLE: "DHCP-Server",
            CONTENT: [{
                type: "paragraph",
                content: "Ein DHCP-Server (Dynamic Host Configuration Protocol) weist dynamisch den Clientgeräten aus einem IP-Adresspool eine TCP/IP-Konfiguration zu. Deaktivieren Sie auf keinen Fall den Standard-DHCP-Server, es sei denn, Sie haben einen anderen DHCP-Server oder Sie möchten die TCP/IP-Konfiguration den einzelnen Clients in Ihrem Netzwerk manuell zuweisen."
            }, {
                type: "name",
                title: "IP-Adresspool",
                content: "Geben Sie den Bereich von IP-Adressen ein, die an die Clients verliehen werden können."
            }, {
                type: "name",
                title: "Adresshaltezeit",
                content: "Geben Sie die Zeitdauer ein, die eine IP-Adresse an einen Client verliehen werden kann (1 bis 2880 Minuten)."
            }, {
                type: "name",
                title: "Standard-Gateway",
                content: "Geben Sie die LAN-IP-Adresse ein. (Optional)"
            }, {
                type: "name",
                title: "DNS-Server/sekundärer DNS-Server",
                content: "Geben Sie die DNS-Server-Adressen ein, die Sie von Ihrem Internetdiensteanbieter erhalten haben. (Optional)"
            }, {
                type: "title",
                content: "Clientliste"
            }, {
                type: "name",
                title: "Gesamtanzahl Clients",
                content: "Zeigt die Gesamtanzahl der zugehörigen DHCP-Clients an."
            }, {
                type: "name",
                title: "Clientname",
                content: "Zeigt den Namen des DHCP-Clients an."
            }, {
                type: "name",
                title: "MAC-Adresse",
                content: "Zeigt die MAC-Adresse an."
            }, {
                type: "name",
                title: "Zugewiesene IP-Adresse",
                content: "Zeigt die vom DHCP-Server dem Client zugewiesene IP-Adresse an."
            }, {
                type: "name",
                title: "Haltezeit",
                content: "Zeigt die Dauer an, die eine IP-Adresse an einen Client verliehen wird."
            }, {
                type: "name",
                title: "Aktualisieren",
                content: "Klicken Sie hier zum Aktualisieren der DHCP-Client-Liste."
            }, {
                type: "title",
                content: "Adress-Reservierung"
            }, {
                type: "paragraph",
                content: "Sie können manuell eine IP-Adresse für einen mit dem Router verbundenen Client reservieren. Nach der Reservierung wird diese IP-Adresse vom DHCP-Server immer demselben Client zugewiesen."
            }, {
                type: "name",
                title: "MAC-Adresse",
                content: "Zeigt die MAC-Adresse des Clients mit der DHCP-reservierten IP-Adresse an."
            }, {
                type: "name",
                title: "Reservierte IP-Adresse",
                content: "Zeigt die reservierte IP-Adresse des Clients an."
            }, {
                type: "name",
                title: "Beschreibung",
                content: "Zeigt die Beschreibung des Geräts an."
            }, {
                type: "name",
                title: "Aktivieren",
                content: "Klicken Sie hier, um den entsprechenden Eintrag zu aktivieren oder deaktivieren."
            }, {
                type: "name",
                title: "Ändern",
                content: "Zeigt die Optionen an, um den entsprechenden Client zu <b>Ändern</b> oder zu <b>Löschen</b>."
            }, {
                type: "note",
                title: "Reservieren einer IP-Adresse für einen DHCP-Client",
                content: [
                    "Klicken Sie auf <b>Hinzufügen</b>.",
                    "Geben Sie die <b>MAC-Adresse</b> des Clients ein.",
                    "Geben Sie die IP-Adresse ein, die Sie für den Client reservieren möchten.",
                    "Geben Sie die Beschreibung des Geräts ein.",
                    "Klicken Sie auf <b>Diesen Eintrag aktivieren</b>.",
                    "Klicken Sie auf <b>OK</b>."
                ]
            }, {
                type: "note",
                title: "Einen bestehenden Client ändern oder löschen",
                content: [
                    "Klicken Sie auf das <b>Bearbeiten</b>- oder <b>Papierkorb</b>-Symbol des entsprechenden Eintrags."
                ]
            }, {
                type: "title",
                content: "Condition-Pool"
            }, {
                type: "name",
                title: "Händler-ID/Start-IP-Adresse/End-IP-Adresse/Einrichtung",
                content: "Zeigt Händler-ID, Start-IP-Adresse, End-IP-Adresse und Einrichtung des Condition-Pools an."
            }, {
                type: "name",
                title: "Status",
                content: "Zeigt den aktuellen Status des Condition-Pools an. Durch Klicken auf das Ballonsymbol wird der Condition-Pool aktiviert oder deaktiviert."
            }, {
                type: "name",
                title: "Ändern",
                content: "Zeigt die Optionen an, um den entsprechenden Client zu <b>Ändern</b> oder zu <b>Löschen</b>."
            }, {
                type: "note",
                title: "Hinzufügen eines Condition-Pools",
                content: [
                    "Klicken Sie auf <b>Hinzufügen</b>.",
                    "Geben Sie den LAN-Gerätenamen ein.",
                    "Geben Sie einen Wert zur Identifizierung des Händlers und der Funktionalität des DHCP-Clients ein.",
                    "Geben Sie die Start-IP-Adresse ein, die der DHCP-Server den Clients zuweist.",
                    "Geben Sie die End-IP-Adresse ein, die der DHCP-Server den Clients zuweist.",
                    "Geben Sie das Standard-Gateway des DHCP-Servers ein.",
                    "Wählen Sie einen Gerätetyp aus der Dropdown-Liste aus.",
                    "Wählen Sie eine Option aus der Dropdown-Liste aus.",
                    "Geben Sie den Optionswert ein.",
                    "Klicken Sie auf <b>Diesen Eintrag aktivieren</b>.",
                    "Klicken Sie auf <b>OK</b>."
                ]
            }]
        },
        iptv: {
            TITLE: "IPTV-Einstellungen",
            CONTENT: [{
                    type: "name",
                    title: "IPTV",
                    content: "Wählen Sie dies, um die IPTV-Funktion zu aktivieren."
                }, {
                    type: "name",
                    title: "Modus",
                    content: "Wählen Sie den geeigneten Modus gemäß Ihres Internetanbieters aus. Es gibt sechs IPTV-Modi:",
                    children: [{
                        type: "name",
                        title: "Brücke",
                        content: "Wählen Sie diese Option, wenn Ihr Internetanbieter nicht aufgeführt ist und keine anderen Parameter vorgegeben sind.",
                        children: [{
                            type: "name",
                            title: "LAN 1/2/3/4",
                            content: "Legen Sie fest, ob Ihr LAN-Port als Internet- oder als IPTV-Anbieter funktionieren soll."
                        }]
                    }, {
                        /*type: "name",
                        title: "Russland",
                        content: "Wählen Sie diese Option, wenn Ihr Internetanbieter aus Russland ist, und die erforderlichen Parameter vorgegeben sind, einschließlich Internet/IP-Telefon/IPTV-VLAN-IDs und Priorität, sowie LAN-Port (1/2/3/4).",
                        children: [{
                            type: "name",
                            title: "IPTV-Multicast VLAN-ID/Priorität",
                            content: "Sie können die IPTV-Multicast-Funktion nach Belieben aktivieren, und die VLAN-ID sowie die Priorität gemäß Ihrem Internetanbieter konfigurieren."
                        }]
                    }, {*/
                        type: "name",
                        title: "Singapur – ExStream",
                        content: "Wählen Sie diese Option, wenn Ihr Internetanbieter ExStream aus Singapur ist, und die erforderlichen Parameter vorgegeben sind, einschließlich Internet/IPTV-VLAN-IDs und Priorität, sowie LAN-Port (1/2/3/4)."
                    }, {
                        type: "name",
                        title: "Malaysia – Unifi",
                        content: "Wählen Sie diese Option, wenn Ihr Internetanbieter Unifi aus Malaysia ist, und die erforderlichen Parameter vorgegeben sind, einschließlich Internet/IPTV-VLAN-IDs und Priorität, sowie LAN-Port (1/2/3/4)."
                    }, {
                        type: "name",
                        title: "Malaysia – Maxis",
                        content: "Wählen Sie diese Option, wenn Ihr Internetanbieter Maxis aus Malaysia ist, und die erforderlichen Parameter vorgegeben sind, einschließlich Internet/IP-Telefon/IPTV-VLAN-IDs und Priorität, sowie LAN-Port (1/2/3/4)."
                    }, {
                        type: "name",
                        title: "Benutzerdefiniert",
                        content: "Wählen Sie diese Option, wenn Ihr Internetanbieter nicht aufgeführt ist, jedoch die erforderlichen Parameter vorgibt, einschließlich Internet/IP-Telefon/IPTV-VLAN-IDs und Priorität, sowie LAN-Port (1/2/3/4).",
                        children: [{
                            type: "name",
                            title: "Internet/IP-Telefon/IPTV-VLAN-ID/Priorität",
                            content: "Konfigurieren Sie die VLAN-IDs, so wie Sie sie von Ihrem Internetanbieter erhalten haben."
                        }, {
                            type: "name",
                            title: "802.11Q-Markierung",
                            content: "Wählen Sie, ob die Internet-Pakete mit „802.11Q“ markiert werden sollen."
                        }, {
                            type: "name",
                            title: "LAN 1/2/3/4",
                            content: "Legen Sie fest, ob Ihr LAN-Port als Internet- oder als IPTV-Anbieter funktionieren soll."
                        }, {
                            type: "name",
                            title: "IPTV-Multicast VLAN-ID/Priorität",
                            content: "Sie können die IPTV-Multicast-Funktion nach Belieben aktivieren, und die VLAN-ID sowie die Priorität gemäß Ihrem Internetanbieter konfigurieren."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "IGMP-Proxy",
                    content: "Wählen Sie die IGMP-Proxyversion (Internet Group Management Protocol), entweder V2 oder V3, je nach Ihrem Internetanbieter."
                }



            ]
        },
        usbManage: {
            TITLE: "USB-Speichergerät",
            CONTENT: [{
                type: "paragraph",
                content: "Der Bildschirm <b>USB-Speichergerät</b> zeigt grundlegende Informationen über das an den USB-Port angeschlossene USB-Speichergerät an."
            }, {
                type: "name",
                title: "Scannen",
                content: "Normalerweise erkennt der Router automatisch neu angeschlossene Geräte. Falls dies nicht der Fall ist, klicken Sie auf diese Schaltfläche, um nach USB-Geräten zu suchen und die angezeigten Informationen zu aktualisieren."
            }, {
                type: "name",
                title: "Datenträgername",
                content: "Zeigt den Namen des USB-Speichergeräts an."
            }, {
                type: "name",
                title: "Kapazität",
                content: "Zeigt die gesamte Speicherkapazität des USB-Geräts an."
            }, {
                type: "name",
                title: "Freier Speicherplatz",
                content: "Zeigt den aktuell verfügbaren freien Speicherplatz an."
            }, {
                type: "name",
                title: "Aktiv",
                content: "Dieses Kontrollkästchen wird nur angezeigt, wenn ein USB-Speichergerät an den Router angeschlossen ist. Wählen Sie dies, um die Dateifreigabe des USB-Geräts zu aktivieren."
            }, {
                type: "name",
                title: "Sicher entfernen",
                content: "Klicken Sie auf diese Schaltfläche, um das USB-Speichergerät sicher zu trennen, bevor es vom Router physisch abgesteckt wird. Die Schaltfläche „Sicher entfernen“ wird nur angezeigt, wenn ein USB-Speichergerät an den Router angeschlossen ist. Beachten Sie auch, dass Sie ein USB-Gerät nicht (softwaremäßig) trennen können, während es verwendet wird."
            }, {
                type: "title",
                content: "Einstellungen freigeben"
            }, {
                type: "name",
                title: "Netzwerk-Media/Servername",
                content: "Zeigt den Namen an, der verwendet wird, um auf das angeschlossene USB-Speichergerät zuzugreifen."
            }, {
                type: "title",
                content: "Ordnerfreigabe"
            }, {
                type: "name",
                title: "Alle freigeben",
                content: "Schalten Sie dies ein, um alle Dateien und Ordner freizugeben, oder aus, um nur die ausgewählten Ordner freizugeben."
            }, {
                type: "name",
                title: "Authentifizierung aktivieren",
                content: "Schalten Sie dies ein, um die Authentifizierung zu aktivieren. Hierbei muss der Benutzer einen gültigen Benutzernamen und ein Passwort eingeben, um auf die freigegebenen Ordner zugreifen zu können."
            }, {
                type: "name",
                title: "Ordnername",
                content: "Zeigt den Namen des freigegebenen Ordners an. "
            }, {
                type: "name",
                title: "Ordnerpfad",
                content: "Zeigt den Pfad zum freigegebenen Ordner an. "
            }, {
                type: "name",
                title: "Datenträgername",
                content: "Zeigt den Namen des freigegebenen Speichergeräts an."
            }]
        },
        printSrv: {
            TITLE: "Druckserver",
            CONTENT: [{
                type: "name",
                title: "Druckserver aktivieren",
                content: "Schalten Sie dies ein, um die Druckserver-Funktion zu aktivieren."
            }, {
                type: "name",
                title: "Druckername",
                content: "Zeigt den Namen des mit dem Router verbundenen Druckers an."
            }]
        },
        diskSettings: {
            TITLE: "USB-Speichergerät",
            CONTENT: [{
                type: "paragraph",
                content: "Der Bildschirm <b>USB-Speichergerät</b> zeigt grundlegende Informationen über das an den USB-Port angeschlossene USB-Speichergerät an."
            }, {
                type: "name",
                title: "Scannen",
                content: "Normalerweise erkennt der Router automatisch neu angeschlossene Geräte. Falls dies nicht der Fall ist, klicken Sie auf diese Schaltfläche, um nach USB-Geräten zu suchen und die angezeigten Informationen zu aktualisieren."
            }, {
                type: "name",
                title: "Datenträgername",
                content: "Zeigt den Namen des USB-Speichergeräts an."
            }, {
                type: "name",
                title: "Kapazität",
                content: "Zeigt die gesamte Speicherkapazität des USB-Geräts an."
            }, {
                type: "name",
                title: "Freier Speicherplatz",
                content: "Zeigt den aktuell verfügbaren freien Speicherplatz an."
            }, {
                type: "name",
                title: "Aktiv",
                content: "Dieses Kontrollkästchen wird nur angezeigt, wenn ein USB-Speichergerät an den Router angeschlossen ist. Wählen Sie dies, um die Dateifreigabe des USB-Geräts zu aktivieren."
            }, {
                type: "name",
                title: "Sicher entfernen",
                content: "Klicken Sie auf diese Schaltfläche, um das USB-Speichergerät sicher zu trennen, bevor es vom Router physisch abgesteckt wird. Die Schaltfläche „Sicher entfernen“ wird nur angezeigt, wenn ein USB-Speichergerät an den Router angeschlossen ist. Beachten Sie auch, dass Sie ein USB-Gerät nicht (softwaremäßig) trennen können, während das aktuelle Laufwerk verwendet wird."
            }, {
                type: "note",
                title: "Einrichten eines Dateiservers",
                content: [
                    "Stecken Sie das USB-Speichergerät über ein USB-Kabel in den USB-Port des Routers.",
                    "Der Router sollte das neu angeschlossene USB-Gerät automatisch erkennen, und die Informationen im Bereich <b>Geräteeinstellungen</b> anzeigen. Falls nicht, klicken Sie auf <b>Scannen</b>.",
                    "Klicken Sie auf das <b>Aktiv</b>-Symbol, um die Dateifreigabe zu aktivieren."
                ]
            }]
        },
        folderSharing: {
            TITLE: "Freigabekonto",
            CONTENT: [{
                type: "name",
                title: "Konto",
                content: "Sie können entweder <b>Standardkonto verwenden</b> wählen, um sich bei den freigegebenen Dateien und Ordnern anzumelden, oder <b>Neues Konto verwenden</b>, und dann folgende Daten eingeben, um ein neues Benutzerkonto zu erstellen."
            }, {
                type: "name",
                title: "Benutzername/Passwort",
                content: "Geben Sie bis zu 15 Zeichen ein, bestehend aus Buchstaben, Ziffern und/oder Unterstrichen. Der Benutzername muss mit einem Buchstaben beginnen. Diese Felder unterscheiden zwischen Groß- und Kleinschreibung. "
            }, {
                type: "paragraph",
                content: "Klicken Sie auf <b>Speichern</b>, um die Kontoeinstellungen zu speichern."
            }, {
                type: "title",
                content: "Einstellungen freigeben"
            }, {
                type: "name",
                title: "Netzwerk-/Medien-Servername",
                content: "Zeigt den Namen an, der verwendet wird, um auf das angeschlossene USB-Speichergerät zuzugreifen."
            }, {
                type: "name",
                title: "Aktivieren",
                content: "Markieren Sie das/die Kontrollkästchen, um die entsprechende(n) Zugriffsmethode(n) zu aktivieren."
            }, {
                type: "name",
                title: "Zugriffsmethode",
                content: "Es gibt vier Methoden, um auf das freigegebene USB-Speichergerät zuzugreifen.",
                children: [{
                    type: "name",
                    title: "Medienserver",
                    content: "Wählen Sie diese Option, um den Benutzern in Ihrem Netzwerk zu gestatten, mit DLNA-unterstützten Geräten, wie Computern, mobilen Geräten und Spielekonsolen, Fotos anzusehen, sowie Musik und Filme abzuspielen, die auf Ihren freigegebenen USB-Speichergeräten liegen."
                }, {
                    type: "name",
                    title: "Netzwerkumgebung",
                    content: "Wählen Sie diese Option, um den Benutzern in Ihrem Netzwerk zu gestatten, auf die freigegebenen Inhalte über die in der Spalte „Adresse“ gezeigte Adresse zuzugreifen."
                }, {
                    type: "name",
                    title: "FTP",
                    content: "Wählen Sie diese Option, um die FTP-Server-Funktion zu aktivieren, die den FTP-Clients und Benutzern in Ihrem Netzwerk gestattet, auf das USB-Speichergerät über die in der Spalte „Adresse“ gezeigte FTP-Adresse zuzugreifen. Um den FTP-Serverport zu ändern, geben Sie eine neue Portnummer ein, und klicken Sie auf <b>Speichern</b>, um die Änderungen zu übernehmen."
                }, {
                    type: "name",
                    title: "FTP (über Internet)",
                    content: "Wählen Sie diese Option, um den FTP-Clients und Benutzern gestatten, aus der Ferne Dateien per FTP über das Internet vom bzw. auf das freigegebene USB-Speichergerät Dateien herunter- bzw. hochzuladen."
                }]
            }, {
                type: "name",
                title: "Zugriff",
                content: "Zeigt die Adresse an, die verwendet wird, um auf das freigegebene USB-Speichergerät zuzugreifen."
            }, {
                type: "name",
                title: "Port",
                content: "Zeigt die Portnummer des FTP-Servers an."
            }, {
                type: "title",
                content: "Ordnerfreigabe"
            }, {
                type: "name",
                title: "Alle freigeben",
                content: "Schalten Sie dies ein, um alle Dateien und Ordner freizugeben, oder aus, um nur die ausgewählten Ordner freizugeben."
            }, {
                type: "name",
                title: "Authentifizierung aktivieren",
                content: "Schalten Sie dies ein, um die Authentifizierung zu aktivieren. Hierbei muss der Benutzer einen gültigen Benutzernamen und ein Passwort eingeben, um auf die freigegebenen Ordner zugreifen zu können."
            }, {
                type: "name",
                title: "Ordnername",
                content: "Zeigt den Namen des freigegebenen Ordners an. "
            }, {
                type: "name",
                title: "Ordnerpfad",
                content: "Zeigt den Pfad zum freigegebenen Ordner an. "
            }, {
                type: "name",
                title: "Medienfreigabe",
                content: "Zeigt an, ob die Medienfreigabe-Funktion aktiviert (EIN) oder deaktiviert ist."
            }, {
                type: "name",
                title: "Datenträgername",
                content: "Zeigt den Namen des freigegebenen Speichergeräts an."
            }, {
                type: "name",
                title: "Status",
                content: "Zeigt den aktuellen Status eines freigegebenen Ordners an. Durch Klicken auf das Ballonsymbol wird die Ordnerfreigabe aktiviert oder deaktiviert."
            }, {
                type: "name",
                title: "Ändern",
                content: "Zeigt die Optionen an, um den entsprechenden freigegebenen Ordner zu <b>Ändern</b> oder zu <b>Löschen</b>."
            }, {
                type: "note",
                title: "Hinzufügen eines Ordnerfreigabe-Eintrags:",
                content: [
                    "Deaktivieren Sie <b>Alle freigeben</b>.",
                    "Klicken Sie auf <b>Hinzufügen</b>.",
                    "Wählen Sie <b>Datenträgername</b> und <b>Ordnerpfad</b>.",
                    "Erstellen Sie einen Ordnernamen.",
                    "Legen Sie fest, wie Sie den Ordner freigeben möchten:<br /><b>Authentifizierung aktivieren</b> – Benutzer müssen sich mit einem gültigen Benutzernamen und Passwort authentifizieren.<br /><b>Schreibberechtigung aktivieren</b> – Benutzer dürfen Änderungen am Ordnerinhalt vornehmen.<br /><b>Medienfreigabe aktivieren</b> – Die Medienfreigabe wird aktiviert.<br />"
                ]
            }]
        },
        ipsec: {
            TITLE: "IPsec-Einstellungen",
            CONTENT: [{
                type: "name",
                title: "Dead-Peer-Erkennung",
                content: "Die Dead-Peer-Erkennung ist eine Methode zur Erkennung von inaktiven Internet Key Exchange (IKE) Peers. Die Dead-Peer-Erkennung wird verwendet, um verlorene Ressourcen zurückzufordern, falls ein Peer inaktiv ist, und dient auch als IKE-Peer-Ausfallsicherung. Schalten Sie dies ein, um die „Dead-Peer-Erkennung“-Funktion zu aktivieren."
            }, {
                type: "name",
                title: "Verbindungsname/Remote-Gateway/lokale Adresse/Remote-Adresse",
                content: "Zeigt Verbindungsname, Remote-Gateway, lokale Adresse und Remote-Adresse des IPsec-Eintrags an."
            }, {
                type: "name",
                title: "Status",
                content: "Zeigt den Status des IPsec-Eintrags an. Der Status beinhaltet:",
                children: [{
                    type: "name",
                    title: "Deaktiviert",
                    content: "Der Eintrag ist deaktiviert."
                }, {
                    type: "name",
                    title: "Außer Betrieb",
                    content: "Der Eintrag ist zwar aktiviert, hat aber keine Verbindung."
                }, {
                    type: "name",
                    title: "In Betrieb",
                    content: "Der Eintrag ist aktiviert und verfügt über eine korrekte Verbindung. "
                }]
            }, {
                type: "name",
                title: "Aktivieren",
                content: "Durch Klicken auf das <b>Ballonsymbol</b> wird der Eintrag aktiviert oder deaktiviert."
            }, {
                type: "name",
                title: "Ändern",
                content: "Zeigt die Optionen an, um den entsprechenden Eintrag zu <b>Ändern</b> oder zu <b>Löschen</b>."
            }, {
                type: "name",
                title: "Hinzufügen",
                content: "Klicken Sie hier, um eine neue VPN-Verbindung hinzuzufügen."
            }, {
                type: "name",
                title: "IPsec-Verbindungsname",
                content: "Geben Sie einen Namen für die IPsec-VPN-Verbindung ein."
            }, {
                type: "name",
                title: "Remote-IPsec-Gateway-Adresse (URL)",
                content: "Geben Sie die Ziel-IP-Adresse des Gateways ein, also die öffentliche WAN-IP-Adresse oder den Domainnamen des Remote-VPN-Server-Endpunkts."
            }, {
                type: "name",
                title: "Zugriff von lokalen IP-Adressen tunneln",
                content: "Wählen Sie „Subnetz-Adresse“, wenn Sie möchten, dass das gesamte LAN ins VPN aufgenommen wird, oder wählen Sie „Einzelne Adresse“, wenn nur eine einzelne IP-Adresse dem VPN beitreten soll."
            }, {
                type: "name",
                title: "IP-Adresse für VPN",
                content: "Geben Sie die IP-Adresse Ihres LANs ein. "
            }, {
                type: "name",
                title: "IP-Subnetzmaske",
                content: "Geben Sie die Subnetzmaske Ihres LANs ein."
            }, {
                type: "name",
                title: "Zugriff von Remote-IP-Adressen tunneln",
                content: "Wählen Sie „Subnetz-Adresse“, wenn Sie möchten, dass das gesamte Remote-LAN ins VPN aufgenommen wird, oder wählen Sie „Einzelne Adresse“, wenn nur eine einzelne IP-Adresse dem VPN beitreten soll."
            }, {
                type: "name",
                title: "IP-Adresse für VPN",
                content: "Geben Sie die IP-Adresse des Remote-LANs ein. "
            }, {
                type: "name",
                title: "IP-Subnetzmaske",
                content: "Geben Sie die Subnetzmaske des Remote-LANs ein."
            }, {
                type: "name",
                title: "Schlüsselaustauschmethode",
                content: "Wählen Sie „Auto“ (IKE) oder „Manuell“ zur Authentifizierung der IPsec-Peers."
            }, {
                type: "name",
                title: "Authentifizierungsmethode",
                content: "Wählen Sie „Pre-Shared Key“ (empfohlen)"
            }, {
                type: "name",
                title: "Pre-Shared Key",
                content: "Erstellen Sie einen Pre-Shared Key (Passphrase), der für die Authentifizierung verwendet werden soll."
            }, {
                type: "name",
                title: "Perfect Forward Secrecy",
                content: "Aktivieren (oder deaktivieren) Sie die Perfect Forward Secrecy (PFS) als zusätzliches Sicherheitsprotokoll für den Pre-Shared Key."
            }, {
                type: "name",
                title: "Erweitert",
                content: "Klicken Sie hier, um die erweiterten Einstellungen zu konfigurieren. Wir empfehlen Ihnen jedoch, hier die Standardeinstellungen zu belassen. Falls Sie dennoch diese Einstellungen ändern möchten, vergewissern Sie sich, dass beide VPN-Server-Endpunkte denselben Verschlüsselungsalgorithmus, Integritätsalgorithmus, sowie Diffie-Hellman-Gruppe und Schlüssel-Laufzeit für Phase 1 und Phase 2 verwenden.",
                children: [{
                    type: "title2",
                    content: "Phase 1"
                }, {
                    type: "name",
                    title: "Modus",
                    content: "Wählen Sie <b>Main</b>, um die Standard-Verhandlungsparameter für IKE Phase 1 zu konfigurieren. Wählen Sie <b>Aggressive</b>, um die IKE-Phase 1 des VPN-Tunnels zu kofigurieren und die Verhandlungen in einer kürzeren Zeit durchzuführen. (Diese Einstellung wird jedoch nicht empfohlen, da sie weniger sicher ist.)"
                }, {
                    type: "name",
                    title: "Lokaler ID-Typ",
                    content: "Wählen Sie den lokalen Identifizierer-Typ für die IKE-Verhandlung. Bei „Local WAN-IP“ wird eine IP-Adresse als Identifizierer bei der IKE-Verhandlung verwendet. Bei „FQDN“ (Fully Qualified Domain Name) wird ein Benutzername als Identifizierer verwendet."
                }, {
                    type: "name",
                    title: "Lokaler ID",
                    content: "Der lokale Identifizierer wird automatisch eingetragen, wenn <b>Lokale WAN-IP-Adresse</b> ausgewählt ist. Wenn <b>FQDN</b> ausgewählt ist, geben Sie einen Benutzernamen für das lokale Gerät ein, der als Identifizierer für die IKE-Verhandlung dienen soll."
                }, {
                    type: "name",
                    title: "Remote-ID-Typ",
                    content: "Wählen Sie den Remote-Identifizierer-Typ für die IKE-Verhandlung. Bei „Remote-WAN-IP-Adresse“ wird eine IP-Adresse als Identifizierer bei der IKE-Verhandlung verwendet. Bei „FQDN“ wird ein Benutzername als Identifizierer verwendet."
                }, {
                    type: "name",
                    title: "Remote-ID",
                    content: "Die Remote-Gateway-IP-Adresse wird automatisch eingetragen, wenn <b>Remote-WAN-IP-Adresse</b> ausgewählt ist. Wenn <b>FQDN</b> ausgewählt ist, geben Sie einen Benutzernamen für den Remote-Peer ein, der als Identifizierer für die IKE-Verhandlung dienen soll."
                }, {
                    type: "name",
                    title: "Verschlüsselungsalgorithmus",
                    content: "Wählen Sie einen der folgenden Verschlüsselungsalgorithmen für die IKE-Verhandlung.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "DES (Data Encryption Standard) verschlüsselt einen 64-Bit-Block-Klartext mit einem 56-Bit-Schlüssel."
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "Triple-DES verschlüsselt einen Klartext mit einem 168-bit-Schlüssel."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Verwendet den AES-Algorithmus und einen 128-Bit-Schlüssel zur Verschlüsselung."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Verwendet den AES-Algorithmus und einen 192-Bit-Schlüssel zur Verschlüsselung."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Verwendet den AES-Algorithmus und einen 256-Bit-Schlüssel zur Verschlüsselung."
                    }]
                }, {
                    type: "name",
                    title: "Integritätsalgorithmus",
                    content: "Wählen Sie einen der folgenden Integritätsalgorithmen für die IKE-Verhandlung.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "MD5 (Message Digest Algorithm) macht aus einer Nachricht beliebiger Länge eine 128-Bit-Zusammenfassung."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "SHA1 (Secure Hash Algorithm) macht aus einer Nachricht mit maximal 2^64 (2 hoch 64) Bits eine 160-Bit-Zusammenfassung."
                    }]
                }, {
                    type: "name",
                    title: "Diffie-Hellman-Gruppe für den Schlüsselaustausch",
                    content: "Wählen Sie die für die Schlüssel-Verhandlungs-Phase 1 zu verwendende Diffie-Hellman-Gruppe. Die Diffie-Hellman-Gruppe legt die Stärke des Algorithmus in Bits fest."
                }, {
                    type: "name",
                    title: "Schlüssel-Laufzeit",
                    content: "Geben Sie die Zeitspanne (in Sekunden) ein, die verstreichen muss, bevor eine neue IPsec-Security-Association (SA, dt. „Sicherheitsverbindung“) mit dem Remote-Endpunkt eingerichtet wird. Der Standardwert ist 3600."
                }, {
                    type: "title2",
                    content: "Phase 2"
                }, {
                    type: "name",
                    title: "Verschlüsselungsalgorithmus",
                    content: "Wählen Sie einen der folgenden Verschlüsselungsalgorithmen für die IKE-Verhandlung.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "DES (Data Encryption Standard) verschlüsselt einen 64-Bit-Block-Klartext mit einem 56-Bit-Schlüssel."
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "Triple-DES verschlüsselt einen Klartext mit einem 168-bit-Schlüssel."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Verwendet den AES-Algorithmus und einen 128-Bit-Schlüssel zur Verschlüsselung."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Verwendet den AES-Algorithmus und einen 192-Bit-Schlüssel zur Verschlüsselung."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Verwendet den AES-Algorithmus und einen 256-Bit-Schlüssel zur Verschlüsselung."
                    }]
                }, {
                    type: "name",
                    title: "Integritätsalgorithmus",
                    content: "Wählen Sie einen der folgenden Integritätsalgorithmen für die IKE-Verhandlung.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "MD5 (Message Digest Algorithm) macht aus einer Nachricht beliebiger Länge eine 128-Bit-Zusammenfassung."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "SHA1 (Secure Hash Algorithm) macht aus einer Nachricht mit maximal 2^64 (2 hoch 64) Bits eine 160-Bit-Zusammenfassung."
                    }]
                }, {
                    type: "name",
                    title: "Diffie-Hellman-Gruppe für den Schlüsselaustausch",
                    content: "Wählen Sie die für die Schlüssel-Verhandlungs-Phase 2 zu verwendende Diffie-Hellman-Gruppe. Die Diffie-Hellman-Gruppe legt die Stärke des Algorithmus in Bits fest."
                }, {
                    type: "name",
                    title: "Schlüssel-Laufzeit",
                    content: "Geben Sie die Zeitspanne (in Sekunden) ein, die verstreichen muss, bevor eine neue IPsec-Security-Association (SA, dt. „Sicherheitsverbindung“) mit dem Remote-Endpunkt eingerichtet wird. Der Standardwert ist 3600."
                }]
            }]
        },
        wanBasic: {
            TITLE: "Einrichten der Internetverbindung",
            CONTENT: [{
                type: "name",
                title: "Autom. Erkennung",
                content: "Klicken Sie auf diese Schaltfläche, damit der Router automatisch die Art Ihrer aktuellen Internetverbindung erkennt."
            }, {
                type: "paragraph",
                title: "Anmerkung",
                content: "Wenn Sie nicht sicher sind, welcher Art Ihre Internetverbindung ist, verwenden Sie die automatische Erkennungsfunktion oder wenden Sie sich an Ihren Internetanbieter."
            }, {
                type: "title",
                title: "Art der Internetverbindung: Statische IP-Adresse"
            }, {
                type: "name",
                title: "IP-Adresse/Subnetzmaske/Standard-Gateway/Primärer DNS-Server/Sekundärer DNS-Server",
                content: "Geben Sie die Informationen ein, die Sie von Ihrem Internetanbieter erhalten haben."
            }, {
                type: "title",
                title: "Art der Internetverbindung: Dynamische IP-Adresse"
            }, {
                type: "name",
                title: "MAC-Adresse NICHT klonen/Aktuelle Computer-MAC-Adresse klonen",
                content: "Wählen Sie, ob Sie Ihre MAC-Adresse klonen möchten oder nicht, je nach Ihrem Internetanbieter."
            }, {
                type: "title",
                title: "Art der Internetverbindung: PPPoE"
            }, {
                type: "name",
                title: "Benutzername/Passwort",
                content: "Geben Sie Benutzername und Passwort ein, die Sie von Ihrem Internetanbieter erhalten haben. Diese Felder unterscheiden zwischen Groß- und Kleinschreibung."
            }, {
                type: "title",
                title: "Art der Internetverbindung: L2TP/PPTP"
            }, {
                type: "name",
                title: "Benutzername/Passwort",
                content: "Geben Sie Benutzername und Passwort ein, die Sie von Ihrem Internetanbieter erhalten haben. Diese Felder unterscheiden zwischen Groß- und Kleinschreibung."
            }, {
                type: "name",
                title: "Sekundäre Verbindung (dynamische oder statische IP-Adresse)",
                children: [{
                    type: "name",
                    title: "Dynamische IP-Adresse",
                    content: "Wählen Sie diese Option, wenn IP-Adresse und Subnetzmaske von Ihrem Internetanbieter automatisch zugewiesen werden."
                }, {
                    type: "name",
                    title: "Statische IP-Adresse",
                    content: " Wählen Sie diese Option, wenn Sie IP-Adresse, Subnetzmaske, Gateway und DNS-Adressen von Ihrem Internetanbieter erhalten haben, und geben Sie diese Informationen in die entsprechenden Felder ein."
                }]
            }, {
                type: "name",
                title: "VPN-Server-IP-Adresse/Domainname",
                content: "Geben Sie die IP-Adresse oder den Domainnamen des VPN-Servers ein, die Sie von Ihrem Internetdiensteanbieter erhalten haben."
            }]
        },
        PRINT_SERVER: {
            TITLE: "Druckserver",
            CONTENT: [{
                type: "paragraph",
                content: "Auf dieser Seite können Sie einen Druckserver konfigurieren."
            }, {
                type: "name",
                title: "Druckserver",
                content: "Zeigt den aktuellen Status Aktiviert/Deaktiviert des Druckservers an."
            }, {
                type: "name",
                title: "Druckername",
                content: "Name des mit dem Router verbundenen Druckers."
            }, {
                type: "note",
                title: "Führen Sie die folgenden Anweisungen aus, um Ihren Druckserver einzurichten:",
                content: [
                    "Schritt 1: Verbinden Sie den USB-Drucker über ein USB-Kabel mit dem USB-Port des Routers.",
                    "Schritt 2:  Installieren Sie den Druckertreiber auf Ihrem Computer.",
                    "Schritt 3:  Installieren Sie den TP-LINK USB-Drucker-Controller auf Ihrem Computer. Starten Sie bitte die Ressourcen-CD oder downloaden Sie das TP-LINK-Drucker-Controller-Utility von unserer Website: www.tp-link.com."
                ]
            }]
        },
        sysconf: {
            TITLE: "Erweiterte WLAN-Einstellungen 2,4 GHz | 5 GHz-1 | 5 GHz-2",
            CONTENT: [{
                type: "name",
                title: "Ortungsintervall",
                content: "Geben Sie einen Wert zwischen 25 und 1000 in Millisekunden ein, um das Zeitintervall festzulegen, in dem der Router Ortungspakete aussendet, um das WLAN zu synchronisieren. Der Standardwert ist 100 Millisekunden."
            }, {
                type: "name",
                title: "RTS-Grenzwert",
                content: "Geben Sie einen Wert zwischen 1 und 2346 ein (in Bytes), um die Paketgröße der Datenübertragung durch den Router festzulegen. Standardmäßig beträgt die Größe des RTS-Grenzwerts (Request to Send; Sendeanforderung) 2346. Wenn die Paketgröße über den voreingestellten Grenzwert hinausgeht, sendet der Router Sendeanforderungs-Blöcke an eine bestimmte Empfangsstation und verhandelt das Senden eines Datenblocks, andernfalls wird das Paket sofort gesendet."
            }, {
                type: "name",
                title: "DTIM-Intervall",
                content: "Geben Sie einen Wert zwischen 1 und 255 ein, um das Intervall der Delivery Traffic Indication Message (DTIM) festzulegen. 1 bedeutet, dass das DTIM-Intervall dasselbe ist, wie das Ortungsintervall."
            }, {
                type: "name",
                title: "Gruppenschlüssel-Aktualisierungsintervall",
                content: "Geben Sie die Anzahl der Sekunden (mindestens 30) als Zeitintervall ein, nach dem der Schlüssel automatisch aktualisiert werden soll. Der Standardwert ist 0, das heißt, keine Schlüsselaktualisierung."
            }, {
                type: "name",
                title: "WMM-Funktion",
                content: "Die WMM-Funktion (Wi-Fi-Multimedia) gewährleistet, dass Pakete mit Nachrichten hoher Priorität bevorzugt übertragen werden. Ihre Verwendung wird dringend empfohlen, und sie ist standardmäßig aktiviert."
            }, {
                type: "name",
                title: "Short-GI-Funktion",
                content: "Diese Funktion („Short-GI“) erhöht die Datenkapazität durch Verringerung des Schutzintervalls (Guard Interval, GI). Ihre Verwendung wird empfohlen, und sie ist standardmäßig aktiviert."
            }, {
                type: "name",
                title: "AP-Isolationsfunktion",
                content: "Markieren Sie dieses Kontrollkästchen, um die AP-Isolationsfunktion zu aktivieren, die Ihnen gestattet, allen WLAN-Geräten in Ihrem Netzwerk zu verbieten, miteinander zu kommunizieren, ohne dabei deren Internetzugang einzuschränken. Standardmäßig ist die AP-Isolation aktiviert."
            }, {
                type: "title",
                title: "WPS"
            }, {
                type: "name",
                title: "WPS aktivieren",
                content: "Schalten Sie dies ein, um die WPS-Funktion zu aktivieren."
            }, {
                type: "paragraph",
                content: "Klicken Sie auf Speichern, um Ihre Einstellungen zu speichern."
            }, {
                type: "title",
                title: "LED"
            }, {
                type: "name",
                title: "Nachtmodus",
                content: "Wenn diese Funktion aktiviert ist, werden die Router-LEDs während des angegebenen Zeitraums automatisch ausgeschaltet."
            }, {
                type: "name",
                title: "Zeitraum",
                content: "Geben Sie den Zeitraum ein, in dem die Router-LEDs ausgeschaltet sein sollen."
            }, {
                type: "paragraph",
                content: "Klicken Sie auf Speichern, um Ihre Einstellungen zu speichern."
            }, {
                type: "title",
                title: "DoS-Schutzeinstellungen"
            }, {
                type: "paragraph",
                content: "Der DoS-Schutzlevel schützt den Router vor TCP-SYN-Flood-, UDP-Flood- und ICMP-Flood-Angriffen."
            }, {
                type: "name",
                title: "ICMP-FLOOD-Paketelevel",
                content: "Geben Sie einen Wert zwischen 5 und 3600 ein, um den ICMP-FLOOD-Schutz unverzüglich auszulösen, wenn die Anzahl der ICMP-Pakete den voreingestellten Schwellenwert überschreitet."
            }, {
                type: "name",
                title: "UDP-FLOOD-Paketelevel",
                content: "Geben Sie einen Wert zwischen 5 und 3600 ein, um den UDP-FLOOD-Schutz unverzüglich auszulösen, wenn die Anzahl der UDP-Pakete den voreingestellten Schwellenwert überschreitet."
            }, {
                type: "name",
                title: "TCP-FLOOD-Paketelevel",
                content: "Geben Sie einen Wert zwischen 5 und 3600 ein, um den TCP-SYN-FLOOD-Schutz unverzüglich auszulösen, wenn die Anzahl der TCP-SYN-Pakete den voreingestellten Schwellenwert überschreitet."
            }, {
                type: "paragraph",
                content: "Klicken Sie auf Speichern, um Ihre Einstellungen zu speichern."
            }]
        },
        logConf: {
            TITLE: "Protokolleinstellungen",
            CONTENT: [{
                    type: "name",
                    title: "Lokal speichern",
                    content: "Wählen Sie dies, um die Protokolle in Ihrem lokalen Speicher zu speichern.",
                    children: [{
                        type: "name",
                        title: "Mindeststufe",
                        content: "Wählen Sie die Mindeststufe aus der Dropdown-Liste aus, dann werden alle protokollierten Ereignisse über oder gleich dem gewählten Level gespeichert."
                    }]
                }, {
                    type: "name",
                    title: "Remote speichern",
                    content: "Wählen Sie dies, um die Protokolle an die angegebene IP-Adresse und den UDP-Port des Protokollservers des Remotesystems zu senden.",
                    children: [{
                        type: "name",
                        title: "Mindeststufe",
                        content: "Wählen Sie die Mindeststufe aus der Dropdown-Liste aus, dann werden alle protokollierten Ereignisse über oder gleich dem gewählten Level gespeichert."
                    }, {
                        type: "name",
                        title: "Server-IP-Adresse",
                        content: "Geben Sie die IP-Adresse des Systemprotokoll-Remoteservers ein, an den die Ereignisse gesandt werden sollen."
                    }, {
                        type: "name",
                        title: "Serverport",
                        content: "Geben Sie die Portnummer des Systemprotokoll-Remoteservers ein, an den die Ereignisse gesandt werden sollen."
                    }, {
                        type: "name",
                        title: "Lokaler Einrichtungsname",
                        content: "Wählen Sie den Namen der lokalen Einrichtung, je nach dem Namen Ihrer Remoteserver-Einrichtung."
                    }]
                }

            ]
        },
        GUSET_NETWORK_WIRELESS: {
            TITLE: "WLAN",
            CONTENT: [{
                type: "name",
                title: "Sicherheit",
                content: "Sie können eine der folgenden Sicherheitsoptionen wählen. ",
                children: [{
                    type: "name",
                    title: "Keine Sicherheit",
                    content: "Die drahtlosen Stationen verbinden sich ohne jede Verschlüsselung mit dem Router. Es wird dringend empfohlen, einen der folgenden Sicherheitsmodi zu aktivieren."
                }, {
                    type: "name",
                    title: "WPA/WPA2 – Persönlich",
                    content: "Wählen Sie WPA basierend auf einer Pre-Shared-Passphrase.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Sie können eine der folgenden Versionen wählen",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Wählen Sie WPA-PSK oder WPA2-PSK automatisch, je nach Möglichkeiten und Anforderung der drahtlosen Station."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Pre-Shared Key von WPA2."
                        }]
                    }, {
                        type: "name",
                        title: "Verschlüsselung",
                        content: "Sie können unter Auto, TKIP oder AES wählen."
                    }, {
                        type: "name",
                        title: "WLAN-Passwort",
                        content: "Sie können ASCII- oder hexadezimale Zeichen eingeben. Bei hexadezimalen Zeichen sollte die Länge 8 bis 64 Zeichen betragen, bei ASCII 8 bis 63 Zeichen."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2 Enterprise",
                    content: "Wählen Sie WPA basierend auf dem RADIUS-Server.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Sie können eine der folgenden Versionen wählen",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Wählen Sie WPA oder WPA2 automatisch, je nach Möglichkeiten und Anforderung der drahtlosen Station."
                        }, {
                            type: "name",
                            title: "WPA",
                            content: "Wi-Fi Protected Access. "
                        }, {
                            type: "name",
                            title: "WPA2",
                            content: "WPA Version 2. "
                        }]
                    }, {
                        type: "name",
                        title: "Verschlüsselung",
                        content: "Sie können unter Auto, TKIP oder AES wählen."
                    }, {
                        type: "name",
                        title: "RADIUS-Server-IP-Adresse",
                        content: "Geben Sie die IP-Adresse des RADIUS-Servers ein."
                    }, {
                        type: "name",
                        title: "RADIUS-Port",
                        content: "Geben Sie den Port ein, den der RADIUS-Dienst verwendet."
                    }, {
                        type: "name",
                        title: "RADIUS-Passwort",
                        content: "Geben Sie das Passwort für den RADIUS-Server ein."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Wählen Sie die 802.11 WEP-Sicherheit.",
                    children: [{
                        type: "name",
                        title: "Art",
                        content: "Sie können eine der folgenden Arten wählen.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Wählen Sie die Authentifizierungsart „Shared Key“ oder „Open System“, je nach Möglichkeiten und Anforderung der drahtlosen Station."
                        }, {
                            type: "name",
                            title: "Shared Key",
                            content: "Wählen Sie die 802.11-Shared-Key-Authentifizierung."
                        }, {
                            type: "name",
                            title: "Open System",
                            content: "Wählen Sie die 802.11-Open-System-Authentifizierung. "
                        }]
                    }, {
                        type: "name",
                        title: "Gewählter Schlüssel",
                        content: "Wählen Sie, welcher der vier Schlüssel verwendet wird."
                    }, {
                        type: "name",
                        title: "WEP-Schlüsselformat",
                        content: "Sie können das ASCII- oder hexadezimale Format wählen. ASCII-Format bedeutet, jede beliebige Kombination von Zeichen der Tastatur in der angegebenen Länge. Hexadezimal-Format bedeutet, jede beliebige Kombination von hexadezimalen Zeichen (0–9, a–f, A–F) in der angegebenen Länge."
                    }, {
                        type: "name",
                        title: "Schlüsselart",
                        content: "Sie können die WEP-Schlüssellänge (64-Bit, 128-Bit oder 152-Bit) für die Verschlüsselung wählen. „Deaktiviert“ bedeutet, dass diese WEP-Schlüssel-Eingabe ungültig ist.",
                        children: [{
                            type: "name",
                            title: "Für 64-Bit-Verschlüsselung",
                            content: "Sie können entweder 10 hexadezimale Ziffern (jede beliebige Kombination von 0–9, a–f, A–F; 0 ist nicht erlaubt) bzw. 5 ASCII-Zeichen eingeben."
                        }, {
                            type: "name",
                            title: "Für 128-Bit-Verschlüsselung",
                            content: "Sie können entweder 26 hexadezimale Ziffern (jede beliebige Kombination von 0–9, a–f, A–F; 0 ist nicht erlaubt) bzw. 13 ASCII-Zeichen eingeben."
                        }, {
                            type: "name",
                            title: "Für 152-Bit-Verschlüsselung",
                            content: "Sie können entweder 32 hexadezimale Ziffern (jede beliebige Kombination von 0–9, a–f, A–F; 0 ist nicht erlaubt) bzw. 16 ASCII-Zeichen eingeben. "
                        }]
                    }, {
                        type: "name",
                        title: "Schlüsselwert",
                        content: "Geben Sie das Passwort für WEP ein."
                    }]
                }]
            }, {
                type: "name",
                title: "Modus",
                content: "In diesem Feld wird der drahtlose Modus festgelegt, in dem der Router arbeitet."
            }, {
                type: "name",
                title: "Kanalbreite",
                content: "Die Bandbreite des WLAN-Kanals."
            }, {
                type: "name",
                title: "Kanal",
                content: "Dieses Feld legt fest, welche Betriebsfrequenz verwendet wird. Sie sollten nur dann den WLAN-Kanal ändern, wenn Sie Interferenzen mit anderen in der Nähe befindlichen Zugangspunkten bemerken. Wenn Sie „Auto“ wählen, stellt der Zugriffspunkt automatisch den besten Kanal ein."
            }, {
                type: "name",
                title: "Übertragungsleistung",
                content: "Hier können Sie die Datenübertragungs-Leistung des Routers festlegen. Sie können „Hoch“, „Mittel“ oder „Niedrig“ wählen. Die empfohlene Standardeinstellung ist „Hoch“. "
            }, {
                type: "paragraph",
                content: "Klicken Sie auf <strong>Speichern</strong>, um die Konfiguration anzuwenden und zu speichern."
            }]
        },
        diagnostic: {
            TITLE: "Diagnosetools",
            CONTENT: [{
                type: "paragraph",
                content: "Der Router ist mit Ping- und Traceroute-Tools ausgestattet, um im Falle von Netzwerk-Verbindungsproblemen bei der Fehlerbehebung zu helfen. Das Ping-Tool sendet Pakete an eine Ziel-IP-Adresse oder einen Domainnamen, und protokolliert das Ergebnis, wie z. B. die Anzahl der gesendeten/empfangenen Pakete sowie die Umlaufzeit. Das Traceroute-Tool sendet Pakete an eine Ziel-IP-Adresse oder einen Domainnamen, und zeigt die Anzahl der Hops an, sowie die Zeit bis zum Erreichen des Ziels."
            }, {
                type: "paragraph",
                content: "Sie können ein Netzwerkgerät durch die IP-Adresse oder einen Domainnamen, wie z. B. google.com, yahoo.com, etc., Ping und Traceroute ausführen."
            }, {
                type: "note",
                title: "Diagnose mittels Ping",
                content: [
                    "Geben Sie die Ziel-IP-Adresse oder den Domainnamen ein.",
                    "Klicken Sie auf das Pfeilsymbol, um das erweiterte Menü zu öffnen, und geben Sie Ping Count (Zähler) und Ping Packet Size (Paketgröße) an. (Optional)",
                    "Klicken Sie auf Start."
                ]
            }, {
                type: "note",
                title: "Diagnose mittels Traceroute",
                content: [
                    "Geben Sie die Ziel-IP-Adresse oder den Domainnamen ein.",
                    "Klicken Sie auf das Pfeilsymbol, um das erweiterte Menü zu öffnen, und geben Sie die Anzahl der (zu erreichenden) Hops in das Feld „Traceroute Max TTL“ (Time To Live) ein. Der Standardwert ist 20. (Optional) ",
                    "Klicken Sie auf Start."
                ]
            }]
        },
        lan: {
            TITLE: "LAN",
            CONTENT: [{
                type: "name",
                title: "MAC-Adresse",
                content: "Die eindeutige physische Adresse des Routers."
            }, {
                type: "name",
                title: "LAN-IP-Adresse",
                content: "Belassen Sie die Standard-IP-Adresse des Routers (192.168.0.1) oder geben Sie eine neue ein. Diese IP-Adresse kann verwendet werden, um sich in die Weboberfläche des Routers einzuloggen."
            }, {
                type: "name",
                title: "Subnetzmaske",
                content: "Wählen Sie einen zugewiesenen Identifizierer, der vom LAN-Port verwendet wird, um internen und externen Datenverkehr zu routen, aus der Dropdown-Liste, oder geben ein neues Subnetzmaskenformat ein. Der Standardwert ist 255.255.255.0."
            }, {
                type: "name",
                title: "IGMP-Snooping",
                content: "IGMP (Internet Group Management Protocol) wird verwendet, um Multicasting auf TCP/IP-Netzwerken zu verwalten. Einige Internetanbieter setzen IGMP ein, um an Clientgeräten, wie z. B. dem Router, eine Fernkonfiguration durchzuführen. Standardmäßig ist dies aktiviert."
            }, {
                type: "paragraph",
                title: "Anmerkung",
                content: "Wenn die neue LAN-IP-Adresse nicht im selben Subnetz liegt wie die alte, wird der IP-Adresspool des DHCP-Servers automatisch geändert. Allerdings werden der virtuelle Server und DMZ-Host erst wirksam, nachdem sie neu konfiguriert wurden."
            }]
        },
        ddos: {
            TITLE: "Firewall",
            CONTENT: [{
                type: "name",
                title: "SPI-Firewall",
                content: "Eine SPI-Firewall (Stateful Packet Inspection) verhindert Cyberangriffe und überprüft den Datenverkehr durch den Router. Die SPI-Firewall ist standardmäßig aktiviert. "
            }, {
                type: "title",
                title: "DoS-Schutz"
            }, {
                type: "name",
                title: "DoS-Schutz",
                content: "Der DoS-Schutz (Denial of Service, Betriebsverweigerung) schützt Ihr LAN vor DoS-Attacken, bei denen Ihr Netzwerk mit Server-Anforderungen überflutet wird. Standardmäßig ist der DoS-Schutz deaktiviert."
            }, {
                type: "name",
                title: "ICMP-FLOOD-Angriffsfilterung",
                content: "Aktivieren Sie dies, um ICMP (Internet Control Message Protocol) Flood-Angriffe zu verhindern."
            }, {
                type: "name",
                title: "UDP-FLOOD-Angriffsfilterung",
                content: "Aktivieren Sie dies, um UDP (User Datagram Protocol) Flood-Angriffe zu verhindern."
            }, {
                type: "name",
                title: "TCP-FLOOD-Angriffsfilterung",
                content: "Aktivieren Sie dies, um Transmission Control Protocol-Synchronize (TCP-SYN-) Flood-Angriffe zu verhindern.",
                children: [{
                    type: "name",
                    title: "Aus",
                    content: "Kein Schutz."
                }, {
                    type: "name",
                    title: "Niedrig",
                    content: "Geringer Schutzgrad und geringe Auswirkungen auf die Routerleistung."
                }, {
                    type: "name",
                    title: "Mittel",
                    content: "Mittlerer Schutzgrad und leicht merkbare Auswirkungen auf die Routerleistung."
                }, {
                    type: "name",
                    title: "Hoch",
                    content: "Hoher Schutzgrad, jedoch merkbare Auswirkungen auf die Routerleistung."
                }]
            }, {
                type: "name",
                title: "LAN-Ping ignorieren",
                content: "Aktivieren Sie dies, um Pings von LAN-Ports nicht zu beantworten."
            }, {
                type: "name",
                title: "WAN-Ping ignorieren",
                content: "Aktivieren Sie dies, um Pings von WAN-Seite nicht zu beantworten."
            }, {
                type: "title",
                title: "Liste blockierter DoS-Hosts"
            }, {
                type: "name",
                title: "Liste blockierter DoS-Hosts",
                content: "Listet IP-Adresse und MAC-Adresse einer blockierten DoS-Angriffsquelle auf."
            }, {
                type: "name",
                title: "Einen oder mehrere Einträge löschen",
                content: "Wählen Sie in der Hostliste den oder die Einträge, die Sie löschen möchten, und klicken Sie oberhalb der Tabelle auf „Löschen“."
            }]
        },
        ipv6: {
            TITLE: "IPv6-Internet",
            CONTENT: [{
                type: "name",
                title: "IPv6 aktivieren",
                content: "Wählen Sie dies, um die IPv6-Funktion des Routers zu aktivieren (EIN) oder deaktivieren (AUS)."
            }, {
                type: "title",
                title: "Art der Internetverbindung: Statische IP-Adresse"
            }, {
                type: "name",
                title: "Statische IP-Adresse",
                content: "Wählen Sie diese Art, wenn Ihr Internetanbieter statische IPv6-Adressen zuweist."
            }, {
                type: "name",
                title: "IPv6-Adresse/IPv6-Standard-Gateway/IPv6-DNS-Server/Sekundärer IPv6-DNS-Server",
                content: "Geben Sie diese Parameter ein, die Sie von Ihrem Internetanbieter erhalten haben."
            }, {
                type: "name",
                title: "MTU (Bytes)",
                content: "Die Standard- und typische MTU-Größe (Maximum Transmission Unit) der meisten Ethernet-Netzwerke beträgt 1500 Bytes. Die MTU-Größe sollte nur dann geändert werden, wenn es vom Internetanbieter verlangt wird."
            }, {
                type: "title",
                title: "Art der Internetverbindung: Dynamische IP-Adresse"
            }, {
                type: "name",
                title: "Dynamische IP-Adresse",
                content: "Wählen Sie diese Art, wenn Ihr Internetanbieter dynamische IPv6-Adressen zuweist."
            }, {
                type: "name",
                title: "IPv6-Adresse/IPv6-Gateway",
                content: "Diese Parameter werden vom DHCPv6-Server Ihres Internetanbieters automatisch zugewiesen."
            }, {
                type: "name",
                title: "Addressierungstyp",
                content: "Wählen Sie die Art der IPv6-Verbindung aus."
            }, {
                type: "name",
                title: "MTU (Bytes)",
                content: "Die Standard- und typische MTU-Größe (Maximum Transmission Unit) der meisten Ethernet-Netzwerke beträgt 1500 Bytes. Die MTU-Größe sollte nur dann geändert werden, wenn es vom Internetanbieter verlangt wird."
            }, {
                type: "name",
                title: "Folgende IPv6-DNS-Adresse verwenden",
                content: "Wählen Sie dieses Kontrollkästchen und geben Sie die von Ihrem Internetanbieter erhaltene(n) DNS-Server-Adresse(n) in Dezimalpunktschreibweise ein. Diese WAN-Schnittstelle verwendet vorrangig den angegebenen DNS-Server."
            }, {
                type: "name",
                title: "Hostname",
                content: "Geben Sie einen Wert in dieses Feld ein, um den Host-Namen des Routers anzugeben."
            }, {
                type: "title",
                title: "Art der Internetverbindung: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Wählen Sie diesen Typ, wenn Ihr Internetanbieter PPPoEv6 verwendet, und Sie von Ihm einen Benutzernamen und ein Passwort erhalten haben."
            }, {
                type: "name",
                title: "Benutzername/Passwort/Passwort bestätigen",
                content: "Geben Sie diese Parameter ein, die Sie von Ihrem Internetanbieter erhalten haben."
            }, {
                type: "name",
                title: "Addressierungstyp",
                content: "Wählen Sie die Art der IPv6-Verbindung aus."
            }, {
                type: "name",
                title: "Dienstname",
                content: "Geben Sie den Namen des Dienstes ein, den Sie von Ihrem Internetanbieter erhalten haben. Andernfalls lassen Sie dieses Feld leer."
            }, {
                type: "name",
                title: "Servername",
                content: "Geben Sie den Namen des Servers ein, den Sie von Ihrem Internetanbieter erhalten haben. Andernfalls lassen Sie dieses Feld leer."
            }, {
                type: "name",
                title: "MTU (Bytes)",
                content: "Die typische MTU-Größe (Maximum Transmission Unit) von Ethernet-Netzwerken ist 1480 Bytes.",
                children: [{
                    type: "paragraph",
                    content: "<b>Hinweis</b>: In manchen Fällen kann Ihnen Ihr Internetanbieter empfehlen, für bessere Netzwerkleistung die MTU-Größe anzupassen. Sie sollten diesen Wert nur ändern, wenn es unbedingt notwendig ist."
                }]
            }, {
                type: "name",
                title: "IPv6-Angaben vom Internetanbieter verwenden",
                content: "Markieren Sie dieses Kontrollkästchen, und geben Sie die von Ihrem Internetanbieter zugeteilte IP-Adresse und das Gateway ein."
            }, {
                type: "name",
                title: "Folgende IPv6-DNS-Adresse verwenden",
                content: "Wählen Sie diese Option, wenn Sie die von Ihrem Internetanbieter erhaltene DNS-Adresse manuell eingeben möchten. Wenn dies nicht ausgewählt ist, erhält der Router die DNS-Adresse dynamisch von Ihrem Internetanbieter."
            }, {
                type: "title",
                title: "Art der Internetverbindung: 6to4-Tunnel"
            }, {
                type: "name",
                title: "6to4-Tunnel",
                content: "Wählen Sie diese Art, wenn Ihr Internetanbieter 6to4-Bereitstellung für die Zuweisung von Adressen verwendet."
            }, {
                type: "title",
                title: "IPv6-LAN"
            }, {
                type: "name",
                title: "Addressierungstyp",
                content: "Wählen Sie den am besten geeigneten gemäß Ihres Internetanbieters aus.",
                children: [{
                    type: "name",
                    title: "RADVD",
                    content: "Wählen Sie diese Option, um den Computern in Ihrem LAN IPv6-Adressen über RADVD zuzuweisen.",
                    children: [{
                        type: "name",
                        title: "RDNSS aktivieren",
                        content: "Markieren Sie das Kontrollkästchen, um die RDNSS-Funktion zu aktivieren."
                    }, {
                        type: "name",
                        title: "ULA-Präfix aktivieren",
                        content: "Markieren Sie das Kontrollkästchen, um die ULA-Präfix-Funktion zu aktivieren.",
                        children: [{
                            type: "name",
                            title: "ULA-Präfix",
                            content: "Geben Sie das ULA-Präfix ein."
                        }, {
                            type: "name",
                            title: "ULA-Präfixlänge",
                            content: "Geben Sie die ULA-Präfixlänge ein. Der Standardwert ist 64."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "DHCPv6-Server",
                    content: "Für die automatische Zuweisung von IP-Adressen an die Clients im LAN.",
                    children: [{
                        type: "name",
                        title: "Start-IPv6-Adresse",
                        content: "Geben Sie die Start-IPv6-Adresse ein."
                    }, {
                        type: "name",
                        title: "End-IPv6-Adresse",
                        content: "Geben Sie die End-IPv6-Adresse ein."
                    }, {
                        type: "name",
                        title: "Haltezeit",
                        content: "Geben Sie die Zeitspanne ein, während der ein DHCP-Client seine aktuelle, vom Router zugewiesene dynamische IPv6-Adresse behalten kann. Nachdem die dynamische IPv6-Adresse abgelaufen ist, wird dem Benutzer automatisch eine neue dynamische IPv6-Adresse zugewiesen. Der Standardwert ist 86400 Sekunden."
                    }]
                }]
            }, {
                type: "name",
                title: "Site-Präfixtyp",
                content: "Wählen Sie einen den IPv6-Adressen zuzuweisenden Präfixtyp. Zur Verfügung stehen „Übertragen“ und „Statisch“."
            }, {
                type: "name",
                title: "Übertragen",
                children: [{
                    type: "name",
                    title: "Präfix-übertragene WAN-Verbindung",
                    content: "Wählen Sie eine WAN-Verbindung aus der Dropdown-Liste aus, der der Präfix zugewiesen werden soll."
                }]
            }, {
                type: "name",
                title: "Statisch",
                children: [{
                    type: "name",
                    title: "Site-Präfix",
                    content: "Geben Sie einen Wert für den Site-Präfix ein."
                }, {
                    type: "name",
                    title: "Site-Präfixlänge",
                    content: "Geben Sie einen Wert für die Site-Präfixlänge ein."
                }]
            }]
        },
		openvpnServer: {
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "name",
				title: "VPN-Server aktivieren",
				content: "Aktivieren des OpenVPN-Servers."
			},{
				type: "name",
				title: "Diensttyp",
				content: "OpenVPN-Kommunikationsprotokoll auswählen: UDP oder TCP."
			},{
				type: "name",
				title: "Dienstport",
				content: "Geben Sie eine Portnummer aus dem Bereich von 1024 bis 65535 ein. Standardwert: 1194."
			},{
				type: "name",
				title: "VPN-Subnetz/Netzmaske",
				content: "Geben Sie einen Bereich von IP-Adressen ein, die der OpenVPN-Server vergeben darf."
			},{
				type: "name",
				title: "Clientzugriff",
				content: "Zugriffstyp Ihres OpenVPN-Clients."
			},{
				type: "name",
				title: "Nur Heimnetz",
				content: "VPN-Clients können nur auf den Router und das lokale Netz zugreifen. Die Standardroute Ihres Clients bleibt unverändert."
			},{
				type: "name",
				title: "Internet und Heimnetz",
				content: "VPN-Clients können auf den Router, das lokale Netz und das Internet zugreifen. Die Standardroute Ihres Clients wird verändert."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu übernehmen."
            },{
                type: "title",
                content: "Zertifikat"
            },{
                type: "paragraph",
                content: "Benutzen Sie das Zertifikat, um den Remotecomputer zu authentifizieren."
            },{
                type: "name",
                title: "Erzeugen",
                content: "Klicken Sie, um ein neues Zertifikat zu erzeugen."
            },{
                type: "title",
                content: "Konfigurationsdatei"
            },{
                type: "name",
                title: "Exportieren",
                content: "Speichern Ihrer OpenVPN-Konfigurationsdatei zur Konfiguration des Clients."
			},{
                type: "title",
                content: "Installation eines VPN-Clients"
			},{
				type: "step",
				title: "So verbinden Sie Ihre Clientgeräte mit einem OpenVPN-Server:",
			},{
				type: "paragraph",
				content: "Bevor Sie einen OpenVPN-Server konfigurieren, konfigurieren Sie bitte einen Dynamischen DNS (empfohlen) oder verwenden Sie eine statische WAN-IP-Adresse (falls möglich). Bitte stellen Sie sicher, dass der externe Port Ihrer NAT-Einstellungen nicht identisch mit dem VPN-Port ist und dass die Systemzeit Ihres Routers korrekt ist."
			},{
				type: "step",
				title:"",
				content:[
					"Aktivieren Sie den VPN-Server.",
					"Konfigurieren Sie die OpenVPN-Parameter (Diensttyp, Dienstport und Clientzugriff) und klicken Sie Speichern.",
					"Klicken Sie Exportieren, um Ihre Konfiguration in einer Datei zu speichern.",
					"Installieren Sie auf Ihren Clientgeräten das OpenVPN-Client-Utility, das Sie herunterladen können von <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> Unterstützte Plattformen: Windows, MacOS X, Linux.",
					"Starten Sie das OpenVPN-Client-Utility und erstellen Sie eine neue VPN-Verbindung unter Verwendung der zuvor gespeicherten Konfigurationsdatei, um Ihr Gerät mit dem VPN-Server zu verbinden."
				]
			},{	
				type: "paragraph",
				title: "Note:",
				content: "Weitere Informationen über OpenVPN-Clients finden Sie hier: <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
            }]
		},

		pptpvpnServer: {
			TITLE: "PPTP-VPN",
			CONTENT: [{
				type: "name",
				title: "VPN-Server aktivieren",
				content: "Aktivieren des PPTP-VPN-Servers."
			},{
				type: "name",
				title: "Client-IP-Adresse",
				content: "Definieren Sie einen IP-Adresspool aus bis zu 10 Adressen, die den Clients vom PPTP-VPN-Server zugewiesen werden können."
			},{
				type: "name",
				title: "Benutzername und Passwort",
				content: "Definieren Sie Benutzernamen und Passwort für die VPN-Teilnehmer."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu übernehmen."
			},{
                type: "title",
                content: "Installation eines VPN-Clients"
			},{
				type: "step",
				title: "So verbinden Sie Ihre Clientgeräte mit einem PPTP-VPN-Server:",
			},{
				type: "paragraph",
				content: "Bevor Sie einen OpenVPN-Server konfigurieren, konfigurieren Sie bitte einen Dynamischen DNS (empfohlen) oder verwenden Sie eine statische WAN-IP-Adresse (falls möglich). Bitte stellen Sie sicher, dass der externe Port Ihrer NAT-Einstellungen nicht identisch mit dem VPN-Port 1723 ist und dass die Systemzeit Ihres Routers korrekt ist."
			},{
				type: "step",
				title:"",
				content:[
					"Aktivieren Sie den VPN-Server.",
					"Konfigurieren Sie die PPTP-VPN-Parameter und klicken Sie Speichern.",
					"Erstellen Sie auf Ihren Clientgeräten eine PPTP-VPN-Verbindung. Unterstützte Plattformen: Windows, MacOS X, Linux, iOS und Android.",
					"Starten Sie das PPTP-VPN-Programm und erstellen Sie eine neue VPN-Verbindung zum Domänennamen oder der statischen WAN-IP-Adresse, um Ihr Gerät mit dem PPTP-VPN-Server zu verbinden.",
				]
			}]
		},

		vpnServerStatus: {
			TITLE: "VPN-Verbindungen",
			CONTENT: [{
				type: "paragraph",
				content: "Diese Seite zeigt eine Übersicht über die gegenwärtig verbundenen OpenVPN- und PPTP-Clients."
			},{
				type: "paragraph",
				content: "Klicken Sie auf das Minus-Zeichen, um einen Client zu trennen."
			}]
		},
    };
})(jQuery);
