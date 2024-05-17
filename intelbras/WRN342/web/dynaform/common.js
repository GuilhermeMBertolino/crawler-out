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
	var i=Math.ceil((window.screen.width - 160)*0.55) - 6;
    return i;
}

function LoadHelp(helpFileName) 
{
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

//功能函数
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
        alert(str_pages.ntw_common_js.js_input_ip);
        return false;
    }
	if (!lastipverify(lastip_string,nMin,nMax))
    {
        alert(str_pages.ntw_common_js.js_bad_ip);
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
	for(i = 0; i < 4; i++)
	{
		if (szarray[i] < 0 || szarray[i] > 255)
		{
			return false;
		}
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
    if(szarray[0]==127 && szarray[1]==0 && szarray[2]==0) //检查环回地址
    {
        return false;
    }
    if(szarray[0] >= 224 && szarray[0] <=239) //检查多播
    {
        return false;
    }	
	return true;	
}

function is_ipaddr(ip_string)
{
	if(ip_string.length == 0)
	{
        alert(str_pages.ntw_common_js.js_input_ip_2);
		return false;
	}  
	if (!ipverify(ip_string))
	{  
        alert(str_pages.ntw_common_js.js_bad_ip_2);
		return false;
	}	
	return true;
}
function is_gatewayaddr(gateway_string)
{
	if(gateway_string.length == 0)
	{ 
        alert(str_pages.ntw_common_js.js_input_gateway);
		return false;
	}
	if (!ipverify(gateway_string))
	{
        alert(str_pages.ntw_common_js.js_bad_gateway);
		return false;
	}	
	return true;
}
function is_dnsaddr(dns_string)
{
	if(dns_string.length == 0)
    {
        alert(str_pages.ntw_common_js.js_input_dns);
        return false;
    }
	if (!ipverify(dns_string))
    {
        alert(str_pages.ntw_common_js.js_bad_dns);
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
            alert(str_pages.ntw_common_js.js_illegal_input);
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
                alert(str_pages.ntw_common_js.js_illegal_input);
                return false;
            }
        }
        
		if(ch.indexOf(c) == -1 )
		{
           if(c !=" ")
           {
                alert(str_pages.ntw_common_js.js_illegal_input);
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
	if (parseInt(port_string,10) <= 0 || parseInt(port_string,10) >=65535)
    {
		return false;
    }
	return true;
}

function is_port(port_string)
{
	if(port_string.length == 0)
    {
        alert(str_pages.ntw_common_js.js_input_port);
		return false;
	}
	if (!portverify(port_string))
    {
        alert(str_pages.ntw_common_js.js_bad_port);
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
        alert(str_pages.ntw_common_js.js_input_mask);
		return false;
	}
	if (!maskipverify(mask_string))
    {
        alert(str_pages.ntw_common_js.js_bad_mask);
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
		alert(str_pages.ntw_common_js.js_broadcast_mac);
		return false;
	}
	
	if (lcMac == "00-00-00-00-00-00")
	{
		 alert(str_pages.ntw_common_js.js_invalid_mac);
		return false;
	}
	
	if (mac_string.length != 17)
	{
        alert(str_pages.ntw_common_js.js_bad_mac_format);
		return false;
	}
	for (var i = 0; i < lcMac.length; i++)
    {
		c = lcMac.charAt(i);
		if (i % 3 == 2)
		{
			if(c != '-')
			{
				alert(str_pages.ntw_common_js.js_bad_mac_format);
				return false;
			}
		}
		else if (ch.indexOf(c) == -1)
        {
            alert(str_pages.ntw_common_js.js_invalid_mac);
			return false;
        }
	}
	c = lcMac.charAt(1);
	if (ch.indexOf(c) % 2 == 1)
	{
		alert(str_pages.ntw_common_js.js_multi_mac);
		return false;
	}	
	return true;	
}

function is_macaddr(mac_string)
{
    if(mac_string.length == 0)
    {
        alert(str_pages.ntw_common_js.js_input_mac);
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
        alert(str_pages.ntw_common_js.js_input_msg);
        return false;
    }
    else
    return true;
}


function is_port_range(port_value)
{

	if(port_value < 0 || port_value > 65534)
	{
        alert(str_pages.ntw_common_js.js_bad_port);
		return false;
	}
	else
	{
		return true;
	}
}
