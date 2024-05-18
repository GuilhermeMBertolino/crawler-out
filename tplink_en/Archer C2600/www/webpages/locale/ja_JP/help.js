(function($){
	$.su = $.su || {};
	$.su.CHAR = $.su.CHAR || {};
	$.su.CHAR.HELP = {
		STATUS_INTERNET: {
			TITLE: "インターネット",
			CONTENT: [{
				type: "paragraph",
				content: "ワイド エリア ネットワーク (インターネット) 接続についての関連情報を表示します。"
			},{
				type: "title",
				title: "IPv4",
			},{
				type: "name",
				title: "MAC アドレス",
				content: "ルーターのインターネット (WAN) ポートに割り当てられた一意の物理アドレス。"
			},{
				type: "name",
				title: "IP アドレス",
				content: "ルーターのインターネット (WAN) ポートに割り当てられた IPv4 アドレス。IP アドレスが 0.0.0.0　と表示される場合、これはインターネット アクセスがないことを示しています。"
			},{
				type: "name",
				title: "サブネット　マスク",
				content: "このパラメーターは、IP アドレスのネットワーク部とホスト部を決定します。"
			},{
				type: "name",
				title: "デフォルト ゲートウェイ",
				content: "ルーターをネットワークに接続するために使用される IP アドレス。"
			},{
				type: "name",
				title: "プライマリ DNS/セカンダリ DNS",
				content: "ドメイン ネーム システム (DNS) は、ホスト名とインターネット ドメインを IP アドレスに変換します。これらの DNS サーバーの情報は、インターネット サービス プロバイダー (ISP) によって割り当てられます。"
			},{
				type: "name",
				title: "接続タイプ",
				content: "インターネット (WAN) ポートの現在の接続タイプ。"
			},{
				type: "title",
				title: "IPv6",
			},{
				type: "name",
				title: "MAC アドレス",
				content: "ルーターのインターネット (WAN) ポートに割り当てられた一意の物理アドレス。"
			},{
				type: "name",
				title: "IP アドレス",
				content: "ルーターのインターネット (WAN) ポートに割り当てられた IPv6 アドレス。"
			},{
				type: "name",
				title: "デフォルト ゲートウェイ",
				content: "ルーターをネットワークに接続するために使用される IP アドレス。"
			},{
				type: "name",
				title: "プライマリ DNS/セカンダリ DNS",
				content: "ドメイン ネーム システム (DNS) は、ホスト名とインターネット ドメインを IP アドレスに変換します。これらの DNS サーバーの情報は、インターネット サービス プロバイダー (ISP) によって割り当てられます。"
			},{
				type: "name",
				title: "接続タイプ",
				content: "インターネット (WAN) ポートの現在の接続タイプ。"
			}]
		},
		STATUS_WIRELESS: {
			TITLE: "2.4GHz/5GHz/60GHz ワイヤレス",
			CONTENT: [{
				type: "paragraph",
				content: "ワイヤレス ネットワークについての関連情報を表示します。"
			},{
				type: "name",
				title: "ネットワーク名 (SSID)",
				content: "ワイヤレスネットワーク名。SSID (サービス セット識別子) としても知られています。"
			},{
				type: "name",
				title: "ワイヤレス ラジオ",
				content: "ワイヤレス ネットワークの現在の状態 (オンまたはオフ)"
			},{
				type: "name",
				title: "モード",
				content: "現在のワイヤレス モード。"
			},{
				type: "name",
				title: "チャンネル幅",
				content: "ワイヤレス ネットワークのチャンネルの幅。"
			},{
				type: "name",
				title: "チャンネル",
				content: "現在のワイヤレス チャンネル"
			},{
				type: "name",
				title: "MAC アドレス",
				content: "ルーター上のワイヤレス ネットワーク ラジオの MAC アドレス。"
			},{
				type: "name",
				title: "WDS ステータス",
				content: "WDS モードの現在のステータス (有効または無効)。"
			}]
		},
		STATUS_LAN: {
			TITLE: "LAN",
			CONTENT: [{
				type: "paragraph",
				content: "イーサネット (LAN) ポートについての情報を表示します。"
			},{
				type: "title",
				title: "IPv4"
			},{
				type: "name",
				title: "MAC アドレス",
				content: "ルーターのイーサネット (LAN) ポートに割り当てられた一意の物理アドレス。"
			},{
				type: "name",
				title: "IP アドレス",
				content: "ルーターのイーサネット (LAN) ポートに割り当てられた IPv4 アドレス。"
			},{
				type: "name",
				title: "サブネット　マスク",
				content: "このパラメーターは、IP アドレスのネットワーク部とホスト部を決定します。"
			},{
				type: "name",
				title: "DHCP",
				content: "ルーターのビルトイン DHCP サーバーが LAN ポート上のデバイスに対してアクティブかどうかを表示します。"
			},{
				type: "title",
				title: "IPv6"
			},{
				type: "name",
				title: "MAC アドレス",
				content: "ルーターのイーサネット (LAN) ポートに割り当てられた一意の物理アドレス。"
			},{
				type: "name",
				title: "IP アドレス",
				content: "ルーターのイーサネット (LAN) ポートに割り当てられた IPv6 アドレス。"
			},{
				type: "name",
				title: "リンク ローカル アドレス",
				content: "LAN インターフェイスの IPv6 リンク アドレス。"
			},{
				type: "name",
				title: "割り当てられたタイプ",
				content: "LAN インターフェイスの IPv6 アドレスのタイプ。"
			}]
		},
		STATUS_GUEST: {
			TITLE: "2.4GHz/5GHz ゲスト ネットワーク",
			CONTENT: [{
				type: "paragraph",
				content: "ゲストのワイヤレス ネットワークについての情報を表示します。"
			},{
				type: "name",
				title: "ネットワーク名 (SSID)",
				content: "ゲスト ネットワークのワイヤレス ネットワーク名 (SSID)。"
			},{
				type: "name",
				title: "SSID を非表示にする",
				content: "ゲスト ネットワークのワイヤレス ネットワーク名 (SSID) を非表示にするかどうかを示します。"
			},{
				type: "name",
				title: "ワイヤレス ラジオ",
				content: "ゲスト ネットワークの現在のステータス (オンまたはオフ)。"
			},{
				type: "name",
				title: "ゲストどうしを見えるようにする",
				content: "ゲスト ネットワーク上のすべてのデバイスが、互いに通信できるようにするかどうかを示します。"
			}]
		},
		STATUS_USB: {
			TITLE: "USB デバイス",
			CONTENT: [{
				type: "paragraph",
				content: "USB ポートを介してルーターに接続されている現在の USB ストレージ デバイスとプリンターの情報を表示します。"
			},{
				type: "name",
				title: "プリンター",
				content: "接続されているプリンターの名前。"
			},{
				type: "name",
				title: "USB ディスク",
				content: "ルーターに接続されている USB ディスクの名前。"
			},{
				type: "name",
				title: "合計",
				content: "接続されている USB ストレージ デバイスのストレージ総容量。"
			},{
				type: "name",
				title: "使用可能",
				content: "接続されている USB ストレージ デバイスの使用可能なストレージ容量。"
			}]
		},
		STATUS_PERFORMANCE: {
			TITLE: "パフォーマンス",
			CONTENT: [{
				type: "paragraph",
				content: "現在のルーター パフォーマンスを表示します。"
			},{
				type: "name",
				title: "CPU 負荷",
				content: "現在の CPU 使用状況。"
			},{
				type: "name",
				title: "メモリ使用量",
				content: "現在のメモリ使用量。"
			}]
		},
		STATUS_WIRED: {
			TITLE: "有線クライアント",
			CONTENT: [{
				type: "paragraph",
				content: "現在ネットワークに接続されているすべての有線デバイスの情報を表示します。"
			}]
		},
		STATUS_WIRELESS_CLIENTS: {
			TITLE: "ワイヤレス クライアント",
			CONTENT: [{
				type: "paragraph",
				content: "現在ネットワークに接続されているすべてのワイヤレス デバイスの情報を表示します。"
			}]
		},
		
		INTERNET_INTERNET: {
			TITLE: "IPv4",
			CONTENT: [{
				type: "title",
				title: "インターネット接続タイプ:静的 IP"
			},{
				type: "paragraph",
				content: "ISP によって静的 (固定) IP アドレス、サブネット マスク、ゲートウェイ、および DNS パラメーターを提供されている場合は、このタイプを選択します。"
			},{
				type: "name",
				title: "IP アドレス/サブネット マスク/デフォルト ゲートウェイ/プライマリ DNS/セカンダリ DNS",
				content: "ISP によって提供された情報を入力します。"
			},{
				type: "name",
				title: "MTU サイズ",
				content: "ほとんどのイーサネット ネットワークの既定および標準の MTU (最大転送単位) サイズは 1500 バイトです。ISP によって要求されない限り、既定の MTU サイズの変更は推奨されません。"
			},{
				type: "title",
				title: "インターネット接続タイプ:動的 IP"
			},{
				type: "paragraph",
				content: "ISP によって DHCP サーバー接続を提供されている場合は、これを選択します。"
			},{
				type: "name",
				title: "IP アドレス/サブネット マスク/デフォルト ゲートウェイ/プライマリ DNS/セカンダリ DNS",
				content: "これらのパラメーターは、ISP から DHCP サーバーによって自動的に割り当てられます。"
			},{
				type: "name",
				title: "更新",
				content: "DHCP サーバーから新しい IP パラメーターを取得するには、このボタンをクリックします。"
			},{
				type: "name",
				title: "解放",
				content: "DHCP サーバーによって割り当てられたすべての IP アドレスを解放するには、このボタンをクリックします。"
			},{
				type: "name",
				title: "次の DNS アドレスを使用",
				content: "ISP が 1 つまたは 2 つの DNS アドレスを提供している場合、このチェック ボックスを選択して、プライマリ DNS とセカンダリ DNS アドレスを対応する入力フィールドに入力します。指定しない場合、DNS アドレスは ISP によって動的に割り当てられます。"
			},{
				type: "name",
				title: "MTU サイズ",
				content: "ほとんどのイーサネット ネットワークの既定および標準の MTU (最大転送単位) サイズは 1500 バイトです。ISP によって要求されない限り、既定の MTU サイズの変更は推奨されません。"
			},{
				type: "name",
				title: "ホスト名",
				content: "値をこのフィールドに入力して、ルーターのホスト名を指定します。"
			},{
				type: "name",
				title: "ユニキャスト DHCP を使用して IP を取得",
				content: "ISP の DHCP サーバーがブロードキャスト アプリケーションをサポートせず、IP アドレスを動的に取得できない場合は、このチェック ボックスを選択します。"
			},{
				type: "title",
				title: "インターネット接続タイプ:PPPoE"
			},{
				type: "paragraph",
				content: "DSL (デジタル加入者線) サービスを使用していて、ISP によってユーザー名とパスワードが提供されている場合は、このタイプを選択します。"
			},{
				type: "name",
				title: "ユーザー名/パスワード",
				content: "ISP によって提供されたユーザー名とパスワードを入力します。これらのフィールドは大文字小文字が区別されます。"
			},{
				type: "name",
				title: "IP アドレス/プライマリ DNS/セカンダリ DNS",
				content: "これらのパラメーターは、ISP 側で DHCP サーバーによって自動的に割り当てられます。"
			},{
				type: "name",
				title: "セカンダリ接続 (なし、動的 IP、静的 IP)",
				children: [{
					type: "name",
					title: "なし",
					content: "セカンダリ接続が提供されない場合に選択します。"
				},{
					type: "name",
					title: "動的 IP",
					content: "IP アドレスとサブネット マスクが ISP によって自動的に割り当てられる場合に選択します。",
					children: [{
						type: "name",
						title: "更新",
						content: "ISP の IP パラメーターを更新するには、このボタンをクリックします。"
					},{
						type: "name",
						title: "解放",
						content: "割り当てられた IP パラメーターを解放するにはこのボタンをクリックします。"
					}]
				},{
					type: "name",
					title: "静的 IP",
					content: "IP アドレスとサブネット マスクが ISP によって提供されている場合に選択し、これらの情報を対応するフィールドに入力します。"
				}]
			},{
				type: "name",
				title: "MTU サイズ",
				content: "イーサネット ネットワークの標準の MTU (最大転送単位) サイズは 1480 バイトです。",
				children: [{
					type: "note",
					title: "注",
					content: "まれなケースですが、パフォーマンスの向上のために MTU サイズを調整するよう　ISP が要求する場合があります。必要不可欠な場合を除き、値を変更しないでください。"
				}]
			},{
				type: "name",
				title: "サービス名/アクセス コンセントレーター名",
				content: "既定ででは、サービス名とアクセス コンセントレーター (AC) 名は空になっています。これらのフィールドは、ISP によって要求されない限り、設定すべきではありません。"
			},{
				type: "name",
				title: "オンライン間隔を検出",
				content: "ルーターがアクセス コンセントレーターをオンラインで検出する時間間隔値を 0 ～ 120 秒で入力します。既定値は　10 です。"
			},{
				type: "name",
				title: "IP アドレス",
				content: "ISP が特定 (固定) の IP アドレスを提供している場合は、[次の IP アドレスを使用] を選択して、フィールドに IP アドレスを入力します。そうでない場合は、[ISP から動的に取得] を選択して、サーバー割り当ての IP アドレスを自動で取得します。"
			},{
				type: "name",
				title: "DNS アドレス/プライマリ DNS/セカンダリ DNS",
				content: "ISP が特定 (固定) の DNS IP アドレスを提供している場合は、[次の DNS アドレスを使用] を選択して、アドレスを　[プライマリ DNS] および [セカンダリ DNS]　フィールドにそれぞれ入力します。そうでない場合は、[ISP から動的に取得] を選択して、サーバー割り当ての DNS IP アドレスを自動で取得します。"
			},{
				type: "name",
				title: "接続モード",
				content: "インターネットへの接続方法を決定する適切な接続モードを選択します。",
				children: [{
					type: "name",
					title: "自動",
					content: "このモードでは、インターネット接続は、切断されるといつでも自動的に再接続します。"
				},{
					type: "name",
					title: "オンデマンド",
					content: "このモードでは、インターネット接続は、指定された時間のアイドル状態 (最大アイドル時間) が経過すると自動的に終了されます。接続は、インターネットにもう一度アクセスしようとすると再確立されます。"
				},{
					type: "name",
					title: "時間ベース",
					content: "このモードでは、インターネット接続は特定の時間枠でのみ確立されます。このオプションが選択する場合は、開始時刻と終了時刻を、どちらも HH:MM 形式で入力します。"
				},{
					type: "name",
					title: "手動",
					content: "このモードでは、インターネット接続は、[接続] または [切断] ボタンをクリックして手動で制御されます。このモードも最大アイドル時間機能をサポートします。インターネット接続のアイドル状態を維持できる最大時間 (分) を [最大アイドル時間] フィールドに入力します。既定値は 15 分です。常にインターネット接続をアクティブのままにしておく場合は、0 (ゼロ) を入力します。"
				},{
					type: "note",
					title: "注",
					content: "時間ベースの接続モードは、[詳細設定] → [システム ツール] → [時刻設定] ページで [システム時刻] が設定された場合にのみ有効になります。"
				}]
			},{
				type: "title",
				title: "インターネット接続タイプ:BigPond ケーブル",
				id: "BigPond"
			},{
				type: "paragraph",
				content: "ISP が BigPond ケーブル接続を提供している場合は、このタイプを選択します。",
				id: "BigPond_desc"
			},{
				type: "name",
				title: "ユーザー名/パスワード",
				content: "ISP によって提供されたユーザー名とパスワードを入力します。これらのフィールドは大文字小文字が区別されます。",
				id: "BigPond_name"
			},{
				type: "name",
				title: "認証サーバー",
				content: "認証サーバーの IP アドレスまたはホスト名を入力します。",
				id: "BigPond_server"
			},{
				type: "name",
				title: "認証ドメイン",
				content: "サーバーのドメイン名の接尾辞 (地域に基づく) を入力します。たとえば、NSW/ACT の場合は nsw.bigpond.net.au、VIC/TAS/WA/SA/NT の場合は vic.bigpond.net.au、QLD の場合は qld.bigpond.net.au です。",
				id: "BigPond_domain"
			},{
				type: "name",
				title: "MTU サイズ",
				content: "ほとんどのイーサネット ネットワークの既定および標準の MTU (最大転送単位) サイズは 1500 バイトです。ISP によって要求されない限り、既定の MTU サイズの変更は推奨されません。",
				id: "BigPond_mtu"
			},{
				type: "name",
				title: "接続モード",
				content: "インターネットへの接続方法を決定する適切な接続モードを選択します。",
				id: "BigPond_mode",
				children: [{
					type: "name",
					title: "自動",
					content: "このモードでは、インターネット接続は、切断されるといつでも自動的に再接続します。"
				},{
					type: "name",
					title: "オンデマンド",
					content: "このモードでは、インターネット接続は、指定された時間のアイドル状態 (最大アイドル時間) が経過すると自動的に終了されます。接続は、インターネットにもう一度アクセスしようとすると再確立されます。"
				},{
					type: "name",
					title: "手動",
					content: "このモードでは、インターネット接続は、[接続] または [切断] ボタンをクリックして手動で制御されます。このモードも最大アイドル時間機能をサポートします。インターネット接続のアイドル状態を維持できる最大時間 (分) を [最大アイドル時間] フィールドに入力します。既定値は 15 分です。常にインターネット接続をアクティブのままにしておく場合は、0 (ゼロ) を入力します。"
				}]
			},{
				type: "title",
				title: "インターネット接続タイプ:L2TP/PPTP"
			},{
				type: "paragraph",
				content: "接続先が L2TP/PPTP VPN サーバーで、ISP によってユーザー名、パスワード、IP アドレス/サーバーのドメイン名が提供されている場合は、このタイプを選択します。"
			},{
				type: "name",
				title: "ユーザー名/パスワード",
				content: "ISP によって提供されたユーザー名とパスワードを入力します。これらのフィールドは大文字小文字が区別されます。"
			},{
				type: "name",
				title: "IP アドレス/プライマリ DNS/セカンダリ DNS",
				content: "これらのパラメーターは、ISP から DHCP サーバーによって自動的に割り当てられます。"
			},{
				type: "name",
				title: "セカンダリ接続 (動的 IP または静的 IP)",
				children: [{
					type: "name",
					title: "動的 IP",
					content: "IP アドレスとサブネット マスクが ISP によって自動的に割り当てられる場合に選択します。"
				},{
					type: "name",
					title: "静的 IP",
					content: "IP アドレス、サブネット マスク、ゲートウェイ、DNS アドレスが ISP によって提供されている場合に選択し、これらの情報を対応するフィールドに入力します。"
				}]
			},{
				type: "name",
				title: "VPN サーバー IP/ドメイン名",
				content: "ISP によって提供された VPN サーバー の IP アドレスまたはドメイン名を入力します。"
			},{
				type: "name",
				title: "MTU サイズ",
				content: "ほとんどのイーサネット ネットワークの既定および標準の MTU (最大転送単位) サイズは、L2TP の場合は 1460 バイト、PPTP の場合は 1420 バイトです。ISP によって要求されない限り、既定の MTU サイズの変更は推奨されません。"
			},{
				type: "name",
				title: "接続モード",
				content: "インターネットへの接続方法を決定する適切な接続モードを選択します。",
				children: [{
					type: "name",
					title: "自動",
					content: "このモードでは、インターネット接続は、切断されるといつでも自動的に再接続します。"
				},{
					type: "name",
					title: "オンデマンド",
					content: "このモードでは、インターネット接続は、指定された時間のアイドル状態 (最大アイドル時間) が経過すると自動的に終了されます。接続は、インターネットにもう一度アクセスしようとすると再確立されます。"
				},{
					type: "name",
				title: "手動",
				content: "このモードでは、インターネット接続は、[接続] または [切断] ボタンをクリックして手動で制御されます。このモードも最大アイドル時間機能をサポートします。インターネット接続のアイドル状態を維持できる最大時間 (分) を [最大アイドル時間] フィールドに入力します。既定値は 15 分です。常にインターネット接続をアクティブのままにしておく場合は、0 (ゼロ) を入力します。"
				}]
			},{
				type:"paragraph",
				content:"[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		INTERNET_MAC: {
			TITLE: "MAC クローン",
			CONTENT: [{
				type: "name",
				title: "既定の MAC アドレスを使用",
				content: "割り当てられた IP アドレスを ISP が MAC アドレスにバインドしない場合は、ルーターの既定の MAC アドレスを変更しないでください。"
			},{
				type: "name",
				title: "現在のコンピューターの MAC アドレスを使用",
				content: "割り当てられた IP アドレスを ISP がコンピューターの MAC アドレスにバインドする場合は、接続されているコンピューターの現在の MAC アドレスをコピーするためにこれを選択します。"
			},{
				type: "name",
				title: "カスタム MAC アドレスを使用",
				content: "割り当てられた IP アドレスを ISP が特定の MAC アドレスにバインドする場合は、MAC アドレスを手動で入力します。"
			},{
				type:"paragraph",
				content:"[保存] をクリックして、すべての設定を保存してください。"
			}]
		},

		LAN_IPV4: {
			TITLE: "LAN",
			CONTENT: [{
				type: "name",
				title: "MAC アドレス",
				content: "ルーターのイーサネット (LAN) ポートに割り当てられた一意の物理アドレス。"
			},{
				type: "name",
				title: "IP アドレス",
				content: "ルーターの Web 管理ページへのログインに使用され、上書きできる、既定のルーターの IP アドレスを表示します。"
			},{
				type: "name",
				title: "サブネット　マスク",
				content: "内部および外部のトラフィックを経路指定するために LAN ポートによって使用される割り当て済み識別子をドロップダウン リストから選択するか、新しいサブネット マスクをドット 10 進表記で入力します。"
			},{
				type: "note",
				title: "注",
				content: "新しい LAN IP アドレスが古いアドレスと同じサブネットにない場合は、DHCP サーバーの IP アドレス プールが自動的に設定されますが、仮想サーバーと DMZ ホストは再設定されるまで有効になりません。"
			},{
				type:"paragraph",
				content:"[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		IPTV:{
			TITLE: "設定",
			CONTENT: [{
					type: "name",
					title: "IGMP プロキシ",
					content: "IGMP (インターネット グループ管理プロトコル) プロキシ機能を有効にするにはこれを選択します。"
				},{
					type: "name",
					title: "IGMP バージョン",
					content: "IGMP プロキシ バージョン (ISP に従って V2 または V3)　を選択します。"
				},
				{
					type: "name",
					title: "IPTV",
					content: "IPTV 機能を有効にするにはこれを選択します。"
				},
				{
					type: "name",
					title: "モード",
					content: "ISP に従って適切なモードを選択します。サポートされている IPTV モードは 6 つあります。",
					children: [
						{
							type: "name",
							title: "ブリッジ",
							content:"ISP がリストされておらず、その他のパラメーターが必要ない場合は、このモードを選択して、ルーターの LAN ポート機能を設定できます。",
							children:[{
								type: "name",
								title: "LAN 1/2/3/4",
								content: "LAN ポートを、インターネット サプライヤと IPTV サプライヤのどちらかとして機能させるために割り当てます。"
							}]
						},
						{
							type: "name",
							title: "ロシア",
							content: "ISP がロシアで、インターネット/IP 電話/IPTV VLAN ID、優先順位、および LAN (1/2/3/4) ポート機能など、必要なパラメーターが事前に決定している場合、これを選択します。",
							children: [{
								type: "name",
								title: "IPTV マルチキャスト VLAN ID/優先順位",
								content: "必要に応じて IPTV マルチキャスト機能を有効にし、ISP に従って VLAN ID と優先順位を設定します。"
							}]
						},
						{
							type: "name",
							title: "シンガポール ExStream",
							content: "ISP がシンガポールの　ExStream で、インターネット/IPTV VLAN ID、優先順位、および LAN (1/2/3/4) ポート機能など、必要なパラメーターが事前に決定している場合、これを選択します。"
						},
						{
							type: "name",
							title: "マレーシア Unifi",
							content: "ISP がマレーシアの　Unifi で、インターネット/IPTV VLAN ID、優先順位、および LAN (1/2/3/4) ポート機能など、必要なパラメーターが事前に決定している場合、これを選択します。"
						},
						{
							type: "name",
							title: "マレーシア Maxis",
							content: "ISP がマレーシアの　Maxis で、インターネット/IP 電話/IPTV VLAN ID、優先順位、および LAN (1/2/3/4) ポート機能など、必要なパラメーターが事前に決定している場合、これを選択します。"
						},
						{
							type: "name",
							title: "カスタム",
							content: "ISP がリストされておらず、インターネット/IP 電話/IPTV VLAN ID、優先順位、および LAN (1/2/3/4) ポート機能など、必要なパラメーターを提供している場合、これを選択します。",
							children: [{
								type: "name",
								title: "インターネット/IP 電話/IPTV VLAN ID/優先順位",
								content: "ISP によって提供されているとおりに VLAN と優先順位を設定します。"
							},{
								type: "name",
								title: "802.11Q タグ",
								content: "インターネット パケットを 802.11Q でタグ付けするかどうかを選択します。"
							},{
								type: "name",
								title: "IPTV マルチキャスト VLAN ID/優先順位",
								content: "必要に応じて IPTV マルチキャスト機能を有効にし、ISP に従って VLAN ID と優先順位を設定します。"
							},{
								type: "name",
								title: "LAN 1/2/3/4",
								content: "LAN ポートを、インターネット サプライヤ、IP 電話、または IPTV サプライヤのいずれかとして機能させるために割り当てます。"
							}]
						}
					]
				},{
					type:"paragraph",
					content:"[保存] をクリックして、すべての設定を保存してください。"
				}
			]
		},

		DHCP_SERVER_SETTINGS: {
			TITLE: "設定",
			CONTENT: [{
				type: "name",
				title: "DCHP サーバー",
				content: "既定では、DHCP (動的ホスト構成プロトコル) サーバーは有効になっており、TCP/IP パラメーターを IP アドレス プールからクライアント デバイスに動的に割り当てます。他の DHCP サーバーがある場合や、ネットワーク上のすべてのクライアント デバイスに手動で TCP/IP パラメーターを割り当てる場合を除き、DHCP サーバーを無効にしないでください。"
			},{
				type: "name",
				title: "IP アドレス プール",
				content: "クライアントにリースできる IP アドレスの範囲を入力します。"
			},{
				type: "name",
				title: "アドレス リース時間",
				content: "IP アドレスをクライアントにリースする時間を 2 ～ 2880 分で入力します。既定値は 120 分です。"
			},{
				type: "name",
				title: "デフォルト ゲートウェイ",
				content: "LAN IP アドレスを入力します。(オプション)"
			},{
				type: "name",
				title: "プライマリ DNS/セカンダリ DNS",
				content: "ISP によって提供されたとおりにパラメーターを入力します。(オプション)"
			},{
				type:"paragraph",
				content:"[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		RESERVED_IP_ADDRESS: {
			TITLE: "アドレス予約",
			CONTENT: [{
				type: "paragraph",
				content: "ルーターに接続されているクライアントの IP アドレスを手動で予約できます。予約すると、IP アドレスは DHCP サーバーによって同じクライアントにのみ割り当てられます。"
			},{
				type: "name",
				title: "MAC アドレス",
				content: "DCHP によって予約された IP アドレスをもつクライアントの MAC アドレスを表示します。"
			},{
				type: "name",
				title: "予約済み IP アドレス",
				content: "クライアントの予約済み IP アドレスを表示します。"
			},{
				type: "name",
				title: "説明",
				content: "クライアント デバイスの説明を表示します。"
			},{
				type: "name",
				title: "ステータス",
				content: "クライアント デバイスの現在のステータス (有効または無効) を表示します。"
			},{
				type: "name",
				title: "変更",
				content: "対応するクライアントを修正または削除するオプションを表示します。"
			},{
				type: "step",
				title: "IP アドレスを予約するには",
				content:[
					"1.[追加] をクリックします。",
					"2.目的のクライアントの MAC アドレスを入力します。",
					"3.クライアントについて予約する IP アドレスを入力します。",
					"4.クライアントの説明を入力します。",
					"5.[このエントリを有効にする] を選択します。",
					"6.[OK] をクリックします。"
				]
			},{
				type: "step",
				title: "既存のクライアントを修正または削除するには",
				content: "表で、修正または削除するクライアントに対応する編集アイコンまたはゴミ箱アイコンをクリックします。"
			}]
		},

		DHCP_CLIENT_LIST: {
			TITLE: "DHCP クライアント リスト",
			CONTENT: [{
				type: "name",
				title: "クライアント総数",
				content: "関連つけられている DHCP クライアントの数を表示します。"
			},{
				type: "name",
				title: "クライアント名",
				content: "DHCP クライアントの名前を表示します。"
			},{
				type: "name",
				title: "MAC アドレス",
				content: "MAC アドレスを表示します。"
			},{
				type: "name",
				title: "割り当て済み IP アドレス",
				content: "DHCP サーバーによってクライアントに割り当てられた IP アドレスを表示します。"
			},{
				type: "name",
				title: "リース時間",
				content: "クライアントにリースされた IP アドレスの残り時間を表示します。"
			},{
				type: "name",
				title: "更新",
				content: "DHCP クライアント　リストを更新するにはこれをクリックします。"
			}]
		},

		DDNS: {
			TITLE: "動的 DNS",
			CONTENT: [{
				type: "paragraph",
				content: "動的 DNS では、動的インターネット IP アドレスに固定のホストとドメイン名を割り当てることができます。これは、独自の Web サイト、FTP サーバー、またはルーターの外にある他のサーバーをホストしてるときに便利です。まず、dyn.com　などの動的 DNS サービス プロバイダーに登録する必要があります。"
			},{
				type: "step",
				title: "動的 DNS をセットアップするには",
				content: [
					"1.動的 DNS サービス プロバイダーを選択します。",
					"2.動的 DNS アカウントのユーザー名とパスワードを入力します。",
					"3.動的 DNS サービス プロバイダーから受け取ったドメイン名を入力します。",
					"4.ドロップダウン メニューから更新間隔を選択します。",
					"5.[ログイン]、[保存] をクリックします。"
				]
			},{
				type: "paragraph",
				content: "アカウントを切り替えるには、まず現在のアカウントからログアウトして、新しいユーザー名とパスワードで別のアカウントにログインします。"
			}]
		},


		ADVANCED_ROUTING_STATIC_ROUTING: {
			TITLE: "静的経路指定",
			CONTENT: [{
				type: "paragraph",
				content: "静的経路指定は、ネットワーク情報パケットを特定のホストまたはネットワークに到達させるための固定ルートを事前決定するために使用されます。"
			},{
				type: "step",
				title: "静的経路指定をセットアップするには",
				content: [
					"1.[追加] をクリックします。",
					"2.ネットワークの宛先 - このエントリに静的経路を割り当てるために IP アドレスをドット 10 進表記で入力します。",
					"3.サブネット マスク - IP アドレスのネットワーク部とホスト部を決定するために、サブネット マスクをドット 10 進表記で入力します。",
					"4.デフォルト ゲートウェイ - ルーターをネットワークまたはホストに接続するために、ゲートウェイ IP アドレスをドット 10 進表記で入力します。",
					"5.インターフェイス - LAN または WAN を選択して、ネットワークの宛先のタイプを指定します。",
					"6.説明 - このエントリの簡単な説明を入力します。",
					"7.[このエントリを有効にする] を選択します。",
					"8.[OK] をクリックします。"
				]
			},{
				type: "step",
				title: "既存のエントリを修正または削除するには",
				content: "表で、修正または削除するエントリに対応する編集アイコンまたはゴミ箱アイコンをクリックします。"
			}]
		},
		
		ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE: {
			TITLE: "システム ルーティング テーブル",
			CONTENT: [{
				type: "paragraph",
				content: "システム ルーティング テーブルは、現在使用中のすべての有効なルート エントリを表示します。"
			},{
				type: "paragraph",
				content: "ルーティング テーブルを更新するには [更新] をクリックします。"
			}]
		},
		
		WIRELESS_REGION: {
			TITLE: "地域設定",
			CONTENT: [{
				type: "name",
				title: "地域",
				content: "ドロップダウン メニューから地域を選択します。居住国または地域がリストされていない場合、お使いの場所ではワイヤレス ラジオの使用が制限されている可能性があります。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		WIRELESS_24G: {	
			TITLE: "2.4GHz ワイヤレス",
			CONTENT: [{
				type: "name",
				title: "ワイヤレス ラジオを有効にする",
				content: "2.4GHz ワイヤレス ラジオの周波数を有効にするには、このチェックボックスをオンにします。これを無効にすると、WPS 機能はこの帯域でサポートされません。"
			},{
				type: "name",
				title: "ネットワーク名 (SSID)",
				content: "既定のネットワーク名 (SSID) をそのままにしておくか、新しい名前 (32 文字まで) を入力できます。このフィールドは大文字小文字が区別されます。"
			},{
				type: "name",
				title: "SSID を非表示にする",
				content: "Wi-Fi ネットワーク リストで 2.4GHz ネットワーク名 (SSID) を非表示にする場合は、このチェックボックスをオンにします。これを選択すると、WPS 機能はこの帯域でサポートされません。"
			},{
				type: "name",
				title: "セキュリティ",
				content: "以下のいずれかのセキュリティ オプションを選択してください。",
				children: [{
					type: "name",
					title: "セキュリティなし",
					content: "ワイヤレス セキュリティを無効にするには、このオプションを選択します。ワイヤレス ネットワークを未承認アクセスから保護するために、ワイヤレス セキュリティを有効にすることを強く推奨します。"
				},{
					type: "name",
					title: "WPA/WPA2-パーソナル",
					content: "パスワードフレーズとも呼ばれる事前共有キー (PSK) をベースとする標準認証方式を有効にするには、このオプションを選択します。このオプションが推奨されます。選択する場合は、以下を設定してください。",
					children: [{
						type: "name",
						title: "バージョン",
						content: "ワイヤレス ネットワークのセキュリティ バージョンを選択します。",
						children: [{
							type: "name",
							title: "自動",
							content: "このオプションは、WPA および WPA2 などの WPA (Wi-Fi 保護アクセス) 標準の複数実装をサポートします。"
						},{
							type: "name",
							title: "WPA-PSK",
							content: "このオプションは、最適なレベルのセキュリティを提供します。これを選択すると、WPS 機能はこの帯域でサポートされません。"
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "このオプションは、WPA-PSK よりも良いレベルのセキュリティを提供します。推奨されるオプションです。"
						}]
					},{
						type: "name",
						title: "暗号化",
						content: "次のセキュリティ暗号化タイプを選択してください:TKIP (Temporal Key Integrity Protocol)、AES (Advanced Encryption Standard)、または自動 (TKIP と AES の両方)。TKIP は 802.11n 仕様ではサポートされていないため、ルーターが 802.11n モードで動作している場合、TKIP 暗号化の使用は推奨されません。TKIP を選択すると、WPS 機能はこの帯域でサポートされません。"
					},{
						type: "name",
						title: "パスワード",
						content: "このフィールドにワイヤレス パスワードを 8 ～ 63 文字の ASCII 文字、あるいは 8 ～ 64 文字の 16 進文字で入力します。"
					}]
				},{
					type: "name",
					title: "WPA/WPA2 - エンタープライズ",
					content: "RADIUS (リモート認証ダイヤルイン ユーザー サービス) サーバーを使用するより高度な認証方法を有効にするには、このオプションを選択します。これを選択すると、WPS 機能はこの帯域でサポートされません。",
					children: [{
						type: "name",
						title: "バージョン",
						content: "ワイヤレス ネットワークのセキュリティ バージョンを選択します。",
						children:[{
							type: "name",
							title: "自動",
							content: "このオプションは、WPA および WPA2 などの WPA (Wi-Fi 保護アクセス) 標準の複数実装をサポートします。"
						},{
							type: "name",
							title: "WPA",
							content: "このオプションは、最適なレベルのセキュリティを提供します。"
						},{
							type: "name",
							title: "WPA2",
							content: "このオプションは、WPA-PSK よりも良いレベルのセキュリティを提供します。推奨されるオプションです。"
						}]
					},{
						type: "name",
						title: "暗号化",
						content: "次のセキュリティ暗号化タイプを選択してください:TKIP (Temporal Key Integrity Protocol)、AES (Advanced Encryption Standard)、または自動 (TKIP と AES の両方)。TKIP は 802.11n 仕様ではサポートされていないため、ルーターが 802.11n モードで動作している場合、TKIP 暗号化の使用は推奨されません。"
					},{
						type: "name",
						title: "RADIUS サーバー IP",
						content: "RADIUS サーバーの IP アドレスを入力します。"
					},{
						type: "name",
						title: "RADIUS ポート",
						content: "RADIUS サーバーのポート番号を入力します。"
					},{
						type: "name",
						title: "RADIUS パスワード",
						content: "RADIUS サーバーの共有パスワードを入力します。"
					}]
				},{
				type: "name",
				title: "WEP",
				content: "いずれかのクライアント デバイスが WEP (Wired Equivalent Privacy) でしかワイヤレスにアクセスできない場合に基本認証方式を有効にするには、このオプションを選択します。これを選択すると、WPS 機能はこの帯域でサポートされません。",
				children: [{
					type: "name",
					title: "タイプ",
					content: "ワイヤレス ネットワークの認証タイプを選択します。既定は [自動] で、ワイヤレス クライアントの機能とアクセス要求に基づいて自動的にオープン システムまたは共有鍵を選択します。"
				},{
					type: "name",
					title: "WEP キー形式",
					content: "ASCII 形式を使用するか、16 進を選択します。ASCII 形式は、ASCII 文字の組み合わせです。16 進形式は、数字 (0-9) と文字 (A-F、a-f) の組み合わせです。"
				},{
					type: "name",
					title: "キー タイプ",
					content: "WEP キーの長さを選択します。",
					children: [{
						type: "name",
						title: "64 ビット",
						content: "10 桁の 16 進数 (0-9、A-F、a-f) または 5 桁の ASCII 文字を [WEP 値] フィールドに入力できます。"
					},{
						type: "name",
						title: "128 ビット",
						content: "26 桁の 16 進数 (0-9、A-F、a-f) または 13 桁の ASCII 文字を [WEP 値] フィールドに入力できます。"
					}]
				},{
					type: "name",
					title: "キーの値",
					content: "それぞれのフィールドに WEP キーを入力します。"
				}]
			}]
			},{
				type: "name",
				title: "モード",
				content: "転送モードを選択します。"
			},{
				type: "name",
				title: "チャンネル幅",
				content: "2.4GHz ワイヤレス ネットワークのチャンネル幅 (帯域幅) を選択します。"
			},{
				type: "name",
				title: "チャンネル",
				content: "2.4GHz ワイヤレス ネットワークの動作チャンネルを選択します。中間ワイヤレス接続問題が発生していない場合は、チャンネルを [自動] のままにしておくことを推奨します。"
			},{
				type: "name",
				title: "転送強度",
				content: "[高]、[中]、[低] のいずれかを選択して、データ転送の強度を指定します。既定の推奨される設定は [高] です。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		WIRELESS_5G: {	
			TITLE: "5GHz ワイヤレス",
			CONTENT: [{
				type: "name",
				title: "ワイヤレス ラジオを有効にする",
				content: "5GHz ワイヤレス ラジオの周波数を有効にするには、このチェックボックスをオンにします。これを無効にすると、WPS 機能はこの帯域でサポートされません。"
			},{
				type: "name",
				title: "ネットワーク名 (SSID)",
				content: "既定のネットワーク名 (SSID) をそのままにしておくか、新しい名前 (32 文字まで) を入力できます。このフィールドは大文字小文字が区別されます。"
			},{
				type: "name",
				title: "SSID を非表示にする",
				content: "Wi-Fi ネットワーク リストで 5GHz ネットワーク名 (SSID) を非表示にする場合は、このチェックボックスをオンにします。これを選択すると、WPS 機能はこの帯域でサポートされません。"
			},{
				type: "name",
				title: "セキュリティ",
				content: "以下のいずれかのセキュリティ オプションを選択してください。",
				children: [{
					type: "name",
					title: "セキュリティなし",
					content: "ワイヤレス セキュリティを無効にするには、このオプションを選択します。ワイヤレス ネットワークを未承認アクセスから保護するために、ワイヤレス セキュリティを有効にすることを強く推奨します。"
				},{
					type: "name",
					title: "WPA/WPA2-パーソナル",
					content: "パスワードフレーズとも呼ばれる事前共有キー (PSK) をベースとする標準認証方式を有効にするには、このオプションを選択します。このオプションが推奨されます。選択する場合は、以下を設定してください。",
					children: [{
						type: "name",
						title: "バージョン",
						content: "ワイヤレス ネットワークのセキュリティ バージョンを選択します。",
						children: [{
							type: "name",
							title: "自動",
							content: "このオプションは、WPA および WPA2 などの WPA (Wi-Fi 保護アクセス) 標準の複数実装をサポートします。"
						},{
							type: "name",
							title: "WPA-PSK",
							content: "このオプションは、最適なレベルのセキュリティを提供します。これを選択すると、WPS 機能はこの帯域でサポートされません。"
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "このオプションは、WPA-PSK よりも良いレベルのセキュリティを提供します。推奨されるオプションです。"
						}]
					},{
						type: "name",
						title: "暗号化",
						content: "次のセキュリティ暗号化タイプを選択してください:TKIP (Temporal Key Integrity Protocol)、AES (Advanced Encryption Standard)、または自動 (TKIP と AES の両方)。TKIP は 802.11n 仕様ではサポートされていないため、ルーターが 802.11n モードで動作している場合、TKIP 暗号化の使用は推奨されません。TKIP を選択すると、WPS 機能はこの帯域でサポートされません。"
					},{
						type: "name",
						title: "パスワード",
						content: "このフィールドにワイヤレス パスワードを 8 ～ 63 文字の ASCII 文字、あるいは 8 ～ 64 文字の 16 進文字で入力します。"
					}]
				},{
					type: "name",
					title: "WPA/WPA2 - エンタープライズ",
					content: "RADIUS (リモート認証ダイヤルイン ユーザー サービス) サーバーを使用するより高度な認証方法を有効にするには、このオプションを選択します。これを選択すると、WPS 機能はこの帯域でサポートされません。",
					children: [{
						type: "name",
						title: "バージョン",
						content: "ワイヤレス ネットワークのセキュリティ バージョンを選択します。",
						children: [{
							type: "name",
							title: "自動",
							content: "このオプションは、WPA および WPA2 などの WPA (Wi-Fi 保護アクセス) 標準の複数実装をサポートします。"
						},{
							type: "name",
							title: "WPA",
							content: "このオプションは、最適なレベルのセキュリティを提供します。"
						},{
							type: "name",
							title: "WPA2",
							content: "このオプションは、WPA-PSK よりも良いレベルのセキュリティを提供します。推奨されるオプションです。"
						}]
					},{
						type: "name",
						title: "暗号化",
						content: "次のセキュリティ暗号化タイプを選択してください:TKIP (Temporal Key Integrity Protocol)、AES (Advanced Encryption Standard)、または自動 (TKIP と AES の両方)。TKIP は 802.11n 仕様ではサポートされていないため、ルーターが 802.11n モードで動作している場合、TKIP 暗号化の使用は推奨されません。"
					},{
						type: "name",
						title: "RADIUS サーバー IP",
						content: "RADIUS サーバーの IP アドレスを入力します。"
					},{
						type: "name",
						title: "RADIUS ポート",
						content: "RADIUS サーバーのポート番号を入力します。"
					},{
						type: "name",
						title: "RADIUS パスワード",
						content: "RADIUS サーバーの共有パスワードを入力します。"
					}]
				},{
					type: "name",
					title: "WEP",
					content: "いずれかのクライアント デバイスが WEP (Wired Equivalent Privacy) でしかワイヤレスにアクセスできない場合に基本認証方式を有効にするには、このオプションを選択します。これを選択すると、WPS 機能はこの帯域でサポートされません。",
					children: [{
						type: "name",
						title: "タイプ",
						content: "ワイヤレス ネットワークの認証タイプを選択します。既定は [自動] で、ワイヤレス クライアントの機能とアクセス要求に基づいて自動的にオープン システムまたは共有鍵を選択します。"
					},{
						type: "name",
						title: "WEP キー形式",
						content: "ASCII 形式を使用するか、16 進を選択します。ASCII 形式は、英数字の組み合わせです。16 進形式は、数字 (0-9) と文字 (A-F、a-f) の組み合わせです。"
					},{
						type: "name",
						title: "キー タイプ",
						content: "WEP キーの長さを選択します。",
						children:[{
							type: "name",
							title: "64 ビット",
							content: "10 桁の 16 進数 (0-9、A-F、a-f) または 5 桁の ASCII 文字を [WEP 値] フィールドに入力できます。"
						},{
							type: "name",
							title: "128 ビット",
							content: "26 桁の 16 進数 (0-9、A-F、a-f) または 13 桁の ASCII 文字を [WEP 値] フィールドに入力できます。"
						}]
					},{
						type: "name",
						title: "キーの値",
						content: "それぞれのフィールドに WEP キーを入力します。"
					}]
				}]
			},{
				type: "name",
				title: "モード",
				content: "転送混合モードを選択します。"
			},{
				type: "name",
				title: "チャンネル幅",
				content: "5GHz ワイヤレス ネットワークのチャンネル幅 (帯域幅) を選択します。"
			},{
				type: "name",
				title: "チャンネル",
				content: "5GHz ワイヤレス ネットワークの動作チャンネルを選択します。中間ワイヤレス接続問題が発生していない場合は、チャンネルを [自動] のままにしておくことを推奨します。"
			},{
				type: "name",
				title: "転送強度",
				content: "[高]、[中]、[低] のいずれかを選択して、データ転送の強度を指定します。既定の推奨される設定は [高] です。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		WIRELESS_60G: {	
			TITLE: "60GHz ワイヤレス",
			CONTENT: [{
				type: "name",
				title: "ワイヤレス ラジオを有効にする",
				content: "60GHz ワイヤレス ラジオの周波数を有効にするには、このチェックボックスをオンにします。これを無効にすると、WPS 機能はこの帯域でサポートされません。"
			},{
				type: "name",
				title: "ネットワーク名 (SSID)",
				content: "既定のネットワーク名 (SSID) をそのままにしておくか、新しい名前 (32 文字まで) を入力できます。このフィールドは大文字小文字が区別されます。"
			},{
				type: "name",
				title: "SSID を非表示にする",
				content: "Wi-Fi ネットワーク リストで 60GHz ネットワーク名 (SSID) を非表示にする場合は、このチェックボックスをオンにします。これを選択すると、WPS 機能はこの帯域でサポートされません。"
			},{
				type: "name",
				title: "セキュリティ",
				content: "以下のいずれかのセキュリティ オプションを選択してください。",
				children: [{
					type: "name",
					title: "セキュリティなし",
					content: "ワイヤレス セキュリティを無効にするには、このオプションを選択します。ワイヤレス ネットワークを未承認アクセスから保護するために、ワイヤレス セキュリティを有効にすることを強く推奨します。"
				},{
					type: "name",
					title: "WPA2-パーソナル",
					content: "パスワードフレーズとも呼ばれる事前共有キー (PSK) をベースとする標準認証方式を有効にするには、このオプションを選択します。暗号化タイプは GCMP です。このオプションが推奨されます。選択する場合は、以下を設定してください。",
					children: [{
						type: "name",
						title: "パスワード",
						content: "このフィールドにワイヤレス パスワードを 8 ～ 63 文字の ASCII 文字、あるいは 8 ～ 64 文字の 16 進文字で入力します。"
					}]
				},{
					type: "name",
					title: "WPA2-エンタープライズ",
					content: "RADIUS (リモート認証ダイヤルイン ユーザー サービス) サーバーを使用するより高度な認証方法を有効にするには、このオプションを選択します。暗号化タイプは GCMP です。これを選択すると、WPS 機能はこの帯域でサポートされません。",
					children: [{
						type: "name",
						title: "RADIUS サーバー IP",
						content: "RADIUS サーバーの IP アドレスを入力します。"
					},{
						type: "name",
						title: "RADIUS ポート",
						content: "RADIUS サーバーのポート番号を入力します。"
					},{
						type: "name",
						title: "RADIUS パスワード",
						content: "RADIUS サーバーの共有パスワードを入力します。"
					}]
				}]
			},{
				type: "name",
				title: "チャンネル",
				content: "60GHz ワイヤレス ネットワークの動作チャンネルを選択します。中間ワイヤレス接続問題が発生していない場合は、チャンネルを [自動] のままにしておくことを推奨します。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		WPS: {	
			TITLE: "ルーターの PIN",
			CONTENT: [{
				type: "paragraph",
				content: "その他のデバイスがルーターの PIN を使って WPS によりこのルーターに接続できます。"
			},{
				type: "name",
				title: "ルーターの PIN",
				content: "ワイヤレス デバイスがルーターの PIN (個人識別番号) を使用してルーターに接続できるようにするにはオンにします。"
			},{
				type: "name",
				title: "PIN",
				content: "ルーターの PIN を表示します。既定の PIN はルーターのラベルで確認できます。[生成] をクリックして新しい PIN をランダムに生成するか、[既定] をクリックして現在の PIN を工場出荷時の既定 PIN に復元します。"
			}]
		},

		WPS_WIZARD: {
			TITLE: "WPS ウィザード",
			CONTENT:[{
				type: "paragraph",
				content: "WPS は次の設定のみをサポートします: WPS 機能が有効になっている状態で、enable <ワイヤレス ラジオを有効にする>、disable <SSID を非表示にする>、および security <セキュリティなし> または <WPA/WPA2-パーソナル>(WPA2-PSK または自動 + AES または自動)。"
			},{
				type: "name",
				title: "プッシュ ボタン (推奨)",
				content: "WPS ボタンを使用して、または [接続] ボタンを使用して仮想的に WPS 対応デバイスをワイヤレス ネットワークに簡単に接続できるように　WPS 機能を有効にするには、この接続方式を選択します。"
			},{
				type: "name",
				title: "PIN",
				content: "フィールドにワイヤレス デバイスの WPS PIN を入力してデバイスを手動で追加するには、この接続方式を選択し、[接続] をクリックします。"
			}]
		},

		WIRELESS_STATISTICS: {	
			TITLE: "ワイヤレス ステーション オンライン",
			CONTENT: [{
				type: "name",
				title: "クライアント総数",
				content: "関連付けられているワイヤレス クライアントの数を表示します。"
			},{
				type: "name",
				title: "MAC アドレス",
				content: "関連付けられているワイヤレス クライアントの MAC アドレスを表示します。"
			},{
				type: "name",
				title: "接続タイプ",
				content: "関連付けられているワイヤレス クライアントのワイヤレス周波数帯域 (2.4GHz、5GHz、60GHz) を表示します。"
			},{
				type: "name",
				title: "セキュリティ",
				content: "関連付けられているワイヤレス クライアントのセキュリティ タイプを表示します。"
			},{
				type: "name",
				title: "受信済みパケット",
				content: "関連付けられているワイヤレス クライアントによって受信されたパケット数を表示します。"
			},{
				type: "name",
				title: "送信済みパケット",
				content: "関連付けられているワイヤレス クライアントによって送信されたパケット数を表示します。"
			},{
				type: "paragraph",
				content: "このページの情報を更新するには [更新] をクリックします。"
			}]
		},
		
		GUEST_NETWORK_SETTINGS:{
			TITLE: "設定",
			CONTENT: [{
				type: "paragraph",
				content: "ゲスト ネットワークでは、ワイヤレス ネットワークにアクセスするためにゲストが使用できる別のワイヤレス ネットワーク名 (SSID) とパスワードを持つ別のネットワークをセットアップできます。"
			},{
				type: "name",
				title: "ゲストどうしを見えるようにする",
				content: "ゲスト ネットワーク上のワイヤレス デバイスが互いに見えるようにするには、このチェック ボックスをオンにします。"
			},{
				type: "name",
				title: "ゲストが自分のローカル ネットワークにアクセスすることを許可する",
				content: "ゲスト ネットワーク上のワイヤレス デバイスがローカル ネットワーク共有とプリンターにアクセスできるようにするには、このチェック ボックスをオンにします。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		GUEST_NETWORK_WIRELESS:{	
			TITLE: "2.4GHz/5GHz ワイヤレス",
			CONTENT: [{
				type: "name",
				title: "ゲスト ネットワークを有効にする",
				content: "ゲスト ネットワーク機能を有効にするには、このチェック ボックスをオンにします。"
			},{
				type: "name",
				title: "ネットワーク名 (SSID)",
				content: "既定のゲスト SSID を使用するか、新しい名前 (32 文字まで) を作成します。"
			},{
				type: "name",
				title: "SSID を非表示にする",
				content: "Wi-Fi ネットワーク リストでゲスト SSID を非表示にする場合は、このチェックボックスをオンにします。"
			}/*,{
				type:"name",
				id:"pwd_mode",
				title:"パスワード更新間隔",
				content:"ゲスト ネットワーク パスワードの更新間隔を選択します。"
			}*/,{
				type: "name",
				title: "セキュリティ",
				content: "パスワードを更新しないことを選択する場合、以下のいずれかのセキュリティ オプションを選択します。",
				children: [{
					type: "name",
					title: "セキュリティなし",
					content: "ワイヤレス セキュリティを無効にするには、このオプションを選択します。ゲスト ネットワークを未承認アクセスから保護するために、ワイヤレス セキュリティを有効にすることを強く推奨します。"
				},{
					type: "name",
					title: "WPA/WPA2-パーソナル",
					content: "パスワードフレーズとも呼ばれる事前共有キー (PSK) をベースとする標準認証方式を有効にするには、このオプションを選択します。選択する場合は、以下を設定してください。",
					children: [{
						type: "name",
						title: "バージョン",
						content: "ゲスト ネットワークのセキュリティ バージョンを選択します。",
						children: [{
							type: "name",
							title: "自動",
							content: "このオプションは、WPA および WPA2 などの WPA (Wi-Fi 保護アクセス) 標準の複数実装をサポートします。"
						},{
							type: "name",
							title: "WPA-PSK",
							content: "このオプションは、最適なレベルのセキュリティを提供します。"
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "このオプションは、WPA-PSK よりも良いレベルのセキュリティを提供します。推奨されるオプションです。"
						}]
					},{
						type: "name",
						title: "暗号化",
						content: "次のセキュリティ暗号化タイプを選択してください:TKIP (Temporal Key Integrity Protocol)、AES (Advanced Encryption Standard)、または自動 (TKIP と AES の両方)。TKIP は 802.11n 仕様ではサポートされていないため、ルーターが 802.11n モードで動作している場合、TKIP 暗号化の使用は推奨されません。"
					}]
			}]},{
				type: "name",
				title: "パスワード",
				content: "ランダムに生成されたパスワードを使用するか、8 ～ 63 文字の ASCII 文字、または 8 ～ 64 文字の 16 進数文字 (0-9、a-f、A-F) でパスワードを作成します。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},

		NAT: {
			TITLE: "アプリケーション レイヤー ゲートウェイ (ALG)",
			CONTENT: [{
				type: "paragraph",
				content: "ALG では、カスタマイズされたネットワーク アドレス変換 (NAT) トラバーサル フィルターをゲートウェイに設置して、FTP、TFTP、H323 などの特定のアプリケーション レイヤーの \"制御/データ\" プロトコル用のアドレスとポート変換をサポートします。ALG を有効にすることを推奨します。"
			},{
				type: "name",
				title: "FTP ALG を有効にする",
				content: "これを選択すると、FTP (ファイル転送プロトコル) クライアントとサーバーが NAT 経由でデータを転送できます。"
			},{
				type: "name",
				title: "TFTP ALG を有効にする",
				content: "これを選択すると、TFTP (簡易ファイル転送プロトコル) クライアントとサーバーが NAT 経由でデータを転送できます。"
			},{
				type: "name",
				title: "H323 ALG を有効にする",
				content: "これを選択すると、Microsoft NetMeeting クライアントが NAT 経由で通信できます。"
			},{
				type: "name",
				title: "RTSP ALG を有効にする",
				content: "これを選択すると、メディア クライアント プレイヤーが NAT 経由でストリーミング メディア サーバーと通信できます。"
			},{
				type: "name",
				title: "PPTP パススルーを有効にする",
				content: "これを選択すると、ポイント間セッションが、IP ネットワークを通過してルーターを通ることができます。"
			},{
				type: "name",
				title: "L2TP パススルーを有効にする",
				content: "これを選択すると、レイヤー 2 ポイント間セッションが、IP ネットワークを通過してルーターを通ることができます。"
			},{
				type: "name",
				title: "IPSec パススルーを有効にする",
				content: "これを選択すると、インターネット プロトコル セキュリティ (IPSec) が、IP ネットワークを通過してルーターを通ることができます。IPSec は暗号セキュリティ サービスを使用して、IP ネットワーク上でプライベートで安全な通信を行います。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},


		VIRTUAL_SERVERS: {
			TITLE: "仮想サーバー",
			CONTENT: [{
				type: "paragraph",
				content: "仮想サーバーは、ローカル ネットワーク上で公開用サービスをセットアップするために使用されます。仮想サーバーは外部ポートとして定義され、インターネットからこの外部ポートへのすべてのリクエストは、指定されたコンピューターにリダイレクトされます。これは静的または予約 IP アドレスで設定されている必要があります。"
			},{
				type: "name",
				title: "サービス タイプ",
				content: "仮想サーバーの名前を表示します。"
			},{
				type: "name",
				title: "外部ポート",
				content: "仮想サーバーによって使用されるポート番号またはポートの範囲を表示します。"
			},{
				type: "name",
				title: "内部 IP",
				content: "サービス アプリケーションを実行しているコンピューターの IP アドレスを表示します。"
			},{
				type: "name",
				title: "内部ポート",
				content: "サービス アプリケーションを実行しているコンピューターのポート番号を表示します。"
			},{
				type: "name",
				title: "プロトコル",
				content: "サービス アプリケーションに使用されるプロトコルを表示します:TCP、UDP、またはすべて (ルーターによってサポートされるすべてのプロトコル)。"
			},{
				type: "name",
				title: "ステータス",
				content: "特定のフィルタリング ルールの現在のステータス (有効または無効) を表示します。"
			},{
				type: "name",
				title: "変更",
				content: "対応するルールを修正または削除するオプションを表示します。"
			},{
				type: "step",
				title: "仮想サーバーのルールをセットアップするには",
				content: [
					"1.[追加] をクリックします。",
					"2.[既存のサービスの表示] をクリックして、リストからサービスを選択し、[外部ポート] および [内部ポート] フィールドに該当するポート番号を自動で入力します。サービスがリストされていない場合、外部ポート番号 (例: 21) またはポートの範囲 (例: 21-25)　を入力します。内部ポートが外部ポートと同じである場合は空にしておきます。または、外部ポートが 1 つのポートの場合は特定のポート番号　(例: 21) を入力できます。サービス アプリケーションを実行しているコンピューターの IP アドレスを [内部 IP] フィールドにドット 10 進表記で入力します。",
					"3.サービス アプリケーションのプロトコル[TCP]、[UDP]、または [すべて] を [プロトコル] ドロップダウン リストから選択します。",
					"4.[このエントリを有効にする] を選択します。",
					"5.[OK] をクリックします。"
				]
			},{
				type: "step",
				title: "仮想サーバーのルールを修正または削除するには",
				content: "表で、修正または削除するルールに対応する編集アイコンまたはゴミ箱アイコンをクリックします。"
			},{
				type: "step",
				title: "複数のルールを削除するには",
				content: "削除するすべてのルールを選択して、表の上にある [削除] をクリックします。"
			},{
				type: "note",
				title: "注",
				content: "ローカル ホスト デバイスが複数の使用可能なサービスをホストしている場合は、サービスごとにルールを作成する必要があります。"
			}]
		},

		PORT_TRIGGERING: {
			TITLE: "ポート トリガー",
			CONTENT: [{
				type: "paragraph",
				content: "ポート トリガーは、特定のポートでのトラフィックを、ネットワーク上の特定のサーバーに転送するために使用されます。"
			},{
				type: "name",
				title: "アプリケーション",
				content: "アプリケーションの名前を表示します。"
			},{
				type: "name",
				title: "トリガー ポート",
				content: "発信接続のフィルタリング ルールをトリガーするために使用される発信トラフィック ポートを表示します。"
			},{
				type: "name",
				title: "トリガー プロトコル",
				content: "トリガー ポートに使用されるプロトコルを表示します。TCP、UDP、またはすべて (ルーターによってサポートされるすべてのプロトコル)。"
			},{
				type: "name",
				title: "外部ポート",
				content: "リモート システムによって使用されるポートまたはポート範囲を表示します。これらのポートのいずれかを使用した応答は、このルールをトリガーした PC に転送されます。最大で 5 つのグループのポート (またはポート セクション) を入力できます。各ポート グループは、\",\" (コンマ) で区切る必要があります。例えば、2000-2038, 2046, 2050-2051, 2085, 3010-3030 のようにします。"
			},{
				type: "name",
				title: "外部プロトコル",
				content: "受信ポートに使用されるプロトコルを表示します:TCP、UDP、またはすべて (ルーターによってサポートされるすべてのプロトコル)。"
			},{
				type: "name",
				title: "ステータス",
				content: "特定のフィルタリング ルールの現在のステータス (有効または無効) を表示します。"
			},{
				type: "name",
				title: "変更",
				content: "対応するルールを修正または削除するオプションを表示します。"
			},{
				type: "step",
				title: "ポート トリガーのルールをセットアップするには",
				content: [{
					type: "note",
					title: "注",
					content: "各ルールは、同時に 1 つのホストによってのみ使用できます。"
				},
					"1.[追加] をクリックします。",
					"2.[既存のアプリケーションの表示] をクリックして、リストからアプリケーションを選択し、既定値を該当フィールドに自動で入力します。リストされていないアプリケーションを追加する場合は、アプリケーション、トリガー ポート、トリガー プロトコル、外部ポート、および外部プロトコルを手動で入力します。",
					"3.[このエントリを有効にする] を選択します。",
					"4.[OK] をクリックします。"
				]
			},{
				type: "step",
				title: "ポート トリガーのルールを修正または削除するには",
				content: "表で、修正または削除するルールに対応する編集アイコンまたはゴミ箱アイコンをクリックします。"
			},{
				type: "step",
				title: "複数のポート トリガーのルールを削除するには",
				content: "表で、削除対象のすべてのルールを選択して、表の上にある [削除] をクリックします。"
			}]
		},

		DMZ: {
			TITLE: "DMZ",
			CONTENT: [{
				type: "paragraph",
				content: "DMZ (非武装地帯) ホスト機能では、インターネット ゲームやビデオ会議などの特定の目的のサービスのために、ローカル ホストをインターネットに公開することができます。基本的に、DMZ では LAN 上の 1 つのコンピューターがそのすべてのポートをオープンできます。このコンピューターは、静的 IP アドレスで設定されている必要があり、DHCP クライアント機能が無効になっていなければなりません。"
			},{
				type: "step",
				title: "コンピューターまたはサーバーを DMZ サーバーとして割り当てるには",
				content: [
					"1.[DMZ を有効にする] を選択します。",
					"2.[DMZ ホスト IP アドレス] フィールドで、ローカル コンピューターの IP アドレスを入力し、DMZ ホストとしてセットアップします。",
					"3.[保存] をクリックします。"
				]
			}]
		},
		
		UPNP: {
			TITLE: "UPnP",
			CONTENT: [{
				type: "paragraph",
				content: "既定では、ユニバーサル プラグアンドプレイ (UPnP) 機能は、コンピューターやインターネット機器などのデバイスがローカル ネットワーク上で相互に自動で検出および通信できるようにするために、有効になっています。"
			},{
				type: "paragraph",
				content: "UPnP サービス リストは、UPnP デバイス情報を表示します。"
			},{
				type: "name",
				title: "サービスの説明",
				content: "UPnP リクエストを開始するローカル ホストの簡単な説明を表示します。"
			},{
				type: "name",
				title: "外部ポート",
				content: "ローカル ホストによってオープンされる外部ポートを表示します。"
			},{
				type: "name",
				title: "プロトコル",
				content: "ローカル ホストによって使用されるネットワーク プロトコル タイプを表示します。"
			},{
				type: "name",
				title: "インターネット IP アドレス",
				content: "ローカル ホストの IP アドレスを表示します。"
			},{
				type: "name",
				title: "内部ポート",
				content: "ローカル ホストによってオープンされる内部ポートを表示します。"
			},{
				type: "paragraph",
				content: "UPnP サービス リストを更新するには [更新] をクリックします。"
			}]
		},
		
		DISK_SETTING: {	
			TITLE: "デバイス設定",
			CONTENT: [{
				type: "paragraph",
				content: "[デバイス設定] ページは、USB ポート経由で接続された USB ストレージ デバイスの関連情報を表示します。"
			},{
				type: "name",
				title: "スキャン",
				content: "通常、ルーターは新たに接続されたデバイスを自動で検出します。自動検出されない場合は、このボタンをクリックして、接続された新しいデバイスをスキャンし、最新の情報でページを更新します。"
			},{
				type: "name",
				title: "ボリューム",
				content: "USB ボリュームの名前を表示します。"
			},{
				type: "name",
				title: "容量",
				content: "USB の総容量を表示します。"
			},{
				type: "name",
				title: "空き領域",
				content: "現在使用可能な空きストレージ領域を表示します。"
			},{
				type: "name",
				title: "安全な取り外し",
				content: "USB ストレージ デバイスを物理的にルーターから取り外す前に、このボタンをクリックして安全にマウント解除します。"
			},{
				type: "paragraph",
				content: "[安全な取り外し] ボタンは、USB ストレージ デバイスがルーターに接続されている場合にのみ表示されます。現在のボリュームがビジー状態の場合は　USB デバイスをマウント解除できません。"
			},{
				type: "name",
				title: "ステータス",
				content: "この表は、USB ストレージ デバイスがルーターに接続されている場合にのみ表示されます。USB デバイスのファイル共有を有効にするには、これを選択します。"
			},{
				type: "step",
				title: "ファイル サーバーをセットアップするには",
				content: [
				"1.USB ケーブルを使用してルーターの USB ポートに USB ストレージ デバイスを接続します。",
				"2.新たに接続された USB デバイスはルーターによって自動で検出され、[デバイス設定] セクションに情報が表示されます。自動検出されない場合は、[スキャン] をクリックします。",
				"3.USB ストレージ デバイスを共有しない場合は、電球をクリックして無効にします。"
				]
			}]
		},
		
		FOLDER_SHARE_ACCOUNT: {	
			TITLE: "共有アカウント",
			CONTENT: [{
				type: "name",
				title: "アカウント",
				content: "[既定のアカウントを使用] を選択して共有ファイルおよびフォルダーにログインするか、[新しいアカウントを使用] を選択して以下を入力し、新しいユーザー アカウントを作成します。"
			},{
				type: "name",
				title: "ユーザー名/パスワード",
				content: "1 ～ 15 文字の英数字またはアンダーラインでユーザー名を、1 ～ 15 文字の ASCII 文字でパスワードを入力します。これらのフィールドは大文字小文字が区別されます。"
			},{
				type: "name",
				title: "パスワードの確認",
				content: "誤字がないことを確かめるためにパスワードを再入力します。このフィールドでも大文字小文字が区別されます。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		FOLDER_SHARE_SETTINGS: {
			TITLE: "共有設定",
			CONTENT: [{
				type: "name",
				title: "ネットワーク/メディア サーバー名",
				content: "接続されている USB ストレージ デバイスにアクセスするために使用される名前を表示します。名前は、4 ～ 15 文字で、英数字、アンダーライン、ハイフンで構成される必要があります。"
			},{
				type: "name",
				title: "有効",
				content: "アクセス方法を有効にするにはこれを選択します。"
			},{
				type: "name",
				title: "アクセス方法",
				content: "接続されている USB ストレージ デバイスにアクセスできる 3 つのアクセス方法があります。対応するチェック ボックスで、1 つ以上のアクセス方法を選択できます。",
				children: [{
					type: "name",
					title: "ネットワーク近隣",
					content: "有効にすると、ネットワーク上のユーザーは、割り当て IP アドレス (例: \\\\192.168.0.1) で USB ストレージ デバイスにアクセスできます。"
				},{
					type: "name",
					title: "FTP",
					content: "有効にすると、ローカル ネットワーク上の FTP クライアントは、割り当て IP アドレスと FTP サーバーのポート番号 (例: ftp://192.168.0.1:21) で USB ストレージ デバイスにアクセスできます。"
				},{
					type: "name",
					title: "FTP (インターネット経由)",
					content: "有効にすると、インターネット上で FTP を介してリモートで USB ストレージ ドライブにアクセスできます。この機能は、ファイルのダウンロードとアップロードの両方をサポートします。FTP サーバーのポート番号を変更するには、ポート番号を入力して [保存] をクリックし、変更を適用します。"
				}]
			},{
				type: "name",
				title: "リンク",
				content: "共有 USB ストレージ デバイスにアクセスするために使用されるアドレスを表示します。"
			},{
				type: "name",
				title: "ポート",
				content: "FTP サーバーのポート番号を表示します。既定値 21 を使用するか、1024 ～ 65535 の値を入力します。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		FOLDER_SHARE_FOLDERS: {
			TITLE: "フォルダー共有",
			CONTENT: [{
				type: "name",
				title: "すべて共有",
				content: "すべてのファイルとフォルダーを共有するにはオンにし、選択されたフォルダーのみを共有するにはオフにします。"
			},{
				type: "name",
				title: "認証を有効にする",
				content: "共有フォルダーにアクセスするための有効なユーザー名とパスワードをユーザーに入力させるために認証を有効にすることを強く推奨します。"
			},{
				type: "name",
				title: "フォルダー名",
				content: "共有フォルダーの名前を表示します。"
			},{
				type: "name",
				title: "フォルダー パス",
				content: "共有フォルダーのパスを表示します。"
			},{
				type: "name",
				title: "メディア共有",
				content: "共有フォルダーがメディア共有可能かどうかを示します。"
			},{
				type: "name",
				title: "ボリューム名",
				content: "共有ボリュームの名前を表示します。"
			},{
				type: "name",
				title: "ステータス",
				content: "電球インジケーターで共有フォルダーのステータスを表示します。"
			},{
				type: "name",
				title: "変更",
				content: "対応する共有フォルダーを修正または削除するオプションを表示します。"
			},{
				type: "name",
				title: "参照",
				content: "共有フォルダーを検索するにはこれをクリックします。"
			},{
				type: "name",
				title: "ゲスト ネットワーク アクセスを許可",
				content: "ゲスト ネットワーク上のクライアントが共有フォルダーにアクセスできるようにするには、これを選択します。"
			},{
				type: "name",
				title: "認証を有効にする",
				content: "ユーザーに有効なユーザー名とパスワードで共有フォルダーにアクセスさせるには、これを選択します。"
			},{
				type: "name",
				title: "書き込みアクセスを有効にする",
				content: "ユーザーがフォルダーの内容を変更できるようにするには、これを選択します。"
			},{
				type: "name",
				title: "メディア共有を有効にする",
				content: "メディア共有を有効にするには、これを選択します。"
			},{
				type: "name",
				title:"更新",
				content: "共有フォルダー　リストを更新するにはこれをクリックします。"
			}]
		},
		
		PRINT_SERVER: {	
			TITLE: "印刷サーバー",
			CONTENT: [{
				type: "name",
				title:"印刷サーバー",
				content: "印刷サーバー機能を有効にするにはオンにします。"
			},{
				type: "name",
				title:"プリンター名",
				content: "ルーターに接続されているプリンターの名前を表示します。"
			}]
		},
		
		OFFLINE_DOWNLOAD: {	
			TITLE: "オフライン ダウンロード",
			CONTENT: [{
				type: "name",
				title:"ステータス",
				content: "オフライン ダウンロード機能を有効にするにはこれをオンにします。"
			},{
				type: "name",
				title:"フォルダー パス",
				content: "オフライン ダウンロード機能の作業ディレクトリ。ステータス　ボタンがオンになった後、ディレクトリ　パスを選択する必要があります。これをしないと、項目操作テーブルが非表示のままになり、それ以降の操作を行うことができません。作業ディレクトリが設定されると、以降の操作で作成されるすべてのファイルがこのディレクトリに保存またはキャッシュされます。アクティブ項目がある場合は、作業ディレクトリを変更できません。USB ストレージを取り外すと修復できない致命的なエラーが発生する可能性があるため、取り外さないでください。"
			},{
				type: "name",
				title:"スケジュールで設定できます",
				content: "これを選択すると、ダウンロード時間を設定できます。時間のスケジュールは、ルーターのシステム時刻に基づいて有効になります。これは、[システム ツール] -> [時刻設定] で設定できます。"
			},{
				type: "name",
				title:"タスク完了後もシード処理を維持",
				content: "これを選択すると、完了したタスクがシード処理を続けます。"
			},{
				type: "name",
				title: "アクティブ タスクの最大数",
				content: "アクティブ タスクの最大数を表示します。"
			},{
				type: "name",
				title:"最大ダウンロード速度",
				content: "最大ダウンロード速度を表示します。"
			},{
				type: "name",
				title:"最大アップロード速度",
				content: "最小アップロード速度を表示します。"
			},{
				type: "name",
				title: "接続数",
				content: "接続設定を表示します。"
			},{
				type: "name",
				title: "グローバル接続最大数",
				content: "すべてのタスクの最大接続数を制限するにはこれを変更します。"
			},{
				type: "name",
				title: "トレントあたりの接続ピア最大数",
				content: "タスクあたりの接続ピア最大数を制限するにはこれを変更します。"
			},{
				type: "name",
				title: "DHT ネットワークを有効にする",
				content: "これを選択すると、DHT が有効になります。"
			},{
				type: "name",
				title: "ピア交換を有効にする",
				content: "これを選択すると、ピア情報交換が有効になります。"
			},{
				type: "name",
				title: "BitTorrent プロトコル暗号化を有効にする",
				content: "これを選択すると、BitTorrent プロトコルの暗号化が有効になります。"
			},{
				type: "name",
				title:"aMule サーバー",
				content: "接続する aMule サーバーの IP アドレスとポートを入力します。"
			}]
		},
		
		OFFLINE_DOWNLOAD_ITEMS: {
			TITLE: "項目",
			CONTENT: [{
				type: "paragraph",
				content: "ダウンロードされた項目を表示します。"
			},{
				type: "name",
				title: "ファイル",
				content: "ダウンロードされたファイルの名前を表示します。"
			},{
				type: "name",
				title:"速度",
				content: "アップロードおよびダウンロードの速度を表示します。"
			},{
				type: "name",
				title: "完了",
				content: "完了したサイズと合計サイズを表示します。"
			},{
				type: "name",
				title:"残り時間",
				content: "ダウンロードが完了するまでの残り時間を表示します。"
			},{
				type: "name",
				title:"接続ピア",
				content: "ピア接続情報を表示します。"
			},{
				type: "name",
				title: "ステータス",
				content: "タスク ステータスを表示します。"
			},{
				type: "name",
				title: "ソース",
				content: "ダウンロード タイプを表示します。"
			},{
				type: "step",
				title: "ダウンロード項目を追加するには",
				content: [
					"1.[追加] をクリックします。",
					"2.ダウンロード ソース タイプを選択します。",
					"1) PC からのトレント:[参照] をクリックして PC からトレント ファイルを選択します。",
					"2) USB からのトレント:ボリュームを選択し、[参照] をクリックして USB からトレント ファイルを選択します。",
					"3) URL:URL (HTTP、HTTPS、FTP、ed2k) を入力します。",
					"3.[OK] をクリックします。"
				]
			}]
		},
		
		PARENTAL_CONTROL: {	
			TITLE: "保護者による制限",
			CONTENT: [{
				type: "paragraph",
				content: "保護者による制限では、不適切なウェブサイト、成人指定のウェブサイト、悪意のあるウェブサイトをブロックしたり、1 日のうちの特定の時間でアクセスを制限したり (例えば、宿題の時間に Facebook や YouTube へのアクセスを制限) することができ、それと同時に、1 か所の中央制御点から、ホーム ネットワーク上のすべてのデバイスをマルウェアやフィッシングから保護できます。"
			},{
				type: "name",
				title: "保護者による制限",
				content: "保護者による制限機能を有効にするにはこれをオンにします。既定では、この機能は無効になっています。"
			}]
		},
		
		PARENTAL_CONTROL_DEVICES: {
			TITLE: "保護者による制限対象のデバイス",
			CONTENT: [{
				type: "paragraph",
				content: "保護者による制限対象のデバイスのリストを表示します。"
			},{
				type: "name",
				title: "デバイス名",
				content: "現在保護者による制限対象になっている、接続されているすべてのクライアント デバイスの名前を表示します。"
			},{
				type: "name",
				title: "MAC アドレス",
				content: "現在保護者による制限対象になっている、接続されているすべてのクライアント デバイスの MAC アドレスを表示します。"
			},{
				type: "name",
				title: "インターネット アクセス時間",
				content: "制限アクセス時間を表示します。時間のスケジュールは、ルーターのシステム時刻に基づいて有効になります。これは、[システム ツール] -> [時刻設定] で設定できます。"
			},{
				type: "name",
				title: "説明",
				content: "接続されているデバイスの簡単な説明を表示します。これはオプションの設定です。"
			},{
				type: "name",
				title: "ステータス",
				content: "対応するデバイスの保護者による制限の現在のステータス (有効または無効) を表示します。"
			},{
				type: "name",
				title: "変更",
				content: "対応するデバイスを修正または削除するオプションを表示します。"
			},{
				type: "step",
				title: "新しいクライアント デバイスを制限するには",
				content: [
					"1.[追加] をクリックします。",
					"2.[既存のデバイスの表示] をクリックして、アクセス デバイス リストから、現在接続されているデバイスを選択するか、デバイス名と MAC アドレスを手動で入力して、接続されていないデバイスを追加します。",
					"3.インターネット アクセス時間のアイコンをクリックして、制限を適用する時間範囲を指定します。",
					"4.[説明] フィールドに簡単な説明を入力します。(オプション)",
					"5.[このエントリを有効にする] を選択します。",
					"6.[OK] をクリックします。"
				]
			},{
				type: "paragraph",
				content: "保護者による制限エントリを修正または削除するには、編集アイコンをクリックして情報を編集するか、ゴミ箱アイコンをクリックして対応するエントリを削除します。"
			},{
				type: "paragraph",
				content: "複数のエントリを削除するには、すべてのエントリを選択して、表の上にある [削除] をクリックします。"
			}]
		},
		
		PARENTAL_CONTROL_RESTRICTION: {
			TITLE: "コンテンツ制限",
			CONTENT: [{
				type: "name",
				title: "ブラックリスト",
				content: "保護者による制限リストに指定されているクライアント デバイスからの一切のウェブサイト アクセスをブロックするために使用されるキーワードが含まれます。",
				children: [{
					type: "paragraph",
					content: "ブラックリストにキーワードを追加するには、[新しいキーワードを追加] をクリックします。キーワードを削除するには、削除するキーワードの (-) アイコンをクリックします。"
				}]
			},{
				type: "name",
				title: "ホワイトリスト",
				content: "保護者による制限リストで指定されているクライアント デバイスがアクセスを許可されているウェブサイト アドレスが含まれます。",
				children: [{
					type: "paragraph",
					content: "ホワイトリストにウェブサイトを追加するには、[新しいドメイン名を追加] をクリックします。ウェブサイトを削除するには、削除するウェブサイトの (-) アイコンをクリックします。"
				}]
			},{
				type: "note",
				title: "注",
				content: "キーワードは、ドメイン名にすることもできます。例えば、mail.google.com or www.facebook.com　などです。"
			},{
				type: "paragraph",
				content: "設定を保存するには、[保存] をクリックします。"
			}]
		},
		
		
		QOS: {
			TITLE: "QoS",
			CONTENT: [{
				type: "paragraph",
				content: "サービスの品質 (QoS) は、状況に応じてインターネット トラフィックの優先度付けを行うのに役立ちます。QoS ルール リスト内のデバイスまたはアプリケーションの優先度を指定できます。"
			},{
				type: "name",
				title: "QoS を有効にする",
				content: "QoS 機能を有効にするには、このボックスをオンにします。"				
			},{
				type: "name",
				title: "アップロード帯域幅",
				content: "ISP によって提供された最大アップロード帯域幅を入力します。"				
			},{
				type: "name",
				title: "ダウンロード帯域幅",
				content: "ISP によって提供された最大ダウンロード帯域幅を入力します。"
			},{
				type: "name",
				title: "高優先度",
				content: "高優先度トラフィックの割合を指定します。"
			},{
				type: "name",
				title: "中優先度",
				content: "中優先度トラフィックの割合を指定します。"
			},{
				type: "name",
				title: "低優先度",
				content: "低優先度トラフィックの割合を指定します。"
			},{
				type: "note",
				title: "注",
				content: "すべての優先度の最大量 (割合) は 100% です。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		QOS_RULE: {
			TITLE: "QoS ルール リスト",
			CONTENT: [{
				type: "name",
				title: "タイプ",
				content: "QoS リストを追加するタイプを選択します。"
			},{
				type: "step",
				title: "デバイス別に高/中/低優先度のルールをセットアップするには",
				content: [
					"1.[追加] をクリックします。",
					"2.[デバイス別] を選択します。",
					"3.[既存のデバイスの表示] をクリックして、アクセス デバイス リストから目的のデバイスを選択するか、[デバイス名] および [MAC アドレス] フィールドにデバイス名と MAC アドレスを手動で入力できます。",
					"4.[OK] をクリックします。"
				]
			},{
				type: "step",
				title: "アプリケーション別に高/中/低優先度のルールをセットアップするには",
				content: [
					"1.[追加] をクリックします。",
					"2.[アプリケーション別] を選択します。",
					"3.アプリケーション リストから目的のアプリケーションを選択するか、名前、プロトコル、および宛先ポート (1-65535) を対応するフィールドに設定することによってアプリケーションをカスタマイズできます。1 つのポート、または複数のポート、あるいはポート範囲を、コンマで区切って入力できます (例: 21,36-105,111)。",
					"4.[OK] をクリックします。"
				]
			},{
				type: "step",
				title: "物理ポート別に高/中/低優先度のルールをセットアップするには",
				content: [
					"1.[追加] をクリックします。",
					"2.[物理ポート別] を選択します。",
					"3.目的のポートを選択します。",
					"4.[OK] をクリックします。"
				]
			}]
		},
		
		
		QOS_DATABASE: {
			TITLE: "データベース アップグレード",
			CONTENT: [{
				type: "name",
				title: "新しいデータベース ファイル",
				content: "[参照] をクリックして、新しいデータベース ファイルを見つけます。ファイルを選択して、[アップグレード] をクリックして、データベースを新しいバージョンにアップグレードします。"
			},{
				type: "name",
				title: "データベース バージョン",
				content: "現在のデータベース バージョンを表示します。"
			}]
		},
		
		
		
		SECURITY_FIREWALL: {	
			TITLE: "ファイアウォール",
			CONTENT: [{
				type: "name",
				title: "SPI ファイアウォール",
				content: "ステートフル パケット インスペクション (SPI) ファイアウォールは、サイバー攻撃を防ぎ、プロトコルに基づいてルーターを通過するトラフィックを検証します。"
			}]
		},
		
		SECURITY_DOS: {
			TITLE: "DoS 保護",
			CONTENT: [{
				type: "name",
				title: "DoS 保護",
				content: "サービス拒否 (DoS) 保護は、ネットワークがサービス リクエストで氾濫する DoS 攻撃から LAN を防御します。"
			},{
				type: "name",
				title: "ICMP-FLOOD 攻撃フィルタリング",
				content: "インターネット制御メッセージ プロトコル (ICMP) フラッド攻撃を防ぐには、これを有効にします。",
				children: [{
					type: "name",
					title: "オフ",
					content: "保護なし。"
				},{
					type: "name",
					title: "低",
					content: "低レベルの保護で、ルーターのパフォーマンスへの影響は低いです。"
				},{
					type: "name",
					title: "中",
					content: "中レベルの保護で、ルーターのパフォーマンスへの影響はある程度感じられます。"
				},{
					type: "name",
					title: "高",
					content: "高レベルの保護で、ルーターのパフォーマンスへの影響は顕著です。"
				}]
			},{
				type: "name",
				title: "UDP-FLOOD 攻撃フィルタリング",
				content: "ユーザー データグラム プロトコル (UDP) フラッド攻撃を防ぐには、これを有効にします。"
			},{
				type: "name",
				title: "TCP-SYN-FLOOD 攻撃フィルタリング",
				content: "伝送制御プロトコル-同期 (TCP-SYN) フラッド攻撃を防ぐには、これを有効にします。"
			},{
				type: "name",
				title: "WAN ポートからの Ping パケットを無視",
				content: "WAN ポートからの Ping パケットを無視するには、これを有効にします。"
			},{
				type: "name",
				title: "LAN ポートからの Ping パケットを禁止",
				content: "LAN ポートからの Ping パケットを禁止するには、これを有効にします。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		SECURITY_LIST: {
			TITLE: "ブロックされた DoS ホスト リスト",
			CONTENT: [{
				type: "name",
				title: "ブロックされた DoS ホスト リスト",
				content: "ブロックされた DoS 攻撃ソースの IP アドレスと MAC アドレスをリストします。"
			},{
				type: "step",
				title: "エントリを削除するには",
				content: "ホスト リストで、削除対象のエントリを選択して、表の上にある [削除] をクリックします。"
			}]
		},
		
		ACCESS_CONTROL: {	
			TITLE: "アクセス コントロール",
			CONTENT: [{
				type: "paragraph",
				content: "アクセス コントロールは、特定のコンピューターやその他のデバイスによるネットワークへのアクセスを許可またはブロックするために使用されます。デバイスは、ブロックされると、他のデバイスと通信したり、インターネットに接続したりできなくなります。"
			},{
				type: "paragraph",
				content: "アクセス コントロールを使用するには、この機能を有効にしてブラックリストまたはホワイトリストを指定します。アクセス コントロールが無効 (オフ) になっている場合、ブラックリストに入っているデバイスを含むすべてのデバイスが接続を許可されます。"
			}]
		},
		
		ACCESS_MODE: {
			TITLE: "アクセス モード",
			CONTENT: [{
				type: "name",
				title: "ブラックリスト",
				content: "ブラックリスト内のデバイスのみが、ネットワークへのアクセスを許可されません。"
			},{
				type: "name",
				title: "ホワイトリスト",
				content: "ホワイトリスト内のデバイスのみが、ネットワークへのアクセスを許可されます。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		ACCESS_DEVICE: {
			TITLE: "オンライン デバイス",
			CONTENT: [{
				type: "name",
				title: "デバイス名",
				content: "接続されているデバイスの名前を表示します。"
			},{
				type: "name",
				title: "IP アドレス",
				content: "接続されているデバイスの IP アドレスを表示します。"
			},{
				type: "name",
				title: "MAC アドレス",
				content: "接続されているデバイスの MAC アドレスを表示します。"
			},{
				type: "name",
				title: "接続タイプ",
				content: "接続されているデバイスの接続タイプを表示します。"
			},{
				type: "step",
				title: "デバイスをブロックするには",
				content: "[オンライン デバイス] の表で、ブロック対象のデバイスに対応する [修正] 列のブロック アイコンをクリックします。"
			},{
				type: "step",
				title: "複数のデバイスをブロックするには",
				content: "[オンライン デバイス] の表で、ブロック対象のすべてのデバイスを選択して、表の上にある [ブロック] をクリックします。デバイスは、ブラックリストのデバイスに自動で追加されます。"
			}],
		},
		
		ACCESS_LIST: {
			TITLE: "ブラックリスト/ホワイトリストのデバイス",
			CONTENT: [{
				type: "step",
				title: "デバイスをブラックリスト/ホワイトリストに入れるには",
				content: [
					"1.[追加] をクリックします。",
					"2.[デバイス名] を入力します。",
					"3.デバイスの MAC アドレスを入力します。",
					"4.[OK] をクリックします。"
				]
			},{
				type: "step",
				title: "ブラックリスト/ホワイトリストのデバイスを修正または削除するには",
				content: "ブラックリスト/ホワイトリストの表で、修正または削除するデバイスに対応する編集アイコンまたはゴミ箱アイコンをクリックします。"
			},{
				type: "step",
				title: "ブラックリスト/ホワイトリストの複数のデバイスを削除するには",
				content: "ブラックリスト/ホワイトリスト表で、削除対象のすべてのデバイスを選択して、表の上にある [削除] をクリックします。"
			}]
		},
		
		
		IPMAC_BIND_SETTING: {	
			TITLE: "設定",
			CONTENT: [{
				type: "paragraph",
				content: "ARP (アドレス解決プロトコル) バインドは、デバイスの IP アドレスと MAC アドレスをバインドすることで LAN 内の特定のコンピューターのアクセスを制御するのに役立ちます。また、ARP バインドは、その他のデバイスが特定の IP アドレスを使用するのを防ぎます。"
			}]
		},
		
		IPMAC_BIND_ARP: {	
			TITLE: "ARP リスト",
			CONTENT: [{
				type: "paragraph",
				content: "現在接続されているデバイスの MAC アドレスと IP アドレスを表示します。"
			},{
				type: "name",
				title: "ARP エントリ数",
				content: "現在ルーターに接続されているデバイスの総数を表示します。"
			},{
				type: "name",
				title: "MAC アドレス",
				content: "接続されているデバイスの MAC アドレスを表示します。"
			},{
				type: "name",
				title: "IP アドレス",
				content: "接続されているデバイスに割り当てられている IP アドレスを表示します。"
			},{
				type: "name",
				title: "バインド済み",
				content: "MAC アドレスおよび IP アドレスがバインドされているかどうかを示します。"
			},{
				type: "name",
				title: "変更",
				content: "リストの対応するエントリをバインドまたは削除するオプションを表示します。"
			},{
				type: "note",
				title: "注",
				content: "同じ IP アドレスを複数の MAC アドレスにバインドすることはできません。"
			}]
		},
		
		IPMAC_BIND_LIST: {	
			TITLE: "バインド リスト",
			CONTENT: [{
				type: "step",
				title: "デバイスで ARP バインドをセットアップするには",
				content: [
					"1.[追加] をクリックします。",
					"2.デバイスの MAC アドレスを入力します。",
					"3.上記の MAC アドレスにバインドする IP アドレスを入力します。",
					"4.このデバイスの説明を入力します。(オプション)",
					"5.[このエントリを有効にする] を選択します。",
					"6.[OK] をクリックします。"
				]
			},{
				type: "step",
				title: "エントリを修正または削除するには",
				content: "バインド リストで、修正または削除するエントリに対応する編集アイコンまたはゴミ箱アイコンをクリックします。"
			},{
				type: "step",
				title: "複数のエントリを削除するには",
				content: "バインド リストで、削除対象のすべてのエントリを選択して、表の上にある [削除] をクリックします。"
			}]
		},
		
		IPV6: {
			TITLE: "インターネット",
			CONTENT: [{
				type: "name",
				title: "IPv6",
				content: "ルーターの IPv6 機能を有効 (オン) または無効 (オフ) にします。"
			},{
				type: "title",
				title: "インターネット接続タイプ:静的 IP",
			},{
				type: "name",
				title: "静的 IP",
				content: "ISP が静的 IPv6 アドレス割り当てを使用している場合は、これを選択します。"
			},{
				type: "name",
				title: "IPv6 アドレス/デフォルト ゲートウェイ/プライマリ DNS/セカンダリ DNS",
				content: "ISP によって提供されたとおりにパラメーターを入力します。"
			},{
				type: "name",
				title: "MTU サイズ",
				content: "ほとんどのイーサネット ネットワークの既定および標準の MTU (最大転送単位) サイズは 1500 バイトです。ISP によって要求されない限り、既定の MTU サイズの変更は推奨されません。"
			},{
				type: "title",
				title: "インターネット接続タイプ:動的 IP",
			},{
				type: "name",
				title: "動的 IP",
				content: "ISP が動的 IPv6 アドレス割り当てを使用している場合は、これを選択します。"
			},{
				type: "name",
				title: "IPv6 アドレス/プライマリ DNS/セカンダリ DNS",
				content: "これらのパラメーターは、ISP から DHCPv6 サーバーによって自動的に割り当てられます。"
			},{
				type: "name",
				title: "更新",
				content: "ISP の DHCPv6 サーバーから新しい IPv6 パラメーターを取得するには、このボタンをクリックします。"
			},{
				type: "name",
				title: "解放",
				content: "ISP の DHCPv6 サーバーによって割り当てられたすべての IPv6 アドレスを解放するには、このボタンをクリックします。"
			},{
				type: "name",
				title: "IPv6 アドレスの取得",
				content: "ISP に従って、非一時 IPv6 アドレスを取得するには DHCPv6、ルーター広告パケット から生成された IPv6 アドレスを取得するには SLAAC を選択します。"
			},{
				type: "name",
				title: "プレフィックス委任",
				content: "ISP から DHCPv6 サーバーによってプレフィックス委任を取得するには [有効ににする] を選択し、アドレス プレフィックスを手動で指定するには [無効ににする] を選択します。LAN 内のクライアントは、このプレフィックスを持つ IPv6 アドレスを生成します。"
			},{
				type: "name",
				title: "DNA アドレス",
				content: "[ISP から動的に取得] または [次の DNS アドレスを使用] を選択します。[次の DNS アドレスを使用] を選択した場合は、ISP によって提供された DNS アドレスを手動で入力してください。"
			},{
				type: "name",
				title: "プライマリ DNS/セカンダリ DNS",
				content: "これらのパラメーターを手動で入力するか、ISP から動的に取得します。"
			},{
				type: "title",
				title: "インターネット接続タイプ:PPPoE"
			},{
				type: "name",
				title: "PPPoE",
				content: "ISP が PPPoEv6 を使用していて、ユーザー名とパスワードを提供している場合はこれを選択します。"
			},{
				type: "name",
				title: "ユーザー名/パスワード",
				content: "ISP によって提供されたとおりにパラメーターを入力します。"
			},{
				type: "name",
				title: "IPv6 アドレス",
				content: "このアドレスは、ユーザー名とパスワードを入力して [接続] をクリックした後、ISP から DHCPv6 サーバーによって自動で割り当てられます。"
			},{
				type: "name",
				title: "DNA アドレス",
				content: "[ISP から動的に取得] または [次の DNS アドレスを使用] を選択します。[次の DNS アドレスを使用] を選択した場合は、ISP によって提供された DNS アドレスを手動で入力してください。"
			},{
				type: "name",
				title: "IPv6 アドレスの取得",
				content: "ISP に従って、非一時 IPv6 アドレスを取得するには DHCPv6、ルーター広告パケットから生成された IPv6 アドレスを取得するには SLAAC、IPv6 アドレスを手動で入力するには [ISP の指定] を選択します。"
			},{
				type: "name",
				title: "プレフィックス委任",
				content: "ISP から DHCPv6 サーバーによってプレフィックス委任を取得するには [有効ににする] を選択し、アドレス プレフィックスを手動で指定するには [無効ににする] を選択します。LAN 内のクライアントは、このプレフィックスを持つ IPv6 アドレスを生成します。"
			},{
				type: "name",
				title: "接続",
				content: "インターネットに接続するには、このボタンをクリックします。"
			},{
				type: "name",
				title: "切断",
				content: "インターネットから切断するには、このボタンをクリックします。"
			},{
				type: "title",
				title: "インターネット接続タイプ:6to4 トンネル"
			},{
				type: "name",
				title: "6to4 トンネル",
				content: "ISP がアドレスの割り当てに 6to4 展開を使用している場合は、このタイプを選択します。"
			},{
				type: "name",
				title: "IPv4 アドレス/IPv4 サブネット マスク/IPv4 デフォルト ゲートウェイ/トンネル アドレス",
				content: "これらのパラメーターは、[接続] をクリックした後、WAN ポートの IPv4 情報によって動的に生成されます。"
			},{
				type: "name",
				title: "次の DNS サーバーを使用",
				content: "ISP によって提供されたプライマリ DNS とセカンダリ DNS を手動で入力するには、このチェック ボックスを選択します。"
			},{
				type: "name",
				title: "接続",
				content: "インターネットに接続するには、このボタンをクリックします。"
			},{
				type: "name",
				title: "切断",
				content: "インターネットから切断するには、このボタンをクリックします。"
			}/*,{
				type: "title",
				title: "インターネット接続タイプ:6RD"
			},{
				type: "name",
				title: "6RD",
				content: "ISP が 6RD を使用していて、IPv4 アドレスと IPv6 アドレスのプレフィックスを提供している場合はこれを選択します。"
			},{
				type: "name",
				title: "設定タイプ",
				content: "ISP に従って、6RD チャンネル パラメーターを設定するために、[自動] または [手動] を選択します。以下の既定のパラメーターが　ISP から提供されたパラメーターと同じである場合は、[自動] を選択できます。それ以外の場合は、[手動] を選択して、ISP から提供されたパラメーターを入力します。"
			},{
				type: "name",
				title: "IPv4 マスク長/6RD プレフィックス/6RD プレフィックス長/ボーダー リプライ IPv4 アドレス",
				content: "事前設定されているパラメーターが、ISP から提供されたパラメーターと一致しているかを確認します。既定値をそのまま使用するか、ISP から提供されたパラメーターを入力することができます。"
			},{
				type: "title",
				title: "インターネット接続タイプ:DS-Lite"
			},{
				type: "name",
				title: "DS-Lite",
				content: "ISP が DS-Lite デプロイメントを使用していて、IPv6 ネットワークで IPv4-in-IPv6 トンネルをセットアップして IPv4 トラフィックスまたは IPv6 トラフィックスをそれぞれのネットワークで通信するための AFTR ドメイン名または IPv6 アドレスを提供している場合は、このタイプを選択します。"
			},{
				type: "name",
				title: "AFTR 名",
				content: "AFTR は Address Family Transition Router の頭字語です。このフィールドには、AFTR ドメイン名または ISP　から提供された IPv6 アドレスを入力します。"
			},{
				type: "name",
				title: "セカンダリ接続",
				content: "ISP によって提供されたセカンダリ接続タイプを選択します。",
				children :[ 
				{
					type: "name",
					title: "動的 IP",
					content: "ISP がセカンダリ接続タイプとして動的 IP を提供している場合はこれを選択します。パラメーター、IPv6 アドレス、プライマリ DNS とセカンダリ DNS は ISP から DHCPv6 サーバーによって自動的に割り当てられます。"
				},
				{
					type: "name",
					title: "静的 IP",
					content: "ISP がセカンダリ接続タイプとして静的 IP を提供している場合はこれを選択します。ISP から提供された IPv6 アドレス、デフォルト ゲートウェイ、プライマリ DNS とセカンダリ DNS を入力し、必要であれば MTU サイズを手動で設定するか、既定値をそのまま使用します。"
				},{
					type: "name",
					title: "PPPoE",
					content: "ISP がセカンダリ接続タイプとして PPPoE を提供している場合はこれを選択し、ISP から提供されたユーザー名とパスワードを入力します。IPv6 アドレスは、[接続] をクリックすると自動的に割り当てられます。"
				}]
			}*/,{
				type: "title",
				title: "インターネット接続タイプ:パススルー (ブリッジ)"
			},{
				type: "paragraph",
				content: "ISP がパススルー (ブリッジ) ネットワーク展開を使用している場合は、このタイプを選択します。このタイプの接続に必要な設定はありません。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		IPV6_LAN: {
			TITLE: "LAN",
			CONTENT: [{
				type: "paragraph",
				content: "パススルー (ブリッジ) を除くその他の 6 タイプのインターネット接続は、IPv6 設定が必要です。"
			},{
				type: "name",
				title: "割り当てられたタイプ",
				content: "ISP に従って適切なものを選択します。",
				children: [{
					type: "name",
					title: "DHCPv6",
					content: "LAN 内のクライアントに IP アドレスを自動で割り当てます。",
					children: [{
						type: "name",
						title: "アドレス プレフィックス",
						content: "ISP によって提供されたアドレス プレフィックスを入力します。"
					},{
						type: "name",
						title: "解放時間",
						content: "割り当てられた IP アドレスを有効なままにしておく時間 (秒)。既定の 86400 秒をそのまま使うか、ISP による指示がある場合はこれを変更します。"
					},{
						type: "name",
						title: "アドレス",
						content: "ISP から DHCPv6 サーバーによって自動で割り当てられた IP アドレスです。"
					}]
				},{
					type: "name",
					title: "SLAAC+ステートレス DHCP",
					connector:" ",
					children: [{
						type: "name",
						title: "アドレス プレフィックス",
						content: "ISP によって提供されたアドレス プレフィックスを入力します。"
					},{
						type: "name",
						title: "アドレス",
						content: "DSP によって自動で割り当てられた IP アドレスです。"
					}]
				},{
					type: "name",
					title: "SLAAC+RDNSS",
					connector:" ",
					children: [{
						type: "name",
						title: "アドレス プレフィックス",
						content: "ISP によって提供されたアドレス プレフィックスを入力します。"
					},{
						type: "name",
						title: "アドレス",
						content: "DSP によって自動で割り当てられた IP アドレスです。"
					}]
				}]
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		IPV6_MAC_CLONE: {
			TITLE: "MAC クローン",
			CONTENT: [{
				type: "name",
				title: "既定の MAC アドレスを使用",
				content: "割り当てられた IP アドレスを ISP が MAC アドレスにバインドしない場合は、ルーターの既定の MAC アドレスを変更しないでください。"
			},{
				type: "name",
				title: "現在のコンピューターの MAC アドレスを使用",
				content: "割り当てられた IP アドレスを ISP がコンピューターの MAC アドレスにバインドする場合は、接続されているコンピューターの現在の MAC アドレスをコピーするためにこれを選択します。"
			},{
				type: "name",
				title: "カスタム MAC アドレスを使用",
				content: "割り当てられた IP アドレスを ISP が特定の MAC アドレスにバインドする場合は、MAC アドレスを手動で入力します。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		TIME_SETTING: {	
			TITLE: "時刻設定",
			CONTENT: [{
				type: "step",
				title: "時刻を自動的に同期するには",
				content: [
					"1.[時刻の設定] フィールドで、[インターネットから自動で取得] を選択します。",
					"2.ドロップダウン メニューから地域のタイム ゾーンを選択します。",
					"3.[NTP サーバー I] フィールドに、目的の NTP サーバーの IP アドレスまたはドメイン名を入力します。",
					"4.[NTP サーバー II] フィールドに、2 つ目の NTP サーバーの IP アドレスまたはドメイン名を入力します。(オプション)",
					"5.[取得] をクリックします。",
					"6.[保存] をクリックします。"
				]
			},{
				type: "step",
				title: "日付と時刻を手動で設定するには",
				content: [
					"1.[時刻の設定] フィールドで、[手動] を選択します。",
					"2.現在の日付を入力します。",
					"3.現在の時刻　(24 時間形式。例: 16:00:00 は 04:00PM) を選択します。",
					"4.[保存] をクリックします。"
				]
			}]
		},
		
		TIME_SETTING_DAYLIGHT: {	
			TITLE: "夏時間",
			CONTENT: [{
				type: "step",
				title: "夏時間を設定するには",
				content: [
					"1.[夏時間を有効にする] を選択します。",
					"2.夏時間が地域のタイム ゾーンで開始する場合は、正しい開始日時を選択します。",
					"3.夏時間が地域のタイム ゾーンで開始する場合は、正しい終了日時を選択します。",
					"4.[保存] をクリックします。"
				]
			}]
		},
		DIGNOSTIC: {	
			TITLE: "診断",
			CONTENT: [{
				type: "paragraph",
				content: "ルーターには、ネットワーク接続問題のトラブルシューティングを行うのに役立つ Ping および Traceroute ツールが用意されています。Ping ツールは、パケットをターゲット IP アドレスまたはドメイン名に送信し、送受信されたパケット数やラウンドトリップ時間などの結果をログに記録します。Traceroute ツールは、パケットをターゲット IP アドレスまたはドメイン名に送信し、ホップ数と宛先到達時間を表示します。"
			},{
				type: "paragraph",
				content: "IP アドレスまたは google.com や yahoo.com　などのドメイン名でローカル デバイスを ping および traceroute できます。"
			},{
				type: "step",
				title: "Ping を使用して診断するには",
				content: [
					"1.ターゲット IP アドレスまたはドメイン名を入力します。",
					"2.矢印アイコンをクリックして [詳細設定] メニューを開き、Ping 数と Ping パケット サイズを指定します。(オプション)",
					"3.[開始] をクリックします。"
				]
			},{
				type: "step",
				title: "Traceroute を使用して診断するには",
				content: [
					"1.ターゲット IP アドレスまたはドメイン名を入力します。",
					"2.矢印アイコンをクリックして [詳細設定] メニューを開き、[Traceroute 最大 TTL (Time to Live)] フィールドにホップ数　(到達までの) を指定します。既定値は 20 です。(オプション)",
					"3.[開始] をクリックします。"
				]
			}]
		},
		FIRMWARE: {	
			TITLE: "ファームウェア アップグレード",
			CONTENT: [{
				type: "paragraph",
				content: "ルーターのファームウェアをアップグレードする前に、<a class=\"link\" href=\"javascript:void(0);\" id=\"update_url\" target=\"_blank\">TP-LINK サポート</a> ウェブサイトからコンピューターに最新のファームウェア アップデートをダウンロードする必要があります。"
			},{
				type: "step",
				title: "重要:アップグレードの失敗を避けるために、以下に注意してください。",
				content: [
					"最新のファームウェア ファイルがハードウェア バージョン ([ファームウェア アップグレード] ページに示されています) と一致するｋとを確認してください。",
					"ルーターとコンピューターの間の接続が安定していることを確認してください。ファームウェアをワイヤレスでアップグレードすることは推奨されません。",
					"データ損失を避けるため、ファームウェアをアップグレードする前に、ルーターに接続されている USB ストレージ デバイスを取り外しておいてください。",
					"ルーター設定のバックアップを取っておいてください。",
					"ファームウェア アップグレード中にルーターの電源を切らないでください。"
				]
			},{
				type: "step",
				title: "ルーターのファームウェアをアップグレードするには",
				content: [
					"1.[参照] をクリックします。",
					"2.ダウンロードされたファームウェア ファイルを見つけて選択します。",
					"3.[アップグレード] をクリックします。"
				]
			},{
				type: "paragraph",
				content: "アップグレード プロセスが完了するまでに数分かかります。アップグレード中にルーターの電源を切らないでください。"
			}]
		},
		
		BACKUP: {	
			TITLE: "バックアップ",
			CONTENT: [{
				type: "paragraph",
				content: "システムを以前の状態に、または工場出荷時の状態から復元するためにリカバリが必要になる場合に備えて、現在の設定をバックアップしておくことを強く推奨します。"
			},{
				type: "paragraph",
				content: "[バックアップ] をクリックして、現在の設定をコンピューターに保存します。バックアップ ファイルは、必要に応じて後で取り出したりルーターに復元したりすることができる安全な場所に保存してください。"
			}]
		},
		
		RESTORE: {
			TITLE: "復元",
			CONTENT: [{
				type: "step",
				title: "バックアップから復元するには",
				content: [
					"1.[参照] をクリックします。",
					"2.バックアップ ファイルを見つけて選択します。",
					"3.[復元]　をクリックします。"
				]
			}]
		},
		
		FACTORY: {
			TITLE: "既定の復元",
			CONTENT: [{
				type: "paragraph",
				content: "ルーターを工場出荷時の設定にリセットするには、[既定の復元] をクリックします。"
			},{
				type: "step",
				title: "注",
				content: [
					"1.既定の復元では、ルーター用に行ったすべての設定が消去されます。ルーターの管理ページに再ログインするには、ユーザー名とパスワードの両方に既定の admin を使用してください。",
					"2.バックアップまたは復元中にルーターの電源を切らないでください。"
				]
			}]
		},
		
		
		ADMIN_ACCOUNT: {	
			TITLE: "アカウント管理",
			CONTENT: [{
				type: "paragraph",
				content: "このページでは、ログイン ユーザー名とパスワードを変更したり、パスワード復元用のメール アドレスを設定できます。"
			},{
				type: "name",
				title: "古いユーザー名",
				content: "現在のユーザー名を入力します。"
			},{
				type: "name",
				title: "古いパスワード",
				content: "現在のパスワードを入力します。"
			},{
				type: "name",
				title: "新しいユーザー名",
				content: "新しいユーザー名を入力します。"
			},{
				type: "name",
				title: "新しいパスワード",
				content: "新しいパスワードを入力します。"
			},{
				type: "name",
				title: "新しいパスワードの確認",
				content: "新しいパスワードをもう一度入力します。"
			},{
				type: "note",
				title: "注",
				content: "ルーターへのログインに使用される現在のユーザー名とパスワードを変更する場合は、新しいログイン情報を書き留めて安全な場所に保管してください。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		ADMIN_RECOVERY: {
			TITLE: "パスワードの復元",
			CONTENT: [{
				type: "name",
				title: "パスワードの復元を有効にする",
				content: "パスワードの復元機能を有効にすることを強く推奨します。これにより、メールでユーザー名とパスワードをリセットできるようになります。"
			},{
				type: "name",
				title: "差出人",
				content: "送信メールに使用される有効なメール アドレスを入力します。"
			},{
				type: "name",
				title: "宛先",
				content: "受信メールに使用される有効なメール アドレスを入力します。"
			},{
				type: "name",
				title: "SMTP サーバー",
				content: "メールで確認コードを送信するためにルーターが使用する SMTP サーバー アドレスを入力します。"
			},{
				type: "name",
				title: "認証を有効にする",
				content: "送信メール サーバーがメールの送信に認証を必要とする場合は [認証を有効にする] を選択し、ユーザー名とパスワードを対応するフィールドに入力します。これらのフィールドは大文字小文字が区別されます。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		ADMIN_LOCAL: {	
			TITLE: "ローカル管理",
			CONTENT: [{
				type: "paragraph",
				content: "このセクションでは、MAC アドレス ベースの認証を使用して、ルーターにアクセスできる LAN 上のクライアント デバイスの数を制限できます。"
			},{
				type: "name",
				title: "すべての LAN 接続デバイスに対してアクセスを許可",
				content: "すべての LAN 接続デバイスのローカル管理を有効にするにはオンにします。特定のデバイスの管理を有効にするにはオフにします。"
			},{
				type: "name",
				title: "MAC アドレス",
				content: "制限されているアクセス デバイスの MAC アドレスを表示します。"
			},{
				type: "name",
				title: "説明",
				content: "制限されているアクセス デバイスの説明を表示します。"
			},{
				type: "name",
				title: "ステータス",
				content: "制限されているアクセス デバイス (有効または無効) の現在のステータスを表示します。"
			},{
				type: "name",
				title: "変更",
				content: "リストの対応するデバイスを修正または削除するオプションを表示します。"
			},{
				type: "step",
				title: "クライアント デバイスをリストに追加するには",
				content: [
					"1.[追加] をクリックします。",
					"2.[既存のデバイスの表示] をクリックして既存のデバイスを選択するか、デバイスの MAC アドレスを [MAC アドレス] フィールドに入力します。",
					"3.デバイスの説明を入力します。",
					"4.[このエントリを有効にする] を選択します。",
					"5.[OK] をクリックします。"
				]
			},{
				type: "step",
				title: "リストのデバイスを修正または削除するには",
				content: "表で、修正または削除するデバイスに対応する編集アイコンまたはゴミ箱アイコンをクリックします。"
			},{
				type: "step",
				title: "複数のデバイスを削除するには",
				content: "削除するすべてのデバイスを選択して、[削除] をクリックします。"
			}]
		},
		ADMIN_REMOTE: {	
			TITLE: "リモート管理",
			CONTENT: [{
				type: "paragraph",
				content: "リモート管理機能では、インターネットからリモートでルーターにアクセスして設定することができます。"
			},{
				type: "name",
				title: "リモート管理を無効にする",
				content: "リモート管理を無効にするには、このオプションを選択します。"
			},{
				type: "name",
				title: "すべてのデバイスのリモート管理を有効にする",
				content: "すべての IP アドレスについてリモート管理を有効にするには、このオプションを選択します。これを選択した場合は、[Web 管理ポート] フィールドを入力します。"
			},{
				type: "name",
				title: "指定されたデバイスのリモート管理を有効にする",
				content: "特定の IP アドレスについてリモート管理を有効にするには、このオプションを選択します。これを選択した場合は、[Web 管理ポート] および [リモート管理 IP アドレス] フィールドを入力します。"
			},{
				type: "name",
				title: "Web 管理ポート",
				content: "ポート番号 (1024 ～ 65535)　を入力します。これは、強力なセキュリティでルーターの Web 管理インターフェイスにアクセスするために使用されます。通常、Web ブラウザーは標準の HTTP サービス ポート 80　を使用します。既定および一般的なサービス ポートは 8080 で、これは HTTP の代替サービス ポートです。"
			},{
				type: "name",
				title: "リモート管理 IP アドレス",
				content: "ルーターへのアクセスが許可される有効な IP アドレスを入力します。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		
		SYSTEM_LOG: {	
			TITLE: "システム ログ",
			CONTENT: [{
				type: "paragraph",
				content: "[システム ログ] ページは、ルーターの最新のアクティビティ (イベント) のリストを表示します。表示するログの種類とレベルを定義できます。また、このページには、自動でログ ファイルを特定のメール アドレスに送信したり、ログ ファイルをコンピューターにエクスポートするように設定することができるメール機能があります。"
			},{
				type: "name",
				title: "タイプ",
				content: "表示するシステム ログのタイプを選択します。"
			},{
				type: "name",
				title: "レベル",
				content: "表示するシステム ログのレベルを選択します。"
			},{
				type: "name",
				title: "更新",
				content: "システム ログを更新するには、このアイコンをクリックします。"
			},{
				type: "name",
				title: "すべて削除",
				content: "すべてのシステム ログを削除するには、このアイコンをクリックします。"
			},{
				type: "name",
				title: "ログを保存",
				content: "すべてのシステム ログ ファイルをローカル コンピューターにダウンロードするには、このボタンをクリックします。"
			},{
				type: "name",
				title: "メール設定",
				content: "システム ログのメール設定を行うには、このボタンをクリックします。"
			},{
				type: "step",
				title: "システム ログのメール設定を行うには",
				content: [
					"1.[メール設定] をクリックします。",
					"2.差出人 - 送信メールに使用される有効なメール アドレスを入力します。",
					"3.宛先 - 受信メールに使用される有効なメール アドレスを入力します。",
					"4.SMTP サーバー - メールでシステム ログを送信するためにルーターが使用する SMTP サーバー アドレスを入力します。",
					{
						content: "5.認証を有効にする - SMTP サーバーがメールの送信に認証を必要とする場合は、このオプションを選択します。",
						children: [{
							type: "name",
							title: "ユーザー名",
							content: "SMTP サーバーのユーザー名を入力します。このフィールドは大文字小文字が区別されます。"
						},{
							type: "name",
							title: "パスワード",
							content: "SMTP サーバーのパスワードを入力します。このフィールドでも大文字小文字が区別されます。"
						}]
					},{
						content: "6.自動メールを有効にする - システム ログを自動で送信する時刻を指定するには、このオプションを選択します。",
						children: [{
							type: "paragraph",
							content: "特定の時刻にシステム ログを毎日送信するには、時間 (HH)、および分 (MM) を 24 時間表記　(16:00 は 4PM) で入力します。"
						},{
							type: "paragraph",
							content: "特定の時間または期間にシステムを送信するには、時間を入力します。"
						}]
					},
					"7.[保存] をクリックします。"
				]
			}]
		},

		TRAFFIC_STATISTIC: {	
			TITLE: "トラフィック統計",
			CONTENT: [{
				type: "paragraph",
				content: "[トラフィック統計] ページは、LAN、WAN、および WLAN パケット送受信のネットワーク トラフィックを表示します。"
			},{
				type: "name",
				title: "トラフィック統計",
				content: "統計情報を表示するにはオンにします。"
			}]
		},
		TRAFFIC_STATISTIC_LIST: {	
			TITLE: "トラフィック統計リスト",
			CONTENT: [{
				type: "name",
				title: "IP アドレス/MAC アドレス",
				content: "関連付けられたクライアント デバイスの IP アドレスと MAC アドレスを表示します。"
			},{
				type: "name",
				title: "合計パケット数",
				content: "セッションの開始または最後のカウンター リセットからクライアント デバイスによって送受信されたパケットの合計数を表示します。"
			},{
				type: "name",
				title: "合計バイト数",
				content: "セッションの開始または最後のカウンター リセットからクライアント デバイスによって送受信された合計バイト数を表示します。"
			},{
				type: "name",
				title: "現在のパケット数",
				content: "特定の期間に送受信されたパケットの現在の数を表示します。"
			},{
				type: "name",
				title: "現在のバイト数",
				content: "特定の期間に送受信された現在のバイト数を表示します。"
			},{
				type: "name",
				title: "変更",  
				content: "リストの対応する統計をリセット (ゼロに) および削除するオプションを表示します。"
			},{
				type: "name",
				title: "更新",
				content: "ページ上の統計情報を更新するには、これをクリックします。"
			},{
				type: "name",
				title: "すべてリセット",
				content: "リスト内のすべての統計値をゼロにリセットするには、これをクリックします。"
			},{
				type: "name",
				title: "すべて削除",
				content: "リスト内のすべての統計情報を削除するには、これをクリックします。"
			}]
		},
		
		SYSTEM_PARA_WIRELESS: {	
			TITLE: "2.4GHz/5GHz/60GHz ワイヤレス",
			CONTENT: [{
				type: "name",
				title: "ビーコン間隔",
				content: "ルーターによってブロードキャストされるビーコン パケット間の間隔を決定してワイヤレス ネットワークを同期するため、40 ～ 1000 の値 (ミリ秒) を入力します。既定値は 100 ミリ秒です。"
			},{
				type: "name",
				title: "RTS しきい値",
				content: "1 ～ 2346 の値を入力して、ルーターを通るデータ転送のパケット サイズを決定します。既定では、RTS (送信要求) しきい値サイズは 2346 です。パケット サイズがプリセットしきい値より大きい場合、ルーターは送信要求フレームを特定の受信ステーションに送信して、データ フレームの送信を交渉するか、パケットはただちに送信されます。"
			},{
				type: "name",
				title: "DTIM 間隔",
				content: "この値は、Delivery Traffic Indication Message (DTIM)　の間隔を決定します。ビーコン間隔を 1 ～ 15 の値で入力します。既定値は 1で、これは DTIM 間隔がビーコン間隔と同じであることを示します。"
			},{
				type: "name",
				title: "グループ キーの更新期間",
				content: "秒数 (30 以上) を入力して、暗号化キー自動更新の時間間隔を制御します。既定値は 0 で、これはキーを更新しないことを示します。"
			},{
				type: "name",
				title: "マルチユーザー MIMO",
				content: "この技術は、ルーターが一度に最大 3 台までのデバイスにポイント ツー ポイント接続できるようにします。これにより、速度が劇的に改善され、従来のアーキテクチャに比べてデバイス待機時間が減るため、ルーターはより多くの Wi-Fi クライアントに同時に対応でき、帯域幅の問題も最小限に抑えることができます。"
			},{
				type: "name",
				title: "WMM 機能",
				content: "WMM 機能により、優先度の高いメッセージを持つパッケージが優先的に転送されることを保証することができます。既定では有効になっており、有効にすることを強く推奨します。"
			},{
				type: "name",
				title: "短い GI 機能",
				content: "この機能は既定で有効になっており、ガード間隔 (GI) 時間を減らすことによりデータ容量を増やすために推奨されます。"
			},{
				type: "name",
				title: "AP 分離機能",
				content: "ネットワークに接続されているすべてのワイヤレス デバイスが相互にやりとりするのを制限する一方でインターネットにはアクセスできるようにするには、[AP 分離を有効にする] チェック ボックスを選択します。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		SYSTEM_PARA_WDS: {	
			TITLE: "2.4GHz/5GHz WDS",
			CONTENT: [{
				type: "name",
				title: "WDS ブリッジング",
				content: "ルーターがワイヤレス ローカル エリア ネットワーク　(WLAN) 内の他のアクセス ポイント (AP) とブリッジできるようにするには、WDS (Wireless Distribution System) ブリッジ機能を有効にします。この機能を有効にする場合は、以下を設定します。",
			},{
				type: "name",
				title: "SSID (ブリッジ対象)",
				content: "ルーターがクライアントとして接続する WAP (ワイヤレス アクセス ポイント) の SSID を入力するか、調査機能を使用してすべての利用可能なネットワークを検出します。"
			},{
				type: "name",
				title: "調査",
				content: "範囲内のすべての利用可能なワイヤレス ネットワークの SSID、BSSID、信号強度、チャンネル、およびセキュリティ情報をスキャンするには、このボタンをクリックします。ネットワークを選択すると、SSID、MAC アドレス、およびセキュリティは自動で入力されます。"
			},{
				type: "name",
				title: "MAC アドレス (ブリッジ対象)",
				content: "ルーターがクライアントとして接続するワイヤレス アクセス ポイントの MAC アドレス (BSSID) をハイフン区切りの 16 進表記 (0-9、a-f、A-F) で入力します。調査機能で目的の AP を選択すると、[MAC アドレス] フィールドは自動で入力されます。"
			},{
				type: "name",
				title: "WDS モード",
				content: "[WDS モード]、[自動]、[WDS1]、または [WDS2]　を選択します。"
			},{
				type: "name",
				title: "セキュリティ",
				content: "選択されたアクセス ポイントの正しいセキュリティ タイプ、なし、WPA-PSK/WPA2-PSK または WEP　を選択します。調査機能で目的の AP を選択すると、[セキュリティ] フィールドは自動で入力されます。",
				children: [{
					type: "name",
					title: "パスワード",
					content: "このオプションは、セキュリティ タイプが WPA-PSK/WPA2-PSK または WEP の場合に使用できます。選択されたアクセス ポイントのセキュリティ パスワードを入力します。"
				},{
					type: "name",
					title: "認証タイプ",
					content: "このオプションは、セキュリティ タイプが WEP (Wired Equivalent Privacy)　の場合にのみ使用できます。選択されたアクセス ポイントの使用されている適切な認証タイプ (自動、オープン システム、共有鍵) を選択します。"
				},{
					type: "name",
					title: "WEP キー形式",
					content: "このオプションは、セキュリティ タイプが WEP の場合にのみ使用できます。選択された AP の使用されているキー形式 (ASCII または 16 進数) を選択します。"
				}]
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		SYSTEM_PARA_WPS: {	
			TITLE: "WPS",
			CONTENT: [{
				type: "paragraph",
				content: "WPS ボタンを押して WPS 対応デバイスを簡単にセットアップして接続できる WPS (Wi-Fi 保護セットアップ) 機能を有効にするには、[WPS を有効にする] チェック ボックスを選択して [保存] をクリックします。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		SYSTEM_PARA_NAT: {
			TITLE: "NAT",
			CONTENT: [{
				type: "name",
				title: "NAT",
				content: "NAT (ネットワーク アドレス変換) 機能を有効にするには、[NAT を有効にする] チェック ボックスを選択して [保存] をクリックします。"
			},{
				type: "note",
				title: "注",
				content: "NAT を無効にすると、NAT 転送の設定は有効になりません。"
			}/*,{
				type: "name",
				title: "NAT ブースト",
				content: "ルーターが最大限のスループットを発揮するようにするには、[NAT ブーストを有効にする] チェック ボックスを選択して [保存] をクリックします。"
			},{
				type: "note",
				title: "注",
				content: "NAT を有効にすると、QoS とトラフィック統計が自動的に無効になります。"
			}*/,{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		SYSTEM_PARA_DOS: {
			TITLE: "DoS 保護レベル設定",
			CONTENT: [{
				type: "paragraph",
				content: "DoS 保護レベルは、ルーターを ICMP-FLOOD、UDP-FLOOD、および TCP-FLOOD 攻撃から保護します。"
			},{
				type: "name",
				title: "ICMP-FLOOD パケット レベル",
				content: "ICMP-FLOOD　保護をトリガーする ICMP パケット数を　5 ～ 7200 の値で入力します。パケット数が、プリセットされているしきい値を超えるとすぐにトリガーされます。"
			},{
				type: "name",
				title: "UDP-FLOOD パケット レベル",
				content: "UDP-FLOOD　保護をトリガーする UDP パケット数を　5 ～ 7200 の値で入力します。パケット数が、プリセットされているしきい値を超えるとすぐにトリガーされます。"
			},{
				type: "name",
				title: "TCP-FLOOD パケット レベル",
				content: "TCP-SYN-FLOOD　保護をトリガーする TCP-SYN パケット数を　5 ～ 7200 の値で入力します。パケット数が、プリセットされているしきい値を超えるとすぐにトリガーされます。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		SYSTEM_PARA_DUPLEX: {
			TITLE: "デュプレックス",
			CONTENT: [{
				type: "name",
				title: "デュプレックス",
				content: "ドロップダウン リストからデュプレックス タイプを選択します。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		SYSTEM_PARA_LED:{
			TITLE: "LED コントロール",
			CONTENT: [{
				type: "name",
				title: "夜モードを有効にする",
				content: "ルーターのパフォーマンスに影響を与えずに夜モード期間中に LED をオフにするには、このチェック ボックスをオンにします。"
			},{
				type: "name",
				title: "夜モード期間",
				content: "夜モードを提供する時間帯を指定します。"
			},{
				type: "paragraph",
				content: "[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		OPEN_VPN:{
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "paragraph",
				content: "OpenVPN を使用すると、外出中にインターネットを使用してネットワークに安全にアクセスできます。VPN サービスを使用するには、動的 DNS サービス (推奨) を設定するか、ルーターの WAN ポートに静的 IP アドレスを割り当てます。また、システム時刻がインターネットと同期されていなければなりません。"
			},{
				type: "name",
				title: "VPN サーバーを有効にする",
				content: "OpenVPN サーバーを有効にするにはこれを選択します。"
			},{
				type: "name",
				title: "サービス タイプ",
				content: "OpenVPN サーバーの通信プロトコル (UDP または TCP) を選択します。"
			},{
				type: "name",
				title: "サービス ポート",
				content: "1024 ～ 65535 の通信ポート番号を入力します。既定および一般的なサービス ポートは 1194 です。"
			},{
 				type: "name",
				title: " VPN サブネット/ネットマスク",
				content: "OpenVPN サーバーがクライアントにリースできる IP アドレスの範囲を入力します。"
			},{
				type: "name",
				title: "クライアント アクセス",
				content: "OpenVPN クライアントのアクセス タイプを選択します。",
				children: [{
				type: "name",
				title: "ホーム ネットワークのみ",
					content: "クライアントは、ホーム ネットワークにのみアクセスできます。クライアントの既定のルートは変更されません。"
			},{
				type: "name",
				title: "インターネットとホーム ネットワーク",
					content: "クライアントは、国外にいるときに、ホーム ネットワーク、地理的制限のあるインターネット サイトまたはサービスにアクセスできます。クライアントの既定のルートは変更されます。"
				}]
			}]
		},
		OPEN_VPN_CERTIFICATE:{
			TITLE: "証明書",
			CONTENT: [{
				type: "paragraph",
				content: "情報の証明書を使用して、リモート クライアントの VPN 接続を識別します。"
			},{
				type: "name",
				title: "生成",
				content: "新しい証明書を生成するにはこれをクリックします。"
			}]
		},
		OPEN_VPN_CONF:{
			TITLE: "設定ファイル",
			CONTENT: [{
				type: "paragraph",
				content: "リモート クライアントは、設定ファイルを使用してルーターにアクセスします。"
			},{
				type: "name",
				title: "エクスポート",
				content: "OpenVPN 設定ファイルを保存するには、これを選択します。"
			}]
		},
		OPEN_VPN_GUIDE:{
			TITLE: "VPN クライアント インストール ガイド",
			CONTENT: [{
				type: "step",
				title: "クライアント デバイスを OpenVPN サーバーに接続するには:",
				content:[{
					type: "paragraph",
					content: "OpenVPN サーバーを設定する前に、動的 DNS サービスを設定するか (推奨)、WAN ポートの静的 IP アドレスを割り当てます。NAT 設定の外部ポートがサービス ポートではなく、システム時刻がインターネットと同期されていることを確認してください。"
				},
					"1.[VPN サーバーを有効にする] を選択します。",
					"2.OpenVPN サーバー パラメーター (サービス タイプ、サービス ポート、クライアント アクセス、および VPN サブネット/ネットマスク) を設定して、[保存] をクリックします。",
					"3.[エクスポート] をクリックして、設定ファイルを保存します。",
					"4.クライアント デバイスで、<a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a> から OpenVPN クライアント ユーティリティをダウンロードしてインストールします。<br> 公式にサポートされているプラットフォームは、Windows、Mac OSX、Linux です。",
					"5.OpenVPN クライアント ユーティリティを起動して、保存した設定ファイルを使用して新しい VPN 接続を追加し、クライアント デバイスを VPN サーバーに接続します。"
				]},{
					type: "note",
					title: "注",
					content: "OpenVPN クライアントの詳細については、<a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>をご覧ください。"
				}]
		},
		PPTP_VPN:{
			TITLE: "PPTP VPN",
			CONTENT: [{
				type: "paragraph",
				content: "PPTP VPN を使用すると、外出中にインターネットを使用してネットワークに簡単かつすばやくアクセスできます。一部の ISP では使用できません。VPN サービスを使用するには、動的 DNS サービス (推奨) を設定するか、ルーターの WAN ポートに静的 IP アドレスを割り当てます。また、システム時刻がインターネットと同期されていなければなりません。"
			},{
				type: "name",
				title: "VPN サーバーを有効にする",
				content: "PPTP VPN サーバーを有効にするにはこれを選択します。"
			},{
				type: "name",
				title: "クライアント IP アドレス",
				content: "PPTP VPN サーバーがクライアントにリースできる IP アドレス (最大 10 クライアント) の範囲を入力します。"
			},{
 				type: "name",
				title: "Samba (ネットワーク プレース) のアクセスを許可する",
				content: "VPN クライアントがローカル Samba サーバーにアクセスできるようにするには、これを選択します。"
			},{
				type: "name",
				title: "NetBIOS パススルーを許可する",
				content: "VPN クライアントが NetBIOS 名を使用して Samba サーバーにアクセスできるようにするには、これを選択します。"
			},{
				type: "name",
				title: "暗号化されていない接続を許可する",
				content: "VPN サーバーへの暗号化されていない接続を許可するには、これを選択します。"
			}]
		},
		PPTP_ACCOUNT_LIST:{
			TITLE: "アカウント リスト",
			CONTENT: [{
				type: "paragraph",
				content: "この表には、PPTP VPN サーバーに接続するためにリモート クライアントが使用できるアカウントが表示されます。"
			},{
				type: "step",
				title: "PPTP VPN アカウントを追加するには",
				content: [
					"1.[追加] をクリックします。",
					"2.PPTP VPN サーバーでのクライアント認証のために、ユーザー名とパスワードを入力します。",
					"3.[OK] をクリックします。"
				]
			},/*{
				type: "name",
				title: "ユーザー名とパスワード",
				content: "PPTP VPN サーバーでのクライアント認証のために、ユーザー名とパスワードを入力します。"
			},{
				type: "name",
				title: "修正",
				content: "対応するアカウントを修正または削除するオプションを表示します。"
			}*/
			{
				type: "step",
				title: "既存のアカウントを修正または削除するには",
				content: "表で、修正または削除するアカウントに対応する編集アイコンまたはゴミ箱アイコンをクリックします。"
			}]
		},
		PPTP_VPN_GUIDE:{
			TITLE: "VPN クライアント インストール ガイド",
			CONTENT: [{
				type: "step",
				title: "クライアント デバイスを PPTP VPN サーバーに接続するには:",
				content:[{
					type: "paragraph",
					content: "PPTP VPN サーバーを設定する前に、動的 DNS サービスを設定するか (推奨)、WAN ポートの静的 IP アドレスを割り当てます。NAT 設定の外部ポートが 1723 ではなく、システム時刻がインターネットと同期されていることを確認してください。"
				},
					"1.[VPN サーバーを有効にする] を選択します。",
					"2.PPTP VPN サーバー パラメーターを設定して、[保存] をクリックします。",
					"3.クライアント デバイスで、PPTP VPN 接続を作成します。公式にサポートされているプラットフォームは Windows、Mac OSX、Linux、iOS、および Android です。",
					"4.PPTP VPN プログラムを起動して、新しい接続を追加し、登録されている DDNS サービスのドメイン名または WAN ポートに割り当てられた静的　IP アドレスを入力して、クライアント デバイスを PPTP VPN サーバーに接続します。",
				]}
			]
		},
		VPN_CONNNECTION:{
			TITLE: "VPN 接続",
			CONTENT: [{
				type: "paragraph",
				content: "このページには、ルーターでホストされている OpenVPN および PPTP VPN サーバーに現在接続されているクライアントが表示されます。"
			},{
				type: "paragraph",
				content: "対応するクライアントを切断するにはマイナス アイコンをクリックします。"
			}]
		},
		BASIC_NETWORK_INTEREST: {
			TITLE: "インターネット",
			CONTENT: [{
				type: "name",
				title: "インターネット ステータス",
				content: "ルーターのインターネット接続の現在のステータスを表示します。"
			},{
				type: "name",
				title: "接続タイプ",
				content: "インターネット接続のタイプを表示します。"
			},{
				type: "name",
				title: "IP アドレス",
				content: "ルーターに割り当てられている現在のインターネット IP アドレスを表示します。"
			},{
				type: "name",
				title: "セカンダリ接続/IP アドレス",
				content: "IP アドレスのセカンダリ接続タイプを表示します。"
			}]
		},
		BASIC_NETWORK_ROUTER: {
			TITLE: "ルーター",
			CONTENT: [{
				type: "title",
				title: "2.4GHz/5GHz/60GHz ワイヤレス"
			},{
				type: "name",
				title: "SSID",
				content: "2.4GHz/5GHz/60GHz 周波数帯域の現在のワイヤレス ネットワーク名を表示します。"
			},{
				type: "name",
				title: "チャンネル",
				content: "ワイヤレス 2.4GHz/5GHz/60GHz ネットワークがブロードキャストするチャンネルを表示します。"
			},{
				type: "name",
				title: "MAC",
				content: "ワイヤレス 2.4GHz/5GHz/60GHz の現在の MAC アドレスを表示します。"
			},{
				type: "title",
				title: "2.4GHz/5GHz ゲスト ネットワーク"
			},{
				type: "name",
				title: "ステータス",
				content: "ワイヤレス ゲスト ネットワーク 2.4GHz/5GHz がオン (有効) か オフ (無効) かを表示します。"
			},{
				type: "name",
				title: "SSID",
				content: "ゲスト ネットワークのワイヤレス ネットワーク名を表示します。"
			}]
		},
		BASIC_NETWORK_CLIENTS: {
			TITLE: "有線/ワイヤレス クライアント",
			CONTENT: [{
				type: "name",
				title: "名前",
				content: "ルーターに接続されているクライアントの名前を表示します。"
			},{
				type: "name",
				title: "IP アドレス",
				content: "クライアントの割り当て済み IP アドレスを表示します。"
			},{
				type: "name",
				title: "MAC アドレス",
				content: "クライアントの　MAC アドレスを表示します。"
			}]
		},
		BASIC_NETWORK_PRINTER: {
			TITLE: "プリンター",
			CONTENT: [{
				type: "name",
				title: "名前",
				content: "USB ポートを介してルーターに接続されているプリンターの名前を表示します。"
			}]
		},
		BASIC_NETWORK_USB: {
			TITLE: "USB ディスク",
			CONTENT: [{
				type: "name",
				title: "USB ディスク",
				content: "ルーターに接続されている USB ディスクの名前を表示します。"
			},{
				type: "name",
				title: "合計",
				content: "接続されている USB ストレージ デバイスのストレージ総容量を表示します。"
			},{
				type: "name",
				title: "使用可能",
				content: "接続されている USB ストレージ デバイスの使用可能なストレージ容量を表示します。"
			}]
		},
		BASIC_INTERNET: {
			TITLE: "インターネット",
			CONTENT: [{
				type: "name",
				title: "自動検出",
				content: "現在のインターネット接続タイプをルーターに自動検出させるには、このボタンをクリックします。"
			},{
				type: "note",
				title: "注",
				content: "インターネット接続タイプがわからない場合は、自動検出機能を使用するか、ISP に問い合わせてください。"
			},{
				type: "title",
				title: "インターネット接続タイプ:静的 IP",
			},{
				type: "name",
				title: "IP アドレス/サブネット マスク/デフォルト ゲートウェイ/プライマリ DNS/セカンダリ DNS",
				content: "ISP によって提供された情報を入力します。"
			},{
				type: "title",
				title: "インターネット接続タイプ:動的 IP",
			},{
				type: "name",
				title: "MAC アドレスをクローンしない/現在のコンピューター MAC アドレスをクローン",
				content: "ISP に従って、MAC アドレスをクローンするかどうかを選択します。"
			},{
				type: "title",
				title: "インターネット接続タイプ:PPPoE",
			},{
				type: "name",
				title: "ユーザー名/パスワード",
				content: "ISP によって提供されたユーザー名とパスワードを入力します。これらのフィールドは大文字小文字が区別されます。"
			},{
				type: "title",
				title: "インターネット接続タイプ:L2TP/PPTP",
			},{
				type: "name",
				title: "ユーザー名/パスワード",
				content: "ISP によって提供されたユーザー名とパスワードを入力します。これらのフィールドは大文字小文字が区別されます。"
			},{
				type: "name",
				title: "セカンダリ接続 (動的 IP または静的 IP)",
				children: [{
					type: "name",
					title: "動的 IP",
					content: "IP アドレスとサブネット マスクが ISP によって自動的に割り当てられる場合に選択します。"
				},{
					type: "name",
					title: "静的 IP",
					content: "IP アドレス、サブネット マスク、ゲートウェイ、DNS アドレスが ISP によって提供されている場合に選択し、これらの情報を対応するフィールドに入力します。"
				}]
			},{
				type: "name",
				title: "VPN サーバー IP/ドメイン名",
				content: "ISP によって提供された VPN サーバー の IP アドレスまたはドメイン名を入力します。"
			},{
				type:"paragraph",
				content:"[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		BASIC_WIRELESS: {
			TITLE: "ワイヤレス設定",
			CONTENT: [{
				type: "name",
				title: "ワイヤレス ラジオを有効にする",
				content: "2.4GHz/5GHz/60GHz ワイヤレス ラジオの周波数を有効にするには、このチェックボックスをオンにします。"
			},{
				type: "name",
				title: "ネットワーク名 (SSID)",
				content: "既定のワイヤレス ネットワーク名 (SSID) をそのままにしておくか、新しい名前 (32 文字まで) を入力できます。このフィールドは大文字小文字が区別されます。"
			},{
				type: "name",
				title: "SSID を非表示にする",
				content: "Wi-Fi ネットワーク リストで 2.4GHz/5GHz/60GHz ネットワーク名 (SSID) を非表示にする場合は、このチェック ボックスをオンにします。"
			},{
				type: "name",
				title: "パスワード",
				content: "セキュリティ タイプに対応するワイヤレス パスワードをこのフィールドに入力します (大文字/小文字が区別されます)。"
			},{
				type:"paragraph",
				content:"[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		BASIC_DEVICE_SETTINGS: {
			TITLE: "デバイス設定",
			CONTENT: [{
				type: "paragraph",
				content: "[デバイス設定] ページは、USB ポート経由で接続された USB ストレージ デバイスの関連情報を表示します。"
			},{
				type: "name",
				title: "スキャン",
				content: "通常、ルーターは新たに接続されたデバイスを自動で検出します。自動検出されない場合は、このボタンをクリックして、接続された新しいデバイスをスキャンし、最新の情報でページを更新します。"
			},{
				type: "name",
				title: "ボリューム",
				content: "USB ボリュームの名前を表示します。"
			},{
				type: "name",
				title: "容量",
				content: "USB の総容量を表示します。"
			},{
				type: "name",
				title: "空き領域",
				content: "現在使用可能な空きストレージ領域を表示します。"
			},{
				type: "name",
				title: "安全な取り外し",
				content: "USB ストレージ デバイスを物理的にルーターから取り外す前に、このボタンをクリックして安全にマウント解除します。",
				children: [{
					type: "paragraph",
					content: "[安全な取り外し] ボタンは、USB ストレージ デバイスがルーターに接続されている場合にのみ表示されます。現在のボリュームがビジー状態の場合は　USB デバイスをマウント解除できません。"
				}]
			},{
				type: "name",
				title: "ステータス",
				content: "この表は、USB ストレージ デバイスがルーターに接続されている場合にのみ表示されます。USB デバイスのファイル共有を有効にするには、これを選択します。"
			}]
		},
		BASIC_SHARING_SETTINGS: {
			TITLE: "共有設定",
			CONTENT: [{
				type: "name",
				title: "ネットワーク/メディア サーバー名",
				content: "接続されている USB ストレージ デバイスにアクセスするために使用される名前を表示します。名前は、4 ～ 15 文字で、英数字、アンダーライン、ハイフンで構成される必要があります。"
			},{
				type:"paragraph",
				content:"[保存] をクリックして、すべての設定を保存してください。"
			}]
		},
		BASIC_FOLDER_SHARING: {
			TITLE: "フォルダー共有",
			CONTENT: [{
				type: "name",
				title: "すべて共有",
				content: "すべてのファイルとフォルダーを共有するにはオンにし、選択されたフォルダーのみを共有するにはオフにします。"
			},{
				type: "name",
				title: "認証を有効にする",
				content: "共有フォルダーにアクセスするための有効なユーザー名とパスワードをユーザーに入力させるために認証を有効にすることを強く推奨します。"
			},{
				type: "name",
				title: "フォルダー名",
				content: "共有フォルダーの名前を表示します。"
			},{
				type: "name",
				title: "フォルダー パス",
				content: "共有フォルダーのパスを表示します。"
			},{
				type: "name",
				title: "メディア共有",
				content: "共有フォルダーがメディア共有可能かどうかを示します。"
			},{
				type: "name",
				title: "ボリューム名",
				content: "共有ボリュームの名前を表示します。"
			},{
				type: "name",
				title: "ステータス",
				content: "電球インジケーターで共有フォルダーのステータスを表示します。"
			},{
				type: "name",
				title: "変更",
				content: "対応する共有フォルダーを修正および削除するオプションを表示します。"
			},{
				type: "name",
				title: "追加",
				content: "新しいエントリを作成するには、このボタンをクリックします。"
			},{
				type: "name",
				title: "削除",
				content: "選択されたエントリを表から削除するには、このボタンをクリックします。"
			},{
				type: "name",
				title: "参照",
				content: "共有フォルダーを検索するにはこれをクリックします。"
			},{
				type: "name",
				title: "ゲスト ネットワーク アクセスを許可",
				content: "ゲスト ネットワーク上のクライアントが共有フォルダーにアクセスできるようにするには、これを選択します。"
			},{
				type: "name",
				title: "認証を有効にする",
				content: "ユーザーに有効なユーザー名とパスワードで共有フォルダーにアクセスさせるには、これを選択します。"
			},{
				type: "name",
				title: "書き込みアクセスを有効にする",
				content: "ユーザーがフォルダーの内容を変更できるようにするには、これを選択します。"
			},{
				type: "name",
				title: "メディア共有を有効にする",
				content: "メディア共有を有効にするには、これを選択します。"
			},{
				type: "name",
				title:"更新",
				content: "共有フォルダー　リストを更新するにはこれをクリックします。"
			}]
		},
		BASIC_PRINT_SERVER: {
			TITLE: "印刷サーバー",
			CONTENT: [{
				type: "name",
				title: "印刷サーバー",
				content: "印刷サーバー機能を有効にするにはオンにします。"
			},{
				type: "name",
				title: "プリンター名",
				content: "ルーターに接続されているプリンターの名前を表示します。"
			}]
		},
		BASIC_PARENTAL_CONTROL: {
			TITLE: "保護者による制限",
			CONTENT: [{
				type: "paragraph",
				content: "保護者による制限では、不適切なウェブサイト、成人指定のウェブサイト、悪意のあるウェブサイトをブロックしたり、1 日のうちの特定の時間でアクセスを制限したり (例えば、宿題の時間に Facebook や YouTube へのアクセスを制限) することができ、それと同時に、1 か所の中央制御点から、ホーム ネットワーク上のすべてのデバイスをマルウェアやフィッシングから保護できます。"
			},{
				type: "name",
				title: "保護者による制限",
				content: "保護者による制限機能を有効にするにはこれをオンにします。既定では、この機能は無効になっています。"
			}]
		},
		BASIC_PARENTAL_DEVICE: {
			TITLE: "保護者による制限対象のデバイス",
			CONTENT: [{
				type: "paragraph",
				content: "保護者による制限対象のデバイスのリストを表示します。"
			},{
				type: "name",
				title: "デバイス名",
				content: "現在保護者による制限対象になっている、接続されているすべてのクライアント デバイスの名前を表示します。"
			},{
				type: "name",
				title: "MAC アドレス",
				content: "現在保護者による制限対象になっている、接続されているすべてのクライアント デバイスの MAC アドレスを表示します。"
			},{
				type: "name",
				title: "インターネット アクセス時間",
				content: "制限アクセス時間を表示します。時間のスケジュールは、ルーターのシステム時刻に基づいて有効になります。これは、[システム ツール] -> [時刻設定] で設定できます。"
			},{
				type: "name",
				title: "説明",
				content: "接続されているデバイスの簡単な説明を表示します。これはオプションの設定です。"
			},{
				type: "name",
				title: "ステータス",
				content: "対応するデバイスの保護者による制限の現在のステータス (有効または無効) を表示します。"
			},{
				type: "name",
				title: "変更",
				content: "対応するデバイスを修正または削除するオプションを表示します。"
			},{
				type: "step",
				title: "新しいクライアント デバイスを制限するには",
				content:[
					"1.[追加] をクリックします。",
					"2.[既存のデバイスの表示] をクリックして、アクセス デバイス リストから、現在接続されているデバイスを選択するか、デバイス名と MAC アドレスを手動で入力して、接続されていないデバイスを追加します。",
					"3.インターネット アクセス時間のアイコンをクリックして、制限を適用する時間範囲を指定します。",
					"4.[説明] フィールドに簡単な説明を入力します。(オプション)",
					"5.[このエントリを有効にする] を選択します。",
					"6.[OK] をクリックします。"
				]
			},{
				type: "paragraph",
				content: "保護者による制限エントリを修正または削除するには、編集アイコンをクリックして情報を編集するか、ゴミ箱アイコンをクリックして対応するエントリを削除します。"
			},{
				type: "paragraph",
				content: "複数のエントリを削除するには、すべてのエントリを選択して、表の上にある [削除] をクリックします。"
			}]
		},
		BASIC_PARENTAL_RESTRICTION: {
			TITLE: "コンテンツ制限",
			CONTENT: [{
				type: "name",
				title: "ブラックリスト",
				content: "保護者による制限リストに指定されているクライアント デバイスからの一切のウェブサイト アクセスをブロックするために使用されるキーワードが含まれます。",
				children: [{
					type: "paragraph",
					content: "ブラックリストにキーワードを追加するには、[新しいキーワードを追加] をクリックします。キーワードを削除するには、削除するキーワードの (-) アイコンをクリックします。"
				}]
			},{
				type: "name",
				title: "ホワイトリスト",
				content: "保護者による制限リストで指定されているクライアント デバイスがアクセスを許可されているウェブサイト アドレスが含まれます。",
				children: [{
					type: "paragraph",
					content: "ホワイトリストにウェブサイトを追加するには、[新しいドメイン名を追加] をクリックします。ウェブサイトを削除するには、削除するウェブサイトの (-) アイコンをクリックします。"
				}]
			},{
				type: "note",
				title: "注",
				content: "キーワードは、ドメイン名にすることもできます。例えば、mail.google.com or www.facebook.com　などです。"
			},{
				type: "paragraph",
				content: "設定を保存するには、[保存] をクリックします。"
			}]
		},
		BASIC_GUEST_NETWORK: {
			TITLE: "ゲスト ネットワーク",
			CONTENT: [{
				type: "paragraph",
				content: "ゲスト ネットワークでは、ワイヤレス ネットワークにアクセスするためにゲストが使用できる別のワイヤレス ネットワーク名 (SSID) とパスワードを持つ別のネットワークをセットアップできます。"
			},{
				type: "name",
				title: "ゲストどうしを見えるようにする",
				content: "ゲスト ネットワーク上のワイヤレス デバイスが互いに見えるようにするには、このチェック ボックスをオンにします。"
			},{
				type: "name",
				title: "ゲストが自分のローカル ネットワークにアクセスすることを許可する",
				content: "ゲスト ネットワーク上のワイヤレス デバイスがローカル ネットワーク共有とプリンターにアクセスできるようにするには、このチェック ボックスをオンにします。"
			},{
				type: "name",
				title: "ゲスト ネットワークを有効にする",
				content: "ゲスト ネットワーク機能を有効にするには、このチェック ボックスをオンにします。"
			},{
				type: "name",
				title: "ネットワーク名 (SSID)",
				content: "既定のゲスト SSID を使用するか、新しい名前 (32 文字まで) を作成します。"
			},{
				type: "name",
				title: "SSID を非表示にする",
				content: "Wi-Fi ネットワーク リストでゲスト SSID を非表示にする場合は、このチェックボックスをオンにします。"
			},{
				type: "name",
				title: "パスワード",
				content: "ゲスト ネットワークを保護するため、8 ～ 63 文字の ASCII 文字、または 8 ～ 64 文字の 16 進数 (0-9、a-f、A-F) のパスワードを作成します。"
			},{
				type:"paragraph",
				content:"[保存] をクリックして、すべての設定を保存してください。"
			}]
		}

	};
})(jQuery);
