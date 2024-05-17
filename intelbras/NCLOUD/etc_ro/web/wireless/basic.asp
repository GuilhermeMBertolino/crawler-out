<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var PhyMode  = '<% getCfgZero(1, "WirelessMode"); %>';
var HiddenSSID  = '<% getCfgZero(1, "HideSSID"); %>';
var APIsolated = '<% getCfgZero(1, "NoForwarding"); %>';
var mbssidapisolated = '<% getCfgZero(1, "NoForwardingBTNBSSID"); %>';
var ChIdx  = '<% getWlanChannel(); %>';
var fxtxmode = '<% getCfgGeneral(1, "FixedTxMode"); %>';
var CntyCd = '<% getCfgGeneral(1, "CountryCode"); %>';
var ht_mode = '<% getCfgZero(1, "HT_OpMode"); %>';
var ht_bw = '<% getCfgZero(1, "HT_BW"); %>';
var ht_gi = '<% getCfgZero(1, "HT_GI"); %>';
var ht_stbc = '<% getCfgZero(1, "HT_STBC"); %>';
var ht_mcs = '<% getCfgZero(1, "HT_MCS"); %>';
var ht_htc = '<% getCfgZero(1, "HT_HTC"); %>';
var ht_rdg = '<% getCfgZero(1, "HT_RDG"); %>';
var ht_extcha = '<% getCfgZero(1, "HT_EXTCHA"); %>';
var ht_amsdu = '<% getCfgZero(1, "HT_AMSDU"); %>';
var ht_autoba = '<% getCfgZero(1, "HT_AutoBA"); %>';
var ht_badecline = '<% getCfgZero(1, "HT_BADecline"); %>';
var ht_disallow_tkip = '<% getCfgZero(1, "HT_DisallowTKIP"); %>';
var ht_2040_coexit = '<% getCfgZero(1, "HT_BSSCoexistence"); %>';
var ht_f_40mhz = '<% getCfgZero(1, "HT_40MHZ_INTOLERANT"); %>';
var apcli_include = '<% getWlanApcliBuilt(); %>';
var draft3b = '<% getRax11nDraft3Built(); %>';
var mesh_include = '<% getMeshBuilt(); %>';
var tx_stream_idx = '<% getCfgZero(1, "HT_TxStream"); %>';
var rx_stream_idx = '<% getCfgZero(1, "HT_RxStream"); %>';
var txrxStream = '<% getRaxHTStream(); %>';
var max_bssid_num = '<% getMaxBssidNum(); %>';
var BssidNum = 1*'<% getCfgGeneral(1, "BssidNum"); %>';
/* wireless security*/
var wpsenable  = '<% getCfgZero(1, "WscModeOption"); %>';
var ht_disallow_tkip = '<% getCfgZero(1, "HT_DisallowTKIP"); %>';
var key_interval = '<% getCfgGeneral(1, "RekeyInterval"); %>';
var security_mode = '<% getCfgGeneral(1, "AuthMode"); %>';
var encryp_type = '<% getCfgGeneral(1, "EncrypType"); %>';
var wep_key_type = '<% getCfgGeneral(1, "Key1Type"); %>';
var wep_key = '<% getCfgGeneral(1, "Key1Str1"); %>';
var wpa_key = '<% getCfgGeneral(1, "WPAPSK1"); %>';
var default_key_id = '<% getCfgGeneral(1, "DefaultKeyID"); %>';

ChLst_24G = new Array(14);
ChLst_24G[0] = "2412MHz (" + MM_channel + " 1)";
ChLst_24G[1] = "2417MHz (" + MM_channel + " 2)";
ChLst_24G[2] = "2422MHz (" + MM_channel + " 3)";
ChLst_24G[3] = "2427MHz (" + MM_channel + " 4)";
ChLst_24G[4] = "2432MHz (" + MM_channel + " 5)";
ChLst_24G[5] = "2437MHz (" + MM_channel + " 6)";
ChLst_24G[6] = "2442MHz (" + MM_channel + " 7)";
ChLst_24G[7] = "2447MHz (" + MM_channel + " 8)";
ChLst_24G[8] = "2452MHz (" + MM_channel + " 9)";
ChLst_24G[9] = "2457MHz (" + MM_channel + " 10)";
ChLst_24G[10] = "2462MHz (" + MM_channel + " 11)";
ChLst_24G[11] = "2467MHz (" + MM_channel + " 12)";
ChLst_24G[12] = "2472MHz (" + MM_channel + " 13)";
ChLst_24G[13] = "2484MHz (" + MM_channel + " 14)";

ChLst_5G = new Array(33);
ChLst_5G[0] = "5180MHz (" + MM_channel + "  36)";
ChLst_5G[1] = "5200MHz (" + MM_channel + "  40)";
ChLst_5G[2] = "5220MHz (" + MM_channel + "  44)";
ChLst_5G[3] = "5240MHz (" + MM_channel + "  48)";
ChLst_5G[4] = "5260MHz (" + MM_channel + "  52)";
ChLst_5G[5] = "5280MHz (" + MM_channel + "  56)";
ChLst_5G[6] = "5300MHz (" + MM_channel + "  60)";
ChLst_5G[7] = "5320MHz (" + MM_channel + "  64)";
ChLst_5G[16] = "5500MHz (" + MM_channel + "  100)";
ChLst_5G[17] = "5520MHz (" + MM_channel + "  104)";
ChLst_5G[18] = "5540MHz (" + MM_channel + "  108)";
ChLst_5G[19] = "5560MHz (" + MM_channel + "  112)";
ChLst_5G[20] = "5580MHz (" + MM_channel + "  116)";
ChLst_5G[21] = "5600MHz (" + MM_channel + "  120)";
ChLst_5G[22] = "5620MHz (" + MM_channel + "  124)";
ChLst_5G[23] = "5640MHz (" + MM_channel + "  128)";
ChLst_5G[24] = "5660MHz (" + MM_channel + "  132)";
ChLst_5G[25] = "5680MHz (" + MM_channel + "  136)";
ChLst_5G[26] = "5700MHz (" + MM_channel + "  140)";
ChLst_5G[28] = "5745MHz (" + MM_channel + "  149)";
ChLst_5G[29] = "5765MHz (" + MM_channel + "  153)";
ChLst_5G[30] = "5785MHz (" + MM_channel + "  157)";
ChLst_5G[31] = "5805MHz (" + MM_channel + "  161)";
ChLst_5G[32] = "5825MHz (" + MM_channel + "  165)";

HT5GExtCh = new Array(22);
HT5GExtCh[0] = new Array(1, "5200MHz (" + MM_channel + "  40)"); //36's extension channel
HT5GExtCh[1] = new Array(0, "5180MHz (" + MM_channel + "  36)"); //40's extension channel
HT5GExtCh[2] = new Array(1, "5240MHz (" + MM_channel + "  48)"); //44's
HT5GExtCh[3] = new Array(0, "5220MHz (" + MM_channel + "  44)"); //48's
HT5GExtCh[4] = new Array(1, "5280MHz (" + MM_channel + "  56)"); //52's
HT5GExtCh[5] = new Array(0, "5260MHz (" + MM_channel + "  52)"); //56's
HT5GExtCh[6] = new Array(1, "5320MHz (" + MM_channel + "  64)"); //60's
HT5GExtCh[7] = new Array(0, "5300MHz (" + MM_channel + "  60)"); //64's
HT5GExtCh[8] = new Array(1, "5520MHz (" + MM_channel + "  104)"); //100's
HT5GExtCh[9] = new Array(0, "5500MHz (" + MM_channel + "  100)"); //104's
HT5GExtCh[10] = new Array(1, "5560MHz (" + MM_channel + "  112)"); //108's
HT5GExtCh[11] = new Array(0, "5540MHz (" + MM_channel + "  108)"); //112's
HT5GExtCh[12] = new Array(1, "5600MHz (" + MM_channel + "  120)"); //116's
HT5GExtCh[13] = new Array(0, "5580MHz (" + MM_channel + "  116)"); //120's
HT5GExtCh[14] = new Array(1, "5640MHz (" + MM_channel + "  128)"); //124's
HT5GExtCh[15] = new Array(0, "5620MHz (" + MM_channel + "  124)"); //128's
HT5GExtCh[16] = new Array(1, "5680MHz (" + MM_channel + "  136)"); //132's
HT5GExtCh[17] = new Array(0, "5660MHz (" + MM_channel + "  132)"); //136's
HT5GExtCh[18] = new Array(1, "5765MHz (" + MM_channel + "  153)"); //149's
HT5GExtCh[19] = new Array(0, "5745MHz (" + MM_channel + "  149)"); //153's
HT5GExtCh[20] = new Array(1, "5805MHz (" + MM_channel + "  161)"); //157's
HT5GExtCh[21] = new Array(0, "5785MHz (" + MM_channel + "  157)"); //161's

function CreateExtChOpt(vChannel)
{
	var y = document.createElement('option');

	y.text = ChLst_24G[1*vChannel - 1];
//	y.value = 1*vChannel;
	y.value = 1;

	var x = document.getElementById("n_extcha");

	try {
		x.add(y,null); // standards compliant
	} catch(ex) {
		x.add(y); // IE only
	}
}

function InsExtChOpt()
{
	var wmode = document.basic_form.wirelessmode.options.selectedIndex;
	var OptLen; 
	var CurrCh;

	if ((1*wmode == 6) || (1*wmode == 3) || (1*wmode == 4) || (1*wmode == 7)){
		var x = document.getElementById("n_extcha");
		var length = document.basic_form.n_extcha.options.length;

		if (length > 1)	{
			x.selectedIndex = 1;
			x.remove(x.selectedIndex);
		}

		if ((1*wmode == 6) || (1*wmode == 7)){
			CurrCh = document.basic_form.sz11aChannel.value;

			if ((1*CurrCh >= 36) && (1*CurrCh <= 64)){
				CurrCh = 1*CurrCh;
				CurrCh /= 4;
				CurrCh -= 9;

				x.options[0].text = HT5GExtCh[CurrCh][1];
				x.options[0].value = HT5GExtCh[CurrCh][0];
			}else if ((1*CurrCh >= 100) && (1*CurrCh <= 136)){
				CurrCh = 1*CurrCh;
				CurrCh /= 4;
				CurrCh -= 17;

				x.options[0].text = HT5GExtCh[CurrCh][1];
				x.options[0].value = HT5GExtCh[CurrCh][0];
			}else if ((1*CurrCh >= 149) && (1*CurrCh <= 161)){
				CurrCh = 1*CurrCh;
				CurrCh -= 1;
				CurrCh /= 4;
				CurrCh -= 19;

				x.options[0].text = HT5GExtCh[CurrCh][1];
				x.options[0].value = HT5GExtCh[CurrCh][0];
			}else{
				x.options[0].text = MM_auto_select;
				x.options[0].value = 0;
			}
		}else if ((1*wmode == 3) || (1*wmode == 4)){
			CurrCh = document.basic_form.sz11gChannel.value;
			OptLen = document.basic_form.sz11gChannel.options.length;

			if ((CurrCh >=1) && (CurrCh <= 4)){
				x.options[0].text = ChLst_24G[1*CurrCh + 4 - 1];
				x.options[0].value = 1;
			}else if ((CurrCh >= 5) && (CurrCh <= 7)){
				x.options[0].text = ChLst_24G[1*CurrCh - 4 - 1];
				x.options[0].value = 0; //1*CurrCh - 4;
				CurrCh = 1*CurrCh;
				CurrCh += 4;
				CreateExtChOpt(CurrCh);
			}else if ((CurrCh >= 8) && (CurrCh <= 9)){
				x.options[0].text = ChLst_24G[1*CurrCh - 4 - 1];
				x.options[0].value = 0; //1*CurrCh - 4;

				if (OptLen >=14){
					CurrCh = 1*CurrCh;
					CurrCh += 4;
					CreateExtChOpt(CurrCh);
				}
			}else if (CurrCh == 10){
				x.options[0].text = ChLst_24G[1*CurrCh - 4 - 1];
				x.options[0].value = 0; //1*CurrCh - 4;

				if (OptLen > 14){
					CurrCh = 1*CurrCh;
					CurrCh += 4;
					CreateExtChOpt(CurrCh);
				}
			}else if (CurrCh >= 11){
				x.options[0].text = ChLst_24G[1*CurrCh - 4 - 1];
				x.options[0].value = 0; //1*CurrCh - 4;
			}else{
				x.options[0].text = MM_auto_select;
				x.options[0].value = 0;
			}
		}
	}
}

function ChOnChange()
{
	if (document.basic_form.n_bandwidth[1].checked == true)	{	//Auto
		var wmode = document.basic_form.wirelessmode.options.selectedIndex;

		if ((1*wmode == 6) || (1*wmode == 7)){
			if (document.basic_form.n_bandwidth[1].checked == true){
				document.getElementById("extension_channel").style.display = "none";//hidden by chenfei
				document.basic_form.n_extcha.disabled = false;
			}

			if (document.basic_form.sz11aChannel.options.selectedIndex == 0){
				document.getElementById("extension_channel").style.display = "none";
				document.basic_form.n_extcha.disabled = true;
			}
		}else if ((1*wmode == 3) || (1*wmode == 4)){
			if (document.basic_form.n_bandwidth[1].checked == true){
				document.getElementById("extension_channel").style.display = "none";//hidden by chenfei
				document.basic_form.n_extcha.disabled = false;
			}

			if (document.basic_form.sz11gChannel.options.selectedIndex == 0){
				document.getElementById("extension_channel").style.display = "none";
				document.basic_form.n_extcha.disabled = true;
			}
		}
	}

	InsExtChOpt();
}

function ChBwOnClick()
{
	var wmode = document.basic_form.wirelessmode.options.selectedIndex;
	if (document.basic_form.n_bandwidth[0].checked == true) {//20M
		document.getElementById("extension_channel").style.display = "none";
		document.basic_form.n_extcha.disabled = true;
	}else{	//Auto
		document.getElementById("extension_channel").style.display = "none";//hidden by chenfei
		document.basic_form.n_extcha.disabled = false;

		if ((1*wmode == 6) || (1*wmode == 7)){
			if (document.basic_form.sz11aChannel.options.selectedIndex == 0){
				document.getElementById("extension_channel").style.display = "none";
				document.basic_form.n_extcha.disabled = true;
			}
		}
	}
}

function wirelessModeChange()
{
	document.getElementById("div_11a_channel").style.display = "none";
	document.basic_form.sz11aChannel.disabled = true;
	document.getElementById("div_11b_channel").style.display = "none";
	document.basic_form.sz11bChannel.disabled = true;
	document.getElementById("div_11g_channel").style.display = "none";
	document.basic_form.sz11gChannel.disabled = true;
	document.getElementById("div_abg_rate").style.display = "none";
	document.basic_form.abg_rate.disabled = true;
	document.getElementById("div_bandwidth").style.display = "none";
	document.basic_form.n_mode.disabled = true;
	document.basic_form.n_bandwidth.disabled = true;
	document.basic_form.n_rdg.disabled = true;
	document.basic_form.n_gi.disabled = true;
	document.basic_form.n_mcs.disabled = true;

	var wmode = document.basic_form.wirelessmode.options.selectedIndex;
	if (wmode == 0){
		document.basic_form.wirelessmode.options.selectedIndex = 0;
		document.getElementById("div_11g_channel").style.display = "";
		document.basic_form.sz11gChannel.disabled = false;
	}else if (wmode == 1){
		document.basic_form.wirelessmode.options.selectedIndex = 1;
		document.getElementById("div_11b_channel").style.display = "";
		document.basic_form.sz11bChannel.disabled = false;
	}else if (wmode == 2){
		document.basic_form.wirelessmode.options.selectedIndex = 2;
		document.getElementById("div_11g_channel").style.display = "";
		document.basic_form.sz11gChannel.disabled = false;
	}else if (wmode == 5){
		document.basic_form.wirelessmode.options.selectedIndex = 5;
		document.getElementById("div_11a_channel").style.display = "";
		document.basic_form.sz11aChannel.disabled = false;
	}else if ((wmode == 6) || (wmode == 7)){
		if (wmode == 7)
			document.basic_form.wirelessmode.options.selectedIndex = 7;
		else
			document.basic_form.wirelessmode.options.selectedIndex = 6;
		
		document.getElementById("div_11a_channel").style.display = "";
		document.basic_form.sz11aChannel.disabled = false;
		document.getElementById("div_bandwidth").style.display = "";
		document.basic_form.n_mode.disabled = false;
		document.basic_form.n_bandwidth.disabled = false;
		document.basic_form.n_rdg.disabled = false;
		document.basic_form.n_gi.disabled = false;
		document.basic_form.n_mcs.disabled = false;

		if (document.basic_form.sz11aChannel.options.selectedIndex == 0){
			document.getElementById("extension_channel").style.display = "none";
			document.basic_form.n_extcha.disabled = true;
		}

		InsExtChOpt();
	}else if ((wmode == 3) || (wmode == 4)){
		if (wmode == 4)
			document.basic_form.wirelessmode.options.selectedIndex = 4;
		else
			document.basic_form.wirelessmode.options.selectedIndex = 3;

		document.getElementById("div_11g_channel").style.display = "";
		document.basic_form.sz11gChannel.disabled = false;
		document.getElementById("div_bandwidth").style.display = "";
		document.basic_form.n_mode.disabled = false;
		document.basic_form.n_bandwidth.disabled = false;
		document.basic_form.n_rdg.disabled = false;
		document.basic_form.n_gi.disabled = false;
		document.basic_form.n_mcs.disabled = false;

		if (document.basic_form.sz11gChannel.options.selectedIndex == 0){
			document.getElementById("extension_channel").style.display = "none";
			document.basic_form.n_extcha.disabled = true;
		}

		InsExtChOpt();
	}

	//ABG Rate
	if ((wmode == 0) || (wmode == 2) || (wmode == 5)){
		document.basic_form.abg_rate.options.length = 0;
		document.basic_form.abg_rate.options[0] = new Option(MM_auto, "0");
		document.basic_form.abg_rate.options[1] = new Option("1 Mbps", "1");
		document.basic_form.abg_rate.options[2] = new Option("2 Mbps", "2");
		document.basic_form.abg_rate.options[3] = new Option("5.5 Mbps", "5");
		document.basic_form.abg_rate.options[4] = new Option("6 Mbps", "6");
		document.basic_form.abg_rate.options[5] = new Option("9 Mbps", "9");
		document.basic_form.abg_rate.options[6] = new Option("11 Mbps", "11");
		document.basic_form.abg_rate.options[7] = new Option("12 Mbps", "12");
		document.basic_form.abg_rate.options[8] = new Option("18 Mbps", "18");
		document.basic_form.abg_rate.options[9] = new Option("24 Mbps", "24");
		document.basic_form.abg_rate.options[10] = new Option("36 Mbps", "36");
		document.basic_form.abg_rate.options[11] = new Option("48 Mbps", "48");
		document.basic_form.abg_rate.options[12] = new Option("54 Mbps", "54");
		if (fxtxmode == "CCK" || fxtxmode == "cck") {
			if (ht_mcs.indexOf("33") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 0;
			else if (ht_mcs.indexOf("0") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 1;
			else if (ht_mcs.indexOf("1") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 2;
			else if (ht_mcs.indexOf("2") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 3;
			else if (ht_mcs.indexOf("3") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 6;
		}else {
			if (ht_mcs.indexOf("33") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 0;
			else if (ht_mcs.indexOf("0") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 4;
			else if (ht_mcs.indexOf("1") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 5;
			else if (ht_mcs.indexOf("2") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 7;
			else if (ht_mcs.indexOf("3") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 8;
			else if (ht_mcs.indexOf("4") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 9;
			else if (ht_mcs.indexOf("5") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 10;
			else if (ht_mcs.indexOf("6") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 11;
			else if (ht_mcs.indexOf("7") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 12;
		}

		document.getElementById("div_abg_rate").style.display = "";
		document.basic_form.abg_rate.disabled = false;
	}else if (wmode == 1){
		document.basic_form.abg_rate.options.length = 0;
		document.basic_form.abg_rate.options[0] = new Option(MM_auto, "0");
		document.basic_form.abg_rate.options[1] = new Option("1 Mbps", "1");
		document.basic_form.abg_rate.options[2] = new Option("2 Mbps", "2");
		document.basic_form.abg_rate.options[3] = new Option("5.5 Mbps", "5");
		document.basic_form.abg_rate.options[4] = new Option("11 Mbps", "11");
		if (ht_mcs.indexOf("33") == 0)
			document.basic_form.abg_rate.options.selectedIndex = 0;
		else if (ht_mcs.indexOf("0") == 0)
			document.basic_form.abg_rate.options.selectedIndex = 1;
		else if (ht_mcs.indexOf("1") == 0)
			document.basic_form.abg_rate.options.selectedIndex = 2;
		else if (ht_mcs.indexOf("2") == 0)
			document.basic_form.abg_rate.options.selectedIndex = 3;
		else if (ht_mcs.indexOf("3") == 0)
			document.basic_form.abg_rate.options.selectedIndex = 4;

		document.getElementById("div_abg_rate").style.display = "";
		document.basic_form.abg_rate.disabled = false;
	}
}

function securityMode()
{
	document.getElementById("div_wep").style.display = "none";
	document.getElementById("div_wpa").style.display = "none";
	document.getElementById("div_wpa_algorithms").style.display = "none";
	document.getElementById("wpa_passphrase").style.display = "none";
	document.getElementById("wpa_key_renewal_interval").style.display = "none";
	document.basic_form.cipher[0].disabled = true;
	document.basic_form.cipher[1].disabled = true;
	document.basic_form.cipher[2].disabled = true;
	document.basic_form.passphrase.disabled = true;
	document.basic_form.keyRenewalInterval.disabled = true;

	var security_mode = document.basic_form.security_mode.value;
	if (security_mode == "WEPOPEN"){
		document.getElementById("div_wep").style.display = "";
	}
	else if (security_mode == "WPAPSK" || security_mode == "WPA2PSK" || security_mode == "WPAPSKWPA2PSK"){
		document.getElementById("div_wpa").style.display = "";
		document.getElementById("div_wpa_algorithms").style.display = "";
		document.basic_form.cipher[0].disabled = false;
		document.basic_form.cipher[1].disabled = false;

		// deal with TKIP-AES mixed mode
		if (security_mode == "WPA2PSK" || security_mode == "WPAPSKWPA2PSK")
			document.basic_form.cipher[2].disabled = false;

		document.getElementById("wpa_passphrase").style.display = "";
		document.getElementById("wpa_key_renewal_interval").style.display = "";
		document.basic_form.passphrase.disabled = false;
		document.basic_form.keyRenewalInterval.disabled = false;
	}
}

function onWEPSelect()
{
	if (document.basic_form.WEPSelect.selectedIndex==0)
		document.basic_form.wep_key.maxLength=13;
	else
		document.basic_form.wep_key.maxLength=26;
}

function Load_Setting()
{
	var Ch11aIdx;
	var CurrChLen;
	var wifi_off = '<% getCfgZero(1, "WiFiOff"); %>';
	var mssidb = "<% getMBSSIDBuilt(); %>";
	var i = 0;
	
	if (CntyCd == '')
		CntyCd = 'NONE';

	document.getElementById("div_11a_channel").style.display = "none";
	document.basic_form.sz11aChannel.disabled = true;
	document.getElementById("div_11b_channel").style.display = "none";
	document.basic_form.sz11bChannel.disabled = true;
	document.getElementById("div_11g_channel").style.display = "none";
	document.basic_form.sz11gChannel.disabled = true;
	document.getElementById("div_bandwidth").style.display = "none";
	document.basic_form.n_mode.disabled = true;
	document.basic_form.n_bandwidth.disabled = true;
	document.basic_form.n_rdg.disabled = true;
	document.basic_form.n_gi.disabled = true;
	document.basic_form.n_mcs.disabled = true;
	document.getElementById("div_2040_coexit").style.display = "none";
	document.basic_form.n_2040_coexit.disabled = true;

	PhyMode = 1*PhyMode;
	if ((PhyMode >= 8) || (PhyMode == 6)){
		document.getElementById("div_bandwidth").style.display = "";
		document.basic_form.n_mode.disabled = false;
		document.basic_form.n_bandwidth.disabled = false;
		document.basic_form.n_rdg.disabled = false;
		document.basic_form.n_gi.disabled = false;
		document.basic_form.n_mcs.disabled = false;
	}

	var Aband = "<% getRaxABand(); %>";
	if (Aband == "1"){
		document.basic_form.wirelessmode.options[5] = new Option("5 GHz (A)", "2");
		document.basic_form.wirelessmode.options[6] = new Option("5 GHz (A+N)", "8");
		document.basic_form.wirelessmode.options[7] = new Option("5 GHz (N)", "11");
	}
	if ((PhyMode == 0) || (PhyMode == 4) || (PhyMode == 9) || (PhyMode == 6)){
		if (PhyMode == 0)
			document.basic_form.wirelessmode.options.selectedIndex = 0;
		else if (PhyMode == 4)
			document.basic_form.wirelessmode.options.selectedIndex = 2;
		else if (PhyMode == 6)
			document.basic_form.wirelessmode.options.selectedIndex = 3;
		else if (PhyMode == 9)
			document.basic_form.wirelessmode.options.selectedIndex = 4;

		document.getElementById("div_11g_channel").style.display = "";
		document.basic_form.sz11gChannel.disabled = false;
	}
	else if (PhyMode == 1){
		document.basic_form.wirelessmode.options.selectedIndex = 1;
		document.getElementById("div_11b_channel").style.display = "";
		document.basic_form.sz11bChannel.disabled = false;
	}
	else if ((PhyMode == 2) || (PhyMode == 8) || (PhyMode == 11)){
		if (PhyMode == 2)
			document.basic_form.wirelessmode.options.selectedIndex = 5;
		else if (PhyMode == 8)
			document.basic_form.wirelessmode.options.selectedIndex = 6;
		else if (PhyMode == 11)
			document.basic_form.wirelessmode.options.selectedIndex = 7;

		document.getElementById("div_11a_channel").style.display = "";
		document.basic_form.sz11aChannel.disabled = false;
	}

	if (HiddenSSID == 0)
		document.basic_form.broadcastssid[0].checked = true;
	else
		document.basic_form.broadcastssid[1].checked = true;

	if (APIsolated == 1)
		document.basic_form.apisolated[0].checked = true;
	else
		document.basic_form.apisolated[1].checked = true;

	if (1*ht_bw == 0) {
		document.basic_form.n_bandwidth[0].checked = true;	//20M
		document.getElementById("extension_channel").style.display = "none";
		document.basic_form.n_extcha.disabled = true;
	}
	else{
		document.basic_form.n_bandwidth[1].checked = true;	//Auto
		document.getElementById("extension_channel").style.display = "none";//hidden by chenfei
		document.basic_form.n_extcha.disabled = false;
	}

	ChIdx = 1*ChIdx;
	if ((PhyMode == 0) || (PhyMode == 4) || (PhyMode == 6) || (PhyMode == 7) || (PhyMode == 9)){
		if ((CntyCd == 'US' || CntyCd == 'TW') && (ChIdx < 1 || ChIdx > 11))
			document.basic_form.sz11gChannel.options.selectedIndex = 0;
		else if ((CntyCd == 'FR' || CntyCd == 'BR' || CntyCd == 'HK' || CntyCd == 'CN') && (ChIdx < 1 || ChIdx > 13))
			document.basic_form.sz11gChannel.options.selectedIndex = 0;
		else if (CntyCd == 'JP' && (ChIdx < 1 || ChIdx > 14))
			document.basic_form.sz11gChannel.options.selectedIndex = 0;
		else{
			if (ChIdx < 1 || ChIdx > 14)
				document.basic_form.sz11gChannel.options.selectedIndex = 0;
		}
	}
	else if (PhyMode == 1){
		if ((CntyCd == 'US' || CntyCd == 'TW') && (ChIdx < 1 || ChIdx > 11))
			document.basic_form.sz11bChannel.options.selectedIndex = 0;
		else if ((CntyCd == 'FR' || CntyCd == 'BR' || CntyCd == 'HK' || CntyCd == 'CN') && (ChIdx < 1 || ChIdx > 13))
			document.basic_form.sz11bChannel.options.selectedIndex = 0;
		else if (CntyCd == 'JP' && (ChIdx < 1 || ChIdx > 14))
			document.basic_form.sz11bChannel.options.selectedIndex = 0;
		else{
			if (ChIdx < 1 || ChIdx > 14)
				document.basic_form.sz11bChannel.options.selectedIndex = 0;
		}
	}
	else if ((PhyMode == 2) || (PhyMode == 8) || (PhyMode == 11)){
		if ((CntyCd == 'HK' || CntyCd == 'CN') && (ChIdx < 36 || (ChIdx > 64 && ChIdx < 149) || ChIdx > 165))
			document.basic_form.sz11aChannel.options.selectedIndex = 0;
		else if (CntyCd == 'BR' && (ChIdx < 36 || (ChIdx > 64 && ChIdx < 100) || ChIdx > 140))
			document.basic_form.sz11aChannel.options.selectedIndex = 0;
		else if (CntyCd == 'FR' && (ChIdx < 36 || ChIdx > 64))
			document.basic_form.sz11aChannel.options.selectedIndex = 0;
		else if (CntyCd == 'JP' && (ChIdx < 36 || ChIdx > 48))
			document.basic_form.sz11aChannel.options.selectedIndex = 0;
		else if (CntyCd == 'US' && (ChIdx < 36 || (ChIdx > 64 && ChIdx < 100) || (ChIdx > 140 && ChIdx < 149) || ChIdx > 165))
			document.basic_form.sz11aChannel.options.selectedIndex = 0;
		else if (CntyCd == 'TW' && (ChIdx < 52 || ChIdx > 64))
			document.basic_form.sz11aChannel.options.selectedIndex = 0;
		else{
			if (ChIdx < 36 || (ChIdx > 64 && ChIdx < 100) || (ChIdx > 140 && ChIdx < 149) || ChIdx > 165)
				document.basic_form.sz11aChannel.options.selectedIndex = 0;
		}
	}

	//ABG Rate
	if ((PhyMode == 0) || (PhyMode == 2) || (PhyMode == 4)){
		document.basic_form.abg_rate.options.length = 0;
		document.basic_form.abg_rate.options[0] = new Option(MM_auto, "0");
		document.basic_form.abg_rate.options[1] = new Option("1 Mbps", "1");
		document.basic_form.abg_rate.options[2] = new Option("2 Mbps", "2");
		document.basic_form.abg_rate.options[3] = new Option("5.5 Mbps", "5");
		document.basic_form.abg_rate.options[4] = new Option("6 Mbps", "6");
		document.basic_form.abg_rate.options[5] = new Option("9 Mbps", "9");
		document.basic_form.abg_rate.options[6] = new Option("11 Mbps", "11");
		document.basic_form.abg_rate.options[7] = new Option("12 Mbps", "12");
		document.basic_form.abg_rate.options[8] = new Option("18 Mbps", "18");
		document.basic_form.abg_rate.options[9] = new Option("24 Mbps", "24");
		document.basic_form.abg_rate.options[10] = new Option("36 Mbps", "36");
		document.basic_form.abg_rate.options[11] = new Option("48 Mbps", "48");
		document.basic_form.abg_rate.options[12] = new Option("54 Mbps", "54");
		if (fxtxmode == "CCK" || fxtxmode == "cck") {
			if (ht_mcs.indexOf("33") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 0;
			else if (ht_mcs.indexOf("0") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 1;
			else if (ht_mcs.indexOf("1") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 2;
			else if (ht_mcs.indexOf("2") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 3;
			else if (ht_mcs.indexOf("3") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 6;
		}
		else {
			if (ht_mcs.indexOf("33") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 0;
			else if (ht_mcs.indexOf("0") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 4;
			else if (ht_mcs.indexOf("1") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 5;
			else if (ht_mcs.indexOf("2") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 7;
			else if (ht_mcs.indexOf("3") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 8;
			else if (ht_mcs.indexOf("4") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 9;
			else if (ht_mcs.indexOf("5") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 10;
			else if (ht_mcs.indexOf("6") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 11;
			else if (ht_mcs.indexOf("7") == 0)
				document.basic_form.abg_rate.options.selectedIndex = 12;
		}
	}
	else if (PhyMode == 1){
		document.basic_form.abg_rate.options.length = 0;
		document.basic_form.abg_rate.options[0] = new Option(MM_auto, "0");
		document.basic_form.abg_rate.options[1] = new Option("1 Mbps", "1");
		document.basic_form.abg_rate.options[2] = new Option("2 Mbps", "2");
		document.basic_form.abg_rate.options[3] = new Option("5.5 Mbps", "5");
		document.basic_form.abg_rate.options[4] = new Option("11 Mbps", "11");
		if (ht_mcs.indexOf("33") == 0)
			document.basic_form.abg_rate.options.selectedIndex = 0;
		else if (ht_mcs.indexOf("0") == 0)
			document.basic_form.abg_rate.options.selectedIndex = 1;
		else if (ht_mcs.indexOf("1") == 0)
			document.basic_form.abg_rate.options.selectedIndex = 2;
		else if (ht_mcs.indexOf("2") == 0)
			document.basic_form.abg_rate.options.selectedIndex = 3;
		else if (ht_mcs.indexOf("3") == 0)
			document.basic_form.abg_rate.options.selectedIndex = 4;
	}
	else{
		document.getElementById("div_abg_rate").style.display = "none";
		document.basic_form.abg_rate.disabled = true;
	}

	document.getElementById("div_mbssidapisolated").style.display = "none";
	document.basic_form.mbssidapisolated.disabled = true;
	if (mssidb == "1"){
		//document.getElementById("div_mbssidapisolated").style.display = "";
		document.basic_form.mbssidapisolated.disabled = false;
		if (mbssidapisolated == "1")
			document.basic_form.mbssidapisolated[0].checked = true;
		else
			document.basic_form.mbssidapisolated[1].checked = true;
	}

	InsExtChOpt();

	if (1*ht_stbc == 0)
		document.basic_form.n_stbc[0].checked = true;
	else
		document.basic_form.n_stbc[1].checked = true;

	if (1*ht_mode == 0)
		document.basic_form.n_mode[0].checked = true;
	else if (1*ht_mode == 1)
		document.basic_form.n_mode[1].checked = true;
	else if (1*ht_mode == 2)
		document.basic_form.n_mode[2].checked = true;

	if (1*ht_gi == 0)
		document.basic_form.n_gi[0].checked = true;
	else if (1*ht_gi == 1)
		document.basic_form.n_gi[1].checked = true;
	else if (1*ht_gi == 2)
		document.basic_form.n_gi[2].checked = true;

	if (1*txrxStream == 3) {
		for (i = 16; i < 24; i++)
			document.basic_form.n_mcs.options[i] = new Option(i, i);
	}
	
	var mcs_length = document.basic_form.n_mcs.options.length;
	if (txrxStream == "3") {
		document.basic_form.n_mcs.options[mcs_length] = new Option("32", "32");
		mcs_length++;
		document.basic_form.n_mcs.options[mcs_length] = new Option(MM_auto, "33");
		mcs_length++;
	}

	var ht_mcs_nm = 1*ht_mcs.split(";", 1);
	if (ht_mcs_nm <= 23)
		document.basic_form.n_mcs.options.selectedIndex = ht_mcs_nm;
    else if (ht_mcs_nm == 32)
		document.basic_form.n_mcs.options.selectedIndex = mcs_length-2;
    else if (ht_mcs_nm == 33)
		document.basic_form.n_mcs.options.selectedIndex = mcs_length-1;

	if (1*ht_rdg == 0)
		document.basic_form.n_rdg[0].checked = true;
	else
		document.basic_form.n_rdg[1].checked = true;

	var OptLen = document.basic_form.n_extcha.options.length;
	if (1*ht_extcha == 0){
		if (OptLen > 1)
			document.basic_form.n_extcha.options.selectedIndex = 0;
	}
	else if (1*ht_extcha == 1){
		if (OptLen > 1)
			document.basic_form.n_extcha.options.selectedIndex = 1;
	}
	else{
		document.basic_form.n_extcha.options.selectedIndex = 0;
	}

	if ((1*PhyMode == 8) || (1*PhyMode == 11)){
		if (document.basic_form.sz11aChannel.options.selectedIndex == 0){
			document.getElementById("extension_channel").style.display = "none";
			document.basic_form.n_extcha.disabled = true;
		}
	}
	else if ((1*PhyMode == 9) || (1*PhyMode == 6)){
		if (document.basic_form.sz11gChannel.options.selectedIndex == 0){
			document.getElementById("extension_channel").style.display = "none";
			document.basic_form.n_extcha.disabled = true;
		}
	}

	if (1*ht_amsdu == 0)
		document.basic_form.n_amsdu[0].checked = true;
	else
		document.basic_form.n_amsdu[1].checked = true;

	if (1*ht_autoba == 0)
		document.basic_form.n_autoba[0].checked = true;
	else
		document.basic_form.n_autoba[1].checked = true;

	if (1*ht_badecline == 0)
		document.basic_form.n_badecline[0].checked = true;
	else
		document.basic_form.n_badecline[1].checked = true;

	if (1*ht_disallow_tkip == 1)
		document.basic_form.n_disallow_tkip[1].checked = true;
	else
		document.basic_form.n_disallow_tkip[0].checked = true;

	if (1*draft3b == 1){
		document.getElementById("div_2040_coexit").style.display = "none";//hidden by chenfei 2014-12-25
		document.basic_form.n_2040_coexit.disabled = false;
		if (1*ht_2040_coexit == 0)
			document.basic_form.n_2040_coexit[0].checked = true;
		else
			document.basic_form.n_2040_coexit[1].checked = true;
	}

	if (txrxStream == "2"){
		document.getElementById("div_HtTx2Stream").style.display = "";
		document.getElementById("div_HtRx2Stream").style.display = "";
	}
	else if (txrxStream == "3"){
		document.basic_form.rx_stream.options[2] = new Option("3", "3");
		document.basic_form.tx_stream.options[2] = new Option("3", "3");
	}
	else{
		document.getElementById("div_HtTx2Stream").style.display = "none";
		tx_stream_idx = 1;
		document.getElementById("div_HtRx2Stream").style.display = "none";
		rx_stream_idx = 1;
	}
	
	document.basic_form.rx_stream.options.selectedIndex = rx_stream_idx - 1;
	document.basic_form.tx_stream.options.selectedIndex = tx_stream_idx - 1;
	
	
	//init security
	if (encryp_type.split(";")[0] == "NONE")
		document.basic_form.security_mode.selectedIndex = 0;
	else if (encryp_type.split(";")[0] == "WEP") {
		document.basic_form.security_mode.selectedIndex = 1;
		document.basic_form.WEPSelect.value = wep_key_type.split(";")[0];
	}
	else {
/*		
		if (security_mode.split(";")[0] == "WPAPSK")
			document.basic_form.security_mode.selectedIndex = 2;
		else if (security_mode.split(";")[0] == "WPA2PSK")
			document.basic_form.security_mode.selectedIndex = 3;
		else if (security_mode.split(";")[0] == "WPAPSKWPA2PSK")
			document.basic_form.security_mode.selectedIndex = 4;
		else if (security_mode.split(";")[0] == "WPAPSKWPA2PSK")
*/
		document.basic_form.security_mode.selectedIndex = 2;
		
		if (encryp_type.split(";")[0] == "TKIP")
			document.basic_form.cipher[0].checked = true;
		else if (encryp_type.split(";")[0] == "AES")
			document.basic_form.cipher[1].checked = true;
		else if (encryp_type.split(";")[0] == "TKIPAES")
			document.basic_form.cipher[2].checked = true;
		
		document.basic_form.keyRenewalInterval.value = key_interval.split(";")[0];
	}
		
	
	onWEPSelect();
	securityMode();
	
	document.basic_form.security_mode2.value = security_mode.split(";")[1];
	document.basic_form.encryp_type2.value = encryp_type.split(";")[1];
	document.basic_form.default_key_id2.value = default_key_id.split(";")[1];
	document.basic_form.WEPSelect2.value = wep_key_type.split(";")[1];
	document.basic_form.keyRenewalInterval2.value = key_interval.split(";")[1];
	
	document.basic_form.security_mode3.value = security_mode.split(";")[2];
	document.basic_form.encryp_type3.value = encryp_type.split(";")[2];
	document.basic_form.default_key_id3.value = default_key_id.split(";")[2];
	document.basic_form.WEPSelect3.value = wep_key_type.split(";")[2];
	document.basic_form.keyRenewalInterval3.value = key_interval.split(";")[2];
}

function check_wpa()
{
	if (document.basic_form.cipher[0].checked != true && 
	   	document.basic_form.cipher[1].checked != true &&
	   	document.basic_form.cipher[2].checked != true){
	   	alert(JS_msg78);
	   	return false;
	}

	// there is no tkip-aes mixed mode in WPA-PSK.
	if (document.basic_form.security_mode.value == "WPAPSK" && document.basic_form.cipher[2].checked == true){
		document.basic_form.cipher[0].checked = true;
		document.basic_form.cipher[1].checked = false;
		document.basic_form.cipher[2].checked = false;
	}
	if (document.basic_form.keyRenewalInterval.value.length==0) {
		alert(JS_msg210);
		return false;
	}
	if (!numberCheck(document.basic_form.keyRenewalInterval.value, MM_key_renewal_interval)) 
		return false;
					
	if (ht_disallow_tkip == "1" && document.basic_form.cipher[0].checked)
		alert(JS_msg80);
	
	return true;
}

function check_wep()
{
	var keylength = document.basic_form.wep_key.value.length;	
	if (keylength == 0){ 
		alert(JS_msg52);
		return false;
	}
	
	if (keylength != 0){
		if (document.basic_form.WEPSelect.options.selectedIndex == 0){
			if (keylength != 5 && keylength != 13) {
				alert(JS_msg53);
				return false;
			}
			
			if (!stringCheck(document.basic_form.wep_key.value, MM_password))
				return false;
		}
		if (document.basic_form.WEPSelect.options.selectedIndex == 1){
			if (keylength != 10 && keylength != 26) {
				alert(JS_msg54);
				return false;
			}
			
			if (!hexCheck(document.basic_form.wep_key.value, MM_password))
				return false;
		}
	}
	
	if (ht_disallow_tkip == "1")
		alert(JS_msg80);
	
	return true;
}

function formCheck()
{
	if (!ssidCheck(document.basic_form.mssid.value)) 
		return false;

	document.basic_form.bssid_num.value = 1;
	
	//set security
	var securitymode = document.basic_form.security_mode.value;
	if (securitymode == "NONE"){
		if (wpsenable != "0") 
			alert(JS_msg69);
	}
	else if (securitymode == "WEPOPEN"){
		if (!check_wep())  
			return false;
		
		if (wpsenable != "0") 
			alert(JS_msg70);
	} 
	else if (securitymode == "WPAPSK" || securitymode == "WPA2PSK" || securitymode == "WPAPSKWPA2PSK" /* || security_mode == 5 */) {
		var wpakey = document.basic_form.passphrase.value;
		if (wpakey.length < 8)	{
			alert(JS_msg71);
			return false;
		}
		
		if (!stringCheck(document.basic_form.passphrase.value, MM_password))
			return false;
		
		if (wpakey.length == 64 && !hexCheck(document.basic_form.passphrase.value, MM_password)) {
			alert(JS_msg72);
			return false;
		}
		
		if (check_wpa() == false)  
			return false;
	}

	return true;
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method=post name=basic_form action="/goform/wirelessBasic">
<input type="hidden" name="submit-url" value="/wireless/basic.asp">
<input type="hidden" name="bssid_num" value="1">
<input type="hidden" name="wifihiddenButton" value="2">

<input type="hidden" name="security_mode2">
<input type="hidden" name="encryp_type2">
<input type="hidden" name="default_key_id2">
<input type="hidden" name="WEPSelect2">
<input type="hidden" name="keyRenewalInterval2">

<input type="hidden" name="security_mode3">
<input type="hidden" name="encryp_type3">
<input type="hidden" name="default_key_id3">
<input type="hidden" name="WEPSelect3">
<input type="hidden" name="keyRenewalInterval3">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_basic_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr> 
<td class="thead">BSSID:</td>
<td><% getWlanCurrentMac(); %></td>
</tr>
<tr style="display:none"> 
<td class="thead"><script>dw(MM_network_mode)</script>:</td>
<td><select name="wirelessmode" onChange="wirelessModeChange()">
<option value=0>2.4 GHz (B+G)</option>
<option value=1>2.4 GHz (B)</option>
<option value=4>2.4 GHz (G)</option>
<option value=6>2.4 GHz (N)</option>
<option value=9>2.4 GHz (B+G+N)</option>
</select></td>
</tr>
<tr> 
<td class="thead"><script>dw(MM_ssid)</script>:</td>
<td><input type=text name=mssid maxlength=32 value="<% getCfgToHTML(1, "SSID1"); %>"></td>
</tr>
<tr style="display:none"> 
<td class="thead"><script>dw(MM_broadcast_ssid)</script>:</td>
<td><input type=radio name=broadcastssid value="0" checked><script>dw(MM_enable)</script>
<input type=radio name=broadcastssid value="1"><script>dw(MM_disable)</script></td>
</tr>
<tr style="display:none"> 
<td class="thead"><script>dw(MM_isolated)</script> de AP:</td>
<td><input type=radio name=apisolated value="1"><script>dw(MM_enable)</script>
<input type=radio name=apisolated value="0" checked><script>dw(MM_disable)</script> <script>dw(MM_isolated_single_ap)</script></td>
</tr>
<tr id="div_mbssidapisolated" style="display:none"> 
<td class="thead"><script>dw(MM_multiple)</script> AP <script>dw(MM_isolated)</script>:</td>
<td><input type=radio name=mbssidapisolated value="1"><script>dw(MM_enable)</script>
<input type=radio name=mbssidapisolated value="0" checked><script>dw(MM_disable)</script> <script>dw(MM_isolated_multiple_ap)</script></td>
</tr>
<tr id="div_11a_channel">
<td class="thead"><script>dw(MM_channel)</script>:</td>
<td><select name="sz11aChannel" onChange="ChOnChange()">
<option value=0><script>dw(MM_auto_select)</script></option>
<% getWlan11aChannels(); %>
</select></td>
</tr>
<tr id="div_11b_channel">
<td class="thead"><script>dw(MM_channel)</script>:</td>
<td><select name="sz11bChannel" onChange="ChOnChange()">
<option value=0><script>dw(MM_auto_select)</script></option>
<% getWlan11bChannels(); %></select></td>
</tr>
<tr id="div_11g_channel">
<td class="thead"><script>dw(MM_channel)</script>:</td>
<td><select name="sz11gChannel" onChange="ChOnChange()">
<option value=0><script>dw(MM_auto_select)</script></option>
<% getWlan11gChannels(); %>
</select></td>
</tr>
<tr id="div_abg_rate">
<td class="thead"><script>dw(MM_rate)</script>:</td>
<td><select name="abg_rate"></select></td>
</tr>
<tr id="div_bandwidth">
<td class="thead"><script>dw(MM_bandwidth)</script>:</td>
<td><input type=radio name=n_bandwidth value="0" onClick="ChBwOnClick()" checked>20MHz
<input type=radio name=n_bandwidth value="1" onClick="ChBwOnClick()">20/40MHz</td>
</tr>
<tr id="div_2040_coexit" style="display:none">
<td class="thead"><script>dw(MM_2040_coexit)</script>:</td>
<td><input type=radio name=n_2040_coexit value="0" checked><script>dw(MM_disable)</script>
<input type=radio name=n_2040_coexit value="1"><script>dw(MM_enable)</script></td>
</tr>
</table>

<table style="display:none" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>  
<td class="title2" colspan="2"><script>dw(MM_ht_phy_mode)</script></td>
</tr>
<tr> 
<td class="thead"><script>dw(MM_nopmode)</script>:</td>
<td><input type=radio name=n_mode value="0" checked>Mixed Mode
<input type=radio name=n_mode value="1">Green Field</td>
</tr>
<tr> 
<td class="thead"><script>dw(MM_guard_interval)</script>:</td>
<td><input type=radio name=n_gi value="0" checked><script>dw(MM_long)</script><input type=radio name=n_gi value="1"><script>dw(MM_auto)</script></td>
</tr>
<tr> 
<td class="thead">MCS:</td>
<td><select name="n_mcs">
<option value="0">0</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
<option value="6">6</option>
<option value="7">7</option>
<option value="8">8</option>
<option value="9">9</option>
<option value="10">10</option>
<option value="11">11</option>
<option value="12">12</option>
<option value="13">13</option>
<option value="14">14</option>
<option value="15">15</option>
<option value="32">32</option>
<option value="33" selected><script>dw(MM_auto)</script></option>
</select></td>
</tr>
<tr> 
<td class="thead"><script>dw(MM_rdg)</script>(RDG):</td>
<td><input type=radio name=n_rdg value="0" checked><script>dw(MM_disable)</script>
<input type=radio name=n_rdg value="1"><script>dw(MM_enable)</script></td>
</tr>
<tr id="extension_channel" style="display:none">
<td class="thead"><script>dw(MM_ext_channel)</script>:</td>
<td><select id="n_extcha" name="n_extcha">
<option value=1 selected>2412MHz (<script>dw(MM_channel)</script> 1)</option>
</select></td>
</tr>
<tr> 
<td class="thead">STBC:</td>
<td><input type=radio name=n_stbc value="0" checked><script>dw(MM_disable)</script>
<input type=radio name=n_stbc value="1"><script>dw(MM_enable)</script></td>
</tr>
<tr> 
<td class="thead"><script>dw(MM_amsdu)</script>:</td>
<td><input type=radio name=n_amsdu value="0" checked><script>dw(MM_disable)</script>
<input type=radio name=n_amsdu value="1"><script>dw(MM_enable)</script></td>
</tr>
<tr> 
<td class="thead"><script>dw(MM_auto_block_ack)</script>:</td>
<td><input type=radio name=n_autoba value="0" checked><script>dw(MM_disable)</script>
<input type=radio name=n_autoba value="1"><script>dw(MM_enable)</script></td>
</tr>
<tr> 
<td class="thead"><script>dw(MM_decline_ba_request)</script>:</td>
<td><input type=radio name=n_badecline value="0" checked><script>dw(MM_disable)</script>
<input type=radio name=n_badecline value="1"><script>dw(MM_enable)</script></td>
</tr>
<tr> 
<td class="thead"><script>dw(MM_ht_disallow_tkip)</script>:</td>
<td><input type=radio name=n_disallow_tkip value="0" checked><script>dw(MM_disable)</script>
<input type=radio name=n_disallow_tkip value="1"><script>dw(MM_enable)</script></td>
</tr>
</table>

<table style="display:none" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr> 
<td class="title2" colspan="2">Others</td>
</tr>
<tr>
<td class="thead">HT TxStream:</td>
<td><select name="tx_stream">
<option value=1>1</option>
<option value=2 id="div_HtTx2Stream">2</option>
</select></td>
</tr>
<tr>
<td class="thead">HT RxStream:</td>
<td><select name="rx_stream">
<option value=1>1</option>
<option value=2 id="div_HtRx2Stream">2</option>
</select></td>
</tr>
</table>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_security_mode)</script>:</td>
<td><select name="security_mode" onChange="securityMode()">
<option value="NONE"><script>dw(MM_none)</script></option>
<option value="WEPOPEN"><script>dw("WEP")</script></option>
<!--
<option value="WPAPSK"><script>dw("WPA-PSK")</script></option>
<option value="WPA2PSK"><script>dw("WPA2-PSK")</script></option>
-->
<option value="WPAPSKWPA2PSK"><script>dw("WPA/WPA2-PSK")</script></option>
</select></td>
</tr>
</table>
<table id="div_wep" style="display:none" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr> 
<td class="thead"><script>dw(MM_key_type)</script>:</td>
<td><input name="wep_key" maxlength="26" value="<% getCfgGeneral(1, "Key1Str1"); %>"> <select name="WEPSelect" onChange="onWEPSelect()"> 
<option value="1"><script>dw(MM_ascii)</script></option>
<option value="0"><script>dw(MM_hex)</script></option>
</select></td>
</tr>
</table>

<table id="div_wpa" style="display:none" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr id="div_wpa_algorithms" style="display:none">
<td class="thead"><script>dw(MM_wpa_alg)</script>:</td>
<td><input name="cipher" value="TKIP" type="radio">TKIP
<input name="cipher" value="AES" type="radio" checked>AES
<input name="cipher" value="TKIPAES" type="radio">TKIP+AES</td>
</tr>
<tr id="wpa_passphrase" style="display:none">
<td class="thead"><script>dw(MM_passphrase)</script>:</td>
<td><input name="passphrase" maxlength="64" value="<% getCfgGeneral(1, "WPAPSK1"); %>"></td>
</tr>
<tr id="wpa_key_renewal_interval" style="display:none">
<td class="thead"><script>dw(MM_key_renewal_interval)</script>:</td>
<td><input name="keyRenewalInterval" size="6" maxlength="4" value="3600"> <script>dw(MM_seconds)</script></td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=submit class=button value="'+BT_apply+'" onClick="return formCheck()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>  

</td></tr></table>
</body></html>
