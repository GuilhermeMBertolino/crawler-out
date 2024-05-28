(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Geniş alan ağ (Internet) bağlantısı ile ilgili bilgiler görüntülenmektedir."
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"Kablosuz 2.4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Kablosuz ağ ile ilgili bilgiler görüntülenmektedir."
                       }]
},
       STATUS_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ethernet (LAN) portları hakkındaki bilgileri gösterir."
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"Misafir Ağı 2.4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "Misafirler için kablosuz ağ ile ilgili bilgiler görüntülenmektedir."
                       }]
},
       STATUS_USB :{ 
               TITLE:"USB Cihazları",
               CONTENT: [{
                           type: "paragraph",
                           content: "USB portları aracılığıyla router'a şu anda bağlı olan USB depolama aygıtlarının ve/veya yazıcıların bilgileri görüntülenmektedir."
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"Performans",
               CONTENT: [{
                           type: "paragraph",
                           content: "Mevcut router'ın performansını gösterir."
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"Kablolu İstemciler",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ağa bağlı kablolu cihazların bilgisi görüntülenmektedir."
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"Kablosuz İstemciler",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ağa bağlı kablosuz cihazların bilgisi görüntülenmektedir."
                       }]
},
       INTERNET_TITLE :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Uygun MAC Klon metodunu seçiniz ve IPv4 parametrelerini yapılandırınız."
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"IPv4",
               CONTENT: [{
                           type: "paragraph",
                           content: "Internet Bağlantı Türü'nü seçiniz ve uygun parametreleri giriniz."
                       } ,{                      
                           type: "title",
                            title: "Internet Bağlantı Tipi:Dinamik IP"
                       } ,{                      
                           type: "paragraph",
                           content: "ISP üzerinden bir DHCP sunucu ile bağlantı sağlıyorsanız bu türü seçiniz."
                       } ,{                      
                           type: "name",
                           title: "IP Adresi/Alt Ağ Maskesi/Varsayılan Ağ Geçidi/Birincil DNS/İkincil DNS",
                           content: "Bu parametreler ISP tarafından DHCP sunucusu aracılığıyla otomatik olarak atanmaktadır."
                       } ,{                      
                           type: "name",
                           title: "Yenile",
                           content: "DHCP sunucusundan yeni IP parametrelerini almak için tıklayınız."
                       } ,{                      
                           type: "name",
                           title: "Bırak",
                           content: "DHCP sunucusu tarafından atanan tüm IP adreslerini bırakmak için tıklayınız."
                       } ,{                      
                           type: "name",
                           title: "DNS Adresi",
                           content: "Eğer ISS bir veya iki DNS adresi sağlıyorsa, bu işaret kutucuğunu seçin ve birincil DNS ve ikincil DNS adreslerini ilgili veri giriş alanlarına girin. Aksi halde, DNS adresleri ISS tarafından dinamik olarak atanacaktır."
                       } ,{                      
                           type: "name",
                           title: "MTU Boyutu",
                           content: "Çoğu ethernet ağı için varsayılan ve genel MTU (En Yüksek Aktarım Birimi) boyutu 1500 byte'dır. ISS'nız tarafından gerekmedikçe varsayılan MTU boyutunu değiştirmeniz önerilmez. "
                       } ,{                      
                           type: "name",
                           title: "Ana Bilgisayar Adı",
                           content: "Router'ınızın ana bilgisayar adını belirlemek için bu alana bir değer girin."
                       } ,{                      
                           type: "name",
                           title: "Unicast DHCP Kullanarak IP Al",
                           content: "Dinamik olarak IP adresi alamazsanız ve ISP'nin DHCP sunucuları broadcast uygulamalarını desteklemiyorsa bu onay kutucuğunu seçiniz."
                       } ,{                      
                           type: "title",
                            title: "Internet Bağlantı Tipi:Statik IP"
                       } ,{                      
                           type: "paragraph",
                           content: "Eğer ISS tarafından size özel (sabit) IP Adresi, Alt Ağ Maskesi, Ağ Geçidi ve DNS parametreleri sağlanıyorsa, bu tipi seçin."
                       } ,{                      
                           type: "name",
                           title: "IP Adresi/Alt Ağ Maskesi/Varsayılan Ağ Geçidi/Birincil DNS/İkincil DNS",
                           content: "ISP tarafından sağlanan bilgileri giriniz."
                       } ,{                      
                           type: "name",
                           title: "MTU Boyutu",
                           content: "Çoğu ethernet ağı için varsayılan ve genel MTU (En Yüksek Aktarım Birimi) boyutu 1500 byte'dır. ISS'nız tarafından gerekmedikçe varsayılan MTU boyutunu değiştirmeniz önerilmez. "
                       } ,{                      
                           type: "title",
                            title: "Internet Bağlantı Tipi: BigPond Kablo"
                       } ,{                      
                           type: "paragraph",
                           content: "ISP'niz BigPond Cable bağlantısı sağlıyorsa bu türü seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Kullanıcı Adı/Şifre",
                           content: "ISP tarafından sağlanan kullanıcı adı ve şifreyi giriniz. Bu alan büyük/küçük harfe duyarlıdır."
                       } ,{                      
                           type: "name",
                           title: "Kim.Doğr. Sunucusu",
                           content: "Kimlik doğrulama sunucusunun IP adresini veya ana bilgisayar adını girin."
                       } ,{                      
                           type: "name",
                           title: "Kim.Doğr. Domain",
                           content: "Sunucunun domain adı son ekini (lokasyona bağlıdır) giriniz. Örneğin, NSW/ACT için nsw.bigpond.net.au, VIC/TAS/WA/SA/NT için vic.bigpond.net.au, QLD için qld.bigpond.net.au"
                       } ,{                      
                           type: "name",
                           title: "MTU Boyutu",
                           content: "Çoğu ethernet ağı için varsayılan ve genel MTU (En Yüksek Aktarım Birimi) boyutu 1500 byte'dır. ISS'nız tarafından gerekmedikçe varsayılan MTU boyutunu değiştirmeniz önerilmez. "
                       } ,{                      
                           type: "name",
                           title: "Bağlantı Modu",
                           content: "Internete nasıl bağlanacağınızı belirleyen uygun bağlantı modunu seçin.",
       children: [{                      
                           type: "name",
                           title: "Otomatik",
                           content: "Bu modda, internet bağlantısı kesildiğinde otomatik olarak tekrar bağlanır."
                       } ,{                      
                           type: "name",
                           title: "Talep Üzerine",
                           content: "Bu modda, belirlenen boş kalma süresi (Maksimum Boş Zaman) tamamlandıktan sonra internet bağlantısı otomatik olarak sonlandırılacaktır. Internete tekrar erişmeye çalıştığınızda, bağlantı tekrardan kurulur."
                       } ,{                      
                           type: "name",
                           title: "Manuel Olarak",
                           content: "Bu modda, internet bağlantısı Bağlan veya Bağlantıyı Kes butonlarına tıklayarak manuel olarak kontrol edilir. Bu mod Maksimum Boş Zaman fonksiyonunu da destekler. Internet bağlantısının Maksimum Boş Zaman alanında sona erdirilmeden önce pasif duruma geçebileceği maksimum zamanı dakika olarak girin. Varsayılan değer 15 dakikadır. Eğer internet bağlantınızın tüm zamanlarda aktif olmasını istiyorsanız, 0(sıfır) değerini girin."
                       }]
} ,{                      
                           type: "title",
                            title: "Internet Bağlantı Tipi: PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "Eğer DSL (Sayısal Abone Hattı) servisini kullanıyorsanız ve ISS tarafından size kullanıcı adı ve şifresi sağlanmışsa bu tipi seçin."
                       } ,{                      
                           type: "name",
                           title: "Kullanıcı Adı/Şifre",
                           content: "ISP tarafından sağlanan kullanıcı adı ve şifreyi giriniz. Bu alan büyük/küçük harfe duyarlıdır."
                       } ,{                      
                           type: "name",
                           title: "IP Adresi/Birincil DNS/İkincil DNS",
                           content: "Bu parametreler ISP tarafından DHCP sunucusu aracılığıyla otomatik olarak atanmaktadır."
                       } ,{                      
                           type: "name",
                           title: "İkincil Bağlantı(Hiçbiri, Dinamik IP, Statik IP)",
       children: [{                      
                           type: "name",
                           title: "Hiçbiri",
                           content: "Eğer ikincil bağlantı sağlanmamışsa bu seçeneği seçin."
                       } ,{                      
                           type: "name",
                           title: "Dinamik IP",
                           content: "Eğer IP adresi ve Alt Ağ Maskesi ISS tarafından otomatik olarak atanmışsa bu seçeneği seçin.",
       children: [{                      
                           type: "name",
                           title: "Yenile",
                           content: "ISP üzerinden IP parametrelerini yenilemek için tıklayınız."
                       } ,{                      
                           type: "name",
                           title: "Bırak",
                           content: "Atanan IP parametrelerini bırakmak için tıklayınız."
                       }]
} ,{                      
                           type: "name",
                           title: "Statik IP",
                           content: "ISP tarafından IP adresi ve alt ağ maskesi sağlanıyorsa bunu seçiniz ve ilgili alanlara bilgileri giriniz."
                       }]
} ,{                      
                           type: "name",
                           title: "MTU Boyutu",
                           content: "Ethernet ağları için tipik MTU(En Yüksek Aktarım Birimi) boyutu 1480 byte'dır.",
       children: [{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Bazı durumlarda, daha iyi ağ performansı için MTU değerini ISP'niz tarafından değer ile değiştirmeniz gerekebilir. Bu değeri gerekmedikçe değiştirmemelisiniz."
                       }]
} ,{                      
                           type: "name",
                           title: "Servis Adı/Erişim Konsantratör Adı",
                           content: "Varsayılan olarak, Servis Adı ve Erişim Çoğullayıcı (AC) Adı boştur. Bu alanlar, ISP tarafından talep edilmediği sürece değiştirilmemelidir."
                       } ,{                      
                           type: "name",
                           title: "Çevrimiçi Zaman Aralığı Algılama",
                           content: "Router'ın her zaman aralığında Erişim Konsantratör algılaması için 0-120 dakika aralığında bir değer girin. Varsayılan değer 10'dur."
                       } ,{                      
                           type: "name",
                           title: "IP Adresi",
                           content: "ISP tarafından belirli bir (sabit) IP adresi sağlanıyorsa, Aşağıdaki IP Adresini Kullan seçiniz ve ilgili alana IP adresini giriniz. Aksi durumda, otomatik olarak sunucudan bir IP adresi almak için ISP üzerinden Dinamik Olarak Al seçiniz."
                       } ,{                      
                           type: "name",
                           title: "DNS Adresi",
                           content: "ISP tarafından belirli (sabit) DNS IP adresleri sağlanıyorsa, Aşağıdaki DNS Adreslerini Kullan seçiniz ve sırasıyla birincil DNS ve ikincil DNS alanlarına adres(ler)i giriniz. Aksi durumda, otomatik olarak sunucudan DNS IP adres(ler)ini almak için ISP üzerinden Dinamik Olarak Al seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Bağlantı Modu",
                           content: "Internete nasıl bağlanacağınızı belirleyen uygun bağlantı modunu seçin.",
       children: [{                      
                           type: "name",
                           title: "Otomatik",
                           content: "Bu modda, internet bağlantısı kesildiğinde otomatik olarak tekrar bağlanır."
                       } ,{                      
                           type: "name",
                           title: "Talep Üzerine",
                           content: "Bu modda, belirlenen boş kalma süresi (Maksimum Boş Zaman) tamamlandıktan sonra internet bağlantısı otomatik olarak sonlandırılacaktır. Internete tekrar erişmeye çalıştığınızda, bağlantı tekrardan kurulur."
                       } ,{                      
                           type: "name",
                           title: "Zaman Bazlı",
                           content: "Bu modda, internet bağlantısı sadece belirlenen zaman dilimlerinde kurulur. Eğer bu seçenek seçiliyse, başlangıç ve bitiş zamanını girin; ikisi de SS:DD biçiminde olmalı."
                       } ,{                      
                           type: "name",
                           title: "Manuel Olarak",
                           content: "Bu modda, internet bağlantısı Bağlan veya Bağlantıyı Kes butonlarına tıklayarak manuel olarak kontrol edilir. Bu mod Maksimum Boş Zaman fonksiyonunu da destekler. Internet bağlantısının Maksimum Boş Zaman alanında sona erdirilmeden önce pasif duruma geçebileceği maksimum zamanı dakika olarak girin. Varsayılan değer 15 dakikadır. Eğer internet bağlantınızın tüm zamanlarda aktif olmasını istiyorsanız, 0(sıfır) değerini girin."
                       } ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Zaman Bazlı bağlı modu Gelişmiş->Sistem Araçları -> Zaman Ayarları 'nda Sistem Zamanı yapılandırıldığı zaman etkili olacaktır."
                       }]
} ,{                      
                           type: "title",
                            title: "İnternet Bağlantı Tipi: L2TP/PPTP"
                       } ,{                      
                           type: "paragraph",
                           content: "Eğer L2TP/PPTP VPN sunucusuna bağlanıyorsanız ve ISS tarafından sunucunun kullanıcı adı ve şifresi ve IP Adresi/Etki Alanı Adı sağlanmışsa, bu tipi seçin."
                       } ,{                      
                           type: "name",
                           title: "Kullanıcı Adı/Şifre",
                           content: "ISP tarafından sağlanan kullanıcı adı ve şifreyi giriniz. Bu alan büyük/küçük harfe duyarlıdır."
                       } ,{                      
                           type: "name",
                           title: "IP Adresi/Birincil DNS/İkincil DNS",
                           content: "Bu parametreler ISP tarafından DHCP sunucusu aracılığıyla otomatik olarak atanacaktır."
                       } ,{                      
                           type: "name",
                           title: "İkincil Bağlantı(Dinamik IP, Statik IP)",
       children: [{                      
                           type: "name",
                           title: "Dinamik IP",
                           content: "Eğer IP adresi ve Alt Ağ Maskesi ISS tarafından otomatik olarak atanmışsa bu seçeneği seçin."
                       } ,{                      
                           type: "name",
                           title: "Statik IP",
                           content: "ISP tarafından IP adresi, alt ağ maskesi, ağ geçidi ve DNS adresleri sağlanıyorsa bunu seçiniz ve ilgili alanlara bilgileri giriniz."
                       }]
} ,{                      
                           type: "name",
                           title: "VPN Sunucusu IP/Etki Alanı Adı",
                           content: "ISP tarafından sağlanan VPN sunucunun IP adresini veya domain adını giriniz."
                       } ,{                      
                           type: "name",
                           title: "MTU Boyutu",
                           content: "Çoğu ethernet ağı için varsayılan ve genel MTU (En Yüksek Aktarım Birimi) boyutu L2TP için 1460 byte PPTP için 1420 Byte'dır. ISS'nız tarafından gerekmedikçe varsayılan MTU boyutunu değiştirmeniz önerilmez. "
                       } ,{                      
                           type: "name",
                           title: "Bağlantı Modu",
                           content: "Internete nasıl bağlanacağınızı belirleyen uygun bağlantı modunu seçin.",
       children: [{                      
                           type: "name",
                           title: "Otomatik",
                           content: "Bu modda, internet bağlantısı kesildiğinde otomatik olarak tekrar bağlanır."
                       } ,{                      
                           type: "name",
                           title: "Talep Üzerine",
                           content: "Bu modda, belirlenen boş kalma süresi (Maksimum Boş Zaman) tamamlandıktan sonra internet bağlantısı otomatik olarak sonlandırılacaktır. Internete tekrar erişmeye çalıştığınızda, bağlantı tekrardan kurulur."
                       } ,{                      
                           type: "name",
                           title: "Manuel Olarak",
                           content: "Bu modda, internet bağlantısı Bağlan veya Bağlantıyı Kes butonlarına tıklayarak manuel olarak kontrol edilir. Bu mod Maksimum Boş Zaman fonksiyonunu da destekler. Internet bağlantısının Maksimum Boş Zaman alanında sona erdirilmeden önce pasif duruma geçebileceği maksimum zamanı dakika olarak girin. Varsayılan değer 15 dakikadır. Eğer internet bağlantınızın tüm zamanlarda aktif olmasını istiyorsanız, 0(sıfır) değerini girin."
                       }]
}]
},
       INTERNET_MAC :{ 
               TITLE:"MAC Kopyalama",
               CONTENT: [{
                           type: "paragraph",
                           content: "Uygun MAC Klon metodunu seçiniz."
                       } ,{                      
                           type: "name",
                           title: "MAC Adresini KLONLAMA",
                           content: "Router'ın varsayılan MAC adresini değiştirmeyin. Değiştirildiği durumda, ISS atanmış IP adresini MAC adresi ile bağlamaz."
                       } ,{                      
                           type: "name",
                           title: "Şu Anki Bilgisayarın MAC Adresini Klonla",
                           content: "Router'a bağlı bulunan bilgisayarın mevcut MAC adresini kopyala'yı seçin, bu durumda ISS atanan IP adresini bilgisayarın MAC adresi ile bağlayacak."
                       } ,{                      
                           type: "name",
                           title: "Özel MAC Adresini kullan",
                           content: "MAC adresini manuel olarak girin, bu durumda ISS atanan IP adresini özel(belirlenen) MAC adresi ile bağlar."
                       }]
},
       INTERNET_WAN_AGGREGATION :{ 
               TITLE:"WAN Aggregation",
               CONTENT: [{
                           type: "paragraph",
                           id: "internet_wan_aggregation_detail",
                           content: "WAN Aggregation, LAN1 bağlantı noktasını ek bir WAN bağlantı noktasına dönüştürür ve tek bir yüksek bant genişliği veri yolu oluşturur. 1Gbps'den daha yüksek bant genişliği sağlayan ve artık ağ donanımınız tarafından sınırlandırılmayacak olan ISP'lerden daha hızlı internet açığa çıkarın."
                       } ,{                      
                           type: "note",
                           id: "internet_wan_aggregation_note",
                           title: "Uyarı",
                           content: "Bu özelliği etkinleştirmeden önce, ISS'nizin WAN Toplama'yı desteklediğinden ve modeminizin iki WAN bağlantı noktası bulunduğundan emin olun."
                       } ,{                      
                           type: "step",
                           title: "WAN aggregation uygulamak için",
       content: [ 
                "\"1. Etkinleştirmek için WAN Aggregation geçin.\"",
                "\"2. Kaydet'i tıklayın.\"",
                "\"3. Yönlendiricinin WAN bağlantı noktasını ve LAN1 bağlantı noktasını modeminizin iki Ethernet kablosuyla iki WAN bağlantı noktasına bağlayın.\""]
}]
},
       LAN_IPV4 :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Router'ın MAC adresi, IP adresi ve alt ağ maskesi görüntülenmektedir."
                       } ,{                      
                           type: "name",
                           title: "MAC Adresi",
                           content: "Router'ın Ethernet (LAN) portuna atanan tek fiziksel adrestir."
                       } ,{                      
                           type: "name",
                           title: "IP Adresi",
                           content: "Router'ın web yönetim sayfasında oturum açmak için kullanılan router'ın varsayılan IP adresi görüntülenmektedir. Başka bir adres ile değiştirebilirsiniz."
                       } ,{                      
                           type: "name",
                           title: "Alt Ağ Maskesi",
                           content: "Tanımlanan bir kimliğe, Dahili ve Harici trafiği LAN portu üzerinden yönlendirmek için seçiniz veya yeni bir alt ağ maskesi giriniz."
                       } ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Eğer yeni LAN IP adresi eskisiyle aynı alt ağda değilse, DHCP sunucundaki IP adres havuzu otomatik olarak yapılandırılacaktır; fakat Sanal Sunucu ve DMZ Ana Bilgisayar tekrar yapılandırılana kadar etkili olmayacaktır."
                       }]
},
       LINK_AGG :{ 
               TITLE:"Link Aggregation",
               CONTENT: [{
                           type: "paragraph",
                           content: "Link Aggregation, tek bir yüksek bant genişliği veri yolu oluşturmak için iki portu bir araya getirerek daha hızlı ve daha kararlı kablolu bağlantıyı sürdürebilir."
                       } ,{                      
                           type: "step",
                           id: "link_agg_step_help",
                           title: "Link aggregation kullanımı :",
       content: [ 
                "1. Link Aggregation özelliğini etkinleştirmek için açık konuma getirin.",
                "2. Link aggregation Için iki bağlantı noktası belirtin",
                "3. Kaydet butonuna tıklayınız."]
}]
},
       IPTV :{ 
               TITLE:"IPTV",
               CONTENT: [{
                           type: "paragraph",
                           content: "IPTV (Internet Protokol Televizyon), Internet veya LAN aracılığıyla Internet protokol paketlerini kullanarak anahtarlanmış bir paketlerin iletildiği televizyon servisidir. "
                       } ,{                      
                           type: "name",
                           id: "igmp-snooping",
                           title: "IGMP Araştırması",
                           content: "IGMP (Internet Grup Yönetimi Protokolü) Snooping özelliği talep edilen portlara sadece multicast trafiğin router'a yönlendirilmesini sağlar."
                       } ,{                      
                           type: "name",
                           title: "IGMP Vekil Sunucu(Proxy)",
                           content: "IGMP teknolojisini kullanarak IPTV servisi sağlayan ISP'lerde IGMP Proxy özelliğini etkinleştiriniz."
                       } ,{                      
                           type: "name",
                           title: "IGMP Sürümü",
                           content: "İSS'nize göre IGMP Sürümünü seçin. Varsayılan IGMP Sürümü V2'dir."
                       } ,{                      
                           type: "name",
                           id: "igmp-wifi",
                           title: "Kablosuz Çok Noktaya Yönlendirme",
                           content: "Kablosuz Multicast Yönlendirme özelliği, kablosuz ağ üzerinden multicast paketlerin yönlendirilmesini sağlar."
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "IGMP teknolojisini kullanmadan IPTV servisi sağlayan ISP'lerde IPTV özelliğini etkinleştiriniz."
                       } ,{                      
                           type: "name",
                           title: "ISP profili",
                           content: "Yapılandırmayı tamamlamak için uygun ISP (internet servis sağlayıcısı) profilini seçin. Üç tür profil vardır:",
       children: [{                      
                           type: "name",
                           title: "Ülke-ISS Adı",
                           content: "İSS profilleri varsayılan ayarları \"Ülke-ISP Adı\" şeklindedir.Basitçe listeden ISP nizi bulun ve seçin"
                       } ,{                      
                           type: "name",
                           id: "iptv_bridge_child_1to4",
                           title: "Köprü",
                           content: "Eğer İSS'niz listelenmemişse ve IPTV kurulumu için başka bir parametre gerekmiyorsa,basitçe bu profili seçip IPTV'ye ayrılmış LAN bağlantı noktasını belirleyebilirsiniz.",
       children: [{                      
                           type: "name",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "LAN portunun hangi tür veriyi ileteceğini belirleyin. Örneğin, LAN1 için IPTV seçilmişse, yalnızca IPTV verilerini gönderir ve set - up box ı LAN1'e bağlamanız gerekir."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_2to5",
                           title: "Köprü",
                           content: "Eğer İSS'niz listelenmemişse ve IPTV kurulumu için başka bir parametre gerekmiyorsa,basitçe bu profili seçip IPTV'ye ayrılmış LAN bağlantı noktasını belirleyebilirsiniz.",
       children: [{                      
                           type: "name",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "LAN portunun hangi tür veriyi ileteceğini belirleyin. Örneğin, LAN2 için IPTV seçilmişse,yalnızca IPTV verilerini gönderir ve set üstü kutuyu LAN2'ye bağlamanız gerekir."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_5to8",
                           title: "Köprü",
                           content: "Eğer İSS'niz listelenmemişse ve IPTV kurulumu için başka bir parametre gerekmiyorsa,basitçe bu profili seçip IPTV'ye ayrılmış LAN bağlantı noktasını belirleyebilirsiniz.",
       children: [{                      
                           type: "name",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "LAN portunun hangi tür veriyi ileteceğini belirleyin. Örneğin, LAN5 için IPTV seçilmişse,yalnızca IPTV verilerini gönderir ve set üstü kutuyu LAN5'e bağlamanız gerekir."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_1to4",
                           title: "Özel ",
                           content: "İSS'niz listede yoksa, ancak İnternet / VoIP / IPTV VLAN ID ve Öncelik gibi bazı gerekli parametreleri size sunuyorsa bu profili seçin.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Öncelik",
                           content: "ISP'niz tarafından sağlanan VLAN ID'lerini ve önceliklerini yapılandırınız."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Etiket",
                           content: "Internet paketlerini 802.11Q ile etiketleyip etiketlemeyeceğinizi seçin."
                       } ,{                      
                           type: "name",
                           title: "IPTV Çoklu VLAN ID/Öncelik",
                           content: "Gerektiğinde IPTV multicast özelliğini etkinleştirebilir ve ISP'nize uygun olarak VLAN ID ve Önceliklendirme ayarlarını yapılandırabilirsiniz."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "LAN portunun hangi tür veriyi ileteceğini belirleyin. Örneğin, LAN1 için IPTV seçilmişse, yalnızca IPTV verilerini gönderir ve set - up box ı LAN1'e bağlamanız gerekir."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_2to5",
                           title: "Özel ",
                           content: "İSS'niz listede yoksa, ancak İnternet / VoIP / IPTV VLAN ID ve Öncelik gibi bazı gerekli parametreleri size sunuyorsa bu profili seçin.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Öncelik",
                           content: "ISP'niz tarafından sağlanan VLAN ID'lerini ve önceliklerini yapılandırınız."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Etiket",
                           content: "Internet paketlerini 802.11Q ile etiketleyip etiketlemeyeceğinizi seçin."
                       } ,{                      
                           type: "name",
                           title: "IPTV Çoklu VLAN ID/Öncelik",
                           content: "Gerektiğinde IPTV multicast özelliğini etkinleştirebilir ve ISP'nize uygun olarak VLAN ID ve Önceliklendirme ayarlarını yapılandırabilirsiniz."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "LAN portunun hangi tür veriyi ileteceğini belirleyin. Örneğin, LAN2 için IPTV seçilmişse,yalnızca IPTV verilerini gönderir ve set üstü kutuyu LAN2'ye bağlamanız gerekir."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_5to8",
                           title: "Özel ",
                           content: "İSS'niz listede yoksa, ancak İnternet / VoIP / IPTV VLAN ID ve Öncelik gibi bazı gerekli parametreleri size sunuyorsa bu profili seçin.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Öncelik",
                           content: "ISP'niz tarafından sağlanan VLAN ID'lerini ve önceliklerini yapılandırınız."
                       } ,{                      
                           type: "name",
                           title: "802.11Q Etiket",
                           content: "Internet paketlerini 802.11Q ile etiketleyip etiketlemeyeceğinizi seçin."
                       } ,{                      
                           type: "name",
                           title: "IPTV Çoklu VLAN ID/Öncelik",
                           content: "Gerektiğinde IPTV multicast özelliğini etkinleştirebilir ve ISP'nize uygun olarak VLAN ID ve Önceliklendirme ayarlarını yapılandırabilirsiniz."
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "LAN portunun hangi tür veriyi ileteceğini belirleyin. Örneğin, LAN5 için IPTV seçilmişse,yalnızca IPTV verilerini gönderir ve set üstü kutuyu LAN5'e bağlamanız gerekir."
                       }]
}]
}]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"DHCP Sunucusu",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Varsayılan olarak, DHCP (Dinamik Host Konfigürasyon Protokolü) Sunucusu etkinleştirilmiştir; bu sunucu istemci cihazlara IP adresi havuzundan TCP/IP parametreleri atar.",
                "Başka bir DHCP sunucusuna sahip değilseniz veya ağınızdaki her istemci cihaza TCP/IP parametrelerini manuel olarak atamak istemiyorsanız, DHCP sunucusunu devre dışı bırakmayın."]
} ,{                      
                           type: "name",
                           title: "IP Adresi Havuzu",
                           content: "İstemcilere kiralanabilecek IP adreslerinin aralığını girin."
                       } ,{                      
                           type: "name",
                           title: "Adres Kira Süresi",
                           content: "Bir IP adresinin client'a kiralanacağı süreyi (1 ve 2880 dakika arasında) giriniz. Varsayılan değer 120 dakikadır."
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"Adres Ayırma",
               CONTENT: [{
                           type: "paragraph",
                           content: "IP adresinin rezerve edildiği cihazın ilgili parametreleri görüntülenir."
                       } ,{                      
                           type: "step",
                           title: "Bir IP adresi ayırmak için",
       content: [ 
                "1. Ekle'ye tıklayın.",
                "2. DHCP Client Listesinden şu anda bağlı bir cihaz seçin ve Tara butonuna tıklayın; veya MAC Adresi alanında client cihazınızın MAC adresini ve IP Adresi alanına ise client cihazınız için rezerve etmek istediğiniz IP adresini giriniz.",
                "3. Açıklama alanında client cihazınız için bir açıklama giriniz.",
                "4. Etkinleştir'i seçin.",
                "5. Kaydet butonuna tıklayınız."]
} ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Bu kaydı devre dışı bırakmak istiyorsanız, ampul ikonuna tıklayınız."
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"DHCP İstemci Listesi",
               CONTENT: [{
                           type: "paragraph",
                           content: "Şu anda bağlı cihazların bilgisi görüntülenmektedir."
                       }]
},
       DDNS :{ 
               TITLE:"Dinamik DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dinamik DNS (Dinamik Domain Adı Sistemi), dinamik Internet IP adresine sabit bir host ve domain adı atamasını sağlar. Router arkasında FTP sunucu veya başka bir sunucu üzerinde kendi websitenize sahipseniz bu özellik kullanışlıdır. Başlangıç olarak www.dyndns.com olarak bir Dinamik DNS servis sağlayıcında kaydolmanız gerekmektedir."
                       } ,{                      
                           type: "step",
                           title: "Dinamik DNS kurmak için",
       content: [ 
                "1. Dinamik DNS servis sağlayıcınızı seçin",
                "2. Dinamik DNS hesabının Kullanıcı Adı ve Şifresini giriniz.",
                "3. DDNS servis sağlayıcısından aldığınız Etki Alanı Adı'nı girin.",
                "4. Aşağı açılan listeden Güncelleme Aralığını seçiniz.",
                "5. Servis sağlayıcınız NO-IP ise, router'ın WAN IP'sine bağlı olan domain adının WAN IP Binding olduğundan emin olunuz.",
                "6. Oturum Aç ve Kaydet'e tıklayınız."]
} ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Yeni bir DDNS hesabı kullanmak istiyorsanız, öncelikle mevcut oturumu kapatın ve yeni hesap ile oturum açınız."
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"Dinamik DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "Dinamik DNS (Dinamik Domain Adı Sistemi), dinamik Internet IP adresine sabit bir host ve domain adı atamasını sağlar. Router arkasında FTP sunucu veya başka bir sunucu üzerinde kendi websitenize sahipseniz bu özellik kullanışlıdır. Başlangıç olarak www.dyndns.com olarak bir Dinamik DNS servis sağlayıcında kaydolmanız gerekmektedir."
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"Alan Adı Listesi",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bu tabloda, cloud hesabınıza kayıtlı tüm domain adlarının bilgisi görüntülenmektedir."
                       } ,{                      
                           type: "step",
                           title: "Yeni bir domain adı kaydetmek için",
       content: [ 
                "1. Kayıt Ol butonuna tıklayınız.",
                "2. Kaydetmek istediğiniz domain adını giriniz.",
                "3. Kaydet butonuna tıklayınız."]
}]
},
       ADVANCED_ROUTING_STATIC_ROUTING :{ 
               TITLE:"Statik Yönlendirme",
               CONTENT: [{
                           type: "paragraph",
                           content: "Statik yönlendirme belirlenen bir ana bilgisayara veya ağa ulaşmak amacıyla ağ bilgi paketleri için önceden belirlenen sabit yönlendirme için kullanılır. "
                       } ,{                      
                           type: "step",
                           title: "Statik Yönlendirme kurmak için",
       content: [ 
                "1. Ekle'ye tıklayın.",
                "2. Bu girişe statik rota atamak için Ağ Hedefi alanında bir IP adresi giriniz.",
                "3. IP adresinin ağ ve host bölümünü tanımlamak için Alt Ağ Maskesi alanında bir alt ağ maskesi giriniz.",
                "4. Ağ veya host'a router'ı bağlamak için Varsayılan Ağ Geçidi alanında bir ağ geçidi IP adresi giriniz.",
                "5. Ağ Hedefinin türünü belirlemek için Arabirim alanında LAN veya WAN seçiniz.",
                "6. Bu kayıt için kısa bir açıklama giriniz.",
                "7. Etkinleştir'i seçin.",
                "8. Kaydet butonuna tıklayınız."]
} ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Bu kaydı devre dışı bırakmak istiyorsanız, ampul ikonuna tıklayınız."
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"Sistem Yönlendirme Tablosu",
               CONTENT: [{
                           type: "paragraph",
                           content: "Şu anda kullanılan geçerli tüm rota kayıtları görüntülenmektedir."
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"Kablosuz Ayarları",
               CONTENT: [{
                           type: "paragraph",
                           content: "Gerekli olan kablosuz ayarları yapılandırınız."
                       }]
},
       OFDMA :{ 
               TITLE:"OFDMA",
               CONTENT: [{
                           type: "paragraph",
                           content: "OFDMA, birden fazla kullanıcının aynı anda veri iletmesini sağlar ve böylece hızı ve verimliliği büyük ölçüde geliştirir. Yalnızca alıcılar OFDMA'yı da desteklediğinde, avantajlardan tam olarak yararlanabilirsiniz."
                       }]
},
       WIRELESS_SMART_CONNECT :{ 
               TITLE:"Akıllı Bağlantı",
               CONTENT: [{
                           type: "paragraph",
                           content: "Akıllı bağlantıyı etkinleştirmek için bu onay kutusunu seçin. Bu işlev, ağ taleplerini dengelemek için mevcut koşulları temel alarak en iyi kablosuz bantları atayarak cihazların daha hızlı çalışmasına yardımcı olur."
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"Kablosuz 2.4GHz",
               CONTENT: [{
                           type: "name",
                           title: "Ağ Adı (SSID)",
                           content: "Ağ adı (SSID)'yi değiştirmeniz tavsiye edilir. Bu alan büyük/küçük harf duyarlıdır."
                       } ,{                      
                           type: "name",
                           title: "SSID'yi Gizle",
                           content: "Kablosuz ağ listesinden 2.4GHz ağ adını (SSID)'yi gizlemek istiyorsanız seçiniz. Seçildiğinde, SSID yayını kesilecek ve ağa manuel olarak bağlanmanız gerekmektedir."
                       } ,{                      
                           type: "name",
                           title: "Güvenlik",
                           content: "Belirtilen güvenlik seçeneklerinden birini seçin:",
       children: [{                      
                           type: "name",
                           title: "Güvenlik Yok",
                           content: "Kablosuz güvenliği devre dışı bırakmak için bu opsiyonu seçiniz. Kablosuz güvenliği devre dışı bırakmanız önerilmez."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Kişisel",
                           content: "Kablosuz güvenliği etkinleştirmek için bu opsiyonu seçiniz. Kablosuz ağınızı yetkisiz erişimlere karşı koruma altına almak için kesinlikle kablosuz güvenliği kullanın. Aşağıdaki alanları yapılandırınız.",
       children: [{                      
                           type: "name",
                           title: "Sürüm",
                           content: "Bir güvenlik sürümü seçiniz. WPA2-PSK daha güvenlidir. Emin değilseniz, Oto (Otomatik) seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Şifreleme",
                           content: "Bir güvenlik şifreleme türü seçiniz. AES daha güvenlidir. Router, 802.11n modunda çalışıyorsa TKIP şifreleme metodunu kullanmanız önerilmez. Ayrıca, TKIP kullanılırken WPS fonksiyonu devre dışı kalacaktır. Emin değilseniz, Oto (Otomatik) seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Şifre",
                           content: "Bu alana 8 ila 63 arasında ASCII karakter veya 8 ila 64 arasında heksadesimal karakterden oluşan bir kablosuz şifresi giriniz."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Zenginleştirilmiş",
                           content: "RADIUS (Arayan Kullanıcı Kimliğini Uzaktan Doğrulama Servisi)'ni kullanan daha gelişmiş kimlik doğrulama yöntemini etkinleştirmek için bu seçeneği seçin. Eğer seçilirse, WPS fonksiyonu devre dışı kalacaktır",
       children: [{                      
                           type: "name",
                           title: "Sürüm",
                           content: "Bir güvenlik sürümü seçiniz. WPA2 daha güvenlidir. Emin değilseniz, Oto (Otomatik) seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Şifreleme",
                           content: "Bir güvenlik şifreleme türü seçiniz. AES daha güvenlidir. Router, 802.11n modunda çalışıyorsa TKIP şifreleme metodunu kullanmanız önerilmez. Ayrıca, TKIP kullanılırken WPS fonksiyonu devre dışı kalacaktır. Emin değilseniz, Oto (Otomatik) seçiniz."
                       } ,{                      
                           type: "name",
                           title: "RADIUS Sunucu IP'si",
                           content: "RADIUS sunucusunun IP adresini girin."
                       } ,{                      
                           type: "name",
                           title: "RADIUS Portu",
                           content: "RADIUS sunucusunun port numarasını girin."
                       } ,{                      
                           type: "name",
                           title: "RADIUS Şifresi",
                           content: "RADIUS sunucusunun paylaşımlı şifresini girin."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Herhangi bir istemci aygıtı yalnızca WEP kullanarak Kablosuz'a (Kabloluya Eşdeğer Gizlilik) erişebiliyorsa temel kimlik doğrulama yöntemini etkinleştirmek için bu seçeneği belirleyin. Seçilirse, WPS işlevi devre dışı bırakılır.",
       children: [{                      
                           type: "name",
                           title: "Tür",
                           content: "Kablosuz ağınız için bir kimlik doğrulama türü seçiniz. Emin değilseniz, Oto (Otomatik) seçiniz."
                       } ,{                      
                           type: "name",
                           title: "WEP Anahtar Formatı",
                           content: "ASCII formatını kullanın veya Heksadesimal formatını seçin. ASCII formatı alfabetik ve sayısal karakterlerin birleşimidir. Heksadesimal format rakamların (0-9) ve harflerin (A-F, a-f) birleşimidir."
                       } ,{                      
                           type: "name",
                           title: "Anahtar Türü",
                           content: "Bir WEP anahtar uzunluğu seçin.",
       children: [{                      
                           type: "name",
                           title: "64-bit",
                           content: "WEP değeri alanına 10 tane heksadesimal formatta(0-9, A-F, a-f) hane veya 5 ASCII karakteri girmenize olanak sağlar."
                       } ,{                      
                           type: "name",
                           title: "128-bit",
                           content: "WEP değeri alanına 26 tane heksadesimal formatta(0-9, A-F, a-f) hane veya 13 ASCII karakteri girmenize olanak sağlar."
                       }]
} ,{                      
                           type: "name",
                           title: "Anahtar Değeri",
                           content: "İlgili alana WEP anahtarı girin."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Kanal ",
                           content: "2.4GHz kablosuz ağı için bir işletim kanalı seçin. Eğer kablosuz bağlantınızda kesintiler yoksa, bu kanalı otomatik olarak bırakmanız önerilir."
                       } ,{                      
                           type: "name",
                           title: "İletim Gücü",
                           content: "Veri iletim gücünü belirlemek için Yüksek, Orta veya Düşük seçeneklerinden birini seçin. Varsayılan ve önerilen ayar yüksek seçeneğidir."
                       } ,{                      
                           type: "name",
                           id: "atf_2g4",
                           title: "Airtime Fairness Özelliği",
                           content: "Airtime Fairness (ATF) özelliği her bir akışın verimliliğini optimize etmenize olanak sağlar. Etkinleştirmek için onay kutucuğunu seçiniz. ATF trafik çizelgesi, akış hedefleri arasında airtime işlemini dengede tutmak için hedef başına airtime hedefleri kullanır."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_2g4",
                           title: "Multi-User MIMO Özelliği",
                           content: "Multi-User MIMO Özelliğini kullanmak için Etkinleştir butonuna tıklayınız."
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"Kablosuz 5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Ağ Adı (SSID)",
                           content: "Ağ adı (SSID)'yi değiştirmeniz tavsiye edilir. Bu alan büyük/küçük harf duyarlıdır."
                       } ,{                      
                           type: "name",
                           title: "SSID'yi Gizle",
                           content: "Kablosuz ağ listesinden 5GHz ağ adını (SSID)'yi gizlemek istiyorsanız seçiniz. Seçildiğinde, SSID yayını kesilecek ve ağa manuel olarak bağlanmanız gerekmektedir."
                       } ,{                      
                           type: "name",
                           title: "Güvenlik",
                           content: "Belirtilen güvenlik seçeneklerinden birini seçin:",
       children: [{                      
                           type: "name",
                           title: "Güvenlik Yok",
                           content: "Kablosuz güvenliği devre dışı bırakmak için bu opsiyonu seçiniz. Kablosuz güvenliği devre dışı bırakmanız önerilmez."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Kişisel",
                           content: "Select this option to enable the wireless security. This is highly recommended to protect thewireless network from unauthorized access. If selected, configure the following.",
       children: [{                      
                           type: "name",
                           title: "Sürüm",
                           content: "Bir güvenlik sürümü seçiniz. WPA2-PSK daha güvenlidir. Emin değilseniz, Oto (Otomatik) seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Şifreleme",
                           content: "Bir güvenlik şifreleme türü seçiniz. AES daha güvenlidir. Router, 802.11n modunda çalışıyorsa TKIP şifreleme metodunu kullanmanız önerilmez. Ayrıca, TKIP kullanılırken WPS fonksiyonu devre dışı kalacaktır. Emin değilseniz, Oto (Otomatik) seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Şifre",
                           content: "Bu alana 8 ila 63 arasında ASCII karakter veya 8 ila 64 arasında heksadesimal karakterden oluşan bir kablosuz şifresi giriniz."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-Zenginleştirilmiş",
                           content: "RADIUS (Arayan Kullanıcı Kimliğini Uzaktan Doğrulama Servisi)'ni kullanan daha gelişmiş kimlik doğrulama yöntemini etkinleştirmek için bu seçeneği seçin. Eğer seçilirse, WPS fonksiyonu devre dışı kalacaktır",
       children: [{                      
                           type: "name",
                           title: "Sürüm",
                           content: "Bir güvenlik sürümü seçiniz. WPA2 daha güvenlidir. Emin değilseniz, Oto (Otomatik) seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Şifreleme",
                           content: "Bir güvenlik şifreleme türü seçiniz. AES daha güvenlidir. Router, 802.11n modunda çalışıyorsa TKIP şifreleme metodunu kullanmanız önerilmez. Ayrıca, TKIP kullanılırken WPS fonksiyonu devre dışı kalacaktır. Emin değilseniz, Oto (Otomatik) seçiniz."
                       } ,{                      
                           type: "name",
                           title: "RADIUS Sunucu IP'si",
                           content: "RADIUS sunucusunun IP adresini girin."
                       } ,{                      
                           type: "name",
                           title: "RADIUS Portu",
                           content: "RADIUS sunucusunun port numarasını girin."
                       } ,{                      
                           type: "name",
                           title: "RADIUS Şifresi",
                           content: "RADIUS sunucusunun paylaşımlı şifresini girin."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "Herhangi bir istemci aygıtı yalnızca WEP kullanarak Kablosuz'a (Kabloluya Eşdeğer Gizlilik) erişebiliyorsa temel kimlik doğrulama yöntemini etkinleştirmek için bu seçeneği belirleyin. Seçilirse, WPS işlevi devre dışı bırakılır.",
       children: [{                      
                           type: "name",
                           title: "Tür",
                           content: "Kablosuz ağınız için bir kimlik doğrulama türü seçiniz. Emin değilseniz, Oto (Otomatik) seçiniz."
                       } ,{                      
                           type: "name",
                           title: "WEP Anahtar Formatı",
                           content: "ASCII formatını kullanın veya Heksadesimal formatını seçin. ASCII formatı alfabetik ve sayısal karakterlerin birleşimidir. Heksadesimal format rakamların (0-9) ve harflerin (A-F, a-f) birleşimidir."
                       } ,{                      
                           type: "name",
                           title: "Anahtar Türü",
                           content: "Bir WEP anahtar uzunluğu seçin.",
       children: [{                      
                           type: "name",
                           title: "64-bit",
                           content: "WEP değeri alanına 10 tane heksadesimal formatta(0-9, A-F, a-f) hane veya 5 ASCII karakteri girmenize olanak sağlar."
                       } ,{                      
                           type: "name",
                           title: "128-bit",
                           content: "WEP değeri alanına 26 tane heksadesimal formatta(0-9, A-F, a-f) hane veya 13 ASCII karakteri girmenize olanak sağlar."
                       }]
} ,{                      
                           type: "name",
                           title: "Anahtar Değeri",
                           content: "İlgili alana WEP anahtarı girin."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "Kanal ",
                           content: "5GHz kablosuz ağı için bir çalışma kanalı seçin. Eğer kablosuz bağlantınızda kesintiler yoksa, bu kanalı otomatik olarak bırakmanız önerilir."
                       } ,{                      
                           type: "name",
                           title: "İletim Gücü",
                           content: "Veri iletim gücünü belirlemek için Yüksek, Orta veya Düşük seçeneklerinden birini seçin. Varsayılan ve önerilen ayar yüksek seçeneğidir."
                       } ,{                      
                           type: "name",
                           id: "atf_5g",
                           title: "Airtime Fairness Özelliği",
                           content: "Airtime Fairness (ATF) özelliği her bir akışın verimliliğini optimize etmenize olanak sağlar. Etkinleştirmek için onay kutucuğunu seçiniz. ATF trafik çizelgesi, akış hedefleri arasında airtime işlemini dengede tutmak için hedef başına airtime hedefleri kullanır."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_5g",
                           title: "Multi-User MIMO Özelliği",
                           content: "Multi-User MIMO Özelliğini kullanmak için Etkinleştir butonuna tıklayınız."
                       }]
},
       WPS :{ 
               TITLE:"WPS",
               CONTENT: [{
                           type: "paragraph",
                           content: "WPS (Wi-Fi Korumalı Kurulum), daha kolay bir metodla güvenli Wi-Fi bağlantısı oluşturmanızı sağlar."
                       } ,{                      
                           type: "name",
                           title: "Push Button (önerilen)",
       content: [ 
                "Bu metod, WPS özellikli cihazınızı kablosuz ağa kolaylıkla bağlamanızı sağlar.",
                "Ekrandaki WPS Başlat butonuna tıklayınız. 2 dakika içinde, client cihazındaki WPS butonuna basınız."]
} ,{                      
                           type: "name",
                           title: "Router'ın PIN'i",
       content: [ 
                "Varsayılan PIN'i, router'ın üzerindeki etikette bulabilirsiniz.",
                "Yeni bir PIN oluşturmak için Oluştur'a tıklayınız veya şu anki PIN'i varsayılan PIN'e geri yükleyiniz."]
} ,{                      
                           type: "name",
                           title: "İstemcinin PIN anahtarını girin",
       content: [ 
                "Bu metod, manuel olarak bir kablosuz cihazı eklemenizi sağlar.",
                "Bu alanda cihazın PIN'ini giriniz ve ardından Bağlan butonuna tıklayınız."]
}]
},
       WIRELESS_STATISTICS :{ 
               TITLE:"Wireless Stations Online",
               CONTENT: [{
                           type: "name",
                           title: "İstemci Numarası",
                           content: "İlgili kablosuz istemcilerin sayısını gösterir."
                       } ,{                      
                           type: "name",
                           title: "MAC Adresi",
                           content: "İlgili kablosuz istemcilerin MAC adresini gösterir."
                       } ,{                      
                           type: "name",
                           title: "Bağlantı Tipi",
                           content: "İlgili kablosuz istemcinin kablosuz frekans bandını (2.4GHz veya 5GHz) gösterir."
                       } ,{                      
                           type: "name",
                           title: "Güvenlik",
                           content: "İlgili kablosuz istemcinin güvenlik tipini gösterir."
                       } ,{                      
                           type: "name",
                           title: "Alınan Paket",
                           content: "İlgili kablosuz istemci tarafından alınan paket değerini gösterir."
                       } ,{                      
                           type: "name",
                           title: "Gönderilen Paket",
                           content: "İlgili kablosuz istemci tarafından gönderilen paket değerini gösterir."
                       } ,{                      
                           type: "paragraph",
                           content: "Bu sayfadaki bilgileri güncellemek için Yenile'ye tıklayın."
                       }]
},
       WIRELESS_SCHEDULE :{ 
               TITLE:"Kablosuz Programı",
               CONTENT: [{
                           type: "paragraph",
                           content: "Kablosuz Çizelge ile belirli bir periyot boyunca kablosuz sinyali devre dışı bırakabilirsiniz. Örneğin; 00:00 am ve 07:00 am arasında kablosuz sinyali devre dışı bırakabilirsiniz."
                       } ,{                      
                           type: "name",
                           title: "Kablosuz Kapanma Zamanı",
                           content: "Kablosuz sinyalin kapalı olduğu periyot(lar) görüntülenmektedir.",
       children: [{                      
                           type: "step",
                           title: "Kablosuz takvim kurulumu için",
       content: [ 
                "1. Ekle'ye tıklayın.",
                "2. Zaman periyodu ayarlanırken kablosuz sinyaliniz kapalı olacaktır.",
                "3. Tekrarlanan günleri seçiniz. \"Her Gün\" veya belirli günleri seçebilirsiniz.",
                "4. Kaydet'e tıklayın."]
}]
}]
},
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"Ayarlar",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bu fonksiyon, temel ağı açığa çıkarmaksızın misafirler için Wi-Fi erişimi sağlamasına olanak tanır."
                       } ,{                      
                           type: "name",
                           title: "Misafirlerin Birbiri Arasındaki Erişime İzin Ver",
                           content: "Misafir Ağ'daki kablosuz cihazların, ağ komşuları ve Samba, Ping, FTP servisleri ile iletişimini sağlamak için onay kutucuğunu seçiniz."
                       } ,{                      
                           type: "name",
                           id: "access_local",
                           title: "Misafirlerin Yerel Ağıma Erişmesine İzin Ver",
                           content: "Misafir Ağ'daki kablosuz cihazların, ağ komşuları ve Samba, Ping, FTP servisleri üzerinden temel ağ veya router'ın LAN portuna bağlı cihazlar ile iletişimini sağlamak için onay kutucuğunu seçiniz."
                       }]
},
       GUEST_NETWORK_WIRELESS :{ 
               TITLE:"Kablosuz 2.4GHz/5GHz",
               CONTENT: [{
                           type: "name",
                           title: "Misafir Ağını Etkinleştir",
                           content: "Misafir Ağı özelliğini etkinleştirmek için bu işaret kutucuğunu seçin."
                       } ,{                      
                           type: "name",
                           title: "Ağ Adı (SSID)",
                           content: "Varsayılan misafir SSID'sini kullanın veya 32 karaktere kadar yeni ad oluşturun."
                       } ,{                      
                           type: "name",
                           title: "SSID'yi Gizle",
                           content: "Eğer Wi-Fi ağ listesinden misafir SSID'sini gizlemek istiyorsanız bu işaret kutucuğunu seçin."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Şifre Güncelleme Sıklığı ",
                           content: "Misafir Ağ parolasının güncelleme aralığını seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Güvenlik",
                           content: "Asla şifreyi güncelleme seçeneğini seçerseniz, belirtilen güvenlik seçeneklerinden birini seçin:",
       children: [{                      
                           type: "name",
                           title: "Güvenlik Yok",
                           content: "Kablosuz güvenliği devre dışı bırakmak için bu opsiyonu seçiniz. Kablosuz güvenliği devre dışı bırakmanız önerilmez."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-Kişisel",
                           content: "Kablosuz güvenliği etkinleştirmek için bu opsiyonu seçiniz. Misafir Ağınızı yetkisiz erişimlere karşı koruma altına almak için kesinlikle kablosuz güvenliği kullanın. Aşağıdaki alanları yapılandırınız.",
       children: [{                      
                           type: "name",
                           title: "Sürüm",
                           content: "Bir güvenlik sürümü seçiniz. WPA2-PSK daha güvenlidir. Emin değilseniz, Oto (Otomatik) seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Şifreleme",
                           content: "Bir güvenlik şifreleme türü seçiniz. AES daha güvenlidir. Router, 802.11n modunda çalışıyorsa TKIP şifreleme metodunu kullanmanız önerilmez. Ayrıca, TKIP kullanılırken WPS fonksiyonu devre dışı kalacaktır. Emin değilseniz, Oto (Otomatik) seçiniz."
                       }]
} ,{                      
                           type: "name",
                           id: "portal-help-title",
                           title: "Portal",
                           content: "Portal kimlik doğrulama, clientların kablosuz ağınıza geçici olarak erişmesi gerektiğinde harici bir kimlik doğrulama istediği göndererek ağınızın güvenliğini artırır."
                       } ,{                      
                           type: "step",
                           id: "portal-help-content",
                           title: "Portal kimlik doğrulama kurulumu için:",
       content: [ 
                "1. Güvenlik için Portal seçiniz.",
                "2. Kimlik Doğrulama için Basit Parola veya Kimlik Doğrulama Devre Dışı seçiniz.",
                "A. Basit Parola -- Kimlik doğrulama için bir parola belirleyin (8-16 alfa karakterler, sayılar ve _).",
                "B. Kimlik Doğrulama Kapalı -- Clientlar herhangi bir kimlik doğrulama olmadan ağa erişebilir.",
                "3. Kimlik doğrulama zaman aşımı süresi seçin: 1 Saat, 2 Saat, 4 Saat veya Daima. Bir client'ın kimlik doğrulama süresi dolduğunda, kimlik doğrulama erişimi için tekrar oturum açması gerekir.",
                "4. (Opsiyonel) Yeniden Yönlendiri Etkinleştirin ve yönlendirilmek istenen URL adresini giriniz. Ardından client kimlik doğrulama işlemini geçtiğinde belirlenen URL adresine yönlendirilecektir.",
                "5. (Opsiyonel) Kimlik doğrulama giriş sayfasını özelleştirebilirsiniz.",
                "A. Portal Başlığı -- 31 karaktere kadar.",
                "B. Kullanım Koşulları -- 1023 karaktere kadar",
                "C. Logo -- JPG veya PNG formatında (100KB'dan az) bir logo yükleyiniz.",
                "D. Arka Plan Resmi -- JPG veya PNG formatında (2MB'dan az) bir arka plan resmi yükleyiniz.",
                "6. Kaydet butonuna tıklayınız."]
}]
} ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Şifre",
                           content: "Parolayı 8 - 63 ASCII karakteri olarak ya da 8 - 64 heksadesimal karakter (0-9, a-f, A-F) olarak seçin."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Şifre",
                           content: "Rasgele şifre oluşturmayı kullanabilir. 8 ve 63 arasında ASCII karakter veya heksadesimal sayı sisteminde(0-9, a-f, A-F) 8-64 karakter arası olacak şekilde şifre oluşturabilirsiniz."
                       }]
},
       NAT :{ 
               TITLE:"ALG",
               CONTENT: [{
                           type: "paragraph",
                           content: "Kablosuz güvenliği etkinleştirmek için bu opsiyonu seçiniz. Misafir Ağınızı yetkisiz erişimlere karşı koruma altına almak için kesinlikle kablosuz güvenliği kullanın. Aşağıdaki alanları yapılandırınız."
                       } ,{                      
                           type: "name",
                           title: "FTP ALG'yi etkinleştir",
                           content: "Eğer seçilirse, FTP (Dosya Aktarım Protokolü) istemcilerinin ve sunucularının NAT yoluyla veri aktarmasına olanak sağlar."
                       } ,{                      
                           type: "name",
                           title: "TFTP ALG'yi etkinleştir",
                           content: "Eğer seçilirse, TFTP (Önemsiz Dosya Aktarım Protokolü) istemcilerinin ve sunucularının NAT yoluyla veri aktarmasına olanak sağlar."
                       } ,{                      
                           type: "name",
                           title: "H323 ALG'yi etkinleştir",
                           content: "Eğer seçilirse, NetMeeting istemcilerinin NAT yoluyla iletişim kurmalarına olanak sağlar."
                       } ,{                      
                           type: "name",
                           title: "RTSP ALG'yi etkinleştir",
                           content: "Eğer seçilirse, ortam yürütücüsü istemcilerinin NAT yoluyla duraksız iletimli medya sunucularıyla iletişim kurmalarına olanak sağlar."
                       } ,{                      
                           type: "name",
                           title: "SIP ALG'yi Etkinleştir",
                           content: "Etkinleştirildiğinde, clientlar SIP (Oturum Başlatma Protokolü) sunucuları ile NAT üzerinden iletişim kurmasını sağlar."
                       } ,{                      
                           type: "name",
                           title: "PPTP Passthrough etkinleştir",
                           content: "Eğer seçilirse, noktadan noktaya olan oturumlarının IP ağı ve doğrudan router vasıtası ile tünel kurmasına olanak sağlar."
                       } ,{                      
                           type: "name",
                           title: "L2TP Passthrough etkinleştir",
                           content: "Eğer seçilirse, noktadan noktaya katman 2 oturumlarının IP ağı ve doğrudan router vasıtası ile tünel kurmasına olanak sağlar."
                       } ,{                      
                           type: "name",
                           title: "IPSec Passthrough etkinleştir",
                           content: "Etkinleştirildiğinde, router üzerinden geçilerek ve bir IP ağı üzerinden tünel oluşturularak Internet Protokolü Güvenliği (IPSec) bağlantısı sağlar. IPSec, IP ağları üzerinden özel ve güvenli iletişim sağlamak için kriptolu güvenlik servislerini kullanır."
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"Sanal Sunucular",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Sanal Sunucular yerel ağınızda kamu servisi kurulumu yapmanız için kullanılır. Sanal sunucu harici port olarak tanımlanır ve internetten bu harici porta gelen tüm istekler statik veya ayrılmış IP adresi ile yapılandırılmış olması gereken belirlenmiş bir bilgisayara yeniden yönlendirilecektir. ",
                "Yerel ağınızdaki bir sunucu kurduğunuzda ve Internet üzerinde bu sunucuyu paylaşıma açmak istediğinizde, Sanal Sunucular fonksiyonu servisleri çalıştırabilir ve Internet kullanıcılarına sağlayabilir."]
} ,{                      
                           type: "paragraph",
                           content: "Bu tabloda sanal sunucu ile ilgili parametreler görüntülenmektedir."
                       } ,{                      
                           type: "name",
                           title: "Servis Türü",
                           content: "Sanal sunucunun adı görüntülenmektedir."
                       } ,{                      
                           type: "name",
                           title: "Harici Port",
                           content: "Sanal sunucu tarafından kullanılan portu sayısını veya portlarının aralığını gösterir."
                       } ,{                      
                           type: "name",
                           title: "Dahili IP",
                           content: "Servis uygulamasında çalışan bilgisayarın IP adresini gösterir."
                       } ,{                      
                           type: "name",
                           title: "Dahili Port",
                           content: "Servis uygulamasında çalışan bilgisayarın portu sayısını gösterir."
                       } ,{                      
                           type: "name",
                           title: "Protokol",
                           content: "Servis uygulaması için kullanılan protokolü gösterir: TCP,UDP veya Tümü (Tüm protokoller router tarafından desteklenir.)"
                       } ,{                      
                           type: "name",
                           title: "Durum",
                           content: "Özel filtreleme kuralının mevcut durumunu (etkin veya devre dışı) gösterir."
                       } ,{                      
                           type: "name",
                           title: "Değiştir",
                           content: "İlgili kuralın Değiştir veya Sil seçeneğini gösterir."
                       } ,{                      
                           type: "step",
                           title: "Sanal sunucu kuralını yüklemek için",
       content: [ 
                "1. Ekle'ye tıklayın.",
                "2. Harici port ve Dahili port alanlarında uygun port değerlerini otomatik olarak doldurmak için ve listeden servis seçmek için Şu Anki Servisleri Göster'e tıklayın. Eğer servis listelenmemişse, harici port değeri girin (örn: 21) veya port aralığı girin (örn:21-25). Eğer dahili port harici port ile aynıysa dahili portu boş bırakın veya eğer harici port tek port ise özel bir port değeri girin (örn: 21).Dahili IP alanına, servis uygulamasını çalıştıran bilgisayarın IP adresini noktalı ondalık biçimde girin.",
                "3. Servis uygulaması için bir protokol seçin: TCP, UDP, veya açılır listedeki protokollerin hepsi.",
                "4. Etkinleştir'i seçin.",
                "5. Kaydet butonuna tıklayınız."]
} ,{                      
                           type: "note",
                           title: "Uyarı",
       content: [ 
                "1. Bu kaydı devre dışı bırakmak istiyorsanız, ampul ikonuna tıklayınız.",
                "2. Port ve protokol ayarları hakkında net bir bilginiz yoksa hahili Port ve protokol ayarlarını varsayılan değerlerde tutmanız önerilir.",
                "3. Yerel host cihazınızda birden fazla servisi barındırıyorsa, her bir servis için bir kural oluşturmanız gereklidir. Harici Portları birbiri ile çakışmadığından emin olunuz."]
}]
},
       PORT_TRIGGERING :{ 
               TITLE:"Port Tetikleme",
               CONTENT: [{
                           type: "paragraph",
                           content: "Port Tetikleme akışı belirli portundan ağdaki belirli bir sunucuya iletmek için kullanılır."
                       } ,{                      
                           type: "paragraph",
                           content: "Bu tabloda tetikleyici portların ilgili parametreleri görüntülenmektedir."
                       } ,{                      
                           type: "name",
                           title: "Uygulama",
                           content: "Uygulamanın adını gösterir."
                       } ,{                      
                           type: "name",
                           title: "Tetikleyici Port",
                           content: "Çıkış bağlantısının filtreleme kuralını tetiklemek için kullanılan çıkış akışını gösterir."
                       } ,{                      
                           type: "name",
                           title: "Tetikleyici Protokol",
                           content: "Tetikleme portu için kullanılan protokolü gösterir. TCP, UDP veya Tümü (Router tarafından desteklenen tüm protokoller)."
                       } ,{                      
                           type: "name",
                           title: "Harici Port",
                           content: "Uzak sistem tarafından kullanılan portunu veya port aralığını gösterir. Bu portlardan birini kullanan yanıt bu kuralı tetikleyen PC'ye iletilecektir. En fazla 5 grup port girebilirsiniz (veya port bölümü). Her bir port grubu virgül (,) ile ayrılmalıdır. Örneğin, 2000-2038i 2046, 2050-2051, 2085, 3010-3030."
                       } ,{                      
                           type: "name",
                           title: "Harici Protokol",
                           content: "Gelen portlar için kullanılan protokolü gösterir: TCP, UDP veya Tümü ( Tüm protokoller router tarafından desteklenir.)"
                       } ,{                      
                           type: "name",
                           title: "Durum",
                           content: "Özel filtreleme kuralının mevcut durumunu (etkin veya devre dışı) gösterir."
                       } ,{                      
                           type: "name",
                           title: "Değiştir",
                           content: "İlgili kuralın Değiştir veya Sil seçeneğini gösterir."
                       } ,{                      
                           type: "step",
                           title: "Port Tetikleyici kuralını kurmak için",
       content: [{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Her kural bir seferde sadece bir ana bilgisayar tarafından kullanılabilir."
                       },
                "1. Ekle'ye tıklayın.",
                "2. Varsayılan değerleri uygun alanlara otomatik olarak doldurmak için ve listeden uygulama seçmek için Şu Anki Uygulamaları Göster'e tıklayın. Eğer listelenmemiş bir uygulama eklemek istiyorsanız, uygulamayı, tetikleyici portu, tetikleyici protokolü, Harici portu ve harici protokolü manuel olarak girin.",
                "3. Etkinleştir'i seçin.",
                "4. Kaydet'e tıklayın."]
} ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Bu kuralı devre dışı bırakmak istiyorsanız, Ampul ikonuna tıklayınız."
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "DMZ (Korunmasız Bölge) host özelliği, video konferans veya Internet oyunları gibi özel bir amaca hizmet eden bir servis için yerel bir sunucuyu Internet'e savunmasız bir şekilde bağlamanıza olanak tanır. Aslında, DMZ fonksiyonu LAN'daki bir bilgisayara tüm portları açmayı sağlar. Bu bilgisayarda statik bir IP adresi yapılandırılmış olması ve DHCP client fonksiyonunun devre dışı bırakılmış olması gerek."
                       } ,{                      
                           type: "paragraph",
                           content: "DMZ etkinleştirildiğinde, DMZ host tamamen Internet'e maruz kalacak ve bu da bilgisayarda bazı potansiyel tehlikeler doğurabilir. DMZ kullanılmadığında devre dışı bırakınız."
                       } ,{                      
                           type: "step",
                           title: "DMZ sunucusu olacak şekilde bilgisayar veya sunucu atamak için",
       content: [ 
                "1. DMZ'yi etkinleştir'i seçin.",
                "2. DMZ ana bilgisayar IP Adresi alanında, DMZ ana bilgisayarı gibi kurulum yapmak için yerel bilgisayarın IP adresini girin.",
                "3. Kaydet butonuna tıklayınız."]
}]
},
       UPNP :{ 
               TITLE:"UPnP",
               CONTENT: [{
                           type: "paragraph",
                           content: "UPnP (Evrensel Tak ve Çalıştır) özelliği varsayılan olarak, yerel ağdaki bilgisayarları ve Internet aygıtlarını otomatik olarak keşfetmeyi ve birbirleri ile iletişimini sağlar."
                       } ,{                      
                           type: "paragraph",
                           content: "Çok oyunlu oyunlar, noktadan noktaya bağlantılar, gerçek zamanlı iletişim (VoIP veya teleVoIP konferans gibi) veya uzaktan yardım gibi uygulamaları kullanmak istiyorsanız UPnP fonksiyonunu etkinleştirmeniz gerekmektedir."
                       } ,{                      
                           type: "name",
                           title: "UPnP Servis Listesi",
                           content: "UPnP Servis Listesinde, yerel host(lar)ın UPnP bilgileri görüntülenmektedir."
                       }]
},
       MODEM :{ 
               TITLE:"3G/4G Yardımı",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB Modem",
                           content: "3G/4G USB modemin durumunu gösterir."
                       } ,{                      
                           type: "name",
                           title: "Otomatik Olarak Tanımlanan ISP Parametrelerini Kullan",
                           content: "Bu özellik varsayılan olarak etkindir. Etkinleştirildiğinde, router SIM/UIM kartı tanımlayacak ve ISP parametreleri otomatik olarak doldurulacaktır. Tanımlama başarısız olursa, Bölgenizi ve Mobil ISP'nizi manuel olarak seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Bölge",
                           content: "USB modem ve SIM kart tanımlama başarılı olduğunda bölge otomatik olarak seçilecek ve görüntülenecektir. Bölge seçimi başarısız olursa aşağı açılan listeden seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Mobil ISS",
                           content: "3G/4G ağın İnternet Servis Sağlayıcısını gösterir. Eğer otomatik olarak algılanmadığında İSS'yi aşağı açılır menüden seçin. Varsayılan Çevirme Numarası ve APN gerektiği gibi otomatik olarak doldurulacaktır."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "SIM/UIM Koruması etkinleştirildiğinde, PIN kodunu giriniz. SIM/UIM Koruması varsayılan olarak devre dışıdır. Unutmayınız ki 3 kez geçersiz PIN girerseniz, SIM/UIM kartı otomatik olarak kilitlenir. Sadece PC/Dizüstünden PUK kodunu girerek kilidi açabilirsiniz."
                       } ,{                      
                           type: "name",
                           title: "Mesaj",
                           content: "SIM/UIM kartın PIN Korumasının etkin olup olmadığı ile ilgili PIN bilgisi görüntülenmektedir."
                       } ,{                      
                           type: "name",
                           title: "Ayarlar Arama Numarası,APN,Kullanıcı Adı/Parola",
                           content: "ISP'niz, <strong>Mobil ISP</strong> listesinden yoksa, bu onya kutucuğunu seçin ve ISP'niz tarafından sağlanan Arama Numarası, APN (Erişim Noktası Adı), Kullanıcı Adı ve Şifreyi giriniz."
                       } ,{                      
                           type: "name",
                           title: "Arama Numarası",
                           content: "ISP tarafından sağlanan Arama Numarasını giriniz."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "ISP tarafından sağlanan APN (Erişim Noktası Adını) giriniz."
                       } ,{                      
                           type: "name",
                           title: "Kullanıcı Adı/Şifre",
                           content: "ISP tarafından sağlanan Kullanıcı Adını ve Şifreyi giriniz. Bu alanlar büyük / küçük harfe duyarlıdır."
                       } ,{                      
                           type: "name",
                           title: "Talep Üzerine",
                           content: "Bu modda, belirlenen boş kalma süresi (Maksimum Boş Zaman) tamamlandıktan sonra internet bağlantısı otomatik olarak sonlandırılacaktır. Internete tekrar erişmeye çalıştığınızda, bağlantı tekrardan kurulur."
                       } ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Bazen belirttiğiniz Maks. Boşta Kalma Süresi geçse bile bazı uygulamalar arka planda internete erişmeye devam ettiğinden bağlantı kesilemez."
                       } ,{                      
                           type: "name",
                           title: "Otomatik",
                           content: "Bu modda internet bağlantısı, bağlantının her kesilmesinde otomatik olarak tekrar bağlanacaktır."
                       } ,{                      
                           type: "name",
                           title: "Manuel",
                           content: "Bu modda İnternet bağlantısını manuel olarak kontrol etmek için Bağlan ya da Bağlantıyı kes düğmesini tıklatabilirsiniz. Bu mod aynı zamanda Maks. Boşta Kalma Süresi'ni de destekler. Maks. Boşta Kalma Süresi alanına bağlantısı kesilmeden önce İnternet bağlantısının maksimum ne kadar süre (dakika cinsinden) kullanılmadan durabileceğini girin. Varsayılan değer 15 dakikadır. Eğer internet bağlantısının her zaman etkin olmasını istiyorsanız 0 (sıfır) girin."
                       } ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Bazen belirttiğiniz Maks. Boşta Kalma Süresi geçse bile bazı uygulamalar arka planda internete erişmeye devam ettiğinden bağlantı kesilemez."
                       } ,{                      
                           type: "paragraph",
                           content: "Ayarlarınızı kaydetmek için Kaydet butonuna tıklayınız."
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"3G/4G Gelişmiş Ayarlar Yardımı",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB Modem",
                           content: "3G/4G USB modemin durumunu gösterir."
                       } ,{                      
                           type: "name",
                           title: "Otomatik Olarak Tanımlanan ISP Parametrelerini Kullan",
                           content: "Bu özellik varsayılan olarak etkindir. Etkinleştirildiğinde, router SIM/UIM kartı tanımlayacak ve ISP parametreleri otomatik olarak doldurulacaktır. Tanımlama başarısız olursa, Bölgenizi ve Mobil ISP'nizi manuel olarak seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Bölge",
                           content: "USB modem ve SIM kart tanımlama başarılı olduğunda bölgeniz otomatik olarak seçilecek ve görüntülenecektir. Eğer başarısız olursa aşağı açılan menüden bölgenizi seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Mobil ISS",
                           content: "3G/4G ağın İnternet Servis Sağlayıcısını gösterir. Eğer otomatik olarak algılanmadığında İSS'yi aşağı açılır menüden seçin. Varsayılan Çevirme Numarası ve APN gerektiği gibi otomatik olarak doldurulacaktır."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "SIM/UIM Koruması etkinleştirildiğinde, PIN kodunu giriniz. SIM/UIM Koruması varsayılan olarak devre dışıdır. Unutmayınız ki 3 kez geçersiz PIN girerseniz, SIM/UIM kartı otomatik olarak kilitlenir. Sadece PC/Dizüstünden PUK kodunu girerek kilidi açabilirsiniz."
                       } ,{                      
                           type: "name",
                           title: "Mesaj",
                           content: "SIM/UIM kartın PIN Korumasının etkin olup olmadığı ile ilgili PIN bilgisi görüntülenmektedir."
                       } ,{                      
                           type: "name",
                           title: "Ayarlar Arama Numarası,APN,Kullanıcı Adı/Parola",
                           content: "ISP'niz, <strong>Mobil ISP</strong> listesinden yoksa, bu onya kutucuğunu seçin ve ISP'niz tarafından sağlanan Arama Numarası, APN (Erişim Noktası Adı), Kullanıcı Adı ve Şifreyi giriniz."
                       } ,{                      
                           type: "name",
                           title: "Arama Numarası",
                           content: "ISP tarafından sağlanan Arama Numarasını giriniz."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "ISP tarafından sağlanan APN (Erişim Noktası Adını) giriniz."
                       } ,{                      
                           type: "name",
                           title: "Kullanıcı Adı/Şifre",
                           content: "ISP tarafından sağlanan Kullanıcı Adını ve Şifreyi giriniz. Bu alanlar büyük / küçük harfe duyarlıdır."
                       } ,{                      
                           type: "name",
                           title: "Talep Üzerine",
                           content: "Bu modda, belirlenen boş kalma süresi (Maksimum Boş Zaman) tamamlandıktan sonra internet bağlantısı otomatik olarak sonlandırılacaktır. Internete tekrar erişmeye çalıştığınızda, bağlantı tekrardan kurulur."
                       } ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Bazen belirttiğiniz Maks. Boşta Kalma Süresi geçse bile bazı uygulamalar arka planda internete erişmeye devam ettiğinden bağlantı kesilemez."
                       } ,{                      
                           type: "name",
                           title: "Otomatik",
                           content: "Bu modda internet bağlantısı, bağlantının her kesilmesinde otomatik olarak tekrar bağlanacaktır."
                       } ,{                      
                           type: "name",
                           title: "Manuel",
                           content: "Bu modda İnternet bağlantısını manuel olarak kontrol etmek için Bağlan ya da Bağlantıyı kes düğmesini tıklatabilirsiniz. Bu mod aynı zamanda Maks. Boşta Kalma Süresi'ni de destekler. Maks. Boşta Kalma Süresi alanına bağlantısı kesilmeden önce İnternet bağlantısının maksimum ne kadar süre (dakika cinsinden) kullanılmadan durabileceğini girin. Varsayılan değer 15 dakikadır. Eğer internet bağlantısının her zaman etkin olmasını istiyorsanız 0 (sıfır) girin."
                       } ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Bazen belirttiğiniz Maks. Boşta Kalma Süresi geçse bile bazı uygulamalar arka planda internete erişmeye devam ettiğinden bağlantı kesilemez."
                       } ,{                      
                           type: "name",
                           title: "Kimlik Doğrulama Tipi",
                           content: "Kimlik doğrulama türünü seçiniz. Varsayılan Otomatik ayarlıdır. Bazı ISP'ler belirli bir kimlik doğrulama türünü gerektirir, lütfen ISP'nizden doğrulayınız veya varsayılan ayarları tutunuz."
                       } ,{                      
                           type: "name",
                           title: "Otomatik",
                           content: "Otomatik (varsayılan) ayarlıysa, router otomatik olarak ISP tarafından kullanılan kimlik doğrulama türünü belirler."
                       } ,{                      
                           type: "name",
                           title: "PAP",
                           content: "Eğer PAP (Password Authentication Protocol) ise router iki el sıkışmayı kullanarak karşı tarafla kimlik doğrulaması yapar. İSS'niz bu kimlik doğrulaması türünü gerektiriyorsa bu öğeyi seçin."
                       } ,{                      
                           type: "name",
                           title: "CHAP",
                           content: "Eğer CHAP (Challenge Handshake Authentication Protocol) ise router karşı tarafla üç el sıkışma ile kimlik doğrulaması yapar ve karşı tarafın kimliğini düzenli olarak doğrular. İSS'niz bu kimlik doğrulaması türünü gerektiriyorsa bu öğeyi seçin."
                       } ,{                      
                           type: "name",
                           title: "MTU Boyutu",
                           content: "Varsayılan MTU (Maksimum İletim Birimi) büyüklüğü 1480 bayttır. ISP tarafından gerekli olmadıkça değiştirmeyiniz."
                       } ,{                      
                           type: "name",
                           title: "Aşağıdaki DNS Sunucusunu kullan",
                           content: "Eğer ISP, DNS sunucusu IP adreslerini sağlarsa, bu onay kutusunu seçiniz ve <strong>Birincil DNS </strong> ve İkincil DNS (isteğe bağlı) IP adresleri aşağıya giriniz. Aksi halde, DNS sunucuları dinamik olarak ISP tarafından atanmış olacaktır."
                       } ,{                      
                           type: "name",
                           title: "Birincil DNS",
                           content: "ISP tarafından sağlanan noktalı-ondalık gösterime DNS IP adresini giriniz. "
                       } ,{                      
                           type: "name",
                           title: "İkincil DNS",
                           content: "(İsteğe bağlı) ISP tarafından sağlanan noktalı-ondalık gösterime DNS IP adresini giriniz. "
                       } ,{                      
                           type: "paragraph",
                           content: "Ayarları kaydetmek için <strong>Kaydet</strong> butonunu tıklayınız.."
                       }]
},
       DISK_SETTING :{ 
               TITLE:"Cihaz Ayarları",
               CONTENT: [{
                           type: "paragraph",
                           content: "Cihaz Ayarları sayfası USB portu aracılığıyla bağlanmış olan herhangi bir USB bellek cihazının ilgili bilgisini gösterir."
                       } ,{                      
                           type: "name",
                           title: "Tara",
                           content: "Genellikle, router otomatik olarak yeni takılmış cihazı algılar. Eğer algılamıyorsa, herhangi yeni bağlanan cihazı taramak için bu butona basın ve güncellenmiş bilgiyle sayfayı yenileyin."
                       } ,{                      
                           type: "name",
                           title: "Birim ",
                           content: "USB biriminin adını gösterir."
                       } ,{                      
                           type: "name",
                           title: "Kapasite",
                           content: "USB'nin toplam bellek kapasitesini gösterir."
                       } ,{                      
                           type: "name",
                           title: "Boş Alan",
                           content: "Mevcut ve musait boş bellek alanını gösterir."
                       } ,{                      
                           type: "name",
                           title: "Güvenli bir şekilde Kaldır",
                           content: "Fiziksel olarak USB belleğin router'dan bağlantısını kesmeden önce, USB bellek cihazını güvenli bir şekilde kaldırmak için bu butona tıklayın."
                       } ,{                      
                           type: "paragraph",
                           content: "Kaldır butonu USB depolama aygıtı sadece router'â bağlı olduğunda görünmektedir. Birim şu anda meşgul olduğunda, devreden çıkarma işlemi yapılamaz."
                       } ,{                      
                           type: "name",
                           title: "Durum",
                           content: "Bu işaret kutucuğu sadece router'a bağlı bir USB bellek cihazı varsa belirir. USB cihazının dosya paylaşımını etkinleştirmek için bu seçeneği seçin."
                       } ,{                      
                           type: "step",
                           title: "Dosya sunucusu kurmak için",
       content: [ 
                "1. USB kablosu kullanarak USB bellek cihazını router'ın USB portuna takın.",
                "2. Yeni takılan USB cihazı router tarafından otomatik olarak algılanmalıdır ve bilgiler Cihaz Ayarları kısmında görünmelidir. Eğer algılanmadıysa, görünmüyorsa, Tara'ya tıklayın.",
                "3. Dosya paylaşımını etkinleştirmek için Aktif'i seçin."]
}]
},
       FOLDER_SHARE_ACCOUNT :{ 
               TITLE:"Paylaşım Hesabı",
               CONTENT: [{
                           type: "name",
                           title: "Hesap",
                           content: "Paylaşılan dosyalara ve klasörlere giriş yapmak için Varsayılan Hesabı Kullan'ı seçebilirsiniz veya Yeni Hesap Kullan'ı seçebilirsiniz ve yeni kullanıcı hesabı oluşturmak için belirtilenleri girin."
                       } ,{                      
                           type: "name",
                           title: "Kullanıcı Adı/Şifre",
                           content: "Kullanıcı adını 1 ila 15 harf ve sayı ya da alt çizgili karakter dizisi olarak ve parolayı 1 ila 15 ASCII karakter olarak girin. Bu alanlar, büyük-küçük harf duyarlıdır."
                       } ,{                      
                           type: "name",
                           title: "Şifreyi Onayla",
                           content: "Yazım yanlışı olmadığını onaylamak için şifrenizi tekrar girin. Bu alan büyük-küçük harf duyarlıdır."
                       } ,{                      
                           type: "paragraph",
                           content: "Tüm ayarları kaydetmek için Kaydet butonuna tıklayınız."
                       }]
},
       FOLDER_SHARE_SETTINGS :{ 
               TITLE:"Paylaşım Ayarları",
               CONTENT: [{
                           type: "name",
                           title: "Ağ/Medya Sunucusu Adı",
                           content: "Bağlı bulunan USB bellek cihazına erişim için kullanılan adı gösterir."
                       } ,{                      
                           type: "name",
                           title: "Etkinleştir",
                           content: "Erişim yöntemini etkinleştirmek için seçin."
                       } ,{                      
                           type: "name",
                           title: "Erişim Yöntemi",
                           content: "Bağlı bulunan USB bellek cihazına erişime izin vermek için üç erişim yöntemi vardır. İlgili işaret kutucularını seçerek bir veya daha fazla erişim yöntemi seçebilirsiniz.",
       children: [{                      
                           type: "name",
                           title: "Ağ Komşuları",
                           content: "Etkinleştirildiğinde, ağdaki kullanıcılar tahsis edilen IP adresini kullanarak USB depolama aygıtına erişebilir (ör. \\\\192.168.0.1)."
                       } ,{                      
                           type: "name",
                           title: "FTP ",
                           content: "Etkinleştirildiğinde, yerel ağdaki FTP clientları tahsis edilen IP adresi ve FTP sunucusunun port numarasını (ör. 192.168.0.1:21) kullanarak USB depolama aygıtına erişebilir."
                       } ,{                      
                           type: "name",
                           title: "FTP (Internet aracılığıyla)",
                           content: "Eğer etkinleştirilmişse, Internet üzerinden FTP aracılığıyla kullanıcılar USB bellek sürücüsüne uzaktan erişebilirler. Bu özellik hem indirilen hem yüklenen dosyaları destekler. FTP sunucusunun port sayısını değiştirmek için port sayısı girin ve değişiklikleri uygulamak için Kaydet'e tıklayın."
                       }]
} ,{                      
                           type: "name",
                           title: "Bağlantı",
                           content: "Paylaşılan USB bellek cihazına erişmek için kullanılan adresi gösterir."
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "FTP sunucusunun port numarasını görüntüler. Varsayılan değer olan 21'i ya da 1024 ila 65535 arası bir değeri kullanın."
                       } ,{                      
                           type: "paragraph",
                           content: "Tüm ayarları kaydetmek için Kaydet butonuna tıklayınız."
                       }]
},
       FOLDER_SHARE_FOLDERS :{ 
               TITLE:"Dosya Paylaşımı",
               CONTENT: [{
                           type: "name",
                           title: "Tümünü Paylaş",
                           content: "Tüm dosya ve klasörleri paylaşmak için Açın veta sadece seçili klasörleri paylaşmak için Kapatın."
                       } ,{                      
                           type: "name",
                           title: "Kimlik Doğrulamayı Etkinleştir",
                           content: "Kullanıcıların paylaşılan dosyalara erişmesi için geçerli kullanıcı adı ve şifresi girmesini gerektiren kimlik doğrulamayı etkinleştirmeniz kesinlikle önerilir."
                       } ,{                      
                           type: "name",
                           title: "Klasör Adı",
                           content: "Paylaşılan dosyanın adını gösterir."
                       } ,{                      
                           type: "name",
                           title: "Klasör Dizini",
                           content: "Dosyanın paylaşım yolunu gösterir."
                       } ,{                      
                           type: "name",
                           title: "Medya Paylaşımı",
                           content: "Paylaşılan dosyanın medya paylaşımına izin verilip verilmediğini gösterir."
                       } ,{                      
                           type: "name",
                           title: "Birim Adı",
                           content: "Paylaşılan birimin adını gösterir."
                       } ,{                      
                           type: "name",
                           title: "Durum",
                           content: "Ampul göstergesiyle paylaşılan klasörün durumunu gösterir."
                       } ,{                      
                           type: "name",
                           title: "Değiştir",
                           content: "İlgili paylaşılan klasörün Değiştir veya Sil seçeneklerini gösterir."
                       } ,{                      
                           type: "name",
                           title: "Göz At",
                           content: "Paylaşılan klasörü aramak için tıklayın."
                       } ,{                      
                           type: "name",
                           title: "Misafir Ağ Erişimine İzin Ver",
                           content: "Misafir Ağındaki istemcilerin paylaşılan dosyaya erişimine izin vermek için seçin."
                       } ,{                      
                           type: "name",
                           title: "Kimlik Doğrulamayı Etkinleştir",
                           content: "Kullanıcıların paylaşılan klasörlere erişmesi için geçerli bir kullanıcı adı ve şifresi girmesini gerektirmesini istiyorsanız seçin."
                       } ,{                      
                           type: "name",
                           title: "Yazma Erişimini Etkinleştir",
                           content: "Kullanıcıların klasör içeriğinde değişiklikler yapmasına izin vermek için seçin."
                       } ,{                      
                           type: "name",
                           title: "Medya Paylaşımını Etkinleştir",
                           content: "Medya paylaşımını etkinleştirmek için seçin."
                       } ,{                      
                           type: "name",
                           title: "Yenile",
                           content: "Paylaşılan Klasör Listesini güncellemek için tıklayın."
                       }]
},
       PRINT_SERVER :{ 
               TITLE:"Yazdırma Sunucusu",
               CONTENT: [{
                           type: "name",
                           title: "Yazdırma Sunucusu",
                           content: "Yazdırma Sunucusu fonksiyonunu etkinleştirmek için anahtarı etkin konuma getiriniz."
                       } ,{                      
                           type: "name",
                           title: "Yazıcı Adı",
                           content: "Router'a bağlı olan yazıcının adı görüntülenmektedir."
                       }]
},
       TIME_MACHINE :{ 
               TITLE:"Time Machine",
               CONTENT: [{
                           type: "paragraph",
                           content: "Time Machine fonksiyonu ile Mac bilgisayarınızdaki tüm dosyaları modem router'ınıza bağlı bir USB depolama aygıtına yedekler."
                       } ,{                      
                           type: "name",
                           title: "aktif",
                           content: "Time Machine fonksiyonunu etkinleştirmek için onay kutucuğunu işaretleyiniz."
                       } ,{                      
                           type: "name",
                           title: "Yedekleme Diski",
                           content: "Time Machine yedeklemesi için bir konum seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Yedeklemeler için Limit Boyut",
                           content: "Time Machine yedeklemesi için ayrılacak olan disk kapasitesini belirleyebilirsiniz. 0 değeri alan için limit olmadığını belirtir."
                       } ,{                      
                           type: "name",
                           title: "Kaydet",
                           content: "Ayarlarınızı kaydetmek için tıklayınız."
                       }]
},
       OFFLINE_DOWNLOAD :{ 
               TITLE:"Çevrimdışı İndir",
               CONTENT: [{
                           type: "paragraph",
                           content: "Çevrimdışı İndir etkinleştirildiğinde, bilgisayarınızı her zaman açık tutmanıza gerek kalmadan router üzerinden dosyaları indirebilirsiniz."
                       } ,{                      
                           type: "name",
                           title: "Durum",
                           content: "Çevrimdışı Yükleme özelliğini etkinleştirmek için anahtarı etkin konuma getiriniz."
                       } ,{                      
                           type: "name",
                           title: "Klasör Dizini",
                           content: "İndirdiklerinizi saklamak veya depolamak için bir hedef dizin yolu seçiniz.",
       children: [{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Yükleme veya dosya indirirken USB depolama aygıtını çıkarmayınız ya da dizin yolunu değiştirmeyiniz; aksi takdirde bazı hatalar ortaya çıkabilir."
                       }]
} ,{                      
                           type: "name",
                           title: "Takvim",
                           content: "Takvim özelliğini kullanarak dosyaları belirli bir zaman periyodunda indirmek/yüklemek için onay kutucuğunu seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Görev Tamamlandıktan Sonra Yüklemeyi Sakla",
                           content: "Diğerleri için tamamlanmış indirmelerin verilerini tutmak için onay kutusunu seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Aktif İndirmelerin Maksimum Sayısı",
                           content: "Aktif indirmelerin maksimum sayısını ayarlamak için 1 ila 10 arasında bir değer giriniz. Varsayılan değer 5'tir."
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"Yüklenenler",
               CONTENT: [{
                           type: "note",
                           title: "Dosya",
                           content: "İndirilen dosyanın türü ve adı görüntülenir."
                       } ,{                      
                           type: "note",
                           title: "Hız",
                           content: "Şu anki indirme (veya yükleme) hızını gösterir."
                       } ,{                      
                           type: "note",
                           title: "Tamamlandı",
                           content: "İndirmenin ilerleme durumunu gösterir."
                       } ,{                      
                           type: "note",
                           title: "Kalan Süre",
                           content: "İndirmenin kalan süresini gösterir."
                       } ,{                      
                           type: "note",
                           title: "Bağlı Eşler",
                           content: "İndirilenin bağlantılı eşlerin sayısını gösterir."
                       } ,{                      
                           type: "note",
                           title: "Durum",
                           content: "Şu anki indirilenin (yükleme, bekleme, kaynak, durdurulmuş, tamamlanmış ya da hata) durumunu gösterir."
                       } ,{                      
                           type: "name",
                           title: "Yeni bir indirme eklemek için",
       children: [{                      
                           type: "step",
       content: [ 
                "1. Ekle'ye tıklayın.",
                "2. URL, USB veya PC'den indirmek istediğiniz indirmenin kaynağını seçiniz.",
                "3. BT için torrent lokasyonu seçiniz veya FTP, HTTP ve aMule için URL giriniz.",
                "4. Kaydet'e tıklayın.",
                "5. aMule için, Gelişmiş > aMule Sunucu menüsünden aMule sunucu IP adresi ve port numarasını belirleyiniz."]
}]
} ,{                      
                           type: "name",
                           title: "İndirmeyi silmek için",
                           content: "Silmek istediğiniz indirme(ler)in karşılığındaki onay kutucuğunu seçiniz, ardından tablonun yukarısındaki Sil butonuna tıklayınız."
                       } ,{                      
                           type: "name",
                           title: "İndirmeyi duraklatmak için",
                           content: "Duraklatmak istediğiniz indirme(ler)in karşılığındaki onay kutucuğunu seçiniz, ardından tablonun yukarısındaki Duraklat butonuna tıklayınız."
                       } ,{                      
                           type: "name",
                           title: "İndirmeye devam etmek için",
                           content: "Devam etmek istediğiniz indirme(ler)in karşılığındaki onay kutucuğunu seçiniz, ardından tablonun yukarısındaki Devam Et butonuna tıklayınız."
                       }]
},
       OFFLINE_DOWNLOAD_ADVANCED :{ 
               TITLE:"Gelişmiş",
               CONTENT: [{
                           type: "name",
                           title: "Hız Limiti",
                           content: "Internet bağlantınız için maksimum indirme ve yükleme hızı belirleyiniz."
                       } ,{                      
                           type: "name",
                           title: "Maksimum İndirme Hızı",
                           content: "Maksimum indirme hızını ayarlamak için 1 ila 100000 kB/s arasında bir değer giriniz. Varsayılan değer 1024'tür."
                       } ,{                      
                           type: "name",
                           title: "Maksimum Yükleme Hızı",
                           content: "Maksimum yükleme hızını ayarlamak için 1 ila 100000 kB/s arasında bir değer giriniz. Varsayılan değer 512'dir."
                       } ,{                      
                           type: "name",
                           title: "Bağlantıların Sayısı",
                           content: "Maksimum bağlantı sayısını belirtinız."
                       } ,{                      
                           type: "name",
                           title: "Bağlantıların Global Maksimum Sayısı",
                           content: "Global maksimum bağlantı sayısını ayarlamak için 1 ila 200 arasında bir değer giriniz. Varsayılan değer 100'dür."
                       } ,{                      
                           type: "name",
                           title: "Torrent Başına Bağlı Eşlerin Maksimum Sayısı",
                           content: "1 ila 100 arasında torrent başına bağlı maksimum eş sayısını ayarlamak için bir değer giriniz. Varsayılan değer 50'dir."
                       } ,{                      
                           type: "name",
                           title: "DHT Ağını Etkinleştir",
                           content: "Bu özellik etkinleştirildiğinde eşler arasında bağlantı verimliliği artacak, böylece indirme hızınız da artacaktır."
                       } ,{                      
                           type: "name",
                           title: "Eşler Değişimini Etkinleştir",
                           content: "Bu özellik etkinleştirildiğinde eşlerin grubu arasında iletişim verimliliği artacak, böylece indirme hızınız da artacaktır."
                       } ,{                      
                           type: "name",
                           title: "BitTorrent Protokol Şifrelemesini Etkinleştir",
                           content: "Veri aktarım işlemi sırasında gizliliği güçlendirmek için bu özelliği etkinleştiriniz."
                       } ,{                      
                           type: "name",
                           title: "aMule Sunucusu",
                           content: "aMule sunucusunun portunu ve IP adresini giriniz. Router sunucu ile bağlandığında aMule sadece indirmeyi çalıştırır."
                       }]
},
       PARENTAL_CONTROL :{ 
               TITLE:"Ebeveyn Kontrolleri",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ebeveyn Kontrolü ile uygunsuz, açık seçik ve kötü niyetli websitelerini engelleyebilir; günün belirli zamanlarında erişimi kısıtlayabilirsiniz (örn.  Facebook veya YouTube gibi siteleri ödev zamanında kısıtlama)."
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"Ebeveyn Kontrolündeki Cihazlar",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bu tabloda, Ebeveyn Kontrollerinde şu anda kısıtlanan cihazların ayarları ve bilgisi görüntülenmektedir."
                       } ,{                      
                           type: "step",
                           title: "Yeni bir istemci cihazı kısıtlamak için",
       content: [ 
                "1. Ebeveyn Kontrollerini Etkinleştir.",
                "2. Ekle butonuna tıklayın.",
                "3. Erişim Cihazları Listesinde şu anda bağlı bir cihazı seçmek için Tara butonuna tıklayın; veya cihaz bağlı değilse manuel olarak eklemek için Cihaz Adı ve MAC Adresini girin.",
                "4. Kısıtlamaların geçerli olacağı zaman periyodunu belirlemek için Efektif Zaman ikonuna tıklayınız.",
                "5. Açıklama alanına kısa bir açıklama giriniz. Bu alan opsiyoneldir.",
                "6. Bu kaydı Etkinleştirmek için seçiniz.",
                "7. Kaydet'e basın."]
} ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Bu kaydı devre dışı bırakmak istiyorsanız, ampul ikonuna tıklayınız."
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"İçerik Kısıtlaması",
               CONTENT: [{
                           type: "paragraph",
                           content: "İçerik Kısıtlama fonksiyonu, domain adları ve anahtar kelime kullanarak belirli web sitelerine erişimi kısıtlamanıza olanak sağlar. Client cihazları Ebeveyn Kontrollerinin kontrolü altındadır ve seçtiğiniz kısıtlama ilkesine bağlı olarak bu websitelerine erişilemez."
                       } ,{                      
                           type: "step",
                           title: "Belirli bir içeriğe erişmek için",
       content: [ 
                "1. İçerik Kısıtlamasını Etkinleştir.",
                "2. İhtiyaçlarınıza uygun olan Kısıtlama Politikasını seçiniz:",
                "A. Tanımlanan cihazların belirli web siteleri ile erişimini kısıtlamak istiyorsanız Kara Listeyi seçiniz.",
                "B. Tanımlanan cihazların belirli web siteleri ile erişimine izin vermek istiyorsanız Beyaz Listeyi seçiniz.",
                "3. Kara Listeye veya Beyaz Listeye domain adı veya bir web adresinin anahtar kelimesini (örn. Wikipedia) eklemek için Yeni Anahtar Kelime Ekle butonuna tıklayınız.",
                "4. Kaydet'e tıklayın."]
}]
},
       PARENTAL_CONTROL_V2 :{ 
               TITLE:"Ebeveyn Kontrolleri",
               CONTENT: [{
                           type: "paragraph",
                           content: "Kullanıcı profilleri, içerik filtresi ve erişim sınırları ile Ebeveyn Denetimleri, ailenizin her bir üyesine kişiselleştirilmiş ve uygun internet erişimi sağlar."
                       } ,{                      
                           type: "step",
                           title: "Yeni bir aygıta Ebeveyn Denetimlerini uygulamak için",
       content: [ 
                "1. Ekle'ye tıklayın.",
                "2. Bu profil için bir ad girin ve bu profilin altına cihaz(lar) eklemek için \"+\" düğmesine tıklayın.",
                "3. Engellenen İçeriği ihtiyaçlarınıza göre özelleştirin. Anahtar kelimeleri içeren tüm web siteleri engellenir.",
                "4. Bu profilin çevrimiçi olabileceği toplam süreyi sınırlandırmak istiyorsanız, Zaman Kısıtlama'sını etkinleştirin ve belirli bir zaman tanımlayın. Ayrıca, bu profile tanımlı cihazların interneti kullanamayacağı günlük bir süre belirlemek için Yatma Zamanını da kullanabilirsiniz.",
                "5. Kaydet butonuna tıklayınız."]
} ,{                      
                           type: "step",
                           title: "Bir profilin ayrıntılı internet geçmişini görüntülemek için",
       content: [ 
                "1. Analizler sütununda, ilgili Analizler düğmesine tıklayın.",
                "2. Daha fazla kayıt görmek istiyorsanız, Geçmiş <span class=\"ptl-ctr-help-icon history\"></span> düğmesine tıklayın.",
                "3. <span class=\"ptl-ctr-help-icon block\"></span> veya <span class=\"ptl-ctr-help-icon unblock\"></span> butonlarına tıklayarak, web sitelerini engelleyebilir veya engelini kaldırabilirsiniz."]
} ,{                      
                           type: "step",
                           title: "Internet erişimini hemen devre dışı bırakmak veya etkinleştirmek için",
       content: [ 
                "Internet Erişim sütununda, karşılık gelen profilin internet erişimini cihazdan durdurmak için <span class=\"ptl-ctr-help-icon stop\"></span> tıklayın ve erişimi tekrar etkinleştirmek için <span class=\"ptl-ctr-help-icon enable\"></span> tıklayın."]
                       }]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (Quality of Service) gerektiğinde Internet trafiği için öncelik atamanıza yardımcı olur. QoS kural listesinde bir uygulama, bir cihaz veya fiziksel bir port için öncelik seviyesini belirleyebilirsiniz."
                       } ,{                      
                           type: "note",
                           id: "qos-boost",
                           title: "Uyarı",
                           content: "Eğer NAT Boost etkinse QoS devre dışı bırakılmalıdır."
                       } ,{                      
                           type: "name",
                           title: "Yükleme Bant Genişliği",
                           content: "ISP tarafından sağlanan maksimum yükleme bant genişliğini giriniz."
                       } ,{                      
                           type: "name",
                           title: "İndirme Bant Genişliği",
                           content: "ISP tarafından sağlanan maksimum indirme bant genişliğini giriniz."
                       }]
},
       QOS_ADV :{ 
               TITLE:"Gelişmiş",
               CONTENT: [{
                           type: "name",
                           title: "Yüksek/Orta/Düşük Öncelik",
                           content: "Yüksek/Orta/Düşük trafik önceliği için bir yüzde değeri belirleyiniz.",
       children: [{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Tüm önceliklerin maksimum miktarı(yüzdesi) 1'dir."
                       }]
}]
},
       QOS_RULE :{ 
               TITLE:"QoS Kural Listesi",
               CONTENT: [{
                           type: "paragraph",
                           content: "Here you can add detailed QoS rules to proritize the Internet traffic."
                       } ,{                      
                           type: "step",
                           title: "QoS kuralı ayarlamak için",
       content: [ 
                "1. Ekle'ye tıklayın.",
                "2. QoS kuralını eklemek için bir öncelik türü seçiniz.",
                "Cihaz tanımı - İstenen cihazı seçmek için Tara butonuna tıklayınız veya manuel olarak MAC adresini ve cihaz adını giriniz.",
                "Uygulama tanımı - İstenen uygulamayı seçiniz veya uygulama adı, protokol ve hedef port (1 ila 65535 arasında) tanımlayarak bir uygulama tanımlayınız. Tek bir port tanımlayabilir veya virgüller ile ayırarak (örn. 21,36-105,111) port aralığı veya çoklu port tanımlayabilirsiniz.",
                "Fiziksel Port tanımı - Tanımlamak istediğiniz portu seçiniz.",
                "3. Kaydet butonuna tıklayınız."]
} ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Önceliği değiştirmek için listede bir kural arasında farklı öncelik çizebilirsiniz."
                       }]
},
       QOS_DATABASE :{ 
               TITLE:"Veritabanı Güncellemesi",
               CONTENT: [{
                           type: "paragraph",
                           content: "www.tp-link.com websitesinde en güncel veritabanı sürümü yayınlanmaktadır. Daha fazla uygulama desteği için router'ın veritabanını güncelleyebilirsiniz."
                       } ,{                      
                           type: "name",
                           title: "Yeni Veritabanı Dosyası",
                           content: "En yeni veritabanı dosyasını yüklemek için Gözat butonuna tıklayınız. Güncel veritabanını seçiniz ve en yeni sürüme güncellemek için Güncelle butonuna tıklayınız."
                       }]
},
       QOS_V2 :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (Hizmet Kalitesi), en çok ihtiyacınız olduğunda daha hızlı bağlantı sağlamak için belirli cihazların internet trafiğine öncelik vermenizi sağlar."
                       }]
},
       QOS_GLOBAL_SETTINGS :{ 
               TITLE:"Genel Ayarlar",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bant Genişliği Yükleme- ISS'niz tarafından sağlanan maksimum yükleme bant genişliğini girin."
                       } ,{                      
                           type: "paragraph",
                           content: "Bant Genişliğini İndirme - ISS'niz tarafından sağlanan maksimum indirme bant genişliğini girin."
                       }]
},
       QOS_DEVICE_PRIORITY :{ 
               TITLE:"Aygıt Önceliği",
               CONTENT: [{
                           type: "paragraph",
                           content: "Önceliklemek istediğiniz cihaz(lar)ı ve ne kadar süre öncelikli olacağını seçin."
                       } ,{                      
                           type: "step",
                           title: "Bir aygıta öncelik vermek için",
       content: [ 
                "1. Listeden önceliklendirmek istediğiniz cihazı bulun ve Öncelik seçeneğini değiştirin.",
                "2. Zamanlama sütununda cihazın ne kadar süre öncelikli olacağını seçin."]
}]
},
       SECURITY_FIREWALL :{ 
               TITLE:"Güvenlik Duvarı",
               CONTENT: [{
                           type: "name",
                           title: "SPI Güvenlik Duvarı",
                           content: "SPI (Stateful Packet Inspection) Firewall, siber saldırıları engeller ve protokole göre yönlendiriciden geçen trafiği doğrular. Varsayılan olarak, bu özellik etkindir."
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"DoS Koruması",
               CONTENT: [{
                           type: "name",
                           title: "DoS Koruması",
                           content: "DoS (Servis Engelleme) Koruması, sunucu istekleri ile LAN'ı DoS ataklarına karşı korur. İhtiyaçlarınıza uygun olarak saldırıları aşağıdaki üç farklı sınıfa göre filtreleyebilirsiniz. Her filtreleme için dört kademe vardır:",
       children: [{                      
                           type: "name",
                           title: "Kapalı",
                           content: "Koruma Yok."
                       } ,{                      
                           type: "name",
                           title: "Düşük ",
                           content: "Düşük seviyede koruma ve router'ın performansına düşük etki."
                       } ,{                      
                           type: "name",
                           title: "Orta  ",
                           content: "Orta derece seviyede koruma ve router'ın performansında yarım-fark edilebilir etki."
                       } ,{                      
                           type: "name",
                           title: "Yüksek ",
                           content: "Yüksek seviyede koruma fakat router'ın performansında fark edilebilir etki."
                       }]
} ,{                      
                           type: "name",
                           title: "ICMP-FLOOD Saldırı Filtreleme",
                           content: "ICMP (Internet Denetim İletisi Protokolü) ataklarını önlemek için etkinleştirin."
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD Saldırı Filtreleme",
                           content: "UDP (Kullanıcı Veri Birimi Protokolü) ataklarını önlemek için etkinleştirin."
                       } ,{                      
                           type: "name",
                           title: "TCP-SYN-FLOOD Saldırı Filtreleme",
                           content: "TCP-SYN (İletişim Kontrol Protokolü-Senkronize) ataklarını önlemek için etkinleştirin."
                       } ,{                      
                           type: "name",
                           title: "WAN Portundan gelen Ping Paketlerini Yoksay",
                           content: "WAN portundan ping paketlerini engellemek için etkinleştirin."
                       } ,{                      
                           type: "name",
                           title: "LAN Portundan gelen Ping Paketlerini Engelle",
                           content: "LAN portlarından ping paketlerini yasaklamak için etkinleştirin."
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"Engelli DoS Ana Bilgisayar Listesi",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bu tabloda, engellenen DoS host(lar)ın IP adresi ve MAC adresi görüntülenmektedir."
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"Erişim Kontrolü",
               CONTENT: [{
                           type: "paragraph",
                           content: "Erişim Kontrolü, ağa erişen belirli client cihazları engellemek veya izin vermek için kullanılır. Bir cihaz engellendiğinde, diğer cihazlarla iletişim kuramaz veya Internet'e erişemez."
                       } ,{                      
                           type: "step",
                           title: "Erişim kontrolü için",
       content: [ 
                "1. Erişim Kontrolünü etkinleştirmek için anahtarı etkin konuma getirin.",
                "2. Misafir Ağa bağlı cihazların erişimini kontrol etmek istiyorsanız, Misafir Cihazlar Kontrolünü etkin konuma getirin.",
                "3. İhtiyaçlarınıza uygun olan erişim modunu seçin ve Kaydet butonuna tıklayın.",
                "A. Aşağıda listelenen cihazların erişimini engellemek istiyorsanız, Kara Listeyi seçin.",
                "B. Aşağıda listelenen cihazların erişimine izin vermek istiyorsanız, Beyaz Listeyi seçin.",
                "4. Cihazları, Kara Liste/Beyaz Liste bölümüne eklemek için Ekle butonuna tıklayın. Cihazın adını ve MAC Adresini girin. Kaydet butonuna tıklayın."]
} ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Bu kaydı devre dışı bırakmak istiyorsanız, ampul ikonuna tıklayınız."
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"Çevrimiçi Cihazlar",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bu tabloda, bağlı tüm cihazların bilgisi görüntülenmektedir (Misafir Cihazlar Kontrolü etkinleştirilmiş ise Misafir Ağına bağlı cihazlar da dahil)."
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"IP&MAC Binding",
               CONTENT: [{
                           type: "paragraph",
                           content: "IP & MAC Binding (ARP Binding olarak da bilinir), cihazın MAC adresi ve IP adresi ile birlikte binding (ilişkilendirme) yapılarak LAN'daki belirli bir cihazın erişim kontrolünü sağlar. IP & MAC Binding ayrıca belirli IP adresini kullanan diğer cihazlarını önler."
                       } ,{                      
                           type: "step",
                           title: "IP & MAC Binding ile bir cihazı kurmak için",
       content: [ 
                "1. Ekle'ye tıklayın.",
                "2. Cihazın MAC adresini girin.",
                "3. Yukarıdaki MAC adresini ilişkilendirmek istediğiniz bir IP adresi giriniz.",
                "4. Etkinleştir'i seçin.",
                "5. Kaydet butonuna tıklayınız."]
} ,{                      
                           type: "note",
                           title: "Uyarı",
       content: [ 
                "1. Aynı IP adresini bir MAC adresinden fazla MAC adresine bağlayamazsınız.",
                "2. Bu kaydı devre dışı bırakmak istiyorsanız, ampul ikonuna tıklayınız."]
}]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"ARP Listesi",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bu tabloda, şu anda bağlı olan cihaz(lar)ın IP adresi ve MAC adresi görüntülenmektedir."
                       }]
},
       IPV6 :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "name",
                           title: "IPv6",
                           content: "IPv6 (Internet Protokolü Sürüm 6), IP (Internet Protokolü)nün en son sürümüdür ve IPv4 (Internet Protokolü Sürüm 4) adreslerinin tükenmesi nedeniyle oluşturulmuştur."
                       } ,{                      
                           type: "title",
                            title: "Internet Bağlantı Tipi:Dinamik IP"
                       } ,{                      
                           type: "name",
                           title: "Dinamik IP",
                           content: "ISP'niz Dinamik IPv6 adres ataması kullanıyorsa bu türü seçiniz."
                       } ,{                      
                           type: "name",
                           title: "IPv6 Adresi/Birincil DNS/İkincil DNS",
                           content: "Bu parametreler, ISP'nin DHCPv6 sunucusu tarafından otomatik olarak atanmaktadır."
                       } ,{                      
                           type: "name",
                           title: "Yenile",
                           content: "ISP'nin DHCPv6 sunucusu tarafından yeni IPv6 parametreleri almak için tıklayın."
                       } ,{                      
                           type: "name",
                           title: "Bırak",
                           content: "ISP'nin DHCPv6 sunucusu tarafından atanan tüm IPv6 adreslerini bırakmak için tıklayın."
                       } ,{                      
                           type: "name",
                           title: "IPv6 Adresi Al",
                           content: "ISP'nize uygun olarak router tanıtım paketlerinden bir SLAAC IPv6 adresi oluşturmak için veya kalıcı bir DHCPv6 IPv6 adresi oluşturmak için seçiniz. "
                       } ,{                      
                           type: "name",
                           title: "Önek Yetkilendirme",
                           content: "ISS'nızdan DHCPv6 Sunucusu aracılığıyla bir önek yetkilendirme almak için Etkinleştiri seçin veya manuel olarak bir önek adresi atamak için Devre Dışı olarak bırakınız. LAN'daki istemciler bu önek ile bir IPv6 adresi oluşturacaktır."
                       } ,{                      
                           type: "name",
                           title: "DNS Adresi",
                           content: "ISP'den Dinamik Olarak Al veya Aşağıdaki DNS Adreslerini Kullan seçiniz. Aşağıdaki DNS adreslerini kullan seçiliyse, manuel olarak ISP'niz tarafından sağlanan DNS adreslerini giriniz."
                       } ,{                      
                           type: "title",
                            title: "Internet Bağlantı Tipi:Statik IP"
                       } ,{                      
                           type: "name",
                           title: "Statik IP",
                           content: "ISP'niz Statik IPv6 adres atamasını kullanıyorsa bu türü seçiniz."
                       } ,{                      
                           type: "name",
                           title: "IPv6 Adresi/Varsayılan Ağ Geçidi/Birincil DNS/İkincil DNS",
                           content: "ISS tarafından sağlanan bu parametreleri girin."
                       } ,{                      
                           type: "name",
                           title: "MTU Boyutu",
                           content: "Çoğu ethernet ağı için varsayılan ve genel MTU (En Yüksek Aktarım Birimi) boyutu 1500 byte'dır. ISS'nız tarafından gerekmedikçe varsayılan MTU boyutunu değiştirmeniz önerilmez. "
                       } ,{                      
                           type: "title",
                            title: "Internet Bağlantı Tipi: 6to4 Tünel"
                       } ,{                      
                           type: "name",
                           title: "6to4 Tünel",
                           content: "Atanan adresler için ISP'niz 6to4 dağıtımını kullanıyorsa bu türü seçiniz."
                       } ,{                      
                           type: "name",
                           title: "IPv4 Adresi/IPv4 Alt Ağ Maskesi/IPv4 Varsayılan Ağ Geçidi/Tünel Adresi",
                           content: "Bağlan'a bastıktan sonra bu parametreler dinamik olarak WAN portunun IPv4 bilgisi tarafından oluşturulacaktır."
                       } ,{                      
                           type: "name",
                           title: "Aşağıdaki DNS Sunucuyu Kullan",
                           content: "ISP'niz tarafından sağlanan birincil DNS ve/veya ikincil DNS adreslerini manuel olarak girmek için bu onay kutusunu seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Bağlan",
                           content: "Internet'e bağlanmak için tıklayınız."
                       } ,{                      
                           type: "name",
                           title: "Bağlantıyı Kes",
                           content: "Internet bağlantısını kesmek için tıklayınız."
                       } ,{                      
                           type: "title",
                            title: "Internet Bağlantı Tipi: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE ",
                           content: "ISP'niz tarafından bir kullanıcı adı ve şifre sağlanmışsa ve PPPoEv6 kullanıyorsa bu türü seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Kullanıcı Adı/Şifre",
                           content: "ISS tarafından sağlanan bu parametreleri girin."
                       } ,{                      
                           type: "name",
                           title: "IPv6 Adresi",
                           content: "Bu adres ISP tarafından DHCPv6 sunucusu aracılığıyla otomatik olarak atanacaktır. Kullanıcı adını ve şifresini girdikten sonra Bağlan butonuna tıklayınız."
                       } ,{                      
                           type: "name",
                           title: "IPv6 Adresi Al",
                           content: "ISP'nize uygun olarak router tanıtım paketlerinden bir SLAAC IPv6 adresi oluşturmak ya da kalıcı bir DHCPv6 IPv6 adresi oluşturmak veya ISP tarafından belirlenmiş IPv6 adresini manuel olarak girmek için seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Önek Yetkilendirme",
                           content: "ISS'nızdan DHCPv6 Sunucusu aracılığıyla bir önek yetkilendirme almak için Etkinleştiri seçin veya manuel olarak bir önek adresi atamak için Devre Dışı olarak bırakınız. LAN'daki istemciler bu önek ile bir IPv6 adresi oluşturacaktır."
                       } ,{                      
                           type: "name",
                           title: "DNS Adresi",
                           content: "ISP'den Dinamik Olarak Al veya Aşağıdaki DNS Adreslerini Kullan seçiniz. Aşağıdaki DNS adreslerini kullan seçiliyse, manuel olarak ISP'niz tarafından sağlanan DNS adreslerini giriniz."
                       } ,{                      
                           type: "name",
                           title: "Bağlan",
                           content: "Internet'e bağlanmak için tıklayınız."
                       } ,{                      
                           type: "name",
                           title: "Bağlantıyı Kes",
                           content: "Internet bağlantısını kesmek için tıklayınız."
                       } ,{                      
                           type: "title",
                            title: "Internet Bağlantı Tipi: Pass-Through (Köprü)"
                       } ,{                      
                           type: "paragraph",
                           content: "ISP, Pass-Through (Köprü) ağ dağıtımını kullanıyorsa bu türü seçiniz. Bu bağlantı türü için yapılandırma gerekli değildir."
                       }]
},
       IPV6_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "Internet Bağlantı türünüz Pass-Through (Bridge) dışındaki diğer Internet bağlantı türleri ise IPv6 yapılandırmanız gereklidir."
                       } ,{                      
                           type: "name",
                           title: "Atanan Tip",
                           content: "ISP’ye göre uygun olanını seçiniz.",
       children: [{                      
                           type: "name",
                           title: "DHCPv6",
                           content: "LAN'daki istemcilere otomatik olarak IP adresleri atamak için",
       children: [{                      
                           type: "name",
                           title: "Adres Alan Kodu",
                           content: "ISP tarafından sağlanan adres prefix değerini giriniz."
                       } ,{                      
                           type: "name",
                           title: "Kira Süresi",
                           content: "Atanan IP adresinin geçerlilik süresidir. ISP tarafından talep edilirse değiştirin ya da varsayılan 86400 saniye olarak bırakın."
                       } ,{                      
                           type: "name",
                           title: "Adres ",
                           content: "ISP'nin DHCPv6 sunucusu tarafından otomatik olarak atanan IP adresidir."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+Yurtsuz DHCP",
       children: [{                      
                           type: "name",
                           title: "Adres Alan Kodu",
                           content: "ISP tarafından sağlanan adres prefix değerini giriniz."
                       } ,{                      
                           type: "name",
                           title: "Adres ",
                           content: "ISS tarafından otomatik olarak atanan IP adresidir."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+RDNSS",
       children: [{                      
                           type: "name",
                           title: "Adres Alan Kodu",
                           content: "ISP tarafından sağlanan adres prefix değerini giriniz."
                       } ,{                      
                           type: "name",
                           title: "Adres ",
                           content: "ISS tarafından otomatik olarak atanan IP adresidir."
                       }]
}]
}]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"MAC Kopyalama",
               CONTENT: [{
                           type: "paragraph",
                           content: "Uygun MAC Klon metodunu seçiniz."
                       } ,{                      
                           type: "name",
                           title: "MAC Adresini KLONLAMA",
                           content: "Router'ın varsayılan MAC adresini değiştirmeyin. Değiştirildiği durumda, ISS atanmış IP adresini MAC adresi ile bağlamaz."
                       } ,{                      
                           type: "name",
                           title: "Şu Anki Bilgisayarın MAC Adresini Klonla",
                           content: "Router'a bağlı bulunan bilgisayarın mevcut MAC adresini kopyala'yı seçin, bu durumda ISS atanan IP adresini bilgisayarın MAC adresi ile bağlayacak."
                       } ,{                      
                           type: "name",
                           title: "Özel MAC Adresini kullan",
                           content: "MAC adresini manuel olarak girin, bu durumda ISS atanan IP adresini özel(belirlenen) MAC adresi ile bağlar."
                       }]
},
       TIME_SETTING :{ 
               TITLE:"Zaman Ayarları",
               CONTENT: [{
                           type: "paragraph",
                           content: "Zaman Ayarları router için sistem zamanını yapılandırmanıza olanak sağlar. Bir kez değiştirildiğinde sistem zamanı Ebeveyn Kontrolü gibi yapılandırmalarda ve zamana bağlı fonksiyonlarda geçerli olacaktır."
                       } ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Sistem zaman tabanlı fonksiyonların ve yapılandırmaların geçerli olması için 24-Saat Zaman özelliğini etkinleştiriniz."
                       } ,{                      
                           type: "title",
                            title: "Sistem Zamanı"
                       } ,{                      
                           type: "step",
                           title: "Internet üzerinden zamanı güncellemek için",
       content: [ 
                "Varsayılan olarak etkin gelen Internet Üzerinden Güncelleme işlevi Internet üzerinden sistem zamanını güncellemenize olanak sağlar.",
                "1. Internet Üzerinden Güncelle fonksiyonunu seçiniz.",
                "2. Aşağı açılır menüden yerel Zaman Dilimini seçiniz.",
                "3. NTP Server alanında tanımlamak istediğiniz NTP Sunucunun domain adını veya IP adresini giriniz.",
                "4. NTP Sunucu II alanına, IP adresini girin veta ikinci NTP sunucusunun etki alanı adını girin.(İsteğe Bağlı)",
                "5. Al'a tıklayın.",
                "6. Kaydet butonuna tıklayınız."]
} ,{                      
                           type: "step",
                           title: "PC üzerinden zamanı güncellemek için",
       content: [ 
                "Bu özellik PC aracılığıyla sistem zamanını güncellemenize olanak sağlar. Yapılandırmadan önce PC zamanının güncel olup olmadığını doğrulayınız.",
                "PC Üzerinden Güncelle’yi seçiniz ve Kaydet butonuna tıklayınız."]
} ,{                      
                           type: "step",
                           title: "Manuel olarak zamanı ayarlamak için",
       content: [ 
                "Internet veya PC üzerinden zaman otomatik olarak alınamazsa, sistem zamanını manuel olarak yapılandırabilirsiniz.",
                "1. Manuel Olarak Seçiniz.",
                "2. Güncele Tarihi ve Zamanı giriniz.",
                "3. Kaydet butonuna tıklayınız."]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Yaz Saati Uygulaması",
                           content: "Bu özellik yaz saati uygulaması ile sistem zamanını otomatik olarak senkronize etmektedir."
                       } ,{                      
                           type: "step",
                           title: "Yaz Saati Uygulamasını kurmak için",
       content: [ 
                "1. Yaz Saati Uygulamasını Etkileştir'i seçin.",
                "2. Yerel zaman diliminde yaz saati uygulaması için bir zaman periyodu belirleyiniz.",
                "3. Kaydet butonuna tıklayınız."]
}]
},
       DIGNOSTIC :{ 
               TITLE:"Tanılama",
               CONTENT: [{
                           type: "paragraph",
                           content: "Router’daki Ping ve Traceroute araçları ağ problemlerini çözmeniz için yardımcı olmaktadır."
                       } ,{                      
                           type: "title",
                            title: "Ping & Traceroute"
                       } ,{                      
                           type: "paragraph",
                           content: "Ping aracı, belirli bir hedef IP adresine veya domain adına gönderilen ve alınan paketlerin sayısını, gidiş-dönüş zamanlarını ve logları listeler."
                       } ,{                      
                           type: "paragraph",
                           content: "Traceroute aracı, belirli bir hedef IP adresine veya domain adına gönderilen paketleri gönderir, paketlerin hedefe ulaşma zamanı ve atlama sayıları görüntülenir."
                       } ,{                      
                           type: "paragraph",
                           content: "Yerel bir cihaza IP adresi veya domain adı (tp-link.com, yahoo.com, vs.) üzerinden ping veya traceroute atılabilir."
                       } ,{                      
                           type: "step",
                           title: "Ping kullanarak tanılama için",
       content: [ 
                "1. Tanılama Aracı olarak Ping seçiniz.",
                "2. Hedef IP Adresini veya Domain Adını giriniz.",
                "3. Gelişmiş menüsünü açmak için ok ikonuna tıklayınız ve Ping Sayısı ve Ping Paket Boyutu (opsiyonel) belirleyiniz.",
                "4. Başlat butonuna tıklayınız."]
} ,{                      
                           type: "step",
                           title: "İz Yolu kullanarak tanılama için",
       content: [ 
                "1. Tanılama Aracı olarak Traceroute seçiniz.",
                "2. Hedef IP Adresini veya Domain Adını giriniz.",
                "3. Gelişmiş menüsünü açmak için ok ikonuna tıklayınız ve Traceroute Maks. TTL (Yaşam Süresi) alanında atlama sayısını (ulaşılacak olan) belirleyiniz. Varsayılan değer 20 (opsiyonel).",
                "4. Başlat butonuna tıklayınız."]
}]
},
       PORT_MIRROR :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                            title: "Port Mirroring"
                       } ,{                      
                           type: "paragraph",
                           content: "Port Mirroring, aynalanmış bir porttan yansıtılan bir porta paketlerin kopyalarını yönlendirme işlemini gerçekleştirir. Genellikle, aynalanmış port trafiğini izleme ve ağ sorunlarını çözümlemek için yansıtılan paketlerin analizi bir veri tanılama cihazında yapılır."
                       } ,{                      
                           type: "step",
                           title: "Atanan porta kopyalarını göndermek için;",
       content: [ 
                "1. Port Mirroring Etkinleştir.",
                "2. Aynalanacak portları seçin.",
                "3. Yansıtılacak portları seçin.",
                "4. Kaydet'e tıklayın."]
} ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Bir port aynı zamanda hem aynalama portu hem de yansıtma portu olarak ayarlanamaz."
                       }]
},
       FIRMWARE :{ 
               TITLE:"Yazılım Güncelleme",
               CONTENT: [{
                           type: "paragraph",
                           content: "Firmware Yükseltme, router’a yeni özellikler kazandırır ve hata düzeltmeleri sağlar. En iyi performans için router’ı en güncel yazılıma yükseltmeniz tavsiye edilir."
                       } ,{                      
                           type: "step",
                           title: "Güncellemenin başarısız olmasını önlemek için aşağıdaki bildiride yazılanları dikkate alınız:",
       content: [ 
                "Güncellemeden önce",
                "1. Bilgisayarınız ile router arasında sorunsuz bir bağlantı olduğundan emin olun. Kablosuz olarak güncelleme yapılması TAVSİYE EDİLMEZ.",
                "2. Router'a bağlı olan tüm USB cihazlarını çıkardığınızdan emin olun.",
                "3. Router'ın konfigürasyon dosyasının yedeğini almayı unutmayın.",
                "Güncelleme sırasında",
                "Güncelleme işlemi bitene kadar router'ı AÇIK TUTUN."]
}]
},
       FIRMWARE_UPGRADE_ONLINE :{ 
               TITLE:"Online firmware güncellemek için",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Hazır olduğunda doğrulayın ve Güncelle butonuna tıklayınız. Router en yeni firmware paketini otomatik olarak indirecek ve güncelleyecek. Ayrıca son firmware güncellemesi olup olmadığını denetlemek için Kontrol Et butonuna tıklayınız."]
}]
},
       FIRMWARE_UPGRADE :{ 
               TITLE:"Manuel olarak firmware güncellemek için",
               CONTENT: [{
                           type: "step",
       content: [ 
                "1. Sayfanın altındaki Destek butonuna tıklayın ve en güncel firmware sürümünü bilgisayarınıza indirin. İndirdiğiniz firmware sürümünün sayfada görüntülenen donanım sürümünü ile eşleştiğinden emin olun.",
                "2. Gözat'a tıklayın ve indirmiş olduğunuz yazılım dosyasını seçin.",
                "3. Güncelle butonuna tıklayın."]
} ,{                      
                           type: "paragraph",
       content: [ 
                "Firmware güncelleme işleminin tamamlanması birkaç dakika alabilir. Firmware güncelleme işlemi tamamlandığında router otomatik olarak yeniden başlatılacak."]
}]
},
       BACKUP :{ 
               TITLE:"Yedekle & Geri Yükle",
               CONTENT: [{
                           type: "paragraph",
                           content: "Yedekle & Geri Yükle özelliği, router’ın mevcut yapılandırmasını yedeklemenize veya varsayılan ayarlara sıfırlamanızı sağlar."
                       } ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Yedekleme veya geri yükleme işlemi boyunca router’ı KAPATMAYINIZ."
                       } ,{                      
                           type: "title",
                           title: "Yedekleme",
                           content: "Router'ınızın bir önceki konfigürasyonuna geri yükleme ihtiyacınız olması durumu için mevcut konfigürasyonun yedeğini almanızı öneririz. "
                       } ,{                      
                           type: "step",
                           title: "Mevcut konfigürasyonu yedeklemek için",
       content: [ 
                "1.Yedekle'yi tıklayın.",
                "2.Mevcut konfigürasyonun yedeği alınırken lütfen bekleyin."]
}]
},
       RESTORE :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Geri Yükleme",
                           content: "Bir yedekleme dosyasından router’ı önceki durumuna geri yükleyebilirsiniz."
                       } ,{                      
                           type: "step",
                           title: "Yedeklemeden geri yüklemek için",
       content: [ 
                "1. Göz At'a tıklayın.",
                "2. Yedekleme dosyasını konumlandırın ve seçin.",
                "3. Geri Yükle'ye tıklayın."]
}]
},
       FACTORY :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Fabrika Ayarlarına Geri Yükle",
       content: [ 
                "Fabrika ayarlarını geri yükleme işlemi, mevcut konfigürasyonunuzu ve ayarlarınızı kaldıracak, varsayılan fabrika ayarlarına döndürecektir. Örneğin; tüm kablosuz ağlar, ebeveyn kontrolü ve tüm ağ bilgileri silinecektir.",
                "Fabrika ayarlarına geri yüklendikten sonra, router ın web yönetimi sayfasına erişmek için yeni bir şifre oluşturmanız gerekir."]
}]
},
       REBOOT :{ 
               TITLE:"Yeniden başlatma zamanı",
               CONTENT: [{
                           type: "paragraph",
                           content: "Yeniden Başlatma Zamanlama özelliği, router'ın çalışma performansını artırmak için önbelleği temizler. Router'ı manuel olarak yeniden başlatabilir veya düzenli olarak yeniden başlatmayı ayarlayabilirsiniz."
                       } ,{                      
                           type: "step",
                           title: "Manuel olarak yeniden başlatmak için",
       content: [ 
                "Yeniden Başlat butonuna tıklayın ve yeniden başlatma işleminin bitmesi için birkaç dakika bekleyiniz."]
} ,{                      
                           type: "step",
                           title: "Yeniden başlatma zamanı planlama",
       content: [ 
                "1.Yeniden başlatma zamanı etkinleştir",
                "2. Yeniden Başlat Süresi ve Tekrarla alanlarındaki parametreleri belirterek routerın ne zaman ve ne kadar sıklıkla yeniden başlatılacağını ayarlayın.",
                "3. Kaydet butonuna tıklayınız."]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"Yönetim",
               CONTENT: [{
                           type: "paragraph",
                           content: "Yönetim, oturum açma şifresini ve bağlı istemcilerin routera erişim iznini yönetmenizi sağlar."
                       } ,{                      
                           type: "name",
                           title: "Hesap Yönetimi",
                           content: "Bu özellik, parolayı değiştirmenizi sağlar.",
       children: [{                      
                           type: "step",
                           title: "Şifreyi değiştirmek için",
       content: [ 
                "1. Önceki Şifreyi Giriniz.",
                "2. Yeni Şifreyi Giriniz.",
                "3. Yeni Şifreyi Doğrulayınız.",
                "4. Kaydet'e tıklayın."]
}]
}]
},
       ADMIN_RECOVERY :{ 
               TITLE:"Şifre Kurtarma",
               CONTENT: [{
                           type: "name",
                           title: "Varsayılan Şifreyi Kurtar",
                           content: "Varsayılan Şifre Kurtarma, routerı fabrika ayarlarına geri döndürmeden varsayılan giriş şifresini kurtarmanıza olanak tanır.",
       children: [{                      
                           type: "step",
                           title: "Şifreyi değiştirmek için",
       content: [ 
                "1. Varsayılan Şifre Kurtarma özelliğini etkinleştiriniz.",
                "2. Kimden alanında, kurtarma giriş bilgileri için bir doğrulama kodu gönderecek olan geçerli bir email adresi giriniz.",
                "3. Kime alanında, doğrulama kodunu alacak olan geçerli bir email adresi giriniz.",
                "4. Gönderen email (Kimden) adresinin SMTP Sunucusunu giriniz.",
                "5. Kimden alanındaki email adresi için şifre gerekirse, Kimlik Doğrulamayı Etkinleştir onay kutucuğunu seçiniz ve Kullanıcı Adı (email adresi) ve Şifre giriniz.",
                "6. Kaydet butonuna tıklayınız."]
}]
}]
},
       ADMIN_LOCAL :{ 
               TITLE:"Yerel Yönetici",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bu özellik, yerel aygıtların Router'a erişmesini ve yönetmesini sağlar."
                       } ,{                      
                           type: "name",
                           id: "local_management_https",
                           title: "HTTPS ile Yerel Yönetim",
                           content: "Eğer Routera hem HTTPS hem de HTTP üzerinden erişmek istiyorsanız,HTTPS ile Yerel Yönetimi Etkinleştirin veya sadece routera HTTP üzerinden erişmek istiyorsanız devre dışı bırakın."
                       } ,{                      
                           type: "name",
                           title: "Tüm LAN Bağlı Cihazlar için Erişim",
                           content: "Tüm LAN'a bağlı cihazlar için yerel yönetimi etkinleştirmek için Açın veya belli bir cihaz için yönetimi etkinleştirmek için Kapatın."
                       } ,{                      
                           type: "name",
                           title: "MAC Adresi",
                           content: "Sınırlı erişim cihazının MAC adresini gösterir."
                       } ,{                      
                           type: "name",
                           title: "Tanım",
                           content: "Sınırlı erişim cihazının tanımını gösterir."
                       } ,{                      
                           type: "name",
                           title: "Durum",
                           content: "Sınırlı erişim cihazının mevcut durumunu gösterir. (etkin veya devre dışı)."
                       } ,{                      
                           type: "name",
                           title: "Değiştir",
                           content: "Listedeki ilgili cihazın Değiştir ve Sil seçeneklerini gösterir."
                       } ,{                      
                           type: "step",
                           title: "Listeye istemci cihaz eklemek için",
       content: [ 
                "1. Ekle'ye tıklayın.",
                "2. Şu anki bir cihazı seçmek için Şu Anki Cihazları Göster'e tıklayın veya MAC adresi alanına cihazın MAC adresini girin.",
                "3. Cihaz için bir tanım girin.",
                "4. Etkinleştir'i seçin.",
                "5. Tamam'a tıklayın."]
} ,{                      
                           type: "step",
                           title: "Listedeki bir cihazı değiştirmek veya silmek için",
                           content: "Tabloda, değiştirmek veya silmek istediğiniz ilgili cihazın Düzelt simgesine veya Çöp simgesine tıklayın."
                       } ,{                      
                           type: "step",
                           title: "Çoklu cihaz silmek için",
                           content: "Silmek istediğiniz tüm cihazları seçin, Sil'e tıklayın."
                       }]
},
       ADMIN_REMOTE_WITHOUT_HTTPS :{ 
               TITLE:"Uzaktan Yönetim",
               CONTENT: [{
                           type: "name",
                           title: "Uzaktan Yönetim",
                           content: "Uzak Yönetim özelliği ile route’a uzaktan erişmenize ve yönetmenize olanak sağlar.",
       children: [{                      
                           type: "step",
                           title: "Uzaktaki herhangi bir cihazın router'ı yönetmesini engellemek için",
                           content: "Uzaktan Yönetimi Devre Dışı Bırak seçiniz ve Kaydet butonuna tıklayınız."
                       } ,{                      
                           type: "step",
                           title: "Uzaktaki herhangi bir cihazın router'ı yönetmesine izin vermek için",
       content: [ 
                "1. Tüm Cihazlar için Uzaktan Yönetimi Etkinleştir seçiniz.",
                "2. Uzak cihazlardan router'a erişmek için kullanılacak Web Yönetim Portu (1024-65535 veya 80) giriniz.",
                "3. Kaydet butonuna tıklayınız."]
} ,{                      
                           type: "step",
                           title: "Uzaktaki belirli bir cihazın router'ı yönetmesine izin vermek için",
       content: [ 
                "1. Belirli Cihaz için Uzak Yönetimi Etkinleştir seçiniz.",
                "2. Uzak cihazlardan router'a erişmek için kullanılacak Web Yönetim Portu (1024-65535 veya 80) giriniz.",
                "3. Uzaktan Yönetim IP Adresi alanına router'ı uzaktan yönetecek olan cihazın IP adresini giriniz.",
                "4. Kaydet'e tıklayın."]
}]
}]
},
       ADMIN_REMOTE :{ 
               TITLE:"Uzaktan Yönetim",
               CONTENT: [{
                           type: "paragraph",
                           content: "Uzaktan Yönetim özelliği router'a internet üzerinden uzak bir şekilde erişmenize ve yapılandırmanıza olanak sağlar."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step_title",
                           content: "Uzak Yönetim'i kurmak için"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step1",
                           content: "Uzaktan Yönetim özelliğini etkinleştirmek için onay kutusunu işaretleyiniz."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step2",
                           content: "2. HTTPS Portu ve HTTP Portunu varsayılan ayarlar olarak tutun."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step3",
                           content: "3. Router'a Uzaktan hangi Uzak Aygıtın erişebileceğine karar vermek için seçiniz:",
       children: [{                      
                           type: "name",
                           title: "Trafik Kullanımı",
                           content: "Tüm uzaktaki cihazlar Router'a erişebilir."
                       } ,{                      
                           type: "name",
                           title: "Belirlenmiş Aygıt",
                           content: "Router'a erişmek için uzak cihazın IP Adresini girin."
                       }]
} ,{                      
                           type: "paragraph",
                           id: "admin_remote_step4",
                           content: "4. Kaydet'e tıklayın."
                       } ,{                      
                           type: "paragraph",
                           content: "Şimdi Routerı Yönetim için Web Adresi altında görüntülenen adres yoluyla uzaktan yönetebilirsiniz."
                       } ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Yukarıdaki adresi uzaktan ziyaret ettiğinizde bir uyarı görüntülenirse, devam etmek için Güven'i (veya benzer bir seçenek) tıklayın."
                       }]
},
       LED_CONTROL_SETTINGS :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "paragraph",
                           content: "Gece Modu etkinleştirildiğinde, LED’ler her gün belirlenen zaman aralığında kapatılacaktır. Bu özellik router’ın performansını hiçbir şekilde etkilememektedir."
                       } ,{                      
                           type: "step",
                           title: "Gece Modunu etkinleştirmek için",
       content: [ 
                "1. Gece Modunu Etkinleştir onay kutucuğunu seçiniz.",
                "2. LED’lerin otomatik olarak kapatılacağı bir zaman periyodu belirleyiniz.",
                "3. Kaydet butonuna tıklayınız."]
}]
},
       SYSTEM_LOG :{ 
               TITLE:"Sistem Günlüğü",
               CONTENT: [{
                           type: "paragraph",
                           content: "Sistem Günlüğünde, router’ın en son aktiviteleri görüntülenir. Bu tabloda, günlüğün içeriği, seviyesi ve türünden oluşur, görüntülenecek olan günlük filtrelenebilir. Sistem günlüğünü yerel bilgisayara kaydedebilir veya e-posta olarak gönderebilirsiniz."
                       } ,{                      
                           type: "step",
                           title: "Sistem günlüğünü yerel bilgisayara kaydetmek için",
       content: [ 
                "1. Sistem günlüğü için istediğiniz Minimum Filtreleme Seviyesini ve Türünü ayarlayınız. Seviye listesi aşağıya doğru sıralanır, en düşük seviye listenin sonundadır.",
                "2. Sistem günlüğü kaydını yerel bilgisayara kaydetmek için Log Kaydet (veya Günlüğü Kaydet) butonuna tıklayınız."]
} ,{                      
                           type: "step",
                           title: "Sistem günlüğünü e-posta aracılığıyla almak için",
       content: [ 
                "1. Sistem günlüğü için istediğiniz filtreleme Seviyesini ve Türünü ayarlayınız. Seviye listesi aşağıya doğru sıralanır, en düşük seviye listenin sonundadır.",
                "2. Email Ayarları’na tıklayınız.",
                "3. Kimden alanında, gönderen email adresi olarak kullanılacak geçerli bir email adresi giriniz.",
                "4. Kime alanında, alıcısı email adresi olarak geçerli bir email adresi giriniz.",
                "5. Gönderen email (Kimden) adresinin SMTP Sunucu adresini giriniz.",
                "Uyarı: Gönderen email kimlik doğrulama gerektiriyorsa, Kimlik Doğrulamayı Etkinleştir onay kutucuğunu seçin, Kullanıcı Adı (email adresi) ve Parolayı girin.",
                "6. Email adresinize düzenli olarak sistem loglarını almak istiyorsanız Otomatik Mail Etkinleştir onay kutucuğunu seçin, belirli bir zaman (24 saatlik zaman formatında) veya zaman aralığı ayarlayın.",
                "Şu anki sistem loglarını hemen almak istiyorsanız Mail Log Gönder butonuna tıklayınız.",
                "7. Kaydet'e basın."]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"Trafik İzleme",
               CONTENT: [{
                           type: "paragraph",
                           content: "10 dakika içindeki bir cihazın veya 10 dakika/24 saat/7 gün içinde tüm cihazların trafik kullanım istatistikleri görüntülenir."
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"Trafik İzleme Listesi",
               CONTENT: [{
                           type: "paragraph",
                           content: "Liste, cihazlarında bağlantı tipine göre gruplanmıştır: kablolu veya kablosuz."
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"Sistem Parametresi",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wifi_title",
                           title: "Kablosuz 2.4GHz/5GHz",
                           content: "Bu bölümde, kablosuz ağdaki trafik iletim kurallarının parametrelerini yapılandırabilirsiniz. Uygun değerlerden emin değilseniz varsayılan ayarlarda bırakmanız önerilir."
                       } ,{                      
                           type: "name",
                           title: "Beacon Interval",
                           content: "Kablosuz ağı senkronize etmek için router tarafından yayını yapılan sinyal paketleri arasındaki devam süresini belirlemek için 40-1000 milisaniye arasında bir değer girin. Varsayılan ayar 100 milisaniyedir."
                       } ,{                      
                           type: "name",
                           title: "RTS Threshold",
                           content: "Router aracılığıyla yapılan veri aktarımının paket boyutunu belirlemek için 1-2346 arasında bir değer girin. Varsayılan olarak, RTS (Gönderme İstem Kodu) eşik boyutu 2346'dır. Eğer paket boyutu ön ayarlı eşikten büyükse, router belirli alıcı istasyonlarına gönderme istem kodu gönderir ve veri çerçevesinin gönderiminde anlaşır. Aksi takdirde, paket acil olarak gönderilecektir."
                       } ,{                      
                           type: "name",
                           title: "DTIM Zaman Aralığı",
                           content: "Bu değer, DTIM (Gönderim Trafiği Gösterge Mesajı)’nın aralığını belirler. 1 ve 15 aralığında bir değer girin. Varsayılan DTIM aralığı 1’dir ve Beacon Interval ile aynıdır."
                       } ,{                      
                           type: "name",
                           title: "Grup Anahtarı Güncelleştirme Periyodu",
                           content: "Şifreleme anahtar otomatik yenile için zaman aralığını kontrol etmek için saniye değeri girin(minimum 30 saniye). Varsayılan 0'dır ve anahtar yenilemesi olmadığını gösterir."
                       } ,{                      
                           type: "name",
                           title: "WMM Özelliği",
                           content: "WMM fonksiyonu paketleri tercihen aktarılan yüksek-öncelikli mesajlar ile garanti altına alır. Varsayılan olarak etkinleştirilmiştir ve kesinlikle önerilir."
                       } ,{                      
                           type: "name",
                           title: "Short GI Özelliği",
                           content: "Bu fonksiyon, varsayılan olarak etkindir ve GI (Koruma Aralığı) zamanına göre paket kapasitesini artırmak için tavsiye edilir."
                       } ,{                      
                           type: "name",
                           title: "AP İzolasyon Özelliği",
                           content: "Bağlı tüm kablosuz cihazların birbiri ile iletişimini kısıtlamak, fakat aynı zamanda Internet erişimine izin vermek istiyorsanız AP İzolasyonunu Etkinleştir onay kutucuğunu seçiniz."
                       } ,{
                           type: "name",
                           title: "USB 3.0 Enterferans Azaltma",
                           content: "USB 3.0 Enterferans indirgemesini etkinleştirmek için tıklayınız."
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
                           title: "WDS etkinleştirmek için",
                           content: "WDS (Kablosuz Dağıtım Sistemi) Bridge (Köprüleme olarak da bilinir) özelliği, kablosuz WLAN’daki (yerel ağ) bir AP ile köprüleme vasıtasıyla kablosuz ağın kapsama alanını genişletmenize olanak sağlar."
                       } ,{                      
                           type: "step",
       content: [ 
                "1. WDS Bridge özelliğini etkinleştiriniz.",
                "2. Köprüleme için Tara özelliği ile ağı bulun: Tara butonuna tıklayarak çevrede bağlanılabilir tüm ağları bulunuz ve köprüleme yapmak istediğiniz ağı seçin. SSID (ağ adı), MAC Adresi ve Güvenlik Türü otomatik olarak doldurulacaktır.",
                "Köprüleme için ağ bilgilerini manuel olarak girin: Köprüleme yapılacak ağın SSID (ağ adı) MAC Adresi ve WDS Modunu giriniz. Köprüleme yapılacak ağın Güvenlik Türü ve ilgili parametreleri birebir aynı olmalıdır.",
                "3. Kaydet butonuna tıklayınız."]
} ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "WDS Modundan emin değilseniz, varsayılan seçenek Oto (Otomatik) olarak bırakın."
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "WPS",
                           content: "WPS (Wi-Fi Korumalı Kurulum), WPS özellikli cihazları WPS butonuna basarak router ile kolay bir şekilde bağlamanızı sağlar. WPS özelliğinin etkin olup olmadığını kontrol ediniz ve Kaydet butonuna tıklayınız."
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "NAT",
                           content: "Bu özellik varsayılan olarak etkindir. Varsayılan ayarları korumanız tavsiye edilir. Devre dışı bırakırsanız, Internet erişiminiz kesilebilir. "
                       } ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "NAT devre dışı bırakıldığında, NAT iletimindeki yapılandırmalar etki etmeyecektir."
                       } ,{                      
                           type: "name",
                           id: "sys_para_nat_boost",
                           title: "NAT Boost",
                           content: "En iyi verimlilik için NAT Boost Etkinleştir onay kutucuğunu seçin ve Kaydet butonuna tıklayınız."
                       } ,{                      
                           type: "note",
                           id: "sys_para_nat_boost_note",
                           title: "Uyarı",
                           content: "NAT arttırma etkin olduğu zaman, QoS ve Akış İstatistikleri otomatik olarak devre dışı kalacaktır."
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "DoS Koruma Ayarları",
                           content: "DoS Koruması, router’ı olası ICMP-FLOOD, UDP-FLOOD ve TCP-FLOOD ataklarına karşı korur."
                       } ,{                      
                           type: "name",
                           title: "ICMP-FLOOD Paket Seviyesi",
                           content: "ICMP paketlerinin sayısı önceden ayarlanmış threshold değerini aştığında, ICMP-FLOOD korumasını tetiklemek için 5 ve 7200 arasında bir değer giriniz."
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD Paket Seviyesi",
                           content: "UDP paketlerinin sayısı önceden ayarlanmış threshold değerini aştığında, UDP-FLOOD korumasını tetiklemek için 5 ve 7200 arasında UDP paket değeri giriniz."
                       } ,{                      
                           type: "name",
                           title: "TCP-FLOOD Paket Seviyesi",
                           content: "TCP paketlerinin sayısı önceden ayarlanmış threshold değerini aştığında, TCP-SYN-FLOOD korumasını tetiklemek için 5 ve 7200 arasında TCP-SYN paket değeri giriniz."
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "Dupleks",
                           content: "Aşağı açılan listeden duplex türünü seçiniz ve Kaydet butonuna tıklayınız."
                       }]
},
       SYSTEM_PARA_LED :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "name",
                           title: "Gece Modunu Etkinleştir",
                           content: "Router'in performansını etkilemeden Gece Modu Süresi içinde LED'leri kapatmak için bu onay kutusunu işaretleyin."
                       } ,{                      
                           type: "name",
                           title: "Gece Modu Periyodu",
                           content: "Gece modunun geçerli olacak zaman dilimini seçin."
                       } ,{                      
                           type: "paragraph",
                           content: "Tüm ayarlarınızı kaydetmek için Kaydet butonuna basın."
                       }]
},
       OPEN_VPN :{ 
               TITLE:"OpenVPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "OpenVPN ile, ev dışında olduğunuzda güvenli bir şekilde ağ erişimi için interneti kullanabilirsiniz. VPN Hizmeti kullanmak için (önerilen) Dinamik DNS Servis yapılandırmayı veya router'ın WAN bağlantı noktası için statik bir IP adresi atamanız gerekir. Sistem Zaman ayarlarınız internet üzerinden senkronize edilecek şekilde ayarlı olmalıdır."
                       } ,{                      
                           type: "name",
                           title: "Servis Türü",
                           content: "OpenVPN sunucusunun iletişim protokolünü seçin: UDP ya da TCP."
                       } ,{                      
                           type: "name",
                           title: "Servis Portu",
                           content: "1024 ila 65535 arasında bir port numarası giriniz. Varsayılan ve yaygın olarak kullanılan port 1194'tür."
                       } ,{                      
                           type: "name",
                           title: "VPN Alt Ağı/Ağ Maskesi",
                           content: "OpenVPN sunucusu tarafından istemcilere kiralanabilecek IP adresleri aralığını girin."
                       } ,{                      
                           type: "name",
                           title: "İstemci Erişimi",
                           content: "OpenVPN clientınız için erişim türünü seçiniz.",
       children: [{                      
                           type: "name",
                           title: "Yalnızca Asıl Ağ",
                           content: "Clientlar sadece ev sahibi ağa erişebilir. Clientların varsayılan rotası değişmez."
                       } ,{                      
                           type: "name",
                           title: "İnternet ve Asıl Ağ",
                           content: "Client'lar ülke dışındayken ev sahibi ağa, internet sitelerine veya hizmetlerine erişebilir. Client'ın varsayılan rotası değişmiş olacaktır."
                       }]
}]
},
       OPEN_VPN_CERTIFICATE :{ 
               TITLE:"Sertifika",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Uzak bilgisayar için VPN bağlantısının bilgileri ve kimliği için sertifikayı kullanın.",
                "Yeni bir sertifika oluşturmak için tıklatın."]
}]
},
       OPEN_VPN_CONF :{ 
               TITLE:"Yapılandırma Dosyası",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "Uzaktaki istemciler, router'ınıza erişmek için yapılandırma dosyasını kullanacaktır.",
                "Yeni VPN bağlantısı eklemek için kullanılacak OpenVPN yapılandırma dosyasını kaydetmek için bu düğmeyi tıklatın."]
}]
},
       OPEN_VPN_GUIDE :{ 
               TITLE:"VPN İstemcisi Yükleme Kılavuzu",
               CONTENT: [{
                           type: "step",
                           title: "OpenVPN sunucusuna client cihazları bağlamak için:",
       content: [{                      
                           type: "paragraph",
                           content: "OpenVPN sunucusunu yapılandırmadan önce, Dinamik DNS Hizmetini (önerilen) yapılandırınız veya WAN portuna statik bir IP adresi atayınız. NAT ayarlarının harici portu, servis portu olmadığından ve Sistem Zaman ayarlarınızın internet üzerinden senkronize olacak şekilde ayarlı olduğundan emin olunuz."
                       },
                "1. VPN Sunucusunu Etkinleştir onay kutucuğunu seçiniz.",
                "2. OpenVPN sunucu parametrelerini (Servis Türü, Servis Portu, Client Erişimi ve VPN Alt Ağ/Alt Ağ Maskesi) giriniz ve Kaydet butonuna tıklayınız.",
                "3. Yapılandırma dosyasını kaydetmek için Çıkart butonuna tıklayınız.",
                "4. Client cihazlarında, <a class=\"link\" href=“http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a> adresinden OpenVPN client yardımcı uygulamasını indirin ve yükleyin.",
                "Windows, Mac OSX ve Linux platformlarında resmi olarak desteklemektedir.",
                "5. OpenVPN client yardımcı uygulamasını çalıştırın ve  VPN sunucuya client cihazı bağlamak için kaydettiğiniz yapılandırma dosyasını kullanarak yeni bir VPN bağlantısı ekleyin."]
} ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "OpenVPN istemcileri hakkında daha fazla bilgi almak için <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a> adresini ziyaret edin"
                       }]
},
       PPTP_VPN :{ 
               TITLE:"PPTP VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "PPTP VPN ile, ev dışında olduğunuzda kolayca İnterneti kullanabilir ve de hızla ağınıza erişebilirsiniz. PPTP VPN, bazı ISP tarafından engellenmiş olabilir. VPN Hizmeti kullanmak için  Dinamik DNS Servis (önerilen) yapılandırmanız veya router'ın WAN portu için statik bir IP adresi atamanız gerekir. Sistem Zaman ayarlarınız internet üzerinden senkronize edilecek şekilde ayarlı olmalıdır."
                       } ,{                      
                           type: "name",
                           title: "İstemci IP Adresi",
                           content: "PPTP VPN sunucusu tarafından istemcilere kiralanabilecek IP adresleri aralığını (10 istemciye kadar) girin."
                       } ,{                      
                           type: "name",
                           title: "Kullanıcı Adı ve Parola",
                           content: "İstemcilerin PPTP VPN sunucusunda kimliklerinin doğrulanması için kullanıcı adını ve parolayı girin."
                       }]
},
       PPTP_VPN_GUIDE :{ 
               TITLE:"VPN İstemcisi Yükleme Kılavuzu",
               CONTENT: [{
                           type: "step",
                           title: "PPTP VPN sunucusuna client cihazları bağlamak için:",
       content: [{                      
                           type: "paragraph",
                           content: "PPTP VPN sunucusunu yapılandırmadan önce, Dinamik DNS Hizmeti (önerilen) yapılandırınız veya WAN portuna statik bir IP adresi atayınız. NAT ayarlarının harici portunun 1723 olup olmadığından emin olunuz ve Sistem Zaman ayarlarınızın internet üzerinden senkronize olacak şekilde ayarlı olduğundan emin olunuz."
                       },
                "1. VPN Sunucusunu Etkinleştir onay kutucuğunu seçiniz.",
                "2. PPTP VPN sunucu parametrelerini yapılandırın ve Kaydet butonuna tıklayın.",
                "3. Client cihazlarında PPTP VPN bağlantısı oluşturun. Windows, Mac OSX, Linux, iOS ve Android platformlarında resmi olarak desteklenmektedir.",
                "4. PPTP VPN programını çalıştırın, yeni bir bağlantı ekleyin ve PPTP VPN sunucuya client cihazı bağlamak için WAN portuna atanan statik IP adresini veya DDNS servisinde kayıtlı domain adını girin."]
}]
},
       VPN_CONNNECTION :{ 
               TITLE:"VPN Bağlantıları",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bu sayfa router'daki OpenVPN ve PPTP VPN sunucularına o sırada bağlanan istemcileri gösterir."
                       }]
},
       BASIC_NETWORK :{ 
               TITLE:"Ağ Haritası",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ağ Haritasında, bağlı cihazlarında bilgisini, router’ın kablosuz bilgisini ve şu anki ağ bağlantı durumunu görüntüleyebilirsiniz."
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Internet bilgisi görüntülenmektedir."
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"Router",
               CONTENT: [{
                           type: "paragraph",
                           content: "LAN portlarının ve kablosuz ağın anlık ağ durum bilgisi görüntülenmektedir."
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"Kablolu/Kablosuz İstemciler",
               CONTENT: [{
                           type: "paragraph",
                           content: "Router'a bağlı client’ların MAC adresleri, atanan IP adresleri, ağ adı (düzenlenebilir) görüntülenmektedir."
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"Yazıcı",
               CONTENT: [{
                           type: "paragraph",
                           content: "Router'a USB portu aracılığıyla bağlı olan yazıcının adını gösterir."
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"USB Disk",
               CONTENT: [{
                           type: "paragraph",
                           content: "USB portu aracılığıyla router’a bağlı USB disk ile ilgili bilgiler görüntülenmektedir."
                       }]
},
       BASIC_SPEED_TEST :{ 
               TITLE:"Hızı Test Et",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bu özellik, servis sağlayıcınızdan aldığınız mevcut yükleme ve indirme hızlarını test eder ve İnternet'in yetenekleri hakkında faydalı tavsiyeler sunar."
                       } ,{                      
                           type: "paragraph",
                           content: "İpucu: Daha doğru bir sonuç elde etmek için diğer uygulamaları ve programları kapatmayı deneyin."
                       } ,{                      
                           type: "paragraph",
                           content: "Geçmiş - Önceki hız testlerinin bir kaydı."
                       } ,{                      
                           type: "paragraph",
                           content: "Tekrar Test et - Hız testi yapmak için tıklayın."
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"Internet",
               CONTENT: [{
                           type: "paragraph",
                           content: "Oto Algıla butonuna tıklayın veya Internet bağlantı türünü manuel olarak seçin. Ardından ISP tarafından sağlanan ilgili parametreleri girin."
                       }]
},
       BASIC_WIRELESS_SMART_CONNECT :{ 
               TITLE:"Akıllı Bağlantı",
               CONTENT: [{
                           type: "paragraph",
                           content: "Akıllı bağlantıyı etkinleştirmek için bu onay kutusunu seçin. Bu işlev, ağ taleplerini dengelemek için mevcut koşulları temel alarak en iyi kablosuz bantları atayarak cihazların daha hızlı çalışmasına yardımcı olur."
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"Kablosuz Ayarları",
               CONTENT: [{
                           type: "paragraph",
                           content: "Kablosuz ayarları (SSID, parola, vb.) yapılandırabilirsiniz."
                       } ,{                      
                           type: "name",
                           title: "Ağ Adı (SSID)",
                           content: "Ağ adı (SSID)'yi değiştirmeniz tavsiye edilir. Bu alan büyük/küçük harf duyarlıdır."
                       } ,{                      
                           type: "name",
                           title: "SSID'yi Gizle",
                           content: "Kablosuz ağ listesinden 2.4GHz/5GHz ağ adını (SSID) gizlemek istiyorsanız seçiniz. Etkinleştirildiğinde, SSID adı gizlenecek ve ağa bağlanabilmeniz için manuel olarak eklemeniz gereklidir."
                       } ,{                      
                           type: "name",
                           title: "Şifre",
                           content: "8-63 ASCII karakteri olacak şekilde kablosuz şifresi girin veya heksadesimal sistemde 8-64 karakter girin. Bu alan büyük küçük harf duyarlıdır."
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
               TITLE:"USB Depolama Aygıtı",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bu özellik, USB depolama aygıtlarını yerel ağdaki farklı cihazlar arasında veya Internet üzerinden paylaşmanıza olanak sağlar."
                       } ,{                      
                           type: "title",
                           title: "Cihaz Ayarları",
                           content: "Cihaz Ayarları bölümünde, USB port üzeriden bağlı USB depolama aygıtının temel bilgileri görüntülenir. Bir USB flash disk genellikle tek bir birime sahiptir."
                       } ,{                      
                           type: "name",
                           title: "Tara",
                           content: "Genellikle, yeni bir cihaz takıldığında router otomatik olarak algılar. Eğer algılama başarısız olursa, tara butonuna tıklayın ve sayfadaki bilgileri güncellemek için yenile butonuna tıklayın.",
       children: [{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Gri alan devre dışı bırakılmış bir birimi temsil eder. Belirli birimi paylaştırmak için ilgili alana tıklayınız."
                       }]
} ,{                      
                           type: "name",
                           title: "Kaldır",
                           content: "USB depolama aygıtını, USB portundan fiziksel olarak çıkarmadan önce güvenli bir şekilde kaldır butonuna tıklayınız.",
       children: [{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Kaldır butonu USB depolama aygıtı sadece router'â bağlı olduğunda görünmektedir. Birim şu anda meşgul olduğunda, devreden çıkarma işlemi yapılamaz."
                       }]
} ,{                      
                           type: "step",
                           title: "Dosya sunucusu kurmak için",
       content: [ 
                "1. USB depolama aygıtını USB portuna doğrudan veya bir USB kablosuz kullanarak ekleyin. Depolama aygıtı harici bir güç ile çalışıyorsa, harici güç kaynağına bağlı olduğunda emin olunuz.",
                "2. Yeni eklenen USB aygıtı router tarafından otomatik olarak algılanacak ve Cihaz Ayarları bölümünde görüntülenecektir. Eğer görüntülenmezse, Tara butonuna tıklayınız.",
                "Not: Paylaş simgesi görünür. Paylaşmanız gerekmeyen birimleri devre dışı bırakmak için simgeye tıklayabilirsiniz."]
}]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"Erişim Adresi",
               CONTENT: [{
                           type: "name",
                           title: "Ağ/Medya Sunucusu Adı",
                           content: "Medya Paylaşımı veya Ağ Komşuları özelliği vasıtasıyla USB depolama aygıtı ile bağlantılarda kullanılan ad görüntülenmektedir. Varsayılan olarak TP-Share tanımlıdır."
                       } ,{                      
                           type: "name",
                           title: "Erişim Yöntemi",
                           content: "Paylaşılan USB depolama aygıtına erişmek için 3 yöntem vardır.",
       children: [{                      
                           type: "name",
                           title: "Ağ Komşuları",
                           content: "Adres sütununun altında görünen adresi kullanarak paylaşılan içeriklere erişmek için bu opsiyonu işaretleyerek ağdaki kullanıcılara izin veriniz."
                       } ,{                      
                           type: "name",
                           title: "FTP ",
                           content: "Adres sütununun altında görünen FTP adresini kullanarak, USB depolama aygıtındaki verilere ağdaki kullanıcıların ve FTP clientların erişimine izin vermek için FTP sunucu özelliğini etkinleştirin."
                       } ,{                      
                           type: "name",
                           title: "FTP (Internet aracılığıyla)",
                           content: "Internet üzerinden FTP servisi aracılığıyla paylaşılan USB depolama aygıtına FTP clientların uzaktan erişebilmesi, dosya indirebilmesi veya yükleyebilmesi için bu opsiyonu işaretleyiniz. Erişim adresini özelleştirmek için, Düzenle butonuna tıklayın ve router’daki Dinamik DNS ayarlarını yapılandırın. FTP sunucunun portunu değiştirmek için, yeni bir port numarası girin ve değişiklikleri uygulamak için Kaydet butonuna tıklayınız."
                       }]
} ,{                      
                           type: "name",
                           title: "Adres ",
                           content: "Paylaşılan USB bellek cihazına erişmek için kullanılan adresi gösterir."
                       } ,{                      
                           type: "name",
                           title: "Port",
                           content: "FTP sunucuya erişmek için kullanılacak olan port numarası görüntülenmektedir."
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"Paylaşılan İçerikler",
               CONTENT: [{
                           type: "paragraph",
                           content: "Paylaşılan dosyalar görüntülenmektedir. Tüm dosyalar varsayılan olarak paylaşıma açıktır. Paylaşılan dosyaları özelleştirmek için Düzenle ikonuna tıklayınız."
                       } ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Cihaz Ayarları bölümünde Paylaş simgesi belirir. Paylaşmanız gerekmeyen birimleri devre dışı bırakmak için Paylaş simgesini tıklayabilirsiniz."
                       }]
},
       FOLDER_SHARING :{ 
               TITLE:"Paylaşılan İçerikler ve Güvenlik",
               CONTENT: [{
                           type: "name",
                           title: "Paylaşılan İçerikler",
                           content: "Paylaşılan dosyalar görüntülenmektedir. Tüm dosyalar varsayılan olarak paylaşıma açıktır. Paylaşılan dosyaları özelleştirmek için Düzenle ikonuna tıklayınız.",
       children: [{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Cihaz Ayarları bölümünde Paylaş simgesi belirir. Paylaşmanız gerekmeyen birimleri devre dışı bırakmak için Paylaş simgesini tıklayabilirsiniz."
                       }]
} ,{                      
                           type: "name",
                           title: "Erişim Kimlik Doğrulama",
       content: [ 
                "Kimlik doğrulama etkinleştirildiğinde, paylaşılan tüm klasörlere erişmek için kullanıcıların geçerli bir kullanıcı adı ve şifresi olması gereklidir. Administrator olarak oturum açıldığında dosyaları okuyabilir ve düzenleyebilirken, User sadece dosyaları okuyabilir.",
                "Kullanıcı adı, harf veya alt çizgi ile başlamalı ve harf, sayı ve alt çizgilerden oluşan 1 ila 15 karakterden oluşmalıdır.",
                "Parola, harf, sayı ve alt çizgiler içeren 1 ila 15 karakterden oluşmalıdır."]
} ,{                      
                           type: "name",
                           title: "Medya Paylaşımını Etkinleştir",
                           content: "Bu özellik etkinleştirildiğinde, yerel ağdaki DLNA destekli tüm cihazlar paylaştırılan klasörlerdeki tüm medya dosyalarına erişebilir. Erişim Kimlik Doğrulama etkin olsa bile, kullanıcı adı veya parola girmeniz gerekmemektedir."
                       }]
},
       BASIC_PRINT_SERVER :{ 
               TITLE:"Yazdırma Sunucusu",
               CONTENT: [{
                           type: "name",
                           title: "Yazdırma Sunucusu",
                           content: "Yazdırma Sunucusu fonksiyonunu etkinleştirmek için anahtarı etkin konuma getiriniz."
                       } ,{                      
                           type: "name",
                           title: "Yazıcı Adı",
                           content: "Router'a bağlı olan yazıcının adı görüntülenmektedir."
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"Ebeveyn Kontrolleri",
               CONTENT: [{
                           type: "paragraph",
                           content: "Ebeveyn Kontrollerinin temel ayarları ile günün belirli zamanlarında erişimi kısıtlayabilirsiniz (örneğin, ödev zamanlarında çocukların cihazlarında Internet erişimini engelleyebilirsiniz)."
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"Ebeveyn Kontrolündeki Cihazlar",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bu tabloda, Ebeveyn Kontrollerinde şu anda kısıtlanan cihazların ayarları ve bilgisi görüntülenmektedir."
                       } ,{                      
                           type: "step",
                           title: "Yeni bir istemci cihazı kısıtlamak için",
       content: [ 
                "1. Ebeveyn Kontrollerini Etkinleştir.",
                "2. Ekle butonuna tıklayın.",
                "3. Erişim Cihazları Listesinde şu anda bağlı bir cihazı seçmek için Tara butonuna tıklayın; veya cihaz bağlı değilse manuel olarak eklemek için Cihaz Adı ve MAC Adresini girin.",
                "4. Kısıtlamaların geçerli olacağı zaman periyodunu belirlemek için Efektif Zaman ikonuna tıklayınız.",
                "5. Açıklama alanına kısa bir açıklama giriniz. Bu alan opsiyoneldir.",
                "6. Bu kaydı Etkinleştirmek için seçiniz.",
                "7. Kaydet'e basın."]
} ,{                      
                           type: "note",
                           title: "Uyarı",
                           content: "Bu kaydı devre dışı bırakmak istiyorsanız, ampul ikonuna tıklayınız."
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"Misafir Ağı",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bu fonksiyon, temel ağı açığa çıkarmaksızın misafirler için Wi-Fi erişimi sağlamasına olanak tanır."
                       } ,{                      
                           type: "name",
                           title: "Misafirlerin Birbiri Arasındaki Erişime İzin Ver",
                           content: "Misafir Ağ'daki kablosuz cihazların, ağ komşuları ve Samba, Ping, FTP servisleri ile iletişimini sağlamak için onay kutucuğunu seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Misafirlerin Yerel Ağıma Erişmesine İzin Ver",
                           content: "Misafir Ağ'daki kablosuz cihazların, ağ komşuları ve Samba, Ping, FTP servisleri üzerinden temel ağ veya router'ın LAN portuna bağlı cihazlar ile iletişimini sağlamak için onay kutucuğunu seçiniz."
                       } ,{                      
                           type: "name",
                           title: "Misafir Ağını Etkinleştir",
                           content: "Misafir Ağı özelliğini etkinleştirmek için bu işaret kutucuğunu seçin."
                       } ,{                      
                           type: "name",
                           title: "Ağ Adı (SSID)",
                           content: "Varsayılan misafir SSID'sini kullanın veya 32 karaktere kadar yeni ad oluşturun."
                       } ,{                      
                           type: "name",
                           title: "SSID'yi Gizle",
                           content: "Eğer Wi-Fi ağ listesinden misafir SSID'sini gizlemek istiyorsanız bu işaret kutucuğunu seçin."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "Şifre Güncelleme Sıklığı ",
                           content: "Misafir Ağ parolasının güncelleme aralığını seçiniz."
                       } ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "Şifre",
                           content: "Parolayı 8 - 63 ASCII karakteri olarak ya da 8 - 64 heksadesimal karakter (0-9, a-f, A-F) olarak seçin."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "Şifre",
                           content: "Rasgele şifre oluşturmayı kullanabilir. 8 ve 63 arasında ASCII karakter veya heksadesimal sayı sisteminde(0-9, a-f, A-F) 8-64 karakter arası olacak şekilde şifre oluşturabilirsiniz."
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"TP-Link Bulut",
               CONTENT: [{
                           type: "paragraph",
                           content: "TP-Link bulut servisi, internet üzerinden tüm TP-Link cihazlarınıza gerçek zamanlı olarak erişim, yönetim ve uzaktan izleme imkanı sağlar."
                       }]
},
       ACCOUNT_INFO :{ 
               TITLE:"Hesap Bilgisi",
               CONTENT: [{
                           type: "paragraph",
                           content: "TP-Link ID bilgileriniz görüntülenir. Düzenle ikonuna tıklayarak hesap bilgilerinizi düzenleyebilirsiniz."
                       }]
},
       DEVICE_INFO :{ 
               TITLE:"Cihaz Bilgileri",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bulut hesabı üzerinden yönetilebilen cihazlar da dahil olmak üzere, tüm cihazların bilgileri görüntülenir."
                       }]
},
       BOUND_ACCOUNT :{ 
               TITLE:"Eşleştirilmiş Hesaplar",
               CONTENT: [{
                           type: "paragraph",
                           content: "Bu tabloda, şu anda cihazınıza bağlı olan tüm bulut hesapları görüntülenir."
                       } ,{                      
                           type: "step",
                           title: "Bir kullanıcı hesabı eşleştir",
       content: [ 
                "1.Eşleştir'e tıklayın.",
                "2.Eşleştirmek istediğiniz kayıtlı e-mail hesabını gir.",
                "3. Kaydet butonuna tıklayınız."]
}]
},
       NEW_PARENTAL_CONTROL :{ 
               TITLE:"Ebeveyn Kontrolleri",
               CONTENT: [{
                           type: "paragraph",
                           content: "Yaş düzeyi filtreleri, erişim kısıtlama ve kullanıcı profilleri sağlayan Ebeveyn Denetimleri, aileniz için kişiselleştirilmiş ve uygun internet erişimi sağlar."
                       } ,{                      
                           type: "step",
                           title: "Yeni bir aygıta Ebeveyn Denetimlerini uygulamak için",
       content: [ 
                "1. Ekle'ye tıklayın.",
                "2. Bu profil için bir ad girin ve bu profilin altına cihaz(lar) eklemek için \"+\" düğmesine tıklayın.",
                "3. Bir Filtre Seviyesi seçin ve filtre içeriğini ihtiyaçlarınıza göre özelleştirin. Veritabanımızda filtrelemek istediğiniz web sitelerini aramak için anahtar kelimeler girebilirsiniz. Diğer web siteleri (URL'ler) manuel olarak girilebilir. <br/>Farklı filtre kategorileri için aşağıdaki açıklamalara bakınız:<p>Yetişkinlere Yönelik İçerik - Cinsel, zararlı veya yasadışı içerik barındıran, pornografi, madde kullanımı, şiddet ve ayrımcılık içeren siteler</p><p>Kumar - Çevrimiçi kumar siteleri de dahil olmak üzere kumar hakkında bilgi veren ve teşvik eden siteler</p><p>Cinsel Eğitim - Üreme, cinsellik, güvenli seks, doğum kontrolü, cinsel yolla bulaşan hastalıklar ve cinsel travma ile başa çıkma gibi cinsellik hakkında konuşulan siteler</p><p>Çevrimiçi İletişim - E-posta, blog, çevrimiçi forum, VoIP ve görüntülü sohbet hizmetleri de dahil olmak üzere metin, ses veya video aracılığıyla başkalarıyla iletişim sağlayan siteler</p><p>Sosyal Ağlar - İnsanları birbirine bağlayan, iletişimi sağlayan, kişisel görüşlerin paylaşılabildiği, gerçek hayattaki tanıdıkların bulunduğu, kariyer, özgeçmiş ve benzer ilgi alanlarındaki aktivitelerin paylaşıldığı siteler</p><p>Pay to Surf - Kullanıcılara belirli web sitelerini, e-posta mesajlarını veya reklamları görüntülemeye, bağlantılara tıklamayı veya anketlere cevap vermeyi telafi eden siteler</p><p>Medya - Kesintisiz yayın yapan servisler, TV programları veya müzik indirme sitelerini kapsayan ücretsiz, ücretli veya üyelikli ses ve/veya video içerik teklifleri sunan siteler</p><p>Karşıdan Yüklemeler - Eşler arası paylaşım, çevrimiçi dosya depolama ve mobil aygıt içeriklerini (ör. müzik & uygulamalar) kapsayan, dosya paylaşımına ve dağıtımına erişim sunan veya bunlara erişim sağlayan siteler</p><p>Oyunlar - Çevrimiçi oyunlar, oyun konsolu ağları ve tarayıcı oyunlarını kapsayan, web tabanlı veya indirilebilir oyunlara erişim yetkisi sunan veya sağlayan siteler</p>",
                "4. Bu profilin çevrimiçi olabileceği toplam süreyi sınırlandırmak istiyorsanız, Zaman Kısıtlama'sını etkinleştirin ve belirli bir zaman tanımlayın. Ayrıca, bu profile tanımlı cihazların interneti kullanamayacağı günlük bir süre belirlemek için Yatma Zamanını da kullanabilirsiniz.",
                "5. Kaydet butonuna tıklayınız."]
} ,{                      
                           type: "step",
                           title: "Bir profilin ayrıntılı internet geçmişini görüntülemek için",
       content: [ 
                "1. Analizler sütununda, ilgili Analizler düğmesine tıklayın.",
                "2. Daha fazla kayıt görmek istiyorsanız, Geçmiş <span class=\"ptl-ctr-help-icon history\"></span> düğmesine tıklayın.",
                "3. <span class=\"ptl-ctr-help-icon block\"></span> veya <span class=\"ptl-ctr-help-icon unblock\"></span> butonlarına tıklayarak, web sitelerini engelleyebilir veya engelini kaldırabilirsiniz."]
} ,{                      
                           type: "step",
                           title: "Internet erişimini hemen devre dışı bırakmak veya etkinleştirmek için",
       content: [ 
                "Internet Erişim sütununda, karşılık gelen profilin internet erişimini cihazdan durdurmak için <span class=\"ptl-ctr-help-icon stop\"></span> tıklayın ve erişimi tekrar etkinleştirmek için <span class=\"ptl-ctr-help-icon enable\"></span> tıklayın."]
}]
},
       BASIC_QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (Hizmet Kalitesi) özelliği, en çok ihtiyaç duyduğunuzda, daha hızlı bir ağ bağlantısını garanti altına almak için online aktiviteleri ve cihazları önceliklendirir."
                       } ,{                      
                           type: "paragraph",
                           content: "Online aktivitelerde ağ hızını önceliklendirmek için Uygulama Önceliğini ve aygıtların ağ hızını önceliklendirmek içinse Aygıt Önceliğini seçin."
                       }]
},
       BASIC_APPLICATION_PRIORITY :{ 
               TITLE:"Uygulama Önceliği",
               CONTENT: [{
                           type: "paragraph",
                           content: "Öncelik vermek istediğiniz online aktiviteyi seçin veya her online aktivitenin öncelik düzeyini ayarlamak için Özel'e tıklayın."
                       }]
},
       BASIC_DEVICE_PRIORITY :{ 
               TITLE:"Aygıt Önceliği",
               CONTENT: [{
                           type: "paragraph",
                           content: "Önceliklemek istediğiniz cihaz(lar)ı ve ne kadar süre öncelikli olacağını seçin."
                       } ,{                      
                           type: "step",
                           title: "Bir aygıta öncelik vermek için",
       content: [ 
                "1. Listeden önceliklendirmek istediğiniz cihazı bulun ve Öncelik seçeneğini değiştirin.",
                "2. Zamanlama sütununda cihazın ne kadar süre öncelikli olacağını seçin."]
}]
},
       ANTI_VIRUS :{ 
               TITLE:"Antivirüs",
               CONTENT: [{
                           type: "paragraph",
                           content: "Sık yapılan ağ taramaları, kötü niyetli site tespiti ve virüslü cihaz izolasyonu ile Antivirus özelliği kişisel bilgilerinizi güven altına alıyor. Ağınızın korunma biçimini ve ağınıza herhangi bir saldırı olup olmadığını da kontrol edebilirsiniz."
                       } ,{                      
                           type: "paragraph",
                           content: "Geçmiş - Antivirus tarafından korunan cihazları, saldırıların kaynağını ve sınıflandırmasını kaydeder."
                       } ,{                      
                           type: "paragraph",
                           content: "Tümünü Etkinleştir - Bir veya daha fazla etkin değilse tüm Koruma Türlerini etkinleştirmek için dokunun."
                       } ,{                      
                           type: "paragraph",
                           content: "Koruma Türleri - Açıklamalara göre Koruma Türlerini etkinleştirin. Tüm Koruma Türlerini etkinleştirmeniz önerilir."
                       }]
},
       APPLICATION_PRIORITY :{ 
               TITLE:"Uygulama Önceliği",
               CONTENT: [{
                           type: "paragraph",
                           content: "Uygulama Önceliği özelliği, en çok ihtiyaç duyduğunuzda daha hızlı bir ağ bağlantısını garanti altına almak için çevrimiçi etkinliklere öncelik tanır. Öncelik vermek istediğiniz çevrimiçi etkinliği seçin veya her çevrimiçi etkinliğin öncelik düzeyini ayarlamak için Özel'e tıklayın."
                       }]
},
       DEVICE_PRIORITY :{ 
               TITLE:"Aygıt Önceliği",
               CONTENT: [{
                           type: "paragraph",
                           content: "Aygıt Önceliği özelliği, cihazlarınıza en çok ihtiyaç duyduğunuzda daha hızlı bir ağ bağlantısını garanti etmek için öncelik tanır. Önceliklendirmek istediğiniz cihaz(lar)ı ve ne kadar süre öncelikli olacağını seçiniz."
                       } ,{                      
                           type: "step",
                           title: "Bir aygıta öncelik vermek için",
       content: [ 
                "1. Listeden önceliklendirmek istediğiniz cihazı bulun ve Öncelik seçeneğini değiştirin.",
                "2. Zamanlama sütununda cihazın ne kadar süre öncelikli olacağını seçin."]
}]
},
       FIREWALL :{ 
               TITLE:"Güvenlik Duvarı",
               CONTENT: [{
                           type: "paragraph",
                           content: "SPI (Stateful Packet Inspection) Firewall, siber saldırıları engeller ve protokole göre yönlendiriciden geçen trafiği doğrular. Varsayılan olarak, bu özellik etkindir."
                       } ,{                      
                           type: "name",
                           title: "SPI Firewall Etkinleştir",
                           content: "SPI Firewall özelliğini gerekmedikçe devre dışı bırakmayın."
                       } ,{                      
                           type: "name",
                           title: "WAN Portundan Ping'e İzin Ver/LAN Portundan Ping'e İzin Ver",
                           content: "WAN / LAN bağlantı noktasından ping paketlerine izin vermek için etkinleştirin. Varsayılan ayarları korumanız önerilir."
                       }]
},
       "" :     ""
    };
})(jQuery);
