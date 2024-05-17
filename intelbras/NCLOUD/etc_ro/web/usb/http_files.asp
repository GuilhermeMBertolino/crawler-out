<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript">
var break_continue=0;
var __AjaxReq = null;
var __update_wan_conn_status_period=4000;

var usb_storage_dev_array=new Array(16);
function get_by_id(id)
{
	with(document)
	{
		return getElementById(id);
	}
}

function update_usb_connect(connection)
{  
	var usb_connect_disk="";
	var usb_connect;
	var usbinfo;
	var mySplitResult;
	usb_connect_disk='<table width=700 border=0>';
	usb_connect_disk+='<tr><td colspan="5">&nbsp;</td></tr>';
	usb_connect_disk+='<tr><td colspan="5">'+MM_shared_partitions+':</td></tr>';
	usb_connect = connection;
	mySplitResult= usb_connect.split("?");
	if(mySplitResult[0]!='0'){
	usb_connect_disk+='<tr align="center"><td>'+MM_disk_name+'</td><td>'+MM_disk_size+'</td><td>'+MM_used_size+'</td><td>'+MM_free_size+'</td><td>'+MM_percent+'</td></tr>';
	
			usb_connect_disk +='<tr align="center"><td><img src="/graphics/dir.gif" border=0 width=16 height=16><a href="/sda1/">'+mySplitResult[0]+'</a></td>';
			usb_connect_disk +='<td>'+mySplitResult[1]+'</td><td>'+mySplitResult[2]+'</td><td>'+mySplitResult[3]+'</td><td>'+mySplitResult[4]+'</td></tr>';
	
		
	}
	else
	{
		usb_connect_disk +='<tr><td><font color="#808080">'+JS_INFO7+'</font></td><td colspan="4">&nbsp;</td></tr>';
	}
	/*usb_connect_disk+='<tr><td colspan="5"><hr size=1 noshade align=top></td></tr></tbody></table>';*/
	usb_connect_disk+='<tr><td colspan="5"><hr size=1 noshade align=top></td></tr>';
	usb_connect_disk+='</table>';
	document.getElementById("usb_connect_status").innerHTML=usb_connect_disk;
	
}
function get_by_name(name)
{
	with(document){
		return getElementsByName(name);
	}
}
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

function __send_request(url)
{
	if (__AjaxReq == null) __AjaxReq = __createRequest();
	__AjaxReq.open("GET", url, true);
	__AjaxReq.onreadystatechange = __update_page;
	__AjaxReq.send(null);
}

function generate_random_str()
{
	var d = new Date();
	var str=d.getFullYear()+"."+(d.getMonth()+1)+"."+d.getDate()+"."+d.getHours()+"."+d.getMinutes()+"."+d.getSeconds();
	return str;
}

function __update_state()
{
	__send_request("/usb/usb_conninfo.asp?t="+generate_random_str());
}

function __update_page()
{
	var conn_msg="";
	if (__AjaxReq != null && __AjaxReq.readyState == 4)
	{
		if (__AjaxReq.responseText.substring(0,3)=="var")
		{
			eval(__AjaxReq.responseText);
			switch (__result[0])
			{
				case "OK":
				update_usb_connect(__result[1]);
				default :
					break;
			}
			setTimeout("__update_state()", __update_wan_conn_status_period);
			delete __result;
		}
	}
}

function change_chk_page()
{
	var i;
	__update_state();
}

function Apply_Changel()
{
	break_continue=1;
	return true;
}
function revert()
{
	document.usb_mount.submit_code.value="ON";
	document.usb_mount.submit();
}
function corevert()
{
	document.usb_mount.submit_code.value="OFF";
	document.usb_mount.submit();
}
</script>
</head>
<body class="mainbody" onLoad="change_chk_page();">
<blockquote>
<h2 class="mainbiao"><script>dw(MM_usb_storage)</script></h2>
<div id="check_usb_connect_status" style="display:none"></div>
<table border=0 width=700>
<tr><td><script>dw(JS_INFO1)</script></td></tr>
<tr><td><hr size=1 noshade align=top></td></tr>
</table>

<form method="post" action="/boafrm/formusb_mount" name="usb_mount">
<input type="hidden" value=""  name="submit_code">
<input type="hidden" value="/http_files.htm"  name="submit-url">
<div id="usb_connect_status"  style="display:block"></div>
<br>
<p><script>dw('<input type="button" class="but02" name="Apply" value="'+MM_mount+'" onClick="revert()">&nbsp;&nbsp;\
<input type="button" class="but02" name="Close" value="'+MM_unmount+'" onClick="corevert()">')</script></p>
</form>
</blockquote>
</body>
</html>
