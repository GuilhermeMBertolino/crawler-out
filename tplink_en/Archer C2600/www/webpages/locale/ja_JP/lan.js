(function($){

	$.su = $.su || {};
	$.su.CHAR = {
		LOGIN: {
			USERNAME: 					"ユーザー名",
			PASSWORD: 					"パスワード",
			FORGET_PASSWORD: 			"パスワードをお忘れの場合",
			LOGIN: 						"ログイン",
			IMPORTANT_UPDATE_INFO: 		"フロントエンド デバイスとの IP 競合を避けるために、ルーターの IP アドレスは次に変更されました:",
			CONTINUE: 					"続行",

			IMPORTANT_NOTICE: 			"重要な通知",
			OR: 						"、次にアクセスしてよろしいですか　(",
			END: 						".",
			END2: 						")?",

			FORGET_PASSWORD_INFO_0: 	"ルーターを既定値にリセットするには、リセット ボタンを 10 秒間長押ししてください。",
			FORGET_PASSWORD_INFO_1: 	"パスワードの復元機能を有効にすると、システムは代替メール アドレスに、既定のユーザー名とパスワードをリセットするための確認コードを送信できます。",
			FORGET_PASSWORD_SEND_FAILED:"コードを送信できませんでした。インターネット接続をチェックして、[システム　ツール] > [管理] でパスワード復元のパラメーターを確認してください。",

			VERIFICATION_CODE: 			"確認コード",

			RECEIVE_CODE: 				"コードの送信",

			CONFIRM: 					"確認",

			SEC: 						"秒",

			USER_CONFLICT: 				"ログインが競合しています。",
			FIRST_TIME: 				"中国の TP-LINK が開発した Archer AD7200 をご利用いただきありがとうございます。まず、本製品を管理するためのデバイス パスワードを作成してください。",
			
			USER_CONFLICT_INFO: 		"ホスト %HOST% (%IP%/%MAC%) のユーザー %USER% は、現在ルーターにログインしています。同時にログインすることはできません。あとでもう一度実行してください。",
			USER_CONFLICT_INFO_1: 		"ユーザー %USER% (%MAC%) は、現在ルーターにログインしています。同時にログインすることはできません。あとでもう一度実行してください。",
			USER_CONFLICT_INFO_2: 		"ユーザー %USER% (%IP%) は、現在ルーターにログインしています。同時にログインすることはできません。あとでもう一度実行してください。",
			
			LOGIN_FAILED: 				"ログイン失敗。",
			LOGIN_FAILED_COUNT: 		"ログインが %num1 回失敗しました。あと %num2 回試行できます。",
			NO_COOKIE: 					"ログインするには Cookie が有効になっていなければなりません。Cookie を有効にするか、プライベート/匿名ブラウジング モードをオフにしてください。", 

			FORGET_PASSWORD_NOTE: 		"また、リセット ボタンを 10 秒間長押しすると、ルーターで既定のユーザー名とパスワード (admin/admin) を復元できます。"
		},

		UPGRADE: {
			UPGRADE_NOW: 					"今すぐアップグレード",
			REMIND: 						"あとでもう一度通知",
			NOTICE:    						"%PRODUCT% ルーターの新しいファームウェアが利用可能です。",
			NEVER: 							"このバージョンを無視"
			
		},

		WAN_ERROR: {
			TITLE: 							"WAN 接続エラー。",
			STATUS: 						"ステータス",
			INFO: 							"情報",
			SETUP: 							"インターネット接続のセットアップ",
			NEVER: 							"今後表示しない"
		},

		INDEX: {
			FIRMWARE_VERSION: 				"ファームウェア バージョン:",
			HARDWARE_VERSION: 				"ハードウェア バージョン:",
			HELP_SUPPORT: 					"サポート",
			FAQ: 							"FAQ",
			CONFIRM_REBOOT: 				"ルーターを再起動してよろしいですか?",
			CONFIRM_LOGOUT: 				"ログアウトしてよろしいですか?",
			UPGRADE_ALERT_1: 				"現在のファームウェアは TP-LINK クラウド サービスをサポートしません。www.tp-link.com から最新のファームウェアをダウンロードしてインストールすることを強く推奨します。",
			UPGRADE_ALERT_2: 				"現在のファームウェアは TP-LINK クラウド サービスをサポートしません。右上隅にある更新アイコンをクリックしてファームウェアを更新することを強く推奨します。",
			REBOOTING: 						"再起動中...<br/>処理中は操作しないでください。",

			MODE_SWITCH: 					"モード選択",
			ACCESS_POINT: 					"アクセス ポイント",
			ACCESS_POINT_TIPS: 				"既存の有線ネットワークをワイヤレス ネットワークに変換します。",
			ROUTER: 						"ルーター",
			ROUTER_TIPS: 					"複数の有線およびワイヤレス デバイスに同時にインターネット アクセスを提供します。",
			REPEATER: 						"リピーター",
			REPEATER_TIPS: 					"ワイヤレス信号を繰り返すことによって既存のワイヤレス有効範囲を拡張します。",
			MODE_REBOOT_TIP: 				"動作モードを変更するとデバイスが再起動されます。続行してよろしいですか?",
			MODE_FAIL_TIP: 					"モードの切り替えが失敗しました。あとでもう一度実行するか、ルーターを再起動してください。"
		},

		NAV: {
			QUICK_SETUP: 				"クイック セットアップ",
			BASIC: 						"基本",
			ADVANCED: 					"詳細設定"
		},

		CONTROL: {
			MODE: 						"モード",
			LOGIN: 						"ログイン",
			LED:                        "LED",
			LED_ON:                     "LED オン",
			LED_OFF:                    "LED オフ",			
			LED_DISABLED:               "LED ステータスは、夜モードの間は変更できません。",			
			LOGOUT: 					"ログアウト",
			UPDATE: 					"更新",
			REBOOT: 					"再起動"
		},

		LANGUAGE: {
			EN_US: 						"英語"
		},

		REGION: {
			ALBANIA: 					"アルバニア",
			ALGERIA: 					"アルジェリア",
			AMERICAN_SAMOA: 			"米サモア",
			ARGENTINA: 					"アルゼンチン",
			ARMENIA: 					"アルメニア",
			ARUBA: 						"アルーバ",
			AUSTRALIA: 					"オーストラリア",
			AUSTRIA: 					"オーストリア",
			AZERBAIJAN: 				"アゼルバイジャン",
			BAHAMAS: 					"バハマ",
			BAHRAIN: 					"バーレーン",
			BANGLADESH: 				"バングラデシュ",
			BARBADOS: 					"バルバドス",
			BELARUS: 					"ベラルーシ",
			BELGIUM: 					"ベルギー",
			BELIZE: 					"ベリーズ",
			BERUMUDA: 					"バミューダ",
			BOLIVIA: 					"ボリビア",
			BOSNIA_HERZEGOWINA: 		"ボスニア・ヘルツェゴビナ",
			BRAZIL: 					"ブラジル",
			BRUNEI_DARUSSALAM: 			"ブルネイ・ダルサラーム国",
			BULGARIA: 					"ブルガリア",
			CAMBODIA: 					"カンボジア",
			CANADA: 					"カナダ",
			CAYMAN_ISLANDS: 			"ケイマン諸島",
			CHILE: 						"チリ",
			CHINA: 						"中国",
			COLOMBIA: 					"コロンビア",
			COSTA_RICA: 				"コスタリカ",
			CROATIA: 					"クロアチア",
			CYPRUS: 					"キプロス",
			CZECH_REPUBLIC: 			"チェコ共和国",
			DENMARK: 					"デンマーク",
			DOMINICAN_REPUBLIC: 		"ドミニカ共和国",
			ECUADOR: 					"エクアドル",
			EGYPT: 						"エジプト",
			EL_SALVADOR: 				"エルサルバドル",
			ESTONIA: 					"エストニア",
			ETHIOPIA: 					"エチオピア",
			FAEROE_ISLANDS: 			"フェロー諸島",
			FINLAND: 					"フィンランド",
			FRANCE: 					"フランス",
			FRENCH_GUIANA: 				"仏領ギアナ",
			FRENCH_POLYNESIA: 			"仏領ポリネシア",
			GEORGIA: 					"グルジア",
			GERMANY: 					"ドイツ",
			GREECE: 					"ギリシャ",
			GREENLAND: 					"グリーンランド",
			GRENADA: 					"グレナダ",
			GUADELOUPE: 				"グアドループ島",
			GUAM: 						"グアム",
			GUATEMALA: 					"グアテマラ",
			HAITI: 						"ハイチ",
			HONDURAS: 					"ホンジュラス",
			HONG_KONG: 					"香港",
			HUNGARY: 					"ハンガリー",
			ICELAND: 					"アイスランド",
			INDIA: 						"インド",
			INDONESIA: 					"インドネシア",
			IRAN: 						"イラン",
			IRAQ: 						"イラク",
			IRELAND: 					"アイルランド",
			ISRAEL: 					"イスラエル",
			ITALY: 						"イタリア",
			JAMAICA: 					"ジャマイカ",

			JAPAN: 						"日本",
			JAPAN_1: 					"日本 1",
			JAPAN_2: 					"日本 2",
			JAPAN_3: 					"日本 3",
			JAPAN_4: 					"日本 4",
			JAPAN_5: 					"日本 5",
			JAPAN_6: 					"日本 6",

			JORDAN: 					"ヨルダン",
			KAZAKHSTAN: 				"カザフスタン",
			KENYA: 						"ケニア",

			NORTH_KOREA: 				"北朝鮮",
			KOREA_REPUBLIC: 			"韓国",
			KOREA_REPUBLIC_3: 			"韓国 3",

			KUWAIT: 					"クウェート",
			LATVIA: 					"ラトビア",
			LEBANON: 					"レバノン",
			LIBYA: 						"リビア",
			LIECHTENSTEIN: 				"リーヒシュタイン",
			LITHUANIA: 					"リトアニア",
			LUXEMBOURG: 				"ルクセンブルグ",
			MACAU: 						"マカオ",
			MACEDONIA: 					"マケドニア",
			MALAWI: 					"マラウイ",
			MALAYSIA: 					"マレーシア",
			MALDIVES: 					"モルディブ",
			MALTA: 						"マルタ",
			MARTHINIQUE: 				"マルティニーク島",
			MAURITIUS: 					"モーリシャス",
			MAYOTTE: 					"マヨット島",
			MEXICO: 					"メキシコ",
			MONACO: 					"モナコ",
			MONGOLIA: 					"モンゴル",
			MOROCCO: 					"モロッコ",
			NEPAL: 						"ネパール",
			NETHERLANDS: 				"オランダ",
			NETHERLANDS_ANTILLES: 		"蘭領アンティル諸島",
			
			NEW_ZEALAND: 				"ニュージーランド",
			NICARAGUA: 					"ニカラグア",
			NIGERIA: 					"ナイジェリア",
			NORWAY: 					"ノルウェー",
			NORTHERN_MARIANA_ISLANDS: 	"北マリアナ諸島連邦",
			OMAN: 						"オマーン",
			PAKISTAN: 					"パキスタン",
			PANAMA: 					"パナマ",
			PAPUA_NEW_GUINEA: 			"パプアニューギニア",
			PARAGUAY: 					"パラグアイ",
			PERU: 						"ペルー",
			PHILIPPINES: 				"フィリピン",
			POLAND: 					"ポーランド",
			PORTUGAL: 					"ポルトガル",
			PUERTO_RICO: 				"プエルトリコ",
			QATAR: 						"カタール",
			REUNION: 					"レユニオン島",
			ROMANIA: 					"ルーマニア",
			RUSSIA: 					"ロシア",
			RWANDA: 					"ルワンダ",
			SAMOA: 						"サモア",
			SAUDI_ARABIA: 				"サウジアラビア",
			SINGAPORE: 					"シンガポール",
			SLOVAK_REPUBLIC: 			"スロバキア共和国",
			SLOVENIA: 					"スロベニア",
			SOUTH_AFRICA: 				"南アフリカ",
			SPAIN: 						"スペイン",
			SRI_LANKA: 					"スリランカ",
			SURINAME: 					"スリナム",
			SWEDEN: 					"スウェーデン",
			SWITZERLAND: 				"スイス",
			SYRIA: 						"シリア",
			TAIWAN: 					"台湾",
			TANZANIA: 					"タンザニア",
			THAILAND: 					"タイ",
			TRINIDAD_TOBAGO: 			"トリニダード・トバゴ",
			TUNISIA: 					"チュニジア",
			TURKEY: 					"トルコ",
			UGANDA: 					"ウガンダ",
			UKRAINE: 					"ウクライナ",
			UNITED_ARAB_EMIRATES: 		"アラブ首長国連邦",
			UNITED_KINGDOM: 			"イギリス",
			UNITED_STATES: 				"アメリカ合衆国",
			URUGUAY: 					"ウルグアイ",
			UZBEKISTAN: 				"ウズベキスタン",
			VENEZUELA: 					"ベネズエラ",
			VIETNAM: 					"ベトナム",
			VIRGIN_ISLANDS: 			"バージン諸島 (米国)",
			YEMEN: 						"イエメン",
			ZIMBABWE: 					"ジンバブエ"
		},

		TIME_ZONE: {
			ENIWETOK: 					"(GMT-12:00) エニウェトク島、クワゼリン島", 
			MIDWAY_ISLAND_SAMOA: 		"(GMT-11:00) ミッドウェー諸島、サモア",
			HAWAII: 					"(GMT-10:00) ハワイ",
			ALASKA: 					"(GMT-09:00) アラスカ",
			PACIFIC_TIME: 				"(GMT-08:00) 太平洋標準時",
			MOUNTAIN_TIME: 				"(GMT-07:00) 山地標準時 (米国およびカナダ)",
			CENTRAL_TIME: 				"(GMT-06:00) 中部標準時 (米国およびカナダ)",
			EASTERN_TIME: 				"(GMT-05:00) 東部標準時 (米国およびカナダ)",
			CARACAS:					"(GMT-04:30) カラカス",
			ATLANTIC_TIME: 				"(GMT-04:00) 大西洋標準時 (カナダ)",
			NEWFOUNDLAND: 				"(GMT-03:30) ニューファンドランド",

			BRASILIA_BUENOS_AIRES: 		"(GMT-03:00) ブラジリア、ブエノスアイレス",
			MID_ATLANTIC: 				"(GMT-02:00) 中央大西洋",
			AZORES_CAPE_VERDE_IS: 		"(GMT-01:00) アゾレス諸島、カボベルデ",
			GREENWICH_MEAN_TIME: 		"(GMT) グリニッジ標準時、ダブリン、ロンドン",
			BERLIN_STOCKHOLM: 			"(GMT+01:00) ベルリン、ストックホルム、ローマ、ベルン、ブリュッセル",
			ATHENS_HELSINKI: 			"(GMT+02:00) アテネ、ヘルシンキ、東ヨーロッパ、イスラエル",
			BAGHDAD_KUWAIT: 			"(GMT+03:00) バグダッド、クウェート、ナイロビ、リヤド、モスクワ",

			TEHERAN: 					"(GMT+03:30) テヘラン",

			ABU_DHABI: 					"(GMT+04:00) アブダビ、マスカット、カザン、ボルゴグラード",

			KABUL: 						"(GMT+04:30) カブール",

			ISLAMABAD_KARACHI: 			"(GMT+05:00) イスラマバード、カラチ、エカテリンブルク",

			MADRAS_CALCUTTA: 			"(GMT+05:30) マドラス、カルカッタ、ボンベイ、ニューデリー",
			KATMANDU: 					"(GMT+05:45) カトマンズ",

			ALMA_ATA_DHAKA: 			"(GMT+06:00) アルマアタ、ダッカ",
			RANGOON: 					"(GMT+06:30) ラングーン",

			BANGKOK_JAKARTA_HANOI: 		"(GMT+07:00) バンコク、ジャカルタ、ハノイ",
			BEIJING_HONGKONG: 			"(GMT+08:00) 北京、香港、パース、シンガポール",
			TOKYO_OSAKA_SAPPORO: 		"(GMT+09:00) 東京、大阪、札幌、ソウル、ヤクーツク",

			ADELAIDE: 					"(GMT+09:30) アデレード",

			BRISBANE_CANBERRA: 			"(GMT+10:00) ブリスベン、キャンベラ、メルボルン、シドニー",
			MAGADAN_SOLOMAN_IS: 		"(GMT+11:00) マガダン、ソロモン諸島、ニュー・カレドニア",
			FIJI_KAMCHATKA: 			"(GMT+12:00) フィジー諸島、カムチャッカ、オークランド",
			NUKU: 						"(GMT+13:00) ヌークアロファ"
		},

		APPLIST:{
			APP:						"アプリケーション",
			GAME:						"ゲーム",
			QQ:							"QQ",
			MSN:						"MSN",
			LINE:						"LINE",
			Skype:                      "Skype",
			PPStream: 					"PPStream",
			SIP:  						"SIP",
			PPTC: 						"PPTC", 
			H323: 						"H323",
			HTTPFD: 					"HTTPFD",
			PPTP: 						"PPTP",
			L2TP:  						"L2TP",
			IPSec:                      "IPSec",
			IMAP: 						"IMAP",
			xl_others:  				"xl_others",
			Vonage:  					"Vonage",
			netTalk:  					"netTalk",
			iTalkBB: 					"iTalkBB",
			HTTP: 						"HTTP",
			MMS:  						"MMS",
			RTSP:                       "RTSP",
			WOW:						"WOW",
			LOL:						"LOL",
			SSH:						"SSH",
			TELNET:						"Telnet",
			VPN:						"VPN",
			FTP:						"FTP",
			WWW:						"WWW",
			DNS:						"DNS",
			ICMP:						"ICMP",
			SMTP:						"SMTP",
			NNTP:						"NNTP",
			POP3:						"POP3",
			HTTPS:  					"HTTPS",


			END:						""
		},

		DATE: {
			DAY: 						"曜日",

			MONDAY: 					"月曜日",
			TUESDAY: 					"火曜日",
			WEDNESDAY: 					"水曜日",
			THURSDAY: 					"木曜日",
			FRIDAY: 					"金曜日",
			SATURDAY: 					"土曜日",
			SUNDAY: 					"日曜日",
			
			MON: 						"月",
			TUES: 						"火",
			WED: 						"水",
			THUR: 						"木",
			FRI: 						"金",
			SAT: 						"土",
			SUN: 						"日",

			JAN: 						"1月",
			FEB: 						"2月",
			MAR: 						"3月",
			APR: 						"4月",
			MAY: 						"5月",
			JUN: 						"6月",
			JUL: 						"7月",
			AUG: 						"8月",
			SEP: 						"9月",
			OCT: 						"10月",
			NOV: 						"11月",
			DEC: 						"12月"

		},

		HOUR: {
			AM_1: 						"1 AM",
			AM_2: 						"2 AM",
			AM_3: 						"3 AM",
			AM_4: 						"4 AM",
			AM_5: 						"5 AM",
			AM_6: 						"6 AM",
			AM_7: 						"7 AM",
			AM_8: 						"8 AM",
			AM_9: 						"9 AM",
			AM_10: 						"10 AM",
			AM_11: 						"11 AM",
			AM_12: 						"12 AM",
			PM_1: 						"1 PM",
			PM_2: 						"2 PM",
			PM_3: 						"3 PM",
			PM_4: 						"4 PM",
			PM_5: 						"5 PM",
			PM_6: 						"6 PM",
			PM_7: 						"7 PM",
			PM_8: 						"8 PM",
			PM_9: 						"9 PM",
			PM_10: 						"10 PM",
			PM_11: 						"11 PM",
			PM_12: 						"12 PM"
		},

		ORDER: {
			"1ST": 						"1",
			"2ND": 						"2",
			"3RD": 						"3",
			"4TH": 						"4",
			"5TH": 						"最後",
			"1ST_": 					"1st",

			TH: 						"番目"
		},

		GRID: {
			CLIENT_NUMBER: 				"クライアント総数",

			ID: 						"ID",
			MODIFY: 					"変更",
			STATUS: 					"ステータス",
			ENABLE: 					"有効",

			OPERATION: 					"動作",
			CHOOSE: 					"選択",
			DESCRIPTION: 				"説明",
			

			AUTO_REFRESH: 				"自動更新",
			REFRESH: 					"更新",
			NUMBER: 					"数字",
			ENABLED: 					"有効",
			DISABLED: 					"無効",
			ACTIVE: 					"アクティブ",
			SELECTED: 					""
		},

		OPERATION: {
			ADD: 						"追加",
			CHOOSE: 					"選択",
			EDIT: 						"編集",
			DELETE: 					"削除",
			DELETE_ALL: 				"すべて削除",
			REMOVE: 					"削除",
			RESET: 						"リセット",
			RESET_ALL: 					"すべてリセット",
			DETECT: 					"検出",
			ENABLE: 					"有効",
			DISABLE: 					"無効",
			PAUSE:						"一時停止",
			RESUME:						"再開",
			
			REFRESH: 					"更新",
			SEARCH: 					"検索...",
			BROWSE: 					"参照",

			SAVE: 						"保存",
			BACK: 						"戻る",

			PREV: 						"前へ",
			NEXT: 						"次へ",
			FINISH: 					"終了",
			
			ON: 						"オン",
			OFF: 						"オフ",
			LOW: 						"低",
			MIDDLE: 					"中",
			HIGH: 						"高",
			
			OK: 						"OK",
			CANCEL: 					"キャンセル",

			YES: 						"はい",
			NO: 						"いいえ",
			
			CONNECTED: 					"接続しました",
			CONNECTING: 				"接続中",
			DISCONNECTING: 				"切断中",
			DISCONNECTED: 				"未接続",

			PASSWORD_HINT: 				"パスワード",
			FILEBUTTONTEXT: 			"参照",
			FILEBLANKTEXT: 				"ファイルを選択してください。",
			NOSELECTEDTEXT: 			"-選択してください-",

			ADD_A_NEW_KEYWORD: 			"新しいキーワードの追加",

			SUCCESSED: 					"正常完了!",
			FORM_SAVED: 				"保存",
			FORM_FAILED: 				"失敗",
			GRID_ID_COLUMN: 			"ID",
			GRID_SAVED: 				"保存",
			GRID_FAILED: 				"失敗",
			GRID_NONE_SELECT: 			"少なくとも 1 つのエントリを選択してください。",
			GRID_DELETE_COMFIRM: 		"選択されたエントリを削除してよろしいですか?",
			GRID_DELETE_ALL_COMFIRM: 	"すべてのエントリを削除してよろしいですか?",
			GRID_MAX_RULES: 			"エントリの最大数を超えました。",
			KEYWORD_MAX_OVERFLOW: 		"キーワード数が制限に達しました。",

			NOTE: 						"注:"
		},
		
		VTYPETEXT: {
			INVALIDTEXT: 				"無効な形式です。",
			BLANKTEXT: 					"このフィールドは必須です。",

			EMAIL: 						"無効なメール形式です。",
			NUMBER: 					"無効な形式です。",

			NUMBER_MIN: 				"この数字は %min より大きい値でなければなりません。",
			NUMBER_MAX: 				"この数字は %max 未満でなければなりません。",

			NUMBER_MIN_MAX: 			"この数字は %min ～ %max でなければなりません。",
			HEX: 						"このフィールドは 16 進数でなければなりません。",

			IP: 						"無効な形式です。",

			IP_NO_ALL_ZERO:				"アドレスは 0.0.0.0 にできません。",
			IP_NO_LOOP:					"アドレスはループバック アドレスにできません。",
			IP_NO_D_TYPE:				"IP アドレスはクラス D アドレスにできません。",
			IP_NO_E_TYPE:				"IP アドレスはクラス E アドレスにできません。",
			IP_NO_ALL_ONE:				"アドレスは 255.255.255.255 にできません。",
			IP_NO_FIRST_ALL_ONE:		"アドレスを 255 で始めることはできません。",
			IP_NO_FIRST_ZERO:			"アドレスを 0 で始めることはできません。",
			MASK_NO_ALL_ONE:			"サブネット マスクは 255.255.255.255 にできません。",

			IPV6: 						"無効な形式です。",
			IPV6_NOT_GLOBAL:			"無効な形式です。",
			IPV6_NOT_PREFIX:			"無効な形式です。",
			IP_DOMAIN: 					"無効な形式です。",
			IPV6_DOMAIN: 				"無効な形式です。",
			PPTP_INVALID_IP:			"IP アドレスが無効です。",
			MAC: 						"無効な形式です。",
			MULTI_MAC:					"無効な形式です。",
			MAC_INVALID_BROADCAST:		"MAC をブロードキャスト アドレスにすることはできません。",
			MAC_INVALID_MULTICAST:		"MAC をマルチキャスト アドレスにすることはできません。",
			DATE: 						"無効な形式です。",
			DATE_INVALID: 				"01/01/1970 から 12/31/2030 までの有効な日付を入力してください。",
			MASK: 						"無効な形式です。",
			DOMAIN: 					"無効な形式です。",
			STRING_DOMAIN:              "無効な形式です。",
			USER: 						"無効な形式です。",
			NOTE: 						"無効な形式です。",
			PWD: 						"無効な形式です。",
			SSID: 						"無効な形式です。",
			NAME:						"無効な形式です。",
			ASCII_VISIBLE:				"無効な形式です。",
			STRING_VISIBLE:				"無効な形式です。",
			STRING_VISIBLE_NO_COMMA:    "無効な形式です。",
			STRING_VISIBLE_ALLOW_BLANK: "無効な形式です。",
			VPN_NAME_PWD: 				"1 ～ 15 文字の英数字および _ を入力してください。"
		},


		ERROR: {			
			"00000001":					"ファイル タイプが無効です。",
			"00000002":					"チェックサム エラー。",
			"00000003":					"ファイルが大きすぎます。",
			"00000004":					"アップロード エラー。",
			"00000005":					"再起動エラー。",
			"00000006":					"不明なエラー。",
			"00000007":					"この項目は既に存在します。入力しなおしてください。",

			"00000009":					"無効なポートです。",
			"00000010":					"ポートは数字でなければなりません。",

			"00000011":					"ユーザー名を [差出人] フィールドの値と同じにすることはできません。",
			"00000012": 				"ユーザー名はアルファベット文字で開始しなければなりません。",

			"00000021":					"無効な形式です。",

			"00000032": 				"値は、[低] 未満でなければなりません。",
			"00000033": 				"値は、[中] および [低] 未満でなければなりません。",
			"00000034": 				"無効な値です。5 ～ 7200 までの数字を入力してください。",

			"00000039": 				"既定値 0 を使用するか、30 ～ 86400 の値を入力してください。",
			"00000040": 				"SSID と MAC アドレスは必須です。",

			"00000042": 				"既定値 80 を使用するか、1024 ～ 65535 の値を入力してください。",

			"00000045": 				"デフォルト ゲートウェイと　LAN IP アドレスを同じサブネット内にすることはできません。もう一度入力してください。",

			"00000046": 				"IP アドレスと MAC アドレスを NULL にすることはできません。もう一度入力してください。",
			"00000047": 				"IP アドレスと　LAN IP アドレスを同じサブネット内にすることはできません。もう一度入力してください。",

			
			"00000049":					"宛先ネットワークが無効です。",

			"00000050": 				"DNS サーバー IP アドレスが無効です。入力しなおしてください。",
			"00000051": 				"この MAC アドレスは既に存在します。入力しなおしてください。",
			"00000052": 				"この IP アドレスは既に存在します。入力しなおしてください。",

			"00000053": 				"開始アドレスは終了アドレスより大きくてはなりません。<br/>もう一度入力してください。",

			"00000054": 				"IP アドレス プールと　LAN IP アドレスを同じサブネット内にすることはできません。入力しなおしてください。",

			"00000055": 				"IP アドレスを LAN アドレスと同じにすることはできません。",

			"00000056": 				"リモート IP アドレスと現在の　LAN IP アドレスを同じサブネット内にすることはできません。入力しなおしてください。",

			"00000057": 				"PSK パスワードが無効です。もう一度入力してください。",
			"00000058": 				"WEP パスワードが無効です。もう一度入力してください。",

			"00000059": 				"IP アドレスとサブネット マスクが無効です。有効な値を入力してください。",

			"00000060": 				"WAN IP アドレスと LAN IP アドレスを同じサブネット内にすることはできません。<br/>入力しなおしてください。",

			"00000061": 				"開始時間は終了時間より前でなければなりません。",

			"00000062": 				"このフィールドは必須です。",
			"00000063": 				"このフィールドは必須です。",

			"00000064": 				"ホスト MAC アドレスはブロックできません。",
			"00000065": 				"この項目は、既存の項目と競合しています。もう一度実行してください。",
			
			"00000066": 				"パスワードは 8 ～ 63 文字か、64 桁の 16 進数でなければなりません。",
			"00000067": 				"パスワードは 10 桁の 16 進数でなければなりません。",
			"00000068": 				"パスワードは 5 文字の ASCII 文字でなければなりません。",
			"00000069": 				"パスワードは 26 桁の 16 進数でなければなりません。",
			"00000070": 				"パスワードは 13 文字の ASCII 文字でなければなりません。",
			"00000071": 				"パスワードは 32 桁の 16 進数でなければなりません。",
			"00000072": 				"パスワードは 16 文字の ASCII 文字でなければなりません。",
			"00000073": 				"パスワードは 64 文字未満でなければなりません。",

			"00000074": 				"ファイル タイプが無効です。",

			"00000075": 				"PIN は 8 桁でなければなりません。",

			"00000076": 				"エントリは、既存の項目と競合しています。トリガー ポートとトリガー プロトコルを確認してください。",
			"00000077": 				"IP アドレスを LAN アドレスと同じにすることはできません。もう一度入力してください。",
			"00000078": 				"ホスト IP アドレスを LAN アドレスと同じにすることはできません。もう一度入力してください。",

			"00000080": 				"パスワードが一致しません。もう一度実行してください。",

			"00000083": 				"ゲートウェイは IP と同じにすることはできません。",
			"00000084": 				"プライマリ DNS は IP と同じにすることはできません。",
			"00000085": 				"セカンダリ DNS は IP と同じにすることはできません。",
			"00000086": 				"プライマリ DNS はセカンダリ DNS と同じにすることはできません。",

			"00000088": 				"この操作は、リモート管理では許可されていません。",
			"00000089": 				"最大ログイン試行数 %num 回を超えました。2 時間後にもう一度実行してください。",

			"00000090": 				"宛先を LAN IP アドレスにすることはできません。",
			"00000091": 				"宛先を WAN IP アドレスにすることはできません。",

			"00000092": 				"IP アドレスと　LAN IP アドレスを同じサブネット内にすることはできません。<br/>もう一度入力してください。",
			"00000093": 				"IP アドレスと　WAN IP アドレスを同じサブネット内にすることはできません。<br/>もう一度入力してください。",

			"00000094": 				"VLAN ID を同じにすることはできません。",
			"00000095": 				"少なくとも 1 つのインターネット ポートが必要です。",

			"00000096": 				"このキーワードは既に存在します。",

			"00000097": 				"2.4GHz 周波数帯域に対する設定は、Wi-Fi ボタンがオンになるまで有効になりません。",
			"00000098": 				"5GHz 周波数帯域に対する設定は、Wi-Fi ボタンがオンになるまで有効になりません。",
			"00000099": 				"2.4GHz および 5GHz 周波数帯域に対する設定は、Wi-Fi ボタンがオンになるまで有効になりません。",

			"00000100": 				"5GHz ネットワークは、お住まいの地域/国の制限により利用できません。",
			"00002100": 				"60GHz ネットワークは、お住まいの地域/国の制限により利用できません。",

			"00000101": 				"ワイヤレス機能がオフになっています。この機能を使用する場合は、Wi-Fi ボタンをオンにしてください。",
			"00000102": 				"ワイヤレス機能がオフになっています。この機能を使用する場合は、Wi-Fi ボタンをオンにしてください。",
			"00002102": 				"ワイヤレス機能がオフになっています。この機能を使用する場合は、Wi-Fi ボタンをオンにしてください。",

			"00000103": 				"ワイヤレス機能がオフになっています。この機能を使用する場合は、Wi-Fi ボタンをオンにしてください。",
			"00000104": 				"ワイヤレス機能が無効になっています。",

			"00000105": 				"QoS と IPTV を同時に有効にすることはできません。",

			"00000106": 				"IP アドレスを LAN IP アドレスと同じにすることはできません。",
			
			"00000107": 				"この宛先は既に存在します。",

			"00000110": 				"IP アドレスと　LAN IP アドレスを同じサブネット内にすることはできません。",
			
			"00000111": 				"QoS と <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT ブースト</a> を同時に有効にすることはできません。",
			"00000112": 				"WDS 機能は 2.4GHz または 5GHz 帯域のいずれかで動作できます。また、ゲスト ネットワークは WDS 帯域では利用できません。",
			"00000113": 				"WDS とゲスト ネットワークを同時に有効にすることはできません。",
			"00000114": 				"トラフィック統計と <a onclick=\"$.su.menu.advanced.goTo('system-parameters');\" src=\"void(0)\">NAT ブースト</a>を同時に有効にすることはできません。",

			"00000117": 				"このドメイン名は既に存在します。",
			"00000118": 				"ドメイン名の数が制限に達しました。",
			"00000119":					"NAT ブーストは、<a onclick=\"$.su.menu.advanced.goTo('qos_settings');\" src=\"void(0)\">QoS</a> または<a onclick=\"$.su.menu.advanced.goTo('sysstatistics');\" src=\"void(0)\">トラフィック統計</a>のいずれかを有効にすると、無効になります。",

			"00000120": 				"パスワードは 5 文字または 13 文字の ASCII 文字でなければなりません。",
			"00000121": 				"パスワードは 10 桁または 26 桁の 16 進数でなければなりません。",
			"00000122": 				"ユーザー名またはパスワードが空です。続行してよろしいですか?",
			"00000123": 				"保存中...<br/>処理中は操作しないでください。",
			"00000124": 				"誤った　PIN で繰り返し接続されたため、ルーターの PIN がロックされました。新しいものを生成してください。",

			"00000125": 				"QoS ルールの数が制限を超えました。",
			"00000126": 				"ファイル サイズが制限を超えました。",
			"00000127": 				"ファイルの内容が正しくありません。",
			"00000128": 				"少なくとも 1 つのアプリケーションを選択してください。",
			"00000129": 				"少なくとも 1 つの物理ポートを選択してください。",
			"00000130":					"WPS 機能が無効になっています。",
			"00000131": 				"NTP サーバーはループバック アドレスにできません。",
			"00000132": 				"モードの切り替えが失敗しました。あとでもう一度実行するか、ルーターを再起動してください。",
			"00000133": 				"DMZ ホスト IP アドレスが無効です。有効な値を入力してください。",
			"00000134":  				"内部 IP が無効です。有効な値を入力してください。",
			"00000135": 				"ファームウェア ファイル エラー。",
			"00000136": 				"バックアップ ファイル エラー。",
			"00000137": 				"IP アドレスが無効です。有効な値を入力してください。",
			"00000139": 				"パスワード復元のパラメーターが正しくありません。",
			"00000140": 				"コードが正しくありません。",
			"00000141": 				"パスワード復元が無効になっています。",
			"00000142": 				"コードを送信できませんでした。インターネット接続を確認してください。",
			"00000143": 				"メール アドレスが無効です。",
			"00000144": 				"メール メッセージが無効です。",
			"00000145": 				"ホストが見つかりません。",
			"00000146": 				"認証が失敗しました。",
			"00000147": 				"ポートは 1 ～ 65535 でなければなりません。",
			"00000148": 				"ポート範囲は、開始ポート番号が終了ポート番号より小さい値でなければなりません。もう一度入力してください。",
			"00000149": 				"ポート番号が重複しています。もう一度入力してください。",
			
			"00000150": 				"パスが存在しません。",
			"00000151": 				"割り当てパスが設定されていません。",
			"00000152": 				"このパスには何らかの問題があります。",
			"00000153": 				"ボリュームが見つかりません。",
			"00000154": 				"USB デバイスがありません。",
			
			"00000155": 				"PPTP VPN クライアント IP アドレスと LAN IP アドレスを同じサブネット内にすることはできません。<br/>入力しなおしてください。",
			"00000156": 				"PPTP VPN クライアント IP アドレスと OpenVPN クライアント IP アドレスを同じサブネット内にすることはできません。<br/>入力しなおしてください。",

			"00000222":  				"最大エントリ数に達しました。",
			"00000231": 				"エントリが重複しています。",
			"00000232": 				"URL が無効です。",
			"00000233":					"少なくとも 1 日を選択してください。",

			"00000301": 				"共有フォルダー エントリーが最大数に達しました。",
			"00000302": 				"ボリューム内の共有フォルダー エントリーが最大数に達しました。",
			"00000303": 				"共有フォルダー パスが重複しています。",
			"00000304": 				"共有フォルダー名が重複しています。",

			"00001000":					"アップグレード操作が実行中です。お待ちください。",
			"00001001": 				"WDS 機能は 2.4GHz または 5GHz 帯域のいずれかで動作できます。",
			"00001002":					"コードが正しくありません。",

			"00001123": 				"入力されたアプリケーション ルール項目が null です。少なくとも　1 つのルール項目を入力してください。",
			"00001124": 				"入力された物理ポート　ルール項目が null です。少なくとも　1 つのルール項目を選択してください。 ",

            "00002000": 				"この項目は ISP 指定の静的経路指定と競合しています。続行してよろしいですか?",

            "00003000":                 "IPv6 パススルーが IPTV　と競合しています。この機能を使用する場合は、IPTV 設定をオフにしてください。",
			"00004139": 				"インターネット接続がありません",
			//"00004139": 				"Please activate this account by checking the email we sent you first.",
			"00004140": 				"リクエストがタイムアウトしました。インターネット接続を確認して、あとでもう一度実行してください。",
			"00004141": 				"不明なエラー。",
			"00004142": 				"確認コードが正しくありません。",
			"00004143": 				"パスワードが無効です。",
			"00004144": 				"このユーザー名は既に存在します。",
			"00004145": 				"パスワードが無効です。",//new password
			"00004146": 				"このデバイスをバインド解除できません。あとでもう一度実行してください。",
			"00004147": 				"このデバイスは他のアカウントにバインドされています。",
			"00004148": 				"入力が無効です。",
			"00004149": 				"このドメイン名は既に存在します。",
			"00004150": 				"ファームウェアをダウンロードできません。インターネット接続を確認して、あとでもう一度実行してください。",
			"00004151": 				"同じクラウド アカウントから登録できるドメイン名は 1000 件までです。",
			"00004152": 				"このデバイスは他のドメイン名にバインドされています。",
			"00004153": 				"このドメイン名は他のデバイスにバインドされています。",
			"00004154": 				"サーバーからの応答がありません。あとでもう一度実行してください。",
			"00004155": 				"このアカウントは存在ません。",
			"00004156": 				"クラウド アプリケーションを開始できません。このデバイスを再起動して、あとでもう一度実行してください。",
			"00004157": 				"クラウド サーバーに接続できません。インターネット接続を確認して、あとでもう一度実行してください。",
			"00004158": 				"WAN ポートが未接続です。",
			"00004159": 				"インターネットに接続できません。サービス プロバイダーに問い合わせるか、あとでもう一度実行してください。 ",
			"00004160": 				"DHCP サーバーから IP アドレスを取得できません。WAN 接続タイプを確認して、あとでもう一度実行してください。",
			"00004161": 				"PPPoE 認証が失敗しました。ユーザー名とパスワードを確認してください。",
			"00004162": 				"PPPoE サーバーに接続できません。",
			"00004164": 				"PPTP 認証が失敗しました。ユーザー名とパスワードを確認してください。",
			"00004165": 				"PPTP サーバーに接続できません。",
			"00004167": 				"L2TP 認証が失敗しました。ユーザー名とパスワードを確認してください。",
			"00004168": 				"L2TP サーバーに接続できません。",
			"00004169": 				"不明なエラー。あとでもう一度実行してください。",
			"00004170": 				"WAN ポートが未接続です。",
			"00004171": 				"インターネット接続がありません。",
			"00004172": 				"接続できませんでした。",
			"00004173": 				"ユーザー名またはパスワードが正しくありません。",
			"00004174": 				"無効なメール形式です。",
			"00004175": 				"無効なユーザー名形式です。",
			"00004176": 				"このメールは既に存在します",
			"00004177": 				"アカウント情報にアクセスできません。ページを更新してください。",
			"00004178":   				"システム エラーです。ページを更新して、もう一度実行してください。",
			"00004179":   				"このデバイスをバインド解除できません。あとでもう一度実行してください。",
			"00004180":   				"このデバイスは、クラウド アカウントからバインド解除されています。ご使用のアカウントでもう一度ログインして、デバイスとアカウントをバインドしてください。",
			"00004181":   				"このデバイスはオフラインです。インターネット接続を確認してください。",
			"00004182":   				"メールを送信できません。インターネット接続を確認して、もう一度実行してください。",
			"00004183":   				"アカウントには文字が含まれていなければなりません。 ",
			"00004184":   				"パスワードを 20 回誤って入力しました。2 時間後にもう一度実行してください。",
			"00004185":   				"確認コードを 1 時間で 10 回取得しました。24 時間後にもう一度実行してください。",
			"00004186":   				"申し訳ありません。アカウントをアクティブにできません。確認メールをもう一度送信してください。",
			"00004187":   				"申し訳ありません。リンクが期限切れになりました。確認メールをもう一度送信してください。",
			"00004188":   				"申し訳ありません。リンクが期限切れになりました。メールをもう一度送信してください。",
			"00004189":   				"申し訳ありません。パスワードをリセットできません。メールをもう一度送信してください。",
			"00004190":   				"",
			"00004191":   				"",
			"00004192": 				"ファームウェア アップグレード エラー。",
			"99999999":					""
		},

		MENU: {
			STATUS: 					"ステータス",
			NETWORK: 					"ネットワーク",
			NETWORK_MAP: 				"ネットワーク マップ",
			INTERNET: 					"インターネット",

			LAN: 						"LAN",
			IPTV:                       "IPTV",
			DHCP_SERVER: 				"DCHP サーバー",
			DYNAMIC_DNS: 				"動的 DNS",
			ADVANCED_ROUTING: 			"詳細経路指定",

			WIRELESS: 					"ワイヤレス",
			WIRELESS_SETTINGS: 			"ワイヤレス設定",
			WDSBRIDGING: 				"WDS ブリッジング",
			WPS: 						"WPS",
			MACFILTERING: 				"MAC フィルタリング",
			WIRE_STATISTICS: 			"統計",
			
			
			GUEST_NETWORK: 				"ゲスト ネットワーク",
			WIRELESS_SETTINGS: 			"ワイヤレス設定",
			STORAGE_SHARING: 			"ストレージ共有",
			NAT_FORWARDING: 			"NAT 転送",
			NAT: 						"ALG",
			VIRTUAL_SERVERS: 			"仮想サーバー",
			PORT_TRIGGERING: 			"ポート トリガー",
			DMZ: 						"DMZ",
			UPNP: 						"UPnP",
			ALG: 						"ALG",
			
			USB_SETTINGS: 				"USB 設定",
			BASIC_SET: 					"基本設定",
			DISK_SET: 					"デバイス設定",
			FOLDER_SHARING: 			"共有アクセス",
			STORAGE_SHARING: 			"ストレージ共有",
			FTP_SERVER: 				"FTP サーバー",
			MEDIA_SERVER: 				"メディア サーバー",
			PRINT_SERVER: 				"印刷サーバー",
			G3_G4: 						"3G/4G",
			OFFLINE_DOWNLOAD: 			"オフライン ダウンロード",
			
			PARENTAL_CONTROL: 			"保護者による制限",

			QOS:  						"QoS",
			DATABASE:  					"データベース",

			STREAMBOOST: 				"ストリーム ブースト",
			MAP: 						"マップ",
			SB_MAP: 					"マップ",
			SB_BANDWIDTH:  				"帯域幅",
			SB_PRIORITY: 				"優先度",
			SB_STATISTICS: 				"統計",

			
			SECURITY: 					"セキュリティ",
			SETTINGS: 					"設定",
			ACCESS_CONTROL: 			"アクセス コントロール",
			IP_MAC_BINDING: 			"IP & MAC バインディング",

			IPV6: 						"IPv6",
			
			
			SYSTEM_TOOLS: 				"システム ツール",
			TIME_SETTINGS: 				"時刻設定",
			DIAGNOSTIC: 				"診断",
			FIRMWARE_UPGRADE: 			"ファームウェア アップグレード",
			BACKUP_RESTORE: 			"バックアップおよび復元",
			ADMINISTRATION: 			"管理",
			SYSTEM_LOG: 				"システム ログ",
			STATISTICS: 				"トラフィック統計",
			SYSTEM_PARAMETERS: 			"システム パラメーター",
			VPN: 						"VPN サーバー",
			OPEN_VPN: 					"OpenVPN",
			PPTP_VPN: 					"PPTP VPN",
			VPN_CONNECTIONS: 			"VPN 接続"
		},

		QUICK_SETUP: {
			REGION_TIME_ZONE: 			"地域とタイム ゾーン",
			INTERNET_CONNECTION_TYPE: 	"インターネット接続タイプ",
			WIRELESS_SETTINGS: 			"ワイヤレス設定",
			SUMMARY: 					"要約",
			SETUP_COMPLETE: 			"インターネット接続のテスト",

			EXIT: 						"終了",
			NEXT: 						"次へ",
			SAVE: 						"保存",
			FINISH: 					"終了",
			OK: 						"OK",
			NONE: 						"検出が失敗しました。",

			REGION: 					"地域",
			TIME_ZONE: 					"タイム ゾーン",
			NO_SELECT: 					"-選択してください-",

			AUTO_DETECT: 				"自動検出",
			DYNAMIC_IP: 				"動的 IP",
			STATIC_IP: 					"静的 IP",
			PPPOE: 						"PPPoE",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			INTERNET_CONNECTION_TYPE_NOTE: "使用しているインターネット接続タイプがわからない場合は、自動検出を使用するか、インターネット サービス プロバイダー (ISP) に問い合わせてください。",

			DYNAMIC_IP_INFO: 			"ISP が特定の MAC アドレスに対してのみインターネット アクセスを許可している場合は、プライマリ コンピューターの MAC アドレスをクローンする必要があります。不明な場合は、[<strong>MAC アドレスをクローンしない</strong>] を選択してください。",
			MAC_CLONE_NO: 				"MAC アドレスをクローンしない",
			MAC_CLONE_YES: 				"現在のコンピューターの MAC アドレスをクローン",
			MAC_CLONE_NOTE: 			"[MAC アドレスをクローン] を選択する場合は、ISP に登録されている元のコンピューターの MAC アドレスをクローンする必要があります。",

			PPPOE_INFO: 				"PPPoE ユーザー名とパスワードを入力してください。",
			
			STATIC_IP_INFO: 			"IP 情報を入力してください。",

			L2TP_INFO: 					"L2TP ユーザー名とパスワードを入力してください。",
			PPTP_INFO: 					"PPTP ユーザー名とパスワードを入力してください。",
			
			USERNAME: 					"ユーザー名",
			PASSWORD: 					"パスワード",
			SERVER_IP_ADDRESS_NAME: 	"VPN サーバー IP/ドメイン名",
			IP_ADDRESS: 				"IP アドレス",
			SUBNET_MASK: 				"サブネット　マスク",
			DEFAULT_GATEWAY: 			"デフォルト ゲートウェイ",
			PRIMARY_DNS: 				"プライマリ DNS",
			SECOND_DNS: 				"セカンダリ DNS",
			OPTIONAL: 					"(オプション)",
			
			ON: 						"オン",
			OFF: 						"オフ",
			WIRELESS_24GHZ: 			"2.4GHz ワイヤレス",
			WIRELESS_5GHZ: 				"5GHz ワイヤレス",
			WIRELESS_60GHZ: 				"60GHz ワイヤレス",
			ENABLE_WIRELESS_RADIO: 		"ワイヤレス ラジオを有効にする",
			NAME_SSID: 					"ネットワーク名 (SSID)",

			SUMMARY_INFO1: 				"[<strong>次へ</strong>] ボタンをクリックする前に、ワイヤレス デバイスを新しいワイヤレス ネットワークに再接続する必要があります。",
			SUMMARY_INFO2: 				"ワイヤレス名とパスワードは以下のとおりに変更されました:",
			SUMMARY_INFO3: 				"新しいワイヤレス ネットワークに接続されていることを確認してください。",

			WIRELESS_24GHZ_SSID: 		"ワイヤレス 2.4GHz SSID",
			WIRELESS_24GHZ_PASSWORD: 	"ワイヤレス 2.4GHz パスワード",
			WIRELESS_5GHZ_SSID: 		"ワイヤレス 5GHz SSID",
			WIRELESS_5GHZ_PASSWORD: 	"ワイヤレス 5GHz パスワード",
			WIRELESS_60GHZ_SSID: 		"ワイヤレス 60GHz SSID",
			WIRELESS_60GHZ_PASSWORD: 	"ワイヤレス 60GHz パスワード",

			SORRY: 						"失敗しました。",
			SUCCESS: 					"正常完了!",
			TEST_INTERNET_SUCCESS_INFO: "クイック セットアップ プロセスを終了するには、[終了] をクリックします。",

			TEST_INTERNET_FAILED_INFO_0:"すべてのクイック セットアップ パラメーターが正しいことを確認して、もう一度実行してください。すべてのクイック セットアップ パラメーターが正しい場合は、モデムを再起動して、2 分待ってから、もう一度 [インターネット接続のテスト] をクリックしてください。モデムを使用していない場合は、インターネット サービス プロバイダー (ISP) への問い合わせが必要になる場合があります。",
			SUMMARY_INFO4: 				"申し訳ありません。ワイヤレス デバイスが新しいワイヤレス ネットワークに再接続されていないことを検出しました。もう一度実行して、[<strong>OK</strong>]　をクリックしてください。",
                                         
			CONGRATULARIONS: 			"お疲れ様でした。",
			COMPLETE_INFO_0: 			"クイック セットアップ プロセスが完了しました。",
			COMPLETE_INFO_1:			"以下の [インターネット接続のテスト] をクリックしてから、[終了] をクリックしてください。",
			TEST_INTERNET: 				"インターネット接続のテスト",

			
			RESET_USER_TITLE: 			"新しいユーザー名とパスワードの設定",
			NEW_USERNAME: 				"新しいユーザー名",
			NEW_PASSWORD: 				"新しいパスワード",
			CONFIRM_PASSWORD: 			"新しいパスワードの確認",
			CONFIRM: 					"確認"
		},
		
		BASIC_NETWORK:{
			INTERNET: 					"インターネット",
			INTERNET_STATUS:			"インターネット ステータス",

			GHZ24: 						"2.4GHz",
			GHZ5: 						"5GHz",
			GHZ60: 						"60GHz",
			
			CONNECTION_TYPE: 			"接続タイプ",
			SECONDARY_CONN: 			"セカンダリ接続",

			POOR_CONNECTED: 			"ネットワークが不安定です。",
			UNPLUGGED: 					"WAN ポートが未接続です。",
			
			CONNECTED: 					"接続しました",
			DISCONNECTED: 				"切断されました",
			CONNECTING: 				"接続中",

			INTERNET_IP_ADDR: 			"IP アドレス",
			
			IP_ADDR: 					"IP アドレス",
			MAC_ADDR: 					"MAC アドレス",
			GATEWAY: 					"ゲートウェイ",

			AUTO: 						"自動",
			
			ROUTER: 					"ルーター",
			WIRELESS_CLIENTS: 			"ワイヤレス クライアント",
			HOST_CLIENTS: 				"ホスト クライアント",
			GUEST_CLIENTS: 				"ゲスト クライアント",
			WIRE_CLIENTS: 				"有線クライアント",
			PRINTER: 					"プリンター",
			USB_DISK: 					"USB ディスク",
			WIRELESS: 					"ワイヤレス",
			NAME: 						"名前",
			
			

			SSID: 						"SSID",
			CHANNEL: 					"チャンネル",
			MAC: 						"MAC",
			
			WIRELESS_24GHZ: 			"2.4GHz ワイヤレス",
			WIRELESS_5GHZ: 				"5GHz ワイヤレス",
			WIRELESS_60GHZ:				"60GHz ワイヤレス",
			
			GUEST_24GHZ: 				"2.4GHz ゲスト ネットワーク",
			GUEST_5GHZ: 				"5GHz ゲスト ネットワーク",
			
			STATUS: 					"ステータス",
			TOTAL: 						"合計",
			AVAILABLE: 					"使用可能",
			GB: 						"GB",
			BRAND: 						"ブランド",

			DYNAMIC_IP: 				"動的 IP",
			STATIC_IP: 					"静的 IP",
			SUBNET_MASK: 				"サブネット　マスク",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"BigPond ケーブル",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"6to4 トンネル",
			NONE: 						"なし"
		},
		
		BASIC_INTERNET: {
			TITLE: 						"インターネット",
			AUTO_DETECT: 				"自動検出",
			INTERNET_CONN_TYPE: 		"インターネット接続タイプ",
			DYNAMIC_IP: 				"動的 IP",
			STATIC_IP: 					"静的 IP",
			PPPOE: 						"PPPoE",
			BIGPOND: 					"BigPond ケーブル",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			DHCP: 						"DHCP",
			UNPLUGGED: 					"WAN ポートが未接続です。",
			NONE: 						"なし",
			DETECT_FAIL: 				"自動検出が失敗しました。",
			SECONDARY_CONN: 			"セカンダリ接続",

			DYNAMIC_YES: 				"MAC アドレスをクローンしない",
			DYNAMIC_NO: 				"現在のコンピューターの MAC アドレスをクローン",
			
			IP_ADDR: 					"IP アドレス",
			SUBNET_MASK: 				"サブネット　マスク",
			DEFAULT_GATEWAY: 			"デフォルト ゲートウェイ",
			PRIMARY_DNS: 				"プライマリ DNS",
			SECOND_DNS: 				"セカンダリ DNS",
			OPTIONAL: 					"(オプション)",
			USER_NAME: 					"ユーザー名",
			PASSWORD: 					"パスワード",
			SERVER_IP_ADDR_NAME: 		"VPN サーバー IP/ドメイン名",		
			
			DNS_ADDR_MODE: 				"",

			NOTE: 						"使用しているインターネット接続タイプがわからない場合は、自動検出を使用するか、インターネット サービス プロバイダー (ISP) に問い合わせてください。"
		},
		
		BASIC_WIRELESS:{
			TITLE: 						"ワイヤレス設定",
			MODE_2G: 					"2.4GHz ワイヤレス",
			MODE_5G: 					"5GHz ワイヤレス",
			MODE_60G: 					"60GHz ワイヤレス",
			WIRELESS_NETWORK_NAME: 		"ネットワーク名 (SSID)",
			WIRELESS_PASSWORD: 			"パスワード",
			ENABLE_WIRELESS: 			"ワイヤレス ラジオを有効にする",
			SAVE: 						"保存",
			ENCRYPTION_2G_NOTICE:		"2.4GHz 暗号化が %s です。",
			ENCRYPTION_5G_NOTICE:		"5GHz 暗号化が %s です。",
			ENCRYPTION_60G_NOTICE:		"60GHz 暗号化が %s です。",
			ENCRYPTION_2G_NO: 			"2.4GHz ワイヤレス ネットワークが暗号化されていません。",
			ENCRYPTION_5G_NO: 			"5GHz ワイヤレス ネットワークが暗号化されていません。",
			ENCRYPTION_60G_NO: 			"60GHz ワイヤレス ネットワークが暗号化されていません。",
			ENCRYPTION_NO: 				"保護されていないワイヤレス ネットワークには危険が潜んでいます。",
			ENCRYPTION_SURE: 			"続行してよろしいですか?",
			HIDE_SSID: 					"SSID を非表示にする"
		},
		
		
		
		BASIC_USB: {
			TITLE: 						"基本設定",
			TITIL_NEW:					"ディスクとアカウント",
			DISK_SET:					"デバイス設定",

			SELFLY_REMOVE:				"安全な取り外し",
			SCANING:					"スキャン中...",
			SCAN_RESULT:				"%n 個のディスクが見つかりました",
			
			DISKS:						"ディスク",
			USERS: 						"ユーザー アカウント",
			DEVICENAME: 				"デバイス名",
			VOLUMN: 					"ボリューム",

			USBSPACE: 					"使用済み領域",
			FREESPACE: 					"空き領域",
			STATUS: 					"ステータス",
			INACT: 						"非アクティブ",
			USAGE: 						"使用量",
			CAPACITY: 					"容量",
			OPERATION: 					"動作",
			
			ACC: 						"アカウント管理", 	 	
			USERNAME: 					"ユーザー名",
			PASSWORD: 					"パスワード",
			USE_LOGIN: 					"ログイン ユーザーを使用",
			SCAN: 						"スキャン",
			ENJECT_ALL: 				"すべて取り出す",
			ENJECT: 					"取り出す",
			ADD_USER: 					"ユーザーを追加",
			AUTH: 						"権限",


			LOCATION: 					"場所",
			MOBILE_ISP: 				"モバイル ISP",
			DIAL_NUMBER: 				"ダイヤル番号",
			APN: 						"APN",
			USERNAME: 					"ユーザー名",
			PASSWORD: 					"パスワード",
			MTU_SIZE: 					"MTU サイズ (バイト)",
			OPTIONAL: 					"(オプション)"
		},
		
		BASIC_PARENTAL_CTR:{
			TITLE: 						"保護者による制限",
			UNKNOWN: 					"不明",
			
			DEVICE_CTR: 				"保護者による制限対象のデバイス",
			ID: 						"ID",
			DEVICE: 					"デバイス名",
			MAC_ADDRESS: 				"MAC アドレス",
			TIME: 						"インターネット アクセス時間",
			DESCRIPTION: 				"説明",
			ENABLE: 					"このエントリを有効にする",
			ENABLE_THIS_ENTRY: 			"このエントリを有効にする",
			OPTIONAL: 					"(オプション)",
			BTN_VIEW: 					"既存のデバイスの表示",
			
			DEVICE_LIST: 				"デバイス リスト",
			SYSTEM_TIME: 				"システム時間",
			
			RESTR: 						"コンテンツ制限",
			MODE: 						"制限ポリシー",
			BLACKMODE: 					"ブラックリスト",
			WHITEMODE: 					"ホワイトリスト",
			ACCESS_DEVICES_LIST: 		"アクセス デバイス リスト",
			
			CHOOSE: 					"選択",
			ADD_A_NEW_KEYWORD: 			"ブロックする新しいキーワードの追加",
			ADD_A_NEW_DOMAIN_NAME: 		"アクセス先の新しいドメイン名の追加",
			
			OPT: 						"動作",
			STATUS: 					"保護者による制限",
			YOURPC:						"ご使用の PC"
		},
		
		BASIC_GUEST:{
			TITLE: 						"ゲスト ネットワーク",
			MODE_2G: 					"2.4GHz ワイヤレス",
			MODE_5G: 					"5GHz ワイヤレス",
			WIRELESS_NETWORK_NAME: 		"ネットワーク名 (SSID)",
			WIRELESS_PASSWORD: 			"パスワード",
			DYNAMIC_PASSWORD: 			"パスワード",
			ENABLE_WIRELESS: 			"ゲスト ネットワークを有効にする",
			SAVE:						"保存",
			HIDE_SSID: 					"SSID を非表示にする",
			PASSWORD_CHANGE_CYCLE: 		"パスワード更新間隔",
			PER_DAY: 					"毎日",
			PER_WEEK: 					"毎週",
			PER_MONTH: 					"毎月",
			NEVER: 						"しない",
			UNENCRYPTED:				"ゲスト ネットワークが暗号化されていません。[詳細設定] メニューでパスワードを設定できます。"
		},

		STATUS: {
			TITLE: 						"ステータス",
			INTERNET:					"インターネット",
			WIRELESS:					"ワイヤレス",
			LAN:						"LAN",
			USB_TITLE:					"USB デバイス",
			PERFORMANCE: 				"パフォーマンス",
			GUEST_NETWORK: 				"ゲスト ネットワーク",
			ACCESS_DEVICES: 			"アクセス デバイス",
			
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			HZ24G: 						"2.4GHz",
			HZ5G: 						"5GHz",
			HZ60G: 						"60GHz",

			CONNECTION_TYPE: 			"接続タイプ",

			MAC_ADDRESS: 				"MAC アドレス",
			IP_ADDRESS: 				"IP アドレス",
			RELEASE: 					"解放",
			RENEW: 						"更新",
			
			DYNAMIC_IP: 				"動的 IP",
			STATIC_IP: 					"静的 IP",
			SUBNET_MASK: 				"サブネット　マスク",
			PPPOE: 						"PPPoE",
			BIGPOND_CABLE: 				"BigPond ケーブル",
			L2TP: 						"L2TP",
			PPTP: 						"PPTP",
			TUNNEL_6TO4: 				"6to4 トンネル",
			RD6:  						"6RD",
			DSLITE: 					"DS-Lite",
			PASSTHROUGH: 				"パススルー (ブリッジ)",
			RDNSS: 						"RDNSS",
			SLAAC: 						"SLAAC",
			NONE: 						"なし",
			
			DEFAULT_GATEWAY: 			"デフォルト ゲートウェイ",
			DNS: 						"DNS サーバー",
			MAC: 						"MAC アドレス",
			WDS_STATUS: 				"WDS ステータス",
			
			IPV6_ADDRESS: 				"IP アドレス",
			PRIMARY_DNS: 				"プライマリ DNS",
			SECOND_DNS: 				"セカンダリ DNS",

			RADIO: 						"ワイヤレス ラジオ",

			NAME_SSID: 					"名前 (SSID)",
			NETWORK_NAME_SSID:			"ネットワーク名 (SSID)",
			HIDE_SSID: 					"SSID を非表示にする",
			MODE: 						"モード",
			CHANNEL: 					"チャンネル",
			CHANNEL_WIDTH: 				"チャンネル幅",
			AUTO: 						"自動",
			CURRENT_CHANNEL: 			"現在のチャンネル",

			WDS: 						"WDS ステータス",
			WIRED_CLIENTS: 				"有線クライアント",
			WIRELESS_CLIENTS: 			"ワイヤレス クライアント",
			
			ENABLE_DHCP: 				"DHCP",
			LINKADDR:					"リンク ローカル アドレス",
			ASSIGN_TYPE: 				"割り当てられたタイプ",
			
			ALLOW_TO_SEE_EACH: 			"ゲストどうしを見えるようにする",

			TOTAL: 						"合計:",
			AVAILABLE: 					"使用可能:",

			USB: 						"USB ディスク",
			PRINTER: 					"プリンター",

			CPU_LOAD: 					"CPU 負荷",
			MEMORY_USAGE: 				"メモリ使用量",

			IP_ADDR_P: 					"IP アドレス:",
			MAC_ADDR_P: 				"MAC アドレス:",
			CONN_TYPE_P: 				"接続タイプ:",

			DISABLED: 					"無効",
			INIT: 						"初期化",
			SCAN: 						"スキャン",
			AUTH: 						"認証",
			ASSOC: 						"関連付け",
			RUN: 						"実行",
			HOST: 						"ホスト",
			GUEST: 						"ゲスト",

			ON: 						"オン",
			OFF: 						"オフ"
		},

		INTERNET: {
			TITLE: 						"インターネット",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			CONNECTION_TYPE: 			"インターネット接続タイプ",
			INTERNET_MAC_ADDRESS: 		"MAC アドレス",
			
			CONNECT: 					"接続",
			DISCONNECT: 				"切断",

			IP_ADDR: 					"IP アドレス",
			
			USE_DEFAULT_MAC: 			"既定の MAC アドレスを使用",
			USE_COMPUTER_MAC: 			"現在のコンピューターの MAC アドレスを使用",
			USE_CUSTOM_MAC: 			"カスタム MAC アドレスを使用",
			MAC_CLONE: 					"MAC クローン",
			
			CONFIG: 					"設定",
			
			IP_ADDRESS: 				"IP アドレス",
			SUBNET_MASK: 				"サブネット　マスク",
			DEFAULT_GATEWAY: 			"デフォルト ゲートウェイ",
			
			MANUAL_DNS: 				"手動 DNS",
			PRIMARY_DNS: 				"プライマリ DNS",
			SECOND_DNS: 				"セカンダリ DNS",
			
			RENEW: 						"更新",
			RELEASE: 					"解放",
			VIEW_MODE: 					"表示モード",
			
			GET_DYNAMICALLY_FROM_ISP: 	"ISP から動的に取得",
			USE_FOLLOW_IP_ADDR: 		"次の IP アドレスを使用",
			USE_FOLLOW_DNS_ADDR: 		"次の DNS アドレスを使用",
			USE_FOLLOW_DNS_SERVER: 		"次の DNS サーバーを使用",
			
			BASIC: 						"基本",
			ADVANCED: 					"詳細設定",
			
			DNS_ADDR_MODE: 				"DNA アドレス",
			MTU_SIZE: 					"MTU サイズ",
			MTU_1500: 					"バイト。(既定値は 1500 です。必要な場合を除き、変更しないでください。)",
			MTU_1480: 					"バイト。(既定値は 1480 です。必要な場合を除き、変更しないでください。)",
			MTU_1460: 					"バイト。(既定値は 1460 です。必要な場合を除き、変更しないでください。)",
			MTU_1420: 					"バイト。(既定値は 1420 です。必要な場合を除き、変更しないでください。)",
			
			HOST_NAME: 					"ホスト名",

			HOST_NAME_CONFIRM: 			"ホスト名に、予期しないシステム動作を発生させる可能性のある不正な文字が含まれています。続行してよろしいですか?",

			GET_IP_WITH_UNICAST_DHCP: 	"ユニキャスト DHCP で　IP を取得 (通常は必要ありません。)",
			OPTIONAL: 					"(オプション)",
			
			STATIC_IP: 					"静的 IP",
			PPPOE: 						"PPPoE",
			DHCPV6:                     "DHCPv6",
			SLAAC:                      "SLAAC",
			AUTO_IPV6: 						"自動",
						
			USER_NAME: 					"ユーザー名",
			PASSWORD: 					"パスワード",
			
			INTERNET_IP_ADDR: 			"IP アドレス",
			INTERNET_DNS: 				"インターネット DNS",
			SECONDARY_CONN: 			"セカンダリ接続",
			NONE: 						"なし",
			INTERNET_PRIMARY_DNS:		"プライマリ DNS",
			INTERNET_SECONDARY_DNS: 	"セカンダリ DNS",
			
			DYNAMIC_IP: 				"動的 IP",
			DYNAMIC_IP_v6: 				"動的 IP (SLAAC/DHCPv6)",
			SERVICE_NAME: 				"サービス名",
			ACCESS_CONCENTRATOR_NAME:  	"アクセス コンセントレーター名",
			DETECT_ONLINE_INTERVAL: 	"オンライン間隔を検出",
			INTERVAL_TIPS: 				"秒。(0-120。既定値は 10 です。)",
			IP_ADDR_MODE:  				"IP アドレス",
			CONN_MODE: 					"接続モード",
			DHCP_LINK_UNPLUGGED: 		"WAN ポートが未接続です。",
			
			AUTO: 						"自動",
			ON_DEMAND: 					"オンデマンド",
			TIME_BASED: 				"時間ベース",
			MANUALLY: 					"手動",
			MAX_IDLE_TIME: 				"最大アイドル時間",
			MAX_IDLE_TIME_TIPS: 		"分。(0 は常にアクティブであることを意味します。)",
			PERIOD_OF_TIME: 			"時間",
			TIME_TIPS: 					"(HH:MM)",
			BIGPOND_CABLE: 				"BigPond ケーブル",
			AUTH_SERVER: 				"認証サーバー",
			AUTH_DOMAIN: 				"認証ドメイン",
			L2TP: 						"L2TP",
			GATEWAY: 					"ゲートウェイ",
			SERVER_IP_ADDR_NAME: 		"VPN サーバー IP/ドメイン名",
			PPTP: 						"PPTP",
			TO: 						"～",
			
			TUNNEL_6TO4: 				"6to4 トンネル",
			ENABLE_IPV6: 				"IPv6",
			GET_NONE_TEMPORARY_ADDR: 	"非一時 IPv6 アドレスを取得",
			GET_PREFIX_DELEGATION: 		"IPv6 プレフィックス委任を取得",
			IPV6_ADDR: 					"IPv6 アドレス",

			GET_IPV6_WAY: 				"IPv6 アドレスの取得",
			AUTOMATICALLY:              "自動取得",
			SPECIFIED_BY_ISP: 			"ISP の指定",

			IPV6_ADDR_PREFIX: 			"IPv6 アドレス プレフィックス",
			NONE_TEMPORARY: 			"非一時",

			PREFIX_DELEGATION: 			"プレフィックス委任",
			ENABLE:                     "有効",
			DISABLE:                    "無効",			

			RD6:  						"6RD", 
			IPV4_MASK_LEN: 				"IPv4 マスクの長さ",
			CONFIG_TYPE: 				"設定タイプ",
			RD6_PREFIX: 				"6RD プレフィックス",
			RD6_PREFIX_LENGTH: 			"6RD プレフィックス長",
			REPLY_IPV4_ADDR: 			"境界リプライ IPv4 アドレス",
			MANUAL: 					"手動",
			DSLITE:  					"DS-Lite",
			DS_LITE:  					"DS-Lite",
			PASS_THROUGH:  				"パススルー (ブリッジ)",
			LOCAL_IPV6: 				"ローカル IpV6 アドレス",
			PEER_IPV6: 					"ピア IpV6 アドレス",
			TUNNEL_ADDR: 				"トンネル アドレス",
			IPV4_NETMASK: 				"IPv4 ネットマスク",
			CUSTOM: 					"カスタム",
		    AFTR_NAME: 					"AFTR 名",


			
			
			IPV4_ADDR: 					"IPv4 アドレス",
			IPV4_MASK: 					"IPv4 サブネット マスク",
			IPV4_GATEWAY: 				"IPv4 デフォルト ゲートウェイ",

			DUPLEX: 					"デュプレックス",
			AUTO_NEGOTIATION: 			"自動交渉",
			FULL_DUPLEX_1000: 			"1000Mbps 全二重",
			HALF_DUPLEX_1000:			"1000Mbps 半二重",
			FULL_DUPLEX_100: 			"100Mbps 全二重",
			HALF_DUPLEX_100: 			"100Mbps 半二重",
			FULL_DUPLEX_10: 			"10Mbps 全二重",
			HALF_DUPLEX_10: 			"10Mbps 半二重"

		},

		LAN: {
			TITLE: 						"LAN",
			LAN: 						"LAN",
			IPV4: 						"IPv4",
			IPV6: 						"IPv6",
			
			LAN_IPv4: 					"LAN IPv4",
			LAN_IPv6: 					"LAN IPv6",

			MAC_ADDRESS: 				"MAC アドレス",
			IP_ADDRESS: 				"IP アドレス",
			SUBNET_MASK: 				"サブネット　マスク",
			CUSTOM: 					"カスタム",

			IGMP: 						"IGMP プロキシを有効にする",
			


			ASSIGNED_TYPE: 				"割り当てられたタイプ",
			DHCP_SERVER: 				"DHCPv6",
			SLAAC: 						"SLAAC+ステートレス DHCP",
			RDNSS: 						"SLAAC+RDNSS",

			PREFIX: 					"アドレス プレフィックス",
			PREFIX_UNIT: 				"/64",
			ADDRESS: 					"アドレス",
			DELEFATED: 					"委任",
			STATIC: 					"静的",
			SITE_PREFIX: 				"サイト プレフィックス",
			SITE_PREFIX_LEN: 			"サイト プレフィックス長",

			PREFIX_TYPE:  				"サイト プレフィックスの設定タイプ",
			LAN_IPV6_ADDR:  			"LAN IPV6 アドレス",

			RELEASE_TIME: 				"解放時間",
			RELEASE_TIME_TIP: 			"秒。(既定値は 86400 です。必要な場合を除き、変更しないでください。)",
			ADDRESS:					"アドレス",
			SAVE: 						"保存",

			REBOOT_TIP: 				"ルーターが新しいログイン ページにスキップしています。<br/>お待ちください..."

		},

		IPTV:{
			TITLE: 						"設定",
			IPTV:                       "IPTV", 
			ENABLE_IPTV:                "IPTV　を有効にする", 
			MODE:  						"モード",
			IGMP_PROXY: 				"IGMP プロキシ",
			IGMP_VERSION: 				"IGMP バージョン",
			V2:  						"V2",
			V3:  						"V3",
			BRIDGE: 					"ブリッジ",
			BASIC: 						"カスタム",
			EXSTREAM: 					"シンガポール ExStream",
			RUSSIA:  					"ロシア",
			UNIFY:  					"マレーシア Unifi",
			MAXIS:  					"マレーシア Maxis",
			LAN1: 						"LAN1",
			LAN2: 						"LAN2",
			LAN3: 						"LAN3",
			LAN4: 						"LAN4",
			INTERNET: 					"インターネット",
			IP_PHONE: 					"IP 電話", 

			Q_TAG: 						"802.1Q タグ",
			ENABLE: 					"有効",
			
			INTERNET_VLAN_ID: 			"インターネット VLAN ID",
			INTERNET_VLAN_PRIORITY: 	"インターネット VLAN 優先度",
			IP_PHONE_VLAN_ID: 			"IP 電話 VLAN ID",
			IP_PHONE_VLAN_PRIORITY: 	"IP 電話 VLAN 優先度",
			IPTV_VLAN_ID: 				"IPTV VLAN ID",
			IPTV_VLAN_PRIORITY: 		"IPTV VLAN 優先度",
			IPTV_MULTI_VLAN_ID: 		"IPTV マルチキャスト VLAN ID",
			IPTV_MULTI_VLAN_PRIORITY: 	"IPTV マルチキャスト VLAN ID　優先度"
		},

		DHCP_SERVER: {
			TITLE: 						"DCHP サーバー",
			
			SETTINGS: 					"設定",

			DHCP_SERVER: 				"DCHP サーバー",
			ENABLE_DHCP_SERVER: 		"DCHP サーバーを有効にする",

			IP_ADDR_POOL: 				"IP アドレス プール",
			LEASETIME: 					"アドレス リース時間",
			LEASENOTE: 					"分。(2-2880。既定値は　120 です。)",
			
			GATEWAY: 					"デフォルト ゲートウェイ",
			DOMAIN: 					"デフォルト　ドメイン",
			PRIMARYDNS: 				"プライマリ DNS",
			SECONDARYDNS: 				"セカンダリ DNS",

			OPTIONAL: 					"(オプション)",

			CLIENTSLIST: 				"DHCP クライアント リスト",
			CLIENT_NUMBER: 				"クライアント総数",
			CLIENT_NAME: 				"クライアント名",
			MAC_ADDR: 					"MAC アドレス",
			ASSIGNED_IP: 				"割り当て済み IP アドレス",
			LEASE_TIME: 				"リース時間",

			RESERVATION: 				"アドレス予約",

			RESERVED_IP: 				"予約済み IP アドレス",
			IP_ADDRESS: 				"IP アドレス",
			DESCRIPTION: 				"説明",

			CLIENTSLIST: 				"DHCP クライアント リスト",
			CLIENT_NUMBER: 				"クライアント総数",

			ENABLE: 					"このエントリを有効にする",
			ENABLE_THIS_ENTRY: 			"このエントリを有効にする",
			BTN_VIEW:					"既存のデバイスの表示"
			
		},

		DDNS: {
			DDNS: 						"動的 DNS",
			SERVICEPROVIDER: 			"サービス プロバイダー",
			COMEXE: 					"Comexe", 
			DYNDNS: 					"DynDNS",
			NOIP: 						"No-IP",
			
			GO_TO_REGISTER: 			"登録へ...",
			USERNAME: 					"ユーザー名",
			PASSWORD: 					"パスワード",
			DOMAIN_NAME_LIST: 			"ドメイン名リスト",
			DOMAIN_NAME: 				"ドメイン名",
			LOGIN: 						"ログイン",
			LOGIN_SAVE: 				"ログインして保存", 
			LOGOUT: 					"ログアウト",
			STATU_SUCCESS:				"正常完了!",
			UPDATE_INTERVAL:			"更新間隔",
			ONE_HOUR:					"1 時間",
			SIX_HOUR:					"6 時間",
			TWETEEN_HOUR:				"12 時間",
			ONE_DAY:					"1 日",
			TWO_DAY:					"2 日",
			THREE_DAY:					"3 日",
			NEVER:						"しない",
			UPDATE:						"更新",
			STATU_INCORRENT:			"ユーザー名またはパスワードが正しくありません。",
			STATU_ERR_DOMAIN:			"ドメイン名エラー。",
			
			STATU_NO_LAUNCH:			"起動していません",
			STATU_FAIL_DDNS: 			"DynDNS を更新できませんでした。",
			STATU_FAIL_NOIP: 			"No-IP を更新できませんでした。",
			STATU_CONN:					"接続中"
		},

		ADVANCED_ROUTING: {
			TITLE: 						"詳細経路指定",
			STATIC_ROUTING: 			"静的経路指定",

			DESTINATION_NETWORK:		"ネットワーク宛先",
			SUBNET_MASK: 				"サブネット　マスク",
			DEFAULT_GATEWAY: 			"デフォルト ゲートウェイ",
			DESCRIPTION: 				"説明",
			
			SYSTEM_ROUTING_TABLE: 		"システム ルーティング テーブル",
			CLIENT_NUMBER: 				"アクティブ経路数",

			GATEWAY: 					"ゲートウェイ",
			INTERFACE: 					"インターフェイス",
			LAN: 						"LAN",
			WAN: 						"WAN",
			ENABLE: 					"このエントリを有効にする",
			ENABLE_THIS_ENTRY: 			"このエントリを有効にする"
		},

		WIRELESS: {

			GLOBAL_SETTINGS: 			"地域設定",
			NOT_SUPPORT_5G: 			"この地域では 2.4GHz のみがサポートされています。正しい地域を選択していることを確認してください。",
			NOT_SUPPORT_60G: 			"この地域では 60GHz はサポートされていません。",
			ENABLE_TIPS: 				"ワイヤレス ラジオをオンにする必要があります。",

			REGION: 					"地域",
			NOTICE:  					"ワイヤレス機能を有効にするには、ワイヤレス ハードウェア スイッチをオンにしておく必要があります。",
			
			MODE_2G:					"2.4GHz",
			MODE_5G:					"5GHz",
			MODE_60G: 					"60GHz",

			WIRELESS: 					"ワイヤレス設定",
			WIRELESS_RADIO: 			"",
			ENABLE_WIRELESS: 			"ワイヤレス ラジオを有効にする",

			WIRELESS_NETWORK_NAME: 		"ネットワーク名 (SSID)",
			WIRELESS_PASSWORD: 			"パスワード",
			HIDE_SSID: 					"SSID を非表示にする",

			SECURITY: 					"セキュリティ",
			NO_SECURITY: 				"セキュリティなし",
			WPA_WPA2_PERSONAL: 			"WPA/WPA2-パーソナル (推奨)",
			WPA_WPA2_ENTERPRISE: 		"WPA/WPA2 - エンタープライズ",
			WPA2_PERSONAL: 			    "WPA2-パーソナル (推奨)",
			WPA2_ENTERPRISE: 		    "WPA2-エンタープライズ",
			WEP: 						"WEP",

			VERSION: 					"バージョン",

			AUTO: 						"自動",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",
			WPA: 						"WPA",
			WPA2: 						"WPA2",

			ENCRYPTION: 				"暗号化",
			TKIP: 						"TKIP",
			AES: 						"AES",

			MODE:  						"モード",
			MODE_B:  					"802.11b のみ",
			MODE_G:  					"802.11g のみ",
			MODE_N:  					"802.11n のみ",
			MODE_BG:  					"802.11b/g 混在",
			MODE_GN: 					"802.11g/n 混在",
			MODE_BGN:  					"802.11b/g/n 混在",

			MODE_A_5: 					"802.11a のみ",
			MODE_AN_5: 					"802.11a/n 混在",
			MODE_N_5: 					"802.11n のみ",
			MODE_AC_5:					"802.11ac のみ",
			MODE_NAC_5:					"802.11n/ac 混在",
			MODE_ANAC_5:				"802.11a/n/ac 混在",

			MODE_AD_60:					"802.11ad のみ",

			CHANNEL_WIDTH: 				"チャンネル幅",
			CHANNEL: 					"チャンネル",

			TRANSMIT_POWER: 			"転送強度",

			RADIUS_SERVER_IP: 			"RADIUS サーバー IP",
			RADIUS_PORT: 				"RADIUS ポート",
			RADIUS_PASSWORD: 			"RADIUS パスワード",

			TYPE: 						"タイプ",
			OPEN_SYSTEM: 				"オープン システム",
			SHARED_KEY: 				"共有キー",

			KEY_SELECTED: 				"選択したキー",
			KEY1: 						"Key1",
			KEY2: 						"Key2",
			KEY3: 						"Key3",
			KEY4: 						"Key4",

			WEP_KEY_FORMAT: 			"WEP キー形式",
			ASCII: 						"ASCII",
			HEXADECIMAL: 				"16 進",

			KEY_TYPE: 					"キー タイプ",
			BIT64: 						"64 ビット",
			BIT128: 					"128 ビット",
			BIT152: 					"152 ビット",

			KEY_VALUE: 					"キーの値",
			
			MHZ: 						"MHz",
			MHZ20: 						"20 MHz",
			MHZ40: 						"40 MHz",
			MHZ80: 						"80 MHz",
			
			LOW: 						"低",
			MIDDLE: 					"中",
			HIGH: 						"高"
		},

		WPS: {

			TITLE2: 					"ルーターの PIN",
			ROUTERS_PIN_INFO: 			"ワイヤレス クライアントは、WPS PIN 方式を使用してルーターに接続できます。",
			ENABLE_ROUTE_PIN: 			"ルーターの PIN",
			ROUTE_PIN: 					"PIN",
			GENERAL: 					"生成",
			DFT: 						"既定",

			TITLE: 						"WPS ウィザード",
			SELECT_SETUP: 				"WPS 接続方式を選択してください",
			PUSH_BTN: 					"プッシュ ボタン (推奨)",
			PUSH_DES: 					"ルーター上の物理的な WPS ボタンを押すか、以下のソフトウェアの [接続] をクリックしてください。",
			CONNECT: 					"接続",
			CANCEL: 					"キャンセル",

			RESULT_HEAD: 				"ワイヤレス　クライアント",
			RESULT_END: 				"は、ネットワークに正常に追加されました。",
			NOT_FOUND: 					"クライアントが近くにありません。ボタンをクリックしてもう一度実行してください。",

			PIN_NUMBER: 				"PIN",
			
			PIN_BTN: 					"PIN",
			NOT_FOUND: 					"見つかりません",
			ENTER_CLIENT_PIN: 			"クライアントの PIN を入力",
			SWITCH_NOTE:				"WPS　で接続するには、WIFI ボタンでワイヤレス機能をオンにしてください。",
			SWITCH_NOTE2:				"WPS ウィザードを使用するには、まず、正しいワイヤレス パラメーターを設定する必要があります。",
			STATUS_PIN_ERROR: 			"WPS PIN が無効です。確認してもう一度実行してください。",
			STATUS_ERROR: 				"エラー。",
			STATUS_CONN_ERROR: 			"接続できませんでした。",
			STATUS_CONNING: 			"接続中...",
			STATUS_CANCEL: 				"接続がキャンセルされました。",
			
			NOTE: 						"注:",
			BUTTON: 					"WIFI ボタンがオフになっています",
			ENABLE: 					"ワイヤレス機能が有効になっていません",
			HIDDEN: 					"[SSID を非表示にする] がオンになっています",
			ENCRYPTION: 				"暗号化が正しくありません",
			WPS: 						"[システム パラメーター] ページで WPS が無効になっています",

			
			STATUS_CONN_OVERLAP: 		"接続できませんでした (オーバーラップ)。",
			STATUS_CONN_TIMEOUT: 		"接続できませんでした (タイムアウト)。",
			STATUS_CONN_INACT: 			"接続が非アクティブです。"

		},

		STATISTICS_WIRELESS:{
			TITLE: 						"ワイヤレス ステーション オンライン",
			CLIENT_NUMBER: 				"クライアント総数",
			MAC_ADDRESS: 				"MAC アドレス",
			CONN_TYPE: 					"接続タイプ",
			SECURITY: 					"セキュリティ",
			RECEIVED_PACKETS: 			"受信済みパケット",
			SEND_PACKETS: 				"送信済みパケット"
		},

		GUEST_SETTINGS:{
			GLOBAL_SETTINGS: 			"設定",
			
			MODE_2G: 					"2.4GHz",
			MODE_5G:					"5GHz",

			ALLOW_EACH: 				"ゲストどうしを見えるようにする",

			ALLOW_LOCAL: 				"ゲストが自分のローカル ネットワークにアクセスすることを許可する",
			
			WIRELESS: 					"ワイヤレス",
			WIRELESS_24G_RADIO: 		"2.4GHz ワイヤレス",
			WIRELESS_5G_RADIO: 			"5GHz ワイヤレス",
			ENABLE_GUEST: 				"ゲスト ネットワークを有効にする",

			NAME_SSID: 					"ネットワーク名 (SSID)",
			HIDE_SSID: 					"SSID を非表示にする",
			PASSWORD_CHANGE_CYCLE: 		"パスワード更新間隔",
			PER_DAY: 					"毎日",
			PER_WEEK: 					"毎週",
			PER_MONTH: 					"毎月",
			NEVER: 						"しない",
			SECURITY: 					"セキュリティ",
			NO_SECURITY: 				"セキュリティなし",	
			WPA_WPA2_PERSONAL: 			"WPA/WPA2-パーソナル",

			VERSION: 					"バージョン",
			AUTO: 						"自動",
			WPA_PSK: 					"WPA-PSK",
			WPA2_PSK: 					"WPA2-PSK",

			ENCRYPTION: 				"暗号化",
			TKIP: 						"TKIP",
			AES: 						"AES",

			WIRELESS_PASSWORD: 			"パスワード"
		},

		NAT:{
			SETTINGS: 					"ハードウェア NAT",
			STATUS: 					"ハードウェア NAT",
			
			ALG_TITLE: 					"アプリケーション レイヤー ゲートウェイ (ALG)",

			FTP_ALG: 					"FTP ALG",
			TFTP_ALG: 					"TFTP ALG",
			H323_ALG: 					"H323 ALG",
			RTSP_ALG: 					"RTSP ALG",
			PPTP_ALG: 					"PPTP パススルー",
			L2TP_ALG: 					"L2TP パススルー",
			IPSEC_ALG: 					"IPSec パススルー",

			ENABLE_FTP_ALG: 			"FTP ALG を有効にする",
			ENABLE_TFTP_ALG: 			"TFTP ALG を有効にする",
			ENABLE_H323_ALG: 			"H323 ALG を有効にする",
			ENABLE_RTSP_ALG: 			"RTSP ALG を有効にする",
			ENABLE_PPTP_ALG: 			"PPTP パススルーを有効にする",
			ENABLE_L2TP_ALG: 			"L2TP パススルーを有効にする",
			ENABLE_IPSEC_ALG: 			"IPSec パススルーを有効にする",
			NAT_ENABLE_NOTICE: 			"注:NAT 機能が有効になるまで、設定は有効になりません。"
		},

		VIRTUAL_SERVERS:{
			TITLE: 						"仮想サーバー",

			SERVICE_NAME: 				"サービス タイプ",
			EXTERNAL_PORT: 				"外部ポート",
			INTERNAL_IP: 				"内部 IP",
			INTERNAL_PORT: 				"内部ポート",
			PROTOCAL: 					"プロトコル",

			BTN_VIEW: 					"既存のサービスの表示",

			EXSITTING_SERVICE: 			"既存のサービス",
			
			PROTOCAL_ALL: 				"すべて",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			
			INTERNAL_UNIT: 				"(XX)",
			EXTERNAL_UNIT: 				"(XX-XX または XX)",
			EXT_PORT_TIPS: 				"(XX または XX-XX、1-65535)",
			INT_PORT_TIPS: 				"(XX または空白、1-65535)",

			NOTICE:						"リモート管理ポートと競合しています。続行してよろしいですか?",
			NOTICE_INVALID_REMOTE:		"仮想サーバーとの 80 ポートの競合のため、リモート管理は無効です。リモート管理ポートを変更してください。",
			NOTICE_ENTER_ANOTHER:		"リモート管理ポートと競合しています。別のポートを入力してください。",
			NOTICE_PPTP_CONFLICT:		"PPTP VPN ポートと競合しています。別のポートを入力してください。",
			NOTICE_OPENVPN_CONFLICT:	"OPENVPN ポートと競合しています。別のポートを入力してください。",


			ENABLE_THIS_ENTRY: 			"このエントリを有効にする",
			OPERATION: 					"動作",
			CHOOSE: 					"選択",
			NAT_ENABLE_NOTICE: 			"注:NAT 機能が有効になるまで、設定は有効になりません。"
		},

		PORT_TRIGGERING:{
			TITLE: 						"ポート トリガー",
			APPLICATION: 				"アプリケーション",
			TRIGGER_PORT: 				"トリガー ポート",
			TRIGGER_PROTOCOL: 			"トリガー プロトコル",

			EXTERNAL_PORTS: 			"外部ポート",
			EXTERNAL_PROTOCOL: 			"外部プロトコル",

			BTN_VIEW: 					"既存のアプリケーションの表示",

			EXSITTING_APPLICATION: 		"既存のアプリケーション",
			APPLICATION_NAME: 			"アプリケーション名",
			TRIGGER_TIPS: 				"(XX、1-65535)",
			EXTERNAL_TIPS: 				"(XX または XX-XX、1-65535、最大 5 組まで)",
			
			NOTICE_PPTP_CONFLICT:		"PPTP VPN ポートと競合しています。別のポートを入力してください。",
			NOTICE_OPENVPN_CONFLICT:	"OPENVPN ポートと競合しています。別のポートを入力してください。",
			
			ENABLE_THIS_ENTRY: 			"このエントリを有効にする",
			OPERATION: 					"動作",
			
			PROTOCAL_ALL: 				"すべて",
			PROTOCAL_TCP: 				"TCP",
			PROTOCAL_UDP: 				"UDP",
			NAT_ENABLE_NOTICE: 			"注:NAT 機能が有効になるまで、設定は有効になりません。"
		},

		DMZ:{
			TITLE: 						"DMZ",
			ENABLE_DMZ: 				"DMZ　を有効にする",
			HARDWARESTATUS: 			"DMZ ホスト IP アドレス",
			NAT_ENABLE_NOTICE: 			"注:NAT 機能が有効になるまで、設定は有効になりません。"
		},

		UPNP:{
			TITLE: 						"UPnP",
			CURRENT_UPNP_STATUS: 		"UPnP",

			UPNP_LIST: 					"UPnP サービス リスト",
			CLIENT_NUMBER: 				"クライアント総数",
			SERVICE: 					"サービスの説明",
			EXTERNAL_PORT: 				"外部ポート",
			PROTOCAL: 					"プロトコル",
			IP_ADDR: 					"インターネット IP アドレス",
			INTERNAL_PORT: 				"内部ポート",
			NAT_ENABLE_NOTICE: 			"注:NAT 機能が有効になるまで、設定は有効になりません。"
		},

		G3_G4:{
			TITLE: 						"3G/4G",
			USB_MODEM: 					"USB モデム",
			LOCATION: 					"場所",
			MOBILE_ISP: 				"モバイル ISP",

			USA: 						"USA",
			AT_T: 						"AT&T",

			CONNECTION_MODE: 			"接続モード",
			CONNECT_ON_DEMAND: 			"オンデマンド接続",
			CONNECT_AUTOMATICALLY: 		"自動接続",
			CONNECT_MANUALLY: 			"手動接続",
			MAX_IDLE_TIME: 				"最大アイドル時間",
			CONNECTION_TIP: 			"現在のインターネット アクセスは WAN 優先です。",
			IDLE_TIME_TIP: 				"接続モードと最大アイドル時間は手動で設定できません。",
			MINUTES: 					"分。(0 は常にアクティブのままであることを意味します。)",

			AUTHENTICATION_TYPE: 		"認証タイプ",
			AUTO: 						"自動",
			PAP: 						"PAP",
			CHAP: 						"CHAP",
			AUTH_TYPE_TIP: 				"既定は [自動] です。必要な場合を除き、変更しないでください。",

			CONNECT: 					"接続",
			DISCONNECT: 				"切断",

			SET_TIP: 					"ダイヤル番号、APN、ユーザー名、パスワードを手動で設定してください。",
			DIAL_NUMBER: 				"ダイヤル番号",
			APN: 						"APN",
			USERNAME: 					"ユーザー名",
			PASSWORD: 					"パスワード",
			OPTIONAL: 					"(オプション)",
			MTU_SIZE: 					"MTU サイズ (バイト)",
			MTU_SIZE_TIP: 				"既定値は 1480 です。必要な場合を除き、変更しないでください",

			USE_FOLLOW_DNS_SERVER: 		"次の DNS サーバーを使用",
			PRIMARY_DNS: 				"プライマリ DNS",
			SECOND_DNS: 				"セカンダリ DNS",

			UNPLUGGED: 					"WAN ポートが未接続です。",
			IDENTIFYING: 				"識別中...",
			IDENTIFY_SUCCESS: 			"正常に識別されました"
		},

		DISK_SETTING: {
			DISK_SET: 					"デバイス設定",
			SCAN: 						"スキャン",
			SELFLY_REMOVE: 				"安全な取り外し",
			SCAN_RESULT: 				"%n 個のディスクが見つかりました",
			NOT_FOUND: 					"見つかりません",
			SELFLY_REMOVE: 				"安全な取り外し",
			
			VOLUMN: 					"ボリューム",
			CAPACITY: 					"容量",
			FREESPACE: 					"空き領域",
			USBSPACE: 					"使用済み領域",
			
			STATUS: 					"ステータス",
			INACT: 						"非アクティブ",
			ACTIVE: 					"アクティブ",
			
			USAGE: 						"使用量",
			CAPACITY: 					"容量",
			OPERATION: 					"動作",	
			
			ACC: 						"アカウント管理", 	 	
			USERNAME: 					"ユーザー名",
			PASSWORD: 					"パスワード",
			USE_LOGIN: 					"ログイン ユーザーを使用",
			SCAN: 						"スキャン",
			ENJECT_ALL: 				"すべて取り出す",
			ENJECT: 					"取り出す",
			ADD_USER: 					"ユーザーを追加",
			AUTH: 						"権限"
		},

		OFFLINE_DOWNLOAD: {
			TITLE:						"オフライン ダウンロード",
			ITEMS:						"項目",
			FILE:						"ファイル",
			FOLDER:						"フォルダー",
			SIZE:						"サイズ",
			STATUS:						"ステータス",
			DOWNLOAD:					"ダウンロード",
			REMAINTING:					"残り時間",
			SPEED:						"速度",
			SOURCE:						"ソース",	
			DOWNLOADTO:					"ダウンロード先",	
			TORRENT_PC:					"PC からのトレント",
			TORRENT_USB:				"USB からのトレント",
			SOURCE_URL:					"URL",	
			URL:						"URL",	
			AMULE:						"aMule",
			AMULETCP:					"aMule TCP ポート",
			AMULEUDP:					"aMule UDP ポート",
			AMULESERVER:				"aMule サーバー",
			SCHEDULE:					"スケジュールで設定できます",
			MAXACTIVE:					"アクティブ タスクの最大数",
			MAXACTIVENUM:				"(1-10)",
			TIMEZONE:					"タイム ゾーン",
			DOWNLOADTIME:				"ダウンロード時間",
			REPEAT:						"繰り返し",
			SPEEDLIMIT:					"速度制限",
			MAXDOWNLOAD:				"最大ダウンロード速度",
			MAXUPLOAD:					"最大アップロード速度",
			SPEEDTIPS:					"(0 は無制限。)",
			BTPORT:						"BT ダウンロード ポート",
			SEED:						"タスク完了後もシード処理を維持",
			UNIT:						"KB/秒",
			MODIFY:						"変更",
			PC:							"PC",
			USB:						"USB",
			TORRENTLOCATION:			"トレントの場所",
			CONNECT:					"接続しました",
			DISCONNECTED:				"切断されました",
			CONNECTING:					"接続中",
			GENERAL:					"一般",
			COMPLETED:					"完了",
			NEWDEVICE:					"新しいデバイス",
			FOUNDUSB:					"新しい USB を検出しました",
			CONNECTEDPEERS:				"接続ピア",
			OF:							"/",
			NUM_OF_CON:					"接続数",
			NUM_OF_CON_G:				"グローバル接続最大数",
			NUM_OF_CON_PT:				"トレントあたりの接続ピア最大数",
			EN_DHT_NET:					"DHT ネットワークを有効にする",
			EN_PE_EX:					"ピア交換を有効にする",
			EN_BT:						"BitTorrent プロトコル暗号化を有効にする",
			GENERAL_SETTINGS:			"一般設定",
			BT_SETTINGS:				"BT 設定",
			AMULE_SETTINGS:				"aMule 設定",
			CLEAN:						"取り外し完了",
			NONE_COMPLETE: 				"完了したタスクはありません。"
		},

		FOLDER: {
			TITLE: 						"共有設定",
			ACCOUNT_TITLE: 				"共有アカウント",
			ACCOUNT:					"アカウント",
			AC_NOTE: 					"共有コンテンツにアクセスするには、既定のログイン アカウントを使用するか、新しいアカウントを作成できます。",
			
			AC_LOGIN: 					"既定のアカウントを使用",
			AC_FOLLOW: 					"新しいアカウントを使用",

			USERNAME: 					"ユーザー名",
			PASSWORD: 					"パスワード",
			CONFIRM: 					"パスワードの確認",

			SHARING_SETTING: 			"共有設定",
			SERVER_NAME: 				"ネットワーク/メディア サーバー名",

			METHOD: 					"アクセス方法",
			LINK: 						"リンク",
			PORT: 						"ポート",

			NETWORK_NEIGHBORHOOD: 		"ネットワーク近隣",
			FTP: 						"FTP",
			FTPEX: 						"FTP (インターネット経由)",

			SHARE_FOLDER: 				"フォルダー共有",
			SHAREING_ALL: 				"すべて共有",
			NOTE:  						"すべてのファイルとフォルダーを共有するにはオンにし、指定されたフォルダーのみを共有するにはオフにしておきます。", 
			ENABLE_AUTHENTICATION: 		"認証を有効にする",
			SHAREING_FOLDER: 			"共有フォルダー",
			
			SHARE_NAME: 				"共有名",
			FOLDER_PATH: 				"フォルダー パス",
			VOLUMN_NAME: 				"ボリューム名",

			SHARE_NAME: 				"フォルダー名",
			FOLDER_PATH: 				"フォルダー パス",
			MEDIA_SHARING: 				"メディア共有",
			STATUS: 					"ステータス",

			GUEST_ACCESS: 				"ゲスト ネットワーク アクセスを許可",
			ENABLE_AUTHENTICATION: 		"認証を有効にする",
			ENABLE_WRITE_ACCESS: 		"書き込みアクセスを有効にする",
			ENABLE_MEDIA_SHARE: 		"メディア共有を有効にする",
			
			BROWSE: 					"参照",
			BROWSE_TITLE: 				"フォルダーを選択",

			NO_VOLUMN:					"ボリュームなし",
			
			NOTICE: 					"[動的 DNS] ページに移動してよろしいですか?保存して移動するには、[保存] をクリックします。保存せずに移動するには、[移動] をクリックします。移動しない場合は [キャンセル] をクリックします。",
			NO_CHANGE_NOTICE: 			"[動的 DNS] ページに移動してよろしいですか?",

			SAVE_FAILED_NOTICE: 		"保存できませんでした",
			CONTINUE: 					"移動",
			CONTINUE_SAVE: 				"保存",
			CANCLE: 					"キャンセル",

			ENABLE: 					"有効"

		},

		PRINT:{
			TITLE: 						"印刷サーバー",
			NAME: 						"プリンター名",
			ENABLE_PRINT_SERVER: 		"印刷サーバー",
			NONE: 						"なし",
			
			NOTE_TITLE: 				"注:",
			STEP1: 						"手順 1:",
			STEP2: 						"手順 2:",
			STEP3: 						"手順 3:",

			NOTE1: 						"コンピューターにプリンター ドライバーをインストールします。",
			NOTE2: 						"USB ケーブルを使用してルーターの USB ポートに USB プリンターを接続します。",
			NOTE3: 						"TP-LINK USB プリンター コントローラー ユーティリティをインストールします。当社の公式ウェブサイトからダウンロードしてください:<a class=\"link\" href=\"http://www.tp-link.com/en/Support/\" target=\"_blank\">http://www.tp-link.com/en/Support/</a>",
			NOTE3_US: 					"TP-LINK USB プリンター コントローラー ユーティリティをインストールします。当社の公式ウェブサイトからダウンロードしてください:<a class=\"link\" href=\"http://www.tp-link.us/Support/\" target=\"_blank\">http://www.tp-link.us/Support/</a>"
            },

		PARENTAL_CTR:{
			TITLE: 						"保護者による制限",
			STATUS: 					"保護者による制限",
			UNKNOWN: 					"不明",

			DEVICE_CTR: 				"保護者による制限対象のデバイス",
			DEVICE: 					"デバイス名",
			MAC_ADDRESS: 				"MAC アドレス",
			TIME: 						"インターネット アクセス時間",
			DESCRIPTION: 				"説明",
			
			ENABLE_THIS_ENTRY: 			"このエントリを有効にする",
			OPTIONAL: 					"(オプション)",
			BTN_VIEW: 					"既存のデバイスの表示",
			
			DEVICE_LIST: 				"デバイス リスト",
			SYSTEM_TIME: 				"システム時間",
			
			RESTR: 						"コンテンツ制限",
			MODE: 						"制限ポリシー",
			BLACKMODE: 					"ブラックリスト",
			WHITEMODE: 					"ホワイトリスト",
			ACCESS_DEVICES_LIST: 		"アクセス デバイス リスト",
			
			CHOOSE: 					"選択",
			ADD_A_NEW_KEYWORD: 			"ブロックする新しいキーワードの追加",
			ADD_A_NEW_DOMAIN_NAME: 		"アクセス先の新しいドメイン名の追加",
			
			YOURPC:						"ご使用の PC"
		},

		STREAMBOOST: {
			TITLE: 						"ストリーム ブースト",
			INTERNET: 					"インターネット",
			ROUTER: 					"ルーター",
			WINDOWS: 					"Windows",
			ANDROID: 					"Android",
			MAC_IOS: 					"MAC/IOS",
			UNIX: 						"Unix",
			LINUX: 						"Linux",
			OTHERS: 					"その他",

			DEVICE: 					"デバイス",
			RATE: 						"レート",
			APPLICATION: 				"アプリケーション",

			NAME: 						"名前",
			MAC_ADDRESS: 				"MAC アドレス",
			IP_ADDRESS: 				"IP アドレス",


			DEVICES: 					"デバイス"

			
		},

		BANDWIDTH:{
			BANDWIDTH: 					"帯域幅",
			TEST_BANDWIDTH: 			"&gt;帯域幅のテスト",
			STREAMBOOST: 				"ストリーム ブースト",
			ENABLE_STREAMBOOST: 		"ストリーム ブーストを有効にする",
			UP_LIMITATION: 				"アップ制限 (Mbps)",
			DOWN_LIMITATION: 			"ダウン制限 (Mbps)",
			RUN_BANDWIDTH_TEST: 		"帯域幅テストの実行",
			TESTING: 					"テスト",
			TEST_FAILED: 				"テストが失敗しました",
			TEST_SUCCEED: 				"テストが正常に完了しました",
			ENABLE_AUTOMATIC_TEST: 		"自動テストを有効にする",
			KEEP_UP_TO_DATE: 			"ストリーム ブーストを最新の状態に保つ",
			ENABLE_AUTOMATIC_UPDATE: 	"自動更新を有効にする"

		},

		PRIORITY:{
			PRIORITY: 					"優先度",
			PRIORITY_TIPS: 				"優先度により、デバイスごとの重要度を変更できます。これは、限られた帯域幅を、同じ分類のアプリケーションと共有している場合に便利です。",
			ALL_DEVICE: 				"すべてのデバイス",
			ACTIVE_DEVICE: 				"アクティブ デバイス",
			SAVE: 						"保存",
			ID: 						"ID",
			DEVICE: 					"デバイス",
			TYPE: 						"タイプ",
			MAC_ADDRESS: 				"MAC アドレス",
			STICK: 						"スティック"
		},

		STREAMBOOST_STATISTICS: {
			STATISTICS: 				"統計",
			UP_TIME: 					"稼動時間",
			DOWNLOADS: 					"ダウンロード",
			LAST_DAY: 					"最終日",
			LAST_WEEK: 					"最終週",
			LAST_MONTH: 				"最終月",
			ALL_LAN_HOSTS: 				"すべての LAN ホスト",
			OTHER: 						"その他"

		},

		SECURITY_SETTING: {
			FIREWALL: 					"ファイアウォール",
			ENABLE_SPI: 				"SPI ファイアウォール",

			DOS_PROTECTION: 			"DoS 保護",
			ENABLE_DOS: 				"DoS 保護",
			
			OFF: 						"オフ",
			LOW: 						"低",
			MIDDLE: 					"中",
			HIGH: 						"高",

			ICMP: 						"ICMP-FLOOD 攻撃フィルタリング",
			UDP: 						"UDP-FLOOD 攻撃フィルタリング",
			TCP: 						"TCP-SYN-FLOOD 攻撃フィルタリング",
			ENABLE_DOS_TIP:             "DoS 保護とトラフィック統計は同時に有効になっていなければなりません。",

			IGNORE: 					"WAN ポートからの Ping パケットを無視",
			FORBID: 					"LAN ポートからの Ping パケットを禁止",

			BLOCK_DOS: 					"ブロックされた DoS ホスト リスト",
			HOST_NUMBER: 				"ホスト番号",
			IP_ADDRESS: 				"IP アドレス",
			MAC_ADDRESS: 				"MAC アドレス"
		},

		ACCESS_CTR:{
			ACCESSCTR: 					"アクセス コントロール",
			ENABLE_ACCESS: 				"アクセス コントロール",

			ACCESS_MODE: 				"アクセス モード",
			DEFAULT_ACCESS_MODE: 		"既定のアクセス モード",
			BLACK_LIST: 				"ブラックリスト",
			WHITE_LIST: 				"ホワイトリスト",
			
			WIRED:						"有線",
			WIRELESS:					"ワイヤレス",

			DEVICE_ONLINE: 				"オンライン デバイス",
			NAME: 						"デバイス名",
			IP_ADDRESS: 				"IP アドレス",
			MAC_ADDRESS: 				"MAC アドレス",
			CONN_TYPE: 					"接続タイプ",

			BLOCK: 						"ブロック",

			DEVICE_IN_WHITE: 			"ホワイトリストのデバイス",
			DEVICE_IN_BLACK: 			"ブラックリストのデバイス"
		},

		IP_MAC:{
			TITLE: 						"設定",
			ENABLE_ARP: 				"ARP バインディング",

			ARP_LIST: 					"ARP リスト",
			ARP_NUM: 					"ARP エントリ数",

			MAC_ADDRESS: 				"MAC アドレス",
			IP_ADDRESS: 				"IP アドレス",
			BOUND: 						"バインド済み",
			UNBOUND: 					"バインドされていない",

			BINDING_LIST: 				"バインド リスト",
			DESCRIPTION: 				"説明",
			OPTIONAL: 					"(オプション)",
			ENABLE_THIS_ENTRY: 			"このエントリを有効にする"
		},

		TIMESET: {
			TITLE: 						"時刻設定",
			ZONE: 						"タイム ゾーン",
			DATE: 						"日付",
			DATEFORMAT: 				"MM/DD/YYYY",
			TIME: 						"時刻",
			TIMEFORMAT: 				"(HH/MM/SS)",
			NTP1: 						"NTP サーバー I",
			NTP2: 						"NTP サーバー II",
			OPTIONAL: 					"(オプション)",

			CURRENT_TIME:  				"現在の時刻",
			SET_TIME: 					"時刻の設定",
			AUTOMATIC: 					"インターネットから自動で取得",
			MANUAL: 					"手動",
			AUTOMATIC_BTN: 				"取得",


			GETGMT: 					"GMT の取得",

			
			GETGMT_SUCCESS: 			"NTP サーバーからの時刻の取得が正常に完了",
			GETGMT_TIMEOUT: 			"NTP サーバーからの時刻の取得がタイムアウト",
			GETGMT_WAIT: 				"待機中",
			
			M: 							"M",
			W: 							"W",
			D: 							"D",
			H: 							"H",
			
			DAYLIGHT_SAVING: 			"夏時間",
			ENABLE_DAYLIGHT: 			"夏時間を有効にする",
			START: 						"開始",
			END: 						"終了",

			RUNNING_STATUS: 			"実行ステータス",
			DOWN: 						"夏時間がオフになっています。",
			UP: 						"夏時間がオンになっています。"
		},

		DIAG:{
			TITLE: 						"診断",
			DIAGNOSTIC_TOOL: 			"診断ツール",
			PING: 						"Ping",
			TRACE: 						"Traceroute",

			IPADDR: 					"IP アドレス/ドメイン名",
			COUNT: 						"Ping 数",
			
			BASIC: 						"基本",
			ADVANCED: 					"詳細設定",
			
			COUNTUNIT: 					"(1-50)",

			PKT: 						"Ping パケット サイズ",
			PKTUNIT: 					"(4-1472 バイト)",

			TIMEOUT: 					"Ping タイムアウト",
			TIMOUTUNIT: 				"(100-2000 ミリ秒)",

			TTL: 						"Traceroute 最大 TTL",
			TTLUNIT: 					"(1-30)",
			
			START: 						"開始",
			STOP: 						"停止"
		},

		FIRMWARE:{
			TITLE: 						"ファームウェア アップグレード",
			FIRMWARE_INFO:  			"お使いのファームウェアは最新です",
			INFO: 						"デバイス情報",
			REMOTE_TITLE: 				"オンライン アップグレード",
			LOCAL_TITLE: 				"ローカル アップグレード",

			NEWFILE: 					"新しいファームウェア ファイル",
			FIRMWAREVERSION: 			"ファームウェア バージョン",
			HARDWAREVERSION: 			"ハードウェア バージョン",
			LATESTVERSION: 				"最新バージョン",
			CONFIRM_CONTENT:			"ファームウェアをアップグレードしてよろしいですか?",
			WARNING:					"ファームウェアをアップグレード中...<br/> 破損を避けるため、デバイスの電源は入れたままにしておき、処理中は何も操作しないでください。",
			REBOOTING: 					"再起動中...<br/> 破損を避けるため、デバイスの電源は入れたままにしておき、処理中は何も操作しないでください。",
			DO_NOT_OPERATE: 			"アップグレード中...<br/>処理中は操作しないでください。",
			FIRMWARE_UPDATING_NOTE: 	"1.ファームウェアを更新中...",
			REBOOTING_NOTE: 			"2.再起動中。",
			SCREEN_UPDATING_NOTE: 		"1.画面を更新中...",
			UPGRADE_FAILED: 			"アップグレードが失敗しました。",
			UPGRADE: 					"アップグレード",
			CHECK: 						"チェック",
			DOWNLOADING: 				"ダウンロード中...",
			UPGRADE_INOF: 				"破損を避けるため、ルータの電源は入れたままにしておいてください。",
			NOTE: 						"注: ",
			NO_UPGRADE: 				"これは最新バージョンです",

			UPGRADING: 					"アップグレード中...",
			RETRY: 						"再試行",
			CANCEL: 					"キャンセル",
			ILEGAL_DEVICE:				"デバイスを識別できません。TP-LINK テクニカル サポートにお問い合わせください。",
			UPGRADE_FAIL: 				"アップグレードできません。あとでもう一度実行してください。",
			CHECK_UPGRADE:				"アップグレードの確認"
		},

		BACKUP:{
			BACKUP: 					"バックアップ",
			BACKUPTIP: 					"現在の設定のコピーを保存してください。",

			RESTORE: 					"復元",
			RESTORETIP: 				"保存されている設定をファイルから復元してください。",
			
			RESTORE_WARN:				"ルーターを復元中...<br/>処理中は操作しないでください。",
			RESTORE_CONFIRM_CONTENT: 	"バックアップ ファイルからルーターを復元してよろしいですか?",
			
			FILE: 						"ファイル",

			FACTORY: 					"既定の復元",
			FACTORYTIP: 				"すべての設定を既定値に戻します。",
			FACTORY_CONFIRM_CONTENT:	"ルーターを既定値に復元してよろしいですか?",
			FACTORY_WARN:				"ルーターを復元中...<br/>処理中は操作しないでください。",
			
			BACKUPBTN: 					"バックアップ",
			RESTOREBTN: 				"復元",
			FACTORYBTN: 				"既定の復元"
		},

		ACCOUNT:{
			ACCOUNT_TITLE: 				"アカウント管理",
			
			OLDUSER: 					"古いユーザー名",
			OLDPWD: 					"古いパスワード",

			NEWUSER: 					"新しいユーザー名",
			NEWPWD: 					"新しいパスワード",
			CONFIRM: 					"新しいパスワードの確認",

			RECOVERYINFO: 				"パスワードの復元",
			ENABLE_PASSWORD_RECOVERY: 	"パスワードの復元を有効にする",
			FROM: 						"差出人",
			TO: 						"宛先",
			SMTP_SERVER: 				"SMTP サーバー",
			
			ENABLE_AUTHENTICATION: 		"認証を有効にする",
			USERNAME: 					"ユーザー名",
			PASSWORD: 					"パスワード",

			TEST_MAIL: 					"メールのテスト",

			LOCAL:						"ローカル管理",
			LOCAL_MAC_AUTH: 			"ローカル MAC 認証",
			ACCESS: 					"すべての LAN 接続デバイスに対してアクセスを許可",
			ACCESS_TIPS: 				"LAN 上のすべてのデバイスの管理を有効にするにはオンにします。特定のデバイスの管理を有効にするにはオフにしておきます。",
			
			MAC_ADDRESS: 				"MAC アドレス",
			VIEW_BTN: 					"既存のデバイスの表示",
			DESCRIPTION: 				"説明",

			EXIST_DEVICE:               "既存のデバイス",

			OPTIONAL: 					"(オプション)",
			ENABLE_THIS_ENTRY: 			"このエントリを有効にする",

			DEVICE_NAME:				"デバイス名",
			IP_ADDRESS:					"IP アドレス",
			

			REMOTE: 					"リモート管理",
			DISABLE_REMOTE_MANAGEMENR: 	"リモート管理を無効にする",
			ENABLE_REMOTE_MANAGEMENR_ALL: 	"すべてのデバイスのリモート管理を有効にする",
			ENABLE_REMOTE_MANAGEMENR: 	"指定されたデバイスのリモート管理を有効にする",
			WEB: 						"Web 管理ポート",

			NOTICE:						"仮想サーバー ポートと競合しています。続行してよろしいですか?",
			NOTICE_ENTER_ANOTHER:		"仮想サーバー ポートと競合しています。別のポートを入力してください。",

			REMOTEIP: 					"リモート管理 IP アドレス",
			REMOTEIPNOTE: 				"(すべてに 255.255.255.255 と入力してください)"
			
		},

		SYSLOG:{
			TITLE: 						"システム ログ",
			LOG_FILTER: 				"ログ フィルター:",
			
			TYPE_EQ: 					"タイプ=",
			
			ALL: 						"すべて",

			FIREWALL: 					"ファイアウォール", 
			NAT: 						"NAT",
			DDNS: 						"動的 DNS",
			UPNP:						"UPnP",
			IMB:            			"IP & MAC バインディング",
			IPTV:						"IPTV",
			DHCPS:						"DCHP サーバー",
			IGMP_PROXY:					"IGMP プロキシ",
			DOMAIN_LOGIN:				"ドメイン ログイン",
			BASIC_SECURITY: 			"基本セキュリティ",
			PARENTAL_CONTROL: 			"保護者による制限",
			ACCESS_CONTROL: 			"アクセス コントロール",
			DOS_PROTECTION: 			"DoS 保護",
			QOS: 						"QoS",
			TRAFFIC_STATS: 				"トラフィック統計",
			TIME_SETTINGS: 				"時刻設定",
			ACCOUNT_MANAGEMENT: 		"アカウント管理",
			LOCAL_MANAGEMENT: 			"ローカル管理",
			REMOTE_MANAGEMENT: 			"リモート管理",
			LOCALE: 					"ロケール",
			FACTORY_RESET: 				"既定の復元",
			LED_CONTROLLER: 			"LED コントローラー",
			NETWORK: 					"ネットワーク",
			USBSHARE: 					"USB 共有",
			AND: 						"および",
			LEVEL: 						"レベル",
			EMERGENCY:					"緊急",
			ALERT:						"通知",
			CRITICAL:					"重大",
			ERROR: 						"エラー",
			WARNING: 					"警告",
			NOTICE: 					"注意",
			INFO: 						"情報",
			DEBUG: 						"デバッグ",

			INDEX: 						"インデックス",
			TYPE: 						"タイプ",
			TIME: 						"時刻",
			LEVEL_COL:					"レベル",

			CONTENT: 					"ログの内容",
			
			MAIL_LOG: 					"ログをメール送信",
			SAVE_LOG: 					"ログを保存",

			SEND_OK: 					"送信が正常に完了しました",
			SEND_FAILED: 				"送信が失敗しました",

			MAIL_SETTING: 				"メール設定",

 			FROM: 						"差出人",
 			TO: 						"宛先",
 			SMTP_SERVER: 				"SMTP サーバー",
 			ENABLE_AUTHENTICATION: 		"認証を有効にする",

 			USERNAME: 					"ユーザー名",
 			PASSWORD: 					"パスワード",
 			CONFIRM_PASSWORD: 			"パスワードの確認",

 			AUTO_MAIL: 					"自動メールを有効にする",
 			LOG_AT: 					"記録時刻:",
 			HH_MM: 						"(HH:MM) 毎日",

 			LOG_EVERY: 					"次の時間ごとに記録",
 			HOURS: 						"時間"
		},

		QOS:{
			TITLE: 						"QoS",
			QOS: 						"QoS",
			SETTINGS: 					"設定",
			STATUS: 					"QoS を有効にする",
			UPBANDWIDTH: 				"アップロード帯域幅",
			DOWNBANDWIDTH: 				"ダウンロード帯域幅",
			SPEED_M: 					"Mbps",
			SPEED_K: 					"Kbps",
			TEST: 						"速度テスト",
			RULE_LIST: 					"QoS ルール リスト",
			RULE: 						"QoS ルール",
			ID: 						"ID",
			NAME: 						"名前",
			TYPE: 						"タイプ",
			DETAIL: 					"詳細",
			PRIORITY: 					"優先度",

			APPLICATION: 				"アプリケーション",
			APPLICATION_LIST: 			"アプリケーション リスト",
			CUSTOM_APP: 				"カスタム アプリケーション",
			MAC_ADDR: 					"MAC アドレス",
			MAC_ADDR_P: 				"MAC:",
			IP_ADDR: 					"IP アドレス",
			IP_P: 						"IP:",
			PHYSICAL_PORT: 				"物理ポート",

			LOW: 						"低",
			MIDDLE: 					"中",
			HIGH: 						"高",

			PROTO: 						"プロトコル",
			PORT: 						"ポート",
			PROTO_P: 					"プロトコル:",
			PORT_P: 					"ポート:",
			PORT_TIPS: 					"(XX または XX-XX、1-65535、最大 5 組まで)",

			ALL: 						"すべて",
			TCP: 						"TCP",
			UDP: 						"UDP",
			TCP_UDP: 					"TCP/UDP",
			CUSTOM: 					"カスタム",

			WIFI_HOME: 					"WIFI-HOST",
			WIFI_GUEST: 				"WIFI-GUEST",
			PORT1: 						"LAN1",
			PORT2: 						"LAN2",
			PORT3: 						"LAN3",
			PORT4: 						"LAN4",

			DATABASE_UPGRADE: 			"データベース アップグレード",

			NEWFILE: 					"新しいデータベース ファイル",
			FIRMWAREVERSION: 			"データベース バージョン",
			CONFIRM_CONTENT:			"データベースを更新してよろしいですか?",
			WARNING:					"データベースを更新中...<br/>処理中は操作しないでください。",
			
			UPGRADE: 					"アップグレード",

			SERVICE_RESTART: 			"QoS 再開中",
			
			TYPE: 						"タイプ",
			BY_DEVICE: 					"デバイス別",
			BY_APP: 					"アプリケーション別",
			BY_PHY: 					"物理ポート別",

			HIGH_PRIORITY_LBL: 			"高優先度:",
			MIDDLE_PRIORITY_LBL: 		"中優先度:",
			LOW_PRIORITY_LBL: 			"低優先度:",

			HIGH_PRIORITY: 				"高優先度",
			MIDDLE_PRIORITY: 			"中優先度",
			LOW_PRIORITY: 				"低優先度"

		},

		APPLICATION:{
			APP_LIST: 					"アプリケーション リスト",
			GAME_LIST: 					"ゲーム リスト",

			QQ: 						"QQ"
			
		},

		STATISTICS: {
			TRIFFIC_STATISTICS: 		"トラフィック統計",
			ENABLE_STATISTICS: 			"トラフィック統計",

			TITLE: 						"トラフィック統計リスト",
			IP_MAC: 					"IP アドレス/MAC アドレス",
			TPKT: 						"合計パケット数",
			TBYTE: 						"合計バイト数",
			CPKT: 						"現在のパケット数",
			CBYTE: 						"現在のバイト数",
			CICMP: 						"現在の ICMP Tx",
			CUDP: 						"現在の UDP Tx",
			CSYN: 						"現在の SYN Tx",
			
			DELETE_CONFIRM: 			"トラフィック統計を削除してよろしいですか?",
			DELETE_ALL_CONFIRM: 		"すべてのトラフィック統計を削除してよろしいですか?",

			RESET_ALL: 					"すべてリセット"
		},

		SYSPARA:{
			W24G: 						"2.4GHz ワイヤレス",
			W5G: 						"5GHz ワイヤレス",
			W60G: 						"60GHz ワイヤレス",
			W24G_WDS: 					"2.4GHz WDS",
			W5G_WDS: 					"5GHz WDS",
			W60G_WDS: 					"60GHz WDS",
			SWITCH_NOTICE:  			"ワイヤレス機能がオフになっています。この機能を使用する場合は、Wi-Fi ボタンをオンにしてください。",

			ENABLE_TIPS: 				"ワイヤレス機能が無効になっています。",

			BEACON: 					"ビーコン間隔",
			BEACONUNIT: 				"(40-1000)",

			RTS: 						"RTS しきい値",
			RTSUNIT: 					"(1-2346)",
			
			FRAG: 						"断片化しきい値",
			FRAGUNIT: 					"(256-2346)",

			DTIM: 						"DTIM 間隔",
			DTIMUNIT: 					"(1-15)",

			GROUP: 						"グループ キーの更新期間",
			GROUPUNIT: 					"秒",
			
			MU_MIMO_FEATURE: 			"マルチユーザー MIMO",
			MU_MIMO: 					"MU-MIMO を有効にする",
			
			WMM_FEATURE: 				"WMM 機能",
			WMM: 						"WMM　を有効にする",

			GI_FEATURE: 				"短い GI 機能",
			GI: 						"Short GI を有効にする",

			AP_FEATURE: 				"AP 分離機能",
			AP: 						"AP 切り離しを有効にする",

			WDS_FEATURE: 				"WDS ブリッジング",
			WDS: 						"WDS ブリッジング",
			
			SSID_BRIDEGE: 				"SSID (ブリッジ対象)",
			SURVEY: 					"調査",

			SN: 						"SN",
			MAC_ADDRESS: 				"MAC アドレス",
			SSID: 						"SSID",
			SIGNAL: 					"信号",
			CHANNEL: 					"チャンネル",
			SECURITY: 					"セキュリティ",
			CHOSEN: 					"選択済み",
			AP_NUMBER:					"AP 番号",

			TOTAL: 						"合計項目数",

			MAC: 						"MAC アドレス (ブリッジ対象)",
			MACUNIT: 					"例:00-1D-0F-11-22-33",

			SECURITY: 					"セキュリティ",
			NO: 						"いいえ",
			NONE: 						"セキュリティなし",
			WPA: 						"WPA-PSK/WPA2-PSK",
			WPA2: 						"WPA2-PSK",
			WEP: 						"WEP",
			
			PASSWORD: 					"パスワード",
			
			AUTH_TYPE: 					"認証タイプ",
			AUTO: 						"自動",
			OPEN: 						"オープン システム",
			SHARED: 					"共有キー",

			WEP_INDEX: 					"WEP インデックス",
			KEY1: 						"Key1",
			KEY2: 						"Key2",
			KEY3: 						"Key3",
			KEY4: 						"Key4",

			WEP_KEY_FORMAT: 			"WEP キー形式",
			ASC: 						"ASCII",
			HEX: 						"16 進",			

			WPS: 						"WPS",
			ENABLE_WPS: 				"WPS　を有効にする",

			NAT: 						"NAT",
			ENABLE_NAT: 				"NAT を有効にする",
			
			NAT_BOOST: 					"NAT ブースト",
			ENABLE_NAT_BOOST: 			"NAT ブーストを有効にする",
			
			MEDIA_SERVER: 				"メディア サーバー",
			SCAN_INTERVAL: 				"自動スキャン間隔 (時間)",
			SCAN_UNIT: 					"(2-48)",

			DOS_PROTECTION: 			"DoS 保護レベル設定",

			ICMP: 						"ICMP-FLOOD パケット レベル",
			UDP: 						"UDP-FLOOD パケット レベル",
			TCP: 						"TCP-FLOOD パケット レベル",

			WDS_MODE: 					"WDS モード",
			WDS1: 						"WDS1",
			WDS2: 						"WDS2",

			LOW: 						"低",
			MIDDLE: 					"中",
			HIGH: 						"高",

			TO: 						"～",
			NOTICE_NAT_REBOOT: 			"再起動中...<br/>処理中は操作しないでください。",

			NOTICE_NAT_BOOST: 			"NAT ブーストを修正すると、デバイスが再起動されます。続行してよろしいですか?",
			NOTICE:						"ルーターのチャンネルが、ブリッジされた AP のチャンネルと同じではありません。変更しますか?",

			UNIT: 						"(5-7200) パケット/秒",
			LED: 						"LED コントロール",
			NIGHT_MODE: 				"夜モード",
			PERIOD_NIGHT_TIME: 			"夜モード期間",
			ENABLE: 					"夜モードを有効にする",
			HH_MM: 						"(HH:MM)",
			TO: 						"～",
			NIGHT_MODE_NOTE:            "LED がオフになっています。この機能を使用する場合は、LED ボタンを押すか、ページの右上にある LED をクリックしてください。",
			NOTE2:                      "夜モード期間は、ルーターのシステム時刻に基づいて有効になります。ルーターの時刻がセットアップされていることを確認してください。"
		},
		VPN:{
			OPEN_VPN: 					"OpenVPN",
			NO_CERT_NOTE: 				"現在、証明書がありません。VPN サーバーを有効にする前に<b>生成</b>してください。",
			NO_CERT_NOTE2: 				"現在、証明書がありません。設定をエクスポートする前に<b>生成</b>してください。",
			ENABLE_VPN_SERVER: 			"VPN サーバーを有効にする",
			SERVICE_TYPE: 				"サービス タイプ",
			SERVICE_PORT: 				"サービス ポート",
			VPN_SUBNET: 				"VPN サブネット/ネットマスク",
			CLIENTS_ACCESS: 			"クライアント アクセス",
			UDP: 						"UDP",
			TCP: 						"TCP",
			HOME_NETWORK_ONLY: 			"ホーム ネットワークのみ",
			INTERNET_HOME: 				"インターネットとホーム ネットワーク",
			CERT_STR: 					"現在、証明書がありません。[OK] をクリックして生成し、設定を保存してください。",
			CERT_STR2: 					"現在、証明書がありません。[OK] をクリックして生成し、設定をエクスポートしてください。",
			CONF_FILE: 					"設定ファイル", 
			EXPORT_CONF_FILE: 			"設定ファイルをエクスポートします。",
			EXPORT: 					"エクスポート",

			PPTPVPN: 					"PPTP VPN",
			CLIENT_IP_ADDRESS: 			"クライアント IP アドレス",
			ACCOUNT_USERNAME: 			"ユーザー名",
			ACCOUNT_PASSWORD: 			"パスワード",
			CLIENT_IP_NOTE: 			"(最大 10 クライアント)",
			SAME_SUBNET_NOTE: 			"クライアント IP アドレスと LAN IP アドレスを同じサブネット内にすることはできません。<br/>入力しなおしてください。",
			CONFLICT_WITH_DHCP: 		"クライアント IP アドレスが DHCP IP アドレス プールと競合しています。<br/>もう一度入力してください。",
			CONFLICT_WITH_RESERVED: 	"クライアント IP アドレスが予約 IP アドレスと競合しています。<br/>もう一度入力してください。",
			CONFLICT_WITH_OPENVPN: 		"クライアント IP アドレスと OpenVPN IP アドレスを同じサブネット内にすることはできません。<br/>もう一度入力してください。",
			SAME_SUBNET_NOTE2: 			"VPN サブネット/ネットマスクと　LAN IP アドレスを同じサブネット内にすることはできません。<br/>入力しなおしてください。",
			CONFLICT_WITH_DHCP2: 		"VPN サブネット/ネットマスクが DHCP IP アドレス プールと競合しています。<br/>もう一度入力してください。",
			CONFLICT_WITH_RESERVED2: 	"VPN サブネット/ネットマスクが予約 IP アドレスと競合しています。<br/>もう一度入力してください。",
			CONFLICT_WITH_PPTPVPN: 		"VPN サブネット/ネットマスクと　PPTP VPN IP アドレスを同じサブネット内にすることはできません。<br/>もう一度入力してください。",
			LAN_CONFLICT_WITH_OPENVPN: 	"LAN IP アドレスと OPENVPN IP アドレスを同じサブネット内にすることはできません。<br/>もう一度入力してください。",
			LAN_CONFLICT_WITH_PPTPVPN: 	"LAN IP アドレスと PPTP VPN IP アドレスを同じサブネット内にすることはできません。<br/>もう一度入力してください。",
			VPN_MASK_ERROR: 			"ネットマスクを 255.255.255.248 より大きくすることはできません。<br/>もう一度入力してください。",
			ACCOUNT_LIST: 				"アカウント リスト (最大 16 ユーザー)",
			ADVANCED_SETTING: 			"詳細設定",
			ALLOW_SAMBA: 				"Samba (ネットワーク プレース) のアクセスを許可する",
			ALLOW_NETBIOS: 				"NetBIOS パススルーを許可する",
			ALLOW_UNENCRYPTED_CONN: 	"暗号化されていない接続を許可する",
			USERNAME_CONFLICT: 			"このユーザー名は既に存在します。入力しなおしてください。",
				
			NOTICE_VS_CONFLICT:			"仮想サーバーの外部ポートと競合しています。別のポートを入力してください。",
			NOTICE_PT_CONFLICT:			"ポート　トリガーの外部ポートと競合しています。別のポートを入力してください。",
			NOTICE_VS_MODIFY:			"仮想サーバーの外部ポート　(1723) と競合しています。[<a onclick=\"$.su.menu.advanced.goTo('virtual-servers');\" class=\"link\" style=\"cursor:pointer;\"  src=\"void(0)\">仮想サーバー</a>] ページで、仮想サーバーの外部ポートを変更してください。",
			NOTICE_PT_MODIFY:			"ポート　トリガーの外部ポート (1723) と競合しています。[<a onclick=\"$.su.menu.advanced.goTo('port-triggering');\" class=\"link\" style=\"cursor:pointer;\" src=\"void(0)\">ポート トリガー</a>] ページで、ポート トリガーの外部ポートを変更してください。",
			
			GENERATE_CERT: 				"証明書",
			GENERATE_NEW_CERT: 			"証明書を生成します。",
			GENERATE: 					"生成",
			GENERATE_TIPS: 				"証明書を生成中...<br/>完了まで数分かかります。お待ちください。",
			CERT_SUCCESS: 				"正常完了",
			CERT_FAIL: 					"失敗しました。もう一度実行してください。",
			
			VPN_CONNECTIONS: 			"VPN 接続",
			OPEN_VPN_CONNECTIONS: 		"OpenVPN 接続",
			PPTP_VPN_CONNECTIONS: 		"PPTP VPN 接続",
			USER: 						"ユーザー",
			REMOTE_IP: 					"リモート IP",
			ASSIGNED_IP: 				"割り当てられた IP"
		}
	};
})(jQuery);
