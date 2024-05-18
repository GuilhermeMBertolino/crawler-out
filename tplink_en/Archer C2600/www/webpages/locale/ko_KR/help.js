(function($){
	$.su = $.su || {};
	$.su.CHAR = $.su.CHAR || {};
	$.su.CHAR.HELP = {
		STATUS_INTERNET: {
			TITLE: "인터넷",
			CONTENT: [{
				type: "paragraph",
				content: "WAN(인터넷) 연결에 대한 관련 정보를 표시합니다."
			},{
				type: "title",
				title: "IPv4",
			},{
				type: "name",
				title: "MAC 주소",
				content: "공유기 WAN 포트에 할당된 물리적 주소. 인터넷(외부 네트워크)에 보이는 주소입니다."
			},{
				type: "name",
				title: "IP 주소",
				content: "현재의 WAN(인터넷)에 할당된 IP 주소. 이 필드는 인터넷에 연결되어 있지 않거나 자동 할당 전이라면 0.0.0.0 또는 빈 값으로 보입니다."
			},{
				type: "name",
				title: "서브넷 마스크",
				content: "이 매개 변수는 네트워크 부분과 호스트 부분의 IP 주소를 결정합니다."
			},{
				type: "name",
				title: "기본 게이트웨이",
				content: "공유기에 현재 할당된 게이트웨이 주소가 표시됩니다."
			},{
				type: "name",
				title: "기본 도메인",
				content: "DNS는 호스트 이름과 인터넷 도메인을 IP 주소로 변경합니다. DNS 서버의 정보는 ISP에 의해 부여됩니다."
			},{
				type: "name",
				title: "연결 유형",
				content: "인터넷(WAN) 포트의 현재 연결 방식."
			},{
				type: "title",
				title: "IPv6",
			},{
				type: "name",
				title: "MAC 주소",
				content: "공유기 WAN 포트에 할당된 물리적 주소. 인터넷(외부 네트워크)에 보이는 주소입니다."
			},{
				type: "name",
				title: "IP 주소",
				content: "현재의 WAN(인터넷)에 할당된 IPv6 주소."
			},{
				type: "name",
				title: "기본 게이트웨이",
				content: "공유기에 현재 할당된 게이트웨이 주소가 표시됩니다."
			},{
				type: "name",
				title: "기본 도메인",
				content: "DNS는 호스트 이름과 인터넷 도메인을 IP 주소로 변경합니다. DNS 서버의 정보는 ISP에 의해 부여됩니다."
			},{
				type: "name",
				title: "연결 유형",
				content: "인터넷(WAN) 포트의 현재 연결 방식."
			}]
		},
		STATUS_WIRELESS: {
			TITLE: "2.4GHz/5GHz/60GHz 무선",
			CONTENT: [{
				type: "paragraph",
				content: "무선관련 설정 정보 및 상태를 확인할 수 있습니다."
			},{
				type: "name",
				title: "네트워크 이름(SSID)",
				content: "무선 네트워크 이름, 또한 SSID(서비스가 정한 식별자)로 알 수 있습니다."
			},{
				type: "name",
				title: "무선 라디오",
				content: "무선 네트워크의 현재 상태(켜짐 또는 꺼짐)"
			},{
				type: "name",
				title: "모드",
				content: "현재 무선 모드."
			},{
				type: "name",
				title: "채널 폭",
				content: "무선 네트워크의 채널 대역폭."
			},{
				type: "name",
				title: "채널",
				content: "현재 무선 채널입니다."
			},{
				type: "name",
				title: "MAC 주소",
				content: "공유기 무선 네트워크 라디오의 MAC 주소."
			},{
				type: "name",
				title: "WDS 상태",
				content: "WDS 모드의 현재 상태(활성화 또는 비활성화)."
			}]
		},
		STATUS_LAN: {
			TITLE: "LAN",
			CONTENT: [{
				type: "paragraph",
				content: "이더넷(LAN) 포트 관련 정보를 확인할 수 있습니다."
			},{
				type: "title",
				title: "IPv4"
			},{
				type: "name",
				title: "MAC 주소",
				content: "공유기 LAN에 할당된 물리적 주소."
			},{
				type: "name",
				title: "IP 주소",
				content: "공유기 LAN에 할당된 IPv4 주소"
			},{
				type: "name",
				title: "서브넷 마스크",
				content: "이 매개 변수는 네트워크 부분과 호스트 부분의 IP 주소를 결정합니다."
			},{
				type: "name",
				title: "DHCP",
				content: "공유기에 내장된 DHCP 서버가 LAN 포트에 연결된 장치에 대해 활성 상태인지에 대한 여부를 표시합니다."
			},{
				type: "title",
				title: "IPv6"
			},{
				type: "name",
				title: "MAC 주소",
				content: "공유기 LAN에 할당된 물리적 주소."
			},{
				type: "name",
				title: "IP 주소",
				content: "공유기 LAN에 할당된 IPv6 주소"
			},{
				type: "name",
				title: "링크 로컬 주소",
				content: "LAN 인터페이스의 IPv6 링크 주소"
			},{
				type: "name",
				title: "할당 유형",
				content: "LAN 인터페이스 IPv6 주소의 유형"
			}]
		},
		STATUS_GUEST: {
			TITLE: "게스트 네트워트 2.4GHz/5GHz",
			CONTENT: [{
				type: "paragraph",
				content: "게스트 무선 네트워크에 대한 정보를 표시합니다."
			},{
				type: "name",
				title: "네트워크 이름(SSID)",
				content: "게스트 네트워크의 무선 네트워크 이름(SSID)입니다."
			},{
				type: "name",
				title: "SSID 숨기기",
				content: "게스트 네트워크의 무선 네트워크 이름(SSID)을 숨길지 아닐지 표시합니다."
			},{
				type: "name",
				title: "무선 라디오",
				content: "게스트 네트워크의 현재 상태(켜짐 또는 꺼짐)"
			},{
				type: "name",
				title: "게스트 서로 보일 수 있게",
				content: "게스트 네트워크 모든 기기 간 서로 통신이 가능한지 아닌지 표시합니다."
			}]
		},
		STATUS_USB: {
			TITLE: "USB 설정",
			CONTENT: [{
				type: "paragraph",
				content: "현재 USB 저장 장치의 정보를 표시하고 /또는 공유기 USB 포트에 연결된 프린터의 정보를 표시합니다."
			},{
				type: "name",
				title: "프린터",
				content: "연결된 프린터의 이름"
			},{
				type: "name",
				title: "USB 디스크",
				content: "공유기에 연결된 USB 디스크 이름"
			},{
				type: "name",
				title: "합계",
				content: "연결된 USB 저장 장치의 저장용량 합계."
			},{
				type: "name",
				title: "내장 공간",
				content: "연결된 USB 저장 장치의 사용 가능한 저장용량."
			}]
		},
		STATUS_PERFORMANCE: {
			TITLE: "성능",
			CONTENT: [{
				type: "paragraph",
				content: "현재 공유기의 성능을 표시합니다."
			},{
				type: "name",
				title: "CPU 로드",
				content: "현재 CPU 사용상태."
			},{
				type: "name",
				title: "메모리 사용",
				content: "현재 메모리 사용 상태."
			}]
		},
		STATUS_WIRED: {
			TITLE: "유선 클라이언트",
			CONTENT: [{
				type: "paragraph",
				content: "현재 네트워크에 연결된 모든 유선 기기의 정보를 표시합니다."
			}]
		},
		STATUS_WIRELESS_CLIENTS: {
			TITLE: "무선 클라이언트",
			CONTENT: [{
				type: "paragraph",
				content: "현재 네트워크에 연결된 모든 무선 기기의 정보를 표시합니다."
			}]
		},
		
		INTERNET_INTERNET: {
			TITLE: "IPv4",
			CONTENT: [{
				type: "title",
				title: "인터넷 회선 유형: 고정IP"
			},{
				type: "paragraph",
				content: "인터넷 회선 제공업체로부터 고정IP 주소, 서브넷 마스크,게이트웨이,DNS 설정 값을 제공받았다면, 고정 IP를 선택하십시오."
			},{
				type: "name",
				title: "IP 주소/서브넷 마스크/기본 게이트웨이/기본 DNS/보조 DNS",
				content: "ISP가 제공하는 정보를 입력합니다."
			},{
				type: "name",
				title: "MTU 크기(바이트단위)",
				content: "일반적인 MTU(Maximum Transmission Unit) 값은 1500바이트 입니다. 일부 인터넷 회선 업체의 경우 MTU 값의 변경이 요구될 수 있습니다. 이는 드문 경우이지만, 필요하다고 판단되는 경우에만 인터넷 회선 제공업체 확인 후 변경하시기 바랍니다."
			},{
				type: "title",
				title: "인터넷 회선 유형: 동적IP"
			},{
				type: "paragraph",
				content: "인터넷 회선 제공업체로부터 DHCP 서버 연결을 제공받는다면, 이 유형을 선택하십시오."
			},{
				type: "name",
				title: "IP 주소/서브넷 마스크/기본 게이트웨이/기본 DNS/보조 DNS",
				content: "이 항목은 인터넷 회선 제공업체의 DHCP 서버로부터 자동으로 할당됩니다."
			},{
				type: "name",
				title: "갱신",
				content: "버튼을 클릭하면 인터넷 회선 제공업체로부터 새로운 IP 주소 정보를 받습니다."
			},{
				type: "name",
				title: "해제",
				content: "버튼을 클릭하면 현재 IP 주소 사용정보를 해제합니다."
			},{
				type: "name",
				title: "만약 인터넷 회선 업체가 제공하는 DNS 주소 이외의 값으로 수동 설정이 필요한 경우, 다음 DNS 서버를 사용하십시오를 선택하고 기본 DNS와 보조 DNS에 새로운 값을 입력하십시오. 이 항목을 선택하지 않으면 DNS 서버는 자동으로 할당됩니다.",
				content: "인터넷 회선 제공업체가 하나 또는 두 DNS 주소를 제공한다면, 이 확인란을 선택하고 기본 DNS 주소와 보조 DNS 주소를 해당 입력 필드에 입력합니다. 그렇지 않으면, DNS 주소가 인터넷 회선 제공업체에 의해 동적으로 할당됩니다.  "
			},{
				type: "name",
				title: "MTU 크기(바이트단위)",
				content: "일반적인 MTU(Maximum Transmission Unit) 값은 1500바이트 입니다. 일부 인터넷 회선 업체의 경우 MTU 값의 변경이 요구될 수 있습니다. 이는 드문 경우이지만, 필요하다고 판단되는 경우에만 인터넷 회선 제공업체 확인 후 변경하시기 바랍니다."
			},{
				type: "name",
				title: "호스트 이름",
				content: "이 옵션은 공유기의 호스트 이름을 지정합니다."
			},{
				type: "name",
				title: "유니캐스트 DHCP로 IP 가져오기",
				content: "일부 인터넷 회선 업체의 DHCP 서버는 브로드캐스트 방식을 사용하지 않습니다. 만약, IP 주소를 정상적으로 할당받지 못한다면 이 옵션을 선택할 수 있습니다.(단, 일반적으로 이 옵션은 많이 사용되지 않습니다.)"
			},{
				type: "title",
				title: "인터넷 회선 유형: PPPoE"
			},{
				type: "paragraph",
				content: "인터넷 회선 제공업체로 부터 DSL(Digital Subscriber Line)를 받고있다면 PPPoE옵션을 선택하십시오."
			},{
				type: "name",
				title: "사용자 이름/비밀번호",
				content: "인터넷 서비스 제공 희사 ISP에서 제공하는 사용자 이름과 비밀번호를 입력합니다."
			},{
				type: "name",
				title: "IP 주소/기본 DNS/보조 DNS",
				content: "인터넷 회선 제공업체의DHCP 서버에서 자동으로 할당됩니다."
			},{
				type: "name",
				title: "보조 연결(사용안함, 동적 IP, 고정 IP)",
				children: [{
					type: "name",
					title: "사용안함",
					content: "이 보조연결은 기본값으로 비활성화되어 있으며, 특별히 보조 연결 수단이 없을 경우 이 설정을 권장합니다."
				},{
					type: "name",
					title: "동적 IP",
					content: "IP 주소와 서브넷 마스크는 ISP에 의해 자동으로 할당하는 경우에 선택합니다.",
					children: [{
						type: "name",
						title: "갱신",
						content: "버튼을 클릭하면 인터넷 회선 제공업체로부터 새로운 IP 주소 정보를 받습니다."
					},{
						type: "name",
						title: "해제",
						content: "버튼을 클릭하면 현재 IP 주소 사용정보를 해제합니다."
					}]
				},{
					type: "name",
					title: "고정 IP",
					content: "IP 주소와 서브넷 마스크가 ISP에 의해 제공되는 경우에 선택하고, 이 정보를 해당 필드에 입력합니다."
				}]
			},{
				type: "name",
				title: "MTU 크기(바이트단위)",
				content: "일반적인 이더넷 네트워크를 위한 MTU(Maximum Transmission Unit) 값이 1480바이트 입니다.",
				children: [{
					type: "note",
					title: "주의",
					content: "주의: 일부 인터넷 회선 제공업체의 경우 MTU 값의 변경이 요구될 수 있습니다. 이는 드문 경우이지만, 필요하다고 판단되는 경우에만 인터넷 회선 제공업체 확인 후 변경하시기 바랍니다."
				}]
			},{
				type: "name",
				title: "서비스 이름/Access Concentrator 이름",
				content: "초기 설정으로 서비스의 이름과 Access Concentrator(AC)의 이름은 비어있습니다. 특별히 인터넷 회선 제공업체로부터 요구되지 않는다면 설정하지 마십시오."
			},{
				type: "name",
				title: "온라인 간격 탐지",
				content: "공유기가 액세스 컨센트레이터를 탐지하는 시간 간격을 0부터 120(초 단위) 사이의  값으로 입력합니다. 기본값은 10입니다."
			},{
				type: "name",
				title: "IP 주소",
				content: "인터넷 회선 제공업체에서 특정(고정) IP 주소를 제공한다면, 다음의 IP 주소를 사용해 IP 주소값을 입력하거나 인터넷 회선 제공업체의 IP 주소를 서버로부터 자동으로 할당받을 수 있는 동적 IP를 선택하십시오."
			},{
				type: "name",
				title: "DNS 주소/기본 DNS/보조 DNS",
				content: "인터넷 서비스 제공자가 특정(고정)된 DNS IP 주소를 제공한다면  “다음 DNS 서버 주소 사용”을 선택하고 각각 기본 설정 DNS 서버와 보조 DNS 서버에 주소를 입력합니다. 특정된 DNS IP 주소를 제공하지 않은 경우 , \"자동으로 DNS 서버 주소 받기\"를 선택하여 자동으로 서버에 할당 된 DNS의 IP 주소를 받습니다. "
			},{
				type: "name",
				title: "연결 모드",
				content: "인터넷 연결을 위한 적합한 연결 모드를 선택하십시오.",
				children: [{
					type: "name",
					title: "자동",
					content: "공유기가 연결이 끊긴 후 자동으로 연결합니다."
				},{
					type: "name",
					title: "요구시 연결",
					content: "사용자는 지정된 시간 동안(최대 유휴 시간) 인터넷 연결 유지한 후 인터넷 연결을 끊도록 공유기를 설정할 수 있습니다. 만일 사용자의 인터넷 활동이 존재하지 않아 그 연결이 끊겼다면 요구시 연결 은 사용자가 인터넷을 다시 사용하려고할 경우 공유기는 자동으로 사용자의 연결을 재연결 될 수 있도록 합니다. 만일 사용자의 인터넷을 상시 연결상태로 두고 싶다면, 최대 유휴 시간 필드에 0을 입력하십시오. 그렇지 않으면, 사용자 인터넷 연결이 끊어지기까지 유지되는 시간을 입력하십시오."
				},{
					type: "name",
					title: "시간 기반 연결",
					content: "사용자는 시간을 기반으로 공유기가 연결하거나 연결을 끊도록 구성할 수 있습니다. 시간의 주기 필드에 연결을 위한 시작 시간을 HH-MM 형식으로 입력하고, 연결 차단을 위한 종료 시간을 HH-MM 형식으로 입력합니다."
				},{
					type: "name",
					title: "수동으로 연결",
					content: "사용자는 공유기의 연결을 수동으로 관리할 수 있습니다. 일정 시간(최대 유휴 시간)동안 인터넷이 사용되지 않으면 공유기는 사용자의 인터넷 연결을 끊고 사용자가 수동으로 재연결을 하기 전까지는 인터넷 연결이 되지 않습니다. 이 옵션을 사용하려면 \"수동으로 연결\" 라디오 버튼을 클릭하십시오. 만일 사용자의 인터넷을 상시 연결상태로 두고 싶다면, 최대 유휴 시간 필드에 0을 입력하십시오. 그렇지 않으면, 사용자 인터넷 연결이 끊어지기까지 소요되는 시간을 분단위로 입력하십시오."
				},{
					type: "note",
					title: "주의",
					content: "주의: 사용자가 시스템 도구 -> 시간 설정 페이지에서 시스템 시간을 설정했을 때만, 시간-기반 연결 기능이 구동할 수 있습니다."
				}]
			},{
				type: "title",
				title: "인터넷 회선 유형: BigPond Cable",
				id: "BigPond"
			},{
				type: "paragraph",
				content: "인터넷 회선 제공업체로 부터 BigPond 케이블 서비스를 받고 있다면, BigPond 케이블 옵션을 선택하십시오.",
				id: "BigPond_desc"
			},{
				type: "name",
				title: "사용자 이름/비밀번호",
				content: "인터넷 서비스 제공 희사 ISP에서 제공하는 사용자 이름과 비밀번호를 입력합니다.",
				id: "BigPond_name"
			},{
				type: "name",
				title: "인증 서버",
				content: "인증 서버 IP 주소 또는 호스트 이름을 입력하십시오.",
				id: "BigPond_server"
			},{
				type: "name",
				title: "인증 도메인",
				content: "사용자 위치에 따라 도메인 접미사 서버 이름을 입력하십시오. 예: NSW/ACT nsw.bigpond.net.au VIC/TAS/WA/SA/NT vic.bigpond.net.au QLD qld.bigpond.net.au",
				id: "BigPond_domain"
			},{
				type: "name",
				title: "MTU 크기(바이트단위)",
				content: "일반적인 MTU(Maximum Transmission Unit) 값은 1500바이트 입니다. 일부 인터넷 회선 업체의 경우 MTU 값의 변경이 요구될 수 있습니다. 이는 드문 경우이지만, 필요하다고 판단되는 경우에만 인터넷 회선 제공업체 확인 후 변경하시기 바랍니다.",
				id: "BigPond_mtu"
			},{
				type: "name",
				title: "연결 모드",
				content: "인터넷 연결을 위한 적합한 연결 모드를 선택하십시오.",
				id: "BigPond_mode",
				children: [{
					type: "name",
					title: "자동",
					content: "공유기가 연결이 끊긴 후 자동으로 연결합니다."
				},{
					type: "name",
					title: "요구시 연결",
					content: "사용자는 지정된 시간 동안(최대 유휴 시간) 인터넷 연결 유지한 후 인터넷 연결을 끊도록 공유기를 설정할 수 있습니다. 만일 사용자의 인터넷 활동이 존재하지 않아 그 연결이 끊겼다면 요구시 연결 은 사용자가 인터넷을 다시 사용하려고할 경우 공유기는 자동으로 사용자의 연결을 재연결 될 수 있도록 합니다. 만일 사용자의 인터넷을 상시 연결상태로 두고 싶다면, 최대 유휴 시간 필드에 0을 입력하십시오. 그렇지 않으면, 사용자 인터넷 연결이 끊어지기까지 유지되는 시간을 입력하십시오."
				},{
					type: "name",
					title: "수동으로 연결",
					content: "사용자는 공유기의 연결을 수동으로 관리할 수 있습니다. 일정 시간(최대 유휴 시간)동안 인터넷이 사용되지 않으면 공유기는 사용자의 인터넷 연결을 끊고 사용자가 수동으로 재연결을 하기 전까지는 인터넷 연결이 되지 않습니다. 이 옵션을 사용하려면 \"수동으로 연결\" 라디오 버튼을 클릭하십시오. 만일 사용자의 인터넷을 상시 연결상태로 두고 싶다면, 최대 유휴 시간 필드에 0을 입력하십시오. 그렇지 않으면, 사용자 인터넷 연결이 끊어지기까지 소요되는 시간을 분단위로 입력하십시오."
				}]
			},{
				type: "title",
				title: "인터넷 회선 유형: L2TP/PPTP"
			},{
				type: "paragraph",
				content: "인터넷 회선 제공업체로 부터 L2TP 서비스를 받고 있다면, L2TP 옵션을 선택하십시오."
			},{
				type: "name",
				title: "사용자 이름/비밀번호",
				content: "인터넷 서비스 제공 희사 ISP에서 제공하는 사용자 이름과 비밀번호를 입력합니다."
			},{
				type: "name",
				title: "IP 주소/기본 DNS/보조 DNS",
				content: "이 항목은 인터넷 회선 제공업체의 DHCP 서버로부터 자동으로 할당됩니다."
			},{
				type: "name",
				title: "보조 연결 (동적 IP 또는 고정 IP)",
				children: [{
					type: "name",
					title: "동적 IP",
					content: "IP 주소와 서브넷 마스크는 ISP에 의해 자동으로 할당하는 경우에 선택합니다."
				},{
					type: "name",
					title: "고정 IP",
					content: "IP 주소, 서브넷 마스크, 게이트웨이 및 DNS 주소가 ISP에서 제공하는 경우에 선택하고, 해당 필드에 이 정보를 입력합니다."
				}]
			},{
				type: "name",
				title: "VPN 서버 IP/도메인 이름",
				content: "ISP에서 제공하는 VPN 서버의 IP 주소 또는 도메인 이름을 입력합니다."
			},{
				type: "name",
				title: "MTU 크기(바이트단위)",
				content: "대부분의 이더넷 네트워크의  기본 및 전형적인 MTU(최대송신단위) 크기는 L2TP의 경우 1460 바이트, PPTP의 경우 1420 바이트입니다. ISP가 요구하는 경우가 아니면, 기본 MTU 크기를 변경하지 말 것을 권장합니다."
			},{
				type: "name",
				title: "연결 모드",
				content: "인터넷 연결을 위한 적합한 연결 모드를 선택하십시오.",
				children: [{
					type: "name",
					title: "자동",
					content: "공유기가 연결이 끊긴 후 자동으로 연결합니다."
				},{
					type: "name",
					title: "요구시 연결",
					content: "사용자는 지정된 시간 동안(최대 유휴 시간) 인터넷 연결 유지한 후 인터넷 연결을 끊도록 공유기를 설정할 수 있습니다. 만일 사용자의 인터넷 활동이 존재하지 않아 그 연결이 끊겼다면 요구시 연결 은 사용자가 인터넷을 다시 사용하려고할 경우 공유기는 자동으로 사용자의 연결을 재연결 될 수 있도록 합니다. 만일 사용자의 인터넷을 상시 연결상태로 두고 싶다면, 최대 유휴 시간 필드에 0을 입력하십시오. 그렇지 않으면, 사용자 인터넷 연결이 끊어지기까지 유지되는 시간을 입력하십시오."
				},{
					type: "name",
				title: "수동으로 연결",
				content: "사용자는 공유기의 연결을 수동으로 관리할 수 있습니다. 일정 시간(최대 유휴 시간)동안 인터넷이 사용되지 않으면 공유기는 사용자의 인터넷 연결을 끊고 사용자가 수동으로 재연결을 하기 전까지는 인터넷 연결이 되지 않습니다. 이 옵션을 사용하려면 \"수동으로 연결\" 라디오 버튼을 클릭하십시오. 만일 사용자의 인터넷을 상시 연결상태로 두고 싶다면, 최대 유휴 시간 필드에 0을 입력하십시오. 그렇지 않으면, 사용자 인터넷 연결이 끊어지기까지 소요되는 시간을 분단위로 입력하십시오."
				}]
			},{
				type:"paragraph",
				content:"입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		INTERNET_MAC: {
			TITLE: "MAC 클론",
			CONTENT: [{
				type: "name",
				title: "초기 MAC 주소 사용",
				content: "ISP가 MAC 주소에 할당된 IP 주소를 바인딩 하지 않는 경우 공유기의 기본 MAC 주소를 변경하지 마십시오."
			},{
				type: "name",
				title: "컴퓨터 MAC 주소 사용",
				content: "인터넷 서비스 제공업체가 사용자의 랜카드의 MAC 주소 등록을 요청했을 경우, 공유기에 연결된 컴퓨터의 현재 MAC 주소하기를 선택하십시오."
			},{
				type: "name",
				title: "사용자 PC의 MAC 주소",
				content: "인터넷 서비스 제공업체가 특정 MAC 주소에 IP 주소를 할당하는 경우, 수동으로 MAC 주소를 입력하십시오."
			},{
				type:"paragraph",
				content:"입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},

		LAN_IPV4: {
			TITLE: "LAN",
			CONTENT: [{
				type: "name",
				title: "MAC 주소",
				content: "공유기 LAN에 할당된 물리적 주소."
			},{
				type: "name",
				title: "IP 주소",
				content: "공유기의 기본 IP 주소. 이는 공유기의 웹 관리 페이지에 로그인하는데 사용되고 변경이 가능합니다."
			},{
				type: "name",
				title: "서브넷 마스크",
				content: "내부 및 외부 트래픽을 라우트하기 위해 LAN 포트에 사용되는 할당된 식별자를 드롭다운 리스트에서 선택하거나, 새 서브넷 마스크를 점 십진수 표기법으로 입력합니다."
			},{
				type: "note",
				title: "주의",
				content: "주의: 만약 사용자가 LAN IP 주소를 변경할 경우, 라우터에 로그인 하려면 새 IP 주소를 사용해야 합니다. 사용자가 설정한 새 LAN IP 주소가 이전과 같은 서브넷에 있지 않으면, DHCP 서버의 IP 주소는 자동으로 구성되지만, 포트 포워딩 및 DMZ 호스트 주소는 자동으로 재구성 되지 않습니다."
			},{
				type:"paragraph",
				content:"입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		IPTV:{
			TITLE: "설정",
			CONTENT: [{
					type: "name",
					title: "IGMP 프록시",
					content: "IGMP를 통해 TV를 시청 하시려면 이 기능을 사용 하시면 됩니다. 인터넷 회선 제공 업체에 따라 V2 또는 V3의 IGMP 프록시의 버전을 선택하십시오."
				},{
					type: "name",
					title: "IGMP 버전",
					content: "ISP에 따라, V2 또는 V3의 IGMP 프록시 버전을 선택합니다."
				},
				{
					type: "name",
					title: "IPTV",
					content: "IPTV 기능 할성화를 위해 선택하십시오."
				},
				{
					type: "name",
					title: "모드",
					content: "사용자의 인터넷 회선 제공업체에 따라 적절한 모드를 선택하십시오. IPTV에는 6가지의 모드가 있습니다.",
					children: [
						{
							type: "name",
							title: "브리지",
							content:"해당 메뉴에서 브리지 LAN 포트를 직접 구성할 수 있으며, KT IPTV를 이용하시는 고객님의 경우 브리지 기능을 통해 IPTV를 원활하게 시청하실 수 있습니다.",
							children:[{
								type: "name",
								title: "LAN1/2/3/4",
								content: "인터넷 회선 제공업체 또는 IPTV 업체에 해당하는 기능 유무에 따라 LAN 포트를 할당합니다."
							}]
						},
						{
							type: "name",
							title: "러시아",
							content: "ISP가 러시아거나 필요한 매개 변수가 소정인 경우 선택합니다. 필요한 매개 변수는 인터넷/IP 전화/IPTV VLAN 아이디와 우선권 그리고 LAN(1/2/3/4) 포트 특징을 포함합니다. ",
							children: [{
								type: "name",
								title: "IPTV 멀티캐스트 VLAN ID/Priority",
								content: "인터넷 회선 제공업체에 따라 IPTV의 멀티캐스트 기능을 활성화해, VLAN ID와 Priority를 설정할 수 있습니다."
							}]
						},
						{
							type: "name",
							title: "싱가포르 ExStream",
							content: "싱가포르의 ExStream 인터넷 회선 제공업체를 이용 중이거나, 인터넷/IPTV VLan IDs/Priority, LAN(1/2/3/4) 포트 기능을 포함하는 필수값이 정해져 있는 경우, 선택해 주십시오."
						},
						{
							type: "name",
							title: "말레이시아 Unifi",
							content: "말레이시아의 Unifi 인터넷 회선 제공업체를 이용 중이거나, 인터넷/IPTV VLAN IDs/Priority, LAN(1/2/3/4) 포트 기능을 포함하는 필수값이 정해져 있는 경우, 선택해 주십시오."
						},
						{
							type: "name",
							title: "말레이시아 Maxis",
							content: "말레이시아의 Maxis 인터넷 회선 제공업체를 이용 중이거나, 인터넷/VoIP/IPTV VLAN IDs/Priority, LAN(1/2/3/4) 포트 기능을 포함하는 필수값이 정해져 있는 경우, 선택해 주십시오."
						},
						{
							type: "name",
							title: "커스텀",
							content: "목록에 없는 인터넷 회선 제공업체를 이용 중이지만 인터넷/VoIP/IPTV VLAN IDs/Priority, LAN(1/2/3/4) 포트 기능을 포함하는 필수값이 정해져 있는 경우, 선택해 주십시오.",
							children: [{
								type: "name",
								title: "인터넷/IP-전화기/IPTV VLAN ID/Priority",
								content: "인터넷 회선 제공업체가 제공한 VLAN IDs와 우선순위를 구성합니다."
							},{
								type: "name",
								title: "802.11Q 태그",
								content: "802.11Q 인터넷 패킷의 태그 여부를 위해 선택해 주십시오."
							},{
								type: "name",
								title: "IPTV 멀티캐스트 VLAN ID/Priority",
								content: "인터넷 회선 제공업체에 따라 IPTV의 멀티캐스트 기능을 활성화해, VLAN ID와 Priority를 설정할 수 있습니다."
							},{
								type: "name",
								title: "LAN1/2/3/4",
								content: "LAN 포트를 인터넷 공급업체의 기능으로 할당하거나 IP폰 공급업체 또는 IPTV 공급업체의 기능으로 할당합니다."
							}]
						}
					]
				},{
					type:"paragraph",
					content:"입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
				}
			]
		},

		DHCP_SERVER_SETTINGS: {
			TITLE: "설정",
			CONTENT: [{
				type: "name",
				title: "DHCP 서버",
				content: "서버 기능의 사용 여부를 설정합니다. 사용함 또는 사용안함 중 선택하십시오. 만일 사용자가 서버를 사용안함으로 설정할 경우 사용자 네트워크 상에 또 다른 DHCP 서버가 있거나 그렇지 않으면 컴퓨터의 IP 주소를 수동으로 설정해야 합니다."
			},{
				type: "name",
				title: "시작 IP 주소",
				content: "클라이언트에게 임대할 수 있는 IP 주소의 범위를 입력하십시오."
			},{
				type: "name",
				title: "주소 임대 시간",
				content: "IP 주소가 클라이언트한테 임대하는 시간을 입력합니다. 시간은 2분과 2880분 사이여야 하고 내정값은 120분입니다. "
			},{
				type: "name",
				title: "기본 게이트웨이",
				content: "(선택 사항) LAN IP 주소를 입력하십시오."
			},{
				type: "name",
				title: "기본 도메인",
				content: "(선택 사항) 사용자 네트워크의 도메인 이름을 입력하십시오."
			},{
				type:"paragraph",
				content:"입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		RESERVED_IP_ADDRESS: {
			TITLE: "주소 예약",
			CONTENT: [{
				type: "paragraph",
				content: "공유기에 연결할 클라이언트의 IP 주소를 수동으로 예약 지정할 수 있습니다. 예약된 경우, IP 주소는 DHCP 서버에의해 동일한 클라이언트에게만 할당됩니다."
			},{
				type: "name",
				title: "MAC 주소",
				content: "DHCP서버에 예약된 IP 주소 클라이언트의 MAC 주소"
			},{
				type: "name",
				title: "예약된 IP 주소",
				content: "이 장치가 DHCP 클라이언트에 예약한 IP 주소"
			},{
				type: "name",
				title: "설명",
				content: "클라이언트 기기의 종류"
			},{
				type: "name",
				title: "상태",
				content: "클라이언트 기기의 현재 상태(활성/비활성)"
			},{
				type: "name",
				title: "수정",
				content: "해당 클라이언트의 수정 또는 삭제를 위한 옵션"
			},{
				type: "step",
				title: "IP 주소 예약하기",
				content:[
					"1. 추가 버튼을 클릭하십시오.",
					"2. 클라이언트의 MAC 주소를 입력하십시오.",
					"3. 클라이언트의 IP 주소 입력하십시오.",
					"4. 클라이언트에 대한 상세설명을 입력하십시오.",
					"5. 상태 사용함을 선택하십시오.",
					"6. OK 버튼을 클릭하십시오."
				]
			},{
				type: "step",
				title: "현재 이용중인 클라이언트 수정 또는 삭제하기",
				content: "이 표에서, 상태 수정을 원하는 클라이언트에 대해 편집 또는 삭제버튼을 클릭하십시오."
			}]
		},

		DHCP_CLIENT_LIST: {
			TITLE: "DHCP 클라이언트 목록",
			CONTENT: [{
				type: "name",
				title: "클라이언트 숫자",
				content: "할당된 DHCP 클라이언트의 번호"
			},{
				type: "name",
				title: "클라이언트 이름",
				content: "DHCP 클라이언트의 이름"
			},{
				type: "name",
				title: "MAC 주소",
				content: "DHCP 클라이언트의 MAC 주소"
			},{
				type: "name",
				title: "할당된 IP",
				content: "이 장치가 DHCP 클라이언트에게 할당한 IP 주소"
			},{
				type: "name",
				title: "임대 시간",
				content: "클라이언트에게 임대된 IP 주소의 남아있는 시간"
			},{
				type: "name",
				title: "새로고침",
				content: "DHCP 클라이언트 목록의 새로운 정보를 조회하려면 새로고침 버튼을 클릭하십시오."
			}]
		},

		DDNS: {
			TITLE: "동적 DNS",
			CONTENT: [{
				type: "paragraph",
				content: "동적 DNS는 동적 인터넷 IP 주소에 고정 된 호스트 및 도메인 이름을 지정할 수 있습니다. 웹 사이트, FTP 서버 또는 공유기 뒤의 다른 서버를 호스팅 할 때 유용합니다. 우선, dyn.com과 같은 동적 DNS 서비스 제공자에 가입해야 합니다."
			},{
				type: "step",
				title: "동적 DNS 설정하기",
				content: [
					"1. DDNS 서비스 제공자 선택하십시오.",
					"2. 사용자의 DDNS 계정의 사용자 이름과 비밀번호를 입력하십시오.",
					"3. 동적 DNS 서비스 제공자로부터 받은 도메인 이름을 입력하십시오.",
					"4. 드롭다운 리스트로부터 새로받은 간격을 선택하십시오.",
					"5. 로그인을 클릭하고 저장 버튼을 클릭하십시오."
				]
			},{
				type: "paragraph",
				content: "성공적으로 로그인 한 후 다른 계정으로 다시 로그인하려고 할 경우, 우선 로그아웃 버튼을 클릭 한 후, 사용자의 새 사용자 이름과 비밀번호를 입력하고 로그인 버튼을 클릭하십시오."
			}]
		},


		ADVANCED_ROUTING_STATIC_ROUTING: {
			TITLE: "고정 라우팅",
			CONTENT: [{
				type: "paragraph",
				content: "고정 라우트는 특정한 호스트나 네트워크에 도달하기 위해서 사전에 정해진 경로 정보를 의미합니다."
			},{
				type: "step",
				title: "고정 라우팅 설정하기",
				content: [
					"1. 추가를 클릭합니다.",
					"2. 네트워크 목적지 - 이 항목에 고정 라우트를 할당하기 위해 IP 주소를 도트 십진수 표기법으로 입력합니다.",
					"3. 서브넷 마스크 - IP 주소의 네트워크 부분과 호스트 부분을 결정하기 위헤 서브넷 마스크를 도트 십진수 표기법으로 입력합니다.",
					"4. 기본 게이트웨이 - 공유기를 네트워크 또는 호스트에 연결하기 위해 게이트웨이 IP 주소를 도트 십진수 표기법으로 입력합니다.",
					"5. 인터페이스 - 목적 IP 주소타입에 따라 LAN 또는 WAN을 선택하십시오.",
					"6. 최종경로 - 이 항목에 대한 간략한 최종 경로 정보를 입력하십시오.",
					"7. 활성화 버튼을 선택하십시오.",
					"8. OK 버튼을 클릭하십시오."
				]
			},{
				type: "step",
				title: "기존 항목을 수정하거나 삭제하기",
				content: "테이블에서,  수정하거나 삭제하려는 항목에 해당하는 편집 아이콘 또는 쓰레기통 아이콘을 클릭하십시오."
			}]
		},
		
		ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE: {
			TITLE: "시스템 라우팅 테이블",
			CONTENT: [{
				type: "paragraph",
				content: "시스템 라우팅 테이블은 사용 중인 모든 유효한 라우트 항목을 보여줍니다. 목적지 IP 주소, 서브넷 마스크, 게이트웨이 그리고 인터페이스가 각 항목마다 표시됩니다."
			},{
				type: "paragraph",
				content: "표시된 데이터를 갱신하려면 새로 고침 버튼을 클릭하십시오."
			}]
		},
		
		WIRELESS_REGION: {
			TITLE: "설정",
			CONTENT: [{
				type: "name",
				title: "지역",
				content: "아래 메뉴에서 사용자의 해당 국가를 선택하십시오. 만약 목록에 없다면 해당 국가에서는 무선 사용이 제안되었을 수 있습니다."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		WIRELESS_24G: {	
			TITLE: "무선 2.4GHz",
			CONTENT: [{
				type: "name",
				title: "무선 라디오 사용함",
				content: "이 옵션을 선택하여 2.4GHz 무선 라디오 주파수를 사용합니다. 이 옵션을 선택하지 않은 경우, WPS 기능은 이 대역에서 지원되지 않습니다. "
			},{
				type: "name",
				title: "무선 네트워크 이름 (SSID)",
				content: "무선 신호 이름을 최대 32자의 문자열로 지정합니다. 같은 이름 (SSID) 네트워크의 모든 무선 장치에 할당해야합니다."
			},{
				type: "name",
				title: "SSID 숨기기",
				content: "Wi-Fi 네트워크 목록에서 2.4GHz 네트워크 이름 (SSID)을 숨기려면이 옵션을 선택합니다. 이 옵션을 선택하는 경우, WPS 기능은 이 대역에서 지원되지 않습니다."
			},{
				type: "name",
				title: "보안",
				content: "다음 중 하나의 보안 옵션을 선택해 주십시오.",
				children: [{
					type: "name",
					title: "비활성화 보안",
					content: "무선 보안 기능을 사용하지 않게 설정합니다. 보안을 사용하지 않을 경우 주변 무선 장치는 암호화 없이 바로 공유기에 접속 가능합니다. 보안을 위해서 사용자는 다음 중 하나의 옵션을 선택할 것을 적극 권장합니다."
				},{
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
						},{
							type: "name",
							title: "WPA-PSK",
							content: "이 옵션은 안전성을 보장합니다. 이 옵션을 선택하는 경우, WPS 기능은 이 대역에서 지원되지 않습니다. "
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "이 옵션은 WPA-PSK보다 높은 수준의 보안을 제공하며 사용이 권장됩니다."
						}]
					},{
						type: "name",
						title: "암호화",
						content: "보안 암호화 유형을 선택합니다. 보안 암호화 유형은 TKIP (임시 키 무결성 프로토콜), AES(고급 암호화 표준) 또는 자동 (TKIP 및 AES)을 포함합니다. TKIP 암호화는 802.11n 사양에 의해 지원되지 않기 때문에 공유기가 802.11n 모드에서 작동할 때 TKIP 암호화를 사용하지 않는 것을 권장합니다. TKIP를 선택하는 경우, WPS 기능은 이 대역에서 지원되지 않습니다. "
					},{
						type: "name",
						title: "비밀번호",
						content: "사용자는 ASCII 또는 16진수 문자를 입력할 수 있습니다. 16진수의 경우 그 길이가 8자와 64자 사이여야 하고, ASCII의 경우 그 길이가 8자와 63자 사이여야 합니다."
					}]
				},{
					type: "name",
					title: "WPA/WPA2-기업",
					content: "RADIUS (원격 인증 전화 접속 사용자 서비스) 서버를 사용한 고급 인증 방법을 사용하려면 이 옵션을 선택합니다. 이 옵션을 선택하는 경우, WPS 기능은 이 대역에서 지원되지 않습니다.",
					children: [{
						type: "name",
						title: "버전",
						content: "사용자는 다음 중 하나의 버전을 선택할 수 있습니다,",
						children:[{
							type: "name",
							title: "자동",
							content: "무선 장치의 기능과 요청에 따라 자동으로 WPA 또는 WPA2을 선택합니다"
						},{
							type: "name",
							title: "WPA",
							content: "이 옵션은 높은 수준의 보안을 제공합니다."
						},{
							type: "name",
							title: "WPA2",
							content: "이 옵션은 WPA-PSK보다 높은 수준의 보안을 제공하며 사용이 권장됩니다."
						}]
					},{
						type: "name",
						title: "암호화",
						content: "보안 암호화 유형을 선택해 주십시오: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), 또는 자동 (for both TKIP and AES). 공유기가 802.11n 모드로 사용 중일 경우에는 TKIP 암호화 사용이 권장되지 않습니다. TKIP방식이 802.11n을 지원하지 않기 때문입니다."
					},{
						type: "name",
						title: "RADIUS 서버 IP",
						content: "RADIUS 서버의 IP 주소를 입력합니다."
					},{
						type: "name",
						title: "RADIUS 포트",
						content: "RADIUS 서버의 포트 번호를 입력합니다."
					},{
						type: "name",
						title: "RADIUS 비밀번호",
						content: "RADIUS 서버의 비밀번호를 입력합니다."
					}]
				},{
				type: "name",
				title: "WEP",
				content: "클라이언트 장치가 WEP (유선 동등한 개인 정보 보호)를 이용할 때만 무선에 접근할 수있는 경우, 이 옵션을 선택하여 기본 인증 방법을 활성화합니다. 이 옵션을 선택하는 경우, WPS 기능은이 대역에서 지원되지 않습니다.",
				children: [{
					type: "name",
					title: "타입",
					content: "다음 타입 중 하나를 선택할 수 있습니다."
				},{
					type: "name",
					title: "WEP 키 형식",
					content: "ASCII 형식이나 16 진수를 사용합니다. ASCII 형식은 ASCII 문자의 조합입니다. 16 진수는 숫자 (0-9) 및 문자 (A-F, a-f)의 조합입니다."
				},{
					type: "name",
					title: "키 타입",
					content: "보안 유형에 따라서 사용자는 WEP 키 길이(64-bit, 또는 128-bit, 또는152-bit)을 선택할 수 있습니다. \"사용안함\" WEP 키 항목을 사용안함을 의미합니다.",
					children: [{
						type: "name",
						title: "64-bit 암호화",
						content: "사용자는 10 자리의 16진수나 (0-9, a-f, A-F의 모든 조합, NULL 키는 허용되지 않음) 또는 5자의 ASCII 문자를 입력할 수 있습니다."
					},{
						type: "name",
						title: "128-bit 암호화",
						content: "사용자는 26자리의 16진수나 (0-9, a-f, A-F의 모든 조합, NULL 키는 허용되지 않음) 또는 13자의 ASCII 문자를 입력할 수 있습니다."
					}]
				},{
					type: "name",
					title: "키 값",
					content: "WEP 키를 각 필드에 입력합니다."
				}]
			}]
			},{
				type: "name",
				title: "모드",
				content: "전송 모드를 선택해 주십시오."
			},{
				type: "name",
				title: "채널 폭",
				content: "2.4GHz 무선 네트워크에 대한 채널 대역폭을 선택하십시오."
			},{
				type: "name",
				title: "채널",
				content: "2.4GHz 무선 네트워크에 대한 운영 채널을 선택합니다. 간헐적으로 무선 연결 문제가 발생하지 않을 경우, 채널 설정을 자동으로 두시는 것이 좋습니다."
			},{
				type: "name",
				title: "전송 파워",
				content: "무선 공유기의 전송 파워를 지정합니다. 고/중/저 중에서 원하는 것을 선택할 수 있습니다. 기본 설정값은 \"고\" 이며, 이 값을 권장합니다."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		WIRELESS_5G: {	
			TITLE: "무선 5GHz",
			CONTENT: [{
				type: "name",
				title: "무선 라디오 사용함",
				content: "이 옵션을 선택하여 5GHz 무선 라디오 주파수를 사용합니다. 이 옵션을 선택하지 않은 경우, WPS 기능은 이 대역에서 지원되지 않습니다. "
			},{
				type: "name",
				title: "무선 네트워크 이름 (SSID)",
				content: "무선 신호 이름을 최대 32자의 문자열로 지정합니다. 같은 이름 (SSID) 네트워크의 모든 무선 장치에 할당해야 합니다."
			},{
				type: "name",
				title: "SSID 숨기기",
				content: "Wi-Fi 네트워크 목록에서 5GHz 네트워크 이름 (SSID)을 숨기려면 이 옵션을 선택합니다. 이 옵션을 선택하는 경우, WPS 기능은이 대역에서 지원되지 않습니다."
			},{
				type: "name",
				title: "보안",
				content: "다음 중 하나의 보안 옵션을 선택해 주십시오.",
				children: [{
					type: "name",
					title: "비활성화 보안",
					content: "무선 보안 기능을 사용하지 않게 설정합니다. 보안을 사용하지 않을 경우 주변 무선 장치는 암호화 없이 바로 공유기에 접속 가능합니다. 보안을 위해서 사용자는 다음 중 하나의 옵션을 선택할 것을 적극 권장합니다."
				},{
					type: "name",
					title: "WPA/WPA2-개인",
					content: "패스프레이즈라고도 불리는 PSK(사전 공유 키) 기반 표준 인증 방법을 사용하려면 이 옵션을 선택합니다. 이 옵션을 선택할 것을 권장합니다. 선택한 경우 다음을 구성합니다.",
					children: [{
						type: "name",
						title: "버전",
						content: "사용자는 다음 중 하나의 버전을 선택할 수 있습니다,",
						children: [{
							type: "name",
							title: "자동",
							content: "무선 장치의 기능과 요청에 따라 자동으로 WPA 또는 WPA2을 선택합니다"
						},{
							type: "name",
							title: "WPA-PSK",
							content: "이 옵션은 안전성을 보장합니다. 이 옵션을 선택하는 경우, WPS 기능은 이 대역에서 지원되지 않습니다. "
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "이 옵션은 WPA-PSK보다 높은 수준의 보안을 제공하며 사용이 권장됩니다."
						}]
					},{
						type: "name",
						title: "암호화",
						content: "보안 암호화 유형을 선택합니다. 보안 암호화 유형은 TKIP (임시 키 무결성 프로토콜), AES(고급 암호화 표준) 또는 자동 (TKIP 및 AES)을 포함합니다. TKIP 암호화는 802.11n 사양에 의해 지원되지 않기 때문에 공유기가 802.11n 모드에서 작동할 때 TKIP 암호화를 사용하지 않는 것을 권장합니다. TKIP를 선택하는 경우, WPS 기능은 이 대역에서 지원되지 않습니다. "
					},{
						type: "name",
						title: "비밀번호",
						content: "사용자는 ASCII 또는 16진수 문자를 입력할 수 있습니다. 16진수의 경우 그 길이가 8자와 64자 사이여야 하고, ASCII의 경우 그 길이가 8자와 63자 사이여야 합니다."
					}]
				},{
					type: "name",
					title: "WPA/WPA2-기업",
					content: "RADIUS (원격 인증 전화 접속 사용자 서비스) 서버를 사용한 고급 인증 방법을 사용하려면 이 옵션을 선택합니다. 이 옵션을 선택하는 경우, WPS 기능은 이 대역에서 지원되지 않습니다.",
					children: [{
						type: "name",
						title: "버전",
						content: "사용자는 다음 중 하나의 버전을 선택할 수 있습니다,",
						children: [{
							type: "name",
							title: "자동",
							content: "무선 장치의 기능과 요청에 따라 자동으로 WPA 또는 WPA2을 선택합니다"
						},{
							type: "name",
							title: "WPA",
							content: "이 옵션은 높은 수준의 보안을 제공합니다."
						},{
							type: "name",
							title: "WPA2",
							content: "이 옵션은 WPA-PSK보다 높은 수준의 보안을 제공하며 사용이 권장됩니다."
						}]
					},{
						type: "name",
						title: "암호화",
						content: "보안 암호화 유형을 선택해 주십시오: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), 또는 자동 (for both TKIP and AES). 공유기가 802.11n 모드로 사용 중일 경우에는 TKIP 암호화 사용이 권장되지 않습니다. TKIP방식이 802.11n을 지원하지 않기 때문입니다."
					},{
						type: "name",
						title: "RADIUS 서버 IP",
						content: "RADIUS 서버의 IP 주소를 입력합니다."
					},{
						type: "name",
						title: "RADIUS 포트",
						content: "RADIUS 서버의 포트 번호를 입력합니다."
					},{
						type: "name",
						title: "RADIUS 비밀번호",
						content: "RADIUS 서버의 비밀번호를 입력합니다."
					}]
				},{
					type: "name",
					title: "WEP",
					content: "클라이언트 장치가 WEP (유선 동등한 개인 정보 보호)를 이용할 때만 무선에 접근할 수있는 경우, 이 옵션을 선택하여 기본 인증 방법을 활성화합니다. 이 옵션을 선택하는 경우, WPS 기능은이 대역에서 지원되지 않습니다.",
					children: [{
						type: "name",
						title: "타입",
						content: "다음 타입 중 하나를 선택할 수 있습니다."
					},{
						type: "name",
						title: "WEP 키 형식",
						content: "ASCII 또는 16진수 형식을 사용할 수 있습니다. ASCII 형식은 지정된 길이의 입력 가능한 키보드 문자의 모든 조합을 의미합니다. 16진수 형식은 지정된 길이의 16진수 숫자(0-9, a-f, A-F)의 모든 조합을 의미합니다."
					},{
						type: "name",
						title: "키 타입",
						content: "보안 유형에 따라서 사용자는 WEP 키 길이(64-bit, 또는 128-bit, 또는152-bit)을 선택할 수 있습니다. \"사용안함\" WEP 키 항목을 사용안함을 의미합니다.",
						children:[{
							type: "name",
							title: "64-bit 암호화",
							content: "사용자는 10 자리의 16진수나 (0-9, a-f, A-F의 모든 조합, NULL 키는 허용되지 않음) 또는 5자의 ASCII 문자를 입력할 수 있습니다."
						},{
							type: "name",
							title: "128-bit 암호화",
							content: "사용자는 26자리의 16진수나 (0-9, a-f, A-F의 모든 조합, NULL 키는 허용되지 않음) 또는 13자의 ASCII 문자를 입력할 수 있습니다."
						}]
					},{
						type: "name",
						title: "키 값",
						content: "WEP 키를 각 필드에 입력합니다."
					}]
				}]
			},{
				type: "name",
				title: "모드",
				content: "만일 이 무선 공유기에 접속하는 모든 무선 장치가 동일 전송 모드(예. 802.11b)로 연결될 수 있다면, 전용 모드(예 11b 전용)을 선택할 수 있습니다. 만일 일부 장비가 다른 전송 모드를 사용한다면 적절한 \"혼합\" 모드를 선택하십시오."
			},{
				type: "name",
				title: "채널 폭",
				content: "5GHz 무선 네트워크에 대한 채널 대역폭을 선택하십시오."
			},{
				type: "name",
				title: "채널",
				content: "5GHz의 무선 네트워크에 대한 운영 채널을 선택합니다. 간헐적으로 무선 연결 문제가 발생하지 않을 경우, 채널 설정을 자동으로 두시는 것이 좋습니다."
			},{
				type: "name",
				title: "전송 파워",
				content: "무선 공유기의 전송 파워를 지정합니다. 고/중/저 중에서 원하는 것을 선택할 수 있습니다. 기본 설정값은 \"고\" 이며, 이 값을 권장합니다."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		WIRELESS_60G: {	
			TITLE: "60GHz 무선",
			CONTENT: [{
				type: "name",
				title: "무선 라디오 활성화",
				content: "이 체크박스를 선택해 60GHz무선 주파수를 활성화합니다. 선택하지 않은 경우 WPS기능은 이 밴드에서 지원되지 않는 것입니다."
			},{
				type: "name",
				title: "무선 네트워크 이름 (SSID)",
				content: "무선 신호 이름을 최대 32자의 문자열로 지정합니다. 같은 이름 (SSID) 네트워크의 모든 무선 장치에 할당해야 합니다."
			},{
				type: "name",
				title: "SSID 숨기기",
				content: "Wi-Fi네트워크 목록에서 60GHz 네트워크 이름(SSID)을 감추고 싶은 경우 이 체크박스를 클릭하십시오. 선택한 경우 WPS기능은 이 밴드에서 지원되지 않는 것입니다."
			},{
				type: "name",
				title: "보안",
				content: "다음 중 하나의 보안 옵션을 선택해 주십시오.",
				children: [{
					type: "name",
					title: "비활성화 보안",
					content: "무선 보안 기능을 사용하지 않게 설정합니다. 보안을 사용하지 않을 경우 주변 무선 장치는 암호화 없이 바로 공유기에 접속 가능합니다. 보안을 위해서 사용자는 다음 중 하나의 옵션을 선택할 것을 적극 권장합니다."
				},{
					type: "name",
					title: "WPA2-개인",
					content: "이 옵션을 선택해 Pre-shared Key(PSK)에 기반한 기본 인증 방식을 사용합니다. 암호화 유형은 GCMP입니다. 이 옵션 사용이 권장됩니다. 사용하는 경우 아래 설정을 확인해 주십시오.",
					children: [{
						type: "name",
						title: "비밀 번호",
						content: "사용자는 ASCII 또는 16진수 문자를 입력할 수 있습니다. 16진수의 경우 그 길이가 8자와 64자 사이여야 하고, ASCII의 경우 그 길이가 8자와 63자 사이여야 합니다."
					}]
				},{
					type: "name",
					title: "WPA2-Enterprise",
					content: "RADIUS (Remote Authentication Dial In User Service) 서버를 활용한 보다 고급 인증 방식을 사용하시려면 이 옵션을 선택해 주십시오. 암호화 유형은 GCMP입니다. 선택한 경우 WPS기능은 이 밴드에서 지원되지 않는 것입니다.",
					children: [{
						type: "name",
						title: "RADIUS 서버 IP",
						content: "RADIUS 서버의 IP 주소를 입력합니다."
					},{
						type: "name",
						title: "RADIUS 포트",
						content: "RADIUS 서버의 포트 번호를 입력합니다."
					},{
						type: "name",
						title: "RADIUS 비밀번호",
						content: "RADIUS 서버의 비밀번호를 입력합니다."
					}]
				}]
			},{
				type: "name",
				title: "채널",
				content: "60GHz 무선 네트워크의 오퍼레이팅 채널을 선택해 주십시오. 무선 인터넷 접속에 문제가 없는 경우 자동 으로 두는 것이 권장됩니다."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		WPS: {	
			TITLE: "현재 공유기의 PIN",
			CONTENT: [{
				type: "paragraph",
				content: "다른 장치들은 WPS(Wi-Fi 보호 설치) 기능과 공유기의 PIN으로 이 공유기에 연결할 수 있습니다."
			},{
				type: "name",
				title: "현재 공유기의 PIN",
				content: "사용자는 공유기의 PIN 값을 사용하여 새 장치를 네트워크에 추가할 수 있습니다."
			},{
				type: "name",
				title: "PIN",
				content: "공유기의 PIN을 표시합니다.기본 PIN은 공유기의 라벨에서 찾을 수 있습니다. 생성을 클릭하여 무작위로 새 PIN을 생성하거나, 기본을 클릭하여 현재 PIN을 공장 출하시의 기본 PIN으로 복원합니다. "
			}]
		},

		WPS_WIZARD: {
			TITLE: "WPS 마법사",
			CONTENT:[{
				type: "paragraph",
				content: "WPS 기능을 활성화되는, 경우 다음과 같은 기능을 지원합니다. \"무선 라디오를 활성화\"를 활성화, \"SSID 숨기기\"를 비활성화 및 보안 상태는 \"보안 없음\"이나 \"WPA / WPA2-개인\"(WPA2-PSK 또는 자동+AES 또는 자동)입니다. "
			},{
				type: "name",
				title: "푸시 버튼(권장)",
				content: "만약 새 장치가 WPS(Wi-Fi Protected Setup) 기능을 지원하고 설정 버튼을 가지고 있다면, 사용자는 장치 상에 있는 설정 버튼을 누른 후 2분 이내 공유기 상의 버튼을 눌러 쉽게 해당 장치를 무선 네트워크에 추가할 수 있습니다."
			},{
				type: "name",
				title: "PIN",
				content: "이 버튼을 누르면 새 장치를 기존의 네트워크에 수동으로 추가할 수 있습니다."
			}]
		},

		WIRELESS_STATISTICS: {	
			TITLE: "무선 스테이션 온라인",
			CONTENT: [{
				type: "name",
				title: "클라이언트 숫자",
				content: "관련 무선 클라이언트의 번호"
			},{
				type: "name",
				title: "MAC 주소",
				content: "연결된 무선 장치의 MAC 주소 표시."
			},{
				type: "name",
				title: "연결 유형",
				content: "클라이언트가 접속해 있는 무선 밴드 (2.4 GHz, 5 GHz, 60GHz)를 보여줍니다."
			},{
				type: "name",
				title: "보안",
				content: "관련 무선 클라이언트의 보안 유형"
			},{
				type: "name",
				title: "수신 패킷",
				content: "무선 장치가 수신한 패킷"
			},{
				type: "name",
				title: "발송 패킷",
				content: "이 스테이션에 의해 발송된 패킷"
			},{
				type: "paragraph",
				content: "이 페이지의 새로운 설정 정보의 업데이트를 위해 새로고침 버튼을 클릭하십시오."
			}]
		},
		
		GUEST_NETWORK_SETTINGS:{
			TITLE: "설정",
			CONTENT: [{
				type: "paragraph",
				content: "게스트 네트워크는 별도의 무선 네트워크 이름 (SSID)과 손님이 무선 네트워크에 액세스하는 데 사용할 수있는 암호를 사용하여 별도의 네트워크를 설정할 수 있습니다."
			},{
				type: "name",
				title: "게스트 서로 보일 수 있게",
				content: "게스트 네트워크에 무선 장치가 서로를 볼 수 있도록하려면 이 확인란을 선택합니다"
			},{
				type: "name",
				title: "게스트가 로컬 네트워크에 액세스할 수 있도록 허용",
				content: "게스트 네트워크에 무선 장치를 로컬 네트워크 공유 및 프린터에 액세스 할 수 있도록하려면이 확인란을 선택합니다."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		GUEST_NETWORK_WIRELESS:{	
			TITLE: "무선 2.4GHz/5GHz",
			CONTENT: [{
				type: "name",
				title: "게스트 네트워 사용함",
				content: "게스트 네트워크 기능을 사용하기 위해 이 확인란을 선택합니다."
			},{
				type: "name",
				title: "무선 네트워크 이름 (SSID)",
				content: "기본 게스트 SSID를 사용하거나 (최대 32 자) 새로운 이름을 만듭니다."
			},{
				type: "name",
				title: "SSID 숨기기",
				content: "Wi-Fi 네트워크 목록에서 게스트 SSID를 숨기려면 이 확인란을 선택합니다."
			}/*,{
				type:"name",
				id:"pwd_mode",
				title:"비밀번호 업데이트 간격",
				content:"게스트 네트워크 비밀번호의 업데이트 간격을 선택합니다."
			}*/,{
				type: "name",
				title: "보안",
				content: "비밀번호를 업데이트하기 위해 보안 옵션을 선택한 적이 없다면, 다음의 보안 옵션 중 하나를 선택합니다.",
				children: [{
					type: "name",
					title: "비활성화 보안",
					content: "무선 보안 기능을 사용하지 않게 설정합니다. 보안을 사용하지 않을 경우 주변 무선 장치는 암호화 없이 바로 공유기에 접속 가능합니다. 보안을 위해서 사용자는 다음 중 하나의 옵션을 선택할 것을 적극 권장합니다."
				},{
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
						},{
							type: "name",
							title: "WPA-PSK",
							content: "이 옵션은 높은 수준의 보안을 제공합니다."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "이 옵션은 WPA-PSK보다 높은 수준의 보안을 제공하며 사용이 권장됩니다."
						}]
					},{
						type: "name",
						title: "암호화",
						content: "보안 암호화 유형을 선택해 주십시오: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), 또는 자동 (for both TKIP and AES). 공유기가 802.11n 모드로 사용 중일 경우에는 TKIP 암호화 사용이 권장되지 않습니다. TKIP방식이 802.11n을 지원하지 않기 때문입니다."
					}]
			}]},{
				type: "name",
				title: "비밀번호",
				content: "무작위로 생성된 비밀번호를 사용하거나, 8-63자리 ASCII 문자 또는 16진수(0-9, a-f, A-F) 8-64자리의 비밀번호를 생성합니다."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},

		NAT: {
			TITLE: "ALG(Application Layer Gateway)",
			CONTENT: [{
				type: "paragraph",
				content: "ALG는 사용자 개개인의 요구에 맞춰진 NAT 순회필터를 지원하는 주소의 게이트웨이와 특정 어플리케이션 레이어의 \"control/data\" 프로토콜인 FTP, TFTP, H323 등을 위한 포트전송을 연결시킵니다."
			},{
				type: "name",
				title: "FTP  ALG 사용 가능",
				content: "선택하면 FTP(File Transfer Protocol)클라이언트와 서버가 NAT를 이용해 데이터를 전송할 수 있게 합니다."
			},{
				type: "name",
				title: "TFTP ALG 사용 가능",
				content: "선택하면 TFTP(Trivial File Transfer Protocol) 클라이언트와 서버가 NAT를 이용해 데이터를 전송할 수 있게 합니다."
			},{
				type: "name",
				title: "H323 ALG 사용 가능",
				content: "선택 시, Microsoft NetMeeting 클라이언트가 NAT를 통해 연결됩니다."
			},{
				type: "name",
				title: "RTSP ALG 사용 가능",
				content: "선택 시,  미디어 플레이어가 NAT를 통해 스트리밍 하고있는 미디어 서버와 연결됩니다."
			},{
				type: "name",
				title: "PPTP 통과 사용",
				content: "선택 시, 일대일 세션이 공유기나 IP 네트워크를 통해 x터널링됩니다."
			},{
				type: "name",
				title: "L2TP 통과 사용",
				content: "선택 시, 계층 2 일대일 세션이 공유기나 IP 네트워크를 통해 터널링됩니다."
			},{
				type: "name",
				title: "IPSec  통과 사용",
				content: "선택 시, 인터넷 프로토콜 보안이 공유기나 IP 네트워크를 통해 터널링됩니다. IPSec는 사생활 보호 및 보안이 강화된 IP 네트워크 통신을 강화한 Crytographic 보안 서비스를 사용합니다."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},


		VIRTUAL_SERVERS: {
			TITLE: "가상 서버",
			CONTENT: [{
				type: "paragraph",
				content: "가상 서버는 사용자의 로컬 네트워크를 공공 서비스로 설정하기 위해 사용됩니다. 하나의 외부 서버의 형태로, 인터넷에서부터 외부 포트에 이르는 모든 요청은 정적 또는 약속된 IP 주소로 설정된 특정 지정 PC로 재전송 됩니다."
			},{
				type: "name",
				title: "서비스 타입",
				content: "사용자의 가상 서버의 이름"
			},{
				type: "name",
				title: "외부 포트",
				content: "가상 서버로 사용되는 포트의 범위와 수"
			},{
				type: "name",
				title: "내부 IP",
				content: "서비스 응용 프로그램을 실행하고 있는 PC의 IP 주소"
			},{
				type: "name",
				title: "내부 포트",
				content: "서비스 응용 프로그램을 실행하고 있는 PC의 포트 수"
			},{
				type: "name",
				title: "프로토콜",
				content: "서비스 응용 프로그램에 사용된 프로토콜 : TCP, UDP 또는 공유기에서 지원된 모든 프로토콜"
			},{
				type: "name",
				title: "상태",
				content: "특정 필터링 규칙에 대한 현재 상태"
			},{
				type: "name",
				title: "수정",
				content: "해당 규칙의 수정 또는 삭제를 위한 옵션"
			},{
				type: "step",
				title: "가상 서버 규칙을 설정하려면",
				content: [
					"1. 추가 버튼을 클릭하십시오.",
					"2. 외부 포트와 내부 포트에 접근하는 포트의 수를 자동으로 추가하는 항목으로부터 서비스를 선택하기 위해서는 현재 서비스 보기를 클릭하십시오. 만약 서비스가 항목에 없다면 외부 포트 수(예:21) 또는 포트의 범위(예:21-25)를 입력하십시오. 만약 외부 포트가 같지 않다면 내부 포트의 정보는 빈 칸으로 남겨두거나 또는 외부 포트가 단일 포트일 경우 특정 포트를(예:21) 입력하십시오.  소수 표기 형태인 서비스 응용 프로그램을 실행하고 있는 PC의  IP 주소를 내부 IP 영역에 기입해 주십시오.",
					"3. 서비스 응용 프로그램을 위한 프로토콜을 선택하십시오.",
					"4. 상태 사용함을 선택하십시오.",
					"5. OK 버튼을 클릭하십시오."
				]
			},{
				type: "step",
				title: "가상 서버 규칙 수정 또는 삭제 하기",
				content: "테이블에서, 수정하거나 삭제하려는 규칙에 해당하는  편집 아이콘 또는 쓰레기통 아이콘을 클릭하십시오."
			},{
				type: "step",
				title: "다수의 규칙 삭제 하기",
				content: "삭제를 원하는 모든 규칙을 선택해 삭제버튼을 클릭하십시오."
			},{
				type: "note",
				title: "주의",
				content: "사용자의 로컬 호스트 장치가 1개 이상의 서비스를 호스팅하고 있다면, 각각의 서비스에 대한 규칙을 생성해야 합니다."
			}]
		},

		PORT_TRIGGERING: {
			TITLE: "포트 트리거",
			CONTENT: [{
				type: "paragraph",
				content: "인터넷 게임, 비디오 컨퍼런스, 인터넷 전화 등 일부 응용 프로그램은 다중 접속을 필요로 할 수 있습니다. 포트 트리거는 순수 NAT 기능이 동작하는 공유기 상에서 정상적으로 실행되지 않는 프로그램을 정상적으로 실행될 수 있도록 지원합니다."
			},{
				type: "name",
				title: "앱",
				content: "애플리케이션의 이름"
			},{
				type: "name",
				title: "트리거 포트",
				content: "공유기 외부로 나가는 트래픽을 위한 포트. 이 포트를 사용하여 외부로 나가는 연결이 존재할 경우 이 규칙이 수행될 것입니다."
			},{
				type: "name",
				title: "트리거 프로토콜",
				content: "트리거 포트에서 사용될 수 있는 프로토콜로 TCP, UDP, 또는 전부(이 라우터가 지원하는 모든 프로토콜)중 하나를 지정할 수 있습니다."
			},{
				type: "name",
				title: "외부 포트",
				content: "공유기 외부에 존재하는 원격 시스템이 요청에 응답할 때 사용될수 있는 포트나 포트 범위. 이 포트 또는 범위에 존재하는 응답만 해당 PC로 전달됩니다. 사용자는 최대 5개 그룹의 포트(또는 포트 구간)을 입력할 수 있습니다. 그룹 정보는 \",\"으로 분리하여 입력합니다. 예: 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
			},{
				type: "name",
				title: "외부 프로토콜",
				content: "입력 포트에서 사용될 수 있는 프로토콜로, TCP, UDP, 또는 전부 (이 라우터가 지원하는 모든 프로토콜) 중 하나를 지정할 수 있습니다."
			},{
				type: "name",
				title: "상태",
				content: "특정 필터링 규칙에 대한 현재 상태"
			},{
				type: "name",
				title: "수정",
				content: "해당 규칙의 수정 또는 삭제를 위한 옵션"
			},{
				type: "step",
				title: "포트 트리거 항목 설정하기",
				content: [{
					type: "note",
					title: "주의",
					content: "주의: 각 규칙은 LAN 상에서 한번에 한 호스트에 의해서만 사용될 수 있습니다."
				},
					"1. 추가를 클릭합니다.",
					"2. 해당 영역에 적합한 초기값을 자동으로 추가하는 항목으로부터 응용 프로그램을 선택하기 위해서는 현재 응용 프로그램 보기를 클릭하십시오. 만약 항목에서 삭제하기를 원하는 응용 프로그램이 있다면, 수동으로 응용프로그램, 트리거 포트, 트리거 프로토콜, 외부 포트와 외부 프로토콜을 입력하십시오.",
					"3. 상태 사용함을 선택하십시오.",
					"4. OK 버튼을 클릭하십시오."
				]
			},{
				type: "step",
				title: "기존 항목 변경/삭제하기",
				content: "테이블에서, 수정하거나 삭제하려는 규칙에 해당하는  편집 아이콘 또는 쓰레기통 아이콘을 클릭하십시오."
			},{
				type: "step",
				title: "멀티 포트 트리거 규칙 삭제하기",
				content: "테이블에서 삭제를 원하는 규칙을 찾아 선택한 후, 테이블 상의 삭제 버튼을 클릭하십시오."
			}]
		},

		DMZ: {
			TITLE: "DMZ",
			CONTENT: [{
				type: "paragraph",
				content: "DMZ 호스트 기능은 DMZ 호스트로 지정된 장비로 모든 네트워크 데이터를 전달함으로써, 공유기 내부에 있는 장비(PC 등)가 게임, 화상회의, 서버 운영 등, 특별한 기능이 원활하게 동작할 수 있게 지원해 줍니다. DMZ 호스트 IP주소는 공유기의 DHCP 기능에 의해서 IP가 변경 될 수 있으므로, IP주소가 변경되지 않게 공유기에서 사용하지 않는 IP주소로 고정 IP 방식으로 지정하여 주십시오."
			},{
				type: "step",
				title: "DMZ 설정 하기",
				content: [
					"1. DMZ 버튼을 선택 하십시오.",
					"2. DMZ 기능 사용을 위한 PC의 IP 주소를 DMZ 호스트 IP 주소 영역에 입력하십시오.",
					"3. 설정 완료 후 저장버튼을 클릭하십시오."
				]
			}]
		},
		
		UPNP: {
			TITLE: "UPnP",
			CONTENT: [{
				type: "paragraph",
				content: "UPnP(Universal Plug and Play) 기능은 인터넷 컴퓨터와 같이 장치가 필요할 때 로컬 호스트의 자원이나 장치를 접속할 수 있게 해 줍니다. 공유기에서 UPnP 기능을 사용할 경우 공유기 내부에 UPnP 기능을 지원하는 프로그램은 UPnP 서비스를 이용해서 동적으로 포트 포워딩 기능을 설정 해제할 수 있습니다."
			},{
				type: "paragraph",
				content: "이 항목은 현재의 UPnP 장치 정보를 보여줍니다."
			},{
				type: "name",
				title: "서비스 정보",
				content: "UPnP 기능을 요청한 응용프로그램 정보."
			},{
				type: "name",
				title: "외부 포트",
				content: "공유기가 응용프로그램을 위해 개방한 외부 포트."
			},{
				type: "name",
				title: "프로토콜",
				content: "개방된 프로토콜"
			},{
				type: "name",
				title: "내부 IP 주소",
				content: "UPnP 요청한 로컬호스트의 IP 주소."
			},{
				type: "name",
				title: "내부 포트",
				content: "공유기가 로컬 호스트를 위해 개방한 내부 포트."
			},{
				type: "paragraph",
				content: "새로고침 버튼을 클릭하면 현재의 UPnP 설정 목록이 업데이트됩니다."
			}]
		},
		
		DISK_SETTING: {	
			TITLE: "장치 설정",
			CONTENT: [{
				type: "paragraph",
				content: "기기 설정 화면에서 USB 포트에 연결된 모든 USB 저장장치의 정보를 표시합니다."
			},{
				type: "name",
				title: "스캔",
				content: "일반적으로 공유기가 자동으로 새로 연결된 기기를 감지합니다. 만약 감지하지 못하면, 스캔 버튼을 클릭하여 새로 연결된 기기와 변경된 정보를 화면에 출력합니다."
			},{
				type: "name",
				title: "볼륨",
				content: "USB 볼륨의 이름을 표시합니다."
			},{
				type: "name",
				title: "용량",
				content: "USB의 총 저장 용량을 표시합니다."
			},{
				type: "name",
				title: "남은 공간",
				content: "현재 사용 가능한 저장 공간을 표시합니다."
			},{
				type: "name",
				title: "안전하게 제거",
				content: "USB 저장 장치를 안전하게 제거하려면 공유기에서 분리하기 전에 이 버튼을 클릭합니다."
			},{
				type: "paragraph",
				content: "제거 버튼은 장치가 공유기에 연결되어 있을 경우에 활성화됩니다. 현재 볼륨이 작동 중인 동안에는 USB 장치 제거가 불가능합니다."
			},{
				type: "name",
				title: "상태",
				content: "이 체크박스는 USB 저장 장치가 공유기에 연결되었을 때 활성화됩니다. 체크시 USB 저장 장치의 파일공유가 가능합니다."
			},{
				type: "step",
				title: "파일서버 설정하기",
				content: [
				"1. USB 저장 장치를 USB 케이블을 이용하여 공유기의 USB 포트에 연결합니다.",
				"2. 새로 연결된 USB 장치는 자동으로 공유기에서 감지하여 기기 설정 창에 정보에 표시됩니다. 만약 감지하지 못하면 스캔을 클릭하세요.",
				"3. 활성화를 선택하면 파일 공유가 가능합니다."
				]
			}]
		},
		
		FOLDER_SHARE_ACCOUNT: {	
			TITLE: "공유 계정",
			CONTENT: [{
				type: "name",
				title: "계정",
				content: "기본 계정 사용하기를 선택하여 로그인 후 파일과 폴더를 공유하거나 새로운 계정 사용하기를 선택하여 새로운 사용자 계정을 만들 수 있습니다."
			},{
				type: "name",
				title: "사용자 이름/비밀번호",
				content: "사용자 이름과 암호를 입력합니다. 사용자 이름은 1~ 15개의 영문, 숫자 또는 언더바를 입력하고 암호는 1~15개의 ASCII 문자를 입력합니다.  (대소 문자 구분)"
			},{
				type: "name",
				title: "비밀번호 확인",
				content: "비밀번호를 다시 입력합니다. 이 필드는 대소문자를 가립니다."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		FOLDER_SHARE_SETTINGS: {
			TITLE: "공유 설정",
			CONTENT: [{
				type: "name",
				title: "네트워크/미디어 서버 이름",
				content: "연결된 USB 저장 장치를 접근하는 이름을 표시합니다. 이름은 반드시 4~15자의 숫자, 언더바나 붙임표를 사용해야 합니다. "
			},{
				type: "name",
				title: "가능",
				content: "가능한 접근 방법을 선택합니다."
			},{
				type: "name",
				title: "접근 방법",
				content: "연결한 USB 저장 장치에 접근을 허용하는 3가지 접근 방법입니다. 체크박스를 선택하여 한 개 또는 그 이상의 접근 방법을 선택할 수 있습니다.",
				children: [{
					type: "name",
					title: "네트워크 이웃",
					content: "활성화되어 있다면, 네트워크 상의 사용자가 할당된 IP 주소(예. \\\\192.168.0.1)를 이용하여 USB 저장 장치에 액세스할 수 있습니다."
				},{
					type: "name",
					title: "FTP",
					content: "로컬 네트워크 FTP 클라이언트가 IP 주소 할당을 사용하여 USB 저장 장치의 접근이 가능합니다. 해당 FTP 서버 포트넘버는 (예. ftp://192.168.0.1:21) 입니다."
				},{
					type: "name",
					title: "FTP (인터넷을 통한)",
					content: "유저들이 인터넷 FTP를 통하여 USB저장장치에 원격으로 접근할 수 있습니다. 이 기능은 다운로드와 업로드를 지원합니다. FTP 서버의 포트넘버를 변경하려면 포트 넘버를 입력하고 저장을 클릭하면 변경이 적용됩니다."
				}]
			},{
				type: "name",
				title: "링크",
				content: "공유된 USB 저장 장치에 접근하는 주소를 표시합니다."
			},{
				type: "name",
				title: "포트",
				content: "FTP 서버의 포트 번호를 표시합니다. 내정값 21을 사용하시거나 1024와 65535 사이의 번호를 사용합니다."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		FOLDER_SHARE_FOLDERS: {
			TITLE: "폴더 공유",
			CONTENT: [{
				type: "name",
				title: "전체 공유",
				content: "스위치 켠 상태에서 모든 파일과 폴더 공유되고 또는 끈 상태에 선택한 폴더만 공유됩니다."
			},{
				type: "name",
				title: "인증 사용",
				content: "공유 폴더 접근을 요청한 사용자가 유효한 사용자이름과 비밀번호로 입력하여 접근할 수 있도록 할 것을 추천합니다."
			},{
				type: "name",
				title: "폴더 이름",
				content: "공유 폴더의 이름을 표시합니다."
			},{
				type: "name",
				title: "폴더 경로",
				content: "공유 폴더의 경로를 표시합니다."
			},{
				type: "name",
				title: "미디어 공유",
				content: "공유 폴더의 공유 여부를 표시합니다."
			},{
				type: "name",
				title: "볼륨 이름",
				content: "공유 볼륨의 이름을 표시합니다."
			},{
				type: "name",
				title: "상태",
				content: "표시등으로 공유 폴더의 상태를 표시합니다."
			},{
				type: "name",
				title: "수정",
				content: "공유 폴더의 변경 또는 삭제를 옵션으로 표시합니다."
			},{
				type: "name",
				title: "검색",
				content: "클릭하여 공유폴더를 검색합니다."
			},{
				type: "name",
				title: "게스트 네트워크 액세스 허용",
				content: "게스트 네트워크에 클라이언트가 공유 폴더에 액세스할 수 있도록 선택합니다."
			},{
				type: "name",
				title: "인증 사용",
				content: "유효한 사용자 이름과 비밀번호를 사용하여 공유 폴더에 액세스 하도록 선택합니다."
			},{
				type: "name",
				title: "쓰기 액세스 사용",
				content: "사용자가 폴더 내용을 변경할 수 있도록 선택합니다."
			},{
				type: "name",
				title: "미디어 공유 사용함",
				content: "미디어 공유를 활성화 하려면 선택합니다."
			},{
				type: "name",
				title:"새로고침",
				content: "클릭하면 공유 폴더 목록이 업데이트됩니다."
			}]
		},
		
		PRINT_SERVER: {	
			TITLE: "프린터 서버",
			CONTENT: [{
				type: "name",
				title:"프린터 서버",
				content: "프린트 서버 기능을 사용할 수 있도록 토글합니다."
			},{
				type: "name",
				title:"프린터 이름",
				content: "공유기에 연결된 프린터 이름을 표시합니다."
			}]
		},
		
		OFFLINE_DOWNLOAD: {	
			TITLE: "오프라인 다운로드",
			CONTENT: [{
				type: "name",
				title:"상태",
				content: "오프라인 다운로드 기능을 사용하려면 켜짐으로 설정하십시오."
			},{
				type: "name",
				title:"폴더 경로",
				content: "오프라인 다운로드 기능에서 사용하는 디렉토리입니다. 상태 버튼이 켜 있을 때 디렉토리를 선택해야 하며 그렇지 않은 경우 작업 테이블이 계속 켜져 있어 다른 작업이 불가능합니다. 사용할 디렉토리가 설정되면 다음 작업에서 처리하는 모든 파일은 해당 디렉토리에 저장됩니다. 활성화된 아이템이 있는 경우 사용 디렉토리는 변경할 수 없으며 이 경우 USB저장소를 제거할 경우 오류를 일으킬 수 있으므로 제거하지 마십시오."
			},{
				type: "name",
				title:"일정",
				content: "선택한 경우 다운로드 시간을 지정할 수 있습니다. 시간 설정은 공유기의 시스템 시간에 맞춰 작동되며 시스템 시간은 \"시스템 도구 -> 시간 설정\"에서 가능합니다."
			},{
				type: "name",
				title:"작업 완료 후에도 시드를 유지해 주십시오",
				content: "선택한 경우 완료된 작업은 시드를 계속 배포합니다."
			},{
				type: "name",
				title: "활성화된 태스크의 최대치",
				content: "활성화된 작업의 최대치를 보여줍니다."
			},{
				type: "name",
				title:"최고 다운로드 속도",
				content: "최대 다운로드 속도를 보여줍니다."
			},{
				type: "name",
				title:"최고 업로드 속도",
				content: "최저 업로드 속도를 보여줍니다."
			},{
				type: "name",
				title: "연결 수",
				content: "접속 설정을 보여줍니다."
			},{
				type: "name",
				title: "연결 수 세계 최대치",
				content: "모든 작업에 대한 접속 최대치를 제한하려면 조정하십시오."
			},{
				type: "name",
				title: "토렌트로 연결 가능한 최대치",
				content: "작업 당 접속자 수를 제한하려면 조정하십시오."
			},{
				type: "name",
				title: "DHT 네트워크 켜짐",
				content: "선택한 경우 DHT가 활성화됩니다."
			},{
				type: "name",
				title: "접속자 교환 켜짐",
				content: "선택한 경우 접속자 정보 교환이 활성화됩니다."
			},{
				type: "name",
				title: "BitTorrent 프로토콜 암호화 활성화",
				content: "선택한 경우 BitTorrent 프로토콜 암호화가 활성화됩니다."
			},{
				type: "name",
				title:"aMule 서버",
				content: "접속할 IP 주소와 aMule 서버를 입력해 주십시오."
			}]
		},
		
		OFFLINE_DOWNLOAD_ITEMS: {
			TITLE: "아이템",
			CONTENT: [{
				type: "paragraph",
				content: "다운로드한 항목을 보여줍니다."
			},{
				type: "name",
				title: "파일",
				content: "다운로드한 파일명을 보여줍니다."
			},{
				type: "name",
				title:"속도",
				content: "업로드 및 다운로드 속도를 보여줍니다."
			},{
				type: "name",
				title: "완료",
				content: "다운받은 크기와 전체 크기를 보여줍니다."
			},{
				type: "name",
				title:"남은 시간",
				content: "다운로드 완료까지 남은 시간을 보여줍니다."
			},{
				type: "name",
				title:"연결된 접속자",
				content: "접속자의 접속 정보를 보여줍니다."
			},{
				type: "name",
				title: "상태",
				content: "작업 상태를 보여줍니다."
			},{
				type: "name",
				title: "소스",
				content: "다운로드 유형을 보여줍니다."
			},{
				type: "step",
				title: "다운로드 아이템을 추가하려면",
				content: [
					"1. 추가를 클릭합니다.",
					"2. 다운로드 소스 유형을 선탣합니다.",
					"1) PC에서 토렌트: 시작하기를 클릭해 PC에서 토렌트 파일을 선택합니다.",
					"2) USB에서 토렌트: 시작하기를 클릭해 PC에서 토렌트 파일을 선택합니다.",
					"3) URL: URL을 입력합니다.(HTTP, HTTPS, FTP, ed2k)",
					"3. 확인을 클릭합니다."
				]
			}]
		},
		
		PARENTAL_CONTROL: {	
			TITLE: "자녀PC 관리 기능",
			CONTENT: [{
				type: "paragraph",
				content: "이 기능으로 유해사이트 접속을 차단할 수 있고 특정시간 접속제한(예. 페이스북, 유튜브등)과 중앙통제를 통하여 홈네트워크상의 모든기기를 몰웨어와 피싱으로 부터 동시간에 보호할 수 있습니다."
			},{
				type: "name",
				title: "자녀PC 관리 기능",
				content: "토글'On'시 자녀PC관리 기능이 활성화 됩니다. 기본값은 비활성화 상태입니다."
			}]
		},
		
		PARENTAL_CONTROL_DEVICES: {
			TITLE: "자녀PC 관리 기기",
			CONTENT: [{
				type: "paragraph",
				content: "보호자 제어된 장치를 목록에 표시합니다."
			},{
				type: "name",
				title: "장치 이름",
				content: "현재 관리되고 있는 모든 기기의 이름을 표시합니다."
			},{
				type: "name",
				title: "MAC 주소",
				content: "현재 관리되고 있는 모든 기기의 MAC주소를 표시합니다."
			},{
				type: "name",
				title: "인터넷 접속 시간",
				content: "접속 제한 시간의 기간을 표시합니다. \"시스템 도구 -> 시간 설정\"에서 설정 할 수 있는 시간 일정은 공유기의 시스템 시간을 기준으로 적용됩니다."
			},{
				type: "name",
				title: "설명",
				content: "옵션 설정은 연결된 장치에 대한 간단한 설명을 표시합니다."
			},{
				type: "name",
				title: "상태",
				content: "관리 기능에 해당하는 기기의 현재 상태(활성화 또는 비활성화)를 표시합니다."
			},{
				type: "name",
				title: "수정",
				content: "해당 장치를 수정 또는 삭제하는 것을 표시합니다."
			},{
				type: "step",
				title: "새로운 클라이언트 장치를 제한합니다.",
				content: [
					"1. 추가를 클릭합니다.",
					"2.기존 장치 보기를 클릭하고 액세스 장치 목록에서 현재 연결된 장치를 선택하거나, 장치 이름을 입력하고 MAC 주소가 연결되지 않은 장치를 수동으로 추가합니다.",
					"3. 제한이 적용되는 기간을 지정하려면 인터넷 액세스 시간 아이콘을 클릭합니다.",
					"4. 설명 필드에 간단한 설명을 입력합니다. (선택 사항)",
					"5. 사용함을 선택합니다.",
					"6. 확인을 클릭하여 이 항목을 저장합니다."
				]
			},{
				type: "paragraph",
				content: "자녀PC 관리 항목을 수정하거나 삭제하려면, 편집 아이콘을 클릭하여 정보를 편집하거나 쓰레기통 아이콘을 클릭하여 해당 항목을 삭제합니다."
			},{
				type: "paragraph",
				content: "여러 항목을 삭제하려면 모든 항목을 선택하고 표 상단의 삭제를 클릭합니다."
			}]
		},
		
		PARENTAL_CONTROL_RESTRICTION: {
			TITLE: "컨텐츠 제한",
			CONTENT: [{
				type: "name",
				title: "블랙리스트",
				content: "웹사이트 접근을 제한하기 위한 특정 키워드를 설정합니다.",
				children: [{
					type: "paragraph",
					content: "새로운 키워드 추가를 클릭하여 블랙리스트에 추가합니다. 삭제하고자 하는 키워드는 (-) 아이콘을 클릭하여 삭제합니다."
				}]
			},{
				type: "name",
				title: "화이트리스트",
				content: "접속을 허용하고자 하는 웹사이트 주소를 추가합니다.",
				children: [{
					type: "paragraph",
					content: "도메인 이름 추가를 클릭하여 웹사이트를 화이트리스트에 추가합니다. 삭제하고자 하는 웹사이트는 (-) 아이콘을 클릭하여 삭제합니다."
				}]
			},{
				type: "note",
				title: "주의",
				content: "키워드는 또한 도메인 이름이 될 수 있습니다. 예를 들면, mail.google.com 또는 www.facebook.com이 될 수 있습니다. "
			},{
				type: "paragraph",
				content: "저장을 클릭하여 설정내용을 저장합니다."
			}]
		},
		
		
		QOS: {
			TITLE: "QoS",
			CONTENT: [{
				type: "paragraph",
				content: "서보 품질(QoS)은 사용자의 요구에 기반하여 인터넷 트래픽의 우선순위를 정하는데 도움을 줍니다. QoS 규칙 목록에서 장치 또는 애플리케이션의 우선순위를 지정할 수 있습니다. "
			},{
				type: "name",
				title: "QoS 사용",
				content: "QoS 기능을 사용하려면 상자를 클릭하십시오."				
			},{
				type: "name",
				title: "업로드 대역포",
				content: "ISP (인터넷 서비스 공급자)에서 제공하는 최대 업로드 대역폭을 입력."				
			},{
				type: "name",
				title: "다운로드 대역포",
				content: "ISP에서 제공하는 최대 다운로드 대역폭을 입력."
			},{
				type: "name",
				title: "높은 우선 순위",
				content: "우선 순위가 높은 트래픽에 대한 비율 (%)을 지정합니다."
			},{
				type: "name",
				title: "중간 우선 순위",
				content: "중간 우선 순위 트래픽에 대한 비율 (%)을 지정합니다."
			},{
				type: "name",
				title: "낮은 우선 순위",
				content: "우선 순위가 낮은 트래픽에 대한 비율 (%)을 지정합니다."
			},{
				type: "note",
				title: "주의",
				content: "모든 우선순위의 최대량(퍼센트)은 1입니다."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		QOS_RULE: {
			TITLE: "QoS 규칙 목록",
			CONTENT: [{
				type: "name",
				title: "타입",
				content: "대역폭 관리 규칙 목록을 추가하는 유형을 선택합니다."
			},{
				type: "step",
				title: "장치에 의해 높은/중간/낮은 우선 순위에 대한 규칙을 설정하려면",
				content: [
					"1. 추가를 클릭합니다.",
					"2. 기기를 선택 하십시오.",
					"3. 접속 제어  목록에서 원하는 장치를 선택보기 기존 장치를 클릭하거나, 장치 이름 및 MAC 주소 필드에 수동으로 장치 이름과 MAC 주소를 입력할 수 있습니다.",
					"4. OK 버튼을 클릭하십시오."
				]
			},{
				type: "step",
				title: "애플리케이션 별 높은/중간/낮은 우선 순위에 대한 규칙을 설정하려면",
				content: [
					"1. 추가를 클릭합니다.",
					"2. 응용 프로그램을 선택합니다.",
					"3. 응용 프로그램 목록에서 원하는 응용 프로그램을 선택하거나 해당 필드에 이름, 프로토콜 및 대상 포트 (1-65535)를 구성하여 응용 프로그램을 사용자 정의 할 수 있습니다, 당신은 단일 포트 또는 여러 개의 포트 또는 포트 범위, 사용을 입력 할 수 있습니다 쉼표 (예 21,36-105,111)를 분리합니다.",
					"4. OK 버튼을 클릭하십시오."
				]
			},{
				type: "step",
				title: "물리적 포트에 의해 높은/중간/낮은 우선 순위에 대한 규칙을 설정하려면",
				content: [
					"1. 추가를 클릭합니다.",
					"2. 물리적 포트를 선택합니다.",
					"3. 원하는 포트를 선택합니다.",
					"4. OK 버튼을 클릭하십시오."
				]
			}]
		},
		
		
		QOS_DATABASE: {
			TITLE: "데이터베이스 업그레이드",
			CONTENT: [{
				type: "name",
				title: "새 데이터베이스 파일",
				content: "선택하여 새 데이터베이스 파일을 찾아 새 버전으로 데이터베이스를 업그레이드 할 경우 클릭 찾아보기를 클릭합니다."
			},{
				type: "name",
				title: "데이터베이스 버전",
				content: "현재 데이터베이스 버전을 표시합니다."
			}]
		},
		
		
		
		SECURITY_FIREWALL: {	
			TITLE: "방화벽",
			CONTENT: [{
				type: "name",
				title: "방화벽",
				content: "SPI(상태기반 패킷 검사) 방화벽은 사이버 공격을 예방하고, 프로토콜에 기반하여 공유기를 통과하는 트래픽을 인증합니다."
			}]
		},
		
		SECURITY_DOS: {
			TITLE: "DoS 공격 차단",
			CONTENT: [{
				type: "name",
				title: "DoS 공격 차단",
				content: "DoS(서비스 거부) 보호는  DoS 공격이 서버 요청과 함께 사용자 네트워크로 유입되지 않도록  LAN을 보호합니다."
			},{
				type: "name",
				title: "ICMP-FLOOD 공격 필터링 사용함",
				content: "ICMP-FLOOD 공격 필터링 기능을 실행하거나 중단합니다.",
				children: [{
					type: "name",
					title: "사용안함",
					content: "보호하지 않습니다."
				},{
					type: "name",
					title: "낮음",
					content: "늦은 수준으로 공유기의 낮은 공격만 보호 할 수 있습니다."
				},{
					type: "name",
					title: "중간",
					content: "중간 수준으로 공유기의 일반 공격만 보호 할 수 있습니다."
				},{
					type: "name",
					title: "높음",
					content: "높은 수준으로 공유기의 고급 공격 보호 할 수 있습니다."
				}]
			},{
				type: "name",
				title: "UDP-FLOOD 공격 필터링 사용함",
				content: "UDP-FLOOD 공격 필터링 기능을 실행하거나 중단합니다."
			},{
				type: "name",
				title: "TCP-SYN-FLOOD 공격 필터링 사용함",
				content: "TCP-SYN-FLOOD 공격 필터링 기능을 실행하거나 중단합니다."
			},{
				type: "name",
				title: "WAN포트로 전달되는 Ping패깃을 무시함",
				content: "WAN포트로 수신 된 Ping 패킷 무시할 수 있습니다."
			},{
				type: "name",
				title: "LAN 포트로 전달되는 Ping 패깃을 금지함",
				content: "LAN포트로 수신 된 Ping 패킷 무시할 수 있습니다."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		SECURITY_LIST: {
			TITLE: "차단된  DoS 호스트 목록 도움말",
			CONTENT: [{
				type: "name",
				title: "차단된  DoS 호스트 목록 도움말",
				content: "이 페이지는 라우터에 의해 차단된 각 호스트 IP주소 및 호스트 MAC주소를 보여줍니다."
			},{
				type: "step",
				title: "전부 지우기",
				content: "전부 지우기 버튼을 클릭하면 모든 표시된 항목을 지웁니다."
			}]
		},
		
		ACCESS_CONTROL: {	
			TITLE: "접속 제어 관리",
			CONTENT: [{
				type: "paragraph",
				content: "접속 관리 기능은 특정 컴퓨터 및 기타 장치의 네트워크 접속을 허용하거나 차단하는데 사용됩니다. 장치가 차단되면, 다른 장치와 통신하거나, 인터넷에 연결할 수 없습니다."
			},{
				type: "paragraph",
				content: "인터넷 접속 제어 기능은 블랙 리스트와 화이트 리스트로 활성화 되어 기본 필터 규칙 적용 됩니다.인터넷 접속 제어 기능 (OFF)을 사용하지 않으면 블랙리스트에 포함 해 모든 장치는 연결이 허용됩니다."
			}]
		},
		
		ACCESS_MODE: {
			TITLE: "인터넷 접속 제어모드",
			CONTENT: [{
				type: "name",
				title: "차단 목록",
				content: "활성화 된 접속 제어 정책에 의해 지정된 패킷만 허용합니다."
			},{
				type: "name",
				title: "허용 목록",
				content: "황성화된 접속 제어 정책에 의해 지정된 패킷이 거부됩니다."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		ACCESS_DEVICE: {
			TITLE: "장치 온라인",
			CONTENT: [{
				type: "name",
				title: "장치 이름",
				content: "연결 된 장치의 이름을 표시합니다."
			},{
				type: "name",
				title: "IP 주소",
				content: "접속된 기기의 IP주소를 표시합니다."
			},{
				type: "name",
				title: "MAC 주소",
				content: "접속된 기기의 MAC 주소를 표시합니다."
			},{
				type: "name",
				title: "연결 유형",
				content: "연결된 기기의 연결 유형을 표시합니다."
			},{
				type: "step",
				title: "사용 제한",
				content: "차단을 하고자 하는 장치에 해당된 사용 제한 목록에 수정 버튼을 클릭하십시오."
			},{
				type: "step",
				title: "여러 장치를 사용 제한 하려면",
				content: "온라인 기기 테이블에서는 차단하고자 하는 기기를 전부 선택한 뒤 상단의 블록 버튼을 클릭합니다. 차단된 기기는 자동으로 블랙리스트에 등록됩니다."
			}],
		},
		
		ACCESS_LIST: {
			TITLE: "차단/허용 목록에 있는 장치",
			CONTENT: [{
				type: "step",
				title: "장치 차단 또는 허용",
				content: [
					"1. 추가 버튼을 클릭하십시오.",
					"2. 사용 제한 이름 입력하여 주십시오.",
					"3. 사용 제한 MAC주소를 들어가십시오",
					"4. OK 버튼을 클릭하십시오."
				]
			},{
				type: "step",
				title: "차단/허용 목록에서 장치를 수정하거나 삭제하려면",
				content: "차단/허용 목록  테이블에서,수정하거나 삭제하려는 기기에 해당하는 편집 아이콘 또는 쓰레기통 아이콘을 클릭하십시오."
			},{
				type: "step",
				title: "차단/허용 목록에서 복수의 장치를 삭제하려면",
				content: "차단/허용 목록에서 모든 목록을 선택하여 삭제 버튼을 클릭하십시오."
			}]
		},
		
		
		IPMAC_BIND_SETTING: {	
			TITLE: "설정",
			CONTENT: [{
				type: "paragraph",
				content: "ARP바인딩 기능은IP주소와 함께 디바이스의 MAC주소를 결합하여  LAN내에서 특정 컴퓨터릐 접속을 제어하는데 유용합니다.ARP바인딩은 특정 IP주소를 사용하여 다른 장치를 방지합니다."
			}]
		},
		
		IPMAC_BIND_ARP: {	
			TITLE: "ARP 목록",
			CONTENT: [{
				type: "paragraph",
				content: "현재 연결된 장치의 MAC주소 및 IP주소를 표시합니다."
			},{
				type: "name",
				title: "ARP 항목 번호",
				content: "현재 공유기에 연결 되어 있는 장치의 수를 표시합니다."
			},{
				type: "name",
				title: "MAC 주소",
				content: "접속된 기기의 MAC 주소를 표시합니다."
			},{
				type: "name",
				title: "IP 주소",
				content: "LAN내에서 관리하고자 하는 컴퓨터에 할당된 IP 주소."
			},{
				type: "name",
				title: "바우딩",
				content: "해당 장치에 ARP 바인딩을 사용하려면 이 옵션을 체크하십시오."
			},{
				type: "name",
				title: "수정",
				content: "해당 항목을 수정 하거나 사제할 수 있습니다."
			},{
				type: "note",
				title: "주의",
				content: "주의:둘 이상의 MAC 주소와 동일한 IP 주소를 바인딩 할 수있다."
			}]
		},
		
		IPMAC_BIND_LIST: {	
			TITLE: "바인딩 목록",
			CONTENT: [{
				type: "step",
				title: "ARP는 바인딩 장치를 설정하려면",
				content: [
					"1. 추가를 클릭합니다.",
					"2. 디바이스의 MAC 주소을 입력하십시오.",
					"3. 위의 MAC 주소에 바인딩을 할 IP주소를 입력하십시오",
					"4. 본 장치에 대한 설명을 입력하십시오(선택 사항)",
					"5. 사용함을 선택합니다.",
					"6. 확인를 클릭하십시오"
				]
			},{
				type: "step",
				title: "수정하거나 삭제를 하려면",
				content: "바인딩 목록에서 관리 버튼을 누르거나 삭제 버튼을 클릭하십시오."
			},{
				type: "step",
				title: "여러 항목을 삭제 하려면",
				content: "바인딩 목록에서 삭제하고자 하는 항목을 선택하신 후 삭제 버튼을 클릭하십시오."
			}]
		},
		
		IPV6: {
			TITLE: "인터넷",
			CONTENT: [{
				type: "name",
				title: "IPv6",
				content: "IPv6의 기능을 활성화 또는 비활성화합니다."
			},{
				type: "title",
				title: "인터넷 회선 유형: 고정IP",
			},{
				type: "name",
				title: "고정 IP",
				content: "ISP에서 고정 IPv6 주소 할당을 제공하면 이 유형을 선택합니다."
			},{
				type: "name",
				title: "IPv6 주소/기본 게이트웨이/기본 DNS/보조 DNS",
				content: "ISP에서 제공한 값을 입력합니다."
			},{
				type: "name",
				title: "MTU 크기(바이트단위)",
				content: "일반적인 MTU(Maximum Transmission Unit) 값은 1500바이트 입니다. 일부 인터넷 회선 업체의 경우 MTU 값의 변경이 요구될 수 있습니다. 이는 드문 경우이지만, 필요하다고 판단되는 경우에만 인터넷 회선 제공업체 확인 후 변경하시기 바랍니다."
			},{
				type: "title",
				title: "인터넷 회선 유형: 동적IP",
			},{
				type: "name",
				title: "동적 IP",
				content: "ISP에서 동적 IPv6 주소 할당을 제공하면 이 유형을 선택합니다."
			},{
				type: "name",
				title: "IPv6 주소/기본 DNS/보조 DNS",
				content: "이 변수들을 자동으로 ISP의 DHCPv6 서버에서 할당받습니다."
			},{
				type: "name",
				title: "갱신",
				content: "이 버튼을 클릭하여 새 IPv6변수를 DHCPv6서버에서 할당받습니다."
			},{
				type: "name",
				title: "해제",
				content: "ISP의 DHCPv6 서버에서 할당 받은 IPv6 주소를 해제하려면 이 버튼을 클릭합니다."
			},{
				type: "name",
				title: "IPv6 주소를 가져오기",
				content: "ISP에 따라, 일시적이 아닌 IPv6 주소를 받으려면  DHCPv6, 공유기 알림 패킷에서 생성된  IPv6 주소를 받으려면 SLAAC를 선택합니다."
			},{
				type: "name",
				title: "접두어 위임",
				content: "ISP에서 DHCPv6 서버에 의해 접두어 위임을 받으려면 사용, 수동으로 주소 접두사를 지정하려면 사용 안함을 선택합니다. LAN에 연결된 클라이언트는 이 접두사와 IPv6 주소를 생성합니다."
			},{
				type: "name",
				title: "DNS 주소",
				content: "\"ISP에서 동적으로 가져오기\" 또는 \"다음 DNS 주소를 사용하기\"를 선택합니다. \"다음 DNS 주소를 사용하기\"를 선택하면 수동으로 ISP에서 제공하는 DNS 주소를 입력하시기 바랍니다."
			},{
				type: "name",
				title: "기본 도메인",
				content: "그 변수들을 수동으로 입력하거나 ISP에서 자동으로 할당됩니다."
			},{
				type: "title",
				title: "인터넷 회선 유형: PPPoE"
			},{
				type: "name",
				title: "PPPoE",
				content: "ISP가 PPPoEv6을 사용하고 사용자 이름과 비밀번호를 제공하면 이 유형을 선택합니다."
			},{
				type: "name",
				title: "사용자 이름/비밀번호",
				content: "ISP가 제공하는 변수를 입력합니다."
			},{
				type: "name",
				title: "IPv6 주소",
				content: "사용자 이름과 비밀번호를 입력하고 연결을 클릭 한 후, ISP에서 DHCPv6 서버에서 자동으로 할당받습니다."
			},{
				type: "name",
				title: "DNS 주소",
				content: "\"ISP에서 동적으로 가져오기\" 또는 \"다음 DNS 주소를 사용하기\"를 선택합니다. \"다음 DNS 주소를 사용하기\"를 선택하면 수동으로 ISP에서 제공하는 DNS 주소를 입력하시기 바랍니다."
			},{
				type: "name",
				title: "IPv6 주소를 가져오기",
				content: "ISP에 따라, 일시적이 아닌 IPv6 주소를 받으려면  DHCPv6, 공유기 알림 패킷에서 생성된  IPv6 주소를 받으려면 SLAAC, 수동으로 IPv6 주소를 입력하려면  ISP에서 받기를 선택합니다."
			},{
				type: "name",
				title: "접두어 위임",
				content: "ISP에서 DHCPv6 서버에 의해 접두어 위임을 받으려면 사용, 수동으로 주소 접두사를 지정하려면 사용 안함을 선택합니다. LAN에 연결된 클라이언트는 이 접두사와 IPv6 주소를 생성합니다."
			},{
				type: "name",
				title: "연결",
				content: "이 버튼을 클릭하여 인터넷을 연결합니다."
			},{
				type: "name",
				title: "연결 끊기",
				content: "인터넷 연결을 해제하려면 이 버튼을 클릭합니다."
			},{
				type: "title",
				title: "인터넷 연결 유형 : 6to4 Tunnel"
			},{
				type: "name",
				title: "6to4 터널",
				content: "ISP가 주소 설정을 위해 6to4 개발을 사용한다면, 이 유형을 선택합니다."
			},{
				type: "name",
				title: "IPv4주소/IPv4 서브넷 마스크/IPv4 기본 게이트웨이/Tunnel 주소",
				content: "연결을 클릭 한 후 이러한 변수들이 WAN 포트의 IPv4 정보에 의해 자동으로 생성됩니다."
			},{
				type: "name",
				title: "다음 DNS 서버 사용",
				content: "ISP가 제공한기본 DNS 및/또는 보조 DNS를 수동으로 입력하려면 확인란을 선택합니다."
			},{
				type: "name",
				title: "연결",
				content: "이 버튼을 클릭하여 인터넷을 연결합니다."
			},{
				type: "name",
				title: "연결 끊기",
				content: "인터넷 연결을 해제하려면 이 버튼을 클릭합니다."
			}/*,{
				type: "title",
				title: "인터넷 연결 유형 : 6RD"
			},{
				type: "name",
				title: "6RD",
				content: "ISP가 6RD 배포를 사용하고  IPv4 주소와 IPv6 주소 접두사를 제공하는 경우 이 유형을 선택합니다."
			},{
				type: "name",
				title: "구성 유형",
				content: "ISP에 따라 자동 또는 수동을 선택해서 6RD 채널 변수를 구성합니다."
			},{
				type: "name",
				title: "기본 변수가 ISP에서 제공한 것과 일치하면 자동을 선택할 수 있습니다. 그렇지 않으면 수동을 선택하고 ISP에서 제공한 변수를 입력합니다.",
				content: "사전설정된 매개변수가 ISP에서 제공한 매개변수와 일치하는 경우 체크하십시오. 기본값을 유지하거나, ISP에서 제공한 매개변수를 수동으로 입력할 수 있습니다."
			},{
				type: "title",
				title: "인터넷 연결 유형 : DS-Lite"
			},{
				type: "name",
				title: "DS-Lite",
				content: "ISP가 DS 라이트 배포를 사용하는 경우 이 유형을 선택하고 AFTR 도메인 이름 또는 IPv6 주소를 제공하는 경우 이 유형을 선택하여 IPv6 네트워크에서의 IPv4-in-IPv6 터널을 설정하는 것으로 IPv4 트래픽 또는 IPv6 트래픽이 각각의 네트워크에 통신합니다."
			},{
				type: "name",
				title: "AFTR 이름",
				content: "AFTR가 단기 주소 전환 공유기입니다. 입력칸에 ISP에서 제공하는  AFTR 도메인 이름 또는 IPv6 주소를 입력합니다."
			},{
				type: "name",
				title: "보조 연결",
				content: "ISP에서 제공하는 보조 연결 유형을 선택합니다.",
				children :[ 
				{
					type: "name",
					title: "동적 IP",
					content: "ISP가 보조 연결 유형으로 동적 IP를 제공하는 경우 선택하고,  ISP의 DHCPv6 서버에 의해  매개 변수, IPv6 주소, 기본 DNS 및/또는 보조 DNS는자동으로 할당됩니다."
				},
				{
					type: "name",
					title: "고정 IP",
					content: "ISP가 보조 연결 유형으로 고정 IP를 제공하는 경우 선택하고,  ISP가 제공한 IPv6 주소, 기본 게이트웨이, 기본 DNS 및/또는 보조 DNS를 입력 한 후 (필요한 경우) 수동으로 MTU 크기를 구성하거나 기본값을 유지합니다."
				},{
					type: "name",
					title: "PPPoE",
					content: "ISP가 보조 연결 유형으로 PPPoE를 제공하는 경우 선택하고 ISP가 제공한 사용자 이름/비밀번호를 입력합니다. 연결을 클릭한 후 IPv6 주소가 자동으로 할당됩니다."
				}]
			}*/,{
				type: "title",
				title: "인터넷 연결 유형: 통과 (브리지)"
			},{
				type: "paragraph",
				content: "ISP가 Pass Through (브리지) 네트워크 배포를 사용하는 경우 이 유형을 선택합니다. 이러한 유형은 변수가 제공되지 않고 구성이 필요하지 않습니다."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		IPV6_LAN: {
			TITLE: "LAN",
			CONTENT: [{
				type: "paragraph",
				content: "통과(브릿지)를 제외하고, 다른 6가지 유형의 인터넷 연결은 IPv6 구성이 필요합니다."
			},{
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
					},{
						type: "name",
						title: "해제 시간",
						content: "할당된 IP 주소의 유효 기간을 의미합니다. 기본 86,400초 유지하며 ISP가 필요한 경우 변경합니다."
					},{
						type: "name",
						title: "주소",
						content: "ISP의 DHCPv6 서버에서 자동으로 할당된 IP 주소입니다."
					}]
				},{
					type: "name",
					title: "SLAAC + 태형 DHCP",
					connector:" ",
					children: [{
						type: "name",
						title: "주소 접두사",
						content: "ISP가 제공 한 접두사를 입력합니다."
					},{
						type: "name",
						title: "주소",
						content: "ISP에 의해 자동으로 할당된 IP 주소입니다."
					}]
				},{
					type: "name",
					title: "SLAAC+RDNSS",
					connector:" ",
					children: [{
						type: "name",
						title: "주소 접두사",
						content: "ISP가 제공 한 접두사를 입력합니다."
					},{
						type: "name",
						title: "주소",
						content: "ISP에 의해 자동으로 할당된 IP 주소입니다."
					}]
				}]
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		IPV6_MAC_CLONE: {
			TITLE: "MAC 클론",
			CONTENT: [{
				type: "name",
				title: "초기 MAC 주소 사용",
				content: "ISP가 MAC 주소에 할당된 IP 주소를 바인딩 하지 않는 경우 공유기의 기본 MAC 주소를 변경하지 마십시오."
			},{
				type: "name",
				title: "컴퓨터 MAC 주소 사용",
				content: "ISP가 컴퓨터의 MAC 주소에 할당된 IP 주소를 바인딩한 경우에 현재 공유기에 연결되는 컴퓨터의 MAC 주소를 복제합니다.."
			},{
				type: "name",
				title: "사용자 PC의 MAC 주소",
				content: "인터넷 서비스 제공업체가 특정 MAC 주소에 IP 주소를 할당하는 경우, 수동으로 MAC 주소를 입력하십시오."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		TIME_SETTING: {	
			TITLE: "시간설정",
			CONTENT: [{
				type: "step",
				title: "자동시간 설정",
				content: [
					"1. 시간설정에서, 인터넷을 통한 자동설정을 선택합니다.",
					"2. 해당지역 시간대를 선택합니다.",
					"3. NTP서버1에서 희망하는 NTP서버의  IP주소 또는 도메인 이름을 입력합니다.",
					"4. NTP서버2에서 두번때 NTP서버의 IP주소 또는 도메인 이름을 입력합니다.(옵션)",
					"5. 가져오기를 클릭합니다.",
					"6. 저장을 클릭합니다."
				]
			},{
				type: "step",
				title: "수동으로 날짜와 시간 설정합니다.",
				content: [
					"1. 시간설정에서 수동을 선택합니다.",
					"2. 현재 날짜를 입력합니다.",
					"3. 현재 시간을 입력합니다.(24시간 방식 예. 16:00:00은 오후4시입니다.)",
					"4. 저장을 클릭합니다."
				]
			}]
		},
		
		TIME_SETTING_DAYLIGHT: {	
			TITLE: "일광절약시간제(썸머타임)",
			CONTENT: [{
				type: "step",
				title: "일광절약시간제 설정하기",
				content: [
					"1. 일광절약시간제를 선택합니다.",
					"2. 해당 지역시간대의 일광절약시간제 시작 시간과 날짜를 선택합니다.",
					"3. 해당 지역시간대의 일광절약시간제 마감 시간과 날짜를 선택합니다.",
					"4. 저장을 클릭합니다."
				]
			}]
		},
		DIGNOSTIC: {	
			TITLE: "진단도구",
			CONTENT: [{
				type: "paragraph",
				content: "ping은 패킷을 사용하여 타겟 IP주소 또는 도메인 이름과 로그기록에 주고/받기를 진행합니다. Tracerout도구는 패킷을 사용하여 타겟 IP주소 또는 도메인이름, hop와 목적지 도달시간의 숫자를 표시합니다."
			},{
				type: "paragraph",
				content: "IP주소 또는 도메인 이름 예를 들어 google.com, yahoo.com으로 ping과 tracerout 할 수 있습니다."
			},{
				type: "step",
				title: "Ping 사용하여 진단하기",
				content: [
					"1. 타겟 IP주소 또는 도메인 이름을 입력합니다.",
					"2. 화살아이콘을 클릭하여 우선메뉴와 Ping 카운트, Ping 패킷사이지를 설정합니다.(옵션)",
					"3. 시작을 클릭합니다."
				]
			},{
				type: "step",
				title: "Traceroute 사용하여 진단하기",
				content: [
					"1. 타겟 IP주소 또는 도메인 이름을 입력합니다.",
					"2. 화살아이콘을 클릭하여 우선메뉴와 Traceroute Max TTL(Time to live) 필드에 hop 회수(도달)을 입력합니다. 기본설정값은 20입니다.(옵션)",
					"3. 시작을 클릭합니다."
				]
			}]
		},
		FIRMWARE: {	
			TITLE: "펌웨어 업그레이드",
			CONTENT: [{
				type: "paragraph",
				content: "공유기 펌웨이어를 업그레이드 하시기 전에 <a class=\"link\" href=\"javascript:void(0);\" id=\"update_url\" target=\"_blank\">TP-LINK</a> 홈페이지에서 최신의 펌웨이어를 다운받으셔야 됩니다. "
			},{
				type: "step",
				title: "중요:업그레이트 실패시, 다음을 참조하세요:",
				content: [
					"하드웨어 버전과 최근 펌웨어 버전에 일치하는지 확인하세요.(펌웨어 업그레이드 페이지 참조)",
					"공유기와 컴퓨터간 연결에 문제가 없는지 확인 하세요. 무선을 통한 펌웨어 업그레이드는 불안정할 수 있습니다.",
					"데이터 유실을 막기 위하여 펌웨어 업그레이드 전 공유기와 연결된 모든 USB기기를 제거해 주세요.",
					"공유기 설정을 백업하세요.",
					"펌웨어 업그레이드중 공유기 전원을 끄지 마세요."
				]
			},{
				type: "step",
				title: "공유기의 펌웨어를 업그레이드하려면",
				content: [
					"1. 브라우즈를 클릭하세요",
					"2. 펌웨어 파일을 다운받은 경로를 지정하세요.",
					"3. 업그레이를 클릭하세요"
				]
			},{
				type: "paragraph",
				content: "업그레이드는 몇분간의 시간이 필요합니다. 업그레이드 진행중 절대 전원을 끄지 마십시오."
			}]
		},
		
		BACKUP: {	
			TITLE: "백업",
			CONTENT: [{
				type: "paragraph",
				content: "현재 설정을 백업하시길 추천합니다. 시스템 재설정시 공장초기화에서 바로 복구하기 위함입니다."
			},{
				type: "paragraph",
				content: "백업을 클릭하여 현재설정을 저장하십시오. 백업파일은 차후 복구를 위하여 안전한 장소에 저장하십시오."
			}]
		},
		
		RESTORE: {
			TITLE: "복구",
			CONTENT: [{
				type: "step",
				title: "백업으로부터 복구하기",
				content: [
					"1. 브라우즈를 클릭하세요",
					"2. 백업파일의 경로를 지정하세요.",
					"3. 복구를 클릭하세요."
				]
			}]
		},
		
		FACTORY: {
			TITLE: "공장초기화",
			CONTENT: [{
				type: "paragraph",
				content: "공장초기화를 클릭하여 공유기 최초 설정으로 초기화합니다."
			},{
				type: "step",
				title: "주의",
				content: [
					"1. 공장 복원하면 공유기에 구성한 모든 설정이 지워집니다. 공유기의 관리 페이지에 다시 로그인하려면 사용자 이름과 비밀번호에 모두 기본 admin을 사용합니다.",
					"2. 백업하는 동안 공유기의 전원을 끄거나 프로세스를 복원하지 마십시오."
				]
			}]
		},
		
		
		ADMIN_ACCOUNT: {	
			TITLE: "관리계정",
			CONTENT: [{
				type: "paragraph",
				content: "이 페이지는 로그인 사용자이름과/또는 비밀번호 변경 그리고 비밀번호 복구를 위한 이메일 주소를 설정할 수 있습니다."
			},{
				type: "name",
				title: "이전 사용자이름",
				content: "현재 사용자 이름을 입력합니다."
			},{
				type: "name",
				title: "이전 비밀번호",
				content: "현재 비밀번호를 입력합니다."
			},{
				type: "name",
				title: "새로운 사용자이름",
				content: "새로운 사용자이름을 입력합니다."
			},{
				type: "name",
				title: "새로운 비밀번호",
				content: "새로운 비밀번호를 입력합니다."
			},{
				type: "name",
				title: "새로운 비밀번호 확인",
				content: "새로운 비밀번호를 다시 입력합니다."
			},{
				type: "note",
				title: "주의",
				content: "참조: 현재 사용자이름과 비밀번호를 변경하시려면 새로운 로그인 정보를 안전한 곳에 적어둘 것을 권장합니다."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		ADMIN_RECOVERY: {
			TITLE: "비밀번호 복구",
			CONTENT: [{
				type: "name",
				title: "비밀번호 복구 활성화",
				content: "비밀번호 복구 기능을 사용하는 것이 좋습니다. 이메일을 통해 사용자 이름과 비밀번호를 재설정하는데 도움이 됩니다"
			},{
				type: "name",
				title: "발송메일",
				content: "발송할 이메일주소를 입력하세요"
			},{
				type: "name",
				title: "받을메일",
				content: "받을 이메일주소를 입력하세요"
			},{
				type: "name",
				title: "SMTP서버",
				content: "공유기가 이메일로 인증 코드를 전송하는 데 사용하는 SMTP 서버 주소를 입력합니다."
			},{
				type: "name",
				title: "인증 사용",
				content: "이메일을 보내는데 인증이 필요한 경우 사용자이름과 비밀번호를 해당 필드에 입력하세요. 이 필드는 대소문자를 구분합니다."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		ADMIN_LOCAL: {	
			TITLE: "로컬 관리",
			CONTENT: [{
				type: "paragraph",
				content: "MAC주소로 인증한 공유기에 접근하도록 사용자 LAN상의 클라이언트 기기의 숫자를 제한합니다."
			},{
				type: "name",
				title: "모든 LAN에 연결된 기기 접근하기",
				content: "활성화시 모든 LAN 연결된 기기들의 관리가 가능하고 비활성화시 특별한 기기들만 관리가 가능합니다."
			},{
				type: "name",
				title: "MAC 주소",
				content: "제한된 접속기기의 MAC주소를 표시합니다."
			},{
				type: "name",
				title: "설명",
				content: "제한된 접속기기의 간단한 설명을 표시합니다."
			},{
				type: "name",
				title: "상태",
				content: "제한된 접속기기의 현재상태를 표시합니다.(활성화 또는 비활성화)"
			},{
				type: "name",
				title: "수정",
				content: "리스트상의 해당 기기를 변경하고 삭제할수 있는 옵션을 표시합니다."
			},{
				type: "step",
				title: "리스트에 클라이언트 기기 추가하기",
				content: [
					"1. 추가를 클릭합니다.",
					"2. 현재기기 보기를 클릭하여 현재 기기를 선택하거나 MAC주소 필드에 기기의 MAC주소를 입력합니다.",
					"3. 기기의 설명을 입력합니다.",
					"4. 상태 사용함을 선택하십시오.",
					"5. OK 버튼을 클릭하십시오."
				]
			},{
				type: "step",
				title: "리스트에 기기를 변경하거나 삭제하기",
				content: "테이블에서, 수정하거나 삭제하려는 기기에 해당하는 편집 아이콘 또는 쓰레기통 아이콘을 클릭합니다."
			},{
				type: "step",
				title: "여러기기 삭제하기",
				content: "삭제를 원하는 모든 기기를 선택하여 삭제를 클릭합니다."
			}]
		},
		ADMIN_REMOTE: {	
			TITLE: "원격관리",
			CONTENT: [{
				type: "paragraph",
				content: "원격관리 기능은 사용자가 인터넷을 통하여 원격으로 공유기의 접근과 환경설정을 가능하게 합니다."
			},{
				type: "name",
				title: "원격관리 비활성화",
				content: "원격관리 비활성화 옵션을 선택하세요."
			},{
				type: "name",
				title: "모든기기의 원격관리 활성화",
				content: "모든 IP주소의 원격관리 활성화 옵션을 선택세요. 활성화시 웹관리 포트 필드에 들어갑니다."
			},{
				type: "name",
				title: "특정기기 원격관리 활성화",
				content: "특정 IP주소의 원격관리 활성화 옵션을 선택하세요. 활성화시 웹관리 포트와 원격관리 IP주소 필드에 들어갑니다."
			},{
				type: "name",
				title: "웹 관리 포트",
				content: "공유기 접근 보안을 위한 1024와 65535 사이에 포트넘버를 입력하세요. 일반적으로 웹브라우저는 스탠다드 HTTP 서비스 포트 80을 사용합니다. 기본값과 보통 서비스 포트는 HTTP의 유동서비스 포트 8080입니다."
			},{
				type: "name",
				title: "IP주소 관리 원격지원",
				content: "유효한 IP 주소를 입력하여 공유기에 접근합니다. "
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		
		SYSTEM_LOG: {	
			TITLE: "시스템로그",
			CONTENT: [{
				type: "paragraph",
				content: "시스템로그 페이지는 공유기의 가장 최근의 활동(이벤트) 리스트를 표시합니다. 사용자가 보기 원하는 로그의 타입과/ 또는 로그의 레벨을 규정할 수 있습니다. 또한 자동으로 특정 이메일 주소 또는 컴퓨터에 로그파일 내보내기를 설정할 수 있습니다."
			},{
				type: "name",
				title: "타입",
				content: "표시할 시스템로그의 형식을 선택합니다."
			},{
				type: "name",
				title: "레벨",
				content: "표시할 시스템로그의 레벨을 선택합니다."
			},{
				type: "name",
				title: "새로고침",
				content: "아이콘을 클릭하여 시스템 로그를 업데이트 합니다."
			},{
				type: "name",
				title: "모두삭제",
				content: "아이콘을 클릭하여 모든 시스템 로그를 삭제합니다."
			},{
				type: "name",
				title: "로그저장",
				content: "버튼을 클릭하여 로컬컴퓨터에 모든 시스템 로그파일을 다운로드합니다."
			},{
				type: "name",
				title: "메일설정",
				content: "버튼을 클릭하여 시스템로그의 이메일을 설정합니다."
			},{
				type: "step",
				title: "시스템로그 이메일 설정하기",
				content: [
					"1. 메일설정을 클릭하세요",
					"2. 발송메일 - 발송할 이메일주소를 입력하세요",
					"3. 받을메일 - 받을 이메일주소를 입력하세요",
					"4. SMTP서버 - 이메일을 통해 공유기 계정정보를 받으시려면 SMTP 서버주소를 입력하세요",
					{
						content: "5. 인증활성화 - 메일발송시 SMTP서버인증이 필요한 경우 해당 옵션을 선택하세요.",
						children: [{
							type: "name",
							title: "사용자이름",
							content: "SMTP서버의 사용자이름을 입력하세요. 해당 필드는 대소문자를 구분합니다."
						},{
							type: "name",
							title: "비밀번호",
							content: "SMTP서버의 비밀번호를 입력하세요. 해당 필드는 대소문자를 구분합니다."
						}]
					},{
						content: "6. 자동메일 활성화 - 자동으로 언제 시스템로그를 보낼지 지정할 수 있습니다.",
						children: [{
							type: "paragraph",
							content: "매일 특정시간에 시스템 로그를 받으시려면, 시간(HH)과 분(MM)을 24시간 형식으로 입력하세요. 예.16:00는 오후4시입니다."
						},{
							type: "paragraph",
							content: "특정한 시간 또는 시간단위로 시스템 로그를 받으시려면 시간의 단위를 입력하세요"
						}]
					},
					"7. 저장을 클릭합니다."
				]
			}]
		},

		TRAFFIC_STATISTIC: {	
			TITLE: "트래픽 통계",
			CONTENT: [{
				type: "paragraph",
				content: "트래픽 통계 페이지는 LAN,WAN 그리고 WLAN에서 패킷을 주고받는 네트워크 트랙픽을 표시합니다."
			},{
				type: "name",
				title: "트래픽 통계",
				content: "통계 정보를 표시할 수 있도록 토글합니다."
			}]
		},
		TRAFFIC_STATISTIC_LIST: {	
			TITLE: "트래픽 통계 리스트",
			CONTENT: [{
				type: "name",
				title: "IP주소/MAC주소",
				content: "관련된 클라이언트 기기의 IP주소와 MAC주소를 표시합니다."
			},{
				type: "name",
				title: "패킷 총합",
				content: "세션이 시작했을때부터 혹은 이전 카운터에서 리셋된 시점으로부터 주고 받은 패킷의 숫자를 표시합니다."
			},{
				type: "name",
				title: "바이트 총합",
				content: "세션이 시작했을때부터 혹은 이전 카운터에서 리셋된 시점으로부터 주고 받은 바이트의 숫자를 표시합니다."
			},{
				type: "name",
				title: "현재 패킷",
				content: "특정 시간대별 주고받은 패킷의 숫자를 표시합니다."
			},{
				type: "name",
				title: "현재 바이트",
				content: "특정 시간대 주고받은 바이트의 숫자를 표시합니다."
			},{
				type: "name",
				title: "수정",  
				content: "리스트 해당 통계의 초기화(0)과 삭제 옵션을 표시합니다."
			},{
				type: "name",
				title: "새로고침",
				content: "페이지 통계정보를 업데이트합니다."
			},{
				type: "name",
				title: "모두 초기화",
				content: "모든 통계정보를 초기화 합니다."
			},{
				type: "name",
				title: "모두삭제",
				content: "리스트의 모든 통계 정보를 삭제합니다."
			}]
		},
		
		SYSTEM_PARA_WIRELESS: {	
			TITLE: "2.4GHz/5GHz/60GHz 무선",
			CONTENT: [{
				type: "name",
				title: "신호 간격",
				content: "40부터 1000 사이의 밀리세컨드를 입력하여 동기화된 무선네트워크 공유기의 신호패킷 사이의 간격을 정한다. 기본값은 100밀리세컨드입니다."
			},{
				type: "name",
				title: "RTS한계점",
				content: "공유기를 통한 전송데이터의 패킷 사이즈를 1부터 2346사이로 정한다. RTS(Request to Send) 한계점 기본값은 2346입니다. 만약 패킷사이즈가 기존한계점보다 클경우 공유기는 RTS 프레임을 보내 분할하여 전송하고 데이터 프레임 전송을 절충하거나 남은 패킷을 즉시 전송한다."
			},{
				type: "name",
				title: "DTIM 간격",
				content: "Delivery Traffic Indication Message(DTIM)의 간격을 정한다. 1부터 15사이의 밀리세컨드 값을 입력한다. 기본값은 1이다. DTIM간격은 신호간격과 동일하다."
			},{
				type: "name",
				title: "그룹키 업데이트 기간",
				content: "초단위(최소30)을 입력하여 암호화된 키 자동 갱신 간격을 정한다. 기본값은 0이다. 키갱신 하지 않는 것을 나타낸다."
			},{
				type: "name",
				title: "다중 사용자-MIMO",
				content: "이 기술은 공유기로 하여금 한번에 최대 세개 기기와  포인트-투-포인트 연결을 할 수 있게 합니다. 이 기술은 인터넷 속도를 크게 향상시키고 전통적인 기술보다 기기의 대기시간을 크게 줄였습니다. 또한 공유기로 하여금 동시에 더 많은 클라이언트가 Wi-Fi를 사용할 수 있게 합니다."
			},{
				type: "name",
				title: "WMM특성",
				content: "WMM기능은 패킷이 최우선 순위로 전송될 것을 보장한다. 기본적으로 활성화할 것을 권장합니다."
			},{
				type: "name",
				title: "짧은 GI 특성",
				content: "기본적으로 활성화할 것을 권하며 Guard Interval(GI)시간을 줄여 데이터량을 늘린다."
			},{
				type: "name",
				title: "AP Isolation 특성",
				content: "상호 인터랙팅을 통해 사용자의 네트워크에 연결된 모든 무선 장치를 확인 및 제한하는 한편 사용자는 여전히 인터넷에 액세스할 수 있게 하려면, AP 격리 활성화 확인란을 선택합니다."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		SYSTEM_PARA_WDS: {	
			TITLE: "2.4GHz/5GHz WDS",
			CONTENT: [{
				type: "name",
				title: "WDS 브리지 사용",
				content: "무선로컬 네트워크(WLAN)에서 공유기가 다른 접속포인트(AP)와 연결할 수 있도록 WDS(Wireless Distrbution System)을 활성화합니다. 만약 이 특성이 활성화하려면 다음 설정을 따라하세요.",
			},{
				type: "name",
				title: "SSID (브리지)",
				content: "공유기가 연결되는 클라이언트로서의 WAP(무선액세스포인트)의 SSID를 입력하거나, 사용 가능한 모든 네트워크를 확인하기 위해 검색 기능을 사용합니다."
			},{
				type: "name",
				title: "무선랜 검색",
				content: "이 버튼을 클릭하시면 같은 영역대의 모든 가능한 무선 네트워크의 SSID,BSSID, 신호크기, 채널과 보안정보를 검색하여 표시합니다. 네트워크를 선택하면 SSID, MAC주소와 보안이 자동으로 입력됩니다."
			},{
				type: "name",
				title: "MAC 주소 (브리지)",
				content: "공유기가 클라이언트로 접속할 엑세스 포인트의 MAC 주소(BSSID)를 12자리 16진수로(0-9, a-f, A-F)하이픈으로 구분해 입력해 주십시오. Survey기능을 이용해 원하는 AP를 선택한 경우 MAC 주소 칸은 자동으로 들어갑니다."
			},{
				type: "name",
				title: "WDS 모드",
				content: "WDS모드, 오토, WDS1 또는 WDS2를 선택하세요"
			},{
				type: "name",
				title: "보안",
				content: "선택된 AP의 보안형식을 선택하세요. 만약 희망하는 AP를 선택하시면 자동으로 Survey특성을 통하여 보안 필드에 자동으로 입력됩니다.",
				children: [{
					type: "name",
					title: "비밀 번호",
					content: "이 옵션은 보안형식이 WPA-PS/WPA2-PSK일 경우 활성화 됩니다. 선택한 AP의 비밀번호를 입력하세요."
				},{
					type: "name",
					title: "인증 유형",
					content: "이 옵션은 보안형식이 WEP(Wired Equivalent Privacy)일 경우 활성화 됩니다. 선택된 AP에서 사용하는 인증 형식을 선택하세요(자동, 오픈시스템 또는 키공유)."
				},{
					type: "name",
					title: "WEP 키 형식",
					content: "이 옵션은 보안형식이 WEP일 경우 활성화 됩니다. 선택된 AP에서 사용하는 키포멧(ASCII 또는 Hexadecimal)을 선택하세요"
				}]
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		SYSTEM_PARA_WPS: {	
			TITLE: "WPS",
			CONTENT: [{
				type: "paragraph",
				content: "WPS 활성화 체크박스를 선택하요 저장을 클릭하여 WPS(Wi-Fi 보안설정)을 활성화합니다. 버튼으로 쉬운 WPS 기능 설정이 가능합니다."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		SYSTEM_PARA_NAT: {
			TITLE: "NAT",
			CONTENT: [{
				type: "name",
				title: "NAT",
				content: "NAT활성화 체크박스를 선택하고 저장을 클릭하면 NAT(Network Address Translation)기능 활성화됩니다."
			},{
				type: "note",
				title: "주의",
				content: "NAT가 비활성화 상태일 때에는, NAT 포워딩 구성이 적용되지 않습니다."
			}/*,{
				type: "name",
				title: "NAT부스트",
				content: "NAT부스트 활성화 체크박스를 선택하고 저장을 클릭하면 공유기가 최고의 처리량을 보장해줍니다."
			},{
				type: "note",
				title: "주의",
				content: "참조: NAT부스트 활성화시, QoS와 트래픽 통계는 자동으로 비활성화 됩니다."
			}*/,{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		SYSTEM_PARA_DOS: {
			TITLE: "DoS 보호 수준 설정",
			CONTENT: [{
				type: "paragraph",
				content: "DoS 보호 레벨은 ICMP-FLOOD, UDP-FLOOD, 및 TCP-FLOOD 공격으로부터 공유기를 보호합니다."
			},{
				type: "name",
				title: "ICMP-FLOOD 패킷 레벨",
				content: "5부터 7200 사이 ICMP 패킷값을 입력하세요. 한계치를 초과하는 패킷 발생 시 즉시 ICMP-FLOOD 보호가 작동합니다."
			},{
				type: "name",
				title: "UDP-FLOOD 패킷 레벨",
				content: "5부터 7200 사이 UDP 패킷값을 입력하세요. 한계치를 초과하는 패킷 발생 시 즉시 UDP-FLOOD 보호가 작동합니다."
			},{
				type: "name",
				title: "TCP-FLOOD 패킷 레벨",
				content: "5부터 7200 사이 TCP-SYN 패킷값을 입력하세요. 한계치를 초과하는 패킷 발생 시 즉시 TCP-SYN-FLOOD 보호가 작동합니다."
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		SYSTEM_PARA_DUPLEX: {
			TITLE: "이중",
			CONTENT: [{
				type: "name",
				title: "이중",
				content: "드롭다운 리스트에서 이중 형식을 선택하세요"
			},{
				type: "paragraph",
				content: "입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		SYSTEM_PARA_LED:{
			TITLE: "LED",
			CONTENT: [{
				type: "name",
				title: "야간 모드 사용",
				content: "공유기 성능에 영향을 주지 않고 야간 모드 기간 동안 LEDs를 끄려면 이 확인란을 선택합니다."
			},{
				type: "name",
				title: "야간 모드 기간",
				content: "시간 일정을 선택하여 LED를 끕니다."
			},{
				type: "paragraph",
				content: "모든 설정을 저장하려면 저장 버튼 클릭하십시오."
			}]
		},
		OPEN_VPN:{
			TITLE: "VPN 열기",
			CONTENT: [{
				type: "paragraph",
				content: "OpenVPN에서는 인터넷을 이용해 외부에서 안전하게 홈 네트워크에 접속하실 수 있습니다. VPN 서비스를 사용하시려면 Dynamic DNS서비스(권장됨) 또는 공유기 WAN포트의 스태틱 IP 주소를 지정해줘야 합니다. 또한 시스템 시간이 인터넷으로 동기화되어 있어야 합니다."
			},{
				type: "name",
				title: "VPN 서버 사용",
				content: "OpenVPN 서버를 활성화 시키려면 선택하십시오."
			},{
				type: "name",
				title: "서비스 타입",
				content: ""
			},{
				type: "name",
				title: "서비스 포트",
				content: "커뮤니케이션 포트 번호를 1024에서 65535사이의 숫자로 입력하십시오. 기본 서비스 포트 번호는 1194입니다."
			},{
 				type: "name",
				title: "VPN 서브넷/넷마스크",
				content: "OpenVPN 서버를 통해 클라이언트에게 대여할 IP 주소의 범위를 입력해 주십시오."
			},{
				type: "name",
				title: "클라이언트 접속",
				content: "OpenVPN 클라이언트의 액세스 유형을 선택합니다.",
				children: [{
				type: "name",
				title: "홈 네트워크만",
					content: "클라이언트는 홈 네트워크에만 접속할 수 있습니다. 클라이언트의 기본 루트는 변경할 수 없습니다."
			},{
				type: "name",
				title: "인터넷 및 홈 네트워크",
					content: "클라이언트는 홈 네트워크 및 인터넷 사이트나 서비스에 접속할 수 있으며 해외에서 접속하는 경우 지역적 한계가 있을 수 있습니다. 클라이언트의 기본 루트를 변경할 수 있습니다."
				}]
			}]
		},
		OPEN_VPN_CERTIFICATE:{
			TITLE: "인증서",
			CONTENT: [{
				type: "paragraph",
				content: "원격 클라이언트용 VPN접속의 정보와 아이덴티티에 인증서를 사용합니다."
			},{
				type: "name",
				title: "생성",
				content: "새 인증서를 작성하려면 클릭하십시오."
			}]
		},
		OPEN_VPN_CONF:{
			TITLE: "구성 파일",
			CONTENT: [{
				type: "paragraph",
				content: "원격 클라이언트는 설정(Configuration) 파일을 이용해 고객님의 공유기에 접속할 수 있습니다."
			},{
				type: "name",
				title: "내보내기",
				content: "OpenVPN 설정 파일을 저장하려면 클릭하십시오."
			}]
		},
		OPEN_VPN_GUIDE:{
			TITLE: "VPN 클라이언트 설치 가이드",
			CONTENT: [{
				type: "step",
				title: "OpenVPN서버에 클라이언트 기기를 접속하려면",
				content:[{
					type: "paragraph",
					content: "OpenVPN을 설정하기 전에 Dynamic DNS서비스(권장됨) 또는 공유기 WAN포트의 스태틱 IP 주소를 지정해줘야 합니다. 또한 NAT설정의 외부 포트 가 서비스 포트가 아니어야 하며 시스템 시간은 인터넷과 동기화되어 있어야 합니다."
				},
					"1. VPN 서버를 선택합니다.",
					"2. OpenVPN서버 파라미터를 설정하고(서비스 유형, 서비스 포트, 클라이언트 접속 및 VPN 서브넷/넷마스크) 저장하기를 클릭합니다.",
					"3. 설정 파일을 저장하려면 가져오기를 클릭합니다.",
					"4. OpenVPN클라이언트 유틸리티를 아래 주소에서 클라이언트 기기에 다운로드 및 설치합니다.<a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a><br> 공식 지원 플랫폼은 윈도우즈, 맥OSX, 리눅스 입니다.",
					"5. OpenVPN클라이언트 유틸리티를 실행한 뒤 저장한 설정 파일을 이용해 새 VPN 연결을 추가해 VPN 서버에 접속합니다."
				]},{
					type: "note",
					title: "주의",
					content: "OpenVPN 클라이언트에 대해 더 많은 것을 알고 싶으면, <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>를 방문하십시오."
				}]
		},
		PPTP_VPN:{
			TITLE: "PPTP VPN",
			CONTENT: [{
				type: "paragraph",
				content: "PPTP VPN에서는 인터넷을 이용해 외부에서 쉽고 빠르게 홈 네트워크에 접속하실 수 있습니다. 일부 ISP의 경우 사용이 불가능할 수도 있습니다. VPN 서비스를 사용하시려면 Dynamic DNS서비스(권장됨) 또는 공유기 WAN포트의 스태틱 IP 주소를 지정해줘야 합니다. 또한 시스템 시간이 인터넷으로 동기화되어 있어야 합니다."
			},{
				type: "name",
				title: "VPN 서버 사용",
				content: "PPTP VPN 서버를 활성화시키려면 선택하십시오."
			},{
				type: "name",
				title: "클라이언트 IP 주소",
				content: "PPTP VPN 서버가 클라이언트(최대 10명)에게 임대할 수 있는 IP 주소의 범위를 입력합니다."
			},{
 				type: "name",
				title: "Samba (Network Place) 접속 허용",
				content: "로컬 VPN클라이언트를 로컬 Samba 서버에 접속 허용하려면 선택하십시오."
			},{
				type: "name",
				title: "NetBIOS 패스스루 허용",
				content: "로컬 VPN클라이언트를 NetBIOS이름을 이용해 로컬 Samba 서버에 접속 허용하려면 선택하십시오."
			},{
				type: "name",
				title: "비 암호화된 접속 허용",
				content: "VPN 서버에 비암호화 접속을 허용하려면 선택하십시오."
			}]
		},
		PPTP_ACCOUNT_LIST:{
			TITLE: "계정 목록",
			CONTENT: [{
				type: "paragraph",
				content: "이 표에서는 원격 클라이언트가  PPTP VPN 서버에 접속할 수 있는 계정 목록을 보여줍니다."
			},{
				type: "step",
				title: "PPTP VPN 계정을 추가하려면",
				content: [
					"1. 추가를 클릭합니다.",
					"2. 사용자 이름과 비밀번호를 입력해 클라이언트를 PPTP VPN서버에 인증시킵니다.",
					"3. 확인을 클릭합니다."
				]
			},/*{
				type: "name",
				title: "사용자 이름 및 비밀번호",
				content: "PPTP VPN 서버에 클라이언트의 신원을 확인시키기 위하여 사용자 이름과 비밀번호를 입력합니다."
			},{
				type: "name",
				title: "수정",
				content: "해당 계정을 수정 또는 삭제하는 옵션을 표시합니다."
			}*/
			{
				type: "step",
				title: "기존 계정을 수정하거나 삭제하려면",
				content: "표 상에서 삭제 또는 수정하고 싶은 계정의 편집 아이콘을 클릭하거나 휴지통 아이콘을 클릭합니다."
			}]
		},
		PPTP_VPN_GUIDE:{
			TITLE: "VPN 클라이언트 설치 가이드",
			CONTENT: [{
				type: "step",
				title: "PPTP VPN서버에 클라이언트 기기를 접속하려면",
				content:[{
					type: "paragraph",
					content: "PPTP VPN을 설정하기 전에 Dynamic DNS서비스(권장됨) 또는 공유기 WAN포트의 스태틱 IP 주소를 지정해줘야 합니다. 또한 NAT설정의 외부 포트가 1723이 아니어야 하며 시스템 시간은 인터넷과 동기화되어 있어야 합니다."
				},
					"1. VPN 서버를 선택합니다.",
					"2. PPTP VPN 서버의 파라미터를 설정한 뒤 저장을 클릭하십시오.",
					"3. 클라이언트 기기에서 PPTP VPN연결을 생성합니다. 공식 지원 플랫폼은 윈도우즈, 맥OSX, 리눅스, iOS, 안드로이드 입니다.",
					"4. PPTP VPN프로그램을 실행한 뒤 새 연결을 추가하고 등록된 DDNS서비스나 WAN포트에 지정된 스태틱 IP 주소를 입력해 클라이언트 기기를 PPTP VPN서버에 연결합니다.",
				]}
			]
		},
		VPN_CONNNECTION:{
			TITLE: "VPN 연결",
			CONTENT: [{
				type: "paragraph",
				content: "이 페이지는 현재 공유기에 호스트된 OpenVPN 및 PPTP VPN 서버에 연결되어 있는 클라이언트를 표시합니다."
			},{
				type: "paragraph",
				content: "해당 클라이언트의 연결을 끊으려면 마이너스 아이콘을 클릭합니다."
			}]
		},
		BASIC_NETWORK_INTEREST: {
			TITLE: "인터넷",
			CONTENT: [{
				type: "name",
				title: "인터넷 상태",
				content: "공유기의 인터넷 연결 상태를 표시합니다."
			},{
				type: "name",
				title: "연결 유형",
				content: "인터넷 연결 유형을 표시합니다."
			},{
				type: "name",
				title: "IP 주소",
				content: "공유기 할당 된 인터넷 IP 주소를 표시합니다."
			},{
				type: "name",
				title: "보조 연결/IP 주소",
				content: "보조 연결 유형 및 IP 주소를 표시합니다."
			}]
		},
		BASIC_NETWORK_ROUTER: {
			TITLE: "공유기",
			CONTENT: [{
				type: "title",
				title: "2.4GHz/5GHz/60GHz 무선"
			},{
				type: "name",
				title: "SSID",
				content: "2.4GHz/5GHz/60GHz 주파수의 현재 무선 네트워크 이름을 보여줍니다."
			},{
				type: "name",
				title: "채널",
				content: "2.4GHz/5GHz/60GHz 무선 네트워크 방송의 채널을 보여줍니다."
			},{
				type: "name",
				title: "MAC",
				content: "2.4GHz/5GHz/60GHz 주파수 무선 네트워크의 MAC 주소를 보여줍니다."
			},{
				type: "title",
				title: "게스트 네트워트 2.4GHz/5GHz"
			},{
				type: "name",
				title: "상태",
				content: "무선 게스트 네트워크는 2.4GHz/5GHz의5GHz의에 있는지 여부를 표시합니다 (사용) 또는 (사용 안 함)."
			},{
				type: "name",
				title: "SSID",
				content: "게스트 네트워크의 무선 네트워크 이름을 표시합니다."
			}]
		},
		BASIC_NETWORK_CLIENTS: {
			TITLE: "유선/무선 클라이언트",
			CONTENT: [{
				type: "name",
				title: "이름",
				content: "고유기에 연결된 클라이언트의 이름을 표시합니다."
			},{
				type: "name",
				title: "IP 주소",
				content: "클라이언트의 할당 된 IP 주소를 표시합니다."
			},{
				type: "name",
				title: "MAC 주소",
				content: "클라이언트의 MAC 주소를 표시."
			}]
		},
		BASIC_NETWORK_PRINTER: {
			TITLE: "프린터",
			CONTENT: [{
				type: "name",
				title: "이름",
				content: "USB 포트를 통해 공유기에 연결된 프린터의 이름을 표시합니다."
			}]
		},
		BASIC_NETWORK_USB: {
			TITLE: "USB 디스크",
			CONTENT: [{
				type: "name",
				title: "USB 디스크",
				content: "공유기에 연결된 USB 디스크의 이름을 표시합니다. "
			},{
				type: "name",
				title: "합계",
				content: "연결된 USB 저장 장치의 전체 저장 용량을 표시합니다. "
			},{
				type: "name",
				title: "내장 공간",
				content: "연결된 USB 저장 장치의 사용 가능한 저장 용량을 표시합니다. "
			}]
		},
		BASIC_INTERNET: {
			TITLE: "인터넷",
			CONTENT: [{
				type: "name",
				title: "자동 감지",
				content: "공유기가 자동으로 ISP에서 제공하는 인터넷 연결 유형을 감지할 수 있습니다."
			},{
				type: "note",
				title: "주의",
				content: "참고 : 사용자의 인터넷 연결 유형이 확실하지 않은 경우, 자동 감지 기능을 사용하거나 ISP에 지원을 요청하십시오."
			},{
				type: "title",
				title: "인터넷 회선 유형: 고정IP",
			},{
				type: "name",
				title: "IP 주소/서브넷 마스크/기본 게이트웨이/기본 DNS/보조 DNS",
				content: "ISP가 제공하는 정보를 입력합니다."
			},{
				type: "title",
				title: "인터넷 회선 유형: 동적IP",
			},{
				type: "name",
				title: "현재 컴퓨터의 MAC 주소를 복제하지 마십시오",
				content: "당신의 MAC 주소를 복제할지 여부를 선택, 당신의 ISP에 따라"
			},{
				type: "title",
				title: "인터넷 회선 유형: PPPoE",
			},{
				type: "name",
				title: "사용자 이름/비밀번호",
				content: "인터넷 서비스 제공 희사 ISP에서 제공하는 사용자 이름과 비밀번호를 입력합니다."
			},{
				type: "title",
				title: "인터넷 회선 유형: L2TP/PPTP",
			},{
				type: "name",
				title: "사용자 이름/비밀번호",
				content: "인터넷 서비스 제공 희사 ISP에서 제공하는 사용자 이름과 비밀번호를 입력합니다."
			},{
				type: "name",
				title: "보조 연결 (동적 IP 또는 고정 IP)",
				children: [{
					type: "name",
					title: "동적 IP",
					content: "IP 주소와 서브넷 마스크는 ISP에 의해 자동으로 할당하는 경우에 선택합니다."
				},{
					type: "name",
					title: "고정 IP",
					content: "IP 주소, 서브넷 마스크, 게이트웨이 및 DNS 주소가 ISP에서 제공하는 경우에 선택하고, 해당 필드에 이 정보를 입력합니다."
				}]
			},{
				type: "name",
				title: "VPN 서버 IP/도메인 이름",
				content: "ISP에서 제공하는 VPN 서버의 IP 주소 또는 도메인 이름을 입력합니다."
			},{
				type:"paragraph",
				content:"입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		BASIC_WIRELESS: {
			TITLE: "무선 설정",
			CONTENT: [{
				type: "name",
				title: "무선 라디오 사용함",
				content: "2.4 GHz/5 GHz/60 GHz 무선 대역폭 주파수를 활성화하려면 이 체크박스에 클릭합니다."
			},{
				type: "name",
				title: "무선 네트워크 이름 (SSID)",
				content: "무선 신호 이름을 최대 32자의 문자열로 지정합니다. 같은 이름 (SSID) 네트워크의 모든 무선 장치에 할당해야합니다."
			},{
				type: "name",
				title: "SSID 숨기기",
				content: "Wi-Fi 네트워크 목록에서  2.4GHz/5GHz/60GHz 네트워크 이름(SSID)을 감추고 싶은 경우 이 체크박스를 클릭하십시오."
			},{
				type: "name",
				title: "비밀번호",
				content: "보안 유형에 맞는 무선 암호를 입력하십시오. (대소 문자 구분)"
			},{
				type:"paragraph",
				content:"입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		BASIC_DEVICE_SETTINGS: {
			TITLE: "장치 설정",
			CONTENT: [{
				type: "paragraph",
				content: "기기 설정 화면에서 USB 포트에 연결된 모든 USB 저장장치의 정보를 표시합니다."
			},{
				type: "name",
				title: "스캔",
				content: "일반적으로 공유기가 자동으로 새로 연결된 기기를 감지합니다. 만약 감지하지 못하면, 스캔 버튼을 클릭하여 새로 연결된 기기와 변경된 정보를 화면에 출력합니다."
			},{
				type: "name",
				title: "볼륨",
				content: "USB 볼륨의 이름을 표시합니다."
			},{
				type: "name",
				title: "용량",
				content: "USB의 총 저장 용량을 표시합니다."
			},{
				type: "name",
				title: "남은 공간",
				content: "현재 사용 가능한 저장 공간을 표시합니다."
			},{
				type: "name",
				title: "안전하게 제거",
				content: "USB 저장 장치를 안전하게 제거하려면 공유기에서 분리하기 전에 이 버튼을 클릭합니다.",
				children: [{
					type: "paragraph",
					content: "제거 버튼은 장치가 공유기에 연결되어 있을 경우에 활성화됩니다. 현재 볼륨이 작동 중인 동안에는 USB 장치 제거가 불가능합니다."
				}]
			},{
				type: "name",
				title: "활성화",
				content: "이 체크박스는 USB 저장 장치가 공유기에 연결되었을 때 활성화됩니다. 체크시 USB 저장 장치의 파일공유가 가능합니다."
			}]
		},
		BASIC_SHARING_SETTINGS: {
			TITLE: "공유 설정",
			CONTENT: [{
				type: "name",
				title: "네트워크/미디어 서버 이름",
				content: "연결된 USB 저장 장치를 접근하는 이름을 표시합니다. 이름은 반드시 4~15자의 숫자, 언더바나 붙임표를 사용해야 합니다. "
			},{
				type:"paragraph",
				content:"입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		},
		BASIC_FOLDER_SHARING: {
			TITLE: "폴더 공유",
			CONTENT: [{
				type: "name",
				title: "전체 공유",
				content: "스위치 켠 상태에서 모든 파일과 폴더 공유되고 또는 끈 상태에 선택한 폴더만 공유됩니다."
			},{
				type: "name",
				title: "인증 사용",
				content: "공유 폴더에 액세스 하려면 유효한 사용자 이름과 암호를 입력하도록 요구하는 인증을 사용하는 것을 추천합니다.."
			},{
				type: "name",
				title: "폴더 이름",
				content: "공유 폴더의 이름을 표시합니다."
			},{
				type: "name",
				title: "폴더 경로",
				content: "공유 폴더의 경로를 표시합니다."
			},{
				type: "name",
				title: "미디어 공유",
				content: "공유 폴더의 공유 여부를 표시합니다."
			},{
				type: "name",
				title: "볼륨 이름",
				content: "공유 볼륨의 이름을 표시합니다."
			},{
				type: "name",
				title: "상태",
				content: "표시등으로 공유 폴더의 상태를 표시합니다."
			},{
				type: "name",
				title: "수정",
				content: "옵션을 표시 수정하고 해당 공유 폴더를 삭제합니다."
			},{
				type: "name",
				title: "추가",
				content: "새 항목을 만들려면 이 버튼을 클릭합니다."
			},{
				type: "name",
				title: "삭제",
				content: "표에서 선택한 항목을 제거하려면 이 버튼을 클릭합니다."
			},{
				type: "name",
				title: "검색",
				content: "공유 폴더를 검색합니다."
			},{
				type: "name",
				title: "게스트 네트워크 액세스 허용",
				content: "게스트 네트워크에 클라이언트가 공유 폴더에 액세스할 수 있도록 선택합니다."
			},{
				type: "name",
				title: "인증 사용",
				content: "유효한 사용자 이름과 비밀번호를 사용하여 공유 폴더에 액세스 하도록 선택합니다."
			},{
				type: "name",
				title: "쓰기 액세스 사용",
				content: "사용자가 폴더 내용을 변경할 수 있도록 선택합니다."
			},{
				type: "name",
				title: "미디어 공유 사용함",
				content: "미디어 공유를 활성화 하려면 선택합니다."
			},{
				type: "name",
				title:"새로고침",
				content: "클릭하면 공유 폴더 목록이 업데이트됩니다."
			}]
		},
		BASIC_PRINT_SERVER: {
			TITLE: "프린터 서버",
			CONTENT: [{
				type: "name",
				title: "프린터 서버",
				content: "프린트 서버 기능을 사용할 수 있도록 토글합니다."
			},{
				type: "name",
				title: "프린터 이름",
				content: "공유기에 연결된 프린터 이름을 표시합니다."
			}]
		},
		BASIC_PARENTAL_CONTROL: {
			TITLE: "보호자 제어",
			CONTENT: [{
				type: "paragraph",
				content: "이 기능으로 유해사이트 접속을 차단할 수 있고 특정시간 접속제한(예. 페이스북, 유튜브등)과 중앙통제를 통하여 홈네트워크상의 모든기기를 몰웨어와 피싱으로 부터 동시간에 보호할 수 있습니다."
			},{
				type: "name",
				title: "보호자 제어",
				content: "토글'On'시 자녀PC관리 기능이 활성화 됩니다. 기본값은 비활성화 상태입니다."
			}]
		},
		BASIC_PARENTAL_DEVICE: {
			TITLE: "자녀PC 관리 기기",
			CONTENT: [{
				type: "paragraph",
				content: "보호자 제어된 장치를 목록에 표시합니다."
			},{
				type: "name",
				title: "장치 이름",
				content: "현재 관리되고 있는 모든 기기의 이름을 표시합니다."
			},{
				type: "name",
				title: "MAC 주소",
				content: "현재 관리되고 있는 모든 기기의 MAC주소를 표시합니다."
			},{
				type: "name",
				title: "인터넷 접속 시간",
				content: "접속 제한 시간의 기간을 표시합니다. \"시스템 도구 -> 시간 설정\"에서 설정 할 수 있는 시간 일정은 공유기의 시스템 시간을 기준으로 적용됩니다."
			},{
				type: "name",
				title: "설명",
				content: "옵션 설정은 연결된 장치에 대한 간단한 설명을 표시합니다."
			},{
				type: "name",
				title: "상태",
				content: "해당 장치의 사용 연령 제한의 현재 상태 (활성화 또는 비활성화)를 표시합니다."
			},{
				type: "name",
				title: "수정",
				content: "해당 장치를 수정 또는 삭제하는 것을 표시합니다."
			},{
				type: "step",
				title: "새로운 클라이언트 장치를 제한합니다.",
				content:[
					"1. 추가를 클릭합니다.",
					"2. 기존 장치 보기를 클릭하고 액세스 장치 목록에서 현재 연결된 장치를 선택하거나, 장치 이름을 입력하고 MAC 주소가 연결되지 않은 장치를 수동으로 추가합니다.",
					"3. 제한이 적용되는 기간을 지정하려면 인터넷 액세스 시간 아이콘을 클릭합니다.",
					"4. 설명 필드에 간단한 설명을 입력합니다. (선택 사항)",
					"5. 사용함을 선택합니다.",
					"6. 확인을 클릭하여 이 항목을 저장합니다."
				]
			},{
				type: "paragraph",
				content: "자녀PC 관리 항목을 수정하거나 삭제하려면, 편집 아이콘을 클릭하여 정보를 편집하거나 쓰레기통 아이콘을 클릭하여 해당 항목을 삭제합니다."
			},{
				type: "paragraph",
				content: "여러 항목을 삭제하려면 모든 항목을 선택하고 표 상단의 삭제를 클릭합니다."
			}]
		},
		BASIC_PARENTAL_RESTRICTION: {
			TITLE: "콘텐츠 제한",
			CONTENT: [{
				type: "name",
				title: "블랙리스트",
				content: "웹사이트 접근을 제한하기 위한 특정 키워드를 설정합니다.",
				children: [{
					type: "paragraph",
					content: "새로운 키워드 추가를 클릭하여 블랙리스트에 추가합니다. 삭제하고자 하는 키워드는 (-) 아이콘을 클릭하여 삭제합니다."
				}]
			},{
				type: "name",
				title: "화이트리스트",
				content: "접속을 허용하고자 하는 웹사이트 주소를 추가합니다.",
				children: [{
					type: "paragraph",
					content: "도메인 이름 추가를 클릭하여 웹사이트를 화이트리스트에 추가합니다. 삭제하고자 하는 웹사이트는 (-) 아이콘을 클릭하여 삭제합니다."
				}]
			},{
				type: "note",
				title: "주의",
				content: "키워드는 또한 도메인 이름이 될 수 있습니다. 예를 들면, mail.google.com 또는 www.facebook.com이 될 수 있습니다. "
			},{
				type: "paragraph",
				content: "저장을 클릭하여 설정내용을 저장합니다."
			}]
		},
		BASIC_GUEST_NETWORK: {
			TITLE: "게스트 네트워크",
			CONTENT: [{
				type: "paragraph",
				content: "게스트 네트워크는 별도의 무선 네트워크 이름 (SSID)과 손님이 무선 네트워크에 액세스하는 데 사용할 수있는 암호를 사용하여 별도의 네트워크를 설정할 수 있습니다."
			},{
				type: "name",
				title: "게스트 서로 보일 수 있게",
				content: "게스트 네트워크에 무선 장치가 서로를 볼 수 있도록하려면 이 확인란을 선택합니다"
			},{
				type: "name",
				title: "게스트가 로컬 네트워크에 액세스할 수 있도록 허용",
				content: "게스트 네트워크에 무선 장치를 로컬 네트워크 공유 및 프린터에 액세스 할 수 있도록하려면이 확인란을 선택합니다."
			},{
				type: "name",
				title: "게스트 네트워 사용함",
				content: "게스트 네트워크 기능을 사용하기 위해 이 확인란을 선택합니다."
			},{
				type: "name",
				title: "무선 네트워크 이름 (SSID)",
				content: "기본 게스트 SSID를 사용하거나 (최대 32 자) 새로운 이름을 만듭니다."
			},{
				type: "name",
				title: "SSID 숨기기",
				content: "Wi-Fi 네트워크 목록에서 게스트 SSID를 숨기려면 이 확인란을 선택합니다."
			},{
				type: "name",
				title: "비밀번호",
				content: "공용(게스트) 네트워크의 안정성을 위하여 암호를 설정하십시오. 암호는 ASCII 또는 16진수 문자로 구성할 수 있습니다. ASCII의 경우 길이가 8자와 63자 사이여야 하고, 16진수 문자(0-9, a-f, A-F)의 경우 그 길이가 8자와 64자 사이여야 합니다. "
			},{
				type:"paragraph",
				content:"입력한 설정을 사용하기 위해 저장 버튼을 클릭하십시오."
			}]
		}

	};
})(jQuery);
