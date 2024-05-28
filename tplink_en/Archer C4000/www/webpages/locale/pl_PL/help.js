(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla informacje o połączeniu z Internetem (WAN)."
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"Sieć bezprzewodowa 2,4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla informacje o sieci bezprzewodowej."
                       }]
},
       STATUS_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla informacje dotyczące portów Ethernet (LAN)."
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"Sieć dla gości 2,4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla informacje o sieci bezprzewodowej dla gości."
                       }]
},
       STATUS_USB :{ 
               TITLE:"Urządzenia USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla informacje o urządzeniach aktualnie podłączonych do portów USB routera."
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"Użycie zasobów",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla aktualne informacje o działaniu routera."
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"Klienci przewodowi",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla informacje o urządzeniach połączonych z siecią przewodowo."
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"Klienci bezprzewodowi",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla informacje o urządzeniach połączonych z siecią bezprzewodowo."
                       }]
},
       INTERNET_TITLE :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Skonfiguruj parametry IPv4 i sklonuj adres MAC, jeżeli jest taka potrzeba."
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"IPv4",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wybierz Typ połączenia z Internetem i wprowadź potrzebne parametry."
                       } ,{                      
                           type: "title",
                            title: "Typ połączenia: Dynamiczne IP"
                       } ,{                      
                           type: "paragraph",
                           content: "Zaznacz ten typ, jeżeli otrzymujesz adres IP od serwera DHCP dostawcy."
                       } ,{                      
                           type: "name",
                           title: "Adres IP/Maska podsieci/Brama domyślna/Preferowany DNS/Alternatywny DNS",
                           content: "Te parametry są pobierane automatycznie."
                       } ,{                      
                           type: "name",
                           title: "Odnów",
                           content: "Naciśnij, aby pobrać nowe parametry IP z serwera DHCP."
                       } ,{                      
                           type: "name",
                           title: "Zwolnij",
                           content: "Naciśnij, aby zwolnić adres IP otrzymany od serwera DHCP."
                       } ,{                      
                           type: "name",
                           title: "Adresy DNS",
                           content: "Jeżeli dostawca usług internetowych wymaga wprowadzenia określonych adresów serwerów DNS, zaznacz tę opcję i wprowadź Preferowany DNS oraz Alternatywny DNS w odpowiednie pola. Jeżeli opcja nie zostanie zaznaczona, serwery DNS będą przydzielane automatycznie przez dostawcę usług internetowych."
                       } ,{                      
                           type: "name",
                           title: "Wielkość MTU",
                           content: "Typową wielkością MTU (Maksymalna jednostka transmisji) dla większości sieci Ethernet jest 1500 bajtów. Wielkość MTU nie powinna być zmieniana, o ile dostawca usług internetowych nie zaleci inaczej."
                       } ,{                      
                           type: "name",
                           title: "Nazwa hosta",
                           content: "Opcja ta umożliwia nadanie routerowi określonej nazwy hosta."
                       } ,{                      
                           type: "name",
                           title: "Pobierz adres IP uzywając DHCP typu Unicast",
                           content: "Zaznacz tę opcję, jeżeli serwer DHCP dostawcy nie obsługuje komunikacji broadcast i nie możesz pobrać adresu IP dynamicznie."
                       } ,{                      
                           type: "title",
                            title: "Typ połączenia: Statyczne IP"
                       } ,{                      
                           type: "paragraph",
                           content: "Wybierz tę opcję, jeżeli twój dostawca usług internetowych wymaga ustawienia stałego adresu IP, Maski podsieci, Bramy domyślnej oraz DNS."
                       } ,{                      
                           type: "name",
                           title: "Adres IP/Maska podsieci/Brama domyślna/Preferowany DNS/Alternatywny DNS",
                           content: "Wprowadź dane otrzymane od dostawcy."
                       } ,{                      
                           type: "name",
                           title: "Wielkość MTU",
                           content: "Typową wielkością MTU (Maksymalna jednostka transmisji) dla większości sieci Ethernet jest 1500 bajtów. Wielkość MTU nie powinna być zmieniana, o ile dostawca usług internetowych nie zaleci inaczej."
                       } ,{                      
                           type: "title",
                            title: "Typ połączenia: Kabel BigPond"
                       } ,{                      
                           type: "paragraph",
                           content: "Zaznacz ten typ, jeżeli twój dostawca oferuje połączenie kablowe BigPond."
                       } ,{                      
                           type: "name",
                           title: "Nazwa użytkownika/Hasło",
                           content: "Wprowadź nazwę użytkownika i hasło otrzymane od dostawcy. Wielkość liter ma znaczenie."
                       } ,{                      
                           type: "name",
                           title: "Serwer uwierzytelniania",
                           content: "Wpisz adres IP serwera uwierzytelniania lub nazwę hosta."
                       } ,{                      
                           type: "name",
                           title: "Domena uwierzytelniania",
                           content: "Wprowadź sufiks nazwy domenowej serwera (w zależności od lokalizacji). Na przykład, nsw.bigpond.net.au dla NSW/ACT, vic.bigpond.net.au dla VIC/TAS/WA/SA/NT, lub qld.bigpond.net.au dla QLD."
                       } ,{                      
                           type: "name",
                           title: "Wielkość MTU",
                           content: "Typową wielkością MTU (Maksymalna jednostka transmisji) dla większości sieci Ethernet jest 1500 bajtów. Wielkość MTU nie powinna być zmieniana, o ile dostawca usług internetowych nie zaleci inaczej."
                       } ,{                      
                           type: "name",
                           title: "Tryb połączenia",
                           content: "Wybierz odpowiedni tryb połączenia, aby określić sposób nawiązywania połączenia internetowego.",
       children: [{                      
                           type: "name",
                           title: "Automatyczna",
                           content: "W tym trybie połączenie internetowe zostaje automatycznie nawiązane od razu po rozłączeniu."
                       } ,{                      
                           type: "name",
                           title: "Na żądanie",
                           content: "W tym trybie połączenie internetowe zostaje automatycznie zerwane po określonym czasie nieaktywności (Maksymalny czas bezczynności). Połączenie zostaje przywrócone przy kolejnej próbie uzyskania dostępu do Internetu."
                       } ,{                      
                           type: "name",
                           title: "Ręcznie",
                           content: "W tym trybie połączeniem internetowym zarządza się ręcznie, przy użyciu przycisku Połącz lub Rozłącz. Obsługiwana jest także funkcja Maksymalnego czasu bezczynności. Wpisz maksymalny czas nieaktywności (w minutach) dla połączenia internetowego w polu Maksymalny czas bezczynności. Wartością domyślną jest 15 minut. Jeśli chcesz, aby połączenie internetowe było aktywne przez cały czas, wpisz 0."
                       }]
} ,{                      
                           type: "title",
                            title: "Typ połączenia: PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "Wybierz tę opcję, jeżeli korzystasz z usługi DSL (Digital Subscriber Line) oraz otrzymałeś nazwę użytkownika i hasło od swojego dostawcy usług internetowych."
                       } ,{                      
                           type: "name",
                           title: "Nazwa użytkownika/Hasło",
                           content: "Wprowadź nazwę użytkownika i hasło otrzymane od dostawcy. Wielkość liter ma znaczenie."
                       } ,{                      
                           type: "name",
                           title: "Adres IP/Preferowany DNS/Alternatywny DNS",
                           content: "Te parametry są pobierane automatycznie."
                       } ,{                      
                           type: "name",
                           title: "Połączenie dodatkowe (Brak, Dynamiczne IP, Statyczne IP)",
       children: [{                      
                           type: "name",
                           title: "Brak",
                           content: "Wybierz w przypadku braku dodatkowego połączenia."
                       } ,{                      
                           type: "name",
                           title: "Dynamiczne IP",
                           content: "Zaznacz tą opcję jeżeli adres IP uzyskiwany jest automatycznie od dostawcy usług internetowych.",
       children: [{                      
                           type: "name",
                           title: "Odnów",
                           content: "Naciśnij, aby pobrać nowe parametry IP."
                       } ,{                      
                           type: "name",
                           title: "Zwolnij",
                           content: "Naciśnij, aby zwolnić otrzymany adres IP."
                       }]
} ,{                      
                           type: "name",
                           title: "Statyczne IP",
                           content: "Zaznacz tę opcję, jeżeli posiadasz adres IP oraz maskę podsieci od usługodawcy i wprowadź te dane w odpowiednie pola."
                       }]
} ,{                      
                           type: "name",
                           title: "Wielkość MTU",
                           content: "Typową wielkością MTU (Maximum Transmit Unit-Maksymalna jednostka transmisji) dla sieci Ethernet jest 1480 bajtów.",
       children: [{                      
                           type: "note",
                           title: "Uwaga",
                           content: "W rzadkich przypadkach, usługodawca może poprosić o zmianę wielkości MTU dla efektywniejszego działania sieci. Nie zmieniaj tej wartości, jeżeli nie jest to absolutnie konieczne."
                       }]
} ,{                      
                           type: "name",
                           title: "Nazwa usługi/Nazwa serwera",
                           content: "Pola Nazwa usługi i Koncentrator dostępu (AC) są domyślnie puste. Pola te powinny pozostać puste, jeżeli usługodawca nie zalecił inaczej."
                       } ,{                      
                           type: "name",
                           title: "Interwał wykrywania serwera",
                           content: "Wprowadź wartość od 0 do 120 (w sekundach) dla interwału, według którego router będzie sprawdzał stan serwera. Domyślna wartość to 10."
                       } ,{                      
                           type: "name",
                           title: "Adres IP",
                           content: "Jeżeli otrzymałeś od usługodawcy określony adres IP, zaznacz opcję Użyj następującego adresu IP i wprowadź otrzymany adres. W innym wypadku, zaznacz opcję Pobierz adres IP dynamicznie."
                       } ,{                      
                           type: "name",
                           title: "Adresy DNS",
                           content: "Jeżeli otrzymałeś od usługodawcy określony adres IP, zaznacz opcję Użyj następującego adresu IP i wprowadź otrzymany adres. W innym wypadku, zaznacz opcję Pobierz adres IP dynamicznie."
                       } ,{                      
                           type: "name",
                           title: "Tryb połączenia",
                           content: "Wybierz odpowiedni tryb połączenia, aby określić sposób nawiązywania połączenia internetowego.",
       children: [{                      
                           type: "name",
                           title: "Automatyczna",
                           content: "W tym trybie połączenie internetowe zostaje automatycznie nawiązane od razu po rozłączeniu."
                       } ,{                      
                           type: "name",
                           title: "Na żądanie",
                           content: "W tym trybie połączenie internetowe zostaje automatycznie zerwane po określonym czasie nieaktywności (Maksymalny czas bezczynności). Połączenie zostaje przywrócone przy kolejnej próbie uzyskania dostępu do Internetu."
                       } ,{                      
                           type: "name",
                           title: "Czasowe",
                           content: "W tym trybie połączenie nawiązywane jest dla określonego przedziału czasowego. Po wybraniu tej opcji, wpisz czas rozpoczęcia i czas zakończenia; obie wartości są w formacie GG:MM."
                       } ,{                      
                           type: "name",
                           title: "Ręcznie",
                           content: "W tym trybie połączeniem internetowym zarządza się ręcznie, przy użyciu przycisku Połącz lub Rozłącz. Obsługiwana jest także funkcja Maksymalnego czasu bezczynności. Wpisz maksymalny czas nieaktywności (w minutach) dla połączenia internetowego w polu Maksymalny czas bezczynności. Wartością domyślną jest 15 minut. Jeśli chcesz, aby połączenie internetowe było aktywne przez cały czas, wpisz 0."
                       } ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Tryb połączenia czasowego będzie aktywny jedynie po konfiguracji czasu systemowego na stronie Zaawansowane->Narzędzia systemowe->Ustawienia czasu."
                       }]
} ,{                      
                           type: "title",
                            title: "Typ połączenia: L2TP/PPTP"
                       } ,{                      
                           type: "paragraph",
                           content: "Wybierz ten typ połączenia, jeżeli możesz łączyć się z serwerem L2TP/PPTP oraz otrzymałeś nazwę użytkownika, hasło oraz adres IP/domenę serwera od swojego dostawcy usług internetowych."
                       } ,{                      
                           type: "name",
                           title: "Nazwa użytkownika/Hasło",
                           content: "Wprowadź nazwę użytkownika i hasło otrzymane od dostawcy. Wielkość liter ma znaczenie."
                       } ,{                      
                           type: "name",
                           title: "Adres IP/Preferowany DNS/Alternatywny DNS",
                           content: "Te parametry są pobierane automatycznie."
                       } ,{                      
                           type: "name",
                           title: "Połączenie dodatkowe (Dynamiczne IP lub Statyczne IP)",
       children: [{                      
                           type: "name",
                           title: "Dynamiczne IP",
                           content: "Zaznacz tą opcję jeżeli adres IP uzyskiwany jest automatycznie od dostawcy usług internetowych."
                       } ,{                      
                           type: "name",
                           title: "Statyczne IP",
                           content: "Zaznacz tę opcję, jeżeli posiadasz adres IP, maskę podsieci, bramę oraz adresy DNS od dostawcy i wprowadź te dane w odpowiednie pola."
                       }]
} ,{                      
                           type: "name",
                           title: "Adres IP/Nazwa domenowa serwera VPN",
                           content: "Wprowadź adres IP lub nazwę domenową serwera VPN."
                       } ,{                      
                           type: "name",
                           title: "Wielkość MTU",
                           content: "Standardowy rozmiar MTU dla większości sieci Ethernet to 1460 bajtów dla L2TP i 1420 bajtów dla PPTP. Wielkość MTU nie powinna być zmieniana, o ile dostawca usług internetowych nie zaleci inaczej."
                       } ,{                      
                           type: "name",
                           title: "Tryb połączenia",
                           content: "Wybierz odpowiedni tryb połączenia, aby określić sposób nawiązywania połączenia internetowego.",
       children: [{                      
                           type: "name",
                           title: "Automatyczna",
                           content: "W tym trybie połączenie internetowe zostaje automatycznie nawiązane od razu po rozłączeniu."
                       } ,{                      
                           type: "name",
                           title: "Na żądanie",
                           content: "W tym trybie połączenie internetowe zostaje automatycznie zerwane po określonym czasie nieaktywności (Maksymalny czas bezczynności). Połączenie zostaje przywrócone przy kolejnej próbie uzyskania dostępu do Internetu."
                       } ,{                      
                           type: "name",
                           title: "Ręcznie",
                           content: "W tym trybie połączeniem internetowym zarządza się ręcznie, przy użyciu przycisku Połącz lub Rozłącz. Obsługiwana jest także funkcja Maksymalnego czasu bezczynności. Wpisz maksymalny czas nieaktywności (w minutach) dla połączenia internetowego w polu Maksymalny czas bezczynności. Wartością domyślną jest 15 minut. Jeśli chcesz, aby połączenie internetowe było aktywne przez cały czas, wpisz 0."
                       }]
}]
},
       INTERNET_MAC :{ 
               TITLE:"Klonowanie MAC",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wybierz metodę klonowania adresu MAC w zależności od potrzeb."
                       } ,{                      
                           type: "name",
                           title: "NIE klonuj adresu MAC",
                           content: "W przypadku, gdy dostawca usług internetowych nie wiąże przypisanego adresu IP z adresem MAC komputera, NIE zmieniaj domyślnego adresu MAC routera."
                       } ,{                      
                           type: "name",
                           title: "Klonuj adres MAC",
                           content: "W przypadku, gdy dostawca usług internetowych wiąże przypisany adres IP z adresem MAC komputera, skopiuj aktualny adres MAC komputera podłączonego do routera."
                       } ,{                      
                           type: "name",
                           title: "Użyj innego adresu MAC",
                           content: "W przypadku, gdy dostawca usług internetowych wiąże przypisany adres IP z określonym adresem MAC, wpisz adres MAC ręcznie."
                       }]
},
       INTERNET_WAN_AGGREGATION :{ 
               TITLE:"Agregacja WAN",
               CONTENT: [{
                           type: "paragraph",
                           id: "internet_wan_aggregation_detail",
                           content: "Agregacja WAN zamienia port LAN1 na port WAN, aby utworzyć szybsze połączenie. Możesz dzięki temu osiągnąć prędkości powyżej 1Gb/s."
                       } ,{                      
                           type: "note",
                           id: "internet_wan_aggregation_note",
                           title: "Uwaga",
                           content: "Przed włączeniem tej funkcji, upewnij się, że twój usługodawca obsługuje Agregację WAN, a twój modem ma 2 porty WAN."
                       } ,{                      
                           type: "step",
                           title: "Aby zastosować agregację WAN",
       content: [ 
                "1. Włącz Agregację WAN.",
                "2. Naciśnij Zapisz.",
                "3. Podłącz porty WAN oraz LAN1 routera do portów WAN modemu za pomocą kabli Ethernet."]
}]
},
       LAN_IPV4 :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla adres MAC, adres IP oraz maskę sieciową routera."
                       } ,{                      
                           type: "name",
                           title: "Adres MAC",
                           content: "Adres fizyczny portu Ethernet routera, widziany z sieci LAN."
                       } ,{                      
                           type: "name",
                           title: "Adres IP",
                           content: "Wyświetla adres IP, którego możesz użyć, aby zalogować się do strony zarządzania routerem. Możesz zmienić adres na inny."
                       } ,{                      
                           type: "name",
                           title: "Maska podsieci",
                           content: "Zaznacz identyfikator używany przez port LAN do przesyłania ruchu w sieci i poza nią lub wprowadź nową maskę podsieci."
                       } ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Jeżeli nowy adres LAN IP urządzenia nie jest adresem z tej samej podsieci co poprzedni adres IP, razem z adresem IP router automatycznie zmieni pulę adresów IP przydzielanych przez serwer DHCP. Funkcje Serwery wirtualne oraz Host DMZ będą jednak wymagały ponownej konfiguracji."
                       }]
},
       LINK_AGG :{ 
               TITLE:"Agregacja połączeń",
               CONTENT: [{
                           type: "paragraph",
                           content: "Agregacja łączy pozwala na łączenie ze sobą dwóch portów w celu utworzenia ścieżki danych o dużej przepustowości, co pozwala osiągnąć większe prędkości i stabilność sieci przewodowej."
                       } ,{                      
                           type: "step",
                           id: "link_agg_step_help",
                           title: "Aby zastosować agregację łączy",
       content: [ 
                "1. Przesuń pasek, aby włączyć funkcję agregacji łączy.",
                "2. Określ dwa porty agregracji łączy.",
                "3. Naciśnij Zapisz."]
}]
},
       IPTV :{ 
               TITLE:"IPTV",
               CONTENT: [{
                           type: "paragraph",
                           content: "IPTV (Internet Protocol Television) to system, który pozwala na odbiór telewizji przez IP za pomocą sieci lokalnej lub Internetu."
                       } ,{                      
                           type: "name",
                           id: "igmp-snooping",
                           title: "IGMP Snooping",
                           content: "IGMP (Internet Group Management Protocol) Snooping to funkcja, która pozwala na przesyłanie pakietów multicast tylko do portów, które ich zażądały."
                       } ,{                      
                           type: "name",
                           title: "IGMP Proxy",
                           content: "Zaznacz, aby włączyć funkcję IGMP Proxy, jeżeli twoja usługa IPTV opiera się na technologii IGMP."
                       } ,{                      
                           type: "name",
                           title: "Wersja IGMP",
                           content: "Wybierz wersję IGMP zgodnie z zaleceniami usługodawcy. Domyślna wersja IGMKP to V2."
                       } ,{                      
                           type: "name",
                           id: "igmp-wifi",
                           title: "Bezprzewodowe przekierowanie pakietów multicast",
                           content: "Zaznacz, aby włączyć funkcję Wireless Multicast Forwarding, która pozwala na przesyłanie pakietów mulitcast w sieci bezprzewodowej."
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "Zaznacz, aby włączyć funkcję IPTV, jeżeli twoja usługa IPTV nie opiera się na technologii IGMP."
                       } ,{                      
                           type: "name",
                           title: "Profil usługodawcy",
                           content: "Wybierz odpowiedni profil usługodawcy, aby zakończyć konfigurację. Są trzy typy profili:",
       children: [{                      
                           type: "name",
                           title: "Kraj-Nazwa usługodawcy",
                           content: "Profile z domyślnymi ustawieniami mają format \"Kraj-nazwa usługodawcy\". Wybierz swojego usługodawcę z rozwijanej listy."
                       } ,{                      
                           type: "name",
                           id: "iptv_bridge_child_1to4",
                           title: "Bridge",
                           content: "Jeżeli twojego usługodawcy nie ma na liście i dodatkowe parametry nie są przez niego wymagane, wybierz ten profil i wprowadź port LAN dla IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Wybierz typ danych dla portu LAN. Na przykład, jeżeli wybierzez IPTV dla portu LAN1, będzie on przesyłał tylko dane IPTV i powinieneś podłączyć do niego dekoder."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_2to5",
                           title: "Bridge",
                           content: "Jeżeli twojego usługodawcy nie ma na liście i dodatkowe parametry nie są przez niego wymagane, wybierz ten profil i wprowadź port LAN dla IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Wybierz typ danych przesyłanych przez port LAN. Np. jeżeli wybierzesz IPTV dla portu LAN2, będzie on przesyłał tylko dane IPTV i powinieneś podłączyć do niego dekoder."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_5to8",
                           title: "Bridge",
                           content: "Jeżeli twojego usługodawcy nie ma na liście i dodatkowe parametry nie są przez niego wymagane, wybierz ten profil i wprowadź port LAN dla IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Wybierz typ danych przesyłanych przez port LAN. Np. jeżeli wybierzesz IPTV dla portu LAN5, będzie on przesyłał tylko dane IPTV i powinieneś podłączyć do niego dekoder."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_1to4",
                           title: "Inny",
                           content: "Jeżeli twojego usługodawcy nie ma na liście, a dodatkowe parametry są przez niego wymagane, wybierz ten profil.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/VLAN ID IPTV/Priorytet",
                           content: "Skonfiguruj VLAN ID oraz priorytety wymagane przez dostawcę."
                       } ,{                      
                           type: "name",
                           title: "Tag 802.11Q",
                           content: "Wybierz, aby oznaczać pakiety standardem 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "VLAN ID/Priorytet IPTV Multicast",
                           content: "Możesz włączyć funkcję IPVT multicast, jeżeli jest to potrzebne oraz skonfigurować VLAN ID i priorytet."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Wybierz typ danych dla portu LAN. Na przykład, jeżeli wybierzez IPTV dla portu LAN1, będzie on przesyłał tylko dane IPTV i powinieneś podłączyć do niego dekoder."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_2to5",
                           title: "Inny",
                           content: "Jeżeli twojego usługodawcy nie ma na liście, a dodatkowe parametry są przez niego wymagane, wybierz ten profil.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/VLAN ID IPTV/Priorytet",
                           content: "Skonfiguruj VLAN ID oraz priorytety wymagane przez dostawcę."
                       } ,{                      
                           type: "name",
                           title: "Tag 802.11Q",
                           content: "Wybierz, aby oznaczać pakiety standardem 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "VLAN ID/Priorytet IPTV Multicast",
                           content: "Możesz włączyć funkcję IPVT multicast, jeżeli jest to potrzebne oraz skonfigurować VLAN ID i priorytet."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Wybierz typ danych przesyłanych przez port LAN. Np. jeżeli wybierzesz IPTV dla portu LAN2, będzie on przesyłał tylko dane IPTV i powinieneś podłączyć do niego dekoder."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_5to8",
                           title: "Inny",
                           content: "Jeżeli twojego usługodawcy nie ma na liście, a dodatkowe parametry są przez niego wymagane, wybierz ten profil.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/VLAN ID IPTV/Priorytet",
                           content: "Skonfiguruj VLAN ID oraz priorytety wymagane przez dostawcę."
                       } ,{                      
                           type: "name",
                           title: "Tag 802.11Q",
                           content: "Wybierz, aby oznaczać pakiety standardem 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "VLAN ID/Priorytet IPTV Multicast",
                           content: "Możesz włączyć funkcję IPVT multicast, jeżeli jest to potrzebne oraz skonfigurować VLAN ID i priorytet."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Wybierz typ danych przesyłanych przez port LAN. Np. jeżeli wybierzesz IPTV dla portu LAN5, będzie on przesyłał tylko dane IPTV i powinieneś podłączyć do niego dekoder."
                       }]
}]
}]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"Serwer DHCP",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Domyślnie funkcja serwera DHCP (Dynamic Host Configuration Protocol) jest uruchomiona; serwer automatycznie przydziela parametry TCP/IP z puli adresów IP urządzeniom klienckim.",
                "Jeśli nie chcesz uruchamiać innego serwera DHCP lub ręcznie przydzielać parametrów TCP/IP każdemu z urządzeń klienckich podłączonych do sieci, NIE wyłączaj funkcji serwera DHCP."]
} ,{                      
                           type: "name",
                           title: "Pula adresów IP",
                           content: "Wprowadź pulę adresów, które będą przydzielane klientom w sieci LAN."
                       } ,{                      
                           type: "name",
                           title: "Czas przydzielenia adresu",
                           content: "Wprowadź czas (1-2880 minut), na jaki adres IP będzie przydzielany klientom. Domyślna wartość to 120."
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"Rezerwacja adresów",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla parametry urządzenia z zarezerwowanym adresem IP."
                       } ,{                      
                           type: "step",
                           title: "Aby zarezerwować adres IP",
       content: [ 
                "1. Naciśnij Dodaj.",
                "2. Naciśnij Skanuj, aby wybrać urządzenie aktualnie połączone z routerem lub wprowadź adres MAC urządzenia ręcznie i wprowadź adres IP, który chcesz dla niego zarezerwować. ",
                "3. Wprowadź opis urządzenia.",
                "4. Wybierz Włącz.",
                "5. Naciśnij przycisk Zapisz."]
} ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Jeżeli chcesz wyłączyć rezerwację, naciśnij na ikonę żarówki."
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"Lista klientów DHCP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla informacje o aktualnie połączonych urządzeniach."
                       }]
},
       DDNS :{ 
               TITLE:"Dynamiczny DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dynamiczny DNS (Dynamic Domain Name System) pozwala na przypisanie stałego adresu domenowego do dynamicznego adresu IP. Jest to przydatne, gdy posiadasz swoją stronę internetową lub inny serwer w sieci lokalnej. Aby korzystać z tej funkcji, musisz najpierw zarejestrować się u dostawcy usługi DDNS, np. www.dyndns.com."
                       } ,{                      
                           type: "step",
                           title: "Aby skonfigurować usługę Dynamiczny DNS",
       content: [ 
                "1. Wybierz dostawcę usługi DDNS.",
                "2. Wprowadź nazwę użytkownika i hasło do konta DDNS.",
                "3. Wprowadź Domenę otrzymaną od dostawcy usług internetowych.",
                "4. Wybierz Interwał aktualizacji z rozwijanej listy.",
                "5. Jeżeli dostawcą usługi jest NO-IP, funkcja Wiązanie IP WAN pozwala na powiązanie nazwy domenowej z adresem WAN routera.",
                "6. Naciśnij Zaloguj i Zapisz."]
} ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Jeżeli chcesz użyć innego konta DDNS, wyloguj się najpierw i zaloguj ponownie używając nowych danych."
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"Dynamiczny DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dynamiczny DNS (Dynamic Domain Name System) pozwala na przypisanie stałego adresu domenowego do dynamicznego adresu IP. Jest to przydatne, gdy posiadasz swoją stronę internetową lub inny serwer w sieci lokalnej. Aby korzystać z tej funkcji, musisz najpierw zarejestrować się u dostawcy usługi DDNS, np. www.dyndns.com."
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"Nazwa listy domenowej",
               CONTENT: [{
                           type: "paragraph",
                           content: "W tabeli wyświetlone są informacje o nazwach domenowych powiązanych z twoim kontem Cloud."
                       } ,{                      
                           type: "step",
                           title: "Aby zarejestrować nową nazwę domenową",
       content: [ 
                "1. Naciśnij Zarejestruj.",
                "2. Wprowadź nazwę domenową, którą chcesz zarejestrować.",
                "3. Naciśnij Zapisz."]
}]
},
       ADVANCED_ROUTING_STATIC_ROUTING :{ 
               TITLE:"Routing statyczny",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcja routing statyczny służy określaniu z góry trasy, którą muszą pokonać pakiety, aby dotrzeć do określonego punktu w sieci."
                       } ,{                      
                           type: "step",
                           title: "Aby dodać trasę statyczną",
       content: [ 
                "1. Naciśnij Dodaj.",
                "2. Wprowadź adres IP w polu Sieć docelowa.",
                "3. Wprowadź maskę podsieci w polu Maska podsieci.",
                "4. Wprowadź adres IP bramy w polu Brama domyślna, aby połączyć router z hostem lub siecią.",
                "5. Wybierz LAN lub WAN w polu Interfejs, aby wybrać typ sieci docelowej.",
                "6. Wprowadź krótki opis.",
                "7. Wybierz Włącz.",
                "8. Naciśnij przycisk Zapisz."]
} ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Jeżeli chcesz wyłączyć rezerwację, naciśnij na ikonę żarówki."
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"Tablica routingu",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla wszystkie działające obecnie reguły."
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"Ustawienia sieci bezprzewodowej",
               CONTENT: [{
                           type: "paragraph",
                           content: "Skonfiguruj ustawienia sieci bezprzewodowej."
                       }]
},
       WIRELESS_SMART_CONNECT :{ 
               TITLE:"Smart Connect",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zaznacz tę opcję, aby włączyć funkcję smart connect. Pomaga ona połączyć każde urządzenie z najlepszym w danym momencie pasmem, równoważąc w ten sposób ruch sieciowy."
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"Sieć bezprzewodowa 2,4GHz",
               CONTENT: [{
                           type: "name",
                           title: "Nazwa sieci bezprzewodowej (SSID)",
                           content: "Zalecamy zmianę nazwy sieci bezprzewodowej (SSID). Wielkość liter ma znaczenie."
                       } ,{                      
                           type: "name",
                           title: "Ukryj nazwę sieci",
                           content: "Zaznacz, jeżeli nie chcesz, aby sieć 2,4GHz była widoczna na liście sieci bezprzewodowych. Nazwę sieci będzie trzeba wprowadzić ręcznie. "
                       } ,{                      
                           type: "name",
                           title: "Zabezpieczenia",
                           content: "Wybierz jeden z poniższych typów zabezpieczeń:",
       children: [{                      
                           type: "name",
                           title: "Brak zabezpieczeń",
                           content: "Zaznacz, jeżeli chcesz wyłączyć zabezpieczenia sieci bezprzewodowej. Nie jest to zalecane."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Zaznacz, aby włączyć zabezpieczenia sieci bezprzewodowej. Pozwoli to uniknąć dostępu nieupoważnionych osób do sieci. Po włączeniu zabezpieczeń skonfiguruj poniższe opcje.",
       children: [{                      
                           type: "name",
                           title: "Wersja",
                           content: "Wybierz wersję zabezpieczeń. Zalecamy wybór WPA2-PSK. Jeżeli nie jesteś pewien, ustaw wybór automatyczny."
                       } ,{                      
                           type: "name",
                           title: "Szyfrowanie",
                           content: "Wybierz typ szyfrowania. AES jest bezpieczniejszym szyfrowaniem. NIE zalecamy używania szyfrowania TKIP, jeżeli router pracuje w trybie 802.11n. Wybranie TKIP spowoduje również wyłączenie funkcji WPS. Jeżeli nie jesteś pewien, ustaw wybór automatyczny."
                       } ,{                      
                           type: "name",
                           title: "Hasło",
                           content: "Wprowadź hasło połączenia bezprzewodowego, używając od 8 do 64 znaków ASCII lub znaków szesnastkowych."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Enterprise",
                           content: "Wybierz tę opcję, aby włączyć bardziej zaawansowaną metodę uwierzytelniania opartą o serwer RADIUS. Funkcja WPS zostanie wyłączona.",
       children: [{                      
                           type: "name",
                           title: "Wersja",
                           content: "Wybierz wersję zabezpieczeń. Zalecamy wybór WPA2. Jeżeli nie jesteś pewien, ustaw wybór automatyczny."
                       } ,{                      
                           type: "name",
                           title: "Szyfrowanie",
                           content: "Wybierz typ szyfrowania. AES jest bezpieczniejszym szyfrowaniem. NIE zalecamy używania szyfrowania TKIP, jeżeli router pracuje w trybie 802.11n. Wybranie TKIP spowoduje również wyłączenie funkcji WPS. Jeżeli nie jesteś pewien, ustaw wybór automatyczny."
                       } ,{                      
                           type: "name",
                           title: "Adres IP serwera RADIUS",
                           content: "Wprowadź adres IP serwera RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Port serwera RADIUS",
                           content: "Wprowadź port serwera RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Hasło serwera RADIUS",
                           content: "Wprowadź hasło do serwera RADIUS."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Zaznacz tę opcję, aby włączyć podstawową metodę uwierzytelniania, w wypadku gdy urządzenie klienckie może uzyskać dostęp do sieci tylko za pomocą WEP. Zaznaczenie opcji spowoduje wyłączenie funkcji WPS.",
       children: [{                      
                           type: "name",
                           title: "Typ",
                           content: "Wybierz typ uwierzytelniania dla sieci bezprzewodowej. Jeżeli nie jesteś pewien, ustaw wybór automatyczny."
                       } ,{                      
                           type: "name",
                           title: "Format klucza WEP",
                           content: "Możesz wybrać format ASCII lub Szesnastkowy. Format ASCII oznacza kombinację dowolnych znaków alfanumerycznych. Szesnastkowy oznacza kombinację określonych znaków alfanumerycznych (0-9, A-F, a-f)."
                       } ,{                      
                           type: "name",
                           title: "Typ Klucza",
                           content: "Wybierz długość klucza WEP.",
       children: [{                      
                           type: "name",
                           title: "64-bity",
                           content: "Możesz wprowadzić 10 znaków szesnastkowych (0-9, a-f, A-F) lub 5 znaków ASCII."
                       } ,{                      
                           type: "name",
                           title: "128-bity",
                           content: "Możesz wprowadzić 26 znaków szesnastkowych (0-9, a-f, A-F) lub 13 znaków ASCII."
                       }]
} ,{                      
                           type: "name",
                           title: "Klucz",
                           content: "Wprowadź klucz WEP w odpowiednie pole."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Kanał",
                           content: "Wybierz kanał dla sieci bezprzewodowej 2,4GHz. Jeżeli problemy z działaniem sieci bezprzewodowej nie występują, zalecane jest pozostawienie tej opcji na ustawieniu automatycznym."
                       } ,{                      
                           type: "name",
                           title: "Moc transmisji",
                           content: "Aby określić moc transmisji danych, wybierz spośród opcji Wysoka, Średnia lub Niska. Domyślnie ustawiona jest Wysoka (zalecane)."
                       } ,{                      
                           type: "name",
                           id: "atf_2g4",
                           title: "Funkcja Airtime Fairness",
                           content: "Zaznacz tę opcję, aby włączyć funkcję Airtime Fairness (ATF), która umożliwia zoptymalizowanie przepustowości przepływu danych. Planer ruchu pozwala równomiernie podzielić zasoby sieciowe pomiędzy klientów bezprzewodowych. "
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_2g4",
                           title: "Funkcja MU-MIMO",
                           content: "Naciśnij włącz, aby skorzystać z funkcji MU-MIMO."
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"Połączenie bezprzewodowe 5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Nazwa sieci bezprzewodowej (SSID)",
                           content: "Zalecamy zmianę nazwy sieci bezprzewodowej (SSID). Wielkość liter ma znaczenie."
                       } ,{                      
                           type: "name",
                           title: "Ukryj nazwę sieci",
                           content: "Zaznacz, jeżeli nie chcesz, aby sieć 5GHz była widoczna na liście sieci bezprzewodowych. Nazwę sieci trzeba będzie wprowadzić ręcznie. "
                       } ,{                      
                           type: "name",
                           title: "Zabezpieczenia",
                           content: "Wybierz jeden z poniższych typów zabezpieczeń:",
       children: [{                      
                           type: "name",
                           title: "Brak zabezpieczeń",
                           content: "Zaznacz, jeżeli chcesz wyłączyć zabezpieczenia sieci bezprzewodowej. Nie jest to zalecane."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Zaznacz, aby włączyć zabezpieczenia sieci bezprzewodowej. Pozwoli to uniknąć dostępu nieupoważnionych osób do sieci. Po włączeniu zabezpieczeń skonfiguruj poniższe opcje.",
       children: [{                      
                           type: "name",
                           title: "Wersja",
                           content: "Wybierz wersję zabezpieczeń. Zalecamy wybór WPA2-PSK. Jeżeli nie jesteś pewien, ustaw wybór automatyczny."
                       } ,{                      
                           type: "name",
                           title: "Szyfrowanie",
                           content: "Wybierz typ szyfrowania. AES jest bezpieczniejszym szyfrowaniem. NIE zalecamy używania szyfrowania TKIP, jeżeli router pracuje w trybie 802.11n. Wybranie TKIP spowoduje również wyłączenie funkcji WPS. Jeżeli nie jesteś pewien, ustaw wybór automatyczny."
                       } ,{                      
                           type: "name",
                           title: "Hasło",
                           content: "Wprowadź hasło połączenia bezprzewodowego, używając od 8 do 64 znaków ASCII lub znaków szesnastkowych."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Enterprise",
                           content: "Wybierz tę opcję, aby włączyć bardziej zaawansowaną metodę uwierzytelniania opartą o serwer RADIUS. Funkcja WPS zostanie wyłączona.",
       children: [{                      
                           type: "name",
                           title: "Wersja",
                           content: "Wybierz wersję zabezpieczeń. Zalecamy wybór WPA2. Jeżeli nie jesteś pewien, ustaw wybór automatyczny."
                       } ,{                      
                           type: "name",
                           title: "Szyfrowanie",
                           content: "Wybierz typ szyfrowania. AES jest bezpieczniejszym szyfrowaniem. NIE zalecamy używania szyfrowania TKIP, jeżeli router pracuje w trybie 802.11n. Wybranie TKIP spowoduje również wyłączenie funkcji WPS. Jeżeli nie jesteś pewien, ustaw wybór automatyczny."
                       } ,{                      
                           type: "name",
                           title: "Adres IP serwera RADIUS",
                           content: "Wprowadź adres IP serwera RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Port serwera RADIUS",
                           content: "Wprowadź port serwera RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Hasło serwera RADIUS",
                           content: "Wprowadź hasło do serwera RADIUS."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Zaznacz tę opcję, aby włączyć podstawową metodę uwierzytelniania, w wypadku gdy urządzenie klienckie może uzyskać dostęp do sieci tylko za pomocą WEP. Zaznaczenie opcji spowoduje wyłączenie funkcji WPS.",
       children: [{                      
                           type: "name",
                           title: "Typ",
                           content: "Wybierz typ uwierzytelniania dla sieci bezprzewodowej. Jeżeli nie jesteś pewien, ustaw wybór automatyczny."
                       } ,{                      
                           type: "name",
                           title: "Format klucza WEP",
                           content: "Możesz wybrać format ASCII lub Szesnastkowy. Format ASCII oznacza kombinację dowolnych znaków alfanumerycznych. Szesnastkowy oznacza kombinację określonych znaków alfanumerycznych (0-9, A-F, a-f)."
                       } ,{                      
                           type: "name",
                           title: "Typ Klucza",
                           content: "Wybierz długość klucza WEP.",
       children: [{                      
                           type: "name",
                           title: "64-bity",
                           content: "Możesz wprowadzić 10 znaków szesnastkowych (0-9, a-f, A-F) lub 5 znaków ASCII."
                       } ,{                      
                           type: "name",
                           title: "128-bity",
                           content: "Możesz wprowadzić 26 znaków szesnastkowych (0-9, a-f, A-F) lub 13 znaków ASCII."
                       }]
} ,{                      
                           type: "name",
                           title: "Klucz",
                           content: "Wprowadź klucz WEP w odpowiednie pole."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Kanał",
                           content: "Wybierz kanał dla sieci bezprzewodowej 2,4GHz. Jeżeli problemy z działaniem sieci bezprzewodowej nie występują, zalecane jest pozostawienie tej opcji na ustawieniu automatycznym."
                       } ,{                      
                           type: "name",
                           title: "Moc transmisji",
                           content: "Aby określić moc transmisji danych, wybierz spośród opcji Wysoka, Średnia lub Niska. Domyślnie ustawiona jest Wysoka (zalecane)."
                       } ,{                      
                           type: "name",
                           id: "atf_5g",
                           title: "Funkcja Airtime Fairness",
                           content: "Zaznacz tę opcję, aby włączyć funkcję Airtime Fairness (ATF), która umożliwia zoptymalizowanie przepustowości przepływu danych. Planer ruchu pozwala równomiernie podzielić zasoby sieciowe pomiędzy klientów bezprzewodowych. "
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_5g",
                           title: "Funkcja MU-MIMO",
                           content: "Naciśnij włącz, aby skorzystać z funkcji MU-MIMO."
                       }]
},
       WPS :{ 
               TITLE:"WPS",
               CONTENT: [{
                           type: "paragraph",
                           content: "WPS (Wi-Fi Protected Setup) pozwala na łatwe zestawienie bezpiecznego połączenia w sieci bezprzewodowej."
                       } ,{                      
                           type: "name",
                           title: "Przycisk (zalecane)",
       content: [ 
                "Dzięki tej metodzie w łatwy sposób połączysz się z siecią bezprzewodową na urządzeniach obsługujących funkcję WPS.",
                "Naciśnij na ekranie przycisk Rozpocznij WPS. W ciągu dwóch minut naciśnij przycisk WPS na urządzeniu klienckim."]
} ,{                      
                           type: "name",
                           title: "PIN routera",
       content: [ 
                "Domyślny kod PIN znajduje się na nalepce routera.",
                "Naciśnij Generuj, aby uzyskać nowy kod PIN lub naciśnij Domyślny, aby przywrócić fabrycznie ustawiony kod PIN. "]
} ,{                      
                           type: "name",
                           title: "Wprowadź kod PIN klienta",
       content: [ 
                "Ta metoda umożliwia ręczne dodawanie urządzeń bezprzewodowych.",
                "Wprowadź kod PIN urządzenia i naciśnij Połącz."]
}]
},
       WIRELESS_STATISTICS :{ 
               TITLE:"Aktywne odbiorniki bezprzewodowe",
               CONTENT: [{
                           type: "name",
                           title: "Numer klienta",
                           content: "Wyświetla numer połączonego urządzenia bezprzewodowego."
                       } ,{                      
                           type: "name",
                           title: "Adres MAC",
                           content: "Wyświetla adres MAC połączonego urządzenia bezprzewodowego."
                       } ,{                      
                           type: "name",
                           title: "Typ połączenia",
                           content: "Wyświetla pasmo częstotliwości połączenia bezprzewodowego (2,4GHz lub 5GHz), w którym pracuje urządzenie bezprzewodowe."
                       } ,{                      
                           type: "name",
                           title: "Zabezpieczenia",
                           content: "Wyświetla typ zabezpieczeń, z którego korzysta urządzenie bezprzewodowe."
                       } ,{                      
                           type: "name",
                           title: "Pakiety otrzymane",
                           content: "Wyświetla pakiety odebrane przez urządzenie bezprzewodowe."
                       } ,{                      
                           type: "name",
                           title: "Pakiety wysłane",
                           content: "Wyświetla pakiety wysłane przez urządzenie bezprzewodowe."
                       } ,{                      
                           type: "paragraph",
                           content: "Naciśnij przycisk Odśwież, aby zaktualizować wyświetlane informacje."
                       }]
},
       WIRELESS_SCHEDULE :{ 
               TITLE:"Harmonogram sieci bezprzewodowej",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dzięki Harmonogramowi sieci bezprzewodowej możesz wyłączyć sieć bezprzewodową o wybranych porach. Możesz na przykład wyłączyć sieć pomiędzy 24:00 a 7:00. "
                       } ,{                      
                           type: "name",
                           title: "Wyłączanie sieci bezprzewodowej",
                           content: "Wyświetla godziny, w których sieć bezprzewodowa jest wyłączona.",
       children: [{                      
                           type: "step",
                           title: "Aby ustawić czas wyłączania sieci bezprzewodowej",
       content: [ 
                "1. Naciśnij Dodaj.",
                "2. Ustaw czas nieaktywności sieci bezprzewodowej.",
                "3. Zaznacz dni, w których reguła ma być powtarzana. Możesz wybrać \"Codziennie\" lub podać określone dni.",
                "4. Naciśnij Zapisz."]
}]
}]
},
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"Ustawienia",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ta funkcja pozwala gościom na dostęp do Internetu bez udostępniania im sieci głównej."
                       } ,{                      
                           type: "name",
                           title: "Pozwól gościom na komunikację między sobą",
                           content: "Zaznacz tę opcję, aby umożliwić urządzeniom w sieci dla gości komunikację między sobą za pomocą metod, takich jak miejsca sieciowe, Samba, Ping i FTP."
                       } ,{                      
                           type: "name",
                           id: "access_local",
                           title: "Pozwól gościom na dostęp do sieci lokalnej",
                           content: "Zaznacz tę opcję, aby umożliwić urządzeniom w sieci dla gości dostęp do zasobów sieci lokalnej, takich jak miejsca sieciowe, Samba, Ping i FTP."
                       }]
},
       GUEST_NETWORK_WIRELESS :{ 
               TITLE:"Sieć bezprzewodowa 2,4GHz/5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Włącz sieć dla gości",
                           content: "Zaznacz tę opcję, aby włączyć funkcję sieci dla gości."
                       } ,{                      
                           type: "name",
                           title: "Nazwa sieci bezprzewodowej (SSID)",
                           content: "Użyj domyślnej nazwy sieci dla gości lub utwórz własną (do 32 znaków)."
                       } ,{                      
                           type: "name",
                           title: "Ukryj nazwę sieci",
                           content: "Zaznacz tę opcję, aby nazwa sieci nie była widoczna na liście dostępnych sieci bezprzewodowych."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Interwał aktualizacji hasła",
                           content: "Wybierz interwał aktualizacji hasła Sieci dla gości."
                       } ,{                      
                           type: "name",
                           title: "Zabezpieczenia",
                           content: "Jeżeli hasło nie ma być aktualizowane, wybierz jeden z poniższych typów zabezpieczeń:",
       children: [{                      
                           type: "name",
                           title: "Brak zabezpieczeń",
                           content: "Zaznacz, jeżeli chcesz wyłączyć zabezpieczenia sieci bezprzewodowej. Nie jest to zalecane."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Zaznacz, aby włączyć zabezpieczenia sieci bezprzewodowej dla gości. Pozwoli to uniknąć dostępu nieupoważnionych osób do sieci. Po włączeniu zabezpieczeń skonfiguruj poniższe opcje.",
       children: [{                      
                           type: "name",
                           title: "Wersja",
                           content: "Wybierz wersję zabezpieczeń. Zalecamy wybór WPA2-PSK. Jeżeli nie jesteś pewien, ustaw wybór automatyczny."
                       } ,{                      
                           type: "name",
                           title: "Szyfrowanie",
                           content: "Wybierz typ szyfrowania. AES jest bezpieczniejszym szyfrowaniem. NIE zalecamy używania szyfrowania TKIP, jeżeli router pracuje w trybie 802.11n. Wybranie TKIP spowoduje również wyłączenie funkcji WPS. Jeżeli nie jesteś pewien, ustaw wybór automatyczny."
                       }]
} ,{                      
                           type: "name",
                           id: "portal-help-title",
                           title: "Portal",
                           content: "Uwierzytelnianie poprzez portal zwiększa bezpieczeństwo sieci poprzez weryfikację klientów, którzy chcą uzyskać tymczasowy dostęp do sieci bezprzewodowej."
                       } ,{                      
                           type: "step",
                           id: "portal-help-content",
                           title: "Aby skonfigurować portal uwierzytelniania:",
       content: [ 
                "1. Wybierz Portal w opcji Zabezpieczenia.",
                "2. Wybierz Proste hasło lub Brak uwierzytelniania w opcji Uwierzytelnianie.",
                "A. Hasło – Określ hasło uwierzytelniające (8-16 znaków alfanumerycznych, liczb i _).",
                "B. Brak uwierzytelniania – Klienci mogą uzyskać dostęp do sieci bez dodatkowych weryfikacji. ",
                "3. Zaznacz 1 godzina, 2 godziny, 4 godziny, 8 godzin lub Zawsze, aby określić limit czasu wierzytelności. Gdy upoważnienie danego klienta wygaśnie, będzie on musiał zalogować się ponownie. ",
                "4. (Opcjonalnie) Włącz Przekierowanie i wprowadź adres URL. Każdy uwierzytelniony klient zostanie przekierowany na określony przez Ciebie adres.",
                "5. (Opcjonalnie) Możesz także zoptymalizować stronę logowania według własnych preferencji.",
                "A. Tytuł portalu – Do 31 znaków.",
                "B. Warunki użytkowania – Do 1023 znaków.",
                "C. Obraz logo – Wgraj obraz w formacie JPG lub PNG (maksymalnie 100KB).",
                "D. Tło – Wgraj obraz w formacie JPG lub PNG (maksymalnie 2MB).",
                "6. Naciśnij Zapisz."]
}]
} ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Hasło",
                           content: "Wprowadź hasło składające się z 8 - 63 znaków ASCII lub 8 - 64 znaków szesnastkowych (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Hasło",
                           content: "Użyj hasła wygenerowanego losowo lub wprowadź własne, składające się z 8 do 63 znaków ASCII lub 8 do 64 znaków szesnastkowych (0-9, a-f, A-F)."
                       }]
},
       NAT :{ 
               TITLE:"ALG",
               CONTENT: [{
                           type: "paragraph",
                           content: "ALG (Application Layer Gateway) pozwala na włączenie filtrów NAT na bramie i dodanie obsługi translacji portów i adresów dla niektórych protokołów warstwy aplikacji: FTP, TFTP. H323 itp. Włączenie ALG jest zalecane."
                       } ,{                      
                           type: "name",
                           title: "Włącz FTP ALG",
                           content: "Umożliwia klientom i serwerom FTP (File Transfer Protocol) przesył danych poprzez NAT."
                       } ,{                      
                           type: "name",
                           title: "Włącz TFTP ALG",
                           content: "Umożliwia klientom i serwerom TFTP (Trivial File Transfer Protocol) przesył danych poprzez NAT."
                       } ,{                      
                           type: "name",
                           title: "Włącz H323 ALG",
                           content: "Umożliwia klientom Microsoft NetMeeting na komunikację poprzez NAT."
                       } ,{                      
                           type: "name",
                           title: "Włącz RTSP ALG",
                           content: "Umożliwia klientom media player na komunikację z serwerami przesyłu strumieniowego poprzez NAT."
                       } ,{                      
                           type: "name",
                           title: "Włącz SIP ALG",
                           content: "Po włączeniu, pozwala klientom na komunikację z serwerami SIP poprzez NAT."
                       } ,{                      
                           type: "name",
                           title: "Włącz PPTP Passthrough",
                           content: "Umożliwia tunelowanie sesji Point-to-Point poprzez sieć IP i przekazywanie przez router."
                       } ,{                      
                           type: "name",
                           title: "Włącz L2TP Passthrough",
                           content: "Umożliwia tunelowanie Warstwy 2 sesji Point-to-Point poprzez sieć IP i przekazywanie przez router."
                       } ,{                      
                           type: "name",
                           title: "Włącz IPSec Passthrough",
                           content: "Po włączeniu, pozwala na tunelowanie i przesyłanie IPSec przez router. IPSec używa zabezpieczeń kryptograficznych, aby zapewnić prywatność i bezpieczeństwo komunikacji w sieciach IP."
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"Serwery wirtualne",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Serwery wirtualne umożliwiają dostęp z sieci zewnętrznej do usług uruchomionych na urządzeniach podłączonych do sieci lokalnej. Serwer wirtualny określany jest jako port zewnętrzny. Wszelkie żądania z Internetu kierowane do tego portu będą przekierowywane do wyznaczonego komputera, którego adres IP musi być skonfigurowany na statyczny lub zarezerwowany.",
                "Gdy utworzysz serwer w sieci lokalnej i zechcesz udostępnić go w Internecie, umożliwi ci to funkcja Serwerów wirtualnych. "]
} ,{                      
                           type: "paragraph",
                           content: "Tabela wyświetla informacje o serwerach wirtualnych."
                       } ,{                      
                           type: "name",
                           title: "Typ usługi",
                           content: "Wyświetla nazwę serwera wirtualnego."
                       } ,{                      
                           type: "name",
                           title: "Port zewnętrzny",
                           content: "Wyświetla numer portu lub zakres portów, z których korzysta serwer wirtualny."
                       } ,{                      
                           type: "name",
                           title: "Adres IP",
                           content: "Wyświetla adres IP komputera z uruchomioną usługą."
                       } ,{                      
                           type: "name",
                           title: "Port wewnętrzny",
                           content: "Wyświetla numer portu komputera z uruchomioną usługą."
                       } ,{                      
                           type: "name",
                           title: "Protokół",
                           content: "Wyświetla protokół, z którego korzysta usługa: TCP, UDP lub Wszystkie (Wszystkie protokoły obsługiwane przez router)."
                       } ,{                      
                           type: "name",
                           title: "Stan",
                           content: "Wyświetla aktualny stan (włączony lub wyłączony) określnej reguły filtrowania."
                       } ,{                      
                           type: "name",
                           title: "Zmień",
                           content: "Wyświetla opcję Zmiany lub Usunięcia poszczególnych reguł."
                       } ,{                      
                           type: "step",
                           title: "Aby dodać nową regułę ",
       content: [ 
                "1. Naciśnij Dodaj.",
                "2. Naciśnij Skanuj, aby wybrać usługę z listy i automatycznie wprowadzić odpowiednie dla niej wartości. Jeżeli usługa nie znajduje się na liście, wprowadź Port zewnętrzny lub zakres portów ręcznie. Pozostaw pole Port wewnętrzny puste, jeżeli jest on taki sam jak Port zewnętrzny lub wprowadź numer portu, jeżeli są one inne. W polu IP wewnętrzne wprowadź w formacie dziesiętnym adres IP komputera, na którym znajduje się usługa.",
                "3. Wybierz protokół usługi: TCP, UDP, lub Wszystkie z rozwijanej listy protokołów.",
                "4. Wybierz Włącz.",
                "5. Naciśnij przycisk Zapisz."]
} ,{                      
                           type: "note",
                           title: "Uwaga",
       content: [ 
                "1. Jeżeli chcesz wyłączyć rezerwację, naciśnij na ikonę żarówki.",
                "2. Zaleca się pozostawić domyślne ustawienia portu i protokołu wewnętrznego, jeżeli nie jesteś pewien z których należy korzystać. ",
                "3. Jeżeli host lokalny obsługuje więcej niż jedną usługę, musisz utworzyć regułę dla każdej z usług. Pamiętaj, że numer Portu zewnętrznego NIE może się z niczym pokrywać."]
}]
},
       PORT_TRIGGERING :{ 
               TITLE:"Port Triggering",
               CONTENT: [{
                           type: "paragraph",
                           content: "Port Triggering służy do przekierowywania ruchu do określonego punktu serwera w sieci."
                       } ,{                      
                           type: "paragraph",
                           content: "Tabela wyświetla informacje o funkcji Port Triggering."
                       } ,{                      
                           type: "name",
                           title: "Usługa",
                           content: "Wyświetla nazwę usługi."
                       } ,{                      
                           type: "name",
                           title: "Port otwierający",
                           content: "Wyświetla port ruchu wychodzącego, aby umożliwić utworzenie reguły filtrowania połączeń wychodzących."
                       } ,{                      
                           type: "name",
                           title: "Protokół otwierający",
                           content: "Wyświetla protokół, z którego korzysta port otwierający. TCP, UDP lub Wszystkie (Wszystkie protokoły obsługiwane przez router)."
                       } ,{                      
                           type: "name",
                           title: "Port zewnętrzny",
                           content: "Wyświetla port lub zakres portów, z których korzysta system zdalny. Odpowiedź zostanie przekierowana za pomocą jednego z tych portów do komputera, który utworzył daną regułę. Maksymalnie można wprowadzić 5 grup portów (lub części portów). Każda grupa portów musi być oddzielona \",\" (przecinkiem), na przykład: 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
                       } ,{                      
                           type: "name",
                           title: "Protokół zewnętrzny",
                           content: "Wyświetla protokół, z którego korzysta port odbierający: TCP, UDP lub Wszystkie (Wszystkie protokoły obsługiwane przez router)."
                       } ,{                      
                           type: "name",
                           title: "Stan",
                           content: "Wyświetla aktualny stan (włączony lub wyłączony) określnej reguły filtrowania."
                       } ,{                      
                           type: "name",
                           title: "Zmień",
                           content: "Wyświetla opcję Zmiany lub Usunięcia poszczególnych reguł."
                       } ,{                      
                           type: "step",
                           title: "Definiowanie reguł Port Triggering",
       content: [{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Tylko jeden komputer na raz może stosować daną regułę."
                       },
                "1. Naciśnij Dodaj.",
                "2. Naciśnij Skanuj, aby wybrać usługę z listy i automatycznie wprowadzić odpowiednie dla niej wartości. Jeżeli usługa nie znajduje się na liście, wprowadź wartości ręcznie.",
                "3. Wybierz Włącz.",
                "4. Naciśnij Zapisz."]
} ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Jeżeli chcesz wyłączyć regułę, naciśnij ikonę żarówki."
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcja DMZ (Demilitarized Zone) pozwala na otwarcie wszystkich portów na wybranym komputerze. Jest ona przydatna do zastosowań takich jak np. gry online lub wideokonferencje. Komputer działający jako host DMZ musi mieć skonfigurowany statyczny adres IP i wyłączoną funkcję DHCP."
                       } ,{                      
                           type: "paragraph",
                           content: "Kiedy funkcja DMZ jest włączona, host DMZ jest narażony na potencjalne zagrożenia w Internecie. Jeżeli nie korzystasz aktualnie z funkcji DMZ, wyłącz ją."
                       } ,{                      
                           type: "step",
                           title: "Aby przydzielić komputerowi lub serwerowi funkcję serwera DMZ",
       content: [ 
                "1. Naciśnij przycisk Włącz DMZ.",
                "2. W polu Adres IP hosta DMZ wpisz adres IP komputera lokalnego, aby przydzielić mu funkcję hosta DMZ.",
                "3. Naciśnij Zapisz."]
}]
},
       UPNP :{ 
               TITLE:"UPnP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcja UPnP (Universal Plug-and-Play) jest domyślnie włączona, aby pozwolić urządzeniom, takim jak komputery i urządzenia smart na automatyczne wykrywanie i komunikację w sieci lokalnej."
                       } ,{                      
                           type: "paragraph",
                           content: "Włącz UPnP, jeżeli chcesz korzystać z usług takich jak np. gry online, komunikaja P2P, VoIP lub teleVoIP."
                       } ,{                      
                           type: "name",
                           title: "Lista aktualnych ustawień UPnP",
                           content: "Lista usług UPnP wyświetla informacje UPnP dotyczące hostów w sieci lokalnej."
                       }]
},
       MODEM :{ 
               TITLE:"Pomoc 3G/4G",
               CONTENT: [{
                           type: "name",
                           title: "Modem USB 3G/4G",
                           content: "Wyświetla stan modemu USB 3G/4G."
                       } ,{                      
                           type: "name",
                           title: "Użyj parametrów wykrytego dostawcy",
                           content: "Ta funkcja jest domyślnie włączona. Kiedy funkcja jest włączona, router będzie automatycznie wykrywał kartę SIM/UIM i wprowadzał parametry dostawcy. Jeżeli identyfikacja nie powiedzie się, wybierz Region i Dostawcę ręcznie. "
                       } ,{                      
                           type: "name",
                           title: "Region",
                           content: "Automatycznie wybiera i wyswietla region, jeżeli modem USB i karta SIM zostały zidentyfikowane. Jeżeli identyfikacja nie powiodła się, wybierz region z rozwijanej listy. "
                       } ,{                      
                           type: "name",
                           title: "Komórkowy dostawca usług internetowych ",
                           content: "Usługodawca jest wybierany automatycznie po wykryciu modemu USB z kartą SIM. Jeżeli nie został on wykryty, wybierz go ręcznie z rozwijanej listy. Wartości pól APN oraz Numer dla połączeń zostaną uzupełnione automatycznie po wybraniu usługodawcy."
                       } ,{                      
                           type: "name",
                           title: "PIN SIM/UIM",
                           content: "Jeżeli Ochrona karty SIM/UIM jest włączona, wprowadź kod PIN. Ochrona karty SIM/UIM jest domyślnie wyłączona. Jeżeli trzykrotnie wprowadzisz nieprawidłowy PIN, karta zostanie zablokowana. Aby ją odblokować, należy wprowadzić kod PUK po podłączeniu modemu do komputera."
                       } ,{                      
                           type: "name",
                           title: "Wiadomość",
                           content: "Wyświetla informacje o kodzie PIN karty SIM/UIM, jeżeli Ochrona PIN jest włączona. "
                       } ,{                      
                           type: "name",
                           title: "Ustawienia Numer telefonu,APN,Nazwa użytkownika/Hasło",
                           content: "Jeżeli twojego <strong>Dostawcy</strong> nie ma na liście, zaznacz tę opcję i wprowadź parametry połączenia otrzymane od dostawcy."
                       } ,{                      
                           type: "name",
                           title: "Numer telefonu",
                           content: "Wprowadź Numer dla połączeń otrzymany od dostawcy."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Wprowadź APN (Access Point Name) otrzymany od dostawcy."
                       } ,{                      
                           type: "name",
                           title: "Nazwa użytkownika/Hasło",
                           content: "Wprowadź Nazwę użytkownika i Hasło otrzymane od dostawcy. Wielkość liter ma znaczenie."
                       } ,{                      
                           type: "name",
                           title: "Łącz na żądanie",
                           content: "W tym trybie połączenie internetowe zostaje automatycznie zerwane po określonym czasie nieaktywności (Maksymalny czas bezczynności). Połączenie zostaje przywrócone przy kolejnej próbie uzyskania dostępu do Internetu."
                       } ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Czasami połączenie nie zostaje rozłączone po upływie czasu bezczynności, ponieważ aplikacje działające w tle korzystają z Internetu."
                       } ,{                      
                           type: "name",
                           title: "Łącz automatycznie",
                           content: "W tym trybie połączenie z Internetem zostaje automatycznie wznowione po rozłączeniu."
                       } ,{                      
                           type: "name",
                           title: "Łącz ręcznie",
                           content: "W tym trybie możesz nacisnąć przycisk Połącz lub Rozłącz, aby ręcznie połączyć lub rozłączyć połączenie. Tryb ten obsługuje również maksymalny czas nieaktywności. Domyślna wartość to 15 minut. Jeżeli chcesz, aby połączenie z Internetem było zawsze aktywne, wprowadź 0 (zero)."
                       } ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Czasami połączenie nie zostaje rozłączone po upływie czasu bezczynności, ponieważ aplikacje działające w tle korzystają z Internetu."
                       } ,{                      
                           type: "paragraph",
                           content: "Naciśnij przycisk Zapisz, aby zapisać ustawienia."
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"Zaawansowane ustawienia 3G/4G - Pomoc",
               CONTENT: [{
                           type: "name",
                           title: "Modem USB 3G/4G",
                           content: "Wyświetla stan modemu USB 3G/4G."
                       } ,{                      
                           type: "name",
                           title: "Użyj parametrów wykrytego dostawcy",
                           content: "Ta funkcja jest domyślnie włączona. Kiedy funkcja jest włączona, router będzie automatycznie wykrywał kartę SIM/UIM i wprowadzał parametry dostawcy. Jeżeli identyfikacja nie powiedzie się, wybierz Region i Dostawcę ręcznie. "
                       } ,{                      
                           type: "name",
                           title: "Region",
                           content: "Automatycznie wybiera i wyswietla region, jeżeli modem USB i karta SIM zostały zidentyfikowane. Jeżeli identyfikacja nie powiodła się, wybierz region z rozwijanej listy. "
                       } ,{                      
                           type: "name",
                           title: "Komórkowy dostawca usług internetowych ",
                           content: "Usługodawca jest wybierany automatycznie po wykryciu modemu USB z kartą SIM. Jeżeli nie został on wykryty, wybierz go ręcznie z rozwijanej listy. Wartości pól APN oraz Numer dla połączeń zostaną uzupełnione automatycznie po wybraniu usługodawcy."
                       } ,{                      
                           type: "name",
                           title: "PIN SIM/UIM",
                           content: "Jeżeli Ochrona karty SIM/UIM jest włączona, wprowadź kod PIN. Ochrona karty SIM/UIM jest domyślnie wyłączona. Jeżeli trzykrotnie wprowadzisz nieprawidłowy PIN, karta zostanie zablokowana. Aby ją odblokować, należy wprowadzić kod PUK po podłączeniu modemu do komputera."
                       } ,{                      
                           type: "name",
                           title: "Wiadomość",
                           content: "Wyświetla informacje o kodzie PIN karty SIM/UIM, jeżeli Ochrona PIN jest włączona. "
                       } ,{                      
                           type: "name",
                           title: "Ustawienia Numer telefonu,APN,Nazwa użytkownika/Hasło",
                           content: "Jeżeli twojego <strong>Dostawcy</strong> nie ma na liście, zaznacz tę opcję i wprowadź parametry połączenia otrzymane od dostawcy."
                       } ,{                      
                           type: "name",
                           title: "Numer telefonu",
                           content: "Wprowadź Numer dla połączeń otrzymany od dostawcy."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Wprowadź APN (Access Point Name) otrzymany od dostawcy."
                       } ,{                      
                           type: "name",
                           title: "Nazwa użytkownika/Hasło",
                           content: "Wprowadź Nazwę użytkownika i Hasło otrzymane od dostawcy. Wielkość liter ma znaczenie."
                       } ,{                      
                           type: "name",
                           title: "Łącz na żądanie",
                           content: "W tym trybie połączenie internetowe zostaje automatycznie zerwane po określonym czasie nieaktywności (Maksymalny czas bezczynności). Połączenie zostaje przywrócone przy kolejnej próbie uzyskania dostępu do Internetu."
                       } ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Czasami połączenie nie zostaje rozłączone po upływie czasu bezczynności, ponieważ aplikacje działające w tle korzystają z Internetu."
                       } ,{                      
                           type: "name",
                           title: "Łącz automatycznie",
                           content: "W tym trybie połączenie z Internetem zostaje automatycznie wznowione po rozłączeniu."
                       } ,{                      
                           type: "name",
                           title: "Łącz ręcznie",
                           content: "W tym trybie możesz nacisnąć przycisk Połącz lub Rozłącz, aby ręcznie połączyć lub rozłączyć połączenie. Tryb ten obsługuje również maksymalny czas nieaktywności. Domyślna wartość to 15 minut. Jeżeli chcesz, aby połączenie z Internetem było zawsze aktywne, wprowadź 0 (zero)."
                       } ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Czasami połączenie nie zostaje rozłączone po upływie czasu bezczynności, ponieważ aplikacje działające w tle korzystają z Internetu."
                       } ,{                      
                           type: "name",
                           title: "Typ uwierzytelniania",
                           content: "Wybierz typ uwierzytelniania. Domyślnie wybór jest automatyczny. Niektórzy dostawcy wymagają konkretnego typu uwierzytelniania, jeżeli nie jesteś pewien, pozostaw ustawienia domyślne."
                       } ,{                      
                           type: "name",
                           title: "Automatyczna",
                           content: "Router automatycznie wykryje typ uwierzytelniania używany przez dostawcę."
                       } ,{                      
                           type: "name",
                           title: "PAP",
                           content: "Protokół PAP (Password Authentication Protocol). Protokół umożliwia uwierzytelnienie za pomocą uzgodnień dwukierunkowych. Wybierz tę opcję, jeżeli jest to wymagane przez twojego usługodawcę internetowego."
                       } ,{                      
                           type: "name",
                           title: "CHAP",
                           content: "Protokół CHAP (Challenge Handshake Authentication Protocol) umożliwia Routerowi uwierzytelnienie za pomocą trójfazowego uzgadniania i okresowego sprawdzania tożsamości. Wybierz tę opcję, jeżeli jest to wymagane przez twojego usługodawcę internetowego."
                       } ,{                      
                           type: "name",
                           title: "Wielkość MTU",
                           content: "Domyślna wartość MTU (Maximum Transmission Unit) to 1480 bajtów. Nie zmieniaj jej, jeżeli nie jest to konieczne."
                       } ,{                      
                           type: "name",
                           title: "Użyj następujących adresów DNS",
                           content: "Jeżeli otrzymałeś adresy serwerów DNS od dostawcy, zaznacz tę opcję i wprowadź adresy <strong>Preferowanego DNS</strong> oraz Alternatywnego DNS (opcjonalnie) w poniższe pola. W innym wypadku, adresy będą pobierane automatycznie od dostawcy."
                       } ,{                      
                           type: "name",
                           title: "Preferowany DNS",
                           content: "Wprowadź adres IP serwera DNS w notacji dziesiętnej."
                       } ,{                      
                           type: "name",
                           title: "Alternatywny DNS",
                           content: "(Opcjonalnie) Wprowadź drugi adres IP serwera DNS w notacji dziesiętnej."
                       } ,{                      
                           type: "paragraph",
                           content: "Naciśnij przycisk <strong>Zapisz</strong>, aby zapisać ustawienia."
                       }]
},
       DISK_SETTING :{ 
               TITLE:"Ustawienia urządzeń",
               CONTENT: [{
                           type: "paragraph",
                           content: "Na stronie Ustawienia urządzeń wyświetlane są informacje dotyczące każdego z urządzeń pamięci masowej USB, podłączonych do portu USB."
                       } ,{                      
                           type: "name",
                           title: "Skanuj",
                           content: "Zwykle router automatycznie wykrywa nowo podłączone urządzenie. Jeśli tak się jednak nie zdarzy, naciśnij ten przycisk, aby wyszukać wszystkie podłączone urządzenia. Następnie odśwież stronę, aby zaktualizować informacje."
                       } ,{                      
                           type: "name",
                           title: "Wolumin",
                           content: "Wyświetla nazwę woluminu podłączonego urządzenia."
                       } ,{                      
                           type: "name",
                           title: "Pojemność",
                           content: "Wyświetla całkowitą pojemność podłączonego urządzenia."
                       } ,{                      
                           type: "name",
                           title: "Wolne miejsce",
                           content: "Wyświetla ilość wolnego miejsca na podłączonym urządzeniu."
                       } ,{                      
                           type: "name",
                           title: "Bezpieczne usuwanie",
                           content: "Naciśnij ten przycisk, aby odmontować podłączony napęd przed jego fizycznym rozłączeniem."
                       } ,{                      
                           type: "paragraph",
                           content: "Przycisk Usuń jest widoczny tylko kiedy podłączone jest urządzenie USB. Jeżeli aktualny wolumin jest aktywny, nie będziesz mógł usunąć urządzenia."
                       } ,{                      
                           type: "name",
                           title: "Stan",
                           content: "Pojawia się jedynie wtedy, gdy urządzenie pamięci masowej USB podłączone jest do routera. Zaznacz tę opcję, aby włączyć udostępnianie plików urządzenia USB."
                       } ,{                      
                           type: "step",
                           title: "Aby skonfigurować serwer plików",
       content: [ 
                "1. Podłącz urządzenie USB do portu USB za pomocą kabla USB.",
                "2. Router powinien automatycznie wykryć podłączone urządzenie USB oraz wyświetlić informacje na temat nośnika w sekcji Ustawienia Urządzenia. W innym przypadku, naciśnij przycisk Skanuj.",
                "3. Wybierz Aktywny, aby włączyć udostępnianie plików."]
}]
},
       FOLDER_SHARE_ACCOUNT :{ 
               TITLE:"Konta dostępowe",
               CONTENT: [{
                           type: "name",
                           title: "Konto",
                           content: "Aby uzyskać dostęp do udostępnionych plików i folderów, wybierz Użyj domyślnego konta lub wybierz Użyj nowego konta i wprowadź poniższe dane, tworząc nowe konto."
                       } ,{                      
                           type: "name",
                           title: "Nazwa użytkownika/Hasło",
                           content: "Wprowadź nazwę użytkownika, składającą się z 1 - 15 znaków alfanumerycznych lub podkreśleń oraz hasło, składające się z 1 - 15 znaków ASCII. Wielkość liter ma znaczenie."
                       } ,{                      
                           type: "name",
                           title: "Potwierdź hasło",
                           content: "Wpisz ponownie hasło, aby potwierdzić, że jest prawidłowe. Wielkość liter ma znaczenie."
                       } ,{                      
                           type: "paragraph",
                           content: "Naciśnij przycisk Zapisz, aby zapisać ustawienia."
                       }]
},
       FOLDER_SHARE_SETTINGS :{ 
               TITLE:"Ustawienia udostępniania",
               CONTENT: [{
                           type: "name",
                           title: "Nazwa serwera",
                           content: "Wyświetla nazwę podłączonego urządzenia pamięci masowej USB."
                       } ,{                      
                           type: "name",
                           title: "Włącz",
                           content: "Wybierz, aby ustawić metodę dostępu."
                       } ,{                      
                           type: "name",
                           title: "Metoda dostępu",
                           content: "Istnieją trzy metody uzyskiwania dostępu do podłączonego urządzenia USB. Możesz wybrać jedną lub więcej metod dostępu poprzez ich zaznaczenie.",
       children: [{                      
                           type: "name",
                           title: "Otoczenie sieciowe",
                           content: "Jeżeli opcja ta jest włączona, użytkownicy będą mogli dostać się do zasobów USB poprzez przypisany adres IP (np. \\\\192.168.0.1)."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Jeżeli opcja ta jest włączona, użytkownicy będą mogli dostać się do zasobów USB poprzez FTP wpisując przypisany adres IP i numer portu (np. ftp://192.168.0.1:21)."
                       } ,{                      
                           type: "name",
                           title: "FTP (przez Internet)",
                           content: "Włączona funkcja pozwala użytkownikom na zdalny dostęp do nośnika USB za pomocą serwera FTP za pośrednictwem połączenia internetowego. Istnieje możliwość zarówno pobierania, jak i wgrywania plików. Aby zmienić numer portu serwera FTP, wprowadź numer portu i naciśnij przycisk Zapisz, aby wprowadzić zmiany."
                       }]
} ,{                      
                           type: "name",
                           title: "Link",
                           content: "Wyświetla adres, z którego należy skorzystać, aby uzyskać dostęp do urządzenia USB."
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "Wyświetla numer portu serwera FTP. Pozostaw domyślną wartość 21 lub wprowadź wartość pomiędzy 1024 a 65535."
                       } ,{                      
                           type: "paragraph",
                           content: "Naciśnij przycisk Zapisz, aby zapisać ustawienia."
                       }]
},
       FOLDER_SHARE_FOLDERS :{ 
               TITLE:"Udostępnianie folderów",
               CONTENT: [{
                           type: "name",
                           title: "Udostępnij wszystko",
                           content: "Zaznacz Włącz, aby udostępnić wszystkie pliki i foldery, zaznacz Wyłącz aby udostępnić tylko wybrane foldery."
                       } ,{                      
                           type: "name",
                           title: "Wymagaj uwierzytelniania",
                           content: "Zaleca się włączyć uwierzytelnianie, aby od użytkowników wymagane było podanie nazwy użytkownika i hasła przed uzyskaniem dostępu do udostępnionych folderów."
                       } ,{                      
                           type: "name",
                           title: "Nazwa folderu",
                           content: "Wyświetla nazwę udostępnionego folderu."
                       } ,{                      
                           type: "name",
                           title: "Ścieżka dostępu",
                           content: "Wyświetla ścieżkę dostępu do udostępnionego folderu."
                       } ,{                      
                           type: "name",
                           title: "Udostępnianie multimediów",
                           content: "Wyświetla informacje na temat udostępniania plików multimedialnych."
                       } ,{                      
                           type: "name",
                           title: "Nazwa woluminu",
                           content: "Wyświetla nazwę udostępnionego woluminu."
                       } ,{                      
                           type: "name",
                           title: "Stan",
                           content: "Wyświetla stan udostępnionego folderu za pomocą ikony żarówki."
                       } ,{                      
                           type: "name",
                           title: "Zmień",
                           content: "Umożliwia Edycję lub Usunięcie udostępnionego folderu."
                       } ,{                      
                           type: "name",
                           title: "Przeglądaj",
                           content: "Naciśnij, aby wyszukać udostępniony folder."
                       } ,{                      
                           type: "name",
                           title: "Zezwól na dostęp sieci dla gości",
                           content: "Zaznacz tę opcję, aby umożliwić klientom podłączonym do sieci dla gości na dostęp do udostępnionych folderów."
                       } ,{                      
                           type: "name",
                           title: "Wymagaj uwierzytelniania",
                           content: "Zaznacz tę opcję, aby użytkownik przy próbie uzyskania dostępu do zasobów musiał podać odpowiednią nazwę użytkownika oraz hasło."
                       } ,{                      
                           type: "name",
                           title: "Włącz możliwość zapisu",
                           content: "Zaznacz tę opcję, aby umożliwić użytkownikom wprowadzanie zmian w udostępnionych folderach."
                       } ,{                      
                           type: "name",
                           title: "Włącz udostępnianie multimediów",
                           content: "Zaznacz tę opcję, aby włączyć funkcję udostępniania plików multimedialnych."
                       } ,{                      
                           type: "name",
                           title: "Odśwież",
                           content: "Naciśnij ten przycisk, aby odświeżyć listę folderów. "
                       }]
},
       PRINT_SERVER :{ 
               TITLE:"Serwer druku",
               CONTENT: [{
                           type: "name",
                           title: "Serwer druku",
                           content: "Zaznacz Włącz, aby włączyć serwer druku."
                       } ,{                      
                           type: "name",
                           title: "Nazwa drukarki",
                           content: "Wyświetla nazwę drukarki podłączonej do routera. "
                       }]
},
       TIME_MACHINE :{ 
               TITLE:"Time Machine",
               CONTENT: [{
                           type: "paragraph",
                           content: "Time Machine zapisuje kopie zapasowe wszystkich plików z twojego komputera z systemem Mac na dysku USB podłączonym do routera."
                       } ,{                      
                           type: "name",
                           title: "Włącz",
                           content: "Zaznacz, aby włączyć funkcję Time Machine."
                       } ,{                      
                           type: "name",
                           title: "Dysk kopii zapasowej",
                           content: "Wybierz lokalizację kopii zapasowej Time Machine."
                       } ,{                      
                           type: "name",
                           title: "Limit rozmiaru kopii zapasowych",
                           content: "Wybierz ile miejsca na dysku chcesz poświęcić na kopie zapasowe Time Machine. 0 oznacza brak limitu."
                       } ,{                      
                           type: "name",
                           title: "Zapisz",
                           content: "Naciśnij, aby zapisać ustawienia."
                       }]
},
       OFFLINE_DOWNLOAD :{ 
               TITLE:"Pobieranie w trybie offline",
               CONTENT: [{
                           type: "paragraph",
                           content: "Przy włączonym Pobieraniu offline, router może pobierać pliki kiedy komputer jest wyłączony."
                       } ,{                      
                           type: "name",
                           title: "Stan",
                           content: "Zaznacz Włącz, aby włączyć funkcję Pobieranie offline."
                       } ,{                      
                           type: "name",
                           title: "Ścieżka dostępu",
                           content: "Wybierz folder, w którym zapisywane będą pliki. ",
       children: [{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Nie zmieniaj ścieżki dostępu ani nie odłączaj urządzenia USB, gdy pliki są pobierane lub wysyłane; mogą wtedy wystąpić błędy."
                       }]
} ,{                      
                           type: "name",
                           title: "Harmonogram",
                           content: "Zaznacz tę opcję, aby włączyć funkcję Harmonogramym pobierania/wysyłania plików. "
                       } ,{                      
                           type: "name",
                           title: "Wysyłaj po zakończeniu pobierania",
                           content: "Zaznacz tę opcję, aby wysyłać pliki po zakończeniu ich pobierania."
                       } ,{                      
                           type: "name",
                           title: "Maksymalna liczba aktywnych pobierań",
                           content: "Wprowadź wartość pomiędzy 1 a 10, aby wybrać maksymalną ilość plików pobieranych jednocześnie. Domyślna wartość to 5."
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"Pobrane",
               CONTENT: [{
                           type: "note",
                           title: "Plik",
                           content: "Wyświetla nazwę i typ pobieranego pliku."
                       } ,{                      
                           type: "note",
                           title: "Prędkość",
                           content: "Wyświetla aktualną prędkość pobierana (lub wysyłania)."
                       } ,{                      
                           type: "note",
                           title: "Ukończono",
                           content: "Wyświetla postęp pobierania pliku."
                       } ,{                      
                           type: "note",
                           title: "Pozostały czas",
                           content: "Wyświetla pozostały czas pobierania pliku."
                       } ,{                      
                           type: "note",
                           title: "Połączone hosty równorzędne",
                           content: "Wyświetla liczbę połączonych hostów."
                       } ,{                      
                           type: "note",
                           title: "Stan",
                           content: "Wyświetla aktualny stan pobierania (pobieranie, oczekiwanie, wysyłanie, pauza, zakończono lub błąd)."
                       } ,{                      
                           type: "name",
                           title: "Aby pobrać nowy plik",
       children: [{                      
                           type: "step",
       content: [ 
                "1. Naciśnij Dodaj.",
                "2. Wybierz źródło pobierania: torrent z PC, torrent z USB lub URL.",
                "3. Wybierz lokalizację torrenta dla BT lub wprowadź adres URL dla FTP, HTTP i aMule.",
                "4. Naciśnij Zapisz.",
                "5. Aby włączyć aMule, określ adres IP serwera aMule i numer portu w sekcji Zaawansowane > Serwer aMule."]
}]
} ,{                      
                           type: "name",
                           title: "Aby usunąć pobrane pliki",
                           content: "Zaznacz pliki, które chcesz usunąć, a następnie naciśnij przycisk Usuń powyżej tabelki."
                       } ,{                      
                           type: "name",
                           title: "Aby zatrzymać pobieranie",
                           content: "Zaznacz pliki, które chcesz usunąć, a następnie naciśnij przycisk Pauzuj powyżej tabelki."
                       } ,{                      
                           type: "name",
                           title: "Aby wznowić pobieranie",
                           content: "Zaznacz pliki, które chcesz usunąć, a następnie naciśnij przycisk Wznów powyżej tabelki."
                       }]
},
       OFFLINE_DOWNLOAD_ADVANCED :{ 
               TITLE:"Zaawansowane",
               CONTENT: [{
                           type: "name",
                           title: "Limit prędkości",
                           content: "Wprowadź maksymalną prędkość pobierania i wysyłania swojego połączenia z Internetem."
                       } ,{                      
                           type: "name",
                           title: "Maksymalna prędkość pobierania",
                           content: "Wprowadź wartość pomiędzy 1 a 100000 kB/s, aby ustalić maksymalną prędkość pobierania. Domyślna wartość to 1024."
                       } ,{                      
                           type: "name",
                           title: "Maksymalna prędkość wysyłania",
                           content: "Wprowadź wartość pomiędzy 1 a 100000 kB/s, aby ustalić maksymalną prędkość wysyłania. Domyślna wartość to 512."
                       } ,{                      
                           type: "name",
                           title: "Liczba połączeń",
                           content: "Wprowadź maksymalną ilość połączeń."
                       } ,{                      
                           type: "name",
                           title: "Maksymalna globalna liczba połączeń",
                           content: "Wprowadź wartość pomiędzy 1 a 200, aby ustalić maksymalną globalną liczbę połączeń. Domyślna wartość to 100."
                       } ,{                      
                           type: "name",
                           title: "Maksymalna liczba połączonych hostów na torrent",
                           content: "Wprowadź wartość pomiędzy 1 a 100, aby ustalić maksymalną globalną liczbę połączeń na torrent. Domyślna wartość to 50."
                       } ,{                      
                           type: "name",
                           title: "Włącz sieć DHT",
                           content: "Zaznacz tę opcję, aby poprawić prędkość znajdowania hostów. Pomoże to zwiększyć prędkość pobierania."
                       } ,{                      
                           type: "name",
                           title: "Włącz wymianę plików pomiędzy hostami",
                           content: "Włącz tę opcję, aby poprawić komunikację międzu grupami hostów. Pomoże to zwiększyć prędkość pobierania."
                       } ,{                      
                           type: "name",
                           title: "Włącz szyfrowanie protokołu BitTorrent",
                           content: "Włącz tę opcję, aby poprawić bezpieczeństwo i prywatność transmisji."
                       } ,{                      
                           type: "name",
                           title: "Serwer aMule",
                           content: "Wprowadź adres IP i port serwera aMule. Pobieranie aMule działa tylko kiedy router połączony jest z serwerem."
                       }]
},
       PARENTAL_CONTROL :{ 
               TITLE:"Kontrola rodzicielska",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcja Kontroli rodzicielskiej pozwala na zablokowanie stron zawierających nieodpowiednie treści oraz ograniczenie dostępu w określonych godzinach (np. Zablokowanie facebooka na czas odrabiania pracy domowej)."
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"Urządzenia objęte kontrolą rodzicielską",
               CONTENT: [{
                           type: "paragraph",
                           content: "W tabeli wyświetlane są informacje i ustawienia urządzeń ograniczonych przez Kontrolę rodzicielską."
                       } ,{                      
                           type: "step",
                           title: "Aby dodać regułę kontroli dostępu dla nowego urządzenia:",
       content: [ 
                "1. Włącz Kontrolę rodzicielską.",
                "2. Naciśnij Dodaj.",
                "3. Naciśnij Skanuj, aby wybrać urządzenie z listy połączonych urządzeń lub wprowadź Nazwę urządzenia i Adres MAC ręcznie, jeżeli urządzenie nie jest połączone. ",
                "4. Naciśnij ikonę Czas działania, aby wybrać godziny, w których reguła ma być aktywna.",
                "5. Wprowadź krótki opis reguły w polu Opis. Pole Opis jest opcjonalne.",
                "6. Zaznacz Włącz ten wpis.",
                "7. Naciśnij Zapisz."]
} ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Jeżeli chcesz wyłączyć rezerwację, naciśnij na ikonę żarówki."
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"Blokowanie treści",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ograniczenie dostępu pozwala na ograniczenie dostępu do stron w oparciu o słowa kluczowe oraz nazwy domenowe. Urządzenia objęte Kontrolą rodzicielską będą lub nie będą mogły korzystać ze wybranych stron, w zaleźności od ustalonej polityki."
                       } ,{                      
                           type: "step",
                           title: "Aby wybrać dostępną zawartość",
       content: [ 
                "1. Włącz Ograniczenie dostępu.",
                "2. Zaznacz metodę filtrowania w zależności od potrzeb:",
                "A. Jeżeli chcesz, aby urządzenia miały dostęp do wszystkich stron z wyjątkiem wybranych wybierz Czarna lista.",
                "B. Jeżeli chcesz, aby urządzenia miały dostęp tylko do wybranych stron wybierz Biała lista.",
                "3. Naciśnij Dodaj nowe słowo kluczowe, aby dodać nowe słowo kluczowe (np. Wikipedia) lub nazwę domenową do listy.",
                "4. Naciśnij Zapisz."]
}]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcja QoS (Quality of Service) pozwala na ustalenie priorytetów w sieci w zależności od potrzeb. Możesz ustalić poziom priorytetu dla urządzenia, portu lub aplikacji."
                       } ,{                      
                           type: "note",
                           id: "qos-boost",
                           title: "Uwaga",
                           content: "Jeżeli funkcja NAT Boost jest włączona, funkcja QoS nie może być aktywna."
                       } ,{                      
                           type: "name",
                           title: "Prędkość wysyłania",
                           content: "Wprowadź maksymalną prędkość wysyłania dla swojego połączenia."
                       } ,{                      
                           type: "name",
                           title: "Prędkość pobierania",
                           content: "Wprowadź maksymalną prędkość pobierania dla swojego połączenia."
                       }]
},
       QOS_ADV :{ 
               TITLE:"Zaawansowane",
               CONTENT: [{
                           type: "name",
                           title: "Wysoki/Średni/Niski priorytet",
                           content: "Wybierz procent transferu dla ruchu o wysokim/średnim/niskim priorytecie.",
       children: [{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Maksymalna suma priorytetów wynosi 1."
                       }]
}]
},
       QOS_RULE :{ 
               TITLE:"Lista reguł QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tutaj możesz dodać szczegółowe reguły QoS."
                       } ,{                      
                           type: "step",
                           title: "Aby utworzyć regułę QoS",
       content: [ 
                "1. Naciśnij Dodaj.",
                "2. Wybierz typ priorytetu, aby dodać regułę QoS.",
                "Po urządzeniu - Naciśnij Skanuj, aby wybrać połączone urządzenie, lub wprowadź nazwę urządzenia i adres MAC ręcznie.",
                "Po aplikacji - Wybierz aplikację, lub wprowadź nową wpisując jej nazwę, protokół oraz port docelowy (1-65535). Możesz wprowadzić jeden port, wiele portów lub zakres portów, oddzielone przecinkami (np. 21, 36-105, 111).",
                "Po porcie - Wybierz port.",
                "3. Naciśnij Zapisz."]
} ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Możesz przeciągnąć regułę na liście, aby zmienić jej priorytet."
                       }]
},
       QOS_DATABASE :{ 
               TITLE:"Aktualizacja bazy danych",
               CONTENT: [{
                           type: "paragraph",
                           content: "Najnowsza wersja bazy danych dostępna jest na stronie www.tp-link.com. Możesz pobrać i zaktualizować bazę danych aplikacji obsługiwanych przez router."
                       } ,{                      
                           type: "name",
                           title: "Nowa baza danych",
                           content: "Naciśnij Przeglądaj, aby znaleźć plik z najnowszą bazą danych. Wybierz go i naciśnij Aktualizuj, aby zaktualizować bazę danych."
                       }]
},
       SECURITY_FIREWALL :{ 
               TITLE:"Firewall",
               CONTENT: [{
                           type: "name",
                           title: "Firewall SPI",
                           content: "Firewall SPI zapobiega cyberatakom i zatwierdza na podstawie protokołu ruch przechodzący przez router. Domyślnie funkcja ta jest włączona."
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"Ochrona DoS",
               CONTENT: [{
                           type: "name",
                           title: "Ochrona DoS",
                           content: "Ochrona DoS (Denial of Service) chroni sieć LAN przed atakami DoS, które mają na celu zablokowanie sieci dużą ilością żądań. Możesz włączyć ochronę przed trzema rodzajami ataków i wybrać dla każdego z nich jeden z czterech poziomów filtrowania:",
       children: [{                      
                           type: "name",
                           title: "Wyłączone",
                           content: "Brak ochrony."
                       } ,{                      
                           type: "name",
                           title: "Niskie",
                           content: "Niski poziom ochrony i niewielki wpływ na działanie routera."
                       } ,{                      
                           type: "name",
                           title: "Średnie",
                           content: "Średni poziom ochrony i umiarkowany wpływ na działanie routera."
                       } ,{                      
                           type: "name",
                           title: "Wysokie",
                           content: "Wysoki poziom ochrony i znaczny wpływ na działanie urządzenia."
                       }]
} ,{                      
                           type: "name",
                           title: "Filtrowanie ataków ICMP-FLOOD",
                           content: "Zaznacz, aby włączyć ochronę przed atakami ICMP (Internet Control Message Protocol) flood."
                       } ,{                      
                           type: "name",
                           title: "Filtrowanie ataków UDP-FLOOD",
                           content: "Zaznacz, aby włączyć ochronę przed atakami UDP (User Datagram Protocol) flood."
                       } ,{                      
                           type: "name",
                           title: "Filtrowanie ataków TCP-SYN-FLOOD",
                           content: "Zaznacz, aby włączyć ochronę przed atakami TCP-SYN (Transmission Control Protocol-Synchronize) flood."
                       } ,{                      
                           type: "name",
                           title: "Ignoruj pakiety Ping z portu WAN",
                           content: "Włącz, aby ignorować pakiety ping z portu WAN"
                       } ,{                      
                           type: "name",
                           title: "Zablokuj pakiety Ping z portu WAN",
                           content: "Włącz, aby blokować pakiety ping z portu LAN"
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"Lista zablokowanych hostów DoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "W tabeli wyświetlone są adresy IP i MAC zablokowanych hostów. "
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"Kontrola dostępu",
               CONTENT: [{
                           type: "paragraph",
                           content: "Kontrola dostępu pozwala na zablokowanie dostępu lub zezwolenie na dostęp urządzeniom do sieci. Zablokowane urządzenie nie może komunikować się z innymi urządzeniami i łączyć się z Internetem."
                       } ,{                      
                           type: "step",
                           title: "Aby ustawić kontrolę dostępu",
       content: [ 
                "1. Zaznacz Włącz, aby włączyć Kontrolę dostępu. ",
                "2. Jeżeli chcesz kontrolować dostęp urządzeń w sieci dla gości, włącz Kontrola dostępu gości.",
                "3. Wybierz tryb dostępu i naciśnij Zapisz.",
                "A. Jeżeli chcesz, aby tylko wybrane urządzenia nie miały dostępu do sieci wybierz Czarna lista.",
                "B. Jeżeli chcesz, aby tylko wybrane urządzenia miały dostęp do sieci wybierz Biała lista.",
                "4. W sekcji Urządzenia na Czarnej/białej liście, naciśnij Dodaj. Wprowadź Nazwę urządzenia oraz Adres MAC i naciśnij przycisk Zapisz."]
} ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Jeżeli chcesz wyłączyć rezerwację, naciśnij na ikonę żarówki."
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"Aktywne urządzenia",
               CONTENT: [{
                           type: "paragraph",
                           content: "W tabeli wyświetlone są informacie o wszystkich połączonych urządzeniach (również urządzeniach połączonych z siecią dla gości, jeżeli jej kontrola jest aktywna)."
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"Wiązanie adresów IP&MAC",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wiązanie IP&MAC (ARP) pozwala na kontrolę przydziału adresów IP w sieci. Jeżeli adresy MAC i IP zostaną powiązane, urządzenia o innych adresie MAC nie będą mogły korzystać z adresu IP przypisanego do danego adresu MAC."
                       } ,{                      
                           type: "step",
                           title: "Aby dodać powiązanie IP i MAC",
       content: [ 
                "1. Naciśnij Dodaj.",
                "2. Wprowadź Adres MAC urządzenia.",
                "3. Wprowadź adres IP, który chcesz przypisać danemu adresowi MAC.",
                "4. Wybierz Włącz.",
                "5. Naciśnij przycisk Zapisz."]
} ,{                      
                           type: "note",
                           title: "Uwaga",
       content: [ 
                "1. Nie możesz wiązać tego samego adresu IP z więcej niż jednym adresem MAC.",
                "2. Jeżeli chcesz wyłączyć rezerwację, naciśnij na ikonę żarówki."]
}]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"Lista ARP",
               CONTENT: [{
                           type: "paragraph",
                           content: "W tej tabeli wyświetlone są adresy MAC i adresy IP połączonych urządzeń."
                       }]
},
       IPV6 :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "name",
                           title: "IPv6",
                           content: "IPv6 (Internet Protocol version 6) to najnowsza wersja protokołu IP. Ma ona za zadanie rozwiązanie problemu z kończącą się pulą adresów IPv4."
                       } ,{                      
                           type: "title",
                            title: "Typ połączenia: Dynamiczne IP"
                       } ,{                      
                           type: "name",
                           title: "Dynamiczne IP",
                           content: "Wybierz ten typ, jeżeli twój dostawca korzysta z dynamicznego przydziału adresów IPv6."
                       } ,{                      
                           type: "name",
                           title: "Adres IPv6/Preferowany DNS/Alternatywny DNS",
                           content: "Te parametry są pobierane automatycznie z serwera DHCPv6 dostawcy."
                       } ,{                      
                           type: "name",
                           title: "Odnów",
                           content: "Naciśnij, aby pobrać nowe parametry IPv6."
                       } ,{                      
                           type: "name",
                           title: "Zwolnij",
                           content: "Naciśnij, aby zwolnić pobrany adres IPv6."
                       } ,{                      
                           type: "name",
                           title: "Pobierz adres IPv6",
                           content: "Zaznacz DHCPv6, aby pobrać stały adres IPv6 lub SLAAC, aby pobrać adres IPv6 wygenerowany przez router, zgodnie z ustawieniami dostawcy."
                       } ,{                      
                           type: "name",
                           title: "Prefiks",
                           content: "Zaznacz Włącz, aby pobrać prefiks z serwera DHCPv6 dostawcy, lub Wyłącz, aby wprowadzić prefiks ręcznie. Urządzenia w sieci LAN będą miały adres IPv6 z tym prefiksem."
                       } ,{                      
                           type: "name",
                           title: "Adresy DNS",
                           content: "Zaznacz Pobierz automatycznie od dostawcy lub Użyj następującego serwera DNS. Jeżeli wybrałeś drugą opcję, wprowadź adresy serwerów DNS otrzymane od dostawcy ręcznie."
                       } ,{                      
                           type: "title",
                            title: "Typ połączenia: Statyczne IP"
                       } ,{                      
                           type: "name",
                           title: "Statyczne IP",
                           content: "Zaznacz ten typ, jeżeli dostawca korzysta ze statycznego przydziału adresów IPv6."
                       } ,{                      
                           type: "name",
                           title: "Adres IPv6/Brama domyślna/Preferowany DNS/Alternatywny DNS",
                           content: "Uzupełnij parametry zgodnie z informacjami uzyskanymi od dostawcy usług internetowych."
                       } ,{                      
                           type: "name",
                           title: "Wielkość MTU",
                           content: "Typową wielkością MTU (Maksymalna jednostka transmisji) dla większości sieci Ethernet jest 1500 bajtów. Wielkość MTU nie powinna być zmieniana, o ile dostawca usług internetowych nie zaleci inaczej."
                       } ,{                      
                           type: "title",
                            title: "Typ połączenia: Tunel 6do4"
                       } ,{                      
                           type: "name",
                           title: "Tunel 6do4",
                           content: "Zaznacz ten typ, jeżeli dostawca korzysta z tunelu 6do4 do przydziału adresów."
                       } ,{                      
                           type: "name",
                           title: "Adres IPv4/Maska podsieci IPv4/Brama domyślna IPv4/Adres tunelu",
                           content: "Po naciśnięciu Połącz, parametry te zostaną automatycznie wygenerowane, zgodnie z danymi IPv4 portu WAN."
                       } ,{                      
                           type: "name",
                           title: "Użyj następującego serwera DNS",
                           content: "Zaznacz, aby ręcznie wprowadzić adresy serwerów DNS."
                       } ,{                      
                           type: "name",
                           title: "Połącz",
                           content: "Naciśnij, aby połączyć się z Internetem. "
                       } ,{                      
                           type: "name",
                           title: "Rozłącz",
                           content: "Naciśnij, aby rozłączyć połączenie z Internetem."
                       } ,{                      
                           type: "title",
                            title: "Typ połączenia: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE",
                           content: "Zaznacz ten typ, jeżeli dostawca korzysta z PPPoEv6 i otrzymałeś od niego nazwę użytkownika i hasło."
                       } ,{                      
                           type: "name",
                           title: "Nazwa użytkownika/Hasło",
                           content: "Uzupełnij parametry zgodnie z informacjami uzyskanymi od dostawcy usług internetowych."
                       } ,{                      
                           type: "name",
                           title: "Adres IPv6",
                           content: "Ten adres zostanie przydzielony automatycznie przez serwer DHCPv6 dostawcy, kiedy wprowadzisz nazwę użytkownika oraz hasło i naciśniesz przycisk Połącz."
                       } ,{                      
                           type: "name",
                           title: "Pobierz adres IPv6",
                           content: "Zaznacz DHCPv6, aby pobrać stały adres IPv6 lub SLAAC, aby pobrać adres IPv6 wygenerowany przez router lub Podany przez dostawcę, aby ręcznie wprowadzić adres IPv6."
                       } ,{                      
                           type: "name",
                           title: "Prefiks",
                           content: "Zaznacz Włącz, aby pobrać prefiks z serwera DHCPv6 dostawcy, lub Wyłącz, aby wprowadzić prefiks ręcznie. Urządzenia w sieci LAN będą miały adres IPv6 z tym prefiksem."
                       } ,{                      
                           type: "name",
                           title: "Adresy DNS",
                           content: "Zaznacz Pobierz automatycznie od dostawcy lub Użyj następującego serwera DNS. Jeżeli wybrałeś drugą opcję, wprowadź adresy serwerów DNS otrzymane od dostawcy ręcznie."
                       } ,{                      
                           type: "name",
                           title: "Połącz",
                           content: "Naciśnij, aby połączyć się z Internetem. "
                       } ,{                      
                           type: "name",
                           title: "Rozłącz",
                           content: "Naciśnij, aby rozłączyć połączenie z Internetem."
                       } ,{                      
                           type: "title",
                            title: "Typ połączenia z Internetem: Pass-Through (Bridge)"
                       } ,{                      
                           type: "paragraph",
                           content: "Zaznacz, jeżeli typ dodatkowego połączenia oferowanego przez dostawcę to Bridge. Dodatkowa konfiguracja nie jest wymagana."
                       }]
},
       IPV6_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wszystkie typy połączenia poza Bridge wymagają konfiguracji IPv6."
                       } ,{                      
                           type: "name",
                           title: "Sposób przydziału",
                           content: "Zaznacz odpowiednią opcję, w zależności od dostawcy.",
       children: [{                      
                           type: "name",
                           title: "DHCPv6",
                           content: "Automatycznie przydziela adresy IP urządzeniom klienckim w sieci LAN.",
       children: [{                      
                           type: "name",
                           title: "Prefiks adresu",
                           content: "Wprowadź prefiks adresu otrzymany od dostawcy."
                       } ,{                      
                           type: "name",
                           title: "Czas przydzielenia",
                           content: "Czas na jaki przydzielony został adres IP. Pozostaw wartość domyślną lub zmień ją, jeżeli wymaga tego dostawca."
                       } ,{                      
                           type: "name",
                           title: "Adres",
                           content: "Adres IP przydzielony automatycznie przez serwer DHCP dostawcy."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "Bezstanowe DHCP SLAAC+",
       children: [{                      
                           type: "name",
                           title: "Prefiks adresu",
                           content: "Wprowadź prefiks adresu otrzymany od dostawcy."
                       } ,{                      
                           type: "name",
                           title: "Adres",
                           content: "Adres IP przydzielony automatycznie przez dostawcę."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+RDNSS",
       children: [{                      
                           type: "name",
                           title: "Prefiks adresu",
                           content: "Wprowadź prefiks adresu otrzymany od dostawcy."
                       } ,{                      
                           type: "name",
                           title: "Adres",
                           content: "Adres IP przydzielony automatycznie przez dostawcę."
                       }]
}]
}]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"Klonowanie MAC",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wybierz metodę klonowania adresu MAC w zależności od potrzeb."
                       } ,{                      
                           type: "name",
                           title: "NIE klonuj adresu MAC",
                           content: "W przypadku, gdy dostawca usług internetowych nie wiąże przypisanego adresu IP z adresem MAC komputera, NIE zmieniaj domyślnego adresu MAC routera."
                       } ,{                      
                           type: "name",
                           title: "Klonuj adres MAC",
                           content: "W przypadku, gdy dostawca usług internetowych wiąże przypisany adres IP z adresem MAC komputera, skopiuj aktualny adres MAC komputera podłączonego do routera."
                       } ,{                      
                           type: "name",
                           title: "Użyj innego adresu MAC",
                           content: "W przypadku, gdy dostawca usług internetowych wiąże przypisany adres IP z określonym adresem MAC, wpisz adres MAC ręcznie."
                       }]
},
       TIME_SETTING :{ 
               TITLE:"Ustawienia czasu",
               CONTENT: [{
                           type: "paragraph",
                           content: "Na tej stronie możesz skonfigurować ustawienia czasu routera. Po zmianie ustawień, nowy czas systemowy będzie obowiązującym czasem dla funkcji takich jak np. Kontrola rodzicielska."
                       } ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Możesz włączyć 24-godzinny format czasu przed konfiguracją."
                       } ,{                      
                           type: "title",
                            title: "Czas systemowy"
                       } ,{                      
                           type: "step",
                           title: "Aby pobrać czas z Internetu",
       content: [ 
                "Domyślna opcja to pobieranie czasu z Internetu.",
                "1. Zaznacz Pobierz z Internetu.",
                "2. Wybierz swoją Strefę czasową z rozwijanej listy.",
                "3. W polu Serwer NTP I, wprowadź adres IP lub nazwę domenową serwera czasu, z którego chcesz korzystać. ",
                "4. W polu Serwer NTP II, wprowadź odpowiedni adres IP lub domenę innego Serwera NTP. (Opcjonalnie)",
                "5. Naciśnij Pobierz.",
                "6. Naciśnij Zapisz."]
} ,{                      
                           type: "step",
                           title: "Aby pobrać czas z komputera",
       content: [ 
                "Ta funkcja pozwala na pobieranie czasu z komputera. Upewnij się, że czas komputera skonfigurowany jest prawidłowo przed skorzystaniem z tej funkcji.",
                "Zaznacz Pobierz z komputera i naciśnij Zapisz."]
} ,{                      
                           type: "step",
                           title: "Aby ustawić czas ręcznie",
       content: [ 
                "Jeżeli urządzenie nie jest w stanie pobrać czasu z Internetu lub komputera, możesz skonfigurować czas ręcznie.",
                "1. Zaznacz Ręcznie.",
                "2. Wprowadź aktualną Datę i Czas.",
                "3. Naciśnij Zapisz."]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Zmiana czasu",
                           content: "Ta funkcja pozwala na automatyczną zmianę czasu na letni."
                       } ,{                      
                           type: "step",
                           title: "Aby ustalić Zmianę czasu",
       content: [ 
                "1. Wybierz Włącz zmianę czasu.",
                "2. Wybierz okres, w którym czas letni jest używany w twojej strefie czasowej.",
                "3. Naciśnij Zapisz."]
}]
},
       DIGNOSTIC :{ 
               TITLE:"Diagnostyka",
               CONTENT: [{
                           type: "paragraph",
                           content: "Router posiada narzędzia diagnostyczne Ping oraz Traceroute, które mogą pomóc w identyfikacji problemów z siecią. "
                       } ,{                      
                           type: "title",
                            title: "Ping i Traceroute"
                       } ,{                      
                           type: "paragraph",
                           content: "Narzędzie Ping wysyła pakiety do wybranego adresu IP lub nazwy domenowej i zapisuje wyniki, takie jak ilość wysłanych i odebranych pakietów oraz czas powrotu."
                       } ,{                      
                           type: "paragraph",
                           content: "Narzędzie Traceroute wysyła pakiety do wybranego adresy IP lub nazwy domenowej i wyświetla ilość skoków oraz czas przesyłu danych."
                       } ,{                      
                           type: "paragraph",
                           content: "Możesz użyć narzędzi Ping oraz Traceroute również w sieci lokalnej oraz za pomocą nazwy domenowej, np. tp-link.com."
                       } ,{                      
                           type: "step",
                           title: "Aby zdiagnozować za pomocą Ping",
       content: [ 
                "1. Zaznacz Ping jako narzędzie diagnostyczne.",
                "2. Wprowadź docelowy adres IP lub nazwę domenową.",
                "3. Rozwiń ustawienia zaawansowane i wprowadź Ilość pakietów oraz Rozmiar pakietów. (Opcjonalnie)",
                "4. Naciśnij Start."]
} ,{                      
                           type: "step",
                           title: "Aby zdiagnozować za pomocą Traceroute",
       content: [ 
                "1. Zaznacz Traceroute jako narzędzie diagnostyczne.",
                "2. Wprowadź docelowy adres IP lub nazwę domenową.",
                "3. Rozwiń ustawienia zaawansowane i wprowadź Ilość skoków oraz Maksymalny czas życia kapietów. Domyślna wartość to 20. (Opcjonalnie)",
                "4. Naciśnij Start."]
}]
},
       PORT_MIRROR :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                            title: "Port Mirroring"
                       } ,{                      
                           type: "paragraph",
                           content: "Funkcja Port Mirroring pozwala na wysyłanie kopii pakietów z jednego portu na inny. Na ogół port odbierający jest podłączony do urządzenia monitorującego i analizującego sieć."
                       } ,{                      
                           type: "step",
                           title: "Aby przesłać kopie pakietów do wybranego portu",
       content: [ 
                "1. Włącz Port Mirroring.",
                "2. Wybierz port, z którego pakiety mają być kopiowane.",
                "3. Wybierz port odbierający pakiety.",
                "4. Naciśnij Zapisz."]
} ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Port nie może odbierać swoich powielonych pakietów."
                       }]
},
       FIRMWARE :{ 
               TITLE:"Aktualizacja firmware",
               CONTENT: [{
                           type: "paragraph",
                           content: "Aktualizacja firmware pozwala na dodanie nowych funkcji i naprawę błędów w oprogramowaniu routera. Zalecamy aktualizację oprogramowania do najnowszej wersji."
                       } ,{                      
                           type: "step",
                           title: "Zastosuj się do poniższych punktów, aby uniknąć problemów z aktualizacją:",
       content: [ 
                "Przed aktualizacją",
                "1. Upewnij się, że połączenie routera z komputerem jest stabilne. NIE zalecamy przeprowadzania aktualizacji przez połączenie bezprzewodowe.",
                "2. Upewnij się, że wszystkie urządzenia USB są odłączone od routera.",
                "3. Pamiętaj, aby zapisać konfigurację routera.",
                "Podczas aktualizacji",
                "NIE odłączaj routera od zasilania."]
}]
},
       FIRMWARE_UPGRADE_ONLINE :{ 
               TITLE:"Aby zaktualizować firmware online",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Naciśnij Aktualizuj, a następnie potwierdź, gdy zostaniesz o to poproszony. Router automatycznie pobierze najnowszy firmware i przeprowadzi aktualizację. Możesz także sprawdzić czy nowsza wersja firmware'u jest już dostępna, naciskając Sprawdź dostępne aktualizacje."]
}]
},
       FIRMWARE_UPGRADE :{ 
               TITLE:"Aby zaktualizować firmware ręcznie",
               CONTENT: [{
                           type: "step",
       content: [ 
                "1. Naciśnij Wsparcie na dole strony, aby pobrać najnowszą wersję firmware dla routera. Upewnij się, że firmware który pobierasz, jest odpowiedni dla twojej wersji sprzętowej routera.",
                "2. Naciśnij przycisk Przeglądaj i wskaż pobrany plik.",
                "3. Naciśnij przycisk Aktualizuj."]
} ,{                      
                           type: "paragraph",
       content: [ 
                "Aktualizacja firmware'u trwa kilka minut. Router automatycznie uruchomi się ponownie po zakończeniu procesu aktualizacji. "]
}]
},
       BACKUP :{ 
               TITLE:"Zapis i odczyt ustawień",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcja Zapisu i Odczytu pozwala na zapis i odczyt ustawień routera do pliku oraz reset ustawień routera do wartości fabrycznych. "
                       } ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "NIE wyłączaj routera podczas przeprowadzania tej operacji."
                       } ,{                      
                           type: "title",
                           title: "Zapisz ustawienia",
                           content: "Zalecamy zapisanie aktualnej konfiguracji routera. Umożliwi to szybkie przywrócenie ustawień w przypadku awarii routera."
                       } ,{                      
                           type: "step",
                           title: "Aby zapisać aktualną konfigurację",
       content: [ 
                "1. Naciśnij Zapisz.",
                "2. Zaczekaj aż router zapisze aktualną konfigurację."]
}]
},
       RESTORE :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Przywróć ustawienia",
                           content: "Możesz przywrócić ustawienia zapisane wcześniej do pliku."
                       } ,{                      
                           type: "step",
                           title: "Aby przywrócić zapisane ustawienia",
       content: [ 
                "1. Naciśnij Przeglądaj.",
                "2. Znajdź i wybierz zapisany plik.",
                "3. Naciśnij Przywróć."]
}]
},
       FACTORY :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Przywróć ustawienia fabryczne",
       content: [ 
                "Przywrócenie ustawień fabrycznych routera spowoduje przywrócenie domyślnej konfiguracji. Wszystkie wprowadzone zmiany zostaną usunięte.",
                "Po przywróceniu ustawień fabrycznych, będziesz musiał skonfigurować nowe hasło do strony zarządzania routerem."]
}]
},
       REBOOT :{ 
               TITLE:"Harmonogram resetowania",
               CONTENT: [{
                           type: "paragraph",
                           content: "Restart routera pozwala na wyczyszczenie pamięci urządzenia, co zwiększa stabilność jego pracy. Możesz zrestartować router ręcznie lub skonfigurować Harmonogram resetowania."
                       } ,{                      
                           type: "step",
                           title: "Aby zresetować ręcznie",
       content: [ 
                "Naciśnij Restartuj i odczekaj kilka minut na ponowne uruchomienie się urządzenia."]
} ,{                      
                           type: "step",
                           title: "Aby skonfigurować Harmonogram resetowania",
       content: [ 
                "1. Włącz Harmonogram resetowania.",
                "2. Ustal jak często router ma się restartować, wypełniając pola Czas restartu oraz Powtarzanie.",
                "3. Naciśnij Zapisz."]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"Administracja",
               CONTENT: [{
                           type: "paragraph",
                           content: "Administracja pozwala na zarządzanie hasłem logowania oraz uprawnieniami dostępu klientów połączonych z routerem."
                       } ,{                      
                           type: "name",
                           title: "Zarządzanie kontami",
                           content: "Tutaj możesz zmienić hasło.",
       children: [{                      
                           type: "step",
                           title: "Aby zmienić hasło",
       content: [ 
                "1. Wprowadź aktualne hasło.",
                "2. Wprowadź nowe hasło.",
                "3. Potwierdź nowe hasło.",
                "4. Naciśnij Zapisz."]
}]
}]
},
       ADMIN_RECOVERY :{ 
               TITLE:"Odzyskiwanie hasła",
               CONTENT: [{
                           type: "name",
                           title: "Odzyskiwanie hasła domyślnego",
                           content: "Odzyskiwanie hasła domyślnego pozwala na przywrócenie domyślnego hasła bez przywracania ustawień fabrycznych routera.",
       children: [{                      
                           type: "step",
                           title: "Aby zmienić hasło",
       content: [ 
                "1. Włącz funkcję Przywracania hasła domyślnego.",
                "2. W polu Od wprowadź adres e-mail, z którego wysłyany będzie kod weryfikacyjny, służący odzyskiwaniu danych logowania.",
                "3. W polu Do wprowadź adres e-mail, na który przesyłany będzie kod weryfikacyjny. ",
                "4. Wprowadź serwer SMTP poczty wychodzącej (Od).",
                "5. Jeżeli adres e-mail wprowadzony w polu Od wymaga szyfrowania, zaznacz Włącz uwierzytelnianie i wpisz nazwę użytkownika (adres e-mail) oraz hasło.",
                "6. Naciśnij Zapisz."]
}]
}]
},
       ADMIN_LOCAL :{ 
               TITLE:"Zarządzanie lokalne",
               CONTENT: [{
                           type: "paragraph",
                           content: "Włączona funkcja umożliwia zarządzanie routerem poprzez urządzenia lokalne."
                       } ,{                      
                           type: "name",
                           id: "local_management_https",
                           title: "Zarządzanie lokalne poprzez HTTPS",
                           content: "Włącz funkcję zarządzania zdalnego poprzez HTTPS, jeśli chcesz mieć dostęp do routera zarówno poprzez HTTPS, jak i HTTP lub pozostaw ją wyłączoną, jeśli wystarczy ci dostęp do routera poprzez HTTP."
                       } ,{                      
                           type: "name",
                           title: "Dostęp dla wszystkich urządzeń podłączonych do sieci LAN",
                           content: "Wybierz \"Włącz\", aby umożliwić zarządzanie routerem wszystkim urządzeniom w sieci LAN lub \"Wyłącz\", aby umożliwić zarządzanie tylko wybranym urządzeniom."
                       } ,{                      
                           type: "name",
                           title: "Adres MAC",
                           content: "Wyświetla adres MAC urządzenia o ograniczonym dostępie."
                       } ,{                      
                           type: "name",
                           title: "Opis",
                           content: "Wyświetla informacje na temat urządzenia o ograniczonym dostępie."
                       } ,{                      
                           type: "name",
                           title: "Stan",
                           content: "Wyświetla aktualny stan urządzenia o ograniczonym dostępie (włączone lub wyłączone)."
                       } ,{                      
                           type: "name",
                           title: "Zmień",
                           content: "Pozwala na Zmianę ustawień lub Usunięcie urządzenia z listy."
                       } ,{                      
                           type: "step",
                           title: "Aby dodać urządzenie klienckie do listy",
       content: [ 
                "1. Naciśnij Dodaj.",
                "2. Naciśnij Wyświetl urządzenia, aby wybrać urządzenie lub wprowadzić adres MAC urządzenia w pole Adres MAC.",
                "3. Wprowadź Opis urządzenia.",
                "4. Wybierz Włącz.",
                "5. Naciśnij przycisk OK."]
} ,{                      
                           type: "step",
                           title: "Aby edytować lub usunąć urządzenie z listy",
                           content: "Naciśnij ikonę Edytuj lub Usuń w tabeli, aby zmienić lub skasować odpowiedni wpis. "
                       } ,{                      
                           type: "step",
                           title: "Aby usunąć jednocześnie kilka urządzeń",
                           content: "Zaznacz wszystkie urządzenia, które chcesz usunąć, a następnie naciśnij Usuń"
                       }]
},
       ADMIN_REMOTE_WITHOUT_HTTPS :{ 
               TITLE:"Zarządzanie zdalne",
               CONTENT: [{
                           type: "name",
                           title: "Zarządzanie zdalne",
                           content: "Funkcja Zarządzania zdalnego pozwala na zarządzanie routerem, gdy znajdujesz się poza siecią LAN.",
       children: [{                      
                           type: "step",
                           title: "Aby zabronić wszystkim zdalnym urządzeniom na zarządzanie routerem",
                           content: "Zaznacz Wyłącz zdalne zarządzanie i naciśnij Zapisz."
                       } ,{                      
                           type: "step",
                           title: "Aby pozwolić wszystkim zdalnym urządzeniom na zarządzanie routerem",
       content: [ 
                "1. Wybierz Włącz zarządzanie zdalne dla WSZYSTKICH urządzeń.",
                "2. Wprowadź numer portu zarządzania siecią (1024-65535 lub 80), za pomocą którego urządzenia uzyskają zdalny dostęp do routera.",
                "3. Naciśnij Zapisz."]
} ,{                      
                           type: "step",
                           title: "Aby pozwolić wybranym zdalnym urządzeniom na zarządzanie routerem",
       content: [ 
                "1. Wybierz Włącz zarządzanie zdalne tylko dla określonego urządzenia.",
                "2. Wprowadź numer portu zarządzania siecią (1024-65535 lub 80), za pomocą którego urządzenie uzyska zdalny dostęp do routera.",
                "3. Wprowadź adres IP zarządzania zdalnego, aby umożliwić urządzeniu zdalne zarządzanie routerem.",
                "4. Naciśnij Zapisz."]
}]
}]
},
       ADMIN_REMOTE :{ 
               TITLE:"Zarządzanie zdalne",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcja zarządzania zdalnego umożliwia zdalny dostęp i zarządzanie routerem z Internetu."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step_title",
                           content: "Konfiguracja funkcji zarządzania zdalnego"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step1",
                           content: "1. Zaznacz pole wyboru, aby właczyć funkcję zarządzania zdalnego."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step2",
                           content: "2. Pozostaw ustawienia domyślne dla portu HTTPS i portu HTTP."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step3",
                           content: "3. Zdecyduj, które urządzenia mogą uzyskać zdalny dostęp do routera:",
       children: [{                      
                           type: "name",
                           title: "Wszystkie urządzenia",
                           content: "Wszystkie urządzenia zdalne będą mieć do routera."
                       } ,{                      
                           type: "name",
                           title: "Wybrane urządzenie",
                           content: "Wprowadź adres IP urządzenia zdalnego, który będzie mógł uzyskać dostęp do routera."
                       }]
} ,{                      
                           type: "paragraph",
                           id: "admin_remote_step4",
                           content: "4. Naciśnij Zapisz."
                       } ,{                      
                           type: "paragraph",
                           content: "Możesz już zarządzać zdalnie routerem pod adresem widocznym w polu Adres witryny do zarządzania."
                       } ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Jeżeli przy próbie uzyskania dostępu do powyższej witryny pojawi się ostrzeżenie, kliknij Zaufaj (lub podobną opcję), aby kontynuować."
                       }]
},
       LED_CONTROL_SETTINGS :{ 
               TITLE:"Diody",
               CONTENT: [{
                           type: "paragraph",
                           content: "Po włączeniu Trybu nocnego, diody będą codziennie wyłączane o wybranych porach. Nie ma to wpływu na działanie routera."
                       } ,{                      
                           type: "step",
                           title: "Aby włączyć Tryb nocny",
       content: [ 
                "1. Zaznacz Włącz tryb nocny.",
                "2. Wybierz okres czasu, w którym diody mają być wyłączone.",
                "3. Naciśnij Zapisz."]
}]
},
       SYSTEM_LOG :{ 
               TITLE:"Dziennik systemowy",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dziennik systemowy wyświetla operacje przeprowadzane przez router. W tabeli znajduje się typ, poziom i zawartość zdarzeń, można je filtrować w oparciu o kategorie. Możesz również zapisać dziennik na komputerze lub wysłać go e-mailem. "
                       } ,{                      
                           type: "step",
                           title: "Aby zapisać dziennik na komputerze lokalnie",
       content: [ 
                "1. Ustaw Typ i minimalny poziom zdarzeń, które chcesz wyświetlić. Lista poziomów jest w porządku malejącym, najniższy poziom jest ostatni na liście.",
                "2. Naciśnij Zapisz dziennik, aby zapisać dziennik na komputerze."]
} ,{                      
                           type: "step",
                           title: "Aby wysyłac dziennik przez e-mail",
       content: [ 
                "1. Ustaw Typ i poziom zdarzeń, które chcesz wyświetlić. Lista poziomów jest w porządku malejącym, najniższy poziom jest ostatni na liście.",
                "2. Naciśnij Ustawienia e-mail. ",
                "3. W polu Od, wprowadź adres e-mail, z którego dziennik będzie wysyłany.",
                "4. W polu Do, wprowadź adres e-mail, na który dziennik będzie wysyłany.",
                "5. Wprowadź adres serwera SMTP poczty wychodzącej.",
                "Uwaga: Jeżeli poczta wychodząca wymaga uwierzytelnienia, zaznacz opcję Włącz uwierzytelnianie i wprowadź adres e-mail i hasło do konta.",
                "6. Jeżeli chcesz otrzymywać dziennik na e-mail reguralnie, zaznacz opcję Włącz automatyczne wysyłanie i wybierz konkretną godzinę (w formacie 24-godzinnym), lub czas co jaki dziennik ma być wysyłany.",
                "Jeżeli chcesz wysłać dziennik od razu, naciśnij Wyślij dziennik teraz.",
                "7. Naciśnij Zapisz."]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"Monitorowanie ruchu",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla ostatnie 10 minut ruchu urządzenia w sieci lub ostatnie 10 minut/24 godziny/7dni ruchu wszystkich urządzeń."
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"Lista monitorowania ruchu",
               CONTENT: [{
                           type: "paragraph",
                           content: "Lista jest pogrupowana zgodnie z typem urządzeń: przewodowe lub bezprzewodowe."
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"Parametry systemowe",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wifi_title",
                           title: "Sieć bezprzewodowa 2,4GHz/5GHz",
                           content: "Na tej stronie mozesz skonfigurować parametry sieci bezprzewodowej. Jeżeli nie jesteś pewien jakie mogą być skutki zmiany ustawień, zalecamy pozostawienie ustawień domyślnych."
                       } ,{                      
                           type: "name",
                           title: "Interwał pakietów Beacon",
                           content: "Wprowadź wartość z przedziału 40-1000 w milisekundach, aby określić odstęp czasowy pomiędzy poszczególnymi pakietami Beacon, które są transmitowane przez router, w celu synchronizacji sieci bezprzewodowej. Wartością domyślną jest 100 milisekund."
                       } ,{                      
                           type: "name",
                           title: "Próg RTS",
                           content: "Wprowadź wartość z przedziału 1-2346, aby określić dopuszczalny rozmiar pakietu transmisji danych przez router. Domyślną wielkością dla progu RTS jest 2346. Jeśli rozmiar pakietu jest większy od ustawionego progu, router wysyła żądanie wysłania ramek do określonego urządzenia lub negocjuje wysłanie ramki danych, aby odpowiednie pakiety były natychmiast wysłane."
                       } ,{                      
                           type: "name",
                           title: "Interwał DTIM",
                           content: "Interwał pakietów DTIM (Delivery Traffic Indication Message). Wprowadź wartość pomiędzy 1 a 15. Domyślna wartość to 1, co oznacza interwał pakietów DTIM taki sam jak pakietów Beacon."
                       } ,{                      
                           type: "name",
                           title: "Częstotliwość aktualizacji klucza grupowego",
                           content: "Wprowadź liczbę w sekundach (minimum 30), aby określić interwał pomiędzy automatycznymi aktualizacjami klucza szyfrowania. Wartością domyślną jest 0, oznaczającą, że klucz nie jest aktualizowany."
                       } ,{                      
                           type: "name",
                           title: "WMM",
                           content: "Funkcja WMM zapewnia zwiększoną wydajność wysyłania pakietów o wysokim priorytecie. Zalecane jest pozostawienie tej opcji włączonej."
                       } ,{                      
                           type: "name",
                           title: "Krótki GI",
                           content: "Funkcja ta domyślnie jest włączona, zalecamy pozostawienie jej włączonej."
                       } ,{                      
                           type: "name",
                           title: "Izolacja AP",
                           content: "Jeżeli chcesz zablokować komunikację urządzeń połączonych do sieci między sobą, ale pozostawić im dostęp do Internetu, zaznacz tę opcję. "
                       }]
},
       SYSTEM_PARA_WDS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wds_title",
                            title: "WDS 2,4GHz/5GHz"
                       } ,{                      
                           type: "step",
                           title: "Aby włączyć WDS",
                           content: "Funkcja WDS(Wireless Distribution System) pozwala na rozszerzenie sieci bezprzewodowej poprzez podłączenie punktu dostępowego do sieci bezprzewodowej. "
                       } ,{                      
                           type: "step",
       content: [ 
                "1. Zaznacz, aby włączyć funkcję WDS.",
                "2. Przy użyciu opcji Skanowania: naciśnij przycisk Skanuj, aby wyświetlić dostępne sieci brzprzewodowe i wybierz sieć, z którą chcesz się połączyć. Parametry sieci zostaną wprowadzone automatycznie.",
                "Ręcznie: Wprowadź nazwę sieci (SSID), adres MAC oraz tryb WDS sieci, z którą chcesz się połączyć. Wybierz typ zabezpieczeń i wprowadź hasło do sieci. Powinno być ono takie samo jak dla sieci, z którą się łączysz.",
                "3. Naciśnij Zapisz."]
} ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Jeżeli nie jesteś pewien trybu WDS, pozostaw opcję domyślną lub wybierz tryb automatyczny."
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "WPS",
                           content: "Funkcja WPS (Wi-Fi Protected Setup) pozwala na szybkie połaczenie z siecią bezprzewodową za pomocą przycisku WPS. Zaznacz tę opcję i naciśnij przycisk Zapisz."
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "NAT",
                           content: "Ta funkcja jest domyślnie włączona. Zalecamy pozostawienie ustawień domyślnych. Jeżeli wyłączysz tę funkcję, możesz utracić dostęp do Internetu."
                       } ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Jeżeli funkcja NAT jest wyłączona, skonfigurowane przekierowania nie będą aktywne."
                       } ,{                      
                           type: "name",
                           id: "sys_para_nat_boost",
                           title: "NAT Boost",
                           content: "Zaznacz opcję Włącz NAT Boost i naciśnij Zapisz, aby uzyskać najwyższą przepustowość."
                       } ,{                      
                           type: "note",
                           id: "sys_para_nat_boost_note",
                           title: "Uwaga",
                           content: "Uruchomiona funkcja NAT Boost powoduje automatycznie wyłączenie funkcji QoS i Statystyk ruchu."
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Ustawienia Ochrony DOS",
                           content: "Ochrona DOS chroni router przed atakami ICMP-FLOOD, UDP-FLOOD oraz TCP-FLOOD."
                       } ,{                      
                           type: "name",
                           title: "Poziom pakietów ICMP-FLOOD",
                           content: "Wprowadź wartość pomiędzy 5 a 7200. Ochrona ICMP-FLOOD zacznie działać, kiedy ilość pakietów ICMP przekroczy wybraną ilość."
                       } ,{                      
                           type: "name",
                           title: "Poziom pakietów UDP-FLOOD",
                           content: "Wprowadź wartość pomiędzy 5 a 7200. Ochrona UDP-FLOOD zacznie działać, kiedy ilość pakietów UDP przekroczy wybraną ilość."
                       } ,{                      
                           type: "name",
                           title: "Poziom pakietów TCP-FLOOD",
                           content: "Wprowadź wartość pomiędzy 5 a 7200. Ochrona TCP-SYN-FLOOD zacznie działać, kiedy ilość pakietów TCP przekroczy wybraną ilość."
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Dupleks",
                           content: "Wybierz typ dupleksu z rozwijanej listy i naciśnij Zapisz."
                       }]
},
       SYSTEM_PARA_LED :{ 
               TITLE:"Diody",
               CONTENT: [{
                           type: "name",
                           title: "Włącz tryb nocny",
                           content: "Zaznacz tę opcję, aby wyłączyć diody w trybie nocnym. Nie ma to wpływu na działanie routera."
                       } ,{                      
                           type: "name",
                           title: "Harmonogram trybu nocnego",
                           content: "Wybierz czas aktywności trybu nocnego."
                       } ,{                      
                           type: "paragraph",
                           content: "Naciśnij Zapisz, aby zapisać ustawienia."
                       }]
},
       OPEN_VPN :{ 
               TITLE:"OpenVPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dzięki funkcji OpenVPN, możesz ustanowić za pomocą Internetu bezpieczne połączenie ze swoją siecią, gdy znajdujesz się poza domem. Aby używać usług VPN, skonfiguruj najpierw usługę DDNS (zalecane) lub przypisx statyczny adres IP na porcie WAN rotuera. Czas systemowy routera powinien być pobierany z Internetu."
                       } ,{                      
                           type: "name",
                           title: "Typ usługi",
                           content: "Wybierz protokół, który będzie używany do komunikacji z serwerem OpenVPN: UDP lub TCP."
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "Wprowadź numer portu pomiędzy 1024 a 65535. Domyślnie używanym portem dla tej usługi jest port 1194."
                       } ,{                      
                           type: "name",
                           title: "Maska podsieci/sieci VPN",
                           content: "Wprowadź zakres adresów IP, które będą przydzielane klientom przez serwer OpenVPN."
                       } ,{                      
                           type: "name",
                           title: "Dostęp dla klientów",
                           content: "Wybierz typ dostępu dla klienta OpenVPN.",
       children: [{                      
                           type: "name",
                           title: "Tylko sieć domowa",
                           content: "Klient ma dostęp tylko do sieci lokalnej. Trasa domyślna klienta nie ulegnie zmianie."
                       } ,{                      
                           type: "name",
                           title: "Sieć domowa i Internet",
                           content: "Klient ma dostęp do sieci lokalnej oraz Internetu. Trasa domyślna klienta ulegnie zmianie."
                       }]
}]
},
       OPEN_VPN_CERTIFICATE :{ 
               TITLE:"Certyfikat",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Użyj certyfikatu do identyfikacji połączenia VPN z komputerem zdalnym.",
                "Naciśnij, aby wygenerować nowy certyfikat."]
}]
},
       OPEN_VPN_CONF :{ 
               TITLE:"Plik konfiguracyjny",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Klienci zdalni będą używać pliku z konfiguracją do połączenia z routerem.",
                "Naciśnij ten przycisk, aby zapisać plik konfiguracyjny OpenVPN używany podczas dodawania nowego połączenia VPN."]
}]
},
       OPEN_VPN_GUIDE :{ 
               TITLE:"Instrukcja instalacji klienta VPN",
               CONTENT: [{
                           type: "step",
                           title: "Aby połączyć urządzenie klienckie do serwera OpenVPN:",
       content: [{                      
                           type: "paragraph",
                           content: "Przed konfiguracją serwera OpenVPN, skonfiguruj najpierw usługę DDNS (zalecane), lub przypisz statyczny adres IP na porcie WAN routera. Upewnij się również, że port NAT jest inny niż port używany dla OpenVPN, a czas systemowy routera pobierany jest z Internetu."
                       },
                "1. Zaznacz Włącz serwer VPN.",
                "2. Skonfiguruj parametry serwera (Typ usługi, Port, Dostęp klientów oraz Maska sieci VPN) i naciśnij Zapisz.",
                "3. Naciśnij Eksportuj, aby zapisać plik z konfiguracją.",
                "4. Na urządzeniach klienckich, pobierz i zainstaluj klienta OpenVPN ze strony <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a>",
                "Obsługiwane systemy operacyjne to Windows, Mac OSX oraz Linux.",
                "5. Uruchom zainstalowane oprogramowanie i dodaj nowe połączenie VPN używając zapisanego wcześniej pliku z konfiguracją."]
} ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Więcej infirmacji o kliencie OpenVPN znajdziesz pod adresem <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
                       }]
},
       PPTP_VPN :{ 
               TITLE:"PPTP VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dzięki funkcji VPN PPTP, możesz ustanowić za pomocą Internetu połączenie ze swoją siecią, gdy znajdujesz się poza domem. Niektórzy dostawcy mogą blokować połączenia VPN. Aby używać usług VPN, skonfiguruj najpierw usługę DDNS (zalecane) lub przypisz statyczny adres IP na porcie WAN rotuera. Czas systemowy routera powinien być pobierany z Internetu."
                       } ,{                      
                           type: "name",
                           title: "Adres IP klienta",
                           content: "Wprowadź zakres adresów IP, które będą przydzielane klientom przez serwer VPN PPTP."
                       } ,{                      
                           type: "name",
                           title: "Nazwa użytkownika i hasło",
                           content: "Wprowadź nazwę użytkownika i hasło używane do uwierzytelniania klientów z serwerem VPN PPTP."
                       }]
},
       PPTP_VPN_GUIDE :{ 
               TITLE:"Instrukcja instalacji klienta VPN",
               CONTENT: [{
                           type: "step",
                           title: "Aby połączyć urządzenie klienckie do serwera VPN PPTP:",
       content: [{                      
                           type: "paragraph",
                           content: "Przed konfiguracją serwera VPN PPTP, skonfiguruj najpierw usługę DDNS (zalecane) lub przypisz statyczny adres IP na porcie WAN rotuera. Upewnij się również, że port NAT jest inny niż 1723, a czas systemowy routera pobierany jest z Internetu."
                       },
                "1. Zaznacz Włącz serwer VPN.",
                "2. Skonfiguruj parametry serwera i naciśnij Zapisz.",
                "3. Na urządzeniach klienckich utwórz nowe połączenie VPN PPTP. Obsługiwane systemy operacyjne to Windows, Mac OSX, Linux, iOS oraz Android.",
                "4. Uruchom zainstalowane oprogramowanie i dodaj nowe połączenie VPN używając nazwy domenowej DDNS lub stałego adresu IP routera."]
}]
},
       VPN_CONNNECTION :{ 
               TITLE:"Połączenia VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ta strona wyświetla klientów aktualnie połączonych z serwerami VPN OpenVPN i PPTP na routerze."
                       }]
},
       BASIC_NETWORK :{ 
               TITLE:"Mapa sieci",
               CONTENT: [{
                           type: "paragraph",
                           content: "Mapa sieci wyświetla aktualny stan sieci, informacje o sieci bezprzewodowej oraz połączonych urządzeniach."
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla informacje o połączeniu z Internetem."
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"Router",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla informacje o sieciach bezprzewodowych oraz portach LAN."
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"Klienci przewodowi/bezprzewodowi",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla nazwę sieci (można ją zmienić), przypisany adres IP oraz adresy MAC połączonych urządzeń."
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"Drukarka",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla nazwę drukarki podłączonej do routera przez port USB."
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"Dysk USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla informacje o urządzeniach USB podłączonych do routera."
                       }]
},
       BASIC_SPEED_TEST :{ 
               TITLE:"Test prędkości",
               CONTENT: [{
                           type: "paragraph",
                           content: "Za pomocą tej funkcji możesz sprawdzić aktualne prędkości pobierania i wysyłania, oferowane przez twojego usługodawcę. Możesz także uzyskać informacje o możliwościach swojego połączenia internetowego."
                       } ,{                      
                           type: "paragraph",
                           content: "Wskazówka: aby uzyskać dokładniejszy wynik zamknij wszystkie aplikacje i programy."
                       } ,{                      
                           type: "paragraph",
                           content: "Historia - rejestr poprzednich testów prędkości."
                       } ,{                      
                           type: "paragraph",
                           content: "Testuj ponownie - kliknij, aby przeprowadzić test prędkości."
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Naciśnij Wykryj lub wybierz typ połączenia ręcznie, a następnie wprowadź parametry połączenia otrzymane od dostawcy."
                       }]
},
       BASIC_WIRELESS_SMART_CONNECT :{ 
               TITLE:"Smart Connect",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zaznacz tę opcję, aby włączyć funkcję smart connect. Pomaga ona połączyć każde urządzenie z najlepszym w danym momencie pasmem, równoważąc w ten sposób ruch sieciowy."
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"Ustawienia sieci bezprzewodowej",
               CONTENT: [{
                           type: "paragraph",
                           content: "Możesz tu skonfigurować ustawienia sieci bezprzewodowej (SSID, hasło itp.)."
                       } ,{                      
                           type: "name",
                           title: "Nazwa sieci bezprzewodowej (SSID)",
                           content: "Zalecamy zmianę nazwy sieci bezprzewodowej (SSID). Wielkość liter ma znaczenie."
                       } ,{                      
                           type: "name",
                           title: "Ukryj nazwę sieci",
                           content: "Wybierz czy chcesz ukryć nazwę sieci 2,4GHZ/5GHz na liście sieci bezprzewodowych. Po zaznaczeniu tej opcji, nazwę sieci przy łączeniu wprowadź ręcznie."
                       } ,{                      
                           type: "name",
                           title: "Hasło",
                           content: "Wprowadź hasło do sieci bezprzewodowej składające się z 8 do 63 znaków ASCII lub 8 do 64 znaków szesnastkowych. Wielkość liter ma znaczenie."
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
               TITLE:"Urządzenie USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcja ta pozwala na udostępnianie zawartości podłączonych urządzeń USB w sieci lokalnej lub przez Internet."
                       } ,{                      
                           type: "title",
                           title: "Ustawienia urządzeń",
                           content: "Sekcja Ustawień urządzenia zawiera podstawowe informacje o podłączonym urządzeniu. Pamięć flash USB zazwyczaj posiada tylko jeden wolumin."
                       } ,{                      
                           type: "name",
                           title: "Skanuj",
                           content: "Router na ogół automatycznie wykrywa urządzenia po ich podłączeniu. Jeżeli tak się nie stało, naciśnij ten przycisk, aby przeskanować podłączone urządzenia ręcznie.",
       children: [{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Szary obszar zawiera nieaktywne woluminy. Możesz kliknąć na taki obszar, aby udostępnić określony wolumin."
                       }]
} ,{                      
                           type: "name",
                           title: "Usuń",
                           content: "Naciśnij ten przycisk, aby bezpiecznie usunąć urządzenie USB przed odłączeniem go od routera.",
       children: [{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Przycisk Usuń jest widoczny tylko kiedy podłączone jest urządzenie USB. Jeżeli aktualny wolumin jest aktywny, nie będziesz mógł usunąć urządzenia."
                       }]
} ,{                      
                           type: "step",
                           title: "Aby skonfigurować serwer plików",
       content: [ 
                "1. Podłącz urządzenie USB do portu USB. Jeżeli wymaga ono zewnętrznego zasilacza, upewnij się, że jest on podłączony.",
                "2. Urządzenie powinno zostać automatycznie wykryte przez router i pojawić się w sekcji Ustawienia urządzenia. Jeżeli tak się nie stało, naciśnij Skanuj.",
                "Uwaga: Ikona Udostępnij pojawia się, gdy do routera podłączonych jest więcej niż 5 woluminów. Możesz naciśnąć ikonę, aby wyłączyć woluminy, których nie chcesz udostępniać."]
}]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"Adres dostępu",
               CONTENT: [{
                           type: "name",
                           title: "Nazwa serwera",
                           content: "Wyświetla nazwę używaną do uzyskiwania dostępu do udostępnionej zawartości przez Miejsca sieciowe lub funkcję Udostępnianie multimediów. Domyślna nazwa to TP-Share."
                       } ,{                      
                           type: "name",
                           title: "Metoda dostępu",
                           content: "Dostęp do zasobów udostępnionych możesz uzyskać na 4 różne sposoby. ",
       children: [{                      
                           type: "name",
                           title: "Otoczenie sieciowe",
                           content: "Wybierz tę opcję, aby udostępnić użytkownikom w sieci zasoby pod adresem widocznym w kolumnie Adres."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Wybierz tę opcję, aby włączyć funkcję serwera FTP w sieci lokalnej. Użytkownicy będą mogli uzyskać dostęp do udostępnionych zasobów za pomocą klienta FTP pod adresem widocznym w kolumnie Adres."
                       } ,{                      
                           type: "name",
                           title: "FTP (przez Internet)",
                           content: "Zaznacz tę opcję, aby umożliwić klientom FTP dostęp, pobieranie i wysyłanie plików za pomocą FTP przez Internet. Aby zmienić adres dostępowy naciśnij Edytuj i skonfiguruj usługę DDNS na routerze. Aby zmienić port serwera FTP, wprowadź nowy port i naciśnij Zapisz."
                       } ,{                      
                           type: "name",
                           title: "SFTP",
                           content: "Zaznacz tę opcję, aby włączyć funkcję serwera SFTP, która umożliwia klientom SFTP i użytkownikom korzystającym z sieci, dostęp do urządzeń pamięci masowej USB za pomocą adresu SFTP przedstawionego w kolumnie Adres. "
                       }]
} ,{                      
                           type: "name",
                           title: "Adres",
                           content: "Wyświetla adres, z którego należy skorzystać, aby uzyskać dostęp do urządzenia USB."
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "Wyświetla port używany przez serwer FTP."
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"Udostępnianie zawartości",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla udostępniane foldery. Domyślnie wszystkie foldery są udostępnione. Naciśnij ikonę Edytuj, aby edytować foldery."
                       } ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Ikona Udostępnij pojawia się, gdy do routera podłączonych jest więcej niż 5 woluminów. Możesz naciśnąć ikonę, aby wyłączyć woluminy, których nie chcesz udostępniać."
                       }]
},
       FOLDER_SHARING :{ 
               TITLE:"Udostępnianie zawartości i bezpieczeństwo",
               CONTENT: [{
                           type: "name",
                           title: "Udostępnianie zawartości",
                           content: "Wyświetla udostępniane foldery. Domyślnie wszystkie foldery są udostępnione. Naciśnij ikonę Edytuj, aby edytować foldery.",
       children: [{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Ikona Udostępnij pojawia się, gdy do routera podłączonych jest więcej niż 5 woluminów. Możesz naciśnąć ikonę, aby wyłączyć woluminy, których nie chcesz udostępniać."
                       }]
} ,{                      
                           type: "name",
                           title: "Uwierzytelnianie dostępu",
       content: [ 
                "Przesuń pasek, aby włączyć uwierzytelnianie. Użytkownik zostanie poproszony o podanie nazwy użytkownika i hasła, aby uzyskać dostęp do udostępnionych folderów. Administrator jest uprawniony do odczytu plików i dokonywania w nich zmian, natomiast Użytkownik jedynie do odczytu.",
                "Nazwa użytkownika powinna zaczynać się od litery lub podkreślnika i zawierać od 1 do 15 znaków, w tym liter, cyfr oraz podkreślników.",
                "Hasło powinno zawierać od 1 do 15 znaków, w tym liter, cyfr oraz podkreślników."]
} ,{                      
                           type: "name",
                           title: "Zezwól na dostęp sieci dla gości",
                           content: "Włącz, aby umożliwić użytkownikom sieci dla gości dostęp do udostępnionych folderów. "
                       } ,{                      
                           type: "name",
                           title: "Włącz udostępnianie multimediów",
                           content: "Kiedy ta funkcja jest włączona, wszystkie urządzenia obsługujące DLNA w sieci będą miały dostęp do plików multimedialnych w udostępnionych folderach. Klienci nie będą musieli wprowadzać nazwy użytkownika ani hasła, nawet jeżeli Uwierzytelnianie dostępu jest włączone."
                       }]
},
       BASIC_PRINT_SERVER :{ 
               TITLE:"Serwer druku",
               CONTENT: [{
                           type: "name",
                           title: "Serwer druku",
                           content: "Zaznacz Włącz, aby włączyć serwer druku."
                       } ,{                      
                           type: "name",
                           title: "Nazwa drukarki",
                           content: "Wyświetla nazwę drukarki podłączonej do routera. "
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"Kontrola rodzicielska",
               CONTENT: [{
                           type: "paragraph",
                           content: "Podstawowe ustawienia Kontroli rodzicielskiej pozwalają na ograniczenie dostępu w wybranych godzinach (np. w czasie odrabiania pracy domowej)."
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"Urządzenia objęte kontrolą rodzicielską",
               CONTENT: [{
                           type: "paragraph",
                           content: "W tabeli wyświetlane są informacje i ustawienia urządzeń ograniczonych przez Kontrolę rodzicielską."
                       } ,{                      
                           type: "step",
                           title: "Aby dodać regułę kontroli dostępu dla nowego urządzenia:",
       content: [ 
                "1. Włącz Kontrolę rodzicielską.",
                "2. Naciśnij Dodaj.",
                "3. Naciśnij Skanuj, aby wybrać urządzenie z listy połączonych urządzeń lub wprowadź Nazwę urządzenia i Adres MAC ręcznie, jeżeli urządzenie nie jest połączone. ",
                "4. Naciśnij ikonę Czas działania, aby wybrać godziny, w których reguła ma być aktywna.",
                "5. Wprowadź krótki opis reguły w polu Opis. Pole Opis jest opcjonalne.",
                "6. Zaznacz Włącz ten wpis.",
                "7. Naciśnij Zapisz."]
} ,{                      
                           type: "note",
                           title: "Uwaga",
                           content: "Jeżeli chcesz wyłączyć rezerwację, naciśnij na ikonę żarówki."
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"Sieć dla gości",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ta funkcja pozwala gościom na dostęp do Internetu bez udostępniania im sieci głównej."
                       } ,{                      
                           type: "name",
                           title: "Pozwól gościom na komunikację między sobą",
                           content: "Zaznacz tę opcję, aby umożliwić urządzeniom w sieci dla gości komunikację między sobą za pomocą metod, takich jak miejsca sieciowe, Samba, Ping i FTP."
                       } ,{                      
                           type: "name",
                           title: "Pozwól gościom na dostęp do sieci lokalnej",
                           content: "Zaznacz tę opcję, aby umożliwić urządzeniom w sieci dla gości dostęp do zasobów sieci lokalnej, takich jak miejsca sieciowe, Samba, Ping i FTP."
                       } ,{                      
                           type: "name",
                           title: "Włącz sieć dla gości",
                           content: "Zaznacz tę opcję, aby włączyć funkcję sieci dla gości."
                       } ,{                      
                           type: "name",
                           title: "Nazwa sieci bezprzewodowej (SSID)",
                           content: "Użyj domyślnej nazwy sieci dla gości lub utwórz własną (do 32 znaków)."
                       } ,{                      
                           type: "name",
                           title: "Ukryj nazwę sieci",
                           content: "Zaznacz tę opcję, aby nazwa sieci nie była widoczna na liście dostępnych sieci bezprzewodowych."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Interwał aktualizacji hasła",
                           content: "Wybierz interwał aktualizacji hasła Sieci dla gości."
                       } ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Hasło",
                           content: "Wprowadź hasło składające się z 8 - 63 znaków ASCII lub 8 - 64 znaków szesnastkowych (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Hasło",
                           content: "Użyj hasła wygenerowanego losowo lub wprowadź własne, składające się z 8 do 63 znaków ASCII lub 8 do 64 znaków szesnastkowych (0-9, a-f, A-F)."
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"TP-Link Cloud",
               CONTENT: [{
                           type: "paragraph",
                           content: "TP-Link Cloud pozwala na zdalne monitorowanie i zarządzanie twoimi urządzeniami TP-Link za pośrednictwem Internetu."
                       }]
},
       ACCOUNT_INFO :{ 
               TITLE:"Informacje o koncie",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla dane konta TP-Link. Możesz edytować dane konta po naciśnięciu ikony Edytuj."
                       }]
},
       DEVICE_INFO :{ 
               TITLE:"Informacje o urządzeniu",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wyświetla informacje o urządzeniu, w tym o koncie Cloud przypisanym do routera."
                       }]
},
       BOUND_ACCOUNT :{ 
               TITLE:"Powiązane konta",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tabela ta wyświetla wszystkie konta Cloud powiązane z urządzeniem."
                       } ,{                      
                           type: "step",
                           title: "Aby powiązać konto użytkownika",
       content: [ 
                "1. Naciśnij Powiąż.",
                "2. Wprowadź zarejestrowany adres e-mail, który chcesz powiązać.",
                "3. Naciśnij Zapisz."]
}]
},
       NEW_PARENTAL_CONTROL :{ 
               TITLE:"Kontrola rodzicielska",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dzięki takim opcjom jak poziomy filtrów w zależności od wieku, ograniczenia dostępu oraz profile użytkowników, funkcja kontroli rodzicielskiej umożliwia spersonalizowany dostęp do Internetu, odpowiednie dla całej rodziny."
                       } ,{                      
                           type: "step",
                           title: "Konfiguracja funkcji kontroli rodzicielskiej na nowym urządzeniu",
       content: [ 
                "1. Naciśnij Dodaj.",
                "2. Wprowadź nazwę profilu i kliknij \"+\", aby powiązać urządzenie(a) z tym profilem.",
                "3. Wybierz poziom filtru i dostosuj ustawienia filtru zgodnie ze swoimi potrzebami. Wprowadź słowa kluczowe, aby wyszukać w naszej bazie danych strony internetowe, które chcesz filtrować. Adresy innych stron internetowych (URL) możesz wpisać ręcznie.<br/>Poniżej znajdziesz objaśnienia zastosowań dostępnych kategorii filtrów:<p>Treści dla dorosłych - strony, które zawierają treści o tematyce seksualnej, szkodliwe lub nielegalne, w tym treści pornograficzne, dotyczące korzystania z używek, nawołujące do przemocy i dyskryminacji.</p><p>Hazard - strony, które reklamują lub zawierają informacje o grach hazardowych, w tym o grach hazardowych online.</p><p>Edukacja seksualna - strony, które objaśniają kwestie seksualności człowieka, w tym reprodukcję, bezpieczny seks, antykoncepcję, choroby przenoszone drogą płciową oraz metody radzenia sobie z urazami o podłożu seksualnym.</p><p>Rozmowy online - strony, które umożliwiają wysyłanie wiadomości tekstowych, głosowych lub wideo, w tym skrzynki mailowe, blogi, fora internetowe, usługi VoIP oraz czaty wideo</p><p>Media społecznościowe - strony, które służą przekazywaniu swoich myśli, komunikacji z innymi, umożliwiają łączenie i grupowanie ludzi pod względem podobnych zainteresowań, wykonywanej pracy, pochodzenia lub na podstawie znajomości w życiu realnym</p><p>Pay to Surf - strony, które oferują użytkownikom korzyści finansowe w zamian za oglądanie określonych stron internetowych, wiadomości e-mail, reklam lub wchodzenie w podane linki, czy też uzupełnianie ankiet</p><p>Multimedia - strony, które oferują bezpłatny, płatny lub dostępny za subskrypcją dostęp do treści audio i/lub wideo, w tym do usługi przesyłu strumieniowego, programów telewizyjnych lub pobierania muzyki</p><p>Do pobrania - strony, które oferują udostępnianie plików i ich dystrybucję, w tym udostępnianie peer-to-peer, przechowywanie plików online oraz treści urządzeń mobilnych (np. muzyka i aplikacje)</p><p>Gry - strony, które umożliwiają dostęp do gier udostępnianych przez witrynę lub do pobrania, w tym gier internetowych, grupowych oraz przeglądarkowych</p> ",
                "4. Jeżeli chcesz ograniczyć czas dostępu do Internetu dla tego profilu, włącz i określ ograniczenia czasowe.",
                "5. Naciśnij przycisk Zapisz."]
} ,{                      
                           type: "step",
                           title: "Aby zobaczyć historię przeglądanych treści internetowych dla wybranego profilu ",
       content: [ 
                "1. W kolumnie Wgląd kliknij na przycisk odpowiadający danemu profilowi.",
                "2. Jeżeli chcesz zobaczyć więcej wyników, kliknij na przycisk Historia <span class=\"ptl-ctr-help-icon history\"></span> .",
                "3. Zablokuj lub odblokuj określone strony internetowe, klikając na przycisk <span class=\"ptl-ctr-help-icon block\"></span> lub <span class=\"ptl-ctr-help-icon unblock\"></span>."]
} ,{                      
                           type: "step",
                           title: "Aby natychmiast włączyć lub wyłączyć dostęp do Internetu",
       content: [ 
                "W kolumnie Adres internetowy, kliknij na<span class=\"ptl-ctr-help-icon stop\"></span>, aby zablokować dostęp do Internetu dla urządzeń przypisanych do profilu i kliknij na <span class=\"ptl-ctr-help-icon enable\"></span>, aby go ponowanie odblokować."]
}]
},
       BASIC_QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcja QoS przydziela określone priorytety działaniom przeprowadzanym w sieci oraz urządzeniom, aby zagwarantować szybsze połączenia internetowe."
                       } ,{                      
                           type: "paragraph",
                           content: "Wybierz Priorytety dla aplikacji, aby zadecydować o prędkości połączeń dla wybranych działań sieciowych, a także wybierz Priorytety dla urządzeń, aby zadecydować o prędkości połączeń dla wybranych urządzeń."
                       }]
},
       BASIC_APPLICATION_PRIORITY :{ 
               TITLE:"Priorytety dla aplikacji",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wybierz działanie sieciowe, któremu chcesz nadać priorytet lub kliknij na Dostosuj, aby ustawić poziom priorytetu dla każdegu z działań."
                       }]
},
       BASIC_DEVICE_PRIORITY :{ 
               TITLE:"Priorytety dla urządzeń",
               CONTENT: [{
                           type: "paragraph",
                           content: "Wybierz urządzenie(a) któremu(ym) chcesz nadać priorytet, a także określ czas dla tych priorytetów."
                       } ,{                      
                           type: "step",
                           title: "Aby nadać priorytet urządzeniu",
       content: [ 
                "1. Znajdź na liście urządzenie, któremu chcesz nadać priorytet i włącz Priorytet.",
                "2. W kolumnie Czasu wybierz czas dla priorytetu."]
}]
},
       ANTI_VIRUS :{ 
               TITLE:"Antywirus",
               CONTENT: [{
                           type: "paragraph",
                           content: "Częste skanowanie zasobów sieciowych, wykrywanie szkodliwych stron internetowych oraz izolacja zawirusowanych urządzeń gwarantują bezpieczeństwo poufnych informacji. Możesz także kontrolować zabezpieczenia swojej sieci oraz częstotliwość wykrywania ataków sieciowych."
                       } ,{                      
                           type: "paragraph",
                           content: "Historia - rejestr urządzeń chronionych przez Antywirus, a także źródeł i klasyfikacji ataków."
                       } ,{                      
                           type: "paragraph",
                           content: "Włącz wszystkie - dotknij, aby włączyć wszystkie typy zabezpieczeń."
                       } ,{                      
                           type: "paragraph",
                           content: "Typy zabezpieczeń - włącz odpowiednie typy zabezpieczeń, zapoznając się z ich objaśnieniami. Zaleca się włączyć wszystkie typy zabezpieczeń. "
                       }]
},
       APPLICATION_PRIORITY :{ 
               TITLE:"Priorytety dla aplikacji",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcja Priorytetu dla aplikacji służy nadawaniu priorytetu działaniom sieciowym, aby zagwarantować szybsze połączenia internetowe. Wybierz działanie sieciowe, któremu chcesz nadać priorytet lub kliknij na Dostosuj, aby ustawić poziom priorytetu dla każdego z działań."
                       }]
},
       DEVICE_PRIORITY :{ 
               TITLE:"Priorytety dla urządzeń",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcja Priorytetu dla aplikacji służy nadawaniu priorytetu urządzeniom, aby zagwarantować szybsze połączenia internetowe. Wybierz urządzenie(a) któremu(ym) chcesz nadać priorytet, a także określ czas dla tych priorytetów."
                       } ,{                      
                           type: "step",
                           title: "Aby nadać priorytet urządzeniu",
       content: [ 
                "1. Znajdź na liście urządzenie, któremu chcesz nadać priorytet i włącz Priorytet.",
                "2. W kolumnie Czasu wybierz czas dla priorytetu."]
}]
},
       FIREWALL :{ 
               TITLE:"Firewall",
               CONTENT: [{
                           type: "paragraph",
                           content: "Firewall SPI zapobiega cyberatakom i zatwierdza na podstawie protokołu ruch przechodzący przez router. Domyślnie funkcja ta jest włączona."
                       } ,{                      
                           type: "name",
                           title: "Włącz Firewall SPI",
                           content: "Nie wyłączaj Firewalla SPI, jeżeli nie jest to konieczne."
                       } ,{                      
                           type: "name",
                           title: "Zezwól na otrzymywanie pakietów ping z portu WAN/Zezwól na otrzymywanie pakietów ping z portu LAN",
                           content: "Włącz, aby zezwolić na otrzymywanie pakietów ping z portu WAN/LAN. Zaleca się pozostawić ustawienia domyślne."
                       }]
},
       "" :     ""
    };
})(jQuery);