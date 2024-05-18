(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazia sa relevantné informácie o (internetovom) pripojení Wide Area Network."
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"Bezdrôtové pripojenie 2,4 GHz / 5 GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazia sa relevantné informácie o bezdrôtovej sieti."
                       }]
},
       STATUS_LAN :{ 
               TITLE:"Lokálna sieť",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazia sa informácie o portoch Ethernet (LAN)."
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"Hosťovská sieť 2,4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazia sa informácie o bezdrôtových sieťach pre hostí."
                       }]
},
       STATUS_USB :{ 
               TITLE:"Zariadenia USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazia sa informácie o aktuálnych úložných zariadeniach USB a/alebo tlačiarňach, ktoré sú pripojené k smerovaču cez porty USB."
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"Výkon",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazí sa aktuálny výkon smerovača."
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"Klienti káblovej siete",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazia sa informácie o káblových zariadeniach, ktoré sú pripojené k sieti."
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"Klienti bezdrôtovej siete",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazia sa informácie o bezdrôtových zariadeniach, ktoré sú pripojené k sieti."
                       }]
},
       INTERNET_TITLE :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Nakonfigurujte parametre IPv4 a vyberte príslušnú metódu klonovania MAC podľa potreby."
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"Protokol IPv4",
               CONTENT: [{
                           type: "paragraph",
                           content: "Vyberte typ internetového pripojenia a zadajte zodpovedajúce parametre."
                       } ,{                      
                           type: "title",
                            title: "Typ pripojenia do internetu: Dynamická IP adresa"
                       } ,{                      
                           type: "paragraph",
                           content: "Vyberte tento typ, ak vám poskytovateľ internetových služieb poskytol pripojenie k serveru DHCP."
                       } ,{                      
                           type: "name",
                           title: "IP adresa/Maska podsiete/Predvolená brána/Primárny DNS/Sekundárny DNS",
                           content: "Tieto parametre sú automaticky priradené serverom DHCP od poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Obnoviť",
                           content: "Kliknite na toto tlačidlo, ak chcete získať nové parametre IP adresy zo servera DHCP."
                       } ,{                      
                           type: "name",
                           title: "Uvoľniť",
                           content: "Kliknite na toto tlačidlo, ak chcete uvoľniť všetky IP adresy, ktoré priradil server DHCP."
                       } ,{                      
                           type: "name",
                           title: "Adresa DNS",
                           content: "Ak poskytovateľ internetu (ISP) poskytne jednu alebo dve adresy DNS, začiarknite toto políčko a zadajte primárnu a sekundárnu adresu DNS do príslušných vstupných polí; inak adresy priradí dynamicky poskytovateľ internetu (ISP)."
                       } ,{                      
                           type: "name",
                           title: "Veľkosť MTU",
                           content: "Predvolená a typická veľkosť MTU (Maximálna prenosová jednotka) pre väčšinu sietí ethernet je 1500 Bytes (1500 bajtov). Zmena predvolenej veľkosti MTU sa neodporúča, ak to nevyžaduje poskytovateľ internetu (ISP)."
                       } ,{                      
                           type: "name",
                           title: "Názov hostiteľa",
                           content: "Do tohto poľa zadajte hodnotu na určenie názvu hostiteľa smerovača."
                       } ,{                      
                           type: "name",
                           title: "Získať IP pomocou Unicast DHCP",
                           content: "Označte toto začiarkavacie políčko, ak server DHCP vášho poskytovateľa internetových služieb nepodporuje aplikácie vysielania a IP adresu nemôžete získať dynamicky."
                       } ,{                      
                           type: "title",
                            title: "Typ pripojenia do internetu: Statická IP"
                       } ,{                      
                           type: "paragraph",
                           content: "Vyberte tento typ, ak máte konkrétnu (fixnú) IP adresu, masku podsiete, bránu a parametre DNS, ktoré vám poskytol poskytovateľ internetu (ISP)."
                       } ,{                      
                           type: "name",
                           title: "IP adresa/Maska podsiete/Predvolená brána/Primárny DNS/Sekundárny DNS",
                           content: "Zadajte informácie poskytnuté vaším poskytovateľom internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Veľkosť MTU",
                           content: "Predvolená a typická veľkosť MTU (Maximálna prenosová jednotka) pre väčšinu sietí ethernet je 1500 Bytes (1500 bajtov). Zmena predvolenej veľkosti MTU sa neodporúča, ak to nevyžaduje poskytovateľ internetu (ISP)."
                       } ,{                      
                           type: "title",
                            title: "Typ internetového pripojenia: Kábel BigPond"
                       } ,{                      
                           type: "paragraph",
                           content: "Vyberte tento typ, ak váš poskytovateľ internetových služieb poskytuje pripojenie káblom BigPond."
                       } ,{                      
                           type: "name",
                           title: "Meno/heslo",
                           content: "Zadajte používateľské meno a heslo poskytnuté vaším poskytovateľom internetových služieb. V týchto poliach sa rozlišujú veľké a malé písmená."
                       } ,{                      
                           type: "name",
                           title: "Over. Server",
                           content: "Zadajte IP adresu alebo názov hostiteľa overovacieho servera."
                       } ,{                      
                           type: "name",
                           title: "Over. Doména",
                           content: "Zadajte príponu názvu domény servera (v závislosti od lokality). Napríklad, nsw.bigpond.net.au pre NSW/ACT, vic.bigpond.net.au pre VIC/TAS/WA/SA/NT alebo qld.bigpond.net.au pre QLD."
                       } ,{                      
                           type: "name",
                           title: "Veľkosť MTU",
                           content: "Predvolená a typická veľkosť MTU (Maximálna prenosová jednotka) pre väčšinu sietí ethernet je 1500 Bytes (1500 bajtov). Zmena predvolenej veľkosti MTU sa neodporúča, ak to nevyžaduje poskytovateľ internetu (ISP)."
                       } ,{                      
                           type: "name",
                           title: "Režim pripojenia",
                           content: "Vyberte príslušný režim pripojenia, ktorý určuje, ako sa pripojiť k internetu.",
       children: [{                      
                           type: "name",
                           title: "Automaticky- Pri tejto možnosti sa podporuje viacnásobná implementácia normy WPA (Wi-Fi Protected Access",
                           content: "V tomto režime sa internetové pripojenie po každom odpojení automaticky znova obnoví."
                       } ,{                      
                           type: "name",
                           title: "Na požiadanie",
                           content: "V tomto režime sa internetové pripojenie automaticky preruší po uplynutí určeného času nečinnosti (Maximálny čas nečinnosti). Pripojenie sa obnoví, keď sa pokúsite znova pristúpiť k internetu."
                       } ,{                      
                           type: "name",
                           title: "Ručne",
                           content: "V tomto režime sa internetové pripojenie ovláda ručne, kliknutím na tlačidlo Pripojiť alebo Odpojiť. V tomto režime je podporovaná aj funkcia Maximálny čas nečinnosti. Zadajte maximálny čas (v minútach), počas ktorého môže byť internetové pripojenie v nečinnosti, kým sa ukončí, do poľa Maximálny čas nečinnosti. Predvolená hodnota je 15 minút. Ak chcete, aby bolo internetové pripojenie stále aktívne, zadajte 0 (nula)."
                       }]
} ,{                      
                           type: "title",
                            title: "Typ internetového pripojenia: PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "Vyberte tento typ, ak používate službu DSL (Linka predplatiteľa digitálnych služieb) a váš ISP vám poskytol meno a heslo."
                       } ,{                      
                           type: "name",
                           title: "Meno/heslo",
                           content: "Zadajte používateľské meno a heslo poskytnuté vaším poskytovateľom internetových služieb. V týchto poliach sa rozlišujú veľké a malé písmená."
                       } ,{                      
                           type: "name",
                           title: "IP adresa/Primárny DNS/Sekundárny DNS",
                           content: "Tieto parametre sú automaticky priradené serverom DHCP od poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Sekundárne pripojenie (žiadne, dynamická IP, statická IP)",
       children: [{                      
                           type: "name",
                           title: "Žiadne",
                           content: "Vyberte, ak nemáte žiadne sekundárne pripojenie."
                       } ,{                      
                           type: "name",
                           title: "Dynamická IP adresa",
                           content: "Vyberte, ak vám IP adresu a masku podsiete automaticky priradí ISP.",
       children: [{                      
                           type: "name",
                           title: "Obnoviť",
                           content: "Kliknutím na toto tlačidlo obnovíte parametre IP od vášho poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Uvoľniť",
                           content: "Kliknutím na toto tlačidlo uvoľníte priradené parametre IP."
                       }]
} ,{                      
                           type: "name",
                           title: "Statická IP",
                           content: "Vyberte túto možnosť, ak poskytovateľ internetových služieb uviedol IP adresu a masku podsiete a zadajte tieto informácie do príslušných polí."
                       }]
} ,{                      
                           type: "name",
                           title: "Veľkosť MTU",
                           content: "Typická veľkosť MTU (Maximálna prenosová jednotka) pre siete ethernet je 1480 bajtov.",
       children: [{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Vo vzácnych prípadoch vás poskytovateľ internetových služieb môže požiadať z dôvodu lepšieho fungovania siete o nastavenie veľkosti MTU. Túto hodnotu by ste nemali meniť, ak to nie je bezpodmienečne nutné."
                       }]
} ,{                      
                           type: "name",
                           title: "Názov služby/Názov koncentrátora prístupu",
                           content: "Predvolená možnosť je ponechať názov služby a názov koncentrátora prístupu (AC) prázdne. Tieto polia by sa nemali konfigurovať, ak to nevyžaduje poskytovateľ internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Detekcia online intervalu",
                           content: "Zadajte hodnotu časového intervalu medzi 0 a 120 (v sekundách), počas ktorých smerovač zistí koncentrátora prístupu online pri každom intervale. Predvolená hodnota je 10."
                       } ,{                      
                           type: "name",
                           title: "IP adresa",
                           content: "Ak poskytovateľ internetových služieb uvedie špecifickú (pevnú) IP adresu, vyberte možnosť Použiť nasledujúcu IP adresu a zadajte IP adresu do poľa. V opačnom prípade vyberte možnosť Získať dynamicky od poskytovateľa internetových služieb a získajte serverom priradenú IP adresu automaticky."
                       } ,{                      
                           type: "name",
                           title: "Adresa DNS",
                           content: "Ak poskytovateľ internetových služieb poskytuje špecifické (pevné) IP adresy DNS, vyberte možnosť Použiť nasledujúce adresy DNS a zadajte adresu (adresy) do poľa primárneho a následne sekundárneho DNS. V opačnom prípade vyberte možnosť Získať dynamicky od poskytovateľa internetových služieb a získajte serverom priradenú IP adresu DNS automaticky."
                       } ,{                      
                           type: "name",
                           title: "Režim pripojenia",
                           content: "Vyberte príslušný režim pripojenia, ktorý určuje, ako sa pripojiť k internetu.",
       children: [{                      
                           type: "name",
                           title: "Automaticky- Pri tejto možnosti sa podporuje viacnásobná implementácia normy WPA (Wi-Fi Protected Access",
                           content: "V tomto režime sa internetové pripojenie po každom odpojení automaticky znova obnoví."
                       } ,{                      
                           type: "name",
                           title: "Na požiadanie",
                           content: "V tomto režime sa internetové pripojenie automaticky preruší po uplynutí určeného času nečinnosti (Maximálny čas nečinnosti). Pripojenie sa obnoví, keď sa pokúsite znova pristúpiť k internetu."
                       } ,{                      
                           type: "name",
                           title: "V závislosti od času",
                           content: "V tomto režime sa internetové pripojenie uskutočňuje iba v určitom časovom rámci. Ak vyberiete túto možnosť, zadajte čas začiatku a čas ukončenia; obidva vo formáte HH:MM."
                       } ,{                      
                           type: "name",
                           title: "Ručne",
                           content: "V tomto režime sa internetové pripojenie ovláda ručne, kliknutím na tlačidlo Pripojiť alebo Odpojiť. V tomto režime je podporovaná aj funkcia Maximálny čas nečinnosti. Zadajte maximálny čas (v minútach), počas ktorého môže byť internetové pripojenie v nečinnosti, kým sa ukončí, do poľa Maximálny čas nečinnosti. Predvolená hodnota je 15 minút. Ak chcete, aby bolo internetové pripojenie stále aktívne, zadajte 0 (nula)."
                       } ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Režim pripojenia V závislosti od času sa prejaví po nakonfigurovaní stránky Systémový čas v ponuke Pokročilé → Systémové nástroje → Časové nastavenia."
                       }]
} ,{                      
                           type: "title",
                            title: "Typ internetového pripojenia: L2TP/PPTP"
                       } ,{                      
                           type: "paragraph",
                           content: "Vyberte tento typ, ak sa pripájate k VPN serveru L2TP/PPTP VPN a máte meno, heslo a IP adresu/názov domény servera od ISP."
                       } ,{                      
                           type: "name",
                           title: "Meno/heslo",
                           content: "Zadajte používateľské meno a heslo poskytnuté vaším poskytovateľom internetových služieb. V týchto poliach sa rozlišujú veľké a malé písmená."
                       } ,{                      
                           type: "name",
                           title: "IP adresa/Primárny DNS/Sekundárny DNS",
                           content: "Tieto parametre budú automaticky priradené serverom DHCP od poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Sekundárne pripojenie (Dynamická IP alebo statická IP)",
       children: [{                      
                           type: "name",
                           title: "Dynamická IP adresa",
                           content: "Vyberte, ak vám IP adresu a masku podsiete automaticky priradí ISP."
                       } ,{                      
                           type: "name",
                           title: "Statická IP",
                           content: "Vyberte túto možnosť, ak poskytovateľ internetových služieb uviedol IP adresu, masku podsiete, bránu a adresy DNS a zadajte tieto informácie do príslušných polí."
                       }]
} ,{                      
                           type: "name",
                           title: "IP Servera VPN/Názov domény",
                           content: "Zadajte IP adresu alebo názov domény servera VPN, ktoré vám poskytol váš poskytovateľ internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Veľkosť MTU",
                           content: "Predvolená a typická veľkosť MTU (Maximálna prenosová jednotka) pre väčšinu sietí ethernet je 1460 bajtov pre L2TP a 1420 bajtov pre PPTP. Zmena predvolenej veľkosti MTU sa neodporúča, ak to nevyžaduje poskytovateľ internetu (ISP)."
                       } ,{                      
                           type: "name",
                           title: "Režim pripojenia",
                           content: "Vyberte príslušný režim pripojenia, ktorý určuje, ako sa pripojiť k internetu.",
       children: [{                      
                           type: "name",
                           title: "Automaticky- Pri tejto možnosti sa podporuje viacnásobná implementácia normy WPA (Wi-Fi Protected Access",
                           content: "V tomto režime sa internetové pripojenie po každom odpojení automaticky znova obnoví."
                       } ,{                      
                           type: "name",
                           title: "Na požiadanie",
                           content: "V tomto režime sa internetové pripojenie automaticky preruší po uplynutí určeného času nečinnosti (Maximálny čas nečinnosti). Pripojenie sa obnoví, keď sa pokúsite znova pristúpiť k internetu."
                       } ,{                      
                           type: "name",
                           title: "Ručne",
                           content: "V tomto režime sa internetové pripojenie ovláda ručne, kliknutím na tlačidlo Pripojiť alebo Odpojiť. V tomto režime je podporovaná aj funkcia Maximálny čas nečinnosti. Zadajte maximálny čas (v minútach), počas ktorého môže byť internetové pripojenie v nečinnosti, kým sa ukončí, do poľa Maximálny čas nečinnosti. Predvolená hodnota je 15 minút. Ak chcete, aby bolo internetové pripojenie stále aktívne, zadajte 0 (nula)."
                       }]
}]
},
       INTERNET_MAC :{ 
               TITLE:"Klonovanie MAC adries",
               CONTENT: [{
                           type: "paragraph",
                           content: "Vyberte vhodnú metódu klonovania MAC podľa potreby."
                       } ,{                      
                           type: "name",
                           title: "NEklonovať MAC adresu",
                           content: "V prípade, že ISP neviaže priradenú IP adresu s MAC adresou, nemeňte predvolenú MAC adresu smerovača."
                       } ,{                      
                           type: "name",
                           title: "Klonovať MAC adresu tohto počítača",
                           content: "Vyberte a týmto skopírujte aktuálnu MAC adresu počítača, ktorý je pripojený k smerovaču, v prípade, že ISP viaže priradenú IP adresu s MAC adresou počítača."
                       } ,{                      
                           type: "name",
                           title: "Použiť vlastnú MAC adresu",
                           content: "Zadajte MAC adresu ručne, v prípade, že ISP viaže priradenú IP adresu k určitej MAC adrese."
                       }]
},
       INTERNET_WAN_AGGREGATION :{ 
               TITLE:"Agregácia siete WAN",
               CONTENT: [{
                           type: "paragraph",
                           id: "internet_wan_aggregation_detail",
                           content: "Agregácia siete WAN slúži na transformovanie portu LAN1 na ďalší port WAN a vytvorenie samostatnej údajovej trasy s veľkou šírkou pásma. Objavte rýchlejší internet od poskytovateľov ISP, ktorí ponúkajú rýchlosti šírky pásma nad 1 Gb/s a nenechajte sa viac obmedzovať kapacitou sieťového hardvéru."
                       } ,{                      
                           type: "note",
                           id: "internet_wan_aggregation_note",
                           title: "Poznámka",
                           content: "Pred aktiváciou tejto funkcie overte, čo poskytovateľ ISP podporuje funkciu agregácie siete WAN a či má váš modem dva porty WAN."
                       } ,{                      
                           type: "step",
                           title: "Pre aplikáciu agregácie WAN",
       content: [ 
                "1.	Aktivujte funkciu agregácie siete WAN jej zapnutím.",
                "2.	Kliknite na tlačidlo Uložiť.",
                "3.	Použitím dvoch ethernetových káblov prepojte port WAN a port LAN1 smerovača s dvoma portami WAN modemu."]
}]
},
       LAN_IPV4 :{ 
               TITLE:"Lokálna sieť",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazí sa adresa MAC, IP adresa a maska podsiete smerovača."
                       } ,{                      
                           type: "name",
                           title: "MAC adresa",
                           content: "Unikátna fyzická adresa priradená ethernetovému portu smerovača (LAN)."
                       } ,{                      
                           type: "name",
                           title: "IP adresa",
                           content: "Zobrazí sa predvolená IP adresa smerovača, ktorá sa používa pri prihlásení na webovej stránke správy smerovača. Môžete ju zmeniť."
                       } ,{                      
                           type: "name",
                           title: "Maska podsiete",
                           content: "Vyberte priradený identifikátor, ktorý používa port LAN, a nasmerujte vnútorný a vonkajší prenos alebo zadajte novú masku podsiete."
                       } ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Ak nová IP adresa LAN nie je v rovnakej podsieti ako stará, fond IP adries na serveri DHCP sa nakonfiguruje automaticky; avšak virtuálny server a hostiteľ DMZ sa neuplatnia, kým neprebehne ich opätovná konfigurácia."
                       }]
},
       LINK_AGG :{ 
               TITLE:"Agregácia linky",
               CONTENT: [{
                           type: "paragraph",
                           content: "Agregácia liniek spája dva porty dohromady na vytvorenie jedného spoja s vysokou dátovou priepustnosťou, tým sa dosiahne vyšších rýchlostí a vytvára stabilnejšie sieť."
                       } ,{                      
                           type: "step",
                           id: "link_agg_step_help",
                           title: "Pro zapnutí agregace linek:",
       content: [ 
                "1. Zapnite funkciu agregácie liniek",
                "2. Vyberte dva porty pre agregáciu liniek.",
                "3. Kliknite na Uložiť."]
}]
},
       IPTV :{ 
               TITLE:"IPTV",
               CONTENT: [{
                           type: "paragraph",
                           content: "IPTV (Internet Protocol Television) je systém, ktorého prostredníctvom sa poskytujú televízne služby v rámci balíka internetového protokolu cez sieť prepnutú na pakety, ako je napríklad sieť LAN alebo internet."
                       } ,{                      
                           type: "name",
                           id: "igmp-snooping",
                           title: "IGMP Snooping",
                           content: "Funkcia IGMP Snooping (Internet Group Management Protocol) umožňuje smerovaču poslať rozosielané toky len do tých portov, ktoré si ich vyžiadali."
                       } ,{                      
                           type: "name",
                           title: "Proxy IGMP",
                           content: "Výberom zapnite funkciu IGMP Proxy, ak je služba IPTV poskytnutá poskytovateľom internetových služieb založená na technológii IGMP."
                       } ,{                      
                           type: "name",
                           title: "Verzia IGMP",
                           content: "Vyberte verziu IGMP podľa svojho poskytovateľ internetových služieb ISP. Predvolená verzia IGMP je V2."
                       } ,{                      
                           type: "name",
                           id: "igmp-wifi",
                           title: "Wireless Multicast Forwarding",
                           content: "Výberom zapnite funkciu Bezdrôtové Multicast rozosielanie, ktorá umožňuje postúpenie rozosielaných paketov do bezdrôtovej siete."
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "Výberom zapnite funkciu IPTV, ak služba IPTV poskytnutá poskytovateľom internetových služieb nie je založená na technológii IGMP."
                       } ,{                      
                           type: "name",
                           title: "ISP profil",
                           content: "Na dokončenie konfigurácie vyberte príslušný profil ISP (poskytovateľ internetových služieb). K dispozícii sú tri typy profilov:",
       children: [{                      
                           type: "name",
                           title: "Názov poskytovateľa ISP v danej krajine",
                           content: "ISP profily s predvolenými nastaveniami sú vo formáte „Krajina-Názov ISP“. V rozbaľovacom zozname jednoducho vyhľadajte svojho poskytovateľa ISP."
                       } ,{                      
                           type: "name",
                           id: "iptv_bridge_child_1to4",
                           title: "Most",
                           content: "Ak váš poskytovateľ internetových služieb nie je v zozname a na nastavenie IPTV sa nevyžadujú žiadne ďalšie parametre, môžete jednoducho zvoliť tento profil a špecifikovať port LAN určený pre IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Určte aký typ údajov LAN portu sa bude vysielať. Napríklad, ak je pre LAN1 zvolená IPTV, budú sa vysielať len dáta IPTV a Set-top-box by ste mali pripojiť k LAN1."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_2to5",
                           title: "Most",
                           content: "Ak váš poskytovateľ internetových služieb nie je v zozname a na nastavenie IPTV sa nevyžadujú žiadne ďalšie parametre, môžete jednoducho zvoliť tento profil a špecifikovať port LAN určený pre IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Určite, aký druh údajov bude port LAN prenášať. Ak je napríklad pre port LAN2 vybratá možnosť IPTV, tento port bude prenášať iba údaje IPTV a k portu LAN2 by ste mali pripojiť zariadenie na príjem televízneho signálu (set-top box)."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_5to8",
                           title: "Most",
                           content: "Ak váš poskytovateľ internetových služieb nie je v zozname a na nastavenie IPTV sa nevyžadujú žiadne ďalšie parametre, môžete jednoducho zvoliť tento profil a špecifikovať port LAN určený pre IPTV.",
       children: [{                      
                           type: "name",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Určite, aký druh údajov bude port LAN prenášať. Ak je napríklad pre port LAN5 vybratá možnosť IPTV, tento port bude prenášať iba údaje IPTV a k portu LAN5 by ste mali pripojiť zariadenie na príjem televízneho signálu (set-top box)."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_1to4",
                           title: "Vlastné",
                           content: "Ak váš poskytovateľ internetových služieb nie je v zozname, ale poskytuje vám niektoré potrebné služby, ako je internet/VoIP/IPTV VLAN ID a Priority, vyberte tento profil.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV Identifikátor/Priorit VLAN",
                           content: "Nakonfigurujte identifikátory a priority VLAN podľa pokynov vášho poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Značka 802.1Q",
                           content: "Vyberte, či označovať pakety internetu značkou 802.1Q."
                       } ,{                      
                           type: "name",
                           title: "ID/Priorita funkcie IPTV Multicast VLAN",
                           content: "Funkciu IPTV multicast môžete zapínať podľa potreby a identifikátor a prioritu VLAN nakonfigurovať podľa vášho poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Určte aký typ údajov LAN portu sa bude vysielať. Napríklad, ak je pre LAN1 zvolená IPTV, budú sa vysielať len dáta IPTV a Set-top-box by ste mali pripojiť k LAN1."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_2to5",
                           title: "Vlastné",
                           content: "Ak váš poskytovateľ internetových služieb nie je v zozname, ale poskytuje vám niektoré potrebné služby, ako je internet/VoIP/IPTV VLAN ID a Priority, vyberte tento profil.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV Identifikátor/Priorit VLAN",
                           content: "Nakonfigurujte identifikátory a priority VLAN podľa pokynov vášho poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Značka 802.1Q",
                           content: "Vyberte, či označovať pakety internetu značkou 802.1Q."
                       } ,{                      
                           type: "name",
                           title: "ID/Priorita funkcie IPTV Multicast VLAN",
                           content: "Funkciu IPTV multicast môžete zapínať podľa potreby a identifikátor a prioritu VLAN nakonfigurovať podľa vášho poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Určite, aký druh údajov bude port LAN prenášať. Ak je napríklad pre port LAN2 vybratá možnosť IPTV, tento port bude prenášať iba údaje IPTV a k portu LAN2 by ste mali pripojiť zariadenie na príjem televízneho signálu (set-top box)."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_5to8",
                           title: "Vlastné",
                           content: "Ak váš poskytovateľ internetových služieb nie je v zozname, ale poskytuje vám niektoré potrebné služby, ako je internet/VoIP/IPTV VLAN ID a Priority, vyberte tento profil.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV Identifikátor/Priorit VLAN",
                           content: "Nakonfigurujte identifikátory a priority VLAN podľa pokynov vášho poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Značka 802.1Q",
                           content: "Vyberte, či označovať pakety internetu značkou 802.1Q."
                       } ,{                      
                           type: "name",
                           title: "ID/Priorita funkcie IPTV Multicast VLAN",
                           content: "Funkciu IPTV multicast môžete zapínať podľa potreby a identifikátor a prioritu VLAN nakonfigurovať podľa vášho poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Určite, aký druh údajov bude port LAN prenášať. Ak je napríklad pre port LAN5 vybratá možnosť IPTV, tento port bude prenášať iba údaje IPTV a k portu LAN5 by ste mali pripojiť zariadenie na príjem televízneho signálu (set-top box)."
                       }]
}]
}]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"Server DHCP",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Predvolená je možnosť zapnúť server DHCP (Dynamic Host Configuration Protocol-Dynamický hostiteľský konfiguračný protokol), dynamicky priraďuje parametre TCP/IP klientskym zariadeniam z fondu IP adries.",
                "Nevypínajte server DHCP, ak nemáte iný server DHCP, alebo ak nechcete ručne priraďovať parametre TCP/IP každému klientskemu zariadeniu vo vašej sieti."]
} ,{                      
                           type: "name",
                           title: "Fond IP adries",
                           content: "Zadajte rozsah IP adries, ktoré je možné prenajať klientom."
                       } ,{                      
                           type: "name",
                           title: "Čas prenájmu adresy",
                           content: "Zadajte časové obdobie (v rozsahu 1 až 2 880 minút), v ktorom sa IP adresa uvoľní klientovi. Predvolená hodnota je 120."
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"Rezervácia adries",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazia sa príslušné parametre zariadení s vyhradenou IP adresou."
                       } ,{                      
                           type: "step",
                           title: "Rezervovať IP adresu",
       content: [ 
                "1. Kliknite na tlačidlo pridať.",
                "2. Kliknite na možnosť Vyhľadať na výber momentálne pripojeného zariadenia zo zoznamu klientov DHCP alebo zadajte adresu MAC požadovaného klienta do poľa MAC a do poľa IP adresa IP adresu, ktorú chcete vyhradiť pre klienta.",
                "3. Do poľa Opis napíšte opis klienta.",
                "4. Vyberte možnosť Zapnúť.",
                "5. Kliknite na tlačidlo Uložiť."]
} ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Ak chcete túto položku vypnúť, kliknite na ikonu Žiarovka."
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"Zoznam klientov DHCP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazia sa informácie o momentálne pripojených zariadeniach."
                       }]
},
       DDNS :{ 
               TITLE:"Dynamický DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dynamický DNS (Dynamic Domain Name System) umožňuje priradiť pevný názov hostiteľa a domény dynamickej internetovej IP adrese. Je to užitočné, keď ste hostiteľom svojej vlastnej webovej lokality, servera FTP alebo ďalšieho servera za smerovačom. Najprv sa treba prihlásiť u poskytovateľa služby Dynamický DNS (DDNS), napríklad na adrese www.dyndns.com."
                       } ,{                      
                           type: "step",
                           title: "Ak chcete nastaviť dynamický DNS",
       content: [ 
                "1. Zvoľte poskytovateľa služby Dynamický DNS.",
                "2. Zadajte Používateľské meno a Heslo svojho účtu DDNS.",
                "3. Zadajte Názov domény, ktorý ste dostali od poskytovateľa služby DDNS.",
                "4. Vyberte Interval aktualizácie z rozbaľovacej ponuky.",
                "5. Ak váš poskytovateľ internetových služieb je NO-IP, väzba WAN IP môže zabezpečiť, že názov domény má vytvorenú väzbu na WAN IP tohto smerovača.",
                "6. Kliknite na Prihlásiť sa a Uložiť."]
} ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Ak chcete použiť nový účet DDNS, najprv sa odhláste a potom sa prihláste pomocou nového účtu."
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"Dynamický DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dynamický DNS (Dynamic Domain Name System) umožňuje priradiť pevný názov hostiteľa a domény dynamickej internetovej IP adrese. Je to užitočné, keď ste hostiteľom svojej vlastnej webovej lokality, servera FTP alebo ďalšieho servera za smerovačom. Najprv sa treba prihlásiť u poskytovateľa služby Dynamický DNS (DDNS), napríklad na adrese www.dyndns.com."
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"Zoznam názvov domén",
               CONTENT: [{
                           type: "paragraph",
                           content: "Táto tabuľka uvádza informácie všetkých názvov domén, ktoré sú registrované s vaším cloudovým účtom."
                       } ,{                      
                           type: "step",
                           title: "Registrácia nového názvu domény",
       content: [ 
                "1. Kliknite na Registrovať.",
                "2. Zadajte názov domény, ktorý chcete zaregistrovať.",
                "3. Kliknite na Uložiť."]
}]
},
       ADVANCED_ROUTING_STATIC_ROUTING :{ 
               TITLE:"Statické smerovanie",
               CONTENT: [{
                           type: "paragraph",
                           content: "Statické smerovanie sa používa na predurčenie pevnej cesty sieťových informačných paketov na dosiahnutie určitého hostiteľa alebo siete."
                       } ,{                      
                           type: "step",
                           title: "Ak chcete nastaviť statické smerovanie",
       content: [ 
                "1. Kliknite na tlačidlo pridať.",
                "2. Zadajte IP adresu v poli Sieťový cieľ na priradenie statického smerovania pre túto položku.",
                "3. Zadaním masky podsiete v poli Maska podsiete určíte sieťovú a hostiteľskú časť IP adresy.",
                "4. Zadajte IP adresu brány v poli Predvolená brána na pripojenie smerovača k sieti alebo hostiteľovi.",
                "5. Vyberte LAN alebo WAN v poli Rozhranie na špecifikáciu typu cieľa siete.",
                "6. Zadajte krátky opis tejto položky.",
                "7. Vyberte možnosť Zapnúť.",
                "8. Kliknite na tlačidlo Uložiť."]
} ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Ak chcete túto položku vypnúť, kliknite na ikonu Žiarovka."
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"Systémová tabuľka smerovania",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazujú sa všetky položky smerovania, ktoré sa aktuálne používajú."
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"Nastavenie bezdrôtového prenosu",
               CONTENT: [{
                           type: "paragraph",
                           content: "Podľa potreby nakonfigurujte bezdrôtové nastavenia."
                       }]
},
       WIRELESS_SMART_CONNECT :{ 
               TITLE:"Smart Connect",
               CONTENT: [{
                           type: "paragraph",
                           content: "Výberom tohto začiarkavacieho políčka povolíte funkciu smart connect. Táto funkcia podporuje rýchlejší chod zariadení tým, že im priradí najlepšie bezdrôtové pásma podľa aktuálnych podmienok s cieľom vyvažovať nároky siete."
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"Bezdrôtové pripojenie 2,4 GHz",
               CONTENT: [{
                           type: "name",
                           title: "Názov siete (SSID)",
                           content: "Odporúča sa zmeniť názov siete (SSID). V tomto poli sa rozlišujú veľké a malé písmená."
                       } ,{                      
                           type: "name",
                           title: "Skryť SSID",
                           content: "Začiarknite toto políčko, ak chcete skryť názov siete (SSID) 2,4 GHz v zozname bezdrôtových sietí. Ak je táto možnosť vybraná, sieť SSID nebude vysielaná a musíte sa k nej pripojiť manuálne."
                       } ,{                      
                           type: "name",
                           title: "Zabezpečenie",
                           content: "Vyberte jednu z nasledovných možností zabezpečenia:",
       children: [{                      
                           type: "name",
                           title: "Bez zabezpečenia",
                           content: "Vyberte túto možnosť, ak chcete vypnúť zabezpečenie bezdrôtovej siete. To sa neodporúča."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Vyberte túto možnosť, ak chcete zapnúť zabezpečenie bezdrôtovej siete. To sa dôrazne odporúča na ochranu bezdrôtovej siete pred neoprávneným prístupom. Ak ju vyberiete, nakonfigurujte nasledovné položky.",
       children: [{                      
                           type: "name",
                           title: "Verzia",
                           content: "Vyberte verziu zabezpečenia. Vyberte verziu zabezpečenia. WPA2-PSK je bezpečnejšie. Ak si nie ste istí, vyberte možnosť Auto."
                       } ,{                      
                           type: "name",
                           title: "Šifrovanie",
                           content: "Vyberte typ zabezpečenia šifrovaním. AES je bezpečnejšie. Neodporúča sa používať šifrovanie TKIP, ak smerovač funguje v režime 802.11n. Okrem toho zapnutím šifrovania TKIP sa vypne funkcia WPS. Ak si nie ste istí, vyberte možnosť Auto."
                       } ,{                      
                           type: "name",
                           title: "Heslo",
                           content: "Zadajte do tohto poľa heslo bezdrôtového pripojenia od 8 do 63 znakov ASCII, alebo od 8 do 64 hexadecimálnych znakov."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Enterprise",
                           content: "Vyberte túto možnosť, ak chcete zapnúť pokročilejšiu metódu overenia pomocou servera RADIUS (Remote Authentication Dial In User Service). Ak je vybrané, funkcia WPS bude vypnutá.",
       children: [{                      
                           type: "name",
                           title: "Verzia",
                           content: "Vyberte verziu zabezpečenia. WPA2 je bezpečnejšie. Ak si nie ste istí, vyberte možnosť Auto."
                       } ,{                      
                           type: "name",
                           title: "Šifrovanie",
                           content: "Vyberte typ zabezpečenia šifrovaním. AES je bezpečnejšie. Neodporúča sa používať šifrovanie TKIP, ak smerovač funguje v režime 802.11n. Okrem toho zapnutím šifrovania TKIP sa vypne funkcia WPS. Ak si nie ste istí, vyberte možnosť Auto."
                       } ,{                      
                           type: "name",
                           title: "IP servera RADIUS",
                           content: "Zadajte IP adresu servera RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Port servera RADIUS",
                           content: "Zadajte číslo portu servera RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Heslo servera RADIUS",
                           content: "Zadajte zdieľané heslo servera RADIUS."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Vyberte túto možnosť, ak chcete zapnúť základnú metódu overenia, ak niektoré klientské zariadenie dokáže pristupovať k bezdrôtovej sieti iba pomocou WEP (Wired Equivalent Privacy). Ak ju zvolíte, funkcia WPS sa vypne.",
       children: [{                      
                           type: "name",
                           title: "Typ",
                           content: "Vyberte typ overenia pre bezdrôtovú sieť. Ak si nie ste istí, vyberte možnosť Auto."
                       } ,{                      
                           type: "name",
                           title: "Formát kľúča WEP",
                           content: "Alebo použite formát ASCII, alebo vyberte Hexadecimálne. Formát ASCII je kombináciou abecedných a numerických znakov. Hexadecimálny formát je kombináciou číslic (0-9) a písmen (A-F, a-f)."
                       } ,{                      
                           type: "name",
                           title: "Typ kľúča",
                           content: "Vyberte dĺžku kľúča WEP.",
       children: [{                      
                           type: "name",
                           title: "64-bitový",
                           content: "Umožňuje zadať 10 hexadecimálnych znakov (0-9, A-F, a-f) alebo 5 znakov ASCII do poľa hodnoty WEP."
                       } ,{                      
                           type: "name",
                           title: "128-bitový",
                           content: "Umožňuje zadať 26 hexadecimálnych znakov (0-9, A-F, a-f) alebo 13 znakov ASCII do poľa hodnoty WEP."
                       }]
} ,{                      
                           type: "name",
                           title: "Hodnota kľúča",
                           content: "Zadajte kľúč WEP do príslušného poľa."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Kanál",
                           content: "Vyberte prevádzkový kanál pre bezdrôtovú sieť s frekvenciou 2,4 GHz. Odporúča sa ponechať kanál na možnosti Automatické, ak nemáte problém s prerušovaným bezdrôtovým pripojením."
                       } ,{                      
                           type: "name",
                           title: "Prenosový výkon",
                           content: "Vyberte možnosť Vysoký, Stredný, alebo Nízky a určite prenosový výkon dát. Predvolené a odporúčané nastavenie je Vysoký."
                       } ,{                      
                           type: "name",
                           id: "atf_2g4",
                           title: "Funkcia Airtime Fairness",
                           content: "Vyberte toto zaškrtávacie políčko, aby ste mohli aktivovať funkciu Airtime Fairness (ATF), ktorá vám umožňuje optimalizovať priebeh každého toku. Plánovač zaneprázdnenosti ATF používa ciele pre airtime podľa destinácií pre vyvážené použitie airtime v rámci toku v destináciách."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_2g4",
                           title: "Funkcia multi používateľa MIMO",
                           content: "Kliknutím aktivujete používanie funkcie multi používateľa MIMO."
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"Bezdrôtové pripojenie 5 GHz",
               CONTENT: [{
                           type: "name",
                           title: "Názov siete (SSID)",
                           content: "Odporúča sa zmeniť názov siete (SSID). V tomto poli sa rozlišujú veľké a malé písmená."
                       } ,{                      
                           type: "name",
                           title: "Skryť SSID",
                           content: "Začiarknite toto políčko, ak chcete skryť názov siete (SSID) 5 GHz v zozname bezdrôtových sietí. Ak je táto možnosť vybraná, sieť SSID nebude vysielaná a musíte sa k nej pripojiť manuálne."
                       } ,{                      
                           type: "name",
                           title: "Zabezpečenie",
                           content: "Vyberte jednu z nasledovných možností zabezpečenia:",
       children: [{                      
                           type: "name",
                           title: "Bez zabezpečenia",
                           content: "Vyberte túto možnosť, ak chcete vypnúť zabezpečenie bezdrôtovej siete. To sa neodporúča."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Vyberte túto možnosť, ak chcete zapnúť zabezpečenie bezdrôtovej siete. To sa dôrazne odporúča na ochranu bezdrôtovej siete pred neoprávneným prístupom. Ak ju vyberiete, nakonfigurujte nasledovné položky.",
       children: [{                      
                           type: "name",
                           title: "Verzia",
                           content: "Vyberte verziu zabezpečenia. WPA2-PSK je bezpečnejšie. Ak si nie ste istí, vyberte možnosť Auto."
                       } ,{                      
                           type: "name",
                           title: "Šifrovanie",
                           content: "Vyberte typ zabezpečenia šifrovaním. AES je bezpečnejšie. Neodporúča sa používať šifrovanie TKIP, ak smerovač funguje v režime 802.11n. Okrem toho zapnutím šifrovania TKIP sa vypne funkcia WPS. Ak si nie ste istí, vyberte možnosť Auto."
                       } ,{                      
                           type: "name",
                           title: "Heslo",
                           content: "Zadajte do tohto poľa heslo bezdrôtového pripojenia od 8 do 63 znakov ASCII, alebo od 8 do 64 hexadecimálnych znakov."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Enterprise",
                           content: "Vyberte túto možnosť, ak chcete zapnúť pokročilejšiu metódu overenia pomocou servera RADIUS (Remote Authentication Dial In User Service). Ak je vybrané, funkcia WPS bude vypnutá.",
       children: [{                      
                           type: "name",
                           title: "Verzia",
                           content: "Vyberte verziu zabezpečenia. WPA2 je bezpečnejšie. Ak si nie ste istí, vyberte možnosť Auto."
                       } ,{                      
                           type: "name",
                           title: "Šifrovanie",
                           content: "Vyberte typ zabezpečenia šifrovaním. AES je bezpečnejšie. Neodporúča sa používať šifrovanie TKIP, ak smerovač funguje v režime 802.11n. Okrem toho zapnutím šifrovania TKIP sa vypne funkcia WPS. Ak si nie ste istí, vyberte možnosť Auto."
                       } ,{                      
                           type: "name",
                           title: "IP servera RADIUS",
                           content: "Zadajte IP adresu servera RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Port servera RADIUS",
                           content: "Zadajte číslo portu servera RADIUS."
                       } ,{                      
                           type: "name",
                           title: "Heslo servera RADIUS",
                           content: "Zadajte zdieľané heslo servera RADIUS."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Vyberte túto možnosť, ak chcete zapnúť základnú metódu overenia, ak niektoré klientské zariadenie dokáže pristupovať k bezdrôtovej sieti iba pomocou WEP (Wired Equivalent Privacy). Ak ju zvolíte, funkcia WPS sa vypne.",
       children: [{                      
                           type: "name",
                           title: "Typ",
                           content: "Vyberte typ overenia pre bezdrôtovú sieť. Ak si nie ste istí, vyberte možnosť Auto."
                       } ,{                      
                           type: "name",
                           title: "Formát kľúča WEP",
                           content: "Alebo použite formát ASCII, alebo vyberte Hexadecimálne. Formát ASCII je kombináciou abecedných a numerických znakov. Hexadecimálny formát je kombináciou číslic (0-9) a písmen (A-F, a-f)."
                       } ,{                      
                           type: "name",
                           title: "Typ kľúča",
                           content: "Vyberte dĺžku kľúča WEP.",
       children: [{                      
                           type: "name",
                           title: "64-bitový",
                           content: "Umožňuje zadať 10 hexadecimálnych znakov (0-9, A-F, a-f) alebo 5 znakov ASCII do poľa hodnoty WEP."
                       } ,{                      
                           type: "name",
                           title: "128-bitový",
                           content: "Umožňuje zadať 26 hexadecimálnych znakov (0-9, A-F, a-f) alebo 13 znakov ASCII do poľa hodnoty WEP."
                       }]
} ,{                      
                           type: "name",
                           title: "Hodnota kľúča",
                           content: "Zadajte kľúč WEP do príslušného poľa."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Kanál",
                           content: "Vyberte prevádzkový kanál pre bezdrôtovú sieť s frekvenciou 5 GHz. Odporúča sa ponechať kanál na možnosti Automatický, ak nemáte problém s prerušovaným bezdrôtovým pripojením."
                       } ,{                      
                           type: "name",
                           title: "Prenosový výkon",
                           content: "Vyberte možnosť Vysoký, Stredný, alebo Nízky a určite prenosový výkon dát. Predvolené a odporúčané nastavenie je Vysoký."
                       } ,{                      
                           type: "name",
                           id: "atf_5g",
                           title: "Funkcia Airtime Fairness",
                           content: "Vyberte toto zaškrtávacie políčko, aby ste mohli aktivovať funkciu Airtime Fairness (ATF), ktorá vám umožňuje optimalizovať priebeh každého toku. Plánovač zaneprázdnenosti ATF používa ciele pre airtime podľa destinácií pre vyvážené použitie airtime v rámci toku v destináciách."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_5g",
                           title: "Funkcia multi používateľa MIMO",
                           content: "Kliknutím aktivujete používanie funkcie multi používateľa MIMO."
                       }]
},
       WPS :{ 
               TITLE:"WPS",
               CONTENT: [{
                           type: "paragraph",
                           content: "WPS (chránené nastavenie Wi-Fi) poskytuje ľahší prístup k nastaveniu pripojenia Wi-Fi chráneného zabezpečením."
                       } ,{                      
                           type: "name",
                           title: "Tlačidlo WPS (odporúča sa)",
       content: [ 
                "Táto metóda vám umožní jednoduché pripojenie ľubovoľného zariadenia so zabezpečením WPS k bezdrôtovej sieti.",
                "Kliknite na tlačidlo Spustiť WPS na obrazovke. Do dvoch minút stlačte tlačidlo WPS na klientskom zariadení."]
} ,{                      
                           type: "name",
                           title: "Kód PIN smerovača",
       content: [ 
                "Predvolené číslo PIN je možné nájsť na štítku smerovača.",
                "Kliknite na tlačidlo Generovať a získajte nové číslo PIN, alebo kliknite na Predvolené, ak chcete obnoviť aktuálne číslo PIN na továrensky predvolené číslo PIN."]
} ,{                      
                           type: "name",
                           title: "Zadajte PIN klienta",
       content: [ 
                "Táto metóda vám umožní pridať bezdrôtové zariadenie manuálne.",
                "Zadajte číslo PIN zariadenia do poľa a potom kliknite na Pripojiť."]
}]
},
       WIRELESS_STATISTICS :{ 
               TITLE:"Pripojené bezdrôtové stanice",
               CONTENT: [{
                           type: "name",
                           title: "Číslo klienta",
                           content: "Zobrazí sa číslo príslušného bezdrôtového klienta."
                       } ,{                      
                           type: "name",
                           title: "MAC adresa",
                           content: "Zobrazí sa MAC adresa príslušného bezdrôtového klienta."
                       } ,{                      
                           type: "name",
                           title: "Typ pripojenia",
                           content: "Zobrazí sa bezdrôtové frekvenčné pásmo (2,4 GHz alebo 5 GHz) príslušného bezdrôtového klienta."
                       } ,{                      
                           type: "name",
                           title: "Zabezpečenie",
                           content: "Zobrazí sa typ zabezpečenia príslušného bezdrôtového klienta."
                       } ,{                      
                           type: "name",
                           title: "Prijaté pakety",
                           content: "Zobrazí sa počet paketov prijatých príslušným klientom bezdrôtového pripojenia."
                       } ,{                      
                           type: "name",
                           title: "Odoslané pakety",
                           content: "Zobrazí sa počet paketov odoslaných príslušným klientom bezdrôtového pripojenia."
                       } ,{                      
                           type: "paragraph",
                           content: "Kliknutím na tlačidlo Obnoviť aktualizujete informácie na tejto strane."
                       }]
},
       WIRELESS_SCHEDULE :{ 
               TITLE:"Plán bezdrôtového pripojenia",
               CONTENT: [{
                           type: "paragraph",
                           content: "Pomocou plánu bezdrôtovej siete môžete vypnúť signál bezdrôtovej siete na konkrétne obdobie. Napríklad môžete vypnúť bezdrôtový signál v čase od 00:00 h do 07:00 h."
                       } ,{                      
                           type: "name",
                           title: "Časový plán vypnutie bezdrôtovej siete",
                           content: "Zobrazí sa obdobie, počas ktorého je bezdrôtový signál vypnutý.",
       children: [{                      
                           type: "step",
                           title: "Nastavenie času vypnutia bezdrôtového pripojenia",
       content: [ 
                "1. Kliknite na tlačidlo pridať.",
                "2. Nastavte časový úsek, počas ktorého má byť bezdrôtový signál vypnutý.",
                "3. Vyberte opakované dni. Vyberte možnosť „Každý deň“, alebo určite jednotlivé dni.",
                "4. Kliknite na tlačidlo Uložiť."]
}]
}]
},
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"Nastavenie",
               CONTENT: [{
                           type: "paragraph",
                           content: "Táto funkcia umožňuje poskytnúť prístup Wi-Fi hosťom bez zverejnenia hlavnej siete."
                       } ,{                      
                           type: "name",
                           title: "Umožniť hosťom vzájomný prístup",
                           content: "Označte toto začiarkavacie políčko na umožnenie bezdrôtovým zariadeniam, aby komunikovali medzi sebou prostredníctvom metód, ako je susedstvo siete, Samba, Ping a FTP."
                       } ,{                      
                           type: "name",
                           id: "access_local",
                           title: "Umožniť hosťom prístup na moju miestnu sieť",
                           content: "Označte toto začiarkavacie políčko na umožnenie bezdrôtovým zariadeniam v hosťovskej sieti, aby komunikovali so zariadeniami pripojenými k portom LAN smerovača alebo hlavnej sieti prostredníctvom metód, ako je susedstvo siete, Samba, Ping a FTP."
                       }]
},
       GUEST_NETWORK_WIRELESS :{ 
               TITLE:"Bezdrôtové pripojenie 2,4 GHz / 5 GHz",
               CONTENT: [{
                           type: "name",
                           title: "Zapnúť hosťovskú sieť",
                           content: "Začiarknutím tohto políčka zapnete funkciu hosťovskej siete."
                       } ,{                      
                           type: "name",
                           title: "Názov siete (SSID)",
                           content: "Môžete použiť predvolený názov hosťovskej siete (SSID), alebo vytvoriť nový názov (až 32 znakov)."
                       } ,{                      
                           type: "name",
                           title: "Skryť SSID",
                           content: "Začiarknite toto políčko, ak chcete skryť názov hosťovskej siete (SSID) zo zoznamu Wi-Fi sietí."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Interval aktualizácie hesla",
                           content: "Vyberte interval aktualizácie hesla hosťovskej siete."
                       } ,{                      
                           type: "name",
                           title: "Zabezpečenie",
                           content: "Keď si zvolíte možnosť nikdy neaktualizovať heslo, vyberte si jednu z nasledujúcich možností zabezpečenia:",
       children: [{                      
                           type: "name",
                           title: "Bez zabezpečenia",
                           content: "Vyberte túto možnosť, ak chcete vypnúť zabezpečenie bezdrôtovej siete. To sa neodporúča."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Personal",
                           content: "Vyberte túto možnosť, ak chcete zapnúť zabezpečenie bezdrôtovej siete. To sa dôrazne odporúča na ochranu hosťovskej siete pred neoprávneným prístupom. Ak ju vyberiete, nakonfigurujte nasledovné položky.",
       children: [{                      
                           type: "name",
                           title: "Verzia",
                           content: "Vyberte verziu zabezpečenia. WPA2-PSK je bezpečnejšie. Ak si nie ste istí, vyberte možnosť Auto."
                       } ,{                      
                           type: "name",
                           title: "Šifrovanie",
                           content: "Vyberte typ zabezpečenia šifrovaním. AES je bezpečnejšie. Neodporúča sa používať šifrovanie TKIP, ak smerovač funguje v režime 802.11n. Okrem toho zapnutím šifrovania TKIP sa vypne funkcia WPS. Ak si nie ste istí, vyberte možnosť Auto."
                       }]
} ,{                      
                           type: "name",
                           id: "portal-help-title",
                           title: "Portál",
                           content: "Autentifikácia portálu vylepšuje zabezpečenie vašej siete tak, že sa požaduje autentifikácia od klientov, ktorí potrebujú dočasný prístup k vašej bezdrôtovej sieti."
                       } ,{                      
                           type: "step",
                           id: "portal-help-content",
                           title: "Nastavenie autentifikácie portálu:",
       content: [ 
                "1. Zvoľte portál pre zabezpečenie.",
                "2. Pre autentifikáciu zvoľte jednoduché heslo alebo voľbu žiadna autentifikácia.",
                "A. Jednoduché heslo - špecifikujte heslo pre autentifikáciu (8-16 abecedných znakov, čísle a _).",
                "B. Žiadna autentifikácia - klienti môžu pristupovať k sieti bez akejkoľvek autentifikácie.",
                "3. Zvoľte 1 hodinu, 2 hodiny, 4 hodiny, 8 hodín alebo Vždy, ak chcete špecifikovať časový interval autentifikácie. Keď časový limit pre autentifikáciu klienta uplynie, musí sa prihlásiť znova, ak chce získať autentifikáciu prístupu.",
                "4. (Voliteľné) Aktivujte presmerovanie a zadajte adresu URL pre presmerovanie tak, ako sa to vyžaduje. Potom novo autentifikovaný klient bude presmerovaný na URL, ktorú ste špecifikovali.",
                "5. (Voliteľné) Môžete si tiež prispôsobiť stránku pre prihlásenie a autentifikáciu.",
                "A. Titulka portálu - až 31 znakov.",
                "B. Podmienky používania - až 1023 znakov.",
                "C. Obrázok s logom - Nahrať JPG alebo PNG obrázok (menej ako 100 KB) pre prispôsobenie loga.",
                "D. Obrázok pozadia - Nahrať JPG alebo PNG obrázok (menej ako 2 MB) pre prispôsobenie pozadia.",
                "6. Kliknite na tlačidlo Uložiť."]
}]
} ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Heslo",
                           content: "Vytvorte heslo s dĺžkou 8 až 63 ASCII znakov alebo 8 až 64 hexadecimálnych znakov (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Heslo",
                           content: "Použite buď náhodne vygenerované heslo alebo si vytvorte heslo v dĺžke 8 až 63 znakov ASCII alebo v dĺžke 8 až 64 hexadecimálnych znakov (0-9, a-f, A-F)."
                       }]
},
       NAT :{ 
               TITLE:"ALG",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcia ALG (Application Layer Gateway) umožňuje zapojenie vlastných prechodových filtrov prekladu sieťových adries (NAT) do brány na podporu prekladu adries a portov pre protokoly „ovládania/údajov“ určitej aplikačnej vrstvy: FTP, TFTP, H323 atď. Odporúča sa zapnúť ALG."
                       } ,{                      
                           type: "name",
                           title: "Zapnúť ALG pre FTP",
                           content: "Ak je vybraná táto možnosť, umožňuje to klientom a serverom protokolu FTP (Protokol prenosu súborov) prenášať dáta cez NAT."
                       } ,{                      
                           type: "name",
                           title: "Zapnúť ALG pre TFTP",
                           content: "Ak je vybraná táto možnosť, umožňuje to klientom a serverom protokolu TFTP (Triviálny protokol prenosu súborov) prenášať dáta cez NAT."
                       } ,{                      
                           type: "name",
                           title: "Zapnúť H323 ALG",
                           content: "Ak je vybraná táto možnosť, umožňuje to klientom aplikácie Microsoft NetMeeting komunikáciu cez NAT."
                       } ,{                      
                           type: "name",
                           title: "Zapnúť RTSP ALG",
                           content: "Ak je vybraná táto možnosť, umožňuje to klientom prehrávača médií komunikovať so servermi prúdu médií cez NAT."
                       } ,{                      
                           type: "name",
                           title: "Povoliť SIP ALG",
                           content: "Ak je vybraná táto možnosť, umožňuje klientom komunikovať so servermi SIP (Session Initiation Protocol) cez NAT."
                       } ,{                      
                           type: "name",
                           title: "Zapnúť PPTP Passthrough",
                           content: "Ak je vybraná táto možnosť, umožňuje to reláciám Point-to-Point prechádzať tunelom cez sieť IP a cez smerovač."
                       } ,{                      
                           type: "name",
                           title: "Zapnúť L2TP Passthrough",
                           content: "Ak je vybraná táto možnosť, umožňuje to reláciám Layer 2 Point-to-Point prechádzať tunelom cez sieť IP a cez smerovač."
                       } ,{                      
                           type: "name",
                           title: "Zapnúť IPSec Passthrough",
                           content: "Ak je vybraná táto možnosť, umožňuje prechádzanie relácií IPSec (Internet Protocol security) tunelom cez IP sieť a ich prechod cez smerovač. Protokol IPSec používa na ochranu osobných údajov a komunikáciu cez IP sietí šifrovacie služby zabezpečenia."
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"Virtuálne servery",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Virtuálne servery sa používajú na inštaláciu verejných služieb na vašu lokálnu sieť. Virtuálny server sa definuje ako externý port a všetky požiadavky z internetu na tento externý port budú presmerované na zvláštny počítač, ktorý musí byť nakonfigurovaný so statickou alebo vyhradenou IP adresou.",
                "Ak budujete na lokálnej sieti server a chcete ho zdieľať na internete, nastavenia Virtuálne Servery vám pomôžu túto službu zrealizovať a poskytnúť ho používateľom internetu."]
} ,{                      
                           type: "paragraph",
                           content: "V tabuľke sa zobrazujú relevantné parametre virtuálneho servera."
                       } ,{                      
                           type: "name",
                           title: "Typ služby",
                           content: "Zobrazí sa názov virtuálneho servera."
                       } ,{                      
                           type: "name",
                           title: "Externý port",
                           content: "Zobrazí sa číslo portu alebo rozsah portov, ktoré používa virtuálny server."
                       } ,{                      
                           type: "name",
                           title: "Interná IP",
                           content: "Zobrazí sa IP adresa počítača, na ktorom je spustená aplikácia služby."
                       } ,{                      
                           type: "name",
                           title: "Interný port",
                           content: "Zobrazí sa číslo portu počítača, na ktorom je spustená aplikácia služby."
                       } ,{                      
                           type: "name",
                           title: "Protokol",
                           content: "Zobrazí sa protokol, ktorý sa používa na aplikáciu služby: TCP, UDP, alebo Všetky (Všetky protokoly, ktoré smerovač podporuje)."
                       } ,{                      
                           type: "name",
                           title: "Stav",
                           content: "Zobrazí sa aktuálny stav určitého pravidla filtrovania (zapnuté alebo vypnuté)."
                       } ,{                      
                           type: "name",
                           title: "Modifikovať",
                           content: "Zobrazia sa možnosti Modifikovať alebo Odstrániť príslušné pravidlo."
                       } ,{                      
                           type: "step",
                           title: "Ak chcete nastaviť pravidlo virtuálneho servera",
       content: [ 
                "1. Kliknite na tlačidlo pridať.",
                "2. Kliknite na možnosť Vyhľadať a vyberte službu zo zoznamu, čím sa automaticky vyplní číslo príslušného portu v poliach Externý port a Interný port. Ak služba nie je v zozname, zadajte číslo externého portu (napr. 21) alebo rozpätie portov (napr. 21 – 25). Nechajte pole Interný port prázdne, ak je rovnaké ako Externý port, alebo zadajte konkrétne číslo portu (napr. 21), ak je Externý port jediným portom. Zadajte IP adresu počítača, na ktorom je spustená aplikácia služby v desiatkovom tvare s bodkami do poľa Vnútorná IP.",
                "3. Vyberte protokol aplikácie služby: TCP, UDP, alebo Všetky z rozbaľovacieho zonamu Protokol.",
                "4. Vyberte možnosť Zapnúť.",
                "5. Kliknite na tlačidlo Uložiť."]
} ,{                      
                           type: "note",
                           title: "Poznámka",
       content: [ 
                "1. Ak chcete túto položku vypnúť, kliknite na ikonu Žiarovka.",
                "2. Odporúčame vám uchovať si predvolené nastavenia Interný port a Protokol v prípade, že si nie ste istí, ktorý port alebo protokol použiť.",
                "3. Ak lokálne hostiteľské zariadenie hostí viac než jeden typ dostupných služieb, je potrebné pre každú službu vytvoriť pravidlo. Všimnite si, že Externý port by sa NEmal prekrývať."]
}]
},
       PORT_TRIGGERING :{ 
               TITLE:"Spúšťanie portov",
               CONTENT: [{
                           type: "paragraph",
                           content: "Spúšťanie portov sa používa na presmerovanie prenosu na určitý port konkrétneho servera na sieti."
                       } ,{                      
                           type: "paragraph",
                           content: "V tabuľke sa zobrazujú relevantné parametre prepnutia portu."
                       } ,{                      
                           type: "name",
                           title: "Aplikácia",
                           content: "Zobrazí sa názov aplikácie."
                       } ,{                      
                           type: "name",
                           title: "Triggering Port / Spúšťajúci port",
                           content: "Zobrazí sa port odchádzajúceho prenosu, ktorý sa používa na spúšťanie pravidla filtrovania odchádzajúceho pripojenia."
                       } ,{                      
                           type: "name",
                           title: "Trigger Protocol / Spúšťajúci protokol",
                           content: "Zobrazí sa protokol používaný Spúšťajúcim portom. TCP, UDP, alebo Všetky (Všetky protokoly, ktoré smerovač podporuje."
                       } ,{                      
                           type: "name",
                           title: "Externý port",
                           content: "Zobrazí sa port alebo rozsah portov, ktoré používa vzdialený systém. Do PC, ktoré spúšťa toto pravidlo, bude pomocou jedného z týchto portov presmerovaná odpoveď. Najviac môže vstupovať 5 skupín portov (alebo sekcií portov). Každá skupina portov musí byť oddelená čiarkami „,“, napríklad, 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
                       } ,{                      
                           type: "name",
                           title: "Externý protokol",
                           content: "Zobrazí sa protokol používaný pre Vstupný port: TCP, UDP, alebo ALL (všetky protokoly podporované smerovačom)."
                       } ,{                      
                           type: "name",
                           title: "Stav",
                           content: "Zobrazí sa aktuálny stav určitého pravidla filtrovania (zapnuté alebo vypnuté)."
                       } ,{                      
                           type: "name",
                           title: "Modifikovať",
                           content: "Zobrazia sa možnosti Modifikovať alebo Odstrániť príslušné pravidlo."
                       } ,{                      
                           type: "step",
                           title: "Nastavenie pravidla spúšťania portov",
       content: [{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Každé pravidlo môže súčasne používať iba jeden hostiteľ."
                       },
                "1. Kliknite na tlačidlo pridať.",
                "2. Kliknite na možnosť Vyhľadať a vyberte aplikáciu zo zoznamu – do príslušných polí sa automaticky doplnia predvolené hodnoty. Ak chcete pridať aplikáciu, ktorá nie je v zozname, ručne zadajte Aplikácia, Spúšťajúci port, Spúšťajúci protokol, Externý port a Externý protokol.",
                "3. Vyberte možnosť Zapnúť.",
                "4. Kliknite na tlačidlo Uložiť."]
} ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Ak chcete toto pravidlo vypnúť, kliknite na ikonu Žiarovka."
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hostiteľská funkcia DMZ (demilitarizovaná zóna) umožňuje miestnemu hostiteľovi, aby sa otvoril smerom na internet pre službu zvláštneho účelu, ako sú napríklad internetové hry alebo videokonferencie. Funkcia DMZ v podstate umožňuje, aby mal jeden počítač v sieti LAN otvorené všetky porty. Tento počítač je potrebné nakonfigurovať so statickou IP adresou a vypnutou klientskou funkciou DHCP."
                       } ,{                      
                           type: "paragraph",
                           content: "Ak je zapnutá funkcia DMZ, hostiteľ DMZ je úplne otvorený smerom na internet, čo by mohlo znamenať určité bezpečnostné riziko pre daný počítač. Ak sa funkcia DMZ nepoužíva, včas ju vypnite."
                       } ,{                      
                           type: "step",
                           title: "Určenie počítača alebo servera ako servera DMZ",
       content: [ 
                "1. Kliknite na možnosť Enable Zapnúť DMZ.",
                "2. Do poľa IP adresa hostiteľa DMZ zadajte IP adresu počítača v miestnej sieti a nakonfigurujte ho ako hostiteľa DMZ.",
                "3. Kliknite na Uložiť."]
}]
},
       UPNP :{ 
               TITLE:"UPnP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Predvolene je funkcia UPnP (Universal Plug-and-Play) určená na to, aby umožnila zariadeniam, napríklad počítačom a internetovým zariadeniam, aby sa automaticky našli a komunikovali spolu v miestnej sieti."
                       } ,{                      
                           type: "paragraph",
                           content: "Funkciu UPnP možno budete musieť zapnúť, ak budete chcieť použiť aplikácie pre hranie viacerých hráčov, partnerské spojenia, komunikáciu v reálnom čase (napríklad VoIP alebo konferenciu teleVoIP) alebo pomoc na diaľku a pod."
                       } ,{                      
                           type: "name",
                           title: "Zoznam služby UPnP",
                           content: "V zozname služieb UPnP sa zobrazujú informácie UPnP o miestnom hostiteľovi (hostiteľoch)."
                       }]
},
       MODEM :{ 
               TITLE:"Pomocník pre 3G/4G",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB modem",
                           content: "Zobrazuje stav 3G/4G USB modemu."
                       } ,{                      
                           type: "name",
                           title: "Použiť automaticky identifikované parametre ISP",
                           content: "Táto funkcia je zapnutá ako predvolená možnosť. Ak je aktivovaná, smerovač môže identifikovať ISP pre kartu SIM/UIM a vyplniť parametre automaticky. Ak sa identifikácia nepodarí, vyberte oblasť a mobilné ISP manuálne."
                       } ,{                      
                           type: "name",
                           title: "Oblasť",
                           content: "Automaticky vyberie a zobrazí oblasť, ak bol úspešne identifikovaný modem USB a karta SIM. V opačnom prípade vyberte oblasť z rozbaľovacej ponuky."
                       } ,{                      
                           type: "name",
                           title: "ISP mobilného pripojenia",
                           content: "Zobrazuje ISP (Internet Service Provider) 3G/4G siete. Ak sa ISP nedeteguje automaticky, vyberte ho z rozbaľovacej ponuky. Predvolené vytáčané číslo a APN sa automaticky vyplnia podľa výberu."
                       } ,{                      
                           type: "name",
                           title: "SIM / UIM PIN",
                           content: "Ak je zapnutá funkcia zabezpečenia karty SIM/UIM, zadajte kód PIN. Funkcia zabezpečenia karty SIM/UIM je predvolene vypnutá. Upozorňujeme, že ak 3-krát zadáte neplatný kód PIN, karta SIM/UIM sa automaticky zablokuje. Odblokovať ju môžete len tak, že zadáte kód PUK z počítača PC/prenosného počítača."
                       } ,{                      
                           type: "name",
                           title: "správa",
                           content: "Zobrazuje informácie o kóde PIN karty SM/UIM, ak je zapnutá funkcia zabezpečenia prostredníctvom kódu PIN."
                       } ,{                      
                           type: "name",
                           title: "Nastavenie Vytáčanie čísla,APN,Meno používateľa/heslo",
                           content: "Ak váš poskytovateľ internetových služieb nie je uvedený v zozname <strong>Poskytovateľ mobilných internetových služieb</strong>, označte toto políčko a zadajte číslo na volanie, APN (názov prístupového bodu) a používateľské meno a heslo, ktoré ste dostali od poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Vytáčanie čísla",
                           content: "Zadajte číslo na volanie, ktoré ste dostali od poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Zadajte APN (názov prístupového bodu), ktorý ste dostali od poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Meno/heslo",
                           content: "Zadajte používateľské meno a heslo, ktoré ste dostali od poskytovateľa internetových služieb. V týchto poliach sa rozlišujú veľké a malé písmená."
                       } ,{                      
                           type: "name",
                           title: "Pripojiť na základe požiadavky",
                           content: "V tomto režime sa internetové pripojenie automaticky preruší po uplynutí určeného času nečinnosti (Maximálny čas nečinnosti). Pripojenie sa obnoví, keď sa pokúsite znova pristúpiť k internetu."
                       } ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Pripojenie sa v niektorých prípadoch nemôže ukončiť, aj keď nastavíte maximálny čas nečinnosti, pretože niektoré aplikácie pristupujú k internetu na pozadí."
                       } ,{                      
                           type: "name",
                           title: "Pripojiť automaticky",
                           content: "V tomto režime sa internetové pripojenie automaticky obnoví po odpojení."
                       } ,{                      
                           type: "name",
                           title: "Pripojiť manuálne",
                           content: "V tomto režime môžete kliknúť na tlačidlo Pripojiť alebo Odpojiť, ak chcete internetové pripojenie ovládať manuálne. Tento režim podporuje aj funkciu maximálneho času nečinnosti. Do poľa Maximálny čas nečinnosti zadajte maximálny čas (v minútach) nečinnosti internetového pripojenia, po ktorom sa pripojenie ukončí. Predvolená hodnota je 15 minút. Ak chcete, aby internetové pripojenie bolo nepretržite aktívne, zadajte hodnotu 0 (nula)."
                       } ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Pripojenie sa v niektorých prípadoch nemôže ukončiť, aj keď nastavíte maximálny čas nečinnosti, pretože niektoré aplikácie pristupujú k internetu na pozadí."
                       } ,{                      
                           type: "paragraph",
                           content: "Kliknutím na tlačidlo Uložiť uložíte nastavenia."
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"Pomocník pre rozšírené nastavenia 3G/4G",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB modem",
                           content: "Zobrazuje stav 3G/4G USB modemu."
                       } ,{                      
                           type: "name",
                           title: "Použiť automaticky identifikované parametre ISP",
                           content: "Táto funkcia je zapnutá ako predvolená možnosť. Ak je aktivovaná, smerovač môže identifikovať ISP pre kartu SIM/UIM a vyplniť parametre automaticky. Ak sa identifikácia nepodarí, vyberte oblasť a mobilné ISP manuálne."
                       } ,{                      
                           type: "name",
                           title: "Oblasť",
                           content: "Automaticky vyberie a zobrazí oblasť, ak bol úspešne identifikovaný modem USB a karta SIM. V opačnom prípade vyberte oblasť z rozbaľovacej ponuky."
                       } ,{                      
                           type: "name",
                           title: "ISP mobilného pripojenia",
                           content: "Zobrazuje ISP (Internet Service Provider) 3G/4G siete. Ak sa ISP nedeteguje automaticky, vyberte ho z rozbaľovacej ponuky. Predvolené vytáčané číslo a APN sa automaticky vyplnia podľa výberu."
                       } ,{                      
                           type: "name",
                           title: "SIM / UIM PIN",
                           content: "Ak je zapnutá funkcia zabezpečenia karty SIM/UIM, zadajte kód PIN. Funkcia zabezpečenia karty SIM/UIM je predvolene vypnutá. Upozorňujeme, že ak 3-krát zadáte neplatný kód PIN, karta SIM/UIM sa automaticky zablokuje. Odblokovať ju môžete len tak, že zadáte kód PUK z počítača PC/prenosného počítača."
                       } ,{                      
                           type: "name",
                           title: "správa",
                           content: "Zobrazuje informácie o kóde PIN karty SM/UIM, ak je zapnutá funkcia zabezpečenia prostredníctvom kódu PIN."
                       } ,{                      
                           type: "name",
                           title: "Nastavenie Vytáčanie čísla,APN,Meno používateľa/heslo",
                           content: "Ak váš poskytovateľ internetových služieb nie je uvedený v zozname <strong>Poskytovateľ mobilných internetových služieb</strong>, označte toto políčko a zadajte číslo na volanie, APN (názov prístupového bodu) a používateľské meno a heslo, ktoré ste dostali od poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Vytáčanie čísla",
                           content: "Zadajte číslo na volanie, ktoré ste dostali od poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Zadajte APN (názov prístupového bodu), ktorý ste dostali od poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Meno/heslo",
                           content: "Zadajte používateľské meno a heslo, ktoré ste dostali od poskytovateľa internetových služieb. V týchto poliach sa rozlišujú veľké a malé písmená."
                       } ,{                      
                           type: "name",
                           title: "Pripojiť na základe požiadavky",
                           content: "V tomto režime sa internetové pripojenie automaticky preruší po uplynutí určeného času nečinnosti (Maximálny čas nečinnosti). Pripojenie sa obnoví, keď sa pokúsite znova pristúpiť k internetu."
                       } ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Pripojenie sa v niektorých prípadoch nemôže ukončiť, aj keď nastavíte maximálny čas nečinnosti, pretože niektoré aplikácie pristupujú k internetu na pozadí."
                       } ,{                      
                           type: "name",
                           title: "Pripojiť automaticky",
                           content: "V tomto režime sa internetové pripojenie automaticky obnoví po odpojení."
                       } ,{                      
                           type: "name",
                           title: "Pripojiť manuálne",
                           content: "V tomto režime môžete kliknúť na tlačidlo Pripojiť alebo Odpojiť, ak chcete internetové pripojenie ovládať manuálne. Tento režim podporuje aj funkciu maximálneho času nečinnosti. Do poľa Maximálny čas nečinnosti zadajte maximálny čas (v minútach) nečinnosti internetového pripojenia, po ktorom sa pripojenie ukončí. Predvolená hodnota je 15 minút. Ak chcete, aby internetové pripojenie bolo nepretržite aktívne, zadajte hodnotu 0 (nula)."
                       } ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Pripojenie sa v niektorých prípadoch nemôže ukončiť, aj keď nastavíte maximálny čas nečinnosti, pretože niektoré aplikácie pristupujú k internetu na pozadí."
                       } ,{                      
                           type: "name",
                           title: "Typ autentifikácie",
                           content: "Vyberte typ overenia. Predvolená hodnota je Auto. Niektorí poskytovatelia internetových služieb vyžadujú špecifický typ overenia. Spýtajte sa na typ overenia poskytovateľa internetových služieb alebo ponechajte predvolené nastavenia."
                       } ,{                      
                           type: "name",
                           title: "Automaticky- Pri tejto možnosti sa podporuje viacnásobná implementácia normy WPA (Wi-Fi Protected Access",
                           content: "V prípade možnosti Auto (predvolená) smerovač automaticky určuje typ overenia používaný poskytovateľom internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "PAP",
                           content: "V prípade PAP (Password Authentication Protocol) smerovač vykonáva overenie s peerom pomocou dvoch vymenených správ. Vyberte túto možnosť, ak ISP vyžaduje tento typ overenia."
                       } ,{                      
                           type: "name",
                           title: "CHAP",
                           content: "V prípade CHAP (Challenge Handshake Authentication) smerovač vykonáva overenie s peerom pomocou troch vymenených správ a pravidelne potvrdzuje identitu peera. Vyberte túto možnosť, ak ISP vyžaduje tento typ overenia."
                       } ,{                      
                           type: "name",
                           title: "Veľkosť MTU",
                           content: "Predvolená veľkosť MTU (maximálna prenosová jednotka) je 1 480 bajtov. Nemeňte ju, pokiaľ to nevyžaduje poskytovateľ internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Použiť nasledovné adresy DNS",
                           content: "Ak poskytovateľ internetových služieb poskytuje IP adresy servera DNS, označte toto políčko a zadajte IP adresy <strong>Primárneho DNS</strong> a Sekundárneho DNS (voliteľne). V opačnom prípade budú servery DNS priradené dynamicky poskytovateľom internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Primárny DNS",
                           content: "Zadajte IP adresu DNS v desiatkovom formáte s bodkami, ktorú ste dostali od poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Sekundárny DNS",
                           content: "(Voliteľne) Zadajte inú IP adresu DNS v desiatkovom formáte s bodkami, ktorú ste dostali od poskytovateľa internetových služieb."
                       } ,{                      
                           type: "paragraph",
                           content: "Kliknutím na tlačidlo <strong>Uložiť</strong> uložíte nastavenia."
                       }]
},
       DISK_SETTING :{ 
               TITLE:"Nastavenie zariadenia",
               CONTENT: [{
                           type: "paragraph",
                           content: "Na obrazovke Nastavenie zariadenia sa zobrazia príslušné informácie ľubovoľného, cez USB port pripojeného úložného zariadenia USB."
                       } ,{                      
                           type: "name",
                           title: "Skenovať",
                           content: "Smerovač zvyčajne automaticky detekuje akékoľvek nové pripojené zariadenie. Ak nie, kliknutím na toto tlačidlo môžete naskenovať ľubovoľné nové pripojené zariadenie a obnoviť obrazovku aktualizovanými informáciami."
                       } ,{                      
                           type: "name",
                           title: "Názov",
                           content: "Zobrazí sa názov disku USB."
                       } ,{                      
                           type: "name",
                           title: "Kapacita",
                           content: "Zobrazí sa celková úložná kapacita disku USB."
                       } ,{                      
                           type: "name",
                           title: "Voľné miesto",
                           content: "Zobrazí sa aktuálne voľné dostupné úložné miesto."
                       } ,{                      
                           type: "name",
                           title: "Bezpečne odobrať",
                           content: "Kliknutím na toto tlačidlo bezpečne odoberiete úložné zariadenie USB predtým, než ho fyzicky odpojíte od smerovača."
                       } ,{                      
                           type: "paragraph",
                           content: "Tlačidlo Odstrániť sa zobrazuje len vtedy, keď je úložné zariadenie USB pripojené k smerovaču. Ak je aktuálny zväzok zaneprázdnený, nemôžete ho odmontovať."
                       } ,{                      
                           type: "name",
                           title: "Stav",
                           content: "Toto začiarkavacie políčko sa objaví iba vtedy, keď je k smerovaču pripojené úložné zariadenie USB. Vyberte túto možnosť, ak chcete zapnúť zdieľanie súborov USB zariadenia."
                       } ,{                      
                           type: "step",
                           title: "Nainštalovanie súborového servera",
       content: [ 
                "1. Pripojte úložné zariadenie USB k portu USB smerovača pomocou kábla USB",
                "2. Nové pripojené zariadenie USB by malo byť detekované smerovačom automaticky a informácie by sa mali zobraziť v sekcii Nastavenie zariadenia. Ak to tak nie je, kliknite na príkaz Skenovať.",
                "3. Vyberte Aktívne a umožníte zdieľanie súborov."]
}]
},
       FOLDER_SHARE_ACCOUNT :{ 
               TITLE:"Konto na zdieľanie",
               CONTENT: [{
                           type: "name",
                           title: "Konto",
                           content: "Alebo môžete na prihlásenie k zdieľaným súborom a priečinkom vybrať možnosť Použiť predvolené konto, alebo možnosť Použiť nové konto a zadať nasledujúce údaje na vytvorenie nového používateľského konta."
                       } ,{                      
                           type: "name",
                           title: "Meno/heslo",
                           content: "Zadajte meno používateľa s dĺžkou 1 až 15 zložené z alfanumerických znakov alebo podtržítka a heslo s dĺžkou 1 až 15 ASCII znakov. Pri týchto poliach sa rozlišuje veľkosť písmen."
                       } ,{                      
                           type: "name",
                           title: "Potvrdiť heslo",
                           content: "Opätovne zadajte heslo, aby sa predišlo preklepu. Aj toto pole je citlivé na veľké a malé písmená."
                       } ,{                      
                           type: "paragraph",
                           content: "Kliknutím na možnosť Uložiť uložíte všetky nastavenia."
                       }]
},
       FOLDER_SHARE_SETTINGS :{ 
               TITLE:"Nastavenie zdieľania",
               CONTENT: [{
                           type: "name",
                           title: "Názov siete/mediálneho servera",
                           content: "Zobrazí sa názov, ktorý sa používa na prístup k pripojenému úložnému zariadeniu USB."
                       } ,{                      
                           type: "name",
                           title: "Zapnúť",
                           content: "Výberom tejto možnosti zapnete prístupovú metódu."
                       } ,{                      
                           type: "name",
                           title: "Prístupová metóda",
                           content: "Na povolenie prístupu k pripojenému úložnému zariadeniu USB existujú tri prístupové metódy. Môžete si vybrať jednu alebo viaceré prístupové metódy výberom príslušného začiarkavacieho políčka.",
       children: [{                      
                           type: "name",
                           title: "Susedstvo siete",
                           content: "Ak je táto možnosť zapnutá, používatelia vo vašej sieti môžu pristupovať k úložnému zariadeniu USB pomocou priradenej IP adresy (napr. \\\\192.168.0.1)."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Ak je táto možnosť zapnutá, klienti FTP v miestnej sieti môžu pristupovať k úložnému zariadeniu USB pomocou priradenej IP adresy s následným číslom portu servera FTP (napr. ftp://192.168.0.1:21)."
                       } ,{                      
                           type: "name",
                           title: "FTP (prostredníctvom internetu)",
                           content: "Ak je zapnutá táto možnosť, používatelia môžu vzdialene pristupovať úložnému zariadeniu USB cez FTP pomocou internetu. Táto funkcia podporuje aj preberanie aj odovzdávanie súborov. Ak chcete zmeniť číslo portu servera FTP, zadajte číslo portu a kliknite na príkaz Uložiť čím sa zmeny aplikujú."
                       }]
} ,{                      
                           type: "name",
                           title: "Cesta/Odkaz",
                           content: "Zobrazí sa adresa, ktorá sa používa na prístup k zdieľanému úložnému zariadeniu USB."
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "Zobrazuje číslo portu FTP servera. Použite predvolenú hodnotu 21 alebo hodnotu medzi 1024 a 65535."
                       } ,{                      
                           type: "paragraph",
                           content: "Kliknutím na možnosť Uložiť uložíte všetky nastavenia."
                       }]
},
       FOLDER_SHARE_FOLDERS :{ 
               TITLE:"Zdieľanie priečinka",
               CONTENT: [{
                           type: "name",
                           title: "Zdieľať všetko",
                           content: "Zapnite túto možnosť, ak chcete zdieľať všetky súbory a priečinky alebo ju vypnite, ak chcete zdieľať iba vybrané priečinky."
                       } ,{                      
                           type: "name",
                           title: "Zapnúť overenie",
                           content: "Dôrazne sa odporúča zapnúť overovanie a žiadať používateľov o uvedenie platného mena a hesla pre prístup k zdieľaným priečinkom."
                       } ,{                      
                           type: "name",
                           title: "Názov priečinka",
                           content: "Zobrazí sa názov zdieľaného priečinka."
                       } ,{                      
                           type: "name",
                           title: "Cesta k priečinku",
                           content: "Zobrazí sa cesta ku zdieľanému priečinku."
                       } ,{                      
                           type: "name",
                           title: "Zdieľanie médií",
                           content: "Označuje, či je v zdieľanom priečinku povolené zdieľať médiá alebo nie."
                       } ,{                      
                           type: "name",
                           title: "Názov disku",
                           content: "Zobrazí sa názov zdieľaného disku."
                       } ,{                      
                           type: "name",
                           title: "Stav",
                           content: "Zobrazí sa stav zdieľaného priečinka (žiarovka)."
                       } ,{                      
                           type: "name",
                           title: "Modifikovať",
                           content: "Zobrazia sa možnosti Modifikovať alebo Odstrániť príslušný zdieľaný priečinok."
                       } ,{                      
                           type: "name",
                           title: "Prehľadávať",
                           content: "Kliknutím môžete vyhľadať zdieľaný priečinok."
                       } ,{                      
                           type: "name",
                           title: "Povoliť prístup z hosťovskej siete",
                           content: "Vyberte túto možnosť, ak chcete klientom z hosťovskej siete povoliť prístup k zdieľaným priečinkom."
                       } ,{                      
                           type: "name",
                           title: "Zapnúť overenie",
                           content: "Vyberte túto možnosť, ak budete od používateľov pri prístupe k zdieľaným priečinkom platné meno a heslo."
                       } ,{                      
                           type: "name",
                           title: "Zapnúť prístup so zapisovaním",
                           content: "Vyberte a umožnite používateľom robiť zmeny v obsahu priečinka."
                       } ,{                      
                           type: "name",
                           title: "Zapnúť zdieľanie médií",
                           content: "Vyberte a zapnite zdieľanie médií."
                       } ,{                      
                           type: "name",
                           title: "Obnoviť",
                           content: "Kliknite a aktualizujte zoznam zdieľaného priečinka."
                       }]
},
       PRINT_SERVER :{ 
               TITLE:"Tlačový server",
               CONTENT: [{
                           type: "name",
                           title: "Tlačový server",
                           content: "Zapnite túto možnosť na zapnutie funkcie tlačového servera."
                       } ,{                      
                           type: "name",
                           title: "Názov tlačiarne",
                           content: "Zobrazí sa názov tlačiarne pripojenej k smerovaču."
                       }]
},
       TIME_MACHINE :{ 
               TITLE:"Time Machine",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcia Time Machine zálohuje všetky súbory na vašom počítači Mac na úložisko USB, pripojené k vášmu smerovaču s modemom."
                       } ,{                      
                           type: "name",
                           title: "Zapnúť ",
                           content: "Výberom tohto začiarkavacieho políčka zapnete funkciu Time Machine."
                       } ,{                      
                           type: "name",
                           title: "Záloha disku",
                           content: "Vyberte lokalitu pre zálohy funkcie Time Machine."
                       } ,{                      
                           type: "name",
                           title: "Obmedzenie veľkosti záloh",
                           content: "Alokujte, koľko miesta na disku sa môže použiť pre zálohy funkcie Time Machine. 0 znamená neobmedzený priestor."
                       } ,{                      
                           type: "name",
                           title: "Uložiť",
                           content: "Kliknutím uložíte svoje nastavenia."
                       }]
},
       OFFLINE_DOWNLOAD :{ 
               TITLE:"Offline Download",
               CONTENT: [{
                           type: "paragraph",
                           content: "Keď je zapnutá funkcia Preberanie off-line, smerovač môže preberať súbory, aj keď počítač nie je trvale zapnutý."
                       } ,{                      
                           type: "name",
                           title: "Stav",
                           content: "Zapnite túto možnosť na zapnutie funkcie Preberanie off-line."
                       } ,{                      
                           type: "name",
                           title: "Cesta k priečinku",
                           content: "Vyberte cestu adresára na uloženie prevzatých položiek alebo ich uloženie do medzipamäte.",
       children: [{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Pri nahrávaní a preberaní súborov nemeňte cestu adresára, ani neodpájajte pamäťové zariadenie USB, mohlo by dôjsť ku kritickým chybám."
                       }]
} ,{                      
                           type: "name",
                           title: "Plán",
                           content: "Označte začiarkavacie políčko na zapnutie funkcie Plán, ktorá vám umožní presnejšie určiť časové obdobie (obdobia) na prevzatie/nahratie súborov."
                       } ,{                      
                           type: "name",
                           title: "Pokračovať v nahrávaní po dokončení úlohy",
                           content: "Označením tohto políčka umožníte ostatným nahrávanie údajov z dokončených preberaní."
                       } ,{                      
                           type: "name",
                           title: "Maximálny počet aktívnych položiek na prevzatie",
                           content: "Zadajte hodnotu 1 až 10 na stanovenie maximálneho počtu aktívnych položiek na prevzatie. Predvolená hodnota je 5."
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"Preberanie",
               CONTENT: [{
                           type: "note",
                           title: "Súbor",
                           content: "Zobrazí názov a typ súboru na prevzatie."
                       } ,{                      
                           type: "note",
                           title: "Rýchlosť",
                           content: "Zobrazí aktuálnu rýchlosť preberania (alebo nahrávania)."
                       } ,{                      
                           type: "note",
                           title: "Dokončené",
                           content: "Zobrazí pokrok preberania."
                       } ,{                      
                           type: "note",
                           title: "Zvyšný čas",
                           content: "Zobrazí zvyšný čas preberania."
                       } ,{                      
                           type: "note",
                           title: "Pripojení partneri",
                           content: "Zobrazí počet pripojených partnerov pri preberaní."
                       } ,{                      
                           type: "note",
                           title: "Stav",
                           content: "Zobrazí aktuálny stav preberania (preberá sa, čaká sa, klonuje sa, pozastavené, hotové alebo chyba)."
                       } ,{                      
                           type: "name",
                           title: "Pridanie novej položky na prevzatie",
       children: [{                      
                           type: "step",
       content: [ 
                "1. Kliknite na tlačidlo pridať.",
                "2. Zvoľte zdroj preberania, torrent z PC, torrent z USB alebo URL.",
                "3. Zvoľte umiestnenie torrentu pre BT alebo zadajte URL pre FTP, HTTP a aMule.",
                "4. Kliknite na tlačidlo Uložiť.",
                "5. Pre aMule špecifikujte IP adresu servera aMule a port pod Advanced (Pokročilé) > aMule Server (aMule server)."]
}]
} ,{                      
                           type: "name",
                           title: "Odstránenie položiek na prevzatie",
                           content: "Označte príslušné začiarkavacie políčko položky (položiek) na prevzatie, ktorú chcete odstrániť a potom kliknite na možnosť odstrániť nad tabuľkou."
                       } ,{                      
                           type: "name",
                           title: "Pozastavenie preberania",
                           content: "Kliknite na príslušné začiarkavacie políčko položky (položiek) na prevzatie, ktorú chcete pozastaviť a potom kliknite na možnosť Pozastaviť nad tabuľkou."
                       } ,{                      
                           type: "name",
                           title: "Pokračovať v preberaní",
                           content: "Kliknite na príslušné začiarkavacie políčko položky (položiek) na prevzatie, pri ktorej chcete pokračovať a potom kliknite na možnosť Pokračovať nad tabuľkou."
                       }]
},
       OFFLINE_DOWNLOAD_ADVANCED :{ 
               TITLE:"Pokročilé",
               CONTENT: [{
                           type: "name",
                           title: "Limity rýchlosti",
                           content: "Určite maximálnu rýchlosť preberania a nahrávania pre internetové pripojenie."
                       } ,{                      
                           type: "name",
                           title: "Maximálna rýchlosť preberania",
                           content: "Zadajte hodnotu 1 až 100 000 kB/s na stanovenie maximálnej rýchlosti preberania. Predvolená hodnota je 1024."
                       } ,{                      
                           type: "name",
                           title: "Maximálna rýchlosť nahrávania",
                           content: "Zadajte hodnotu 1 až 100 000 kB/s na stanovenie maximálnej rýchlosti nahrávania. Predvolená hodnota je 512."
                       } ,{                      
                           type: "name",
                           title: "Počet pripojení",
                           content: "Určite maximálny počet pripojení."
                       } ,{                      
                           type: "name",
                           title: "Celkový maximálny počet pripojení",
                           content: "Zadajte hodnotu 1 až 200 na stanovenie celkového maximálneho počtu pripojení. Predvolená hodnota je 100."
                       } ,{                      
                           type: "name",
                           title: "Maximálny počet pripojených partnerov na torrent",
                           content: "Zadajte hodnotu 1 až 100 na stanovenie maximálneho počtu pripojených partnerov na torrent. Predvolená hodnota je 50."
                       } ,{                      
                           type: "name",
                           title: "Povoliť DHT sieť",
                           content: "Zapnite túto funkciu na zvýšenie efektívnosti pri vyhľadávaní partnerov s cieľom zvýšiť rýchlosť preberania."
                       } ,{                      
                           type: "name",
                           title: "Zapnúť výmenu partnerov",
                           content: "Zapnite túto funkciu na zvýšenie komunikačnej efektívnosti v rámci skupiny partnerov s cieľom zvýšiť rýchlosť preberania."
                       } ,{                      
                           type: "name",
                           title: "Povoliť šifrovanie protokolu pre BitTorrent",
                           content: "Zapnite túto funkciu na posilnenie ochrany osobných údajov a dôvernosti pri prenose údajov."
                       } ,{                      
                           type: "name",
                           title: "Server aMule",
                           content: "Zadajte IP adresu a port servera aMule. Preberanie zo servera aMule funguje len vtedy, keď je smerovač pripojený k serveru."
                       }]
},
       PARENTAL_CONTROL :{ 
               TITLE:"Rodičovská kontrola",
               CONTENT: [{
                           type: "paragraph",
                           content: "Prostredníctvom funkcie Rodičovská kontrola môžete blokovať nevhodné a škodlivé webové lokality a lokality určené len pre dospelých, obmedziť prístup na určitý čas v priebehu dňa (napríklad Facebook alebo YouTube v čase, keď sa dieťa má venovať domácej príprave do školy)."
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"Zariadenia podliehajúce rodičovskej kontrole",
               CONTENT: [{
                           type: "paragraph",
                           content: "V tejto tabuľke sú uvedené informácie a nastavenia zariadení, ktoré sú aktuálne zakázané funkciou Rodičovská kontrola."
                       } ,{                      
                           type: "step",
                           title: "Obmedzenie nového klientskeho zariadenia",
       content: [ 
                "1. Zapnite funkciu Rodičovská kontrola.",
                "2. Kliknite na tlačidlo Pridať.",
                "3. Kliknite na možnosť Vyhľadať a zvoľte aktuálne pripojené zariadenie zo zoznamu zariadení s prístupom alebo zadajte Názov zariadenia a Adresu MAC ručne a pridajte zariadenie, ktoré nie je pripojené.",
                "4. Kliknite na ikonu Efektívny čas a určite časový úsek, počas ktorého platí obmedzenie.",
                "5. Zadajte krátky opis do poľa Opis. Toto pole je voliteľné.",
                "6. Vyberte možnosť Aktivovať tento záznam.",
                "7. Kliknite na tlačidlo Uložiť."]
} ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Ak chcete túto položku vypnúť, kliknite na ikonu Žiarovka."
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"Obmedzenie obsahu",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcia Obmedzenie obsahu umožňuje obmedziť prístup ku konkrétnym webovým lokalitám prostredníctvom kľúčových slov a názvov domén. Klientské zariadenia kontrolované funkciou Rodičovská kontrola môžu alebo nemôžu pristupovať k týmto webovým lokalitám v závislosti od zásad obmedzenia, ktoré vyberiete."
                       } ,{                      
                           type: "step",
                           title: "Spresnenie obsahu, ku ktorému je možné pristupovať",
       content: [ 
                "1. Zapnite funkciu Obmedzenie obsahu.",
                "2. Vyberte Zásady obmedzenia podľa potreby:",
                "A. Ak chcete, aby kontrolované zariadenia mali prístup na všetky webové lokality okrem určitých lokalít, vyberte možnosť Čierna listina.",
                "B. Ak chcete, aby kontrolované zariadenia mali prístup len na určité webové lokality, vyberte zoznam Biela listina.",
                "3. Kliknutím na možnosť Pridať nové kľúčové slovo pridáte kľúčové slovo webovej adresy (napríklad wikipedia) alebo názov domény na čiernu alebo bielu listinu.",
                "4. Kliknite na tlačidlo Uložiť."]
}]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcia QoS (Quality of Service) pomáha určiť prioritu internetového prenosu na základe vašich potrieb. Môžete špecifikovať úroveň priority zariadenia, fyzického portu alebo aplikácie v zozname pravidiel QoS."
                       } ,{                      
                           type: "note",
                           id: "qos-boost",
                           title: "Poznámka",
                           content: "Ak je povolená funkcia NAT Boost, funkcia QoS by mala byť vypnutá."
                       } ,{                      
                           type: "name",
                           title: "Šírka pásma pri odovzdávaní",
                           content: "Zadajte maximálnu šírku pásma nahrávania poskytnutú poskytovateľom internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Šírka pásma pri preberaní",
                           content: "Zadajte maximálnu šírku pásma preberania poskytnutú poskytovateľom internetových služieb."
                       }]
},
       QOS_ADV :{ 
               TITLE:"Pokročilé",
               CONTENT: [{
                           type: "name",
                           title: "Vysoká/Stredná/Nízka priorita",
                           content: "Určite percentuálnu hodnotu pre vysokú/strednú/nízku prioritu prenosu.",
       children: [{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Maximálne množstvo (percento) všetkých priorít je 1."
                       }]
}]
},
       QOS_RULE :{ 
               TITLE:"Zoznam pravidiel QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tu môžete pridať podrobné pravidlá QoS na stanovenie priorít internetového prenosu."
                       } ,{                      
                           type: "step",
                           title: "Nastavenie pravidla QoS",
       content: [ 
                "1. Kliknite na tlačidlo pridať.",
                "2. Vyberte typ priority, ktorý chcete pridať do zoznamu pravidiel QoS.",
                "Podľa zariadenia – Kliknite na možnosť Vyhľadať na výber požadovaného zariadenia alebo ručne zadajte názov zariadenia a jeho adresu MAC.",
                "Podľa aplikácie – Vyberte požadovanú aplikáciu alebo prispôsobte aplikáciu nakonfigurovaním názvu, protokolu a cieľového portu (1-65535). Môžete zadať jeden port alebo viacero portov alebo rozpätie portov oddelené čiarkami (napr. 21,36 – 105,111).",
                "Podľa fyzického portu – Vyberte požadovaný port.",
                "3. Kliknite na Uložiť."]
} ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Pravidlo môžete presúvať medzi rôznymi prioritnými zoznamami a zmeniť jeho prioritu."
                       }]
},
       QOS_DATABASE :{ 
               TITLE:"Aktualizácia databázy",
               CONTENT: [{
                           type: "paragraph",
                           content: "Uvoľníme najnovšiu verziu databázy na adrese www.tp-link.com. Môžete prevziať a aktualizovať databázu smerovača na rozšírenie podporovaných aplikácií."
                       } ,{                      
                           type: "name",
                           title: "Nový databázový súbor",
                           content: "Umiestnenie najnovšieho súboru databázy nájdete po kliknutí na tlačidlo Prehľadávať. Vyberte a kliknutím na príkaz Inovovať inovujte databázu na najnovšiu verziu."
                       }]
},
       SECURITY_FIREWALL :{ 
               TITLE:"Firewall",
               CONTENT: [{
                           type: "name",
                           title: "SPI Firewall",
                           content: "SPI (Stateful Packet Inspection) zabraňuje počítačovým útokom a hodnotí prenos cez smerovač v závislosti od protokolu. Ako predvolená možnosť je táto funkcia zapnutá."
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"Ochrana DoS",
               CONTENT: [{
                           type: "name",
                           title: "Ochrana DoS",
                           content: "DoS (Denial of Service) chráni sieť LAN pred útokmi typu DoS, ktoré zaplavujú sieť požiadavkami na server. Umožňuje filtrovanie nasledujúcich troch druhov útokov podľa potrieb. Každý filter má štyri úrovne:",
       children: [{                      
                           type: "name",
                           title: "Vypnuté",
                           content: "Bez ochrany."
                       } ,{                      
                           type: "name",
                           title: "Nízka",
                           content: "Nízka úroveň ochrany a malý dopad na výkon smerovača."
                       } ,{                      
                           type: "name",
                           title: "Stredná",
                           content: "Stredná úroveň ochrany a stredný dopad na výkon smerovača."
                       } ,{                      
                           type: "name",
                           title: "Vysoká",
                           content: "Vysoká úroveň ochrany, ale zjavný dopad na výkon smerovača."
                       }]
} ,{                      
                           type: "name",
                           title: "Filtrovanie útokov ICPM-FLOOD",
                           content: "Zapnite na predchádzanie útokom formou zaplavovania ICMP (Internet Control Message Protocol)."
                       } ,{                      
                           type: "name",
                           title: "Filtrovanie útokov UDP-FLOOD",
                           content: "Zapnite na predchádzanie útokom formou zaplavovania UDP (User Datagram Protocol)."
                       } ,{                      
                           type: "name",
                           title: "Filtrovanie zaplavujúcich útokov TCP-SYN-FLOOD",
                           content: "Zapnite na predchádzanie útokom formou zaplavovania TCP-SYN (Transmission Control Protocol-Synchronize)."
                       } ,{                      
                           type: "name",
                           title: "Ignorovať ping paket z portu WAN",
                           content: "Zapnutím ignorujete pakety ping z portu WAN"
                       } ,{                      
                           type: "name",
                           title: "Zakázať ping paket z portu LAN",
                           content: "Zapnutím zakážete pakety ping z portu LAN"
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"Zoznam blokovaných hostiteľov DoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "V tejto tabuľke je uvedená IP adresa a adresa MAC blokovaného hostiteľa (hostiteľov) DoS."
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"Kontrola prístupu",
               CONTENT: [{
                           type: "paragraph",
                           content: "Kontrola adresy sa používa na povolenie alebo blokovanie prístupu určitých klientských zariadení na sieť. Keď je zariadenie blokované, nie je schopné komunikovať s inými zariadeniami, ani sa pripojiť na internet."
                       } ,{                      
                           type: "step",
                           title: "Kontrola prístupu",
       content: [ 
                "1. Zapnite túto možnosť na zapnutie funkcie Kontrola prístupu.",
                "2. Ak chcete kontrolovať aj prístup zariadení pripojených k hosťovskej sieti, zapnite funkciu Kontrola hosťovských zariadení.",
                "3. Vyberte prístupový režim podľa potrieb a kliknite na tlačidlo Uložiť:",
                "A. Ak chcete blokovať prístup zo zariadení v nasledujúcom zozname, vyberte možnosť Čierna listina.",
                "B. Ak chcete povoliť prístup zo zariadení v nasledujúcom zozname, vyberte možnosť Biela listina.",
                "4. V oddiele Zariadenia na čiernej listine/bielej listine kliknite na možnosť Pridať. Zadajte názov a adresu MAC zariadenia. Kliknite na tlačidlo Uložiť."]
} ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Ak chcete túto položku vypnúť, kliknite na ikonu Žiarovka."
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"Zariadenia online",
               CONTENT: [{
                           type: "paragraph",
                           content: "V tejto tabuľke sa zobrazujú informácie o všetkých pripojených zariadeniach (vrátane zariadení pripojených do hosťovskej siete, ak je povolená funkcia Kontrola hosťovských zariadení)."
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"Zviazanie adries IP a MAC",
               CONTENT: [{
                           type: "paragraph",
                           content: "Vytvorenie väzby IP a MAC (tzv. vytvorenie väzby ARP) je užitočné na kontrolu prístupu určitého zariadenia v sieti LAN zviazaním adresy IP a MAC zariadenia dohromady. Vytvorenie väzby IP a MAC tiež bráni iným zariadeniam v používaní určitej IP adresy."
                       } ,{                      
                           type: "step",
                           title: "Nastavenie zariadenia s vytvorením väzby IP a MAC",
       content: [ 
                "1. Kliknite na tlačidlo pridať.",
                "2. Zadajte MAC adresu zariadenia.",
                "3. Zadajte IP adresu, s ktorou chcete vytvoriť väzbu s vyššie uvedenou adresou MAC.",
                "4. Vyberte možnosť Zapnúť.",
                "5. Kliknite na tlačidlo Uložiť."]
} ,{                      
                           type: "note",
                           title: "Poznámka",
       content: [ 
                "1. Tú istú IP adresu nie je možné zviazať s viac než jednou MAC adresou.",
                "2. Ak chcete túto položku vypnúť, kliknite na ikonu Žiarovka."]
}]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"Zoznam ARP",
               CONTENT: [{
                           type: "paragraph",
                           content: "V tejto tabuľke je uvedená adresa MAC a adresa IP aktuálne pripojeného zariadenia (zariadení)."
                       }]
},
       IPV6 :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "name",
                           title: "Protokol IPv6",
                           content: "IPv6 (Internetový protokol verzie 6) je najnovšia verzia adresy IP (internetový protokol) a rieši problém vyčerpania adresy IPv4 (verzia internetového protokolu 4)."
                       } ,{                      
                           type: "title",
                            title: "Typ pripojenia do internetu: Dynamická IP adresa"
                       } ,{                      
                           type: "name",
                           title: "Dynamická IP adresa",
                           content: "Vyberte tento typ, ak poskytovateľ internetových služieb používa dynamické priraďovanie adries protokolu IPv6."
                       } ,{                      
                           type: "name",
                           title: "Adresa IPv6/Primárny DNS/Sekundárny DNS",
                           content: "Tieto parametre sú automaticky priradené serverom DHCPv6 od poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Obnoviť",
                           content: "Kliknite na toto tlačidlo, ak chcete získať nové parametre IPv6 zo servera DHCPv6 od poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Uvoľniť",
                           content: "Kliknite na toto tlačidlo, ak chcete uvoľniť všetky adresy IPv6, ktoré priradil server DHCPv6 od poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Získať adresu IPv6",
                           content: "Vyberte server DHCPv6 na získanie trvalej adresy IPv6 alebo SLAAC na získanie adresy IPv6 vytvorenej z reklamného balíka smerovača podľa poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Prefix Delegation",
                           content: "Vyberte Povoliť Získať Prefix Delegation od servera DHCPv6 Vášho ISP, alebo Zakázať určenie predpony adresy ručne. Klienti v sieti LAN bude generovať adresu IPv6 s touto predponou."
                       } ,{                      
                           type: "name",
                           title: "Adresa DNS",
                           content: "Vyberte možnosť Získať dynamicky od poskytovateľa internetových služieb alebo Použiť nasledovné adresy DNS. Ak vyberiete možnosť Použiť nasledovné adresy DNS, zadajte ručne adresu DNS, ktorú ste dostali od poskytovateľa internetových služieb."
                       } ,{                      
                           type: "title",
                            title: "Typ pripojenia do internetu: Statická IP"
                       } ,{                      
                           type: "name",
                           title: "Statická IP",
                           content: "Vyberte tento typ, ak poskytovateľ internetových služieb používa statické priraďovanie adries protokolu IPv6."
                       } ,{                      
                           type: "name",
                           title: "Adresa IPv6/Predvolená brána/Primárny DNS/Sekundárny DNS",
                           content: "Zadajte tieto parametre podľa svojho ISP."
                       } ,{                      
                           type: "name",
                           title: "Veľkosť MTU",
                           content: "Predvolená a typická veľkosť MTU (Maximálna prenosová jednotka) pre väčšinu sietí ethernet je 1500 Bytes (1500 bajtov). Zmena predvolenej veľkosti MTU sa neodporúča, ak to nevyžaduje poskytovateľ internetu (ISP)."
                       } ,{                      
                           type: "title",
                            title: "Typ internetového pripojenia: Typ 6na4 tunel"
                       } ,{                      
                           type: "name",
                           title: "Typ 6na4 tunel",
                           content: "Vyberte tento typ, ak poskytovateľ internetových služieb používa na priradenie adresy nasadenie 6to4."
                       } ,{                      
                           type: "name",
                           title: "Adresa IPv4/Maska podsiete IPv4/Predvolená brána IPv4/adresa tunela",
                           content: "Tieto parametre sa budú dynamicky generovať z informácií IPv4 alebo portu WAN po kliknutí na príkaz Pripojiť."
                       } ,{                      
                           type: "name",
                           title: "Použiť nasledujúci server DNS",
                           content: "Vyberte túto možnosť na manuálne zadanie primárneho servera DNS a/alebo sekundárneho servera DNS, ako vám ich oznámil poskytovateľ internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Pripojiť",
                           content: "Kliknite na pripojenie na internet."
                       } ,{                      
                           type: "name",
                           title: "Odpojiť",
                           content: "Kliknite na toto tlačidlo, ak sa chcete odpojiť od internetu."
                       } ,{                      
                           type: "title",
                            title: "Typ internetového pripojenia: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE",
                           content: "Vyberte tento typ, ak poskytovateľ internetových služieb používa typ pripojenia PPPoEv6 a dal vám používateľské meno a heslo."
                       } ,{                      
                           type: "name",
                           title: "Meno/heslo",
                           content: "Zadajte tieto parametre podľa svojho ISP."
                       } ,{                      
                           type: "name",
                           title: "Adresa IPv6",
                           content: "Táto adresa bude automaticky priradená serverom DHCPv6 od poskytovateľa internetových služieb, keď zadáte používateľské meno a heslo a kliknete na príkaz Pripojiť."
                       } ,{                      
                           type: "name",
                           title: "Získať adresu IPv6",
                           content: "Vyberte server DHCPv6 na získanie trvalej adresy IPv6 alebo SLAAC na získanie adresy IPv6 vytvorenej z reklamného balíka smerovača alebo možnosť Určené podľa poskytovateľa internetových služieb na manuálne zadanie adresy IPv6 podľa vášho poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Prefix Delegation",
                           content: "Vyberte Povoliť Získať Prefix Delegation od servera DHCPv6 Vášho ISP, alebo Zakázať určenie predpony adresy ručne. Klienti v sieti LAN bude generovať adresu IPv6 s touto predponou."
                       } ,{                      
                           type: "name",
                           title: "Adresa DNS",
                           content: "Vyberte možnosť Získať dynamicky od poskytovateľa internetových služieb alebo Použiť nasledovné adresy DNS. Ak vyberiete možnosť Použiť nasledovné adresy DNS, zadajte ručne adresu DNS, ktorú ste dostali od poskytovateľa internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Pripojiť",
                           content: "Kliknite na pripojenie na internet."
                       } ,{                      
                           type: "name",
                           title: "Odpojiť",
                           content: "Kliknite na toto tlačidlo, ak sa chcete odpojiť od internetu."
                       } ,{                      
                           type: "title",
                            title: "Typ internetového pripojenia: Pass-Through (Bridge) "
                       } ,{                      
                           type: "paragraph",
                           content: "Vyberte tento typ, ak poskytovateľ internetových služieb používa sieťové nasadenie Pass Through (Bridge). Pri tomto type pripojenia sa nevyžaduje žiadna konfigurácia."
                       }]
},
       IPV6_LAN :{ 
               TITLE:"Lokálna sieť",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ostatné typy internetového pripojenia okrem pripojenia Pass-Through (Bridge) si vyžadujú konfiguráciu IPv6."
                       } ,{                      
                           type: "name",
                           title: "Priradený typ",
                           content: "Vyberte príslušný typ podľa poskytovateľa internetových služieb.",
       children: [{                      
                           type: "name",
                           title: "DHCPv6",
                           content: "Na automatické priradenie IP adries klientom v sieti LAN.",
       children: [{                      
                           type: "name",
                           title: "Predpona adresy",
                           content: "Zadajte predponu adresy, ako vám ju oznámil poskytovateľ internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Čas uvoľnenia",
                           content: "Ide o platný čas priradenej IP adresy. Nechajte predvolenú možnosť 86 400 sekúnd, alebo ju zmeňte, ak vás o to požiada poskytovateľ internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Adresa",
                           content: "Je to IP adresa priradená automaticky serverom DHCPv6 od poskytovateľa internetových služieb."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+bezstavový DHCP",
       children: [{                      
                           type: "name",
                           title: "Predpona adresy",
                           content: "Zadajte predponu adresy, ako vám ju oznámil poskytovateľ internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Adresa",
                           content: "IP adresa automaticky pridelená od ISP."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+RDNSS",
       children: [{                      
                           type: "name",
                           title: "Predpona adresy",
                           content: "Zadajte predponu adresy, ako vám ju oznámil poskytovateľ internetových služieb."
                       } ,{                      
                           type: "name",
                           title: "Adresa",
                           content: "IP adresa automaticky pridelená od ISP."
                       }]
}]
}]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"Klonovanie MAC adries",
               CONTENT: [{
                           type: "paragraph",
                           content: "Vyberte vhodnú metódu klonovania MAC podľa potreby."
                       } ,{                      
                           type: "name",
                           title: "NEklonovať MAC adresu",
                           content: "V prípade, že ISP neviaže priradenú IP adresu s MAC adresou, nemeňte predvolenú MAC adresu smerovača."
                       } ,{                      
                           type: "name",
                           title: "Klonovať MAC adresu tohto počítača",
                           content: "Vyberte a týmto skopírujte aktuálnu MAC adresu počítača, ktorý je pripojený k smerovaču, v prípade, že ISP viaže priradenú IP adresu s MAC adresou počítača."
                       } ,{                      
                           type: "name",
                           title: "Použiť vlastnú MAC adresu",
                           content: "Zadajte MAC adresu ručne, v prípade, že ISP viaže priradenú IP adresu k určitej MAC adrese."
                       }]
},
       TIME_SETTING :{ 
               TITLE:"Nastavenia času",
               CONTENT: [{
                           type: "paragraph",
                           content: "Možnosť Nastavenia času umožňuje nakonfigurovať systémový čas pre smerovač. Upravený systémový čas sa uplatní na funkcie a konfigurácie založené na čase, ako je napríklad Rodičovská kontrola."
                       } ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Pred konfiguráciou môžete zapnúť funkciu 24-hodinového formátu času, ktorý sa uplatní na systémové funkcie a konfigurácie."
                       } ,{                      
                           type: "title",
                            title: "Systémový čas"
                       } ,{                      
                           type: "step",
                           title: "Získanie času z internetu",
       content: [ 
                "Predvolená možnosť Získať z internetu vám umožní získať systémový čas z internetu.",
                "1. Vyberte možnosť Získať z internetu.",
                "2. Vyberte miestnu časovú zónu z rozbaľovacej ponuky.",
                "3. V poli NTP Server I zadajte IP adresu alebo názov domény požadovaného servera NTP.",
                "4. V poli NTP Server II zadajte IP adresu alebo názov domény druhého servera NTP. (Voliteľne)",
                "5. Kliknite na možnosť Získať.",
                "6. Kliknite na tlačidlo Uložiť."]
} ,{                      
                           type: "step",
                           title: "Získanie času z počítača (PC)",
       content: [ 
                "Táto funkcia umožňuje získať systémový čas z počítača PC. Čas z počítača PC potvrďte pred konfiguráciou.",
                "Vyberte možnosť Získať z PC a kliknite na tlačidlo Uložiť."]
} ,{                      
                           type: "step",
                           title: "Manuálne nastavenie času",
       content: [ 
                "Ak zariadenie nemôže automaticky získať čas z internetu alebo PC, systémový čas môžete nakonfigurovať manuálne.",
                "1. Vyberte možnosť Manuálne.",
                "2. Zadajte aktuálny dátum a čas.",
                "3. Kliknite na Uložiť."]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Letný čas",
                           content: "Táto funkcia automaticky synchronizuje systémový čas s letným časom."
                       } ,{                      
                           type: "step",
                           title: "Nastavenie letného času",
       content: [ 
                "1. Vyberte Zapnúť letný čas.",
                "2. Určite časové obdobie letného času v miestnom časovom pásme.",
                "3. Kliknite na Uložiť."]
}]
},
       DIGNOSTIC :{ 
               TITLE:"Diagnostika",
               CONTENT: [{
                           type: "paragraph",
                           content: "Smerovač poskytuje nástroje Ping a Traceroute a pomáha tak riešiť problémy so sieťovým pripojením."
                       } ,{                      
                           type: "title",
                            title: "Ping a Traceroute"
                       } ,{                      
                           type: "paragraph",
                           content: "Nástroj Ping odosiela pakety na cieľovú IP adresu alebo Názov domény a zapisuje výsledky, ako napríklad počet odoslaných/prijatých paketov a čas návratu potvrdenia."
                       } ,{                      
                           type: "paragraph",
                           content: "Nástroj Traceroute odosiela pakety na cieľovú IP adresu alebo názov domény a zobrazuje počet uzlov a čas na dosiahnutie cieľa."
                       } ,{                      
                           type: "paragraph",
                           content: "Nástroj Ping a Traceroute môžete použiť na lokálne zariadenie pomocou IP adresy alebo názvu domény, ako napríklad tp-link.com, yahoo.com atď."
                       } ,{                      
                           type: "step",
                           title: "Diagnostika pomocou nástroja Ping",
       content: [ 
                "1. Vyberte Ping ako Diagnostický nástroj.",
                "2. Zadajte cieľovú IP adresu Názov domény.",
                "3. Kliknite na ikonu so šípkou, otvorte ponuku Pokročilé a určite Počet výzev ping a Veľkosť paketu výzvy ping. (Voliteľne)",
                "4. Kliknite na možnosť Štart."]
} ,{                      
                           type: "step",
                           title: "Diagnostika pomocou nástroja Traceroute",
       content: [ 
                "1. Vyberte Ping ako Diagnostický nástroj.",
                "2. Zadajte cieľovú IP adresu Názov domény.",
                "3. Kliknite na ikonu so šípkou, otvorte ponuku Pokročilé a určite počet skokov (ktorý sa má dosiahnuť) v poli Traceroute Max TTL (Time to Live). Predvolená hodnota je 20. (Voliteľne)",
                "4. Kliknite na možnosť Štart."]
}]
},
       PORT_MIRROR :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                            title: "Zrkadlenie portov"
                       } ,{                      
                           type: "paragraph",
                           content: "Funkcia Zrkadlenie portu (Port Mirroring) označuje postupy ďalšieho zasielania kópií paketov zo zrkadleného portu na zrkadliaci port. Zrkadliaci port je obvykle spojený s dátovým diagnostickým zariadením, ktorý sa používa na analýzu zrkadlených paketov na účely monitorovania a odstraňovania sieťových problémov."
                       } ,{                      
                           type: "step",
                           title: "Ďalšie poslanie kópií paketov, do určeného portu",
       content: [ 
                "1. Zapnite Zrkadlenie portu (Port Mirroring).",
                "2. Vyberte požadované porty ako zrkadlené porty.",
                "3. Vyberte požadovaný port ako zrkadliaci port.",
                "4. Kliknite na tlačidlo Uložiť."]
} ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Port nie je možné nastaviť súčasne ako zrkadlený aj zrkadliaci."
                       }]
},
       FIRMWARE :{ 
               TITLE:"Modernizácia firmvéru",
               CONTENT: [{
                           type: "paragraph",
                           content: "Inovácia firmvéru aktualizuje firmvér smerovača novými funkciami alebo opravami chýb. Odporúča sa inovovať smerovač najnovšími inovačnými súbormi na dosiahnutie čo najlepšieho výkonu."
                       } ,{                      
                           type: "step",
                           title: "Nasledujúce pokyny vám pomôžu predísť chybám pri inovácii:",
       content: [ 
                "Pred aktualizáciou",
                "1. Ubezpečte sa, či máte stabilné pripojenie medzi routerom a počítačom. Neodporúča sa aktualizovať firmvér bezdrôtovo.",
                "2. Ubezpečte sa, či máte vybraté všetky USB zariadenia, pripojené k routeru.",
                "3. Nezabudnite zálohovať konfiguračný súbor routera.",
                "Počas aktualizácie",
                "Udržiavajte router ZAPNUTÝ, kým sa aktualizácia nedokončí."]
}]
},
       FIRMWARE_UPGRADE_ONLINE :{ 
               TITLE:"Inovovať firmvér on-line",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Kliknite na tlačidlo Upgrade (Aktualizovať) a po výzve potvrďte. Router automaticky stiahne a aktualizuje na najnovšie firmware. Môžete tiež kliknúť na Skontrolovať aktualizácie pre kontrolu dostupnosti najnovšej verzie firmvéru."]
}]
},
       FIRMWARE_UPGRADE :{ 
               TITLE:"Inovácia firmvéru on-line",
               CONTENT: [{
                           type: "step",
       content: [ 
                "1. Kliknite na možnosť Podpora v spodnej časti stránky a prevezmite najnovší firmvér do počítača. Ubezpečte sa, či sa verzia firmvéru, ktorú preberáte, zhoduje s verziou hardvéru smerovača, ako je uvedená na stránke.",
                "2. Kliknite na Prechádzať a zvoľte prevzatý súbor firmvéru.",
                "3. Kliknite na Aktualizovať."]
} ,{                      
                           type: "paragraph",
       content: [ 
                "Aktualizácia firmvéru trvá niekoľko minút. Router sa po aktualizácii firmvéru automaticky reštartuje."]
}]
},
       BACKUP :{ 
               TITLE:"Zálohovanie a obnovenie",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcia Zálohovanie a obnova umožňuje zálohovať aktuálnu konfiguráciu smerovača na účely obnovenia alebo obnoviť predvolené nastavenia smerovača."
                       } ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "NEODPÁJAJTE smerovač počas procesu zálohovania alebo obnovenia."
                       } ,{                      
                           type: "title",
                           title: "Zálohovanie",
                           content: "Silne sa odporúča zálohovať aktuálnu konfiguráciu, v prípade potreby obnovenia routera do jeho predchádzajúceho stavu."
                       } ,{                      
                           type: "step",
                           title: "Zálohovať aktuálnu konfiguráciu",
       content: [ 
                "1. Kliknite na Zálohovať.",
                "2. Čakajte, kým router nezálohuje aktuálnu konfiguráciu."]
}]
},
       RESTORE :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Obnovenie",
                           content: "Môžete obnoviť smerovač do predchádzajúceho stavu zo súboru zálohy."
                       } ,{                      
                           type: "step",
                           title: "Obnovenie zo zálohy",
       content: [ 
                "1. Kliknite na príkaz Prehľadávať.",
                "2. Nájdite a vyberte záložný súbor.",
                "3. Kliknite na príkaz Obnoviť."]
}]
},
       FACTORY :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Obnovenie na predvolené továrenské nastavenia",
       content: [ 
                "Obnovenie továrenských predvolených hodnôt odstráni všetky vaše konfigurácie a nastavenia a vráti ich na továrenské hodnoty. Napríklad, všetky bezdrôtové, rodičovské ovládacie prvky a informácie o sieti budú vymazané.",
                "Ak obnovíte výrobné nastavenia, na prístup k webovej stránky správy smerovača budete musieť nastaviť nové heslo."]
}]
},
       REBOOT :{ 
               TITLE:"Plánovanie reštartu",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcia Plánovanie reštartu vymaže medzipamäť na zlepšenie priebežného výkonu smerovača. Smerovač môžete opätovne reštartovať manuálne alebo môžete nastaviť pravidelné reštartovanie."
                       } ,{                      
                           type: "step",
                           title: "Manuálne reštartovanie",
       content: [ 
                "Kliknite na tlačidlo Reštartovať a počkajte niekoľko minút, kým sa smerovač znova nespustí."]
} ,{                      
                           type: "step",
                           title: "Naplánovanie času reštartu",
       content: [ 
                "1. Aktivujte funkciu Plánovanie reštartu.",
                "2. V poliach Čas reštartu a Opakovanie zadajte parametre a nastavte kedy a ako často sa bude smerovač reštartovať.",
                "3. Kliknite na Uložiť."]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"Správa",
               CONTENT: [{
                           type: "paragraph",
                           content: "Administrácia umožňuje spravovať prihlasovacie heslo a povolenie na prístup klientov pripojených ku smerovaču."
                       } ,{                      
                           type: "name",
                           title: "Manažment konta",
                           content: "Táto funkcia vám umožní zmeniť heslo.",
       children: [{                      
                           type: "step",
                           title: "Zmena hesla",
       content: [ 
                "1. Zadajte staré heslo.",
                "2. Zadajte nové heslo.",
                "3. Potvrďte nové heslo.",
                "4. Kliknite na tlačidlo Uložiť."]
}]
}]
},
       ADMIN_RECOVERY :{ 
               TITLE:"Obnovenie hesla",
               CONTENT: [{
                           type: "name",
                           title: "Obnovenie predvoleného hesla",
                           content: "Funkcia Obnovenie predvoleného hesla umožňuje obnoviť predvolené prihlasovacie heslo, pričom nie je potrebné obnovovať predvolené nastavenia smerovača.",
       children: [{                      
                           type: "step",
                           title: "Zmena hesla",
       content: [ 
                "1. Zapnúť funkciu Obnovenie predvoleného hesla.",
                "2. Do poľa Od zadajte platnú e-mailovú adresu, ktorú používate na odosielanie overovacieho kódu pri obnovení prihlasovacích údajov.",
                "3. Do poľa Komu zadajte platnú e-mailovú adresu, ktorá sa má použiť na príjem overovacieho kódu.",
                "4. Zadajte server SMTP pre odchádzajúce e-maily (Od).",
                "5. Ak si e-mailová adresa v poli Od vyžaduje overenie, je potrebné označiť začiarkavacie políčko Zapnúť overenie a zadať používateľské meno (e-mailovú adresu) a heslo.",
                "6. Kliknite na tlačidlo Uložiť."]
}]
}]
},
       ADMIN_LOCAL :{ 
               TITLE:"Lokálna správa",
               CONTENT: [{
                           type: "paragraph",
                           content: "Táto funkcia umožňuje miestnym zariadeniam prístup a správu smerovača."
                       } ,{                      
                           type: "name",
                           id: "local_management_https",
                           title: "Miestny manažment cez HTTPS",
                           content: "Ak chcete pristupovať ku smerovaču aj cez HTTPS, aj cez HTTP, zapnite miestny manažment cez HTTPS, alebo ak chcete pristupovať ku smerovaču iba cez HTTP, nechajte ho vypnutý."
                       } ,{                      
                           type: "name",
                           title: "Prístup pre všetky zariadenia pripojené pomocou LAN",
                           content: "Prepnite na možnosť On (Zap.), ak chcete zapnúť lokálnu správu pre všetky zariadenia pripojené pomocou LAN alebo na možnosť Off (Vyp.), ak chcete povoliť správu pre konkrétne zariadenie."
                       } ,{                      
                           type: "name",
                           title: "MAC adresa",
                           content: "Zobrazí sa MAC adresa zariadenia s povoleným prístupom."
                       } ,{                      
                           type: "name",
                           title: "Popis",
                           content: "Zobrazí sa popis zariadenia s povoleným prístupom."
                       } ,{                      
                           type: "name",
                           title: "Stav",
                           content: "Zobrazí sa aktuálny stav zariadenia s povoleným prístupom (zapnuté alebo vypnuté)."
                       } ,{                      
                           type: "name",
                           title: "Modifikovať",
                           content: "Zobrazia sa možnosti na Modifikáciu a Odstránenie príslušného zariadenia zo zoznamu."
                       } ,{                      
                           type: "step",
                           title: "Pridanie klientskeho zariadenia do zoznamu",
       content: [ 
                "1. Kliknite na tlačidlo pridať.",
                "2. Kliknite na Zobraziť existujúce zariadenia a vyberte existujúce zariadenie alebo zadajte MAC adresu zariadenia do poľa MAC adresa.",
                "3. Zadajte Popis zariadenia.",
                "4. Vyberte možnosť Zapnúť.",
                "5. Kliknite na tlačidlo OK."]
} ,{                      
                           type: "step",
                           title: "Modifikovanie alebo odstránenie zariadenia zo zoznamu",
                           content: "V tabuľke kliknite na ikonu Upraviť, alebo na ikonu Odstrániť, ktorá je príslušná zariadeniu, ktoré chcete upraviť alebo odstrániť."
                       } ,{                      
                           type: "step",
                           title: "Odstránenie viacerých zariadení",
                           content: "Vyberte všetky zariadenia, ktoré chcete odstrániť, kliknite na príkaz Odstrániť."
                       }]
},
       ADMIN_REMOTE_WITHOUT_HTTPS :{ 
               TITLE:"Vzdialená správa",
               CONTENT: [{
                           type: "name",
                           title: "Vzdialená správa",
                           content: "Funkcia Vzdialená správa umožňuje prístup vzdialených zariadení do smerovača a jeho spravovanie.",
       children: [{                      
                           type: "step",
                           title: "Zakázanie všetkým vzdialeným zariadeniam, aby spravovali smerovač",
                           content: "Vyberte možnosť Vypnúť vzdialenú správu a kliknite na tlačidlo Uložiť."
                       } ,{                      
                           type: "step",
                           title: "Povolenie všetkým vzdialeným zariadeniam, aby spravovali smerovač",
       content: [ 
                "1. Vyberte možnosť Zapnúť vzdialenú správu VŠETKÝCH zariadení.",
                "2. Zadajte port webového manažmentu (1024-65535 or 80), skrze ktorý budú vzdialené zariadenia pristupovať k smerovaču.",
                "3. Kliknite na Uložiť."]
} ,{                      
                           type: "step",
                           title: "Povolenie konkrétnemu vzdialenému zariadeniu, aby spravovalo smerovač",
       content: [ 
                "1. Pre konkrétne zariadenie vyberte možnosť Zapnúť vzdialenú správu.",
                "2. Zadajte port webového manažmentu (1024-65535 or 80), skrze ktorý bude vzdialené zariadenie pristupovať k smerovaču.",
                "3. Zadajte IP adresu vzdialeného manažmentu vzdialeného zariadenia, ktoré bude spravovať smerovač.",
                "4. Kliknite na tlačidlo Uložiť."]
}]
}]
},
       ADMIN_REMOTE :{ 
               TITLE:"Vzdialená správa",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcia Vzdialenej správy vám umožňuje pristupovať k smerovaču a konfigurovať ho vzdialene z internetu."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step_title",
                           content: "Nastavenie vzdialeného manažmentu"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step1",
                           content: "1. Vyberte začiarkavacie políčko, čim zapnete funkciu vzdialeného manažmentu."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step2",
                           content: "2. Port HTTPS a port HTTP ponechajte v predvolených nastaveniach."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step3",
                           content: "3. Vyberte možnosť, ktoré vzdialené zariadenie bude môcť pristupovať ku smerovaču vzdialene:",
       children: [{                      
                           type: "name",
                           title: "Všetky zariadenia",
                           content: "Ku smerovaču môžu pristupovať všetky vzdialené zariadenia."
                       } ,{                      
                           type: "name",
                           title: "Určené zariadenie",
                           content: "Zadajte IP adresu vzdialeného zariadenia na prístup ku smerovaču."
                       }]
} ,{                      
                           type: "paragraph",
                           id: "admin_remote_step4",
                           content: "4. Kliknite na tlačidlo Uložiť."
                       } ,{                      
                           type: "paragraph",
                           content: "Teraz môžete smerovač vzdialene spravovať prostredníctvom adresy zobrazenej v poli webová adresa pre manažment."
                       } ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Ak sa pri vzdialenej návšteve vyššie uvedenej adresy zobrazí varovanie, kliknite na možnosť Dôverovať (alebo podobnú) a pokračujte."
                       }]
},
       LED_CONTROL_SETTINGS :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "paragraph",
                           content: "Po zapnutí Nočného režimu sa kontrolky LED každý deň vypnú v priebehu stanoveného obdobia, čo však neovplyvní výkon smerovača."
                       } ,{                      
                           type: "step",
                           title: "Zapnutie Nočného režimu",
       content: [ 
                "1. Vyberte možnosť Zapnúť Nočný režim.",
                "2. Určite časové obdobie, v ktorom sa kontrolky LED vypnú.",
                "3. Kliknite na Uložiť."]
}]
},
       SYSTEM_LOG :{ 
               TITLE:"Systémový záznam",
               CONTENT: [{
                           type: "paragraph",
                           content: "Systémový záznam zobrazuje najnovšie činnosti smerovača. Tabuľku tvorí druh, úroveň a záznamový obsah systémových záznamov, ktoré je možné filtrovať na zobrazenie. Môžete tiež uložiť systémové záznamy na miestny počítač alebo ich poslať e-mailom."
                       } ,{                      
                           type: "step",
                           title: "Uloženie systémových záznamov na miestny počítač",
       content: [ 
                "1. Nastavte druh a minimálnu úroveň na filtrovanie požadovaných systémových záznamov. Zoznam Úroveň je usporiadaný v zostupnom poradí, pričom najnižšia úroveň je uvedená ako posledná.",
                "2. Kliknite na tlačidlo Uložiť záznam na uloženie súboru systémových záznamov na miestny počítač."]
} ,{                      
                           type: "step",
                           title: "Doručenie systémových záznamov e-mailom",
       content: [ 
                "1. Nastavte druh a úroveň na filtrovanie požadovaných systémových záznamov. Zoznam Úroveň je usporiadaný v zostupnom poradí, pričom najnižšia úroveň je uvedená ako posledná.",
                "2. Kliknite na možnosť Nastavenia e-mailu.",
                "3. Do poľa Komu zadajte platnú e-mailovú adresu, ktorá sa má použiť pre odchádzajúcu poštu.",
                "4. Do poľa Komu zadajte platnú e-mailovú adresu, ktorá sa má použiť pre prichádzajúcu poštu.",
                "5. Zadajte adresu servera SMTP odchádzajúcich e-mailov (Od).",
                "Poznámka: Ak si odchádzajúci e-mail vyžaduje overenie, označte začiarkavacie políčko Zapnúť overenie a zadajte používateľské meno (e-mailovú adresu) a heslo.",
                "6. Ak chcete pravidelne dostávať systémové záznamy prostredníctvom e-mailu, označte začiarkavacie políčko Zapnúť automatický e-mail a nastavte konkrétny čas (v 24-hodinovom formáte) alebo časový interval.",
                "Ak chcete okamžite dostať aktuálne systémové záznamy, kliknite na možnosť Poslať záznam e-mailom.",
                "7. Kliknite na tlačidlo Uložiť."]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"Monitor prevádzky",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazuje využívanie prenosu zariadením v uplynulých 10 minútach alebo všetkými zariadeniami v uplynulých 10 minútach/24 hodinách/7 dňoch."
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"Zoznam monitora prevádzky",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zoznam je zoskupený podľa druhu pripojenia zariadení: káblové alebo bezdrôtové."
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"Systémový parameter",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wifi_title",
                           title: "Bezdrôtové pripojenie 2,4 GHz / 5 GHz",
                           content: "Tento oddiel umožňuje nakonfigurovať parametre pravidiel prenosu v bezdrôtových sieťach. Odporúča sa zachovať predvolené nastavenia, pokiaľ si nie ste istí správnymi nastaveniami v konkrétnom prípade."
                       } ,{                      
                           type: "name",
                           title: "Signálny interval",
                           content: "Zadajte hodnotu od 40 do 1000 v milisekundách, čím určíte čas medzi signálnymi paketmi, ktoré vysiela smerovač na synchronizáciu s bezdrôtovou sieťou. Predvolená hodnota je 100 milisekúnd."
                       } ,{                      
                           type: "name",
                           title: "Prah RTS",
                           content: "Zadajte hodnotu od 1 do 2346, čím určíte veľkosť paketu pri prenose dát cez smerovač. Ako predvolená možnosť je veľkosť prahu RTS (Request to Send) 2346. Ak je veľkosť paketu väčšia než predvolený prah, smerovač odošle určitej prijímacej stanici požiadavku na odoslanie rámcov a určí odoslanie dátového rámca, alebo ak nie, paket sa okamžite odošle."
                       } ,{                      
                           type: "name",
                           title: "Interval DTIM",
                           content: "Táto hodnota určuje interval správy DTIM (Delivery Traffic Indication Message). Zadajte hodnotu intervalu od 1 do 15. Predvolený interval je 1 a indikuje, že interval DTIM je rovnaký ako signálny interval (Beacon Interval)."
                       } ,{                      
                           type: "name",
                           title: "Perióda aktualizácie skupinového kľúča",
                           content: "Zadajte počet sekúnd (minimálne 30), čím ovládate časový interval pre automatickú obnovu šifrovacieho kľúča. Predvolená hodnota je 0, čo znamená, že kľúč sa neobnovuje."
                       } ,{                      
                           type: "name",
                           title: "Funkcia WMM",
                           content: "Funkcia WMM garantuje preferenčný prenos paketov správ s vysokou prioritou. Ako predvolená možnosť je zapnutá a dôrazne sa odporúča."
                       } ,{                      
                           type: "name",
                           title: "Krátka GI Funkcia",
                           content: "Táto funkcia je predvolene zapnutá a odporúča sa na zvýšenie dátovej kapacity časom GI (Guard Interval GI)."
                       } ,{                      
                           type: "name",
                           title: "Funkcia AP Isolation",
                           content: "Ak chcete skryť a zakázať všetkým bezdrôtovým zariadeniam pripojeným k sieti, aby spolu komunikovali, ale zároveň chcete, aby mali prístup na internet, označte začiarkavacie políčko Zapnúť izoláciu AP."
                       }]
},
       SYSTEM_PARA_WDS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wds_title",
                            title: "2,4GHz/5GHz WDS"
                       } ,{                      
                           type: "step",
                           title: "Zapnutie WDS",
                           content: "Funkcia Premostenie WDS (Wireless Distribution System) umožňuje rozšíriť pokrytie bezdrôtovej siete premostením s AP (prístupový bod) v bezdrôtovej sieti WLAN (miestna sieť)."
                       } ,{                      
                           type: "step",
       content: [ 
                "1. Vyberte na povolenie funkcie Premostenie WDS.",
                "2. Ak chcete premostiť sieť pomocou funkcie Vyhľadať: Kliknite na možnosť Vyhľadať na vyhľadanie a zobrazenie všetkých dostupných sietí a vyberte sieť, ktorú chcete premostiť. Automaticky sa vyplnia polia SSID (názov siete), adresa MAC a Zabezpečenie.",
                "Ak chcete sieť premostiť ručne: zadajte SSID (názov siete), adresu MAC a Režim WDS siete, ktorá sa má premostiť. Vyberte Typ zabezpečenia a zadajte súvisiace parametre, ktoré by mali byť rovnaké ako sieť, ktorá sa má premostiť.",
                "3. Kliknite na Uložiť."]
} ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Ak si nie ste istí režimom WDS, ponechajte predvolenú možnosť Auto."
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "WPS",
                           content: "Protokol WPS (Wi-Fi Protected Setup) umožňuje jednoduché pripojenie zariadení s funkciou WPS k smerovaču stlačením tlačidla WPS. Označte túto možnosť, ak chcete zapnúť funkciu WPS a kliknite na možnosť Uložiť."
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "NAT",
                           content: "Táto funkcia je zapnutá ako predvolená možnosť. Odporúča sa zachovať predvolené nastavenie. Ak ho vypnete, môžete stratiť prístup na internet."
                       } ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Keď je NAT vypnuté, konfigurácie vo funkcii Presmerovanie NAT sa neuplatnia. "
                       } ,{                      
                           type: "name",
                           id: "sys_para_nat_boost",
                           title: "NAT Boost",
                           content: "Označte začiarkavacie políčko Zapnúť NAT Boost a kliknite na príkaz Uložiť, čím zaistíte, že váš smerovač bude mať tú najlepšiu priechodnosť."
                       } ,{                      
                           type: "note",
                           id: "sys_para_nat_boost_note",
                           title: "Poznámka",
                           content: "Ak je zapnutá funkcia NAT Boost, funkcia QoS a Štatistika prenosu údajov sa automaticky vypne."
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Nastavenia ochrany DOS",
                           content: "Úroveň ochrany DOS chráni smerovač pred útokmi ICMP-FLOOD, UDP-FLOOD a TCP-FLOOD."
                       } ,{                      
                           type: "name",
                           title: "ICMP-FLOOD na úrovni paketov",
                           content: "Zadajte hodnotu od 5 do 7200, čím sa spustí ochrana ICMP-FLOOD hneď po tom, ako množstvo paketov ICMP presiahne nastavenú prahovú hodnotu."
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD na úrovni paketov",
                           content: "Zadajte hodnotu od 5 do 7200 paketov UDP, čím sa spustí ochrana UDP-FLOOD hneď po tom, ako počet paketov UDP presiahne nastavenú prahovú hodnotu."
                       } ,{                      
                           type: "name",
                           title: "TCP-FLOOD na úrovni paketov",
                           content: "Zadajte hodnotu od 5 do 7200 paketov TCP-SYN, čím sa spustí ochrana TCP-SYN-FLOOD hneď po tom, ako počet paketov TCP presiahne nastavenú prahovú hodnotu."
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Duplexný",
                           content: "Z rozbaľovacej ponuky vyberte duplexný typ a kliknite na tlačidlo Uložiť."
                       }]
},
       SYSTEM_PARA_LED :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "name",
                           title: "Zapnúť",
                           content: "Výberom tohto začiarkavacieho políčka sa vypnú všetky indikátory LED počas obdobia nočného režimu bez obmedzenia výkonnosti smerovača."
                       } ,{                      
                           type: "name",
                           title: "Doba trvania nočného režimu",
                           content: "Nastavte časové obdobie, počas ktorého bude platiť nočný režim."
                       } ,{                      
                           type: "paragraph",
                           content: "Kliknutím na Uložiť uložíte všetky vaše nastavenia."
                       }]
},
       OPEN_VPN :{ 
               TITLE:"OpenVPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Prostredníctvom funkcie OpenVPN môžete použiť internet na zabezpečený prístup k sieti, keď ste mimo domova. Ak chcete použiť VPN službu, je potrebné konfigurovať službu dynamického DNS (odporúčané) alebo priradiť statickú IP adresu portu WAN smerovača. Systémový čas by mal byť synchronizovaný s internetom."
                       } ,{                      
                           type: "name",
                           title: "Typ služby",
                           content: "Vyberte komunikačný protokol pre server OpenVPN: UDP alebo TCP."
                       } ,{                      
                           type: "name",
                           title: "Port služby",
                           content: "Zadajte číslo komunikačného portu v rozsahu 1024 až 65535. Predvolený a bežný služobný port je 1194."
                       } ,{                      
                           type: "name",
                           title: "Podsieť/sieťová maska VPN",
                           content: "Zadajte rozsah IP adries, ktoré si môžu klienti prenajať od servera OpenVPN."
                       } ,{                      
                           type: "name",
                           title: "Klientsky prístup",
                           content: "Vyberte typ pripojenia pre klienta OpenVPN.",
       children: [{                      
                           type: "name",
                           title: "Iba domáca sieť",
                           content: "Klient môže pristupovať len na domácu sieť. Predvolená cesta pre klienta sa nebude meniť."
                       } ,{                      
                           type: "name",
                           title: "Internet a domáca sieť",
                           content: "Klienti môžu mať prístup k domácej sieti a internetovým stránkam alebo službám s geografickým obmedzením, keď sú mimo svojej krajiny. Predvolená cesta pre klienta sa bude meniť."
                       }]
}]
},
       OPEN_VPN_CERTIFICATE :{ 
               TITLE:"Certifikát",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Použite certifikát pre informácie a identitu VPN pripojenia pre vzdialený počítač.",
                "Kliknutím vygenerujete nový certifikát."]
}]
},
       OPEN_VPN_CONF :{ 
               TITLE:"Súbor s konfiguráciou",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Diaľkoví klienti použijú pre prístup k smerovaču konfiguračný súbor.",
                "Kliknutím na toto tlačidlo uložíte súbor s konfiguráciou OpenVPN, ktorý sa použije na pridanie nového VPN pripojenia."]
}]
},
       OPEN_VPN_GUIDE :{ 
               TITLE:"Návod na inštaláciu VPN klienta",
               CONTENT: [{
                           type: "step",
                           title: "Pripojenie klientských zariadení k serveru OpenVPN:",
       content: [{                      
                           type: "paragraph",
                           content: "Skôr ako nakonfigurujete server OpenVPN, nakonfigurujte službu dynamického DNS (odporúčané) alebo priraďte statickú IP adresu pre port WAN. Ubezpečte sa tiež, či externý port nastavení NAT nie je servisným portom a či je váš systémový čas synchronizovaný s internetom."
                       },
                "1. Zvoľte možnosť Povoliť server VPN.",
                "2. Nakonfigurujte parametre servera OpenVPN (typ služby, servisný port, adresu klienta a VPN podsieť/masku siete) a kliknite na možnosť Uložiť.",
                "3. Kliknite na tlačidlo Exportovať, čím sa uloží konfiguračný súbor.",
                "4. Vo klientských zariadeniach prevezmite a nainštalujte program pre klienta OpenVPN pomocou odkazu <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a>",
                "Oficiálne podporované platformy sú Windows, Mac OSX a Linux.",
                "5. Spustite program pre klienta OpenVPN a pridajte nové pripojenie VPN pomocou uloženého konfiguračného súboru, aby ste mohli pripojiť svoje klientské zariadenie k serveru VPN."]
} ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Ďalšie informácie o klientoch OpenVPN nájdete na <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
                       }]
},
       PPTP_VPN :{ 
               TITLE:"PPTP VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "So serverom PPTP VPN môžete použiť internet na jednoduchý a rýchly prístup k sieti, keď ste mimo domova. Niektorí poskytovatelia internetových služieb môžu zakázať používanie tejto funkcie. Ak chcete použiť VPN službu, je potrebné konfigurovať službu dynamického DNS (odporúčané) alebo priradiť statickú IP adresu portu WAN smerovača. Systémový čas by mal byť synchronizovaný s internetom."
                       } ,{                      
                           type: "name",
                           title: "Klientska IP adresa",
                           content: "Zadajte rozsah IP adries (až do 10 klientov), ktoré môže server PPTP VPN prenajímať klientom."
                       } ,{                      
                           type: "name",
                           title: "Meno používateľa a heslo",
                           content: "Zadajte meno používateľa a heslo na overovanie klientov voči serveru PPTP VPN."
                       }]
},
       PPTP_VPN_GUIDE :{ 
               TITLE:"Návod na inštaláciu VPN klienta",
               CONTENT: [{
                           type: "step",
                           title: "Ak chcete pripojiť klientské zariadenia k serveru PPTP VPN:",
       content: [{                      
                           type: "paragraph",
                           content: "Skôr ako nakonfigurujete server PPTP VPN nakonfigurujte službu dynamického DNS (odporúčané) alebo priraďte statickú IP adresu pre port WAN. Ubezpečte sa, či externý port nastavení NAT nie je 1723 a či je váš systémový čas synchronizovaný s internetom."
                       },
                "1. Zvoľte možnosť Povoliť server VPN.",
                "2. Nakonfigurujte parametre servera PPTP VPN a kliknite na možnosť Uložiť.",
                "3. Vo klientských zariadeniach vytvorte pripojenie PPTP VPN. Oficiálne podporované platformy sú Windows, Mac OSX, Linux, iOS a Android.",
                "4. Spustite program PPTP VPN, pridajte nové pripojenie a zadajte názov domény registrovanej služby DDNS alebo statickú IP adresu, priradenú k portu WAN, aby ste mohli pripojiť klientské zariadenia k serveru PPTP VPN."]
}]
},
       VPN_CONNNECTION :{ 
               TITLE:"Pripojenia VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Na tejto stránke sa zobrazujú klienti, ktorí sú práve pripojení k serverom OpenVPN a PPTP VPN hosťovaným na smerovači."
                       }]
},
       BASIC_NETWORK :{ 
               TITLE:"Mapa siete",
               CONTENT: [{
                           type: "paragraph",
                           content: "V Mape siete môžete zobraziť aktuálny stav sieťového pripojenia, bezdrôtové informácie smerovača a informácie pripojených zariadení."
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazuje internetové informácie."
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"Smerovač",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazuje aktuálne sieťové informácie bezdrôtových sietí a portov LAN."
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"Klienti káblovej siete/Bezdrôtoví klienti",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazuje názov siete (upraviteľný) a priradené adresy IP a MAC pripojených klientov smerovača."
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"Tlačiareň",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazí sa názov tlačiarne pripojenej ku smerovaču."
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"Disk USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazuje relevantné informácie disku USB pripojeného k smerovaču cez port USB."
                       }]
},
       BASIC_SPEED_TEST :{ 
               TITLE:"Test rýchlosti",
               CONTENT: [{
                           type: "paragraph",
                           content: "Pomocou tejto funkcie sa testujú aktuálne rýchlosti odovzdávania a preberania, ktoré vám poskytuje váš poskytovateľ služby a poskytuje aj užitočné rady ohľadom možností vášho internetu."
                       } ,{                      
                           type: "paragraph",
                           content: "Tip: Aby ste získali presnejší výsledok, skúste zatvoriť ostatné aplikácie a programy."
                       } ,{                      
                           type: "paragraph",
                           content: "História - záznam predchádzajúcich testov rýchlosti."
                       } ,{                      
                           type: "paragraph",
                           content: "Testovať znova - kliknutím uskutočníte test rýchlosti."
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Kliknite na možnosť Automatická detekcia alebo vyberte typ internetového pripojenia manuálne. Potom zadajte príslušné parametre oznámené poskytovateľom internetových služieb."
                       }]
},
       BASIC_WIRELESS_SMART_CONNECT :{ 
               TITLE:"Smart Connect",
               CONTENT: [{
                           type: "paragraph",
                           content: "Výberom tohto začiarkavacieho políčka povolíte funkciu smart connect. Táto funkcia podporuje rýchlejší chod zariadení tým, že im priradí najlepšie bezdrôtové pásma podľa aktuálnych podmienok s cieľom vyvažovať nároky siete."
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"Nastavenie bezdrôtového prenosu",
               CONTENT: [{
                           type: "paragraph",
                           content: "Môžete nakonfigurovať bezdrôtové nastavenia (SSID, heslo atď.)"
                       } ,{                      
                           type: "name",
                           title: "Názov siete (SSID)",
                           content: "Odporúča sa zmeniť názov siete (SSID). V tomto poli sa rozlišujú veľké a malé písmená."
                       } ,{                      
                           type: "name",
                           title: "Skryť SSID",
                           content: "Začiarknite toto políčko, ak chcete skryť názov siete (SSID) 2,4 GHz/5 GHz v zozname bezdrôtových sietí. Ak je táto možnosť vybraná, sieť SSID nebude vysielaná a musíte sa k nej pripojiť manuálne."
                       } ,{                      
                           type: "name",
                           title: "Heslo",
                           content: "Zadajte heslo bezdrôtového pripojenia, 8 až 63 znakov ASCII alebo 8 až 64 hexadecimálnych znakov. Toto pole je citlivé na veľké a malé písmená."
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
               TITLE:"Úložné zariadenie USB",
               CONTENT: [{
                           type: "paragraph",
                           content: "Táto funkcia umožňuje zdieľať úložné zariadenia USB medzi rôznymi klientmi v miestnej sieti alebo prostredníctvom internetu."
                       } ,{                      
                           type: "title",
                           title: "Nastavenie zariadenia",
                           content: "Na obrazovke Nastavenie zariadenia sa zobrazia základné informácie úložného zariadenia USB pripojeného cez port USB. Flash disk USB už má len jeden zväzok."
                       } ,{                      
                           type: "name",
                           title: "Skenovať",
                           content: "Smerovač zvyčajne automaticky zistí akékoľvek nové pripojené zariadenie. V opačnom prípade môžete kliknutím na toto tlačidlo vyhľadať a obnoviť obrazovku s aktualizovanými informáciami.",
       children: [{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Sivá oblasť predstavuje zväzok, ktorý je vypnutý. Kliknutím na túto oblasť môžete zdielať konkrétny zväzok."
                       }]
} ,{                      
                           type: "name",
                           title: "Odstrániť",
                           content: "Kliknutím na toto tlačidlo bezpečne odoberiete úložné zariadenie USB predtým, než ho fyzicky odpojíte od smerovača.",
       children: [{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Tlačidlo Odstrániť sa zobrazuje len vtedy, keď je úložné zariadenie USB pripojené k smerovaču. Ak je aktuálny zväzok zaneprázdnený, nemôžete ho odmontovať."
                       }]
} ,{                      
                           type: "step",
                           title: "Nainštalovanie súborového servera",
       content: [ 
                "1. Pripojte úložné zariadenie USB k portu USB priamo alebo pomocou kábla USB. Ak zariadenie vyžaduje združené externé napájanie, skontrolujte, či je napájanie pripojené.",
                "2. Nové pripojené zariadenie USB by malo byť zistené smerovačom automaticky a informácie by sa mali zobraziť v oddiele Nastavenie zariadenia. V opačnom prípade kliknite na príkaz Vyhľadať.",
                "Poznámka: Ikona Zdieľať sa zobrazí, keď je k smerovaču pripojených viac ako 5 zväzkov. Môžete kliknúť na ikonu a vypnúť zväzky, ktoré nemusíte zdieľať."]
}]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"Prístupová adresa",
               CONTENT: [{
                           type: "name",
                           title: "Názov siete/mediálneho servera",
                           content: "Zobrazuje sa názov použitý na prístup k pripojenému úložnému zariadeniu USB prostredníctvom metódy Susedstvo siete alebo Zdieľanie médií. Predvolene je to TP-Share."
                       } ,{                      
                           type: "name",
                           title: "Prístupová metóda",
                           content: "Existujú 4 metódy prístupu k zdieľanému úložnému zariadeniu USB.",
       children: [{                      
                           type: "name",
                           title: "Susedstvo siete",
                           content: "Vyberte túto možnosť, ak chcete umožniť používateľom v sieti pristupovať k zdieľanému obsahu cez adresu zobrazenú v stĺpci Adresa."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Vyberte túto možnosť na zapnutie funkcie servera FTP, ktorý umožňuje klientom a používateľom FTP v sieti prístup k úložnému zariadeniu USB cez adresu FTP zobrazenú v stĺpci Adresa."
                       } ,{                      
                           type: "name",
                           title: "FTP (cez Internet)",
                           content: "Vyberte túto možnosť, ak chcete umožniť klientom a používateľom FTP vzdialený prístup, preberanie a nahrávanie súborov do zdieľaného úložného zariadenia USB cez FTP po internete. Ak chcete prispôsobiť prístupovú adresu, kliknite na tlačidlo Upraviť a nastavte Dynamický DNS pre smerovač. Ak chcete zmeniť číslo portu servera FTP, zadajte nové číslo portu a kliknite na možnosť Uložiť, čím sa zmeny aplikujú."
                       } ,{                      
                           type: "name",
                           title: "SFTP",
                           content: "Vyberte túto možnosť, ak chcete zapnúť funkciu servera SFTP, ktorá umožňuje klientom SFTP a používateľom na sieti pristupovať k úložnému zariadeniu USB pomocou adresy SFTP, zobrazenej v stĺpci Adresa."
                       }]
} ,{                      
                           type: "name",
                           title: "Adresa",
                           content: "Zobrazí sa adresa, ktorá sa používa na prístup k zdieľanému úložnému zariadeniu USB."
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "Zobrazuje číslo portu použité na prístup k serveru FTP."
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"Zdieľanie obsahu",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazí priečinky, ktoré zdieľate. Predvolene sa zdieľajú všetky priečinky. Môžete kliknúť na ikonu Upraviť na prispôsobenie zdieľaných priečinkov."
                       } ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Ikona Zdieľať sa zobrazí v oddieli Nastavenia zariadenia, keď je k smerovaču pripojených viac ako 5 zväzkov. Môžete kliknúť na ikonu Zdieľať a vypnúť zväzky, ktoré nemusíte zdieľať."
                       }]
},
       FOLDER_SHARING :{ 
               TITLE:"Zdieľanie obsahu a zabezpečenia",
               CONTENT: [{
                           type: "name",
                           title: "Zdieľanie obsahu",
                           content: "Zobrazí priečinky, ktoré zdieľate. Predvolene sa zdieľajú všetky priečinky. Môžete kliknúť na ikonu Upraviť na prispôsobenie zdieľaných priečinkov.",
       children: [{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Ikona Zdieľať sa zobrazí v oddieli Nastavenia zariadenia, keď je k smerovaču pripojených viac ako 5 zväzkov. Môžete kliknúť na ikonu Zdieľať a vypnúť zväzky, ktoré nemusíte zdieľať."
                       }]
} ,{                      
                           type: "name",
                           title: "Overenie prístupu",
       content: [ 
                "Prepnite na Zap overovanie, ktoré bude od používateľov vyžadovať zadanie platného používateľského mena a hesla pre prístup k zdieľaným priečinkom. Prístup ako správca umožní čítať a upravovať súbory, kým používateľ môže súbory iba čítať.",
                "Používateľské meno by malo začínať písmenom alebo podčiarnikom a obsahovať 1 až 15 znakov písmen, číslic a podčiarnikov.",
                "Heslo by malo obsahovať 1 až 15 znakov písmen, číslic a podčiarnikov."]
} ,{                      
                           type: "name",
                           title: "Povoliť prístup z hosťovskej siete",
                           content: "Zapnite túto možnosť, ak chcete umožniť používateľom hosťovskej siete prístup ku všetkým zdieľaným priečinkom."
                       } ,{                      
                           type: "name",
                           title: "Zapnúť zdieľanie médií",
                           content: "Ak je táto funkcia zapnutá, všetky zariadenia podporované DLNA v miestnej sieti môžu pristupovať k mediálnym súborom vo všetkých zdieľaných priečinkoch. Od používateľov sa nebude vyžadovať zadanie používateľského mena alebo hesla, dokonca ak je povolená možnosť Overenie prístupu."
                       }]
},
       BASIC_PRINT_SERVER :{ 
               TITLE:"Tlačový server",
               CONTENT: [{
                           type: "name",
                           title: "Tlačový server",
                           content: "Zapnite túto možnosť na zapnutie funkcie tlačového servera."
                       } ,{                      
                           type: "name",
                           title: "Názov tlačiarne",
                           content: "Zobrazí sa názov tlačiarne pripojenej k smerovaču."
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"Rodičovská kontrola",
               CONTENT: [{
                           type: "paragraph",
                           content: "So základnými nastaveniami rodičovskej kontroly môžete obmedziť prístup na určité časy v rámci dňa (napríklad žiadny prístup na internet z detského počítača v čase prípravy na vyučovanie)."
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"Zariadenia podliehajúce rodičovskej kontrole",
               CONTENT: [{
                           type: "paragraph",
                           content: "V tejto tabuľke sú uvedené informácie a nastavenia zariadení, ktoré sú aktuálne zakázané funkciou Rodičovská kontrola."
                       } ,{                      
                           type: "step",
                           title: "Obmedzenie nového klientskeho zariadenia",
       content: [ 
                "1. Zapnite funkciu Rodičovská kontrola.",
                "2. Kliknite na tlačidlo Pridať.",
                "3. Kliknite na možnosť Vyhľadať a zvoľte aktuálne pripojené zariadenie zo zoznamu zariadení s prístupom alebo zadajte Názov zariadenia a Adresu MAC ručne a pridajte zariadenie, ktoré nie je pripojené.",
                "4. Kliknite na ikonu Efektívny čas a určite časový úsek, počas ktorého platí obmedzenie.",
                "5. Zadajte krátky opis do poľa Opis. Toto pole je voliteľné.",
                "6. Vyberte možnosť Aktivovať tento záznam.",
                "7. Kliknite na tlačidlo Uložiť."]
} ,{                      
                           type: "note",
                           title: "Poznámka",
                           content: "Ak chcete túto položku vypnúť, kliknite na ikonu Žiarovka."
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"Hosťovská sieť",
               CONTENT: [{
                           type: "paragraph",
                           content: "Táto funkcia umožňuje poskytnúť prístup Wi-Fi hosťom bez zverejnenia hlavnej siete."
                       } ,{                      
                           type: "name",
                           title: "Umožniť hosťom vzájomný prístup",
                           content: "Označte toto začiarkavacie políčko na umožnenie bezdrôtovým zariadeniam, aby komunikovali medzi sebou prostredníctvom metód, ako je susedstvo siete, Samba, Ping a FTP."
                       } ,{                      
                           type: "name",
                           title: "Umožniť hosťom prístup na moju miestnu sieť",
                           content: "Označte toto začiarkavacie políčko na umožnenie bezdrôtovým zariadeniam v hosťovskej sieti, aby komunikovali so zariadeniami pripojenými k portom LAN smerovača alebo hlavnej sieti prostredníctvom metód, ako je susedstvo siete, Samba, Ping a FTP."
                       } ,{                      
                           type: "name",
                           title: "Zapnúť hosťovskú sieť",
                           content: "Začiarknutím tohto políčka zapnete funkciu hosťovskej siete."
                       } ,{                      
                           type: "name",
                           title: "Názov siete (SSID)",
                           content: "Môžete použiť predvolený názov hosťovskej siete (SSID), alebo vytvoriť nový názov (až 32 znakov)."
                       } ,{                      
                           type: "name",
                           title: "Skryť SSID",
                           content: "Začiarknite toto políčko, ak chcete skryť názov hosťovskej siete (SSID) zo zoznamu Wi-Fi sietí."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Interval aktualizácie hesla",
                           content: "Vyberte interval aktualizácie hesla hosťovskej siete."
                       } ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Heslo",
                           content: "Vytvorte heslo s dĺžkou 8 až 63 ASCII znakov alebo 8 až 64 hexadecimálnych znakov (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Heslo",
                           content: "Použite buď náhodne vygenerované heslo alebo si vytvorte heslo v dĺžke 8 až 63 znakov ASCII alebo v dĺžke 8 až 64 hexadecimálnych znakov (0-9, a-f, A-F)."
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"TP-Link Cloud",
               CONTENT: [{
                           type: "paragraph",
                           content: "Služba TP-Link Cloud vám umožní diaľkovo monitorovať vašu sieť v reálnom čase, pristupovať a spravovať vaše zariadenia TP-Link z Internetu kedykoľvek a odkiaľkoľvek."
                       }]
},
       ACCOUNT_INFO :{ 
               TITLE:"Informácie o účte",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazia sa vaše informácie o identifikácii TP-Link ID. Informácie o účte môžete upravovať po kliknutí na ikonu Upraviť."
                       }]
},
       DEVICE_INFO :{ 
               TITLE:"Informácie o zariadení",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zobrazí informácie o vašom zariadení, vrátane cloudového účtu, ktorý spravuje zariadenie."
                       }]
},
       BOUND_ACCOUNT :{ 
               TITLE:"Pripojené účty",
               CONTENT: [{
                           type: "paragraph",
                           content: "Táto tabuľka uvádza všetky cloudové účty, ktoré sú aktuálne spojené so zariadením."
                       } ,{                      
                           type: "step",
                           title: "Spojiť používateľský účet",
       content: [ 
                "1. Kliknite na Spojiť.",
                "2. Zadajte registrovaný email, ktorý chcete spojiť.",
                "3. Kliknite na Uložiť."]
}]
},
       NEW_PARENTAL_CONTROL :{ 
               TITLE:"Rodičovská kontrola",
               CONTENT: [{
                           type: "paragraph",
                           content: "Vďaka filtrom vekovej úrovne, obmedzeniam prístupu a používateľským profilom, poskytuje rodičovská kontrola vašej rodine personalizovaný a vhodný prístup na internet."
                       } ,{                      
                           type: "step",
                           title: "Aplikovanie rodičovskej kontroly na nové zariadenie",
       content: [ 
                "1. Kliknite na tlačidlo pridať.",
                "2. Zadajte názov pre tento profil a kliknite na „+“, ak chcete do tohto profilu pridať zariadenia.",
                "3. Vyberte úroveň filtra a prispôsobte obsah filtra podľa svojich potrieb. Do našej databázy môžete zadať kľúčové slová na vyhľadávanie webových lokalít, ktoré chcete filtrovať. Iné webové lokality (URL) je možné zadať ručne.<br/>Pre rôzne kategórie filtrov sa pozrite na nasledujúce vysvetlenia:<p>Obsah pre dospelých - Lokality, ktoré obsahujú sexuálny, násilný alebo ilegálny obsah, vrátane pornografie, zneužívania látok, násilia a diskriminácie</p><p>Hráčstvo - Lokality, ktoré podporujú alebo poskytujú informácie o hráčstve, vrátane online hráčskych lokalít</p><p>Sexuálna výchova - Lokalitu, kde sa informatívne diskutuje o sexualite, vrátane reprodukcie, sexualite, bezpečnom sexe a kontrole pôrodnosti, sexuálne prenosných chorobách a vyrovnávaní sa so sexuálnou traumou</p><p>Online komunikácia - Lokality, ktoré hostia formáty komunikácie s inými prostredníctvom textu, hlasu alebo videa, vrátane e-mailu, blogov, online fór, VoIP a video diskusné služby</p><p>Sociálne siete - Lokality, ktoré rozširujú osobné vyjadrenia alebo komunikáciu, spájajú ľudí a ich osobnú aktivitu na základe podobných záujmov, zamestnaní, pozadí alebo poznatkov o bežnom živote</p><p>Platené surfovanie - Lokality, ktoré za zobrazenie určitých webových lokalít, e-mailových správ alebo reklám, prepojení na kliknutie alebo odpovedí na prieskumy, kompenzujú používateľov</p><p>Médiá - lokality, ktoré poskytujú zdarma, za úhradu, alebo ako predplatné audio alebo video obsah, vrátane streamových služieb, TV programu alebo hudobných preberaní.</p><p>Preberania - Lokality, ktoré poskytujú alebo sprístupňujú zdieľanie súborov a ich distribúciu, vrátanie zdieľania peer-to-peer, ukladanie súborov a obsahu mobilného zariadenia online (napr., hudbu a aplikácie)</p><p>Hry - Lokality, ktoré poskytujú alebo sprístupňujú webové alebo prevzateľné hry, vrátane hrania online, sietí pre herné konzoly a hry v prehliadači</p>",
                "4. Ak chcete obmedziť celkový čas, ktorý tento profil môže stráviť online, zapnite a určite časové limity. Je možné tiež použiť funkciu Čas spánku na nastavenie každodenného časového úseku, počas ktorého zariadenia pod týmto profilom nemôžu používať internet.",
                "5. Kliknite na tlačidlo Uložiť."]
} ,{                      
                           type: "step",
                           title: "Zobrazenie podrobnej histórie internetu daného profilu",
       content: [ 
                "1. V stĺpci Prehľad kliknite na príslušné tlačidlo Prehľad.",
                "2. Ak chcete zobraziť viacero záznamov, kliknite na ikonu História <span class=\"ptl-ctr-help-icon history\"></span>.",
                "3. Webové lokality môžete zablokovať alebo odblokovať kliknutím na ikonu <span class=\"ptl-ctr-help-icon block\"></span> alebo <span class=\"ptl-ctr-help-icon unblock\"></span>."]
} ,{                      
                           type: "step",
                           title: "Ak chcete ihneď vypnúť alebo zapnúť prístup na internet",
       content: [ 
                "V stĺpci Prístup na internet, kliknite na ikonu <span class=\"ptl-ctr-help-icon stop\"></span>, čím zabránite zariadeniam príslušného profilu v prístupe na internet a kliknutím na ikonu <span class=\"ptl-ctr-help-icon enable\"></span> prístup znova zapnete."]
}]
},
       BASIC_QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcia QoS (Kvalita služby) určuje prioritu online aktivít a zariadení, aby sa zaručilo rýchlejšie sieťové pripojenie, keď ho najviac potrebujete."
                       } ,{                      
                           type: "paragraph",
                           content: "Na určenie priority rýchlosti siete pre online aktivity vyberte položku Priorita aplikácií a na určenie priority rýchlosti siete pre zariadenia vyberte položku Priorita zariadení."
                       }]
},
       BASIC_APPLICATION_PRIORITY :{ 
               TITLE:"Priorita aplikácií",
               CONTENT: [{
                           type: "paragraph",
                           content: "Vyberte online aktivitu, ktorej chcete zvýšiť prioritu, alebo kliknite na Vlastné a nastavte úroveň priority každej online aktivity."
                       }]
},
       BASIC_DEVICE_PRIORITY :{ 
               TITLE:"Priorita zariadení",
               CONTENT: [{
                           type: "paragraph",
                           content: "Vyberte zariadenie(-a), ktorým chcete zvýšiť prioritu a ako dlho budú mať prioritu zvýšenú."
                       } ,{                      
                           type: "step",
                           title: "Ak chcete zvýšiť prioritu zariadenia",
       content: [ 
                "1. Nájdite v zozname zariadenie, ktorému chcete zvýšiť prioritu a zapnite Prioritu.",
                "2. Vyberte, ako dlho bude mať zariadenie zvýšenú prioritu v stĺpci Časovanie."]
}]
},
       ANTI_VIRUS :{ 
               TITLE:"Antivírus",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcia Antivírus vďaka častému skenovaniu siete, detekcii škodlivých lokalít a izolácii infikovaných zariadení udrží vaše osobné informácie v bezpečí. Môžete tiež skontrolovať, ako je vaša sieť chránená a či prebehli nejaké útoky na vašu sieť."
                       } ,{                      
                           type: "paragraph",
                           content: "História - Zaznamenáva zariadenia, ktoré boli ochránené funkciou Antivírus a zdroj a klasifikáciu útokov."
                       } ,{                      
                           type: "paragraph",
                           content: "Zapnúť všetko - Ťuknite a zapnete všetky typy ochrany, ak nie je jedna alebo viacero z nich zapnutých."
                       } ,{                      
                           type: "paragraph",
                           content: "Typy ochrany - Zapnite typy ochrany podľa vysvetliviek. Odporúča sa zapnúť všetky Typy ochrany."
                       }]
},
       APPLICATION_PRIORITY :{ 
               TITLE:"Priorita aplikácií",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcia Priorita aplikácií určuje prioritu online aktivít, aby sa zaručilo rýchlejšie sieťové pripojenie, keď ho najviac potrebujete. Vyberte online aktivitu, ktorej chcete zvýšiť prioritu, alebo kliknite na Vlastné a nastavte úroveň priority každej online aktivity."
                       }]
},
       DEVICE_PRIORITY :{ 
               TITLE:"Priorita zariadení",
               CONTENT: [{
                           type: "paragraph",
                           content: "Funkcia Priorita zariadení určuje prioritu zariadení, aby sa zaručilo rýchlejšie sieťové pripojenie, keď ho najviac potrebujete. Vyberte zariadenie(-a), ktorým chcete zvýšiť prioritu a ako dlho budú mať prioritu zvýšenú."
                       } ,{                      
                           type: "step",
                           title: "Ak chcete zvýšiť prioritu zariadenia",
       content: [ 
                "1. Nájdite v zozname zariadenie, ktorému chcete zvýšiť prioritu a zapnite Prioritu.",
                "2. Vyberte, ako dlho bude mať zariadenie zvýšenú prioritu v stĺpci Časovanie."]
}]
},
       FIREWALL :{ 
               TITLE:"Firewall",
               CONTENT: [{
                           type: "paragraph",
                           content: "SPI (Stateful Packet Inspection) zabraňuje počítačovým útokom a hodnotí prenos cez smerovač v závislosti od protokolu. Ako predvolená možnosť je táto funkcia zapnutá."
                       } ,{                      
                           type: "name",
                           title: "Zapnúť firewall SPI",
                           content: "Firewall SPI nevypínajte, ak to nie je nutné."
                       } ,{                      
                           type: "name",
                           title: "Umožniť ping z portu WAN/Umožniť ping z portu LAN",
                           content: "Zapnúť povolenie paketov ping z portu WAN/LAN. Odporúča sa zachovať predvolené nastavenia."
                       }]
},
       "" :     ""
    };
})(jQuery);