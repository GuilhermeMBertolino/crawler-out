<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript" src="../js/ajax.js"></script>
<script language="JavaScript">
var ftpenabled = '<% getCfgZero(1, "FtpEnabled"); %>';
var smbenabled = '<% getCfgZero(1, "SmbEnabled"); %>';
var bt_enable = "<% getCfgGeneral(1, "TorrentEnabled"); %>";
var dlna_enable =  '<% getCfgGeneral(1, "DlnaEnabled"); %>';
var itunes_enable = '<% getCfgGeneral(1, "iTunesEnable"); %>';
var dlna_port = '<% getCfgGeneral(1, "DlnaPort"); %>';
var dlna_friend_name = '<% getCfgGeneral(1, "DlnaName"); %>';
var dlna_scan = '<% getCfgGeneral(1, "DlnaScan"); %>';
var usb_state = 1*'<% getInfo(1, "usbStatus"); %>';
var rules_num = <% DlnaRuleNums(); %>;
//var dlna_enable = '1';
//var dlna_port = '8200';
//var enable_tivo = '1';
//var strict_dlna = '1';
//var dlna_friend_name = 'NCLOUD';
var index;
//var dlna_port = parseInt('');
//var lan_ip = '10.0.0.1';
var lan_ip = "<% getLanIp(); %>";
var portStatus=0;
function initValue()
{
	if(!dlna_enable) checkPort();
	else portStatus=1;
	if (!rules_num) 
 		disableButton(document.DelDir.dirdelete);
	else 
       	enableButton(document.DelDir.dirdelete);
	
	if (usb_state == 0)	{
		document.getElementById("div_no_usbdivice").style.display = "";
		document.getElementById("div_usbdivice").style.display = "none";
	}else{
		document.getElementById("div_no_usbdivice").style.display = "none";
		document.getElementById("div_usbdivice").style.display = "";
		document.DLNA.DLNAPort.value = dlna_port;
		document.DLNA.friend_name.value = dlna_friend_name;
		if(dlna_enable == "1"){
			document.DLNA.DLNAEnabled[0].checked = true;
			document.getElementById("showlb").style.display="";  
			}
		else
			document.DLNA.DLNAEnabled[1].checked = true;

		if(dlna_scan == "1")
			document.DLNA.rescan_h.checked = true;
		else
			document.DLNA.rescan_h.checked = false;
	
		//if(enable_tivo == "1")
			//document.DLNA.TIVOEnabled[0].checked = true;
		//else		
			//document.DLNA.TIVOEnabled[1].checked = true;	
		
		//if(strict_dlna == "1")
		//	document.DLNA.StrictDLNA[0].checked = true;
		//else		
			//document.DLNA.StrictDLNA[1].checked = true;
	
		dlna_enable_switch();
		if(document.DLNA.DLNAEnabled[0].checked == true){
			document.getElementById("AddDir").style.display = "";
			document.getElementById("DelDir").style.display = "";
		}else{
			document.getElementById("AddDir").style.display = "none";
			document.getElementById("DelDir").style.display = "none";
		}
	}
}

function CheckValue()
{
	var reg_l = /^\w+$/;
	if(document.DLNA.DLNAEnabled[0].checked == true){
		if (document.DLNA.DLNAPort.value == ""){
			alert(JS_msg65+JS_msg175);
			document.DLNA.DLNAPort.focus();
			return false;
		}
		else if (!portCheck(document.DLNA.DLNAPort.value, MM_port)){
			return false;
		}
		else if(!portStatus)
		{
			alert(JS_msg178);
			return false;
		}	

		if (document.DLNA.friend_name.value == ""){
			alert(MM_dlna10);
			document.DLNA.friend_name.focus();
			return false;
		}
		else if(!reg_l.test(document.DLNA.friend_name.value)){
			alert(JS_msg131);
			document.DLNA.friend_name.focus();
			return false;
		}
		if(0==dlna_enable){
			if(checkUsbSer(ftpenabled,smbenabled,bt_enable,dlna_enable,itunes_enable)){
				return false;
			}
		}
	}
	return true;
}

function CheckValue_dir()
{
	if (rules_num >= 4){
		alert(MM_dlna12);
		return false;
	}

	if(document.DLNA.DLNAEnabled[0].checked == true){
	
		//null dir return false;
		if (document.AddDir.direct.value == ""){
			alert(MM_dlna13);
			document.AddDir.direct.focus();
			return false;
		}
        //ʾʾ
		

		//same dir return false
	}
   // document.getElementById("showlb").style.display="";   
	return true;
}

function deleteClick()
{
   	for(i=0; i< rules_num; i++) {
		var tmp = eval("document.DelDir.delRule"+i);
		if(tmp.checked == true)
			return true;
	}
	alert(JS_msg18);
	return false;
}

function dlna_enable_switch()
{
	if (document.DLNA.DLNAEnabled[0].checked == true){
		document.DLNA.DLNAPort.disabled = false;
	//	document.DLNA.TIVOEnabled.disabled = false;
	//	document.DLNA.StrictDLNA.disabled = false;
		document.DLNA.friend_name.disabled = false;
		document.DLNA.rescan_h.disabled = false;
		document.getElementById("div0").style.display="";
	}else{
		document.DLNA.DLNAPort.disabled = true;
	//	document.DLNA.TIVOEnabled.disabled = true;
		//document.DLNA.StrictDLNA.disabled = true;
		document.DLNA.friend_name.disabled = true;
		document.DLNA.rescan_h.disabled = true;
		document.getElementById("div0").style.display="none";
	}
}

function open_diradd_window()
{
	window.open("minidlna_add_dir.asp","media_path","toolbar=no, location=yes, scrollbars=yes, resizable=no, width=640, height=480")
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
	if(document.DLNA.DLNAEnabled[0].checked)
		frm.enabled.value=document.DLNA.DLNAEnabled[0].value;
	else
		frm.enabled.value=document.DLNA.DLNAEnabled[1].value;
	frm.port.value=document.DLNA.DLNAPort.value;
	Ajax.getInstance('/goform/checkPort','',0,resultFun,errorFun);Ajax.post(frm);
}

function checkPort2(){
	if(document.DLNA.DLNAPort.value !=dlna_port)
	checkPort();
}
</script>
</head>

<body class="contentbody" onLoad="initValue()">
<table id="div_no_usbdivice" style="display:none" width=700><tr><td>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td><img src="../graphics/warning.gif" align="absmiddle">&nbsp;&nbsp;
<script>dw(JS_msg148)</script>&nbsp;&nbsp;
<script>dw('<input type=button class=button value="'+BT_refresh+'" onClick="window.location.reload()">')</script></td></tr>
</table>
</td></tr></table>

<table id="div_usbdivice" width=700><tr><td>
<form method=post name="DLNA"  id="DLNAPOST" action="/goform/Dlna_Init">
<table table width=100% border=0 cellpadding=3 cellspacing=1>
<tr><td class="title"><script>dw(MM_dlna17)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table table width=100% border=0 cellpadding=3 cellspacing=1>
<tr><td class="title3" colspan="2"><script>dw(MM_dlna18)</script></td></tr>
<tr>
<td class="thead"><script>dw(MM_dlna19)</script> </td>
<td><input class=radio type=radio name="DLNAEnabled" value="1" onClick="dlna_enable_switch();checkPort2();"><script>dw(MM_enable)</script>
<input class=radio type=radio name="DLNAEnabled" value="0" onClick="dlna_enable_switch();checkPort2();" checked><script>dw(MM_disable)</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_dlna20)</script></td>
<td><input type=text name="DLNAPort" maxlength=6 value="" size="6" class="navi_text" onChange="checkPort();"></td>
</tr>
<tr style="display:none;"> 
<td class="thead">TiVO </td>
<td><input class=radio type=radio name="TIVOEnabled" value="1" checked>Ativar
<input class=radio type=radio name="TIVOEnabled" value="0">Desativar </td>
</tr>
<tr style="display:none;"> 
<td class="thead">Reduzir Imagens JPEG muito grandes </td>
<td><input class=radio type=radio name="StrictDLNA" value="1" checked>Ativar
<input class=radio type=radio name="StrictDLNA" value="0">Desativar</td>
</tr>
<tr>
<td class="thead"><script>dw(MM_dlna22)</script> </td>
<td><input type=text name="friend_name" maxlength=32></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_dlna21)</script> </td>
<td><input type="checkbox" name="rescan_h" value="ON"></td>
</tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1 id="div0">
<tr>
<td class="thead"><script>dw(MM_dlna33)</script></td>
<td id="div1"></td>
</tr><tr>
<td class="thead"><script>dw(MM_dlna34)</script></td>
<td id="div2"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_dlna35)</script></td>
<td id="div3"></td>
</tr>
</table>

<script>
var __AjaxReq = null;
function __createRequest()
{
	var request = null;
	try { request = new XMLHttpRequest(); }
	catch (trymicrosoft)
	{
		try { request = new ActiveXObject("Msxml2.XMLHTTP"); }
		catch (othermicrosoft)
		{
			try { request = new ActiveXObject("Microsoft.XMLHTTP"); }
			catch (failed)
			{
				request = null;
			}
		}
	}
	if (request == null) alert("Error creating request object !");
	return request;
}

function generate_random_str()
{
	var d = new Date();
	var str=d.getFullYear()+"."+(d.getMonth()+1)+"."+d.getDate()+"."+d.getHours()+"."+d.getMinutes()+"."+d.getSeconds();
	return str;
}


function __send_request(url)
{
	if (__AjaxReq == null) __AjaxReq = __createRequest();
	__AjaxReq.open("GET", url, true);
	__AjaxReq.onreadystatechange = __update_page;
	__AjaxReq.send(null);
}

function __update_state()
{
	__send_request('http://'+lan_ip+'/usb/usb_minidlnanum.asp?t='+generate_random_str());
	setTimeout("__update_state()", 5000);
}

function __update_page()
{
	var conn_msg="";
	if (__AjaxReq != null && __AjaxReq.readyState == 4)
	{
		var dlnanum=__AjaxReq.responseText.split("\"")[1];
		document.getElementById("div1").innerHTML=dlnanum.split("?")[0];
		document.getElementById("div2").innerHTML=dlnanum.split("?")[1];
		document.getElementById("div3").innerHTML=dlnanum.split("?")[2].split("<")[0];
	}
}
__update_state();
</script>



<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<tr>
<td colspan="2"><span id="showlb" style="display:none;font-size:12;color:red"><label><strong>&nbsp;OBS: O NCLOUD pode levar alguns minutos para carregar todos os arquivos!<label></strong></span></td>
</tr>
<td>
<script>dw('<input type=submit class=button value="'+BT_apply+'" onClick="return CheckValue()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_reset+'" onClick="resetForm();">')</script>
</td>
</tr>
</table>
</form>

<br>
<br>
<form method=post name="DelDir" id="DelDir" style="display:none;" action="/goform/Dlna_Del">
<table table width=100% border=0 cellpadding=3 cellspacing=3>
<tr><td class="title3" colspan="4"><script>dw(MM_dlna23)</script></td></tr>
<tr class="title4" align=center>
<td><script>dw(MM_dlna24)</script></td>
<td><script>dw(MM_dlna1)</script></td>
<td><script>dw(MM_dlna26)</script></td>
</tr>
 <% Dlna_Show(); %>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=submit class=button onClick="return deleteClick();" value="'+BT_delete+'" name="dirdelete" >')</script>
</td>
</tr>
</table>
</form>

<form method=post name="AddDir" id="AddDir" style="display:none;" action="/goform/Dlna_Add">
<table table width=100% border=0 cellpadding=3 cellspacing=1>
<tr><td class="title3" colspan="2"><script>dw(MM_dlna27)</script> </td></tr>
<tr>
<td class="thead"><script>dw(MM_dlna1)</script> </td>
<td><input type=text name="direct" maxlength=128 value="" size="32" class="navi_text"> <script>dw('<input type="button" class="button" onClick="open_diradd_window();" value="'+BT_scan+'"/>')</script></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_dlna28)</script> </td>
<td><select class="list" name="media_type">
<option value="all"><script>dw(MM_dlna29)</script> </option>
<option value="audio"><script>dw(MM_dlna30)</script> </option>
<option value="video"><script>dw(MM_dlna31)</script></option>
<option value="images"><script>dw(MM_dlna32)</script></option>
</select></td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=submit class=button value="'+BT_add+'" onClick="return CheckValue_dir();">')</script>
</td>
</tr>
</table>
</form>

<br>
<br>
</td></tr></table>
<form method=post id="portcheckfrm" action="/goform/checkPort" style="display:none;">
<input type=text name="enabled" value="">
<input type=text name="port" value="">
</form>
</body></html>

