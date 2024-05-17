<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var wdsMode  = '<% getCfgZero(1, "WdsEnable"); %>';
var wdsList  = '<% getCfgGeneral(1, "WdsList"); %>';
var wdsPhyMode  = '<% getCfgZero(1, "WdsPhyMode"); %>';
var wdsEncrypType  = '<% getCfgGeneral(1, "WdsEncrypType"); %>';
var wdsEncrypKey0  = '<% getCfgGeneral(1, "Wds0Key"); %>';
var wdsEncrypKey1  = '<% getCfgGeneral(1, "Wds1Key"); %>';
var wdsEncrypKey2  = '<% getCfgGeneral(1, "Wds2Key"); %>';
var wdsEncrypKey3  = '<% getCfgGeneral(1, "Wds3Key"); %>';

function WdsSecurityOnChange(i)
{
	if (eval("document.wds_form.wds_encryp_type"+i).options.selectedIndex >= 1)
		eval("document.wds_form.wds_encryp_key"+i).disabled = false;
	else
		eval("document.wds_form.wds_encryp_key"+i).disabled = true;
}

function WdsModeOnChange()
{
	document.getElementById("div_wds_phy_mode").style.display = "none";
	document.getElementById("div_wds_encryp_type0").style.display = "none";
	document.getElementById("div_wds_encryp_type1").style.display = "none";
	document.getElementById("div_wds_encryp_type2").style.display = "none";
	document.getElementById("div_wds_encryp_type3").style.display = "none";
	document.getElementById("wds_mac_list_1").style.display = "none";
	document.getElementById("wds_mac_list_2").style.display = "none";
	document.getElementById("wds_mac_list_3").style.display = "none";
	document.getElementById("wds_mac_list_4").style.display = "none";

	if (document.wds_form.wds_mode.options.selectedIndex >= 1) {
		document.getElementById("div_wds_phy_mode").style.display = "none";
		document.getElementById("div_wds_encryp_type0").style.display = "";
		document.getElementById("div_wds_encryp_type1").style.display = "";
		document.getElementById("div_wds_encryp_type2").style.display = "";
		document.getElementById("div_wds_encryp_type3").style.display = "";
	}

	WdsSecurityOnChange(0);
	WdsSecurityOnChange(1);
	WdsSecurityOnChange(2);
	WdsSecurityOnChange(3);

	if (document.wds_form.wds_mode.options.selectedIndex >= 2) {
		document.getElementById("wds_mac_list_1").style.display = "";
		document.getElementById("wds_mac_list_2").style.display = "";
		document.getElementById("wds_mac_list_3").style.display = "";
		document.getElementById("wds_mac_list_4").style.display = "";
	}
}

function Load_Setting()
{
	var wdslistArray;
	var wdsEncTypeArray;

	wdsMode = 1*wdsMode;
	if (wdsMode == 0)
		document.wds_form.wds_mode.options.selectedIndex = 0;
	else if (wdsMode == 4)
		document.wds_form.wds_mode.options.selectedIndex = 1;
	else if (wdsMode == 3)
		document.wds_form.wds_mode.options.selectedIndex = 2;

	if (wdsPhyMode.indexOf("CCK") >= 0 || wdsPhyMode.indexOf("cck") >= 0)
		document.wds_form.wds_phy_mode.options.selectedIndex = 0;
	else if (wdsPhyMode.indexOf("OFDM") >= 0 || wdsPhyMode.indexOf("ofdm") >= 0)
		document.wds_form.wds_phy_mode.options.selectedIndex = 1;
	else if (wdsPhyMode.indexOf("HTMIX") >= 0 || wdsPhyMode.indexOf("htmix") >= 0)
		document.wds_form.wds_phy_mode.options.selectedIndex = 2;
	else if (wdsPhyMode.indexOf("GREENFIELD") >= 0 || wdsPhyMode.indexOf("greenfield") >= 0)
		document.wds_form.wds_phy_mode.options.selectedIndex = 3;

	if (wdsEncrypType != "") {
		wdsEncTypeArray = wdsEncrypType.split(";");
		for (i = 1; i <= wdsEncTypeArray.length; i++) {
			k = i - 1;
			if (wdsEncTypeArray[k] == "NONE" || wdsEncTypeArray[k] == "none")
				eval("document.wds_form.wds_encryp_type"+k).options.selectedIndex = 0;
			else if (wdsEncTypeArray[k] == "WEP" || wdsEncTypeArray[k] == "wep")
				eval("document.wds_form.wds_encryp_type"+k).options.selectedIndex = 1;
			else if (wdsEncTypeArray[k] == "TKIP" || wdsEncTypeArray[k] == "tkip")
				eval("document.wds_form.wds_encryp_type"+k).options.selectedIndex = 2;
			else if (wdsEncTypeArray[k] == "AES" || wdsEncTypeArray[k] == "aes")
				eval("document.wds_form.wds_encryp_type"+k).options.selectedIndex = 3;
		}
	}

	WdsModeOnChange();

	document.wds_form.wds_encryp_key0.value = wdsEncrypKey0;
	document.wds_form.wds_encryp_key1.value = wdsEncrypKey1;
	document.wds_form.wds_encryp_key2.value = wdsEncrypKey2;
	document.wds_form.wds_encryp_key3.value = wdsEncrypKey3;

	if (wdsList != "") {
		wdslistArray = wdsList.split(";");
		for (i = 1; i <= wdslistArray.length; i++)
			eval("document.wds_form.wds_"+i).value = wdslistArray[i - 1];
	}
}

function checkEncKey(i)
{
	var key = eval("document.wds_form.wds_encryp_key"+i).value;
	if (eval("document.wds_form.wds_encryp_type"+i).options.selectedIndex == 1) {
		if (key.length == 10 || key.length == 26) {
			var re = /[A-Fa-f0-9]{10,26}/;
			if (!re.test(key)) 	{
				alert(JS_msg55+i+JS_msg57);
				eval("document.wds_form.wds_encryp_key"+i).focus();
				return false;
			}
			else
				return true;
		}
		else if (key.length == 5 || key.length == 13) {
			return true;
		}
		else {
			alert(JS_msg55+i+JS_msg81);
			eval("document.wds_form.wds_encryp_key"+i).focus();
			return false;
		}
	}
	else if (eval("document.wds_form.wds_encryp_type"+i).options.selectedIndex == 2 ||	eval("document.wds_form.wds_encryp_type"+i).options.selectedIndex == 3){
		if (key.length < 8 || key.length > 64) {
			alert(JS_msg55+i+JS_msg82);
			eval("document.wds_form.wds_encryp_key"+i).focus();
			return false;
		}
		
		if (key.length == 64) {
			var re = /[A-Fa-f0-9]{64}/;
			if (!re.test(key)) {
				alert(JS_msg55+i+JS_msg83);
				eval("document.wds_form.wds_encryp_key"+i).focus();
				return false;
			}
			else
				return true;
		}
		else
			return true;
	}
	return true;
}

function formCheck()
{
	var all_wds_list;
	var all_wds_enc_type;

	all_wds_enc_type = document.wds_form.wds_encryp_type0.value+";"+
		document.wds_form.wds_encryp_type1.value+";"+
		document.wds_form.wds_encryp_type2.value+";"+
		document.wds_form.wds_encryp_type3.value;
	document.wds_form.wds_encryp_type.value = all_wds_enc_type;

	if (!checkEncKey(0) || !checkEncKey(1) || !checkEncKey(2) || !checkEncKey(3))
		return false;

	all_wds_list = '';
	if (document.wds_form.wds_mode.options.selectedIndex >= 2){
		for (i = 1; i <= 4; i++){
			if (eval("document.wds_form.wds_"+i).value == "")
				continue;
			
			if (!macCheck(eval("document.wds_form.wds_"+i).value, "WDS AP"+MM_macaddr)) {
				return false;
			}
			else {
				all_wds_list += eval("document.wds_form.wds_"+i).value;
				all_wds_list += ';';
			}
		}
		if (all_wds_list == "")	{
			alert(JS_msg84);
			document.wds_form.wds_1.focus();
			return false;
		}
		else{
			document.wds_form.wds_list.value = all_wds_list;
			document.wds_form.wds_1.disabled = true;
			document.wds_form.wds_2.disabled = true;
			document.wds_form.wds_3.disabled = true;
			document.wds_form.wds_4.disabled = true;
		}
	}
	return true;
}

function open_search_ap(no) 
{ 
	window.open("wds_survey.asp#"+no, "newwindow", "height=550, width=700, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, status=no"); 
} 

function opera()
{
	var i;
	var a = window.parent.document.getElementsByTagName('iframe');  
	for (var i=0; i<a.length; i++){  
		if (a[i].name == self.name) {  
			a[i].height = document.body.scrollHeight; 
			return;  
		}  
	}  
}
</script>
</head>
<body onLoad="opera();Load_Setting()">
<table width=700><tr><td>
<form method=post name="wds_form" action="/goform/wirelessWds">
<input type="hidden" name="submit-url" value="/wireless/wds.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_wds_mode)</script>:</td>
<td><select name="wds_mode" onChange="WdsModeOnChange()">
<option value=0><script>dw(MM_disable)</script></option>
<option value=4><script>dw(MM_lazy_mode)</script></option>
<option value=3><script>dw(MM_repeater_mode)</script></option>
</select></td>
</tr>
<tr id="div_wds_phy_mode" style="display:none"> 
<td class="thead"><script>dw(MM_phy_mode)</script>:</td>
<td><select name="wds_phy_mode">
<option value="CCK;CCK;CCK;CCK">CCK</option>
<option value="OFDM;OFDM;OFDM;OFDM">OFDM</option>
<option selected value="HTMIX;HTMIX;HTMIX;HTMIX">HTMIX</option>
<option value="GREENFIELD;GREENFIELD;GREENFIELD;GREENFIELD">GREENFIELD</option>
</select></td>
</tr>
<tr id="div_wds_encryp_type0">
<td class="thead"><script>dw(MM_encryp_type)</script> 1:</td>
<td><select name="wds_encryp_type0" onChange="WdsSecurityOnChange(0)">
<option value="NONE"><script>dw(MM_none)</script></option>
<option value="WEP">WEP</option>
<option value="TKIP">TKIP</option>
<option value="AES">AES</option>
</select> <input type=text name=wds_encryp_key0 size=32 maxlength=64 value=""></td>
</tr>
<tr id="div_wds_encryp_type1">
<td class="thead"><script>dw(MM_encryp_type)</script> 2:</td>
<td><select name="wds_encryp_type1" onChange="WdsSecurityOnChange(1)">
<option value="NONE"><script>dw(MM_none)</script></option>
<option value="WEP">WEP</option>
<option value="TKIP">TKIP</option>
<option value="AES">AES</option>
</select> <input type=text name=wds_encryp_key1 size=32 maxlength=64 value=""></td>
</tr>
<tr id="div_wds_encryp_type2">
<td class="thead"><script>dw(MM_encryp_type)</script> 3:</td>
<td><select name="wds_encryp_type2" onChange="WdsSecurityOnChange(2)">
<option value="NONE"><script>dw(MM_none)</script></option>
<option value="WEP">WEP</option>
<option value="TKIP">TKIP</option>
<option value="AES">AES</option>
</select> <input type=text name=wds_encryp_key2 size=32 maxlength=64 value=""></td>
</tr>
<tr id="div_wds_encryp_type3">
<td class="thead"><script>dw(MM_encryp_type)</script> 4:</td>
<td><select name="wds_encryp_type3" onChange="WdsSecurityOnChange(3)">
<option value="NONE"><script>dw(MM_none)</script></option>
<option value="WEP">WEP</option>
<option value="TKIP">TKIP</option>
<option value="AES">AES</option>
</select> <input type=text name=wds_encryp_key3 size=32 maxlength=64 value=""></td>
</tr>
<input type="hidden" name="wds_encryp_type" value="">
<tr id="wds_mac_list_1">
<td class="thead">WDS AP1 <script>dw(MM_macaddr)</script>:</td>
<td><input type=text name=wds_1 maxlength=17 value=""> <script>dw('<input type=button class=button name="search_AP" value='+BT_search_ap+' onClick="open_search_ap(1)">')</script></td>
</tr>
<tr id="wds_mac_list_2">
<td class="thead">WDS AP2 <script>dw(MM_macaddr)</script>:</td>
<td><input type=text name=wds_2 maxlength=17 value=""> <script>dw('<input type=button class=button name="search_AP" value='+BT_search_ap+' onClick="open_search_ap(2)">')</script></td>
</tr>
<tr id="wds_mac_list_3">
<td class="thead">WDS AP3 <script>dw(MM_macaddr)</script>:</td>
<td><input type=text name=wds_3 maxlength=17 value=""> <script>dw('<input type=button class=button name="search_AP" value='+BT_search_ap+' onClick="open_search_ap(3)">')</script></td>
</tr>
<tr id="wds_mac_list_4">
<td class="thead">WDS AP4 <script>dw(MM_macaddr)</script>:</td>
<td><input type=text name=wds_4 maxlength=17 value=""> <script>dw('<input type=button class=button name="search_AP" value='+BT_search_ap+' onClick="open_search_ap(4)">')</script></td>
</tr>
<input type="hidden" name="wds_list" value="">
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
