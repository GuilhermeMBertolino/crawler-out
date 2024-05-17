<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
function formCheck()
{

    
	parent.left.counts = 0;
	if (document.DDNS.DDNSEnabled.options.selectedIndex == 1) {

	      if(document.getElementById("passWord2").style.display == "none")
			document.DDNS.Password.value = document.DDNS.ddnsPassword3.value;
		else
			document.DDNS.Password.value = document.DDNS.ddnsPassword2.value;


			
		if (document.DDNS.DDNSProvider.value == "intelbras.com") {
			if (!blankCheck(document.DDNS.Hostname.value, MM_hostname, JS_msg182)) 
				return false;
				
			if (!blankCheck(document.DDNS.Email.value, "E-mail", JS_msg179)) 
				return false;
			
			if (!isString(document.DDNS.Email.value)) {
				alert(JS_msg179);
				return false;
				}
		} else {
			if (!blankCheckNew(document.DDNS.DDNS.value, MM_domainname)){ 
                        
		        alert(JS_msg181); 
				return false;
				}
			if (!blankCheckNew(document.DDNS.Account.value, MM_username)) {
                alert(MM_ddns_930+JS_msg151); 
				return false;
				}
			if (!blankCheckNew(document.DDNS.Password.value, MM_password)){
                 alert(MM_ddns_931+JS_msg151); 
				return false;
				}
		}
		
	}
	
	return true;
}

function updateState()
{
	document.getElementById("div_domainname").style.display = "none";
	document.getElementById("div_username").style.display = "none";
	document.getElementById("div_password").style.display = "none";
	
	document.getElementById("div_hostname").style.display = "none";
	document.getElementById("div_email").style.display = "none";
	
	if (document.DDNS.DDNSEnabled.options.selectedIndex == 1) {
		document.getElementById("div_ddns_provider").style.display = "";
		document.DDNS.DDNSProvider.disabled = false;
		document.DDNS.ddnsPassword2.disabled = false;
		document.DDNS.ddnsPassword3.disabled = false;
	} else {
		document.getElementById("div_ddns_provider").style.display = "none";
		document.DDNS.DDNSProvider.disabled = true;
		document.DDNS.ddnsPassword2.disabled = true;
		document.DDNS.ddnsPassword3.disabled = true;
	}	

	
	updateProvider();
}

var http_request = false;
function updateDDNSState()
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
    http_request.onreadystatechange = doUpdate;
    http_request.open('POST', '/goform/getDDNSStatus', true);
    http_request.send('n\a');
}

function doUpdate()
{
    if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			document.getElementById("status").value = http_request.responseText;
		} else {
			//alert(JS_msg89);
		}
	}
}

function updateProvider()
{
	document.getElementById("div_domainname").style.display = "none";
	document.getElementById("div_username").style.display = "none";
	document.getElementById("div_password").style.display = "none";	
	document.getElementById("intelbras_update_ddns").style.display = "none";	
	document.getElementById("div_hostname").style.display = "none";
	document.getElementById("div_email").style.display = "none";
	
	if (document.DDNS.DDNSProvider.value == "intelbras.com") {
		document.getElementById("div_hostname").style.display = "";
		document.getElementById("div_email").style.display = "";
		document.getElementById("intelbras_update_ddns").style.display = "";
		document.DDNS.Hostname.disabled = false;
		document.DDNS.Email.disabled = false;
	} else {	
		document.getElementById("div_domainname").style.display = "";
		document.getElementById("div_username").style.display = "";
		document.getElementById("div_password").style.display = "";
	}
	
	if (document.DDNS.DDNSProvider.disabled == true) {
		document.DDNS.DDNS.disabled = true;
		document.DDNS.Account.disabled = true;
		document.DDNS.Password.disabled = true;
		document.DDNS.Hostname.disabled = true;
		document.DDNS.Email.disabled = true;
	} else {
		document.DDNS.DDNS.disabled = false;
		document.DDNS.Account.disabled = false;
		document.DDNS.Password.disabled = false;
		document.DDNS.Hostname.disabled = false;
		document.DDNS.Email.disabled = false;
	}
	
	if (document.DDNS.DDNSProvider.value == "dyndns.org")
		document.getElementById("div_ddns_provider").innerHTML="<a href='http://dyn.com/dns/' target='_blank'>"+MM_register+"</a>";
	else if (document.DDNS.DDNSProvider.value == "no-ip.com")
		document.getElementById("div_ddns_provider").innerHTML="<a href='http://www.no-ip.com/newUser.php/' target='_blank'>"+MM_register+"</a>";
	else if (document.DDNS.DDNSProvider.value == "3322.org")
		document.getElementById("div_ddns_provider").innerHTML="<a href='http://www.pubyun.com/accounts/signup/' target='_blank'>"+MM_register+"</a>";
	else
		document.getElementById("div_ddns_provider").innerHTML="";
		
	if(("intelbras.com"==document.DDNS.DDNSProvider.value)){
		document.getElementById("ddnsStatus").style.display="";
	}else{
		document.getElementById("ddnsStatus").style.display="none";
	}
}

//var counts=0;
var Itimer="";
function RefreshDdnsStatus(){ 
	try{  
	  var ddnsStatus = '<% getInfo(1, "ddnsStatus"); %>'==""?MM_ddns_no_response:<% getInfo(1, "ddnsStatus"); %>;
	  }catch(e){}
	  parent.left.counts++;  

	  if( ddnsStatus == MM_ddns_no_response ||ddnsStatus == MM_wan_connect_status ||ddnsStatus ==  MM_connect_ddns_no)
	  	{
	  		if(20 > parent.left.counts){
				window.location.reload(); 
				return false;
			}
	  	}
	  else
	  	{
	  		document.getElementById("status").innerHTML = ddnsStatus;
			clearTimeout(Itimer);
	  	}

		document.getElementById("status").innerHTML = ddnsStatus;
		
} 


function changePasswordType()
{
	var f=document.DDNS;
	document.getElementById("passWord2").style.display = "";//password2 text 
	document.getElementById("passWord3").style.display = "none";//password
	f.ddnsPassword2.value = "";
	f.ddnsPassword2.focus();
}


function Load_Setting()
{
	var authStatus="";
	document.DDNS.DDNSEnabled.options.selectedIndex = 1*'<% getCfgZero(1, "DDNSEnabled"); %>';
	updateState();
	
	document.DDNS.DDNSProvider.value = "<% getCfgGeneral(1, "DDNSProvider"); %>";
	updateProvider();
	try{ 
		authStatus = '<% getInfo(1, "ddnsStatus"); %>'==""?MM_ddns_no_response:<% getInfo(1, "ddnsStatus"); %>;
	}catch(e){}

	if(authStatus == MM_ddns_no_response ||authStatus == MM_wan_connect_status||authStatus ==  MM_connect_ddns_no || authStatus == MM_ddns_fail){
/*		if(authStatus == MM_ddns_no_response)
			document.getElementById("status").innerHTML="Por favor aguarde ...";
		else  */
			document.getElementById("status").innerHTML = "Por favor aguarde ...";
		Itimer = window.setTimeout(RefreshDdnsStatus,6000); 
	}else{
		document.getElementById("status").innerHTML = authStatus;
	}
     

      
	
	
}
</script>
</head>
<body onLoad="Load_Setting()">
<table width=700><tr><td>
<form method="post" name="DDNS" action="/goform/DDNS">
<input type="hidden" name="submit-url" value="/firewall/ddns.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_ddns_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead">DDNS:</td>
<td><select onChange="updateState()" name="DDNSEnabled">
<option value=0><script>dw(MM_disable)</script></option>
<option value=1><script>dw(MM_enable)</script></option></select></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_provider)</script>:</td>
<td><select onChange="updateProvider();clearTimeout(Itimer);" name="DDNSProvider">
<% getDdnsCombox(); %>
</select>&nbsp;&nbsp;&nbsp;&nbsp;<span id="div_ddns_provider"> </span></td>
</tr>
<tr id="div_domainname" style="display:none">
<td class="thead"><script>dw(MM_domainname)</script>:</td>
<td><input type="text" name="DDNS" maxlength="64" value="<% getCfgGeneral(1, "DDNS"); %>"> </td>
</tr>
<tr id="div_username" style="display:none">
<td class="thead"><script>dw(MM_username)</script>:</td>
<td><input type="text" name="Account" maxlength="64" value="<% getCfgGeneral(1, "DDNSAccount"); %>"> </td>
</tr>
<tr id="div_password" style="display:none">
<td class="thead"><script>dw(MM_password)</script>:</td>
<td><input type=hidden name=Password value="<% getCfgGeneral(1, "DDNSPassword"); %>">
<span id="passWord2" style="display:none"><input type=text name="ddnsPassword2"  maxlength="64" value="<% getCfgGeneral(1, "DDNSPassword"); %>"></span>
<span id="passWord3"><input type=password name="ddnsPassword3" maxlength="64"  value="<% getCfgGeneral(1, "DDNSPassword"); %>" onFocus="changePasswordType()"></span></td>
</tr>
<tr id="div_hostname" style="display:none">
<td class="thead"><script>dw(MM_hostname)</script>:</td>
<td><input type="text" name="Hostname" maxlength="64" value="<% getCfgGeneral(1, "DDNSHostname"); %>">.ddns-intelbras.com.br </td>
</tr>
<tr id="div_email" style="display:none">
<td class="thead">E-mail:</td>
<td><input type="text" name="Email" maxlength="64" value="<% getCfgGeneral(1, "DDNSEmail"); %>"> </td>
</tr>
<tr><td colspan="2">&nbsp;</td></tr>
<tr id="ddnsStatus">
<td class="thead"><script>dw(MM_status)</script>:</td>
<td><span id="status"> </span>&nbsp;&nbsp;&nbsp;&nbsp;<span id="intelbras_update_ddns"><script>dw('<input type="hidden" class=button value="'+BT_update+'" onClick="updateDDNSState()">')</script></span></td>
</tr>
<tr><td colspan="2" style="font-weight:bold; color:#FF0000"><script>dw(JS_msq203)</script></td><td></td></tr>
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
