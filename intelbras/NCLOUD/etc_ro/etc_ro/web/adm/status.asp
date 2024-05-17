<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
function checkDate(str)
{
	var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var week = [MM_sun, MM_mon, MM_tue, MM_wed, MM_thu, MM_fri, MM_sat];
	
	if ((str.substring(4,5)) == " ")
		str = str.replace(" ","");
	else
		str = str;
	
	var t = str.split(" ");	
	for (var j=0; j<12; j++) {
		if (t[0] == month[j]) 
			t[0] = j + 1;
	}
	
	return t[2] + "-" + t[0] + "-" + t[1];
}

function Load_Setting()
{
	var usb_state = 1*'<% getInfo(1, "usbStatus"); %>';
	var opmode = '<% getCfgZero(1, "OperationMode"); %>';
	var wan_connect_mode = '<% getCfgGeneral(1, "wanConnectionMode"); %>';
	var wan_connect_status = <% getInfo(1, "wanConnectStatus"); %>;
	var dhcpEnb = '<% getCfgZero(1, "dhcpEnabled"); %>';
	var ddnsEnb = '<% getCfgZero(1, "DDNSEnabled"); %>';
	var ddnsProvider = '<% getCfgGeneral(1, "DDNSProvider"); %>';

	var wifi_off = '<% getCfgZero(1, "WiFiOff"); %>';
	var PhyMode  = '<% getCfgZero(1, "WirelessMode"); %>';
	var channel = "<% getCfgGeneral(1, "Channel"); %>";	
	
	var apclib = "<% getWlanApcliBuilt(); %>";
	var apcli_en = '<% getCfgZero(1, "apClient"); %>';
	var apcli_mode = '<% getCfgGeneral(1, "ApCliAuthMode"); %>';
	var apcli_enc = '<% getCfgGeneral(1, "ApCliEncrypType"); %>';
	
	var authenticationMode = '<% getCfgZero(1, "AuthMode"); %>';
	var encryptionType = '<% getCfgZero(1, "EncrypType"); %>';
	var ieee8021x = '<% getCfgZero(1, "IEEE8021X"); %>';
	
	var ieee8021xArray;
	var authenticationModeArray;
	var encryptionTypeArray;
	
	ieee8021xArray = ieee8021x.split(";");
	authenticationModeArray = authenticationMode.split(";");
	encryptionTypeArray = encryptionType.split(";");
	
	if (ieee8021xArray[0]==0 && authenticationModeArray[0]=="OPEN" && encryptionTypeArray[0]=="NONE")
		document.getElementById("security_mode").innerHTML = MM_disable;
	else if (ieee8021xArray[0]==0 && encryptionTypeArray[0]=="WEP")
		document.getElementById("security_mode").innerHTML = "WEP";
	else if (ieee8021xArray[0]==0 && (authenticationModeArray[0]=="WPAPSK" || authenticationModeArray[0]=="WPA2PSK" || authenticationModeArray[0]=="WPAPSKWPA2PSK"))
		document.getElementById("security_mode").innerHTML = "WPA/WPA2-PSK";
/*		
	else if (ieee8021xArray[0]==1 && authenticationModeArray[0]=="OPEN")
		document.getElementById("security_mode").innerHTML = "IEEE 802.1X";
	else if (ieee8021xArray[0]==0 && authenticationModeArray[0]=="WPAPSK")
		document.getElementById("security_mode").innerHTML = "WPA-PSK";
	else if (ieee8021xArray[0]==0 && authenticationModeArray[0]=="WPA2PSK")
		document.getElementById("security_mode").innerHTML = "WPA2-PSK";
	else if (ieee8021xArray[0]==0 && authenticationModeArray[0]=="WPAPSKWPA2PSK")
		document.getElementById("security_mode").innerHTML = "WPA/WPA2-PSK";
	else if (ieee8021xArray[0]==0 && authenticationModeArray[0]=="WPA")
		document.getElementById("security_mode").innerHTML = "WPA";
	else if (ieee8021xArray[0]==0 && authenticationModeArray[0]=="WPA2")
		document.getElementById("security_mode").innerHTML = "WPA2";
	else if (ieee8021xArray[0]==0 && authenticationModeArray[0]=="WPA1WPA2")
		document.getElementById("security_mode").innerHTML = "WPA/WPA2";
*/
	else
		document.getElementById("security_mode").innerHTML = MM_disable;
			
	if (wifi_off == 1)
		document.getElementById("wireless_status").innerHTML = MM_disable;
	else
		document.getElementById("wireless_status").innerHTML = MM_enable;
		
	if (PhyMode == 0)
		document.getElementById("network_mode").innerHTML = "2.4GHz (B+G)";
	else if (PhyMode == 1) 
		document.getElementById("network_mode").innerHTML = "2.4GHz (B)";	
	else if (PhyMode == 4)
		document.getElementById("network_mode").innerHTML = "2.4GHz (G)";
	else if (PhyMode == 6)
		document.getElementById("network_mode").innerHTML = "2.4GHz (N)";
	else if (PhyMode == 9)
		document.getElementById("network_mode").innerHTML = "2.4GHz (B+G+N)";
		
	if (opmode == 3 || (opmode == 0 && apclib == 1 && apcli_en == 1)) {
		document.getElementById("div_apclient_br").style.display = "";
		document.getElementById("div_apclient").style.display = "";
		document.getElementById("apcli_status").innerHTML = <% getInfo(1, "apcliStatus"); %>;
		
		if (apcli_mode == "OPEN" && apcli_enc == "NONE")
			document.getElementById("apcli_security_mode").innerHTML = MM_disable;//Disable
		else if (apcli_mode == "OPEN" && apcli_enc == "WEP")
			document.getElementById("apcli_security_mode").innerHTML = "WEP";//WEP
		else if (apcli_mode == "WPAPSK")
			document.getElementById("apcli_security_mode").innerHTML = "WPAPSK";//WPAPSK
		else if (apcli_mode == "WPA2PSK")
			document.getElementById("apcli_security_mode").innerHTML = "WPA2PSK";//WPA2PSK
		else
			document.getElementById("apcli_security_mode").innerHTML = MM_disable;//Disable
	} else{
		document.getElementById("div_apclient_br").style.display = "none";
		document.getElementById("div_apclient").style.display = "none";
		document.getElementById("apcli_status").innerHTML = MM_unknown;
	}

	if (wan_connect_mode == "STATIC")
		document.getElementById("wan_connect_mode").innerHTML = MM_staticip;
	else if (wan_connect_mode == "DHCP")
		document.getElementById("wan_connect_mode").innerHTML = MM_dhcp;
	else if (wan_connect_mode == "PPPOE")
		document.getElementById("wan_connect_mode").innerHTML = MM_pppoe;
	else if (wan_connect_mode == "PPTP")
		document.getElementById("wan_connect_mode").innerHTML = "PPTP";
	else if (wan_connect_mode == "L2TP")
		document.getElementById("wan_connect_mode").innerHTML = "L2TP";
	else if (wan_connect_mode == "3G")
		document.getElementById("wan_connect_mode").innerHTML = "3G";
		
	if (opmode == 0) {
		document.getElementById("div_wan_br").style.display = "none";
		document.getElementById("div_wan").style.display = "none";
	} else {
		document.getElementById("div_wan_br").style.display = "";
		document.getElementById("div_wan").style.display = "";
	}
	
	if (channel == 0) 
		document.getElementById("channel").innerHTML = MM_auto_select;
	else
		document.getElementById("channel").innerHTML = channel;
		
	if (wan_connect_mode == "STATIC" || wan_connect_mode == "3G") {
		document.getElementById("wan_ip").innerHTML = "<% getWanIp(); %>";
		document.getElementById("wan_netmask").innerHTML = "<% getWanNetmask(); %>";
		document.getElementById("wan_gateway").innerHTML = "<% getWanGateway(); %>";
		document.getElementById("wan_dns1").innerHTML = "<% getDns(1); %>";
		document.getElementById("wan_dns2").innerHTML = "<% getDns(2); %>";
	} else {
		if (wan_connect_status == MM_connect_no) {
			document.getElementById("wan_ip").innerHTML = "";
			document.getElementById("wan_netmask").innerHTML = "";
			document.getElementById("wan_gateway").innerHTML = "";
			document.getElementById("wan_dns1").innerHTML = "";
			document.getElementById("wan_dns2").innerHTML = "";
		} else {
			document.getElementById("wan_ip").innerHTML = "<% getWanIp(); %>";
			document.getElementById("wan_netmask").innerHTML = "<% getWanNetmask(); %>";
			document.getElementById("wan_gateway").innerHTML = "<% getWanGateway(); %>";
			document.getElementById("wan_dns1").innerHTML = "<% getDns(1); %>";
			document.getElementById("wan_dns2").innerHTML = "<% getDns(2); %>";
		}
	}
	
	if (dhcpEnb == 1)
		document.getElementById("dhcp_server").innerHTML = MM_enable;
	else
		document.getElementById("dhcp_server").innerHTML = MM_disable;

	if (ddnsEnb == 1) {
		document.getElementById("ddns_hostname").style.display = "none";
		document.getElementById("ddns_hostname2").style.display = "none";
		var ddnsip = "<% getDdnsip(); %>";
		
		if (ddnsProvider == "intelbras.com") {
			document.getElementById("ddns_hostname").style.display = "";
			document.getElementById("ddns_wanip").innerHTML = ddnsip;
		}
		else {
			document.getElementById("ddns_hostname2").style.display = "";
			document.getElementById("ddns_wanip2").innerHTML = ddnsip;
		}
	}
	else {
		document.getElementById("ddns_hostname").style.display = "none";
		document.getElementById("ddns_hostname2").style.display = "none";
	}
	
	if(usb_state == 1)
		document.getElementById("diskinfo").style.display = "";
	else
		document.getElementById("diskinfo").style.display = "none";

	//getWanIP();
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_sysstatus)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
  <td class="title2" colspan="2"><script>dw(MM_system)</script></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_current_firmware)</script>:</td>
  <td><% getSdkVersion(); %></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_firmware_date)</script>:</td>
  <td><script>dw(checkDate("<% getSysBuildTime(); %>"));</script></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_uptime)</script>:</td>
  <td><% getSysUptime(); %></td>
</tr>
<tr style="display:none">
  <td class="thead"><script>dw(MM_sys_platform)</script>:</td>
  <td><% getPlatform(); %></td>
</tr>
</table>

<br id="div_wan_br">
<table id="div_wan" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
  <td class="title2" colspan="2"><script>dw(MM_wan_iface)</script></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_connect_status)</script>:</td>
  <td><script>dw(<% getInfo(1, "wanConnectStatus"); %>)</script></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_connection)</script>:</td>
  <td><span id="wan_connect_mode"> </span> </td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_connect_time)</script>:</td>
  <td><% getConnUptime(); %> </td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_ipaddr)</script>:</td>
  <td><span id="wan_ip"> </span> </td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_submask)</script>:</td>
  <td><span id="wan_netmask"> </span> </td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_default_gateway)</script></td>
  <td><span id="wan_gateway"> </span> </td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_pridns)</script>:</td>
  <td><span id="wan_dns1"> </span> </td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_secdns)</script>:</td>
  <td><span id="wan_dns2"> </span> </td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_macaddr)</script>:</td>
  <td><% getWanMac(); %></td>
</tr>
<tr id="ddns_hostname">
  <td class="thead"><script>dw(MM_ddns_hostname)</script>:</td>
  <td><% getCfgGeneral(1, "DDNSHostname"); %>.ddns-intelbras.com.br (<span id="ddns_wanip"></span>)</td>
</tr>
<tr id="ddns_hostname2">
  <td class="thead"><script>dw(MM_ddns_hostname)</script>:</td>
  <td><% getCfgGeneral(1, "DDNS"); %>(<span id="ddns_wanip2"></span>)</td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
  <td class="title2" colspan="2"><script>dw(MM_wireless_iface)</script></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_wireless_status)</script>:</td>
  <td><span id="wireless_status"> </span> </td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_ssid)</script>:</td>
  <td><script>var ssid="<% getCfgToHTML(1, "SSID1"); %>";document.write(ssid.replace(eval("/ /gi"),'&nbsp;'))</script></td>
</tr>
<tr>
  <td class="thead">BSSID:</td>
  <td><% getWlanCurrentMac(); %></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_channel)</script>:</td>
  <td><span id="channel"> </span> </td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_network_mode)</script>:</td>
  <td><span id="network_mode"> </span> </td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_security_mode)</script>:</td>
  <td><span id="security_mode"> </span> </td>
</tr>
</table>

<br id="div_apclient_br">
<table id="div_apclient" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
  <td class="title2" colspan="2"><script>dw(MM_repeater_iface)</script></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_apcli_status)</script>:</td>
  <td><span id="apcli_status"> </span> </td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_ssid)</script>:</td>
  <td><% getCfgToHTML(1, "ApCliSsid"); %></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_channel)</script>:</td>
  <td><% getCfgGeneral(1, "Channel"); %></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_security_mode)</script>:</td>
  <td><span id="apcli_security_mode"> </span> </td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
  <td class="title2" colspan="2"><script>dw(MM_lan_iface)</script></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_ipaddr)</script>:</td>
  <td><% getLanIp(); %></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_submask)</script>:</td>
  <td><% getLanNetmask(); %></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_dhcp_server)</script>:</td>
  <td><span id="dhcp_server"> </span> </td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_macaddr)</script>:</td>
  <td><% getLanMac(); %></td>
</tr>
</table>
<div id="diskinfo">
<script language="javascript">
var usbinfo;
var mySplitResults;
document.write('<table width=700 border=0 cellpadding=3 cellspacing=3>');
document.write('<tr><td colspan=5><b>'+MM_dlna7+'</b></td></tr>');
usbinfo="<% getusbInfo(); %>";
document.write('<tr class=title4  align=center><td><b>'+MM_dlna2+'</b></td><td><b>'+MM_dlna3+'</b></td><td><b>'+MM_dlna4+'</b></td><td><b>'+MM_dlna5+'</b></td><td><b>'+MM_dlna6+'</b></td></tr>');
var usbinfo1 = usbinfo.split('#');
for(var i = 0;i<usbinfo1.length-1;++i)
{
mySplitResults=usbinfo1[i].split("?");
document.write('<tr align=center><td>'+mySplitResults[0]+'</a></td>');
document.write('<td>'+mySplitResults[1]+'</td><td>'+mySplitResults[2]+'</td><td>'+mySplitResults[3]+'</td><td>'+mySplitResults[4]+'</td></tr>');	
}
document.write('</table>');
</script>
</div>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
  <td class="title2" colspan="2"><script>dw(MM_memory_info)</script></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_memory_total)</script>:</td>
  <td> <% getMemTotalASP(); %></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_memory_left)</script>:</td>
  <td> <% getMemLeftASP(); %></td>
</tr>
</table>
<br><br>
</td></tr>
</table>
</body></html>
