var strMode_N=[["Csak 802.11n","Csak-n"],["802.11g/n vegyes","gn"],["802.11b/g/n vegyes","n"]],strMode_AN=[["Csak 802.11a","a"],["Csak 802.11n","n-only"],["802.11a/n vegyes","an"]],strMode_AC=[["Csak 802.11ac","ac-only"],["802.11ac/n vegyes","nac"],["802.11a/n/AC vegyes","ac"]],strMode={"Csak-n":"Csak 802.11n",gn:"802.11gn vegyes",n:"802.11bgn vegyes",a:"802.11a csak",an:"802.11an vegyes","csak-ac":"802.11ac csak",nac:"802.11ac/n vegyes",ac:"802.11a/n/ac vegyes"},strBandWidth=[["Autó","Auto"],["20 MHz","20M"],["40 MHz","40M"]],strBandWidth_AC=[["80 MHz","80M"]],typeArray=["Mobiltelefon","Vezetékes","Távolsági","Nemzetközi hívás","Egyéb","Vegye fel a telefont, és tárcsázza a *20-at a hangüzenetek meghallgatásához."],callsArray=["Minden bejövő hívás","Hívja fel","Hívja fel","Hívás innen:","Minden névtelen hívás","Névtelen hívás"],fwArray=["Feltétlen","Nincs válasz"],phone=["Magán","Munka","Cella"],showtype=["Autó","- Kérem válasszon -",".pri",".Cella",".munka","Automatikusan","Összes","a router teljes hosszúságú hangüzeneteket rögzíthet.","LAN","Any_wan"],processType=["nem összekapcsolt","csatlakoztatva","konferencia","helyi transzfer","távoli transzfer","helyi továbbítás","távoli továbbítás","ismeretlen"],callType=["Beérkező","Kimenő","Ismeretlen","Továbbítás","Nem fogadott"],simStatusArray_str=["Nincs észlelt SIM -kártya vagy SIM -kártya hiba.","Nem észlelhető SIM-kártya.","SIM -kártya hiba.","SIM-kártya előkészítve.","SIM zárolva.","SIM feloldva. A hitelesítés sikerült.","PIN zárolva.","A SIM-kártya véglegesen le van zárva.","suspension of transmission"],networkType_str=["Nincs szolgáltatás","GSM","WCDMA","4G LTE","TD-SCDMA","CDMA 1x","CDMA 1x Ev-Do","4G+ LTE"],simStatusString=["Ismeretlen","Nincs SIM -kártya","SIM -kártya hiba","Kész","PIN kód szükséges","PIN feloldva","PUK szükséges","Bridge Mód","Ha engedélyezve van, a TP-Link felhőalapú szolgáltatás és a Wi-Fi funkció nem lesz elérhető. Csak a kijelölt port (LAN4/WAN) nyújtható hálózati szolgáltatások, míg a fennmaradó portokat (LAN1-LAN3) a Web Management oldal eléréséhez elérheti.","Bridge módban az átjáró 3G/4G modemként működik, hogy az LTE vezeték nélküli jeleket Ethernet jelekké alakítsa. A kijelölt portot (LAN4/WAN) az internetszolgáltatások biztosítására használják majd a router lépcsőzetes átvitelében.","Kérjük, vegye figyelembe, hogy a router átmenetileg le lesz választva az internetről a hálózatkeresés során. Folytatja?","Vezeték nélküli beállítások konfliktusok. Kérd meg a beállításokat, pl. 1. A WEP biztonságát vagy a WPA/TKIP titkosítást nem támogatják csak a 11N vezeték nélküli üzemmódban; 2. A WEP Security vagy a WPA/WPA2 Enterprise nem támogatott, ha a WPS engedélyezve van; 3.A rejtett SSID nem támogatja a WPS engedélyezését; 4. A WPA3 biztonságát nem támogatják, ha a WPS engedélyezve van.","A WPA3 személyes titkosítása nem támogatott a WPS engedélyezésével.","Kérem, adja meg a TKIP/AES/SAE jelszót.","A TKIP/AES/SAE jelszó legalább 8 karakternek kell lennie.","TKIP/AES/SAE értéknek csak hexadecimális karakterekből kell állnia. kérem, írjon be egy másik értéket.","A TKIP/AES/SAE értéknek csak ASCII karakterekből kell állnia. kérem, adjon be újabbat.","WPA2/WPA3 személyes","WPA3-SAE",'Töltse le a legújabb ISP frissítési fájlt a támogatási oldalról a <a Target=_Blank" href="https://www.tp-link.com/support/download/"> https: //www.tp- link.com/support/download/ </a> a számítógépéhez.',"Kérem, írjon be egy IPv4 maszk hosszát 0 és 32 között","Hálószoba","Megjegyzés: A WPA3-SAE engedélyezésével csak a WPA3-ot támogató vagy kiterjesztők csatlakozhatnak a vezeték nélküli hálózathoz.","suspension of transmission"];