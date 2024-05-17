<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var opmode = "<% getCfgZero(1, "OperationMode"); %>";
var lanIP = "<% getLanIp(); %>";
var lanMask = '<% getLanNetmask(); %>';
var wanIP = "<% getWanIp(); %>";
var wanMask = '<% getWanNetmask(); %>';
var destination = new Array();
var gateway = new Array();
var netmask = new Array();
var flags = new Array();
var metric = new Array();
var ref = new Array();
var use = new Array();
var true_interface = new Array();
var category = new Array();
var interface = new Array();
//var idle = new Array();
var comment = new Array();
var entries = new Array();
var all_str = <% getRoutingTable(); %>;
entries = all_str.split(";");
var currNetworkSeg="";
function zip( a, b, c, d)
{
   //attention, '*16777216' is equal to '<<24', but here must be  '*16777216'
   var  re = 0;
   re=(Number(a)*16777216)+(Number(b)<<16)+(Number(c)<<8)+(Number(d));
    return re;
}

function unzip(zipc)
{
	var var1=Math.floor(Number(zipc/16777216));
	var remainder1=Number(zipc%16777216);
	var var2=Math.floor(remainder1/65536);
	var remainder2=Math.floor(remainder1%65536);
	var var3=Math.floor(remainder2/256);
	var var4=Math.floor(remainder2%256);
	
	return var1+'.'+ var2 +'.'+ var3 +'.'+ var4;
}
function networkSeg( IP,mask)
{
	var ip1=Math.floor(IP/4);
	var ip2=Number(IP%4);

	var mask1=Math.floor(mask/4);
	var mask2=Number(mask%4);

	var network=Number(ip1&mask1)*4+Number(ip2&mask2);//3221225472
	var firstIPAdd = network+1+1;
	
	return unzip(network);
}
function IpMaskConfilict(ulIp, ulHostMask)
{
	var ip1=Math.floor(ulIp/4);
	var ip2=Number(ulIp%4);

	var mask1=Math.floor(~ulHostMask/4);
	var mask2=Number(~ulHostMask%4);

	var network=Number(ip1&mask1)*4+Number(ip2&mask2);//3221225472
	if ( network == 0 || network== ~ulHostMask )
	{
//		alert(JS_127);
//		return 1;
	}  
	
	return 0;
}

function deleteClick()
{
	return true;
}

function formCheck()
{
	var ip=document.addrouting.dest.value;
	var mask=document.addrouting.netmask.value;
	
	if (document.addrouting.dest.value == lanIP) {
		alert(JS_msg102);
		return false;
	}
	
	if (document.addrouting.dest.value == wanIP) {
		alert(JS_msg103);
		return false;
	}
	
	if (document.addrouting.hostnet.selectedIndex == 1) {  
		if (!maskCheck(document.addrouting.netmask.value, MM_submask)) 
			return false; 
		if(IpMaskConfilict(zip(ip.split(".")[0], ip.split(".")[1], ip.split(".")[2], ip.split(".")[3]),zip(mask.split(".")[0],mask.split(".")[1],mask.split(".")[2],mask.split(".")[3])))
			return false;
		currNetworkSeg=networkSeg(zip(ip.split(".")[0], ip.split(".")[1], ip.split(".")[2], ip.split(".")[3]),zip(mask.split(".")[0],mask.split(".")[1],mask.split(".")[2],mask.split(".")[3]))
		if (!checkIpMask(document.addrouting.dest.value, MM_destip)) 
			return false; 
		document.addrouting.dest.value=currNetworkSeg;
	}else{
		if (!ipCheck(document.addrouting.dest.value, MM_destip)) 
			return false; 
	}

	if (!ipCheck(document.addrouting.gateway.value, MM_gateway_address)) 
		return false; 
		
	if (document.addrouting.interface.selectedIndex == 1) {	
		if (!subnetCheck(document.addrouting.gateway.value, wanMask, wanIP)) {
			alert(JS_msg149);
			document.addrouting.gateway.focus();
			return false;
		}	
	}
	else {
		if (!subnetCheck(document.addrouting.gateway.value, lanMask, lanIP)) {
			alert(JS_msg20);
			document.addrouting.gateway.focus();
			return false;
		}
	}
	
	var p = all_str.split(";");
	for(var i=0; i<p.length; i++){
		v = p[i].split(",");
		if (document.addrouting.dest.value==v[1])	{
			alert(JS_msg9);
			return false;
		}
	}
	
	return true;
}

function Load_Setting()
{
	document.getElementById("netmask").style.display = "none";
	document.addrouting.hostnet.selectedIndex = 0;
	document.addrouting.netmask.readOnly = true;
	document.addrouting.gateway.value = lanIP;
	document.addrouting.interface.selectedIndex = 0;
	document.addrouting.custom_interface.value = "";
	document.addrouting.custom_interface.readOnly = true;
	
	var i, j=0;	
	for (i=0; i<entries.length; i++){
		var one_entry = entries[i].split(",");
		category[i] = parseInt(one_entry[8]);
	}

	for (i=0; i<entries.length; i++){
		if (category[i] > -1)  j++;
	}
	
	if (j==0){
		document.delRouting.deleteSelRouter.disabled = true;
 		document.delRouting.reset.disabled = true;
	} else{
		document.delRouting.deleteSelRouter.disabled = false;
 		document.delRouting.reset.disabled = false;
	}
}

function hostChange()
{
	if (document.addrouting.hostnet.selectedIndex == 1) {
		document.getElementById("netmask").style.display = "";
		document.addrouting.netmask.value = "255.255.255.0";
		document.addrouting.netmask.readOnly = false;
	} else {
		document.getElementById("netmask").style.display = "none";
		document.addrouting.netmask.value = "";
		document.addrouting.netmask.readOnly = true;
	}
}

function interfaceChange()
{	
	wanip_tmp = wanIP.split('.');
	if (document.addrouting.interface.selectedIndex == 1){
		if (wanIP == "")
			alert(JS_msg48);
		else
			document.addrouting.gateway.value = wanip_tmp[0]+"."+wanip_tmp[1]+"."+wanip_tmp[2]+".";
	} else{
		document.addrouting.gateway.value = lanIP;
	}
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method="post" name="addrouting" action="/goform/addRouting">
<input type="hidden" name="submit-url" value="/internet/routing.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_routing_table)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="title2" colspan="2"><script>dw(MM_add)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_destip)</script>:</td>
<td><input type="text" name="dest" maxlength="15"></td>
</tr>
<tr style="display:">
<td class="thead"><script>dw(MM_host)</script>/<script>dw(MM_net)</script>:</td>
<td><select name="hostnet" onChange="hostChange()">
<option value="host" selected><script>dw(MM_host)</script></option>
<option value="net"><script>dw(MM_net)</script></option></select></td>
</tr>
<tr id="netmask" style="display:">
<td class="thead"><script>dw(MM_submask)</script>:</td>
<td><input type="text" name="netmask" maxlength="15"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_gateway_address)</script>:</td>
<td><input type="text" name="gateway" maxlength="15"></td>
</tr>
<tr style="display:">
<td class="thead"><script>dw(MM_interface)</script>:</td>
<td><select name="interface" onChange="interfaceChange()">
<option value="LAN" selected>LAN</option>
<script language="javascript">
if(opmode == "1") document.write("<option value=WAN>WAN</option>");
</script>
</select><input type="hidden" name="custom_interface"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_comment)</script>:</td>
<td><input type="text" name="comment" maxlength="10"></td>
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

<form action="/goform/delRouting" method="post" name="delRouting">
<input type="hidden" name="submit-url" value="/internet/routing.asp">
<table width=100% border=0 cellpadding=3 cellspacing=3>
<tr><td class="title3" colspan="10"><script>dw(MM_routing_table_list)</script></td></tr>
<tr class="title4" align=center>
<td><b>No.</b></td>
<td><b><script>dw(MM_destip)</script></b></td>
<td><b><script>dw(MM_submask)</script></b></td>
<td><b><script>dw(MM_gateway_address)</script></b></td>
<td><b><script>dw(MM_flags)</script></b></td>
<td><b>Metric</b></td>
<td><b>Ref</b></td>
<td><b>Use</b></td>
<td><b><script>dw(MM_interface)</script></b></td>
<td><b><script>dw(MM_comment)</script></b></td>
</tr>
<script language="javascript">
var i;
for(i=0; i<entries.length; i++) {
	var one_entry = entries[i].split(",");
	
	true_interface[i] = one_entry[0];
	destination[i] = one_entry[1];
	gateway[i] = one_entry[2];
	netmask[i] = one_entry[3];
	flags[i] = one_entry[4];
	ref[i] = one_entry[5];
	use[i] = one_entry[6];
	metric[i] = one_entry[7];
	category[i] = parseInt(one_entry[8]);
	interface[i] = one_entry[9];
	//idle[i] = parseInt(one_entry[10]);
	comment[i] = one_entry[11];
	if(comment[i] == " " || comment[i] == "")
		comment[i] = "---";
}
	
for(i=0; i<entries.length; i++)
{
	if(category[i] > -1){
		document.write("<tr align=center>");
		document.write("<td>");
		document.write(i+1);
		document.write("<input type=checkbox name=DR"+ category[i] + " value=\""+ destination[i] + " " + netmask[i] + " " + true_interface[i] +"\">");
		document.write("</td>");
	} else {
		document.write("<tr align=center>");
		document.write("<td>"); 	document.write(i+1);			 	document.write("</td>");
	}
	
	document.write("<td>"); 	document.write(destination[i]); 	document.write("</td>");
	document.write("<td>"); 	document.write(netmask[i]);		document.write("</td>");
	document.write("<td>"); 	document.write(gateway[i]); 		document.write("</td>");
	document.write("<td>"); 	document.write(flags[i]);			document.write("</td>");
	document.write("<td>"); 	document.write(metric[i]);		document.write("</td>");
	document.write("<td>"); 	document.write(ref[i]);			document.write("</td>");
	document.write("<td>"); 	document.write(use[i]);			document.write("</td>");
	document.write("<td>"); 	document.write(interface[i] + "(" +true_interface[i] + ")");		document.write("</td>");
	document.write("<td>"); 	document.write(comment[i]);		document.write("</td>");
	document.write("</tr>\n");
}
</script>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=submit class=button value="'+BT_delete+'" name="deleteSelRouter" onClick="return deleteClick()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" name="reset" onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
