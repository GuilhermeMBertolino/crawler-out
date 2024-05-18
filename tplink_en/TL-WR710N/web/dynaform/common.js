var rateTable_300M = new Array(
	"1Mbps",		1,
	"2Mbps",		1,
	"5.5Mbps",	1,
	"6Mbps",		6,
	"7Mbps",		8,
	"9Mbps",		6,
	"11Mbps",		1,
	"12Mbps",		6,
	"13Mbps",		8,
	"15Mbps",		16,
	"18Mbps",		6,
	"21Mbps",		8,
	"24Mbps",		6,
	"26Mbps",		8,
	"30Mbps",		16,
	"36Mbps",		6,
	"39Mbps",		8,
	"45Mbps",		16,
	"48Mbps",		6,
	"52Mbps",		8,
	"54Mbps",		6,
	"60Mbps",		16,
	"65Mbps",		8,
	"72Mbps",		8,
	"78Mbps",		8,
	"90Mbps",		16,
	"104Mbps",	8,
	"117Mbps",	8,
	"120Mbps",	16,
	"130Mbps",	8,
	"135Mbps",	16,
	"150Mbps",	16,
	"180Mbps",	16,
	"240Mbps",	16,
	"270Mbps",	16,
	"300Mbps",	16, 
	0,0 );

var rateTable_450M = new Array(		
	"1Mbps",		5,
	"2Mbps",		5,
	"5.5Mbps", 	1,
	"6Mbps",		6,
	"9Mbps",		6,
	"11Mbps",		1,
	"12Mbps",		6,
	"18Mbps",		6,
	"19.5Mbps",	8,
	"21.7Mbps",	8,
	"24Mbps",		6,
	"36Mbps",		6,
	"39Mbps",		8,
	"40.5Mbps",	16,
	"43.3Mbps",	8,
	"45Mbps",		16,
	"48Mbps",		6,
	"54Mbps",		6,
	"58.5Mbps",	8,
	"65Mbps",		8,
	"78Mbps",		8,
	"81Mbps",		16,
	"86.7Mbps",	8,
	"90Mbps",		16,
	"117Mbps", 	8,
	"121.5Mbps",	16,
	"130Mbps", 	8,
	"135Mbps", 	16,
	"156Mbps", 	8,
	"162Mbps", 	16,
	"173.3Mbps",	8,
	"175.5Mbps",	8,
	"180Mbps", 	16,
	"195Mbps", 	8,
	"216.7Mbps",	8,
	"243Mbps", 	16,
	"270Mbps", 	16,
	"324Mbps", 	16,
	"360Mbps", 	16,
	"364.5Mbps",	16,
	"405Mbps", 	16,
	"450Mbps", 	16,
	0,0 );
	
var operModeNum = 9;
var minOperMode = 0;
var maxOperMode = operModeNum;
var operModeList = new Array(
//value	enabled	name
	0,		1,			"Access Point",
	1,		0,			"Multi-SSID",
	2,		0,			"Multi-Bss Plus VLAN",
	3,		1,			"Client",
	4,		0,			"WDS Repeater",
	5,		1,			"Universal Repeater",
	6,		0,			"Bridge with AP",	//(wds)
	7,		0,			"Bridge with AP",//(nawds)
	8,		0,			"Debug"
);
function getOperModeName(modeIdx)
{
	if(modeIdx<minOperMode || modeIdx>maxOperMode)
	{
		return null;
	}
	if(operModeList[modeIdx*3+1]==0)
	{
		return null;
	}
	else
	{
		return operModeList[modeIdx*3+2];
	}
}

function operModeEnable(modeIdx)
{
	if(modeIdx<minOperMode || modeIdx>maxOperMode)
	{
		return null;
	}
	if(operModeList[modeIdx*3+1]==0)
	{
		return false;
	}
	else
	{
		return true;
	}
}

function getOperModeValue(modeIdx)
{
	if(modeIdx<minOperMode || modeIdx>maxOperMode)
	{
		return null;
	}
	if(operModeList[modeIdx*3+1]==0)
	{
		return null;
	}
	else
	{
		return operModeList[modeIdx*3];
	}
}
function getOperModeIdxByValue(modeValue)
{
	for(var i=0; i<operModeNum; i++)
	{
		if(operModeList[i*3] == modeValue)
			return i;
	}
	return null;
}

function disableTag(obj, tag, type)
{
	try
	{
		var items = obj.getElementsByTagName(tag);
	}
	catch(e)
	{
		return;
	}
	if (type == undefined)
	{
		for (var i = 0; i < items.length; i++)
		{
			items[i].disabled = true;
		}
	}
	else
	{
		for (var i = 0; i < items.length; i++)
		{
			if (items[i].type == type)
				items[i].disabled = true;
		}		
	}
}

//setTagStr(document,'ntw_common_js')
var str_pages = parent.pages_js;
var str_main = parent.str_main;

function setTagStr(obj,page)
{
	var e, ee;
	var i, n;
	var items;
	if( (undefined==str_pages) || (undefined == str_main) )
	{
		return;
	}
	if( (undefined == obj) || (undefined == page) )
	{
		return;
	}
	for ( tag in str_pages[page] )
	{
		try
		{
			if(!window.ActiveXObject)
			{
				items = obj.getElementsByName(tag);
				if(items.length > 0)
				{
					for(i = 0; i < items.length; i++)
					{
						items[i].innerHTML = str_pages[page][tag];
					}
				}
				else
				{
					obj.getElementById(tag).innerHTML = str_pages[page][tag];
				}
			}
			else
			{
				items = obj.all[tag];
				if(undefined != items.length && items.length > 0)
				{
					for(i = 0; i < items.length; i++)
					{
						items[i].innerHTML = str_pages[page][tag];
					}
				}
				else
				{
					items.innerHTML = str_pages[page][tag];
				}
			}
		}
		catch(e)
		{
			continue;
		}
	}

	for ( btn in str_main.btn )
	{
		try
		{
			obj.forms[0][btn].value = str_main.btn[btn];
		}
		catch(e)
		{
			continue;
		}
	}
}

function GetMinWidth()
{
	var i=Math.ceil((window.screen.width - 182)*0.55) - 6;
    return i;
}

function LoadHelp(helpFileName) 
{
       if(window.parent != window)
	   {
		   	if (window.parent.topFrame.hl != helpFileName)
			{
		        window.parent.topFrame.hl = helpFileName;
				window.parent.helpFrame.location.href = "/help/" + helpFileName;
			}
	   }
       return true;   
	   }

function resize(obj)
{
var minWidth = GetMinWidth();
if (window.document.body.offsetWidth > minWidth)
    {
        obj.document.getElementById('autoWidth').style.width = "100%";
    }
 else
    {
        obj.document.getElementById('autoWidth').style.width = minWidth;
    }
        return true; 
}

function resizeHelp(obj)
{
if (window.document.body.offsetWidth > 290)
    {
        obj.document.getElementById('autoWidth').style.width = "100%";
    }
 else
    {
        obj.document.getElementById('autoWidth').style.width = 290;
    }
    return true; 
}

function elementDisplay(obj, tag, disStr)
{
    	try
        {		
    		if(!window.ActiveXObject)
            {
				items = obj.getElementsByName(tag);
				if(items.length > 0)
				{
					for(i = 0; i < items.length; i++)
					{
						items[i].style.display = disStr;
					}
				}
				else
				{
					obj.getElementById(tag).style.display = disStr;
				}				
    		}
			else
			{
				items = obj.all[tag];
				if(undefined != items.length && items.length > 0)
				{
					for(i = 0; i < items.length; i++)
					{
						items[i].style.display = disStr;
					}
				}
			}
		}
		catch(e)
		{
    		return;
		}
}

function disableTag(obj, tag, type)
{
	try
	{
		var items = obj.getElementsByTagName(tag);
	}
	catch(e)
	{
		return;
	}
	if (type == undefined)
	{
		for (var i = 0; i < items.length; i++)
		{
			items[i].disabled = true;
		}
	}
	else
	{
		for (var i = 0; i < items.length; i++)
		{
			if (items[i].type == type)
				items[i].disabled = true;
		}		
	}
}

function LoadNext(FileName)
{
if(window.parent != window)
	window.parent.mainFrame.location.href = FileName;
    return true; 
}

function lastipverify(lastip,nMin,nMax)
{
	var c;
	var n = 0;
	var ch = "0123456789";
	if(lastip.length == 0)
		return false;
	for (var i = 0; i < lastip.length; i++)
    {
        c = lastip.charAt(i);
        if (ch.indexOf(c) == -1)
            return false;
    }
	if (parseInt(lastip,10) < nMin || parseInt(lastip,10) > nMax)
		return false; 		
	return true;	
}

function is_lastip(lastip_string,nMin,nMax)
{
	if(lastip_string.length == 0)
    {
        alert(js_input_ip="Please input an IP address(1-254)!");
        return false;
    }
	if (!lastipverify(lastip_string,nMin,nMax))
    {
        alert(js_bad_ip="The IP address is invalid, please input another one(1-254)!");
		return false;
	}	
	return true;
}

function maskipverify(ip_string)
{
	var c;
	var n = 0;
	var ch = ".0123456789";
	if (ip_string.length < 7 || ip_string.length > 15)
		return false;
	for (var i = 0; i < ip_string.length; i++)
    {
		c = ip_string.charAt(i);
		if (ch.indexOf(c) == -1)
			return false;
		else
        {
			if (c == '.')
            {
				if(ip_string.charAt(i+1) != '.')
					n++;
				else
					return false;
			}		
		}
	}
	if (n != 3)
		return false;
   
	if (ip_string.indexOf('.') == 0 || ip_string.lastIndexOf('.') == (ip_string.length - 1))
		return false; 
		
	szarray = [0,0,0,0];
	var remain;
	var i;
	for(i = 0; i < 3; i++)
    {
		var n = ip_string.indexOf('.');
		szarray[i] = ip_string.substring(0,n);
		remain = ip_string.substring(n+1);
		ip_string = remain;
	}
	szarray[3] = ip_string;
	
	var correct_range={128:1, 192:1, 224:1, 240:1, 248:1, 252:1, 254:1, 255:1, 0:1};
	for(i = 0; i < 4; i++)
	{
		if(!(szarray[i] in correct_range))
		{
			return false;
		}
	}
	if((szarray[0]==0) || (szarray[0]!=255&&szarray[1]!=0) || (szarray[1]!=255&&szarray[2]!=0) || (szarray[2]!=255&&szarray[3]!=0))
	{
		return false;
	}		
	return true;	
}

function ipverify(ip_string)
{    
	var c;
	var n = 0;
	var ch = ".0123456789";
	if (ip_string.length < 7 || ip_string.length > 15)
		return false;     
	for (var i = 0; i < ip_string.length; i++)
    {
        c = ip_string.charAt(i);
        if (ch.indexOf(c) == -1)
            return false;
        else
        {
            if (c == '.')
            {
                if(ip_string.charAt(i+1) != '.')
                n++;
                else
                return false;
            }		
        }
    }
	if (n != 3) 
		return false;
	if (ip_string.indexOf('.') == 0 || ip_string.lastIndexOf('.') == (ip_string.length - 1))
		return false;
	szarray = [0,0,0,0];
	var remain;
	var i;
    for(i = 0; i < 3; i++)
    {
        var n = ip_string.indexOf('.');
        szarray[i] = ip_string.substring(0,n);
        remain = ip_string.substring(n+1);
        ip_string = remain;
    }
	szarray[3] = remain;
	for(i = 0; i < 4; i++)
	{
		if (szarray[i] < 0 || szarray[i] > 255)
		{
            return false;
		}
	}		
    if(szarray[0]==127)
    {
        return false;
    }
    if(szarray[0] >= 224 && szarray[0] <=239)
    {
        return false;
    }	
	return true;	
}
function is_ipaddr(ip_string)
{
	if(ip_string.length == 0)
	{
        alert(js_input_ip_2="Please input an IP address!");
		return false;
	}
	if (!ipverify(ip_string))
	{  
        alert(js_bad_ip_2="The IP address is invalid, please input another one!");
		return false;
	}	
	return true;
}
function is_gatewayaddr(gateway_string)
{
	if(gateway_string.length == 0)
	{ 
        alert(js_input_gateway="Please input the Gateway!");
		return false;
	}
	if (!ipverify(gateway_string))
	{
        alert(js_bad_gateway="The gateway is invalid, please input another one!");
		return false;
	}	
	return true;
}
function is_dnsaddr(dns_string)
{
	if(dns_string.length == 0)
    {
        alert(js_input_dns="Please input the DNS server address!");
        return false;
    }
	if (maskipverify(dns_string))
	{
		alert(js_bad_dns="The DNS server address is invalid, please input another one!");
		return false;
	}
	if (!ipverify(dns_string))
    {
        alert(js_bad_dns="The DNS server address is invalid, please input another one!");
		return false;
	}	
	return true;
}
function is_domain(domain_string)
{
	var c;
	var ch = "-.ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < domain_string.length; i++)
    {
        c = domain_string.charAt(i);
        if (ch.indexOf(c) == -1)
        {
            alert(js_illegal_input="The input value contains illegal characters, please input another one!");
            return false;
        }
    }		
		return true;
}

function is_digit(digit_string)
{
	var c;
	var ch = "0123456789";
	for (var i = 0; i < digit_string.length; i++)
	{
        c = digit_string.charAt(i);
        
        if(c == " " && i ==1)
        {
            continue;
        }
        
        if(i > 0)
        {
             if(digit_string.charAt(i-1) == " " && c == " ")
             {
                continue;
             }
            
            if(digit_string.charAt(i-1) != " " && c == " ")
            {
                alert(js_illegal_input="The input value contains illegal characters, please input another one!");
                return false;
            }
        }
        
		if(ch.indexOf(c) == -1 )
		{
           if(c !=" ")
           {
                alert(js_illegal_input="The input value contains illegal characters, please input another one!");
    			return false;
           }
		}
	}
	return true;
}

function portverify(port_string)
{
	var c;
	var ch = "0123456789";
	if(port_string.length == 0)
		return false;
	for (var i = 0; i < port_string.length; i++)
    {
		c = port_string.charAt(i);
		if (ch.indexOf(c) == -1)
			return false;
	}
	if (parseInt(port_string,10) <= 0 || parseInt(port_string,10) > 65535)
    {
		return false;
    }
	return true;
}

function is_port(port_string)
{
	if(port_string.length == 0)
    {
        alert(js_input_port="Please input the port number (1-65535)!");
		return false;
	}
	if (!portverify(port_string))
    {
        alert(js_bad_port="The port number is invalid, please input another one(1-65535)!");
		return false;
	}	
	return true;
}

function is_number(num_string,nMin,nMax)
{
	var c;
	var ch = "0123456789";
	for (var i = 0; i < num_string.length; i++)
    {
		c = num_string.charAt(i);
		if (ch.indexOf(c) == -1)
        {
            return false;
        }
	}
	if(parseInt(num_string,10) < nMin || parseInt(num_string,10) > nMax)
    {
		return false;
    }
	return true;
}

function is_maskaddr(mask_string)
{
	if(mask_string.length == 0)
    {
        alert(js_input_mask="Please input the Subnet Mask (for example: 255.255.255.0)!");
		return false;
	}
	if (!maskipverify(mask_string))
    {
        alert(js_bad_mask="The Subnet Mask is invalid, please input another one (for example: 255.255.255.0)!");
		return false;
	}	
	return true;
}

function macverify(mac_string)
{
	var c;
	var ch = "0123456789abcdef";
	var lcMac = mac_string.toLowerCase();
	
	if (lcMac == "ff-ff-ff-ff-ff-ff")
	{
		alert(js_broadcast_mac="The MAC address is a broadcast MAC address, please input again!");
		return false;
	}
	
	if (lcMac == "00-00-00-00-00-00")
	{
		 alert(js_invalid_mac="Invalid MAC address, please input another one!");
		return false;
	}
	
	if (mac_string.length != 17)
	{
        alert(js_bad_mac_format="The MAC address format is invalid! The valid format is '00-00-00-00-00-00'.");
		return false;
	}
	for (var i = 0; i < lcMac.length; i++)
    {
		c = lcMac.charAt(i);
		if (i % 3 == 2)
		{
			if(c != '-')
			{
				alert(js_bad_mac_format="The MAC address format is invalid! The valid format is '00-00-00-00-00-00'.");
				return false;
			}
		}
		else if (ch.indexOf(c) == -1)
        {
            alert(js_invalid_mac="Invalid MAC address, please input another one!");
			return false;
        }
	}
	c = lcMac.charAt(1);
	if (ch.indexOf(c) % 2 == 1)
	{
		alert(js_multi_mac="The MAC address is a multicast MAC address, please input again!");
		return false;
	}	
	return true;	
}

function is_macaddr(mac_string)
{
    if(mac_string.length == 0)
    {
        alert(js_input_mac="Please input the MAC address!");
		return false;
	}
	if (!macverify(mac_string))
	{
		return false;
	}
	return true;	
}

function charCompare(szname,limit)
{
	var c;
	var l=0;
	var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@^-_.><,[]{}?/+=|\\'\":;~!#$%()` & ";
	if(szname.length > limit)
		return false;
	for (var i = 0; i < szname.length; i++)
    {
		c = szname.charAt(i);
		if (ch.indexOf(c) == -1)
        {
			l += 2;
		}
		else
		{
			l += 1;
		}
		if ( l > limit)
		{
			return false;
		}
	}
	return true;
}

function is_hostname(name_string,limit)
{
    if(!charCompare(name_string,limit))
    {
        alert(js_input_msg="You can input up to 30 characters, please input again!");
        return false;
    }
    else
    return true;
}


function is_port_range(port_value)
{

	if(port_value < 0 || port_value > 65535)
	{
        alert(js_bad_port="Invalid port value! The port must be between 1~65535, please input another one!");
		return false;
	}
	else
	{
		return true;
	}
}
