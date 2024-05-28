(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää asianmukaisia tietoja WAN-yhteydestä (Internet-yhteydestä)."
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"Langaton 2,4 GHz/5 GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää asianmukaista tietoa langattomasta verkosta."
                       }]
},
       STATUS_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää Ethernet (LAN) -porttien tiedot."
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"Vierasverkko 2,4 Ghz/5 GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää langattomien verkkojen tiedot vieraille."
                       }]
},
       STATUS_USB :{ 
               TITLE:"USB-laitteet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää nykyisten USB-porttien kautta kytkettyjen USB-tallennusvälineiden ja/tai tulostimen tiedot."
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"Suorituskyky",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää nykyisen reitittimen suorituskyvyn."
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"Langattoman verkon asiakkaat",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää verkkoon kytkettyjen langallisten laitteiden tiedot."
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"Langattomat asiakaslaitteet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää verkkoon kytkettyjen langattomien laitteiden tiedot."
                       }]
},
       INTERNET_TITLE :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Määritä IPv4-parametrit ja valitse asianmukainen MAC Clone -menetelmä."
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"IPv4",
               CONTENT: [{
                           type: "paragraph",
                           content: "Valitse Internet-yhteystyyppi ja syötä vastaavat parametrit."
                       } ,{                      
                           type: "title",
                            title: "Internet-yhteystyyppi: Dynaaminen IP-osoite"
                       } ,{                      
                           type: "paragraph",
                           content: "Valitse tämä tyyppi, jos ISP on antanut DHCP-palvelinyhteyden."
                       } ,{                      
                           type: "name",
                           title: "IP-osoite/Aliverkon peite/Oletusyhdyskäytävä/Ensisijainen DNS/Toissijainen DNS",
                           content: "DHCP-palvelin määrittää nämä parametrit automaattisesti ISP:ltä."
                       } ,{                      
                           type: "name",
                           title: "Uudista",
                           content: "Napsauta tätä painiketta saadaksesi uudet IP-parametrit DHCP-palvelimelta."
                       } ,{                      
                           type: "name",
                           title: "Vapauta",
                           content: "Napsauta tätä painiketta vapauttaaksesi kaikki DHCP-palvelimen määräämät IP-osoitteet."
                       } ,{                      
                           type: "name",
                           title: "DNS-osoite",
                           content: "Jos ISP antaa yhden tai kaksi DNS-osoitetta, valitse tämä valintaruutu ja syötä ensisijainen DHS-osoite ja toissijainen DNS-osoite vastaaviin syöttökenttiin. Muutoin ISP määrittää DNS-osoitteet dynaamisesti."
                       } ,{                      
                           type: "name",
                           title: "MTU-koko",
                           content: "MTU:n (Maximum Transmission Unit) oletus- ja tyypillinen koko useimmissa Ethernet-verkoissa on 1500 tavua. MTU:n oletuskokoa EI suositella muutettavan, ellei ISP niin vaadi."
                       } ,{                      
                           type: "name",
                           title: "Isännän nimi",
                           content: "Anna tähän kenttään arvo määrittääksesi reitittimen isäntälaitteen nimen."
                       } ,{                      
                           type: "name",
                           title: "Hanki IP Unicast DHCP:llä",
                           content: "Valitse tämä valintaruutu, jos ISP:n DHCP-palvelin ei tue lähetyssovelluksia etkä voi saada IP-osoitetta dynaamisesti."
                       } ,{                      
                           type: "title",
                            title: "Internet-yhteystyyppi: Staattinen IP-osoite"
                       } ,{                      
                           type: "paragraph",
                           content: "Valitse tämä tyyppi, jos sinulla on tietty (kiinteä) IP-osoite, aliverkon peite, yhdyskäytävä ja DNS-parametrit ISP:ltä."
                       } ,{                      
                           type: "name",
                           title: "IP-osoite/Aliverkon peite/Oletusyhdyskäytävä/Ensisijainen DNS/Toissijainen DNS",
                           content: "Anna ISP:n antamat tiedot."
                       } ,{                      
                           type: "name",
                           title: "MTU-koko",
                           content: "MTU:n (Maximum Transmission Unit) oletus- ja tyypillinen koko useimmissa Ethernet-verkoissa on 1500 tavua. MTU:n oletuskokoa EI suositella muutettavan, ellei ISP niin vaadi."
                       } ,{                      
                           type: "title",
                            title: "Internet-yhteystyyppi: BigPond-kaapeli"
                       } ,{                      
                           type: "paragraph",
                           content: "Valitse tämä tyyppi, jos ISP tarjoaa BigPond-kaapeliyhteyden."
                       } ,{                      
                           type: "name",
                           title: "Käyttäjätunnus/salasana",
                           content: "Anna ISP:n antama käyttäjätunnus ja salasana. Nämä kentät erottelevat kirjainkoon."
                       } ,{                      
                           type: "name",
                           title: "Todennuspalvelin",
                           content: "Anna todennuspalvelimen IP-osoite tai isäntänimi."
                       } ,{                      
                           type: "name",
                           title: "Vahvista toimialue",
                           content: "Anna palvelimen toimialueen nimen pääte (perustuu sijaintiisi). Esimerkiksi nsw.bigpond.net.au alueelle NSW/ACT, vic.bigpond.net.au alueelle VIC/TAS/WA/SA/NTtai qld.bigpond.net.au alueelle QLD."
                       } ,{                      
                           type: "name",
                           title: "MTU-koko",
                           content: "MTU:n (Maximum Transmission Unit) oletus- ja tyypillinen koko useimmissa Ethernet-verkoissa on 1500 tavua. MTU:n oletuskokoa EI suositella muutettavan, ellei ISP niin vaadi."
                       } ,{                      
                           type: "name",
                           title: "Yhteystila",
                           content: "Valitse asianmukainen yhteystila, joka määrittää, miten Internet-yhteys muodostetaan.",
       children: [{                      
                           type: "name",
                           title: "Automaattinen",
                           content: "Tässä tilassa Internet-yhteys muodostuu uudelleen automaattisesti, jos se katkeaa."
                       } ,{                      
                           type: "name",
                           title: "Tarpeen mukaan",
                           content: "Tässä tilassa Internet-yhteys katkaistaan automaattisesti, kun laitetta ei ole käytetty tiettyyn aikaan (Max Idle Time). Yhteys muodostetaan uudelleen, kun yrität käyttää Internetiä uudelleen."
                       } ,{                      
                           type: "name",
                           title: "Manuaalisesti",
                           content: "Tässä tilassa Internet-yhteyttä hallitaan manuaalisesti napsauttamalla Yhdistä- tai Katkaise yhteys -painiketta. Tämä tila tukee myös Pisin käyttämättömyysaika -toimintoa. Pisin käyttämättömyysaika -kenttään pisin aika (minuuteissa), jonka Internet-yhteys voi olla käyttämättä, ennen kuin se katkaistaan. Oletusarvo on 15 minuuttia. Jos haluat, että Internet-yhteys on aina aktiivinen, anna 0 (nolla)."
                       }]
} ,{                      
                           type: "title",
                            title: "Internet-yhteystyyppi: PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "Valitse tämä tyyppi, jos käytät DSL (Digital Subscriber Line) -palvelua ja olet saanut käyttäjätunnuksen ja salasanan ISP:ltä."
                       } ,{                      
                           type: "name",
                           title: "Käyttäjätunnus/salasana",
                           content: "Anna ISP:n antama käyttäjätunnus ja salasana. Nämä kentät erottelevat kirjainkoon."
                       } ,{                      
                           type: "name",
                           title: "IP-osoite/Ensisijainen DNS/Toissijainen DNS",
                           content: "DHCP-palvelin määrittää nämä parametrit automaattisesti ISP:ltä."
                       } ,{                      
                           type: "name",
                           title: "Toissijainen yhteys (Ei mitään, Dynaaminen IP, Staattinen IP)",
       children: [{                      
                           type: "name",
                           title: "Ei mitään",
                           content: "Valitse, jos on olemassa toissijainen yhteys."
                       } ,{                      
                           type: "name",
                           title: "Dynaaminen IP-osoite",
                           content: "Valitse, määrääkö ISP IP-osoitteen ja aliverkonpeitteen automaattisesti.",
       children: [{                      
                           type: "name",
                           title: "Uudista",
                           content: "Napsauta tätä painiketta uusiaksesi ISP:ltä saamasi IP-parametrit."
                       } ,{                      
                           type: "name",
                           title: "Vapauta",
                           content: "Napsauta tätä painiketta vapauttaaksesi annetut IP-parametrit."
                       }]
} ,{                      
                           type: "name",
                           title: "Staattinen IP-osoite",
                           content: "Valitse, antaako ISP IP-osoitteen ja aliverkon peitteen, ja syötä nämä tiedot vastaaviin kenttiin."
                       }]
} ,{                      
                           type: "name",
                           title: "MTU-koko",
                           content: "MTU:n (Maximum Transmission Unit) tyypillinen koko Ethernet-verkoissa on 1480 tavua.",
       children: [{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Harvinaisissa tapauksissa ISP vaatii, että säädät MTU:n koon parantaaksesi verkon suorituskykyä. Älä muuta tätä arvoa, ellei se ole täysin välttämätöntä."
                       }]
} ,{                      
                           type: "name",
                           title: "Palvelun nimi/Käytön keskittimen nimi",
                           content: "Oletuksena Palvelun nimi ja Käytön keskittimen (AC) nimi jätetään tyhjiksi. Näitä kenttiä ei tule konfiguroida, ellei ISP niin vaadi."
                       } ,{                      
                           type: "name",
                           title: "Tunnista online-aikaväli",
                           content: "Anna aikaväliarvo välillä 0-120 (sekunneissa), jona reititin tunnistaa käytön keskittimen verkossa joka aikavälin välein. Oletusarvo on 10."
                       } ,{                      
                           type: "name",
                           title: "IP-osoite",
                           content: "Jos ISP antaa tietyn (kiinteän) IP-osoitteen, valitse Käytä seuraavaa IP-osoitetta ja syötä IP-osoite kenttään. Valitse muussa tapauksessa Hanki Dynaamisesti ISP:ltä saadaksesi palvelimen määräämän IP-osoitteen automaattisesti."
                       } ,{                      
                           type: "name",
                           title: "DNS-osoite",
                           content: "Jos ISP antaa tietyn (kiinteän) IP-osoitteen, valitse Käytä seuraavaa IP-osoitetta ja syötä osoitteet Ensisijainen DNS ja Toissijainen DNS -kenttiin tässä järjestyksessä. Valitse muussa tapauksessa Hanki Dynaamisesti ISP:ltä saadaksesi palvelimen määräämän DNS:n IP-osoitteen automaattisesti."
                       } ,{                      
                           type: "name",
                           title: "Yhteystila",
                           content: "Valitse asianmukainen yhteystila, joka määrittää, miten Internet-yhteys muodostetaan.",
       children: [{                      
                           type: "name",
                           title: "Automaattinen",
                           content: "Tässä tilassa Internet-yhteys muodostuu uudelleen automaattisesti, jos se katkeaa."
                       } ,{                      
                           type: "name",
                           title: "Tarpeen mukaan",
                           content: "Tässä tilassa Internet-yhteys katkaistaan automaattisesti, kun laitetta ei ole käytetty tiettyyn aikaan (Max Idle Time). Yhteys muodostetaan uudelleen, kun yrität käyttää Internetiä uudelleen."
                       } ,{                      
                           type: "name",
                           title: "Aikapohjainen",
                           content: "Tässä tilassa Internet-yhteys muodostetaan tietyn aikataulun mukaisesti. Jos tämä vaihtoehto valitaan, anna aloitus- ja lopetusaika; molemmat muodossa TT:MM."
                       } ,{                      
                           type: "name",
                           title: "Manuaalisesti",
                           content: "Tässä tilassa Internet-yhteyttä hallitaan manuaalisesti napsauttamalla Yhdistä- tai Katkaise yhteys -painiketta. Tämä tila tukee myös Pisin käyttämättömyysaika -toimintoa. Pisin käyttämättömyysaika -kenttään pisin aika (minuuteissa), jonka Internet-yhteys voi olla käyttämättä, ennen kuin se katkaistaan. Oletusarvo on 15 minuuttia. Jos haluat, että Internet-yhteys on aina aktiivinen, anna 0 (nolla)."
                       } ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Aikapohjainen yhteystila astuu voimaan vain, kun järjestelmäaika on määritetty sivulla Lisäasetukset → Järjestelmätyökalut → AIka-asetukset."
                       }]
} ,{                      
                           type: "title",
                            title: "Internet-yhteystyyppi: L2TP/PPTP"
                       } ,{                      
                           type: "paragraph",
                           content: "Valitse tämä tyyppi, jos muodostat yhteyden L2TP/PPTP VPN -palvelimeen ja olet saanut ISP:ltä palvelimen käyttäjätunnuksen, salasanan ja IP-osoitteen/toimialueen nimen."
                       } ,{                      
                           type: "name",
                           title: "Käyttäjätunnus/salasana",
                           content: "Anna ISP:n antama käyttäjätunnus ja salasana. Nämä kentät erottelevat kirjainkoon."
                       } ,{                      
                           type: "name",
                           title: "IP-osoite/Ensisijainen DNS/Toissijainen DNS",
                           content: "DHCP-palvelin määrittää nämä parametrit automaattisesti ISP:ltä."
                       } ,{                      
                           type: "name",
                           title: "Toissijainen yhteys (Dynaaminen IP tai Staattinen IP)",
       children: [{                      
                           type: "name",
                           title: "Dynaaminen IP-osoite",
                           content: "Valitse, määrääkö ISP IP-osoitteen ja aliverkonpeitteen automaattisesti."
                       } ,{                      
                           type: "name",
                           title: "Staattinen IP-osoite",
                           content: "Valitse, antaako ISP IP-osoitteen, aliverkon peitteen, yhdyskäytävän ja DNS-osoitteet, ja anna nämä tiedot vastaaviin kenttiin."
                       }]
} ,{                      
                           type: "name",
                           title: "VPN-palvelimen IP/toimialueen nimi",
                           content: "Anna ISP:ltä saatu VPN-palvelimen IP-osoite tai toimialueen nimi."
                       } ,{                      
                           type: "name",
                           title: "MTU-koko",
                           content: "MTU:n (Maximum Transmission Unit) oletus- ja tyypillinen koko useimmissa Ethernet-verkoissa on 1460 tavua L2TP:lle tai 1420 tavua PPTP:lle. MTU:n oletuskokoa EI suositella muutettavan, ellei ISP niin vaadi."
                       } ,{                      
                           type: "name",
                           title: "Yhteystila",
                           content: "Valitse asianmukainen yhteystila, joka määrittää, miten Internet-yhteys muodostetaan.",
       children: [{                      
                           type: "name",
                           title: "Automaattinen",
                           content: "Tässä tilassa Internet-yhteys muodostuu uudelleen automaattisesti, jos se katkeaa."
                       } ,{                      
                           type: "name",
                           title: "Tarpeen mukaan",
                           content: "Tässä tilassa Internet-yhteys katkaistaan automaattisesti, kun laitetta ei ole käytetty tiettyyn aikaan (Max Idle Time). Yhteys muodostetaan uudelleen, kun yrität käyttää Internetiä uudelleen."
                       } ,{                      
                           type: "name",
                           title: "Manuaalisesti",
                           content: "Tässä tilassa Internet-yhteyttä hallitaan manuaalisesti napsauttamalla Yhdistä- tai Katkaise yhteys -painiketta. Tämä tila tukee myös Pisin käyttämättömyysaika -toimintoa. Pisin käyttämättömyysaika -kenttään pisin aika (minuuteissa), jonka Internet-yhteys voi olla käyttämättä, ennen kuin se katkaistaan. Oletusarvo on 15 minuuttia. Jos haluat, että Internet-yhteys on aina aktiivinen, anna 0 (nolla)."
                       }]
}]
},
       INTERNET_MAC :{ 
               TITLE:"MAC-osoitteen kloonaus",
               CONTENT: [{
                           type: "paragraph",
                           content: "Valitse asianmukainen MAC Clone -menetelmä."
                       } ,{                      
                           type: "name",
                           title: "ÄLÄ kloonaa MAC-osoitetta",
                           content: "ÄLÄ muuta reitittimen oletus-MAC-osoitetta, jos ISP ei sido annettua IP-osoitetta MAC-osoitteeseen."
                       } ,{                      
                           type: "name",
                           title: "Kloonaa tämän tietokoneen MAC-osoite",
                           content: "Valitse kopioida nykyinen reitittimeen kytketyn tietokoneen MAC-osoite, jos ISP sitoo annetun IP-osoitteen tietokoneen MAC-osoitteeseen."
                       } ,{                      
                           type: "name",
                           title: "Käytä mukautettua MAC-osoitetta",
                           content: "Anna MAC-osoite manuaalisesti, jos ISP sitoo annetun IP-osoitteen tiettyyn MAC-osoitteeseen."
                       }]
},
       INTERNET_WAN_AGGREGATION :{ 
               TITLE:"Kaksois-WAN (WAN Aggregation)",
               CONTENT: [{
                           type: "paragraph",
                           id: "internet_wan_aggregation_detail",
                           content: "Kaksois-WAN muuttaa LAN1-portin ylimääräiseksi WAN-portiksi ja luo yhden laajakaistaisen tietoväylän. Ota Internet-palveluntarjoajan nopea Internet käyttösi, kun tarjolla on yli 1 Gbps -yhteyksiä. Älä ole enää verkkolaitteistosi rajoittama."
                       } ,{                      
                           type: "note",
                           id: "internet_wan_aggregation_note",
                           title: "Huomautus",
                           content: "Varmista ennen tämän ominaisuuden käyttöönottoa, että Internet-palveluntarjoajasi tukee kaksois-WANia (WAN Aggregation) ja modeemistasi löytyy kaksi WAN -porttia."
                       } ,{                      
                           type: "step",
                           title: "Kaksois-WANin (WAN Aggregation) käyttö",
       content: [ 
                "1.	Kytke kaksois-WAN (WAN Aggregation) päälle.",
                "2.	Napsauta tallenna (Save).",
                "3.	Yhdistä reitittimesi WAN-portti ja LAN1-portti modeemisi kahteen WAN-porttiin kahdella Ethernet-kaapelilla."]
}]
},
       LAN_IPV4 :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää reitittimen MAC-osoitteen, IP-osoitteen ja aliverkon peitteen."
                       } ,{                      
                           type: "name",
                           title: "MAC-osoite",
                           content: "Ainutkertainen fyysinen osoite, joka on annettu reitittimen Ethernet (LAN) -portille."
                       } ,{                      
                           type: "name",
                           title: "IP-osoite",
                           content: "Näyttää reitittimen oletus-IP-osoitteen, millä voi kirjautua reitittimen verkkohallintasivulle. Se on vaihdettavissa."
                       } ,{                      
                           type: "name",
                           title: "Aliverkon peite",
                           content: "Valitse annettu tunnus, jolla LAN-portti reitittää sisäistä ja ulkoista liikennettä, tai anna uusi aliverkon peite."
                       } ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Jos uusi LAN IP-osoite ei ole samassa aliverkossa vanhan kanssa, DHCP-palvelimen IP-osoitevaranto konfiguroidaan automaattisesti; kuitenkin virtuaalipalvelin ja DMZ-isäntälaite eivät tule käyttöön ennen kuin ne määritetään uudelleen."
                       }]
},
       LINK_AGG :{ 
               TITLE:"Link Aggregation",
               CONTENT: [{
                           type: "paragraph",
                           content: "Yhteyden koostaminen yhdistää kaksi porttia tuottaen yhden suuren kaistanleveyden datapolun, joka ylläpitää suurempia nopeuksia ja vakaampaa langallista verkkoa."
                       } ,{                      
                           type: "step",
                           id: "link_agg_step_help",
                           title: "Yhteyden koostamisen käyttöönotto",
       content: [ 
                "1. Valitse On ottaaksesi yhteyden koostamisen käyttöön.",
                "2. Valitse yhteyden koostamiselle kaksi porttia.",
                "3. Napsauta Tallenna."]
}]
},
       IPTV :{ 
               TITLE:"IPTV",
               CONTENT: [{
                           type: "paragraph",
                           content: "IPTV (Internet Protocol Television) on järjestelmä, jolla televisiopalveluita toimitetaan Internet-protokollapaketilla pakettikytketyssä verkossa, kuten LAN-verkossa tai Internetissä."
                       } ,{                      
                           type: "name",
                           id: "igmp-snooping",
                           title: "IGMP-urkinta",
                           content: "IGMP (Internet Group Management Protocol) Snooping -ominaisuudella palvelin välittää multicast-liikenteen ainostaan sitä pyytäneisiin portteihin."
                       } ,{                      
                           type: "name",
                           title: "IGMP-välityspalvelin",
                           content: "Valitse ottaaksesi käyttöön IGMP Proxy -ominaisuuden, jos ISP:n tarjoama IPTV-palvelu perustuu IGMP-tekniikkaan."
                       } ,{                      
                           type: "name",
                           title: "IGMP-versio",
                           content: "Valitse IGMP-versio Internet-palveluntarjoajasi mukaan. IGMP-version oletusarvo on V2. "
                       } ,{                      
                           type: "name",
                           id: "igmp-wifi",
                           title: "Langaton Multicast-välitys",
                           content: "Valitse ottaaksesi käyttöön Wireless Multicast Forwarding -ominaisuuden, jolla multicast-paketteja voidaan välittää langattomaan verkkoon."
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "Valitse ottaaksesi käyttöön IPTV-ominaisuuden, jos ISP:n tarjoama IPTV-palvelu ei perustu IGMP-tekniikkaan."
                       } ,{                      
                           type: "name",
                           title: "ISP-profiili",
                           content: "Viimeistele asetukset valitsemalla sopiva profiili ISP:lle (Internet-palveluntarjoaja). Tarjolla on kolme profiilityyppiä:",
       children: [{                      
                           type: "name",
                           title: "Maa/Internet-palveluntarjoaja",
                           content: "ISP-profiilit ovat oletusarvoisesti muotoa \"Maa-ISP\". Etsi ja valitse ISP:si pudotusvalikosta."
                       } ,{                      
                           type: "name",
                           id: "iptv_bridge_child_1to4",
                           title: "Välitili",
                           content: "Mikäli ISP:täsi ei ole listattu ja IPTV:si asetus ei vaadi muita säätöarvoja, valitse tämä profiili ja määritä IPTV:si käytössä oleva LAN-portti.",
       children: [{                      
                           type: "name",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Valitse, millaisia tietoja LAN-portti siirtää. Esimerkiksi, jos IPTV:lle valitaan LAN1, se siirtää ainoastaan IPTV:n tietoja. Yhdistä silloin digiboksi LAN1:een."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_2to5",
                           title: "Välitili",
                           content: "Mikäli ISP:täsi ei ole listattu ja IPTV:si asetus ei vaadi muita säätöarvoja, valitse tämä profiili ja määritä IPTV:si käytössä oleva LAN-portti.",
       children: [{                      
                           type: "name",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Valitse, millaisia tietoja LAN-portti siirtää. Esimerkiksi, jos IPTV:lle valitaan LAN2, se siirtää ainoastaan IPTV:n tietoja. Yhdistä silloin digiboksi LAN2:een."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_5to8",
                           title: "Välitili",
                           content: "Mikäli ISP:täsi ei ole listattu ja IPTV:si asetus ei vaadi muita säätöarvoja, valitse tämä profiili ja määritä IPTV:si käytössä oleva LAN-portti.",
       children: [{                      
                           type: "name",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Valitse, millaisia tietoja LAN-portti siirtää. Esimerkiksi, jos IPTV:lle valitaan LAN5, se siirtää ainoastaan IPTV:n tietoja. Yhdistä silloin digiboksi LAN5:een."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_1to4",
                           title: "Mukautettu",
                           content: "Valitse tämä profiili, mikäli ISP:täsi ei löydy listasta, mutta olet saanut siltä tarvittuja säätöarvoja, kuten Internet- / VoIP- / IPTV VLAN -tunnuksia ja -käyttöoikeuksia.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Prioriteetti",
                           content: "Määritä VLAN ID:t ja prioriteetit ISP:n tietojen mukaisesti."
                       } ,{                      
                           type: "name",
                           title: "802.11Q merkintä",
                           content: "Valitse, merkitäänkö Internet-paketteihin 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "IPTV:n Multicast VLAN -tunnus/Prioriteetti",
                           content: "Voit ottaa halutessasi IPTV-monilähetysominaisuuden käyttöön ja määrittää VLAN ID ja Prioriteetti -asetukset ISP:n tietojen mukaisesti."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "Valitse, millaisia tietoja LAN-portti siirtää. Esimerkiksi, jos IPTV:lle valitaan LAN1, se siirtää ainoastaan IPTV:n tietoja. Yhdistä silloin digiboksi LAN1:een."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_2to5",
                           title: "Mukautettu",
                           content: "Valitse tämä profiili, mikäli ISP:täsi ei löydy listasta, mutta olet saanut siltä tarvittuja säätöarvoja, kuten Internet- / VoIP- / IPTV VLAN -tunnuksia ja -käyttöoikeuksia.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Prioriteetti",
                           content: "Määritä VLAN ID:t ja prioriteetit ISP:n tietojen mukaisesti."
                       } ,{                      
                           type: "name",
                           title: "802.11Q merkintä",
                           content: "Valitse, merkitäänkö Internet-paketteihin 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "IPTV:n Multicast VLAN -tunnus/Prioriteetti",
                           content: "Voit ottaa halutessasi IPTV-monilähetysominaisuuden käyttöön ja määrittää VLAN ID ja Prioriteetti -asetukset ISP:n tietojen mukaisesti."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "Valitse, millaisia tietoja LAN-portti siirtää. Esimerkiksi, jos IPTV:lle valitaan LAN2, se siirtää ainoastaan IPTV:n tietoja. Yhdistä silloin digiboksi LAN2:een."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_5to8",
                           title: "Mukautettu",
                           content: "Valitse tämä profiili, mikäli ISP:täsi ei löydy listasta, mutta olet saanut siltä tarvittuja säätöarvoja, kuten Internet- / VoIP- / IPTV VLAN -tunnuksia ja -käyttöoikeuksia.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Prioriteetti",
                           content: "Määritä VLAN ID:t ja prioriteetit ISP:n tietojen mukaisesti."
                       } ,{                      
                           type: "name",
                           title: "802.11Q merkintä",
                           content: "Valitse, merkitäänkö Internet-paketteihin 802.11Q."
                       } ,{                      
                           type: "name",
                           title: "IPTV:n Multicast VLAN -tunnus/Prioriteetti",
                           content: "Voit ottaa halutessasi IPTV-monilähetysominaisuuden käyttöön ja määrittää VLAN ID ja Prioriteetti -asetukset ISP:n tietojen mukaisesti."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "Valitse, millaisia tietoja LAN-portti siirtää. Esimerkiksi, jos IPTV:lle valitaan LAN5, se siirtää ainoastaan IPTV:n tietoja. Yhdistä silloin digiboksi LAN5:een."
                       }]
}]
}]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"DHCP-palvelin",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Oletuksena DHCP (Dynamic Host Configuration Protocol) -palvelin on käytössä; se määrittää TCP/IP-parametrit dynaamisesti asiakaslaitteille IP-osoitevarannosta.",
                "ÄLÄ poista DHCP-palvelinta käytöstä, ellei sinulla ole toista DHCP-palvelinta tai haluat määrittää TCP/IP-parametrit manuaalisesti jokaiselle verkon asiakaslaitteelle."]
} ,{                      
                           type: "name",
                           title: "IP-osoitevaranto",
                           content: "Anna asiakkaille vuokrattavien IP-osoitteiden alue."
                       } ,{                      
                           type: "name",
                           title: "Osoitteen vuokra-aika",
                           content: "Anna aika (1-2880 minuuttia), jonka IP-osoite vuokrataan asiakkaalle. Oletusarvo on 120."
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"Osoitteen varaus",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää IP-varattujen laitteiden vastaavat parametrit."
                       } ,{                      
                           type: "step",
                           title: "IP-osoitteen varaaminen",
       content: [ 
                "1. Napsauta Lisää.",
                "2. Napsauta Skannaa valitaksesi yhdistetyn laitteen DHCP-asiakaslaiteluettelosta; tai anna haluamasi asiakaslaitteen MAC-osoite MAC Address (MAC-osoite) -kenttään ja asiakaslaitteelle varattava IP-osoite IP-osoite -kenttään.",
                "3. Anna asiakaslaitteen kuvaus Kuvaus -kenttään.",
                "4. Valitse Ota käyttöön.",
                "5. Napsauta Tallenna."]
} ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Jos haluat poistaa tämän kohdan käytöstä, napsauta lamppukuvaketta."
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"DHCP-asiakasluettelo",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää sillä hetkellä yhdistettyjen laitteiden tiedot."
                       }]
},
       DDNS :{ 
               TITLE:"Dynaaminen DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dynaamisella DNS:llä (Dynamic Domain Name System) voit määrittää kiinteän isäntälaitteen ja toimialueen nimen dynaamiselle Internet-IP-osoitteelle. Siitä on hyötyä, kun isännöit omaa sivustoa, FTP-palvelinta tai muuta reitittimen takana sijaitsevaa palvelinta. Ensin sinun tulee rekisteröityä dynaamisen DNS-palveluntarjoajan, kuten www.dyndns.com, kanssa."
                       } ,{                      
                           type: "step",
                           title: "Dynaamisen DNS:n määrittäminen",
       content: [ 
                "1. Valitse dynaamisen DNS-palveluntarjoaja.",
                "2. Anna DDNS-tilisi käyttäjätunnus ja salasana.",
                "3. Anna DDNS-palveluntarjoajalta saamasi toimialueen nimi.",
                "4. Valitse päivitysväli avattavasta valikosta.",
                "5. Jos palveluntarjoajasi on NO-IP, valitse WAN IP Binding varmistaaksesi, että verkkotunnus on sidottu tämän reitittimen WAN IP -osoitteeseen.",
                "6. Napsauta Kirjaudu ja Tallenna."]
} ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Jos haluat käyttää uutta DDNS-tiliä, kirjaudu ensin ulos ja kirjaudu sitten sisään uudella tilillä."
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"Dynaaminen DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dynaamisella DNS:llä (Dynamic Domain Name System) voit määrittää kiinteän isäntälaitteen ja toimialueen nimen dynaamiselle Internet-IP-osoitteelle. Siitä on hyötyä, kun isännöit omaa sivustoa, FTP-palvelinta tai muuta reitittimen takana sijaitsevaa palvelinta. Ensin sinun tulee rekisteröityä dynaamisen DNS-palveluntarjoajan, kuten www.dyndns.com, kanssa."
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"Toimialueen nimiluettelo",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tämä taulukko esittää kaikkien pilvitilillesi rekisteröityjen verkkotunnusten tiedot."
                       } ,{                      
                           type: "step",
                           title: "Uuden verkkotunnuksen rekisteröinti",
       content: [ 
                "1. Napsauta Register.",
                "2. Syötä rekisteröitävän verkkotunnuksen nimi.",
                "3. Napsauta Tallenna."]
}]
},
       ADVANCED_ROUTING_STATIC_ROUTING :{ 
               TITLE:"Staattinen reititys",
               CONTENT: [{
                           type: "paragraph",
                           content: "Staattisella reitityksellä määritetään etukäteen kiinteä reitti verkkotietopaketeille niiden kulkiessa tietylle isäntälaitteelle tai tiettyyn verkkoon."
                       } ,{                      
                           type: "step",
                           title: "Staattisen reitityksen määrittäminen",
       content: [ 
                "1. Napsauta Lisää.",
                "2. Anna IP-osoite Verkkokohde -kenttään määrittääksesi tälle staattisen reitin.",
                "3. Anna aliverkon peite Aliverkon peite -kenttään määrittääksesi IP-osoitteen verkko-osuuden ja isäntälaiteosuuden.",
                "4. Anna yhdyskäytävän IP-osoite Oletusyhdyskäytävä -kenttään yhdistääksesi reitittimen verkkoon tai isäntälaitteeseen.",
                "5. Valitse LAN tai WAN Liittymä -kentässä määrittääksesi verkkokohdetyypin.",
                "6. Anna tämän kohdan lyhyt kuvaus.",
                "7. Valitse Ota käyttöön.",
                "8. Napsauta Tallenna."]
} ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Jos haluat poistaa tämän kohdan käytöstä, napsauta lamppukuvaketta."
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"Järjestelmän reititystaulukko",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tässä näytetään kaikki käytössä olevat pätevät reittisyötteet."
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"Langattoman verkon asetukset",
               CONTENT: [{
                           type: "paragraph",
                           content: "Määritä langattomat asetukset tarpeittesi mukaan."
                       }]
},
       WIRELESS_SMART_CONNECT :{ 
               TITLE:"Smart Connect",
               CONTENT: [{
                           type: "paragraph",
                           content: "Valitse tämä valintaruutu ottaaksesi äly-yhteyden käyttöön. Tämä toiminto auttaa laitteita toimimaan nopeammin määräämällä ne parhaaseen langattomaan verkkoon todellisten olosuhteiden perusteella verkkotarpeiden tasapainottamiseksi."
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"Langaton 2,4 GHz",
               CONTENT: [{
                           type: "name",
                           title: "Verkon nimi (SSID)",
                           content: "Suositellaan, että vaihdat verkon nimen (SSID). Tämä kenttä erottelee kirjainkoon."
                       } ,{                      
                           type: "name",
                           title: "Piilota SSID",
                           content: "Valitse tämä valintaruutu, jos haluat piilottaa 2,4 GHz:n verkon nimen (SSID) langattomien verkkojen luettelosta. Kun tämä on valittu, SSID:iä ei lähetetä, ja verkkoon on liityttävä manuaalisesti."
                       } ,{                      
                           type: "name",
                           title: "Suojaus",
                           content: "Valitse jokin seuraavista suojausvaihtoehdoista:",
       children: [{                      
                           type: "name",
                           title: "Ei suojausta",
                           content: "Valitse tämä vaihtoehto, jos haluat poistaa langattoman verkon suojauksen käytöstä. Tätä ei suositella."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2 – Personal",
                           content: "Valitse tämä vaihtoehto, jos haluat ottaa langattoman verkon suojauksen käyttöön. Tätä suositellaan painokkaasti, jotta langaton verkkosi olisi suojattu luvattomalta käytöltä. Jos valitset sen, konfiguroi seuraavat.",
       children: [{                      
                           type: "name",
                           title: "Versio",
                           content: "Valitse suojausversio. Valitse suojausversio. WPA2-PSK on turvallisempi. Jos et ole varma asiasta, valitse Auto."
                       } ,{                      
                           type: "name",
                           title: "Salaus",
                           content: "Valitse suojauksen salaustyyppi. AES on turvallisempi. EMME suosittele TKIP-salauksen käyttöä, jos reititin toimii 802.11n-tilassa. Lisäksi TKIP:n käyttö poistaa WPS-toiminnon käytöstä. Jos et ole varma asiasta, valitse Auto."
                       } ,{                      
                           type: "name",
                           title: "Salasana",
                           content: "Anna tähän kenttään langattoman verkon salasana pituudeltaan 8-63 ASCII-merkkiä tai 8-64 heksadesimaalista merkkiä."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Enterprise",
                           content: "Valitse tämä vaihtoehto ottaaksesi käyttöön edistyneemmän todennusmenetelmän, joka hyödyntää RADIUS (Remote Authentication Dial In User Service) -palvelinta. Jos tämä valitaan, WPS-toiminto poistetaan käytöstä.",
       children: [{                      
                           type: "name",
                           title: "Versio",
                           content: "Valitse suojausversio. WPA2 on turvallisempi. Jos et ole varma asiasta, valitse Auto."
                       } ,{                      
                           type: "name",
                           title: "Salaus",
                           content: "Valitse suojauksen salaustyyppi. AES on turvallisempi. EMME suosittele TKIP-salauksen käyttöä, jos reititin toimii 802.11n-tilassa. Lisäksi TKIP:n käyttö poistaa WPS-toiminnon käytöstä. Jos et ole varma asiasta, valitse Auto."
                       } ,{                      
                           type: "name",
                           title: "RADIUS-palvelimen IP-osoite",
                           content: "Anna RADIUS-palvelimen IP-osoite."
                       } ,{                      
                           type: "name",
                           title: "RADIUS-portti",
                           content: "Anna RADIUS-palvelimen portin numero."
                       } ,{                      
                           type: "name",
                           title: "RADIUS-salasana",
                           content: "Anna RADIUS-palvelimen jaettu salasana."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Valitse tämä asetus käyttääksesi yksinkertaista varmistustapaa, mikäli joku langattomasti yhdistettävistä laitteista käyttää ainoastaan WEP-salausta (Wired Equivalent Privacy). WPS-toiminto poistetaan käytöstä, jos tämä asetus valitaan.",
       children: [{                      
                           type: "name",
                           title: "Tyyppi",
                           content: "Valitse langattomalle verkollesi todennustyyppi. Jos et ole varma asiasta, valitse Auto."
                       } ,{                      
                           type: "name",
                           title: "WEP-avaimen muoto",
                           content: "Käytä joko ASCII- tai heksadesimaalimuotoa. ASCII-muoto koostuu aakkosista ja numeroista. Heksadesimaalimuoto koostuu numeroista (0-9) ja kirjaimista (A-F, a-f)."
                       } ,{                      
                           type: "name",
                           title: "Avaimen tyyppi",
                           content: "Valitse WEP-avaimen pituus.",
       children: [{                      
                           type: "name",
                           title: "64-bittinen",
                           content: "Voit syöttää 10 heksadesimaalinumeroa (0-9, A-F, a-f) tai 5 ASCII-merkkiä WEP-arvo -kenttään."
                       } ,{                      
                           type: "name",
                           title: "128-bittinen",
                           content: "Voit syöttää 26 heksadesimaalinumeroa (0-9, A-F, a-f) tai 13 ASCII-merkkiä WEP-arvo -kenttään."
                       }]
} ,{                      
                           type: "name",
                           title: "Avainarvo",
                           content: "Anna WEP-avain asianmukaiseen kenttään."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Kanava",
                           content: "Valitse 2,4 GHz:n langattoman verkon kanava. Suositellaan, että kanavaksi jätetään Auto, jos langaton yhteys ei katkeile."
                       } ,{                      
                           type: "name",
                           title: "Lähetysteho",
                           content: "Valitse joko Korkea,Keski tai Matala tiedonsiirtoteholle. Oletus- ja suositeltu asetus on Korkea."
                       } ,{                      
                           type: "name",
                           id: "atf_2g4",
                           title: "Airtime Fairness -ominaisuus",
                           content: "Valitse tämä valintaruutu ottaaksesi käyttöön Airtime Fairness (ATF) -ominaisuuden, jolla voit optimoida kunkin virtauksen välityskyvyn. ATF-liikenteen ajastin hyödyntää määränpääkohtaisia lähetysaikatavoitteita tasapainottaakseen lähetysajan käytön virtausmääränpäiden välillä."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_2g4",
                           title: "Monikäyttäjän MIMO-ominaisuus",
                           content: "Napsauta ottaaksesi monikäyttäjän MIMO-ominaisuuden käyttöön."
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"Langaton 5 GHz",
               CONTENT: [{
                           type: "name",
                           title: "Verkon nimi (SSID)",
                           content: "Suositellaan, että vaihdat verkon nimen (SSID). Tämä kenttä erottelee kirjainkoon."
                       } ,{                      
                           type: "name",
                           title: "Piilota SSID",
                           content: "Valitse tämä valintaruutu, jos haluat piilottaa 5 GHz:n verkon nimen (SSID) langattomien verkkojen luettelosta. Kun tämä on valittu, SSID:iä ei lähetetä, ja verkkoon on liityttävä manuaalisesti."
                       } ,{                      
                           type: "name",
                           title: "Suojaus",
                           content: "Valitse jokin seuraavista suojausvaihtoehdoista:",
       children: [{                      
                           type: "name",
                           title: "Ei suojausta",
                           content: "Valitse tämä vaihtoehto, jos haluat poistaa langattoman verkon suojauksen käytöstä. Tätä ei suositella."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2 – Personal",
                           content: "Valitse tämä vaihtoehto, jos haluat ottaa langattoman verkon suojauksen käyttöön. Tätä suositellaan painokkaasti, jotta langaton verkkosi olisi suojattu luvattomalta käytöltä. Jos valitset sen, konfiguroi seuraavat.",
       children: [{                      
                           type: "name",
                           title: "Versio",
                           content: "Valitse suojausversio. WPA2-PSK on turvallisempi. Jos et ole varma asiasta, valitse Auto."
                       } ,{                      
                           type: "name",
                           title: "Salaus",
                           content: "Valitse suojauksen salaustyyppi. AES on turvallisempi. EMME suosittele TKIP-salauksen käyttöä, jos reititin toimii 802.11n-tilassa. Lisäksi TKIP:n käyttö poistaa WPS-toiminnon käytöstä. Jos et ole varma asiasta, valitse Auto."
                       } ,{                      
                           type: "name",
                           title: "Salasana",
                           content: "Anna tähän kenttään langattoman verkon salasana pituudeltaan 8-63 ASCII-merkkiä tai 8-64 heksadesimaalista merkkiä."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Enterprise",
                           content: "Valitse tämä vaihtoehto ottaaksesi käyttöön edistyneemmän todennusmenetelmän, joka hyödyntää RADIUS (Remote Authentication Dial In User Service) -palvelinta. Jos tämä valitaan, WPS-toiminto poistetaan käytöstä.",
       children: [{                      
                           type: "name",
                           title: "Versio",
                           content: "Valitse suojausversio. WPA2 on turvallisempi. Jos et ole varma asiasta, valitse Auto."
                       } ,{                      
                           type: "name",
                           title: "Salaus",
                           content: "Valitse suojauksen salaustyyppi. AES on turvallisempi. EMME suosittele TKIP-salauksen käyttöä, jos reititin toimii 802.11n-tilassa. Lisäksi TKIP:n käyttö poistaa WPS-toiminnon käytöstä. Jos et ole varma asiasta, valitse Auto."
                       } ,{                      
                           type: "name",
                           title: "RADIUS-palvelimen IP-osoite",
                           content: "Anna RADIUS-palvelimen IP-osoite."
                       } ,{                      
                           type: "name",
                           title: "RADIUS-portti",
                           content: "Anna RADIUS-palvelimen portin numero."
                       } ,{                      
                           type: "name",
                           title: "RADIUS-salasana",
                           content: "Anna RADIUS-palvelimen jaettu salasana."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Valitse tämä asetus käyttääksesi yksinkertaista varmistustapaa, mikäli joku langattomasti yhdistettävistä laitteista käyttää ainoastaan WEP-salausta (Wired Equivalent Privacy). WPS-toiminto poistetaan käytöstä, jos tämä asetus valitaan.",
       children: [{                      
                           type: "name",
                           title: "Tyyppi",
                           content: "Valitse langattomalle verkollesi todennustyyppi. Jos et ole varma asiasta, valitse Auto."
                       } ,{                      
                           type: "name",
                           title: "WEP-avaimen muoto",
                           content: "Käytä joko ASCII- tai heksadesimaalimuotoa. ASCII-muoto koostuu aakkosista ja numeroista. Heksadesimaalimuoto koostuu numeroista (0-9) ja kirjaimista (A-F, a-f)."
                       } ,{                      
                           type: "name",
                           title: "Avaimen tyyppi",
                           content: "Valitse WEP-avaimen pituus.",
       children: [{                      
                           type: "name",
                           title: "64-bittinen",
                           content: "Voit syöttää 10 heksadesimaalinumeroa (0-9, A-F, a-f) tai 5 ASCII-merkkiä WEP-arvo -kenttään."
                       } ,{                      
                           type: "name",
                           title: "128-bittinen",
                           content: "Voit syöttää 26 heksadesimaalinumeroa (0-9, A-F, a-f) tai 13 ASCII-merkkiä WEP-arvo -kenttään."
                       }]
} ,{                      
                           type: "name",
                           title: "Avainarvo",
                           content: "Anna WEP-avain asianmukaiseen kenttään."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Kanava",
                           content: "Valitse 5 GHz:n langattoman verkon kanava. Suositellaan, että kanavaksi jätetään Auto, jos langaton yhteys ei katkeile."
                       } ,{                      
                           type: "name",
                           title: "Lähetysteho",
                           content: "Valitse joko Korkea,Keski tai Matala tiedonsiirtoteholle. Oletus- ja suositeltu asetus on Korkea."
                       } ,{                      
                           type: "name",
                           id: "atf_5g",
                           title: "Airtime Fairness -ominaisuus",
                           content: "Valitse tämä valintaruutu ottaaksesi käyttöön Airtime Fairness (ATF) -ominaisuuden, jolla voit optimoida kunkin virtauksen välityskyvyn. ATF-liikenteen ajastin hyödyntää määränpääkohtaisia lähetysaikatavoitteita tasapainottaakseen lähetysajan käytön virtausmääränpäiden välillä."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_5g",
                           title: "Monikäyttäjän MIMO-ominaisuus",
                           content: "Napsauta ottaaksesi monikäyttäjän MIMO-ominaisuuden käyttöön."
                       }]
},
       WPS :{ 
               TITLE:"WPS",
               CONTENT: [{
                           type: "paragraph",
                           content: "WPS (Wi-Fi Protected Setup) tarjoaa helpomman tavan määrittää suojatun Wi-Fi-yhteyden."
                       } ,{                      
                           type: "name",
                           title: "Paina painiketta (suositellaan)",
       content: [ 
                "Tällä menetelmällä voit helposti yhdistää minkä tahansa WPS-laitteen langattomaan verkkoon.",
                "Napsauta näytössä Käynnistä WPS -painiketta. Paina asiakaslaitteen WPS-painiketta kahden minuutin sisällä."]
} ,{                      
                           type: "name",
                           title: "Reitittimen PIN-koodi",
       content: [ 
                "Oletus-PIN-koodi on reitittimen kannessa.",
                "Napsauta Luo luodaksesi uuden PIN-koodin tai napsauta Oletus palauttaaksesi PIN-koodiksi tehtaalla annetun PIN-koodin."]
} ,{                      
                           type: "name",
                           title: "Anna asiakkaan PIN-koodi",
       content: [ 
                "Tällä menetelmällä voit lisätä langattoman laitteen manuaalisesti.",
                "Kirjoita kenttään laitteen PIN-koodi ja napsauta Yhdistä."]
}]
},
       WIRELESS_STATISTICS :{ 
               TITLE:"Langattomat asemat verkossa",
               CONTENT: [{
                           type: "name",
                           title: "Asiakaslaitenumero",
                           content: "Näyttää kyseisen langattoman asiakaslaitteen numeron."
                       } ,{                      
                           type: "name",
                           title: "MAC-osoite",
                           content: "Näyttää kyseisen langattoman asiakaslaitteen MAC-osoitteen."
                       } ,{                      
                           type: "name",
                           title: "Yhteystyyppi",
                           content: "Näyttää kyseisen langattoman asiakaslaitteen langattoman yhteyden taajuusalueen (2,4 GHz tai 5 GHz)."
                       } ,{                      
                           type: "name",
                           title: "Suojaus",
                           content: "Näyttää kyseisen langattoman asiakaslaitteen suojaustyypin."
                       } ,{                      
                           type: "name",
                           title: "Vastaanotetut paketit",
                           content: "Näyttää kyseisen langattoman asiakaslaitteen vastaanottamien pakettien määrän."
                       } ,{                      
                           type: "name",
                           title: "Lähetyt paketit",
                           content: "Näyttää kyseisen langattoman asiakaslaitteen lähettämien pakettien määrän."
                       } ,{                      
                           type: "paragraph",
                           content: "Päivitä tämän sivun tiedot napsauttamalla Päivitä."
                       }]
},
       WIRELESS_SCHEDULE :{ 
               TITLE:"Langattoman verkon aikataulu",
               CONTENT: [{
                           type: "paragraph",
                           content: "Langaton aikataulu -toiminnolla voit poistaa langattoman signaalin käytöstä tiettynä aikana. Voit esimerkiksi poistaa langattoman signaalin käytöstä klo 0.00–7.00."
                       } ,{                      
                           type: "name",
                           title: "Langattoman yhteyden sammutusaika",
                           content: "Näyttää, koska langaton signaali on poissa käytöstä.",
       children: [{                      
                           type: "step",
                           title: "Langattoman sammuksissaoloajan määrittäminen",
       content: [ 
                "1. Napsauta Lisää.",
                "2. Määritä, minä aikana langattoman signaalin tulee olla sammuksissa.",
                "3. Valitse toistopäivät Voit valita Joka päivä tai määrittää tietyt päivät.",
                "4. Napsauta Tallenna."]
}]
}]
},
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"Asetukset",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tällä toiminnolla voit tarjota Wi-Fi-yhteyden vieraille paljastamatta pääverkkoa."
                       } ,{                      
                           type: "name",
                           title: "Anna vieraiden nähdä toisensa",
                           content: "Valitse tämä valintaruutu salliaksesi vierasverkon langattomien laitteiden kommunikoida toistensa kanssa sellaisilla menetelmillä kuin verkkonaapurit, Samba, Ping ja FTP."
                       } ,{                      
                           type: "name",
                           id: "access_local",
                           title: "Anna vieraiden käyttää paikallisverkkoa",
                           content: "Valitse tämä valintaruutu salliaksesi vierasverkon langattomien laitteiden kommunikoida reitittimen LAN-portteihin tai pääverkkoon yhdistettyjen laitteiden kanssa sellaisilla menetelmillä kuin verkkonaapurit, Samba, Ping ja FTP."
                       }]
},
       GUEST_NETWORK_WIRELESS :{ 
               TITLE:"Langaton 2,4 GHz/5 GHz",
               CONTENT: [{
                           type: "name",
                           title: "Ota vierasverkko käyttöön",
                           content: "Valitse tämä valintaruutu ottaaksesi vierasverkko-ominaisuuden käyttöön."
                       } ,{                      
                           type: "name",
                           title: "Verkon nimi (SSID)",
                           content: "Käytä joko vierasverkon oletus-SSID:iä tai anna uusi nimi (enintään 32 merkkiä)."
                       } ,{                      
                           type: "name",
                           title: "Piilota SSID",
                           content: "Valitse tämä valintaruutu, jos haluat piilottaa vierasverkon SSID:n Wi-Fi-verkkojen luettelosta."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Salasanan päivitysväli",
                           content: "Valitse vierasverkon salasanan päivitysväli."
                       } ,{                      
                           type: "name",
                           title: "Suojaus",
                           content: "Jos valitset olla koskaan päivittämättä salasanaa, valitse jokin seuraavista suojausvaihtoehdoista:",
       children: [{                      
                           type: "name",
                           title: "Ei suojausta",
                           content: "Valitse tämä vaihtoehto, jos haluat poistaa langattoman verkon suojauksen käytöstä. Tätä ei suositella."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2 – Personal",
                           content: "Valitse tämä vaihtoehto, jos haluat ottaa langattoman verkon suojauksen käyttöön. Tätä suositellaan painokkaasti, jotta vierasverkkosi olisi suojattu luvattomalta käytöltä. Jos valitset sen, konfiguroi seuraavat.",
       children: [{                      
                           type: "name",
                           title: "Versio",
                           content: "Valitse suojausversio. WPA2-PSK on turvallisempi. Jos et ole varma asiasta, valitse Auto."
                       } ,{                      
                           type: "name",
                           title: "Salaus",
                           content: "Valitse suojauksen salaustyyppi. AES on turvallisempi. EMME suosittele TKIP-salauksen käyttöä, jos reititin toimii 802.11n-tilassa. Lisäksi TKIP:n käyttö poistaa WPS-toiminnon käytöstä. Jos et ole varma asiasta, valitse Auto."
                       }]
} ,{                      
                           type: "name",
                           id: "portal-help-title",
                           title: "Portaali",
                           content: "Portaalin todennus tehostaa verkon turvallisuutta pyytämällä todennusta asiakaslaitteilta, joiden on käytettävä langatonta verkkoasi tilapäisesti."
                       } ,{                      
                           type: "step",
                           id: "portal-help-content",
                           title: "Portaalin todennuksen määrittäminen:",
       content: [ 
                "1. Valitse Portal (Portaali) kohdassa Security (Suojaus).",
                "2. Valitse Simple Password (Yksinkertainen salasana) tai No Authentication (Ei todennusta) kohdassa Authentication (Todennus).",
                "A. Simple Password (Yksinkertainen salasana) – valitse todennussalasana (8-16 kirjainta, numero ja alaviivaa).",
                "B. No Authentication (Ei todennusta) – asiakaslaitteet voivat käyttää verkkoa ilman todennusta.",
                "3. Valitse 1 Hour (1 tunti), 2 Hours (2 tuntia), 4 Hours (4 tuntia), 8 Hours (8 tuntia) tai Always (Aina) todennuksen aikakatkaisulle. Kun asiakaslaitteen todennus vanhenee, hän voi kirjautua sisään uudelleen suorittaakseen uuden todennuksen.",
                "4. (Valinnainen) Ota Redirect (Uudelleenohjaus) käyttöön ja anna uudelleenohjauksen URL tarvittaessa. Tällöin juuri todennettu asiakaslaite ohjataan antamaasi URL:ään.",
                "5. (Valinnainen) Voit myös mukauttaa todennuksen kirjautumissivun.",
                "A. Portal Title (Portaalin nimi) – enintään 31 merkkiä.",
                "B. Terms of Use (Käyttöehdot) – enintään 1023 merkkiä.",
                "C. Logo Image (Logokuva) – mukauta logo lähettämällä JPG- tai PNG-kuva (alle 100 Kt).",
                "D. Background Image (Taustakuva) – mukauta tausta lähettämällä JPG- tai PNG-kuva (alle 2 Mt).",
                "6. Napsauta Save (Tallenna)."]
}]
} ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Salasana",
                           content: "Luo salasana, jossa on 8-63 ASCII-merkkiä tai 8-64 heksadesimaalimerkkiä (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Salasana",
                           content: "Käytä joko satunnaisesti luotua salasanaa tai luo salasana pituudeltaan 8-63 ASCII-merkkiä tai 8-64 heksadesimaalista merkkiä (0-9, a-f, A-F)."
                       }]
},
       NAT :{ 
               TITLE:"ALG",
               CONTENT: [{
                           type: "paragraph",
                           content: "ALG (Application Layer Gateway) sallii mukautettujen NAT (Network Address Translation) -ohitussuodattimien kytkemisen yhdyskäytävään osoitteiden ja porttien käännöksen tukemiseksi tietyillä sovelluskerroksen ohjaus/dataprotokollilla: FTP, TFTP, H323 jne. Suositellaan, että ALG otetaan käyttöön."
                       } ,{                      
                           type: "name",
                           title: "Ota FTP ALG käyttöön",
                           content: "Jos tämä valitaan, FTP (File Transfer Protocol) -asiakaslaitteet ja -palvelimet voivat siirtää dataa NAT:in kautta."
                       } ,{                      
                           type: "name",
                           title: "Ota TFTP ALG käyttöön",
                           content: "Jos tämä valitaan, TFTP (Trivial File Transfer Protocol) -asiakaslaitteet ja -palvelimet voivat siirtää dataa NAT:in kautta."
                       } ,{                      
                           type: "name",
                           title: "Ota H323 ALG käyttöön",
                           content: "Jos tämä valitaan, Microsoft NetMeeting -asiakaslaitteet voivat kommunikoida NAT:in kautta."
                       } ,{                      
                           type: "name",
                           title: "Ota RTSP ALG käyttöön",
                           content: "Jos tämä valitaan, mediasoitinasiakaslaitteet voivat kommunikoida suoratoistomediapalvelimien kanssa NAT:in kautta."
                       } ,{                      
                           type: "name",
                           title: "Ota SIG ALG käyttöön",
                           content: "Jos tämä asetus valitaan, asiakaslaitteet voivat olla yhteydessä SIP (Session Initiation Protocol) -palvelimiin NAT:illa."
                       } ,{                      
                           type: "name",
                           title: "Ota PPTP-läpivienti käyttöön",
                           content: "Jos tämä valitaan, Point-to-Point-istunnot voidaan tunneloida IP-verkon kautta ja reitittimen läpi."
                       } ,{                      
                           type: "name",
                           title: "Ota PPTPL2TP-läpivienti käyttöön",
                           content: "Jos tämä valitaan, 2. kerroksen Point-to-Point-istunnot voidaan tunneloida IP-verkon kautta ja reitittimen läpi."
                       } ,{                      
                           type: "name",
                           title: "Ota IPSec-läpivienti käyttöön",
                           content: "Jos tämä valitaan, IPSec (Internet Protocol security) voidaan tunneloida IP-verkon kautta ja reitittimen läpi. IPSec käyttää salaussuojauspalveluita taatakseen yksityisen ja suojatun tiedonsiirron IP-verkoissa."
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"Virtuaalipalvelimet",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Virtuaalipalvelimilla voidaan määrittää julkisia palveluita paikallisverkkoon. Virtuaalipalvelin määritellään ulkoiseksi portiksi, ja kaikki Internetistä tähän ulkoiseen porttiin saapuvat pyynnöt ohjataan uudelleen määrätylle tietokoneelle, jolle on konfiguroitava staattinen tai varattu IP-osoite.",
                "Kun kokoat palvelimen paikallisverkkoon ja haluat jakaa sen Internetissä, virtuaalipalvelimet voivat toteuttaa palvelun ja tarjota sitä Internet-käyttäjille."]
} ,{                      
                           type: "paragraph",
                           content: "Tässä taulukossa esitetään virtuaalipalvelimen asianmukaiset parametrit."
                       } ,{                      
                           type: "name",
                           title: "Palvelun tyyppi",
                           content: "Näyttää virtuaalipalvelimen nimen."
                       } ,{                      
                           type: "name",
                           title: "Ulkoinen portti",
                           content: "Näyttää virtuaalipalvelimen käyttämän portin tai porttisarjan numeron."
                       } ,{                      
                           type: "name",
                           title: "Sisäinen IP",
                           content: "Näyttää palvelusovellusta suorittavan tietokoneen IP-osoitteen."
                       } ,{                      
                           type: "name",
                           title: "Sisäinen portti",
                           content: "Näyttää palvelusovellusta suorittavan tietokoneen portin numeron."
                       } ,{                      
                           type: "name",
                           title: "Protokolla",
                           content: "Näyttää palvelusovellukselle käytetyn protokollan: TCP, UDP tai Kaikki (kaikki reitittimen tukemat protokollat)."
                       } ,{                      
                           type: "name",
                           title: "Tila",
                           content: "Näyttää tietyn suodatussäännön nykytilan (käytössä tai poissa käytöstä)."
                       } ,{                      
                           type: "name",
                           title: "Muokkaa",
                           content: "Näyttää vaihtoehdot muokata tai poistaa vastaavan säännön."
                       } ,{                      
                           type: "step",
                           title: "Virtuaalipalvelinsäännön määrittäminen",
       content: [ 
                "1. Napsauta Lisää.",
                "2. Napsauta Skannaa valitaksesi palvelun luettelosta, jotta Ulkoinen portti ja Sisäinen portti -kenttiin täytetään automaattisesti asianmukainen portin numero. Jos palvelua ei ole luettelossa, anna ulkoisen portin numero (esim. 21) tai porttien alue (esim. 21-25). Jätä Sisäinen portti tyhjäksi, jos se on sama kuin Ulkoinen portti tai anna määrätty portin numero (esim. 21), jos Ulkoinen portti on yksittäinen portti. Anna palvelua suorittavan tietokoneen IP-osoite pisteillä erotetussa desimaalimuodossa Sisäinen IP -kenttään.",
                "3. Valitse palvelusovellukselle protokolla: TCP, UDP tai Kaikki Protokolla -valintaluettelosta.",
                "4. Valitse Ota käyttöön.",
                "5. Napsauta Tallenna."]
} ,{                      
                           type: "note",
                           title: "Huomautus",
       content: [ 
                "1. Jos haluat poistaa tämän kohdan käytöstä, napsauta lamppukuvaketta.",
                "2. Suositellaan, että säilytät Internet-portin ja protokollan oletusasetukset, jos et ole varma, mitä porttia tai protokollaa käyttää.",
                "3. Jos paikallinen isäntälaite isännöi useampaa kuin yhtä palvelutyyppiä, sinun on luotava sääntö kullekin palvelulle. Huomaan, että ulkoisen portin ei saa olla päällekkäinen."]
}]
},
       PORT_TRIGGERING :{ 
               TITLE:"Port Triggering",
               CONTENT: [{
                           type: "paragraph",
                           content: "Port Triggering -toiminnolla liikenne ohjataan verkon tietyn palvelimen tiettyyn porttiin."
                       } ,{                      
                           type: "paragraph",
                           content: "Tässä taulukossa esitetään portintunnistuksen asianmukaiset parametrit."
                       } ,{                      
                           type: "name",
                           title: "Sovellus",
                           content: "Näyttää sovelluksen nimen."
                       } ,{                      
                           type: "name",
                           title: "Triggering Port",
                           content: "Näyttää lähtevän liikenteen portin, jolla käynnistetään lähtevän yhteyden suodatussääntö."
                       } ,{                      
                           type: "name",
                           title: "Trigger-protokolla",
                           content: "Näyttää Triggering Port -toiminnon käyttämän protokollan. TCP, UDP tai Kaikki (kaikki reitittimen tukemat protokollat)."
                       } ,{                      
                           type: "name",
                           title: "Ulkoinen portti",
                           content: "Näyttää etäjärjestelmän käyttämän portin tai porttialueen. Vastaus välitetään PC:lle käyttäen jotain näistä porteista, ja PC käynnistää tämän säännön. Voit syöttää enintään 5 porttiryhmää (tai porttiosiota). Jokainen porttiryhmä on erotettava pilkulla (\",\"), esimerkiksi 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
                       } ,{                      
                           type: "name",
                           title: "Ulkoinen protokolla",
                           content: "Näyttää saapuvan portin käyttämän protokollan. TCP, UDP tai Kaikki (kaikki reitittimen tukemat protokollat)."
                       } ,{                      
                           type: "name",
                           title: "Tila",
                           content: "Näyttää tietyn suodatussäännön nykytilan (käytössä tai poissa käytöstä)."
                       } ,{                      
                           type: "name",
                           title: "Muokkaa",
                           content: "Näyttää vaihtoehdot muokata tai poistaa vastaavan säännön."
                       } ,{                      
                           type: "step",
                           title: "Port Triggering -säännön määrittäminen",
       content: [{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Vain yksi isäntälaite voi käyttää kutakin sääntöä kerrallaan."
                       },
                "1. Napsauta Lisää.",
                "2. Napsauta Skannaa ja valitse luettelosta sovellus, joka täyttää automaattisesti oletusarvot asianmukaisiin kenttiin. Jos haluat lisätä sovelluksen, jota ei ole luettelossa, syötä Application, Triggering Port, Triggering Protocol, External Port ja External Protocol manuaalisesti.",
                "3. Valitse Ota käyttöön.",
                "4. Napsauta Tallenna."]
} ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Jos haluat poistaa tämän säännön käytöstä, napsauta lamppukuvaketta."
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "DMZ (Demilitarized Zone) -isäntälaitteen ominaisuuden avulla paikallinen isäntälaite voi olla yhteydessä Internetiin tiettyä palvelua, kuten nettipelejä tai videokokouksia, varten. DMZ periaatteessa sallii LAN-verkon yhden tietokoneen avata kaikki porttinsa. Kyseinen tietokone on konfiguroitava staattisella IP-osoitteella, ja sen DHCP-asiakastoiminto on poissa käytöstä."
                       } ,{                      
                           type: "paragraph",
                           content: "Kun DMZ on käytössä, DMZ-isäntä on täysin näkyvissä Internetistä, mistä voi koitua turvallisuusriskejä tietokoneelle. Jos DMZ ei ole käytössä, poista se ajoissa käytöstä."
                       } ,{                      
                           type: "step",
                           title: "Tietokoneen tai palvelimen määrääminen DMZ-palvelimelle",
       content: [ 
                "1. Valitse Ota DMZ käyttöön.",
                "2. Anna DMZ-isäntälaitteen IP-osoite -kenttään DMZ-isäntälaitteeksi valitun paikallisen tietokoneen IP-osoite.",
                "3. Napsauta Tallenna."]
}]
},
       UPNP :{ 
               TITLE:"UPnP",
               CONTENT: [{
                           type: "paragraph",
                           content: "Oletuksena UPnP (Universal Plug-and-Play) -ominaisuus on käytössä, jotta laitteet, kuten tietokoneet ja Internet-laitteet, voivat paikantaa toisensa automaattisesti paikallisverkossa ja siirtää tietoa keskenään."
                       } ,{                      
                           type: "paragraph",
                           content: "Voit joutua ottamaan UPnP:n käyttöön, jos haluat käyttää sovelluksia monipelaajapeleihin, vertaisverkkoyhteyksiin, reaaliaikaiseen viestintään (kuten VoIP tai teleVoIP-kokoukset), etäapuun tms."
                       } ,{                      
                           type: "name",
                           title: "UPnP-palveluluettelo",
                           content: "UPnP-palveluluettelo -luettelossa näytetään paikallisten isäntälaitteiden UPnP-tiedot."
                       }]
},
       MODEM :{ 
               TITLE:"3G/4G ohje",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB-modeemi",
                           content: "Näyttää 3G/4G USB-modeemin tilan"
                       } ,{                      
                           type: "name",
                           title: "Käytä automaattisesti tunnistettuja ISP-parametreja",
                           content: "Mediakirjasto on oletuksena käytössä. Jos se on käytössä, reititin voi tunnistaa SIM/RUIM-kortin ISP:n ja täyttää parametrit automaattisesti. Jos tunnistus epäonnistuu, valitse alue ja mobiili ISP manuaalisesti."
                       } ,{                      
                           type: "name",
                           title: "Alue",
                           content: "Valitsee ja näyttää alueesi automaattisesti, kun USB-modeemi ja SIM-kortti on tunnistettu. Valitse muussa tapauksessa alueesi valintavalikosta."
                       } ,{                      
                           type: "name",
                           title: "Mobiili-ISP",
                           content: "Näyttä 3G/4G-verkon ISP:n (Internet Service Provider). Jos sitä ei tunnisteta automaattisesti, valitse ISP valintavalikosta. Oletuspuhelinnumero ja APN täytetään automaattisesti tämän mukaisesti."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "Jos SIM/UIM-suojaus on käytössä, anna PIN-koodi. SIM/UIM-suojaus on oletusasetuksena poissa käytöstä. Huomaa, että jos annat virheellisen PIN-koodin 3 kertaa, SIM/UIM-kortti lukitaan automaattisesti. Voit vapauttaa lukituksen vain antamalla PUK-koodin PC:ltä/matkatietokoneelta."
                       } ,{                      
                           type: "name",
                           title: "Viesti",
                           content: "Näyttää SIM/UIM-kortin PIN-tiedot, jos PIN-suojaus on käytössä."
                       } ,{                      
                           type: "name",
                           title: "Asetukset Soita numeroon,APN,Käyttäjätunnus/salasana",
                           content: "Jos ISP:si ei ole <strong>Mobiili-ISP</strong>-luettelossa, valitse tämä valintaruutu ja anna ISP:ltä saatu Puhelinnumero, APN (tukiaseman nimi), Käyttäjätunnus ja Salasana."
                       } ,{                      
                           type: "name",
                           title: "Soita numeroon",
                           content: "Anna ISP:n antama Puhelinnumero."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Anna ISP:ltä saatu APN (tukiaseman nimi)."
                       } ,{                      
                           type: "name",
                           title: "Käyttäjätunnus/salasana",
                           content: "Anna ISP:n antama käyttäjätunnus ja salasana. Nämä kentät erottelevat kirjainkoon."
                       } ,{                      
                           type: "name",
                           title: "Yhdistä tarvittaessa",
                           content: "Tässä tilassa Internet-yhteys katkaistaan automaattisesti, kun laitetta ei ole käytetty tiettyyn aikaan (Max Idle Time). Yhteys muodostetaan uudelleen, kun yrität käyttää Internetiä uudelleen."
                       } ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Joskus yhteys ei katkea, vaikka olet määrittänyt Pisin käyttämättömyysaika -asetuksen, koska jotkut sovellukset käyttävät Internetiä taustalla."
                       } ,{                      
                           type: "name",
                           title: "Yhdistä automaattisesti",
                           content: "Tässä tilassa Internet-yhteys muodostuu uudelleen automaattisesti, jos se katkeaa."
                       } ,{                      
                           type: "name",
                           title: "Yhdistä manuaalisesti",
                           content: "Tässä tilassa Internet-yhteyttä hallitaan manuaalisesti napsauttamalla Yhdistä tai Katkaise yhteys -painiketta. Tämä tila tukee myös Pisin käyttämättömyysaika -toimintoa. Anna Pisin käyttämättömyysaika -kenttään pisin aika (minuuteissa), jonka Internet-yhteys voi olla käyttämättä, ennen kuin se katkaistaan. Oletusarvo on 15 minuuttia. Jos haluat, että Internet-yhteys on aina aktiivinen, anna 0 (nolla)."
                       } ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Joskus yhteys ei katkea, vaikka olet määrittänyt Pisin käyttämättömyysaika -asetuksen, koska jotkut sovellukset käyttävät Internetiä taustalla."
                       } ,{                      
                           type: "paragraph",
                           content: "Tallenna asetukset napsauttamalla Tallenna-painiketta."
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"3G/4G-lisäasetusten ohje",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB-modeemin",
                           content: "Näyttää 3G/4G USB-modeemin tilan"
                       } ,{                      
                           type: "name",
                           title: "Käytä automaattisesti tunnistettuja ISP-parametreja",
                           content: "Mediakirjasto on oletuksena käytössä. Jos se on käytössä, reititin voi tunnistaa SIM/RUIM-kortin ISP:n ja täyttää parametrit automaattisesti. Jos tunnistus epäonnistuu, valitse alue ja mobiili ISP manuaalisesti."
                       } ,{                      
                           type: "name",
                           title: "Alue",
                           content: "Valitsee ja näyttää alueesi automaattisesti, kun USB-modeemi ja SIM-kortti on tunnistettu. Valitse muussa tapauksessa alueesi valintavalikosta."
                       } ,{                      
                           type: "name",
                           title: "Mobiili-ISP",
                           content: "Näyttä 3G/4G-verkon ISP:n (Internet Service Provider). Jos sitä ei tunnisteta automaattisesti, valitse ISP valintavalikosta. Oletuspuhelinnumero ja APN täytetään automaattisesti tämän mukaisesti."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "Jos SIM/UIM-suojaus on käytössä, anna PIN-koodi. SIM/UIM-suojaus on oletusasetuksena poissa käytöstä. Huomaa, että jos annat virheellisen PIN-koodin 3 kertaa, SIM/UIM-kortti lukitaan automaattisesti. Voit vapauttaa lukituksen vain antamalla PUK-koodin PC:ltä/matkatietokoneelta."
                       } ,{                      
                           type: "name",
                           title: "Viesti",
                           content: "Näyttää SIM/UIM-kortin PIN-tiedot, jos PIN-suojaus on käytössä."
                       } ,{                      
                           type: "name",
                           title: "Asetukset Soita numeroon,APN,Käyttäjätunnus/salasana",
                           content: "Jos ISP:si ei ole <strong>Mobiili-ISP</strong>-luettelossa, valitse tämä valintaruutu ja anna ISP:ltä saatu Puhelinnumero, APN (tukiaseman nimi), Käyttäjätunnus ja Salasana."
                       } ,{                      
                           type: "name",
                           title: "Soita numeroon",
                           content: "Anna ISP:n antama Puhelinnumero."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "Anna ISP:ltä saatu APN (tukiaseman nimi)."
                       } ,{                      
                           type: "name",
                           title: "Käyttäjätunnus/salasana",
                           content: "Anna ISP:n antama käyttäjätunnus ja salasana. Nämä kentät erottelevat kirjainkoon."
                       } ,{                      
                           type: "name",
                           title: "Yhdistä tarvittaessa",
                           content: "Tässä tilassa Internet-yhteys katkaistaan automaattisesti, kun laitetta ei ole käytetty tiettyyn aikaan (Max Idle Time). Yhteys muodostetaan uudelleen, kun yrität käyttää Internetiä uudelleen."
                       } ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Joskus yhteys ei katkea, vaikka olet määrittänyt Pisin käyttämättömyysaika -asetuksen, koska jotkut sovellukset käyttävät Internetiä taustalla."
                       } ,{                      
                           type: "name",
                           title: "Yhdistä automaattisesti",
                           content: "Tässä tilassa Internet-yhteys muodostuu uudelleen automaattisesti, jos se katkeaa."
                       } ,{                      
                           type: "name",
                           title: "Yhdistä manuaalisesti",
                           content: "Tässä tilassa Internet-yhteyttä hallitaan manuaalisesti napsauttamalla Yhdistä tai Katkaise yhteys -painiketta. Tämä tila tukee myös Pisin käyttämättömyysaika -toimintoa. Anna Pisin käyttämättömyysaika -kenttään pisin aika (minuuteissa), jonka Internet-yhteys voi olla käyttämättä, ennen kuin se katkaistaan. Oletusarvo on 15 minuuttia. Jos haluat, että Internet-yhteys on aina aktiivinen, anna 0 (nolla)."
                       } ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Joskus yhteys ei katkea, vaikka olet määrittänyt Pisin käyttämättömyysaika -asetuksen, koska jotkut sovellukset käyttävät Internetiä taustalla."
                       } ,{                      
                           type: "name",
                           title: "Todennustyyppi",
                           content: "Valitse todennustyyppi. Oletuksena on Auto. Jotkut ISP:t vaativat tietyn todennustyypin; tarkista asia ISP:ltä tai pidä oletusasetukset."
                       } ,{                      
                           type: "name",
                           title: "Automaattinen",
                           content: "Jos asetus on Auto (oletus), reititin määrittää ISP:n käyttämän todennustyypin automaattisesti."
                       } ,{                      
                           type: "name",
                           title: "PAP",
                           content: "Jos asetus on PAP (Password Authentication Protocol), reititin suorittaa todennuksen vertaislaitteen kahdella kädenpuristuksella. Valitse tämä asetus, jos ISP vaatii tämän todennustyypin."
                       } ,{                      
                           type: "name",
                           title: "CHAP",
                           content: "Jos asetus on CHAP (Challenge Handshake Authentication Protocol), reititin suorittaa todennuksen vertaislaitteen kanssa kolmella kädenpuristuksella ja validoi vertaislaitteen identiteetin säännöllisesti. Valitse tämä asetus, jos ISP vaatii tämän todennustyypin."
                       } ,{                      
                           type: "name",
                           title: "MTU-koko",
                           content: "Oletus MTU (Maximum Transmission Unit) -koko on 1480 tavua. Älä muuta sitä, ellei ISP edellytä sitä."
                       } ,{                      
                           type: "name",
                           title: "Käytä seuraavia DNS-palvelimia",
                           content: "Jos ISP antaa DNS-palvelimen IP-osoitteen, valitse tämä valintaruutu ja anna <strong>Ensisijainen DNS</strong> ja Toissijainen DNS (valinnainen) -IP-osoite alle. Muutoin ISP määrittää DNS-palvelimet dynaamisesti."
                       } ,{                      
                           type: "name",
                           title: "Ensisijainen DNS",
                           content: "Anna DNS IP-osoite ISP:ltä saadussa pisteellä erotetussa desimaalimuodossa."
                       } ,{                      
                           type: "name",
                           title: "Toissijainen DNS",
                           content: "(Valinnainen) Anna toinen DNS IP-osoite ISP:ltä saadussa pisteellä erotetussa desimaalimuodossa."
                       } ,{                      
                           type: "paragraph",
                           content: "Tallenna asetukset napsauttamalla <strong>Tallenna</strong>-painiketta."
                       }]
},
       DISK_SETTING :{ 
               TITLE:"Laitteen asetukset",
               CONTENT: [{
                           type: "paragraph",
                           content: "Laiteasetukset -sivulla näytetään asianmukaiset tiedot kaikista USB-porttiin kytketyistä USB-tallennusvälineistä."
                       } ,{                      
                           type: "name",
                           title: "Skannaa",
                           content: "Tavallisesti reititin tunnistaa automaattisesti kaikki juuri liitetyt laitteet. Jos näin ei käy, napsauta tätä painiketta etsiäksesi uusia kytkettyjä laitteita ja päivittääksesi sivun uusin tiedoin."
                       } ,{                      
                           type: "name",
                           title: "Äänenvoimakkuus",
                           content: "Näyttää USB-aseman nimen."
                       } ,{                      
                           type: "name",
                           title: "Kapasiteetti",
                           content: "Näyttää USB-laitteen tallennuskapasiteetin."
                       } ,{                      
                           type: "name",
                           title: "Vapaa tila",
                           content: "Näyttää vapaan tallennustilan määrän."
                       } ,{                      
                           type: "name",
                           title: "Poista turvallisesti",
                           content: "Napsauta tätä USB-laitetta poistaaksesi USB-laitteen ennen kuin irrotat sen fyysisesti reitittimestä."
                       } ,{                      
                           type: "paragraph",
                           content: "Poistopainike on näkyvissä vain, kun reitittimeen on kytketty USB-tallennusväline. Kun asema on käytössä, sitä ei voi poistaa."
                       } ,{                      
                           type: "name",
                           title: "Tila",
                           content: "Tämä valintaruutu on näkyvissä vain, kun reitittimeen on kytketty USB-tallennusväline. Valitse se ottaaksesi käyttöön USB-laitteen tiedostonjako."
                       } ,{                      
                           type: "step",
                           title: "Tiedostopalvelimen määrittäminen",
       content: [ 
                "1. Kytke USB-tallennusväline reitittimen USB-porttiin USB-kaapelilla.",
                "2. Reitittimen tulisi tunnistaa juuri kytketty USB-laite automaattisesti ja näyttää sen tiedot Laiteasetukset-osassa. Jos ei, napsauta Skannaa.",
                "3. Valitse Aktiivinen ottaaksesi tiedostonjaon käyttöön."]
}]
},
       FOLDER_SHARE_ACCOUNT :{ 
               TITLE:"Jakotili",
               CONTENT: [{
                           type: "name",
                           title: "Tili",
                           content: "Voit kirjautua jaettuihin tiedostoihin ja kansioihin joko käyttämällä vaihtoehtoa Käytä oletustiliä tai Käytä uutta tiliä ja syöttämällä seuraavat tiedot luodaksesi uuden tilin."
                       } ,{                      
                           type: "name",
                           title: "Käyttäjätunnus/salasana",
                           content: "Anna käyttäjätunnus välillä 1-15 aakkosnumeerista merkkiä tai alaviivaa ja salasanan välillä 1-15 ASCII-merkkiä. Nämä kentät erottelevat kirjainkoon."
                       } ,{                      
                           type: "name",
                           title: "Vahvista salasana",
                           content: "Anna salasana uudelleen varmistaaksesi, että et ole kirjoittanut sitä väärin. Tämäkin kenttä erottelee kirjainkoon."
                       } ,{                      
                           type: "paragraph",
                           content: "Tallenna kaikki asetukset napsauttamalla Tallenna."
                       }]
},
       FOLDER_SHARE_SETTINGS :{ 
               TITLE:"Jakoasetukset",
               CONTENT: [{
                           type: "name",
                           title: "Verkon/mediapalvelimen nimi",
                           content: "Näyttää nimen, jolla kytkettyä USB-tallennuslaitetta käytetään."
                       } ,{                      
                           type: "name",
                           title: "Ota käyttöön",
                           content: "Valitse ottaaksesi käyttötavan käyttöön."
                       } ,{                      
                           type: "name",
                           title: "Käyttömenetelmä",
                           content: "Kytkettyä USB-tallennusvälinettä voidaan käyttää kolmella käyttötavalla. Voit valita yhden tai useamman käyttötavan valitsemalla vastaavan valintaruudun.",
       children: [{                      
                           type: "name",
                           title: "Verkkoympäristö",
                           content: "Jos tämä on käytössä, verkon käyttäjät voivat käyttää USB-tallennusvälinettä sille annetulla IP-osoitteella (esim. \\\\192.168.0.1)."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Jos tämä on käytössä, paikallisverkkosi FTP-asiakastietokoneet voivat käyttää USB-tallennusvälinettä sille annetulla IP-osoitteella, johon on lisätty FTP-palvelimen portin numero (esim. ftp://192.168.0.1:21)."
                       } ,{                      
                           type: "name",
                           title: "FTP (Internetin kautta)",
                           content: "Jos tämä on käytössä, käyttäjät voivat etäkäyttää USB-tallennusvälinettä FTP:llä Internetin kauta. Tämä ominaisuus tukee sekä tiedostojen latausta että lähettämistä. Voit vaihtaa FTP-palvelimen portin numeron antamalla portin numeron ja napsauttamalla Tallenna ottaaksesi muutokset käyttöön."
                       }]
} ,{                      
                           type: "name",
                           title: "Linkki",
                           content: "Näyttää osoitteen, jolla jaettua USB-tallennuslaitetta käytetään."
                       } ,{                      
                           type: "name",
                           title: "Portti",
                           content: "Näyttää FTP-palvelimen portin numeron. Käytä oletusarvoa tai arvoa väliltä 1024-65535."
                       } ,{                      
                           type: "paragraph",
                           content: "Tallenna kaikki asetukset napsauttamalla Tallenna."
                       }]
},
       FOLDER_SHARE_FOLDERS :{ 
               TITLE:"Kansion jakaminen",
               CONTENT: [{
                           type: "name",
                           title: "Jaa kaikki",
                           content: "Valitse On jakaaksesi kaikki tiedostot ja kansiot tai Off jakaaksesi vain valitut kansiot."
                       } ,{                      
                           type: "name",
                           title: "Ota todennus käyttöön",
                           content: "Suositellaan, että todennus otetaan käyttöön, jotta käyttäjien on annettava voimassa oleva käyttäjätunnus ja salasana voidakseen käyttää jaettuja kansioita."
                       } ,{                      
                           type: "name",
                           title: "Kansion nimi",
                           content: "Näyttää jaetun kansion nimen."
                       } ,{                      
                           type: "name",
                           title: "Kansion polku",
                           content: "Näyttää jaetun kansion polun."
                       } ,{                      
                           type: "name",
                           title: "Median jakaminen",
                           content: "Ilmoittaa, onko median jakaminen sallittua jaetussa kansiossa."
                       } ,{                      
                           type: "name",
                           title: "Aseman nimi",
                           content: "Näyttää jaetun aseman nimen."
                       } ,{                      
                           type: "name",
                           title: "Tila",
                           content: "Näyttää jaetun kansion tilan hehkulampun kuvalla."
                       } ,{                      
                           type: "name",
                           title: "Muokkaa",
                           content: "Näyttää vaihtoehdot muokata tai poistaa vastaavan jaetun kansion."
                       } ,{                      
                           type: "name",
                           title: "Selaa",
                           content: "Napsauta hakeaksesi jaettua kansiota."
                       } ,{                      
                           type: "name",
                           title: "Salli vierasverkkokäyttö",
                           content: "Valitse salliaksesi vierasverkon asiakaslaitteiden käyttää jaettuja kansioita."
                       } ,{                      
                           type: "name",
                           title: "Ota todennus käyttöön",
                           content: "Valitse edellyttääksesi, että käyttäjät käyttävät jaettuja kansioita voimassa olevalla käyttäjätunnuksella ja salasanalla."
                       } ,{                      
                           type: "name",
                           title: "Ota kirjoitusoikeus käyttöön",
                           content: "Valitse salliaksesi käyttäjien muuttaa kansion sisältöä."
                       } ,{                      
                           type: "name",
                           title: "Ota median jakaminen käyttöön",
                           content: "Valitse ottaaksesi median jaon käyttöön."
                       } ,{                      
                           type: "name",
                           title: "Päivitä",
                           content: "Napsauta päivittääksesi jaettujen kansioiden luettelon."
                       }]
},
       PRINT_SERVER :{ 
               TITLE:"Tulostinpalvelin",
               CONTENT: [{
                           type: "name",
                           title: "Tulostinpalvelin",
                           content: "Valitse On ottaaksesi tulostuspalvelintoiminnon käyttöön."
                       } ,{                      
                           type: "name",
                           title: "Tulostimen nimi",
                           content: "Näyttää reitittimeen kytketyn tulostimen nimen."
                       }]
},
       TIME_MACHINE :{ 
               TITLE:"Time Machine",
               CONTENT: [{
                           type: "paragraph",
                           content: "Time Machine varmuuskopioi kaikki Mac-tietokoneesi tiedostot modeemireitittimeen kytketylle USB-tallennuslaitteelle."
                       } ,{                      
                           type: "name",
                           title: "Ota käyttöön ",
                           content: "Valitse tämä valintaruutu ottaaksesi Time Machine -toiminnon käyttöön."
                       } ,{                      
                           type: "name",
                           title: "Varmuuskopiointilevy",
                           content: "Valitse, minne Time Machine -varmuuskopiot tallennetaan."
                       } ,{                      
                           type: "name",
                           title: "Varmuuskopioiden kokorajoitus",
                           content: "Määritä, paljonko levytilaa Time Machine -varmuuskopioille voi käyttää. 0 tarkoittaa, että tilarajoitusta ei ole."
                       } ,{                      
                           type: "name",
                           title: "Tallenna",
                           content: "Tallenna asetukset napsauttamalla."
                       }]
},
       OFFLINE_DOWNLOAD :{ 
               TITLE:"Offline-lataus",
               CONTENT: [{
                           type: "paragraph",
                           content: "Kun Offline-lataus on käytössä, reititin voi ladata tiedostoja ilman että tietokoneen on oltava jatkuvasti päällä."
                       } ,{                      
                           type: "name",
                           title: "Tila",
                           content: "Kytke päälle ottaaksesi käyttöön Offline-lataus -ominaisuuden."
                       } ,{                      
                           type: "name",
                           title: "Kansion polku",
                           content: "Valitse hakemistopolku latausten tallennukselle tai välimuistille.",
       children: [{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Älä vaihda hakemistopolkua tai irrota USB-tallennuslaitetta lähettäessäsi tai ladatessasi tiedostoja, muutoin saattaa ilmetä vakavia virheitä."
                       }]
} ,{                      
                           type: "name",
                           title: "Aikataulu",
                           content: "Valitse valintaruutu ottaaksesi käyttöön Aikataulu -ominaisuuden, jolla voit valita tiedostojen lataus/lähetysajan."
                       } ,{                      
                           type: "name",
                           title: "Jatka lähettämistä tehtävän suorittamisen jälkeen",
                           content: "Valitse valintaruutu, jotta valmiiden latausten tietojen lähettäminen muille jatkuisi."
                       } ,{                      
                           type: "name",
                           title: "Aktiivisten latausten maksimimäärä",
                           content: "Anna arvo välillä 1–10 aktiivisten latausten maksimimäärälle. Oletusarvo on 5."
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"Lataukset",
               CONTENT: [{
                           type: "note",
                           title: "Tiedosto",
                           content: "Näytä ladattavan tiedoston nimi ja tyyppi."
                       } ,{                      
                           type: "note",
                           title: "Nopeus",
                           content: "Näyttää sen hetkisen latausnopeuden (tai lähetysnopeuden)."
                       } ,{                      
                           type: "note",
                           title: "Valmis",
                           content: "Näytä latauksen edistyminen."
                       } ,{                      
                           type: "note",
                           title: "Jäljellä oleva aika",
                           content: "Näytä latauksen jäljellä oleva aika."
                       } ,{                      
                           type: "note",
                           title: "Yhdistetyt vertaislaitteet",
                           content: "Näytä latauksen yhdistettyjen vertaiskäyttäjien määrä."
                       } ,{                      
                           type: "note",
                           title: "Tila",
                           content: "Näytä latauksen nykytila (ladataan, odotetaan, siemennetään, keskeytetty, valmis tai virhe)."
                       } ,{                      
                           type: "name",
                           title: "Uuden latauksen lisääminen",
       children: [{                      
                           type: "step",
       content: [ 
                "1. Napsauta Lisää.",
                "2. Valitse latauksen lähde, virta PC:ltä, virta USB:ltä tai URL.",
                "3. Varitse virran sijainti BT:lle tai anna FTP:n, HTTP:n ja aMulen URL.",
                "4. Napsauta Tallenna.",
                "5. Määritä aMulelle aMule-palvelimen IP-osoite ja portti kohdassa Lisäasetukset > aMule-palvelin."]
}]
} ,{                      
                           type: "name",
                           title: "Latausten poistaminen",
                           content: "Valitse poistettavien latausten valintaruudut ja napsauta taulukon yläpuolelta Poista."
                       } ,{                      
                           type: "name",
                           title: "Latausten keskeyttäminen",
                           content: "Napsauta keskeytettävien latausten valintaruutuja ja napsauta taulukon yläpuolelta Tauko."
                       } ,{                      
                           type: "name",
                           title: "Latausten jatkaminen",
                           content: "Napsauta jatkettavien latausten valintaruutuja ja napsauta taulukon yläpuolelta Jatka."
                       }]
},
       OFFLINE_DOWNLOAD_ADVANCED :{ 
               TITLE:"Lisäasetukset",
               CONTENT: [{
                           type: "name",
                           title: "Nopeusrajoitukset",
                           content: "Määritä Internet-yhteydellesi latausten ja lähetysten maksiminopeus."
                       } ,{                      
                           type: "name",
                           title: "Suurin latausnopeus",
                           content: "Anna arvo välillä 1–100000 kB/s määrittääksesi latauksen maksiminopeuden. Oletusarvo on 1024."
                       } ,{                      
                           type: "name",
                           title: "Suurin lähetysnopeus",
                           content: "Anna arvo välillä 1–100000 kB/s määrittääksesi lähetyksen maksiminopeuden. Oletusarvo on 512."
                       } ,{                      
                           type: "name",
                           title: "Yhteyksien määrä",
                           content: "Valitse yhteyksien maksimimäärä."
                       } ,{                      
                           type: "name",
                           title: "Yhteyksien globaali maksimimäärä",
                           content: "Anna arvo välillä 1–200 yhteyksien yleiselle maksimimäärälle. Oletusarvo on 100."
                       } ,{                      
                           type: "name",
                           title: "Yhdistettyjen vertaislaitteiden maksimimäärä virtaa kohden",
                           content: "Anna arvo välillä 1–100 virtauskohtaisten vertaisyhteyksien maksimimäärälle. Oletusarvo on 50."
                       } ,{                      
                           type: "name",
                           title: "Ota DHT-verkko käyttöön",
                           content: "Ota tämä ominaisuus käyttöön parantaaksesi vertaiskäyttäjien löytämistä, jotta voit kasvattaa latausnopeutta."
                       } ,{                      
                           type: "name",
                           title: "Ota vertaislaitteiden vaihto käyttöön",
                           content: "Ota tämä ominaisuus käyttöön parantaaksesi vertaisryhmän tiedonsiirtotehoa, jotta voit kasvattaa latausnopeutta."
                       } ,{                      
                           type: "name",
                           title: "Ota BitTorrent-protokollan salaus käyttöön",
                           content: "Ota tämä ominaisuus käyttöön tehostaaksesi suojausta ja luottamuksellisuutta tiedonsiirrossa."
                       } ,{                      
                           type: "name",
                           title: "aMule-palvelin",
                           content: "Anna aMule-palvelimen IP-osoite ja portti. aMule-lataus toimii vain, kun reititin on kytketty palvelimeen."
                       }]
},
       PARENTAL_CONTROL :{ 
               TITLE:"Lapsilukko",
               CONTENT: [{
                           type: "paragraph",
                           content: "Lapsilukituksella voit estää asiattomat, eksplisiittiset ja haitalliset sivustot ja rajoittaa käytön tiettyihin aikoihin (esimerkiksi Facebook tai YouTube läksyjentekoaikaan)."
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"Lapsilukituksen alaiset laitteet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tässä taulukossa näytetään tällä hetkellä lapsilukituksella rajoitettujen laitteiden tiedot ja asetukset."
                       } ,{                      
                           type: "step",
                           title: "Uuden asiakaslaitteen rajoittaminen",
       content: [ 
                "1. Kytke lapsilukitus päälle.",
                "2. Napsauta Lisää.",
                "3. Napsauta Skannaa ja valitse yhdistetty laite Käytä laiteluetteloa; voit myös antaa laitenimen ja MAC-osoitteen manuaalisesti lisätäksesi laitteen, jota ei ole yhdistetty.",
                "4. Napsauta voimassaoloaikakuvaketta määrittääksesi, milloin rajoitus on voimassa.",
                "5. Anna Kuvaus -kenttään lyhyt kuvaus. Tämä kenttä on valinnainen.",
                "6. Valitse Ota tämä syöte käyttöön.",
                "7. Napsauta Tallenna."]
} ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Jos haluat poistaa tämän kohdan käytöstä, napsauta lamppukuvaketta."
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"Sisältörajoitus",
               CONTENT: [{
                           type: "paragraph",
                           content: "Sisältörajoituksilla voit rajoittaa pääsyä tietyille sivuille avainsanoilla ja verkkotunnuksilla. Lapsilukituksen alaiset asiakaslaitteet joko voivat tai eivät voi käyttää näitä sivustoja, riippuen valitsemastasi rajoituskäytännöstä."
                       } ,{                      
                           type: "step",
                           title: "Käytettävän sisällön määrittäminen",
       content: [ 
                "1. Kytke sisältörajoitus päälle.",
                "2. Valitse tarvitsemasi rajoituskäytäntö:",
                "A. Jos haluat lapsilukittujen laitteiden pystyvän käyttämään kaikkia muita paitsi nimettyjä sivustoja, valitse Musta lista.",
                "B. Jos haluat lapsilukittujen laitteiden pystyvän käyttämään vain tiettyjä sivustoja, valitse Valkoinen lista.",
                "3. Napsauta Lisää uusi avainsana lisätäksesi verkko-osoitteen avainsanan (esimerkiksi wikipedia) tai verkkotunnuksen mustalle tai valkoiselle listalle.",
                "4. Napsauta Tallenna."]
}]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (Quality of Service) auttaa priorisoimaan Internet-liikenteen tarpeittesi mukaan. Voit määrittää laitteen, fyysisen portin tai sovelluksen prioriteettitason QoS-sääntöluettelossa."
                       } ,{                      
                           type: "note",
                           id: "qos-boost",
                           title: "Huomautus",
                           content: "Jos NAT Boost on käytössä, QoS tulee poistaa käytöstä."
                       } ,{                      
                           type: "name",
                           title: "Lähetyskaistanleveys",
                           content: "Anna ISP:n antama suurin lähetyskaistanleveys."
                       } ,{                      
                           type: "name",
                           title: "Latauskaistanleveys",
                           content: "Anna ISP:n antama suurin latauskaistanleveys."
                       }]
},
       QOS_ADV :{ 
               TITLE:"Lisäasetukset",
               CONTENT: [{
                           type: "name",
                           title: "Korkea/keskitason/matala prioriteetti",
                           content: "Määritä korkean/keskitason/matalan prioriteetin liikenteen prosenttiosuus.",
       children: [{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Kaikkien prioriteettien suurin määrä (prosenttiosuus) on 1."
                       }]
}]
},
       QOS_RULE :{ 
               TITLE:"QoS-sääntöluettelo",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tähän voit lisätä yksityiskohtaisia QoS-sääntöjä priorisoidaksesi Internet-liikennettä."
                       } ,{                      
                           type: "step",
                           title: "QoS-säännön määrittäminen",
       content: [ 
                "1. Napsauta Lisää.",
                "2. Lisää QoS-sääntö valitsemalla prioriteettityyppi.",
                "By Device (Laitteen mukaan) - Napsauta Scan (Skannaa) valitaksesi haluamasi laitteen tai anna laitteen nimi ja MAC-osoite manuaalisesti.",
                "Sovelluksen mukaan - Valitse haluamasi sovellus tai mukauta sovellusta määrittämällä nimi, protokolla ja kohdeportti (1-65535). Voit antaa yhden tai useamman portin tai porttialueen pilkuilla erotettuna (esim. 21,36-105,111).",
                "Fyysisen portin mukaan - Valitse haluamasi portti.",
                "3. Napsauta Tallenna."]
} ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Voit muuttaa säännön prioriteettia vetämällä sen toiseen prioriteettilistaan."
                       }]
},
       QOS_DATABASE :{ 
               TITLE:"Tietokannan päivitys",
               CONTENT: [{
                           type: "paragraph",
                           content: "Julkaisemme uusimman tietokantaversion osoitteessa www.tp-link.com. Voit ladata ja päivittää reittimen tietokannan lisätäksesi sen tukemien sovellusten määrää."
                       } ,{                      
                           type: "name",
                           title: "Uusi tietokantatiedosto",
                           content: "Napsauta Selaa paikantaaksesi uusimman tietokantatiedoston. Valitse se ja napsauta Päivitä päivittääksesi tietokantasi uusimpaan versioon."
                       }]
},
       SECURITY_FIREWALL :{ 
               TITLE:"Palomuuri",
               CONTENT: [{
                           type: "name",
                           title: "SPI-palomuuri",
                           content: "SPI (Stateful Packet Inspection) -palomuuri estää kyberhyökkäykset ja vahvistaa reitittimen läpi kulkevan liikenteen protokollan perusteella. Tämä ominaisuus on oletuksena käytössä."
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"DoS-suojaus",
               CONTENT: [{
                           type: "name",
                           title: "DoS-suojaus",
                           content: "Denial of Service (DoS) -suojaus suojaa LAN-verkon DoS-hyökkäyksiä täyttämästä verkkoasi palvelinpyynnöillä. Voit suodattaa seuraavat kolme hyökkäystyyppiä tarpeittesi mukaan. Kullakin suodattimella on neljä tasoa:",
       children: [{                      
                           type: "name",
                           title: "Pois",
                           content: "Ei suojausta."
                       } ,{                      
                           type: "name",
                           title: "Matala",
                           content: "Matala suojaustaso ja pieni vaikutus reitittimen suorituskykyyn."
                       } ,{                      
                           type: "name",
                           title: "Keskitaso",
                           content: "Keskitason suojaus ja puoliksi huomattava vaikutus reitittimen suorituskykyyn."
                       } ,{                      
                           type: "name",
                           title: "Korkea",
                           content: "Korkea suojaustaso mutta huomattava vaikutus reitittimen suorituskykyyn."
                       }]
} ,{                      
                           type: "name",
                           title: "ICMP-FLOOD-suojausten suodatus",
                           content: "Ota käyttöön estääksesi ICMP (Internet Control Message Protocol) -hyökkäykset."
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD-suojausten suodatus",
                           content: "Ota käyttöön estääksesi UDP (User Datagram Protocol) -hyökkäykset."
                       } ,{                      
                           type: "name",
                           title: "TCP-SYN-FLOOD-suojausten suodatus",
                           content: "Ota käyttöön estääksesi TCP-SYN (Transmission Control Protocol-Synchronize) -hyökkäykset."
                       } ,{                      
                           type: "name",
                           title: "Ohita WAN-portin ping-paketti",
                           content: "Ota käyttöön jättääksesi WAN-portista saapuvat ping-paketit huomiotta."
                       } ,{                      
                           type: "name",
                           title: "Kiellä LAN-portin ping-paketti",
                           content: "Ota käyttöön kieltääksesi LAN-portista saapuvat ping-paketit."
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"Estettyjen DoS-isäntien luettelo",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tässä taulukossa näytetään estettyjen DoS-isäntälaitteiden IP- ja MAC-osoitteet."
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"Käytönohjaus",
               CONTENT: [{
                           type: "paragraph",
                           content: "Käytönhallinnalla sallitaan tai estetään verkkosi käyttö tietyille asiakaslaitteille. Kun laite on estetty, se ei pysty kommunikoimaan muiden laitteiden kanssa tai muodostamaan yhteyttä Internetiin."
                       } ,{                      
                           type: "step",
                           title: "Käytönhallinta",
       content: [ 
                "1. Ota käytönhallinta käyttöön kytkemällä tämä päälle.",
                "2. Jos haluat myös hallita vierasverkkoon yhdistetyjen laitteiden käyttöä, kytke vieraslaitteiden hallinta päälle.",
                "3. Valitse tarvitsemasi käyttötila ja napsauta Tallenna:",
                "A. Jos haluat estää pääsyn alla olevan luettelon laitteilta, valitse Musta lista.",
                "B. Jos haluat sallia pääsyn vain alla olevan luettelon laitteille, valitse Valkoinen lista.",
                "4. Napsauta kohdassa Devices in Mustan/valkoisen listan laitteet. Lisää. Anna laitteen laitenimi ja MAC-osoite. Napsauta Tallenna."]
} ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Jos haluat poistaa tämän kohdan käytöstä, napsauta lamppukuvaketta."
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"Verkon laitteet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tässä taulukossa näytetään kaikkien yhdistettyjen laitteiden tiedot (mukaan lukien vierasverkkoon yhdistetyt laitteet, jos vieraslaitteiden hallinta on käytössä)."
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"IP- ja MAC-sidonta",
               CONTENT: [{
                           type: "paragraph",
                           content: "IP- ja MAC-sidonnasta (käytetään myös nimeä ARP-sidonta) on hyötyä hallittaessa tietyn laitteen pääsyä LAN-verkkoon sitomalla laitteen IP- ja MAC-osoitteet yhteen. IP- ja MAC-sidonta estää lisäksi muita laitteita käyttämästä tiettyä IP-osoitetta."
                       } ,{                      
                           type: "step",
                           title: "Laitteen määrittäminen IP- ja MAC-sidonnalla",
       content: [ 
                "1. Napsauta Lisää.",
                "2. Anna laitteen MAC-osoite.",
                "3. Anna IP-osoite, jonka haluat sitoa yllä mainittuun MAC-osoitteeseen.",
                "4. Valitse Ota käyttöön.",
                "5. Napsauta Tallenna."]
} ,{                      
                           type: "note",
                           title: "Huomautus",
       content: [ 
                "1. Yhtä IP-osoitetta ei voi sitoa useampaan kuin yhteen MAC-osoitteeseen.",
                "2. Jos haluat poistaa tämän kohdan käytöstä, napsauta lamppukuvaketta."]
}]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"ARP-luettelo",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tässä taulukossa näytetään yhdistetyjen laitteiden IP- ja MAC-osoitteet."
                       }]
},
       IPV6 :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "name",
                           title: "IPv6",
                           content: "IPv6 (Internet Protocol version 6) on IP:n (Internet Protocol) tuorein versio ja käsittelee IPv4 (Internet Protocol version 4) -osoitteiden loppumisen ongelman."
                       } ,{                      
                           type: "title",
                            title: "Internet-yhteystyyppi: Dynaaminen IP-osoite"
                       } ,{                      
                           type: "name",
                           title: "Dynaaminen IP-osoite",
                           content: "Valitse tämä tyyppi, jos ISP käyttää dynaamista IPv6-osoitteiden määräämistä."
                       } ,{                      
                           type: "name",
                           title: "IPv6-osoite/Ensisijainen DNS/Toissijainen DNS",
                           content: "DHCPv6-palvelin määrittää nämä parametrit automaattisesti ISP:ltä."
                       } ,{                      
                           type: "name",
                           title: "Uudista",
                           content: "Napsauta tätä painiketta saadaksesi uudet IPv6-parametrit ISP:n DHCPv6-palvelimelta."
                       } ,{                      
                           type: "name",
                           title: "Vapauta",
                           content: "Napsauta tätä painiketta vapauttaaksesi kaikki ISP:ltä saadut DHCPv6-palvelimen määräämät IPv6-osoitteet."
                       } ,{                      
                           type: "name",
                           title: "Hanki IPv6-osoite",
                           content: "Valitse DHCPv6 saadaksesi vakituinen IPv6-osoite tai SLAAC saadaksesi IPv6-osoite, joka on tuotettu reitittimen mainospaketista, ISP:n tietojen mukaan."
                       } ,{                      
                           type: "name",
                           title: "Etuliitteen delegointi",
                           content: "Valitse Ota käyttöön saadaksesi ISP:n DHCPv6-palvelimen delegoimaan etuliitteen tai Poista käytöstä määrittääksesi osoitteen etuliitteen manuaalisesti. LAN-verkon asiakaslaitteet luovat IPv6-osoitteen tällä etuliitteellä."
                       } ,{                      
                           type: "name",
                           title: "DNS-osoite",
                           content: "Valitse Hanki dynaamisesti ISP:ltä tai Käytä seuraavaa DNS-osoitetta. Jos valitset Käytä seuraavaa DNS-osoitetta, anna ISP:ltä saatu DNS-osoite manuaalisesti."
                       } ,{                      
                           type: "title",
                            title: "Internet-yhteystyyppi: Staattinen IP-osoite"
                       } ,{                      
                           type: "name",
                           title: "Staattinen IP-osoite",
                           content: "Valitse tämä tyyppi, jos ISP käyttää staattista IPv6-osoitteiden määräämistä."
                       } ,{                      
                           type: "name",
                           title: "IPv6-osoite/Oletusyhdyskäytävä/Ensisijainen DNS/Toissijainen DNS",
                           content: "Anna ISP:n antamat parametrit."
                       } ,{                      
                           type: "name",
                           title: "MTU-koko",
                           content: "MTU:n (Maximum Transmission Unit) oletus- ja tyypillinen koko useimmissa Ethernet-verkoissa on 1500 tavua. MTU:n oletuskokoa EI suositella muutettavan, ellei ISP niin vaadi."
                       } ,{                      
                           type: "title",
                            title: "Internet-yhteystyyppi: 6to4-tunneli"
                       } ,{                      
                           type: "name",
                           title: "6to4-tunneli",
                           content: "Valitse tämä tyyppi, jos ISP käyttää 6to4-käyttöönoton osoitteiden määräämistä."
                       } ,{                      
                           type: "name",
                           title: "IPv4-osoite/IPv4-aliverkon peite/IPv4-oletusyhdyskäytävä/Tunnelin osoite",
                           content: "WAN-portin IPv4-tiedot tuottavat nämä parametrit dynaamisesti, kun napsautat Yhdistä."
                       } ,{                      
                           type: "name",
                           title: "Käytä seuraavaa DNS-palvelinta",
                           content: "Valitse tämä, jos haluat antaa ensisijaisen DNS:n ja/tai toissinaisen DNS:n ISP:n tietojen mukaan manuaalisesti."
                       } ,{                      
                           type: "name",
                           title: "Yhdistä",
                           content: "Muodosta Internet-yhteys napsauttamalla tätä painiketta."
                       } ,{                      
                           type: "name",
                           title: "Katkaise yhteys",
                           content: "Pura Internet-yhteys napsauttamalla tätä painiketta."
                       } ,{                      
                           type: "title",
                            title: "Internet-yhteystyyppi: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE",
                           content: "Valitse tämä tyyppi, jos ISP käyttää PPPoEv6:tta ja antaa käyttäjätunnuksen ja salasanan."
                       } ,{                      
                           type: "name",
                           title: "Käyttäjätunnus/salasana",
                           content: "Anna ISP:n antamat parametrit."
                       } ,{                      
                           type: "name",
                           title: "IPv6-osoite",
                           content: "DHCPv6-palvelin määrää tämän osoitteen automaattisesti ISP:ltä, kun olet antanut käyttäjätunnuksen ja salasanan ja painanut Yhdistä."
                       } ,{                      
                           type: "name",
                           title: "Hanki IPv6-osoite",
                           content: "Valitse DHCPv6 saadaksesi vakituinen IPv6-osoite tai SLAAC saadaksesi IPv6-osoite, joka on tuotettu reitittimen mainospaketista, tai ISP:n mukaan syöttääksesi IPv6-osoitteen manuaalisesti, ISP:n tietojen mukaan."
                       } ,{                      
                           type: "name",
                           title: "Etuliitteen delegointi",
                           content: "Valitse Ota käyttöön saadaksesi ISP:n DHCPv6-palvelimen delegoimaan etuliitteen tai Poista käytöstä määrittääksesi osoitteen etuliitteen manuaalisesti. LAN-verkon asiakaslaitteet luovat IPv6-osoitteen tällä etuliitteellä."
                       } ,{                      
                           type: "name",
                           title: "DNS-osoite",
                           content: "Valitse Hanki dynaamisesti ISP:ltä tai Käytä seuraavaa DNS-osoitetta. Jos valitset Käytä seuraavaa DNS-osoitetta, anna ISP:ltä saatu DNS-osoite manuaalisesti."
                       } ,{                      
                           type: "name",
                           title: "Yhdistä",
                           content: "Muodosta Internet-yhteys napsauttamalla tätä painiketta."
                       } ,{                      
                           type: "name",
                           title: "Katkaise yhteys",
                           content: "Pura Internet-yhteys napsauttamalla tätä painiketta."
                       } ,{                      
                           type: "title",
                            title: "Internet-yhteystyyppi: Läpivienti (Välitili)"
                       } ,{                      
                           type: "paragraph",
                           content: "Valitse tämä tyyppi, jos ISP käyttää läpivienti (Silta) -verkkokäyttöönottoa. Tämä yhteystyyppi ei edellytä konfigurointia."
                       }]
},
       IPV6_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Läpivientiä (Silta) lukuun ottamatta muut 6 Internet-yhteystyyppiä vaativat IPv6-konfiguraation."
                       } ,{                      
                           type: "name",
                           title: "Määrätty tyyppi",
                           content: "Valitse ISP:n ilmoittama vaihtoehto.",
       children: [{                      
                           type: "name",
                           title: "DHCPv6",
                           content: "IP-osoitteen määrääminen automaattisesti LAN-verkon asiakaslaitteille.",
       children: [{                      
                           type: "name",
                           title: "Osoitteen etuliite",
                           content: "Anna ISP:n antama osoitteen etuliite."
                       } ,{                      
                           type: "name",
                           title: "Vapautusaika",
                           content: "Tämä on määrätyn IP-osoitteen voimassaoloaika. Joko pidä oletusarvo 86400 sekuntia tai vaihda se, jos ISP niin vaatii."
                       } ,{                      
                           type: "name",
                           title: "Osoite",
                           content: "Se on ISP:n DHCPv6-palvelimen automaattisesti määräämä IP-osoite."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+tilaton DHCP",
       children: [{                      
                           type: "name",
                           title: "Osoitteen etuliite",
                           content: "Anna ISP:n antama osoitteen etuliite."
                       } ,{                      
                           type: "name",
                           title: "Osoite",
                           content: "Se on ISP:n automaattisesti antama IP-osoite."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+RDNSS",
       children: [{                      
                           type: "name",
                           title: "Osoitteen etuliite",
                           content: "Anna ISP:n antama osoitteen etuliite."
                       } ,{                      
                           type: "name",
                           title: "Osoite",
                           content: "Se on ISP:n automaattisesti antama IP-osoite."
                       }]
}]
}]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"MAC-osoitteen kloonaus",
               CONTENT: [{
                           type: "paragraph",
                           content: "Valitse asianmukainen MAC Clone -menetelmä."
                       } ,{                      
                           type: "name",
                           title: "ÄLÄ kloonaa MAC-osoitetta",
                           content: "ÄLÄ muuta reitittimen oletus-MAC-osoitetta, jos ISP ei sido annettua IP-osoitetta MAC-osoitteeseen."
                       } ,{                      
                           type: "name",
                           title: "Kloonaa tämän tietokoneen MAC-osoite",
                           content: "Valitse kopioida nykyinen reitittimeen kytketyn tietokoneen MAC-osoite, jos ISP sitoo annetun IP-osoitteen tietokoneen MAC-osoitteeseen."
                       } ,{                      
                           type: "name",
                           title: "Käytä mukautettua MAC-osoitetta",
                           content: "Anna MAC-osoite manuaalisesti, jos ISP sitoo annetun IP-osoitteen tiettyyn MAC-osoitteeseen."
                       }]
},
       TIME_SETTING :{ 
               TITLE:"Aika-asetukset",
               CONTENT: [{
                           type: "paragraph",
                           content: "Aika-asetuksilla voit määrittää reitittimen järjestelmäajan. Kun sitä muutetaan, järjestelmäaikaa käytetään aikaan perustuvissa toiminnoissa ja kokoonpanoissa, kuten lapsilukituksessa."
                       } ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Voit kytkeä sen päälle ottaaksesi käyttöön 24 tunnin aikailmaisun, mitä käytetään järjestelmäpohjaisiin toimintoihin ja kokoonpanoihin."
                       } ,{                      
                           type: "title",
                            title: "Järjestelmän kellonaika"
                       } ,{                      
                           type: "step",
                           title: "Ajan saaminen Internetistä",
       content: [ 
                "Valittu oletuksena; ajan hankkiminen Internetistä mahdollistaa järjestelmäajan hankkimisen Internetistä.",
                "1. Valitse Hanki Internetistä.",
                "2. Valitse paikallinen aikavyöhyke avattavasta valikosta.",
                "3. Kirjoita NTP Server I -kenttään haluamasi NTP-palvelimen IP-osoite tai toimialueen nimi.",
                "4. Kirjoita NTP Server I -kenttään toisen NTP-palvelimen IP-osoite tai toimialueen nimi. (valinnainen)",
                "5. Napsauta Hanki.",
                "6. Napsauta Save (Tallenna)."]
} ,{                      
                           type: "step",
                           title: "Ajan saaminen PC:ltä",
       content: [ 
                "Tällä ominaisuudella voit hankkia järjestelmäajan PC:ltä. Tarkista PC:n aika ennen määrittämistä.",
                "Valitse Hanki PC:ltä ja napsauta Tallenna."]
} ,{                      
                           type: "step",
                           title: "Ajan määrittäminen manuaalisesti",
       content: [ 
                "Jos laitteesi ei voi saada aikaa automaattisesti Internetistä tai PC:ltä, voit määrittää järjestelmäajan manuaalisesti.",
                "1. Valitse Manuaalisesti.",
                "2. Anna tämä päivämäärä ja aika.",
                "3. Napsauta Tallenna."]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Kesäaika",
                           content: "Tämä ominaisuus voi synkronoida järjestelmäajan automaattisesti kesäajan kanssa."
                       } ,{                      
                           type: "step",
                           title: "Kesäajan määrittäminen",
       content: [ 
                "1. Valitse Ota kesäaika käyttöön.",
                "2. Määritä, koska kesäaika on voimassa paikallisella aikavyöhykkeellä.",
                "3. Napsauta Tallenna."]
}]
},
       DIGNOSTIC :{ 
               TITLE:"Diagnostiikka",
               CONTENT: [{
                           type: "paragraph",
                           content: "Reitittimessä on Ping- ja Traceroute-työkalut, joiden avulla voit vianmäärittää verkko-ongelmat."
                       } ,{                      
                           type: "title",
                            title: "Ping ja Traceroute"
                       } ,{                      
                           type: "paragraph",
                           content: "Ping-työkalu lähettää paketteja kohde-IP-osoitteeseen tai -toimialueen nimeen ja kirjaa tulokset, kuten lähetettyjen ja vastaanotettujen pakettien määrän, sekä edestakaisen ajan."
                       } ,{                      
                           type: "paragraph",
                           content: "Traceroute-työkalu lähettää paketteja kohde-IP-osoitteeseen tai -toimialueen nimeen ja näyttää hyppyjen määrän ja määränpäähän kuluneen ajan."
                       } ,{                      
                           type: "paragraph",
                           content: "Voit käyttää pingiä ja traceroutea paikallisessa laitteessa IP-osoitteella tai toimialueen nimellä, kuten tp-link.com, yahoo.com tms."
                       } ,{                      
                           type: "step",
                           title: "Diagnosointi Pingillä",
       content: [ 
                "1. Valitse Ping diagnoosityökaluksi.",
                "2. Anna kohteen IP-osoite tai toimialueen nimi.",
                "3. Avaa lisäasetusvalikko napsauttamalla nuolikuvaketta ja määritä pingien määrä ping-paketin koko. (valinnainen)",
                "4. Napsauta Käynnistä."]
} ,{                      
                           type: "step",
                           title: "Diagnosointi Pingillä",
       content: [ 
                "1. Valitse Traceroute diagnoosityökaluksi.",
                "2. Anna kohteen IP-osoite tai toimialueen nimi.",
                "3. Avaa lisäasetusvalikko napsauttamalla nuolikuvaketta ja määritä siirtymien määrä (saavutettava) Tracerouten Max TTL (Time to Live) -kenttään. Oletusarvo on 20. (valinnainen)",
                "4. Napsauta Käynnistä."]
}]
},
       PORT_MIRROR :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                            title: "Porttien peilaus"
                       } ,{                      
                           type: "paragraph",
                           content: "Portin peilaus tarkoittaa prosessia, jossa pakettien kopioita välitetään peilatulta portilta peilaavaan porttiin. Tavallisesti peilaava portti on kytketty datadiagnoosilaitteeseen, millä analysoidaan peilatut paketit verkon valvonnan ja vianmäärityksen tarkoituksissa."
                       } ,{                      
                           type: "step",
                           title: "To forward copies of packets to the designated port",
       content: [ 
                "1. Ota portin peilaus käyttöön",
                "2. Valitse haluamasi portit peilatuiksi porteiksi.",
                "3. Valitse haluamasi portti peilaavaksi porteiksi.",
                "4. Napsauta Tallenna."]
} ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Porttia ei voi asettaa peilatuksi ja peilaavaksi portiksi samanaikaisesti."
                       }]
},
       FIRMWARE :{ 
               TITLE:"Laiteohjelmiston päivitys",
               CONTENT: [{
                           type: "paragraph",
                           content: "Laiteohjelmistopäivitys päivittää reitittimen laiteohjelmiston uusilla ominaisuuksilla tai korjauksilla. Suosittelemme, että reititin päivitetään uusimpaan laiteohjelmistotiedostoon, jotta sillä olisi paras suorituskyky."
                       } ,{                      
                           type: "step",
                           title: "Seuraavan huomaaminen auttaa välttämään päivityksen epäonnistumisen:",
       content: [ 
                "Ennen päivitystä",
                "1. Varmista, että reitittimen ja tietokoneen välillä on vakaa yhteys. Laiteohjelmistoa EI suositella päivitettävän langattomasti.",
                "2. Varmista, että olet irrottanut kaikki reitittimen kytketyt USB-laitteet.",
                "3. Muista varmuuskopioida reitittimen kokoonpanotiedosto.",
                "Päivityksen aikana",
                "Pidä reititin PÄÄLLÄ, kunnes päivitys on valmis."]
}]
},
       FIRMWARE_UPGRADE_ONLINE :{ 
               TITLE:"Laiteohjelmiston päivittäminen verkossa:",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Laiteohjelmiston päivittäminen Internetin kautta Napsauta Päivitä ja vahvista pyydettäessä. Reititin lataa ja päivittää laiteohjelmiston uusimpaan versioon automaattisesti. Voit myös napsauttaa Tarkista päivitysten saatavuus tarkistaaksesi tuoreimman laiteohjelmistoversion."]
}]
},
       FIRMWARE_UPGRADE :{ 
               TITLE:"Laiteohjelmiston päivittäminen manuaalisesti:",
               CONTENT: [{
                           type: "step",
       content: [ 
                "1. Napsauta sivun alalaidasta Tuki ja lataa tuorein laiteohjelmisto tietokoneeseen. Varmista, että ladattava laiteohjelmistotiedosto vastaa sivulla ilmoitettua reitittimen laitteistoversiota.",
                "2. Napsauta Browse ja valitse ladattu laiteohjelmistotiedosto.",
                "3. Napsauta Päivitä."]
} ,{                      
                           type: "paragraph",
       content: [ 
                "Laiteohjelmistopäivitys vie muutaman minuutin. Reititin käynnistyy automaattisesti, kun laiteohjelmisto on päivitetty."]
}]
},
       BACKUP :{ 
               TITLE:"Varmuuskopiointi ja palauttaminen",
               CONTENT: [{
                           type: "paragraph",
                           content: "Varmuuskopiointi ja palautus -ominaisuudella voit varmuuskopioida reitittimen kokoonpanon palautusta varten tai palauttaa reitittimen oletusasetuksiin."
                       } ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "ÄLÄ sammuta reititintä varmuuskopioinnin tai palautuksen aikana."
                       } ,{                      
                           type: "title",
                           title: "Varmuuskopiointi",
                           content: "Suositellaan, että päivität tämän hetkisen kokoonpanon, siltä varalta että reititin on palautettava aikaisempaan tilaan."
                       } ,{                      
                           type: "step",
                           title: "Nykyisen kokoonpanon varmuuskopiointi",
       content: [ 
                "1. Napsauta Backup.",
                "2. Odota, kunnes reititin on varmuuskopioinut sen hetkisen kokoonpanon."]
}]
},
       RESTORE :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Palauta",
                           content: "Voit palauttaa reitittimen aiempaan tilaan varmuuskopiointitiedostosta."
                       } ,{                      
                           type: "step",
                           title: "Palauttaminen varmuuskopiosta",
       content: [ 
                "1. Napsauta Selaa.",
                "2. Paikanna ja valitse varmuuskopiointitiedosto.",
                "3. Napsauta Palauta."]
}]
},
       FACTORY :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Tehdasasetusten palautus",
       content: [ 
                "Reitittimen tehdasasetusten palauttaminen poistaa kaikki kokoonpanot ja asetukset ja palauttaa ne tehdasasetuksiin. Esimerkiksi kaikki langattoman verkon, lapsilukituksen ja verkon tiedot poistetaan.",
                "Sinun täytyy tehdasasetusten palauttamisen jälkeen asettaa uusi salasana, jotta voit käyttää reitittimen verkkohallintasivua."]
}]
},
       REBOOT :{ 
               TITLE:"Reboot Schedule",
               CONTENT: [{
                           type: "paragraph",
                           content: "Uudelleenkäynnistyksen aikataulu (Reboot Schedule) puhdistaa välimuistin parantaakseen reitittimen suorituskykyä. Voit käynnistää reitittimen uudelleen manuaalisesti tai asettaa sen säännöllisesti tehtäväksi."
                       } ,{                      
                           type: "step",
                           title: "Manuaalinen uudelleenkäynnistys",
       content: [ 
                "Napsauta Käynnistä uudelleen ja odota muutama minuutti, että reititin käynnistyy uudelleen."]
} ,{                      
                           type: "step",
                           title: "Ajasta uudelleenkäynnistysaika",
       content: [ 
                "1. Ota Reboot Schedule käyttöön.",
                "2. Aseta, milloin ja kuinka usein reititin käynnistetään uudelleen, määrittämällä arvot sen uudelleenkäynnistyksen ajan (Reboot Time) ja toiston (Repeat) kentille.",
                "3. Napsauta Tallenna."]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"Valvonta",
               CONTENT: [{
                           type: "paragraph",
                           content: "Hallintasivu sallii sinun hallita kirjautumissalasanaa ja yhdistettyjen asiakasjärjestelmien reitittimen käyttöoikeuksia."
                       } ,{                      
                           type: "name",
                           title: "Tilinhallinta",
                           content: "Tällä ominaisuudella voit vaihtaa salasanan.",
       children: [{                      
                           type: "step",
                           title: "Salasanan vaihtaminen",
       content: [ 
                "1. Anna vanha salasana.",
                "2. Anna uusi salasana.",
                "3. Vahvista uusi salasana.",
                "4. Napsauta Tallenna."]
}]
}]
},
       ADMIN_RECOVERY :{ 
               TITLE:"Salasanan palauttaminen",
               CONTENT: [{
                           type: "name",
                           title: "Oletussalasanan palauttaminen",
                           content: "Oletussalasanan palautus (Default Password Recovery) sallii sinun palauttaa oletussalasanan palauttamatta reititintä sen tehdasasetuksiin.",
       children: [{                      
                           type: "step",
                           title: "Salasanan vaihtaminen",
       content: [ 
                "1. Ota oletussalasanan palautusominaisuus käyttöön",
                "2. Kirjoita Keneltä-kenttään pätevä sähköpostiosoite, josta kirjautumistietojen palautuksen tarkistuskoodi lähetetään.",
                "3. Kirjoita Kenelle-kenttään pätevä sähköpostiosoite, johon tarkistuskoodi lähetetään.",
                "4. Anna lähtevän sähköpostin (Keneltä) SMTP-palvelin.",
                "5. Jos Keneltä-kentän sähköposti vaatii salausta, valitse Ota todennus käyttöön -valintaruutu ja kirjoita sen käyttäjätunnus (sähköpostiosoite) ja salasana.",
                "6. Napsauta Save (Tallenna)."]
}]
}]
},
       ADMIN_LOCAL :{ 
               TITLE:"Paikallinen hallinta",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tämä ominaisuus sallii paikallisten laitteiden käyttää ja hallita reititintä."
                       } ,{                      
                           type: "name",
                           id: "local_management_https",
                           title: "Paikallishallinta HTTPS:n kautta",
                           content: "Ota Paikallishallinta HTTPS:n kautta käyttöön, mikäli haluat käyttää reititintä sekä HTTPS- että HTTP-yhteyden kautta, tai pidä se poissa käytöstä, mikäli haluat käyttää reititintä vain HTTP-yhteyden kautta."
                       } ,{                      
                           type: "name",
                           title: "Pääsy kaikille LAN-verkkoon yhdistetyille laitteille",
                           content: "Kytke On ottaaksesi käyttöön kaikkien LAN-verkon laitteiden paikallisen hallinnan tai Off ottaaksesi käyttöön tietyn laitteen hallinnan."
                       } ,{                      
                           type: "name",
                           title: "MAC-osoite",
                           content: "Näyttää käyttörajoitteisen laitteen MAC-osoitteen."
                       } ,{                      
                           type: "name",
                           title: "Kuvaus",
                           content: "Näyttää käyttörajoitteisen laitteen kuvauksen."
                       } ,{                      
                           type: "name",
                           title: "Tila",
                           content: "Näyttää käyttörajoitteisen laitteen nykytilan (käytössä tai poissa käytöstä)."
                       } ,{                      
                           type: "name",
                           title: "Muokkaa",
                           content: "Antaa vaihtoehdot muuttaa tai poistaa kyseisen laitteen luettelosta."
                       } ,{                      
                           type: "step",
                           title: "Asiakaslaitteen lisääminen luetteloon",
       content: [ 
                "1. Napsauta Lisää.",
                "2. Napsauta Näytä olemassa olevat laitteet valitaksesi olemassa olevan laitteen tai anna laitteen MAC-osoite kyseiseen kenttään.",
                "3. Anna laitteen kuvaus.",
                "4. Valitse Ota käyttöön.",
                "5. Napsauta OK."]
} ,{                      
                           type: "step",
                           title: "Listan laitteen muokkaaminen tai poistaminen",
                           content: "Napsauta taulukossa muokkauskuvaketta tai roskakorikuvaketta muokattavan tai poistettavan laitteen kohdalla."
                       } ,{                      
                           type: "step",
                           title: "Usean laitteen poistaminen",
                           content: "Valitse kaikki poistettavat laitteet ja napsauta Poista."
                       }]
},
       ADMIN_REMOTE_WITHOUT_HTTPS :{ 
               TITLE:"Etähallinta",
               CONTENT: [{
                           type: "name",
                           title: "Etähallinta",
                           content: "Etähallintaominaisuus mahdollistaa etälaitteiden käyttäjän ja hallinnoivan reititintä.",
       children: [{                      
                           type: "step",
                           title: "Kaikkien etälaitteiden kieltäminen hallinnoimasta reititintä",
                           content: "Valitse Poista etähallinta käytöstä ja napsauta Tallenna."
                       } ,{                      
                           type: "step",
                           title: "Kaikkien etälaitteiden salliminen hallinnoida reititintä",
       content: [ 
                "1. Valitse Ota etähallinta käyttöön KAIKILLE laitteille.",
                "2. Anna verkkohallintaportti (1024-65535 tai 80), jonka kautta etälaitteet voivat käyttää reititintä.",
                "3. Napsauta Tallenna."]
} ,{                      
                           type: "step",
                           title: "Tietyn etälaitteen salliminen hallinnoida reititintä",
       content: [ 
                "1. Valitse Ota etähallinta käyttöön tietylle laitteelle.",
                "2. Anna verkkohallintaportti (1024-65535 tai 80), jonka kautta etälaite voi käyttää reititintä.",
                "3. Anna reititintä hallinnoivan etälaitteen etähallinnan IP-osoite.",
                "4. Napsauta Tallenna."]
}]
}]
},
       ADMIN_REMOTE :{ 
               TITLE:"Etähallinta",
               CONTENT: [{
                           type: "paragraph",
                           content: "Etähallintaominaisuudella voit käyttää ja määrittää reititintä etäyhteydellä Internetin kautta."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step_title",
                           content: "Etähallinnan käyttöönotto"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step1",
                           content: "1. Rastita laatikko ottaaksesi etähallintaominaisuuden käyttöön."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step2",
                           content: "2. Säilytä HTTPS-portti ja HTTP-portti oletusasetuksissa."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step3",
                           content: "3. Valitse mikä etälaite saa käyttää reititintä etänä:",
       children: [{                      
                           type: "name",
                           title: "Kaikki laitteet",
                           content: "Kaikki etälaitteet saavat käyttää reititintä."
                       } ,{                      
                           type: "name",
                           title: "Määritetty laite",
                           content: "Syötä reititintä käyttävän etälaitteen IP-osoite."
                       }]
} ,{                      
                           type: "paragraph",
                           id: "admin_remote_step4",
                           content: "4. Napsauta Tallenna."
                       } ,{                      
                           type: "paragraph",
                           content: "Voit hallita nyt reititintä etänä Hallinnan verkko-osoitteen alla näkyvässä osoitteessa."
                       } ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Jos saat varoituksen, kun otat etäyhteyden yllä olevaan osoitteeseen, jatka painamalla Trust (luota tai vastaava vaihtoehto)."
                       }]
},
       LED_CONTROL_SETTINGS :{ 
               TITLE:"Merkkivalo",
               CONTENT: [{
                           type: "paragraph",
                           content: "Kun yötila on käytössä, merkkivalot sammuvat tietyksi ajaksi joka päivä vaikuttamatta reitittimen suorituskykyyn."
                       } ,{                      
                           type: "step",
                           title: "Yötilan käyttöönotto",
       content: [ 
                "1. Valitse Ota yötila käyttöön.",
                "2. Määritä, koska merkkivalot ovat sammuksissa.",
                "3. Napsauta Tallenna."]
}]
},
       SYSTEM_LOG :{ 
               TITLE:"Järjestelmäloki",
               CONTENT: [{
                           type: "paragraph",
                           content: "Järjestelmäloki näyttää reitittimen viimeisimmät toiminnot. Taulukko sisältää järjestelmälokien tyypit, tasot ja sisällön, jotka voidaan suodattaa katsottavaksi. Voit myös tallentaa järjestelmälokit paikalliselle tietokoneelle tai lähettää ne sähköpostiin."
                       } ,{                      
                           type: "step",
                           title: "Järjestelmälokien tallentaminen paikalliselle tietokoneelle",
       content: [ 
                "1. Valitse tyyppi ja minimitaso suodattaaksesi haluamasi järjestelmälokit. Tasoluettelolla on aleneva järjestys, eli alin taso mainitaan viimeksi.",
                "2. Napsauta Tallenna loki tallentaaksesi järjestelmälokitiedoston paikalliselle tietokoneelle."]
} ,{                      
                           type: "step",
                           title: "Järjestelmälokien saaminen sähköpostitse",
       content: [ 
                "1. Valitse tyyppi ja taso suodattaaksesi haluamasi järjestelmälokit. Tasoluettelolla on aleneva järjestys, eli alin taso mainitaan viimeksi.",
                "2. Napsauta Sähköpostiasetukset.",
                "3. Kirjoita Lähtevä osoite -kenttään lähtevälle sähköpostille käytettävä voimassa oleva sähköpostiosoite.",
                "4. Kirjoita To (Vastaanottajan osoite) -kenttään saapuvalle sähköpostille käytettävä voimassa oleva sähköpostiosoite.",
                "5. Anna lähtevän sähköpostin (From) SMTP-palvelimen osoite.",
                "Huomaa: Jos lähtevä sähköposti vaatii todennusta, valitse Enable Authentication (Ota todennus käyttöön) -valintaruutu ja kirjoita sen käyttäjätunnus (sähköpostiosoite) ja salasana.",
                "6. Jos haluat saada järjestelmälokeja sähköpostitse säännöllisesti, valitse Ota automaattinen lähetys käyttöön-valintaruutu ja määritä aika (24 tunnin muodossa) tai aikaväli.",
                "Jos haluat saada uusimman järjestelmälokit heti, napsauta Lähetä loki heti.",
                "7. Napsauta Tallenna."]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"Liikenteenvalvonta",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää laitteen kaistanleveyden käytön viimeisen 10 minuutin ajalta tai kaikkien laitteiden kaistanleveyden käytön viimeisen 10 minuutin/24 tunnin/7 päivän ajalta."
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"Liikennevalvontaluettelo",
               CONTENT: [{
                           type: "paragraph",
                           content: "Luettelo on ryhmitetty laitteiden yhteystyypin mukaan: langallinen tai langaton."
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"Järjestelmäparametri",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wifi_title",
                           title: "Langaton 2,4 GHz/5 GHz",
                           content: "Tässä osiossa voit määrittää dataliikenteen lähetyssääntöjen parametrit langattomissa verkoissa. Nämä suositellaan jätettäväksi oletusasetuksiin, jos et ole varma oikeista asetuksista."
                       } ,{                      
                           type: "name",
                           title: "Jäljitysväli",
                           content: "Anna arvo välillä 40-1000 millisekuntia määrittääksesi jäljitepakettien lähetysvälin, jotka reititin lähettää synkronoidakseen langattoman verkon. Oletusarvo on 100 millisekuntia."
                       } ,{                      
                           type: "name",
                           title: "RTS-kynnys",
                           content: "Anna arvo välillä 1-2346 määrittääksesi reitittimen läpi kulkevan tiedon pakettikoon. Oletuksena RTS:n (Request to Send) kynnyskoko on 2346. Jos pakettikoko on suurempi kuin ennalta määritetty kynnys, reititin lähettää lähetyspyyntökehyksiä tiettyyn vastaanottoasemaan ja neuvottelee datakehyksen lähettämisestä; muussa tapauksessa paketti lähetetään välittömästi."
                       } ,{                      
                           type: "name",
                           title: "DTIM-aikaväli",
                           content: "Tämä arvo määrittää DTIM:n (Delivery Traffic Indication Message) aikavälin. Anna arvo 1-15. Oletusväli on 1, jolloin DTIM-väli on sama kuin jäljiteaikaväli."
                       } ,{                      
                           type: "name",
                           title: "Ryhmäavaimen päivitysika",
                           content: "Anna sekuntimäärä (vähintään 30) salausavaimen automaattisen uusimisen aikaväliksi. Oletus on 0, mikä merkitsee että avainta ei uusita."
                       } ,{                      
                           type: "name",
                           title: "WMM-ominaisuus",
                           content: "WMM-toiminto takaa, ettäkorkean prioriteetin viestien paketit lähetetään ensisijaisina. Se on oletuksena käytössä, ja sitä suositellaan."
                       } ,{                      
                           type: "name",
                           title: "Lyhyt GI -ominaisuus",
                           content: "Tämä toiminto on oletuksena käytössä, ja sitä suositellaan tarkoituksella kasvattaa pakettikapasiteettia pienentämällä GI (Guard Interval) -aikaa."
                       } ,{                      
                           type: "name",
                           title: "AP-eristysominaisuus",
                           content: "Jos haluat eristää kaikki verkkoon kytketyt langattomat laitteet ja estää niitä kommunikoimasta toistensa kanssa mutta haluat yhä Internet-yhteyden, valitse Ota AP-eristys käyttöön -valintaruutu."
                       }]
},
       SYSTEM_PARA_WDS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wds_title",
                            title: "2,4 GHz/5 GHz WDS"
                       } ,{                      
                           type: "step",
                           title: "WDS:n käyttöönotto",
                           content: "WDS:n (Wireless Distribution System) siltausominaisuudella voit laajentaa langattoman verkon katetta siltaamalla tukiaseman kanssa langattomassa WLAN-verkossa (paikallisverkossa)."
                       } ,{                      
                           type: "step",
       content: [ 
                "1. Valitse tämä ottaaksesi WDS-siltausominaisuuden käyttöön.",
                "2. Verkon siltaus skannausominaisuudella: napsauta Skannaa etsiäksesi ja näyttääksesi kaikki käytettävissä olevat verkot ja valitse verkko, jonka kanssa haluat muodostaa sillan. SSID (verkon nimi), MAC-osoite ja suojaus valitaan automaattisesti.",
                "Verkon siltaus manuaalisesti: anna sillattavan verkon SSID (verkon nimi), MAC-osoite ja WDS-tila. Valitse suojaustyyppi ja anna sen parametrit; niiden tulee olla samat kuin sillattavan verkon.",
                "3. Napsauta Tallenna."]
} ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Jos et ole varma WDS-tilasta, pidä oletusasetus Auto."
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "WPS",
                           content: "WPS (Wi-Fi Protected Setup) mahdollistaa WPS-laitteiden helpon yhdistämisen reitittimeen painamalla WPS-painiketta. Napsauta tätä ottaaksesi WPS-ominaisuuden käyttöön ja napsauta Tallenna."
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "NAT",
                           content: "Mediakirjasto on oletuksena käytössä. Suositellaan, että oletusasetus säilytetään. Jos se poistetaan käytöstä, Internet-yhteys ei välttämättä toimi."
                       } ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Kun NAT on poissa käytöstä, NAT-välityksen määritykset eivät ole voimassa."
                       } ,{                      
                           type: "name",
                           id: "sys_para_nat_boost",
                           title: "NAT Boost",
                           content: "Valitse Ota NAT Boost käyttöön -valintaruutu ja napsauta Tallenna varmistaaksesi, että reitittimen läpivienti on paras siirtomäärä."
                       } ,{                      
                           type: "note",
                           id: "sys_para_nat_boost_note",
                           title: "Huomautus",
                           content: "Kun NAT Boost on käytössä, QoS ja Liikennetilastot poistetaan käytöstä automaattisesti."
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "DOS-suojausasetukset",
                           content: "DOS-suojaus suojaa reitittimen ICMP-FLOOD-, UDP-FLOOD- ja TCP-FLOOD-hyökkäyksiltä."
                       } ,{                      
                           type: "name",
                           title: "ICMP-FLOOD-pakettitaso",
                           content: "Anna arvo välillä 5-7200 ICMP-pakettia käynnistämään ICMP-FLOOD-suojaus heti, kun pakettien määrä ylittää esivalitun kynnysarvon."
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD-pakettitaso",
                           content: "Anna arvo välillä 5-7200 UDP-pakettia käynnistämään UDP-FLOOD-suojaus heti, kun UDP-pakettien määrä ylittää nykyisen kynnysarvon."
                       } ,{                      
                           type: "name",
                           title: "TCP-FLOOD-pakettitaso",
                           content: "Anna arvo välillä 5-7200 TCP-SYN-pakettia käynnistämään TCP-SYN-FLOOD-suojaus heti, kun pakettien määrä ylittää nykyisen kynnysarvon."
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Kaksipuolinen",
                           content: "Valitse kaksisuuntaisuustyyppi alasvetovalikosta ja napsauta Tallenna."
                       }]
},
       SYSTEM_PARA_LED :{ 
               TITLE:"Merkkivalo",
               CONTENT: [{
                           type: "name",
                           title: "Ota yötila käyttöön",
                           content: "Valitse tämä valintaruutu sammuttaaksesi merkkivalot yötila-aikaan vaikuttamatta reitittimen suorituskykyyn."
                       } ,{                      
                           type: "name",
                           title: "Yötila-aika",
                           content: "Määritä yötilan käyttöaika."
                       } ,{                      
                           type: "paragraph",
                           content: "Tallenna kaikki asetukset napsauttamalla Save (Tallenna)."
                       }]
},
       OPEN_VPN :{ 
               TITLE:"OpenVPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "OpenVPN:n avulla voit käyttää verkkoasi suojatusti Internetin kautta, kun et ole kotona. Jotta voit käyttää VPN-palvelua, sinun on määritettävä Dynaaminen DNS-palvelu (suositellaan) tai määrättävä reitittimen WAN-portille staattinen IP-osoite. Lisäksi järjestelmäaika on synkronoitava Internetin kanssa."
                       } ,{                      
                           type: "name",
                           title: "Palvelun tyyppi",
                           content: "Valitse OpenVPN-palvelimen tiedonsiirtoprotokolla: UDP tai TCP."
                       } ,{                      
                           type: "name",
                           title: "Palveluportti",
                           content: "Anna tiedonsiirtoportin numero välillä 1024-65535. Oletus- ja yleinen palveluportti on 1194."
                       } ,{                      
                           type: "name",
                           title: "VPN:n aliverkon/verkon peite",
                           content: "Anna asiakkaille OpenVPN-palvelimelta vuokrattavien IP-osoitteiden alue."
                       } ,{                      
                           type: "name",
                           title: "Asiakaspääsy",
                           content: "Valitse OpenVPN-asiakkaan käyttötyyppi.",
       children: [{                      
                           type: "name",
                           title: "Vain kotiverkko",
                           content: "Asiakkaat voivat käyttää vain kotiverkkoa. Asiakkaan oletusreitti ei muutu."
                       } ,{                      
                           type: "name",
                           title: "Internet ja kotiverkko",
                           content: "Asiakkaat voivat käyttää kotiverkkoa ja Internet-sivustoja tai -palveluita maantieteellisin rajoituksin ollessasi poissa maasta. Asiakkaan oletusreitti muuttuu."
                       }]
}]
},
       OPEN_VPN_CERTIFICATE :{ 
               TITLE:"Sertifikaatti",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Käytä etätietokoneen VPN-yhteyden tiedoille ja identiteetille sertifikaattia.",
                "Napsauta luodaksesi uusi sertifikaatti."]
}]
},
       OPEN_VPN_CONF :{ 
               TITLE:"Määritystiedosto",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Etäasiakkaat käyttävät konfigurointitiedostoa reitittimen käytössä.",
                "Napsauta tätä painiketta tallentaaksesi OpenVPN-kokoonpanotiedosto, jolla lisätään uusi VPN-yhteys."]
}]
},
       OPEN_VPN_GUIDE :{ 
               TITLE:"VPN-asiakkaan asennusopas",
               CONTENT: [{
                           type: "step",
                           title: "Asiakaslaitteiden yhdistäminen OpenVPN-palvelimeen:",
       content: [{                      
                           type: "paragraph",
                           content: "Ennen kuin määrität OpenVPN-palvelimen, määrtä dynaaminen DNS-palvelin (suositellaan) tai määrää WAN-portille staattinen IP-osoite. Varmista lisäksi, että NAT-asetusten ulkoinen portti ei ole palveluportti ja että järjestelmän aika on synkronoitu Internetin kanssa."
                       },
                "1. Valitse Ota VPN-palvelin käyttöön.",
                "2. Määritä OpenVPN-palvelimen parametrit (Palvelutyyppi, Palveluportti, Asiakaspääsy ja VPN aliverkko/peite) ja napsauta Tallenna.",
                "3. Tallenna kokoonpanotiedosto napsauttamalla Vie.",
                "4. Lataa ja asenna asiakaslaitteisiin OpenVPN-asiakasohjelma osoitteesta <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a>",
                "Virallisesti tuetut ympäristöt ovat Windows, Mac OSX ja Linux.",
                "5. Käynnistä OpenVPN-asiakasohjelma ja lisää uusi VPN-yhteys käyttäen tallennettua kokoonpanotiedostoa yhdistääksesi asiakaslaitteen VPN-palvelimeen."]
} ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Lisätietoja OpenVPN-asiakkaista on osoitteessa <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
                       }]
},
       PPTP_VPN :{ 
               TITLE:"PPTP VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "PPTP VPN:n avulla voit käyttää verkkoasi helposti ja nopeasti Internetin kautta, kun et ole kotona. Jotkut ISP:t saattavat estää tämän. Jotta voit käyttää VPN-palvelua, sinun on määritettävä Dynaaminen DNS-palvelu (suositellaan) tai määrättävä reitittimen WAN-portille staattinen IP-osoite. Lisäksi järjestelmäaika on synkronoitava Internetin kanssa."
                       } ,{                      
                           type: "name",
                           title: "Asiakkaan IP-osoite",
                           content: "Anna IP-osoitealue (enintään 10 asiakasta), jotka PPTP VPN -palvelin voi vuokrata asiakkaille."
                       } ,{                      
                           type: "name",
                           title: "Käyttäjätunnus ja salasana",
                           content: "Anna käyttäjätunnus ja salasana, jolla PPTP VPN -palvelimen asiakkaat todennetaan."
                       }]
},
       PPTP_VPN_GUIDE :{ 
               TITLE:"VPN-asiakkaan asennusopas",
               CONTENT: [{
                           type: "step",
                           title: "Asiakaslaitteiden yhdistäminen PPTP VPN -palvelimeen:",
       content: [{                      
                           type: "paragraph",
                           content: "Ennen kuin määrität PPTP VPN -palvelimen, määrtä dynaaminen DNS-palvelin (suositellaan) tai määrää WAN-portille staattinen IP-osoite. Varmista, että NAT-asetusten ulkoinen portti ei ole 1723 ja että järjestelmän aika on synkronoitu Internetin kanssa."
                       },
                "1. Valitse Ota VPN-palvelin käyttöön.",
                "2. Määritä PPTP VPN -palvelimen parametrit ja napsauta Tallenna.",
                "3. Luo asiakaslaitteissa PPTP VPN -yhteys. Tuetut ympäristöt ovat Windows, Mac OSX, Linux, iOS ja Android.",
                "4. Käynnistä PPTP VPN -ohjelma, lisää uusi yhteys ja anna rekisteröidyn DDNS-palvelun WAN-portin toimialueen nimi tai staattinen IP-osoite yhdistääksesi asiakaslaitteen PPTP VPN -palvelimeen."]
}]
},
       VPN_CONNNECTION :{ 
               TITLE:"VPN-yhteydet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tällä sivulla näytetään asiakkaat, jotka on tällä hetkellä kytketty reitittimen OpenVPN- tai PPTP VPN -palvelimeen."
                       }]
},
       BASIC_NETWORK :{ 
               TITLE:"Verkkokartta",
               CONTENT: [{
                           type: "paragraph",
                           content: "Verkkokartassa näet verkkoyhteyden sen hetkisen tilan ja reitittimen langattoman yhteyden tiedot sekä yhdistettyjen laitteiden tiedot."
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää Internet-tiedot."
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"Reititin",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää langattomien verkkojen ja LAN-porttien sen hetkiset verkkotiedot."
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"Langalliset/langattomat asiakaslaitteet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää reitittimeen yhdistettyjen asiakaslaitteiden verkon nimen (muokattavissa) ja määrätyt IP- ja MAC-osoitteet."
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"Tulostin",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää reitittimeen USB-portin kautta kytketyn tulostimen nimen."
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"USB-levy",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää reitittimeen USB-porttiin kytketyn USB-muistin tiedot."
                       }]
},
       BASIC_SPEED_TEST :{ 
               TITLE:"Nopeustesti",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tämä toiminto testaa tämänhetkisen palveluntarjoajalta saamasi lähetys- ja latausnopeuden ja tarjoaa hyviä neuvoja Internetisi suorituskyvystä."
                       } ,{                      
                           type: "paragraph",
                           content: "Vinkki: Sulje muut sovellukset ja ohjelmat saadaksesi tarkemmat tulokset."
                       } ,{                      
                           type: "paragraph",
                           content: "Historia – tallenne edellisistä nopeusteisteistä."
                       } ,{                      
                           type: "paragraph",
                           content: "Testaa uudelleen – suorita nopeustesti napsauttamalla."
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Napsauta Tunnista automaattisesti tai valitse Internet-yhteystyyppi manuaalisesti. Anna sitten ISP:n antamat parametrit."
                       }]
},
       BASIC_WIRELESS_SMART_CONNECT :{ 
               TITLE:"Smart Connect",
               CONTENT: [{
                           type: "paragraph",
                           content: "Valitse tämä valintaruutu ottaaksesi äly-yhteyden käyttöön. Tämä toiminto auttaa laitteita toimimaan nopeammin määräämällä ne parhaaseen langattomaan verkkoon todellisten olosuhteiden perusteella verkkotarpeiden tasapainottamiseksi."
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"Langattoman verkon asetukset",
               CONTENT: [{
                           type: "paragraph",
                           content: "Voit määrittää langattoman yhteyden asetukset (SSID, salasana jne.)"
                       } ,{                      
                           type: "name",
                           title: "Verkon nimi (SSID)",
                           content: "Suositellaan, että vaihdat verkon nimen (SSID). Tämä kenttä erottelee kirjainkoon."
                       } ,{                      
                           type: "name",
                           title: "Piilota SSID",
                           content: "Valitse tämä valintaruutu, jos haluat piilottaa 2,4/5 GHz:n verkon nimen (SSID) langattomien verkkojen luettelosta. Kun tämä on valittu, SSID:iä ei lähetetä, ja verkkoon on liityttävä manuaalisesti."
                       } ,{                      
                           type: "name",
                           title: "Salasana",
                           content: "Anna langattoman verkon salasana pituudeltaan 8-63 ASCII-merkkiä tai 8-64 heksadesimaalista merkkiä. Tämä kenttä erottelee kirjainkoon."
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
               TITLE:"USB-muistilaite",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tällä ominaisuudella voit jakaa USB-muistilaitteen eri asiakaslaitteiden kanssa paikallisverkossa tai Internetin kautta."
                       } ,{                      
                           type: "title",
                           title: "Laitteen asetukset",
                           content: "Laiteasetukset -osiossa näytetään perustiedot USB-porttiin kytketystä USB-muistilaitteesta. USB-muistitikussa on tavallisesti vain yksi osio."
                       } ,{                      
                           type: "name",
                           title: "Skannaa",
                           content: "Tavallisesti reititin tunnistaa automaattisesti kaikki juuri liitetyt laitteet. Jos näin ei käy, napsauta tätä painiketta suorittaaksesi haun ja päivittääksesi näytön uusin tiedoin.",
       children: [{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Harmaa alue tarkoittaa asemaa, joka ei ole käytössä. Voit jakaa tietyn aseman napsauttamalla tätä aluetta."
                       }]
} ,{                      
                           type: "name",
                           title: "Poista",
                           content: "Napsauta tätä USB-laitetta poistaaksesi USB-laitteen ennen kuin irrotat sen fyysisesti USB-portista.",
       children: [{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Poistopainike on näkyvissä vain, kun reitittimeen on kytketty USB-tallennusväline. Kun asema on käytössä, sitä ei voi poistaa."
                       }]
} ,{                      
                           type: "step",
                           title: "Tiedostopalvelimen määrittäminen",
       content: [ 
                "1. Kytke USB-muistilaite USB-porttiin suoraan tai USB-kaapelilla. Jos laite vaatii ulkopuolista virtaa, varmista että se on kytketty.",
                "2. Reitittimen tulisi tunnistaa juuri kytketty USB-laite automaattisesti ja näyttää sen tiedot Laiteasetukset -osassa. Jos ei, napsauta Skannaa.",
                "Huomautus: Jakokuvake on näkyvissä, kun reitittimeen on yhdistetty useampi kuin 5 asemaa. Napsauttamalla kuvaketta voit poistaa käytöstä ne asemat, joita ei tarvitse jakaa."]
}]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"Käyttöosoite",
               CONTENT: [{
                           type: "name",
                           title: "Verkon/mediapalvelimen nimi",
                           content: "Näyttää nimen, jolla yhdistettyä USB-muistilaitetta käytetään verkkoympäristömenetelmällä tai medianjako-ominaisuudella. Sen oletusarvo on TP-Share."
                       } ,{                      
                           type: "name",
                           title: "Käyttömenetelmä",
                           content: "Käytettävissä on neljä eri tapaa käyttää jaettua USB-tallennuslaitetta.",
       children: [{                      
                           type: "name",
                           title: "Verkkoympäristö",
                           content: "Valitse tämä asetus salliaksesi verkon käyttäjien käyttää jaettua sisältöä osoitesarakkeen osoitteella."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "Valitse tämä asetus ottaaksesi käyttöön FTP-ominaisuuden, jolloin FTP-asiakaslaitteet ja verkon käyttäjät voivat käyttää USB-muistilaitetta osoitesarakkeen FTP-osoitteella."
                       } ,{                      
                           type: "name",
                           title: "FTP (Internetin kautta)",
                           content: "Valitse tämä asetus salliaksesi FTP-asiakaslaitteiden ja käyttäjien etäkäyttää, ladata ja lähettää tiedostoja jaetulle USB-muistilaitteelle FTP:llä Internetin kautta. Voit mukauttaa käyttöosoitteen napsauttamalla Muokkaa ja määrittämällä reitittimen dynaamisen DNS:n. Voit vaihtaa FTP-palvelimen portin numeron antamalla portin uuden numeron ja napsauttamalla Tallenna ottaaksesi muutokset käyttöön."
                       } ,{                      
                           type: "name",
                           title: "SFTP",
                           content: "Valitse tämä asetus käyttääksesi SFTP-palvelintoimintoa, joka sallii SFTP-asiakasohjelmien ja verkon käyttäjien pääsyn USB-tallennuslaitteelle osoitesarakkeen (Address) alla näkyvän SFTP-osoitteen kautta."
                       }]
} ,{                      
                           type: "name",
                           title: "Osoite",
                           content: "Näyttää osoitteen, jolla jaettua USB-tallennuslaitetta käytetään."
                       } ,{                      
                           type: "name",
                           title: "Portti",
                           content: "Syötä FTP-palvelimen käytön porttinumero."
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"Sisällön jakaminen",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää jaettavat kansiot. Kaikki kansiot ovat oletuksena jaettuja. Voit mukauttaa jaettuja kansioita napsauttamalla muokkauskuvaketta."
                       } ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Jakokuvake on näkyvissä laiteasetuksissa, kun reitittimeen on yhdistetty useampi kuin 5 asemaa. Napsauttamalla jakokuvaketta voit poistaa käytöstä ne asemat, joita ei tarvitse jakaa."
                       }]
},
       FOLDER_SHARING :{ 
               TITLE:"Sisällön jakaminen ja suojaus",
               CONTENT: [{
                           type: "name",
                           title: "Sisällön jakaminen",
                           content: "Näyttää jaettavat kansiot. Kaikki kansiot ovat oletuksena jaettuja. Voit mukauttaa jaettuja kansioita napsauttamalla muokkauskuvaketta.",
       children: [{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Jakokuvake on näkyvissä laiteasetuksissa, kun reitittimeen on yhdistetty useampi kuin 5 asemaa. Napsauttamalla jakokuvaketta voit poistaa käytöstä ne asemat, joita ei tarvitse jakaa."
                       }]
} ,{                      
                           type: "name",
                           title: "Pääsyn todennus",
       content: [ 
                "Valitse Päällä ottaaksesi todennuksen otetaan käyttöön, jotta käyttäjien on annettava voimassa oleva käyttäjätunnus ja salasana voidakseen käyttää kaikkia jaettuja kansioita. Valvoja voi lukea ja muuttaa tiedostoja, kun taas käyttäjä voi ainoastaan lukea tiedostoja.",
                "Käyttäjätunnuksen tulee alkaa kirjaimella tai alaviivalla ja sisältää 1-15 merkkiä (kirjaimia, numeroita ja alaviivoja).",
                "Salasanan tulee sisältää 1-15 merkkiä (kirjaimia, numeroita ja alaviivoja)."]
} ,{                      
                           type: "name",
                           title: "Salli vierasverkkokäyttö",
                           content: "Kytke päälle salliaksesi vierasverkon käyttäjien käyttää kaikkia jaettuja kansiota."
                       } ,{                      
                           type: "name",
                           title: "Ota median jakaminen käyttöön",
                           content: "Kun tämä ominaisuus on käytössä, kaikki paikallisverkon DLNA-laitteet voivat käyttää kaikkien jaettujen kansioiden mediatiedostoja. Käyttäjien ei tarvitse antaa käyttäjätunnusta tai salasanaa, vaikka pääsyn todennus olisi käytössä."
                       }]
},
       BASIC_PRINT_SERVER :{ 
               TITLE:"Tulostinpalvelin",
               CONTENT: [{
                           type: "name",
                           title: "Tulostinpalvelin",
                           content: "Valitse On ottaaksesi tulostuspalvelintoiminnon käyttöön."
                       } ,{                      
                           type: "name",
                           title: "Tulostimen nimi",
                           content: "Näyttää reitittimeen kytketyn tulostimen nimen."
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"Lapsilukko",
               CONTENT: [{
                           type: "paragraph",
                           content: "Lapsilukituksen perusasetuksilla voit rajoittaa käytön tiettyihin aikoihin (esim. ei Internet-yhteyttä lapsen PC:lle läksyjentekoaikaan)."
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"Lapsilukituksen alaiset laitteet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tässä taulukossa näytetään tällä hetkellä lapsilukituksella rajoitettujen laitteiden tiedot ja asetukset."
                       } ,{                      
                           type: "step",
                           title: "Uuden asiakaslaitteen rajoittaminen",
       content: [ 
                "1. Kytke lapsilukitus päälle.",
                "2. Napsauta Lisää.",
                "3. Napsauta Skannaa ja valitse yhdistetty laite Käytä laiteluetteloa; voit myös antaa laitenimen ja MAC-osoitteen manuaalisesti lisätäksesi laitteen, jota ei ole yhdistetty.",
                "4. Napsauta voimassaoloaikakuvaketta määrittääksesi, milloin rajoitus on voimassa.",
                "5. Anna Kuvaus -kenttään lyhyt kuvaus. Tämä kenttä on valinnainen.",
                "6. Valitse Ota tämä syöte käyttöön.",
                "7. Napsauta Tallenna."]
} ,{                      
                           type: "note",
                           title: "Huomautus",
                           content: "Jos haluat poistaa tämän kohdan käytöstä, napsauta lamppukuvaketta."
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"Vierasverkko",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tällä toiminnolla voit tarjota Wi-Fi-yhteyden vieraille paljastamatta pääverkkoa."
                       } ,{                      
                           type: "name",
                           title: "Anna vieraiden nähdä toisensa",
                           content: "Valitse tämä valintaruutu salliaksesi vierasverkon langattomien laitteiden kommunikoida toistensa kanssa sellaisilla menetelmillä kuin verkkonaapurit, Samba, Ping ja FTP."
                       } ,{                      
                           type: "name",
                           title: "Anna vieraiden käyttää paikallisverkkoa",
                           content: "Valitse tämä valintaruutu salliaksesi vierasverkon langattomien laitteiden kommunikoida reitittimen LAN-portteihin tai pääverkkoon yhdistettyjen laitteiden kanssa sellaisilla menetelmillä kuin verkkonaapurit, Samba, Ping ja FTP."
                       } ,{                      
                           type: "name",
                           title: "Ota vierasverkko käyttöön",
                           content: "Valitse tämä valintaruutu ottaaksesi vierasverkko-ominaisuuden käyttöön."
                       } ,{                      
                           type: "name",
                           title: "Verkon nimi (SSID)",
                           content: "Käytä joko vierasverkon oletus-SSID:iä tai anna uusi nimi (enintään 32 merkkiä)."
                       } ,{                      
                           type: "name",
                           title: "Piilota SSID",
                           content: "Valitse tämä valintaruutu, jos haluat piilottaa vierasverkon SSID:n Wi-Fi-verkkojen luettelosta."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Salasanan päivitysväli",
                           content: "Valitse vierasverkon salasanan päivitysväli."
                       } ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Salasana",
                           content: "Luo salasana, jossa on 8-63 ASCII-merkkiä tai 8-64 heksadesimaalimerkkiä (0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Salasana",
                           content: "Käytä joko satunnaisesti luotua salasanaa tai luo salasana pituudeltaan 8-63 ASCII-merkkiä tai 8-64 heksadesimaalista merkkiä (0-9, a-f, A-F)."
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"TP-Link Cloud",
               CONTENT: [{
                           type: "paragraph",
                           content: "TP-Link Cloud -palvelulla voit etävalvoa verkkoa tosiajassa ja käyttää ja hallinnoida TP-Link-laitteitasi Internetistä milloin vain ja missä vain."
                       }]
},
       ACCOUNT_INFO :{ 
               TITLE:"Tilin tiedot",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää TP-Link-tunnuksesi tiedot. Voit muokata tilin tietoja napsauttamalla Edit-kuvaketta."
                       }]
},
       DEVICE_INFO :{ 
               TITLE:"Laitetiedot",
               CONTENT: [{
                           type: "paragraph",
                           content: "Näyttää laitteen tiedot, mukaan lukien laitetta hallinnoivan pilvitilin."
                       }]
},
       BOUND_ACCOUNT :{ 
               TITLE:"Sidotut tilit",
               CONTENT: [{
                           type: "paragraph",
                           content: "Tässä taulukossa näytetään kaikki pilvitilit, jotka on tällä hetkellä sidottu laitteeseen."
                       } ,{                      
                           type: "step",
                           title: "Käyttäjätilin sidonta",
       content: [ 
                "1. Napsauta Bind.",
                "2. Anna rekisteröity sähköposti, jonka haluat sitoa.",
                "3. Napsauta Tallenna."]
}]
},
       NEW_PARENTAL_CONTROL :{ 
               TITLE:"Lapsilukko",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ikärajasuodatuksen, käyttörajoitusten ja käyttäjäprofiilien ansiosta lapsilukitus tarjoaa perheellesi personalisoidun ja sopivan Internet-yhteyden."
                       } ,{                      
                           type: "step",
                           title: "Lapsilukituksen käyttö uudessa laitteessa",
       content: [ 
                "1. Napsauta Lisää.",
                "2. Anna tälle profiilille nimi ja lisää tämän profiilin laitteet napsauttamalla \"+\".",
                "3. Valitse suodatustaso ja mukauta suodatin tarpeittesi mukaan. Voit hakea suodattavia sivustoja tietokannastamme hakusanoilla. Muut sivustot (URL:t) voidaan syöttää manuaalisesti.<br/>Viittaa seuraaviin suodatuskategorioiden selityksiin:<p>Aikuissisältö - sivustot, jotka sisältävät seksuaalista, haitallista tai laitonta sisältöä, mukaan lukien pornografiaa, huumeiden käyttöä, väkivaltaa ja syrjintää</p><p>Uhkapelit - sivustot, jotka mainostavat uhkapelejä tai tarjoavat niistä tietoja, mukaan lukien uhkapelisivustot</p><p>Sukupuolikoulutus - sivustot, joilla keskustellaan sukupuolisuudesta informatiivisesti, mukaan lukien lisääntyminen, sukupuolisuus, turvallinen seksi ja ehkäisy, sukupuolitaudit ja seksuaalisen trauman hoito</p><p>Online-viestintä - sivustot, jotka isännöivät viestintää muiden kanssa kirjoittamalla, puheella tai videoilla, mukaan lukien sähköposti, blogit, verkkofoorumit, VoIP- ja videokeskustelupalvelut</p><p>Sosiaaliset verkostot - sivustot, joilla jaellaan mielipiteen ilmaisuja ja henkilökohtaisia kommunikaatioita, yhdistetään ihmisiä ja heidän toimintojaan mielenkiinnon kohteiden, ammatin, taustan tai toistensa tuntemisen perusteella</p><p>Ansiosivustot - sivustot, joilla käyttäjät saavat maksun tiettyjen sivustojen, sähköpostiviestien tai mainosten katsomisesta, linkkien napsauttamisesta tai kyselyihin vastaamisesta</p><p>Media - sivustot, joilla tarjotaan ilmaista, maksullista tai tilauspohjaista audio- ja/tai videosisältöä, mukaan lukien suoratoistopalvelut, TV-ohjelmat ja musiikin lataaminen</p><p>Lataukset - sivustot, jotka tarjoavat tiedostonjako- ja -levityspalveluita, mukaan lukien vertaisjakaminen, tiedostojen ja mobiililaitteiden sisällön (esim. musiikin ja sovellusten) tallennus verkossa</p><p>Pelit - sivustot, jotka tarjoavat pääsyn verkkopeleihin tai ladattaviin peleihin, mukaan lukien verkkopelaaminen, pelikonsoliverkostot ja selainpelit</p>",
                "4. Jos haluat rajoittaa kokonaisaikaa, jonka tämä profiili voi viettää verkossa, ota aikarajoitukset käyttöön ja määritä ne. Voit myös määrittää nukkuma-ajalla päivittäisen aikajakson, jonka aikana tämän profiilin laitteilla ei pääse Internetiin.",
                "5. Napsauta Tallenna."]
} ,{                      
                           type: "step",
                           title: "Profiilin yksityiskohtaisen Internet-historian esittäminen",
       content: [ 
                "1. Napsauta Tiedot-sarakkeessa vastaavaa Tiedot-painiketta.",
                "2. Jos haluat nähdä lisää tietueita, napsauta Historia-painiketta <span class=\"ptl-ctr-help-icon history\"></span>.",
                "3. Voit estää ja sallia sivustoja napsauttamalla <span class=\"ptl-ctr-help-icon block\"></span>- tai <span class=\"ptl-ctr-help-icon unblock\"></span>-painiketta."]
} ,{                      
                           type: "step",
                           title: "Internet-yhteyden välitön esto ja salliminen",
       content: [ 
                "Napsauta Internet-yhteyssarakkeessa <span class=\"ptl-ctr-help-icon stop\"></span> estääksesi kyseisen profiilin laitteiden pääsyn Internetiin ja napsauta <span class=\"ptl-ctr-help-icon enable\"></span> salliaksesi taas yhteyden."]
}]
},
       BASIC_QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (Quality of Service) -ominaisuus priorisoi online-toiminnot ja laitteet taatakseen nopeamman verkkoyhteyden, kun tarvitset sitä eniten."
                       } ,{                      
                           type: "paragraph",
                           content: "Valitse Sovellusprioriteetti priorisoidaksesi verkon nopeuden online-toiminnoille ja valitse Laiteprioriteetti priorisoidaksesi verkon nopeuden laitteille."
                       }]
},
       BASIC_APPLICATION_PRIORITY :{ 
               TITLE:"Sovellusprioriteetti",
               CONTENT: [{
                           type: "paragraph",
                           content: "Valitse priorisoitava online-toiminto tai napsauta Mukauta määrittääksesi kunkin online-toiminnon prioriteettitason."
                       }]
},
       BASIC_DEVICE_PRIORITY :{ 
               TITLE:"Laiteprioriteetti",
               CONTENT: [{
                           type: "paragraph",
                           content: "Valitse priorisoitavat laitteet ja niiden prioriteetin keston."
                       } ,{                      
                           type: "step",
                           title: "Laitteen priorisointi",
       content: [ 
                "1. Paikanna luettelosta priorisoitava laite ja kytke Prioriteetti päälle.",
                "2. Valitse laitteen priorisoinnin kesto Ajastus-sarakkeesta."]
}]
},
       ANTI_VIRUS :{ 
               TITLE:"Virustentorjunta",
               CONTENT: [{
                           type: "paragraph",
                           content: "Virustentorjuntaominaisuus pitää henkilötietosi turvassa tarkastamalla verkon säännöllisesti, tunnistamalla haittasivustot ja eristämällä tartunnan saaneet laitteet. Voit myös tarkistaa, miten verkkoasi suojataan ja onko verkkoosi kohdistunut hyökkäyksiä."
                       } ,{                      
                           type: "paragraph",
                           content: "Historia - tallentaa laitteet, joita Virustentorjunta on suojellut, ja hyökkäysten lähteen ja luokituksen."
                       } ,{                      
                           type: "paragraph",
                           content: "Ota kaikki käyttöön - napauta ottaaksesi kaikki suojaustyypit käyttöön, jos jokin niistä ei ole käytössä."
                       } ,{                      
                           type: "paragraph",
                           content: "Suojaustyypit - ota suojaustyypit käyttöön viittaamalla selityksiin. Suositellaan, että otat käyttöön kaikki suojaustyypit."
                       }]
},
       APPLICATION_PRIORITY :{ 
               TITLE:"Sovellusprioriteetti",
               CONTENT: [{
                           type: "paragraph",
                           content: "Sovellusprioriteettiominaisuus priorisoi online-toiminnot taatakseen nopeamman verkkoyhteyden, kun tarvitset sitä eniten. Valitse priorisoitava online-toiminto tai napsauta Mukauta määrittääksesi kunkin online-toiminnon prioriteettitason."
                       }]
},
       DEVICE_PRIORITY :{ 
               TITLE:"Laiteprioriteetti",
               CONTENT: [{
                           type: "paragraph",
                           content: "Laiteprioriteettiominaisuus priorisoi laitteet taatakseen nopeamman verkkoyhteyden, kun tarvitset sitä eniten. Valitse priorisoitavat laitteet ja niiden prioriteetin keston."
                       } ,{                      
                           type: "step",
                           title: "Laitteen priorisointi",
       content: [ 
                "1. Paikanna luettelosta priorisoitava laite ja kytke Prioriteetti päälle.",
                "2. Valitse laitteen priorisoinnin kesto Ajastus-sarakkeesta."]
}]
},
       FIREWALL :{ 
               TITLE:"Palomuuri",
               CONTENT: [{
                           type: "paragraph",
                           content: "SPI (Stateful Packet Inspection) -palomuuri estää kyberhyökkäykset ja vahvistaa reitittimen läpi kulkevan liikenteen protokollan perusteella. Tämä ominaisuus on oletuksena käytössä."
                       } ,{                      
                           type: "name",
                           title: "Ota SPI-palomuuri käyttöön",
                           content: "Älä ota SPI-palomuuria käyttöön ellei se ole välttämätöntä."
                       } ,{                      
                           type: "name",
                           title: "Salli pingit WAN-portista/Salli pingit LAN-portista",
                           content: "Ota käyttöön salliaksesi ping-paketit WAN/LAN-portista. Suositellaan, että oletusasetukset säilytetään."
                       }]
},
       "" :     ""
    };
})(jQuery);