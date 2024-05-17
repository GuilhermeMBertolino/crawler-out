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

function   checkMask1(sIPAddress)   
{   
	var   exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;   
	var   reg   =   sIPAddress.match(exp);   
	if(reg==null)   
		return false;
	else   
		return true;
} 

function checkMask2(ulMask)
{
	var ulMask1=Math.floor(ulMask/0x40000000);
	var remainder1=Number(ulMask%0x40000000)
	if (ulMask1<=1)//0xxxxxx
		return false;
	
	if ((ulMask1==2)&&(remainder1!=0))//10xxxxx
		return false;

	ulMask = Number(remainder1*2);
	while(ulMask & 0x40000000)
	{
		remainder1=Number(ulMask%0x40000000)
		ulMask = Number(remainder1*2);	
	}

	if ( ulMask == 0 )
		return true;
	else
		return false;
	
}

function zip( a, b, c, d)
{
   //attention, '*16777216' is equal to '<<24', but here must be  '*16777216'
   var  re = 0;
   re=(Number(a)*16777216)+(Number(b)<<16)+(Number(c)<<8)+(Number(d));
    return re;
}

function unzip( zipc, flag)
{
	var var1=Math.floor(Number(zipc/16777216));
	var remainder1=Number(zipc%16777216);
	var var2=Math.floor(remainder1/65536);
	var remainder2=Math.floor(remainder1%65536);
	var var3=Math.floor(remainder2/256);
	var var4=Math.floor(remainder2%256);
	
	if(flag==1)
	{
		var ip1 = var1+'.'+ var2 +'.'+ var3 +'.'+ var4;
		document.lanCfg.dhcpstart.value = ip1;
	}
	else if(flag==2)
	{
		var ip2 = var1+'.'+ var2 +'.'+ var3 +'.'+ var4;	
		document.lanCfg.dhcpend.value = ip2;
	}

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
		alert(JS_msg156);
		return 1;
	}  
	
	return 0;
}

function firstIP( IP,mask)
{
	var ip1=Math.floor(IP/4);
	var ip2=Number(IP%4);

	var mask1=Math.floor(mask/4);
	var mask2=Number(mask%4);

	var network=Number(ip1&mask1)*4+Number(ip2&mask2);//3221225472
	var firstIPAdd = network+1+1;
	unzip(firstIPAdd,1);
}   

function lastIP(IP,mask)
{
    	var ip1=Math.floor(IP/4);
	var ip2=Number(IP%4);
	var mask1=Math.floor(mask/4);
	var mask2=Number(mask%4);
	var network=Number(ip1&mask1)*4+Number(ip2&mask2);
	var network1=Math.floor(network/2);
	var network2=Number(network%2);
	var lastIPAdd=Number(network2|((~mask)%2))+Number(network1|((~mask)/2))*2-1;	
	unzip(lastIPAdd,2);       
} 

function formCheck()
{
	if (!ipCheck(document.lanCfg.lanIp.value, MM_ipaddr)) 
		return false;
		
	if (document.lanCfg.lanIp.value == "127.0.0.1" || document.lanCfg.lanIp.value == "224.0.0.1" || document.lanCfg.lanIp.value == "240.0.0.1")	{
		alert(JS_msq208);
		return false;
	}
	
	if (!maskCheck(document.lanCfg.lanNetmask.value, MM_submask))
		return false;

	var ip = document.lanCfg.lanIp.value.split('.');
	var mask = document.lanCfg.lanNetmask.value.split('.');

	var ipadd1 = ip[0];
	var ipadd2 = ip[1];
	var ipadd3 = ip[2];
	var ipadd4 = ip[3];
	var maskadd1 = mask[0];
	var maskadd2 = mask[1];
	var maskadd3 = mask[2];
	var maskadd4 = mask[3];

	var _mask = maskadd1+'.'+ maskadd2 +'.'+ maskadd3 +'.'+ maskadd4;

	if(false== checkMask1(_mask))
	{
		alert(JS_msg156);
		return false;
	}

	if(!checkMask2(Number(zip(maskadd1,maskadd2,maskadd3,maskadd4))))
	{
		alert(JS_msg156);
		return false;
	}

	if(IpMaskConfilict(zip(ipadd1, ipadd2, ipadd3, ipadd4),zip(maskadd1,maskadd2,maskadd3,maskadd4)))
		return false;

	firstIP(zip(ipadd1, ipadd2, ipadd3, ipadd4),zip(maskadd1,maskadd2,maskadd3,maskadd4));
	lastIP(zip(ipadd1, ipadd2, ipadd3, ipadd4),zip(maskadd1,maskadd2,maskadd3,maskadd4));
	
	document.lanCfg.target="win78target";
	win78reload();
	
	return true
}
function resultFun(data)
{
	if(data=="" || data==null)
		win78reload();
	else
		window.location.href='/internet/lan.asp';
}

function errorFun(readyState,status)
{
	win78reload();
}

function win78reload()
{
	setTimeout(function(){Ajax.getInstance('/login.asp','',0,resultFun,errorFun);Ajax.get();},"5000");
}
</script>
</head>

<body>
<table width=700><tr><td>
<form method=post name="lanCfg" action="/goform/setLan">
<input type="hidden" name="submit-url" value="/internet/lan.asp">
<input type="hidden" name="dhcpstart">
<input type="hidden" name="dhcpend">
<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr><td class="title"><script>dw(MM_lan_settings)</script></td></tr>
<tr><td><hr></td></tr>
</table>

<table width=100% border=0 cellpadding=3 cellspacing=1> 
<tr>
<td class="thead"><script>dw(MM_macaddr)</script>:</td>
<td><% getLanMac(); %></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_ipaddr)</script>:</td>
<td><input name="lanIp" maxlength=15 value="<% getLanIp(); %>"></td>
</tr>
<tr>
<td class="thead"><script>dw(MM_submask)</script>:</td>
<td><input name="lanNetmask" maxlength=15 value="<% getLanNetmask(); %>"></td>
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

</td></tr></table>
<iframe id="win78iframe" class="hidden" name="win78target"></iframe>
</body></html>
