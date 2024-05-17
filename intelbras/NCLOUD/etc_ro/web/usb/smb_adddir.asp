<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="../style/normal_ws.css" type="text/css">
<script language="javascript" src="../js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="../js/common.js"></script>
<script language="javascript" type="text/javascript">
var path_count = 0;
var all_str = "<% getCfgGeneral(1, "AdmUsers"); %>";
var smb_str = "<% getCfgGeneral(1, "SmbUsers"); %>";

function CheckAlreadyConfig()
{
	var user_count = 0;
	var p = all_str.split(";");
	for(i=0; i<p.length;i++){
		var q=p[i].split(",");
		if(q[2] == 1)
			user_count++;
	}

	if(user_count == 1)
	{
		var p = smb_str.split(";");
		for(i=0; i<p.length;i++){
			var q=p[i].split(",");			
			if(q[2] == document.smb_adddir.allow_user.value){
				alert(JS_msg161);
				return false;
			}
		}
	}
	else{
		for(i=0;i<user_count;i++)
		{
			if (document.smb_adddir.allow_user[i].checked == true){
				var p = smb_str.split(";");
				for(j=0; j<p.length;j++){
					var q=p[j].split(",");
					if(q[2] == document.smb_adddir.allow_user[i].value){
						alert(JS_msg161);
						return false;
					}
				}
			}
		}
	}		

	return true;
}

function formCheck()
{
	var cnt = 0;
	//var parentwin=window.opener;
	var currentDir="";
	var part_tmp="";
	var smbdir=document.smb_adddir.dir_name.value;
	
	if (!blankCheckDir(smbdir, MM_dir_name)) 
		return false;
	
	if (!stringCheck(smbdir, MM_dir_name)) 
		return false;
	if (!checkStringValue(smbdir, MM_dir_name)) {
		alert(JS_msg167);
		return false;
	}
	currentDir=smbdir;
	var entrys=smb_str.split(";");
	for(var i=0;i<entrys.length;i++){
		part_tmp=entrys[i].split(",")[0];
		if(part_tmp==currentDir){
			alert(JS_msg190);
			return false;
		}
	
	}
	
	document.smb_adddir.dir_name.value=smbdir.toLocaleLowerCase();
	var p = all_str.split(";");
	for(i=0; i<p.length;i++){
		var q=p[i].split(",");
		if(q[3] == 1)
			cnt++;
	}

	if(cnt==1){
		if (document.smb_adddir.allow_user.checked == false)
		{
			alert(JS_msg160);
			return false;
		}
	}
	else if(cnt >1)
	{
		for(i=0;i<cnt;i++)
		{
			if (document.smb_adddir.allow_user[i].checked == true)
				break;
		}
		if (i == cnt)
		{
			alert(JS_msg160);
			return false;
		}
	}

	if (path_count <= 0){
		alert(JS_msg36);
		return false;
	}else if (path_count == 1){
		if (document.smb_adddir.dir_path.checked == false){
			alert(JS_msg159);
			return false;
		}
	}else if (path_count > 1){
		for(i=0;i<path_count;i++){
			if (document.smb_adddir.dir_path[i].checked == true)
				break;
		}
		
		if (i == path_count){
			alert(JS_msg159);
			return false;
		}
	}

	if(!CheckAlreadyConfig())
		return false;
		
	return true;
}

function submit_apply()
{
	if (formCheck() == true){
		document.smb_adddir.submit();
		opener.location.reload();
		setTimeout("window.close()",300);
		//window.close();
	}
}

function checkDirName(obj,dirname){
	for(var i=0;i<obj.rows.length;i++){
		if(obj.rows[i].cells[2].innerHTML==dirname){
			return false;
		}
	}
	return true;
}
function getCheckedDir(){
	var tabs = document.getElementById("dirList");
	var radios=document.getElementsByName("dir_path")
	for(var i=0;i<radios.length;i++){
		if(radios[i].checked){
			return tabs.rows[i].cells[1].innerHTML;
		}
	}
	return "/media";
}
function addDirClose()
{
	opener.location.reload();
}
function keyNumAll(evt,str){ 
    var smbdir=document.smb_adddir.dir_name.value;
	evt = (evt) ? evt : ((window.event) ? window.event : ""); //兼容IE和Firefox获得keyBoardEvent对象
	var key = evt.keyCode?evt.keyCode:evt.which;//兼容IE和Firefox获得keyBoardEvent对象的键值 
     if(key == 13){   
     if(/[^\d\.\-\_\a-zA-Z\u4E00-\u9FA5]/gi.test(str)){
	  alert(JS_msg167);
	  document.smb_adddir.dir_name.value="";
	  return false;
	  }
	 else if(str=="")
         return false;
	} 
	return true;
}   
</script> 
</script>
</head>
<body onUnload="addDirClose()">
<table width=600><tr><td>
<form method=post name="smb_adddir" action="/goform/Smb_Add">
<input type="hidden" name="submit-url" value="/usb/smb_srv.asp">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_add_smb_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr> 
<td class="thead"><script>dw(MM_dir_name)</script>:</td>
<td><input type=text name=dir_name maxlength=16 value="" onkeypress="return keyNumAll(event,this.value)"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_access_user)</script>:</td>
<td>
<% SmbGetUser(); %>
</td>
</tr>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=3>
<tr><td class="title3" colspan="2"><script>dw(MM_access_path);</script></td></tr>
<tr class="title4" align=center>
<td></td>
<td><b><script>dw(MM_dir_path)</script></b></td>
<td><b><script>dw(MM_partition)</script></b></td>
</tr>
<tbody id="dirList">
<% ShowAllDir(); %>
</tbody>
<script language="javascript">
path_count = parseInt('<% getCount(1, "AllDir"); %>');
</script>
</table>

<br>
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td>
<script>dw('<input type=button class=button value="'+BT_apply+'" onClick="submit_apply()"> &nbsp; &nbsp;\
<input type=button class=button value="'+BT_close+'" onClick="window.close()">')</script>
</td>
</tr>
</table>
</form>

</td></tr></table>
</body></html>
