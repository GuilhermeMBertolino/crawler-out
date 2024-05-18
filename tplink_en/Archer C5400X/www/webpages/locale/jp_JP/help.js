(function($){

    $.su = $.su || {};   $.su.CHAR = $.su.CHAR||{};
 $.su.CHAR.HELP ={
       STATUS_INTERNET :{ 
               TITLE:"インターネット",
               CONTENT: [{
                           type: "paragraph",
                           content: "ワイド エリア ネットワーク (インターネット) 接続についての関連情報を表示します。"
                       }]
},
       STATUS_WIRELESS :{ 
               TITLE:"2.4GHz/5GHz ワイヤレス",
               CONTENT: [{
                           type: "paragraph",
                           content: "ワイヤレス ネットワークについての関連情報を表示します。"
                       }]
},
       STATUS_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "イーサネット (LAN) ポートについての情報を表示します。"
                       }]
},
       STATUS_GUEST :{ 
               TITLE:"2.4GHz/5GHz ゲスト ネットワーク",
               CONTENT: [{
                           type: "paragraph",
                           content: "ゲストのワイヤレス ネットワークについての情報を表示します。"
                       }]
},
       STATUS_USB :{ 
               TITLE:"USB デバイス",
               CONTENT: [{
                           type: "paragraph",
                           content: "USB ポートを介してルーターに接続されている現在の USB ストレージ デバイスとプリンターの情報を表示します。"
                       }]
},
       STATUS_PERFORMANCE :{ 
               TITLE:"パフォーマンス",
               CONTENT: [{
                           type: "paragraph",
                           content: "現在のルーター パフォーマンスを表示します。"
                       }]
},
       STATUS_WIRED :{ 
               TITLE:"有線クライアント",
               CONTENT: [{
                           type: "paragraph",
                           content: "ネットワークに接続されている有線デバイスの情報を表示します。"
                       }]
},
       STATUS_WIRELESS_CLIENTS :{ 
               TITLE:"ワイヤレス クライアント",
               CONTENT: [{
                           type: "paragraph",
                           content: "ネットワークに接続されているワイヤレス デバイスの情報を表示します。"
                       }]
},
       INTERNET_TITLE :{ 
               TITLE:"インターネット",
               CONTENT: [{
                           type: "paragraph",
                           content: "必要に応じて、IPv4 パラメーターを設定し、適切な MAC クローン方法を選択してください。"
                       }]
},
       INTERNET_INTERNET :{ 
               TITLE:"IPv4",
               CONTENT: [{
                           type: "paragraph",
                           content: "インターネット接続タイプを選択して、対応するパラメータを入力してください。"
                       } ,{                      
                           type: "title",
                            title: "インターネット接続タイプ: 動的 IP"
                       } ,{                      
                           type: "paragraph",
                           content: "ISP によって DHCP サーバー接続を提供されている場合は、これを選択します。"
                       } ,{                      
                           type: "name",
                           title: "IP アドレス/サブネット マスク/デフォルト ゲートウェイ/プライマリ DNS/セカンダリ DNS",
                           content: "これらのパラメーターは、ISP から DHCP サーバーによって自動的に割り当てられます。"
                       } ,{                      
                           type: "name",
                           title: "更新",
                           content: "DHCP サーバーから新しい IP パラメーターを取得するには、これをクリックします。"
                       } ,{                      
                           type: "name",
                           title: "解放",
                           content: "DHCP サーバーによって割り当てられたすべての IP アドレスを解放するには、これをクリックします。"
                       } ,{                      
                           type: "name",
                           title: "DNS アドレス",
                           content: "ISP が 1 つまたは 2 つの DNS アドレスを提供している場合、このチェック ボックスを選択して、プライマリ DNS とセカンダリ DNS アドレスを対応する入力フィールドに入力します。指定しない場合、DNS アドレスは ISP によって動的に割り当てられます。"
                       } ,{                      
                           type: "name",
                           title: "MTU サイズ",
                           content: "ほとんどのイーサネット ネットワークの既定および標準の MTU (最大転送単位) サイズは 1500 バイトです。ISP によって要求されない限り、既定の MTU サイズの変更は推奨されません。"
                       } ,{                      
                           type: "name",
                           title: "ホスト名",
                           content: "値をこのフィールドに入力して、ルーターのホスト名を指定します。"
                       } ,{                      
                           type: "name",
                           title: "ユニキャスト DHCP を使用して IP を取得",
                           content: "ISP の DHCP サーバーがブロードキャスト アプリケーションをサポートせず、IP アドレスを動的に取得できない場合は、このチェック ボックスを選択します。"
                       } ,{                      
                           type: "title",
                            title: "インターネット接続タイプ: 静的 IP"
                       } ,{                      
                           type: "paragraph",
                           content: "ISP によって静的 (固定) IP アドレス、サブネット マスク、ゲートウェイ、および DNS パラメーターを提供されている場合は、このタイプを選択します。"
                       } ,{                      
                           type: "name",
                           title: "IP アドレス/サブネット マスク/デフォルト ゲートウェイ/プライマリ DNS/セカンダリ DNS",
                           content: "ISP によって提供された情報を入力します。"
                       } ,{                      
                           type: "name",
                           title: "MTU サイズ",
                           content: "ほとんどのイーサネット ネットワークの既定および標準の MTU (最大転送単位) サイズは 1500 バイトです。ISP によって要求されない限り、既定の MTU サイズの変更は推奨されません。"
                       } ,{                      
                           type: "title",
                            title: "インターネット接続タイプ: BigPond ケーブル"
                       } ,{                      
                           type: "paragraph",
                           content: "ISP が BigPond ケーブル接続を提供している場合は、このタイプを選択します。"
                       } ,{                      
                           type: "name",
                           title: "ユーザー名/パスワード",
                           content: "ISP によって提供されたユーザー名とパスワードを入力します。これらのフィールドは大文字小文字が区別されます。"
                       } ,{                      
                           type: "name",
                           title: "認証サーバー",
                           content: "認証サーバーの IP アドレスまたはホスト名を入力します。"
                       } ,{                      
                           type: "name",
                           title: "認証ドメイン",
                           content: "サーバーのドメイン名の接尾辞 (地域に基づく) を入力します。たとえば、NSW/ACT の場合は nsw.bigpond.net.au、VIC/TAS/WA/SA/NT の場合は vic.bigpond.net.au、QLD の場合は qld.bigpond.net.au です。"
                       } ,{                      
                           type: "name",
                           title: "MTU サイズ",
                           content: "ほとんどのイーサネット ネットワークの既定および標準の MTU (最大転送単位) サイズは 1500 バイトです。ISP によって要求されない限り、既定の MTU サイズの変更は推奨されません。"
                       } ,{                      
                           type: "name",
                           title: "接続モード",
                           content: "インターネットへの接続方法を決定する適切な接続モードを選択します。",
       children: [{                      
                           type: "name",
                           title: "自動",
                           content: "このモードでは、インターネット接続は、切断されるといつでも自動的に再接続します。"
                       } ,{                      
                           type: "name",
                           title: "オンデマンド",
                           content: "このモードでは、インターネット接続は、指定された時間のアイドル状態 (最大アイドル時間) が経過すると自動的に終了されます。接続は、インターネットにもう一度アクセスしようとすると再確立されます。"
                       } ,{                      
                           type: "name",
                           title: "手動",
                           content: "このモードでは、インターネット接続は、[接続] または [切断] ボタンをクリックして手動で制御されます。このモードも最大アイドル時間機能をサポートします。インターネット接続のアイドル状態を維持できる最大時間 (分) を [最大アイドル時間] フィールドに入力します。既定値は 15 分です。常にインターネット接続をアクティブのままにしておく場合は、0 (ゼロ) を入力します。"
                       }]
} ,{                      
                           type: "title",
                            title: "インターネット接続タイプ: PPPoE"
                       } ,{                      
                           type: "paragraph",
                           content: "DSL (デジタル加入者線) サービスを使用していて、ISP によってユーザー名とパスワードが提供されている場合は、このタイプを選択します。"
                       } ,{                      
                           type: "name",
                           title: "ユーザー名/パスワード",
                           content: "ISP によって提供されたユーザー名とパスワードを入力します。これらのフィールドは大文字小文字が区別されます。"
                       } ,{                      
                           type: "name",
                           title: "IP アドレス/プライマリ DNS/セカンダリ DNS",
                           content: "これらのパラメーターは、ISP の DHCP サーバーによって自動的に割り当てられます。"
                       } ,{                      
                           type: "name",
                           title: "セカンダリ接続 (なし、動的 IP、静的 IP)",
       children: [{                      
                           type: "name",
                           title: "なし",
                           content: "セカンダリ接続が提供されない場合に選択します。"
                       } ,{                      
                           type: "name",
                           title: "動的 IP",
                           content: "IP アドレスとサブネット マスクが ISP によって自動的に割り当てられる場合に選択します。",
       children: [{                      
                           type: "name",
                           title: "更新",
                           content: "ISP の IP パラメーターを更新するには、これをクリックします。"
                       } ,{                      
                           type: "name",
                           title: "解放",
                           content: "割り当てられた IP パラメーターを解放するには、これをクリックします。"
                       }]
} ,{                      
                           type: "name",
                           title: "静的 IP",
                           content: "IP アドレスとサブネット マスクが ISP によって提供されている場合に選択し、これらの情報を対応するフィールドに入力します。"
                       }]
} ,{                      
                           type: "name",
                           title: "MTU サイズ",
                           content: "イーサネット ネットワークの標準の MTU (最大転送単位) サイズは 1480 バイトです。",
       children: [{                      
                           type: "note",
                           title: "注",
                           content: "まれなケースですが、パフォーマンスの向上のために MTU サイズを調整するよう　ISP が要求する場合があります。必要不可欠な場合を除き、値を変更しないでください。"
                       }]
} ,{                      
                           type: "name",
                           title: "サービス名/アクセス コンセントレーター名",
                           content: "既定ででは、サービス名とアクセス コンセントレーター (AC) 名は空になっています。これらのフィールドは、ISP によって要求されない限り、設定すべきではありません。"
                       } ,{                      
                           type: "name",
                           title: "オンライン間隔を検出",
                           content: "ルーターがアクセス コンセントレーターをオンラインで検出する時間間隔値を 0 ～ 120 秒で入力します。既定値は　10 です。"
                       } ,{                      
                           type: "name",
                           title: "IP アドレス",
                           content: "ISP が特定 (固定) の IP アドレスを提供している場合は、[次の IP アドレスを使用] を選択して、フィールドに IP アドレスを入力します。そうでない場合は、[ISP から動的に取得] を選択して、サーバー割り当ての IP アドレスを自動で取得します。"
                       } ,{                      
                           type: "name",
                           title: "DNS アドレス",
                           content: "ISP が特定 (固定) の DNS IP アドレスを提供している場合は、[次の DNS アドレスを使用] を選択して、アドレスを　[プライマリ DNS] および [セカンダリ DNS]　フィールドにそれぞれ入力します。そうでない場合は、[ISP から動的に取得] を選択して、サーバー割り当ての DNS IP アドレスを自動で取得します。"
                       } ,{                      
                           type: "name",
                           title: "接続モード",
                           content: "インターネットへの接続方法を決定する適切な接続モードを選択します。",
       children: [{                      
                           type: "name",
                           title: "自動",
                           content: "このモードでは、インターネット接続は、切断されるといつでも自動的に再接続します。"
                       } ,{                      
                           type: "name",
                           title: "オンデマンド",
                           content: "このモードでは、インターネット接続は、指定された時間のアイドル状態 (最大アイドル時間) が経過すると自動的に終了されます。接続は、インターネットにもう一度アクセスしようとすると再確立されます。"
                       } ,{                      
                           type: "name",
                           title: "時間ベース",
                           content: "このモードでは、インターネット接続は特定の時間枠でのみ確立されます。このオプションが選択する場合は、開始時刻と終了時刻を、どちらも HH:MM 形式で入力します。"
                       } ,{                      
                           type: "name",
                           title: "手動",
                           content: "このモードでは、インターネット接続は、[接続] または [切断] ボタンをクリックして手動で制御されます。このモードも最大アイドル時間機能をサポートします。インターネット接続のアイドル状態を維持できる最大時間 (分) を [最大アイドル時間] フィールドに入力します。既定値は 15 分です。常にインターネット接続をアクティブのままにしておく場合は、0 (ゼロ) を入力します。"
                       } ,{                      
                           type: "note",
                           title: "注",
                           content: "時間ベースの接続モードは、[詳細設定] → [システム ツール] → [時刻設定] ページで [システム時刻] が設定された場合にのみ有効になります。"
                       }]
} ,{                      
                           type: "title",
                            title: "インターネット接続タイプ: L2TP/PPTP"
                       } ,{                      
                           type: "paragraph",
                           content: "接続先が L2TP/PPTP VPN サーバーで、ISP によってユーザー名、パスワード、IP アドレス/サーバーのドメイン名が提供されている場合は、このタイプを選択します。"
                       } ,{                      
                           type: "name",
                           title: "ユーザー名/パスワード",
                           content: "ISP によって提供されたユーザー名とパスワードを入力します。これらのフィールドは大文字小文字が区別されます。"
                       } ,{                      
                           type: "name",
                           title: "IP アドレス/プライマリ DNS/セカンダリ DNS",
                           content: "これらのパラメーターは、ISP から DHCP サーバーによって自動的に割り当てられます。"
                       } ,{                      
                           type: "name",
                           title: "セカンダリ接続 (動的 IP または静的 IP)",
       children: [{                      
                           type: "name",
                           title: "動的 IP",
                           content: "IP アドレスとサブネット マスクが ISP によって自動的に割り当てられる場合に選択します。"
                       } ,{                      
                           type: "name",
                           title: "静的 IP",
                           content: "IP アドレス、サブネット マスク、ゲートウェイ、DNS アドレスが ISP によって提供されている場合に選択し、この情報を対応するフィールドに入力します。"
                       }]
} ,{                      
                           type: "name",
                           title: "VPN サーバー IP/ドメイン名",
                           content: "ISP によって提供された VPN サーバー の IP アドレスまたはドメイン名を入力します。"
                       } ,{                      
                           type: "name",
                           title: "MTU サイズ",
                           content: "ほとんどのイーサネット ネットワークの既定および標準の MTU (最大転送単位) サイズは、L2TP の場合は 1460 バイト、PPTP の場合は 1420 バイトです。ISP によって要求されない限り、既定の MTU サイズの変更は推奨されません。"
                       } ,{                      
                           type: "name",
                           title: "接続モード",
                           content: "インターネットへの接続方法を決定する適切な接続モードを選択します。",
       children: [{                      
                           type: "name",
                           title: "自動",
                           content: "このモードでは、インターネット接続は、切断されるといつでも自動的に再接続します。"
                       } ,{                      
                           type: "name",
                           title: "オンデマンド",
                           content: "このモードでは、インターネット接続は、指定された時間のアイドル状態 (最大アイドル時間) が経過すると自動的に終了されます。接続は、インターネットにもう一度アクセスしようとすると再確立されます。"
                       } ,{                      
                           type: "name",
                           title: "手動",
                           content: "このモードでは、インターネット接続は、[接続] または [切断] ボタンをクリックして手動で制御されます。このモードも最大アイドル時間機能をサポートします。インターネット接続のアイドル状態を維持できる最大時間 (分) を [最大アイドル時間] フィールドに入力します。既定値は 15 分です。常にインターネット接続をアクティブのままにしておく場合は、0 (ゼロ) を入力します。"
                       }]
}]
},
       INTERNET_MAC :{ 
               TITLE:"MAC クローン",
               CONTENT: [{
                           type: "paragraph",
                           content: "必要に応じて適切な MAC クローンを選択してください。"
                       } ,{                      
                           type: "name",
                           title: "MAC アドレスをクローンしない",
                           content: "割り当てられた IP アドレスを ISP が MAC アドレスにバインドしない場合は、ルーターの既定の MAC アドレスを変更しないでください。"
                       } ,{                      
                           type: "name",
                           title: "現在のコンピューターの MAC アドレスをクローン",
                           content: "割り当てられた IP アドレスを ISP がコンピューターの MAC アドレスにバインドする場合は、接続されているコンピューターの現在の MAC アドレスをコピーするためにこれを選択します。"
                       } ,{                      
                           type: "name",
                           title: "カスタム MAC アドレスを使用",
                           content: "割り当てられた IP アドレスを ISP が特定の MAC アドレスにバインドする場合は、MAC アドレスを手動で入力します。"
                       }]
},
       INTERNET_WAN_AGGREGATION :{ 
               TITLE:"WANアグリゲーション",
               CONTENT: [{
                           type: "paragraph",
                           id: "internet_wan_aggregation_detail",
                           content: "WANアグリゲーションは、LAN1ポートを追加のWANポートに変換することで、単一の高帯域幅データパスを作成します。 ボトルネックとなっていたネットワーク機器から、1Gbps以上の帯域幅を提供するプロバイダーを開放することで、より高速なインターネットを実現します。"
                       } ,{                      
                           type: "note",
                           id: "internet_wan_aggregation_note",
                           title: "注",
                           content: "この機能を有効にする前に、ご契約のプロバイダーがWANアグリゲーションに対応していて、モデムに2つのWANポートがある事を確認してください。"
                       } ,{                      
                           type: "step",
                           title: "WAN アグリゲーションの設定方法",
       content: [ 
                "1. WANアグリゲーションを有効にします。",
                "2. [保存]をクリックします。",
                "3. ルーターのWANポートとLAN1ポートをモデムの2つのWANポートと接続をします。"]
}]
},
       LAN_IPV4 :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "ルーターの MAC アドレス、IP アドレス、およびサブネット マスクを表示します。"
                       } ,{                      
                           type: "name",
                           title: "MAC アドレス",
                           content: "ルーターのイーサネット (LAN) ポートに割り当てられた一意の物理アドレス。"
                       } ,{                      
                           type: "name",
                           title: "IP アドレス",
                           content: "ルーターの Web 管理ページへのログインに使用される、ルーターの既定 IP アドレスを表示します。別のものに変更できます。"
                       } ,{                      
                           type: "name",
                           title: "サブネット　マスク",
                           content: "内部および外部のトラフィックを経路指定するために LAN ポートによって使用される割り当て済み識別子を選択するか、新しいサブネット マスクを入力します。"
                       } ,{                      
                           type: "note",
                           title: "注",
                           content: "新しい LAN IP アドレスが古いアドレスと同じサブネットにない場合は、DHCP サーバーの IP アドレス プールが自動的に設定されますが、仮想サーバーと DMZ ホストは再設定されるまで有効になりません。"
                       }]
},
       LINK_AGG :{ 
               TITLE:"リンクアグリゲーション",
               CONTENT: [{
                           type: "paragraph",
                           content: "リンク集約は 2 つのポートをまとめて 1 つの高帯域幅データ パスを実現し、高速でより安定した有線ネットワークを維持します。"
                       } ,{                      
                           type: "step",
                           id: "link_agg_step_help",
                           title: "リンク集約を適用するには",
       content: [ 
                "1.リンク集約機能を有効にするにはこれをオンにします。",
                "2.リンク集約用に 2 つのポートを指定します。",
                "「保存」をクリック"]
}]
},
       IPTV :{ 
               TITLE:"IPTV",
               CONTENT: [{
                           type: "paragraph",
                           content: "IPTV (インターネット プロトコル テレビ) は、LAN やインターネットなどのパケット切り替え型ネットワークでインターネット プロトコル スイートを使用してテレビ サービスを提供するサービスです。"
                       } ,{                      
                           type: "name",
                           id: "igmp-snooping",
                           title: "IGMP スヌーピング",
                           content: "IGMP (インターネット グループ管理プロトコル) スヌーピング機能により、ルーターは依頼元のポートにマルチキャスト トラフィックのみを転送できます。"
                       } ,{                      
                           type: "name",
                           title: "IGMP プロキシ",
                           content: "ISP によって提供される IPTV サービスが IGMP テクノロジー ベースの場合は、IGMP プロキシ機能を有効にします。"
                       } ,{                      
                           type: "name",
                           title: "IGMP バージョン",
                           content: "ISP(プロバイダー)に従ってIGMPバージョンを選択して下さい。既定のバージョンはV2です。"
                       } ,{                      
                           type: "name",
                           id: "igmp-wifi",
                           title: "ワイヤレス マルチキャスト転送",
                           content: "ワイヤレス ネットワークにマルチキャスト パケットを転送できるようにする、ワイヤレス マルチキャスト転送機能を有効にするには、これを選択します。"
                       } ,{                      
                           type: "name",
                           title: "IPTV",
                           content: "ISP によって提供される IPTV サービスが非 IGMP テクノロジー ベースの場合は、IPTV 機能を有効にします。"
                       } ,{                      
                           type: "name",
                           title: "ISPプロファイル",
                           content: "適切なISP（プロバイダー）プロファイルを選択して設定を完了します。 プロファイルには3つのタイプがあります。",
       children: [{                      
                           type: "name",
                           title: "国 - プロバイダー名",
                           content: "既定のISP(プロバイダー)プロファイルは、「国-ISP名」の形式です。 ドロップダウンリストからISPを探して選択するだけです。"
                       } ,{                      
                           type: "name",
                           id: "iptv_bridge_child_1to4",
                           title: "ブリッジ",
                           content: "ISPが表示されず、IPTVの設定に他のパラメータが必要ない場合は、このプロファイルを選択してIPTV専用のLANポートを指定してください。",
       children: [{                      
                           type: "name",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "LANポートが送信するデータの種類を指定します。 たとえば、IPTVがLAN1用に選択されている場合、IPTVデータのみが送信されるため、セットトップボックスをLAN1に接続する必要があります。"
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_2to5",
                           title: "ブリッジ",
                           content: "ISPが表示されず、IPTVの設定に他のパラメータが必要ない場合は、このプロファイルを選択してIPTV専用のLANポートを指定してください。",
       children: [{                      
                           type: "name",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "LANポートが送信するデータの種類を指定します。 たとえば、IPTVがLAN2用に選択されている場合、IPTVデータのみが送信されるため、セットトップボックスをLAN2に接続する必要があります。"
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_bridge_child_5to8",
                           title: "ブリッジ",
                           content: "ISPが表示されず、IPTVの設定に他のパラメータが必要ない場合は、このプロファイルを選択してIPTV専用のLANポートを指定してください。",
       children: [{                      
                           type: "name",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "LANポートが送信するデータの種類を指定します。 たとえば、IPTVがLAN5用に選択されている場合、IPTVデータのみが送信されるため、セットトップボックスをLAN5に接続する必要があります。"
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_1to4",
                           title: "カスタム",
                           content: "ISPが表示されていないが、インターネット/ VoIP / IPTV VLAN IDや優先度などの必要なパラメータを提供している場合は、このプロファイルを選択します。",
       children: [{                      
                           type: "name",
                           title: "インターネット/VoIP/IPTV VLAN ID/優先順位",
                           content: "ISP によって提供されているとおりに VLAN ID と優先順位を設定します。"
                       } ,{                      
                           type: "name",
                           title: "802.11Q タグ",
                           content: "インターネット パケットを 802.11Q でタグ付けするかどうかを選択します。"
                       } ,{                      
                           type: "name",
                           title: "IPTV マルチキャスト VLAN ID/優先順位",
                           content: "必要に応じて IPTV マルチキャスト機能を有効にし、ISP に従って VLAN ID と優先順位を設定します。"
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN1/LAN2/LAN3/LAN4",
                           content: "LANポートが送信するデータの種類を指定します。 たとえば、IPTVがLAN1用に選択されている場合、IPTVデータのみが送信されるため、セットトップボックスをLAN1に接続する必要があります。"
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_2to5",
                           title: "カスタム",
                           content: "ISPが表示されていないが、インターネット/ VoIP / IPTV VLAN IDや優先度などの必要なパラメータを提供している場合は、このプロファイルを選択します。",
       children: [{                      
                           type: "name",
                           title: "インターネット/VoIP/IPTV VLAN ID/優先順位",
                           content: "ISP によって提供されているとおりに VLAN ID と優先順位を設定します。"
                       } ,{                      
                           type: "name",
                           title: "802.11Q タグ",
                           content: "インターネット パケットを 802.11Q でタグ付けするかどうかを選択します。"
                       } ,{                      
                           type: "name",
                           title: "IPTV マルチキャスト VLAN ID/優先順位",
                           content: "必要に応じて IPTV マルチキャスト機能を有効にし、ISP に従って VLAN ID と優先順位を設定します。"
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN2/LAN3/LAN4/LAN5",
                           content: "LANポートが送信するデータの種類を指定します。 たとえば、IPTVがLAN2用に選択されている場合、IPTVデータのみが送信されるため、セットトップボックスをLAN2に接続する必要があります。"
                       }]
} ,{                      
                           type: "name",
                           id: "iptv_custom_5to8",
                           title: "カスタム",
                           content: "ISPが表示されていないが、インターネット/ VoIP / IPTV VLAN IDや優先度などの必要なパラメータを提供している場合は、このプロファイルを選択します。",
       children: [{                      
                           type: "name",
                           title: "インターネット/VoIP/IPTV VLAN ID/優先順位",
                           content: "ISP によって提供されているとおりに VLAN ID と優先順位を設定します。"
                       } ,{                      
                           type: "name",
                           title: "802.11Q タグ",
                           content: "インターネット パケットを 802.11Q でタグ付けするかどうかを選択します。"
                       } ,{                      
                           type: "name",
                           title: "IPTV マルチキャスト VLAN ID/優先順位",
                           content: "必要に応じて IPTV マルチキャスト機能を有効にし、ISP に従って VLAN ID と優先順位を設定します。"
                       } ,{                      
                           type: "name",
                           id: "iptv_custom_child",
                           title: "LAN5/LAN6/LAN7/LAN8",
                           content: "LANポートが送信するデータの種類を指定します。 たとえば、IPTVがLAN5用に選択されている場合、IPTVデータのみが送信されるため、セットトップボックスをLAN5に接続する必要があります。"
                       }]
}]
}]
},
       DHCP_SERVER_SETTINGS :{ 
               TITLE:"DHCP サーバー",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "既定では、DHCP (動的ホスト構成プロトコル) サーバーは有効になっており、TCP/IP パラメーターを IP アドレス プールからクライアント デバイスに動的に割り当てます。",
                "他の DHCP サーバーがある場合や、ネットワーク上のすべてのクライアント デバイスに手動で TCP/IP パラメーターを割り当てる場合を除き、DHCP サーバーを無効にしないでください。"]
} ,{                      
                           type: "name",
                           title: "IP アドレス プール",
                           content: "クライアントにリースできる IP アドレスの範囲を入力します。"
                       } ,{                      
                           type: "name",
                           title: "アドレス リース時間",
                           content: "IP アドレスをクライアントにリースする時間 (1 ～ 2880 分) を入力します。既定値は　120 です。"
                       }]
},
       RESERVED_IP_ADDRESS :{ 
               TITLE:"アドレス予約",
               CONTENT: [{
                           type: "paragraph",
                           content: "IP 予約デバイスの対応パラメーターを表示します。"
                       } ,{                      
                           type: "step",
                           title: "IP アドレスを予約するには",
       content: [ 
                "1. [追加] をクリックします。",
                "2.[スキャン] をクリックして、DHCP クライアント リストから、現在接続されているデバイスを選択します。または、目的のクライアントの MAC アドレスを [MAC アドレス] フィールドに入力し、クライアント用に予約する IP アドレスを [IP アドレス] フィールドに入力します。",
                "3.[説明] フィールドにクライアントの説明を入力します。",
                "4.[このエントリを有効にする] を選択します。",
                "5.[保存] をクリックします。"]
} ,{                      
                           type: "note",
                           title: "注",
                           content: "このエントリを無効にするには、電球アイコンをクリックします。"
                       }]
},
       DHCP_CLIENT_LIST :{ 
               TITLE:"DHCP クライアント リスト",
               CONTENT: [{
                           type: "paragraph",
                           content: "現在接続されているデバイスの情報を表示します。"
                       }]
},
       DDNS :{ 
               TITLE:"動的 DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "動的 DNS (動的ドメイン ネーム システム) では、動的インターネット IP アドレスに固定のホストとドメイン名を割り当てることができます。これは、独自の Web サイト、FTP サーバー、またはルーターの外にある他のサーバーをホストしているときに便利です。まず、www.dyndns.com　などの動的 DNS サービス プロバイダーに登録します。"
                       } ,{                      
                           type: "step",
                           title: "動的 DNS をセットアップするには",
       content: [ 
                "1.動的 DNS サービス プロバイダーを選択します。",
                "2.動的 DNS アカウントのユーザー名とパスワードを入力します。",
                "3.動的 DNS サービス プロバイダーから受け取ったドメイン名を入力します。",
                "4.ドロップダウン リストから更新間隔を選択します。",
                "5.サービス プロバイダーが NO-IP の場合は、[WAN IP バインディング] により、ドメイン名がこのルーターの WAN IP にバインドされるようにすることができます。",
                "6. [ログイン]、[保存] をクリックします。"]
} ,{                      
                           type: "note",
                           title: "注",
                           content: "新しい DDNS アカウントを使用する場合は、まずログアウトしてから、新しいアカウントでログインしてください。"
                       }]
},
       DYNAMIC_DNS :{ 
               TITLE:"動的 DNS",
               CONTENT: [{
                           type: "paragraph",
                           content: "動的 DNS (動的ドメイン ネーム システム) では、動的インターネット IP アドレスに固定のホストとドメイン名を割り当てることができます。これは、独自の Web サイト、FTP サーバー、またはルーターの外にある他のサーバーをホストしているときに便利です。まず、www.dyndns.com　などの動的 DNS サービス プロバイダーに登録します。"
                       }]
},
       DOMAIN_NAME_LIST :{ 
               TITLE:"ドメイン名リスト",
               CONTENT: [{
                           type: "paragraph",
                           content: "この表は、お使いのクラウド アカウントで登録されているすべてのドメイン名の情報を示しています。"
                       } ,{                      
                           type: "step",
                           title: "新しいドメイン名を登録するには",
       content: [ 
                "1.[登録] をクリックします。",
                "2.登録するドメイン名を入力します。",
                "「保存」をクリック"]
}]
},
       ADVANCED_ROUTING_STATIC_ROUTING :{ 
               TITLE:"静的経路指定",
               CONTENT: [{
                           type: "paragraph",
                           content: "静的経路指定は、ネットワーク情報パケットを特定のホストまたはネットワークに到達させるための固定ルートを事前決定するために使用されます。"
                       } ,{                      
                           type: "step",
                           title: "静的経路指定をセットアップするには",
       content: [ 
                "1. [追加] をクリックします。",
                "2.このエントリに静的経路を割り当てるために [ネットワークの宛先] フィールドに IP アドレスを入力します。",
                "3.IP アドレスのネットワーク部とホスト部を決定するために、[サブネット マスク] フィールドにサブネット マスクを入力します。",
                "4.ルーターをネットワークまたはホストに接続するために、[デフォルト ゲートウェイ] フィールドにゲートウェイ IP アドレスを入力します。",
                "5.[インターフェイス] フィールドで LAN または WAN を選択して、ネットワークの宛先のタイプを指定します。",
                "6. このエントリの簡単な説明を入力します。",
                "7.[このエントリを有効にする] を選択します。",
                "8.[保存] をクリックします。"]
} ,{                      
                           type: "note",
                           title: "注",
                           content: "このエントリを無効にするには、電球アイコンをクリックします。"
                       }]
},
       ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE :{ 
               TITLE:"システム ルーティング テーブル",
               CONTENT: [{
                           type: "paragraph",
                           content: "現在使用中のすべての有効なルート エントリを表示します。"
                       }]
},
       WIRELESS_TITLE :{ 
               TITLE:"ワイヤレス設定",
               CONTENT: [{
                           type: "paragraph",
                           content: "必要に応じてワイヤレス設定を指定します。"
                       }]
},
       WIRELESS_SMART_CONNECT :{ 
               TITLE:"スマート コネクト",
               CONTENT: [{
                           type: "paragraph",
                           content: "スマートコネクトを有効にするにはこのチェックボックスにマークをします。この機能を有効すると2.4GHz及び5GHzのSSIDを1つにまとめ、適切な帯域（バンド）をルーターが自動的に判別します。"
                       }]
},
       WIRELESS_24G :{ 
               TITLE:"2.4GHz ワイヤレス",
               CONTENT: [{
                           type: "name",
                           title: "ネットワーク名 (SSID)",
                           content: "ネットワーク名 (SSID) の変更は推奨されていません。このフィールドは大文字小文字が区別されます。"
                       } ,{                      
                           type: "name",
                           title: "SSID を非表示にする",
                           content: "ワイヤレス ネットワーク リストで 2.4GHz ネットワーク名 (SSID) を非表示にする場合は、これを選択します。選択すると、SSID はブロードキャストされなくなるため、手動でネットワークに参加する必要があります。"
                       } ,{                      
                           type: "name",
                           title: "セキュリティ",
                           content: "以下のいずれかのセキュリティ オプションを選択してください。",
       children: [{                      
                           type: "name",
                           title: "セキュリティなし",
                           content: "ワイヤレス セキュリティを無効にするには、このオプションを選択します。これは推奨されていません。"
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-パーソナル",
                           content: "ワイヤレス セキュリティを有効にするには、このオプションを選択します。ワイヤレス ネットワークを無許可アクセスから保護するために、このオプションは強く推奨されます。選択する場合は、以下を設定してください。",
       children: [{                      
                           type: "name",
                           title: "バージョン",
                           content: "セキュリティ バージョンを選択します。セキュリティ バージョンを選択します。WPA2-PSK の方が安全です。わからない場合は、[自動] を選択してください。"
                       } ,{                      
                           type: "name",
                           title: "暗号化",
                           content: "セキュリティ暗号化タイプを選択します。AES の方が安全です。ルーターが 802.11n モードで動作している場合、TKIP 暗号化の使用は推奨されません。また、TKIP を使用すると、WPS 機能が無効になります。わからない場合は、[自動] を選択してください。"
                       } ,{                      
                           type: "name",
                           title: "パスワード",
                           content: "このフィールドにワイヤレス パスワードを 8 ～ 63 文字の ASCII 文字、あるいは 8 ～ 64 文字の 16 進数文字で入力します。"
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2 - エンタープライズ",
                           content: "RADIUS (リモート認証ダイヤルイン ユーザー サービス) サーバーを使用するより高度な認証方法を有効にするには、このオプションを選択します。これを選択すると、WPS 機能が無効になります。",
       children: [{                      
                           type: "name",
                           title: "バージョン",
                           content: "セキュリティ バージョンを選択します。WPA2 の方が安全です。わからない場合は、[自動] を選択してください。"
                       } ,{                      
                           type: "name",
                           title: "暗号化",
                           content: "セキュリティ暗号化タイプを選択します。AES の方が安全です。ルーターが 802.11n モードで動作している場合、TKIP 暗号化の使用は推奨されません。また、TKIP を使用すると、WPS 機能が無効になります。わからない場合は、[自動] を選択してください。"
                       } ,{                      
                           type: "name",
                           title: "RADIUS サーバー IP",
                           content: "RADIUS サーバーの IP アドレスを入力します。"
                       } ,{                      
                           type: "name",
                           title: "RADIUS ポート",
                           content: "RADIUS サーバーのポート番号を入力します。"
                       } ,{                      
                           type: "name",
                           title: "RADIUS パスワード",
                           content: "RADIUS サーバーの共有パスワードを入力します。"
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "WEP（Wired Equivalent Privacy）のみでしかWi-Fiにアクセスできないクライアントがある場合、基本認証方式を有効にするには、このオプションを選択します。 こちらを選択すると、WPS機能が無効になります。",
       children: [{                      
                           type: "name",
                           title: "タイプ",
                           content: "ワイヤレス ネットワークの認証タイプを選択します。わからない場合は、[自動] を選択してください。"
                       } ,{                      
                           type: "name",
                           title: "WEP キー形式:",
                           content: "ASCII 形式を使用するか、16 進を選択します。ASCII 形式は、英数字の組み合わせです。16 進形式は、数字 (0-9) と文字 (A-F、a-f) の組み合わせです。"
                       } ,{                      
                           type: "name",
                           title: "キー タイプ",
                           content: "WEP キーの長さを選択します。",
       children: [{                      
                           type: "name",
                           title: "64 ビット",
                           content: "10 桁の 16 進数 (0-9、A-F、a-f) または 5 桁の ASCII 文字を [WEP 値] フィールドに入力できます。"
                       } ,{                      
                           type: "name",
                           title: "128 ビット",
                           content: "26 桁の 16 進数 (0-9、A-F、a-f) または 13 桁の ASCII 文字を [WEP 値] フィールドに入力できます。"
                       }]
} ,{                      
                           type: "name",
                           title: "キーの値",
                           content: "それぞれのフィールドに WEP キーを入力します。"
                       }]
}]
} ,{                      
                           type: "name",
                           title: "チャンネル",
                           content: "2.4GHz ワイヤレス ネットワークの動作チャンネルを選択します。中間ワイヤレス接続問題が発生していない場合は、チャンネルを [自動] のままにしておくことを推奨します。"
                       } ,{                      
                           type: "name",
                           title: "転送強度",
                           content: "[高]、[中]、[低] のいずれかを選択して、データ転送の強度を指定します。既定の推奨される設定は [高] です。"
                       } ,{                      
                           type: "name",
                           id: "atf_2g4",
                           title: "エアタイム フェアネス機能",
                           content: "「エアタイムフェアネス機能を有効にする」にチェックを入れると、各フローのスループットを最適化する機能が有効化されます。"
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_2g4",
                           title: "マルチユーザー MIMO機能",
                           content: "「マルチユーザー MIMO機能を有効化する」をクリックします。"
                       }]
},
       WIRELESS_5G :{ 
               TITLE:"5GHz ワイヤレス",
               CONTENT: [{
                           type: "name",
                           title: "ネットワーク名 (SSID)",
                           content: "ネットワーク名 (SSID) の変更は推奨されていません。このフィールドは大文字小文字が区別されます。"
                       } ,{                      
                           type: "name",
                           title: "SSID を非表示にする",
                           content: "ワイヤレス ネットワーク リストで 5GHz ネットワーク名 (SSID) を非表示にする場合は、これを選択します。選択すると、SSID はブロードキャストされなくなるため、手動でネットワークに参加する必要があります。"
                       } ,{                      
                           type: "name",
                           title: "セキュリティ",
                           content: "以下のいずれかのセキュリティ オプションを選択してください。",
       children: [{                      
                           type: "name",
                           title: "セキュリティなし",
                           content: "ワイヤレス セキュリティを無効にするには、このオプションを選択します。これは推奨されていません。"
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-パーソナル",
                           content: "ワイヤレス セキュリティを有効にするには、このオプションを選択します。ワイヤレス ネットワークを無許可アクセスから保護するために、このオプションは強く推奨されます。選択する場合は、以下を設定してください。",
       children: [{                      
                           type: "name",
                           title: "バージョン",
                           content: "セキュリティ バージョンを選択します。WPA2-PSK の方が安全です。わからない場合は、[自動] を選択してください。"
                       } ,{                      
                           type: "name",
                           title: "暗号化",
                           content: "セキュリティ暗号化タイプを選択します。AES の方が安全です。ルーターが 802.11n モードで動作している場合、TKIP 暗号化の使用は推奨されません。また、TKIP を使用すると、WPS 機能が無効になります。わからない場合は、[自動] を選択してください。"
                       } ,{                      
                           type: "name",
                           title: "パスワード",
                           content: "このフィールドにワイヤレス パスワードを 8 ～ 63 文字の ASCII 文字、あるいは 8 ～ 64 文字の 16 進数文字で入力します。"
                       }]
} ,{                      
                           type: "name",
                           title: "WPA/WPA2 - エンタープライズ",
                           content: "RADIUS (リモート認証ダイヤルイン ユーザー サービス) サーバーを使用するより高度な認証方法を有効にするには、このオプションを選択します。これを選択すると、WPS 機能が無効になります。",
       children: [{                      
                           type: "name",
                           title: "バージョン",
                           content: "セキュリティ バージョンを選択します。WPA2 の方が安全です。わからない場合は、[自動] を選択してください。"
                       } ,{                      
                           type: "name",
                           title: "暗号化",
                           content: "セキュリティ暗号化タイプを選択します。AES の方が安全です。ルーターが 802.11n モードで動作している場合、TKIP 暗号化の使用は推奨されません。また、TKIP を使用すると、WPS 機能が無効になります。わからない場合は、[自動] を選択してください。"
                       } ,{                      
                           type: "name",
                           title: "RADIUS サーバー IP",
                           content: "RADIUS サーバーの IP アドレスを入力します。"
                       } ,{                      
                           type: "name",
                           title: "RADIUS ポート",
                           content: "RADIUS サーバーのポート番号を入力します。"
                       } ,{                      
                           type: "name",
                           title: "RADIUS パスワード",
                           content: "RADIUS サーバーの共有パスワードを入力します。"
                       }]
} ,{                      
                           type: "name",
                           title: "WEP",
                           content: "WEP（Wired Equivalent Privacy）のみでしかWi-Fiにアクセスできないクライアントがある場合、基本認証方式を有効にするには、このオプションを選択します。 こちらを選択すると、WPS機能が無効になります。",
       children: [{                      
                           type: "name",
                           title: "タイプ",
                           content: "ワイヤレス ネットワークの認証タイプを選択します。わからない場合は、[自動] を選択してください。"
                       } ,{                      
                           type: "name",
                           title: "WEP キー形式:",
                           content: "ASCII 形式を使用するか、16 進を選択します。ASCII 形式は、英数字の組み合わせです。16 進形式は、数字 (0-9) と文字 (A-F、a-f) の組み合わせです。"
                       } ,{                      
                           type: "name",
                           title: "キー タイプ",
                           content: "WEP キーの長さを選択します。",
       children: [{                      
                           type: "name",
                           title: "64 ビット",
                           content: "10 桁の 16 進数 (0-9、A-F、a-f) または 5 桁の ASCII 文字を [WEP 値] フィールドに入力できます。"
                       } ,{                      
                           type: "name",
                           title: "128 ビット",
                           content: "26 桁の 16 進数 (0-9、A-F、a-f) または 13 桁の ASCII 文字を [WEP 値] フィールドに入力できます。"
                       }]
} ,{                      
                           type: "name",
                           title: "キーの値",
                           content: "それぞれのフィールドに WEP キーを入力します。"
                       }]
}]
} ,{                      
                           type: "name",
                           title: "チャンネル",
                           content: "5GHz ワイヤレス ネットワークの動作チャンネルを選択します。ワイヤレス接続に問題が発生していない場合は、チャンネルを [自動] のままにしておくことを推奨します。"
                       } ,{                      
                           type: "name",
                           title: "転送強度",
                           content: "[高]、[中]、[低] のいずれかを選択して、データ転送の強度を指定します。既定の推奨される設定は [高] です。"
                       } ,{                      
                           type: "name",
                           id: "atf_5g",
                           title: "エアタイム フェアネス機能",
                           content: "「エアタイムフェアネス機能を有効にする」にチェックを入れると、各フローのスループットを最適化する機能が有効化されます。"
                       } ,{                      
                           type: "name",
                           id: "mu_mimo_5g",
                           title: "マルチユーザー MIMO機能",
                           content: "「マルチユーザー MIMO機能を有効化する」をクリックします。"
                       }]
},
       WPS :{ 
               TITLE:"WPS",
               CONTENT: [{
                           type: "paragraph",
                           content: "WPS (Wi-Fi 保護セットアップ) は、セキュリティ保護された Wi-Fi 接続のセットアップを簡単にできるようにします。"
                       } ,{                      
                           type: "name",
                           title: "プッシュ ボタン (推奨)",
       content: [ 
                "この方法を用いることによってWPSが使用できるデバイスを簡単にワイヤレスネットワークに接続することができます。",
                "画面上の「WPS」ボタンをクリックしてください。その後、2分以内に接続するデバイスのWPSボタンを押して下さい。"]
} ,{                      
                           type: "name",
                           title: "ルーター の PIN",
       content: [ 
                "既定のPINはルーターのラベルにて確認していただけます。",
                "[生成]をクリックして新たなPINを生成するか、[既定]をクリックして現在のPINを工場出荷時のPINに戻してください。"]
} ,{                      
                           type: "name",
                           title: "クライアントの PIN",
       content: [ 
                "この方法を用いることによって手動でワイヤレスデバイスを追加する事が出来ます。",
                "デバイスのPINを入力してから[接続]をクリックしてください。"]
}]
},
       WIRELESS_STATISTICS :{ 
               TITLE:"ワイヤレス ステーション オンライン",
               CONTENT: [{
                           type: "name",
                           title: "クライアント総数",
                           content: "関連付けられているワイヤレス クライアントの数を表示します。"
                       } ,{                      
                           type: "name",
                           title: "MAC アドレス",
                           content: "関連付けられているワイヤレス クライアントの MAC アドレスを表示します。"
                       } ,{                      
                           type: "name",
                           title: "接続タイプ",
                           content: "関連付けられているワイヤレス クライアントのワイヤレス周波数帯域 (2.4GHz または 5GHz) を表示します。"
                       } ,{                      
                           type: "name",
                           title: "セキュリティ",
                           content: "関連付けられているワイヤレス クライアントのセキュリティ タイプを表示します。"
                       } ,{                      
                           type: "name",
                           title: "受信済みパケット",
                           content: "関連付けられているワイヤレス クライアントによって受信されたパケット数を表示します。"
                       } ,{                      
                           type: "name",
                           title: "送信済みパケット",
                           content: "関連付けられているワイヤレス クライアントによって送信されたパケット数を表示します。"
                       } ,{                      
                           type: "paragraph",
                           content: "このページの情報を更新するには [更新] をクリックします。"
                       }]
},
       WIRELESS_SCHEDULE :{ 
               TITLE:"ワイヤレス スケジュール",
               CONTENT: [{
                           type: "paragraph",
                           content: "ワイヤレス スケジュールでは、特定の期間にワイヤレス信号を無効にすることができます。例えば、00:00 am から 07:00 am まで、ワイヤレス信号をオフにできます。"
                       } ,{                      
                           type: "name",
                           title: "ワイヤレス オフ時間",
                           content: "ワイヤレス信号をオフにする期間を表示します。",
       children: [{                      
                           type: "step",
                           title: "ワイヤレス オフ時間を設定するには",
       content: [ 
                "1. [追加] をクリックします。",
                "2. ワイヤレス信号をオフにする時間を設定してください。",
                "3. 繰り返しの設定を選んでください。「毎日」もしくは特定の曜日を選択してください。",
                "4. [保存]をクリックします。"]
}]
}]
},
       GUEST_NETWORK_SETTINGS :{ 
               TITLE:"設定",
               CONTENT: [{
                           type: "paragraph",
                           content: "この機能では、メイン ネットワークを公開せずにゲストに Wi-Fi アクセスを提供できます。"
                       } ,{                      
                           type: "name",
                           title: "ゲストどうしのアクセスを許可する",
                           content: "ネットワーク近隣、Samba、Ping、および FTP などの方式でワイヤレス デバイスが互いにゲスト ネットワーク上で通信できるようにするには、このチェック ボックスをオンにします。"
                       } ,{                      
                           type: "name",
                           id: "access_local",
                           title: "ゲストが自分のローカル ネットワークにアクセスすることを許可する",
                           content: "ネットワーク近隣、Samba、Ping、および FTP などの方式でワイヤレス デバイスがルーターの LAN ポートまたはメイン ネットワークに接続されているデバイスにゲスト ネットワーク上で通信できるようにするには、このチェック ボックスをオンにします。"
                       }]
},
       GUEST_NETWORK_WIRELESS :{ 
               TITLE:"2.4GHz/5GHz ワイヤレス",
               CONTENT: [{
                           type: "name",
                           title: "ゲスト ネットワークを有効にする",
                           content: "ゲスト ネットワーク機能を有効にするには、このチェック ボックスをオンにします。"
                       } ,{                      
                           type: "name",
                           title: "ネットワーク名 (SSID)",
                           content: "既定のゲスト SSID を使用するか、新しい名前 (32 文字まで) を作成します。"
                       } ,{                      
                           type: "name",
                           title: "SSID を非表示にする",
                           content: "Wi-Fi ネットワーク リストでゲスト SSID を非表示にする場合は、このチェックボックスをオンにします。"
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "パスワード更新間隔",
                           content: "ゲスト ネットワーク パスワードの更新間隔を選択します。"
                       } ,{                      
                           type: "name",
                           title: "セキュリティ",
                           content: "パスワードを更新しないことを選択する場合、以下のいずれかのセキュリティ オプションを選択します。",
       children: [{                      
                           type: "name",
                           title: "セキュリティなし",
                           content: "ワイヤレス セキュリティを無効にするには、このオプションを選択します。これは推奨されていません。"
                       } ,{                      
                           type: "name",
                           title: "WPA/WPA2-パーソナル",
                           content: "ワイヤレス セキュリティを有効にするには、このオプションを選択します。ゲスト ネットワークを無許可アクセスから保護するために、このオプションは強く推奨されます。選択する場合は、以下を設定してください。",
       children: [{                      
                           type: "name",
                           title: "バージョン",
                           content: "セキュリティ バージョンを選択します。WPA2-PSK の方が安全です。わからない場合は、[自動] を選択してください。"
                       } ,{                      
                           type: "name",
                           title: "暗号化",
                           content: "セキュリティ暗号化タイプを選択します。AES の方が安全です。ルーターが 802.11n モードで動作している場合、TKIP 暗号化の使用は推奨されません。また、TKIP を使用すると、WPS 機能が無効になります。わからない場合は、[自動] を選択してください。"
                       }]
} ,{                      
                           type: "name",
                           id: "portal-help-title",
                           title: "ポータル",
                           content: "ポータル認証はあなたのワイヤレスネットワークへアクセスするために一時的に必要なクライアントからの認証要求からのネットワークセキュリティを強化します。"
                       } ,{                      
                           type: "step",
                           id: "portal-help-content",
                           title: "ポータル認証の設定",
       content: [ 
                "1. セキュリティのポータルを選択します。",
                "2. 「シンプルパスワード」か「認証しない」を選択します。",
                "A. シンプルパスワード - 特定のパスワードを設定します。",
                "B. 認証しない - クライアントが認証をせずにネットワークにアクセスできるようになります。",
                "3. 1時間、2時間、4時間、8時間または常時を選択して認証の失効時間を設定します。クライアントの認証が失効した場合、再認証のために再ログインする必要があります。",
                "4. (オプション) 「リダイレクト」を有効にし、必要であればリダイレクト先のURLを入力します。すると、新たな認証を受けたクライアントが入力されたURLにリダイレクトされます。",
                "5. (オプション) 認証ページのカスタマイズが可能です。",
                "A. ポータルタイトル - 31文字以内です。",
                "B. 利用規約 - 1023文字以内です。",
                "C. ロゴイメージ - JPGかPNGの画像をアップロードしてロゴをカスタマイズできます。",
                "D. 背景イメージ - JPGかPNGの画像をアップロードして背景をカスタマイズできます。",
                "6. [保存]をクリックします"]
}]
} ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "パスワード",
                           content: "8 ～ 63 文字の ASCII 文字、または 8 ～ 64 文字の 16 進数 (0-9、a-f、A-F) のパスワードを作成します。"
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "パスワード",
                           content: "ランダムに生成されたパスワードを使用するか、8 ～ 63 文字の ASCII 文字、または 8 ～ 64 文字の 16 進数文字 (0-9、a-f、A-F) でパスワードを作成します。"
                       }]
},
       NAT :{ 
               TITLE:"ALG",
               CONTENT: [{
                           type: "paragraph",
                           content: "ALG (アプリケーション レイヤー ゲートウェイ) では、カスタマイズされた　NAT (ネットワーク アドレス変換) トラバーサル フィルターをゲートウェイに設置して、FTP、TFTP、H323 などの特定のアプリケーション レイヤーの \"制御/データ\" プロトコル用のアドレスとポート変換をサポートします。ALG を有効にすることを推奨します。"
                       } ,{                      
                           type: "name",
                           title: "FTP ALG を有効にする",
                           content: "これを選択すると、FTP (ファイル転送プロトコル) クライアントとサーバーが NAT 経由でデータを転送できます。"
                       } ,{                      
                           type: "name",
                           title: "TFTP ALG を有効にする",
                           content: "これを選択すると、TFTP (簡易ファイル転送プロトコル) クライアントとサーバーが NAT 経由でデータを転送できます。"
                       } ,{                      
                           type: "name",
                           title: "H323 ALG を有効にする",
                           content: "これを選択すると、Microsoft NetMeeting クライアントが NAT 経由で通信できます。"
                       } ,{                      
                           type: "name",
                           title: "RTSP ALG を有効にする",
                           content: "これを選択すると、メディア クライアント プレイヤーが NAT 経由でストリーミング メディア サーバーと通信できます。"
                       } ,{                      
                           type: "name",
                           title: "SIP ALG を有効にする",
                           content: "これを選択すると、クライアントが NAT 経由で SIP (セッション開始プロトコル) と通信できます。"
                       } ,{                      
                           type: "name",
                           title: "PPTP パススルーを有効にする",
                           content: "これを選択すると、ポイント間セッションが、IP ネットワークを通過してルーターを通ることができます。"
                       } ,{                      
                           type: "name",
                           title: "L2TP パススルーを有効にする",
                           content: "これを選択すると、レイヤー 2 ポイント間セッションが、IP ネットワークを通過してルーターを通ることができます。"
                       } ,{                      
                           type: "name",
                           title: "IPSec パススルーを有効にする",
                           content: "これを選択すると、IPsec (インターネット プロトコル セキュリティ) が、IP ネットワークを通過してルーターを通ることができます。IPSec は暗号セキュリティ サービスを使用して、IP ネットワーク上でプライベートで安全な通信を行います。"
                       }]
},
       VIRTUAL_SERVERS :{ 
               TITLE:"仮想サーバー",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "仮想サーバーは、ローカル ネットワーク上で公開用サービスをセットアップするために使用されます。仮想サーバーは外部ポートとして定義され、インターネットからこの外部ポートへのすべてのリクエストは、指定されたコンピューターにリダイレクトされます。これは静的または予約 IP アドレスで設定されている必要があります。",
                "ローカルネットに構築したサーバーからインターネットに共有をする場合は、仮想サーバーがインターネットのユーザーに共有を可能にします。"]
} ,{                      
                           type: "paragraph",
                           content: "この表は、仮想サーバーの関連パラメーターを示します。"
                       } ,{                      
                           type: "name",
                           title: "サービス タイプ",
                           content: "仮想サーバーの名前を表示します。"
                       } ,{                      
                           type: "name",
                           title: "外部ポート",
                           content: "仮想サーバーによって使用されるポート番号またはポートの範囲を表示します。"
                       } ,{                      
                           type: "name",
                           title: "内部 IP",
                           content: "サービス アプリケーションを実行しているコンピューターの IP アドレスを表示します。"
                       } ,{                      
                           type: "name",
                           title: "内部ポート",
                           content: "サービス アプリケーションを実行しているコンピューターのポート番号を表示します。"
                       } ,{                      
                           type: "name",
                           title: "プロトコル",
                           content: "サービス アプリケーションに使用されるプロトコルを表示します:TCP、UDP、またはすべて (ルーターによってサポートされるすべてのプロトコル)。"
                       } ,{                      
                           type: "name",
                           title: "ステータス",
                           content: "特定のフィルタリング ルールの現在のステータス (有効または無効) を表示します。"
                       } ,{                      
                           type: "name",
                           title: "変更",
                           content: "対応するルールを修正または削除するオプションを表示します。"
                       } ,{                      
                           type: "step",
                           title: "仮想サーバーのルールをセットアップするには",
       content: [ 
                "1. [追加] をクリックします。",
                "2.[スキャン] をクリックして、リストからサービスを選択し、[外部ポート] および [内部ポート] フィールドに該当するポート番号を自動で入力します。サービスがリストされていない場合、外部ポート番号 (例: 21) またはポートの範囲 (例: 21-25)　を入力します。内部ポートが外部ポートと同じである場合は空にしておきます。または、外部ポートが 1 つのポートの場合は特定のポート番号　(例: 21) を入力できます。サービス アプリケーションを実行しているコンピューターの IP アドレスを [内部 IP] フィールドにドット 10 進表記で入力します。",
                "3.サービス アプリケーションのプロトコル[TCP]、[UDP]、または [すべて] を [プロトコル] ドロップダウン リストから選択します。",
                "4.[このエントリを有効にする] を選択します。",
                "5.[保存] をクリックします。"]
} ,{                      
                           type: "note",
                           title: "注",
       content: [ 
                "1. このエントリを無効にするには、電球アイコンをクリックします。",
                "2. どのポートとプロトコルを使用するか明確でない場合はどちらも編子をしないことを推奨いたします。",
                "3. ローカルホストデバイスが1種類以上の利用可能なサービスをホストしている場合、各サービスごとにホストを設定する必要があります。その際、外部ポートと重複しないようにしてください。"]
}]
},
       PORT_TRIGGERING :{ 
               TITLE:"ポート トリガー",
               CONTENT: [{
                           type: "paragraph",
                           content: "ポート トリガーは、特定のポートでのトラフィックを、ネットワーク上の特定のサーバーに転送するために使用されます。"
                       } ,{                      
                           type: "paragraph",
                           content: "この表は、ポート トリガーの関連パラメーターを示します。"
                       } ,{                      
                           type: "name",
                           title: "アプリケーション",
                           content: "アプリケーションの名前を表示します。"
                       } ,{                      
                           type: "name",
                           title: "トリガー ポート",
                           content: "発信接続のフィルタリング ルールをトリガーするために使用される発信トラフィック ポートを表示します。"
                       } ,{                      
                           type: "name",
                           title: "トリガー プロトコル",
                           content: "トリガー ポートに使用されるプロトコルを表示します。TCP、UDP、またはすべて (ルーターによってサポートされるすべてのプロトコル)。"
                       } ,{                      
                           type: "name",
                           title: "外部ポート",
                           content: "リモート システムによって使用されるポートまたはポート範囲を表示します。これらのポートのいずれかを使用した応答は、このルールをトリガーした PC に転送されます。最大で 5 つのグループのポート (またはポート セクション) を入力できます。各ポート グループは、\",\" (コンマ) で区切る必要があります。例えば、2000-2038, 2046, 2050-2051, 2085, 3010-3030 のようにします。"
                       } ,{                      
                           type: "name",
                           title: "外部プロトコル",
                           content: "受信ポートに使用されるプロトコルを表示します:TCP、UDP、またはすべて (ルーターによってサポートされるすべてのプロトコル)。"
                       } ,{                      
                           type: "name",
                           title: "ステータス",
                           content: "特定のフィルタリング ルールの現在のステータス (有効または無効) を表示します。"
                       } ,{                      
                           type: "name",
                           title: "変更",
                           content: "対応するルールを修正または削除するオプションを表示します。"
                       } ,{                      
                           type: "step",
                           title: "ポート トリガーのルールをセットアップするには",
       content: [{                      
                           type: "note",
                           title: "注",
                           content: "各ルールは、同時に 1 つのホストによってのみ使用できます。"
                       },
                "1. [追加] をクリックします。",
                "2.[スキャン] をクリックして、リストからアプリケーションを選択し、既定値を該当フィールドに自動で入力します。リストされていないアプリケーションを追加する場合は、アプリケーション、トリガー ポート、トリガー プロトコル、外部ポート、および外部プロトコルを手動で入力します。",
                "3.[このエントリを有効にする] を選択します。",
                "4. [保存]をクリックします。"]
} ,{                      
                           type: "note",
                           title: "注",
                           content: "このルールを無効にするには、電球アイコンをクリックします。"
                       }]
},
       DMZ :{ 
               TITLE:"DMZ",
               CONTENT: [{
                           type: "paragraph",
                           content: "DMZ (非武装地帯) ホスト機能では、インターネット ゲームやビデオ会議などの特定の目的のサービスのために、ローカル ホストをインターネットに公開することができます。基本的に、DMZ では LAN 上の 1 つのコンピューターがそのすべてのポートをオープンできます。このコンピューターは、静的 IP アドレスで設定されている必要があり、DHCP クライアント機能が無効になっていなければなりません。"
                       } ,{                      
                           type: "paragraph",
                           content: "DMZ が有効になっているときは、DMZ ホストはインターネットに完全に公開されるため、コンピューターに安全面において何らかの潜在的な危険性が生じる可能性があります。DMZ が使用されていない場合は、適宜無効にしてください。"
                       } ,{                      
                           type: "step",
                           title: "コンピューターまたはサーバーを DMZ サーバーとして割り当てるには",
       content: [ 
                "1.[DMZ を有効にする] を選択します。",
                "2.[DMZ ホスト IP アドレス] フィールドで、ローカル コンピューターの IP アドレスを入力し、DMZ ホストとしてセットアップします。",
                "「保存」をクリック"]
}]
},
       UPNP :{ 
               TITLE:"UPnP",
               CONTENT: [{
                           type: "paragraph",
                           content: "既定では、UPnP (ユニバーサル プラグアンドプレイ) 機能は、コンピューターやインターネット機器などのデバイスがローカル ネットワーク上で相互に自動で検出および通信できるようにするために、有効になっています。"
                       } ,{                      
                           type: "paragraph",
                           content: "マルチプレイヤー ゲーム、ピアツーピア通信、リアルタイム通信 (VoIP や teleVoIP 会議など) またはリモート アシスタンスなどのアプリケーションを使用する場合は、UPnP を有効にする必要がある場合があります。"
                       } ,{                      
                           type: "name",
                           title: "UPnP サービス リスト",
                           content: "UPnP サービス リストには、ローカル ホストの UPnP 情報が表示されます。"
                       }]
},
       MODEM :{ 
               TITLE:"3G/4G のヘルプ",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB モデム",
                           content: "3G/4G USB モデムのステータスを表示します。"
                       } ,{                      
                           type: "name",
                           title: "自動識別 ISP パラメーターを使用",
                           content: "この機能は既定で有効になっています。これを有効にすると、ルーターは SIM/UIM カード用に ISP を識別し、パラメーターを自動で入力します。識別に失敗した場合は、[地域] と [モバイル ISP] を手動で選択してください。"
                       } ,{                      
                           type: "name",
                           title: "地域",
                           content: "USB モデムと SIM カードが正常に識別されると、自動で地域を選択して表示します。表示されない場合は、ドロップダウン メニューから地域を選択してください。"
                       } ,{                      
                           type: "name",
                           title: "モバイル ISP",
                           content: "3G/4G ネットワークの ISP (インターネット サービス プロバイダー) を表示します。自動で検出されない場合は、ドロップダウン メニューから ISP を選択してください。既定のダイヤル番号と APN がそれに応じて自動入力されます。"
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "SIM/UIM 保護を有効にする場合、PIN コードを入力します。SIM/UIM 保護は既定で無効になっています。無効な PIN を 3 回入力すると、SIM/UIM カードが自動でロックされるので、注意してください。ロックを解除するには、パソコン/ノート PC から PUK コードを入力する必要があります。"
                       } ,{                      
                           type: "name",
                           title: "メッセージ",
                           content: "PIN 保護が有効になっている場合、SIM/UIM カードの PIN 情報を表示します。"
                       } ,{                      
                           type: "name",
                           title: "ダイヤル番号、APN、ユーザー名、パスワードを手動で設定してください。",
                           content: "ISP が [<strong>モバイル ISP</strong>] リストに含まれていない場合は、このチェック ボックスをオンにして、ISP から提供されたダイヤル番号、APN (アクセス ポイント名)、ユーザー名、パスワードを入力します。"
                       } ,{                      
                           type: "name",
                           title: "ダイヤル番号",
                           content: "ISP によって提供されたダイヤル番号を入力します。"
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "ISP によって提供された APN (アクセス ポイント名) を入力します。"
                       } ,{                      
                           type: "name",
                           title: "ユーザー名/パスワード",
                           content: "ISP によって提供されたユーザー名とパスワードを入力します。これらのフィールドは大文字小文字が区別されます。"
                       } ,{                      
                           type: "name",
                           title: "オンデマンド接続",
                           content: "このモードでは、インターネット接続は、指定された時間のアイドル状態 (最大アイドル時間) が経過すると自動的に終了されます。接続は、インターネットにもう一度アクセスしようとすると再確立されます。"
                       } ,{                      
                           type: "note",
                           title: "注",
                           content: "[最大アイドル時間] を指定していても接続が切断されないことがあります。これは、いくつかのアプリケーションがバックエンドでインターネットにアクセスし続けているためです。"
                       } ,{                      
                           type: "name",
                           title: "自動接続",
                           content: "このモードでは、インターネット接続は、切断されるといつでも自動的に再接続します。"
                       } ,{                      
                           type: "name",
                           title: "手動接続",
                           content: "このモードでは、[接続] または [切断] ボタンをクリックして、インターネット接続を手動で制御できます。このモードも最大アイドル時間機能をサポートします。インターネット接続のアイドル状態を維持できる最大時間 (分) を [最大アイドル時間] フィールドに入力します。既定値は 15 分です。常にインターネット接続をアクティブのままにしておく場合は、0 (ゼロ) を入力します。"
                       } ,{                      
                           type: "note",
                           title: "注",
                           content: "[最大アイドル時間] を指定していても接続が切断されないことがあります。これは、いくつかのアプリケーションがバックエンドでインターネットにアクセスし続けているためです。"
                       } ,{                      
                           type: "paragraph",
                           content: "[保存] ボタンをクリックして、設定を保存します。"
                       }]
},
       MODEM_ADVANCED :{ 
               TITLE:"3G/4G 詳細設定のヘルプ",
               CONTENT: [{
                           type: "name",
                           title: "3G/4G USB モデム",
                           content: "3G/4G USB モデムのステータスを表示します。"
                       } ,{                      
                           type: "name",
                           title: "自動識別 ISP パラメーターを使用",
                           content: "この機能は既定で有効になっています。これを有効にすると、ルーターは SIM/UIM カード用に ISP を識別し、パラメーターを自動で入力します。識別に失敗した場合は、[地域] と [モバイル ISP] を手動で選択してください。"
                       } ,{                      
                           type: "name",
                           title: "地域",
                           content: "USB モデムと SIM カードが正常に識別されると、自動で地域を選択して表示します。表示されない場合は、ドロップダウン メニューから地域を選択してください。"
                       } ,{                      
                           type: "name",
                           title: "モバイル ISP",
                           content: "3G/4G ネットワークの ISP (インターネット サービス プロバイダー) を表示します。自動で検出されない場合は、ドロップダウン メニューから ISP を選択してください。既定のダイヤル番号と APN がそれに応じて自動入力されます。"
                       } ,{                      
                           type: "name",
                           title: "SIM/UIM PIN",
                           content: "SIM/UIM 保護を有効にする場合、PIN コードを入力します。SIM/UIM 保護は既定で無効になっています。無効な PIN を 3 回入力すると、SIM/UIM カードが自動でロックされるので、注意してください。ロックを解除するには、パソコン/ノート PC から PUK コードを入力する必要があります。"
                       } ,{                      
                           type: "name",
                           title: "メッセージ",
                           content: "PIN 保護が有効になっている場合、SIM/UIM カードの PIN 情報を表示します。"
                       } ,{                      
                           type: "name",
                           title: "ダイヤル番号、APN、ユーザー名、パスワードを手動で設定してください。",
                           content: "ISP が [<strong>モバイル ISP</strong>] リストに含まれていない場合は、このチェック ボックスをオンにして、ISP から提供されたダイヤル番号、APN (アクセス ポイント名)、ユーザー名、パスワードを入力します。"
                       } ,{                      
                           type: "name",
                           title: "ダイヤル番号",
                           content: "ISP によって提供されたダイヤル番号を入力します。"
                       } ,{                      
                           type: "name",
                           title: "APN",
                           content: "ISP によって提供された APN (アクセス ポイント名) を入力します。"
                       } ,{                      
                           type: "name",
                           title: "ユーザー名/パスワード",
                           content: "ISP によって提供されたユーザー名とパスワードを入力します。これらのフィールドは大文字小文字が区別されます。"
                       } ,{                      
                           type: "name",
                           title: "オンデマンド接続",
                           content: "このモードでは、インターネット接続は、指定された時間のアイドル状態 (最大アイドル時間) が経過すると自動的に終了されます。接続は、インターネットにもう一度アクセスしようとすると再確立されます。"
                       } ,{                      
                           type: "note",
                           title: "注",
                           content: "[最大アイドル時間] を指定していても接続が切断されないことがあります。これは、いくつかのアプリケーションがバックエンドでインターネットにアクセスし続けているためです。"
                       } ,{                      
                           type: "name",
                           title: "自動接続",
                           content: "このモードでは、インターネット接続は、切断されるといつでも自動的に再接続します。"
                       } ,{                      
                           type: "name",
                           title: "手動接続",
                           content: "このモードでは、[接続] または [切断] ボタンをクリックして、インターネット接続を手動で制御できます。このモードも最大アイドル時間機能をサポートします。インターネット接続のアイドル状態を維持できる最大時間 (分) を [最大アイドル時間] フィールドに入力します。既定値は 15 分です。常にインターネット接続をアクティブのままにしておく場合は、0 (ゼロ) を入力します。"
                       } ,{                      
                           type: "note",
                           title: "注",
                           content: "[最大アイドル時間] を指定していても接続が切断されないことがあります。これは、いくつかのアプリケーションがバックエンドでインターネットにアクセスし続けているためです。"
                       } ,{                      
                           type: "name",
                           title: "認証タイプ",
                           content: "認証タイプを選択します。既定は [自動] です。一部の ISP では特定の認証タイプが必要です。ISP に確認するか、既定の設定をそのまま使用してください。"
                       } ,{                      
                           type: "name",
                           title: "自動",
                           content: "[自動 (既定)] の場合、ルーターは ISP が使用する認証タイプを自動で判別します。"
                       } ,{                      
                           type: "name",
                           title: "PAP",
                           content: "[PAP] (パスワード認証プロトコル) の場合、ルーターは 2 回のハンドシェイクでピアと認証します。ISP がこの認証タイプを必要とする場合に、このオプションを選択してください。"
                       } ,{                      
                           type: "name",
                           title: "CHAP",
                           content: "[CHAP] (チャレンジ ハンドシェイク認証プロトコル) の場合、ルーターは 3 回のハンドシェイクでピアと認証し、ピアの識別情報を周期的に検証します。ISP がこの認証タイプを必要とする場合に、このオプションを選択してください。"
                       } ,{                      
                           type: "name",
                           title: "MTU サイズ",
                           content: "既定の MTU (最大転送単位) サイズは 1480 バイトです。ISP によって要求されない限り変更しないでください。"
                       } ,{                      
                           type: "name",
                           title: "次の DNS サーバーを使用",
                           content: "ISP が DNS サーバー IP アドレスを提供している場合は、このチェック ボックスをオンにして、<strong>プライマリ DNS</strong> とセカンダリ DNS (オプション) IP アドレスを以下に入力します。入力しない場合、DNS サーバーは ISP から動的に割り当てられます。"
                       } ,{                      
                           type: "name",
                           title: "プライマリ DNS",
                           content: "ISP によって提供された DNS IP アドレスをドット区切りの 10 進表記で入力します。"
                       } ,{                      
                           type: "name",
                           title: "セカンダリ DNS",
                           content: "(オプション) ISP によって提供された DNS IP アドレスをドット区切りの 10 進表記で入力します。"
                       } ,{                      
                           type: "paragraph",
                           content: "設定を保存するには [<strong>保存</strong>] ボタンをクリックします。"
                       }]
},
       DISK_SETTING :{ 
               TITLE:"デバイス設定",
               CONTENT: [{
                           type: "paragraph",
                           content: "[デバイス設定] ページは、USB ポート経由で接続された USB ストレージ デバイスの関連情報を表示します。"
                       } ,{                      
                           type: "name",
                           title: "スキャン",
                           content: "通常、ルーターは新たに接続されたデバイスを自動で検出します。自動検出されない場合は、このボタンをクリックして、接続された新しいデバイスをスキャンし、最新の情報でページを更新します。"
                       } ,{                      
                           type: "name",
                           title: "ボリューム",
                           content: "USB ボリュームの名前を表示します。"
                       } ,{                      
                           type: "name",
                           title: "容量",
                           content: "USB の総容量を表示します。"
                       } ,{                      
                           type: "name",
                           title: "空き領域",
                           content: "現在使用可能な空きストレージ領域を表示します。"
                       } ,{                      
                           type: "name",
                           title: "安全な取り外し",
                           content: "USB ストレージ デバイスを物理的にルーターから取り外す前に、このボタンをクリックして安全にマウント解除します。"
                       } ,{                      
                           type: "paragraph",
                           content: "[削除] ボタンは、USB ストレージ デバイスがルーターに接続されている場合にのみ表示されます。現在のボリュームがビジー状態の場合は、マウント解除できません。"
                       } ,{                      
                           type: "name",
                           title: "ステータス",
                           content: "この表は、USB ストレージ デバイスがルーターに接続されている場合にのみ表示されます。USB デバイスのファイル共有を有効にするには、これを選択します。"
                       } ,{                      
                           type: "step",
                           title: "ファイル サーバーをセットアップするには",
       content: [ 
                "1.USB ケーブルを使用してルーターの USB ポートに USB ストレージ デバイスを接続します。",
                "2.新たに接続された USB デバイスはルーターによって自動で検出され、[デバイス設定] セクションに情報が表示されます。自動検出されない場合は、[スキャン] をクリックします。",
                "3.USB ストレージ デバイスを共有しない場合は、電球をクリックして無効にします。"]
}]
},
       FOLDER_SHARE_ACCOUNT :{ 
               TITLE:"共有アカウント",
               CONTENT: [{
                           type: "name",
                           title: "アカウント",
                           content: "[既定のアカウントを使用] を選択して共有ファイルおよびフォルダーにログインするか、[新しいアカウントを使用] を選択して以下を入力し、新しいユーザー アカウントを作成します。"
                       } ,{                      
                           type: "name",
                           title: "ユーザー名/パスワード",
                           content: "1 ～ 15 文字の英数字またはアンダーラインでユーザー名を、1 ～ 15 文字の ASCII 文字でパスワードを入力します。これらのフィールドは大文字小文字が区別されます。"
                       } ,{                      
                           type: "name",
                           title: "パスワードの確認",
                           content: "誤字がないことを確かめるためにパスワードを再入力します。このフィールドでも大文字小文字が区別されます。"
                       } ,{                      
                           type: "paragraph",
                           content: "[保存] をクリックして、すべての設定を保存してください。"
                       }]
},
       FOLDER_SHARE_SETTINGS :{ 
               TITLE:"共有設定",
               CONTENT: [{
                           type: "name",
                           title: "ネットワーク/メディア サーバー名",
                           content: "接続されている USB ストレージ デバイスにアクセスするために使用される名前を表示します。"
                       } ,{                      
                           type: "name",
                           title: "有効",
                           content: "アクセス方法を有効にするにはこれを選択します。"
                       } ,{                      
                           type: "name",
                           title: "アクセス方法",
                           content: "接続されている USB ストレージ デバイスにアクセスできる 3 つのアクセス方法があります。対応するチェック ボックスで、1 つ以上のアクセス方法を選択できます。",
       children: [{                      
                           type: "name",
                           title: "ネットワーク近隣",
                           content: "有効にすると、ネットワーク上のユーザーは、割り当て IP アドレス (例: \\\\192.168.0.1) で USB ストレージ デバイスにアクセスできます。"
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "有効にすると、ローカル ネットワーク上の FTP クライアントは、割り当て IP アドレスと FTP サーバーのポート番号 (例: ftp://192.168.0.1:21) で USB ストレージ デバイスにアクセスできます。"
                       } ,{                      
                           type: "name",
                           title: "FTP (インターネット経由)",
                           content: "有効にすると、インターネット上で FTP を介してリモートで USB ストレージ ドライブにアクセスできます。この機能は、ファイルのダウンロードとアップロードの両方をサポートします。FTP サーバーのポート番号を変更するには、ポート番号を入力して [保存] をクリックし、変更を適用します。"
                       }]
} ,{                      
                           type: "name",
                           title: "リンク",
                           content: "共有 USB ストレージ デバイスにアクセスするために使用されるアドレスを表示します。"
                       } ,{                      
                           type: "name",
                           title: "ポート",
                           content: "FTP サーバーのポート番号を表示します。既定値 21 を使用するか、1024 ～ 65535 の値を入力します。"
                       } ,{                      
                           type: "paragraph",
                           content: "[保存] をクリックして、すべての設定を保存してください。"
                       }]
},
       FOLDER_SHARE_FOLDERS :{ 
               TITLE:"フォルダー共有",
               CONTENT: [{
                           type: "name",
                           title: "すべて共有",
                           content: "すべてのファイルとフォルダーを共有するにはオンにし、選択されたフォルダーのみを共有するにはオフにします。"
                       } ,{                      
                           type: "name",
                           title: "認証を有効にする",
                           content: "共有フォルダーにアクセスするための有効なユーザー名とパスワードをユーザーに入力させるために認証を有効にすることを強く推奨します。"
                       } ,{                      
                           type: "name",
                           title: "フォルダー名",
                           content: "共有フォルダーの名前を表示します。"
                       } ,{                      
                           type: "name",
                           title: "フォルダー パス",
                           content: "共有フォルダーのパスを表示します。"
                       } ,{                      
                           type: "name",
                           title: "メディア共有",
                           content: "共有フォルダーがメディア共有可能かどうかを示します。"
                       } ,{                      
                           type: "name",
                           title: "ボリューム名",
                           content: "共有ボリュームの名前を表示します。"
                       } ,{                      
                           type: "name",
                           title: "ステータス",
                           content: "電球インジケーターで共有フォルダーのステータスを表示します。"
                       } ,{                      
                           type: "name",
                           title: "変更",
                           content: "対応する共有フォルダーを修正または削除するオプションを表示します。"
                       } ,{                      
                           type: "name",
                           title: "参照",
                           content: "共有フォルダーを検索するにはこれをクリックします。"
                       } ,{                      
                           type: "name",
                           title: "ゲスト ネットワーク アクセスを許可",
                           content: "ゲスト ネットワーク上のクライアントが共有フォルダーにアクセスできるようにするには、これを選択します。"
                       } ,{                      
                           type: "name",
                           title: "認証を有効にする",
                           content: "ユーザーに有効なユーザー名とパスワードで共有フォルダーにアクセスさせるには、これを選択します。"
                       } ,{                      
                           type: "name",
                           title: "書き込みアクセスを有効にする",
                           content: "ユーザーがフォルダーの内容を変更できるようにするには、これを選択します。"
                       } ,{                      
                           type: "name",
                           title: "メディア共有を有効にする",
                           content: "メディア共有を有効にするには、これを選択します。"
                       } ,{                      
                           type: "name",
                           title: "更新",
                           content: "共有フォルダー　リストを更新するにはこれをクリックします。"
                       }]
},
       PRINT_SERVER :{ 
               TITLE:"印刷サーバー",
               CONTENT: [{
                           type: "name",
                           title: "印刷サーバー",
                           content: "印刷サーバー機能を有効にするにはオンにします。"
                       } ,{                      
                           type: "name",
                           title: "プリンター名",
                           content: "ルーターに接続されているプリンターの名前を表示します。"
                       }]
},
       TIME_MACHINE :{ 
               TITLE:"Time Machine",
               CONTENT: [{
                           type: "paragraph",
                           content: "Time Machineはお使いのMacコンピューターのすべてのファイルをモデムルーターに接続されたUSBデバイスにバックアップします。"
                       } ,{                      
                           type: "name",
                           title: "有効",
                           content: "Time Machineを有効にする場合はこちらのチェックボックスを選択してください。"
                       } ,{                      
                           type: "name",
                           title: "バックアップディスク",
                           content: "Time Machineバックアップの保存先を選択します。"
                       } ,{                      
                           type: "name",
                           title: "バックアップのサイズ制限",
                           content: "Time Machineバックアップに使用可能なディスク領域を割り当てます。 0の場合はスペースに制限がないことを意味します。"
                       } ,{                      
                           type: "name",
                           title: "保存",
                           content: "設定を保存するには[保存]をクリックします。"
                       }]
},
       OFFLINE_DOWNLOAD :{ 
               TITLE:"オフライン ダウンロード",
               CONTENT: [{
                           type: "paragraph",
                           content: "オフライン ダウンロードを有効にすると、コンピューターの電源を常に入れておかなくても、ルーターはファイルをダウンロードできます。"
                       } ,{                      
                           type: "name",
                           title: "ステータス",
                           content: "オフライン ダウンロード機能を有効にするにはこれをオンにします。"
                       } ,{                      
                           type: "name",
                           title: "フォルダー パス",
                           content: "ダウンロードしたファイルを保存またはキャッシュするディレクトリ パスを選択します。",
       children: [{                      
                           type: "note",
                           title: "注",
                           content: "ファイルのアップロード中またはダウンロード中にディレクトリ パスを変更したり、USB ストレージ デバイスをマウント解除したりしないでください。致命的なエラーが発生する場合があります。"
                       }]
} ,{                      
                           type: "name",
                           title: "スケジュール",
                           content: "ファイルをダウンロード/アップロードする時間帯を指定できるスケジュール機能を有効にするには、このチェック ボックスを選択します。"
                       } ,{                      
                           type: "name",
                           title: "タスク完了後もアップロードを続行",
                           content: "他の人へのダウンロードが完了したファイルのデータをアップロードし続けるには、このチェック ボックスを選択します。"
                       } ,{                      
                           type: "name",
                           title: "アクティブ ダウンロードの最大数",
                           content: "1 ～ 10 の値を入力して、アクティブ ダウンロードの最大数を設定します。既定値は　5 です。"
                       }]
},
       OFFLINE_DOWNLOAD_ITEMS :{ 
               TITLE:"Downloads",
               CONTENT: [{
                           type: "note",
                           title: "File",
                           content: "ダウンロード ファイルの名前とタイプを表示します。"
                       } ,{                      
                           type: "note",
                           title: "速度",
                           content: "現在のダウンロード (アップロード) 速度を表示します。"
                       } ,{                      
                           type: "note",
                           title: "完了",
                           content: "ダウンロードの進捗を表示します。"
                       } ,{                      
                           type: "note",
                           title: "残り時間",
                           content: "ダウンロードの残り時間を表示します。"
                       } ,{                      
                           type: "note",
                           title: "接続ピア",
                           content: "ダウンロードの接続ピア数を表示します。"
                       } ,{                      
                           type: "note",
                           title: "ステータス",
                           content: "ダウンロードの現在のステータス (ダウンロード中、待機中、シード中、一時停止、完了、またはエラー) を表示します。"
                       } ,{                      
                           type: "name",
                           title: "新しいダウンロードを追加するには",
       children: [{                      
                           type: "step",
       content: [ 
                "1. [追加] をクリックします。",
                "2. ダウンロードのソースを選択してください。PCからのtorrent、USBからのtorrentまたはURL。",
                "3. BTのtorrentの場所を選択してください。または、FTPのURL、http、aMule。",
                "4. [保存]をクリックします。",
                "5. aMuleの場合、aMuleサーバーIPアドレスとポートは詳細設定＞aMuleサーバーから確認してください。"]
}]
} ,{                      
                           type: "name",
                           title: "ダウンロードを削除するには",
                           content: "削除するダウンロードのチェック ボックスを選択して、表の上にある [削除] をクリックします。"
                       } ,{                      
                           type: "name",
                           title: "ダウンロードを一時停止するには",
                           content: "一時停止するダウンロードのチェック ボックスをクリックして、表の上にある [一時停止] をクリックします。"
                       } ,{                      
                           type: "name",
                           title: "ダウンロードを再開するには",
                           content: "再開するダウンロードのチェック ボックスをクリックして、表の上にある [再開] をクリックします。"
                       }]
},
       OFFLINE_DOWNLOAD_ADVANCED :{ 
               TITLE:"詳細設定",
               CONTENT: [{
                           type: "name",
                           title: "速度制限",
                           content: "インターネット接続の最大ダウンロード/アップロード速度を指定します。"
                       } ,{                      
                           type: "name",
                           title: "最大ダウンロード速度",
                           content: "1 ～ 100000 kB/秒の値を入力して、最大ダウンロード速度を設定します。既定値は　1024 です。"
                       } ,{                      
                           type: "name",
                           title: "最大アップロード速度",
                           content: "1 ～ 100000 kB/秒の値を入力して、最大アップロード速度を設定します。既定値は　512 です。"
                       } ,{                      
                           type: "name",
                           title: "接続数",
                           content: "最大接続数を指定します。"
                       } ,{                      
                           type: "name",
                           title: "グローバル接続最大数",
                           content: "1 ～ 200 の値を入力して、グローバル接続最大数を設定します。既定値は　100 です。"
                       } ,{                      
                           type: "name",
                           title: "トレントあたりの接続ピア最大数",
                           content: "1 ～ 100 の値を入力して、トレントあたりの接続ピア最大数を設定します。既定値は　50 です。"
                       } ,{                      
                           type: "name",
                           title: "DHT ネットワークを有効にする",
                           content: "ダウンロード速度を向上できるようにピアを見つけるための効率性を改善するには、この機能を有効にします。"
                       } ,{                      
                           type: "name",
                           title: "ピア交換を有効にする",
                           content: "ダウンロード速度を向上できるようにピア グループ間の通信効率を改善するには、この機能を有効にします。"
                       } ,{                      
                           type: "name",
                           title: "BitTorrent プロトコル暗号化を有効にする",
                           content: "データ転送のプロセスでプライバシーと機密性を強化するには、この機能を有効にします。"
                       } ,{                      
                           type: "name",
                           title: "aMule サーバー",
                           content: "aMule サーバーの IP アドレスとポートを入力します。aMule ダウンロードは、ルーターがサーバーに接続されているときのみ機能します。"
                       }]
},
       PARENTAL_CONTROL :{ 
               TITLE:"保護者による制限",
               CONTENT: [{
                           type: "paragraph",
                           content: "保護者による制限で、不適切で、過激で、悪意のあるウェブサイトをブロックし、特定の時間のアクセスを制限できます (例えば、宿題の時間には Facebook や YouTube を禁止)。"
                       }]
},
       PARENTAL_CONTROL_DEVICES :{ 
               TITLE:"保護者による制限対象のデバイス",
               CONTENT: [{
                           type: "paragraph",
                           content: "この表は、保護者による制限で現在制限されているデバイスの情報と設定を示します。"
                       } ,{                      
                           type: "step",
                           title: "新しいクライアント デバイスを制限するには",
       content: [ 
                "1.[保護者による制限] をオンにします。",
                "2.[追加] をクリックします。",
                "3.[スキャン] をクリックして、アクセス デバイス リストから、現在接続されているデバイスを選択するか、デバイス名と MAC アドレスを手動で入力して、接続されていないデバイスを追加します。",
                "4.有効時間のアイコンをクリックして、制限を適用する時間範囲を指定します。",
                "5.[説明] フィールドに簡単な説明を入力します。このフィールドはオプションです。",
                "6. [このエントリを有効にする] を選択します。",
                "7.[保存] をクリックします。"]
} ,{                      
                           type: "note",
                           title: "注",
                           content: "このエントリを無効にするには、電球アイコンをクリックします。"
                       }]
},
       PARENTAL_CONTROL_RESTRICTION :{ 
               TITLE:"コンテンツ制限",
               CONTENT: [{
                           type: "paragraph",
                           content: "コンテンツ制限により、キーワードとドメイン名を使用して、特定の Web サイトへのアクセスを制限することができます。保護者による制限で制御されるクライアント デバイスは、選択した制限ポリシーに応じて、これらの Web サイトへのアクセスが可能または不可能になります。"
                       } ,{                      
                           type: "step",
                           title: "アクセスするコンテンツを指定するには",
       content: [ 
                "1.[コンテンツ制限] をオンにします。",
                "2.要件に応じて制限ポリシーを選択します。",
                "A. 制御対象デバイスが、特定の Web サイト以外のすべてのサイトにアクセスできるようにする場合は、[ブラックリスト] を選択します。",
                "B. 制御対象デバイスが特定の Web サイトにのみアクセスできるようにする場合は、[ホワイトリスト] を選択します。",
                "3.[新しいキーワードの追加] をクリックして、Web アドレス キーワード (Wikipedia など) またはドメイン名をブラックリストまたはホワイトリストに追加します。",
                "4. [保存]をクリックします。"]
}]
},
       QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS (サービスの品質) は、状況に応じてインターネット トラフィックの優先度付けを行うのに役立ちます。QoS ルール リスト内のデバイス、物理ポート、またはアプリケーションの優先度を指定できます。"
                       } ,{                      
                           type: "note",
                           id: "qos-boost",
                           title: "注",
                           content: "NAT ブーストが有効になっている場合、QoS は無効にする必要があります。"
                       } ,{                      
                           type: "name",
                           title: "アップロード帯域幅",
                           content: "ISP によって提供された最大アップロード帯域幅を入力します。"
                       } ,{                      
                           type: "name",
                           title: "ダウンロード帯域幅",
                           content: "ISP によって提供された最大ダウンロード帯域幅を入力します。"
                       }]
},
       QOS_ADV :{ 
               TITLE:"詳細設定",
               CONTENT: [{
                           type: "name",
                           title: "高/中/低優先度",
                           content: "高/中/低優先度トラフィックの割合を指定します。",
       children: [{                      
                           type: "note",
                           title: "注",
                           content: "すべての優先度の最大量 (割合) は 100% です。"
                       }]
}]
},
       QOS_RULE :{ 
               TITLE:"QoS ルール リスト",
               CONTENT: [{
                           type: "paragraph",
                           content: "ここでは、インターネット トラフィックの優先度を決める詳細な QoS ルールを追加できます。"
                       } ,{                      
                           type: "step",
                           title: "QoS ルールをセットアップするには",
       content: [ 
                "1. [追加] をクリックします。",
                "2.QoS ルールを追加する優先度タイプを選択します。",
                "デバイス - [スキャン] をクリックして目的のデバイスを選択するか、デバイス名とその MAC アドレスを手動で入力します。",
                "アプリケーション - 目的のアプリケーションを選択するか、名前、プロトコル、宛先ポート (1-65535) を設定してアプリケーションをカスタマイズします。単一ポート、複数のポート、またはポート範囲をコンマで区切って入力できます (例: 21,36-105,111)。",
                "物理ポート - 目的のポートを選択します。",
                "「保存」をクリック"]
} ,{                      
                           type: "note",
                           title: "注",
                           content: "異なる優先度リスト間でルールをドラッグして優先度を変更できます。"
                       }]
},
       QOS_DATABASE :{ 
               TITLE:"データベース アップグレード",
               CONTENT: [{
                           type: "paragraph",
                           content: "最新のデータベース バージョンは www.tp-link.com でリリースされます。ルーターのデータベースをダウンロードして更新し、サポートされるアプリケーションを増やすことができます。"
                       } ,{                      
                           type: "name",
                           title: "新しいデータベース ファイル",
                           content: "[参照] をクリックして、最新のデータベース ファイルを見つけます。ファイルを選択して、[アップグレード] をクリックし、データベースを最新のバージョンにアップグレードします。"
                       }]
},
       SECURITY_FIREWALL :{ 
               TITLE:"ファイアウォール",
               CONTENT: [{
                           type: "name",
                           title: "SPI ファイアウォール",
                           content: "SPI（ステートフルパケットインスペクション）ファイアウォールは、サイバー攻撃を防ぎ、プロトコルに基づいてルータを通過するトラフィックを検証します。 既定では、この機能は有効になっています。"
                       }]
},
       SECURITY_DOS :{ 
               TITLE:"DoS 保護",
               CONTENT: [{
                           type: "name",
                           title: "DoS 保護",
                           content: "DoS (サービス拒否) 保護は、ネットワークがサービス リクエストで氾濫する DoS 攻撃から LAN を防御します。要件に応じて、次の 3 種類の攻撃をフィルター処理できます。各フィルター処理には 4 つのレベルがあります。",
       children: [{                      
                           type: "name",
                           title: "オフ",
                           content: "保護なし。"
                       } ,{                      
                           type: "name",
                           title: "低",
                           content: "低レベルの保護で、ルーターのパフォーマンスへの影響は低いです。"
                       } ,{                      
                           type: "name",
                           title: "中",
                           content: "中レベルの保護で、ルーターのパフォーマンスへの影響はある程度感じられます。"
                       } ,{                      
                           type: "name",
                           title: "高",
                           content: "高レベルの保護で、ルーターのパフォーマンスへの影響は顕著です。"
                       }]
} ,{                      
                           type: "name",
                           title: "ICMP-FLOOD 攻撃フィルタリング",
                           content: "ICMP (インターネット制御メッセージ プロトコル) フラッド攻撃を防ぐには、これを有効にします。"
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD 攻撃フィルタリング",
                           content: "UDP (ユーザー データグラム プロトコル) フラッド攻撃を防ぐには、これを有効にします。"
                       } ,{                      
                           type: "name",
                           title: "TCP-SYN-FLOOD 攻撃フィルタリング",
                           content: "TCP-SYN (伝送制御プロトコル-同期) フラッド攻撃を防ぐには、これを有効にします。"
                       } ,{                      
                           type: "name",
                           title: "WAN ポートからの Ping パケットを無視",
                           content: "WAN ポートからの Ping パケットを無視するには、これを有効にします。"
                       } ,{                      
                           type: "name",
                           title: "LAN ポートからの Ping パケットを禁止",
                           content: "LAN ポートからの Ping パケットを禁止するには、これを有効にします。"
                       }]
},
       SECURITY_LIST :{ 
               TITLE:"ブロックされた DoS ホスト リスト",
               CONTENT: [{
                           type: "paragraph",
                           content: "この表は、ブロックされた DoS ホストの IP アドレスと MAC アドレスを示します。"
                       }]
},
       ACCESS_CONTROL :{ 
               TITLE:"アクセス コントロール",
               CONTENT: [{
                           type: "paragraph",
                           content: "アクセス コントロールは、特定のクライアント デバイスによるネットワークへのアクセスを許可またはブロックするために使用されます。デバイスは、ブロックされると、他のデバイスと通信したり、インターネットに接続したりできなくなります。"
                       } ,{                      
                           type: "step",
                           title: "アクセスをコントロールするには",
       content: [ 
                "1.[アクセス コントロール] をオンにして有効にします。",
                "2.ゲスト ネットワークに接続されているデバイスのアクセスもコントロールする場合は、[ゲスト デバイス コントロール] をオンにします。",
                "3.要件に応じてアクセス モードを選択して、[保存] をクリックします。",
                "A. 以下のリストのデバイスからのアクセスをブロックする場合は、[ブラックリスト] を選択します。",
                "B. 以下のリストのデバイスからのアクセスのみを許可する場合は、[ホワイトリスト] を選択します。",
                "4.[ブラックリスト/ホワイトリストのデバイス] セクションで、[追加] をクリックします。デバイスのデバイス名と MAC アドレスを入力します。[保存] をクリックします。"]
} ,{                      
                           type: "note",
                           title: "注",
                           content: "このエントリを無効にするには、電球アイコンをクリックします。"
                       }]
},
       ACCESS_DEVICE :{ 
               TITLE:"オンライン デバイス",
               CONTENT: [{
                           type: "paragraph",
                           content: "この表は、すべての接続デバイスの情報を示します ([ゲスト デバイス コントロール] が有効になっている場合は、ゲスト ネットワークに接続されているデバイスを含む)。"
                       }]
},
       IPMAC_BIND_SETTING :{ 
               TITLE:"IP & MAC バインディング",
               CONTENT: [{
                           type: "paragraph",
                           content: "IP & MAC バインディング (ARP バインディングとしても呼ばれる) は、デバイスの IP アドレスと MAC アドレスをバインドすることで LAN 内の特定のデバイスのアクセスを制御するのに役立ちます。また、IP & MAC バインディングは、その他のデバイスが特定の IP アドレスを使用するのを防ぎます。"
                       } ,{                      
                           type: "step",
                           title: "デバイスで IP & MAC バインドをセットアップするには",
       content: [ 
                "1. [追加] をクリックします。",
                "2.デバイスの MAC アドレスを入力します。",
                "3.上記の MAC アドレスにバインドする IP アドレスを入力します。",
                "4.[このエントリを有効にする] を選択します。",
                "5.[保存] をクリックします。"]
} ,{                      
                           type: "note",
                           title: "注",
       content: [ 
                "1. 同じ IP アドレスを複数の MAC アドレスにバインドすることはできません。",
                "2. このエントリを無効にするには、電球アイコンをクリックします。"]
}]
},
       IPMAC_BIND_ARP :{ 
               TITLE:"ARP リスト",
               CONTENT: [{
                           type: "paragraph",
                           content: "この表は、現在接続されているデバイスの MAC アドレスと IP アドレスを示します。"
                       }]
},
       IPV6 :{ 
               TITLE:"インターネット",
               CONTENT: [{
                           type: "name",
                           title: "IPv6",
                           content: "IPv6 (インターネット プロトコル バージョン 6) は最新バージョンの IP (インターネット プロトコル) で、IPv4 (インターネット プロトコル バージョン 4) のアドレス枯渇の問題に対処します。"
                       } ,{                      
                           type: "title",
                            title: "インターネット接続タイプ: 動的 IP"
                       } ,{                      
                           type: "name",
                           title: "動的 IP",
                           content: "ISP が動的 IPv6 アドレス割り当てを使用している場合は、これを選択します。"
                       } ,{                      
                           type: "name",
                           title: "IPv6 アドレス/プライマリ DNS/セカンダリ DNS",
                           content: "これらのパラメーターは、ISP から DHCPv6 サーバーによって自動的に割り当てられます。"
                       } ,{                      
                           type: "name",
                           title: "更新",
                           content: "ISP の DHCPv6 サーバーから新しい IPv6 パラメーターを取得するには、これをクリックします。"
                       } ,{                      
                           type: "name",
                           title: "解放",
                           content: "ISP の DHCPv6 サーバーによって割り当てられたすべての IPv6 アドレスを解放するには、これをクリックします。"
                       } ,{                      
                           type: "name",
                           title: "IPv6 アドレスの取得",
                           content: "ISP に従って、非一時 IPv6 アドレスを取得するには DHCPv6、ルーター広告パケット から生成された IPv6 アドレスを取得するには SLAAC を選択します。"
                       } ,{                      
                           type: "name",
                           title: "プレフィックス委任",
                           content: "ISP から DHCPv6 サーバーによってプレフィックス委任を取得するには [有効ににする] を選択し、アドレス プレフィックスを手動で指定するには [無効ににする] を選択します。LAN 内のクライアントは、このプレフィックスを持つ IPv6 アドレスを生成します。"
                       } ,{                      
                           type: "name",
                           title: "DNS アドレス",
                           content: "[ISP から動的に取得] または [次の DNS アドレスを使用] を選択します。[次の DNS アドレスを使用] を選択した場合は、ISP によって提供された DNS アドレスを手動で入力してください。"
                       } ,{                      
                           type: "title",
                            title: "インターネット接続タイプ: 静的 IP"
                       } ,{                      
                           type: "name",
                           title: "静的 IP",
                           content: "ISP が静的 IPv6 アドレス割り当てを使用している場合は、これを選択します。"
                       } ,{                      
                           type: "name",
                           title: "IPv6 アドレス/デフォルト ゲートウェイ/プライマリ DNS/セカンダリ DNS",
                           content: "ISP によって提供されたとおりにパラメーターを入力します。"
                       } ,{                      
                           type: "name",
                           title: "MTU サイズ",
                           content: "ほとんどのイーサネット ネットワークの既定および標準の MTU (最大転送単位) サイズは 1500 バイトです。ISP によって要求されない限り、既定の MTU サイズの変更は推奨されません。"
                       } ,{                      
                           type: "title",
                            title: "インターネット接続タイプ: 6to4 トンネル"
                       } ,{                      
                           type: "name",
                           title: "6to4 トンネル",
                           content: "ISP がアドレスの割り当てに 6to4 展開を使用している場合は、このタイプを選択します。"
                       } ,{                      
                           type: "name",
                           title: "IPv4 アドレス/IPv4 サブネット マスク/IPv4 デフォルト ゲートウェイ/トンネル アドレス",
                           content: "これらのパラメーターは、[接続] をクリックした後、WAN ポートの IPv4 情報によって動的に生成されます。"
                       } ,{                      
                           type: "name",
                           title: "次の DNS サーバーを使用",
                           content: "ISP によって提供されたプライマリ DNS とセカンダリ DNS を手動で入力するには、これを選択します。"
                       } ,{                      
                           type: "name",
                           title: "接続",
                           content: "インターネットに接続するには、これをクリックします。"
                       } ,{                      
                           type: "name",
                           title: "切断",
                           content: "インターネットから切断するには、これをクリックします。"
                       } ,{                      
                           type: "title",
                            title: "インターネット接続タイプ: PPPoE"
                       } ,{                      
                           type: "name",
                           title: "PPPoE",
                           content: "ISP が PPPoEv6 を使用していて、ユーザー名とパスワードを提供している場合はこれを選択します。"
                       } ,{                      
                           type: "name",
                           title: "ユーザー名/パスワード",
                           content: "ISP によって提供されたとおりにパラメーターを入力します。"
                       } ,{                      
                           type: "name",
                           title: "IPv6 アドレス",
                           content: "このアドレスは、ユーザー名とパスワードを入力して [接続] をクリックした後、ISP から DHCPv6 サーバーによって自動で割り当てられます。"
                       } ,{                      
                           type: "name",
                           title: "IPv6 アドレスの取得",
                           content: "ISP に従って、非一時 IPv6 アドレスを取得するには DHCPv6、ルーター広告パケットから生成された IPv6 アドレスを取得するには SLAAC、IPv6 アドレスを手動で入力するには [ISP の指定] を選択します。"
                       } ,{                      
                           type: "name",
                           title: "プレフィックス委任",
                           content: "ISP から DHCPv6 サーバーによってプレフィックス委任を取得するには [有効ににする] を選択し、アドレス プレフィックスを手動で指定するには [無効ににする] を選択します。LAN 内のクライアントは、このプレフィックスを持つ IPv6 アドレスを生成します。"
                       } ,{                      
                           type: "name",
                           title: "DNS アドレス",
                           content: "[ISP から動的に取得] または [次の DNS アドレスを使用] を行うには、これを選択します。[次の DNS アドレスを使用] を選択した場合は、ISP によって提供された DNS アドレスを手動で入力してください。"
                       } ,{                      
                           type: "name",
                           title: "接続",
                           content: "インターネットに接続するには、これをクリックします。"
                       } ,{                      
                           type: "name",
                           title: "切断",
                           content: "インターネットから切断するには、これをクリックします。"
                       } ,{                      
                           type: "title",
                            title: "インターネット接続タイプ:パススルー (ブリッジ)"
                       } ,{                      
                           type: "paragraph",
                           content: "ISP がパススルー (ブリッジ) ネットワーク展開を使用している場合は、このタイプを選択します。このタイプの接続に必要な設定はありません。"
                       }]
},
       IPV6_LAN :{ 
               TITLE:"LAN",
               CONTENT: [{
                           type: "paragraph",
                           content: "インターネット接続タイプのパススルー (ブリッジ) を除くその他の 6 タイプのインターネット接続は、IPv6 設定が必要です。"
                       } ,{                      
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
                       } ,{                      
                           type: "name",
                           title: "解放時間",
                           content: "割り当てられた IP アドレスの有効な時間です。既定の 86400 秒をそのまま使うか、ISP による指示がある場合はこれを変更します。"
                       } ,{                      
                           type: "name",
                           title: "アドレス",
                           content: "ISP から DHCPv6 サーバーによって自動で割り当てられた IP アドレスです。"
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+ステートレス DHCP",
       children: [{                      
                           type: "name",
                           title: "アドレス プレフィックス",
                           content: "ISP によって提供されたアドレス プレフィックスを入力します。"
                       } ,{                      
                           type: "name",
                           title: "アドレス",
                           content: "DSP によって自動で割り当てられた IP アドレスです。"
                       }]
} ,{                      
                           type: "name",
                           connector: " ",
                           title: "SLAAC+RDNSS",
       children: [{                      
                           type: "name",
                           title: "アドレス プレフィックス",
                           content: "ISP によって提供されたアドレス プレフィックスを入力します。"
                       } ,{                      
                           type: "name",
                           title: "アドレス",
                           content: "DSP によって自動で割り当てられた IP アドレスです。"
                       }]
}]
}]
},
       IPV6_MAC_CLONE :{ 
               TITLE:"MAC クローン",
               CONTENT: [{
                           type: "paragraph",
                           content: "必要に応じて適切な MAC クローンを選択してください。"
                       } ,{                      
                           type: "name",
                           title: "MAC アドレスをクローンしない",
                           content: "割り当てられた IP アドレスを ISP が MAC アドレスにバインドしない場合は、ルーターの既定の MAC アドレスを変更しないでください。"
                       } ,{                      
                           type: "name",
                           title: "現在のコンピューターの MAC アドレスをクローン",
                           content: "割り当てられた IP アドレスを ISP がコンピューターの MAC アドレスにバインドする場合は、接続されているコンピューターの現在の MAC アドレスをコピーするためにこれを選択します。"
                       } ,{                      
                           type: "name",
                           title: "カスタム MAC アドレスを使用",
                           content: "割り当てられた IP アドレスを ISP が特定の MAC アドレスにバインドする場合は、MAC アドレスを手動で入力します。"
                       }]
},
       TIME_SETTING :{ 
               TITLE:"時刻設定",
               CONTENT: [{
                           type: "paragraph",
                           content: "時刻設定では、ルーターのシステム時刻を設定できます。変更すると、システム時刻は時刻ベースの機能と保護者による制限などの設定に適用されます。"
                       } ,{                      
                           type: "note",
                           title: "注",
                           content: "設定前に、24 時間機能をオンにして有効にできます。これは、システム時刻ベースの機能と設定に適用されます。"
                       } ,{                      
                           type: "title",
                            title: "システム時間"
                       } ,{                      
                           type: "step",
                           title: "インターネットから時刻を取得するには",
       content: [ 
                "既定では選択されている [インターネットから取得] では、インターネットからシステム時刻を取得できます。",
                "1.[インターネットから取得] を選択します。",
                "2.ドロップダウン メニューから地域のタイム ゾーンを選択します。",
                "3.[NTP サーバー I] フィールドに、目的の NTP サーバーの IP アドレスまたはドメイン名を入力します。",
                "4.[NTP サーバー II] フィールドに、2 つ目の NTP サーバーの IP アドレスまたはドメイン名を入力します。(オプション)",
                "5.[取得] をクリックします。",
                "6. [保存]をクリックします"]
} ,{                      
                           type: "step",
                           title: "PC から時刻を取得するには",
       content: [ 
                "この機能では、PC からシステム時刻を取得できます。設定前に、PC 時刻を確認してください。",
                "[PC から取得] を選択して [保存] をクリックします。"]
} ,{                      
                           type: "step",
                           title: "手動で時刻を設定するには",
       content: [ 
                "デバイスがインターネットまたは PC から時刻を自動取得できない場合は、システム時刻を手動で設定できます。",
                "1.[手動] を選択します。",
                "2.現在の日時を入力します。",
                "「保存」をクリック"]
}]
},
       TIME_SETTING_DAYLIGHT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "夏時間",
                           content: "この機能では、システム時刻を自動で夏時間と同期できます。"
                       } ,{                      
                           type: "step",
                           title: "夏時間を設定するには",
       content: [ 
                "1.[夏時間を有効にする] を選択します。",
                "2.ローカル タイム ゾーンでの夏時間の期間を指定します。",
                "「保存」をクリック"]
}]
},
       DIGNOSTIC :{ 
               TITLE:"診断",
               CONTENT: [{
                           type: "paragraph",
                           content: "ルーターには、ネットワーク問題のトラブルシューティングを行うのに役立つ Ping および Traceroute ツールが用意されています。"
                       } ,{                      
                           type: "title",
                            title: "Ping と Traceroute"
                       } ,{                      
                           type: "paragraph",
                           content: "Ping ツールは、パケットをターゲット IP アドレスまたはドメイン名に送信し、送受信されたパケット数やラウンドトリップ時間などの結果をログに記録します。"
                       } ,{                      
                           type: "paragraph",
                           content: "Traceroute ツールは、パケットをターゲット IP アドレスまたはドメイン名に送信し、ホップ数と宛先到達時間を表示します。"
                       } ,{                      
                           type: "paragraph",
                           content: "IP アドレスまたは tp-link.com や yahoo.com　などのドメイン名でローカル デバイスを ping および traceroute できます。"
                       } ,{                      
                           type: "step",
                           title: "Ping を使用して診断するには",
       content: [ 
                "1.診断ツールとして Ping を選択します。",
                "2.ターゲット IP アドレスまたはドメイン名を入力します。",
                "3.矢印アイコンをクリックして [詳細設定] メニューを開き、Ping 数と Ping パケット サイズを指定します。(オプション)",
                "4.[開始] をクリックします。"]
} ,{                      
                           type: "step",
                           title: "Traceroute を使用して診断するには",
       content: [ 
                "1.診断ツールとして Traceroute を選択します。",
                "2.ターゲット IP アドレスまたはドメイン名を入力します。",
                "3.矢印アイコンをクリックして [詳細設定] メニューを開き、[Traceroute 最大 TTL (Time to Live)] フィールドにホップ数　(到達までの) を指定します。既定値は 20 です。(オプション)",
                "4.[開始] をクリックします。"]
}]
},
       PORT_MIRROR :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                            title: "ポート ミラーリング"
                       } ,{                      
                           type: "paragraph",
                           content: "ポート ミラーリングとは、ミラーリング元のポートからのパケットのコピーをミラーリング ポートに転送するプロセスのことです。通常、ミラーリング ポートはデータ診断デバイスに接続されています。これは、ネットワークをモニタリングおよびトラブルシューティングするために、ミラーリングされたパケットを解析するのに使用されます。"
                       } ,{                      
                           type: "step",
                           title: "指定されたポートにパケットのコピーを転送するには",
       content: [ 
                "1.[ポート ミラーリング] を有効にします。",
                "2.ミラーリング元のポートとして目的のポートを選択します。",
                "3.ミラーリング ポートとして目的のポートを選択します。",
                "4. [保存]をクリックします。"]
} ,{                      
                           type: "note",
                           title: "注",
                           content: "ポートは、同時にミラーリング元のポートとミラーリング ポートとして設定することはできません。"
                       }]
},
       FIRMWARE :{ 
               TITLE:"ファームウェア アップグレード",
               CONTENT: [{
                           type: "paragraph",
                           content: "ファームウェア アップグレードでは、ルーターのファームウェアを新機能またはバグ修正で更新します。最適なパフォーマンスを得るために、ルーターを最新のファームウェアでアップグレードすることを推奨します。"
                       } ,{                      
                           type: "step",
                           title: "以下の点に注意すると、アップグレードの失敗を避けることができます。",
       content: [ 
                "アップグレードの前に",
                "1. ルーターとコンピューターの接続が安定しているかをご確認ください。その際は無線ではなく有線での接続をお勧めいたします。",
                "2.ルーターにUSB機器が接続されていないことをご確認ください。",
                "3. Configuration Fileのバックアップを必ず保存してください。",
                "アップグレードの最中",
                "アップグレードが完了するまでルーターの電源は入れたままにしてください。"]
}]
},
       FIRMWARE_UPGRADE_ONLINE :{ 
               TITLE:"ファームウェアをオンラインでアップグレードするには",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "求められた場合は「アップグレード」と「確認」をクリックしてください。その後ルーターは最新のファームウェアを自動的にダウンロード・アップグレードします。また、「アップグレードの確認」をクリックすることで最新のファームウェアバージョンの確認ができます。"]
}]
},
       FIRMWARE_UPGRADE :{ 
               TITLE:"ファームウェアを手動でアップグレードするには",
               CONTENT: [{
                           type: "step",
       content: [ 
                "1.ページ下部の [サポート] をクリックして、コンピューターに最新のファームウェアをダウンロードします。ダウンロードするファームウェア ファイルが、ページに表示されているルーターのハードウェア バージョンと一致することを確認してください。",
                "2.「参照」をクリックしてダウンロードしたファームウェアファイルを選択します。",
                "3. 「アップグレード」をクリックします。"]
} ,{                      
                           type: "paragraph",
       content: [ 
                "ファームウェアのアップグレードには数分かかります。アップグレードが完了したらルーターは自動的に再起動します。"]
}]
},
       BACKUP :{ 
               TITLE:"バックアップおよび復元",
               CONTENT: [{
                           type: "paragraph",
                           content: "バックアップおよび復元機能では、リカバリ用にルーターの現在の設定をバックアップするか、ルーターを既定の設定に復元できます。"
                       } ,{                      
                           type: "note",
                           title: "注",
                           content: "バックアップまたは復元中にルーターの電源を切らないでください。"
                       } ,{                      
                           type: "title",
                           title: "バックアップ",
                           content: "ルーターを以前の状態に復元するためにリカバリが必要になる場合に備えて、現在の設定をバックアップしておくことを強く推奨します。"
                       } ,{                      
                           type: "step",
                           title: "現在の設定の保存の仕方",
       content: [ 
                "1.[バックアップ] をクリックします。",
                "2.ルーターが現在の設定をバックアップするまで待ちます。"]
}]
},
       RESTORE :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "復元",
                           content: "バックアップ ファイルからルーターを以前のステータスに復元できます。"
                       } ,{                      
                           type: "step",
                           title: "バックアップから復元するには",
       content: [ 
                "1.[参照] をクリックします。",
                "2.バックアップ ファイルを見つけて選択します。",
                "3.[復元]　をクリックします。"]
}]
},
       FACTORY :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "既定の復元",
       content: [ 
                "既定の復元をするとすべての設定と変更が削除され、工場出荷時の状態へ戻ります。例えば、すべてのワイヤレス設定、保護者の制御やネットワークが削除されます。",
                "既定の設定に復元後、管理画面にアクセスする際の新しいパスワードを作成する必要があります。"]
}]
},
       REBOOT :{ 
               TITLE:"再起動スケジュール",
               CONTENT: [{
                           type: "paragraph",
                           content: "再起動スケジュール機能はキャッシュを消去して、ルーターのパフォーマンスを向上させます。 ルータを手動で再起動するか、定期的に再起動するように設定することができます。"
                       } ,{                      
                           type: "step",
                           title: "手動で再起動するには",
       content: [ 
                "[再起動] をクリックして、ルーターが再起動するまで数分待ちます。"]
} ,{                      
                           type: "step",
                           title: "再起動時間を指定",
       content: [ 
                "1. 再起動スケジュール機能を有効にする",
                "2. 再起動時間と頻度のフィールドにパラメータを指定して、ルータの再起動の時間と頻度を設定します。",
                "「保存」をクリック"]
}]
},
       ADMIN_ACCOUNT :{ 
               TITLE:"管理",
               CONTENT: [{
                           type: "paragraph",
                           content: "管理では、接続されたクライアントのログインパスワードとアクセス許可をルーターに管理できます。"
                       } ,{                      
                           type: "name",
                           title: "アカウント管理",
                           content: "この機能では、パスワードを変更できます。",
       children: [{                      
                           type: "step",
                           title: "パスワードを変更するには",
       content: [ 
                "1. 現在のパスワードを入力してください。",
                "2. 新たなパスワードを入力してください。",
                "3. 新たなパスワードを確認のため再度入力してください。",
                "4. [保存]をクリックします。"]
}]
}]
},
       ADMIN_RECOVERY :{ 
               TITLE:"パスワードの復元",
               CONTENT: [{
                           type: "name",
                           title: "既定パスワードの復元",
                           content: "既定のパスワードの復元を使用すると、ルータを出荷時の既定設定に戻すことなく、既定のログインパスワードを復元できます。",
       children: [{                      
                           type: "step",
                           title: "パスワードを変更するには",
       content: [ 
                "1. 既定のパスワードの修復機能を有効にしてください。",
                "2. 送信者の欄には、ログイン情報を修復するための確認コードを送信に使用可能なメールアドレスを入力してください。",
                "3. 送り先の欄には確認コードの受信に使用される有効なメールアドレスを入力してください。",
                "4. 送信メールのSMTPサーバーを入力してください。(送信者)",
                "5. メールの送信者の欄が暗号化されている場合、「認証を有効にする」を選択してユーザー名(メールアドレス)とパスワードを入力する必要があります。",
                "6. [保存]をクリックします"]
}]
}]
},
       ADMIN_LOCAL :{ 
               TITLE:"ローカル管理",
               CONTENT: [{
                           type: "paragraph",
                           content: "この機能を利用するとローカルデバイスからルーターの管理が可能となります。"
                       } ,{                      
                           type: "name",
                           id: "local_management_https",
                           title: "HTTPS経由でのローカル管理",
                           content: "HTTPS経由でルーターにアクセスする場合は「HTTPS経由でのローカル管理」を有効にし、HTTP経由でのみルーターにアクセスする場合は無効にしておきます。"
                       } ,{                      
                           type: "name",
                           title: "すべての LAN 接続デバイスに対してアクセスを許可",
                           content: "すべての LAN 接続デバイスのローカル管理を有効にするにはオンにします。特定のデバイスの管理を有効にするにはオフにします。"
                       } ,{                      
                           type: "name",
                           title: "MAC アドレス",
                           content: "制限されているアクセス デバイスの MAC アドレスを表示します。"
                       } ,{                      
                           type: "name",
                           title: "説明",
                           content: "制限されているアクセス デバイスの説明を表示します。"
                       } ,{                      
                           type: "name",
                           title: "ステータス",
                           content: "制限されているアクセス デバイス (有効または無効) の現在のステータスを表示します。"
                       } ,{                      
                           type: "name",
                           title: "変更",
                           content: "リストの対応するデバイスを修正または削除するオプションを表示します。"
                       } ,{                      
                           type: "step",
                           title: "クライアント デバイスをリストに追加するには",
       content: [ 
                "1. [追加] をクリックします。",
                "2.[既存のデバイスの表示] をクリックして既存のデバイスを選択するか、デバイスの MAC アドレスを [MAC アドレス] フィールドに入力します。",
                "3.デバイスの説明を入力します。",
                "4.[このエントリを有効にする] を選択します。",
                "5.[OK] をクリックします。"]
} ,{                      
                           type: "step",
                           title: "リストのデバイスを修正または削除するには",
                           content: "表で、修正または削除するデバイスに対応する編集アイコンまたはゴミ箱アイコンをクリックします。"
                       } ,{                      
                           type: "step",
                           title: "複数のデバイスを削除するには",
                           content: "削除するすべてのデバイスを選択して、[削除] をクリックします。"
                       }]
},
       ADMIN_REMOTE_WITHOUT_HTTPS :{ 
               TITLE:"リモート管理",
               CONTENT: [{
                           type: "name",
                           title: "リモート管理",
                           content: "リモート管理機能では、リモート デバイスがルーターにアクセスして管理を行うことがでます。",
       children: [{                      
                           type: "step",
                           title: "すべてのリモート デバイスに対してルーターの管理を禁止するには",
                           content: "[リモート管理を無効にする] を選択して [保存] をクリックします。"
                       } ,{                      
                           type: "step",
                           title: "すべてのリモート デバイスに対してルーターの管理を許可するには",
       content: [ 
                "1. 「すべてのデバイスのリモートマネージメントを有効にする」を選択してください。",
                "2. リモートデバイスがルータへのアクセスに使用するWebマネージメントポート（1024から65535または80）を入力します。",
                "「保存」をクリック"]
} ,{                      
                           type: "step",
                           title: "特定のリモート デバイスに対してルーターの管理を許可するには",
       content: [ 
                "1.「特定のデバイスのリモートマネージメントを有効にする」を選択してください。",
                "2. リモートデバイスがルータへのアクセスに使用するWebマネージメントポート（1024から65535または80）を入力します。",
                "3. ルーターを管理するリモートデバイスのリモートマネージメントIPアドレスを入力してください。",
                "4. [保存]をクリックします。"]
}]
}]
},
       ADMIN_REMOTE :{ 
               TITLE:"リモート管理",
               CONTENT: [{
                           type: "paragraph",
                           content: "リモート管理機能では、インターネットからリモートでルーターにアクセスして設定することができます。"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step_title",
                           content: "リモート管理の設定方法"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step1",
                           content: "1. チェックを入れてリモート管理機能を有効にします。"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step2",
                           content: "2. HTTPSポートとHTTPポートを既定(デフォルト)のままにしておきます。"
                       } ,{                      
                           type: "paragraph",
                           id: "admin_remote_step3",
                           content: "3. どのリモートデバイスからルーターへのリモートアクセスを許可するかを選択します。",
       children: [{                      
                           type: "name",
                           title: "すべてのデバイス",
                           content: "すべてのリモートデバイスがルーターにアクセスできます。"
                       } ,{                      
                           type: "name",
                           title: "特定のデバイス",
                           content: "ルーターにアクセスするデバイスのIPアドレスを入力します。"
                       }]
} ,{                      
                           type: "paragraph",
                           id: "admin_remote_step4",
                           content: "4. [保存]をクリックします。"
                       } ,{                      
                           type: "paragraph",
                           content: "以上で、管理用ウェブアドレスの下に表示されているアドレスを使用して、ルータをリモート管理できます。"
                       } ,{                      
                           type: "note",
                           title: "注",
                           content: "上記のアドレスにリモートアクセスをしている際に警告が表示された場合は、「信頼する」等のボタンをクリックしてください。"
                       }]
},
       LED_CONTROL_SETTINGS :{ 
               TITLE:"LED コントロール",
               CONTENT: [{
                           type: "paragraph",
                           content: "夜モードを有効にすると、LED はルーターのパフォーマンスを低下させずに毎日特定の時間帯にオフになります。"
                       } ,{                      
                           type: "step",
                           title: "夜モードを有効にするには",
       content: [ 
                "1.[夜モードを有効にする] を選択します。",
                "2.LED をオフにする時間帯を指定します。",
                "「保存」をクリック"]
}]
},
       SYSTEM_LOG :{ 
               TITLE:"システム ログ",
               CONTENT: [{
                           type: "paragraph",
                           content: "[システム ログ] は、ルーターの最新のアクティビティを表示します。この表は、システム ログのタイプ、レベル、ログ内容で構成され、フィルターをかけて表示できます。システム ログをローカル コンピューターに保存したり、メールで送信したりすることもできます。"
                       } ,{                      
                           type: "step",
                           title: "システム ログをローカル コンピューターに保存するには",
       content: [ 
                "1.目的のシステム ログをフィルター処理するためのタイプと最低限のレベルを設定します。レベル リストは降順で、最も低いレベルが最後にリストされます。",
                "2.システム ログ ファイルをローカル コンピューターに保存するには、[ログを保存] をクリックします。"]
} ,{                      
                           type: "step",
                           title: "メールでシステム ログを受信するには",
       content: [ 
                "1.目的のシステム ログをフィルター処理するためのタイプとレベルを設定します。レベル リストは降順で、最も低いレベルが最後にリストされます。",
                "2.[メール設定] をクリックします。",
                "3.[差出人] フィールドに、送信元メール アドレスとして使用される有効なメール アドレスを入力します。",
                "4.[宛先] フィールドに、送信先メール アドレスとして使用される有効なメール アドレスを入力します。",
                "5.送信元メール　アドレス (差出人) の SMTP サーバー アドレスを入力します。",
                "注: 送信メール アドレスが認証を必要とする場合は、[認証を有効にする] チェック ボックスを選択して、ユーザー名 (メール アドレス) とパスワードを入力してください。",
                "6. メールで定期的にシステム ログを受信する場合は、[自動メールを有効にする] チェック ボックスを選択して、特定の時刻 (24 時間形式) または時間間隔を設定します。",
                "現在のシステム ログをすぐに受信する場合は、[今すぐログをメール送信] をクリックします。",
                "7.[保存] をクリックします。"]
}]
},
       TRAFFIC_STATISTIC :{ 
               TITLE:"トラフィック モニター",
               CONTENT: [{
                           type: "paragraph",
                           content: "過去 10 分間のデバイスのトラフィック使用量、または過去 10 分間/24 時間/7 日間のすべてのデバイスのトラフィック使用量を表示します。"
                       }]
},
       TRAFFIC_STATISTIC_LIST :{ 
               TITLE:"トラフィック モニター リスト",
               CONTENT: [{
                           type: "paragraph",
                           content: "リストはデバイスの接続タイプ (有線またはワイヤレス) でグループ化されます。"
                       }]
},
       SYSTEM_PARA_WIRELESS :{ 
               TITLE:"システム パラメーター",
               CONTENT: [{
                           type: "title",
                           id: "help_syspara_wifi_title",
                           title: "2.4GHz/5GHz ワイヤレス",
                           content: "このセクションでは、ワイヤレス ネットワークでのトラフィック伝送ルールのパラメーターを設定できます。適切な設定がわからない場合は、既定の設定のままにしておくことを推奨します。"
                       } ,{                      
                           type: "name",
                           title: "ビーコン間隔",
                           content: "ルーターによってブロードキャストされるビーコン パケット間の間隔を決定してワイヤレス ネットワークを同期するため、40 ～ 1000 の値 (ミリ秒) を入力します。既定値は 100 ミリ秒です。"
                       } ,{                      
                           type: "name",
                           title: "RTS しきい値",
                           content: "1 ～ 2346 の値を入力して、ルーターを通るデータ転送のパケット サイズを決定します。既定では、RTS (送信要求) しきい値サイズは 2346 です。パケット サイズがプリセットしきい値より大きい場合、ルーターは送信要求フレームを特定の受信ステーションに送信して、データ フレームの送信を交渉するか、パケットはただちに送信されます。"
                       } ,{                      
                           type: "name",
                           title: "DTIM 間隔",
                           content: "この値は、DTIM (Delivery Traffic Indication Message)　の間隔を決定します。間隔を 1 ～ 15 の値で入力します。既定の間隔は 1で、これは DTIM 間隔がビーコン間隔と同じであることを示します。"
                       } ,{                      
                           type: "name",
                           title: "グループ キーの更新期間",
                           content: "秒数 (30 以上) を入力して、暗号化キー自動更新の時間間隔を制御します。既定値は 0 で、これはキーを更新しないことを示します。"
                       } ,{                      
                           type: "name",
                           title: "WMM 機能",
                           content: "WMM 機能により、優先度の高いメッセージを持つパッケージが優先的に転送されることを保証することができます。既定では有効になっており、有効にすることを強く推奨します。"
                       } ,{                      
                           type: "name",
                           title: "短い GI 機能",
                           content: "この機能は既定で有効になっており、GI (ガード間隔) 時間を減らすことによりパケット容量を増やすために推奨されます。"
                       } ,{                      
                           type: "name",
                           title: "AP 分離機能",
                           content: "ネットワークに接続されているすべてのワイヤレス デバイスが相互にやりとりするのを制限する一方でインターネットにはアクセスできるようにするには、[AP 分離を有効にする] チェック ボックスを選択します。"
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
                           title: "WDS を有効にするには",
                           content: "WDS (Wireless Distribution System) ブリッジ機能では、ワイヤレス WLAN (ローカル ネットワーク) で AP ( アクセス ポイント) とブリッジすることにより、ワイヤレス ネットワーク範囲を拡張できます。"
                       } ,{                      
                           type: "step",
       content: [ 
                "1.WDS ブリッジ機能を有効にするにはこれを選択します。",
                "2.スキャン機能によってネットワークをブリッジするには: [スキャン] をクリックして、利用可能なすべてのネットワークをスキャンして表示し、ブリッジ対象のネットワークを選択します。SSID (ネットワーク名)、MAC アドレス、およびセキュリティが自動で入力されます。",
                "または、ネットワークを手動でブリッジするには: ブリッジ対象のネットワークの SSID (ネットワーク名)、MAC アドレス、WDS モードを入力します。セキュリティ タイプを選択して、関連パラメーターを入力します。これは、ブリッジ対象のネットワークと同じでなければなりません。",
                "「保存」をクリック"]
} ,{                      
                           type: "note",
                           title: "注",
                           content: "WDS モードがわからない場合は、既定オプションの [自動] のままにしてください。"
                       }]
},
       SYSTEM_PARA_WPS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "WPS",
                           content: "WPS (Wi-Fi 保護セットアップ) では、WPS ボタンを押して、WPS 対応デバイスを簡単にルーターに接続できます。WPS 機能を有効にするにはこれをオンにして、[保存] をクリックします。"
                       }]
},
       SYSTEM_PARA_NAT :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "NAT",
                           content: "この機能は既定で有効になっています。既定の設定のままにしておくことを推奨します。これを無効にすると、インターネットにアクセスできなくなる可能性があります。"
                       } ,{                      
                           type: "note",
                           title: "注",
                           content: "NAT が無効な場合、NAT 転送も NAT ブーストも有効になりません。"
                       } ,{                      
                           type: "name",
                           id: "sys_para_nat_boost",
                           title: "NAT ブースト",
                           content: "ルーターが最大限のスループットを発揮するようにするには、[NAT ブーストを有効にする] チェック ボックスを選択して [保存] をクリックします。"
                       } ,{                      
                           type: "note",
                           id: "sys_para_nat_boost_note",
                           title: "注",
                           content: "NAT ブーストを有効にすると、QoS とトラフィック統計が自動的に無効になります。"
                       }]
},
       SYSTEM_PARA_DOS :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "DOS 保護設定",
                           content: "DOS 保護は、ルーターを ICMP-FLOOD、UDP-FLOOD、および TCP-FLOOD 攻撃から保護します。"
                       } ,{                      
                           type: "name",
                           title: "ICMP-FLOOD パケット レベル",
                           content: "ICMP-FLOOD　保護をトリガーする値を　5 ～ 7200 で入力します。ICMP パケット数が、プリセットされているしきい値を超えるとすぐにトリガーされます。"
                       } ,{                      
                           type: "name",
                           title: "UDP-FLOOD パケット レベル",
                           content: "UDP-FLOOD　保護をトリガーする UDP パケット数を　5 ～ 7200 の値で入力します。UDP パケット数が指定のしきい値を超えるとすぐにトリガーされます。"
                       } ,{                      
                           type: "name",
                           title: "TCP-FLOOD パケット レベル",
                           content: "TCP-SYN-FLOOD　保護をトリガーする TCP-SYN パケット数を　5 ～ 7200 の値で入力します。TCP パケット数が指定のしきい値を超えるとすぐにトリガーされます。"
                       }]
},
       SYSTEM_PARA_DUPLEX :{ 
               TITLE:"",
               CONTENT: [{
                           type: "title",
                           title: "デュプレックス",
                           content: "ドロップダウン リストからデュプレックス タイプを選択して、[保存] をクリックします。"
                       }]
},
       SYSTEM_PARA_LED :{ 
               TITLE:"LED コントロール",
               CONTENT: [{
                           type: "name",
                           title: "夜モードを有効にする",
                           content: "ルーターのパフォーマンスに影響を与えずに夜モード期間中に LED をオフにするには、このチェック ボックスをオンにします。"
                       } ,{                      
                           type: "name",
                           title: "夜モード期間",
                           content: "夜モードを提供する時間帯を指定します。"
                       } ,{                      
                           type: "paragraph",
                           content: "[保存] をクリックして、すべての設定を保存してください。"
                       }]
},
       OPEN_VPN :{ 
               TITLE:"OpenVPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "OpenVPN を使用すると、外出中にインターネットを使用してネットワークに安全にアクセスできます。VPN サービスを使用するには、動的 DNS サービス (推奨) を設定するか、ルーターの WAN ポートに静的 IP アドレスを割り当てます。また、システム時刻がインターネットと同期されていなければなりません。"
                       } ,{                      
                           type: "name",
                           title: "サービス タイプ",
                           content: "OpenVPN サーバーの通信プロトコルを選択します。UDP または TCP。"
                       } ,{                      
                           type: "name",
                           title: "サービス ポート",
                           content: "1024 ～ 65535 の通信ポート番号を入力します。既定および一般的なサービス ポートは 1194 です。"
                       } ,{                      
                           type: "name",
                           title: "VPN サブネット/ネットマスク",
                           content: "OpenVPN サーバーがクライアントにリースできる IP アドレスの範囲を入力します。"
                       } ,{                      
                           type: "name",
                           title: "クライアント アクセス",
                           content: "OpenVPN クライアントのアクセス タイプを選択します。",
       children: [{                      
                           type: "name",
                           title: "ホーム ネットワークのみ",
                           content: "クライアントは、ホーム ネットワークにのみアクセスできます。クライアントの既定のルートは変更されません。"
                       } ,{                      
                           type: "name",
                           title: "インターネットとホーム ネットワーク",
                           content: "クライアントは、国外にいるときに、ホーム ネットワーク、地理的制限のあるインターネット サイトまたはサービスにアクセスできます。クライアントの既定のルートは変更されます。"
                       }]
}]
},
       OPEN_VPN_CERTIFICATE :{ 
               TITLE:"証明書",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "情報の証明書を使用して、リモート クライアントの VPN 接続を識別します。",
                "新しい証明書を生成するには [生成] をクリックします。"]
}]
},
       OPEN_VPN_CONF :{ 
               TITLE:"設定ファイル",
               CONTENT: [{
                           type: "paragraph",
       content: [ 
                "リモート クライアントは、設定ファイルを使用してルーターにアクセスします。",
                "[エクスポート] をクリックして、OpenVPN 設定ファイルを保存します。"]
}]
},
       OPEN_VPN_GUIDE :{ 
               TITLE:"VPN クライアント インストール ガイド",
               CONTENT: [{
                           type: "step",
                           title: "クライアント デバイスを OpenVPN サーバーに接続するには:",
       content: [{                      
                           type: "paragraph",
                           content: "OpenVPN サーバーを設定する前に、動的 DNS サービスを設定するか (推奨)、WAN ポートの静的 IP アドレスを割り当てます。NAT 設定の外部ポートがサービス ポートではなく、システム時刻がインターネットと同期されていることを確認してください。"
                       },
                "1.[VPN サーバーを有効にする] を選択します。",
                "2.OpenVPN サーバー パラメーター (サービス タイプ、サービス ポート、クライアント アクセス、および VPN サブネット/ネットマスク) を設定して、[保存] をクリックします。",
                "3.[エクスポート] をクリックして、設定ファイルを保存します。",
                "4.クライアント デバイスで、<a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a> から OpenVPN クライアント ユーティリティをダウンロードしてインストールします。",
                "公式にサポートされているプラットフォームは Windows、Mac OSX、および Linux です。",
                "5.OpenVPN クライアント ユーティリティを起動して、保存した設定ファイルを使用して新しい VPN 接続を追加し、クライアント デバイスを VPN サーバーに接続します。"]
} ,{                      
                           type: "note",
                           title: "注",
                           content: "OpenVPN クライアントの詳細については、<a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>をご覧ください。"
                       }]
},
       PPTP_VPN :{ 
               TITLE:"PPTP VPN",
               CONTENT: [{
                           type: "paragraph",
                           content: "PPTP VPN を使用すると、外出中にインターネットを使用してネットワークに簡単かつすばやくアクセスできます。一部の ISP では使用できません。VPN サービスを使用するには、動的 DNS サービス (推奨) を設定するか、ルーターの WAN ポートに静的 IP アドレスを割り当てます。また、システム時刻がインターネットと同期されていなければなりません。"
                       } ,{                      
                           type: "name",
                           title: "クライアント IP アドレス",
                           content: "PPTP VPN サーバーがクライアントにリースできる IP アドレス (最大 10 クライアント) の範囲を入力します。"
                       } ,{                      
                           type: "name",
                           title: "ユーザー名とパスワード",
                           content: "PPTP VPN サーバーでのクライアント認証のために、ユーザー名とパスワードを入力します。"
                       }]
},
       PPTP_VPN_GUIDE :{ 
               TITLE:"VPN クライアント インストール ガイド",
               CONTENT: [{
                           type: "step",
                           title: "クライアント デバイスを PPTP VPN サーバーに接続するには:",
       content: [{                      
                           type: "paragraph",
                           content: "PPTP VPN サーバーを設定する前に、動的 DNS サービスを設定するか (推奨)、WAN ポートの静的 IP アドレスを割り当てます。NAT 設定の外部ポートが 1723 ではなく、システム時刻がインターネットと同期されていることを確認してください。"
                       },
                "1.[VPN サーバーを有効にする] を選択します。",
                "2.PPTP VPN サーバー パラメーターを設定して、[保存] をクリックします。",
                "3.クライアント デバイスで、PPTP VPN 接続を作成します。公式にサポートされているプラットフォームは Windows、Mac OSX、Linux、iOS、および Android です。",
                "4.PPTP VPN プログラムを起動して、新しい接続を追加し、登録されている DDNS サービスのドメイン名または WAN ポートに割り当てられた静的　IP アドレスを入力して、クライアント デバイスを PPTP VPN サーバーに接続します。"]
}]
},
       VPN_CONNNECTION :{ 
               TITLE:"VPN 接続",
               CONTENT: [{
                           type: "paragraph",
                           content: "このページには、ルーターでホストされている OpenVPN および PPTP VPN サーバーに現在接続されているクライアントが表示されます。"
                       }]
},
       BASIC_NETWORK :{ 
               TITLE:"ネットワーク マップ",
               CONTENT: [{
                           type: "paragraph",
                           content: "ネットワーク マップでは、ルーターの現在のネットワーク接続状態とワイヤレス情報、接続されているデバイスの情報を確認できます。"
                       }]
},
       BASIC_NETWORK_INTEREST :{ 
               TITLE:"インターネット",
               CONTENT: [{
                           type: "paragraph",
                           content: "インターネット情報を表示します。"
                       }]
},
       BASIC_NETWORK_ROUTER :{ 
               TITLE:"ルーター",
               CONTENT: [{
                           type: "paragraph",
                           content: "ワイヤレス ネットワークと LAN ポートの現在のネットワーク情報を表示します。"
                       }]
},
       BASIC_NETWORK_CLIENTS :{ 
               TITLE:"有線/ワイヤレス クライアント",
               CONTENT: [{
                           type: "paragraph",
                           content: "ルーターの接続クライアントのネットワーク名 (編集可能)、割り当てられている IP および MAC アドレスを表示します。"
                       }]
},
       BASIC_NETWORK_PRINTER :{ 
               TITLE:"プリンター",
               CONTENT: [{
                           type: "paragraph",
                           content: "USB ポートを介してルーターに接続されているプリンターの名前を表示します。"
                       }]
},
       BASIC_NETWORK_USB :{ 
               TITLE:"USB ディスク",
               CONTENT: [{
                           type: "paragraph",
                           content: "USB ポートを介してルーターに接続されている USB ディスクの関連情報を表示します。"
                       }]
},
       BASIC_SPEED_TEST :{ 
               TITLE:"速度テスト",
               CONTENT: [{
                           type: "paragraph",
                           content: "この機能は、プロバイダーとの現在のアップロード・ダウンロード速度をテストし、インターネット利用に関するアドバイスを表示います。"
                       } ,{                      
                           type: "paragraph",
                           content: "ヒント：その他のアプリやプログラムなどを終了させると、より正確な測定結果が表示されます。"
                       } ,{                      
                           type: "paragraph",
                           content: "履歴 - 以前に行ったスピードテスト結果の履歴。"
                       } ,{                      
                           type: "paragraph",
                           content: "再テスト - クリックするとスピードテストを実行します。"
                       }]
},
       BASIC_INTERNET :{ 
               TITLE:"インターネット",
               CONTENT: [{
                           type: "paragraph",
                           content: "[自動検出] をクリックするか、インターネット接続タイプを手動で選択します。ISP によって提供された対応するパラメーターを入力します。"
                       }]
},
       BASIC_WIRELESS_SMART_CONNECT :{ 
               TITLE:"スマート コネクト",
               CONTENT: [{
                           type: "paragraph",
                           content: "スマート コネクトを有効にするには、このチェック ボックスをオンにします。この機能は、ネットワーク需要のバランスを調整するために、実際の状態に基づいて最高のワイヤレス帯域にデバイスを割り当てることで、デバイスの動作を速くします。"
                       }]
},
       BASIC_WIRELESS :{ 
               TITLE:"ワイヤレス設定",
               CONTENT: [{
                           type: "paragraph",
                           content: "ワイヤレス設定 (SSID、パスワードなど) を設定できます。"
                       } ,{                      
                           type: "name",
                           title: "ネットワーク名 (SSID)",
                           content: "ネットワーク名 (SSID) の変更は推奨されていません。このフィールドは大文字小文字が区別されます。"
                       } ,{                      
                           type: "name",
                           title: "SSID を非表示にする",
                           content: "ワイヤレス ネットワーク リストで 2.4GHz/5GHz ネットワーク名 (SSID) を非表示にする場合は、これを選択します。選択すると、SSID はブロードキャストされなくなるため、手動でネットワークに参加する必要があります。"
                       } ,{                      
                           type: "name",
                           title: "パスワード",
                           content: "ワイヤレス パスワードを 8 ～ 63 文字の ASCII 文字、あるいは 8 ～ 64 文字の 16 進数文字で入力します。このフィールドは大文字小文字が区別されます。"
                       }]
},
       BASIC_DEVICE_SETTINGS :{ 
               TITLE:"USB ストレージ デバイス",
               CONTENT: [{
                           type: "paragraph",
                           content: "この機能では、ローカル エリア ネットワーク内またはインターネットを介して、異なるクライアント間で USB ストレージ デバイスを共有できます。"
                       } ,{                      
                           type: "title",
                           title: "デバイス設定",
                           content: "[デバイス設定] セクションには、USB ポート経由で接続された USB ストレージ デバイスの基本情報が表示されます。USB フラッシュ ディスクがもつボリュームは通常 1 つのみです。"
                       } ,{                      
                           type: "name",
                           title: "スキャン",
                           content: "通常、ルーターは新たに接続されたデバイスを自動で検出します。自動検出されない場合は、このボタンをクリックしてスキャンし、最新の情報で画面を更新します。",
       children: [{                      
                           type: "note",
                           title: "注",
                           content: "グレーの領域は、無効になっているボリュームを表しています。この領域をクリックして特定のボリュームを共有できます。"
                       }]
} ,{                      
                           type: "name",
                           title: "削除",
                           content: "USB ストレージ デバイスを物理的に USB ポートから取り外す前に、このボタンをクリックして安全にマウント解除します。",
       children: [{                      
                           type: "note",
                           title: "注",
                           content: "[削除] ボタンは、USB ストレージ デバイスがルーターに接続されている場合にのみ表示されます。現在のボリュームがビジー状態の場合は、マウント解除できません。"
                       }]
} ,{                      
                           type: "step",
                           title: "ファイル サーバーをセットアップするには",
       content: [ 
                "1.直接または USB ケーブルを使用して、USB ポートに USB ストレージ デバイスを接続します。デバイスに付属の外部電力が必要な場合は、外部電力が接続されていることを確認してください。",
                "2.新たに接続された USB デバイスはルーターによって自動で検出され、[デバイス設定] セクションに表示されます。自動検出されない場合は、[スキャン] をクリックします。",
                "注:ルーターに接続されているボリュームが 5 つを超える場合は、共有アイコンが表示されます。共有する必要がないボリュームについては、無効にするアイコンをクリックできます。"]
}]
},
       BASIC_SHARING_SETTINGS :{ 
               TITLE:"アクセス アドレス",
               CONTENT: [{
                           type: "name",
                           title: "ネットワーク/メディア サーバー名",
                           content: "ネットワーク近隣方式またはメディア共有機能を介して、接続されている USB ストレージ デバイスにアクセスために使用される名前を表示します。既定では TP-Share です。"
                       } ,{                      
                           type: "name",
                           title: "アクセス方法",
                           content: "共有されているUSBドライブへのアクセス方法は4通りあります。",
       children: [{                      
                           type: "name",
                           title: "ネットワーク近隣",
                           content: "ネットワーク上のユーザーが、[アドレス] 列に表示されるアドレスで共有コンテンツにアクセスすることを許可するには、このオプションを選択します。"
                       } ,{                      
                           type: "name",
                           title: "FTP",
                           content: "ネットワーク上の FTP クライアントとユーザーが、[アドレス] 列に表示される FTP アドレスで USB ストレージ デバイスにアクセスすることを許可する FTP サーバー機能を有効にするには、このオプションを選択します。"
                       } ,{                      
                           type: "name",
                           title: "FTP (インターネット経由)",
                           content: "FTP クライアントとユーザーが、インターネット上の FTP を介して共有 USB ストレージ デバイスにリモートでアクセスし、ファイルをダウンロードおよびアップロードすることを許可するには、このオプションを選択します。アクセス アドレスをカスタマイズするには、[編集] をクリックしてルーターの動的 DNS をセットアップします。FTP サーバーのポートを変更するには、新しいポート番号を入力して [保存] をクリックし、変更を適用します。"
                       } ,{                      
                           type: "name",
                           title: "SFTP",
                           content: "このオプションを選択すると、SFTPクライアントとネットワーク上のユーザーが[アドレス]列に表示されているSFTPアドレスを使用してUSBストレージデバイスにアクセスできるSFTPサーバー機能が有効になります。"
                       }]
} ,{                      
                           type: "name",
                           title: "アドレス",
                           content: "共有 USB ストレージ デバイスにアクセスするために使用されるアドレスを表示します。"
                       } ,{                      
                           type: "name",
                           title: "ポート",
                           content: "FTP サーバーへのアクセスに使用するポート番号を表示します。"
                       }]
},
       BASIC_FOLDER_SHARING :{ 
               TITLE:"共有コンテンツ",
               CONTENT: [{
                           type: "paragraph",
                           content: "共有するフォルダーを表示します。既定ではすべてのフォルダーが共有されます。編集アイコンをクリックして、共有フォルダーをカスタマイズできます。"
                       } ,{                      
                           type: "note",
                           title: "注",
                           content: "ルーターに接続されているボリュームが 5 つを超える場合は、[デバイス設定] セクションに共有アイコンが表示されます。共有する必要がないボリュームについては、共有アイコンをクリックして無効にできます。"
                       }]
},
       FOLDER_SHARING :{ 
               TITLE:"共有コンテンツとセキュリティ",
               CONTENT: [{
                           type: "name",
                           title: "共有コンテンツ",
                           content: "共有するフォルダーを表示します。既定ではすべてのフォルダーが共有されます。編集アイコンをクリックして、共有フォルダーをカスタマイズできます。",
       children: [{                      
                           type: "note",
                           title: "注",
                           content: "ルーターに接続されているボリュームが 5 つを超える場合は、[デバイス設定] セクションに共有アイコンが表示されます。共有する必要がないボリュームについては、共有アイコンをクリックして無効にできます。"
                       }]
} ,{                      
                           type: "name",
                           title: "アクセス認証",
       content: [ 
                "認証を有効にするに切り替えると、すべての共有フォルダにアクセスするために有効なユーザー名とパスワードを入力がユーザーに要求されます。ユーザーはファイルの読み込みだけができますが、管理者としてアクセスすると、ファイルの読み取りと変更することができます。",
                "ユーザー名は文字またはアンダーバーで始まり、文字、数字、およびアンダーラインを使用して、15文字以内である必要があります。",
                "パスワードは文字、数字、アンダーラインを使用して、15文字以内である必要があります。"]
} ,{                      
                           type: "name",
                           title: "ゲスト ネットワーク アクセスを許可",
                           content: "ゲスト ネットワーク ユーザーがすべての共有フォルダーにアクセスできるようにするには、これをオンにします。"
                       } ,{                      
                           type: "name",
                           title: "メディア共有を有効にする",
                           content: "この機能を有効にしていると、ローカル エリア ネットワークのすべての DLNA 対応デバイスが、すべての共有フォルダー内のメディア ファイルにアクセスできます。[アクセス認証] が有効になっている場合でも、ユーザーはユーザー名またはパスワードを入力する必要がありません。"
                       }]
},
       BASIC_PRINT_SERVER :{ 
               TITLE:"印刷サーバー",
               CONTENT: [{
                           type: "name",
                           title: "印刷サーバー",
                           content: "印刷サーバー機能を有効にするにはオンにします。"
                       } ,{                      
                           type: "name",
                           title: "プリンター名",
                           content: "ルーターに接続されているプリンターの名前を表示します。"
                       }]
},
       BASIC_PARENTAL_CONTROL :{ 
               TITLE:"保護者による制限",
               CONTENT: [{
                           type: "paragraph",
                           content: "保護者による制限の基本設定により、一日の特定の時間でアクセスを制限できます (例えば、宿題の時間にはお子様の PC からのインターネット アクセスを禁止する、など)。"
                       }]
},
       BASIC_PARENTAL_DEVICE :{ 
               TITLE:"保護者による制限対象のデバイス",
               CONTENT: [{
                           type: "paragraph",
                           content: "この表は、保護者による制限で現在制限されているデバイスの情報と設定を示します。"
                       } ,{                      
                           type: "step",
                           title: "新しいクライアント デバイスを制限するには",
       content: [ 
                "1.[保護者による制限] をオンにします。",
                "2.[追加] をクリックします。",
                "3.[スキャン] をクリックして、アクセス デバイス リストから、現在接続されているデバイスを選択するか、デバイス名と MAC アドレスを手動で入力して、接続されていないデバイスを追加します。",
                "4.有効時間のアイコンをクリックして、制限を適用する時間範囲を指定します。",
                "5.[説明] フィールドに簡単な説明を入力します。このフィールドはオプションです。",
                "6. [このエントリを有効にする] を選択します。",
                "7.[保存] をクリックします。"]
} ,{                      
                           type: "note",
                           title: "注",
                           content: "このエントリを無効にするには、電球アイコンをクリックします。"
                       }]
},
       BASIC_GUEST_NETWORK :{ 
               TITLE:"ゲスト ネットワーク",
               CONTENT: [{
                           type: "paragraph",
                           content: "この機能では、メイン ネットワークを公開せずにゲストに Wi-Fi アクセスを提供できます。"
                       } ,{                      
                           type: "name",
                           title: "ゲストどうしのアクセスを許可する",
                           content: "ネットワーク近隣、Samba、Ping、および FTP などの方式でワイヤレス デバイスが互いにゲスト ネットワーク上で通信できるようにするには、このチェック ボックスをオンにします。"
                       } ,{                      
                           type: "name",
                           title: "ゲストが自分のローカル ネットワークにアクセスすることを許可する",
                           content: "ネットワーク近隣、Samba、Ping、および FTP などの方式でワイヤレス デバイスがルーターの LAN ポートまたはメイン ネットワークに接続されているデバイスにゲスト ネットワーク上で通信できるようにするには、このチェック ボックスをオンにします。"
                       } ,{                      
                           type: "name",
                           title: "ゲスト ネットワークを有効にする",
                           content: "ゲスト ネットワーク機能を有効にするには、このチェック ボックスをオンにします。"
                       } ,{                      
                           type: "name",
                           title: "ネットワーク名 (SSID)",
                           content: "既定のゲスト SSID を使用するか、新しい名前 (32 文字まで) を作成します。"
                       } ,{                      
                           type: "name",
                           title: "SSID を非表示にする",
                           content: "Wi-Fi ネットワーク リストでゲスト SSID を非表示にする場合は、このチェックボックスをオンにします。"
                       } ,{                      
                           type: "name",
                           id: "pwd_mode",
                           title: "パスワード更新間隔",
                           content: "ゲスト ネットワーク パスワードの更新間隔を選択します。"
                       } ,{                      
                           type: "name",
                           id: "pwd_no_random",
                           title: "パスワード",
                           content: "8 ～ 63 文字の ASCII 文字、または 8 ～ 64 文字の 16 進数 (0-9、a-f、A-F) のパスワードを作成します。"
                       } ,{                      
                           type: "name",
                           id: "pwd_random",
                           title: "パスワード",
                           content: "ランダムに生成されたパスワードを使用するか、8 ～ 63 文字の ASCII 文字、または 8 ～ 64 文字の 16 進数文字 (0-9、a-f、A-F) でパスワードを作成します。"
                       }]
},
       BASIC_ACCOUNT_LOGIN :{ 
               TITLE:"TP-Link クラウド",
               CONTENT: [{
                           type: "paragraph",
                           content: "TP-Link Cloudサービスを使用するとご使用のネットワークを離れたところからモニターできます。 好きな時・場所からインターネットを通じてTP-Linkデバイスにアクセス・管理が出来ます。"
                       }]
},
       ACCOUNT_INFO :{ 
               TITLE:"アカウント情報",
               CONTENT: [{
                           type: "paragraph",
                           content: "TP-Link IDの情報が表示されます。編集アイコンをクリックすることでアカウント情報の編集が可能です。"
                       }]
},
       DEVICE_INFO :{ 
               TITLE:"機器の情報",
               CONTENT: [{
                           type: "paragraph",
                           content: "デバイスを管理しているクラウド アカウントを含むデバイス情報を表示します。"
                       }]
},
       BOUND_ACCOUNT :{ 
               TITLE:"バインド済みアカウント",
               CONTENT: [{
                           type: "paragraph",
                           content: "この表は、デバイスに現在バインドされているすべてのクラウド アカウントを示しています。"
                       } ,{                      
                           type: "step",
                           title: "ユーザー アカウントをバインドするには",
       content: [ 
                "1.[バインド] をクリックします。",
                "2. バインドしたい登録したEメールアドレスを入力してください。",
                "「保存」をクリック"]
}]
},
       NEW_PARENTAL_CONTROL :{ 
               TITLE:"保護者による制限",
               CONTENT: [{
                           type: "paragraph",
                           content: "年齢レベルのフィルタ、アクセス制限、ユーザープロファイルにより、保護者による制限は家族にパーソナライズされた適切なインターネットアクセスを提供します。"
                       } ,{                      
                           type: "step",
                           title: "新しいデバイスに保護者による制限を適用するには",
       content: [ 
                "1. [追加] をクリックします。",
                "2.このプロファイルの名前を入力し、このプロファイルにデバイスを追加するには「+」をクリックします。",
                "3. [フィルターレベル]を選択し、必要に応じてフィルターの内容をカスタマイズします。キーワードを入力して、データベースにフィルタリングするウェブサイトを検索することができます。他のウェブサイト（URL）は手動で入力することも可能です。<br/>異なるフィルターカテゴリについては、以下の説明を参照してください。<p>アダルトコンテンツ - ポルノ、薬物使用、暴力、差別等の性的、有害、または違法なコンテンツを含むサイト </ p> <p>ギャンブル - オオンラインギャンブルサイトを含む、ギャンブルに関する情報を促進または提供するサイト</ p> <p>性教育 - 生殖、セクシュアリティ、安全なセックスと避妊、性感染症、性的トラウマに対処するなど、セクシュアリティを有益に話し合うサイト</ p></ p>オンラインコミュニケーション - 電子メール、ブログ、オンラインフォーラム、VoIPおよびビデオチャットサービスを含む、テキスト、音声またはビデオを介して他者と通信するためのフォーマットをホストするサイト</ p> </ p> SNS - 共通の関心事、キャリア、出自、または現実の知人に基づいて人とその個人的な活動を結びつける個人的な表現やコミュニケーションを提供するサイト</ p> <p>サーフに支払う - ユーザーに特定の</ p> <p>メディア - ストリーミングサービス、テレビ番組や音楽ダウンロードを含む無料、有料、または購読済みのオーディオおよび/またはビデオコンテンツを提供するサイト</ p> > <p>ダウンロード - P2P（ピアツーピア）共有、オンラインファイルストレージ、モバイルデバイスのコンテンツ（音楽やアプリなど）などファイルの共有や配信を提供するサイト</ p> <p>ゲーム -オンラインゲーム、ゲームコンソールネットワーク、ブラウザゲームなど、Webでホストされたゲームやダウンロード可能なゲームを提供するサイト</ p>",
                "4.このプロファイルがオンラインで費やすことができる合計時間を制限する場合は、時間制限を有効にして指定します。 就寝時間を指定して、このプロファイルの下にあるデバイスがインターネットを使用できない期間を1日単位で設定することもできます。",
                "5.[保存] をクリックします。"]
} ,{                      
                           type: "step",
                           title: "プロフィールの詳細なインターネット履歴を表示するには",
       content: [ 
                "1. [インサイト]列で、対応する[インサイト]ボタンをクリックします。",
                "2. さらに履歴を表示するには、履歴<span class=\"ptl-ctr-help-icon history\"></span>ボタンをクリックします。",
                "3. <span class=\"ptl-ctr-help-icon block\"></span>または<span class=\"ptl-ctr-help-icon unblock\"></span>ボタンをクリックしてウェブサイトをブロックまたはブロック解除できます。 "]
} ,{                      
                           type: "step",
                           title: "すぐにインターネットアクセスを無効または有効にするには",
       content: [ 
                "インターネットアクセス列で<span class=\"ptl-ctr-help-icon stop\"></span>をクリックすると、対応するプロファイルのデバイスがインターネットにアクセスできなくなり、<span class=\"ptl-ctr-help-icon enable\"> </span>をクリックするとをアクセスが有効になります。"]
}]
},
       BASIC_QOS :{ 
               TITLE:"QoS",
               CONTENT: [{
                           type: "paragraph",
                           content: "QoS（Quality of Service）機能は、オンラインアクティビティとデバイスを優先して、必要なときに高速なネットワーク接続を保証します。"
                       } ,{                      
                           type: "paragraph",
                           content: "アプリケーションの優先順位を選択してオンラインアクティビティのネットワークスピードの優先順位を設定し、デバイス優先順位を選択してデバイスのネットワークスピードの優先順位を設定します。"
                       }]
},
       BASIC_APPLICATION_PRIORITY :{ 
               TITLE:"アプリケーション優先順位",
               CONTENT: [{
                           type: "paragraph",
                           content: "優先順位を付けるオンラインアクティビティを選択するか、[カスタム]をクリックして各オンラインアクティビティの優先順位を設定します。"
                       }]
},
       BASIC_DEVICE_PRIORITY :{ 
               TITLE:"デバイスの優先順位",
               CONTENT: [{
                           type: "paragraph",
                           content: "優先順位を付けるデバイスと優先順位を設定する期間を選択します。"
                       } ,{                      
                           type: "step",
                           title: "デバイスの優先順位を設定するには",
       content: [ 
                "1.優先順位を付けたいデバイスをリストから探し、優先順位を切り替えます。",
                "2. タイミング列でデバイスの優先順位を設定する期間を選択します。"]
}]
},
       ANTI_VIRUS :{ 
               TITLE:"アンチウイルス",
               CONTENT: [{
                           type: "paragraph",
                           content: "頻繁なネットワークスキャン、悪意のあるサイトの検出、感染したデバイスの隔離によって、アンチウイルス機能は個人情報を安全に保ちます。 ネットワークがどのように保護されているか、ネットワークに何らかの攻撃があったかどうかを確認することもできます。"
                       } ,{                      
                           type: "paragraph",
                           content: "履歴 - アンチウィルスによって保護されているデバイスと、攻撃のソースと分類を記録します。"
                       } ,{                      
                           type: "paragraph",
                           content: "[すべて有効にする] - 1つまたは複数の保護タイプが有効になっていない場合は、すべての保護タイプを有効にする場合にタップします。"
                       } ,{                      
                           type: "paragraph",
                           content: "保護タイプ - 説明に従って保護タイプを有効にします。 すべての保護タイプを有効にすることをお勧めします。"
                       }]
},
       APPLICATION_PRIORITY :{ 
               TITLE:"アプリケーション優先順位",
               CONTENT: [{
                           type: "paragraph",
                           content: "アプリケーション優先順位機能は、オンラインアクティビティに優先順位を付けて、必要なときに高速なネットワーク接続を保証します。 優先順位を付けるオンラインアクティビティを選択するか、[カスタム]をクリックして各オンラインアクティビティの優先順位を設定します。"
                       }]
},
       DEVICE_PRIORITY :{ 
               TITLE:"デバイスの優先順位",
               CONTENT: [{
                           type: "paragraph",
                           content: "デバイス優先順位機能は、必要なときに素早くネットワークに接続できるようにデバイスの優先順位を設定します。 優先順位を付けるデバイスと優先順位を設定する期間を選択します。"
                       } ,{                      
                           type: "step",
                           title: "デバイスの優先順位を設定するには",
       content: [ 
                "1.優先順位を付けたいデバイスをリストから探し、優先順位を切り替えます。",
                "2. タイミング列でデバイスの優先順位を設定する期間を選択します。"]
}]
},
       FIREWALL :{ 
               TITLE:"ファイアウォール",
               CONTENT: [{
                           type: "paragraph",
                           content: "SPI（ステートフルパケットインスペクション）ファイアウォールは、サイバー攻撃を防ぎ、プロトコルに基づいてルータを通過するトラフィックを検証します。 既定では、この機能は有効になっています。"
                       } ,{                      
                           type: "name",
                           title: "SPIファイアウォールを有効にする",
                           content: "必要がない限りSPIファイアウォールを無効にしないでください。"
                       } ,{                      
                           type: "name",
                           title: "WANポートからのpingの許可/ LANポートからのpingの許可",
                           content: "WAN / LANポートからのパケットをpingできるようにする。 既定の設定を維持することをお勧めします。"
                       }]
},
       "" :     ""
    };
})(jQuery);