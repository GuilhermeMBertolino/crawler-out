(function($){
	$.su = $.su || {};
	$.su.CHAR = $.su.CHAR || {};
	$.su.CHAR.HELP = {
		STATUS_INTERNET: {
			TITLE: "Internet",
			CONTENT: [{
				type: "paragraph",
				content: "Wyświetla informacje dotyczące internetowego połączenia sieci WAN."
			},{
				type: "title",
				title: "IPv4",
			},{
				type: "name",
				title: "Adres MAC",
				content: "Adres fizyczny portu WAN, widziany od strony Internetu."
			},{
				type: "name",
				title: "Adres IP",
				content: "Aktualny adres IP portu WAN (internetowy). Jeżeli nie ma połączenia z Internetem wyświetlona zostanie wartość 0.0.0.0."
			},{
				type: "name",
				title: "Maska podsieci",
				content: "Określa część sieciową i część hosta adresu IP."
			},{
				type: "name",
				title: "Brama domyślna",
				content: "Adres IP, przez który router łączy się do sieci WAN."
			},{
				type: "name",
				title: "Preferowany DNS/Alternatywny DNS",
				content: "DNS tłumaczy nazwy hostów i domen internetowych na adresy IP. Informacje o serwerach DNS dostarczane są przez dostawcę usług internetowych."
			},{
				type: "name",
				title: "Typ połączenia",
				content: "Aktualny typ połączenia portu WAN."
			},{
				type: "title",
				title: "IPv6",
			},{
				type: "name",
				title: "Adres MAC",
				content: "Adres fizyczny portu WAN, widziany od strony Internetu."
			},{
				type: "name",
				title: "Adres IP",
				content: "Adres IPv6 portu WAN, widziany od strony Internetu."
			},{
				type: "name",
				title: "Brama domyślna",
				content: "Adres IP, przez który router łączy się do sieci WAN."
			},{
				type: "name",
				title: "Preferowany DNS/Alternatywny DNS",
				content: "DNS tłumaczy nazwy hostów i domen internetowych na adresy IP. Informacje o serwerach DNS dostarczane są przez dostawcę usług internetowych."
			},{
				type: "name",
				title: "Typ połączenia",
				content: "Aktualny typ połączenia portu WAN."
			}]
		},
		STATUS_WIRELESS: {
			TITLE: "Sieć bezprzewodowa 2,4GHz/5GHz/60GHz",
			CONTENT: [{
				type: "paragraph",
				content: "Wyświetla informacje dotyczące połączenia bezprzewodowego."
			},{
				type: "name",
				title: "Nazwa sieci bezprzewodowej (SSID)",
				content: "Nazwa sieci bezprzewodowej, rozgłaszanej przez urządzenie."
			},{
				type: "name",
				title: "Stan",
				content: "Aktualny stan (Włączona lub Wyłączona) sieci bezprzewodowej."
			},{
				type: "name",
				title: "Tryb",
				content: "Aktualny tryb transmisji bezprzewodowej."
			},{
				type: "name",
				title: "Szerokość kanału",
				content: "Szerokość pasma transmisji bezprzewodowej."
			},{
				type: "name",
				title: "Kanał",
				content: "Aktualnie włączona sieć bezprzewodowa"
			},{
				type: "name",
				title: "Adres MAC",
				content: "Adres fizyczny nadajnika routera, widziany z sieci bezprzewodowej."
			},{
				type: "name",
				title: "Stan WDS",
				content: "Aktualny stan trybu WDS (włączony lub wyłączony)"
			}]
		},
		STATUS_LAN: {
			TITLE: "LAN",
			CONTENT: [{
				type: "paragraph",
				content: "Wyświetla informacje dotyczące portów Ethernet (LAN)."
			},{
				type: "title",
				title: "IPv4"
			},{
				type: "name",
				title: "Adres MAC",
				content: "Adres fizyczny portu Ethernet routera, widziany z sieci LAN."
			},{
				type: "name",
				title: "Adres IP",
				content: "Adres IPv4 portu Ethernet."
			},{
				type: "name",
				title: "Maska podsieci",
				content: "Określa część sieciową i część hosta adresu IP."
			},{
				type: "name",
				title: "DHCP",
				content: "Informuje czy wbudowany serwer DHCP routera jest aktywny dla urządzeń w sieci LAN."
			},{
				type: "title",
				title: "IPv6"
			},{
				type: "name",
				title: "Adres MAC",
				content: "Adres fizyczny portu Ethernet routera, widziany z sieci LAN."
			},{
				type: "name",
				title: "Adres IP",
				content: "Adres IPv6 portu Ethernet."
			},{
				type: "name",
				title: "Adres lokalny dla łącza",
				content: "Adres lokalny IPv6 dla interfejsu LAN."
			},{
				type: "name",
				title: "Sposób przydziału",
				content: "Typ adresu IPv6 dla interfejsu LAN."
			}]
		},
		STATUS_GUEST: {
			TITLE: "Sieć dla gości 2,4GHz/5GHz",
			CONTENT: [{
				type: "paragraph",
				content: "Wyświetla informacje dotyczące sieci bezprzewodowej dla gości."
			},{
				type: "name",
				title: "Nazwa sieci bezprzewodowej (SSID)",
				content: "Nazwa sieci bezprzewodowej dla gości."
			},{
				type: "name",
				title: "Ukryj nazwę sieci",
				content: "Określa czy nazwa sieci bezprzewodowej (SSID) jest ukryta."
			},{
				type: "name",
				title: "Stan",
				content: "Aktualny stan (Włączona lub Wyłączona) sieci dla gości."
			},{
				type: "name",
				title: "Pozwól gościom na komunikację między sobą",
				content: "Określa czy urządzenia połączone z siecią dla gości mogą się ze sobą komunikować."
			}]
		},
		STATUS_USB: {
			TITLE: "Urządzenia USB",
			CONTENT: [{
				type: "paragraph",
				content: "Wyświetla informacje dotyczące podłączonych urządzeń pamięci masowej USB i/lub drukarek połączonych z routerem poprzez porty USB."
			},{
				type: "name",
				title: "Drukarka",
				content: "Nazwa podłączonej drukarki."
			},{
				type: "name",
				title: "Dysk USB",
				content: "Nazwa podłączonego dysku USB."
			},{
				type: "name",
				title: "Całkowita pojemność",
				content: "Całkowita pojemność podłączonego urządzenia pamięci masowej USB."
			},{
				type: "name",
				title: "Wolne miejsce",
				content: "Dostępna pojemność podłączonego urządzenia pamięci masowej USB."
			}]
		},
		STATUS_PERFORMANCE: {
			TITLE: "Użycie zasobów",
			CONTENT: [{
				type: "paragraph",
				content: "Wyświetla aktualne informacje o działaniu routera."
			},{
				type: "name",
				title: "Wykorzystanie procesora",
				content: "Aktualne zużycie procesora."
			},{
				type: "name",
				title: "Wykorzystanie pamięci",
				content: "Aktualne zużycie pamięci."
			}]
		},
		STATUS_WIRED: {
			TITLE: "Klienci przewodowi",
			CONTENT: [{
				type: "paragraph",
				content: "Wyświetla informacje o wszystkich urządzeniach aktualnie podłączonych do sieci przewodowo."
			}]
		},
		STATUS_WIRELESS_CLIENTS: {
			TITLE: "Klienci bezprzewodowi",
			CONTENT: [{
				type: "paragraph",
				content: "Wyświetla informacje o wszystkich bezprzewodowych urządzeniach aktualnie podłączonych do sieci."
			}]
		},
		
		INTERNET_INTERNET: {
			TITLE: "IPv4",
			CONTENT: [{
				type: "title",
				title: "Typ połączenia: Statyczne IP"
			},{
				type: "paragraph",
				content: "Wybierz tę opcję, jeżeli twój dostawca usług internetowych wymaga ustawienia stałego adresu IP, Maski podsieci, Bramy domyślnej oraz DNS."
			},{
				type: "name",
				title: "Adres IP/Maska podsieci/Brama domyślna/Preferowany DNS/Alternatywny DNS",
				content: "Wprowadź parametry otrzymane od dostawcy usług internetowych."
			},{
				type: "name",
				title: "Wielkość MTU",
				content: "Typową wielkością MTU (Maksymalna jednostka transmisji) dla większości sieci Ethernet jest 1500 bajtów. Wielkość MTU nie powinna być zmieniana, o ile dostawca usług internetowych nie zaleci inaczej."
			},{
				type: "title",
				title: "Typ połączenia: Dynamiczne IP"
			},{
				type: "paragraph",
				content: "Wybierz tę opcję jeśli parametry pobierane są automatycznie od dostawcy."
			},{
				type: "name",
				title: "Adres IP/Maska podsieci/Brama domyślna/Preferowany DNS/Alternatywny DNS",
				content: "Parametry te są automatycznie przypisywane serwerowi DHCP przez dostawcę usług internetowych."
			},{
				type: "name",
				title: "Odnów",
				content: "Naciśnij ten przycisk, aby pobrać nowe parametry IP z serwera DHCP."
			},{
				type: "name",
				title: "Zwolnij",
				content: "Naciśnij ten przycisk, aby zwolnić parametry IP przypisane serwerowi DHCP."
			},{
				type: "name",
				title: "Użyj następujących adresów DNS",
				content: "Jeżeli dostawca usług internetowych wymaga wprowadzenia określonych adresów serwerów DNS, zaznacz tę opcję i wprowadź Preferowany DNS oraz Alternatywny DNS w odpowiednie pola. Jeżeli opcja nie zostanie zaznaczona, serwery DNS będą przydzielane automatycznie przez dostawcę usług internetowych."
			},{
				type: "name",
				title: "Wielkość MTU",
				content: "Typową wielkością MTU (Maksymalna jednostka transmisji) dla większości sieci Ethernet jest 1500 bajtów. Wielkość MTU nie powinna być zmieniana, o ile dostawca usług internetowych nie zaleci inaczej."
			},{
				type: "name",
				title: "Nazwa hosta",
				content: "Opcja ta umożliwia nadanie routerowi określonej nazwy hosta."
			},{
				type: "name",
				title: "Uzyskaj adres IP przez DHCP typu Unicast",
				content: "Wybierz tę opcję, jeżeli serwer DHCP twojego dostawcy usług internetowych nie wspiera rozgłaszania broadcast oraz nie może pobrać adresu IP automatycznie."
			},{
				type: "title",
				title: "Typ połączenia: PPPoE"
			},{
				type: "paragraph",
				content: "Wybierz tę opcję, jeżeli korzystasz z usługi DSL (Digital Subscriber Line) oraz otrzymałeś nazwę użytkownika i hasło od swojego dostawcy usług internetowych."
			},{
				type: "name",
				title: "Nazwa użytkownika/Hasło",
				content: "Wprowadź nazwę użytkownika oraz hasło otrzymane od dostawcy usług internetowych. Wielkość liter ma znaczenie."
			},{
				type: "name",
				title: "Adres IP/Preferowany DNS/Alternatywny DNS",
				content: "Parametry te są automatycznie przypisywane serwerowi DHCP przez dostawcę usług internetowych."
			},{
				type: "name",
				title: "Połączenie dodatkowe (Brak, Dynamiczne IP, Statyczne IP)",
				children: [{
					type: "name",
					title: "Brak",
					content: "Wybierz w przypadku braku dodatkowego połączenia."
				},{
					type: "name",
					title: "Dynamiczne IP",
					content: "Zaznacz tą opcję jeżeli adres IP uzyskiwany jest automatycznie od dostawcy usług internetowych.",
					children: [{
						type: "name",
						title: "Odnów",
						content: "Naciśnij ten przycisk, aby uzyskać nowe parametry IP od swojego dostawcy usług internetowych."
					},{
						type: "name",
						title: "Zwolnij",
						content: "Naciśnij ten przycisk, aby zwolnić przydzielone parametry IP."
					}]
				},{
					type: "name",
					title: "Statyczne IP",
					content: "Wybierz tę opcję jeżeli Adres IP oraz Maska podsieci zostały podane przez dostawcę, a następnie wprowadź je w odpowiednie pola."
				}]
			},{
				type: "name",
				title: "Wielkość MTU",
				content: "Typową wielkością MTU (Maximum Transmit Unit-Maksymalna jednostka transmisji) dla sieci Ethernet jest 1480 bajtów.",
				children: [{
					type: "note",
					title: "Uwaga",
					content: "Niektórzy dostawcy usług internetowych mogą wymagać zmiany wielkości MTU w celu lepszego działania sieci. Wielkość MTU nie powinna być jednak zmieniana, jeżeli nie jest to konieczne."
				}]
			},{
				type: "name",
				title: "Nazwa usługi/Nazwa serwera",
				content: "Domyślnie pola te pozostają puste. Nie należy dokonywać żadnych zmian, o ile dostawca usług internetowych nie zaleci inaczej."
			},{
				type: "name",
				title: "Interwał wykrywania serwera",
				content: "Wprowadź wartość od 0 do 120 (w sekundach) dla interwału, według którego router będzie sprawdzał stan serwera. Domyślna wartość to 10."
			},{
				type: "name",
				title: "Adres IP",
				content: "Jeżeli twój dostawca usług internetowych wymaga ustawienia stałego adresu IP, wybierz Użyj następującego adresu IP, a w polu wpisz adres IP. W innym przypadku, wybierz Pobierz automatycznie od dostawcy, aby automatycznie uzyskać adres IP serwera DNS."
			},{
				type: "name",
				title: "Adres DNS/Preferowany DNS/Alternatywny DNS",
				content: "Jeżeli otrzymałeś od usługodawcy adresy serwerów DNS, wybierz opcję Użyj następującego adresu DNS i wprowadź otrzymane wartości w odpowiednie pola. W innym przypadku, wybierz opcję Pobierz automatycznie od usługodawcy, aby pobrać adresy DNS automatycznie."
			},{
				type: "name",
				title: "Tryb połączenia",
				content: "Wybierz odpowiedni tryb połączenia, aby określić sposób nawiązywania połączenia internetowego.",
				children: [{
					type: "name",
					title: "Automatyczna",
					content: "W tym trybie połączenie internetowe zostaje automatycznie nawiązane od razu po rozłączeniu."
				},{
					type: "name",
					title: "Na żądanie",
					content: "W tym trybie połączenie internetowe zostaje automatycznie zerwane po określonym czasie nieaktywności (Maksymalny czas bezczynności). Połączenie zostaje przywrócone przy kolejnej próbie uzyskania dostępu do Internetu."
				},{
					type: "name",
					title: "Czasowe",
					content: "W tym trybie połączenie nawiązywane jest dla określonego przedziału czasowego. Po wybraniu tej opcji, wpisz czas rozpoczęcia i czas zakończenia; obie wartości są w formacie GG:MM."
				},{
					type: "name",
					title: "Ręczne",
					content: "W tym trybie połączeniem internetowym zarządza się ręcznie, przy użyciu przycisku Połącz lub Rozłącz. Obsługiwana jest także funkcja Maksymalnego czasu bezczynności. Wpisz maksymalny czas nieaktywności (w minutach) dla połączenia internetowego w polu Maksymalny czas bezczynności. Wartością domyślną jest 15 minut. Jeśli chcesz, aby połączenie internetowe było aktywne przez cały czas, wpisz 0."
				},{
					type: "note",
					title: "Uwaga",
					content: "Tryb połączenia czasowego będzie aktywny jedynie po konfiguracji czasu systemowego na stronie Zaawansowane->Narzędzia systemowe->Ustawienia czasu."
				}]
			},{
				type: "title",
				title: "Typ połączenia: Kabel BigPond",
				id: "BigPond"
			},{
				type: "paragraph",
				content: "Wybierz połączenie BigPond Cable, jeżeli twój dostawca usług internetowych je zapewnia.",
				id: "BigPond_desc"
			},{
				type: "name",
				title: "Nazwa użytkownika/Hasło",
				content: "Wprowadź nazwę użytkownika oraz hasło otrzymane od dostawcy usług internetowych. Wielkość liter ma znaczenie.",
				id: "BigPond_name"
			},{
				type: "name",
				title: "Serwer uwierzytelniania",
				content: "Wpisz adres IP serwera uwierzytelniania lub nazwę hosta.",
				id: "BigPond_server"
			},{
				type: "name",
				title: "Domena uwierzytelniania",
				content: "Wpisz przyrostek nazwy domeny serwera (w zależności od swojej lokalizacji). Na przykład nsw.bigpond.net.au dla NSW/ACT, vic.bigpond.net.au dla VIC/TAS/WA/SA/NT lub qld.bigpond.net.au dla QLD.",
				id: "BigPond_domain"
			},{
				type: "name",
				title: "Wielkość MTU",
				content: "Typową wielkością MTU (Maksymalna jednostka transmisji) dla większości sieci Ethernet jest 1500 bajtów. Wielkość MTU nie powinna być zmieniana, o ile dostawca usług internetowych nie zaleci inaczej.",
				id: "BigPond_mtu"
			},{
				type: "name",
				title: "Tryb połączenia",
				content: "Wybierz odpowiedni tryb połączenia, aby określić sposób nawiązywania połączenia internetowego.",
				id: "BigPond_mode",
				children: [{
					type: "name",
					title: "Automatyczna",
					content: "W tym trybie połączenie internetowe zostaje automatycznie nawiązane od razu po rozłączeniu."
				},{
					type: "name",
					title: "Na żądanie",
					content: "W tym trybie połączenie internetowe zostaje automatycznie zerwane po określonym czasie nieaktywności (Maksymalny czas bezczynności). Połączenie zostaje przywrócone przy kolejnej próbie uzyskania dostępu do Internetu."
				},{
					type: "name",
					title: "Ręczne",
					content: "W tym trybie połączeniem internetowym zarządza się ręcznie, przy użyciu przycisku Połącz lub Rozłącz. Obsługiwana jest także funkcja Maksymalnego czasu bezczynności. Wpisz maksymalny czas nieaktywności (w minutach) dla połączenia internetowego w polu Maksymalny czas bezczynności. Wartością domyślną jest 15 minut. Jeśli chcesz, aby połączenie internetowe było aktywne przez cały czas, wpisz 0."
				}]
			},{
				type: "title",
				title: "Typ połączenia: L2TP/PPTP"
			},{
				type: "paragraph",
				content: "Wybierz ten typ połączenia, jeżeli możesz łączyć się z serwerem L2TP/PPTP oraz otrzymałeś nazwę użytkownika, hasło oraz adres IP/domenę serwera od swojego dostawcy usług internetowych."
			},{
				type: "name",
				title: "Nazwa użytkownika/Hasło",
				content: "Wprowadź nazwę użytkownika oraz hasło otrzymane od dostawcy usług internetowych. Wielkość liter ma znaczenie."
			},{
				type: "name",
				title: "Adres IP/Preferowany DNS/Alternatywny DNS",
				content: "Parametry te są automatycznie przypisywane serwerowi DHCP przez dostawcę usług internetowych."
			},{
				type: "name",
				title: "Połączenie dodatkowe (Dynamiczne IP lub Statyczne IP)",
				children: [{
					type: "name",
					title: "Dynamiczne IP",
					content: "Zaznacz tą opcję jeżeli adres IP uzyskiwany jest automatycznie od dostawcy usług internetowych."
				},{
					type: "name",
					title: "Statyczne IP",
					content: "Zaznacz tę opcję jeżeli parametry połączenia zostały podane przez dostawcę usług internetowych, a następnie wprowadź je w poniższe pola."
				}]
			},{
				type: "name",
				title: "Adres IP/Nazwa domenowa serwera VPN",
				content: "Wprowadź adres IP serwera VPN oraz nazwę domeny, otrzymane od dostawcy usług internetowych."
			},{
				type: "name",
				title: "Wielkość MTU",
				content: "Standardowy rozmiar MTU dla większości sieci Ethernet to 1460 bajtów dla L2TP i 1420 bajtów dla PPTP. Wielkość MTU nie powinna być zmieniana, o ile dostawca usług internetowych nie zaleci inaczej."
			},{
				type: "name",
				title: "Tryb połączenia",
				content: "Wybierz odpowiedni tryb połączenia, aby określić sposób nawiązywania połączenia internetowego.",
				children: [{
					type: "name",
					title: "Automatyczna",
					content: "W tym trybie połączenie internetowe zostaje automatycznie nawiązane od razu po rozłączeniu."
				},{
					type: "name",
					title: "Na żądanie",
					content: "W tym trybie połączenie internetowe zostaje automatycznie zerwane po określonym czasie nieaktywności (Maksymalny czas bezczynności). Połączenie zostaje przywrócone przy kolejnej próbie uzyskania dostępu do Internetu."
				},{
					type: "name",
				title: "Ręczne",
				content: "W tym trybie połączeniem internetowym zarządza się ręcznie, przy użyciu przycisku Połącz lub Rozłącz. Obsługiwana jest także funkcja Maksymalnego czasu bezczynności. Wpisz maksymalny czas nieaktywności (w minutach) dla połączenia internetowego w polu Maksymalny czas bezczynności. Wartością domyślną jest 15 minut. Jeśli chcesz, aby połączenie internetowe było aktywne przez cały czas, wpisz 0."
				}]
			},{
				type:"paragraph",
				content:"Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		INTERNET_MAC: {
			TITLE: "Klonowanie MAC",
			CONTENT: [{
				type: "name",
				title: "Użyj domyślnego adresu MAC",
				content: "W przypadku, gdy dostawca usług internetowych nie wiąże przypisanego adresu IP z adresem MAC komputera, NIE zmieniaj domyślnego adresu MAC routera."
			},{
				type: "name",
				title: "Użyj adresu MAC podłączonego komputera",
				content: "W przypadku, gdy dostawca usług internetowych wiąże przypisany adres IP z adresem MAC komputera, skopiuj aktualny adres MAC komputera podłączonego do routera."
			},{
				type: "name",
				title: "Użyj innego adresu MAC",
				content: "W przypadku, gdy dostawca usług internetowych wiąże przypisany adres IP z określonym adresem MAC, wpisz adres MAC ręcznie."
			},{
				type:"paragraph",
				content:"Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},

		LAN_IPV4: {
			TITLE: "LAN",
			CONTENT: [{
				type: "name",
				title: "Adres MAC",
				content: "Adres fizyczny portu Ethernet routera, widziany z sieci LAN."
			},{
				type: "name",
				title: "Adres IP",
				content: "Wyświetla domyślny adres IP routera w sieci LAN, używany do logowania się do strony konfiguracyjnej. Może zostać zmieniony."
			},{
				type: "name",
				title: "Maska podsieci",
				content: "Wybierz maskę podsieci z listy lub wprowadź własną w notacji dziesiętnej."
			},{
				type: "note",
				title: "Uwaga",
				content: "Jeżeli nowy adres LAN IP urządzenia nie jest adresem z tej samej podsieci co poprzedni adres IP, razem z adresem IP router automatycznie zmieni pulę adresów IP przydzielanych przez serwer DHCP. Funkcje Serwery wirtualne oraz Host DMZ będą jednak wymagały ponownej konfiguracji."
			},{
				type:"paragraph",
				content:"Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		IPTV:{
			TITLE: "Ustawienia",
			CONTENT: [{
					type: "name",
					title: "IGMP Proxy",
					content: "Wybierz wersję V2 lub wersję V3 IGMP (Internet Group Management Protocol) Proxy, zgodnie z wymaganiami swojego dostawcy usług internetowych."
				},{
					type: "name",
					title: "Wersja IGMP",
					content: "Wybierz wersję Proxy IGMP, zgodnie z zaleceniami operatora."
				},
				{
					type: "name",
					title: "IPTV",
					content: "Wybierz, aby uruchomić funkcję IPTV."
				},
				{
					type: "name",
					title: "Tryb",
					content: "Wybierz odpowiedni tryb w zależności od dostawcy usług internetowych. Wspierane są trzy tryby IPTV:",
					children: [
						{
							type: "name",
							title: "Bridge",
							content:"Jeżeli na liście nie ma twojego dostawcy usług internetowych, a żadne dodatkowe parametry nie są wymagane, wybierz po prostu dany tryb i skonfiguruj właściwości portu LAN routera.",
							children:[{
								type: "name",
								title: "LAN 1/2/3/4",
								content: "Przypisz portowi LAN funkcję dostawcy usług internetowych lub dostawcy IPTV."
							}]
						},
						{
							type: "name",
							title: "Rosja",
							content: "Wybierz tę opcję, jeżeli twój usługodawca jest z Rosji i posiadasz wymagane parametry.",
							children: [{
								type: "name",
								title: "VLAN ID/Priorytet IPTV Multicast",
								content: "Możesz uruchomić funkcję IPTV multicast oraz skonfigurować identyfikator i priorytet sieci WLAN, zgodnie z wymaganiami swojego dostawcy usług internetowych."
							}]
						},
						{
							type: "name",
							title: "Singapur-ExStream",
							content: "Wybierz, jeżeli twoim dostawcą jest ExStream z Singapuru, a niezbędne parametry są z góry określone, włączając w to Priorytety Internet/IP-Phone/IPTV VLAN ID oraz funkcje portu LAN (1/2/3/4)."
						},
						{
							type: "name",
							title: "Malezja-Unifi",
							content: "Wybierz, jeżeli twoim dostawcą jest Unifi z Malezji, a niezbędne parametry są z góry określone, włączając w to Priorytety Internet/IP-Phone/IPTV VLAN ID oraz funkcje portu LAN (1/2/3/4)."
						},
						{
							type: "name",
							title: "Malezja-Maxis",
							content: "Wybierz, jeżeli twoim dostawcą jest Maxis z Malezji, a niezbędne parametry są z góry określone, włączając w to Internet/IP-Phone/identyfikatory i priorytety IPTV sieci WLAN oraz funkcje portu LAN (1/2/3/4)."
						},
						{
							type: "name",
							title: "Inny",
							content: "Wybierz, jeżeli twojego dostawcy nie ma liście, ale masz do dyspozycji niezbędne parametry, włączając w to Priorytety Internet/IP-Phone/IPTV sieci VLAN ID oraz funkcje portu LAN (1/2/3/4).",
							children: [{
								type: "name",
								title: "Internet/IP-Phone/VLAN ID IPTV/Priorytet",
								content: "Skonfiguruj VLAN ID oraz priorytety zgodnie z zaleceniami dostawcy."
							},{
								type: "name",
								title: "Tag 802.11Q",
								content: "Wybierz, aby oznaczać pakiety standardem 802.11Q."
							},{
								type: "name",
								title: "VLAN ID/Priorytet IPTV Multicast",
								content: "Możesz uruchomić funkcję IPTV multicast oraz skonfigurować identyfikator i priorytet sieci WLAN, zgodnie z wymaganiami swojego dostawcy usług internetowych."
							},{
								type: "name",
								title: "LAN 1/2/3/4",
								content: "Wybierz funkcję portu LAN: Internet, IP-Phone lub IPTV."
							}]
						}
					]
				},{
					type:"paragraph",
					content:"Naciśnij Zapisz, aby zapisać ustawienia."
				}
			]
		},

		DHCP_SERVER_SETTINGS: {
			TITLE: "Ustawienia",
			CONTENT: [{
				type: "name",
				title: "Serwer DHCP",
				content: "Domyślnie funkcja serwera DHCP (Dynamic Host Configuration Protocol) jest uruchomiona; serwer automatycznie przydziela parametry TCP/IP z puli adresów IP urządzeniom klienckim. Jeśli nie chcesz uruchamiać innego serwera DHCP lub ręcznie przydzielać parametrów TCP/IP każdemu z urządzeń klienckich podłączonych do sieci, NIE wyłączaj funkcji serwera DHCP."
			},{
				type: "name",
				title: "Pula adresów IP",
				content: "Wprowadź pulę adresów, które będą przydzielane klientom w sieci LAN."
			},{
				type: "name",
				title: "Czas przydzielenia adresu",
				content: "Wprowadź czas przydziału adresu IP. Wartość musi mieścić się w przedziale 2 - 2880 minut. Domyślna wartość to 120 minut."
			},{
				type: "name",
				title: "Brama domyślna",
				content: "Wprowadź adres bramy domyślnej. (Opcjonalnie)"
			},{
				type: "name",
				title: "Preferowany DNS/Alternatywny DNS",
				content: "Wprowadź parametry otrzymane od dostawcy usług internetowych. (Opcjonalnie)"
			},{
				type:"paragraph",
				content:"Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		RESERVED_IP_ADDRESS: {
			TITLE: "Rezerwacja adresów",
			CONTENT: [{
				type: "paragraph",
				content: "Rezerwacji adresu IP dla klienta podłączonego do routera może dokonać ręcznie. Raz zarezerwowany adres IP będzie stale przydzielany temu samemu klientowi przez serwer DHCP."
			},{
				type: "name",
				title: "Adres MAC",
				content: "Pokazuje adres MAC klienta wraz z zarezerwowanym przez serwer DHCP adresem IP."
			},{
				type: "name",
				title: "Zarezerwowany adres IP",
				content: "Pokazuje adres IP zarezerwowany dla klienta."
			},{
				type: "name",
				title: "Opis",
				content: "Pokazuje informacje na temat urządzenia klienckiego."
			},{
				type: "name",
				title: "Stan",
				content: "Pokazuje aktualny stan urządzenia klienckiego (włączony lub wyłączony)."
			},{
				type: "name",
				title: "Zmień",
				content: "Pozwala na edycję lub usunięcie danego klienta."
			},{
				type: "step",
				title: "Aby zarezerwować adres IP",
				content:[
					"1. Naciśnij Dodaj.",
					"2. Wprowadź adres MAC wybranego urządzenia klienckiego.",
					"3. Wprowadź adres IP, który chcesz zarezerwować.",
					"4. Wprowadź informacje na temat urządzenia klienckiego.",
					"5. Wybierz Uruchom.",
					"6. Naciśnij OK."
				]
			},{
				type: "step",
				title: "Aby edytować lub usunąć danego klienta",
				content: "Naciśnij ikonę Edytuj lub Usuń w tabeli, aby zmienić lub skasować odpowiedni wpis. "
			}]
		},

		DHCP_CLIENT_LIST: {
			TITLE: "Lista klientów DHCP",
			CONTENT: [{
				type: "name",
				title: "Numer klienta",
				content: "Wyświetla numer klienta DHCP."
			},{
				type: "name",
				title: "Nazwa klienta",
				content: "Wyświetla nazwę klienta DHCP."
			},{
				type: "name",
				title: "Adres MAC",
				content: "Wyświetla adres MAC."
			},{
				type: "name",
				title: "Przydzielone IP",
				content: "Wyświetla adres IP przydzielony klientowi DHCP."
			},{
				type: "name",
				title: "Czas przydzielenia",
				content: "Wyświetla liczbę wolnych adresów w puli DHCP."
			},{
				type: "name",
				title: "Odśwież",
				content: "Naciśnij, aby zaktualizować listę klientów DHCP."
			}]
		},

		DDNS: {
			TITLE: "Dynamiczny DNS",
			CONTENT: [{
				type: "paragraph",
				content: "Dynamiczny DNS pozwala na przypisanie stałej nazwy domenowej dla zmiennego adresu IP. Funkcja ta jest przydatna kiedy posiadasz stronę internetową, serwer FTP lub inną usługę na serwerze podłączonym do routera. Aby korzystać z tej funkcji, musisz założyć konto u dostawcy dynamicznego DNS, np. dyn.com."
			},{
				type: "step",
				title: "Aby skonfigurować usługę Dynamiczny DNS",
				content: [
					"1. Wybierz swojego dostawcę DDNS.",
					"2. Wprowadź Nazwę użytkownika oraz Hasło dla swojego konta DDNS.",
					"3. Wprowadź Domenę otrzymaną od dostawcy usług internetowych.",
					"4. Wybierz interwał aktualizacji z rozwijanej listy.",
					"5. Naciśnij przycisk Zaloguj, a następnie Zapisz."
				]
			},{
				type: "paragraph",
				content: "Aby przełączyć się na inne konto, naciśnij przycisk Wyloguj, a następnie zaloguj się ponownie, wprowadzając nową nazwę użytkownika i hasło."
			}]
		},


		ADVANCED_ROUTING_STATIC_ROUTING: {
			TITLE: "Routing statyczny",
			CONTENT: [{
				type: "paragraph",
				content: "Funkcja routing statyczny służy określaniu z góry trasy, którą muszą pokonać pakiety, aby dotrzeć do określonego punktu w sieci."
			},{
				type: "step",
				title: "Aby dodać trasę statyczną",
				content: [
					"1. Naciśnij przycisk Dodaj.",
					"2. Sieć docelowa - Wprowadź adres IP sieci docelowej w formacie dziesiętnym, aby przypisać danemu wpisowi stałą trasę.",
					"3. Maska podsieci - Wprowadź maskę podsieci w formacie dziesiętnym, aby oddzielić część sieciową adresu IP od części hosta.",
					"4. Brama domyślna - Wprowadź adres IP bramy domyślnej w formacie dziesiętnym, aby połączyć router z siecią lub hostem.",
					"5. Interfejs - Wybierz LAN lub WAN, aby określić sieć docelową.",
					"6. Opis - Wprowadź krótki opis dla danego wpisu.",
					"7. Wybierz Włącz.",
					"8. Naciśnij OK."
				]
			},{
				type: "step",
				title: "Aby zmienić lub usunąć istniejący wpis",
				content: "Naciśnij ikonę Edytuj lub Usuń w tabeli, aby zmienić lub skasować odpowiedni wpis. "
			}]
		},
		
		ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE: {
			TITLE: "Tablica routingu",
			CONTENT: [{
				type: "paragraph",
				content: "Tablica routingu wyświetla wszystkie trasy będące w użyciu."
			},{
				type: "paragraph",
				content: "Naciśnij przycisk Odśwież, aby zaktualizować wyświetlane informacje."
			}]
		},
		
		WIRELESS_REGION: {
			TITLE: "Ustawienia",
			CONTENT: [{
				type: "name",
				title: "Region",
				content: "Wybierz z menu kraj, w którym przebywasz. Jeżeli nie ma go na liście, może to oznaczać, że korzystanie z urządzenia bezprzewodowego w twojej lokalizacji podlega obostrzeniom."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		WIRELESS_24G: {	
			TITLE: "Sieć bezprzewodowa 2,4GHz",
			CONTENT: [{
				type: "name",
				title: "Włącz",
				content: "Zaznacz tę opcję, aby włączyć nadajnik bezprzewodowy 2,4GHz. Funkcja WPS wymaga włączenia tej opcji."
			},{
				type: "name",
				title: "Nazwa sieci bezprzewodowej (SSID)",
				content: "Zostaw nazwę domyślną lub wprowadź nazwę o długości do 32 znaków. Wielkość liter ma znaczenie."
			},{
				type: "name",
				title: "Ukryj nazwę sieci",
				content: "Zaznacz tę opcję, aby nazwa sieci bezprzewodowej 2,4GHz nie była wyświetlana na liście dostępnych sieci. Po wybraniu tej opcji, funkcja WPS nie będzie obsługiwana w tym paśmie."
			},{
				type: "name",
				title: "Zabezpieczenia",
				content: "Wybierz jeden z poniższych typów zabezpieczeń:",
				children: [{
					type: "name",
					title: "Brak zabezpieczeń",
					content: "Wybierz tę opcję, aby wyłączyć zabezpieczenia sieci bezprzewodowej. Zalecane jest jednak wybranie jednego z typów zabezpieczeń, aby chronić sieć przed nieautoryzowanym dostępem."
				},{
					type: "name",
					title: "WPA/WPA2-Personal",
					content: "Wybierz tę opcję, aby włączyć standardową metodę uwierzytelniania opartą na kluczu WPA. Jest to opcja zalecana, po jej wyborze skonfiguruj poniższe opcje. ",
					children: [{
						type: "name",
						title: "Wersja",
						content: "Wybierz wersję zabezpieczeń swojej sieci bezprzewodowej.",
						children: [{
							type: "name",
							title: "Automatyczna",
							content: "Obsługuje takie standardy WPA (Wi-Fi Protected Access), jak WPA i WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "Ta opcja oferuje wysoki poziom zabezpieczeń. Po wybraniu tej opcji, funkcja WPS nie będzie obsługiwana w tym paśmie."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "Opcja ta zapewnia wyższy poziom bezpieczeństwa niż WPA-PSK i zaleca się ją włączyć."
						}]
					},{
						type: "name",
						title: "Szyfrowanie",
						content: "Wybierz typ szyfrowania: TKIP, AES lub automatyczny (TKIP i AES). Nie zalecamy wyboru trybu TKIP, jeżeli router pracuje w trybie 802.11n, ponieważ szyfrowanie TKIP nie jest wspierane przez standard 802.11n. Funkcja WPS nie będzie obsługiwana w tym paśmie, jeżeli wybrane zostanie szyfrowanie TKIP."
					},{
						type: "name",
						title: "Hasło",
						content: "Wprowadź hasło połączenia bezprzewodowego, używając od 8 do 64 znaków ASCII lub znaków szesnastkowych."
					}]
				},{
					type: "name",
					title: "WPA/WPA2-Enterprise",
					content: "Wybierz tę opcję, aby włączyć zaawansowane uwierzytelnianie za pomocą serwera RADIUS. Po wybraniu tej opcji, funkcja WPS nie będzie obsługiwana w tym paśmie.",
					children: [{
						type: "name",
						title: "Wersja",
						content: "Wybierz wersję zabezpieczeń swojej sieci bezprzewodowej.",
						children:[{
							type: "name",
							title: "Automatyczna",
							content: "Obsługuje takie standardy WPA (Wi-Fi Protected Access), jak WPA i WPA2."
						},{
							type: "name",
							title: "WPA",
							content: "Włączona opcja zapewnia dobry poziom bezpieczeństwa."
						},{
							type: "name",
							title: "WPA2",
							content: "Opcja ta zapewnia wyższy poziom bezpieczeństwa niż WPA-PSK i zaleca się ją włączyć."
						}]
					},{
						type: "name",
						title: "Szyfrowanie",
						content: "Wybierz typ szyfrowania: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard) lub Auto (zarówno TKIP, jak i AES). NIE zaleca się korzystania z szyfrowania TKIP jeśli router pracuje w standardzie 802.11n, ponieważ TKIP nie jest obsługiwane w tym standardzie."
					},{
						type: "name",
						title: "Adres IP serwera RADIUS",
						content: "Wprowadź adres IP serwera RADIUS."
					},{
						type: "name",
						title: "Port serwera RADIUS",
						content: "Wprowadź port serwera RADIUS."
					},{
						type: "name",
						title: "Hasło serwera RADIUS",
						content: "Wprowadź hasło do serwera RADIUS."
					}]
				},{
				type: "name",
				title: "WEP",
				content: "Wybierz tę opcję, aby włączyć podstawowe zabezpieczenia, jeżeli któreś z twoich urządzeń obsługuje tylko zabezpieczenia WEP. Po wybraniu tej opcji, funkcja WPS nie będzie obsługiwana w tym paśmie.",
				children: [{
					type: "name",
					title: "Typ",
					content: "Wybierz typ uwierzytelniania dla swojej sieci bezprzewodowej. Domyślnie ustawiona jest funkcja Automatyczna, która umożliwia automatyczny wybór Systemu otwartego oraz Klucza wspólnego, w zależności od wymagań łączącego się urządzenia."
				},{
					type: "name",
					title: "Format klucza WEP",
					content: "Użyj formatu ASCII lub wybierz szesnastkowy. Format ASCII to kombinacja znaków ASCII. Format szesnastkowy to kombinacja znaków szesnastkowych (0-9, A-F, a-f)."
				},{
					type: "name",
					title: "Typ Klucza",
					content: "Wybierz długość klucza WEP.",
					children: [{
						type: "name",
						title: "64-bity",
						content: "Możesz wprowadzić 10 znaków szesnastkowych (0-9, a-f, A-F) lub 5 znaków ASCII."
					},{
						type: "name",
						title: "128-bity",
						content: "Możesz wprowadzić 26 znaków szesnastkowych (0-9, a-f, A-F) lub 13 znaków ASCII."
					}]
				},{
					type: "name",
					title: "Klucz",
					content: "Wprowadź klucz WEP w odpowiednie pole."
				}]
			}]
			},{
				type: "name",
				title: "Tryb",
				content: "Wybierz tryb transmisji."
			},{
				type: "name",
				title: "Szerokość kanału",
				content: "Wybierz szerokość kanału (szerokość pasma) dla sieci bezprzewodowej 2,4GHz."
			},{
				type: "name",
				title: "Kanał",
				content: "Wybierz kanał dla sieci bezprzewodowej 2,4GHz. Jeżeli problemy z działaniem sieci bezprzewodowej nie występują, zalecane jest pozostawienie tej opcji na ustawieniu automatycznym."
			},{
				type: "name",
				title: "Moc transmisji",
				content: "Aby określić moc transmisji danych, wybierz spośród opcji Wysoka, Średnia lub Niska. Domyślnie ustawiona jest Wysoka (zalecane)."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		WIRELESS_5G: {	
			TITLE: "Połączenie bezprzewodowe 5GHz",
			CONTENT: [{
				type: "name",
				title: "Włącz",
				content: "Zaznacz tę opcję, aby włączyć nadajnik bezprzewodowy 5GHz. WPS wymaga włączenia tej opcji."
			},{
				type: "name",
				title: "Nazwa sieci bezprzewodowej (SSID)",
				content: "Zostaw nazwę domyślną lub wprowadź nazwę o długości do 32 znaków. Wielkość liter ma znaczenie."
			},{
				type: "name",
				title: "Ukryj nazwę sieci",
				content: "Zaznacz tę opcję, aby nazwa sieci bezprzewodowej 5GHz nie była wyświetlana na liście dostępnych sieci. Po wybraniu tej opcji, funkcja WPS nie będzie obsługiwana w tym paśmie."
			},{
				type: "name",
				title: "Zabezpieczenia",
				content: "Wybierz jeden z poniższych typów zabezpieczeń:",
				children: [{
					type: "name",
					title: "Brak zabezpieczeń",
					content: "Wybierz tę opcję, aby wyłączyć zabezpieczenia sieci bezprzewodowej. Zalecane jest jednak wybranie jednego z typów zabezpieczeń, aby chronić sieć przed nieautoryzowanym dostępem."
				},{
					type: "name",
					title: "WPA/WPA2-Personal",
					content: "Wybierz tę opcję, aby włączyć standardową metodę uwierzytelniania opartą na kluczu WPA. Jest to opcja zalecana, po jej wyborze skonfiguruj poniższe opcje. ",
					children: [{
						type: "name",
						title: "Wersja",
						content: "Wybierz wersję zabezpieczeń swojej sieci bezprzewodowej.",
						children: [{
							type: "name",
							title: "Automatyczna",
							content: "Obsługuje takie standardy WPA (Wi-Fi Protected Access), jak WPA i WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "Ta opcja oferuje wysoki poziom zabezpieczeń. Po wybraniu tej opcji, funkcja WPS nie będzie obsługiwana w tym paśmie."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "Opcja ta zapewnia wyższy poziom bezpieczeństwa niż WPA-PSK i zaleca się ją włączyć."
						}]
					},{
						type: "name",
						title: "Szyfrowanie",
						content: "Wybierz typ szyfrowania: TKIP, AES lub automatyczny (TKIP i AES). Nie zalecamy wyboru trybu TKIP, jeżeli router pracuje w trybie 802.11n, ponieważ szyfrowanie TKIP nie jest wspierane przez standard 802.11n. Funkcja WPS nie będzie obsługiwana w tym paśmie, jeżeli wybrane zostanie szyfrowanie TKIP."
					},{
						type: "name",
						title: "Hasło",
						content: "Wprowadź hasło połączenia bezprzewodowego, używając od 8 do 64 znaków ASCII lub znaków szesnastkowych."
					}]
				},{
					type: "name",
					title: "WPA/WPA2-Enterprise",
					content: "Wybierz tę opcję, aby włączyć zaawansowane uwierzytelnianie za pomocą serwera RADIUS. Po wybraniu tej opcji, funkcja WPS nie będzie obsługiwana w tym paśmie.",
					children: [{
						type: "name",
						title: "Wersja",
						content: "Wybierz wersję zabezpieczeń swojej sieci bezprzewodowej.",
						children: [{
							type: "name",
							title: "Automatyczna",
							content: "Obsługuje takie standardy WPA (Wi-Fi Protected Access), jak WPA i WPA2."
						},{
							type: "name",
							title: "WPA",
							content: "Włączona opcja zapewnia dobry poziom bezpieczeństwa."
						},{
							type: "name",
							title: "WPA2",
							content: "Opcja ta zapewnia wyższy poziom bezpieczeństwa niż WPA-PSK i zaleca się ją włączyć."
						}]
					},{
						type: "name",
						title: "Szyfrowanie",
						content: "Wybierz typ szyfrowania: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard) lub Auto (zarówno TKIP, jak i AES). NIE zaleca się korzystania z szyfrowania TKIP jeśli router pracuje w standardzie 802.11n, ponieważ TKIP nie jest obsługiwane w tym standardzie."
					},{
						type: "name",
						title: "Adres IP serwera RADIUS",
						content: "Wprowadź adres IP serwera RADIUS."
					},{
						type: "name",
						title: "Port serwera RADIUS",
						content: "Wprowadź port serwera RADIUS."
					},{
						type: "name",
						title: "Hasło serwera RADIUS",
						content: "Wprowadź hasło do serwera RADIUS."
					}]
				},{
					type: "name",
					title: "WEP",
					content: "Wybierz tę opcję, aby włączyć podstawowe zabezpieczenia, jeżeli któreś z twoich urządzeń obsługuje tylko zabezpieczenia WEP. Po wybraniu tej opcji, funkcja WPS nie będzie obsługiwana w tym paśmie.",
					children: [{
						type: "name",
						title: "Typ",
						content: "Wybierz typ uwierzytelniania dla swojej sieci bezprzewodowej. Domyślnie ustawiona jest funkcja Automatyczna, która umożliwia automatyczny wybór Systemu otwartego oraz Klucza wspólnego, w zależności od wymagań łączącego się urządzenia."
					},{
						type: "name",
						title: "Format klucza WEP",
						content: "Możesz wybrać format ASCII lub Szesnastkowy. Format ASCII oznacza kombinację dowolnych znaków alfanumerycznych. Szesnastkowy oznacza kombinację określonych znaków alfanumerycznych (0-9, A-F, a-f)."
					},{
						type: "name",
						title: "Typ Klucza",
						content: "Wybierz długość klucza WEP.",
						children:[{
							type: "name",
							title: "64-bity",
							content: "Możesz wprowadzić 10 znaków szesnastkowych (0-9, a-f, A-F) lub 5 znaków ASCII."
						},{
							type: "name",
							title: "128-bity",
							content: "Możesz wprowadzić 26 znaków szesnastkowych (0-9, a-f, A-F) lub 13 znaków ASCII."
						}]
					},{
						type: "name",
						title: "Klucz",
						content: "Wprowadź klucz WEP."
					}]
				}]
			},{
				type: "name",
				title: "Tryb",
				content: "Wybierz mieszany tryb transmisji."
			},{
				type: "name",
				title: "Szerokość kanału",
				content: "Wybierz szerokość kanału (szerokość pasma) dla sieci bezprzewodowej 5GHz."
			},{
				type: "name",
				title: "Kanał",
				content: "Wybierz kanał dla sieci bezprzewodowej 2,4GHz. Jeżeli problemy z działaniem sieci bezprzewodowej nie występują, zalecane jest pozostawienie tej opcji na ustawieniu automatycznym."
			},{
				type: "name",
				title: "Moc transmisji",
				content: "Aby określić moc transmisji danych, wybierz spośród opcji Wysoka, Średnia lub Niska. Zaleca się pozostawić domyślnie ustawioną moc Wysoką."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		WIRELESS_60G: {	
			TITLE: "Sieć bezprzewodowa 60GHz",
			CONTENT: [{
				type: "name",
				title: "Włącz sieć",
				content: "Zaznacz tę opcję, aby włączyć połącznie bezprzewodowe o częstotliwości 60GHz. Funkcja WPS nie jest obsługiwana w tym paśmie."
			},{
				type: "name",
				title: "Nazwa sieci bezprzewodowej (SSID)",
				content: "Zostaw nazwę domyślną lub wprowadź nazwę o długości do 32 znaków. Wielkość liter ma znaczenie."
			},{
				type: "name",
				title: "Ukryj nazwę sieci",
				content: "Zaznacz tę opcję, jeżeli chcesz ukryć nazwę sieci 60GHz (SSID). Funkcja WPS nie jest obsługiwana w tym paśmie."
			},{
				type: "name",
				title: "Zabezpieczenia",
				content: "Wybierz jeden z poniższych typów zabezpieczeń:",
				children: [{
					type: "name",
					title: "Brak zabezpieczeń",
					content: "Wybierz tę opcję, aby wyłączyć zabezpieczenia sieci bezprzewodowej. Zalecane jest jednak wybranie jednego z typów zabezpieczeń, aby chronić sieć przed nieautoryzowanym dostępem."
				},{
					type: "name",
					title: "WPA2-Personal",
					content: "Wybierz tę opcję, aby włączyć standardową metodę uwierzytelniania opartą na kluczu WPA. Połączenie szyfruje GCMP. Jest to opcja zalecana, po jej wyborze skonfiguruj poniższe opcje. ",
					children: [{
						type: "name",
						title: "Hasło",
						content: "Wprowadź hasło połączenia bezprzewodowego, używając od 8 do 64 znaków ASCII lub znaków szesnastkowych."
					}]
				},{
					type: "name",
					title: "WPA2-Enterprise",
					content: "Wybierz tę opcję, aby włączyć zaawansowaną metodę uwierzytelniania za pomocą serwer RADIUS. Połączenie szyfruje GCMP. Funkcja WPS nie jest obsługiwana w tym paśmie.",
					children: [{
						type: "name",
						title: "Adres IP serwera RADIUS",
						content: "Wprowadź adres IP serwera RADIUS."
					},{
						type: "name",
						title: "Port serwera RADIUS",
						content: "Wprowadź port serwera RADIUS."
					},{
						type: "name",
						title: "Hasło serwera RADIUS",
						content: "Wprowadź hasło do serwera RADIUS."
					}]
				}]
			},{
				type: "name",
				title: "Kanał",
				content: "Wybierz kanał dla sieci bezprzewodowej 60GHz. Zaleca się pozostawić ustawienie Auto, jeżeli przerwy w połączeniu bezprzewodowym nie występują."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		WPS: {	
			TITLE: "PIN routera",
			CONTENT: [{
				type: "paragraph",
				content: "Inne urządzenia mogą połączyć się z routerem za pomocą jego kodu PIN."
			},{
				type: "name",
				title: "PIN routera",
				content: "Aktywuj tę funkcję, aby urządzenia łączyły się z routerem przy użyciu kodu PIN routera."
			},{
				type: "name",
				title: "PIN",
				content: "Wyświetla kod PIN routera. Domyślny kod PIN znajduje się na naklejce u spodu routera. Naciśnij przycisk Generuj, aby wylosować nowy kod PIN lub przycisk Domyślny, aby przywrócić domyślny kod PIN."
			}]
		},

		WPS_WIZARD: {
			TITLE: "Kreator Instalacji WPS",
			CONTENT:[{
				type: "paragraph",
				content: "Dla funkcji WPS możliwe są następujące konfiguracje: włącz <Włącz odbiornik bezprzewodwoy>, wyłącz <Ukryj SSID>, a zabezpieczenia to <Brak zabezpieczeń> lub <WPA/WPA2-Personal>(WPA2-PSK lub automatyczne + PSK lub automatyczne)."
			},{
				type: "name",
				title: "Za pomocą przycisku (Zalecane)",
				content: "Wybierz tę metodę konfiguracji, aby za pomocą funkcji WPS umożliwić urządzeniom obsługującym tę funkcję, łatwe nawiązywanie połączeń z siecią bezprzewodową, jedynie poprzez naciśnięcie przycisku WPS lub przycisku Połącz."
			},{
				type: "name",
				title: "PIN",
				content: "Wybierz tę metodę konfiguracji, aby dodać urządzenie ręcznie, wprowadzając numer PIN WPS urządzenia bezprzewodowego, a następnie naciskając przycisk Połącz."
			}]
		},

		WIRELESS_STATISTICS: {	
			TITLE: "Aktywne odbiorniki bezprzewodowe",
			CONTENT: [{
				type: "name",
				title: "Numer klienta",
				content: "Wyświetla numer połączonego urządzenia bezprzewodowego."
			},{
				type: "name",
				title: "Adres MAC",
				content: "Wyświetla adres MAC połączonego urządzenia bezprzewodowego."
			},{
				type: "name",
				title: "Typ połączenia",
				content: "Wyświetla pasmo połączenia bezprzewodowego (2,4GHz, 5GHz lub 60GHz) powiązanego klienta bezprzewodowego."
			},{
				type: "name",
				title: "Zabezpieczenia",
				content: "Wyświetla typ zabezpieczeń, z którego korzysta urządzenie bezprzewodowe."
			},{
				type: "name",
				title: "Pakiety otrzymane",
				content: "Wyświetla pakiety odebrane przez urządzenie bezprzewodowe."
			},{
				type: "name",
				title: "Pakiety wysłane",
				content: "Wyświetla pakiety wysłane przez urządzenie bezprzewodowe."
			},{
				type: "paragraph",
				content: "Naciśnij przycisk Odśwież, aby zaktualizować wyświetlane informacje."
			}]
		},
		
		GUEST_NETWORK_SETTINGS:{
			TITLE: "Ustawienia",
			CONTENT: [{
				type: "paragraph",
				content: "Funkcja sieci dla gości pozwala na stworzenie sieci bezprzewodowej z osobną nazwą i hasłem, co umożliwia udostępnienie połączenia z Internetem z zachowaniem bezpieczeństwa sieci głównej."
			},{
				type: "name",
				title: "Pozwól gościom na komunikację między sobą",
				content: "Zaznacz tę opcję, aby klienci sieci dla gości widzieli się i mogli komunikować się między sobą."
			},{
				type: "name",
				title: "Pozwól gościom na dostęp do sieci lokalnej",
				content: "Zaznacz tę opcję, aby klienci sieci dla gości mieli dostęp do zasobów sieci lokalnej, takich jak np. drukarki lub udostępnione pliki."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		GUEST_NETWORK_WIRELESS:{	
			TITLE: "Sieć bezprzewodowa 2,4GHz/5GHz",
			CONTENT: [{
				type: "name",
				title: "Włącz sieć dla gości",
				content: "Zaznacz tę opcję, aby włączyć funkcję sieci dla gości."
			},{
				type: "name",
				title: "Nazwa sieci bezprzewodowej (SSID)",
				content: "Użyj domyślnej nazwy sieci dla gości lub utwórz własną (do 32 znaków)."
			},{
				type: "name",
				title: "Ukryj nazwę sieci",
				content: "Zaznacz tę opcję, aby nazwa sieci nie była widoczna na liście dostępnych sieci bezprzewodowych."
			}/*,{
				type:"name",
				id:"pwd_mode",
				title:"Interwał aktualizacji hasła",
				content:"Wybierz interwał aktualizacji hasła sieci dla gości."
			}*/,{
				type: "name",
				title: "Zabezpieczenia",
				content: "Jeżeli hasło nie ma być aktualizowane, wybierz jeden z poniższych typów zabezpieczeń:",
				children: [{
					type: "name",
					title: "Brak zabezpieczeń",
					content: "Wybierz tę opcję, aby wyłączyć zabezpieczenia sieci bezprzewodowej. Zalecane jest jednak wybranie jednego z typów zabezpieczeń, aby chronić sieć przed nieautoryzowanym dostępem."
				},{
					type: "name",
					title: "WPA/WPA2-Personal",
					content: "Wybierz tę opcję, aby włączyć standardową metodę uwierzytelniania, w oparciu o klucz dzielony (hasło). Opcja ta jest domyślna i zalecana. Wymaga także dodatkowych konfiguracji.",
					children: [{
						type: "name",
						title: "Wersja",
						content: "Wybierz wersję zabezpieczeń swojej sieci bezprzewodowej.",
						children: [{
							type: "name",
							title: "Automatyczna",
							content: "Obsługuje takie standardy WPA (Wi-Fi Protected Access), jak WPA i WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "Włączona opcja zapewnia dobry poziom bezpieczeństwa."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "Opcja ta zapewnia wyższy poziom bezpieczeństwa niż WPA-PSK i zaleca się ją włączyć."
						}]
					},{
						type: "name",
						title: "Szyfrowanie",
						content: "Wybierz typ szyfrowania: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard) lub Auto (zarówno TKIP, jak i AES). NIE zaleca się korzystania z szyfrowania TKIP jeśli router pracuje w standardzie 802.11n, ponieważ TKIP nie jest obsługiwane w tym standardzie."
					}]
			}]},{
				type: "name",
				title: "Hasło",
				content: "Użyj hasła wygenerowanego losowo lub wprowadź własne, składające się z 8 do 63 znaków ASCII lub 8 do 64 znaków szesnastkowych (0-9, a-f, A-F)."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},

		NAT: {
			TITLE: "Application Layer Gateway(ALG)",
			CONTENT: [{
				type: "paragraph",
				content: "ALG umożliwia filtrom przeglądania NAT podłączenie do bramy, aby wspierać translację adresów i portów dla określonych protokołów \"kontrola/dane\" warstwy aplikacji: FTP, TFTP, H323 itd. Zaleca się włączenie funkcji ALG."
			},{
				type: "name",
				title: "Włącz FTP ALG",
				content: "Umożliwia klientom i serwerom FTP (File Transfer Protocol) przesył danych poprzez NAT."
			},{
				type: "name",
				title: "Włącz TFTP ALG",
				content: "Umożliwia klientom i serwerom TFTP (Trivial File Transfer Protocol) przesył danych poprzez NAT."
			},{
				type: "name",
				title: "Włącz H323 ALG",
				content: "Umożliwia klientom Microsoft NetMeeting na komunikację poprzez NAT."
			},{
				type: "name",
				title: "Włącz RTSP ALG",
				content: "Umożliwia klientom media player na komunikację z serwerami przesyłu strumieniowego poprzez NAT."
			},{
				type: "name",
				title: "Włącz PPTP Passthrough",
				content: "Umożliwia tunelowanie sesji Point-to-Point poprzez sieć IP i przekazywanie przez router."
			},{
				type: "name",
				title: "Włącz L2TP Passthrough",
				content: "Umożliwia tunelowanie Warstwy 2 sesji Point-to-Point poprzez sieć IP i przekazywanie przez router."
			},{
				type: "name",
				title: "Włącz IPSec Passthrough",
				content: "Umożliwia tunelowanie zabezpieczeń protokołów IPSec poprzez sieć IP i przekazywanie przez router. IPSec korzysta z zabezpieczeń kryptograficznych, aby zapewnić bezpieczeństwo połączeń nawiązywanych poprzez sieci IP."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},


		VIRTUAL_SERVERS: {
			TITLE: "Serwery wirtualne",
			CONTENT: [{
				type: "paragraph",
				content: "Serwery wirtualne umożliwiają dostęp z sieci zewnętrznej do usług uruchomionych na urządzeniach podłączonych do sieci lokalnej. Serwer wirtualny określany jest jako port zewnętrzny. Wszelkie żądania z Internetu kierowane do tego portu będą przekierowywane do wyznaczonego komputera, którego adres IP musi być skonfigurowany na statyczny lub zarezerwowany."
			},{
				type: "name",
				title: "Typ usługi",
				content: "Wyświetla nazwę serwera wirtualnego."
			},{
				type: "name",
				title: "Port zewnętrzny",
				content: "Wyświetla numer portu lub zakres portów, z których korzysta serwer wirtualny."
			},{
				type: "name",
				title: "Adres IP",
				content: "Wyświetla adres IP komputera z uruchomioną usługą."
			},{
				type: "name",
				title: "Port wewnętrzny",
				content: "Wyświetla numer portu komputera z uruchomioną usługą."
			},{
				type: "name",
				title: "Protokół",
				content: "Wyświetla protokół, z którego korzysta usługa: TCP, UDP lub Wszystkie (Wszystkie protokoły obsługiwane przez router)."
			},{
				type: "name",
				title: "Stan",
				content: "Wyświetla aktualny stan (włączony lub wyłączony) określnej reguły filtrowania."
			},{
				type: "name",
				title: "Zmień",
				content: "Wyświetla opcję Zmiany lub Usunięcia poszczególnych reguł."
			},{
				type: "step",
				title: "Aby dodać nową regułę ",
				content: [
					"1. Naciśnij przycisk Dodaj.",
					"2. Naciśnij Wyświetl zdefiniowane usługi i wybierz usługę z listy, aby automatycznie wstawić odpowiedni numer portu w pola Port zewnętrzny i Port wewnętrzny. Jeśli usługi nie ma na liście, wprowadź numer portu zewnętrznego (np. 21) lub zakres portów (np. 21-25). Jeśli wartość w polu Port wewnętrzny jest taka sama jak w polu Port zewnętrzny, pozostaw je puste. Jeśli korzystasz tylko z Portu zewnętrznego wprowadź określony numer portu (np. 21). W polu Adres IP wprowadź w formacie dziesiętnym adres IP komputera z uruchomioną usługą.",
					"3. Wybierz protokół usługi: TCP, UDP, lub Wszystkie z rozwijanej listy protokołów.",
					"4. Wybierz Włącz.",
					"5. Naciśnij przycisk OK."
				]
			},{
				type: "step",
				title: "Aby zmienić lub usunąć regułę Serwera wirtualnego",
				content: "Naciśnij ikonę Edytuj lub Usuń w tabeli, aby zmienić lub skasować odpowiedni wpis. "
			},{
				type: "step",
				title: "Aby usunąć kilka reguł",
				content: "Zaznacz wszystkie reguły, które chcesz usunąć i naciśnij przycisk Usuń, znajdujący się nad tabelką."
			},{
				type: "note",
				title: "Uwaga",
				content: "Jeśli twoje urządzenie lokalne ma do dyspozycji więcej niż jeden typ usługi, konieczne jest stworzenie reguły dla każdej z nich."
			}]
		},

		PORT_TRIGGERING: {
			TITLE: "Port Triggering",
			CONTENT: [{
				type: "paragraph",
				content: "Port Triggering służy do przekierowywania ruchu do określonego punktu serwera w sieci."
			},{
				type: "name",
				title: "Usługa",
				content: "Wyświetla nazwę usługi."
			},{
				type: "name",
				title: "Port otwierający",
				content: "Wyświetla port ruchu wychodzącego, aby umożliwić utworzenie reguły filtrowania połączeń wychodzących."
			},{
				type: "name",
				title: "Protokół otwierający",
				content: "Wyświetla protokół, z którego korzysta port otwierający. TCP, UDP lub Wszystkie (Wszystkie protokoły obsługiwane przez router)."
			},{
				type: "name",
				title: "Port zewnętrzny",
				content: "Wyświetla port lub zakres portów, z których korzysta system zdalny. Odpowiedź zostanie przekierowana za pomocą jednego z tych portów do komputera, który utworzył daną regułę. Maksymalnie można wprowadzić 5 grup portów (lub części portów). Każda grupa portów musi być oddzielona \",\" (przecinkiem), na przykład: 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
			},{
				type: "name",
				title: "Protokół zewnętrzny",
				content: "Wyświetla protokół, z którego korzysta port odbierający: TCP, UDP lub Wszystkie (Wszystkie protokoły obsługiwane przez router)."
			},{
				type: "name",
				title: "Stan",
				content: "Wyświetla aktualny stan (włączony lub wyłączony) określnej reguły filtrowania."
			},{
				type: "name",
				title: "Zmień",
				content: "Wyświetla opcję Zmiany lub Usunięcia poszczególnych reguł."
			},{
				type: "step",
				title: "Definiowanie reguł Port Triggering",
				content: [{
					type: "note",
					title: "Uwaga",
					content: "Tylko jeden komputer na raz może stosować daną regułę."
				},
					"1. Naciśnij przycisk Dodaj.",
					"2. Naciśnij Wyświetl zdefiniowane usługi i wybierz usługę z listy, aby automatycznie wstawić wartości domyślne w odpowiednie pola. Jeśli chcesz dodać usługę, której nie ma na liście, ręcznie wprowadź wartości w pola Usługa, Port otwierający, Protokół otwierający, Port zewnętrzny oraz Protokół zewnętrzny.",
					"3. Wybierz Włącz.",
					"4. Naciśnij OK."
				]
			},{
				type: "step",
				title: "Aby zmienić lub usunąć regułę Port Triggering",
				content: "Naciśnij ikonę Edytuj lub Usuń w tabeli, aby zmienić lub skasować odpowiedni wpis. "
			},{
				type: "step",
				title: "Aby usunąć kilka reguł Port Triggering",
				content: "Zaznacz wszystkie reguły, które chcesz usunąć i naciśnij przycisk Usuń, znajdujący się nad tabelką."
			}]
		},

		DMZ: {
			TITLE: "DMZ",
			CONTENT: [{
				type: "paragraph",
				content: "Funkcja hosta DMZ (Demilitarized Zone) poprzez połączenie internetowe umożliwia lokalnemu komputerowi dostęp do usług specjalnych, takich jak gry online czy wideokonferencje. Zasadniczo DMZ umożliwia każdemu z komputerów w sieci LAN na otwarcie wszystkich swoich portów. Dany komputer musi mieć jedynie ustawiony statyczny adres IP oraz uruchomioną funkcję klienta DHCP."
			},{
				type: "step",
				title: "Aby przydzielić komputerowi lub serwerowi funkcję serwera DMZ",
				content: [
					"1. Naciśnij przycisk Włącz DMZ.",
					"2. W polu Adres IP hosta DMZ wpisz adres IP komputera lokalnego, aby przydzielić mu funkcję hosta DMZ.",
					"3. Naciśnij przycisk Zapisz."
				]
			}]
		},
		
		UPNP: {
			TITLE: "UPnP",
			CONTENT: [{
				type: "paragraph",
				content: "Domyślnie funkcja UPnP (Universal Plug-and-Play) jest włączona, aby umożliwić urządzeniom, takim jak komputery czy sprzęt z usługą internetową, automatyczne identyfikowanie siebie nawzajem oraz komunikowanie się ze sobą w sieci lokalnej."
			},{
				type: "paragraph",
				content: "Lista aktualnych ustawień UPnP wyświetla informacje na temat urządzenia UPnP."
			},{
				type: "name",
				title: "Opis usługi",
				content: "Wyświetla krótki opis komputera lokalnego, który zainicjował żądanie UPnP."
			},{
				type: "name",
				title: "Port zewnętrzny",
				content: "Wyświetla otwarty port zewnętrzny komputera lokalnego."
			},{
				type: "name",
				title: "Protokół",
				content: "Wyświetla typ protokołu sieci, z którego korzysta komputer lokalny."
			},{
				type: "name",
				title: "Adres IP",
				content: "Wyświetla adres IP komputera lokalnego."
			},{
				type: "name",
				title: "Port wewnętrzny",
				content: "Wyświetla otwarty port wewnętrzny, z którego korzysta komputer lokalny."
			},{
				type: "paragraph",
				content: "Naciśnij przycisk Odśwież, aby zaktualizować Listę ustawień UPnP."
			}]
		},
		
		DISK_SETTING: {	
			TITLE: "Ustawienia urządzeń",
			CONTENT: [{
				type: "paragraph",
				content: "Na stronie Ustawienia urządzeń wyświetlane są informacje dotyczące każdego z urządzeń pamięci masowej USB, podłączonych do portu USB."
			},{
				type: "name",
				title: "Skanuj",
				content: "Zwykle router automatycznie wykrywa nowo podłączone urządzenie. Jeśli tak się jednak nie zdarzy, naciśnij ten przycisk, aby wyszukać wszystkie podłączone urządzenia. Następnie odśwież stronę, aby zaktualizować informacje."
			},{
				type: "name",
				title: "Wolumin",
				content: "Wyświetla nazwę woluminu podłączonego urządzenia."
			},{
				type: "name",
				title: "Pojemność",
				content: "Wyświetla całkowitą pojemność podłączonego urządzenia."
			},{
				type: "name",
				title: "Wolne miejsce",
				content: "Wyświetla ilość wolnego miejsca na podłączonym urządzeniu."
			},{
				type: "name",
				title: "Bezpieczne usuwanie",
				content: "Naciśnij ten przycisk, aby odmontować podłączony napęd przed jego fizycznym rozłączeniem."
			},{
				type: "paragraph",
				content: "Zauważ, że przycisk Bezpieczne usuwanie pojawia się jedynie wtedy, gdy urządzenie pamięci masowej USB jest podłączone do routera. Nie da się wysunąć urządzenia USB podczas jego pracy."
			},{
				type: "name",
				title: "Stan",
				content: "Pojawia się jedynie wtedy, gdy urządzenie pamięci masowej USB podłączone jest do routera. Zaznacz tę opcję, aby włączyć udostępnianie plików urządzenia USB."
			},{
				type: "step",
				title: "Aby skonfigurować serwer plików",
				content: [
				"1. Podłącz urządzenie USB do portu USB za pomocą kabla USB.",
				"2. Router powinien automatycznie wykryć podłączone urządzenie USB oraz wyświetlić informacje na temat nośnika w sekcji Ustawienia Urządzenia. W innym przypadku, naciśnij przycisk Skanuj.",
				"3. Wybierz Aktywny, aby włączyć udostępnianie plików."
				]
			}]
		},
		
		FOLDER_SHARE_ACCOUNT: {	
			TITLE: "Konta dostępowe",
			CONTENT: [{
				type: "name",
				title: "Konto",
				content: "Aby uzyskać dostęp do udostępnionych plików i folderów, wybierz Użyj domyślnego konta lub wybierz Użyj nowego konta i wprowadź poniższe dane, tworząc nowe konto."
			},{
				type: "name",
				title: "Nazwa użytkownika/Hasło",
				content: "Utwórz nazwę użytkownika składającą się z 1 - 15 znaków alfanumerycznych i podkreśleń oraz hasło składające się z 1 - 15 znaków ASCII. Wielkość znaków ma znaczenie."
			},{
				type: "name",
				title: "Potwierdź hasło",
				content: "Wpisz ponownie hasło, aby potwierdzić, że jest prawidłowe. Wielkość liter ma znaczenie."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		FOLDER_SHARE_SETTINGS: {
			TITLE: "Ustawienia udostępniania",
			CONTENT: [{
				type: "name",
				title: "Nazwa serwera",
				content: "Wyświetla nazwę stosowaną do uzyskiwania dostępu do zasobów podłączonego urządzenia USB. Nazwa musi składać się z 4 -15 znaków alfanumerycznych, podkreśleń lub myślników."
			},{
				type: "name",
				title: "Włącz",
				content: "Wybierz, aby ustawić metodę dostępu."
			},{
				type: "name",
				title: "Metoda dostępu",
				content: "Istnieją trzy metody uzyskiwania dostępu do podłączonego urządzenia USB. Możesz wybrać jedną lub więcej metod dostępu poprzez ich zaznaczenie.",
				children: [{
					type: "name",
					title: "Otoczenie sieciowe",
					content: "Włączona funkcja pozwala użytkownikom sieci na dostęp do urządzenia USB za pomocą przydzielonego adresu IP (np. \\\\192.168.0.1)."
				},{
					type: "name",
					title: "FTP",
					content: "Włączona funkcja pozwala klientom FTP sieci lokalnej na dostęp do urządzenia USB za pomocą przydzielonego adresu IP oraz numeru portu serwera FTP (np. ftp://192.168.0.1:21)."
				},{
					type: "name",
					title: "FTP (przez Internet)",
					content: "Włączona funkcja pozwala użytkownikom na zdalny dostęp do nośnika USB za pomocą serwera FTP za pośrednictwem połączenia internetowego. Istnieje możliwość zarówno pobierania, jak i wgrywania plików. Aby zmienić numer portu serwera FTP, wprowadź numer portu i naciśnij przycisk Zapisz, aby wprowadzić zmiany."
				}]
			},{
				type: "name",
				title: "Link",
				content: "Wyświetla adres, z którego należy skorzystać, aby uzyskać dostęp do urządzenia USB."
			},{
				type: "name",
				title: "Port",
				content: "Wyświetla port używany przez serwer FTP. Użyj domyślnej wartości 21 lub wprowadź wartość pomiędzy 1024 a 65535."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		FOLDER_SHARE_FOLDERS: {
			TITLE: "Udostępnianie folderów",
			CONTENT: [{
				type: "name",
				title: "Udostępnij wszystko",
				content: "Zaznacz Włącz, aby udostępnić wszystkie pliki i foldery, zaznacz Wyłącz aby udostępnić tylko wybrane foldery."
			},{
				type: "name",
				title: "Wymagaj uwierzytelniania",
				content: "Zaleca się włączyć uwierzytelnianie, aby od użytkowników wymagane było podanie nazwy użytkownika i hasła przed uzyskaniem dostępu do udostępnionych folderów."
			},{
				type: "name",
				title: "Nazwa folderu",
				content: "Wyświetla nazwę udostępnionego folderu."
			},{
				type: "name",
				title: "Ścieżka dostępu",
				content: "Wyświetla ścieżkę dostępu do udostępnionego folderu."
			},{
				type: "name",
				title: "Udostępnianie multimediów",
				content: "Wyświetla informacje na temat udostępniania plików multimedialnych."
			},{
				type: "name",
				title: "Nazwa woluminu",
				content: "Wyświetla nazwę udostępnionego woluminu."
			},{
				type: "name",
				title: "Stan",
				content: "Wyświetla stan udostępnionego folderu za pomocą ikony żarówki."
			},{
				type: "name",
				title: "Zmień",
				content: "Umożliwia Edycję lub Usunięcie udostępnionego folderu."
			},{
				type: "name",
				title: "Przeglądaj",
				content: "Naciśnij, aby wyszukać udostępniony folder."
			},{
				type: "name",
				title: "Zezwól na dostęp sieci dla gości",
				content: "Zaznacz tę opcję, aby umożliwić klientom podłączonym do sieci dla gości na dostęp do udostępnionych folderów."
			},{
				type: "name",
				title: "Wymagaj uwierzytelniania",
				content: "Zaznacz tę opcję, aby użytkownik przy próbie uzyskania dostępu do zasobów musiał podać odpowiednią nazwę użytkownika oraz hasło."
			},{
				type: "name",
				title: "Włącz możliwość zapisu",
				content: "Zaznacz tę opcję, aby umożliwić użytkownikom wprowadzanie zmian w udostępnionych folderach."
			},{
				type: "name",
				title: "Włącz udostępnianie multimediów",
				content: "Zaznacz tę opcję, aby włączyć funkcję udostępniania plików multimedialnych."
			},{
				type: "name",
				title:"Odśwież",
				content: "Naciśnij ten przycisk, aby odświeżyć listę folderów. "
			}]
		},
		
		PRINT_SERVER: {	
			TITLE: "Serwer druku",
			CONTENT: [{
				type: "name",
				title:"Serwer druku",
				content: "Zaznacz Włącz, aby włączyć funkcję serwera druku."
			},{
				type: "name",
				title:"Nazwa drukarki",
				content: "Wyświetla nazwę drukarki podłączonej do routera."
			}]
		},
		
		OFFLINE_DOWNLOAD: {	
			TITLE: "Pobieranie w trybie offline",
			CONTENT: [{
				type: "name",
				title:"Stan",
				content: "Włącz tę opcję, aby uruchomić funkcję pobierania w trybie offline."
			},{
				type: "name",
				title:"Ścieżka dostępu",
				content: "Folder roboczy pobierania w trybie offline. Po uruchomieniu powyższej funkcji, musisz wybrać ścieżkę folderu. W przeciwnym razie nie uzyskasz dostępu do pobranych plików i nie będziesz mógł przeprowadzać żadnych działań. Po utworzeniu folderu wszystkie pliki będą w nim zapisywane lub ukrywane. Jeżeli którekolwiek elementy folderu są aktywne, nie można zmienić jego ścieżki. Nie zaleca się także wypakowywać zawartości pamięci USB, gdyż może to być przyczyną nieodwracalnych błędów krytycznych."
			},{
				type: "name",
				title:"Harmonogram",
				content: "Zaznaczona opcja umożliwia ustawienie czasu pobierania. Harmonogram działa na podstawie czasu systemowego routera, który można zmienić w sekcji \"Narzędzia systemowe -> Ustawienia czasu\". "
			},{
				type: "name",
				title:"Wysyłaj po ukończeniu pobierania",
				content: "Zaznaczona opcja sprawia, że ukończone zadanie będzie nadal udostępniane."
			},{
				type: "name",
				title: "Maksymalna ilość zadań",
				content: "Wyświetla maksymalną liczbę aktywnych zadań."
			},{
				type: "name",
				title:"Maksymalna prędkość pobierania",
				content: "Wyświetla maksymalną prędkość pobierania."
			},{
				type: "name",
				title:"Maksymalna prędkość wysyłania",
				content: "Wyświetla minimalną prędkość wysyłania."
			},{
				type: "name",
				title: "Liczba połączeń",
				content: "Wyświetla ustawienia połączeń."
			},{
				type: "name",
				title: "Ogólna maksymalna liczba połączeń",
				content: "Zmień, aby ograniczyć maksymalną liczbę połączeń z zadaniami."
			},{
				type: "name",
				title: "Maksymalna liczba połączonych peerów na jeden torrent",
				content: "Zmień, aby ograniczyć maksymalną liczbę połączonych peerów dla jednego zadania."
			},{
				type: "name",
				title: "Włącz sieć DHT",
				content: "System DHT zostanie włączony."
			},{
				type: "name",
				title: "Włącz wymianę pomiędzy peerami",
				content: "Wymiana informacji pomiędzy peerami zostanie włączona."
			},{
				type: "name",
				title: "Włącz szyfrowanie protokołu BitTorrent.",
				content: "Szyfrowanie protokołu BitTorrent zostanie włączone."
			},{
				type: "name",
				title:"Serwer aMule",
				content: "Wprowadź adres IP i port serwera aMule, aby się połączyć."
			}]
		},
		
		OFFLINE_DOWNLOAD_ITEMS: {
			TITLE: "Pozycje",
			CONTENT: [{
				type: "paragraph",
				content: "Wyświetla pobrane elementy."
			},{
				type: "name",
				title: "Plik",
				content: "Wyświetla nazwę pobranego pliku."
			},{
				type: "name",
				title:"Prędkość",
				content: "Wyświetla prędkość pobierania i wysyłania."
			},{
				type: "name",
				title: "Ukończono",
				content: "Wyświetla wielkość pobranej części pliku oraz jego całkowity rozmiar."
			},{
				type: "name",
				title:"Pozostały czas",
				content: "Wyświetla czas pozostały do ukończenia pobierania."
			},{
				type: "name",
				title:"Połączeni użytkownicy",
				content: "Wyświetla informacje dotyczące połączonych peerów."
			},{
				type: "name",
				title: "Stan",
				content: "Wyświetla stan zadania."
			},{
				type: "name",
				title: "Źródło",
				content: "Wyświetla typ pobierania."
			},{
				type: "step",
				title: "Aby dodać element do pobierania",
				content: [
					"1. Naciśnij przycisk Dodaj.",
					"2. Wybierz źródło pobierania:",
					"1) Torrenty z PC: Naciśnij Przeglądaj, aby wybrać plik torrent z PC.",
					"2) Torrenty z USB: Wybierz wolumin i naciśnij Przeglądaj, aby wybrać plik torrent z USB.",
					"3) URL: Wprowadź URL (HTTP, HTTPS, FFTP, ed2k).",
					"3. Naciśnij OK."
				]
			}]
		},
		
		PARENTAL_CONTROL: {	
			TITLE: "Kontrola rodzicielska",
			CONTENT: [{
				type: "paragraph",
				content: "Włączona funkcja Kontroli rodzicielskiej pozwala na blokowanie stron zawierających niewłaściwe i szkodliwe treści; możesz ustawić określone ramy czasowe blokowania stron (na przykład blokując stronę facebook lub youtube w porze odrabiania pracy domowej); jednocześnie, za pomocą jednego punktu kontrolnego, możesz chronić wszystkie urządzenia połączone z siecią domową przed instalacją złośliwego oprogramowania oraz wykradaniem poufnych informacji."
			},{
				type: "name",
				title: "Kontrola rodzicielska",
				content: "Włącz, aby uruchomić funkcję Kontroli rodzicielskiej. Domyślnie jest ona wyłączona."
			}]
		},
		
		PARENTAL_CONTROL_DEVICES: {
			TITLE: "Urządzenia objęte kontrolą rodzicielską",
			CONTENT: [{
				type: "paragraph",
				content: "Wyświetla listę urządzeń objętych kontrolą rodzicielską."
			},{
				type: "name",
				title: "Nazwa urządzenia",
				content: "Wyświetla nazwy wszystkich podłączonych urządzeń klienckich objętych kontrolą rodzicielską."
			},{
				type: "name",
				title: "Adres MAC",
				content: "Wyświetla adresy MAC wszystkich podłączonych urządzeń klienckich objętych kontrolą rodzicielską."
			},{
				type: "name",
				title: "Czas dostępu do Internetu",
				content: "Wyświetla harmonogram dostępu do Internetu. Czas opiera się na zegarze routera, można go ustawić na stronie \"Narzędzia systemowe -> Ustawienia czasu\"."
			},{
				type: "name",
				title: "Opis",
				content: "Krótki opis podłączonego urządzenia (opcjonalnie)."
			},{
				type: "name",
				title: "Stan",
				content: "Wyświetla aktualny stan (włączona lub wyłączona) funkcji kontroli rodzicielskiej dla określonego urządzenia."
			},{
				type: "name",
				title: "Zmień",
				content: "Pozwala na zmianę ustawień lub usunięcie wpisu."
			},{
				type: "step",
				title: "Aby dodać regułę kontroli dostępu dla nowego urządzenia:",
				content: [
					"1. Naciśnij przycisk Dodaj.",
					"2. Naciśnij przycisk Wyświetl urządzenia i wybierz odpowiednie urządzenie z Listy urządzeń lub wprowadź nazwę i adres MAC urządzenia ręcznie, aby dodać urządzenie, które nie jest aktualnie podłączone.",
					"3. Wybierz czas, w którym reguła ma być aktywna, korzystając z pola Czas dostępu do Internetu.",
					"4. Wprowadź krótki opis w polu Opis (opcjonalnie).",
					"5. Zaznacz Włącz.",
					"6. Naciśnij przycisk OK, aby utworzyć wpis."
				]
			},{
				type: "paragraph",
				content: "Naciśnij ikonę Edytuj lub Usuń w tabeli, aby zmienić lub skasować odpowiedni wpis. "
			},{
				type: "paragraph",
				content: "Aby usunąć wiele wpisów jednocześnie, zaznacz je na liście, a następnie naciśnij przycisk Usuń nad tabelą."
			}]
		},
		
		PARENTAL_CONTROL_RESTRICTION: {
			TITLE: "Blokowanie treści",
			CONTENT: [{
				type: "name",
				title: "Czarna lista",
				content: "Zawiera słowa kluczowe, które będą wyznacznikiem dla blokowania dostępu do stron internetowych urządzeniom klienckim, znajdującym się na liście kontroli rodzicielskiej.",
				children: [{
					type: "paragraph",
					content: "Naciśnij Dodaj nowe słowa kluczowe, aby dodać słowo kluczowe do czarnej listy. Aby je usunąć, naciśnij ikonę (-), znajdującą się przy danym słowie kluczowym."
				}]
			},{
				type: "name",
				title: "Biała lista",
				content: "Zawiera adresy stron internetowych, do których urządzenia klienckie, wyszczególnione na liście kontroli rodzicielskiej, mają dostęp.",
				children: [{
					type: "paragraph",
					content: "Naciśnij Dodaj nową nazwę domeny, aby dodać adres strony internetowej do białej listy. Aby usunąć stronę, naciśnij ikonę (-), znajdującą się przy danym adresie."
				}]
			},{
				type: "note",
				title: "Uwaga",
				content: "Słowa kluczowe mogą być nazwami domen, np. mail.google.com lub www.facebook.com."
			},{
				type: "paragraph",
				content: "Naciśnij przycisk Zapisz, aby zapisać ustawienia."
			}]
		},
		
		
		QOS: {
			TITLE: "QoS",
			CONTENT: [{
				type: "paragraph",
				content: "Funkcja QoS pozwala na ustawienie priorytetów dla konkretnych urządzeń lub aplikacji w zależności od potrzeb użytkowników. "
			},{
				type: "name",
				title: "Włącz QoS",
				content: "Naciśnij, aby włączyć funkcję QoS."				
			},{
				type: "name",
				title: "Prędkość wysyłania",
				content: "Wprowadź maksymalną prędkość wysyłania oferowaną przez twojego dostawcę usług internetowych."				
			},{
				type: "name",
				title: "Prędkość pobierania",
				content: "Wprowadź maksymalną prędkość pobierania oferowaną przez twojego dostawcę usług internetowych."
			},{
				type: "name",
				title: "Wysoki priorytet",
				content: "Określ odsetek ruchu o wysokim priorytecie."
			},{
				type: "name",
				title: "Średni priorytet",
				content: "Określ odsetek ruchu o średnim priorytecie."
			},{
				type: "name",
				title: "Niski priorytet",
				content: "Określ odsetek ruchu o niskim priorytecie."
			},{
				type: "note",
				title: "Uwaga",
				content: "Maksymalna suma priorytetów wynosi 1."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		QOS_RULE: {
			TITLE: "Lista reguł QoS",
			CONTENT: [{
				type: "name",
				title: "Typ",
				content: "Wybierz typ reguły, którą chcesz dodać do listy."
			},{
				type: "step",
				title: "Aby ustawić wysoki/średni/niski priorytet reguły w zależności od urządzenia",
				content: [
					"1. Naciśnij przycisk Dodaj.",
					"2. Wybierz Wg Urządzenia.",
					"3. Naciśnij Wyświetl urządzenia, aby wybrać urządzenie z Listy urządzeń lub wprowadź ręcznie nazwę urządzenia i jego adres MAC w pola Nazwa Urządzenia i Adres MAC.",
					"4. Naciśnij OK."
				]
			},{
				type: "step",
				title: "Aby ustawić wysoki/średni/niski priorytet reguły w zależności od usługi",
				content: [
					"1. Naciśnij przycisk Dodaj.",
					"2. Wybierz Wg Usługi.",
					"3. Wybierz aplikację z Listy aplikacji lub dodaj nową wpisując jej nazwę, protokół oraz port docelowy (1 - 65535) w odpowiednie pola. Możesz wprowadzić pojedynczy port lub zakres portów (np. 21, 36-105 itd.).",
					"4. Naciśnij OK."
				]
			},{
				type: "step",
				title: "Aby ustawić wysoki/średni/niski priorytet reguły w zależności od portu",
				content: [
					"1. Naciśnij przycisk Dodaj.",
					"2. Wybierz Wg Portu.",
					"3. Wybierz port.",
					"4. Naciśnij OK."
				]
			}]
		},
		
		
		QOS_DATABASE: {
			TITLE: "Aktualizacja bazy danych",
			CONTENT: [{
				type: "name",
				title: "Nowa baza danych",
				content: "Naciśnij Przeglądaj, aby wskazać nową bazę danych. Wybierz miejsce i naciśnij Aktualizuj, aby zaktualizować swoją bazę danych do nowszej wersji."
			},{
				type: "name",
				title: "Wersja bazy danych",
				content: "Wyświetla aktualną wersję bazy danych."
			}]
		},
		
		
		
		SECURITY_FIREWALL: {	
			TITLE: "Firewall",
			CONTENT: [{
				type: "name",
				title: "Firewall SPI",
				content: "Firewall SPI chroni sieć przed atakami i sprawdza pakiety przepływające przez router."
			}]
		},
		
		SECURITY_DOS: {
			TITLE: "Ochrona DoS",
			CONTENT: [{
				type: "name",
				title: "Ochrona DoS",
				content: "Ochrona DoS chroni sieć przed atakami mającymi na celu jej przeciążenie."
			},{
				type: "name",
				title: "Filtrowanie ataków ICMP-FLOOD",
				content: "Włącz, aby zapobiec atakom przy użyciu Internet Control Message Protocol (ICMP).",
				children: [{
					type: "name",
					title: "Wyłączone",
					content: "Brak ochrony."
				},{
					type: "name",
					title: "Niskie",
					content: "Niski poziom ochrony i niewielki wpływ na działanie routera."
				},{
					type: "name",
					title: "Średnie",
					content: "Średni poziom ochrony i umiarkowany wpływ na działanie routera."
				},{
					type: "name",
					title: "Wysokie",
					content: "Wysoki poziom ochrony i znaczny wpływ na działanie urządzenia."
				}]
			},{
				type: "name",
				title: "Filtrowanie ataków UDP-FLOOD",
				content: "Włącz, aby zapobiec atakom przy użyciu User Datagram Protocol (UDP)."
			},{
				type: "name",
				title: "Filtrowanie ataków TCP-SYN-FLOOD",
				content: "Włącz, aby zapobiec atakom przy użyciu Transmission Control Protocol-Synchronize (TCP-SYN)."
			},{
				type: "name",
				title: "Ignoruj pakiety ping z portu WAN",
				content: "Włącz, aby ignorować pakiety ping z portu WAN"
			},{
				type: "name",
				title: "Blokuj pakiety ping z portu LAN",
				content: "Włącz, aby blokować pakiety ping z portu LAN"
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		SECURITY_LIST: {
			TITLE: "Lista zablokowanych hostów DoS",
			CONTENT: [{
				type: "name",
				title: "Lista zablokowanych hostów DoS",
				content: "Wyszczególnione adresy IP i adresy MAC wszystkich zablokowanych urządzeń atakujących."
			},{
				type: "step",
				title: "Aby usunąć wpis",
				content: "Wybierz z listy hostów wpisy, które chcesz usunąć i naciśnij przycisk Usuń, znajdujący się nad tabelką."
			}]
		},
		
		ACCESS_CONTROL: {	
			TITLE: "Kontrola dostępu",
			CONTENT: [{
				type: "paragraph",
				content: "Funkcja kontroli dostępu stosowana jest do udzielania lub blokowania dostępu do sieci komputerom i innym urządzeniom. Zablokowane urządzenie nie może komunikować się z innymi urządzeniami oraz nawiązać połączenia internetowego."
			},{
				type: "paragraph",
				content: "Aby korzystać z funkcji Kontroli dostępu, włącz ją i ustal listę czarną i białą. Jeśli funkcja ta jest wyłączona, wszystkie urządzenia, łącznie z wyszczególnionymi na czarnej liście, mogą nawiązać połączenie."
			}]
		},
		
		ACCESS_MODE: {
			TITLE: "Tryb pracy",
			CONTENT: [{
				type: "name",
				title: "Czarna lista",
				content: "Odmowa dostępu do sieci dotyczy jedynie urządzeń widniejących na czarnej liście"
			},{
				type: "name",
				title: "Biała lista",
				content: "Dostęp do sieci zostanie udzielony jedynie urządzeniom widniejącym na białej liście."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		ACCESS_DEVICE: {
			TITLE: "Aktywne urządzenia",
			CONTENT: [{
				type: "name",
				title: "Nazwa urządzenia",
				content: "Wyświetla nazwę połączonego urządzenia."
			},{
				type: "name",
				title: "Adres IP",
				content: "Wyświetla adres IP połączonego urządzenia."
			},{
				type: "name",
				title: "Adres MAC",
				content: "Wyświetla adres MAC połączonego urządzenia."
			},{
				type: "name",
				title: "Typ połączenia",
				content: "Wyświetla typ połączenia, stosowany przez urządzenie."
			},{
				type: "step",
				title: "Aby zablokować urządzenie",
				content: "W tabelce Aktywne urządzenia, naciśnij na ikonę Blokuj w kolumnie Edytuj przy urządzeniu, które chcesz zablokować."
			},{
				type: "step",
				title: "Aby zablokować jednocześnie kilka urządzeń",
				content: "W tabelce Połączone urządzenia, zaznacz wszystkie urządzenia, które chcesz zablokować, a następnie naciśnij Blokuj nad tabelką. Zostaną one automatycznie dodane do Czarnej listy."
			}],
		},
		
		ACCESS_LIST: {
			TITLE: "Urządzenia na białej/czarnej liście",
			CONTENT: [{
				type: "step",
				title: "Aby dodać urządzenie do czarnej lub białej listy",
				content: [
					"1. Naciśnij ikonę Dodaj.",
					"2. Wprowadź Nazwę urządzenia.",
					"3. Wprowadź adres MAC urządzenia.",
					"4. Naciśnij OK."
				]
			},{
				type: "step",
				title: "Aby zmienić lub usunąć wpis",
				content: "Naciśnij ikonę Edytuj lub Usuń w tabeli Czarna/Biała lista, aby zmienić lub skasować odpowiedni wpis. "
			},{
				type: "step",
				title: "Aby zmienić lub usunąć wiele wpisów",
				content: "W tabeli Czarna/Biała lista zaznacz wszystkie urządzenia, które chcesz usunąć, a następnie naciśnij przycisk Usuń, znajdujący się nad listą."
			}]
		},
		
		
		IPMAC_BIND_SETTING: {	
			TITLE: "Ustawienia",
			CONTENT: [{
				type: "paragraph",
				content: "Wiązanie ARP (Address Resolution Protocol) stosuje się do kontrolowania dostępu określonego komputera do sieci LAN, poprzez wiązanie adresu IP z adresem MAC. Wiązanie ARP uniemożliwia także innym urządzeniom korzystanie z określonego adresu IP."
			}]
		},
		
		IPMAC_BIND_ARP: {	
			TITLE: "Lista ARP",
			CONTENT: [{
				type: "paragraph",
				content: "Wyświetla adresy MAC i IP aktualnie połączonych urządzeń."
			},{
				type: "name",
				title: "Ilość wpisów ARP",
				content: "Wyświetla całkowitą liczbę urządzeń aktualnie połączonych z Routerem."
			},{
				type: "name",
				title: "Adres MAC",
				content: "Wyświetla adres MAC połączonego urządzenia."
			},{
				type: "name",
				title: "Adres IP",
				content: "Wyświetla adres IP przydzielony połączonemu urządzeniu."
			},{
				type: "name",
				title: "Powiązane",
				content: "Informuje czy adres MAC i adres IP są powiązane ze sobą."
			},{
				type: "name",
				title: "Zmień",
				content: "Umożliwia Powiązanie lub Usunięcie wpisu z listy."
			},{
				type: "note",
				title: "Uwaga",
				content: "Nie możesz wiązać tego samego adresu IP z więcej niż jednym adresem MAC."
			}]
		},
		
		IPMAC_BIND_LIST: {	
			TITLE: "Lista wiązań",
			CONTENT: [{
				type: "step",
				title: "Aby skonfigurować wiązanie ARP na urządzeniu",
				content: [
					"1. Naciśnij przycisk Dodaj.",
					"2. Wprowadź Adres MAC urządzenia.",
					"3. Wprowadź Adres IP, który chcesz przypisać powyższemu adresowi MAC.",
					"4. Uzupełnij Opis urządzenia. (Opcjonalnie)",
					"5. Zaznacz Włącz.",
					"6. Naciśnij OK."
				]
			},{
				type: "step",
				title: "Aby edytować lub usunąć wpis",
				content: "Na Liście wiązań naciśnij ikonę Edytuj lub Usuń, aby zmienić lub skasować odpowiedni wpis. "
			},{
				type: "step",
				title: "Aby usunąć jednocześnie kilka wpisów",
				content: "Na Liście wiązań zaznacz wszystkie wpisy, które chcesz usunąć, a następnie naciśnij przycisk Usuń, znajdujący się nad listą."
			}]
		},
		
		IPV6: {
			TITLE: "Internet",
			CONTENT: [{
				type: "name",
				title: "IPv6",
				content: "Włącz lub wyłącz funkcję IPv6 routera."
			},{
				type: "title",
				title: "Typ połączenia: Statyczne IP",
			},{
				type: "name",
				title: "Statyczne IP",
				content: "Wybierz ten typ połączenia, jeżeli twój dostawca usług internetowych korzysta ze statycznego przydzielania adresów IPv6."
			},{
				type: "name",
				title: "Adres IPv6/Brama domyślna/Preferowany DNS/Alternatywny DNS",
				content: "Uzupełnij parametry zgodnie z informacjami uzyskanymi od dostawcy usług internetowych."
			},{
				type: "name",
				title: "Wielkość MTU",
				content: "Typową wielkością MTU (Maksymalna jednostka transmisji) dla większości sieci Ethernet jest 1500 bajtów. Wielkość MTU nie powinna być zmieniana, o ile dostawca usług internetowych nie zaleci inaczej."
			},{
				type: "title",
				title: "Typ połączenia: Dynamiczne IP",
			},{
				type: "name",
				title: "Dynamiczne IP",
				content: "Wybierz tę opcję, jeżeli twój dostawca usług internetowych korzysta z automatycznego przydzielania adresów IPv6."
			},{
				type: "name",
				title: "Adres IPv6/Preferowany DNS/Alternatywny DNS",
				content: "Parametry te są automatycznie przypisywane serwerowi DHCPv6 przez dostawcę usług internetowych."
			},{
				type: "name",
				title: "Odnów",
				content: "Naciśnij ten przycisk, aby pobrać nowe parametry IPv6 z serwera DHCPv6."
			},{
				type: "name",
				title: "Zwolnij",
				content: "Naciśnij ten przycisk, aby zwolnić parametry IPv6 przydzielone serwerowi DHCPv6."
			},{
				type: "name",
				title: "Pobierz adres IPv6",
				content: "Wybierz DHCPv6, aby pobrać adres IPv6 lub SLAAC, aby router wygenerował adres IPv6 przy pomocy pakietów od dostawcy."
			},{
				type: "name",
				title: "Prefiks",
				content: "Zaznacz Włącz, aby pobrać prefiks z serwera DHCPv6 dostawcy, lub Wyłącz, aby wprowadzić prefiks ręcznie. Urządzenia w sieci LAN będą miały adres IPv6 z tym prefiksem."
			},{
				type: "name",
				title: "Adresy DNS",
				content: "Wybierz “Pobierz automatycznie od dostawcy” lub “Użyj następujących adresów DNS”. Po wybraniu “Użyj następujących adresów DNS”, ręcznie wprowadź adres DNS, otrzymany od dostawcy usług internetowych."
			},{
				type: "name",
				title: "Preferowany DNS/Alternatywny DNS",
				content: "Wprowadź te parametry ręcznie lub automatycznie pobierz je od dostawcy usług internetowych."
			},{
				type: "title",
				title: "Typ połączenia: PPPoE"
			},{
				type: "name",
				title: "PPPoE",
				content: "Wybierz ten typ połączenia, jeżeli twój dostawca usług internetowych korzysta z PPPoEv6 oraz udostępnia nazwę użytkownika i hasło."
			},{
				type: "name",
				title: "Nazwa użytkownika/Hasło",
				content: "Wprowadź nazwę użytkownika i hasło otrzymane od dostawcy usług internetowych."
			},{
				type: "name",
				title: "Adres IPv6",
				content: "Po wprowadzeniu nazwy użytkownika i hasła, a następnie naciśnięciu przycisku Połącz, parametry te są automatycznie przypisywane serwerowi DHCPv6 przez dostawcę usług internetowych."
			},{
				type: "name",
				title: "Adresy DNS",
				content: "Wybierz “Pobierz automatycznie od dostawcy” lub “Użyj następujących adresów DNS”. Po wybraniu “Użyj następujących adresów DNS”, ręcznie wprowadź adres DNS, otrzymany od dostawcy usług internetowych."
			},{
				type: "name",
				title: "Pobierz adres IPv6",
				content: "Wybierz DHCPv6, aby pobrać adres IPv6 lub SLAAC, aby router wygenerował adres IPv6 przy pomocy pakietów od dostawcy."
			},{
				type: "name",
				title: "Prefiks",
				content: "Zaznacz Włącz, aby pobrać prefiks z serwera DHCPv6 dostawcy, lub Wyłącz, aby wprowadzić prefiks ręcznie. Urządzenia w sieci LAN będą miały adres IPv6 z tym prefiksem."
			},{
				type: "name",
				title: "Połącz",
				content: "Naciśnij ten przycisk, aby uzyskać połączenie internetowe."
			},{
				type: "name",
				title: "Rozłącz",
				content: "Naciśnij ten przycisk, aby przerwać połączenie internetowe."
			},{
				type: "title",
				title: "Typ połączenia: Tunel 6do4"
			},{
				type: "name",
				title: "Tunel 6do4",
				content: "Wybierz ten typ połączenia, jeżeli twój dostawca usług internetowych korzysta z mechanizmu 6do4 do przydzielania adresów."
			},{
				type: "name",
				title: "Adres IPv4/Maska podsieci IPv4/Brama domyślna IPv4/Adres tunelu",
				content: "Po naciśnięciu Połącz, parametry te zostaną automatycznie wygenerowane, zgodnie z danymi IPv4 portu WAN."
			},{
				type: "name",
				title: "Użyj następujących adresów DNS",
				content: "Zaznacz tę opcję, aby wprowadzić adresy serwerów DNS otrzymane od dostawcy ręcznie."
			},{
				type: "name",
				title: "Połącz",
				content: "Naciśnij ten przycisk, aby uzyskać połączenie internetowe."
			},{
				type: "name",
				title: "Rozłącz",
				content: "Naciśnij ten przycisk, aby przerwać połączenie internetowe."
			}/*,{
				type: "title",
				title: "Typ połączenia internetowego: 6RD"
			},{
				type: "name",
				title: "6RD",
				content: "Wybierz ten typ, jeżeli twój dostawca usług internetowych korzysta z mechanizmu 6RD i dostarcza informacje na temat adresu IPv4 oraz prefiksu IPv6."
			},{
				type: "name",
				title: "Typ konfiguracji",
				content: "Wybierz Automatyczna lub Ręczna, aby skonfigurować paramtery kanału 6RD, zgodnie z wymogami dostawcy usług internetowych. Wybierz Automatyczna, jeśli poniższe, domyślne parametry są zgodne z otrzymanymi przez dostawcę usług internetowych; w innym przypadku, wprowadź parametry zgodne z wymogami dostawcy usług internetowych."
			},{
				type: "name",
				title: "Długość maski IPv4/Prefiks 6RD/Długość prefiksu 6RD/Adres IPv4 przekaźnika sieciowego",
				content: "Po sprawdzeniu czy obecne parametry są zgodne z ustalonymi przez dostawcę usług internetowych, zachowaj ustawienia domyślnie lub ręcznie wprowadź dane otrzymane od dostawcy usług internetowych."
			},{
				type: "title",
				title: "Typ połączenia internetowego: DS-Lite"
			},{
				type: "name",
				title: "DS-Lite",
				content: "Wybierz ten typ połączenia, jeżeli twój dostawca usług internetowych korzysta z mechanizmu DS-lite i dostarcza informacje na temat nazwy domeny AFTR lub adresu IPv6, w celu konfiguracji tunelu IPv4-in-IPv6 w sieci IPv6 i ustalania ruchu IPv4 lub IPv6 w odpowiednich sieciach."
			},{
				type: "name",
				title: "Nazwa AFTR",
				content: "AFTR to skrót od Address Family Transition Router (Rodzina adresów protokołu przejścia). Wprowadź w to pole nazwę domeny AFTR lub adres IPv6, ustalony przez dostawcę usług internetowych."
			},{
				type: "name",
				title: "Połączenie dodatkowe",
				content: "Wybierz typ połączenia dodatkowego, zgodnie z wymogami dostawcy usług internetowych.",
				children :[ 
				{
					type: "name",
					title: "Dynamiczne IP",
					content: "Wybierz tę opcję jako połączenie zapasowe. Parametry połączenia zostaną automatycznie pobrane od dostawcy."
				},
				{
					type: "name",
					title: "Statyczne IP",
					content: "Wybierz tę opcję jako połączenie zapasowe. Parametry połączenia muszą zostać wprowadzone ręcznie."
				},{
					type: "name",
					title: "PPPoE",
					content: "Wybierz tę opcję, jeżeli typem połączenia dodatkowego, z którego korzysta twój dostawca usług internetowych, jest PPPoE i wprowadź nazwę użytkownika/hasło otrzymane od dostawcy usług internetowych. Po naciśnięciu Połącz, adres IPv6 będzie przydzielany automatycznie."
				}]
			}*/,{
				type: "title",
				title: "Typ połączenia z Internetem: Pass-Through (Bridge)"
			},{
				type: "paragraph",
				content: "Wybierz ten typ połączenia, jeżeli twój dostawca usług internetowych korzysta z mechanizmu sieci Pass Through (Bridge). Żadne dodatkowe parametry ani konfiguracje nie są wymagane."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		IPV6_LAN: {
			TITLE: "LAN",
			CONTENT: [{
				type: "paragraph",
				content: "Połączenia inne niż Pass-Through (Bridge) wymagają konfiguracji IPv6."
			},{
				type: "name",
				title: "Sposób przydziału",
				content: "Wybierz zgodny z ustaleniami dostawcy usług internetowych.",
				children: [{
					type: "name",
					title: "DHCPv6",
					content: "Automatycznie przydziela adresy IP urządzeniom klienckim w sieci LAN.",
					children: [{
						type: "name",
						title: "Prefiks adresu",
						content: "Wprowadź prefiks adresu otrzymany od dostawcy usług internetowych."
					},{
						type: "name",
						title: "Czas przydzielenia",
						content: "Oznacza przedział czasowy, na jaki adres IP zostaje przydzielony. Jeżeli twój dostawca usług internetowych nie wymaga inaczej, pozostaw domyślne ustawienie 86400 sekund."
					},{
						type: "name",
						title: "Adres",
						content: "Adres IP automatycznie przypisywany poprzez serwer DHCPv6 przez dostawcę usług internetowych."
					}]
				},{
					type: "name",
					title: "Bezstanowe DHCP SLAAC+",
					connector:" ",
					children: [{
						type: "name",
						title: "Prefiks adresu",
						content: "Wprowadź prefiks adresu otrzymany od dostawcy usług internetowych."
					},{
						type: "name",
						title: "Adres",
						content: "Adres IP przydzielony automatycznie przez dostawcę."
					}]
				},{
					type: "name",
					title: "SLAAC+RDNSS",
					connector:" ",
					children: [{
						type: "name",
						title: "Prefiks adresu",
						content: "Wprowadź prefiks adresu otrzymany od dostawcy usług internetowych."
					},{
						type: "name",
						title: "Adres",
						content: "Adres IP przydzielony automatycznie przez dostawcę."
					}]
				}]
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		IPV6_MAC_CLONE: {
			TITLE: "Klonowanie MAC",
			CONTENT: [{
				type: "name",
				title: "Użyj domyślnego adresu MAC",
				content: "W przypadku gdy dostawca usług internetowych nie wiąże przypisanego adresu IP z adresem MAC komputera, NIE zmieniaj domyślnego adresu MAC routera."
			},{
				type: "name",
				title: "Użyj adresu MAC podłączonego komputera",
				content: "W przypadku gdy dostawca usług internetowych wiąże przypisany adres IP z adresem MAC komputera, skopiuj aktualny adres MAC komputera podłączonego do routera."
			},{
				type: "name",
				title: "Użyj innego adresu MAC",
				content: "W przypadku, gdy dostawca usług internetowych wiąże przypisany adres IP z określonym adresem MAC, wpisz adres MAC ręcznie."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		TIME_SETTING: {	
			TITLE: "Ustawienia czasu",
			CONTENT: [{
				type: "step",
				title: "Aby automatycznie zsynchronizować czas",
				content: [
					"1. W polu Ustaw czas, wybierz Pobierz automatycznie z Internetu.",
					"2. Wybierz swoją Strefę czasową z rozwijanej listy.",
					"3. W polu Serwer NTP I, wprowadź odpowiedni adres IP lub domenę Serwera NTP.",
					"4. W polu Serwer NTP II, wprowadź odpowiedni adres IP lub domenę innego Serwera NTP. (Opcjonalnie)",
					"5. Naciśnij Pobierz.",
					"6. Naciśnij Zapisz."
				]
			},{
				type: "step",
				title: "Aby ręcznie ustawić datę i czas",
				content: [
					"1. W polu Ustaw czas, wybierz Ręcznie.",
					"2. Wprowadź prawidłową Datę.",
					"3. Wprowadź prawidłowy Czas (W formacie 24-godzinnym, np. 16:00:00 zamiast 04:00PM).",
					"4. Naciśnij Zapisz."
				]
			}]
		},
		
		TIME_SETTING_DAYLIGHT: {	
			TITLE: "Zmiana czasu",
			CONTENT: [{
				type: "step",
				title: "Aby ustalić Zmianę czasu",
				content: [
					"1. Wybierz Włącz zmianę czasu.",
					"2. Wybierz odpowiednią Początkową datę i godzinę zmiany czasowej dla swojej strefy czasowej.",
					"3. Wybierz odpowiednią Końcową datę i godzinę zmiany czasowej dla swojej strefy czasowej.",
					"4. Naciśnij Zapisz."
				]
			}]
		},
		DIGNOSTIC: {	
			TITLE: "Diagnostyka",
			CONTENT: [{
				type: "paragraph",
				content: "Narzędzia Ping i Traceroute, w które wyposażony jest router, pomagają rozwiązać problemy związane z połączeniem sieciowym. Narzędzie Ping wysyła pakiety na docelowy adres IP Iub domenę i zapisuje uzyskane dane, takie jak ilość pakietów wysłanych/odebranych oraz czas transmisji w obie strony. Narzędzie Traceroute wysyła pakiety na docelowy adres IP lub domenę i wyświetla ilość przeskoków oraz czas dotarcia do celu."
			},{
				type: "paragraph",
				content: "Narzędzia Ping i Traceroute możesz używać na urządzeniu lokalnym, korzystając z adresu IP lub domeny, np. google.com, yahoo.com, itp."
			},{
				type: "step",
				title: "Aby zdiagnozować za pomocą Ping",
				content: [
					"1. Wprowadź wybrany Adres IP lub Domenę.",
					"2. Naciśnij ikonę Strzałki, aby rozwinąć zakładkę Zaawansowane w menu i określić Ilość pakietów Ping oraz Rozmiar pakietów Ping. (Opcjonalnie)",
					"3. Naciśnij Start."
				]
			},{
				type: "step",
				title: "Aby zdiagnozować za pomocą Traceroute",
				content: [
					"1. Wprowadź wybrany Adres IP lub Domenę.",
					"2. Naciśnij ikonę Strzałki, aby rozwinąć zakładkę Zaawansowane w menu i określić ilość przeskoków (na trasie do celu) w polu Maksymalna wartość TTL. Wartością domyślną jest 20. (Opcjonalnie)",
					"3. Naciśnij Start."
				]
			}]
		},
		FIRMWARE: {	
			TITLE: "Aktualizacja firmware",
			CONTENT: [{
				type: "paragraph",
				content: "Przed aktualizacją oprogramowania, należy pobrać najnowszą jego wersję ze strony <a class=\"link\" href=\"javascript:void(0);\" id=\"update_url\" target=\"_blank\">Wsparcie TP-LINK</a>."
			},{
				type: "step",
				title: "WAŻNE: Aby uniknąć błędów w aktualizacji, należy pamiętać o następujących kwestiach:",
				content: [
					"Upewnij się, że plik z najnowszą wersją firmware jest zgodny z wersją sprzętową (jak określono na stronie Aktualizacja firmware).",
					"Upewnij się, że połączenie pomiędzy routerem a komputerem jest stabilne. NIE zaleca się dokonywać aktualizacji bezprzewodowo.",
					"Przed dokonaniem aktualizacji, upewnij się, że wszystkie urządzenia pamięci masowej USB zostały odłączone od routera, aby zapobiec utracie danych.",
					"Utwórz kopię zapasową ustawień routera.",
					"Nie wyłączaj routera podczas aktualizacji firmware."
				]
			},{
				type: "step",
				title: "Aby zaktualizować oprogramowanie routera",
				content: [
					"1. Naciśnij Przeglądaj.",
					"2. Znajdź i wybierz pobrany plik.",
					"3. Naciśnij Aktualizuj."
				]
			},{
				type: "paragraph",
				content: "Proces aktualizacji trwa kilka minut. NIE wyłączaj routera w trakcie aktualizacji."
			}]
		},
		
		BACKUP: {	
			TITLE: "Zapisz ustawienia",
			CONTENT: [{
				type: "paragraph",
				content: "Zaleca się zapisać swoje aktualne ustawienia na wypadek utraty ustawień systemu lub konieczności przywrócenia do ustawień fabrycznych."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać aktualne ustawienia komputera. Pamiętaj, aby zapisać plik w miejscu, z którego można go później pobrać i przywrócić ustawienia routera w razie konieczności."
			}]
		},
		
		RESTORE: {
			TITLE: "Przywróć ustawienia",
			CONTENT: [{
				type: "step",
				title: "Aby przywrócić zapisane ustawienia",
				content: [
					"1. Naciśnij Przeglądaj.",
					"2. Znajdź i wybierz zapisany plik.",
					"3. Naciśnij Przywróć."
				]
			}]
		},
		
		FACTORY: {
			TITLE: "Przywróć ustawienia fabryczne",
			CONTENT: [{
				type: "paragraph",
				content: "Naciśnij Ustawienia fabryczne, aby przywrócić ustawienia fabryczne routera."
			},{
				type: "step",
				title: "Uwaga",
				content: [
					"1. Przywrócenie ustawień fabrycznych usunie wszystkie zmienione ustawienia. Aby zalogować się na router ponownie, użyj domyślnej nazwy użytkownika i hasła.",
					"2. NIE wyłączaj routera podczas procesu przywracania ustawień."
				]
			}]
		},
		
		
		ADMIN_ACCOUNT: {	
			TITLE: "Zarządzanie kontami",
			CONTENT: [{
				type: "paragraph",
				content: "Na tej stronie możesz zmienić swoją nazwę użytkownika i/lub hasło logowania oraz ustawić adres e-mail, aby w razie potrzeby odzyskać hasło."
			},{
				type: "name",
				title: "Aktualna nazwa użytkownika",
				content: "Wpisz swoją aktualną nazwę użytkownika."
			},{
				type: "name",
				title: "Aktualne hasło",
				content: "Wpisz swoje aktualne hasło."
			},{
				type: "name",
				title: "Nowa nazwa użytkownika",
				content: "Wpisz nową nazwę użytkownika."
			},{
				type: "name",
				title: "Nowe hasło",
				content: "Wpisz nowe hasło."
			},{
				type: "name",
				title: "Potwierdź nowe hasło",
				content: "Ponownie wpisz nowe hasło."
			},{
				type: "note",
				title: "Uwaga",
				content: "Jeśli decydujesz się na zmianę aktualnej nazwy użytkownika i hasła logowania, upewnij się, aby zapisać te dane w bezpiecznym miejscu."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		ADMIN_RECOVERY: {
			TITLE: "Odzyskiwanie hasła",
			CONTENT: [{
				type: "name",
				title: "Włącz odzyskiwanie hasła",
				content: "Włączenie funkcji Odzyskiwania hasła jest zalecane, gdyż zgubione lub zapomniane informacje na temat nazwy użytkownika i hasła zostaną przesłane na adres e-mail."
			},{
				type: "name",
				title: "Od",
				content: "Wprowadź aktualny adres e-mail dla poczty wychodzącej."
			},{
				type: "name",
				title: "Do",
				content: "Wprowadź aktualny adres e-mail dla poczty przychodzącej."
			},{
				type: "name",
				title: "Serwer SMTP",
				content: "Wprowadź adres serwera SMTP, za pomocą którego router wysyła dane do konta na adres e-mail."
			},{
				type: "name",
				title: "Wymagaj uwierzytelniania",
				content: "Wybierz Włącz uwierzytelnianie, jeżeli serwer poczty wychodzącej go wymaga do wysyłania wiadomości e-mail. Następnie wprowadź dane w pola Nazwa użytkownika i Hasło. Wielkość liter ma znaczenie."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		ADMIN_LOCAL: {	
			TITLE: "Zarządzanie lokalne",
			CONTENT: [{
				type: "paragraph",
				content: "Sekcja ta umożliwia wprowadzenie ograniczenia liczby urządzeń klienckich w sieci LAN połączonych z routerem na podstawie uwierzytelnienia w oparciu o adres MAC."
			},{
				type: "name",
				title: "Dostęp dla wszystkich urządzeń podłączonych do sieci LAN",
				content: "Wybierz \"Włącz\", aby umożliwić zarządzanie routerem wszystkim urządzeniom w sieci LAN lub \"Wyłącz\", aby umożliwić zarządzanie tylko wybranym urządzeniom."
			},{
				type: "name",
				title: "Adres MAC",
				content: "Wyświetla adres MAC urządzenia o ograniczonym dostępie."
			},{
				type: "name",
				title: "Opis",
				content: "Wyświetla informacje na temat urządzenia o ograniczonym dostępie."
			},{
				type: "name",
				title: "Stan",
				content: "Wyświetla aktualny stan urządzenia o ograniczonym dostępie (włączone lub wyłączone)."
			},{
				type: "name",
				title: "Zmień",
				content: "Pozwala na Zmianę ustawień lub Usunięcie urządzenia z listy."
			},{
				type: "step",
				title: "Aby dodać urządzenie klienckie do listy",
				content: [
					"1. Naciśnij przycisk Dodaj.",
					"2. Naciśnij Wyświetl urządzenia, aby wybrać urządzenie lub wprowadzić adres MAC urządzenia w pole Adres MAC.",
					"3. Wprowadź Opis urządzenia.",
					"4. Wybierz Włącz.",
					"5. Naciśnij przycisk OK."
				]
			},{
				type: "step",
				title: "Aby edytować lub usunąć urządzenie z listy",
				content: "Naciśnij ikonę Edytuj lub Usuń w tabeli, aby zmienić lub skasować odpowiedni wpis. "
			},{
				type: "step",
				title: "Aby usunąć jednocześnie kilka urządzeń",
				content: "Zaznacz wszystkie urządzenia, które chcesz usunąć, a następnie naciśnij Usuń"
			}]
		},
		ADMIN_REMOTE: {	
			TITLE: "Zarządzanie zdalne",
			CONTENT: [{
				type: "paragraph",
				content: "Funkcja zarządzania zdalnego umożliwia zdalny dostęp i zarządzanie routerem z Internetu."
			},{
				type: "name",
				title: "Wyłącz zarządzanie zdalne",
				content: "Wybierz tę opcję, aby wyłączyć zarządzanie zdalne."
			},{
				type: "name",
				title: "Włącz zarządzanie zdalne dla wszystkich urządzeń",
				content: "Wybierz tę opcję, aby włączyć zarządzanie zdalne dla wszystkich adresów IP. Następnie uzupełnij pole Port zarządzania WEB."
			},{
				type: "name",
				title: "Włącz zarządzanie zdalne dla określonych urządzeń",
				content: "Wybierz tę opcję, aby włączyć zarządzanie zdalne tylko dla określonego adresu IP. Następnie uzupełnij pola Port zarządzania WEB i Adres IP zdalnego zarządzania."
			},{
				type: "name",
				title: "Port zarządzania WEB",
				content: "Wprowadź numer portu z przedziału 1024-65535, który zwiększa bezpieczeństwo dostępu do interfejsu strony konfiguracyjnej routera. Przeglądarki internetowe korzystają zwykle z portu 80 protokołu HTTP. Domyślnie stosuje się port 8080, będący alternatywnym portem protokołu HTTP."
			},{
				type: "name",
				title: "Adres IP zdalnego zarządzania",
				content: "Wprowadź prawidłowy adres IP, aby uzyskać dostep do routera."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		
		SYSTEM_LOG: {	
			TITLE: "Dziennik systemowy",
			CONTENT: [{
				type: "paragraph",
				content: "Strona Dziennika systemowego zawiera listę ostatnio wykonywanych operacji na routerze. Możesz określić wyświetlany typ dzienników i/lub ich poziom. Istnieje także możliwość konfiguracji ustawień, pozwalających na automatyczne wysyłanie plików z dziennikami na określony adres e-mail lub wyeksportowanie ich na komputer."
			},{
				type: "name",
				title: "Typ",
				content: "Wybierz wyświetlany typ dziennika systemowego."
			},{
				type: "name",
				title: "Poziom",
				content: "Wybierz wyświetlany poziom dziennika systemowego."
			},{
				type: "name",
				title: "Odśwież",
				content: "Naciśnij tę ikonę, aby zaktualizować dziennik systemowy."
			},{
				type: "name",
				title: "Usuń wszystkie",
				content: "Naciśnij tę ikonę, aby usunąć wszystkie dzienniki systemowe."
			},{
				type: "name",
				title: "Zapisz dziennik",
				content: "Naciśnij ten przycisk, aby pobrać wszystkie pliki z dziennikami systemowymi na swój komputer."
			},{
				type: "name",
				title: "Ustawienia poczty",
				content: "Naciśnij ten przycisk, aby zmienić ustawienia poczty dla dzienników systemowych."
			},{
				type: "step",
				title: "Aby zmienić ustawienia poczty dla dzienników systemowych",
				content: [
					"1. Naciśnij Ustawienia poczty.",
					"2. Od - Wprowadź aktualny adres e-mail dla poczty wychodzącej.",
					"3. Do - Wprowadź aktualny adres e-mail dla poczty przychodzącej.",
					"4. Serwer SMTP - Wprowadź adres serwera SMTP, za pomocą którego router wysyła dzienniki systemowe poprzez pocztę elektroniczną.",
					{
						content: "5. Włącz uwierzytelnianie - Wybierz Włącz uwierzytelnianie, jeżeli serwer poczty wychodzącej go wymaga do wysyłania wiadomości e-mail.",
						children: [{
							type: "name",
							title: "Nazwa użytkownika",
							content: "Wprowadź nazwę użytkownika dla serwera SMTP. Wielkość liter ma znaczenie."
						},{
							type: "name",
							title: "Hasło",
							content: "Wprowadź hasło dla serwera SMTP. Wielkość liter ma znaczenie."
						}]
					},{
						content: "6. Włącz automatyczne wysyłanie e-maili - Zaznacz tę opcję, aby określić pory dnia automatycznego wysyłania dziennika systemowego.",
						children: [{
							type: "paragraph",
							content: "Aby codziennie wysyłać dziennik systemowy o określonej porze, wprowadź dane w polach Godziny (GG) i Minuty (MM) w formacie 24-godzinnym, np. 16:00 zamiast 4PM."
						},{
							type: "paragraph",
							content: "Aby wysyłać dzienniki systemowe o określonej godzinie lub w określonych ramach czasowych, wprowadź odpowiednie dane godzinowe."
						}]
					},
					"7. Naciśnij Zapisz."
				]
			}]
		},

		TRAFFIC_STATISTIC: {	
			TITLE: "Statystyki ruchu",
			CONTENT: [{
				type: "paragraph",
				content: "Na stronie statystyk ruchu wyświetlane są informacje na temat wysłanych i odebranych pakietów w sieci LAN, WAN oraz WLAN."
			},{
				type: "name",
				title: "Statystyki ruchu",
				content: "Zaznacz Włącz, aby wyświetlić statystyki."
			}]
		},
		TRAFFIC_STATISTIC_LIST: {	
			TITLE: "Lista statystyk",
			CONTENT: [{
				type: "name",
				title: "Adres IP/Adres MAC",
				content: "Wyświetla adres IP i adres MAC powiązanego urządzenia klienckiego."
			},{
				type: "name",
				title: "Suma pakietów",
				content: "Wyświetla łączną ilość pakietów przesyłanych i odbieranych przez urządzenie klienckie od początku bieżącej sesji lub ostatniego wyzerowania licznika."
			},{
				type: "name",
				title: "Suma bajtów",
				content: "Wyświetla łączną ilość bajtów przesłanych i odebranych przez urządzenie klienckie od początku bieżącej sesji lub ostatniego wyzerowania licznika."
			},{
				type: "name",
				title: "Aktualne pakiety",
				content: "Wyświetla aktualną ilość pakietów przesłanych i odebranych w określonym przedziale czasowym."
			},{
				type: "name",
				title: "Aktualne bajty",
				content: "Wyświetla aktualną ilość bajtów przesłanych i odebranych w określonym przedziale czasowym."
			},{
				type: "name",
				title: "Zmień",  
				content: "Daje możliwość Zresetowania (do zera) i Usunięcia odpowiedniej statystyki z listy."
			},{
				type: "name",
				title: "Odśwież",
				content: "Naciśnij, aby zaktualizować informacje na temat statystyk."
			},{
				type: "name",
				title: "Zresetuj wszystkie",
				content: "Naciśnij, aby wyzerować wszystkie dane dotyczące statystyk."
			},{
				type: "name",
				title: "Usuń wszystkie",
				content: "Naciśnij, aby usunąć z listy wszystkie informacje dotyczące statystyk."
			}]
		},
		
		SYSTEM_PARA_WIRELESS: {	
			TITLE: "Sieć bezprzewodowa 2,4GHz/5GHz/60GHz",
			CONTENT: [{
				type: "name",
				title: "Interwał pakietów Beacon",
				content: "Wprowadź wartość z przedziału 40-1000 w milisekundach, aby określić odstęp czasowy pomiędzy poszczególnymi pakietami Beacon, które są transmitowane przez router, w celu synchronizacji sieci bezprzewodowej. Wartością domyślną jest 100 milisekund."
			},{
				type: "name",
				title: "Próg RTS",
				content: "Wprowadź wartość z przedziału 1-2346, aby określić dopuszczalny rozmiar pakietu transmisji danych przez router.  Domyślną wielkością dla progu RTS jest 2346. Jeśli rozmiar pakietu jest większy od ustawionego progu, router wysyła żądanie wysłania ramek do określonego urządzenia lub negocjuje wysłanie ramki danych, aby odpowiednie pakiety były natychmiast wysłane."
			},{
				type: "name",
				title: "Interwał DTIM",
				content: "Wartość ta określa interwał pomiędzy komunikatami DTIM. Wprowadź wartość z przedziału 1-15 w milisekundach. Ustawiona domyślna wartość 1 oznacza, że komunikaty DTIM będą wysyłane z tą samą częstotliwością co pakiety Beacon."
			},{
				type: "name",
				title: "Częstotliwość aktualizacji klucza grupowego",
				content: "Wprowadź liczbę w sekundach (minimum 30), aby określić interwał pomiędzy automatycznymi aktualizacjami klucza szyfrowania. Wartością domyślną jest 0, oznaczającą, że klucz nie jest aktualizowany."
			},{
				type: "name",
				title: "Multiuser-MIMO",
				content: "Technologia ta pozwala na połączenie punkt-punkt z maksymalnie trzema urządzeniami jednocześnie. Zastosowanie tej opcji drastycznie zwiększa prędkość i zmniejsza czas oczekiwania urządzeń w porównaniu ze standardową architekturą sieci, dzięki czemu można zminimalizować zatory sieciowe i obsłużyć większą liczbę urządzeń."
			},{
				type: "name",
				title: "WMM",
				content: "Funkcja WMM zapewnia zwiększoną wydajność wysyłania pakietów o wysokim priorytecie. Zalecane jest pozostawienie tej opcji włączonej."
			},{
				type: "name",
				title: "Krótki GI",
				content: "Zalecane jest pozostawienie tej funkcji włączonej. Zwiększa ona prędkość wysyłania danych poprzez skrócenie okresu GI (Guard Interval)."
			},{
				type: "name",
				title: "Izolacja AP",
				content: "Jeżeli chcesz, aby urządzenia podłączone do sieci bezprzewodowej nie mogły komunikować się między sobą, ale miały dostęp do Internetu, wybierz opcję Włącz Izolację AP."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		SYSTEM_PARA_WDS: {	
			TITLE: "Połączenie WDS 2,4GHz/5GHz",
			CONTENT: [{
				type: "name",
				title: "Włącz połączenie WDS",
				content: "Włącz funkcję połączenia WDS, aby sygnał routera mógł być rozgłaszany za pomocą innego punktu dostępowego (AP) w bezprzewodowej sieci lokalnej (WLAN). Jeśli funkcja jest włączona, skonfiguruj poniższe dane:",
			},{
				type: "name",
				title: "SSID (sieci docelowej)",
				content: "Wprowadź SSID urządzenia, z którym się łączysz lub naciśnij przycisk Wykryj, aby wyszukać dostępne urządzenia."
			},{
				type: "name",
				title: "Wykryj",
				content: "Naciśnij ten przycisk, aby wyświetlić identyfikator SSID, adres MAC oraz informacje na temat siły sygnału, kanału oraz zabezpieczeń wszystkich dostępnych sieci bezprzewodowych. Po wybraniu sieci, informacje na temat identyfikatora SSID, adresu MAC i zabezpieczeń zostaną automatycznie pobrane."
			},{
				type: "name",
				title: "Adres MAC (sieci docelowej)",
				content: "Wprowadź adres MAC (BBSID) bezprzewodowego punktu dostępowego, z którym router będzie się łączyć jako klient, używając 12 znaków w formacie szesnastkowym (0-9, a-f, A-F) i oddzielając je myślnikami. Jeżeli wybierzesz punkt dostępowy za pomocą funkcji Przeglądaj, pole adresu MAC wypełni się automatycznie. "
			},{
				type: "name",
				title: "Tryb WDS",
				content: "Ustal tryb WDS wybierając Automatyczny, WDS1 lub WDS2."
			},{
				type: "name",
				title: "Zabezpieczenia",
				content: "Wybierz odpowiedni typ zabezpieczeń wybranego punktu dostępowego: Brak, WPA-PSK/WPA2-PSK lub WEP. Jeśli punkt dostępowy wybierzesz poprzez funkcję Wykryj, pole to wypełni się automatycznie.",
				children: [{
					type: "name",
					title: "Hasło",
					content: "Opcja ta jest dostępna gdy wybranym typem zabezpieczeń jest WPA-PSK/WPA2-PSK lub WEP. Wprowadź klucz zabezpieczeń wybranego punktu dostępowego."
				},{
					type: "name",
					title: "Typ uwierzytelniania",
					content: "Opcja ta jest dostępna gdy wybranym typem zabezpieczeń jest WEP. Wybierz odpowiedni typ uwierzytelniania (Automatyczny, Otwarty lub Klucz wspólny) dla wybranego punktu dostępowego."
				},{
					type: "name",
					title: "Format klucza WEP",
					content: "Opcja ta jest dostępna gdy wybranym typem zabezpieczeń jest WEP. Wybierz odpowiedni format klucza (ASCII lub szesnastkowy) dla wybranego punktu dostępowego."
				}]
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		SYSTEM_PARA_WPS: {	
			TITLE: "WPS",
			CONTENT: [{
				type: "paragraph",
				content: "Zaznacz Włącz WPS i naciśnij Zapisz, aby włączyć funkcję WPS, która pozwala urządzeniom z włączoną funkcją WPS na łatwą konfigurację i nawiązanie połączenia poprzez naciśnięcie przycisku."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		SYSTEM_PARA_NAT: {
			TITLE: "NAT",
			CONTENT: [{
				type: "name",
				title: "NAT",
				content: "Zaznacz Włącz NAT i naciśnij Zapisz, aby uruchomić funkcję NAT (Network Address Translation)."
			},{
				type: "note",
				title: "Uwaga",
				content: "Jeżeli funkcja NAT jest wyłączona, skonfigurowane przekierowania nie będą aktywne."
			}/*,{
				type: "name",
				title: "NAT Boost",
				content: "Zaznacz Włącz NAT Boost i naciśnij Zapisz, aby maksymalnie zwiększyć przepustowość routera."
			},{
				type: "note",
				title: "Uwaga",
				content: "Uruchomiona funkcja NAT Boost powoduje automatycznie wyłączenie funkcji QoS i Statystyk ruchu."
			}*/,{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		SYSTEM_PARA_DOS: {
			TITLE: "Ustawienia poziomu ochrony DoS",
			CONTENT: [{
				type: "paragraph",
				content: "Ochrona DoS chroni sieć przed atakami ICMP-FLOOD, UDP-FLOOD oraz TCP-FLOOD."
			},{
				type: "name",
				title: "Poziom pakietów ICMP-FLOOD",
				content: "Wprowadź liczbę pakietów ICMP z przedziału 5-7200, aby uruchomić ochronę przed ICMP-FLOOD, gdy liczba pakietów przekroczy wartość ustawionego progu."
			},{
				type: "name",
				title: "Poziom pakietów UDP-FLOOD",
				content: "Wprowadź liczbę pakietów UDP z przedziału 5-7200, aby uruchomić ochronę przed UDP-FLOOD, gdy liczba pakietów przekroczy wartość ustawionego progu."
			},{
				type: "name",
				title: "Poziom pakietów TCP-FLOOD",
				content: "Wprowadź liczbę pakietów TCP-SYN z przedziału 5-7200, aby uruchomić ochronę przed TCP-SYN-FLOOD, gdy liczba pakietów przekroczy wartość ustawionego progu."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		SYSTEM_PARA_DUPLEX: {
			TITLE: "Dupleks",
			CONTENT: [{
				type: "name",
				title: "Dupleks",
				content: "Wybierz typ dupleksu z rozwijanej listy."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		SYSTEM_PARA_LED:{
			TITLE: "Diody",
			CONTENT: [{
				type: "name",
				title: "Włącz tryb nocny",
				content: "Zaznacz tę opcję, aby diody wyłączały się automatycznie w określonych godzinach, nie wpływając na funkcjonowanie routera."
			},{
				type: "name",
				title: "Harmonogram trybu nocnego",
				content: "Wybierz godziny, w których tryb nocny ma być aktywny."
			},{
				type: "paragraph",
				content: "Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		OPEN_VPN:{
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "paragraph",
				content: "Funkcja OpenVPN umożliwia bezpieczne korzystanie z sieci domowej za pomocą Internetu, gdy jesteś poza domem. Aby korzystać z usługi VPN, musisz skonfigurować usługę dynamicznego DNS (zalecane) lub przydzielić statyczny adres IP dla portu WAN routera. Czas systemowy powinien zsynchronizować się z czasem pobranym z Internetu. "
			},{
				type: "name",
				title: "Włącz serwer VPN",
				content: "Zaznacz, aby włączyć serwer OpenVPN."
			},{
				type: "name",
				title: "Typ usługi",
				content: "Wybierz protokół komunikacyjny: UDP lub TCP."
			},{
				type: "name",
				title: "Port",
				content: "Wprowadź numer portu komunikacyjnego wybierając liczbę od 1024 do 65535. Domyślnie ustawionym portem usługi jest 1194."
			},{
 				type: "name",
				title: "Maska sieci/podsieci VPN",
				content: "Wprowadź zakres adresów IP, które mogą być przydzielane klientom przez serwer OpenVPN."
			},{
				type: "name",
				title: "Typ dostępu",
				content: "Wybierz typ dostępu dla klienta OpenVPN.",
				children: [{
				type: "name",
				title: "Tylko sieć domowa",
					content: "Klienci mogą uzyskać dostęp tylko do sieci domowej. Domyślna trasa klienta nie zostanie zmieniona."
			},{
				type: "name",
				title: "Sieć domowa i Internet",
					content: "Klienci mogą uzyskać dostęp do sieci domowej, stron internetowych lub usług z pewnymi ograniczeniami geograficznymi, w przypadku przebywania poza granicami kraju. Trasa domyślna klienta zostanie zmieniona."
				}]
			}]
		},
		OPEN_VPN_CERTIFICATE:{
			TITLE: "Certyfikat",
			CONTENT: [{
				type: "paragraph",
				content: "Skorzystaj z certyfikatu, aby uzyskać informacje i zidentyfikować połączenie VPN dla zdalnych klientów."
			},{
				type: "name",
				title: "Generuj",
				content: "Naciśnij, aby wygenerować nowy certyfikat."
			}]
		},
		OPEN_VPN_CONF:{
			TITLE: "Plik konfiguracyjny",
			CONTENT: [{
				type: "paragraph",
				content: "Klienci zdalni będę korzystać z pliku konfiguracyjnego, aby uzyskać dostęp do twojego routera."
			},{
				type: "name",
				title: "Eksportuj",
				content: "Naciśnij, aby zapisać plik konfiguracyjny OpenVPN."
			}]
		},
		OPEN_VPN_GUIDE:{
			TITLE: "Instrukcja użytkownika dla klienta VPN",
			CONTENT: [{
				type: "step",
				title: "Aby połączyć urządzenia klienckie z serwerem OpenVPN:",
				content:[{
					type: "paragraph",
					content: "Przed konfiguracją serwera OpenVPN, skonfiguruj usługę Dynamicznego DNS (zalecane) lub przydziel statyczny adres IP dla protu WAN. Upewnij się, że zewnętrzny port ustawień NAT nie jest portem usług, a Czas systemowy zsynchronizowany jest z czasem pobranym z Internetu. "
				},
					"1. Wybierz Włącz serwer VPN.",
					"2. Skonfiguruj parametry serwera OpenVPN (typ usługi, port usługi, dostęp klienta, maska sieci/podsieci VPN) i naciśnij Zapisz.",
					"3. Naciśnij Eksportuj, aby zapisać plik konfiguracyjny.",
					"4. Zainstaluj narzędzie OpenVPN na swoje urządzenia klienckie, pobierając je z <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> Narzędzie obsługiwane jest na systemach Windows, Mac OSX, Linux. ",
					"5. Uruchom narzędzie klienckie OpenVPN i dodaj nowe połączenie VPN korzystając z zapisanego pliku konfiguracyjnego, aby połączyć swoje urządzenie klienckie z serwerem VPN. "
				]},{
					type: "note",
					title: "Uwaga",
					content: "Więcej informacji na temat klientów VPN uzyskasz na stronie <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
				}]
		},
		PPTP_VPN:{
			TITLE: "VPN PPTP",
			CONTENT: [{
				type: "paragraph",
				content: "Połączenie PPTP VPN umożliwia łatwe korzystanie z Internetu i szybkie uzyskiwanie dostępu do sieci w przypadku obecności poza domem. Niektórzy usługodawcy internetowi mogą je blokować. Aby korzystać z usługi VPN, skonfiguruj usługę Dynamicznego DNS (zalecane) lub przydziel statyczny adres IP dla portu WAN. Czas systemowy powinien być zsynchronizowany z czasem pobranym z Internetu. "
			},{
				type: "name",
				title: "Włącz serwer VPN",
				content: "Wybierz, aby włączyć serwer PPTP VPN."
			},{
				type: "name",
				title: "Adres IP klienta",
				content: "Wprowadź adresy IP (do 10), które będą dostępne dla klientów serwera VPN."
			},{
 				type: "name",
				title: "Zezwól na dostęp do Samby (lokalizacja sieciowa)",
				content: "Wybierz, aby umożliwić klientom VPN uzyskanie dostępu do lokalnego serweru Samba."
			},{
				type: "name",
				title: "Zezwól na NetBIOS passthrough",
				content: "Wybierz, aby umożliwić klientom VPN uzyskanie dostępu do serweru Samba korzystając z nazwy NetBIOS."
			},{
				type: "name",
				title: "Zezwól na połączenia nieszyfrowane",
				content: "Wybierz, aby zezwolić na połączenia nieszyfrowane z twoim serwerem VPN."
			}]
		},
		PPTP_ACCOUNT_LIST:{
			TITLE: "Lista kont",
			CONTENT: [{
				type: "paragraph",
				content: "W tabeli wyświetlane są konta, które mogą służyć zdalnym klientom do połączeń z serwerem PPTP VPN."
			},{
				type: "step",
				title: "Aby dodać konto PPTP VPN",
				content: [
					"1. Naciśnij przycisk Dodaj.",
					"2. Wprowadź nazwę użytkownika i hasło, uwierzytelniające dostęp klientów do serwera PPTP VPN.",
					"3. Naciśnij OK."
				]
			},/*{
				type: "name",
				title: "Nazwa użytkownika i hasło",
				content: "Wprowadź nazwę użytkownika i hasło, które będą używane przez klientów do uwierzytelniania połączenia z serwerem VPN."
			},{
				type: "name",
				title: "zmień",
				content: "Umożliwia Zmianę lub Usunięcie wybranego konta."
			}*/
			{
				type: "step",
				title: "Aby zmienić lub usunąć istniejące konto",
				content: "W tabeli naciśnij ikonę Edytuj lub Kosz znajdujące się przy koncie, do którego chcesz wprowadzić zmiany lub które chcesz usunąć."
			}]
		},
		PPTP_VPN_GUIDE:{
			TITLE: "Instrukcja użytkownika dla klienta VPN",
			CONTENT: [{
				type: "step",
				title: "Aby połączyć urządzenia klienckie z serwerem PPTP VPN:",
				content:[{
					type: "paragraph",
					content: "Przed konfiguracją serwera PPTP VPN, skonfiguruj najpierw usługę Dynamicznego DNS (zalecane) lub przydziel statyczny adres IP dla portu WAN. Upewnij się, że numerem zewnętrznego portu ustawień NAT nie jest 1723, a Czas systemowy zsynchronizowany jest z czasem pobranym z Internetu."
				},
					"1. Wybierz Włącz serwer VPN.",
					"2. Skonfiguruj parametry serwera PPTP VPN i naciśnij Zapisz.",
					"3. Utwórz połączenia PPTP VPN na swoich urządzeniach klienckich. Jest to możliwe dla systemów Winsows, Mac OSX, Linus, iOS i Android.",
					"4. Uruchom program PPTP VPN, dodaj nowe połączenie i wprowadź nazwę domenową zarejestrowanej usługi DDNS lub statyczny adres IP przydzielony dla portu WAN, aby połączyć swoje urządzenia klienckie z serwerem PPTP VPN.",
				]}
			]
		},
		VPN_CONNNECTION:{
			TITLE: "Połączenia VPN",
			CONTENT: [{
				type: "paragraph",
				content: "Strona ta wyświetla klientów połączonych z serwerami VPN PPTP oraz OpenVPN uruchomionymi na routerze."
			},{
				type: "paragraph",
				content: "Naciśnij ikonkę Minus, aby rozłączyć wybranego klienta."
			}]
		},
		BASIC_NETWORK_INTEREST: {
			TITLE: "Internet",
			CONTENT: [{
				type: "name",
				title: "Stan",
				content: "Wyświetla aktualny stan połączenia z Internetem."
			},{
				type: "name",
				title: "Typ połączenia",
				content: "Wyświetla typ połączenia z Internetem."
			},{
				type: "name",
				title: "Adres IP",
				content: "Wyświetla aktualny adres IP przypisany routerowi."
			},{
				type: "name",
				title: "Połączenie dodatkowe/Adres IP",
				content: "Wyświetla typ połączenia zapasowego i przypisany mu adres IP."
			}]
		},
		BASIC_NETWORK_ROUTER: {
			TITLE: "Router",
			CONTENT: [{
				type: "title",
				title: "Sieć bezprzewodowa 2,4GHz/5GHz/60GHz"
			},{
				type: "name",
				title: "SSID",
				content: "Wyświetla nazwę sieci bezprzewodowej pasma 2,4GHz/5GHz/60GHz, z którym aktualnie połączony jest router."
			},{
				type: "name",
				title: "Kanał",
				content: "Wyświetla kanał rozgłaszania połączenia bezprzewodowego 2,4GHz/5GHz/60GHz."
			},{
				type: "name",
				title: "Adres MAC",
				content: "Wyświetla aktualny adres MAC połączenia bezprzewodowego 2,4GHz/5GHz/60GHz."
			},{
				type: "title",
				title: "Sieć dla gości 2,4GHz/5GHz"
			},{
				type: "name",
				title: "Stan",
				content: "Wyświetla aktualny stan sieci dla gości 2,4GHZ/5GHz (Włączona/Wyłączona)."
			},{
				type: "name",
				title: "SSID",
				content: "Wyświetla nazwę sieci dla gości."
			}]
		},
		BASIC_NETWORK_CLIENTS: {
			TITLE: "Klienci przewodowi/bezprzewodowi",
			CONTENT: [{
				type: "name",
				title: "Nazwa",
				content: "Wyświetla nazwę podłączonego urządzenia."
			},{
				type: "name",
				title: "Adres IP",
				content: "Wyświetla adres IP podłączonego urządzenia."
			},{
				type: "name",
				title: "Adres MAC",
				content: "Wyświetla adres MAC podłączonego urządzenia."
			}]
		},
		BASIC_NETWORK_PRINTER: {
			TITLE: "Drukarka",
			CONTENT: [{
				type: "name",
				title: "Nazwa",
				content: "Wyświetla nazwę drukarki podłączonej do routera przez port USB."
			}]
		},
		BASIC_NETWORK_USB: {
			TITLE: "Dysk USB",
			CONTENT: [{
				type: "name",
				title: "Dysk USB",
				content: "Wyświetla nazwę dysku USB podłączonego do routera."
			},{
				type: "name",
				title: "Całkowita pojemność",
				content: "Wyświetla całkowitą pojemność podłączonego urządzenia magazynującego USB."
			},{
				type: "name",
				title: "Wolne miejsce",
				content: "Wyświetla dostępną pojemność podłączonego urządzenia magazynującego USB."
			}]
		},
		BASIC_INTERNET: {
			TITLE: "Internet",
			CONTENT: [{
				type: "name",
				title: "Wykryj",
				content: "Naciśnij ten przycisk, aby router automatycznie wykrył typ połączenia z Internetem."
			},{
				type: "note",
				title: "Uwaga",
				content: "Jeżeli nie jesteś pewien jaki typ połączenia wybrać, wybierz opcję Wykryj lub skontaktuj się z dostawcą usług internetowych."
			},{
				type: "title",
				title: "Typ połączenia: Statyczne IP",
			},{
				type: "name",
				title: "Adres IP/Maska podsieci/Brama domyślna/Preferowany DNS/Alternatywny DNS",
				content: "Wprowadź parametry otrzymane od dostawcy."
			},{
				type: "title",
				title: "Typ połączenia: Dynamiczne IP",
			},{
				type: "name",
				title: "Nie klonuj adresu MAC/Klonuj adres MAC",
				content: "Wybierz odpowiednią opcję, w zależności od zaleceń dostawcy."
			},{
				type: "title",
				title: "Typ połączenia: PPPoE",
			},{
				type: "name",
				title: "Nazwa użytkownika/Hasło",
				content: "Wprowadź nazwę użytkownika oraz hasło otrzymane od dostawcy usług internetowych. Wielkość liter ma znaczenie."
			},{
				type: "title",
				title: "Typ połączenia: L2TP/PPTP",
			},{
				type: "name",
				title: "Nazwa użytkownika/Hasło",
				content: "Wprowadź nazwę użytkownika oraz hasło otrzymane od dostawcy usług internetowych. Wielkość liter ma znaczenie."
			},{
				type: "name",
				title: "Połączenie dodatkowe (Dynamiczne IP lub Statyczne IP)",
				children: [{
					type: "name",
					title: "Dynamiczne IP",
					content: "Zaznacz tą opcję jeżeli adres IP uzyskiwany jest automatycznie od dostawcy usług internetowych."
				},{
					type: "name",
					title: "Statyczne IP",
					content: "Zaznacz tę opcję jeżeli parametry połączenia zostały podane przez dostawcę usług internetowych, a następnie wprowadź je w poniższe pola."
				}]
			},{
				type: "name",
				title: "Adres IP/Nazwa domenowa serwera VPN",
				content: "Wprowadź adres IP serwera VPN oraz domenę, otrzymane od dostawcy."
			},{
				type:"paragraph",
				content:"Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		BASIC_WIRELESS: {
			TITLE: "Ustawienia sieci bezprzewodowej",
			CONTENT: [{
				type: "name",
				title: "Włącz",
				content: "Zaznacz tę opcję, aby włączyć nadawanie częstotliwości w paśmie 2,4GHz/5GHz/60GHz."
			},{
				type: "name",
				title: "Nazwa sieci bezprzewodowej (SSID)",
				content: "Użyj domyślnej nazwy sieci bezprzewodowej lub utwórz własną (do 32 znaków). Wielkość liter ma znaczenie."
			},{
				type: "name",
				title: "Ukryj nazwę sieci",
				content: "Zaznacz tę opcję, jeżeli nie chcesz, aby nazwa sieci (SSID) 2,4GHz/5GHz/60GHz wyświetlała się na liście sieci bezprzewodowych."
			},{
				type: "name",
				title: "Hasło",
				content: "Wprowadź hasło dla sieci bezprzewodowej odpowiednie dla wybranego trybu zabezpieczeń (wielkość liter ma znaczenie)."
			},{
				type:"paragraph",
				content:"Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		BASIC_DEVICE_SETTINGS: {
			TITLE: "Ustawienia urządzeń",
			CONTENT: [{
				type: "paragraph",
				content: "Na stronie Ustawienia urządzeń wyświetlane są informacje dotyczące każdego z urządzeń pamięci masowej USB, podłączonych do portu USB."
			},{
				type: "name",
				title: "Skanuj",
				content: "Zwykle router automatycznie wykrywa nowo podłączone urządzenie. Jeśli tak się jednak nie zdarzy, naciśnij ten przycisk, aby wyszukać wszystkie podłączone urządzenia. Następnie odśwież stronę, aby zaktualizować informacje."
			},{
				type: "name",
				title: "Wolumin",
				content: "Wyświetla nazwę woluminu podłączonego urządzenia."
			},{
				type: "name",
				title: "Pojemność",
				content: "Wyświetla całkowitą pojemność podłączonego urządzenia."
			},{
				type: "name",
				title: "Wolne miejsce",
				content: "Wyświetla ilość wolnego miejsca na podłączonym urządzeniu."
			},{
				type: "name",
				title: "Bezpieczne usuwanie",
				content: "Naciśnij ten przycisk, aby odmontować podłączony napęd przed jego fizycznym rozłączeniem.",
				children: [{
					type: "paragraph",
					content: "Zauważ, że przycisk Bezpieczne usuwanie pojawia się jedynie wtedy, gdy urządzenie pamięci masowej USB jest podłączone do routera. Nie da się wysunąć urządzenia USB podczas jego pracy."
				}]
			},{
				type: "name",
				title: "Stan",
				content: "Pojawia się jedynie wtedy, gdy urządzenie pamięci masowej USB podłączone jest do routera. Zaznacz tę opcję, aby włączyć udostępnianie plików urządzenia USB."
			}]
		},
		BASIC_SHARING_SETTINGS: {
			TITLE: "Ustawienia udostępniania",
			CONTENT: [{
				type: "name",
				title: "Nazwa serwera",
				content: "Wyświetla nazwę stosowaną do uzyskiwania dostępu do zasobów podłączonego urządzenia USB. Nazwa musi składać się z 4 -15 znaków alfanumerycznych, podkreśleń lub myślników."
			},{
				type:"paragraph",
				content:"Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		},
		BASIC_FOLDER_SHARING: {
			TITLE: "Udostępnianie folderów",
			CONTENT: [{
				type: "name",
				title: "Udostępnij wszystko",
				content: "Zaznacz Włącz, aby udostępnić wszystkie pliki i foldery, zaznacz Wyłącz aby udostępnić tylko wybrane foldery."
			},{
				type: "name",
				title: "Wymagaj uwierzytelniania",
				content: "Zalecane jest włączenie tej opcji. Przy próbie uzyskania dostępu do udostępnionych zasobów, użytkownik będzie musiał podać odpowiednią nazwę użytkownika oraz hasło."
			},{
				type: "name",
				title: "Nazwa folderu",
				content: "Wyświetla nazwę udostępnionego folderu."
			},{
				type: "name",
				title: "Ścieżka dostępu",
				content: "Wyświetla ścieżkę dostępu do udostępnionego folderu."
			},{
				type: "name",
				title: "Udostępnianie multimediów",
				content: "Wyświetla informacje na temat udostępniania plików multimedialnych."
			},{
				type: "name",
				title: "Nazwa woluminu",
				content: "Wyświetla nazwę współdzielonego woluminu."
			},{
				type: "name",
				title: "Stan",
				content: "Wyświetla stan udostępnionego folderu za pomocą ikony żarówki."
			},{
				type: "name",
				title: "Zmień",
				content: "Pozwala na zmianę ustawień lub usunięcie folderu."
			},{
				type: "name",
				title: "Dodaj",
				content: "Naciśnij ten przycisk, aby dodać nowy wpis."
			},{
				type: "name",
				title: "Usuń",
				content: "Naciśnij ten przycisk, aby usunąć wybrany wpis z tabeli."
			},{
				type: "name",
				title: "Przeglądaj",
				content: "Naciśnij ten przycisk, aby przeglądać dysk w celu wybrania folderu."
			},{
				type: "name",
				title: "Zezwól na dostęp sieci dla gości",
				content: "Zaznacz tę opcję, aby umożliwić klientom podłączonym do sieci dla gości na dostęp do udostępnionych folderów."
			},{
				type: "name",
				title: "Wymagaj uwierzytelniania",
				content: "Zaznacz tę opcję, aby użytkownik przy próbie uzyskania dostępu do zasobów musiał podać odpowiednią nazwę użytkownika oraz hasło."
			},{
				type: "name",
				title: "Włącz możliwość zapisu",
				content: "Zaznacz tę opcję, aby umożliwić użytkownikom wprowadzanie zmian w udostępnionych folderach."
			},{
				type: "name",
				title: "Włącz udostępnianie multimediów",
				content: "Zaznacz tę opcję, aby włączyć funkcję udostępniania plików multimedialnych."
			},{
				type: "name",
				title:"Odśwież",
				content: "Naciśnij ten przycisk, aby odświeżyć listę folderów. "
			}]
		},
		BASIC_PRINT_SERVER: {
			TITLE: "Serwer druku",
			CONTENT: [{
				type: "name",
				title: "Serwer druku",
				content: "Zaznacz Włącz, aby włączyć funkcję serwera druku."
			},{
				type: "name",
				title: "Nazwa drukarki",
				content: "Wyświetla nazwę drukarki podłączonej do routera."
			}]
		},
		BASIC_PARENTAL_CONTROL: {
			TITLE: "Kontrola rodzicielska",
			CONTENT: [{
				type: "paragraph",
				content: "Włączona funkcja Kontroli rodzicielskiej pozwala na blokowanie stron zawierających niewłaściwe i szkodliwe treści; możesz ustawić określone ramy czasowe blokowania stron (na przykład blokując stronę facebook lub youtube w porze odrabiania pracy domowej); jednocześnie, za pomocą jednego punktu kontrolnego, możesz chronić wszystkie urządzenia połączone z siecią domową przed instalacją złośliwego oprogramowania oraz wykradaniem poufnych informacji."
			},{
				type: "name",
				title: "Kontrola rodzicielska",
				content: "Włącz, aby uruchomić funkcję Kontroli rodzicielskiej. Domyślnie jest ona wyłączona."
			}]
		},
		BASIC_PARENTAL_DEVICE: {
			TITLE: "Urządzenia objęte kontrolą rodzicielską",
			CONTENT: [{
				type: "paragraph",
				content: "Wyświetla listę urządzeń objętych kontrolą rodzicielską."
			},{
				type: "name",
				title: "Nazwa urządzenia",
				content: "Wyświetla nazwy wszystkich podłączonych urządzeń klienckich objętych kontrolą rodzicielską."
			},{
				type: "name",
				title: "Adres MAC",
				content: "Wyświetla adresy MAC wszystkich podłączonych urządzeń klienckich objętych kontrolą rodzicielską."
			},{
				type: "name",
				title: "Czas dostępu do Internetu",
				content: "Wyświetla harmonogram dostępu do Internetu. Czas opiera się na zegarze routera, można go ustawić na stronie \"Narzędzia systemowe -> Ustawienia czasu\"."
			},{
				type: "name",
				title: "Opis",
				content: "Krótki opis podłączonego urządzenia (opcjonalnie)."
			},{
				type: "name",
				title: "Stan",
				content: "Wyświetla stan funkcji kontroli rodzicielskiej dla danego urządzenia (Włączona/Wyłączona)."
			},{
				type: "name",
				title: "Zmień",
				content: "Pozwala na zmianę ustawień lub usunięcie wpisu."
			},{
				type: "step",
				title: "Aby dodać regułę kontroli dostępu dla nowego urządzenia:",
				content:[
					"1. Naciśnij przycisk Dodaj.",
					"2. Naciśnij przycisk Wyświetl urządzenia i wybierz odpowiednie urządzenie z Listy urządzeń lub wprowadź nazwę i adres MAC urządzenia ręcznie, aby dodać urządzenie, które nie jest aktualnie podłączone.",
					"3. Wybierz czas, w którym reguła ma być aktywna, korzystając z pola Czas dostępu do Internetu.",
					"4. Wprowadź krótki opis w polu Opis (opcjonalnie).",
					"5. Zaznacz Włącz.",
					"6. Naciśnij przycisk OK, aby utworzyć wpis."
				]
			},{
				type: "paragraph",
				content: "Naciśnij ikonę Edytuj lub Usuń w tabeli, aby zmienić lub skasować odpowiedni wpis. "
			},{
				type: "paragraph",
				content: "Aby usunąć wiele wpisów jednocześnie, zaznacz je na liście, a następnie naciśnij przycisk Usuń nad tabelą."
			}]
		},
		BASIC_PARENTAL_RESTRICTION: {
			TITLE: "Blokowanie treści",
			CONTENT: [{
				type: "name",
				title: "Czarna lista",
				content: "Zawiera słowa kluczowe, które będą wyznacznikiem dla blokowania dostępu do stron internetowych urządzeniom klienckim, znajdującym się na liście kontroli rodzicielskiej.",
				children: [{
					type: "paragraph",
					content: "Naciśnij Dodaj nowe słowa kluczowe, aby dodać słowo kluczowe do czarnej listy. Aby je usunąć, naciśnij ikonę (-), znajdującą się przy danym słowie kluczowym."
				}]
			},{
				type: "name",
				title: "Biała lista",
				content: "Zawiera adresy stron internetowych, do których urządzenia klienckie, wyszczególnione na liście kontroli rodzicielskiej, mają dostęp.",
				children: [{
					type: "paragraph",
					content: "Naciśnij Dodaj nową nazwę domeny, aby dodać adres strony internetowej do białej listy. Aby usunąć stronę, naciśnij ikonę (-), znajdującą się przy danym adresie."
				}]
			},{
				type: "note",
				title: "Uwaga",
				content: "Słowa kluczowe mogą być nazwami domen, np. mail.google.com lub www.facebook.com."
			},{
				type: "paragraph",
				content: "Naciśnij przycisk Zapisz, aby zapisać ustawienia."
			}]
		},
		BASIC_GUEST_NETWORK: {
			TITLE: "Sieć dla gości",
			CONTENT: [{
				type: "paragraph",
				content: "Funkcja sieci dla gości pozwala na stworzenie sieci bezprzewodowej z osobną nazwą i hasłem, co umożliwia udostępnienie połączenia z Internetem z zachowaniem bezpieczeństwa sieci głównej."
			},{
				type: "name",
				title: "Pozwól gościom na komunikację między sobą",
				content: "Zaznacz tę opcję, aby klienci sieci dla gości widzieli się i mogli komunikować się między sobą."
			},{
				type: "name",
				title: "Pozwól gościom na dostęp do sieci lokalnej",
				content: "Zaznacz tę opcję, aby klienci sieci dla gości mieli dostęp do zasobów sieci lokalnej, takich jak np. drukarki lub udostępnione pliki."
			},{
				type: "name",
				title: "Włącz sieć dla gości",
				content: "Zaznacz tę opcję, aby włączyć funkcję sieci dla gości."
			},{
				type: "name",
				title: "Nazwa sieci bezprzewodowej (SSID)",
				content: "Użyj domyślnej nazwy sieci dla gości lub utwórz własną (do 32 znaków)."
			},{
				type: "name",
				title: "Ukryj nazwę sieci",
				content: "Zaznacz tę opcję, aby nazwa sieci nie była widoczna na liście dostępnych sieci bezprzewodowych."
			},{
				type: "name",
				title: "Hasło",
				content: "Utwórz hasło składające się z 8 - 63 znaków ASCII lub 8 - 64 znaków szesnastkowych, aby zabezpieczyć sieć dla gości."
			},{
				type:"paragraph",
				content:"Naciśnij Zapisz, aby zapisać ustawienia."
			}]
		}

	};
})(jQuery);
