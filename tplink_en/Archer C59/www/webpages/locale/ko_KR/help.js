﻿(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"인터넷",
               CONTENT: [{
                           type: "paragraph",
                           content: "WAN(인터넷) 연결에 대한 관련 정보를 표시합니다."
                       } ,{                      
                           type: "title",
                            title: "IPv4"
                       } ,{                      
                           type: "name",
                           title: "MAC 주소",
                           content: "공유기 WAN 포트에 할당된 물리적 주소. 인터넷(외부 네트워크)에 보이는 주소입니다."
                       } ,{                      
                           type: "name",
                           title: "IP 주소",
                           content: "현재의 WAN(인터넷)에 할당된 IP 주소. 이 필드는 인터넷에 연결되어 있지 않거나 자동 할당 전이라면 0.0.0.0 또는 빈 값으로 보입니다."
                       } ,{                      
                           type: "name",
                           title: "서브넷 마스크",
                           content: "이 매개 변수는 네트워크 부분과 호스트 부분의 IP 주소를 결정합니다."
                       } ,{                      
                           type: "name",
                           title: "기본 게이트웨이",
                           content: "공유기에 현재 할당된 게이트웨이 주소가 표시됩니다."
                       } ,{                      
                           type: "name",
                           title: "기본 도메인",
                           content: "DNS는 호스트 이름과 인터넷 도메인을 IP 주소로 변경합니다. DNS 서버의 정보는 ISP에 의해 부여됩니다."
                       } ,{                      
                           type: "name",
                           title: "연결 유형",
                           content: "인터넷(WAN) 포트의 현재 연결 방식."
                       } ,{                      
                           type: "title",
                            title: "IPv6"
                       } ,{                      
                           type: "name",
                           title: "MAC 주소",
                           content: "공유기 WAN 포트에 할당된 물리적 주소. 인터넷(외부 네트워크)에 보이는 주소입니다."
                       } ,{                      
                           type: "name",
                           title: "IP 주소",
                           content: "현재의 WAN(인터넷)에 할당된 IPv6 주소."
                       } ,{                      
                           type: "name",
                           title: "기본 게이트웨이",
                           content: "공유기에 현재 할당된 게이트웨이 주소가 표시됩니다."
                       } ,{                      
                           type: "name",
                           title: "기본 도메인",
                           content: "DNS는 호스트 이름과 인터넷 도메인을 IP 주소로 변경합니다. DNS 서버의 정보는 ISP에 의해 부여됩니다."
                       } ,{                      
                           type: "name",
                           title: "연결 유형",
                           content: "인터넷(WAN) 포트의 현재 연결 방식."
                       } ,{                      
                           type: "title",
                            title: "3G/4G"
                       } ,{                      
                           type: "name",
                           title: "3G/4G 모뎀 상태",
                           content: "3G/4G 모뎀의 현재 상태를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "IP 주소",
                           content: "현재 3G/4G(인터넷) IP 주소를 표시합니다. 3G/4G 네트워크가 감지되지 않는 경우 이 필드는 빈칸이거나 0.0.0.0으로 표시됩니다."
                       } ,{                      
                           type: "name",
                           title: "서브넷 마스크",
                           content: "3G/4G IP 주소와 연결된 서브넷 마스크를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "기본 게이트웨이",
                           content: "기본 설정 게이트웨이(사용 중인 라우터)의 IP 주소를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "기본 도메인",
                           content: "사용 중인 ISP가 할당한 DNS 서버 IP 주소가 표시됩니다."
                       } ,{                      
                           type: "name",
                           title: "3G/4G 모뎀 신호",
                           content: "현재 3G/4G 무선 신호 강도를 표시합니다."
                       }]
},
       STATUS_INTERNET_NO_USB :{ 
               TITLE:"인터넷",
               CONTENT: [{
                           type: "paragraph",
                           content: "WAN(인터넷) 연결에 대한 관련 정보를 표시합니다."
                       } ,{                      
                           type: "title",
                            title: "IPv4"
                       } ,{                      
                           type: "name",
                           title: "MAC 주소",
                           content: "공유기 WAN 포트에 할당된 물리적 주소. 인터넷(외부 네트워크)에 보이는 주소입니다."
                       } ,{                      
                           type: "name",
                           title: "IP 주소",
                           content: "현재의 WAN(인터넷)에 할당된 IP 주소. 이 필드는 인터넷에 연결되어 있지 않거나 자동 할당 전이라면 0.0.0.0 또는 빈 값으로 보입니다."
                       } ,{                      
                           type: "name",
                           title: "서브넷 마스크",
                           content: "이 매개 변수는 네트워크 부분과 호스트 부분의 IP 주소를 결정합니다."
                       } ,{                      
                           type: "name",
                           title: "기본 게이트웨이",
                           content: "공유기에 현재 할당된 게이트웨이 주소가 표시됩니다."
                       } ,{                      
                           type: "name",
                           title: "기본 도메인",
                           content: "DNS는 호스트 이름과 인터넷 도메인을 IP 주소로 변경합니다. DNS 서버의 정보는 ISP에 의해 부여됩니다."
                       } ,{                      
                           type: "name",
                           title: "연결 유형",
                           content: "인터넷(WAN) 포트의 현재 연결 방식."
                       } ,{                      
                           type: "title",
                            title: "IPv6"
                       } ,{                      
                           type: "name",
                           title: "MAC 주소",
                           content: "공유기 WAN 포트에 할당된 물리적 주소. 인터넷(외부 네트워크)에 보이는 주소입니다."
                       } ,{                      
                           type: "name",
                           title: "IP 주소",
                           content: "현재의 WAN(인터넷)에 할당된 IPv6 주소."
                       } ,{                      
                           type: "name",
                           title: "기본 게이트웨이",
                           content: "공유기에 현재 할당된 게이트웨이 주소가 표시됩니다."
                       } ,{                      
                           type: "name",
                           title: "기본 도메인",
                           content: "DNS는 호스트 이름과 인터넷 도메인을 IP 주소로 변경합니다. DNS 서버의 정보는 ISP에 의해 부여됩니다."
                       } ,{                      
                           type: "name",
                           title: "연결 유형",
                           content: "인터넷(WAN) 포트의 현재 연결 방식."
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"무선",
               CONTENT: [{
                           type: "paragraph",
                           content: "무선관련 설정 정보 및 상태를 확인할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "네트워크 이름(SSID)",
                           content: "무선 네트워크 이름, 또한 SSID(서비스가 정한 식별자)로 알 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "무선 라디오",
                           content: "무선 네트워크의 현재 상태(켜짐 또는 꺼짐)"
                       } ,{                      
                           type: "name",
                           title: "모드",
                           content: "현재 무선 모드."
                       } ,{                      
                           type: "name",
                           title: "채널 폭",
                           content: "무선 네트워크의 채널 대역폭."
                       } ,{                      
                           type: "name",
                           title: "채널",
                           content: "현재 사용중인 무선채널로 주파수(GHz)와 일치합니다."
                       } ,{                      
                           type: "name",
                           title: "MAC 주소",
                           content: "공유기 무선 네트워크 라디오의 MAC 주소."
                       } ,{                      
                           type: "name",
                           title: "WDS 상태",
                           content: "WDS 모드의 현재 상태(활성화 또는 비활성화)."
                       }]
},
       STATUS_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "이더넷(LAN) 포트 관련 정보를 확인할 수 있습니다."
                       } ,{                      
                           type: "title",
                            title: "IPv4"
                       } ,{                      
                           type: "name",
                           title: "MAC 주소",
                           content: "공유기 LAN에 할당된 물리적 주소."
                       } ,{                      
                           type: "name",
                           title: "IP 주소",
                           content: "공유기 LAN에 할당된 IPv4 주소"
                       } ,{                      
                           type: "name",
                           title: "서브넷 마스크",
                           content: "이 매개 변수는 네트워크 부분과 호스트 부분의 IP 주소를 결정합니다."
                       } ,{                      
                           type: "name",
                           title: "DHCP",
                           content: "공유기에 내장된 DHCP 서버가 LAN 포트에 연결된 장치에 대해 활성 상태인지에 대한 여부를 표시합니다."
                       } ,{                      
                           type: "title",
                            title: "IPv6"
                       } ,{                      
                           type: "name",
                           title: "MAC 주소",
                           content: "공유기 LAN에 할당된 물리적 주소."
                       } ,{                      
                           type: "name",
                           title: "IP 주소",
                           content: "공유기 LAN에 할당된 IPv6 주소"
                       } ,{                      
                           type: "name",
                           title: "링크 로컬 주소",
                           content: "LAN 인터페이스의 IPv6 링크 주소"
                       } ,{                      
                           type: "name",
                           title: "할당 유형",
                           content: "LAN 인터페이스 IPv6 주소의 유형"
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"게스트 네트워크",
               CONTENT: [{
                           type: "paragraph",
                           content: "게스트 무선 네트워크에 대한 정보를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "네트워크 이름(SSID)",
                           content: "게스트 네트워크의 무선 네트워크 이름(SSID)입니다."
                       } ,{                      
                           type: "name",
                           title: "SSID 숨기기",
                           content: "게스트 네트워크의 무선 네트워크 이름(SSID)을 숨길지 아닐지 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "무선 라디오",
                           content: "게스트 네트워크의 현재 상태(켜짐 또는 꺼짐)"
                       } ,{                      
                           type: "name",
                           title: "게스트 서로 보일 수 있게",
                           content: "게스트 네트워크 모든 기기 간 서로 통신이 가능한지 아닌지 표시합니다."
                       }]
},
       STATUS_USB :{ 
               TITLE:"USB 설정",
               CONTENT: [{
                           type: "paragraph",
                           content: "현재 USB 저장 장치의 정보를 표시하고 /또는 공유기 USB 포트에 연결된 프린터의 정보를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "프린터",
                           content: "연결된 프린터의 이름"
                       } ,{                      
                           type: "name",
                           title: "USB 디스크",
                           content: "공유기에 연결된 USB 디스크 이름"
                       } ,{                      
                           type: "name",
                           title: "합계",
                           content: "연결된 USB 저장 장치의 저장용량 합계."
                       } ,{                      
                           type: "name",
                           title: "내장 공간",
                           content: "연결된 USB 저장 장치의 사용 가능한 저장용량."
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"성능",
               CONTENT: [{
                           type: "paragraph",
                           content: "현재 공유기의 성능을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "CPU 로드",
                           content: "현재 CPU 사용상태."
                       } ,{                      
                           type: "name",
                           title: "메모리 사용",
                           content: "현재 메모리 사용 상태."
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"유선 클라이언트",
               CONTENT: [{
                           type: "paragraph",
                           content: "현재 네트워크에 연결된 모든 유선 기기의 정보를 표시합니다."
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"무선 클라이언트",
               CONTENT: [{
                           type: "paragraph",
                           content: "현재 네트워크에 연결된 모든 무선 기기의 정보를 표시합니다."
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"IPv4",
               CONTENT: [{
                           type: "title",
                            title: "인터넷 회선 유형: 고정IP"
                       } ,{                      
                           type: "paragraph",
                           content: "인터넷 회선 제공업체로부터 고정IP 주소, 서브넷 마스크,게이트웨이,DNS 설정 값을 제공받았다면, 고정 IP를 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "IP 주소/서브넷 마스크/기본 게이트웨이/기본 DNS/보조 DNS",
                           content: "ISP가 제공하는 정보를 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "MTU 크기(바이트단위)",
                           content: "일반적인 MTU(Maximum Transmission Unit) 값은 1500바이트 입니다. 일부 인터넷 회선 업체의 경우 MTU 값의 변경이 요구될 수 있습니다. 이는 드문 경우이지만, 필요하다고 판단되는 경우에만 인터넷 회선 제공업체 확인 후 변경하시기 바랍니다."
                       } ,{                      
                           type: "title",
                            title: "인터넷 회선 유형: 동적IP"
                       } ,{                      
                           type: "paragraph",
                           content: "인터넷 회선 제공업체로부터 DHCP 서버 연결을 제공받는다면, 이 유형을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "IP 주소/서브넷 마스크/기본 게이트웨이/기본 DNS/보조 DNS",
                           content: "이 항목은 인터넷 회선 제공업체의 DHCP 서버로부터 자동으로 할당됩니다."
                       } ,{                      
                           type: "name",
                           title: "갱신",
                           content: "버튼을 클릭하면 인터넷 회선 제공업체로부터 새로운 IP 주소 정보를 받습니다."
                       } ,{                      
                           type: "name",
                           title: "해제",
                           content: "버튼을 클릭하면 현재 IP 주소 사용정보를 해제합니다."
                       } ,{                      
                           type: "name",
                           title: "만약 인터넷 회선 업체가 제공하는 DNS 주소 이외의 값으로 수동 설정이 필요한 경우, 다음 DNS 서버를 사용하십시오를 선택하고 기본 DNS와 보조 DNS에 새로운 값을 입력하십시오. 이 항목을 선택하지 않으면 DNS 서버는 자동으로 할당됩니다.",
                           content: "인터넷 회선 제공업체가 하나 또는 두 DNS 주소를 제공한다면, 이 확인란을 선택하고 기본 DNS 주소와 보조 DNS 주소를 해당 입력 필드에 입력합니다. 그렇지 않으면, DNS 주소가 인터넷 회선 제공업체에 의해 동적으로 할당됩니다.  "
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
                           title: "유니캐스트 DHCP로 IP 가져오기",
                           content: "일부 인터넷 회선 업체의 DHCP 서버는 브로드캐스트 방식을 사용하지 않습니다. 만약, IP 주소를 정상적으로 할당받지 못한다면 이 옵션을 선택할 수 있습니다.(단, 일반적으로 이 옵션은 많이 사용되지 않습니다.)"
                       } ,{                      
                           type: "title",
                            title: "인터넷 회선 유형: PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "인터넷 회선 제공업체로 부터 DSL(Digital Subscriber Line)를 받고있다면 PPPoE옵션을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "사용자 이름/비밀번호",
                           content: "인터넷 서비스 제공 희사 ISP에서 제공하는 사용자 이름과 비밀번호를 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "IP 주소/기본 DNS/보조 DNS",
                           content: "인터넷 회선 제공업체의DHCP 서버에서 자동으로 할당됩니다."
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
                           content: "버튼을 클릭하면 인터넷 회선 제공업체로부터 새로운 IP 주소 정보를 받습니다."
                       } ,{                      
                           type: "name",
                           title: "해제",
                           content: "버튼을 클릭하면 현재 IP 주소 사용정보를 해제합니다."
                       }]
} ,{                      
                           type: "name",
                           title: "고정 IP",
                           content: "IP 주소와 서브넷 마스크가 ISP에 의해 제공되는 경우에 선택하고, 이 정보를 해당 필드에 입력합니다."
                       }]
} ,{                      
                           type: "name",
                           title: "MTU 크기(바이트단위)",
                           content: "일반적인 이더넷 네트워크를 위한 MTU(Maximum Transmission Unit) 값이 1480바이트 입니다.",
       children: [{                      
                           type: "note",
                           title: "참고:",
                           content: "일부 인터넷 회선 제공업체의 경우 MTU 값의 변경이 요구될 수 있습니다. 이는 드문 경우이지만, 필요하다고 판단되는 경우에만 인터넷 회선 제공업체 확인 후 변경하시기 바랍니다."
                       }]
} ,{                      
                           type: "name",
                           title: "서비스 이름/Access Concentrator 이름",
                           content: "초기 설정으로 서비스의 이름과 Access Concentrator(AC)의 이름은 비어있습니다. 특별히 인터넷 회선 제공업체로부터 요구되지 않는다면 설정하지 마십시오."
                       } ,{                      
                           type: "name",
                           title: "온라인 간격 탐지",
                           content: "공유기가 액세스 컨센트레이터를 탐지하는 시간 간격을 0부터 120(초 단위) 사이의  값으로 입력합니다. 기본값은 10입니다."
                       } ,{                      
                           type: "name",
                           title: "IP 주소",
                           content: "인터넷 회선 제공업체에서 특정(고정) IP 주소를 제공한다면, 다음의 IP 주소를 사용해 IP 주소값을 입력하거나 인터넷 회선 제공업체의 IP 주소를 서버로부터 자동으로 할당받을 수 있는 동적 IP를 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "DNS 주소/기본 DNS/보조 DNS",
                           content: "인터넷 회선 제공업체에서 특정(고정) IP 주소를 제공한다면, 다음의 IP 주소를 사용해 기본 DNS, 보조 DNS에 각각 IP 주소값을 입력하거나 인터넷 회선 제공업체의 IP 주소를 서버로부터 자동으로 할당받을 수 있는 동적 IP를 선택하십시오."
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
                            title: "인터넷 회선 유형: BigPond Cable"
                       } ,{                      
                           type: "paragraph",
                           content: "인터넷 회선 제공업체로 부터 BigPond 케이블 서비스를 받고 있다면, BigPond 케이블 옵션을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "사용자 이름/비밀번호",
                           content: "인터넷 서비스 제공 희사 ISP에서 제공하는 사용자 이름과 비밀번호를 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "인증 서버",
                           content: "인증 서버 IP 주소 또는 호스트 이름을 입력하십시오."
                       } ,{                      
                           type: "name",
                           title: "인증 도메인",
                           content: "사용자 위치에 따라 도메인 접미사 서버 이름을 입력하십시오. 예: NSW/ACT nsw.bigpond.net.au VIC/TAS/WA/SA/NT vic.bigpond.net.au QLD qld.bigpond.net.au"
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
                            title: "인터넷 회선 유형: L2TP/PPTP"
                       } ,{                      
                           type: "paragraph",
                           content: "인터넷 회선 제공업체로 부터 L2TP 서비스를 받고 있다면, L2TP 옵션을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "사용자 이름/비밀번호",
                           content: "인터넷 서비스 제공 희사 ISP에서 제공하는 사용자 이름과 비밀번호를 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "IP 주소/기본 DNS/보조 DNS",
                           content: "이 항목은 인터넷 회선 제공업체의 DHCP 서버로부터 자동으로 할당됩니다."
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
                           content: "IP 주소, 서브넷 마스크, 게이트웨이 및 DNS 주소가 ISP에서 제공하는 경우에 선택하고, 해당 필드에 이 정보를 입력합니다."
                       }]
} ,{                      
                           type: "name",
                           title: "VPN 서버 IP/도메인 이름",
                           content: "ISP에서 제공하는 VPN 서버의 IP 주소 또는 도메인 이름을 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "MTU 크기(바이트단위)",
                           content: "대부분의 이더넷 네트워크의  기본 및 전형적인 MTU(최대송신단위) 크기는 L2TP의 경우 1460 바이트, PPTP의 경우 1420 바이트입니다. ISP가 요구하는 경우가 아니면, 기본 MTU 크기를 변경하지 말 것을 권장합니다."
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
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       INTERNET_MAC :{ 
               TITLE:"MAC 클론",
               CONTENT: [{
                           type: "name",
                           title: "초기 MAC 주소 사용",
                           content: "ISP가 MAC 주소에 할당된 IP 주소를 바인딩 하지 않는 경우 공유기의 기본 MAC 주소를 변경하지 마십시오."
                       } ,{                      
                           type: "name",
                           title: "컴퓨터 MAC 주소 사용",
                           content: "인터넷 서비스 제공업체가 사용자의 랜카드의 MAC 주소 등록을 요청했을 경우, 공유기에 연결된 컴퓨터의 현재 MAC 주소하기를 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "사용자 PC의 MAC 주소",
                           content: "인터넷 서비스 제공업체가 특정 MAC 주소에 IP 주소를 할당하는 경우, 수동으로 MAC 주소를 입력하십시오."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       LAN_IPV4 :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "name",
                           title: "MAC 주소",
                           content: "공유기 LAN에 할당된 물리적 주소."
                       } ,{                      
                           type: "name",
                           title: "IP 주소",
                           content: "공유기의 기본 IP 주소. 이는 공유기의 웹 관리 페이지에 로그인하는데 사용되고 변경이 가능합니다."
                       } ,{                      
                           type: "name",
                           title: "서브넷 마스크",
                           content: "내부 및 외부 트래픽을 라우트하기 위해 LAN 포트에 사용되는 할당된 식별자를 드롭다운 리스트에서 선택하거나, 새 서브넷 마스크를 점 십진수 표기법으로 입력합니다."
                       } ,{                      
                           type: "note",
                           title: "참고:",
                           content: "만약 사용자가 LAN IP 주소를 변경할 경우, 라우터에 로그인 하려면 새 IP 주소를 사용해야 합니다. 사용자가 설정한 새 LAN IP 주소가 이전과 같은 서브넷에 있지 않으면, DHCP 서버의 IP 주소는 자동으로 구성되지만, 포트 포워딩 및 DMZ 호스트 주소는 자동으로 재구성 되지 않습니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       IPTV :{ 
               TITLE:"설정",
               CONTENT: [{
                           type: "name",
                           title: "IGMP 스누핑",
                           content: "IGMP(Internet Group Management Protocol) 스누핑 기능을 활성화합니다."
                       } ,{                      
                           type: "name",
                           title: "IGMP 프록시",
                           content: "IGMP를 통해 TV를 시청 하시려면 이 기능을 사용 하시면 됩니다. 인터넷 회선 제공 업체에 따라 V2 또는 V3의 IGMP 프록시의 버전을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "IGMP 버전",
                           content: "ISP에 따라, V2 또는 V3의 IGMP 프록시 버전을 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "IPTV 기능 할성화를 위해 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "모드",
                           content: "사용자의 인터넷 회선 제공업체에 따라 적절한 모드를 선택하십시오. IPTV에는 6가지의 모드가 있습니다.",
       children: [{                      
                           type: "name",
                           title: "브리지",
                           content: "해당 메뉴에서 브리지 LAN 포트를 직접 구성할 수 있으며, KT IPTV를 이용하시는 고객님의 경우 브리지 기능을 통해 IPTV를 원활하게 시청하실 수 있습니다.",
       children: [{                      
                           type: "name",
                           title: "LAN1/2/3/4",
                           content: "인터넷 회선 제공업체 또는 IPTV 업체에 해당하는 기능 유무에 따라 LAN 포트를 할당합니다."
                       }]
} ,{                      
                           type: "name",
                           title: "러시아",
                           content: "러시아의 ISP를 이용중이거나 인터넷/IPTV Vlan IDs, 우선순위 그리고 LAN(1/2/3/4) 포트 기능 등 필요한 매개변수들이 미리 지정되어있는 경우 선택합니다.",
       children: [{                      
                           type: "name",
                           title: "IPTV 멀티캐스트 VLAN ID/Priority",
                           content: "인터넷 회선 제공업체에 따라 IPTV의 멀티캐스트 기능을 활성화해, VLAN ID와 Priority를 설정할 수 있습니다."
                       }]
} ,{                      
                           type: "name",
                           title: "싱가포르 ExStream",
                           content: "싱가포르의 ExStream 인터넷 회선 제공업체를 이용 중이거나, 인터넷/IPTV VLan IDs/Priority, LAN(1/2/3/4) 포트 기능을 포함하는 필수값이 정해져 있는 경우, 선택해 주십시오."
                       } ,{                      
                           type: "name",
                           title: "말레이시아 Unifi",
                           content: "말레이시아의 Unifi 인터넷 회선 제공업체를 이용 중이거나, 인터넷/IPTV VLAN IDs/Priority, LAN(1/2/3/4) 포트 기능을 포함하는 필수값이 정해져 있는 경우, 선택해 주십시오."
                       } ,{                      
                           type: "name",
                           title: "말레이시아 Maxis",
                           content: "말레이시아의 Maxis 인터넷 회선 제공업체를 이용 중이거나, 인터넷/VoIP/IPTV VLAN IDs/Priority, LAN(1/2/3/4) 포트 기능을 포함하는 필수값이 정해져 있는 경우, 선택해 주십시오."
                       } ,{                      
                           type: "name",
                           title: "커스텀",
                           content: "목록에 없는 인터넷 회선 제공업체를 이용 중이지만 인터넷/VoIP/IPTV VLAN IDs/Priority, LAN(1/2/3/4) 포트 기능을 포함하는 필수값이 정해져 있는 경우, 선택해 주십시오.",
       children: [{                      
                           type: "name",
                           title: "인터넷/IP-전화기/IPTV VLAN ID/Priority",
                           content: "인터넷 회선 제공업체가 제공한 VLAN IDs와 우선순위를 구성합니다."
                       } ,{                      
                           type: "name",
                           title: "802.11Q 태그",
                           content: "802.11Q 인터넷 패킷의 태그 여부를 위해 선택해 주십시오."
                       } ,{                      
                           type: "name",
                           title: "IPTV 멀티캐스트 VLAN ID/Priority",
                           content: "인터넷 회선 제공업체에 따라 IPTV의 멀티캐스트 기능을 활성화해, VLAN ID와 Priority를 설정할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "LAN1/2/3/4",
                           content: "LAN 포트를 인터넷 공급업체의 기능으로 할당하거나 IP폰 공급업체 또는 IPTV 공급업체의 기능으로 할당합니다."
                       }]
}]
} ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"설정",
               CONTENT: [{
                           type: "name",
                           title: "DHCP 서버",
                           content: "서버 기능의 사용 여부를 설정합니다. 사용함 또는 사용안함 중 선택하십시오. 만일 사용자가 서버를 사용안함으로 설정할 경우 사용자 네트워크 상에 또 다른 DHCP 서버가 있거나 그렇지 않으면 컴퓨터의 IP 주소를 수동으로 설정해야 합니다."
                       } ,{                      
                           type: "name",
                           title: "시작 IP 주소",
                           content: "클라이언트에게 임대할 수 있는 IP 주소의 범위를 입력하십시오."
                       } ,{                      
                           type: "name",
                           title: "주소 임대 시간",
                           content: "IP주소가 클라이언트에게 임대되는 지속 시간을 2부터 2880분 사이로 입력하십시오. 기본값은 120분입니다."
                       } ,{                      
                           type: "name",
                           title: "기본 게이트웨이",
                           content: "(선택 사항) LAN IP 주소를 입력하십시오."
                       } ,{                      
                           type: "name",
                           title: "기본 도메인",
                           content: "(선택 사항) 사용자 네트워크의 도메인 이름을 입력하십시오."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"주소 예약",
               CONTENT: [{
                           type: "paragraph",
                           content: "공유기에 연결할 클라이언트의 IP 주소를 수동으로 예약 지정할 수 있습니다. 예약된 경우, IP 주소는 DHCP 서버에의해 동일한 클라이언트에게만 할당됩니다."
                       } ,{                      
                           type: "name",
                           title: "MAC 주소",
                           content: "DHCP서버에 예약된 IP 주소 클라이언트의 MAC 주소"
                       } ,{                      
                           type: "name",
                           title: "예약된 IP 주소",
                           content: "이 장치가 DHCP 클라이언트에 예약한 IP 주소"
                       } ,{                      
                           type: "name",
                           title: "설명",
                           content: "클라이언트 기기의 종류"
                       } ,{                      
                           type: "name",
                           title: "상태",
                           content: "클라이언트 기기의 현재 상태(활성/비활성)"
                       } ,{                      
                           type: "name",
                           title: "수정",
                           content: "해당 클라이언트의 수정 또는 삭제를 위한 옵션"
                       } ,{                      
                           type: "step",
                           title: "IP 주소 예약하기",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2. 클라이언트의 MAC 주소를 입력하십시오.",
                "3. 클라이언트의 IP 주소 입력하십시오.",
                "4. 클라이언트에 대한 상세설명을 입력하십시오.",
                "5. 상태 사용함을 선택하십시오.",
                "6. OK 버튼을 클릭하십시오."]
} ,{                      
                           type: "step",
                           title: "현재 이용중인 클라이언트 수정 또는 삭제하기",
                           content: "이 표에서, 상태 수정을 원하는 클라이언트에 대해 편집 또는 삭제버튼을 클릭하십시오."
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"DHCP 클라이언트 목록",
               CONTENT: [{
                           type: "name",
                           title: "클라이언트 숫자",
                           content: "할당된 DHCP 클라이언트의 번호"
                       } ,{                      
                           type: "name",
                           title: "클라이언트 이름",
                           content: "DHCP 클라이언트의 이름"
                       } ,{                      
                           type: "name",
                           title: "MAC 주소",
                           content: "DHCP 클라이언트의 MAC 주소"
                       } ,{                      
                           type: "name",
                           title: "할당된 IP",
                           content: "이 장치가 DHCP 클라이언트에게 할당한 IP 주소"
                       } ,{                      
                           type: "name",
                           title: "임대 시간",
                           content: "클라이언트에게 임대된 IP 주소의 남아있는 시간"
                       } ,{                      
                           type: "name",
                           title: "새로고침",
                           content: "DHCP 클라이언트 목록의 새로운 정보를 조회하려면 새로고침 버튼을 클릭하십시오."
                       }]
},
       DDNS :{ 
               TITLE:"동적 DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "동적 DNS (도메인 이름 시스템)는 동적 인터넷 IP 주소에 고정된 호스트와 도메인 이름을 할당할 수 있습니다. 개인 웹 사이트, FTP 서버 또는 공유기 아래 다른 서버를 호스팅할 때 사용됩니다. www.dyndns.com 등 동적 DNS 서비스 공급자에 가입하신 후 등록 정보를 입력하십시오. "
                       } ,{                      
                           type: "step",
                           title: "동적 DNS 설정하기",
       content: [ 
                "1. 동적 DNS 서비스 공급자를 선택하십시오. ",
                "2. 사용자의 DDNS 계정의 사용자 이름과 비밀번호를 입력하십시오.",
                "3. 동적 DNS 서비스 공급자에 등록된 도메인 이름을 입력하십시오. ",
                "4. 동적 DNS 업데이트 요청이 전송되는 시간 간격을 선택하십시오. ",
                "5. 로그인과 저장을 클릭하십시오. "]
} ,{                      
                           type: "note",
                           title: "참고:",
                           content: "새 DDNS 계정을 사용하시려면 로그아웃하신 후 새 계정으로 로그인하십시오. "
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"동적 DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "동적 DNS (도메인 이름 시스템)는 동적 인터넷 IP 주소에 고정된 호스트와 도메인 이름을 할당할 수 있습니다. 개인 웹 사이트, FTP 서버 또는 공유기 아래 다른 서버를 호스팅할 때 사용됩니다. www.dyndns.com 등 동적 DNS 서비스 공급자에 가입하신 후 등록 정보를 입력하십시오. "
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"도메인 이름 목록",
               CONTENT: [{
                           type: "paragraph",
                           content: "이 리스트는 당신이 Tp-Link에 등록된 아이드에 연결된 DDNS 이름을 표시합니다"
                       } ,{                      
                           type: "step",
                           title: "신규 도메인 이름 등록",
       content: [ 
                "1. 등록을 클릭하십시오. ",
                "2. 도메인 이름을 입력하십시오. ",
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
                "2. 네트워크 목적지 - 이 항목에 고정 라우트를 할당하기 위해 IP 주소를 도트 십진수 표기법으로 입력합니다.",
                "3. 서브넷 마스크 - IP 주소의 네트워크 부분과 호스트 부분을 결정하기 위헤 서브넷 마스크를 도트 십진수 표기법으로 입력합니다.",
                "4. 기본 게이트웨이 - 공유기를 네트워크 또는 호스트에 연결하기 위해 게이트웨이 IP 주소를 도트 십진수 표기법으로 입력합니다.",
                "5. 인터페이스 - 목적 IP 주소타입에 따라 LAN 또는 WAN을 선택하십시오.",
                "6. 최종경로 - 이 항목에 대한 간략한 최종 경로 정보를 입력하십시오.",
                "7. 활성화 버튼을 선택하십시오.",
                "8. OK 버튼을 클릭하십시오."]
} ,{                      
                           type: "step",
                           title: "기존 항목을 수정하거나 삭제하기",
                           content: "테이블에서,  수정하거나 삭제하려는 항목에 해당하는 편집 아이콘 또는 쓰레기통 아이콘을 클릭하십시오."
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"시스템 라우팅 테이블",
               CONTENT: [{
                           type: "paragraph",
                           content: "시스템 라우팅 테이블은 사용 중인 모든 유효한 라우트 항목을 보여줍니다. 목적지 IP 주소, 서브넷 마스크, 게이트웨이 그리고 인터페이스가 각 항목마다 표시됩니다."
                       } ,{                      
                           type: "paragraph",
                           content: "표시된 데이터를 갱신하려면 새로 고침 버튼을 클릭하십시오."
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"무선 설정",
               CONTENT: [{
                           type: "paragraph",
                           content: "무선 환경설정을 필요에 맞게 설정하십시오."
                       }]
},
       WIRELESS_REGION :{ 
               TITLE:"설정",
               CONTENT: [{
                           type: "name",
                           title: "지역",
                           content: "아래 메뉴에서 사용자의 해당 국가를 선택하십시오. 만약 목록에 없다면 해당 국가에서는 무선 사용이 제안되었을 수 있습니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"무선 2.4GHz",
               CONTENT: [{
                           type: "name",
                           title: "무선 라디오 사용함",
                           content: "2.4GHz의 무선 채널 주파수 사용을 위해 체크해 주십시오."
                       } ,{                      
                           type: "name",
                           title: "네트워크 이름(SSID)",
                           content: "무선 신호 이름을 최대 32자의 문자열로 지정합니다. 같은 이름 (SSID) 네트워크의 모든 무선 장치에 할당해야합니다."
                       } ,{                      
                           type: "name",
                           title: "SSID 숨기기",
                           content: "Wi-Fi 네트워크 목록에 있는 2.4GHz 무선 네트워크 이름(SSID)을 숨기고 싶다면 체크해 주십시오."
                       } ,{                      
                           type: "name",
                           title: "보안",
                           content: "다음 중 하나의 보안 옵션을 선택해 주십시오.",
       children: [{                      
                           type: "name",
                           title: "비활성화 보안",
                           content: "무선 보안 기능을 사용하지 않게 설정합니다. 보안을 사용하지 않을 경우 주변 무선 장치는 암호화 없이 바로 공유기에 접속 가능합니다. 보안을 위해서 사용자는 다음 중 하나의 옵션을 선택할 것을 적극 권장합니다."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-개인",
                           content: "패스프레이즈라고도 불리는 PSK(사전 공유 키)에 기반한 표준 인증 방법을 사용하려면 이 옵션을 선택합니다. 이 옵션을 선택할 것을 권장합니다. 선택한 경우 다음을 구성합니다.",
       children: [{                      
                           type: "name",
                           title: "버전",
                           content: "사용자는 다음 중 하나의 버전을 선택할 수 있습니다,",
       children: [{                      
                           type: "name",
                           title: "자동",
                           content: "무선 장치의 기능과 요청에 따라 자동으로 WPA 또는 WPA2을 선택합니다"
                       } ,{                      
                           type: "name",
                           title: "WPA-PSK",
                           content: "TKIP 암호화를 지원합니다."
                       } ,{                      
                           type: "name",
                           title: "WPA2-PSK",
                           content: "WPA-PSK보다 강력한 보안 수준을 제공하는 AES 암호화를 지원하며, 특별한 사항이 없는 경우 해당 모드로 설택할 것을 권장합니다."
                       }]
} ,{                      
                           type: "name",
                           title: "암호화",
                           content: "자동, 또는 TKIP 또는 AES 중 하나를 선택할 수 있습니다. TKIP 형식은 802.11n을 지원하지 않기 때문에 사용자의 공유기가 802.11n으로 작동할 경우, 설정을 권장하지 않습니다. TKIP를 선택하면 WPS 기능이 비활성화 됩니다."
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
                           content: "사용자는 다음 중 하나의 버전을 선택할 수 있습니다,",
       children: [{                      
                           type: "name",
                           title: "자동",
                           content: "무선 장치의 기능과 요청에 따라 자동으로 WPA 또는 WPA2을 선택합니다"
                       } ,{                      
                           type: "name",
                           title: "WPA",
                           content: "TKIP 암호화를 지원합니다."
                       } ,{                      
                           type: "name",
                           title: "WPA2",
                           content: "WPA-PSK보다 강력한 보안 수준을 제공하는 AES 암호화를 지원하며, 특별한 사항이 없는 경우 해당 모드로 설택할 것을 권장합니다."
                       }]
} ,{                      
                           type: "name",
                           title: "암호화",
                           content: "자동, 또는 TKIP 또는 AES 중 하나를 선택할 수 있습니다. TKIP 형식은 802.11n을 지원하지 않기 때문에 사용자의 공유기가 802.11n으로 작동할 경우, 설정을 권장하지 않습니다. TKIP를 선택하면 WPS 기능이 비활성화 됩니다."
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
                           content: "클라이언트 기기가 WEP(유선 동등 프라이버시)를 사용하는 무선에만 액세스할 수 있는 경우, 기본 인증 방법을 활성화하기 위해 이 옵션을 선택합니다.",
       children: [{                      
                           type: "name",
                           title: "타입",
                           content: "다음 타입 중 하나를 선택할 수 있습니다."
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
                           title: "모드",
                           content: "만일 이 무선 공유기에 접속하는 모든 무선 장치가 동일 전송 모드(예. 802.11b)로 연결될 수 있다면, 전용 모드(예 11b 전용)을 선택할 수 있습니다. 만일 일부 장비가 다른 전송 모드를 사용한다면 적절한 \"혼합\" 모드를 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "채널 폭",
                           content: "2.4GHz 무선 네트워크에 대한 채널 대역폭을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "채널",
                           content: "2.4GHz 무선 네트워크에 대한 운영 채널을 선택합니다. 간헐적으로 무선 연결 문제가 발생하지 않을 경우, 채널 설정을 자동으로 두시는 것이 좋습니다."
                       } ,{                      
                           type: "name",
                           title: "전송 파워",
                           content: "무선 공유기의 전송 파워를 지정합니다. 고/중/저 중에서 원하는 것을 선택할 수 있습니다. 기본 설정값은 \"고\" 이며, 이 값을 권장합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"무선 5GHz",
               CONTENT: [{
                           type: "name",
                           title: "무선 라디오 사용함",
                           content: "5GHz의 무선 채널 주파수 사용을 위해 체크해 주십시오."
                       } ,{                      
                           type: "name",
                           title: "네트워크 이름(SSID)",
                           content: "무선 신호 이름을 최대 32자의 문자열로 지정합니다. 같은 이름 (SSID) 네트워크의 모든 무선 장치에 할당해야 합니다."
                       } ,{                      
                           type: "name",
                           title: "SSID 숨기기",
                           content: "Wi-Fi 네트워크 목록에 있는 5GHz 무선 네트워크 이름(SSID)을 숨기고 싶다면 체크해 주십시오."
                       } ,{                      
                           type: "name",
                           title: "보안",
                           content: "다음 중 하나의 보안 옵션을 선택해 주십시오.",
       children: [{                      
                           type: "name",
                           title: "비활성화 보안",
                           content: "무선 보안 기능을 사용하지 않게 설정합니다. 보안을 사용하지 않을 경우 주변 무선 장치는 암호화 없이 바로 공유기에 접속 가능합니다. 보안을 위해서 사용자는 다음 중 하나의 옵션을 선택할 것을 적극 권장합니다."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-개인",
                           content: "패스프레이즈라고도 불리는 PSK(사전 공유 키)에 기반한 표준 인증 방법을 사용하려면 이 옵션을 선택합니다. 이 옵션을 선택할 것을 권장합니다. 선택한 경우 다음을 구성합니다.",
       children: [{                      
                           type: "name",
                           title: "버전",
                           content: "사용자는 다음 중 하나의 버전을 선택할 수 있습니다,",
       children: [{                      
                           type: "name",
                           title: "자동",
                           content: "무선 장치의 기능과 요청에 따라 자동으로 WPA 또는 WPA2을 선택합니다"
                       } ,{                      
                           type: "name",
                           title: "WPA-PSK",
                           content: "TKIP 암호화를 지원합니다."
                       } ,{                      
                           type: "name",
                           title: "WPA2-PSK",
                           content: "WPA-PSK보다 강력한 보안 수준을 제공하는 AES 암호화를 지원하며, 특별한 사항이 없는 경우 해당 모드로 설택할 것을 권장합니다."
                       }]
} ,{                      
                           type: "name",
                           title: "암호화",
                           content: "자동, 또는 TKIP 또는 AES 중 하나를 선택할 수 있습니다. TKIP 형식은 802.11n을 지원하지 않기 때문에 사용자의 공유기가 802.11n으로 작동할 경우, 설정을 권장하지 않습니다. TKIP를 선택하면 WPS 기능이 비활성화 됩니다."
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
                           content: "사용자는 다음 중 하나의 버전을 선택할 수 있습니다,",
       children: [{                      
                           type: "name",
                           title: "자동",
                           content: "무선 장치의 기능과 요청에 따라 자동으로 WPA 또는 WPA2을 선택합니다"
                       } ,{                      
                           type: "name",
                           title: "WPA",
                           content: "TKIP 암호화를 지원합니다."
                       } ,{                      
                           type: "name",
                           title: "WPA2",
                           content: "WPA-PSK보다 강력한 보안 수준을 제공하는 AES 암호화를 지원하며, 특별한 사항이 없는 경우 해당 모드로 설택할 것을 권장합니다."
                       }]
} ,{                      
                           type: "name",
                           title: "암호화",
                           content: "자동, 또는 TKIP 또는 AES 중 하나를 선택할 수 있습니다. TKIP 형식은 802.11n을 지원하지 않기 때문에 사용자의 공유기가 802.11n으로 작동할 경우, 설정을 권장하지 않습니다. TKIP를 선택하면 WPS 기능이 비활성화 됩니다."
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
                           content: "클라이언트 기기가 WEP(유선 동등 프라이버시)를 사용하는 무선에만 액세스할 수 있는 경우, 기본 인증 방법을 활성화하기 위해 이 옵션을 선택합니다.",
       children: [{                      
                           type: "name",
                           title: "타입",
                           content: "다음 타입 중 하나를 선택할 수 있습니다."
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
                           title: "모드",
                           content: "만일 이 무선 공유기에 접속하는 모든 무선 장치가 동일 전송 모드(예. 802.11b)로 연결될 수 있다면, 전용 모드(예 11b 전용)을 선택할 수 있습니다. 만일 일부 장비가 다른 전송 모드를 사용한다면 적절한 \"혼합\" 모드를 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "채널 폭",
                           content: "5GHz 무선 네트워크에 대한 채널 대역폭을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "채널",
                           content: "5GHz의 무선 네트워크에 대한 운영 채널을 선택합니다. 간헐적으로 무선 연결 문제가 발생하지 않을 경우, 채널 설정을 자동으로 두시는 것이 좋습니다."
                       } ,{                      
                           type: "name",
                           title: "전송 파워",
                           content: "무선 공유기의 전송 파워를 지정합니다. 고/중/저 중에서 원하는 것을 선택할 수 있습니다. 기본 설정값은 \"고\" 이며, 이 값을 권장합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       WPS :{ 
               TITLE:"현재 공유기의 PIN",
               CONTENT: [{
                           type: "paragraph",
                           content: "다른 장치들은 WPS(Wi-Fi 보호 설치) 기능과 공유기의 PIN으로 이 공유기에 연결할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "현재 공유기의 PIN",
                           content: "사용자는 공유기의 PIN 값을 사용하여 새 장치를 네트워크에 추가할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "PIN",
                           content: "공유기의 PIN을 표시합니다.기본 PIN은 공유기의 라벨에서 찾을 수 있습니다. 생성을 클릭하여 무작위로 새 PIN을 생성하거나, 기본을 클릭하여 현재 PIN을 공장 출하시의 기본 PIN으로 복원합니다. "
                       }]
},
       WPS_WIZARD :{ 
               TITLE:"WPS 마법사",
               CONTENT: [{
                           type: "name",
                           title: "푸시 버튼(권장)",
                           content: "만약 새 장치가 WPS(Wi-Fi Protected Setup) 기능을 지원하고 설정 버튼을 가지고 있다면, 사용자는 장치 상에 있는 설정 버튼을 누른 후 2분 이내 공유기 상의 버튼을 눌러 쉽게 해당 장치를 무선 네트워크에 추가할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "PIN",
                           content: "이 버튼을 누르면 새 장치를 기존의 네트워크에 수동으로 추가할 수 있습니다."
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
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"설정",
               CONTENT: [{
                           type: "paragraph",
                           content: "게스트 네트워크는 별도의 무선 네트워크 이름 (SSID)과 손님이 무선 네트워크에 액세스하는 데 사용할 수있는 암호를 사용하여 별도의 네트워크를 설정할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "게스트 서로 보일 수 있게",
                           content: "게스트 네트워크에 무선 장치가 서로를 볼 수 있도록하려면 이 확인란을 선택합니다"
                       } ,{                      
                           type: "name",
                           title: "게스트가 로컬 네트워크에 액세스할 수 있도록 허용",
                           content: "게스트 네트워크에 무선 장치를 로컬 네트워크 공유 및 프린터에 액세스 할 수 있도록하려면이 확인란을 선택합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
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
                           content: "게스트 네트워크 비밀번호의 업데이트 간격을 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "보안",
                           content: "비밀번호를 업데이트하기 위해 보안 옵션을 선택한 적이 없다면, 다음의 보안 옵션 중 하나를 선택합니다.",
       children: [{                      
                           type: "name",
                           title: "비활성화 보안",
                           content: "무선 보안 기능을 사용하지 않게 설정합니다. 보안을 사용하지 않을 경우 주변 무선 장치는 암호화 없이 바로 공유기에 접속 가능합니다. 보안을 위해서 사용자는 다음 중 하나의 옵션을 선택할 것을 적극 권장합니다."
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-개인",
                           content: "WPA/WPA2 보안 방식을 사용합니다.",
       children: [{                      
                           type: "name",
                           title: "버전",
                           content: "사용자는 다음 중 하나의 버전을 선택할 수 있습니다.",
       children: [{                      
                           type: "name",
                           title: "자동",
                           content: "무선 장치의 기능과 요청에 따라 자동으로 WPA 또는 WPA2을 선택합니다"
                       } ,{                      
                           type: "name",
                           title: "WPA-PSK",
                           content: "TKIP 암호화를 지원합니다."
                       } ,{                      
                           type: "name",
                           title: "WPA2-PSK",
                           content: "WPA-PSK보다 강력한 보안 수준을 제공하는 AES 암호화를 지원하며, 특별한 사항이 없는 경우 해당 모드로 설택할 것을 권장합니다."
                       }]
} ,{                      
                           type: "name",
                           title: "암호화",
                           content: "자동, 또는 TKIP 또는 AES 중 하나를 선택할 수 있습니다. TKIP 형식은 802.11n을 지원하지 않기 때문에 사용자의 공유기가 802.11n으로 작동할 경우, 설정을 권장하지 않습니다. TKIP를 선택하면 WPS 기능이 비활성화 됩니다."
                       }]
}]
} ,{                      
                           type: "name",
                           title: "비밀번호",
                           content: "무작위로 생성된 비밀번호를 사용하거나, 8-63자리 ASCII 문자 또는 16진수(0-9, a-f, A-F) 8-64자리의 비밀번호를 생성합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       NAT :{ 
               TITLE:"어플리케이션 레이어 게이트웨이(ALG)",
               CONTENT: [{
                           type: "paragraph",
                           content: "ALG는 사용자 개개인의 요구에 맞춰진 NAT 순회필터를 지원하는 주소의 게이트웨이와 특정 어플리케이션 레이어의 \"control/data\" 프로토콜인 FTP, TFTP, H323 등을 위한 포트전송을 연결시킵니다."
                       } ,{                      
                           type: "name",
                           title: "FTP  ALG 사용 가능",
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
                           content: "선택 시,  미디어 플레이어가 NAT를 통해 스트리밍 하고있는 미디어 서버와 연결됩니다."
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
                           title: "IPSec  통과 사용",
                           content: "선택 시, 인터넷 프로토콜 보안이 공유기나 IP 네트워크를 통해 터널링됩니다. IPSec는 사생활 보호 및 보안이 강화된 IP 네트워크 통신을 강화한 Crytographic 보안 서비스를 사용합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"가상 서버",
               CONTENT: [{
                           type: "paragraph",
                           content: "가상 서버는 사용자의 로컬 네트워크를 공공 서비스로 설정하기 위해 사용됩니다. 하나의 외부 서버의 형태로, 인터넷에서부터 외부 포트에 이르는 모든 요청은 정적 또는 약속된 IP 주소로 설정된 특정 지정 PC로 재전송 됩니다."
                       } ,{                      
                           type: "name",
                           title: "서비스 타입",
                           content: "사용자의 가상 서버의 이름"
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
                "2. 외부 포트와 내부 포트에 접근하는 포트의 수를 자동으로 추가하는 항목으로부터 서비스를 선택하기 위해서는 현재 서비스 보기를 클릭하십시오. 만약 서비스가 항목에 없다면 외부 포트 수(예:21) 또는 포트의 범위(예:21-25)를 입력하십시오. 만약 외부 포트가 같지 않다면 내부 포트의 정보는 빈 칸으로 남겨두거나 또는 외부 포트가 단일 포트일 경우 특정 포트를(예:21) 입력하십시오.  소수 표기 형태인 서비스 응용 프로그램을 실행하고 있는 PC의  IP 주소를 내부 IP 영역에 기입해 주십시오.",
                "3. 서비스 응용 프로그램을 위한 프로토콜을 선택하십시오.",
                "4. 상태 사용함을 선택하십시오.",
                "5. OK 버튼을 클릭하십시오."]
} ,{                      
                           type: "step",
                           title: "가상 서버 규칙 수정 또는 삭제 하기",
                           content: "테이블에서, 수정하거나 삭제하려는 규칙에 해당하는  편집 아이콘 또는 쓰레기통 아이콘을 클릭하십시오."
                       } ,{                      
                           type: "step",
                           title: "다수의 규칙 삭제 하기",
                           content: "삭제를 원하는 모든 규칙을 선택해 삭제버튼을 클릭하십시오."
                       } ,{                      
                           type: "note",
                           title: "참고:",
                           content: "사용자의 로컬 호스트 장치가 1개 이상의 서비스를 호스팅하고 있다면, 각각의 서비스에 대한 규칙을 생성해야 합니다."
                       }]
},
       PORT_TRIGGERING :{ 
               TITLE:"포트 트리거",
               CONTENT: [{
                           type: "paragraph",
                           content: "인터넷 게임, 비디오 컨퍼런스, 인터넷 전화 등 일부 응용 프로그램은 다중 접속을 필요로 할 수 있습니다. 포트 트리거는 순수 NAT 기능이 동작하는 공유기 상에서 정상적으로 실행되지 않는 프로그램을 정상적으로 실행될 수 있도록 지원합니다."
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
                "4. OK 버튼을 클릭하십시오."]
} ,{                      
                           type: "step",
                           title: "기존 항목 변경/삭제하기",
                           content: "테이블에서, 수정하거나 삭제하려는 규칙에 해당하는  편집 아이콘 또는 쓰레기통 아이콘을 클릭하십시오."
                       } ,{                      
                           type: "step",
                           title: "멀티 포트 트리거 규칙 삭제하기",
                           content: "테이블에서 삭제를 원하는 규칙을 찾아 선택한 후, 테이블 상의 삭제 버튼을 클릭하십시오."
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "DMZ 호스트 기능은 DMZ 호스트로 지정된 장비로 모든 네트워크 데이터를 전달함으로써, 공유기 내부에 있는 장비(PC 등)가 게임, 화상회의, 서버 운영 등, 특별한 기능이 원활하게 동작할 수 있게 지원해 줍니다. DMZ 호스트 IP주소는 공유기의 DHCP 기능에 의해서 IP가 변경 될 수 있으므로, IP주소가 변경되지 않게 공유기에서 사용하지 않는 IP주소로 고정 IP 방식으로 지정하여 주십시오."
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
                           content: "UPnP(Universal Plug and Play) 기능은 인터넷 컴퓨터와 같이 장치가 필요할 때 로컬 호스트의 자원이나 장치를 접속할 수 있게 해 줍니다. 공유기에서 UPnP 기능을 사용할 경우 공유기 내부에 UPnP 기능을 지원하는 프로그램은 UPnP 서비스를 이용해서 동적으로 포트 포워딩 기능을 설정 해제할 수 있습니다."
                       } ,{                      
                           type: "paragraph",
                           content: "이 항목은 현재의 UPnP 장치 정보를 보여줍니다."
                       } ,{                      
                           type: "name",
                           title: "서비스 정보",
                           content: "UPnP 기능을 요청한 응용프로그램 정보."
                       } ,{                      
                           type: "name",
                           title: "외부 포트",
                           content: "공유기가 응용프로그램을 위해 개방한 외부 포트."
                       } ,{                      
                           type: "name",
                           title: "프로토콜",
                           content: "개방된 프로토콜"
                       } ,{                      
                           type: "name",
                           title: "내부 IP 주소",
                           content: "UPnP 요청한 로컬호스트의 IP 주소."
                       } ,{                      
                           type: "name",
                           title: "내부 포트",
                           content: "공유기가 로컬 호스트를 위해 개방한 내부 포트."
                       } ,{                      
                           type: "paragraph",
                           content: "새로고침 버튼을 클릭하면 현재의 UPnP 설정 목록이 업데이트됩니다."
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
                           title: "지역",
                           content: "USB 모뎀과 SIM 카드가 성공적으로 식별되면 사용자의 지역을 자동으로 선택해 표시합니다. 자동으로 표시되지 않는 경우 드롭다운 메뉴에서 지역을 선택하시면 됩니다."
                       } ,{                      
                           type: "name",
                           title: "모바일 ISP",
                           content: "3G/4G 네트워크의 ISP(Internet Service Provider)를 표시합니다. 자동으로 감지되지 않는 경우 드롭다운 메뉴에서 ISP를 선택하시면 됩니다. 선택에 따라 기본 설정 다이얼 번호와 APN 은 자동으로 입력됩니다."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "SIM/UIM 보호 기능을 사용하는 경우 PIN 코드를 입력하세요. SIM/UIM 보호 기능은 기본 설정 상 비활성 상태입니다. 유효하지 않은 PIN을 3회 입력하는 경우 SIM/UIM 카드가 자동으로 잠금됩니다. PC/노트북 컴퓨터에서 PUK 코드를 입력해야 잠금 상태를 해제할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "메시지",
                           content: "PIN 보호 기능을 사용하는 경우 SIM/UIM 카드의 PIN 정보가 표시됩니다."
                       } ,{                      
                           type: "name",
                           title: "설정다이얼 번호,APN,사용자 이름/암호",
                           content: "이용하고 있는 ISP가 <strong>모바일 ISP</strong> 목록에 없는 경우, 이 체크박스를 선택한 다음 ISP에서 받은 다이얼 번호, APN(Access Point Name), 사용자 이름과 암호를 입력하세요."
                       } ,{                      
                           type: "name",
                           title: "다이얼 번호",
                           content: "ISP에서 받은 다이얼 번호를 입력하세요."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "ISP에서 받은 APN(Access Point Name)을 입력하세요."
                       } ,{                      
                           type: "name",
                           title: "사용자 이름/비밀번호",
                           content: "ISP에서 받은 사용자 이름과 암호를 입력하세요. 대소문자를 구별하는 필드입니다."
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
                           content: "\"저장\"을 클릭해 설정을 모두 저장합니다."
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"3G/4G 도움말",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB 모뎀",
                           content: "3G/4G USB 모뎀의 상태를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "지역",
                           content: "USB 모뎀과 SIM 카드가 성공적으로 식별되면 사용자의 지역을 자동으로 선택해 표시합니다. 자동으로 표시되지 않는 경우 드롭다운 메뉴에서 지역을 선택하시면 됩니다."
                       } ,{                      
                           type: "name",
                           title: "모바일 ISP",
                           content: "3G/4G 네트워크의 ISP(Internet Service Provider)를 표시합니다. 자동으로 감지되지 않는 경우 드롭다운 메뉴에서 ISP를 선택하시면 됩니다. 선택에 따라 기본 설정 다이얼 번호와 APN 은 자동으로 입력됩니다."
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "SIM/UIM 보호 기능을 사용하는 경우 PIN 코드를 입력하세요. SIM/UIM 보호 기능은 기본 설정 상 비활성 상태입니다. 유효하지 않은 PIN을 3회 입력하는 경우 SIM/UIM 카드가 자동으로 잠금됩니다. PC/노트북 컴퓨터에서 PUK 코드를 입력해야 잠금 상태를 해제할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "메시지",
                           content: "PIN 보호 기능을 사용하는 경우 SIM/UIM 카드의 PIN 정보가 표시됩니다."
                       } ,{                      
                           type: "name",
                           title: "설정다이얼 번호,APN,사용자 이름/암호",
                           content: "이용하고 있는 ISP가 <strong>모바일 ISP</strong> 목록에 없는 경우, 이 체크박스를 선택한 다음 ISP에서 받은 다이얼 번호, APN(Access Point Name), 사용자 이름과 암호를 입력하세요."
                       } ,{                      
                           type: "name",
                           title: "다이얼 번호",
                           content: "ISP에서 받은 다이얼 번호를 입력하세요."
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "ISP에서 받은 APN(Access Point Name)을 입력하세요."
                       } ,{                      
                           type: "name",
                           title: "사용자 이름/비밀번호",
                           content: "ISP에서 받은 사용자 이름과 암호를 입력하세요. 대소문자를 구별하는 필드입니다."
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
                           content: "인증 유형을 선택합니다. 기본 설정은 \"자동\"입니다. ISP들 중에는 특정 인증 유형을 요구하는 경우가 있으니 이용하고 계신 ISP에 확인하거나 기본 설정을 그대로 유지하도록 하세요."
                       } ,{                      
                           type: "name",
                           title: "자동",
                           content: "자동(기본 설정)이 선택된 경우, 라우터는 ISP가 사용하는 인증 유형을 자동으로 선택합니다."
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
                           content: "기본 설정 MTU(Maximum Transmission Unit) 크기는 1480 바이트입니다. ISP가 요구하는 경우가 아니면 이 설정은 변경하지 마세요."
                       } ,{                      
                           type: "name",
                           title: "DNS 서버 ",
                           content: "ISP가 DNS 서버 IP 주소를 제공하는 경우 이 체크박스를 선택하고 아래에 <strong>1차 DNS</strong>와 2차 DNS(선택 사항) IP 주소를 입력하세요. 그렇지 않은 경우 DNS는 ISP가 동적으로 할당합니다."
                       } ,{                      
                           type: "name",
                           title: "기본 DNS",
                           content: "ISP가 제공하는 DNS IP 주소를 점으로 구분된 숫자 형태로 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "보조 DNS",
                           content: "(선택 사항) ISP가 제동하는 다른 DNS IP 주소를 점으로 구분된 숫자 형태로 입력합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "<strong>저장</strong> 버튼을 클릭해 설정을 저장합니다."
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
                           content: "제거 버튼은 장치가 공유기에 연결되어 있을 경우에 활성화됩니다. 현재 볼륨이 작동 중인 동안에는 USB 장치 제거가 불가능합니다."
                       } ,{                      
                           type: "name",
                           title: "활성화",
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
                           content: "비밀번호는 길이 15자 초과하지 않으며 영문, 기호, 숫자로 구성되어야 합니다. 사용자 이름은 영문으로 시작되어야 합니다. 이 필드는 대소문자를 가립니다."
                       } ,{                      
                           type: "name",
                           title: "비밀번호 확인",
                           content: "비밀번호를 다시 입력합니다. 이 필드는 대소문자를 가립니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
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
                           content: "활성화되어 있다면, 네트워크 상의 사용자가 할당된 IP 주소(예. \\\\192.168.0.1)를 이용하여 USB 저장 장치에 액세스할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "로컬 네트워크 FTP 클라이언트가 IP 주소 할당을 사용하여 USB 저장 장치의 접근이 가능합니다. 해당 FTP 서버 포트넘버는 (예. ftp://192.168.0.1:21) 입니다."
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
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
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
                           content: "프린트 서버 기능을 사용할 수 있도록 토글합니다."
                       } ,{                      
                           type: "name",
                           title: "프린터 이름",
                           content: "공유기에 연결된 프린터 이름을 표시합니다."
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
                           content: "파일 업로드나 다운로드 시 디렉토리 경로를 변경하거나 USB 저장 매체를 분리하지 마십시오. 그렇지 않은 경우 치명적 오류가 발생할 수 있습니다.  "
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
                           content: "1-10사이의 값을 입력하여 최대 진행중 다운로드 수를 설정합니다. "
                       } ,{                      
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
                           content: "1-100000 KB/s의 값을 입력하여 최대 업로드 속도를 설정합니다. 기본값은 128입니다."
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
                           content: "이 기능을 활성화하여 피어 그룹간의 통신 효율을 향상시켜 다운로드 속도를 증가시킬 수 있습니다. "
                       } ,{                      
                           type: "name",
                           title: "비트토렌트 프로토콜 암호화 활성화",
                           content: "이 기능을 활성화하면 데이터 전송 처리 시 개인정보 보호와 기밀성이 강화됩니다."
                       } ,{                      
                           type: "name",
                           title: "aMule Server",
                           content: "aMule 서버의 IP 주소와 포트를 입력하십시오. 공유기가 서버에 연결된 경우에만 aMule 다운로드가 가능합니다. "
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"다운로드",
               CONTENT: [{
                           type: "name",
                           title: "항목",
       children: [{                      
                           type: "name",
                           title: "파일",
                           content: "다운로드 파일의 이름과 형식을 표시합니다. "
                       } ,{                      
                           type: "name",
                           title: "속도",
                           content: "현재 다운로드(또는 업로드) 속도를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "완료",
                           content: "다운로드 진행상황을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "남은 시간",
                           content: "남은 다운로드 시간을 표시합니다. "
                       } ,{                      
                           type: "name",
                           title: "연결된 피어",
                           content: "다운로드의 연결된 피어 개수를 표시합니다. "
                       } ,{                      
                           type: "name",
                           title: "상태",
                           content: "현재 다운로드 상태(다운로드, 대기, 시딩, 중단, 완료, 오류 등)을 표시합니다. "
                       }]
} ,{                      
                           type: "name",
                           title: "신규 다운로드 추가",
       children: [{                      
                           type: "step",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2. 다운로드 소스를 선택하세요. PC의 토렌트,  USB의 토렌트 또는 URL일 수 있습니다. ",
                "3. BT를 위한 토렌트 위치를 선택하거나 FTP, HTTP와 aMule를 위한 URL를 입력하세요. ",
                "4. OK 버튼을 클릭하십시오.",
                "5. aMule의 경우, 고급>aMule 서버에서 IP 주소와 포트를 지정하세요. "]
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
       PARENTAL_CONTROL :{ 
               TITLE:"자녀PC 관리 기능",
               CONTENT: [{
                           type: "paragraph",
                           content: "이 기능으로 유해사이트 접속을 차단할 수 있고 특정시간 접속제한(예. 페이스북, 유튜브등)과 중앙통제를 통하여 홈네트워크상의 모든기기를 몰웨어와 피싱으로 부터 동시간에 보호할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "자녀PC 관리 기능",
                           content: "자녀PC 관리 기능을 사용할 수 있도록 토글합니다."
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"자녀PC 관리 기기",
               CONTENT: [{
                           type: "name",
                           title: "장치 이름",
                           content: "현재 관리되고 있는 모든 기기의 이름을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "MAC 주소",
                           content: "현재 관리되고 있는 모든 기기의 MAC주소를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "인터넷 접속 시간",
                           content: "접속 제한 시간의 기간을 표시합니다. \"시스템 도구 -> 시간 설정\"에서 설정 할 수 있는 시간 일정은 공유기의 시스템 시간을 기준으로 적용됩니다."
                       } ,{                      
                           type: "name",
                           title: "설명",
                           content: "연결된 기기의 간단한 설명을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "상태",
                           content: "관리 기능에 해당하는 기기의 현재 상태(활성화 또는 비활성화)를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "수정",
                           content: "해당 장치를 수정 또는 삭제하는 것을 표시합니다."
                       } ,{                      
                           type: "step",
                           title: "새로운 클라이언트 장치를 제한합니다.",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2.기존 장치 보기를 클릭하고 액세스 장치 목록에서 현재 연결된 장치를 선택하거나, 장치 이름을 입력하고 MAC 주소가 연결되지 않은 장치를 수동으로 추가합니다.",
                "3. 제한이 적용되는 기간을 지정하려면 인터넷 액세스 시간 아이콘을 클릭합니다.",
                "4. 설명 필드에 간단한 설명을 입력합니다. (선택 사항)",
                "5. 상태 사용함을 선택하십시오.",
                "6. OK 버튼을 클릭하십시오."]
} ,{                      
                           type: "paragraph",
                           content: "자녀PC 관리 항목을 수정하거나 삭제하려면, 편집 아이콘을 클릭하여 정보를 편집하거나 쓰레기통 아이콘을 클릭하여 해당 항목을 삭제합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "여러 항목을 삭제하려면 모든 항목을 선택하고 표 상단의 삭제를 클릭합니다."
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"컨텐츠 제한",
               CONTENT: [{
                           type: "name",
                           title: "블랙리스트",
                           content: "웹사이트 접근을 제한하기 위한 특정 키워드를 설정합니다.",
       children: [{                      
                           type: "paragraph",
                           content: "새로운 키워드 추가를 클릭하여 블랙리스트에 추가합니다. 삭제하고자 하는 키워드는 (-) 아이콘을 클릭하여 삭제합니다."
                       }]
} ,{                      
                           type: "name",
                           title: "화이트리스트",
                           content: "접속을 허용하고자 하는 웹사이트 주소를 추가합니다.",
       children: [{                      
                           type: "paragraph",
                           content: "도메인 이름 추가를 클릭하여 웹사이트를 화이트리스트에 추가합니다. 삭제하고자 하는 웹사이트는 (-) 아이콘을 클릭하여 삭제합니다."
                       }]
} ,{                      
                           type: "paragraph",
                           content: "키워드는 도메인 이름으로도 지정할 수 있습니다. Www.mail.googl.com 또는 www.facebook.com"
                       }]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "서보 품질(QoS)은 사용자의 요구에 기반하여 인터넷 트래픽의 우선순위를 정하는데 도움을 줍니다. QoS 규칙 목록에서 장치 또는 애플리케이션의 우선순위를 지정할 수 있습니다. "
                       } ,{                      
                           type: "name",
                           title: "QoS 사용",
                           content: "QoS 기능을 사용하려면 상자를 클릭하십시오."
                       } ,{                      
                           type: "name",
                           title: "업로드 대역포",
                           content: "ISP (인터넷 서비스 공급자)에서 제공하는 최대 업로드 대역폭을 입력."
                       } ,{                      
                           type: "name",
                           title: "다운로드 대역포",
                           content: "ISP에서 제공하는 최대 다운로드 대역폭을 입력."
                       } ,{                      
                           type: "name",
                           title: "높은 우선 순위",
                           content: "우선 순위가 높은 트래픽에 대한 비율 (%)을 지정합니다."
                       } ,{                      
                           type: "name",
                           title: "중간 우선 순위",
                           content: "중간 우선 순위 트래픽에 대한 비율 (%)을 지정합니다."
                       } ,{                      
                           type: "name",
                           title: "낮은 우선 순위",
                           content: "우선 순위가 낮은 트래픽에 대한 비율 (%)을 지정합니다."
                       } ,{                      
                           type: "note",
                           title: "참고:",
                           content: "모든 우선순위의 최대량(퍼센트)은 1입니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       QOS_RULE :{ 
               TITLE:"QoS 규칙 목록",
               CONTENT: [{
                           type: "name",
                           title: "타입",
                           content: "대역폭 관리 규칙 목록을 추가하는 유형을 선택합니다."
                       } ,{                      
                           type: "step",
                           title: "장치에 의해 높은/중간/낮은 우선 순위에 대한 규칙을 설정하려면",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2. 기기를 선택 하십시오.",
                "3. 접속 제어  목록에서 원하는 장치를 선택보기 기존 장치를 클릭하거나, 장치 이름 및 MAC 주소 필드에 수동으로 장치 이름과 MAC 주소를 입력할 수 있습니다.",
                "4. OK 버튼을 클릭하십시오."]
} ,{                      
                           type: "step",
                           title: "애플리케이션 별 높은/중간/낮은 우선 순위에 대한 규칙을 설정하려면",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2. 응용 프로그램을 선택합니다.",
                "3. 응용 프로그램 목록에서 원하는 응용 프로그램을 선택하거나 해당 필드에 이름, 프로토콜 및 대상 포트 (1-65535)를 구성하여 응용 프로그램을 사용자 정의 할 수 있습니다, 당신은 단일 포트 또는 여러 개의 포트 또는 포트 범위, 사용을 입력 할 수 있습니다 쉼표 (예 21,36-105,111)를 분리합니다.",
                "4. OK 버튼을 클릭하십시오."]
} ,{                      
                           type: "step",
                           title: "물리적 포트별 우선순위 높음/보통/낮음 규칙 설정하기",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2. Select By Physical Port.",
                "3. Select your desired port.",
                "4. OK 버튼을 클릭하십시오."]
}]
},
       QOS_DATABASE :{ 
               TITLE:"데이터베이스 업그레이드",
               CONTENT: [{
                           type: "name",
                           title: "새 데이터베이스 파일",
                           content: "선택하여 새 데이터베이스 파일을 찾아 새 버전으로 데이터베이스를 업그레이드 할 경우 클릭 찾아보기를 클릭합니다."
                       } ,{                      
                           type: "name",
                           title: "데이터베이스 버전",
                           content: "현재 데이터베이스 버전을 표시합니다."
                       }]
},
       SECURITY_FIREWALL :{ 
               TITLE:"방화벽",
               CONTENT: [{
                           type: "name",
                           title: "방화벽",
                           content: "SPI(상태기반 패킷 검사) 방화벽은 사이버 공격을 예방하고, 프로토콜에 기반하여 공유기를 통과하는 트래픽을 인증합니다."
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"DoS 공격 차단",
               CONTENT: [{
                           type: "name",
                           title: "DoS 공격 차단",
                           content: "DoS(서비스 거부) 보호는  DoS 공격이 서버 요청과 함께 사용자 네트워크로 유입되지 않도록  LAN을 보호합니다."
                       } ,{                      
                           type: "name",
                           title: "ICMP-FLOOD 공격 필터링 사용함",
                           content: "ICMP-FLOOD 공격 필터링 기능을 실행하거나 중단합니다.",
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
                           title: "UDP-FLOOD 공격 필터링 사용함",
                           content: "UDP-FLOOD 공격 필터링 기능을 실행하거나 중단합니다."
                       } ,{                      
                           type: "name",
                           title: "TCP-SYN-FLOOD 공격 필터링 사용함",
                           content: "TCP-SYN-FLOOD 공격 필터링 기능을 실행하거나 중단합니다."
                       } ,{                      
                           type: "name",
                           title: "WAN포트로 전달되는 Ping패깃을 무시함",
                           content: "WAN포트로 수신 된 Ping 패킷 무시할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "LAN 포트로 전달되는 Ping 패깃을 금지함",
                           content: "LAN포트로 수신 된 Ping 패킷 무시할 수 있습니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"차단된  DoS 호스트 목록 도움말",
               CONTENT: [{
                           type: "name",
                           title: "차단된  DoS 호스트 목록 도움말",
                           content: "이 페이지는 라우터에 의해 차단된 각 호스트 IP주소 및 호스트 MAC주소를 보여줍니다."
                       } ,{                      
                           type: "step",
                           title: "전부 지우기",
                           content: "전부 지우기 버튼을 클릭하면 모든 표시된 항목을 지웁니다."
                       }]
},
       YANDEX_DNS :{ 
               TITLE:"Yandex.DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "이 페이지에서 Yandex.DNS 필터를 이용하여 디바이스가 악성 웹 사이트의 공격을 차단하고 어린이 디바이스는 성인 웹 사이트 접속을 차단합니다.모든 장치 또는 각 장치에 대한 별도의 필터 혹은 일반 필터를 구성 할 수 있습니다."
                       } ,{                      
                           type: "paragraph",
                           content: "dns.yandex.ru를 방문하셔서 Yandex.DNS 서비스의 보다 더 많은 정보를 알아보세요"
                       } ,{                      
                           type: "name",
                           title: "모든 디바이스에 yandex DNS를 적용합니다",
                           content: "이 페이지는 라우터에 의해 차단된 각 호스트 IP주소 및 호스트 MAC주소를 보여줍니다."
                       } ,{                      
                           type: "name",
                           title: "사용 안 함",
                           content: "Yandex.DNS 필터가 모든 장치에서 작동하지 않습니다 "
                       } ,{                      
                           type: "name",
                           title: "기본",
                           content: "BasicYandex.DNS 필터가 모든 장치에서 작동합니다"
                       } ,{                      
                           type: "name",
                           title: "세이프",
                           content: "SafeYandex.DNS 필터가 모든 장치에서 작동합니다"
                       } ,{                      
                           type: "name",
                           title: "어린이",
                           content: "ChildYandex.DNS 필터가 모든 장치에서 작동합니다."
                       }]
},
       YANDEX_DNS_GRID :{ 
               TITLE:"특정 디바이스에만 DNS 규칙을 적용합니다",
               CONTENT: [{
                           type: "name",
                           title: "MAC address",
                           content: "해당 디바이스의 MAC 주소는 어떤 Yandex.DNS 필터가 적용되는 지 표시합니다"
                       } ,{                      
                           type: "name",
                           title: "컨트롤 모드",
                           content: "특정 디바이스에 적용된 Yandex.DNS필터를 표시합니다"
                       } ,{                      
                           type: "name",
                           title: "설명",
                           content: "디바이스를 식별하기 위해서 디바이스 설명을 표시합니다\\n"
                       } ,{                      
                           type: "paragraph",
                           content: "추가 버튼을 클릭하면 특정 디바이스에 구체적인 Yandex.DNS 필터가 적용 가능합니다. 스캔 목록에서 장치를 선택하거나 수동으로 MAC 주소를 입력 할 수 있습니다. 특정 컨트롤 모드 (기본, 안전, 자녀)를 선택하고  간단한 설명을 기재할 수 있습니다"
                       } ,{                      
                           type: "paragraph",
                           content: "추가하거나 삭제하려면 항목 표에 수정 또는 휴지통 아이콘을 클릭합니다."
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"접속 제어 관리",
               CONTENT: [{
                           type: "paragraph",
                           content: "접속 관리 기능은 특정 컴퓨터 및 기타 장치의 네트워크 접속을 허용하거나 차단하는데 사용됩니다. 장치가 차단되면, 다른 장치와 통신하거나, 인터넷에 연결할 수 없습니다."
                       } ,{                      
                           type: "paragraph",
                           content: "인터넷 접속 제어 기능은 블랙 리스트와 화이트 리스트로 활성화 되어 기본 필터 규칙 적용 됩니다.인터넷 접속 제어 기능 (OFF)을 사용하지 않으면 블랙리스트에 포함 해 모든 장치는 연결이 허용됩니다."
                       }]
},
       ACCESS_MODE :{ 
               TITLE:"인터넷 접속 제어모드",
               CONTENT: [{
                           type: "name",
                           title: "블랙리스트",
                           content: "활성화 된 접속 제어 정책에 의해 지정된 패킷만 허용합니다."
                       } ,{                      
                           type: "name",
                           title: "화이트리스트",
                           content: "황성화된 접속 제어 정책에 의해 지정된 패킷이 거부됩니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"장치 온라인",
               CONTENT: [{
                           type: "name",
                           title: "장치 이름",
                           content: "연결 된 장치의 이름을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "IP 주소",
                           content: "접속된 기기의 IP주소를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "MAC 주소",
                           content: "접속된 기기의 MAC 주소를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "연결 유형",
                           content: "연결된 기기의 연결 유형을 표시합니다."
                       } ,{                      
                           type: "step",
                           title: "사용 제한",
                           content: "차단을 하고자 하는 장치에 해당된 사용 제한 목록에 수정 버튼을 클릭하십시오."
                       } ,{                      
                           type: "step",
                           title: "여러 장치를 사용 제한 하려면",
                           content: "차단을 하고자 하는 여러 장치를 클릭하시고 사용 제한 목록에 있는 수정 버튼을 클릭하려주십시오.본 장치 자동으로 블랙 또는 화이트 리스트 장치에 추가됩니다."
                       }]
},
       ACCESS_LIST :{ 
               TITLE:"차단/허용 목록에 있는 장치",
               CONTENT: [{
                           type: "step",
                           title: "장치 차단 또는 허용",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2. 사용 제한 이름 입력하여 주십시오.",
                "3. 사용 제한 MAC주소를 들어가십시오",
                "4. OK 버튼을 클릭하십시오."]
} ,{                      
                           type: "step",
                           title: "차단/허용 목록에서 장치를 수정하거나 삭제하려면",
                           content: "차단/허용 목록  테이블에서,수정하거나 삭제하려는 기기에 해당하는 편집 아이콘 또는 쓰레기통 아이콘을 클릭하십시오."
                       } ,{                      
                           type: "step",
                           title: "차단/허용 목록에서 복수의 장치를 삭제하려면",
                           content: "차단/허용 목록에서 모든 목록을 선택하여 삭제 버튼을 클릭하십시오."
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"설정",
               CONTENT: [{
                           type: "paragraph",
                           content: "ARP바인딩 기능은IP주소와 함께 디바이스의 MAC주소를 결합하여  LAN내에서 특정 컴퓨터릐 접속을 제어하는데 유용합니다.ARP바인딩은 특정 IP주소를 사용하여 다른 장치를 방지합니다."
                       }]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"ARP 목록",
               CONTENT: [{
                           type: "paragraph",
                           content: "현재 연결된 장치의 MAC주소 및 IP주소를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "ARP 항목 번호",
                           content: "현재 공유기에 연결 되어 있는 장치의 수를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "MAC 주소",
                           content: "접속된 기기의 MAC 주소를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "IP 주소",
                           content: "LAN내에서 관리하고자 하는 컴퓨터에 할당된 IP 주소."
                       } ,{                      
                           type: "name",
                           title: "바우딩",
                           content: "해당 장치에 ARP 바인딩을 사용하려면 이 옵션을 체크하십시오."
                       } ,{                      
                           type: "name",
                           title: "수정",
                           content: "해당 항목을 수정 하거나 사제할 수 있습니다."
                       } ,{                      
                           type: "note",
                           title: "참고:",
                           content: "둘 이상의 MAC 주소와 동일한 IP 주소를 바인딩 할 수있다."
                       }]
},
       IPMAC_BIND_LIST :{ 
               TITLE:"바인딩 목록",
               CONTENT: [{
                           type: "step",
                           title: "ARP는 바인딩 장치를 설정하려면",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2. 디바이스의 MAC 주소을 입력하십시오.",
                "3. 위의 MAC 주소에 바인딩을 할 IP주소를 입력하십시오",
                "4. 본 장치에 대한 설명을 입력하십시오(선택 사항)",
                "5. 상태 사용함을 선택하십시오.",
                "6. OK 버튼을 클릭하십시오."]
} ,{                      
                           type: "step",
                           title: "수정하거나 삭제를 하려면",
                           content: "바인딩 목록에서 관리 버튼을 누르거나 삭제 버튼을 클릭하십시오."
                       } ,{                      
                           type: "step",
                           title: "여러 항목을 삭제 하려면",
                           content: "바인딩 목록에서 삭제하고자 하는 항목을 선택하신 후 삭제 버튼을 클릭하십시오."
                       }]
},
       IPV6 :{ 
               TITLE:"인터넷",
               CONTENT: [{
                           type: "name",
                           title: "IPv6",
                           content: "IPv6의 기능을 활성화 또는 비활성화합니다."
                       } ,{                      
                           type: "title",
                            title: "인터넷 회선 유형: 고정IP"
                       } ,{                      
                           type: "name",
                           title: "고정 IP",
                           content: "ISP에서 고정 IPv6 주소 할당을 제공하면 이 유형을 선택합니다."
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
                            title: "인터넷 회선 유형: 동적IP"
                       } ,{                      
                           type: "name",
                           title: "동적 IP",
                           content: "ISP에서 동적 IPv6 주소 할당을 제공하면 이 유형을 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "IPv6 주소/기본 DNS/보조 DNS",
                           content: "이 변수들을 자동으로 ISP의 DHCPv6 서버에서 할당받습니다."
                       } ,{                      
                           type: "name",
                           title: "갱신",
                           content: "이 버튼을 클릭하여 새 IPv6변수를 DHCPv6서버에서 할당받습니다."
                       } ,{                      
                           type: "name",
                           title: "해제",
                           content: "ISP의 DHCPv6 서버에서 할당 받은 IPv6 주소를 해제하려면 이 버튼을 클릭합니다."
                       } ,{                      
                           type: "name",
                           title: "IPv6 주소를 가져오기",
                           content: "ISP에 따라, 일시적이 아닌 IPv6 주소를 받으려면  DHCPv6, 공유기 알림 패킷에서 생성된  IPv6 주소를 받으려면 SLAAC를 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "접두어 위임",
                           content: "ISP에서 DHCPv6 서버에 의해 접두어 위임을 받으려면 사용, 수동으로 주소 접두사를 지정하려면 사용 안함을 선택합니다. LAN에 연결된 클라이언트는 이 접두사와 IPv6 주소를 생성합니다."
                       } ,{                      
                           type: "name",
                           title: "DNS 주소",
                           content: "\"ISP에서 동적으로 가져오기\" 또는 \"다음 DNS 주소를 사용하기\"를 선택합니다. \"다음 DNS 주소를 사용하기\"를 선택하면 수동으로 ISP에서 제공하는 DNS 주소를 입력하시기 바랍니다."
                       } ,{                      
                           type: "name",
                           title: "기본 도메인",
                           content: "그 변수들을 수동으로 입력하거나 ISP에서 자동으로 할당됩니다."
                       } ,{                      
                           type: "title",
                            title: "인터넷 회선 유형: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE",
                           content: "ISP가 PPPoEv6을 사용하고 사용자 이름과 비밀번호를 제공하면 이 유형을 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "사용자 이름/비밀번호",
                           content: "ISP가 제공하는 변수를 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "IPv6 주소",
                           content: "사용자 이름과 비밀번호를 입력하고 연결을 클릭 한 후, ISP에서 DHCPv6 서버에서 자동으로 할당받습니다."
                       } ,{                      
                           type: "name",
                           title: "DNS 주소",
                           content: "\"ISP에서 동적으로 가져오기\" 또는 \"다음 DNS 주소를 사용하기\"를 선택합니다. \"다음 DNS 주소를 사용하기\"를 선택하면 수동으로 ISP에서 제공하는 DNS 주소를 입력하시기 바랍니다."
                       } ,{                      
                           type: "name",
                           title: "IPv6 주소를 가져오기",
                           content: "ISP에 따라, 일시적이 아닌 IPv6 주소를 받으려면  DHCPv6, 공유기 알림 패킷에서 생성된  IPv6 주소를 받으려면 SLAAC, 수동으로 IPv6 주소를 입력하려면  ISP에서 받기를 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "접두어 위임",
                           content: "ISP에서 DHCPv6 서버에 의해 접두어 위임을 받으려면 사용, 수동으로 주소 접두사를 지정하려면 사용 안함을 선택합니다. LAN에 연결된 클라이언트는 이 접두사와 IPv6 주소를 생성합니다."
                       } ,{                      
                           type: "name",
                           title: "연결",
                           content: "이 버튼을 클릭하여 인터넷을 연결합니다."
                       } ,{                      
                           type: "name",
                           title: "연결 끊기",
                           content: "인터넷 연결을 해제하려면 이 버튼을 클릭합니다."
                       } ,{                      
                           type: "title",
                            title: "인터넷 연결 유형 : 6to4 Tunnel"
                       } ,{                      
                           type: "name",
                           title: "6to4 터널",
                           content: "ISP가 주소 설정을 위해 6to4 개발을 사용한다면, 이 유형을 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "IPv4주소/IPv4 서브넷 마스크/IPv4 기본 게이트웨이/Tunnel 주소",
                           content: "연결을 클릭 한 후 이러한 변수들이 WAN 포트의 IPv4 정보에 의해 자동으로 생성됩니다."
                       } ,{                      
                           type: "name",
                           title: "다음 DNS 서버 사용",
                           content: "ISP가 제공한기본 DNS 및/또는 보조 DNS를 수동으로 입력하려면 확인란을 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "연결",
                           content: "이 버튼을 클릭하여 인터넷을 연결합니다."
                       } ,{                      
                           type: "name",
                           title: "연결 끊기",
                           content: "인터넷 연결을 해제하려면 이 버튼을 클릭합니다."
                       } ,{                      
                           type: "title",
                            title: "인터넷 연결 유형: 통과 (브리지)"
                       } ,{                      
                           type: "paragraph",
                           content: "ISP가 Pass Through (브리지) 네트워크 배포를 사용하는 경우 이 유형을 선택합니다. 이러한 유형은 변수가 제공되지 않고 구성이 필요하지 않습니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       IPV6_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "통과(브릿지)를 제외하고, 다른 6가지 유형의 인터넷 연결은 IPv6 구성이 필요합니다."
                       } ,{                      
                           type: "name",
                           title: "할당 유형",
                           content: "ISP에 따라 적절한 하나를 선택합니다.",
       children: [{                      
                           type: "name",
                           title: "DHCPv6",
                           content: "자동으로 LAN에 있는 클라이언트에 IP 주소를 할당합니다.",
       children: [{                      
                           type: "name",
                           title: "주소 접두사",
                           content: "ISP가 제공 한 접두사를 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "해제 시간",
                           content: "할당된 IP 주소의 유효 기간을 의미합니다. 기본 86,400초 유지하며 ISP가 필요한 경우 변경합니다."
                       } ,{                      
                           type: "name",
                           title: "주소",
                           content: "ISP의 DHCPv6 서버에서 자동으로 할당된 IP 주소입니다."
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC + 태형 DHCP",
       children: [{                      
                           type: "name",
                           title: "주소 접두사",
                           content: "ISP가 제공 한 접두사를 입력합니다."
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
                           content: "ISP가 제공 한 접두사를 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "주소",
                           content: "ISP에 의해 자동으로 할당된 IP 주소입니다."
                       }]
}]
} ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"MAC 클론",
               CONTENT: [{
                           type: "name",
                           title: "초기 MAC 주소 사용",
                           content: "ISP가 MAC 주소에 할당된 IP 주소를 바인딩 하지 않는 경우 공유기의 기본 MAC 주소를 변경하지 마십시오."
                       } ,{                      
                           type: "name",
                           title: "컴퓨터 MAC 주소 사용",
                           content: "인터넷 서비스 제공업체가 사용자의 랜카드의 MAC 주소 등록을 요청했을 경우, 공유기에 연결된 컴퓨터의 현재 MAC 주소하기를 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "사용자 PC의 MAC 주소",
                           content: "인터넷 서비스 제공업체가 특정 MAC 주소에 IP 주소를 할당하는 경우, 수동으로 MAC 주소를 입력하십시오."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       TIME_SETTING :{ 
               TITLE:"시간설정",
               CONTENT: [{
                           type: "step",
                           title: "자동시간 설정",
       content: [ 
                "1. 시간설정에서, 인터넷을 통한 자동설정을 선택합니다.",
                "2. 해당지역 시간대를 선택합니다.",
                "3. NTP서버1에서 희망하는 NTP서버의  IP주소 또는 도메인 이름을 입력합니다.",
                "4. NTP서버2에서 두번때 NTP서버의 IP주소 또는 도메인 이름을 입력합니다.(옵션)",
                "5. 가져오기를 클릭합니다.",
                "6. 저장을 클릭하세요."]
} ,{                      
                           type: "step",
                           title: "수동으로 날짜와 시간 설정합니다.",
       content: [ 
                "1. 시간설정에서 수동을 선택합니다.",
                "2. 현재 날짜를 입력합니다.",
                "3. 현재 시간을 입력합니다.(24시간 방식 예. 16:00:00은 오후4시입니다.)",
                "4. 저장을 클릭합니다."]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"일광절약시간제(썸머타임)",
               CONTENT: [{
                           type: "step",
                           title: "일광절약시간제 설정하기",
       content: [ 
                "1. 일광절약시간제를 선택합니다.",
                "2. 해당 지역시간대의 일광절약시간제 시작 시간과 날짜를 선택합니다.",
                "3. 해당 지역시간대의 일광절약시간제 마감 시간과 날짜를 선택합니다.",
                "4. 저장을 클릭합니다."]
}]
},
       DIGNOSTIC :{ 
               TITLE:"진단도구",
               CONTENT: [{
                           type: "paragraph",
                           content: "ping은 패킷을 사용하여 타겟 IP주소 또는 도메인 이름과 로그기록에 주고/받기를 진행합니다. Tracerout도구는 패킷을 사용하여 타겟 IP주소 또는 도메인이름, hop와 목적지 도달시간의 숫자를 표시합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "IP주소 또는 도메인 이름 예를 들어 google.com, yahoo.com으로 ping과 tracerout 할 수 있습니다."
                       } ,{                      
                           type: "step",
                           title: "Ping 사용하여 진단하기",
       content: [ 
                "1. 타겟 IP주소 또는 도메인 이름을 입력합니다.",
                "2. 화살아이콘을 클릭하여 우선메뉴와 Ping 카운트, Ping 패킷사이지를 설정합니다.(옵션)",
                "3. 시작을 클릭합니다."]
} ,{                      
                           type: "step",
                           title: "Traceroute 사용하여 진단하기",
       content: [ 
                "1. 타겟 IP주소 또는 도메인 이름을 입력합니다.",
                "2. 화살아이콘을 클릭하여 우선메뉴와 Traceroute Max TTL(Time to live) 필드에 hop 회수(도달)을 입력합니다. 기본설정값은 20입니다.(옵션)",
                "3. 시작을 클릭합니다."]
}]
},
       FIRMWARE :{ 
               TITLE:"펌웨어 업그레이드",
               CONTENT: [{
                           type: "paragraph",
                           content: "공유기의 펌웨어를 업그레이드 하기 전, <a class=\"link\" href=\"http://www.tp-link.com/kr/Support/\" target=\"_blank\">TP-Link Support</a> 에서 최신 펌웨어를 다운로드 받으세요."
                       } ,{                      
                           type: "step",
                           title: "중요:업그레이트 실패시, 다음을 참조하세요:",
       content: [ 
                "하드웨어 버전과 최근 펌웨어 버전에 일치하는지 확인하세요.(펌웨어 업그레이드 페이지 참조)",
                "공유기와 컴퓨터간 연결에 문제가 없는지 확인 하세요. 무선을 통한 펌웨어 업그레이드는 불안정할 수 있습니다.",
                "데이터 유실을 막기 위하여 펌웨어 업그레이드 전 공유기와 연결된 모든 USB기기를 제거해 주세요.",
                "공유기 설정을 백업하세요.",
                "펌웨어 업그레이드중 공유기 전원을 끄지 마세요."]
} ,{                      
                           type: "step",
                           title: "공유기의 펌웨어를 업그레이드하려면",
       content: [ 
                "1. 브라우즈를 클릭하세요",
                "2. 펌웨어 파일을 다운받은 경로를 지정하세요.",
                "3. 업그레이드를 선택하십시오. "]
} ,{                      
                           type: "paragraph",
                           content: "업그레이드는 몇분간의 시간이 필요합니다. 업그레이드 진행중 절대 전원을 끄지 마십시오."
                       }]
},
       BACKUP :{ 
               TITLE:"백업",
               CONTENT: [{
                           type: "paragraph",
                           content: "현재 설정을 백업하시길 추천합니다. 시스템 재설정시 공장초기화에서 바로 복구하기 위함입니다."
                       } ,{                      
                           type: "paragraph",
                           content: "백업을 클릭하여 현재설정을 저장하십시오. 백업파일은 차후 복구를 위하여 안전한 장소에 저장하십시오."
                       }]
},
       RESTORE :{ 
               TITLE:"복구",
               CONTENT: [{
                           type: "step",
                           title: "백업으로부터 복구하기",
       content: [ 
                "1. 브라우즈를 클릭하세요",
                "2. 백업파일의 경로를 지정하세요.",
                "3. 복구를 클릭하세요."]
}]
},
       FACTORY :{ 
               TITLE:"공장초기화",
               CONTENT: [{
                           type: "paragraph",
                           content: "공장초기화를 클릭하여 공유기 최초 설정으로 초기화합니다."
                       } ,{                      
                           type: "step",
                           title: "참고:",
       content: [ 
                "1. 공장 복원하면 공유기에 구성한 모든 설정이 지워집니다. 공유기의 관리 페이지에 다시 로그인하려면 사용자 이름과 비밀번호에 모두 기본 admin을 사용합니다.",
                "2. 백업하는 동안 공유기의 전원을 끄거나 프로세스를 복원하지 마십시오."]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"관리계정",
               CONTENT: [{
                           type: "paragraph",
                           content: "이 페이지는 로그인 사용자이름과/또는 비밀번호 변경 그리고 비밀번호 복구를 위한 이메일 주소를 설정할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "이전 비밀번호",
                           content: "현재 비밀번호를 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "새로운 비밀번호",
                           content: "새로운 비밀번호를 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "새로운 비밀번호 확인",
                           content: "새로운 비밀번호를 다시 입력합니다."
                       } ,{                      
                           type: "note",
                           title: "참고:",
                           content: "If you decide to change the current password used to login to the router, make sure to write down the new login information in a secure location."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       ADMIN_RECOVERY :{ 
               TITLE:"비밀번호 복구",
               CONTENT: [{
                           type: "name",
                           title: "비밀번호 복구 활성화",
                           content: "비밀번호 복구 기능을 사용하는 것이 좋습니다. 이메일을 통해 사용자 이름과 비밀번호를 재설정하는데 도움이 됩니다"
                       } ,{                      
                           type: "name",
                           title: "발송메일",
                           content: "발송할 이메일주소를 입력하세요"
                       } ,{                      
                           type: "name",
                           title: "받을메일",
                           content: "받을 이메일주소를 입력하세요"
                       } ,{                      
                           type: "name",
                           title: "SMTP서버",
                           content: "공유기가 이메일로 인증 코드를 전송하는 데 사용하는 SMTP 서버 주소를 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "인증 사용",
                           content: "이메일을 보내는데 인증이 필요한 경우 사용자이름과 비밀번호를 해당 필드에 입력하세요. 이 필드는 대소문자를 구분합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       ADMIN_LOCAL :{ 
               TITLE:"로컬 관리",
               CONTENT: [{
                           type: "paragraph",
                           content: "MAC주소로 인증한 공유기에 접근하도록 사용자 LAN상의 클라이언트 기기의 숫자를 제한합니다."
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
       ADMIN_REMOTE :{ 
               TITLE:"원격관리",
               CONTENT: [{
                           type: "paragraph",
                           content: "원격관리 기능은 사용자가 인터넷을 통하여 원격으로 공유기의 접근과 환경설정을 가능하게 합니다."
                       } ,{                      
                           type: "name",
                           title: "원격관리 비활성화",
                           content: "원격관리 비활성화 옵션을 선택하세요."
                       } ,{                      
                           type: "name",
                           title: "모든기기의 원격관리 활성화",
                           content: "모든 IP주소의 원격관리 활성화 옵션을 선택세요. 활성화시 웹관리 포트 필드에 들어갑니다."
                       } ,{                      
                           type: "name",
                           title: "특정기기 원격관리 활성화",
                           content: "특정 IP주소의 원격관리 활성화 옵션을 선택하세요. 활성화시 웹관리 포트와 원격관리 IP주소 필드에 들어갑니다."
                       } ,{                      
                           type: "name",
                           title: "웹 관리 포트",
                           content: "공유기 접근 보안을 위한 1024와 65535 사이에 포트넘버를 입력하세요. 일반적으로 웹브라우저는 스탠다드 HTTP 서비스 포트 80을 사용합니다. 기본값과 보통 서비스 포트는 HTTP의 유동서비스 포트 8080입니다."
                       } ,{                      
                           type: "name",
                           title: "IP주소 관리 원격지원",
                           content: "공유기한 접근할 수 있는 유효한 IP주소 또는 IP영역을 입력합니다. 255.255.255.255는 모든 사용자의 접근을 허락하게됩니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       SYSTEM_LOG :{ 
               TITLE:"시스템로그",
               CONTENT: [{
                           type: "paragraph",
                           content: "시스템로그 페이지는 공유기의 가장 최근의 활동(이벤트) 리스트를 표시합니다. 사용자가 보기 원하는 로그의 타입과/ 또는 로그의 레벨을 규정할 수 있습니다. 또한 자동으로 특정 이메일 주소 또는 컴퓨터에 로그파일 내보내기를 설정할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "타입",
                           content: "표시할 시스템로그의 형식을 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "레벨",
                           content: "표시할 시스템로그의 레벨을 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "새로고침",
                           content: "아이콘을 클릭하여 시스템 로그를 업데이트 합니다."
                       } ,{                      
                           type: "name",
                           title: "모두삭제",
                           content: "아이콘을 클릭하여 모든 시스템 로그를 삭제합니다."
                       } ,{                      
                           type: "name",
                           title: "로그저장",
                           content: "버튼을 클릭하여 로컬컴퓨터에 모든 시스템 로그파일을 다운로드합니다."
                       } ,{                      
                           type: "name",
                           title: "메일설정",
                           content: "버튼을 클릭하여 시스템로그의 이메일을 설정합니다."
                       } ,{                      
                           type: "step",
                           title: "시스템로그 이메일 설정하기",
       content: [ 
                "1. 메일설정을 클릭하세요",
                "2. 발송메일 - 발송할 이메일주소를 입력하세요",
                "3. 받을메일 - 받을 이메일주소를 입력하세요",
                "4. SMTP서버 - 이메일을 통해 공유기 계정정보를 받으시려면 SMTP 서버주소를 입력하세요" ,
{                      
                           content: "5. 인증활성화 - 메일발송시 SMTP서버인증이 필요한 경우 해당 옵션을 선택하세요.",
       children: [{                      
                           type: "name",
                           title: "사용자이름",
                           content: "SMTP서버의 사용자이름을 입력하세요. 해당 필드는 대소문자를 구분합니다."
                       } ,{                      
                           type: "name",
                           title: "비밀번호",
                           content: "SMTP서버의 비밀번호를 입력하세요. 해당 필드는 대소문자를 구분합니다."
                       }]
} ,
{                      
                           content: "6. 자동메일 활성화 - 자동으로 언제 시스템로그를 보낼지 지정할 수 있습니다.",
       children: [{                      
                           type: "paragraph",
                           content: "매일 특정시간에 시스템 로그를 받으시려면, 시간(HH)과 분(MM)을 24시간 형식으로 입력하세요. 예.16:00는 오후4시입니다."
                       } ,{                      
                           type: "paragraph",
                           content: "특정한 시간 또는 시간단위로 시스템 로그를 받으시려면 시간의 단위를 입력하세요"
                       }]
},
                "7. 저장을 클릭합니다."]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"트래픽 통계",
               CONTENT: [{
                           type: "paragraph",
                           content: "트래픽 통계 페이지는 LAN,WAN 그리고 WLAN에서 패킷을 주고받는 네트워크 트랙픽을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "트래픽 통계",
                           content: "통계 정보를 표시할 수 있도록 토글합니다."
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"트래픽 통계 리스트",
               CONTENT: [{
                           type: "name",
                           title: "IP주소/MAC주소",
                           content: "관련된 클라이언트 기기의 IP주소와 MAC주소를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "패킷 총합",
                           content: "세션이 시작했을때부터 혹은 이전 카운터에서 리셋된 시점으로부터 주고 받은 패킷의 숫자를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "바이트 총합",
                           content: "세션이 시작했을때부터 혹은 이전 카운터에서 리셋된 시점으로부터 주고 받은 바이트의 숫자를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "현재 패킷",
                           content: "특정 시간대별 주고받은 패킷의 숫자를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "현재 바이트",
                           content: "특정 시간대 주고받은 바이트의 숫자를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "수정",
                           content: "리스트 해당 통계의 초기화(0)과 삭제 옵션을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "새로고침",
                           content: "페이지 통계정보를 업데이트합니다."
                       } ,{                      
                           type: "name",
                           title: "모두 초기화",
                           content: "모든 통계정보를 초기화 합니다."
                       } ,{                      
                           type: "name",
                           title: "모두삭제",
                           content: "리스트의 모든 통계 정보를 삭제합니다."
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"무선 2.4GHz/5GHz",
               CONTENT: [{
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
                           content: "Delivery Traffic Indication Message(DTIM)의 간격을 정한다. 1부터 15사이의 밀리세컨드 값을 입력한다. 기본값은 1이다. DTIM간격은 신호간격과 동일하다."
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
                           content: "기본적으로 활성화할 것을 권하며 Guard Interval(GI)시간을 줄여 데이터량을 늘린다."
                       } ,{                      
                           type: "name",
                           title: "AP Isolation 특성",
                           content: "상호 인터랙팅을 통해 사용자의 네트워크에 연결된 모든 무선 장치를 확인 및 제한하는 한편 사용자는 여전히 인터넷에 액세스할 수 있게 하려면, AP 격리 활성화 확인란을 선택합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       SYSTEM_PARA_WDS :{ 
               TITLE:"2.4GHz/5GHz WDS",
               CONTENT: [{
                           type: "name",
                           title: "WDS 브리지 사용",
                           content: "무선로컬 네트워크(WLAN)에서 공유기가 다른 접속포인트(AP)와 연결할 수 있도록 WDS(Wireless Distrbution System)을 활성화합니다. 만약 이 특성이 활성화하려면 다음 설정을 따라하세요."
                       } ,{                      
                           type: "name",
                           title: "SSID (브리지로 연결할)",
                           content: "공유기가 연결되는 클라이언트로서의 WAP(무선액세스포인트)의 SSID를 입력하거나, 사용 가능한 모든 네트워크를 확인하기 위해 검색 기능을 사용합니다."
                       } ,{                      
                           type: "name",
                           title: "검색",
                           content: "이 버튼을 클릭하시면 같은 영역대의 모든 가능한 무선 네트워크의 SSID,BSSID, 신호크기, 채널과 보안정보를 검색하여 표시합니다. 네트워크를 선택하면 SSID, MAC주소와 보안이 자동으로 입력됩니다."
                       } ,{                      
                           type: "name",
                           title: "MAC주소(브릿지된)",
                           content: "12자리 문자(0-9, a-f, A-F)의 MAC주소(BSSID)를 입력하세요. 만약 희망하는 AP를 선택하시면 자동으로 검색 특성을 통하여 MAC주소 필드에 자동으로 입력됩니다."
                       } ,{                      
                           type: "name",
                           title: "WDS 모드",
                           content: "WDS 모드:Auto, WDS1 or WDS2."
                       } ,{                      
                           type: "name",
                           title: "보안",
                           content: "선택된 AP의 보안형식을 선택하세요. 만약 희망하는 AP를 선택하시면 자동으로 Survey특성을 통하여 보안 필드에 자동으로 입력됩니다.",
       children: [{                      
                           type: "name",
                           title: "비밀번호",
                           content: "이 옵션은 보안형식이 WPA-PS/WPA2-PSK일 경우 활성화 됩니다. 선택한 AP의 비밀번호를 입력하세요."
                       } ,{                      
                           type: "name",
                           title: "인증 형식",
                           content: "이 옵션은 보안형식이 WEP(Wired Equivalent Privacy)일 경우 활성화 됩니다. 선택된 AP에서 사용하는 인증 형식을 선택하세요(자동, 오픈시스템 또는 키공유)."
                       } ,{                      
                           type: "name",
                           title: "WEP 키 형식",
                           content: "이 옵션은 보안형식이 WEP일 경우 활성화 됩니다. 선택된 AP에서 사용하는 키포멧(ASCII 또는 Hexadecimal)을 선택하세요"
                       }]
} ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"WPS",
               CONTENT: [{
                           type: "paragraph",
                           content: "WPS 활성화 체크박스를 선택하요 저장을 클릭하여 WPS(Wi-Fi 보안설정)을 활성화합니다. 버튼으로 쉬운 WPS 기능 설정이 가능합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"NAT",
               CONTENT: [{
                           type: "name",
                           title: "NAT",
                           content: "NAT활성화 체크박스를 선택하고 저장을 클릭하면 NAT(Network Address Translation)기능 활성화됩니다."
                       } ,{                      
                           type: "note",
                           title: "참고:",
                           content: "NAT가 비활성화 상태일 때에는, NAT 포워딩 구성이 적용되지 않습니다."
                       } ,{                      
                           type: "name",
                           title: "NAT부스트",
                           content: "NAT부스트 활성화 체크박스를 선택하고 저장을 클릭하면 공유기가 최고의 처리량을 보장해줍니다."
                       } ,{                      
                           type: "note",
                           title: "참고:",
                           content: "NAT부스트 활성화시, QoS와 트래픽 통계는 자동으로 비활성화 됩니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"DoS 보호 수준 설정",
               CONTENT: [{
                           type: "paragraph",
                           content: "DoS 보호 레벨은 ICMP-FLOOD, UDP-FLOOD, 및 TCP-FLOOD 공격으로부터 공유기를 보호합니다."
                       } ,{                      
                           type: "name",
                           title: "ICMP-FLOOD 패킷 레벨",
                           content: "5부터 7200 사이 ICMP 패킷값을 입력하세요. 한계치를 초과하는 패킷 발생 시 즉시 ICMP-FLOOD 보호가 작동합니다."
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD 패킷 레벨",
                           content: "5부터 7200 사이 UDP 패킷값을 입력하세요. 한계치를 초과하는 패킷 발생 시 즉시 UDP-FLOOD 보호가 작동합니다."
                       } ,{                      
                           type: "name",
                           title: "TCP-FLOOD 패킷 레벨",
                           content: "5부터 7200 사이 TCP-SYN 패킷값을 입력하세요. 한계치를 초과하는 패킷 발생 시 즉시 TCP-SYN-FLOOD 보호가 작동합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"이중",
               CONTENT: [{
                           type: "name",
                           title: "이중",
                           content: "드롭다운 리스트에서 이중 형식을 선택하세요"
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
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
       SYSTEM_DEBUG_MODE :{ 
               TITLE:"시스템 로그",
               CONTENT: [{
                           type: "name",
                           title: "디버그 모드",
                           content: "공유기 비정상적인 상태 로그보기를 활성화합니다. 이 기능은 디버깅을 위하여 Technical Support의 가이드를 따라 진행하는 경우에만 사용하시기 바랍니다."
                       }]
},
       OPEN_VPN :{ 
               TITLE:"OpenVPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "OpenVPN 기능을 통해 외출 시에 인터넷으로 안전하게 네트워크에 접속할 수 있습니다. VPN 서비스 사용 시, 동적 DNS 서비스를 설정하거나(권장) 공유기 WAN 포트에 고정 IP 주소를 할당해야 합니다. '시스템 시간'은 인터넷과 동기화되어야 합니다. "
                       } ,{                      
                           type: "name",
                           title: "VPN 서버 활성화",
                           content: "OpenVPN 서버를 활성화하려면 이 체크박스를 선택하세요."
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
                           content: "OpenVPN 클라이언트의 액세스 타입을 선택하세요.",
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
                           title: "VPN 서버 활성화",
                           content: "이 체크박스를 선택하면 PPTP VPN 서버가 활성화됩니다."
                       } ,{                      
                           type: "name",
                           title: "클라이언트 IP 주소",
                           content: "PPTP VPN 서버가 클라이언트에 리스할 수 있는 IP 주소 범위(클라이언트 최대 1대)를 입력합니다."
                       } ,{                      
                           type: "name",
                           title: "Samba(네트워크 위치) 접근 허용",
                           content: "VPN 클라이언트의 로컬 Samba 서버 액세스 허용을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "NetBIOS 패스스루 허용",
                           content: "NetBIOS 이름을 사용하는 Samba 서버에 대한 VPN 클라이언트의 액세스 허용을 선택하십시오."
                       } ,{                      
                           type: "name",
                           title: "암호화되지 않은 연결 허용",
                           content: "VPN 서버와의 비밀번호화되지 않은 연결 허용하기를 선택하십시오."
                       }]
},
       PPTP_ACCOUNT_LIST :{ 
               TITLE:"계정 목록",
               CONTENT: [{
                           type: "paragraph",
                           content: "이 테이블은 원격 클라이언트가 PPTP VPN 서버에 연결하는 데 사용할 수있는 계정을 표시합니다."
                       } ,{                      
                           type: "step",
                           title: "PPTP VPN 계정 추가",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2. PPTP VPN 서버에 클라이언트 신분을 인증하기 위해 사용자 이름과 암호를 입력합니다.",
                "3. OK 버튼을 클릭하십시오."]
} ,{                      
                           type: "step",
                           title: "이미 존재하는 계정을 수정하거나 삭제",
                           content: "테이블에서 수정 또는 삭제 아이콘을 클릭하여 계정을 수정하거나 삭제합니다. "
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
                       } ,{                      
                           type: "paragraph",
                           content: "마이너스 아이콘을 클릭하면 해당 클라이언트의 연결이 해제됩니다."
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"인터넷",
               CONTENT: [{
                           type: "name",
                           title: "인터넷 상태",
                           content: "공유기의 인터넷 연결 상태를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "연결 유형",
                           content: "인터넷 연결 유형을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "IP 주소",
                           content: "공유기 할당 된 인터넷 IP 주소를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "보조 연결/IP 주소",
                           content: "보조 연결 유형 및 IP 주소를 표시합니다."
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"공유기",
               CONTENT: [{
                           type: "title",
                            title: "무선 2.4GHz/5GHz"
                       } ,{                      
                           type: "name",
                           title: "SSID",
                           content: "2.4GHz/5GHz의 대역 주파수의 무선 네트워크 이름을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "채널",
                           content: "채널의 무선은 2.4GHz/5GHz의 네트워크 방송을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "MAC",
                           content: "무선은 2.4GHz/5GHz의 현재 MAC 주소를 표시합니다."
                       } ,{                      
                           type: "title",
                            title: "게스트 네트워트 2.4GHz/5GHz"
                       } ,{                      
                           type: "name",
                           title: "상태",
                           content: "무선 게스트 네트워크는 2.4GHz/5GHz의5GHz의에 있는지 여부를 표시합니다 (사용) 또는 (사용 안 함)."
                       } ,{                      
                           type: "name",
                           title: "SSID",
                           content: "게스트 네트워크의 무선 네트워크 이름을 표시합니다."
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"유선/무선 클라이언트",
               CONTENT: [{
                           type: "name",
                           title: "이름",
                           content: "고유기에 연결된 클라이언트의 이름을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "IP 주소",
                           content: "클라이언트의 할당 된 IP 주소를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "MAC 주소",
                           content: "클라이언트의 MAC 주소를 표시."
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"프린터",
               CONTENT: [{
                           type: "name",
                           title: "이름",
                           content: "USB 포트를 통해 공유기에 연결된 프린터의 이름을 표시합니다."
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"USB 디스크",
               CONTENT: [{
                           type: "name",
                           title: "USB 디스크",
                           content: "공유기에 연결된 USB 디스크의 브랜드를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "합계",
                           content: "USB 디스크의 전체 볼륨을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "내장 공간",
                           content: "USB 디스크의 사용 가능한 공간을 표시합니다."
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"인터넷",
               CONTENT: [{
                           type: "name",
                           id: "auto_detect_button",
                           title: "자동 감지",
                           content: "공유기가 자동으로 ISP에서 제공하는 인터넷 연결 유형을 감지할 수 있습니다."
                       } ,{                      
                           type: "note",
                           id: "auto_detect_note",
                           title: "참고:",
                           content: "사용자의 인터넷 연결 유형이 확실하지 않은 경우, 자동 감지 기능을 사용하거나 ISP에 지원을 요청하십시오."
                       } ,{                      
                           type: "title",
                            title: "인터넷 회선 유형: 고정IP"
                       } ,{                      
                           type: "name",
                           title: "IP 주소/서브넷 마스크/기본 게이트웨이/기본 DNS/보조 DNS",
                           content: "ISP가 제공하는 정보를 입력합니다."
                       } ,{                      
                           type: "title",
                            title: "인터넷 회선 유형: 동적IP"
                       } ,{                      
                           type: "name",
                           title: "현재 컴퓨터의 MAC 주소를 복제하지 마십시오",
                           content: "당신의 MAC 주소를 복제할지 여부를 선택, 당신의 ISP에 따라"
                       } ,{                      
                           type: "title",
                            title: "인터넷 회선 유형: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "사용자 이름/비밀번호",
                           content: "인터넷 서비스 제공 희사 ISP에서 제공하는 사용자 이름과 비밀번호를 입력합니다."
                       } ,{                      
                           type: "title",
                            title: "인터넷 회선 유형: L2TP/PPTP"
                       } ,{                      
                           type: "name",
                           title: "사용자 이름/비밀번호",
                           content: "인터넷 서비스 제공 희사 ISP에서 제공하는 사용자 이름과 비밀번호를 입력합니다."
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
                           content: "IP 주소와 서브넷 마스크가 ISP에 의해 제공되는 경우에 선택하고, 이 정보를 해당 필드에 입력합니다."
                       }]
} ,{                      
                           type: "name",
                           title: "VPN 서버 IP/도메인 이름",
                           content: "ISP에서 제공하는 VPN 서버의 IP 주소 또는 도메인 이름을 입력합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"무선 설정",
               CONTENT: [{
                           type: "name",
                           title: "무선 라디오 사용함",
                           content: "2.4GHz/5GHz의 무선 라디오 주파수를 활성화하려면 이 확인란을 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "네트워크 이름(SSID)",
                           content: "무선 신호 이름을 최대 32자의 문자열로 지정합니다. 같은 이름 (SSID) 네트워크의 모든 무선 장치에 할당해야합니다."
                       } ,{                      
                           type: "name",
                           title: "SSID 숨기기",
                           content: "Wi-Fi 네트워크 목록에서는 2.4GHz/5GHz의 네트워크 이름 (SSID)을 숨기려면 이 확인란을 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "비밀번호",
                           content: "8-63자리 ASCII 문자 또는 16진수 8-64자리의 무선 비밀번호를 입력합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
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
                           content: "USB 저장 장치를 안전하게 제거하려면 공유기에서 분리하기 전에 이 버튼을 클릭합니다.",
       children: [{                      
                           type: "paragraph",
                           content: "제거 버튼은 장치가 공유기에 연결되어 있을 경우에 활성화됩니다. 현재 볼륨이 작동 중인 동안에는 USB 장치 제거가 불가능합니다."
                       }]
} ,{                      
                           type: "name",
                           title: "상태",
                           content: "이 체크박스는 USB 저장 장치가 공유기에 연결되었을 때 활성화됩니다. 체크시 USB 저장 장치의 파일공유가 가능합니다."
                       }]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"공유 설정",
               CONTENT: [{
                           type: "name",
                           title: "네트워크/미디어 서버 이름",
                           content: "연결된 USB 저장 장치에 액세스 하는 이름을 표시합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"폴더 공유",
               CONTENT: [{
                           type: "name",
                           title: "전체 공유",
                           content: "스위치 켠 상태에서 모든 파일과 폴더 공유되고 또는 끈 상태에 선택한 폴더만 공유됩니다."
                       } ,{                      
                           type: "name",
                           title: "인증 사용",
                           content: "공유 폴더에 액세스 하려면 유효한 사용자 이름과 암호를 입력하도록 요구하는 인증을 사용하는 것을 추천합니다.."
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
                           content: "옵션을 표시 수정하고 해당 공유 폴더를 삭제합니다."
                       } ,{                      
                           type: "name",
                           title: "추가",
                           content: "새 항목을 만들려면 이 버튼을 클릭합니다."
                       } ,{                      
                           type: "name",
                           title: "삭제",
                           content: "표에서 선택한 항목을 제거하려면 이 버튼을 클릭합니다."
                       } ,{                      
                           type: "name",
                           title: "검색",
                           content: "공유 폴더를 검색합니다."
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
       BASIC_PRINT_SERVER :{ 
               TITLE:"프린터 서버",
               CONTENT: [{
                           type: "name",
                           title: "프린터 서버",
                           content: "프린트 서버 기능을 사용할 수 있도록 토글합니다."
                       } ,{                      
                           type: "name",
                           title: "프린터 이름",
                           content: "공유기에 연결된 프린터 이름을 표시합니다."
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"자녀PC 관리 기능",
               CONTENT: [{
                           type: "name",
                           title: "자녀PC 관리 기능",
                           content: "토글'On'시 자녀PC관리 기능이 활성화 됩니다. 기본값은 비활성화 상태입니다."
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"자녀PC 관리 기기",
               CONTENT: [{
                           type: "paragraph",
                           content: "보호자 제어된 장치를 목록에 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "장치 이름",
                           content: "현재 관리되고 있는 모든 기기의 이름을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "MAC 주소",
                           content: "현재 관리되고 있는 모든 기기의 MAC주소를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "인터넷 접속 시간",
                           content: "접속 제한 시간의 기간을 표시합니다. \"시스템 도구 -> 시간 설정\"에서 설정 할 수 있는 시간 일정은 공유기의 시스템 시간을 기준으로 적용됩니다."
                       } ,{                      
                           type: "name",
                           title: "설명",
                           content: "옵션 설정은 연결된 장치에 대한 간단한 설명을 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "상태",
                           content: "관리 기능에 해당하는 기기의 현재 상태(활성화 또는 비활성화)를 표시합니다."
                       } ,{                      
                           type: "name",
                           title: "수정",
                           content: "해당 장치를 수정 또는 삭제하는 것을 표시합니다."
                       } ,{                      
                           type: "step",
                           title: "새로운 클라이언트 장치를 제한합니다.",
       content: [ 
                "1. 추가 버튼을 클릭하십시오.",
                "2.기존 장치 보기를 클릭하고 액세스 장치 목록에서 현재 연결된 장치를 선택하거나, 장치 이름을 입력하고 MAC 주소가 연결되지 않은 장치를 수동으로 추가합니다.",
                "3. 제한이 적용되는 기간을 지정하려면 인터넷 액세스 시간 아이콘을 클릭합니다.",
                "4. 설명 필드에 간단한 설명을 입력합니다. (선택 사항)",
                "5. 상태 사용함을 선택하십시오.",
                "6. OK 버튼을 클릭하십시오."]
} ,{                      
                           type: "paragraph",
                           content: "자녀PC 관리 항목을 수정하거나 삭제하려면, 편집 아이콘을 클릭하여 정보를 편집하거나 쓰레기통 아이콘을 클릭하여 해당 항목을 삭제합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "여러 항목을 삭제하려면 모든 항목을 선택하고 표 상단의 삭제를 클릭합니다."
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"게스트 네트워크",
               CONTENT: [{
                           type: "paragraph",
                           content: "게스트 네트워크는 별도의 무선 네트워크 이름 (SSID)과 손님이 무선 네트워크에 액세스하는 데 사용할 수있는 암호를 사용하여 별도의 네트워크를 설정할 수 있습니다."
                       } ,{                      
                           type: "name",
                           title: "게스트 서로 보일 수 있게",
                           content: "게스트 네트워크에 무선 장치가 서로를 볼 수 있도록하려면 이 확인란을 선택합니다"
                       } ,{                      
                           type: "name",
                           title: "게스트가 로컬 네트워크에 액세스할 수 있도록 허용",
                           content: "게스트 네트워크에 무선 장치를 로컬 네트워크 공유 및 프린터에 액세스 할 수 있도록하려면이 확인란을 선택합니다."
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
                           content: "게스트 네트워크 비밀번호의 업데이트 간격을 선택합니다."
                       } ,{                      
                           type: "name",
                           title: "비밀번호",
                           content: "무작위로 생성된 비밀번호를 사용하거나, 8-63자리 ASCII 문자 또는 16진수(0-9, a-f, A-F) 8-64자리의 비밀번호를 생성합니다."
                       } ,{                      
                           type: "paragraph",
                           content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"TP-Link 클라우드",
               CONTENT: [{
                           type: "paragraph",
                           content: "티피링크 클라우드 서비스는 실시간으로 네트워크를 모니터링하고 인터넷을 이용하여 당신의 디바이스에 접근 하거나 관리를 할 수 ​​있으며 당신이 외부에 있는 경우에도 고급 설정까지 가능합니다. 로그인하여 클라우드 디바이스와 클라우드 계정을 결합시키는 것을 적극적으로 추천합니다"
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
       "" :     ""
    };
})(jQuery);