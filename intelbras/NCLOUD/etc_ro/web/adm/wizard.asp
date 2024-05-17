<html>
<head>
<title><% getTitle(); %></title>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href="../<% getStyle(); %>" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript" src="../js/ajax.js"></script>
<script language="javascript">
function hiddAllDiv()
{
	document.getElementById("div_welcome").style.display = "none";
	document.getElementById("div_autocheck").style.display = "none";
	document.getElementById("div_autocheck_msg").style.display = "none";
	//document.getElementById("div_dhcp").style.display = "none";
	document.getElementById("div_pppoe").style.display = "none";	
	document.getElementById("div_staticip").style.display = "none";
	document.getElementById("div_wlan").style.display = "none";
	document.getElementById("div_admin").style.display = "none";
	document.getElementById("div_message").style.display = "none";	
	document.getElementById("div_finish_ok").style.display = "none";
}

function startClick()
{
	hiddAllDiv();
	document.getElementById("div_autocheck").style.display = "";
}

function advClick()
{
	pingSubmit();
}

function gotoUrlClick()
{
	hiddAllDiv();
	window.open("http://www.intelbras.com.br/arquivos/tutorial/INET/atalho/NCLOUD.exe", "newwindow", "height=550, width=700, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no"); 
	document.getElementById("div_message").style.display = "";
}

function gotoFinishClick()
{
	hiddAllDiv();
	document.getElementById("div_finish_ok").style.display = "";
}

var http_request=false;
var wizard_wan;
function connectAutoCheckSubmit()
{
	if(arguments.length==0){
		wizard_wan="DHCP";
	}
	if(arguments[0]=="PPPOE"){
		wizard_wan="PPPOE";
	}
    http_request = false;	
	hiddAllDiv();
	document.getElementById("div_autocheck_msg").style.display = "";
	//setTimeout('leavePage()', 1000);
	
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
    http_request.onreadystatechange = doFillCheckInfo;
    http_request.open('POST', '/goform/formConnectAutoCheck', true);
    http_request.setRequestHeader( 'submit-url','/adm/wizard.asp');
    http_request.send('wizard_mode='+wizard_wan);	
}

function doFillCheckInfo()
{
    if (http_request.readyState==4) {
		if (http_request.status==200) {
			var statinfo=http_request.responseText;
			if(statinfo=="linkN") {
				hiddAllDiv();
				alert(MM_wizard2);
				document.getElementById("div_autocheck").style.display = "";
			} else if(statinfo=="dhcpc") {
				hiddAllDiv();
				setTimeout("leavePage1()", 0);
				DhcpSubmit("dhcp");
			}else if(statinfo=="pppoe"){				
				hiddAllDiv();
				document.getElementById("div_pppoe").style.display = "";
				//return;
			}else{
				if(wizard_wan=="DHCP"){
					connectAutoCheckSubmit("PPPOE");
				}else{
					hiddAllDiv();
					document.getElementById("div_staticip").style.display = "";
					document.wizard_form.connectionType.selectedIndex = 0;
					connectionTypeSwitch();
				}
			}
		} 
	}
}

var xml = false;
function DhcpSubmit(value)
{
	xml = false;
	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		xml = new XMLHttpRequest();
		if (xml.overrideMimeType) {
			xml.overrideMimeType('text/xml');
		}
	} else if (window.ActiveXObject) { // IE
		try {
			xml = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xml = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	
	if (!xml) {
		alert(JS_msg5);
		return false;
	}
	
	xml.onreadystatechange = doChange;
	xml.open('POST', '/goform/setWizard', true);
	xml.send('wizard_mode='+value);
}

function pingSubmit()
{
	xml = false;
	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		xml = new XMLHttpRequest();
		if (xml.overrideMimeType) {
			xml.overrideMimeType('text/xml');
		}
	} else if (window.ActiveXObject) { // IE
		try {
			xml = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xml = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	
	if (!xml) {
		alert(JS_msg5);
		return false;
	}
	
	xml.onreadystatechange = doChange1;
	xml.open('POST', '/goform/setWizard_ping', true);
	xml.send("n/a");
}

function doChange()
{
    if (xml.readyState == 4){
		if (xml.status == 200){				
			//window.location.reload();	
			win78reload();
		}else{
			win78reload();
		}
	}
	//win78reload();
}

function doChange1()
{ 
	setTimeout('top.location.href = "../home.asp"', 1000);
}

function saveClick_staticIp()
{
	if (document.wizard_form.connectionType.selectedIndex == 0) {
		if (!ipCheck(document.wizard_form.staticIp.value, MM_ipaddr)) 
			return false;

		if (document.wizard_form.staticIp.value == "<% getLanIp(); %>") {
			alert(JS_msg102);
			document.wizard_form.staticIp.focus();
			return false;		
		}	
		
		if (!maskCheck(document.wizard_form.staticNetmask.value, MM_submask)) 
			return false;
		
		if (document.wizard_form.staticGateway.value != "") {
			if (!ipCheck(document.wizard_form.staticGateway.value, MM_default_gateway)) 
				return false;
				
			if (!subnetCheck(document.wizard_form.staticGateway.value, document.wizard_form.staticNetmask.value, document.wizard_form.staticIp.value)) {
				alert(JS_msg13);
				document.wizard_form.staticGateway.focus();
				return false;
			}
		}
		
		if (!ipCheck(document.wizard_form.staticPriDns.value, MM_pridns)) 
			return false; 
		
		if (document.wizard_form.staticSecDns.value != "") {
			if (!ipCheck(document.wizard_form.staticSecDns.value, MM_secdns)) 
				return false;
		}
	}
	else if (document.wizard_form.connectionType.selectedIndex == 2) {
		if (!stringCheck(document.wizard_form.pppoeUser2.value, MM_username)) 
			return false;
	
		if (!stringCheck(document.wizard_form.pppoePass2.value, MM_password)) 
			return false;
	}
	
	document.wizard_form.wizard_mode.value = "static";
	setTimeout("leavePage1()", 0);
	document.wizard_form.target="win78target";
	win78reload();
	return true;
}

function saveClick_dhcp()
{
	document.wizard_form.wizard_mode.value = "dhcp";
	setTimeout("leavePage1()", 0);
	
	document.wizard_form.target="win78target";
	win78reload();
	return true;
}
function leavePage1()
{
	hiddAllDiv();
	document.getElementById("div_autocheck_msg").style.display = "";
}
function saveClick_pppoe()
{
	if (!blankCheck(document.wizard_form.pppoeUser.value, "", JS_msg165)) 
		return false;
	
	if (!blankCheck(document.wizard_form.pppoePass.value, "", JS_msg166)) 
		return false;
		
	document.wizard_form.wizard_mode.value = "pppoe";
	setTimeout("leavePage1()", 0);
	
	document.wizard_form.target="win78target";
	win78reload();
	return true;
}
function ipConflictDeal()
{
	xml = false;
	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		xml = new XMLHttpRequest();
		if (xml.overrideMimeType) {
			xml.overrideMimeType('text/xml');
		}
	} else if (window.ActiveXObject) { // IE
		try {
			xml = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xml = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	
	if (!xml) {
		alert(JS_msg5);
		return false;
	}
	
	xml.onreadystatechange = doChange3;
	xml.open('POST', '/goform/networkInit', true);
	xml.send("n/a");
}
function doChange3(){}
function lanNetworkSucc(data){
	if(data=="" || data==null){
		lanNetworkProbe();
	}else{
		window.location.href='http://'+newLanIp+'/adm/wizard.asp';
	}
}
function lanNetworkErr(){
	lanNetworkProbe();
}
function lanNetworkProbe()
{	
	setTimeout(function(){Ajax.getInstance('http://'+newLanIp+'/login.asp','',0,lanNetworkSucc,lanNetworkErr);Ajax.get();},"5000");
}
function loadwizard(){
	var ifm=document.getElementById("wizardSetting");
    ifm.src="http://"+newLanIp+"/goWizard.htm?t="+(new Date()).valueOf();
	setTimeout(function(){loadwizard();},"5000");
}
var oldlanIP='<% getCfgGeneral(1, "lan_ipaddr"); %>';
var ipConflictf='<% getCfgGeneral(1, "ipConflictFlage"); %>';
var newLanIp="",waitetime=3000;
function resultFun(data)
{
	if(data=="" || data==null){
		win78reload();
	}else{
		newLanIp=data;
		if(data!=top.location.hostname){
			//设置IP冲突退避生效
			alert(JS_msg213+" "+newLanIp);
			document.getElementById("div_autocheck_msg").style.display = "none";
			document.getElementById("showNewIPaddr").innerHTML=newLanIp;
			document.getElementById("div_ipConflict_msg").style.display = "";
			ipConflictDeal();
			waitetime=8000;
		}
		//setTimeout(function(){window.location.href='http://'+newLanIp+'/adm/wizard.asp';},waitetime);
		setTimeout(function(){loadwizard();},"3000");
	}
}

function errorFun(readyState,status)
{
	win78reload();
}

function win78reload()
{	
	setTimeout(function(){Ajax.getInstance('/goform/getLanIpaddr','',0,resultFun,errorFun);Ajax.get();},"5000");
}

function updateWanType()
{
	hiddAllDiv();	
	if (document.wizard_form.connectionType.options.selectedIndex == 0) 
		document.getElementById("div_staticip").style.display = "";
	else if (document.wizard_form.connectionType.options.selectedIndex == 1) 
		document.getElementById("div_wlan").style.display = "";
	else if (document.wizard_form.connectionType.options.selectedIndex == 2) 
		document.getElementById("div_pppoe").style.display = "";
}

function saveChanges_wlan()
{
	if (!ssidCheck(document.wizard_form.ssid.value)) 
		return false;
	
	var keyvalue = document.wizard_form.security_key.value;
	if (keyvalue.length < 8){
		alert(JS_msg17);
		document.wizard_form.security_key.focus();
		return false;
	}
		
	if (!stringCheck(document.wizard_form.security_key.value, MM_password))
		return false;
		
	return true;
}

function saveClick_wlan()
{
	if (saveChanges_wlan()){
		hiddAllDiv();
		document.getElementById("div_admin").style.display = "";
	}
	else
		return false;
}

function saveChanges_admin()
{
	if (!blankUserCheck(document.wizard_form.admuser.value, JS_msg165))  
		return false;
	if (!checkStringValue2(document.wizard_form.admuser.value)) {
		alert(JS_msg188);
		return false;
	}	
	if (!blankUserCheck(document.wizard_form.admpass.value, JS_msg166))  
		return false;
	if (!checkStringValue2(document.wizard_form.admpass.value, "", JS_msg166)) {
		alert(JS_msg189);
		return false;
	}
	
	return true;
}

function saveClick_admin()
{
	if (saveChanges_admin()) {
		hiddAllDiv();
		document.getElementById("div_message").style.display = "";
	}
	else
		return false;
}

function finishClick()
{
	document.wizard_form.wizard_mode.value = "finish";
	return true;
}

function connectionTypeSwitch()
{
	document.getElementById("static_ip").style.display = "none";
	document.getElementById("static_mask").style.display = "none";
	document.getElementById("static_gw").style.display = "none";
	document.getElementById("static_dns1").style.display = "none";
	document.getElementById("static_dns2").style.display = "none";
	document.getElementById("pppoe_user").style.display = "none";
	document.getElementById("pppoe_pass").style.display = "none";

	if (document.wizard_form.connectionType.selectedIndex==0) {
		document.getElementById("static_ip").style.display = "";
		document.getElementById("static_mask").style.display = "";
		document.getElementById("static_gw").style.display = "";
		document.getElementById("static_dns1").style.display = "";
		document.getElementById("static_dns2").style.display = "";
	}
	else if (document.wizard_form.connectionType.selectedIndex==2) {
		document.getElementById("pppoe_user").style.display = "";
		document.getElementById("pppoe_pass").style.display = "";
	}
}
function restartWizatd()
{
	xml = false;
	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		xml = new XMLHttpRequest();
		if (xml.overrideMimeType) {
			xml.overrideMimeType('text/xml');
		}
	} else if (window.ActiveXObject) { // IE
		try {
			xml = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xml = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	
	if (!xml) {
		alert(JS_msg5);
		return false;
	}
	
	xml.onreadystatechange = doChange2;
	xml.open('POST', '/goform/setWizard_ping', true);
	xml.send("n/a");
}
function doChange2(){
    if (xml.readyState == 4){
		if (xml.status == 200){				
			var ipConflict = '<% getCfgZero(1, "ipConflictFlage"); %>';
			if(ipConflict){
//				alert(JS_msg213+" "+lanIP);
//				document.getElementById("div_autocheck_msg").style.display = "none";
//				document.getElementById("div_ipConflict_msg").style.display = "";
			}
			//window.location.href="/adm/wizard.asp";
			setTimeout(function(){window.location.href="/adm/wizard.asp";},"3000");
		}
	}
}

var lanIP='<% getCfgGeneral(1, "lan_ipaddr"); %>';
function Load_Setting()
{
	var flag = '<% getCfgGeneral(1, "wizard_mode"); %>';
	var ping = '<% getCfgZero(1, "ping_flag"); %>';
	var ipConflict = '<% getCfgZero(1, "ipConflictFlage"); %>';
	if (flag == "dhcp" || flag == "pppoe" || flag == "static") {
		hiddAllDiv();
		if(ipConflict==1){
			//document.getElementById("div_autocheck_msg").style.display = "";
			document.getElementById("div_ipConflict_msg").style.display = "";
			setTimeout('restartWizatd()', 350);
		}else{
			if (ping == 1)
				document.getElementById("div_wlan").style.display = "";
			else {
				if(flag == "dhcp"){//have dhcp but no internet
					connectAutoCheckSubmit("PPPOE");
				}else{
					alert(JS_msg158);
					document.getElementById("div_welcome").style.display = "";
				}
			}
		}
	}
	else {
		hiddAllDiv();
		document.getElementById("div_welcome").style.display = "";
	}	
}
</script>
</head>
 
<body onLoad="Load_Setting()" bgcolor="#f8f8f8">
<table width=750 height=360 align=center border=0 cellspacing=0 cellpadding=0 style="border:1px solid #d9dadb; background-color:#ffffff">
<tr><td valign=top>
<table width=750 border=0 cellpadding=0 cellspacing=0>
<tr><td class=top_left>&nbsp;</td>
<td class=top_right align=right><table width=370 border=0 cellpadding=0 cellspacing=0>
<tr class=top_wizard>
<td align=right><b><script>dw(MM_easywizard)</script></b></td>
<td width=100>&nbsp;</td></tr>
</table></td></tr>
</table>

<table id="div_welcome" width=750 height=500 border=0 cellpadding=0 cellspacing=0>
<tr><td height=20></td></tr>
<tr><td height=50 align=center class=tcenter><script>dw(MM_wizard1)</script></td></tr>
<tr><td height=50></td></tr>
<tr><td height=300 align=center><img src="../nbox/first_page.png" height="300"></td></tr>
<tr><td height=10></td></tr>
<tr><td height=50><table width=750 border=0 cellpadding=0 cellspacing=0>
<tr><td width=100>&nbsp;</td>
<td align=center><script>dw('<input type="button" class="button3" id="adv1" value="'+BT_advanced+'" onClick="advClick()">')</script></td>
<td width=100>&nbsp;</td>
<td align=center><script>dw('<input type="button" class="button" value="'+BT_go+'" onClick="startClick()">')</script></td>
<td width=100>&nbsp;</td></tr>
</table></td></tr>
<tr><td height=20></td></tr>
</table>

<table id="div_autocheck" style="display:none" width=750 height=500 border=0 cellpadding=0 cellspacing=0>
<tr valign=top><td><table width=750 height=420 border=0 cellpadding=0 cellspacing=0>
<tr><td width=30 bgcolor="f6f6f6" valign=top>&nbsp;</td>
<td width=220 bgcolor="f6f6f6" class=tcenter valign=top><br><br><script>dw(MM_wizard3)</script></td>
<td align="center"><img src="../nbox/wan_cable.png"></td></tr>
</table></tr>
<tr><td height=10></td></tr>
<tr><td height=50><table width=750 border=0 cellpadding=0 cellspacing=0>
<tr><td width=100>&nbsp;</td>
<td align=center><script>dw('<input type="button" class="button3" id="adv2" value="'+BT_advanced+'" onClick="advClick()">')</script></td>
<td width=100>&nbsp;</td>
<td align=center><script>dw('<input type="button" class="button" value="'+BT_go+'" onClick="connectAutoCheckSubmit()">')</script></td>
<td width=100>&nbsp;</td></tr>
</table></td></tr>
<tr><td height=20></td></tr>
</table>

<table id="div_autocheck_msg" style="display:none" width=750 height=250 border=0 cellpadding=0 cellspacing=0>
<tr><td height=20></td></tr>
<tr><td height=50 align=center class=tcenter><script>dw(MM_wizard4)</script></td></tr>
<tr><td height=50 align=center><img src="../nbox/loading.gif" height="50"></td></tr>
<tr><td height=380></td></tr>
</table>

<table id="div_ipConflict_msg" style="display:none" width=750 height=250 border=0 cellpadding=0 cellspacing=0>
<tr><td height=20></td></tr>
<tr><td height=50 align=center class=tcenter><script>dw(JS_msg214)</script></td></tr>
<tr><td height=50 align=center><img src="../nbox/loading.gif" height="50"></td></tr>
<tr><td height=50><div style="width:500px;margin:0 auto;font-weight:bold;"><script>dw(JS_msg215)</script><label id="showNewIPaddr"><script>dw(lanIP)</script></label>,&nbsp;<script>dw(JS_msg216)</script></div></td></tr>
<tr><td height=380></td></tr>
</table>

<form method=post name="wizard_form" action="/goform/setWizard">
<input type="hidden" name="submit-url" value="/adm/wizard.asp">
<input type="hidden" name="wizard_mode" value="0">
<table id="div_dhcp" style="display:none" width=750 height=300 border=0 cellpadding=0 cellspacing=0>
<tr><td height=20></td></tr>
<tr><td height=50 align=center class=tcenter>Configure your network parameter (DHCP Client)</td></tr>
<tr><td height=20></td></tr>
<tr><td height=50 align=center>Is DHCP Client type.</td></tr>
<tr><td height=70></td></tr>
<tr><td height=50><table width=750 border=0 cellpadding=0 cellspacing=0>
<tr><td width=100>&nbsp;</td>
<td align=center><script>dw('<input type="button" class="button3" id="adv3" value="'+BT_advanced+'" onClick="advClick()">')</script></td>
<td width=100>&nbsp;</td>
<td align=center><script>dw('<input type="submit" class="button" value="'+BT_go+'" onClick="return saveClick_dhcp()">')</script></td>
<td width=100>&nbsp;</td></tr>
</table></td></tr>
<tr><td height=40></td></tr>
</table>

<table id="div_pppoe" style="display:none" width=750 height=300 border=0 cellpadding=0 cellspacing=0>
<tr><td height=20></td></tr>
<tr><td height=50 align=center class=tcenter><script>dw(MM_wizard6)</script></td></tr>
<tr><td height=160 valign=top><table width=750 border=0 cellpadding=0 cellspacing=0>
<tr><td width=220>&nbsp;</td>
<td width=350 bgcolor="f6f6f6" align=center><table class=tt width=310 border=0 cellspacing=3 cellpadding=1>
<tr><td colspan=2>&nbsp;</td></tr>
<tr><td class=thead4><script>dw(MM_username)</script>:</td>
<td><input type="text" name="pppoeUser" maxlength=32></td></tr>
<tr><td class=thead4><script>dw(MM_password)</script>:</td>
<td><input type="text" name="pppoePass" maxlength=32></td></tr>
<tr><td colspan=2>&nbsp;</td></tr>
</table></td>
<td width=220>&nbsp;</td></tr>
</table></td></tr>

<tr><td height=50><table width=750 border=0 cellpadding=0 cellspacing=0>
<tr><td width=100>&nbsp;</td>
<td align=center><script>dw('<input type="button" class="button3" id="adv4" value="'+BT_advanced+'" onClick="advClick()">')</script></td>
<td width=100>&nbsp;</td>
<td align=center><script>dw('<input type="submit" class="button" value="'+BT_go+'" onClick="return saveClick_pppoe()">')</script></td>
<td width=100>&nbsp;</td></tr>
</table></td></tr>
<tr><td height=20></td></tr>
</table>

<table id="div_staticip" style="display:none" width=750 height=300 border=0 cellpadding=0 cellspacing=0>
<tr><td height=20></td></tr>
<tr><td height=50 align=center class=tcenter><script>dw(MM_wizard7)</script></td></tr>
<tr><td height=160 valign=top><table width=750 border=0 cellpadding=0 cellspacing=0>
<tr><td width=220>&nbsp;</td>
<td width=350 bgcolor="f6f6f6" align=center><table width=310 class=tt border=0 cellspacing=3 cellpadding=1>
<tr><td colspan=2>&nbsp;</td></tr>
<tr><td class=thead3><script>dw(MM_connection)</script>:</td>
<td><select name="connectionType" onChange="connectionTypeSwitch()">
<option value="STATIC"><script>dw(MM_staticip)</script></option>
<option value="DHCP"><script>dw(MM_dhcp)</script></option>
<option value="PPPOE"><script>dw(MM_pppoe)</script></option>
</select></td></tr>
<tr id="static_ip"><td class=thead3><script>dw(MM_ipaddr)</script>:</td>
<td ><input type="text" name="staticIp" maxlength=15></td></tr>
<tr id="static_mask"><td class=thead3><script>dw(MM_submask)</script>:</td>
<td><input type="text" name="staticNetmask" maxlength=15></td></tr>
<tr id="static_gw"><td class=thead3><script>dw(MM_default_gateway)</script>:</td>
<td><input type="text" name="staticGateway" maxlength=15></td></tr>
<tr id="static_dns1"><td class=thead3><script>dw(MM_pridns)</script>:</td>
<td><input type="text" name="staticPriDns" maxlength=15></td></tr>
<tr id="static_dns2"><td class=thead3><script>dw(MM_secdns)</script>:</td>
<td><input type="text" name="staticSecDns" maxlength=15></td></tr>
<tr id="pppoe_user" style="display:none"><td class=thead3><script>dw(MM_username)</script>:</td>
<td><input type="text" name="pppoeUser2" maxlength=32></td></tr>
<tr id="pppoe_pass" style="display:none"><td class=thead3><script>dw(MM_password)</script>:</td>
<td><input type="text" name="pppoePass2" maxlength=32></td></tr>
<tr><td colspan=2>&nbsp;</td></tr>
</table></td>
<td width=220>&nbsp;</td></tr>
</table></td></tr>

<tr><td height=50><table width=750 border=0 cellpadding=0 cellspacing=0>
<tr><td width=100>&nbsp;</td>
<td align=center><script>dw('<input type="button" class="button3" id="adv5" value="'+BT_advanced+'" onClick="advClick()">')</script></td>
<td width=100>&nbsp;</td>
<td align=center><script>dw('<input type="submit" class="button" value="'+BT_go+'" onClick="return saveClick_staticIp()">')</script></td>
<td width=100>&nbsp;</td></tr>
</table></td></tr>
<tr><td height=20></td></tr>
</table>

<table id="div_wlan" style="display:none" width=750 height=300 border=0 cellpadding=0 cellspacing=0>
<tr><td height=20></td></tr>
<tr><td height=50 align=center class=tcenter><script>dw(MM_wizard8)</script></td></tr>
<tr><td height=160 valign=top><table width=750 border=0 cellpadding=0 cellspacing=0>
<tr><td width=220>&nbsp;</td>
<td width=350 bgcolor="f6f6f6" align=center><table width=310 border=0 cellspacing=3 cellpadding=1>
<tr><td colspan=2>&nbsp;</td></tr>
<tr><td class=thead4><script>dw(MM_ssid)</script>:</td>
<td><input type="text" name="ssid" maxlength=32 value="<% getCfgGeneral(1, "SSID1"); %>"></td></tr>
<tr><td class=thead4><script>dw(MM_password)</script>:</td>
<td><input type="text" name="security_key" maxlength=63></td></tr>
<tr><td colspan=2>&nbsp;</td></tr>
</table></td>
<td width=220>&nbsp;</td></tr>
</table></td></tr>
<tr><td height=50><table width=750 border=0 cellpadding=0 cellspacing=0>
<tr><td width=100>&nbsp;</td>
<td align=center><script>dw('<input type="button" class="button3" id="adv6" value="'+BT_advanced+'" onClick="advClick()">')</script></td>
<td width=100>&nbsp;</td>
<td align=center><script>dw('<input type="button" class="button" id="go6" value="'+BT_go+'" onClick="saveClick_wlan()">')</script></td>
<td width=100>&nbsp;</td></tr>
</table></td></tr>
<tr><td height=20></td></tr>
</table>

<table id="div_admin" style="display:none" width=750 height=300 border=0 cellpadding=0 cellspacing=0> 
<tr><td height=20></td></tr>
<tr><td height=50 align=center class=tcenter><script>dw(MM_wizard9)</script></td></tr>
<tr><td height=160 valign=top><table width=750 border=0 cellpadding=0 cellspacing=0>
<tr><td width=220>&nbsp;</td>
<td width=350 bgcolor="f6f6f6" align=center><table width=310 class=tt border=0 cellspacing=3 cellpadding=1>
<tr><td colspan=2>&nbsp;</td></tr>
<tr><td class=thead4><script>dw(MM_username)</script>:</td>
<td><input type="text" name="admuser" maxlength=16></td></tr>
<tr><td class=thead4><script>dw(MM_password)</script>:</td>
<td><input type="text" name="admpass" maxlength=16></td></tr>
<tr><td colspan=2>&nbsp;</td></tr>
</table></td>
<td width=220>&nbsp;</td></tr>
</table></td></tr>
<tr><td height=50><table width=750 border=0 cellpadding=0 cellspacing=0>
<tr><td width=100>&nbsp;</td>
<td align=center><script>dw('<input type="button" class="button3" id="adv7" value="'+BT_advanced+'" onClick="advClick()">')</script></td>
<td width=100>&nbsp;</td>
<td align=center><script>dw('<input type="button" class="button" value="'+BT_go+'" onClick="saveClick_admin()">')</script></td>
<td width=100>&nbsp;</td></tr>
</table></td></tr>
<tr><td height=20></td></tr>
</table>

<table id="div_message" style="display:none" width=750 height=300 border=0 cellpadding=0 cellspacing=0> 
<tr><td height=20></td></tr>
<tr><td height=50 align=center class=tcenter><script>dw(MM_wizard10)</script></td></tr>
<tr><td height=160 valign=top><table width=750 border=0 cellpadding=0 cellspacing=0>
<tr><td width=220>&nbsp;</td>
<td width=350 bgcolor="f6f6f6" align=center><table width=310 border=0 cellspacing=3 cellpadding=1>
<tr><td>&nbsp;</td></tr>
<tr><td><script>dw(MM_wizard11)</script></td></tr>
<tr><td height=20></td></tr>
<tr><td align=center><script>dw('<input type="button" class="button5" value="'+BT_yes+'" onClick="gotoUrlClick()">&nbsp;&nbsp;\
<input type="button" class="button5" value="'+BT_no+'" onClick="gotoFinishClick()">')</script></td></tr>
<tr><td>&nbsp;</td></tr>
</table></td>
<td width=220></td>&nbsp;</tr>
</table></td></tr>
<tr><td height=20></td></tr>
</table>

<table id="div_finish_ok" style="display:none" width=750 height=250 border=0 cellpadding=0 cellspacing=0>
<tr><td height=50></td></tr>
<tr><td height=50 align=center class=tcenter><script>dw(MM_wizard12)</script></td></tr>
<tr><td height=50 align=center><img src="../nbox/sucesso.png" height="50"></td></tr>
<tr><td height=50></td></tr>
<tr><td height=50><table width=750 border=0 cellpadding=0 cellspacing=0>
<tr><td width=100>&nbsp;</td>
<td align=center><script>dw('<input type="submit" class="button" value="'+BT_apply+'" onClick="return finishClick()">')</script></td>
<td width=100>&nbsp;</td></tr>
</table></td></tr>
</table>
</form>

</td></tr></table>
<iframe id="win78iframe" class="hidden" name="win78target"></iframe>
<form method=post name="wizardSubmit" action=""></form>
<iframe name="wizardSetting" id="wizardSetting" style="display:none;"></iframe>
</body></html>