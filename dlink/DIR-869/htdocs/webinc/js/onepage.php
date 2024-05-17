<?include "/htdocs/phplib/inet.php";?>
<?include "/htdocs/phplib/lang.php";?>
<script type="text/javascript">
function Page() {}
Page.prototype =
{
	services: "INET.LAN-1,PHYINF.WAN-1,INET.WAN-1,INET.WAN-2,WAN,WIFI.PHYINF,PHYINF.WIFI,DEVICE.ACCOUNT,MYDLINK",
	logindefault: 0,
	OnLoad: function()
	{
		var confsize = <?echo query("/runtime/device/devconfsize");?>
	},
	OnUnload: function() {},
	ShowSavingMessage: function() {},
	OnSubmitCallback: function (code, result)
	{
		//alert("OnSubmitCallback = code["+code+"]\n");
		switch (code)
		{
			case "OK":
				for(var i=0; i<this.stages.length; i++) 
				{
					if(this.stages[i]==="stage_check_connect" && !this.saveonly)
						this.currentStage = i;
				}
				this.ShowCurrentStage();
				return true;
				break;
			case "BUSY":
				setTimeout('PAGE.SaveXML()', 500);
				break;
			case "HEDWIG":
				BODY.ShowAlert(result.Get("/hedwig/message"));
				break;
			case "PIGWIDGEON":
				if (result.Get("/pigwidgeon/message")=="no power")
				{
					BODY.NoPower();
				}
				else
				{
					BODY.ShowAlert(result.Get("/pigwidgeon/message"));
				}
				break;
			default : 
				this.currentStage--;
				this.ShowCurrentStage();
				return false;
		}
		return true;
	},
	InitValue: function(xml)
	{
		PXML.doc = xml;	
	
		if (!this.InitWAN()) return false;
		if (!this.InitWLAN()) return false;
		if (!this.Initial()) return false;
                if (!this.InitMydlink()) return false;


		this.ShowCurrentStage();
		return true;
	},
	PreSubmit: function()
	{
		PXML.CheckModule("INET.WAN-1", null, null, "ignore");
		PXML.CheckModule("INET.WAN-2", null, null, "ignore");
		PXML.CheckModule("PHYINF.WAN-1", null, null, "ignore");
		PXML.CheckModule("WAN", null, "ignore", null);
	
		if (!this.PreWAN()) return null;
		if (!this.PreWLAN()) return null;
		if (!this.PreDEVICE()) return null;
		return PXML.doc;
	},
	IsDirty: null,
	Synchronize: function() {},
	// The above are MUST HAVE methods ...
	///////////////////////////////////////////////////////////////////////
	inet1p: null,
	inet2p: null,
	inet3p: null,
	inet4p: null,
	inf1p: null,
	inf2p: null,
	inf3p: null,
	inf4p: null,
	wifip: null,
	wifip2: null,
	wlanbase: null,
	phyinf: null,
	phyinf2: null,
	is_wifi_client: <?echo is_wifi_client($_SERVER["REMOTE_ADDR"]);?>,
	stages: new Array ("stage_set","stage_check_connect","stage_no_cable","stage_pppoe_error","stage_login_success"),
	wanTypes: new Array ("DHCP","DHCPPLUS", "PPPoE", "PPTP", "L2TP", "STATIC"),
	currentStage: 0, //0 ~ this.stages.length
	currentWanType: 0, //0 ~ this.wanTypes.length
	isFreset: <?if (query("/runtime/device/devconfsize")>0) echo 'false'; else echo 'true';?>,
	internetCheck: 0,
	internetStatusCheck: 0,
	drawbar: 0,
	dhcps4: null,
	dhcps4_inet: null,
	leasep: null,
	lanip: null,
	waninetp: null,
	rwaninetp: null,
	rwanphyp: null,
	macaddrp: null,
	wancable_status: 0,
	mydlinkp: null,
	saveonly: false,
	refresh_timer: null,
	old_ipaddr: null,
	old_networkstatus: null,
	old_wanipaddr: null,
	Initial: function()
	{
		this.actp = PXML.FindModule("DEVICE.ACCOUNT");
		this.actp += "/device/account";
		OBJ("adminpwd2").value = XG(this.actp+"/entry:1/password");
		return true;
	},
	InitWAN: function()
	{
		this.inet1p = PXML.FindModule("INET.WAN-1");
		this.inet2p = PXML.FindModule("INET.WAN-2");
		var phyinfp = PXML.FindModule("PHYINF.WAN-1");
		
		if (!this.inet1p || !this.inet2p || !phyinfp)
		{
			BODY.ShowAlert("InitWAN() ERROR !");
			return false;
		}
		
		var inet1 = XG(this.inet1p+"/inf/inet");
		var inet2 = XG(this.inet2p+"/inf/inet");
		var eth = XG(phyinfp+"/inf/phyinf");
		this.inf1p = this.inet1p+"/inf";
		this.inf2p = this.inet2p+"/inf";
		this.inet1p = GPBT(this.inet1p+"/inet", "entry", "uid", inet1, false);
		this.inet2p = GPBT(this.inet2p+"/inet", "entry", "uid", inet2, false);
		phyinfp = GPBT(phyinfp, "phyinf", "uid", eth, false);
		this.macaddrp = phyinfp+"/macaddr";
		var macaddr = XG(this.macaddrp);
		
		/*initial wan type*/
		this.GetWanType();
		COMM_SetSelectValue(OBJ("wan_mode"), this.wanTypes[this.currentWanType]);
		
		/*initial settings*/
		/*Static IP*/
		OBJ("wiz_static_ipaddr").value = ResAddress(XG(this.inet1p+"/ipv4/ipaddr"));
		OBJ("wiz_static_mask").value = COMM_IPv4INT2MASK(XG(this.inet1p+"/ipv4/mask"));
		OBJ("wiz_static_gw").value = ResAddress(XG(this.inet1p+"/ipv4/gateway"));
		var ipv4_cnt = XG(this.inet1p+"/ipv4/dns/count");
		OBJ("wiz_static_dns1").value = ipv4_cnt>0 ? XG(this.inet1p+"/ipv4/dns/entry:1") : "0.0.0.0";
		OBJ("wiz_static_dns2").value = ipv4_cnt>1 ? XG(this.inet1p+"/ipv4/dns/entry:2") : "0.0.0.0";
		
		/*DHCPPLUS*/
		OBJ("wiz_dhcpplus_user").value = XG(this.inet1p+"/ipv4/dhcpplus/username");
		OBJ("wiz_dhcpplus_pass").value = XG(this.inet1p+"/ipv4/dhcpplus/password");
		
		/*PPPv4 hidden nodes*/
		OBJ("ppp4_timeout").value	= IdleTime(XG(this.inet1p+"/ppp4/dialup/idletimeout"));
		OBJ("ppp4_mode").value = XG(this.inet1p+"/ppp4/dialup/mode");
		OBJ("ppp4_mtu").value = XG(this.inet1p+"/ppp4/mtu");
		
		/*PPPoE*/
		OBJ("wiz_pppoe_usr").value = XG(this.inet1p+"/ppp4/username");
		OBJ("wiz_pppoe_passwd").value = XG(this.inet1p+"/ppp4/password");
		
		/*PPTP*/
		OBJ("wiz_pptp_ipaddr").value = ResAddress(XG(this.inet2p+"/ipv4/ipaddr"));
		OBJ("wiz_pptp_mask").value = COMM_IPv4INT2MASK(XG(this.inet2p+"/ipv4/mask"));
		OBJ("wiz_pptp_gw").value = ResAddress(XG(this.inet2p+"/ipv4/gateway"));
		OBJ("wiz_pptp_svr").value = ResAddress(XG(this.inet1p+"/ppp4/pptp/server"));
		OBJ("wiz_pptp_usr").value = XG(this.inet1p+"/ppp4/username");
		OBJ("wiz_pptp_passwd").value = XG(this.inet1p+"/ppp4/password");
		var ppp4_cnt = XG(this.inet1p+"/ppp4/dns/count");
		OBJ("wiz_pptp_dns1").value = ppp4_cnt>0 ? XG(this.inet1p+"/ppp4/dns/entry:1") : "";
		OBJ("wiz_pptp_dns2").value = ppp4_cnt>1 ? XG(this.inet1p+"/ppp4/dns/entry:2") : "";
		OBJ("wiz_pptp_mac").value = XG(this.macaddrp);
		
		/*L2TP*/
		OBJ("wiz_l2tp_ipaddr").value = ResAddress(XG(this.inet2p+"/ipv4/ipaddr"));
		OBJ("wiz_l2tp_mask").value = COMM_IPv4INT2MASK(XG(this.inet2p+"/ipv4/mask"));
		OBJ("wiz_l2tp_gw").value = ResAddress(XG(this.inet2p+"/ipv4/gateway"));
		OBJ("wiz_l2tp_svr").value = ResAddress(XG(this.inet1p+"/ppp4/l2tp/server"));
		OBJ("wiz_l2tp_usr").value = XG(this.inet1p+"/ppp4/username");
		OBJ("wiz_l2tp_passwd").value = XG(this.inet1p+"/ppp4/password");
		var ppp4_cnt = XG(this.inet1p+"/ppp4/dns/count");
		OBJ("wiz_l2tp_dns1").value = ppp4_cnt>0 ? XG(this.inet1p+"/ppp4/dns/entry:1") : "";
		OBJ("wiz_l2tp_dns2").value = ppp4_cnt>1 ? XG(this.inet1p+"/ppp4/dns/entry:2") : "";
		OBJ("wiz_l2tp_mac").value = XG(this.macaddrp);
		
		if (XG(this.inet2p+"/ipv4/static")=="1")
		{
			document.getElementsByName("wiz_pptp_conn_mode")[1].checked = true;
			document.getElementsByName("wiz_l2tp_conn_mode")[1].checked = true;
		}
		else
		{
			document.getElementsByName("wiz_pptp_conn_mode")[0].checked = true;
			document.getElementsByName("wiz_l2tp_conn_mode")[0].checked = true;
		}
		
		this.OnChangePPTPMode();
		this.OnChangeL2TPMode();
		
		return true;
	},
	InitWLAN: function()
	{
		this.wlanbase = PXML.FindModule("WIFI.PHYINF");
		this.phyinf = GPBT(this.wlanbase, "phyinf", "uid", "BAND24G-1.1", false);
		var wifi_profile1 = XG(this.phyinf+"/wifi");
		this.wifip = GPBT(this.wlanbase+"/wifi", "entry", "uid", wifi_profile1, false);
		
		if (!this.wifip)
		{
			BODY.ShowAlert("InitWLAN() ERROR !");
			return false;
		}
		
		this.randomkey = RandomHex(10);
		OBJ("wiz_ssid").value = XG(this.wifip+"/ssid");
		/*Show the default Pre-Shared Key if the default security mode is WPA+2PSK.*/
		if(XG(this.wifip+"/authtype")=="WPA+2PSK" || XG(this.wifip+"/authtype")=="WPA2PSK" || XG(this.wifip+"/authtype")=="WPAPSK")
		{	
			OBJ("wiz_key").value=XG(this.wifip+"/nwkey/psk/key");
		}	
		
		this.dual_band = true;
		if(this.dual_band)
		{
			this.phyinf2 = GPBT(this.wlanbase, "phyinf", "uid", "BAND5G-1.1", false);
			var wifi_profile2 = XG(this.phyinf2+"/wifi");
			this.wifip2 = GPBT(this.wlanbase+"/wifi", "entry", "uid", wifi_profile2, false);
			if (!this.wifip2)
			{
				BODY.ShowAlert("InitWLAN() ERROR !");
				return false;
			}
			/*Show the default Pre-Shared Key if the default security mode is WPA+2PSK.*/
			if(XG(this.wifip2+"/authtype")=="WPA+2PSK" || XG(this.wifip2+"/authtype")=="WPA2PSK" || XG(this.wifip2+"/authtype")=="WPAPSK")
			{	
				OBJ("wiz_key_Aband").value=XG(this.wifip2+"/nwkey/psk/key");
			}
			OBJ("wiz_ssid_Aband").value = XG(this.wifip2+"/ssid"); 
			OBJ("div_ssid_A").style.display = "block"; 
		}
		else
			OBJ("wifi24_name_pwd_show").innerHTML	= '<?echo I18N("j","Give your Wi-Fi network a name.");?>';
		return true;
	},
	InitMydlink:function()
	{
                this.mydlinkp = PXML.FindModule("MYDLINK");
                var mtdagent = XG(this.mydlinkp+"/mydlink/register_st");
                if(mtdagent != "1")
                {
                        OBJ("mydlink_disconnectd").style.display = "block"; 
                        OBJ("mydlink_connectd").style.display = "none"; 
                }else{
                        OBJ("mydlink_disconnectd").style.display = "none"; 
                        OBJ("mydlink_connectd").style.display = "block"; 

		}	
                return true;
	},
	PreDEVICE: function()
	{
		XS(this.actp+"/entry:1/password",OBJ("adminpwd2").value);
		return true;
	},
	PreWAN: function()
	{
		var type = this.wanTypes[this.currentWanType];
		var cnt = 0;
		XD(this.inet1p+"/ipv4");
		XD(this.inet1p+"/ppp4");
		XS(this.inf1p+"/lowerlayer", "");
		XS(this.inf1p+"/upperlayer", "");
		XS(this.inf1p+"/schedule", "");
		XS(this.inf1p+"/child", "");
		XS(this.inf2p+"/lowerlayer", "");
		XS(this.inf2p+"/upperlayer", "");
		XS(this.inf2p+"/schedule", "");
		XS(this.inf2p+"/active", 0);
		XS(this.inf2p+"/defaultroute", "");
		XS(this.inf2p+"/nat", "");
		
		switch (type)
		{
			case "STATIC":
				XS(this.inet1p+"/addrtype", "ipv4");
				XS(this.inet1p+"/ipv4/static", "1");
				XS(this.inet1p+"/ipv4/ipaddr", OBJ("wiz_static_ipaddr").value);
				XS(this.inet1p+"/ipv4/mask", COMM_IPv4MASK2INT(OBJ("wiz_static_mask").value));
				XS(this.inet1p+"/ipv4/gateway", OBJ("wiz_static_gw").value);
				XS(this.inet1p+"/ipv4/mtu", "1500"); /*default*/
				SetDNSAddress(this.inet1p+"/ipv4/dns", OBJ("wiz_static_dns1").value, OBJ("wiz_static_dns2").value);
				break;
			case "DHCP":
				XS(this.inet1p+"/addrtype", "ipv4");
				XS(this.inet1p+"/ipv4/dhcpplus/enable", "0");
				XS(this.inet1p+"/ipv4/static", "0");
				XS(this.inet1p+"/ipv4/mtu", "1500");
				SetDNSAddress(this.inet1p+"/ipv4/dns", "", "");
				break;
			case "DHCPPLUS":
				XS(this.inet1p+"/ipv4/dhcpplus/enable", "1");
				XS(this.inet1p+"/ipv4/dhcpplus/username", OBJ("wiz_dhcpplus_user").value);
				XS(this.inet1p+"/ipv4/dhcpplus/password", OBJ("wiz_dhcpplus_pass").value);
				break;
			case "PPPoE":
				/*use dynamic*/
				XS(this.inet1p+"/addrtype", "ppp4");
				XS(this.inet1p+"/ppp4/over", "eth");
				XS(this.inet1p+"/ppp4/static", "0");
				XS(this.inet1p+"/ppp4/username", OBJ("wiz_pppoe_usr").value);
				XS(this.inet1p+"/ppp4/password", OBJ("wiz_pppoe_passwd").value);
				XD(this.inet1p+"/ppp4/ipaddr");
				XS(this.inet1p+"/ppp4/mppe/enable",	"0");
				XS(this.inet1p+"/ppp4/dns/count", "0");
				XS(this.inet1p+"/ppp4/dns/entry:1","");
				XS(this.inet1p+"/ppp4/dns/entry:2","");
				break;
			case "PPTP":
				var dynamic_pptp = document.getElementsByName("wiz_pptp_conn_mode")[0].checked ? true: false;
				XS(this.inf2p+"/active", "1");
				XS(this.inet2p+"/nat", "");
				XS(this.inet1p+"/addrtype", "ppp4");
				XS(this.inet1p+"/ppp4/over", "pptp");
				XS(this.inet1p+"/ppp4/static", "0");
				XS(this.inet1p+"/ppp4/username", OBJ("wiz_pptp_usr").value);
				XS(this.inet1p+"/ppp4/password", OBJ("wiz_pptp_passwd").value);
				XS(this.inet1p+"/ppp4/pptp/server", OBJ("wiz_pptp_svr").value);
				
				cnt = 0;
				if (dynamic_pptp) /*dynamic*/
				{
					XS(this.inet2p+"/ipv4/static", "0");
					
					if (OBJ("wiz_pptp_dns1").value !== "")
					{
						XS(this.inet1p+"/ppp4/dns/entry:1", OBJ("wiz_pptp_dns1").value);
						cnt++;
					}
					else XS(this.inet1p+"/ppp4/dns/entry:1", "");
					if (OBJ("wiz_pptp_dns2").value !== "")
					{
						XS(this.inet1p+"/ppp4/dns/entry:2", OBJ("wiz_pptp_dns2").value);
						cnt++;
					}
					XS(this.inet1p+"/ppp4/dns/count", cnt);
					
					XD(this.inet2p+"/ipv4/dns");
					XS(this.inet2p+"/ipv4/dns/count", "0");
				}
				else /*static*/
				{
					XS(this.inet2p+"/ipv4/static",	"1");
					XS(this.inet2p+"/ipv4/ipaddr", OBJ("wiz_pptp_ipaddr").value);
					XS(this.inet2p+"/ipv4/mask", COMM_IPv4MASK2INT(OBJ("wiz_pptp_mask").value));
					XS(this.inet2p+"/ipv4/gateway", OBJ("wiz_pptp_gw").value);
					
					if (OBJ("wiz_pptp_dns1").value==="")
					{
						BODY.ShowAlert('<?echo i18n("Invalid Primary DNS address .");?>');
						return null;
					}
					XS(this.inet2p+"/ipv4/dns/entry:1", OBJ("wiz_pptp_dns1").value);
					XS(this.inet1p+"/ppp4/dns/entry:1", OBJ("wiz_pptp_dns1").value);
					cnt++;
					if (OBJ("wiz_pptp_dns2").value!=="")
					{
						XS(this.inet2p+"/ipv4/dns/entry:2", OBJ("wiz_pptp_dns2").value);
						XS(this.inet1p+"/ppp4/dns/entry:2", OBJ("wiz_pptp_dns2").value);
						cnt++;
					}
					XS(this.inet2p+"/ipv4/dns/count", cnt);
					XS(this.inet1p+"/ppp4/dns/count", cnt);
				}
				XS(this.inet1p+"/ppp4/mppe/enable", "0");
				XS(this.macaddrp, OBJ("wiz_pptp_mac").value);

				XS(this.inf1p+"/defaultroute", "100");
				XS(this.inf2p+"/defaultroute", "");
				XS(this.inf1p+"/lowerlayer", "WAN-2");
				XS(this.inf2p+"/upperlayer", "WAN-1");
				break;
			case "L2TP":
				var dynamic_l2tp = document.getElementsByName("wiz_l2tp_conn_mode")[0].checked ? true: false;
				XS(this.inf2p+"/active", "1");
				XS(this.inet2p+"/nat", "");
				XS(this.inet1p+"/addrtype", "ppp4");
				XS(this.inet1p+"/ppp4/over", "l2tp");
				XS(this.inet1p+"/ppp4/static", "0");
				XS(this.inet1p+"/ppp4/username",	OBJ("wiz_l2tp_usr").value);
				XS(this.inet1p+"/ppp4/password",	OBJ("wiz_l2tp_passwd").value);
				XS(this.inet1p+"/ppp4/l2tp/server",	OBJ("wiz_l2tp_svr").value);
				
				cnt = 0;
				if (dynamic_l2tp) /*dynamic*/
				{
					XS(this.inet2p+"/ipv4/static", "0");
					if (OBJ("wiz_l2tp_dns1").value !== "")
					{
						XS(this.inet1p+"/ppp4/dns/entry:1", OBJ("wiz_l2tp_dns1").value);
						cnt++;
					}
					else XS(this.inet1p+"/ppp4/dns/entry:1", "");
					if (OBJ("wiz_l2tp_dns2").value !== "")
					{
						XS(this.inet1p+"/ppp4/dns/entry:2", OBJ("wiz_l2tp_dns2").value);
						cnt++;
					}
					XS(this.inet1p+"/ppp4/dns/count", cnt);
					
					XD(this.inet2p+"/ipv4/dns");
					XS(this.inet2p+"/ipv4/dns/count", "0");
				}
				else /*static*/
				{
					XS(this.inet2p+"/ipv4/static", "1");
					XS(this.inet2p+"/ipv4/ipaddr",	OBJ("wiz_l2tp_ipaddr").value);
					XS(this.inet2p+"/ipv4/mask",	COMM_IPv4MASK2INT(OBJ("wiz_l2tp_mask").value));
					XS(this.inet2p+"/ipv4/gateway",	OBJ("wiz_l2tp_gw").value);
					
					if (OBJ("wiz_l2tp_dns1").value==="")
					{
						BODY.ShowAlert('<?echo i18n("Invalid Primary DNS address .");?>');
						return null;
					}
					XS(this.inet2p+"/ipv4/dns/entry:1", OBJ("wiz_l2tp_dns1").value);
					XS(this.inet1p+"/ppp4/dns/entry:1", OBJ("wiz_l2tp_dns1").value);
					cnt++;
					if (OBJ("wiz_l2tp_dns2").value!=="")
					{
						XS(this.inet2p+"/ipv4/dns/entry:2", OBJ("wiz_l2tp_dns2").value);
						XS(this.inet1p+"/ppp4/dns/entry:2", OBJ("wiz_l2tp_dns2").value);
						cnt++;
					}
					XS(this.inet2p+"/ipv4/dns/count", cnt);
					XS(this.inet1p+"/ppp4/dns/count", cnt);
				}
				XS(this.macaddrp, OBJ("wiz_l2tp_mac").value);
				
				XS(this.inf1p+"/defaultroute", "100");
				XS(this.inf2p+"/defaultroute", "");
				XS(this.inf1p+"/lowerlayer", "WAN-2");
				XS(this.inf2p+"/upperlayer", "WAN-1");	
				break;
		}
		
		if (type=="DHCP" || type=="STATIC")
		{
			XS(this.inet2p+"/ipv4/static", "0");
			XS(this.inet2p+"/ipv4/ipaddr", "");
			XS(this.inet2p+"/ipv4/mask", "");
			XS(this.inet2p+"/ipv4/gateway", "");
		}
		else
		{
			/*PPPv4 hidden nodes*/
			XS(this.inet1p+"/ppp4/dialup/idletimeout", "5");
			XS(this.inet1p+"/ppp4/dialup/mode", "ondemand");
			if (type != "PPPoE")
				XS(this.inet1p+"/ppp4/mtu", "1400");
			else
				XS(this.inet1p+"/ppp4/mtu", "1492");
		}
		return true;
	},
	PreWLAN: function()
	{
		XS(this.wifip+"/ssid", OBJ("wiz_ssid").value);			
		XS(this.wifip+"/ssidhidden", "0");
		XS(this.wifip+"/authtype", "WPA+2PSK");
		XS(this.wifip+"/encrtype", "TKIP+AES");
		XS(this.wifip+"/nwkey/psk/passphrase", "");
		XS(this.wifip+"/nwkey/psk/key", OBJ("wiz_key").value);
		XS(this.wifip+"/wps/configured", "1");
		XS(this.phyinf+"/active", "1");
		
		if(this.dual_band)
		{
			XS(this.wifip2+"/ssid", OBJ("wiz_ssid_Aband").value);			
			XS(this.wifip2+"/ssidhidden", "0");
			XS(this.wifip2+"/authtype", "WPA+2PSK");
			XS(this.wifip2+"/encrtype", "TKIP+AES");
			XS(this.wifip2+"/nwkey/psk/passphrase", "");
			XS(this.wifip2+"/nwkey/psk/key", OBJ("wiz_key_Aband").value);
			XS(this.wifip2+"/wps/configured", "1");
			XS(this.phyinf2+"/active", "1");
		}
		return true;
	},
	DRAWWAN: function(xml)
	{
		var p = xml.GetPathByTarget("/postxml", "module", "service", "EASYSETUP", false);
		if ((!p))
		{
			return false;
		}

                var waninetuid = xml.Get(p+"/inf/inet");
                var wanphyuid = xml.Get(p+"/inf/phyinf");

		this.waninetp = p+"/inet/entry";
                this.rwaninetp = p+"/runtime/inf/inet";
                this.rwanphyp = p+"/runtime/phyinf";

		var str_networkstatus = str_Disconnected = "Disconnected";
		var str_Connected = "Connected";
		var wan_network_status = 0;
		var str_wantype = null;

	
		if ((!this.waninetp))
		{
			return false;
		}
		
		this.wancable_status = 0;
		if((xml.Get(this.rwanphyp+"/linkstatus")!="0") && (xml.Get(this.rwanphyp+"/linkstatus")!=""))
			this.wancable_status = 1;
			
		if (xml.Get(this.waninetp+"/addrtype")=="ipv4")
		{
			if(xml.Get(this.waninetp+"/ipv4/static")=="1") /*Static IP*/
			{
				str_wantype = "Static IP";
				str_networkstatus = this.wancable_status == 1 ? str_Connected : str_Disconnected;
				wan_network_status = this.wancable_status;
			}
			else /*DHCP*/
			{
				str_wantype = "DHCP";
				if ((xml.Get(this.rwaninetp+"/ipv4/valid")=="1") && (this.wancable_status==1))
				{
					wan_network_status = 1;
					str_networkstatus = str_Connected;
				}
				else if (this.wancable_status==1)
				{
					wan_network_status = 1;
					str_networkstatus = "Connecting";
				}
			}
		}
		else if (xml.Get(this.waninetp+"/addrtype")=="ppp4")
		{
			if (xml.Get(this.waninetp+"/ppp4/over")=="eth")
				str_wantype = "PPPoE";
			else if (xml.Get(this.waninetp+"/ppp4/over")=="pptp")
				str_wantype = "PPTP";
			else if (xml.Get(this.waninetp+"/ppp4/over")=="l2tp")
				str_wantype = "L2TP";
			else
				str_wantype = "Unknow WAN type";
			
			var connStat = xml.Get(p +"/runtime/inf/pppd/status");
			if ((xml.Get(this.rwaninetp+"/ppp4/valid")=="1")&& (this.wancable_status==1))
				wan_network_status=1;
			switch (connStat)
			{
				case "connected":
					if (wan_network_status == 1)
						str_networkstatus = str_Connected;
					else
						str_networkstatus = str_Disconnected;
					break;
				case "":
				case "disconnected":
					str_networkstatus = str_Disconnected;
					wan_network_status = 0;
					break;
				case "on demand":
					str_networkstatus = "Idle";
					wan_network_status = 0;
					break;
				default:
					str_networkstatus = "Busy";
					break;
			}
		}

		return true;
	},
	DRAWLAN: function()
	{
		var lan = PXML.FindModule("INET.LAN-1");
		var inetuid = XG  (lan+"/inf/inet");
		this.inetp = GPBT(lan+"/inet", "entry", "uid", inetuid, false);
		
		if (!this.inetp)
		{
			BODY.ShowAlert("DRAWLAN() ERROR !");
			return false;
		}
		
		if (XG(this.inetp+"/addrtype") == "ipv4")
		{
			var b = this.inetp+"/ipv4";
			this.lanip = XG  (b+"/ipaddr");
		}
		
		this.old_ipaddr = this.lanip;

		return true;
	},
	ShowCurrentStage: function()
	{
		var i = 0;
		var type = "";

		for (i=0; i<this.wanTypes.length; i++)
		{
			type = this.wanTypes[i];
			OBJ(type).style.display = "none";
		}
		
		for (i=0; i<this.stages.length; i++)
		{
			if (i == this.currentStage)
			{
				/*if (this.stages[i] == "stage_set")
					OBJ("internet_status").style.display = "block";
				else
					OBJ("internet_status").style.display = "none";*/
				
				OBJ(this.stages[i]).style.display = "block";
				
				type = this.wanTypes[this.currentWanType];
				OBJ(type).style.display = "block";
			}
			else
				OBJ(this.stages[i]).style.display = "none";
		}

		if (this.stages[this.currentStage]=="stage_set")
		{
			if(this.refresh_timer == null) PAGE.RefreshStatus();
		}
		else if (this.stages[this.currentStage]=="stage_no_cable")
		{
			DisplayTAButton("block");
		}
		else if (this.stages[this.currentStage]=="stage_check_connect")
		{
			PAGE.StartCheckInternetConnection();
		}
		
	},
	SetStage: function(offset)
	{
		var length = this.stages.length;
		switch (offset)
		{
			case 3:
				if (this.currentStage < length-1)
					this.currentStage += 3;
				break;
			case 2:
				if (this.currentStage < length-1)
					this.currentStage += 2;
				break;
			case 1:
				if (this.currentStage < length-1)
					this.currentStage += 1;
				break;
			case 0:
				if (this.currentStage < length-1)
					this.currentStage = this.currentStage;
				break;
		case -1:
			if (this.currentStage > 0)
				this.currentStage -= 1;
			break;
		case -2:
			if (this.currentStage > 0)
				this.currentStage -= 2;
		case -3:
			if (this.currentStage > 0)
				this.currentStage -= 3;
			break;
		}
	},
	GetWanType: function()
	{
		var addrtype = XG(this.inet1p+"/addrtype");
		var type = null;
		/* clear ppp10 addrtype */
		if(addrtype == "ppp10")
		{
			addrtype = "ppp4";
		}
		switch (addrtype)
		{
			case "ipv4":
				if (XG(this.inet1p+"/ipv4/static")==="1")
					type = "STATIC";
				else
				{
					if (XG(this.inet1p+"/ipv4/dhcpplus/enable")==="1")
						type = "DHCPPLUS";
					else
						type = "DHCP";
				}
				break;
			case "ppp4":
				var over = XG(this.inet1p+"/ppp4/over");
				if (over==="eth")
					type = "PPPoE";
				else if (over==="pptp")
					type = "PPTP";
				else if (over==="l2tp")
					type = "L2TP";
				break;
			default:
				BODY.ShowAlert("Internal Error !");
		}
		for (var i=0; i<this.wanTypes.length; i++)
		{
			if (this.wanTypes[i]==type)
				this.currentWanType = i;
		}
	},
	OnClickMacButton: function(objname)
	{
		OBJ(objname).value = "<?echo INET_ARP($_SERVER["REMOTE_ADDR"]);?>";
		if(OBJ(objname).value == "")
			alert("Can't find Your PC's MAC Address, please enter Your MAC manually.");
	},
	DoConnecting: function(xml)
	{
		var wancable_status = 0;
		var p = xml.GetPathByTarget("/postxml", "module", "service", "EASYSETUP", false);
		if ((!p))
		{
			BODY.ShowAlert("DRAWWAN() ERROR !");
                        return false;
		}
		var rwanphyp = p + "/runtime/phyinf";

		if((xml.Get(rwanphyp+"/linkstatus")!="0") && (xml.Get(rwanphyp+"/linkstatus")!=""))
			wancable_status = 1;
		else
			wancable_status = 0;


		if (wancable_status==1)
		{
			this.saveonly = false;
			if (!PAGE.SaveXML()) return null;
		}
		else if (wancable_status==0 && PAGE.stages[PAGE.currentStage]==="stage_no_cable")
		{
			PAGE.SetStage(0);
			PAGE.ShowCurrentStage();
		}
		else
		{
			PAGE.SetStage(2);
			PAGE.ShowCurrentStage();
		}
	},
	OnClickConnectButton: function()
	{
		if (this.stages[this.currentStage]=="stage_set")
		clearTimeout(this.refresh_timer);
		
		var type = this.wanTypes[this.currentWanType];
		if (!CheckSetValue(type)) return null;
		
		PAGE.RegetXML_sync();

		DisplayIntenetStatus(false); 

		COMM_GetCFG(false,"EASYSETUP", PAGE.DoConnecting);
	},
	OnClickSLLink: function()
	{
		var type = this.wanTypes[this.currentWanType];
		this.saveonly = true;
		//if (!CheckSetValue(type)) return null;
		CheckSettings(this.stages[this.currentStage]);
		PAGE.PreSubmit();
		
		var xml = PXML.doc;
		PXML.UpdatePostXML(xml);
		PXML.Post(
			function(code, result)
			{
				if(code != "OK") BODY.ShowAlert('<?echo I18N("h","Settings error, please check it again!!");?>');
			//BODY.Logout();
			self.location.href = "./info/Login.html";
			});
	},
	OnClickCompleteNo: function()
	{
		self.location.href = "./onepage.php";
	},

	OnClickSave: function()
	{
		var type = this.wanTypes[this.currentWanType];
		if (!CheckSetValue(type)) return null;
		if(this.is_wifi_client ==1)
		{
			var ssid24 = OBJ("wiz_ssid").value;
			var ssid5 = OBJ("wiz_ssid_Aband").value;
			var pass24 = OBJ("wiz_key").value;
			var pass5 = OBJ("wiz_key_Aband").value;
			document.getElementById("scan_wifi_list_block").style.display = "block";
			document.getElementById("scan_waiting").style.display = "block";
			document.getElementById("24Gssid_megg").innerHTML = ssid24;
			document.getElementById("24Gkey_megg").innerHTML = pass24;
			document.getElementById("5Gssid_megg").innerHTML = ssid5;
			document.getElementById("5Gkey_megg").innerHTML = pass5;
		}
		else
		{
			PAGE.OnClickSLLink();
		}
	},
	OnConnecting: function()
	{
		if(this.is_wifi_client ==1)
		{
			var ssid24 = OBJ("wiz_ssid").value;
			var ssid5 = OBJ("wiz_ssid_Aband").value;
			var pass24 = OBJ("wiz_key").value;
			var pass5 = OBJ("wiz_key_Aband").value;
			document.getElementById("scan_wifi_list_block1").style.display = "block";
			document.getElementById("scan_waiting1").style.display = "block";
			document.getElementById("24Gssid_megg1").innerHTML = ssid24;
			document.getElementById("24Gkey_megg1").innerHTML = pass24;
			document.getElementById("5Gssid_megg1").innerHTML = ssid5;
			document.getElementById("5Gkey_megg1").innerHTML = pass5;
		}
		else
		{
			PAGE.OnClickCCButton();
		}
	},
	ClearCreateRulePOP: function()//kity
	{
		SendEvent("DBSAVE");
		document.getElementById("closeCreatePopBtn").style.cursor = "default";
	},
	RedirectToHome: function()
	{
		window.location.href = "Home.html";
	},
	OnClickANSLink: function()
	{
		self.location.href = "./onepage.php";
	},
	OnClickCCButton: function()
	{
		self.location.href = "http://www.dlink.com.cn/";
	},
	DoRetrying:function(xml)
	{
		var wancable_status = 0;
		var p = xml.GetPathByTarget("/postxml", "module", "service", "EASYSETUP", false);
		if ((!p))
		{
			BODY.ShowAlert("DRAWWAN() ERROR !");
                        return false;
		}
		var rwanphyp = p + "/runtime/phyinf";

		if((xml.Get(rwanphyp+"/linkstatus")!="0") && (xml.Get(rwanphyp+"/linkstatus")!=""))
			wancable_status = 1;
		else
			wancable_status = 0;

		if (wancable_status==1)
		{
			this.saveonly = false;
			if (!PAGE.SaveXML()) return null;
		}
		else if (wancable_status==0 && PAGE.stages[PAGE.currentStage]==="stage_no_cable")
		{
			setTimeout('PAGE.SetStage(0);PAGE.ShowCurrentStage();', 1000);
		}
		else
		{
			PAGE.SetStage(2);
			PAGE.ShowCurrentStage();
		}
	},
	OnClickRetryButton: function()
	{
		DisplayTAButton("none");
	    	setTimeout('DisplayTAButton("block")', 5*1000);
    		PAGE.RegetXML_sync();
		COMM_GetCFG(false,"EASYSETUP", PAGE.DoRetrying);
	},
	OnClickPreviousButton: function()
	{
		self.location.href = "./onepage.php";
	},
	OnChangeWanType: function(type)
	{
		document.getElementById("wan_error").innerHTML = I18N("j" ,"");
		for (var i=0; i<this.wanTypes.length; i++)
		{
			if (this.wanTypes[i]==type)
				this.currentWanType = i;
		}
		this.ShowCurrentStage();
	},
	OnChangePPTPMode: function()
	{
		var disable = document.getElementsByName("wiz_pptp_conn_mode")[0].checked ? true: false;
		OBJ("wiz_pptp_ipaddr").disabled = disable;
		OBJ("wiz_pptp_mask").disabled = disable;
		OBJ("wiz_pptp_gw").disabled = disable;
		OBJ("wiz_pptp_dns1").disabled = disable;
		OBJ("wiz_pptp_dns2").disabled = disable;
	},
	OnChangeL2TPMode: function()
	{
		var disable = document.getElementsByName("wiz_l2tp_conn_mode")[0].checked ? true: false;
		OBJ("wiz_l2tp_ipaddr").disabled = disable;
		OBJ("wiz_l2tp_mask").disabled = disable;
		OBJ("wiz_l2tp_gw").disabled = disable;
		OBJ("wiz_l2tp_dns1").disabled = disable;
		OBJ("wiz_l2tp_dns2").disabled = disable;
	},
	DrawBar: function()
	{
		PAGE.drawbar++;
		if(PAGE.drawbar>=50) PAGE.drawbar=0;
		RefreshBar(PAGE.drawbar);
		setTimeout('PAGE.DrawBar()', 1000);
	},
	CheckInternetStatus: function()
	{
		if(PAGE.internetStatusCheck%4==0)
			var action="ping";
		else
			var action="pingreport";
		
		var dst = "www.dlink.com";

		PAGE.internetStatusCheck++;
	
		if(PAGE.internetStatusCheck == 1000) PAGE.internetStatusCheck=0;
	
		var ajaxObj = GetAjaxObj("InternetCheckstatus");
		ajaxObj.createRequest();
		ajaxObj.onCallback = function (xml)
		{
			ajaxObj.release();
			if(xml.Get("/diagnostic/report")=="OK")
			{
				DisplayIntenetStatus(true);
			}
			else
			{
				DisplayIntenetStatus(false);
			}	
		}
		ajaxObj.setHeader("Content-Type", "application/x-www-form-urlencoded");
		ajaxObj.sendRequest("internetdecetive.php", "act="+action+"&dst="+dst);
	},


	CheckInternet: function()
	{
		if(PAGE.internetCheck%4==0)
			var action="ping";
		else
			var action="pingreport";
		
		var dst = "www.dlink.com";
		PAGE.internetCheck++;
		
		var ajaxObj = GetAjaxObj("InternetCheck");
		ajaxObj.createRequest();
		ajaxObj.onCallback = function (xml)
		{
			ajaxObj.release();
			if(xml.Get("/diagnostic/report")=="OK")
			{
				DisplayIntenetStatus(true);
				PAGE.SetStage(3);
				PAGE.ShowCurrentStage();

			}
			else if(PAGE.internetCheck >= 20) /*do 6 ping check */
			{
				DisplayIntenetStatus(false);
				if(PAGE.wanTypes[PAGE.currentWanType]=="PPPoE")
				{
					PAGE.SetStage(2);
					PAGE.ShowCurrentStage();
				}
				else
				{
					if (confirm('<?echo I18N("j","The internet check is failed. Do you want to restart the wizard again?");?>')) 
						self.location.href="onepage.php";
				}
			}	
			else setTimeout('PAGE.CheckInternet()', 2000);
		}
		ajaxObj.setHeader("Content-Type", "application/x-www-form-urlencoded");
		ajaxObj.sendRequest("internetdecetive.php", "act="+action+"&dst="+dst);
	},
	StartCheckInternetConnection: function()
	{
		//DisplayIntenetStatus(false);
		setTimeout('PAGE.CheckInternet()', 10*1000);
	},
	RefreshStatus: function()
	{
		if(AUTH.AuthorizedGroup>=0)
		{
			this.CheckInternetStatus();
			this.refresh_timer = setTimeout('PAGE.RefreshStatus()', 5*1000);
		}
	},
	RegetXML_sync: function()
  	{
		sync_GetCFG(
			false,
			PAGE.services,
			function(xml) {
				PXML.doc = xml;
    			}
		);
	},
	SaveXML: function()
	{
	    	CheckSettings(this.stages[this.currentStage]);
    		PAGE.PreSubmit();
    
		var xml = PXML.doc;
		PXML.UpdatePostXML(xml);
		PXML.Post(function(code, result){PAGE.OnSubmitCallback(code,result);});
		
		return true;
	},
	OnClickMydlinkLogin: function()
	{
		if(OBJ("user_Account").value == "" || OBJ("user_Password").value == "")
		{
			document.getElementById("MyDLink_description").innerHTML = I18N("j" ,"Please enter your e-mail address and mydlink password.");
			return false;	
		}
		OBJ("signIn_Button").disabled = true;
                OBJ("show_loadingImageDefault").style.display = "table-row";
		MydlinkLogin(OBJ("user_Account").value, OBJ("user_Password").value, "login");
	},
	OnClickMydlinkLogout: function()
	{
		OBJ("signIn_Button").disabled = true;
		MydlinkLogout();
	},
	OnBackButton: function()
	{
		self.location.href="onepage.php";
	},
	OnClickMydlinkRegister: function()
	{
		if(!OBJ("option1").checked)
		{
			document.getElementById("MyDLink_description").innerHTML = I18N("j" ,"You must accept the terms and conditions to continue.");
			return false;			
		}
		else if(OBJ("option1").checked && (OBJ("user_Account").value == "" || OBJ("user_Password").value == ""))
		{
			document.getElementById("MyDLink_description").innerHTML = I18N("j" ,"Please enter your e-mail address and mydlink password.");
			return false;	
		}

		OBJ("show_loadingImageDefault").style.display = "table-row"; 

		OBJ("signUp_Button").disabled = true;
		var ajaxObj = GetAjaxObj("Register");
		ajaxObj.createRequest();
		ajaxObj.onCallback = function (xml)
		{
			ajaxObj.release();
			if(xml.Get("/register_send/result")=="success")
			{
				//it need to login when mydlink registration is successfully
				MydlinkLogin(OBJ("user_Account").value, OBJ("user_Password").value, "register");
			}
			else 
			{
				BODY.ShowAlert(xml.Get("/register_send/result"));
				OBJ("signUp_Button").disabled = false;
			}
		}
		ajaxObj.setHeader("Content-Type", "application/x-www-form-urlencoded");
		ajaxObj.sendRequest("register_send.php", "act=signup&lang=en"+"&outemail="+OBJ("user_Account").value+"&passwd="+OBJ("user_Password").value+"&firstname="+OBJ("user_FirstName").value+"&lastname="+OBJ("user_LastName").value);
		AUTH.UpdateTimeout();
	}
}
function DisplayTAButton(dis)
{
	OBJ("ta_button").style.display = dis;
}

function DisplayIntenetStatus(status)
{
	if(status == true)
	{
		OBJ("wan_Light2").src = "image/connected.png";
	}else{
		OBJ("wan_Light2").src = "image/disconnected.png";
	}
}
function ResAddress(address)
{
	if (address=="")
		return "0.0.0.0";
	else if (address=="0.0.0.0")
		return "";
	else
		return address;
}
function SetDNSAddress(path, dns1, dns2)
{
	var cnt = 0;
	var dns = new Array (false, false);
	if (dns1!="0.0.0.0"&&dns1!="") {dns[0] = true; cnt++;}
	if (dns2!="0.0.0.0"&&dns2!="") {dns[1] = true; cnt++;}
	XS(path+"/count", cnt);
	if (dns[0]) XS(path+"/entry", dns1);
	if (dns[1]) XS(path+"/entry:2", dns2);
}
function RandomHex(len)
{
	var c = "0123456789abcdef";
	var str = '';
	for (var i = 0; i < len; i+=1)
	{
		var rand_char = Math.floor(Math.random() * c.length);
		str += c.substring(rand_char, rand_char + 1);
	}
	return str;
}
function CheckSetValue(type)
{
	document.getElementById("wan_error").innerHTML = I18N("j" ,"");
	document.getElementById("wifi24_error").innerHTML = I18N("j" ,"");
	document.getElementById("wifi5_error").innerHTML = I18N("j" ,"");
	document.getElementById("adminpwd_error").innerHTML = I18N("j" ,"");
	/* check wan settings */
	//alert("wan type =[" + type+"]");
	switch (type)
	{
		case "STATIC":
			var staticip = OBJ("wiz_static_ipaddr").value;
			var pristaticdns = OBJ("wiz_static_dns1").value;
			var netmask = OBJ("wiz_static_mask").value;
			var mask = COMM_IPv4MASK2INT(netmask);	
			var gateway = OBJ("wiz_static_gw").value;
			var dns1 = OBJ("wiz_static_dns1").value;
			var dns2 = OBJ("wiz_static_dns2").value;
			var lan = PXML.FindModule("INET.LAN-1");
           		var inetp = GPBT(lan+"/inet", "entry", "uid", XG(lan+"/inf/inet"), false);
            		var lanip = XG(inetp+"/ipv4/ipaddr");
			if(staticip =="")
			{
				document.getElementById("wan_error").innerHTML = I18N("j" ,"Please enter an IP address.");
				OBJ("wiz_static_ipaddr").focus();
				return false;
			}
			else
			{
				if(!COMM_ValidV4Format(staticip) || !COMM_ValidV4Addr(staticip))
				{
					document.getElementById("wan_error").innerHTML = I18N("j" ,"Invalid IP address.");
					OBJ("wiz_static_ipaddr").focus();
					return false;
				}
				if(netmask != "" && (COMM_IPv4NETWORK(staticip, mask) == COMM_IPv4NETWORK(lanip, mask)))
				{
					document.getElementById("wan_error").innerHTML = I18N("j" ,"The network id is the same with LAN.");
					OBJ("wiz_static_ipaddr").focus();
					return false;
				}
			}
			
			if(netmask =="")
			{
				document.getElementById("wan_error").innerHTML = I18N("j" ,"Please enter a subnet mask.");
				OBJ("wiz_static_mask").focus();
				return false;
			}
			else
			{
				if(mask <= 0 || mask > 32)
				{
					document.getElementById("wan_error").innerHTML = I18N("j" ,"Invalid Subnet Mask.");
					OBJ("wiz_static_mask").focus();
					return false;
				}
				if(mask < 8)
				{
					document.getElementById("wan_error").innerHTML = I18N("j" ,"The router would not support the subnet mask which length is less than Class A.");
					OBJ("wiz_static_mask").focus();
					return false;
				}
			}
			
			if(gateway =="")
			{
				document.getElementById("wan_error").innerHTML = I18N("j" ,"Please enter a gateway address.");
				OBJ("wiz_static_gw").focus();
				return false;
			}
			else
			{
				if(netmask != "")
				{
					if(!COMM_ValidV4HOST(gateway, mask))
					{
						document.getElementById("wan_error").innerHTML = I18N("j" ,"Invalid Gateway Address.");
						OBJ("wiz_static_gw").focus();
						return false;
					}
					if(staticip != "")
					{
						if(gateway == staticip)
						{
							document.getElementById("wan_error").innerHTML = I18N("j" ,"Please enter a valid gateway address. (e.g. 192.168.0.1)");
							OBJ("wiz_static_gw").focus();
							return false;	
						}
						if(COMM_IPv4NETWORK(gateway, mask) != COMM_IPv4NETWORK(staticip, mask))
						{
							document.getElementById("wan_error").innerHTML = I18N("j" ,"The default gateway should be in the same network.");
							OBJ("wiz_static_gw").focus();
							return false;	
						}
					}
				}
			}
			
			if(dns1 =="")
			{
				document.getElementById("wan_error").innerHTML = I18N("j" ,"Invalid Primary DNS Address.");
				OBJ("wiz_static_dns1").focus();
				return false;
			}
			else 
			{
				if(!COMM_ValidV4Addr(dns1))
				{
					document.getElementById("wan_error").innerHTML = I18N("j" ,"Invalid Primary DNS Address.");
					OBJ("wiz_static_dns1").focus();
					return false;
				}
				if(staticip != "" && dns1 == staticip)
				{
					document.getElementById("wan_error").innerHTML = I18N("j" ,"The dns server cannot be equal to the IP address.");
					OBJ("wiz_static_dns1").focus();
					return false;
				}
			}
			
			if(dns2 =="")
			{
				document.getElementById("wan_error").innerHTML = I18N("j" ,"Invalid Secondary DNS Address.");
				OBJ("wiz_static_dns2").focus();
				return false;
			}
			else
			{
				if(!COMM_ValidV4Addr(dns2))
				{
					document.getElementById("wan_error").innerHTML = I18N("j" ,"Invalid Secondary DNS Address.");
					OBJ("wiz_static_dns2").focus();
					return false;
				}
				if(staticip != "" && dns2 == staticip)
				{
					document.getElementById("wan_error").innerHTML = I18N("j" ,"The dns server cannot be equal to the IP address.");
					OBJ("wiz_static_dns2").focus();
					return false;
				}
				if(dns1 == dns2)
				{					
					document.getElementById("wan_error").innerHTML = I18N("j" ,"DNS IP addresses must be different.");
					OBJ("wiz_static_dns2").focus();
					return false;
				}
			}
			break;
		case "DHCPPLUS":
			if(OBJ("wiz_dhcpplus_user").value==="")
			{
				BODY.ShowAlert('<?echo I18N("j","The user name can not be empty 222");?>');
				return false;
			}
			if(OBJ("wiz_dhcpplus_pass").value==="")
			{
				BODY.ShowAlert('<?echo I18N("j","The user password can not be empty");?>');
				return false;
			}
			break;
		case "PPPoE":
			if(OBJ("wiz_pppoe_usr").value =="") 
			{
				document.getElementById("wan_error").innerHTML = I18N("j" ,"Please input the user name.");
				OBJ("wiz_pppoe_usr").focus();
				return false;
			}
			if(OBJ("wiz_pppoe_passwd").value =="")
			{
				document.getElementById("wan_error").innerHTML = I18N("j" ,"Please enter a password.");
				OBJ("wiz_pppoe_passwd").focus();
				return false;
			}
			break;
		case "PPTP":
			if(OBJ("wiz_pptp_ipaddr").value=="" || OBJ("wiz_pptp_mask").value=="" || OBJ("wiz_l2tp_gw").value=="" || OBJ("wiz_pptp_svr").value=="") 
			{
				BODY.ShowAlert('<?echo I18N("j","* is required field.");?>');			
				return false;
			}
			if(OBJ("wiz_pptp_usr").value=="") 
			{
				BODY.ShowAlert('<?echo I18N("j","The user name can not be empty 111");?>');			
				return false;
			}
			if(OBJ("wiz_pptp_passwd").value=="")
			{
				BODY.ShowAlert('<?echo I18N("j","The user password can not be empty");?>');			
				return false;
			}
			if (document.getElementsByName("wiz_pptp_conn_mode")[1].checked == true)
			{
				if(OBJ("wiz_pptp_dns1").value=="" || OBJ("wiz_pptp_dns1").value=="0.0.0.0")
				{
					BODY.ShowAlert('<?echo I18N("j","Invalid Primary DNS address.");?>');			
					return false;
				}
			}
			break;
		case "L2TP":
			if(OBJ("wiz_l2tp_ipaddr").value=="" || OBJ("wiz_l2tp_mask").value=="" || OBJ("wiz_l2tp_gw").value=="" || OBJ("wiz_l2tp_svr").value=="") 
			{
				BODY.ShowAlert('<?echo I18N("j","* is required field.");?>');			
				return false;
			}
			if(OBJ("wiz_l2tp_usr").value=="") 
			{
				BODY.ShowAlert('<?echo I18N("j","The user name can not be empty");?>');			
				return false;
			}
			if(OBJ("wiz_l2tp_passwd").value=="")
			{
				BODY.ShowAlert('<?echo I18N("j","The user password can not be empty");?>');			
				return false;
			}
			if (document.getElementsByName("wiz_l2tp_conn_mode")[1].checked == true)
			{
				if(OBJ("wiz_l2tp_dns1").value=="" || OBJ("wiz_l2tp_dns1").value=="0.0.0.0")
				{
					BODY.ShowAlert('<?echo I18N("j","Invalid Primary DNS address.");?>');			
					return false;
				}
			}
			break;
	}
	
	/* check wifi settings */
	if(OBJ("wiz_ssid").value == "")
	{
		document.getElementById("wifi24_error").innerHTML = I18N("j" ,"SSID is required.");
		OBJ("wiz_ssid").focus();
		return false;	
	}
	if(OBJ("wiz_key").value.length < 8 || OBJ("wiz_key").value.length > 63)
	{
		document.getElementById("wifi24_error").innerHTML = I18N("j" ,"The Wireless Security Password must be at least 8 characters long.");
		OBJ("wiz_key").focus();
		return false;
	}
	else if(OBJ("wiz_key").value.indexOf(" ") >= 0)
	{
		document.getElementById("wifi24_error").innerHTML = I18N("j" ,"The WPA key must be exactly 8 hexadecimal digits long (0-9, A-F).");
		OBJ("wiz_key").focus();
		return false;
	}
	
	if(OBJ("wiz_ssid_Aband").value == "")
	{
		document.getElementById("wifi5_error").innerHTML = I18N("j" ,"SSID is required.");
		OBJ("wiz_ssid_Aband").focus();
		return false;	
	}
	if(OBJ("wiz_key_Aband").value.length < 8 || OBJ("wiz_key_Aband").value.length > 63)
	{
		document.getElementById("wifi5_error").innerHTML = I18N("j" ,"The Wireless Security Password must be at least 8 characters long.");
		OBJ("wiz_key_Aband").focus();
		return false;
	}
	else if(OBJ("wiz_key_Aband").value.indexOf(" ") >= 0)
	{
		document.getElementById("wifi5_error").innerHTML = I18N("j" ,"The WPA key must be exactly 8 hexadecimal digits long (0-9, A-F).");
		OBJ("wiz_key_Aband").focus();
		return false;
	}
	/* check admin password settings */
	if(OBJ("adminpwd2").value != "" && (OBJ("adminpwd2").value.length < 6 || OBJ("adminpwd2").value.length > 15))
	{
		document.getElementById("adminpwd_error").innerHTML = I18N("j" ,"Invalid Network Key. Please enter another Network Key.");
		OBJ("adminpwd2").focus();
		return false;	
	}

	return true;
}
function CheckSettings(current_stage)
{
	PXML.IgnoreModule("WAN");                                
	PXML.IgnoreModule("INET.LAN-1");                         
	PXML.IgnoreModule("EASYSETUP");                     
	PXML.IgnoreModule("MYDLINK");                     
	PXML.CheckModule("INET.WAN-1", null, "ignore", "ignore");
	PXML.CheckModule("INET.WAN-2", null, "ignore", "ignore");
	//if(!saveonly) CallHedwig(PXML.doc, current_stage);
}
function sync_GetCFG(Cache, Services, Handler)
{
	var ajaxObj = GetAjaxObj("getData");
	var payload = "";

	ajaxObj.requestAsyn=false;
  
	if (Cache) payload = "CACHE=true";
	if (payload!="") payload += "&";
	payload += "SERVICES="+escape(COMM_EatAllSpace(Services));

	ajaxObj.createRequest();
	ajaxObj.onCallback = function (xml)
	{
		ajaxObj.release();
		if (Handler!=null) Handler(xml);
	}
	ajaxObj.setHeader("Content-Type", "application/x-www-form-urlencoded");
	ajaxObj.sendRequest("getcfg.php", payload);
}
function CallHedwig(doc, current_stage)
{
	COMM_CallHedwig(doc, 
		function (xml)
		{
			switch (xml.Get("/hedwig/result"))
			{
				case "OK":
					if(current_stage==="stage_set") PAGE.SetStage(1);
					else PAGE.SetStage(0);

					//PAGE.ShowCurrentStage(); disable by tsrites
					break;
				case "FAILED":
					BODY.ShowAlert(xml.Get("/hedwig/message"));
					break;
			}
		}
	);
}
function CheckIpValidity(ipstr)
{
	var vals = ipstr.split(".");
	if (vals.length!=4) 
		return false;
	
	for (var i=0; i<4; i++)
	{
		if (!TEMP_IsDigit(vals[i]) || vals[i]>255)
			return false;
	}
	return true;
}
function IdleTime(value)
{
	if (value=="")
		return "0";
	else
		return parseInt(value, 10);
}
function RefreshBar(index)
{
	var bar_color = "#FF6F00";
	var clean_color = "#d4d4d4";
	var clear = "&nbsp;&nbsp;"

	if(index==0)
	{
		for (i = 0; i <= 50; i++)
		{
			var block = OBJ("block" + i);
			block.style.backgroundColor = clean_color;
		}
	}
	
	for (i = 0; i <= index; i++)
	{
		var block = OBJ("block" + i);
		block.innerHTML = clear;
		block.style.backgroundColor = bar_color;
	}
}

function showAdv(id,adv_id)
{
	var block = document.getElementById(id);

	if(block.style.display == "none" || block.style.display == "") 
	{
			block.style.display = "block";
	}	 
	else 
	{
			block.style.display = "none";
	}

	if(adv_id == "login_mydlink")
	{
		OBJ("login_mydlink").style.display = "block"; 
		OBJ("logout_mydlink").style.display = "none"; 
                OBJ("show_loadingImageDefault").style.display = "none";
	}
	else if(adv_id == "logout_mydlink"){
		OBJ("login_mydlink").style.display = "none"; 
		OBJ("logout_mydlink").style.display = "block"; 
                OBJ("show_loadingImageDefault").style.display = "none";
	}
	mydlinkAccount("no");
}


function mydlinkAccount(answer)
{
	document.getElementById("MyDLink_description").innerHTML = I18N("j" ,"");
	if (answer == "yes" && document.getElementById('cb_yes').getAttribute('class') == 'unclick1')
	{
		document.getElementById("cb_yes").style.background = "url('../image/checkBox_o.png') no-repeat scroll right top / contain #FFF";
		document.getElementById("cb_no").style.background = "url('../image/checkBox_c.png') no-repeat scroll right top / contain #FFF";
		document.getElementById("signUp_Button").style.display = "none";
		document.getElementById("signIn_Button").style.display = "inline";
		document.getElementById("M_Account").style.display = "table-row";
		document.getElementById("M_UserPassword").style.display = "table-row";
		document.getElementById("First_Name").style.display = "none";
		document.getElementById("Last_Name").style.display = "none";
		document.getElementById("Mydlink_TermsAndConditions").style.display = "none";
	}
	else if (answer == "no" && document.getElementById('cb_no').getAttribute('class') == 'clicked1')
	{
		document.getElementById("cb_no").style.background = "url('../image/checkBox_o.png') no-repeat scroll right top / contain #FFF";
		document.getElementById("cb_yes").style.background = "url('../image/checkBox_c.png') no-repeat scroll right top / contain #FFF";
		document.getElementById("signUp_Button").style.display = "inline";
		document.getElementById("signIn_Button").style.display = "none";
		document.getElementById("M_Account").style.display = "table-row";
		document.getElementById("M_UserPassword").style.display = "table-row";
		document.getElementById("First_Name").style.display = "table-row";
		document.getElementById("Last_Name").style.display = "table-row";
		document.getElementById("Mydlink_TermsAndConditions").style.display = "table-row";
	}
}
function MydlinkLogin(email, passwd, login_type)
{
	var ajaxObj = GetAjaxObj("Mydlink_login");
	ajaxObj.createRequest();
	ajaxObj.onCallback = function (xml)
	{
		ajaxObj.release();
		if(xml.Get("/register_send/result")=="success")
		{
			/*
			if (login_type == "register")
			BODY.ShowAlert("<?echo i18n("Please check your mailbox for an email with confirmation instructions.");?>");
			BODY.ShowAlert("<?echo i18n("You may now use mydlink service with this device");?>");
			*/

			PAGE.url_mydlink = xml.Get("/register_send/url");
			PAGE.ChangeWanAlwaysOn();//If wan type is ppp4, make the connection mode always on.
		}
		else
		{	 
			//BODY.ShowAlert(xml.Get("/register_send/result"));
			document.getElementById("MyDLink_description").innerHTML = xml.Get("/register_send/result");
                		OBJ("show_loadingImageDefault").style.display = "none";
			if (login_type == "login")
				OBJ("signIn_Button").disabled = false;
		}
	}
	ajaxObj.setHeader("Content-Type", "application/x-www-form-urlencoded");
	ajaxObj.sendRequest("register_send.php", "act=signin&lang=zhcn"+"&outemail="+email+"&passwd="+passwd+"&mydlink_cookie=");
	AUTH.UpdateTimeout();


}

function MydlinkLogout()
{
	var ajaxObj = GetAjaxObj("Mydlink_logout");
	ajaxObj.createRequest();
	ajaxObj.onCallback = function (xml)
	{
		ajaxObj.release();
		if(xml.Get("/register_send/result")=="logout_success")
		{
			window.location.href = "onepage.php";
		}
	}
	ajaxObj.setHeader("Content-Type", "application/x-www-form-urlencoded");
	ajaxObj.sendRequest("register_send.php", "act=logout");
	AUTH.UpdateTimeout();
}

function SendEvent(svc)
{	
	var ajaxObj = GetAjaxObj("SendEvent");
	ajaxObj.createRequest();
	ajaxObj.onCallback = function (xml)
	{
		ajaxObj.release();
		setTimeout("PAGE.RedirectToHome()", 500);
	}
	ajaxObj.setHeader("Content-Type", "application/x-www-form-urlencoded");
	ajaxObj.sendRequest("service.cgi", "EVENT="+svc);
	AUTH.UpdateTimeout();
} 
</script>
