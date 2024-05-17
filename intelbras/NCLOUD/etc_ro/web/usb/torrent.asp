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
var ftpenabled = '<% getCfgZero(1, "FtpEnabled"); %>';
var smbenabled = '<% getCfgZero(1, "SmbEnabled"); %>';
var bt_enable = "<% getCfgGeneral(1, "TorrentEnabled"); %>";
var dlna_enable =  '<% getCfgGeneral(1, "DlnaEnabled"); %>';
var itunes_enable = '<% getCfgGeneral(1, "iTunesEnable"); %>';
var lan_ip = "<% getLanIp(); %>";
var wan_ip = "<% getWanIp(); %>";
var bt_port =  "<% getCfgGeneral(1, "TorrentPort"); %>";
var bt_username = "<% getCfgGeneral(1, "TorrentUser"); %>";
var bt_password = "<% getCfgGeneral(1, "TorrentPsword"); %>";
var bt_auth_enable = "<% getCfgGeneral(1, "TorrentAuth"); %>";
var bt_max_download = 1*"<% getCfgGeneral(1, "TorrentMaxDwLoad"); %>";
var fromwan_h = "<% getCfgGeneral(1, "TorrentWan"); %>";
var usb_state = 1*"<% getInfo(1, "usbStatus"); %>";
var portStatus=0;

function formCheck()
{
	if(document.storage_dwld.bt_enable.options.selectedIndex == 1){
	
		if(document.storage_dwld.bt_port.value == "")
		{
			alert(JS_msg65+JS_msg175);
			return false;
		}
 		else if (!portCheck(document.storage_dwld.bt_port.value, MM_port)) 
			return false;
		else if(!portStatus)
		{
			alert(JS_msg177);
			return false;
		}	
			
		if(document.storage_dwld.bt_auth_enable.options.selectedIndex == 1) {
 	    	if (!blankCheck(document.storage_dwld.bt_username.value, "", JS_msg183)) 
				return false;
			if(/[^a-zA-Z0-9]/gi.test(document.storage_dwld.bt_username.value)){
				alert(JS_msg185);
				return false;
			}
			if (!blankCheck(document.storage_dwld.bt_password.value, "", JS_msg166)) 
				return false;
			if(/[^a-zA-Z0-9]/gi.test(document.storage_dwld.bt_password.value)){
				alert(JS_msg186);
				return false;
			}
		}
		if(0==bt_enable){
			if(checkUsbSer(ftpenabled,smbenabled,bt_enable,dlna_enable,itunes_enable)){
				return false;
			}
		}
	}

	return true;
}
  
function Load_Setting()
{	
	if(!bt_enable) checkPort();
	else portStatus=1;
	if (usb_state == 0){
		document.getElementById("div_no_usbdivice").style.display = "";
		document.getElementById("div_usbdivice").style.display = "none";
	}else{
		var str = "<% getCfgGeneral(1, "TorrentDir"); %>";
		var v = document.getElementsByName("disk_part");
		
		for(var i=0; i<v.length; i++){
			if(v[i].value == str)
				v[i].checked = true;
		}
		
		document.getElementById("div_no_usbdivice").style.display = "none";
		document.getElementById("div_usbdivice").style.display = "";
		
		if(bt_enable == "0")
			document.storage_dwld.bt_enable.options.selectedIndex = 0;
		else
			document.storage_dwld.bt_enable.options.selectedIndex = 1;
		
		if(bt_auth_enable == "1")
			document.storage_dwld.bt_auth_enable.options.selectedIndex = 1;
		else
			document.storage_dwld.bt_auth_enable.options.selectedIndex = 0;

		document.storage_dwld.bt_port.value = bt_port;
		document.storage_dwld.bt_max_download.value = bt_max_download;

		if(fromwan_h == 0){
			document.storage_dwld.fromwan_h.value = 0; 
			document.storage_dwld.fromwan.checked = false;
		}else{
			document.storage_dwld.fromwan_h.value = 1; 
			document.storage_dwld.fromwan.checked = true;
		}
		
		selectChange();
		selectChange_auth();
	}
}

function selectChange()
{
	if(document.storage_dwld.bt_enable.options.selectedIndex == 0){
		document.storage_dwld.bt_port.disabled = true;
		document.storage_dwld.bt_auth_enable.disabled = true;
		document.storage_dwld.bt_username.disabled = true;
		document.storage_dwld.bt_password.disabled = true;
		document.storage_dwld.bt_max_download.disabled = true;
		document.storage_dwld.fromwan.disabled = true;
		document.storage_dwld.set_torrent.disabled = true;
	}else if(document.storage_dwld.bt_enable.options.selectedIndex == 1){
		document.storage_dwld.bt_port.disabled = false;
		document.storage_dwld.bt_auth_enable.disabled = false;
		document.storage_dwld.bt_username.disabled = false;
		document.storage_dwld.bt_password.disabled = false;
		document.storage_dwld.bt_max_download.disabled = false;
		document.storage_dwld.fromwan.disabled = false;
		document.storage_dwld.set_torrent.disabled = false;
	}
}
 
function selectChange_auth()
{
	document.storage_dwld.bt_username.value = bt_username;
	document.storage_dwld.bt_password.value = bt_password;
		
	if(document.storage_dwld.bt_auth_enable.options.selectedIndex == 0){
		document.getElementById("btusername").style.display="none";
		document.getElementById("btpassword").style.display="none";
	}else if(document.storage_dwld.bt_auth_enable.options.selectedIndex == 1){
		document.getElementById("btusername").style.display="";
		document.getElementById("btpassword").style.display="";
	}
}

function open_transmission_window()
{		
	if(window.location.hostname == lan_ip){
		window.open("http://"+lan_ip+":"+document.storage_dwld.bt_port.value,"download_List","toolbar=no, location=yes, scrollbars=yes, resizable=no, width=640, height=480");
	}else
		window.open("http://"+wan_ip+":"+document.storage_dwld.bt_port.value,"download_List","toolbar=no, location=yes, scrollbars=yes, resizable=no, width=640, height=480");
}
 
function fromwan_enable() 
{ 
	if(document.storage_dwld.fromwan.checked)
		document.storage_dwld.fromwan_h.value = 1; 
	else 
		document.storage_dwld.fromwan_h.value = 0; 
} 
function resultFun(data){
	if(data==1){
		portStatus=0;
	}else{
		portStatus=1;
	}
}

function errorFun(readyState,status){
}

function checkPort(){
	var frm = document.getElementById("portcheckfrm");
	frm.enabled.value=document.storage_dwld.bt_enable.value;
	frm.port.value=document.storage_dwld.bt_port.value;
	Ajax.getInstance('/goform/checkPort','',0,resultFun,errorFun);Ajax.post(frm);
}

function checkPort2(){
	if(document.storage_dwld.bt_port.value !=bt_port)
	checkPort();
}
</script>
</head>
<body onLoad="Load_Setting()">
<table id="div_no_usbdivice" style="display:none" width=700>
<tr><td>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td><img src="../graphics/warning.gif" align="absmiddle">&nbsp;&nbsp;
<script>dw(JS_msg148)</script>&nbsp;&nbsp;
<script>dw('<input type=button class=button value="'+BT_refresh+'" onClick="window.location.reload()">')</script></td></tr>
</table>
</td></tr></table>

<table id="div_usbdivice" width=700><tr><td>
<form method=post name="storage_dwld" action="/goform/torrentsrv">
<input type="hidden" name="submit-url" value="/usb/torrent.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_torrent_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1>
<tr>
<td class="thead"><script>dw(MM_torrent)</script>:</td>
<td><select onChange="selectChange();checkPort2();" name="bt_enable" size="1">
<option value=0><script>dw(MM_disable)</script></option>
<option value=1><script>dw(MM_enable)</script></option>
</select></td>
</tr> 
<tr id="btport">
<td class="thead"><script>dw(MM_port)</script>:</td>
<td><input type=text name="bt_port" maxlength=5 value="" size="5" onChange="checkPort();"></td>
</tr>
<tr id="btauth">
<td class="thead"><script>dw(MM_auth_torrent)</script>:</td>
<td><select onChange="selectChange_auth()" name="bt_auth_enable" size="1">
<option value=0><script>dw(MM_disable)</script></option>
<option value=1><script>dw(MM_enable)</script></option>
</select></td>
</tr>
<tr id="btusername">
<td class="thead"><script>dw(MM_username)</script>:</td>
<td><input type=text name="bt_username" maxlength=16></td>
</tr>
<tr id="btpassword">
<td class="thead"><script>dw(MM_password)</script>:</td>
<td><input type=password name="bt_password" maxlength=16></td>
</tr>
<tr id="btmaxdownload">	
<td class="thead"><script>dw(MM_maximum_download_number)</script>:</td>
<td><select name="bt_max_download" size="1">
<option value=1> 1   </option>
<option value=2> 2   </option>
<option value=3> 3   </option>
</select></td>
</tr>
<tr> 	
<td class="thead"><script>dw(MM_allow_wan_set)</script>:</td> 
<td><input type="checkbox" name="fromwan" onClick="fromwan_enable();"> <input type="hidden" name="fromwan_h" value=0></td> 
</tr> 
</table>
<table width=60% border=0 cellpadding=3 cellspacing=3>
<td class="thead"><script>dw(MM_choose)</script>:</td>
<% ShowPartition2(); %>
<script language="javascript">
</script>
</table>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=submit class=button value="'+BT_apply+'" onClick="return formCheck()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset2+'" onClick="resetForm();"> &nbsp; &nbsp;\
<input type=button class=button3 name="set_torrent"value="'+BT_set_torrent+'" onClick="open_transmission_window();">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
<form method=post id="portcheckfrm" action="/goform/checkPort" style="display:none;">
<input type=text name="enabled" value="">
<input type=text name="port" value="">
</form>
</body></html>

