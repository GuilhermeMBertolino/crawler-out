// JavaScript Document
(function($) {
    $.helpContent = {
        trafficCtrl: {
            TITLE: "頻寬控制",
            CONTENT: [{
                type: "paragraph",
                content: "頻寬控制能讓您設定網路的上傳頻寬與下載頻寬，而合計吞吐量不應該超過1000000 Kbps。為了達到最佳的頻寬控制，請選擇正確的線路類型並請教您的ISP總計允許的上傳與下載頻寬。"
            }, {
                type: "name",
                title: "啟用",
                content: "勾選該核取方塊以啟用頻寬控制功能。"
            }, {
                type: "name",
                title: "總計上傳頻寬",
                content: "請輸入經過WAN連接埠的總計上傳速度。"
            }, {
                type: "name",
                title: "總計下載頻寬",
                content: "請輸入經過WAN連接埠的總計下載速度。"
            }, {
                type: "title",
                content: "控制規則"
            }, {
                type: "name",
                title: "描述",
                content: "顯示被控制的IP範圍與通訊埠範圍。"
            }, {
                type: "name",
                title: "優先級",
                content: "顯示規則的優先層級，其中1是最高優先層級而8是最低優先層級。總計上傳與下載頻寬將會被分配給全部頻寬控制規則的保證最小速率。"
            }, {
                type: "name",
                title: "上傳（最小/最大）",
                content: "用Kbps顯示最小與最大上傳頻寬。"
            }, {
                type: "name",
                title: "下載（最小/最大）",
                content: "用Kbps顯示最小與最大下載頻寬。"
            }, {
                type: "name",
                title: "啟用",
                content: "指出一個規則目前的狀態。點選燈泡圖示以啟用或停用該規則。"
            }, {
                type: "name",
                title: "修改",
                content: "顯示修改或刪除對應規則的選項。"
            }, {
                type: "note",
                title: "增加一個新規則",
                content: [
                    "點選「增加」。",
                    "輸入要被控制的IP位址的範圍。",
                    "輸入要被控制的通訊埠號碼的範圍。",
                    "為此規則選擇通訊協定類型。",
                    "為此規則選擇優先層級。（1是最高優先層級。）",
                    "請以Kbps為單位，輸入經過WAN連接埠的最小與最大上傳頻寬。",
                    "請以Kbps為單位，輸入經過WAN連接埠的最小與最大下載頻寬。",
                    "選擇「啟用此項目」。",
                    "點選「確定」。"
                ]
            }, {
                type: "paragraph",
                content: "<strong>刪除多個規則</strong><br>在控制規則列表中，勾選想要刪除的規則的對應核取方塊，並點選表格上方的「刪除」。"
            }]
        },
        accessControl: {
            TITLE: "存取控制",
            CONTENT: [{
                type: "paragraph",
                content: "存取控制被用於允許或封鎖特定的電腦與其它設備存取您的網路。當一個設備被封鎖了，它可以從路由器取得一個IP位址，但是不能與其它設備通訊或連線到網際網路。"
            }, {
                type: "paragraph",
                content: "<strong>註：</strong>若要使用存取控制，請啟用此功能並依照應用指南的步驟進行。如果存取控制是停用的（關閉），則所有的設備都可以存取您的網路，包括黑名單上的設備。"
            }, {
                type: "name",
                title: "存取控制",
                content: "切換至「開」以啟用存取控制功能。"
            }, {
                type: "title",
                content: "存取模式"
            }, {
                type: "name",
                title: "黑名單",
                content: "選擇以封鎖來自於下面列表中的設備的存取。"
            }, {
                type: "name",
                title: "白名單",
                content: "選擇以只允許來自於下面列表中的設備的存取。"
            }, {
                type: "title",
                content: "在黑名單/白名單上的設備"
            }, {
                type: "note",
                title: "<strong>將設備加入黑名單或白名單</strong>",
                content: [
                    "點選「增加」圖示。",
                    "輸入設備名稱。",
                    "輸入設備的MAC位址。",
                    "點選「確定」。"
                ]
            }, {
                type: "paragraph",
                content: "<strong>若要修改或刪除在黑名單/白名單上的設備</strong><br>在黑名單/白名單表格中，點選您想要修改或刪除的設備的對應「編輯」圖示或「垃圾桶」圖示。"
            }, {
                type: "paragraph",
                content: "<strong>若要刪除在黑名單/白名單上的多個設備</strong><br>在黑名單/白名單表格中，選擇所有您想要刪除的設備，接著點選表格上方的「刪除」。"
            }, {
                type: "title",
                content: "在線設備"
            }, {
                type: "name",
                title: "設備名稱",
                content: "顯示已連線設備的名稱。"
            }, {
                type: "name",
                title: "IP位址",
                content: "顯示已連線設備的IP位址。"
            }, {
                type: "name",
                title: "MAC位址",
                content: "顯示已連線設備的MAC位址。"
            }, {
                type: "name",
                title: "連線類型",
                content: "顯示已連線設備的連線類型（無線或有線）。"
            }, {
                type: "paragraph",
                content: "<strong>若要封鎖一個或多個設備</strong><br>請於「在線設備」表格中，選擇您想封鎖的設備，接著點選表格上方的封鎖。被選擇的設備將會自動添加成為黑名單上的設備。"
            }]
        },
        arpBind: {
            TITLE: "設定",
            CONTENT: [{
                type: "paragraph",
                content: "IP與MAC綁定（也被認為是ARP綁定）是透過綁定設備的IP位址與MAC位址在一起，以控制區域網路上特定電腦的存取的有用功能。IP與MAC綁定也能防止來自於使用特定IP位址的其它設備。"
            }, {
                type: "name",
                title: "IP與MAC綁定",
                content: "切換至「開」以啟用IP與MAC綁定功能。"
            }, {
                type: "title",
                title: "綁定列表"
            }, {
                type: "note",
                title: "<strong>若要設定設備具有ARP綁定</strong>",
                content: [
                    "點選「增加」。",
                    "請輸入設備的MAC位址。",
                    "請輸入您想要綁定至上方MAC位址的IP位址。",
                    "選擇「啟用」。",
                    "點選「確定」。"
                ]
            }, {
                type: "paragraph",
                content: "<strong>若要修改或刪除一個項目</strong><br>在綁定列表中，點選您想要修改或刪除的設備的對應「編輯」圖示或「垃圾桶」圖示。"
            }, {
                type: "paragraph",
                content: "<strong>若要刪除多個項目</strong><br>在綁定列表中，選擇所有您想要刪除的設備，接著點選表格上方的「刪除」。"
            }, {
                type: "title",
                title: "ARP列表"
            }, {
                type: "paragraph",
                content: "顯示目前已連線設備的MAC與IP位址。"
            }, {
                type: "name",
                title: "設備名稱",
                content: "顯示已連線設備的名稱。"
            }, {
                type: "name",
                title: "MAC位址",
                content: "顯示已連線設備的MAC位址。"
            }, {
                type: "name",
                title: "IP位址",
                content: "顯示分配給已連線設備的IP地址。"
            }, {
                type: "name",
                title: "已綁定",
                content: "指出該MAC與IP位址是否已綁定。"
            }, {
                type: "name",
                title: "修改",
                content: "顯示刪除來自於該列表對應項目的選項。"
            }, {
                type: "paragraph",
                content: "<strong>註：</strong>您不能綁定相同的IP位址給超過一個MAC位址。"
            }, {
                type: "paragraph",
                content: "<strong>若要綁定多個設備</strong><br>在ARP列表中，選擇您想要綁定它們的IP位址到它們的MAC位址的設備，接著點選表格上方的「綁定」。"
            }]
        },
        alg: {
            TITLE: "應用層閘道（ALG）",
            CONTENT: [{
                type: "paragraph",
                content: "ALG允許為某些應用層「控制/資料」協定（如：FTP、TFTP、H323等）自訂網路位址轉譯（NAT）穿透過濾器以被插入閘道來支援位址與通訊埠轉譯。建議啟用ALG。"
            }, {
                type: "name",
                title: "PPTP穿透",
                content: "勾選核取方塊以啟用PPTP穿透功能，允許透過IP網路打開點對點會話通道並穿過路由器。"
            }, {
                type: "name",
                title: "L2TP穿透",
                content: "勾選核取方塊以啟用L2TP穿透功能，允許透過IP網路打開第2層點對點會話通道並穿過路由器。"
            }, {
                type: "name",
                title: "IPSec穿透",
                content: "勾選核取方塊以啟用IPsec穿透功能，允許透過IP網路打開網際網路協定安全性（IPsec）通道並穿過路由器。IPSec使用加密的安全服務以確保在IP網路的隱私和安全通訊。"
            }, {
                type: "name",
                title: "FTP ALG",
                content: "勾選核取方塊以啟用FTP ALG功能，允許FTP（檔案傳輸協定）用戶端與伺服器透過NAT傳輸檔案。"
            }, {
                type: "name",
                title: "TFTP ALG",
                content: "勾選核取方塊以啟用TFTP ALG功能，允許TFTP（瑣碎檔案傳輸協定）用戶端與伺服器透過NAT傳輸檔案。"
            }, {
                type: "name",
                title: "RTSP ALG",
                content: "如果選擇，它允許媒體播放器用戶端透過NAT與串流媒體伺服器溝通。"
            }, {
                type: "name",
                title: "H323 ALG",
                content: "勾選核取方塊以啟用H323 ALG功能，允許微軟網路會議用戶端透過NAT進行溝通。"
            }, {
                type: "name",
                title: "SIP ALG",
                content: "勾選核取方塊以啟用SIP ALG功能，允許SIP用戶端與伺服器穿過NAT傳輸資料。"
            }, {
                type: "name",
                title: "儲存",
                content: "點選以儲存您所有的設定。"
            }]
        },
        virtualServer: {
            TITLE: "虛擬伺服器",
            CONTENT: [{
                type: "paragraph",
                content: "虛擬服務器是用來在本地網路上設定公開的服務。虛擬服務器被定義為一個外部通訊埠，而所有來自於網際網路對此外部通訊埠的請求都將被重新導向至指定的電腦，外部通訊埠的所有請求將被重新導向到指定的電腦，其必須使用固定或保留的IP位置來設定。"
            }, {
                type: "name",
                title: "服務類型",
                content: "顯示您的虛擬伺服器的名稱。"
            }, {
                type: "name",
                title: "外部通訊埠",
                content: "顯示被虛擬伺服器使用的通訊埠號碼或範圍。"
            }, {
                type: "name",
                title: "內部IP",
                content: "顯示電腦運行服務應用的IP位址。"
            }, {
                type: "name",
                title: "內部通訊埠",
                content: "顯示電腦運行服務應用的通訊埠號碼。"
            }, {
                type: "name",
                title: "通訊協定",
                content: "顯示服務應用使用的通訊協定：TCP、UDP、或全部（此路由器支援的全部的通訊協定）。"
            }, {
                type: "name",
                title: "狀態",
                content: "指出虛擬伺服器目前的狀態。點選燈泡圖示以啟用（或停用）虛擬伺服器項目。"
            }, {
                type: "name",
                title: "修改",
                content: "顯示修改或刪除對應規則的選項。"
            }, {
                type: "note",
                title: "<strong>若要增加虛擬伺服器項目</strong>",
                content: [
                    "點選「增加」。",
                    "從下拉列表中選擇一個介面名稱。",
                    "點選「查看現存應用」，並從列表選擇一個服務以自動填入對應的通訊埠號碼至「外部通訊埠」與「內部通訊埠」欄位。如果服務不在列表中，請輸入外部通訊埠號碼（如：21）或通訊埠範圍（如：21-25）。如果外部通訊埠與內部通訊埠相同且外部通訊埠為單一通訊埠（如：21），則只要輸入特定的號碼至外部通訊埠，內部通訊埠可保留空白。",
                    "請以點分十進制格式輸入電腦運行服務應用的IP位址到內部IP欄位。",
                    "請從通訊協定下拉列表選擇服務應用的通訊協定：TCP、UDP或全部。",
                    "選擇「啟用此項目」。",
                    "點選「確定」。"
                ]
            }, {
                type: "paragraph",
                content: "<strong>若要修改或刪除一個虛擬伺服器項目</strong><br>點選您想要修改或刪除的項目的對應「編輯」圖示或「垃圾桶」圖示。"
            }, {
                type: "paragraph",
                content: "<strong>若要刪除多個項目</strong><br>選擇所有您想要刪除的虛擬伺服器項目，接著點選表格上方的「刪除」。"
            }, {
                type: "paragraph",
                content: "<strong>註：</strong><br>如果您的本地主機運行超過一種可用的服務類型，您必須為每個服務都創建一個虛擬伺服器。"
            }]
        },
        portTrigger: {
            TITLE: "通訊埠觸發",
            CONTENT: [{
                type: "paragraph",
                content: "通訊埠觸發被用以轉發某個通訊埠上的流量到網路上的一個特定的伺服器。"
            }, {
                type: "name",
                title: "應用",
                content: "顯示應用的名稱。"
            }, {
                type: "name",
                title: "觸發通訊埠",
                content: "顯示用於觸發外部連線的過濾規則的外部流量通訊埠。"
            }, {
                type: "name",
                title: "觸發通訊協定",
                content: "顯示觸發通訊埠使用的通訊協定：TCP、UDP、或全部（此路由器支援的所有通訊協定）。"
            }, {
                type: "name",
                title: "外部通訊埠",
                content: "顯示被遠端系統使用的通訊埠或通訊埠範圍。使用其中一個通訊埠的反應將被轉發到觸發此規則的電腦。您最多可以輸入5個通訊埠（或通訊埠段）的群組。每個群組必須以英文逗點分隔，例如：2000-2038, 2046, 2050-2051, 2085, 3010-3030。"
            }, {
                type: "name",
                title: "外部通訊協定",
                content: "顯示連入通訊埠使用的通訊協定：TCP、UDP、或全部（此路由器支援的所有通訊協定）。"
            }, {
                type: "name",
                title: "狀態",
                content: "指出通訊埠觸發項目的目前狀態。點選燈泡圖示以啟用（或停用）該項目。"
            }, {
                type: "name",
                title: "修改",
                content: "顯示修改或刪除對應規則的選項。"
            }, {
                type: "note",
                title: "<strong>設定通訊埠觸發項目</strong><br><strong>註：</strong>每個規則同時只能被一個主機使用。",
                content: [
                    "點選「增加」。",
                    "從下拉列表中選擇一個介面名稱。",
                    "點選「查看現存應用」，並從列表選擇一個服務以自動填入預設值至對應的欄位。如果您想增加不在列表中的應用，請手動輸入該應用、觸發通訊埠、觸發通訊協定、外部通訊埠與外部通訊協定。<br><strong>註：</strong>通訊埠觸發項目不能與任何通訊埠範圍彼此重疊（例如：項目1的通訊埠範圍是4200-4205，這代表項目2的通訊埠範圍不可設為4203-4206）。",
                    "選擇「啟用此項目」。",
                    "點選「確定」。"
                ]
            }, {
                type: "paragraph",
                content: "<strong>若要修改或刪除一個通訊埠觸發項目</strong><br>在表格中，點選您想要修改或刪除的項目的對應「編輯」圖示或「垃圾桶」圖示。"
            }, {
                type: "paragraph",
                content: "<strong>若要刪除多個項目</strong><br>在表格中，選擇所有您想要刪除的項目，接著點選表格上方的「刪除」。"
            }]
        },
        dmz: {
            TITLE: "DMZ",
            CONTENT: [{
                type: "paragraph",
                content: "DMZ（非軍事區）主機功能允許本地主機為了專用的服務而暴露在網際網路上，例如：網際網路遊戲或視訊會議。基本上，DMZ就是允許區域網路上的一台電腦，打開它的所有通訊埠。這台電腦一般需設定為固定IP地址，並停用它的DHCP客戶端功能。"
            }, {
                type: "note",
                title: "<strong>指派電腦或伺服器作為DMZ主機</strong>",
                content: [
                    "選擇啟用DMZ。",
                    "請輸入本地電腦IP位址作為DMZ主機。",
                    "點選「儲存」。"
                ]
            }]
        },
        upnp: {
            TITLE: "UPnP",
            CONTENT: [{
                type: "paragraph",
                content: "預設情況下，萬用隨插即用（UPnP）功能是啟用的，這允許設備（如：電腦與網際網路設備）在本地網路上彼此自動偵測與通訊。"
            }, {
                type: "name",
                title: "UPnP",
                content: "切換至「開」以啟用UPnP功能。"
            }, {
                type: "title",
                content: "UPnP服務列表"
            }, {
                type: "paragraph",
                content: "UPnP服務列表顯示UPnP設備資訊。"
            }, {
                type: "name",
                title: "總計用戶端",
                content: "顯示UPnP設備的總數量。"
            }, {
                type: "name",
                title: "服務描述",
                content: "顯示啟動UPnP請求的本地主機的簡短描述。"
            }, {
                type: "name",
                title: "外部通訊埠",
                content: "顯示本地主機開啟的外部通訊埠。"
            }, {
                type: "name",
                title: "通訊協定",
                content: "顯示本地主機使用的網路通訊協定。"
            }, {
                type: "name",
                title: "內部IP位址",
                content: "顯示本地主機的IP位址。"
            }, {
                type: "name",
                title: "內部通訊埠",
                content: "顯示本地主機開啟的內部通訊埠。"
            }, {
                type: "paragraph",
                content: "點選<strong>重新整理</strong>以更新UPnP服務列表。"
            }]
        },
        wlGuestDulBandAdv: {
            TITLE: "訪客網路",
            CONTENT: [{
                type: "paragraph",
                content: "訪客網路允許您使用分隔的網路名稱（SSID）與密碼，建立一個隔離的無線網路，讓您的訪客可以存取網際網路。"
            }, {
                type: "title",
                content: "設定"
            }, {
                type: "name",
                title: "允許訪客互相看見",
                content: "勾選此核取方塊以允許在訪客網路上的無線設備可以彼此互通。"
            }, {
                type: "name",
                title: "允許訪客存取我的本地網路",
                content: "勾選此核取方塊以允許在訪客網路上的無線設備可以存取您的本地網路。"
            }, {
                type: "name",
                title: "儲存",
                content: "點選以儲存所有您的設定。"
            }, {
                type: "title",
                content: "無線設定"
            }, {
                type: "name",
                title: "2.4GHz | 5GHz-1 | 5GHz-2 訪客網路",
                content: "點選對應的按鈕以啟用2.4GHz | 5GHz-1 | 5GHz-2訪客網路。"
            }, {
                type: "name",
                title: "訪客網路SSID",
                content: "請使用預設的SSID或使用1至32個字元創建新名稱。此欄位需注意英文大小寫不同。"
            }, {
                type: "name",
                title: "安全性",
                content: "請為訪客網路選擇安全性選項：",
                children: [{
                    type: "name",
                    title: "無",
                    content: "預設情況下，訪客網路的安全性被設定為「無」；任何人都可以存取。"
                }, {
                    type: "name",
                    title: "WPA/WPA2 - 個人",
                    content: "選擇此選項以啟用基於預先共用金鑰（PSK）的標準驗證方法，也稱為通行碼。如果選擇此選項，請設定以下項目。",
                    children: [{
                        type: "name",
                        title: "版本",
                        content: "請選擇您無線網路的安全性版本。",
                        children: [{
                            type: "name",
                            title: "自動",
                            content: "此選項支援多個WPA（Wi-Fi保護存取）標準的執行，例如：WPA與WPA2。"
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "此選項支援AES加密，可以提供比WPA-PSK更好層級的安全性。推薦選擇此選項。"
                        }]
                    }, {
                        type: "name",
                        title: "加密",
                        content: "請選擇一個安全性加密類型：自動（TKIP與AES二者）、TKIP（臨時密鑰完整性協定）或者AES（進階加密標準）。 如果路由器運作在802.11n模式時，我們不建議您使用TKIP加密方式，因為802.11n不支援TKIP。此外若選擇TKIP，WPS功能將會被停用。"
                    }]
                }]
            }, {
                type: "name",
                title: "密碼",
                content: "請創建一個介於8-63個ASCII字元或8-64個十六進位字元（0-9，a-f，A-F）的密碼。"
            }, {
                type: "paragraph",
                content: "上方給2.4GHz訪客網路的說明，也同樣適用於5GHz-1 | 5GHz-2訪客網路。"
            }, {
                type: "name",
                title: "儲存",
                content: "點選以儲存您所有的設定。"
            }]
        },
        wirelessStat: {
            TITLE: "在線設備",
            CONTENT: [{
                type: "name",
                title: "MAC位址",
                content: "顯示已連結的無線用戶端的MAC位址。"
            }, {
                type: "name",
                title: "連線類型",
                content: "顯示該無線用戶端連線的射頻頻段（2.4GHz或5GHz）。"
            }, {
                type: "name",
                title: "安全性",
                content: "顯示已連結的無線用戶端的安全性類型（無、WEP、WPA/WPA2-個人或WPA/WPA2-企業）。"
            }, {
                type: "name",
                title: "已接收封包",
                content: "顯示已連結的無線用戶端已接收的封包數量。"
            }, {
                type: "name",
                title: "已傳送封包",
                content: "顯示已連結的無線用戶端已傳送的封包數量。"
            }, {
				type: "name",
				title: "傳輸速率",
				content: "顯示由客戶提供最後封包的無線相關速率數據。"
			}, {
                type: "paragraph",
                content: "點選<strong>重新整理</strong>以更新在此頁面的資訊。"
            }]
        },
        wirelessAdv: {
            TITLE: "進階設定",
            CONTENT: [{
                type: "name",
                title: "2.4GHz | 5GHz-1 | 5GHz-2",
                content: "選擇2.4GHz | 5GHz-1 | 5GHz-2以設定它的進階無線設定。"
            }, {
                type: "name",
                title: "信標間隔",
                content: "以毫秒輸入介於25至1000之間的值，以決定藉由路由器廣播用來同步無線網路的信標封包之間的持續時間。預設值為100毫秒。"
            }, {
                type: "name",
                title: "RTS臨界值",
                content: "輸入1至2346之間的值，以決定能夠通過該路由器數據傳輸的封包大小。在預設情況下，RTS（請求發送）臨界值的大小是2346。如果封包的大小大於預先設定的臨界值，則路由器發送請求發送訊框到特定接收站並協商資料訊框的發送，否則封包將被立即發送。"
            }, {
                type: "name",
                title: "DTIM間隔",
                content: "請輸入介於1至255之間的值以決定傳輸指示訊息（DTIM）的間隔。1表示DTIM間隔與信標間隔相同。"
            }, {
                type: "name",
                title: "群組金鑰更新週期",
                content: "請輸入秒的數量（最小為30）以控制加密金鑰自動更新的時間間隔。預設值為0，代表金鑰不更新。"
            }, {
                type: "name",
                title: "WMM",
                content: "此功能保證了含有高優先級訊息的封包會被優先傳輸。 WMM是根據802.11n或802.11ac模式強制啟用。強烈建議啟用WMM。"
            }, {
                type: "name",
                title: "短GI",
                content: "此功能為預設且建議為啟用，它可藉由縮減保護間隔（GI）的時間以增加資料容量。"
            }, {
                type: "name",
                title: "AP隔離",
                content: "選擇核取方塊以啟用AP隔離功能，這允許您去限制在您的無線網路上的所有無線設備彼此互動但它們仍然能夠存取網際網路。預設情況下，AP隔離是停用的。"
            }, {
                type: "title",
                content: "WDS"
            }, {
                type: "name",
                title: "WDS橋接",
                content: "勾選核取方塊以啟用WDS（無線散佈系統）橋接功能，這允許路由器在無線區域網路內（WLAN）去橋接另一個基地台（AP）。如果啟用此功能，請設定下列項目："
            }, {
                type: "name",
                title: "SSID（被橋接）",
                content: "請輸入您的路由器將做為用戶端去連接的WAP（無線基地台）的SSID，或使用「調查」功能去掃描並顯示範圍內所有可用的網路。"
            }, {
                type: "name",
                title: "MAC位址（被橋接）",
                content: "請用以連接線分隔的12個16位字元（0-9，a-f，A-F）格式輸入路由器，這將做為用戶端去連接的WAP（無線基地台）的MAC位址。如果您透過「調查」功能選擇網路，該MAC位址欄位則會被自動填入。"
            }, {
                type: "name",
                title: "調查",
                content: "點選此按鈕以掃描與顯示範圍內所有可用無線網路的MAC位址、SSID、訊號強度、頻道與安全性資訊。一旦您選擇了一個網路，該SSID、MAC位址、安全性將會被自動填入。",
                children: [{
                    type: "name",
                    title: "AP列表",
                    content: "顯示您的路由器可以連接的AP的資訊。"
                }, {
                    type: "name",
                    title: "MAC位址（被橋接）",
                    content: "顯示您的路由器正要做為用戶端連接的AP的MAC位址。"
                }, {
                    type: "name",
                    title: "SSID",
                    content: "顯示您的路由器正要做為用戶端連接的AP的SSID。"
                }, {
                    type: "name",
                    title: "訊號強度",
                    content: "顯示您的路由器正要做為用戶端連接的AP的訊號強度。"
                }, {
                    type: "name",
                    title: "頻道",
                    content: "顯示您的路由器正要做為用戶端連接的AP的頻道。"
                }, {
                    type: "name",
                    title: "加密",
                    content: "顯示您的路由器正要做為用戶端連接的AP的加密類型。"
                }, {
                    type: "name",
                    title: "連線",
                    content: "點選該圖示以從對應的AP連線或中斷連線。"
                }]
            }, {
                type: "name",
                title: "安全性",
                content: "請為訪客網路選擇安全性選項：",
                children: [{
                    type: "name",
                    title: "無",
                    content: "選擇此選項以停用無線安全性。高度推薦您啟用無線安全性以保護您的無線網路遠離未驗證的存取。"
                }, {
                    type: "name",
                    title: "WPA/WPA2個人",
                    content: "選擇此選項以啟用基於預先共用金鑰（PSK）的標準驗證方法，也稱為通行碼。此選項是被推薦的。如果選擇此選項，請設定以下項目。",
                    children: [{
                        type: "name",
                        title: "版本",
                        content: "請選擇您的無線網路的安全性版本。",
                        children: [{
                            type: "name",
                            title: "WPA-PSK",
                            content: "此選項支援TKIP加密，這提供比WPA2-PSK更低層級的安全性。"
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "此選項支援AES加密，可以提供比WPA-PSK更好層級的安全性。推薦選擇此選項。"
                        }]
                    }, {
                        type: "name",
                        title: "加密",
                        content: "請選擇一個安全性加密類型：TKIP（臨時密鑰完整性協定）或者AES（進階加密標準）。 如果路由器運作在802.11n模式時，我們不建議您使用TKIP加密方式，因為802.11n不支援TKIP。此外若選擇TKIP，WPS功能將會被停用。"
                    }, {
                        type: "name",
                        title: "密碼",
                        content: "請輸入介於8-63個ASCII字元或8-64個十六進位字元的無線密碼到此欄位。"
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "如果任何您的客戶端設備僅能使用WEP（有線等效加密）存取無線，請選擇此選項以啟用基本的驗證方法。",
                    children: [{
                        type: "name",
                        title: "類型",
                        content: "為您的無線網路選擇驗證類型。請基於無線客戶端的相容性與存取請求選擇開放系統或共用金鑰。"
                    }, {
                        type: "name",
                        title: "WEP金鑰格式",
                        content: "可以選擇使用 ASCII碼格式或十六進位碼。ASCII格式是字母和數字字元的組合。十六進位格式則是數字（0-9）與字母（A-F，a-f）的組合。"
                    }, {
                        type: "name",
                        title: "金鑰索引",
                        content: "選擇將被使用的4個金鑰的其中之一，並在金鑰值欄位，輸入符合您創建的WEP金鑰。並確保在您的網路中的所有無線站的這些值是相同的。"
                    }, {
                        type: "name",
                        title: "金鑰值",
                        content: "請輸入符合您創建的WEP金鑰。"
                    }]
                }]
            }, {
                type: "name",
                title: "儲存",
                content: "點選以儲存設定。"
            }]
        },
        wirelessSchedule: {
            TITLE: "無線排程",
            CONTENT: [{
                type: "paragraph",
                content: "時間排程的效用是基於路由器的時間。時間可以在「系統工具->時間設定」中進行設定。"
            }, {
                type: "name",
                title: "2.4GHz | 5GHz-1 | 5GHz-2",
                content: "選擇2.4GHz、5GHz-1或5GHz-2以設定它的無線排程。"
            }, {
                type: "name",
                title: "無線排程",
                content: "切換至「開」以啟用此功能。然後點選並拖動過這些格子以設定要關閉無線的時間週期。"
            }, {
                type: "name",
                title: "還原",
                content: "點選以還原時間選擇。"
            }, {
                type: "name",
                title: "儲存",
                content: "點選以儲存設定。"
            }]
        },
        macFilter: {
            TITLE: "MAC過濾設定",
            CONTENT: [{
                type: "name",
                title: "MAC過濾",
                content: "切換至「開」以使用個別設備的MAC地址控制無線存取。"
            }, {
                type: "title",
                title: "過濾規則"
            }, {
                type: "name",
                title: "封鎖以下列表中設備的無線存取",
                content: "選擇以封鎖以下列表中設備的無線存取。"
            }, {
                type: "name",
                title: "僅允許以下列表中設備的無線存取",
                content: "選擇以僅允許以下列表中設備的無線存取。"
            }, {
                type: "title",
                title: "設備列表"
            }, {
                type: "name",
                title: "MAC位址/描述",
                content: "顯示設備的MAC位址與描述。"
            }, {
                type: "name",
                title: "啟用",
                content: "點選燈泡圖示以啟用或停用該設備的MAC過濾。"
            }, {
                type: "name",
                title: "修改",
                content: "顯示修改或刪除對應規則的選項。"
            }, {
                type: "note",
                title: "增加新的設備",
                content: [
                    "點選增加。",
                    "輸入該設備的MAC位址。",
                    "請輸入該設備的描述。",
                    "點選「啟用此項目」。",
                    "點選「確定」。"
                ]
            }]
        },
        wirelessSettings: {
            TITLE: "無線設定",
            CONTENT: [/*{
                type: "name",
                title: "地區",
                content: "請在下拉式選單中選擇您的地區。此欄位地區的路由器的無線功能可以被使用。如果在此欄位使用其它地區而非指定地區的路由器的無線功能，這可能會是違法的。如果您的國家或地區不在列表中，請聯絡您當地的政府部門以尋求協助。"
            }, */{
                type: "name",
                title: "智慧型連線",
                content: "勾選此核取方塊以啟用智慧型連線。此功能可以基於實際的環境，透過分配給設備最佳的無線頻段而幫助設備運行得更快，以平衡網路需求。"
            }, {
                type: "name",
                title: "2.4GHz | 5GHz-1 | 5GHz-2",
                content: "選擇2.4GHz | 5GHz-1 | 5GHz-2以變更對應設定。"
            }, {
                type: "name",
                title: "無線射頻",
                content: "勾選核取方塊以啟用2.4GHz | 5GHz-1 | 5GHz-2無線射頻。"
            }, {
                type: "name",
                title: "無線網路名稱（SSID）",
                content: "您可以保留預設的網路名稱（SSID）或輸入新名稱（最多32個字元）。本欄位請注意大小寫。"
            }, {
                type: "name",
                title: "隱藏SSID",
                content: "如果您想從Wi-Fi網路列表中隱藏2.4GHz | 5GHz-1 | 5GHz-2網路名稱（SSID），請勾選核取方塊。"
            }, {
                type: "name",
                title: "安全性",
                content: "請從下列安全性選項中選擇一個：",
                children: [{
                    type: "name",
                    title: "無安全性",
                    content: "選擇此選項以停用無線安全性。高度推薦您啟用無線安全性以保護您的無線網路遠離未驗證的存取。"
                }, {
                    type: "name",
                    title: "WPA/WPA2個人",
                    content: "選擇此選項以啟用基於預先共用金鑰（PSK）的標準驗證方法，也稱為通行碼。此選項是被推薦的。如果選擇此選項，請設定以下項目。",
                    children: [{
                        type: "name",
                        title: "版本",
                        content: "請選擇您的無線網路的安全性版本。",
                        children: [{
                            type: "name",
                            title: "自動",
                            content: "此選項支援多個WPA（Wi-Fi保護存取）標準的執行，例如：WPA與WPA2。"
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "此選項支援AES加密，可以提供比WPA-PSK更好層級的安全性。推薦選擇此選項。"
                        }]
                    }, {
                        type: "name",
                        title: "加密",
                        content: "請選擇一個安全性加密類型：自動（TKIP與AES二者）、TKIP（臨時密鑰完整性協定）或AES（進階加密標準）。 如果路由器運作在802.11n模式時，我們不建議您使用TKIP加密方式，因為802.11n不支援TKIP。此外若選擇TKIP，WPS功能將會被停用。"
                    }, {
                        type: "name",
                        title: "密碼",
                        content: "請輸入介於8-63個ASCII字元或8-64個十六進位字元的無線密碼到此欄位。"
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2企業",
                    content: "選擇此選項使用RADIUS（遠端使用者撥入驗證服務）伺服器以啟用更多進階驗證方式。如果選擇此選項，將會停用WPS功能。",
                    children: [{
                        type: "name",
                        title: "版本",
                        content: "請選擇您的無線網路的安全性版本。",
                        children: [{
                            type: "name",
                            title: "自動",
                            content: "此選項支援多個WPA（Wi-Fi保護存取）標準的執行，例如：WPA與WPA2。"
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "此選項支援AES加密，可以提供比WPA-PSK更好層級的安全性。推薦選擇此選項。"
                        }]
                    }, {
                        type: "name",
                        title: "加密",
                        content: "請選擇一個安全性加密類型：自動（TKIP與AES二者）、TKIP（臨時密鑰完整性協定）或AES（進階加密標準）。 如果路由器運作在802.11n模式時，我們不建議您使用TKIP加密方式，因為802.11n不支援TKIP。此外若選擇TKIP，WPS功能將會被停用。"
                    }, {
                        type: "name",
                        title: "RADIUS伺服器IP",
                        content: "請輸入RADIUS伺服器的IP位址。"
                    }, {
                        type: "name",
                        title: "RADIUS伺服器通訊埠",
                        content: "請輸入RADIUS伺服器的通訊埠號碼。"
                    }, {
                        type: "name",
                        title: "RADIUS伺服器密碼",
                        content: "請輸入RADIUS伺服器的共用密碼。"
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "如果任何您的客戶端設備僅能使用WEP（有線等效加密）存取無線，請選擇此選項以啟用基本的驗證方法。",
                    children: [{
                        type: "name",
                        title: "類型",
                        content: "為您的無線網路選擇驗證類型。預設值為自動，將會基於無線客戶端的能力與存取請求自動選擇開放系統或共用金鑰。"
                    }, {
                        type: "name",
                        title: "選擇金鑰",
                        content: "選擇將被使用的4個金鑰的其中之一，並在金鑰值欄位中創建一個WEP金鑰。無線用戶端需要輸入符合的WEP金鑰以連線到您的網路。。"
                    }, {
                        type: "name",
                        title: "WEP金鑰格式",
                        content: "可以使用 ASCII碼格式或十六進位碼。ASCII格式是字母和數字字元的組合。十六進位格式則是數字（0-9）與字母（A-F，a-f）的組合。"
                    }, {
                        type: "name",
                        title: "金鑰類型",
                        content: "選擇WEP金鑰長度。",
                        children: [{
                            type: "name",
                            title: "64位元加密",
                            content: "您可以輸入10個十六進位數字（0-9，A-F，a-f）或5個ASCII字元到WEP值欄位。"
                        }, {
                            type: "name",
                            title: "128位元加密",
                            content: "您可以輸入26個十六進位數字（0-9，A-F，a-f）或13個ASCII字元到WEP值欄位。"
                        }]
                    }, {
                        type: "name",
                        title: "金鑰值",
                        content: "請創建一個WEP金鑰。"
                    }]
                }]
            }, {
                type: "name",
                title: "模式",
                content: "請選擇一個混合傳輸模式。"
            }, {
                type: "name",
                title: "頻道",
                content: "請為無線網路選擇一個運作頻道。預設頻道為自動。如果您沒有遇到間歇性的無線連線問題的話，請勿變更它。"
            }, {
                type: "name",
                title: "頻道寬度",
                content: "請為無線網路選擇頻道寬度（頻寬）。"
            }, {
                type: "name",
                title: "傳輸功率",
                content: "選擇高、中、低其中一個選項以指定資料傳輸功率。預設與推薦設定為高。"
            }, {
                type: "paragraph",
                content: "點選<strong>儲存</strong>以儲存您所有的設定。"
            }]
        },
        wps: {
            TITLE: "路由器的PIN碼",
            CONTENT: [{
                type: "name",
                title: "路由器的PIN碼",
                content: "切換至「開」以允許無線設備可以使用路由器的PIN（個人辨識號碼）碼連線到路由器。"
            }, {
                type: "name",
                title: "目前的PIN碼",
                content: "顯示路由器目前的PIN碼。預設的PIN碼可以在路由器的標籤上或於使用手冊中被找到。點選「生成」以亂數生成新的PIN碼，或點選「還原」將目前的PIN碼還原回預設的PIN碼。"
            }, {
                type: "title",
                content: "WPS設定"
            }, {
                type: "name",
                title: "按按鈕（推薦）",
                content: "選擇此設定方式以啟用WPS功能，讓您可以使用WPS按鈕或使用虛擬的連線按鈕，簡單地連線到任何啟用WPS的設備。"
            }, {
                type: "name",
                title: "PIN碼",
                content: "選擇此設定方式可以透過輸入無線設備的WPS PIN碼到該欄位以手動增加設備。"
            }, {
                type: "name",
                title: "連線",
                content: "點選此按鈕以啟動WPS。"
            }]
        },
        parentCtrl: {
            TITLE: "家長監護",
            CONTENT: [{
                type: "paragraph",
                content: "透過家長監護，您可以阻止不適當的、明確的和惡意的網站；或可在一天中的某個時間（例如：在寫家庭作業時對於Facebook或YouTube網站）限制存取。"
            }, {
                type: "name",
                title: "狀態",
                content: "切換至「開」以啟用家長監護功能。預設情況下，此功能為停用的。"
            }, {
                type: "title",
                content: "家長監護下之設備"
            }, {
                type: "paragraph",
                content: "「家長監護下之設備」顯示目前正由家長監護限制的設備列表。"
            }, {
                type: "name",
                title: "設備名稱",
                content: "顯示正在家長監護下的所有已連線設備的名稱。"
            }, {
                type: "name",
                title: "MAC位址",
                content: "顯示正在家長監護下的所有已連線設備的MAC位址。"
            }, {
                type: "name",
                title: "生效時間",
                content: "顯示限制存取的時間週期。"
            }, {
                type: "name",
                title: "描述",
                content: "顯示已連線設備的簡短描述。"
            }, {
                type: "name",
                title: "狀態",
                content: "指出對應設備的家長監護是否啟用。點選燈泡圖示以啟用（或停用）它。"
            }, {
                type: "name",
                title: "修改",
                content: "顯示修改或刪除對應設備的選項。"
            }, {
                type: "note",
                title: "<strong>限制一個新的用戶端設備</strong>",
                content: [
                    "點選「增加」。",
                    "點選「查看現存設備」以從存取列表中選擇目前已連線的設備；或輸入「設備名稱」與「MAC位址」手動增加未連線的設備。",
                    "點選「生效時間」圖示，指定限制應用的時間週期。",
                    "請輸入簡短的描述至「描述」欄位。此欄位為選填。",
                    "選擇「啟用」。",
                    "點選「確定」以儲存此項目。"
                ]
            }, {
                type: "paragraph",
                content: "<strong>若要修改或刪除一個設備</strong><br>在家長監護列表中，簡單地點選您想要修改或刪除的設備的對應「編輯」圖示或「垃圾桶」圖示。"
            }, {
                type: "paragraph",
                content: "<strong>若要刪除多個設備</strong><br>在家長監護列表中，勾選所有您想要刪除的設備的對應核取方塊以進行刪除，接著點選表格上方的「刪除」。"
            }, {
                type: "title",
                title: "內容限制"
            }, {
                type: "paragraph",
                content: "「內容限制」允許您使用關鍵字與網域名稱去限制存取內容。正被家長監護控制的用戶端設備將依限制類型決定可以或不能存取。"
            }, {
                type: "name",
                title: "限制類型",
                content: "選擇下列的限制類型：",
                children: [{
                    type: "name",
                    title: "黑名單",
                    content: "在「家長監護下之設備」列表中的特定用戶端設備會被封鎖存取包含關鍵字與網域名稱的網站。"
                }, {
                    type: "name",
                    title: "白名單",
                    content: "在「家長監護下之設備」列表中的特定用戶端設備會被允許存取包含關鍵字與網域名稱的網站。"
                }]
            }, {
                type: "name",
                title: "增加新關鍵字",
                content: "點選以增加新的關鍵字或網域名稱到黑名單或白名單中。"
            }, {
                type: "paragraph",
                content: "若要刪除關鍵字或網域名稱，請點選您想要刪除的項目旁的「-（減號）」圖示。"
            }, {
                type: "name",
                title: "儲存",
                content: "點選以儲存您的設定。"
            }]
        },
        wlGuestDulBandBasic: {
            TITLE: "訪客網路",
            CONTENT: [{
                type: "paragraph",
                content: "訪客網路允許您使用分隔的網路名稱（SSID）與密碼，建立一個隔離的無線網路，讓您的訪客可以存取網際網路。"
            }, {
                type: "name",
                title: "允許訪客互相看見",
                content: "勾選此核取方塊以允許在訪客網路上的無線設備可以彼此互通。"
            }, {
                type: "name",
                title: "允許訪客存取我的本地網路",
                content: "勾選此核取方塊以允許在訪客網路上的無線設備可以存取您的本地網路。"
            }, {
                type: "name",
                title: "無線網路2.4GHz | 5GHz-1 | 5GHz-2",
                content: "點選對應的按鈕以啟用2.4GHz | 5GHz-1 | 5GHz-2訪客網路。"
            }, {
                type: "name",
                title: "訪客網路SSID",
                content: "請使用預設的SSID或使用1至32個字元創建新名稱。此欄位需注意英文大小寫不同。"
            }, {
                type: "name",
                title: "隱藏SSID",
                content: "如果您想要隱藏訪客網路SSID，請勾選此核取方塊。"
            }, {
                type: "name",
                title: "安全性",
                content: "請為訪客網路選擇安全性選項：",
                children: [{
                    type: "name",
                    title: "無",
                    content: "預設情況下，訪客網路的安全性被設定為「無」；任何人都可以存取。"
                }, {
                    type: "name",
                    title: "設定密碼",
                    content: "請在密碼欄位中，創建一個介於8-63個ASCII字元或8-64個十六進位字元（0-9，a-f，A-F）的密碼。"
                }]
            }]
        },
        networkMap: {
            TITLE: "網際網路",
            CONTENT: [{
                type: "name",
                title: "網際網路狀態",
                content: "顯示目前路由器的網際網路連線的狀態。"
            }, {
                type: "name",
                title: "連線類型",
                content: "顯示您的網際網路連線的類型。"
            }, {
                type: "name",
                title: "IP位址",
                content: "顯示目前分配給路由器的網際網路IP位址。"
            }, {
                type: "name",
                title: "DNS伺服器",
                content: "顯示主要與次要DNS伺服器的IP位址。"
            }, {
                type: "name",
                title: "閘道",
                content: "顯示閘道的IP位址。"
            }, {
                type: "title",
                title: "路由器"
            }, {
                type: "title2",
                content: "2.4GHz | 5GHz-1 | 5GHz-2無線"
            }, {/*
                type: "name",
                title: "狀態",
                content: "顯示2.4GHz | 5GHz-1 | 5GHz-2無線是開（啟用）或關（停用）。"
            }, {*/
                type: "name",
                title: "SSID",
                content: "顯示2.4GHz | 5GHz-1 | 5GHz-2頻段頻率目前的無線網路名稱。"
            }, {
                type: "name",
                title: "頻道",
                content: "顯示無線2.4GHz | 5GHz-1 | 5GHz-2網路廣播的頻道。"
            }, {
                type: "name",
                title: "MAC",
                content: "顯示無線2.4GHz | 5GHz-1 | 5GHz-2目前的MAC位址。"
            }, {
                type: "title2",
                content: "2.4GHz | 5GHz-1 | 5GHz-2訪客網路"
            }, {
                type: "name",
                title: "狀態",
                content: "顯示2.4GHz | 5GHz-1 | 5GHz-2訪客網路是開（啟用）或關（停用）。"
            }, {
                type: "name",
                title: "SSID",
                content: "顯示訪客網路的無線網路名稱。"
            }, {
                type: "title",
                title: "無線/有線用戶端"
            }, {
                type: "name",
                title: "名稱",
                content: "顯示連線到路由器的用戶端的名稱。"
            }, {
                type: "name",
                title: "IP位址",
                content: "顯示用戶端被分配的IP位址。"
            }, {
                type: "name",
                title: "MAC位址",
                content: "顯示用戶的MAC位址。"
            }, {
                display: INCLUDE_VOIP,
                type: "title",
                title: "電話"
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "電話號碼",
                content: "顯示您的電話的名稱。"
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "撥入通話號碼",
                content: "顯示經過您的路由器且由您的電話設備接收的撥入通話號碼。 "
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "內部號碼",
                content: "顯示介於2個連線到相同路由器的電話設備之間撥打的通話號碼。"
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "撥出號碼",
                content: "顯示經過您的路由器且由您的電話設備撥打的撥出通話號碼。預設值為自動，這代表路由器將選擇一個可用的號碼作為外撥號碼，這些可以在VoIP頁面上被變更。"
            }, {
                display: INCLUDE_USB,
                type: "title",
                title: "印表機"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "名稱",
                content: "顯示透過USB連接埠連接到路由器的印表機的名稱。"
            }, {
                display: INCLUDE_USB,
                type: "title",
                title: "USB磁碟"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "品牌",
                content: "顯示連接到路由器的USB磁碟的品牌。"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "總計",
                content: "顯示USB磁碟的總容量。"
            }, {
                display: INCLUDE_USB,
                type: "name",
                title: "可用的",
                content: "顯示USB磁碟的可用空間。"
            }]
        },
        wirelessBasic: {
            TITLE: "無線設定",
            CONTENT: [{
                type: "name",
                title: "2.4GHz | 5GHz-1 | 5GHz-2 無線網路",
                content: "勾選核取方塊以啟用2.4GHz | 5GHz-1 | 5GHz-2無線射頻。"
            }, {
                type: "name",
                title: "無線網路名稱（SSID）",
                content: "您可以保留預設的網路名稱（SSID）或輸入新名稱（最多32個字元）。本欄位請注意大小寫。"
            }, {
                type: "name",
                title: "密碼",
                content: "請輸入介於8-63個ASCII字元或8-64個十六進位字元的無線密碼。本欄位請注意大小寫。"
            }, {
                type: "name",
                title: "隱藏SSID",
                content: "如果您想從Wi-Fi網路列表中隱藏2.4GHz | 5GHz-1 | 5GHz-2網路名稱（SSID），請勾選此核取方塊。"
            }]
        },
        status: {
            TITLE: "網際網路",
            CONTENT: [{
                type: "paragraph",
                content: "顯示關於網際網路連線的相關資訊。"
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                /*type: "name",
                title: "名稱",
                content: "顯示路由器的網際網路連接埠的名稱。"
            }, {*/
                type: "name",
                title: "MAC位址",
                content: "分配給路由器的網際網路（WAN）連接埠的獨一無二的實體位址。"
            }, {
                type: "name",
                title: "IP位址",
                content: "分配給路由器的網際網路（WAN）連接埠的IP位址。如果IP位址顯示為0.0.0.0，表示沒有網際網路存取。"
            }, {
                type: "name",
                title: "子網路遮罩",
                content: "此參數決定IP位址的網路部分與主機部分。"
            }, {
                type: "name",
                title: "預設閘道",
                content: "用於連接路由器到網路的IP位址。"
            }, {
                type: "name",
                title: "主要DNS/次要DNS",
                content: "網域名稱系統（DNS）翻譯主機名稱與網際網路網域為IP位址。這些DNS伺服器的資訊是由網際網路服務供應商（ISP）分配的。"
            }, {
                type: "name",
                title: "連線類型",
                content: "您的網際網路目前的連線類型。"
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "MAC位址",
                content: "分配給路由器的網際網路（WAN）連接埠的獨一無二的實體位址。"
            }, {
                type: "name",
                title: "IP位址",
                content: "分配給路由器的網際網路（WAN）連接埠的IPv6位址。"
            }, {
                type: "name",
                title: "預設閘道",
                content: "用於連接路由器到網路的IP位址。"
            }, {
                type: "name",
                title: "主要DNS/次要DNS",
                content: "網域名稱系統（DNS）翻譯主機名稱與網際網路網域為IP位址。這些DNS伺服器的資訊是由網際網路服務供應商（ISP）分配的。"
            }, {
                type: "name",
                title: "連線類型",
                content: "您的網際網路目前的連線類型。"
            }, {
                type: "title",
                title: "無線"
            }, {
                type: "name",
                title: "2.4G | 5G-1 | 5G-2",
                content: "選擇以查看2.4GHz | 5GHz-1 | 5GHz-2無線設定與資訊。"
            }, {
                type: "name",
                title: "網路名稱",
                content: "無線網路名稱，也稱為SSID（服務設定識別碼）。"
            }, {
                type: "name",
                title: "無線射頻",
                content: "無線網路目前的狀態（開或關）。"
            }, {
                type: "name",
                title: "模式",
                content: "目前的無線模式。"
            }, {
                type: "name",
                title: "頻道寬度",
                content: "無線網路頻道寬度。"
            }, {
                type: "name",
                title: "頻道",
                content: "目前的無線頻道與它對應的頻率（使用GHz）。"
            }, {
                type: "name",
                title: "MAC位址",
                content: "無線網路射頻的MAC位址。"
            }, {
                type: "title",
                title: "LAN"
            }, {
                type: "paragraph",
                content: "顯示關於乙太網路（LAN）連接埠的資訊。"
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                type: "name",
                title: "MAC位址",
                content: "分配給路由器的乙太網路（LAN）連接埠的獨一無二的實體位址。"
            }, {
                type: "name",
                title: "IP位址",
                content: "分配給路由器的乙太網路（LAN）連接埠的IPv4位址。"
            }, {
                type: "name",
                title: "子網路遮罩",
                content: "此參數決定IP位址的網路部分與主機部分。"
            }, {
                type: "name",
                title: "DHCP",
                content: "顯示在LAN連接埠上的路由器內建的DHCP伺服器是否為設備啟動。"
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "MAC位址",
                content: "分配給路由器的乙太網路（LAN）連接埠的獨一無二的實體位址。"
            }, {
                type: "name",
                title: "IP位址",
                content: "分配給路由器的乙太網路（LAN）連接埠的IPv6位址。"
            }, {
                type: "name",
                title: "前綴長度",
                content: "IPv6位址前綴的長度。"
            }, {
                type: "name",
                title: "分配類型",
                content: "分配給LAN介面的IPv6位址類型。"
            }, {
                type: "title",
                title: "訪客網路"
            }, {
                type: "name",
                title: "2.4G | 5G-1 | 5G-2",
                content: "選擇以查看2.4GHz | 5GHz-1 | 5GHz-2訪客網路設定與資訊。"
            }, {
                type: "name",
                title: "訪客網路SSID",
                content: "您的訪客網路的無線網路名稱（SSID）。"
            }, {
                type: "name",
                title: "隱藏SSID",
                content: "顯示訪客網路的無線網路名稱（SSID）是隱藏（開）或不是隱藏（關）。"
            }, {
                type: "name",
                title: "無線射頻",
                content: "指出訪客網路的無線網路目前的狀態（開或關）。"
            }, {
                type: "name",
                title: "看見彼此",
                content: "顯示在訪客網路上的所有設備是否被允許彼此互通。"
            }, {
                type: "title",
                title: "DSL"
            }, {
                type: "paragraph",
                content: "顯示關於DSL連線的資訊。"
            }, {
                type: "name",
                title: "線路狀態",
                content: "顯示DSL連線是已連線或已中斷連線。"
            }, {
                type: "name",
                title: "DSL調製類型",
                content: "顯示您的DSL連線是使用哪一種DSL運行調製類型。"
            }, {
                type: "name",
                title: "Annex類型",
                content: "顯示您的DSL連線是使用哪一種DSL運行Annex類型。"
            }, {
                type: "name",
                title: "目前的速率（kbps）",
                content: "顯示透過DSL連線的目前的上傳與下載速率。"
            }, {
                type: "name",
                title: "最大速率（kbps）",
                content: "顯示透過DSL連線的最大的上傳與下載速率。"
            }, {
                type: "name",
                title: "SNR邊界（dB）",
                content: "顯示DSL連線的上傳與下載SNR邊界。"
            }, {
                type: "name",
                title: "線路衰減（dB）",
                content: "顯示DSL連線的線路衰減。"
            }, {
                type: "name",
                title: "錯誤（pkts）",
                content: "顯示DSL連線的上傳與下載錯誤的數量。"
            }]
        },
        time: {
            TITLE: "時間設定",
            CONTENT: [{
                type: "name",
                title: "時區",
                content: "請從下拉式列表中選擇您的當地時區。"
            }, {
                type: "name",
                title: "日期",
                content: "請以MM/DD/YY格式，輸入您的當地時間到該欄位。"
            }, {
                type: "name",
                title: "時間",
                content: "請從下拉式列表選擇您的當地時間（以24小時制格式，例如：16:00:00就是下午4:00）。"
            }, {
                type: "name",
                title: "NTP伺服器I/NTP伺服器II",
                content: "請輸入NTP伺服器I或NTP伺服器II的IP位址，然後路由器將會自動從NTP伺服器取得時間。此外，該路由器具有一些常見內建NTP服務器，一旦連接到網際網路則將自動同步。"
            }, {
                type: "name",
                title: "從電腦取得",
                content: "若要與電腦的系統時間同步，請點選此按鈕。"
            }, {
                type: "name",
                title: "取得GMT",
                content: "若要與來自於網際網路的GMT（格林威治標準時間）時區同步，請點選此按鈕。"
            }, {
                type: "name",
                title: "儲存",
                content: "點選以儲存設定。"
            }, {
                type: "title",
                content: "日光節約時間"
            }, {
                type: "note",
                title: "設定日光節約時間",
                content: [
                    "選擇<b>啟用日光節約時間</b>。",
                    "當日光節約時間在您的當地時區開始時，請選擇正確的<b>開始</b>日期與時間。",
                    "當日光節約時間在您的當地時區結束時，請選擇正確的<b>結束</b>日期與時間。",
                    "點選<b>儲存</b>。"
                ]
            }]
        },
        DIGNOSTIC: {
            TITLE: "診斷工具",
            CONTENT: [{
                type: "paragraph",
                content: "路由器提供2種診斷工具 - Ping與追蹤。"
            }, {
                type: "note",
                title: "使用Ping工具診斷：",
                content: [
                    "在ping之前請點選選項按鈕。",
                    "請輸入IP位址或網域名稱。",
                    "在「進階」前點選下拉圖示以顯示Ping次數、Ping封包大小與Ping逾時。請保留這些參數為它們的預設值或根據您的需求設定它們。",
                    "點選「開始」按鈕以開始診斷。"
                ]
            }, {
                type: "paragraph",
                content: "或"
            }, {
                type: "note",
                title: "使用追蹤路由工具診斷：",
                content: [
                    "在追蹤路由之前請點選選項按鈕。",
                    "請輸入IP位址或網域名稱。",
                    "在「進階」前點選下拉圖示以顯示追蹤路由最大TTL。請保留它的預設值或根據您的需求設定它。",
                    "點選「開始」按鈕以開始診斷。"
                ]
            }]
        },
        softup: {
            TITLE: "韌體升級",
            CONTENT: [{
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "韌體升級以最新功能與多項修復更新路由器的作業系統以改善效能。當有可用的新韌體升級時，在頁面右上角的「更新」圖示就會提示您。點選該圖示以進入「韌體升級」頁面。"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "<b>重要事項：請依照指示進行以避免升級失敗。</b>"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "在升級之前：",
                content: [
                    "使用網路線連接您的電腦到路由器。不建議在無線連線環境下升級韌體。 ",
                    "從路由器移除所有附加的USB儲存設備。",
                    "備份路由器的設定。"
                ]
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "在升級處理期間：<br>保持路由器電源開啟，並請勿操作路由器。"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "在線升級韌體"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "點選升級並在提示時確認。路由器將自動下載並升級到最新的韌體，然後重新啟動。<br><b>註</b>：您可能需要先為升級點選「檢查」，以檢查是否有韌體更新可用。"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "手動升級韌體"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "",
                content: [
                    "拜訪www.tp-link.com網站並從我們的支援頁面下載最新韌體到您的電腦。請確保您下載的韌體檔符合本頁面所顯示的路由器硬體版本。",
                    "點選<b>瀏覽</b>並選擇已下載的韌體檔。",
                    "點選<b>升級</b>。韌體升級將要花幾分鐘完成。當韌體升級結束後，路由器將會自動重新啟動。",
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "paragraph",
                content: "在升級路由器的韌體前，您將需要從<a href='http://www.tp-link.com/en/download-center.html'>TP-LINK下載中心頁面</a>下載最新韌體更新到您的電腦。"
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "<B>重要：</B>為防止升級失敗，請注意下列事項：",
                content: [
                    "請確保最新韌體檔符合硬體版本（顯示在<b>韌體升級</b>頁面）。",
                    "請確保在路由器與您的電腦之間的穩定連線。非常的<b>不建議</b>以無線方式升級韌體。",
                    "在韌體升級前請確保您已經移除所有連接到路由器的USB儲存設備，以防止資料遺失。",
                    "備份您的路由器設定。",
                    "在韌體升級期間，請勿關閉路由器。"
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "升級路由器的韌體",
                content: [
                    "點選<b>瀏覽</b>。",
                    "找到並選擇下載的韌體檔。",
                    "點選<b>升級</b>。"
                ]
            }]
        },
        backNRestore: {
            TITLE: "備份",
            CONTENT: [{
                type: "paragraph",
                content: "強烈建議備份您目前的設定以防需要將系統還原到以前的狀態或原廠預設值時之需。"
            }, {
                type: "paragraph",
                content: "點選<b>備份</b>以儲存您目前的設定到您的電腦。確保儲存備份檔到安全的位置，如此一來，一旦之後有需求，您就可以取回並還原路由器。 "
            }, {
                type: "title",
                content: "還原"
            }, {
                type: "note",
                title: "從備份還原",
                content: [
                    "點選<b>瀏覽</b>。",
                    "找到並選擇備份檔。",
                    "點選<b>還原</b>。"
                ]
            }, {
                type: "title",
                content: "還原原廠預設值"
            }, {
                type: "paragraph",
                content: "點選<b>原廠還原</b>以重置您的路由器到原廠預設設定。"
            }, {
                type: "note",
                title: "註：",
                content: [
                    "「原廠還原」將會使所有您已經設定到路由器的設定重置為原廠預設值。一旦路由器還原並重新啟動，請創建一個新密碼以重新登入到網頁管理頁面。",
                    "在備份或還原處理期間，請勿關閉路由器。"
                ]
            }]
        },
        manageCtrl: {
            TITLE: "帳號管理",
            CONTENT: [{
                type: "paragraph",
                content: "此頁面允許您變更您的登入密碼。"
            }, {
                type: "name",
                title: "舊使用者名稱",
                content: "請輸入您目前的使用者名稱。"
            }, {
                type: "name",
                title: "舊密碼",
                content: "請輸入您目前的密碼。"
            }, {
                type: "name",
                title: "新使用者名稱",
                content: "請輸入您的新使用者名稱。"
            }, {
                type: "name",
                title: "新密碼",
                content: "請輸入您的新密碼。"
            }, {
                type: "name",
                title: "確認新密碼",
                content: "請再次輸入您的新密碼。"
            }, {
                type: "title",
                content: "本地管理"
            }, {
                type: "paragraph",
                content: "本地管理允許您可以使用基於MAC位址驗證的特別指定的一個在您的網路上的用戶端，用來存取與管理路由器。"
            }, {
                type: "name",
                title: "通訊埠",
                content: "請輸入被用於存取路由器通訊埠號碼（介於1024-65535之間）。預設值為80。"
            }, {
                type: "name",
                title: "IP/MAC位址",
                content: "請輸入被允許存取路由器設備的有效的本地IP位址或MAC位址。"
            }, {
                type: "title",
                content: "遠端管理"
            }, {
                type: "paragraph",
                content: "遠端管理功能允許您從網際網路遠距離地存取與設定路由器。"
            }, {
                type: "name",
                title: "遠端管理",
                content: "勾選核取方塊以啟用遠端管理功能。"
            }, {
                type: "name",
                title: "通訊埠",
                content: "請輸入被用於存取路由器通訊埠號碼（介於1024-65535之間具有更好的安全性）。一般來說，網頁瀏覽器使用標準HTTP服務通訊埠80。"
            }, {
                type: "name",
                title: "IP/MAC位址",
                content: "請輸入被允許存取路由器的有效的遠端IP位址或MAC位址。"
            }]
        },
        log: {
            TITLE: "系統日誌",
            CONTENT: [{
                type: "paragraph",
                content: "系統日誌頁面顯示路由器的大部分最近活動（事件）的列表。您可以定義您想要查看的日誌的類型、層級。此頁面也允許路由器匯出系統日誌到電腦或自動發送系統日誌到指定的遠端伺服器。"
            }, {
                type: "name",
                title: "類型",
                content: "選擇要顯示的系統類型。"
            }, {
                type: "name",
                title: "層級",
                content: "選擇要顯示的系統層級。"
            }, {
                type: "name",
                title: "重新整理",
                content: "點選此圖示以更新系統日誌。"
            }, {
                type: "name",
                title: "全部刪除",
                content: "點選此圖示以刪除所有的系統日誌。"
            }, {
                type: "name",
                title: "日誌設定",
                content: "點選以設定日誌檔案設定。",
                children: [{
                    type: "name",
                    title: "本地儲存",
                    content: "選擇以貯藏系統日誌到您的路由器的本地記憶體。日誌將會被顯示在系統日誌頁面中的表格裡。",
                    children: [{
                        type: "name",
                        title: "最小層級",
                        content: "請從下拉式列表中選擇要被儲存的系統日誌最小層級。這份列表是僅列出最底層級並按降序排列。"
                    }]
                }, {
                    type: "name",
                    title: "遠端儲存",
                    content: "選擇以發送系統日誌到遠端伺服器。如果遠端伺服器有一個日誌查看器客戶端或具備嗅探器工具，則您可以即時遠端查看和分析系統日誌。",
                    children: [{
                        type: "name",
                        title: "最小層級",
                        content: "請從下拉式列表中選擇要被儲存的系統日誌最小層級。這份列表是僅列出最底層級並按降序排列。"
                    }, {
                        type: "name",
                        title: "伺服器IP",
                        content: "請指定遠端系統日誌伺服器的IP位址。"
                    }, {
                        type: "name",
                        title: "伺服器通訊埠",
                        content: "請指定遠端系統日誌伺服器的通訊埠號碼。"
                    }, {
                        type: "name",
                        title: "本地設備名稱",
                        content: "請從下拉式列表選擇遠端伺服器的本地設備名稱。"
                    }]
                }]
            }, {
                type: "name",
                title: "儲存日誌",
                content: "點此按鈕以下載所有的系統日誌到您的本地電腦。"
            }]
        },
        snmp: {
            TITLE: "SNMP設定",
            CONTENT: [{
                type: "name",
                title: "SNMP代理",
                content: "切換至「開」以啟用內建SNMP代理，這允許路由器可以在SNMP訊息的傳送與接收時扮演操作角色，傳送回應到SNMP管理員以及當事件發生時觸發SNMP捕捉器。"
            }, {
                type: "name",
                title: "唯讀社群",
                content: "顯示能夠防止路由器遭未經授權的訪問的預設公開社群字串。"
            }, {
                type: "name",
                title: "寫入社群",
                content: "顯示能夠防止路由器遭未經授權的訪問的預設讀取與寫入社群字串。"
            }, {
                type: "name",
                title: "系統名稱",
                content: "顯示該管理器被分配的管理名稱。"
            }, {
                type: "name",
                title: "系統描述",
                content: "顯示管理器的文字描述。此值應包括全名和系統的硬體類型的版本標識、軟體作業系統和網路軟體。"
            }, {
                type: "name",
                title: "系統位置",
                content: "顯示此設備的實體位置（例如：電話間、三樓）。"
            }, {
                type: "name",
                title: "系統聯絡",
                content: "顯示此管理設備的聯絡人的原文識別，並與如何聯絡此人的信息在一起。"
            }, {
                type: "name",
                title: "捕捉器管理員IP",
                content: "顯示接收捕捉器的主機的IP位址。"
            }]
        },
        stat: {
            TITLE: "流量統計",
            CONTENT: [{
                type: "name",
                title: "流量統計",
                content: "切換至「開」以啟用流量統計功能。"
            }, {
                type: "title",
                content: "流量統計列表"
            }, {
                type: "name",
                title: "IP/MAC位址",
                content: "已連線的用戶端的IP與MAC位址。"
            }, {
                type: "name",
                title: "總計封包數",
                content: "透過該路由器傳送與接收的封包的總計數量。"
            }, {
                type: "name",
                title: "總計位元組",
                content: "透過該路由器傳送與接收的封包的總計位元組。"
            }, {
                type: "name",
                title: "目前的封包數",
                content: "在特定時間間隔（以秒計算）內傳送與接收的封包的總計數量。"
            }, {
                type: "name",
                title: "目前的位元組",
                content: "在特定時間間隔（以秒計算）內傳送與接收的封包的總計位元組。"
            }, {
                type: "name",
                title: "目前的ICMP Tx",
                content: "顯示透過WAN連接埠傳輸的每秒超過最大傳輸速率的ICMP封包的目前傳輸速率。"
            }, {
                type: "name",
                title: "目前的UDP Tx",
                content: "顯示透過WAN連接埠傳輸的每秒超過最大傳輸速率的UDP封包的目前傳輸速率。"
            }, {
                type: "name",
                title: "目前的SYN Tx",
                content: "顯示透過WAN連接埠傳輸的每秒超過最大傳輸速率的TCP SYN封包的目前傳輸速率。"
            }, {
                type: "name",
                title: "修改",
                content: "點選<b>垃圾桶</b>圖示以刪除對應的統計。"
            }, {
                type: "name",
                title: "重新整理",
                content: "點選以更新在此頁面上的統計資訊。"
            }, {
                type: "name",
                title: "重置",
                content: "點選以重置列表內的所有統計值至0。"
            }, {
                type: "name",
                title: "全部刪除",
                content: "點選以刪除列表內的所有統計資訊。"
            }]
        },
        ethWan: {
            TITLE: "WAN介面",
            CONTENT: [{
                type: "title2",
                content: "連線類型：浮動IP"
            }, {
                type: "name",
                title: "浮動IP",
                content: "如果ISP（網際網路服務供應商）提供您DHCP伺服器連線，請選擇此類型。"
            }, {
                type: "name",
                title: "IP位址/子網路遮罩/閘道/預設閘道",
                content: "這些參數將會從您的ISP的DHCP伺服器自動分配。"
            }, {
                type: "name",
                title: "更新/釋放",
                content: "點選此按鈕以從您的ISP更新/釋放IP參數。"
            }, {
                type: "name",
                title: "進階",
                children: [{
                    type: "name",
                    title: "MTU大小（以位元組計算）",
                    content: "對大多數的乙太網路來說，預設的與典型的MTU（最大傳輸單元）的大小為<b>1500位元組</b>。除非ISP要求，否則不建議變更預設的MTU大小。"
                }, {
                    type: "name",
                    title: "IGMP代理",
                    content: "IGMP（網際網路群組管理協定）用於管理在TCP / IP網路的群播。有些ISP使用IGMP以執行路由器上的遠端設定。它預設是啟用的。"
                }, {
                    type: "name",
                    title: "使用單一廣播DHCP取得IP",
                    content: "如果您的ISP的DHCP伺服器不支援廣播應用並且您不能以浮動方式取得IP位址，請勾選此核取方塊。"
                }, {
                    type: "name",
                    title: "使用下列的DNS位址",
                    content: "勾選此核取方塊並以點分十進制格式輸入由您的ISP提供的DNS伺服器位址。此WAN介面將會優先使用特定的DNS伺服器。"
                }, {
                    type: "name",
                    title: "主機名稱",
                    content: "請輸入此WAN介面的主機名稱。"
                }]
            }, {
                type: "title2",
                content: "連線類型：固定IP"
            }, {
                type: "name",
                title: "固定IP",
                content: "如果ISP提供您特定的（固定的）IP位址、子網路遮罩、閘道與DNS參數，請選擇此類型。"
            }, {
                type: "name",
                title: "IP位址/子網路遮罩/閘道/DNS伺服器/次要DNS伺服器",
                content: "請以點分十進制格式輸入由您的ISP提供的IP資訊。"
            }, {
                type: "paragraph",
                content: "點選<b>進階</b>以查看更多進階的設定。"
            }, {
                type: "name",
                title: "進階",
                children: [{
                    type: "name",
                    title: "MTU大小（以位元組計算）",
                    content: "對大多數的乙太網路來說，預設的與典型的MTU（最大傳輸單元）的大小為<b>1500位元組</b>。除非ISP要求，否則不建議變更預設的MTU大小。"
                }, {
                    type: "name",
                    title: "IGMP代理",
                    content: "IGMP（網際網路群組管理協定）用於管理在TCP / IP網路的群播。有些ISP使用IGMP以執行路由器上的遠端設定。它預設是啟用的。"
                }]
            }, {
                type: "title2",
                content: "連線類型：PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "如果您使用DSL（數碼用戶線路）服務，並由ISP提供使用者名稱和密碼，請選擇此類型。"
            }, {
                type: "name",
                title: "PPPoE使用者名稱/PPPoE密碼/確認密碼",
                content: "請輸入由您的ISP所提供的使用者名稱與密碼。這些欄位需注意英文大小寫之不同。"
            }, {
                type: "name",
                title: "次要連線",
                content: "它僅適用於PPPoE連線。如果您的ISP提供了一個額外的連線類型（例如：浮動/固定IP）以連接到區域網路，那麼您可以選擇浮動/固定IP的單選按鈕來啟動此次要連線。<br>次要連線預設情況下為停用，所以只有PPPoE連線。除非必要，請勿啟用。"
            }, {
                type: "name",
                title: "連線模式",
                content: "請從下列連線模式中選擇一個連線模式，以決定如何連線至網際網路：",
                children: [{
                    type: "name",
                    title: "一直連線",
                    content: "選擇此模式，當不管任何時候連線中斷時，都將會自動重新連線。"
                }, {
                    type: "name",
                    title: "依需求連線",
                    content: "選擇此模式，將基於不活動的特定時間（最長閒置時間）來中斷網際網路連線。當您再次嘗試存取網際網路時，將會重新建立連線。"
                }, {
                    type: "name",
                    title: "手動連線",
                    content: "選擇此模式以手動連線或手動中斷網際網路連線，或基於不活動的特定時間（最長閒置時間）來中斷網際網路連線。"
                }, {
                    type: "name",
                    title: "最長閒置時間",
                    content: "<b>15分鐘</b> - 請輸入在連線終止前，網際網路連線可以處於閒置狀態的分鐘數。預設的閒置時間為15分鐘。"
                }]
            }, {
                type: "name",
                title: "驗證類型",
                content: "請從下拉式列表中選擇一個驗證類型。預設方式為「AUTO_AUTH」。"
            }, {
                type: "name",
                title: "連線/斷線",
                content: "點選以立即連線/中斷連線。"
            }, {
                type: "paragraph",
                content: "點選<b>進階</b>以查看更多進階的設定。"
            }, {
                type: "name",
                title: "進階",
                children: [{
                    type: "name",
                    title: "服務名稱",
                    content: "請輸入由您的ISP提供的服務名稱。如果沒有，請保留空白。"
                }, {
                    type: "name",
                    title: "伺服器名稱",
                    content: "請輸入由您的ISP提供的伺服器名稱。如果沒有，請保留空白。"
                }, {
                    type: "name",
                    title: "MTU大小（以位元組計算）",
                    content: "對乙太網路來說，典型的MTU（最大傳輸單元）的大小為1480位元組。",
                    children: [{
                        type: "paragraph",
                        content: "<b>註：</b>在極少的案例中，您的ISP可能會要求您調整MTU大小以取得更好的網路效能。除非必須，否則請勿變更此數值。"
                    }]
                }, {
                    type: "name",
                    title: "IGMP代理",
                    content: "IGMP（網際網路群組管理協定）用於管理在TCP / IP網路的群播。有些ISP使用IGMP以執行路由器上的遠端設定。它預設是啟用的。"
                }, {
                    type: "name",
                    title: "使用由ISP指定的IP",
                    content: "選擇此選項並輸入由您的ISP提供的IP位址。"
                }, {
                    type: "name",
                    title: "回應請求間隔",
                    content: "請輸入介於0和120（以秒為單位）的時間值，供路由器請求存取集中器在每個時間間隔回應。預設值是30。0代表不偵測。"
                }, {
                    type: "name",
                    title: "使用下列的DNS位址",
                    content: "勾選此核取方塊並以點分十進制格式輸入由您的ISP提供的DNS伺服器位址。此WAN介面將會優先使用特定的DNS伺服器。"
                }]
            }, {
                type: "title2",
                content: "連線類型：L2TP/PPTP"
            }, {
                type: "name",
                title: "L2TP/PPTP",
                content: "如果您連線到L2TP/PPTP VPN伺服器並且您的ISP提供使用者名稱、密碼與伺服器的IP位址/網域名稱，請選擇此類型。"
            }, {
                type: "name",
                title: "使用者名稱/密碼",
                content: "請輸入由您的ISP所提供的使用者名稱與密碼。這些欄位需注意英文大小寫之不同。"
            }, {
                type: "name",
                title: "IP位址/主要DNS",
                content: "這些參數將會從您的ISP的DHCP伺服器自動分配。"
            }, {
                type: "name",
                title: "次要連線（浮動IP或固定IP）",
                children: [{
                    type: "name",
                    title: "浮動IP",
                    content: "如果您的ISP將會自動分配給您IP位址與子網路遮罩，請選擇此項目。"
                }, {
                    type: "name",
                    title: "固定IP",
                    content: "如果ISP提供您IP位址、子網路遮罩、閘道與DNS參數，請選擇此類型並輸入這些資訊到對應欄位。"
                }]
            }, {
                type: "name",
                title: "VPN伺服器IP/網域名稱",
                content: "請輸入由您的ISP提供的VPN伺服器的IP位址或網域名稱。"
            }, {
                type: "name",
                title: "MTU大小",
                content: "對大多數的乙太網路來說，預設的與典型的MTU（最大傳輸單元）的大小為1460位元組（PPTP為1420）。除非ISP要求，否則不建議變更預設的MTU大小。"
            }, {
                type: "name",
                title: "連線模式",
                content: "請選擇適當的連線模式，以決定如何連線到網際網路。",
                children: [{
                    type: "name",
                    title: "一直開啟",
                    content: "在此模式下，不管任何時候連線中斷時，網際網路連線都將會自動重新連線。"
                }, {
                    type: "name",
                    title: "依需求連線",
                    content: "在此模式下，在不活動的特定時間（最長閒置時間）後，將自動終止網際網路連線。當您再次嘗試存取網際網路時，將會重新建立連線。"
                }, {
                    type: "name",
                    title: "手動連線",
                    content: "在此模式下，藉由手動點選「連線」或「斷線」按鈕來控制網際網路連線。此模式也支援「最長閒置時間」功能。輸入「最長閒置時間（以分為單位）」來指定連線終止前，網際網路連線可以處於閒置狀態的最長時間。預設值為15分鐘。如果您想要網際網路連線隨時保持啟動，請輸入0。"
                }]
            }, {
                type: "title",
                content: "MAC複製"
            }, {
                type: "name",
                title: "使用預設的MAC位址",
                content: "在ISP沒有分配IP位址給路由器的MAC位址的情況下，選擇此選項以使用預設的MAC位址。"
            }, {
                type: "name",
                title: "使用目前的電腦MAC位址",
                content: "在ISP僅允許此電腦存取網際網路的情況下，請選擇此選項以使用目前已連線電腦的MAC位址。"
            }, {
                type: "name",
                title: "使用自訂的MAC位址",
                content: "選擇此選項以手動輸入已註冊的MAC位址。"
            }]
        },
        route: {
            TITLE: "進階路由",
            CONTENT: [{
                type: "paragraph",
                content: "進階路由被用來為網路資訊封包事先決定到達特定的主機或網路的固定路線。"
            }, {
                type: "title",
                content: "固定路由"
            }, {
                type: "name",
                title: "目標IP位址/子網路遮罩/閘道",
                content: "顯示固定路由的目標IP位址、子網路遮罩與閘道。"
            }, {
                type: "name",
                title: "啟用",
                content: "指出固定路由的目前的狀態。點選<b>燈泡</b>圖示以啟用（或停用）該固定路由。"
            }, {
                type: "name",
                title: "修改",
                content: "顯示<b>修改</b>或<b>刪除</b>對應項目的選項。"
            }, {
                type: "note",
                title: "設定固定路由",
                content: [
                    "點選<b>增加</b>。",
                    "請為此項目輸入一個目標IP位址以指定固定路由。",
                    "請以十六進位格式輸入子網路遮罩，以決定IP位址的網路部分與主機部分。",
                    "請以IP位址格式輸入閘道以連線路由器到網路或主機。",
                    "請選擇<b>LAN</b>或WAN介面以指定目標IP位址的類型。",
                    "選擇<b>啟用此項目</b>。",
                    "點選<b>確定</b>。"
                ]
            }, {
                type: "title",
                content: "系統路由表"
            }, {
                type: "paragraph",
                content: "系統路由表顯示目前正在使用的所有有效的路由項目。"
            }, {
                type: "paragraph",
                content: "點選「重新整理」以更新路由表。"
            }]
        },
        ddns: {
            TITLE: "動態DNS設定",
            CONTENT: [{
                type: "paragraph",
                content: "動態DNS（網域名稱系統）允許您指定一個固定的主機和網域名稱到浮動的網際網路IP位址。當您正在路由器後面經營自己的網站、FTP服務器或另一台服務器時，這是非常有用的。首先，您需要註冊一個DDNS服務供應商，例如：<a href='http://www.dyndns.com'>www.dyndns.com</a>。"
            }, {
                type: "name",
                title: "服務供應商",
                content: "選擇您的DDNS服務供應商。如果您尚未註冊DDNS帳號，請點選<b>前往註冊</b>"
            }, {
                type: "name",
                title: "使用者名稱/密碼",
                content: "請輸入您的DDNS帳號的使用者名稱與密碼。"
            }, {
                type: "name",
                title: "網域名稱",
                content: "請輸入由DDNS服務供應商所提供的網域名稱。"
            }, {
                type: "name",
                title: "登入/登出",
                content: "點選以登入或登出DDNS服務。"
            }, {
                type: "name",
                title: "儲存",
                content: "點選以儲存所有的設定。"
            }, {
                type: "paragraph",
                content: "若要對您的DDNS帳戶之間進行切換，點選「登出」以登出目前的帳號，然後使用不同的帳號再次登入。"
            }]
        },
        dhcp: {
            TITLE: "DHCP伺服器",
            CONTENT: [{
                type: "paragraph",
                content: "DHCP（動態主機設定協定）伺服器，能將IP位址池中的TCP / IP設定動態地分配給客戶端設備。請不要停用預設的DHCP服務器，除非您有其它DHCP伺服器或者您希望手動指派您的網路上的TCP/ IP設定給個別用戶端。"
            }, {
                type: "name",
                title: "IP位址池",
                content: "請輸入可以被用戶端租用的IP位址的範圍。"
            }, {
                type: "name",
                title: "位址租用時間",
                content: "請輸入被租用給用戶端的IP位址的持續時間，其值介於1-2880分鐘之間。"
            }, {
                type: "name",
                title: "預設閘道",
                content: "請輸入LAN IP位址。（選填）"
            }, {
                type: "name",
                title: "DNS伺服器/次要DNS伺服器",
                content: "請輸入由您的ISP提供的DNS伺服器位址。（選填）"
            }, {
                type: "title",
                content: "用戶端列表"
            }, {
                type: "name",
                title: "總計用戶端",
                content: "顯示已連結的DHCP用戶端總數。"
            }, {
                type: "name",
                title: "用戶端名稱",
                content: "顯示DHCP用戶端的名稱。"
            }, {
                type: "name",
                title: "MAC位址",
                content: "顯示MAC位址。"
            }, {
                type: "name",
                title: "分配的IP位址",
                content: "顯示由DHCP伺服器分配給用戶端的IP位址。"
            }, {
                type: "name",
                title: "租用的時間",
                content: "顯示已租用給用戶端的IP位址的持續時間。"
            }, {
                type: "name",
                title: "重新整理",
                content: "點選以更新DHCP用戶端列表。"
            }, {
                type: "title",
                content: "位址保留"
            }, {
                type: "paragraph",
                content: "您可以手動保留IP位址給連接到該路由器的用戶端。一旦已保留，則DHCP伺服器僅會將該IP位址分配給同一個用戶端。"
            }, {
                type: "name",
                title: "MAC位址",
                content: "顯示DHCP保留的IP位址之用戶端MAC位址。"
            }, {
                type: "name",
                title: "保留的IP位址",
                content: "顯示用戶端的保留的IP位址。"
            }, {
                type: "name",
                title: "描述",
                content: "顯示設備的描述。"
            }, {
                type: "name",
                title: "啟用",
                content: "點選以「啟用」或「停用」對應的項目。"
            }, {
                type: "name",
                title: "修改",
                content: "顯示<b>修改</b>或<b>刪除</b>對應項目的選項。"
            }, {
                type: "note",
                title: "為DHCP用戶端保留IP位址",
                content: [
                    "點選<b>增加</b>。",
                    "請輸入用戶端的<b>MAC位址</b>。",
                    "請輸入您想要保留給該用戶端的IP位址。",
                    "請輸入該設備的描述。",
                    "選擇<b>啟用此項目</b>。",
                    "點選<b>確定</b>。"
                ]
            }, {
                type: "name",
                title: "修改或刪除現存的用戶端",
                content: [
                    "點選<b>編輯</b>或<b>垃圾桶</b>圖示以刪除對應的項目。"
                ]
            }, {
                type: "title",
                content: "條件池"
            }, {
                type: "name",
                title: "供應商ID/開始IP位址/結束IP位址/設備",
                content: "顯示條件池的供應商ID、開始IP位址、結束IP位址與設備。"
            }, {
                type: "name",
                title: "狀態",
                content: "指出條件池的目前的狀態。點選「燈泡」圖示以啟用（或停用）該條件池。"
            }, {
                type: "name",
                title: "修改",
                content: "顯示<b>修改</b>或<b>刪除</b>對應項目的用戶端。"
            }, {
                type: "note",
                title: "增加一個條件池",
                content: [
                    "點選<b>增加</b>。",
                    "請輸入LAN設備名稱。",
                    "請輸入一個值，以辨識DHCP用戶端的供應商與功能。",
                    "請輸入DHCP伺服器分配給用戶端的開始IP位址。",
                    "請輸入DHCP伺服器分配給用戶端的結束IP位址。",
                    "請輸入DHCP伺服器的預設閘道。",
                    "請從下拉式列表中選擇一個設備類型。",
                    "請從下拉式列表中選擇一個選項。",
                    "請輸入選項值。",
                    "選擇<b>啟用此項目</b>。",
                    "點選<b>確定</b>。"
                ]
            }]
        },
        iptv: {
            TITLE: "IPTV設定",
            CONTENT: [{
                type: "name",
                title: "IPTV",
                content: "選擇以啟用IPTV功能。"
            }, {
                type: "name",
                title: "模式",
                content: "請根據您的ISP選擇合適的模式。有六種IPTV模式：",
                children: [{
                    type: "name",
                    title: "橋接",
                    content: "如果您的ISP不在列表中以及沒有其它預定參數，請選擇此選項。",
                    children: [{
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "指定您的LAN連接埠是否充當網際網路的供應端或者作為IPTV供應端。"
                    }]
                }, {
                    /*type: "name",
                    title: "俄羅斯",
                    content: "如果您的ISP來自於俄羅斯並且已經預定必須參數，包含：網際網路/IP電話/IPTV VLAN ID、優先級與LAN (1/2/3/4)連接埠，請選擇此選項。",
                    children: [{
                        type: "name",
                        title: "IPTV群播VLAN ID/優先級",
                        content: "當有需求時，您可以啟用IPTV群播功能，並根據您的ISP設定VLAN ID與優先級。"
                    }]
                }, {*/
                    type: "name",
                    title: "新加坡-ExStream",
                    content: "如果您的ISP來自於新加坡的ExStream並且已經預定必須參數，包含：網際網路/IPTV VLAN ID、優先級與LAN （1/2/3/4）連接埠，請選擇此選項。"
                }, {
                    type: "name",
                    title: "馬來西亞-Unifi",
                    content: "如果您的ISP來自於馬來西亞的Unifi並且已經預定必須參數，包含：網際網路/IPTV VLAN ID、優先級與LAN （1/2/3/4）連接埠，請選擇此選項。"
                }, {
                    type: "name",
                    title: "馬來西亞-Maxis",
                    content: "如果您的ISP來自於馬來西亞的Maxis並且已經預定必須參數，包含：網際網路/IP電話/IPTV VLAN ID、優先級與LAN （1/2/3/4）連接埠，請選擇此選項。"
                }, {
                    type: "name",
                    title: "自訂",
                    content: "如果您的ISP不在列表中但是有提供必須參數，包含：網際網路/IP電話/IPTV VLAN ID、優先級與LAN （1/2/3/4）連接埠，請選擇此選項。",
                    children: [{
                        type: "name",
                        title: "網際網路/IP電話/IPTV VLAN ID/優先級",
                        content: "請設定由ISP所提供的VLAN ID。"
                    }, {
                        type: "name",
                        title: "802.11Q Tag",
                        content: "選擇是否標記含有802.11Q的網際網路封包。"
                    }, {
                        type: "name",
                        title: "LAN 1/2/3/4",
                        content: "指定您的LAN連接埠是否充當網際網路的供應端或者作為IPTV供應端。"
                    }, {
                        type: "name",
                        title: "IPTV群播VLAN ID/優先級",
                        content: "當有需求時，您可以啟用IPTV群播功能，並根據您的ISP設定VLAN ID與優先級。"
                    }]
                }]
            }, {
                type: "name",
                title: "IGMP代理",
                content: "請根據您的ISP選擇IGMP（網際網路群組管理協定）代理版本 - V2或V3。"
            }]
        },
        usbManage: {
            TITLE: "USB儲存設備",
            CONTENT: [{
                type: "paragraph",
                content: "<b>USB儲存設備</b>畫面顯示透過USB連接埠連接的USB儲存設備的基本資訊。"
            }, {
                type: "name",
                title: "掃描",
                content: "一般來說，路由器會自動偵測所有新連接的設備。如果沒有，請點選此按鈕去掃描並重新整理更新資訊的頁面。"
            }, {
                type: "name",
                title: "磁碟區名稱",
                content: "顯示USB磁碟區的名稱。"
            }, {
                type: "name",
                title: "容量",
                content: "顯示USB設備的總計儲存容量。"
            }, {
                type: "name",
                title: "剩餘空間",
                content: "顯示目前可用的剩餘儲存空間。"
            }, {
                type: "name",
                title: "啟動",
                content: "只有當USB儲存設備連接到路由器時，此核取方塊才會出現。選擇以啟用USB設備的檔案共享。"
            }, {
                type: "name",
                title: "安全移除",
                content: "請把USB儲存設備從路由器上實體地拔下前，點選此按鈕來安全地卸載USB儲存設備。請注意，只有當USB儲存設備連接到路由器時，此「安全移除」按鈕才會出現。另外，請記住，當USB設備正在使用時，您無法卸載它。"
            }, {
                type: "title",
                content: "共享設定"
            }, {
                type: "name",
                title: "網路/媒體伺服器名稱",
                content: "顯示用於存取已連接的USB儲存設備的名稱。"
            }, {
                type: "title",
                content: "資料夾共享"
            }, {
                type: "name",
                title: "全部共享",
                content: "切換至「開」以共享所有的資料夾與檔案，或切換至「關」僅共享選擇的資料夾。"
            }, {
                type: "name",
                title: "啟用驗證",
                content: "切換至「開」以啟用驗證，這會要求使用者輸入有效的使用者名稱與密碼以存取所有的共享資料夾。"
            }, {
                type: "name",
                title: "資料夾名稱",
                content: "顯示共享資料夾的名稱。"
            }, {
                type: "name",
                title: "資料夾路徑",
                content: "顯示共享資料夾的路徑。"
            }, {
                type: "name",
                title: "磁碟區名稱",
                content: "顯示共享磁碟區的名稱。"
            }]
        },
        printSrv: {
            TITLE: "列印伺服器",
            CONTENT: [{
                type: "name",
                title: "啟用列印伺服器",
                content: "切換至「開」以啟用列印伺服器功能。"
            }, {
                type: "name",
                title: "印表機名稱",
                content: "顯示您已連接至路由器的印表機名稱。"
            }]
        },
        diskSettings: {
            TITLE: "USB儲存設備",
            CONTENT: [{
                type: "paragraph",
                content: "<b>USB儲存設備</b>畫面顯示透過USB連接埠連接的USB儲存設備的基本資訊。"
            }, {
                type: "name",
                title: "掃描",
                content: "一般來說，路由器會自動偵測所有新連接的設備。如果沒有，請點選此按鈕去掃描並重新整理更新資訊的頁面。"
            }, {
                type: "name",
                title: "磁碟區名稱",
                content: "顯示USB磁碟區的名稱。"
            }, {
                type: "name",
                title: "容量",
                content: "顯示USB設備的總計儲存容量。"
            }, {
                type: "name",
                title: "剩餘空間",
                content: "顯示目前可用的剩餘儲存空間。"
            }, {
                type: "name",
                title: "啟動",
                content: "只有當USB儲存設備連接到路由器時，此核取方塊才會出現。選擇以啟用USB設備的檔案共享。"
            }, {
                type: "name",
                title: "安全移除",
                content: "請把USB儲存設備從路由器上實體地拔下前，點選此按鈕來安全地卸載USB儲存設備。請注意，只有當USB儲存設備連接到路由器時，此「安全移除」按鈕才會出現。另外，請記住，當目前的磁碟區正在忙碌時，您無法卸載它。"
            }, {
                type: "note",
                title: "設定檔案伺服器",
                content: [
                    "請使用USB連接線將USB儲存設備連接至路由器的USB連接埠。",
                    "新連接的USB設備應該會被路由器自動偵測並在<b>設備設定</b>區域下方顯示資訊。如果沒有，請點選<b>掃描</b>。",
                    "點選<b>啟動</b>按鈕以啟用檔案共享。"
                ]
            }]
        },
        folderSharing: {
            TITLE: "共享帳號",
            CONTENT: [{
                type: "name",
                title: "帳號",
                content: "您可以選擇<b>使用預設帳號</b>以登入共享檔案與共享資料夾，或<b>使用新帳號</b>並輸入下列資訊以創建一個新的使用者帳號。"
            }, {
                type: "name",
                title: "使用者名稱/密碼",
                content: "輸入最多15個字元，包含：英文字母、數字、下底線等字串。使用者名稱必須以英文字母的字元開始。這些欄位需注意英文大小寫不同。"
            }, {
                type: "paragraph",
                content: "點選<b>儲存</b>以儲存帳號設定。"
            }, {
                type: "title",
                content: "共享設定"
            }, {
                type: "name",
                title: "網路/媒體伺服器名稱",
                content: "顯示用於存取已連接的USB儲存設備的名稱。"
            }, {
                type: "name",
                title: "啟用",
                content: "勾選核取方塊以啟用對應的存取方式。"
            }, {
                type: "name",
                title: "存取方式",
                content: "總共有4種方式可以存取共享的USB儲存設備。",
                children: [{
                    type: "name",
                    title: "媒體伺服器",
                    content: "選擇此選項以允許在您的網路上的使用者從支援DLNA的設備，如：電腦、行動設備和遊戲主機（PS2/3），能在您的共享的USB儲存設備中查看照片、播放音樂與觀看電影。"
                }, {
                    type: "name",
                    title: "網路芳鄰",
                    content: "選擇此選項以允許在您的網路上的使用者透過顯示在下方的「位址」欄位存取共享內容。"
                }, {
                    type: "name",
                    title: "FTP",
                    content: "選擇此選項以啟用FTP伺服器功能，此允許FTP用戶端與在您的網路上的使用者，透過顯示在下方的「位址」欄位去存取USB儲存設備。若要變更FTP伺服器的通訊埠，請輸入新的通訊埠號碼並點選<b>儲存</b>以套用該變更。"
                }, {
                    type: "name",
                    title: "FTP（透過網際網路）",
                    content: "選擇此選項以允許FTP用戶端與使用者透過FTP在網際網路上遠端地存取，下載與上傳檔案到共享的USB儲存設備。"
                }]
            }, {
                type: "name",
                title: "存取方式",
                content: "顯示被用於存取共享USB儲存設備的位址。"
            }, {
                type: "name",
                title: "通訊埠",
                content: "顯示FTP伺服器的通訊埠號碼。"
            }, {
                type: "title",
                content: "資料夾共享"
            }, {
                type: "name",
                title: "全部共享",
                content: "切換至「開」以共享所有的資料夾與檔案，或切換至「關」僅共享選擇的資料夾。"
            }, {
                type: "name",
                title: "啟用驗證",
                content: "切換至「開」以啟用驗證，這會要求使用者輸入有效的使用者名稱與密碼以存取所有的共享資料夾。"
            }, {
                type: "name",
                title: "資料夾名稱",
                content: "顯示共享資料夾的名稱。"
            }, {
                type: "name",
                title: "資料夾路徑",
                content: "顯示共享資料夾的路徑。"
            }, {
                type: "name",
                title: "媒體共享",
                content: "顯示媒體共享功能是啟用的（開）或停用的（關）。"
            }, {
                type: "name",
                title: "磁碟區名稱",
                content: "顯示共享的磁碟區的名稱。"
            }, {
                type: "name",
                title: "狀態",
                content: "指出共享資料夾的目前的狀態。點選「燈泡」圖示以啟用（或停用）共享資料夾。"
            }, {
                type: "name",
                title: "修改",
                content: "顯示<b>修改</b>或<b>刪除</b>對應共享資料夾的選項。"
            }, {
                type: "note",
                title: "增加資料夾共享項目：",
                content: [
                    "切換至關閉<b>全部選擇</b>。",
                    "點選<b>增加</b>。",
                    "選擇<b>磁碟區名稱</b>與<b>資料夾路徑</b>。",
                    "創建一個資料夾名稱。",
                    "請決定您共享該資料夾的方式：<br/><b>啟用驗證</b> - 選擇以要求用戶提供一個有效的使用者名稱與密碼進行驗證，接著才能存取共享文件夾。<br/><b>啟用寫入存取</b> - 選擇以允許使用者修改該資料夾的內容。<br/><b>啟用媒體共享</b> - 選擇以啟用媒體共享。<br/>"
                ]
            }]
        },
        ipsec: {
            TITLE: "IPSec設定",
            CONTENT: [{
                type: "name",
                title: "失效端點偵測",
                content: "失效端點偵測（DPD）是一個偵測失效的網際網路金鑰交換（IKE）端點的方式。DPD被用於回收丟失的資源，例如在端點被發現失效並且它也被用於進行IKE端點故障轉移的情況下。切換至「開」以啟用失效端點偵測功能。"
            }, {
                type: "name",
                title: "連線名稱/遠端閘道/本地位址/遠端位址",
                content: "顯示IPSec項目的連線名稱、遠端閘道、本地位址、遠端位址。"
            }, {
                type: "name",
                title: "狀態",
                content: "顯示IPSec項目的狀態。狀態包含：",
                children: [{
                    type: "name",
                    title: "停用",
                    content: "該項目已停用。"
                }, {
                    type: "name",
                    title: "下",
                    content: "該項目已啟用，但未連線。"
                }, {
                    type: "name",
                    title: "上",
                    content: "該項目已啟用且已成功連線。"
                }]
            }, {
                type: "name",
                title: "啟用",
                content: "點選<b>燈泡</b>圖示以啟用或停用該項目。"
            }, {
                type: "name",
                title: "修改",
                content: "顯示<b>修改</b>或<b>刪除</b>對應項目的選項。"
            }, {
                type: "name",
                title: "增加",
                content: "點選以增加一個新的IPSec VPN連線。"
            }, {
                type: "name",
                title: "IPSec連線名稱",
                content: "請為IPSec VPN連線輸入名稱。"
            }, {
                type: "name",
                title: "遠端IPSec閘道位址（URL）",
                content: "請輸入目標閘道IP位址，這是遠端VPN伺服器終端的公開WAN IP或網域名稱。"
            }, {
                type: "name",
                title: "來自本地IP位址的通道存取",
                content: "如果您想要整個LAN加入VPN網路的話，請選擇「子網路位址」或者如果您想要單一IP加入VPN網路的話，請選擇「單一位址」。"
            }, {
                type: "name",
                title: "提供給VPN的IP位址",
                content: "請輸入您的LAN的IP位址。"
            }, {
                type: "name",
                title: "IP子網路遮罩",
                content: "請輸入您的LAN的子網路遮罩。"
            }, {
                type: "name",
                title: "來自遠端IP位址的通道存取",
                content: "如果您想要整個遠端LAN加入VPN網路的話，請選擇「子網路位址」或者如果您想要單一IP加入VPN網路的話，請選擇「單一位址」。"
            }, {
                type: "name",
                title: "提供給VPN的IP位址",
                content: "請輸入遠端LAN的IP位址。"
            }, {
                type: "name",
                title: "IP子網路遮罩",
                content: "請輸入遠端LAN的子網路遮罩。"
            }, {
                type: "name",
                title: "金鑰交換模式",
                content: "請選擇自動（IKE）或手動被用於驗證IPSec端點。"
            }, {
                type: "name",
                title: "驗證方式",
                content: "選擇預先共用金鑰（推薦）。"
            }, {
                type: "name",
                title: "預先共用金鑰",
                content: "請創建一個用於驗證的預先共用金鑰。"
            }, {
                type: "name",
                title: "完全轉發保密",
                content: "選擇啟用（或停用）完全轉發保密（PFS）作為供預先共用金鑰的額外安全性協定。"
            }, {
                type: "name",
                title: "進階",
                content: "點選以設定進階設定。我們建議您保留預設設定。如果您想變更這些設定，請確認二邊的VPN伺服器終端在階段1與階段2，都使用相同的加密演算法、完整性演算法、供金鑰交換的Diffie-Hellman群組以及金鑰有效時間。",
                children: [{
                    type: "title2",
                    content: "階段1"
                }, {
                    type: "name",
                    title: "模式",
                    content: "選擇<b>主要</b>以設定標準的IKE階段1的協商參數。選擇<b>積極</b>以設定VPN通道的IKE階段1以在更短的時間內進行協商。 （不推薦，因為它是不太安全的。）"
                }, {
                    type: "name",
                    title: "本地識別碼類型",
                    content: "選擇IKE協商的本地識別碼類型。以本地WAN IP使用的IP地址作為IKE協商的識別碼。 FQDN（完全限定域名）則使用使用者名稱作為識別碼。"
                }, {
                    type: "name",
                    title: "本地識別碼",
                    content: "如果選擇<b>本地WAN IP</b>，則本地識別碼將被自動填寫。如果選擇<b>FQDN</b>，則輸入要使用本地設備的使用者名稱作為IKE協商的識別碼。"
                }, {
                    type: "name",
                    title: "遠端識別碼類型",
                    content: "選擇IKE協商的遠端識別碼類型。以遠端廣域網路IP使用的IP地址作為IKE協商的識別碼。 FQDN則使用使用者名稱作為識別碼。"
                }, {
                    type: "name",
                    title: "遠端識別碼",
                    content: "如果選擇<b>遠端WAN IP</b>，則遠端閘道的IP地址將被自動填寫。如果選擇<b>FQDN</b>，則輸入要使用遠端端點的使用者名稱作為IKE協商的識別碼。"
                }, {
                    type: "name",
                    title: "加密演算法",
                    content: "請選擇下列一個IKE協商的加密演算法。",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "DES （資料加密標準）用56位元金鑰加密純文本格式的64位元分段。"
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "三重DES，用168位元金鑰加密純文本格式。"
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "使用AES演算法以及128位元加密。"
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "使用AES演算法以及192位元加密。"
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "使用AES演算法以及256位元加密。"
                    }]
                }, {
                    type: "name",
                    title: "完整性演算法",
                    content: "請選擇下列一個IKE協商的完整性演算法。",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "MD5（訊息摘要演算法）取任意長度的訊息，產生一個128位元的訊息摘要。"
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "SHA1（安全散列演算法）取小於2 ^64（2的64次方）位元的訊息，並產生一個160位元的訊息摘要。"
                    }]
                }, {
                    type: "name",
                    title: "供金鑰交換的Diffie-Hellman群組",
                    content: "選擇用於金鑰協商階段1的Diffie-Hellman群組。該Diffie-Hellman群組以位元設定演算法的長度。"
                }, {
                    type: "name",
                    title: "金鑰有效時間",
                    content: "在與遠端終端建立一個新的IPSec安全連接（SA）之前，請輸入時間週期（以秒為單位）使其通過。預設值是3600。"
                }, {
                    type: "title2",
                    content: "階段2"
                }, {
                    type: "name",
                    title: "加密演算法",
                    content: "請選擇下列一個IKE協商的加密演算法。",
                    children: [{
                        type: "name",
                        title: "DES",
                        content: "DES （資料加密標準）用56位元金鑰加密純文本格式的64位元分段。"
                    }, {
                        type: "name",
                        title: "3DES",
                        content: "三重DES，用168位元金鑰加密純文本格式。"
                    }, {
                        type: "name",
                        title: "AES128",
                        content: "使用AES演算法以及128位元加密。"
                    }, {
                        type: "name",
                        title: "AES192",
                        content: "使用AES演算法以及192位元加密。"
                    }, {
                        type: "name",
                        title: "AES256",
                        content: "使用AES演算法以及256位元加密。"
                    }]
                }, {
                    type: "name",
                    title: "完整性演算法",
                    content: "請選擇下列一個IKE協商的完整性演算法。",
                    children: [{
                        type: "name",
                        title: "MD5",
                        content: "MD5（訊息摘要演算法）取任意長度的訊息，產生一個128位元的訊息摘要。"
                    }, {
                        type: "name",
                        title: "SHA1",
                        content: "SHA1（安全散列演算法）取小於2 ^64（2的64次方）位元的訊息，並產生一個160位元的訊息摘要。"
                    }]
                }, {
                    type: "name",
                    title: "供金鑰交換的Diffie-Hellman群組",
                    content: "選擇用於金鑰協商階段1的Diffie-Hellman群組。該Diffie-Hellman群組以位元設定演算法的長度。"
                }, {
                    type: "name",
                    title: "金鑰有效時間",
                    content: "在與遠端終端建立一個新的IPSec安全連接（SA）之前，請輸入時間週期（以秒為單位）使其通過。預設值是3600。"
                }]
            }]
        },
        wanBasic: {
            TITLE: "網際網路連線設定",
            CONTENT: [{
                type: "name",
                title: "自動偵測",
                content: "點選此按鈕讓路由器自動偵測您的目前的網際網路連線類型。"
            }, {
                type: "paragraph",
                title: "註",
                content: "如果您不確定您的網際網路連線類型是哪一種，請使用「自動偵測」功能或聯絡您的ISP以尋求協助。"
            }, {
                type: "title",
                title: "網際網路連線類型：固定IP"
            }, {
                type: "name",
                title: "IP位址/子網路遮罩/預設閘道/主要DNS/次要DNS",
                content: "請輸入由您的ISP提供的資訊。"
            }, {
                type: "title",
                title: "網際網路連線類型：浮動IP"
            }, {
                type: "name",
                title: "請勿複製MAC位址/複製目前的電腦MAC位址",
                content: "請根據您的ISP選擇是否複製您的MAC位址。"
            }, {
                type: "title",
                title: "網際網路連線類型：PPPoE"
            }, {
                type: "name",
                title: "使用者名稱/密碼",
                content: "請輸入由您的ISP提供的使用者名稱與密碼。這些欄位需注意英文大小寫。"
            }, {
                type: "title",
                title: "網際網路連線類型：L2TP/PPTP"
            }, {
                type: "name",
                title: "使用者名稱/密碼",
                content: "請輸入由您的ISP提供的使用者名稱與密碼。這些欄位需注意英文大小寫。"
            }, {
                type: "name",
                title: "次要連線（浮動IP或固定IP）",
                children: [{
                    type: "name",
                    title: "浮動IP",
                    content: "如果您的ISP將會自動分配給您IP位址與子網路遮罩，請選擇此項目。"
                }, {
                    type: "name",
                    title: "固定IP",
                    content: "如果ISP提供您IP位址、子網路遮罩、閘道與DNS參數，請選擇此類型並輸入這些資訊到對應欄位。"
                }]
            }, {
                type: "name",
                title: "VPN伺服器IP/網域名稱",
                content: "請輸入由您的ISP提供的VPN伺服器的IP位址或網域名稱。"
            }]
        },
        PRINT_SERVER: {
            TITLE: "列印伺服器",
            CONTENT: [{
                type: "paragraph",
                content: "在此頁面您可以設定列印伺服器。"
            }, {
                type: "name",
                title: "列印伺服器",
                content: "指出列印伺服器的目前的狀態是啟用或停用。"
            }, {
                type: "name",
                title: "印表機名稱",
                content: "連接到路由器的印表機的名稱。"
            }, {
                type: "note",
                title: "依照以下指示以設定您的列印伺服器：",
                content: [
                    "步驟1：透過USB連接線，連接USB印表機到路由器的USB連接埠。",
                    "步驟2：在您的電腦安裝印表機驅動程式。",
                    "步驟3：在您的電腦安裝「TP-LINK USB Printer Controller」，請執行資源光碟或從我們的網站（www.tp-link.com）下載「TP-LINK USB Printer Controller」工具程式。"
                ]
            }]
        },
        sysconf: {
            TITLE: "無線進階設定2.4GHz | 5GHz-1 | 5GHz-2",
            CONTENT: [{
                type: "name",
                title: "信標間隔",
                content: "以毫秒輸入介於25至1000之間的值，以決定藉由路由器廣播用來同步無線網路的信標封包之間的持續時間。預設值為100毫秒。"
            }, {
                type: "name",
                title: "RTS臨界值",
                content: "輸入1至2346之間的值，以決定能夠通過該路由器數據傳輸的封包大小。在預設情況下，RTS（請求發送）臨界值的大小是2346。如果封包的大小大於預先設定的臨界值，則路由器發送請求發送訊框到特定接收站並協商資料訊框的發送，否則封包將被立即發送。"
            }, {
                type: "name",
                title: "DTIM間隔",
                content: "請輸入介於1至255之間的值以決定傳輸指示訊息（DTIM）的間隔。1表示DTIM間隔與信標間隔相同。"
            }, {
                type: "name",
                title: "群組金鑰更新週期",
                content: "請輸入秒的數量（最小30）以控制加密金鑰自動更新的時間間隔。預設值為0，代表金鑰不更新。"
            }, {
                type: "name",
                title: "WMM功能",
                content: "WMM（Wi-Fi多媒體）功能保證了含有高優先級訊息的封包會被優先傳輸。 強烈建議啟用WMM，並且預設值是啟用的。"
            }, {
                type: "name",
                title: "短GI功能",
                content: "此功能為預設且建議為啟用，它可藉由縮減保護間隔（GI）的時間以增加資料容量。"
            }, {
                type: "name",
                title: "AP隔離功能",
                content: "選擇核取方塊以啟用AP隔離功能，這允許您去限制在您的無線網路上的所有無線設備彼此互動，但它們仍然能夠存取網際網路。預設情況下，AP隔離是停用的。"
            }, {
                type: "title",
                title: "WPS"
            }, {
                type: "name",
                title: "啟用WPS",
                content: "切換至「開」以啟用WPS功能。"
            }, {
                type: "paragraph",
                content: "點選「儲存」以儲存您的設定。"
            }, {
                type: "title",
                title: "LED"
            }, {
                type: "name",
                title: "夜間模式",
                content: "當此功能啟用時，在特定的時間週期內，路由器的LED燈號將會自動關閉。"
            }, {
                type: "name",
                title: "時間週期",
                content: "請輸入關閉路由器的LED燈號的時間週期。"
            }, {
                type: "paragraph",
                content: "點選「儲存」以儲存您的設定。"
            }, {
                type: "title",
                title: "DoS防護設定"
            }, {
                type: "paragraph",
                content: "DoS防護層級可以保護路由器免於 TCP-SYN-FLOOD、UDP-FLOOD以及ICMP-FLOOD攻擊。"
            }, {
                type: "name",
                title: "ICMP-FLOOD封包等級",
                content: "請輸入介於5-3600之間的值，當ICMP封包超過預先設定的臨界值時，將會立即觸發ICMP-FLOOD保護。"
            }, {
                type: "name",
                title: "UDP-FLOOD封包等級",
                content: "請輸入介於5-3600之間的值，當UDP封包超過預先設定的臨界值時，將會立即觸發UDP-FLOOD保護。"
            }, {
                type: "name",
                title: "TCP-FLOOD封包等級",
                content: "請輸入介於5-3600之間的值，當TCP-SYN封包超過預先設定的臨界值時，將會立即觸發TCP-SYN-FLOOD保護。"
            }, {
                type: "paragraph",
                content: "點選「儲存」以儲存您的設定。"
            }]
        },
        logConf: {
            TITLE: "日誌設定",
            CONTENT: [{
                type: "name",
                title: "本地儲存",
                content: "選擇以儲存系統日誌到您的本地記憶體。",
                children: [{
                    type: "name",
                    title: "最小層級",
                    content: "請從下拉式列表中選擇要被儲存的系統日誌的最小層級，然後高於或等於所選層級的所有紀錄的事件將會被儲存。"
                }]
            }, {
                type: "name",
                title: "遠端儲存",
                content: "選擇以發送系統日誌到遠端系統日誌伺服器的特定的IP位址與UDP通訊埠。",
                children: [{
                    type: "name",
                    title: "最小層級",
                    content: "請從下拉式列表中選擇要被儲存的系統日誌的最小層級，然後高於或等於所選層級的所有紀錄的事件將會被儲存。"
                }, {
                    type: "name",
                    title: "伺服器IP",
                    content: "請指定遠端系統日誌伺服器的IP位址，事件將會被發送至該處。"
                }, {
                    type: "name",
                    title: "伺服器通訊埠",
                    content: "請指定遠端系統日誌伺服器的通訊埠號碼，事件將會被發送至該處。"
                }, {
                    type: "name",
                    title: "本地設備名稱",
                    content: "請根據您的遠端伺服器的設備名稱選擇本地設備名稱。"
                }]
            }]
        },
        GUSET_NETWORK_WIRELESS: {
            TITLE: "無線",
            CONTENT: [{
                type: "name",
                title: "安全性",
                content: "您可以從下列安全性選項中選擇一個。",
                children: [{
                    type: "name",
                    title: "無安全性",
                    content: "所有的無線設備都可連線到此路由器而不需任何加密。強烈建議您選擇以下其中一種模式以啟用安全性。"
                }, {
                    type: "name",
                    title: "WPA/WPA2個人",
                    content: "選擇基於預先共用通行碼的WPA。",
                    children: [{
                        type: "name",
                        title: "版本",
                        content: "您可以選擇下列版本的其中一個",
                        children: [{
                            type: "name",
                            title: "自動",
                            content: "將會基於無線設備的相容性與請求，自動選擇WPA-PSK或WPA2-PSK。"
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "WPA2的預先共用金鑰。"
                        }]
                    }, {
                        type: "name",
                        title: "加密",
                        content: "您可以選擇自動、TKIP或AES其中之一。"
                    }, {
                        type: "name",
                        title: "無線密碼",
                        content: "您可以輸入ASCII或十六進位字元。以十六進位來說，長度應介於8-64個字元之間；以ASCII來說，長度應介於8-63個字元之間。"
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2企業",
                    content: "選擇基於RADIUS伺服器的WPA。",
                    children: [{
                        type: "name",
                        title: "版本",
                        content: "您可以從下列版本中選擇一個",
                        children: [{
                            type: "name",
                            title: "自動",
                            content: "將會基於無線設備的相容性與請求，自動選擇WPA或WPA2。"
                        }, {
                            type: "name",
                            title: "WPA",
                            content: "Wi-Fi保護存取。"
                        }, {
                            type: "name",
                            title: "WPA2",
                            content: "WPA版本2。"
                        }]
                    }, {
                        type: "name",
                        title: "加密",
                        content: "您可以選擇自動、TKIP或AES其中之一。"
                    }, {
                        type: "name",
                        title: "RADIUS伺服器IP",
                        content: "請輸入RADIUS伺服器的IP位址。"
                    }, {
                        type: "name",
                        title: "RADIUS通訊埠",
                        content: "請輸入RADIUS服務使用的通訊埠號碼。"
                    }, {
                        type: "name",
                        title: "RADIUS密碼",
                        content: "請輸入RADIUS伺服器的密碼。"
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "選擇802.11 WEP安全性。",
                    children: [{
                        type: "name",
                        title: "類型",
                        content: "您可以從下列類型中選擇一個",
                        children: [{
                            type: "name",
                            title: "自動",
                            content: "將會基於無線設備的相容性與請求，自動選擇共用金鑰或開放系統等驗證類型。"
                        }, {
                            type: "name",
                            title: "共用金鑰",
                            content: "選擇802.11共用金鑰驗證。"
                        }, {
                            type: "name",
                            title: "開放系統",
                            content: "選擇802.11開放系統驗證。"
                        }]
                    }, {
                        type: "name",
                        title: "選擇金鑰",
                        content: "選擇將被使用的4個金鑰的其中之一。"
                    }, {
                        type: "name",
                        title: "WEP金鑰格式",
                        content: "您可以選擇 ASCII或十六進位格式。ASCII格式代表在特定長度下，鍵盤字元的任意組合。十六進制格式代表在特定長度下，十六進位數字（0-9、a-f、A-F）的任意組合。"
                    }, {
                        type: "name",
                        title: "金鑰類型",
                        content: "您可以為加密選擇WEP金鑰長度（64位元、128-bit位元、152位元）。「停用」代表此WEP金鑰項目是無效的。",
                        children: [{
                            type: "name",
                            title: "64位元加密",
                            content: "您可以輸入10個十六進位數字（0-9、a-f、A-F的任意組合並且不允許空值）或5個ASCII字元。"
                        }, {
                            type: "name",
                            title: "128位元加密",
                            content: "您可以輸入26個十六進位數字（0-9、a-f、A-F的任意組合並且不允許空值）或13個ASCII字元。"
                        }, {
                            type: "name",
                            title: "152位元加密",
                            content: "您可以輸入32個十六進位數字（0-9、a-f、A-F的任意組合並且不允許空值）或16個ASCII字元。"
                        }]
                    }, {
                        type: "name",
                        title: "金鑰值",
                        content: "請輸入WEP的密碼。"
                    }]
                }]
            }, {
                type: "name",
                title: "模式",
                content: "此欄位決定路由器工作的無線模式。"
            }, {
                type: "name",
                title: "頻道寬度",
                content: "無線頻道的頻寬。"
            }, {
                type: "name",
                title: "頻道",
                content: "此欄位決定將使用那個運作頻寬。如果您沒有遇到因另一個基地台所造成的間歇性的無線連線問題的話，請勿變更無線頻道。如果您選擇自動，接著AP將會自動選擇最好的頻道。"
            }, {
                type: "name",
                title: "傳輸功率",
                content: "您可以在這裡指定路由器的傳輸功率。您可以選擇高、中、低其中一個您想要的選項。預設與推薦設定為高。"
            }, {
                type: "paragraph",
                content: "點選<strong>儲存</strong>以儲存並套用設定。"
            }]
        },
        diagnostic: {
            TITLE: "診斷工具",
            CONTENT: [{
                type: "paragraph",
                content: "此路由器提供Ping和追蹤路由工具來幫助您找出網路連接問題。Ping工具將封包發送到目標IP位址或網域名稱，並紀錄結果，例如：已發送/已接收的封包的數量，以及往返時間。追蹤路由工具將封包發送到目標IP位址或網域名稱，並顯示到達目的地的節點數量與時間。"
            }, {
                type: "paragraph",
                content: "您可以透過IP位址或網域名稱（例如：google.com、yahoo.com等）Ping與追蹤路由一個網路設備。"
            }, {
                type: "note",
                title: "使用Ping診斷",
                content: [
                    "請輸入目標IP位址或網域名稱。",
                    "點選箭頭圖示以開啟進階選單並指定Ping次數與Ping封包大小。（選填）",
                    "點選開始。"
                ]
            }, {
                type: "note",
                title: "使用追蹤路由診斷",
                content: [
                    "請輸入目標IP位址或網域名稱。",
                    "點選箭頭圖示以開啟進階選單並在追蹤路由最大TTL（有效時間）欄位中指定節點的（可以到達的）數量。預設值為20。（選填）",
                    "點選開始。"
                ]
            }]
        },
        lan: {
            TITLE: "LAN",
            CONTENT: [{
                type: "name",
                title: "MAC位址",
                content: "路由器的獨一無二的實體位址。"
            }, {
                type: "name",
                title: "LAN IPv4",
                content: "保持路由器的預設IP位址（192.168.0.1）或輸入一個新的位址。此IP位址被用於登入路由器的網頁管理頁面。"
            }, {
                type: "name",
                title: "子網路遮罩",
                content: "從下拉列表中選擇被LAN通訊埠到路由內部和外部流量使用的分配識別碼或輸入一個新的子網路遮罩格式。預設值為255.255.255.0。"
            }, {
                type: "name",
                title: "IGMP監聽",
                content: "IGMP（網際網路群組管理協定）用於管理在TCP / IP網路的群播。有些ISP使用IGMP以執行用戶端設備上的遠端設定，例如：路由器。它的預設是啟用的。"
            }, {
                type: "paragraph",
                title: "註",
                content: "如果新的LAN IP位址與舊的位址在不同的子網路上，DHCP伺服器中的IP位址池將會自動變更；但是虛擬伺服器與DMZ主機將不會生效，直到它們被重新設定為止。"
            }]
        },
        ddos: {
            TITLE: "防火牆",
            CONTENT: [{
                type: "name",
                title: "SPI防火牆",
                content: "SPI（狀態包檢測）防火牆能防止網路攻擊，並驗證是通過路由器的流量。SPI防火牆預設為啟用。"
            }, {
                type: "title",
                title: "DoS防護"
            }, {
                type: "name",
                title: "DoS防護",
                content: "DoS（拒絕服務）防護能保護您的區域網路對抗DoS攻擊，以避免伺服器請求淹沒您的網路。預設情況下，DoS保護是停用的（關）。"
            }, {
                type: "name",
                title: "ICMP-FLOOD攻擊過濾",
                content: "啟用以防止ICMP（網際網路控制訊息協定）淹沒攻擊。"
            }, {
                type: "name",
                title: "UDP-FLOOD攻擊過濾",
                content: "啟用以防止UDP（使用者資料電報協定）淹沒攻擊。"
            }, {
                type: "name",
                title: "TCP-FLOOD攻擊過濾",
                content: "啟用以防止TCP-SYN（傳輸控制協定-同步）淹沒攻擊。",
                children: [{
                    type: "name",
                    title: "關",
                    content: "無防護。"
                }, {
                    type: "name",
                    title: "低",
                    content: "低等級的防護並且對路由器性能的影響不明顯。"
                }, {
                    type: "name",
                    title: "中",
                    content: "中等級的防護並且對路由器性能的影響不完全明顯。"
                }, {
                    type: "name",
                    title: "高",
                    content: "高等級的防護但是對路由器性能的影響很明顯。"
                }]
            }, {
                type: "name",
                title: "禁止LAN的Ping",
                content: "啟用以禁止來自於LAN連接埠的Ping。"
            }, {
                type: "name",
                title: "禁止WAN的Ping",
                content: "啟用以禁止來自於WAN連接埠的Ping。"
            }, {
                type: "title",
                title: "封鎖的DoS主機列表"
            }, {
                type: "name",
                title: "封鎖的DoS主機列表",
                content: "列出從所有已封鎖的DoS攻擊來源的IP位址與MAC位址。"
            }, {
                type: "name",
                title: "刪除一個或更多項目",
                content: "在主機列表中，選擇您想要刪除的一個或多個項目，並點選表格上方的「刪除」。"
            }]
        },
        ipv6: {
            TITLE: "IPv6網際網路",
            CONTENT: [{
                type: "name",
                title: "啟用IPv6",
                content: "選擇以啟用（開）或停用（關）路由器的IPv6功能。"
            }, {
                type: "title",
                title: "網際網路連線類型：固定IP"
            }, {
                type: "name",
                title: "固定IP",
                content: "如果您的ISP使用固定IPv6位址分配，請選擇此類型。"
            }, {
                type: "name",
                title: "IPv6位址/IPv6預設閘道/IPv6 DNS伺服器/次要IPv6  DNS伺服器",
                content: "請輸入由您的ISP提供的參數。"
            }, {
                type: "name",
                title: "MTU（位元組）",
                content: "對大多數的乙太網路來說，預設的與典型的MTU（最大傳輸單元）的大小為1500位元組。除非ISP要求，否則不建議變更預設的MTU大小。"
            }, {
                type: "title",
                title: "網際網路連線類型：浮動IP"
            }, {
                type: "name",
                title: "浮動IP",
                content: "如果您的ISP使用浮動IPv6位址分配，請選擇此類型。"
            }, {
                type: "name",
                title: "IPv6位址/IPv6閘道",
                content: "這些參數將會由您的ISP的DHCPv6伺服器自動分配。"
            }, {
                type: "name",
                title: "位址類型",
                content: "請選擇IPv6連線的連線類型。"
            }, {
                type: "name",
                title: "MTU（位元組）",
                content: "對大多數的乙太網路來說，預設的與典型的MTU（最大傳輸單元）的大小為1500位元組。除非ISP要求，否則不建議變更預設的MTU大小。"
            }, {
                type: "name",
                title: "使用下列的IPv6 DNS位址",
                content: "勾選此核取方塊並以點分十進制格式輸入由您的ISP提供的DNS伺服器位址。此WAN介面將會優先使用特定的DNS伺服器。"
            }, {
                type: "name",
                title: "主機名稱",
                content: "請輸入一個值到此欄位以指定路由器的主機名稱。"
            }, {
                type: "title",
                title: "網際網路連線類型：PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "如果您的ISP使用PPPoEv6並且提供您使用者名稱與密碼，請選擇此類型。"
            }, {
                type: "name",
                title: "使用者名稱/密碼/確認密碼",
                content: "請輸入由您的ISP提供的參數。"
            }, {
                type: "name",
                title: "位址類型",
                content: "請選擇IPv6連線的連線類型。"
            }, {
                type: "name",
                title: "服務名稱",
                content: "請輸入由您的ISP提供的服務名稱。如果沒有，請保留空白。"
            }, {
                type: "name",
                title: "伺服器名稱",
                content: "請輸入由您的ISP提供的伺服器名稱。如果沒有，請保留空白。"
            }, {
                type: "name",
                title: "MTU（位元組）",
                content: "對乙太網路來說，典型的MTU（最大傳輸單元）的大小為1480位元組。",
                children: [{
                    type: "paragraph",
                    content: "<b>註：</b>在極少的案例中，您的ISP可能會要求您調整MTU大小以取得更好的網路效能。除非必須，否則請勿變更此數值。"
                }]
            }, {
                type: "name",
                title: "使用由ISP指定的IPv6資訊",
                content: "勾選此核取方塊並輸入由您的ISP提供的IP位址與閘道。"
            }, {
                type: "name",
                title: "使用下列的IPv6 DNS位址",
                content: "如果您想要手動輸入由ISP提供的DNS位址，請選擇此項目。如果沒有選擇，路由器將會從您的ISP以浮動方式取得DNS位址。"
            }, {
                type: "title",
                title: "網際網路連線類型：6to4通道"
            }, {
                type: "name",
                title: "6to4通道",
                content: "如果您的ISP使用6to4部署分配位址，請選擇此類型。"
            }, {
                type: "title",
                title: "IPv6 LAN"
            }, {
                type: "name",
                title: "位址類型",
                content: "請根據您的ISP選擇合適的一個。",
                children: [{
                    type: "name",
                    title: "RADVD",
                    content: "選擇此選項以透過RADVD指定IPv6位址給在您的LAN上的電腦。",
                    children: [{
                        type: "name",
                        title: "啟用RDNSS",
                        content: "勾選該核取方塊以啟用RDNSS功能。"
                    }, {
                        type: "name",
                        title: "啟用ULA前綴",
                        content: "勾選該核取方塊以啟用ULA前綴功能。",
                        children: [{
                            type: "name",
                            title: "ULA前綴",
                            content: "請輸入ULA前綴。"
                        }, {
                            type: "name",
                            title: "ULA前綴長度",
                            content: "請輸入ULA前綴長度。預設值為64。"
                        }]
                    }]
                }, {
                    type: "name",
                    title: "DHCPv6伺服器",
                    content: "自動分配IP位址給LAN上的用戶端。",
                    children: [{
                        type: "name",
                        title: "開始IPv6位址",
                        content: "請輸入開始IPv6位址。"
                    }, {
                        type: "name",
                        title: "結束IPv6位址",
                        content: "請輸入結束IPv6位址。"
                    }, {
                        type: "name",
                        title: "租用時間",
                        content: "請輸入DHCP用戶端可以租用它目前的由路由器分配的浮動IPv6位址的期間。在浮動IPv6位址過期後，將會被自動分配新的浮動IPv6位址。預設值為86400秒。"
                    }]
                }]
            }, {
                type: "name",
                title: "站點前綴類型",
                content: "請選擇一個類型以指定前綴給IPv6位址。提供委派的與固定的。"
            }, {
                type: "name",
                title: "委派的",
                children: [{
                    type: "name",
                    title: "前綴委派的WAN連線",
                    content: "請從下拉式列表選擇一個WAN連線以指定前綴。"
                }]
            }, {
                type: "name",
                title: "固定的",
                children: [{
                    type: "name",
                    title: "站點前綴",
                    content: "請輸入站點前綴的值。"
                }, {
                    type: "name",
                    title: "站點前綴長度",
                    content: "請輸入站點前綴長度的值。"
                }]
            }]
        },
		openvpnServer: {
			TITLE: "開啟VP",
			CONTENT: [{
				type: "name",
				title: "啟用VPN伺服器",
				content: "勾選欄位確認啟用VPN伺服器。"
			},{
				type: "name",
				title: "伺服器類型",
				content: "選擇通信協議:UDP或TCP來開啟VPN"
			},{
				type: "name",
				title: "服務端口",
				content: "請輸入介於1024到65535之間的通訊埠號碼。預設與常見服務通訊埠為1194。"
			},{
				type: "name",
				title: "VPN 子網/子網路遮罩",
				content: "輸入可使用的IP網址範圍指引用戶開啟VPN(虛擬私人網路)伺服器。"
			},{
				type: "name",
				title: "用戶權限",
				content: "選擇您需要的用戶端類型開啟VPN。"
			},{
				type: "name",
				title: "僅限於家用網路",
				content: "用戶權限僅止於路由器與LAN。用戶並不會改變路由器預設值。"
			},{
				type: "name",
				title: "網際網路與家用網路",
				content: "用戶有路由器、LAN與網際網路權限。用戶能夠修改路由器預設值。"
			},{
				type: "paragraph",
				content: "點選儲存來存取您的設定。"
            },{
                type: "title",
                content: "憑證"
            },{
                type: "paragraph",
                content: "透過資訊憑證與辨別來VPN遠端連接電腦。"
            },{
                type: "name",
                title: "生成",
                content: "點選以生成新憑證。"
            },{
                type: "title",
                content: "配置文件"
            },{
                type: "name",
                title: "輸出",
                content: "點選此按鈕來儲存開啟VPN配置文件並使用於新增新的VPN連接。"
			},{
                type: "title",
                content: "VPN用戶使用指南"
			},{
				type: "step",
				title: "讓您的用戶設備連線至OpenVPN伺服器:",
			},{
				type: "paragraph",
				content: "在您安裝OpenVPN伺服器前,請先安裝動態DNS伺服器(建議)或指定WAN端口靜態IP網址。請先確認您的外部NAT端口不是伺服器端口,以及您作業系統時間與網際網路時間相同"
			},{
				type: "step",
				title:"",
				content:[
					"選取可使用VPN伺服器",
					"OpenVPN伺服器設定參數(伺服器類型、伺服器端口與用戶權限)並點選儲存",
					"點選輸出並儲存設定文件",
					"在用戶設備，下載與安裝OpenVPN用戶工具請至 <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> 官方支援平台有Windows、Mac OSX、Linux。",
					"啟用OpenVPN用戶工具與增加新VPN連線使用儲存的配置文件來連接您的用戶裝置至VPN伺服器"
				]
			},{	
				type: "paragraph",
				title: "Note:",
				content: "如需要更多關於 OpenVPN訊息，請至 <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
            }]
		},

		pptpvpnServer: {
			TITLE: "PPTP VPN",
			CONTENT: [{
				type: "name",
				title: "啟用VPN伺服器",
				content: "勾選欄位確認啟用VPN伺服器。"
			},{
				type: "name",
				title: "用戶IP網址",
				content: "請輸入可以被租用給PPTP VPN伺服器用戶端的IP位址的範圍（最多10個用戶端）。"
			},{
				type: "name",
				title: "使用者名稱與密碼",
				content: "輸入使用者名稱與密碼來驗證用戶的PPTP VPN伺服器。"
			},{
				type: "paragraph",
				content: "點選儲存來存取您的設定。"
			},{
                type: "title",
                content: "VPN用戶使用指南"
			},{
				type: "step",
				title: "讓您的用戶裝置能夠連線至PPTP VPN伺服器：",
			},{
				type: "paragraph",
				content: "在您安裝PPTP VPN伺服器前，請先安裝動態DNS伺服器(建議)或指定WAN端口靜態IP網址。請先確認您的外部NAT端口不是1723，以及您的作業系統時間與網際網路時間相同。"
			},{
				type: "step",
				title:"",
				content:[
					"選取可使用VPN伺服器",
					"安裝PPTP VPN伺服器參數並點選儲存",
					"在您的設備建立PPTP VPN連線，官方支援平台有 Windows、Mac OSX、Linux、iOS、and Android。",
					"啟用PPTP VPN程式，增加新的連線並註冊DDNS伺服器輸入網域名稱或指定WAN端口靜態IP網址，至用戶端連線PPTP VPN伺服器。",
				]				
			}]
		},

		vpnServerStatus: {
			TITLE: "VPN連線",
			CONTENT: [{
				type: "paragraph",
				content: "此頁面顯示用戶的路由器目前所有連線Open VPN與PPTP VPN伺服器的用戶。"
			},{
				type: "paragraph",
				content: "點選「-（減號）」符號來中斷連線用戶。"
			}]
		},
    };
})(jQuery);
