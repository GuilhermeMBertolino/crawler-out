(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează informații relevante despre conexiunea WAN (Internet)."
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"Wireless 2.4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează informații relevante despre rețeaua wireless."
                       }]
},
       STATUS_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează informații despre porturile Ethernet (LAN)."
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"Guest Network 2.4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează informații despre rețeaua wireless guest."
                       }]
},
       STATUS_USB :{ 
               TITLE:"Dispozitive USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează informații despre dispozitivele de stocare USB și/sau imprimanta conectată la router prin intermediul portului USB."
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"Performanță",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează informații despre performanța routerului curent."
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"Clienți Cablu",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează informații despre dispozitivele prin cablu conectate la rețea."
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"Clienți Wireless",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează informații despre dispozitivele wireless conectate la rețea."
                       }]
},
       INTERNET_TITLE :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Configurați parametrii IPv4 și selectați metoda adecvată de Clonare MAC."
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"IPv4",
               CONTENT: [{
                           type: "paragraph",
                           content: "Alegeți tipul conexiunii la Internet și introduceți parametrii corespunzatori."
                       } ,{                      
                           type: "title",
                            title: "Tipul Conexiunii la Internet: IP Dinamic"
                       } ,{                      
                           type: "paragraph",
                           content: "Alegeți acest tip dacă ISP-ul vă asigură conexiunea printr-un server DHCP."
                       } ,{                      
                           type: "name",
                           title: "Adresa IP/Subnet Mask/Default Gateway/DNS Primar/DNS Secundar",
                           content: "Acești parametri sunt atribuiți automat de serverul DHCP al ISP-ului."
                       } ,{                      
                           type: "name",
                           title: "Reînnoire",
                           content: "Apăsați pentru a obține noi parametri IP de la serverul DHCP."
                       } ,{                      
                           type: "name",
                           title: "Eliberare",
                           content: "Apăsați pentru a elibera toate adresele IP atribuite de serverul DHCP."
                       } ,{                      
                           type: "name",
                           title: "Adresă DNS",
                           content: "Dacă furnizorul dumneavoastră de Internet oferă una sau două adrese DNS, selectați această casetă și introduceți DNS-ul Primar și DNS-ul Secundar în câmpurile corespunzătoare. În caz contrar, adresele DNS vor fi alocate automat de furnizorul dumneavoastră de Internet."
                       } ,{                      
                           type: "name",
                           title: "Dimensiune MTU",
                           content: "Dimensiunea MTU (Maximum Transmission Unit) implicită și uzuală pentru majoritatea rețelelor Ethernet este de 1500 Bytes. Nu este recomandat să modificați dimensiunea implicită MTU, cu excepția cazului în care furnizorul dumneavoastră de Internet solicită acest lucru."
                       } ,{                      
                           type: "name",
                           title: "Nume Gazdă",
                           content: "Introduceți o valoare în acest câmp pentru a specifica numele de gazdă al routerului (Host Name)."
                       } ,{                      
                           type: "name",
                           title: "Obțineți IP folosind DHCP Unicast",
                           content: "Bifați această căsuță dacă serverul DHCP al ISP nu suportă aplicații broadcast și nu puteți obține in mod dinamic o adresă IP."
                       } ,{                      
                           type: "title",
                            title: "Tipul Conexiunii la Internet: IP Static"
                       } ,{                      
                           type: "paragraph",
                           content: "Selectați acest tip dacă furnizorul dumneavoastră de Internet vă oferă următorii parametri de conectare: o anumită adresă IP (fixă), Subnet Mask, Gateway, DNS."
                       } ,{                      
                           type: "name",
                           title: "Adresa IP/Subnet Mask/Default Gateway/DNS Primar/DNS Secundar",
                           content: "Introduceți informațiile oferite de către ISP."
                       } ,{                      
                           type: "name",
                           title: "Dimensiune MTU",
                           content: "Dimensiunea MTU (Maximum Transmission Unit) implicită și uzuală pentru majoritatea rețelelor Ethernet este de 1500 Bytes. Nu este recomandat să modificați dimensiunea implicită MTU, cu excepția cazului în care furnizorul dumneavoastră de Internet solicită acest lucru."
                       } ,{                      
                           type: "title",
                            title: "Tipul Conexiunii la Internet: BigPond Cable"
                       } ,{                      
                           type: "paragraph",
                           content: "Alegeți acest tip dacă ISP vă asigură conexiune de tip BigPond Cable."
                       } ,{                      
                           type: "name",
                           title: "Utilizator/Parolă",
                           content: "Introduceți numele de utilizator și parola oferite de ISP. Aceste câmpuri sunt sensibile la majuscule."
                       } ,{                      
                           type: "name",
                           title: "Server Autentificare",
                           content: "Introduceți adresa IP a serverului de autentificare sau numele de gazdă."
                       } ,{                      
                           type: "name",
                           title: "Domeniu Autentificare",
                           content: "Introduceți sufixul numelui de domeniu (în funcție de locație). De exemplu, nsw.bigpond.net.au pentru NSW/ACT, vic.bigpond.net.au pentru VIC/TAS/WA/SA/NT, sau qld.bigpond.net.au pentru QLD."
                       } ,{                      
                           type: "name",
                           title: "Dimensiune MTU",
                           content: "Dimensiunea MTU (Maximum Transmission Unit) implicită și uzuală pentru majoritatea rețelelor Ethernet este de 1500 Bytes. Nu este recomandat să modificați dimensiunea implicită MTU, cu excepția cazului în care furnizorul dumneavoastră de Internet solicită acest lucru."
                       } ,{                      
                           type: "name",
                           title: "Mod Conectare",
                           content: "Selectați un mod de conectare corespunzător tipului dumneavoastră de conexiune la Internet.",
       children: [{                      
                           type: "name",
                           title: "Automat",
                           content: "În acest mod, conexiunea la Internet se realizează automat de fiecare dată cand aceasta se deconecteaza."
                       } ,{                      
                           type: "name",
                           title: "La Cerere",
                           content: "În acest mod, conexiunea la Internet va fi oprită automat după o perioadă de inactivitate specificată (Timp Maxim de Inactivitate). Conexiunea este restabilită atunci când încercați să accesați Internetul din nou."
                       } ,{                      
                           type: "name",
                           title: "Manual",
                           content: "În acest mod, conexiunea la Internet este controlată manual apăsând pe butonul Deconectare sau Conectare. Acest mod suportă de asemenea functia Timp Maxim de Inactivitate. Introduceți în câmpul Timp Maxim de Inactivitate un timp maxim (în minute) pentru care conexiunea la Internet poate fi inactivă înainte de a fi încheiată. Valoarea implicită este de 15 minute. Dacă doriți sa se mențină activă conexiunea la Internet în orice moment, introduceți 0 (zero)."
                       }]
} ,{                      
                           type: "title",
                            title: "Tipul Conexiunii la Internet: PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "Selectați acest tip dacă utilizați serviciul DSL (Digital Subscriber Line), fiind prevăzut cu un nume de utilizator și o parolă de la furnizorul dumneavoastră de Internet."
                       } ,{                      
                           type: "name",
                           title: "Utilizator/Parolă",
                           content: "Introduceți numele de utilizator și parola oferite de ISP. Aceste câmpuri sunt sensibile la majuscule."
                       } ,{                      
                           type: "name",
                           title: "Adresă IP/DNS Primar/DNS Secundar",
                           content: "Acești parametri sunt atribuiți automat de serverul DHCP al ISP-ului."
                       } ,{                      
                           type: "name",
                           title: "Conexiune Secundară (Niciuna, IP Dinamic, IP Static)",
       children: [{                      
                           type: "name",
                           title: "Niciuna",
                           content: "Selectați dacă nu este prevăzută o conexiune secundară."
                       } ,{                      
                           type: "name",
                           title: "IP Dinamic",
                           content: "Selectați această opțiune dacă adresele IP și Subnet Mask sunt furnizate automat de furnizorul de servicii Internet.",
       children: [{                      
                           type: "name",
                           title: "Reînnoire",
                           content: "Apăsați pentru a reînnoi parametrii IP oferiți de ISP."
                       } ,{                      
                           type: "name",
                           title: "Eliberare",
                           content: "Apăsați pentru a elibera parametrii IP atribuiți."
                       }]
} ,{                      
                           type: "name",
                           title: "IP Static",
                           content: "Selectați dacă adresa IP și masca de subrețea sunt oferite de ISP, și introduceți informațiile în câmpurile corespunzătoare."
                       }]
} ,{                      
                           type: "name",
                           title: "Dimensiune MTU",
                           content: "Dimensiunea MTU (Maximum Transmission Unit) tipică pentru rețelele Ethernet este 1480 Bytes.",
       children: [{                      
                           type: "note",
                           title: "Notă",
                           content: "În cazuri izolate, ISP-ul poate solicita ajustarea valorii MTU pentru performanțe de rețea superioare. Nu modificați această valoare decât dacă este absolut necesar."
                       }]
} ,{                      
                           type: "name",
                           title: "Nume Serviciu/Nume Concentrator Acces",
                           content: "Implicit, Service Name și Access Concentrator (AC) sunt câmpuri goale. Aceste câmpuri nu ar trebui sa fie configurate decât dacă sunt solicitate de ISP."
                       } ,{                      
                           type: "name",
                           title: "Detectare Interval Online",
                           content: "Introduceți o valoare cuprinsă între 0 și 120 (secunde) pentru care routerul detectează activitatea Concentratorului de Acces la fiecare interval. Valoarea implicită este 10."
                       } ,{                      
                           type: "name",
                           title: "Adresa IP",
                           content: "Dacă ISP-ul vă oferă o adresă IP specifică (fixă), alegeți Utilizați următoarea adresă IP și introduceți adresa IP în câmpul dedicat. În caz contrar, alegeți Obțineți adresa IP în mod dinamic de la serverul ISP."
                       } ,{                      
                           type: "name",
                           title: "Adresă DNS",
                           content: "Dacă ISP-ul oferă o adresă IP specifică (fixă), alegeți Utilizați următoarea adresă DNS și introduceți adresa (adresele) în câmpurile DNS primar și respectiv DNS secundar. În caz contrar, alegeți Obțineți adresa (adresele) DNS în mod dinamic de la serverul ISP. "
                       } ,{                      
                           type: "name",
                           title: "Mod Conectare",
                           content: "Selectați un mod de conectare corespunzător tipului dumneavoastră de conexiune la Internet.",
       children: [{                      
                           type: "name",
                           title: "Automat",
                           content: "În acest mod, conexiunea la Internet se realizează automat de fiecare dată cand aceasta se deconecteaza."
                       } ,{                      
                           type: "name",
                           title: "La Cerere",
                           content: "În acest mod, conexiunea la Internet va fi oprită automat după o perioadă de inactivitate specificată (Timp Maxim de Inactivitate). Conexiunea este restabilită atunci când încercați să accesați Internetul din nou."
                       } ,{                      
                           type: "name",
                           title: "Programat",
                           content: "În acest mod, conexiunea la Internet este stabilită doar într-un anumit interval de timp. Dacă este selectată această opțiune, introduceți ora de început și ora de încheiere; ambele sunt în formatul OO:MM."
                       } ,{                      
                           type: "name",
                           title: "Manual",
                           content: "În acest mod, conexiunea la Internet este controlată manual apăsând pe butonul Deconectare sau Conectare. Acest mod suportă de asemenea functia Timp Maxim de Inactivitate. Introduceți în câmpul Timp Maxim de Inactivitate un timp maxim (în minute) pentru care conexiunea la Internet poate fi inactivă înainte de a fi încheiată. Valoarea implicită este de 15 minute. Dacă doriți sa se mențină activă conexiunea la Internet în orice moment, introduceți 0 (zero)."
                       } ,{                      
                           type: "note",
                           title: "Notă",
                           content: "Modul de conectare Programat va intra în vigoare numai în momentul în care timpul sistemului din meniul Avansat > Unelte Sistem > Setări Oră este configurat."
                       }]
} ,{                      
                           type: "title",
                            title: "Tipul Conexiunii la Internet: L2TP/PPTP"
                       } ,{                      
                           type: "paragraph",
                           content: "Selectaţi acest tip dacă vă conectaţi la un Server VPN L2TP/PPTP, fiind prevăzut cu un Nume de Utilizator, Parolă și Adresă IP/Nume Domeniu a/al serverului furnizorului dumneavoastră de Internet."
                       } ,{                      
                           type: "name",
                           title: "Utilizator/Parolă",
                           content: "Introduceți numele de utilizator și parola oferite de ISP. Aceste câmpuri sunt sensibile la majuscule."
                       } ,{                      
                           type: "name",
                           title: "Adresă IP/DNS Primar/DNS Secundar",
                           content: "Acești parametri sunt atribuiți automat de serverul DHCP al ISP-ului."
                       } ,{                      
                           type: "name",
                           title: "Conexiune Secundară (IP Dinamic sau IP Static)",
       children: [{                      
                           type: "name",
                           title: "IP Dinamic",
                           content: "Selectați această opțiune dacă adresele IP și Subnet Mask sunt furnizate automat de furnizorul de servicii Internet."
                       } ,{                      
                           type: "name",
                           title: "IP Static",
                           content: "Alegeți dacă adresa IP, masca de subrețea, gateway și adresele DNS sunt oferite de ISP și introduceți informațiile în câmpurile corespunzătoare."
                       }]
} ,{                      
                           type: "name",
                           title: "Adresă IP Server VPN/Nume Domeniu",
                           content: "Introduceți adresa IP a serverului VPN sau numele de domeniu oferit de ISP."
                       } ,{                      
                           type: "name",
                           title: "Dimensiune MTU",
                           content: "Valoarea uzuală și implicită a dimensiunii MTU (Maximum Transmission Unit) pentru majoritatea rețelelor Ethernet este 1460 Bytes pentru L2TP sau 1420 Bytes pentru PPTP. NU este recomandat să schimbați valoarea MTU decât dacă v-a fost solicitat de ISP."
                       } ,{                      
                           type: "name",
                           title: "Mod Conectare",
                           content: "Selectați un mod de conectare corespunzător tipului dumneavoastră de conexiune la Internet.",
       children: [{                      
                           type: "name",
                           title: "Automat",
                           content: "În acest mod, conexiunea la Internet se realizează automat de fiecare dată cand aceasta se deconecteaza."
                       } ,{                      
                           type: "name",
                           title: "La Cerere",
                           content: "În acest mod, conexiunea la Internet va fi oprită automat după o perioadă de inactivitate specificată (Timp Maxim de Inactivitate). Conexiunea este restabilită atunci când încercați să accesați Internetul din nou."
                       } ,{                      
                           type: "name",
                           title: "Manual",
                           content: "În acest mod, conexiunea la Internet este controlată manual apăsând pe butonul Deconectare sau Conectare. Acest mod suportă de asemenea functia Timp Maxim de Inactivitate. Introduceți în câmpul Timp Maxim de Inactivitate un timp maxim (în minute) pentru care conexiunea la Internet poate fi inactivă înainte de a fi încheiată. Valoarea implicită este de 15 minute. Dacă doriți sa se mențină activă conexiunea la Internet în orice moment, introduceți 0 (zero)."
                       }]
}]
},
       INTERNET_MAC :{ 
               TITLE:"Clonare MAC",
               CONTENT: [{
                           type: "paragraph",
                           content: "Alegeți metoda de clonare MAC corespunzătoare."
                       } ,{                      
                           type: "name",
                           title: "NU clonați adresa MAC",
                           content: "NU schimbați adresa MAC a routerului în cazul în care furnizorul de Internet asociază adresa dumneavoastră IP de această adresă MAC."
                       } ,{                      
                           type: "name",
                           title: "Clonați Adresa MAC a computerului conectat",
                           content: "Selectaţi pentru a copia adresa MAC a computerului care este conectat la router, în cazul în care furnizorul dumneavoastră de Internet leagă Adresa IP alocată de adresa MAC a computerului."
                       } ,{                      
                           type: "name",
                           title: "Utilizează o adresă MAC personalizată",
                           content: "Introduceţi Adresa MAC manual, în cazul în care furnizorul dumneavoastră de Internet leagă adresa IP alocată de o adresă MAC specificată."
                       }]
},
       INTERNET_WAN_AGGREGATION :{ 
               TITLE:"Agregare WAN",
               CONTENT: [{
                           type: "paragraph",
                           id: "internet_wan_aggregation_detail",
                           content: "Agregarea WAN transformă portul LAN1 într-un port suplimentar WAN, și creează o singură conexiune cu o lățime mare de bandă. Pornește o conexiune la Internet mai rapidă pentru furnizorii de Internet care oferă lățime de bandă de peste 1 Gbps și astfel performanțele nu vor mai fi limitate de echipamentele de rețea."
                       } ,{                      
                           type: "note",
                           id: "internet_wan_aggregation_note",
                           title: "Notă",
                           content: "Înainte de a activa această funcție, asigură-te că furnizorul tău de Internet suportă Agregare WAN, iar modemul tău are 2 porturi WAN."
                       } ,{                      
                           type: "step",
                           title: "Pentru activare agregare WAN",
       content: [ 
                "1. Comută Agregare WAN pe pornit pentru a activa această funcție.",
                "2. Apasă Salvare.",
                "3. Conectează porturile WAN și LAN1 ale routerului la cele 2 porturi WAN ale modemului cu două cabluri Ethernet."]
}]
},
       LAN_IPV4 :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează adresa MAC, adresa IP și masca de subrețea a routerului."
                       } ,{                      
                           type: "name",
                           title: "Adresa MAC",
                           content: "Adresa fizică unică atribuită portului Ethernet al routerului (LAN)."
                       } ,{                      
                           type: "name",
                           title: "Adresa IP",
                           content: "Afișează adresa IP implicită a routerului care este utilizată pentru autentificare in pagina de administrare. Se poate schimba cu altă adresă."
                       } ,{                      
                           type: "name",
                           title: "Mască Subrețea",
                           content: "Alegeți un identificator atribuit utilizat de portul LAN pentru a direcționa traficul intern și extern sau introduceți o nouă mască de subrețea."
                       } ,{                      
                           type: "note",
                           title: "Notă",
                           content: "Dacă noua adresă IP LAN nu se află în același subnet cu cea veche, Intervalul de Adrese IP alocat de serverul DHCP va fi configurat automat. Cu toate acestea, funcțiile Virtual Server si DMZ nu vor funcționa corespunzător până când nu sunt reconfigurate."
                       }]
},
       LINK_AGG :{ 
               TITLE:"Agregare Linkuri",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funcția Agregare linkuri combină două porturi pentru a realiza un singur flux de date, realizând astfel o performanță superioară și foarte stabilă a rețelei prin cablu."
                       } ,{                      
                           type: "step",
                           id: "link_agg_step_help",
                           title: "Pentru a aplica agregarea linkurilor:",
       content: [ 
                "1. Comută pentru a activa funcția Agregare Linkuri.",
                "2. Specifică două porturi pentru agregarea linkurilor.",
                "3. Apăsați Salvare."]
}]
},
       IPTV :{ 
               TITLE:"IPTV",
               CONTENT: [{
                           type: "paragraph",
                           content: "IPTV (Internet Protocol Television) este un sistem prin care serviciile de televiziune sunt livrate folosind suita de protocol Internet printr-o rețea cu comutare de pachete, cum ar fi o rețea LAN sau Internet."
                       } ,{                      
                           type: "name",
                           id: "igmp-snooping",
                           title: "Snooping IGMP",
                           content: "IGMP (Internet Group Management Protocol) permite routerului să redirecţioneze traficul multicast către porturile care îl solicită."
                       } ,{                      
                           type: "name",
                           title: "IGMP Proxy",
                           content: "Selectați pentru a activa funcția IGMP Proxy dacă serviciul IPTV furnizat de ISP este bazat pe tehnologia IGMP."
                       } ,{                      
                           type: "name",
                           title: "Versiune IGMP",
                           content: "Selectează versiunea IGMP în funcție de ISP-ul tău. Valoarea implicită IGMP este versiunea V2."
                       } ,{                      
                           type: "name",
                           id: "igmp-wifi",
                           title: "Wireless Multicast Forwarding",
                           content: "Selectați pentru a activa funcția Wireless Multicast Forwarding, care permite pachetelor multicast să fie redirecționate către rețeaua wireless."
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "Selectați pentru a activa funcția IPTV dacă serviciul IPTV furnizat de ISP nu este bazat pe tehnologia IGMP."
                       } ,{                      
                           type: "name",
                           title: "Profil ISP",
                           content: "Selectează profilul corespunzător ISP-ului tău (furnizorul de servicii Internet) pentru a finaliza configurarea. Există trei tipuri de profile:",
       children: [{                      
                           type: "name",
                           title: "Țară-Nume ISP",
                           content: "Setările implicite pentru profilele ISP sunt de forma \"Țară-Nume ISP\". Caută și selectează ISP-ul din meniul vertical."
                       } ,{                      
                           type: "name",
                           id: "iptv_bridge_child_1to4",
                           title: "Bridge",
                           content: "În cazul în care ISP-ul tău nu este listat și nu sunt necesari parametri adiționali pentru a configura IPTV, poți selecta acest profil și să specifici portul LAN dedicat IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Precizează ce fel de date se vor transmite folosind portul LAN. De exemplu, în cazul în care IPTV este selectat pentru LAN1, acesta va transmite numai date IPTV și va trebui să conectezi dispozitivul set-top box în portul LAN1."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_2to5",
                           title: "Bridge",
                           content: "În cazul în care ISP-ul tău nu este listat și nu sunt necesari parametri adiționali pentru a configura IPTV, poți selecta acest profil și să specifici portul LAN dedicat IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Specifică ce tip de date va transmite portul LAN. De exemplu, dacă este selectat IPTV pentru portul LAN2, acesta va transmite doar date IPTV și va trebui să conectezi echipamentul Set-top box la LAN2."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_5to8",
                           title: "Bridge",
                           content: "În cazul în care ISP-ul tău nu este listat și nu sunt necesari parametri adiționali pentru a configura IPTV, poți selecta acest profil și să specifici portul LAN dedicat IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Specifică ce tip de date va transmite portul LAN. De exmplu, dacă este selectat IPTV pentru portul LAN5, acesta va transmite doar date IPTV și va trebui să conectezi echipamentul Set-top box la LAN5."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_1to4",
                           title: "Personalizat",
                           content: "În cazul în care ISP-ul tău nu este listat, dar îți oferă anumiți parametri necesari, cum ar fi Internet/VoIP/ID-uri VLAN pentru IPTV și Prioritatea, selectează acest profil.",
       children: [{                      
                           type: "name",
                           title: "Prioritate ID VLAN Internet/VoIP/IPTV",
                           content: "Configurați ID-urile și prioritățile VLAN furnizate de ISP."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Selectați dacă să se eticheteze pachetele de Internet cu 802.11Q"
                       } ,{                      
                           type: "name",
                           title: "IPTV Multicast VLAN ID/Prioritate",
                           content: "Aveți posibilitatea să activați caracteristicile multicast IPTV în funcție de preferințe, și să configurați ID-ul VLAN și prioritățile în conformitate cu ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Precizează ce fel de date se vor transmite folosind portul LAN. De exemplu, în cazul în care IPTV este selectat pentru LAN1, acesta va transmite numai date IPTV și va trebui să conectezi dispozitivul set-top box în portul LAN1."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_2to5",
                           title: "Personalizat",
                           content: "În cazul în care ISP-ul tău nu este listat, dar îți oferă anumiți parametri necesari, cum ar fi Internet/VoIP/ID-uri VLAN pentru IPTV și Prioritatea, selectează acest profil.",
       children: [{                      
                           type: "name",
                           title: "Prioritate ID VLAN Internet/VoIP/IPTV",
                           content: "Configurați ID-urile și prioritățile VLAN furnizate de ISP."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Selectați dacă să se eticheteze pachetele de Internet cu 802.11Q"
                       } ,{                      
                           type: "name",
                           title: "IPTV Multicast VLAN ID/Prioritate",
                           content: "Aveți posibilitatea să activați caracteristicile multicast IPTV în funcție de preferințe, și să configurați ID-ul VLAN și prioritățile în conformitate cu ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Specifică ce tip de date va transmite portul LAN. De exemplu, dacă este selectat IPTV pentru portul LAN2, acesta va transmite doar date IPTV și va trebui să conectezi echipamentul Set-top box la LAN2."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_5to8",
                           title: "Personalizat",
                           content: "În cazul în care ISP-ul tău nu este listat, dar îți oferă anumiți parametri necesari, cum ar fi Internet/VoIP/ID-uri VLAN pentru IPTV și Prioritatea, selectează acest profil.",
       children: [{                      
                           type: "name",
                           title: "Prioritate ID VLAN Internet/VoIP/IPTV",
                           content: "Configurați ID-urile și prioritățile VLAN furnizate de ISP."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "Selectați dacă să se eticheteze pachetele de Internet cu 802.11Q"
                       } ,{                      
                           type: "name",
                           title: "IPTV Multicast VLAN ID/Prioritate",
                           content: "Aveți posibilitatea să activați caracteristicile multicast IPTV în funcție de preferințe, și să configurați ID-ul VLAN și prioritățile în conformitate cu ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Specifică ce tip de date va transmite portul LAN. De exmplu, dacă este selectat IPTV pentru portul LAN5, acesta va transmite doar date IPTV și va trebui să conectezi echipamentul Set-top box la LAN5."
                       }]
}]
}]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"Server DHCP",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "În mod implicit, serverul DHCP (Dynamic Host Configuration Protocol) este activat; se alocă dinamic parametrii TCP/IP pentru dispozitive client, din intervalul de adrese IP.",
                "NU dezactivați serverul DHCP, decât dacă aveți alt server DHCP sau doriți să alocați manual parametrii TCP/IP pentru fiecare dispozitiv client din rețea."]
} ,{                      
                           type: "name",
                           title: "Interval Adrese IP",
                           content: "Introduceți un interval de adrese IP care pot fi acordate clienților."
                       } ,{                      
                           type: "name",
                           title: "Durată Alocare Adresă IP",
                           content: "Introduceți durata de timp (între 1 și 2880 minute), în care o adresă IP este atribuită unui client. Valoarea implicită este de 120."
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"Rezervare Adrese IP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează parametrii corespunzători ai dispozitivelor IP rezervate."
                       } ,{                      
                           type: "step",
                           title: "Pentru a rezerva o adresă IP",
       content: [ 
                "1. Apăsați Adaugă.",
                "2.Apăsați Scanare pentru a alege un dispozitiv conectat în prezent din lista clienților DHCP; sau introduceți adresa MAC a clientului dorit în câmpul Adresă MAC și adresa IP pe care doriți să o rezervați pentru client în câmpul Adresă IP.",
                "3. Introduceți o descriere pentru client în câmpul Descriere.",
                "4. Selectați Activează.",
                "5. Faceți clic pe Salvare."]
} ,{                      
                           type: "note",
                           title: "Notă",
                           content: "În cazul în care doriți să dezactivați această intrare, apăsați pe pictograma bec."
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"Listă Clienți DHCP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează informațiile dispozitivelor conectate în prezent."
                       }]
},
       DDNS :{ 
               TITLE:"DNS Dinamic",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funcția DNS Dinamic (Dynamic Domain Name System) vă permite să atribuiți o gazdă fixă și un nume de domeniu la o adresă IP dinamică de Internet. Este util atunci când gazduiți site-ul propriu, un server FTP, sau un alt server din spatele routerului. Pentru început, trebuie să vă înregistrați cu un furnizor de servicii DNS dinamic, cum ar fi www.dyndns.com."
                       } ,{                      
                           type: "step",
                           title: "Pentru a configura un DNS Dinamic",
       content: [ 
                "1. Selectați furnizorul de servicii DNS Dinamic.",
                "2. Introduceți numele de utilizator și parola contului DNS Dinamic.",
                "3. Introduceți Numele Domeniului primit de la furnizorul de servicii DDNS.",
                "4. Selectați intervalul de actualizare din lista verticală.",
                "5. În cazul în care furnizorul de servicii este NO-IP, asocierea adresei IP WAN poate asigura că numele de domeniu este atribuit adresei IP WAN a routerului.",
                "6. Faceți clic pe Conectare și Salvare."]
} ,{                      
                           type: "note",
                           title: "Notă",
                           content: "În cazul în care doriți să utilizați un nou cont DDNS, vă rugăm să vă deconectați mai întâi și apoi să vă conectați cu noul cont."
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"DNS Dinamic",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funcția DNS Dinamic (Dynamic Domain Name System) vă permite să atribuiți o gazdă fixă și un nume de domeniu la o adresă IP dinamică de Internet. Este util atunci când gazduiți site-ul propriu, un server FTP, sau un alt server din spatele routerului. Pentru început, trebuie să vă înregistrați cu un furnizor de servicii DNS dinamic, cum ar fi www.dyndns.com."
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"Listă Nume Domeniu",
               CONTENT: [{
                           type: "paragraph",
                           content: "Acest tabel afișează informațiile tuturor numelor de domenii care sunt înregistrate cu contul dvs. de cloud."
                       } ,{                      
                           type: "step",
                           title: "Pentru a înregistra un nou nume de domeniu",
       content: [ 
                "1. Apăsați Înregistrare.",
                "2. Introduceți numele de domeniu pe care doriți să îl înregistrați.",
                "3. Apăsați Salvare."]
}]
},
       ADVANCED_ROUTING_STATIC_ROUTING :{ 
               TITLE:"Rutare Statică",
               CONTENT: [{
                           type: "paragraph",
                           content: "Rutarea statică este folosită pentru a prestabili traseul pentru pachetele cu informații de rețea, astfel încât să poată ajunge la o anumită gazdă sau rețea."
                       } ,{                      
                           type: "step",
                           title: "Pentru a configura rutarea statică",
       content: [ 
                "1. Apăsați Adaugă.",
                "2. Introduceți o adresă IP în câmpul Rețea Destinație pentru a atribui ruta statică pentru această intrare.",
                "3. Introduceți o mască de subrețea în câmpul Mască Subrețea pentru a determina porțiunea de rețea și porțiunea de gazdă a adresei IP. ",
                "4. Introduceți o adresă IP în câmpul Default Gateway pentru a conecta router-ul la rețea sau gazdă.",
                "5. Selectați LAN sau WAN în câmpul de interfață pentru a specifica tipul destinației de rețea.",
                "6. Introduceți o scurtă descriere pentru această intrare.",
                "7. Selectați Activare.",
                "8. Apăsați Salvare."]
} ,{                      
                           type: "note",
                           title: "Notă",
                           content: "În cazul în care doriți să dezactivați această intrare, apăsați pe pictograma bec."
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"Tabela de Rutare a Sistemului",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișeaza toate intrările rutelor valide care sunt în prezent în uz."
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"Setări Wireless",
               CONTENT: [{
                           type: "paragraph",
                           content: "Configurați setările wireless așa cum aveți nevoie."
                       }]
},
       OFDMA :{ 
               TITLE:"OFDMA",
               CONTENT: [{
                           type: "paragraph",
                           content: "OFDMA permite mai multor utilizatori să transmită simultan date, îmbunătățind astfel viteza și eficiența. De remarcat că numai atunci când clienții wireless suportă OFDMA, te vei putea bucura pe deplin de beneficii."
                       }]
},
       WIRELESS_SMART_CONNECT :{ 
               TITLE:"Conectare inteligentă",
               CONTENT: [{
                           type: "paragraph",
                           content: "Selectaţi această casetă pentru a activa conectarea inteligentă. Această funcţie ajută dispozitivele să funcţioneze mai rapid, alocându-le cele mai bune benzi wireless, în funcţie de condiţiile curente, pentru a echilibra cererile din reţea."
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"Wireless 2.4GHz",
               CONTENT: [{
                           type: "name",
                           title: "Nume Rețea (SSID)",
                           content: "Este recomandat să modificați numele rețelei wireless (SSID). Acest câmp e sensibil la majuscule."
                       } ,{                      
                           type: "name",
                           title: "Ascunde SSID",
                           content: "Selectați dacă doriți să ascundeți numele rețelei (SSID) de 2.4GHz din lista de rețele wireless. Dacă bifați, SSID-ul nu va fi emis și va trebui să adăugați manual rețeaua."
                       } ,{                      
                           type: "name",
                           title: "Securitate",
                           content: "Selectați una dintre următoarele opțiuni de securitate:",
       children: [{                      
                           type: "name",
                           title: "Fără Securitate",
                           content: "Selectați această opțiune pentru a dezactiva securitatea wireless. Acest lucru nu este recomandat."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Selectați această opțiune pentru a activa securitatea wireless. Acest lucru este foarte recomandat pentru a proteja rețeaua wireless împotriva accesului neautorizat. Dacă este selectat, configurați următoarele.",
       children: [{                      
                           type: "name",
                           title: "Versiune",
                           content: "Selectați o versiune de securitate. WPA2-PSK este mai sigură. Dacă nu sunteți sigur(ă), selectați Auto."
                       } ,{                      
                           type: "name",
                           title: "Criptare",
                           content: "Selectați un tip de criptare de securitate. AES este mai sigur. NU este  recomandat să utilizați criptarea TKIP dacă router-ul funcționează în modul 802.11n. În plus, folosind TKIP se va dezactiva funcția WPS. Dacă nu sunteți sigur, selectați Auto."
                       } ,{                      
                           type: "name",
                           title: "Parolă",
                           content: "Creați o parolă care să folosească între 8 și 63 caractere ASCII, sau între 8 și 64 caractere hexadecimale (0-9, af, AF)"
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Enterprise",
                           content: "Selectați această opțiune pentru a activa metoda de autentificare mai avansată folosind un server RADIUS (Remote Authentication Dial In User Service). Dacă folosiți acest tip de securitate, funcția WPS va fi dezactivată.",
       children: [{                      
                           type: "name",
                           title: "Versiune",
                           content: "Selectați o versiune de securitate. WPA2 este mai sigură. Dacă nu sunteți sigur(ă), selectați Auto."
                       } ,{                      
                           type: "name",
                           title: "Criptare",
                           content: "Selectați un tip de criptare de securitate. AES este mai sigur. NU este  recomandat să utilizați criptarea TKIP dacă router-ul funcționează în modul 802.11n. În plus, folosind TKIP se va dezactiva funcția WPS. Dacă nu sunteți sigur, selectați Auto."
                       } ,{                      
                           type: "name",
                           title: "IP Server RADIUS",
                           content: "Introduceți adresa IP a serverului RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Port RADIUS",
                           content: "Introduceți numărul portului pentru serverul RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Parolă RADIUS",
                           content: "Introduceți parola serverului RADIUS."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Selectează această opțiune pentru a activa metoda de autentificare simplă, în cazul în care există clienți wireless ce utilizează doar WEP (Wired Equivalent Privacy). Dacă selectezi această opțiune, funcția WPS va fi dezactivată.",
       children: [{                      
                           type: "name",
                           title: "Tip",
                           content: "Selectați un tip de autentificare pentru rețeaua wireless. Dacă nu sunteți sigur(ă), selectați Auto."
                       } ,{                      
                           type: "name",
                           title: "Format cheie WEP",
                           content: "Se utilizează în format ASCII sau Hexadecimal. Formatul ASCII este o combinație de caractere alfanumerice. Formatul Hexadecimal este o combinație de numere (0-9) și literele (A-F, a-f)."
                       } ,{                      
                           type: "name",
                           title: "Tip cheie",
                           content: "Selectați lungimea cheii WEP.",
       children: [{                      
                           type: "name",
                           title: "64-bit",
                           content: "Vă permite să introduceți 10 caractere hexadecimale (0-9, A-F, a-f) sau 5 caractere ASCII în câmpul Valoare Cheie."
                       } ,{                      
                           type: "name",
                           title: "128-bit",
                           content: "Vă permite să introduceți 26 caractere hexadecimale (0-9, A-F, a-f) sau 13 caractere ASCII în câmpul Valoare Cheie."
                       }]
} ,{                      
                           type: "name",
                           title: "Valoare cheie",
                           content: "Introduceți cheia WEP în câmpul corespunzător."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Canal",
                           content: "Selectați canalul de operare pentru rețeaua în banda de 2.4 GHz. Este recomandat să mențineți valoarea canalului Auto dacă nu întâmpinați probleme intermitente ale conexiunii wireless."
                       } ,{                      
                           type: "name",
                           title: "Putere Transmisie",
                           content: "Selectați Ridicată, Medie sau Scăzută pentru a specifica puterea de emisie. Opțiunea recomandată și implicită este Ridicată."
                       } ,{                      
                           type: "name",
                           id: "atf_2g4",
                           title: "Funcție Airtime Fairness",
                           content: "Selectați această casetă pentru a activa funcția Airtime Fairness (ATF), care permite optimizarea throughput-ului fiecărui flux. Planificatorul de trafic ATF utilizează obiectivele pe timpul de emisie-destinație pentru a echilibra utilizarea timpilor de antenă pe parcursul întregului flux."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_2g4",
                           title: "Funcția Multi-User MIMO",
                           content: "Click pentru a activa funcția Multi-User MIMO."
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"Wireless 5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Nume Rețea (SSID)",
                           content: "Este recomandat să modificați numele rețelei wireless (SSID). Acest câmp e sensibil la majuscule."
                       } ,{                      
                           type: "name",
                           title: "Ascunde SSID",
                           content: "Selectați dacă doriți să ascundeți numele rețelei (SSID) de 5GHz din lista de rețele wireless. Când este selectată, SSID-ul nu va fi emis și rețeaua va trebui adăugată manual."
                       } ,{                      
                           type: "name",
                           title: "Securitate",
                           content: "Selectați una dintre următoarele opțiuni de securitate:",
       children: [{                      
                           type: "name",
                           title: "Fără Securitate",
                           content: "Selectați această opțiune pentru a dezactiva securitatea wireless. Acest lucru nu este recomandat."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Selectați această opțiune pentru a activa securitatea wireless. Acest lucru este foarte recomandat pentru a proteja rețeaua wireless împotriva accesului neautorizat. Dacă este selectat, configurați următoarele.",
       children: [{                      
                           type: "name",
                           title: "Versiune",
                           content: "Selectați o versiune de securitate. WPA2-PSK este mai sigură. Dacă nu sunteți sigur(ă), selectați Auto."
                       } ,{                      
                           type: "name",
                           title: "Criptare",
                           content: "Selectați un tip de criptare de securitate. AES este mai sigur. NU este  recomandat să utilizați criptarea TKIP dacă router-ul funcționează în modul 802.11n. În plus, folosind TKIP se va dezactiva funcția WPS. Dacă nu sunteți sigur, selectați Auto."
                       } ,{                      
                           type: "name",
                           title: "Parolă",
                           content: "Creați o parolă care să folosească între 8 și 63 caractere ASCII, sau între 8 și 64 caractere hexadecimale (0-9, af, AF)"
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Enterprise",
                           content: "Selectați această opțiune pentru a activa metoda de autentificare mai avansată folosind un server RADIUS (Remote Authentication Dial In User Service). Dacă folosiți acest tip de securitate, funcția WPS va fi dezactivată.",
       children: [{                      
                           type: "name",
                           title: "Versiune",
                           content: "Selectați o versiune de securitate. WPA2 este mai sigură. Dacă nu sunteți sigur(ă), selectați Auto."
                       } ,{                      
                           type: "name",
                           title: "Criptare",
                           content: "Selectați un tip de criptare de securitate. AES este mai sigur. NU este  recomandat să utilizați criptarea TKIP dacă router-ul funcționează în modul 802.11n. În plus, folosind TKIP se va dezactiva funcția WPS. Dacă nu sunteți sigur, selectați Auto."
                       } ,{                      
                           type: "name",
                           title: "IP Server RADIUS",
                           content: "Introduceți adresa IP a serverului RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Port RADIUS",
                           content: "Introduceți numărul portului pentru serverul RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Parolă RADIUS",
                           content: "Introduceți parola serverului RADIUS."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Selectează această opțiune pentru a activa metoda de autentificare simplă, în cazul în care există clienți wireless ce utilizează doar WEP (Wired Equivalent Privacy). Dacă selectezi această opțiune, funcția WPS va fi dezactivată.",
       children: [{                      
                           type: "name",
                           title: "Tip",
                           content: "Selectați un tip de autentificare pentru rețeaua wireless. Dacă nu sunteți sigur(ă), selectați Auto."
                       } ,{                      
                           type: "name",
                           title: "Format cheie WEP",
                           content: "Se utilizează în format ASCII sau Hexadecimal. Formatul ASCII este o combinație de caractere alfanumerice. Formatul Hexadecimal este o combinație de numere (0-9) și literele (A-F, a-f)."
                       } ,{                      
                           type: "name",
                           title: "Tip cheie",
                           content: "Selectați lungimea cheii WEP.",
       children: [{                      
                           type: "name",
                           title: "64-bit",
                           content: "Vă permite să introduceți 10 caractere hexadecimale (0-9, A-F, a-f) sau 5 caractere ASCII în câmpul Valoare Cheie."
                       } ,{                      
                           type: "name",
                           title: "128-bit",
                           content: "Vă permite să introduceți 26 caractere hexadecimale (0-9, A-F, a-f) sau 13 caractere ASCII în câmpul Valoare Cheie."
                       }]
} ,{                      
                           type: "name",
                           title: "Valoare cheie",
                           content: "Introduceți cheia WEP în câmpul corespunzător."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Canal",
                           content: "Selectați canalul de operare pentru rețeaua în banda de 5GHz. Este recomandat să mențineți valoarea canalului Auto dacă nu întâmpinați probleme intermitente ale conexiunii wireless."
                       } ,{                      
                           type: "name",
                           title: "Putere Transmisie",
                           content: "Selectați Ridicată, Medie sau Scăzută pentru a specifica puterea de emisie. Opțiunea recomandată și implicită este Ridicată."
                       } ,{                      
                           type: "name",
                           id: "atf_5g",
                           title: "Funcție Airtime Fairness",
                           content: "Selectați această casetă pentru a activa funcția Airtime Fairness (ATF), care permite optimizarea throughput-ului fiecărui flux. Planificatorul de trafic ATF utilizează obiectivele pe timpul de emisie-destinație pentru a echilibra utilizarea timpilor de antenă pe parcursul întregului flux."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_5g",
                           title: "Funcția Multi-User MIMO",
                           content: "Click pentru a activa funcția Multi-User MIMO."
                       }]
},
       WPS :{ 
               TITLE:"WPS",
               CONTENT: [{
                           type: "paragraph",
                           content: "WPS (Wi-Fi Protected Setup) vă oferă o modalitate mai ușoară pentru a stabili o conexiune Wi-Fi securizată."
                       } ,{                      
                           type: "name",
                           title: "Apăsați butonul (recomandat)",
       content: [ 
                "Această metodă îți permite să conectezi cu ușurință orice dispozitiv WPS la rețeaua wireless.",
                "Apasă butonul Start WPS de pe ecran. În cel mult două minute, apasă butonul WPS de pe dispozitivul client."]
} ,{                      
                           type: "name",
                           title: "PIN Router",
       content: [ 
                "PIN-ul implicit poate fi găsit pe eticheta routerului.",
                "Apasă pe Generare pentru a obține un nou cod PIN sau apasă butonul Implicit pentru a restabili codul PIN prestabilit din fabrică."]
} ,{                      
                           type: "name",
                           title: "Introduceți PIN-ul clientului",
       content: [ 
                "Această metodă îți permite să adaugi manual un dispozitiv wireless.",
                "Tastează codul PIN al dispozitivului în câmpul destinat și apoi apasă Conectare."]
}]
},
       WIRELESS_STATISTICS :{ 
               TITLE:"Stații Wireless Online",
               CONTENT: [{
                           type: "name",
                           title: "Număr Clienți",
                           content: "Afișează numărul clienților wireless asociați."
                       } ,{                      
                           type: "name",
                           title: "Adresa MAC",
                           content: "Afișează adresa MAC a clientului wireless asociat."
                       } ,{                      
                           type: "name",
                           title: "Tipul Conexiunii",
                           content: "Afișează banda de frecvență radio (2.4GHz sau 5GHz) a clientului wireless asociat."
                       } ,{                      
                           type: "name",
                           title: "Securitate",
                           content: "Afișează tipul de securitate al clientului wireless asociat."
                       } ,{                      
                           type: "name",
                           title: "Pachete Primite",
                           content: "Afișează numărul de pachete primite de clientul wireless asociat."
                       } ,{                      
                           type: "name",
                           title: "Pachete Trimise",
                           content: "Afișează numărul de pachete trimise de clientul wireless asociat."
                       } ,{                      
                           type: "paragraph",
                           content: "Apăsați butonul Actualizare pentru a actualiza informațiile de pe această pagină."
                       }]
},
       WIRELESS_SCHEDULE :{ 
               TITLE:"Program wireless",
               CONTENT: [{
                           type: "paragraph",
                           content: "Cu Wireless Schedule, puteți dezactiva semnalul wireless în timpul unei anumite perioade. De exemplu, puteți dezactiva semnalul wireless în intervalul 0:00 - 7:00."
                       } ,{                      
                           type: "name",
                           title: "Časový plán vypnutí bezdrátové sítě",
                           content: "Afișează perioadele în timpul cărora semnalul wireless este dezactivat.",
       children: [{                      
                           type: "step",
                           title: "Setați timpul în care rețeaua wireless este oprită",
       content: [ 
                "1. Apăsați Adaugă.",
                "2. Setează perioada de timp în care dorești ca semnalul wireless să fie oprit.",
                "3. Selectează zile recurente. Poți alege zilnic sau poți specifica anumite zile.",
                "4. Apăsați Salvare."]
}]
}]
},
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"Setări",
               CONTENT: [{
                           type: "paragraph",
                           content: "Această funcție vă permite să oferiți acces la Wi-Fi pentru oaspeți fără a dezvălui rețeaua principală."
                       } ,{                      
                           type: "name",
                           title: "Permiteți comunicarea între oaspeți",
                           content: "Selectați această casetă pentru a permite dispozitivelor wireless în rețeaua de oaspeți să comunice între ele prin metode cum ar fi network neighbors, Samba, Ping, și FTP."
                       } ,{                      
                           type: "name",
                           id: "access_local",
                           title: "Permiteți oaspeților să acceseze rețeaua locală",
                           content: "Selectați această casetă pentru a permite comunicarea dispozitivelor conectate wireless în Rețeaua Vizitatori cu dispozitivele conectate la porturile LAN ale routerului sau la rețeaua principală prin intermediul metodelor precum network neighbors, Samba, Ping, și FTP."
                       }]
},
       GUEST_NETWORK_WIRELESS :{ 
               TITLE:"Wireless 2.4GHz/5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Activare Guest Network",
                           content: "Bifați această casetă pentru a activa funcția Guest Network."
                       } ,{                      
                           type: "name",
                           title: "Nume Rețea (SSID)",
                           content: "Puteți utiliza numele implicit al rețelei wireless Guest Network, sau puteți crea un nume nou (maximum 32 de caractere)."
                       } ,{                      
                           type: "name",
                           title: "Ascunde SSID",
                           content: "Bifați această casetă dacă doriți să ascundeți numele rețelei wireless Guest Network (SSID) în lista rețelelor wireless detectabile."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Interval Actualizare Parolă",
                           content: "Selectați intervalul de actualizare a parolei rețelei vizitatori."
                       } ,{                      
                           type: "name",
                           title: "Securitate",
                           content: "Dacă nu activați actualizarea parolei, selectați una dintre următoarele metode de securitate:",
       children: [{                      
                           type: "name",
                           title: "Fără Securitate",
                           content: "Selectați această opțiune pentru a dezactiva securitatea wireless. Acest lucru nu este recomandat."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Selectați această opțiune pentru a activa securitatea rețelei wireless. Acest lucru este foarte recomandat pentru a proteja rețeaua vizitatori împotriva accesului neautorizat. Dacă este selectat, configurați următoarele.",
       children: [{                      
                           type: "name",
                           title: "Versiune",
                           content: "Selectați o versiune de securitate. WPA2-PSK este mai sigură. Dacă nu sunteți sigur(ă), selectați Auto."
                       } ,{                      
                           type: "name",
                           title: "Criptare",
                           content: "Selectați un tip de criptare de securitate. AES este mai sigur. NU este  recomandat să utilizați criptarea TKIP dacă router-ul funcționează în modul 802.11n. În plus, folosind TKIP se va dezactiva funcția WPS. Dacă nu sunteți sigur, selectați Auto."
                       }]
} ,{                      
                           type: "name",
                           id: "portal-help-title",
                           title: "Portal",
                           content: "Autentificarea prin portal îmbunătățește securitatea rețelei solicitând autentificarea clienților care au nevoie de acces temporar la rețeaua wireless."
                       } ,{                      
                           type: "step",
                           id: "portal-help-content",
                           title: "Pentru a configura autentificarea portalului:",
       content: [ 
                "1. Selectați Portal pentru securitate.",
                "2. Selectați tipul de autentificare, Parolă Simplă sau Fără Autentificare .",
                "A. Parolă Simplă - Specificați o parolă pentru autentificare (8-16 caractere alfanumerice și _).",
                "B. Fără autentificare - Clienții pot accesa rețeaua fără autentificare.",
                "3. Selectați 1 oră, 2 ore, 4 ore, 8 ore sau Permanent pentru a specifica timpul de expirare a autentificării. Atunci când expiră autentificarea unui client, el trebuie să se conecteze din nou pentru reautentificare.",
                "4. (Opțional) Activați Redirecționarea și introduceți adresa URL de redirecționare după cum este necesar. Apoi, un client nou autentificat va fi redirecționat către adresa URL specificată.",
                "5. (Opțional) Puteți personaliza pagina de autentificare la conectare.",
                "A. Titlu Portal - până la 31 de caractere.",
                "B. Termeni de Utilizare - până la 1023 de caractere.",
                "C. Imagine Logo - Încărcați un fișier JPG sau PNG (mai mic de 100KB) pentru a personaliza sigla.",
                "D. Imagine de fundal - Încărcați un fișier JPG sau PNG (mai mic de 2 MB) pentru a personaliza imaginea de fundal.",
                "6. Click pe Salvare."]
}]
} ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Parolă",
                           content: "Creaţi o parolă care să folosească între 8 şi 63 de caractere ASCII, sau între 8 şi 64 de caractere hexazecimale (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Parolă",
                           content: "Alegeți parola generată automat sau creați o parolă între 8 și 63 caractere ASCII sau între 8 și 64 caractere hexadecimale (0-9, a-f, A-F)"
                       }]
},
       NAT :{ 
               TITLE:"ALG",
               CONTENT: [{
                           type: "paragraph",
                           content: "ALG (Application Layer Gateway) permite aplicarea unor filtre personalizate pentru traversarea NAT (Network Address Translation), astfel încât gateway-ul să poată asigura translatări de adrese și porturi pentru anumite protocoale de \"control/data\" ale nivelului Aplicație, cum ar fi: FTP, TFTP, H323, etc.. Activarea funcției ALG este recomandată."
                       } ,{                      
                           type: "name",
                           title: "Activare FTP ALG",
                           content: "Dacă este selectat, permite clienților si serverelor FTP (File Transfer Protocol) transferul de date prin NAT."
                       } ,{                      
                           type: "name",
                           title: "Activare TFTP ALG",
                           content: "Dacă este selectat, permite clienților si serverelor TFTP (Trivial File Transfer Protocol) transferul de date prin NAT."
                       } ,{                      
                           type: "name",
                           title: "Activare H323 ALG",
                           content: "Dacă este selectat, permite utilizatorilor Microsoft NetMeeting sa comunice prin NAT."
                       } ,{                      
                           type: "name",
                           title: "Activare RTSP ALG",
                           content: "Dacă este selectat, permite clienților Media Player comunicarea cu serverele de streaming media prin NAT."
                       } ,{                      
                           type: "name",
                           title: "Activare SIP ALG",
                           content: "Dacă este selectat, permite clienților să comunice cu serverele SIP (Session Initiation Protocol), prin intermediul NAT."
                       } ,{                      
                           type: "name",
                           title: "Activare PPTP Passthrough",
                           content: "Dacă este selectat, permite sesiunilor Point-to-Point folosirea unui tunel printr-o rețea IP."
                       } ,{                      
                           type: "name",
                           title: "Activare L2TP Passthrough",
                           content: "Dacă este selectat, permite sesiunilor Layer 2 Point-to-Point folosirea unui tunel printr-o rețea IP."
                       } ,{                      
                           type: "name",
                           title: "Activare IPSec Passthrough",
                           content: "Dacă va fi selectat, permite IPSec (Internet Protocol security), să fie transportat printr-o rețea IP și trecut prin router. IPSec folosește serviciile criptografice de securitate pentru a asigura comunicațiile private și securizate prin intermediul rețelelor IP."
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"Servere Virtuale",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Serverele Virtuale sunt folosite pentru a permite accesul din Internet către anumite servicii din rețeaua locală. Un server virtual este definit ca un port extern și toate cererile din Internet către acest port extern vor fi redirecționate către un computer specific, care trebuie să fie configurat cu o adresă IP statică sau rezervată.",
                "Când găzduiești un server în rețeaua locală și dorești să-l partajezi pe Internet, Serverele Virtuale pot realiza serviciul și îl vor furniza utilizatorilor de Internet."]
} ,{                      
                           type: "paragraph",
                           content: "Tabelul afișează parametrii relevanți ai serverului virtual."
                       } ,{                      
                           type: "name",
                           title: "Tip Serviciu",
                           content: "Afișează numele serverului virtual."
                       } ,{                      
                           type: "name",
                           title: "Port Extern",
                           content: "Afișează numărul portului sau al unui interval de porturi, utilizate de serverul virtual."
                       } ,{                      
                           type: "name",
                           title: "IP Intern",
                           content: "Afișează adresa IP a computerului care rulează serviciul."
                       } ,{                      
                           type: "name",
                           title: "Port Intern",
                           content: "Afișează numărul portului utilizat de computerul pe care ruleaza aplicația."
                       } ,{                      
                           type: "name",
                           title: "Protocol",
                           content: "Afișează protocolul utilizat pentru serviciul respectiv: TCP, UDP, sau Toate (Toate protocoalele suportate de router)."
                       } ,{                      
                           type: "name",
                           title: "Stare",
                           content: "Afișează starea curentă (activat sau dezactivat) a regulii de filtrare respective."
                       } ,{                      
                           type: "name",
                           title: "Modifică",
                           content: "Afișează opțiunile pentru Modifică sau Șterge ale regulii corespunzătoare."
                       } ,{                      
                           type: "step",
                           title: "Pentru a seta o regulă tip Servere Virtuale",
       content: [ 
                "1. Apăsați Adaugă.",
                "2. Apăsați butonul Vizualizați Serviciile Existente pentru a selecta un serviciu din listă și pentru a completa automat numărul portului corespunzător în câmpul Port Extern și Port Intern. În cazul în care serviciul nu este listat, introduceți numărul portului extern (de ex. 21) sau un interval de porturi (de ex. 21-25). Lăsați câmpul Port Intern gol în cazul în care este identic cu câmpul Port Extern sau introduceți numărul portului dorit (de ex. 21) în cazul în care Portul Extern este un singur port. În câmpul IP Intern introduceți adresa IP a computerului care rulează serviciul, în format zecimal cu puncte.",
                "3. Selectați protocolul utilizat de serviciu: TCP, UDP, sau Toate din lista care apare în meniul Protocol.",
                "4. Selectați Activează.",
                "5. Faceți clic pe Salvare."]
} ,{                      
                           type: "note",
                           title: "Notă",
       content: [ 
                "1. În cazul în care doriți să dezactivați această intrare, apăsați pe pictograma bec.",
                "2. Se recomandă să păstrezi setările implicite ale opțiunilor Port Intern și Protocol, dacă nu cunoști portul sau protocolul utilizat.",
                "3. În cazul în care dispozitivul gazdă locală găzduiește mai multe servicii disponibile, ai nevoie să realizezi o regulă pentru fiecare serviciu. Te rugăm să reții că Portul Extern NU trebuie să fie utilizat și la un alt serviciu."]
}]
},
       PORT_TRIGGERING :{ 
               TITLE:"Port Triggering",
               CONTENT: [{
                           type: "paragraph",
                           content: "Declanșare Port (Port Triggering) se utilizează pentru a transmite traficul pe un anumit port pentru un anumit server din rețea."
                       } ,{                      
                           type: "paragraph",
                           content: "Tabelul afișează parametrii relevanți ai portului de declanșare."
                       } ,{                      
                           type: "name",
                           title: "Aplicație",
                           content: "Afișează numele aplicației."
                       } ,{                      
                           type: "name",
                           title: "Triggering Port",
                           content: "Afișează portul de ieșire folosit pentru a declanșa o regulă de filtrare a unei conexiuni."
                       } ,{                      
                           type: "name",
                           title: "Triggering Protocol",
                           content: "Afișează protocolul folosit de porturile declanșatoare. TCP, UDP sau Toate (Toate protocoalele suportate de router)."
                       } ,{                      
                           type: "name",
                           title: "Port Extern",
                           content: "Afișează portul sau porturile utilizate de sistemul de la distanță. Un răspuns folosind unul dintre aceste porturi va fi transmis la computerul care a declanșat această regulă. Puteți introduce cel mult 5 grupe de porturi (sau intervale de porturi). Fiecare grup de porturi trebuie să fie separate cu \",\" (virgulă), de exemplu, 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
                       } ,{                      
                           type: "name",
                           title: "Protocol Extern",
                           content: "Afișează protocolul utilizat pentru portul de intrare: TCP, UDP, sau Toate (Toate protocoalele suportate de router)."
                       } ,{                      
                           type: "name",
                           title: "Stare",
                           content: "Afișează starea curentă (activat sau dezactivat) a regulii de filtrare respective."
                       } ,{                      
                           type: "name",
                           title: "Modifică",
                           content: "Afișează opțiunile pentru Modifică sau Șterge ale regulii corespunzătoare."
                       } ,{                      
                           type: "step",
                           title: "Pentru a configura o regulă Declanșare Port (Port Triggering)",
       content: [{                      
                           type: "note",
                           title: "Notă",
                           content: "Fiecare regulă poate fi utilizată doar de către un singur client, în același timp."
                       },
                "1. Apăsați Adaugă.",
                "2. Apăsați butonul Vizualizare Aplicațiile Existente pentru a selecta o aplicație din listă, în acest mod, valorile implicite vor fi completate automat, în câmpurile corespunzătoare. Dacă doriți să adăugați o aplicație nelistată, completați câmpurile: Applicație, Port Declanșator, Protocol Declanșator, Port Extern și Protocol Extern.",
                "3. Selectați Activează.",
                "4. Apăsați Salvare."]
} ,{                      
                           type: "note",
                           title: "Notă",
                           content: "Dacă doriți ca să dezactivați această regulă, apăsați pictograma bec."
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funcția DMZ (zona demilitarizată) permite unei gazde locale să fie expusă în Internet pentru un anumit scop, cum ar fi jocurile online sau conferințele video. Practic, funcția DMZ permite unui singur computer din rețeaua locală să deschidă toate porturile sale. Acest computer trebuie să fie configurat cu o adresă IP statică și și are funcția \"Client DHCP\" dezactivată."
                       } ,{                      
                           type: "paragraph",
                           content: "Atunci când serviciul DMZ este activat, gazda DMZ este expusă în totalitate la Internet, ceea ce poate aduce anumite potențiale pericole de siguranță calculatorului. În cazul în care funcția DMZ nu este utilă, vă rugăm să o dezactivați."
                       } ,{                      
                           type: "step",
                           title: "Pentru a atribui unui computer sau unui server funcția DMZ",
       content: [ 
                "1. Apăsați pe Activare DMZ.",
                "2. În câmpul Adresa IP a gazdei DMZ, introduceți adresa IP a unui computer local pentru a-l configura ca fiind gazdă DMZ.",
                "3. Apăsați Salvare."]
}]
},
       UPNP :{ 
               TITLE:"UPnP",
               CONTENT: [{
                           type: "paragraph",
                           content: "În mod implicit, funcția UPnP (Universal Plug and Play) este activată pentru a permite dispozitivelor, cum ar fi calculatoarele și echipamentele de rețea, să se descopere și să comunice între ele în rețeaua locală în mod automat."
                       } ,{                      
                           type: "paragraph",
                           content: "Poate fi necesar să activați UPnP dacă doriți să utilizați aplicațiile pentru jocuri multiplayer, conexiuni de tip peer-to-peer, comunicare în timp real (cum ar fi VoIP sau conferință teleVoIP) sau asistență de la distanță etc."
                       } ,{                      
                           type: "name",
                           title: "Listă Servicii UPnP",
                           content: "Lista de servicii UPnP afișează informațiile UPnP ale gazdei locale."
                       }]
},
       MODEM :{ 
               TITLE:"Ajutor 3G/4G",
               CONTENT: [{
                           type: "name",
                           title: "Modem USB 3G/4G",
                           content: "Afişează starea modemului USB 3G/4G."
                       } ,{                      
                           type: "name",
                           title: "Utilizați parametrii ISP identificați automat",
                           content: "Această funcție este activată în mod implicit. Dacă este activată, router-ul poate identifica ISP-ul pentru SIM / UIM și va completa parametrii automat. În cazul în care identificarea eșuează, vă rugăm să selectați manual regiunea și ISP-ul Mobil."
                       } ,{                      
                           type: "name",
                           title: "Regiune",
                           content: "Selectează automat și afișează regiunea când modemul USB și cartela SIM sunt identificate cu succes. În caz contrar, selectați regiunea din lista verticală."
                       } ,{                      
                           type: "name",
                           title: "ISP Mobil",
                           content: "Afişează ISP (furnizorul de servicii de internet) al reţelei 3G/4G. Dacă nu este selectat automat, selectaţi furnizorul din meniul vertical. Numărul de format şi APN implicite vor fi completate automat în mod corespunzător."
                       } ,{                      
                           type: "name",
                           title: "PIN SIM/UIM",
                           content: "Dacă protecția SIM-ul / UIM este activată, introduceți codul PIN. Protecția SIM / UIM este dezactivată în mod implicit. Vă rugăm să rețineți că, dacă introduceți codul PIN nevalid de 3 ori, cartela SIM / UIM se va bloca automat. Puteți să o deblocați numai prin introducerea codului PUK de la PC / laptop."
                       } ,{                      
                           type: "name",
                           title: "Mesaj",
                           content: "Afișează informațiile PIN ale cartelei SIM / UIM dacă protecția PIN este activată."
                       } ,{                      
                           type: "name",
                           title: "Setări Dial Number,APN,Nume utilizator/Parolă",
                           content: "În cazul în care ISP-ul nu este afișat în lista <strong>ISP Mobil</ strong> , selectați această casetă și introduceți numărul de apelare, APN-ul (Acces Point Name), numele de utilizator și parola care sunt furnizate de ISP."
                       } ,{                      
                           type: "name",
                           title: "Dial Number",
                           content: "Introduceți numărul de apelare furnizat de ISP."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Introduceți APN-ul (Access Point Name) furnizat de ISP."
                       } ,{                      
                           type: "name",
                           title: "Utilizator/Parolă",
                           content: "Introduceți numele de utilizator și parola furnizate de ISP. Aceste câmpuri sunt sensibile la majuscule."
                       } ,{                      
                           type: "name",
                           title: "Conectare la cerere",
                           content: "În acest mod, conexiunea la Internet va fi oprită automat după o perioadă de inactivitate specificată (Timp Maxim de Inactivitate). Conexiunea este restabilită atunci când încercați să accesați Internetul din nou."
                       } ,{                      
                           type: "note",
                           title: "Notă",
                           content: "Ocazional, conexiunea nu poate fi întreruptă, deşi specificaţi Timpul de repaus maxim, deoarece unele aplicaţii accesează în continuare internetul în fundal."
                       } ,{                      
                           type: "name",
                           title: "Conectare automată",
                           content: "În acest mod, conexiunea la internet se restabileşte automat ori de câte ori se întrerupe."
                       } ,{                      
                           type: "name",
                           title: "Conectare manuală",
                           content: "În acest mod, puteţi face clic pe butonul Conectare sau Deconectare pentru a controla manual conexiunea la internet. Acest mod acceptă, de asemenea, funcţia Timp de repaus maxim. Introduceţi în câmpul Timp de repaus maxim o perioadă maximă (în minute) pentru care conexiunea la internet poate fi inactivă înainte să fie întreruptă. Valoarea implicită este de 15 minute. Dacă doriţi o conexiune la internet activă permanent, introduceţi 0 (zero)."
                       } ,{                      
                           type: "note",
                           title: "Notă",
                           content: "Ocazional, conexiunea nu poate fi întreruptă, deşi specificaţi Timpul de repaus maxim, deoarece unele aplicaţii accesează în continuare internetul în fundal."
                       } ,{                      
                           type: "paragraph",
                           content: "Apăsați butonul Salvare pentru a salva setările."
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"Ajutor setări avansate 3G/4G",
               CONTENT: [{
                           type: "name",
                           title: "Modem USB 3G/4G",
                           content: "Afişează starea modemului USB 3G/4G."
                       } ,{                      
                           type: "name",
                           title: "Utilizați parametrii ISP identificați automat",
                           content: "Această funcție este activată în mod implicit. Dacă este activată, router-ul poate identifica ISP-ul pentru SIM / UIM și va completa parametrii automat. În cazul în care identificarea eșuează, vă rugăm să selectați manual regiunea și ISP-ul Mobil."
                       } ,{                      
                           type: "name",
                           title: "Regiune",
                           content: "Selectează automat și afișează regiunea când modemul USB și cartela SIM sunt identificate cu succes. În caz contrar, selectați regiunea din lista verticală."
                       } ,{                      
                           type: "name",
                           title: "ISP Mobil",
                           content: "Afişează ISP (furnizorul de servicii de internet) al reţelei 3G/4G. Dacă nu este selectat automat, selectaţi furnizorul din meniul vertical. Numărul de format şi APN implicite vor fi completate automat în mod corespunzător."
                       } ,{                      
                           type: "name",
                           title: "PIN SIM/UIM",
                           content: "Dacă protecția SIM-ul / UIM este activată, introduceți codul PIN. Protecția SIM / UIM este dezactivată în mod implicit. Vă rugăm să rețineți că, dacă introduceți codul PIN nevalid de 3 ori, cartela SIM / UIM se va bloca automat. Puteți să o deblocați numai prin introducerea codului PUK de la PC / laptop."
                       } ,{                      
                           type: "name",
                           title: "Mesaj",
                           content: "Afișează informațiile PIN ale cartelei SIM / UIM dacă protecția PIN este activată."
                       } ,{                      
                           type: "name",
                           title: "Setări Dial Number,APN,Nume utilizator/Parolă",
                           content: "În cazul în care ISP-ul nu este afișat în lista <strong>ISP Mobil</ strong> , selectați această casetă și introduceți numărul de apelare, APN-ul (Acces Point Name), numele de utilizator și parola care sunt furnizate de ISP."
                       } ,{                      
                           type: "name",
                           title: "Dial Number",
                           content: "Introduceți numărul de apelare furnizat de ISP."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Introduceți APN-ul (Access Point Name) furnizat de ISP."
                       } ,{                      
                           type: "name",
                           title: "Utilizator/Parolă",
                           content: "Introduceți numele de utilizator și parola furnizate de ISP. Aceste câmpuri sunt sensibile la majuscule."
                       } ,{                      
                           type: "name",
                           title: "Conectare la cerere",
                           content: "În acest mod, conexiunea la Internet va fi oprită automat după o perioadă de inactivitate specificată (Timp Maxim de Inactivitate). Conexiunea este restabilită atunci când încercați să accesați Internetul din nou."
                       } ,{                      
                           type: "note",
                           title: "Notă",
                           content: "Ocazional, conexiunea nu poate fi întreruptă, deşi specificaţi Timpul de repaus maxim, deoarece unele aplicaţii accesează în continuare internetul în fundal."
                       } ,{                      
                           type: "name",
                           title: "Conectare automată",
                           content: "În acest mod, conexiunea la internet se restabileşte automat ori de câte ori se întrerupe."
                       } ,{                      
                           type: "name",
                           title: "Conectare manuală",
                           content: "În acest mod, puteţi face clic pe butonul Conectare sau Deconectare pentru a controla manual conexiunea la internet. Acest mod acceptă, de asemenea, funcţia Timp de repaus maxim. Introduceţi în câmpul Timp de repaus maxim o perioadă maximă (în minute) pentru care conexiunea la internet poate fi inactivă înainte să fie întreruptă. Valoarea implicită este de 15 minute. Dacă doriţi o conexiune la internet activă permanent, introduceţi 0 (zero)."
                       } ,{                      
                           type: "note",
                           title: "Notă",
                           content: "Ocazional, conexiunea nu poate fi întreruptă, deşi specificaţi Timpul de repaus maxim, deoarece unele aplicaţii accesează în continuare internetul în fundal."
                       } ,{                      
                           type: "name",
                           title: "Tip Autentificare",
                           content: "Selectați un tip de autentificare. Valoarea implicită este Auto. Unii ISP-iști solicită specificarea unui anumit tip de autentificare, vă rugăm să confirmați cu ISP-ul sau să păstrați setările implicite."
                       } ,{                      
                           type: "name",
                           title: "Automat",
                           content: "În cazul în care selectați Auto (implicit), router-ul determină automat tipul de autentificare folosit de ISP."
                       } ,{                      
                           type: "name",
                           title: "PAP",
                           content: "În modul PAP (Password Authentication Protocol), routerul se autentifică cu corespondentul său prin două dialoguri de confirmare. Selectaţi această opţiune în cazul în care furnizorul de servicii de internet necesită acest tip de autentificare."
                       } ,{                      
                           type: "name",
                           title: "CHAP",
                           content: "În modul CHAP (Challenge Handshake Authentication Protocol), routerul se autentifică cu corespondentul său prin trei dialoguri de confirmare şi validează periodic identitatea corespondentului. Selectaţi această opţiune în cazul în care furnizorul de servicii de internet necesită acest tip de autentificare."
                       } ,{                      
                           type: "name",
                           title: "Dimensiune MTU",
                           content: "Valoarea implicită a MTU (Maximum Transmission Unit) are dimensiunea de 1480 bytes. Nu schimbați decât dacă ISP-ul vă solicită acest lucru."
                       } ,{                      
                           type: "name",
                           title: "Folosește următoarele servere DNS",
                           content: "În cazul în care ISP-ul furnizează adrese IP printr-un server DNS, selectați această casetă și introduceți adresele <strong> DNS primar </ strong> și DNS secundar (opțional) în câmpurile de mai jos. În caz contrar, serverele DNS vor fi alocate dinamic de ISP."
                       } ,{                      
                           type: "name",
                           title: "DNS Primar",
                           content: "Introduceți adresa IP DNS oferită de ISP in notație punctată zecimală."
                       } ,{                      
                           type: "name",
                           title: "DNS Secundar",
                           content: "(Opțional) Introduceți o altă adresă IP a serverului DNS oferită de ISP în notație punctată zecimală."
                       } ,{                      
                           type: "paragraph",
                           content: "Apăsați butonul <strong> Salvare </ strong> pentru a salva setările."
                       }]
},
       DISK_SETTING :{ 
               TITLE:"Setări Dispozitiv",
               CONTENT: [{
                           type: "paragraph",
                           content: "Meniul Setări Dispozitiv afișează informații referitoare la orice dispozitiv de stocare USB conectat în portul USB."
                       } ,{                      
                           type: "name",
                           title: "Scanare",
                           content: "De obicei routerul detectează automat toate dispozitivele USB noi atașate. Dacă nu se întâmplă acest lucru, apăsați acest buton pentru a scana și detecta eventualele dispozitive atașate și pentru a actualiza informațiile afișate."
                       } ,{                      
                           type: "name",
                           title: "Volum",
                           content: "Afișează numele volumului de stocare conectat."
                       } ,{                      
                           type: "name",
                           title: "Capacitate",
                           content: "Afișează capacitatea totală de stocare a dispozitivului USB."
                       } ,{                      
                           type: "name",
                           title: "Spațiu Liber",
                           content: "Afișează spațiul liber al dispozitivului de stocare USB."
                       } ,{                      
                           type: "name",
                           title: "Deconectare în Siguranță",
                           content: "Apăsați acest buton pentru a deconecta în siguranță dispozitivul de stocare USB, înainte de a îl extrage din portul USB al routerului."
                       } ,{                      
                           type: "paragraph",
                           content: "Butonul Deconectare apare numai atunci când dispozitivul de stocare USB este conectat la router. În cazul în care volumul actual este utilizat, nu puteți deconecta."
                       } ,{                      
                           type: "name",
                           title: "Stare",
                           content: "Această opțiune apare doar atunci când există un dispozitiv de stocare USB conectat la router. Selectați această opțiune pentru a permite partajarea fișierelor de pe dispozitivul USB."
                       } ,{                      
                           type: "step",
                           title: "Pentru a configura un Server de fișiere",
       content: [ 
                "1. Ataşaţi dispozitivul de stocare USB la portul USB al routerului utilizând un cablu USB.",
                "2. Noul dispozitiv USB atașat ar trebui să fie detectat automat de router și să afișeze informațiile în secțiunea Setări Dispozitiv. Dacă nu este afișat automat, apăsați pe Scanare.",
                "3. Selectați Activ pentru a permite partajarea de fișiere."]
}]
},
       FOLDER_SHARE_ACCOUNT :{ 
               TITLE:"Cont Partajare",
               CONTENT: [{
                           type: "name",
                           title: "Cont",
                           content: "Puteți să selectați Folosire cont implicit, pentru a vă conecta la fișierele partajate sau Folosire cont nou și introduceți următoarele informații, pentru a crea un cont nou de utilizator."
                       } ,{                      
                           type: "name",
                           title: "Utilizator/Parolă",
                           content: "Introduceţi un nume de utilizator care să conţină între 1 şi 15 caractere alfanumerice sau linie de subliniere şi o parolă formată din 1 până la 15 caractere ASCII. Aceste câmpuri sunt sensibile la litere mari şi mici."
                       } ,{                      
                           type: "name",
                           title: "Confirmare Parolă",
                           content: "Reintroduceți parola pentru a vă asigura că nu există greșeli. Acest câmp este, de asemenea, sensibil la majuscule."
                       } ,{                      
                           type: "paragraph",
                           content: "Apăsați Salvare pentru a salva toate setările."
                       }]
},
       FOLDER_SHARE_SETTINGS :{ 
               TITLE:"Setări partajare",
               CONTENT: [{
                           type: "name",
                           title: "Nume Server Rețea/Media",
                           content: "Afișează numele utilizat pentru a accesa dispozitivul de stocare USB conectat."
                       } ,{                      
                           type: "name",
                           title: "Activare",
                           content: "Selectați pentru a activa metoda de acces."
                       } ,{                      
                           type: "name",
                           title: "Metoda de Acces",
                           content: "Există trei metode de acces pentru a permite accesul la dispozitivul de stocare USB atașat. Puteți alege una sau mai multe metode de acces prin selectarea casetei corespunzătoare.",
       children: [{                      
                           type: "name",
                           title: "Rețea Locală",
                           content: "Dacă este activată, utilizatorii din rețea pot accesa dispozitivul de stocare USB, utilizând o adresă IP atribuită (de exemplu \\\\ 192.168.0.1)."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Dacă este activată, clienții FTP din rețeaua locală pot accesa dispozitivul de stocare USB utilizând adresa IP atribuită, urmat de numărul port-ului serverului FTP (de exemplu, ftp://192.168.0.1:21)."
                       } ,{                      
                           type: "name",
                           title: "FTP (Via Internet)",
                           content: "Dacă este activată, utilizatorii pot accesa de la distanță unitatea de stocare USB prin FTP pe Internet. Această caracteristică suportă atât descărcarea, cât și încărcarea fișierelor. Pentru a schimba numărul portului serverului FTP, introduceți numărul portului și apăsați pe Salvare pentru a aplica modificările."
                       }]
} ,{                      
                           type: "name",
                           title: "Link",
                           content: "Afișează adresa utilizată pentru a accesa dispozitivul de stocare USB."
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "Afişează numărul portului serverului FTP. Utilizaţi valoarea implicită 21 sau o valoare între 1024 şi 65535."
                       } ,{                      
                           type: "paragraph",
                           content: "Apăsați Salvare pentru a salva toate setările."
                       }]
},
       FOLDER_SHARE_FOLDERS :{ 
               TITLE:"Partajare Fișiere",
               CONTENT: [{
                           type: "name",
                           title: "Partajare completă",
                           content: "Selectați Pornit pentru a partaja toate fișierele dispozitivului de stocare USB sau selectați Oprit pentru a partaja doar fișierele selectate."
                       } ,{                      
                           type: "name",
                           title: "Activare autentificare",
                           content: "Este recomandată activarea acestei opțiuni pentru a permite autentificarea utilizatorilor prin introducearea unui Utilizator și a unei Parole valide, pentru a avea acces la fișierele partajate."
                       } ,{                      
                           type: "name",
                           title: "Nume Fișier",
                           content: "Afișează numele fișierului partajat."
                       } ,{                      
                           type: "name",
                           title: "Cale Fișier Partajat",
                           content: "Afișează calea către fișierul partajat."
                       } ,{                      
                           type: "name",
                           title: "Partajare Media",
                           content: "Indică dacă fișierul partajat poate fi accesat ca document media sau nu."
                       } ,{                      
                           type: "name",
                           title: "Nume Volum Stocare",
                           content: "Afișează numele volumului de stocare."
                       } ,{                      
                           type: "name",
                           title: "Stare",
                           content: "Afișează starea fișierului partajat prin indicatorul bec."
                       } ,{                      
                           type: "name",
                           title: "Modifică",
                           content: "Afișează opțiunile pentru a putea Modifica și a Șterge fișierele partajate."
                       } ,{                      
                           type: "name",
                           title: "Caută",
                           content: "Apăsați acest buton pentru a căuta și selecta un fișier pe care doriți să îl partajați."
                       } ,{                      
                           type: "name",
                           title: "Acces Guest Network",
                           content: "Selectați această opțiune pentru a permite clienților conectați la rețeaua Guest Network accesarea fișierelor partajate."
                       } ,{                      
                           type: "name",
                           title: "Activare autentificare",
                           content: "Selectați această opțiune pentru a se solicita un Utilizator și o Parolă clienților care doresc să acceseze fișierele partajate."
                       } ,{                      
                           type: "name",
                           title: "Permite Editare",
                           content: "Selectați această opțiune pentru a permite utilizatorilor posibilitatea de a modifica/șterge conținutul partajat."
                       } ,{                      
                           type: "name",
                           title: "Activare Partajare Documente Media",
                           content: "Selectați această opțiune pentru a partaja documente media."
                       } ,{                      
                           type: "name",
                           title: "Actualizează",
                           content: "Apăsați pentru a actualiza lista fișierelor partajate."
                       }]
},
       PRINT_SERVER :{ 
               TITLE:"Printer Server",
               CONTENT: [{
                           type: "name",
                           title: "Printer Server",
                           content: "Comutați pe Pornit pentru a activa funcția Printer Server."
                       } ,{                      
                           type: "name",
                           title: "Nume Imprimantă",
                           content: "Afișează numele imprimantei conectate la router."
                       }]
},
       TIME_MACHINE :{ 
               TITLE:"Time Machine",
               CONTENT: [{
                           type: "paragraph",
                           content: "Time Machine realizează backup pentru toate fișierele din computerul tău Mac, în dispozitivul de stocare USB atașat la routerul tău."
                       } ,{                      
                           type: "name",
                           title: "Activare",
                           content: "Bifează această opțiune pentru activarea funcției Time Machine."
                       } ,{                      
                           type: "name",
                           title: "Locație Backup",
                           content: "Selectează o locație pentru backup-ul Time Machine."
                       } ,{                      
                           type: "name",
                           title: "Spațiul maxim pentru backup",
                           content: "Alocă spațiul care va fi utilizat pentru backup-ul Time Machine. 0 înseamnă ca nu există o limită maximă alocată."
                       } ,{                      
                           type: "name",
                           title: "Salvare",
                           content: "Apasă pentru a salva setările."
                       }]
},
       OFFLINE_DOWNLOAD :{ 
               TITLE:"Descărcare offline",
               CONTENT: [{
                           type: "paragraph",
                           content: "Utilizând funcția Descărcare Offline, router-ul poate descărca fișiere fără a se păstra calculatorul pornit în permanență."
                       } ,{                      
                           type: "name",
                           title: "Stare",
                           content: "Comutați pe Pornit pentru a activa funcția Descărcare Offline."
                       } ,{                      
                           type: "name",
                           title: "Cale Fișier Partajat",
                           content: "Selectați o cale a unui director pentru a stoca descărcările sau fișierele temporare.",
       children: [{                      
                           type: "note",
                           title: "Notă",
                           content: "Nu schimbați calea către director și nu demontați dispozitivul de stocare USB la încărcarea și descărcarea fișierelor; în caz contrar pot apărea unele erori fatale."
                       }]
} ,{                      
                           type: "name",
                           title: "Program",
                           content: "Bifați caseta de selectare pentru a activa funcția de Program care vă permite să specificați perioada (perioadele) de timp pentru a descărca / încărca fișiere."
                       } ,{                      
                           type: "name",
                           title: "Păstrați Încărcarea Fișierelor După Finalizarea Sarcinilor Completate.",
                           content: "Bifați caseta de selectare pentru a permite și altor utilizatori descărcarea fișierelor completate."
                       } ,{                      
                           type: "name",
                           title: "Numărul maxim de Descărcări active",
                           content: "Introduceți o valoare între 1 și 10 pentru a seta numărul maxim de descărcări active. Valoarea implicită este 5."
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"Descărcări",
               CONTENT: [{
                           type: "note",
                           title: "Fișier",
                           content: "Afișează numele și tipul fișierului de descărcare."
                       } ,{                      
                           type: "note",
                           title: "Viteză",
                           content: "Afișează viteza curentă de descărcare (sau de încărcare)."
                       } ,{                      
                           type: "note",
                           title: "Finalizat",
                           content: "Afișează progresul descărcării."
                       } ,{                      
                           type: "note",
                           title: "Timp Rămas",
                           content: "Afișează timpul rămas de descărcare."
                       } ,{                      
                           type: "note",
                           title: "Parteneri conectați",
                           content: "Afișează numărul de parteneri conectați la descărcare."
                       } ,{                      
                           type: "note",
                           title: "Stare",
                           content: "Afișează starea curentă a descărcării (descărcare, așteptare, donare, pauză, finalizat sau eroare)."
                       } ,{                      
                           type: "name",
                           title: "Pentru a adăuga o nouă descărcare",
       children: [{                      
                           type: "step",
       content: [ 
                "1. Apăsați Adaugă.",
                "2. Selectează sursa de descărcare, torrent din PC, torrent din USB, sau URL.",
                "3. Selectează locația torrent pentru BT, sau specifică URL-ul pentru FTP, HTTP și aMule.",
                "4. Apăsați Salvare.",
                "5. Pentru aMule, specifică adresa IP a serverului aMule și portul accesând Avansat> Server aMule."]
}]
} ,{                      
                           type: "name",
                           title: "Pentru a șterge descărcările",
                           content: "Selectați caseta corespunzătoare descărcărilor pe care doriți să le ștergeți, apoi apăsați Ștergere deasupra tabelului."
                       } ,{                      
                           type: "name",
                           title: "Pentru a pune descărcările pe pauză",
                           content: "Apăsați casetele corespunzătoare descărcărilor pe care doriți să le puneți pe pauză, apoi apăsați Pauză deasupra tabelului."
                       } ,{                      
                           type: "name",
                           title: "Pentru a continua descărcările",
                           content: "Apăsați casetele corespunzătoare descărcărilor pe care doriți să le porniți, apoi apăsați Pornire deasupra tabelului."
                       }]
},
       OFFLINE_DOWNLOAD_ADVANCED :{ 
               TITLE:"Avansat",
               CONTENT: [{
                           type: "name",
                           title: "Limitele de viteză",
                           content: "Specificați viteza maximă de descărcare și încărcare pentru conexiunea dumneavoastră la Internet."
                       } ,{                      
                           type: "name",
                           title: "Viteza maximă de descărcare",
                           content: "Introduceți o valoare între 1 și 100000 kB/s pentru a seta viteza maximă de descărcare. Valoarea implicită este 1024."
                       } ,{                      
                           type: "name",
                           title: "Viteza maximă de încărcare",
                           content: "Introduceți o valoare între 1 și 100000 Kbps pentru a seta viteza maximă de încărcare. Valoarea implicită este 512."
                       } ,{                      
                           type: "name",
                           title: "Numărul de conexiuni",
                           content: "Specificați numărul maxim de conexiuni."
                       } ,{                      
                           type: "name",
                           title: "Numărul maxim de conexiuni la nivel global",
                           content: "Introduceți o valoare între 1 și 200 pentru a stabili numărul maxim de conexiuni la nivel global. Valoarea implicită este de 100."
                       } ,{                      
                           type: "name",
                           title: "Numărul maxim de parteneri conectați per Torrent",
                           content: "Introduceți o valoare între 1 și 100 pentru a stabili numărul maxim de parteneri conectați pentru fiecare torrent. Valoarea implicită este de 50."
                       } ,{                      
                           type: "name",
                           title: "Activați funcția de rețea DHT",
                           content: "Activați această funcție pentru a îmbunătăți eficiența de găsire a partenerilor, astfel încât să puteți mări viteza de descărcare."
                       } ,{                      
                           type: "name",
                           title: "Activare schimb parteneri",
                           content: "Activați această funcție pentru a îmbunătăți eficiența comunicării în grupul de parteneri, astfel încât puteți mări viteza de descărcare."
                       } ,{                      
                           type: "name",
                           title: "Activare criptare protocol BitTorrent",
                           content: "Activați această funcție pentru a îmbunătății confidențialitatea în timpul procesului de transmitere a datelor."
                       } ,{                      
                           type: "name",
                           title: "Server aMule",
                           content: "Introduceți adresa IP și portul serverului aMule. Descărcarea funcționează numai atunci când routerul este conectat la server."
                       }]
},
       PARENTAL_CONTROL :{ 
               TITLE:"Control Parental",
               CONTENT: [{
                           type: "paragraph",
                           content: "Cu funcția Control Parental, puteți bloca site-urile web nepotrivite, explicite și rău intenționate; să restricționați accesul în anumite momente ale zilei (de exemplu, Facebook sau YouTube în timpul temelor)."
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"Dispozitive sub Control Parental",
               CONTENT: [{
                           type: "paragraph",
                           content: "Acest tabel afișează informațiile și setările dispozitivelor care sunt în prezent restricționate de Controlul Parental."
                       } ,{                      
                           type: "step",
                           title: "Pentru a restricționa un dispozitiv nou",
       content: [ 
                "1. Porniți Controlul Parental.",
                "2. Apăsați Adăugare.",
                "3. Apăsați Scanare pentru a alege un dispozitiv conectat în prezent din Lista de Acces Dispozitive; sau introduceți manual numele dispozitivului și adresa MAC pentru a adăuga un dispozitiv care nu este conectat.",
                "4. Apăsați pe pictograma de timp pentru a specifica o perioadă de timp în care se aplică restricția.",
                "5. Introduceți o scurtă descriere în câmpul Descriere. Acest câmp este opțional.",
                "6. Selectați Activare.",
                "7. Apăsați Salvare."]
} ,{                      
                           type: "note",
                           title: "Notă",
                           content: "În cazul în care doriți să dezactivați această intrare, apăsați pe pictograma bec."
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"Restricții Conținut",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funcția Restricții Conținut vă permite să restricționați accesul la anumite site-uri, folosind cuvinte cheie și nume de domeniu. Dispozitivele client fiind controlate de Control Parental pot sau nu pot avea acces la aceste site-uri, în funcție de politica de restricție selectată."
                       } ,{                      
                           type: "step",
                           title: "Pentru a specifica conținutul de acces",
       content: [ 
                "1. Porniți Restricțiile de Conținut.",
                "2. Selectați politica de restricție în funcție de nevoie:",
                "A. Dacă doriți ca dispozitivele controlate să aibă acces la toate site-urile, cu excepția unora specifice, selectați Listă Interziceri.",
                "B. Dacă doriți ca dispozitivele controlate să aibă acces doar la anumite site-uri, selectați Listă Permisiuni.",
                "3. Apăsați Adaugă un Cuvânt-Cheie Nou pentru a adăuga un cuvânt cheie (de exemplu, wikipedia) sau numele de domeniu în Lista de Interziceri sau în Lista de Permisiuni.",
                "4. Apăsați Salvare."]
}]
},
       PARENTAL_CONTROL_V2 :{ 
               TITLE:"Control Parental",
               CONTENT: [{
                           type: "paragraph",
                           content: "Cu ajutorul profilurilor utilizatorilor, al filtrului de conținut și al limitelor de acces, controlul parental oferă fiecărui membru al familiei tale un acces personalizat și adecvat la internet."
                       } ,{                      
                           type: "step",
                           title: "Pentru a aplica Controlul Parental unui dispozitiv nou",
       content: [ 
                "1. Apăsați Adaugă.",
                "2. Introdu un nume pentru acest profil și apasă \"+\" pentru a adăuga acest(e) dispozitiv(e) în acest profil.",
                "3. Personalizează conținutul blocat în funcție de nevoile tale. Toate site-urile care conțin cuvintele cheie vor fi blocate.",
                "4. Dacă dorești să limitezi timpul total pe care acest profil îl poate petrece online, activează și specifică limitele de timp. De asemenea, poți utiliza Perioada de somn pentru a configura o perioadă de timp, pe parcursul căreia dispozitivele din acest profil nu pot accesa Iinternetul.",
                "5. Faceți clic pe Salvare."]
} ,{                      
                           type: "step",
                           title: "Pentru a vizualiza detaliat istoricul accesului la Internet al profilului",
       content: [ 
                "1. În coloana Perspective, apsă pe butonul corespunzător Perspective.",
                "2. Dacă vrei să vezi mai multe înregistrări, apasă pe butonul Istoric <span class=\"ptl-ctr-help-icon history\"></span>.",
                "3. Poți bloca sau debloca siteuri web prin apăsarea pe <span class=\"ptl-ctr-help-icon block\"></span> sau <span class=\"ptl-ctr-help-icon unblock\"></span>."]
} ,{                      
                           type: "step",
                           title: "Pentru a dezactiva sau activa imediat accesul la Internet",
       content: [ 
                "În coloana de acces la Internet, apasă pe <span class=\"ptl-ctr-help-icon stop\"></span> pentru a opri accesul la Internet pe dispozitivele profilului corespunzător și apasă pe <span class=\"ptl-ctr-help-icon enable\"></span> pentru a activa din nou accesul."]
                       }]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funcția QoS (Quality of Service) ajută la prioritizarea traficului de Internet bazat pe nevoile dumneavoastră. Aveți posibilitatea să specificați nivelul de prioritate pentru un dispozitiv, un port fizic sau o aplicație în lista de reguli QoS."
                       } ,{                      
                           type: "note",
                           id: "qos-boost",
                           title: "Notă",
                           content: "Dacă NAT Boost este activat, QoS trebuie dezactivat."
                       } ,{                      
                           type: "name",
                           title: "Lățime bandă Upload",
                           content: "Introduceți lățimea de bandă maximă pentru încărcare furnizată de ISP."
                       } ,{                      
                           type: "name",
                           title: "Lățime bandă Download",
                           content: "Introduceți lățimea de bandă maximă pentru descărcare furnizată de ISP."
                       }]
},
       QOS_ADV :{ 
               TITLE:"Avansat",
               CONTENT: [{
                           type: "name",
                           title: "Prioritate Ridicată/Medie/Scăzută",
                           content: "Specificați un procentaj pentru a prioritiza traficul cu intensitate ridicată/medie/scăzută.",
       children: [{                      
                           type: "note",
                           title: "Notă",
                           content: "Nivelul maxim (procentual) al tuturor prioritaților este 1."
                       }]
}]
},
       QOS_RULE :{ 
               TITLE:"Listă Reguli QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Aici puteți adăuga reguli detaliate QoS pentru prioritizarea traficului pe Internet."
                       } ,{                      
                           type: "step",
                           title: "Pentru a configura o regulă QoS",
       content: [ 
                "1. Apăsați Adaugă.",
                "2. Selectați un tip de prioritate pentru a adăuga regula QoS.",
                "După Dispozitiv - Apăsați Scanare pentru a selecta dispozitivul dorit, sau introduceți manual un nume de dispozitiv și adresa MAC.",
                "După Aplicație - Selectați aplicația dorită sau puteți personaliza o aplicație prin configurarea numelui, protocolului sau portului destinație (1-65535). Puteți introduce un singur port sau mai multe porturi sau intervalul de porturi, separate prin virgulă (de exemplu, 21,36-105,111).",
                "După Portul Fizic - Selectați portul dorit.",
                "3. Apăsați Salvare."]
} ,{                      
                           type: "note",
                           title: "Notă",
                           content: "Aveți posibilitatea să mutați o regulă între diferitele liste de prioritate pentru a schimba prioritatea."
                       }]
},
       QOS_DATABASE :{ 
               TITLE:"Actualizare Bază Date",
               CONTENT: [{
                           type: "paragraph",
                           content: "Vom lansa cea mai recentă versiune de bază de date pe www.tp-link.com. Puteți descărca și actualiza baza de date a router-ului pentru a extinde aplicațiile sale acceptate."
                       } ,{                      
                           type: "name",
                           title: "Fișier Nou Bază de Date",
                           content: "Apăsați Răsfoire pentru a localiza cel mai recent fișier de bază de date. Selectați-l și apăsați Actualizare pentru a actualiza baza de date la cea mai recentă versiune."
                       }]
},
       QOS_V2 :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (Quality of Service) îți permite să prioritizezi traficul pe internet al anumitor dispozitive pentru a garanta o conexiune mai rapidă atunci când ai nevoie cel mai mult."
                       }]
},
       QOS_GLOBAL_SETTINGS :{ 
               TITLE:"Setări Globale",
               CONTENT: [{
                           type: "paragraph",
                           content: "Upload Bandwidth - Inserează lățimea de bandă maximă de upload furnizată de ISP-ul tău."
                       } ,{                      
                           type: "paragraph",
                           content: "Download Bandwidth - Inserează lățimea de bandă maximă de download furnizată de ISP-ul tău."
                       }]
},
       QOS_DEVICE_PRIORITY :{ 
               TITLE:"Prioritate dispozitiv",
               CONTENT: [{
                           type: "paragraph",
                           content: "Alege dispozitivul/dispozitivele pentru care dorești să acorzi prioritate și cât timp vor avea prioritate."
                       } ,{                      
                           type: "step",
                           title: "Pentru a acorda prioritate unui dispozitiv",
       content: [ 
                "1. Găsește în listă dispozitivul caruia dorești să îi acorzi prioritate și activează funcția Prioritate.",
                "2. Selectează cât timp dispozitivul va avea prioritate în coloana de temporizare."]
}]
},
       SECURITY_FIREWALL :{ 
               TITLE:"Firewall",
               CONTENT: [{
                           type: "name",
                           title: "Funcția SPI Firewall",
                           content: "SPI (Stateful Packet Inspection) Firewall previne atacurile cibernetice și validează traficul care trece prin router bazat pe protocolul specific. În mod implicit, această caracteristică este activată."
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"Protecție DoS",
               CONTENT: [{
                           type: "name",
                           title: "Protecție DoS",
                           content: "Protecția DoS (Denial of Service) ajută împotriva atacurilor DoS și previne suprasolicitarea rețelei cu solicitări de server. Puteți filtra următoarele trei tipuri de atacuri, în funcție de necesități. Există patru niveluri pentru fiecare filtrare:",
       children: [{                      
                           type: "name",
                           title: "Oprită",
                           content: "Fără protecție."
                       } ,{                      
                           type: "name",
                           title: "Scăzută",
                           content: "Nivel scăzut de protecție. Are un impact redus asupra performanței routerului."
                       } ,{                      
                           type: "name",
                           title: "Medie",
                           content: "Nivel moderat de protecție. Are un impact abia perceptibil asupra performanței routerului."
                       } ,{                      
                           type: "name",
                           title: "Ridicată",
                           content: "Nivel înalt de protecție. Are un impact vizibil asupra performanței routerului."
                       }]
} ,{                      
                           type: "name",
                           title: "Filtrare Atac ICMP-FLOOD",
                           content: "Activați pentru a preveni atacuri de tip ICMP flood (Internet Control Message Protocol)."
                       } ,{                      
                           type: "name",
                           title: "Filtrare Atac UDP-FLOOD",
                           content: "Activați pentru a preveni atacuri de tip UDP flood (User Datagram Protocol)."
                       } ,{                      
                           type: "name",
                           title: "Filtrare Atac TCP-SYN-FLOOD",
                           content: "Activați pentru a preveni atacul de tip TCP-SYN flood (Transmission Control Protocol-Synchronize)."
                       } ,{                      
                           type: "name",
                           title: "Ignoră pachetele ping din portul WAN",
                           content: "Blochează pachetele ping către adresa WAN a routerului."
                       } ,{                      
                           type: "name",
                           title: "Interzice pachetele ping din portul LAN",
                           content: "Blochează pachetele ping către adresa LAN a routerului."
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"Listă Gazde Blocate pentru DoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Acest tabel afișează adresa IP și adresa MAC a gazdei DoS blocate."
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"Controlul Accesului",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funcția de Control Acces este utilizată pentru a permite sau bloca dispozitivele client să acceseze rețeaua. Când un dispozitiv este blocat, acesta nu este în măsură să comunice cu alte dispozitive și nu se poate conecta la Internet."
                       } ,{                      
                           type: "step",
                           title: "Pentru a controla accesul",
       content: [ 
                "1. Comutați Pornit pentru a activa Controlul Accesului.",
                "2. Dacă doriți, de asemenea, să controlați accesul dispozitivelor conectate la rețeaua vizitatori, activați funcția Control Dispozitive Oaspete.",
                "3. Selectați un mod de acces în funcție de necesități și apăsați Salvare:",
                "A. Dacă doriți să blocați accesul la dispozitivele din lista de mai jos, selectați Listă Interziceri.",
                "B. Dacă doriți să permiteți accesul numai de la dispozitivele din lista de mai jos, selectați Listă Permisiuni.",
                "4. La dispozitivele din Lista de Interziceri/Permisiuni, apăsați Adăugare. Introduceți numele și adresa MAC a dispozitivului. Apăsați Salvare."]
} ,{                      
                           type: "note",
                           title: "Notă",
                           content: "În cazul în care doriți să dezactivați această intrare, apăsați pe pictograma bec."
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"Dispozitive Active",
               CONTENT: [{
                           type: "paragraph",
                           content: "Acest tabel afișează informațiile tuturor dispozitivelor conectate (inclusiv dispozitivele conectate la rețeaua vizitatori, dacă funcția Control Dispozitive Oaspete este activată)."
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"Asociere IP & MAC",
               CONTENT: [{
                           type: "paragraph",
                           content: "Asocierea IP&MAC (de asemenea, cunoscut sub numele de ARP Binding) este util pentru controlul accesului unui anumit dispozitiv în LAN prin asocierea adresei IP și adresei MAC a dispozitivului. Asocierea IP & MAC, de asemenea, previne alte dispozitive să utilizeze o adresă IP specifică."
                       } ,{                      
                           type: "step",
                           title: "Pentru a configura asocierea IP & MAC",
       content: [ 
                "1. Apăsați Adaugă.",
                "2. Introduceți Adresa MAC a dispozitivului.",
                "3. Introduceți o adresă IP pe care doriți să o asociați la adresa MAC de mai sus.",
                "4. Selectați Activează.",
                "5. Faceți clic pe Salvare."]
} ,{                      
                           type: "note",
                           title: "Notă",
       content: [ 
                "1. Nu puteți asocia aceeași adresă IP pentru mai mult de o adresă MAC.",
                "2. În cazul în care doriți să dezactivați această intrare, apăsați pe pictograma bec."]
}]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"Listă ARP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Acest tabel afișează adresa IP și adresa MAC a dispozitivelor conectate în prezent."
                       }]
},
       IPV6 :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "name",
                           title: "IPv6",
                           content: "IPv6 (Internet Protocol versiunea 6) este cea mai recentă versiune a IP (Internet Protocol) și se ocupă de problema epuizării adreselor IPv4 (Internet Protocol versiunea 4)."
                       } ,{                      
                           type: "title",
                            title: "Tipul Conexiunii la Internet: IP Dinamic"
                       } ,{                      
                           type: "name",
                           title: "IP Dinamic",
                           content: "Selectați acest tip dacă ISP-ul utilizează alocare dinamică de adrese IPv6."
                       } ,{                      
                           type: "name",
                           title: "Adresă IPv6/DNS Primar/DNS Secundar",
                           content: "Acești parametri sunt atribuiți automat de către serverul DHCPv6 de la ISP."
                       } ,{                      
                           type: "name",
                           title: "Reînnoire",
                           content: "Apăsați aici pentru a obține noi parametri IPv6 de la serverul DHCPv6 de la ISP."
                       } ,{                      
                           type: "name",
                           title: "Eliberare",
                           content: "Apăsați pentru a elibera toate adresele IPv6 atribuite de serverul de DHCPv6 de la ISP."
                       } ,{                      
                           type: "name",
                           title: "Obține Adresă IPv6",
                           content: "Selectați DHCPv6 pentru a obține o adresă IPv6 non-temporară sau SLAAC pentru a obține o adresă IPv6 generată de pachetele RA ale routerului în funcție de ISP-ul dumneavoastră."
                       } ,{                      
                           type: "name",
                           title: "Delegare Prefix",
                           content: "Selectați Activare pentru a primi o delegare de prefix de la serverul DHCPv6 al ISP-ului, sau Dezactivare, pentru a atribui manual prefixul. Clienții din LAN vor genera o adresă IPv6 cu acest prefix."
                       } ,{                      
                           type: "name",
                           title: "Adresă DNS",
                           content: "Selectați Obține Automat de la ISP sau Folosește următoarele adrese DNS. Dacă este selectată opțiunea Folosește următoarele adrese DNS, vă rugăm să introduceți manual adresa DNS furnizată de ISP."
                       } ,{                      
                           type: "title",
                            title: "Tipul Conexiunii la Internet: IP Static"
                       } ,{                      
                           type: "name",
                           title: "IP Static",
                           content: "Selectați acest tip dacă ISP-ul utilizează alocare statică a adresei IPv6."
                       } ,{                      
                           type: "name",
                           title: "Adresă IPv6/Default Gateway/DNS Primar/DNS Secundar",
                           content: "Introduceți acești parametri așa cum v-au fost oferiți de furnizorul de Internet (ISP)."
                       } ,{                      
                           type: "name",
                           title: "Dimensiune MTU",
                           content: "Dimensiunea MTU (Maximum Transmission Unit) implicită și uzuală pentru majoritatea rețelelor Ethernet este de 1500 Bytes. Nu este recomandat să modificați dimensiunea implicită MTU, cu excepția cazului în care furnizorul dumneavoastră de Internet solicită acest lucru."
                       } ,{                      
                           type: "title",
                            title: "Tipul conexiunii la Internet: Tunel 6to4"
                       } ,{                      
                           type: "name",
                           title: "Tunel 6to4",
                           content: "Selectați acest tip dacă ISP-ul utilizează implementarea 6to4 pentru atribuirea de adrese."
                       } ,{                      
                           type: "name",
                           title: "Adresă IPv4/Subnet Mask IPv4/Default Gateway IPv4/Adresă Tunel",
                           content: "Acești parametri vor fi generați automat prin intermediul portului WAN după apăsarea butonului Conectare."
                       } ,{                      
                           type: "name",
                           title: "Utilizați următorul server DNS",
                           content: "Selectați pentru a introduce manual DNS Primar și/sau DNS secundar furnizate de ISP."
                       } ,{                      
                           type: "name",
                           title: "Conectare",
                           content: "Apăsați pentru a se conecta la Internet."
                       } ,{                      
                           type: "name",
                           title: "Deconectare",
                           content: "Apăsați pentru a se deconecta de la Internet."
                       } ,{                      
                           type: "title",
                            title: "Tipul Conexiunii la Internet: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE",
                           content: "Selectați acest tip dacă ISP utilizează PPPoEv6 și oferă un nume de utilizator și o parolă."
                       } ,{                      
                           type: "name",
                           title: "Utilizator/Parolă",
                           content: "Introduceți acești parametri așa cum v-au fost oferiți de furnizorul de Internet (ISP)."
                       } ,{                      
                           type: "name",
                           title: "Adresă IPv6",
                           content: "Această adresă va fi atribuită în mod automat de către serverul de DHCPv6 de la ISP, după ce introduceți numele de utilizator și parola, apăsați Conectare."
                       } ,{                      
                           type: "name",
                           title: "Obține Adresă IPv6",
                           content: "Selectați DHCPv6 pentru a obține o adresă IPv6 non-temporară sau SLAAC pentru a obține o adresă IPv6 generată de router, sau introduceți manual adresa IPv6, în conformitate cu ISP-ul."
                       } ,{                      
                           type: "name",
                           title: "Delegare Prefix",
                           content: "Selectați Activare pentru a primi o delegare de prefix de la serverul DHCPv6 al ISP-ului, sau Dezactivare, pentru a atribui manual prefixul. Clienții din LAN vor genera o adresă IPv6 cu acest prefix."
                       } ,{                      
                           type: "name",
                           title: "Adresă DNS",
                           content: "Selectați pentru a obține adresele DNS in mod dinamic de la ISP. Dacă este selectată opțiunea, vă rugăm să introduceți manual adresa DNS furnizată de ISP."
                       } ,{                      
                           type: "name",
                           title: "Conectare",
                           content: "Apăsați pentru a se conecta la Internet."
                       } ,{                      
                           type: "name",
                           title: "Deconectare",
                           content: "Apăsați pentru a se deconecta de la Internet."
                       } ,{                      
                           type: "title",
                            title: "Tip Conexiune Internet: Pass-Through (Bridge)"
                       } ,{                      
                           type: "paragraph",
                           content: "Selectați acest tip dacă ISP-ul utilizează rețeaua de implementare Pass-through (Bridge). Nicio configurație nu este necesară pentru acest tip de conexiune."
                       }]
},
       IPV6_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Cu excepția conexiunii la Internet de tipul Pass-through (Bridge), celelalte tipuri de conexiune la Internet necesită configurarea IPv6."
                       } ,{                      
                           type: "name",
                           title: "Tipul alocării",
                           content: "Selectați opțiunea corespunzătoare în funcție de ISP.",
       children: [{                      
                           type: "name",
                           title: "DHCPv6",
                           content: "Pentru a aloca automat adrese IP clienților LAN.",
       children: [{                      
                           type: "name",
                           title: "Prefix Adresă",
                           content: "Introduceți prefixul adresei, așa cum a fost menționat de ISP."
                       } ,{                      
                           type: "name",
                           title: "Timp Eliberare",
                           content: "Reprezintă timpul valid al adresei IP atribuită. Fie păstrați valoarea implicită de 86400 secunde sau modificați dacă este solicitat de ISP."
                       } ,{                      
                           type: "name",
                           title: "Adresă",
                           content: "Este adresa IP atribuită în mod automat de serverul DHCPv6 de la ISP."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+Stateless DHCP",
       children: [{                      
                           type: "name",
                           title: "Prefix Adresă",
                           content: "Introduceți prefixul adresei, așa cum a fost menționat de ISP."
                       } ,{                      
                           type: "name",
                           title: "Adresă",
                           content: "Este adresa IP atribuită automat de ISP."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+RDNSS",
       children: [{                      
                           type: "name",
                           title: "Prefix Adresă",
                           content: "Introduceți prefixul adresei, așa cum a fost menționat de ISP."
                       } ,{                      
                           type: "name",
                           title: "Adresă",
                           content: "Este adresa IP atribuită automat de ISP."
                       }]
}]
}]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"Clonare MAC",
               CONTENT: [{
                           type: "paragraph",
                           content: "Alegeți metoda de clonare MAC corespunzătoare."
                       } ,{                      
                           type: "name",
                           title: "NU clonați adresa MAC",
                           content: "NU schimbați adresa MAC a routerului în cazul în care furnizorul de Internet asociază adresa dumneavoastră IP de această adresă MAC."
                       } ,{                      
                           type: "name",
                           title: "Clonați Adresa MAC a computerului conectat",
                           content: "Selectaţi pentru a copia adresa MAC a computerului care este conectat la router, în cazul în care furnizorul dumneavoastră de Internet leagă Adresa IP alocată de adresa MAC a computerului."
                       } ,{                      
                           type: "name",
                           title: "Utilizează o adresă MAC personalizată",
                           content: "Introduceţi Adresa MAC manual, în cazul în care furnizorul dumneavoastră de Internet leagă adresa IP alocată de o adresă MAC specificată."
                       }]
},
       TIME_SETTING :{ 
               TITLE:"Setări Dată și Oră",
               CONTENT: [{
                           type: "paragraph",
                           content: "Setările de timp vă permit să configurați ora sistemului pentru router. Odată modificat, timpul de sistem va fi aplicat la funcțiile și configurațiile bazate pe timp, cum ar fi Controlul Parental."
                       } ,{                      
                           type: "note",
                           title: "Notă",
                           content: "Puteți comuta pentru a activa formatul de 24 ore înainte de configurare, se va aplica la funcții și configurații bazate pe timpul sistemului."
                       } ,{                      
                           type: "title",
                            title: "Ora Sistemului"
                       } ,{                      
                           type: "step",
                           title: "Pentru a obtine ora exactă de pe Internet",
       content: [ 
                "Selectați modul implicit, Obține automat de pe Internet pentru a obține ora sistemului de pe Internet.",
                "1. Selectați Obține automat de pe Internet .",
                "2. Selectați fusul orar local din lista verticală.",
                "3. În câmpul Server NTP I, introduceți adresa IP sau numele de domeniu al serverului NTP dorit.",
                "4. În câmpul Server NTP II, introduceți adresa IP sau numele de domeniu al serverului NTP secundar (Opțional)",
                "5. Apăsați Obține.",
                "6. Click pe Salvare."]
} ,{                      
                           type: "step",
                           title: "Pentru a obține ora exactă de la PC",
       content: [ 
                "Această funcție vă permite să obțineți ora sistemului de la PC. Vă rugăm să confirmați ora PC-ului înainte de configurare.",
                "Selectați Obține de la PC și apăsați Salvare."]
} ,{                      
                           type: "step",
                           title: "Pentru a seta manual ora",
       content: [ 
                "În cazul în care aparatul nu poate obține în mod automat timpul de pe Internet sau PC, puteți configura manual ora sistemului.",
                "1. Selectați manual.",
                "2. Introduceți data curentă și ora.",
                "3. Apăsați Salvare."]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Ora de vară",
                           content: "Această funcție poate sincroniza automat ora sistemului cu ora de vară."
                       } ,{                      
                           type: "step",
                           title: "Pentru a seta ora de vară",
       content: [ 
                "1. Apăsați Activare oră de vară.",
                "2. Specificați o perioadă de timp a orei de vară în fusul orar local.",
                "3. Apăsați Salvare."]
}]
},
       DIGNOSTIC :{ 
               TITLE:"Diagnosticare",
               CONTENT: [{
                           type: "paragraph",
                           content: "Router-ul oferă instrumentele Ping și Traceroute pentru a ajuta la depanarea problemelor de rețea."
                       } ,{                      
                           type: "title",
                            title: "Ping & Traceroute"
                       } ,{                      
                           type: "paragraph",
                           content: "Instrumentul Ping trimite pachete către o adresă IP de destinație sau către un nume de domeniu și înregistrează rezultatele, cum ar fi numărul de pachete trimise și primite, precum și timpul de tur-retur."
                       } ,{                      
                           type: "paragraph",
                           content: "Instrumentul Traceroute trimite pachete la o adresă IP de destinație sau către un nume de domeniu și afișează numărul de segmente și timpul pentru a ajunge la destinație."
                       } ,{                      
                           type: "paragraph",
                           content: "Aveți posibilitatea să aplicați comenzile ping sau traceroute unui dispozitiv local prin adresa IP sau unui nume de domeniu, cum ar fi tp-link.com, yahoo.com, etc."
                       } ,{                      
                           type: "step",
                           title: "Pentru a diagnostica folosind Ping",
       content: [ 
                "1. Selectați Ping ca instrument de diagnosticare.",
                "2. Introduceți adresa IP țintă sau numele de domeniu.",
                "3. Apăsați pe pictograma săgeată pentru a deschide meniul Avansat și specificați valori pentru numărul de pachete ping, și pentru dimensiunea pachetului ping. (Opțional)",
                "4. Apăsați Start."]
} ,{                      
                           type: "step",
                           title: "Pentru a diagnostica folosind Traceroute",
       content: [ 
                "1. Selectați Traceroute ca instrument de diagnosticare.",
                "2. Introduceți adresa IP țintă sau numele de domeniu.",
                "3. Apăsați pe pictograma săgeată pentru a deschide meniul Avansat și specificați numărul de segmente (care urmează să fie atins), în câmpul Traceroute Max TTL (Time to Live). Valoarea implicită este 20. (Opțional)",
                "4. Apăsați Start."]
}]
},
       PORT_MIRROR :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                            title: "Port Mirroring"
                       } ,{                      
                           type: "paragraph",
                           content: "Port Mirroring se referă la procesul de transmitere de copii ale pachetelor dintr-un port mirrored într-un port mirroring. De obicei, portul mirroring este conectat la un dispozitiv de diagnostic de date, care este folosit pentru a analiza pachetele de la portul mirrored și depanarea rețelei."
                       } ,{                      
                           type: "step",
                           title: "Pentru a trimite copii ale pachetelor către portul desemnat",
       content: [ 
                "1. Activați Port Mirroring.",
                "2. Selectați porturile dorite ca porturi mirrored.",
                "3. Selectați portul dorit ca port mirroring.",
                "4. Apăsați Salvare."]
} ,{                      
                           type: "note",
                           title: "Notă",
                           content: "Un port nu poate fi setat ca port mirrored și mirroring simultan."
                       }]
},
       FIRMWARE :{ 
               TITLE:"Actualizare Firmware",
               CONTENT: [{
                           type: "paragraph",
                           content: "Firmware Upgrade actualizează versiunea de firmware a router-ului cu noi caracteristici sau erori reparate. Este recomandat să efectuați upgrade la router cu cel mai recent fișier de firmware pentru a avea cele mai bune performanțe."
                       } ,{                      
                           type: "step",
                           title: "Următoarele recomandări vă ajută să evitați eșecul operațiunii de actualizare:",
       content: [ 
                "Înainte de a actualiza",
                "1. Asigurați-vă că aveți o conexiune stabilă între router și computer. Nu este recomandat să actualizați firmwareul folosind conexiunea wireless.",
                "2. Asigurați-vă că ați deconectat toate dispozitivele USB conectate la router.",
                "3. Efectuați o copie de siguranță a setărilor routerului.",
                "În timpul actualizării",
                "Mențineți routerul PORNIT până la finalizarea procesului de actualizare."]
}]
},
       FIRMWARE_UPGRADE_ONLINE :{ 
               TITLE:"Pentru a actualiza online firmware-ul",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Apăsați Actualizare și confirmați mesajul afișat. Routerul va descărca și va actualiza automat cea mai recentă versiune firmware disponibilă. De asemenea, puteți apăsa Verificare Actualizare pentru a verifica dacă există o versiune firmware recentă."]
}]
},
       FIRMWARE_UPGRADE :{ 
               TITLE:"Pentru a actualiza manual firmware-ul",
               CONTENT: [{
                           type: "step",
       content: [ 
                "1. Apăsați Suport din partea de jos a paginii și descărcați pe calculator cel mai recent firmware. Asigurați-vă că fișierul firmware pe care aveți de gând să îl descărcați se potrivește cu versiunea hardware a router-ului așa cum este afișat pe pagină.",
                "2. Apăsați Căutare și selectați fișierul firmware descărcat.",
                "3. Apăsați Actualizare."]
} ,{                      
                           type: "paragraph",
       content: [ 
                "Actualizarea firmware poate dura câteva minute până la finalizare. Routerul va reporni automat atunci când actualizarea de firmware este finalizată."]
}]
},
       BACKUP :{ 
               TITLE:"Copie de siguranța și Restaurare",
               CONTENT: [{
                           type: "paragraph",
                           content: "Salvare setări și restaurare vă permite copierea de rezervă a configurației curente pentru recuperarea router-ului , sau pur și simplu pentru a restabili routerul la setările implicite."
                       } ,{                      
                           type: "note",
                           title: "Notă",
                           content: "Vă rugăm să NU opriți router-ul în timpul procesului de salvare sau restaurare a configurației sau restaurare."
                       } ,{                      
                           type: "title",
                           title: "Copie de siguranță",
                           content: "Este foarte recomandat să Salvați configurația curentă, în caz că este nevoie de o restaurare a routerului la o stare anterioară."
                       } ,{                      
                           type: "step",
                           title: "Pentru a face o copie de siguranță a setărilor curente",
       content: [ 
                "1. Apăsați Copie de Siguranță",
                "2. Așteptați până când routerul copiază configurația curentă."]
}]
},
       RESTORE :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Restaurare",
                           content: "Puteți restaura routerul la o stare anterioară dintr-un fișier de copie de siguranță."
                       } ,{                      
                           type: "step",
                           title: "Pentru a restaura configurația salvată",
       content: [ 
                "1. Apăsați Căutare.",
                "2. Localizați și selectați configurația salvată.",
                "3. Apăsați Restaurare."]
}]
},
       FACTORY :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Restaurare Setări Fabrică",
       content: [ 
                "Restaurarea routerului la setările din fabrică va șterge toate configurațiile și setările și le va restabili la valorile implicite. De exemplu, toate informațiile legate de wireless, control parental și setări de rețea vor fi șterse.",
                "După o restaurare la setările din fabrică, va trebui să setezi o nouă parolă pentru a accesa pagina web de administrare a routerului."]
}]
},
       REBOOT :{ 
               TITLE:"Program Repornire",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funcția Program Repornire golește cache-ul pentru a îmbunătăți performanțele routerului. Poți reporni routerul manual sau îl poți configura să reporneacă automat în mod regulat."
                       } ,{                      
                           type: "step",
                           title: "Pentru a reporni manual",
       content: [ 
                "Apăsați Repornire și așteptați câteva minute pentru repornirea routerului."]
} ,{                      
                           type: "step",
                           title: "Pentru a programa timpul de repornire",
       content: [ 
                "1. Activează Program Repornire.",
                "2. Setează când și cât de frecvent să repornească routerul prin specificarea parametrilor din câmpurile Timp Repornire și Repetare.",
                "3. Apăsați Salvare."]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"Administrare",
               CONTENT: [{
                           type: "paragraph",
                           content: "Administrarea îți permite să gestionezi parola de conectare și permisiunea de acces pentru clienții conectați la router."
                       } ,{                      
                           type: "name",
                           title: "Administrare Conturi",
                           content: "Această funcție vă permite să schimbați parola.",
       children: [{                      
                           type: "step",
                           title: "Pentru a schimba parola",
       content: [ 
                "1. Tastează parola veche.",
                "2. Tastează parola nouă.",
                "3. Confirmă parola nouă.",
                "4. Apăsați Salvare."]
}]
}]
},
       ADMIN_RECOVERY :{ 
               TITLE:"Recuperare Parolă",
               CONTENT: [{
                           type: "name",
                           title: "Recuperare Parolă implicită",
                           content: "Funcția Recuperare Parolă Implicită îți permite să recuperezi parola inițială de autentificare fără a reseta routerul la setările din fabrică.",
       children: [{                      
                           type: "step",
                           title: "Pentru a schimba parola",
       content: [ 
                "1. Activează funcția implicită de recuperare a parolei.",
                "2. În câmpul De La, tastează o adresă de e-mail validă utilizată pentru a trimite un cod de verificare pentru recuperarea informațiilor de autentificare.",
                "3. În câmpul Către, tastează o adresă de e-mail validă pentru primirea codului de verificare.",
                "4. Specifică serverul SMTP pentru adresa e-mail de ieșire (De La).",
                "5. În cazul în care adresa de e-mail din câmpul De La necesită criptare, trebuie să bifezi caseta de Activare Autentificare și să tastezi Numele de Utilizator (adresa de e-mail) și Parola.",
                "6. Click pe Salvare."]
}]
}]
},
       ADMIN_LOCAL :{ 
               TITLE:"Management Local",
               CONTENT: [{
                           type: "paragraph",
                           content: "Această funcție permite dispozitivelor locale să acceseze și să administreze routerul."
                       } ,{                      
                           type: "name",
                           id: "local_management_https",
                           title: "Administrare locală prin HTTPS",
                           content: "Activează funcția de administrare locală prin HTTPS dacă dorești să accesezi routerul prin HTTP și prin HTTPS, sau păstrează această funcție dezactivată dacă dorești să administrezi routerul doar prin HTTP."
                       } ,{                      
                           type: "name",
                           title: "Acces pentru toate dispozitivele conectate la rețeaua locală",
                           content: "Comutați pe Pornit pentru a permite administrarea pentru toate dispozitivele conectate la rețeaua locală, sau Oprit pentru a permite administrarea unui dispozitiv anume."
                       } ,{                      
                           type: "name",
                           title: "Adresa MAC",
                           content: "Afișează adresa MAC a dispozitivului selectat pentru a avea acces."
                       } ,{                      
                           type: "name",
                           title: "Descriere",
                           content: "Afișează descrierea dispozitivului selectat pentru a avea acces."
                       } ,{                      
                           type: "name",
                           title: "Stare",
                           content: "Afișează starea curentă a dispozitivului selectat pentru a avea acces (activat sau dezactivat)."
                       } ,{                      
                           type: "name",
                           title: "Modifică",
                           content: "Vă oferă posibilitatea să Modificați sau să Stergeți dispozitivul corespunzător din lista."
                       } ,{                      
                           type: "step",
                           title: "Pentru a adăuga un dispozitiv în listă",
       content: [ 
                "1. Apăsați Adaugă.",
                "2. Apăsați Vizualizare Dispozitive Existente pentru a adăuga un dispozitiv existent sau introduceți adresa MAC a dispozitivului în câmpul Adresă MAC.",
                "3. Introduceți o Descriere pentru dispozitivul respectiv.",
                "4. Selectați Activează.",
                "5. Apăsați butonul OK."]
} ,{                      
                           type: "step",
                           title: "Pentru a modifica sau șterge un dispozitiv din listă",
                           content: "În tabel, apăsați pictogramele Editare sau Ștergere corespunzătoare cu dispozitivul pe care doriți sa îl modificați/ștergeți."
                       } ,{                      
                           type: "step",
                           title: "Pentru a șterge dispozitive multiple",
                           content: "Selectați toate dispozitivele pe care doriți să le ștergeți apoi apăsați Șterge"
                       }]
},
       ADMIN_REMOTE_WITHOUT_HTTPS :{ 
               TITLE:"Management de la Distanță",
               CONTENT: [{
                           type: "name",
                           title: "Management de la Distanță",
                           content: "Funcția Management de la Distanță permite dispozitivelor aflate la distanță să acceseze și să gestioneze routerul.",
       children: [{                      
                           type: "step",
                           title: "Pentru a interzice tuturor dispozitivelelor aflate la distanță să gestoneze routerul",
                           content: "Selectați dezactivarea Remote Management și apăsați Salvare."
                       } ,{                      
                           type: "step",
                           title: "Pentru a permite tuturor dispozitivelor aflate la distanță să gestioneze routerul.",
       content: [ 
                "1. Selectează Activare Management la Distanță pentru TOATE dispozitivele.",
                "2. Introdu Port Management Web (1024-65535 sau 80), prin care dispozitivele de la distanță vor avea acces la router.",
                "3. Apăsați Salvare."]
} ,{                      
                           type: "step",
                           title: "Pentru a permite unui dispozitiv specific aflat la distanță să gestioneze routerul.",
       content: [ 
                "1. Selectează Activare Management la Distanță pentru un anumit dispozitiv.",
                "2. Introdu Port Management Web (1024-65535 sau 80), prin care dispozitivul de la distanță va avea acces la router.",
                "3. Introdu adresa IP de Management la Distanță a dispozitivului de la distanță pentru gestionarea routerului.",
                "4. Apăsați Salvare."]
}]
}]
},
       ADMIN_REMOTE :{ 
               TITLE:"Management de la Distanță",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funcția de Management de la distanță vă permite să accesați și să configurați routerul de la distanță, prin Internet."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step_title",
                           content: "Configureaza Administrarea la distanță"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step1",
                           content: "1. Bifează căsuța pentru activarea funcției de Administrare la distanță."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step2",
                           content: "2. Utilizează porturile implicite HTTPS și HTTP."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step3",
                           content: "3. Selectează ce dispozitiv poate accesa routerul de la distanță:",
       children: [{                      
                           type: "name",
                           title: "Toate dispozitivele",
                           content: "Toate dispozitivele pot accesa routerul de la distanță."
                       } ,{                      
                           type: "name",
                           title: "Dispozitiv specificat",
                           content: "Tastează adresa IP a dispozitivul care poate accesa routerul de la distanță."
                       }]
} ,{                      
                           type: "paragraph",
                           id: "admin_remote_step4",
                           content: "4. Apăsați Salvare."
                       } ,{                      
                           type: "paragraph",
                           content: "Acum poți administra de la distanță routerul folosind adresa afișată în secțiunea Adresă Web pentru Administrare."
                       } ,{                      
                           type: "note",
                           title: "Notă",
                           content: "Dacă apare o fereastră de avertizare când accesezi de la distanță adresa de mai sus, apasă Trust (sau o opțiune similară) pentru a continua."
                       }]
},
       LED_CONTROL_SETTINGS :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "paragraph",
                           content: "Odată ce Modul noapte este activat, LED-urile vor fi oprite în timpul perioadei specificate zilnic, fără a afecta performanța router-ului."
                       } ,{                      
                           type: "step",
                           title: "Pentru a activa Modul de Noapte",
       content: [ 
                "1. Selectați Activare Mod Noapte.",
                "2. Specificați o perioadă de timp, atunci când LED-urile vor fi oprite.",
                "3. Apăsați Salvare."]
}]
},
       SYSTEM_LOG :{ 
               TITLE:"Jurnal de sistem",
               CONTENT: [{
                           type: "paragraph",
                           content: "Jurnal Sistem afișează cele mai recente activități ale router-ului. Tabelul este format din tipul, nivelul și conținutul de jurnal al sistemului care pot fi filtrate pentru a fi vizualizate. De asemenea, aveți posibilitatea să salvați jurnalele de sistem în computerul local sau să le trimiteți prin e-mail."
                       } ,{                      
                           type: "step",
                           title: "Pentru a salva jurnalele de sistem pe computerul local",
       content: [ 
                "1. Setați tipul și nivelul minim pentru a filtra jurnalele de sistem dorite. Lista de nivel este în ordine descrescătoare, cu cel mai scăzut nivel listat ultimul.",
                "2. Apăsați Salvare Jurnal pentru a salva fișierul jurnal de sistem în computerul local."]
} ,{                      
                           type: "step",
                           title: "Pentru a primi jurnalele de sistem prin e-mail",
       content: [ 
                "1. Setați tipul și nivelul pentru a filtra jurnalele de sistem dorite. Lista de nivel este în ordine descrescătoare, cu cel mai scăzut nivel listat ultimul.",
                "2. Apăsați Setări e-mail.",
                "3. În câmpul De La, introduceți o adresă de e-mail validă care să fie folosită pentru trimiterea e-mailurilor.",
                "4. În câmpul Către, introduceți o adresă de e-mail validă la care doriți să primiți jurnalele.",
                "5. Introduceți adresa serverului SMTP corespunzătoare email-ului de trimitere (De La).",
                "Notă: În cazul în care e-mailul de trimitere necesită autentificare, bifați caseta Activare Autentificare și introduceți numele său (adresa de e-mail) și parola.",
                "6. Dacă doriți să primiți jurnalele de sistem prin e-mail în mod regulat, selectați Activare Mail Automat și setați un anumit timp (în format de 24 de ore) sau un interval de timp.",
                "În cazul în care doriți să primiți imediat jurnalele curente ale sistemului, apăsați Trimite Jurnal pe Mail.",
                "7. Apăsați Salvare."]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"Statistici Trafic",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează utilizarea de trafic a unui dispozitiv în ultimele 10 minute sau cea a tuturor dispozitivelor din ultimele 10 minute / 24 ore / 7 zile."
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"Listă statistici trafic",
               CONTENT: [{
                           type: "paragraph",
                           content: "Lista este grupată în funcție de tipul de conexiune cu dispozitivele: prin cablu sau wireless."
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"Parametri de sistem",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wifi_title",
                           title: "Wireless 2.4GHz/5GHz",
                           content: "Această secțiune vă permite să configurați parametrii regulilor de transmitere a traficului în rețelele wireless. Este recomandat să păstrați setările implicite dacă nu sunteți sigur de cele corecte."
                       } ,{                      
                           type: "name",
                           title: "Beacon Interval",
                           content: "Introduceți o valoare între 40 și 1000 în milisecunde pentru a determina durata dintre pachetele beacon care sunt difuzate de router pentru a sincroniza rețeaua wireless. Valoarea implicită este de 100 de milisecunde."
                       } ,{                      
                           type: "name",
                           title: "RTS Threshold",
                           content: "Introduceți o valoare între 1 și 2346 pentru a determina dimensiunea pachetului de transmitere a datelor prin intermediul routerului. În mod implicit, valoarea (pragul) RTS Threshold (Request to Send) este 2346. Dacă dimensiunea pachetului este mai mare decât pragul prestabilit, routerul trimite cadre RTS unei anumite stații de recepție și negociază trimiterea unui cadru de date, sau pachetul va fi trimis imediat."
                       } ,{                      
                           type: "name",
                           title: "DTIM Interval",
                           content: "Această valoare determină DTIM (Delivery Traffic Indication Message). Introduceți o valoare cuprinsă între 1 și 15. Intervalul implicit este 1, indicând faptul că intervalul DTIM este identic cu Beacon Interval."
                       } ,{                      
                           type: "name",
                           title: "Group Key Update Period",
                           content: "Introduceți numărul de secunde (minim 30) pentru a controla intervalul de timp pentru reînnoirea automată a cheii de criptare. Implicit este 0, indicând fără reînnoire cheie."
                       } ,{                      
                           type: "name",
                           title: "Caracteristica WMM",
                           content: "Funcția WMM garantează trimiterea pachetelor ce au o prioritate ridicată, preferențial. Acesta este activată implicit și foarte recomandată."
                       } ,{                      
                           type: "name",
                           title: "Caracteristica Short GI",
                           content: "Această funcţie este activată în mod implicit și este recomandată pentru a creşte capacitatea de date prin reducerea timpului Guard Interval (GI)"
                       } ,{                      
                           type: "name",
                           title: "Funcția de Izolare AP",
                           content: "Dacă doriți să izolați și să restricționați toate dispozitivele wireless conectate la rețea să interacționeze între ele, dar să puteți accesa Internetul, bifați casuța Activare Izolare AP."
                       } ,{
                           type: "name",
                           title: "Reducerea Interferețelor USB 3.0",
                           content: "Apasă Activare pentru a reduce Interferențele USB 3.0."
                        }]
},
       SYSTEM_PARA_WDS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wds_title",
                            title: "WDS 2,4 GHz/5 GHz"
                       } ,{                      
                           type: "step",
                           title: "Pentru a activa WDS",
                           content: "Funcția WDS (Wireless Distribution System) permite extinderea acoperirii rețelei wireless printr-un bridging cu un AP (punct de acces), într-o rețea WLAN wireless (rețea locală)."
                       } ,{                      
                           type: "step",
       content: [ 
                "1. Selectați pentru a activa funcția de bridging WDS.",
                "2. Pentru a efectua bridging folosind funcția de scanare: apăsați Scanare pentru a scana și a afișa toate rețelele disponibile, apoi selectați rețeaua cu care doriți sa efectuați bridging. SSID-ul (numele de rețea), Adresa MAC și parametrii de securitate vor fi completați automat.",
                "Sau, pentru a efectua bridging manual: introduceți SSID (numele rețelei), Adresa MAC și modul de WDS al rețelei cu care urmează să se efectueze bridging. Selectați un tip de securitate și introduceți parametrii corespunzători, care ar trebui să fie identici cu cei ai rețelei inițiale.",
                "3. Apăsați Salvare."]
} ,{                      
                           type: "note",
                           title: "Notă",
                           content: "Dacă nu sunteți sigur de modul WDS, păstrați opțiunea implicită Auto."
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "WPS",
                           content: "WPS (Wi-Fi Protected Setup) vă permite să conectați cu ușurință dispozitivele WPS la router prin apăsarea butonului WPS. Bifați pentru a activa funcția WPS și apăsați Salvare."
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "NAT",
                           content: "Această funcție este activată în mod implicit. Este recomandat să păstrați setarea implicită. Dacă o dezactivați, este posibil să nu aveți acces la Internet."
                       } ,{                      
                           type: "note",
                           title: "Notă",
                           content: "Când funcția NAT este dezactivată, configurația din NAT Forwarding nu va avea efect."
                       } ,{                      
                           type: "name",
                           id: "sys_para_nat_boost",
                           title: "NAT Boost",
                           content: "Selectați caseta Activare NAT Boost și fapăsați Salvare pentru a vă asigura că router-ul are cel mai bun throughput."
                       } ,{                      
                           type: "note",
                           id: "sys_para_nat_boost_note",
                           title: "Notă",
                           content: "Dacă NAT Boost este activat, QoS și Statisticile de Trafic vor fi dezactivate automat."
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Setări de protecție DOS",
                           content: "Protecția DOS protejează router-ul împotriva atacurilor de tip ICMP-FLOOD, UDP-FLOOD și TCP-FLOOD."
                       } ,{                      
                           type: "name",
                           title: "Nivel Pachete ICMP-FLOOD",
                           content: "Introduceți o valoare între 5 și 7200 pentru a declanșa protecția ICMP-FLOOD imediat atunci când numărul de pachete ICMP depășește valoarea threshold prestabilită."
                       } ,{                      
                           type: "name",
                           title: "Nivel Pachete UDP-FLOOD",
                           content: "Introduceți o valoare între 5 și 7200 pachete UDP pentru a declanșa protecția UDP-FLOOD imediat atunci când numărul de pachete UDP depășește valoarea threshold prestabilită."
                       } ,{                      
                           type: "name",
                           title: "Nivel Pachete TCP-FLOOD",
                           content: "Introduceți o valoare între 5 și 7200 pachete TCP-SYN pentru a declanșa protecția TCP-SYN-FLOOD imediat atunci când numărul de pachete TCP depășește valoarea threshold prestabilită."
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Duplex",
                           content: "Selectați tipul de duplex din lista verticală și faceți clic pe Salvare."
                       }]
},
       SYSTEM_PARA_LED :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "name",
                           title: "Activare Mod Noapte",
                           content: "Selectaţi această casetă pentru a stinge LED-urile pe perioada Modului noapte, fără a afecta performanţa routerului."
                       } ,{                      
                           type: "name",
                           title: "Interval Mod Noapte",
                           content: "Specificaţi o perioadă de timp pentru care este valabil modul noapte."
                       } ,{                      
                           type: "paragraph",
                           content: "Apăsați butonul Salvare pentru a salva toate setările."
                       }]
},
       OPEN_VPN :{ 
               TITLE:"Open VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Cu serviciul OpenVPN, puteți utiliza Internetul pentru a accesa în siguranță rețeaua atunci când nu sunteți acasă. Pentru a utiliza serviciul VPN, trebuie să configurați serviciul DNS Dinamic (recomandat) sau să atribuiți o adresă IP statică pentru portul WAN al routerului. Ora sistemului ar trebui să fie sincronizată la Internet."
                       } ,{                      
                           type: "name",
                           title: "Tip Serviciu",
                           content: "Selectaţi protocolul de comunicaţii pentru serverul OpenVPN: UDP sau TCP."
                       } ,{                      
                           type: "name",
                           title: "Port serviciu",
                           content: "Introduceți un număr al portului de comunicare între 1024 și 65535. Portul acestui serviciu comun și implicit este 1194."
                       } ,{                      
                           type: "name",
                           title: "Subreţea/mască de reţea VPN",
                           content: "Introduceţi un interval de adrese IP ce pot fi acordate clienţilor de către serverul OpenVPN."
                       } ,{                      
                           type: "name",
                           title: "Acces client",
                           content: "Selectați tipul de acces pentru clientul OpenVPN.",
       children: [{                      
                           type: "name",
                           title: "Doar reţeaua de domiciliu",
                           content: "Clientul poate accesa doar rețeaua de domiciliu. Ruta implicită prestabilită a clientului nu va fi modificată."
                       } ,{                      
                           type: "name",
                           title: "Internet şi reţeaua de domiciliu",
                           content: "Clientul poate avea acces la rețeaua de domiciliu și la anumite site-uri de pe Internet sau servicii cu o limitare geografică, atunci când sunteți în afara țării. Ruta implicită a clientului va fi modificată."
                       }]
}]
},
       OPEN_VPN_CERTIFICATE :{ 
               TITLE:"Certificat",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Utilizaţi certificatul pentru informaţii şi pentru identificarea conexiunii VPN pentru computerul la distanţă.",
                "Faceţi clic pentru a genera un certificat nou."]
}]
},
       OPEN_VPN_CONF :{ 
               TITLE:"Fişier configuraţie",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Clienții remote vor folosi fișierul de configurare pentru a avea acces la routerul dumneavoastră.",
                "Faceţi clic pe acest buton pentru a salva fişierul de configurare OpenVPN ce trebuie utilizat la adăugarea unei noi conexiuni VPN."]
}]
},
       OPEN_VPN_GUIDE :{ 
               TITLE:"Ghid de instalare a clientului VPN",
               CONTENT: [{
                           type: "step",
                           title: "Pentru a conecta dispozitivele client la serverul OpenVPN:",
       content: [{                      
                           type: "paragraph",
                           content: "Înainte de a configura serverul OpenVPN, vă rugăm să configurați serviciul DNS Dinamic (recomandat) sau să atribuiți o adresă IP statică pentru portul WAN. Asigurați-vă că portul extern al setărilor NAT nu este portul de serviciu, iar ora sistemului este sincronizată la Internet."
                       },
                "1. Selectați Activare Server VPN.",
                "2. Configurați parametrii serverului OpenVPN (Tip Serviciu, Port Serviciu, Acces Client și Subnet/Netmask VPN) apoi apăsați Salvare.",
                "3. Apăsați Export pentru a salva fișierul de configurare.",
                "4. Pe dispozitivele client, descărcați și instalați utilitarul OpenVPN de la <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a>",
                "Platformele oficiale suportate includ Windows, Mac OSX și Linux.",
                "5. Lansați utilitarul OpenVPN și adăugați o nouă conexiune VPN folosind fișierul de configurare salvat pentru a conecta dispozitivul client la serverul VPN."]
} ,{                      
                           type: "note",
                           title: "Notă",
                           content: "Pentru a afla mai multe despre clienţi OpenVPN, vizitaţi <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
                       }]
},
       PPTP_VPN :{ 
               TITLE:"PPTP VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Cu serviciul PPTP VPN puteți utiliza Internetul pentru a avea acces ușor și rapid la rețea atunci când nu sunteți acasă. Acestă facilitate poate fi restricționată de anumiți ISP. Pentru a utiliza serviciul VPN, trebuie să configurați serviciul DNS Dinamic (recomandat) sau să atribuiți o adresă IP statică pentru portul WAN al routerului. Ora sistemului ar trebui să fie sincronizată la Internet."
                       } ,{                      
                           type: "name",
                           title: "Adresă IP client",
                           content: "Introduceţi un interval de adrese IP (maximum 10 clienţi) ce pot fi acordate clienţilor de către serverul PPTP VPN."
                       } ,{                      
                           type: "name",
                           title: "Nume utilizator şi parolă",
                           content: "Introduceţi numele de utilizator şi parola pentru a autentifica clienţii pe serverul PPTP VPN."
                       }]
},
       PPTP_VPN_GUIDE :{ 
               TITLE:"Ghid de instalare a clientului VPN",
               CONTENT: [{
                           type: "step",
                           title: "Pentru a conecta dispozitivele client la serverul VPN PPTP:",
       content: [{                      
                           type: "paragraph",
                           content: "Înainte de a configura serverul VPN PPTP, vă rugăm să configurați serviciul DNS Dinamic (recomandat) sau să atribuiți o adresă IP statică pentru portul WAN. Asigurați-vă că portul extern al setărilor NAT nu este 1723 și ora sistemului este sincronizată la Internet."
                       },
                "1. Selectați Activare Server VPN.",
                "2. Configurați parametrii de server PPTP VPN și apăsați Salvare.",
                "3. Pe dispozitivele client, creați o conexiune VPN PPTP. Platformele oficial suportate sunt Windows, Mac OSX, Linux, iOS și Android.",
                "4. Lansați programul PPTP VPN, adăugați o conexiune nouă și introduceți numele de domeniu al serviciului DDNS înregistrat sau adresa IP statică, care este atribuită portului WAN, pentru a conecta dispozitivul client la serverul VPN PPTP."]
}]
},
       VPN_CONNNECTION :{ 
               TITLE:"Conexiuni VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Această pagină afişează clienţii conectaţi în prezent la serverele OpenVPN şi PPTP VPN găzduite pe router."
                       }]
},
       BASIC_NETWORK :{ 
               TITLE:"Hartă Rețea",
               CONTENT: [{
                           type: "paragraph",
                           content: "În Harta Rețelei, puteți vizualiza starea curentă de conectare la rețea, informații wireless și informații despre dispozitivele conectate."
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează informațiile despre conexiunea la Internet."
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"Router",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează informații referitoare la rețeaua wireless și porturile LAN."
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"Clienți Fir/Wireless",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează numele rețelei (editabil), adresele IP și MAC atribuite clienților conectați la router."
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"Imprimantă",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează numele imprimantei conectate la router în portul USB."
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"Dispozitiv de Stocare USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează informațiile relevante despre dispozitivul de stocare USB conectat la router prin portul USB."
                       }]
},
       BASIC_SPEED_TEST :{ 
               TITLE:"Test Viteză",
               CONTENT: [{
                           type: "paragraph",
                           content: "Această funcție testează vitezele de încărcare/descărcare oferite de furnizorul de servicii Internet, oferind informații utile despre viteza conexiunii tale la Internet."
                       } ,{                      
                           type: "paragraph",
                           content: "Sfat: Pentru a obține rezultate cât mai exacte, este recomandat să închizi alte aplicații și programe."
                       } ,{                      
                           type: "paragraph",
                           content: "Istoric - Afișează rezultatele testelor de viteză anteriorare."
                       } ,{                      
                           type: "paragraph",
                           content: "Testează din nou - Apasă pentru a efectua un nou test de viteză."
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Apăsați Detectare Automată sau selectați manual tipul de conexiune la Internet. Apoi introduceți parametrii furnizați de ISP."
                       }]
},
       BASIC_WIRELESS_SMART_CONNECT :{ 
               TITLE:"Conectare inteligentă",
               CONTENT: [{
                           type: "paragraph",
                           content: "Selectaţi această casetă pentru a activa conectarea inteligentă. Această funcţie ajută dispozitivele să funcţioneze mai rapid, alocându-le cele mai bune benzi wireless, în funcţie de condiţiile curente, pentru a echilibra cererile din reţea."
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"Setări Wireless",
               CONTENT: [{
                           type: "paragraph",
                           content: "Puteți configura setările rețelei wireless (SSID, parola, etc.)"
                       } ,{                      
                           type: "name",
                           title: "Nume Rețea (SSID)",
                           content: "Este recomandat să modificați numele rețelei wireless (SSID). Acest câmp e sensibil la majuscule."
                       } ,{                      
                           type: "name",
                           title: "Ascunde SSID",
                           content: "Selectați dacă doriți să ascundeți numele rețelei 2.4GHz/5GHz (SSID) din lista de rețele wireless. Odată selectată, SSID-ul nu va mai fi emis și va trebui să vă conectați manual la rețea."
                       } ,{                      
                           type: "name",
                           title: "Parolă",
                           content: "Creați o parolă care să folosească între 8 și 63 caractere ASCII, sau între 8 și 64 caractere hexadecimale. Acest câmp este sensibil la majuscule."
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
               TITLE:"Dispozitiv de stocare USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Această caracteristică vă permite să partajați dispozitivele de stocare USB între diferiți clienți din rețeaua locală sau prin Internet."
                       } ,{                      
                           type: "title",
                           title: "Setări Dispozitiv",
                           content: "Secțiunea Setări Dispozitiv afișează informațiile de bază ale dispozitivului de stocare USB conectat prin portul USB. Un dispozitiv flash USB are, de obicei, doar un singur volum."
                       } ,{                      
                           type: "name",
                           title: "Scanare",
                           content: "De obicei, router-ul detectează automat orice dispozitiv nou atașat. În caz contrar, apăsați pe acest buton pentru a scana și reîmprospăta ecranul cu informațiile actualizate.",
       children: [{                      
                           type: "note",
                           title: "Notă",
                           content: "O zonă gri reprezintă un volum care este dezactivat. Aveți posibilitatea să apăsați pe respectiva zonă pentru a partaja volumul specific."
                       }]
} ,{                      
                           type: "name",
                           title: "Elimină",
                           content: "Apăsați pe acest buton pentru a demonta în siguranță dispozitivul de stocare USB, înainte de a îl deconecta fizic din portul USB.",
       children: [{                      
                           type: "note",
                           title: "Notă",
                           content: "Butonul Deconectare apare numai atunci când dispozitivul de stocare USB este conectat la router. În cazul în care volumul actual este utilizat, nu puteți deconecta."
                       }]
} ,{                      
                           type: "step",
                           title: "Pentru a configura un Server de fișiere",
       content: [ 
                "1. Atașați dispozitivul de stocare USB la portul USB direct sau cu ajutorul unui cablu USB. În cazul în care dispozitivul necesită alimentare externă, asigurați-vă că aceasta a fost conectată.",
                "2. Dispozitivul USB nou atașat trebuie să fie detectat în mod automat de către router și să fie afișat în secțiunea Setări Dispozitiv. Dacă nu este detectat, apăsați Scanare.",
                "Notă: Dacă apare pictograma de Share, o poți accesa pentru a dezactiva partițiile pe care nu dorești să le partajezi."]
}]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"Adresa de acces",
               CONTENT: [{
                           type: "name",
                           title: "Nume Server Rețea/Media",
                           content: "Afișează numele utilizat pentru a accesa dispozitivul de stocare USB conectat prin metoda Network Neighborhood sau Media Sharing. În mod implicit este TP-Share."
                       } ,{                      
                           type: "name",
                           title: "Metoda de Acces",
                           content: "Există 3 metode pentru a accesa dispozitivul de stocare USB partajat.",
       children: [{                      
                           type: "name",
                           title: "Rețea Locală",
                           content: "Selectați această opțiune pentru a permite utilizatorilor din rețea să acceseze conținutul partajat prin intermediul adresei afișate în coloana Adresă."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Selectați această opțiune pentru a activa funcția de server FTP, care permite clienților FTP și utilizatorilor rețelei să acceseze dispozitivul de stocare USB prin intermediul adresei FTP afișate în coloana Adresă."
                       } ,{                      
                           type: "name",
                           title: "FTP (prin Internet)",
                           content: "Selectați această opțiune pentru a permite clienților FTP și utilizatorilor să acceseze de la distanță, să descarce și să încarce fișiere pe dispozitivul de stocare USB partajat prin FTP pe Internet. Pentru a personaliza adresa de acces, apăsați Editare și configurați funcția DNS Dinamic pentru router. Pentru a schimba portul serverului de FTP, introduceți un nou număr de port și apăsați Salvare pentru a aplica modificările."
                       }]
} ,{                      
                           type: "name",
                           title: "Adresă",
                           content: "Afișează adresa utilizată pentru a accesa dispozitivul de stocare USB."
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "Afiseaza numărul portului utilizat pentru a accesa serverul FTP."
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"Conținut Partajare",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează directoarele pe care doriți să le partajați. Toate directoarele sunt partajate în mod implicit. Aveți posibilitatea să apăsați pe pictograma Editare pentru a personaliza directoarele partajate."
                       } ,{                      
                           type: "note",
                           title: "Notă",
                           content: "Pictograma Share apare în secțiunea Device Settings. Poți să apeși pe pictograma Share pentru a dezactiva partițiile pe care nu dorești să le partajezi."
                       }]
},
       FOLDER_SHARING :{ 
               TITLE:"Conținut Partajare și Securitate",
               CONTENT: [{
                           type: "name",
                           title: "Conținut Partajare",
                           content: "Afișează directoarele pe care doriți să le partajați. Toate directoarele sunt partajate în mod implicit. Aveți posibilitatea să apăsați pe pictograma Editare pentru a personaliza directoarele partajate.",
       children: [{                      
                           type: "note",
                           title: "Notă",
                           content: "Pictograma Share apare în secțiunea Device Settings. Poți să apeși pe pictograma Share pentru a dezactiva partițiile pe care nu dorești să le partajezi."
                       }]
} ,{                      
                           type: "name",
                           title: "Acces Autentificare",
       content: [ 
                "Comută între Activat pentru a activa autentificarea care impune utilizatorilor să introducă un nume de utilizator valid și o parolă pentru a avea acces la toate directoarele partajate. Accesarea ca administrator poate citi și modifica fișierele, în timp ce utilizatorul are doar drepturi de citire.",
                "Numele de utilizator trebuie să înceapă cu o literă sau caracterul _ și conține 1 până la 15 caractere folosind litere, cifre și caracterul _.",
                "Parola trebuie să conțină 1 până la 15 caractere folosind litere, cifre și caracterul _."]
} ,{                      
                           type: "name",
                           title: "Activare Partajare Documente Media",
                           content: "Când această funcție este activată, toate dispozitivele care acceptă DLNA din rețeaua locală pot accesa fișiere media din toate directoarele partajate. Nu va fi necesar utiizatorilor să introducă numele de utilizator sau parola, chiar dacă Acces Authentificare este activat."
                       }]
},
       BASIC_PRINT_SERVER :{ 
               TITLE:"Printer Server",
               CONTENT: [{
                           type: "name",
                           title: "Printer Server",
                           content: "Comutați pe Pornit pentru a activa funcția Printer Server."
                       } ,{                      
                           type: "name",
                           title: "Nume Imprimantă",
                           content: "Afișează numele imprimantei conectate la router."
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"Control Parental",
               CONTENT: [{
                           type: "paragraph",
                           content: "Cu setările de bază ale Controlului Parental, puteți restricționa accesul pentru anumite momente ale zilei (de exemplu, nu se permite accesul la Internet de la PC-ul copilului in timpul temelor)."
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"Dispozitive sub Control Parental",
               CONTENT: [{
                           type: "paragraph",
                           content: "Acest tabel afișează informațiile și setările dispozitivelor care sunt în prezent restricționate de Controlul Parental."
                       } ,{                      
                           type: "step",
                           title: "Pentru a restricționa un dispozitiv nou",
       content: [ 
                "1. Porniți Controlul Parental.",
                "2. Apăsați Adăugare.",
                "3. Apăsați Scanare pentru a alege un dispozitiv conectat în prezent din Lista de Acces Dispozitive; sau introduceți manual numele dispozitivului și adresa MAC pentru a adăuga un dispozitiv care nu este conectat.",
                "4. Apăsați pe pictograma de timp pentru a specifica o perioadă de timp în care se aplică restricția.",
                "5. Introduceți o scurtă descriere în câmpul Descriere. Acest câmp este opțional.",
                "6. Selectați Activare.",
                "7. Apăsați Salvare."]
} ,{                      
                           type: "note",
                           title: "Notă",
                           content: "În cazul în care doriți să dezactivați această intrare, apăsați pe pictograma bec."
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"Guest Network",
               CONTENT: [{
                           type: "paragraph",
                           content: "Această funcție vă permite să oferiți acces la Wi-Fi pentru oaspeți fără a dezvălui rețeaua principală."
                       } ,{                      
                           type: "name",
                           title: "Permiteți comunicarea între oaspeți",
                           content: "Selectați această casetă pentru a permite dispozitivelor wireless în rețeaua de oaspeți să comunice între ele prin metode cum ar fi network neighbors, Samba, Ping, și FTP."
                       } ,{                      
                           type: "name",
                           title: "Permiteți oaspeților să acceseze rețeaua locală",
                           content: "Selectați această casetă pentru a permite comunicarea dispozitivelor conectate wireless în Rețeaua Vizitatori cu dispozitivele conectate la porturile LAN ale routerului sau la rețeaua principală prin intermediul metodelor precum network neighbors, Samba, Ping, și FTP."
                       } ,{                      
                           type: "name",
                           title: "Activare Guest Network",
                           content: "Bifați această casetă pentru a activa funcția Guest Network."
                       } ,{                      
                           type: "name",
                           title: "Nume Rețea (SSID)",
                           content: "Puteți utiliza numele implicit al rețelei wireless Guest Network, sau puteți crea un nume nou (maximum 32 de caractere)."
                       } ,{                      
                           type: "name",
                           title: "Ascunde SSID",
                           content: "Bifați această casetă dacă doriți să ascundeți numele rețelei wireless Guest Network (SSID) în lista rețelelor wireless detectabile."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Interval Actualizare Parolă",
                           content: "Selectați intervalul de actualizare a parolei rețelei vizitatori."
                       } ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Parolă",
                           content: "Creaţi o parolă care să folosească între 8 şi 63 de caractere ASCII, sau între 8 şi 64 de caractere hexazecimale (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Parolă",
                           content: "Alegeți parola generată automat sau creați o parolă între 8 și 63 caractere ASCII sau între 8 și 64 caractere hexadecimale (0-9, a-f, A-F)"
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"TP-Link Cloud",
               CONTENT: [{
                           type: "paragraph",
                           content: "Serviciul TP-Link Cloud vă permite să monitorizați rețeaua dumneavoastră în timp real, de la distanță și să accesați sau să vă gestionați dispozitivele TP-Link prin Internet, de oriunde și oricând."
                       }]
},
       ACCOUNT_INFO :{ 
               TITLE:"Informații cont",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează informații despre ID-ul tău TP-Link. Poți edita informațiile contului folosind butonul Editare."
                       }]
},
       DEVICE_INFO :{ 
               TITLE:"Informații Dispozitiv",
               CONTENT: [{
                           type: "paragraph",
                           content: "Afișează informațiile dispozitivului, incluzând contul cloud care gestionează dispozitivul."
                       }]
},
       BOUND_ACCOUNT :{ 
               TITLE:"Asociere conturi",
               CONTENT: [{
                           type: "paragraph",
                           content: "Acest tabel afișează toate conturile cloud care sunt asociate cu dispozitivul în acest moment."
                       } ,{                      
                           type: "step",
                           title: "Pentru a asocia un cont de utilizator",
       content: [ 
                "1. Apasă Asociază.",
                "2. Introduceți emailul înregistrat pe care doriți să îl asociați.",
                "3. Apăsați Salvare."]
}]
},
       NEW_PARENTAL_CONTROL :{ 
               TITLE:"Control Parental",
               CONTENT: [{
                           type: "paragraph",
                           content: "Cu ajutorul filtrelor la nivel de vârstă, limitelor de acces și profilurilor de utilizator, Controlul Parental oferă acces personalizat și adecvat la Internet."
                       } ,{                      
                           type: "step",
                           title: "Pentru a aplica Controlul Parental unui dispozitiv nou",
       content: [ 
                "1. Apăsați Adaugă.",
                "2. Introdu un nume pentru acest profil și apasă \"+\" pentru a adăuga acest(e) dispozitiv(e) în acest profil.",
                "3. Selectează un nivel de filtrare și personalizează conținutul filtrului în funcție de nevoile tale. Poți introduce cuvinte cheie pentru a căuta în baza noastră de date siteuri web pe care dorești să le filtrezi. Alte siteuri web (URL-uri) pot fi introduse manual. <br/> Consultați următoarele explicații pentru diferitele categorii de filtrare: <p> Conținut pentru adulți - Siteuri web care prezintă conținut sexual, dăunător sau ilicit, inclusiv pornografie, utilizarea de substanțe, violență și discriminare. </ p><p> Jocuri de noroc - Siteuri web care promovează sau furnizează informații cu privire la jocurile de noroc, inclusiv siteuri web de pariuri </ p> <p> Educație Sexuală - Siteuri web pe care se discută despre sexualitate în mod informativ, inclusiv reproducerea, sexualitatea, sexul în condiții de siguranță și prevenirea nașterii, bolile cu transmitere sexuală și a modurilor de a face față unor traume de natură sexuală </ p><p> Comunicare online - Siteuri web care gazduiesc forme de comunicare cu alte persoane prin text, voce sau video, inclusiv e-mail, blog-uri, forumuri online, VoIP și servicii video chat </ p> < p> Rețele Sociale - Siteuri web care distribuie expresii personale sau de comunicare, care creează o legătură între oameni și activitatea lor personală bazată pe interese similare, cariere, trecut sau o cunoștință din viața reală </ p> <p> Plată pe navigare - Siteuri web care recompensează utilizatorii pentru a accesa anumite siteuri web, mesaje de e-mail sau anunțuri, clic pe link-uri sau pentru a răspunde la sondaje </ p> <p> Media - Siteuri web care oferă conținut audio gratuit, plătit sau de abonat și/sau conținut video, inclusiv servicii de streaming, programe TV sau descărcări de muzică </ p > <p> Descărcări - Siteuri web care furnizează sau oferă acces la partajarea și distribuirea de fișiere, inclusiv partajarea peer-to-peer, stocare de fișiere online și conținutul dispozitivului mobil (de exemplu, muzică și aplicații) </ p> <p> Jocuri - Siteuri web care furnizează sau dau acces la jocuri care pot fi descărcate sau găzduite pe Internet, inclusiv jocuri de noroc online, rețele de console de joc și jocuri pe browser </ p>",
                "4. Dacă dorești să limitezi timpul total pe care acest profil îl poate petrece online, activează și specifică limitele de timp. De asemenea, poți utiliza Perioada de somn pentru a configura o perioadă de timp, pe parcursul căreia dispozitivele din acest profil nu pot accesa Iinternetul.",
                "5. Faceți clic pe Salvare."]
} ,{                      
                           type: "step",
                           title: "Pentru a vizualiza detaliat istoricul accesului la Internet al profilului",
       content: [ 
                "1. În coloana Perspective, apsă pe butonul corespunzător Perspective.",
                "2. Dacă vrei să vezi mai multe înregistrări, apasă pe butonul Istoric <span class=\"ptl-ctr-help-icon history\"></span>.",
                "3. Poți bloca sau debloca siteuri web prin apăsarea pe <span class=\"ptl-ctr-help-icon block\"></span> sau <span class=\"ptl-ctr-help-icon unblock\"></span>."]
} ,{                      
                           type: "step",
                           title: "Pentru a dezactiva sau activa imediat accesul la Internet",
       content: [ 
                "În coloana de acces la Internet, apasă pe <span class=\"ptl-ctr-help-icon stop\"></span> pentru a opri accesul la Internet pe dispozitivele profilului corespunzător și apasă pe <span class=\"ptl-ctr-help-icon enable\"></span> pentru a activa din nou accesul."]
}]
},
       BASIC_QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funcția QoS (Quality of Service) prioritizează activități și dispozitive online pentru a garanta o conexiune la rețea mai rapidă atunci când ai nevoie mai mult."
                       } ,{                      
                           type: "paragraph",
                           content: "Selectează Prioritate aplicație pentru a acorda prioritate pentru activități online și selectează Prioritate dispozitiv pentru a acorda prioritate pentru dispozitive."
                       }]
},
       BASIC_APPLICATION_PRIORITY :{ 
               TITLE:"Prioritate aplicație",
               CONTENT: [{
                           type: "paragraph",
                           content: "Alege activitatea online pentru care dorești să acorzi prioritate sau apasă pe Custom pentru a configura nivelul de prioritate al fiecărei activități online."
                       }]
},
       BASIC_DEVICE_PRIORITY :{ 
               TITLE:"Prioritate dispozitiv",
               CONTENT: [{
                           type: "paragraph",
                           content: "Alege dispozitivul/dispozitivele pentru care dorești să acorzi prioritate și cât timp vor avea prioritate."
                       } ,{                      
                           type: "step",
                           title: "Pentru a acorda prioritate unui dispozitiv",
       content: [ 
                "1. Găsește în listă dispozitivul caruia dorești să îi acorzi prioritate și activează funcția Prioritate.",
                "2. Selectează cât timp dispozitivul va avea prioritate în coloana de temporizare."]
}]
},
       ANTI_VIRUS :{ 
               TITLE:"Antivirus",
               CONTENT: [{
                           type: "paragraph",
                           content: "Cu frecvente scanări de rețea, de detectare a siteurilor web rău intenționate și izolarea dispozitivului infectat, funcția Antivirus păstrează informațiile personale în siguranță. De asemenea, poți verifica modul în care este protejată rețeaua, și dacă au existat atacuri asupra rețelei."
                       } ,{                      
                           type: "paragraph",
                           content: "Istoric - Înregistrează dispozitivele care au fost protejate de Antivirus, sursa și clasificarea atacurilor."
                       } ,{                      
                           type: "paragraph",
                           content: "Activează tot - Pentru a activa toate Tipurile de protecție în cazul în care unele protecții nu sunt activate."
                       } ,{                      
                           type: "paragraph",
                           content: "Tipuri de protecție - Activați Tipuri de protecție analizând explicațiile. Se recomandă activarea tuturor Tipurilor de protecție."
                       }]
},
       APPLICATION_PRIORITY :{ 
               TITLE:"Prioritate aplicație",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funcția Prioritate aplicație prioritizează activități online pentru a garanta o conexiune la rețea mai rapidă atunci când ai nevoie mai mult. Alege activitatea online pe care dorești să o prioritizezi sau apasă pe Personalizare pentru a configura nivelul de prioritate al fiecărei activități online."
                       }]
},
       DEVICE_PRIORITY :{ 
               TITLE:"Prioritate dispozitiv",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funcția Prioritate dispozitiv prioritizează dispozitive pentru a garanta o conexiune la rețea mai rapidă atunci când ai nevoie mai mult. Alege dispozitivul/dispozitivele cărora dorești să acorzi prioritate și cât timp vor avea prioritate."
                       } ,{                      
                           type: "step",
                           title: "Pentru a acorda prioritate unui dispozitiv",
       content: [ 
                "1. Găsește în listă dispozitivul caruia dorești să îi acorzi prioritate și activează funcția Prioritate.",
                "2. Selectează cât timp dispozitivul va avea prioritate în coloana de temporizare."]
}]
},
       FIREWALL :{ 
               TITLE:"Firewall",
               CONTENT: [{
                           type: "paragraph",
                           content: "SPI (Stateful Packet Inspection) Firewall previne atacurile cibernetice și validează traficul care trece prin router bazat pe protocolul specific. În mod implicit, această caracteristică este activată."
                       } ,{                      
                           type: "name",
                           title: "Activează Firewall SPI",
                           content: "Nu dezactiva Firewall SPI decât dacă este necesar."
                       } ,{                      
                           type: "name",
                           title: "Permite pachete Ping din Portul WAN/Permite pachete Ping din Portul LAN",
                           content: "Activează pentru a permite pachete ping de pe portul WAN/LAN. Se recomandă pastrarea setărilor implicite."
                       }]
},
       "" :     ""
    };
})(jQuery);
