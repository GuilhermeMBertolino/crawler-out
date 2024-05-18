(function($) {

    $.helpContent = {
        trafficCtrl: {
            TITLE: "Kaistanleveyden hallinta",
            CONTENT: [{
                    type: "paragraph",
                    content: "Kaistanleveyden hallinta voit määrittää verkon tilaajalta verkkoon -kaistanleveyden ja verkosta tilaajalle -kaistanleveyden, ja yhdistetty siirtonopeus saa olla enintään 1 000 000 kbps. Valitse optimaalisen kaistanleveyden hallinta varten oikea linjatyyppi ja kysy ISP:ltä sallittu Tilaajalta verkkoon- ja Verkosta tilaajalle -kokonaiskaistanleveys."
                }, {
                    type: "name",
                    title: "Ota käyttöön",
                    content: "Valitse valintaruutu ottaaksesi kaistanleveyden hallinta -ominaisuuden käyttöön."
                }, {
                    type: "name",
                    title: "Tilaajalta verkkoon kokonaiskaistanleveys ",
                    content: "Anna koko latausnopeus verkkoon WAN-portin kautta."
                }, {
                    type: "name",
                    title: "Verkosta tilaajalle -kokonaiskaistanleveys",
                    content: "Anna latausnopeus verkosta WAN-portin kautta."
                }, {
                    type: "title",
                    content: "Ohjaussäännöt"
                }, {
                    type: "name",
                    title: "Kuvaus",
                    content: "Näyttää ohjatun IP-alueen tai porttialueen."
                }, {
                    type: "name",
                    title: "Prioriteetti",
                    content: "Näyttää säännön prioriteettitason, jossa 1 on korkein prioriteettitaso ja 8 on alin prioriteettitaso. Lataus verkkoon- ja lataus verkosta -kokonaiskaistanleveys määritetään takaamaan miniminopeus kaikille kaistanleveyden hallinnan säännöille."
                }, {
                    type: "name",
                    title: "Ylös (min / maks) ",
                    content: "Näyttää verkkoon latauksen minimi- ja maksimikaistanleveyden (kbps)."
                }, {
                    type: "name",
                    title: "Alas (min / maks)",
                    content: "Näyttää verkosta latauksen minimi- ja maksimikaistanleveyden (kbps)."
                }, {
                    type: "name",
                    title: "Ota käyttöön",
                    content: "Osoittaa säännön nykyisen tilan. Kytke sääntö päälle tai pois päältä napsauttamalla lamppukuvaketta."
                }, {
                    type: "name",
                    title: "Muuta",
                    content: "Näyttää vastaavan säännön muokkaus- tai poistamisvaihtoehdot."
                }, {
                    type: "note",
                    title: "Uuden säännön lisääminen",
                    content: [
                        "Napsauta Lisää. ",
                        "Anna ohjattavien IP-osoitteiden alue.",
                        "Anna ohjattavien IP-osoitteiden alue.",
                        "Valitse protokollatyyppi tälle säännölle.",
                        "Valitse prioriteettitaso tälle säännölle. (1 tarkoittaa korkeinta prioriteettia.)",
                        "Anna pienin ja suurin verkkoon latauksen kaistanleveys (kbps) WAN-portin kautta.",
                        "Anna pienin ja suurin verkosta latauksen kaistanleveys (kbps) WAN-portin kautta.",
                        "Valitse Ota tämä merkintä käyttöön",
                        "Napsauta OK."
                    ]
                }, {
                    type: "paragraph",
                    content: "<strong>Jos haluat poistaa useita sääntöjä</strong><br> Ohjaussäännöt-luettelossa, valitse poistettavien sääntöjen vastaava valintaruutu ja napsauta Poista taulukon yläpuolella."
                }
                
            ]
        },
        accessControl: {
            TITLE: "Käyttöoikeuksien hallinta",
            CONTENT: [{
                    type: "paragraph",
                    content: "Käyttöoikeuksien hallinnalla sallitaan tai estetään tiettyjä tietokoneita ja muita laitteita käyttämästä verkkoasi. Kun laite on lukittu, se voi saada IP-osoitteen reitittimeltä, mutta ei voi kommunikoida muiden laitteiden kanssa tai muodostaa yhteyttä internetiin. "
                }, {
                    type: "paragraph",
                    content: "<strong>Huomautus:</strong>Voit käyttää Käyttöoikeuksien hallintaa ottamalla tämän toiminnon käyttöön ja noudattamalla Sovellusopasta. Jos käyttöoikeuksien hallinta on pois käytöstä (off), kaikki laitteet voivat käyttää verkkoa, mukaan lukien kiellettyjen luettelossa olevat laitteet."
                }, {
                    type: "name",
                    title: "Käyttöoikeuksien hallinta",
                    content: "Vaihda päälle ottaaksesi käyttöoikeuksien hallinnan käyttöön."
                }, {
                    type: "title",
                    content: "Käyttötila"
                }, {
                    type: "name",
                    title: "Kiellettyjen luettelo",
                    content: "Valitse estääksesi alla olevassa luettelossa olevien laitteiden pääsyn."
                }, {
                    type: "name",
                    title: "Sallittujen luettelo",
                    content: "Valitse salliaksesi vain alla olevassa luettelossa olevien laitteiden pääsyn."
                }, {
                    type: "title",
                    content: "Kiellettyjen / sallittujen luettelossa olevat laitteet"
                }, {
                    type: "note",
                    title: "<strong>Laitteen lisääminen Kiellettyjen / sallittujen luetteloon</strong>",
                    content: [
                        "Napsauta Lisää-kuvaketta.",
                        "Anna laitteen nimi.",
                        "Anna laitteen MAC-osoite.",
                        "Napsauta OK."
                    ]
                }, {
                    type: "paragraph",
                    content: "<strong>Kiellettyjen / sallittujen luettelossa olevien laitteiden muokkaaminen tai poistaminen</strong> <br>Napsauta Muokkaa-kuvaketta Kiellettyjen / sallittujen taulukossa tai roskakorikuvaketta, joka vastaa muutettavaa tai poistettavaa laitetta."
                }, {
                    type: "paragraph",
                    content: "<strong>Useiden laitteiden poistaminen Kiellettyjen / sallittujen luettelosta</strong> <br>Valitse kaikki poistettavat laitteet Kiellettyjen / sallittujen luettelossa ja napsauta taulukon yläpuolella olevaa Poista-valintaa."
                }, {
                    type: "title",
                    content: "Online-laitteet"
                }, {
                    type: "name",
                    title: "Laitteen nimi",
                    content: "Näyttää kytketyn laitteen nimen."
                }, {
                    type: "name",
                    title: "IP-osoite",
                    content: "Näyttää kytketyn laitteen IP-osoitteen."
                }, {
                    type: "name",
                    title: "MAC-osoite",
                    content: "Näyttää kytketyn laitteen MAC-osoitteen."
                }, {
                    type: "name",
                    title: "Yhteystyyppi",
                    content: "Näyttää kytketyn laitteen yhteyden tyypin, joko kiinteä tai langaton. "
                }, {
                    type: "paragraph",
                    content: "<strong>Yhden tai usean laitteen estäminen</strong><br>Valitse Online-laitteet-taulukossa estettävät laitteet, ja napsauta taulukon yläpuolella olevaa Estä-valintaa. Valitut laitteet lisätään automaattisesti kohteeseen Kiellettyjen luettelossa olevat laitteet."
                }
                
                
            ]
        },
        arpBind: {
            TITLE: "Asetukset",
            CONTENT: [{
                    type: "paragraph",
                    content: "IP & MAC sidonta (tunnetaan myös ARP-sidontana) on ​​hyödyllinen tietyn tietokoneen käyttöoikeuksien hallinnassa LANissa, kun laitteen IP-osoite ja MAC-osoite  sidotaan yhteen. IP & MAC -sidonta myös estää muita laitteita käyttämästä tiettyä IP-osoitetta."
                }, {
                    type: "name",
                    title: "IP- & MAC-sidonta",
                    content: "Vaihda päälle ottaaksesi IP & MAC -sidontaominaisuuden käyttöön."
                }, {
                    type: "title",
                    title: "Sidontaluettelo"
                }, {
                    type: "note",
                    title: "<strong>Laitteen asettaminen ARP-sidonnalla</strong>",
                    content: [
                        "Napsauta Lisää.",
                        "Anna laitteen MAC-osoite.",
                        "Anna IP-osoite, jonka haluat sitoa edellä olevaan MAC-osoitteeseen.",
                        "Valitse Ota käyttöön.",
                        "Napsauta OK."
                    ]
                }, {
                    type: "paragraph",
                    content: "<strong>Merkinnän muuttaminen tai poistaminen</strong> <br>Napsauta Sidonta-luettelossa Muokkaa-kuvaketta tai roskakorikuvaketta, joka vastaa muutettavaa tai poistettavaa merkintää."
                }, {
                    type: "paragraph",
                    content: "<strong>Useiden merkintöjen poistaminen</strong> <br>Valitse poistettavat merkinnät Sidonta-luettelossa ja napsauta taulukon yläpuolella olevaa Poista-valintaa."
                }, {
                    type: "title",
                    title: "ARP-luettelo"
                }, {
                    type: "paragraph",
                    content: "Näyttää parhaillaan kytkettyjen laitteiden MAC- ja IP-osoitteen."
                }, {
                    type: "name",
                    title: "Laitteen nimi",
                    content: "Näyttää kytketyn laitteen nimen."
                }, {
                    type: "name",
                    title: "MAC-osoite",
                    content: "Näyttää kytketyn laitteen MAC-osoitteen."
                }, {
                    type: "name",
                    title: "IP-osoite",
                    content: "Näyttää kytketylle laitteelle määritetyn IP-osoitteen."
                }, {
                    type: "name",
                    title: "Sidottu",
                    content: "Osoittaa, sidotaanko MAC- ja IP-osoitteet."
                }, {
                    type: "name",
                    title: "Muuta",
                    content: "Näyttää vaihtoehdot, joilla kyseinen merkintä voidaan poistaa luettelosta."
                }, {
                    type: "paragraph",
                    content: "<strong>Huomautus: </strong>Et voi sitoa samaa IP-osoitetta useampaan kuin yhteen MAC-osoitteeseen."
                }, {
                    type: "paragraph",
                    content: "<strong>Useiden laitteiden sitominen</strong><br>Valitse ARP-luettelossa laitteet, joiden IP-osoitteet haluat sitoa niiden MAC-osoitteisiin, valitsemalla Sido-valinta taulukon yläpuolella."
                }
                
                
            ]
        },
        alg: {
            TITLE: "Sovelluskerroksen yhdyskäytävä (ALG)",
            CONTENT: [{
                    type: "paragraph",
                    content: "ALG sallii räätälöidyn verkko-osoitteiden muuntamisen (NAT) läpikäyntisuodattimien kytkemisen yhdyskäytävään tukemaan osoite- ja porttikäännöstä tietyille sovellustason \"ohjaus / data\" -protokollille: FTP, TFTP, H323 jne. ALG:n aktivointia suositellaan."
                }, {
                    type: "name",
                    title: "PPTP-läpäisy",
                    content: "Valitse valintaruutu, jotta PPTP-läpäisyominaisuus mahdollistaa Point-to-Point -istuntojen tunneloinnin IP-verkon kautta ja läpi reitittimen."
                }, {
                    type: "name",
                    title: "L2TP-läpäisy",
                    content: "Valitse valintaruutu, jotta L2TP-läpäisyominaisuus mahdollistaa Layer 2 Point-to-Point -istuntojen tunneloinnin IP-verkon kautta ja läpi reitittimen."
                }, {
                    type: "name",
                    title: "IPSec-läpäisy",
                    content: "Valitse valintaruutu, jotta IPSec-läpäisyominaisuus mahdollistaa    Internet-protokollan suojauksen (IPSec) tunneloinnin IP-verkon kautta ja läpi reitittimen. IPSec käyttää salauksen suojauspalveluja varmistamaan yksityisen ja turvallisen viestinnän IP-verkoissa."
                }, {
                    type: "name",
                    title: "FTP ALG",
                    content: "Valitse valintaruutu FTP ALG -ominaisuuden ottamiseksi käyttöön, jotta FTP-asiakkaat ja palvelimet voivat siirtää dataa NATin kautta."
                }, {
                    type: "name",
                    title: "TFTP ALG:",
                    content: "Valitse valintaruutu TFTP ALG -ominaisuuden ottamiseksi käyttöön, jotta TFTP-asiakkaat ja palvelimet voivat siirtää dataa NATin kautta."
                }, {
                    type: "name",
                    title: "RTSP ALG",
                    content: "Jos tämä on valittu, mediasoitinasiakkaat voivat kommunikoida suoratoistomediapalvelimien kanssa NATin kautta."
                }, {
                    type: "name",
                    title: "H323 ALG",
                    content: "Valitse valintaruutu, jotta H323 ALG-ominaisuus mahdollistaa Microsoft NetMeeting -asiakkaiden kommunikoida NATin kautta."
                }, {
                    type: "name",
                    title: "SIP ALG",
                    content: "Valitse valintaruutu SIP ALG -ominaisuuden ottamiseksi käyttöön, jotta SIP-asiakkaat ja palvelimet voivat siirtää dataa NATin kautta."
                }, {
                    type: "name",
                    title: "Tallenna",
                    content: "Tallenna kaikki asetukset napsauttamalla."
                }
                
            ]
        },
        virtualServer: {
            TITLE: "Näennäispalvelimet",
            CONTENT: [{
                    type: "paragraph",
                    content: "Näennäispalvelimia käytetään perustamaan julkisia palveluja lähiverkossa. Näennäispalvelin määritellään ulkoiseksi portiksi, ja kaikki pyynnöt Internetistä tähän ulkoiseen porttiin ohjataan nimetylle tietokoneelle, joka on määritettävä staattisella tai varatulla IP-osoitteella."
                }, {
                    type: "name",
                    title: "Palvelun tyyppi",
                    content: " Näyttää näennäispalvelimen nimen."
                }, {
                    type: "name",
                    title: "Ulkoinen portti",
                    content: "Näyttää näennäispalvelimen käyttämän portin numeron tai porttialueen. "
                }, {
                    type: "name",
                    title: "Sisäinen IP",
                    content: "Näyttää palvelusovellusta käyttävän tietokoneen IP-osoitteen."
                }, {
                    type: "name",
                    title: "Sisäinen portti",
                    content: "Näyttää palvelusovellusta käyttävän tietokoneen portin numeron."
                }, {
                    type: "name",
                    title: "Protokolla",
                    content: "Näyttää protokollan, jota käytetään palvelusovellukselle. TCP, UDP tai kaikki (kaikki reitittimen tukemat protokollat)."
                }, {
                    type: "name",
                    title: "Tila",
                    content: "Osoittaa näennäispalvelimen nykyisen tilan. Kytke näennäispalvelimen merkintä päälle (tai pois päältä) napsauttamalla lamppukuvaketta."
                }, {
                    type: "name",
                    title: "Muuta",
                    content: "Näyttää vastaavan säännön muokkaus- tai poistamisvaihtoehdot."
                }, {
                    type: "note",
                    title: "<strong>Näennäispalvelimen merkinnän lisääminen</strong>",
                    content: [
                        "Napsauta Lisää.",
                        "Valitse liittymän nimi pudotusvalikosta.",
                        "Valitse Näytä nykyiset sovellukset valitaksesi palvelun luettelosta, jotta sopiva portin numero luodaan automaattisesti Ulkoinen portti- ja Sisäinen portti -kentissä. Jos palvelu ei ole luettelossa, anna ulkoisen portin numero (esimerkiksi 21) tai porttialue (esim. 21-25). Jätä Sisäinen portti tyhjäksi, jos se on sama kuin ulkoinen porttinumero tai syöttää tietyn portin numero (esimerkiksi 21), jos ulkoinen portti on yksittäinen portti. ",
                        "Anna palvelusovellusta käyttävän tietokoneen IP-osoite pisteillä erotellussa desimaalimuodossa Sisäinen IP -kenttään.",
                        "Valitse protokolla palvelusovellukselle. TCP, UDP tai Kaikki protokollan pudotusvalikosta.",
                        "Valitse Ota tämä merkintä käyttöön",
                        "Napsauta OK."
                    ]
                }, {
                    type: "paragraph",
                    content: "<strong>Virtuaalipalvelinmerkinnän muuttaminen tai poistaminen</strong><br>Napsauta vastaavan merkinnän Muokkaa-valintaa tai roskakorikuvaketta."
                }, {
                    type: "paragraph",
                    content: "<strong>Useiden merkintöjen poistaminen</strong><br>Valitse kaikki poistettavat näennäispalvelinmerkinnät ja napsauta taulukon yläpuolella olevaa Poista-valintaa."
                }, {
                    type: "paragraph",
                    content: "<strong>Huomautus:</strong><br>Jos paikallinen isäntälaite isännöi useampaa kuin yhdentyyppistä saatavilla olevaa palvelua, sinun täytyy luoda näennäispalvelin kullekin palvelulle."
                }
                
            ]
        },
        portTrigger: {
            TITLE: "Portin laukaisu",
            CONTENT: [{
                type: "paragraph",
                content: "Portin laukaisua käytetään välittämään liikennettä tietyllä portilla tiettyyn palvelimeen verkossa.  "
            }, {
                type: "name",
                title: "Sovellus",
                content: "Näyttää sovelluksen nimen."
            }, {
                type: "name",
                title: "Laukaisuportti",
                content: "Näyttää lähtevän liikenteen portin, jolla laukaistaan lähtevän yhteyden suodatussääntö."
            }, {
                type: "name",
                title: "Laukaiseva protokolla",
                content: "Näyttää protokollan, jota käytetään laukaisuportille. TCP, UDP tai kaikki (kaikki reitittimen tukemat protokollat)."
            }, {
                type: "name",
                title: "Ulkoinen portti",
                content: "Näyttää etäjärjestelmän käyttämän portin tai porttialueen. Vaste, joka käyttää jotain näistä porteista, toimitetaan PC:lle, joka laukaisee tämän säännön. Voit syöttää enintään 5 porttiryhmää (tai porttiosiota). Kukin porttiryhmä täytyy erottaa pilkulla, esimerkiksi, 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
            }, {
                type: "name",
                title: "Ulkoinen protokolla",
                content: "Näyttää protokollan, jota käytetään saapuvalle portille. TCP, UDP tai kaikki (kaikki reitittimen tukemat protokollat)."
            }, {
                type: "name",
                title: "Tila",
                content: "Osoittaa laukaisuportin merkinnän nykyisen tilan. Kytke merkintä päälle (tai pois päältä) napsauttamalla lamppukuvaketta."
            }, {
                type: "name",
                title: "Muuta",
                content: "Näyttää vastaavan merkinnän muokkaus- tai poistamisvaihtoehdot."
            }, {
                type: "note",
                title: "<strong>Laukaisuportin merkinnän asettaminen</strong><br><strong>Huomautus: </strong> Kutakin merkintää voi käyttää vain yksi isäntä kerrallaan.",
                content: [
                    "Napsauta Lisää.",
                    "Valitse liittymän nimi pudotusvalikosta.",
                    "Valitse Näytä nykyiset sovellukset valitaksesi sovelluksen luettelosta oletusarvojen luomiseksi automaattisesti asianmukaisiin kenttiin. Jos haluat lisätä listaamattoman sovelluksen, manuaalisesti, anna Sovellus, Laukaisuportti, Laukaiseva protokolla, Ulkoinen portti ja Ulkoinen protokolla.<br><strong>Huomautus: </strong> Portin laukaisumerkinnöillä ei voi olla mitään porttialueita päällekkäin (esim. Merkinnällä 1 on porttialue 4200-4205, mikä tarkoittaa että Merkinnällä 2 ei voi olla porttialuetta 4203-4206).",
                    "Valitse Ota tämä merkintä käyttöön",
                    "Napsauta OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Kiellettyjen / sallittujen luettelossa olevien laitteiden muokkaaminen tai poistaminen</strong><br>Napsauta taulukossa Muokkaa-kuvaketta tai roskakorikuvaketta, joka vastaa muutettavaa tai poistettavaa merkintää."
            }, {
                type: "paragraph",
                content: "<strong>Useiden portin laukaisumerkintöjen poistaminen</strong><br>Valitse taulukossa kaikki poistettavat merkinnät ja napsauta taulukon yläpuolella olevaa Poista-valintaa."
            }]
        },
        dmz: {
            TITLE: "DMZ",
            CONTENT: [{
                type: "paragraph",
                content: "DMZ (demilitarisoitu vyöhyke) -isäntäominaisuudella paikallinen isäntä voidaan altistaa Internetille erityispalvelua, kuten Internet-pelaamista tai videoneuvottelua varten. Pohjimmiltaan, DMZ mahdollistaa yhden lähiverkon tietokoneen avata kaikki porttinsa. Tämä tietokone pitää määrittää staattisella IP-osoitteella ja sen DHCP-ominaisuus pitää olla poistettu käytössä."
            }, {
                type: "note",
                title: "<strong>Voit määrittää tietokoneen tai palvelimen olevan DMZ-palvelin</strong>",
                content: [
                    "Valitse Ota DMZ käyttöön.",
                    "Anna paikallisen tietokoneen IP-osoite DMZ-isännäksi.",
                    "Napsauta Tallenna."
                ]
            }]
        },
        upnp: {
            TITLE: "UPnP",
            CONTENT: [{
                    type: "paragraph",
                    content: "Universal Plug and Play (UPnP) -toiminto on oletusarvoisesti käytössä mahdollistamaan laitteiden, kuten tietokoneiden ja Internet-laitteiden automaattisesti löytämään toisensa ja kommunikoida toistensa kanssa lähiverkossa."
                }, {
                    type: "name",
                    title: "UPnP",
                    content: "Vaihda päälle ottaaksesi UPnP-ominaisuuden käyttöön."
                }, {
                    type: "title",
                    content: "UPnP-palveluluettelo"
                }, {
                    type: "paragraph",
                    content: "UPnP-palveluluettelossa näkyy UPnP-laitteen tiedot."
                }, {
                    type: "name",
                    title: "Asiakkaat yhteensä:",
                    content: "Näyttää UPnP-laitteiden kokonaismäärän."
                }, {
                    type: "name",
                    title: "Palvelun kuvaus",
                    content: "Näyttää lyhyen kuvauksen paikallisesta isännästä, joka aloittaa UPnP-pyynnön."
                }, {
                    type: "name",
                    title: "Ulkoinen portti",
                    content: "Näyttää ulkoisen portin, joka avataan paikallisella isännällä."
                }, {
                    type: "name",
                    title: "Protokolla",
                    content: "Näyttää verkon protokollatyypin, jota paikallinen isäntä käyttää."
                }, {
                    type: "name",
                    title: "Sisäinen IP-osoite",
                    content: "Näyttää paikallisen isännän IP-osoitteen."
                }, {
                    type: "name",
                    title: "Sisäinen portti",
                    content: "Näyttää sisäisen portin, joka avataan paikallisella isännällä."
                }, {
                    type: "paragraph",
                    content: "Napsauta <strong>Päivitä</strong> Päivittääksesi UPnP-palvelinluettelon."
                }
                
                
            ]
        },
        wlGuestDulBandAdv: {
            TITLE: "Vierasverkko",
            CONTENT: [{
                    type: "paragraph",
                    content: "Vierasverkon avulla voit perustaa erillisen langattoman verkon, jossa on erillinen verkkonimi (SSID) ja salasana, joilla asiakkaat voivat käyttää Internetiä."
                }, {
                    type: "title",
                    content: "Asetukset"
                }, {
                    type: "name",
                    title: "Salli vieraiden nähdä toisensa",
                    content: "Valitse tämä valintaruutu, salliaksesi vierasverkon langattomat laitteet olemaan yhteydessä toisiinsa."
                }, {
                    type: "name",
                    title: "Salli vieraiden käyttää lähiverkkoani",
                    content: "Valitse tämä valintaruutu, salliaksesi vierasverkon langattomat laitteet käyttämään paikallista verkkoasi."
                }, {
                    type: "name",
                    title: "Tallenna",
                    content: "Tallenna kaikki asetukset napsauttamalla."
                }, {
                    type: "title",
                    content: "Langattomat asetukset"
                }, {
                    type: "name",
                    title: "2,4GHz | 5 GHz Vierasverkko",
                    content: "Ota 2,4GHz | 5 GHz vierasverkko käyttöön napsauttamalla vastaavaa painiketta."
                }, {
                    type: "name",
                    title: "Vierasverkko SSID",
                    content: "Käytä oletus-SSID:tä tai luo uusi nimi käyttäen 1-32 merkkiä. Tämä kenttä on isot ja pienet kirjaimet erotteleva."
                }, {
                    type: "name",
                    title: "Suojaus",
                    content: "Valitse vierasverkon suojausvaihtoehto:",
                    children: [{
                        type: "name",
                        title: " Ei mitään",
                        content: "Vierasverkon suojauksen oletusasetus on Ei mitään; kuka tahansa voi käyttää."
                    }, {
                        type: "name",
                        title: "WPA / WPA2 Henkilökohtainen",
                        content: "Valitse tämä vaihtoehto, ottaaksesi käyttöön normaalin todennusmenetelmän, joka perustuu esijaettuun avaimeen (PSK), jota kutsutaan myös tunnuslauseeksi. Jos valittu, määritä seuraavat.",
                        children: [{
                            type: "name",
                            title: "Versio",
                            content: "Valitse vierasverkon suojausversio.",
                            children: [{
                                type: "name",
                                title: "Auto",
                                content: "Tämä vaihtoehto tukee useita WPA-standardin (Wi-Fi Protected Access) käyttöönottoja, kuten WPA ja WPA2."
                            }, {
                                type: "name",
                                title: "WPA2-PSK",
                                content: "Tämä vaihtoehto tukee suositeltavaa AES-salausta, joka tarjoaa paremman turvallisuustason kuin WPA-PSK."
                            }]
                        }, {
                            type: "name",
                            title: "Salaus",
                            content: "Valitse salaustyyppi: Auto (sekä TKIP:lle että AESille), TKIP (Temporal Key Integrity Protocol) tai AES (Advanced Encryption Standard). EI ole suositeltavaa käyttää TKIP:tä, jos reititin toimii 802.11n-tilassa, koska TKIP:tä ei tueta 802.11n- määrityksessä. Jos TKIP on valittu, WPS-toiminto poistetaan käytöstä."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "Salasana",
                    content: "Luo salasana, jonka pituus on 8 - 63 ASCII-merkkiä tai 8 - 64 heksadesimaalimerkkiä (0-9, a-f, A-F)."
                }, {
                    type: "paragraph",
                    content: "Yllä olevat 2,4 GHz vierasverkon ohjeet koskevat myös 5 GHz vierasverkkoa."
                }, {
                    type: "name",
                    title: "Tallenna",
                    content: "Tallenna kaikki asetukset napsauttamalla."
                }
                
            ]
        },
        wirelessStat: {
            TITLE: "Online-laitteet",
            CONTENT: [{
                    type: "name",
                    title: "MAC-osoite",
                    content: "Näyttää asiaan kuuluvan langattoman asiakkaan MAC-osoitteen."
                }, {
                    type: "name",
                    title: "Yhteystyyppi",
                    content: "Näyttää taajuuskaistan (2,4 GHz tai 5 GHz), johon langaton asiakas on liitetty."
                }, {
                    type: "name",
                    title: "Suojaus",
                    content: "Näyttää asiaan kuuluvien langattomien asiakkaiden suojaustyypin (Ei mitään, WEP, WPA / WPA2-Personal, tai WPA / WPA2-Enterprise)."
                }, {
                    type: "name",
                    title: "Vastaanotetut paketit",
                    content: "Näyttää asiaan kuuluvan langattoman asiakkaan vastaanottamien pakettien määrän."
                }, {
                    type: "name",
                    title: "Lähetetyt paketit",
                    content: "Näyttää asiaan kuuluvan langattoman asiakkaan lähettämien pakettien määrän."
                }, {
				type: "name",
				title: "Tiedonsiirtonopeus",
				content: "Näyttää viimeisten kyseisen langattoman asiakaslaitteen vastaanottamien pakettien tiedonsiirtonopeuden."
			}, {
                    type: "paragraph",
                    content: "Napsauta <strong>Päivitä</strong> päivittääksesi tämän sivun tiedot."
                }
                
                
            ]
        },
        wirelessAdv: {
            TITLE: "Lisäasetukset",
            CONTENT: [{
                type: "name",
                title: "2,4GHz | 5GHz",
                content: "Aseta sen langattomat lisäasetukset valitsemalla 2,4GHz | 5 GHz."
            }, {
                type: "name",
                title: "Jäljiteaikaväli",
                content: "Anna arvo väliltä 25 ja 1 000 millisekuntia määrittääksesi kuinka kauan paketit lähetetään reitittimellä langattoman verkon synkronoimiseksi. Oletusarvo on 100 millisekuntia."
            }, {
                type: "name",
                title: "RTS-raja-arvo",
                content: "Anna arvo väliltä 1 ja 2346 määrittääksesi reitittimen kautta lähetettävien tietojen pakettikoon. Oletuksena RTS:n (lähetyspyyntö) raja-arvokoko on 2346. Jos paketin koko on suurempi kuin ennalta asetettu raja-arvo, reititin lähettää lähetyspyynnön tietylle vastaanottoasemalle ja neuvottelee datakehyksen lähettämisen, tai muussa tapauksessa paketti lähetetään välittömästi."
            }, {
                type: "name",
                title: "DTIM-väliarvo",
                content: "Anna arvo väliltä 1 ja 255 määrittääksesi DTIM:n (Delivery Traffic Indication Message) aikavälin. 1 osoittaa, että DTIM-aikaväli on sama kuin jäljiteaikaväli."
            }, {
                type: "name",
                title: "Ryhmäavaimen päivitysjakso",
                content: " Syötä aika sekunteina (vähintään 30), jolla ohjataan salausavaimen automaattisen uusiminen aikaväliä. Oletusarvo on 0, joka osoittaa että avainta ei uusita."
            }, {
                type: "name",
                title: "WMM",
                content: "Tämä ominaisuus takaa, että paketit, joissa on korkean prioriteetin viestejä, lähetetään ensisijaisesti. WMM on käytössä pakonomaisesti 802.11n- tai 802.11ac-tilassa. On erittäin suositeltavaa ottaa WMM käyttöön."
            }, {
                type: "name",
                title: "Lyhyt GI",
                content: "Tämä toiminto on käytössä oletusarvoisesti ja on suositeltavaa lisätä datakapasiteettia vähentämällä vartiointiväli (GI) -aikaa."
            }, {
                type: "name",
                title: "AP-eristäminen",
                content: " Valitse tämä valintaruutu, ottaaksesi käyttöön AP-eristämisominaisuuden, jonka avulla voit rajata ja rajoittaa kaikkia verkossa olevia langattomia laitteita olemassa vuorovaikutuksessa keskenään, mutta silti käyttää Internetiä. AP-eristäminen on oletusarvoisesti pois käytöstä."
            }, {
                type: "title",
                content: "WDS"
            }, {
                type: "name",
                title: "WDS-silloitus",
                content: "Valitse tämä valintaruutu, ottaaksesi käyttöön WDS (Wireless Distribution System) -sidontaominaisuuden, jotta reititin voi silloittaa toiseen tukiasemaan (AP) langattomassa lähiverkossa (WLAN). Jos valittu, määritä seuraavat:"
            }, {
                type: "name",
                title: "SSID (silloitetaan)",
                content: "Anna SSID WAP (langaton tukiasema), johon reititin muodostaa yhteyden asiakkaana tai käytä Kysely-toimintoa skannataksesi ja näyttääksesi kaikki alueen käytettävissä olevat verkot."
            }, {
                type: "name",
                title: "MAC-osoite (silloitetaan)",
                content: "Kirjoita WAPin, johon reititin muodostaa yhteyden asiakkaana, MAC-osoite 12 heksadesimaalimerkin (0-9, a-f, A-F) muodossa. Jos valitset verkon Kysely-ominaisuuden kautta, MAC-osoite -kenttä luodaan automaattisesti."
            }, {
                type: "name",
                title: "Tutkimus",
                content: "Tämän painikkeen avulla voit skannata ja näyttää alueen kaikkien käytettävissä olevien verkkojen MAC-osoitteen, SSID:n, signaalin voimakkuuden, kanavan ja suojaustiedot. Kun valitset verkon, SSID, MAC-osoite, ja suojaus luodaan automaattisesti.",
                children: [{
                    type: "name",
                    title: "AP-luettelo",
                    content: "Näyttää reitittimen, johon voidaan muodostaa yhteys, AP-tiedot."
                }, {
                    type: "name",
                    title: "MAC-osoite",
                    content: "Näyttää AP:n, johon reititin muodostaa yhteyden asiakkaana,  MAC-osoitteen."
                }, {
                    type: "name",
                    title: "SSID",
                    content: "Näyttää AP:n, johon reititin muodostaa yhteyden asiakkaana,  SSID:n."
                }, {
                    type: "name",
                    title: "Signaalin vahvuus",
                    content: "Näyttää AP:n, johon reititin muodostaa yhteyden asiakkaana,  signaalin vahvuuden."
                }, {
                    type: "name",
                    title: "Kanava",
                    content: "Näyttää AP:n, johon reititin muodostaa yhteyden asiakkaana,  kanavan."
                }, {
                    type: "name",
                    title: "Salaus",
                    content: "Näyttää AP:n, johon reititin muodostaa yhteyden asiakkaana,  salaustyypin."
                }, {
                    type: "name",
                    title: "Kytke",
                    content: "Muodosta yhteys vastaavaan AP:hen tai katkaise yhteys napsauttamalla kuvaketta."
                }]
            }, {
                type: "name",
                title: "Suojaus",
                content: "Valitse jokin seuraavista suojausasetuksista:",
                children: [{
                    type: "name",
                    title: "Ei mitään",
                    content: "Voit poistaa langattoman yhteyden suojauksen valitsemalla tämän vaihtoehdon. On erittäin suositeltavaa, että otat langattoman yhteyden suojauksen käyttöön suojataksesi langatonta verkkoa luvattomalta käytöltä."
                }, {
                    type: "name",
                    title: "WPA / WPA2 Henkilökohtainen",
                    content: "Valitse tämä vaihtoehto, ottaaksesi käyttöön normaalin todennusmenetelmän, joka perustuu esijaettuun avaimeen (PSK), jota kutsutaan myös tunnuslauseeksi. Tämä vaihtoehto on suositeltava. Jos valittu, määritä seuraavat.",
                    children: [{
                        type: "name",
                        title: "Versio",
                        content: "Valitse langattoman verkon suojausversio.",
                        children: [{
                            type: "name",
                            title: "WPA-PSK",
                            content: "Tämä vaihtoehto tukee AES-salausta, joka tarjoaa alemman turvallisuustason kuin WPA2-PSK."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Tämä vaihtoehto tukee suositeltavaa AES-salausta, joka tarjoaa paremman turvallisuustason kuin WPA-PSK."
                        }]
                    }, {
                        type: "name",
                        title: "Salaus",
                        content: "Valitse salaustyyppi: TKIP (Temporal Key Integrity Protocol) tai AES (Advanced Encryption Standard). EI ole suositeltavaa käyttää TKIP:tä, jos reititin toimii 802.11n-tilassa, koska TKIP:tä ei tueta 802.11n- määrityksessä. Jos TKIP on valittu, WPS-toiminto poistetaan käytöstä."
                    }, {
                        type: "name",
                        title: "Salasana",
                        content: "Luo tähän kenttään langattoman yhteyden salasana, jonka pituus on 8 - 63 ASCII-merkkiä tai 8 - 64 heksadesimaalimerkkiä."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Valitse tämä vaihtoehto ottaaksesi käyttöön perustodennusmenetelmän, jos jokin asiakaslaitteesi versio voi käyttää vain langatonta yhteyttä WEPillä (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Tyyppi",
                        content: "Valitse langattoman verkon todennustyyppi. Valitse Avoin järjestelmä tai Jaettu avain perustuen langattoman asiakkaan valmiuksiin ja käyttöoikeuspyyntöön."
                    }, {
                        type: "name",
                        title: "WEP-avaimen muoto",
                        content: "Valitse joko ASCII- tai heksadesimaalimuoto. ASCII-muodossa on yhdistelmä kirjaimia ja numeroita. Heksadesimaalimuodossa on yhdistelmä numeroja (0-9) ja kirjaimia (A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Avainindeksi",
                        content: "Valitse, mitä neljästä avaimesta käytetään ja syötä vastaava WEP-avain, jonka luot Avainarvo-kentässä. Varmista, että nämä arvot ovat identtisiä kaikissa langattomissa asemissa verkossa."
                    }, {
                        type: "name",
                        title: "Avainarvo",
                        content: "Anna vastaava WEP-avain, jonka luot."
                    }]
                }]
            }, {
                type: "name",
                title: "Tallenna",
                content: "Tallenna asetukset napsauttamalla."
            }]
        },
        wirelessSchedule: {
            TITLE: "Langaton aikataulu",
            CONTENT: [{
                    type: "paragraph",
                    content: "Tehokas aika -aikataulu perustuu reitittimen aikaan Aika voidaan asettaa sivulla Järjestelmätyökalut> Aika-asetukset."
                }, {
                    type: "name",
                    title: "2,4GHz | 5GHz",
                    content: "Aseta sen langattoman yhteyden aikataulu valitsemalla 2,4GHz tai 5 GHz."
                }, {
                    type: "name",
                    title: "Langaton aikataulu",
                    content: "Vaihda päälle ottaaksesi tämän ominaisuuden käyttöön. Napsauta sitten soluja ja vedä niitä asettaaksesi aikajakson langattoman yhteyden katkaisemiseksi."
                }, {
                    type: "name",
                    title: "Palauta",
                    content: "Siirry ajan valintaan napsauttamalla."
                }, {
                    type: "name",
                    title: "Tallenna",
                    content: "Tallenna asetukset napsauttamalla."
                }
                
            ]
        },
        macFilter: {
            TITLE: "MAC-suodatinasetukset",
            CONTENT: [{
                type: "name",
                title: "MAC-suodatus",
                content: "Ota käyttöön hallitaksesi langatonta käyttöä käyttämällä yksittäisten laitteiden MAC-osoitetta."
            }, {
                type: "title",
                title: "Suodatussäännöt"
            }, {
                type: "name",
                title: "Estä alla olevan luettelon laitteiden pääsy langattomaan verkkoon.",
                content: "Valitse estääksesi alla olevassa luettelossa olevien laitteiden langaton pääsy."
            }, {
                type: "name",
                title: "Salli langaton käyttö vain alla olevan luettelon laitteista.",
                content: "Valitse salliaksesi vain alla olevassa luettelossa olevien laitteiden langaton pääsy."
            }, {
                type: "title",
                title: "Laiteluettelo"
            }, {
                type: "name",
                title: "MAC-osoite/kuvaus",
                content: "Näyttää laitteen MAC-osoitteen ja kuvauksen."
            }, {
                type: "name",
                title: "Ota käyttöön",
                content: "Kytke laitteen MAC-suodatus päälle tai pois päältä napsauttamalla lamppukuvaketta."
            }, {
                type: "name",
                title: "Muuta",
                content: "Näyttää vastaavan merkinnän muokkaus- tai poistamisvaihtoehdot."
            }, {
                type: "note",
                title: "Uuden laitteen lisääminen:",
                content: [
                    "Napsauta Lisää.",
                    "Anna laitteen MAC-osoite.",
                    "Anna laitteen kuvaus.",
                    "Napsauta Ota tämä merkintä käyttöön",
                    "Napsauta OK."
                ]
            }]
        },
        wirelessSettings: {
            TITLE: "Langattomat asetukset",
            CONTENT: [/*{
                    type: "name",
                    title: "Alue",
                    content: "Valitse alue pudotusvalikosta. Tässä kentässä määritetään alue, jossa reitittimen langatonta toimintaa voidaan käyttää. Voi olla laitonta käyttää reitittimen langatonta toimintoa muulla kuin tässä kentässä mainitulla alueella. Jos maa tai alue ei ole luettelossa, ota yhteyttä paikalliseen valtion virastoon apua varten."
                }, */{
                    type: "name",
                    title: "Smart Connect",
                    content: "Ota Smart Connect käyttöön valitsemalla tämä valintaruutu. Tämä toiminto nopeuttaa laitteiden toimintaa määrittämällä niille parhaat langattomat taajuusalueet perustuen vallitseviin olosuhteisiin verkkovaatimusten tasapainottamiseksi."
                }, {
                    type: "name",
                    title: "2,4GHz | 5GHz",
                    content: "Vaihda vastaavat asetukset valitsemalla 2,4GHz | 5 GHz."
                }, {
                    type: "name",
                    title: "Langaton radio",
                    content: "Ota 2,4GHz | 5 GHz langaton radiotaajuus käyttöön valitsemalla tämä valintaruutu."
                }, {
                    type: "name",
                    title: "Langattoman verkon nimi (SSID)",
                    content: "Voit pitää nykyisen oletusverkkonimen (SSID) tai luoda uuden nimen (enintään 32 merkkiä). Tämä kenttä on isot ja pienet kirjaimet erotteleva."
                }, {
                    type: "name",
                    title: "Piilota SSID",
                    content: "Valitse tämä valintaruutu, jos haluat piilottaa 2,4GHz | 5 GHz verkon nimen (SSID) Wi-Fi-verkon luettelosta."
                }, {
                    type: "name",
                    title: "Suojaus",
                    content: "Valitse jokin seuraavista suojausasetuksista:",
                    children: [{
                        type: "name",
                        title: "Ei suojausta",
                        content: "Voit poistaa langattoman yhteyden suojauksen valitsemalla tämän vaihtoehdon. On erittäin suositeltavaa, että otat langattoman yhteyden suojauksen käyttöön suojataksesi langatonta verkkoa luvattomalta käytöltä."
                    }, {
                        type: "name",
                        title: "WPA / WPA2 Henkilökohtainen",
                        content: "Valitse tämä vaihtoehto, ottaaksesi käyttöön normaalin todennusmenetelmän, joka perustuu esijaettuun avaimeen (PSK), jota kutsutaan myös tunnuslauseeksi. Tämä vaihtoehto on suositeltava. Jos valittu, määritä seuraavat.",
                        children: [{
                            type: "name",
                            title: "Versio",
                            content: "Valitse langattoman verkon suojausversio.",
                            children: [{
                                type: "name",
                                title: "Auto",
                                content: "Tämä vaihtoehto tukee useita WPA-standardin (Wi-Fi Protected Access) käyttöönottoja, kuten WPA ja WPA2."
                            }, {
                                type: "name",
                                title: "WPA2-PSK",
                                content: "Tämä vaihtoehto tukee suositeltavaa AES-salausta, joka tarjoaa paremman turvallisuustason kuin WPA-PSK."
                            }]
                        }, {
                            type: "name",
                            title: "Salaus",
                            content: "Valitse salaustyyppi: Auto (sekä TKIP:lle että AESille), TKIP (Temporal Key Integrity Protocol) tai AES (Advanced Encryption Standard). EI ole suositeltavaa käyttää TKIP:tä, jos reititin toimii 802.11n-tilassa, koska TKIP:tä ei tueta 802.11n- määrityksessä. Jos TKIP on valittu, WPS-toiminto poistetaan käytöstä."
                        }, {
                            type: "name",
                            title: "Salasana",
                            content: "Luo tähän kenttään salasana, jonka pituus on 8 - 63 ASCII-merkkiä tai 8 - 64 heksadesimaalimerkkiä."
                        }]
                    }, {
                        type: "name",
                        title: "WPA / WPA2 Yritys",
                        content: "Valitse tämä vaihtoehto ottaaksesi käyttöön kehittyneemmän todentamismenetelmän käyttäen RADIUS-palvelinta (Remote Authentication Dial In User Service). Jos valittu, WPS-toiminto poistetaan käytöstä.",
                        children: [{
                            type: "name",
                            title: "Versio",
                            content: "Valitse langattoman verkon suojausversio.",
                            children: [{
                                type: "name",
                                title: "Auto",
                                content: "Tämä vaihtoehto tukee useita WPA-standardin (Wi-Fi Protected Access) käyttöönottoja, kuten WPA ja WPA2."
                            }, {
                                type: "name",
                                title: "WPA2-PSK",
                                content: "Tämä vaihtoehto tukee suositeltavaa AES-salausta, joka tarjoaa paremman turvallisuustason kuin WPA."
                            }]
                        }, {
                            type: "name",
                            title: "Salaus",
                            content: "Valitse salaustyyppi: Auto (sekä TKIP:lle että AESille), TKIP (Temporal Key Integrity Protocol) tai AES (Advanced Encryption Standard). EI ole suositeltavaa käyttää TKIP:tä, jos reititin toimii 802.11n-tilassa, koska TKIP:tä ei tueta 802.11n- määrityksessä. Jos TKIP on valittu, WPS-toiminto poistetaan käytöstä."
                        }, {
                            type: "name",
                            title: "RADIUS-palvelimen IP",
                            content: "Anna RADIUS-palvelimen IP-osoite."
                        }, {
                            type: "name",
                            title: "RADIUS-palvelimen portti",
                            content: "Anna RADIUS-palvelimen portin numero."
                        }, {
                            type: "name",
                            title: "RADIUS-palvelimen salasana",
                            content: " Anna RADIUS-palvelimen jaettu salasana."
                        }]
                    }, {
                        type: "name",
                        title: "WEP",
                        content: "Valitse tämä vaihtoehto ottaaksesi käyttöön perustodennusmenetelmän, jos jokin asiakaslaitteesi versio voi käyttää vain langatonta yhteyttä WEPillä (Wired Equivalent Privacy).",
                        children: [{
                            type: "name",
                            title: "Tyyppi",
                            content: "Valitse langattoman verkon todennustyyppi. Oletusarvo on automaattinen, joka valitsee automaattisesti avoimen järjestelmän tai jaetun avaimen perustuen langattoman asiakkaan valmiuksiin ja käyttöoikeuspyyntöön."
                        }, {
                            type: "name",
                            title: "Valittu avain",
                            content: "Valitse, mitä neljästä avaimesta käytetään ja luo WEP-avain Avainarvo-kentässä. Langattomien asiakkaiden pitää syöttää vastaava WEP-avain, jotta ne voivat muodostaa yhteyden verkkoon."
                        }, {
                            type: "name",
                            title: "WEP-avaimen muoto",
                            content: "Käytä joko ASCII- tai heksadesimaalimuotoa. ASCII-muodossa on yhdistelmä kirjaimia ja numeroita. Heksadesimaalimuodossa on yhdistelmä numeroja (0-9) ja kirjaimia (A-F, a-f)."
                        }, {
                            type: "name",
                            title: "Avaintyyppi",
                            content: "Valitse WEP-avaimen pituus.",
                            children: [{
                                type: "name",
                                title: "64-bittinen salaus",
                                content: "Tämän avulla voit syöttää 10 heksadesimaalilukua (0-9, A-F, a-f) tai 5 ASCII-merkkiä WEP Arvo -kenttään."
                            }, {
                                type: "name",
                                title: "128-bittinen salaus",
                                content: "Tämän avulla voit syöttää 26 heksadesimaalilukua (0-9, A-F, a-f) tai 13 ASCII-merkkiä WEP Arvo -kenttään."
                            }]
                        }, {
                            type: "name",
                            title: "Avainarvo",
                            content: "Luo WEP-avain."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "Tila",
                    content: "Valitse lähetyksen sekatila."
                }, {
                    type: "name",
                    title: "Kanava",
                    content: "Valitse langattoman verkon käyttökanava. Oletuskanava on Automaattinen. Älä muuta sitä, ellei langattoman yhteyden muodostamisessa ole ajoittain ongelmia."
                }, {
                    type: "name",
                    title: "Kanavan leveys",
                    content: "Valitse langattoman verkon kanavan leveys (kaistanleveys)."
                }, {
                    type: "name",
                    title: "Lähetysteho",
                    content: "Valitse joko Korkea, Keski, tai Matala tietojen lähetystehon määrittämiseksi. Oletusasetus ja suositusasetus on korkea."
                }, {
                    type: "paragraph",
                    content: "Tallenna kaikki asetukset napsauttamalla <strong>Tallenna</strong>."
                }
                
                
                
                
                
            ]
        },
        wps: {
            TITLE: "Reitittimen PIN",
            CONTENT: [{
                type: "name",
                title: "Reitittimen PIN",
                content: "Vaihda päälle salliaksesi langattomien laitteiden muodostaa yhteyden reitittimeen käyttäen reitittimen PIN-koodia (Personal Identification Number)."
            }, {
                type: "name",
                title: "Nykyinen PIN",
                content: "Näyttää reitittimen nykyisen PIN-koodin. Oletusarvoinen PIN löytyy reitittimen tarrasta tai käyttäjän oppaasta. Napsauta Luo luodaksesi uuden PIN-koodin satunnaisesti tai valitse Palauta palauttaaksesi nykyisen PIN-koodin oletus-PIN-koodiksi."
            }, {
                type: "title",
                content: "WPS-asetukset"
            }, {
                type: "name",
                title: "Paina painiketta (suositus)",
                content: "Valitse tämä asetusmenetelmä ottaaksesi käyttöön WPS-ominaisuuden, jotta mikä tahansa WPS-yhteensopiva laite voidaan liittää helposti langattomaan verkkoon WPS-painikkeella tai virtuaalisesti Yhdistä-painikkeella."
            }, {
                type: "name",
                title: "PIN-koodi",
                content: "Valitse tämä asetusmenetelmä lisätäksesi laitteen manuaalisesti antamalla langattoman laitteen WPS PIN-koodin kenttään."
            }, {
                type: "name",
                title: "Kytke",
                content: "Aloita WPS napsauttamalla tätä painiketta."
            }]
        },
        parentCtrl: {
            TITLE: "Käytönvalvonta",
            CONTENT: [{
                type: "paragraph",
                content: "Käytönvalvonnan avulla voit estää sopimatonta, karkeaa ja haitallisia verkkosivustoja; rajoittaa pääsyä tiettyinä kellonaikoina (esimerkiksi Facebookiin tai YouTubeen kotitehtävien aikana)."
            }, {
                type: "name",
                title: "Tila",
                content: "Vaihda päälle ottaaksesi käytönvalvontaominaisuuden käyttöön. Tämä ominaisuus ei ole käytössä oletusarvoisesti."
            }, {
                type: "title",
                content: "Käytönvalvonnan alaiset laitteet"
            }, {
                type: "paragraph",
                content: "Käytönvalvonnan alaiset laitteet näyttävät luettelon laitteista, joita rajoitetaan tällä hetkellä käytönvalvonnalla."
            }, {
                type: "name",
                title: "Laitteen nimi",
                content: "Näyttää kaikkien liitettyjen asiakaslaitteiden nimet, joita rajoitetaan tällä hetkellä käytönvalvonnalla."
            }, {
                type: "name",
                title: "MAC-osoite",
                content: " Näyttää kaikkien liitettyjen asiakaslaitteiden MAC-osoitteet, joita rajoitetaan tällä hetkellä käytönvalvonnalla."
            }, {
                type: "name",
                title: "Tehokas aika",
                content: "Näyttää käyttörajoituksen ajanjaksot."
            }, {
                type: "name",
                title: "Kuvaus",
                content: "Näyttää kytketyn laitteen lyhyen kuvauksen. "
            }, {
                type: "name",
                title: "Tila",
                content: "Osoittaa, onko käytönvalvonta käytössä vastaavalle laitteelle. Kytke se päälle (tai pois päältä) napsauttamalla lamppukuvaketta."
            }, {
                type: "name",
                title: "Muuta",
                content: "Näyttää vastaavan laitteen muokkaus- tai poistamisvaihtoehdot."
            }, {
                type: "note",
                title: "<strong>Jos haluat rajoittaa uutta asiakaslaitetta</strong>",
                content: [
                    "Napsauta Lisää.",
                    "Valitse Näytä nykyiset laitteet valitaksesi parhaillaan kytketyt laitteet Käyttölaitteet-luettelosta; tai anna laitteen nimi ja MAC-osoite manuaalisesti lisätäksesi laitteen, jota ei ole kytketty.",
                    "Napsauta Tehokas aika -kuvaketta määrittääksesi ajanjakson, jota rajoitus koskee.",
                    "Anna lyhyt kuvaus Kuvaus-kentässä. Tämä kenttä on valinnainen.",
                    "Valitse Ota käyttöön.",
                    "Tallenna tämä merkintä napsauttamalla OK."
                ]
            }, {
                type: "paragraph",
                content: "<b>Laitteen muuttaminen tai poistaminen</b><br>Napsauta Käytönvalvonta-luettelon Laitteet-valinnassa Muokkaa-kuvaketta tai roskakorikuvaketta, joka vastaa muutettavaa tai poistettavaa laitetta."
            }, {
                type: "paragraph",
                content: "<b>Useiden laitteiden poistaminen</b><br>Valitse Käytönvalvonta-luettelon Laitteet-valinnassa poistettavien laitteiden vastaava valintaruutu ja napsauta Poista taulukon yläpuolella."
            }, {
                type: "title",
                title: "Sisällön rajoitus"
            }, {
                type: "paragraph",
                content: "Sisällön rajoituksen avulla voit rajoittaa pääsyä sisältöön käyttämällä avainsanoja, joita käytönvalvonnan alaiset laitteet voivat tai eivät voi käyttää riippuen rajoitustyypistä."
            }, {
                type: "name",
                title: "Rajoitustyyppi",
                content: "Valitse seuraava rajoitustyyppi:",
                children: [{
                    type: "name",
                    title: "Kiellettyjen luettelo",
                    content: "Sisältää avainsanoja ja verkkotunnuksia, joita käytetään estämään verkkosivujen käyttö asiakkaan laitteista Käytönvalvonta-luettelon Laitteet-valinnassa."
                }, {
                    type: "name",
                    title: "Sallittujen luettelo",
                    content: "Sisältää avainsanoja ja verkkotunnuksia, joita Käytönvalvonta-luettelon Laitteet-valinnassa määritetyt asiakaslaitteet saavat käyttää."
                }]
            }, {
                type: "name",
                title: "Lisää uusi avainsana",
                content: "Napsauta lisätäksesi uuden avainsanan tai toimialueen nimen kiellettyjen tai sallittujen luetteloon. "
            }, {
                type: "paragraph",
                content: "Voit poistaa avainsanan tai toimialueen nimien napsauttamalla - (miinus) -kuvaketta poistettavan kohteen vieressä."
            }, {
                type: "name",
                title: "Tallenna",
                content: "Tallenna kokoonpano napsauttamalla."
            }]
        },
        parentCtrl: {
            TITLE: "Lapsilukko",
            CONTENT: [{
                type: "paragraph",
                content: "Ikärajasuodatuksen, käyttörajoitusten ja käyttäjäprofiilien ansiosta lapsilukitus tarjoaa perheellesi personalisoidun ja sopivan Internet-yhteyden."
            }, {
                type: "note",
                title: "<strong>Lapsilukituksen käyttö uudessa laitteessa</strong>",
                content: [
                    "Napsauta Lisää.",
                    "Anna tälle profiilille nimi ja lisää tämän profiilin laitteet napsauttamalla \"+\".",
                    "Valitse suodatustaso ja mukauta suodatin tarpeittesi mukaan. Voit hakea suodattavia sivustoja tietokannastamme hakusanoilla. Muut sivustot (URL:t) voidaan syöttää manuaalisesti.<br/>Viittaa seuraaviin suodatuskategorioiden selityksiin:<p>Aikuissisältö - sivustot, jotka sisältävät seksuaalista, haitallista tai laitonta sisältöä, mukaan lukien pornografiaa, huumeiden käyttöä, väkivaltaa ja syrjintää</p><p>Uhkapelit - sivustot, jotka mainostavat uhkapelejä tai tarjoavat niistä tietoja, mukaan lukien uhkapelisivustot</p><p>Sukupuolikoulutus - sivustot, joilla keskustellaan sukupuolisuudesta informatiivisesti, mukaan lukien lisääntyminen, sukupuolisuus, turvallinen seksi ja ehkäisy, sukupuolitaudit ja seksuaalisen trauman hoito</p><p>Online-viestintä - sivustot, jotka isännöivät viestintää muiden kanssa kirjoittamalla, puheella tai videoilla, mukaan lukien sähköposti, blogit, verkkofoorumit, VoIP- ja videokeskustelupalvelut</p><p>Sosiaaliset verkostot - sivustot, joilla jaellaan mielipiteen ilmaisuja ja henkilökohtaisia kommunikaatioita, yhdistetään ihmisiä ja heidän toimintojaan mielenkiinnon kohteiden, ammatin, taustan tai toistensa tuntemisen perusteella</p><p>Ansiosivustot - sivustot, joilla käyttäjät saavat maksun tiettyjen sivustojen, sähköpostiviestien tai mainosten katsomisesta, linkkien napsauttamisesta tai kyselyihin vastaamisesta</p><p>Media - sivustot, joilla tarjotaan ilmaista, maksullista tai tilauspohjaista audio- ja/tai videosisältöä, mukaan lukien suoratoistopalvelut, TV-ohjelmat ja musiikin lataaminen</p><p>Lataukset - sivustot, jotka tarjoavat tiedostonjako- ja -levityspalveluita, mukaan lukien vertaisjakaminen, tiedostojen ja mobiililaitteiden sisällön (esim. musiikin ja sovellusten) tallennus verkossa</p><p>Pelit - sivustot, jotka tarjoavat pääsyn verkkopeleihin tai ladattaviin peleihin, mukaan lukien verkkopelaaminen, pelikonsoliverkostot ja selainpelit</p>",
                    "Jos haluat rajoittaa kokonaisaikaa, jonka tämä profiili voi viettää verkossa, ota aikarajoitukset käyttöön ja määritä ne. Voit myös määrittää nukkuma-ajalla päivittäisen aikajakson, jonka aikana tämän profiilin laitteilla ei pääse Internetiin.",
                    "Napsauta Tallenna."
                ]
            }, {
                type: "note",
                title: "<strong>Profiilin yksityiskohtaisen Internet-historian esittäminen</strong>",
                content: [
                    "Napsauta Tiedot-sarakkeessa vastaavaa Tiedot-painiketta.",
                    "Jos haluat nähdä lisää tietueita, napsauta Historia-painiketta <span class=\"ptl-ctr-help-icon history\"></span>.",
                    "Voit estää ja sallia sivustoja napsauttamalla <span class=\"ptl-ctr-help-icon block\"></span>- tai <span class=\"ptl-ctr-help-icon unblock\"></span>-painiketta."
                ]
            }, {
                type: "note",
                title: "<strong>Internet-yhteyden välitön esto ja salliminen</strong>",
                content: [
                    "Napsauta Internet-yhteyssarakkeessa <span class=\"ptl-ctr-help-icon stop\"></span> estääksesi kyseisen profiilin laitteiden pääsyn Internetiin ja napsauta <span class=\"ptl-ctr-help-icon enable\"></span> salliaksesi taas yhteyden."
                ]
            }]
        },
        qos: {
            TITLE: "QoS",
            CONTENT: [{
                type: "paragraph",
                content: "QoS (Quality of Service) -ominaisuus priorisoi online-toiminnot ja laitteet taatakseen nopeamman verkkoyhteyden, kun tarvitset sitä eniten."
            }, {
                type: "paragraph",
                content: "Valitse Sovellusprioriteetti priorisoidaksesi verkon nopeuden online-toiminnoille ja valitse Laiteprioriteetti priorisoidaksesi verkon nopeuden laitteille."
            }, {
                type: "title",
                content: "Sovellusprioriteetti"
            }, {
                type: "paragraph",
                content: "Valitse priorisoitava online-toiminto tai napsauta Mukauta määrittääksesi kunkin online-toiminnon prioriteettitason."
            }, {
                type: "title",
                content: "Laiteprioriteetti"
            }, {
                type: "paragraph",
                content: "Valitse priorisoitavat laitteet ja niiden prioriteetin keston."
            }, {
                type: "note",
                title: "<strong>Laitteen priorisointi</strong>",
                content: [
                    "Paikanna luettelosta priorisoitava laite ja kytke Prioriteetti päälle.",
                    "Valitse laitteen priorisoinnin kesto Ajastus-sarakkeesta."
                ]
            }]
        },
        antiVirus: {
            TITLE: "Virustentorjunta",
            CONTENT: [{
                type: "paragraph",
                content: "Virustentorjuntaominaisuus pitää henkilötietosi turvassa tarkastamalla verkon säännöllisesti, tunnistamalla haittasivustot ja eristämällä tartunnan saaneet laitteet. Voit myös tarkistaa, miten verkkoasi suojataan ja onko verkkoosi kohdistunut hyökkäyksiä."
            }, {
                type: "paragraph",
                content: "Historia - tallentaa laitteet, joita Virustentorjunta on suojellut, ja hyökkäysten lähteen ja luokituksen."
            }, {
                type: "paragraph",
                content: "Ota kaikki käyttöön - napauta ottaaksesi kaikki suojaustyypit käyttöön, jos jokin niistä ei ole käytössä."
            }, {
                type: "paragraph",
                content: "Suojaustyypit - ota suojaustyypit käyttöön viittaamalla selityksiin. Suositellaan, että otat käyttöön kaikki suojaustyypit."
            }]
        },
        applicationPriority: {
            TITLE: "Sovellusprioriteetti",
            CONTENT: [{
                type: "paragraph",
                content: "Sovellusprioriteettiominaisuus priorisoi online-toiminnot taatakseen nopeamman verkkoyhteyden, kun tarvitset sitä eniten. Valitse priorisoitava online-toiminto tai napsauta Mukauta määrittääksesi kunkin online-toiminnon prioriteettitason."
            }]
        },
        devicePriority: {
            TITLE: "Laiteprioriteetti",
            CONTENT: [{
                type: "paragraph",
                content: "Laiteprioriteettiominaisuus priorisoi laitteet taatakseen nopeamman verkkoyhteyden, kun tarvitset sitä eniten. Valitse priorisoitavat laitteet ja niiden prioriteetin keston."
            }, {
                type: "note",
                title: "<strong>Laitteen priorisointi</strong>",
                content: [
                    "Paikanna luettelosta priorisoitava laite ja kytke Prioriteetti päälle.",
                    "Valitse laitteen priorisoinnin kesto Ajastus-sarakkeesta."
                ]
            }]
        },
        wlGuestDulBandBasic: {
            TITLE: "Vierasverkko",
            CONTENT: [{
                type: "paragraph",
                content: "Vierasverkon avulla voit perustaa erillisen langattoman verkon, jossa on erillinen verkkonimi (SSID) ja salasana, joilla asiakkaat voivat käyttää Internetiä."
            }, {
                type: "name",
                title: "Salli vieraiden nähdä toisensa",
                content: "Valitse tämä valintaruutu, salliaksesi vierasverkon langattomat laitteet olemaan yhteydessä toisiinsa."
            }, {
                type: "name",
                title: "Salli vieraiden käyttää lähiverkkoani",
                content: "Valitse tämä valintaruutu, salliaksesi vierasverkon langattomat laitteet käyttämään paikallista verkkoasi."
            }, {
                type: "name",
                title: "Langaton verkko 2,4GHz | 5 GHz",
                content: "Ota 2,4GHz | 5 GHz vierasverkko käyttöön valitsemalla vastaava painike."
            }, {
                type: "name",
                title: "Vierasverkko SSID",
                content: "Käytä oletus-SSID:tä tai luo uusi nimi käyttäen 1-32 merkkiä. Tämä kenttä on isot ja pienet kirjaimet erotteleva."
            }, {
                type: "name",
                title: "Piilota SSID",
                content: "Valitse tämä valintaruutu, jos haluat piilottaa vierasverkon SSID:n."
            }, {
                type: "name",
                title: "Suojaus",
                content: "Valitse vierasverkon suojausvaihtoehto:",
                children: [{
                    type: "name",
                    title: "Ei mitään",
                    content: "Vierasverkon suojauksen oletusasetus on Ei mitään; kuka tahansa voi käyttää."
                }, {
                    type: "name",
                    title: "Aseta salasana",
                    content: "Luo salasana-kenttään vierasverkon salasana, jonka pituus on 8 - 63 ASCII-merkkiä tai 8 - 64 heksadesimaalimerkkiä (0-9, a-f, A-F)."
                }]
            }]
        },
        networkMap: {
            TITLE: "Internet",
            CONTENT: [{
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Internet-tila",
                content: "Näyttää reitittimen Internet-yhteyden nykyisen tilan."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Yhteystyyppi",
                content: "Näyttää Internet-yhteyden tyypin. "
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "IP-osoite",
                content: "Näyttää reitittimelle määritetyn nykyisen Internet IP-osoitteen."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "DNS-palvelin",
                content: " Näyttää ensisijaisen ja toissijaisen DNS-palvelimen  IP-osoitteet."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "Yhdyskäytävä",
                content: "Näyttää yhdyskäytävän IP-osoitteeen."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "MAC-osoite",
                "content": "Näyttää reitittimen ainutkertaisen fyysisen osoitteen."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "IP-osoite",
                "content": "Näyttää reitittimen IP-osoitteen, millä voi kirjautua reitittimen verkkohallintasivulle."
            }, {
				display: "$.routerMode == 'AP'",
                "type": "name",
                "title": "Aliverkon peite",
                "content": "Näyttää reitittimen aliverkon peitteen."
            }, {
				display: "$.routerMode == 'AP'",
				"type": "name",
                "title": "Osoitetyyppi",
                "content": "Näyttää reitittimen IP-osoitteen konfiguraatiotypin."
            }, {
	     display: INCLUDE_SPEEDTEST && "$.routerMode == 'Router'",	    	
               type: 'title',
                title: 'Nopeustesti'
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
                title: "Reititin"
            }, {
                type: "title2",
                content: "2,4 GHz | 5 GHz Langaton"
            }, {/*
                type: "name",
                title: "Tila",
                content: "Näyttää, onko 2,4GHz | 5 GHz langaton yhteys päällä (käytössä) tai pois päältä (pois käytöstä)."
            }, {*/
                type: "name",
                title: "SSID",
                content: "Näyttää nykyisen langattoman verkon nimen taajuuskaistalle 2,4GHz | 5 GHz."
            }, {
                type: "name",
                title: "Kanava",
                content: "Näyttää kanavan, johon langaton 2,4 GHz | 5 GHz verkko lähettää."
            }, {
                type: "name",
                title: "MAC",
                content: "Näyttää langattoman 2,4 GHz | 5 GHz verkon nykyisen MAC-osoitteen."
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "title2",
                content: "2,4GHz | 5 GHz Vierasverkko"
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "name",
                title: "Tila",
                content: "Näyttää, onko 2,4 GHz | 5 GHz vierasverkko päällä (käytössä) tai pois päältä (pois käytöstä)."
            }, {
	    	display: "$.routerMode == 'Router'",
                type: "name",
                title: "SSID",
                content: "Näyttää vierasverkon langattoman verkon nimen."
            }, {
                type: "title",
                title: "Langattomat / langalliset asiakkaat"
            }, {
                type: "name",
                title: "Nimi",
                content: " Näyttää reitittimeen kytketyn asiakkaan nimen. "
            }, {
                type: "name",
                title: "IP-osoite",
                content: "Näyttää asiakkaan määritetyn IP-osoitteen."
            }, {
                type: "name",
                title: "MAC-osoite",
                content: "Näyttää asiakkaan MAC-osoitteen."
            }, {
                display: INCLUDE_VOIP,
                type: "title",
                title: "Puhelin"
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Puhelimen nimi",
                content: "Näyttää puhelimen nimen."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Saapuvien puhelujen numerot",
                content: "Näyttää puhelinlaitteiden käyttämät numerot tulevien puhelujen vastaanottamiseksi reitittimen kautta. "
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Sisäinen numero",
                content: "Näyttää puhelinnumerot, joita käytetään soittamaan puheluja  samaan reitittimeen kytkettyjen puhelinlaitteiden välillä. Se on asetettu valmiiksi eikä sitä voida muuttaa."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Lähtevä numero",
                content: "Näyttää puhelinlaitteiden käyttämät numerot tulevien puhelujen soittamiseksi reitittimen kautta. Oletus on Automaattinen, mikä tarkoittaa että reititin valitsee käytettävissä olevan numeron lähteväksi numeroksi, joka voidaan muuttaa VoIP-sivulla."
            }, {
                display: INCLUDE_USB,
                type: "title",
                title: "Tulostin"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Nimi",
                content: "Näyttää reitittimeen USB-portin kautta kytketyn tulostimen nimen. "
            }, {
                display: INCLUDE_USB,
                type: "title",
                title: "USB-levy"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Merkki",
                content: "Näyttää reitittimeen kytketyn USB-levyn merkin."
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Yhteensä",
                content: "Näyttää USB-levyn kokonaiskapasiteetin."
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "Saatavilla",
                content: "Näyttää USB-levyn kokonaiskapasiteetin."
            }]
        },
		sysMode: {
            TITLE: "Toimintatila",
            CONTENT: [{
                type: "name",
                title: "Reititin",
                content: "Tässä tilassa reititin muodostaa yhteyden Internetiin suoraan dynaamisella IP-osoitteella, staattisella IP-osoitteella, PPPoE:lla, L2TP:llä tai PPTP:llä ja jakaa Internet-yhteyden usean langallisen tai langattoman laitteen kanssa. NAT, palomuuri ja DHCP-palvelin ovat oletuksena käytössä. Valitse tämä tila, jos olet ensikäyttäjätai et käytä tällä hetkellä muita reitittimiä."
            }, {
                type: "name",
                title: "Tukiasema",
                content: "Tässä tilassa reititin mudostaa yhteyden langalliseen tai langattomaan reitittimeen Ethernet-kaapelilla ja laajentaa olemassa olevan verkon langatonta katealuetta. Tässä tilassa ei tueta sellaisia toimintoja kuten NAT, lapsilukitus ja QoS. Tämän reitittimen IP-osoitteen määrää juurireitittimen DHCP-palvelin. Jos et tiedä tämän reitittimen IP-osoitetta, voit kirjautua verkkohallintasivulle osoitteessa http://tplinkwifi.net."
            }]
        },
        wirelessBasic: {
            TITLE: "Langattomat asetukset",
            CONTENT: [{
                type: "name",
                title: "2,4GHz | 5GHz Langaton verkko",
                content: "Ota 2,4GHz | 5 GHz langaton radiotaajuus käyttöön valitsemalla tämä valintaruutu."
            }, {
                type: "name",
                title: "Langattoman verkon nimi (SSID)",
                content: "Voit pitää nykyisen oletusverkkonimen (SSID) tai luoda uuden nimen (enintään 32 merkkiä). Tämä kenttä on isot ja pienet kirjaimet erotteleva."
            }, {
                type: "name",
                title: "Salasana",
                content: "Luo langattoman yhteyden salasanan, jonka pituus on 8 - 63 ASCII-merkkiä tai 8 - 64 heksadesimaalimerkkiä. Tämä kenttä on isot ja pienet kirjaimet erotteleva."
            }, {
                type: "name",
                title: "Piilota SSID",
                content: "Valitse tämä valintaruutu, jos haluat piilottaa 2,4GHz | 5 GHz SSID:n Wi-Fi-verkon luettelosta."
            }]
        },
        status: {
            TITLE: "Internet",
            CONTENT: [{
                type: "paragraph",
                content: "Näyttää Internet-yhteyden tärkeät tiedot."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
               /* type: "name",
                title: "Nimi",
                content: "Näyttää reitittimeen kytketyn Internet-portin nimen."
            }, {*/
                type: "name",
                title: "MAC-osoite",
                content: "Yksilöllinen fyysinen osoite, joka on määritetty reitittimen Internet (WAN) -porttiin."
            }, {
                type: "name",
                title: "IP-osoite",
                content: "IP-osoite, joka on määritetty reitittimen Internet (WAN) -porttiin. Jos IP-osoite on 0.0.0.0, tämä tarkoittaa, että Internet-yhteyttä ei ole."
            }, {
                type: "name",
                title: "Aliverkon peite",
                content: "Tämä parametri määrittää IP-osoitteen verkko-osan ja isäntäosan. "
            }, {
                type: "name",
                title: "Oletusyhdyskäytävä",
                content: " IP-osoite, jota käytetään yhdistämään reititin verkkoon."
            }, {
                type: "name",
                title: "Ensisijainen DNS / toissijainen DNS",
                content: "Toimialueen nimijärjestelmä (DNS) kääntää isäntänimet ja verkkotunnukset IP-osoitteiksi. Internet-palveluntarjoaja (ISP) määrittää näiden DNS-palvelimien tiedot."
            }, {
                type: "name",
                title: "Yhteystyyppi",
                content: "Internetin nykyinen yhteystyyppi."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "MAC-osoite",
                content: "Yksilöllinen fyysinen osoite, joka on määritetty reitittimen Internet (WAN) -porttiin."
            }, {
                type: "name",
                title: "IP-osoite",
                content: " IPv6-osoite, joka on määritetty reitittimen Internet (WAN) -porttiin."
            }, {
                type: "name",
                title: "Oletusyhdyskäytävä",
                content: " IP-osoite, jota käytetään yhdistämään reititin verkkoon."
            }, {
                type: "name",
                title: "Ensisijainen DNS / toissijainen DNS",
                content: "Toimialueen nimijärjestelmä (DNS) kääntää isäntänimet ja verkkotunnukset IP-osoitteiksi. Internet-palveluntarjoaja (ISP) määrittää näiden DNS-palvelimien tiedot."
            }, {
                type: "name",
                title: "Yhteystyyppi",
                content: "Internetin nykyinen yhteystyyppi."
            }, {
                type: "title",
                title: "Langaton"
            }, {
                type: "name",
                title: "2,4G | 5G",
                content: "Valitse näyttääksesi 2,4GHz | 5 GHz langattoman verkon asetukset ja tiedot."
            }, {
                type: "name",
                title: "Verkon nimi",
                content: "Langattoman verkon nimi, joka tunnetaan myös nimellä SSID (Service Set Identifier)."
            }, {
                type: "name",
                title: "Langaton radio",
                content: "Langattoman verkon nykytila ​​(Päällä tai Pois)."
            }, {
                type: "name",
                title: "Tila",
                content: "Nykyinen langaton tila."
            }, {
                type: "name",
                title: "Kanavan leveys",
                content: "Langattoman verkon kanavan kaistanleveys."
            }, {
                type: "name",
                title: "Kanava",
                content: "Nykyinen langaton kanava ja sen vastaava taajuus (GHz)."
            }, {
                type: "name",
                title: "MAC-osoite",
                content: "Langattoman verkon radion MAC-osoite."
            }, {
                type: "title",
                title: "LAN"
            }, {
                type: "paragraph",
                content: "Näyttää Ethernet (LAN) -porttien tiedot."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                type: "name",
                title: "MAC-osoite",
                content: "Yksilöllinen fyysinen osoite, joka on määritetty reitittimen Ethernet (LAN) -porttiin."
            }, {
                type: "name",
                title: "IP-osoite",
                content: "IPv4-osoite, joka on määritetty reitittimen Ethernet (LAN) -porttiin."
            }, {
                type: "name",
                title: "Aliverkon peite",
                content: "Tämä parametri määrittää IP-osoitteen verkko-osan ja isäntäosan."
            }, {
                type: "name",
                title: "DHCP",
                content: "Näyttää, onko reitittimen sisäänrakennettu DHCP-palvelin aktiivinen LAN-porteille vai ei."
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "MAC-osoite",
                content: " Yksilöllinen fyysinen osoite, joka on määritetty reitittimen Ethernet (LAN) -porttiin."
            }, {
                type: "name",
                title: "IP-osoite",
                content: "IPv6-osoite, joka on määritetty reitittimen Ethernet (LAN) -porttiin."
            }, {
                type: "name",
                title: "Etuliitteen pituus",
                content: "IPv6-osoitteen etuliitteen pituus."
            }, {
                type: "name",
                title: "Määritetty tyyppi",
                content: "LAN-liitäntään määritetty IPv6-osoitteen tyyppi."
            }, {
                type: "title",
                title: "Vierasverkko"
            }, {
                type: "name",
                title: "2,4G | 5G",
                content: "Valitse näyttääksesi 2,4GHz | 5 GHz vierasverkon asetukset ja tiedot."
            }, {
                type: "name",
                title: "Vierasverkko SSID",
                content: " Vierasverkon langattoman verkon nimi (SSID)."
            }, {
                type: "name",
                title: "Piilota SSID",
                content: "Näyttää, onko vierasverkon langattoman verkon nimi (SSID) piilotettu (päällä) vai ei (pois päältä)."
            }, {
                type: "name",
                title: "Langaton radio",
                content: "Osoittaa vierasverkon nykytilan ​​(Päällä tai Pois)."
            }, {
                type: "name",
                title: "Näkee toisensa",
                content: "Näyttää voivatko kaikki vierasverkon laitteet kommunikoida keskenään vai ei."
            }]
        },
        time: {
            TITLE: "Aika-asetukset",
            CONTENT: [{
                type: "name",
                title: "Aikavyöhyke",
                content: "Valitse paikallinen aikavyöhyke pudotusvalikosta."
            }, {
                type: "name",
                title: "Päivämäärä",
                content: "Anna paikallinen päivämäärä KK/PP/VV -kenttään."
            }, {
                type: "name",
                title: "Aika",
                content: "Valitse paikallinen aika pudotusvalikosta (24-tunnin muodossa, esim. 16:00:00)."
            }, {
                type: "name",
                title: "NTP-palvelin I/NTP-palvelin II",
                content: "Anna NTP-palvelimen I tai NTP II  IP-osoite, jolloin reititin saa ajan NTP-palvelimelta automaattisesti. Lisäksi reitittimessä on joitakin yhteisiä sisäänrakennettuja NTP-palvelimia, jotka synkronoivat automaattisesti, kun ne muodostavat yhteyden Internetiin."
            }, {
                type: "name",
                title: "Hanki PC",
                content: "Napsauta synkronoidaksesi tietokoneen järjestelmäajan kanssa."
            }, {
                type: "name",
                title: "Hanki GMT",
                content: "Napsauta synkronoidaksesi GMT-aikavyöhykkeen (Greenwich Mean Time) kanssa Internetistä."
            }, {
                type: "name",
                title: "Tallenna",
                content: "Tallenna asetukset napsauttamalla."
            }, {
                type: "title",
                content: "Kesäaika"
            }, {
                type: "note",
                title: "Kesäajan asettaminen",
                content: [
                    "Valitse <b>Ota kesäaika käyttöön.</b>",
                    "Valitse oikea <b>Aloituspäivä</b> ja -aika kun kesäaika alkaa paikallisella aikavyöhykkeelläsi.",
                    "Valitse oikea <b>Päättymispäivä</b> ja -aika kun kesäaika päättyy paikallisella aikavyöhykkeelläsi.",
                    "Napsauta <b>Tallenna</b>."
                ]
            }]
        },
        DIGNOSTIC: {
            TITLE: "Diagnostiikkatyökalut",
            CONTENT: [{
                    type: "paragraph",
                    content: "Reititin tarjoaa kaksi diagnostiikkatyökalua, testauksen ja jäljittämisen."
                }, {
                    type: "note",
                    title: "Testaustyökalun diagnosointi:",
                    content: [
                        "Tarkista valintanappia ennen testausta.",
                        "Anna IP-osoite tai toimialueen nimi.",
                        "Napsauta avattavaa kuvaketta ennen Lisäasetuksia testausmäärän, testauspaketin koon ja testauksen aikakatkaisun näyttämiseksi. Pidä nämä parametrit niiden oletusarvoissa tai määrittää ne tarpeidesi mukaan.",
                        "Aloita vianmääritys napsauttamalla Käynnistä-painiketta."
                    ]
                }, {
                    type: "paragraph",
                    content: "TAI"
                }, {
                    type: "note",
                    title: "Diagnosointi Traceroute-työkalulla:",
                    content: [
                        "Tarkista valintapainike ennen traceroutea.",
                        "Anna IP-osoite tai toimialueen nimi.",
                        "Napsauta avattavaa kuvaketta ennen Lisäasetuksia näyttääksesi Traceroute Max TTL:n. Säilytä oletusarvot tai määritä ne tarpeidesi mukaan.",
                        "Aloita vianmääritys napsauttamalla Käynnistä-painiketta."
                    ]
                }
                
                
            ]
        },
        softup: {
            TITLE: "Laiteohjelmiston päivitys",
            CONTENT: [{
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Laiteohjelmistopäivitys päivittää reitittimen käyttöjärjestelmän tuoreimmilla uusilla ominaisuuksilla ja erilaisilla parannuksilla parantaakseen suorituskykyä. Kun uusi laiteohjelmistopäivitys on saatavilla, saat siitä ilmoituksen oikeassa yläkulmassa olevan päivityskuvakkeen muodossa. Napsauta kuvaketta siirtyäksesi laiteohjelmistopäivityssivulle."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "<b>TÄRKEÄÄ: Noudata ohjeita estääksesi päivityksen epäonnistumisen.</b>"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "Ennen päivitystä:",
                content: [
                    "Yhdistä tietokone reitittimeen Ethernet-kaapelilla. Laiteohjelmistoa EI suositella päivitettävän langattomasti. ",
                    "Irrota reitittimestä kaikki siihen kytketyt USB-tallennuslaitteet.",
                    "Varmuuskopioi reitittimen kokoonpanoasetukset."
                ]
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Päivityksen aikana:<br>Pidä reititin päällä mutta älä käytä sitä."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Laiteohjelmiston päivittäminen verkossa:"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Napsauta Upgrade (Päivitä) ja vahvista pyydettäessä. Reititin lataa ja päivittää tuoreimman laiteohjelmiston automaattisesti ja käynnistyy sitten uudelleen.<br><b>Huomautus</b>: Voit joutua napsauttamaan ensin Check for upgrade (Tarkista päivityksen saatavuus) tarkistaaksesi, onko laiteohjelmistopäivitys saatavilla. "
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "Laiteohjelmiston päivittäminen manuaalisesti:"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "",
                content: [
                    "Siirry osoitteeseen www.tp-link.com ja lataa tuorein laiteohjelmisto tietokoneeseesi tukisivultamme. Varmista, että ladattava laiteohjelmistotiedosto vastaa sivulla ilmoitettua reitittimen laitteistoversiota.",
                    "Napsauta <b>Browse</b> (Selaa) ja valitse ladattu laiteohjelmistotiedosto.",
                    "Napsauta <b>Upgrade</b> (Päivitä). Laiteohjelmiston päivitykseen kuluu muutama minuutti. Reititin käynnistyy automaattisesti uudelleen, kun laiteohjelmisto on päivitetty."
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "paragraph",
                    content: "Ennen reitittimen laiteohjelmiston päivitystä, sinun täytyy ladata uusin laiteohjelmistopäivitys osoitteesta <a href='http://www.tp-link.com/en/download-center.html'>TP-LINK Download Center page</a> tietokoneellesi."
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                    title: "<B>TÄRKEÄÄ:</B> Jos haluat estää päivityksen epäonnistumisen, ota huomioon seuraavat seikat:",
                    content: [
                        "Varmista, että uusin laiteohjelmistotiedosto on sovitettu laitteistoversion kanssa (kuten osoitettu <b>Laiteohjelmiston päivitys</b> -sivulla). ",
                        "Varmista, että reitittimen ja tietokoneen välinen yhteys on vakaa. <b>EI OLE</b> suositeltavaa päivittää laiteohjelmistoa langattomasti.",
                        "Varmista, että olet poistanut kaikki USB-tallennuslaitteet, jotka on kytketty reitittimeen ennen laiteohjelmiston päivitystä estääksesi tietojen menetyksen.",
                        "Varmuuskopioi reitittimen asetukset.",
                        "Älä sammuta reititintä laiteohjelmiston päivityksen aikana."
                    ]
                }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                    title: "Reitittimen laiteohjelmiston päivittäminen",
                    content: [
                        "Napsauta <b>Selaa</b>.",
                        "Etsi ja valitse ladattu laiteohjelmistotiedosto.",
                        "Napsauta <b>Päivitä</b>."
                    ]
            }]
        },
        backNRestore: {
            TITLE: "Varmuuskopio",
            CONTENT: [{
                type: "paragraph",
                content: "On erittäin suositeltavaa varmuuskopioida nykyiset määritykset, jos järjestelmä pitää palauttaa aiempaan tilaan tai tehdasasetuksiin."
            }, {
                type: "paragraph",
                content: "Tallenna nykyiset määritykset tietokoneelle napsauttamalla <b>Varmuuskopioi</b>. Muista tallentaa varmuuskopiotiedosto turvalliseen paikkaan, josta se voidaan hakea ja jotta reititin voidaan palauttaa myöhemmin tarvittaessa."
            }, {
                type: "title",
                content: "Palauta"
            }, {
                type: "note",
                title: "Palauttaminen varmuuskopiosta",
                content: [
                    "Napsauta <b>Selaa</b>.",
                    "Etsi ja valitse ladattu varmuuskopiotiedosto.",
                    "Napsauta <b>Palauta</b>."
                ]
            }, {
                type: "title",
                content: "Tehdasasetusten palautus"
            }, {
                type: "paragraph",
                content: "Napsauta <b>Tehdasasetusten palauttaminen</b> palauttaaksesi reitittimen tehdasasetukset."
            }, {
                type: "note",
                title: "Note:",
                content: [
                    "Tehdasasetusten palauttaminen palauttaa kaikki asetukset, jotka olet määrittänyt reitittimen tehdasasetuksille. Kun reititin on palautettu ja käynnistetty uudelleen, luo uusi salasana kirjautuaksesi uudelleen verkkopohjaiseen hallintasivustoon.",
                    "ÄLÄ sammuta reititintä varmuuskopioinnin tai palautuksen aikana."
                ]
            }]
        },
        manageCtrl: {
            TITLE: "Tilin hallinta",
            CONTENT: [{
                    type: "paragraph",
		    display: "$.helpControl.cloudLogin",
                    content: "Tämän sivun avulla voit vaihtaa kirjautumissalasanasi."
                }, /*{
                    type: "name",
                    title: "Vanha käyttäjänimi",
                    content: "Kirjoita nykyinen käyttäjänimi."
                }, */{
                    type: "name",
                    title: "Vanha salasana",
                    content: "Kirjoita nykyinen salasana."
                }, /*{
                    type: "name",
                    title: "Uusi käyttäjänimi",
                    content: "Kirjoita uusi käyttäjänimi."
                }, */{
                    type: "name",
                    title: "Uusi salasana",
                    content: "Kirjoita uusi salasana."
                }, {
                    type: "name",
                    title: "Vahvista uusi salasana",
                    content: "Kirjoita uusi salasana uudelleen."
                }, {
                    type: "title",
                    content: "Paikallinen hallinta"
                }, {
                    type: "paragraph",
                    content: "Paikallisella hallinnalla voit nimenomaisesti määrittää verkon asiakaslaitteen käyttää ja hallita reitittimen MAC-osoitepohjaista todennusta."
                }, {
                    type: "name",
                    title: "Portti",
                    content: "Anna portin, jolla käytetään reititintä, numeroksi 1024 - 65535. Oletusnumero on 80."
                }, {
                    type: "name",
                    title: "IP/MAC-osoite",
                    content: "Anna laitteen kelvollinen paikallinen IP-osoite tai MAC-osoite, jolla voidaan käyttää reititintä."
                }, {
                    type: "title",
                    content: "Etähallinta"
                }, {
                    type: "paragraph",
                    content: "Etähallinta-toiminnon avulla voit käyttää ja määrittää reitittimen etätoimintona Internetistä."
                }, {
                    type: "name",
                    title: "Etähallinta",
                    content: "Valitse valintaruutu ottaaksesi Etähallinta-ominaisuuden käyttöön."
                }, {
                    type: "name",
                    title: "Portti",
                    content: "Anna portin, jolla käytetään reititintä turvallisemmin, numeroksi 1024 - 65535. Tavallisesti selaimet käyttävät HTTP-palvelun standardiporttia 80."
                }, {
                    type: "name",
                    title: "IP/MAC-osoite",
                    content: "Anna kelvollinen etä-IP-osoite tai MAC-osoite, jolla voidaan käyttää reititintä."
                }
                
            ]
        },
        log: {
            TITLE: "Järjestelmäloki",
            CONTENT: [{
                    type: "paragraph",
                    content: "Järjestelmäloki-sivulla näkyy luettelo reitittimen viimeisimmistä toimista (tapahtumat). Voit määrittää näytettävien lokien tyypin ja / tai tason. Tämä sivu mahdollistaa myös reitittimen viedä järjestelmälokin tietokoneeseen tai automaattisesti lähettää järjestelmäloki tiettyyn etäpalvelimeen."
                }, {
                    type: "name",
                    title: "Tyyppi",
                    content: "Valitse näytettävän järjestelmälokin tyyppi."
                }, {
                    type: "name",
                    title: "Taso",
                    content: "Valitse näytettävän järjestelmälokin taso."
                }, {
                    type: "name",
                    title: "Päivitä",
                    content: "Päivitä järjestelmäloki napsauttamalla tätä kuvaketta."
                }, {
                    type: "name",
                    title: "Poista kaikki",
                    content: "Poista kaikki järjestelmälokit napsauttamalla tätä kuvaketta."
                }, {
                    type: "name",
                    title: "Lokiasetukset",
                    content: "Napsauta asettaaksesi lokitiedoston asetukset.",
                    children: [{
                        type: "name",
                        title: "Tallenna paikallisesti",
                        content: "Valitse tallentaaksesi välimuistiin järjestelmän lokin reitittimen paikalliseen muistiin. Loki näkyy taulukossa Järjestelmäloki-sivulla.",
                        children: [{
                            type: "name",
                            title: "Vähimmäistaso",
                            content: "Valitse tallennettavan järjestelmälokin vähimmäistaso pudotusvalikosta. Luettelo on alenevassa järjestyksessä, jossa alin taso on lueteltu viimeisenä."
                        }]
                    }, {
                        type: "name",
                        title: "Etätallennus",
                        content: "Valitse lähettääksesi järjestelmälokin etäpalvelimeen. Jos etäpalvelimessa on lokin katseluohjelma tai nuuskijaohjelma, voit tarkastella ja analysoida järjestelmälokia etätoimintona reaaliajassa.",
                        children: [{
                            type: "name",
                            title: "Vähimmäistaso",
                            content: "Valitse tallennettavan järjestelmälokin vähimmäistaso pudotusvalikosta. Luettelo on alenevassa järjestyksessä, jossa alin taso on lueteltu viimeisenä."
                        }, {
                            type: "name",
                            title: "Palvelimen IP",
                            content: "Määritä etäjärjestelmän lokipalvelimen IP-osoite."
                        }, {
                            type: "name",
                            title: "Palvelimen portti",
                            content: "Määritä etäjärjestelmän lokipalvelimen portin numero."
                        }, {
                            type: "name",
                            title: "Paikallisen tilan nimi",
                            content: "Valitse paikallisen tilan nimi etäpalvelimelta pudotusvalikosta."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "Tallenna loki",
                    content: "Napsauta tätä painiketta ladataksesi kaikki järjestelmälokit tietokoneellesi."
                }
                
            ]
        },
        snmp: {
            TITLE: "SNMP-asetukset",
            CONTENT: [{
                    type: "name",
                    title: "SNMP-agentti",
                    content: "Vaihda päälle ottaaksesi käyttöön sisäänrakennetun SNMP-agentin, jonka avulla reititin voi toimia toiminnallisessa roolissa SNMP-viestin vastaanottamiseksi ja käsittelemiseksi, vastausten lähettämiseksi SNMP managerille, ja SNMP-keskeytysten laukaisemiseksi, kun tapahtuma ilmenee."
                }, {
                    type: "name",
                    title: "Vain luku -yhteisö",
                    content: "Näyttää oletusarvoisesti julkisen yhteisötunnuksen, joka suojaa reititintä luvattomalta käytöltä."
                }, {
                    type: "name",
                    title: "Kirjoitusyhteisö",
                    content: "Näyttää oletusarvoisesti luku- ja kirjoitusyhteisötunnuksen, joka suojaa reititintä luvattomalta käytöltä."
                }, {
                    type: "name",
                    title: "Järjestelmän nimi",
                    content: "Näyttää tämän hallitun laitteen hallinnollisesti määritetyn nimen."
                }, {
                    type: "name",
                    title: "Järjestelmän kuvaus",
                    content: "Näyttää hallitun laitteen kuvaustekstin.  Tämän arvon pitää sisältää järjestelmän laitteistotyypin täydellinen nimi ja versio, ohjelmiston käyttöjärjestelmä ja verkko-ohjelmisto."
                }, {
                    type: "name",
                    title: "Järjestelmän sijainti",
                    content: "Näyttää tämän laitteen fyysisen sijainnin (esimerkiksi puhelinkaappi, 3. kerros).  "
                }, {
                    type: "name",
                    title: "Järjestelmän yhteyshenkilö",
                    content: "Näyttää tämän hallitun laitteen tekstitiedot sekä yhteyshenkilön yhteystiedot."
                }, {
                    type: "name",
                    title: "Trap Manager IP",
                    content: "Näyttää keskeytysten vastaanottavan isännän IP-osoitteen."
                }
                
                
                
            ]
        },
        stat: {
            TITLE: "Liikennetilastot",
            CONTENT: [{
                    type: "name",
                    title: "Liikennetilastot",
                    content: "Vaihda päälle ottaaksesi liikennetilastot käyttöön."
                }, {
                    type: "title",
                    content: "Liikennetilastoluettelo"
                }, {
                    type: "name",
                    title: "IP/MAC-osoite",
                    content: "Kytkettyjen asiakkaiden IP- ja MAC-osoitteet."
                }, {
                    type: "name",
                    title: "Paketteja yhteensä",
                    content: "Reitittimen vastaanottamien ja lähettämien pakettien kokonaismäärä."
                }, {
                    type: "name",
                    title: "Tavua yhteensä",
                    content: "Reitittimen vastaanottamien ja lähettämien tavujen kokonaismäärä."
                }, {
                    type: "name",
                    title: "Nykyisiä paketteja",
                    content: "Tiettyinä aikaväleinä (sekunneissa) vastaanotettujen ja lähetettyjen pakettien kokonaismäärä."
                }, {
                    type: "name",
                    title: "Nykyisiä tavuja",
                    content: "Tiettyinä aikaväleinä (sekunneissa) vastaanotettujen ja lähetettyjen tavujen kokonaismäärä."
                }, {
                    type: "name",
                    title: "Nykyinen ICMP Tx",
                    content: "Näyttää nykyisen siirtonopeuden ICMP-paketeille, jotka lähetetään WAN-portin kautta suurimmalla siirtonopeudella."
                }, {
                    type: "name",
                    title: "Nykyinen UDP Tx",
                    content: "Näyttää nykyisen siirtonopeuden UDP-paketeille, jotka lähetetään WAN-portin kautta suurimmalla siirtonopeudella."
                }, {
                    type: "name",
                    title: "Nykyinen SYN Tx",
                    content: "Näyttää nykyisen siirtonopeuden TCP SYN -paketeille, jotka lähetetään WAN-portin kautta suurimmalla siirtonopeudella."
                }, {
                    type: "name",
                    title: "Muuta",
                    content: "Valitse <b>Roskakori</b>-kuvake poistaaksesi vastaavat tilastot."
                }, {
                    type: "name",
                    title: "Päivitä",
                    content: "Napsauta päivittääksesi tilastotiedot sivulla."
                }, {
                    type: "name",
                    title: "Tehdasasetusten palauttaminen",
                    content: "Napsauta palauttaaksesi kaikki luettelon tilastolliset arvot nollaan."
                }, {
                    type: "name",
                    title: "Poista kaikki",
                    content: "Napsauta poistaaksesi kaikki luettelon tilastotiedot."
                }
                
                
            ]
        },
        ethWan: {
            TITLE: "WAN-liitäntä",
            CONTENT: [{
                type: "title2",
                content: "Yhteystyyppi: Dynaaminen IP"
            }, {
                type: "name",
                title: "Dynaaminen IP",
                content: "Valitse tämä tyyppi, jos Internet-palveluntarjoaja (ISP) on antanut DHCP-palvelinyhteyden."
            }, {
                type: "name",
                title: "IP-osoite / aliverkon peite / yhdyskäytävä / oletusyhdyskäytävä",
                content: "ISP:n DHCP-palvelin määrittää nämä parametrit automaattisesti."
            }, {
                type: "name",
                title: "Uudista / vapauta",
                content: "Napsauta tätä painiketta uudistaaksesi / vapauttaaksesi ISP:n IP-parametrit."
            }, {
                type: "name",
                title: "Lisäasetukset",
                children: [{
                    type: "name",
                    title: "MTU-koko (tavua)",
                    content: "Useimpien Ethernet-verkkojen oletuskoko ja tyypillinen MTU-koko (siirtoyksikön enimmäiskoko) on <b>1 500 tavua.</b> Ei ole suositeltavaa muuttaa MTU-oletuskokoa ellei ISP vaadi sitä."
                }, {
                    type: "name",
                    title: "IGMP-välityspalvelin",
                    content: "IGMP:n (Internet Group Management Protocol) avulla voidaan hallita monilähetystä TCP- / IP-verkoissa. Jotkin palveluntarjoajat käyttävät IGMP:tä etämääritysten suorittamiseksi reitittimellä. Se on oletusarvoisesti käytössä."
                }, {
                    type: "name",
                    title: "Hae IP käyttämällä Unicast DHCP:tä",
                    content: "Valitse tämä valintaruutu, jos ISP:n DHCP-palvelin ei tue lähetyssovelluksia ja et voi saada IP-osoitetta dynaamisesti."
                }, {
                    type: "name",
                    title: "Käytä seuraavaa DNS-osoitetta",
                    content: "Valitse tämä valintaruutu ja kirjoita DNS-palvelimen osoite (-osoitteet) ISP:n antamassa pisteellisessä desimaalimuodossa. Tämä WAN-liitäntä käyttää määritettyä DNS-palvelinta prioriteettina."
                }, {
                    type: "name",
                    title: "Isäntänimi",
                    content: "Anna tämän WAN-liitännän isännän nimi."
                }]
            }, {
                type: "title2",
                content: "Yhteystyyppi: Staattinen IP"
            }, {
                type: "name",
                title: "Staattinen IP",
                content: "Valitse tämä tyyppi, jos olet saanut ISP:ltä tietyn (kiinteä) IP-osoitteen, aliverkon peitteen, yhdyskäytävän ja DNS-parametrit."
            }, {
                type: "name",
                title: "IP-osoite / Aliverkon peite / Yhdyskäytävä / DNS-palvelin / Toissijainen DNS-palvelin",
                content: "Anna ISP:n antamat IP-tiedot pisteellisessä desimaalimuodossa."
            }, {
                type: "paragraph",
                content: "Valitse <b>Lisäasetukset</b> nähdäksesi enemmän lisäasetuksia."
            }, {
                type: "name",
                title: "Lisäasetukset",
                children: [{
                    type: "name",
                    title: "MTU-koko (tavua)",
                    content: "Useimpien Ethernet-verkkojen oletuskoko ja tyypillinen MTU-koko (siirtoyksikön enimmäiskoko) on <b>1 500 tavua.</b> Ei ole suositeltavaa muuttaa MTU-oletuskokoa ellei ISP vaadi sitä."
                }, {
                    type: "name",
                    title: "IGMP-välityspalvelin",
                    content: "IGMP:n (Internet Group Management Protocol) avulla voidaan hallita monilähetystä TCP- / IP-verkoissa. Jotkin palveluntarjoajat käyttävät IGMP:tä etämääritysten suorittamiseksi reitittimellä. Se on oletusarvoisesti käytössä."
                }]
            }, {
                type: "title2",
                content: "Yhteystyyppi: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Valitse tämä tyyppi, jos käytät DSL-palvelua (Digital Subscriber Line) ja olet saanut ISP:ltä käyttäjänimen ja salasanan."
            }, {
                type: "name",
                title: "PPPoE-käyttäjänimi / PPPoE-salasana / Vahvista salasana",
                content: "Anna ISP:n antama käyttäjätunnus ja salasana. Nämä kentät ovat isot ja pienet kirjaimet erottelevia."
            }, {
                type: "name",
                title: "Toissijainen liitäntä",
                content: "Se on käytettävissä vain PPPoE-yhteyttä varten. Jos Internet-palveluntarjoaja tarjoaa ylimääräisen yhteystyypin, kuten dynaamisen / staattisen IP-yhteyden lähiverkkoon, voit valita dynaamisen / staattisen IP:n valintapainikkeen aktivoidaksesi tämän toissijaisen yhteyden. <br>Toissijainen Connection on oletusarvoisesti pois käytöstä, joten käytössä on vain PPPoE-yhteys. Älä ota sitä käyttöön,  ellei se ole välttämätöntä."
            }, {
                type: "name",
                title: "Yhteystila",
                content: "Valitse jokin alla oleva yhteystila, joka määrittää miten Internetiin muodostetaan yhteys:",
                children: [{
                    type: "name",
                    title: "Aina",
                    content: "Valitse tämä tila muodostamaan yhteys uudelleen automaattisesti aina kun yhteys katkeaa."
                }, {
                    type: "name",
                    title: "Muodosta yhteys tarvittaessa",
                    content: "Valitse tämä tila katkaistaksesi Internet-yhteyden perustuen tiettyyn käyttämättömyysaikaan (maksimijoutoaika). Yhteys muodostetaan uudelleen, kun yrität käyttää Internetiä uudelleen."
                }, {
                    type: "name",
                    title: "Yhdistä manuaalisesti",
                    content: "Valitse tämä tila katkaistaksesi Internet-yhteyden manuaalisesti tai perustuen tiettyyn käyttämättömyysaikaan (maksimijoutoaika)."
                }, {
                    type: "name",
                    title: "Maksimijoutoaika",
                    content: "<b>15 minuuttia</b> - Anna minuuttimäärä, jonka ajan Internet-yhteys voi olla käyttämättä, ennen kuin se katkaistaan. Oletusjoutoaika on 15 minuuttia."
                }]
            }, {
                type: "name",
                title: "Todennustyyppi",
                content: "Valitse todennustyyppi pudotusvalikosta. Oletusmenetelmä on AUTO_AUTH."
            }, {
                type: "name",
                title: "Yhdistä / katkaise",
                content: "Yhdistä / katkaise välittömästi napsauttamalla."
            }, {
                type: "paragraph",
                content: "Valitse <b>Lisäasetukset</b> nähdäksesi enemmän lisäasetuksia."
            }, {
                type: "name",
                title: "Lisäasetukset",
                children: [{
                    type: "name",
                    title: "Palvelun nimi",
                    content: "Anna ISP:n antama palvelun nimi. Jos ei, jätä tyhjäksi."
                }, {
                    type: "name",
                    title: "Palvelimen nimi",
                    content: "Anna ISP:n antama palvelimen nimi. Jos ei, jätä tyhjäksi."
                }, {
                    type: "name",
                    title: "MTU-koko (tavua)",
                    content: "Ethernet-verkkojen tyypillinen MTU-koko (siirtoyksikön enimmäiskoko) on 1480 tavua.",
                    children: [{
                        type: "paragraph",
                        content: "<b>Huomautus:</b> Siinä harvinaisessa tapauksessa, että ISP vaatii säätämään MTU:n kokoa verkon parempaa suorituskykyä varten. Arvoa ei pidä muuttaa, ellei se ole aivan välttämätöntä."
                    }]
                }, {
                    type: "name",
                    title: "IGMP-välityspalvelin",
                    content: "IGMP:n (Internet Group Management Protocol) avulla voidaan hallita monilähetystä TCP- / IP-verkoissa. Jotkin palveluntarjoajat käyttävät IGMP:tä etämääritysten suorittamiseksi reitittimellä. Se on oletusarvoisesti käytössä."
                }, {
                    type: "name",
                    title: "Käytä ISP:n määrittämää IP-osoitetta",
                    content: "Valitse tämä vaihtoehto ja anna ISP:n antama IP-osoite."
                }, {
                    type: "name",
                    title: "Kaiutuspyynnön väli",
                    content: "Anna aikaväli väliltä 0 ja 120 (sekunneissa), jolloin reititin pyytää käytön keskittimen päivittämään jokaisen aikavälin aikana. Oletusarvo on 30. 0 tarkoittaa, että tunnistusta ei ole."
                }, {
                    type: "name",
                    title: "Käytä seuraavaa DNS-osoitetta",
                    content: "Valitse tämä valintaruutu ja kirjoita DNS-palvelimen osoite (-osoitteet) ISP:n antamassa pisteellisessä desimaalimuodossa. Tämä WAN-liitäntä käyttää määritettyä DNS-palvelinta prioriteettina."
                }]
            }, {
                type: "title2",
                content: "Yhteystyyppi: L2TP/PPTP"
            }, {
                type: "name",
                title: "L2TP/PPTP",
                content: "Valitse tämä tyyppi, jos muodostat yhteyden L2TP/PPTP VPN -palvelimeen ja olet saanut ISP:ltä käyttäjänimen, salasanan ja IP-osoitteen / toimialueen nimen."
            }, {
                type: "name",
                title: "Käyttäjänimi / Salasana",
                content: "Anna ISP:n antama käyttäjätunnus ja salasana. Nämä kentät ovat isot ja pienet kirjaimet erottelevia."
            }, {
                type: "name",
                title: "IP-osoite / ensisijainen DNS",
                content: "ISP:n DHCP-palvelin määrittää nämä parametrit automaattisesti."
            }, {
                type: "name",
                title: "Toissijainen liitäntä (Dynamic IP tai staattinen IP)",
                children: [{
                    type: "name",
                    title: "Dynaaminen IP",
                    content: "Valitse tämä, jos ISP on määrittänyt automaattisesti IP-osoitteen ja aliverkon peitteen."
                }, {
                    type: "name",
                    title: "Staattinen IP",
                    content: "Valitse tämä, jos ISP on antanut IP-osoitteen, aliverkon peitteen, yhdyskäytävän ja DNS-osoitteet, ja syötä nämä tiedot vastaaviin kenttiin."
                }]
            }, {
                type: "name",
                title: "VPN-palvelin IP / toimialuenimi",
                content: "Anna ISP:n antama VPN-palvelimen IP-osoite tai toimialueen nimi."
            }, {
                type: "name",
                title: "MTU-koko",
                content: "Useimpien Ethernet-verkkojen oletuskoko ja tyypillinen MTU-koko (siirtoyksikön enimmäiskoko) on 1460 tavua (1420 PPTP:lle). Älä muuta MTU-oletuskokoa ellei ISP vaadi sitä."
            }, {
                type: "name",
                title: "Yhteystila",
                content: "Valitse asiaan kuuluva yhteystila, joka määrittää miten Internetiin muodostetaan yhteys.",
                children: [{
                    type: "name",
                    title: "Aina päällä",
                    content: "Tässä tilassa, Internet-yhteys muodostetaan uudelleen automaattisesti aina kun se katkeaa."
                }, {
                    type: "name",
                    title: "Muodosta yhteys tarvittaessa",
                    content: "Tässä tilassa, Internet-yhteys katkaistaan automaattisesti tietyn käyttämättömyysajan (maksimijoutoaika) jälkeen. Yhteys muodostetaan uudelleen, kun yrität käyttää Internetiä uudelleen."
                }, {
                    type: "name",
                    title: "Yhdistä manuaalisesti",
                    content: "Tässä tilassa, Internet-yhteyttä ohjataan manuaalisesti napsauttamalla Yhdistä / katkaise yhteys -painiketta. Tämä tila tukee maksimijoutoaikatoimintoa. Anna maksimijoutoaika (minuutteina) määrittääksesi maksimiajan, jonka ajan Internet-yhteys voi olla käyttämättä, ennen kuin se katkaistaan. Oletusarvo on 15 minuuttia. Jos haluat, että Internet-yhteys pysyy käytössä koko ajan, syötä 0 (nolla)."
                }]
            }, {
                type: "title",
                content: "MAC-klooni"
            }, {
                type: "name",
                title: "Käytä MAC-oletusosoitetta",
                content: "Valitse tämä vaihtoehto käyttääksesi oletus-MAC-osoitetta, jos ISP ei ole määrittänyt IP-osoitetta reitittimen MAC-osoitteelle."
            }, {
                type: "name",
                title: "käytä nykyisen tietokoneen MAC-osoitetta",
                content: "Valitse tämä mahdollisuus käyttääksesi parhaillaan kytketyn tietokoneen MAC-osoitetta siinä tapauksessa, että ISP sallii vain tämän tietokoneen käyttää Internetiä."
            }, {
                type: "name",
                title: "Käytä mukautettua MAC-osoitetta",
                content: "Valitse tämä vaihtoehto antaaksesi rekisteröity MAC-osoite manuaalisesti."
            }]
        },
        route: {
            TITLE: "Edistynyt reititys",
            CONTENT: [{
                    type: "paragraph",
                    content: "Edistyneellä reitityksellä ennaltamääritetään kiinteä reitti, jota kautta verkon tietopaketit voivat saavuttaa tietyn isännän tai verkon."
                }, {
                    type: "title",
                    content: "Staattinen reititys"
                }, {
                    type: "name",
                    title: "Kohteen IP-osoite / Aliverkon peite / Yhdyskäytävä",
                    content: "Näyttää staattisen reitin kohteen IP-osoitteen, aliverkon peitteen ja yhdyskäytävän."
                }, {
                    type: "name",
                    title: "Ota käyttöön",
                    content: "Osoittaa staattisen reitityksen nykyisen tilan. Kytke staattinen reitti päälle (tai pois päältä) napsauttamalla <b>lamppu</b>-kuvaketta."
                }, {
                    type: "name",
                    title: "Muuta",
                    content: "Näyttää vastaavan merkinnän <b>muokkaus</b>- tai <b>poistamis</b>vaihtoehdot."
                }, {
                    type: "note",
                    title: "Staattisen reitityksen perustaminen",
                    content: [
                        "Napsauta <b>Lisää</b>.",
                        "Kirjoita kohteen IP-osoite määrittääksesi tämän merkinnän staattisen reitin.",
                        "Anna aliverkon peite heksadesimaalimuodossa määrittääksesi IP-osoitteen verkko-osan ja isäntäosan.",
                        "Anna yhdyskäytävän IP-osoite, jota käytetään yhdistämään reititin verkkoon tai isäntään.",
                        "Valitse <b>LAN</b> tai WAN-liitäntä määrittääksesi kohteen IP-osoitteen tyypin.",
                        "Valitse <b>Ota tämä merkintä käyttöön</b>.",
                        "Napsauta <b>OK</b>."
                    ]
                }, {
                    type: "title",
                    content: "Järjestelmän reititystaulukko"
                }, {
                    type: "paragraph",
                    content: "Järjestelmän reititystaulukko näyttää kaikki kelvolliset reittimerkinnät, jotka ovat tällä hetkellä käytössä."
                }, {
                    type: "paragraph",
                    content: "Napsauta Päivitä päivittääksesi reititystaulukon."
                }
                
                
                
            ]
        },
        ddns: {
            TITLE: "Dynaamiset DNS-asetukset",
            CONTENT: [{
                type: "paragraph",
                content: "Dynaamisella DNS:llä voit määrittää kiinteän isäntälaitteen ja toimialueen nimen dynaamiselle Internet-IP-osoitteelle. Siitä on hyötyä, kun isännöit omaa sivustoa, FTP-palvelinta tai muuta reitittimen takana sijaitsevaa palvelinta. Ensin sinun on rekisteröidyttävä DDNS-palveluun, kuten www.dyndns.com."
            }, {
                type: "step",
                title: "Dynaamisen DNS:n määrittäminen",
                content: [
                    "Valitse dynaamisen DNS-palveluntarjoaja.",
                    "Enter the Username and Password of the Dynamic DNS account.",
                    "Anna DDNS-palveluntarjoajalta saamasi toimialueen nimi.",
                    "Click Log in and click Save."
                ]
            }, {
                type: "paragraph",
                title: "Note:",
                content: "Jos haluat käyttää uutta DDNS-tiliä, kirjaudu ensin ulos ja kirjaudu sitten sisään uudella tilillä"
            }]
        },
        dhcp: {
            TITLE: "DHCP-palvelin",
            CONTENT: [{
                    type: "paragraph",
                    content: "DHCP (Dynamic Host Configuration Protocol) -palvelin määrittää dynaamisesti TCP/IP-kokoonpanon asiakaslaitteille IP-osoiteryhmästä. Älä poista oletus-DHCP-palvelinta käytöstä ellei sinulla ole toista DHCP-palvelinta tai, jos haluat määrittää manuaalisesti TCP/IP-kokoonpanon verkon yksittäisille asiakkaille."
                }, {
                    type: "name",
                    title: "IP-osoiteryhmä",
                    content: "Syötä IP-osoitteiden alue, joka voidaan vuokrata asiakkaille."
                }, {
                    type: "name",
                    title: "Osoitteen kiinteä aika",
                    content: "Anna kesto, jolloin IP-osoite on vuokrattu asiakkaalle, välillä 1 - 2880 minuuttia."
                }, {
                    type: "name",
                    title: "Oletusyhdyskäytävä",
                    content: "Anna lähiverkon IP-osoite. (Valinnainen)"
                }, {
                    type: "name",
                    title: "DNS-palvelin / toissijainen DNS-palvelin",
                    content: "Anna ISP:n antamat DNS-palvelimen osoitteet. (Valinnainen)"
                }, {
                    type: "title",
                    content: "Asiakasluettelot"
                }, {
                    type: "name",
                    title: "Asiakkaat yhteensä:",
                    content: "Näyttää asiaan kuuluvien DHCP-asiakkaiden kokonaismäärän."
                }, {
                    type: "name",
                    title: "Asiakkaan nimi",
                    content: "Näyttää DHCP-asiakkaan nimen."
                }, {
                    type: "name",
                    title: "MAC-osoite",
                    content: "Näyttää MAC-osoitteen."
                }, {
                    type: "name",
                    title: "Määritetty IP-osoite",
                    content: "Näyttää IP-osoitteen, jonka DHCP-palvelin on varannut asiakkaalle."
                }, {
                    type: "name",
                    title: "Kiinteä aika",
                    content: "Näyttää IP-osoitteen, joka on vuokrattu asiakkaalle, keston."
                }, {
                    type: "name",
                    title: "Päivitä",
                    content: "Päivitä DHCP-asiakasluettelo napsauttamalla."
                }, {
                    type: "title",
                    content: "Osoitevaraus"
                }, {
                    type: "paragraph",
                    content: "Voit manuaalisesti varata IP-osoitteen asiakkaalle, joka on kytketty reitittimeen. Kun IP-osoite on varattu, DHCP-palvelin määrittää sen vain samalle asiakkaalle."
                }, {
                    type: "name",
                    title: "MAC-osoite",
                    content: "Näyttää asiakkaan MAC-osoitteen DHCP-varatulla IP-osoitteella."
                }, {
                    type: "name",
                    title: "Varattu IP-osoite",
                    content: "Näyttää asiakkaan varatun IP-osoitteen."
                }, {
                    type: "name",
                    title: "Kuvaus",
                    content: "Näyttää laitteen kuvauksen."
                }, {
                    type: "name",
                    title: "Ota käyttöön",
                    content: "Ota vastaava merkintä käyttöön tai poista se käytöstä napsauttamalla."
                }, {
                    type: "name",
                    title: "Muuta",
                    content: "Näyttää vastaavan asiakkaan <b>muokkaus</b>- tai <b>poistamis</b>vaihtoehdot."
                }, {
                    type: "note",
                    title: "IP-osoitteen varaaminen DHCP-asiakkaalle",
                    content: [
                        "Napsauta <b>Lisää</b>.",
                        "Anna asiakkaan <b>MAC-osoite</b>.",
                        "Anna IP-osoite, jonka haluat varata asiakkaalle.",
                        "Anna laitteen kuvaus.",
                        "Valitse <b>Ota tämä merkintä käyttöön</b>.",
                        "Napsauta <b>OK</b>."
                    ]
                }, {
                    type: "note",
                    title: "Olemassa olevan asiakkaan muokkaaminen tai poistaminen ",
                    content: [
                        "Napsauta vastaavan merkinnän <b>Muokkaa</b> tai <b>Roskakori-kuvaketta</b>."
                    ]
                }, {
                    type: "title",
                    content: "Ehdollinen ryhmä"
                }, {
                    type: "name",
                    title: "Toimittajan tunnus / IP-alkuosoite  / IP-loppuosoite / Tila",
                    content: "Näyttää Toimittajan tunnuksen, IP-alkuosoitteen,  IP-loppuosoitteen ja Ehdollinen-ryhmän tilan."
                }, {
                    type: "name",
                    title: "Tila",
                    content: "Osoittaa ehdollinen-ryhmän nykyisen tilan. Kytke ehdollinen-ryhmä päälle tai pois päältä napsauttamalla lamppukuvaketta."
                }, {
                    type: "name",
                    title: "Muuta",
                    content: "Näyttää vastaavan asiakkaan <b>muokkaus</b>- tai <b>poistamis</b>vaihtoehdot."
                }, {
                    type: "note",
                    title: "Ehdollinen-ryhmän lisääminen",
                    content: [
                        "Napsauta <b>Lisää</b>.",
                        "Anna LAN-laitteen nimi.",
                        "Anna arvo, jolla tunnistetaan toimittaja ja DHCP-asiakkaan toimivuus.",
                        "Anna IP-alkuosoite, jonka DHCP-palvelin määrittää asiakkaille.",
                        "Anna IP-loppuosoite, jonka DHCP-palvelin määrittää asiakkaille.",
                        "Anna DHCP-palvelimen oletusyhdyskäytävä.",
                        "Valitse laitetyyppi pudotusvalikosta.",
                        "Valitse vaihtoehto pudotusvalikosta.",
                        "Anna asetuksen arvo.",
                        "Valitse <b>Ota tämä merkintä käyttöön</b>.",
                        "Napsauta <b>OK</b>."
                    ]
                }
                
                
            ]
        },
        iptv: {
            TITLE: "IP -asetukset",
            CONTENT: [{
                    type: "name",
                    title: "IPTV",
                    content: "Valitse ottaaksesi IPTV-ominaisuuden käyttöön."
                }, {
                    type: "name",
                    title: "Tila",
                    content: "Valitse sopiva tila ISP:n mukaan. IPTV-tiloja on kuusi:",
                    children: [{
                        type: "name",
                        title: "Silta",
                        content: "Valitse tämä, jos ISP ei ole luettelossa eikä muita parametreja ole ennaltamääritetty.",
                        children: [{
                            type: "name",
                            title: "LAN 1/2/3/4",
                            content: "Määritä LAN-portti toimimaan internet-palveluntarjoajana tai IPTV-toimittajana."
                        }]
                    }, {
                        /*type: "name",
                        title: "Venäjä",
                        content: "Valitse tämä, jos ISP on Venäjältä ja tarvittavat parametrit on määritetty ennalta, kuten Internet/IP-puhelin/IPTV VLAN-tunnukset ja prioriteetti ja LAN (1/2/3/4) portti.",
                        children: [{
                            type: "name",
                            title: "IPTV-monilähetys VLAN-tunnus/prioriteetti",
                            content: "Voit ottaa IPTV-monilähetysominaisuuden käyttöön halutulla tavalla ja määrittää VLAN-tunnuksen ja prioriteetin ISP:n mukaan."
                        }]
                    }, {*/
                        type: "name",
                        title: "Singapore-Singtel",
                        content: "Valitse tämä, jos ISP on Exstream Singaporesta ja tarvittavat parametrit on määritetty ennalta, kuten Internet / IPTV VLAN-tunnukset ja prioriteetti ja LAN (1/2/3/4) portti."
                    }, {
                        type: "name",
                        title: "Malesia-Unifi",
                        content: "Valitse tämä, jos ISP on Unifi Malesiasta ja tarvittavat parametrit on määritetty ennalta, kuten Internet / IPTV VLAN-tunnukset ja prioriteetti ja LAN (1/2/3/4) portti."
                    }, {
                        type: "name",
                        title: "Malaysia-Maxis",
                        content: "Valitse tämä, jos ISP on Maxis Malesiasta ja tarvittavat parametrit on määritetty ennalta, kuten Internet/IP-puhelin/IPTV VLAN-tunnukset ja prioriteetti ja LAN (1/2/3/4) portti."
                    }, {
                        type: "name",
                        title: "Käytäntö",
                        content: "Valitse tämä, jos ISP ei ole luettelossa, mutta tarjoaa tarvittavat parametrit, kuten Internet/IP-puhelin/IPTV VLAN-tunnukset ja prioriteetti ja LAN (1/2/3/4) portti.",
                        children: [{
                            type: "name",
                            title: "Internet / IP-puhelin / IPTV VLAN-tunnus / Prioriteetti",
                            content: "Määritä ISP:n tarjoamat VLAN-tunnukset."
                        }, {
                            type: "name",
                            title: "802.11Q Tag",
                            content: "Valitse merkitäänkö Internet-paktit 802.11Q:lla."
                        }, {
                            type: "name",
                            title: "LAN 1/2/3/4",
                            content: "Määritä LAN-portti toimimaan internet-palveluntarjoajana tai IPTV-toimittajana."
                        }, {
                            type: "name",
                            title: "IPTV-monilähetys VLAN-tunnus/prioriteetti",
                            content: "Voit ottaa IPTV-monilähetysominaisuuden käyttöön halutulla tavalla ja määrittää VLAN-tunnuksen ja prioriteetin ISP:n mukaan."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "IGMP-välityspalvelin",
                    content: "Valitse IGMP (Internet Group Management Protocol) välityspalvelinversio, joko V2 tai V3, ISP:n mukaan."
                }
                
                
                
            ]
        },
        usbManage: {
            TITLE: "USB-tallennuslaite",
            CONTENT: [{
                    type: "paragraph",
                    content: "<b>USB-tallennuslaite</b> näyttö näyttää perustiedot USB-tallennuslaitteesta, joka on liitetty USB-portin kautta."
                }, {
                    type: "name",
                    title: "Skannaa",
                    content: "Yleensä reititin automaattisesti havaitsee hiljattain liitetyt laitteet. Jos ei, napsauta tätä painiketta skannataksesi ja päivittääksesi näytön päivitetyillä tiedoilla."
                }, {
                    type: "name",
                    title: "Aseman nimi",
                    content: "Näyttää USB-aseman nimen."
                }, {
                    type: "name",
                    title: "Kapasiteetti",
                    content: "Näyttää USB-levyn kokonaistallenuskapasiteetin."
                }, {
                    type: "name",
                    title: "Vapaa tila",
                    content: "Näyttää nykyisen käytettävissä olevan vapaan tallennustilan."
                }, {
                    type: "name",
                    title: "Aktivoi",
                    content: "Tämä valintaruutu näkyy vain, kun USB-tallennuslaite on liitetty reitittimeen. Valitse ottaaksesi käyttöön tiedostonjakamisen USB-laitteella."
                }, {
                    type: "name",
                    title: "Turvallinen poistaminen",
                    content: "Napsauta tätä painiketta poistaaksesi turvallisesti USB-tallennuslaitteen ennen sen irrottamista fyysisesti reitittimestä. Huomaa, että Turvallinen poistaminen -painike näkyy ainoastaan, kun USB-tallennuslaite on liitetty reitittimeen. Pidä myös mielessä, että et voi irrottaa USB-laitetta, kun se on käytössä."
                }, {
                    type: "title",
                    content: "Jakamisasetukset"
                }, {
                    type: "name",
                    title: "Verkon media / palvelimen nimi",
                    content: "Näyttää nimen, jolla käytetään liitettyä USB-tallennuslaitetta."
                }, {
                    type: "title",
                    content: "Kansion jakaminen"
                }, {
                    type: "name",
                    title: "Jaa kaikki",
                    content: "Vaihda Päälle jakaaksesi kaikki tiedostot ja kansiot tai Pois päältä jakaaksesi vain valitut kansiot."
                }, {
                    type: "name",
                    title: "Ota todennus käyttöön",
                    content: "Vaihda päälle ottaaksesi käyttöön todennuksen, joka vaatii käyttäjiä antamaan kelvollisen käyttäjänimen ja salasanan käyttääkseen kaikkia jaettuja kansioita."
                }, {
                    type: "name",
                    title: "Kansion nimi",
                    content: "Näyttää jaetun kansion nimen. "
                }, {
                    type: "name",
                    title: "Kansion polku",
                    content: "Näyttää jaetun kansion polun. "
                }, {
                    type: "name",
                    title: "Aseman nimi",
                    content: "Näyttää jaetun aseman nimen."
                }
                
                
            ]
        },
        printSrv: {
            TITLE: "Tulostuspalvelin",
            CONTENT: [{
                type: "name",
                title: "Ota tulostuspalvelin käyttöön",
                content: "Vaihda päälle ottaaksesi käyttöön tulostuspalvelimen toiminnon."
            }, {
                type: "name",
                title: "Tulostimen nimi",
                content: "Näyttää reitittimeen kytketyn tulostimen nimen."
            }]
        },
        diskSettings: {
            TITLE: "USB-tallennuslaite",
            CONTENT: [{
                    type: "paragraph",
                    content: "<b>USB-tallennuslaite</b> näyttö näyttää perustiedot USB-tallennuslaitteesta, joka on liitetty USB-portin kautta."
                }, {
                    type: "name",
                    title: "Skannaa",
                    content: "Yleensä reititin automaattisesti havaitsee hiljattain liitetyt laitteet. Jos ei, napsauta tätä painiketta skannataksesi ja päivittääksesi näytön päivitetyillä tiedoilla."
                }, {
                    type: "name",
                    title: "Aseman nimi",
                    content: "Näyttää USB-aseman nimen."
                }, {
                    type: "name",
                    title: "Kapasiteetti",
                    content: "Näyttää USB-levyn kokonaistallenuskapasiteetin."
                }, {
                    type: "name",
                    title: "Vapaa tila",
                    content: "Näyttää nykyisen käytettävissä olevan vapaan tallennustilan."
                }, {
                    type: "name",
                    title: "Aktivoi",
                    content: "Tämä valintaruutu näkyy vain, kun USB-tallennuslaite on liitetty reitittimeen. Valitse ottaaksesi käyttöön tiedostonjakamisen USB-laitteella."
                }, {
                    type: "name",
                    title: "Turvallinen poistaminen",
                    content: "Napsauta tätä painiketta poistaaksesi turvallisesti USB-tallennuslaitteen ennen sen irrottamista fyysisesti reitittimestä. Huomaa, että Turvallinen poistaminen -painike näkyy ainoastaan, kun USB-tallennuslaite on liitetty reitittimeen. Pidä myös mielessä, että et voi irrottaa USB-laitetta, kun nykyinen asema on varattu."
                }, {
                    type: "note",
                    title: "Tiedostopalvelimen asettaminen",
                    content: [
                        "Liitä USB-tallennuslaite reitittimen USB-porttiin USB-kaapelilla.",
                        "Reitittimen pitäisi automaattisesti havaita vasta liitetty USB-laite ja näyttää tiedot <b>Laitteen asetukset</b> -osassa. Jos ei, napsauta <b>Skannaa</b>.",
                        "Ota tiedoston jakaminen käyttöön napsauttamalla <b>Aktivoi</b>-kuvaketta."
                    ]
                }
                
                
                
            ]
        },
        folderSharing: {
            TITLE: "Jakamistili",
            CONTENT: [{
                    type: "name",
                    title: "Tili",
                    content: "Voit joko valita <b>Käytä oletustiliä</b> kirjautua jaettuihin tiedostoihin ja kansioihin tai <b>Käyttää uutta tiliä</b> ja syöttää seuraavat tiedot luodaksesi uuden käyttäjätilin."
                }, {
                    type: "name",
                    title: "Käyttäjänimi / Salasana",
                    content: "Anna enintään 15 merkkiä, jotka sisältävät kirjaimia, numeroita ja / tai alleviivattuja merkkijonoja. Käyttäjänimen pitää alkaa aakkosmerkillä. Nämä kentät ovat isot ja pienet kirjaimet erottelevia. "
                }, {
                    type: "paragraph",
                    content: "Valitse <b>Tallenna</b> tallentaaksesi tilin asetukset."
                }, {
                    type: "title",
                    content: "Jakamisasetukset"
                }, {
                    type: "name",
                    title: "Verkko / Mediapalvelimen nimi",
                    content: "Näyttää nimen, jolla käytetään liitettyä USB-tallennuslaitetta."
                }, {
                    type: "name",
                    title: "Ota käyttöön",
                    content: "Valitse valintaruudut ottaaksesi käyttöön vastaavat käyttötavat."
                }, {
                    type: "name",
                    title: "Käyttötapa",
                    content: "Jaettua USB-tallennuslaitetta voidaan käyttää neljällä tavalla.",
                    children: [{
                        type: "name",
                        title: "Mediapalvelin",
                        content: "Valitse tämä vaihtoehto salliaksesi verkon käyttäjien katsella valokuvia, kuunnella musiikkia ja katsella elokuvia jaetulla USB-tallennuslaitteella DLNA-tuetuista laitteista kuten tietokoneista, mobiililaitteista ja pelikonsoleista (PS2/3)."
                    }, {
                        type: "name",
                        title: "Verkkoympäristö",
                        content: "Valitse tämä vaihtoehto salliaksesi verkkosi käyttäjät käyttää jaettua sisältöä Osoite-sarakkeessa olevan osoitteen kautta."
                    }, {
                        type: "name",
                        title: "FTP",
                        content: "Valitse tämä vaihtoehto ottaaksesi käyttöön FTP-palvelimen ominaisuuden, jonka avulla FTP-asiakkaat ja verkon käyttäjät voivat käyttää USB-tallennuslaitetta Osoite-sarakkeesssa olevan FTP-osoitteen kautta. Voit muuttaa FTP-palvelimen portin antamalla uuden portin numeron ja ottaa muutokset käyttöön napsauttamalla <b>Tallenna</b>."
                    }, {
		    	display: "$.routerMode == 'Router'",
                        type: "name",
                        title: "FTP (Internetin kautta)",
                        content: "Valitse tämä vaihtoehto, salliaksesi FTP-asiakkaat ja käyttäjät etäkäyttää, ladata verkosta ja ladata verkkoon tiedostoja jaettuun USB-tallennuslaitteeseen FTP:n kautta internetissä."
                    }]
                }, {
                    type: "name",
                    title: "Pääsy",
                    content: "Näyttää osoitteen, jolla käytetään jaettua USB-tallennuslaitetta."
                }, {
                    type: "name",
                    title: "Portti",
                    content: "Näyttää FTP-palvelimen portin numeron."
                }, {
                    type: "title",
                    content: "Kansion jakaminen"
                }, {
                    type: "name",
                    title: "Jaa kaikki",
                    content: "Vaihda Päälle jakaaksesi kaikki tiedostot ja kansiot tai Pois päältä jakaaksesi vain valitut kansiot."
                }, {
                    type: "name",
                    title: "Ota todennus käyttöön",
                    content: "Vaihda päälle ottaaksesi käyttöön todennuksen, joka vaatii käyttäjiä antamaan kelvollisen käyttäjänimen ja salasanan käyttääkseen kaikkia jaettuja kansioita."
                }, {
                    type: "name",
                    title: "Kansion nimi",
                    content: "Näyttää jaetun kansion nimen. "
                }, {
                    type: "name",
                    title: "Kansion polku",
                    content: "Näyttää jaetun kansion polun. "
                }, {
                    type: "name",
                    title: "Median jakaminen",
                    content: "Näyttää onko median jakaminen käytössä (On) tai pois käytöstä (Off)."
                }, {
                    type: "name",
                    title: "Aseman nimi",
                    content: "Näyttää jaetun aseman nimen."
                }, {
                    type: "name",
                    title: "Tila",
                    content: "Osoittaa jaetun kansion nykyisen tilan. Ota kansion jakaminen käyttöön tai poista se käytöstä napsauttamalla lamppukuvaketta."
                }, {
                    type: "name",
                    title: "Muuta",
                    content: "Näyttää jaetun kansion <b>muokkaus</b>- tai <b>poistamis</b>vaihtoehdot."
                }, {
                    type: "note",
                    title: "Kansion jakamismerkinnän lisääminen:",
                    content: [
                        "Vaihda Pois päältä <b>Valitse kaikki.</b>",
                        "Napsauta <b>Lisää</b>.",
                        "Valitse <b>Aseman nimi</b> ja <b>Kansion polku.</b>",
                        "Luo kansion nimi.",
                        "Päätä miten jaat kansion: <br /><b>Ota todentaminen käyttöön</b> - Valitse vaatiaksesi käyttäjiä todentamaan kelvollisella käyttäjänimellä ja salasanalla käyttämään jaettuja kansioita.<br /><b>Ota kirjoitusoikeudet käyttöön</b> - Valitse salliaksesi käyttäjät tekemään muutoksia kansion sisältöön.<br /> <b>Ota median jakaminen käyttöön</b> - Valitse ottaaksesi median jakamisen käyttöön.<br />"
                    ]
                }
                
                
                
                
                
            ]
        },
        ipsec: {
            TITLE: "IPSec-asetukset",
            CONTENT: [{
                    type: "name",
                    title: "Dead Peer Detection",
                    content: "Dead Peer Detection (DPD) -menetelmällä havaitaan toimimaton Internet-avainten vaihto (IKE) -vertaissolmu. DPD:tä käytetään vapauttamaan menetettyjä resursseja, kun vertaissolmu on  toimimaton, ja sillä suoritetaan myös IKE-vertaissolmun vikasietoisuus. Vaihda päälle ottaaksesi Dead Peer Detection -ominaisuuden käyttöön."
                }, {
                    type: "name",
                    title: "Yhteyden nimi / etäyhdyskäytävä / Paikallinen osoite / Etäosoite",
                    content: "Näyttää Yhteyden nimen, Etäyhdyskäytävän, Paikallisen osoitteen ja IPSec-merkinnän etäosoitteen."
                }, {
                    type: "name",
                    title: "Tila",
                    content: "Näyttää IPSec-merkinnän tilan. Tila sisältää:",
                    children: [{
                        type: "name",
                        title: "Poistettu käytöstä",
                        content: "Merkintä on poistettu käytöstä."
                    }, {
                        type: "name",
                        title: "Ei toiminnassa",
                        content: "Merkintä on käytössä, mutta yhteyttä ei ole."
                    }, {
                        type: "name",
                        title: "Toiminnassa",
                        content: "Merkintä on käytössä ja yhteys on muodostettu onnistuneesti. "
                    }]
                }, {
                    type: "name",
                    title: "Ota käyttöön",
                    content: "Kytke merkintä päälle tai pois päältä napsauttamalla <b>lamppu</b>-kuvaketta."
                }, {
                    type: "name",
                    title: "Muuta",
                    content: "Näyttää vastaavan merkinnän <b>muokkaus</b>- tai <b>poistamis</b>vaihtoehdot."
                }, {
                    type: "name",
                    title: "Lisää",
                    content: "Napsauta lisätäksesi uuden IPSec VPN -yhteyden."
                }, {
                    type: "name",
                    title: "IPSec-yhteyden nimi",
                    content: "Nimeä IPSec VPN-yhteys."
                }, {
                    type: "name",
                    title: "Etä-IPSec-yhdyskäytävän osoite (URL)",
                    content: "Anna kohteen yhdyskäytävän IP-osoite, joka on julkinen WAN IP tai etä-VPN-palvelimen päätepisteen toimialuenimi."
                }, {
                    type: "name",
                    title: "Tunnelin käyttö paikallisista IP-osoitteista",
                    content: "Valitse Aliverkon osoite, jos haluat koko lähiverkon liittyvän VPN-verkkoon, tai valitse Yksittäinen osoite, jos haluat yhden IP:n liittyvän VPN-verkkoon."
                }, {
                    type: "name",
                    title: "IP-osoite VPN:ää varten",
                    content: "Anna LANin IP-osoite. "
                }, {
                    type: "name",
                    title: "IP Aliverkon peite",
                    content: "Anna LANin aliverkon peite."
                }, {
                    type: "name",
                    title: "Tunnelin käyttö etä-IP-osoitteista",
                    content: "Valitse Aliverkon osoite, jos haluat koko etä-LANin liittyvän VPN-verkkoon, tai valitse Yksittäinen osoite, jos haluat yhden IP:n liittyvän VPN-verkkoon."
                }, {
                    type: "name",
                    title: "IP-osoite VPN:ää varten",
                    content: "Anna etä-LANin IP-osoite. "
                }, {
                    type: "name",
                    title: "IP Aliverkon peite",
                    content: "Anna etä-LANin aliverkon peite."
                }, {
                    type: "name",
                    title: "Avainten vaihto -menetelmä",
                    content: "Valitse Auto (IKE) tai Manuaalinen, joita käytetään IPSec-vertaissolmujen  todentamiseen."
                }, {
                    type: "name",
                    title: "Todennusmenetelmä",
                    content: "Valitse esijaettu avain (todennus)."
                }, {
                    type: "name",
                    title: "Esijaettu avain",
                    content: "Luo esijaettu avain, jota käytetään todentamiseen."
                }, {
                    type: "name",
                    title: "Perfect Forward Secrecy",
                    content: "Valitse Ota käyttöön (tai Poista käytöstä) Perfect Forward Secrecy (PFS) ylimääräiseksi suojausprotokollaksi esijaettua avainta varten."
                }, {
                    type: "name",
                    title: "Lisäasetukset",
                    content: "Napsauta määrittääksesi lisäasetukset. Suosittelemme säilyttämään oletusasetukset. Jos haluat muuttaa näitä asetuksia, varmista, että molemmat VPN-palvelimen päätepisteet käyttävät samaa salausalgoritmi, eheysalgoritmia, Diffie-Hellman-ryhmää ja avaimen elinaikaa sekä vaiheessa 1 että vaiheessa 2.",
                    children: [{
                        type: "title2",
                        content: "Vaihe 1"
                    }, {
                        type: "name",
                        title: "Tila",
                        content: "Valitse <b>Ensisijainen</b> määrittääksesi tavalliset neuvotteluparametrit IKE-vaiheelle 1. Valitse <b>Aggressiivinen</b> määrittääksesi VPN-tunnelin IKE-vaiheen 1 suorittamaan neuvottelun lyhyemmässä ajassa. (Ei suositella, koska se on vähemmän turvallinen.)"
                    }, {
                        type: "name",
                        title: "Paikallinen tunnustyyppi",
                        content: "Valitse paikallinen tunnustyyppi IKE-neuvottelulle. Paikallinen WAN IP käyttää IP-osoitetta tunnisteena IKE-neuvotteluissa. FQDN (Fully Qualified Domain Name) käyttää käyttäjänimeä tunnisteena."
                    }, {
                        type: "name",
                        title: "Paikallinen tunniste",
                        content: "Paikallinen tunniste täytetään automaattisesti, jos <b>Paikallinen WAN IP</b> on valittuna. Jos <b>FQDN</b> on valittu, anna paikallisen laitteen käyttäjänimi käytettäväksi IKE-neuvottelun tunnisteena."
                    }, {
                        type: "name",
                        title: "Paikallinen tunnistetyyppi",
                        content: "Valitse etä-tunnistetyyppi IKE-neuvottelulle. Etä-WAN IP käyttää IP-osoitetta tunnisteena IKE-neuvotteluissa. FQDN käyttää käyttäjänimeä tunnisteena."
                    }, {
                        type: "name",
                        title: "Etätunnistetyyppi",
                        content: "Etäyhdyskäytävän IP-osoite täytetään automaattisesti, jos <b>Etä-WAN IP</b> on valittuna. Jos <b>FQDN</b> on valittu, anna etälaitteen käyttäjänimi käytettäväksi IKE-neuvottelun tunnisteena."
                    }, {
                        type: "name",
                        title: "Salausalgoritmi",
                        content: "Valitse yksi seuraavista salausalgoritmeista IKE-neuvottelulle.",
                        children: [{
                            type: "name",
                            title: "DES",
                            content: "DES (Data Encryption Standard) salaa 64-bittisen tekstialueen 56-bittisellä avaimella."
                        }, {
                            type: "name",
                            title: "3DES",
                            content: "Triple DES, salaa tekstialueen 168-bittisellä avaimella."
                        }, {
                            type: "name",
                            title: "AES128",
                            content: "Käyttää AES-algoritmia ja 128-bittistä salausavainta."
                        }, {
                            type: "name",
                            title: "AES192",
                            content: "Käyttää AES-algoritmia ja 192-bittistä salausavainta."
                        }, {
                            type: "name",
                            title: "AES256",
                            content: "Käyttää AES-algoritmia ja 256-bittistä salausavainta."
                        }]
                    }, {
                        type: "name",
                        title: "Eheysalgoritmi",
                        content: "Valitse jokin seuraavista eheysalgoritmista IKE-neuvottelua varten.",
                        children: [{
                            type: "name",
                            title: "MD5",
                            content: "MD5 (Message Digest Algorithm) ottaa satunnaispituisen viestin ja tuottaa 128-bittisen hajautuskoodin."
                        }, {
                            type: "name",
                            title: "SHA1",
                            content: "SHA1 (Secure Hash Algorithm) ottaa alle 2^64 (kaksi 64:n teholle) bittisen viestin ja tuottaa 160-bittisen hajautuskoodin."
                        }]
                    }, {
                        type: "name",
                        title: "Diffie-Hellman-ryhmä avainten vaihdolle",
                        content: "Valitse Diffie-Hellman ryhmä, jota käytetään avaimen neuvotteluvaiheessa 1. Diffie-Hellman-ryhmä asettaa algoritmin vahvuuden bitteinä."
                    }, {
                        type: "name",
                        title: "Avaimen elinaika",
                        content: "Anna aika (sekunneissa), jonka kuluttua laaditaan uusi IPSec-suojaussidos (SA) etäpäätepisteellä. Oletusarvo on 3600."
                    }, {
                        type: "title2",
                        content: "Vaihe 2"
                    }, {
                        type: "name",
                        title: "Salausalgoritmi",
                        content: "Valitse yksi seuraavista salausalgoritmeista IKE-neuvottelulle.",
                        children: [{
                            type: "name",
                            title: "DES",
                            content: "DES (Data Encryption Standard) salaa 64-bittisen tekstialueen 56-bittisellä avaimella."
                        }, {
                            type: "name",
                            title: "3DES",
                            content: "Triple DES, salaa tekstialueen 168-bittisellä avaimella."
                        }, {
                            type: "name",
                            title: "AES128",
                            content: "Käyttää AES-algoritmia ja 128-bittistä salausavainta."
                        }, {
                            type: "name",
                            title: "AES192",
                            content: "Käyttää AES-algoritmia ja 192-bittistä salausavainta."
                        }, {
                            type: "name",
                            title: "AES256",
                            content: "Käyttää AES-algoritmia ja 256-bittistä salausavainta."
                        }]
                    }, {
                        type: "name",
                        title: "Eheysalgoritmi",
                        content: "Valitse jokin seuraavista eheysalgoritmista IKE-neuvottelua varten.",
                        children: [{
                            type: "name",
                            title: "MD5",
                            content: "MD5 (Message Digest Algorithm) ottaa satunnaispituisen viestin ja tuottaa 128-bittisen hajautuskoodin."
                        }, {
                            type: "name",
                            title: "SHA1",
                            content: "SHA1 (Secure Hash Algorithm) ottaa alle 2^64 (kaksi 64:n teholle) bittisen viestin ja tuottaa 160-bittisen hajautuskoodin."
                        }]
                    }, {
                        type: "name",
                        title: "Diffie-Hellman-ryhmä avainten vaihdolle",
                        content: "Valitse Diffie-Hellman ryhmä, jota käytetään avaimen neuvotteluvaiheessa 2. Diffie-Hellman-ryhmä asettaa algoritmin vahvuuden bitteinä."
                    }, {
                        type: "name",
                        title: "Avaimen elinaika",
                        content: "Anna aika (sekunneissa), jonka kuluttua laaditaan uusi IPSec-suojaussidos (SA) etäpäätepisteellä. Oletusarvo on 3600."
                    }]
                }
                
                
                
                
                
                
                
                
                
                
                
                
            ]
        },
        wanBasic: {
            TITLE: "Internet-yhteyden asetus",
            CONTENT: [{
                type: "name",
                title: "Automaattinen tunnistus",
                content: "Napsauta tätä painiketta, kun haluat reitittimen tunnistavan automaattisesti nykyisen Internet-yhteyden tyypin."
            }, {
                type: "paragraph",
                title: "Huomautus",
                content: "Jos et ole varma Internet-yhteytesi tyypistä, käytä Automaattista tunnistusta tai ota yhteyttä Internet-palveluntarjoajaan (ISP) apua varten."
            }, {
                type: "title",
                title: "Internet-yhteyden tyyppi: Staattinen IP"
            }, {
                type: "name",
                title: "IP-osoite / Aliverkon peite / Oletusyhdyskäytävä / Ensisijainen DNS / Toissijainen DNS",
                content: "Anna ISP:n antamat tiedot."
            }, {
                type: "title",
                title: "Internet-yhteyden tyyppi: Dynaaminen IP"
            }, {
                type: "name",
                title: "ÄLÄ kloonaa MAC-osoitetta / kloonaa nykyinen tietokoneen MAC-osoite",
                content: "Valitse kloonataanko MAC-osoite, ISP:n mukaan."
            }, {
                type: "title",
                title: "Internet-yhteyden tyyppi: PPPoE"
            }, {
                type: "name",
                title: "Käyttäjänimi / Salasana",
                content: "Anna ISP:n antama käyttäjätunnus ja salasana. Nämä kentät ovat isot ja pienet kirjaimet erottelevia."
            }, {
                type: "title",
                title: "Internet-yhteyden tyyppi: L2TP/PPTP"
            }, {
                type: "name",
                title: "Käyttäjänimi / Salasana",
                content: "Anna ISP:n antama käyttäjätunnus ja salasana. Nämä kentät ovat isot ja pienet kirjaimet erottelevia."
            }, {
                type: "name",
                title: "Toissijainen liitäntä (Dynamic IP tai staattinen IP)",
                children: [{
                    type: "name",
                    title: "Dynaaminen IP",
                    content: "Valitse tämä, jos ISP on määrittänyt automaattisesti IP-osoitteen ja aliverkon peitteen."
                }, {
                    type: "name",
                    title: "Staattinen IP",
                    content: " Valitse tämä, jos ISP on antanut IP-osoitteen, aliverkon peitteen, yhdyskäytävän ja DNS-osoitteet, ja syötä nämä tiedot vastaaviin kenttiin."
                }]
            }, {
                type: "name",
                title: "VPN-palvelin IP / toimialuenimi",
                content: "Anna ISP:n antama VPN-palvelimen IP-osoite tai toimialueen nimi."
            }]
        },
        PRINT_SERVER: {
            TITLE: "Tulostuspalvelin",
            CONTENT: [{
                    type: "paragraph",
                    content: "Voit määrittää tulostuspalvelimen tällä sivulla."
                }, {
                    type: "name",
                    title: "Tulostuspalvelin",
                    content: "Osoittaa tulostuspalvelimen nykyisen päällä / pois -tilan."
                }, {
                    type: "name",
                    title: "Tulostimen nimi",
                    content: "Reitittimeen kytketyn tulostimen nimi."
                }, {
                    type: "note",
                    title: "Seuraa ohjeita asettaaksesi tulostuspalvelimen:",
                    content: [
                        "Vaihe 1: Liitä USB-tulostin reitittimen USB-porttiin USB-tulostinkaapelilla.",
                        "Vaihe 2:  Asenna tulostinohjain tietokoneeseen.",
                        "Vaihe3:  Asenna TP-LINK USB -tulostinohjain tietokoneeseen. Suorita resurssi CD tai lataa TP-LINK USB Printer Controller -apuohjelma nettisivuiltamme: www.tp-link.com."
                    ]
                }
                
                
            ]
        },
        sysconf: {
            TITLE: "Langattoman yhteyden lisäasetukset 2,4GHz | 5 GHz",
            CONTENT: [{
                type: "name",
                title: "Jäljiteaikaväli",
                content: "Anna arvo väliltä 25 ja 1 000 millisekuntia määrittääksesi kuinka kauan paketit lähetetään reitittimellä langattoman verkon synkronoimiseksi. Oletusarvo on 100 millisekuntia."
            }, {
                type: "name",
                title: "RTS-raja-arvo",
                content: "Anna arvo väliltä 1 ja 2346 tavua määrittääksesi reitittimen kautta lähetettävien tietojen pakettikoon. Oletuksena RTS:n (lähetyspyyntö) raja-arvokoko on 2346. Jos paketin koko on suurempi kuin ennalta asetettu raja-arvo, reititin lähettää lähetyspyynnön tietylle vastaanottoasemalle ja neuvottelee datakehyksen lähettämisen, tai muussa tapauksessa paketti lähetetään välittömästi."
            }, {
                type: "name",
                title: "DTIM-väliarvo",
                content: "Anna arvo väliltä 1 ja 255 määrittääksesi DTIM:n (Delivery Traffic Indication Message) aikavälin. 1 osoittaa, että DTIM-aikaväli on sama kuin jäljiteaikaväli."
            }, {
                type: "name",
                title: "Ryhmäavaimen päivitysjakso",
                content: "Syötä aika sekunteina (vähintään 30), jolla ohjataan salausavaimen automaattisen uusiminen aikaväliä. Oletusarvo on 0, joka osoittaa että avainta ei uusita."
            }, {
                type: "name",
                title: "WMM-ominaisuus",
                content: "WMM (Wi-Fi multimedian) -toiminto takaa, että paketit, joissa on korkean prioriteetin viestejä, lähetetään ensisijaisesti. Se on erittäin suositeltavaa ja on oletusarvoisesti käytössä."
            }, {
                type: "name",
                title: "Lyhyt GI-ominaisuus",
                content: "Tämä toiminto lisää datakapasiteettia vähentämällä vartiointiväli (GI) -aikaa. Se on suositeltavaa ja on oletusarvoisesti käytössä."
            }, {
                type: "name",
                title: "AP-eristämisominaisuus",
                content: "Valitse tämä valintaruutu, ottaaksesi käyttöön AP-eristämisominaisuuden, jonka avulla voit rajata ja rajoittaa kaikkia verkossa olevia langattomia laitteita olemassa vuorovaikutuksessa keskenään, mutta silti käyttää Internetiä. AP-eristäminen on oletusarvoisesti pois käytöstä."
            }, {
        		display: INCLUDE_AIRTIME_FAIRNESS,
				"type": "name",
                "title": "Airtime Fairness -ominaisuus",
                "content": "Valitse tämä valintaruutu ottaaksesi käyttöön Airtime Fairness (ATF) -ominaisuuden, jolla voit optimoida kunkin virtauksen välityskyvyn. ATF-liikenteen ajastin hyödyntää määränpääkohtaisia lähetysaikatavoitteita tasapainottaakseen lähetysajan käytön virtausmääränpäiden välillä."
			},  {
				display: INCLUDE_MU_MIMO,
				"type": "name",
                "title": "Monikäyttäjän MIMO-ominaisuus",
                "content": "Napsauta ottaaksesi monikäyttäjän MIMO-ominaisuuden käyttöön."
			},  {
				"type": "name",
				"title": "USB 3.0 -häiriönvaimennus",
				"content": "Napsauta vähentääksesi USB 3.0 -häiriöitä."
			}, {
                type: "title",
                title: "WPS"
            }, {
                type: "name",
                title: "Ota WPS käyttöön",
                content: "Vaihda päälle ottaaksesi WPS-ominaisuuden käyttöön."
            }, {
                type: "paragraph",
                content: "Tallenna asetukset napsauttamalla Tallenna."
            }, {
                type: "title",
                title: "LED"
            }, {
                type: "name",
                title: "Yötila",
                content: "Kun tämä toiminto on käytössä, reitittimen merkkivalot sammuvat automaattisesti tietyn ajan aikana."
            }, {
                type: "name",
                title: "Ajanjakso",
                content: "Anna ajanjakso, jonka aikana reitittimen merkkivalot sammuvat."
            }, {
                type: "paragraph",
                content: "Tallenna asetukset napsauttamalla Tallenna."
            }, {
				display: "$.routerMode == 'Router'",
                type: "title",
                title: "DoS-suojausasetukset"
            }, {
				display: "$.routerMode == 'Router'",
                type: "paragraph",
                content: "DoS-suojaustaso suojaa reitittimen TCP-SYN-Flood-, UDP-Flood- ja ICMP-Flood-hyökkäyksiltä."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "ICMP-FLOOD -pakettien taso",
                content: "Anna arvo väliltä 5 ja 3600 käynnistääksesi ICMP-FLOOD-suojauksen heti kun ICMP-pakettien määrä ylittää ennalta asetetun raja-arvon."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "UDP-FLOOD -pakettien taso",
                content: "Anna arvo väliltä 5 ja 3600 käynnistääksesi UDP-FLOOD-suojauksen heti kun UDP-pakettien määrä ylittää ennalta asetetun raja-arvon."
            }, {
				display: "$.routerMode == 'Router'",
                type: "name",
                title: "TCP-FLOOD-pakettien taso",
                content: "Anna arvo väliltä 5 ja 3600 käynnistääksesi TCP-SYN-FLOOD-suojauksen heti kun TCP-SYN-pakettien määrä ylittää ennalta asetetun raja-arvon."
            }, {
				display: "$.routerMode == 'Router'",
                type: "paragraph",
                content: "Tallenna asetukset napsauttamalla Tallenna."
            }]
        },
        logConf: {
            TITLE: "Lokiasetukset",
            CONTENT: [{
                    type: "name",
                    title: "Tallenna paikallisesti",
                    content: "Valitse tallentaaksesi lokit paikalliseen muistiin.",
                    children: [{
                        type: "name",
                        title: "Vähimmäistaso",
                        content: "Valitse vähimmäistaso avattavasta luettelosta, ja sitten kaikki rekisteröidyt tapahtumat, jotka ovat suurempia tai yhtä suuria kuin valittu taso, tallennetaan."
                    }]
                }, {
                    type: "name",
                    title: "Etätallennus",
                    content: "Valitse lähettääksesi lokit määritettyyn IP-osoitteeseen ja etäjärjestelmän lokipalvelimen UDP-porttiin.",
                    children: [{
                        type: "name",
                        title: "Vähimmäistaso",
                        content: "Valitse vähimmäistaso avattavasta luettelosta, ja sitten kaikki rekisteröidyt tapahtumat, jotka ovat suurempia tai yhtä suuria kuin valittu taso, tallennetaan."
                    }, {
                        type: "name",
                        title: "Palvelimen IP",
                        content: "Määritä etäjärjestelmän lokipalvelimen IP-osoite, johon tapahtumat lähetetään."
                    }, {
                        type: "name",
                        title: "Palvelimen portti",
                        content: "Määritä etäjärjestelmän lokipalvelimen portin numero, johon tapahtumat lähetetään."
                    }, {
                        type: "name",
                        title: "Paikallisen tilan nimi",
                        content: "Valitse paikallisen tilan nimi etäpalvelimen tilan mukaan."
                    }]
                }
                
                
                
            ]
        },
        GUSET_NETWORK_WIRELESS: {
            TITLE: "Langaton",
            CONTENT: [{
                type: "name",
                title: "Suojaus",
                content: "Voit valita yhden seuraavista suojausasetuksista. ",
                children: [{
                    type: "name",
                    title: "Ei suojausta",
                    content: "Langattomat asemat muodostavat yhteyden reitittimeen ilman salausta. On erittäin suositeltavaa valita yksi seuraavista tiloista suojauksen ottamiseksi käyttöön."
                }, {
                    type: "name",
                    title: "WPA / WPA2 Henkilökohtainen",
                    content: "Valitse WPA perustuen esijaettuun tunnuslauseeseen.",
                    children: [{
                        type: "name",
                        title: "Versio",
                        content: "Voit valita jonkin seuraavista versioista",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Valitse WPA-PSK tai WPA2-PSK automaattisesti perustuen langattoman aseman valmiuteen ja pyyntöön."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "Esijaettu WPA2-avain."
                        }]
                    }, {
                        type: "name",
                        title: "Salaus",
                        content: "Voit valita joko Auto, TKIP tai AES."
                    }, {
                        type: "name",
                        title: "Langattoman verkon salasana",
                        content: "Voit syöttää ASCII-merkkejä tai heksadesimaalimerkkejä. Heksadesimaaliluvussa, pituuden tulee olla 8 - 64 merkkiä; ASCII-merkkien pituuden tulee olla välillä 8 - 63 merkkiä."
                    }]
                }, {
                    type: "name",
                    title: "WPA / WPA2 Yritys",
                    content: "Valitse WPA perustuen Radius-palvelimeen.",
                    children: [{
                        type: "name",
                        title: "Versio",
                        content: "Voit valita jonkin seuraavista versioista",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Valitse WPA tai WPA2 automaattisesti perustuen langattoman aseman valmiuteen ja pyyntöön."
                        }, {
                            type: "name",
                            title: "WPA",
                            content: "Wi-Fi-suojaus. "
                        }, {
                            type: "name",
                            title: "WPA2",
                            content: "WPA-versio 2. "
                        }]
                    }, {
                        type: "name",
                        title: "Salaus",
                        content: "Voit valita joko Auto, TKIP tai AES."
                    }, {
                        type: "name",
                        title: "RADIUS-palvelimen IP",
                        content: "Anna Radius-palvelimen IP-osoite."
                    }, {
                        type: "name",
                        title: "Radius-portti",
                        content: "Anna portti, jota radius-palvelin käyttää."
                    }, {
                        type: "name",
                        title: "Radius-salasana",
                        content: "Anna Radius-palvelimen salasana."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Valitse 802,11 WEP-suojaus.",
                    children: [{
                        type: "name",
                        title: "Tyyppi",
                        content: "Voit valita jonkin seuraavista tyypeistä",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "Valitse Jaettu avain tai Avoin järjestelmä -todentamistyyppi automaattisesti perustuen langattoman aseman valmiuteen ja pyyntöön."
                        }, {
                            type: "name",
                            title: "Jaettu avain",
                            content: "Valitse 802.11 Jaettu avain -todennus."
                        }, {
                            type: "name",
                            title: "Avoin järjestelmä",
                            content: "Valitse 802.11 Avoin järjestelmä -todennus. "
                        }]
                    }, {
                        type: "name",
                        title: "Valittu avain",
                        content: "Valitse, mitä neljästä avaimesta käytetään."
                    }, {
                        type: "name",
                        title: "WEP-avaimen muoto",
                        content: "Voit valita ASCII-merkkejä tai heksadesimaalimerkkejä. ASCII-muoto tarkoittaa mitä tahansa määritetyn pituista näppäimistön merkkiä. Heksadesimaalimuoto tarkoittaa mitä tahansa määritetyn pituista heksadesimaalimerkkiä (0-9, a-f, A-F)."
                    }, {
                        type: "name",
                        title: "Avaintyyppi",
                        content: "Voit valita WEP-avaimen pituuden (64-bittinen, 128-bittinen tai 152-bittinen) salausta varten. \"Poistettu käytöstä\" tarkoittaa, että tämä WEP-avain-merkintä on virheellinen.",
                        children: [{
                            type: "name",
                            title: "64-bittistä salausta varten",
                            content: "Voit syöttää 10 heksadesimaalimerkkiä (mikä tahansa merkkien 0-9, A-F, a-f ja tyhjäarvoisen avaimen yhdistelmä ei ole sallittu) tai 5 ASCII-merkkiä."
                        }, {
                            type: "name",
                            title: "128-bittistä salausta varten",
                            content: "Voit syöttää 26 heksadesimaalimerkkiä (mikä tahansa merkkien 0-9, A-F, a-f ja tyhjäarvoisen avaimen yhdistelmä ei ole sallittu) tai 13 ASCII-merkkiä."
                        }, {
                            type: "name",
                            title: "152-bittistä salausta varten",
                            content: "Voit syöttää 32 heksadesimaalimerkkiä (mikä tahansa merkkien 0-9, A-F, a-f ja tyhjäarvoisen avaimen yhdistelmä ei ole sallittu) tai 16 ASCII-merkkiä. "
                        }]
                    }, {
                        type: "name",
                        title: "Avainarvo",
                        content: "Kirjoita salasana WEPiä varten."
                    }]
                }]
            }, {
                type: "name",
                title: "Tila",
                content: "Tämä kenttä määrittää langattoman tilan, jossa reititin toimii."
            }, {
                type: "name",
                title: "Kanavan leveys",
                content: "Langattoman kanavan kaistanleveys."
            }, {
                type: "name",
                title: "Kanava",
                content: "Tämä kenttä määrittää, mitä käyttötaajuutta käytetään. Ei ole tarpeen vaihtaa langatonta kanavaa, ellet huomaa ajoittaista häiriöitä toisessa lähellä olevassa tukiasemassa. Jos valitset automaattinen-valinnan, AP valitsee parhaan kanavan automaattisesti."
            }, {
                type: "name",
                title: "Lähetysteho",
                content: "Täällä voit määrittää reitittimen lähetystehon. Vaihtoehdot ovat korkea, keskitaso ja alhainen. Korkea on oletusasetus ja sitä suositellaan. "
            }, {
                type: "paragraph",
                content: "<strong>Tallenna</strong> napsauttamalla Tallenna ja käytä määritystä."
            }]
        },
        diagnostic: {
            TITLE: "Diagnostiikkatyökalut",
            CONTENT: [{
                    type: "paragraph",
                    content: "Reititin tarjoaa Ping- ja Traceroute-työkalut, joiden avulla voidaan suorittaa verkkoyhteysongelmien vianmääritys. Ping-työkalu lähettää paketteja kohde-IP-osoitteisiin tai toimialueen nimeen ja kirjaa tulokset, kuten lähetettyjen / vastaanotettujen pakettien lukumäärän ja kiertoajan. Traceroute-työkalu lähettää paketteja kohde-IP-osoitteisiin tai toimialueen nimeen ja näyttää siirtymien määrän ja kohteen saavuttamisajan."
                }, {
                    type: "paragraph",
                    content: "Voit suorittaa ping- ja traceroute-komennon verkkolaitteelle IP-osoitteen tai toimialueen nimen mukaan, kuten google.com, yahoo.com, jne."
                }, {
                    type: "note",
                    title: "Testaustyökalun diagnosointi",
                    content: [
                        "Anna kohteen IP-osoite tai toimialueen nimi.",
                        "Avaa Lisäasetukset-valikko napsauttamalla nuolikuvaketta ja määritä Ping-määrä ja Ping-paketin koko. (Valinnainen)",
                        "Napsauta Käynnistä."
                    ]
                }, {
                    type: "note",
                    title: "Diagnosointi Traceroute-työkalulla",
                    content: [
                        "Anna kohteen IP-osoite tai toimialueen nimi.",
                        "Avaa Lisäasetukset-valikko napsauttamalla nuolikuvaketta ja määritä siirtymien määrä (joka on tarkoitus saavuttaa) Traceroute Max TTL (elinaika) -kentässä. Oletusarvo on 20. (Valinnainen) ",
                        "Napsauta Käynnistä."
                    ]
                }
                
            ]
        },
        lan: {
            TITLE: "LAN",
            CONTENT: [{
                    type: "name",
                    title: "MAC-osoite",
                    content: "Reitittimen yksilöllinen fyysinen osoite."
                }, {
					display: "$.routerMode == 'Router'",
                    type: "name",
                    title: "LAN IPv4",
                    content: "Säilyttää reitittimen oletus-IP-osoitteen (192.168.0.1) tai kirjoita uusi. Tätä IP-osoitetta voidaan käyttää kirjautumaan reitittimen WWW-hallinta-sivulle."
                }, {
					display: "$.routerMode == 'AP'",
					"type": "name",
					"title": "Osoitetyyppi",
					"content": "Reitittimen IP-osoitteen määrityskeino. Voit määrittää sen manuaalisesti (staattinen IP) tai automaattisesti (Smart DHCP)."
				}, {
					display: "$.routerMode == 'AP'",
					"type": "name",
					"title": "LAN IP",
					"content": "Säilyttää reitittimen oletus-IP-osoitteen (192.168.0.254) tai kirjoita uusi. Tätä IP-osoitetta voidaan käyttää kirjautumaan reitittimen WWW-hallinta-sivulle."
				}, {
                    type: "name",
                    title: "Aliverkon peite",
                    content: "Valitse LAN-portin määritetty tunniste reitittämään sisäinen ja ulkoinen liikenne pudotusvalikosta tai anna uusi aliverkon peitemuoto. Oletusarvo on 255.255.255.0."
                }, {
					display: "$.routerMode == 'Router'",
                    type: "name",
                    title: "IGMP Snooping",
                    content: "IGMP:n (Internet Group Management Protocol) avulla voidaan hallita monilähetystä TCP- / IP-verkoissa. Jotkin palveluntarjoajat käyttävät IGMP:tä suorittamaan etämäärityksiä asiakkaan laitteille, kuten reitittimeen. Se on oletusarvoisesti käytössä."
                }, {
					display: "$.routerMode == 'Router'",
                    type: "paragraph",
                    title: "Huomautus",
                    content: "Jos uusi LAN IP-osoite ei ole samassa aliverkossa vanhan kanssa, IP-osoiteryhmä DHCP-palvelimessa muuttuu automaattisesti; kuitenkin näennäispalvelin ja DMZ-isäntä tulevat voimaan vasta kun ne on määritetty uudelleen."
                }, {
				display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
                type: "title",
                content: "Yhteyden koostaminen"
            }, {
            	display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
                type: "paragraph",
                content: "Yhteyden koostaminen yhdistää kaksi porttia tuottaen yhden suuren kaistanleveyden datapolun, joka ylläpitää suurempia nopeuksia ja vakaampaa langallista verkkoa."
			}, {
                display: INCLUDE_LINK_AGGREGATION && "$.routerMode == 'Router'",
                type: "note",
                title: "Yhteyden koostamisen käyttöönotto",
                content: [
                    "Valitse On ottaaksesi yhteyden koostamisen käyttöön.",
                    " Valitse yhteyden koostamistila.<br><b> LACP aktiivinen:</b> ottaa LACP:n (Link Aggregation Control Protocol) käyttöön ehdotta.<br><b> LACP passiivinen:</b> ottaa LACP:n käyttöön vain, kun havaitaan LACP-laite.",
					"Valitse yhteyden koostamiselle kaksi porttia.",
					"Napsauta Tallenna."
                ]
            }]
        },
        ddos: {
            TITLE: "Palomuuri",
            CONTENT: [{
                    type: "name",
                    title: "SPI-palomuuri",
                    content: "SPI (Stateful Packet Inspection) -palomuuri estää verkkohyökkäykset ja vahvistaa liikenteen, joka kulkee reitittimen läpi. SPI-palomuuri on käytössä oletusarvoisesti. "
                }, {
                    type: "title",
                    title: "DoS-suojaus"
                }, {
                    type: "name",
                    title: "DoS-suojaus",
                    content: "DoS (palvelunesto) suojaus suojaa lähiverkkoa ​​palvelunestohyökkäyksiltä täyttämästä verkkoa palvelinpyynnöillä. DoS-suojaus on oletusarvoisesti pois käytöstä (Off)."
                }, {
                    type: "name",
                    title: "ICMP-FLOOD -hyökkäyksen suodatus",
                    content: "Ota se käyttöön estääksesi ICMP (Internet Control Message Protocol) -tulvahyökkäyksen."
                }, {
                    type: "name",
                    title: "UDP-FLOOD-hyökkäyksen suodatus",
                    content: "Ota käyttöön estääksesi UDP (User Datagram Protocol) -tulvahyökkäyksen."
                }, {
                    type: "name",
                    title: "TCP-FLOOD-hyökkäyksen suodatus",
                    content: "Ota käyttöön estääksesi Transmission Control Protocol-Synchronize (TCP-SYN) -tulvahyökkäyksen.",
                    children: [{
                        type: "name",
                        title: "Pois",
                        content: "Ei suojausta."
                    }, {
                        type: "name",
                        title: "Alhainen",
                        content: "Matalan tason suojaus ja vähäinen vaikutus reitittimen suorituskykyyn."
                    }, {
                        type: "name",
                        title: "Keskitaso",
                        content: "Keskitason suojaus ja keskitason vaikutus reitittimen suorituskykyyn."
                    }, {
                        type: "name",
                        title: "Korkea",
                        content: "Korkea suojaus ja huomattava vaikutus reitittimen suorituskykyyn."
                    }]
                }, {
                    type: "name",
                    title: "LAN Ping -kielto",
                    content: "Ota käyttöön kieltääksesi LAN-porttien ping-testaukset."
                }, {
                    type: "name",
                    title: "WAN Ping -kielto",
                    content: "Ota käyttöön kieltääksesi WAN-porttien ping-testaukset."
                }, {
                    type: "title",
                    title: "Estettyjen DoS-isäntien luettelo"
                }, {
                    type: "name",
                    title: "Estettyjen DoS-isäntien luettelo",
                    content: "Luettelee IP-osoitteen ja MAC-osoitteen kaikista estetyistä DoS-hyökkäyslähteistä."
                }, {
                    type: "name",
                    title: "Yhden tai useamman merkinnän poistaminen",
                    content: "Valitse isäntäluettelossa merkintä tai merkinnät, jotka haluat poistaa ja napsauta Poista taulukon yläpuolella."
                }
                
                
                
            ]
        },
        ipv6: {
            TITLE: "IPv6 Internet",
            CONTENT: [{
                type: "name",
                title: "Ota IPv6 käyttöön",
                content: "Valitse ottaaksesi käyttöön (Käytössä) tai poistaaksesi käytöstä (Pois käytöstä) reitittimen IPv6-ominaisuuden."
            }, {
                type: "title",
                title: "Internet-yhteyden tyyppi: Staattinen IP"
            }, {
                type: "name",
                title: "Staattinen IP",
                content: "Valitse tämä tyyppi, jos palveluntarjoajasi käyttää staattista IPv6-osoitetta."
            }, {
                type: "name",
                title: "IPv6-osoite / IPv6-oletusyhdyskäytävä / IPv6 DNS-palvelin / Toissijainen IPv6 DNS-palvelin",
                content: "Anna nämä parametrit siinä muodossa kuin ISP on antanut ne."
            }, {
                type: "name",
                title: "MTU (tavua)",
                content: "Useimpien Ethernet-verkkojen oletuskoko ja tyypillinen MTU-koko (siirtoyksikön enimmäiskoko) on 1 500 tavua. Älä muuta MTU-oletuskokoa ellei ISP vaadi sitä."
            }, {
                type: "title",
                title: "Internet-yhteyden tyyppi: Dynaaminen IP"
            }, {
                type: "name",
                title: "Dynaaminen IP",
                content: "Valitse tämä tyyppi, jos palveluntarjoajasi käyttää dynaamista IPv6-osoitetta."
            }, {
                type: "name",
                title: "IPv6-osoite / IPv6-yhdyskäytävä",
                content: "ISP:n DHCPv6-palvelin määrittää nämä parametrit automaattisesti."
            }, {
                type: "name",
                title: "Osoitteen määritystyyppi",
                content: "Valitse IPv6-yhteyden yhteystyyppi."
            }, {
                type: "name",
                title: "MTU (tavua)",
                content: "Useimpien Ethernet-verkkojen oletuskoko ja tyypillinen MTU-koko (siirtoyksikön enimmäiskoko) on 1 500 tavua. Älä muuta MTU-oletuskokoa ellei ISP vaadi sitä."
            }, {
                type: "name",
                title: "Käytä seuraavaa IPv6-DNS-osoitetta",
                content: "Valitse tämä valintaruutu ja kirjoita DNS-palvelimen osoite (-osoitteet) ISP:n antamassa pisteellisessä desimaalimuodossa. Tämä WAN-liitäntä käyttää määritettyä DNS-palvelinta prioriteettina."
            }, {
                type: "name",
                title: "Isäntänimi",
                content: "Syötä arvo tähän kenttään määrittääksesi reitittimeen isäntänimen."
            }, {
                type: "title",
                title: "Internet-yhteyden tyyppi: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Valitse tämä tyyppi, jos palveluntarjoajasi käyttää PPPoEv6:tta, ja on antanut sinulle käyttäjätunnuksen ja salasanan."
            }, {
                type: "name",
                title: "Käyttäjätunnus / salasana / Vahvista salasana",
                content: "Anna nämä parametrit siinä muodossa kuin ISP on antanut ne."
            }, {
                type: "name",
                title: "Osoitteen määritystyyppi",
                content: "Valitse IPv6-yhteyden yhteystyyppi."
            }, {
                type: "name",
                title: "Palvelun nimi",
                content: "Anna ISP:n antama palvelun nimi. Jätä se tyhjäksi, jos sitä ei ole annettu."
            }, {
                type: "name",
                title: "Palvelimen nimi",
                content: "Anna ISP:n antama palvelimen nimi. Jätä se tyhjäksi, jos sitä ei ole annettu."
            }, {
                type: "name",
                title: "MTU (tavua)",
                content: "Ethernet-verkkojen tyypillinen MTU-koko (siirtoyksikön enimmäiskoko) on 1480 tavua.",
                children: [{
                    type: "paragraph",
                    content: "<b>Huomautus:</b> Siinä harvinaisessa tapauksessa, että ISP vaatii säätämään MTU:n kokoa verkon parempaa suorituskykyä varten. Arvoa ei pidä muuttaa, ellei se ole aivan välttämätöntä."
                }]
            }, {
                type: "name",
                title: "Käytä ISP:n määrittämiä IPv6-tietoja:",
                content: "Valitse tämä valintaruutu ja anna ISP:n antama IP-osoite ja yhdyskäytävä."
            }, {
                type: "name",
                title: "Käytä seuraavaa IPv6-DNS-osoitetta",
                content: "Valitse tämä, jos haluat antaa manuaalisesti ISP:n antaman DNS-osoitteen. Jos sitä ei ole valittu, reititin saa DNS-osoitteen dynaamisesti Internet-palveluntarjoajalta."
            }, {
                type: "title",
                title: "Internet-yhteyden tyyppi: 6to4-tunneli"
            }, {
                type: "name",
                title: "6to4-tunneli",
                content: "Valitse tämä tyyppi, jos palveluntarjoajasi käyttää 6to4-käyttöönottoa osoitteen määrittämistä varten."
            }, {
                type: "title",
                title: "IPv6 LAN"
            }, {
                type: "name",
                title: "Osoitteen määritystyyppi",
                content: "Valitse sopiva tyyppi ISP:n mukaan.",
                children: [{
                    type: "name",
                    title: "RADVD",
                    content: "Valitse tämä vaihtoehto määrittääksesi lähiverkon tietokoneiden IPv6-osoitteisiin RADVD:n kautta.",
                    children: [{
                        type: "name",
                        title: "Ota RDNSS käyttöön",
                        content: "Valitse valintaruutu ottaaksesi RDNSS-ominaisuuden käyttöön."
                    }, {
                        type: "name",
                        title: "Ota ULA-etuliite käyttöön",
                        content: "Valitse valintaruutu ottaaksesi ULA-etuliite-ominaisuuden käyttöön.",
                        children: [{
                            type: "name",
                            title: "ULA-etuliite",
                            content: "Anna ULA-etuliite."
                        }, {
                            type: "name",
                            title: "ULA-etuliitteen pituus",
                            content: "Anna ULA-etuliitteen pituus. Oletusarvo on 64."
                        }]
                    }]
                }, {
                    type: "name",
                    title: "DHCPv6-palvelin",
                    content: "Voit automaattisesti määrittää IP-osoitteet lähiverkossa oleville asiakkaille.",
                    children: [{
                        type: "name",
                        title: "IPv6-alkuosoite",
                        content: "Anna IPv6-alkuosoite"
                    }, {
                        type: "name",
                        title: "IPv6-loppuosoite",
                        content: "Anna IPv6-loppuosoite"
                    }, {
                        type: "name",
                        title: "Kiinteä aika",
                        content: "Anna kesto, jonka aikana DHCP-asiakas voi vuokrata reitittimen määrittämän nykyisen dynaamisen IPv6-osoitteen. Kun dynaaminen IPv6 on päättynyt, käyttäjälle määritetään automaattisesti uusi dynaaminen IPv6-osoite. Oletusarvo on 86400 sekuntia."
                    }]
                }]
            }, {
                type: "name",
                title: "Sivuston etuliitetyyppi",
                content: "Valitse tyyppi määrittääksesi IPv6-osoitteiden etuliitteen. Delegoitu ja staattinen on annettu."
            }, {
                type: "name",
                title: "Delegoitu",
                children: [{
                    type: "name",
                    title: "Delegoidun WAN-yhteyden etuliite",
                    content: "Valitse WAN-yhteys pudotusvalikosta etuliitteen määrittämiseksi."
                }]
            }, {
                type: "name",
                title: "Staattinen",
                children: [{
                    type: "name",
                    title: "Sivuston etuliite",
                    content: "Anna sivuston etuliitteen arvo."
                }, {
                    type: "name",
                    title: "Sivuston etuliitteen pituus",
                    content: "Anna sivuston etuliitteen pituuden arvo."
                }]
            }]
        },
		openvpnServer: {
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "name",
				title: "Ota VPN-palvelin käyttöön",
				content: "Ota OpenVPN-palvelin käyttöön valitsemalla tämä valintaruutu."
			},{
				type: "name",
				title: "Palvelun tyyppi",
				content: "Valitse OpenVPN-palvelimen tiedonsiirtoprotokolla: UDP tai TCP."
			},{
				type: "name",
				title: "Palveluportti",
				content: "Anna tiedonsiirtoportin numero välillä 1024-65535. Oletus- ja yleinen palveluportti on 1194."
			},{
				type: "name",
				title: "VPN:n aliverkon/verkon peite",
				content: "Anna asiakkaille OpenVPN-palvelimelta vuokrattavien IP-osoitteiden alue."
			},{
				type: "name",
				title: "Asiakaspääsy",
				content: "Valitse OpenVPN-asiakkaan käyttötyyppi."
			},{
				type: "name",
				title: "Vain kotiverkko",
				content: "Asiakkaat voivat käyttää vain reititintä ja LAN-verkkoa. Asiakkaan oletusreitti ei muutu."
			},{
				type: "name",
				title: "Internet ja kotiverkko",
				content: "Asiakkaat voivat käyttää reititintä, LAN-verkkoa ja Internetiä. Asiakkaan oletusreitti muuttuu."
			},{
				type: "paragraph",
				content: "Tallenna kaikki asetukset napsauttamalla Save (Tallenna)."
            },{
                type: "title",
                content: "Sertifikaatti"
            },{
                type: "paragraph",
                content: "Käytä etätietokoneen VPN-yhteyden tiedoille ja identiteetille sertifikaattia."
            },{
                type: "name",
                title: "Luo",
                content: "Napsauta luodaksesi uusi sertifikaatti."
            },{
                type: "title",
                content: "Määritystiedosto"
            },{
                type: "name",
                title: "Vie",
                content: "Napsauta tätä painiketta tallentaaksesi OpenVPN-kokoonpanotiedosto, jolla lisätään uusi VPN-yhteys."
			},{
                type: "title",
                content: "VPN-asiakkaan asennusopas"
			},{
				type: "step",
                title: "Asiakaslaitteiden käyttöönotto ja yhdistäminen OpenVPN-palvelimeen:"
			},{
				type: "paragraph",
				content: "Ennen kuin määrität OpenVPN-palvelimen, määrtä dynaaminen DNS-palvelin (suositellaan) tai määrää WAN-portille staattinen IP-osoite. Varmista, että NAT-asetusten ulkoinen portti ei ole palveluportti ja että järjestelmän aika on synkronoitu Internetin kanssa."
			},{
				type: "step",
				title:"",
				content:[
					"Valitse Enable VPN Server (Ota VPN-palvelin käyttöön).",
					"Määritä OpenVPN-palvelimen parametrit (Service Type (Palvelutyyppi), Service Port (Palveluportti) ja Client Access (Asiakaspääsy)) ja napsauta Save (Tallenna).",
					"Tallenna kokoonpanotiedosto napsauttamalla Export (Vie).",
					"Lataa ja asenna OpenVPN-asiakasapuohjelma asiakaslaitteella osoitteesta <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> Tuetut ympäristöt ovat Windows, Mac OSX, Linux.",
					"Käynnistä OpenVPN-asiakasohjelma ja lisää uusi VPN-yhteys käyttäen tallennettua kokoonpanotiedostoa yhdistääksesi asiakaslaitteen VPN-palvelimeen."
				]
			},{	
				type: "paragraph",
				title: "Note:",
				content: "Lisätietoja OpenVPN-asiakaslaitteista on osoitteessa <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
            }]
		},

		pptpvpnServer: {
			TITLE: "PPTP VPN",
			CONTENT: [{
				type: "name",
				title: "Ota VPN-palvelin käyttöön",
				content: "Ota PPTP VPN -palvelin käyttöön valitsemalla tämä valintaruutu."
			},{
				type: "name",
				title: "Asiakkaan IP-osoite",
				content: "Anna IP-osoitealue (enintään 10 asiakasta), jotka PPTP VPN -palvelin voi vuokrata asiakkaille."
			},{
				type: "name",
				title: "Käyttäjätunnus ja salasana",
				content: "Anna käyttäjätunnus ja salasana, jolla PPTP VPN -palvelimen asiakkaat todennetaan."
			},{
				type: "paragraph",
				content: "Tallenna kaikki asetukset napsauttamalla Save (Tallenna)."
			},{
                type: "title",
                content: "VPN-asiakkaan asennusopas"
			},{
				type: "step",
                title: "Asiakaslaitteiden käyttöönotto ja yhdistäminen PPTP VPN -palvelimeen:"
			},{
				type: "paragraph",
				content: "Ennen kuin määrität PPTP VPN -palvelimen, määrtä dynaaminen DNS-palvelin (suositellaan) tai määrää WAN-portille staattinen IP-osoite. Varmista, että NAT-asetusten ulkoinen portti ei ole 1723 ja että järjestelmän aika on synkronoitu Internetin kanssa."
			},{
				type: "step",
				title:"",
				content:[
					"Valitse Enable VPN Server (Ota VPN-palvelin käyttöön).",
					"Määritä PPTP VPN -palvelimen parametrit ja napsauta Save (Tallenna).",
					"Luo asiakaslaitteissa PPTP VPN -yhteys. Tuetut ympäristöt ovat Windows, Mac OSX, Linux, iOS ja Android.",
                    "Käynnistä PPTP VPN -ohjelma, lisää uusi yhteys ja anna rekisteröidyn DDNS-palvelun WAN-portin toimialueen nimi tai staattinen IP-osoite yhdistääksesi asiakaslaitteen PPTP VPN -palvelimeen."
				]
			}]
		},

		vpnServerStatus: {
			TITLE: "VPN-yhteydet",
			CONTENT: [{
				type: "paragraph",
				content: "Tällä sivulla näytetään asiakkaat, jotka on tällä hetkellä kytketty reitittimen OpenVPN- tai PPTP VPN -palvelimeen."
			},{
				type: "paragraph",
				content: "Napsauta miinuskuvaketta katkaistaksesi yhteyden kyseiseen asiakkaaseen."
			}]
		},
        cloudBasic: {
            TITLE: "TP-Link Cloud",
            CONTENT: [{
                type: "paragraph",
                content: "TP-Link Cloud -palvelulla voit etävalvoa verkkoa tosiajassa ja käyttää ja hallinnoida TP-Link-laitteitasi Internetistä milloin vain ja missä vain."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin",
                content: "Tilin tiedot"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin",
                content: "Näyttää TP-Link-tunnuksesi tiedot. Voit muokata tilin tietoja napsauttamalla Edit-kuvaketta."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin",
                content: "Laitetiedot"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin",
                content: "Näyttää laitteen tiedot, mukaan lukien laitetta hallinnoivan pilvitilin."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                content: "Sidotut tilit"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                content: "Tässä taulukossa näytetään kaikki pilvitilit, jotka on tällä hetkellä sidottu laitteeseen."
            }, {
                type: "step",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                title: "Käyttäjätilin sidonta",
                content: [
                    "Napsauta Bind.",
                    "Anna rekisteröity sähköposti, jonka haluat sitoa.",
                    "Napsauta Tallenna."
                ]
            }]
        }
    };
})(jQuery);
