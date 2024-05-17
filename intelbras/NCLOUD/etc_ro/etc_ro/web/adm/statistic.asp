<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
function Load_Setting()
{
	var opmode = 1* <% getCfgZero(1, "OperationMode"); %>;	
	var wifi_off = '<% getCfgZero(1, "WiFiOff"); %>';
			
	if (opmode == 0) {
		document.getElementById("div_wan_br").style.display = "none";
		document.getElementById("div_wan").style.display = "none";
	} else {
		document.getElementById("div_wan_br").style.display = "";
		document.getElementById("div_wan").style.display = "";
	}
	
	if (1*wifi_off == 1) {
		document.getElementById("div_wirless_br").style.display = "none";
		document.getElementById("div_wirless").style.display = "none";
	} else {	
		document.getElementById("div_wirless_br").style.display = "";
		document.getElementById("div_wirless").style.display = "";
	}
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_statistics)</script></td></tr>
<tr><td><hr></td></tr>
</table>

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

<br id="div_wan_br">
<table id="div_wan" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
  <td class="title2" colspan="2"><script>dw(MM_wan_iface)</script></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_rx_packets)</script>:</td>
  <td> <% getWANRxPacketASP(); %></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_tx_packets)</script>:</td>
  <td> <% getWANTxPacketASP(); %></td>
</tr>
</table>

<br id="div_wirless_br">
<table id="div_wirless" width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
  <td class="title2" colspan="2"><script>dw(MM_wireless_iface)</script></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_rx_packets)</script>:</td>
  <td> <% getApStats("RxSucc"); %></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_tx_packets)</script>:</td>
  <td> <% getApStats("TxSucc"); %></td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
  <td class="title2" colspan="2"><script>dw(MM_lan_iface)</script></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_rx_packets)</script>:</td>
  <td> <% getLANRxPacketASP(); %></td>
</tr>
<tr>
  <td class="thead"><script>dw(MM_tx_packets)</script>:</td>
  <td> <% getLANTxPacketASP(); %></td>
</tr>
</table>
<br><br>
</td></tr></table>
</body></html>
