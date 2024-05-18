(function($) {
    $.helpContent = {
        trafficCtrl: {
            TITLE: "Kontrola przepustowości",
            CONTENT: [{
                type: "paragraph",
                           content: "Kontrola przepustowości pozwala na konfigurację przepustowości wysyłania i przepustowości pobierania w sieci. Przepustowość całkowita nie powinna przekraczać 1000000 Kb/s. W celu ustawienia optymalnej przepustowości, wybierz prawidłowy typ łącza i zapytaj się u swojego usługodawcy internetowego o dozwoloną przepustowość całkowitą wysyłania i pobierania."
            }, {
                type: "name",
                           title: "Włącz",
                           content: "Zaznacz, aby włączyć funkcję kontroli przepustowości."
            }, {
                type: "name",
                           title: "Całkowita przepustowość wysyłania",
                           content: "Wprowadź całkowitą prędkość wysyłania na porcie WAN. "
            }, {
                type: "name",
                           title: "Całkowita przepustowość pobierania",
                           content: "Wprowadź całkowitą prędkość pobierania na porcie WAN. "
            }, {
                type: "title",
                content: "Reguły kontroli"
            }, {
                type: "name",
                           title: "Opis",
                           content: "Wyświetla zakres adresów IP lub portów."
            }, {
                type: "name",
                           title: "Priorytet",
                           content: "Wyświetla priorytet reguły. 1 to najwyższy priorytet, a 8 najniższy. Aby zagwarantować minimalną prędkość dla wszystkich reguł kontroli przepustowości, określona dla nich zostanie całkowita przepustowość wysyłania i pobierania. "
            }, {
                type: "name",
                           title: "Wysyłanie (min/max)",
                           content: "Wyświetla minimalną i maksymalną przepustowość wysyłania w kb/s."
            }, {
                type: "name",
                           title: "Pobieranie (min/max)",
                           content: "Wyświetla minimalną i maksymalną przepustowość pobierania w kb/s."
            }, {
                type: "name",
                           title: "Włącz",
                           content: "Określa obecny stan danej reguły. Naciśnij na ikonę żarówki, aby włączyć lub wyłączyć regułę. "
            }, {
                type: "name",
                           title: "Zmień",
                           content: "Umożliwia zmianę lub usunięcie danej reguły."
            }, {
                type: "note",
                           title: "Aby dodać nową regułę",
                content: [
                    "Naciśnij przycisk Dodaj.",
                "Wprowadź zakres adresów IP, które mają być kontrolowane.",
                    "Wprowadź zakres portów, które mają być kontrolowane.",
                    "Wybierz protokół.",
                    "Wprowadź priorytet dla reguły. (1 to najwyższy priorytet.)",
                    "Wprowadź minimalną oraz maksymalną prędkość wysyłania (w Kb/s) portu WAN.",
                    "Wprowadź minimalną oraz maksymalną prędkość pobierania (w Kb/s) portu WAN.",
                    "Zaznacz Włącz aby aktywować regułę.",
                    "Naciśnij przycisk OK."
                ]
            }, {
                type: "paragraph",
                           content: "<strong>Aby usunąć wiele reguł</strong><br>z Listy kontroli, zaznacz ramki przy wybranych regułach i naciśnij Usuń nad tabelką."
            }]
        },
        accessControl: {
               TITLE:"Kontrola dostępu",
            CONTENT: [{
                type: "paragraph",
                           content: "Funkcja kontroli dostępu służy udzielaniu lub blokowaniu dostępu do sieci komputerom i innym urządzeniom. Zablokowane urządzenie może otrzymać adres IP od routera, ale nie może komunikować się z innymi urządzeniami oraz nawiązać połączenia internetowego."
            }, {
                type: "paragraph",
                           content: "<strong>Uwaga:</strong>Aby korzystać z funkcji kontroli dostępu, włącz ją, a następnie zastosuj się do Instrukcji użytkowania.  Jeśli funkcja ta jest wyłączona, wszystkie urządzenia, łącznie z wyszczególnionymi na czarnej liście, mogą nawiązać połączenie."
            }, {
                type: "name",
                           title: "Kontrola dostępu",
                           content: "Wybierz \"Włącz\", aby włączyć funkcję kontroli dostępu."
            }, {
                type: "title",
                           content: "Tryb dostępu"
            }, {
                type: "name",
                           title: "Czarna lista",
                           content: "Zaznacz, aby zablokować dostęp urządzeniom wyszczególnionym na poniższej liście."
            }, {
                type: "name",
                           title: "Biała lista",
                           content: "Zaznacz, aby umożliwić dostęp tylko urządzeniom wyszczególnionym na poniższej liście."
            }, {
                type: "title",
                content: "Urządzenia na białej/czarnej liście."
            }, {
                type: "note",
                           title: "<strong>Aby dodać urządzenie do czarnej lub białej listy</strong>",
                content: [
                    "Naciśnij ikonę Dodaj.",
                "Wprowadź nazwę urządzenia.",
                "Wprowadź adres MAC urządzenia.",
                    "Naciśnij przycisk OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Aby zmienić lub usunąć urządzenie,</strong><br> naciśnij ikonę Edytuj lub Kosz przy odpowiednim wpisie w tabeli Czarna/Biała lista."
            }, {
                type: "paragraph",
                           content: "<strong>Aby usunąć wiele urządzeń,</strong><br> zaznacz wszystkie wybrane wpisy i naciśnij Usuń nad tabelą Czarna/Biała lista."
            }, {
                type: "title",
                           content: "Aktywne urządzenia"
            }, {
                type: "name",
                           title: "Nazwa urządzenia",
                           content: "Wyświetla nazwę połączonego urządzenia."
            }, {
                type: "name",
                           title: "Adres IP",
                           content: "Wyświetla adres IP połączonego urządzenia."
            }, {
                type: "name",
                           title: "Adres MAC",
                           content: "Wyświetla adres MAC połączonego urządzenia."
            }, {
                type: "name",
                           title: "Typ połączenia",
                content: "Wyświetla typ połączenia, stosowany przez urządzenie (przewodowy lub bezprzewodowy)."
            }, {
                type: "paragraph",
                           content: "<strong>Aby zablokować jedno lub wiele urządzeń,</strong><br> zaznacz wszystkie wybrane wpisy i naciśnij Zablokuj nad tabelą Aktywne urządzenia. Wybrane urządzenia będą automatycznie dodawane do czarnej listy. "
            }]
        },
        arpBind: {
               TITLE:"Ustawienia",
            CONTENT: [{
                type: "paragraph",
                           content: "Wiązanie adresu IP i adresu MAC (wiązanie ARP) stosuje się do kontrolowania dostępu określonego komputera do sieci LAN, poprzez wiązanie adresu IP z adresem MAC. Wiązanie ARP uniemożliwia także innym urządzeniom korzystanie z określonego adresu IP."
            }, {
                type: "name",
                           title: "Wiązanie IP & MAC",
                           content: "Wybierz \"Włącz\", aby włączyć funkcję wiązania adresu IP i adresu MAC."
            }, {
                type: "title",
                            title: "Lista wiązań"
            }, {
                type: "note",
                           title: "<strong>Aby skonfigurować wiązanie ARP na urządzeniu</strong> ",
                content: [
                "Naciśnij przycisk Dodaj.",
                "Wprowadź adres MAC urządzenia.",
                    "Wprowadź adres IP, który chcesz powiązać z powyższym adresem MAC.",
                "Zaznacz Włącz.",
                    "Naciśnij przycisk OK."
                ]
            }, {
                type: "paragraph",
                           content: "<strong>Aby zmienić lub usunąć wpis,</strong><br> naciśnij na ikonę Edytuj lub Kosz przy odpowiednim wpisie z Listy wiązań."
            }, {
                type: "paragraph",
                           content: "<strong>Aby usunąć wiele wpisów,</strong><br> zaznacz wybrane wpisy i naciśnij Usuń nad Listą wiązań."
            }, {
                type: "title",
                            title: "Lista ARP"
            }, {
                type: "paragraph",
                           content: "Wyświetla adres MAC i adres IP połączonych urządzeń."
            }, {
                type: "name",
                           title: "Nazwa urządzenia",
                           content: "Wyświetla nazwę podłączonego urządzenia."
            }, {
                type: "name",
                           title: "Adres MAC",
                           content: "Wyświetla adres MAC połączonego urządzenia."
            }, {
                type: "name",
                           title: "Adres IP",
                           content: "Wyświetla adres IP przydzielony połączonemu urządzeniu."
            }, {
                type: "name",
                title: "Powiąż",
                           content: "Informuje czy adres MAC i adres IP są powiązane ze sobą. "
            }, {
                type: "name",
                           title: "Zmień",
                           content: "Umożliwia usunięcie wpisu z listy."
            }, {
                type: "paragraph",
                           content: "<strong>Uwaga:</strong>Nie można wiązać tego samego adresu IP z więcej niż jednym adresem MAC."
            }, {
                type: "paragraph",
                           content: "<strong>Aby powiązać wiele urządzeń</strong><br>z listy ARP, zaznacz wybrane urządzenia i naciśnij Powiąż nad tabelą. "
            }]
        },
        alg: {
               TITLE:"Application Layer Gateway (ALG)",
            CONTENT: [{
                type: "paragraph",
                content: "ALG umożliwia filtrom przeglądania NAT podłączenie do bramy, aby wspierać translację adresów i portów dla określonych protokołów \"kontrola/dane\" warstwy aplikacji: FTP, TFTP, H323 itd. Zaleca się włączenie funkcji ALG."
            }, {
                type: "name",
                title: "PPTP Pass-through",
                content: "Umożliwia tunelowanie sesji Point-to-Point poprzez sieć IP i przekazywanie przez router."
            }, {
                type: "name",
                title: "L2TP Pass-through",
                content: "Umożliwia tunelowanie Warstwy 2 sesji Point-to-Point poprzez sieć IP i przekazywanie przez router."
            }, {
                type: "name",
                title: "IPSec Pass-through",
                content: "Umożliwia tunelowanie zabezpieczeń protokołów IPSec poprzez sieć IP i przekazywanie przez router. IPSec korzysta z zabezpieczeń kryptograficznych, aby zapewnić bezpieczeństwo połączeń nawiązywanych poprzez sieci IP. "
            }, {
                type: "name",
                title: "FTP ALG",
                content: "Umożliwia klientom i serwerom FTP (File Transfer Protocol) przesył danych poprzez NAT."
            }, {
                type: "name",
                title: "TFTP ALG",
                content: "Umożliwia klientom i serwerom TFTP (Trivial File Transfer Protocol) przesył danych poprzez NAT."
            }, {
                type: "name",
                title: "RTSP ALG",
                           content: "Umożliwia klientom media player na komunikację z serwerami przesyłu strumieniowego multimediów poprzez NAT."
            }, {
                type: "name",
                           title: "H323 ALG",
                content: "Umożliwia klientom Microsoft NetMeeting na komunikację poprzez NAT."
            }, {
                type: "name",
                title: "SIP ALG",
                content: "Umożliwia klientom i serwerom SIP przesył danych poprzez NAT."
            }, {
                type: "name",
                title: "Zapisz",
                content: "Naciśnij, aby zapisać ustawienia."
            }]
        },
        virtualServer: {
            TITLE: "Serwery wirtualne",
            CONTENT: [{
                type: "paragraph",
                content: "Serwery wirtualne umożliwiają dostęp z sieci zewnętrznej do usług uruchomionych na urządzeniach podłączonych do sieci lokalnej. Serwer wirtualny określany jest jako port przychodzący. Wszelkie żądania z Internetu kierowane do tego portu będą przekierowywane do wyznaczonego komputera, którego adres IP musi być skonfigurowany na statyczny lub zarezerwowany."
            }, {
                type: "name",
                title: "Typ usługi",
                content: "Wyświetla nazwę serwera wirtualnego."
            }, {
                type: "name",
                title: "Port przychodzący",
                content: "Wyświetla numer portu lub zakres portów, z których korzysta serwer wirtualny. "
            }, {
                type: "name",
                title: "IP wewnętrzne",
                content: "Wyświetla adres IP komputera z uruchomioną usługą."
            }, {
                type: "name",
                title: "Port wewnętrzny",
                content: "Wyświetla numer portu komputera z uruchomioną usługą."
            }, {
                type: "name",
                title: "Protokół",
                content: "Wyświetla protokół, z którego korzysta usługa: TCP, UDP lub Wszystkie (Wszystkie protokoły obsługiwane przez router)."
            }, {
                type: "name",
                title: "Stan",
                content: "Wyświetla aktualny stan przekierowania. Naciśnij ikonę żarówki, aby włączyć (lub wyłączyć) wpis."
            }, {
                type: "name",
                title: "Zmień",
                content: "Umożliwia zmianę lub usunięcie poszczególnych reguł."
            }, {
                type: "note",
                title: "<strong>Aby dodać wpis serwera wirtualnego</strong>",
                content: [
                    "Naciśnij przycisk Dodaj.",
                    "Wybierz nazwę interfejsu z rozwijanej listy.",
                    "Naciśnij przycisk Wyświetl usługi i wybierz usługę z rozwijanej listy. Jeżeli usługi nie ma na liście, wprowadź port zewętrzny (np. 21) lub zakres portów (np. 21-25). Jeżeli port wewnętrzny jest taki sam jak zewnętrzny, zostaw to pole puste, w innym wypadku wprowadź pojedynczy port (np. 21).",
                    "Wprowadź w notacji dziesiętnej adres IP komputera na którym uruchomiona jest usługa.",
                    "Wybierz protokół z którego korzysta usługa: TCP, UDP lub WSZYSTKIE.",
                    "Zaznacz Włącz ten wpis.",
                    "Naciśnij przycisk OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Aby zmienić lub usunąć wpis,</strong><br> naciśnij na ikonę Edytuj lub Kosz przy odpowiednim serwerze wirtualnym. "
            }, {
                type: "paragraph",
                content: "<strong>Aby usunąć wiele wpisów,</strong><br> zaznacz wszystkie wybrane serwery wirtualne i naciśnij Usuń nad tabelą."
            }, {
                type: "paragraph",
                content: "<strong>Uwaga:</strong><br>Jeśli twoje urządzenie lokalne ma do dyspozycji więcej niż jeden typ usługi, konieczne jest utworzenie wirtualnego serwera dla każdej z nich. "
            }]
        },
        portTrigger: {
            TITLE: "Port Triggering",
            CONTENT: [{
                type: "paragraph",
                content: "Port Triggering służy do przekierowywania ruchu do określonego punktu serwera w sieci. "
            }, {
                type: "name",
                title: "Usługa",
                content: "Wyświetla nazwę usługi."
            }, {
                type: "name",
                title: "Port otwierający",
                content: "Wyświetla port ruchu wychodzącego, aby umożliwić utworzenie reguły filtrowania połączeń wychodzących."
            }, {
                type: "name",
                title: "Protokół otwierający",
                content: "Wyświetla protokół, z którego korzysta port otwierający. TCP, UDP lub Wszystkie (Wszystkie protokoły obsługiwane przez router)."
            }, {
                type: "name",
                title: "Port przychodzący",
                content: "Wyświetla port lub zakres portów, z których korzysta system zdalny. Odpowiedź zostanie przekierowana za pomocą jednego z tych portów do komputera, który utworzył daną regułę. Maksymalnie można wprowadzić 5 grup portów (lub części portów). Każda grupa portów musi być oddzielona przecinkiem, na przykład: 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
            }, {
                type: "name",
                title: "Protokół przychodzący",
                content: "Wyświetla protokół, z którego korzysta port odbierający: TCP, UDP lub Wszystkie (Wszystkie protokoły obsługiwane przez router)."
            }, {
                type: "name",
                title: "Stan",
                content: "Wyświetla aktualny stan (włączony lub wyłączony) określnej reguły filtrowania. "
            }, {
                type: "name",
                title: "Zmień",
                content: "Umożliwia zmianę lub usunięcie poszczególnych wpisów."
            }, {
                type: "note",
                title: "<strong>Aby ustawić wpis portu przychodzącego</strong><br><strong>Uwaga: </strong><br> Tylko jeden komputer na raz może stosować dany wpis. ",
                content: [
                    "Naciśnij przycisk Dodaj.",
                    "Wybierz nazwę interfejsu z rozwijanej listy.",
                    "Naciśnij przycisk Wyświetl usługi i wybierz usługę z rozwijanej listy. Jeżeli usługi nie ma na liście, wprowadź wartości: Usługa, Port otwierający, Protokół otwierający, Port zewnętrzny i Protokół przychodzący. <br><strong>Uwaga:</strong>Zakresy portów poszczególnych wpisów nie mogą na siebie nachodzić (np. Wpis 1 ma zakres portów 4200-4205, Wpis 2 nie może mieć zakresu portów 4203-4206).",
                    "Zaznacz Włącz ten wpis.",
                    "Naciśnij przycisk OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Aby zmienić lub usunąć wpis,</strong><br> naciśnij na ikonę Edytuj lub Kosz przy odpowiednim porcie otwierającym."
            }, {
                type: "paragraph",
                content: "<strong>Aby usunąć wiele wpisów,</strong><br> zaznacz wszystkie porty otwierające i naciśnij Usuń nad tabelą."
            }]
        },
        dmz: {
            TITLE: "DMZ",
            CONTENT: [{
                type: "paragraph",
                content: "Funkcja hosta DMZ, poprzez połączenie internetowe, umożliwia lokalnemu komputerowi dostęp do usług specjalnych, takich jak gry online czy wideokonferencje. Zasadniczo DMZ umożliwia jednemu z komputerów w sieci LAN na otwarcie wszystkich swoich portów. Dany komputer musi mieć jedynie ustawiony statyczny adres IP oraz wyłączoną funkcję klienta DHCP."
            }, {
                type: "note",
                title: "<strong>Aby przydzielić komputerowi lub serwerowi funkcję serwera DMZ</strong>",
                content: [
                    "Zaznacz Włącz DMZ.",
                    "Wprowadź adres IP komputera będącego hostem DMZ.",
                    "Naciśnij przycisk Zapisz."
                ]
            }]
        },
        upnp: {
            TITLE: "UPnP",
            CONTENT: [{
                type: "paragraph",
                content: "Domyślnie funkcja UPnP (Universal Plug-and-Play) jest włączona, aby umożliwić urządzeniom, takim jak komputery czy sprzęt z usługą internetową, automatyczne identyfikowanie siebie nawzajem oraz komunikowanie się ze sobą w sieci lokalnej. "
            }, {
                type: "name",
                title: "UPnP",
                content: "Wybierz \"Włącz\", aby włączyć funkcję UPnP."
            }, {
                type: "title",
                content: "Lista usług UPnP"
            }, {
                type: "paragraph",
                content: "Lista aktualnych ustawień UPnP wyświetla informacje na temat urządzenia UPnP."
            }, {
                type: "name",
                title: "Numer klienta",
                content: "Wyświetla ilość urządzeń UPnP."
            }, {
                type: "name",
                title: "Opis usługi",
                content: "Wyświetla krótki opis komputera lokalnego, który zainicjował żądanie UPnP."
            }, {
                type: "name",
                title: "Port przychodzący",
                content: "Wyświetla otwarty port przychodzący komputera lokalnego. "
            }, {
                type: "name",
                title: "Protokół",
                content: "Wyświetla typ protokołu sieci, z którego korzysta komputer lokalny."
            }, {
                type: "name",
                title: "Wewnętrzny adres IP",
                content: "Wyświetla adres IP komputera lokalnego."
            }, {
                type: "name",
                title: "Port wewnętrzny",
                content: "Wyświetla otwarty port wewnętrzny, z którego korzysta komputer lokalny."
            }, {
                type: "paragraph",
                content: "Naciśnij <strong>Odśwież</strong>, aby zaktualizować Listę ustawień UPnP."
            }]
        },
        wlGuestDulBandAdv: {
            TITLE: "Sieć dla gości",
            CONTENT: [{
                type: "paragraph",
                content: "Sieć dla gości umożliwia utworzenie sieci z oddzielną nazwą (SSID) i hasłem, za pomocą którego goście mogą uzyskać dostęp do sieci bezprzewodowej. "
            }, {
                type: "title",
                           content: "Ustawienia"
            }, {
                type: "name",
                           title: "Pozwól gościom na komunikację między sobą",
                           content: "Zaznacz tę opcję, aby umożliwić urządzeniom bezprzewodowym połączonym z siecią dla gości na komunikację między sobą."
            }, {
                type: "name",
                           title: "Pozwól gościom na dostęp do sieci lokalnej ",
                           content: "Zaznacz tę opcję, aby umożliwić urządzeniom bezprzewodowym połączonym z siecią dla gości na dostęp do sieci lokalnej."
            }, {
                type: "name",
                title: "Zapisz",
                content: "Naciśnij, aby zapisać ustawienia."
            }, {
                type: "title",
                content: "Sieć bezprzewodowa"
            }, {
                type: "name",
                           title: "Ustawienia podstawowe 2,4GHz | 5GHz-1 | 5GHz-2",
                           content: "Naciśnij odpowiedni przycisk, aby włączyć sieć dla gości 2,4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "Nazwa sieci",
                           content: "Zostaw nazwę domyślną sieci dla gości lub wprowadź nazwę o długości do 32 znaków. Wielkość liter ma znaczenie."
            }, {
                type: "name",
                title: "Zabezpieczenia",
                content: "Wybierz jeden z poniższych typów zabezpieczeń:",
                children: [{
                    type: "name",
                    title: "Brak",
                    content: "Domyślnie sieć dla gości nie ma włączonych zabezpieczeń; każdy ma dostęp do sieci."
                }, {
                    type: "name",
                    title: "WPA/WPA2 - Personal",
                    content: "Wybierz tę opcję, aby włączyć standardową metodę uwierzytelniania, w oparciu o klucz współdzielony (hasło). Opcja ta jest domyślna i zalecana. Wymaga także dodatkowych konfiguracji. ",
                    children: [{
                        type: "name",
                        title: "Wersja",
                        content: "Wybierz wersję zabezpieczeń sieci dla gości.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Obsługuje takie standardy WPA (Wi-Fi Protected Access), jak WPA i WPA2. "
                        }, {
                            type: "name",
                            title: "WPA-PSK",
                            content: "Obsługuje szyfrowanie AES, zapewniając wyższy poziom bezpieczeństwa niż WPA-PSK, zaleca się ją włączyć."
                        }]
                    }, {
                        type: "name",
                        title: "Szyfrowanie",
                        content: "Wybierz typ szyfrowania: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard) lub Auto (zarówno TKIP, jak i AES). NIE zaleca się korzystania z szyfrowania TKIP jeśli router pracuje w standardzie 802.11n, ponieważ TKIP nie jest obsługiwane w tym standardzie. Po wybraniu TKIP, funkcja WPS zostanie wyłączona."
                    }]
                }]
            }, {
                type: "name",
                title: "Hasło",
                content: "Utwórz hasło używając od 8 do 63 znaków ASCII lub od 8 do 64 znaków szesnastkowych (0-9, a-f, A-F)."
            }, {
                type: "paragraph",
                           content: "Zalecenia dla sieci dla gości 2,4GHz mają także zastosowanie dla sieci 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "Zapisz",
                content: "Naciśnij, aby zapisać ustawienia."
            }]
        },
        wirelessStat: {
            TITLE: "Aktywne urządzenia",
            CONTENT: [{
                type: "name",
                title: "Adres MAC",
                content: "Wyświetla adres MAC powiązanego klienta bezprzewodowego."
            }, {
                type: "name",
                title: "Typ połączenia",
                content: "Wyświetla pasmo (2,4GHz lub 5GHz), za pomocą którego klient nawiązał połączenie."
            }, {
                type: "name",
                title: "Zabezpieczenia",
                content: "Wyświetla typ zabezpieczeń (Brak, WEP, WPA/WPA2-Personal lub WPA/WPA2-Enterprise) powiązanego klienta bezprzewodowego."
            }, {
                type: "name",
                title: "Otrzymane pakiety",
                content: "Wyświetla ilość pakietów otrzymanych od powiązanego klienta bezprzewodowego."
            }, {
                type: "name",
                title: "Wysłane pakiety",
                content: "Wyświetla ilość pakietów wysłanych przez powiązanego klienta bezprzewodowego."
            }, {
				type: "name",
				title: "Prędkość transmisji",
				content: "Wyświetla prędkość z jaką przesłany był ostatni pakiet odebrany przez klienta sieci bezprzewodowej."
			}, {
                type: "paragraph",
                content: "Naciśnij <strong>Odśwież</strong>, aby zaktualizować informacje na tej stronie."
            }]
        },
        wirelessAdv: {
            TITLE: "Ustawienia zaawansowane",
            CONTENT: [{
                type: "name",
                title: "2,4GHz | 5GHz-1 | 5GHz-2",
                content: "Wybierz sieć  2,4GHz | 5GHz-1 | 5GHz-2, aby skonfigurować zaawansowane ustawienia bezprzewodowe."
            }, {
                type: "name",
                title: "Interwał pakietów Beacon",
                content: "Wprowadź wartość z przedziału 25 - 1000 w milisekundach, aby określić odstęp czasowy pomiędzy poszczególnymi pakietami Beacon, które są transmitowane przez router, w celu synchronizacji sieci bezprzewodowej. Wartością domyślną jest 100 milisekund."
            }, {
                type: "name",
                title: "Próg RTS",
                content: "Wprowadź wartość z przedziału 1 - 2346, aby określić dopuszczalny rozmiar pakietu transmisji danych przez router.  Domyślną wielkością dla progu RTS jest 2346. Jeśli rozmiar pakietu jest większy od ustawionego progu, router wysyła żądanie wysłania ramek do określonego urządzenia lub negocjuje wysłanie ramki danych, aby odpowiednie pakiety były natychmiast wysłane."
            }, {
                type: "name",
                title: "Interwał DTIM",
                content: "Wprowadź wartość z przedziału 1 - 255 w milisekundach, aby określi interwał pomiędzy komunikatami DTIM. Ustawiona domyślna wartość 1 oznacza, że komunikaty DTIM będą wysyłane z tą samą częstotliwością co pakiety Beacon."
            }, {
                type: "name",
                title: "Częstotliwość aktualizacji klucza grupowego",
                content: "Wprowadź liczbę w sekundach (minimum 30), aby określić interwał pomiędzy automatycznymi aktualizacjami klucza szyfrowania. Wartością domyślną jest 0, oznaczającą, że klucz nie jest aktualizowany."
            }, {
                type: "name",
                title: "WMM",
                content: "Funkcja WMM zapewnia zwiększoną wydajność wysyłania pakietów o wysokim priorytecie. Dla trybu 802.11n i 802.11ac funkcja ta włączana jest automatycznie. Zalecane jest pozostawienie tej opcji włączonej."
            }, {
                type: "name",
                title: "Krótki GI",
                content: "Zalecane jest pozostawienie tej funkcji włączonej. Zwiększa ona prędkość wysyłania danych poprzez skrócenie okresu GI (Guard Interval)."
            }, {
                type: "name",
                title: "Izolacja AP",
                content: "Domyślnie funkcja ta jest wyłączona. Jeśli chcesz odizolować od siebie wszystkie podłączone urządzenia bezprzewodowe tak, by nie miały do siebie nawzajem dostępu poprzez sieć, a jednocześnie mogły nawiązać połączenie internetowe, zaznacz tę opcję."
            }, {
                type: "title",
                content: "WDS"
            }, {
                type: "name",
                title: "Połączenie WDS",
                content: "Włącz funkcję połączenia WDS, aby sygnał routera mógł być rozgłaszany za pomocą innego punktu dostępowego (AP) w bezprzewodowej sieci lokalnej (WLAN). Jeśli funkcja jest włączona, skonfiguruj poniższe dane:"
            }, {
                type: "name",
                title: "SSID (sieci docelowej)",
                content: "Wprowadź nazwę identyfikacyjną bezprzewodowego punktu dostępowego (WAP), z którym router połączy się jako urządzenie klienckie lub skorzystaj z funkcji Wykryj, aby wyszukać wszystkie dostępne sieci."
            }, {
                type: "name",
                title: "MAC (sieci docelowej)",
                content: "Używając 12 znaków w formacie szesnastkowym (0-9, a,-f, A-F), oddzielonych myślnikami, wprowadź adres MAC bezprzewodowego punktu dostępowego, z którym router będzie łączyć się jako urządzenie klienckie. Jeśli punkt dostępowy wybierzesz poprzez funkcję Wykryj, pole to wypełni się automatycznie."
            }, {
                type: "name",
                title: "Wykryj",
                content: "Naciśnij ten przycisk, aby wyświetlić nazwę, adres MAC oraz informacje na temat siły sygnału, kanału oraz zabezpieczeń wszystkich dostępnych sieci bezprzewodowych. Po wybraniu sieci, informacje na temat nazwy sieci, adresu MAC i zabezpieczeń zostaną automatycznie pobrane.",
                children: [{
                    type: "name",
                    title: "Lista AP",
                    content: "Wyświetla punkty dostępowe, z którymi router może nawiązać połączenie."
                }, {
                    type: "name",
                    title: "Adres MAC",
                    content: "Wyświetla adres MAC punktu dostępowego, z którym router nawiąże połączenie jako urządzenie klienckie."
                }, {
                    type: "name",
                    title: "SSID",
                    content: "Wyświetla nazwę punktu dostępowego, z którym router nawiąże połączenie jako urządzenie klienckie."
                }, {
                    type: "name",
                    title: "Siła sygnału",
                    content: "Wyświetla informacje o sile sygnału punktu dostępowego, z którym router nawiąże połączenie jako urządzenie klienckie."
                }, {
                    type: "name",
                    title: "Kanał",
                    content: "Wyświetla informacje o kanale punktu dostępowego, z którym router nawiąże połączenie jako urządzenie klienckie."
                }, {
                    type: "name",
                    title: "Szyfrowanie",
                    content: "Wyświetla informacje o typie zabezpieczeń punktu dostępowego, z którym router nawiąże połączenie jako urządzenie klienckie."
                }, {
                    type: "name",
                    title: "Połącz",
                    content: "Naciśnij tę ikonę, aby połączyć się lub zerwać połączenie z danym punktem dostępowym."
                }]
            }, {
                type: "name",
                title: "Zabezpieczenia",
                content: "Wybierz jeden z poniższych typów zabezpieczeń:",
                children: [{
                    type: "name",
                    title: "Brak",
                    content: "Wybierz tę opcję, aby wyłączyć zabezpieczenia sieci bezprzewodowej. Zalecane jest jednak wybranie jednego z typów zabezpieczeń, aby chronić sieć przed nieautoryzowanym dostępem."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Personal",
                    content: "Wybierz tę opcję, aby włączyć standardową metodę uwierzytelniania opartą na kluczu WPA. Jest to opcja zalecana, po jej wyborze skonfiguruj poniższe opcje. ",
                    children: [{
                        type: "name",
                        title: "Wersja",
                        content: "Wybierz wersję zabezpieczeń swojej sieci bezprzewodowej.",
                        children: [{
                            type: "name",
                            title: "WPA-PSK",
                            content: "Obsługuje szyfrowanie AES, zapewniając niższy poziom bezpieczeństwa niż WPA2-PSK."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Obsługuje szyfrowanie AES, zapewniając wyższy poziom bezpieczeństwa niż WPA-PSK, zaleca się ją włączyć."
                        }]
                    }, {
                        type: "name",
                        title: "Szyfrowanie",
                        content: "Wybierz typ szyfrowania: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard) lub Auto (zarówno TKIP, jak i AES). NIE zaleca się korzystania z szyfrowania TKIP, jeśli router pracuje w standardzie 802.11n, ponieważ TKIP nie jest obsługiwane w tym standardzie. Po wybraniu TKIP, funkcja WPS zostanie wyłączona."
                    }, {
                        type: "name",
                        title: "Hasło",
                        content: "Wprowadź hasło używając od 8 do 63 znaków ASCII lub od 8 do 64 znaków szesnastkowych (0-9, a-f, A-F)."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Wybierz tę opcję, aby włączyć podstawową metodę uwierzytelniania, jeżeli jakiekolwiek z twoich urządzeń bezprzewodowych nawiązuje połączenie jedynie za pomocą WEP. ",
                    children: [{
                        type: "name",
                        title: "Typ",
                        content: "Wybierz typ uwierzytelniania dla swojej sieci bezprzewodowej. Wybierz System otwarty oraz Klucz wspólny, w zależności od wymagań klienta bezprzewodowego."
                    }, {
                        type: "name",
                        title: "Format klucza WEP",
                        content: "Możesz wybrać format ASCII lub szesnastkowy. Format ASCII oznacza kombinację dowolnych znaków alfanumerycznych. Szesnastkowy oznacza kombinację określonych znaków alfanumerycznych (0-9, A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Indeks klucza",
                        content: "Wybierz jeden z czterech kluczy i wprowadź ustaloną wartość klucza WEP. Upewnij się, że wartość ta jest taka sama dla wszystkich urządzeń bezprzewodowych w twojej sieci. "
                    }, {
                        type: "name",
                        title: "Klucz",
                        content: "Wprowadź ustaloną wartość klucza WEP."
                    }]
                }]
            }, {
                type: "name",
                title: "Zapisz",
                content: "Naciśnij, aby zapisać ustawienia."
            }]
        },
        wirelessSchedule: {
            TITLE: "Harmonogram",
            CONTENT: [{
                type: "paragraph",
                content: "Harmonogram ustalany jest na podstawień ustawień czasu routera. Czas można ustawić w zakładce Narzędzia systemowe -> Ustawienia czasu. "
            }, {
                type: "name",
                title: "2,4GHz | 5GHz-1 | 5GHz-2",
                content: "Wybierz sieć 2,4GHz, 5GHz-1 lub 5GHz-2 , aby ustawić harmonogram połączeń bezprzewodowych."
            }, {
                type: "name",
                title: "Włącz harmonogram sieci bezprzewodowej",
                content: "Wybierz \"Włącz\", aby włączyć tę funkcję. Następnie naciśnij i przeciągnij kursor przez komórki, aby ustawić czas wyłączania sieci bezprzewodowej."
            }, {
                type: "name",
                title: "Odznacz",
                content: "Naciśnij, aby wybrać czas."
            }, {
                type: "name",
                title: "Zapisz",
                content: "Naciśnij, aby zapisać ustawienia."
            }]
        },
        macFilter: {
            TITLE: "Ustawienia filtrowania MAC",
            CONTENT: [{
                type: "name",
                title: "Włącz filtrowanie MAC",
                content: "Wybierz \"Włącz\", aby kontrolować dostęp do sieci bezprzewodowej za pomocą adresów MAC poszczególnych urządzeń."
            }, {
                type: "title",
                title: "Reguły filtrowania"
            }, {
                type: "name",
                title: "Blokuj dostęp urządzeniom na poniższej liście.",
                content: "Wybierz tę opcję, aby zablokować dostęp do sieci bezprzewodowej urządzeniom z listy."
            }, {
                type: "name",
                title: "Zezwalaj na dostęp urządzeniom na poniższej liście.",
                content: "Wybierz tę opcję, aby umożliwić dostęp do sieci bezprzewodowej urządzeniom z listy."
            }, {
                type: "title",
                title: "Lista urządzeń"
            }, {
                type: "name",
                title: "Adres MAC/Opis",
                content: "Wyświetla adres MAC i opis urządzenia."
            }, {
                type: "name",
                title: "Włącz",
                content: "Naciśnij na ikonę żarówki, aby włączyć lub wyłączyć filtrowanie MAC urządzenia."
            }, {
                type: "name",
                title: "Zmień",
                content: "Umożliwia zmianę lub usunięcie poszczególnych wpisów."
            }, {
                type: "note",
                title: "Aby dodać nowe urządzenie",
                content: [
                    "Naciśnij przycisk Dodaj.",
                    "Wprowadź adres MAC urządzenia.",
                    "Wprowadź opis urządzenia.",
                    "Zaznacz Włącz ten wpis.",
                    "Naciśnij przycisk OK."
                ]
            }]
        },
        wirelessSettings: {
            TITLE: "Ustawienia bezprzewodowe",
            CONTENT: [/*{
                type: "name",
                           title: "Region",
                           content: "Wybierz swój region z rozwijanej listy. Wyszczególnione tam są jedynie te regiony, gdzie funkcja połączenia bezprzewodowego routera jest dostępna. Korzystanie z tej funkcji w innych regionach może być nielegalne. Jeżeli twojego kraju lub regionu nie ma na liście, skontaktuj się z lokalną agencją rządową."
            }, */{
                type: "name",
                title: "Smart Connect",
                           content: "Zaznacz tę opcję, aby włączyć Smart Connect. Funkcja ta umożliwia szybszą pracę urządzeń, przydzielając im najmniej obciążone w danym momencie pasmo."
            }, {
                type: "name",
                title: "2,4GHz | 5GHz-1 | 5GHz-2",
                content: "Wybierz sieć 2,4GHz | 5GHz-1 | 5GHz-2, aby skonfigurować jej ustawienia."
            }, {
                type: "name",
                           title: "Włącz",
                           content: "Zaznacz tę opcję, aby urządzenie bezprzewodowe pracowało w paśmie 2,4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "Nazwa sieci bezprzewodowej (SSID)",
                content: "Zostaw nazwę domyślną lub wprowadź nazwę o długości do 32 znaków. Wielkość liter ma znaczenie."
            }, {
                type: "name",
                title: "Ukryj SSID",
                content: "Zaznacz tę opcję jeśli nie chcesz, aby nazwa sieci wyświetlała się na liście dostępnych sieci bezprzewodowych."
            }, {
                type: "name",
                title: "Zabezpieczenia",
                content: "Wybierz jeden z poniższych typów zabezpieczeń:",
                children: [{
                    type: "name",
                    title: "Brak zabezpieczeń",
                    content: "Wybierz tę opcję, aby wyłączyć zabezpieczenia sieci bezprzewodowej. Zalecane jest jednak wybranie jednego z typów zabezpieczeń, aby chronić sieć przed nieautoryzowanym dostępem."
                }, {
                    type: "name",
                    title: "WPA/WPA2-Personal",
                    content: "Wybierz tę opcję, aby włączyć standardową metodę uwierzytelniania, w oparciu o klucz współdzielony (hasło). Opcja ta jest domyślna i zalecana. Wymaga także dodatkowych konfiguracji. ",
                    children: [{
                        type: "name",
                        title: "Wersja",
                        content: "Wybierz wersję zabezpieczeń swojej sieci bezprzewodowej.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Obsługuje takie standardy WPA (Wi-Fi Protected Access), jak WPA i WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Obsługuje szyfrowanie AES, zapewniając wyższy poziom bezpieczeństwa niż WPA-PSK, zaleca się ją włączyć."
                        }]
                    }, {
                        type: "name",
                        title: "Szyfrowanie",
                        content: "Wybierz typ szyfrowania: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard) lub Auto (zarówno TKIP, jak i AES). NIE zaleca się korzystania z szyfrowania TKIP jeśli router pracuje w standardzie 802.11n, ponieważ TKIP nie jest obsługiwane w tym standardzie. Po wybraniu TKIP, funkcja WPS zostanie wyłączona."
                    }, {
                        type: "name",
                        title: "Hasło",
                        content: "Utwórz hasło sieci bezprzewodowej używając od 8 do 63 znaków ASCII lub od 8 do 64 znaków szesnastkowych (0-9, a-f, A-F)."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2-Enterprise",
                    content: "Wybierz tę opcję, aby włączyć bardziej zaawansowaną metodę uwierzytelniania opartą o serwer RADIUS. Funkcja WPS zostanie wyłączona.",
                    children: [{
                        type: "name",
                        title: "Wersja",
                        content: "Wybierz wersję zabezpieczeń swojej sieci bezprzewodowej.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Obsługuje takie standardy WPA (Wi-Fi Protected Access), jak WPA i WPA2."
                        }, {
                            type: "name",
                            title: "WPA2",
                            content: "Obsługuje szyfrowanie AES, zapewniając wyższy poziom bezpieczeństwa niż WPA-PSK, zaleca się ją włączyć."
                        }]
                    }, {
                        type: "name",
                        title: "Szyfrowanie",
                        content: "Wybierz typ szyfrowania: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard) lub Auto (zarówno TKIP, jak i AES). NIE zaleca się korzystania z szyfrowania TKIP jeśli router pracuje w standardzie 802.11n, ponieważ TKIP nie jest obsługiwane w tym standardzie. Po wybraniu TKIP, funkcja WPS zostanie wyłączona."
                    }, {
                        type: "name",
                        title: "IP serwera RADIUS",
                        content: "Wprowadź adres IP serwera RADIUS."
                    }, {
                        type: "name",
                        title: "Port serwera RADIUS",
                        content: "Wprowadź port serwera RADIUS."
                    }, {
                        type: "name",
                        title: "Hasło serwera RADIUS",
                        content: "Wprowadź hasło do serwera RADIUS."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Wybierz tę opcję, jeżeli jakiekolwiek z twoich urządzeń bezprzewodowych nie obsługuje opcji WPA. ",
                    children: [{
                        type: "name",
                        title: "Typ",
                        content: "Wybierz typ uwierzytelniania dla swojej sieci bezprzewodowej. Domyślnie ustawiona jest funkcja Auto, która umożliwia automatyczny wybór Systemu otwartego oraz Klucza wspólnego, w zależności od wymagań łączącego się urządzenia."
                    }, {
                        type: "name",
                        title: "Wybrany klucz",
                        content: "Wybierz jeden z czterech kluczy i wprowadź ustaloną wartość klucza WEP. Klienci bezprzewodowi muszą wprowadzić wartość klucza WEP, aby połączyć się z siecią."
                    }, {
                        type: "name",
                        title: "Format klucza WEP",
                        content: "Możesz wybrać format ASCII lub szesnastkowy. Format ASCII oznacza kombinację dowolnych znaków alfanumerycznych. Szesnastkowy oznacza kombinację określonych znaków alfanumerycznych (0-9, A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Typ klucza",
                        content: "Wybierz długość klucza WEP.",
                        children: [{
                            type: "name",
                            title: "Szyfrowanie 64-bitowe",
                            content: "Możesz wprowadzić 10 znaków szesnastkowych (0-9, a-f, A-F) lub 5 znaków ASCII."
                        }, {
                            type: "name",
                            title: "Szyfrowanie 128-bitowe",
                            content: "Możesz wprowadzić 26 znaków szesnastkowych (0-9, a-f, A-F) lub 13 znaków ASCII."
                        }]
                    }, {
                        type: "name",
                        title: "Klucz",
                        content: "Utwórz hasło WEP."
                    }]
                }]
            }, {
                type: "name",
                title: "Tryb",
                content: "Wybierz mieszany tryb transmisji."
            }, {
                type: "name",
                title: "Kanał",
                content: "Wybierz kanał dla sieci bezprzewodowej. Jeżeli problemy z działaniem sieci bezprzewodowej nie występują, zalecane jest pozostawienie tej opcji na ustawieniu Auto."
            }, {
                type: "name",
                title: "Szerokość kanału",
                content: "Wybierz szerokość kanału (szerokość pasma) dla sieci bezprzewodowej."
            }, {
                type: "name",
                title: "Moc transmisji",
                content: "Aby określić moc transmisji danych, wybierz spośród opcji Wysoka, Średnia lub Niska. Domyślnie ustawiona jest Wysoka (zalecane)."
            }, {
                type: "paragraph",
                content: "Naciśnij <strong>Zapisz</strong>, aby zapisać ustawienia."
            }]
        },
        wps: {
            TITLE: "PIN routera",
            CONTENT: [{
                type: "name",
                title: "PIN routera",
                content: "Wybierz \"Włącz\", aby urządzenia łączyły się z routerem przy użyciu kodu PIN routera."
            }, {
                type: "name",
                title: "Aktualny PIN",
                content: "Wyświetla kod PIN routera. Domyślny kod PIN znajduje się na naklejce u spodu routera lub w instrukcji użytkownika. Naciśnij przycisk Generuj, aby wygenerować nowy kod PIN lub naciśnij przycisk Domyślny, aby przywrócić domyślny kod PIN, ustawiany fabrycznie."
            }, {
                type: "title",
                content: "Ustawienia WPS"
            }, {
                type: "name",
                title: "Za pomocą przycisku (zalecane)",
                content: "Wybierz tę metodę konfiguracji, aby za pomocą WPS umożliwić urządzeniom, obsługującym tę funkcję, łatwe nawiązywanie połączeń z siecią bezprzewodową, jedynie poprzez naciśnięcie przycisku WPS lub przycisku Połącz. "
            }, {
                type: "name",
                title: "Za pomocą kodu PIN",
                content: "Wybierz tę metodę konfiguracji, aby dodać urządzenie ręcznie, wprowadzając numer PIN WPS urządzenia bezprzewodowego, a następnie naciskając przycisk Połącz."
            }, {
                type: "name",
                title: "Połącz",
                content: "Naciśnij, aby włączyć WPS."
            }]
        },
        parentCtrl: {
            TITLE: "Kontrola rodzicielska",
            CONTENT: [{
                type: "paragraph",
                content: "Włączona funkcja Kontroli rodzicielskiej pozwala na blokowanie stron zawierających niewłaściwe i szkodliwe treści; możesz ustawić określone ramy czasowe blokowania stron (na przykład blokując stronę facebook lub youtube w porze odrabiania pracy domowej)."
            }, {
                type: "name",
                title: "Kontrola rodzicielska",
                content: "Włącz, aby uruchomić funkcję kontroli rodzicielskiej. Domyślnie jest ona wyłączona."
            }, {
                type: "title",
                content: "Urządzenia objęte kontrolą rodzicielską"
            }, {
                type: "paragraph",
                content: "Wyświetla listę urządzeń objętych kontrolą rodzicielską."
            }, {
                type: "name",
                title: "Nazwa urządzenia",
                content: "Wyświetla nazwy wszystkich podłączonych urządzeń klienckich objętych kontrolą rodzicielską. "
            }, {
                type: "name",
                title: "Adres MAC",
                content: "Wyświetla adresy MAC wszystkich podłączonych urządzeń klienckich objętych kontrolą rodzicielską. "
            }, {
                type: "name",
                title: "Czas blokowania dostępu",
                content: "Wyświetla ramy czasowe blokowania dostępu."
            }, {
                type: "name",
                title: "Opis",
                content: "Wyświetla informacje na temat podłączonego urządzenia."
            }, {
                type: "name",
                title: "Stan",
                content: "Wyświetla aktualny stan funkcji kontroli rodzicielskiej dla określonego urządzenia. Naciśnij ikonę żarówki, aby ją włączyć lub wyłączyć."
            }, {
                type: "name",
                title: "Zmień",
                content: "Pozwala na zmianę lub usunięcie określonego urządzenia."
            }, {
                type: "note",
                title: "<strong>Aby zablokować dostęp nowemu klientowi</strong>",
                content: [
                    "Naciśnij przycisk Dodaj.",
                    "Naciśnij Wyświetl intniejące urządzenia i wybierz połączone urządzenie z listy, lub wprowadź wartoci Nazwa urządzenia oraz Adres MAC ręcznie.",
                    "Naciśnij Czas dostępu do Internetu aby wybrać okres czasu w którym reguła ma być aktywna.",
                    "Wprowadź krótki opis w polu Opis. Nie jest to wymagane.",
                    "Zaznacz Włącz.",
                    "Naciśnij przycisk OK aby zapisać regułę."
                ]
            }, {
                type: "paragraph",
                content: "<b>Aby zmienić lub usunąć urządzenie,</b><br> naciśnij ikonę Edytuj lub Kosz przy odpowiednim urządzeniu z listy kontroli rodzicielskiej."
            }, {
                type: "paragraph",
                content: "<b>Aby usunąć wiele urządzeń,</b><br> zaznacz wybrane urządzenia i naciśnij Usuń nad tabelą."
            }, {
                type: "title",
                title: "Blokowanie treści"
            }, {
                type: "paragraph",
                content: "Funkcja blokowania treści pozwala na ograniczenie dostępu do treści za pomocą wyszczególnionych słów kluczowych oraz domen, do których urządzenia objęte kontrolą rodzicielską mają dostęp lub nie, w zależności od ustawionego typu blokowania."
            }, {
                type: "name",
                title: "Typ blokowania",
                content: "Wybierz poniższy typ blokowania:",
                children: [{
                    type: "name",
                    title: "Czarna lista",
                    content: "Zawiera słowa kluczowe i domeny, które będą wyznacznikiem dla blokowania dostępu do stron internetowych urządzeniom klienckim, znajdującym się na liście kontroli rodzicielskiej. "
                }, {
                    type: "name",
                    title: "Biała lista",
                    content: "Zawiera słowa kluczowe i domeny, do których urządzenia klienckie, wyszczególnione na liście kontroli rodzicielskiej, mają dostęp. "
                }]
            }, {
                type: "name",
                title: "Dodaj nowe słowo kluczowe",
                content: "Naciśnij, aby dodać słowo kluczowe lub domenę do czarnej lub białej listy. "
            }, {
                type: "paragraph",
                content: "Aby usunąć słowo kluczowe lub domenę, naciśnij ikonę (-), znajdującą się przy danej pozycji."
            }, {
                type: "name",
                title: "Zapisz",
                content: "Naciśnij, aby zapisać ustawienia."
            }]
        },
        wlGuestDulBandBasic: {
            TITLE: "Sieć dla gości",
            CONTENT: [{
                type: "paragraph",
                content: "Sieć dla gości umożliwia utworzenie sieci z oddzielną nazwą (SSID) i hasłem, za pomocą którego goście mogą uzyskać dostęp do sieci bezprzewodowej. "
            }, {
                type: "name",
                title: "Pozwól gościom na komunikację między sobą",
                content: "Zaznacz tę opcję, aby umożliwić urządzeniom bezprzewodowym połączonym z siecią dla gości na komunikację między sobą."
            }, {
                type: "name",
                title: "Pozwól gościom na dostęp do sieci lokalnej",
                content: "Zaznacz tę opcję, aby umożliwić urządzeniom bezprzewodowym połączonym z siecią dla gości na dostęp do sieci lokalnej."
            }, {
                type: "name",
                title: "Ustawienia podstawowe 2,4GHz | 5GHz-1 | 5GHz-2.",
                content: "Naciśnij odpowiedni przycisk, aby włączyć sieć dla gości  2,4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "Nazwa sieci",
                content: "Zostaw nazwę domyślną sieci dla gości lub wprowadź nazwę o długości do 32 znaków. Wielkość liter ma znaczenie."
            }, {
                type: "name",
                title: "Ukryj SSID",
                content: "Zaznacz tę opcję jeśli chcesz ukryć nazwę sieci dla gości."
            }, {
                type: "name",
                title: "Zabezpieczenia",
                content: "Wybierz jeden z poniższych typów zabezpieczeń:",
                children: [{
                    type: "name",
                    title: "Brak",
                    content: "Domyślnie sieć dla gości nie ma włączonych zabezpieczeń; każdy ma dostęp do sieci."
                }, {
                    type: "name",
                    title: "Ustaw hasło",
                    content: "Utwórz hasło używając od 8 do 63 znaków ASCII lub od 8 do 64 znaków szesnastkowych (0-9, a-f, A-F)."
                }]
            }]
        },
        networkMap: {
            TITLE: "Internet",
            CONTENT: [{
                type: "name",
                title: "Stan Internetu",
                content: "Wyświetla obecny stan połączenia internetowego routera."
            }, {
                type: "name",
                title: "Typ połączenia",
                content: "Wyświetla typ połączenia internetowego."
            }, {
                type: "name",
                title: "Adres IP",
                content: "Wyświetla przydzielony routerowi adres IP."
            }, {
                type: "name",
                title: "Serwer DNS",
                content: "Wyświetla adresy IP preferowanego i alternatywnego serwera DNS."
            }, {
                type: "name",
                title: "Brama",
                content: "Wyświetla adres IP bramy domyślnej."
            }, {
                type: "title",
                title: "Router"
            }, {
                type: "title2",
                content: "Sieć bezprzewodowa 2,4GHz | 5GHz-1 | 5GHz-2."
            }, {/*
                type: "name",
                title: "Stan",
                content: "Wyświetla stan sieci bezprzewodowej 2,4GHz | 5GHz-1 | 5GHz-2 (włączona/wyłączona)."
            }, {*/
                type: "name",
                title: "SSID",
                content: "Wyświetla nazwę włączonej sieci bezprzewodowej 2,4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "Kanał",
                content: "Wyświetla kanał włączonej sieci bezprzewodowej 2,4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "MAC",
                content: "Wyświetla adres MAC włączonej sieci bezprzewodowej 2,4GHz | 5GHz-1 | 5GHz-2 ."
            }, {
                type: "title2",
                content: "Sieć dla gości 2,4GHz | 5GHz-1 | 5GHz-2"
            }, {
                type: "name",
                title: "Stan",
                content: "Wyświetla stan sieci dla gości 2,4GHz | 5GHz-1 | 5GHz-2 (włączona/wyłączona)"
            }, {
                type: "name",
                title: "SSID",
                content: "Wyświetla nazwę sieci dla gości."
            }, {
                type: "title",
                title: "Klienci bezprzewodowi/przewodowi"
            }, {
                type: "name",
                title: "Nazwa",
                content: "Wyświetla nazwę klienta połączonego z routerem."
            }, {
                type: "name",
                title: "Adres IP",
                content: "Wyświetla adres IP przydzielony klientowi."
            }, {
                type: "name",
                title: "Adres MAC",
                content: "Wyświetla adres MAC klienta."
            }, {
                display: INCLUDE_VOIP,
                type: "title",
                title: "Telefon"
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Nazwa telefonu",
                content: "Wyświetla nazwę telefonu."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Numery przychodzące",
                content: "Wyświetla numery dla połączeń przychodzących poprzez router."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Numer wewnętrzny",
                content: "Wyświetla numery dla połączeń pomiędzy urządzeniami połączonymi z tym samym routerem. Ustawień tych nie można zmienić."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Liczba wychodzących",
                content: "Wyświetla numery dla połączeń wychodzących poprzez router. Domyślnie ustawione jest Auto, co oznacza, że router sam wybiera dostępny numer, aby nawiązać połączenie. Tryb ten możesz zmienić na stronie VoIP."
            }, {
                display: INCLUDE_USB,
                type: "title",
                title: "Drukarka"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Nazwa",
                content: "Wyświetla nazwę drukarki podłączonej do routera poprzez port USB."
            }, {
                display: INCLUDE_USB,
                type: "title",
                title: "Dysk USB"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Marka",
                content: "Wyświetla markę dysku USB podłączonego do routera. "
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Pojemność",
                content: "Wyświetla całkowitą pojemność dysku USB."
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Dostępna",
                content: "Wyświetla wolne miejsce na dysku USB."
            }]
        },
        wirelessBasic: {
            TITLE: "Ustawienia bezprzewodowe",
            CONTENT: [{
                type: "name",
                title: "Sieć bezprzewodowa 2,4GHz | 5GHz-1 | 5GHz-2",
                content: "Zaznacz tę opcję, aby urządzenie bezprzewodowe pracowało w paśmie 2,4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "Nazwa sieci bezprzewodowej ",
                content: "Zostaw nazwę domyślną lub wprowadź nazwę o długości do 32 znaków. Wielkość liter ma znaczenie."
            }, {
                type: "name",
                title: "Hasło",
                content: "Utwórz hasło sieci bezprzewodowej używając od 8 do 63 znaków ASCII lub od 8 do 64 znaków szesnastkowych. Wielkość liter ma znaczenie."
            }, {
                type: "name",
                title: "Ukryj SSID",
                content: "Zaznacz tę opcję jeśli nie chcesz, aby nazwa sieci 2,4GHz/5GHz wyświetlała się na liście dostępnych sieci bezprzewodowych."
            }]
        },
        status: {
            TITLE: "Internet",
            CONTENT: [{
                type: "paragraph",
                content: "Wyświetla informacje dotyczące połączenia internetowego."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                /*type: "name",
                title: "Nazwa",
                content: "Wyświetla informacje dotyczące portu widzianego od strony Internetu."
            }, {*/
                type: "name",
                title: "Adres MAC",
                content: "Adres fizyczny portu WAN, widziany od strony Internetu. "
            }, {
                type: "name",
                title: "Adres IP",
                content: "Aktualny adres IP portu WAN (internetowy). Jeżeli nie ma połączenia z Internetem wyświetlona zostanie wartość 0.0.0.0. "
            }, {
                type: "name",
                title: "Maska podsieci",
                content: "Określa część sieciową i część hosta adresu IP."
            }, {
                type: "name",
                title: "Brama domyślna",
                content: "Adres IP, przez który router łączy się do sieci WAN."
            }, {
                type: "name",
                title: "Preferowany DNS/Alternatywny DNS",
                content: "DNS tłumaczy nazwy hostów i domen internetowych na adresy IP. Informacje o serwerach DNS dostarczane są przez dostawcę usług internetowych."
            }, {
                type: "name",
                title: "Typ połączenia",
                content: "Aktualny typ połączenia internetowego."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "Nazwa",
                content: "Wyświetla informacje dotyczące portu widzianego od strony Internetu."
            }, {
                type: "name",
                title: "Adres MAC",
                content: "Adres fizyczny portu WAN, widziany od strony Internetu. "
            }, {
                type: "name",
                title: "Adres IP",
                content: "Adres IPv6 portu WAN, widziany od strony Internetu."
            }, {
                type: "name",
                title: "Brama domyślna",
                content: "Adres IP, przez który router łączy się do sieci WAN."
            }, {
                type: "name",
                title: "Preferowany DNS/Alternatywny DNS",
                content: "DNS tłumaczy nazwy hostów i domen internetowych na adresy IP. Informacje o serwerach DNS dostarczane są przez dostawcę usług internetowych."
            }, {
                type: "name",
                title: "Typ połączenia",
                content: "Aktualny typ połączenia internetowego."
            }, {
                type: "title",
                title: "Sieć bezprzewodowa"
            }, {
                type: "name",
                title: "2,4G | 5G-1 | 5G-2",
                content: "Wybierz, aby wyświetlić ustawienia oraz informacje dotyczące sieci bezprzewodowej 2,4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "Nazwa sieci",
                content: "Nazwa sieci bezprzewodowej rozgłaszanej przez urządzenie."
            }, {
                type: "name",
                title: "Nadajnik bezprzewodowy",
                content: "Określa stan nadajnika sieci bezprzewodowej (włączony lub wyłączony). "
            }, {
                type: "name",
                title: "Tryb",
                content: "Aktualny tryb transmisji bezprzewodowej."
            }, {
                type: "name",
                title: "Szerokość kanału",
                content: "Szerokość pasma transmisji bezprzewodowej."
            }, {
                type: "name",
                title: "Kanał",
                content: "Aktualnie używany kanał transmisji bezprzewodowej i odpowiadająca mu częstotliwość (w GHz)."
            }, {
                type: "name",
                title: "Adres MAC",
                content: "Adres fizyczny nadajnika routera, widziany z sieci bezprzewodowej."
            }, {
                type: "title",
                title: "LAN"
            }, {
                type: "paragraph",
                content: "Wyświetla informacje dotyczące portów Ethernet (LAN)."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                type: "name",
                title: "Adres MAC",
                content: "Adres fizyczny portu Ethernet routera, widziany z sieci LAN."
            }, {
                type: "name",
                title: "Adres IP",
                content: "Adres IPv4 portu Ethernet routera, widziany z sieci LAN."
            }, {
                type: "name",
                title: "Maska podsieci",
                content: "Określa część sieciową i część hosta adresu IP."
            }, {
                type: "name",
                title: "DHCP",
                content: "Informuje czy wbudowany serwer DHCP routera jest aktywny dla urządzeń w sieci LAN."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "Adres MAC",
                content: "Adres fizyczny portu Ethernet routera, widziany z sieci LAN."
            }, {
                type: "name",
                title: "Adres IP",
                content: "Adres IPv6 portu LAN, widziany od strony Internetu."
            }, {
                type: "name",
                title: "Długość prefiksu",
                content: "Długość prefiksu adresu IPv6."
            }, {
                type: "name",
                title: "Typ przydziału",
                content: "Adres lokalny IPv6 dla interfejsu LAN."
            }, {
                type: "title",
                title: "Sieć dla gości"
            }, {
                type: "name",
                title: "2,4G | 5G-1 | 5G-2",
                content: "Wybierz, aby wyświetlić ustawienia oraz informacje dotyczące sieci bezprzewodowej 2,4GHz | 5GHz-1 | 5GHz-2."
            }, {
                type: "name",
                title: "Nazwa sieci",
                content: "Nazwa sieci bezprzewodowej dla gości."
            }, {
                type: "name",
                title: "Ukryj SSID",
                content: "Określa czy nazwa sieci bezprzewodowej (SSID) jest ukryta."
            }, {
                type: "name",
                title: "Nadajnik bezprzewodowy",
                content: "Określa stan nadajnika sieci dla gości (włączony lub wyłączony)."
            }, {
                type: "name",
                title: "Widoczność hostów",
                content: "Określa czy urządzenia połączone z siecią dla gości mogą się ze sobą komunikować. "
            }, {
                display: "$.sysMode == 'DSL'",
                type: "title",
                title: "DSL"
            }, {
                display: "$.sysMode == 'DSL'",
                type: "paragraph",
                content: "Wyświetla informacje dotyczące połączenia DSL."
            }, {
                display: "$.sysMode == 'DSL'",
                type: "name",
                title: "Stan linii",
                content: "Określa stan połączenia DSL (włączone lub wyłączone)."
            }, {
                display: "$.sysMode == 'DSL'",
                type: "name",
                title: "Typ modulacji DSL",
                content: "Wyświetla typ modulacji dla aktualnego połączenia DSL."
            }, {
                display: "$.sysMode == 'DSL'",
                type: "name",
                title: "Typ aneksu",
                content: "Wyświetla typ aneksu dla aktualnego połączenia DSL."
            }, {
                display: "$.sysMode == 'DSL'",
                type: "name",
                title: "Aktualna prędkość (kb/s)",
                content: "Wyświetla aktualną prędkość wysyłania i pobierania dla połączenia DSL."
            }, {
                display: "$.sysMode == 'DSL'",
                type: "name",
                title: "Maksymalna prędkość (kb/s)",
                content: "Wyświetla maksymalną prędkość wysyłania i pobierania dla połączenia DSL."
            }, {
                display: "$.sysMode == 'DSL'",
                type: "name",
                title: "Margines SNR (dB)",
                content: "Wyświetla maksymalną prędkość wysyłania i pobierania dla połączenia DSL."
            }, {
                display: "$.sysMode == 'DSL'",
                type: "name",
                title: "Tłumienie (dB)",
                content: "Wyświetla tłumienie linii DSL."
            }, {
                display: "$.sysMode == 'DSL'",
                type: "name",
                title: "Błędy (pkt)",
                content: "Wyświetla ilość błędów wysyłania i pobierania dla połączenia DSL."
            }]
        },
        time: {
            TITLE: "Ustawienia czasu",
            CONTENT: [{
                display: "('INCLUDE_WEB_REGION' in window && INCLUDE_WEB_REGION === 1)",
                type: "name",
                title: "Region",
                content: "Wybierz swój region z rozwijanej listy."
            }, {
                type: "name",
                title: "Strefa czasowa",
                content: "Wybierz swoją strefę czasową z rozwijanej listy."
            }, {
                display: "('INCLUDE_DAY_MONTH_YEAR' in window && INCLUDE_DAY_MONTH_YEAR == 1)",
                type: "name",
                title: "Data",
                content: "Wprowadź datę w formacie DD/MM/RR."
            }, {
                display: "!('INCLUDE_DAY_MONTH_YEAR' in window && INCLUDE_DAY_MONTH_YEAR == 1)",
                type: "name",
                title: "Data",
                content: "Wprowadź datę w formacie MM/DD/RR."
            }, {
                type: "name",
                title: "Czas",
                content: "Ustaw czas, wybierając z rozwijanej listy (w formacie 24-godzinnym, np. 16:00:00 to 04:00PM)."
            }, {
                type: "name",
                title: "Serwer NTP I/Serwer NTP II",
                content: "Wprowadź adres IP serwera NTP I lub serwera NTP II, a router automatycznie pobierze czas z serwera NTP. Dodatkowo router ma wbudowane serwery NTP, które synchronizują się automatycznie po nawiązaniu połączenia internetowego."
            }, {
                type: "name",
                title: "Pobierz z komputera",
                content: "Naciśnij, aby zsynchronizować czas z zegarem komputera."
            }, {
                type: "name",
                title: "Pobierz UTC",
                content: "Naciśnij, aby pobrać czas UTC."
            }, {
                type: "name",
                title: "Zapisz",
                content: "Naciśnij, aby zapisać ustawienia."
            }, {
                type: "title",
                content: "Czas letni"
            }, {
                type: "note",
                title: "Aby ustawić czas letni",
                content: [
                    "Zaznacz <b>Włącz czas letni</b>.",
                    "Wybierz odpowiednią dla sowjej strefy czasowej datę <b>Początku</b>.",
                    "Wybierz odpowiednią dla sowjej strefy czasowej datę <b>Końca</b>.",
                    "Naciśnij przycisk <b>Zapisz</b>."
                ]
            }]
        },
        diagnostic: {
               TITLE:"Narzędzia diagnostyczne",
               CONTENT: [{
                           type: "paragraph",
                           content: "Router obsługuje dwa narzędzia diagnostyczne: ping i trace."
                       } ,{                      
                           type: "note",
                           title: "Diagnostyka przy użyciu narzędzia Ping:",
       content: [ 
                "Zaznacz przycisk sieci bezprzewodowej znajdujący się przy ping.",
                "Wprowadź adres IP lub domenę.",
                "Kliknij na rozwijaną listę przy ustawieniach zaawansowanych, aby wyświetlić ilość pakietów Ping, ich rozmiar oraz limit czasu dla pakietów.",
                "Naciśnij przycisk startu, aby rozpocząć diagnostykę."]
} ,{                      
                           type: "paragraph",
                           content: "LUB"
                       } ,{                      
                           type: "note",
                           title: "Diagnostyka przy użyciu narzędzia Traceroute:",
       content: [ 
                "Zaznacz przycisk sieci bezprzewodowej znajdujący się przy traceroute.",
                "Wprowadź adres IP lub domenę.",
                "Kliknij na rozwijaną listę przy ustawieniach zaawansowanych, aby wyświetlić maksymalną wartość TTL. Pozostaw wartości domyślne lub skonfiguruj je stosownie do swoich wymagań.",
                "Naciśnij przycisk startu, aby rozpocząć diagnostykę."]
}]
        },
        softup: {
            TITLE: "Aktualizacja firmware",
            CONTENT: [{
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Aktualizacja firmware'u uaktualnia system operacyjny routera do najnowszej wersji, wprowadzając nowe funkcje i naprawiając błędy poprzedniej wersji. Gdy aktualizacja będzie dostępna, w prawym górnym rogu strony pojawi się ikona Aktualizuj. Kliknij na nią, aby wejść na stronę Aktualizacji firmware'u. "
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "<b>WAŻNE: Zastosuj się do wskazówek, aby uniknąć błędów aktualizacji.</b>"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "note",
                title: "Przed aktualizacją:",
                content: [
                    "Podłącz router do komputera za pomocą kabla Ethernet. NIE zaleca się aktualizować firmware'u bezprzewodowo.",
                    "Odłącz od routera wszystkie urządzenia USB.",
                    "Zrób kopię zapasową ustawień routera."
                ]
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Podczas procesu aktualizacj:<br>Nie odłączaj routera od zasilania i nie wykonuj na nim żadnych czynności."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Aby pobrać firmware online"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Naciśnij Aktualizuj i potwierdź, gdy pojawi się monit. Router automatycznie pobierze firmware, przeprowadzi proces aktualizacji i zrestartuje się.<br><b>Uwaga</b>: Pobranie najnowszej aktualizacji może wymagać naciśnięcia Sprawdź dostępne aktualizacje."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Aby pobrać firmware ręcznie"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "note",
                title: "",
                content: [
                    "Wejdź na stronę www.tp-link.com.pl i pobierz na komputer najnowszy firmware, znajdujący się w zakładce Wsparcie. Upewnij się, że plik firmware'u, który pobierasz jest zgodny z wersją sprzętową twojego routera. ",
                    "Naciśnij <b>Przeglądaj</b> i wybierz pobrany plik z firmware'em.",
                    "Naciśnij <b>Aktualizuj</b>. Aktualizacja potrwa kilka minut. Router automatycznie zrestartuje się po zakończeniu procesu.",
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "paragraph",
                content: "Przed dokonaniem aktualizacji firmwaru routera, konieczne jest pobranie na komputer jego najnowszej aktualizacji ze <a href='http://www.tp-link.com.pl/support/download/'>strony internetowej firmy TP-LINK</a>."
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "note",
                title: "<B>WAŻNE:</B> Aby uniknąć błędów w aktualizacji, należy pamiętać o następujących kwestiach:",
                content: [
                    "Upewnij się, że posiadasz plik z oprogramowaniem odpowieni dla twojej wersji sprzętowej routera (jest ona widoczna w zakładce <b>Aktualizacja firmware</b>).",
                    "Upewnij się, że połączenie pomiędzy komputerem a routerem jest stabilne. <b>NIE</b> zalecana jest aktualizacja za pomocą połączenia bezprzewodowego.",
                    "Upewnij się, że urządzenia USB odłączone są od routera aby zapobiec ewentualnej utracie danych.",
                    "Zapisz ustawienia routera.",
                    "Nie wyłączaj routera podczas przeprowadzania aktualizacji."
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "note",
                title: "Aby zaktualizować firmware routera",
                content: [
                    "Naciśnij przycisk <b>Przeglądaj</b>.",
                    "Znajdź i wybierz plik z oprogramowaniem.",
                    "Naciśnij przycisk <b>Aktualizuj</b>."
                ]
            }]
        },
        backNRestore: {
            TITLE: "Zapisz",
            CONTENT: [{
                type: "paragraph",
                content: "Zaleca się zapisać swoje aktualne ustawienia na wypadek utraty ustawień systemu lub konieczności przywrócenia do ustawień fabrycznych."
            }, {
                type: "paragraph",
                content: "Naciśnij <b>Zapisz</b>, aby zapisać aktualne ustawienia komputera. Pamiętaj, aby zapisać plik w miejscu, z którego można go później pobrać i przywrócić ustawienia routera w razie konieczności."
            }, {
                type: "title",
                content: "Odznacz"
            }, {
                type: "note",
                title: "Aby przywrócić zapisane ustawienia",
                content: [
                    "Naciśnij przycisk <b>Przeglądaj</b>.",
                    "Znajdź i wybierz plik z ustawieniami.",
                    "Naciśnij przycisk <b>Odznacz</b>."
                ]
            }, {
                type: "title",
                content: "Przywróć ustawienia fabryczne"
            }, {
                type: "paragraph",
                content: "Naciśnij <b>Ustawienia fabryczne</b>, aby przywrócić ustawienia fabryczne routera."
            }, {
                type: "note",
                title: "Uwaga:",
                content: [
                    "Ustawienia fabryczne przywrócą router do stanu pierwotnego. Po resecie routera możesz zalogować się do niego za pomocą domyślnych danych <b>admin</b>.",
                    "NIE wyłączaj routera podczas przywracania ustawień."
                ]
            }]
        },
        manageCtrl: {
            TITLE: "Zarządzanie kontami",
            CONTENT: [{
                type: "paragraph",
                content: "Na tej stronie możesz zmienić swoje hasło logowania."
            }, {
                type: "name",
                title: "Aktualne hasło",
                content: "Wprowadź swoje aktualne hasło."
            }, {
                type: "name",
                title: "Nowe hasło",
                content: "Wprowadź nowe hasło."
            }, {
                type: "name",
                title: "Potwierdź nowe hasło",
                content: "Potwierdź nowe hasło."
            }, {
                type: "title",
                content: "Zarządzanie lokalne"
            }, {
                type: "paragraph",
                content: "Funkcja ta pozwala urządzeniu klienckiemu w twojej sieci na dostęp do routera i zarządzanie nim na podstawie uwierzytelnienia w oparciu o adres MAC. "
            }, {
                type: "name",
                title: "Port",
                content: "Wprowadź numer portu dostępowego do routera z przedziału 1024-65535."
            }, {
                type: "name",
                title: "Adres IP/MAC",
                content: "Wprowadź lokalny adres IP lub adres MAC urządzenia, dla którego dostęp do routera będzie możliwy."
            }, {
                type: "title",
                content: "Zarządzanie zdalne"
            }, {
                type: "paragraph",
                content: "Funkcja zarządzania zdalnego umożliwia zdalny dostęp i zarządzanie routerem z Internetu."
            }, {
                type: "name",
                title: "Zarządzanie zdalne",
                content: "Zaznacz, aby włączyć funkcję zarządzania zdalnego."
            }, {
                type: "name",
                title: "Port",
                content: "Wprowadź numer portu z przedziału 1024 - 65535, aby zwiększyć bezpieczeństwo dostępu do strony zarządzania routera. Przeglądarki internetowe korzystają zwykle z portu 80 protokołu HTTP."
            }, {
                type: "name",
                title: "Adres IP/MAC",
                content: "Wprowadź zdalny adres IP lub adres MAC, dla którego dostęp do routera będzie możliwy."
            }, {
                type: "title",
                content: "Ping ICMP"
            }, {
                type: "paragraph",
                content: "Narzędzie Ping ICMP pozwala na diagnozowanie problemów sieciowych poprzez wysyłanie żądań do hosta zdalnego lub lokalnego, który wysyła odpowiedź zwrotną."
            }, {
                type: "name",
                title: "Zdalnie",
                content: "Zaznacz jeśli chcesz, aby komputery w sieci publicznej wysyłały polecenie ping na adres IP WAN routera. "
            }, {
                type: "name",
                title: "Lokalnie",
                content: "Zaznacz jeśli chcesz, aby komputery w sieci publicznej wysyłały polecenie ping na adres IP LAN routera. "
            }]
        },
        log: {
            TITLE: "Dziennik systemowy",
            CONTENT: [{
                type: "paragraph",
                content: "Strona Dziennika systemowego zawiera listę ostatnio wykonywanych operacji na routerze. Możesz określić wyświetlany typ dzienników i/lub ich poziom. Istnieje także możliwość wyeksportowania dziennika na komputer lub jego automatyczne wysłanie na określony serwer zdalny."
            }, {
                type: "name",
                title: "Typ",
                content: "Wybierz wyświetlany typ dziennika systemowego."
            }, {
                type: "name",
                title: "Poziom",
                content: "Wybierz wyświetlany poziom dziennika systemowego."
            }, {
                type: "name",
                title: "Odśwież",
                content: "Naciśnij tę ikonę, aby zaktualizować dziennik systemowy."
            }, {
                type: "name",
                title: "Usuń wszystkie",
                content: "Naciśnij tę ikonę, aby usunąć wszystkie dzienniki systemowe. "
            }, {
                type: "name",
                title: "Ustawienia dziennika",
                content: "Naciśnij, aby zmienić ustawienia dziennika.",
                children: [{
                    type: "name",
                    title: "Zapisz lokalnie",
                    content: "Wybierz, aby przesłać dziennik systemowy do pamięci lokalnej routera. Dziennik będzie widoczny w tabelce na stronie dziennika systemowego.",
                    children: [{
                        type: "name",
                        title: "Poziom minimalny",
                        content: "Wybierz z rozwijanej listy minimalny poziom dziennika systemowego, który chcesz zapisać. Poziomy ułożone są w kolejności malejącej, najniższy poziom znajduje się na samym dole."
                    }]
                }, {
                    type: "name",
                    title: "Zapisz zdalnie",
                    content: "Wybierz, aby wysłać dziennik systemowy na serwer zdalny. W przypadku, gdy serwer ten ma przeglądarkę dzienników lub narzędzie nasłuchujące, możesz na bieżąco zdalnie przeglądać i analizować dziennik systemowy. ",
                    children: [{
                        type: "name",
                        title: "Poziom minimalny",
                        content: "Wybierz z rozwijanej listy minimalny poziom dziennika systemowego, który chcesz zapisać. Poziomy ułożone są w kolejności malejącej, najniższy poziom znajduje się na samym dole."
                    }, {
                        type: "name",
                        title: "Adres IP serwera",
                        content: "Określa adres IP zdalnego serwera dziennika systemowego."
                    }, {
                        type: "name",
                        title: "Port serwera",
                        content: "Określa liczbę portów zdalnego serwera dziennika systemowego."
                    }, {
                        type: "name",
                        title: "Nazwa lokalna",
                        content: "Wybierz z rozwijanej listy nazwę lokalną dla serwera zdalnego."
                    }]
                }]
            }, {
                type: "name",
                title: "Zapisz dziennik",
                content: "Naciśnij ten przycisk, aby pobrać wszystkie dzienniki systemowe na komputer."
            }]
        },
        snmp: {
            TITLE: "Ustawienia SNMP",
            CONTENT: [{
                type: "name",
                title: "Włącz agenta SNMP",
                content: "Wybierz Włącz, aby włączyć wbudowanego agenta SNMP. Router będzie odbierał i przetwarzał wiadomości SNMP, przesyłał odpowiedzi do managera SNMP i uruchamiał SNMP trap w razie konieczności. "
            }, {
                type: "name",
                title: "Grupa odczytu",
                content: "Wyświetla ciąg znaków dla grupy publicznej, który chroni router przed nieupoważnionym dostępem."
            }, {
                type: "name",
                title: "Grupa zapisu",
                content: "Wyświetla domyślny ciąg znaków dla grupy odczytu i grupy zapisu, który chroni router przed nieupoważnionym dostępem. "
            }, {
                type: "name",
                title: "Nazwa",
                content: "Wyświetla odgórnie przydzieloną nazwę zarządzanego urządzenia. "
            }, {
                type: "name",
                title: "Opis ",
                content: "Wyświetla opis zarządzanego urządzenia. Powinna się w nim znajdować pełna nazwa i wersja sprzętowa urządzenia, oprogramowanie systemowe oraz oprogramowanie sieciowe. "
            }, {
                type: "name",
                title: "Położenie",
                content: "Wyświetla informację na temat położenia urządzenia (np. szafka pod telewizor, trzecie piętro)."
            }, {
                type: "name",
                title: "Kontakt",
                content: "Wyświetla informacje na temat osoby odpowiedzialnej za zarządzanie urządzeniem, wraz z danymi kontaktowymi."
            }, {
                type: "name",
                title: "IP Trap Managera",
                content: "Wyświetla główny adres IP, na który wysyłane są SNMP trap."
            }]
        },
        stat: {
            TITLE: "Statystyki ruchu",
            CONTENT: [{
                type: "name",
                title: "Włącz statystyki ruchu",
                content: "Wybierz Włącz, aby włączyć funkcję statystyk ruchu."
            }, {
                type: "title",
                content: "Lista statystyk"
            }, {
                type: "name",
                title: "Adres IP/MAC",
                content: "Adres IP i adres MAC połączonych klientów."
            }, {
                type: "name",
                title: "Suma pakietów",
                content: "Łączna ilość pakietów przesyłanych i odebranych przez router."
            }, {
                type: "name",
                title: "Suma bajtów",
                content: "Łączna ilość bajtów przesyłanych i odebranych przez router."
            }, {
                type: "name",
                title: "Aktualne pakiety",
                content: "Aktualna ilość pakietów przesłanych i odebranych w określonym sekundowym przedziale czasowym."
            }, {
                type: "name",
                title: "Aktualne bajty",
                content: "Aktualna ilość bajtów przesłanych i odebranych w określonym sekundowym przedziale czasowym."
            }, {
                type: "name",
                title: "Aktualne Tx ICMP",
                content: "Wyświetla aktualną prędkość transmisji i maksymalną prędkość transmisji pakietów ICMP na sekundę, przesyłanych przez port WAN."
            }, {
                type: "name",
                title: "Aktualne Tx UDP",
                content: "Wyświetla aktualną prędkość transmisji i maksymalną prędkość transmisji pakietów UDP na sekundę, przesyłanych przez port WAN."
            }, {
                type: "name",
                title: "Aktualne Tx SYN",
                content: "Wyświetla aktualną prędkość transmisji i maksymalną prędkość transmisji pakietów TCP SYN na sekundę, przesyłanych przez port WAN."
            }, {
                type: "name",
                title: "Zmień",
                content: "Naciśnij ikonę <b>Kosz</b>, aby usunąć wybrane statystyki."
            }]
        },
        ethWan: {
            TITLE: "Interfejs WAN",
            CONTENT: [{
                type: "title2",
                content: "Typ połączenia: Dynamiczne IP"
            }, {
                type: "name",
                title: "Dynamiczne IP",
                content: "Wybierz ten typ połączenia, jeżeli parametry połączenia są pobierane od dostawcy automatycznie."
            }, {
                type: "name",
                title: "Adres IP/Maska podsieci/Brama/Brama domyślna",
                content: "Te parametry są pobierane automatycznie z serwera DHCP dostawcy."
            }, {
                type: "name",
                title: "Zaawansowane",
                children: [{
                    type: "name",
                    title: "Rozmiar MTU (w bajtach)",
                    content: "Domyślny rozmiar MTU dla większości sieci Ethernet to <b>1500 bajtów</b>. Zmiana tej wartości nie jest zalecana, jeżeli nie jest to konieczne."
                }, {
                    type: "name",
                    title: "Proxy IGMP",
                    content: "IGMP jest używane do zarządzania multicastem w sieciach TCP/IP. Niektórzy dostawcy używają IGMP do przeprowadzania zdalnej konfiguracji routera. Funkcja ta jest domyślnie włączona."
                }, {
                    type: "name",
                    title: "Pobierz IP używając DHCP typu Unicast",
                    content: "Zaznacz tę opcję, jeżeli serwer DHCP dostawcy nie obsługuje komunikatów typu broadcast i nie możesz pobrać adresu IP dynamicznie."
                }, {
                    type: "name",
                    title: "Użyj następujących adresów DNS",
                    content: "Zaznacz tę opcję i wprowadź adres(y) serwera DNS otrzymane od dostawcy w notacji dziesiętnej. Połączenie WAN będzie priorytetyzować użycie tych serwerów DNS."
                }, {
                    type: "name",
                    title: "Nazwa hosta",
                    content: "Wprowadź nazwę hosta interfejsu WAN."
                }]
            }, {
                type: "title2",
                content: "Typ połączenia: Statyczne IP"
            }, {
                type: "name",
                title: "Statyczne IP",
                content: "Wybierz ten typ połączenia, jeżeli otrzymałeś stały adres IP, maskę podsieci, bramę oraz adresy serwerów DNS od dostawcy."
            }, {
                type: "name",
                title: "Adres IP/Maska podsieci/Brama/Preferowany DNS/Alternatywny serwer DNS",
                content: "Wprowadź dane otrzymane od dostawcy w notacji dziesiętnej."
            }, {
                type: "paragraph",
                content: "Naciśnij <b>Zaawansowane</b>, aby wyświetlić ustawienia zaawansowane."
            }, {
                type: "name",
                title: "Zaawansowane",
                children: [{
                    type: "name",
                    title: "Rozmiar MTU (w bajtach)",
                    content: "Domyślny rozmiar MTU dla większości sieci Ethernet to <b>1500 bajtów</b>. Zmiana tej wartości nie jest zalecana, jeżeli nie jest to konieczne."
                }, {
                    type: "name",
                    title: "Proxy IGMP",
                    content: "IGMP jest używane do zarządzania multicastem w sieciach TCP/IP. Niektórzy dostawcy używają IGMP do przeprowadzania zdalnej kongifuracji routera. Funkcja ta jest domyślnie włączona."
                }]
            }, {
                type: "title2",
                content: "Typ połączenia: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Wybierz ten typ połączenia, jeżeli korzystasz z usługi DSL i otrzymałeś od dostawcy nazwę użytkownika oraz hasło."
            }, {
                type: "name",
                title: "Nazwa użytkownika PPPoE/Hasło PPPoE/Potwierdź hasło",
                content: "Wprowadź nazwę użytkownika oraz hasło otrzymane od dostawcy. Wielkość liter ma znaczenie."
            }, {
                type: "name",
                title: "Tryb połączenia",
                content: "Wybierz jeden z poniższych trybów połączenia:",
                children: [{
                    type: "name",
                    title: "Automatyczne",
                    content: "Wybierz ten tryb, aby połączenie nawiązywane było automatycznie po każdym rozłączeniu."
                }, {
                    type: "name",
                    title: "Połącz na żądanie",
                    content: "Wybierz ten tryb, aby połączenie było rozłączane po upłynięciu odpowiedniej ilości czasu od ostatniego żądania (Maksymalny czas nieaktywności). Połączenie zostanie nawiązane ponownie przy próbie połączenia z Internetem."
                }, {
                    type: "name",
                    title: "Połącz ręcznie",
                    content: "Wybierz ten tryb, jeżeli połączenie ma być kontrolowane ręcznie lub opierać się na Maksymalnym czasie nieaktywności."
                }, {
                    type: "name",
                    title: "Maksymalny czas nieaktywności",
                    content: "<b>15 minut</b> - Wprowadź czas od ostatniego żądania, po jakim połączenie z Internetem zostanie rozłączone. Domyślna wartość to 15 minut."
                }]
            }, {
                type: "name",
                title: "Typ uwierzytelniania",
                content: "Wybierz typ uwierzytelniania z rozwijanej listy."
            }, {
                type: "paragraph",
                content: "Naciśnij <b>Zaawansowane</b>, aby wyświetlić więcej ustawień."
            }, {
                type: "name",
                title: "Zaawansowane",
                children: [{
                    type: "name",
                    title: "Nazwa usługi",
                    content: "Wprowadź nazwę usługi otrzymaną od dostawcy. Jeżeli nie otrzymałeś żadnej nazwy, pozostaw puste pole."
                }, {
                    type: "name",
                    title: "Nazwa serwera",
                    content: "Wprowadź nazwę usługi otrzymaną od dostawcy. Jeżeli nie otrzymałeś żadnej nazwy, pozostaw puste pole."
                }, {
                    type: "name",
                    title: "Rozmiar MTU (w bajtach)",
                    content: "Domyślny rozmiar MTU dla większości sieci Ethernet to <b>1480 bajtów</b>.",
                    children: [{
                        type: "paragraph",
                        content: "<b>Uwaga</b>: Czasami dostawca może wymagać zmiany tej wartości dla lepszego działania sieci. Zmiana tej wartości nie jest zalecana, jeżeli nie jest to konieczne."
                    }]
                }, {
                    type: "name",
                    title: "Proxy IGMP",
                    content: "IGMP jest używane do zarządzania multicastem w sieciach TCP/IP. Niektórzy dostawcy używają IGMP do przeprowadzania zdalnej kongifuracji routera. Funkcja ta jest domyślnie włączona."
                }, {
                    type: "name",
                    title: "Użyj adresu IP od dostawcy",
                    content: "Wybierz tę opcję i wprowadź adresy otrzymane od dostawcy."
                }, {
                    type: "name",
                    title: "Interwał pakietów Echo",
                    content: "Wprowadź interwał wysyłania pakietów Echo z przedziału 0-120 (w sekundach), router będzie sprawdzał połączenie z wybraną częstotliwością. Domyślna wartość to 30. 0 oznacza brak wykrywania."
                }, {
                    type: "name",
                    title: "Użyj następujących adresów DNS",
                    content: "Zaznacz tę opcję i wprowadź adres(y) serwera DNS otrzymane od dostawcy w notacji dziesiętnej. Połączenie WAN będzie priorytetyzować użycie tych serwerów DNS."
                }]
            }, {
                type: "title2",
                content: "Typ połączenia: L2TP/PPTP"
            }, {
                type: "name",
                title: "L2TP/PPTP",
                           content: "Wybierz ten typ połączenia, jeżeli łączysz się z serwerem L2TP/PPTP VPN i otrzymałeś nazwę użytkownika, hasło i adres IP/domenę dla serwera od swojego usługodawcy."
            }, {
                type: "name",
                title: "Nazwa użytkownika /Hasło",
                           content: "Wprowadź nazwę użytkownika i hasło otrzymane od usługodawcy. Wielkość liter ma znaczenie."
            }, {
                type: "name",
                           title: "Adres IP/Preferowany DNS",
                           content: "Te parametry są pobierane automatycznie z serwera DHCP usługodawcy."
            }, {
                type: "name",
                           title: "Dodatkowe połączenie (Dynamiczne IP lub Statyczne IP)",
                children: [{
                    type: "name",
                           title: "Dynamiczne IP",
                           content: "Zaznacz tę opcję, jeżeli adres IP i maska podsieci są automatycznie przydzielane przez twojego usługodawcę."
                }, {
                    type: "name",
                           title: "Statyczne IP",
                           content: "Zaznacz tę opcję, jeżeli otrzymałeś od swojego usługodawcy adres IP, maskę podsieci, bramę i adresy DNS. Wprowadź te informacje w odpowiednie pola. "
                }]
            }, {
                type: "name",
                           title: "Adres IP serwera VPN/Domena",
                           content: "Wprowadź otrzymany od usługodawcy adres IP serwera VPN lub domenę."
            }, {
                type: "name",
                           title: "Rozmiar MTU",
                           content: "Domyślny rozmiar MTU dla większości sieci Ethernet to 1460 bajtów (1420 dla PPTP). Zmiana tej wartości nie jest zalecana, jeżeli nie jest to konieczne."
            }, {
                type: "name",
                           title: "Tryb połączenia",
                           content: "Wybierz odpowiedni tryb połączenia.",
                children: [{
                    type: "name",
                           title: "Automatyczne",
                           content: "W trybie tym połączenie internetowe nawiązywane jest automatycznie tuż po rozłączeniu."
                }, {
                    type: "name",
                           title: "Połącz na żądanie",
                           content: "W trybie tym połączenie internetowe będzie rozłączane po upłynięciu określonej ilości czasu od ostatniego żądania (Maksymalny czas nieaktywności). Połączenie zostanie nawiązane ponownie przy próbie połączenia z Internetem."
                }, {
                    type: "name",
                           title: "Połącz ręcznie",
                           content: "W trybie tym połączenie internetowe kontrolowane jest ręcznie poprzez kliknięcie na przycisk Połącz lub Rozłącz. Obsługuje także funkcję Maksymalnego czasu nieaktywności. Wprowadź Maksymalny czas nieaktywności (w minutach), aby określić maksymalny czas braku aktywności połączenia, przed jego rozłączeniem. Domyślnie ustawione jest 15 minut. Jeżeli chcesz, aby połączenie internetowe było cały czas aktywne, wprowadź 0 (zero)."
                }]
            }, {
                type: "title",
                content: "Klonowanie MAC"
            }, {
                type: "name",
                title: "Użyj domyślnego adresu MAC",
                content: "Wybierz tę opcję, jeżeli dostawca jeszcze nie przypisał twojemu adresowi IP adresu MAC. Użyty zostanie adres MAC routera."
            }, {
                type: "name",
                title: "Użyj adresu MAC połączonego komputera",
                content: "Wybierz tę opcję, jeżeli dostawca przypisał twojemu adresowi IP adres MAC twojego komputera."
            }, {
                type: "name",
                title: "Użyj innego adresu MAC",
                content: "Wybierz tę opcję, jeżeli dostawca przypisał dla twojego adresu IP inny adres MAC i wprowadź go ręcznie."
            }]
        },
        route: {
            TITLE: "Routing zaawansowany",
            CONTENT: [{
                type: "paragraph",
                content: "Routing zaawansowany używany jest do wyznaczania stałej trasy jaką przebyć mają pakiety zaadresowane do określonej sieci lub hosta."
            }, {
                type: "title",
                content: "Routing statyczny"
            }, {
                type: "name",
                title: "Docelowy adres IP/Maska podsieci/Brama",
                content: "Wyświetla docelowy adres IP, maskę podsieci oraz bramę trasy statycznej."
            }, {
                type: "name",
                title: "Włącz",
                content: "Wskazuje aktualny stan trasy statycznej. Naciśnij ikonę <b>Żarówki</b>, aby włączyć (lub wyłączyć) trasę statyczną."
            }, {
                type: "name",
                title: "Zmień",
                content: "Wyświetla opcję <b>Zmiany</b> lub <b>Usunięcia</b> odpowiedniego wpisu."
            }, {
                type: "note",
                title: "Aby skonfigurować trasę statyczną",
                content: [
                    "Naciśnij przycisk <b>Dodaj</b>.",
                    "Wprowadź docelowy adres IP, aby przydzielić trasę statyczną dla tego wpisu.",
                    "Wprowadź maskę podsieci, aby wyodrębnić część sieciową od części hosta adresu IP.",
                    "Wprowadź bramę adresu IP dla połączeń pomiędzy routerem a siecią lub hostem.",
                    "Wybierz interfejs <b>LAN</b> lub <b>WAN</b>, aby wybrać rodzaj adresu docelowego.",
                    "Zaznacz <b>Włącz ten wpis</b>.",
                    "Naciśnij przycisk <b>OK</b>."
                ]
            }, {
                type: "title",
                content: "Tabela routingu systemowego"
            }, {
                type: "paragraph",
                content: "Tabela routingu systemowego wyświetla wszystkie aktualnie aktywne trasy."
            }, {
                type: "paragraph",
                content: "Naciśnij Odśwież, aby zaktualizować informacje w tabeli routingu."
            }]
        },
        ddns: {
            TITLE: "Ustawienia Dynamicznego DNS",
            CONTENT: [{
                type: "paragraph",
                content: "Dynamiczny DNS (Domain Name System) pozwala przypisać stałą nazwę hosta i domeny do dynamicznego adresu IP. Funkcja ta przydaje się przy hostowaniu strony internetowej, serwera FTP lub innego za routerem. Aby skorzystać z funkcji DDNS, należy najpierw posiadać konto u dostawcy takiej usługi, np. <a href='http://www.dyndns.com'>www.dyndns.com</a>."
            }, {
                display: "'INCLUDE_DDNS_USERDEFINE' in window && INCLUDE_DDNS_USERDEFINE === 1",
                type: "name",
                title: "Dostawca usługi",
                content: "Select your DDNS service provider and enter the parameters accordingly. The following parameters are needed in most cases. To register a DDNS account, click <b>Go to register…</b>"
            }, {
                display: "!('INCLUDE_DDNS_USERDEFINE' in window) || !INCLUDE_DDNS_USERDEFINE",
                type: "name",
                title: "Dostawca usługi",
                content: "Wybierz dostawcę usługi DDNS. Jeżeli nie posiadasz konta DDNS, naciśnij <b>Zarejestruj się</b>."
            }, {
                type: "name",
                title: "Nazwa użytkownika/Hasło",
                content: "Wprowadź nazwę użytkownika i hasło konta DDNS."
            }, {
                type: "name",
                title: "Domena",
                content: "Wprowadź nazwę domeny otrzymaną od dostawcy DDNS."
            }, {
                display: "'INCLUDE_DDNS_USERDEFINE' in window && INCLUDE_DDNS_USERDEFINE === 1",
                type: "name",
                title: "Stan",
                content: "Określa aktualny stan połączenia od usługodawcy DDNS."
            }, {
                type: "name",
                title: "Zaloguj/Wyloguj",
                content: "Naciśnij, aby się zalogować lub wylogować z usługi DDSN."
            }, {
                type: "name",
                title: "Zapisz",
                content: "Naciśnij, aby zapisać ustawienia."
            }, {
                type: "paragraph",
                content: "Aby przełączyć się pomiędzy kontami DDNS, naciśnij Wyloguj, a następnie zaloguj się używając danych innego konta."
            }]
        },
        dhcp: {
            TITLE: "Serwer DHCP",
            CONTENT: [{
                type: "paragraph",
                content: "Serwer DHCP (Dynamic Host Configuration Protocol) dynamicznie przydziela urządzeniom konfigurację TCP/IP z puli adresów IP. NIE wyłączaj domyślnego serwera DHCP, jeżeli nie posiadasz w sieci innego serwera DHCP, lub chcesz ręcznie wprowadzić konfigurację TCP/IP dla każdego klienta w sieci."
            }, {
                type: "name",
                           title: "Pula adresów IP",
                           content: "Wprowadź zakres adresów IP, które będą przydzielane klientom w sieci."
            }, {
                type: "name",
                           title: "Czas przydzielenia adresu",
                           content: "Wprowadź czas pomiędzy 1 a 2880 minut, na jaki adres IP jest przydzielany klientowi."
            }, {
                type: "name",
                           title: "Brama domyślna",
                           content: "Wprowadź adres IP LAN. (Opcjonalnie)"
            }, {
                type: "name",
                           title: "Preferowany DNS/Alternatywny DNS",
                           content: "Wprowadź adresy serwerów DNS otrzymane od dostawcy. (Opcjonalnie)"
            }, {
                type: "title",
                           content: "Lista klientów"
            }, {
                type: "name",
                           title: "Liczba klientów",
                           content: "Wyświetla liczbę klientów serwera DHCP."
            }, {
                type: "name",
                           title: "Nazwa klienta",
                           content: "Wyświetla nazwę klienta DHCP."
            }, {
                type: "name",
                           title: "Adres MAC",
                           content: "Wyświetla adres MAC."
            }, {
                type: "name",
                           title: "Przydzielony adres IP",
                           content: "Wyświetla adres IP klienta DHCP."
            }, {
                type: "name",
                           title: "Czas przydzielenia adresu",
                           content: "Wyświetla czas przydzielenia adresu IP klientowi."
            }, {
                type: "name",
                           title: "Odśwież",
                           content: "Naciśnij, aby odświeżyć listę."
            }, {
                type: "title",
                           content: "Rezerwacja adresów"
            }, {
                type: "paragraph",
                           content: "Możesz zarezerwować adres IP dla klienta połączonego z routerem ręcznie. Po zarezerwowaniu, adres ten przydzielany będzie tylko danemu klientowi."
            }, {
                type: "name",
                           title: "Adres MAC",
                           content: "Wyświetla adres MAC klienta."
            }, {
                type: "name",
                           title: "Zarezerwowany adres IP",
                           content: "Wyświetla zarezerwowany dla klienta adres IP."
            }, {
                type: "name",
                           title: "Grupa",
                           content: "Wyświetla nazwę grupy, do której należy urządzenie."
            }, {
                type: "name",
                           title: "Włącz",
                           content: "Naciśnij, aby włączyć lub wyłączyć odpowiedni wpis."
            }, {
                type: "name",
                           title: "Zmień",
                           content: "Wyświetla opcję <b>Zmiany</b> lub <b>Usunięcia</b> odpowiedniego wpisu."
            }, {
                type: "note",
                title: "Aby zarezerwować adres IP dla klienta",
                content: [
                    "Naciśnij przycisk <b>Dodaj</b>.",
                "Wprowadź <b>Adres MAC</b> klienta.",
                "Wprowadź adres IP, który chcesz zarezerwować dla klienta.",
                    "Wybierz grupę do której należy klient.",
                    "Zaznacz <b>Włącz ten wpis</b>.",
                    "Naciśnij przycisk <b>OK</b>."
                ]
            }, {
                type: "note",
                title: "Aby edytować dlub usunąć istniejącego klienta",
                content: [
                    "Naciśnij ikonę <b>Edytuj</b> lub <b>Kosz</b> przy odpowiednim wpisie."
                ]
            }, {
                type: "title",
                           content: "Lista warunków"
            }, {
                type: "name",
                           title: "Vendor ID/Początkowy adres IP/Końcowy adres IP/Placówka/Grupa",
                           content: "Wyświetla Vendor ID, początkowy adres IP, końcowy adres IP, placówkę i grupę listy warunków."
            }, {
                type: "name",
                           title: "Stan",
                           content: "Wskazuje aktualny stan listy warunków. Naciśnij ikonę żarówki, aby włączyć (lub wyłączyć) listę warunków."
            }, {
                type: "name",
                           title: "Zmień",
                           content: "Wyświetla opcję <b>Zmiany</b> lub <b>Usunięcia</b> odpowiedniego wpisu."
            }, {
                type: "note",
                           title: "Aby dodać warunek",
                content: [
                    "Naciśnij przycisk <b>Dodaj</b>.",
                    "Wprowadź nazwę urządzenia.",
                    "Wprowadź wartości identyfikujące dostawcę oraz funkcjonalność klienta DHCP.",
                    "Wprowadź początkowy adres IP przydzielany przez serwer DHCP.",
                    "Wprowadź końcowy adres IP przydzielany przez serwer DHCP.",
                "Wprowadź bramę domyślną serwera DHCP.",
                    "Wybierz rodzaj urządzenia z rozwijanej listy.",
                "Wybierz opcję z rozwijanej listy.",
                    "Wprowadź wartość opcji.",
                    "Wybierz grupę z rozwijanej listy.",
                    "Zaznacz <b>Włącz ten wpis</b>.",
                    "Naciśnij przycisk <b>OK</b>."
                ]
            }]
        },
        iptv: {
               TITLE:"Ustawienia IPTV",
            CONTENT: [{
                type: "name",
                title: "IPTV",
                           content: "Wybierz, aby uruchomić funkcję IPTV."
            }, {
                type: "name",
                           title: "Tryb",
                           content: "Wybierz odpowiedni tryb w zależności od usługodawcy internetowego. Wspierane jest sześć trybów IPTV:",
                children: [{
                    type: "name",
                    title: "Bridge",
                           content: "Wybierz, jeżeli na liście nie ma twojego usługodawcy internetowego, a żadne dodatkowe parametry nie są wymagane.",
                    children: [{
                        type: "name",
                        title: "LAN 1/2/3/4",
                           content: "Przypisz portowi LAN funkcję usługodawcy internetowego lub dostawcy IPTV."
                    }]
                }, {
                    /*type: "name",
                           title: "Rosja",
                           content: "Wybierz, jeżeli twój usługodawca internetowy jest z Rosji, a niezbędne parametry są z góry określone, włączając w to Priorytety Internet/IP-Phone/IPTV VLAN ID oraz funkcje portu LAN (1/2/3/4).",
                    children: [{
                        type: "name",
                           title: "ID/Priorytet IPTV Multicast",
                           content: "Możesz uruchomić funkcję IPTV multicast oraz skonfigurować identyfikator i priorytet sieci WLAN, zgodnie z wymaganiami swojego usługodawcy internetowego."
                    }]
                }, {*/
                    type: "name",
                           title: "Singapur-ExStream",
                           content: "Wybierz, jeżeli twoim usługodawcą internetowym jest ExStream z Singapuru, a niezbędne parametry są z góry określone, włączając w to Internet/IP-Phone/IPTV VLAN ID/Priorytety oraz funkcje portu LAN (1/2/3/4)."
                }, {
                    type: "name",
                           title: "Malezja-Unifi",
                           content: "Wybierz, jeżeli twoim usługodawcą internetowym jest Unifi z Malezji, a niezbędne parametry są z góry określone, włączając w to Internet/IP-Phone/IPTV VLAN ID/Priorytety oraz funkcje portu LAN (1/2/3/4)."
                }, {
                    type: "name",
                           title: "Malezja-Maxis",
                           content: "Wybierz, jeżeli twoim usługodawcą internetowym jest Maxis z Malezji, a niezbędne parametry są z góry określone, włączając w to Internet/IP-Phone/identyfikatory i priorytety IPTV sieci WLAN oraz funkcje portu LAN (1/2/3/4)."
                }, {
                    type: "name",
                           title: "Inny",
                           content: "Wybierz, jeżeli twojego usługodawcy internetowego nie ma liście, ale masz do dyspozycji niezbędne parametry, włączając w to Priorytety Internet/IP-Phone/IPTV sieci VLAN ID oraz funkcje portu LAN (1/2/3/4).",
                    children: [{
                        type: "name",
                           title: "Internet/IP-Phone/IPTV VLAN ID/Priorytety",
                           content: "Skonfiguruj identyfikatory sieci WLAN zgodnie z wymaganiami usługodawcy internetowego."
                    }, {
                        type: "name",
                           title: "Tag 802.11Q",
                           content: "Wybierz, aby oznaczać pakiety standardem 802.11Q."
                    }, {
                        type: "name",
                        title: "LAN 1/2/3/4",
                           content: "Przypisz portowi LAN funkcję usługodawcy internetowego lub dostawcy IPTV."
                    }, {
                        type: "name",
                           title: "IPTV Multicast VLAN ID/Priorytet",
                           content: "Możesz uruchomić funkcję IPTV multicast oraz skonfigurować priorytet VLAN ID, zgodnie z wymaganiami swojego usługodawcy internetowego."
                    }]
                }]
            }, {
                type: "name",
                           title: "Proxy IGMP",
                           content: "Wybierz wersję V2 lub wersję V3 IGMP (Internet Group Management Protocol) Proxy, zgodnie z wymaganiami usługodawcy internetowego."
            }]
        },
        usbManage: {
            TITLE: "Urządzenia pamięci masowej USB",
            CONTENT: [{
                type: "paragraph",
                content: "Na stronie <b>Urządzenia pamięci masowej USB</b> wyświetlane są informacje dotyczące każdego z urządzeń pamięci masowej USB, podłączonych do portu USB."
            }, {
                type: "name",
                title: "Skanuj",
                content: "Router zwykle automatycznie wykrywa nowo podłączone urządzenie. Jeśli tak się jednak nie zdarzy, naciśnij ten przycisk, aby wyszukać wszystkie podłączone urządzenia. Następnie odśwież stronę, aby zaktualizować informacje."
            }, {
                type: "name",
                title: "Nazwa woluminu",
                content: "Wyświetla nazwę woluminu podłączonego urządzenia."
            }, {
                type: "name",
                title: "Pojemność",
                content: "Wyświetla całkowitą pojemność podłączonego urządzenia."
            }, {
                type: "name",
                title: "Wolne miejsce",
                content: "Wyświetla ilość wolnego miejsca na podłączonym urządzeniu."
            }, {
                type: "name",
                title: "Aktywny",
                content: "Pojawia się jedynie wtedy, gdy urządzenie pamięci masowej USB podłączone jest do routera. Zaznacz tę opcję, aby włączyć udostępnianie plików urządzenia USB."
            }, {
                type: "name",
                title: "Bezpieczne usuwanie",
                content: "Naciśnij ten przycisk, aby odmontować podłączony napęd przed jego fizycznym rozłączeniem. Zauważ, że przycisk Bezpieczne usuwanie pojawia się jedynie wtedy, gdy urządzenie pamięci masowej USB jest podłączone do routera. Nie da się wysunąć urządzenia USB podczas jego pracy."
            }, {
                type: "title",
                content: "Ustawienia udostępniania"
            }, {
                type: "name",
                title: "Nazwa serwera ",
                content: "Wyświetla nazwę podłączonego urządzenia pamięci masowej USB."
            }, {
                type: "title",
                content: "Udostępnianie folderów"
            }, {
                type: "name",
                title: "Udostępnij wszystko",
                content: "Zaznacz Włącz, aby udostępnić wszystkie pliki i foldery, zaznacz Wyłącz aby udostępnić tylko wybrane foldery."
            }, {
                type: "name",
                title: "Wymagaj uwierzytelniania",
                content: "Zaleca się włączyć uwierzytelnianie, aby od użytkowników wymagane było podanie nazwy użytkownika i hasła przed uzyskaniem dostępu do udostępnionych folderów."
            }, {
                type: "name",
                title: "Nazwa folderu",
                content: "Wyświetla nazwę udostępnionego folderu."
            }, {
                type: "name",
                title: "Ścieżka",
                content: "Wyświetla ścieżkę dostępu do udostępnionego folderu."
            }, {
                type: "name",
                title: "Nazwa woluminu",
                content: "Wyświetla nazwę udostępnionego woluminu."
            }]
        },
        printSrv: {
            TITLE: "Serwer druku",
            CONTENT: [{
                type: "name",
                title: "Serwer druku",
                content: "Zaznacz Włącz, aby włączyć funkcję serwera druku."
            }, {
                type: "name",
                title: "Nazwa drukarki",
                content: "Wyświetla nazwę drukarki podłączonej do routera."
            }]
        },
        diskSettings: {
            TITLE: "Urządzenie pamięci masowej USB",
            CONTENT: [{
                type: "paragraph",
                content: "Na stronie <b>Urządzenia pamięci masowej USB</b> wyświetlane są informacje dotyczące każdego z urządzeń pamięci masowej USB, podłączonych do portu USB."
            }, {
                type: "name",
                title: "Skanuj",
                content: "Router zwykle automatycznie wykrywa nowo podłączone urządzenie. Jeżeli tak się jednak nie zdarzy, naciśnij ten przycisk, aby wyszukać wszystkie podłączone urządzenia. Następnie odśwież stronę, aby zaktualizować informacje."
            }, {
                type: "name",
                title: "Nazwa woluminu",
                content: "Wyświetla nazwę woluminu podłączonego urządzenia."
            }, {
                type: "name",
                title: "Pojemność",
                content: "Wyświetla całkowitą pojemność podłączonego urządzenia."
            }, {
                type: "name",
                title: "Wolne miejsce",
                content: "Wyświetla ilość wolnego miejsca na podłączonym urządzeniu."
            }, {
                type: "name",
                title: "Aktywny",
                content: "Pojawia się jedynie wtedy, gdy urządzenie pamięci masowej USB podłączone jest do routera. Zaznacz tę opcję, aby włączyć udostępnianie plików urządzenia USB."
            }, {
                type: "name",
                title: "Bezpieczne usuwanie",
                content: "Naciśnij ten przycisk, aby odmontować podłączony napęd przed jego fizycznym rozłączeniem. Zauważ, że przycisk Bezpieczne usuwanie pojawia się jedynie wtedy, gdy urządzenie pamięci masowej USB jest podłączone do routera. Nie da się wysunąć urządzenia USB podczas jego pracy."
            }, {
                type: "note",
                title: "Aby skonfigurować serwer plików",
                content: [
                    "Podłącz urządzenie USB do portu USB za pomocą kabla USB.",
                    "Router powinien automatycznie wykryć podłączone urządzenie USB oraz wyświetlić informacje na temat nośnika w sekcji <b>Ustawienia Urządzenia</b>. W innym przypadku, naciśnij przycisk <b>Skanuj</b>.",
                    "Wybierz <b>Aktywny</b>, aby włączyć udostępnianie plików."
                ]
            }]
        },
        folderSharing: {
            TITLE: "Konto dostępowe",
            CONTENT: [{
                type: "name",
                title: "Konto",
                content: "Aby uzyskać dostęp do udostępnionych plików i folderów, wybierz <b>Użyj domyślnego konta</b> lub wybierz <b>Użyj nowego konta</b> i wprowadź poniższe dane, tworząc nowe konto."
            }, {
                type: "name",
                title: "Nazwa użytkownika/Hasło",
                content: "Wprowadź ciąg maksymalnie 15 znaków alfanumerycznych. Nazwa użytkownika musi zaczynać się od litery. Wielkość liter ma znaczenie."
            }, {
                type: "paragraph",
                content: "Naciśnij <b>Zapisz</b>, aby zapisać ustawienia."
            }, {
                type: "title",
                content: "Ustawienia udostępniania"
            }, {
                type: "name",
                title: "Nazwa serwera ",
                content: "Wyświetla nazwę podłączonego urządzenia pamięci masowej USB."
            }, {
                type: "name",
                title: "Włącz",
                content: "Wybierz, aby ustawić metodę dostępu."
            }, {
                type: "name",
                title: "Metoda dostępu",
                content: "Istnieją cztery metody uzyskiwania dostępu do podłączonego urządzenia USB. ",
                children: [{
                    type: "name",
                    title: "Serwer multimediów",
                    content: "Zaznacz tę opcję, aby pozwolić użytkownikom sieci na dostęp do zdjęć, muzyki i filmów znajdujących się na udostępnionym urządzeniu USB za pomocą urządzeń obsługujących DLNA, takich jak komputery, telefony komórkowe, czy konsole do gier (PS/3)."
                }, {
                    type: "name",
                    title: "Otoczenie sieciowe",
                    content: "Zaznacz tę opcję, aby pozwolić użytkownikom sieci na dostęp do udostępnionych zasobów przy użyciu adresu znajdującego się w kolumnie Adres."
                }, {
                    type: "name",
                    title: "FTP",
                    content: "Włącz tę opcję, aby pozwolić użytkownikom na zdalny dostęp do nośnika USB za pomocą serwera FTP za pośrednictwem połączenia internetowego. Aby zmienić numer portu serwera FTP, wprowadź numer portu i naciśnij przycisk <b>Zapisz</b>, aby wprowadzić zmiany."
                }, {
                    type: "name",
                    title: "FTP (przez Internet)",
                    content: "Zaznacz tę opcję, aby pozwolić klientom FTP i użytkownikom na dostęp zdalny, pobieranie plików z udostępnionego urządzenia USB oraz ich wgrywanie za pomocą serwera FTP poprzez połączenie internetowe."
                }]
            }, {
                type: "name",
                title: "Dostęp",
                content: "Wyświetla adres, z którego należy skorzystać, aby uzyskać dostęp do urządzenia USB."
            }, {
                type: "name",
                title: "Port",
                content: "Wyświetla numer portu serwera FTP."
            }, {
                type: "title",
                content: "Udostępnianie folderów"
            }, {
                type: "name",
                title: "Udostępnij wszystko",
                content: "Zaznacz Włącz, aby udostępnić wszystkie pliki i foldery, zaznacz Wyłącz aby udostępnić tylko wybrane foldery."
            }, {
                type: "name",
                title: "Wymagaj uwierzytelniania",
                content: "Włącz uwierzytelnianie, aby od użytkowników wymagane było podanie nazwy użytkownika i hasła przed uzyskaniem dostępu do folderów."
            }, {
                type: "name",
                title: "Nazwa folderu",
                content: "Wyświetla nazwę udostępnionego folderu."
            }, {
                type: "name",
                title: "Ścieżka",
                content: "Wyświetla ścieżkę dostępu do udostępnionego folderu."
            }, {
                type: "name",
                title: "Udostępnianie multimediów",
                content: "Wyświetla informacje na temat udostępniania plików multimedialnych."
            }, {
                type: "name",
                title: "Nazwa woluminu",
                content: "Wyświetla nazwę udostępnionego woluminu."
            }, {
                type: "name",
                title: "Stan",
                content: "Wyświetla stan udostępnionego folderu. Naciśnij na ikonę żarówki, aby włączyć lub wyłączyć udostępnianie folderów. "
            }, {
                type: "name",
                title: "Zmień",
                content: "Umożliwia <b>Edycję</b> lub <b>Usunięcie</b> udostępnionego folderu."
            }, {
                type: "note",
                title: "Aby udostępnić folder:",
                content: [
                    "Wyłącz <b>Zaznacz Wszystkie</b>.",
                    "Naciśnij <b>Dodaj</b>.",
                    "Wybierz <b>Nazwę woluminu</b> i <b>Ścieżkę dostępu</b>.",
                    "Utwórz nazwę folderu.",
                    "Wybierz sposób udostępniania folderu:<br /><b>Wymagaj uwierzytelniania</b> - Wybierz tę opcję, aby od użytkowników wymagane było podanie nazwy użytkownika i hasła przed uzyskaniem dostępu do udostępnionych folderów<br /><b>Włącz możliwość zapisu</b> - Wybierz tę opcję, aby umożliwić użytkownikom dokonywanie zmian w zawartościach folderów.<br /><b>Włącz udostępnianie multimediów</b> - Wybierz tę opcję, aby umożliwić udostępnianie plików multimedialnych.<br />"
                ]
            }]
        },
        ipsec: {
            TITLE: "Ustawienia IPSec",
            CONTENT: [{
                type: "name",
                title: "Dead Peer Detection",
                content: "Dead Peer Detection to metoda wykrywania nieaktywnych hostów IKE. DPD jest używane do odzyskiwania zużytych zasobów oraz do aktywacji awaryjnego IKE. Zaznacz tą opcję, aby włączyć DPD."
            }, {
                type: "name",
                title: "Nazwa połączenia/Brama zdalna/Adres lokalny/Adres zdalny",
                content: "Wyświetla Nazwę połączenia, Bramę zdalną, Adres lokalny oraz Adres zdalny połączenia IPSec."
            }, {
                type: "name",
                title: "Stan",
                content: "Wyświetla stan połączenia IPSec. Dostępne stany:",
                children: [{
                    type: "name",
                    title: "Wyłączony",
                    content: "Wpis jest wyłączony."
                }, {
                    type: "name",
                    title: "Brak połączenia",
                    content: "Wpis jest włączony, ale nie ma połączenia."
                }, {
                    type: "name",
                    title: "Połączono",
                    content: "Wpis jest włączony i połączenie jest aktywne."
                }]
            }, {
                type: "name",
                title: "Włącz",
                content: "Naciśnij ikonę <b>żarówki</b>, aby włączyć lub wyłączyć wpis."
            }, {
                type: "name",
                title: "Zmień",
                content: "Pozwala na <b>zmianę</b> lub <b>usunięcie</b> odpowiedniego wpisu."
            }, {
                type: "name",
                title: "Dodaj",
                content: "Naciśnij, aby dodać nowe połączenie VPN IPSec."
            }, {
                type: "name",
                title: "Nazwa połączenia IPSec",
                content: "Wprowadź nazwę dla połączenia VPN IPSec."
            }, {
                type: "name",
                title: "Adres bramy zdalnej IPSec (URL)",
                content: "Wprowadź adres IP bramy zdalnej. Jest to publiczny adres IP WAN lub nazwa domenowa drugiego końca połączenia."
            }, {
                type: "name",
                title: "Dostęp tunelowy z lokalnych adresów IP",
                content: "Wprowadź maskę podsieci, jeżeli chcesz aby cała twoja sieć dołączyła do sieci VPN, lub wprowadź pojedynczy adres, aby tylko ten adres dołączył do sieci VPN."
            }, {
                type: "name",
                title: "Adres IP VPN",
                content: "Wprowadź adres IP swojej sieci LAN."
            }, {
                type: "name",
                title: "Maska podsieci",
                content: "Wprowadź maskę podsieci swojej sieci LAN."
            }, {
                type: "name",
                title: "Dostęp tunelowy ze zdalnych adresów IP",
                content: "Wprowadź maskę podsieci, jeżeli chcesz aby cała sieć zdalna dołączyła do sieci VPN, lub wprowadź pojedynczy adres, aby tylko ten adres dołączył do sieci VPN."
            }, {
                type: "name",
                title: "Adres IP VPN",
                content: "Wprowadź adres IP zdalnej sieci LAN."
            }, {
                type: "name",
                title: "Maska podsieci",
                content: "Wprowadź maskę podsieci zdalnej sieci LAN."
            }, {
                type: "name",
                title: "Metoda wymiany klucza",
                content: "Wybierz metodę wymiany klucza: Automatyczna (IKE) lub Ręczna."
            }, {
                type: "name",
                title: "Metoda uwierzytelniania",
                content: "Wybierz Klucz współdzielony (zalecane)."
            }, {
                type: "name",
                title: "Klucz współdzielony",
                content: "Wprowadź hasło używane do uwierzytelniania."
            }, {
                type: "name",
                title: "Perfect Forward Secrecy",
                content: "Zaznacz Włącz (lub Wyłącz) Perfect Forward Secrecy (PFS) jako dodatkowy protokół bezpieczeństwa."
            }, {
                type: "name",
                title: "Zaawansowane",
                content: "Naciśnij ten przycisk aby skonfigurować ustawienia zaawansowane. Zalecamy pozostawienie ustawień domyślnych. Jeżeli zmienisz ustawienia, upewnij się, że serwery VPN na obydwu końcach połączenia mają takie same ustawienia w obydwu fazach.",
                children: [{
                    type: "title2",
                    content: " ==Faza 1=="
                }, {
                    type: "name",
                    title: "Tryb",
                    content: "Zaznacz <b>Główny</b> aby skonfigurować parametry negocjacji IKE fazy 1. Zaznacz <b>Agresywny</b> aby tunel negocjował fazę 1 IKE szybciej. (Opcja ta jest mniej bezpieczna)."
                }, {
                    type: "name",
                    title: "Typ identyfikatora lokalnego",
                    content: "Wybierz typ identyfikatora lokalnego. Lokalny adres IP WAN wykorzystuje adres IP jako identyfikator. FQDN (Fully Qualified Domain Name) wykorzystuje nazwę użytkownika."
                }, {
                    type: "name",
                    title: "Identyfikator lokalny",
                    content: "Jeżeli wybrałeś <b>Lokalny adres IP WAN</b> identyfikator wypełni się automatycznie. Jeżeli wybrałeś <b>FQDN</b>, wprowadź nazwę użytkownika, która będzie używana podczas negocjacji IKE."
                }, {
                    type: "name",
                    title: "Typ identyfikatora zdalnego",
                    content: "Wybierz typ identyfikatora zdalnego. Zdalny adres IP WAN wykorzystuje adres IP jako identyfikator. FQDN wykorzystuje nazwę użytkownika."
                }, {
                    type: "name",
                    title: "Identyfikator zdalny",
                    content: "Jeżeli wybrałeś <b>Zdalny adres IP WAN</b> identyfikator wypełni się automatycznie. Jeżeli wybrałeś <b>FQDN</b>, wprowadź nazwę użytkownika, która będzie używana podczas negocjacji IKE."
                }, {
                    type: "name",
                    title: "Algorytm szyfrowania",
                    content: "Wybierz algorytm szyfrowania.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "DES (Data Encryption Standard) szyfruje 64-bitowy blok tekstu 56-bitowym kluczem."
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "Potrójny DES, szyfruje tekst 168-bitowym kluczem."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Używa algorytmu AES i 128-bitowego klucza."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Używa algorytmu AES i 192-bitowego klucza."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Używa algorytmu AES i 256-bitowego klucza."
                    }]
                }, {
                    type: "name",
                    title: "Algorytm integralności",
                    content: "Wybierz algorytm integralności.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "MD5 (Message Digest Algorithm) z ciągu danych o dowolnej długości generuje 128-bitowy skrót."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: " SHA1 (Secure Hash Algorithm) tworzy 160-bitowy skrót z wiadomości o maksymalnym rozmiarze 2^64 (2 do potęgi 64) bitów"
                    }]
                }, {
                    type: "name",
                    title: "Grupa Diffiego-Hellmana dla wymiany kluczy",
                    content: "Wybierz grupę Diffiego-Hellmana używaną do negocjacji. Grupa Diffiego-Hellmana określa w bitach siłę algorytmu."
                }, {
                    type: "name",
                    title: "Czas życia klucza",
                    content: "Wprowadź przedział czasu (w sekundach) jaki musi upłynąć zanim z drugim końcem tunelu nawiązane zostanie nowe połączenie IPSec. Domyślna wartość to 3600."
                }, {
                    type: "title2",
                    content: " ==Faza 2=="
                }, {
                    type: "name",
                    title: "Algorytm szyfrowania",
                    content: "Wybierz algorytm szyfrowania.",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "DES (Data Encryption Standard) szyfruje 64-bitowy blok tekstu 56-bitowym kluczem."
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "Potrójny DES, szyfruje tekst 168-bitowym kluczem."
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "Używa algorytmu AES i 128-bitowego klucza."
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "Używa algorytmu AES i 192-bitowego klucza."
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "Używa algorytmu AES i 256-bitowego klucza."
                    }]
                }, {
                    type: "name",
                    title: "Algorytm integralności",
                    content: "Wybierz algorytm integralności.",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "MD5 (Message Digest Algorithm) z ciągu danych o dowolnej długości generuje 128-bitowy skrót."
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "SHA1 (Secure Hash Algorithm) tworzy 160-bitowy skrót z wiadomości o maksymalnym rozmiarze 2^64 (2 do potęgi 64) bitów"
                    }]
                }, {
                    type: "name",
                    title: "Grupa Diffiego-Hellmana dla wymiany kluczy",
                    content: "Wybierz grupę Diffiego-Hellmana używaną do negocjacji. Grupa Diffiego-Hellmana określa w bitach siłę algorytmu."
                }, {
                    type: "name",
                    title: "Czas życia klucza",
                    content: "Wprowadź przedział czasu (w sekundach) jaki musi upłynąć zanim z drugim końcem tunelu nawiązane zostanie nowe połączenie IPSec. Domyślna wartość to 3600."
                }]
            }]
        },

        wanBasic: {
               TITLE:"Konfiguracja połączenia z Internetem",
            CONTENT: [{
                type: "name",
                           title: "Wykryj",
                           content: "Naciśnij ten przycisk, aby router automatycznie wykrył typ połączenia z Internetem."
            }, {
                type: "paragraph",
                           title: "Uwaga",
                           content: "Jeżeli nie jesteś pewien jaki typ połączenia wybrać, wybierz opcję Wykryj lub skontaktuj się z usługodawcą internetowym."
            }, {
                type: "title",
                            title: "Typ połączenia z Internetem: Statyczne IP"
            }, {
                type: "name",
                           title: "Adres IP/Maska podsieci/Brama domyślna/Preferowany serwer DNS/Alternatywny serwer DNS",
                           content: "Wprowadź dane otrzymane od usługodawcy."
            }, {
                type: "title",
                            title: "Typ połączenia z Internetem: Dynamiczne IP"
            }, {
                type: "name",
                           title: "NIE klonuj adresu MAC/Klonuj adres MAC komputera",
                           content: "Zdecyduj czy router ma sklonować adres MAC. Zależy to od wymagań usługodawcy."
            }, {
                type: "title",
                            title: "Typ połączenia z Internetem: PPPoE"
            }, {
                type: "name",
                           title: "Nazwa użytkownika/hasło",
                           content: "Wprowadź nazwę użytkownika oraz hasło otrzymane od usługodawcy internetowego. Wielkość liter ma znaczenie."
            }, {
                type: "title",
                            title: "Typ połączenia z Internetem: L2TP/PPTP"
            }, {
                type: "name",
                           title: "Nazwa użytkownika/hasło",
                           content: "Wprowadź nazwę użytkownika oraz hasło otrzymane od usługodawcy internetowego. Wielkość liter ma znaczenie."
            }, {
                type: "name",
                           title: "Połączenie zapasowe",
                children: [{
                    type: "name",
                           title: "Dynamiczne IP",
                           content: "Zaznacz tą opcję, jeżeli adres IP uzyskiwany jest automatycznie od usługodawcy internetowego."
                }, {
                    type: "name",
                           title: "Statyczne IP",
                           content: "Zaznacz tą opcję, jeżeli parametry połączenia zostały podane przez usługodawcę internetowego, a następnie wprowadź je w poniższe pola."
                }]
            }, {
                type: "name",
                           title: "Adres IP/Domena serwera VPN",
                           content: "Wprowadź adres IP serwera VPN oraz domenę, otrzymane od usługodawcy."
            }]
        },
        sysconf: {
            TITLE: "Ustawienia zaawansowane sieci bezprzewodowej 2,4 GHz | 5 GHz - 1 | 5 GHz - 2 ",
            CONTENT: [{
                type: "name",
                           title: "Interwał pakietów Beacon",
                           content: "Wprowadź wartość z przedziału 40-1000 w milisekundach, aby określić odstęp czasowy pomiędzy poszczególnymi pakietami Beacon, które są transmitowane przez router, w celu synchronizacji sieci bezprzewodowej. Wartością domyślną jest 100 milisekund."
            }, {
                type: "name",
                           title: "Próg RTS",
                           content: "Wprowadź wartość z przedziału 1-2346, aby określić dopuszczalny rozmiar pakietu transmisji danych przez router.  Domyślną wielkością dla progu RTS jest 2346. Jeśli rozmiar pakietu jest większy od ustawionego progu, router wysyła żądanie wysłania ramek do określonego urządzenia lub negocjuje wysłanie ramki danych, aby odpowiednie pakiety były natychmiast wysłane."
            }, {
                type: "name",
                           title: "Interwał DTIM",
                           content: "Wartość ta określa interwał pomiędzy komunikatami DTIM. Wprowadź wartość z przedziału 1-15 w milisekundach. Ustawiona domyślna wartość 1 oznacza, że komunikaty DTIM będą wysyłane z tą samą częstotliwością co pakiety Beacon."
            }, {
                type: "name",
                           title: "Częstotliwość aktualizacji klucza grupowego",
                           content: "Wprowadź liczbę w sekundach (minimum 30), aby określić interwał pomiędzy automatycznymi aktualizacjami klucza szyfrowania. Wartością domyślną jest 0, oznaczającą, że klucz nie jest aktualizowany."
            }, {
                type: "name",
                           title: "WMM",
                           content: "Funkcja WMM zapewnia zwiększoną wydajność wysyłania pakietów o wysokim priorytecie. Zalecane jest pozostawienie tej opcji włączonej."
            }, {
                type: "name",
                           title: "Krótki GI",
                           content: "Zalecane jest pozostawienie tej funkcji włączonej. Zwiększa ona prędkość wysyłania danych poprzez skrócenie okresu GI (Guard Interval)."
            }, {
                type: "name",
                           title: "Izolacja AP",
                           content: "Jeżeli chcesz, aby urządzenia podłączone do sieci bezprzewodowej nie mogły komunikować się między sobą, ale miały dostęp do Internetu, wybierz opcję Włącz Izolację AP."
            }, {
                type: "title",
                title: "WPS"
            }, {
                type: "name",
                           title: "Włącz WPS",
                           content: "Wybierz Włącz, aby włączyć funkcję WPS."
            }, {
                type: "paragraph",
                           content: "Naciśnij Zapisz, aby zapisać ustawienia."
            }, {
                type: "title",
                            title: "Diody"
            }, {
                type: "name",
                           title: "Tryb nocny",
                           content: "Kiedy ta funkcja jest włączona, diody zostaną automatycznie wyłączone w określonych przedziałach czasu."
            }, {
                type: "name",
                           title: "Harmonogram",
                           content: "Wprowadź przedział czasu, w którym aktywny będzie tryb nocny."
            }, {
                type: "paragraph",
                           content: "Naciśnij Zapisz, aby zapisać ustawienia."
            }, {
                type: "title",
                            title: "Ustawienia ochrony DoS"
            }, {
                type: "paragraph",
                           content: "Ochrona DoS chroni sieć przed atakami ICMP-FLOOD, UDP-FLOOD oraz TCP-FLOOD."
            }, {
                type: "name",
                           title: "Poziom pakietów ICMP-FLOOD",
                           content: "Wprowadź liczbę pakietów ICMP z przedziału 5-7200, aby uruchomić ochronę przed ICMP-FLOOD, gdy liczba pakietów przekroczy wartość ustawionego progu."
            }, {
                type: "name",
                           title: "Poziom pakietów UDP-FLOOD",
                           content: "Wprowadź liczbę pakietów UDP z przedziału 5-7200, aby uruchomić ochronę przed UDP-FLOOD, gdy liczba pakietów przekroczy wartość ustawionego progu."
            }, {
                type: "name",
                           title: "Poziom pakietów TCP-FLOOD",
                           content: "Wprowadź liczbę pakietów TCP-SYN z przedziału 5-7200, aby uruchomić ochronę przed TCP-SYN-FLOOD, gdy liczba pakietów przekroczy wartość ustawionego progu."
            }, {
                type: "paragraph",
                           content: "Naciśnij Zapisz, aby zapisać ustawienia."
            }]
        },
        logConf: {
               TITLE:"Ustawienia dziennika",
            CONTENT: [{
                type: "name",
                           title: "Zapisz lokalnie",
                           content: "Wybierz, aby przesłać dziennik systemowy do pamięci lokalnej.",
       children: [{                      
                           type: "name",
                           title: "Poziom minimalny",
                           content: "Wybierz z rozwijanej listy minimalny poziom dziennika systemowego, który chcesz zapisać."
                       }]
} ,{                      
                           type: "name",
                           title: "Zapisz zdalnie",
                           content: "Wybierz, aby wysłać dziennik systemowy na podany adres IP i port UDP serwera zdalnego.",
       children: [{                      
                           type: "name",
                           title: "Poziom minimalny",
                           content: "Wybierz z rozwijanej listy minimalny poziom dziennika systemowego, który chcesz zapisać."
                       } ,{                      
                           type: "name",
                           title: "Adres IP serwera",
                           content: "Określa adres IP zdalnego serwera dziennika systemowego."
                       } ,{                      
                           type: "name",
                           title: "Port serwera",
                           content: "Określa port zdalnego serwera dziennika systemowego."
                       } ,{                      
                           type: "name",
                           title: "Nazwa lokalna",
                           content: "Wybierz nazwę lokalną dla serwera zdalnego."
                       }]
}]
        },
        lan: {
            TITLE: "LAN",
            CONTENT: [{
                type: "name",
                           title: "Adres MAC",
                           content: "Adres fizyczny routera."
            }, {
                type: "name",
                           title: "IPv4 LAN",
                           content: "Wyświetla domyślny adres IP routera (192.168.0.1), z którego korzystasz logując się do strony konfiguracyjnej routera. "
            }, {
                type: "name",
                           title: "Maska podsieci",
                           content: " Z rozwijanej listy wybierz przydzielony identyfikator, używany przez port LAN do wyznaczania trasy ruchu wewnętrznego i zewnętrznego lub wpisz nową wartość maski podsieci. Wartość domyślna to 255.255.255.0.   "
            }, {
                type: "name",
                title: "IGMP Snooping",
                           content: "IGMP (Internet Group Management Protocol) jest używany do zarządzania multicastingiem w sieciach TCP/IP. Niektórzy usługodawcy używają IGMP do zdalnej konfiguracji urządzeń, takich jak routery. Funkcja ta jest domyślnie włączona."
            }, {
                type: "paragraph",
                           title: "Uwaga",
                           content: "Jeżeli nowy adres IP LAN urządzenia nie jest adresem z tej samej podsieci co poprzedni adres IP, router automatycznie zmieni pulę adresów IP przydzielanych przez serwer DHCP. Funkcje Serwery wirtualne oraz Host DMZ będą jednak wymagały ponownej konfiguracji."
            }]
        },
        ddos: {
            TITLE: "Firewall",
            CONTENT: [{
                type: "name",
                           title: "Firewall SPI",
                           content: "Zapobiega atakom z cyberprzestrzeni i zatwierdza oparty na protokole przesył danych poprzez router. Funkcja ta jest domyślnie włączona."
            }, {
                type: "title",
                            title: "Ochrona DoS"
            }, {
                type: "name",
                           title: "Ochrona DoS",
                           content: "Chroni sieć LAN przed atakami DoS, zapobiegając pojawianiu się nadmiarowych żądań serwera. Domyślnie funkcja ta jest wyłączona."
            }, {
                type: "name",
                           title: "Filtrowanie ataków ICMP-FLOOD",
                           content: "Włącz, aby zapobiec atakom przy użyciu Internet Control Message Protocol (ICMP)."
            }, {
                type: "name",
                           title: "Filtrowanie ataków UDP-FLOOD",
                           content: "Włącz, aby zapobiec atakom przy użyciu User Datagram Protocol (UDP)."
            }, {
                type: "name",
                           title: "Filtrowanie ataków TCP-FLOOD",
                           content: "Włącz, aby zapobiec atakom przy użyciu Transmission Control Protocol-Synchronize (TCP-SYN).",
                children: [{
                    type: "name",
                           title: "Wył.",
                           content: "Brak ochrony."
                }, {
                    type: "name",
                           title: "Niskie",
                           content: "Niski poziom ochrony i niewielki wpływ na działanie routera."
                }, {
                    type: "name",
                           title: "Średnie",
                           content: "Średni poziom ochrony i umiarkowany wpływ na działanie routera."
                }, {
                    type: "name",
                           title: "Wysokie",
                           content: "Wysoki poziom ochrony i znaczny wpływ na działanie urządzenia."
                }]
            }, {
                type: "name",
                           title: "Ignoruj pakiety PING z portu LAN",
                           content: "Włącz, aby ignorować pakiety ping z portu WAN"
            }, {
                type: "name",
                           title: "Ignoruj pakiety PING z portu WAN",
                           content: "Włącz, aby ignorować pakiety ping z portu LAN"
            }, {
                type: "title",
                            title: "Lista zablokowanych hostów DoS"
            }, {
                type: "name",
                           title: "Lista zablokowanych hostów DoS",
                           content: "Wyszczególnione adresy IP i adresy MAC wszystkich zablokowanych urządzeń atakujących."
            }, {
                type: "name",
                           title: "Aby usunąć jeden lub więcej wpisów",
                           content: "Wybierz z listy hostów wpis lub wpisy, które chcesz usunąć i naciśnij przycisk Usuń, znajdujący się nad tabelką."
            }]
        },
        ipv6: {
               TITLE:"Internet IPv6",
            CONTENT: [{
                type: "name",
                           title: "Włącz IPv6",
                           content: "Włącz lub wyłącz funkcję IPv6 routera."
            }, {
                type: "title",
                            title: "Typ połączenia z Internetem: Statyczne IP"
            }, {
                type: "name",
                           title: "Statyczne IP",
                           content: "Wybierz ten typ połączenia, jeżeli twój usługodawca korzysta ze statycznego przydzielania adresu IP."
            }, {
                type: "name",
                           title: "Adres IPv6/Brama domyślna IPv6/Serwer DNS IPv6/Alternatywny serwer IPv6",
                           content: "Wprowadź parametry otrzymane od usługodawcy."
            }, {
                type: "name",
                           title: "MTU (bajtów)",
                           content: "Domyślna wartość MTU w większości sieci Ethernet to 1500 bajtów. Nie zmieniaj tej wartości jeżeli nie zalecił tego usługodawca."
            }, {
                type: "title",
                            title: "Typ połączenia z Internetem: Dynamiczne IP"
            }, {
                type: "name",
                           title: "Dynamiczne IP",
                           content: "Wybierz ten typ połączenia, jeżeli twój usługodawca korzysta z dynamicznego przydzielania adresu IP."
            }, {
                type: "name",
                           title: "Adres IPv6/Brama IPv6",
                           content: "Parametry zostaną automatycznie pobrane od usługodawcy."
            }, {
                type: "name",
                           title: "Typ adresacji",
                           content: "Wybierz typ połączenia IPv6."
            }, {
                type: "name",
                           title: "MTU (bajtów)",
                           content: "Domyślna wartość MTU w większości sieci Ethernet to 1500 bajtów. Nie zmieniaj tej wartości jeżeli nie zalecił tego usługodawca."
            }, {
                type: "name",
                           title: "Użyj poniższych adresów DNS IPv6",
                           content: "Zaznacz tę opcję i wprowadź adres serwera DNS otrzymany od usługodawcy w notacji dziesiętnej. Połączenie WAN będzie priorytetowało wybrany serwer DNS."
            }, {
                type: "name",
                           title: "Nazwa hosta",
                           content: "Wprowadź w tym polu nazwę dla routera."
            }, {
                type: "title",
                            title: "Typ połączenia z Internetem: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                           content: "Wybierz ten typ połączenia, jeżeli twój usługodawca korzysta z PPPoEv6 i posiadasz nazwę użytkownika i hasło."
            }, {
                type: "name",
                           title: "Nazwa użytkownika/Hasło/Potwierdź hasło",
                           content: "Wprowadź parametry otrzymane od usługodawcy."
            }, {
                type: "name",
                           title: "Typ adresacji",
                           content: "Wybierz typ połączenia IPv6."
            }, {
                type: "name",
                           title: "Nazwa usługi",
                           content: "Wprowadź nazwę usługi otrzymaną od usługodawcy. Jeżeli nie posiadasz tych danych, pozostaw puste pole."
            }, {
                type: "name",
                           title: "Nazwa serwera",
                           content: "Wprowadź nazwę serwera otrzymaną od usługodawcy. Jeżeli nie posiadasz tych danych, pozostaw puste pole."
            }, {
                type: "name",
                           title: "MTU (bajtów)",
                           content: "Domyślna wartość MTU w większości sieci Ethernet to 1480 bajtów.",
                children: [{
                    type: "paragraph",
                           content: "<b>Uwaga</b>: W niektórych przypadkach, usługodawca może prosić o zmianę wartości MTU dla lepszego działania sieci. Nie powinieneś zmieniać MTU, jeżeli nie jest to konieczne."
                }]
            }, {
                type: "name",
                           title: "Użyj danych IPv6 od usługodawcy",
                           content: "Zaznacz tę opcję i wprowadź dane otrzymane od usługodawcy."
            }, {
                type: "name",
                           title: "Użyj poniższych adresów DNS IPv6",
                           content: "Zaznacz tę opcję i wprowadź adres serwera DNS otrzymany od usługodawcy. Jeżeli nie zaznaczysz tej opcji, router pobierze adres serwera automatycznie."
            }, {
                type: "title",
                            title: "Typ połączenia z Internetem: Tunel 6do4"
            }, {
                type: "name",
                           title: "Tunel 6do4",
                           content: "Wybierz ten typ połączenia, jeżeli twój usługodawca korzysta z tunelu 6do4."
            }, {
                type: "title",
                            title: "LAN IPv6"
            }, {
                type: "name",
                           title: "Typ adresacji",
                           content: "Zaznacz odpowiednią opcję, zgodnie z zaleceniami usługodawcy.",
                children: [{
                    type: "name",
                    title: "RADVD",
                           content: "Zaznacz tę opcję, aby przydzielać adresy w sieci LAN poprzez RADVD.",
                    children: [{
                        type: "name",
                           title: "Włącz RDNSS",
                           content: "Zaznacz tę opcję, aby włączyć funkcję RDNSS."
                    }, {
                        type: "name",
                           title: "Włącz prefiks ULA",
                           content: "Zaznacz tę opcję, aby włączyć funkcję prefiksu ULA.",
                        children: [{
                            type: "name",
                           title: "Prefiks ULA",
                           content: "Wprowadź prefiks ULA."
                        }, {
                            type: "name",
                           title: "Długość prefiksu ULA",
                           content: "Wprowadź długość prefiksu ULA. Domyślna wartość to 64."
                        }]
                    }]
                }, {
                    type: "name",
                           title: "Serwer DHCPv6",
                           content: "Zaznacz, aby automatycznie przydzielać adresy IP klientom w sieci LAN.",
                    children: [{
                        type: "name",
                           title: "Początkowy adres IPv6",
                           content: "Wprowadź początkowy adres IPv6."
                    }, {
                        type: "name",
                           title: "Końcowy adres IPv6",
                           content: "Wprowadź końcowy adres IPv6."
                    }, {
                        type: "name",
                           title: "Czas przydziału adresu",
                           content: "Wprowadź czas na jaki serwer DHCP będzie przydzielał adresy IPv6 klientom. Po wygaśnięciu adresu, klient otrzyma od serwera nowy adres. Domyślna wartość to 86400 sekund."
                    }]
                }]
            }, {
                type: "name",
                           title: "Typ prefiksu organizacji",
                           content: "Wybierz typ prefiksu dla adresów IPv6. Do wyboru są prefiksy Statyczny i Delegowany."
            }, {
                type: "name",
                           title: "Delegowany",
                children: [{
                    type: "name",
                           title: "Połączenie WAN z prefiksem delegowanym",
                           content: "Wybierz z rozwijanej listy połączenie WAN, któremu chcesz przydzielić prefiks. "
                }]
            }, {
                type: "name",
                           title: "Statyczny",
                children: [{
                    type: "name",
                           title: "Prefiks organizacji",
                           content: "Wprowadź prefiks organizacji."
                }, {
                    type: "name",
                           title: "Długość prefiksu organizacji",
                           content: "Wprowadź długość prefiksu organizacji."
                }]
            }]
        },
		openvpnServer: {
			TITLE: "Open VPN",
			CONTENT: [{
				type: "name",
				title: "Włącz serwer VPN",
				content: "Zaznacz tę opcję, aby włączyć serwer OpenVPN."
			},{
				type: "name",
				title: "Typ usługi",
				content: "Wybierz protokół komunikacji dla serwera OpenVPN: UDP lub TCP."
			},{
				type: "name",
				title: "Port usługi",
				content: "Wprowadź numer portu komunikacyjnego z przedziału 1024 - 65535. Domyślnie ustawionym i zwykle stosowanym portem jest 1194."
			},{
				type: "name",
				title: "Maska podsieci VPN",
				content: "Wprowadź zakres adresów IP, na podstawie którego przydzielane one będą klientom serwera OpenVPN."
			},{
				type: "name",
				title: "Dostęp dla klientów",
				content: "Wybierz typ dostępu dla klientów OpenVPN."
			},{
				type: "name",
				title: "Tylko sieć domowa",
				content: "Klienci mają dostęp do routera i sieci domowej. Domyślna trasa klienta nie ula zmianie."
			},{
				type: "name",
				title: "Internet i sieć domowa",
				content: "Klienci mają dostęp do routera, sieci domowej i Internetu. Domyślna trasa klienta ulega zmianie."
			},{
				type: "paragraph",
				content: "Naciśnij przycisk Zapisz, aby zapisać zmiany."
            },{
                type: "title",
                content: "Certyfikat"
            },{
                type: "paragraph",
                content: "Użyj certyfikatu do identyfikacji połączenia VPN dla komputerów zdalnych."
            },{
                type: "name",
                title: "Wygeneruj",
                content: "Naciśnij, aby wygenerować nowy certyfikat."
            },{
                type: "title",
                content: "Plik konfiguracyjny"
            },{
                type: "name",
                title: "Eksportuj",
                content: "Naciśnij ten przycisk, aby zapisać konfigurację OpenVPN i użyć jej przy dodawaniu nowych połączeń."
			},{
                type: "title",
                content: "Instrukcja dodawania klienta VPN:"
			},{
				type: "step",
				title: "Aby włączyć urządzenie klienckie i połączyć je z serwerem OpenVPN:",
			},{
				type: "paragraph",
				content: "Zanim skonfigurujesz serwer OpenVPN, skonfiguruj najpierw usługę Dynamicznego DNS (zalecane) lub przydziel statyczny adres IP dla portu WAN. Upewnij się, że port zewnętrzny dla NAT nie jest portem usług, a Czas systemowy pobierany jest z Internetu."
			},{
				type: "step",
				title:"",
				content:[
					"Zaznacz Włącz serwer VPN.",
					"Skonfiguruj parametry serwera OpenVPN (Typ usługi, port usługi, dostęp klientów) i naciśnij przycisk Zapisz.",
					"Naciśnij przycisk Eksportuj, aby zapisać plik konfiguracyjny.",
					"Zainstaluj oprogramowanie OpenVPN na urządzeniach klienckich pobierając je ze strony <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> Obsługiwane systemy operacyjne: Windows, Mac OSX, Linux.",
					"Uruchom oprogramowanie OpenVPN i dodaj nowe połączenie VPN przy użyciu zapisanej konfiguracji, aby połączyć klienta z serwerem VPN."
				]
			},{	
				type: "paragraph",
				title: "Note:",
				content: "Aby dowiedzieć się więcej o oprogramowaniu OpenVPN, odwiedź stronę <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
            }]
		},

		pptpvpnServer: {
			TITLE: "VPN PPTP",
			CONTENT: [{
				type: "name",
				title: "Włącz serwer VPN",
				content: "Zaznacz tę opcję, aby włączyć serwer VPN PPTP."
			},{
				type: "name",
				title: "Adres IP klienta",
				content: "Wprowadź zakres adresów IP (maks. 10 klientów), które mogą być przydzielane klientom przez serwer PPTP VPN."
			},{
				type: "name",
				title: "Nazwa użytkownika i hasło",
				content: "Wprowadź nazwę użytkownika i hasło używane do uwierzytelniania klientów serwera VPN PPTP."
			},{
				type: "paragraph",
				content: "Naciśnij przycisk Zapisz, aby zapisać zmiany."
			},{
                type: "title",
                content: "Instrukcja dodawania klienta VPN:"
			},{
				type: "step",
				title: "Aby włączyć urządzenie klienckie i połączyć je z serwerem VPN PPTP:",
			},{
				type: "paragraph",
				content: "Zanim skonfigurujesz serwer VPN PPTP, skonfiguruj najpierw usługę Dynamicznego DNS (zalecane) lub przydziel statyczny adres IP dla portu WAN. Upewnij się, że port zewnętrzny dla NAT jest inny niż 1723, a czas systemowy routera pobierany jest z Internetu."
			},{
				type: "step",
				title:"",
				content:[
					"Zaznacz Włącz serwer VPN.",
					"Skonfiguruj parametry serwera VPN PPTP i naciśnij przycisk Zapisz.",
					"Utwórz połączenie PPTP na swoich urządzeniach klienckich. Obsługiwane systemy operacyjne to Windows, Mac OSX, Linux, iOS oraz Android.",
					"Uruchom oprogramowanie VPN PPTP, dodaj nowe połączenie i wprowadź zarejestrowaną domenę DDNS lub statyczny adres IP przydzielony dla portu WAN, aby połączyć klienta z serwerem VPN.",
				]
			}]
		},

		vpnServerStatus: {
			TITLE: "Połączenia VPN",
			CONTENT: [{
				type: "paragraph",
				content: "Na tej stronie wyświetlani są klienci połączeni aktualnie z serwerami OpenVPN oraz VPN PPTP na routerze."
			},{
				type: "paragraph",
				content: "Naciśnij ikonę Minusa przy kliencie, którego chcesz rozłączyć."
			}]
		},
    };
})(jQuery);
