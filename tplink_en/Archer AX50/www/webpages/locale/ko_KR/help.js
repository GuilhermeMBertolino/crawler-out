(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"인터넷",
               CONTENT: [{
                           type: "paragraph",
                           content: "WAN(인터넷) 연결 관련 정보를 표시합니다."
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"무선 2.4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "무선 네트워크 관련 정보를 표시합니다."
                       }]
},
       STATUS_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "이더넷(LAN) 포트 관련 정보를 확인할 수 있습니다."
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"게스트 네트워트 2.4GHz/5GHz",
               CONTENT: [{
                           type: "paragraph",
                           content: "게스트 무선 네트워크 정보를 표시합니다."
                       }]
},
       STATUS_USB :{ 
               TITLE:"USB 설정",
               CONTENT: [{
                           type: "paragraph",
                           content: "현재 USB 저장 매체 및/또는 USB 포트를 통해 공유기에 연결된 프린터 정보를 표시합니다."
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"성능",
               CONTENT: [{
                           type: "paragraph",
                           content: "현재 공유기의 성능을 표시합니다."
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"유선 클라이언트",
               CONTENT: [{
                           type: "paragraph",
                           content: "네트워크에 연결된 유선 단말기의 정보를 표시합니다."
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"무선 클라이언트",
               CONTENT: [{
                           type: "paragraph",
                           content: "네트워크에 연결된 무선 단말기의 정보를 표시합니다."
                       }]
},
       INTERNET_TITLE :{ 
               TITLE:"인터넷",
               CONTENT: [{
                           type: "paragraph",
                           content: "Configure the IPv4 parameters and select the appropriate MAC Clone method as you need."
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"IPv4",
               CONTENT: [{
                           type: "paragraph",
                           content: "인터넷 연결 형식을 선택하고 해당 정보를 입력하십시오."
                       } ,{                      
                           type: "title",
                            title: "인터넷 회선 유형: 동적IP"
                       } ,{                      
                           type: "paragraph",
                           content: "ISP에서 DHCP 서버 연결을 제공하는 경우, 이 형식을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "IP 주소/서브넷 마스크/기본 게이트웨이/기본 DNS/보조 DNS",
                           content: "해당 정보들은 ISP의 DHCP 서버에서 자동 할당합니다."
                       } ,{                      
                           type: "name",
                           title: "갱신",
                           content: "DHCP 서버에서 새로운 IP 정보를 수신하려면 클릭하십시오."
                       } ,{                      
                           type: "name",
                           title: "해제",
                           content: "DHCP 서버에서 할당한 모든 IP 주소들을 해제하려면 클릭하십시오."
                       } ,{                      
                           type: "name",
                           title: "DNS 주소",
                           content: "인터넷 회선 제공업체가 하나 또는 두 DNS 주소를 제공한다면, 이 확인란을 선택하고 기본 DNS 주소와 보조 DNS 주소를 해당 입력 필드에 입력합니다. 그렇지 않으면, DNS 주소가 인터넷 회선 제공업체에 의해 동적으로 할당됩니다. "
                       } ,{                      
                           type: "name",
                           title: "MTU 크기(바이트단위)",
                           content: "일반적인 MTU(Maximum Transmission Unit) 값은 1500바이트 입니다. 일부 인터넷 회선 업체의 경우 MTU 값의 변경이 요구될 수 있습니다. 이는 드문 경우이지만, 필요하다고 판단되는 경우에만 인터넷 회선 제공업체 확인 후 변경하시기 바랍니다."
                       } ,{                      
                           type: "name",
                           title: "호스트 이름",
                           content: "이 옵션은 공유기의 호스트 이름을 지정합니다."
                       } ,{                      
                           type: "name",
                           title: "Unicast DHCP를 사용하는 IP의 수신",
                           content: "ISP의 DHCP 서버가 방송 애플리케이션을 지원하지 않고 동적IP 주소 수신이 불가능한 경우, 이 체크박스를 선택하십시오."
                       } ,{                      
                           type: "title",
                            title: "인터넷 회선 유형: 고정IP"
                       } ,{                      
                           type: "paragraph",
                           content: "인터넷 회선 제공업체로부터 고정IP 주소, 서브넷 마스크,게이트웨이,DNS 설정 값을 제공받았다면, 고정 IP를 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "IP 주소/서브넷 마스크/기본 게이트웨이/기본 DNS/보조 DNS",
                           content: "ISP에서 제공한 정보를 입력하십시오."
                       } ,{                      
                           type: "name",
                           title: "MTU 크기(바이트단위)",
                           content: "일반적인 MTU(Maximum Transmission Unit) 값은 1500바이트 입니다. 일부 인터넷 회선 업체의 경우 MTU 값의 변경이 요구될 수 있습니다. 이는 드문 경우이지만, 필요하다고 판단되는 경우에만 인터넷 회선 제공업체 확인 후 변경하시기 바랍니다."
                       } ,{                      
                           type: "title",
                            title: "인터넷 회선 유형: BigPond Cable"
                       } ,{                      
                           type: "paragraph",
                           content: "ISP가 BigPond 케이블 연결을 제공하는 경우, 이 형식을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "사용자 이름/비밀번호",
                           content: "ISP에서 제공한 사용자 이름과 암호를 대소문자를 구별하여 입력하십시오. "
                       } ,{                      
                           type: "name",
                           title: "인증 서버",
                           content: "인증 서버 IP 주소 또는 호스트 이름을 입력하십시오."
                       } ,{                      
                           type: "name",
                           title: "인증 도메인",
                           content: "서버의 도메인 이름 접미사를 입력하십시오(위치 기반). 예: VIC/TAS/WA/SA/NT에 대하여 NSW/ACT, vic.bigpond.net.au, QLD에 대하여 qld.bigpond.net.au. "
                       } ,{                      
                           type: "name",
                           title: "MTU 크기(바이트단위)",
                           content: "일반적인 MTU(Maximum Transmission Unit) 값은 1500바이트 입니다. 일부 인터넷 회선 업체의 경우 MTU 값의 변경이 요구될 수 있습니다. 이는 드문 경우이지만, 필요하다고 판단되는 경우에만 인터넷 회선 제공업체 확인 후 변경하시기 바랍니다."
                       } ,{                      
                           type: "name",
                           title: "연결 모드",
                           content: "인터넷 연결을 위한 적합한 연결 모드를 선택하십시오.",
       children: [{                      
                           type: "name",
                           title: "자동",
                           content: "공유기가 연결이 끊긴 후 자동으로 연결합니다."
                       } ,{                      
                           type: "name",
                           title: "요구시 연결",
                           content: "사용자는 지정된 시간 동안(최대 유휴 시간) 인터넷 연결 유지한 후 인터넷 연결을 끊도록 공유기를 설정할 수 있습니다. 만일 사용자의 인터넷 활동이 존재하지 않아 그 연결이 끊겼다면 요구시 연결 은 사용자가 인터넷을 다시 사용하려고할 경우 공유기는 자동으로 사용자의 연결을 재연결 될 수 있도록 합니다. 만일 사용자의 인터넷을 상시 연결상태로 두고 싶다면, 최대 유휴 시간 필드에 0을 입력하십시오. 그렇지 않으면, 사용자 인터넷 연결이 끊어지기까지 유지되는 시간을 입력하십시오."
                       } ,{                      
                           type: "name",
                           title: "수동으로 연결",
                           content: "사용자는 공유기의 연결을 수동으로 관리할 수 있습니다. 일정 시간(최대 유휴 시간)동안 인터넷이 사용되지 않으면 공유기는 사용자의 인터넷 연결을 끊고 사용자가 수동으로 재연결을 하기 전까지는 인터넷 연결이 되지 않습니다. 이 옵션을 사용하려면 \"수동으로 연결\" 라디오 버튼을 클릭하십시오. 만일 사용자의 인터넷을 상시 연결상태로 두고 싶다면, 최대 유휴 시간 필드에 0을 입력하십시오. 그렇지 않으면, 사용자 인터넷 연결이 끊어지기까지 소요되는 시간을 분단위로 입력하십시오."
                       }]
} ,{                      
                           type: "title",
                            title: "인터넷 회선 유형: PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "인터넷 회선 제공업체로 부터 DSL(Digital Subscriber Line)를 받고있다면 PPPoE옵션을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "사용자 이름/비밀번호",
                           content: "ISP에서 제공한 사용자 이름과 암호를 대소문자를 구별하여 입력하십시오. "
                       } ,{                      
                           type: "name",
                           title: "IP 주소/기본 DNS/보조 DNS",
                           content: "해당 정보들은 ISP의 DHCP 서버에서 자동 할당합니다."
                       } ,{                      
                           type: "name",
                           title: "보조 연결(사용안함, 동적 IP, 고정 IP)",
       children: [{                      
                           type: "name",
                           title: "사용안함",
                           content: "이 보조연결은 기본값으로 비활성화되어 있으며, 특별히 보조 연결 수단이 없을 경우 이 설정을 권장합니다."
                       } ,{                      
                           type: "name",
                           title: "동적 IP",
                           content: "IP 주소와 서브넷 마스크는 ISP에 의해 자동으로 할당하는 경우에 선택합니다.",
       children: [{                      
                           type: "name",
                           title: "갱신",
                           content: "ISP의 IP 정보들을 갱신하려면 클릭하십시오."
                       } ,{                      
                           type: "name",
                           title: "해제",
                           content: "할당된 IP 정보를 해제하려면 클릭하십시오."
                       }]
} ,{                      
                           type: "name",
                           title: "고정 IP",
                           content: "ISP에서 IP 주소와 서브넷 마스크를 제공하는 경우 선택하고, 해당 영역에 정보를 입력하십시오."
                       }]
} ,{                      
                           type: "name",
                           title: "MTU 크기(바이트단위)",
                           content: "일반적인 이더넷 네트워크를 위한 MTU(Maximum Transmission Unit) 값이 1480바이트 입니다.",
       children: [{                      
                           type: "note",
                           title: "참고:",
                           content: "ISP가 네트워크 성능을 위해 MTU 크기 조정을 요구할 수 있습니다. 반드시 필요한 경우가 아니라면 크기 값을 변경해야 합니다."
                       }]
} ,{                      
                           type: "name",
                           title: "서비스 이름/Access Concentrator 이름",
                           content: "기본값으로, 서비스 이름(Service Name)과 액세스 집중장치(Access Concentrator, AC) 이름은 입력되어 있지 않습니다. ISP가 요구하지 않는 이상, 해당 영역을 설정하지 않아야 합니다. "
                       } ,{                      
                           type: "name",
                           title: "온라인 간격 탐지",
                           content: "공유기가 액세스 컨센트레이터를 탐지하는 시간 간격을 0부터 120(초 단위) 사이의 값으로 입력합니다. 기본값은 10입니다."
                       } ,{                      
                           type: "name",
                           title: "IP 주소",
                           content: "ISP가 특정 (고정) IP 주소를 제공하는 경우 고정 IP를 선택하고 영역에 IP 주소를 입력하십시오. 또는 ISP에서IP를 동적으로 제공할 경우 동적IP를 선택하시면 ISP에서 IP를 자동으로 제공합니다."
                       } ,{                      
                           type: "name",
                           title: "DNS 주소",
                           content: "ISP가 특정 (고정) DNS IP 주소를 제공하는 경우, '다음 DNS 주소 사용'을 선택하고 기본 DNS 영역과 보조 DNS 영역에 각각 주소를 입력하십시오. 또는, 'ISP에서 동적으로 수신하기'를 선택하여 서버 할당된 DNS IP 주소를 자동으로 가져올 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "연결 모드",
                           content: "인터넷 연결을 위한 적합한 연결 모드를 선택하십시오.",
       children: [{                      
                           type: "name",
                           title: "자동",
                           content: "공유기가 연결이 끊긴 후 자동으로 연결합니다."
                       } ,{                      
                           type: "name",
                           title: "요구시 연결",
                           content: "사용자는 지정된 시간 동안(최대 유휴 시간) 인터넷 연결 유지한 후 인터넷 연결을 끊도록 공유기를 설정할 수 있습니다. 만일 사용자의 인터넷 활동이 존재하지 않아 그 연결이 끊겼다면 요구시 연결 은 사용자가 인터넷을 다시 사용하려고할 경우 공유기는 자동으로 사용자의 연결을 재연결 될 수 있도록 합니다. 만일 사용자의 인터넷을 상시 연결상태로 두고 싶다면, 최대 유휴 시간 필드에 0을 입력하십시오. 그렇지 않으면, 사용자 인터넷 연결이 끊어지기까지 유지되는 시간을 입력하십시오."
                       } ,{                      
                           type: "name",
                           title: "시간 기반 연결",
                           content: "사용자는 시간을 기반으로 공유기가 연결하거나 연결을 끊도록 구성할 수 있습니다. 시간의 주기 필드에 연결을 위한 시작 시간을 HH-MM 형식으로 입력하고, 연결 차단을 위한 종료 시간을 HH-MM 형식으로 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "수동으로 연결",
                           content: "사용자는 공유기의 연결을 수동으로 관리할 수 있습니다. 일정 시간(최대 유휴 시간)동안 인터넷이 사용되지 않으면 공유기는 사용자의 인터넷 연결을 끊고 사용자가 수동으로 재연결을 하기 전까지는 인터넷 연결이 되지 않습니다. 이 옵션을 사용하려면 \"수동으로 연결\" 라디오 버튼을 클릭하십시오. 만일 사용자의 인터넷을 상시 연결상태로 두고 싶다면, 최대 유휴 시간 필드에 0을 입력하십시오. 그렇지 않으면, 사용자 인터넷 연결이 끊어지기까지 소요되는 시간을 분단위로 입력하십시오."
                       } ,{                      
                           type: "note",
                           title: "참고:",
                           content: "사용자가 시스템 도구 -> 시간 설정 페이지에서 시스템 시간을 설정했을 때만, 시간-기반 연결 기능이 구동할 수 있습니다."
                       }]
} ,{                      
                           type: "title",
                            title: "인터넷 회선 유형: L2TP/PPTP"
                       } ,{                      
                           type: "paragraph",
                           content: "인터넷 회선 제공업체로 부터 L2TP 서비스를 받고 있다면, L2TP 옵션을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "사용자 이름/비밀번호",
                           content: "ISP에서 제공한 사용자 이름과 암호를 대소문자를 구별하여 입력하십시오. "
                       } ,{                      
                           type: "name",
                           title: "IP 주소/기본 DNS/보조 DNS",
                           content: "해당 정보들은 ISP의 DHCP 서버에서 자동 할당합니다."
                       } ,{                      
                           type: "name",
                           title: "보조 연결 (동적 IP 또는 고정 IP)",
       children: [{                      
                           type: "name",
                           title: "동적 IP",
                           content: "IP 주소와 서브넷 마스크는 ISP에 의해 자동으로 할당하는 경우에 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "고정 IP",
                           content: "ISP에서 IP 주소, 서브넷 마스크, 게이트웨이, DNS 주소 등을 제공하는 경우 선택하고, 해당 영역에 정보를 입력하십시오."
                       }]
} ,{                      
                           type: "name",
                           title: "VPN 서버 IP/도메인 이름",
                           content: "ISP에서 제공하는 VPN 서버의 IP 주소 또는 도메인 이름을 입력하십시오."
                       } ,{                      
                           type: "name",
                           title: "MTU 크기(바이트단위)",
                           content: "대부분의 이더넷 네트워크의 기본 및 전형적인 MTU(최대송신단위) 크기는 L2TP의 경우 1460 바이트, PPTP의 경우 1420 바이트입니다. ISP가 요구하는 경우가 아니면, 기본 MTU 크기를 변경하지 말 것을 권장합니다."
                       } ,{                      
                           type: "name",
                           title: "연결 모드",
                           content: "인터넷 연결을 위한 적합한 연결 모드를 선택하십시오.",
       children: [{                      
                           type: "name",
                           title: "자동",
                           content: "공유기가 연결이 끊긴 후 자동으로 연결합니다."
                       } ,{                      
                           type: "name",
                           title: "요구시 연결",
                           content: "사용자는 지정된 시간 동안(최대 유휴 시간) 인터넷 연결 유지한 후 인터넷 연결을 끊도록 공유기를 설정할 수 있습니다. 만일 사용자의 인터넷 활동이 존재하지 않아 그 연결이 끊겼다면 요구시 연결 은 사용자가 인터넷을 다시 사용하려고할 경우 공유기는 자동으로 사용자의 연결을 재연결 될 수 있도록 합니다. 만일 사용자의 인터넷을 상시 연결상태로 두고 싶다면, 최대 유휴 시간 필드에 0을 입력하십시오. 그렇지 않으면, 사용자 인터넷 연결이 끊어지기까지 유지되는 시간을 입력하십시오."
                       } ,{                      
                           type: "name",
                           title: "수동으로 연결",
                           content: "사용자는 공유기의 연결을 수동으로 관리할 수 있습니다. 일정 시간(최대 유휴 시간)동안 인터넷이 사용되지 않으면 공유기는 사용자의 인터넷 연결을 끊고 사용자가 수동으로 재연결을 하기 전까지는 인터넷 연결이 되지 않습니다. 이 옵션을 사용하려면 \"수동으로 연결\" 라디오 버튼을 클릭하십시오. 만일 사용자의 인터넷을 상시 연결상태로 두고 싶다면, 최대 유휴 시간 필드에 0을 입력하십시오. 그렇지 않으면, 사용자 인터넷 연결이 끊어지기까지 소요되는 시간을 분단위로 입력하십시오."
                       }]
}]
},
       INTERNET_MAC :{ 
               TITLE:"MAC 클론",
               CONTENT: [{
                           type: "paragraph",
                           content: "Select the appropriate MAC Clone method as you need."
                       } ,{                      
                           type: "name",
                           title: "MAC 주소를 복제하지 마십시오",
                           content: "ISP가 MAC 주소에 할당된 IP 주소를 바인딩 하지 않는 경우 공유기의 기본 MAC 주소를 변경하지 마십시오."
                       } ,{                      
                           type: "name",
                           title: "현재 컴퓨터 MAC 주소를 복제",
                           content: "인터넷 서비스 제공업체가 사용자의 랜카드의 MAC 주소 등록을 요청했을 경우, 공유기에 연결된 컴퓨터의 현재 MAC 주소하기를 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "사용자 PC의 MAC 주소",
                           content: "인터넷 서비스 제공업체가 특정 MAC 주소에 IP 주소를 할당하는 경우, 수동으로 MAC 주소를 입력하십시오."
                       }]
},
       INTERNET_WAN_AGGREGATION :{ 
               TITLE:"WAN 애그리게이션",
               CONTENT: [{
                           type: "paragraph",
                           id: "internet_wan_aggregation_detail",
                           content: "WAN 애그리게이션 은 LAN1 포트를 추가 WAN 포트로 변환하고 단일 고 대역폭 데이터 경로를 만듭니다. 1Gbps 이상의 대역폭 속도를 제공하며 더 이상 네트워크 하드웨어로 인해 제한받지 않는 ISP의 고속 인터넷을 사용하십시오."
                       } ,{                      
                           type: "note",
                           id: "internet_wan_aggregation_note",
                           title: "참고:",
                           content: "이 기능을 활성화하기 전에 ISP가 WAN 애그리게이션 를 지원하고 모뎀에 2 개의 WAN 포트가 있는지 확인하십시오."
                       } ,{                      
                           type: "step",
                           title: "WAN 어그리게이션 를 적용합니다",
       content: [ 
                "\"1. WAN 애그리게이션 를 토글하여 활성화하십시오.\"",
                "\"2. 저장을 클릭하십시오.\"",
                "\"3. 공유기의 WAN 포트와 LAN1 포트를 두 개의 이더넷 케이블로 모뎀의 두 WAN 포트에 연결하십시오.\""]
}]
},
       LAN_IPV4 :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "공유기의 MAC 주소, IP 주소, 서브넷 마스크를 표시합니다. "
                       } ,{                      
                           type: "name",
                           title: "MAC 주소",
                           content: "공유기 LAN에 할당된 물리적 주소."
                       } ,{                      
                           type: "name",
                           title: "IP 주소",
                           content: "공유기의 웹 관리 페이지 로그인 시 사용되는 공유기의 기본 IP 주소를 표시합니다. 변경이 가능합니다. "
                       } ,{                      
                           type: "name",
                           title: "서브넷 마스크",
                           content: "LAN 포트가 내부 및 외부 트래픽을 라우팅하는 데 사용되는 할당된 식별자를 선택하고 새로운 서브넷 마스크를 입력하십시오. "
                       } ,{                      
                           type: "note",
                           title: "참고:",
                           content: "만약 사용자가 LAN IP 주소를 변경할 경우, 라우터에 로그인 하려면 새 IP 주소를 사용해야 합니다. 사용자가 설정한 새 LAN IP 주소가 이전과 같은 서브넷에 있지 않으면, DHCP 서버의 IP 주소는 자동으로 구성되지만, 포트 포워딩 및 DMZ 호스트 주소는 자동으로 재구성 되지 않습니다."
                       }]
},
       LINK_AGG :{ 
               TITLE:"링크 어그리게이션",
               CONTENT: [{
                           type: "paragraph",
                           content: "링크 어그리게이션은 두 개의 포트를 결합하여 하나의 고 대역폭 데이터 경로를 만들어 고속 및 안정적인 유선 네트워크를 유지합니다."
                       } ,{                      
                           type: "step",
                           id: "link_agg_step_help",
                           title: "링크 어그리게이션를 적용합니다 :",
       content: [ 
                "1. 링크 집계 기능을 사용하려면 켜십시오.",
                "2. 링크 집계에 대해 두 개의 포트를 지정하십시오.",
                "3. 저장을 클릭하십시오. "]
}]
},
       IPTV :{ 
               TITLE:"IPTV",
               CONTENT: [{
                           type: "paragraph",
                           content: "IPTV란, LAN 또는 인터넷과 같이 패킷 스위치된 네트워크를 통해 인터넷 프로토콜 스위트를 사용하여 TV 서비스를 제공하는 시스템입니다. "
                       } ,{                      
                           type: "name",
                           id: "igmp-snooping",
                           title: "IGMP 스누핑",
                           content: "IGMP (인터넷 그룹 관리 프로토콜) 스누핑 기능을 요청한 포트에만 멀티 캐스트 트래픽을 전달 할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "IGMP 프록시",
                           content: "ISP에서 제공하는 IPTV 서비스가 IGMP 기술 기반인 경우, IGMP 프록시 기능 활성화를 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "IGMP 버전",
                           content: "당신의 통신사에 따라 IGMP 버전을 선택합니다. 기본 IGMP 버전 V2입니다."
                       } ,{                      
                           type: "name",
                           id: "igmp-wifi",
                           title: "무선 멀티캐스트 전송",
                           content: "무선 멀티캐스트 포워드 기능 활성화를 선택하면 멀티캐스트 패킷이 무선 네트워크로 포워드 됩니다. "
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "ISP에서 제공하는 IPTV 서비스가 IGMP 기술 기반이 아닌 경우, IPTV 기능 활성화를 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "ISP 프로필",
                           content: "세 가지 유형을 있으며 해당 ISP (인터넷 서비스 제공자)의 프로필을 선택 :",
       children: [{                      
                           type: "name",
                           title: "국가 - ISP 이름",
                           content: "기본 설정으로 ISP 프로파일의 형식은 \"국가-ISP 이름\"에. 간단하게 찾아 드롭 다운 목록에서 ISP를 선택합니다."
                       } ,{                      
                           type: "name",
                           id: "iptv_bridge_child_1to4",
                           title: "브리지",
                           content: "당신의 ISP가 나열되지 않고 다른 매개 변수가 IPTV를 설정하는 데 필요하지 않으면, 당신은 단순히이 프로파일을 선택하고 IPTV 전용 LAN 포트를 지정할 수 있습니다.",
       children: [{                      
                           type: "name",
                           title: "LAN1 / LAN2 / LAN3 / LAN4",
                           content: "LAN 포트는 송신되는 데이터의 종류를 지정 IPTV LAN1가 선택된 경우, 예를 들어, IPTV는 데이터를 송신되며 LAN1로 셋톱 박스를 연결합니다."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_2to5",
                           title: "브리지",
                           content: "당신의 ISP가 나열되지 않고 다른 매개 변수가 IPTV를 설정하는 데 필요하지 않으면, 당신은 단순히이 프로파일을 선택하고 IPTV 전용 LAN 포트를 지정할 수 있습니다.",
       children: [{                      
                           type: "name",
                           title: "LAN2 / LAN3 / LAN4 / LAN5",
                           content: "LAN 포트가 전송할 데이터 종류를 지정하십시오. 예를 들어 LAN2에 IPTV가 선택되면 IPTV 데이터 만 전송되므로 셋톱 박스를 LAN2에 연결해야합니다."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_5to8",
                           title: "브리지",
                           content: "당신의 ISP가 나열되지 않고 다른 매개 변수가 IPTV를 설정하는 데 필요하지 않으면, 당신은 단순히이 프로파일을 선택하고 IPTV 전용 LAN 포트를 지정할 수 있습니다.",
       children: [{                      
                           type: "name",
                           title: "LAN5 / LAN6 / LAN7 / LAN8",
                           content: "LAN 포트가 전송할 데이터 종류를 지정하십시오. 예를 들어 LAN5에 IPTV가 선택되면 IPTV 데이터 만 전송되므로 셋톱 박스를 LAN5에 연결해야합니다."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_1to4",
                           title: "커스텀",
                           content: "고객님 쓰시는 통신사가 나열되지 않지만 인터넷의 VoIP / IPTV VLAN ID와 우선 순위 등 일부 필요한 매개 변수를 제공하는 경우,이 프로파일을 선택합니다.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Priority",
                           content: "ISP에서 제공하는 VLAN ID와 우선순위를 설정하십시오."
                       } ,{                      
                           type: "name",
                           title: "802.11Q 태그",
                           content: "802.11Q 인터넷 패킷의 태그 여부를 위해 선택해 주십시오."
                       } ,{                      
                           type: "name",
                           title: "IPTV 멀티캐스트 VLAN ID/Priority",
                           content: "IPTV 멀티캐스트 기능을 활성화하고, ISP에 따라 VLAN ID와 우선순위를 설정할 수 있습니다. "
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN1 / LAN2 / LAN3 / LAN4",
                           content: "LAN 포트는 송신되는 데이터의 종류를 지정 IPTV LAN1가 선택된 경우, 예를 들어, IPTV는 데이터를 송신되며 LAN1로 셋톱 박스를 연결합니다."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_2to5",
                           title: "커스텀",
                           content: "고객님 쓰시는 통신사가 나열되지 않지만 인터넷의 VoIP / IPTV VLAN ID와 우선 순위 등 일부 필요한 매개 변수를 제공하는 경우,이 프로파일을 선택합니다.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Priority",
                           content: "ISP에서 제공하는 VLAN ID와 우선순위를 설정하십시오."
                       } ,{                      
                           type: "name",
                           title: "802.11Q 태그",
                           content: "802.11Q 인터넷 패킷의 태그 여부를 위해 선택해 주십시오."
                       } ,{                      
                           type: "name",
                           title: "IPTV 멀티캐스트 VLAN ID/Priority",
                           content: "IPTV 멀티캐스트 기능을 활성화하고, ISP에 따라 VLAN ID와 우선순위를 설정할 수 있습니다. "
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN2 / LAN3 / LAN4 / LAN5",
                           content: "LAN 포트가 전송할 데이터 종류를 지정하십시오. 예를 들어 LAN2에 IPTV가 선택되면 IPTV 데이터 만 전송되므로 셋톱 박스를 LAN2에 연결해야합니다."
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_5to8",
                           title: "커스텀",
                           content: "고객님 쓰시는 통신사가 나열되지 않지만 인터넷의 VoIP / IPTV VLAN ID와 우선 순위 등 일부 필요한 매개 변수를 제공하는 경우,이 프로파일을 선택합니다.",
       children: [{                      
                           type: "name",
                           title: "Internet/VoIP/IPTV VLAN ID/Priority",
                           content: "ISP에서 제공하는 VLAN ID와 우선순위를 설정하십시오."
                       } ,{                      
                           type: "name",
                           title: "802.11Q 태그",
                           content: "802.11Q 인터넷 패킷의 태그 여부를 위해 선택해 주십시오."
                       } ,{                      
                           type: "name",
                           title: "IPTV 멀티캐스트 VLAN ID/Priority",
                           content: "IPTV 멀티캐스트 기능을 활성화하고, ISP에 따라 VLAN ID와 우선순위를 설정할 수 있습니다. "
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN5 / LAN6 / LAN7 / LAN8",
                           content: "LAN 포트가 전송할 데이터 종류를 지정하십시오. 예를 들어 LAN5에 IPTV가 선택되면 IPTV 데이터 만 전송되므로 셋톱 박스를 LAN5에 연결해야합니다."
                       }]
}]
}]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"DHCP 서버",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "서버 기능의 사용 여부를 설정합니다. 사용함 또는 사용안함 중 선택하십시오.",
                "만일 사용자가 서버를 사용안함으로 설정할 경우 사용자 네트워크 상에 또 다른 DHCP 서버가 있거나 그렇지 않으면 컴퓨터의 IP 주소를 수동으로 설정해야 합니다."]
} ,{                      
                           type: "name",
                           title: "시작 IP 주소",
                           content: "클라이언트에게 임대할 수 있는 IP 주소의 범위를 입력하십시오."
                       } ,{                      
                           type: "name",
                           title: "주소 임대 시간",
                           content: "클라이언트의 IP 주소 임대 기간을 입력하십시오(1~2880분). 기본값은 120입니다."
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"주소 예약",
               CONTENT: [{
                           type: "paragraph",
                           content: "IP가 예약된 단말기들의 해당 정보를 표시합니다."
                       } ,{                      
                           type: "step",
                           title: "IP 주소 예약하기",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2. 스캔을 클릭하면 DHCP 클라이언트 목록에서 현재 연결되어 있는 단말기를 선택할 수 있습니다. 또는, MAC 주소 영역에는 필요한 클라이언트의 MAC 주소를 입력하고 IP 주소 영역에는 클라이언트를 위해 예비해 두고자 하는 IP 주소를 입력합니다. ",
                "3. 설명 영역에 클라이언트에 대한 설명을 입력합니다. ",
                "4. 상태 사용함을 선택하십시오.",
                "5. 저장을 클릭합니다."]
} ,{                      
                           type: "note",
                           title: "참고:",
                           content: "해당 입력값을 비활성화 하려면 전구 아이콘을 클릭하십시오."
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"DHCP 클라이언트 목록",
               CONTENT: [{
                           type: "paragraph",
                           content: "현재 연결되어 있는 단말기의 정보를 표시합니다."
                       }]
},
       DDNS :{ 
               TITLE:"동적 DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "동적 DNS를 적용하면, 고정 호스트와 도메인 이름을 동적 인터넷 IP 주소에 할당할 수 있습니다. 자체 웹사이트, FTP 서버나 공유기 뒤에 또 다른 서버 등을 관리하고 있는 경우 유용합니다. 먼저, www.dyndns.com과 같은 동적 DNS 서비스 제공업체에 가입하십시오."
                       } ,{                      
                           type: "step",
                           title: "동적 DNS 설정하기",
       content: [ 
                "1. 동적 DNS 서비스 공급자를 선택하십시오. ",
                "2. 동적 DNS 계정의 사용자 이름과 암호를 입력하십시오.",
                "3. 동적 DNS 서비스 제공자로부터 받은 도메인 이름을 입력하십시오.",
                "4. 아래 목록에서 업데이트 간격을 선택하십시오.",
                "5. 서비스 제공자가 NO-IP인 경우, WAN IP Binding을 통해 도메인 이름이 해당 공유기의 WAN IP에 연결되도록 할 수 있습니다.",
                "6. 로그인과 저장을 클릭하십시오. "]
} ,{                      
                           type: "note",
                           title: "참고:",
                           content: "신규 DDNS 계정을 사용하고자 하는 경우, 로그아웃한 뒤 신규 계정으로 로그인 하십시오."
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"동적 DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "동적 DNS를 적용하면, 고정 호스트와 도메인 이름을 동적 인터넷 IP 주소에 할당할 수 있습니다. 자체 웹사이트, FTP 서버나 공유기 뒤에 또 다른 서버 등을 관리하고 있는 경우 유용합니다. 먼저, www.dyndns.com과 같은 동적 DNS 서비스 제공업체에 가입하십시오."
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"도메인 이름 목록",
               CONTENT: [{
                           type: "paragraph",
                           content: "이 표는 사용자 클라우드 계정으로 등록된 모든 도메인 이름의 정보를 표시합니다. "
                       } ,{                      
                           type: "step",
                           title: "신규 도메인 이름 등록",
       content: [ 
                "1. 등록을 클릭하십시오. ",
                "2. 등록하고자 하는 도메인 이름을 입력하십시오. ",
                "3. 저장을 클릭하십시오. "]
}]
},
       ADVANCED_ROUTING_STATIC_ROUTING :{ 
               TITLE:"고정 라우팅",
               CONTENT: [{
                           type: "paragraph",
                           content: "고정 라우트는 특정한 호스트나 네트워크에 도달하기 위해서 사전에 정해진 경로 정보를 의미합니다."
                       } ,{                      
                           type: "step",
                           title: "고정 라우팅 설정하기",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2. 네트워크 목적지 영역에 IP 주소를 입력하여 해당 입력값의 고정IP를 할당하십시오.",
                "3. 서브넷 마스크 영역에 서브넷 마스크를 입력하여 IP 주소의 네트워크 부분 및 호스트 부분을 지정하십시오. ",
                "4. 기본 게이트웨이 영역에 게이트웨이 IP 주소를 입력하여 공유기를 네트워크 또는 호스트와 연결하십시오.",
                "5. 인터페이스 영역에서 LAN 또는 WAN을 선택하여 네트워크 목적지의 유형을 지정하십시오. ",
                "6. 해당 입력값에 대한 간략한 설명을 입력하십시오.",
                "7. 활성화 버튼을 선택하십시오.",
                "8. 저장을 클릭하십시오. "]
} ,{                      
                           type: "note",
                           title: "참고:",
                           content: "해당 입력값을 비활성화 하려면 전구 아이콘을 클릭하십시오."
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"시스템 라우팅 테이블",
               CONTENT: [{
                           type: "paragraph",
                           content: "현재 사용중인 모든 유효한 경로를 표시합니다."
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"무선 설정",
               CONTENT: [{
                           type: "paragraph",
                           content: "무선 환경설정을 필요에 맞게 설정하십시오."
                       }]
},
       OFDMA :{ 
               TITLE:"OFDMA",
               CONTENT: [{
                           type: "paragraph",
                           content: "OFDMA를 사용하면 여러 사용자가 동시에 데이터를 전송할 수 있으므로 속도와 효율성이 크게 향상됩니다. 클라이언트에서 마찬가지로 OFDMA를 지원하면 해당 기능을 완벽하게 누릴 수 있습니다."
                       }]
},
       WIRELESS_SMART_CONNECT :{ 
               TITLE:"Smart Connect",
               CONTENT: [{
                           type: "paragraph",
                           content: "이 체크박스에 표시하면 SmartConnect를 선택하게 됩니다. 이 기능은 실제 상황에 따라 최적의 무선 대역폭을 할당해 네트워크 수요의 균형을 맞춤으로써 장치가 더 빨리 작동되도록 하는 기능입니다."
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"무선 2.4GHz",
               CONTENT: [{
                           type: "name",
                           title: "네트워크 이름(SSID)",
                           content: "네트워크 이름(SSID)을 변경할 것을 권장합니다. 대소문자를 구별합니다."
                       } ,{                      
                           type: "name",
                           title: "SSID 숨기기",
                           content: "2.4GHz 네트워크 이름(SSID)을 무선 네트워크 목록에서 숨기고자 하는 경우 선택합니다. 선택하는 경우, SSID는 방송되지 않고 무선 연결을 수동으로 진행해야 합니다. "
                       } ,{                      
                           type: "name",
                           title: "보안",
                           content: "다음 중 하나의 보안 옵션을 선택해 주십시오.",
       children: [{                      
                           type: "name",
                           title: "비활성화 보안",
                           content: "이 옵션을 선택하는 경우 무선 보안을 비활성화 할 수 있습니다. 권장 사항이 아닙니다. "
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-개인",
                           content: "이 옵션을 선택하는 경우 무선 보안을 활성화 할 수 있습니다. 무단 접근으로부터 무선 네트워크를 보호할 수 있으므로 적극 권장됩니다. 옵션 선택 시, 설정 대상은 다음과 같습니다. ",
       children: [{                      
                           type: "name",
                           title: "버전",
                           content: "보안 버전을 선택하십시오. 보안 버전을 선택하십시오. WPA2-PSK가 보안성이 좋습니다. 잘 모르겠다면, '자동'을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "암호화",
                           content: "보안 암호화 형식을 선택하십시오. AES가 보안성이 좋습니다. 공유기가 802.11n 모드에서 작동하는 경우, TKIP 암호화를 사용하지 말 것을 권장합니다. 또한, TKIP 사용은 WPA 기능을 비활성화 합니다. 잘 모르겠다면, '자동'을 선택하십시오. "
                       } ,{                      
                           type: "name",
                           title: "비밀번호",
                           content: "사용자는 ASCII 또는 16진수 문자를 입력할 수 있습니다. 16진수의 경우 그 길이가 8자와 64자 사이여야 하고, ASCII의 경우 그 길이가 8자와 63자 사이여야 합니다."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-기업",
                           content: "RADIUS 서버 기반 WPA 보안을 사용합니다.",
       children: [{                      
                           type: "name",
                           title: "버전",
                           content: "보안 버전을 선택하십시오. WPA2가 보안성이 좋습니다. 잘 모르겠다면, '자동'을 선택하십시오. "
                       } ,{                      
                           type: "name",
                           title: "암호화",
                           content: "보안 암호화 형식을 선택하십시오. AES가 보안성이 좋습니다. 공유기가 802.11n 모드에서 작동하는 경우, TKIP 암호화를 사용하지 말 것을 권장합니다. 또한, TKIP 사용은 WPA 기능을 비활성화 합니다. 잘 모르겠다면, '자동'을 선택하십시오. "
                       } ,{                      
                           type: "name",
                           title: "RADIUS 서버 IP",
                           content: "RADIUS 서버의 IP 주소를 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "RADIUS 포트",
                           content: "RADIUS 서버의 포트 번호를 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "RADIUS 비밀번호",
                           content: "RADIUS 서버의 비밀번호를 입력합니다."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "클라이언트 장치 중 하나가 WEP (Wired Equivalent Privacy)를 사용하여 무선에만 액세스 할 수있는 경우 기본 인증 방법을 사용하려면이 옵션을 선택합니다. 이 옵션을 선택하면 WPS 기능이 비활성화됩니다.",
       children: [{                      
                           type: "name",
                           title: "타입",
                           content: "무선 네트워크의 인증 형식을 선택하십시오. 잘 모르겠다면, '자동'을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "WEP 키 형식",
                           content: "ASCII 또는 16진수 형식을 사용할 수 있습니다. ASCII 형식은 지정된 길이의 입력 가능한 키보드 문자의 모든 조합을 의미합니다. 16진수 형식은 지정된 길이의 16진수 숫자(0-9, a-f, A-F)의 모든 조합을 의미합니다."
                       } ,{                      
                           type: "name",
                           title: "키 타입",
                           content: "보안 유형에 따라서 사용자는 WEP 키 길이(64-bit, 또는 128-bit, 또는152-bit)을 선택할 수 있습니다. \"사용안함\" WEP 키 항목을 사용안함을 의미합니다.",
       children: [{                      
                           type: "name",
                           title: "64-bit 암호화",
                           content: "사용자는 10 자리의 16진수나 (0-9, a-f, A-F의 모든 조합, NULL 키는 허용되지 않음) 또는 5자의 ASCII 문자를 입력할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "128-bit 암호화",
                           content: "사용자는 26자리의 16진수나 (0-9, a-f, A-F의 모든 조합, NULL 키는 허용되지 않음) 또는 13자의 ASCII 문자를 입력할 수 있습니다."
                       }]
} ,{                      
                           type: "name",
                           title: "키 값",
                           content: "WEP 키를 각 필드에 입력합니다."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "채널",
                           content: "2.4GHz 무선 네트워크에 대한 운영 채널을 선택합니다. 간헐적으로 무선 연결 문제가 발생하지 않을 경우, 채널 설정을 자동으로 두시는 것이 좋습니다."
                       } ,{                      
                           type: "name",
                           title: "전송 파워",
                           content: "무선 공유기의 전송 파워를 지정합니다. 고/중/저 중에서 원하는 것을 선택할 수 있습니다. 기본 설정값은 \"고\" 이며, 이 값을 권장합니다."
                       } ,{                      
                           type: "name",
                           id: "atf_2g4",
                           title: "Airtime Fairness 기능",
                           content: "에어타임 페어니스(Airtime Fairness, ATF) 기능을 사용하려면 체크박스를 클릭해 활성화하세요. 각 디바이스의 사용 시간을 일정하게 할당해 공유기의 트래픽을 줄여줍니다."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_2g4",
                           title: "멀티 사용자 MIMO 기능",
                           content: "멀티유저 MIMO 기능을 사용하려면 클릭하세요."
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"무선 5GHz",
               CONTENT: [{
                           type: "name",
                           title: "네트워크 이름(SSID)",
                           content: "네트워크 이름(SSID)을 변경할 것을 권장합니다. 대소문자를 구별합니다."
                       } ,{                      
                           type: "name",
                           title: "SSID 숨기기",
                           content: "5GHz 네트워크 이름(SSID)을 무선 네트워크 목록에서 숨기고자 하는 경우 선택하십시오. 선택하는 경우, SSID가 방송되지 않고 무선 연결을 수동으로 진행해야 합니다. "
                       } ,{                      
                           type: "name",
                           title: "보안",
                           content: "다음 중 하나의 보안 옵션을 선택해 주십시오.",
       children: [{                      
                           type: "name",
                           title: "비활성화 보안",
                           content: "이 옵션을 선택하는 경우 무선 보안을 비활성화 할 수 있습니다. 권장 사항이 아닙니다. "
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-개인",
                           content: "이 옵션을 선택하면 무선 보안이 활성화 됩니다. 무단 접근으로부터 무선 네트워크를 보호할 것을 적극 권장합니다. 옵션 선택 시 설정 대상은 다음과 같습니다. ",
       children: [{                      
                           type: "name",
                           title: "버전",
                           content: "보안 버전을 선택하십시오. WPA2-PSK가 보안성이 좋습니다. 잘 모르겠다면, '자동'을 선택하십시오. "
                       } ,{                      
                           type: "name",
                           title: "암호화",
                           content: "보안 암호화 형식을 선택하십시오. AES가 보안성이 좋습니다. 공유기가 802.11n 모드에서 작동하는 경우, TKIP 암호화를 사용하지 말 것을 권장합니다. 또한, TKIP 사용은 WPA 기능을 비활성화 합니다. 잘 모르겠다면, '자동'을 선택하십시오. "
                       } ,{                      
                           type: "name",
                           title: "비밀번호",
                           content: "사용자는 ASCII 또는 16진수 문자를 입력할 수 있습니다. 16진수의 경우 그 길이가 8자와 64자 사이여야 하고, ASCII의 경우 그 길이가 8자와 63자 사이여야 합니다."
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2-기업",
                           content: "RADIUS 서버 기반 WPA 보안을 사용합니다.",
       children: [{                      
                           type: "name",
                           title: "버전",
                           content: "보안 버전을 선택하십시오. WPA2가 보안성이 좋습니다. 잘 모르겠다면, '자동'을 선택하십시오. "
                       } ,{                      
                           type: "name",
                           title: "암호화",
                           content: "보안 암호화 형식을 선택하십시오. AES가 보안성이 좋습니다. 공유기가 802.11n 모드에서 작동하는 경우, TKIP 암호화를 사용하지 말 것을 권장합니다. 또한, TKIP 사용은 WPA 기능을 비활성화 합니다. 잘 모르겠다면, '자동'을 선택하십시오. "
                       } ,{                      
                           type: "name",
                           title: "RADIUS 서버 IP",
                           content: "RADIUS 서버의 IP 주소를 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "RADIUS 포트",
                           content: "RADIUS 서버의 포트 번호를 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "RADIUS 비밀번호",
                           content: "RADIUS 서버의 비밀번호를 입력합니다."
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "클라이언트 장치 중 하나가 WEP (Wired Equivalent Privacy)를 사용하여 무선에만 액세스 할 수있는 경우 기본 인증 방법을 사용하려면이 옵션을 선택합니다. 이 옵션을 선택하면 WPS 기능이 비활성화됩니다.",
       children: [{                      
                           type: "name",
                           title: "타입",
                           content: "무선 네트워크의 인증 형식을 선택하십시오. 잘 모르겠다면, '자동'을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "WEP 키 형식",
                           content: "ASCII 또는 16진수 형식을 사용할 수 있습니다. ASCII 형식은 지정된 길이의 입력 가능한 키보드 문자의 모든 조합을 의미합니다. 16진수 형식은 지정된 길이의 16진수 숫자(0-9, a-f, A-F)의 모든 조합을 의미합니다."
                       } ,{                      
                           type: "name",
                           title: "키 타입",
                           content: "보안 유형에 따라서 사용자는 WEP 키 길이(64-bit, 또는 128-bit, 또는152-bit)을 선택할 수 있습니다. \"사용안함\" WEP 키 항목을 사용안함을 의미합니다.",
       children: [{                      
                           type: "name",
                           title: "64-bit 암호화",
                           content: "사용자는 10 자리의 16진수나 (0-9, a-f, A-F의 모든 조합, NULL 키는 허용되지 않음) 또는 5자의 ASCII 문자를 입력할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "128-bit 암호화",
                           content: "사용자는 26자리의 16진수나 (0-9, a-f, A-F의 모든 조합, NULL 키는 허용되지 않음) 또는 13자의 ASCII 문자를 입력할 수 있습니다."
                       }]
} ,{                      
                           type: "name",
                           title: "키 값",
                           content: "WEP 키를 각 필드에 입력합니다."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "채널",
                           content: "5GHz의 무선 네트워크에 대한 운영 채널을 선택합니다. 간헐적으로 무선 연결 문제가 발생하지 않을 경우, 채널 설정을 자동으로 두시는 것이 좋습니다."
                       } ,{                      
                           type: "name",
                           title: "전송 파워",
                           content: "무선 공유기의 전송 파워를 지정합니다. 고/중/저 중에서 원하는 것을 선택할 수 있습니다. 기본 설정값은 \"고\" 이며, 이 값을 권장합니다."
                       } ,{                      
                           type: "name",
                           id: "atf_5g",
                           title: "Airtime Fairness 기능",
                           content: "에어타임 페어니스(Airtime Fairness, ATF) 기능을 사용하려면 체크박스를 클릭해 활성화하세요. 각 디바이스의 사용 시간을 일정하게 할당해 공유기의 트래픽을 줄여줍니다."
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_5g",
                           title: "멀티 사용자 MIMO 기능",
                           content: "멀티유저 MIMO 기능을 사용하려면 클릭하세요."
                       }]
},
       WPS :{ 
               TITLE:"WPS",
               CONTENT: [{
                           type: "paragraph",
                           content: "WPS(Wi-Fi Protected Setup) 기능을 통해 Wi-Fi 보안 연결을 보다 쉽게 설정할 수 있습니다. "
                       } ,{                      
                           type: "name",
                           title: "누르기 버튼(권장)",
       content: [ 
                "이 방법으로 WPS가 활성화된 기기를 손쉽게 무선 네트워크에 연결할 수 있습니다.",
                "화면의 WPS 시작 버튼을 클릭합니다. 2분 내에, 클라이언트 기기의 WPS 버튼을 누릅니다."]
} ,{                      
                           type: "name",
                           title: "현재 공유기의 PIN",
       content: [ 
                "기본 PIN은 공유기의 라벨에 있습니다.",
                "생성'을 클릭하여 새로운 PIN을 받거나 '기본'을 클릭하여 현재의 PIN을 공장 기본 PIN으로 되돌립니다."]
} ,{                      
                           type: "name",
                           title: "클라이언트의 PIN을 입력",
       content: [ 
                "이 방법으로 직접 무선 기기를 추가할 수 있습니다.",
                "기기의 PIN을 해당 필드에 입력한 후 '연결'을 클릭하십시오."]
}]
},
       WIRELESS_STATISTICS :{ 
               TITLE:"무선 스테이션 온라인",
               CONTENT: [{
                           type: "name",
                           title: "클라이언트 숫자",
                           content: "관련 무선 클라이언트의 번호"
                       } ,{                      
                           type: "name",
                           title: "MAC 주소",
                           content: "연결된 무선 장치의 MAC 주소 표시."
                       } ,{                      
                           type: "name",
                           title: "연결 유형",
                           content: "연결된 무선 클라이언트의 무선 주파수(2.4GHz/5GHz) 표시"
                       } ,{                      
                           type: "name",
                           title: "보안",
                           content: "관련 무선 클라이언트의 보안 유형"
                       } ,{                      
                           type: "name",
                           title: "수신 패킷",
                           content: "무선 장치가 수신한 패킷"
                       } ,{                      
                           type: "name",
                           title: "발송 패킷",
                           content: "이 스테이션에 의해 발송된 패킷"
                       } ,{                      
                           type: "paragraph",
                           content: "이 페이지의 새로운 설정 정보의 업데이트를 위해 새로고침 버튼을 클릭하십시오."
                       }]
},
       WIRELESS_SCHEDULE :{ 
               TITLE:"무선 스케줄",
               CONTENT: [{
                           type: "paragraph",
                           content: "무선 스케줄 기능을 통해 특정 시간 동안 무선 신호를 비활성화 할 수 있습니다. 예를 들어, 00:00 am에서 07:00 am까지 무선 신호를 비활성화 할 수 있습니다. "
                       } ,{                      
                           type: "name",
                           title: "무선 Off 시간",
                           content: "무선 신호가 꺼져 있는 시간을 표시합니다. ",
       children: [{                      
                           type: "step",
                           title: "무선 꺼짐 시간 설정하기",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2. 무선 신호를 끌 시간을 설정하십시오.",
                "3. 반복 요일을 선택하십시오. \"매일\"을 선택하거나 특정 요일을 지정할 수 있습니다.",
                "4. 저장을 클릭합니다."]
}]
}]
},
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"설정",
               CONTENT: [{
                           type: "paragraph",
                           content: "본 기능 사용 시, 메인 네트워크를 공개하지 않고 게스트에게 Wi-Fi 액세스를 제공할 수 있습니다. "
                       } ,{                      
                           type: "name",
                           title: "게스트의 상호 접속 허용",
                           content: "이 체크박스를 선택하면 네트워크 환경, Samba, FTP 등과 같은 방법을 통해 게스트 네트워크(Guest Network) 상의 무선 단말기들이 상호 통신할 수 있습니다. "
                       } ,{                      
                           type: "name",
                           id: "access_local",
                           title: "게스트의 로컬 네트워크 접근 허용",
                           content: "이 체크박스를 선택하면 게스트 네트워크(Guest Network) 상의 무선 단말기들이 네트워크 환경, Samba, Ping, FTP 등과 같은 방법으로 공유기의 LAN 포트 또는 메인 네트워크에 연결된 단말기들과 통신할 수 있습니다. "
                       }]
},
       GUEST_NETWORK_WIRELESS :{ 
               TITLE:"무선 2.4GHz/5GHz",
               CONTENT: [{
                           type: "name",
                           title: "게스트 네트워 사용함",
                           content: "게스트 네트워크 기능을 사용하기 위해 이 확인란을 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "네트워크 이름(SSID)",
                           content: "기본 게스트 SSID를 사용하거나 (최대 32 자) 새로운 이름을 만듭니다."
                       } ,{                      
                           type: "name",
                           title: "SSID 숨기기",
                           content: "Wi-Fi 네트워크 목록에서 게스트 SSID를 숨기려면 이 확인란을 선택합니다."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "비밀번호 업데이트 간격",
                           content: "게스트 네트워크(Guest Network) 암호의 업데이트 간격을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "보안",
                           content: "비밀번호를 업데이트하기 위해 보안 옵션을 선택한 적이 없다면, 다음의 보안 옵션 중 하나를 선택합니다.",
       children: [{                      
                           type: "name",
                           title: "비활성화 보안",
                           content: "이 옵션을 선택하는 경우 무선 보안을 비활성화 할 수 있습니다. 권장 사항이 아닙니다. "
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-개인",
                           content: "이 옵션을 선택하면 무선 보안을 활성화 할 수 있습니다. 게스트 네트워크를 무단 접근으로부터 보호할 것을 적극 권장합니다. 옵션 선택 시, 설정 대상은 다음과 같습니다. ",
       children: [{                      
                           type: "name",
                           title: "버전",
                           content: "보안 버전을 선택하십시오. WPA2-PSK가 보안성이 좋습니다. 잘 모르겠다면, '자동'을 선택하십시오. "
                       } ,{                      
                           type: "name",
                           title: "암호화",
                           content: "보안 암호화 형식을 선택하십시오. AES가 보안성이 좋습니다. 공유기가 802.11n 모드에서 작동하는 경우, TKIP 암호화를 사용하지 말 것을 권장합니다. 또한, TKIP 사용은 WPA 기능을 비활성화 합니다. 잘 모르겠다면, '자동'을 선택하십시오. "
                       }]
} ,{                      
                           type: "name",
                           id: "portal-help-title",
                           title: "사이트",
                           content: "무선네트워크에 임시로 접속하려면 네트워크 보안을 위해 사이트 인증이 필요합니다."
                       } ,{                      
                           type: "step",
                           id: "portal-help-content",
                           title: "사이트 인증 설정",
       content: [ 
                "1. 보안 설정할 사이트를 선택하세요.",
                "2. 인증을 위해 임시 비밀번호 또는 인증 비활성화를 선택하세요.",
                "A. 임시비밀번호-인증을 위해 비밀번호를 설정하세요.(알파벳8-16자, 숫자 그리고 언더바(_))",
                "B. 인증 비활성화-인증없이 네트워크 접속 가능합니다.",
                "3. 인증유효시간을 1시간, 2시간, 4시간, 8시간 또는 항상으로 선택하세요. 인증이 만료되면 접속을 위해 재로그인해야합니다.",
                "4.(선택사항)이전페이지 URL주소를 입력하고 이전페이지로 돌아갈 수 있습니다. 새로 인증받은 사용자는 접속했던 URL로 돌아갈 수 있습니다.",
                "5.(선택사항)인증 로그인 페이지를 사용자가 지정할 수 있습니다.",
                "A. 사이트제목-최대31자",
                "B. 이용약관-최대 1023자",
                "C.로고이미지-JPG또는 PNG파일로 업로드하세요(100KB 이하)",
                "D.배경이미지-JPG또는 PNG파일로 업로드하세요(2MB 이하)",
                "6. 저장을 클릭하세요."]
}]
} ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "비밀번호",
                           content: "ASCII 문자 8-63자 사이, 또는 16진수 문자 8-64자(0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "비밀번호",
                           content: "무작위로 생성된 비밀번호를 사용하거나, 8-63자리 ASCII 문자 또는 16진수(0-9, a-f, A-F) 8-64자리의 비밀번호를 생성합니다."
                       }]
},
       NAT :{ 
               TITLE:"ALG",
               CONTENT: [{
                           type: "paragraph",
                           content: "ALG 기능은 사용자 지정 NAT(네트워크 주소 변환) 순환 필터가 게이트웨이에 플러그인 되어 특정 애플리케이션 계층 'control/data' 프로토콜(FTP, TFTP, H323 등)에 대하여 주소 및 포트 변환을 지원할 수 있도록 합니다. ALG 활성화가 권장됩니다. "
                       } ,{                      
                           type: "name",
                           title: "FTP ALG 사용 가능",
                           content: "선택 시, FTP 클라이언트와 서버가 NAT를 통해 데이터를 전송합니다."
                       } ,{                      
                           type: "name",
                           title: "TFTP ALG 사용 가능",
                           content: "선택 시, TFTP 클라이언트와 서버가 NAT를 통해 데이터를 전송합니다."
                       } ,{                      
                           type: "name",
                           title: "H323 ALG 사용 가능",
                           content: "선택 시, Microsoft NetMeeting 클라이언트가 NAT를 통해 연결됩니다."
                       } ,{                      
                           type: "name",
                           title: "RTSP ALG 사용 가능",
                           content: "선택 시, 미디어 플레이어가 NAT를 통해 스트리밍 하고있는 미디어 서버와 연결됩니다."
                       } ,{                      
                           type: "name",
                           title: "SIP ALG 활성화",
                           content: "선택하는 경우, 클라이언트가 NAT을 통해 SIP(Session Initiation Protocol) 서버와 통신할 수 있습니다. "
                       } ,{                      
                           type: "name",
                           title: "PPTP 통과 사용",
                           content: "선택 시, 일대일 세션이 공유기나 IP 네트워크를 통해 x터널링됩니다."
                       } ,{                      
                           type: "name",
                           title: "L2TP 통과 사용",
                           content: "선택 시, 계층 2 일대일 세션이 공유기나 IP 네트워크를 통해 터널링됩니다."
                       } ,{                      
                           type: "name",
                           title: "IPSec 통과 사용",
                           content: "선택되는 경우, 인터넷 프로토콜 보안(IPSec)이 IP 네트워크를 통해 터널링되고 공유기를 통과합니다. IPSec은 암호 보안 서비스를 사용함으로써 IP 네트워크를 통한 개인적이고 안전한 통신을 보장합니다."
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"가상 서버",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "가상 서버는 사용자의 로컬 네트워크를 공공 서비스로 설정하기 위해 사용됩니다. 하나의 외부 서버의 형태로, 인터넷에서부터 외부 포트에 이르는 모든 요청은 정적 또는 약속된 IP 주소로 설정된 특정 지정 PC로 재전송 됩니다.",
                "로컬 네트워크에 서버를 구축하고 인터넷을 공유하면, 가상 서버는 서비스를 인식하고 인터넷 사용자에게 그것을 제공할 수 있습니다."]
} ,{                      
                           type: "paragraph",
                           content: "이 표는 가상 서버의 관련 정보들을 표시합니다. "
                       } ,{                      
                           type: "name",
                           title: "서비스 타입",
                           content: "가상 서버의 이름을 표시합니다. "
                       } ,{                      
                           type: "name",
                           title: "외부 포트",
                           content: "가상 서버로 사용되는 포트의 범위와 수"
                       } ,{                      
                           type: "name",
                           title: "내부 IP",
                           content: "서비스 응용 프로그램을 실행하고 있는 PC의 IP 주소"
                       } ,{                      
                           type: "name",
                           title: "내부 포트",
                           content: "서비스 응용 프로그램을 실행하고 있는 PC의 포트 수"
                       } ,{                      
                           type: "name",
                           title: "프로토콜",
                           content: "서비스 응용 프로그램에 사용된 프로토콜 : TCP, UDP 또는 공유기에서 지원된 모든 프로토콜"
                       } ,{                      
                           type: "name",
                           title: "상태",
                           content: "특정 필터링 규칙에 대한 현재 상태"
                       } ,{                      
                           type: "name",
                           title: "수정",
                           content: "해당 규칙의 수정 또는 삭제를 위한 옵션"
                       } ,{                      
                           type: "step",
                           title: "가상 서버 규칙을 설정하려면",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2. 외부 포트와 내부 포트에 접근하는 포트의 수를 자동으로 추가하는 항목으로부터 서비스를 선택하기 위해서는 현재 서비스 보기를 클릭하십시오. 만약 서비스가 항목에 없다면 외부 포트 수(예:21) 또는 포트의 범위(예:21-25)를 입력하십시오. 만약 외부 포트가 같지 않다면 내부 포트의 정보는 빈 칸으로 남겨두거나 또는 외부 포트가 단일 포트일 경우 특정 포트를(예:21) 입력하십시오. 소수 표기 형태인 서비스 응용 프로그램을 실행하고 있는 PC의 IP 주소를 내부 IP 영역에 기입해 주십시오.",
                "3. 서비스 응용 프로그램을 위한 프로토콜을 선택하십시오.",
                "4. 상태 사용함을 선택하십시오.",
                "5. 저장을 클릭합니다."]
} ,{                      
                           type: "note",
                           title: "참고:",
       content: [ 
                "1. 해당 입력값을 비활성화 하려면 전구 아이콘을 클릭하십시오.",
                "2. 어느 포트와 프로토콜을 써야하는지 잘 모르겠다면, 인터넷 포트와 프로토콜을 기본 값으로 설정하는 것이 권장됩니다.",
                "3. 로컬 호스트 기기가 1개 이상의 서비스를 호스팅하고 있다면 각 서비스에 대한 규칙을 설정해야 합니다. 외부 포트가 중복되면 안됨에 유의하십시오."]
}]
},
       PORT_TRIGGERING :{ 
               TITLE:"포트 트리거",
               CONTENT: [{
                           type: "paragraph",
                           content: "인터넷 게임, 비디오 컨퍼런스, 인터넷 전화 등 일부 응용 프로그램은 다중 접속을 필요로 할 수 있습니다. 포트 트리거는 순수 NAT 기능이 동작하는 공유기 상에서 정상적으로 실행되지 않는 프로그램을 정상적으로 실행될 수 있도록 지원합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "이 표는 포트 트리거링의 관련 정보들을 표시합니다. "
                       } ,{                      
                           type: "name",
                           title: "앱",
                           content: "애플리케이션의 이름"
                       } ,{                      
                           type: "name",
                           title: "트리거 포트",
                           content: "공유기 외부로 나가는 트래픽을 위한 포트. 이 포트를 사용하여 외부로 나가는 연결이 존재할 경우 이 규칙이 수행될 것입니다."
                       } ,{                      
                           type: "name",
                           title: "트리거 프로토콜",
                           content: "트리거 포트에서 사용될 수 있는 프로토콜로 TCP, UDP, 또는 전부(이 라우터가 지원하는 모든 프로토콜)중 하나를 지정할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "외부 포트",
                           content: "공유기 외부에 존재하는 원격 시스템이 요청에 응답할 때 사용될수 있는 포트나 포트 범위. 이 포트 또는 범위에 존재하는 응답만 해당 PC로 전달됩니다. 사용자는 최대 5개 그룹의 포트(또는 포트 구간)을 입력할 수 있습니다. 그룹 정보는 \",\"으로 분리하여 입력합니다. 예: 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
                       } ,{                      
                           type: "name",
                           title: "외부 프로토콜",
                           content: "입력 포트에서 사용될 수 있는 프로토콜로, TCP, UDP, 또는 전부 (이 라우터가 지원하는 모든 프로토콜) 중 하나를 지정할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "상태",
                           content: "특정 필터링 규칙에 대한 현재 상태"
                       } ,{                      
                           type: "name",
                           title: "수정",
                           content: "해당 규칙의 수정 또는 삭제를 위한 옵션"
                       } ,{                      
                           type: "step",
                           title: "포트 트리거 항목 설정하기",
       content: [{                      
                           type: "note",
                           title: "참고:",
                           content: "각 규칙은 LAN 상에서 한번에 한 호스트에 의해서만 사용될 수 있습니다."
                       },
                "1. 추가 버튼을 클릭하십시오.",
                "2. 해당 영역에 적합한 초기값을 자동으로 추가하는 항목으로부터 응용 프로그램을 선택하기 위해서는 현재 응용 프로그램 보기를 클릭하십시오. 만약 항목에서 삭제하기를 원하는 응용 프로그램이 있다면, 수동으로 응용프로그램, 트리거 포트, 트리거 프로토콜, 외부 포트와 외부 프로토콜을 입력하십시오.",
                "3. 상태 사용함을 선택하십시오.",
                "4. 저장을 클릭합니다."]
} ,{                      
                           type: "note",
                           title: "참고:",
                           content: "해당 규칙을 비활성화하려면 전구 아이콘을 클릭하십시오."
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "DMZ(Demilitarized Zone) 호스트 기능을 적용하면, 인터넷 게임, 영상 회의 등 특정 목적의 서비스 사용 시에 로컬 호스트가 인터넷에 노출될 수 있습니다. 기본적으로, DMZ를 통해 LAN 상의 컴퓨터 한 대가 포트를 모두 오픈하게 됩니다. 해당 컴퓨터는 고정 IP 주소로 설정되어야 하며, DHCP 클라이언트 기능을 비활성화 합니다.  "
                       } ,{                      
                           type: "paragraph",
                           content: "DMZ가 활성화 되면, DMZ 호스트가 인터넷에 완전히 노출되면서 컴퓨터에 안전 문제를 가져올 수 있습니다. DMZ를 사용하지 않는 경우에는 비활성화 할 것을 권장합니다. "
                       } ,{                      
                           type: "step",
                           title: "DMZ 설정 하기",
       content: [ 
                "1. DMZ 버튼을 선택 하십시오.",
                "2. DMZ 기능 사용을 위한 PC의 IP 주소를 DMZ 호스트 IP 주소 영역에 입력하십시오.",
                "3. 저장을 클릭하십시오. "]
}]
},
       UPNP :{ 
               TITLE:"UPnP",
               CONTENT: [{
                           type: "paragraph",
                           content: "기본값으로, UPnP(Universal Plug-and-Play) 기능이 활성화 되기 때문에 컴퓨터와 같은 단말기들과 인터넷 애플리케이션들은 로컬 네트워크 상에서 상호 탐지 및 통신을 자동 수행할 수 있습니다. "
                       } ,{                      
                           type: "paragraph",
                           content: "멀티플레이어 게임, P2P 연결, 실시간 통신(VoIP, teleVoIP 회의 등), 원격 지원 등에 필요한 애플리케이션을 사용하고자 하는 경우, UPnP 기능의 활성화가 요구될 수 있습니다. "
                       } ,{                      
                           type: "name",
                           title: "UPnP 서비스 목록",
                           content: "UPnP 서비스 목록은 로컬 호스트의 UPnP 정보를 표시합니다. "
                       }]
},
       MODEM :{ 
               TITLE:"3G/4G 도움말",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB 모뎀",
                           content: "3G/4G USB 모뎀의 상태를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "자동 식별된 ISP 정보의 사용",
                           content: "기본값으로 이 기능은 활성화 됩니다. 활성화 된 경우, 공유기가 SIM/UIM 카드의 ISP를 식별하고 자동으로 정보를 입력할 수 있습니다. 식별에 실패하는 경우, 지역 및 모바일 ISP를 직접 선택하십시오. "
                       } ,{                      
                           type: "name",
                           title: "지역",
                           content: "USB 모뎀과 SIM 카드 식별이 성공하면 지역이 자동 선택되고 표시됩니다. 그렇지 않은 경우, 아래 메뉴에서 지역을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "모바일 ISP",
                           content: "3G/4G 네트워크의 ISP(Internet Service Provider)를 표시합니다. 자동으로 감지되지 않는 경우 드롭다운 메뉴에서 ISP를 선택하시면 됩니다. 선택에 따라 기본 설정 다이얼 번호와 APN 은 자동으로 입력됩니다."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "SIM/UIM 보호가 활성화 되면, PIN 코드를 입력하십시오. 기본값을 SIM/UIM 보호는 비활성화 됩니다. 유효하지 않은 PIN을 3회 입력하는 경우, SIM/UIM 카드가 자동 잠금됩니다. PC/노트북의 PUK 코드를 입력해야 잠금이 해제됩니다.  "
                       } ,{                      
                           type: "name",
                           title: "메시지",
                           content: "PIN 보호가 활성화 된 경우, SIM/UIM 카드의 PIN 정보를 표시합니다. "
                       } ,{                      
                           type: "name",
                           title: "설정다이얼 번호,APN,사용자 이름/암호",
                           content: "ISP가 <strong>모바일 ISP</strong> 목록에 존재하지 않는 경우, 이 체크박스를 선택하여 ISP에서 제공한 전화 번호, APN(Access Point Name), 사용자 이름, 암호 등을 입력하십시오. "
                       } ,{                      
                           type: "name",
                           title: "다이얼 번호",
                           content: "ISP에서 제공한 전화 번호를 입력하십시오."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "ISP에서 제공한 APN(Access Point Name)을 입력하십시오."
                       } ,{                      
                           type: "name",
                           title: "사용자 이름/비밀번호",
                           content: "ISP에서 제공한 사용자 이름과 암호를 대소문자를 구별하여 입력하십시오. "
                       } ,{                      
                           type: "name",
                           title: "요구 시 연결",
                           content: "사용자는 지정된 시간 동안(최대 유휴 시간) 인터넷 연결 유지한 후 인터넷 연결을 끊도록 공유기를 설정할 수 있습니다. 만일 사용자의 인터넷 활동이 존재하지 않아 그 연결이 끊겼다면 요구시 연결 은 사용자가 인터넷을 다시 사용하려고할 경우 공유기는 자동으로 사용자의 연결을 재연결 될 수 있도록 합니다. 만일 사용자의 인터넷을 상시 연결상태로 두고 싶다면, 최대 유휴 시간 필드에 0을 입력하십시오. 그렇지 않으면, 사용자 인터넷 연결이 끊어지기까지 유지되는 시간을 입력하십시오."
                       } ,{                      
                           type: "note",
                           title: "참고:",
                           content: "간혹, 백엔드에서 인터넷에 계속 액세스하는 프로그램들이 있어서 최대 유휴 시간을 설정했는데도 연결이 종료되지 않는 경우도 있습니다."
                       } ,{                      
                           type: "name",
                           title: "자동으로 연결",
                           content: "이 모드에서는 인터넷 연결이 끊길 때 마다 자동으로 재연결됩니다."
                       } ,{                      
                           type: "name",
                           title: "수동으로 연결",
                           content: "이 모드에서는 \"연결\" 또는 \"연결 해제\" 버튼을 클릭해 인터넷 연결 상태를 수동으로 제어할 수 있습니다. 또한 이 모드는 \"최대 유휴 시간\" 기능을 지원합니다 \"최대 유휴 시간\" 필드에 인터넷 연결 종료 전까지 허용할 최대 유휴 시간을 (분 단위로) 입력합니다. 기본 설정 값ㅇ은 15분입니다. 인터넷 연결이 계속 유지되도록 하려면 0(영)을 입력하시면 됩니다."
                       } ,{                      
                           type: "note",
                           title: "참고:",
                           content: "간혹, 백엔드에서 인터넷에 계속 액세스하는 프로그램들이 있어서 최대 유휴 시간을 설정했는데도 연결이 종료되지 않는 경우도 있습니다."
                       } ,{                      
                           type: "paragraph",
                           content: "저장 버튼을 클릭하여 설정을 저장하십시오."
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"3G/4G 고급 설정 도움말",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB 모뎀",
                           content: "3G/4G USB 모뎀의 상태를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "자동 식별된 ISP 정보의 사용",
                           content: "기본값으로 이 기능은 활성화 됩니다. 활성화 된 경우, 공유기가 SIM/UIM 카드의 ISP를 식별하고 자동으로 정보를 입력할 수 있습니다. 식별에 실패하는 경우, 지역 및 모바일 ISP를 직접 선택하십시오. "
                       } ,{                      
                           type: "name",
                           title: "지역",
                           content: "USB 모뎀과 SIM 카드 식별이 성공하면 지역이 자동 선택되고 표시됩니다. 그렇지 않은 경우, 아래 메뉴에서 지역을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "모바일 ISP",
                           content: "3G/4G 네트워크의 ISP(Internet Service Provider)를 표시합니다. 자동으로 감지되지 않는 경우 드롭다운 메뉴에서 ISP를 선택하시면 됩니다. 선택에 따라 기본 설정 다이얼 번호와 APN 은 자동으로 입력됩니다."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "SIM/UIM 보호가 활성화 되면, PIN 코드를 입력하십시오. 기본값을 SIM/UIM 보호는 비활성화 됩니다. 유효하지 않은 PIN을 3회 입력하는 경우, SIM/UIM 카드가 자동 잠금됩니다. PC/노트북의 PUK 코드를 입력해야 잠금이 해제됩니다.  "
                       } ,{                      
                           type: "name",
                           title: "메시지",
                           content: "PIN 보호가 활성화 된 경우, SIM/UIM 카드의 PIN 정보를 표시합니다. "
                       } ,{                      
                           type: "name",
                           title: "설정다이얼 번호,APN,사용자 이름/암호",
                           content: "ISP가 <strong>모바일 ISP</strong> 목록에 존재하지 않는 경우, 이 체크박스를 선택하여 ISP에서 제공한 전화 번호, APN(Access Point Name), 사용자 이름, 암호 등을 입력하십시오. "
                       } ,{                      
                           type: "name",
                           title: "다이얼 번호",
                           content: "ISP에서 제공한 전화 번호를 입력하십시오."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "ISP에서 제공한 APN(Access Point Name)을 입력하십시오."
                       } ,{                      
                           type: "name",
                           title: "사용자 이름/비밀번호",
                           content: "ISP에서 제공한 사용자 이름과 암호를 대소문자를 구별하여 입력하십시오. "
                       } ,{                      
                           type: "name",
                           title: "요구 시 연결",
                           content: "사용자는 지정된 시간 동안(최대 유휴 시간) 인터넷 연결 유지한 후 인터넷 연결을 끊도록 공유기를 설정할 수 있습니다. 만일 사용자의 인터넷 활동이 존재하지 않아 그 연결이 끊겼다면 요구시 연결 은 사용자가 인터넷을 다시 사용하려고할 경우 공유기는 자동으로 사용자의 연결을 재연결 될 수 있도록 합니다. 만일 사용자의 인터넷을 상시 연결상태로 두고 싶다면, 최대 유휴 시간 필드에 0을 입력하십시오. 그렇지 않으면, 사용자 인터넷 연결이 끊어지기까지 유지되는 시간을 입력하십시오."
                       } ,{                      
                           type: "note",
                           title: "참고:",
                           content: "간혹, 백엔드에서 인터넷에 계속 액세스하는 프로그램들이 있어서 최대 유휴 시간을 설정했는데도 연결이 종료되지 않는 경우도 있습니다."
                       } ,{                      
                           type: "name",
                           title: "자동으로 연결",
                           content: "이 모드에서는 인터넷 연결이 끊길 때 마다 자동으로 재연결됩니다."
                       } ,{                      
                           type: "name",
                           title: "수동으로 연결",
                           content: "이 모드에서는 \"연결\" 또는 \"연결 해제\" 버튼을 클릭해 인터넷 연결 상태를 수동으로 제어할 수 있습니다. 또한 이 모드는 \"최대 유휴 시간\" 기능을 지원합니다 \"최대 유휴 시간\" 필드에 인터넷 연결 종료 전까지 허용할 최대 유휴 시간을 (분 단위로) 입력합니다. 기본 설정 값ㅇ은 15분입니다. 인터넷 연결이 계속 유지되도록 하려면 0(영)을 입력하시면 됩니다."
                       } ,{                      
                           type: "note",
                           title: "참고:",
                           content: "간혹, 백엔드에서 인터넷에 계속 액세스하는 프로그램들이 있어서 최대 유휴 시간을 설정했는데도 연결이 종료되지 않는 경우도 있습니다."
                       } ,{                      
                           type: "name",
                           title: "인증 유형",
                           content: "인증 형식을 선택하십시오. 기본값은 '자동'입니다. 일부 ISP에서는 특정 인증 형식을 요구하므로 ISP를 통해 확인하거나 기본 환경설정을 유지하십시오."
                       } ,{                      
                           type: "name",
                           title: "자동",
                           content: "자동(기본값)인 경우, 공유기는 ISP에서 사용하는 인증 형식을 자동으로 지정합니다. "
                       } ,{                      
                           type: "name",
                           title: "PAP",
                           content: "PAP(Password Authentication Protocol)이 선택된 경우, 라우터는 핸드셰이크 2회를 통해 피어와 인증합니다. ISP가 이 인증 유형을 요구하는 경우 이 옵션을 선택하시면 됩니다."
                       } ,{                      
                           type: "name",
                           title: "CHAP",
                           content: "CHAP(Challenge Handshake Authentication Protocol)이 선택된 경우, 라우터는 핸드셰이크 3회를 통해 피어와 인증하고, 피어의 신분을 정기적으로 확인합니다. ISP가 이 인증 유형을 유구하는 경우 이 옵션을 선택하시면 됩니다."
                       } ,{                      
                           type: "name",
                           title: "MTU 크기(바이트단위)",
                           content: "기본 MTU(Maximum Transmission Unit) 크기는 1480 바이트입니다. ISP의 별도 요구사항이 없는 이상, 기본값을 변경해서는 안됩니다. "
                       } ,{                      
                           type: "name",
                           title: "다음 DNS 주소",
                           content: "ISP가 DNS 서버 IP 주소를 제공하는 경우, 이 체크박스를 선택하여 <strong>기본 DNS</strong>과 보조 DNS(옵션) IP 주소를 아래에 입력하십시오. 그렇지 않는 경우, ISP가 DNS 서버를 자동 할당합니다. "
                       } ,{                      
                           type: "name",
                           title: "기본 DNS",
                           content: "ISP에서 제공하는 점으로 구분된 십진수 형태의 DNS IP 주소를 입력하십시오. "
                       } ,{                      
                           type: "name",
                           title: "보조 DNS",
                           content: "ISP에서 제공하는 점으로 구분된 십진수 형태의 DNS IP 주소를 입력하십시오(옵션)."
                       } ,{                      
                           type: "paragraph",
                           content: "<strong>저장</strong> 버튼을 클릭하여 설정을 저장하십시오."
                       }]
},
       DISK_SETTING :{ 
               TITLE:"장치 설정",
               CONTENT: [{
                           type: "paragraph",
                           content: "기기 설정 화면에서 USB 포트에 연결된 모든 USB 저장장치의 정보를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "스캔",
                           content: "일반적으로 공유기가 자동으로 새로 연결된 기기를 감지합니다. 만약 감지하지 못하면, 스캔 버튼을 클릭하여 새로 연결된 기기와 변경된 정보를 화면에 출력합니다."
                       } ,{                      
                           type: "name",
                           title: "볼륨",
                           content: "USB 볼륨의 이름을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "용량",
                           content: "USB의 총 저장 용량을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "남은 공간",
                           content: "현재 사용 가능한 저장 공간을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "안전하게 제거",
                           content: "USB 저장 장치를 안전하게 제거하려면 공유기에서 분리하기 전에 이 버튼을 클릭합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "제거 버튼은 USB 저장 장치가 공유기에 연결되었을 때에만 나타납니다. 사용 중인 USB 저장 장치는 분리가 불가능합니다. "
                       } ,{                      
                           type: "name",
                           title: "상태",
                           content: "이 체크박스는 USB 저장 장치가 공유기에 연결되었을 때 활성화됩니다. 체크시 USB 저장 장치의 파일공유가 가능합니다."
                       } ,{                      
                           type: "step",
                           title: "파일서버 설정하기",
       content: [ 
                "1. USB 저장 장치를 USB 케이블을 이용하여 공유기의 USB 포트에 연결합니다.",
                "2. 새로 연결된 USB 장치는 자동으로 공유기에서 감지하여 기기 설정 창에 정보에 표시됩니다. 만약 감지하지 못하면 스캔을 클릭하세요.",
                "3. 활성화를 선택하면 파일 공유가 가능합니다."]
}]
},
       FOLDER_SHARE_ACCOUNT :{ 
               TITLE:"공유 계정",
               CONTENT: [{
                           type: "name",
                           title: "계정",
                           content: "기본 계정 사용하기를 선택하여 로그인 후 파일과 폴더를 공유하거나 새로운 계정 사용하기를 선택하여 새로운 사용자 계정을 만들 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "사용자 이름/비밀번호",
                           content: "알파벳, 숫자 또는 언더바 등을 사용해 만든 1-15자리의 사용자 이름, 그리고 ASCII 문자 1-15자를 사용해 만든 암호를 입력합니다. 이 두 개 필드는 대소문자를 구분합니다."
                       } ,{                      
                           type: "name",
                           title: "비밀번호 확인",
                           content: "비밀번호를 다시 입력합니다. 이 필드는 대소문자를 가립니다."
                       } ,{                      
                           type: "paragraph",
                           content: "저장을 클릭하여 모든 설정을 저장하십시오."
                       }]
},
       FOLDER_SHARE_SETTINGS :{ 
               TITLE:"공유 설정",
               CONTENT: [{
                           type: "name",
                           title: "네트워크/미디어 서버 이름",
                           content: "연결된 USB 저장 장치에 액세스 하는 이름을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "가능",
                           content: "가능한 접근 방법을 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "접근 방법",
                           content: "연결한 USB 저장 장치에 접근을 허용하는 3가지 접근 방법입니다. 체크박스를 선택하여 한 개 또는 그 이상의 접근 방법을 선택할 수 있습니다.",
       children: [{                      
                           type: "name",
                           title: "네트워크 이웃",
                           content: "활성화 된 경우, 네트워크 상의 사용자는 할당된 IP 주소(예: \\\\192.168.0.1)를 사용하여 USB 저장 장치에 액세스할 수 있습니다. "
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "활성화된 경우, 로컬 네트워크 상의 FTP 클라이언트가 FTP 서버의 포트 번호 앞에 오는 할당된 IP 주소(예: ftp://192.168.0.1:21)를 사용하여 USB 저장 장치에 액세스할 수 있습니다. "
                       } ,{                      
                           type: "name",
                           title: "FTP (인터넷을 통한)",
                           content: "유저들이 인터넷 FTP를 통하여 USB저장장치에 원격으로 접근할 수 있습니다. 이 기능은 다운로드와 업로드를 지원합니다. FTP 서버의 포트넘버를 변경하려면 포트 넘버를 입력하고 저장을 클릭하면 변경이 적용됩니다."
                       }]
} ,{                      
                           type: "name",
                           title: "링크",
                           content: "공유된 USB 저장 장치에 접근하는 주소를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "포트",
                           content: "FTP 서버의 포트 번호를 표시합니다. 기본 설정 값 21, 또는 1024부터 65535 사이의 값을 사용하세요."
                       } ,{                      
                           type: "paragraph",
                           content: "저장을 클릭하여 모든 설정을 저장하십시오."
                       }]
},
       FOLDER_SHARE_FOLDERS :{ 
               TITLE:"폴더 공유",
               CONTENT: [{
                           type: "name",
                           title: "전체 공유",
                           content: "스위치 켠 상태에서 모든 파일과 폴더 공유되고 또는 끈 상태에 선택한 폴더만 공유됩니다."
                       } ,{                      
                           type: "name",
                           title: "인증 사용",
                           content: "공유 폴더 접근을 요청한 사용자가 유효한 사용자이름과 비밀번호로 입력하여 접근할 수 있도록 할 것을 추천합니다."
                       } ,{                      
                           type: "name",
                           title: "폴더 이름",
                           content: "공유 폴더의 이름을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "폴더 경로",
                           content: "공유 폴더의 경로를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "미디어 공유",
                           content: "공유 폴더의 공유 여부를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "볼륨 이름",
                           content: "공유 볼륨의 이름을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "상태",
                           content: "표시등으로 공유 폴더의 상태를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "수정",
                           content: "공유 폴더의 변경 또는 삭제를 옵션으로 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "검색",
                           content: "클릭하여 공유폴더를 검색합니다."
                       } ,{                      
                           type: "name",
                           title: "게스트 네트워크 액세스 허용",
                           content: "게스트 네트워크에 클라이언트가 공유 폴더에 액세스할 수 있도록 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "인증 사용",
                           content: "유효한 사용자 이름과 비밀번호를 사용하여 공유 폴더에 액세스 하도록 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "쓰기 액세스 사용",
                           content: "사용자가 폴더 내용을 변경할 수 있도록 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "미디어 공유 사용함",
                           content: "미디어 공유를 활성화 하려면 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "새로고침",
                           content: "클릭하면 공유 폴더 목록이 업데이트됩니다."
                       }]
},
       PRINT_SERVER :{ 
               TITLE:"프린터 서버",
               CONTENT: [{
                           type: "name",
                           title: "프린터 서버",
                           content: "클릭하여 프린터 서버 기능을 활성화 하십시오."
                       } ,{                      
                           type: "name",
                           title: "프린터 이름",
                           content: "공유기에 연결된 프린터의 이름을 표시합니다. "
                       }]
},
       TIME_MACHINE :{ 
               TITLE:"타임머신",
               CONTENT: [{
                           type: "paragraph",
                           content: "타이머신은 MAC에서 있는 모든 파일을 공유기에 연결 된 USB 장치로 백업합니다."
                       } ,{                      
                           type: "name",
                           title: "사용",
                           content: "타임머신 기능을 사용하려면 체크박스를 선택하세요."
                       } ,{                      
                           type: "name",
                           title: "백업 디스크",
                           content: "타임머신 백업의 위치를 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "백업 파일 크기 제판",
                           content: "타임 머신 백업에 사용할 수 있는 디스크 공간을 지정합니다. 0은 사용 공간에 대한 제한이 없음을 의미합니다."
                       } ,{                      
                           type: "name",
                           title: "저장",
                           content: "클릭하시면 설정내용을 저장합니다"
                       }]
},
       OFFLINE_DOWNLOAD :{ 
               TITLE:"오프라인 다운로드",
               CONTENT: [{
                           type: "paragraph",
                           content: "오프라인 다운로드가 활성화 되면, 공유기가 컴퓨터 전원이 연결되지 않은 상태에서도 파일을 다운로드할 수 있습니다. "
                       } ,{                      
                           type: "name",
                           title: "상태",
                           content: "클릭하여 오프라인 다운로드 기능을 활성화 하십시오."
                       } ,{                      
                           type: "name",
                           title: "폴더 경로",
                           content: "다운로드한 파일을 저장 할 수 있는 디렉토리 경로를 선택합니다.",
       children: [{                      
                           type: "note",
                           title: "참고:",
                           content: "파일 업로드나 다운로드 시 디렉토리 경로를 변경하거나 USB 저장 매체를 분리하지 마십시오. 그렇지 않은 경우 치명적 오류가 발생할 수 있습니다. "
                       }]
} ,{                      
                           type: "name",
                           title: "일정",
                           content: "체크박스를 선택하여 파일 다운로드/업로드 기간을 지정하는 일정 기능을 활성화 하십시오. "
                       } ,{                      
                           type: "name",
                           title: "작업 완료 후 업로드 지속",
                           content: "체크박스를 선택하여 완료된 다운로드의 데이터 업로드를 지속하십시오. "
                       } ,{                      
                           type: "name",
                           title: "최대 활성 다운로드 개수",
                           content: "1부터 10 사이의 값을 입력하여 최대 활성 다운로드 개수를 설정하십시오. 기본값은 5입니다. "
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"다운로드",
               CONTENT: [{
                           type: "note",
                           title: "파일",
                           content: "다운로드 파일의 이름과 형식을 표시합니다. "
                       } ,{                      
                           type: "note",
                           title: "속도",
                           content: "현재 다운로드(또는 업로드) 속도를 표시합니다."
                       } ,{                      
                           type: "note",
                           title: "완료",
                           content: "다운로드 진행상황을 표시합니다."
                       } ,{                      
                           type: "note",
                           title: "남은 시간",
                           content: "남은 다운로드 시간을 표시합니다. "
                       } ,{                      
                           type: "note",
                           title: "연결된 피어",
                           content: "다운로드의 연결된 피어 개수를 표시합니다. "
                       } ,{                      
                           type: "note",
                           title: "상태",
                           content: "현재 다운로드 상태(다운로드, 대기, 시딩, 중단, 완료, 오류 등)을 표시합니다. "
                       } ,{                      
                           type: "name",
                           title: "신규 다운로드 추가",
       children: [{                      
                           type: "step",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2. PC에서 토렌트, USB에서 토렌트 또는 URL의 다운로드 소스를 선택합니다.",
                "3. BT의 토런트 위치를 선택하거나, FTP, HTTP 및 aMule의 URL을 입력합니다.",
                "4. 저장을 클릭합니다.",
                "5. aMule의 경우 고급>aMule 서버에 aMule 서버의 IP 주소와 포트를 지정합니다."]
}]
} ,{                      
                           type: "name",
                           title: "다운로드 삭제",
                           content: "삭제하고자 하는 파일의 해당 체크박스를 선택한 뒤, 표 위의 삭제를 클릭하십시오."
                       } ,{                      
                           type: "name",
                           title: "다운로드 중단",
                           content: "중단하고자 하는 파일의 해당 체크박스를 클릭한 뒤, 표 위의 중단을 클릭하십시오."
                       } ,{                      
                           type: "name",
                           title: "다운로드 재개",
                           content: "재개하고자 하는 파일의 해당 체크박스를 클릭한 뒤, 표 위의 다시 시작을 클릭하십시오."
                       }]
},
       OFFLINE_DOWNLOAD_ADVANCED :{ 
               TITLE:"고급",
               CONTENT: [{
                           type: "name",
                           title: "속도 제한",
                           content: "인터넷 연결 시의 최대 다운로드 및 업로드 속도를 지정하십시오. "
                       } ,{                      
                           type: "name",
                           title: "최대 다운로드 속도",
                           content: "1부터 100000 사이의 값을 입력하여 최대 다운로드 속도를 설정하십시오. 기본값은 1024입니다. "
                       } ,{                      
                           type: "name",
                           title: "최대 업로드 속도",
                           content: "1부터 100000 kB/s 사이의 값을 입력하여 최대 업로드 속도를 설정하십시오. 기본값은 512입니다."
                       } ,{                      
                           type: "name",
                           title: "연결 개수",
                           content: "최대 연결 개수를 지정하십시오."
                       } ,{                      
                           type: "name",
                           title: "전역 최대 연결 개수",
                           content: "1부터 200 사이의 값을 입력하여 전역 최대 연결 개수를 설정하십시오. 기본값은 100입니다."
                       } ,{                      
                           type: "name",
                           title: "토렌트 당 최대 연결 피어 개수",
                           content: "1부터 100 사이의 값을 입력하여 토렌트 당 연결된 최대 피어 개수를 설정하십시오. 기본값은 50입니다."
                       } ,{                      
                           type: "name",
                           title: "DHT 네트워크 활성화",
                           content: "이 기능을 활성화하면 피어 검색 효율성이 향상돼 다운로드 속도가 개선됩니다. "
                       } ,{                      
                           type: "name",
                           title: "피어 교환 활성화",
                           content: "이 기능을 활성화하면 피어 그룹 간 통신 효율성이 향상돼 다운로드 속도가 개선됩니다."
                       } ,{                      
                           type: "name",
                           title: "비트토렌트 프로토콜 암호화 활성화",
                           content: "이 기능을 활성화하면 데이터 전송 처리 시 개인정보 보호와 기밀성이 강화됩니다."
                       } ,{                      
                           type: "name",
                           title: "aMule 서버",
                           content: "aMule 서버의 IP 주소와 포트를 입력하십시오. 공유기가 서버에 연결된 경우에만 aMule 다운로드가 가능합니다. "
                       }]
},
       PARENTAL_CONTROL :{ 
               TITLE:"자녀PC 관리 기능",
               CONTENT: [{
                           type: "paragraph",
                           content: "자녀보호 기능을 통해 부적절하고 악의적인 웹사이트를 차단할 수 있습니다. 즉, 특정 시간대의 접속을 제한합니다(예: 숙제 시간에 페이스북이나 유튜브 차단)"
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"자녀PC 관리 기기",
               CONTENT: [{
                           type: "paragraph",
                           content: "이 표는 현재 시청연령제한 기능에 의해 제한되고 있는 단말기의 정보와 환경설정을 나타냅니다. "
                       } ,{                      
                           type: "step",
                           title: "새로운 클라이언트 장치를 제한합니다.",
       content: [ 
                "1. 토글하여 자녀보호 기능을 켭니다.",
                "2. 추가를 클릭합니다.",
                "3. 스캔을 클릭하여 현재 연결되어 있는 단말기를 액세스 단말기 목록에서 선택하십시오. 또는 단말기 이름과 MAC 주소를 직접 입력하여 연결되어 있지 않은 단말기를 추가하십시오. ",
                "4. 유효 시간 아이콘을 클릭하여 제한 적용 시간을 지정하십시오.",
                "5. 설명 영역에 간략한 설명을 입력하십시오. 이 영역은 선택사항입니다.",
                "6. 입력값 활성화를 선택하십시오.",
                "7. 저장을 클릭합니다."]
} ,{                      
                           type: "note",
                           title: "참고:",
                           content: "해당 입력값을 비활성화 하려면 전구 아이콘을 클릭하십시오."
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"컨텐츠 제한",
               CONTENT: [{
                           type: "paragraph",
                           content: "내용 제한 기능을 통해 키워드와 도메인 이름을 사용하여 특정 웹사이트에 대한 접근을 제한할 수 있습니다. 시청연령제한 기능에 의해 제어되는 클라이언트 단말기는 선택한 제한 정책에 따라 해당 웹사이트 접근 가능 여부가 결정됩니다."
                       } ,{                      
                           type: "step",
                           title: "접근 가능 내용 지정",
       content: [ 
                "1. 토글하여 내용 제한 기능을 켭니다.",
                "2. 요구사항에 따라 제한 정책을 선택합니다.",
                "A. 제어 대상 단말기가 특정 웹사이트를 제외한 모든 웹사이트에 접근할 수 있게 하려면 블랙리스트를 선택하십시오.",
                "B. 제어 대상 단말기의 특정 웹사이트 접근만 허용하려면 화이트리스트를 선택하십시오.",
                "3. 신규 키워드 추가를 클릭하여 웹 주소 키워드(예: 위키피디아) 또는 도메인 이름을 블랙리스트나 화이트리스트에 추가하십시오.",
                "4. 저장을 클릭합니다."]
}]
},
       PARENTAL_CONTROL_V2 :{ 
               TITLE:"자녀PC 관리 기능",
               CONTENT: [{
                           type: "paragraph",
                           content: "사용자 프로필, 콘텐츠 필터 및 액세스 제한을 사용하여 자녀 보호 기능은 각 가족 구성원에게 개인화되고 적절한 인터넷 액세스를 제공합니다."
                       } ,{                      
                           type: "step",
                           title: "새 장치에 유해 컨텐츠 차단을 적용합니다.",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2.이 프로필의 이름을 입력하고 \"+\"를 클릭하여이 프로필 아래에 장치를 추가하십시오.",
                "3. 필요에 따라 차단 된 콘텐츠를 사용자 지정하십시오. 키워드가 포함 된 모든 웹 사이트가 차단됩니다.",
                "4.이 프로필이 온라인으로 소비 할 수있는 총 시간을 제한하려면 시간 제한을 활성화하고 지정하십시오. 침대 시간을 사용하여이 프로필에 속한 장치가 인터넷을 사용할 수없는 일일 시간대를 설정할 수도 있습니다.",
                "5. 저장을 클릭합니다."]
} ,{                      
                           type: "step",
                           title: "프로필의 자세한 인터넷 기록을 보세요.",
       content: [ 
                "1. 통계 열에서 해당 통계 버튼을 클릭하십시오.",
                "2. 더 많은 기록을 보려면 기록 <span class=\"ptl-ctr-help-icon history\"> </span> 버튼을 클릭하십시오.",
                "3. 클릭하여 웹 사이트를 차단 또는 차단 해제 할 수 있습니다. <span class=\"ptl-ctr-help-icon block\"></span> 또는 <span class=\"ptl-ctr-help-icon unblock\"></span> 버튼."]
} ,{                      
                           type: "step",
                           title: "바로 인터넷 액세스를 사용하거나 사용하지 않도록 설정합니다.",
       content: [ 
                "인터넷 액세스 열에서 해당 프로필의 장치가 인터넷에 액세스하는 것을 중지하려면 <span class=\"ptl-ctr-help-icon stop\"></span>을 클릭하고 <span class=\"ptl-ctr-help-icon enable\"></span>을 (를) 사용하여 다시 액세스 할 수있게하십시오."]
}]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS(Quality of Service, 서비스 품질)을 사용하면 요구사항에 따른 인터넷 트래픽의 우선순위 설정이 가능합니다. QoS 규칙 목록에 단말기 우선순위 레벨, 물리적 포트, 애플리케이션 등을 지정할 수 있습니다."
                       } ,{                      
                           type: "note",
                           id: "qos-boost",
                           title: "참고:",
                           content: "\"NAT 부스트\"가 활성 상태인 경우 QoS는 비활성 상태여야 합니다."
                       } ,{                      
                           type: "name",
                           title: "업로드 대역포",
                           content: "ISP에서 제공하는 최대 업로드 대역폭을 입력하십시오."
                       } ,{                      
                           type: "name",
                           title: "다운로드 대역포",
                           content: "ISP에서 제공하는 최대 다운로드 대역폭을 입력하십시오."
                       }]
},
       QOS_ADV :{ 
               TITLE:"고급",
               CONTENT: [{
                           type: "name",
                           title: "우선순위 높음/보통/낮음",
                           content: "우선순위 높음/보통/낮음 트래픽의 백분율을 지정하십시오. ",
       children: [{                      
                           type: "note",
                           title: "참고:",
                           content: "모든 우선순위의 최대량(퍼센트)은 1입니다."
                       }]
}]
},
       QOS_RULE :{ 
               TITLE:"QoS 규칙 목록",
               CONTENT: [{
                           type: "paragraph",
                           content: "인터넷 트래픽 우선순위 설정을 위한 상세 QoS 규칙을 이곳에 추가할 수 있습니다. "
                       } ,{                      
                           type: "step",
                           title: "QoS 규칙 설정",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2. 우선순위 유형을 선택하여 QoS 규칙을 추가하십시오.",
                "단말기별 - 스캔을 클릭하여 필요한 단말기를 선택하거나 단말기 이름과 해당 MAC 주소를 직접 입력하십시오.",
                "애플리케이션별 - 필요한 애플리케이션을 선택하거나 이름, 프로토콜, 목적지 포트(1-65535) 등을 설정하여 사용자 지정 애플리케이션을 설정하십시오. 한 개 이상의 포트나 포트 범위를 쉼표로 구분하여 입력할 수 있습니다(예: 21,36-105,111).",
                "물리적 포트별 - 필요한 포트를 선택하십시오.",
                "3. 저장을 클릭하십시오. "]
} ,{                      
                           type: "note",
                           title: "참고:",
                           content: "여러 우선순위 목록 간에 규칙을 드래그하여 우선순위를 변경할 수 있습니다. "
                       }]
},
       QOS_DATABASE :{ 
               TITLE:"데이터베이스 업그레이드",
               CONTENT: [{
                           type: "paragraph",
                           content: "www.tp-link.com에서 최신 데이터베이스 버전을 릴리스할 예정입니다. 공유기 데이터베이스를 다운로드, 업데이트 하여 지원 대상 애플리케이션을 확장할 수 있습니다. "
                       } ,{                      
                           type: "name",
                           title: "새 데이터베이스 파일",
                           content: "브라우즈를 클릭하여 최근 데이터베이스 파일의 위치를 정합니다. 최근 데이터베이스 파일의 위치를 선택한 뒤, 업그레이드를 클릭하여 데이터베이스를 최신 버전으로 업그레이드 하십시오."
                       }]
},
       QOS_V2 :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (Quality of Service)를 사용하면 특정 장치의 인터넷 트래픽 우선 순위를 지정하여 필요할 때 가장 빠르게 연결할 수 있습니다."
                       }]
},
       QOS_GLOBAL_SETTINGS :{ 
               TITLE:"전역 설정",
               CONTENT: [{
                           type: "paragraph",
                           content: "업로드 대역폭 - ISP에서 제공하는 최대 업로드 대역폭을 입력하십시오."
                       } ,{                      
                           type: "paragraph",
                           content: "다운로드 대역폭 - ISP에서 제공하는 최대 다운로드 대역폭을 입력하십시오."
                       }]
},
       QOS_DEVICE_PRIORITY :{ 
               TITLE:"기기 우선 순위",
               CONTENT: [{
                           type: "paragraph",
                           content: "우선 순위를 정할 장치와 우선 순위를 정하십시오."
                       } ,{                      
                           type: "step",
                           title: "장치의 우선 순위를 지정합니다",
       content: [ 
                "1. 목록에서 우선 순위를 지정하고 우선 순위를 토글 할 장치를 찾습니다.",
                "2. Timing 열에서 장치의 우선 순위를 선택하십시오."]
}]
},
       SECURITY_FIREWALL :{ 
               TITLE:"방화벽",
               CONTENT: [{
                           type: "name",
                           title: "방화벽",
                           content: "SPI (Stateful Packet Inspection) 방화벽은 사이버 공격을 방지하고 프로토콜을 기반으로 라우터를 통과하는 트래픽의 유효성을 검사합니다. 기본적으로이 기능은 사용하도록 설정되어 있습니다."
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"Dos 보호",
               CONTENT: [{
                           type: "name",
                           title: "Dos 보호",
                           content: "DoS(Denial of Service) 차단 기능은 DoS 공격이 서버 요청들로 네트워크 플러딩을 일으키는 것으로부터 LAN을 보호합니다. ",
       children: [{                      
                           type: "name",
                           title: "사용안함",
                           content: "보호하지 않습니다."
                       } ,{                      
                           type: "name",
                           title: "낮음",
                           content: "늦은 수준으로 공유기의 낮은 공격만 보호 할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "중간",
                           content: "중간 수준으로 공유기의 일반 공격만 보호 할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "높음",
                           content: "높은 수준으로 공유기의 고급 공격 보호 할 수 있습니다."
                       }]
} ,{                      
                           type: "name",
                           title: "ICMP-FLOOD 공격 필터링 사용함",
                           content: "ICMP(Internet Control Message Protocol) 플러딩 공격 차단을 활성화 하십시오."
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD 공격 필터링 사용함",
                           content: "UDP(User Datagram Protocol) 플러딩 공격 차단을 활성화 하십시오."
                       } ,{                      
                           type: "name",
                           title: "TCP-SYN-FLOOD 공격 필터링 사용함",
                           content: "TCP-SYN(Transmission Control Protocol-Synchronize) 플러딩 공격 차단을 활성화 하십시오."
                       } ,{                      
                           type: "name",
                           title: "WAN 포트의 Ping 패킷 무시",
                           content: "WAN포트로 수신 된 Ping 패킷 무시할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "LAN 포트의 Ping 패킷 차단",
                           content: "LAN포트로 수신 된 Ping 패킷 무시할 수 있습니다."
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"차단된 DoS 호스트 목록 도움말",
               CONTENT: [{
                           type: "paragraph",
                           content: "이 표는 차단된 DoS 호스트의 IP 주소와 MAC 주소를 보여줍니다."
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"접속 제어 관리",
               CONTENT: [{
                           type: "paragraph",
                           content: "접근 제어(Access Control) 기능은 특정 클라이언트 단말기가 네트워크에 접근하는 것을 허용 또는 차단하는 데 사용됩니다. "
                       } ,{                      
                           type: "step",
                           title: "접근 제어 ",
       content: [ 
                "1. 클릭하여 접근 제어를 활성화 합니다.",
                "2. 게스트 네트워크에 연결된 단말기의 접근도 제어하고자 한다면, 게스트 단말기 제어(Guest Devices Control)를 클릭하십시오.",
                "3. 요구사항에 따라 접근 모드를 선택한 뒤, 저장을 클릭하십시오.",
                "A. 아래 목록에 나열되어 있는 단말기의 접근을 차단하려면, 블랙리스트를 선택하십시오.",
                "B. 아래 목록에 나열되어 있는 단말기의 접근만 허용하려면, 화이트리스트를 선택하십시오.",
                "4. 블랙리스트/화이트리스트 섹션의 단말기에서 추가를 클릭하십시오. 단말기 이름과 단말기의 MAC 주소를 입력하고 저장을 클릭하십시오."]
} ,{                      
                           type: "note",
                           title: "참고:",
                           content: "해당 입력값을 비활성화 하려면 전구 아이콘을 클릭하십시오."
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"장치 온라인",
               CONTENT: [{
                           type: "paragraph",
                           content: "이 표는 연결된 모든 단말기들에 대한 정보를 보여줍니다(게스트 단말기 제어가 활성화 된 경우 게스트 네트워크에 연결된 단말기 포함)."
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"IP&MAC 바인딩",
               CONTENT: [{
                           type: "paragraph",
                           content: "IP & MAC Binding(ARP Binding이라고도 함) 기능은 단말기의 IP 주소와 MAC 주소를 함께 바인딩함으로써 LAN에서 특정 장치의 접근을 제어하는 데 유용합니다. "
                       } ,{                      
                           type: "step",
                           title: "단말기의 IP & MAC Binding 기능 설정",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2. 디바이스의 MAC 주소을 입력하십시오.",
                "3. 상기 MAC 주소에 바인딩 하고자 하는 IP 주소를 입력하십시오. ",
                "4. 상태 사용함을 선택하십시오.",
                "5. 저장을 클릭합니다."]
} ,{                      
                           type: "note",
                           title: "참고:",
       content: [ 
                "1. 둘 이상의 MAC 주소와 동일한 IP 주소를 바인딩 할 수있다.",
                "2. 해당 입력값을 비활성화 하려면 전구 아이콘을 클릭하십시오."]
}]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"ARP 목록",
               CONTENT: [{
                           type: "paragraph",
                           content: "이 표는 현재 연결되어 있는 단말기의 MAC 주소와 IP 주소를 나열하고 있습니다. "
                       }]
},
       IPV6 :{ 
               TITLE:"인터넷",
               CONTENT: [{
                           type: "name",
                           title: "IPv6",
                           content: "IPv6(Internet Protocol version 6)는 IP(Internet Protocol)의 최신 버전으로서 IPv4(Internet Protocol version 4) 주소 고갈 문제를 처리합니다. "
                       } ,{                      
                           type: "title",
                            title: "인터넷 회선 유형: 동적IP"
                       } ,{                      
                           type: "name",
                           title: "동적 IP",
                           content: "ISP에서 동적 IPv6 주소 할당을 사용하는 경우 이 형식을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "IPv6 주소/기본 DNS/보조 DNS",
                           content: "이 정보들은 ISP의 DHCPv6 서버에 의해 자동 할당됩니다."
                       } ,{                      
                           type: "name",
                           title: "갱신",
                           content: "ISP의 DHCPv6의 새로운 IPv6 정보를 수신하려면 클릭하십시오."
                       } ,{                      
                           type: "name",
                           title: "해제",
                           content: "ISP의 DHCPv6에 의해 할당된 IPv6 주소를 모두 해제하려면 클릭하십시오."
                       } ,{                      
                           type: "name",
                           title: "IPv6 주소를 가져오기",
                           content: "비일시적인 IPv6 주소를 가져오려려면 DHCPv6를 선택하고, ISP에 따라 공유기 광고 패킷으로부터 생성된 IPv6 주소를 가져오려면 SLAAC을 선택하십시오. "
                       } ,{                      
                           type: "name",
                           title: "접두어 위임",
                           content: "ISP에서 DHCPv6 서버에 의해 접두어 위임을 받으려면 사용, 수동으로 주소 접두사를 지정하려면 사용 안함을 선택합니다. LAN에 연결된 클라이언트는 이 접두사와 IPv6 주소를 생성합니다."
                       } ,{                      
                           type: "name",
                           title: "DNS 주소",
                           content: "ISP에서 동적으로 수신'을 선택하거나 '다음 DNS 주소 사용'을 선택하십시오. 후자를 선택하는 경우, ISP에서 제공하는 DNS 주소를 직접 입력해 주십시오. "
                       } ,{                      
                           type: "title",
                            title: "인터넷 회선 유형: 고정IP"
                       } ,{                      
                           type: "name",
                           title: "고정 IP",
                           content: "ISP가 고정 IPv6 주소 할당을 사용하는 경우 이 형식을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "IPv6 주소/기본 게이트웨이/기본 DNS/보조 DNS",
                           content: "ISP에서 제공한 값을 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "MTU 크기(바이트단위)",
                           content: "일반적인 MTU(Maximum Transmission Unit) 값은 1500바이트 입니다. 일부 인터넷 회선 업체의 경우 MTU 값의 변경이 요구될 수 있습니다. 이는 드문 경우이지만, 필요하다고 판단되는 경우에만 인터넷 회선 제공업체 확인 후 변경하시기 바랍니다."
                       } ,{                      
                           type: "title",
                            title: "인터넷 연결 유형 : 6to4 Tunnel"
                       } ,{                      
                           type: "name",
                           title: "6to4 터널",
                           content: "ISP에서 주소 할당 시 6to4 구축을 적용하는 경우 이 형식을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "IPv4주소/IPv4 서브넷 마스크/IPv4 기본 게이트웨이/Tunnel 주소",
                           content: "연결을 클릭 한 후 이러한 변수들이 WAN 포트의 IPv4 정보에 의해 자동으로 생성됩니다."
                       } ,{                      
                           type: "name",
                           title: "다음 DNS 서버 사용",
                           content: "ISP에서 제공한 대로 기본 DNS 및/또는 보조 DNS를 직접 입력하려면 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "연결",
                           content: "클릭하여 인터넷에 연결하십시오."
                       } ,{                      
                           type: "name",
                           title: "연결 끊기",
                           content: "클릭하여 인터넷 연결을 해제하십시오."
                       } ,{                      
                           type: "title",
                            title: "인터넷 회선 유형: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE",
                           content: "ISP에서 PPPoEV6를 사용하고 사용자 이름과 암호를 제공하는 경우 이 형식을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "사용자 이름/비밀번호",
                           content: "ISP에서 제공한 값을 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "IPv6 주소",
                           content: "사용자 이름과 암호를 입력하고 '연결'을 클릭하면, 이 주소가 ISP의 DHCPv6 서버에 의해 자동 할당됩니다. "
                       } ,{                      
                           type: "name",
                           title: "IPv6 주소를 가져오기",
                           content: "비일시적 IPv6 주소를 가져오려면 'DHCPv6'를, 공유기 광고 패킷으로부터 생성된 IPv6 주소를 가져오려면 'SLACC'을, ISP에 따라 IPv6 주소를 직접 입력하려면 'ISP 지정'을 선택하십시오. "
                       } ,{                      
                           type: "name",
                           title: "접두어 위임",
                           content: "ISP에서 DHCPv6 서버에 의해 접두어 위임을 받으려면 사용, 수동으로 주소 접두사를 지정하려면 사용 안함을 선택합니다. LAN에 연결된 클라이언트는 이 접두사와 IPv6 주소를 생성합니다."
                       } ,{                      
                           type: "name",
                           title: "DNS 주소",
                           content: "ISP에서 동적 수신' 또는 '다음 DNS 주소 사용'을 선택하십시오. 후자를 선택하는 경우, ISP에서 제공하는 DNS 주소를 직접 입력해 주십시오."
                       } ,{                      
                           type: "name",
                           title: "연결",
                           content: "클릭하여 인터넷에 연결하십시오."
                       } ,{                      
                           type: "name",
                           title: "연결 끊기",
                           content: "클릭하여 인터넷 연결을 해제하십시오."
                       } ,{                      
                           type: "title",
                            title: "인터넷 연결 유형: 통과 (브리지)"
                       } ,{                      
                           type: "paragraph",
                           content: "ISP에서 Pass-Through(Bridge) 네트워크 구축을 사용하는 경우 이 형식을 선택하십시오. 이러한 형식의 연결에는 설정이 필요 없습니다. "
                       }]
},
       IPV6_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "인터넷 연결 형식 Pass-Through(Bridge)를 제외하고 기타 모든 인터넷 연결 형식에는 IPv6 설정이 요구됩니다."
                       } ,{                      
                           type: "name",
                           title: "할당 유형",
                           content: "ISP에 따라 적합한 것을 선택하십시오.",
       children: [{                      
                           type: "name",
                           title: "DHCPv6",
                           content: "자동으로 LAN에 있는 클라이언트에 IP 주소를 할당합니다.",
       children: [{                      
                           type: "name",
                           title: "주소 접두사",
                           content: "ISP에서 제공하는 주소 접두사를 입력하십시오."
                       } ,{                      
                           type: "name",
                           title: "해제 시간",
                           content: "할당된 IP 주소의 유효 시간입니다. 기본 86400초를 유지하거나 ISP에서 요구하는 경우에는 변경하십시오."
                       } ,{                      
                           type: "name",
                           title: "주소",
                           content: "ISP의 DHCPv6에 의해 자동 할당된 IP 주소입니다."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+stateless DHCP",
       children: [{                      
                           type: "name",
                           title: "주소 접두사",
                           content: "ISP에서 제공하는 주소 접두사를 입력하십시오."
                       } ,{                      
                           type: "name",
                           title: "주소",
                           content: "ISP에 의해 자동으로 할당된 IP 주소입니다."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+RDNSS",
       children: [{                      
                           type: "name",
                           title: "주소 접두사",
                           content: "ISP에서 제공하는 주소 접두사를 입력하십시오."
                       } ,{                      
                           type: "name",
                           title: "주소",
                           content: "ISP에 의해 자동으로 할당된 IP 주소입니다."
                       }]
}]
}]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"MAC 클론",
               CONTENT: [{
                           type: "paragraph",
                           content: "Select the appropriate MAC Clone method as you need."
                       } ,{                      
                           type: "name",
                           title: "MAC 주소를 복제하지 마십시오",
                           content: "ISP가 MAC 주소에 할당된 IP 주소를 바인딩 하지 않는 경우 공유기의 기본 MAC 주소를 변경하지 마십시오."
                       } ,{                      
                           type: "name",
                           title: "현재 컴퓨터 MAC 주소를 복제",
                           content: "인터넷 서비스 제공업체가 사용자의 랜카드의 MAC 주소 등록을 요청했을 경우, 공유기에 연결된 컴퓨터의 현재 MAC 주소하기를 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "사용자 PC의 MAC 주소",
                           content: "인터넷 서비스 제공업체가 특정 MAC 주소에 IP 주소를 할당하는 경우, 수동으로 MAC 주소를 입력하십시오."
                       }]
},
       TIME_SETTING :{ 
               TITLE:"시간설정",
               CONTENT: [{
                           type: "paragraph",
                           content: "시간 설정 기능을 사용하여 공유기의 시스템 시간을 설정할 수 있습니다. 변경된 시스템 시간은 시청연령제한 등 시간 기반 기능과 설정에 적용됩니다. "
                       } ,{                      
                           type: "note",
                           title: "참고:",
                           content: "클릭을 통해 설정 이전에' 24시간제' 기능을 활성화 할 수 있습니다. 활성화 된 24시간제 기능은 시스템 시간 기반 기능과 설정에 적용됩니다. "
                       } ,{                      
                           type: "title",
                            title: "시스템 시간"
                       } ,{                      
                           type: "step",
                           title: "인터넷에서 시간 가져오기",
       content: [ 
                "인터넷에서 가져오기' 기능은 기본값으로 선택되며, 이 기능을 통해 인터넷에서 시스템 시간을 가져올 수 있습니다. ",
                "1. '인터넷에서 가져오기'를 선택합니다.",
                "2. 아래 메뉴에서 '현지 시간대'를 선택하십시오. ",
                "3. 'NTP 서버 I' 영역에 필요한 NTP 서버의 IP 주소 또는 도메인 이름을 입력하십시오. ",
                "4. NTP서버2에서 두번때 NTP서버의 IP주소 또는 도메인 이름을 입력합니다.(옵션)",
                "5. 가져오기를 클릭합니다.",
                "6. 저장을 클릭하세요."]
} ,{                      
                           type: "step",
                           title: "PC에서 시간 가져오기",
       content: [ 
                "이 기능을 통해 PC에서 시스템 시간을 가져올 수 있습니다. 설정 전에 PC 시간을 확인하십시오.",
                "PC에서 가져오기'를 선택하고 '저장'을 클릭하십시오."]
} ,{                      
                           type: "step",
                           title: "수동 시간 설정",
       content: [ 
                "단말기가 인터넷이나 PC에서 시간을 자동으로 가져오지 못하는 경우 시스템 시간을 직접 설정할 수 있습니다.",
                "1. '수동'을 선택합니다.",
                "2. '현재 날짜와 시간'을 입력합니다.",
                "3. 저장을 클릭하십시오. "]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "서머타임제",
                           content: "이 기능을 통해 시스템 시간을 서머타임과 자동으로 동기화 할 수 있습니다."
                       } ,{                      
                           type: "step",
                           title: "일광절약시간제 설정하기",
       content: [ 
                "1. 일광절약시간제를 선택합니다.",
                "2. 현지 시간대에 서머타임 기간을 지정하십시오.",
                "3. 저장을 클릭하십시오. "]
}]
},
       DIGNOSTIC :{ 
               TITLE:"진단도구",
               CONTENT: [{
                           type: "paragraph",
                           content: "공유기가 네트워크 문제 해결을 위해 Ping과 Traceroute 도구를 제공합니다."
                       } ,{                      
                           type: "title",
                            title: "Ping 및 Traceroute"
                       } ,{                      
                           type: "paragraph",
                           content: "Ping 도구는 패킷을 타깃 IP 주소나 도메인 이름으로 전송하고, 송수신된 패킷 개수, 왕복 시간 등 결과를 기록합니다. "
                       } ,{                      
                           type: "paragraph",
                           content: "Traceroot 도구는 패킷을 타깃 IP 주소나 도메인 이름으로 전송하고, 목적지에 도달하기까지의 거쳐간 라우트와 시간을 표시합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "IP 주소나 도메인 이름(예: tp-link.com, yahoo.com)으로 로컬 단말기를 ping 또는 traceroute 할 수 있습니다. "
                       } ,{                      
                           type: "step",
                           title: "Ping 사용하여 진단하기",
       content: [ 
                "1. Ping을 진단 도구로 선택합니다.",
                "2. 타깃 IP 주소 또는 도메인 이름을 입력하십시오.",
                "3. 화살표 아이콘을 클릭하여 '고급' 메뉴를 열고 'Ping 개수', 'Ping 패킷 크기' 를 지정하십시오(옵션). ",
                "4. '시작'을 클릭하십시오."]
} ,{                      
                           type: "step",
                           title: "Traceroute 사용하여 진단하기",
       content: [ 
                "1. Traceroute를 진단 도구로 선택합니다.",
                "2. 타깃 IP 주소 또는 도메인 이름을 입력하십시오.",
                "3. 화살표 아이콘을 클릭하여 '고급' 메뉴를 열고 Traceroute Max TTL(Time to Live) 영역에 거쳐간 경로를 지정합니다. 기본값은 20입니다(옵션). ",
                "4. '시작'을 클릭하십시오."]
}]
},
       PORT_MIRROR :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                            title: "포트 미러링(Mirroring)"
                       } ,{                      
                           type: "paragraph",
                           content: "포트 미러링(Port Mirroring)이란 패킷 사본을 미러링 된 포트에서 미러링 포트로 포워드하는 프로세스를 말합니다. 일반적으로 미러링 포트는 데이터 진단 단말기에 연결됩니다. 데이터 진단 단말기는 네트워크 모니터링 및 문제해결을 위해 미러링 된 패킷을 분석하는 데 사용됩니다. "
                       } ,{                      
                           type: "step",
                           title: "패킷 사본을 지정된 포트로 포워드 하기",
       content: [ 
                "1. 포트 미러링을 활성화 합니다.",
                "2. 필요한 포트를 미러링 된 포트로 선택합니다.",
                "3. 필요한 포트를 미러링 포트로 선택합니다.",
                "4. 저장을 클릭합니다."]
} ,{                      
                           type: "note",
                           title: "참고:",
                           content: "포트는 미러링 된 포트와 미러링 포트로 동시에 설정될 수 없습니다. "
                       }]
},
       FIRMWARE :{ 
               TITLE:"펌웨어 업그레이드",
               CONTENT: [{
                           type: "paragraph",
                           content: "펌웨어 업그레이드' 기능은 공유기의 펌웨어를 새로운 기능이나 버그 수정으로 업데이트 합니다. 최적의 성능을 위해 최근 펌웨어 파일로 공유기를 업그레이드할 것을 권장합니다."
                       } ,{                      
                           type: "step",
                           title: "다음 사항에 유의하여 업그레이드 실패를 예방하십시오. ",
       content: [ 
                "펌웨어 업그레이드 전",
                "1. 공유기와 컴퓨터 사이에 안정적이게 연결되었는지 확인하십시오. 무선으로 펌웨어 업그레이드하기를 권장하지 않습니다. ",
                "2. 공유기에 연결된 모든 USB 장치를 제거하였는지 확인하십시오. ",
                "3. 공유기 설정 파일을 백업하십시오. ",
                "펌웨어 업그레이드 중",
                "업그레이드가 완료되기 전 공유기 전원을 끄지 마십시오. "]
}]
},
       FIRMWARE_UPGRADE_ONLINE :{ 
               TITLE:"To upgrade the firmware online",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "업그레이드 메시지가 나타나면 확인을 클릭합니다. 공유기가 자동으로 다운로드 및 최신 펌웨어로 업그레이드합니다. 또한 최신 펌웨어 버전을 확인하기 위해 업그레이드 확인을 클릭할 수 있습니다."]
}]
},
       FIRMWARE_UPGRADE :{ 
               TITLE:"To upgrade the firmware manually",
               CONTENT: [{
                           type: "step",
       content: [ 
                "1. 페이지 하단의 '지원'을 클릭하여 최신 펌웨어를 컴퓨터에 다운로드 하십시오. 다운로드 하려는 펌웨어 파일이 페이지에 표시된 공유기의 하드웨어 버전과 일치하는지 확인하십시오.",
                "2. 시작하기를 클릭하고 펌웨어 파일을 선택하십시오. ",
                "3. 업그레이드를 선택하십시오. "]
} ,{                      
                           type: "paragraph",
       content: [ 
                "펌웨어 업그레이드를 완료하는 데 몇 분 정도 걸립니다. 펌웨어 업그레이드가 완료되면 공유기가 자동으로 재부팅됩니다."]
}]
},
       BACKUP :{ 
               TITLE:"백업 및 복원",
               CONTENT: [{
                           type: "paragraph",
                           content: "백업 및 복구' 기능을 통해 복구를 위한 공유기의 현재 설정을 백업하거나 공유기를 기본 환경설정으로 복구할 수 있습니다."
                       } ,{                      
                           type: "note",
                           title: "참고:",
                           content: "백업 또는 복구가 진행되는 동안에는 컴퓨터 전원을 절대로 끄지 마십시오."
                       } ,{                      
                           type: "title",
                           title: "백업",
                           content: "공유기가 이전 상태로 복원할 수 있도록 현재 설정을 백업하기를 권장합니다. "
                       } ,{                      
                           type: "step",
                           title: "현재 설정 백업하기",
       content: [ 
                "1. 백업을 클릭하십시오. ",
                "2. 공유기 현재 설정 백업하기를 기다려주십시오. "]
}]
},
       RESTORE :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "복구",
                           content: "공유기를 백업 파일에서 이전 상태로 복구할 수 있습니다."
                       } ,{                      
                           type: "step",
                           title: "백업으로부터 복구하기",
       content: [ 
                "1. 브라우즈를 클릭하세요",
                "2. 백업파일의 경로를 지정하세요.",
                "3. 복구를 클릭하세요."]
}]
},
       FACTORY :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "공장초기화",
       content: [ 
                "공장 초기화하게 되면 무선, 자녀보호 및 네트워크 정보 등 모든 설정이 제거되고 공유기 기본값으로 변경됩니다. ",
                "공장 초기화 한 후에는 공유기의 웹 관리 페이지에 액세스 할 새 비밀번호를 설정해야합니다."]
}]
},
       REBOOT :{ 
               TITLE:"재부팅 일정",
               CONTENT: [{
                           type: "paragraph",
                           content: "재부팅 일정 기능은 공유기의 실행 성능을 향상시키기 위해 캐시를 삭제하여 수동으로 공유기를 재부팅하거나 정기적으로 재부팅 설정할 수 있습니다."
                       } ,{                      
                           type: "step",
                           title: "수동 재부팅",
       content: [ 
                "재부팅'을 클릭하고 공유기가 재시작될 때까지 몇 분 간 기다리십시오."]
} ,{                      
                           type: "step",
                           title: "재부팅 시간을 설정합니다",
       content: [ 
                "1. 재부팅 일정을 활성화합니다.",
                "2.공유기가 재부팅 시간의 시기와 빈도 매개 변수를 지정하고 반복하여 재부팅합니다.",
                "3. 저장을 클릭하십시오. "]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"관리",
               CONTENT: [{
                           type: "paragraph",
                           content: "관리는 로그인 암호와 공유기에 연결된 클라이언트의 액세스 권한을 관리 할 수 ​​있습니다."
                       } ,{                      
                           type: "name",
                           title: "관리계정",
                           content: "이 기능을 통해 암호를 변경할 수 있습니다.",
       children: [{                      
                           type: "step",
                           title: "암호 변경",
       content: [ 
                "1. 이전 암호를 입력합니다.",
                "2. 새 암호를 입력합니다.",
                "3. 새 암호를 다시 한번 입력합니다.",
                "4. 저장을 클릭합니다."]
}]
}]
},
       ADMIN_RECOVERY :{ 
               TITLE:"비밀번호 복구",
               CONTENT: [{
                           type: "name",
                           title: "기본 암호 복구",
                           content: "기본 비밀번호 복구는 출고시 기본 설정으로 복원하지 않고 기본 로그인 암호를 복구 할 수 있습니다.",
       children: [{                      
                           type: "step",
                           title: "암호 변경",
       content: [ 
                "1. 기본 암호 복구 기능을 활성화합니다.",
                "2. 발신자 필드에 로그인 정보를 복구하기 위해 검증 코드를 전송하는데 사용할 올바른 이메일 주소를 입력합니다.",
                "3. 수신자 필드에 검증 코드를 수신할 올바른 이메일 주소를 입력합니다.",
                "4. 발신 이메일(발신자)의 SMTP 서버를 입력합니다.",
                "5. 발신자 필드에 이메일 암호화가 필요한 경우, '인증 활성화' 체크박스를 선택하고 사용자 이름 (이메일 주소)과 암호를 입력해야 합니다.",
                "6. 저장을 클릭하세요."]
}]
}]
},
       ADMIN_LOCAL :{ 
               TITLE:"로컬 관리",
               CONTENT: [{
                           type: "paragraph",
                           content: "이 기능을 사용하면 로컬 장치가 라우터에 액세스하여 관리 할 수 ​​있습니다."
                       } ,{                      
                           type: "name",
                           id: "local_management_https",
                           title: "HTTPS를 통한 로컬 관리",
                           content: "HTTPS 및 HTTP를 통해 라우터에 액세스하려면 HTTPS를 통한 로컬 관리를 사용하고 HTTP를 통해 라우터에만 액세스하려면 비활성화 된 상태로 유지하십시오."
                       } ,{                      
                           type: "name",
                           title: "모든 LAN에 연결된 기기 접근하기",
                           content: "활성화시 모든 LAN 연결된 기기들의 관리가 가능하고 비활성화시 특별한 기기들만 관리가 가능합니다."
                       } ,{                      
                           type: "name",
                           title: "MAC 주소",
                           content: "제한된 접속기기의 MAC주소를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "설명",
                           content: "제한된 접속기기의 간단한 설명을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "상태",
                           content: "제한된 접속기기의 현재상태를 표시합니다.(활성화 또는 비활성화)"
                       } ,{                      
                           type: "name",
                           title: "수정",
                           content: "리스트상의 해당 기기를 변경하고 삭제할수 있는 옵션을 표시합니다."
                       } ,{                      
                           type: "step",
                           title: "리스트에 클라이언트 기기 추가하기",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2. 현재기기 보기를 클릭하여 현재 기기를 선택하거나 MAC주소 필드에 기기의 MAC주소를 입력합니다.",
                "3. 기기의 설명을 입력합니다.",
                "4. 상태 사용함을 선택하십시오.",
                "5. OK 버튼을 클릭하십시오."]
} ,{                      
                           type: "step",
                           title: "리스트에 기기를 변경하거나 삭제하기",
                           content: "테이블에서, 수정하거나 삭제하려는 기기에 해당하는 편집 아이콘 또는 쓰레기통 아이콘을 클릭합니다."
                       } ,{                      
                           type: "step",
                           title: "여러장치삭제하기",
                           content: "삭제를 원하는 모든 기기를 선택하여 삭제를 클릭합니다."
                       }]
},
       ADMIN_REMOTE_WITHOUT_HTTPS :{ 
               TITLE:"원격관리",
               CONTENT: [{
                           type: "name",
                           title: "원격관리",
                           content: "원격 관리' 기능은 원격 단말기의 공유기 접근과 관리를 허용합니다.",
       children: [{                      
                           type: "step",
                           title: "모든 원격 단말기들의 공유기 관리 금지",
                           content: "원격 관리 비활성화'를 선택하고 '저장'을 클릭합니다."
                       } ,{                      
                           type: "step",
                           title: "모든 원격 단말기의 공유기 관리 허용",
       content: [ 
                "1. 모든 장치에 대한 원격 관리를 활성화합니다.",
                "2. 원격 기기가 공유기를 액세스할 웹 관리 포트(1024-65535 또는 80)를 입력합니다.",
                "3. 저장을 클릭하십시오. "]
} ,{                      
                           type: "step",
                           title: "특정 원격 단말기의 공유기 관리 허용",
       content: [ 
                "1. 특정 장치에 원격 관리 활성화를 선택합니다.",
                "2. 해당 원격 기기가 공유기를 액세스할 웹 관리 포트(1024-65535 또는 80)를 입력합니다.",
                "3. 공유기를 관리하는 원격 기기의 원격 관리 IP 주소를 입력합니다.",
                "4. 저장을 클릭합니다."]
}]
}]
},
       ADMIN_REMOTE :{ 
               TITLE:"원격관리",
               CONTENT: [{
                           type: "paragraph",
                           content: "원격관리 기능은 사용자가 인터넷을 통하여 원격으로 공유기의 접근과 환경설정을 가능하게 합니다."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step_title",
                           content: "원격 관리를 설정"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step1",
                           content: "1. 원격 관리 기능을 사용하려면 확인란을 선택하십시오."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step2",
                           content: "2. HTTPS 포트와 HTTP 포트를 기본 설정으로 유지하십시오."
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step3",
                           content: "3. 라우터에 원격으로 액세스 할 수있는 원격 장치를 결정하려면 선택하십시오.",
       children: [{                      
                           type: "name",
                           title: "모든 단말기",
                           content: "모든 원격 장치가 라우터에 액세스 할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "지정된 장치",
                           content: "라우터에 액세스 할 원격 장치의 IP 주소를 입력하십시오."
                       }]
} ,{                      
                           type: "paragraph",
                           id: "admin_remote_step4",
                           content: "4. 저장을 클릭합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "이제 관리 용 웹 주소 아래에 표시된 주소를 통해 라우터를 원격으로 관리 할 수 ​​있습니다."
                       } ,{                      
                           type: "note",
                           title: "참고:",
                           content: "위의 주소를 원격으로 방문 할 때 경고가 나타나면 계속 신뢰 (또는 유사한 옵션)를 클릭하여 계속하십시오."
                       }]
},
       LED_CONTROL_SETTINGS :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "paragraph",
                           content: "나이트 모드'가 활성화 되면, 매일 지정된 시간에 LED 전원이 꺼집니다. 이 때, 공유기 성능은 영향을 받지 않습니다."
                       } ,{                      
                           type: "step",
                           title: "나이트 모드' 활성화",
       content: [ 
                "1. '나이트 모드 활성화'를 선택합니다.",
                "2. LED가 꺼져 있는 시간을 지정합니다.",
                "3. 저장을 클릭하십시오. "]
}]
},
       SYSTEM_LOG :{ 
               TITLE:"시스템로그",
               CONTENT: [{
                           type: "paragraph",
                           content: "시스템 로그'는 공유기의 최근 활동을 보여줍니다. 표에는 시스템 로그의 유형, 수준, 로그 내용 등이 포함되며 필터링으로 보기가 가능합니다. 시스템 로그를 로컬 컴퓨터에 저장하거나 이메일로 전송이 가능합니다. "
                       } ,{                      
                           type: "step",
                           title: "로컬 컴퓨터에 시스템 로그 저장하기",
       content: [ 
                "1. 필요한 시스템 로그를 필터링할 유형 및 최소 수준을 설정하십시오. '수준' 목록은 내림차순으로 나열되고, 가장 낮은 수준이 마지막에 옵니다. ",
                "2. '로그 저장'을 클릭하여 시스템 로그 파일을 로컬 컴퓨터에 저장하십시오."]
} ,{                      
                           type: "step",
                           title: "이메일로 시스템 로그 수신하기",
       content: [ 
                "1. 필요한 시스템 로그를 필터링할 유형 및 최소 수준을 설정하십시오. '수준' 목록은 내림차순으로 나열되고, 가장 낮은 수준이 마지막에 옵니다. ",
                "2. '이메일 환경설정'을 클릭하십시오.",
                "3. '발신자' 영역에 발신 이메일로 사용될 유효한 이메일 주소를 입력하십시오.",
                "4. '수신자' 영역에 수신 이메일로 사용될 유효한 이메일 주소를 입력하십시오.",
                "5. 발신 이메일('발신자')의 SMTP 서버 주소를 입력하십시오.",
                "참고: 발신 이메일이 인증을 요구하는 경우, '인증 활성화' 체크박스를 선택하고 '사용자 이름'(이메일 주소)과 '암호'를 입력하십시오.",
                "6. 시스템 로그를 정기적으로 수신하고자 하는 경우, '자동 메일 활성화' 체크박스를 선택하고 특정 시간(24시간 시계 형식) 또는 시간 간격을 설정하십시오.",
                "현재 시스템 로그를 즉시 수신하고자 하는 경우, '지금 로그 메일 수신'을 클릭합니다.",
                "7. 저장을 클릭합니다."]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"트래픽 모니터",
               CONTENT: [{
                           type: "paragraph",
                           content: "과거 10분 간의 단말기 트래픽 사용량 또는 과거 10분/24시간/7일 간의 단말기 트래픽 사용량을 보여줍니다. "
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"트래픽 모니터 리스트",
               CONTENT: [{
                           type: "paragraph",
                           content: "목록은 단말기의 연결 형식(유선 또는 무선)에 따라 분류됩니다."
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"System Parameter",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wifi_title",
                           title: "무선 2.4GHz/5GHz",
                           content: "이 섹션에서 무선 네트워크에서의 트래픽 전송 규칙 정보를 설정할 수 있습니다. 잘 모르겠다면 기본 환경설정을 유지할 것을 권장한다."
                       } ,{                      
                           type: "name",
                           title: "신호 간격",
                           content: "40부터 1000 사이의 밀리세컨드를 입력하여 동기화된 무선네트워크 공유기의 신호패킷 사이의 간격을 정한다. 기본값은 100밀리세컨드입니다."
                       } ,{                      
                           type: "name",
                           title: "RTS한계점",
                           content: "공유기를 통한 전송데이터의 패킷 사이즈를 1부터 2346사이로 정한다. RTS(Request to Send) 한계점 기본값은 2346입니다. 만약 패킷사이즈가 기존한계점보다 클경우 공유기는 RTS 프레임을 보내 분할하여 전송하고 데이터 프레임 전송을 절충하거나 남은 패킷을 즉시 전송한다."
                       } ,{                      
                           type: "name",
                           title: "DTIM 간격",
                           content: "이 값은 DTIM(Delivery Traffic Indication Message)의 시간간격을 결정합니다. 1에서 15 사이의 값을 입력하십시오. 기본값 1은 DTIM 시간 간격이 비콘(Beacon) 시간 간격과 동일하다는 뜻입니다."
                       } ,{                      
                           type: "name",
                           title: "그룹키 업데이트 기간",
                           content: "초단위(최소30)을 입력하여 암호화된 키 자동 갱신 간격을 정한다. 기본값은 0이다. 키갱신 하지 않는 것을 나타낸다."
                       } ,{                      
                           type: "name",
                           title: "WMM특성",
                           content: "WMM기능은 패킷이 최우선 순위로 전송될 것을 보장한다. 기본적으로 활성화할 것을 권장합니다."
                       } ,{                      
                           type: "name",
                           title: "짧은 GI 특성",
                           content: "기본값으로 이 기능이 활성화 됩니다. GI(Guard Interval) 시간에 따라 패킷 용량을 증가시킬 것을 권장합니다."
                       } ,{                      
                           type: "name",
                           title: "AP Isolation 특성",
                           content: "네트워크에 연결된 모든 무선 단말기들의 상호 통신을 제한하면서 동시에 인터넷 접속을 원하는 경우, 'AP 격리 활성화' 체크박스를 선택하십시오. "
                       },{
                           type: "name",
                           title: "USB 3.0 간섭 감소",
                           content: "사용을 클릭하여 USB 3.0 간섭을 줄이십시오."
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
                           title: "WDS 활성화",
                           content: "WDS(Wireless Distribution System) 브릿지 기능을 사용하면, 무선 WLAN(로컬 네트워크)의 AP(Access Point)를 브릿지함으로써 무선 네트워크 커버리지를 확장할 수 있습니다. "
                       } ,{                      
                           type: "step",
       content: [ 
                "1. 'WDS 브릿지' 기능 활성화를 선택하십시오.",
                "2. '스캔' 기능에 따라 네트워크 브릿지하기: '스캔'을 클릭하여 사용가능한 네트워크를 모두 스캔하고 표시한 뒤, 브릿지하고자 하는 네트워크를 선택합니다. SSID(네트워크 이름), MAC 주소, 보안 등이 자동 입력됩니다. ",
                "수동으로 네트워크 브릿지하기: 브릿지 대상 네트워크의 SSID(네트워크 이름), MAC 주소, WDS 모드 등을 입력하십시오. '보안' 유형을 선택하고 브릿지 대상 네트워크와 동일하게 관련 정보들을 입력하십시오.",
                "3. 저장을 클릭하십시오. "]
} ,{                      
                           type: "note",
                           title: "참고:",
                           content: "WDS 모드'를 잘 모르겠다면, '자동'의 기본 옵션을 유지하십시오."
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "WPS",
                           content: "WPS(Wi-Fi Protected Setup) 기능을 사용하는 경우, WPS 버튼을 눌러 WPS 기능의 단말기를 공유기에 쉽게 연결할 수 있습니다. WPS 기능을 활성화를 확인한 후 , '저장'을 클릭하십시오."
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "NAT",
                           content: "기본값으로 이 기능은 활성화 됩니다. 기본 환경설정 유지를 권장합니다. 비활성화 할 경우, 인터넷 연결이 불가능할 수 있습니다."
                       } ,{                      
                           type: "note",
                           title: "참고:",
                           content: "NAT가 비활성화 상태일 때에는, NAT 포워딩 구성이 적용되지 않습니다."
                       } ,{                      
                           type: "name",
                           id: "sys_para_nat_boost",
                           title: "NAT부스트",
                           content: "NAT Boost 활성화' 체크박스를 선택하고 '저장'을 클릭하여 공유기의 최적 처리량이 보장되도록 합니다. "
                       } ,{                      
                           type: "note",
                           id: "sys_para_nat_boost_note",
                           title: "참고:",
                           content: "NAT부스트 활성화시, QoS와 트래픽 통계는 자동으로 비활성화 됩니다."
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "DOS 차단 환경설정",
                           content: "DOS 차단' 기능은 공유기를 ICMP-FLOOD, UDP-FLOOD, TCP-FLOOD 공격으로부터 보호합니다."
                       } ,{                      
                           type: "name",
                           title: "ICMP-FLOOD 패킷 레벨",
                           content: "5에서 7200 사이의 값을 입력하면 ICMP 패킷수가 현재 임계값을 초과할 때 ICMP-FLOOD 차단 기능이 즉각적으로 작동됩니다. "
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD 패킷 레벨",
                           content: "5에서 7200 사이의 UDP 패킷값을 입력하면 UDP 패킷수가 현재 임계값을 초과할 때 UDP-FLOOD 차단 기능이 즉각적으로 작동됩니다. "
                       } ,{                      
                           type: "name",
                           title: "TCP-FLOOD 패킷 레벨",
                           content: "5에서 7200 사이의 TCP-SYN 패킷값을 입력하면 TCP 패킷수가 현재 임계값을 초과할 때 TCP-SYN-FLOOD 차단 기능이 즉각적으로 작동됩니다. "
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "이중",
                           content: "아래 목록에서 듀플렉스 유형을 선택한 뒤 '저장'을 클릭합니다."
                       }]
},
       SYSTEM_PARA_LED :{ 
               TITLE:"LED",
               CONTENT: [{
                           type: "name",
                           title: "사용",
                           content: "라우터 성능에 영향을 미치지 않고 \"야간 모드 기간\" 중 LED를 끄려면 이 체크박스를 선택하세요."
                       } ,{                      
                           type: "name",
                           title: "야간 모드 기간",
                           content: "야간 모드를 얼마 동안 적용할지 그 기간을 지정하세요."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       OPEN_VPN :{ 
               TITLE:"OpenVPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "OpenVPN 기능을 통해 외출 시에 인터넷으로 안전하게 네트워크에 접속할 수 있습니다. VPN 서비스 사용 시, 동적 DNS 서비스를 설정하거나(권장) 공유기 WAN 포트에 고정 IP 주소를 할당해야 합니다. '시스템 시간'은 인터넷과 동기화되어야 합니다. "
                       } ,{                      
                           type: "name",
                           title: "서비스 타입",
                           content: "OpenVPN 서버의 통신 프로토콜(UDP 또는 TCP)을 선택하세요."
                       } ,{                      
                           type: "name",
                           title: "서비스 포트",
                           content: "1024에서 65535 사이에서 통신 포트 번호를 입력하십시오. 기본 및 일반적인 서비스 포트는 1194입니다."
                       } ,{                      
                           type: "name",
                           title: "VPN 서브넷/넷마스크",
                           content: "OpenVPN 서버가 클라이언트에 리스할 수 있는 IP 주소 범위를 입력하세요."
                       } ,{                      
                           type: "name",
                           title: "클라이언트 액세스",
                           content: "OpenVPN 클라이언트의 액세스 유형을 선택하십시오.",
       children: [{                      
                           type: "name",
                           title: "홈 네트워크로 제한",
                           content: "클라이언트는 홈 네트워크에만 접근이 가능합니다. 클라이언트의 기본 라우트는 변경되지 않습니다. "
                       } ,{                      
                           type: "name",
                           title: "인터넷 & 홈네트워크",
                           content: "해외에 있는 경우, 클라이언트는 홈 네트워크 및 지역 제한이 있는 인터넷 사이트나 서비스에 접근할 수 있습니다. 클라이언트의 기본 라우트는 변경됩니다."
                       }]
}]
},
       OPEN_VPN_CERTIFICATE :{ 
               TITLE:"인증서",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "원격 컴퓨터용 VPN 연결에 대한 정보 및 신분 확인에 인증서를 사용합니다.",
                "클릭해 새 인증서를 생성합니다."]
}]
},
       OPEN_VPN_CONF :{ 
               TITLE:"구성 파일",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "원격 클라이언트는 설정 파일을 이용하여 공유기에 접속합니다. ",
                "이 버튼을 클릭하면 새 VPN 연결을 추가하는 데 사용할 OpenVPN 구성 파일을 저장할 수 있습니다."]
}]
},
       OPEN_VPN_GUIDE :{ 
               TITLE:"VPN 클라이언트 설치 가이드",
               CONTENT: [{
                           type: "step",
                           title: "클라이언트 단말기와 OpenVPN 서버의 연결",
       content: [{                      
                           type: "paragraph",
                           content: "OpenVPN 서버를 설정하기에 앞서, 동적 DNS 서비스를 설정하거나(권장) WAN 포트에 고정 IP 주소를 할당하십시오. NAT 설정의 외부 포트가 서비스 포트가 돼서는 안되며, '시스템 시간'은 인터넷과 동기화 되어야 합니다."
                       },
                "1. 'VPN 서버 활성화'를 선택하십시오.",
                "2. OpenVPN 서버 정보(서비스 유형, 서비스 포트, 클라이언트 액세스, VPN 서브넷/넷마스크)를 설정하고 '저장'을 클릭하십시오.",
                "3. '내보내기'를 클릭하여 설정 파일을 저장하십시오.",
                "4. 클라이언트 단말기에서 <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a>로부터 OpenVPN 클라이언트 유틸리티를 다운로드하여 설치하십시오.",
                "지원되는 공식 플랫폼으로는 Windows, Mac OSX, Linux 등이 있습니다.",
                "5. OpenVPN 클라이언트 유틸리티 사용을 시작하고, 저장된 설정 파일을 사용하여 새로운 VPN 연결을 추가함으로써 클라이언트 단말기를 VPN 서버에 연결합니다."]
} ,{                      
                           type: "note",
                           title: "참고:",
                           content: "OpenVPN 클라이언트에 관한 자세한 사항은 <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>을 참고하세요."
                       }]
},
       PPTP_VPN :{ 
               TITLE:"PPTP VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "PPTP VPN 기능을 통해 외출 시 인터넷으로 쉽고 빠르게 네트워크에 접속할 수 있습니다. 일부 ISP에서 이 기능을 차단할 수 있습니다. VPN 서비스를 사용하려면 동적 DNS 서비스를 설정하거나(권장) 공유기 WAN 포트에 고정 IP 주소를 할당해야 합니다. '시스템 시간'은 인터넷과 동기화 되어야 합니다. "
                       } ,{                      
                           type: "name",
                           title: "클라이언트 IP 주소",
                           content: "PPTP VPN 서버가 클라이언트에 리스할 수 있는 IP 주소 범위(클라이언트 최대 1대)를 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "사용자 이름과 암호",
                           content: "PPTP VPN 서버에 클라이언트 신분을 인증하기 위해 사용자 이름과 암호를 입력합니다."
                       }]
},
       PPTP_VPN_GUIDE :{ 
               TITLE:"VPN 클라이언트 설치 가이드",
               CONTENT: [{
                           type: "step",
                           title: "클라이언트 단말기와 PPTP VPN 서버의 연결",
       content: [{                      
                           type: "paragraph",
                           content: "PPTP VPN 서버 설정에 앞서, 동적 DNS 서비스를 설정하거나(권장) WAN 포트에 고정 IP 주소를 할당하십시오. NAT 설정의 외부 포트가 1723가 돼서는 안되며 '시스템 시간'은 인터넷과 동기화 되어야 합니다."
                       },
                "1. 'VPN 서버 활성화'를 선택하십시오.",
                "2. PPTP VPN 서버 정보를 설정하고 '저장'을 클릭하십시오.",
                "3. 클라이언트 단말기에서 PPTP VPN 연결을 생성하십시오. 지원되는 공식 플랫폼으로는 Windows, Mac OSX, Linux, iOS, Android 등이 있습니다.",
                "4. PPTP VPN 프로그램을 시작한 뒤, 새로운 연결을 추가하고 등록된 DDNS 서비스의 도메인 이름이나 WAN 포트에 할당된 고정 IP 주소를 입력하여 클라이언트 단말을 PPTP VPN 서버와 연결합니다. "]
}]
},
       VPN_CONNNECTION :{ 
               TITLE:"VPN 연결",
               CONTENT: [{
                           type: "paragraph",
                           content: "이 페이지에는 현재 라우터가 호스트하고 있는 OpenVPN과 PPTP VPN 서버에 연결되어 있는 클라이언트들이 표시됩니다."
                       }]
},
       BASIC_NETWORK :{ 
               TITLE:"네트워크 맵",
               CONTENT: [{
                           type: "paragraph",
                           content: "네트워크 지도'에서 공유기의 현재 네트워크 연결 상태 및 무선 정보, 그리고 연결된 단말기의 정보 등을 확인할 수 있습니다."
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"인터넷",
               CONTENT: [{
                           type: "paragraph",
                           content: "인터넷 정보를 나타냅니다."
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"공유기",
               CONTENT: [{
                           type: "paragraph",
                           content: "무선 네트워크와 LAN 포트의 현재 네트워크 정보를 나타냅니다."
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"유선/무선 클라이언트",
               CONTENT: [{
                           type: "paragraph",
                           content: "공유기의 연결된 클라이언트의 네트워크 이름(편집 가능), 할당된 IP, MAC 주소 등을 나타냅니다."
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"프린터",
               CONTENT: [{
                           type: "paragraph",
                           content: "USB 포트를 통해 공유기에 연결된 프린터의 이름을 표시합니다."
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"USB 디스크",
               CONTENT: [{
                           type: "paragraph",
                           content: "USB 포트를 통해 공유기에 연결된 USB 디스크의 정보를 나타냅니다."
                       }]
},
       BASIC_SPEED_TEST :{ 
               TITLE:"속도 테스트",
               CONTENT: [{
                           type: "paragraph",
                           content: "이 기능은 서비스 제공 업체가 제공하는 업로드 및 다운로드 속도를 테스트하고 인터넷 기능에 대한 유용한 조언을 제공합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "팁 : 더 정확한 결과를 얻으려면 다른 앱과 프로그램을 종료 해보세요."
                       } ,{                      
                           type: "paragraph",
                           content: "History - 이전 속도 테스트 기록."
                       } ,{                      
                           type: "paragraph",
                           content: "다시 테스트 - 클릭하여 속도 테스트를 수행합니다."
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"인터넷",
               CONTENT: [{
                           type: "paragraph",
                           content: "자동 탐지'를 클릭하거나 인터넷 연결 유형을 직접 선택하십시오. 그 다음, ISP에서 제공한 해당 정보들을 입력하십시오."
                       }]
},
       BASIC_WIRELESS_SMART_CONNECT :{ 
               TITLE:"Smart Connect",
               CONTENT: [{
                           type: "paragraph",
                           content: "이 체크박스에 표시하면 SmartConnect를 선택하게 됩니다. 이 기능은 실제 상황에 따라 최적의 무선 대역폭을 할당해 네트워크 수요의 균형을 맞춤으로써 장치가 더 빨리 작동되도록 하는 기능입니다."
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"무선 설정",
               CONTENT: [{
                           type: "paragraph",
                           content: "무선 환경설정(SSID, 암호 등)을 설정할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "네트워크 이름(SSID)",
                           content: "네트워크 이름(SSID)을 변경할 것을 권장합니다. 대소문자를 구별합니다."
                       } ,{                      
                           type: "name",
                           title: "SSID 숨기기",
                           content: "2.4GHz/5GHz 네트워크 이름(SSID)을 무선 네트워크 목록에서 숨기고자 하는 경우 선택하십시오. 선택하는 경우, SSID가 방송되지 않고, 네트워크에 직접 가입해야 합니다. "
                       } ,{                      
                           type: "name",
                           title: "비밀번호",
                           content: "8-63자리 ASCII 문자 또는 16진수 8-64자리의 무선 비밀번호를 입력합니다."
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
               TITLE:"USB 저장 매체",
               CONTENT: [{
                           type: "paragraph",
                           content: "이 기능을 사용하면 LAN 상에서 또는 인터넷을 통해 여러 클라이언트 사이에서 USB 저장 매체들을 공유할 수 있습니다. "
                       } ,{                      
                           type: "title",
                           title: "장치 설정",
                           content: "단말기 환경설정' 섹션은 USB 포트를 통해 연결된 USB 저장 매체의 기본 정보를 보여줍니다. USB 플래시 디스크의 볼륨은 일반적으로 하나입니다. "
                       } ,{                      
                           type: "name",
                           title: "스캔",
                           content: "일반적으로 공유기는 새롭게 추가된 단말기를 자동 탐지합니다. 자동 탐지가 되지 않는 경우, 이 버튼을 클릭하면 업데이트 된 정보가 있는 화면을 스캔하고 새로고침할 수 있습니다. ",
       children: [{                      
                           type: "note",
                           title: "참고:",
                           content: "회색 영역은 비활성화 되어 있는 볼륨을 나타냅니다. 해당 영역을 클릭하여 특정 볼륨을 공유할 수 있습니다. "
                       }]
} ,{                      
                           type: "name",
                           title: "제거",
                           content: "이 버튼을 클릭하면 USB 포트에서 USB 저장 매체를 물리적으로 분리하기 전에 USB 저장 매체를 안전하게 분리할 수 있습니다. ",
       children: [{                      
                           type: "note",
                           title: "참고:",
                           content: "제거 버튼은 USB 저장 장치가 공유기에 연결되었을 때에만 나타납니다. 사용 중인 USB 저장 장치는 분리가 불가능합니다. "
                       }]
} ,{                      
                           type: "step",
                           title: "파일서버 설정하기",
       content: [ 
                "1. USB 저장 매체를 직접 또는 USB 케이블을 사용하여 USB 포트에 연결합니다. 단말기가 결합된 외부 전력을 요구하는 경우, 외부 전력의 연결 여부를 확인하십시오. ",
                "2. 새롭게 추가된 USB 단말기는 공유기에 의해 자동 탐지되고 '단말기 환경설정' 섹션에 표시되어야 합니다. 그렇지 않은 경우 '스캔'을 클릭하십시오. ",
                "참고 : 공유 아이콘이 나타납니다. 아이콘을 클릭하여 공유 할 필요가 없는 볼륨을 비활성화 할 수 있습니다."]
}]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"액세스 주소",
               CONTENT: [{
                           type: "name",
                           title: "네트워크/미디어 서버 이름",
                           content: "네트워크 환경' 방식 또는 '미디어 공유' 기능을 통해 연결된 USB 저장 매체에 액세스하는 데 사용되는 이름을 표시합니다. 기본값은 TP-Share 입니다."
                       } ,{                      
                           type: "name",
                           title: "접근 방법",
                           content: "공유 USB 스토리지 장치에 액세스하는 3 가지 방법이 있습니다.",
       children: [{                      
                           type: "name",
                           title: "네트워크 이웃",
                           content: "이 옵션을 선택하면 네트워크 상의 사용자가 '주소'열에 나열된 주소를 통해 공유 컨텐츠에 접근할 수 있습니다. "
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "이 옵션을 선택하면 FTP 서버 기능이 활성화 되어 네트워크 상의 FTP 클라이언트와 사용자가 '주소' 열에 나열된 FTP 주소를 통해 USB 저장 매체에 접근할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "FTP (via Internet)",
                           content: "이 옵션을 사용하면 FTP 클라이언트와 사용자가 인터넷 FTP를 통해 공유된 USB 저장 매체에 대한 원격 액세스, 파일 다운로드 및 업로드 등을 실행할 수 있습니다. 액세스 주소를 사용자 지정하려면 '편집'을 클릭하고 공유기의 동적 DNS를 설치합니다. FTP 서버의 포트를 변경하려면 새로운 포트 번호를 입력하고 '저장'을 클릭하여 변경사항을 적용합니다. "
                       }]
} ,{                      
                           type: "name",
                           title: "주소",
                           content: "공유된 USB 저장 장치에 접근하는 주소를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "포트",
                           content: "FTP 서버 액세스에 사용되는 포트 번호를 나타냅니다."
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"컨텐츠 공유",
               CONTENT: [{
                           type: "paragraph",
                           content: "공유하는 폴더를 표시합니다. 기본값으로 모든 폴더들이 공유됩니다. '편집' 아이콘을 클릭하여 공유 폴더를 사용자 지정할 수 있습니다. "
                       } ,{                      
                           type: "note",
                           title: "참고:",
                           content: "공유 아이콘이 장치 설정 섹션에 나타납니다. 공유 아이콘을 클릭하여 공유 할 필요가 없는 볼륨을 비활성화 할 수 있습니다."
                       }]
},
       FOLDER_SHARING :{ 
               TITLE:"공유 컨텐츠 및 보안",
               CONTENT: [{
                           type: "name",
                           title: "컨텐츠 공유",
                           content: "공유하는 폴더를 표시합니다. 기본값으로 모든 폴더들이 공유됩니다. '편집' 아이콘을 클릭하여 공유 폴더를 사용자 지정할 수 있습니다. ",
       children: [{                      
                           type: "note",
                           title: "참고:",
                           content: "공유 아이콘이 장치 설정 섹션에 나타납니다. 공유 아이콘을 클릭하여 공유 할 필요가 없는 볼륨을 비활성화 할 수 있습니다."
                       }]
} ,{                      
                           type: "name",
                           title: "인증 액세스",
       content: [ 
                "토글링으로 인증을 활성화하여 모든 공유 폴더를 액세스 할 때 올바른 사용자 이름과 암호를 입력하도록 합니다. 사용자는 읽기 권한만 있지만 관리자로 액세스하면 파일을 읽고 수정할 수 있습니다.",
                "사용자 이름은 문자나 밑줄로 시작하고 문자, 숫자, 밑줄을 포함하여 1-15자여야 합니다.",
                "암호는 문자, 숫자, 밑줄을 포함하여 1-15자여야 합니다."]
} ,{                      
                           type: "name",
                           title: "미디어 공유 사용함",
                           content: "이 기능이 활성화 되면, DNLA가 지원되는 모든 LAN 연결 단말기들이 모든 공유 폴더에서 미디어 파일에 액세스할 수 있습니다. "
                       }]
},
       BASIC_PRINT_SERVER :{ 
               TITLE:"프린터 서버",
               CONTENT: [{
                           type: "name",
                           title: "프린터 서버",
                           content: "클릭하여 프린터 서버 기능을 활성화 하십시오."
                       } ,{                      
                           type: "name",
                           title: "프린터 이름",
                           content: "공유기에 연결된 프린터의 이름을 표시합니다. "
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"자녀PC 관리 기능",
               CONTENT: [{
                           type: "paragraph",
                           content: "자녀보호 기능의 기본 환경설정을 통해 특정 시간대 별로 접속을 제한할 수 있습니다(예: 숙제 시간 자녀의 PC를 통한 인터넷 접속 제한)."
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"자녀PC 관리 기기",
               CONTENT: [{
                           type: "paragraph",
                           content: "이 표는 현재 시청연령제한 기능에 의해 제한되고 있는 단말기의 정보와 환경설정을 나타냅니다. "
                       } ,{                      
                           type: "step",
                           title: "새로운 클라이언트 장치를 제한합니다.",
       content: [ 
                "1. 토글하여 자녀보호 기능을 켭니다.",
                "2. 추가를 클릭합니다.",
                "3. 스캔을 클릭하여 현재 연결되어 있는 단말기를 액세스 단말기 목록에서 선택하십시오. 또는 단말기 이름과 MAC 주소를 직접 입력하여 연결되어 있지 않은 단말기를 추가하십시오. ",
                "4. 유효 시간 아이콘을 클릭하여 제한 적용 시간을 지정하십시오.",
                "5. 설명 영역에 간략한 설명을 입력하십시오. 이 영역은 선택사항입니다.",
                "6. 입력값 활성화를 선택하십시오.",
                "7. 저장을 클릭합니다."]
} ,{                      
                           type: "note",
                           title: "참고:",
                           content: "해당 입력값을 비활성화 하려면 전구 아이콘을 클릭하십시오."
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"게스트 네트워크",
               CONTENT: [{
                           type: "paragraph",
                           content: "본 기능 사용 시, 메인 네트워크를 공개하지 않고 게스트에게 Wi-Fi 액세스를 제공할 수 있습니다. "
                       } ,{                      
                           type: "name",
                           title: "게스트의 상호 접속 허용",
                           content: "이 체크박스를 선택하면 네트워크 환경, Samba, FTP 등과 같은 방법을 통해 게스트 네트워크(Guest Network) 상의 무선 단말기들이 상호 통신할 수 있습니다. "
                       } ,{                      
                           type: "name",
                           title: "게스트의 로컬 네트워크 접근 허용",
                           content: "이 체크박스를 선택하면 게스트 네트워크(Guest Network) 상의 무선 단말기들이 네트워크 환경, Samba, Ping, FTP 등과 같은 방법으로 공유기의 LAN 포트 또는 메인 네트워크에 연결된 단말기들과 통신할 수 있습니다. "
                       } ,{                      
                           type: "name",
                           title: "게스트 네트워 사용함",
                           content: "게스트 네트워크 기능을 사용하기 위해 이 확인란을 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "네트워크 이름(SSID)",
                           content: "기본 게스트 SSID를 사용하거나 (최대 32 자) 새로운 이름을 만듭니다."
                       } ,{                      
                           type: "name",
                           title: "SSID 숨기기",
                           content: "Wi-Fi 네트워크 목록에서 게스트 SSID를 숨기려면 이 확인란을 선택합니다."
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "비밀번호 업데이트 간격",
                           content: "게스트 네트워크(Guest Network) 암호의 업데이트 간격을 선택하십시오."
                       } ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "비밀번호",
                           content: "ASCII 문자 8-63자 사이, 또는 16진수 문자 8-64자(0-9, a-f, A-F)."
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "비밀번호",
                           content: "무작위로 생성된 비밀번호를 사용하거나, 8-63자리 ASCII 문자 또는 16진수(0-9, a-f, A-F) 8-64자리의 비밀번호를 생성합니다."
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"TP-Link 클라우드",
               CONTENT: [{
                           type: "paragraph",
                           content: "TP-Link 클라우드 서비스를 이용하여 원격으로 실시간으로 네트워크를 모니터링할 수 있으며 언제 어디서나 인터넷을 통하여 TP-Link 장치를 접근하거나 관리할 수 있습니다. "
                       }]
},
       ACCOUNT_INFO :{ 
               TITLE:"계정 정보",
               CONTENT: [{
                           type: "paragraph",
                           content: "당신의 Tp-Link 아이디 정보를 표시합니다. 편집 아이콘을 클릭하여 계정 정보를 편집할 수 있습니다"
                       }]
},
       DEVICE_INFO :{ 
               TITLE:"장치 정보 ",
               CONTENT: [{
                           type: "paragraph",
                           content: "장치를 관리하는 클라우드 계정을 포함하여 장치 정보를 표시합니다. "
                       }]
},
       BOUND_ACCOUNT :{ 
               TITLE:"연동 계정",
               CONTENT: [{
                           type: "paragraph",
                           content: "장치와 연동된 모든 클라우드 계정을 표시합니다. "
                       } ,{                      
                           type: "step",
                           title: "사용자 계정 연동하기",
       content: [ 
                "1. 연동을 클릭하십시오. ",
                "2. 연동하려는 등록된 이메일을 입력하십시오. ",
                "3. 저장을 클릭하십시오. "]
}]
},
       NEW_PARENTAL_CONTROL :{ 
               TITLE:"자녀PC 관리 기능",
               CONTENT: [{
                           type: "paragraph",
                           content: "연령별 필터, 액세스 제한 및 사용자 프로필을 사용하면 자녀 보호 기능이 가족에게 개인화되고 적절한 인터넷 액세스를 제공합니다."
                       } ,{                      
                           type: "step",
                           title: "새 장치에 유해 컨텐츠 차단을 적용합니다.",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2.이 프로필의 이름을 입력하고 \"+\"를 클릭하여이 프로필 아래에 장치를 추가하십시오.",
                "3. 필터 레벨을 선택하고 필요에 따라 필터 내용을 사용자 정의하십시오. 키워드를 입력하여 데이터베이스에서 필터링하려는 웹 사이트를 검색 할 수 있습니다. 다른 웹 사이트 (URL)는 수동으로 입력 할 수 있습니다. <br/> 다른 필터 카테고리에 대한 다음 설명을 참조하십시오. <p> 성인용 콘텐츠 - 포르노, 약물 사용, 폭력 및 차별을 포함하여 성적, 유해 또는 불법 콘텐츠가 포함 된 사이트 </ p> <p> 도박 - 온라인 도박 사이트를 포함하여 도박에 대한 정보를 홍보하거나 제공하는 사이트입니다. </ p> <p> 성교육 - 생식, 성행위, 안전한 성생활 및 피임을 포함하여 성적 취향에 대해 성적으로 토론하는 사이트입니다. </ p> <p> 온라인 커뮤니케이션 - 이메일, 블로그, 온라인 포럼, VoIP 및 비디오 채팅 서비스를 포함하여 텍스트, 음성 또는 비디오를 통해 다른 사람들과 의사 소통하는 형식을 호스팅하는 사이트 </ p> </ 소셜 네트워킹 - 비슷한 관심사, 직업, 배경 또는 실제 아는 사람을 기반으로하는 사람과 개인 활동을 연결하는 개인 표현 또는 커뮤니케이션을 배포하는 사이트 </ p> <p> 서핑에 대한 지불 - 사용자가 특정 </ p> <p> 미디어 - 스트리밍 서비스, TV 프로그램 또는 음악 다운로드를 포함하여 무료, 유료 또는 구독 한 오디오 및 / 또는 비디오 컨텐츠를 제공하는 사이트 </ p> > <p> 다운로드 - 피어 투 피어 공유, 온라인 파일 저장 및 모바일 장치 콘텐츠 (예 : 음악 및 응용 프로그램)를 포함한 파일 공유 및 배포를 제공하거나 제공하는 사이트 </ p> <p> 게임 - 사이트 온라인 게임, 게임 콘솔 네트워크 및 브라우저 게임을 포함하여 웹 호스팅 또는 다운로드 가능한 게임을 제공하거나 제공합니다. </ p>",
                "4.이 프로필이 온라인으로 소비 할 수있는 총 시간을 제한하려면 시간 제한을 활성화하고 지정하십시오. 침대 시간을 사용하여이 프로필에 속한 장치가 인터넷을 사용할 수없는 일일 시간대를 설정할 수도 있습니다.",
                "5. 저장을 클릭합니다."]
} ,{                      
                           type: "step",
                           title: "프로필의 자세한 인터넷 기록을 보세요.",
       content: [ 
                "1. 통계 열에서 해당 통계 버튼을 클릭하십시오.",
                "2. 더 많은 기록을 보려면 기록 <span class=\"ptl-ctr-help-icon history\"> </span> 버튼을 클릭하십시오.",
                "3. 클릭하여 웹 사이트를 차단 또는 차단 해제 할 수 있습니다. <span class=\"ptl-ctr-help-icon block\"></span> 또는 <span class=\"ptl-ctr-help-icon unblock\"></span> 버튼."]
} ,{                      
                           type: "step",
                           title: "바로 인터넷 액세스를 사용하거나 사용하지 않도록 설정합니다.",
       content: [ 
                "인터넷 액세스 열에서 해당 프로필의 장치가 인터넷에 액세스하는 것을 중지하려면 <span class=\"ptl-ctr-help-icon stop\"></span>을 클릭하고 <span class=\"ptl-ctr-help-icon enable\"></span>을 (를) 사용하여 다시 액세스 할 수있게하십시오."]
}]
},
       BASIC_QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (Quality of Service) 기능은 온라인 활동 및 장치의 우선 순위를 지정하여 필요할 때 더 빠른 네트워크 연결을 보장합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "응용 프로그램 우선 순위를 선택하여 온라인 활동의 네트워크 속도 우선 순위를 지정하고 장치 우선 순위를 선택하여 장치의 네트워크 속도 우선 순위를 지정합니다."
                       }]
},
       BASIC_APPLICATION_PRIORITY :{ 
               TITLE:"신청 우선 순위",
               CONTENT: [{
                           type: "paragraph",
                           content: "우선 순위를 지정할 온라인 활동을 선택하거나 사용자 정의를 클릭하여 각 온라인 활동의 우선 순위 레벨을 설정하십시오."
                       }]
},
       BASIC_DEVICE_PRIORITY :{ 
               TITLE:"기기 우선 순위",
               CONTENT: [{
                           type: "paragraph",
                           content: "우선 순위를 정할 장치와 우선 순위를 정하십시오."
                       } ,{                      
                           type: "step",
                           title: "장치의 우선 순위를 지정합니다",
       content: [ 
                "1. 목록에서 우선 순위를 지정하고 우선 순위를 토글 할 장치를 찾습니다.",
                "2. Timing 열에서 장치의 우선 순위를 선택하십시오."]
}]
},
       ANTI_VIRUS :{ 
               TITLE:"백신",
               CONTENT: [{
                           type: "paragraph",
                           content: "잦은 네트워크 검사, 악성 사이트 탐지 및 감염된 장치 격리로 인해 바이러스 백신 기능은 개인 정보를 안전하게 보호합니다. 네트워크가 어떻게 보호되는지, 네트워크에 대한 공격이 있었는지 확인할 수도 있습니다."
                       } ,{                      
                           type: "paragraph",
                           content: "기록 - 바이러스 백신으로 보호 된 장치와 공격의 원본 및 분류를 기록합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "모두 활성화 - 하나 이상의 옵션이 활성화되지 않은 경우 모든 보호 유형을 활성화하려면 누릅니다."
                       } ,{                      
                           type: "paragraph",
                           content: "보호 유형 - 설명을 참조하여 보호 유형을 활성화하십시오. 모든 보호 유형을 활성화하는 것이 좋습니다."
                       }]
},
       APPLICATION_PRIORITY :{ 
               TITLE:"신청 우선 순위",
               CONTENT: [{
                           type: "paragraph",
                           content: "응용 프로그램 우선 순위 기능은 필요할 때 빠른 네트워크 연결을 보장하기 위해 온라인 활동의 우선 순위를 지정합니다. 우선 순위를 지정할 온라인 활동을 선택하거나 사용자 정의를 클릭하여 각 온라인 활동의 우선 순위 레벨을 설정하십시오."
                       }]
},
       DEVICE_PRIORITY :{ 
               TITLE:"기기 우선 순위",
               CONTENT: [{
                           type: "paragraph",
                           content: "Device Priority (장치 우선 순위) 기능은 장치가 필요할 때 더 빠른 네트워크 연결을 보장하도록 장치의 우선 순위를 지정합니다. 우선 순위를 정할 장치와 우선 순위를 정하십시오."
                       } ,{                      
                           type: "step",
                           title: "장치의 우선 순위를 지정합니다",
       content: [ 
                "1. 목록에서 우선 순위를 지정하고 우선 순위를 토글 할 장치를 찾습니다.",
                "2. Timing 열에서 장치의 우선 순위를 선택하십시오."]
}]
},
       FIREWALL :{ 
               TITLE:"방화벽",
               CONTENT: [{
                           type: "paragraph",
                           content: "SPI (Stateful Packet Inspection) 방화벽은 사이버 공격을 방지하고 프로토콜을 기반으로 라우터를 통과하는 트래픽의 유효성을 검사합니다. 기본적으로이 기능은 사용하도록 설정되어 있습니다."
                       } ,{                      
                           type: "name",
                           title: "SPI 방화벽 활성화",
                           content: "필요한 경우가 아니면 SPI 방화벽을 비활성화하지 마십시오."
                       } ,{                      
                           type: "name",
                           title: "WAN 포트에서 핑 허용 / LAN 포트에서 핑 허용",
                           content: "WAN / LAN 포트에서 ping 패킷을 허용합니다. 기본 설정을 유지하는 것이 좋습니다."
                       }]
},
       "" :     ""
    };
})(jQuery);
