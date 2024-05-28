(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"網際網路",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示關於廣域網路(網際網路)連線的相關資訊。"
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"無線網路 2.4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示關於無線網路的相關資訊。"
                       }]
},
       STATUS_LAN :{ 
               TITLE:"區域網路(LAN)",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示有關於區域網路(LAN)的相關資訊。"
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"訪客網路 2.4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示關於訪客無線網路的相關資訊。"
                       }]
},
       STATUS_USB :{ 
               TITLE:"USB 設備",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示目前透過USB連接埠，連接到路由器的USB儲存設備、印表機的資訊。"
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"效能",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示目前路由器的效能。"
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"有線使用者",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示連接到網路的有線設備的資訊。"
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"無線使用者",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示連接到網路的無線設備的資訊。"
                       }]
},
       INTERNET_TITLE :{ 
               TITLE:"網際網路",
               CONTENT: [{
                           type: "paragraph",
                           content: "設定您需要的IPv4參數並選擇恰當的MAC複製方式。"
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"IPv4",
               CONTENT: [{
                           type: "paragraph",
                           content: "請選擇網際網路連線類型並輸入對應的參數。"
                       } ,{                      
                           type: "title",
                            title: "網際網路連線類型: 浮動 IP"
                       } ,{                      
                           type: "paragraph",
                           content: "如果ISP提供您DHCP伺服器連線，請選擇此類型。"
                       } ,{                      
                           type: "name",
                           title: "IP 位址/子網路遮罩/預設閘道/主要 DNS/次要 DNS",
                           content: "這些參數會從ISP的DHCP伺服器自動分配。"
                       } ,{                      
                           type: "name",
                           title: "更新",
                           content: "點選以從DHCP伺服器取得新的IP參數。"
                       } ,{                      
                           type: "name",
                           title: "釋放",
                           content: " 點選以釋放所有由DHCP伺服器分配的IP位址。"
                       } ,{                      
                           type: "name",
                           title: "DNS 位址",
                           content: "如果ISP提供1到2個DNS位址，勾選此核取方塊並輸入主要DNS與次要DNS伺服器到對應欄位。否則，您的ISP會自動分配DNS伺服器位址給您。"
                       } ,{                      
                           type: "name",
                           title: "MTU 大小",
                           content: "一般常見的乙太網路MTU （Maximum Transmit Unit）數值為1500。通常您不需要修改這個數值，除非您的ISP有特別需求！"
                       } ,{                      
                           type: "name",
                           title: "主機名稱",
                           content: "輸入數值到此欄位以指定路由器的主機名稱。"
                       } ,{                      
                           type: "name",
                           title: "使用單播DHCP取得IP",
                           content: "如果ISP的DHCP伺服器不支援廣播應用並且您不能自動取得IP位址，請勾選此核取方塊。"
                       } ,{                      
                           type: "title",
                            title: "網際網路連線類型: 固定 IP"
                       } ,{                      
                           type: "paragraph",
                           content: "如果您的ISP提供您一組特定的IP參數，如： IP 位址, 子網路遮罩, 閘道, DNS位址等，請選擇此類型。"
                       } ,{                      
                           type: "name",
                           title: "IP 位址/子網路遮罩/預設閘道/主要 DNS/次要 DNS",
                           content: "請輸入由ISP所提供的資訊。"
                       } ,{                      
                           type: "name",
                           title: "MTU 大小",
                           content: "一般常見的乙太網路MTU （Maximum Transmit Unit）數值為1500。通常您不需要修改這個數值，除非您的ISP有特別需求！"
                       } ,{                      
                           type: "title",
                            title: "網際網路連線類型: BigPond Cable"
                       } ,{                      
                           type: "paragraph",
                           content: "如果ISP提供您BigPond Cable連線，請選擇此類型。"
                       } ,{                      
                           type: "name",
                           title: "使用者名稱/密碼",
                           content: "請輸入由ISP所提供的使用者名稱與密碼。此欄位需注意英文大小寫之不同。"
                       } ,{                      
                           type: "name",
                           title: "驗證伺服器",
                           content: "請輸入驗證伺服器的IP位址或主機名稱。"
                       } ,{                      
                           type: "name",
                           title: "驗證域名",
                           content: "請輸入伺服器的網域名稱後綴(基於地點)。例如：nsw.bigpond.net.au 對應 NSW/ACT，vic.bigpond.net.au 對應 VIC/TAS/WA/SA/NT 以及 qld.bigpond.net.au 對應 QLD。"
                       } ,{                      
                           type: "name",
                           title: "MTU 大小",
                           content: "一般常見的乙太網路MTU （Maximum Transmit Unit）數值為1500。通常您不需要修改這個數值，除非您的ISP有特別需求！"
                       } ,{                      
                           type: "name",
                           title: "連線模式",
                           content: "請選擇一個合適的連線模式，用於決定如何連接到網際網路。",
       children: [{                      
                           type: "name",
                           title: "自動",
                           content: "路由器將會在斷線後自動恢復連線，永遠保持連線狀態。"
                       } ,{                      
                           type: "name",
                           title: "依需求",
                           content: "在此模式，您可以設定路由器超過「最長閒置時間」後，仍沒有任何網路連線活動時，將自動終止連線，直到有新的網路連線需求時，再自動重新連線。"
                       } ,{                      
                           type: "name",
                           title: "手動",
                           content: "一般我們不建議您使用這個選項，因為每次路由器斷線後，您都必須進入分享器的管理介面，手動恢復連線。此模式也支援設定「最長閒置時間」(預設值為15分鐘，也可設定為0代表不中斷連線)，超過該時間仍沒有任何網路連線活動時，將自動終止連線，直到您手動恢復連線為止。"
                       }]
} ,{                      
                           type: "title",
                            title: "網際網路連線類型: PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "如果您的ISP（如：Hinet、台灣大寬頻...等）提供您一組「使用者名稱（帳號）、密碼」，請選擇此類型。"
                       } ,{                      
                           type: "name",
                           title: "使用者名稱/密碼",
                           content: "請輸入由ISP所提供的使用者名稱與密碼。此欄位需注意英文大小寫之不同。"
                       } ,{                      
                           type: "name",
                           title: "IP位址/主要DNS/次要DNS",
                           content: "這些參數會從ISP的DHCP伺服器自動分配。"
                       } ,{                      
                           type: "name",
                           title: "第二連線 (無, 浮動 IP, 固定 IP)",
       children: [{                      
                           type: "name",
                           title: "無",
                           content: "如果ISP沒有提供第二連線，請選擇此項目。(在台灣請選此項目，除非ISP有特殊需求。)"
                       } ,{                      
                           type: "name",
                           title: "浮動 IP",
                           content: "如果IP 位址與子網路遮罩由ISP自動提供，請選擇此項目。",
       children: [{                      
                           type: "name",
                           title: "更新",
                           content: "點選以從ISP取得新的IP參數。"
                       } ,{                      
                           type: "name",
                           title: "釋放",
                           content: " 點選以釋放被分配的IP位址。"
                       }]
} ,{                      
                           type: "name",
                           title: "固定 IP",
                           content: "如果IP位址與子網路遮罩由ISP提供，並且需輸入資訊至對應欄位，請選擇此項。"
                       }]
} ,{                      
                           type: "name",
                           title: "MTU 大小",
                           content: "一般常見的乙太網路MTU （Maximum Transmit Unit）數值為1480。",
       children: [{                      
                           type: "note",
                           title: "註",
                           content: "在少數案例中，ISP可能需要您調整MTU大小，已獲取更佳網路效能。除非必須，否則您不該變更此值。"
                       }]
} ,{                      
                           type: "name",
                           title: "服務名稱/存取集中器(AC)名稱",
                           content: "預設來說，服務名稱與存取集中器(AC)名稱是空白的。除非ISP有要求，不然您不應該設定這些欄位。"
                       } ,{                      
                           type: "name",
                           title: "偵測連線間隔",
                           content: "請輸入一個間隔時間(0-120)秒，路由器將會據此重複檢查存取集中器(Access Concentrator)連線狀態。預設值為10。"
                       } ,{                      
                           type: "name",
                           title: "IP 位址",
                           content: "如果ISP提供特定(固定)IP位址，請選擇使用下列的IP位址並在欄位輸入IP位址。否則請選擇從ISP動態取得以自動獲得伺服器分配的IP位址。"
                       } ,{                      
                           type: "name",
                           title: "DNS 位址",
                           content: "如果ISP提供特定(固定)DNS IP位址，請選擇使用下列的DNS位址並分別在主要DNS與次要DNS輸入位址。否則請選擇從ISP動態取得以自動獲得伺服器分配的DNS IP位址。"
                       } ,{                      
                           type: "name",
                           title: "連線模式",
                           content: "請選擇一個合適的連線模式，用於決定如何連接到網際網路。",
       children: [{                      
                           type: "name",
                           title: "自動",
                           content: "路由器將會在斷線後自動恢復連線，永遠保持連線狀態。"
                       } ,{                      
                           type: "name",
                           title: "依需求",
                           content: "在此模式，您可以設定路由器超過「最長閒置時間」後，仍沒有任何網路連線活動時，將自動終止連線，直到有新的網路連線需求時，再自動重新連線。"
                       } ,{                      
                           type: "name",
                           title: "依時間",
                           content: "在此模式，網際網路連線只會在指定的時間段內被建立。如果選擇此模式，請輸入開始時間與結束時間，都採用HH:MM格式。"
                       } ,{                      
                           type: "name",
                           title: "手動",
                           content: "一般我們不建議您使用這個選項，因為每次路由器斷線後，您都必須進入分享器的管理介面，手動恢復連線。此模式也支援設定「最長閒置時間」(預設值為15分鐘，也可設定為0代表不中斷連線)，超過該時間仍沒有任何網路連線活動時，將自動終止連線，直到您手動恢復連線為止。"
                       } ,{                      
                           type: "note",
                           title: "註",
                           content: "依時間的連線模式只有在系統時間被設定後才會生效，您可以在 進階設定 → 系統工具 → 時間設定 頁面中進行設定。"
                       }]
} ,{                      
                           type: "title",
                            title: "網際網路連線類型: L2TP/PPTP"
                       } ,{                      
                           type: "paragraph",
                           content: "如果您的ISP提供L2TP/PPTP連線方式，請選擇此類型。(在台灣您不會使用到此連線類型)"
                       } ,{                      
                           type: "name",
                           title: "使用者名稱/密碼",
                           content: "請輸入由ISP所提供的使用者名稱與密碼。此欄位需注意英文大小寫之不同。"
                       } ,{                      
                           type: "name",
                           title: "IP位址/主要DNS/次要DNS",
                           content: "這些參數會從ISP的DHCP伺服器自動分配。"
                       } ,{                      
                           type: "name",
                           title: "第二連線 (浮動 IP 或 固定 IP)",
       children: [{                      
                           type: "name",
                           title: "浮動 IP",
                           content: "如果IP 位址與子網路遮罩由ISP自動提供，請選擇此項目。"
                       } ,{                      
                           type: "name",
                           title: "固定 IP",
                           content: "如果ISP提供您IP位址、子網路遮罩、閘道與DNS位址，並且需要您輸入這些資訊到對應欄位的話，請選擇此項。"
                       }]
} ,{                      
                           type: "name",
                           title: "VPN伺服器IP/網域名稱",
                           content: "請輸入ISP提供給您的VPN伺服器的IP位址或網域名稱。"
                       } ,{                      
                           type: "name",
                           title: "MTU 大小",
                           content: "MTU是封包傳輸的大小單位，最常見的L2TP採用1460而PPTP採用1420，一般而言您不需要修改這個數值，除非您的ISP有特別需求！"
                       } ,{                      
                           type: "name",
                           title: "連線模式",
                           content: "請選擇一個合適的連線模式，用於決定如何連接到網際網路。",
       children: [{                      
                           type: "name",
                           title: "自動",
                           content: "路由器將會在斷線後自動恢復連線，永遠保持連線狀態。"
                       } ,{                      
                           type: "name",
                           title: "依需求",
                           content: "在此模式，您可以設定路由器超過「最長閒置時間」後，仍沒有任何網路連線活動時，將自動終止連線，直到有新的網路連線需求時，再自動重新連線。"
                       } ,{                      
                           type: "name",
                           title: "手動",
                           content: "一般我們不建議您使用這個選項，因為每次路由器斷線後，您都必須進入分享器的管理介面，手動恢復連線。此模式也支援設定「最長閒置時間」(預設值為15分鐘，也可設定為0代表不中斷連線)，超過該時間仍沒有任何網路連線活動時，將自動終止連線，直到您手動恢復連線為止。"
                       }]
}]
},
       INTERNET_MAC :{ 
               TITLE:"複製MAC位址",
               CONTENT: [{
                           type: "paragraph",
                           content: "請選擇您所需合適的MAC複製方式。"
                       } ,{                      
                           type: "name",
                           title: "請勿複製 MAC位址",
                           content: "不改變路由器預設的MAC位址，一般ADSL/VDSL用戶請選擇此項目。"
                       } ,{                      
                           type: "name",
                           title: "複製目前電腦的MAC位址",
                           content: "會將目前操作電腦的MAC位址複製到路由器的WAN端，當您的ISP僅對您的電腦加入放行白名單時，請選擇此項。"
                       } ,{                      
                           type: "name",
                           title: "使用自訂的 MAC 位址",
                           content: "您可以手動輸入ISP所要求的特定MAC位址。"
                       }]
},
       INTERNET_WAN_AGGREGATION :{ 
               TITLE:"WAN聚合",
               CONTENT: [{
                           type: "paragraph",
                           id: "internet_wan_aggregation_detail",
                           content: "WAN聚合將LAN1連接埠轉變為額外的WAN連接埠，並建立單一高頻寬資料路徑。 從提供1Gbps以上頻寬速率的ISP上取得更快的網際網路，不再被您的網路硬體限制。"
                       } ,{                      
                           type: "note",
                           id: "internet_wan_aggregation_note",
                           title: "註",
                           content: "在啟用此功能前，請確定您的ISP支援WAN聚合並且您的數據機有2個WAN連接埠。"
                       } ,{                      
                           type: "step",
                           title: "若要套用WAN聚合",
       content: [ 
                "1. 將「WAN聚合」切換至開啟以啟用它。",
                "2. 點選儲存。",
                "3. 使用2條網路線，將路由器的WAN連接埠與LAN1連接埠連接至您的數據機的WAN連接埠。"]
}]
},
       LAN_IPV4 :{ 
               TITLE:"區域網路(LAN)",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示路由器的MAC位址、IP位址與子網路遮罩"
                       } ,{                      
                           type: "name",
                           title: "MAC 位址",
                           content: "路由器區域網路(LAN)連接埠所具有獨一無二的實體位址。"
                       } ,{                      
                           type: "name",
                           title: "IP 位址",
                           content: "顯示路由器的預設IP位址，這可以用來登入路由器的網頁管理頁面。您可以變更此IP位址。"
                       } ,{                      
                           type: "name",
                           title: "子網路遮罩",
                           content: "請選被LAN埠路由網際網路與外部流量使用的指定標示符號或輸入一個新的遮罩。"
                       } ,{                      
                           type: "note",
                           title: "註",
                           content: "如果您變更的LAN IP位址與預設值在不同網段，DHCP伺服器的參數會自動跟隨對應變更，但是「虛擬伺服器」、「DMZ主機」等設定不會自動變更，必須手動進行變更。"
                       }]
},
       LINK_AGG :{ 
               TITLE:"鏈路聚合",
               CONTENT: [{
                           type: "paragraph",
                           content: "鏈路聚合可以結合2個通訊埠在一起，使其成為一個高頻寬的資料路徑，因此能維持一個較高的速度和更穩定的有線網絡。"
                       } ,{                      
                           type: "step",
                           id: "link_agg_step_help",
                           title: "若要應用鏈路聚合",
       content: [ 
                "1. 切換至「開」以啟用鏈路聚合功能。",
                "2. 請為鏈路聚合指定2個連接埠。",
                "3. 點選儲存。"]
}]
},
       IPTV :{ 
               TITLE:"IPTV",
               CONTENT: [{
                           type: "paragraph",
                           content: "IPTV(網際網路協定電視)是一種系統，它可以讓電視服務透過封包交換網路使用網際網路協議套件進行傳遞，例如：LAN或網際網路。"
                       } ,{                      
                           type: "name",
                           id: "igmp-snooping",
                           title: "IGMP 窺探",
                           content: "IGMP (網際網路群組管理協定)偵聽功能讓路由器可以轉發群播流量到需求它們的連接埠。"
                       } ,{                      
                           type: "name",
                           title: "IGMP 代理",
                           content: "如果由ISP提供的IPTV服務是以IGMP技術為基礎，請選擇啟用IGMP代理功能。"
                       } ,{                      
                           type: "name",
                           title: "IGMP版本",
                           content: "請根據您的ISP選擇IGMP版本。預設的IGMP版本是V2。"
                       } ,{                      
                           type: "name",
                           id: "igmp-wifi",
                           title: "無線群播轉發",
                           content: "選擇啟用無線群播轉發功能，這可以轉發群播封包到無線網路。"
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "如果ISP提供的IPTV服務選擇啟用IPTV功能並非以IGMP技術為基礎，請選擇啟用IPTV功能。"
                       } ,{                      
                           type: "name",
                           title: "ISP設定檔",
                           content: "請選擇適當的ISP(網路業者)設定檔以完成設定。 在此有三種類型的設定檔：",
       children: [{                      
                           type: "name",
                           title: "國家-ISP名稱",
                           content: "預設的ISP設定檔格式為「國家-ISP名稱」。您只需要從下拉式列表中找到並選擇您的ISP。"
                       } ,{                      
                           type: "name",
                           id: "iptv_bridge_child_1to4",
                           title: "橋接",
                           content: "如果您的ISP不在列表中並且IPTV不需要其他的參數設定，那麼您可以簡單地選擇此設定檔，並指定專用於IPTV的LAN連接埠。",
       children: [{                      
                           type: "name",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "指定LAN連接埠將會傳輸哪種類型的資料。例如：如果將LAN1選擇為IPTV，那麼它將只傳輸IPTV資料並且您必須將機上盒連接至LAN1。"
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_2to5",
                           title: "橋接",
                           content: "如果您的ISP不在列表中並且IPTV不需要其他的參數設定，那麼您可以簡單地選擇此設定檔，並指定專用於IPTV的LAN連接埠。",
       children: [{                      
                           type: "name",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "指定LAN連接埠將傳輸哪種資料。例如：如果為LAN2選擇了IPTV，則只會傳輸IPTV的資料，並且您應該將機上盒連接到LAN2。"
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_5to8",
                           title: "橋接",
                           content: "如果您的ISP不在列表中並且IPTV不需要其他的參數設定，那麼您可以簡單地選擇此設定檔，並指定專用於IPTV的LAN連接埠。",
       children: [{                      
                           type: "name",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "指定LAN連接埠將傳輸哪種資料。例如：如果為LAN5選擇了IPTV，則只會傳輸IPTV的資料，並且您應該將機上盒連接到LAN5。"
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_1to4",
                           title: "自訂",
                           content: "如果您的ISP不在列表中，但是它提供您一些參數設定，例如：網際網路/VoIP/IPTV VLAN ID與優先級，請選擇此設定檔。",
       children: [{                      
                           type: "name",
                           title: "網際網路/VoIP/IPTV VLAN ID/Priority",
                           content: "請設定由ISP所提供的VLAN ID與優先級。"
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "選擇是否將網際網路封包進行802.11Q標記。"
                       } ,{                      
                           type: "name",
                           title: "IPTV 組播 VLAN ID/優先級",
                           content: "您可以依需求啟用IPTV群播功能，並根據ISP設定VLAN ID與優先級。"
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "指定LAN連接埠將會傳輸哪種類型的資料。例如：如果將LAN1選擇為IPTV，那麼它將只傳輸IPTV資料並且您必須將機上盒連接至LAN1。"
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_2to5",
                           title: "自訂",
                           content: "如果您的ISP不在列表中，但是它提供您一些參數設定，例如：網際網路/VoIP/IPTV VLAN ID與優先級，請選擇此設定檔。",
       children: [{                      
                           type: "name",
                           title: "網際網路/VoIP/IPTV VLAN ID/Priority",
                           content: "請設定由ISP所提供的VLAN ID與優先級。"
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "選擇是否將網際網路封包進行802.11Q標記。"
                       } ,{                      
                           type: "name",
                           title: "IPTV 組播 VLAN ID/優先級",
                           content: "您可以依需求啟用IPTV群播功能，並根據ISP設定VLAN ID與優先級。"
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "指定LAN連接埠將傳輸哪種資料。例如：如果為LAN2選擇了IPTV，則只會傳輸IPTV的資料，並且您應該將機上盒連接到LAN2。"
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_5to8",
                           title: "自訂",
                           content: "如果您的ISP不在列表中，但是它提供您一些參數設定，例如：網際網路/VoIP/IPTV VLAN ID與優先級，請選擇此設定檔。",
       children: [{                      
                           type: "name",
                           title: "網際網路/VoIP/IPTV VLAN ID/Priority",
                           content: "請設定由ISP所提供的VLAN ID與優先級。"
                       } ,{                      
                           type: "name",
                           title: "802.11Q Tag",
                           content: "選擇是否將網際網路封包進行802.11Q標記。"
                       } ,{                      
                           type: "name",
                           title: "IPTV 組播 VLAN ID/優先級",
                           content: "您可以依需求啟用IPTV群播功能，並根據ISP設定VLAN ID與優先級。"
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "指定LAN連接埠將傳輸哪種資料。例如：如果為LAN5選擇了IPTV，則只會傳輸IPTV的資料，並且您應該將機上盒連接到LAN5。"
                       }]
}]
}]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"DHCP 伺服器",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "「DHCP(Dynamic Host Configuration Protocol = 動態主機設定協定)伺服器」是路由器的預設功能，這項功能可以自動將正確的IP參數提供給區域網路內的電腦。",
                "一般而言，如果您沒有特別需求，您不需要特別設定這項功能的參數。另外，除非您內部網路已經有另一個主要的DHCP伺服器，或您想要手動設定所有內部網路的IP位址，否則請勿停用此功能。"]
} ,{                      
                           type: "name",
                           title: "IP 位址範圍",
                           content: "請輸入可以被使用者端租用的IP位址範圍。"
                       } ,{                      
                           type: "name",
                           title: "位址租用時間",
                           content: "請輸入持續時間（接於1-2880分鐘），這是租給用戶端的IP位址的時間。預設值為120。"
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"保留指定IP位址",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示IP保留設備的對應參數。"
                       } ,{                      
                           type: "step",
                           title: "保留指定IP位址設定步驟",
       content: [ 
                "1. 點選 增加。",
                "2. 點選掃描從DHCP用戶端列表選擇目前已連接的設備；或者輸入您想要的設備的MAC位址到MAC位址欄位並且把您想要保留給該用戶端的IP位址輸入至IP位址欄位。",
                "3. 請在描述欄位為用戶端輸入一個描述。",
                "4. 選擇 啟用。",
                "5. 點選儲存。"]
} ,{                      
                           type: "note",
                           title: "註",
                           content: "如果您要停用此項目，請點選燈泡圖示。"
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"DHCP 使用者列表",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示目前已連接設備的資訊。"
                       }]
},
       DDNS :{ 
               TITLE:"動態 DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "動態DNS（動態網域名稱系統）允許您指定一個固定的主機和網域名稱到浮動的網際網路IP位址。當您正在路由器後面經營自己的網站、FTP服務器或另一台服務器時，這是非常有用的。首先，你需要選擇DDNS服務供應商，並註冊一個帳號以取得服務，例如：www.dyndns.com。"
                       } ,{                      
                           type: "step",
                           title: "設定 動態DNS",
       content: [ 
                "1. 選擇動態DNS服務供應商。",
                "2. 輸入動態DNS帳號的使用者名稱與密碼。",
                "3. 輸入您在DDNS網站所申請的網域名稱。",
                "4. 請從下拉式列表選擇更新間隔。",
                "5. 如果您的服務供應商是NO-IP，WAN IP綁定可以確保網域名稱綁定到此路由器的WAN IP。",
                "6. 點選登入並儲存。"]
} ,{                      
                           type: "note",
                           title: "註",
                           content: "如果您想要使用新的DDNS帳號，請先登出，接著使用新帳號登入。"
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"動態 DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "動態DNS（動態網域名稱系統）允許您指定一個固定的主機和網域名稱到浮動的網際網路IP位址。當您正在路由器後面經營自己的網站、FTP服務器或另一台服務器時，這是非常有用的。首先，你需要選擇DDNS服務供應商，並註冊一個帳號以取得服務，例如：www.dyndns.com。"
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"網域名稱列表",
               CONTENT: [{
                           type: "paragraph",
                           content: "此表格顯示所有網域名稱(使用您的雲端帳號註冊)的資訊"
                       } ,{                      
                           type: "step",
                           title: "註冊新的網域名稱",
       content: [ 
                "1. 點選註冊。",
                "2. 請輸入您要註冊的網域名稱。",
                "3. 點選儲存。"]
}]
},
       ADVANCED_ROUTING_STATIC_ROUTING :{ 
               TITLE:"固定路由",
               CONTENT: [{
                           type: "paragraph",
                           content: "固定路由是一個事先決定的路徑，可以讓您的網路資訊封包到達指定的主機或網路，在此您可以新增或刪除固定路由的規則。請注意，在您沒有專業的網路設定知識前，請勿進行固定路由設定，因為這可能會導致您的網路連線發生問題。"
                       } ,{                      
                           type: "step",
                           title: "設定固定路由",
       content: [ 
                "1. 點選 增加。",
                "2. 請在目標網路欄位輸入IP位址，為此項目分配固定路由。",
                "3. 請在子網路遮罩欄位輸入子網路遮罩，以決定IP位址的網路部分與主機部分。",
                "4. 請在預設閘道欄位輸入閘道IP位址，以連接路由器到網路或主機。",
                "5. 請在介面欄位選擇LAN或WAN，以指定目標網路的類型。",
                "6. 請為此項目輸入一則簡短的描述。",
                "7. 選擇啟用。",
                "8. 點選儲存"]
} ,{                      
                           type: "note",
                           title: "註",
                           content: "如果您要停用此項目，請點選燈泡圖示。"
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"系統路由表",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示所有目前使用中的有效路由項目。"
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"無線網路設定",
               CONTENT: [{
                           type: "paragraph",
                           content: "請依您所需設定無線網路。"
                       }]
},
       OFDMA :{ 
               TITLE:"OFDMA",
               CONTENT: [{
                           type: "paragraph",
                           content: "OFDMA讓多個用戶能夠同時傳輸資料，並因此而大幅改善速度和效能。請注意只有當您的客戶端也支援OFDMA時，才能完整的享受到他的效益。"
                       }]
},
       WIRELESS_SMART_CONNECT :{ 
               TITLE:"智慧連線",
               CONTENT: [{
                           type: "paragraph",
                           content: "勾選這個核取方塊，即可啟用智慧連線。這項功能會根據實際條件，為裝置指派最佳的無線頻段以平衡網路需求，所以有助於裝置執行得更快。"
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"無線網路 2.4GHz",
               CONTENT: [{
                           type: "name",
                           title: "無線網路名稱 (SSID)",
                           content: "建議您變更網路名稱(SSID)。此欄位需注意英文大小寫之不同。"
                       } ,{                      
                           type: "name",
                           title: "隱藏 SSID",
                           content: "如果您想要從無線網路列表隱藏2.4GHz網路名稱(SSID)，請選擇此項目。一旦選擇，該SSID將不會被廣播並且您必須手動加入該網路。"
                       } ,{                      
                           type: "name",
                           title: "安全性",
                           content: "請選擇下列其中一個項目：",
       children: [{                      
                           type: "name",
                           title: "無安全性",
                           content: "選擇此選項可以停用無線安全性。我們不建議您選擇此項目。"
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-個人",
                           content: "選擇此選項可以啟用無線安全性。強烈建議您啟用以保護您的網路免除未授權的存取。如果選擇此項，請繼續設定接下來的項目。",
       children: [{                      
                           type: "name",
                           title: "版本",
                           content: "請選擇安全性版本。WPA2-PSK是最安全的。但如果您不確定該選擇什麼，請選擇自動。"
                       } ,{                      
                           type: "name",
                           title: "加密",
                           content: "請選擇安全性加密類型。AES是最安全的。如果您的路由器運作為802.11n模式，那麼我們不建議您使用TKIP加密。此外，使用TKIP將會停用WPS功能。如果您不確定該選擇什麼，請選擇自動。"
                       } ,{                      
                           type: "name",
                           title: "密碼",
                           content: "請輸入8-63位ASCII碼密碼，或者8-64位十六進位碼密碼。"
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-企業",
                           content: "目前最安全的企業級安全性設定，由於牽涉到上游RADIUS伺服器之架設，所以一般家庭不會採用此加密方式。如果選擇此方式，WPS功能將會被停用。",
       children: [{                      
                           type: "name",
                           title: "版本",
                           content: "請選擇安全性版本。WPA2是最安全的。但如果您不確定該選擇什麼，請選擇自動。"
                       } ,{                      
                           type: "name",
                           title: "加密",
                           content: "請選擇安全性加密類型。AES是最安全的。如果您的路由器運作為802.11n模式，那麼我們不建議您使用TKIP加密。此外，使用TKIP將會停用WPS功能。如果您不確定該選擇什麼，請選擇自動。"
                       } ,{                      
                           type: "name",
                           title: "RADIUS 伺服器 IP位址",
                           content: "請輸入Radius伺服器的IP位址。"
                       } ,{                      
                           type: "name",
                           title: "RADIUS 通訊埠",
                           content: "請輸入Radius伺服器的通訊埠號碼。"
                       } ,{                      
                           type: "name",
                           title: "RADIUS 連線密碼",
                           content: "請輸入Radius伺服器的連線密碼。"
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "如果有任何用戶端設備只能使用WEP（有線等效加密）訪問無線，請選擇此選項以啟用基本的驗證方法。 如果選擇此選項，則WPS功能將被停用。",
       children: [{                      
                           type: "name",
                           title: "類型",
                           content: "請為無線網路選擇驗證類型。如果您不確定該選擇什麼，請選擇自動。"
                       } ,{                      
                           type: "name",
                           title: "WEP金鑰格式",
                           content: "可以選擇使用 ASCII碼 格式或十六進位碼。使用「十六進位碼」時，僅可輸入（0-9，a-f，A-F）。使用「ASCII碼」時，則可輸入（0-9，a-z ，A-Z）。"
                       } ,{                      
                           type: "name",
                           title: "金鑰類型",
                           content: "請選擇WEP金鑰長度。",
       children: [{                      
                           type: "name",
                           title: "64-bit",
                           content: "您必須輸入「剛好10個16進位碼」的密碼或「剛好5個ASCII碼」的密碼。"
                       } ,{                      
                           type: "name",
                           title: "128-bit",
                           content: "您必須輸入「剛好26個16進位碼」的密碼或「剛好13個ASCII碼」的密碼。"
                       }]
} ,{                      
                           type: "name",
                           title: "金鑰值",
                           content: "請輸入WEP金鑰到對應欄位。"
                       }]
}]
} ,{                      
                           type: "name",
                           title: "頻道",
                           content: "您可以選擇您想要使用的2.4GHz無線頻道，但除非您有熟練的設定經驗，不然我們建議您保持預設值-自動。"
                       } ,{                      
                           type: "name",
                           title: "傳輸功率",
                           content: "一共有高、中、低三個項目可以選擇，建議維持預設值「高」。"
                       } ,{                      
                           type: "name",
                           id: "atf_2g4",
                           title: "通訊公平功能",
                           content: "勾選此核取方塊以啟用通訊公平(ATF)功能，這可以讓您去優化每個流量的吞吐量。ATF流量排程使用預先目的地通訊目標以平衡整個流量目的地的通訊用量"
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_2g4",
                           title: "多使用者MIMO功能",
                           content: "點選以啟用多使用者MIMO功能。"
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"無線網路 5GHz",
               CONTENT: [{
                           type: "name",
                           title: "無線網路名稱 (SSID)",
                           content: "建議您變更網路名稱(SSID)。此欄位需注意英文大小寫之不同。"
                       } ,{                      
                           type: "name",
                           title: "隱藏 SSID",
                           content: "如果您想要從無線網路列表隱藏5GHz網路名稱(SSID)，請選擇此項目。一旦選擇，該SSID將不會被廣播並且您必須手動加入該網路。"
                       } ,{                      
                           type: "name",
                           title: "安全性",
                           content: "請選擇下列其中一個項目：",
       children: [{                      
                           type: "name",
                           title: "無安全性",
                           content: "選擇此選項可以停用無線安全性。我們不建議您選擇此項目。"
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-個人",
                           content: "選擇此選項可以啟用無線安全性。強烈建議您啟用以保護您的網路免除未授權的存取。如果選擇此項，請繼續設定接下來的項目。",
       children: [{                      
                           type: "name",
                           title: "版本",
                           content: "請選擇安全性版本。WPA2-PSK是最安全的。但如果您不確定該選擇什麼，請選擇自動。"
                       } ,{                      
                           type: "name",
                           title: "加密",
                           content: "請選擇安全性加密類型。AES是最安全的。如果您的路由器運作為802.11n模式，那麼我們不建議您使用TKIP加密。此外，使用TKIP將會停用WPS功能。如果您不確定該選擇什麼，請選擇自動。"
                       } ,{                      
                           type: "name",
                           title: "密碼",
                           content: "請輸入8-63位ASCII碼密碼，或者8-64位十六進位碼密碼。"
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-企業",
                           content: "目前最安全的企業級安全性設定，由於牽涉到上游RADIUS伺服器之架設，所以一般家庭不會採用此加密方式。如果選擇此方式，WPS功能將會被停用。",
       children: [{                      
                           type: "name",
                           title: "版本",
                           content: "請選擇安全性版本。WPA2是最安全的。但如果您不確定該選擇什麼，請選擇自動。"
                       } ,{                      
                           type: "name",
                           title: "加密",
                           content: "請選擇安全性加密類型。AES是最安全的。如果您的路由器運作為802.11n模式，那麼我們不建議您使用TKIP加密。此外，使用TKIP將會停用WPS功能。如果您不確定該選擇什麼，請選擇自動。"
                       } ,{                      
                           type: "name",
                           title: "RADIUS 伺服器 IP位址",
                           content: "請輸入Radius伺服器的IP位址。"
                       } ,{                      
                           type: "name",
                           title: "RADIUS 通訊埠",
                           content: "請輸入Radius伺服器的通訊埠號碼。"
                       } ,{                      
                           type: "name",
                           title: "RADIUS 連線密碼",
                           content: "請輸入Radius伺服器的連線密碼。"
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "如果有任何用戶端設備只能使用WEP（有線等效加密）訪問無線，請選擇此選項以啟用基本的驗證方法。 如果選擇此選項，則WPS功能將被停用。",
       children: [{                      
                           type: "name",
                           title: "類型",
                           content: "請為無線網路選擇驗證類型。如果您不確定該選擇什麼，請選擇自動。"
                       } ,{                      
                           type: "name",
                           title: "WEP金鑰格式",
                           content: "可以選擇使用 ASCII碼 格式或十六進位碼。使用「十六進位碼」時，僅可輸入（0-9，a-f，A-F）。使用「ASCII碼」時，則可輸入（0-9，a-z ，A-Z）。"
                       } ,{                      
                           type: "name",
                           title: "金鑰類型",
                           content: "請選擇WEP金鑰長度。",
       children: [{                      
                           type: "name",
                           title: "64-bit",
                           content: "您必須輸入「剛好10個16進位碼」的密碼或「剛好5個ASCII碼」的密碼。"
                       } ,{                      
                           type: "name",
                           title: "128-bit",
                           content: "您必須輸入「剛好26個16進位碼」的密碼或「剛好13個ASCII碼」的密碼。"
                       }]
} ,{                      
                           type: "name",
                           title: "金鑰值",
                           content: "請輸入WEP金鑰到對應欄位。"
                       }]
}]
} ,{                      
                           type: "name",
                           title: "頻道",
                           content: "您可以選擇您想要使用的5GHz無線頻道，但除非您有熟練的設定經驗，不然我們建議您保持預設值-自動。"
                       } ,{                      
                           type: "name",
                           title: "傳輸功率",
                           content: "一共有高、中、低三個項目可以選擇，建議維持預設值「高」。"
                       } ,{                      
                           type: "name",
                           id: "atf_5g",
                           title: "通訊公平功能",
                           content: "勾選此核取方塊以啟用通訊公平(ATF)功能，這可以讓您去優化每個流量的吞吐量。ATF流量排程使用預先目的地通訊目標以平衡整個流量目的地的通訊用量"
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_5g",
                           title: "多使用者MIMO功能",
                           content: "點選以啟用多使用者MIMO功能。"
                       }]
},
       WPS :{ 
               TITLE:"WPS",
               CONTENT: [{
                           type: "paragraph",
                           content: "WPS (Wi-Fi保護設定)提供您一個簡單的方法去建立一個具安全性保護的Wi-Fi連線。"
                       } ,{                      
                           type: "name",
                           title: "按按鈕(建議)",
       content: [ 
                "此模式可以讓您輕鬆連接任何已啟用WPS的設備至無線網路。",
                "點選螢幕上的開始WPS按鈕。並在2分鐘內按下用戶端設備上的WPS按鈕。"]
} ,{                      
                           type: "name",
                           title: "路由器的PIN",
       content: [ 
                "預設的PIN碼可以在路由器的標貼上被找到。",
                "點選生成以取得新的PIN碼或點選預設值將目前的PIN碼還原至原廠預設的PIN碼。"]
} ,{                      
                           type: "name",
                           title: "輸入使用者端的 PIN",
       content: [ 
                "此模式允許您手動增加無線設備。",
                "輸入用戶端設備的PIN碼至該欄位然後點選連線。"]
}]
},
       WIRELESS_STATISTICS :{ 
               TITLE:"無線連線設備",
               CONTENT: [{
                           type: "name",
                           title: "使用者數量",
                           content: "顯示目前連線的無線設備數量。"
                       } ,{                      
                           type: "name",
                           title: "MAC 位址",
                           content: "顯示目前該連線使用者的MAC位址。"
                       } ,{                      
                           type: "name",
                           title: "連線類型",
                           content: "顯示目前該連線使用者所使用的頻段(2.4GHz 或 5GHz) 。"
                       } ,{                      
                           type: "name",
                           title: "安全性",
                           content: "顯示無線設備連線所採用的加密方式。"
                       } ,{                      
                           type: "name",
                           title: "已接收封包",
                           content: "顯示目前該連線使用者總計已接收的封包數量。"
                       } ,{                      
                           type: "name",
                           title: "已傳送封包",
                           content: "顯示目前該連線使用者總計已傳送的封包數量。"
                       } ,{                      
                           type: "paragraph",
                           content: "點選 重新整理 可以更新DHCP使用者列表。"
                       }]
},
       WIRELESS_SCHEDULE :{ 
               TITLE:"網路使用時間表",
               CONTENT: [{
                           type: "paragraph",
                           content: "透過無線排程，您可以在指定的期間停用無線訊號。例如：您可以關閉午夜12點至清晨7點的無線訊號。"
                       } ,{                      
                           type: "name",
                           title: "無線關閉時間",
                           content: "顯示無線訊號關閉的時間週期。",
       children: [{                      
                           type: "step",
                           title: "設定關閉無線時間",
       content: [ 
                "1. 點選 增加。",
                "2. 請設定您需要關閉無線訊號的時間週期。",
                "3. 選擇重複日期。您可以選擇「每天」或指定的某些日期。",
                "4. 點選儲存。"]
}]
}]
},
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"設定",
               CONTENT: [{
                           type: "paragraph",
                           content: "此功能可以讓您為訪客提供Wi-Fi連線，但不暴露主要網路。"
                       } ,{                      
                           type: "name",
                           title: "允許訪客互相存取",
                           content: "勾選此核取方塊，可以讓訪客網路上的無線設備彼此互相溝通，比如可以透過：網路芳鄰、Samba、Ping與FTP。"
                       } ,{                      
                           type: "name",
                           id: "access_local",
                           title: "允許訪客存取我的本地網路",
                           content: "勾選此核取方塊，可以讓訪客網路上的無線設備與連接到路由器LAN端或連接到主要網路的設備彼此溝通，比如可以透過：網路芳鄰、Samba、Ping與FTP。"
                       }]
},
       GUEST_NETWORK_WIRELESS :{ 
               TITLE:"無線網路 2.4GHz/5GHz",
               CONTENT: [{
                           type: "name",
                           title: "啟用訪客網路",
                           content: "勾選選此核取方塊，可以啟用訪客網路功能。"
                       } ,{                      
                           type: "name",
                           title: "無線網路名稱 (SSID)",
                           content: "請您設定32字以內的訪客無線網路名稱 (SSID) ，建議使用英文、數字。"
                       } ,{                      
                           type: "name",
                           title: "隱藏 SSID",
                           content: "如果您要隱藏訪客無線網路名稱 (SSID)，請勾選核取方塊。"
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "密碼更新間隔",
                           content: "請選擇訪客網路密碼的更新間隔。"
                       } ,{                      
                           type: "name",
                           title: "安全性",
                           content: "當您選擇 永不更新密碼時，請選擇以下的安全性項目。",
       children: [{                      
                           type: "name",
                           title: "無安全性",
                           content: "選擇此選項可以停用無線安全性。我們不建議您選擇此項目。"
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-個人",
                           content: "選擇此選項可以啟用無線安全性。強烈建議您啟用以保護訪客網路免除未授權的存取。如果選擇此項，請繼續設定接下來的項目。",
       children: [{                      
                           type: "name",
                           title: "版本",
                           content: "請選擇安全性版本。WPA2-PSK是最安全的。但如果您不確定該選擇什麼，請選擇自動。"
                       } ,{                      
                           type: "name",
                           title: "加密",
                           content: "請選擇安全性加密類型。AES是最安全的。如果您的路由器運作為802.11n模式，那麼我們不建議您使用TKIP加密。此外，使用TKIP將會停用WPS功能。如果您不確定該選擇什麼，請選擇自動。"
                       }]
} ,{                      
                           type: "name",
                           id: "portal-help-title",
                           title: "門戶",
                           content: "門戶驗證可以增進您的網路安全性，它會要求驗證來自於用戶端的存取您的無線網路的臨時需求。"
                       } ,{                      
                           type: "step",
                           id: "portal-help-content",
                           title: "若要設定門戶驗證：",
       content: [ 
                "1. 請在安全性部分，選擇門戶。",
                "2. 請在驗證部分，選擇簡易密碼或無驗證。",
                "A. 簡易密碼 - 請為驗證指定一個密碼（可輸入8-16個英文字、數字以及「_」）。",
                "B. 無驗證 - 用戶端可以存取該網路而無需驗證。",
                "3. 請選擇1小時、2小時、4小時、8小時或永遠，來幫驗證逾時（過期）指定時間長短。",
                "4. （選填）啟用重新導向並輸入所需的新的重新導向URL位址（網址）。然後新的驗證用戶端將會被重新導向至您所指定的URL。",
                "5. （選填）您也可以自訂驗證登入頁面。",
                "A. 門戶標題 - 最多只能輸入31個字元。",
                "B. 使用條款 - 最多只能輸入1023個字元。",
                "C. 標識圖片 - 上傳JPG或PNG圖片檔以自訂標識。（檔案必須小於100KB）",
                "D. 背景圖片 - 上傳JPG或PNG圖片檔以自訂背景。（檔案必須小於2MB）",
                "6. 點選儲存。"]
}]
} ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "密碼",
                           content: "設定密碼，長度為 8 至 63 個 ASCII 字元或 8 至 64 個十六進位字元 (0-9、a-f、A-F)。"
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "密碼",
                           content: "可以使用隨機生成的密碼，或者請輸入8-63位ASCII碼密碼，或者8-64位十六進位碼密碼(0-9, a-f, A-F)。"
                       }]
},
       NAT :{ 
               TITLE:"ALG",
               CONTENT: [{
                           type: "paragraph",
                           content: "ALG(應用層閘道)允許為某些應用層「控制/資料」協定（如：FTP、TFTP、H323等）自訂網路位址轉譯（NAT）穿透過濾器，以被插入閘道以支援位址與通訊埠轉譯。建議啟用ALG。"
                       } ,{                      
                           type: "name",
                           title: "啟用 FTP ALG",
                           content: "如果要允許FTP使用者與伺服器的資料傳輸透過NAT溝通，請選擇。"
                       } ,{                      
                           type: "name",
                           title: "啟用 TFTP ALG",
                           content: "如果要允許TFTP使用者與伺服器的資料傳輸透過NAT溝通，請選擇。"
                       } ,{                      
                           type: "name",
                           title: "啟用 H323 ALG",
                           content: "如果要允許視訊會議或語音傳輸（H323）使用者透過NAT溝通，請選擇。"
                       } ,{                      
                           type: "name",
                           title: "啟用 RTSP ALG",
                           content: "如果要允許多媒體撥放器與串流媒體伺服器透過NAT溝通，請選擇。"
                       } ,{                      
                           type: "name",
                           title: "啟用 SIP ALG",
                           content: "如果選擇，它允許用戶端透過NAT與SIP(會話發起協定)伺服器溝通。"
                       } ,{                      
                           type: "name",
                           title: "啟用PPTP穿透",
                           content: "如果要允許內部電腦與外界建立Point-to-Point Tunneling Protocol （PPTP）方式的VPN連線，請選擇。"
                       } ,{                      
                           type: "name",
                           title: "啟用L2TP穿透",
                           content: "如果要允許內部電腦與外界建立Layer 2 Point-to-Point Tunneling Protocol （L2TP）方式的VPN連線，請選擇。"
                       } ,{                      
                           type: "name",
                           title: "啟用IPSec穿透",
                           content: "如果選擇，它將允許透過IP網路打開網際網路協定安全性（IPsec）通道並穿過路由器。IPSec使用加密的安全服務以確保在IP網路的隱私和安全通訊。"
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"虛擬伺服器",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "虛擬伺服器功能可以協助您開放LAN端伺服器的對外連線功能，設定開放的通訊埠，在您有架站或者其他伺服器使用時，本項設定可以協助您的伺服器與外界建立聯繫管道。",
                "當您在本地網路上架設伺服器並且想要在網際網路上分享它時，虛擬伺服器可以實現這個服務並將它提供給網際網路上的使用者。"]
} ,{                      
                           type: "paragraph",
                           content: "該表格顯示虛擬伺服器的相關參數。"
                       } ,{                      
                           type: "name",
                           title: "服務類型",
                           content: "顯示虛擬伺服器的名稱。"
                       } ,{                      
                           type: "name",
                           title: "外部通訊埠",
                           content: "顯示虛擬伺服器所使用的通訊埠號碼或號碼範圍。"
                       } ,{                      
                           type: "name",
                           title: "內部 IP",
                           content: "顯示伺服器主機電腦所在的IP位址。"
                       } ,{                      
                           type: "name",
                           title: "內部通訊埠",
                           content: "顯示伺服器主機電腦所使用的通訊埠號碼。"
                       } ,{                      
                           type: "name",
                           title: "通訊協定",
                           content: "顯示該服務所使用的通訊協定： TCP、UDP 或 全部 (路由器所支援的全部通訊協定)。"
                       } ,{                      
                           type: "name",
                           title: "狀態",
                           content: "顯示該虛擬伺服器規則目前的狀態(啟用 或 停用)。"
                       } ,{                      
                           type: "name",
                           title: "修改",
                           content: "顯示該條對應規則 修改 或 刪除 的項目。"
                       } ,{                      
                           type: "step",
                           title: "設定虛擬伺服器規則",
       content: [ 
                "1. 點選 增加。",
                "2. 點選 查看現有服務 可以根據我們所預設的常見虛擬伺服器應用項目，快速的建立虛擬伺服器參數，會自動填入對應的外部通訊埠與內部通訊埠，最後您只要填入伺服器主機電腦的IP位址即可。如果您需要的服務不在列表中，您也可以手動設定，外部通訊埠號碼可以輸入單一數值(21)或一段範圍(21-25)；內部通訊埠號碼如果與外部通訊埠號碼相同，可保留空白；IP位址請輸入伺服器主機的內部網路IP位址。",
                "3. 從下拉式選單中，選擇該服務所使用的通訊協定： TCP、UDP 或 全部。",
                "4. 選擇 啟用。",
                "5. 點選儲存。"]
} ,{                      
                           type: "note",
                           title: "註",
       content: [ 
                "1. 如果您要停用此項目，請點選燈泡圖示。",
                "2. 如果您不清楚該使用哪些連接埠或協定，建議您保持網際網路連接埠與協定的預設值。",
                "3. 如果本地主機設備不僅具備一種服務，您必須為每項服務建立規則。請注意，外部通訊埠「不可以」重複。"]
}]
},
       PORT_TRIGGERING :{ 
               TITLE:"通訊埠觸發",
               CONTENT: [{
                           type: "paragraph",
                           content: "某些特別的應用程式需要多重連線，當這些服務無法在路由器的標準NAT機制下運作時，可以使用通訊埠觸發功能。"
                       } ,{                      
                           type: "paragraph",
                           content: "該表格顯示通訊部觸發的相關參數。"
                       } ,{                      
                           type: "name",
                           title: "應用程式",
                           content: "顯示應用程式的名稱。"
                       } ,{                      
                           type: "name",
                           title: "觸發通訊埠",
                           content: "顯示觸發通訊埠之值或範圍，當對外連線使用到「觸發通訊埠」時，通訊埠觸發規則就會自動啟用。"
                       } ,{                      
                           type: "name",
                           title: "觸發通訊協定",
                           content: "顯示觸發通訊埠所用之通訊協定，可能是TCP、UDP或全部。"
                       } ,{                      
                           type: "name",
                           title: "外部通訊埠",
                           content: "顯示遠端系統可以使用的通訊埠之值或範圍，當觸發通訊埠規則啟動後，就會開啟這些外埠通訊埠並導向所設定IP位址之電腦。您可以輸入最多5個群組，群組間請以\",\"分隔，例如：2000-2038, 2046, 2050-2051, 2085, 3010-3030。"
                       } ,{                      
                           type: "name",
                           title: "外部通訊協定",
                           content: "顯示外部通訊埠所以用之通訊協定，可能是TCP、UDP或全部。"
                       } ,{                      
                           type: "name",
                           title: "狀態",
                           content: "顯示該虛擬伺服器規則目前的狀態(啟用 或 停用)。"
                       } ,{                      
                           type: "name",
                           title: "修改",
                           content: "顯示該條對應規則 修改 或 刪除 的項目。"
                       } ,{                      
                           type: "step",
                           title: "設定 觸發通訊埠 規則",
       content: [{                      
                           type: "note",
                           title: "註",
                           content: "每條規則同時間只能被一個主機使用。"
                       },
                "1. 點選 增加。",
                "2. 點選 查看現有應用程式，可以根據我們所預設的常見觸發通訊埠的應用項目，快速的建立觸發通訊埠參數值，會自動填入對應的觸發通訊埠與外部通訊埠及相關通訊協定，最後您只要填入使用該應用程式的電腦的IP位址即可。",
                "3. 選擇 啟用。",
                "4. 點選儲存。"]
} ,{                      
                           type: "note",
                           title: "註",
                           content: "如果您要停用此規則，請點選燈泡圖示。"
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "DMZ（非軍事區）主機功能允許本地主機為了專用的服務而暴露在網際網路上，例如：網際網路遊戲或視訊會議。基本上，DMZ就是允許區域網路上的一台電腦，打開它的所有通訊埠。這台電腦一般需設定為固定IP地址，並停用它的DHCP用戶端功能。"
                       } ,{                      
                           type: "paragraph",
                           content: "當啟用DMZ之後，DMZ主機將完全暴露在網際網路上，這可能會為電腦帶來某些潛在性安全危害。如果DMZ不在使用中，請即刻停用它。"
                       } ,{                      
                           type: "step",
                           title: "指定 電腦或伺服器 作為DMZ 主機",
       content: [ 
                "1. 點選 啟用 DMZ。",
                "2. 在 DMZ 主機 IP 位址欄位填入您想要指定為DMZ主機的內部電腦的IP位址。",
                "3. 點選儲存。"]
}]
},
       UPNP :{ 
               TITLE:"UPnP",
               CONTENT: [{
                           type: "paragraph",
                           content: "預設情況下，萬用隨插即用 (UPnP)功能是啟用的，這允許設備（如：電腦與網際網路設備 ）在本地網路上彼此自動發現與通訊。"
                       } ,{                      
                           type: "paragraph",
                           content: "如果您想要使用多人遊戲、點對點連線、即時通訊(例如：網路電話VoIP或視訊會議)或遠端協助等，您可能需要啟用UPnP。"
                       } ,{                      
                           type: "name",
                           title: "UPnP 服務列表",
                           content: "該UPnP服務列表顯示本地主機的UPnP資訊。"
                       }]
},
       MODEM :{ 
               TITLE:"3G/4G 說明",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB 數據機",
                           content: "顯示 3G/4G 數據機的狀態。"
                       } ,{                      
                           type: "name",
                           title: "使用自動辨識ISP參數",
                           content: "此功能預設為啟用。如果啟用，路由器可以從SIM/UIN卡辨識ISP並自動填寫參數。如果辨識失敗，請手動選擇地區與行動ISP。"
                       } ,{                      
                           type: "name",
                           title: "地區",
                           content: "當USB數據機與SIM卡成功辨識後，會自動選擇與顯示地區。如果沒有，請從下拉式表單中選擇該地區。"
                       } ,{                      
                           type: "name",
                           title: "電信業者",
                           content: "顯示 3G/4G 網路的 ISP (網際網路服務供應商)。如果沒有自動偵測，請從下拉式功能表選取 ISP。預設撥接號碼和 APN 會隨之自動填入。"
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "如果SIM/UIM保護是啟用的，請輸入PIN碼。SIM/UIM保護預設是停用的。請注意，如果您輸入無效的PIN碼3次，SIM/UIM卡將會被自動封鎖。接下來您只能從電腦或筆電輸入PUK碼來解鎖它。"
                       } ,{                      
                           type: "name",
                           title: "訊息",
                           content: "如果PIN碼保護啟用的話，會顯示SIM/UIM卡的PIN碼資訊"
                       } ,{                      
                           type: "name",
                           title: "設定撥號號碼、APN或使用者名稱密碼",
                           content: "如果該ISP不在<strong>行動ISP</strong>的列表中，請勾選此核取方塊並輸入由ISP所提供的撥號號碼、APN(存取點名稱)、使用者名稱與密碼。"
                       } ,{                      
                           type: "name",
                           title: "撥號號碼",
                           content: "輸入由ISP所提供的撥號號碼。"
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "輸入由ISP所提供的APN(存取點名稱)。"
                       } ,{                      
                           type: "name",
                           title: "使用者名稱/密碼",
                           content: "輸入由ISP所提供的使用者名稱與密碼。這些欄位需注意英文大小寫之不同。"
                       } ,{                      
                           type: "name",
                           title: "依需求連線",
                           content: "在此模式，您可以設定路由器超過「最長閒置時間」後，仍沒有任何網路連線活動時，將自動終止連線，直到有新的網路連線需求時，再自動重新連線。"
                       } ,{                      
                           type: "note",
                           title: "註",
                           content: "雖然您有指定「最大閒置時間」，但有時會因為有些應用程式在後端保持存取網路網路而無法中斷連線。"
                       } ,{                      
                           type: "name",
                           title: "自動連線",
                           content: "啟用這個模式時，網際網路連線會在中斷後自動重新連線。"
                       } ,{                      
                           type: "name",
                           title: "手動連線",
                           content: "啟用這個模式時，您可以按一下「連線」或「斷線」按鈕來手動控制網際網路連線。這個模式也支援「最大閒置時間」功能。在「最大閒置時間」欄位中，輸入在閒置達到多長的時間 (分鐘) 後即中斷網路。預設值為 15 分鐘。如果您希望隨時保持連線，請輸入 0 (零)。"
                       } ,{                      
                           type: "note",
                           title: "註",
                           content: "雖然您有指定「最大閒置時間」，但有時會因為有些應用程式在後端保持存取網路網路而無法中斷連線。"
                       } ,{                      
                           type: "paragraph",
                           content: "點選儲存按鈕以儲存這些設定。"
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"3G/4G 進階設定說明",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB 數據機",
                           content: "顯示 3G/4G 數據機的狀態。"
                       } ,{                      
                           type: "name",
                           title: "使用自動辨識ISP參數",
                           content: "此功能預設為啟用。如果啟用，路由器可以從SIM/UIN卡辨識ISP並自動填寫參數。如果辨識失敗，請手動選擇地區與行動ISP。"
                       } ,{                      
                           type: "name",
                           title: "地區",
                           content: "當USB數據機與SIM卡成功辨識後，會自動選擇與顯示地區。如果沒有，請從下拉式表單中選擇該地區。"
                       } ,{                      
                           type: "name",
                           title: "電信業者",
                           content: "顯示 3G/4G 網路的 ISP (網際網路服務供應商)。如果沒有自動偵測，請從下拉式功能表選取 ISP。預設撥接號碼和 APN 會隨之自動填入。"
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "如果SIM/UIM保護是啟用的，請輸入PIN碼。SIM/UIM保護預設是停用的。請注意，如果您輸入無效的PIN碼3次，SIM/UIM卡將會被自動封鎖。接下來您只能從電腦或筆電輸入PUK碼來解鎖它。"
                       } ,{                      
                           type: "name",
                           title: "訊息",
                           content: "如果PIN碼保護啟用的話，會顯示SIM/UIM卡的PIN碼資訊"
                       } ,{                      
                           type: "name",
                           title: "設定撥號號碼、APN或使用者名稱密碼",
                           content: "如果該ISP不在<strong>行動ISP</strong>的列表中，請勾選此核取方塊並輸入由ISP所提供的撥號號碼、APN(存取點名稱)、使用者名稱與密碼。"
                       } ,{                      
                           type: "name",
                           title: "撥號號碼",
                           content: "輸入由ISP所提供的撥號號碼。"
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "輸入由ISP所提供的APN(存取點名稱)。"
                       } ,{                      
                           type: "name",
                           title: "使用者名稱/密碼",
                           content: "輸入由ISP所提供的使用者名稱與密碼。這些欄位需注意英文大小寫之不同。"
                       } ,{                      
                           type: "name",
                           title: "依需求連線",
                           content: "在此模式，您可以設定路由器超過「最長閒置時間」後，仍沒有任何網路連線活動時，將自動終止連線，直到有新的網路連線需求時，再自動重新連線。"
                       } ,{                      
                           type: "note",
                           title: "註",
                           content: "雖然您有指定「最大閒置時間」，但有時會因為有些應用程式在後端保持存取網路網路而無法中斷連線。"
                       } ,{                      
                           type: "name",
                           title: "自動連線",
                           content: "啟用這個模式時，網際網路連線會在中斷後自動重新連線。"
                       } ,{                      
                           type: "name",
                           title: "手動連線",
                           content: "啟用這個模式時，您可以按一下「連線」或「斷線」按鈕來手動控制網際網路連線。這個模式也支援「最大閒置時間」功能。在「最大閒置時間」欄位中，輸入在閒置達到多長的時間 (分鐘) 後即中斷網路。預設值為 15 分鐘。如果您希望隨時保持連線，請輸入 0 (零)。"
                       } ,{                      
                           type: "note",
                           title: "註",
                           content: "雖然您有指定「最大閒置時間」，但有時會因為有些應用程式在後端保持存取網路網路而無法中斷連線。"
                       } ,{                      
                           type: "name",
                           title: "驗證類型",
                           content: "請選擇一個驗證類型。預設值為自動。某些ISP要求特定的驗證類型，請與ISP確認這一點或保持預設設定。"
                       } ,{                      
                           type: "name",
                           title: "自動",
                           content: "如果自動(預設)，路由器會自動偵測ISP所使用的驗證類型。"
                       } ,{                      
                           type: "name",
                           title: "PAP",
                           content: "如果使用 PAP (密碼驗證通訊協定)，路由器會使用兩個交握訊號與對等端進行驗證。如果 ISP 要求使用這個驗證類型，請選取這個選項。"
                       } ,{                      
                           type: "name",
                           title: "CHAP",
                           content: "如果使用 CHAP (查問交握式驗證通訊協定)，路由器將使用三個交握訊號向對等端進行驗證，並定期確認對等端的身分。如果 ISP 要求使用這個驗證類型，請選取這個選項。"
                       } ,{                      
                           type: "name",
                           title: "MTU 大小",
                           content: "預設的MTU(最大傳輸單元)大小為1480位元組。除非ISP要求，否則請勿變更。"
                       } ,{                      
                           type: "name",
                           title: "使用下列的DNS位址",
                           content: "如果ISP提供DNS伺服器IP位址，請勾選此核取方塊並在下方輸入<strong>主要DNS</strong>與次要DNS(選填)IP位址。否則，DNS伺服器將會由ISP自動分配。"
                       } ,{                      
                           type: "name",
                           title: "主要 DNS",
                           content: "請輸入由ISP提供的DNS IP位址。（IP位址格式為x.x.x.x，x為數字並且在0-255之間。）"
                       } ,{                      
                           type: "name",
                           title: "次要 DNS",
                           content: "(選填)請輸入由ISP提供的DNS IP位址。（IP位址格式為x.x.x.x，x為數字並且在0-255之間。）"
                       } ,{                      
                           type: "paragraph",
                           content: "點選<strong>儲存</strong>按鈕以儲存這些設定。"
                       }]
},
       DISK_SETTING :{ 
               TITLE:"設備設定",
               CONTENT: [{
                           type: "paragraph",
                           content: "設備設定介面會顯示所有已連接到路由器USB埠的USB儲存設備的相關資訊。"
                       } ,{                      
                           type: "name",
                           title: "掃描",
                           content: "一般來說，路由器會自動掃描任何新接入的USB設備，如果沒有自動掃描或您想要重新整理USB資訊，您也可以手動點選此按鈕。"
                       } ,{                      
                           type: "name",
                           title: "磁碟區",
                           content: "顯示USB磁碟區的名稱。"
                       } ,{                      
                           type: "name",
                           title: "容量",
                           content: "顯示USB設備的總計容量。"
                       } ,{                      
                           type: "name",
                           title: "剩餘空間",
                           content: "顯示USB設備目前可用的剩餘空間。"
                       } ,{                      
                           type: "name",
                           title: "安全移除",
                           content: "在您拔除USB磁碟前，先進行安全移除，才不會對您的USB磁碟造成損壞。"
                       } ,{                      
                           type: "paragraph",
                           content: "移除按鈕只有在USB存儲設備連接到路由器時出現。當目前的磁碟區忙碌時，你可能無法卸載它。"
                       } ,{                      
                           type: "name",
                           title: "狀態",
                           content: "燈泡圖示預設為啟用，點選一下後會出現紅色禁止圖示，代表不共用此USB磁碟。"
                       } ,{                      
                           type: "step",
                           title: "設定 檔案伺服器",
       content: [ 
                "1. 將USB儲存設備連接至路由器的USB埠。",
                "2. 在設備設定區塊中，新接入的USB設備將會被自動偵測並顯示資訊。如果沒有反應，請點選掃描。",
                "3. 燈泡圖示預設為啟用檔案共用，如果您不想共用此設備，可以點選燈泡圖示，出現紅色禁止圖示後就會停止共用該設備。"]
}]
},
       FOLDER_SHARE_ACCOUNT :{ 
               TITLE:"共用帳號",
               CONTENT: [{
                           type: "name",
                           title: "帳號",
                           content: "您可以選擇使用預設帳號，以登入共用檔案與資料夾或使用新帳號並輸入以下資訊，建立一個新的使用者帳號。"
                       } ,{                      
                           type: "name",
                           title: "使用者名稱/密碼",
                           content: "輸入 1 至 15 個英數字元或底線的使用者名稱，以及 1 至 15 個 ASCII 字元的密碼。這些欄位的輸入均區分大小寫。"
                       } ,{                      
                           type: "name",
                           title: "確認密碼",
                           content: "請重新輸入一次相同密碼，以確保您的密碼輸入正確，請注意英文部分的大小寫不同。"
                       } ,{                      
                           type: "paragraph",
                           content: "點選儲存按鈕以儲存所有這些設定。"
                       }]
},
       FOLDER_SHARE_SETTINGS :{ 
               TITLE:"共用設定",
               CONTENT: [{
                           type: "name",
                           title: "網路/媒體 伺服器名稱",
                           content: "顯示用以存取已連接的USB儲存設備的名稱。"
                       } ,{                      
                           type: "name",
                           title: "啟用",
                           content: "選擇啟用的存取方式。"
                       } ,{                      
                           type: "name",
                           title: "存取方式",
                           content: "在此提供三種USB儲存設備的存取方式，只要勾選對應的核取方塊即可開啟該存取方式，可以複數開啟。",
       children: [{                      
                           type: "name",
                           title: "網路芳鄰",
                           content: "如果啟用，網路上的使用者可以使用指定的IP位址(例如：\\\\192.168.0.1)存取USB儲存設備。"
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "如果啟用，在本地網路上的FTP用戶端可以使用指定的IP位址與FTP伺服器的通訊部號碼(例如：ftp://192.168.0.1:21)存取USB儲存設備。"
                       } ,{                      
                           type: "name",
                           title: "FTP(透過網際網路)",
                           content: "如果啟用，FTP將會對所有的網際網路使用者開放，所以即便使用者不在內部網路，也可以透過路由器所取得的實體IP位址進行FTP連線。如果要變更FTP通訊埠請輸入通訊埠號碼並點選儲存。"
                       }]
} ,{                      
                           type: "name",
                           title: "連接",
                           content: "顯示該USB儲存設備用以存取的位址。"
                       } ,{                      
                           type: "name",
                           title: "通訊埠",
                           content: "顯示 FTP 伺服器的連接埠號碼。使用預設值 21 或輸入 1024 至 65535 之間的值。"
                       } ,{                      
                           type: "paragraph",
                           content: "點選儲存按鈕以儲存所有這些設定。"
                       }]
},
       FOLDER_SHARE_FOLDERS :{ 
               TITLE:"資料夾共用",
               CONTENT: [{
                           type: "name",
                           title: "全部共用",
                           content: "切換至「開」，以共用所有的檔案和資料夾或保持關閉讓您只共用指定的資料夾。"
                       } ,{                      
                           type: "name",
                           title: "啟用驗證",
                           content: "強烈建議啟用驗證，以要求使用者必須輸入正確的使用者名稱與密碼才可存取共用資料夾。"
                       } ,{                      
                           type: "name",
                           title: "資料夾名稱",
                           content: "顯示共用資料夾的名稱。"
                       } ,{                      
                           type: "name",
                           title: "資料夾路徑",
                           content: "顯示共用資料夾的路徑。"
                       } ,{                      
                           type: "name",
                           title: "媒體共用",
                           content: "顯示共用資料夾是否允許媒體共用。"
                       } ,{                      
                           type: "name",
                           title: "磁碟區名稱",
                           content: "顯示共用磁碟區的名稱。"
                       } ,{                      
                           type: "name",
                           title: "狀態",
                           content: "以亮燈顯示共用資料夾的狀態。"
                       } ,{                      
                           type: "name",
                           title: "修改",
                           content: "顯示該對應共用資料夾 修改 或 刪除 的項目。"
                       } ,{                      
                           type: "name",
                           title: "瀏覽",
                           content: "按此搜索共用資料夾。"
                       } ,{                      
                           type: "name",
                           title: "允許訪客網路存取",
                           content: "勾選後將會允許訪客網路存取共用資料夾。"
                       } ,{                      
                           type: "name",
                           title: "啟用驗證",
                           content: "勾選後將會要求使用者必須輸入正確的使用者名稱與密碼才可存取共用資料夾。"
                       } ,{                      
                           type: "name",
                           title: "啟用寫入存取",
                           content: "勾選後將會允許使用者變更資料夾內容。"
                       } ,{                      
                           type: "name",
                           title: "啟用媒體共用",
                           content: "勾選後將會啟用媒體共用。"
                       } ,{                      
                           type: "name",
                           title: "重新整理",
                           content: "點選以重新整理共用資料夾列表。"
                       }]
},
       PRINT_SERVER :{ 
               TITLE:"列印伺服器",
               CONTENT: [{
                           type: "name",
                           title: "列印伺服器",
                           content: "切換至「開」，以啟用列印伺服器功能。"
                       } ,{                      
                           type: "name",
                           title: "印表機名稱",
                           content: "顯示已連接至路由器的印表機名稱。"
                       }]
},
       TIME_MACHINE :{ 
               TITLE:"時光機",
               CONTENT: [{
                           type: "paragraph",
                           content: "時光機可以將您在MAC電腦上的所有檔案，備份到連接在您數據機路由器上的USB儲存設備。"
                       } ,{                      
                           type: "name",
                           title: "啟用",
                           content: "若勾選此核取方塊，則可以啟用時光機功能。"
                       } ,{                      
                           type: "name",
                           title: "備份磁碟",
                           content: "請為時光機備份選擇一個位置。"
                       } ,{                      
                           type: "name",
                           title: "備份的大小限制",
                           content: "請設定您需要讓「時光機備份」使用多少磁碟空間。0代表不限制備份所使用的空間。"
                       } ,{                      
                           type: "name",
                           title: "儲存",
                           content: "點選以儲存您的設定。"
                       }]
},
       OFFLINE_DOWNLOAD :{ 
               TITLE:"離線下載",
               CONTENT: [{
                           type: "paragraph",
                           content: "當離線下載啟用，路由器可以下載檔案並且不用隨時保持電腦開機狀態。"
                       } ,{                      
                           type: "name",
                           title: "狀態",
                           content: "切換至「開」，以啟用離線下載功能。"
                       } ,{                      
                           type: "name",
                           title: "資料夾路徑",
                           content: "選擇資料夾路徑以存放或快取該下載。",
       children: [{                      
                           type: "note",
                           title: "註",
                           content: "當上傳或下載檔案時，請勿變更資料夾路徑或卸載USB儲存設；否則可能發生某些致命的錯誤。"
                       }]
} ,{                      
                           type: "name",
                           title: "排程",
                           content: "勾選此核取方塊以啟用排程功能，這可以讓您指定下載/上傳檔案的時間區段。"
                       } ,{                      
                           type: "name",
                           title: "在任務完成後保持上傳",
                           content: "勾選此核取方塊以在任務完成後保持上傳資料給其他設備。"
                       } ,{                      
                           type: "name",
                           title: "主動下載的最大數量",
                           content: "請輸入介於1-10的數字，以設定主動下載的最大數量。預設值是5。"
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"下載",
               CONTENT: [{
                           type: "note",
                           title: "檔案",
                           content: "顯示下載檔案的名稱與類型。"
                       } ,{                      
                           type: "note",
                           title: "速度",
                           content: "顯示目前的下載(或上傳)速度。"
                       } ,{                      
                           type: "note",
                           title: "已完成",
                           content: "顯示下載的進度。"
                       } ,{                      
                           type: "note",
                           title: "剩餘時間",
                           content: "顯示下載的剩餘時間。"
                       } ,{                      
                           type: "note",
                           title: "已連線的端點",
                           content: "顯示下載的已連線的端點。"
                       } ,{                      
                           type: "note",
                           title: "狀態",
                           content: "顯示下載的目前狀態(下載、等待、播種、暫停、完成或錯誤)。"
                       } ,{                      
                           type: "name",
                           title: "增加新的下載",
       children: [{                      
                           type: "step",
       content: [ 
                "1. 點選 增加。",
                "2. 選擇下載來源，來自於電腦的torrent、來自於USB的torrent或URL。",
                "3. 請為BT選擇torrent位置或為FTP、HTTP與aMule輸入URL。",
                "4. 點選儲存。",
                "5. 對aMule來說，請在「進階 > aMule伺服器」中指定aMule伺服器IP位址與通訊埠。"]
}]
} ,{                      
                           type: "name",
                           title: "刪除下載",
                           content: "勾選您想刪除的對應下載的核取方塊，然後點選表格上方的刪除。"
                       } ,{                      
                           type: "name",
                           title: "暫停下載",
                           content: "點選您想暫停的對應下載的核取方塊，然後點選表格上方的暫停。"
                       } ,{                      
                           type: "name",
                           title: "恢復下載",
                           content: "點選您想恢復的對應下載的核取方塊，然後點選表格上方的恢復。"
                       }]
},
       OFFLINE_DOWNLOAD_ADVANCED :{ 
               TITLE:"進階設定",
               CONTENT: [{
                           type: "name",
                           title: "速度限制",
                           content: "請為網際網路連線指定最大下載與上傳速度。"
                       } ,{                      
                           type: "name",
                           title: "最大下載速度",
                           content: "請輸入介於 1-100000 kB/s的數字，以設定最大下載速度。預設值是1024。"
                       } ,{                      
                           type: "name",
                           title: "最大上傳速度",
                           content: "請輸入介於 1-100000 kB/s的數字，以設定最大上傳速度。預設值是512。"
                       } ,{                      
                           type: "name",
                           title: "連線的數量",
                           content: "指定最大連線的數量。"
                       } ,{                      
                           type: "name",
                           title: "全球最大連線數量",
                           content: "請輸入介於 1-200的數字，以設定全球最大連線數量。預設值是100。"
                       } ,{                      
                           type: "name",
                           title: "每個Torrent的最大已連接端點的數量",
                           content: "請輸入介於 1-100的數字，以設定每個Torrent的最大已連接端點的數量。預設值是50。"
                       } ,{                      
                           type: "name",
                           title: "啟用DHT網路",
                           content: "啟用此功能以改善尋找端點的效率，如此您就可以增加下載速度。"
                       } ,{                      
                           type: "name",
                           title: "啟用端點交換",
                           content: "啟用此功能以改善端點的群組的溝通效率，如此您就可以增加下載速度。"
                       } ,{                      
                           type: "name",
                           title: "啟用BitTorrent協定加密",
                           content: "啟用此功能，可以在數據傳輸的過程中加強隱私和機密性。"
                       } ,{                      
                           type: "name",
                           title: "aMule伺服器",
                           content: "請輸入aMule伺服器的IP位址與通訊埠。只有當路由器連線至伺服器時，才會運行aMule下載工作。"
                       }]
},
       PARENTAL_CONTROL :{ 
               TITLE:"家長監護",
               CONTENT: [{
                           type: "paragraph",
                           content: "透過家長監護，您可以阻止不適當的、不明確的和惡意的網意的網站；或可在一天中的某個時間（例如：在做作業的時候，限制存取Facebook或YouTube等網站）。"
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"家長監護下之設備",
               CONTENT: [{
                           type: "paragraph",
                           content: "此表格顯示目前被家長監護限制的設備的資訊與設定。"
                       } ,{                      
                           type: "step",
                           title: "新增管制設備",
       content: [ 
                "1. 切換至「開」，以啟用家長監護。",
                "2. 點選增加。",
                "3. 點選掃描從存取設備列表中選擇目前已連線的設備；否則請手動輸入設備名稱與MAC位址以增加未連線的設備。",
                "4. 點選生效時間圖示以指定限制應用的時間週期。",
                "5. 請輸入簡短的描述到描述欄位。此欄位為選填。",
                "6. 選擇啟用此項目。",
                "7. 點選 儲存。"]
} ,{                      
                           type: "note",
                           title: "註",
                           content: "如果您要停用此項目，請點選燈泡圖示。"
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"內容限制",
               CONTENT: [{
                           type: "paragraph",
                           content: "內容限制讓您可以使用關鍵字或網域名稱限制存取特定網站。透過家長監護，這些用戶端設備端設備會被控制，並限制哪些網站可以或不能連線，而這則取決於您設定的限制規範。"
                       } ,{                      
                           type: "step",
                           title: "指定內容以存取",
       content: [ 
                "1. 切換至「開」，以啟用內容限制。",
                "2. 根據需求選擇限制政策：",
                "A. 如果您想要被控制的設備除了少數網站以外，可以存取所有的網站，請選擇黑名單。",
                "B. 如果您想要被控制的設備只能存取少數網站，請選擇白名單。",
                "3. 點選新增一個新個關鍵字以增加網頁位址關鍵字(例如：wikipedia)或網域名稱到白名單或黑名單。",
                "4. 點選儲存。"]
}]
},
       PARENTAL_CONTROL_V2 :{ 
               TITLE:"家長監護",
               CONTENT: [{
                           type: "paragraph",
                           content: "透過使用者設定檔、內容過濾器以及連線限制，家長監護可以為每個家庭成員提供個人化且適當的上網權限。"
                       } ,{                      
                           type: "step",
                           title: "若要套用家長監護到新設備",
       content: [ 
                "1. 點選 增加。",
                "2. 請為設定檔輸入名稱，接著點選「+」以增加在此設定檔下的設備。",
                "3. 根據您的需求自訂封鎖的內容。所有包含指定關鍵字的網站都將被封鎖。",
                "4.如果要限制此設定檔花費在連線的總時間，請啟用並指定時間限制。 您還可以使用「就寢時間」設定此設定檔下的設備無法使用網際網路的時間段。",
                "5. 點選儲存。"]
} ,{                      
                           type: "step",
                           title: "若要查看設定檔的詳細網際網路歷史",
       content: [ 
                "1. 在洞悉欄中，點選對應的洞悉按鈕。",
                "2. 如果您想要看到更多記錄，請點選歷史 <span class=\"ptl-ctr-help-icon history\"></span> 按鈕。",
                "3. 透過點選 <span class=\"ptl-ctr-help-icon block\"></span> 或 <span class=\"ptl-ctr-help-icon unblock\"></span> 按鈕，您可以封鎖或解鎖網站。"]
} ,{                      
                           type: "step",
                           title: "若要立即停用或啟用網際網路存取",
       content: [ 
                "在網際網路存取欄中，點選 <span class=\"ptl-ctr-help-icon stop\"></span> 可以停止對應設定檔的的設備連線至網際網路，而點選 <span class=\"ptl-ctr-help-icon enable\"></span> 則可以再次啟用連線。"]
}]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS(服務的品質)可以依需求幫助優化網際網路流量。您可以在QoS規則列表中為設備、實體連接埠或應用指定優先層級。"
                       } ,{                      
                           type: "note",
                           id: "qos-boost",
                           title: "註",
                           content: "如果啟用 NAT 加速功能，則應該將 QoS 停用。"
                       } ,{                      
                           type: "name",
                           title: "上傳頻寬",
                           content: "請輸入ISP提供的最大上傳頻寬。"
                       } ,{                      
                           type: "name",
                           title: "下載頻寬",
                           content: "請輸入ISP提供的最大下載頻寬。"
                       }]
},
       QOS_ADV :{ 
               TITLE:"進階設定",
               CONTENT: [{
                           type: "name",
                           title: "高/中/低優先級",
                           content: "請為高/中/低優先級流量指定百分比。",
       children: [{                      
                           type: "note",
                           title: "註",
                           content: "全部加總的優先級百分比最大只能是100%，不可超過。"
                       }]
}]
},
       QOS_RULE :{ 
               TITLE:"QoS規則列表",
               CONTENT: [{
                           type: "paragraph",
                           content: "在此您可以增加詳細的QoS規則以優化網際網路流量。"
                       } ,{                      
                           type: "step",
                           title: "設定QoS規則",
       content: [ 
                "1. 點選 增加。",
                "2. 選擇優先級類型以增加QoS規則。",
                "依設備 - 請點選掃描以選擇需要的設備或手動輸入設備名稱與它的MAC位址。",
                "依應用程式 - 請選擇需要的應用或透過設定名稱、協定與目的地通訊埠(1-65535)自訂應用。您可以輸入單一通訊埠、多個通訊埠或通訊埠範圍，並以英文逗號分隔(例如：21,36-105,111)。",
                "依實體連接埠 - 請選擇您想要的連接埠。",
                "3. 點選儲存。"]
} ,{                      
                           type: "note",
                           title: "註",
                           content: "您可以拖動不同的優先級列表中的規則，以改變其優先級。"
                       }]
},
       QOS_DATABASE :{ 
               TITLE:"資料庫升級",
               CONTENT: [{
                           type: "paragraph",
                           content: "我們將會在www.tp-link.com釋出最新資料庫版本。您可以下載並更新路由器的資料庫以擴展它支援的應用。"
                       } ,{                      
                           type: "name",
                           title: "新資料庫檔案",
                           content: "點選瀏覽尋找最新的資料庫檔案。選擇它然後點選升級，以升級資料庫到最新版本。"
                       }]
},
       QOS_V2 :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (服務品質)讓您可以針對指定的設備優化網際網路流量，以保證您所需的設備能擁有更快的連線速度。"
                       }]
},
       QOS_GLOBAL_SETTINGS :{ 
               TITLE:"全局設定",
               CONTENT: [{
                           type: "paragraph",
                           content: "上傳頻寬 - 請輸入您的ISP所提供的最大上傳頻寬。"
                       } ,{                      
                           type: "paragraph",
                           content: "下載頻寬 - 請輸入您的ISP所提供的最大下載頻寬。"
                       }]
},
       QOS_DEVICE_PRIORITY :{ 
               TITLE:"設備優先級",
               CONTENT: [{
                           type: "paragraph",
                           content: "選擇您要的設備以優先化它們並決定要優先化多長時間。"
                       } ,{                      
                           type: "step",
                           title: "若要優先化設備",
       content: [ 
                "1. 在列表中找到您要優先化的設備，並開啟優先級開關。",
                "2. 在時間欄中選擇該設備將會被優先化多長時間。"]
}]
},
       SECURITY_FIREWALL :{ 
               TITLE:"防火牆",
               CONTENT: [{
                           type: "name",
                           title: "SPI 防火牆",
                           content: "SPI(狀態封包檢測)防火牆可以防止網路攻擊，並根據協定驗證通過路由器的流量。 預設情況下，此功能為啟用。"
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"DoS 防護",
               CONTENT: [{
                           type: "name",
                           title: "DoS 防護",
                           content: "DoS（拒絕服務）防護能保護您的區域網路對抗DoS攻擊，以避免伺服器請求淹沒您的網路。您可以根據需求過濾以下三種攻擊。每種過濾有四個層級：",
       children: [{                      
                           type: "name",
                           title: "關",
                           content: "無保護。"
                       } ,{                      
                           type: "name",
                           title: "低",
                           content: "低層級的保護，但對路由器的效能影響也相對輕微。"
                       } ,{                      
                           type: "name",
                           title: "中",
                           content: "中層級的保護，但對路由器的效能影響也較為顯著。"
                       } ,{                      
                           type: "name",
                           title: "高",
                           content: "高層級的保護，但對路由器的效能影響會相當顯著。"
                       }]
} ,{                      
                           type: "name",
                           title: "ICMP-FLOOD 攻擊防護",
                           content: "啟用以防止ICMP(網路控制消息協定)淹沒攻擊。"
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD攻擊防護",
                           content: "啟用以防止UDP(使用者資料封包協定)淹沒攻擊。"
                       } ,{                      
                           type: "name",
                           title: "TCP-SYN-FLOOD 攻擊防護",
                           content: "啟用以防止TCP-SYN(傳輸控制協定-同步) 淹沒攻擊。"
                       } ,{                      
                           type: "name",
                           title: "忽略來自WAN埠的Ping封包",
                           content: "啟用以忽視來自WAN埠的ping封包。"
                       } ,{                      
                           type: "name",
                           title: "禁止來自LAN埠的Ping封包",
                           content: "啟用以禁止來自LAN埠的ping封包。"
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"阻擋的DoS主機列表",
               CONTENT: [{
                           type: "paragraph",
                           content: "此表格顯示被封鎖的DoS主機的IP位址與MAC位址。"
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"存取管理",
               CONTENT: [{
                           type: "paragraph",
                           content: "存取控制用於允許或禁止特定的客戶端設備存取網路。當一個設備被封鎖，則它將無法與其他設備通信或連接到網際網路。"
                       } ,{                      
                           type: "step",
                           title: "控制存取",
       content: [ 
                "1. 切換至「開」，以啟用存取控制。",
                "2. 如果你也想控制連接到訪客網路設備的存取，切換開啟在訪客設備控制。",
                "3. 請根據需要選擇一個存取模式，然後點選儲存：",
                "A. 如果您想封鎖以下列表中的設備的存取，請選擇黑名單。",
                "B. 如果您想只允許以下列表中的設備的存取，請選擇白名單。",
                "4. 在黑名單/白名單部分的設備，點選增加。輸入設備名稱和設備的MAC地址。點選儲存。"]
} ,{                      
                           type: "note",
                           title: "註",
                           content: "如果您要停用此項目，請點選燈泡圖示。"
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"在線設備",
               CONTENT: [{
                           type: "paragraph",
                           content: "此表格顯示所有已連接設備(如果訪客設備控制是啟用的話，會包含連接到訪客網路的設備)的資訊。"
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"IP&MAC 綁定",
               CONTENT: [{
                           type: "paragraph",
                           content: "IP與MAC綁定（也被認為是ARP綁定）是透過綁定設備的IP位址與MAC位址到一起，以控制區域網路上特定電腦的存取的有用功能。IP與MAC綁定也能防止來自於使用特定IP位址的其他設備。"
                       } ,{                      
                           type: "step",
                           title: "設定設備的IP與MAC綁定",
       content: [ 
                "1. 點選 增加。",
                "2. 請輸入設備的MAC位址。",
                "3. 輸入您想要綁定到上方MAC位址的IP位址",
                "4. 選擇 啟用。",
                "5. 點選儲存。"]
} ,{                      
                           type: "note",
                           title: "註",
       content: [ 
                "1. 同一個IP位址不能綁定超過一個的MAC位址。",
                "2. 如果您要停用此項目，請點選燈泡圖示。"]
}]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"ARP列表",
               CONTENT: [{
                           type: "paragraph",
                           content: "此表格顯示目前已連接設備的MAC位址與IP位址。"
                       }]
},
       IPV6 :{ 
               TITLE:"網際網路",
               CONTENT: [{
                           type: "name",
                           title: "IPv6",
                           content: "IPv6 (網際網路協定第6版)是IP(網際網路協定)的最新版本並且處理了IPv4 (網際網路協定第4版)位址耗盡的問題。"
                       } ,{                      
                           type: "title",
                            title: "網際網路連線類型: 浮動 IP"
                       } ,{                      
                           type: "name",
                           title: "浮動 IP",
                           content: "如果ISP使用浮動IPv6位址分配，請選擇此類型。"
                       } ,{                      
                           type: "name",
                           title: "IPv6 位址/主要DNS/次要DNS",
                           content: "這些參數會由ISP的DHCPv6伺服器自動分配。"
                       } ,{                      
                           type: "name",
                           title: "更新",
                           content: "點選以從DHCPv6伺服器取得新的IPv6參數。"
                       } ,{                      
                           type: "name",
                           title: "釋放",
                           content: " 點選以釋放所有由DHCPv6伺服器分配的IPv6位址。"
                       } ,{                      
                           type: "name",
                           title: "取得IPv6 位址",
                           content: "請根據ISP選擇DHCPv6以取得非臨時性IPv6位址，或SLAAC以取得從路由器廣告封包生成的IPv6位址。"
                       } ,{                      
                           type: "name",
                           title: "前綴授權",
                           content: "選擇啟用由ISP的DHCPv6伺服器取得前綴授權或停用以手動指定一個位址前綴。在LAN端的使用者將會以此前綴生成一個IPv6位址。"
                       } ,{                      
                           type: "name",
                           title: "DNS 位址",
                           content: "選擇從ISP動態取得或使用下列的DNS位址。如果選擇使用下列的DNS位址，請手動輸入由ISP提供的DNS位址。"
                       } ,{                      
                           type: "title",
                            title: "網際網路連線類型: 固定 IP"
                       } ,{                      
                           type: "name",
                           title: "固定 IP",
                           content: "如果ISP使用固定IPv6位址分配，請選擇此類型。"
                       } ,{                      
                           type: "name",
                           title: "IPv6 位址/預設閘道/主要DNS/次要DNS",
                           content: "輸入網路業者(ISP)提供給您的參數。"
                       } ,{                      
                           type: "name",
                           title: "MTU 大小",
                           content: "一般常見的乙太網路MTU （Maximum Transmit Unit）數值為1500。通常您不需要修改這個數值，除非您的ISP有特別需求！"
                       } ,{                      
                           type: "title",
                            title: "網路連線類型：6to4 通道"
                       } ,{                      
                           type: "name",
                           title: "6to4 通道",
                           content: "如果ISP使用6to4部署分配位址，請選擇此類型。"
                       } ,{                      
                           type: "name",
                           title: "IPv4 位址/IPv4 子網掩碼/IPv4 預設閘道/通道位址",
                           content: "當你點選連線後這些參數會由WAN埠的IPv4資訊自動提供。"
                       } ,{                      
                           type: "name",
                           title: "使用下列的DNS伺服器",
                           content: "選擇以手動輸入ISP所提供的主要DNS、次要DNS。"
                       } ,{                      
                           type: "name",
                           title: "連線",
                           content: "點選以連接至網際網路。"
                       } ,{                      
                           type: "name",
                           title: "斷線",
                           content: "點選以從網際網路斷線。"
                       } ,{                      
                           type: "title",
                            title: "網際網路連線類型: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE",
                           content: "如果ISP使用PPPoEv6並提供使用者名稱與密碼，請選擇此類型。"
                       } ,{                      
                           type: "name",
                           title: "使用者名稱/密碼",
                           content: "輸入網路業者(ISP)提供給您的參數。"
                       } ,{                      
                           type: "name",
                           title: "IPv6 位址",
                           content: "在您輸入使用者名稱與密碼並點選連線後，此位址將會由ISP的DHCPv6伺服器自動分配。"
                       } ,{                      
                           type: "name",
                           title: "取得IPv6 位址",
                           content: "請根據ISP選擇DHCPv6以取得非臨時性IPv6位址，或SLAAC以取得從路由器廣告封包生成的IPv6位址，或手動輸入由ISP指定的IPv6位址。"
                       } ,{                      
                           type: "name",
                           title: "前綴授權",
                           content: "選擇啟用由ISP的DHCPv6伺服器取得前綴授權或停用以手動指定一個位址前綴。在LAN端的使用者將會以此前綴生成一個IPv6位址。"
                       } ,{                      
                           type: "name",
                           title: "DNS 位址",
                           content: "選擇從ISP動態取得或使用下列的DNS位址。如果選擇使用下列的DNS位址，請手動輸入由ISP提供的DNS位址。"
                       } ,{                      
                           type: "name",
                           title: "連線",
                           content: "點選以連接至網際網路。"
                       } ,{                      
                           type: "name",
                           title: "斷線",
                           content: "點選以從網際網路斷線。"
                       } ,{                      
                           type: "title",
                            title: "網際網路連線類型：Pass-Through (橋接)"
                       } ,{                      
                           type: "paragraph",
                           content: "如果ISP使用穿透(橋接)網路部署，請選擇此類型。此類型連線並不需要設定。"
                       }]
},
       IPV6_LAN :{ 
               TITLE:"區域網路(LAN)",
               CONTENT: [{
                           type: "paragraph",
                           content: "除了網際網路連接類型-穿透(橋接)，其他類型的網際網路連線需要進行IPv6設定。"
                       } ,{                      
                           type: "name",
                           title: "分配類型",
                           content: "請根據ISP選擇適當的一個。",
       children: [{                      
                           type: "name",
                           title: "DHCPv6",
                           content: "自動取得IP位址到LAN埠。",
       children: [{                      
                           type: "name",
                           title: "位址前綴",
                           content: "請輸入由ISP提供的位址前綴。"
                       } ,{                      
                           type: "name",
                           title: "釋放時間",
                           content: "這是被分配的IP位址的有效時間。請保持預設的86400秒，除非如果ISP要求的話再改變它。"
                       } ,{                      
                           type: "name",
                           title: "位址",
                           content: "這是由ISP的DHCPv6伺服器自動分配的IP位址。"
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+Stateless DHCP",
       children: [{                      
                           type: "name",
                           title: "位址前綴",
                           content: "請輸入由ISP提供的位址前綴。"
                       } ,{                      
                           type: "name",
                           title: "位址",
                           content: "由ISP的 DHCPv6伺服器自動分配的IP位址。"
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+RDNSS",
       children: [{                      
                           type: "name",
                           title: "位址前綴",
                           content: "請輸入由ISP提供的位址前綴。"
                       } ,{                      
                           type: "name",
                           title: "位址",
                           content: "由ISP的 DHCPv6伺服器自動分配的IP位址。"
                       }]
}]
}]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"複製MAC位址",
               CONTENT: [{
                           type: "paragraph",
                           content: "請選擇您所需合適的MAC複製方式。"
                       } ,{                      
                           type: "name",
                           title: "請勿複製 MAC位址",
                           content: "不改變路由器預設的MAC位址，一般ADSL/VDSL用戶請選擇此項目。"
                       } ,{                      
                           type: "name",
                           title: "複製目前電腦的MAC位址",
                           content: "會將目前操作電腦的MAC位址複製到路由器的WAN端，當您的ISP僅對您的電腦加入放行白名單時，請選擇此項。"
                       } ,{                      
                           type: "name",
                           title: "使用自訂的 MAC 位址",
                           content: "您可以手動輸入ISP所要求的特定MAC位址。"
                       }]
},
       TIME_SETTING :{ 
               TITLE:"時間設定",
               CONTENT: [{
                           type: "paragraph",
                           content: "時間設定讓您為路由器設定系統時間。一旦修改，系統時間將會被套用至以時間為基礎的功能與設定，例如：家長監護。"
                       } ,{                      
                           type: "note",
                           title: "註",
                           content: "在設定前，您可以切換至「開」，以啟用24小時制功能，將會被套用至以時間為基礎的功能與設定。"
                       } ,{                      
                           type: "title",
                            title: "系統時間"
                       } ,{                      
                           type: "step",
                           title: "從網際網路取得時間",
       content: [ 
                "預設為勾選，從網際網路取得讓您可以從網際網路取得系統時間。",
                "1. 選擇從網際網路取得。",
                "2. 從下拉式選單選擇本地時區。",
                "3. 在NTP伺服器欄位中，輸入所需的NTP伺服器的IP位址或網域名稱。",
                "4. 在 NTP 伺服器II欄位，輸入第二NTP 伺服器IP位址或網域名稱。(選填)",
                "5. 點選取得。",
                "6. 點選儲存。"]
} ,{                      
                           type: "step",
                           title: "從電腦取得時間",
       content: [ 
                "此功能讓您可以從電腦取得系統時間。在設定前請先確認電腦時間。",
                "選擇從電腦取得並點選儲存。"]
} ,{                      
                           type: "step",
                           title: "手動設定時間",
       content: [ 
                "如妥設備無法從網際網路或電腦自動取得時間，您也可以手動設定系統時間。",
                "1. 選擇手動。",
                "2. 輸入目前的日期與時間。",
                "3. 點選儲存。"]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "日光節約時間",
                           content: "此功能可以自動同步具有日光節約時間的系統時間。"
                       } ,{                      
                           type: "step",
                           title: "設定日光節約時間",
       content: [ 
                "1. 選擇啟用日光節約時間。",
                "2. 在本地時區指定日光節約時間的時間週期。",
                "3. 點選儲存。"]
}]
},
       DIGNOSTIC :{ 
               TITLE:"診斷",
               CONTENT: [{
                           type: "paragraph",
                           content: "路由器提供Ping與追蹤路由工具協助您找出網路問題。"
                       } ,{                      
                           type: "title",
                            title: "Ping與追蹤路由"
                       } ,{                      
                           type: "paragraph",
                           content: "Ping工具可以發送封包到目標IP位址或網域名稱並記錄結果，例如：發送與接收的封包數量以及往返時間。"
                       } ,{                      
                           type: "paragraph",
                           content: "追蹤路由工具會發送封包到目標IP位址或網域名稱並顯示到達目的地的節點數量與時間。"
                       } ,{                      
                           type: "paragraph",
                           content: "您可以透過IP位址或網域名稱ping或追蹤路由一個網路設備，例如：168.95.1.1、tp-link.com、yahoo.com等。"
                       } ,{                      
                           type: "step",
                           title: "使用Ping診斷",
       content: [ 
                "1. 選擇Ping作為診斷工具。",
                "2. 輸入目標IP位址或網域名稱。",
                "3. 點選箭頭圖示以開啟進階選單，這可以指定Ping次數與Ping封包大小。(選填)",
                "4. 點選開始。"]
} ,{                      
                           type: "step",
                           title: "使用追蹤路由診斷",
       content: [ 
                "1. 選擇追蹤路由作為診斷工具。",
                "2. 輸入目標IP位址或網域名稱。",
                " 3. 點選箭頭圖示以開啟進階選單，這可以在追蹤路由最大TTL(生存時間)指定節點數量。預設值為20。(選填)",
                "4. 點選開始。"]
}]
},
       PORT_MIRROR :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                            title: "連接埠鏡像"
                       } ,{                      
                           type: "paragraph",
                           content: "連接埠鏡像是指從被鏡像連接埠到鏡像連接埠轉發備份封包的過程。通常情況下，鏡像連接埠連接到資料診斷設備，它用於分析監測和診斷網路鏡像封包。"
                       } ,{                      
                           type: "step",
                           title: "轉發封包的備份到指定的連接埠",
       content: [ 
                "1. 啟用連接埠鏡像。",
                "2. 選擇需要的連接埠作為被鏡像連接埠。",
                "3. 選擇需要的連接埠作為鏡像連接埠。",
                "4. 點選儲存。"]
} ,{                      
                           type: "note",
                           title: "註",
                           content: "連接埠不可能同時作為被鏡像連接埠與鏡像連接埠。"
                       }]
},
       FIRMWARE :{ 
               TITLE:"韌體升級",
               CONTENT: [{
                           type: "paragraph",
                           content: "韌體升級更新路由器的韌體，這可以增加新功能或修正錯誤。我們建議您升級至最新韌體以擁有最佳效能。"
                       } ,{                      
                           type: "step",
                           title: "請注意，下面的資訊將幫助你避免升級失敗：",
       content: [ 
                "在升級之前",
                "1. 確保在路由器與您的電腦之間有穩定的連線。非常不建議以無線連線方式升級韌體。",
                "2. 確保您已移除所有連接至路由器的USB設備。",
                "3. 記得要備份路由器的設定檔。",
                "當升級時",
                "請務必保持路由器「電源開啟」，直到升級完成。"]
}]
},
       FIRMWARE_UPGRADE_ONLINE :{ 
               TITLE:"在線升級韌體",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "當出現提示時，請點選升級與確認。路由器將會自動下載與升級至最新韌體。您也可以點選檢查以檢查是否有最新版本韌體可以更新。"]
}]
},
       FIRMWARE_UPGRADE :{ 
               TITLE:"手動升級韌體",
               CONTENT: [{
                           type: "step",
       content: [ 
                "1. 點選頁面下方的支援並下載最新韌體到電腦。請確認您下載的韌體檔符合路由器的硬體版本(如頁面所示)。",
                "2. 點選「瀏覽」並選擇已下載的韌體檔案。",
                "3. 點選「升級」。"]
} ,{                      
                           type: "paragraph",
       content: [ 
                "韌體升級將會花幾分鐘完成。當韌體升級完成時，路由器將會自動重新啟動。"]
}]
},
       BACKUP :{ 
               TITLE:"備份與復原",
               CONTENT: [{
                           type: "paragraph",
                           content: "備份與還原功能讓您可以備份路由器目前的設定，這可以讓您輕鬆降路由器恢復至目前的狀態，或者也可以將路由器還原至預設設定。"
                       } ,{                      
                           type: "note",
                           title: "註",
                           content: "在備份或還原過程中，請勿關閉路由器的電源。"
                       } ,{                      
                           type: "title",
                           title: "備份",
                           content: "強烈建議您備份目前的設定，以防有復原需求時，可將路由器還原至先前的狀態。"
                       } ,{                      
                           type: "step",
                           title: "若要備份目前的設定",
       content: [ 
                "1. 點選「備份」。",
                "2. 等待路由器備份目前的設定。"]
}]
},
       RESTORE :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "復原",
                           content: "您可以使用備份檔將路由器還原至備份時的狀態。"
                       } ,{                      
                           type: "step",
                           title: "使用備份檔復原設定",
       content: [ 
                "1. 點選瀏覽。",
                "2. 尋找並選擇備份檔案。",
                "3. 點選復原。"]
}]
},
       FACTORY :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "恢復原廠預設值",
       content: [ 
                "原廠還原路由器將會移除所有您的設定，並將它們返回原廠預設值。例如：所有的無線、家長監護與網路資訊都將被消除。",
                "在還原原廠設定後，您必須設定新密碼才能連線到路由器的網頁管理頁面。"]
}]
},
       REBOOT :{ 
               TITLE:"重啟排程",
               CONTENT: [{
                           type: "paragraph",
                           content: "重啟排程功能可以清除快取資料以增進路由器的運作效能。您可以手動重啟路由器或設定讓它規律地重新啟動。"
                       } ,{                      
                           type: "step",
                           title: "手動重啟",
       content: [ 
                "點選重新啟動，並請等待幾分鐘，路由器會重新開機。"]
} ,{                      
                           type: "step",
                           title: "若要設定重新啟動時間的排程",
       content: [ 
                "1. 啟用重新啟動排程",
                "2. 透過在「重新啟動時間」與「重複」欄位中指定參數，設定您要何時與多常讓路由器重新啟動。",
                "3. 點選儲存。"]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"管理",
               CONTENT: [{
                           type: "paragraph",
                           content: "管理人員的權限讓您可以管理登入密碼以及用戶端連接至路由器的存取權限。"
                       } ,{                      
                           type: "name",
                           title: "帳號管理",
                           content: "此功能允許您變更密碼。",
       children: [{                      
                           type: "step",
                           title: "變更密碼",
       content: [ 
                "1. 輸入舊密碼。",
                "2. 輸入新密碼。",
                "3. 確認新密碼。",
                "4. 點選儲存。"]
}]
}]
},
       ADMIN_RECOVERY :{ 
               TITLE:"密碼復原",
               CONTENT: [{
                           type: "name",
                           title: "預設密碼復原",
                           content: "預設的密碼復原功能讓您可以將登入密碼恢復為預設值，但不需要將路由器還原至原廠預設設定。",
       children: [{                      
                           type: "step",
                           title: "變更密碼",
       content: [ 
                "1. 啟用預設密碼復原功能。",
                "2. 在寄件人欄位中，請輸入有效的電子郵件地址，這用以發送驗證碼以復原登入資訊。",
                "3. 在收件人欄位中，請輸入有效的電子郵件地址，這用以接收驗證碼。",
                "4. 請輸入外寄電子郵件的SMTP伺服器。",
                "5. 如果電子郵件的寄件人欄位需要密碼，您必須勾選啟用驗證的核取方塊，並輸入使用者名稱（常見是電子郵件位址）與密碼。",
                "6. 點選儲存。"]
}]
}]
},
       ADMIN_LOCAL :{ 
               TITLE:"本地管理",
               CONTENT: [{
                           type: "paragraph",
                           content: "此功能可以讓本地設備存取並管理路由器。"
                       } ,{                      
                           type: "name",
                           id: "local_management_https",
                           title: "透過HTTPS進行本地管理",
                           content: "如果您想同時使用HTTP與HTTPS存取路由器，請啟用「透過HTTPS進行本地管理」。如果您只想透過HTTP存取路由器，則請保持停用。"
                       } ,{                      
                           type: "name",
                           title: "允許所有LAN連線的設備存取",
                           content: "切換至「開」，以允許所有LAN連線的設備存取或保持它關閉以僅讓指定的設備進行管理。"
                       } ,{                      
                           type: "name",
                           title: "MAC 位址",
                           content: "顯示指定的存取設備的MAC位址。"
                       } ,{                      
                           type: "name",
                           title: "描述",
                           content: "顯示限制存取設備的描述。"
                       } ,{                      
                           type: "name",
                           title: "狀態",
                           content: "以燈泡圖示顯示指定的存取設備的規則狀態（啟用或停用）。"
                       } ,{                      
                           type: "name",
                           title: "修改",
                           content: "顯示該限制存取設備對應 修改 或 刪除 的項目。"
                       } ,{                      
                           type: "step",
                           title: "增加 使用者端設備 到列表",
       content: [ 
                "1. 點選 增加。",
                "2. 點選查看現有設備，選擇已存在的設備或直接輸入MAC位址到MAC位址欄位。",
                "3. 輸入設備的描述。",
                "4. 選擇 啟用。",
                "5. 點選 確定。"]
} ,{                      
                           type: "step",
                           title: "在列表值中修改或刪除 設備",
                           content: "在表格內您可以點選對應欄位的編輯圖示或刪除圖示，以進行您想要的操作。"
                       } ,{                      
                           type: "step",
                           title: "刪除複數設備",
                           content: "勾選所有您想刪除的規則，並點選列表上方的 刪除 按鈕。"
                       }]
},
       ADMIN_REMOTE_WITHOUT_HTTPS :{ 
               TITLE:"遠端管理",
               CONTENT: [{
                           type: "name",
                           title: "遠端管理",
                           content: "遠端管理功能讓遠端設備可以存取與管理路由器。",
       children: [{                      
                           type: "step",
                           title: "禁止所有的遠端設備管理路由器",
                           content: "選擇停用遠端管理並點選儲存。"
                       } ,{                      
                           type: "step",
                           title: "允許所有的遠端設備管理路由器",
       content: [ 
                "1. 選擇為所有的設備啟用遠端管理。",
                "2. 輸入網頁管理通訊埠(1024-65535或80)，這可以讓遠端設備存取路由器。",
                "3. 點選儲存。"]
} ,{                      
                           type: "step",
                           title: "允許特定的遠端設備管理路由器",
       content: [ 
                "1. 選擇為指定的設備啟用遠端管理。",
                "2. 輸入網頁管理通訊埠(1024-65535或80)，這可以讓遠端設備存取路由器。",
                "3. 輸入遠端設備要用來管理路由器的遠端管理IP位址。",
                "4. 點選儲存。"]
}]
}]
},
       ADMIN_REMOTE :{ 
               TITLE:"遠端管理",
               CONTENT: [{
                           type: "paragraph",
                           content: "您可以在此設定開啟路由器的遠端管理功能，如此即使管理者不在內部網路，也可以透過網際網路管理此路由器。"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step_title",
                           content: "若要設定遠端管理"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step1",
                           content: "1. 勾選核取方塊以啟用遠端管理功能。"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step2",
                           content: "2. 維持HTTPS與HTTP通訊埠為預設設定。"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step3",
                           content: "3. 選擇以決定哪個遠端設備可以遠端存取路由器：",
       children: [{                      
                           type: "name",
                           title: "所有設備",
                           content: "所有的遠端設備都可以存取路由器。"
                       } ,{                      
                           type: "name",
                           title: "指定的設備",
                           content: "請輸入可以存取路由器的遠端設備的IP位址。"
                       }]
} ,{                      
                           type: "paragraph",
                           id: "admin_remote_step4",
                           content: "4. 點選儲存。"
                       } ,{                      
                           type: "paragraph",
                           content: "現在您可以透過顯示在「進行管理的網址」的網址遠端管理路由器"
                       } ,{                      
                           type: "note",
                           title: "註",
                           content: "當您遠端存取上面的網址時，如果跳出警告視窗，請點選信任(或類似選項)以繼續進行。"
                       }]
},
       LED_CONTROL_SETTINGS :{ 
               TITLE:"LED控制",
               CONTENT: [{
                           type: "paragraph",
                           content: "一旦啟用夜間模式，LED燈將會每天在指定的期間內關閉，這不會影響路由器的效能。"
                       } ,{                      
                           type: "step",
                           title: "啟用夜間模式",
       content: [ 
                "1. 選擇啟用夜間模式。",
                "2. 指定要關閉LED燈的時間期間。",
                "3. 點選儲存。"]
}]
},
       SYSTEM_LOG :{ 
               TITLE:"系統日誌",
               CONTENT: [{
                           type: "paragraph",
                           content: "系統日誌顯示了路由器最近的活動。表格由類型、層級與日誌內容組成，系統日誌可以被過濾以便觀看。您也可以儲存系統日誌到本地電腦或發送它們到電子郵件。"
                       } ,{                      
                           type: "step",
                           title: "儲存系統日誌到本地電腦",
       content: [ 
                "1. 設定類型與最低層級以過濾所需的系統日誌。層級列表是按降序排列，最低層級會列在最後。",
                "2. 點儲存日誌以儲存系統日誌檔到本地電腦。"]
} ,{                      
                           type: "step",
                           title: "透過電子郵件接收系統日誌",
       content: [ 
                "1. 設定類型與層級以過濾所需的系統日誌。層級列表是按降序排列，最低層級會列在最後。",
                "2. 點選電子郵件設定。",
                "3. 在寄件人欄位，請輸入有效的電子郵件，這被用來作為外發電子郵件。",
                "4. 在收件人欄位，請輸入有效的電子郵件，這被用來作為收件電子郵件。",
                "5. 請輸入外發電子郵件(寄件人)的SMTP伺服器位址。",
                "註：如果外發電子郵件需要驗證，請勾選啟用驗證的核取方塊並輸入它的使用者名稱(常見是電子郵件位址)與密碼。",
                "6. 如果您想要透過電子郵件規律地接收系統日誌，請勾選啟用自動寄送的核取方塊，並設定一個指定時間(以24小時制)或時間間隔。",
                "如果您想要立即收到目前的系統日誌，請點選立即寄送日誌。",
                "7. 點選 儲存。"]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"流量監控",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示之前10分鐘的設備的流量用量，或在過去10分鐘/24小時/7天所有設備的流量用量。"
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"流量監控列表",
               CONTENT: [{
                           type: "paragraph",
                           content: "該列表是由設備的連接類型分組：有線或無線。"
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"系統參數",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wifi_title",
                           title: "無線網路 2.4GHz/5GHz",
                           content: "此部分讓您可以設定在無線網路中流量傳輸規則的參數。如果在此情況下您不知道什麼是適當的設定，建議您保持預設設定。"
                       } ,{                      
                           type: "name",
                           title: "信標 間隔",
                           content: "可輸入 40 到 1000 毫秒之間的數值，是路由器用以同步無線網路的廣播封包的機制，預設值為 100 毫秒。"
                       } ,{                      
                           type: "name",
                           title: "RTS 臨界值",
                           content: "可以輸入1 到 2346 之間的數值，數字越大無線網路傳輸效能越好，但是在收訊品質不佳的地方，減少數值可以有助維持訊號穩定性，預設值為最大值。"
                       } ,{                      
                           type: "name",
                           title: "DTIM 間隔",
                           content: "此值決定DTIM(傳輸指示消息)的間隔。請輸入介於1-15之間的值。預設值為1，這代表DTIM間隔與信標間隔相同。"
                       } ,{                      
                           type: "name",
                           title: "群組金鑰更新週期",
                           content: "預設值為0，以秒計算，最少為30，0代表不更新。"
                       } ,{                      
                           type: "name",
                           title: "WMM 功能",
                           content: "WMM功能可以保證無線網路的影音傳輸封包獲得高優先級傳輸，藉以提升級時視訊或影音串流的穩定性。預設值為啟用，並且強烈建議不要取消勾選(停用)。"
                       } ,{                      
                           type: "name",
                           title: "Short GI 功能",
                           content: "此功能預設且建議為啟用，它可藉由縮減GI(保護間隔)的時間以增加資料容量。"
                       } ,{                      
                           type: "name",
                           title: "AP隔離功能",
                           content: "如果您要管制所有以連接到網路的無線設備，讓它們無法彼此交流，但仍可以連線至網際網路，請勾選啟用AP隔離的核取方塊。"
                       },,{
                           type: "name",
                           title: "USB 3.0干擾減低",
                           content: "點選啟用以減低USB 3.0的干擾。"
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
                           title: "啟用WDS",
                           content: "WDS(無線散佈系統)橋接功能，讓你可以在WLAN(無線區域網路)無線區域網路中，透過橋接AP(基地台)來擴展無線網路覆蓋範圍。"
                       } ,{                      
                           type: "step",
       content: [ 
                "1. 選擇啟用WDS橋接功能。",
                "2. 透過掃描功能去橋接網路：點選掃描並顯示所有可用的網路，然後選擇您要橋接的網路。SSID(網路名稱)、MAC位址與 安全性將會被自動填入。",
                "或也可以手動橋接網路：輸入SSID(網路名稱)、MAC位址與WDS模式到被橋接欄位。選擇安全性類型並輸入相關參數，這些參數應該與被橋接的網路相同。",
                "3. 點選儲存。"]
} ,{                      
                           type: "note",
                           title: "註",
                           content: "如果您不確定WDS模式。請保持預設的自動選項。"
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "WPS",
                           content: "WPS (Wi-Fi保護設定)提供您一個簡單的方法去建立一個具安全性保護的Wi-Fi連線。"
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "NAT",
                           content: "此功能預設為啟用。我們建議您保持預設值。如果您停用它，您可能會不能連線至網際網路。"
                       } ,{                      
                           type: "note",
                           title: "註",
                           content: "當NAT被停用後，NAT導向的功能將會失效。"
                       } ,{                      
                           type: "name",
                           id: "sys_para_nat_boost",
                           title: "NAT 加速",
                           content: "勾選啟用NAT加速核取方塊並點選儲存以確保路由器擁有最佳吞吐量。"
                       } ,{                      
                           type: "note",
                           id: "sys_para_nat_boost_note",
                           title: "註",
                           content: "當NAT加速啟用後，QoS 與流量統計將會被自動停用。"
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "DOS保護設定",
                           content: "DOS保護可以保護路由器免於ICMP-FLOOD、UDP-FLOOD與TCP-FLOOD攻擊。"
                       } ,{                      
                           type: "name",
                           title: "ICMP-FLOOD 封包等級",
                           content: "請輸入介於5-7200 ICMP封包之間的值，當ICMP封包數量超過目前的臨界值時，會立即觸發ICMP-FLOOD保護。"
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD 封包等級",
                           content: "請輸入介於5-7200 UDP封包之間的值，當UDP封包數量超過目前的臨界值時，會立即觸發UDP-FLOOD保護。"
                       } ,{                      
                           type: "name",
                           title: "TCP-FLOOD 封包等級",
                           content: "請輸入介於5-7200 TCP-SYN封包之間的值，當TCP封包數量超過目前的臨界值時，會立即觸發TCP-SYN-FLOOD保護。"
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "雙工",
                           content: "請從下拉式選單選擇雙工類型。"
                       }]
},
       SYSTEM_PARA_LED :{ 
               TITLE:"LED控制",
               CONTENT: [{
                           type: "name",
                           title: "啟用夜間模式",
                           content: "勾選這個核取方塊，即可在夜間模式下關閉 LED，但不影響路由器的效能。"
                       } ,{                      
                           type: "name",
                           title: "夜間模式期間",
                           content: "指定要套用夜間模式的時段。"
                       } ,{                      
                           type: "paragraph",
                           content: "點選 儲存 以儲存您的設定。"
                       }]
},
       OPEN_VPN :{ 
               TITLE:"OpenVPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "透過OpenVPN，當您不在家時您可以使用網際網路安全地存取家中網路。若要使用VPN服務您需要設定動態DNS服務(建議)或分配固定IP到路由器的WAN埠。並且系統時間必須與網際網路同步。"
                       } ,{                      
                           type: "name",
                           title: "服務類型",
                           content: "選取 OpenVPN 伺服器的通訊協定：UDP 或 TCP。"
                       } ,{                      
                           type: "name",
                           title: "服務埠",
                           content: "請輸入介於1024-65535之間的通訊埠號碼。預設與常見服務通訊埠是1194。"
                       } ,{                      
                           type: "name",
                           title: "VPN 子網路/網路遮罩",
                           content: "輸入 OpenVPN 伺服器可租用給用戶端的 IP 位址範圍。"
                       } ,{                      
                           type: "name",
                           title: "用戶端存取",
                           content: "請為OpenVPN用戶端選擇存取類型。",
       children: [{                      
                           type: "name",
                           title: "僅限家庭網路",
                           content: "用戶端只能存取家庭網路。該用戶端預設的路由不會被改變。"
                       } ,{                      
                           type: "name",
                           title: "網際網路和家庭網路",
                           content: "當您出國，有地理限制時，用戶端可以存取家庭網路與網際網路站臺或服務。該用戶端的預設路由將會被變更。"
                       }]
}]
},
       OPEN_VPN_CERTIFICATE :{ 
               TITLE:"憑證",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "將憑證用於資訊，並將 VPN 連線的身分識別用於遠端電腦。",
                "按一下來產生新憑證。"]
}]
},
       OPEN_VPN_CONF :{ 
               TITLE:"組態檔",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "遠端用戶端將會使用該設定檔以存取您的路由器。",
                "按一下這個按鈕來儲存可用於新增 VPN 連線的 OpenVPN 組態檔。"]
}]
},
       OPEN_VPN_GUIDE :{ 
               TITLE:"VPN 用戶端安裝指南",
               CONTENT: [{
                           type: "step",
                           title: "連接用戶端設備到OpenVPN伺服器：",
       content: [{                      
                           type: "paragraph",
                           content: "在您設定OpenVPN伺服器之前，請設定動態DNS服務(建議)或分配固定IP到路由器的WAN埠。並且確認NAT設定的外部通訊埠沒有此服務通訊埠，然後系統時間必須與網際網路同步。"
                       },
                "1. 選擇啟用VPN伺服器。",
                "2. 設定OpenVPN伺服器參數(服務類型、服務通訊埠、用戶端存取與VPN子網路/網路遮罩)並點選儲存。",
                "3. 點選匯出以儲存設定檔。",
                "4. 在用戶端設備上，從<a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a>下載並安裝OpenVPN用戶端工具。",
                "官方支援平台包含：Windows、Mac OSX以及Linux。",
                "5. 啟動OpenVPN用戶端工具並使用儲存的設定檔增加新的VPN連線，以連接用戶端設備到VPN伺服器。"]
} ,{                      
                           type: "note",
                           title: "註",
                           content: "若要深入了解 OpenVPN 用戶端，請瀏覽網站：<a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
                       }]
},
       PPTP_VPN :{ 
               TITLE:"PPTP VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "透過PPTP VPN，當您不在家時您可以使用網際網路簡單而快速地存取家中網路。某些ISP可能會阻擋VPN服務。若要使用VPN服務您需要設定動態DNS服務(建議)或分配固定IP到路由器的WAN埠。並且系統時間必須與網際網路同步。"
                       } ,{                      
                           type: "name",
                           title: "用戶端 IP 位址",
                           content: "輸入 PPTP VPN 伺服器可租用給用戶端的 IP 位址範圍 (最多 10 個用戶端)。"
                       } ,{                      
                           type: "name",
                           title: "使用者名稱和密碼",
                           content: "輸入使用者名稱和密碼，向 PPTP VPN 伺服器驗證用戶端。"
                       }]
},
       PPTP_VPN_GUIDE :{ 
               TITLE:"VPN 用戶端安裝指南",
               CONTENT: [{
                           type: "step",
                           title: "連接用戶端設備到PPTP VPN伺服器：",
       content: [{                      
                           type: "paragraph",
                           content: "在您設定PPTP VPN伺服器之前，請設定動態DNS服務(建議)或分配固定IP到路由器的WAN埠。並且確認NAT設定的外部通訊埠沒有使用1723服務通訊埠，然後系統時間必須與網際網路同步。"
                       },
                "1. 選擇啟用VPN伺服器。",
                "2. 設定PPTP VPN伺服器參數並點選儲存。",
                "3. 在用戶端設備上，創建PPTP VPN連線。官方支援平台包含：Windows、Mac OSX以及Linux。",
                "4. 啟動PPTP VPN程式，增加新的連線並輸入已註冊的DDNS服務的網域名稱或分配給WAN埠的固定IP，以連接用戶端設備到PPTP VPN伺服器。"]
}]
},
       VPN_CONNNECTION :{ 
               TITLE:"VPN連接",
               CONTENT: [{
                           type: "paragraph",
                           content: "這個頁面會顯示目前連線至 OpenVPN 的用戶端，以及 路由器上代管的 PPTP VPN 伺服器。"
                       }]
},
       BASIC_NETWORK :{ 
               TITLE:"網路地圖",
               CONTENT: [{
                           type: "paragraph",
                           content: "在網路地圖中，您可以檢查目前的網路連線狀態與路由器的無線資訊，以及已連線設備的資訊。"
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"網際網路",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示網際網路資訊。"
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"路由器",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示無線網路與LAN埠目前的網路資訊。"
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"有線/無線使用者",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示已連接到路由器的用戶端的網路名稱(可編輯)、分配的IP與MAC位址。"
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"印表機",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示連接到路由器USB埠的印表機的名稱"
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"USB磁碟",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示透過USB連接埠連接到路由器的USB磁碟的相關資訊。"
                       }]
},
       BASIC_SPEED_TEST :{ 
               TITLE:"速度測試",
               CONTENT: [{
                           type: "paragraph",
                           content: "此功能可以測試從網路業者所取得的上傳與下載速度並提供關於網際網路性能的有用建議。"
                       } ,{                      
                           type: "paragraph",
                           content: "提示：為了獲得更準確的結果，請嘗試關閉其他應用程式和app。"
                       } ,{                      
                           type: "paragraph",
                           content: "歷史記錄 - 以前速度測試的記錄。"
                       } ,{                      
                           type: "paragraph",
                           content: "再次測試 - 點選以進行速度測試。"
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"網際網路",
               CONTENT: [{
                           type: "paragraph",
                           content: "點選自動偵測或手動選擇網際網路連線類型。然後輸入ISP提供的對應參數。"
                       }]
},
       BASIC_WIRELESS_SMART_CONNECT :{ 
               TITLE:"智慧連線",
               CONTENT: [{
                           type: "paragraph",
                           content: "勾選這個核取方塊，即可啟用智慧連線。這項功能會根據實際條件，為裝置指派最佳的無線頻段以平衡網路需求，所以有助於裝置執行得更快。"
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"無線網路設定",
               CONTENT: [{
                           type: "paragraph",
                           content: "您可以設定無線設定(SSID、密碼等)"
                       } ,{                      
                           type: "name",
                           title: "無線網路名稱 (SSID)",
                           content: "建議您變更網路名稱(SSID)。此欄位需注意英文大小寫之不同。"
                       } ,{                      
                           type: "name",
                           title: "隱藏 SSID",
                           content: "如果您想要從無線網路列表隱藏2.4GHz/5GHz網路名稱(SSID)，請選擇此項目。一旦選擇，該SSID將不會被廣播並且您必須手動加入該網路。"
                       } ,{                      
                           type: "name",
                           title: "密碼",
                           content: "請輸入8-63位ASCII碼密碼，或者8-64位十六進位碼密碼(0-9, a-f, A-F)。"
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
               TITLE:"USB儲存設備",
               CONTENT: [{
                           type: "paragraph",
                           content: "此功能允許您在區域網路或透過網際網路，在不同的用戶端之間分享USB儲存設備。"
                       } ,{                      
                           type: "title",
                           title: "設備設定",
                           content: "設備設定部分顯示透過USB連接埠連接的USB儲存設備的基本資訊。USB隨身碟通常只有一個磁碟區。"
                       } ,{                      
                           type: "name",
                           title: "掃描",
                           content: "通常情況下，路由器會自動檢測到任何新連接的設備。如果沒有，請點選該按鈕，掃描並重新整理螢幕上的更新的資訊。",
       children: [{                      
                           type: "note",
                           title: "註",
                           content: "灰色區域代表被停用的磁碟區。您可以點選該區域以共享指定的磁碟區。"
                       }]
} ,{                      
                           type: "name",
                           title: "移除",
                           content: "在實體USB連接埠上拔下之前，點選此按鈕，以安全地卸載USB儲存設備。",
       children: [{                      
                           type: "note",
                           title: "註",
                           content: "移除按鈕只有在USB存儲設備連接到路由器時出現。當目前的磁碟區忙碌時，你可能無法卸載它。"
                       }]
} ,{                      
                           type: "step",
                           title: "設定 檔案伺服器",
       content: [ 
                "1. 直接將USB儲存設備連接到USB連接埠或使用USB延長線。如果設備需要綁定外接電源，請確保外接電源已連接。",
                "2. 新連接的USB設備應該被路由器自動檢測，而被顯示在設備設定部分下。如果沒有，請點選掃描。",
                "註：出現「共享」圖示。 您可以點擊該圖示以停用您所不需要的磁碟區。"]
}]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"存取位址",
               CONTENT: [{
                           type: "name",
                           title: "網路/媒體 伺服器名稱",
                           content: "顯示被用於存取已連接的USB儲存設備的名稱，會透過網路芳鄰或媒體共享功能存取。預設值為TP-Share。"
                       } ,{                      
                           type: "name",
                           title: "存取方式",
                           content: "您有3種方式可以存取共享的USB儲存設備。",
       children: [{                      
                           type: "name",
                           title: "網路芳鄰",
                           content: "選擇此模式讓網路上的使用者，可以透過顯示在下方位址欄位的位址存取共享內容。"
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "選擇此模式以啟用FTP伺服器功能，這讓FTP用戶端與網路上的使用者，可以透過顯示在下方位址欄位的FTP位址存取共享內容。"
                       } ,{                      
                           type: "name",
                           title: "FTP(透過網際網路)",
                           content: "選擇此選項讓FTP用戶端與使用者可以遠端存取，透過FTP，即使是網際網路，您也可以下載與上傳檔案到USB儲存設備。若要自訂存取位址，請點選編輯並為路由器設定動態DNS。若要變更FTP伺服器的通訊埠，請輸入新的通訊埠號碼並點選儲存以套用變更。"
                       }]
} ,{                      
                           type: "name",
                           title: "位址",
                           content: "顯示該USB儲存設備用以存取的位址。"
                       } ,{                      
                           type: "name",
                           title: "通訊埠",
                           content: "顯示用來存取FTP伺服器的通訊埠號碼。"
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"共享內容",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示您共享的資料夾。預設為共享所有的資料夾。您可以點選編輯圖示來自訂共享資料夾。"
                       } ,{                      
                           type: "note",
                           title: "註",
                           content: "在設備設定部分出現「共享」圖示。 您可以點擊該共享圖示以停用您所不需要的磁碟區。"
                       }]
},
       FOLDER_SHARING :{ 
               TITLE:"共享內容與安全性",
               CONTENT: [{
                           type: "name",
                           title: "共享內容",
                           content: "顯示您共享的資料夾。預設為共享所有的資料夾。您可以點選編輯圖示來自訂共享資料夾。",
       children: [{                      
                           type: "note",
                           title: "註",
                           content: "在設備設定部分出現「共享」圖示。 您可以點擊該共享圖示以停用您所不需要的磁碟區。"
                       }]
} ,{                      
                           type: "name",
                           title: "存取驗證",
       content: [ 
                "切換至「開」以啟用驗證功能，這在存取共享資料夾時，會要求使用者輸入使用者名稱與密碼。做為管理員存取的話，可以讀取及修改檔案，否則僅能讀取這些檔案。",
                "使用者名稱必須以英文字母或下底線開頭，長度為1-15個字，除了開頭外可以輸入英文字母、數字或下底線。",
                "密碼應該包含1-15個字元，可以輸入英文字母、數字或下底線。"]
} ,{                      
                           type: "name",
                           title: "啟用媒體共用",
                           content: "透過啟用此功能，所有在區域網路內支援DLNA的設備，可以在所有的共享資料夾存取媒體檔案。不論存取驗證是否啟用，使用者都將不需要輸入使用者名稱與密碼。"
                       }]
},
       BASIC_PRINT_SERVER :{ 
               TITLE:"列印伺服器",
               CONTENT: [{
                           type: "name",
                           title: "列印伺服器",
                           content: "切換至「開」，以啟用列印伺服器功能。"
                       } ,{                      
                           type: "name",
                           title: "印表機名稱",
                           content: "顯示已連接至路由器的印表機名稱。"
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"家長監護",
               CONTENT: [{
                           type: "paragraph",
                           content: "透過家長監護的基本設定，您可以限制某些日期與時間的存取(例如：小孩的電腦，在小孩寫家庭作業的期間內，不能連線至網際網路。)。"
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"家長監護下之設備",
               CONTENT: [{
                           type: "paragraph",
                           content: "此表格顯示目前被家長監護限制的設備的資訊與設定。"
                       } ,{                      
                           type: "step",
                           title: "新增管制設備",
       content: [ 
                "1. 切換至「開」，以啟用家長監護。",
                "2. 點選增加。",
                "3. 點選掃描從存取設備列表中選擇目前已連線的設備；否則請手動輸入設備名稱與MAC位址以增加未連線的設備。",
                "4. 點選生效時間圖示以指定限制應用的時間週期。",
                "5. 請輸入簡短的描述到描述欄位。此欄位為選填。",
                "6. 選擇啟用此項目。",
                "7. 點選 儲存。"]
} ,{                      
                           type: "note",
                           title: "註",
                           content: "如果您要停用此項目，請點選燈泡圖示。"
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"訪客網路",
               CONTENT: [{
                           type: "paragraph",
                           content: "此功能可以讓您為訪客提供Wi-Fi連線，但不暴露主要網路。"
                       } ,{                      
                           type: "name",
                           title: "允許訪客互相存取",
                           content: "勾選此核取方塊，可以讓訪客網路上的無線設備彼此互相溝通，比如可以透過：網路芳鄰、Samba、Ping與FTP。"
                       } ,{                      
                           type: "name",
                           title: "允許訪客存取我的本地網路",
                           content: "勾選此核取方塊，可以讓訪客網路上的無線設備與連接到路由器LAN端或連接到主要網路的設備彼此溝通，比如可以透過：網路芳鄰、Samba、Ping與FTP。"
                       } ,{                      
                           type: "name",
                           title: "啟用訪客網路",
                           content: "勾選選此核取方塊，可以啟用訪客網路功能。"
                       } ,{                      
                           type: "name",
                           title: "無線網路名稱 (SSID)",
                           content: "請您設定32字以內的訪客無線網路名稱 (SSID) ，建議使用英文、數字。"
                       } ,{                      
                           type: "name",
                           title: "隱藏 SSID",
                           content: "如果您要隱藏訪客無線網路名稱 (SSID)，請勾選核取方塊。"
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "密碼更新間隔",
                           content: "請選擇訪客網路密碼的更新間隔。"
                       } ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "密碼",
                           content: "設定密碼，長度為 8 至 63 個 ASCII 字元或 8 至 64 個十六進位字元 (0-9、a-f、A-F)。"
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "密碼",
                           content: "可以使用隨機生成的密碼，或者請輸入8-63位ASCII碼密碼，或者8-64位十六進位碼密碼(0-9, a-f, A-F)。"
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"TP-Link 雲端",
               CONTENT: [{
                           type: "paragraph",
                           content: "TP-Link雲端服務讓您不論何時何地，都可以從網際網路即時遠端監控您的網路，存取與管理您的TP-Link設備。"
                       }]
},
       ACCOUNT_INFO :{ 
               TITLE:"帳號資訊",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示您的TP-Link ID資訊。點選編輯圖示後，您可以編輯該帳號資訊。"
                       }]
},
       DEVICE_INFO :{ 
               TITLE:"設備資訊",
               CONTENT: [{
                           type: "paragraph",
                           content: "顯示您的設備資訊，包含雲端帳號管理中的設備。"
                       }]
},
       BOUND_ACCOUNT :{ 
               TITLE:"綁定的帳號",
               CONTENT: [{
                           type: "paragraph",
                           content: "此表格顯示所有目前綁定到該設備的雲端帳號。"
                       } ,{                      
                           type: "step",
                           title: "若要綁定使用者帳號",
       content: [ 
                "1. 點選「綁定」。",
                "2. 輸入您想要綁定的已註冊的電子郵件。",
                "3. 點選儲存。"]
}]
},
       NEW_PARENTAL_CONTROL :{ 
               TITLE:"家長監護",
               CONTENT: [{
                           type: "paragraph",
                           content: "透過年齡層級過濾器、存取限制以及使用者設定檔，家長監護可以為您的家人提供個人化、適當的網際網路連線。"
                       } ,{                      
                           type: "step",
                           title: "若要套用家長監護到新設備",
       content: [ 
                "1. 點選 增加。",
                "2. 請為設定檔輸入名稱，接著點選「+」以增加在此設定檔下的設備。",
                "3.選擇過濾器層級並根據需要自定義過濾器內容。您可以輸入關鍵字來搜索要在我們的資料庫中過濾的網站。其他網站可以被手動輸入。<br/>對於不同的過濾器類別，請參閱以下說明：<p>成人內容 - 包含色情內容、有害內容或非法內容（包括：色情、暴力和歧視等內容）的網站</p><p>賭博 - 宣傳或提供賭博相關資訊的網站，包括：線上賭博網站</p><p>性教育 - 討論性行為的網站，包括：生殖、性行為、安全性行為和節育、傳染病和應對性傷害。</p><p>線上交談 - 通過文字、語音或視訊（包括：電子郵件、部落格、論壇、VoIP和視訊聊天服務等）與他人溝通的網站</p><p>社群網路 - 個人表達或溝通，根據類似興趣、事業、背景或現實生活中熟悉的人與他們的個人活動相關聯的網站</p><p>付費瀏覽 - 網站、電子郵件或廣告、點擊連結或回複調查</p><p>媒體 - 提供免費、付費或訂閱的影音內容，包括：串流媒體服務、電視節目或音樂下載的網站</p><p>下載 - 提供或接受文件共享和分配權限的網站，包括：點對點共享、線上檔案存儲和行動設備內容（例如：音樂和應用）</p><p>提供或提供對網路託管或可下載遊戲（包括：線上遊戲、遊戲主機網路和網頁遊戲）的訪問</p>",
                "4.如果要限制此設定檔花費在連線的總時間，請啟用並指定時間限制。 您還可以使用「就寢時間」設定此設定檔下的設備無法使用網際網路的時間段。",
                "5. 點選儲存。"]
} ,{                      
                           type: "step",
                           title: "若要查看設定檔的詳細網際網路歷史",
       content: [ 
                "1. 在洞悉欄中，點選對應的洞悉按鈕。",
                "2. 如果您想要看到更多記錄，請點選歷史 <span class=\"ptl-ctr-help-icon history\"></span> 按鈕。",
                "3. 透過點選 <span class=\"ptl-ctr-help-icon block\"></span> 或 <span class=\"ptl-ctr-help-icon unblock\"></span> 按鈕，您可以封鎖或解鎖網站。"]
} ,{                      
                           type: "step",
                           title: "若要立即停用或啟用網際網路存取",
       content: [ 
                "在網際網路存取欄中，點選 <span class=\"ptl-ctr-help-icon stop\"></span> 可以停止對應設定檔的的設備連線至網際網路，而點選 <span class=\"ptl-ctr-help-icon enable\"></span> 則可以再次啟用連線。"]
}]
},
       BASIC_QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (服務品質)功能可以優先化線上活動與設備，以達到當您需要時，保障較快的網路連線。"
                       } ,{                      
                           type: "paragraph",
                           content: "請選擇應用程式優先級為線上活動優化網路速度，並選擇設備優先級為設備優化網路速度。"
                       }]
},
       BASIC_APPLICATION_PRIORITY :{ 
               TITLE:"應用程式優先級",
               CONTENT: [{
                           type: "paragraph",
                           content: "選擇您要優先化的線上活動或點選自訂以設定每個線上活動的優先級層級。"
                       }]
},
       BASIC_DEVICE_PRIORITY :{ 
               TITLE:"設備優先級",
               CONTENT: [{
                           type: "paragraph",
                           content: "選擇您要的設備以優先化它們並決定要優先化多長時間。"
                       } ,{                      
                           type: "step",
                           title: "若要優先化設備",
       content: [ 
                "1. 在列表中找到您要優先化的設備，並開啟優先級開關。",
                "2. 在時間欄中選擇該設備將會被優先化多長時間。"]
}]
},
       ANTI_VIRUS :{ 
               TITLE:"防毒",
               CONTENT: [{
                           type: "paragraph",
                           content: "透過經常地進行網路掃描、惡意網站偵測以及隔離受感染的設備，防毒功能可以保持您個人的資訊安全。您也可以檢查您的網路受到如何的保護，以及您的網路是否曾經遭受到攻擊。"
                       } ,{                      
                           type: "paragraph",
                           content: "歷史 - 記錄設備曾被防毒保護並追尋與分類攻擊。"
                       } ,{                      
                           type: "paragraph",
                           content: "全部啟用 - 如果有一個或更多的保護未啟用，點擊全部啟用可以啟用全部的保護類型。"
                       } ,{                      
                           type: "paragraph",
                           content: "保護類型 - 請參考說明啟用保護類型。我們建議您啟用所有保護類型。"
                       }]
},
       APPLICATION_PRIORITY :{ 
               TITLE:"應用程式優先級",
               CONTENT: [{
                           type: "paragraph",
                           content: "應用程式優先級功能可以優先化線上活動，當您需要時，可以保障較快的網路連線。選擇您要優先化的線上活動或點選自訂以設定每個線上活動的優先級層級。"
                       }]
},
       DEVICE_PRIORITY :{ 
               TITLE:"設備優先級",
               CONTENT: [{
                           type: "paragraph",
                           content: "設備優先級功能可以優化設備，當您需要時，可以保障較快的網路連線。選擇您要的設備以優先化它們並決定要優先化多長時間。"
                       } ,{                      
                           type: "step",
                           title: "若要優先化設備",
       content: [ 
                "1. 在列表中找到您要優先化的設備，並開啟優先級開關。",
                "2. 在時間欄中選擇該設備將會被優先化多長時間。"]
}]
},
       FIREWALL :{ 
               TITLE:"防火牆",
               CONTENT: [{
                           type: "paragraph",
                           content: "SPI(狀態封包檢測)防火牆可以防止網路攻擊，並根據協定驗證通過路由器的流量。 預設情況下，此功能為啟用。"
                       } ,{                      
                           type: "name",
                           title: "啟用SPI防火牆",
                           content: "若非必要，請勿停用SPI防火強。"
                       } ,{                      
                           type: "name",
                           title: "允許來自於WAN連接埠的Ping / 允許來自於LAN連接埠的Ping",
                           content: "啟用允許來自於WAN/LAN連接埠的Ping。建議保留預設設定。"
                       }]
},
       "" :     ""
    };
})(jQuery);
