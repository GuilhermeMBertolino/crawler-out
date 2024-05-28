(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megmutatja a wide area hálózat (Internet) kapcsolat releváns adatait."
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"2,4GHz/5GHz Vezeték nélküli",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti a vezeték nélküli hálózattal kapcsolatos fontos információkat."
                       }]
},
       STATUS_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti az Ethernet (LAN) portok adatait. "
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"2,4GHz/5GHz Vendég hálózat",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti a vezeték nélküli vendég hálózatokra vonatkozó információkat."
                       }]
},
       STATUS_USB :{ 
               TITLE:"USB-eszközök",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti az USB porton keresztül az USB-tárolóeszközök és / vagy a routerhez csatlakoztatott nyomtató információit."
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"Teljesítmény",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti a router aktuális teljesítményét."
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"Vezetékes kliensek",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti a hálózathoz csatlakoztatott vezetékes eszközök adatait."
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"Vezeték nélküli kliensek",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti a hálózathoz csatlakoztatott vezeték nélküli eszközök adatait."
                       }]
},
       INTERNET_TITLE :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Állítsa be az IPv4 paramétereket, és válassza ki a megfelelő MAC-klón módszert szükség szerint."
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"IPv4",
               CONTENT: [{
                           type: "paragraph",
                           content: "Válassza ki az Internetkapcsolat típusát, és adja meg a megfelelő paramétereket."
                       } ,{                      
                           type: "title",
                            title: "Internet kapcsolati típus: Dinamikus IP"
                       } ,{                      
                           type: "paragraph",
                           content: "Válassza ezt a típust, ha a szolgáltató DHCP szerver kapcsolatot biztosít."
                       } ,{                      
                           type: "name",
                           title: "IP cím / Alhálózati maszk / Alapértelmezett átjáró / Elsődleges DNS / Másodlagos DNS",
                           content: "Ezeket a paramétereket a DHCP-kiszolgáló automatikusan hozzárendeli az internetszolgáltatótól."
                       } ,{                      
                           type: "name",
                           title: "Megújít",
                           content: "Kattintson, hogy új IP-paramétereket kapjon a DHCP szerverről."
                       } ,{                      
                           type: "name",
                           title: "Eldob",
                           content: "Kattintson a gombra a DHCP-kiszolgáló által kiosztott összes IP-cím eldobásához."
                       } ,{                      
                           type: "name",
                           title: "DNS-cím",
                           content: "Ha a szolgáltató egy vagy két DNS címet biztosít, jelölje be ezt a jelölőnégyzetet, és adja meg az elsődleges és másodlagos DNS-címeket a megfelelő beviteli mezőben. Ellenkező esetben a DNS-címeket automatikusan osztja ki a szolgáltató."
                       } ,{                      
                           type: "name",
                           title: "MTU méret",
                           content: "Az alapértelmezett és tipikus MTU (Maximum Transmission Unit) méret a legtöbb Ethernet-hálózaton 1500 bájt. Nem ajánlott módosítani az alapértelmezett MTU méretét, ha azt a szolgáltató nem kéri."
                       } ,{                      
                           type: "name",
                           title: "Hoszt név",
                           content: "Adjon meg egy értéket ebben a mezőbena router hoszt nevének meghatározásához."
                       } ,{                      
                           type: "name",
                           title: "Get IP Unicast DHCP használatával",
                           content: "Jelölje be ezt a jelölőnégyzetet, ha az internetszolgáltató DHCP-szervere nem támogatja a sugárzott alkalmazásokat, és az IP-címet dinamikusan nem tudja megkapni."
                       } ,{                      
                           type: "title",
                            title: "Internet kapcsolati típus: Statikus IP"
                       } ,{                      
                           type: "paragraph",
                           content: "Válassza ezt a típust, ha kapott meghatározott (fix) IP-cím, alhálózati maszk, átjáró és DNS paramétereket szolgáltatójától."
                       } ,{                      
                           type: "name",
                           title: "IP cím / Alhálózati maszk / Alapértelmezett átjáró / Elsődleges DNS / Másodlagos DNS",
                           content: "Írja be az internetszolgáltató által megadott adatokat."
                       } ,{                      
                           type: "name",
                           title: "MTU méret",
                           content: "Az alapértelmezett és tipikus MTU (Maximum Transmission Unit) méret a legtöbb Ethernet-hálózaton 1500 bájt. Nem ajánlott módosítani az alapértelmezett MTU méretét, ha azt a szolgáltató nem kéri."
                       } ,{                      
                           type: "title",
                            title: "Internet kapcsolati típus: BigPond kábel"
                       } ,{                      
                           type: "paragraph",
                           content: "Válassza ezt a típust, ha az ISP BigPond kábeles kapcsolatot biztosít."
                       } ,{                      
                           type: "name",
                           title: "Felhasználónév/Jelszó",
                           content: "Adja meg az internetszolgáltató által megadott felhasználónevet és jelszót. Ügyeljen a kis-és nagybetűkre."
                       } ,{                      
                           type: "name",
                           title: "Hitelesítő szerver",
                           content: "Írja be a hitelesítő szerver IP címét vagy nevét."
                       } ,{                      
                           type: "name",
                           title: "Hitelesítő Domain",
                           content: "Adja meg a kiszolgáló domainnév utótagját (a hely alapján). Például: NSW / ACT, nsw.bigpond.net.au, vic.bigpond.net.au a VIC / TAS / WA / SA / NT, vagy qld.bigpond.net.au a QLD számára."
                       } ,{                      
                           type: "name",
                           title: "MTU méret",
                           content: "Az alapértelmezett és tipikus MTU (Maximum Transmission Unit) méret a legtöbb Ethernet-hálózaton 1500 bájt. Nem ajánlott módosítani az alapértelmezett MTU méretét, ha azt a szolgáltató nem kéri."
                       } ,{                      
                           type: "name",
                           title: "Kapcsolati mód",
                           content: "Válasszon ki egy megfelelő csatlakozási módot, amely meghatározza, hogyan lehet csatlakozni az internethez.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "Ebben az üzemmódban az Internetkapcsolat mindig automatikus újra csatlakozik, amikor az megmegszakad."
                       } ,{                      
                           type: "name",
                           title: "Kérésre",
                           content: "Ebben az üzemmódban az internetkapcsolat automatikusan megszakad egy meghatározott inaktív időszak (Max Idle Time) elteltével. A kapcsolat helyreáll, amikor megpróbálja elérni az internetet újra."
                       } ,{                      
                           type: "name",
                           title: "Manuális",
                           content: "Ebben az üzemmódban az Internetkapcsolat manuálisan szabályozható a Csatlakozás vagy a Megszakítás gomb megnyomásával. Ez a mód is támogatja a Max Idle Time funkciót. Adjon meg egy maximális inaktív időt (percben), aminek az elteltével az Internetkapcsolat megszűnik. Az alapértelmezett érték 15 perc. Ha szeretné, hogy az Internet-kapcsolat aktív maradjon minden alkalommal, adja meg a 0 (nulla) értéket."
                       }]
} ,{                      
                           type: "title",
                            title: "Internet kapcsolati típus: PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "Válassza ezt a típust, ha DSL szolgáltatást használ és szolgáltatójától felhasználónevet és jelszót kapott. "
                       } ,{                      
                           type: "name",
                           title: "Felhasználónév/Jelszó",
                           content: "Adja meg az internetszolgáltató által megadott felhasználónevet és jelszót. Ügyeljen a kis-és nagybetűkre."
                       } ,{                      
                           type: "name",
                           title: "IP-cím/Elsődleges DNS/Másodlagos DNS",
                           content: "Ezeket a paramétereket a szolgáltató DHCP szervere automatikusan kiosztja."
                       } ,{                      
                           type: "name",
                           title: "Másodlagos kapcsolat (Nincs, dinamikus IP, statikus IP)",
       children: [{                      
                           type: "name",
                           title: "Egyik sem",
                           content: "Jelölje be, ha nincs másodlagos kapcsolat."
                       } ,{                      
                           type: "name",
                           title: "Dinamikus IP",
                           content: "Jelölje be, ha az IP-címet és az alhálózati maszkot a szolgáltató automatikusan osztja ki.",
       children: [{                      
                           type: "name",
                           title: "Megújít",
                           content: "Kattintson az IP-paraméterek megújításához az internetszolgáltatótól."
                       } ,{                      
                           type: "name",
                           title: "Eldob",
                           content: "Kattintson ide a kiosztott IP paraméterek eldobásához."
                       }]
} ,{                      
                           type: "name",
                           title: "Statikus IP",
                           content: "Válassza ki, hogy az IP-címet és alhálózati maszkot az internetszolgáltató biztosítja-e, és adja meg az adatokat a megfelelő mezőkben."
                       }]
} ,{                      
                           type: "name",
                           title: "MTU méret",
                           content: "A tipikus MTU (Maximum Transmission Unit) méret az Ethernet hálózatokhoz 1480 bájt.",
       children: [{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Ritka esetben az internetszolgáltató előírhatja az MTU méretének beállítását a jobb hálózati teljesítmény érdekében. Ne változtassa meg az értéket, csak feltétlenül szükséges."
                       }]
} ,{                      
                           type: "name",
                           title: "Szolgáltatás neve/Access Concentrator neve",
                           content: "Alapértelmezés szerint a szolgáltatás neve és az Access Concentrator (AC) neve üres. Ezeket a mezőket nem szabad konfigurálni, hacsak az ISP nem kéri."
                       } ,{                      
                           type: "name",
                           title: "Online időtartam észlelése",
                           content: "Adjon meg egy időintervallumot 0 és 120 között (másodpercben) a router számára az Access Concentrator online felderítésére minden időintervallumban. Az alapértelmezett érték 10."
                       } ,{                      
                           type: "name",
                           title: "IP-cím",
                           content: "Ha a szolgáltató specifikus (fix) IP címet biztosít, válassza a Használja a következő IP címet, és írja be a mezőbe az IP-címet. Ellenkező esetben válassza a Dinamikus lekérés a szolgáltatótól lehetőséget, hogy automatikusan megkaphassa a kiszolgáló által kiosztott IP-címet."
                       } ,{                      
                           type: "name",
                           title: "DNS-cím",
                           content: "Ha az ISP megadja a specifikus (fix) DNS IP-címeket, válassza a Használja a következő DNS-címeket, és írja be a címeket az elsődleges DNS- és másodlagos DNS-mezőkbe. Ellenkező esetben válassza a Get Dynamically from ISP-t, hogy automatikusan megkapja a kiszolgáló által megadott DNS IP-címeket."
                       } ,{                      
                           type: "name",
                           title: "Kapcsolati mód",
                           content: "Válasszon ki egy megfelelő csatlakozási módot, amely meghatározza, hogyan lehet csatlakozni az internethez.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "Ebben az üzemmódban az Internetkapcsolat mindig automatikus újra csatlakozik, amikor az megmegszakad."
                       } ,{                      
                           type: "name",
                           title: "Kérésre",
                           content: "Ebben az üzemmódban az internetkapcsolat automatikusan megszakad egy meghatározott inaktív időszak (Max Idle Time) elteltével. A kapcsolat helyreáll, amikor megpróbálja elérni az internetet újra."
                       } ,{                      
                           type: "name",
                           title: "Időalapú",
                           content: "Ebben az üzemmódban az Internetkapcsolat csak egy meghatározott időre jön létre. Ha ezt a lehetőséget választja, adja meg a kezdési és befejezési időt; mindkettőt ÓÓ:PP formátumban."
                       } ,{                      
                           type: "name",
                           title: "Manuális",
                           content: "Ebben az üzemmódban az Internetkapcsolat manuálisan szabályozható a Csatlakozás vagy a Megszakítás gomb megnyomásával. Ez a mód is támogatja a Max Idle Time funkciót. Adjon meg egy maximális inaktív időt (percben), aminek az elteltével az Internetkapcsolat megszűnik. Az alapértelmezett érték 15 perc. Ha szeretné, hogy az Internet-kapcsolat aktív maradjon minden alkalommal, adja meg a 0 (nulla) értéket."
                       } ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Az idő-alapú csatlakozási mód csak akkor lép érvénybe, ha aRendszeridő aHaladó → Rendszereszközök → Időbeállítások oldalon be van állítva."
                       }]
} ,{                      
                           type: "title",
                            title: "Internet kapcsolati típus: L2TP / PPTP"
                       } ,{                      
                           type: "paragraph",
                           content: "Válassza ezt a típust, ha egy L2TP / PPTP VPN szerverre kapcsolódik és rendelkezik a szolgáltató szerverhez felhasználónévvel, jelszóval és IP-címmel / domain névvel."
                       } ,{                      
                           type: "name",
                           title: "Felhasználónév/Jelszó",
                           content: "Adja meg az internetszolgáltató által megadott felhasználónevet és jelszót. Ügyeljen a kis-és nagybetűkre."
                       } ,{                      
                           type: "name",
                           title: "IP-cím/Elsődleges DNS/Másodlagos DNS",
                           content: "Ezeket a paramétereket a szolgáltatói DHCP-kiszolgáló automatikusan osztja ki."
                       } ,{                      
                           type: "name",
                           title: "Másodlagos Connection (dinamikus IP vagy statikus IP)",
       children: [{                      
                           type: "name",
                           title: "Dinamikus IP",
                           content: "Jelölje be, ha az IP-címet és az alhálózati maszkot a szolgáltató automatikusan osztja ki."
                       } ,{                      
                           type: "name",
                           title: "Statikus IP",
                           content: "Válassza ki, hogy az IP-címet, alhálózati maszk, átjáró és DNS-címeket az internetszolgáltató biztosítja-e, és adja meg az adatokat a megfelelő mezőkben."
                       }]
} ,{                      
                           type: "name",
                           title: "VPN szerver IP / Domain név",
                           content: "Adja meg a VPN-kiszolgáló szolgáltatótól kapott IP-címét vagy domain nevét."
                       } ,{                      
                           type: "name",
                           title: "MTU méret",
                           content: "Az alapértelmezett és tipikus MTU (Maximum Transmission Unit) méret a legtöbb Ethernet-hálózat esetében 1460 byte L2TP illetve 1420 byte PPTP esetben. Nem ajánlott módosítani az alapértelmezett MTU méretét, ha a szolgáltató külön ezt nem kéri."
                       } ,{                      
                           type: "name",
                           title: "Kapcsolati mód",
                           content: "Válasszon ki egy megfelelő csatlakozási módot, amely meghatározza, hogyan lehet csatlakozni az internethez.",
       children: [{                      
                           type: "name",
                           title: "Auto",
                           content: "Ebben az üzemmódban az Internetkapcsolat mindig automatikus újra csatlakozik, amikor az megmegszakad."
                       } ,{                      
                           type: "name",
                           title: "Kérésre",
                           content: "Ebben az üzemmódban az internetkapcsolat automatikusan megszakad egy meghatározott inaktív időszak (Max Idle Time) elteltével. A kapcsolat helyreáll, amikor megpróbálja elérni az internetet újra."
                       } ,{                      
                           type: "name",
                           title: "Manuális",
                           content: "Ebben az üzemmódban az Internetkapcsolat manuálisan szabályozható a Csatlakozás vagy a Megszakítás gomb megnyomásával. Ez a mód is támogatja a Max Idle Time funkciót. Adjon meg egy maximális inaktív időt (percben), aminek az elteltével az Internetkapcsolat megszűnik. Az alapértelmezett érték 15 perc. Ha szeretné, hogy az Internet-kapcsolat aktív maradjon minden alkalommal, adja meg a 0 (nulla) értéket."
                       }]
}]
},
       INTERNET_MAC :{ 
               TITLE:"MAC klónozás",
               CONTENT: [{
                           type: "paragraph",
                           content: "Válassza ki a megfelelő MAC-klón módszert, amire szüksége van."
                       } ,{                      
                           type: "name",
                           title: "Ne klónozza a MAC címet",
                           content: "Ne változtassa meg a router alapértelmezett MAC címét, ha a szolgáltató nem köti a kiosztott IP-címet a MAC címhez. "
                       } ,{                      
                           type: "name",
                           title: "Klónozza a jelenlegi számítógép MAC címét",
                           content: "Válassza a routerhez csatlakoztatott számítógép aktuális MAC-címének másolását, ha a szolgáltató a kiosztott IP-címet a számítógép MAC címhez köti."
                       } ,{                      
                           type: "name",
                           title: "Egyedi MAC-cím használata",
                           content: "Adja meg a MAC-címet manuálisan, ha a szolgáltató a kiosztott IP-címet megadott MAC címhez köti. "
                       }]
},
       INTERNET_WAN_AGGREGATION :{ 
               TITLE:"WAN aggregáció",
               CONTENT: [{
                           type: "paragraph",
                           id: "internet_wan_aggregation_detail",
                           content: "A WAN Aggregáció átalakítja a LAN1 portot egy további WAN portra, és egyetlen nagy sávszélességű adatútvonalat hoz létre. Még gyorsabb internetezését, amely akár 1 GB-nál nagyobb sávszélességet biztosít, és nem korlátozódik a hálózati hardverre."
                       } ,{                      
                           type: "note",
                           id: "internet_wan_aggregation_note",
                           title: "Megjegyzés ",
                           content: "A funkció engedélyezése előtt győződjön meg róla, hogy az internetszolgáltató támogatja a WAN Aggregáció szolgáltatást, és a modemje két WAN porttal rendelkezik."
                       } ,{                      
                           type: "step",
                           title: "WAN aggregáció alkalmazásához",
       content: [ 
                "1. Kapcsolja be a WAN Aggregáció funkciót annak engedélyezéséhez.",
                "2 Kattintson a Mentésre",
                "3. Csatlakoztassa a router WAN portját és LAN1 portját a modemje két WAN portjához két Ethernet kábellel."]
}]
},
       LAN_IPV4 :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti a router MAC-címét, IP-címét és alhálózati maszkját."
                       } ,{                      
                           type: "name",
                           title: "MAC cím",
                           content: "A router Ethernet (LAN) portjához tartozó egyedi fizikai cím. "
                       } ,{                      
                           type: "name",
                           title: "IP-cím",
                           content: "Megjeleníti a router alapértelmezett IP-címét, amely az útválasztó webes kezelőoldalára való bejelentkezéshez használható. Meg lehet változtatni egy másikra."
                       } ,{                      
                           type: "name",
                           title: "Alhálózati maszk",
                           content: "Válasszon ki egy LAN-port által használt hozzárendelt azonosítót a belső és külső forgalom irányítására, vagy írjon be egy új alhálózati maszkot."
                       } ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Ha az új LAN IP-címe nem ugyanazon az alhálózaton van, mint a régi, az IP címtartomány a DHCP szerverben automatikusan beállításra kerül; azonban a Virtuális szerver és a DMZ hoszt konfigurációk nem lépnek érvénybe, amíg azokat újra be nem állítja."
                       }]
},
       LINK_AGG :{ 
               TITLE:"Link Aggregáció ",
               CONTENT: [{
                           type: "paragraph",
                           content: "Link Aggregation combines two ports together to make a single high-bandwidth data path, thus sustaining a higher-speed and more stable wired network."
                       } ,{                      
                           type: "step",
                           id: "link_agg_step_help",
                           title: "To apply link aggregation:",
       content: [ 
                "1. Toggle on to enable the Link Aggregation feature.",
                "2. Specify two ports for link aggregation.",
                "3. Kattintson a Mentés gombra."]
}]
},
       IPTV :{ 
               TITLE:"IPTV",
               CONTENT: [{
                           type: "paragraph",
                           content: "Az IPTV (Internet Protocol Television) olyan rendszer, amelyen keresztül a televíziós szolgáltatásokat az Internet protokollcsomag segítségével csomagkapcsolt hálózaton (pl. LAN vagy az interneten keresztül) biztosítják."
                       } ,{                      
                           type: "name",
                           id: "igmp-snooping",
                           title: "IGMP Snooping",
                           content: "Az IGMP (Internet Group Management Protocol) Snooping szolgáltatás lehetővé teszi, hogy a router csak az azt kérő portoknak továbbítsa a multicast forgalmat."
                       } ,{                      
                           type: "name",
                           title: "IGMP Proxy",
                           content: "Válassza ezt az opciót az IGMP Proxy szolgáltatás bekapcsolásához, ha szolgáltató által nyújtott IPTV-szolgáltatás IGMP technológiára épül."
                       } ,{                      
                           type: "name",
                           title: "IGMP verzió",
                           content: "Válassza ki az IGMP verziót az internetszolgáltató utasításai szerint. Az alapértelmezett IGMP verzió V2."
                       } ,{                      
                           type: "name",
                           id: "igmp-wifi",
                           title: "Wireless Multicast Forwarding",
                           content: "Válassza ezt a lehetőséget a Vezeték nélküli multicast továbbítás funkció bekapcsolásához, amely lehetővé teszi a multicast csomagok továbbítását a vezeték nélküli hálózathoz."
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "Válassza ezt az opciót az IPTV szolgáltatás bekapcsolásához, ha a szolgáltató által nyújtott IPTV szolgáltatás nem IGMP technológiára épül."
                       } ,{                      
                           type: "name",
                           title: "Szolgáltatói profil",
                           content: "A konfiguráció befejezéséhez válassza ki a megfelelő internetszolgáltatói profilt. Háromféle profil létezik:",
       children: [{                      
                           type: "name",
                           title: "Ország - Internet szolgáltató neve",
                           content: "Az alapértelmezett beállításokkal rendelkező szolgáltatói az \"ország-szolgáltatónév\" formátumban találhatók. Egyszerűen keresse meg és válassza ki a szolgáltatót a legördülő listából."
                       } ,{                      
                           type: "name",
                           id: "iptv_bridge_child_1to4",
                           title: "Bridge",
                           content: "Ha az internetszolgáltatója nem szerepel a listán, és az IPTV beállításához nincs más paraméter, akkor egyszerűen kiválaszthatja ezt a profilt, és megadhatja az IPTV-re szánt LAN portot.",
       children: [{                      
                           type: "name",
                           title: "LAN1 / LAN2 / LAN3 / LAN4",
                           content: "Adja meg, hogy a LAN port milyen adatokat továbbít. Például, ha az IPTV-t a LAN1-re van kiválasztva, akkor csak az IPTV adatokat továbbítja, és csatlakoztassa a set-top boxot a LAN1-hez."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_2to5",
                           title: "Bridge",
                           content: "Ha az internetszolgáltatója nem szerepel a listán, és az IPTV beállításához nincs más paraméter, akkor egyszerűen kiválaszthatja ezt a profilt, és megadhatja az IPTV-re szánt LAN portot.",
       children: [{                      
                           type: "name",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Adja meg, hogy a LAN port milyen adatokat továbbít. Például, ha az IPTV-t a LAN2-re van kiválasztva, akkor csak az IPTV adatokat továbbítja, és csatlakoztassa a set-top boxot a LAN2 porthoz."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_5to8",
                           title: "Bridge",
                           content: "Ha az internetszolgáltatója nem szerepel a listán, és az IPTV beállításához nincs más paraméter, akkor egyszerűen kiválaszthatja ezt a profilt, és megadhatja az IPTV-re szánt LAN portot.",
       children: [{                      
                           type: "name",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Adja meg, hogy a LAN port milyen adatokat továbbít. Ha például az IPTV-t a LAN5-re van kiválasztva, akkor csak az IPTV adatokat továbbítja, és csatlakoztassa a set-top boxot a LAN5 porthoz."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_1to4",
                           title: "Egyéni",
                           content: "Ha az internetszolgáltatója nem szerepel a listán, de megad néhány szükséges paramétert, például az internetes / VoIP / IPTV VLAN-azonosítót és a prioritást, válassza ezt a profilt.",
       children: [{                      
                           type: "name",
                           title: "Internet / VoIP / IPTV VLAN ID / Prioritás",
                           content: "Állítsa be a VLAN-azonosítókat és prioritásokat az internetszolgáltató által megadott módon."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Válassza ki, ha szeretné az internetes csomagokat a 802.11Q protokoll szerint címkézni. "
                       } ,{                      
                           type: "name",
                           title: "IPTV multicast VLAN ID/Prioritás",
                           content: "Engedélyezheti az IPTV multicast funkciót, és beállíthatja a VLAN-azonosítót és a prioritást a szolgáltató utasításai szerint."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN1 / LAN2 / LAN3 / LAN4",
                           content: "Adja meg, hogy a LAN port milyen adatokat továbbít. Például, ha az IPTV-t a LAN1-re van kiválasztva, akkor csak az IPTV adatokat továbbítja, és csatlakoztassa a set-top boxot a LAN1-hez."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_2to5",
                           title: "Egyéni",
                           content: "Ha az internetszolgáltatója nem szerepel a listán, de megad néhány szükséges paramétert, például az internetes / VoIP / IPTV VLAN-azonosítót és a prioritást, válassza ezt a profilt.",
       children: [{                      
                           type: "name",
                           title: "Internet / VoIP / IPTV VLAN ID / Prioritás",
                           content: "Állítsa be a VLAN-azonosítókat és prioritásokat az internetszolgáltató által megadott módon."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Válassza ki, ha szeretné az internetes csomagokat a 802.11Q protokoll szerint címkézni. "
                       } ,{                      
                           type: "name",
                           title: "IPTV multicast VLAN ID/Prioritás",
                           content: "Engedélyezheti az IPTV multicast funkciót, és beállíthatja a VLAN-azonosítót és a prioritást a szolgáltató utasításai szerint."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Adja meg, hogy a LAN port milyen adatokat továbbít. Például, ha az IPTV-t a LAN2-re van kiválasztva, akkor csak az IPTV adatokat továbbítja, és csatlakoztassa a set-top boxot a LAN2 porthoz."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_5to8",
                           title: "Egyéni",
                           content: "Ha az internetszolgáltatója nem szerepel a listán, de megad néhány szükséges paramétert, például az internetes / VoIP / IPTV VLAN-azonosítót és a prioritást, válassza ezt a profilt.",
       children: [{                      
                           type: "name",
                           title: "Internet / VoIP / IPTV VLAN ID / Prioritás",
                           content: "Állítsa be a VLAN-azonosítókat és prioritásokat az internetszolgáltató által megadott módon."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Válassza ki, ha szeretné az internetes csomagokat a 802.11Q protokoll szerint címkézni. "
                       } ,{                      
                           type: "name",
                           title: "IPTV multicast VLAN ID/Prioritás",
                           content: "Engedélyezheti az IPTV multicast funkciót, és beállíthatja a VLAN-azonosítót és a prioritást a szolgáltató utasításai szerint."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Adja meg, hogy a LAN port milyen adatokat továbbít. Ha például az IPTV-t a LAN5-re van kiválasztva, akkor csak az IPTV adatokat továbbítja, és csatlakoztassa a set-top boxot a LAN5 porthoz."
                       }]
}]
}]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"DHCP szerver",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "A Dynamic Host Configuration Protocol (DHCP) kiszolgáló alapértelmezés szerint engedélyezve van, és dinamikusan kiosztja a TCP / IP paramétereket a kliens eszközök számára az IP címtartományból.",
                "NE tiltsa le a DHCP szervert, hacsak nincs másik DHCP szervere, vagy manuálisan szeretné a TCP / IP paramétereket a hálózat minden ügyféleszközéhez rendelni."]
} ,{                      
                           type: "name",
                           title: "IP-cím tartomány",
                           content: "Írja be a klienseknek kiosztható IP-címek tartományát."
                       } ,{                      
                           type: "name",
                           title: "cím időtartam",
                           content: "Írja be az időtartamot (1 és 2880 perc között), ameddig egy IP-címet a kliens rendelkezésére áll. Az alapértelmezett érték 120."
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"Cím fenntartás",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti az IP-fenntartott eszközök megfelelő paramétereit."
                       } ,{                      
                           type: "step",
                           title: "Egy IP-cím fenntartásához",
       content: [ 
                "1. Kattintson a Hozzáadás gombra.",
                "2. Kattintson a Szkennelés gombra a jelenleg csatlakoztatott eszköz kiválasztásához a DHCP-ügyféllistából; Vagy írja be a kívánt kliens MAC-címét a MAC cím mezőbe és a kliens számára fenntartandó IP címet az IP cím mezőbe az IP címtartományból. ",
                "3. Adja meg a kliens leírását a Leírás mezőben.",
                "4. Válassza ki a Bejegyzés bekapcsolása opciót.",
                "5. Kattintson a Mentés gombra."]
} ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Ha ki szeretné kapcsolni ezt a bejegyzést, kattintson az Izzó ikonra."
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"DHCP kliens lista",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti a jelenleg csatlakoztatott eszközök adatait."
                       }]
},
       DDNS :{ 
               TITLE:"Dynamic DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "A Dinamikus DNS (Dynamic Domain Name System) segítségével dinamikus internetes IP-címhez fix hoszt gépet és domain nevet rendelhet. Ez hasznos, ha saját webhelyet, FTP-kiszolgálót vagy egy másik kiszolgálót üzemeltet a router mögött. Először is, regisztrálnia kell egy dinamikus DNS-szolgáltatónál, mint például a www.dyndns.com."
                       } ,{                      
                           type: "step",
                           title: "Egy dinamikus DNS beállításához ",
       content: [ 
                "1. Válassza ki a Dynamic DNS szolgáltatót.",
                "2. Adja meg a Dinamikus DNS-fiók felhasználónevét és jelszavát.",
                "3. Írja be a dinamikus DNS szolgáltatótól kapott domain nevet.",
                "4. Válassza ki a Frissítési intervallumot a legördülő listából.",
                "5. Ha a szolgáltató NO-IP, akkor a WAN IP Binding biztosítja, hogy a domain név a router WAN IP-címéhez van kötve.",
                "6. Kattintson a Bejelentkezés és a Mentés gombra."]
} ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Ha új DDNS-fiókot szeretne használni, először jelentkezzen ki, majd jelentkezzen be az új fiókkal."
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"Dynamic DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "A Dinamikus DNS (Dynamic Domain Name System) segítségével dinamikus internetes IP-címhez fix hoszt gépet és domain nevet rendelhet. Ez hasznos, ha saját webhelyet, FTP-kiszolgálót vagy egy másik kiszolgálót üzemeltet a router mögött. Először is, regisztrálnia kell egy dinamikus DNS-szolgáltatónál, mint például a www.dyndns.com."
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"Domain név lista",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ez a táblázat az Ön cloud fiókja alatt regisztrált domainnevek adatait jeleníti meg."
                       } ,{                      
                           type: "step",
                           title: "Új domain név regisztrálása",
       content: [ 
                "1. Kattintson a Regisztráció gombra.",
                "2. Adja meg a regisztrálni kívánt domain nevet.",
                "3. Kattintson a Mentés gombra."]
}]
},
       ADVANCED_ROUTING_STATIC_ROUTING :{ 
               TITLE:"Statikus routing",
               CONTENT: [{
                           type: "paragraph",
                           content: "Statikus routing esetén előre rögzítik a hálózaton haladó információ csomagok útvonalát egy adott számítógéphez vagy a hálózathoz."
                       } ,{                      
                           type: "step",
                           title: "Statikus routing beállításához",
       content: [ 
                "1. Kattintson a Hozzáadás gombra.",
                "2. Adja meg az IP-címet a Célhálózat mezőben az ehhez a bejegyzéshez tartozó statikus útvonal kijelöléséhez.",
                "3. Adja meg az alhálózati maszkot az Alhálózati maszk mezőben az IP cím hálóati részének és hoszt részének meghatározásához.",
                "4. Adja meg az átjáró IP-címét az Alapértelmezett átjáró mezőben, hogy a routert csatlakoztassa a hálózathoz vagy a hoszthoz.",
                "5. Válassza ki a LAN vagy WAN elemet az Interfész mezőben, hogy meghatározza a Célhálózat típusát.",
                "6. Adja meg a bejegyzés rövid leírását.",
                "7. Válassza A bejegyzés bekapcsolása opciót.",
                "8. Kattintson a Mentés gombra."]
} ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Ha ki szeretné kapcsolni ezt a bejegyzést, kattintson az Izzó ikonra."
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"Rendszer Routing tábla",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti a jelenleg használt érvényes útvonalinformációkat."
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"Vezeték nélküli beállítások",
               CONTENT: [{
                           type: "paragraph",
                           content: "Állítsa be a vezeték nélküli beállításokat szükség szerint."
                       }]
},
       OFDMA :{ 
               TITLE:"OFDMA",
               CONTENT: [{
                           type: "paragraph",
                           content: "Az OFDMA lehetővé teszi, hogy több felhasználó egyszerre továbbítson adatokat, és ezáltal jelentősen javítja a sebességet és a hatékonyságot. Megjegyezzük, hogy csak akkor, ha a kliensek támogatják az OFDMA-t is."
                       }]
},
       WIRELESS_SMART_CONNECT :{ 
               TITLE:"Intelligens Csatlakozás",
               CONTENT: [{
                           type: "paragraph",
                           content: "Jelölje be ezt a jelölőnégyzetet az intelligens kapcsolat engedélyezéséhez. Ezzel a funkcióval a készülékek gyorsabban futhatnak, ha a legjobb vezeték nélküli sávokat a hálózati igények kiegyenlítésére vonatkozó tényleges feltételek alapján hozzák létre."
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"2,4 GHz-es vezeték nélküli",
               CONTENT: [{
                           type: "name",
                           title: "Hálózat neve (SSID)",
                           content: "Javasoljuk a hálózati név (SSID) megváltoztatását. Ez a mező kis- és nagybetűkre érzékeny."
                       } ,{                      
                           type: "name",
                           title: "SSID elrejtése",
                           content: "Válassza ki, hogy el szeretné-e elrejteni a 2,4 GHz-es hálózati nevet (SSID) a vezeték nélküli hálózat listájából. Ha kiválasztotta, az SSID nem fog sugározni, és manuálisan kell csatlakozni a hálózathoz."
                       } ,{                      
                           type: "name",
                           title: "Biztonság",
                           content: "Válasszon az alábbi biztonsági beállításokból:",
       children: [{                      
                           type: "name",
                           title: "Nincs biztonsági beállítás",
                           content: "Válassza ezt a lehetőséget a vezeték nélküli biztonság kikapcsolásához. Ez nem ajánlott."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Válassza ezt a lehetőséget a vezeték nélküli biztonság engedélyezéséhez. Erősen ajánlott a vezeték nélküli hálózat védelme a jogosulatlan hozzáférésekkel szemben. Ha be van jelölve, konfigurálja a következőket.",
       children: [{                      
                           type: "name",
                           title: "Verzió",
                           content: "Válasszon biztonsági verziót. Válasszon biztonsági verziót. A WPA2-PSK biztonságosabb. Ha nem biztos benne, válassza az Automatikus lehetőséget."
                       } ,{                      
                           type: "name",
                           title: "Titkosítás",
                           content: "Jelöljön ki egy biztonsági titkosítási típust. Az AES biztonságosabb. NEM ajánlott a TKIP titkosítás használata, ha a router 802.11n üzemmódban működik. Ezenkívül a TKIP használatával kikapcsolja a WPS funkciót. Ha nem biztos benne, válassza az Automatikus lehetőséget."
                       } ,{                      
                           type: "name",
                           title: "Jelszó",
                           content: "Adjon meg egy 8 és 63 közötti számú ASCII karaktert, vagy a 8 és 64 közötti számú hexadecimális karaktert tartalmazó vezeték nélküli jelszót."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA / WPA2-Enterprise",
                           content: "Válassza ezt a lehetőséget, a RADIUS (Remote Authentication Dial In User Service) szervert alkalmazó fejlettebb hitelesítési módszer bekapcsolásához. Ha ezt választja, WPS funkció le lesz tiltva.",
       children: [{                      
                           type: "name",
                           title: "Verzió",
                           content: "Válasszon biztonsági verziót. A WPA2 biztonságosabb. Ha nem biztos benne, válassza az Automatikus lehetőséget."
                       } ,{                      
                           type: "name",
                           title: "Titkosítás",
                           content: "Jelöljön ki egy biztonsági titkosítási típust. Az AES biztonságosabb. NEM ajánlott a TKIP titkosítás használata, ha a router 802.11n üzemmódban működik. Ezenkívül a TKIP használatával kikapcsolja a WPS funkciót. Ha nem biztos benne, válassza az Automatikus lehetőséget."
                       } ,{                      
                           type: "name",
                           title: "RADIUS szerver IP",
                           content: "Írja be a RADIUS szerver IP-címét."
                       } ,{                      
                           type: "name",
                           title: "RADIUS Port",
                           content: "Adja meg a RADIUS szerver port számát."
                       } ,{                      
                           type: "name",
                           title: "RADIUS jelszó",
                           content: "Adja meg a RADIUS szerver megosztott jelszavát."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Válassza ezt az opciót az alapvető hitelesítési mód engedélyezéséhez, ha bármelyik ügyféleszköz csak a WEP (Wired Equivalent Privacy) segítségével fér hozzá a vezeték nélküli hálózathoz. Ha kiválasztja, a WPS funkció le lesz tiltva.",
       children: [{                      
                           type: "name",
                           title: "Típus",
                           content: "Válasszon egy hitelesítési típust a vezeték nélküli hálózathoz. Ha nem biztos benne, válassza az Automatikus lehetőséget."
                       } ,{                      
                           type: "name",
                           title: "WEP kulcs formátum",
                           content: "Vagy használjon ASCII formátumot, vagy válassza a Hexadecimálist. Az ASCII formátum alfabetikus és numerikus karakterek kombinációja. A Hexadecimális formátum számok (0-9) és betűk (A-F, a-f) kombinációja."
                       } ,{                      
                           type: "name",
                           title: "Kulcs típus",
                           content: "Válassza ki a WEP kulcs hosszát.",
       children: [{                      
                           type: "name",
                           title: "64 bites",
                           content: "10 hexadecimális számjegy (0-9, A-F, a-f) vagy 5 ASCII karakter írható a WEP érték mezőbe."
                       } ,{                      
                           type: "name",
                           title: "128 bites",
                           content: "26 hexadecimális számjegy (0-9, A-F, a-f) vagy 13 ASCII karakter írható a WEP érték mezőbe."
                       }]
} ,{                      
                           type: "name",
                           title: "Kulcs érték",
                           content: "Írja be a WEP kulcsot a megfelelő mezőbe."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Csatorna",
                           content: "Válasszon egy csatornát a 2,4 GHz-es vezeték nélküli hálózathoz. Javasoljuk, hogy hagyja a csatornát Auto módban, ha nem tapasztalja a vezeték nélküli kapcsolat szakadozását. "
                       } ,{                      
                           type: "name",
                           title: "Átviteli teljesítmény",
                           content: "Válassza ki a magas, közepes vagy alacsony értéket az adatátviteli teljesítmény meghatározásához. Az ajánlott és alapértelmezett beállítása a magas."
                       } ,{                      
                           type: "name",
                           id: "atf_2g4",
                           title: "Airtime Fairness funkció",
                           content: "Jelölje be ezt a jelölőnégyzetet az Airtime Fairness (ATF) funkció engedélyezéséhez, amely lehetővé teszi az egyes adatfolyamok áteresztőképességének optimalizálását. Az ATF forgalom ütemezője a rendeltetési helyre vonatkozó célállomásokat használja az adatfolyamok céljai közötti időhasználat kiegyensúlyozására."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_2g4",
                           title: "Multi-User MIMO funkció",
                           content: "Kattintson a Többfelhasználós MIMO funkció bekapcsolásához. "
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"5 GHz-es vezeték nélküli",
               CONTENT: [{
                           type: "name",
                           title: "Hálózat neve (SSID)",
                           content: "Javasoljuk a hálózati név (SSID) megváltoztatását. Ez a mező kis- és nagybetűkre érzékeny."
                       } ,{                      
                           type: "name",
                           title: "SSID elrejtése",
                           content: "Válassza ki, hogy el kívánja-e rejteni az 5 GHz-es hálózati nevet (SSID) a vezeték nélküli hálózat listájáról. Ha kiválasztotta, az SSID nem fog sugározni, és manuálisan kell csatlakozni a hálózathoz."
                       } ,{                      
                           type: "name",
                           title: "Biztonság",
                           content: "Válasszon az alábbi biztonsági beállításokból:",
       children: [{                      
                           type: "name",
                           title: "Nincs biztonsági beállítás",
                           content: "Válassza ezt a lehetőséget a vezeték nélküli biztonság kikapcsolásához. Ez nem ajánlott."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Válassza ezt a lehetőséget a vezeték nélküli biztonság bekapcsolásához. Erősen ajánlott a vezeték nélküli hálózat védelme a jogosulatlan hozzáférésekkel szemben. Ha be van jelölve, konfigurálja a következőket.",
       children: [{                      
                           type: "name",
                           title: "Verzió",
                           content: "Válasszon biztonsági verziót. A WPA2-PSK biztonságosabb. Ha nem biztos benne, válassza az Automatikus lehetőséget."
                       } ,{                      
                           type: "name",
                           title: "Titkosítás",
                           content: "Jelöljön ki egy biztonsági titkosítási típust. Az AES biztonságosabb. NEM ajánlott a TKIP titkosítás használata, ha a router 802.11n üzemmódban működik. Ezenkívül a TKIP használatával kikapcsolja a WPS funkciót. Ha nem biztos benne, válassza az Automatikus lehetőséget."
                       } ,{                      
                           type: "name",
                           title: "Jelszó",
                           content: "Adjon meg egy 8 és 63 közötti számú ASCII karaktert, vagy a 8 és 64 közötti számú hexadecimális karaktert tartalmazó vezeték nélküli jelszót."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA / WPA2-Enterprise",
                           content: "Válassza ezt a lehetőséget, a RADIUS (Remote Authentication Dial In User Service) szervert alkalmazó fejlettebb hitelesítési módszer bekapcsolásához. Ha ezt választja, WPS funkció le lesz tiltva.",
       children: [{                      
                           type: "name",
                           title: "Verzió",
                           content: "Válasszon biztonsági verziót. A WPA2 biztonságosabb. Ha nem biztos benne, válassza az Automatikus lehetőséget."
                       } ,{                      
                           type: "name",
                           title: "Titkosítás",
                           content: "Jelöljön ki egy biztonsági titkosítási típust. Az AES biztonságosabb. NEM ajánlott a TKIP titkosítás használata, ha a router 802.11n üzemmódban működik. Ezenkívül a TKIP használatával kikapcsolja a WPS funkciót. Ha nem biztos benne, válassza az Automatikus lehetőséget."
                       } ,{                      
                           type: "name",
                           title: "RADIUS szerver IP",
                           content: "Írja be a RADIUS szerver IP-címét."
                       } ,{                      
                           type: "name",
                           title: "RADIUS Port",
                           content: "Adja meg a RADIUS szerver port számát."
                       } ,{                      
                           type: "name",
                           title: "RADIUS jelszó",
                           content: "Adja meg a RADIUS szerver megosztott jelszavát."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Válassza ezt az opciót az alapvető hitelesítési mód engedélyezéséhez, ha bármelyik ügyféleszköz csak a WEP (Wired Equivalent Privacy) segítségével fér hozzá a vezeték nélküli hálózathoz. Ha kiválasztja, a WPS funkció le lesz tiltva.",
       children: [{                      
                           type: "name",
                           title: "Típus",
                           content: "Válasszon egy hitelesítési típust a vezeték nélküli hálózathoz. Ha nem biztos benne, válassza az Automatikus lehetőséget."
                       } ,{                      
                           type: "name",
                           title: "WEP kulcs formátum",
                           content: "Vagy használjon ASCII formátumot, vagy válassza a Hexadecimálist. Az ASCII formátum alfabetikus és numerikus karakterek kombinációja. A Hexadecimális formátum számok (0-9) és betűk (A-F, a-f) kombinációja."
                       } ,{                      
                           type: "name",
                           title: "Kulcs típus",
                           content: "Válassza ki a WEP kulcs hosszát.",
       children: [{                      
                           type: "name",
                           title: "64 bites",
                           content: "10 hexadecimális számjegy (0-9, A-F, a-f) vagy 5 ASCII karakter írható a WEP érték mezőbe."
                       } ,{                      
                           type: "name",
                           title: "128 bites",
                           content: "26 hexadecimális számjegy (0-9, A-F, a-f) vagy 13 ASCII karakter írható a WEP érték mezőbe."
                       }]
} ,{                      
                           type: "name",
                           title: "Kulcs érték",
                           content: "Írja be a WEP kulcsot a megfelelő mezőbe."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Csatorna",
                           content: "Válasszon egy csatornát az 5GHz-es vezeték nélküli hálózathoz. Javasoljuk, hogy hagyja a csatornát Auto módban, ha nem tapasztalja a vezeték nélküli kapcsolat szakadozását. "
                       } ,{                      
                           type: "name",
                           title: "Átviteli teljesítmény",
                           content: "Válassza ki a magas, közepes vagy alacsony értéket az adatátviteli teljesítmény meghatározásához. Az ajánlott és alapértelmezett beállítása a magas."
                       } ,{                      
                           type: "name",
                           id: "atf_5g",
                           title: "Airtime Fairness funkció",
                           content: "Jelölje be ezt a jelölőnégyzetet az Airtime Fairness (ATF) funkció engedélyezéséhez, amely lehetővé teszi az egyes adatfolyamok áteresztőképességének optimalizálását. Az ATF forgalom ütemezője a rendeltetési helyre vonatkozó célállomásokat használja az adatfolyamok céljai közötti időhasználat kiegyensúlyozására."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_5g",
                           title: "Multi-User MIMO funkció",
                           content: "Kattintson a Többfelhasználós MIMO funkció bekapcsolásához. "
                       }]
},
       WPS :{ 
               TITLE:"WPS",
               CONTENT: [{
                           type: "paragraph",
                           content: "A WPS (Wi-Fi Protected Setup) egyszerűsíti a biztonságos Wi-Fi kapcsolat beállítását."
                       } ,{                      
                           type: "name",
                           title: "Gombnyomás (ajánlott)",
       content: [ 
                "Ez a módszer lehetővé teszi a WPS-kompatibilis eszközök és a vezeték nélküli hálózatok egyszerű csatlakoztatását.",
                "Kattintson a WPS indítása gombra a képernyőn. Két percen belül nyomja meg a kliens eszköz WPS gombját."]
} ,{                      
                           type: "name",
                           title: "Router PIN",
       content: [ 
                "Az alapértelmezett PIN a router címkéjén található.",
                "Az Új PIN létrehozásához kattintson a Generálás gombra, vagy kattintson az Alapértelmezett gombra az aktuális PIN kód gyári alapértelmezett PIN kódra visszaállításához."]
} ,{                      
                           type: "name",
                           title: "Kliens PIN",
       content: [ 
                "Ez a módszer lehetővé teszi vezeték nélküli eszköz hozzáadását manuálisan.",
                "Írja be a készülék PIN kódját a mezőbe, majd kattintson a Csatlakozás gombra."]
}]
},
       WIRELESS_STATISTICS :{ 
               TITLE:"A vezeték nélküli állomások kapcsolódva",
               CONTENT: [{
                           type: "name",
                           title: "Összes kliens",
                           content: "Megjeleníti a kapcsolódó vezeték nélküli kliensek számát."
                       } ,{                      
                           type: "name",
                           title: "MAC cím",
                           content: "Megjeleníti a kapcsolódó vezeték nélküli kliensek MAC címét."
                       } ,{                      
                           type: "name",
                           title: "Kapcsolat típus",
                           content: "Megjeleníti a hozzá tartozó vezeték nélküli kliens vezeték nélküli frekvenciasávját (2,4 GHz vagy 5 GHz)."
                       } ,{                      
                           type: "name",
                           title: "Biztonság",
                           content: "Megjeleníti a a kapcsolódó vezeték nélküli kliens biztonsági típusát."
                       } ,{                      
                           type: "name",
                           title: "Fogadott csomagok",
                           content: "Megjeleníti a kapcsolódó vezeték nélküli kliens fogadott csomagjainak számát."
                       } ,{                      
                           type: "name",
                           title: "Elküldött csomagok",
                           content: "Megjeleníti a kapcsolódó vezeték nélküli kliens küldött csomagjainak számát."
                       } ,{                      
                           type: "paragraph",
                           content: "A Frissítés gomb megnyomásával frissítheti az oldal adatait."
                       }]
},
       WIRELESS_SCHEDULE :{ 
               TITLE:"Vezeték nélküli időzítés",
               CONTENT: [{
                           type: "paragraph",
                           content: "A vezeték nélküli időzítés használatával kikapcsolhatja a vezeték nélküli jelet egy adott időszak alatt. A vezeték nélküli jelet például 00:00 és 07:00 között kikapcsolhatja."
                       } ,{                      
                           type: "name",
                           title: "Kikapcsolt vezeték nélküli idő",
                           content: "Megjeleníti az időszak(oka)t, amely alatt a vezeték nélküli jel ki van kapcsolva.",
       children: [{                      
                           type: "step",
                           title: "A vezeték nélküli kikapcsolási idő beállításához",
       content: [ 
                "1. Kattintson a Hozzáadás gombra.",
                "2. Állítsa be azt az időtartamot, amely alatt a vezeték nélküli jel ki lesz kapcsolva.",
                "3. Válassza ki az ismétlési napokat. Kiválaszthatja a \"Minden nap\" beállítást vagy bizonyos napokat.",
                "4. Kattintson a Mentésre."]
}]
}]
},
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"Beállítások",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ez a funkció lehetővé teszi, hogy Wi-Fi hozzáférést biztosítson a vendégek számára anélkül, hogy megnyitná a fő hálózatot."
                       } ,{                      
                           type: "name",
                           title: "A vendégek elérhetik egymást",
                           content: "Jelölje be ezt a jelölőnégyzetet, hogy a vendég hálózaton lévő vezeték nélküli eszközök egymással kommunikálhassanak egymással, például a hálózati szomszédok, a Samba, a Ping és az FTP segítségével."
                       } ,{                      
                           type: "name",
                           id: "access_local",
                           title: "A vendégek számára a Helyi hálózat elérhetővé tétele",
                           content: "Jelölje be ezt a jelölőnégyzetet, hogy a vendég hálózaton lévő vezeték nélküli eszközök kommunikálhassanak az útválasztó LAN-portjain vagy főhálózatán keresztül csatlakoztatott eszközökön, például a hálózati szomszédok, a Samba, a Ping és az FTP segítségével."
                       }]
},
       GUEST_NETWORK_WIRELESS :{ 
               TITLE:"2,4GHz/5GHz Vezeték nélküli",
               CONTENT: [{
                           type: "name",
                           title: "Vendéghálózat bekapcsolása",
                           content: "Jelölje be ezt a négyzetet, a vendéghálózat funkció bekapcsolásához."
                       } ,{                      
                           type: "name",
                           title: "Hálózat neve (SSID)",
                           content: "Vagy az alapértelmezett Guest SSID-t használja, vagy hozzon létre egy új nevet (legfeljebb 32 karakter)."
                       } ,{                      
                           type: "name",
                           title: "SSID elrejtése",
                           content: "Jelölje be ezt az opciót, ha azt szeretné, hogy elrejtse a Guest SSID-t a Wi-Fi hálózatok listájáról."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Jelszó frissítési időszak",
                           content: "Válassza ki a vendég hálózati jelszó frissítési intervallumát."
                       } ,{                      
                           type: "name",
                           title: "Biztonság",
                           content: "Ha úgy dönt, hogy soha nem frissíti a jelszót, válasszon az alábbi biztonsági beállításokból:",
       children: [{                      
                           type: "name",
                           title: "Nincs biztonsági beállítás",
                           content: "Válassza ezt a lehetőséget a vezeték nélküli biztonság kikapcsolásához. Ez nem ajánlott."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Válassza ezt a lehetőséget a vezeték nélküli biztonság bekapcsolásához. Erősen ajánlott a Vendég hálózat védelme a jogosulatlan hozzáférésekkel szemben. Ha be van jelölve, konfigurálja a következőket.",
       children: [{                      
                           type: "name",
                           title: "Verzió",
                           content: "Válasszon biztonsági verziót. A WPA2-PSK biztonságosabb. Ha nem biztos benne, válassza az Automatikus lehetőséget."
                       } ,{                      
                           type: "name",
                           title: "Titkosítás",
                           content: "Jelöljön ki egy biztonsági titkosítási típust. Az AES biztonságosabb. NEM ajánlott a TKIP titkosítás használata, ha a router 802.11n üzemmódban működik. Ezenkívül a TKIP használatával kikapcsolja a WPS funkciót. Ha nem biztos benne, válassza az Automatikus lehetőséget."
                       }]
} ,{                      
                           type: "name",
                           id: "portal-help-title",
                           title: "Portál",
                           content: "A portál-hitelesítés növeli a hálózati biztonságot, hitelesítést kérésével azoktól az ügyfelektől, akik átmeneti hozzáférést igényelnek a vezeték nélküli hálózathoz."
                       } ,{                      
                           type: "step",
                           id: "portal-help-content",
                           title: "A portál hitelesítésének beállítása:",
       content: [ 
                "1. Válassza a Biztonsági Portál elemet.",
                "2. Válassza az Egyszerű jelszó vagy a Hitelesítés nélküli hitelesítés lehetőséget.",
                "A. Egyszerű jelszó - Adjon meg egy jelszót a hitelesítéshez (8-16 alfa karakter, szám és _).",
                "B. Nincs hitelesítés - Az ügyfelek bármilyen hitelesítés nélkül hozzáférhetnek a hálózathoz.",
                "3. Válassza a 1 óra, 2 óra, 4 óra, 8 óra vagy Mindig a hitelesítési időkorlátot. Ha az ügyfél hitelesítése lejár, újra be kell jelentkeznie a hozzáférés hitelesítéséhez.",
                "4. (Választható) Engedélyezze az átirányítást, és szükség szerint adja meg az átirányított URL-címet. Ezután egy újonnan hitelesített ügyfél át lesz irányítva a megadott URL-re.",
                "5. (Választható) A hitelesítési bejelentkezési oldalt testre is szabhatja.",
                "A. Portál címe - legfeljebb 31 karakter.",
                "B. Használati feltételek - Legfeljebb 1023 karakter.",
                "C. Logó kép - Töltsön fel JPG vagy PNG képet (kevesebb mint 100 KB) a logó testreszabásához.",
                "D. Háttérkép - JPG vagy PNG kép feltöltése (kevesebb, mint 2 MB) a háttér testreszabásához.",
                "6. Kattintson a Mentés gombra."]
}]
} ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Jelszó",
                           content: "Hozzon létre jelszót 8 és 63 ASCII karakter között, vagy 8 és 64 hexadecimális karakter között (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Jelszó",
                           content: "Használja a véletlenszerűen generált jelszót, vagy hozzon létre egy 8 és 63 közötti számő ASCII karakterből vagy 8 és 64 közötti számú hexadecimális karakterből (0-9, A-F, A-F) álló jelszót."
                       }]
},
       NAT :{ 
               TITLE:"ALG",
               CONTENT: [{
                           type: "paragraph",
                           content: "Az ALG (Application Layer Gateway) lehetővé teszi a testreszabott NAT (Network Address Translation) keresztirányú szűrők hozzáadását a gatewayhez, hogy támogassa a cím és a portok fordítását bizonyos alkalmazási réteg \"vezérlő / adat\" protokollokhoz: FTP, TFTP, H323 stb. Az ALG bekapcsolása ajánlott."
                       } ,{                      
                           type: "name",
                           title: "FTP ALG bekapcsolása",
                           content: "Ha kiválasztásra kerül, lehetővé teszi az FTP (File Transfer Protocol) kliensek és szerverek számára az adatátvitelt NAT-on keresztül. "
                       } ,{                      
                           type: "name",
                           title: "TFTP ALG bekapcsolása",
                           content: "Ha kiválasztásra kerül, ez lehetővé teszi TFTP (Trivial File Transfer Protocol) kliensek és szerverek számára az adattovábbítást NAT-on keresztül."
                       } ,{                      
                           type: "name",
                           title: "H323 ALG bekapcsolása",
                           content: "Ha kiválasztásra került, lehetővé teszi a Microsoft NetMeeting kliensek kommunikációját NAT-on keresztül."
                       } ,{                      
                           type: "name",
                           title: "RTSP ALG bekapcsolása",
                           content: "Ha kiválasztásra került, ez lehetővé teszi, a médialejátszó kliensek kommunikációját a streaming média szerverekkel NAT-on keresztül."
                       } ,{                      
                           type: "name",
                           title: "SIP ALG bekapcsolása",
                           content: "Ha kiválasztja, lehetővé teszi az kliensek számára, hogy kommunikáljanak a SIP (Session Initiation Protocol) kiszolgálókkal a NAT-on keresztül."
                       } ,{                      
                           type: "name",
                           title: "PPTP Passthrough bekapcsolása",
                           content: "Ha kiválasztásra került, ez lehetővé teszi, pont-pont kapcsolatok alagútban vezetését egy IP hálózaton keresztül a routeren áthaladva. "
                       } ,{                      
                           type: "name",
                           title: "L2TP Passthrough bekapcsolása",
                           content: "Ha kiválasztásra került, ez lehetővé teszi Layer 2 pont-pont kapcsolatok alagútban vezetését egy IP hálózaton keresztül a routeren áthaladva. "
                       } ,{                      
                           type: "name",
                           title: "IPSec Passthrough bekapcsolása",
                           content: "Ha be van jelölve, lehetővé teszi az IPSec (Internet Protocol security) IP-hálózaton keresztülvezetését és az útválasztón történő átadását. Az IPSec kriptográfiai biztonsági szolgáltatásokat használ a magánhálózatok és a biztonságos IP-hálózatok közötti kommunikáció biztosítására."
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"Virtuális szerverek",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "A Virtuális szerverekkel publikus szolgáltatásokat állíthat be a helyi hálózaton. Egy virtuális szerver egy külső portként kerül meghatározásra, és minden az Internetről erre a külső portra érkező kérés egy statikus vagy fenntartott címmel rendelkező számítógépre kerül továbbításra. ",
                "Ha felépít egy szervert a helyi hálózaton, és meg szeretné osztani azt az interneten, a virtuális szerverek megvalósíthatják a szolgáltatást, és biztosíthatják azt az internet-felhasználóknak."]
} ,{                      
                           type: "paragraph",
                           content: "A táblázat a virtuális kiszolgáló legfontosabb paramétereit jeleníti meg."
                       } ,{                      
                           type: "name",
                           title: "A szolgáltatás típusa",
                           content: "Megjeleníti a virtuális kiszolgáló nevét."
                       } ,{                      
                           type: "name",
                           title: "külső Port",
                           content: "Megjeleníti a virtuális szerver által használt port számát vagy porttartományát."
                       } ,{                      
                           type: "name",
                           title: "belső IP",
                           content: "Megjeleníti a szolgáltatást futtató számítógép IP címét."
                       } ,{                      
                           type: "name",
                           title: "belső port",
                           content: "Megjeleníti a szolgáltatást futtató számítógép port számát."
                       } ,{                      
                           type: "name",
                           title: "Protokoll",
                           content: "Megjeleníti a szolgáltatáshoz alkalmazott protokollt: TCP, UDP vagy Mind (Minden, a router által támogatott protokoll)."
                       } ,{                      
                           type: "name",
                           title: "Állapot",
                           content: "Megjeleníti az adott szűrési szabály aktuális állapotát (bekapcsolt vagy kikapcsolt)."
                       } ,{                      
                           type: "name",
                           title: "Módosít",
                           content: "Megjeleníti az adott szabály Módosítási vagy Törlési lehetőségét."
                       } ,{                      
                           type: "step",
                           title: "Egy Virtuális szerver beállításához",
       content: [ 
                "1. Kattintson a Hozzáadás gombra.",
                "2. Kattintson a Meglévő szolgáltatások megtekintésére egy a listában található szolgáltatáshoz tartozó port számnak a Külső port és a Belső port mezőkhöz történő automatikus hozzáadásához. ",
                "3. Válasszon ki egy protokollt a szolgáltatáshoz a legördülő listából: TCP, UDP vagy Mind",
                "4. Válassza ki a Bejegyzés bekapcsolása opciót.",
                "5. Kattintson a Mentés gombra."]
} ,{                      
                           type: "note",
                           title: "Megjegyzés ",
       content: [ 
                "1. Ha ki szeretné kapcsolni ezt a bejegyzést, kattintson az Izzó ikonra.",
                "2. A belső port és a protokoll alapértelmezett beállításainak megtartása javasolt, ha nem egyértelmű, hogy melyik portot vagy protokollt használja.",
                "3. Ha a helyi hoszt eszköz többféle elérhető szolgáltatást kínál, akkor minden egyes szolgáltatáshoz létre kell hoznia egy szabályt. Kérjük, vegye figyelembe, hogy a Külső port NEM lehet átfedésben."]
}]
},
       PORT_TRIGGERING :{ 
               TITLE:"Port triggering",
               CONTENT: [{
                           type: "paragraph",
                           content: "A Port Triggering segítségével egy adott port forgalma egy a hálózaton található meghatárott szerverre továbbítható."
                       } ,{                      
                           type: "paragraph",
                           content: "A táblázat a port triggerelés legfontosabb paramétereit jeleníti meg."
                       } ,{                      
                           type: "name",
                           title: "Alkalmazás",
                           content: "Megjeleníti az alkalmazás nevét."
                       } ,{                      
                           type: "name",
                           title: "Kiváltó port",
                           content: "Megjeleníti annak a kimenő forgalmi portot, amely kiváltja a kimenő kapcsolat szűrési szabályát."
                       } ,{                      
                           type: "name",
                           title: "Trigger protokoll",
                           content: "Megjeleníti a Triggering port által használt protokollt. TCP, UDP vagy Mind (Minden, a router által támogatott protokoll)."
                       } ,{                      
                           type: "name",
                           title: "külső Port",
                           content: "Megjeníti a távoli rendszer által használt portot vagy port tartományt. Ezen portok egyikére érkező válasz továbbításra kerül arra a PC-re, amely kiváltja ezt a szabályt. 5 különbüző port csoportot vagy port szekciót választhat ki. Minden port csoportot vesszővel (\",\") kell elválasztani. Például: 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
                       } ,{                      
                           type: "name",
                           title: "Külső protokoll",
                           content: "Megjeleníti a Bejövő portnál használt protokollt: TCP, UDP vagy MIND (Minden, a router által támogatott protokoll)."
                       } ,{                      
                           type: "name",
                           title: "Állapot",
                           content: "Megjeleníti az adott szűrési szabály aktuális állapotát (bekapcsolt vagy kikapcsolt)."
                       } ,{                      
                           type: "name",
                           title: "Módosít",
                           content: "Megjeleníti az adott szabály Módosítási vagy Törlési lehetőségét."
                       } ,{                      
                           type: "step",
                           title: "Egy Port Triggering szabály beállításához",
       content: [{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Minden szabály egyszerre csak egy hoszt használhat."
                       },
                "1. Kattintson a Hozzáadás gombra.",
                "2. Kattintson a Meglévő szolgáltatások megtekintésére egy a listában található alkalmazáshoz tartozó alapértékek megfelelő mezőkhöz történő automatikus hozzáadásához. Ha egy a listában nem szereplő alkalmazást szeretne hozzáadni, adja meg az Alkalmazást, a Triggering Portot, a Triggering protokollt, a Külső portot és a Külső protokollt. ",
                "3. Válassza a Bejegyzés bekapcsolása opciót.",
                "4. Kattintson a Mentésre."]
} ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Ha ki szeretné kapcsolni ezt a szabályt, kattintson az Izzó ikonra."
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "A DMZ (demilitarizált zóna) hoszt funkció lehetővé teszi egy helyi számítógép megnyitását az internet felé egy speciális célú szolgáltatáshoz, például internetes játékhoz vagy videokonferenciához. Alapvetően a DMZ lehetővé teszi, hogy egyetlen LAN hálózati számítógép megnyissa az összes portját. Ezt a számítógépet statikus IP-címmel kell konfigurálni, és a DHCP-kliens funkciót letiltja."
                       } ,{                      
                           type: "paragraph",
                           content: "Ha a DMZ be van kapcsolva, a DMZ hoszt teljesen ki van szolgáltatva az internetnek, ami potenciális veszélyt jelenthet a számítógépre. Ha a DMZ nincs használatban, kérjük, időben kapcsolja ki."
                       } ,{                      
                           type: "step",
                           title: "Egy számítógép vagy szerver DMZ szerverként történő kijelöléséhez",
       content: [ 
                "1. Kapcsolja be a DMZ-t.",
                "2. A DMZ Hoszt IP cím mezőbe írja be a DMZ hosztként beállítani kívánt hely számítógép IP címét.",
                "3. Kattintson a Mentés gombra."]
}]
},
       UPNP :{ 
               TITLE:"UPnP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Alapértelmezés szerint az UPnP (Universal Plug-and-Play) szolgáltatás lehetővé teszi az eszközök, például számítógépek és internetes készülékek számára, hogy automatikusan felfedezzék egymást és kommunikáljanak egymással a helyi hálózaton."
                       } ,{                      
                           type: "paragraph",
                           content: "Előfordulhat, hogy engedélyeznie kell az UPnP-t olyan alkalmazásokhoz, mint a többjátékosos játékok, a peer-to-peer kapcsolatok, a valós idejű kommunikáció (például VoIP vagy teleVoIP konferencia) vagy távoli segítség stb."
                       } ,{                      
                           type: "name",
                           title: "UPnP Szolgáltatás lista",
                           content: "Az UPnP szolgáltatáslistában megjelenik a helyi hoszt(ok) UPnP információja."
                       }]
},
       MODEM :{ 
               TITLE:"3G / 4G Súgó",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB Modem",
                           content: "Megjeleníti a 3G / 4G USB modem állapotát."
                       } ,{                      
                           type: "name",
                           title: "Az automatikusan azonosított szolgáltatói paraméterek használata",
                           content: "Ez a funkció alapértelmezés szerint be van kapcsolva. Ha be van kapcsolva, a router képes azonosítani a SIM / UIM kártya internetszolgáltatóját, és automatikusan kitölteni a paramétereket. Ha az azonosítás sikertelen, kérjük, válassza ki a régiót és a mobil ISP-t manuálisan."
                       } ,{                      
                           type: "name",
                           title: "Régió ",
                           content: "Automatikusan kiválasztja és megjeleníti a régiót, amikor az USB modemet és a SIM-kártyát sikeresen azonosítja. Ha nem, válassza ki a régiót a legördülő menüből."
                       } ,{                      
                           type: "name",
                           title: "Mobilszolgáltató",
                           content: "Megjeleníti a 3G / 4G hálózati szolgáltatót. Ha nem észleli automatikusan, válassza ki az ISP-t a legördülő menüből. Az alapértelmezett tárcsázási szám és az APN ennek megfelelően automatikusan feltöltődik."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "Ha a SIM / UIM védelem engedélyezve van, írja be a PIN kódot. A SIM / UIM védelem alapértelmezés szerint le van tiltva. Kérjük, vegye figyelembe, hogy ha érvénytelen PIN-kódot ad meg 3 alkalommal, a SIM / UIM kártya automatikusan zárolásra kerül. Csak akkor nyithatja meg, ha a PUK kódot a PC / laptopról adja meg."
                       } ,{                      
                           type: "name",
                           title: "Üzenet",
                           content: "Megjeleníti a SIM / UIM kártya PIN-adatait, ha a PIN-védelem engedélyezve van."
                       } ,{                      
                           type: "name",
                           title: "Állítsa be a tárcsázási számot, az APN-t, a felhasználónevet és a jelszót manuálisan",
                           content: "Ha az szolgáltató nem szerepel a <strong> Mobil ISP </ strong> listán, jelölje be ezt a jelölőnégyzetet, és írja be szolgáltató által biztosított telefonszámot, az APN-t (hozzáférési pont neve), a felhasználónevet és a jelszót."
                       } ,{                      
                           type: "name",
                           title: "Betárcsázási szám",
                           content: "Adja meg a szolgáltató által biztosított betárcsázási számot."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Adja meg a szolgáltató által biztosított APN (Access Point Name) nevet."
                       } ,{                      
                           type: "name",
                           title: "Felhasználónév/Jelszó",
                           content: "Adja meg a szolgáltató által megadott felhasználónevet és jelszót. Ügyeljen a kis-és nagybetűkre."
                       } ,{                      
                           type: "name",
                           title: "Csatlakozás kérésre",
                           content: "Ebben az üzemmódban az internetkapcsolat automatikusan megszakad egy meghatározott inaktív időszak (Max Idle Time) elteltével. A kapcsolat helyreáll, amikor megpróbálja elérni az internetet újra."
                       } ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Előfordulhat, hogy a kapcsolat nem bontható akkor sem, ha megadta a maximális üresjárati időt, mivel egyes alkalmazások továbbra is elérik az internetet a háttérben."
                       } ,{                      
                           type: "name",
                           title: "Automatikus csatlakozás",
                           content: "Ebben az üzemmódban az internetkapcsolat automatikusan újra csatlakozik, amikor megszakad."
                       } ,{                      
                           type: "name",
                           title: "Manuális csatlakozás",
                           content: "Ebben a módban a Csatlakozás vagy a Szétkapcsolás gombra kattintva manuálisan vezérelheti az internetkapcsolatot. Ez a mód támogatja a Max Idle Time funkciót is. Adja meg a maximális üresjárati időtartamot (percben), melyet követően az internetkapcsolat megszakad. Az alapértelmezett érték 15 perc. Ha azt szeretné, hogy az internetkapcsolat mindig aktív maradjon, írja be a 0 (nulla) értéket."
                       } ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Előfordulhat, hogy a kapcsolat nem bontható akkor sem, ha megadta a maximális üresjárati időt, mivel egyes alkalmazások továbbra is elérik az internetet a háttérben."
                       } ,{                      
                           type: "paragraph",
                           content: "Kattintson a Mentés gombra a beállítások mentéséhez."
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"3G / 4G Speciális beállítások súgója",
               CONTENT: [{
                           type: "name",
                           title: "3G / 4G USB modem",
                           content: "Megjeleníti a 3G / 4G USB modem állapotát."
                       } ,{                      
                           type: "name",
                           title: "Az automatikusan azonosított szolgáltatói paraméterek használata",
                           content: "Ez a funkció alapértelmezés szerint be van kapcsolva. Ha be van kapcsolva, a router képes azonosítani a SIM / UIM kártya internetszolgáltatóját, és automatikusan kitölteni a paramétereket. Ha az azonosítás sikertelen, kérjük, válassza ki a régiót és a mobil ISP-t manuálisan."
                       } ,{                      
                           type: "name",
                           title: "Régió ",
                           content: "Automatikusan kiválasztja és megjeleníti a régiót, amikor az USB modemet és a SIM-kártyát sikeresen azonosítja. Ha nem, válassza ki a régiót a legördülő menüből."
                       } ,{                      
                           type: "name",
                           title: "Mobilszolgáltató",
                           content: "Megjeleníti a 3G / 4G hálózati szolgáltatót. Ha nem észleli automatikusan, válassza ki az ISP-t a legördülő menüből. Az alapértelmezett tárcsázási szám és az APN ennek megfelelően automatikusan feltöltődik."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "Ha a SIM / UIM védelem engedélyezve van, írja be a PIN kódot. A SIM / UIM védelem alapértelmezés szerint le van tiltva. Kérjük, vegye figyelembe, hogy ha érvénytelen PIN-kódot ad meg 3 alkalommal, a SIM / UIM kártya automatikusan zárolásra kerül. Csak akkor nyithatja meg, ha a PUK kódot a PC / laptopról adja meg."
                       } ,{                      
                           type: "name",
                           title: "Üzenet",
                           content: "Megjeleníti a SIM / UIM kártya PIN-adatait, ha a PIN-védelem engedélyezve van."
                       } ,{                      
                           type: "name",
                           title: "Állítsa be a tárcsázási számot, az APN-t, a felhasználónevet és a jelszót manuálisan",
                           content: "Ha az szolgáltató nem szerepel a <strong> Mobil ISP </ strong> listán, jelölje be ezt a jelölőnégyzetet, és írja be szolgáltató által biztosított telefonszámot, az APN-t (hozzáférési pont neve), a felhasználónevet és a jelszót."
                       } ,{                      
                           type: "name",
                           title: "Betárcsázási szám",
                           content: "Adja meg a szolgáltató által biztosított betárcsázási számot."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Adja meg a szolgáltató által biztosított APN (Access Point Name) nevet."
                       } ,{                      
                           type: "name",
                           title: "Felhasználónév/Jelszó",
                           content: "Adja meg a szolgáltató által megadott felhasználónevet és jelszót. Ügyeljen a kis-és nagybetűkre."
                       } ,{                      
                           type: "name",
                           title: "Csatlakozás kérésre",
                           content: "Ebben az üzemmódban az internetkapcsolat automatikusan megszakad egy meghatározott inaktív időszak (Max Idle Time) elteltével. A kapcsolat helyreáll, amikor megpróbálja elérni az internetet újra."
                       } ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Előfordulhat, hogy a kapcsolat nem bontható akkor sem, ha megadta a maximális üresjárati időt, mivel egyes alkalmazások továbbra is elérik az internetet a háttérben."
                       } ,{                      
                           type: "name",
                           title: "Automatikus csatlakozás",
                           content: "Ebben az üzemmódban az internetkapcsolat automatikusan újra csatlakozik, amikor megszakad."
                       } ,{                      
                           type: "name",
                           title: "Manuális csatlakozás",
                           content: "Ebben a módban a Csatlakozás vagy a Szétkapcsolás gombra kattintva manuálisan vezérelheti az internetkapcsolatot. Ez a mód támogatja a Max Idle Time funkciót is. Adja meg a maximális üresjárati időtartamot (percben), melyet követően az internetkapcsolat megszakad. Az alapértelmezett érték 15 perc. Ha azt szeretné, hogy az internetkapcsolat mindig aktív maradjon, írja be a 0 (nulla) értéket."
                       } ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Előfordulhat, hogy a kapcsolat nem bontható akkor sem, ha megadta a maximális üresjárati időt, mivel egyes alkalmazások továbbra is elérik az internetet a háttérben."
                       } ,{                      
                           type: "name",
                           title: "Hitelesítési típus",
                           content: "Válasszon egy hitelesítési típust. Az alapértelmezett beállítás az Auto. Néhány internetszolgáltatónak szüksége van egy bizonyos hitelesítési típusra, kérjük, egyeztesse az internetszolgáltatóval vagy tartsa meg az alapértelmezett beállításokat."
                       } ,{                      
                           type: "name",
                           title: "Auto",
                           content: "Ha az Auto (alapértelmezett), az útválasztó automatikusan meghatározza a szolgáltató által használt hitelesítési típust."
                       } ,{                      
                           type: "name",
                           title: "PAP",
                           content: "Ha a PAP (Password Authentication Protocol) protokollt használja, az útválasztó két kézfogással használja a peer-t az azonosításhoz. Ezt az opciót akkor válassza, ha a szolgáltató ezt a hitelesítési típust igényli."
                       } ,{                      
                           type: "name",
                           title: "CHAP",
                           content: "Ha a CHAP (Challenge Handshake Authentication Protocol) protokollt használja, akkor az útválasztó három kézfogás használatával hitelesíti a peer-t, és rendszeresen validálja a peer azonosítóját. Ezt az opciót akkor válassza, ha a szolgáltató ezt a hitelesítési típust igényli."
                       } ,{                      
                           type: "name",
                           title: "MTU méret",
                           content: "Az alapértelmezett MTU (Maximum Transmission Unit) mérete 1480 bájt. Ne változtassa meg, hacsak a szolgáltató nem kéri."
                       } ,{                      
                           type: "name",
                           title: "A következő DNS-kiszolgálók használata",
                           content: "Ha a szolgáltató DNS-kiszolgáló IP-címeket biztosít, jelölje be ezt a jelölőnégyzetet, és adja meg az alábbi <strong> Elsődleges DNS </ strong> és másodlagos DNS (opcionális) IP-címeket. Ellenkező esetben a DNS-kiszolgáló címeket a szolgáltató dinamikusan osztja ki."
                       } ,{                      
                           type: "name",
                           title: "Elsődleges DNS",
                           content: "Adja meg a szolgáltatótól kapott DNS IP-címet pontozott-decimális jelöléssel."
                       } ,{                      
                           type: "name",
                           title: "Másodlagos DNS",
                           content: "(Választható) Írjon be egy másik, szolgáltató által biztosított DNS IP-címet pontozott-decimális jelöléssel."
                       } ,{                      
                           type: "paragraph",
                           content: "A beállítások mentéséhez kattintson a <strong> Mentés </ strong> gombra."
                       }]
},
       DISK_SETTING :{ 
               TITLE:"Eszköz beállítások",
               CONTENT: [{
                           type: "paragraph",
                           content: "Az Eszközbeállítások oldal megjeleníti az USB portokra csatlakoztatott USB tárolóeszközökre vonatkozó adatokat. "
                       } ,{                      
                           type: "name",
                           title: "Szkennelés ",
                           content: "Rendszerint a router automatikusan felderíti az újonnan csatlakoztatott eszközöket. Ha mégsem, kattintson erre a gombra az újonnan csatlakoztatott eszközök kereséséhez, és frissítse az oldalt az új adatokkal."
                       } ,{                      
                           type: "name",
                           title: "Kötet",
                           content: "Megjeleníti az USB kötet nevét."
                       } ,{                      
                           type: "name",
                           title: "Kapacitás",
                           content: "Megjeleníti az USB teljes tárkapacitását."
                       } ,{                      
                           type: "name",
                           title: "Szabad hely",
                           content: "Megjeleníti az aktuálisan elérhető szabad tárhelyet."
                       } ,{                      
                           type: "name",
                           title: "Biztonságos eltávolítás",
                           content: "Kattintson erre a gombra az USB tároló biztonságos eltávolításához mielőtt kihúzná azt a routerből."
                       } ,{                      
                           type: "paragraph",
                           content: "Az Eltávolítás gomb csak akkor jelenik meg, ha az USB tárolóeszköz csatlakozik a routerhez. Ha az aktuális kötet használatban van, nem lehet eltávolítani."
                       } ,{                      
                           type: "name",
                           title: "Állapot",
                           content: "Ez az táblázat csak akkor jeleik meg, ha van a routerre csatlakoztatva USB tárolóeszköz. Válassza az USB eszköz fájlmegosztásának bekapcsolását."
                       } ,{                      
                           type: "step",
                           title: "Egy fájl szerver beállításához",
       content: [ 
                "1. Csatlakoztasson egy USB tárolóeszközt a router USB portjára egy USB kábel segítségével.",
                "2. Az újonnan csatlakoztatott USB eszközt a router automatikusan felismeri, és megjeleníti annak adatait az Eszközbeállítások alatt. Ha mégsem, kattintson a szkennelésre.",
                "3. Ha nem szeretné megosztani az USB tárolóeszközt, kattintson az izzóra és kapcsolja ki azt."]
}]
},
       FOLDER_SHARE_ACCOUNT :{ 
               TITLE:"Fiók megosztása",
               CONTENT: [{
                           type: "name",
                           title: "Fiók",
                           content: "Választhatja az Alapértelmezett fiók használatát a megosztott fájlok és mappák eléréséhez vagy Új fiók használatához adja meg a következőket."
                       } ,{                      
                           type: "name",
                           title: "Felhasználónév/Jelszó",
                           content: "Adjon meg egy 1 és 15 alfanumerikus vagy alulvonás karakterből álló felhasználónevet és egy 1 és 15 ASCII karakter közötti jelszót. Ügyeljen a kis-és nagybetűkre."
                       } ,{                      
                           type: "name",
                           title: "Jelszó megerősítése",
                           content: "Írja be újra a jelszót, hogy megerősítse, nincs elütés. Ennél a mezőnél is ügyeljen a kis- és nagybetűkre."
                       } ,{                      
                           type: "paragraph",
                           content: "Kattintson a Mentés gombra az összes beállítás mentéséhez."
                       }]
},
       FOLDER_SHARE_SETTINGS :{ 
               TITLE:"Beállítások megosztása",
               CONTENT: [{
                           type: "name",
                           title: "Hálózati/Media szerver neve",
                           content: "Megjeleníti a csatlakoztatott USB tárolóeszköz eléréséhez használt nevet."
                       } ,{                      
                           type: "name",
                           title: "Bekapcsol",
                           content: "Válassza ki hozzáférési mód bekapcsolásához."
                       } ,{                      
                           type: "name",
                           title: "Hozzáférési mód",
                           content: "Három hozzáférési mód adható meg az USB tárolóeszköz eléréséhez. Egy vagy több hozzáférési módot is választhat a megfelelő négyzetek bejelölésével.",
       children: [{                      
                           type: "name",
                           title: "Hálózati helyek",
                           content: "Ha be van kapcsolva, a hálózaton lévő felhasználók hozzáférhetnek az USB tárolóeszközhöz egy hozzárendelt IP-címmel (pl. \\\\ 192.168.0.1)."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Ha be van kapcsolva, akkor a helyi hálózaton található FTP-ügyfelek elérhetik az USB tárolóeszközt a hozzárendelt IP-címmel és ezt követően az FTP-kiszolgáló portszámával (például ftp://192.168.0.1:21)."
                       } ,{                      
                           type: "name",
                           title: "FTP (Interneten keresztül)",
                           content: " Ha be van kapcsolva a felhasználók távolról is elérhetik az USB tárolóeszközt FTP-n Interneten keresztül. Ez a funkció mind a fájlletöltést, mind a -feltöltést támogatja. Az FTP szerver portszámának módoításához adjon meg egy port számot, majd kattintson a Mentés gombra a módosítások érvényesítéséhez."
                       }]
} ,{                      
                           type: "name",
                           title: "Link",
                           content: "Megjeleníti a megosztott USB tárolóeszköz eléréséhez használt címet."
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "Megjeleníti az FTP kiszolgáló portszámát. Használja az alapértelmezett 21 értéket vagy 1024 és 65535 közötti értéket."
                       } ,{                      
                           type: "paragraph",
                           content: "Kattintson a Mentés gombra az összes beállítás mentéséhez."
                       }]
},
       FOLDER_SHARE_FOLDERS :{ 
               TITLE:"Mappa megosztása",
               CONTENT: [{
                           type: "name",
                           title: "Mind megosztása",
                           content: "Kapcsolja Be állásra minden fájl megosztásához vagy hagyja Ki állásban csak a kiválasztott mappák megosztásához."
                       } ,{                      
                           type: "name",
                           title: "Azonosítás bekapcsolása",
                           content: "Ajánlatos a hitelesítés bekapcsolása, hogy a felhasználók érvényes felhasználónévvel és jelszóval férhessenek csak hozzá a megosztott mappákhoz."
                       } ,{                      
                           type: "name",
                           title: "Mappa neve",
                           content: "Megjeleníi a megosztott mappa nevét."
                       } ,{                      
                           type: "name",
                           title: "Mappa útvonala",
                           content: "Megjeleníti a megosztott mappa útvonalát."
                       } ,{                      
                           type: "name",
                           title: "Média megosztás",
                           content: "Jelzi, hogy a megosztott mappa engedélyezett-e média megosztásra vagy sem."
                       } ,{                      
                           type: "name",
                           title: "A mappa neve",
                           content: "Megjeleníti a megosztott kötet nevét."
                       } ,{                      
                           type: "name",
                           title: "Állapot",
                           content: "Az izzó jelzővel megjeleníti a megosztott mappa állapotát."
                       } ,{                      
                           type: "name",
                           title: "Módosít",
                           content: "Megjeleníti a megosztott mappához tartozó Módosítás vagy Törlés opciót."
                       } ,{                      
                           type: "name",
                           title: "Böngészés",
                           content: "Kattintson ide egy megosztott mappa kereséséhez."
                       } ,{                      
                           type: "name",
                           title: "Vendéghálózati hozzáférés engedélyezése",
                           content: "Válassza ki, ha szeretné, hogy a Vendég hálózat kliensei hozzáférhessenek a megosztott mappákhoz."
                       } ,{                      
                           type: "name",
                           title: "Azonosítás bekapcsolása",
                           content: "Válassza ki , ha szeretné, hogy a felhasználók csak valós felhasználónévvel és jelszóval férhessenek hozzá a megosztott mappákhoz."
                       } ,{                      
                           type: "name",
                           title: "Irási hozzáférés engedélyezése",
                           content: "Válassza ki, ha szeretnék, hogy a felhasználók módosíthassák a mappa tartalmát."
                       } ,{                      
                           type: "name",
                           title: "Média megosztás bekapcsolása",
                           content: "Válassza ki a média megosztás bekapcsolásához."
                       } ,{                      
                           type: "name",
                           title: "Frissítés",
                           content: "Kattintson ide a megosztott mappa lista frissítéséhez."
                       }]
},
       PRINT_SERVER :{ 
               TITLE:"Nyomtató szerver",
               CONTENT: [{
                           type: "name",
                           title: "Nyomtató szerver",
                           content: "Kapcsolja be a nyomtatószerver funkciót."
                       } ,{                      
                           type: "name",
                           title: "Nyomtató neve",
                           content: "Megjeleníti a routerhez csatlakoztatott nyomtató nevét."
                       }]
},
       TIME_MACHINE :{ 
               TITLE:"Time Machine",
               CONTENT: [{
                           type: "paragraph",
                           content: "A Time Machine biztonsági másolatot készít a Mac számítógépen található összes fájlról egy a routerre csatlakoztatott USB tárolóeszközre."
                       } ,{                      
                           type: "name",
                           title: "Bekapcsol",
                           content: "Jelölje be ezt a négyzetet, hogy a Time Machine funkció bekapcsolásához."
                       } ,{                      
                           type: "name",
                           title: "Biztonsági mentést készíthet lemezeiről",
                           content: "Válasszon helyet Time Machine mentéseknek."
                       } ,{                      
                           type: "name",
                           title: "A Biztonsági mentések méretkorlátja",
                           content: "Adja meg, mennyi lemezterület használható fel a Time Machine mentésekhez. A 0 azt jelenti, hogy nincs korlátozva a tárkapacitás. "
                       } ,{                      
                           type: "name",
                           title: "Mentés",
                           content: "Kattintson a beállítások mentéséhez."
                       }]
},
       OFFLINE_DOWNLOAD :{ 
               TITLE:"Offline letöltés",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ha az offline letöltés be van kapcsolva, a router képes letölteni a fájlokat anélkül, hogy a számítógép folyamatosan be lenne kapcsolva."
                       } ,{                      
                           type: "name",
                           title: "Állapot",
                           content: "Kapcsolja be az Offline letöltés funkciót."
                       } ,{                      
                           type: "name",
                           title: "Mappa útvonala",
                           content: "Válasszon ki egy könyvtár útvonalat a letöltések tárolásához vagy gyorsítótárához.",
       children: [{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Ne változtassa meg a könyvtár elérési útvonalát, és ne távolítsa el az USB tárolóeszközt a fájlok feltöltésekor és letöltésekor; ellenkező esetben súlyos hibák fordulhatnak elő."
                       }]
} ,{                      
                           type: "name",
                           title: "Időzítés",
                           content: "Jelölje be a jelölőnégyzetet az Ütemezés funkció engedélyezéséhez, amely lehetővé teszi a fájlok letöltésére és feltöltésére időtartam megadását."
                       } ,{                      
                           type: "name",
                           title: "Feltöltés folytatása a feladat teljesítését követően",
                           content: "Jelölje be a jelölőnégyzetet, ha folytatni szeretné a sikeresen letöltött fájlok feltöltését mások számára."
                       } ,{                      
                           type: "name",
                           title: "Az aktív letöltések maximális száma",
                           content: "Adjon meg egy értéket 1 és 10 között az aktív letöltések maximális számának beállításához. Az alapértelmezett érték 5."
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"Letöltések",
               CONTENT: [{
                           type: "note",
                           title: "Fájl",
                           content: "Megjeleníti a letöltési fájl nevét és típusát."
                       } ,{                      
                           type: "note",
                           title: "Sebesség",
                           content: "Megjeleníti az aktuális letöltési (vagy feltöltési) sebességet."
                       } ,{                      
                           type: "note",
                           title: "Kész",
                           content: "Megjeleníti a letöltés folyamatát."
                       } ,{                      
                           type: "note",
                           title: "Hátralévő idő",
                           content: "Megjeleníti a letöltés hátralévő időtartamát."
                       } ,{                      
                           type: "note",
                           title: "Csatlakoztatott peer kapcsolatok",
                           content: "Megjeleníti a letöltéshez kapcsolódó peer-ek számát."
                       } ,{                      
                           type: "note",
                           title: "Állapot",
                           content: "Megjeleníti a letöltés aktuális állapotát (letöltés, várakozás, seeding, szüneteltetett, befejezett vagy hiba)."
                       } ,{                      
                           type: "name",
                           title: "Új letöltés hozzáadásához",
       children: [{                      
                           type: "step",
       content: [ 
                "1. Kattintson a Hozzáadás gombra.",
                "2. Válassza ki a letöltés, torrent forrását a számítógépről, torrentet az USB-ről vagy az URL-t.",
                "3. Válassza ki a torrent helyét a BT számára, vagy adja meg az URL-t az FTP, HTTP és aMule fájlokhoz.",
                "4. Kattintson a Mentésre.",
                "5. Az aMule esetén adja meg az aMule szerver IP címét és portját a Haladó> aMule szerver menüpontban."]
}]
} ,{                      
                           type: "name",
                           title: "Letöltések törléséhez",
                           content: "Jelölje be a törölni kívánt letöltésekhez tartozó jelölőnégyzetet, majd kattintson a táblázat feletti Törlés gombra."
                       } ,{                      
                           type: "name",
                           title: "A letöltések szüneteltetéséhez",
                           content: "Kattintson a szüneteltetni kívánt letöltésekhez tartozó jelölőnégyzetére, majd kattintson a Táblázat feletti Szüneteltetés gombra."
                       } ,{                      
                           type: "name",
                           title: "A letöltések folytatásához",
                           content: "Kattintson a folytatni kívánt letöltésekhez tartozó jelölőnégyzetére, majd kattintson a Táblázat feletti Folytatás gombra."
                       }]
},
       OFFLINE_DOWNLOAD_ADVANCED :{ 
               TITLE:"Haladó",
               CONTENT: [{
                           type: "name",
                           title: "Sebességkorlátozások",
                           content: "Adja meg az internetkapcsolat maximális letöltési és feltöltési sebességét."
                       } ,{                      
                           type: "name",
                           title: "Maximális letöltési sebesség",
                           content: "Adjon meg egy értéket 1 és 100000 kB / s között a maximális letöltési sebesség beállításához. Az alapértelmezett érték 1024."
                       } ,{                      
                           type: "name",
                           title: "Maximális feltöltési sebesség",
                           content: "Adjon meg egy értéket 1 és 100000 kB / s között a maximális feltöltési sebesség beállításához. Az alapértelmezett érték 512."
                       } ,{                      
                           type: "name",
                           title: "Kapcsolatok száma",
                           content: "Adja meg a kapcsolatok maximális számát."
                       } ,{                      
                           type: "name",
                           title: "Kapcsolatok teljes maximális száma",
                           content: "Adja meg az 1 és 200 közötti értéket a kapcsolatok összesített maximális számának beállításához. Az alapértelmezett érték 100."
                       } ,{                      
                           type: "name",
                           title: "Csatlakoztatott peer kapcsolatok maximális száma Torrentenként",
                           content: "Adjon meg egy értéket 1 és 100 között, hogy megadja a csatlakoztatott peer-ek maximális számát torrentenként. Az alapértelmezett érték 50."
                       } ,{                      
                           type: "name",
                           title: "DHT hálózat bekapcsolása",
                           content: "Kapcsolja be ezt a funkciót a peer-ek hatékonyabb megtalálása érdekében, így növelheti a letöltési sebességet."
                       } ,{                      
                           type: "name",
                           title: "Peer csere bekapcsolása",
                           content: "Kapcsolja be ezt a funkciót, hogy javítsa a kommunikációs hatékonyságot a peer-ek csoportjai között, így növelheti a letöltési sebességet."
                       } ,{                      
                           type: "name",
                           title: "BitTorrent Protokoll titkosítás bekapcsolása",
                           content: "Kapcsolja be ezt a funkciót az adatátviteli folyamat során a titkos és bizalmas adatok védelmének megerősítésére."
                       } ,{                      
                           type: "name",
                           title: "aMule szerver",
                           content: "Adja meg az aMule szerver IP címét és portját. Az aMule letöltés csak akkor működik, ha a router a kiszolgálóhoz csatlakozik."
                       }]
},
       PARENTAL_CONTROL :{ 
               TITLE:"Szülői felügyelet",
               CONTENT: [{
                           type: "paragraph",
                           content: "A Szülői felügyelet használatával letilthatja a nem megfelelő, nem engedélyezett és rosszindulatú webhelyeket; Korlátozhatja a hozzáférést bizonyos napszakokban (például Facebook vagy YouTube a házi feladat idején)."
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"Szülői felügyelet alatt álló eszközök",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ebben a táblázatban láthatók azok a készülékek információi és beállításai, amelyeket jelenleg a Szülői felügyelet korlátoz."
                       } ,{                      
                           type: "step",
                           title: "Egy új kliens eszköz korlátozásához",
       content: [ 
                "1. Kapcsolja be a szülői felügyeleteket.",
                "2. Kattintson a Hozzáadás gombra.",
                "3. Kattintson a Szkennelés gombra egy jelenleg csatlakoztatott eszköz kiválasztásához a Hozzáférési Eszközök listából; Vagy írja be egy még nem csatlakoztatott eszköz nevét és MAC-címét manuálisan.",
                "4. Kattintson az Érvényességi idő ikonra, hogy meghatározza azt a periódust, amely alatt a korlátozás érvényes.",
                "5. Adjon meg egy rövid leírást a Leírás mezőbe. Ez a mező választható.",
                "6. Jelölje be ezt a bejegyzés bekapcsolását.",
                "7. Kattintson a Mentés gombra."]
} ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Ha ki szeretné kapcsolni ezt a bejegyzést, kattintson az Izzó ikonra."
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"Tartalmi Korlátozás",
               CONTENT: [{
                           type: "paragraph",
                           content: "A tartalomkorlátozás lehetővé teszi bizonyos webhelyekhez való hozzáférés korlátozását a kulcsszavak és a domainnevek használatával. A szülői felügyelet alatt álló klienseszközök e webhelyekhez hozzáférhetnek vagy nem férhetnek hozzá a kiválasztott korlátozási szabályoktól függően."
                       } ,{                      
                           type: "step",
                           title: "A hozzáférni engedélyezett tartalom megadásához",
       content: [ 
                "1. Kapcsolja be a Tartalomkorlátozást.",
                "2. Válassza ki a korlátozási szabályokat az igényeknek megfelelően:",
                "A. Ha azt szeretné, hogy az ellenőrzött eszközök minden egyes weboldalhoz hozzáférjenek, kivéve bizonyosakat, válassza a Tiltólista lehetőséget.",
                "B. Ha azt szeretné, hogy az ellenőrzött eszközök csak bizonyos webhelyekhez férjenek hozzá, válassza ki az Engedélyezetti listát.",
                "3. Kattintson az Új kulcsszó hozzáadása elemre egy webcím kulcsszó (például wikipedia) vagy domain név hozzáadásához a Tiltó- illetve Engedélyezetti listához.",
                "4. Kattintson a Mentésre."]
}]
},
       PARENTAL_CONTROL_V2 :{ 
               TITLE:"Szülői felügyelet",
               CONTENT: [{
                           type: "paragraph",
                           content: "A felhasználói profilok, a tartalomszűrő és a hozzáférési korlátok segítségével a Szülői Felügyelet biztosítja a család minden tagjának személyre szabott és megfelelő internet-hozzáférést."
                       } ,{                      
                           type: "step",
                           title: "A szülői felügyelet alkalmazása új eszközre",
       content: [ 
                "1. Kattintson a Hozzáadás gombra.",
                "2. Adjon meg egy nevet ehhez a profilhoz, és kattintson a \"+\" gombra eszköz(ök) hozzáadásához a profilhoz. ",
                "3. Testreszabhatja a blokkolt tartalmat igényeinek megfelelően. A kulcsszavakat tartalmazó összes webhely blokkolva lesz.",
                "4. Ha korlátozni szeretné a profil számára az interneten tölthető összes időt, engedélyezze és határozza meg a határidőket. Az Alvásidő használatával is beállíthatja a napi időtartamot, amely alatt a profil alatt lévő eszközök nem használhatják az internetet.",
                "5. Kattintson a Mentés gombra."]
} ,{                      
                           type: "step",
                           title: "A profil részletes internetes előzményeinek megtekintése",
       content: [ 
                "1. A Statisztikák oszlopban kattintson a vonatkozó Statisztika gombra.",
                "2. Ha további bejegyzéseket szeretne látni, kattintson az Előzmények <span class=\"ptl-ctr-help-icon history\"></span> gombra.",
                "3. A webhelyeket blokkolhatja vagy feloldhatja a <span class=\"ptl-ctr-help-icon block\">​​</span> vagy a <span class=\"ptl-ctr-help-icon unblock\"></span> gombra kattintva."]
} ,{                      
                           type: "step",
                           title: "Az internet-hozzáférés azonnali letiltásához vagy engedélyezéséhez",
       content: [ 
                "Az Internet hozzáférés oszlopban kattintson a <span class=\"ptl-ctr-help-icon stop\"></span> gombra, hogy a megfelelő profil eszközei számára leááíltsa az internet elérést, majd kattintson a <span class=\"ptl-ctr-help-icon enable\"></span> ikonra annak újbóli engedélyezéséhez."]
}]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "A QoS (Quality of Service) segít priorizálni az internetes forgalmat az igényeknek megfelelően. A QoS szabályok listájában meghatározhatja egy eszköz, egy fizikai port vagy egy alkalmazás prioritási szintjét."
                       } ,{                      
                           type: "note",
                           id: "qos-boost",
                           title: "Megjegyzés ",
                           content: "Ha a NAT Boost engedélyezve van, akkor a QoS-t le kell tiltani."
                       } ,{                      
                           type: "name",
                           title: "Feltöltési sávszélesség",
                           content: "Adja meg az internetszolgáltató által biztosított maximális feltöltési sávszélességet."
                       } ,{                      
                           type: "name",
                           title: "Letöltési sávszélesség",
                           content: "Adja meg az internetszolgáltató által biztosított maximális letöltési sávszélességet."
                       }]
},
       QOS_ADV :{ 
               TITLE:"Haladó",
               CONTENT: [{
                           type: "name",
                           title: "Magas / Közepes / Alacsony prioritás",
                           content: "Határozza meg a magas / közepes / alacsony prioritású forgalom százalékos arányát.",
       children: [{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Az összes prioritás maximális mennyisége (százalék) 100% lehet."
                       }]
}]
},
       QOS_RULE :{ 
               TITLE:"QoS szabály lista",
               CONTENT: [{
                           type: "paragraph",
                           content: "Itt adhat hozzá részletes QoS szabályokat az internetes forgalom javításához."
                       } ,{                      
                           type: "step",
                           title: "Egy QoS szabály beállításához",
       content: [ 
                "1. Kattintson a Hozzáadás gombra.",
                "2. Válasszon ki egy prioritási típust a QoS szabály hozzáadásához.",
                "Eszköz alapján - Kattintson a Szkennelés gombra a kívánt eszköz kiválasztásához, vagy kézzel írja be az eszköz nevét és MAC-címét.",
                "Alkalmazás alapján - Válassza ki a kívánt alkalmazást, vagy testreszabhatja az alkalmazást a név, a protokoll és a célport (1-65535) konfigurálásával. Egyetlen portot vagy több portot vagy porttartományt adhat meg, vesszővel elválasztva (például 21,36-105,111).",
                "Fizikai port alapján - Válassza ki a kívánt portot.",
                "3. Kattintson a Mentés gombra."]
} ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "A prioritási szabályt hozzárendelheti a különböző prioritási listákhoz megváltoztatva azok fontossági sorrendjét. "
                       }]
},
       QOS_DATABASE :{ 
               TITLE:"Adatbázis frissítése",
               CONTENT: [{
                           type: "paragraph",
                           content: "A legújabb adatbázis verzió a www.tp-link.com címen található. Letöltheti és frissítheti a router adatbázisát a támogatott alkalmazások kiterjesztéséhez."
                       } ,{                      
                           type: "name",
                           title: "Új adatbázis fájl",
                           content: "Kattintson a Tallózás gombra a legfrissebb adatbázis fájl megtalálásához. Válassza ki és kattintson a Frissítés gombra az adatbázis legfrissebb verziójának frissítéséhez."
                       }]
},
       QOS_V2 :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "A QoS (Szolgáltatásminőség) lehetővé teszi a megadott eszközök internetes forgalmának priorizálását hogy a gyorsabb kapcsolatot garantálja, amikor a leginkább szüksége van rá."
                       }]
},
       QOS_GLOBAL_SETTINGS :{ 
               TITLE:"Globális Beállítások",
               CONTENT: [{
                           type: "paragraph",
                           content: "Feltöltési sávszélesség - Adja meg a maximális feltöltési sávszélességet amit az internet szolgáltatója nyújt Önnek."
                       } ,{                      
                           type: "paragraph",
                           content: "Letöltési sávszélesség - Adja meg a maximális letöltési sávszélességet amit az internet szolgáltatója nyújt Önnek."
                       }]
},
       QOS_DEVICE_PRIORITY :{ 
               TITLE:"Eszköz prioritás",
               CONTENT: [{
                           type: "paragraph",
                           content: "Válassza ki azokat a készülék (ek) et, melyeket prioritásként szeretne meghatározni, és mennyi ideig lesznek kiemeltek."
                       } ,{                      
                           type: "step",
                           title: "Egy eszköz prioritásának beállításához",
       content: [ 
                "1. Keresse meg azt a készüléket, amelyet prioritásként szeretne felsorolni a listában, és kapcsolja be a Prioritást.",
                "2. Adja meg, hogy az Időzítés oszlopban milyen időtartamra legyen prioritás."]
}]
},
       SECURITY_FIREWALL :{ 
               TITLE:"Tűzfal",
               CONTENT: [{
                           type: "name",
                           title: "SPI tűzfal",
                           content: "Az SPI (Stateful Packet Inspection) tűzfal megakadályozza a számítógépes támadásokat és engedélyezi a a routeren áthaladó forgalmat a protokoll alapján. Alapértelmezés szerint ez a funkció engedélyezve van."
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"DoS védelem",
               CONTENT: [{
                           type: "name",
                           title: "DoS védelem",
                           content: "A DoS (Denial of Service) védelem védi a LAN-t a hálózatot szerverigényekkel elárasztó DoS támadásokkal szemben. Az alábbi háromféle támadást szűrheti az igényeknek megfelelően. Minden szűrésnél négy szint van:",
       children: [{                      
                           type: "name",
                           title: "Ki",
                           content: "Nincs védelem"
                       } ,{                      
                           type: "name",
                           title: "Alacsony",
                           content: "Alacsony szintű védelem és alacsony hatás a router teljesítményére."
                       } ,{                      
                           type: "name",
                           title: "Középső",
                           content: "Közepes szintű védelem és kis mértékben érzékelhető hatás a router teljesítményére."
                       } ,{                      
                           type: "name",
                           title: "Magas",
                           content: "Magas szintű védelem, de érzékelhető hatás a router teljesítményére."
                       }]
} ,{                      
                           type: "name",
                           title: "ICMP-FLOOD támadás szűrés",
                           content: "Az ICMP (Internet Control Message Protocol) flood támadás megelőzésének bekapcsolása."
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD támadás szűrés",
                           content: "Az UDP (User Datagram Protocol) flood támadás megelőzésének bekapcsolása."
                       } ,{                      
                           type: "name",
                           title: "TCP-SYN-FLOOD támadás szűrés",
                           content: "A TCP-SYN (átviteli ellenőrzési protokoll-szinkronizálás) flood támadás megelőzésének bekapcsolása."
                       } ,{                      
                           type: "name",
                           title: "Hagyja figyelmen kívül a WAN portról érkező Ping csomagot",
                           content: "A WAN portról érkező ping csomagok figyelmen kívül hagyásának bekapcsolása."
                       } ,{                      
                           type: "name",
                           title: "Tiltsa a LAN portról érkező Ping csomagot",
                           content: "A LAN portról induló ping csomagok tiltásának bekapcsolása."
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"Blokkolt DoS hoszt lista",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ez a táblázat a blokkolt DoS gazdagép(ek) IP-címét és MAC-címét jeleníti meg."
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"Hozzáférés-szabályozás",
               CONTENT: [{
                           type: "paragraph",
                           content: "A hozzáférés-szabályozás célja, hogy bizonyos klienseszközök hálózati hozzáférését engedélyezze vagy blokkolja. Ha egy eszközt blokkolt, nem tud kommunikálni más eszközökkel, és nem csatlakozik az internethez."
                       } ,{                      
                           type: "step",
                           title: "A hozzáférés szabályozásához",
       content: [ 
                "1. Kapcsolja be a Hozzáférés szabályozást",
                "2. Ha a Vendég hálózathoz csatlakoztatott eszközök elérését is szeretné szabályozni, kapcsolja be a Vendégeszközök szabályozását.",
                "3. Válasszon ki egy hozzáférési módot az igényeknek megfelelően, és kattintson a Mentés gombra:",
                "A. Ha az alábbi listában szereplő eszközökről történő elérést blokkolni szeretné, válassza a Tiltólistát.",
                "B. Ha csak az alábbi listán szereplő eszközök hozzáférését szeretné engedélyezni, válassza az Engedélyezetti listát.",
                "4. A Tiltó-/Engedélyezetti listában szereplő eszközök szekcióban kattintson a Hozzáadás gombra. Adja meg az eszköz nevét és MAC-címét. Kattintson a Mentés gombra."]
} ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Ha ki szeretné kapcsolni ezt a bejegyzést, kattintson az Izzó ikonra."
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"Online eszközök",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ez a táblázat az összes csatlakoztatott eszköz adatait jeleníti meg (beleértve a Vendég hálózathoz csatlakoztatott eszközöket, ha a Vendégeszközök szabályozása engedélyezve van)."
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"IP & MAC Binding",
               CONTENT: [{
                           type: "paragraph",
                           content: "Az IP és MAC összekötéssel (más néven ARP összekötéssel) egy meghatározott LAn hálózati eszköz hozzáférését szabályozhathatja a hálózathoz az eszköz IP-címének és az eszköz MAC-címének összekötésével. Az IP és MAC-összerendelés megakadályozza más eszközök számára egy adott IP-cím használatát."
                       } ,{                      
                           type: "step",
                           title: "Eszköz beállításához IP és MAC összekötéssel",
       content: [ 
                "1. Kattintson a Hozzáadás gombra.",
                "2. Adja meg az Eszköz MAC címét",
                "3. Adja meg azt a IP címet, amelyet a fenti MAC-címhez kíván kötni.",
                "4. Válassza ki a Bejegyzés bekapcsolása opciót.",
                "5. Kattintson a Mentés gombra."]
} ,{                      
                           type: "note",
                           title: "Megjegyzés ",
       content: [ 
                "1. Nem kötheti össze ugyanazt az IP-címet több MAC-címmel.",
                "2. Ha ki szeretné kapcsolni ezt a bejegyzést, kattintson az Izzó ikonra."]
}]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"ARP lista",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ez a táblázat a jelenleg csatlakoztatott eszköz(ök) MAC-címét és IP-címét jeleníti meg."
                       }]
},
       IPV6 :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "name",
                           title: "IPv6",
                           content: "Az IPv6 (Internet Protocol version 6) az IP (Internet Protocol) legfrissebb verziója, és megoldást kínál az IPv4 (Internet Protocol version 4) címek elfogyása jelentette problémára."
                       } ,{                      
                           type: "title",
                            title: "Internet kapcsolati típus: Dinamikus IP"
                       } ,{                      
                           type: "name",
                           title: "Dinamikus IP",
                           content: "Válassza ezt a típust, ha a szolgáltató Dinamikus IPv6 cím kiosztást használ."
                       } ,{                      
                           type: "name",
                           title: "IPv6 Cím/Alapértelmezett átjáró/Elsődleges DNS/Másodlagos DNS",
                           content: "Ezeket a paramétereket a szolgáltató DHCPv6 kiszolgálója automatikusan osztja ki."
                       } ,{                      
                           type: "name",
                           title: "Megújít",
                           content: "Kattintson új IPv6 paraméterek lekéréséhez a szolgáltató DHCPv6 szerveréről."
                       } ,{                      
                           type: "name",
                           title: "Eldob",
                           content: "Kattintson a gombra a DHCPv6 kiszolgáló által az internetszolgáltatótól kijelölt IPv6 címek kiadásához."
                       } ,{                      
                           type: "name",
                           title: "IPv6 cím kérése",
                           content: "Szolgáltatója utasításai szerint válassza a DHCPv6 opciót nem ideiglenes IPv6 címhez vagy a SLAAC opciót ha a router hirdetési csomagból szeretne generálni egy IPv6 címet. "
                       } ,{                      
                           type: "name",
                           title: "Előtag delegáció",
                           content: "Kapcsolja be, ha szeretne előtag delegációt kérni a szolgáltatói DHCPv6 szervertől vagy a kapcsolja ki, ha manuálisan szeretne meghatározni egy előtagot. A LAN hálózati kliensek ezzel az előtaggal fognak IPv6 címeket generálni."
                       } ,{                      
                           type: "name",
                           title: "DNS-cím",
                           content: "Válassza a Dinamikus lekérést az internetszolgáltatótól vagy A következő DNS címek használatát. Ha A következő DNS-címek használata van kiválasztva, kérjük, adja meg manuálisan a szolgáltató által megadott DNS-címet."
                       } ,{                      
                           type: "title",
                            title: "Internet kapcsolati típus: Statikus IP"
                       } ,{                      
                           type: "name",
                           title: "Statikus IP",
                           content: "Válassza ezt a típust, ha a szolgáltató statikus IPv6 címkiosztást használ."
                       } ,{                      
                           type: "name",
                           title: "IPv6 Cím/Alapértelmezett átjáró/Elsődleges DNS/Másodlagos DNS",
                           content: "Adja meg ezeket a szolgáltatótól kapott paramétereket."
                       } ,{                      
                           type: "name",
                           title: "MTU méret",
                           content: "Az alapértelmezett és tipikus MTU (Maximum Transmission Unit) méret a legtöbb Ethernet-hálózaton 1500 bájt. Nem ajánlott módosítani az alapértelmezett MTU méretét, ha azt a szolgáltató nem kéri."
                       } ,{                      
                           type: "title",
                            title: "Internet kapcsolati típus: 6to4 Tunnel"
                       } ,{                      
                           type: "name",
                           title: "6to4 Tunnel",
                           content: "Válassza ezt a típust, ha az ISP 6to4 telepítést használ a címek kiosztásához."
                       } ,{                      
                           type: "name",
                           title: "IPv4 cím/IPv4 alhálózati maszk/IPv4 alapértelmezett átjáró/Tunnel cím",
                           content: "Ezeket a paramétereket dinamikusan generálja le a WAN port IPv4 adataiból miután a Csatlakozás gombra kattint."
                       } ,{                      
                           type: "name",
                           title: "A következő DNS-kiszolgáló használata",
                           content: "Kiválaszthatja, hogy manuálisan adja meg az elsődleges DNS- és / vagy másodlagos DNS-t az internetszolgáltató által megadott módon."
                       } ,{                      
                           type: "name",
                           title: "Csatlakozás",
                           content: "Kattintással csatlakozhat az internethez."
                       } ,{                      
                           type: "name",
                           title: "Szétkapcsolás",
                           content: "Kattintson az internetkapcsolat megszakításához."
                       } ,{                      
                           type: "title",
                            title: "Internet kapcsolati típus: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE ",
                           content: "Válassza ezt a típust, ha az internetszolgáltató PPPoEv6-ot használ, és megad egy felhasználónevet és jelszót."
                       } ,{                      
                           type: "name",
                           title: "Felhasználónév/Jelszó",
                           content: "Adja meg ezeket a szolgáltatótól kapott paramétereket."
                       } ,{                      
                           type: "name",
                           title: "IPv6-cím",
                           content: "Ezt a címet automatikusan a szolgáltató DHCPv6 kiszolgálója ossza ki, miután megadta a felhasználónevet és a jelszót, és a Csatlakozás gombra kattintott."
                       } ,{                      
                           type: "name",
                           title: "IPv6 cím kérése",
                           content: "Szolgáltatója utasításai szerint válassza a DHCPv6 opciót nem ideiglenes IPv6 címhez vagy a SLAAC opciót ha a router hirdetési csomagból szeretne generálni egy IPv6 címet. "
                       } ,{                      
                           type: "name",
                           title: "Előtag delegáció",
                           content: "Kapcsolja be, ha szeretne előtag delegációt kérni a szolgáltatói DHCPv6 szervertől vagy a kapcsolja ki, ha manuálisan szeretne meghatározni egy előtagot. A LAN hálózati kliensek ezzel az előtaggal fognak IPv6 címeket generálni."
                       } ,{                      
                           type: "name",
                           title: "DNS-cím",
                           content: "Válassza a Dinamikus lekérést az internetszolgáltatótól vagy A következő DNS címek használatát. Ha A következő DNS-címek használata van kiválasztva, kérjük, adja meg manuálisan a szolgáltató által megadott DNS-címet."
                       } ,{                      
                           type: "name",
                           title: "Csatlakozás",
                           content: "Kattintással csatlakozhat az internethez."
                       } ,{                      
                           type: "name",
                           title: "Szétkapcsolás",
                           content: "Kattintson az internetkapcsolat megszakításához."
                       } ,{                      
                           type: "title",
                            title: "Internet kapcsolati típus: Pass-Through (Bridge)"
                       } ,{                      
                           type: "paragraph",
                           content: "Válassza ezt a típust, ha a szolgáltató Pass-Through (Bridge) hálózati telepítést használ. Az ilyen típusú kapcsolathoz nincs szükség konfigurációra."
                       }]
},
       IPV6_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "A Pass-Through (Bridge) kivételével az összes többi Internet kapcsolati típushoz IPv6 konfigurációra van szükség."
                       } ,{                      
                           type: "name",
                           title: "Címzett típusa",
                           content: "Válassza ki a megfelelőt az internetszolgáltató utasításai szerint.",
       children: [{                      
                           type: "name",
                           title: "DHCPv6",
                           content: "A LAN hálózati kliensek számára IP címek automatikus kiosztásához",
       children: [{                      
                           type: "name",
                           title: "Cím előtag",
                           content: "Írja be a cím előtagot az internetszolgáltató által megadott módon."
                       } ,{                      
                           type: "name",
                           title: "Megszakítási idő",
                           content: "Ez a kijelölt IP-cím érvényességi ideje. Vagy tartsa az alapértelmezett 86400 másodpercet, vagy változtassa meg, ha azt a szolgáltató kéri."
                       } ,{                      
                           type: "name",
                           title: "Cím",
                           content: "Ez a szolgáltató DHCPv6 kiszolgálója által automatikusan kiosztott IP-cím."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+Stateless DHCP",
       children: [{                      
                           type: "name",
                           title: "Cím előtag",
                           content: "Írja be a cím előtagot az internetszolgáltató által megadott módon."
                       } ,{                      
                           type: "name",
                           title: "Cím",
                           content: "Ez a szolgáltató által automatikusan kiosztott IP cím."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+RDNSS",
       children: [{                      
                           type: "name",
                           title: "Cím előtag",
                           content: "Írja be a cím előtagot az internetszolgáltató által megadott módon."
                       } ,{                      
                           type: "name",
                           title: "Cím",
                           content: "Ez a szolgáltató által automatikusan kiosztott IP cím."
                       }]
}]
}]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"MAC klónozás",
               CONTENT: [{
                           type: "paragraph",
                           content: "Válassza ki a megfelelő MAC-klón módszert, amire szüksége van."
                       } ,{                      
                           type: "name",
                           title: "Ne klónozza a MAC címet",
                           content: "Ne változtassa meg a router alapértelmezett MAC címét, ha a szolgáltató nem köti a kiosztott IP-címet a MAC címhez. "
                       } ,{                      
                           type: "name",
                           title: "Klónozza a jelenlegi számítógép MAC címét",
                           content: "Válassza a routerhez csatlakoztatott számítógép aktuális MAC-címének másolását, ha a szolgáltató a kiosztott IP-címet a számítógép MAC címhez köti."
                       } ,{                      
                           type: "name",
                           title: "Egyedi MAC-cím használata",
                           content: "Adja meg a MAC-címet manuálisan, ha a szolgáltató a kiosztott IP-címet megadott MAC címhez köti. "
                       }]
},
       TIME_SETTING :{ 
               TITLE:"Idő beállítások",
               CONTENT: [{
                           type: "paragraph",
                           content: "Az Időbeállítások lehetővé teszik a router rendszeridejének beállítását. A módosítás után az új rendszeridő minden időalapú funkcióra és konfigurációra érvényes lesz, így például a szülői felügyeletre is."
                       } ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Beállíthatja a 24 órás időformátumot a konfiguráció előtt, amely a rendszeridő-alapú funkciókra és konfigurációkra vonatkozik."
                       } ,{                      
                           type: "title",
                            title: "Rendszeridő"
                       } ,{                      
                           type: "step",
                           title: "Az idő lekéréséhez az Internetről",
       content: [ 
                "Az alapbeállított Lekérés az Internetről lehetőséggel a rendszeridőt a router az Internetről szerzi be.",
                "1. Válassza a Lekérés az Internetről lehetőséget.",
                "2. Válassza ki a helyi Időzónát a legördülő menüből.",
                "3. Az NTP Szerver I mezőben adja meg a választott NTP szerver IP címét és domain nevét.",
                "4. Az NTP Szerver II mezőben adja meg a második NTP szerver IP címét és domain nevét. (Választható)",
                "5. Kattintson a Lekérés gombra.",
                "6. Kattintson a Mentés gombra."]
} ,{                      
                           type: "step",
                           title: "Az idő lekéréséhez a PC-ről",
       content: [ 
                "Ezzel a lehetőséggel a rendszeridőt a PC-ről kéri le a router, de manuálisan is beállíthatja a rendszeridőt.",
                "Válassza a Lekérés PC-ről lehetőséget és kattintson a Mentésre."]
} ,{                      
                           type: "step",
                           title: "Az idő manuális beállításához",
       content: [ 
                "Ha az eszköz nem tudja lekérni az időt sem az Internetről, se m a PC-ről, manuálisan is beállíthatja az időt.",
                "1. Válassza a Manuális lehetőséget.",
                "2. Adja meg az aktuális dátumot és időt.",
                "3. Kattintson a Mentés gombra."]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Nyári időszámítás",
                           content: "Ez a funkció automatikusan szinkronizálásra kerül az Ön időzónájában érvényes nappali időszámítással. "
                       } ,{                      
                           type: "step",
                           title: "Nyári időszámítás beállításához",
       content: [ 
                "1. Válassza ki a Nyári időszámítás bekapcsolását.",
                "2. Határozza meg a nappali időszámítás időtartamát az Ön időzónájában. ",
                "3. Kattintson a Mentés gombra."]
}]
},
       DIGNOSTIC :{ 
               TITLE:"Diagnosztika",
               CONTENT: [{
                           type: "paragraph",
                           content: "A router Ping és Traceroute eszközöket biztosít a hálózati csatlakozási problémák elhárításához. "
                       } ,{                      
                           type: "title",
                            title: "Ping & Traceroute"
                       } ,{                      
                           type: "paragraph",
                           content: "A Ping eszköz csomagokat küld megadott IP címekre vagy domain nevekre, majd naplózza az eredményeket, mint az elküldött és fogadott csomagok száma és a megtett út ideje."
                       } ,{                      
                           type: "paragraph",
                           content: "A Traceroute eszköz csomagokat küld meghatározott IP címekre vagy domain nevekre, majd megjeleníti a célállomás eléréséig számolt hop-ok számát és az eltelt időt."
                       } ,{                      
                           type: "paragraph",
                           content: "Pingelhet és traceroute-olhat egy helyi eszközt egy IP címmel vagy domain névvel, mint pl. google.com, yahoo.com stb."
                       } ,{                      
                           type: "step",
                           title: "Ping diagnosztikához",
       content: [ 
                "1. Válassza ki a Ping diagnosztikai eszközt.",
                "2. Adja meg a címzett IP címét vagy domain nevét.",
                "3. Kattintson a Nyíl ikonra a Haladó menü megnyitásához, és adja meg a Ping számot valamint a Ping csomagméretet. (Választható)",
                "4. Kattintson az Indítás gombra."]
} ,{                      
                           type: "step",
                           title: "Traceroute diagnosztikához",
       content: [ 
                "1. Válassza a Traceroute diagnosztikai eszközt.",
                "2. Adja meg a címzett IP címét vagy domain nevét.",
                "2. Kattintson a Nyíl ikonra a Haladó menü megnyitásához, és adja meg az elérendő hop számot a Traceroute Max TTL (Time to Live) mezőben. Az alapbeállított szám a 20.",
                "4. Kattintson az Indítás gombra."]
}]
},
       PORT_MIRROR :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                            title: "Port tükrözés"
                       } ,{                      
                           type: "paragraph",
                           content: "A port-tükrözés a csomagok másolatainak tükrözött portról egy tükröző portra történő továbbításának folyamata. Általában a tükröző port egy adatdiagnosztikai eszközhöz van csatlakoztatva, amelyet a tükrözött csomagok elemzésére használnak a hálózat megfigyele és hibaelhárítása érdekében."
                       } ,{                      
                           type: "step",
                           title: "A csomagok másolatainak továbbítására a kijelölt porthoz",
       content: [ 
                "1. Port tükrözés engedélyezése.",
                "2. Válassza ki a kívánt portokat tükrözött portként.",
                "3. Válassza ki a kívánt portot a tükröző portként.",
                "4. Kattintson a Mentésre."]
} ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "A portot nem lehet tükrözött portként és tükröző portként egyidejűleg beállítani."
                       }]
},
       FIRMWARE :{ 
               TITLE:"Firmware frissítés",
               CONTENT: [{
                           type: "paragraph",
                           content: "A Firmware frissítés frissíti az útválasztó firmware-jét új funkciókkal vagy hibajavításokkal. Javasoljuk, hogy frissítse a routert a legújabb firmware fájllal, hogy a legjobb teljesítményt nyújtsa."
                       } ,{                      
                           type: "step",
                           title: "Ügyeljen a következőkre a frissítési hibák elkerülése érdekében:",
       content: [ 
                "Frissítés előtt",
                "1. Győződjön meg róla, hogy stabil kapcsolat van az útválasztó és a számítógép között. NEM ajánlott a firmware vezeték nélküli frissítése.",
                "2. Győződjön meg arról, hogy eltávolította az útválasztóhoz csatlakoztatott összes USB eszközt.",
                "3. Ne felejtse el biztonsági másolatot készíteni az útválasztó konfigurációs fájljáról.",
                "Frissítés közben",
                "Tartsa az útválasztót bekapcsolva, amíg a frissítés befejeződik."]
}]
},
       FIRMWARE_UPGRADE_ONLINE :{ 
               TITLE:"A firmware online frissítéséhez",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Kattintson a Frissítés gombra, és erősítse meg a kérésre. A router automatikusan letölti és frissíti a legújabb firmware-t. A Frissítés ellenőrzés gombra kattintva ellenőrizheti a legújabb firmware verziót is."]
}]
},
       FIRMWARE_UPGRADE :{ 
               TITLE:"A firmware manuális frissítéséhez",
               CONTENT: [{
                           type: "step",
       content: [ 
                "1. Kattintson az oldal alján található Támogatás gombra, és töltse le a legújabb firmware-t a számítógépre. Győződjön meg róla a letöltő oldalon, hogy a firmware fájl megfelel az útválasztó hardver verziójának.",
                "2. Kattintson a Tallózás gombra, és válassza ki a letöltött firmware fájlt.",
                "3. Kattintson a Frissítés gombra."]
} ,{                      
                           type: "paragraph",
       content: [ 
                "A firmware-frissítés néhány percet vesz igénybe. A router automatikusan újraindul, amikor a firmware frissítés befejeződött."]
}]
},
       BACKUP :{ 
               TITLE:"Biztonsági mentés és visszaállítás",
               CONTENT: [{
                           type: "paragraph",
                           content: "A Biztonsági mentés és visszaállítás funkció lehetővé teszi az útválasztó aktuális konfigurációjának biztonsági másolatát, vagy egyszerűen visszaállítja az útválasztót az alapértelmezett beállításokra."
                       } ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Kérjük, ne kapcsolja ki az útválasztót a biztonsági mentés vagy visszaállítás során."
                       } ,{                      
                           type: "title",
                           title: "Biztonsági mentés",
                           content: "Ajánlott biztonsági másolatot készíteni az aktuális konfigurációról abban az esetben, ha helyreállításra van szükség ahhoz, hogy az útválasztó visszaálljon a korábbi állapotába."
                       } ,{                      
                           type: "step",
                           title: "Az aktuális konfiguráció biztonsági mentése",
       content: [ 
                "1. Kattintson a Biztonsági mentés elemre.",
                "2. Várja meg, hogy az útválasztó biztonsági másolatot készítsen az aktuális konfigurációról."]
}]
},
       RESTORE :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Helyreállítás",
                           content: "A router visszaállítható egy korábbi állapotára biztonsági mentési fájlból."
                       } ,{                      
                           type: "step",
                           title: "Egy biztonsági mentés visszaállításához",
       content: [ 
                "1. Kattintson a Böngészés gombra.",
                "2. Keresse meg és válassza ki a biztonsági mentés fájlt.",
                "3. Kattintson a Visszaállítás gombra."]
}]
},
       FACTORY :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Gyári alapbeállítás visszaállítása",
       content: [ 
                "Az útválasztó visszaállítja az összes konfigurációt és beállítást, és visszaállítja azokat a gyári alapértékekre. Például minden vezeték nélküli, szülői felügyelet és hálózati információ törlődik.",
                "A gyári visszaállítás után meg kell adnia egy új jelszót a router webes kezelőoldalának eléréséhez."]
}]
},
       REBOOT :{ 
               TITLE:"Újraindítás időzítése",
               CONTENT: [{
                           type: "paragraph",
                           content: "Az Időzített újraindítás funkció tisztítja a gyorsítótárat a router futó teljesítményének növelése érdekében. A routert manuálisan újraindíthatja, vagy rendszeresen újraindíthatja."
                       } ,{                      
                           type: "step",
                           title: "Manuális újraindításhoz",
       content: [ 
                "Kattintson az Újraindítás gombra, és várjon néhány percet, amíg az útválasztó újraindul."]
} ,{                      
                           type: "step",
                           title: "Az újraindítási idő ütemezéséhez",
       content: [ 
                "1. Engedélyezze az Időzített újraindítást.",
                "2. Állítsa be, hogy mikor és milyen gyakorisággal indítsa újra a routert az Újraindítási idő és az Ismétlés mezők paramétereinek meghatározásával.",
                "3. Kattintson a Mentés gombra."]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"Adminisztráció",
               CONTENT: [{
                           type: "paragraph",
                           content: "Az Adminisztráció lehetővé teszi a bejelentkező jelszó módosítását és a kapcsolódó kliensek hozzáférésének engedélyezését a routerhez."
                       } ,{                      
                           type: "name",
                           title: "Fiók menedzsment",
                           content: "Ezzel a funkcióval megváltoztathatja a jelszót.",
       children: [{                      
                           type: "step",
                           title: "A jelszó módosításához",
       content: [ 
                "1. Írja be a régi jelszót.",
                "2. Írja be az új jelszót.",
                "3. Új jelszó megerősítése.",
                "4. Kattintson a Mentésre."]
}]
}]
},
       ADMIN_RECOVERY :{ 
               TITLE:"Jelszó visszaállítás",
               CONTENT: [{
                           type: "name",
                           title: "Alapértelmezett jelszó helyreállítás",
                           content: "Az alapértelmezett jelszó-visszaállítás lehetővé teszi az alapértelmezett bejelentkezési jelszó visszaállítását anélkül, hogy visszaállítaná az útválasztó gyári alapbeállításait.",
       children: [{                      
                           type: "step",
                           title: "A jelszó módosításához",
       content: [ 
                "1. Engedélyezze az alapértelmezett jelszó-visszaállítási szolgáltatást.",
                "2. A Feladó mezőbe írjon be egy érvényes e-mail címet, amely az igazoló kód elküldéséhez használt a bejelentkezési adatok visszaállításához.",
                "3. A Címzett mezőbe írja be az érvényes kód átvételére használt érvényes e-mail címet.",
                "4. Adja meg a kimenő e-mail SMTP-kiszolgálóját (Feladó).",
                "5. Ha az E-mail a Feladó mezőben titkosítást igényel, ki kell választania az Engedélyezés hitelesítés jelölőnégyzetet, és be kell írnia a felhasználónevét (e-mail címét) és a Jelszót.",
                "6. Kattintson a Mentés gombra."]
}]
}]
},
       ADMIN_LOCAL :{ 
               TITLE:"Helyi menedzsment",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ez a lehetőség engedélyezi a helyi eszközöknek a router elérését és kezelését."
                       } ,{                      
                           type: "name",
                           id: "local_management_https",
                           title: "Helyi hálózatkezelés HTTPS-en keresztül",
                           content: "Engedélyezze a Helyi Kezelést HTTPS porton keresztül hogy elérje a routert HTTP-n és HTTPS porton keresztül is, vagy hagyja kikapcsolva hogy csak HTTP-n keresztül tudjon kapcsolódi."
                       } ,{                      
                           type: "name",
                           title: "Hozzáférés minden LAN hálózatra csatlakoztatott eszköz számára",
                           content: "Kapcsolja Be, ha szeretné a helyi menedzsmentet minden LAN hálózatra csatlakoztatott eszközre érvénybe léptetni vagy hagyja Kikapcsolva, ha csak egy meghatározott eszköz menedzsmentjét szeretné bekapcsolni."
                       } ,{                      
                           type: "name",
                           title: "MAC cím",
                           content: "Megjeleníti a korlátozott hozzáférésű eszköz MAC címét."
                       } ,{                      
                           type: "name",
                           title: "Leírás",
                           content: "Megjeleníti a korlátozott hozzáférésű eszköz leírását."
                       } ,{                      
                           type: "name",
                           title: "Állapot",
                           content: "Megjeleníti a korlátozott hozzáférésű eszköz aktuális állapotát (bekapcsolt vagy kikapcsolt)."
                       } ,{                      
                           type: "name",
                           title: "Módosít",
                           content: "Megjeleníti a vonatkozó eszköz Módosítására vagy Törlésére vonatkozó lehetőséget a listában."
                       } ,{                      
                           type: "step",
                           title: "Egy klienseszköz listához adásához",
       content: [ 
                "1. Kattintson a Hozzáadás gombra.",
                "2. Kattintson a Meglévő eszközök megtekintésére és válasszon ki egy meglévő eszközt, vagy adja meg egy eszköz MAC címét a MAC cím mezőben.",
                "3. Adja meg az eszköz Leírását.",
                "4. Válassza ki a Bejegyzés bekapcsolása opciót.",
                "5. Kattintson az OK gombra."]
} ,{                      
                           type: "step",
                           title: "Egy a listában szereplő eszköz Módosításához vagy Törléséhez",
                           content: "A táblában kattintson a módosítani vagy törölni kívánt eszközhöz tartozó Szerkesztés vagy Kuka ikonra."
                       } ,{                      
                           type: "step",
                           title: "Több eszköz törléséhez  ",
                           content: "Válassza ki a törölni kívánt szabályokat, majd kattintson a Törlés gombra."
                       }]
},
       ADMIN_REMOTE_WITHOUT_HTTPS :{ 

               TITLE:"Távoli menedzsment",
               CONTENT: [{
                           type: "name",
                           title: "Távoli menedzsment",
                           content: "A Távoli felügyelet funkció lehetővé teszi a távoli eszközök számára a router elérését és menedzsmentjét.",
       children: [{                      
                           type: "step",
                           title: "A router menedzsmentjéhez minden távoli eszköz hozzáférésének tiltásához",
                           content: "Válassza a Távoli menedzsment kikapcsolása lehetőséget, és kattintson a Mentés gombra."
                       } ,{                      
                           type: "step",
                           title: "Annak érdekében, hogy az összes távoli eszköz menedzselhesse az routert",
       content: [ 
                "1. Válassza a Távoli menedzsment engedélyezése MINDEN eszközön lehetőséget.",
                "2. Adja meg a Web menedzsment portot (1024-65535 vagy 80), amelyen keresztül a távoli eszközök hozzáférnek a routerhez.",
                "3. Kattintson a Mentés gombra."]
} ,{                      
                           type: "step",
                           title: "Annak érdekében, hogy egy adott távoli eszköz menedzselhesse a routert",
       content: [ 
                "1. Válassza a Távoli mangement engedélyezése egy adott eszközhöz lehetőséget.",
                "2. Adja meg a Web menedzsment portot (1024-65535 vagy 80), amelyen keresztül a távoli eszköz hozzáférést kap a routerhez.",
                "3. Adja meg a távoli eszköz Távoli menedzsment IP címét a router kezeléséhez.",
                "4. Kattintson a Mentésre."]
}]
}]
},
       ADMIN_REMOTE :{ 
               TITLE:"Távoli menedzsment",
               CONTENT: [{
                           type: "paragraph",
                           content: "A Távoli menedzsment funkcióval távolról, Interneten keresztül is elérheti és konfigurálhatja a routert."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step_title",
                           content: "A távoli kezelés beállításához"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step1",
                           content: "1. Válassza ki a jelölőnégyzetet a Távoli Kezelés funkció engedélyezéséhez."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step2",
                           content: "2. Hagyja a HTTPS és a HTTP portok értékét az alapértelmezett értékeken."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step3",
                           content: "Döntse el mely távoli eszközök érhessék el a routert rávolról:",
       children: [{                      
                           type: "name",
                           title: "Minden eszköz",
                           content: "Minden távoli eszköz el tudja érni a routert."
                       } ,{                      
                           type: "name",
                           title: "Specified Device",
                           content: "Írja be a távoli eszköz IP címét a router eléréséhez."
                       }]
} ,{                      
                           type: "paragraph",
                           id: "admin_remote_step4",
                           content: "4. Kattintson a Mentésre."
                       } ,{                      
                           type: "paragraph",
                           content: "Mostantól távolról is el tudja érni a routert a Weboldal Kezeléshez sorban levő címen keresztül."
                       } ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Ha egy figyelmeztető üzenet ugrik elő, miközben távolról próbálja elérni az alábbi címet, kattintson a Megbízható kapcsolatra (vagy ehhez hasonlóra) a folytatáshoz."
                       }]
},
       LED_CONTROL_SETTINGS :{ 
               TITLE:"LED vezérlés",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ha az éjszakai üzemmód be van kapcsolva, a LED-ek a meghatározott időtartam alatt ki lesznek kapcsolva a router teljesítményének befolyásolása nélkül."
                       } ,{                      
                           type: "step",
                           title: "Az Éjszakai üzemmód engedélyezése",
       content: [ 
                "1. Válassza az Éjszakai üzemmód bekapcsolása lehetőséget.",
                "2. Adjon meg egy időtartamot, amikor a LED-ek ne világítsanak.",
                "3. Kattintson a Mentés gombra."]
}]
},
       SYSTEM_LOG :{ 
               TITLE:"Rendszernapló",
               CONTENT: [{
                           type: "paragraph",
                           content: "A rendszer naplója megjeleníti a router legfrissebb tevékenységeit. A táblázat a rendszer naplóinak típusát, szintjét és napló tartalmát tartalmazza, amelyet szűrve is meg lehet tekinteni. A rendszer naplóit a helyi számítógépre is elmentheti, vagy elküldi őket az e-mail címre."
                       } ,{                      
                           type: "step",
                           title: "A rendszer naplóinak mentése a helyi számítógépre",
       content: [ 
                "1. Állítsa be a Típust és minimális szintet a leszűrni kívánt rendszernaplókhoz. A szint lista csökkenő sorrendben van, a legalacsonyabb szint pedig az utolsó.",
                "2. Kattintson a Napló mentése gombra a rendszer naplófájljainak helyi számítógépre történő mentéséhez."]
} ,{                      
                           type: "step",
                           title: "Rendszernaplók fogadása emailben",
       content: [ 
                "1. Állítsa be a Típust és minimális szintet a leszűrni kívánt rendszernaplókhoz. A szint lista csökkenő sorrendben van, a legalacsonyabb szint pedig az utolsó.",
                "2. Kattintson az E-mail beállítások lehetőségre.",
                "3. A Feladó mezőbe írjon be egy érvényes e-mail címet, amelyet kimenő e-mailként kíván használni.",
                "4. A Címzett mezőbe írjon be egy érvényes e-mail címet, amelyet bejövő e-mailként kíván használni.",
                "5. Adja meg a kimenő e-mail SMTP-kiszolgáló címét (Feladó).",
                "Megjegyzés: Ha a kimenő e-mail hitelesítést igényel, jelölje be a Hitelesítés engedélyezése jelölőnégyzetet, és írja be a felhasználónevét (e-mail címét) és a jelszót.",
                "6. Ha a rendszer naplóit rendszeresen e-mailben szeretne kapni, jelölje be az Automatikus e-mail engedélyezése jelölőnégyzetet, és állítsa be a pontos időt (24 órás formátumban) vagy időintervallumot.",
                "Ha azonnal szeretné megkapni az aktuális rendszer naplókat, kattintson a Napló elküldése most gombra.",
                "7. Kattintson a Mentés gombra."]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"Forgalom monitor",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megmutatja az eszköz forgalmát az elmúlt 10 percben, vagy az összes eszköz forgalmát az elmúlt 10 percben / 24 órában / 7 napban."
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"Forgalom monitor lista",
               CONTENT: [{
                           type: "paragraph",
                           content: "A lista az eszközök kapcsolati típusa alapján kerül csoportosításra: vezetékes vagy vezeték nélküli."
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"Rendszerparaméter",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wifi_title",
                           title: "2,4GHz/5GHz Vezeték nélküli",
                           content: "Ez a szakasz lehetővé teszi a forgalomátviteli szabályok paramétereinek konfigurálását vezeték nélküli hálózatokban. Javasolt az alapértelmezett beállítások megtartása, ha nem biztos a helyes beállításokban."
                       } ,{                      
                           type: "name",
                           title: "Beacon intervallum",
                           content: "Adja meg a router által sugárzott, a vezeték nélküli hálózat szinkronizálására szolgáló beacon csomagok közötti időintervallum hosszát 40 és 1000 milliszekundum között. Az alapbeállítás 100 milliszekundum."
                       } ,{                      
                           type: "name",
                           title: "RTS küszöb",
                           content: "Adja meg a routeren áthaladó adatforgalom csomagméretét 1 és 2346 között. Alapbeállításként az RTS (Request to Send) küszöbméret 2346. Ha a csomagméret nagyobb, mint az itt beállított küszöbérték, a router elküld egy Request of Send frame-et a címzettnek és egyezteti az adat frame küldését. Egyéb esetben a csomag azonnal elküldésre kerül."
                       } ,{                      
                           type: "name",
                           title: "DTIM intervallum",
                           content: "Ez az érték határozza meg a DTIM (Delivery Traffic Indication Message) belső értékét. Adjon meg egy értéket 1 és 15 belső egység között. Az alapértelmezett intervallum 1, jelezve, hogy a DTIM intervallum megegyezik a Beacon intervallummal."
                       } ,{                      
                           type: "name",
                           title: "Group Key frissítési időszak",
                           content: "Adja meg a titkosítási kulcs automatikus megújításának időintervallumát másodpercekben (minimum 30). Az alap a 0, amikor nincs megújítás."
                       } ,{                      
                           type: "name",
                           title: "WMM funkció",
                           content: "A WMM funkció garantálja, hogy a magas prioritású üzeneteket tartalmazó csomagok előnyben részesüljenek továbbításkor. Ez a funkció alapbeállításként be van kapcsolva és nem ajánlott kikapcsolni."
                       } ,{                      
                           type: "name",
                           title: "Rövid GI funkció",
                           content: "Ez a funkció alapértelmezés szerint engedélyezve van, és javasolt megtartani a csomagkapacitás növeléséhez a GI (Guard Interval) időtartamával."
                       } ,{                      
                           type: "name",
                           title: "AP Isolation funkció",
                           content: "Ha meg szeretné tiltani, hogy a hálózathoz csatlakoztatott összes vezeték nélküli eszközt interakcióba léphessen egymással, de továbbra is hozzáférhessen az internethez, jelölje be az AP izoláció engedélyezése jelölőnégyzetet."
                       },{
							type: "name",
							title: "USB 3.0 Interference Reduction",
							content: "Click enable to reduce USB 3.0 Interference."
						}]
},
       SYSTEM_PARA_WDS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wds_title",
                            title: "2.4GHz/5GHz WDS"
                       } ,{                      
                           type: "step",
                           title: "A WDS engedélyezéséhez",
                           content: "A WDS (vezeték nélküli elosztó rendszer) áthidalási funkció lehetővé teszi a vezeték nélküli hálózat lefedettségének kiterjesztését vezeték nélküli WLAN (helyi hálózat) AP-jével (hozzáférési pont) való bridge kapcsolat kialakításával."
                       } ,{                      
                           type: "step",
       content: [ 
                "1. Jelölje be a WDS Bridging funkció bekapcsolásához.",
                "2. Egy hálózat áthidalásához Szkennelés funkcióval: kattintson a Szkennelésre az összes rendelkezésre álló hálózat megtekintéséhez, majd válassza ki a hálózatot, amelyet át szeretnénk hidalni. Az SSID (hálózati név), a MAC-cím és a Biztonság automatikusan kitöltésre kerül.",
                "Vagy a hálózat manuális áthidalásához: adja meg az áthidalandó hálózat SSID (hálózati nevét), MAC-címét és WDS módját. Válasszon biztonsági típust, és adja meg a kapcsolódó paramétereket, amelyeknek meg kell egyezniük az áthidalandó hálózattal.",
                "3. Kattintson a Mentés gombra."]
} ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Ha nem biztos a WDS üzemmódban, tartsa meg az Auto alapértelmezett beállítását."
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "WPS",
                           content: "A WPS (Wi-Fi Protected Setup) segítségével a WPS-gomb megnyomásával egyszerűen csatlakoztathatja a WPS-kompatibilis eszközöket a routerhez. Jelölje be a WPS funkció engedélyezéséhez, majd kattintson a Mentés gombra."
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "NAT",
                           content: "Ez a funkció alapértelmezés szerint be van kapcsolva. Javasolt az alapértelmezett beállítás megtartása. Ha kikapcsolja, előfordulhat, hogy nem fér hozzá az internethez."
                       } ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Ha a NAT ki van kapcsolva, a NAT Forwarding és a NAT Boost nem fog működni."
                       } ,{                      
                           type: "name",
                           id: "sys_para_nat_boost",
                           title: "NAT Boost",
                           content: "Jelölje be a NAT Boost bekapcsolása jelölőnégyzetet, és kattintson a Mentés gombra, hogy az útválasztó a legjobb teljesítményt nyújtsa."
                       } ,{                      
                           type: "note",
                           id: "sys_para_nat_boost_note",
                           title: "Megjegyzés ",
                           content: "Ha a NAT Boost be van kapcsolva, a QoS és Forgalmi statisztikák automatikusan ki vannak kapcsolva."
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "DOS védelmi beállítások",
                           content: "A DOS Protection védi az útválasztót az ICMP-FLOOD, UDP-FLOOD és TCP-FLOOD támadásoktól."
                       } ,{                      
                           type: "name",
                           title: "ICMP-FLOOD Csomag szint",
                           content: "Adjon meg 5 és 7200 közötti értéket az ICMP-FLOOD védelem azonnali indításához, ha az ICMP csomagok száma meghaladja az előre beállított küszöbértéket."
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD Csomag szint",
                           content: "Adjon meg egy értéket 5 és 7200 UDP csomag között, hogy azonnal indítsa el az UDP-FLOOD védelmet, ha az UDP-csomagok száma meghaladja a jelenlegi küszöbértéket."
                       } ,{                      
                           type: "name",
                           title: "TCP-FLOOD Csomag szint",
                           content: "Adjon meg 5 és 7200 TCP-SYN csomag közötti értéket a TCP-SYN-FLOOD védelem azonnali indításához, ha a TCP-csomagok száma meghaladja a jelenlegi küszöbértéket."
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Duplex",
                           content: "Válassza ki a duplex típusát a legördülő listából, majd kattintson a Mentés gombra."
                       }]
},
       SYSTEM_PARA_LED :{ 
               TITLE:"LED vezérlés",
               CONTENT: [{
                           type: "name",
                           title: "Éjszakai mód bekapcsolása",
                           content: "Jelölje be ezt a jelölőnégyzetet a LED-ek éjszakai üzemmódban történő kikapcsolásához anélkül, hogy befolyásolná az útválasztó teljesítményét."
                       } ,{                      
                           type: "name",
                           title: "Éjszakai üzemmód időtartama",
                           content: "Adja meg azt az időtartamot, amely alatt az éjszakai üzemmód érvényes."
                       } ,{                      
                           type: "paragraph",
                           content: "A Mentés gombra kattintva mentse az összes beállítást."
                       }]
},
       OPEN_VPN :{ 
               TITLE:"OpenVPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Az OpenVPN segítségével biztonságosan hozzáférhet a hálózathoz, ha nincs otthon. A VPN szolgáltatás használatáhozrendelkeznie kell dinamikus DNS-szolgáltatással (ajánlott), vagy statikus IP-címet kell rendelnie az útválasztó WAN portjához. És a rendszeridőt szinkronizálni kell az internettel."
                       } ,{                      
                           type: "name",
                           title: "A szolgáltatás típusa",
                           content: "Válassza ki az OpenVPN szerver kommunikációs protokollját: UDP vagy TCP."
                       } ,{                      
                           type: "name",
                           title: "Szolgáltatás port",
                           content: "Adja meg a kommunikációs port számát 1024 és 65535 között. Az alapértelmezett és a közös szervíz port a 1194."
                       } ,{                      
                           type: "name",
                           title: "VPN alhálózat/Netmask",
                           content: "Adja meg az OpenVPN kiszolgáló által bérbeadható IP címek tartományát."
                       } ,{                      
                           type: "name",
                           title: "Kliens hozzáférés",
                           content: "Válassza ki az OpenVPN kliens hozzáférési típusát.",
       children: [{                      
                           type: "name",
                           title: "Csak otthoni hálózat",
                           content: "A kliens csak az otthoni hálózatot érheti el. A kliens alapértelmezett útvonalát nem változtatja meg."
                       } ,{                      
                           type: "name",
                           title: "Internet és otthoni hálózat",
                           content: "A kliens elérheti az otthoni hálózatot és az internetes oldalakat vagy szolgáltatásokat földrajzi korlátozással, amikor Ön nincs az országban. Az kliens alapértelmezett útvonalát megváltoztatja."
                       }]
}]
},
       OPEN_VPN_CERTIFICATE :{ 
               TITLE:"Tanúsítvány",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Használja a tanúsítványt a távoli ügyfelek VPN-kapcsolatának megadásához és azonosításához.",
                "Új tanúsítvány létrehozásához kattintson a Létrehozás gombra."]
}]
},
       OPEN_VPN_CONF :{ 
               TITLE:"Konfigurációs fájl",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "A távoli ügyfelek a konfigurációs fájlt használják az útválasztó eléréséhez.",
                "Az OpenVPN konfigurációs fájl mentéséhez kattintson az Export gombra."]
}]
},
       OPEN_VPN_GUIDE :{ 
               TITLE:"VPN kliens telepítési útmutató",
               CONTENT: [{
                           type: "step",
                           title: "A kliens eszközök csatlakoztatása az OpenVPN kiszolgálóhoz:",
       content: [{                      
                           type: "paragraph",
                           content: "Az OpenVPN kiszolgáló konfigurálása előtt állítsa be a dinamikus DNS-szolgáltatást (ajánlott), vagy hozzon létre egy statikus IP-címet a WAN porthoz. Ellenőrizze, hogy a NAT-beállítások külső portja nem a szerviz port, és a rendszeridő szinkronban van-e az internettel."
                       },
                "1. Válassza a VPN-kiszolgáló bekapcsolása lehetőséget.",
                "2. Állítsa be az OpenVPN kiszolgálóparamétereit (Service Type, Service Port, Client Access és VPN alhálózat / Netmask), majd kattintson a Mentés gombra.",
                "3. Kattintson a Export gombra a konfigurációs fájl mentéséhez.",
                "4. A klienseszközökön töltse le és telepítse az OpenVPN kliens segédprogramot a <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\"> http: // Openvpn.net/index.php/download/community-downloads.html </a>oldalról.",
                "A hivatalos támogatott platformok közé tartozik a Windows, a Mac OSX és a Linux.",
                "5. Indítsa el az OpenVPN kliens segédprogramot, és hozzon létre új VPN-kapcsolatot az elmentett konfigurációs fájl segítségével, hogy összekapcsolja az klienseszközt a VPN-kiszolgálóval."]
} ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Az OpenVPN kliensekről részletesen is olvashat a <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a> címen."
                       }]
},
       PPTP_VPN :{ 
               TITLE:"PPTP VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "A PPTP VPN segítségével egyszerűen, az Interneten keresztül érheti el a hálózatát, amikor nem tartózkodik otthon. Ezt a funkciót egyes szolgáltatók korlátozhatják. A VPN szolgáltatás használatához rendelkeznie kell dinamikus DNS-szolgáltatással (ajánlott), vagy statikus IP-címet kell rendelnie az útválasztó WAN portjához. És a rendszeridőt szinkronizálni kell az internettel."
                       } ,{                      
                           type: "name",
                           title: "Kliens IP-címe",
                           content: "Adja meg az IP-címek tartományát (maximum 10 kliens), amelyeket a PPTP VPN-kiszolgáló kioszthat a klienseknek."
                       } ,{                      
                           type: "name",
                           title: "Felhasználónév és jelszó",
                           content: "Adja meg a felhasználónevet és a jelszót, hogy hitelesítse az ügyfeleket a PPTP VPN szerverre."
                       }]
},
       PPTP_VPN_GUIDE :{ 
               TITLE:"VPN kliens telepítési útmutató",
               CONTENT: [{
                           type: "step",
                           title: "A kliens eszközök csatlakoztatása a PPTP VPN kiszolgálóhoz:",
       content: [{                      
                           type: "paragraph",
                           content: "Mielőtt konfigurálná a PPTP VPN kiszolgálót, konfigurálja a dinamikus DNS-szolgáltatást (ajánlott), vagy rendeljen hozzá egy statikus IP-címet a WAN porthoz. Győződjön meg róla, hogy a NAT-beállítások külső portja nem 1723, és a rendszeridő szinkronban van az internettel."
                       },
                "1. Válassza a VPN-kiszolgáló bekapcsolása lehetőséget.",
                "2. Állítsa be a PPTP VPN szerver paramétereit, majd kattintson a Mentés gombra.",
                "3. A kliens eszközökön hozzon létre egy PPTP VPN kapcsolatot. A hivatalos támogatott platformok közé tartozik a Windows, a Mac OSX, a Linux, az iOS és az Android.",
                "4. Indítsa el a PPTP VPN programot, vegyen fel új kapcsolatot, és írja be a regisztrált DDNS szolgáltatás vagy a WAN porthoz rendelt statikus IP-cím domain nevét, hogy az klienseszközt a PPTP VPN-kiszolgálóhoz csatlakoztassa."]
}]
},
       VPN_CONNNECTION :{ 
               TITLE:"VPN-kapcsolatok",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ez az oldal azokat az ügyfeleket jeleníti meg, amelyek jelenleg kapcsolódnak a routeren futtatott OpenVPN és PPTP VPN kiszolgálókhoz."
                       }]
},
       BASIC_NETWORK :{ 
               TITLE:"Hálózati térkép",
               CONTENT: [{
                           type: "paragraph",
                           content: "A Hálózati térképen megtekintheti a router aktuális hálózati kapcsolatát és vezeték nélküli adatait, valamint a csatlakoztatott eszközök adatait."
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti az internetes információkat."
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"Router",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti a vezeték nélküli hálózatok és a LAN portok aktuális hálózati adatait."
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"Vezetékes/Vezeték nélküli kliensek",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti a router csatlakoztatott klienseinek hálózati nevét (szerkeszthető), kiosztott IP és MAC címét."
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"Nyomtató",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti a router USB portjára csatlakoztatott nyomtató nevét."
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"USB lemez",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti az USB-porton keresztül az útválasztóhoz csatlakoztatott USB-lemez releváns adatait."
                       }]
},
       BASIC_SPEED_TEST :{ 
               TITLE:"Sebesség mérés",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ez a szolgáltatás teszteli a szolgáltatótól érkező aktuális feltöltési és letöltési sebességeket, és hasznos tanácsokat nyújt az internetes képességekkel kapcsolatban."
                       } ,{                      
                           type: "paragraph",
                           content: "Tipp: A pontosabb eredmény érdekében próbálja meg kikapcsolni más alkalmazásokat és programokat."
                       } ,{                      
                           type: "paragraph",
                           content: "Előzmények - A korábbi sebességmérések eredményei."
                       } ,{                      
                           type: "paragraph",
                           content: "Teszt újra - Kattintson a sebességmérési teszt végrehajtásához."
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Kattintson az Automatikus felderítés lehetőségre, vagy manuálisan válassza ki az internetkapcsolat típusát. Ezután írja be a szolgáltató által megadott megfelelő paramétereket."
                       }]
},
       BASIC_WIRELESS_SMART_CONNECT :{ 
               TITLE:"Intelligens Csatlakozás",
               CONTENT: [{
                           type: "paragraph",
                           content: "Jelölje be ezt a jelölőnégyzetet az intelligens kapcsolat engedélyezéséhez. Ezzel a funkcióval a készülékek gyorsabban futhatnak, ha a legjobb vezeték nélküli sávokat a hálózati igények kiegyenlítésére vonatkozó tényleges feltételek alapján hozzák létre."
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"Vezeték nélküli beállítások",
               CONTENT: [{
                           type: "paragraph",
                           content: "Beállíthatja a vezeték nélküli beállításokat (SSID, jelszó stb.)"
                       } ,{                      
                           type: "name",
                           title: "Hálózat neve (SSID)",
                           content: "Javasoljuk a hálózati név (SSID) megváltoztatását. Ez a mező kis- és nagybetűkre érzékeny."
                       } ,{                      
                           type: "name",
                           title: "SSID elrejtése",
                           content: "Válassza ki, hogy el szeretné-e rejteni a 2,4 GHz-es / 5 GHz-es hálózati nevet (SSID) a vezeték nélküli hálózat listájáról. Ha kiválasztotta, az SSID nem fog sugározni, és manuálisan kell csatlakozni a hálózathoz."
                       } ,{                      
                           type: "name",
                           title: "Jelszó",
                           content: "Adjon meg egy 8-63 ASCII vagy 8-64 hexadecimális karakterből álló jelszót. Ügyeljen a kis- és nagybetűkre. "
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
               TITLE:"USB tárolóeszköz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ez a funkció lehetővé teszi az USB tárolóeszközök megosztását a helyi hálózaton vagy az interneten található különböző kliensek között."
                       } ,{                      
                           type: "title",
                           title: "Eszköz beállítások",
                           content: "Az Eszközbeállítások részben az USB-porton keresztül csatlakoztatott USB-tárolóeszköz alapinformációi láthatók. Az USB flash lemez általában csak egy kötetet tartalmaz."
                       } ,{                      
                           type: "name",
                           title: "Szkennelés ",
                           content: "Általában az útválasztó automatikusan észleli az újonnan csatlakoztatott eszközöket. Ha nem, kattintson erre a gombra a képernyő frissítéséhez és legújabb adatokkal.",
       children: [{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "A szürke terület nem engedélyezett kötetet jelent. Kattintson a területre egy adott kötet megosztásához. "
                       }]
} ,{                      
                           type: "name",
                           title: "Eltávolít",
                           content: "Kattintson erre a gombra az USB-tároló eszköz biztonságosan leválasztásához, mielőtt kihúzza az USB portról.",
       children: [{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Az Eltávolítás gomb csak akkor jelenik meg, ha az USB tárolóeszköz csatlakozik a routerhez. Ha az aktuális kötet használatban van, nem lehet eltávolítani."
                       }]
} ,{                      
                           type: "step",
                           title: "Egy fájl szerver beállításához",
       content: [ 
                "1. Csatlakoztassa az USB tárolóeszközt közvetlenül az USB porthoz vagy USB kábellel. Ha a készülék külső áramforrást igényel, győződjön meg arról, hogy a külső táp csatlakoztatva van.",
                "2. Az újonnan csatlakoztatott USB-eszközt a router automatikusan észleli, és megjelenik az Eszközbeállítások rész alatt. Ha nem, kattintson a Szkennelés gombra.",
                "Megjegyzés: Megjelenik a megosztás ikon. Az ikonra kattintva letilthatja azokat a köteteket, amelyeket nem szeretne megosztani."]
}]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"Hozzáférési cím",
               CONTENT: [{
                           type: "name",
                           title: "Hálózati/Media szerver neve",
                           content: "A csatlakoztatott USB tárolóeszköz eléréséhez használt nevet jeleníti meg a Network Neighborhood metódus vagy a Media Sharing funkció segítségével. Alapértelmezés szerint TP-Share."
                       } ,{                      
                           type: "name",
                           title: "Hozzáférési mód",
                           content: "A megosztott USB-tárolóeszköz eléréséhez 3 mód érhető el.",
       children: [{                      
                           type: "name",
                           title: "Hálózati helyek",
                           content: "Válassza ezt az opciót, hogy a hálózaton lévő felhasználók hozzáférjenek a megosztott tartalmakhoz a Cím oszlopban feltüntetett címen."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Válassza ezt az opciót az FTP-kiszolgáló funkció engedélyezéséhez, amely lehetővé teszi, hogy az FTP-ügyfelek és a hálózaton lévő felhasználók hozzáférjenek az USB-tárolóeszközhöz a Cím oszlopban látható FTP-cím segítségével."
                       } ,{                      
                           type: "name",
                           title: "FTP (interneten keresztül)",
                           content: "Jelölje be ezt az opciót, hogy az FTP-ügyfelek és a felhasználók távolról hozzáférhessenek, letöltsék és feltöltsék a fájlokat a megosztott USB-tárolóeszközre az FTP-n keresztül az interneten keresztül. A hozzáférési cím testreszabásához kattintson a Szerkesztés gombra, és állítsa be a router dinamikus DNS-címét. Az FTP kiszolgáló portjának módosításához írja be az új portszámot, és kattintson a Mentés gombra a módosítások alkalmazásához."
                       }]
} ,{                      
                           type: "name",
                           title: "Cím",
                           content: "Megjeleníti a megosztott USB tárolóeszköz eléréséhez használt címet."
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "Megjeleníti az FTP-kiszolgáló eléréséhez használt portszámot."
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"Tartalmak megosztása",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti a megosztott mappákat. Minden mappa alapértelmezés szerint megosztva van. A megosztott mappák testreszabásához kattintson a Szerkesztés ikonra."
                       } ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "A megosztás ikon megjelenik az eszközbeállításokban. A megosztani kívánt kötetek letiltásához kattintson a megosztás ikonra."
                       }]
},
       FOLDER_SHARING :{ 
               TITLE:"Tartalmak és biztonság megosztása",
               CONTENT: [{
                           type: "name",
                           title: "Tartalmak megosztása",
                           content: "Megjeleníti a megosztott mappákat. Minden mappa alapértelmezés szerint megosztva van. A megosztott mappák testreszabásához kattintson a Szerkesztés ikonra.",
       children: [{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "A megosztás ikon megjelenik az eszközbeállításokban. A megosztani kívánt kötetek letiltásához kattintson a megosztás ikonra."
                       }]
} ,{                      
                           type: "name",
                           title: "Hozzáférés hitelesítés",
       content: [ 
                "Kapcsolja be a hitelesítést, amelyhez a felhasználóknak érvényes felhasználónevet és jelszót kell megadniuk ahhoz, hogy hozzáférjenek az összes megosztott mappához. A rendszergazdaként való hozzáférés a fájlok olvasására és módosítására szolgál, míg a felhasználó csak olvasási jogot kap a fájlokhoz.",
                "A felhasználónév betűvel vagy alulvonással kezdődik és 1-15 betűket, számjegyeket és alulvonást tartalmazó karakterből áll. ",
                "A jelszónak 1-15 karaktert kell tartalmaznia betűkkel, számjegyekkel és aláhúzással."]
} ,{                      
                           type: "name",
                           title: "Média megosztás bekapcsolása",
                           content: "Ezzel a funkcióval engedélyezve van, hogy a helyi hálózatban lévő összes DLNA által támogatott eszköz elérheti a médiafájlokat az összes megosztott mappában. A felhasználóknak nem kell megadniuk a felhasználónevet vagy a jelszót akkor sem, ha engedélyezve van a Hozzáférési hitelesítés."
                       }]
},
       BASIC_PRINT_SERVER :{ 
               TITLE:"Nyomtató szerver",
               CONTENT: [{
                           type: "name",
                           title: "Nyomtató szerver",
                           content: "Kapcsolja be a nyomtatószerver funkciót."
                       } ,{                      
                           type: "name",
                           title: "Nyomtató neve",
                           content: "Megjeleníti a routerhez csatlakoztatott nyomtató nevét."
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"Szülői felügyelet",
               CONTENT: [{
                           type: "paragraph",
                           content: "A Szülői felügyelet alapbeállításaival korlátozhatja a hozzáférést bizonyos napszakokban (pl. A házi feladat ideje alatt nincs internet elérés a gyermek számítógépéről)."
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"Szülői felügyelet alatt álló eszközök",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ebben a táblázatban láthatók azok a készülékek információi és beállításai, amelyeket jelenleg a Szülői felügyelet korlátoz."
                       } ,{                      
                           type: "step",
                           title: "Egy új kliens eszköz korlátozásához",
       content: [ 
                "1. Kapcsolja be a szülői felügyeleteket.",
                "2. Kattintson a Hozzáadás gombra.",
                "3. Kattintson a Szkennelés gombra egy jelenleg csatlakoztatott eszköz kiválasztásához a Hozzáférési Eszközök listából; Vagy írja be egy még nem csatlakoztatott eszköz nevét és MAC-címét manuálisan.",
                "4. Kattintson az Érvényességi idő ikonra, hogy meghatározza azt a periódust, amely alatt a korlátozás érvényes.",
                "5. Adjon meg egy rövid leírást a Leírás mezőbe. Ez a mező választható.",
                "6. Jelölje be ezt a bejegyzés bekapcsolását.",
                "7. Kattintson a Mentés gombra."]
} ,{                      
                           type: "note",
                           title: "Megjegyzés ",
                           content: "Ha ki szeretné kapcsolni ezt a bejegyzést, kattintson az Izzó ikonra."
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"Vendéghálózat",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ez a funkció lehetővé teszi, hogy Wi-Fi hozzáférést biztosítson a vendégek számára anélkül, hogy megnyitná a fő hálózatot."
                       } ,{                      
                           type: "name",
                           title: "A vendégek elérhetik egymást",
                           content: "Jelölje be ezt a jelölőnégyzetet, hogy a vendég hálózaton lévő vezeték nélküli eszközök egymással kommunikálhassanak egymással, például a hálózati szomszédok, a Samba, a Ping és az FTP segítségével."
                       } ,{                      
                           type: "name",
                           title: "A vendégek számára a Helyi hálózat elérhetővé tétele",
                           content: "Jelölje be ezt a jelölőnégyzetet, hogy a vendég hálózaton lévő vezeték nélküli eszközök kommunikálhassanak az útválasztó LAN-portjain vagy főhálózatán keresztül csatlakoztatott eszközökön, például a hálózati szomszédok, a Samba, a Ping és az FTP segítségével."
                       } ,{                      
                           type: "name",
                           title: "Vendéghálózat bekapcsolása",
                           content: "Jelölje be ezt a négyzetet, a vendéghálózat funkció bekapcsolásához."
                       } ,{                      
                           type: "name",
                           title: "Hálózat neve (SSID)",
                           content: "Vagy az alapértelmezett Guest SSID-t használja, vagy hozzon létre egy új nevet (legfeljebb 32 karakter)."
                       } ,{                      
                           type: "name",
                           title: "SSID elrejtése",
                           content: "Jelölje be ezt az opciót, ha azt szeretné, hogy elrejtse a Guest SSID-t a Wi-Fi hálózatok listájáról."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Jelszó frissítési időszak",
                           content: "Válassza ki a vendég hálózati jelszó frissítési intervallumát."
                       } ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Jelszó",
                           content: "Hozzon létre jelszót 8 és 63 ASCII karakter között, vagy 8 és 64 hexadecimális karakter között (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Jelszó",
                           content: "Használja a véletlenszerűen generált jelszót, vagy hozzon létre egy 8 és 63 közötti számő ASCII karakterből vagy 8 és 64 közötti számú hexadecimális karakterből (0-9, A-F, A-F) álló jelszót."
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"TP-Link Cloud",
               CONTENT: [{
                           type: "paragraph",
                           content: "A TP-Link Cloud szolgáltatás lehetővé teszi a hálózat valós idejű távfelügyeletét, a TP-Link eszközök elérhetőségét és kezelését az internetről bármikor és bárhol."
                       }]
},
       ACCOUNT_INFO :{ 
               TITLE:"Fiók információ",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti meg a TP-Link Azonosító (ID) információt. A fiók adatainak szerkesztéséhez kattintson a Szerkesztés ikonra."
                       }]
},
       DEVICE_INFO :{ 
               TITLE:"Eszköz információ",
               CONTENT: [{
                           type: "paragraph",
                           content: "Megjeleníti eszközadatait, beleértve az eszköz kezelését végző Cloud fiókot is."
                       }]
},
       BOUND_ACCOUNT :{ 
               TITLE:"Összekötött fiókok",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ez a táblázat azokat a cloud fiókokat jeleníti meg, amelyek jelenleg az eszközhöz vannak kötve."
                       } ,{                      
                           type: "step",
                           title: "Felhasználói fiók összekötése",
       content: [ 
                "1. Kattintson az Összekötés gombra.",
                "2. Adja meg az összekötni kívánt regisztrált email címet.",
                "3. Kattintson a Mentés gombra."]
}]
},
       NEW_PARENTAL_CONTROL :{ 
               TITLE:"Szülői felügyelet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Korosztály szűrők, hozzáférési korlátok és felhasználói profilok segítségével a Szülői felügyelet biztosítja családjának személyre szabott és megfelelő internet-hozzáférést."
                       } ,{                      
                           type: "step",
                           title: "A szülői felügyelet alkalmazása új eszközre",
       content: [ 
                "1. Kattintson a Hozzáadás gombra.",
                "2. Adjon meg egy nevet ehhez a profilhoz, és kattintson a \"+\" gombra eszköz(ök) hozzáadásához a profilhoz. ",
                "3. Válasszon szűrőszintet, és testreszabhatja a szűrő tartalmát az Ön igényeinek megfelelően. A kulcsszavakat olyan webhelyek kereséséhez adhatja meg, amelyeket szűrni szeretne az adatbázisunkban. Más weboldalak (URL-ek) kézzel is beírhatók. <br/> A különböző szűrőkategóriákra a következő magyarázatokat tekintheti meg: <p> Felnőtt tartalom - olyan webhelyek, amelyek szexuális, káros vagy tiltott tartalmakat tartalmaznak, beleértve a pornográfiát, az anyaghasználatot, az erőszakot és a megkülönböztetést </ P> <p> Szerencsejáték - olyan játékok, amelyek támogatják a szerencsejátékokat, beleértve az online szerencsejáték oldalakat is. </ P> <p> Szexuális nevelés - olyan oldalak, amelyek informatív módon tárgyalják a szexualitást, beleértve a reprodukciót, a szexualitást, Szexuális trauma kezelésére </ p> <p> Online kommunikáció - olyan webhelyek, amelyek a szöveggel, hanggal vagy videóval, például e-mailen, blogokon, online fórumokon, VoIP- és videocsevegési szolgáltatásokon keresztül kommunikálnak másokkal </ p> P> Közösségi hálózatok - Olyan webhelyek, amelyek terjesztik a személyes véleménynyilvánítást vagy kommunikációt, összekapcsolják az embereket és személyes tevékenységüket hasonló érdeklődési körökön, karrierjükön, háttérükön vagy valós ismeretségükön keresztül. </ P> <p> Pay to Surf - Weboldalak, e-mail üzenetek vagy hirdetések, linkek lekérése vagy felmérésekre való reagálás </ p> <p> Média - Ingyenes, fizetett vagy előfizetett audio- és / vagy videoanyagokat kínáló webhelyek, beleértve a streaming szolgáltatásokat, a televíziós programozást vagy a zenelejátszásokat </ p > <P> Letöltések - A fájlmegosztást és -elosztást biztosító vagy hozzáférést biztosító webhelyek, köztük a peer-to-peer megosztás, az online fájlok tárolása és a mobileszköz-tartalom (pl. Zene és alkalmazások) </ p> <p> Játékok - Amelyek biztosítják vagy hozzáférést biztosítanak webes vagy letölthető játékokhoz, beleértve az online játékokat, a játékkonzolhálózatokat és a böngészőjátékokat </ p>",
                "4. Ha korlátozni szeretné a profil számára az interneten tölthető összes időt, engedélyezze és határozza meg a határidőket. Az Alvásidő használatával is beállíthatja a napi időtartamot, amely alatt a profil alatt lévő eszközök nem használhatják az internetet.",
                "5. Kattintson a Mentés gombra."]
} ,{                      
                           type: "step",
                           title: "A profil részletes internetes előzményeinek megtekintése",
       content: [ 
                "1. A Statisztikák oszlopban kattintson a vonatkozó Statisztika gombra.",
                "2. Ha további bejegyzéseket szeretne látni, kattintson az Előzmények <span class=\"ptl-ctr-help-icon history\"></span> gombra.",
                "3. A webhelyeket blokkolhatja vagy feloldhatja a <span class=\"ptl-ctr-help-icon block\">​​</span> vagy a <span class=\"ptl-ctr-help-icon unblock\"></span> gombra kattintva."]
} ,{                      
                           type: "step",
                           title: "Az internet-hozzáférés azonnali letiltásához vagy engedélyezéséhez",
       content: [ 
                "Az Internet hozzáférés oszlopban kattintson a <span class=\"ptl-ctr-help-icon stop\"></span> gombra, hogy a megfelelő profil eszközei számára leááíltsa az internet elérést, majd kattintson a <span class=\"ptl-ctr-help-icon enable\"></span> ikonra annak újbóli engedélyezéséhez."]
}]
},
       BASIC_QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "A QoS (Quality of Service) funkció rangsorolja az online tevékenységeket és eszközöket, hogy a gyorsabb hálózati kapcsolatot garantálja, amikor a leginkább szüksége van rájuk."
                       } ,{                      
                           type: "paragraph",
                           content: "Válassza az Alkalmazás prioritása lehetőséget a hálózat sebességének az online tevékenységekhez való kiemeléséhez, és válassza az Eszköz prioritása lehetőséget a hálózatok sebességének prioritásra az eszközök számára."
                       }]
},
       BASIC_APPLICATION_PRIORITY :{ 
               TITLE:"Alkalmazási prioritás",
               CONTENT: [{
                           type: "paragraph",
                           content: "Válassza ki azt az online tevékenységet, amelyet prioritásként szeretne meghatározni, vagy kattintson az Egyéni gombra az online tevékenység elsőbbségi szintjének beállításához."
                       }]
},
       BASIC_DEVICE_PRIORITY :{ 
               TITLE:"Eszköz prioritás",
               CONTENT: [{
                           type: "paragraph",
                           content: "Válassza ki azokat a készülék (ek) et, melyeket prioritásként szeretne meghatározni, és mennyi ideig lesznek kiemeltek."
                       } ,{                      
                           type: "step",
                           title: "Egy eszköz prioritásának beállításához",
       content: [ 
                "1. Keresse meg azt a készüléket, amelyet prioritásként szeretne felsorolni a listában, és kapcsolja be a Prioritást.",
                "2. Adja meg, hogy az Időzítés oszlopban milyen időtartamra legyen prioritás."]
}]
},
       ANTI_VIRUS :{ 
               TITLE:"Vírusvédelem",
               CONTENT: [{
                           type: "paragraph",
                           content: "A gyakori hálózati vizsgálat, a rosszindulatú webhelyek felderítése és a fertőzött eszközök elkülönítése révén az Antivirus szolgáltatás védi személyes adatait. Azt is ellenőrizheti, hogy a hálózat védett-e, és történt-e támadás a hálózaton."
                       } ,{                      
                           type: "paragraph",
                           content: "Előzmények - Feljegyzi a vírusvédelem által védett eszközöket, valamint a támadások forrását és osztályozását."
                       } ,{                      
                           type: "paragraph",
                           content: "Összes engedélyezése - Érintse meg az összes védett típus engedélyezéséhez, ha egy vagy több nem engedélyezett."
                       } ,{                      
                           type: "paragraph",
                           content: "Védett típusok - A védelmi típusok engedélyezése a magyarázatok alapján. Ajánlatos az összes védett típust engedélyezni."
                       }]
},
       APPLICATION_PRIORITY :{ 
               TITLE:"Alkalmazási prioritás",
               CONTENT: [{
                           type: "paragraph",
                           content: "Az Alkalmazás prioritás funkcióval meghatározhat priorizált online tevékenységeket, melyek számára gyorsabb hálózati kapcsolatot szeretne biztosítani, amikor a leginkább szüksége van rá. Válassza ki azt az online tevékenységet, amelyet prioritásként szeretne meghatározni, vagy kattintson az Egyéni gombra az online tevékenység elsőbbségi szintjének beállításához."
                       }]
},
       DEVICE_PRIORITY :{ 
               TITLE:"Eszköz prioritás",
               CONTENT: [{
                           type: "paragraph",
                           content: "Az Eszköz prioritás funkcióval meghatározhat priorizált eszközöket, amelyek számára gyorsabb hálózati kapcsolatot szeretne biztosítani, amikor a leginkább szüksége van rá. Válassza ki azokat a készülék(ek)et, melyeket prioritásként szeretne meghatározni, és mennyi ideig lesznek kiemeltek."
                       } ,{                      
                           type: "step",
                           title: "Egy eszköz prioritásának beállításához",
       content: [ 
                "1. Keresse meg azt a készüléket, amelyet prioritásként szeretne felsorolni a listában, és kapcsolja be a Prioritást.",
                "2. Adja meg, hogy az Időzítés oszlopban milyen időtartamra legyen prioritás."]
}]
},
       FIREWALL :{ 
               TITLE:"Tűzfal",
               CONTENT: [{
                           type: "paragraph",
                           content: "Az SPI (Stateful Packet Inspection) tűzfal megakadályozza a számítógépes támadásokat és engedélyezi a a routeren áthaladó forgalmat a protokoll alapján. Alapértelmezés szerint ez a funkció engedélyezve van."
                       } ,{                      
                           type: "name",
                           title: "Az SPI tűzfal bekapcsolása",
                           content: "Ne kapcsolja ki az SPI tűzfalat, csak ha feltétlenül szükséges."
                       } ,{                      
                           type: "name",
                           title: "Ping-ek engedélyezése a WAN portról / Ping-ek engedélyezése a LAN portról ",
                           content: "Kapcsolja be a ping csomagok engedélyezéséhez a WAN / LAN portról. Javasolt az alapértelmezett beállítások megtartása."
                       }]
},
       "" :     ""
    };
})(jQuery);
