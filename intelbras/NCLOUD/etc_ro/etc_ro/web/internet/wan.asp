<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript" src="../js/ajax.js"></script>
<script language="javascript">
var http_request = false;
function macCloneMacFillSubmit()
{
    http_request = false;
    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
            http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    if (!http_request) {
        alert(JS_msg5);
        return false;
    }
    http_request.onreadystatechange = doFillMyMAC;
    http_request.open('POST', '/goform/getMyMAC', true);
    http_request.send('n\a');
}

function doFillMyMAC()
{
    if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			document.getElementById("macCloneMac").value = http_request.responseText;
		} else {
			//alert(JS_msg89);
		}
	}
}

function macCloneSwitch()
{
	if (document.wanCfg.macCloneEnbl.options.selectedIndex == 1)
		document.getElementById("macCloneMacRow").style.display = "";
	else
		document.getElementById("macCloneMacRow").style.display = "none";
}

function dnsSwitch()
{
	if (document.wanCfg.dnsmode.options.selectedIndex == 1){
		document.getElementById("dns1").style.display = "";
		document.getElementById("dns2").style.display = "";
	}
	else{
		document.getElementById("dns1").style.display = "none";
		document.getElementById("dns2").style.display = "none";
	}
}

function connectionTypeSwitch()
{
	document.getElementById("static").style.display = "none";
	document.getElementById("dhcp").style.display = "none";
	document.getElementById("pppoe").style.display = "none";
	document.getElementById("l2tp").style.display = "none";
	document.getElementById("pptp").style.display = "none";
	document.getElementById("3G").style.display = "none";
	enableTextField(document.wanCfg.dnsmode);
	var wanDNSMode = "<% getCfgGeneral(1, "wanDnsMode"); %>";
	document.wanCfg.dnsmode.options.selectedIndex = 1*wanDNSMode;	
	dnsSwitch();
	
	if (document.wanCfg.connectionType.value == "STATIC"){ 
		document.getElementById("static").style.display = "";
		disableTextField(document.wanCfg.dnsmode);
		document.wanCfg.dnsmode.options.selectedIndex = 1;
		dnsSwitch();
	}
	else if (document.wanCfg.connectionType.value == "DHCP") 
		document.getElementById("dhcp").style.display = "";
	else if (document.wanCfg.connectionType.value == "PPPOE") { 
		document.getElementById("pppoe").style.display = "";
		pppoeOPModeSwitch();
	} else if (document.wanCfg.connectionType.value == "L2TP") {
		document.getElementById("l2tp").style.display = "";
		var l2tpMode = "<% getCfgGeneral(1, "wan_l2tp_mode"); %>";
		document.wanCfg.l2tpMode.options.selectedIndex = 1*l2tpMode;
		
		l2tpModeSwitch();
		l2tpOPModeSwitch();
	} else if (document.wanCfg.connectionType.value == "PPTP") {
		document.getElementById("pptp").style.display = "";
		var pptpMode = "<% getCfgGeneral(1, "wan_pptp_mode"); %>";
		document.wanCfg.pptpMode.options.selectedIndex = 1*pptpMode;
		
		pptpModeSwitch();
		pptpOPModeSwitch();
	} else if (document.wanCfg.connectionType.value == "3G") {
		document.getElementById("3G").style.display = "";
		config3gTypeSwitch("<% getCfgGeneral(1, "dial3gchoicetype"); %>");
	}
}

function config3gTypeSwitch(value)
{
	if (value == "AUTO") {
		document.wanCfg.Config3G.options.selectedIndex=0;
		document.wanCfg.Dial3G.disabled = true;
		document.wanCfg.User3G.disabled = true;
		document.wanCfg.Password3G.disabled = true;
		document.wanCfg.APN3G.disabled = true;	
	} else if (value == "MANUAL") {
		document.wanCfg.Config3G.options.selectedIndex=1;
		document.wanCfg.Dial3G.disabled = false;
		document.wanCfg.User3G.disabled = false;
		document.wanCfg.Password3G.disabled = false;
		document.wanCfg.APN3G.disabled = false;
	}
}

function l2tpModeSwitch()
{
	if (document.wanCfg.l2tpMode.selectedIndex == 0) {
		document.getElementById("l2tpIp").style.display = "";
		document.getElementById("l2tpNetmask").style.display = "";
		document.getElementById("l2tpGateway").style.display = "";
	} else {
		document.getElementById("l2tpIp").style.display = "none";
		document.getElementById("l2tpNetmask").style.display = "none";
		document.getElementById("l2tpGateway").style.display = "none";
	}
}

function pptpModeSwitch()
{
	if (document.wanCfg.pptpMode.selectedIndex == 0) {
		document.getElementById("pptpIp").style.display = "";
		document.getElementById("pptpNetmask").style.display = "";
		document.getElementById("pptpGateway").style.display = "";
	} else {
		document.getElementById("pptpIp").style.display = "none";
		document.getElementById("pptpNetmask").style.display = "none";
		document.getElementById("pptpGateway").style.display = "none";
	}
}

var pppConnectStatus = 0;
function setPPPConnected()
{
   	pppConnectStatus = 1;
}

function pppConnectClick(connect)
{
	if (pppConnectStatus == connect) //1
		return true;
	return false;
}

function pppoeOPModeSwitch()
{
	document.getElementById("pppoe_redial_period").style.display = "none";
	document.getElementById("pppoe_manual").style.display = "none";	
	document.wanCfg.pppoeRedialPeriod.disabled = true;
	
	if (document.wanCfg.pppoeOPMode.options.selectedIndex == 0) {
		document.getElementById("pppoe_redial_period").style.display = "none";
		document.wanCfg.pppoeRedialPeriod.disabled = false;
	} else {
		document.getElementById("pppoe_manual").style.display = "";	
		if (pppConnectStatus == 0) {
			document.wanCfg.pppConnect.disabled = false;
			document.wanCfg.pppDisconnect.disabled = true;
		} else {
			document.wanCfg.pppConnect.disabled = true;
			document.wanCfg.pppDisconnect.disabled = false;
		}
	}	
}

function l2tpOPModeSwitch()
{
	document.getElementById("l2tp_redial_period").style.display = "none";
	document.wanCfg.l2tpRedialPeriod.disabled = true;
	
	if (document.wanCfg.l2tpOPMode.options.selectedIndex == 0) {	
		document.getElementById("l2tp_redial_period").style.display = "";
		document.wanCfg.l2tpRedialPeriod.disabled = false;
	}
}

function pptpOPModeSwitch()
{
	document.getElementById("pptp_redial_period").style.display = "none";
	document.wanCfg.pptpRedialPeriod.disabled = true;
	
	if (document.wanCfg.pptpOPMode.options.selectedIndex == 0) {
		document.getElementById("pptp_redial_period").style.display = "";
		document.wanCfg.pptpRedialPeriod.disabled = false;
	}
}

function formCheck()
{
	if (document.wanCfg.connectionType.selectedIndex == 0) { 
		if (!ipCheck(document.wanCfg.staticIp.value, MM_ipaddr)) 
			return false;

		if (document.wanCfg.staticIp.value == "<% getLanIp(); %>") {
			alert(JS_msg102);
			document.wanCfg.staticIp.focus();
			return false;		
		}
		
		if (!maskCheck(document.wanCfg.staticNetmask.value, MM_submask)) 
			return false;

		if (document.wanCfg.staticGateway.value == "")
		{
		   alert(JS_msg156);
		   return false;
		}
		else if (document.wanCfg.staticGateway.value != "") {
			if (!ipCheck(document.wanCfg.staticGateway.value, MM_default_gateway)) 
				return false;
				
			if (!subnetCheck(document.wanCfg.staticGateway.value, document.wanCfg.staticNetmask.value, document.wanCfg.staticIp.value)) {
				alert(JS_msg13);
				document.wanCfg.staticGateway.focus();
				return false;
			}
		}
		
		
		if (document.wanCfg.staticMtu.value == "")
		{
			alert(JS_msg209);
			document.wanCfg.staticMtu.focus();
			return false;
		}
		else if (!numberRangeCheck(document.wanCfg.staticMtu.value,1400, 1500, "MTU")) 
       			return false;
	} 
	else if (document.wanCfg.connectionType.selectedIndex == 1) { 
		if (document.wanCfg.hostname.value!= "") {
			if (!hostnameCheck(document.wanCfg.hostname.value, MM_hostname))
				return false;
		}
		
		if (document.wanCfg.dhcpMtu.value == "")
		{
			alert(JS_msg209);
			document.wanCfg.dhcpMtu.focus();
			return false;
		}
		else if (!numberRangeCheck(document.wanCfg.dhcpMtu.value, 1400, 1500, "MTU")) 
       			return false;
	} 
	else if (document.wanCfg.connectionType.selectedIndex == 2) { 
		if (!stringCheck(document.wanCfg.pppoeUser.value, MM_username)) 
			return false;
		
		if (!stringCheck(document.wanCfg.pppoePass.value, MM_password)) 
			return false;
		
		if (document.wanCfg.pppoeMtu.value == "")
		{
			alert(JS_msg209);
			document.wanCfg.pppoeMtu.focus();
			return false;
		}
		else if (!numberRangeCheck(document.wanCfg.pppoeMtu.value, 1400, 1492, "MTU")) 
       			return false; 
		
		if (document.wanCfg.pppoeOPMode.options.selectedIndex == 0) {
			if (!numberCheck(document.wanCfg.pppoeRedialPeriod.value, "PPPoE "+MM_redial_period)) 
				return false;
		}
	} 
	else if (document.wanCfg.connectionType.selectedIndex == 3) { 
	
		if (document.wanCfg.l2tpMode.selectedIndex == 0)
			if (!ipCheck(document.wanCfg.l2tpServer.value, "L2TP "+MM_server_ipaddr)) 
				return false;
				
		if (document.wanCfg.l2tpMode.selectedIndex == 1)	
			if (!ipUrlCheck(document.wanCfg.l2tpServer.value, "L2TP "+MM_server_ipaddr))	
				return false;
		
		if (!blankCheck(document.wanCfg.l2tpUser.value, "", JS_msg165)) 
			return false;
		
		if (!blankCheck(document.wanCfg.l2tpPass.value, "", JS_msg166)) 
			return false;

		if (document.wanCfg.l2tpMode.selectedIndex == 0) {
			if (!ipCheck(document.wanCfg.l2tpIp.value, MM_ipaddr)) 
				return false;
			
			if (!maskCheck(document.wanCfg.l2tpNetmask.value, MM_submask)) 
				return false;
			
			if (!ipCheck(document.wanCfg.l2tpGateway.value, MM_default_gateway)) 
				return false;
		}
		
		if (document.wanCfg.l2tpOPMode.selectedIndex == 0) {
			if (!numberCheck(document.wanCfg.l2tpRedialPeriod.value, "L2TP "+MM_redial_period)) 
				return false;
		}
	} 
	else if (document.wanCfg.connectionType.selectedIndex == 4) {
	
		if (document.wanCfg.pptpMode.selectedIndex == 0)
			if (!ipCheck(document.wanCfg.pptpServer.value, "PPTP "+MM_server_ipaddr)) 
				return false;
				
		if (document.wanCfg.pptpMode.selectedIndex == 1)
			if (!ipUrlCheck(document.wanCfg.pptpServer.value, "PPTP "+MM_server_ipaddr))	
				return false;
				
		if (!blankCheck(document.wanCfg.pptpUser.value, "", JS_msg165)) 
			return false;
		
		if (!blankCheck(document.wanCfg.pptpPass.value, "", JS_msg166)) 
			return false;

		if (document.wanCfg.pptpMode.selectedIndex == 0) {
			if (!ipCheck(document.wanCfg.pptpIp.value, MM_ipaddr)) 
				return false;
			
			if (!maskCheck(document.wanCfg.pptpNetmask.value, MM_submask)) 
				return false;
			
			if (!ipCheck(document.wanCfg.pptpGateway.value, MM_default_gateway)) 
				return false;
		}
		
		if (document.wanCfg.pptpOPMode.options.selectedIndex == 0) {
			if (!numberCheck(document.wanCfg.pptpRedialPeriod.value, "PPTP "+MM_redial_period)) 
				return false;
		}
	}

	if (document.wanCfg.dnsmode.options.selectedIndex == 1) {	//manual dns
		if (!ipCheck(document.wanCfg.staticPriDns.value, MM_pridns)) 
			return false; 
			
		if (document.wanCfg.staticSecDns.value != "") {
			if (!ipCheck(document.wanCfg.staticSecDns.value, MM_secdns)) 
				return false; 
		}
	}
		
	if (document.wanCfg.macCloneEnbl.options.selectedIndex == 1) {
		if (!macCheck(document.wanCfg.macCloneMac.value, MM_macaddr))  
			return false;
	}
	
	document.wanCfg.target="win78target";
	win78reload();
	return true;
}

function Load_Setting()
{
	var opmode = '<% getCfgZero(1, "OperationMode"); %>';
	var wan_mode = "<% getCfgGeneral(1, "wanConnectionMode"); %>";
	var l2tpMode = "<% getCfgGeneral(1, "wan_l2tp_mode"); %>";
	var pptpMode = "<% getCfgGeneral(1, "wan_pptp_mode"); %>";
	var clone_mode = '<% getCfgZero(1, "macCloneEnabled"); %>';
	var pptpb = <% getPPTPBuilt(); %>;
	var l2tpb = <% getL2TPBuilt(); %>;
	var dongle3gb = <% get3GBuilt(); %>;
	var pppoe_xkjs = <% getPppoeSpecBuilt(); %>;
	var pppoeConnectStatus = <% getInfo(1, "pppoeConnectStatus"); %>;
	
	var wan_dnsmode = "<% getCfgGeneral(1, "wanDnsMode"); %>";
	document.wanCfg.dnsmode.options.selectedIndex = 1*wan_dnsmode;	
	dnsSwitch();
	
	if (pppoeConnectStatus == 1)	
		setPPPConnected();
		
	if (pppoe_xkjs == 1)
		document.getElementById("pppoe_xkjs").style.display = "";
	else
		document.getElementById("pppoe_xkjs").style.display = "none";

	if (l2tpb == 1 && pptpb == 1 && dongle3gb == 1) {
		document.wanCfg.connectionType.options[3] = new Option("L2TP","L2TP",false, false);	
		document.wanCfg.connectionType.options[4] = new Option("PPTP","PPTP",false, false);
		document.wanCfg.connectionType.options[5] = new Option("3G","3G",false, false);
	} else if (l2tpb == 1 && pptpb == 0 && dongle3gb == 1) {
		document.wanCfg.connectionType.options[3] = new Option("L2TP","L2TP",false, false);	
		document.wanCfg.connectionType.options[4] = new Option("3G","3G",false, false);
	} else if (l2tpb == 0 && pptpb == 1 && dongle3gb == 1) {
		document.wanCfg.connectionType.options[3] = new Option("PPTP","PPTP",false, false);
		document.wanCfg.connectionType.options[4] = new Option("3G","3G",false, false);
	} else if (l2tpb == 1 && pptpb == 1) {
		document.wanCfg.connectionType.options[3] = new Option("L2TP","L2TP",false, false);	
		document.wanCfg.connectionType.options[4] = new Option("PPTP","PPTP",false, false);
	} else if (l2tpb == 1) {
		document.wanCfg.connectionType.options[3] = new Option("L2TP","L2TP",false, false);
	} else if (pptpb == 1) {
		document.wanCfg.connectionType.options[3] = new Option("PPTP","PPTP",false, false);
	} else if (dongle3gb == 1) {
		document.wanCfg.connectionType.options[3] = new Option("3G","3G",false, false);
	}
	
	if (wan_mode == "STATIC") {
		document.wanCfg.connectionType.value = "STATIC";
	} else if (wan_mode == "DHCP") {
		document.wanCfg.connectionType.value = "DHCP";
	} else if (wan_mode == "PPPOE") {
		var pppoe_opmode = "<% getCfgGeneral(1, "wan_pppoe_opmode"); %>";
		var pppoe_optime = "<% getCfgGeneral(1, "wan_pppoe_optime"); %>";
		var spec_type = "<% getCfgGeneral(1, "wan_pppoe_spectype"); %>";

		document.wanCfg.connectionType.value = "PPPOE";
		if (pppoe_opmode == "Manual") {
			document.wanCfg.pppoeOPMode.options.selectedIndex = 1;
		} else if (pppoe_opmode == "KeepAlive"){
			document.wanCfg.pppoeOPMode.options.selectedIndex = 0;
			if (pppoe_optime != "")
				document.wanCfg.pppoeRedialPeriod.value = pppoe_optime;
		}
		pppoeOPModeSwitch();		
		document.wanCfg.specType.options.selectedIndex = spec_type;
	} else if (wan_mode == "L2TP") {
		var l2tp_opmode = "<% getCfgGeneral(1, "wan_l2tp_opmode"); %>";
		var l2tp_optime = "<% getCfgGeneral(1, "wan_l2tp_optime"); %>";
		
		document.wanCfg.connectionType.value = "L2TP";
		document.wanCfg.l2tpMode.options.selectedIndex = 1*l2tpMode;
		l2tpModeSwitch();
		if (l2tp_opmode == "Manual"){
			document.wanCfg.l2tpOPMode.options.selectedIndex = 1;
		} else if (l2tp_opmode == "KeepAlive"){
			document.wanCfg.l2tpOPMode.options.selectedIndex = 0;
			if (l2tp_optime != "")
				document.wanCfg.l2tpRedialPeriod.value = l2tp_optime;
		}
		l2tpOPModeSwitch();
	} else if (wan_mode == "PPTP") {
		var pptp_opmode = "<% getCfgGeneral(1, "wan_pptp_opmode"); %>";
		var pptp_optime = "<% getCfgGeneral(1, "wan_pptp_optime"); %>";

		document.wanCfg.connectionType.value = "PPTP";
		document.wanCfg.pptpMode.options.selectedIndex = 1*pptpMode;
		pptpModeSwitch();
		if (pptp_opmode == "Manual"){
			document.wanCfg.pptpOPMode.options.selectedIndex = 1;
			if (pptp_optime != "")
				document.wanCfg.pptpIdleTime.value = pptp_optime;
		} else if (pptp_opmode == "KeepAlive"){
			document.wanCfg.pptpOPMode.options.selectedIndex = 0;
			if (pptp_optime != "")
				document.wanCfg.pptpRedialPeriod.value = pptp_optime;
		}
		pptpOPModeSwitch();
	} else if (wan_mode == "3G") 
		document.wanCfg.connectionType.value = "3G";
	
	connectionTypeSwitch();

	if (clone_mode == 1) {
		document.wanCfg.macCloneEnbl.options.selectedIndex = 1;
		document.wanCfg.macCloneMac.value = "<% getCfgGeneral(1, "macCloneMac"); %>";
	} else{
		document.wanCfg.macCloneEnbl.options.selectedIndex = 0;
		document.wanCfg.macCloneMac.value = "";
	}
	
	macCloneSwitch();
}
function resultFun(data)
{
	if(data=="" || data==null)
		win78reload();
	else
		window.location.href='/internet/wan.asp';
}

function errorFun(readyState,status)
{
	win78reload();
}

function win78reload()
{
	setTimeout(function(){Ajax.getInstance('/login.asp','',0,resultFun,errorFun);Ajax.get();},"5000");
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method=post name="wanCfg" action="/goform/setWan">
<input type="hidden" name="submit-url" value="/internet/wan.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_wan_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_connection)</script>:</td>
<td><select name="connectionType" onChange="connectionTypeSwitch();">
<option value="STATIC"><script>dw(MM_staticip)</script></option>
<option value="DHCP"><script>dw(MM_dhcp)</script></option>
<option value="PPPOE"><script>dw(MM_pppoe)</script></option>
</select></td>
</tr>
</table>

<table id="static" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_ipaddr)</script>:</td>
<td><input name="staticIp" maxlength=15 value="<% getCfgGeneral(1, "wan_ipaddr"); %>"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_submask)</script>:</td>
<td><input name="staticNetmask" maxlength=15 value="<% getCfgGeneral(1, "wan_netmask"); %>"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_default_gateway)</script></td>
<td><input name="staticGateway" maxlength=15 value="<% getCfgGeneral(1, "wan_gateway"); %>"></td>
</tr>
<tr>
  <td class="thead">MTU:</td>
  <td><input name="staticMtu" size="4" maxlength=4 value="<% getCfgGeneral(1, "wan_static_mtu"); %>"> (1400-1500)</td>
</tr>
</table>

<table id="dhcp" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_hostname)</script>:</td>
<td><input type=text name="hostname" maxlength=32 value="<% getCfgGeneral(1, "wan_dhcp_hn"); %>"> (<script>dw(MM_optional)</script>)</td>
</tr>
<tr>
  <td class="thead">MTU:</td>
  <td><input name="dhcpMtu" size="4" maxlength=4 value="<% getCfgGeneral(1, "wan_dhcp_mtu"); %>"> (1400-1500)</td>
</tr>
</table>

<table id="pppoe" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_username)</script>:</td>
<td><input name="pppoeUser" maxlength=32 value="<% getCfgGeneral(1, "wan_pppoe_user"); %>"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_password)</script>:</td>
<td><input type="password" name="pppoePass" maxlength=32 value="<% getCfgGeneral(1, "wan_pppoe_pass"); %>"></td>
</tr>
<tr style="display:none">
<td class="thead"><script>dw(MM_conpassword)</script>:</td>
<td><input type="password" name="pppoePass2" maxlength=32 value="<% getCfgGeneral(1, "wan_pppoe_pass"); %>"></td>
</tr>
<tr>
  <td class="thead">MTU:</td>
  <td><input name="pppoeMtu" size="4" maxlength=4 value="<% getCfgGeneral(1, "wan_pppoe_mtu"); %>"> (1400-1492)</td>
</tr>
<tr id="pppoe_xkjs" style="display:none">
<td class="thead"><script>dw(MM_spec_connection)</script>:</td>
<td><select name="specType">
<option value="0"><script>dw(MM_normal)</script></option>
<option value="1"><script>dw(MM_hunan_telecom)</script> 1</option>
<option value="2"><script>dw(MM_hunan_telecom)</script> 2</option>
<option value="3"><script>dw(MM_henan_netcom)</script></option>
</select></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_connect_mode)</script>:</td>
<td><select name="pppoeOPMode" onChange="pppoeOPModeSwitch()">
<option value="KeepAlive"><script>dw(MM_keep_alive)</script></option>
<option value="Manual"><script>dw(MM_manual)</script></option>
</select> 
<span id="pppoe_redial_period" style="display:none">
<script>dw(MM_redial_period)</script>
<input type="text" name="pppoeRedialPeriod" maxlength="5" size="3" value="60"><input type="hidden" name="pppoeIdleTime" maxlength="3" size="2" value="5">
<script>dw(MM_seconds)</script>
</span>

<span id="pppoe_manual" style="display:none">
<script>dw('<input type="submit" class="button" name="pppConnect" value="'+BT_connect+'" onClick="return pppConnectClick(0)"> <input type="submit" class="button" name="pppDisconnect" value="'+BT_disconnect+'" onClick="return pppConnectClick(1)">')</script>
</span>
</td>
</tr>
</table>

<table id="l2tp" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead">L2TP <script>dw(MM_server_ipaddr)</script>:</td>
<td><input name="l2tpServer" maxlength="15" value="<% getCfgGeneral(1, "wan_l2tp_server"); %>"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_username)</script>:</td>
<td><input name="l2tpUser" maxlength="20" value="<% getCfgGeneral(1, "wan_l2tp_user"); %>"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_password)</script>:</td>
<td><input type="password" name="l2tpPass" maxlength="32" value="<% getCfgGeneral(1, "wan_l2tp_pass"); %>"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_address_mode)</script>:</td>
<td><select name="l2tpMode" onChange="l2tpModeSwitch()">
<option value="0"><script>dw(MM_static)</script></option>
<option value="1"><script>dw(MM_dynamic)</script></option>
</select></td>
</tr>
<tr id="l2tpIp">
<td class="thead"><script>dw(MM_ipaddr)</script>:</td>
<td><input name="l2tpIp" maxlength=30 value="<% getCfgGeneral(1, "wan_l2tp_ip"); %>"></td>
</tr>
<tr id="l2tpNetmask">
<td class="thead"><script>dw(MM_submask)</script>:</td>
<td><input name="l2tpNetmask" maxlength=15 value="<% getCfgGeneral(1, "wan_l2tp_netmask"); %>"></td>
</tr>
<tr id="l2tpGateway">
<td class="thead"><script>dw(MM_default_gateway)</script></td>
<td><input name="l2tpGateway" maxlength=15 value="<% getCfgGeneral(1, "wan_l2tp_gateway"); %>"></td>
</tr>
<tr style="display:none">
<td class="thead"><script>dw(MM_connect_mode)</script>:</td>
<td><select name="l2tpOPMode" onChange="l2tpOPModeSwitch()">
<option value="KeepAlive"><script>dw(MM_keep_alive)</script></option>
</select>
<span id="l2tp_redial_period" style="display:none">
<script>dw(MM_redial_period)</script>
<input type="text" name="l2tpRedialPeriod" maxlength="5" size="3" value="60">
<script>dw(MM_seconds)</script>
</span></td>
</tr>
</table>

<table id="pptp" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead">PPTP <script>dw(MM_server_ipaddr)</script>:</td>
<td><input name="pptpServer" maxlength="30" value="<% getCfgGeneral(1, "wan_pptp_server"); %>"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_username)</script>:</td>
<td><input name="pptpUser" maxlength="20" value="<% getCfgGeneral(1, "wan_pptp_user"); %>"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_password)</script>:</td>
<td><input type="password" name="pptpPass" maxlength="32" value="<% getCfgGeneral(1, "wan_pptp_pass"); %>"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_address_mode)</script>:</td>
<td><select name="pptpMode" onChange="pptpModeSwitch()">
<option value="0"><script>dw(MM_static)</script></option>
<option value="1"><script>dw(MM_dynamic)</script></option>
</select></td>
</tr>
<tr id="pptpIp">
<td class="thead"><script>dw(MM_ipaddr)</script>:</td>
<td><input name="pptpIp" maxlength=15 value="<% getCfgGeneral(1, "wan_pptp_ip"); %>"></td>
</tr>
<tr id="pptpNetmask">
<td class="thead"><script>dw(MM_submask)</script>:</td>
<td><input name="pptpNetmask" maxlength=15 value="<% getCfgGeneral(1, "wan_pptp_netmask"); %>"></td>
</tr>
<tr id="pptpGateway">
<td class="thead"><script>dw(MM_default_gateway)</script></td>
<td><input name="pptpGateway" maxlength=15 value="<% getCfgGeneral(1, "wan_pptp_gateway"); %>"></td>
</tr>
<tr style="display:none">
<td class="thead"><script>dw(MM_connect_mode)</script>:</td>
<td><select name="pptpOPMode" onChange="pptpOPModeSwitch()">
<option value="KeepAlive"><script>dw(MM_keep_alive)</script></option>
</select>
<span id="pptp_redial_period" style="display:none">
<script>dw(MM_redial_period)</script>
<input type="text" name="pptpRedialPeriod" maxlength="5" size="3" value="60">
<script>dw(MM_seconds)</script>
</span></td>
</tr>
</table>

<table id="3G" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_3gnet_configmode)</script>:</td>
<td><select name="Config3G" onChange="config3gTypeSwitch(this.value);">
<option value="AUTO"><script>dw(MM_3gnet_autoconfig)</script></option>
<option value="MANUAL"><script>dw(MM_3gnet_manualconfig)</script></option>
</select></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_3gnet_dialnum)</script>:</td>
<td><input name="Dial3G" maxlength=128 value="<% getCfgGeneral(1, "dial3gnum"); %>"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_3gnet_username)</script>:</td>
<td><input name="User3G" maxlength=128 value="<% getCfgGeneral(1, "dial3gusername"); %>"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_3gnet_password)</script>:</td>
<td><input name="Password3G" maxlength=128 value="<% getCfgGeneral(1, "dial3gpassword"); %>"></td>
</tr>
<tr>
<td class="thead">APN:</td>
<td><input name="APN3G" maxlength=128 value="<% getCfgGeneral(1, "dial3gapn"); %>"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_3gnet_pin)</script>:</td>
<td><input name="PIN3G" maxlength=128 value="<% getCfgGeneral(1, "dial3gsimpin"); %>"></td>
</tr>
<tr>
</table>

<table style="display:none" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="title2" colspan="2"><script>dw(MM_clone_mac_settings)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_clone_mac)</script>:</td>
<td><select name="macCloneEnbl" onChange="macCloneSwitch()">
<option value="0"><script>dw(MM_disable)</script></option>
<option value="1"><script>dw(MM_enable)</script></option>
</select></td>
</tr>
<tr id="macCloneMacRow">
<td class="thead"><script>dw(MM_macaddr)</script>:</td>
<td><input name="macCloneMac" id="macCloneMac" maxlength=17 value=""> 
<script>dw('<input type="button" class=button3 value="'+BT_clone_mac+'" onClick="macCloneMacFillSubmit();">')</script></td>
</tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="title2" colspan="2"><script>dw(MM_dnsset)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_Dns_Mode)</script>:</td>
<td><select name="dnsmode" onChange="dnsSwitch()">
<option value="0"><script>dw(MM_keep_alive)</script></option>
<option value="1"><script>dw(MM_manual)</script></option>
</select></td>
<tr id=dns1>
<td class="thead"><script>dw(MM_pridns)</script>:</td>
<td><input name="staticPriDns" maxlength=15 value="<% getCfgGeneral(1, "wan_primary_dns"); %>"></td>
</tr>
<tr id=dns2>
<td class="thead"><script>dw(MM_secdns)</script>:</td>
<td><input name="staticSecDns" maxlength=15 value="<% getCfgGeneral(1, "wan_secondary_dns"); %>"> (<script>dw(MM_optional)</script>)</td>
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
<iframe id="win78iframe" class="hidden" name="win78target"></iframe>
</body></html>
