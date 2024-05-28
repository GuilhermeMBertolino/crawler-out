(function($){
	$.su = $.su || {};
	$.su.CHAR = $.su.CHAR || {};
	$.su.CHAR.HELP = {
		STATUS_INTERNET: {
			TITLE: "Internet",
			CONTENT: [{
				type: "paragraph",
				content: "Zeigt Informationen zu Ihrer WAN(Internet)-Verbindung an."
			},{
				type: "title",
				title: "IPv4",
			},{
				type: "name",
				title: "MAC-Adresse",
				content: "Die Hardwareadresse des Internet(WAN)-Ports Ihres Routers."
			},{
				type: "name",
				title: "IP-Adresse",
				content: "Die öffentliche IP-Adresse Ihres Routers. Lautet diese 0.0.0.0, hat Ihr Router keine Internetverbindung."
			},{
				type: "name",
				title: "Subnetzmaske",
				content: "Zeigt an, welcher Teil Ihrer IP-Adresse das Netz und welcher den Host identifiziert. Standardwert: 255.255.255.0."
			},{
				type: "name",
				title: "Standardgateway",
				content: "Die IP-Adresse, über die Ihr Router den Weg ins Internet findet."
			},{
				type: "name",
				title: "Haupt-DNS-Server/Backup-DNS-Server",
				content: "Der Domänennamenservice (DNS) wandelt Hostnamen/Domänennamen in IP-Adressen um. Deren Adressen bekommt Ihr Router automatisch von Ihrem Internetdiensteanbieter mitgeteilt."
			},{
				type: "name",
				title: "Verbindungstyp",
				content: "Der Verbindungstyp des Internet(WAN)-Ports."
			},{
				type: "title",
				title: "IPv6",
			},{
				type: "name",
				title: "MAC-Adresse",
				content: "Die Hardwareadresse des Internet(WAN)-Ports Ihres Routers."
			},{
				type: "name",
				title: "IP-Adresse",
				content: "Die öffentliche IPv6-Adresse Ihres Routers."
			},{
				type: "name",
				title: "Standardgateway",
				content: "Die IP-Adresse, über die Ihr Router den Weg ins Internet findet."
			},{
				type: "name",
				title: "Haupt-DNS-Server/Backup-DNS-Server",
				content: "Der Domänennamenservice (DNS) wandelt Hostnamen/Domänennamen in IP-Adressen um. Deren Adressen bekommt Ihr Router automatisch von Ihrem Internetdiensteanbieter mitgeteilt."
			},{
				type: "name",
				title: "Verbindungstyp",
				content: "Der Verbindungstyp des Internet(WAN)-Ports."
			}]
		},
		STATUS_WIRELESS: {
			TITLE: "2,4-GHz-/5-GHz-WLAN",
			CONTENT: [{
				type: "paragraph",
				content: "Zeigt Informationen zu Ihrem WLAN an."
			},{
				type: "name",
				title: "WLAN-Name (SSID)",
				content: "Der Name Ihres WLANs, auch als SSID (Service Set Identifier) bekannt."
			},{
				type: "name",
				title: "WLAN-Schnittstelle",
				content: "Aktueller WLAN-Status (Ein oder Aus)."
			},{
				type: "name",
				title: "Modus",
				content: "Aktueller WLAN-Modus."
			},{
				type: "name",
				title: "Kanalbreite",
				content: "Die Bandbreite, die Ihr WLAN belegt."
			},{
				type: "name",
				title: "Kanal",
				content: "Der aktuelle WLAN-Kanal"
			},{
				type: "name",
				title: "MAC-Adresse",
				content: "Die Hardwareadresse der WLAN-Einheit Ihres Routers."
			},{
				type: "name",
				title: "WDS-Status",
				content: "Zeigt an, ob WDS aktiv ist."
			}]
		},
		STATUS_LAN: {
			TITLE: "LAN",
			CONTENT: [{
				type: "paragraph",
				content: "Zeigt Informationen zu Ihrer LAN-Verbindung an."
			},{
				type: "title",
				title: "IPv4"
			},{
				type: "name",
				title: "MAC-Adresse",
				content: "Die Hardwareadresse der LAN-Ports Ihres Routers."
			},{
				type: "name",
				title: "IP-Adresse",
				content: "Die LAN-IPv4-Adresse des Routers."
			},{
				type: "name",
				title: "Subnetzmaske",
				content: "Zeigt an, welcher Teil Ihrer IP-Adresse das Netz und welcher den Host identifiziert. Standardwert: 255.255.255.0."
			},{
				type: "name",
				title: "DHCP",
				content: "Zeigt an, ob der DHCP-Dienst Ihres Routers aktiv ist."
			},{
				type: "title",
				title: "IPv6"
			},{
				type: "name",
				title: "MAC-Adresse",
				content: "Die Hardwareadresse der LAN-Ports Ihres Routers."
			},{
				type: "name",
				title: "IP-Adresse",
				content: "Die LAN-IPv6-Adresse des Routers."
			},{
				type: "name",
				title: "Link-Adresse",
				content: "IPv6-Link-Adresse des LAN-Ports."
			},{
				type: "name",
				title: "Zugewiesener Typ",
				content: "Der IPv6-Adresstyp der LAN-Schnittstelle."
			}]
		},
		STATUS_GUEST: {
			TITLE: "2,4-/5GHz-Gastnetz",
			CONTENT: [{
				type: "paragraph",
				content: "Zeigt Informationen zum Gast-WLAN an."
			},{
				type: "name",
				title: "WLAN-Name (SSID)",
				content: "Der Name (SSID) Ihres Gastnetzes."
			},{
				type: "name",
				title: "WLAN verbergen",
				content: "Zeigt an, ob Ihr Gast-WLAN versteckt ist."
			},{
				type: "name",
				title: "WLAN-Schnittstelle",
				content: "Aktueller Gast-WLAN-Status (Ein oder Aus)."
			},{
				type: "name",
				title: "Gäste dürfen einander sehen",
				content: "Zeigt, ob die Geräte in Ihrem Gast-WLAN miteinander kommunizieren können."
			}]
		},
		STATUS_USB: {
			TITLE: "USB-Geräte",
			CONTENT: [{
				type: "paragraph",
				content: "Zeigt Informationen zu den aktuell angeschlossenen USB-Geräten (Speichermedien oder Drucker) an."
			},{
				type: "name",
				title: "Drucker",
				content: "Name des angeschlossenen Druckers."
			},{
				type: "name",
				title: "USB-Datenträger",
				content: "Name des angeschlossenen USB-Datenträgers."
			},{
				type: "name",
				title: "Gesamt",
				content: "Die Gesamtkapazität des angeschlossenen USB-Datenträgers."
			},{
				type: "name",
				title: "Verfügbar",
				content: "Der freie Speicherplatz auf dem angeschlossenen USB-Datenträger."
			}]
		},
		STATUS_PERFORMANCE: {
			TITLE: "Performance",
			CONTENT: [{
				type: "paragraph",
				content: "Zeigt Informationen zur aktuellen Routerperformance."
			},{
				type: "name",
				title: "CPU-Last",
				content: "Die aktuelle Prozessorauslastung."
			},{
				type: "name",
				title: "Speichernutzung",
				content: "Aktuelle Arbeitsspeicherbelegung."
			}]
		},
		STATUS_WIRED: {
			TITLE: "Kabelgebundene Teilnehmer",
			CONTENT: [{
				type: "paragraph",
				content: "Zeigt Informationen zu den angeschlossenen Ethernetgeräten an."
			}]
		},
		STATUS_WIRELESS_CLIENTS: {
			TITLE: "WLAN-Teilnehmer",
			CONTENT: [{
				type: "paragraph",
				content: "Zeigt Informationen zu den verbundenen WLAN-Geräten an."
			}]
		},
		
		INTERNET_INTERNET: {
			TITLE: "IPv4",
			CONTENT: [{
				type: "title",
				title: "Internetverbindungstyp: Statische IP-Adresse"
			},{
				type: "paragraph",
				content: "Wählen Sie dies aus, wenn Ihr Internetdiensteanbieter Ihnen eine statische IP-Konfiguration bereitgestellt hat (bestehend aus IP-Adresse, Subnetzmaske, Gateway- und DNS-Serveradresse(n))."
			},{
				type: "name",
				title: "IP-Adresse, Subnetzmaske, Standardgateway, Haupt-/Backup-DNS-Server",
				content: "Geben Sie hier die von Ihrem Internetdiensteanbieter vorgegebenen Werte ein."
			},{
				type: "name",
				title: "MTU-Größe",
				content: "Ein typischer Wert für die MTU(Maximum Transmission Unit)-Größe von Ethernet-Anwendungen ist 1500 Byte. Wir empfehlen, diese nicht zu ändern, es sei denn, Sie wurden angewiesen, dies zu tun."
			},{
				type: "title",
				title: "Internetverbindungstyp: Dynamische IP-Adresse"
			},{
				type: "paragraph",
				content: "Wählen Sie diesen Typ aus, wenn Ihr Internetdiensteanbieter Ihnen Ihre IP-Adresse über DHCP bereitstellt."
			},{
				type: "name",
				title: "IP-Adresse, Subnetzmaske, Standardgateway, Haupt-/Backup-DNS-Server",
				content: "Diese Informationen werden vom DHCP-Server Ihres Internetdiensteanbieters automatisch gesetzt."
			},{
				type: "name",
				title: "Erneuern",
				content: "Klicken Sie hier, um Ihre IP-Konfiguration zu erneuern."
			},{
				type: "name",
				title: "Freigeben",
				content: "Klicken Sie hier, um Ihre aktuelle IP-Konfiguration zurückzugeben."
			},{
				type: "name",
				title: "Folgende DNS-Server verwenden",
				content: "Bietet Ihr Internetdiensteanbieter DNS-Serveradressen, setzen Sie hier einen Haken und geben Sie sie hier ein. Ansonsten werden die Adressen automatisch zugewiesen."
			},{
				type: "name",
				title: "MTU-Größe",
				content: "Ein typischer Wert für die MTU(Maximum Transmission Unit)-Größe von Ethernet-Anwendungen ist 1500 Byte. Wir empfehlen, diese nicht zu ändern, es sei denn, Sie wurden angewiesen, dies zu tun."
			},{
				type: "name",
				title: "Hostname",
				content: "Der Wert, den Sie hier eingeben, spezifiziert den Hostnamen Ihres Routers."
			},{
				type: "name",
				title: "IP-Konfiguration mittels Unicast abfragen",
				content: "Wählen Sie diese Option, wenn der DHCP-Server Ihres Internetdiensteanbieters keine Broadcastanwendungen unterstützt und Sie daher keine IP-Konfiguration bekommen (wird selten benötigt)."
			},{
				type: "title",
				title: "Internetverbindungstyp: PPPoE"
			},{
				type: "paragraph",
				content: "Wählen Sie diesen Typ aus, wenn Sie DSL haben und hierfür einen Benutzernamen und ein Passwort von Ihrem Internetdiensteanbieter bekommen haben."
			},{
				type: "name",
				title: "Benutzername/Passwort",
				content: "Geben Sie hier die von Ihrem Internetdiensteanbieter vorgegebenen Zugangsdaten ein. Achten Sie hier auf Groß- und Kleinschreibung."
			},{
				type: "name",
				title: "IP-Adresse/Haupt-DNS-Server/Backup-DNS-Server",
				content: "Diese Parameter werden bei der Einwahl automatisch eingestellt."
			},{
				type: "name",
				title: "Zweitverbindung (Keine, Dynamische IP-Adresse, Statische IP-Adresse)",
				children: [{
					type: "name",
					title: "Keine",
					content: "Wählen Sie dies aus, wenn Sie keine Zweitverbindung verwenden."
				},{
					type: "name",
					title: "Dynamische IP-Adresse",
					content: "Wählen Sie dies aus, wenn IP-Adresse und Subnetzmaske von Ihrem Internetdiensteanbieter automatisch vergeben werden.",
					children: [{
						type: "name",
						title: "Erneuern",
						content: "Klicken Sie hier, um Ihre IP-Konfiguration zu erneuern."
					},{
						type: "name",
						title: "Freigeben",
						content: "Klicken Sie hier, um Ihre aktuelle IP-Konfiguration zurückzugeben."
					}]
				},{
					type: "name",
					title: "Statische IP-Adresse",
					content: "Wählen Sie dies aus, sofern Sie Ihre Konfiguration von Ihrem Internetdiensteanbieter von Hand eintragen müssen."
				}]
			},{
				type: "name",
				title: "MTU-Größe",
				content: "Ein typischer Wert für die MTU(Maximum Transmission Unit)-Größe von Ethernet-Anwendungen ist 1480 Byte.",
				children: [{
					type: "note",
					title: "Hinweis",
					content: "Hinweis: In seltenen Fällen muss dieser Wert angepasst werden. Wir empfehlen, dies nicht zu tun, solange Ihr Internetdiensteanbieter dies Ihnen nicht vorschreibt."
				}]
			},{
				type: "name",
				title: "Dienstname/AC-Name",
				content: "Diese Felder können frei bleiben, wenn Ihr Internetdiensteanbieter Ihnen nichts Anderslautendes sagt."
			},{
				type: "name",
				title: "Intervall für Online-Erkennung",
				content: "Geben Sie ein Intervall von 0 bis 120 Sekunden ein, in dem der Router den Access Concentrator erkennen soll. Standardwert: 10"
			},{
				type: "name",
				title: "IP-Adresse",
				content: "Bekommen Sie von Ihrem Internetdiensteanbieter eine feste IP-Adresse zugewiesen, wählen Sie Folgende IP-Adresse verwenden und geben Sie sie hier ein. Ansonsten wählen Sie IP-Adresse dynamisch abfragen."
			},{
				type: "name",
				title: "DNS-Serveradresse/Haupt-/Backup-DNS-Server",
				content: "Falls ihr Internetdienstanbieter Ihnen eine statische DNS Adresse zur Verfügung stellt, können Sie diese im Feld Primäre DNS/Sekundäre DNS hinterlegen. Andererseits sollten Sie dynamisch beziehen auswählen."
			},{
				type: "name",
				title: "Verbindungsmodus",
				content: "Wählen Sie hier den von Ihnen gewünschten Internetverbindungsmodus aus.",
				children: [{
					type: "name",
					title: "Automatisch",
					content: "Automatische Wiederverbindung, wenn die Internetverbindung getrennt wird."
				},{
					type: "name",
					title: "Verbinden bei Bedarf",
					content: "Werden für eine gewisse Zeit (Maximale Leerlaufzeit) keine Internetdaten über Ihren Router übertragen, wird die Verbindung getrennt. Bei einer erneuten Verbindungsanfrage wird sie automatisch wiederhergestellt."
				},{
					type: "name",
					title: "Zeitbasierend",
					content: "Sie definieren eine Start- und eine Endzeit (im Format HH:MM). Zu diesen Zeitpunkten wird Ihre Internetverbindung hergestellt bzw. getrennt."
				},{
					type: "name",
					title: "Manuelles Verbinden",
					content: "Zum Herstellen und Trennen Ihrer Internetverbindung bedarf es eines Klicks in der Weboberfläche. Definieren Sie eine Maximale Leerlaufzeit, wird die Verbindung auch getrennt, wenn über dieses Zeitintervall keine Internetdaten durch Ihren Router gegangen sind. Standardwert hierfür: 15 Minuten. Deaktivieren Sie die Maximale Leerlaufzeit, indem Sie den Wert 0 setzen."
				},{
					type: "note",
					title: "Hinweis",
					content: "Hinweis: Die Zeitbasierende Verbindung funktioniert nur, wenn die Systemzeit unter Erweitert → Systemtools → Zeiteinstellungen konfiguriert ist."
				}]
			},{
				type: "title",
				title: "Internetverbindungstyp: BigPond-Cable",
				id: "BigPond"
			},{
				type: "paragraph",
				content: "Verwenden Sie diese Option für Bigpond-Cable-Anbieter.",
				id: "BigPond_desc"
			},{
				type: "name",
				title: "Benutzername/Passwort",
				content: "Geben Sie hier die von Ihrem Internetdiensteanbieter vorgegebenen Zugangsdaten ein. Achten Sie hier auf Groß- und Kleinschreibung.",
				id: "BigPond_name"
			},{
				type: "name",
				title: "Auth.-Server",
				content: "IP-Adresse oder Hostname des Authentifizierungsservers.",
				id: "BigPond_server"
			},{
				type: "name",
				title: "Auth.-Domäne",
				content: "Das Domänennamensuffix Ihres Standortes. Beispiel: nsw.bigpond.net.au für NSW/ACT, vic.bigpond.net.au für VIC/TAS/WA/SA/NT und qld.bigpond.net.au für QLD.",
				id: "BigPond_domain"
			},{
				type: "name",
				title: "MTU-Größe",
				content: "Ein typischer Wert für die MTU(Maximum Transmission Unit)-Größe von Ethernet-Anwendungen ist 1500 Byte. Wir empfehlen, diese nicht zu ändern, es sei denn, Sie wurden angewiesen, dies zu tun.",
				id: "BigPond_mtu"
			},{
				type: "name",
				title: "Verbindungsmodus",
				content: "Wählen Sie hier den von Ihnen gewünschten Internetverbindungsmodus aus.",
				id: "BigPond_mode",
				children: [{
					type: "name",
					title: "Automatisch",
					content: "Automatische Wiederverbindung, wenn die Internetverbindung getrennt wird."
				},{
					type: "name",
					title: "Verbinden bei Bedarf",
					content: "Werden für eine gewisse Zeit (Maximale Leerlaufzeit) keine Internetdaten über Ihren Router übertragen, wird die Verbindung getrennt. Bei einer erneuten Verbindungsanfrage wird sie automatisch wiederhergestellt."
				},{
					type: "name",
					title: "Manuelles Verbinden",
					content: "Zum Herstellen und Trennen Ihrer Internetverbindung bedarf es eines Klicks in der Weboberfläche. Definieren Sie eine Maximale Leerlaufzeit, wird die Verbindung auch getrennt, wenn über dieses Zeitintervall keine Internetdaten durch Ihren Router gegangen sind. Standardwert hierfür: 15 Minuten. Deaktivieren Sie die Maximale Leerlaufzeit, indem Sie den Wert 0 setzen."
				}]
			},{
				type: "title",
				title: "Internetverbindungstyp: L2TP/PPTP"
			},{
				type: "paragraph",
				content: "Wählen Sie diesen Typ, wenn Sie sich mit einem L2TP-/PPTP-VPN-Server verbinden möchten und mit Benutzernamen, Passwort und IP-Adresse/Domänennamen ausgestattet sind."
			},{
				type: "name",
				title: "Benutzername/Passwort",
				content: "Geben Sie hier die von Ihrem Internetdiensteanbieter vorgegebenen Zugangsdaten ein. Achten Sie hier auf Groß- und Kleinschreibung."
			},{
				type: "name",
				title: "IP-Adresse/Haupt-DNS-Server/Backup-DNS-Server",
				content: "Diese Parameter werden automatisch von Ihrem Internetdiensteanbieter zugewiesen."
			},{
				type: "name",
				title: "Zweitverbindung (Dynamische oder Statische IP-Adresse)",
				children: [{
					type: "name",
					title: "Dynamische IP-Adresse",
					content: "Wählen Sie dies aus, wenn IP-Adresse und Subnetzmaske von Ihrem Internetdiensteanbieter automatisch vergeben werden."
				},{
					type: "name",
					title: "Statische IP-Adresse",
					content: "Wählen Sie dies, wenn Sie IP-Adresse, Subnetzmaske, Standardgateway und DNS-Serveradressen von Ihrem Internetdiensteanbieter bekommen haben und geben Sie diese in die passenden Felder ein."
				}]
			},{
				type: "name",
				title: "IP-Adresse/Domänenname des VPN-Servers",
				content: "Geben Sie hier die Adresse des VPN-Servers ein, so wie Sie sie von Ihrem Internetdiensteanbieter erhalten haben."
			},{
				type: "name",
				title: "MTU-Größe",
				content: "Die Standard-MTU(Maximal Transmission Unit)-Größe für L2TP beträgt 1460B. Für PPTP 1420 Byte. Es wird empfohlen, diesen Wert nur bei Erfordernis zu ändern."
			},{
				type: "name",
				title: "Verbindungsmodus",
				content: "Wählen Sie hier den von Ihnen gewünschten Internetverbindungsmodus aus.",
				children: [{
					type: "name",
					title: "Automatisch",
					content: "Automatische Wiederverbindung, wenn die Internetverbindung getrennt wird."
				},{
					type: "name",
					title: "Verbinden bei Bedarf",
					content: "Werden für eine gewisse Zeit (Maximale Leerlaufzeit) keine Internetdaten über Ihren Router übertragen, wird die Verbindung getrennt. Bei einer erneuten Verbindungsanfrage wird sie automatisch wiederhergestellt."
				},{
					type: "name",
				title: "Manuelles Verbinden",
				content: "Zum Herstellen und Trennen Ihrer Internetverbindung bedarf es eines Klicks in der Weboberfläche. Definieren Sie eine Maximale Leerlaufzeit, wird die Verbindung auch getrennt, wenn über dieses Zeitintervall keine Internetdaten durch Ihren Router gegangen sind. Standardwert hierfür: 15 Minuten. Deaktivieren Sie die Maximale Leerlaufzeit, indem Sie den Wert 0 setzen."
				}]
			},{
				type:"paragraph",
				content:"Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		INTERNET_MAC: {
			TITLE: "MAC-Adresse klonen",
			CONTENT: [{
				type: "name",
				title: "Standard-MAC-Adresse benutzen",
				content: "Standard-MAC-Adresse des Routers wiederherstellen."
			},{
				type: "name",
				title: "MAC-Adresse des Computers verwenden",
				content: "Hiermit kopieren Sie die MAC-Adresse Ihres Computers. Sinnvoll, wenn Ihr Computer bisher direkt an das Internet angeschlossen war (ohne Router) und Ihr Internetdiensteanbieter sich diese MAC-Adresse gemerkt hat."
			},{
				type: "name",
				title: "Benutzerdefinierte MAC-Adresse",
				content: "Geben Sie die gewünschte MAC-Adresse von Hand ein."
			},{
				type:"paragraph",
				content:"Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},

		LAN_IPV4: {
			TITLE: "LAN",
			CONTENT: [{
				type: "name",
				title: "MAC-Adresse",
				content: "Die Hardwareadresse der LAN-Ports Ihres Routers."
			},{
				type: "name",
				title: "IP-Adresse",
				content: "Zeigt die Standard-IP-Adresse des Routers, über die Sie sich in die Weboberfläche einloggen können. Kann überschrieben werden."
			},{
				type: "name",
				title: "Subnetzmaske",
				content: "Wählen Sie aus der Drop-Down-Liste eine Subnetzmaske aus oder geben Sie eine neue ein."
			},{
				type: "note",
				title: "Hinweis",
				content: "Befindet die neue LAN-IP-Adresse sich in einem anderen Subnetz als die alte, wird die Konfiguration des DHCP-Servers automatisch angepasst. Virtuelle Server und DMZ-Host müssen in diesem Fall hingegen neu konfiguriert werden."
			},{
				type:"paragraph",
				content:"Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		IPTV:{
			TITLE: "Einstellungen",
			CONTENT: [{
					type: "name",
					title: "IGMP-Proxy",
					content: "Wählen Sie die IGMP(Internet Group Management Protocol)-Proxy-Version aus (entweder V2 oder V3, Vorgabe Ihres Internetdiensteanbieters)."
				},{
					type: "name",
					title: "IGMP-Version",
					content: "IGMP-Proxy-Version auswählen, entweder V2 oder V3, je nach Vorgabe Ihres Internetdiensteanbieters."
				},
				{
					type: "name",
					title: "IPTV",
					content: "IPTV aktivieren."
				},
				{
					type: "name",
					title: "Modus",
					content: "Wählen Sie einen der sechs folgenden Modi gemäß den Vorgaben Ihres Anbieters aus:",
					children: [
						{
							type: "name",
							title: "Bridge",
							content:"Ist Ihr Internetdiensteanbieter nicht gelistet und keine weiteren Parameter vorgegeben, wählen Sie einfach diesen Modus aus und konfigurieren die LAN-Ports Ihres Routers.",
							children:[{
								type: "name",
								title: "LAN 1/2/3/4",
								content: "Wählen Sie aus, ob ein LAN-Port für Internet oder für IPTV verwendet werden soll."
							}]
						},
						{
							type: "name",
							title: "Russland",
							content: "Nutzen Sie diese Auswahl, falls Sie einen russischen Internetdienstanbieter nutzen, und alle Parameter vorgegeben sind, darunter Internet-/IP-Telefon-/IPTV-VLAN-IDs und Priorität, sowei die Features der LAN-Ports(1/2/3/4).",
							children: [{
								type: "name",
								title: "IPTV-Multicast-VLAN-ID/Priorität",
								content: "Aktivieren Sie IPTV-Multicast und setzen Sie VLAN-ID und Priorität gemäß den Vorgaben Ihres Internetdiensteanbieters."
							}]
						},
						{
							type: "name",
							title: "Singapore-ExStream",
							content: "Wählen Sie dies für den singapurischen Anbieter \"ExStream\" mit vordefinierten Parametern: Internet/IP-Phone/IPTV-VLAN-IDs und Priorität. Konfigurieren Sie dann die LAN-Ports 1 bis 4."
						},
						{
							type: "name",
							title: "Malaysia-Unifi",
							content: "Wählen Sie dies für den malaysischen Anbieter \"Unifi\" mit vordefinierten Parametern: Internet/IP-Phone/IPTV-VLAN-IDs und Priorität. Konfigurieren Sie dann die LAN-Ports 1 bis 4."
						},
						{
							type: "name",
							title: "Malaysia-Maxis",
							content: "Wählen Sie dies für den malaysischen Anbieter \"Maxis\" mit vordefinierten Parametern: Internet/IP-Phone/IPTV-VLAN-IDs und Priorität. Konfigurieren Sie dann die LAN-Ports 1 bis 4."
						},
						{
							type: "name",
							title: "Benutzerdefiniert",
							content: "Wählen Sie dies, wenn Ihr Internetdiensteanbieter nicht in der Liste aufgeführt ist und Ihnen die erforderlichen Parameter vorliegen: Internet/IP-Phone/IPTV-VLAN-IDs und Priorität. Konfigurieren Sie dann die LAN-Ports 1 bis 4.",
							children: [{
								type: "name",
								title: "Internet/IP-Telefon/IPTV-VLAN-ID/Priorität",
								content: "Konfigurieren Sie die VLAN-IDs und -Prioritäten gemäß den Vorgaben Ihres Internetdiensteanbieters."
							},{
								type: "name",
								title: "802.11Q-Tag",
								content: "Bitte auswählen wenn die Internetpakete gemäß 802.11Q getaggt werden sollen."
							},{
								type: "name",
								title: "IPTV-Multicast-VLAN-ID/Priorität",
								content: "Aktivieren Sie IPTV-Multicast und setzen Sie VLAN-ID und Priorität gemäß den Vorgaben Ihres Internetdiensteanbieters."
							},{
								type: "name",
								title: "LAN 1/2/3/4",
								content: "Wählen Sie aus, ob ein LAN-Port für Internet oder für IPTV verwendet werden soll."
							}]
						}
					]
				},{
					type:"paragraph",
					content:"Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
				}
			]
		},

		DHCP_SERVER_SETTINGS: {
			TITLE: "Einstellungen",
			CONTENT: [{
				type: "name",
				title: "DHCP-Server",
				content: "Standardmäßig ist der DHCP(Dynamic Host Configuration Protocol)-Server aktiviert. Dann weist er den Clients im Netz die TCP/IP-Konfigurationen automatisch zu. IP-Adressen werden dabei aus dem IP-Adresspool vergeben. Deaktivieren Sie den DHCP-Server nicht, wenn Sie keinen anderen aktiven DHCP-Server im Netz haben und Sie Ihre IP-Konfigurationen nicht alle von Hand vornehmen möchten."
			},{
				type: "name",
				title: "IP-Adresspool",
				content: "Geben Sie den IP-Adressbereich an, der für DHCP-Clients reserviert werden soll."
			},{
				type: "name",
				title: "Adresshaltezeit",
				content: "Tragen Sie die Dauer ein, wie lange ein Client eine IP-Adresse erhalten soll (Werte zwischen 2 und 2880 sind möglich). Die Standardeinstellung ist 120 Minuten."
			},{
				type: "name",
				title: "Standardgateway",
				content: "Geben Sie hier die LAN-IP-Adresse ein (optional)."
			},{
				type: "name",
				title: "Haupt-DNS-Server/Backup-DNS-Server",
				content: "(optional) Hier können Sie DNS-Serveradressen eingeben."
			},{
				type:"paragraph",
				content:"Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		RESERVED_IP_ADDRESS: {
			TITLE: "Adressreservierung",
			CONTENT: [{
				type: "paragraph",
				content: "Sie können IP-Adressen von mit dem Routern verbundenen Geräten reservieren. Eine reservierte IP-Adresse wird nur dem Gerät zugewiesen, dem sie zugeordnet ist."
			},{
				type: "name",
				title: "MAC-Adresse",
				content: "MAC-Adresse des Gerätes, für das eine IP-Adresse reserviert ist."
			},{
				type: "name",
				title: "Reservierte IP-Adresse",
				content: "Die IP-Adresse, die für dieses Gerät reserviert ist."
			},{
				type: "name",
				title: "Beschreibung",
				content: "Eine frei wählbare Beschreibung für das Gerät (z.B. Blu-ray-Player)."
			},{
				type: "name",
				title: "Status",
				content: "Aktueller Status (aktiviert oder deaktiviert) des Gerätes."
			},{
				type: "name",
				title: "Bearbeiten",
				content: "Optionen zum Löschen oder Bearbeiten eines Eintrags."
			},{
				type: "step",
				title: "So reservieren Sie eine IP-Adresse:",
				content:[
					"1. Klicken Sie Hinzufügen.",
					"2. Geben Sie die MAC-Adresse des betreffenden Gerätes ein.",
					"3. Geben Sie die zu reservierende IP-Adresse ein.",
					"4. Vergeben Sie eine kurze Beschreibung, damit Sie den Eintrag wiedererkennen können.",
					"5. Wählen Sie Aktivieren.",
					"6. Klicken Sie OK."
				]
			},{
				type: "step",
				title: "Bearbeiten oder Löschen eines Eintrages",
				content: "Klicken Sie in der Zeile des Gerätes Bearbeiten oder Löschen."
			}]
		},

		DHCP_CLIENT_LIST: {
			TITLE: "DHCP-Clientliste",
			CONTENT: [{
				type: "name",
				title: "lfd. Nr.",
				content: "Laufende Nummer des DHCP-Clients."
			},{
				type: "name",
				title: "Clientname",
				content: "Hostname des DHCP-Clients."
			},{
				type: "name",
				title: "MAC-Adresse",
				content: "MAC-Adresse des DHCP-Clients."
			},{
				type: "name",
				title: "Zugewiesene IP-Adresse",
				content: "Die IP-Adresse, die dem DHCP-Client zugewiesen wurde."
			},{
				type: "name",
				title: "Adresshaltezeit",
				content: "Die verbleibende Zeit, die der Client seine IP-Konfiguration behalten kann."
			},{
				type: "name",
				title: "Neu laden",
				content: "Ansicht der DHCP-Clientliste aktualisieren."
			}]
		},

		DDNS: {
			TITLE: "Dynamisches DNS",
			CONTENT: [{
				type: "paragraph",
				content: "Dynamisches DNS ermöglicht das Setzen einer statischen Hostadresse, obwohl Sie eine dynamische Internet-IP-Adresse nutzen. Es wird häufig dafür verwendet, wenn Sie eine eigene Website, FTP-Server oder andere Server anbinden möchten. Dazu benötigen Sie einen Account bei einem DDNS-Anbieter (bspw.dyn.com)."
			},{
				type: "step",
				title: "So richten Sie Dynamisches DNS ein:",
				content: [
					"1. Wählen Sie den DDNS-Anbieter, bei dem Sie sich registriert haben, aus.",
					"2. Geben Sie Benutzernamen und Passwort Ihres DDNS-Kontos ein.",
					"3. Geben Sie Ihren DDNS-Domänennamen ein.",
					"4. Wählen Sie das gewünschte Aktualisierungsintervall aus der Drop-Down-Liste aus.",
					"5. Klicken Sie Einloggen und Speichern."
				]
			},{
				type: "paragraph",
				content: "Um zwischen verschiedenen DDNS-Konten zu wechseln, müssen Sie zunächst Ausloggen klicken und dann mit den neuen Daten auf Login und speichern."
			}]
		},


		ADVANCED_ROUTING_STATIC_ROUTING: {
			TITLE: "Statisches Routing",
			CONTENT: [{
				type: "paragraph",
				content: "Statisches Routing legt eine Route fest, die Datenpakete gehen müssen, um ihr Ziel zu erreichen."
			},{
				type: "step",
				title: "Einrichtung des Statischen Routings",
				content: [
					"1. Klicken Sie Hinzufügen.",
					"2. Zielnetz - Geben Sie eine Zielnetzadresse ein.",
					"3. Subnetzmaske - Geben Sie die Subnetzmaske des Zielnetzes ein.",
					"4. Standardgateway - Geben Sie die IP-Adresse des Gateways ein, über den das Zielnetz zu erreichen ist.",
					"5. Schnittstelle - Wählen Sie LAN oder WAN, um die für das Zielnetz zu verwendende Schnittstelle zu definieren.",
					"6. Beschreibung - Eine kurze Beschreibung für diesen Eintrag.",
					"7. Wählen Sie Aktivieren.",
					"8. Klicken Sie OK."
				]
			},{
				type: "step",
				title: "Bearbeiten oder Löschen eines Eintrages",
				content: "Klicken Sie in der Tabelle Bearbeiten oder Löschen, um einen Eintrag zu bearbeiten oder zu löschen."
			}]
		},
		
		ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE: {
			TITLE: "Systemroutingtabelle",
			CONTENT: [{
				type: "paragraph",
				content: "Die Systemroutingtabelle zeigt alle aktuell verwendeten gültigen Routen an."
			},{
				type: "paragraph",
				content: "Klicken Sie Neu laden, um die Ansicht der Routingtabelle zu aktualisieren."
			}]
		},
		
		WIRELESS_REGION: {
			TITLE: "Einstellungen",
			CONTENT: [{
				type: "name",
				title: "Region",
				content: "Wählen Sie aus der Drop-Down-Liste den Standort des Routers aus. Ist Ihr Standort nicht aufgeführt, wenden Sie sich an die zuständigen Behörden, um zu klären, ob der WLAN-Betrieb erlaubt ist."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		WIRELESS_24G: {	
			TITLE: "2,4GHz-WLAN",
			CONTENT: [{
				type: "name",
				title: "WLAN aktivieren",
				content: "Hiermit aktiveren Sie Ihr 2,4GHz-WLAN. Falls Sie es nicht aktivieren, bleibt WDS ebenfalls deaktiviert."
			},{
				type: "name",
				title: "WLAN-Name (SSID)",
				content: "Sie können die Standard-SSID belassen oder einen eigenen Namen vergeben (max. 32 Zeichen lang). Hier wird zwischen Groß- und Kleinschreibung unterschieden."
			},{
				type: "name",
				title: "WLAN verbergen",
				content: "Hiermit verstecken Sie Ihr 2,4GHz-WLAN. WPS wird mit versteckter SSID nicht mehr unterstützt."
			},{
				type: "name",
				title: "Sicherheit",
				content: "Wählen Sie hier eine der folgenden Optionen:",
				children: [{
					type: "name",
					title: "Keine Sicherheit",
					content: "Hiermit deaktivieren Sie Ihre WLAN-Verschlüsselung. Es wird wärmstens empfohlen, Ihr WLAN nur verschlüsselt zu betreiben."
				},{
					type: "name",
					title: "WPA/WPA2-Personal",
					content: "(empfohlen) Authentifizierung basierend auf einem Passwort (PSK). Bitte beachten Sie die weiteren auszufüllenden Felder für diese Option.",
					children: [{
						type: "name",
						title: "Version",
						content: "Sicherheitsversion Ihres WLANs.",
						children: [{
							type: "name",
							title: "Automatisch",
							content: "Wählt automatisch zwischen WPA und WPA2, je nach Fähigkeiten des Clientgerätes."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "Diese Option bietet einen guten Sicherheitslevel. Sobald es gewählt wird, wird WPS deaktiviert."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "Diese Option bietet eine höhere Sicherheitsstufe als WPA-PSK und wird deshalb empfohlen."
						}]
					},{
						type: "name",
						title: "Verschlüsselung",
						content: "Wählen Sie einen Verschlüsselungstyp: TKIP (Temporal Key Integrity Protocol), AES ( Advanced Encryption Standard), oder Auto (sowohl TKIP als auch AES). Wir empfehlen nicht die Verwendung von TKIP, wenn der Router mit 802.11n arbeitet, da TKIP von 802.11n nicht unterstützt wird. Sobald TKIP gewählt wird, wird WPS deaktiviert."
					},{
						type: "name",
						title: "Passwort",
						content: "Geben Sie ein aus 8 bis 63 ASCII- oder 8 bis 64 Hexadezimal-Zeichen bestehendes Passwort ein."
					}]
				},{
					type: "name",
					title: "WPA/WPA2-Enterprise",
					content: "Wählen Sie diese Option, um eine erweiterte Authentifizierungsmethode, RADIUS(Remote Authentication Dial in User Server) zu nutzen. Bei Aktivierung wird WPS nicht mehr unterstützt.",
					children: [{
						type: "name",
						title: "Version",
						content: "Sicherheitsversion Ihres WLANs.",
						children:[{
							type: "name",
							title: "Automatisch",
							content: "Wählt automatisch zwischen WPA und WPA2, je nach Fähigkeiten des Clientgerätes."
						},{
							type: "name",
							title: "WPA",
							content: "Diese Option bietet ein gutes Maß an Sicherheit."
						},{
							type: "name",
							title: "WPA2",
							content: "Diese Option bietet eine höhere Sicherheitsstufe als WPA-PSK und wird deshalb empfohlen."
						}]
					},{
						type: "name",
						title: "Verschlüsselung",
						content: "Wählen Sie eine Sicherheits-Verschlüsselungsart: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard) oder Automatisch (sowohl TKIP als auch AES). Es wird NICHT empfohlen, die TKIP-Verschlüsselung zu wählen, wenn der Router im 802.11n-Modus betrieben wird, denn TKIP wird von 802.11n nicht unterstützt."
					},{
						type: "name",
						title: "IP-Adresse des RADIUS-Servers",
						content: "Geben Sie hier die IP-Adresse des Authentifizierungsservers ein."
					},{
						type: "name",
						title: "RADIUS-Port",
						content: "Nummer des Ports, auf dem der RADIUS-Dienst läuft."
					},{
						type: "name",
						title: "RADIUS-Passwort",
						content: "Das Passwort, mit dem Sie sich am RADIUS-Server authentifizieren müssen."
					}]
				},{
				type: "name",
				title: "WEP",
				content: "Wählen Sie diese Option, um die Grundauthentifizierungsmethode zu aktivieren. Falls eines ihrer Geräte nur mit WEP(Wired Equivalent Privacy) arbeitet. Bei Aktivierung wird WPS nicht mehr ünterstützt.",
				children: [{
					type: "name",
					title: "Typ",
					content: "Wählen Sie einen Authentifizierungstyp für Ihr WLAN. Standardwert ist Automatisch, wodurch automatisch zwischen Offen und Shared-Key gewählt wird."
				},{
					type: "name",
					title: "WEP-Schlüsselformat",
					content: "Wählen Sie ASCII-oder Hexadezimal-Format. Das ASCII-Format ist eine Kombination aus ASCII-Zeichen. Das Hexadezimale Format ist eine Kombination aus Zahlen (0-9) und Buchstaben (A-F, a-f). "
				},{
					type: "name",
					title: "Schlüssellänge",
					content: "Die Länge des WEP-Schlüssels.",
					children: [{
						type: "name",
						title: "64 Bit",
						content: "Benötigt 10 Hexadezimal- oder 5 ASCII-Zeichen."
					},{
						type: "name",
						title: "128 Bit",
						content: "Benötigt 26 Hexadezimal- oder 13 ASCII-Zeichen."
					}]
				},{
					type: "name",
					title: "Schlüssel",
					content: "Geben Sie hier den WEP-Schlüssel ein."
				}]
			}]
			},{
				type: "name",
				title: "Modus",
				content: "Wählen Sie einen Übertragungsmodus."
			},{
				type: "name",
				title: "Kanalbreite",
				content: "Die von Ihrem 2,4GHz-WLAN verwendete Bandbreite pro Kanal."
			},{
				type: "name",
				title: "Kanal",
				content: "Wählen Sie den zu verwendenden 2,4GHz-Kanal aus. Es wird empfohlen, die Standardeinstellung (Auto) beizubehalten, sofern keine anderen Gründe dagegensprechen."
			},{
				type: "name",
				title: "Sendeleistung",
				content: "Wählen Sie zwischen Hoch, Mittel oder Niedrig. Der Standardwert ist Hoch (empfohlen)."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		WIRELESS_5G: {	
			TITLE: "5GHz-WLAN",
			CONTENT: [{
				type: "name",
				title: "WLAN aktivieren",
				content: "Hiermit aktiveren Sie Ihr 5GHz-WLAN. Falls Sie es nicht aktivieren, bleibt WDS ebenfalls deaktiviert."
			},{
				type: "name",
				title: "WLAN-Name (SSID)",
				content: "Sie können die Standard-SSID belassen oder einen eigenen Namen vergeben (max. 32 Zeichen lang). Hier wird zwischen Groß- und Kleinschreibung unterschieden."
			},{
				type: "name",
				title: "WLAN verbergen",
				content: "Hiermit verstecken Sie Ihr 5GHz-WLAN. WPS wird mit versteckter SSID nicht mehr unterstützt."
			},{
				type: "name",
				title: "Sicherheit",
				content: "Wählen Sie hier eine der folgenden Optionen:",
				children: [{
					type: "name",
					title: "Keine Sicherheit",
					content: "Hiermit deaktivieren Sie Ihre WLAN-Verschlüsselung. Es wird wärmstens empfohlen, Ihr WLAN nur verschlüsselt zu betreiben."
				},{
					type: "name",
					title: "WPA/WPA2-Personal",
					content: "(empfohlen) Authentifizierung basierend auf einem Passwort (PSK). Bitte beachten Sie die weiteren auszufüllenden Felder für diese Option.",
					children: [{
						type: "name",
						title: "Version",
						content: "Sicherheitsversion Ihres WLANs.",
						children: [{
							type: "name",
							title: "Automatisch",
							content: "Wählt automatisch zwischen WPA und WPA2, je nach Fähigkeiten des Clientgerätes."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "Diese Option bietet einen guten Sicherheitslevel. Sobald es gewählt wird, wird WPS deaktiviert."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "Diese Option bietet eine höhere Sicherheitsstufe als WPA-PSK und wird deshalb empfohlen."
						}]
					},{
						type: "name",
						title: "Verschlüsselung",
						content: "Wählen Sie einen Verschlüsselungstyp: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), oder Auto (sowohl TKIP als auch AES). Wir empfehlen nicht die Verwendung von TKIP, wenn der Router mit 802.11n arbeitet, da TKIP von 802.11n nicht unterstützt wird. Sobald TKIP gewählt wird, wird WPS deaktiviert."
					},{
						type: "name",
						title: "Passwort",
						content: "Geben Sie ein aus 8 bis 63 ASCII- oder 8 bis 64 Hexadezimal-Zeichen bestehendes Passwort ein."
					}]
				},{
					type: "name",
					title: "WPA/WPA2-Enterprise",
					content: "Wählen Sie diese Option, um eine erweiterte Authentifizierungsmethode, RADIUS(Remote Authentication Dial in User Server) zu nutzen. Bei Aktivierung wird WPS nicht mehr unterstützt.",
					children: [{
						type: "name",
						title: "Version",
						content: "Sicherheitsversion Ihres WLANs.",
						children: [{
							type: "name",
							title: "Automatisch",
							content: "Wählt automatisch zwischen WPA und WPA2, je nach Fähigkeiten des Clientgerätes."
						},{
							type: "name",
							title: "WPA",
							content: "Diese Option bietet ein gutes Maß an Sicherheit."
						},{
							type: "name",
							title: "WPA2",
							content: "Diese Option bietet eine höhere Sicherheitsstufe als WPA-PSK und wird deshalb empfohlen."
						}]
					},{
						type: "name",
						title: "Verschlüsselung",
						content: "Wählen Sie eine Sicherheits-Verschlüsselungsart: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard) oder Automatisch (sowohl TKIP als auch AES). Es wird NICHT empfohlen, die TKIP-Verschlüsselung zu wählen, wenn der Router im 802.11n-Modus betrieben wird, denn TKIP wird von 802.11n nicht unterstützt."
					},{
						type: "name",
						title: "IP-Adresse des RADIUS-Servers",
						content: "Geben Sie hier die IP-Adresse des Authentifizierungsservers ein."
					},{
						type: "name",
						title: "RADIUS-Port",
						content: "Nummer des Ports, auf dem der RADIUS-Dienst läuft."
					},{
						type: "name",
						title: "RADIUS-Passwort",
						content: "Das Passwort, mit dem Sie sich am RADIUS-Server authentifizieren müssen."
					}]
				},{
					type: "name",
					title: "WEP",
					content: "Wählen Sie diese Option, um die Grundauthentifizierungsmethode zu aktivieren. Falls eines ihrer Geräte nur mit WEP(Wired Equivalen Privacy) arbeitet. Bei Aktivierung wird WPS nicht mehr ünterstützt.",
					children: [{
						type: "name",
						title: "Typ",
						content: "Wählen Sie einen Authentifizierungstyp für Ihr WLAN. Standardwert ist Automatisch, wodurch automatisch zwischen Offen und Shared-Key gewählt wird."
					},{
						type: "name",
						title: "WEP-Schlüsselformat",
						content: "Entweder ASCII oder Hexadezimal. ASCII erlaubt alle ASCII-Zeichen, während Hexadezimal nur Hexadezimalzeichen (0..9, a..f) unterstützt."
					},{
						type: "name",
						title: "Schlüssellänge",
						content: "Die Länge des WEP-Schlüssels.",
						children:[{
							type: "name",
							title: "64 Bit",
							content: "Benötigt 10 Hexadezimal- oder 5 ASCII-Zeichen."
						},{
							type: "name",
							title: "128 Bit",
							content: "Benötigt 26 Hexadezimal- oder 13 ASCII-Zeichen."
						}]
					},{
						type: "name",
						title: "Schlüssel",
						content: "Nummer des Ports, auf dem der RADIUS-Dienst läuft."
					}]
				}]
			},{
				type: "name",
				title: "Modus",
				content: "Wählen Sie einen Übertragungsmodus aus."
			},{
				type: "name",
				title: "Kanalbreite",
				content: "Die von Ihrem 5GHz-WLAN verwendete Bandbreite pro Kanal."
			},{
				type: "name",
				title: "Kanal",
				content: "Wählen Sie den zu verwendenden 5GHz-Kanal aus. Es wird empfohlen, die Standardeinstellung (Auto) beizubehalten, sofern keine anderen Gründe dagegensprechen."
			},{
				type: "name",
				title: "Sendeleistung",
				content: "Wählen Sie zwischen Hoch, Mittel oder Niedrig. Der Standardwert ist Hoch (empfohlen)."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		WIRELESS_60G: {	
			TITLE: "60 GHz WLAN",
			CONTENT: [{
				type: "name",
				title: "WLAN aktivieren",
				content: "Markieren Sie dieses Kontrollkästchen, um die 60-GHz-WLAN-Funkfrequenz zu aktivieren. Wenn es nicht markiert ist, wird die WPS-Funktion in diesem Frequenzband nicht unterstützt."
			},{
				type: "name",
				title: "WLAN-Name (SSID)",
				content: "Siekönnen die Standard-SSID belassen oder einen eigenen Namen vergeben (max. 32 Zeichen lang). Hier wird zwischen Groß- und Kleinschreibung unterschieden."
			},{
				type: "name",
				title: "WLAN verbergen",
				content: "Markieren Sie dieses Kontrollkästchen, um den Namen des 60-GHz-WLANs (SSID) aus der WLAN-Liste auszublenden. Wenn es markiert ist, wird die WPS-Funktion in diesem Frequenzband nicht unterstützt."
			},{
				type: "name",
				title: "Sicherheit",
				content: "Wählen Sie hier eine der folgenden Optionen:",
				children: [{
					type: "name",
					title: "Keine Sicherheit",
					content: "Hiermit deaktivieren Sie Ihre WLAN-Verschlüsselung. Es wird wärmstens empfohlen, Ihr WLAN nur verschlüsselt zu betreiben."
				},{
					type: "name",
					title: "WPA2-Persönlich",
					content: "Wählen Sie diese Option, um die standardmäßige Authentifizierungsmethode, basierend auf einem Pre-shared Key (PSK), auch Passphrase bezeichnet, zu aktivieren. Die Art der Verschlüsselung ist GCMP. Diese Option wird empfohlen. Wenn es gewählt ist, konfigurieren Sie Folgendes.",
					children: [{
						type: "name",
						title: "Passwort",
						content: "Geben Sie ein aus 8 bis 63 ASCII- oder 8 bis 64 Hexadezimal-Zeichen bestehendes Passwort ein."
					}]
				},{
					type: "name",
					title: "WPA2-Enterprise",
					content: "Wählen Sie diese Option, um die erweiterte Authentifizierungsmethode mit einem RADIUS (Remote Authentication Dial In User Service) -Server zu aktivieren. Die Art der Verschlüsselung ist GCMP. Wenn es markiert ist, wird die WPS-Funktion in diesem Frequenzband nicht unterstützt.",
					children: [{
						type: "name",
						title: "IP-Adresse des RADIUS-Servers",
						content: "Geben Sie hier die IP-Adresse des Authentifizierungsservers ein."
					},{
						type: "name",
						title: "RADIUS-Port",
						content: "Nummer des Ports, auf dem der RADIUS-Dienst läuft."
					},{
						type: "name",
						title: "RADIUS-Passwort",
						content: "Das Passwort, mit dem Sie sich am RADIUS-Server authentifizieren müssen."
					}]
				}]
			},{
				type: "name",
				title: "Kanal",
				content: "Wählen Sie einen Betriebskanal für das 60-GHz-WLAN. Es wird empfohlen, den Kanal auf „Automatisch“ stehen zu lassen, sofern Sie keine Probleme mit Interferenzen anderer WLANs haben."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		WPS: {	
			TITLE: "Router-PIN",
			CONTENT: [{
				type: "paragraph",
				content: "Sie können Ihre WLAN-Geräte unter Verwendung der WPS-PIN des Routers mit Ihrem WLAN verbinden."
			},{
				type: "name",
				title: "Router-PIN",
				content: "Erlauben, dass Geräte sich mittels Router-PIN-Eingabe mit Ihrem WLAN verbinden."
			},{
				type: "name",
				title: "PIN",
				content: "Die WPS-PIN des Routers. Die Standard-PIN kann auf dem Aufkleber auf dem Gerät gefunden werden. Klicken Sie Erzeugen, um eine neue PIN zu errechnen und Standard-PIN, um die Original-PIN wiederherzustellen."
			}]
		},

		WPS_WIZARD: {
			TITLE: "WPS-Assistent",
			CONTENT:[{
				type: "paragraph",
				content: "WPS unterstützt nur die folgende Konfiguration: aktiv<WLAN ist an>, deaktiviert <SSID versteckt> und die Sicherheit ist entweder auf <keine Sicherheit> oder <WPA/WPA2-Personal> (WPA2-PSK oder Auto + AES oder Auto) gesetzt."
			},{
				type: "name",
				title: "Push-Button-Methode",
				content: "Erlauben, dass Geräte sich mittels WPS-Tastendruck verbinden (empfohlen)."
			},{
				type: "name",
				title: "PIN",
				content: "Wählen Sie diese Methode, um ein Gerät mittels Eingabe von dessen PIN in den Router, gefolgt von einem Klick auf Verbinden, mit dem WLAN zu verbinden."
			}]
		},

		WIRELESS_STATISTICS: {	
			TITLE: "Verbundene WLAN-Geräte",
			CONTENT: [{
				type: "name",
				title: "lfd. Nr.",
				content: "Laufende Nummer des WLAN-Clients."
			},{
				type: "name",
				title: "MAC-Adresse",
				content: "Die MAC-Adresse des WLAN-Gerätes"
			},{
				type: "name",
				title: "Verbindungstyp",
				content: "Zeigt das WLAN-Frequenzband (2,4 GHz oder 5 GHz) des zugehörigen WLAN-Clients an."
			},{
				type: "name",
				title: "Sicherheit",
				content: "Vom WLAN-Client verwendeter Sicherheitstyp."
			},{
				type: "name",
				title: "Empfangene Pakete",
				content: "Anzahl der vom Gerät empfangenen IP-Pakete."
			},{
				type: "name",
				title: "Gesendete Pakete",
				content: "Anzahl der vom Gerät gesendeten IP-Pakete."
			},{
				type: "paragraph",
				content: "Klicken Sie Aktualisieren, um die Informationen neu zu laden."
			}]
		},
		
		GUEST_NETWORK_SETTINGS:{
			TITLE: "Einstellungen",
			CONTENT: [{
				type: "paragraph",
				content: "Errichten Sie ein Gast-WLAN, können Sie Ihre Gäste von Ihrem lokalen Netz fernhalten, indem diese einen anderen WLAN-Namen und ein anderes Passwort verwenden."
			},{
				type: "name",
				title: "Gäste dürfen einander sehen",
				content: "Aktivieren Sie dies, um alle Gastnetzteilnehmer einander sichtbar zu machen."
			},{
				type: "name",
				title: "Gäste dürfen auf mein lokales Netz zugreifen",
				content: "Gästen Zugriff auf lokale Ressourcen wie Netzfreigaben und Drucker gewähren."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		GUEST_NETWORK_WIRELESS:{	
			TITLE: "2,4-/5GHz-WLAN",
			CONTENT: [{
				type: "name",
				title: "Gastnetz aktivieren",
				content: "Aktivieren des Gastnetzes."
			},{
				type: "name",
				title: "WLAN-Name (SSID)",
				content: "Gast-WLAN-Name, kann frei gewählt werden (1 bis 32 Zeichen)."
			},{
				type: "name",
				title: "WLAN verbergen",
				content: "Hiermit können Sie Ihr Gast-WLAN unsichtbar machen."
			}/*,{
				type:"name",
				id:"pwd_mode",
				title:"Passwortaktualisierungsintervall",
				content:"Zeitabstand, in dem das Passwort Ihres Gast-WLANs erneuert wird."
			}*/,{
				type: "name",
				title: "Sicherheit",
				content: "Haben Sie entschieden, dass das Passwort nie erneuert wird, wählen Sie eine der folgenden Sicherheitsoptionen:",
				children: [{
					type: "name",
					title: "Keine Sicherheit",
					content: "Hiermit deaktivieren Sie Ihre WLAN-Verschlüsselung. Es wird wärmstens empfohlen, Ihr Gast-WLAN nur verschlüsselt zu betreiben."
				},{
					type: "name",
					title: "WPA/WPA2-Personal",
					content: "Aktivieren der Standardauthentifizierung basierend auf einem Passwort (PSK). Dies ist die Standard-Verschlüsselungsmethode in Heim-WLANs und umfasst folgende Parameter:",
					children: [{
						type: "name",
						title: "Version",
						content: "Sicherheitsversion Ihres Gast-WLANs.",
						children: [{
							type: "name",
							title: "Automatisch",
							content: "Wählt automatisch zwischen WPA und WPA2, je nach Fähigkeiten des Clientgerätes."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "Diese Option bietet ein gutes Maß an Sicherheit."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "Diese Option bietet eine höhere Sicherheitsstufe als WPA-PSK und wird deshalb empfohlen."
						}]
					},{
						type: "name",
						title: "Verschlüsselung",
						content: "Wählen Sie eine Sicherheits-Verschlüsselungsart: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard) oder Automatisch (sowohl TKIP als auch AES). Es wird NICHT empfohlen, die TKIP-Verschlüsselung zu wählen, wenn der Router im 802.11n-Modus betrieben wird, denn TKIP wird von 802.11n nicht unterstützt."
					}]
			}]},{
				type: "name",
				title: "Passwort",
				content: "Hier haben Sie die Möglichkeit, ein eigenes Passwort aus 8 bis 63 ASCII-Zeichen oder 8 bis 64 Hexadezimalzeichen zu erstellen."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},

		NAT: {
			TITLE: "Application Layer Gateway (ALG)",
			CONTENT: [{
				type: "paragraph",
				content: "ALG erlaubt benutzerdefinierte NAT(Network Address Translation)-Filter, die den Betrieb von Anwendungen wie FTP, TFTP, H323 usw. ermöglichen. Es wird empfohlen, das ALG zu benutzen."
			},{
				type: "name",
				title: "FTP-ALG aktivieren",
				content: "Wenn dies gewählt ist, können FTP-Clients (File Transfer Protocol) und Server Daten über NAT übertragen."
			},{
				type: "name",
				title: "TFTP-ALG aktivieren",
				content: "Wenn dies gewählt ist, können TFTP-Clients (Trivial File Transfer Protocol) und Server Daten über NAT übertragen."
			},{
				type: "name",
				title: "H323-ALG aktivieren",
				content: "Ermöglicht Microsoft NetMeeting im NAT-Betrieb."
			},{
				type: "name",
				title: "RTSP-ALG aktivieren",
				content: "Erlaubt Windows-Mediaplayer-Clients, mit Streaming-Servern zu kommunizieren."
			},{
				type: "name",
				title: "PPTP-Passthrough aktivieren",
				content: "Erlaubt die Tunnelung von Punkt-zu-Punkt-Sitzungen durch IP-Netze."
			},{
				type: "name",
				title: "L2TP-Passthrough aktivieren",
				content: "Erlaubt die Tunnelung von Layer-2-Punkt-zu-Punkt-Sitzungen durch IP-Netze."
			},{
				type: "name",
				title: "IPsec-Passthrough aktivieren",
				content: "Erlaubt die Tunnelung von IPsec(Internet Protocol security)-Verbindungen durch IP-Netze. IPsec verwendet eine starke Verschlüsselung, um Ihre Daten sicher durck IP-Netze zu transportieren."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},


		VIRTUAL_SERVERS: {
			TITLE: "Virtuelle Server",
			CONTENT: [{
				type: "paragraph",
				content: "Virtuelle Server werden verwendet, um Dienste aus dem lokalen Netz auch im Internet verfügbar zu machen. Bei der Konfiguration eines Virtuellen Servers geben Sie einen externen Port(bereich) und eine lokale IP-Adresse an. Verbindungsanfragen auf diesem Port werden dann an die angegebene lokale IP-Adresse weitergereicht. Naturgemäß muss diese IP-Adresse statisch sein (von Hand konfiguriert oder im DHCP-Server reserviert)."
			},{
				type: "name",
				title: "Dienstname",
				content: "Name des Virtuellen Servers."
			},{
				type: "name",
				title: "Externer Port",
				content: "Vom Virtuellen Server verwendeter Port(bereich)."
			},{
				type: "name",
				title: "Interne IP-Adresse",
				content: "Lokale IP-Adresse des Servers, auf dem der Dienst des Virtuellen Servers läuft."
			},{
				type: "name",
				title: "Interner Port",
				content: "Port, auf dem der Dienst des Virtuellen Servers läuft."
			},{
				type: "name",
				title: "Protokoll",
				content: "Das Protokoll, das der Dienst benutzt: TCP, UDP oder Alle (alle vom Router unterstützten Protokolle)."
			},{
				type: "name",
				title: "Status",
				content: "Aktueller Status der Regel (aktiviert oder deaktiviert)."
			},{
				type: "name",
				title: "Bearbeiten",
				content: "Hier haben Sie die Möglichkeit, einen Virtuellen Server zu Bearbeiten oder zu Löschen."
			},{
				type: "step",
				title: "Einrichten eines Virtuellen Servers",
				content: [
					"1. Klicken Sie Hinzufügen.",
					"2. Ist Ihre Applikation in der Drop-Down-Liste Gebräuchliche Dienste zu finden, wählen Sie sie dort aus. Dann werden die Felder Externer Port und Interner Port automatisch befüllt. Ansonsten tragen Sie die Portnummer(n) bitte selbst von Hand ein (Beispiel: 21-25). Lassen Sie das Feld Interner Port frei, wird der externe Port in dieses Feld übernommen. Geben Sie zum Schluss die IP-Adresse des Servers in das Feld Interne IP-Adresse ein.",
					"3. Wählen Sie das für Ihre Applikation zu verwendende Protokoll: TCP, UDP oder Alle.",
					"4. Wählen Sie als Status Aktivieren.",
					"5. Klicken Sie OK."
				]
			},{
				type: "step",
				title: "So bearbeiten/löschen Sie einen Virtuellen Server:",
				content: "Klicken Sie in der Tabelle Bearbeiten oder Löschen, um einen Eintrag zu bearbeiten oder zu löschen."
			},{
				type: "step",
				title: "Löschen mehrerer Virtueller Server:",
				content: "Wählen Sie alle zu löschenden Einträge aus und klicken Sie oberhalb der Tabelle Löschen."
			},{
				type: "note",
				title: "Hinweis",
				content: "Laufen auf Ihrem Server mehrere Dienste, die Sie über das Internet zugänglich machen wollen, benötigen Sie pro Dienst einen Eintrag in der Tabelle der Virtuellen Server."
			}]
		},

		PORT_TRIGGERING: {
			TITLE: "Port-Triggering",
			CONTENT: [{
				type: "paragraph",
				content: "Port Triggering wird verwendet, damit bestimmte Applikationen trotz Einsatzes eines NAT-Routers funktionieren."
			},{
				type: "name",
				title: "Applikation",
				content: "Name der Applikation."
			},{
				type: "name",
				title: "Triggerport",
				content: "Port, auf dem eine ausgehende Verbindung das Inkrafttreten der Triggerregel auslöst."
			},{
				type: "name",
				title: "Triggerprotokoll",
				content: "Das Protokoll, das auf dem Triggerport verwendet wird: TCP, UDP oder Alle (alle vom Router unterstützten Protokolle)."
			},{
				type: "name",
				title: "Externer Port",
				content: "Der Port(bereich), der durch die Regel für den Trigger-PC geöffnet werden soll. Sie können hier bis zu 5 Portgruppen angeben. Diese müssen durch Kommata getrennt werden. Beispiel: 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
			},{
				type: "name",
				title: "Externes Protokoll",
				content: "Das Protokoll, das die eingehenden Verbindungen verwenden dürfen: TCP, UDP oder Alle (alle vom Router unterstützten Protokolle)."
			},{
				type: "name",
				title: "Status",
				content: "Aktueller Status der Regel (aktiviert oder deaktiviert)."
			},{
				type: "name",
				title: "Bearbeiten",
				content: "Hier haben Sie die Möglichkeit, einen Porttriggering-Eintrag zu Bearbeiten oder zu Löschen."
			},{
				type: "step",
				title: "So richten Sie eine Porttriggeringregel ein:",
				content: [{
					type: "note",
					title: "Hinweis",
					content: "Hinweis: Jede Regel kann nur von einem LAN-Teilnehmer zugleich benutzt werden."
				},
					"1. Klicken Sie Hinzufügen.",
					"2. Klicken Sie Gebräuchliche Applikationen, um die Felder Applikation, Triggerport, Triggerprotokoll, Externer Port und Externes Protokoll automatisch auszufüllen oder füllen Sie sie von Hand aus.",
					"3. Wählen Sie als Status Aktivieren.",
					"4. Klicken Sie OK."
				]
			},{
				type: "step",
				title: "So bearbeiten/löschen Sie eine Porttriggeringregel:",
				content: "Klicken Sie in der Tabelle Bearbeiten oder Löschen, um einen Eintrag zu bearbeiten oder zu löschen."
			},{
				type: "step",
				title: "Löschen mehrerer Porttriggeringregeln:",
				content: "Wählen Sie alle zu löschenden Einträge aus und klicken Sie oberhalb der Tabelle Löschen."
			}]
		},

		DMZ: {
			TITLE: "DMZ",
			CONTENT: [{
				type: "paragraph",
				content: "Die Funktion DMZ(Demilitarisierte Zone)-Host macht ein Gerät in Ihrem lokalen Netz aus dem Internet komplett sichtbar. Dies ist hilfreich für Internetgaming oder Videokonferenzen. Naturgemäß muss diese IP-Adresse statisch sein (von Hand konfiguriert oder im DHCP-Server reserviert)."
			},{
				type: "step",
				title: "So machen Sie einen Computer zum DMZ-Server:",
				content: [
					"1. Klicken Sie DMZ aktivieren.",
					"2. In das Feld IP-Adresse des DMZ-Hosts geben Sie die IP-Adresse eines lokalen Computers ein.",
					"3. Klicken Sie Speichern."
				]
			}]
		},
		
		UPNP: {
			TITLE: "UPnP",
			CONTENT: [{
				type: "paragraph",
				content: "Standardmäßig ist Universal Plug-and-Play (UPnP) aktiviert, damit UPnP-Geräte ohne weitere Konfigurationsschritte miteinander kommunizieren können."
			},{
				type: "paragraph",
				content: "Die UPnP-Serviceliste zeigt Ihnen Informationen zu den aktiven UPnP-Geräten in Ihrem Netz."
			},{
				type: "name",
				title: "Dienstbeschreibung",
				content: "Kurze Beschreibung des Hosts, der die UPnP-Anfrage gestellt hat."
			},{
				type: "name",
				title: "Externer Port",
				content: "Externer, für den Host zu öffnender Port."
			},{
				type: "name",
				title: "Protokoll",
				content: "Das vom Host verwendete Protokoll."
			},{
				type: "name",
				title: "Interne IP-Adresse",
				content: "IP-Adresse des lokalen Gerätes."
			},{
				type: "name",
				title: "Interner Port",
				content: "Interner, für den Host zu öffnender Port."
			},{
				type: "paragraph",
				content: "Klicken Sie Aktualisieren, um die Ansicht neu zu laden."
			}]
		},
		
		DISK_SETTING: {	
			TITLE: "Geräteeinstellungen",
			CONTENT: [{
				type: "paragraph",
				content: "Auf der Seite Geräteeinstellungen sehen Sie Informationen zu am USB-Port angeschlossenen Geräten."
			},{
				type: "name",
				title: "Suchen",
				content: "Normalerweise findet der Router neu angeschlossene USB-Geräte automatisch. Mit dieser Schaltfläche können Sie angeschlossene USB-Geräte manuell erkennen lassen."
			},{
				type: "name",
				title: "Name",
				content: "Zeigt den Namen der Partition."
			},{
				type: "name",
				title: "Kapazität",
				content: "Gesamtkapazität des USB-Datenträgers"
			},{
				type: "name",
				title: "Freier Speicherplatz",
				content: "Aktuell verfügbarer Speicherplatz auf dem USB-Datenträger."
			},{
				type: "name",
				title: "Sicher entfernen",
				content: "Klicken Sie hier, bevor Sie das USB-Gerät physisch vom Router entfernen."
			},{
				type: "paragraph",
				content: "Die Schaltfläche Sicher entfernen erscheint nur, wenn ein USB-Datenträger an den Router angeschlossen ist. Ein Entfernen ist nicht möglich, solange das USB-Gerät in Verwendung ist."
			},{
				type: "name",
				title: "Status",
				content: "Diese Option erscheint nur, wenn ein USB-Datenträger an den Router angeschlossen ist. Aktiviert die Freigabe des USB-Geräts."
			},{
				type: "step",
				title: "Einrichtung eines Fileservers",
				content: [
				"1. Schließen Sie einen USB-Datenträger an Ihren Router an.",
				"2. Stellen Sie sicher, dass das Gerät unter Geräteeinstellungen aufgeführt wird.",
				"3. Wählen Sie Dateifreigabe aktivieren."
				]
			}]
		},
		
		FOLDER_SHARE_ACCOUNT: {	
			TITLE: "Freigeben für",
			CONTENT: [{
				type: "name",
				title: "Benutzerkonto",
				content: "Sie können entweder Standardaccount oder Neues Benutzerkonto wählen."
			},{
				type: "name",
				title: "Benutzername/Passwort",
				content: "Tragen Sie einen Benutzernamen aus 1-15 alphanumerischen Zeichen oder einer Zeichenkette aus 1-15 ASCII-Zeichen ein. Groß- und Kleinschreibung ist hier wichtig."
			},{
				type: "name",
				title: "Passwort bestätigen",
				content: "Geben Sie Ihr Passwort hier erneut ein, um Tippfehler auszuschließen."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		FOLDER_SHARE_SETTINGS: {
			TITLE: "Freigabeeinstellungen",
			CONTENT: [{
				type: "name",
				title: "Netz-/Mediaserver-Name",
				content: "Anzeigename des verbundenen USB-Laufwerks. Der Name muss aus alphanumerischen Zeichen, Unterstrichen oder Apostrophen bestehen und darf nur 4-15 Zeichen lang sein. "
			},{
				type: "name",
				title: "Aktivieren",
				content: "Zugriff zulassen."
			},{
				type: "name",
				title: "Zugriffsmethode",
				content: "Es existieren drei Möglichkeiten, auf den angeschlossenen USB-Datenträger zuzugreifen. Wählen Sie von diesen mindestens eine aus.",
				children: [{
					type: "name",
					title: "Samba/UNC",
					content: "Ist dies aktiviert, können Benutzer im Dateibrowser auf den angeschlossenen USB-Datenträger zugreifen, z.B. über \\\\192.168.0.1."
				},{
					type: "name",
					title: "FTP",
					content: "Ermöglicht den Zugriff über FTP (z.B. ftp://192.168.0.1)."
				},{
					type: "name",
					title: "FTP über Internet",
					content: "Ermöglicht den FTP-Zugriff vom Internet aus. Die Standard-Portnummer lautet 21. Hier haben Sie die Möglichkeit, die Portnummer zu ändern. Klicken Sie Speichern, um Ihre Änderungen zu übernehmen."
				}]
			},{
				type: "name",
				title: "Link",
				content: "Stellt einen Link zum Öffnen des Datenträgers zur Verfügung."
			},{
				type: "name",
				title: "Port",
				content: "Zeigt die Portnummer des FTP-Servers an. Nutzen Sie entweder den Standardport 21 oder einen Port von 1024-65535."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		FOLDER_SHARE_FOLDERS: {
			TITLE: "Ordnerfreigabe",
			CONTENT: [{
				type: "name",
				title: "Komplett freigeben",
				content: "Ermöglicht die Freigabe des ganzen USB-Datenträgers. Möchten Sie nur einzelne Ordner freigeben, deaktivieren Sie diese Option."
			},{
				type: "name",
				title: "Authentifizierung erfordern",
				content: "Es wird empfohlen, die Authentifizierung zu aktivieren, so dass jeder, der auf den Datenträger zugreifen möchte, Benutzernamen und Passwort braucht."
			},{
				type: "name",
				title: "Ordnername",
				content: "Name des freigegebenen Ordners."
			},{
				type: "name",
				title: "Ordnerpfad",
				content: "Der Pfad zu dem freigegebenen Ordner."
			},{
				type: "name",
				title: "Medienfreigabe",
				content: "Erlaubt dem Mediaserver die Verwendung dieses Ordners."
			},{
				type: "name",
				title: "Datenträgername",
				content: "Name des freigegebenen Datenträgers."
			},{
				type: "name",
				title: "Status",
				content: "Zeigt den Status des freigegebenen Ordners an."
			},{
				type: "name",
				title: "Bearbeiten",
				content: "Bearbeiten oder Löschen einer Freigabe."
			},{
				type: "name",
				title: "Durchsuchen",
				content: "Klicken Sie hier, um einen freizugebenden Ordner herauszusuchen."
			},{
				type: "name",
				title: "Zugriff aus dem Gastnetz erlauben",
				content: "Bestimmt, ob die Teilnehmer Ihres Gastnetzes Zugriff auf die Freigabe bekommen."
			},{
				type: "name",
				title: "Authentifizierung erfordern",
				content: "Ist dies aktiviert, müssen Benutzer einen Namen und ein Passwort eingeben, um Zugriff auf die freigegebenen Ordner zu erhalten (empfohlen)."
			},{
				type: "name",
				title: "Schreibzugriff",
				content: "Erlaubt dem Benutzer das Verändern von Datenträgerinhalten."
			},{
				type: "name",
				title: "Medienfreigabe",
				content: "Erlaubt dem Mediaserver die Verwendung dieses Ordners."
			},{
				type: "name",
				title:"Neu laden",
				content: "Aktualisiert die Anzeige der freigegebenen Ordner."
			}]
		},
		
		PRINT_SERVER: {	
			TITLE: "Printserver",
			CONTENT: [{
				type: "name",
				title:"Printserver",
				content: "Aktivieren/Deaktivieren der Printserverfunktion."
			},{
				type: "name",
				title:"Druckername",
				content: "Name des angeschlossenen Druckers."
			}]
		},
		
		OFFLINE_DOWNLOAD: {	
			TITLE: "Offline herunterladen",
			CONTENT: [{
				type: "name",
				title:"Status",
				content: "Schalten Sie dies EIN, um die Offline-Download-Funktion zu aktivieren."
			},{
				type: "name",
				title:"Ordnerpfad",
				content: "Arbeitsverzeichnis der Offline-Download-Funktion. Nachdem die Status-Schaltfläche eingeschaltet wurde, müssen Sie einen Verzeichnispfad wählen, andernfalls bleibt die Tabelle der Elemente in Betrieb unsichtbar, was bedeutet, dass Sie nichts weiter machen können. Nachdem das Arbeitsverzeichnis festgelegt wurde, werden alle von folgenden Operationen erzeugten Dateien im Verzeichnis gespeichert oder zwischengespeichert. Sollten aktive Elemente vorhanden sein, kann das Arbeitsverzeichnis nicht geändert werden, und es wird empfohlen, den USB-Speicher nicht abzustecken, da dies zu unwiderruflichem Datenverlust führen kann."
			},{
				type: "name",
				title:"Zeitplan",
				content: "Wenn dies ausgewählt ist, können Sie die Download-Zeiträume festlegen. Der Zeitplan basiert auf der Systemzeit des Routers, die unter „System Tools (Systemtools) > Uhrzeiteinstellungen“ eingestellt werden kann."
			},{
				type: "name",
				title:"auch nach Abschluss des Downloads",
				content: "Wenn dies ausgewählt ist, fährt eine beendete Aufgabe mit dem Seeding fort."
			},{
				type: "name",
				title: "Maximale Anzahl der aktiven Aufgaben",
				content: "Zeigt die maximale Anzahl der aktiven Aufgaben an."
			},{
				type: "name",
				title:"Maximale Downloadgeschwindigkeit",
				content: "Zeigt die maximale Download-Geschwindigkeit an."
			},{
				type: "name",
				title:"Maximale Uploadgeschwindigkeit",
				content: "Zeigt die Mindest-Upload-Geschwindigkeit an."
			},{
				type: "name",
				title: "Anzahl der Verbindungen",
				content: "Zeigt die Verbindungseinstellungen an."
			},{
				type: "name",
				title: "Globale maximale Anzahl der Verbindungen",
				content: "Ändern, um die maximale Anzahl der Verbindungen aller Aufgaben zu begrenzen."
			},{
				type: "name",
				title: "Maximale Anzahl der verbundenen Peers pro Torrent",
				content: "Ändern, um die maximale Anzahl der verbundenen Peers pro Aufgabe zu begrenzen."
			},{
				type: "name",
				title: "DHT-Netzwerk aktivieren",
				content: "Wenn ausgewählt, ist DHT aktiviert."
			},{
				type: "name",
				title: "Peer-Exchange aktivieren",
				content: "Wenn ausgewählt, ist der Peer-Informationsaustausch aktiviert."
			},{
				type: "name",
				title: "BitTorrent-Protokollverschlüsselung aktivieren",
				content: "Wenn ausgewählt, ist die BitTorrent-Protokollverschlüsselung aktiviert."
			},{
				type: "name",
				title:"aMule-Server",
				content: "Geben Sie IP-Adresse und Port eines zu verbindenden aMule-Servers ein."
			}]
		},
		
		OFFLINE_DOWNLOAD_ITEMS: {
			TITLE: "Elemente",
			CONTENT: [{
				type: "paragraph",
				content: "Zeigt die Download-Elemente an."
			},{
				type: "name",
				title: "Datei",
				content: "Zeigt den Namen der Download-Datei an."
			},{
				type: "name",
				title:"Geschwindigkeit",
				content: "Zeigt Upload- und Download-Geschwindigkeit an."
			},{
				type: "name",
				title: "Abgeschlossen",
				content: "Zeigt abgeschlossene Größe und Gesamtgröße an."
			},{
				type: "name",
				title:"Restzeit",
				content: "Zeigt die verbleibende Zeit an, bis der Download abgeschlossen ist."
			},{
				type: "name",
				title:"Verbundene Peers",
				content: "Zeigt die Informationen der verbundenen Peers an."
			},{
				type: "name",
				title: "Status",
				content: "Zeigt den Status der Aufgabe an."
			},{
				type: "name",
				title: "Quelle",
				content: "Zeigt den Downloadtyp an."
			},{
				type: "step",
				title: "Hinzufügen eines Download-Elements",
				content: [
					"1. Klicken Sie Hinzufügen.",
					"2. Download-Quelltyp auswählen:",
					"1) Torrent vom PC: Klicken Sie auf Durchsuchen, um eine Torrent-Datei von Ihrem PC auszuwählen.",
					"2) Torrent von USB: Wählen Sie ein Laufwerk und klicken Sie auf Durchsuchen, um eine Torrent-Datei von USB auszuwählen.",
					"3) URL: Geben Sie die URL ein (HTTP, HTTPS, FTP, ed2k).",
					"3. Klicken Sie auf OK."
				]
			}]
		},
		
		PARENTAL_CONTROL: {	
			TITLE: "Kindersicherung",
			CONTENT: [{
				type: "paragraph",
				content: "Die Kindersicherung erlaubt Ihnen, den Internetzugang bestimmter Geräte (z.B. des PCs Ihres Kindes) nach Webadresse und nach Uhrzeit einzuschränken."
			},{
				type: "name",
				title: "Kindersicherung",
				content: "Aktivieren der Kindersicherung (standardmäßig deaktiviert)."
			}]
		},
		
		PARENTAL_CONTROL_DEVICES: {
			TITLE: "Der Kindersicherung unterliegende Geräte",
			CONTENT: [{
				type: "paragraph",
				content: "Listet die von der Kindersicherung betroffenen Geräte auf."
			},{
				type: "name",
				title: "Gerätename",
				content: "Namen der von der Kindersicherung betroffenen Clientgeräte."
			},{
				type: "name",
				title: "MAC-Adresse",
				content: "MAC-Adressen aller Geräte, für die die Kindersicherung gilt."
			},{
				type: "name",
				title: "Internetzugriffszeit",
				content: "Zeitrahmen, für den die Kindersicherung gilt. Basiert auf der Router-Systemzeit, die unter \"System-Tools -> Zeiteinstellungen\" konfiguriert werden kann."
			},{
				type: "name",
				title: "Beschreibung",
				content: "Kurze Beschreibung des Gerätes."
			},{
				type: "name",
				title: "Status",
				content: "Aktueller Status (aktiviert oder deaktiviert) der Kindersicherungsregel für dieses Gerät."
			},{
				type: "name",
				title: "Bearbeiten",
				content: "Bearbeiten oder Löschen eines Geräteeintrags."
			},{
				type: "step",
				title: "So sperren Sie den Internetzugang für ein neues Gerät:",
				content: [
					"1. Klicken Sie Hinzufügen.",
					"2. Klicken Sie Existierende Geräte anzeigen und wählen Sie aus der Liste der verbundenen Geräte das zu konfigurierende heraus. Oder Sie geben den Gerätenamen und die MAC-Adresse von Hand ein.",
					"3. Klicken Sie Internetzugriffszeitfenster, um die Zeit des Internetzugriffs einzuschränken.",
					"4. Vergeben Sie eine kurze Beschreibung (optional).",
					"5. Klicken Sie Aktivieren.",
					"6. Klicken Sie OK, um den neuen Eintrag zu speichern."
				]
			},{
				type: "paragraph",
				content: "Klicken Sie in der Tabelle Bearbeiten oder Löschen, um einen Eintrag zu bearbeiten oder zu löschen."
			},{
				type: "paragraph",
				content: "Um mehrere Einträge zu löschen, wählen Sie diese aus und klicken Sie über der Tabelle auf Löschen."
			}]
		},
		
		PARENTAL_CONTROL_RESTRICTION: {
			TITLE: "Contentbeschränkung",
			CONTENT: [{
				type: "name",
				title: "Blacklist",
				content: "Webseiten mit den eingegebenen Schlüsselwörtern in der Adresse werden von in der Kindersicherungsliste enthaltenen Geräten nicht geladen.",
				children: [{
					type: "paragraph",
					content: "Klicken Sie Schlüsselwort hinzufügen, um ein Schlüsselwort zur Blacklist hinzuzufügen. Um eines zu löschen, klicken Sie für dieses Schlüsselwort (-)."
				}]
			},{
				type: "name",
				title: "Whitelist",
				content: "Nur Webseiten, deren Adresse eines der angegebenen Schlüsselwörter enthält, sind für die in der Kindersicherungsliste enthaltenen Geräte zugänglich.",
				children: [{
					type: "paragraph",
					content: "Klicken Sie Neuen Domänennamen hinzufügen, um eine neue Domäne zur Whitelist hinzuzufügen. Um eine zu löschen, klicken Sie für diese Domäne (-)."
				}]
			},{
				type: "note",
				title: "Hinweis",
				content: "Schlüsselworte können auch Domänennamen, so wie mail.google.com oder www.facebook.com sein."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Konfiguration zu speichern."
			}]
		},
		
		
		QOS: {
			TITLE: "QoS",
			CONTENT: [{
				type: "paragraph",
				content: "Quality of Service (QoS) priorisiert den Internetdatenverkehr laut Ihren Vorgaben. Sie können die Priorität nach Gerät oder Applikation steuern lassen."
			},{
				type: "name",
				title: "QoS aktivieren",
				content: "Hiermit aktivieren Sie QoS."				
			},{
				type: "name",
				title: "Uploaddatenrate",
				content: "Geben Sie hier die maximal mögliche Uploadgeschwindigkeit Ihrer Leitung ein."				
			},{
				type: "name",
				title: "Downloaddatenrate",
				content: "Geben Sie hier die maximal mögliche Downloadgeschwindigkeit Ihrer Leitung ein."
			},{
				type: "name",
				title: "Hohe Priorität",
				content: "Geben Sie hier einen relativen Anteil für Datenverkehr hoher Priorität an."
			},{
				type: "name",
				title: "Mittlere Priorität",
				content: "Geben Sie hier einen relativen Anteil für Datenverkehr mittlerer Priorität an."
			},{
				type: "name",
				title: "Niedrige Priorität",
				content: "Geben Sie hier einen relativen Anteil für Datenverkehr niedriger Priorität an."
			},{
				type: "note",
				title: "Hinweis",
				content: "Die Summe aller Prioritäten darf nicht größer als 1 sein"
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		QOS_RULE: {
			TITLE: "QoS-Regelliste",
			CONTENT: [{
				type: "name",
				title: "Typ",
				content: "Wählen Sie einen Typ aus, den Sie zur QoS-Regelliste hinzufügen möchten."
			},{
				type: "step",
				title: "So richten Sie eine gerätebezogene Regel für hohe/mittlere/niedrige Priorität ein:",
				content: [
					"1. Klicken Sie Hinzufügen.",
					"2. Wählen Sie Gerätebezogen.",
					"3. Klicken Sie Existierende Geräte anzeigen, um Ihr Gerät aus der Liste der Zugriffsgeräte aus oder geben Sie ein Kombination aus Gerätenamen und MAC-Adresse von Hand ein.",
					"4. Klicken Sie OK."
				]
			},{
				type: "step",
				title: "So richten Sie eine anwendungsbezogene Regel für hohe/mittlere/niedrige Priorität ein:",
				content: [
					"1. Klicken Sie Hinzufügen.",
					"2. Wählen Sie Anwendungsbezogen.",
					"3. Wählen Sie die gewünschte Anwendung aus der Applikationsliste aus oder geben Sie Namen, Protokoll und Zielport (1..65535) in die entsprechenden Felder ein. Sie können einen einzelnen Port oder einen Portbereich eingeben. Trennen Sie diese mittels Kommata voneinander. Beispiel: 21,36-105,111.",
					"4. Klicken Sie OK."
				]
			},{
				type: "step",
				title: "So richten Sie eine portbezogene Regel für hohe/mittlere/niedrige Priorität ein:",
				content: [
					"1. Klicken Sie Hinzufügen.",
					"2. Wählen Sie Portbezogen.",
					"3. Wählen Sie den gewünschten Port aus.",
					"4. Klicken Sie OK."
				]
			}]
		},
		
		
		QOS_DATABASE: {
			TITLE: "Datenbank-Upgrade",
			CONTENT: [{
				type: "name",
				title: "Datei mit der neuen Datenbank",
				content: "Klicken Sie Durchsuchen, um die Datei auszuwählen. Klicken Sie Upgrade, um den Vorgang zu starten."
			},{
				type: "name",
				title: "Datenbankversion",
				content: "Zeigt die aktuell installierte Version der Datenbank an."
			}]
		},
		
		
		
		SECURITY_FIREWALL: {	
			TITLE: "Firewall",
			CONTENT: [{
				type: "name",
				title: "SPI-Firewall",
				content: "Die SPI-Firewall verhindert bestimmte Angriffe, indem Sie den Inhalt der eingehenden Pakete untersucht."
			}]
		},
		
		SECURITY_DOS: {
			TITLE: "DoS-Schutz",
			CONTENT: [{
				type: "name",
				title: "DoS-Schutz",
				content: "Der DoS-Schutz schützt Ihr lokales Netz vor massenhaften unsinnigen Serveranfragen."
			},{
				type: "name",
				title: "Filterung von ICMP-FLOOD-Angriffen",
				content: "Schützt vor Angriffen über das Internet Control Message Protocol (ICMP).",
				children: [{
					type: "name",
					title: "Aus",
					content: "Kein Schutz."
				},{
					type: "name",
					title: "Niedrig",
					content: "Geringer Schutz, geringer Einfluss auf die Router-Performance."
				},{
					type: "name",
					title: "Mittel",
					content: "Moderater Schutz, eventuell merklicher Einfluss auf die Router-Performance."
				},{
					type: "name",
					title: "Hoch",
					content: "Hoher Schutz, merklicher Einfluss auf die Router-Performance."
				}]
			},{
				type: "name",
				title: "Filterung von UDP-FLOOD-Angriffen",
				content: "Schützt vor Angriffen über das User Datagram Protocol (UDP)."
			},{
				type: "name",
				title: "Filterung von TCP-SYN-FLOOD-Angriffen",
				content: "Schützt vor Angriffen über das Transmission Control Protocol-Synchronize (TCP-SYN)."
			},{
				type: "name",
				title: "Ping-Pakete auf den WAN-Port ignorieren",
				content: "Beantwortet Echo-Anfragen auf den WAN-Port nicht."
			},{
				type: "name",
				title: "Ping-Pakete auf LAN-Ports ignorieren",
				content: "Beantwortet Echo-Anfragen auf die LAN-Ports nicht."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		SECURITY_LIST: {
			TITLE: "Liste blockierter DoS-Hosts",
			CONTENT: [{
				type: "name",
				title: "Liste blockierter DoS-Hosts",
				content: "Liste der IP- und MAC-Adressen, die aufgrund von DoS-Angriffen negativ aufgefallen sind und blockiert wurden."
			},{
				type: "step",
				title: "Löschen eines Eintrags",
				content: "Wählen Sie in der Hostliste den zu löschenden Eintrag aus und klicken Sie über der Tabelle Löschen."
			}]
		},
		
		ACCESS_CONTROL: {	
			TITLE: "Zugriffskontrolle",
			CONTENT: [{
				type: "paragraph",
				content: "Die Kindersicherung dient dazu, bestimmte Zugriffe zu unterbinden."
			},{
				type: "paragraph",
				content: "Um die Zugriffskontrolle zu benutzen, aktivieren Sie sie und geben Sie an, ob Sie black- oder whitelisten möchten. Ist die Zugriffskontrolle deaktiviert, können auch geblacklistete Geräte das Netz nutzen."
			}]
		},
		
		ACCESS_MODE: {
			TITLE: "Zugriffsmodus",
			CONTENT: [{
				type: "name",
				title: "Blacklist",
				content: "Bis auf die gelisteten Geräte können alle Geräte das Netz nutzen."
			},{
				type: "name",
				title: "Whitelist",
				content: "Nur die gelisteten Geräte haben Zugriff auf Ihr Netz."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		ACCESS_DEVICE: {
			TITLE: "Geräte online",
			CONTENT: [{
				type: "name",
				title: "Gerätename",
				content: "Name des verbundenen Gerätes."
			},{
				type: "name",
				title: "IP-Adresse",
				content: "IP-Adresse des verbundenen Gerätes."
			},{
				type: "name",
				title: "MAC-Adresse",
				content: "MAC-Adresse des verbundenen Gerätes."
			},{
				type: "name",
				title: "Verbindungstyp",
				content: "Verbindungstyp des verbundenen Gerätes."
			},{
				type: "step",
				title: "Blockieren eines Gerätes",
				content: "In der Tabelle Geräte online klicken Sie in der richtigen Zeile auf Blockieren in der Spalte Bearbeiten."
			},{
				type: "step",
				title: "Blockieren mehrerer Geräte",
				content: "Wählen Sie in der Tabelle „Online-Geräte“ alle Geräte, die Sie blockieren möchten und klicken Sie auf „Blockieren“ oberhalb der Tabelle. Das Gerät wird automatisch zu den Geräten in der Blacklist hinzugefügt."
			}],
		},
		
		ACCESS_LIST: {
			TITLE: "Geräte in Blacklist/Whitelist",
			CONTENT: [{
				type: "step",
				title: "So blacklisten/whitelisten Sie ein Gerät:",
				content: [
					"1. Klicken Sie Hinzufügen.",
					"2. Geben Sie den Gerätenamen ein.",
					"3. Geben Sie die MAC-Adresse des Gerätes ein.",
					"4. Klicken Sie OK."
				]
			},{
				type: "step",
				title: "Bearbeiten oder Löschen eines Eintrages",
				content: "Klicken Sie in der Blacklist/Whitelist Bearbeiten oder Löschen, um einen Eintrag zu bearbeiten oder zu löschen."
			},{
				type: "step",
				title: "Bearbeiten oder Löschen mehrerer Einträge",
				content: "Wählen Sie in der Tabelle Blacklist/Whitelist alle zu löschenden Geräte aus und klicken Sie über der Tabelle Löschen."
			}]
		},
		
		
		IPMAC_BIND_SETTING: {	
			TITLE: "Einstellungen",
			CONTENT: [{
				type: "paragraph",
				content: "Eine ARP(Address Resolution Protocol)-Bindung ist hilfreich bei der Zugriffskontrolle eines bestimmten Computers, wenn Sie dessen IP- und MAC-Adresse fest miteinander assoziieren wollen. ARP-Binding verhindert, dass andere Geräte die angegebene IP-Adresse benutzen."
			}]
		},
		
		IPMAC_BIND_ARP: {	
			TITLE: "ARP-Liste",
			CONTENT: [{
				type: "paragraph",
				content: "Zeigt die MAC- und IP-Adressen der aktuell angeschlossenen Geräte an."
			},{
				type: "name",
				title: "Anzahl ARP-Einträge",
				content: "Die Gesamtanzahl der aktuell mit dem Router verbundenen Geräte."
			},{
				type: "name",
				title: "MAC-Adresse",
				content: "MAC-Adresse des verbundenen Gerätes."
			},{
				type: "name",
				title: "IP-Adresse",
				content: "Die IP-Adresse, die dem Gerät zugewiesen ist."
			},{
				type: "name",
				title: "Gebunden",
				content: "Zeigt an, ob die Kombination aus MAC- und IP-Adresse gebunden ist."
			},{
				type: "name",
				title: "Bearbeiten",
				content: "Hier finden Sie Optionen, um eine Kombination zu Binden oder zu Löschen."
			},{
				type: "note",
				title: "Hinweis",
				content: "Ein und die selbe IP-Adresse kann nicht gleichzeitig mehreren MAC-Adressen zugeordnet sein."
			}]
		},
		
		IPMAC_BIND_LIST: {	
			TITLE: "Bindungsliste",
			CONTENT: [{
				type: "step",
				title: "So richten Sie eine ARP-Bindung ein:",
				content: [
					"1. Klicken Sie Hinzufügen.",
					"2. Geben Sie die MAC-Adresse des Gerätes ein.",
					"3. Geben Sie eine mit diesem Gerät zu assoziierende IP-Adresse ein.",
					"4. Vergeben Sie eine Beschreibung für das Gerät (optional).",
					"5. Klicken Sie Aktivieren.",
					"6. Klicken Sie OK."
				]
			},{
				type: "step",
				title: "So bearbeiten oder löschen Sie einen Eintrag:",
				content: "Klicken Sie in der Liste der Bindungen für den entsprechenden Eintrag Bearbeiten oder Löschen."
			},{
				type: "step",
				title: "Löschen mehrerer Einträge:",
				content: "Wählen Sie aus der List der Bindungen alle zu löschenden Einträge aus und klicken Sie dann über der Tabelle Löschen."
			}]
		},
		
		IPV6: {
			TITLE: "Internet",
			CONTENT: [{
				type: "name",
				title: "IPv6",
				content: "Aktivieren oder Deaktivieren der IPv6-Unterstützung durch den Router."
			},{
				type: "title",
				title: "Internetverbindungstyp: Statische IP-Adresse",
			},{
				type: "name",
				title: "Statische IP-Adresse",
				content: "Wählen Sie dies aus, wenn Ihr Internetdiensteanbieter statische IPv6-Konfigurationen bereitstellt."
			},{
				type: "name",
				title: "IPv6-Adresse/Standardgateway/Haupt-DNS-Server/Backup-DNS-Server",
				content: "Geben Sie hier die Informationen ein, die Ihnen Ihr Internetdiensteanbieter gegeben hat."
			},{
				type: "name",
				title: "MTU-Größe",
				content: "Ein typischer Wert für die MTU(Maximum Transmission Unit)-Größe von Ethernet-Anwendungen ist 1500 Byte. Wir empfehlen, diese nicht zu ändern, es sei denn, Sie wurden angewiesen, dies zu tun."
			},{
				type: "title",
				title: "Internetverbindungstyp: Dynamische IP-Adresse",
			},{
				type: "name",
				title: "Dynamische IP-Adresse",
				content: "Wählen Sie dies aus, wenn Ihr Internetdiensteanbieter dynamische IPv6-Konfigurationen bereitstellt."
			},{
				type: "name",
				title: "IPv6-Adresse/Haupt-DNS-Server/Backup-DNS-Server",
				content: "Diese Informationen werden vom DHCPv6-Server Ihres Internetdiensteanbieters automatisch gesetzt."
			},{
				type: "name",
				title: "Erneuern",
				content: "Klicken Sie hier, um Ihre IP-Konfiguration zu erneuern."
			},{
				type: "name",
				title: "Freigeben",
				content: "Klicken Sie hier, um Ihre aktuelle IP-Konfiguration zurückzugeben."
			},{
				type: "name",
				title: "Abruf meiner IPv6-Adresse",
				content: "Wählen Sie DHCPv6, um eine nicht-temporäre IPv6-Adresse zu erhalten oder SLAAC, um eine IPv6-Adresse aus dem Router-Advertisement-Paket zu generieren."
			},{
				type: "name",
				title: "Präfix-Delegation",
				content: "Aktivieren Sie dies, um eine Präfixdelegation vom DHCPv6-Server Ihres Internetdiensteanbieters zu erhalten. Deaktivieren Sie dies, um ein Adresspräfix von Hand einzugeben. Mit diesem Präfix erzeugen lokale Clients ihre IPv6-Adressen."
			},{
				type: "name",
				title: "DNS-Serveradresse",
				content: "Wählen Sie Dynamisch vom Anbieter beziehen oder Folgende DNS-Serveradresse verwenden. Benutzen Sie zweitere Option, geben Sie die DNS-Serveradressen bitte von Hand ein."
			},{
				type: "name",
				title: "Haupt-DNS-Server/Backup-DNS-Server",
				content: "Geben Sie diese Parameter von Hand ein oder lassen Sie den Router sie automatisch von Ihrem Anbieter abrufen."
			},{
				type: "title",
				title: "Internetverbindungstyp: PPPoE"
			},{
				type: "name",
				title: "PPPoE",
				content: "Wählen Sie dies aus, wenn Sie DSL haben und hierfür einen Benutzernamen und ein Passwort von Ihrem Internetdiensteanbieter bekommen haben."
			},{
				type: "name",
				title: "Benutzername/Passwort",
				content: "Geben Sie hier die Anmeldeinformationen von Ihrem Internetdiensteanbieter ein. Hierbei wird zwischen Groß- und Kleinschreibung unterschieden."
			},{
				type: "name",
				title: "IPv6-Adresse",
				content: "Diese wird automatisch eingestellt, nachdem Sie die Einwahldaten korrekt hinterlegt haben und die Verbindung hergestellt wurde."
			},{
				type: "name",
				title: "DNS-Serveradresse",
				content: "Wählen Sie Dynamisch vom Anbieter beziehen oder Folgende DNS-Serveradresse verwenden. Benutzen Sie zweitere Option, geben Sie die DNS-Serveradressen bitte von Hand ein."
			},{
				type: "name",
				title: "Abruf meiner IPv6-Adresse",
				content: "Wählen Sie DHCPv6, um eine nicht-temporäre IPv6-Adresse zu erhalten oder SLAAC, um eine IPv6-Adresse aus dem Router-Advertisement-Paket zu generieren oder Vom ISP vorgegeben, um die von Ihrem Internetdiensteanbieter vorgegebene IPv6-Adresse von Hand einzutragen."
			},{
				type: "name",
				title: "Präfix-Delegation",
				content: "Aktivieren Sie dies, um eine Präfixdelegation vom DHCPv6-Server Ihres Internetdiensteanbieters zu erhalten. Deaktivieren Sie dies, um ein Adresspräfix von Hand einzugeben. Mit diesem Präfix erzeugen lokale Clients ihre IPv6-Adressen."
			},{
				type: "name",
				title: "Verbinden",
				content: "Herstellen einer Internetverbindung."
			},{
				type: "name",
				title: "Trennen",
				content: "Trennen der Internetverbindung."
			},{
				type: "title",
				title: "Internetverbindungytyp: 6to4-Tunnel"
			},{
				type: "name",
				title: "6to4-Tunnel",
				content: "Wählen Sie dies aus, wenn Ihr Internetdiensteanbeter für die Adresszuweisung 6to4-Deployment verwendet."
			},{
				type: "name",
				title: "IPv4-Adresse/IPv4-Subnetzmaske/IPv4-Standardgateway/Tunneladresse",
				content: "Diese Parameter werden dynamisch erzeugt, wenn Sie Verbinden klicken."
			},{
				type: "name",
				title: "Folgende DNS-Serveradressen benutzen",
				content: "Wählen Sie dies aus, um Haupt- (und optional Backup-)DNS-Server von Hand anzugeben."
			},{
				type: "name",
				title: "Verbinden",
				content: "Herstellen einer Internetverbindung."
			},{
				type: "name",
				title: "Trennen",
				content: "Trennen der Internetverbindung."
			}/*,{
				type: "title",
				title: "Internetverbindungstyp: 6RD"
			},{
				type: "name",
				title: "6RD",
				content: "Wählen Sie dies aus, wenn Ihr Internetdiensteanbieter 6RD-Deployment verwendet und Ihnen eine IPv4-Adresse und ein IPv6-Adressenpräfix gegeben hat."
			},{
				type: "name",
				title: "Konfigurationstyp",
				content: "Wählen Sie Automatisch oder Manuell für die Konfiguration der 6RD-Channelparameter gemäß den Angaben Ihres Internetdiensteanbieters. Widersprechen die untenstehenden Standardwerte den Vorgaben Ihres Internetdiensteanbieters, versuchen Sie Automatisch oder setzen Sie sie von Hand, nachdem Sie Manuell gewählt haben."
			},{
				type: "name",
				title: "IPv4-Maskenlänge/6RD-Präfix/6RD-Präfixlänge/Border-Reply-IPv4-Adresse",
				content: "Überprüfen Sie, ob diese voreingestellten Parameter mit den Vorgaben Ihres Internetdiensteanbieters übereinstimmen und korrigieren Sie sie gegebenenfalls."
			},{
				type: "title",
				title: "Internetverbindungstyp: DS-Lite"
			},{
				type: "name",
				title: "DS-Lite",
				content: "Wählen Sie dies, wenn Ihr Internetdiensteanbieter DS-Lite-Deployment benutzt und Ihnen einen AFTR-Domänennamen oder eine IPv6-Adresse gegeben hat, um einen IPv4-in-IPv6-Tunnel im IPv6-Netz zur Übertragung von IPv4- oder IPv6-Traffic einzurichten."
			},{
				type: "name",
				title: "AFTR-Name",
				content: "Geben Sie hier den AFTR(Address Family Transition Router)-Domänennamen oder die IPv6-Adresse ein, wie von Ihrem Internetdiensteanbieter vorgegeben."
			},{
				type: "name",
				title: "Zweitverbindung",
				content: "Typ der Zweitverbindung, wie von Ihrem Internetdiensteanbieter vorgegeben.",
				children :[ 
				{
					type: "name",
					title: "Dynamische IP-Adresse",
					content: "Wählen Sie dies, wenn Ihr Internetdiensteanbieter eine Zweitverbindung vom Typ Dynamische IP-Adresse anbietet und die Parameter IPv6-Adresse und DNS-Server automatisch von Ihrem Internetdiensteanbieter zugeteilt werden."
				},
				{
					type: "name",
					title: "Statische IP-Adresse",
					content: "Wählen Sie dies aus, wenn Ihr Internetdiensteanbieter eine Zweitverbindung mit statischer IP-ADresse anbietet. Geben Sie in diesem Fall IPv6-Adresse, Standardgateway und DNS-Serveradressen so ein, wie von Ihrem Internetdiensteanbieter vorgegeben."
				},{
					type: "name",
					title: "PPPoE",
					content: "Wählen Sie dies aus, wenn Sie einen Benutzernamen und ein Passwort von Ihrem Internetdiensteanbieter bekommen haben. Die IPv6-Adresse wird nach erfolgter Einwahl automatisch zugewiesen."
				}]
			}*/,{
				type: "title",
				title: "Internetverbindungstyp: Passthrough (Bridge)"
			},{
				type: "paragraph",
				content: "Wählen Sie dies, wenn Ihr Internetdiensteanbieter Passthrough(Bridge)-Netzdeployment verwendet. Für diesen Verbindungstyp bedarf es keinerkei Parameter."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		IPV6_LAN: {
			TITLE: "LAN",
			CONTENT: [{
				type: "paragraph",
				content: "Außer Passthrough (Bridge) verlangt jeder Internetverbindungstyp eine IP-Konfiguration."
			},{
				type: "name",
				title: "Zugewiesener Typ",
				content: "Wählen Sie hier den von Ihrem Internetdiensteanbieter vorgegebenen Typ aus.",
				children: [{
					type: "name",
					title: "DHCPv6",
					content: "Weist Geräten im lokalen Netz automatisch IPv6-Adressen zu.",
					children: [{
						type: "name",
						title: "Adresspräfix",
						content: "Geben Sie hier das von Ihrem Internetdiensteanbieter vorgegebene Präfix an."
					},{
						type: "name",
						title: "Adresshaltezeit",
						content: "Die Zeitdauer, für die ein DHCP-Client seine Konfiguration behalten darf (in Sekunden, Standardwert: 86400)."
					},{
						type: "name",
						title: "Adresse",
						content: "Die vom Internetdiensteanbieter automatisch zugewiesene IPv6-Adresse."
					}]
				},{
					type: "name",
					title: "SLAAC + Zustandsloses DHCP",
					connector:" ",
					children: [{
						type: "name",
						title: "Adresspräfix",
						content: "Geben Sie hier das von Ihrem Internetdiensteanbieter vorgegebene Präfix an."
					},{
						type: "name",
						title: "Adresse",
						content: "Die von Ihrem Internetdiensteanbieter automatisch zugewiesene IP-Adresse."
					}]
				},{
					type: "name",
					title: "SLAAC + RDNSS",
					connector:" ",
					children: [{
						type: "name",
						title: "Adresspräfix",
						content: "Geben Sie hier das von Ihrem Internetdiensteanbieter vorgegebene Präfix an."
					},{
						type: "name",
						title: "Adresse",
						content: "Die von Ihrem Internetdiensteanbieter automatisch zugewiesene IP-Adresse."
					}]
				}]
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		IPV6_MAC_CLONE: {
			TITLE: "MAC-Adresse klonen",
			CONTENT: [{
				type: "name",
				title: "Standard-MAC-Adresse benutzen",
				content: "Standard-MAC-Adresse des Routers wiederherstellen."
			},{
				type: "name",
				title: "MAC-Adresse des Computers verwenden",
				content: "Hiermit kopieren Sie die MAC-Adresse Ihres Computers. Sinnvoll, wenn Ihr Computer bisher direkt an das Internet angeschlossen war (ohne Router) und Ihr Internetdiensteanbieter sich diese MAC-Adresse gemerkt hat."
			},{
				type: "name",
				title: "Benutzerdefinierte MAC-Adresse",
				content: "Geben Sie die gewünschte MAC-Adresse von Hand ein."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		TIME_SETTING: {	
			TITLE: "Zeiteinstellungen",
			CONTENT: [{
				type: "step",
				title: "So lassen Sie die Routerzeit automatisch einstellen:",
				content: [
					"1. Im Feld Uhrzeit setzen wählen Sie Uhrzeit automatisch aus dem Internet abrufen.",
					"2. Wählen Sie die an Ihrem Standort gültige Zeitzone aus der Drop-Down-Liste.",
					"3. Geben Sie in das Feld NTP-Server I die Adresse eines NTP-Servers ein.",
					"4. Geben Sie in das Feld NTP-Server II die Adresse eines weiteren NTP-Servers ein (optional).",
					"5. Klicken Sie Abrufen.",
					"6. Klicken Sie Speichern."
				]
			},{
				type: "step",
				title: "So setzen Sie die Routerzeit von Hand:",
				content: [
					"1. Im Feld Uhrzeit setzen wählen Sie Manuell.",
					"2. Geben Sie das aktuelle Datum ein.",
					"3. Geben Sie die aktuelle Uhrzeit (im 24-Stunden-Format) ein.",
					"4. Klicken Sie Speichern."
				]
			}]
		},
		
		TIME_SETTING_DAYLIGHT: {	
			TITLE: "Sommerzeit",
			CONTENT: [{
				type: "step",
				title: "So konfigurieren Sie die Sommerzeit:",
				content: [
					"1. Aktivieren Sie Sommerzeit verwenden.",
					"2. Wählen Sie Startdatum und -uhrzeit der Sommerzeit.",
					"3. Wählen Sie Enddatum und -uhrzeit der Sommerzeit.",
					"4. Klicken Sie Speichern."
				]
			}]
		},
		DIGNOSTIC: {	
			TITLE: "Diagnose",
			CONTENT: [{
				type: "paragraph",
				content: "Ihr Router verfügt über ein Ping- und ein Traceroute-Diagnosetool zur Erkennung von Verbindungsproblemen. Das Ping-Tool schickt Pakete an das angegebene Ziel und wertet die Antwortpakete aus hinsichtlich Erfolgsquote und Antwortzeit. Das Traceroute-Tool schickt Pakete an das angegebene Ziel und zeigt IP-Adresse und Antwortzeit der Zwischenschritte an."
			},{
				type: "paragraph",
				content: "Ziele von Ping und Traceroute können mittels IP-Adresse oder Domänenname angegeben werden."
			},{
				type: "step",
				title: "Diagnose mittels Ping",
				content: [
					"1. Geben Sie IP-Adresse oder Hostname des Ziels ein.",
					"2. (optional) Klicken Sie auf den Pfeil, um das Erweiterte Menü zu öffnen und Anzahl und Größe der Ping-Pakete zu bestimmen.",
					"3. Klicken Sie Start."
				]
			},{
				type: "step",
				title: "Diagnose mittels Traceroute",
				content: [
					"1. Geben Sie IP-Adresse oder Hostname des Ziels ein.",
					"2. (optional) Klicken Sie auf den Pfeil, um das Erweiterte Menü zu öffnen und die maximale Anzahl Hops (to be reached) in das Feld Traceroute-TTL (Time to Live) ein. Standardwert: 20.",
					"3. Klicken Sie Start."
				]
			}]
		},
		FIRMWARE: {	
			TITLE: "Firmware-Upgrade",
			CONTENT: [{
				type: "paragraph",
				content: "Bevor Sie ein Upgrade durchführen, müssen Sie die aktuelle Firmware von der  <a class=\"link\" href=\"javascript:void(0);\" id=\"update_url\" target=\"_blank\">TP-LINK Support</a> Website herunterladen."
			},{
				type: "step",
				title: "WICHTIG! Um Schäden beim Upgrade zu vermeiden, beachten Sie:",
				content: [
					"Die Firmwaredatei muss zur Hardwareversion Ihres Routers passen (auf der Downloadseite angegeben).",
					"Stellen Sie sicher, dass die Verbindung zu Ihrem Router stabil ist. Führen Sie das Firmwareupgrade nicht über eine Drahtlosverbindung durch.",
					"Entfernen Sie vor dem Upgrade ein eventuell an den Router angeschlossenes USB-Gerät, um Datenverluste zu vermeiden.",
					"Sichern Sie Ihre Routerkonfiguration.",
					"Trennen Sie den Router während des Firmwareupgrades nicht von der Versorgungsspannung."
				]
			},{
				type: "step",
				title: "Upgrade der Routerfirmware",
				content: [
					"1. Klicken Sie Durchsuchen.",
					"2. Wählen Sie die Firmwaredatei aus.",
					"3. Klicken Sie Upgrade."
				]
			},{
				type: "paragraph",
				content: "Das Upgrade dauert einige Minuten. Schalten Sie Ihren Router in dieser Zeit bitte NICHT ab."
			}]
		},
		
		BACKUP: {	
			TITLE: "Sichern",
			CONTENT: [{
				type: "paragraph",
				content: "Es wird empfohlen, Ihre fertige Routerkonfiguration zu speichern, damit Sie Ihren Router schnell wieder einsatzbereit haben, sollte dieser einmal zurückgesetzt oder ausgetauscht werden."
			},{
				type: "paragraph",
				content: "Klicken Sie Sichern, um Ihre Routerkonfiguration in einer Datei auf Ihrem Computer zu speichern. Bewahren Sie die Datei an einem sicheren Ort auf."
			}]
		},
		
		RESTORE: {
			TITLE: "Wiederherstellen",
			CONTENT: [{
				type: "step",
				title: "So stellen Sie eine gesicherte Routerkonfiguration wieder her:",
				content: [
					"1. Klicken Sie Durchsuchen.",
					"2. Wählen Sie die Konfigurationsdatei aus.",
					"3. Klicken Sie Wiederherstellen."
				]
			}]
		},
		
		FACTORY: {
			TITLE: "Wiederherstellen der Standardeinstellungen",
			CONTENT: [{
				type: "paragraph",
				content: "Klicken Sie Wiederherstellen, um Ihren Router auf Werkseinstellungen zurückzusetzen."
			},{
				type: "step",
				title: "Hinweis",
				content: [
					"1. Beim Zurücksetzen Ihres Geräts gehen prinzipbedingt alle Einstellungen verloren. Loggen Sie sich anschließend mit admin als Benutzername und Passwort ein.",
					"2. Schalten Sie beim Speichern oder Wiederherstellen den Router nicht aus."
				]
			}]
		},
		
		
		ADMIN_ACCOUNT: {	
			TITLE: "Benutzerkonto",
			CONTENT: [{
				type: "paragraph",
				content: "Auf dieser Seite können Sie die Zugangsdaten zur Weboberfläche Ihres Routers ändern sowie eine E-Mail-Adresse hinterlegen, um sich das Passwort zusenden zu lassen, sollten Sie es einmal vergessen haben."
			},{
				type: "name",
				title: "Alter Benutzername",
				content: "Geben Sie hier den aktuell gültigen Benutzernamen ein."
			},{
				type: "name",
				title: "Altes Passwort",
				content: "Geben Sie hier das aktuell gültige Passwort ein."
			},{
				type: "name",
				title: "Neuer Benutzername",
				content: "Geben Sie hier den neuen Benutzernamen ein."
			},{
				type: "name",
				title: "Neues Passwort",
				content: "Geben Sie hier das neue Passwort ein."
			},{
				type: "name",
				title: "Neues Passwort bestätigen",
				content: "Geben Sie hier erneut das neue Passwort ein."
			},{
				type: "note",
				title: "Hinweis",
				content: "Ändern Sie die Zugangsdaten, stellen Sie sicher, dass Sie diese nicht vergessen."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		ADMIN_RECOVERY: {
			TITLE: "Passwortwiederherstellung",
			CONTENT: [{
				type: "name",
				title: "Passwortwiederherstellung aktivieren",
				content: "Es wird wärmstens empfohlen, die Passwortwiederherstellung zu aktivieren, damit Sie mit dieser Benutzernamen und Passwort per E-Mail zurücksetzen können."
			},{
				type: "name",
				title: "Von",
				content: "Geben Sie hier eine gültige Absender-E-Mail-Adresse ein."
			},{
				type: "name",
				title: "An",
				content: "Geben Sie hier die E-Mail-Adresse ein, an die Sie Ihr Passwort verschicken lassen möchten."
			},{
				type: "name",
				title: "SMTP-Server",
				content: "Geben Sie die Adresse des SMTP-Servers ein, über den der Router den Überprüfungscode schickt."
			},{
				type: "name",
				title: "Authentifizierung erfordern",
				content: "Wählen Sie dies aus, wenn Ihr SMTP-Server zum E-Mail-Schicken eine Authentifizierung verlangt (sehr gebräuchlich). Geben Sie hierzu Benutzernamen und Passwort ein. Achten Sie auf Groß- und Kleinschreibung."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		ADMIN_LOCAL: {	
			TITLE: "Lokale Verwaltung",
			CONTENT: [{
				type: "paragraph",
				content: "Hier können Sie die Geräte, die Zugriff auf die Weboberfläche haben sollen, anhand Ihrer MAC-Adressen beschränken."
			},{
				type: "name",
				title: "Zugriff für alle LAN-Geräte",
				content: "Allen Geräten im lokalen Netz Zugriff auf die Weboberfläche gewähren. Ist dies deaktiviert, müssen Sie mindestens ein Gerät zulassen, um sich nicht selbst auszusperren."
			},{
				type: "name",
				title: "MAC-Adresse",
				content: "Die MAC-Adresse des konfigurierten Gerätes."
			},{
				type: "name",
				title: "Beschreibung",
				content: "Eine Beschreibung des Gerätes."
			},{
				type: "name",
				title: "Status",
				content: "Gibt an, ob das Gerät zugelassen oder gesperrt ist."
			},{
				type: "name",
				title: "Bearbeiten",
				content: "Hier haben Sie die Möglichkeit, Einträge zu Bearbeiten und zu Löschen."
			},{
				type: "step",
				title: "So fügen Sie ein neues Gerät zur Liste hinzu:",
				content: [
					"1. Klicken Sie Hinzufügen.",
					"2. Klicken Sie Existierende Geräte, um eines auszuwählen oder spezifizieren Sie das Gerät durch manuelle Eingabe der MAC-Adresse.",
					"3. Vergeben Sie eine Beschreibung.",
					"4. Wählen Sie als Status Aktivieren.",
					"5. Klicken Sie OK."
				]
			},{
				type: "step",
				title: "So bearbeiten oder löschen Sie ein in der Liste befindliches Gerät:",
				content: "Klicken Sie in der Tabelle Bearbeiten oder Löschen, um einen Eintrag zu bearbeiten oder zu löschen."
			},{
				type: "step",
				title: "Löschen mehrerer Geräte",
				content: "Wählen Sie alle zu löschenden Geräte aus und klicken Sie dann auf Löschen."
			}]
		},
		ADMIN_REMOTE: {	
			TITLE: "Fernwartung",
			CONTENT: [{
				type: "paragraph",
				content: "Mittels Fernwartung können Sie auch über das Internet die Weboberfläche Ihres Routers erreichen."
			},{
				type: "name",
				title: "Fernwartung deaktivieren",
				content: "Hiermit deaktivieren Sie die Fernwartung."
			},{
				type: "name",
				title: "Fernwartung für alle Geräte zulassen",
				content: "Diese Option erlaubt die Fernwartung von allen IP-Adressen. Wenn aktiviert, muss auch das Feld Portnummer für Fernwartung ausgefüllt sein."
			},{
				type: "name",
				title: "Fernwartung nur für spezifizierte Geräte zulassen",
				content: "Diese Option erlaubt die Fernwartung nur von den angegebenen IP-Adressen. Wenn aktiviert, muss auch das Feld Portnummer für Fernwartung ausgefüllt sein."
			},{
				type: "name",
				title: "Portnummer für Fernwartung",
				content: "Geben Sie eine Portnummer aus dem Bereich von 1024 bis 65535 ein. Über diese ist die Weboberfläche des Routers dann erreichbar. Normalerweise verwenden Webbrowser den Standard-HTTP-Port 80. Alternativ verwendet HTTP auch den Port 8080."
			},{
				type: "name",
				title: "IP-Adresse für Fernwartung",
				content: "Tragen Sie eine gültige IP-Adresse ein, die Ihnen den Zugang zum Router ermöglicht."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		
		SYSTEM_LOG: {	
			TITLE: "Systemprotokoll",
			CONTENT: [{
				type: "paragraph",
				content: "Die Seite Systemprotokoll zeigt eine Protokollierung der letzten Routeraktivitäten (oder Ereignisse). Sie können definieren, welche Arten von Vorkommnissen angezeigt werden sollen. Sie können Sich das Protokoll auch regelmäßig per E-Mail zuschicken oder auf Ihren Computer exportieren lassen."
			},{
				type: "name",
				title: "Typ",
				content: "Angezeigten Typ der Einträge definieren."
			},{
				type: "name",
				title: "Ebene",
				content: "Angezeigte Wichtigkeit der Einträge definieren."
			},{
				type: "name",
				title: "Neu laden",
				content: "Protokollansicht neu laden."
			},{
				type: "name",
				title: "Protokoll löschen",
				content: "Protokoll löschen."
			},{
				type: "name",
				title: "Protokoll speichern",
				content: "Protokoll als Textdatei auf Ihren Computer herunterladen."
			},{
				type: "name",
				title: "E-Mail-Einstellungen",
				content: "Einstellungen zum Verschicken des Protokolls per E-Mail tätigen."
			},{
				type: "step",
				title: "So konfigurieren Sie die E-Mail-Einstellungen für das Systemprotokoll",
				content: [
					"1. Klicken Sie E-Mail-Einstellungen.",
					"2. Von - Geben Sie hier eine gültige Absender-E-Mail-Adresse ein.",
					"3. An - Geben Sie hier eine gültige Empfänger-E-Mail-Adresse ein.",
					"4. SMTP-Server - Die Adresse des SMTP-Servers, über den der Router das Protokoll verschicken soll.",
					{
						content: "5. Authentifizierung aktivieren - Wählen Sie dies aus, wenn Ihr SMTP-Server Authentifizierung verlangt.",
						children: [{
							type: "name",
							title: "Benutzername",
							content: "Benutzername am SMTP-Server. Achten Sie auf korrekte Groß- und Kleinschreibung."
						},{
							type: "name",
							title: "Passwort",
							content: "Zugehöriges Passwort am SMTP-Server. Achten Sie auf korrekte Groß- und Kleinschreibung."
						}]
					},{
						content: "6. Auto-Mail aktivieren - Versendet das Systemprotokoll automatisch zur angegebenen Uhrzeit.",
						children: [{
							type: "paragraph",
							content: "Um das Systemprotokoll zu einer bestimmten Uhrzeit verschicken zu lassen, verwenden Sie das 24-Stunden-Format HH:MM (für 4 Uhr nachmittags geben Sie 16:00 ein)."
						},{
							type: "paragraph",
							content: "Um das Systemprotokoll in einem bestimmten Intervall verschicken zu lassen, geben Sie dieses in Stunden ein."
						}]
					},
					"7. Klicken Sie Speichern."
				]
			}]
		},

		TRAFFIC_STATISTIC: {	
			TITLE: "Trafficstatistiken",
			CONTENT: [{
				type: "paragraph",
				content: "Die Trafficstatistiken zeigen Ihnen eine Übersicht über den LAN-, WAN- und WLAN-Datenverkehr."
			},{
				type: "name",
				title: "Trafficstatistiken",
				content: "Ein-/Ausschalten der Statistiken."
			}]
		},
		TRAFFIC_STATISTIC_LIST: {	
			TITLE: "Trafficstatistikenliste",
			CONTENT: [{
				type: "name",
				title: "IP-/MAC-Adresse",
				content: "Zeigt IP- und MAC-Adressen der verbundenen Geräte an."
			},{
				type: "name",
				title: "Pakete insgesamt",
				content: "Gesamtzahl der durch dieses Gerät übertragenen Pakete."
			},{
				type: "name",
				title: "Byte insgesamt",
				content: "Durch dieses Gerät übertragene Gesamtdatenmenge."
			},{
				type: "name",
				title: "Pakete aktuell",
				content: "Anzahl der im letzten Zeitintervall durch dieses Gerät übertragenen Pakete."
			},{
				type: "name",
				title: "Byte aktuell",
				content: "Im letzten Zeitintervall durch dieses Gerät übertragene Datenmenge."
			},{
				type: "name",
				title: "Bearbeiten",  
				content: "Optionen zum Rücksetzen (auf null) und Löschen der Statistikdaten zu diesem Gerät."
			},{
				type: "name",
				title: "Neu laden",
				content: "Statistikenseite neu laden."
			},{
				type: "name",
				title: "Alle zurücksetzen",
				content: "Alle Statistikdaten auf null setzen."
			},{
				type: "name",
				title: "Protokoll löschen",
				content: "Alle Statistikdaten löschen."
			}]
		},
		
		SYSTEM_PARA_WIRELESS: {	
			TITLE: "2,4-GHz-/5-GHz-WLAN",
			CONTENT: [{
				type: "name",
				title: "Ortungsintervall",
				content: "Geben Sie einen Wert von 40 bis 1000 (Millisek.) ein. Ortungspakete werden vom Router zur Synchronisierung des WLANs ausgesendet. Standardwert ist 100."
			},{
				type: "name",
				title: "RTS-Grenzwert",
				content: "Hier können Sie den RTS(Request to Send)-Grenzwert angeben. Ist ein Paket größer als dieser Wert, sendet der Router RTS-Frames zu einer bestimmten WLAN-Geräten, um den Versand eines Datenframes abzustimmen. Standardwert: 2346."
			},{
				type: "name",
				title: "DTIM-Intervall",
				content: "Dieser Wert bezeichnet die Intervalllänge zwischen zwei aufeinanderfolgenden Delivery Traffic Indication Messages (DTIMs). Ein DTIM-Feld ist ein Countdown, der die Clients des nächsten Fensters anweist, auf Broadcasts und Multicasts zu hören. Hat der Router Broadcasts oder Multicasts für verbundene Clients gepuffert, sendet er den nächsten DTIM. Sie können diese Dauer in Ortungsintervallen (1..15) angeben. Standard ist 1, d.h. das DTIM-Intervall ist genauso lang wie ein Ortungsintervall."
			},{
				type: "name",
				title: "Gruppenschlüsselaktualisierungsintervall",
				content: "Geben Sie die Dauer des Gruppenschlüsselaktualisierungsintervalls in Sekunden an. Dieser Wert muss 0 (=deaktiviert) oder mindestens 30 betragen."
			},{
				type: "name",
				title: "Multiuser-MIMO",
				content: "Diese Technik erlaubt es dem Router, Punktverbindung zu bis zu 3 Geräten aufzubauen. Es verbessert sowohl die Geschwindigkeit, als auch die Wartezeiten im Vergleich zu einem klassischen Netzwerk, da der Router gleichzeitig mehrere Clients handhaben kann, während der Flaschenhals Bandbreite nicht an Relevanz gewinnt."
			},{
				type: "name",
				title: "WMM aktivieren",
				content: "WMM garantiert, dass Nachrichten hoher Priorität bevorzugt übertragen werden. Es wird wärmstens empfohlen, diese Option aktiviert zu lassen"
			},{
				type: "name",
				title: "Short-GI aktivieren",
				content: "Die Verwendung dieser Funktion wird empfohlen, da sie die Übertragungskapazitäten auf Kosten der Schutzintervallzeit vergrößert."
			},{
				type: "name",
				title: "AP-Isolierung aktivieren",
				content: "Sollen Ihre WLAN-Geräte keinen Zugriff aufeinander haben, aktivieren Sie dies."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		SYSTEM_PARA_WDS: {	
			TITLE: "2,4 GHz/5 GHz WDS",
			CONTENT: [{
				type: "name",
				title: "WDS-Bridging aktivieren",
				content: "Hiermit können Sie WDS(Wireless Distribution System)-Bridge aktivieren. Damit kann der Router mittels Bridging mehrere WLANs miteinander verbinden. Ist die Option gewählt, müssen diese Felder ausgefüllt werden:",
			},{
				type: "name",
				title: "zu bridgende SSID",
				content: "SSID des WLANs, zu dem der Router sich als Client verbinden soll. Dieses Feld kann auch mittels der Suchfunktion automatisch befüllt werden."
			},{
				type: "name",
				title: "Suchen",
				content: "Klicken Sie hier, um SSID, BSSID, Signalstärke, Kanal und Sicherheitsinformationen der WLANs in Ihrer Umgebung anzeigen zu lassen. Klicken Sie dann eines davon an, werden die Felder SSID, MAC-Adresse und Sicherheit automatisch ausgefüllt."
			},{
				type: "name",
				title: "zu bridgende MAC-Adresse",
				content: "Geben Sie die MAC-Adresse (BSSID) des WLAN-Zugangspunkts (AP), zu dem der Router als Client verbinden wird, in 12 hexadezimalen Zeichen (0–9, a–f, A–F), getrennt durch Bindestriche, ein. Wenn Sie den gewünschten AP durch die Suchfunktion wählen, wird das Feld der MAC-Adresse automatisch ausgefüllt."
			},{
				type: "name",
				title: "WDS-Modus",
				content: "Wählen Sie den WDS-Modus aus: Auto, WDS1 oder WDS2."
			},{
				type: "name",
				title: "Sicherheit",
				content: "Der Sicherheitstyp des zu verbindenden WLANs: Keine, WPA-PSK/WPA2-PSK oder WEP. Haben Sie das zu verbindende WLAN angeklickt, wird dieses Feld automatisch ausgefüllt.",
				children: [{
					type: "name",
					title: "Passwort",
					content: "Das WLAN-Passwort im Fall, dass Sie WPA-PSK/WPA2-PSK oder WEP benutzen."
				},{
					type: "name",
					title: "Authentifizierungstyp",
					content: "Diese Option ist nur verfügbar, wenn Sie WEP (Wired Equivalent Privacy) verwenden. Wählen Sie zwischen Automatisch, Offen und Shared-Key."
				},{
					type: "name",
					title: "WEP-Schlüsselformat",
					content: "Diese Option ist nur verüfgbar, wenn Sie WEP verwenden. Wählen Sie zwischen ASCII und Hexadezimal."
				}]
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		SYSTEM_PARA_WPS: {	
			TITLE: "WPS",
			CONTENT: [{
				type: "paragraph",
				content: "Aktivieren Sie WPS, sofern Sie WPS (Wi-FI Protected Setup) verwenden möchten, um WPS-fähige Geräte ganz einfach auf Tastendruck in Ihr Netz bringen zu können."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		SYSTEM_PARA_NAT: {
			TITLE: "NAT",
			CONTENT: [{
				type: "name",
				title: "NAT",
				content: "Aktivieren Sie NAT, um NAT (Network Address Translation) zu aktivieren."
			},{
				type: "note",
				title: "Hinweis",
				content: "Ist NAT deaktiviert, funktionieren die definierten NAT-Weiterleitungsregeln nicht."
			}/*,{
				type: "name",
				title: "NAT-Boost",
				content: "Aktivieren Sie NAT-Boost, um Ihrem Router den bestmöglichen NAT-Durchsatz zu erlauben."
			},{
				type: "note",
				title: "Hinweis",
				content: "Hinweis: Ist NAT-Boost aktiviert, funktionieren die Funktionen QoS und Trafficstatistiken nicht."
			}*/,{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		SYSTEM_PARA_DOS: {
			TITLE: "Einstellung des DoS-Schutzlevels",
			CONTENT: [{
				type: "paragraph",
				content: "Der DoS-Schutz schützt Ihr lokales Netz vor massenhaften ICMP-, UDP- und TCP-Anfragen."
			},{
				type: "name",
				title: "Grenzwert für ICMP-FLOOD-Pakete",
				content: "Überschreitet die aktuelle Zahl der ICMP-FLOOD-Pakete diesen Wert, blockiert der Router alle weiteren sofort. Gültige Werte sind 5 bis 7200."
			},{
				type: "name",
				title: "Grenzwert für UDP-FLOOD-Pakete",
				content: "Überschreitet die aktuelle Zahl der UDP-FLOOD-Pakete diesen Wert, blockiert der Router alle weiteren sofort. Gültige Werte sind 5 bis 7200."
			},{
				type: "name",
				title: "Grenzwert für TCP-FLOOD-Pakete",
				content: "Überschreitet die aktuelle Zahl der TCP-SYN-FLOOD-Pakete diesen Wert, blockiert der Router alle weiteren sofort. Gültige Werte sind 5 bis 7200."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		SYSTEM_PARA_DUPLEX: {
			TITLE: "Duplex",
			CONTENT: [{
				type: "name",
				title: "Duplex",
				content: "Wählen Sie aus der Drop-Down-Liste den Duplextyp aus."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		SYSTEM_PARA_LED:{
			TITLE: "LED",
			CONTENT: [{
				type: "name",
				title: "Nachtmodus aktivieren",
				content: "Router-LEDs zu Beginn der Nachtzeit abschalten, die sonstigen Funktionen werden nicht beeinflusst."
			},{
				type: "name",
				title: "Nachtzeit",
				content: "Zeitraum, der als Nachtzeit gilt."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Änderungen zu übernehmen."
			}]
		},
		OPEN_VPN:{
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "paragraph",
				content: "Mit OpenVPN können Sie über das Internet sicher auf Ihr Netzwerk daheim zugreifen, wenn Sie nicht zu Hause sind. Um den VPN-Dienst zu nutzen, müssen Sie den Dynamic DNS Service konfigurieren (empfohlen) oder dem WAN-Port Ihres Routers eine statische IP-Adresse zuweisen. Außerdem sollte Ihre Systemzeit mit dem Internet synchronisiert sein."
			},{
				type: "name",
				title: "VPN-Server aktivieren",
				content: "Wählen Sie dies, um den OpenVPN-Server zu aktivieren."
			},{
				type: "name",
				title: "Dienstname",
				content: "OpenVPN-Kommunikationsprotokoll auswählen: UDP oder TCP."
			},{
				type: "name",
				title: "Dienstport",
				content: "Geben Sie eine Kommunikations-Portnummer zwischen 1024 und 65535 ein. Normalerweise ist der Standard-Serviceport 1194."
			},{
 				type: "name",
				title: " VPN-Subnetz/Netzmaske",
				content: "Geben Sie den Bereich von IP-Adressen ein, die an die Clients durch den OpenVPN-Server verliehen werden können."
			},{
				type: "name",
				title: "Clientzugriff",
				content: "Zugriffstyp Ihres OpenVPN-Clients.",
				children: [{
				type: "name",
				title: "Nur Heimnetz",
					content: "Die Clients können nur auf das Heimnetzwerk zugreifen. Die Standardroute des Clients wird nicht geändert."
			},{
				type: "name",
				title: "Internet und Heimnetz",
					content: "Die Clients können auf das Heimnetzwerk sowie auf Internet-Websites oder Dienste mit einer geographischen Beschränkung zugreifen, wenn Sie sich außer Landes befinden. Die Standardroute des Clients wird verändert."
				}]
			}]
		},
		OPEN_VPN_CERTIFICATE:{
			TITLE: "Zertifikat",
			CONTENT: [{
				type: "paragraph",
				content: "Verwenden Sie das Zertifikat für die Daten und Identität der VPN-Verbindung für Remote-Clients."
			},{
				type: "name",
				title: "Erzeugen",
				content: "Klicken Sie zum Erstellen eines neuen Zertifikats."
			}]
		},
		OPEN_VPN_CONF:{
			TITLE: "Konfigurationsdatei",
			CONTENT: [{
				type: "paragraph",
				content: "Remote-Clients verwenden die Konfigurationsdatei, um auf Ihren Router zuzugreifen."
			},{
				type: "name",
				title: "Exportieren",
				content: "Klicken Sie, um die OpenVPN-Konfigurationsdatei zu speichern."
			}]
		},
		OPEN_VPN_GUIDE:{
			TITLE: "VPN-Clientinstallationsanleitung",
			CONTENT: [{
				type: "step",
				title: "Verbinden Ihrer Clientgeräte mit dem OpenVPN-Server:",
				content:[{
					type: "paragraph",
					content: "Bevor Sie den OpenVPN-Server konfigurieren, konfigurieren Sie bitte Dynamisches DNS (empfohlen) oder weisen Sie dem WAN-Port eine statische IP-Adresse zu. Vergewissern Sie sich außerdem, dass der externe Port Ihrer NAT-Einstellungen nicht der Service-Port ist, und dass Ihre Systemzeit mit dem Internet synchronisiert ist."
				},
					"1. Wählen Sie VPN-Server aktivieren",
					"2. Konfigurieren Sie die OpenVPN-Serverparameter (Servicetyp, Service-Port, Client-Zugang und VPN-Subnetz/Netzmaske) und klicken Sie auf Speichern.",
					"3. Klicken Sie auf „Exportieren“, um die Konfigurationsdatei zu speichern.",
					"4. Downloaden Sie das OpenVPN-Client-Dienstprogramm von <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> und installieren Sie es auf Ihren Clientgeräten. Zu den offiziell unterstützten Plattformen gehören Windows, MacOS X und Linux.",
					"5. Starten Sie das OpenVPN-Client-Dienstprogramm und fügen Sie eine neue VPN-Verbindung unter Verwendung der gespeicherten Konfigurationsdatei hinzu, um Ihr Clientgerät mit dem VPN-Server zu verbinden."
				]},{
					type: "note",
					title: "Hinweis",
					content: "Um weitere Einzelheiten über OpenVPN-Clients zu erfahren, besuchen Sie <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
				}]
		},
		PPTP_VPN:{
			TITLE: "PPTP-VPN",
			CONTENT: [{
				type: "paragraph",
				content: "Mit PPTP VPN können Sie einfach und schnell über das Internet auf Ihr Netzwerk daheim zugreifen, wenn Sie nicht zu Hause sind. Einige Internetanbieter lassen dies nicht zu. Um den VPN-Dienst zu nutzen, müssen Sie den Dynamic DNS Service konfigurieren (empfohlen) oder dem WAN-Port Ihres Routers eine statische IP-Adresse zuweisen. Außerdem sollte Ihre Systemzeit mit dem Internet synchronisiert sein."
			},{
				type: "name",
				title: "VPN-Server aktivieren",
				content: "Wählen Sie dies, um den PPTP-VPN-Server zu aktivieren."
			},{
				type: "name",
				title: "Client-IP-Adresse",
				content: "Definieren Sie einen IP-Adresspool aus bis zu 10 Adressen, die den Clients vom PPTP-VPN-Server zugewiesen werden können."
			},{
 				type: "name",
				title: "Samba (Netzwerkumgebung) -Zugriff gestatten",
				content: "Wählen Sie dies, um Ihrem VPN-Client den Zugriff auf Ihren lokalen Samba-Server zu gestatten."
			},{
				type: "name",
				title: "NetBIOS-Passthrough erlauben",
				content: "Wählen Sie dies, um Ihrem VPN-Client den Zugriff auf Ihren Samba-Server mit einem NetBIOS-Namen zu gestatten."
			},{
				type: "name",
				title: "Unverschlüsselte Verbindungen zulassen",
				content: "Wählen Sie dies, um unverschlüsselte Verbindungen zu Ihrem VPN-Server zuzulassen."
			}]
		},
		PPTP_ACCOUNT_LIST:{
			TITLE: "Kontoliste",
			CONTENT: [{
				type: "paragraph",
				content: "In dieser Tabelle sind die Konten aufgelistet, die verwendet werden können, um sich durch Remote-Clients mit dem PPTP-VPN-Server zu verbinden."
			},{
				type: "step",
				title: "PPTP-VPN-Konto hinzufügen",
				content: [
					"1. Klicken Sie Hinzufügen.",
					"2. Geben Sie Benutzername und Passwort ein, um die Clients am PPTP-VPN-Server zu authentifizieren.",
					"3. Klicken Sie auf OK."
				]
			},/*{
				type: "name",
				title: "Benutzername und Passwort",
				content: "Definieren Sie Benutzernamen und Passwort für die VPN-Teilnehmer."
			},{
				type: "name",
				title: "Ändern",
				content: "Zeigt die Optionen an, das entsprechende Konto zu ändern oder zu löschen."
			}*/
			{
				type: "step",
				title: "Ein bestehendes Konto ändern oder löschen.",
				content: "Klicken Sie in der Tabelle auf das Bearbeiten-Symbol oder das Papierkorb-Symbol des Kontos, das Sie bearbeiten oder löschen möchten."
			}]
		},
		PPTP_VPN_GUIDE:{
			TITLE: "VPN-Clientinstallationsanleitung",
			CONTENT: [{
				type: "step",
				title: "Verbinden Ihrer Clientgeräte mit dem PPTP-VPN-Server:",
				content:[{
					type: "paragraph",
					content: "Bevor Sie den PPTP-VPN-Server konfigurieren, konfigurieren Sie bitte DDNS (empfohlen) oder weisen Sie dem WAN-Port eine statische IP-Adresse zu. Vergewissern Sie sich bitte, dass der externe Port Ihrer NAT-Einstellungen nicht 1723 ist, und dass Ihre Systemzeit mit dem Internet synchronisiert ist."
				},
					"1. Wählen Sie VPN-Server aktivieren.",
					"2. Konfigurieren Sie die PPTP-VPN-Serverparameter und klicken Sie auf Speichern.",
					"3. Erstellen Sie auf Ihren Clientgeräten eine PPTP-VPN-Verbindung. Zu den offiziell unterstützten Plattformen gehören Windows, MacOS X, Linux, iOS und Android.",
					"4. Starten Sie das PPTP-VPN-Programm, fügen Sie eine neue Verbindung hinzu, und geben Sie den Domain-Namen des registrierten DDNS-Dienstes bzw. die statische IP-Adresse ein, die dem WAN-Port zugewiesen wurde, um Ihr Clientgerät mit dem PPTP-VPN-Server zu verbinden.",
				]}
			]
		},
		VPN_CONNNECTION:{
			TITLE: "VPN-Verbindungen",
			CONTENT: [{
				type: "paragraph",
				content: "Diese Seite zeigt eine Übersicht über die gegenwärtig verbundenen OpenVPN- und PPTP-Clients."
			},{
				type: "paragraph",
				content: "Klicken Sie auf das Minus-Zeichen, um einen Client zu trennen."
			}]
		},
		BASIC_NETWORK_INTEREST: {
			TITLE: "Internet",
			CONTENT: [{
				type: "name",
				title: "Internetstatus",
				content: "Zeigt an, ob Ihr Router mit dem Internet verbunden ist."
			},{
				type: "name",
				title: "Verbindungstyp",
				content: "Typ Ihrer Internetverbindung."
			},{
				type: "name",
				title: "IP-Adresse",
				content: "Die aktuell dem Router zugewiesene öffentliche IP-Adresse (Internet-IP-Adresse)."
			},{
				type: "name",
				title: "Zweitverbindung/IP-Adresse",
				content: "Typ und IP-Adresse Ihrer Zweitverbindung."
			}]
		},
		BASIC_NETWORK_ROUTER: {
			TITLE: "Router",
			CONTENT: [{
				type: "title",
				title: "2,4-GHz-/5-GHz-WLAN"
			},{
				type: "name",
				title: "SSID",
				content: "Zeigt den aktuellen WLAN-Namen der Bandfrequenz 2,4 GHz/5 GHz an."
			},{
				type: "name",
				title: "Kanal",
				content: "Zeigt den Kanal an, auf dem das 2,4-GHz-/5-GHz-Netzwerk sendet."
			},{
				type: "name",
				title: "MAC-Adresse",
				content: "Zeigt die aktuelle MAC-Adresse des 2,4-GHz-/5-GHz-WLANs an."
			},{
				type: "title",
				title: "2,4-/5GHz-Gastnetz"
			},{
				type: "name",
				title: "Status",
				content: "Zeigt an, ob Ihr 2,4-/5GHz-Gast-WLAN aktiviert ist."
			},{
				type: "name",
				title: "SSID",
				content: "Name Ihres Gast-WLANs."
			}]
		},
		BASIC_NETWORK_CLIENTS: {
			TITLE: "Kabelgebundene/drahtlose Clients",
			CONTENT: [{
				type: "name",
				title: "Name",
				content: "Name des mit dem Router verbundenen Geräts."
			},{
				type: "name",
				title: "IP-Adresse",
				content: "Die dem Gerät zugewiesene IP-Adresse."
			},{
				type: "name",
				title: "MAC-Adresse",
				content: "Die MAC-Adresse des Gerätes."
			}]
		},
		BASIC_NETWORK_PRINTER: {
			TITLE: "Drucker",
			CONTENT: [{
				type: "name",
				title: "Name",
				content: "Name des an den USB-Port angeschlossenen Druckers."
			}]
		},
		BASIC_NETWORK_USB: {
			TITLE: "USB-Datenträger",
			CONTENT: [{
				type: "name",
				title: "USB-Datenträger",
				content: "Zeigt den Namen des USB-Laufwerks an."
			},{
				type: "name",
				title: "Gesamt",
				content: "Zeigt die maximale Speicherkapazität des USB-Laufwerkes an."
			},{
				type: "name",
				title: "Verfügbar",
				content: "Zeigt die verfügbare Speicherkapazität des USB-Laufwerkes an."
			}]
		},
		BASIC_INTERNET: {
			TITLE: "Internet",
			CONTENT: [{
				type: "name",
				title: "Automatische Erkennung",
				content: "Klicken Sie hier, um den Router Ihren Internetverbindungstyp automatisch erkennen zu lassen."
			},{
				type: "note",
				title: "Hinweis",
				content: "Hinweis: Sind Sie sich bezüglich Ihres Internetverbindungstyps nicht sicher, versuchen Sie die Automatische Erkennung oder fragen Sie Ihren Internetdiensteanbieter."
			},{
				type: "title",
				title: "Internetverbindungstyp: Statische IP-Adresse",
			},{
				type: "name",
				title: "IP-Adresse, Subnetzmaske, Standardgateway, Haupt-/Backup-DNS-Server",
				content: "Geben Sie hier die von Ihrem Internetdiensteanbieter vorgegebenen Werte ein."
			},{
				type: "title",
				title: "Internetverbindungstyp: Dynamische IP-Adresse",
			},{
				type: "name",
				title: "MAC-Adresse NICHT klonen/MAC-Adresse des angeschlossenen Computers klonen",
				content: "Hier können Sie die MAC-Adresse klonen, sofern Ihr Internetdiensteanbieter dies erfordert."
			},{
				type: "title",
				title: "Internetverbindungstyp: PPPoE",
			},{
				type: "name",
				title: "Benutzername/Passwort",
				content: "Geben Sie hier die von Ihrem Internetdiensteanbieter vorgegebenen Zugangsdaten ein. Achten Sie hier auf Groß- und Kleinschreibung."
			},{
				type: "title",
				title: "Internetverbindungstyp: L2TP/PPTP",
			},{
				type: "name",
				title: "Benutzername/Passwort",
				content: "Geben Sie hier die von Ihrem Internetdiensteanbieter vorgegebenen Zugangsdaten ein. Achten Sie hier auf Groß- und Kleinschreibung."
			},{
				type: "name",
				title: "Zweitverbindung (Dynamische oder Statische IP-Adresse)",
				children: [{
					type: "name",
					title: "Dynamische IP-Adresse",
					content: "Wählen Sie dies aus, wenn IP-Adresse und Subnetzmaske von Ihrem Internetdiensteanbieter automatisch vergeben werden."
				},{
					type: "name",
					title: "Statische IP-Adresse",
					content: "Wählen Sie dies, wenn Sie IP-Adresse, Subnetzmaske, Standardgateway und DNS-Serveradressen von Ihrem Internetdiensteanbieter bekommen haben und geben Sie diese in die passenden Felder ein."
				}]
			},{
				type: "name",
				title: "IP-Adresse/Domänenname des VPN-Servers",
				content: "Geben Sie hier die Adresse des VPN-Servers ein, so wie Sie sie von Ihrem Internetdiensteanbieter erhalten haben."
			},{
				type:"paragraph",
				content:"Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		BASIC_WIRELESS: {
			TITLE: "WLAN-Einstellungen",
			CONTENT: [{
				type: "name",
				title: "WLAN aktivieren",
				content: "Markieren Sie dieses Kontrollkästchen, um die 2,4-GHz-/5-GHz-WLAN-Funkfrequenz zu aktivieren."
			},{
				type: "name",
				title: "WLAN-Name (SSID)",
				content: "Hier können Sie optional den WLAN-Namen (SSID) ändern. Dieser kann bis zu 32 Zeichen lang sein. Es wird zwischen Groß- und Kleinschreibung unterschieden."
			},{
				type: "name",
				title: "WLAN verbergen",
				content: "Markieren Sie dieses Kontrollkästchen, um den Namen des 2,4-GHz-/5-GHz-WLANs (SSID) aus der WLAN-Liste auszublenden."
			},{
				type: "name",
				title: "Passwort",
				content: "Tragen Sie ein WLAN-Passwort ein, welches zum gewählten Verschlüsselungsverfahren passt."
			},{
				type:"paragraph",
				content:"Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		BASIC_DEVICE_SETTINGS: {
			TITLE: "Geräteeinstellungen",
			CONTENT: [{
				type: "paragraph",
				content: "Auf der Seite Geräteeinstellungen sehen Sie Informationen zu am USB-Port angeschlossenen Geräten."
			},{
				type: "name",
				title: "Suchen",
				content: "Normalerweise findet der Router neu angeschlossene USB-Geräte automatisch. Mit dieser Schaltfläche können Sie angeschlossene USB-Geräte manuell erkennen lassen."
			},{
				type: "name",
				title: "Name",
				content: "Zeigt den Namen der Partition."
			},{
				type: "name",
				title: "Kapazität",
				content: "Gesamtkapazität des USB-Datenträgers"
			},{
				type: "name",
				title: "Freier Speicherplatz",
				content: "Aktuell verfügbarer Speicherplatz auf dem USB-Datenträger."
			},{
				type: "name",
				title: "Sicher entfernen",
				content: "Klicken Sie hier, bevor Sie das USB-Gerät physisch vom Router entfernen.",
				children: [{
					type: "paragraph",
					content: "Die Schaltfläche Sicher entfernen erscheint nur, wenn ein USB-Datenträger an den Router angeschlossen ist. Ein Entfernen ist nicht möglich, solange das USB-Gerät in Verwendung ist."
				}]
			},{
				type: "name",
				title: "Status",
				content: "Diese Option erscheint nur, wenn ein USB-Datenträger an den Router angeschlossen ist. Aktiviert die Freigabe des USB-Geräts."
			}]
		},
		BASIC_SHARING_SETTINGS: {
			TITLE: "Freigabeeinstellungen",
			CONTENT: [{
				type: "name",
				title: "Netz-/Mediaserver-Name",
				content: "Anzeigename des verbundenen USB-Laufwerks. Der Name muss aus alphanumerischen Zeichen, Unterstrichen oder Apostrophen bestehen und darf nur 4-15 Zeichen lang sein. "
			},{
				type:"paragraph",
				content:"Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		},
		BASIC_FOLDER_SHARING: {
			TITLE: "Ordnerfreigabe",
			CONTENT: [{
				type: "name",
				title: "Komplett freigeben",
				content: "Ermöglicht die Freigabe des ganzen USB-Datenträgers. Möchten Sie nur einzelne Ordner freigeben, deaktivieren Sie diese Option."
			},{
				type: "name",
				title: "Authentifizierung erfordern",
				content: "Ist dies aktiviert, müssen Benutzer einen Namen und ein Passwort eingeben, um Zugriff auf die freigegebenen Ordner zu erhalten (empfohlen)."
			},{
				type: "name",
				title: "Ordnername",
				content: "Name des freigegebenen Ordners."
			},{
				type: "name",
				title: "Ordnerpfad",
				content: "Der Pfad zu dem freigegebenen Ordner."
			},{
				type: "name",
				title: "Medienfreigabe",
				content: "Erlaubt dem Mediaserver die Verwendung dieses Ordners."
			},{
				type: "name",
				title: "Datenträgername",
				content: "Name des freigegebenen Datenträgers."
			},{
				type: "name",
				title: "Status",
				content: "Zeigt den Status des freigegebenen Ordners an."
			},{
				type: "name",
				title: "Bearbeiten",
				content: "Bietet Optionen zum Bearbeiten und zum Löschen einer Freigabe."
			},{
				type: "name",
				title: "Hinzufügen",
				content: "Anlegen eines neuen Eintrags."
			},{
				type: "name",
				title: "Löschen",
				content: "Entfernen einer Freigabe."
			},{
				type: "name",
				title: "Durchsuchen",
				content: "Auswahl eines freizugebenden Ordners."
			},{
				type: "name",
				title: "Zugriff aus dem Gastnetz erlauben",
				content: "Bestimmt, ob die Teilnehmer Ihres Gastnetzes Zugriff auf die Freigabe bekommen."
			},{
				type: "name",
				title: "Authentifizierung erfordern",
				content: "Ist dies aktiviert, müssen Benutzer einen Namen und ein Passwort eingeben, um Zugriff auf die freigegebenen Ordner zu erhalten (empfohlen)."
			},{
				type: "name",
				title: "Schreibzugriff",
				content: "Erlaubt dem Benutzer das Verändern von Datenträgerinhalten."
			},{
				type: "name",
				title: "Medienfreigabe",
				content: "Erlaubt dem Mediaserver die Verwendung dieses Ordners."
			},{
				type: "name",
				title:"Neu laden",
				content: "Aktualisiert die Anzeige der freigegebenen Ordner."
			}]
		},
		BASIC_PRINT_SERVER: {
			TITLE: "Printserver",
			CONTENT: [{
				type: "name",
				title: "Printserver",
				content: "Aktivieren/Deaktivieren des Printservers."
			},{
				type: "name",
				title: "Druckername",
				content: "Name des angeschlossenen Druckers."
			}]
		},
		BASIC_PARENTAL_CONTROL: {
			TITLE: "Kindersicherung",
			CONTENT: [{
				type: "paragraph",
				content: "Die Kindersicherung erlaubt Ihnen, den Internetzugang bestimmter Geräte (z.B. des PCs Ihres Kindes) nach Webadresse und nach Uhrzeit einzuschränken."
			},{
				type: "name",
				title: "Kindersicherung",
				content: "Aktivieren der Kindersicherung (standardmäßig deaktiviert)."
			}]
		},
		BASIC_PARENTAL_DEVICE: {
			TITLE: "Der Kindersicherung unterliegende Geräte",
			CONTENT: [{
				type: "paragraph",
				content: "Listet die von der Kindersicherung betroffenen Geräte auf."
			},{
				type: "name",
				title: "Gerätename",
				content: "Namen der von der Kindersicherung betroffenen Clientgeräte."
			},{
				type: "name",
				title: "MAC-Adresse",
				content: "MAC-Adressen aller Geräte, für die die Kindersicherung gilt."
			},{
				type: "name",
				title: "Internetzugriffszeitfenster",
				content: "Zeitrahmen, für den die Kindersicherung gilt. Basiert auf der Router-Systemzeit, die unter \"System-Tools -> Zeiteinstellungen\" konfiguriert werden kann."
			},{
				type: "name",
				title: "Beschreibung",
				content: "Kurze Beschreibung des Gerätes."
			},{
				type: "name",
				title: "Status",
				content: "Aktueller Status (aktiviert oder deaktiviert) der Kindersicherungsregel für dieses Gerät."
			},{
				type: "name",
				title: "Bearbeiten",
				content: "Bearbeiten oder Löschen eines Geräteeintrags."
			},{
				type: "step",
				title: "So sperren Sie den Internetzugang für ein neues Gerät:",
				content:[
					"1. Klicken Sie Hinzufügen.",
					"2. Klicken Sie Existierende Geräte anzeigen und wählen Sie aus der Liste der verbundenen Geräte das zu konfigurierende heraus. Oder Sie geben den Gerätenamen und die MAC-Adresse von Hand ein.",
					"3. Klicken Sie Internetzugriffszeitfenster, um die Zeit des Internetzugriffs einzuschränken.",
					"4. Vergeben Sie eine kurze Beschreibung (optional).",
					"5. Klicken Sie Aktivieren.",
					"6. Klicken Sie OK, um den neuen Eintrag zu speichern."
				]
			},{
				type: "paragraph",
				content: "Klicken Sie in der Tabelle Bearbeiten oder Löschen, um einen Eintrag zu bearbeiten oder zu löschen."
			},{
				type: "paragraph",
				content: "Um mehrere Einträge zu löschen, wählen Sie diese aus und klicken Sie über der Tabelle auf Löschen."
			}]
		},
		BASIC_PARENTAL_RESTRICTION: {
			TITLE: "Contentfilter",
			CONTENT: [{
				type: "name",
				title: "Blacklist",
				content: "Webseiten mit den eingegebenen Schlüsselwörtern in der Adresse werden von in der Kindersicherungsliste enthaltenen Geräten nicht geladen.",
				children: [{
					type: "paragraph",
					content: "Klicken Sie Schlüsselwort hinzufügen, um ein Schlüsselwort zur Blacklist hinzuzufügen. Um eines zu löschen, klicken Sie für dieses Schlüsselwort (-)."
				}]
			},{
				type: "name",
				title: "Whitelist",
				content: "Nur Webseiten, deren Adresse eines der angegebenen Schlüsselwörter enthält, sind für die in der Kindersicherungsliste enthaltenen Geräte zugänglich.",
				children: [{
					type: "paragraph",
					content: "Klicken Sie Neuen Domänennamen hinzufügen, um eine neue Domäne zur Whitelist hinzuzufügen. Um eine zu löschen, klicken Sie für diese Domäne (-)."
				}]
			},{
				type: "note",
				title: "Hinweis",
				content: "Schlüsselworte können auch Domänennamen, so wie mail.google.com oder www.facebook.com sein."
			},{
				type: "paragraph",
				content: "Klicken Sie Speichern, um Ihre Konfiguration zu speichern."
			}]
		},
		BASIC_GUEST_NETWORK: {
			TITLE: "Gast-WLAN",
			CONTENT: [{
				type: "paragraph",
				content: "Errichten Sie ein Gast-WLAN, können Sie Ihre Gäste von Ihrem lokalen Netz fernhalten, indem diese einen anderen WLAN-Namen und ein anderes Passwort verwenden."
			},{
				type: "name",
				title: "Gäste dürfen einander sehen",
				content: "Aktivieren Sie dies, um alle Gastnetzteilnehmer einander sichtbar zu machen."
			},{
				type: "name",
				title: "Gäste dürfen auf mein lokales Netz zugreifen",
				content: "Gästen Zugriff auf lokale Ressourcen wie Netzfreigaben und Drucker gewähren."
			},{
				type: "name",
				title: "Gastnetz aktivieren",
				content: "Aktivieren des Gastnetzes."
			},{
				type: "name",
				title: "WLAN-Name (SSID)",
				content: "Gast-WLAN-Name, kann frei gewählt werden (1 bis 32 Zeichen)."
			},{
				type: "name",
				title: "WLAN verbergen",
				content: "Hiermit können Sie Ihr Gast-WLAN unsichtbar machen."
			},{
				type: "name",
				title: "Passwort",
				content: "Erstellen Sie ein Passwort mit 8-63 ASCII-Zeichen oder mit 8-64 Hexadezimal-Zeichen (0-9, a-f, A-F)."
			},{
				type:"paragraph",
				content:"Klicken Sie Speichern, um Ihre Einstellungen zu sichern."
			}]
		}

	};
})(jQuery);
