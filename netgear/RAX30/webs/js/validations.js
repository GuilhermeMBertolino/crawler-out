function ip_range_check(startIp, endIp)
{
    var total1 = 0;
    var total2 = 0;
    startIp = startIp.split(".");
    endIp = endIp.split(".");
    total1 += parseInt(startIp[3],10);
    total1 += parseInt(startIp[2],10)*256;
    total1 += parseInt(startIp[1],10)*256*256;
    total1 += parseInt(startIp[0],10)*256*256*256;
    
    total2 += parseInt(endIp[3],10);
    total2 += parseInt(endIp[2],10)*256;
    total2 += parseInt(endIp[1],10)*256*256;
    total2 += parseInt(endIp[0],10)*256*256*256;
    
    return total2 > total1;
}

function ip2int(ip) {
  var sip = ip.split('.');
  return (sip[0] << 24) | (sip[1] << 16) | (sip[2] << 8) | (sip[3]);
}

function checkEthIpRange(netmask,ip)
{
    var resultAddValueNumber = ip2int(ip);
    var ipLeftNumber = (ip2int(ip) & ip2int(netmask)) +1;
    var ipRightNumber = (ip2int(ip) & ip2int(netmask))| (~(ip2int(netmask))) -1;
    if (resultAddValueNumber <= ipLeftNumber || resultAddValueNumber > ipRightNumber){
        return true;
    }
    else{
        return false;
    }
}

function checkEthMask(ip, max)
{
    if(!ip)
      return true;
    var sp_ip = ip.split('.');
    var ip1 = sp_ip[0];
    var ip2 = sp_ip[1];
    var ip3 = sp_ip[2];
    var ip4 = sp_ip[3];

    if (sp_ip[3] > max) return true;

    if((ip1.charAt(0)=="0" && ip1.length!=1) ||
       (ip2.charAt(0)=="0" && ip2.length!=1) ||
       (ip3.charAt(0)=="0" && ip3.length!=1) ||
       (ip4.charAt(0)=="0" && ip4.length!=1))
        return true;

    if((parseInt(ip1)==0)||
       ((parseInt(ip1)==0)&&(parseInt(ip2)==0)&&
        (parseInt(ip3)==0)&&(parseInt(ip4)==0)))
        return true;

    var mask_start   = (255 << 24)  |   (0 << 16)   |   (0 << 8)   |   (0);
    var mask_end     = (255 << 24)  |  (255 << 16)  |  (255 << 8)  | (253);
    var mask_addr = (ip1 << 24) | (ip2 << 16) | (ip3 << 8) | (ip4);

    if((mask_addr < mask_start)&&(mask_addr > mask_end))
        return true;
    return false;
}

function checkEthIP(ip, max) {
    if(!ip)
      return true;
    var sp_ip = ip.split('.');
    var ip1 = sp_ip[0];
    var ip2 = sp_ip[1];
    var ip3 = sp_ip[2];
    var ip4 = sp_ip[3];

    if (sp_ip[3] > max) return true;

    if((ip1.charAt(0)=="0" && ip1.length!=1) ||
       (ip2.charAt(0)=="0" && ip2.length!=1) ||
       (ip3.charAt(0)=="0" && ip3.length!=1) ||
       (ip4.charAt(0)=="0" && ip4.length!=1))
        return true;

    if((parseInt(ip1)==0)||
       ((parseInt(ip1)==0)&&(parseInt(ip2)==0)&&
        (parseInt(ip3)==0)&&(parseInt(ip4)==0)))
        return true;

    var loopback_ip_start   = (127 << 24)  |   (0 << 16)   |   (0 << 8)   |   (0);
    var loopback_ip_end     = (127 << 24)  |  (255 << 16)  |  (255 << 8)  | (255);
    var groupcast_ip_start  = (224 << 24)  |   (0 << 16)   |   (0 << 8)   |   (0);
    var groupcast_ip_end    = (239 << 24)  |  (255 << 16)  |  (255 << 8)  | (255);
    var classE_ip_start     = (240 << 24)  |   (0 << 16)   |   (0 << 8)   |   (0);
    var classE_ip_end       = (255 << 24)  |  (255 << 16)  |  (255 << 8)  | (255);
    var dhcpresv_ip_start   = (169 << 24)  |  (254 << 16)  |   (0 << 8)   |   (0);
    var dhcpresv_ip_end     = (169 << 24)  |  (254 << 16)  |  (255 << 8)  | (255);
    var ip_addr = (ip1 << 24) | (ip2 << 16) | (ip3 << 8) | (ip4);
    if((ip_addr >= loopback_ip_start)&&(ip_addr <= loopback_ip_end))
        return true;
    if((ip_addr >= groupcast_ip_start)&&(ip_addr <= groupcast_ip_end ))
        return true;
    if((ip_addr >= dhcpresv_ip_start)&&(ip_addr <= dhcpresv_ip_end))
        return true;
	if((ip_addr >= classE_ip_start)&&(ip_addr <= classE_ip_end ))
        return true;
    return false;
}

function checkIP(ip, max) {
    if(!ip)
      return true;
    var sp_ip = ip.split('.');
    var ip1 = sp_ip[0];
    var ip2 = sp_ip[1];
    var ip3 = sp_ip[2];
    var ip4 = sp_ip[3];

    if (sp_ip[3] > max) return true;

    if((ip1.charAt(0)=="0" && ip1.length!=1) ||
       (ip2.charAt(0)=="0" && ip2.length!=1) ||
       (ip3.charAt(0)=="0" && ip3.length!=1) ||
       (ip4.charAt(0)=="0" && ip4.length!=1)) 
        return true; 

    if((parseInt(ip1)==0)||
       ((parseInt(ip1)==0)&&(parseInt(ip2)==0)&&
        (parseInt(ip3)==0)&&(parseInt(ip4)==0)))
        return true;

    var loopback_ip_start   = (127 << 24)  |   (0 << 16)   |   (0 << 8)   |   (0);
    var loopback_ip_end     = (127 << 24)  |  (255 << 16)  |  (255 << 8)  | (255);
    var groupcast_ip_start  = (224 << 24)  |   (0 << 16)   |   (0 << 8)   |   (0);
    var groupcast_ip_end    = (239 << 24)  |  (255 << 16)  |  (255 << 8)  | (255);
    var dhcpresv_ip_start   = (169 << 24)  |  (254 << 16)  |   (0 << 8)   |   (0);
    var dhcpresv_ip_end     = (169 << 24)  |  (254 << 16)  |  (255 << 8)  | (255);
    var ip_addr = (ip1 << 24) | (ip2 << 16) | (ip3 << 8) | (ip4);
    if((ip_addr >= loopback_ip_start)&&(ip_addr <= loopback_ip_end))
        return true;
    if((ip_addr >= groupcast_ip_start)&&(ip_addr <= groupcast_ip_end ))
        return true;
    if((ip_addr >= dhcpresv_ip_start)&&(ip_addr <= dhcpresv_ip_end))
        return true;

    return false;
}

/*check dns ip not same as network id*/
function checkDnsIp(lan_netmask,lan_ipaddr,dnsip)
{
    return false;
/* No need to do this check...
    var netMask, ipAddr, dnsIpAddr;
    var lan_ipaddr_val;
    var lan_netmask_val; 
    var dnsip_val;
    var mask1, mask2, mask3, mask4;
    var ipaddr1, ipaddr2, ipaddr3, ipaddr4;
    var dnsip1, dnsip2, dnsip3, dnsip4;

    if(lan_netmask.split) {
        lan_netmask_val = lan_netmask.split(".");
    }else {
        lan_netmask_val = cdisplit(lan_netmask,".");
    }

    if(lan_ipaddr.split) {
        lan_ipaddr_val = lan_ipaddr.split(".");
    }else {
        lan_ipaddrk_val = cdisplit(lan_ipaddr,".");
    }

    if(dnsip.split) {
        dnsip_val = dnsip.split(".");
    }else {
        dnsip_val = cdisplit(dnsip,".");
    }
    mask1 = parseInt(lan_netmask_val[0],10);
    mask2 = parseInt(lan_netmask_val[1],10);
    mask3 = parseInt(lan_netmask_val[2],10);
    mask4 = parseInt(lan_netmask_val[3],10);
    ipaddr1 = parseInt(lan_ipaddr_val[0],10);
    ipaddr2 = parseInt(lan_ipaddr_val[1],10);
    ipaddr3 = parseInt(lan_ipaddr_val[2],10);
    ipaddr4 = parseInt(lan_ipaddr_val[3],10);
    dnsip1 = parseInt(dnsip_val[0],10);
    dnsip2 = parseInt(dnsip_val[1],10);
    dnsip3 = parseInt(dnsip_val[2],10);
    dnsip4 = parseInt(dnsip_val[3],10);
    
    netMask = (mask1 << 24) | (mask2 << 16) | (mask3 << 8) | (mask4);
    ipAddr = (ipaddr1 << 24) | (ipaddr2 << 16) | (ipaddr3 << 8) | (ipaddr4);
    dnsIpAddr = (dnsip1 << 24) | (dnsip2 << 16) | (dnsip3 << 8) | (dnsip4);
    
    ipAddr = (netMask)&ipAddr;
    if (ipAddr == dnsIpAddr){
        return true;
    }
    return false;
*/
}

/* Just check if MAC address is all "F", or all "0" , with  ':' in it or not weal @ Aug 14*/ 
function MacStrallf(mac) {
  var temp = mac.value;

    for(i=0; i<mac.value.length;i++) {
        var c = mac.value.substring(i, i+1)
        if (c == "f" || c == "F" || c == "0" || c == ":" || c == "-")
            continue;
    else
      break;
  }
  if (i == mac.value.length)
    return true;
  else
    return false;
}

/* Check Multicast MAC */
function checkMulticastMAC(macaddr) {
    var mac_defined = macaddr.value;
    var macadr_first_byte = parseInt(mac_defined.substring(0,2),16);
    var Multicast_Flag = macadr_first_byte & 0x01;
    if( Multicast_Flag )
        return true;
    return false;
}

function checkMacStr(mac) {
    if(checkMulticastMAC(mac) || MacStrallf(mac)) {
        if (mac.focus)
            mac.focus();
        return true;
    }
    return false;
}

function _isNumeric(str) {
    var i;

    if(str.length == 0 || str == null || str == "" || !isDecimalNumber(str)) {
        return false;
    }

    for(i = 0; i<str.length; i++) {
        var c = str.substring(i, i+1);
        if("0" <= c && c <= "9") {
            continue;
        }
        return false;
    }
    return true;
}

function isDecimalNumber(str) {
    if ((str.charAt(0)=='0') && (str.length != 1))
         return false;
    for(var i=0;i<str.length;i++)
    {
         if(str.charAt(i)<'0'||str.charAt(i)>'9')
         return false;
    }
    return true;
}

function checkBlank(checkStr, langStr)
{
	var msg = "";
	if (checkStr.length < 1){
		msg = langStr + window.top.mlang["APPE13"];
	}
	return msg;
}

function isNetmask(netMask)
{
    var i;
    var bit;
    var isChanged = 0;
    
    /* Check most byte (must be 255) and least significant bit (must be 0) */
    bit = (netMask & 0xFF000000) >>> 24;
    if (bit != 255)
        return false;
    
    bit = netMask & 1;
    if (bit != 0)
        return false;

    /* Now make sure the bit pattern changes from 0 to 1 only once */
    for (i=1; i<31; i++)
    {
        netMask = netMask >>> 1;
        bit = netMask & 1;

        if (bit != 0)
        {
            if (isChanged == 0)
                isChanged = 1;
        }
        else
        {
            if (isChanged == 1)
                return false;
        }
    }

    return true;
}
function isHex(str) {
    return Boolean(str.match(/^[0-9a-fA-F]+$/i));
}

function isSameSubnet_v4(ip1, ip2, netmask)
{
    var ip1Arr = ip1.split(".");
    var ip2Arr = ip2.split(".");
    var netmaskArr = netmask.split(".");
    var ip1_bin = (parseInt(ip1Arr[0],10) << 24) | (parseInt(ip1Arr[1],10) << 16) | (parseInt(ip1Arr[2],10) << 8) | (parseInt(ip1Arr[3]));
    var ip2_bin = (parseInt(ip2Arr[0],10) << 24) | (parseInt(ip2Arr[1],10) << 16) | (parseInt(ip2Arr[2],10) << 8) | (parseInt(ip2Arr[3]));
    var netmask_bin = (parseInt(netmaskArr[0],10) << 24) | (parseInt(netmaskArr[1],10) << 16) | (parseInt(netmaskArr[2],10) << 8) | (parseInt(netmaskArr[3]));

    if ( (ip1_bin & netmask_bin) == (ip2_bin & netmask_bin)) {
        return true;
    }
    else {
        return false;
    }
}

function isValidIpv4_str(str)
{
    var ip = str.split('.');
    var i;
        
    if (ip.length != 4) {
        return false;
    }
        
    for (i = 0; i < ip.length; i++) {
        if (_isNumeric(ip[i]) == false) {
            return false;
        }
            
        if (parseInt(ip[i]) < 0 || parseInt(ip[i]) > 255) {
            return false;
        }
    }
        
    return true;
}

function isValidNetmaskStr(netmask_str)
{
    var netmaskArr = netmask_str.split(".");
    var netmask_bin = (parseInt(netmaskArr[0],10) << 24) | (parseInt(netmaskArr[1],10) << 16) | (parseInt(netmaskArr[2],10) << 8) | (parseInt(netmaskArr[3]));

    return isNetmask(netmask_bin);
}

function isValidDomain(str)
{
    var exp = /^(www\.)?[-a-zA-Z0-9]+(\.[-a-zA-Z0-9]+)+$/g;
    return exp.test(str);
}

function checkipaddr(ipaddr)
{
	var form = document.forms[0];
	var ipArray = ipaddr.split(".");
	var ipstr = ipArray[0]+ipArray[1]+ipArray[2]+ipArray[3];
	var i = 0;

  if((ipArray[0]=="")||(ipArray[0]<0)||(ipArray[0]>255)||(ipArray[1]=="")||(ipArray[1]<0)||(ipArray[1]>255)
    ||(ipArray[2]=="")||(ipArray[2]<0)||(ipArray[2]>255)||(ipArray[3]=="")||(ipArray[3]<0)||(ipArray[3]>255))
  {
    return false;
  }
  for(i=0;i<ipstr.length;i++)
  {
    if((ipstr.charAt(i)!='0')&&(ipstr.charAt(i)!='1')&&(ipstr.charAt(i)!='2')
      &&(ipstr.charAt(i)!='3')&&(ipstr.charAt(i)!='4')&&(ipstr.charAt(i)!='5')
      &&(ipstr.charAt(i)!='6')&&(ipstr.charAt(i)!='7')&&(ipstr.charAt(i)!='8')
      &&(ipstr.charAt(i)!='9'))
    {
      return false;
    }
  }
  if( ipArray[0] > 223 || ipArray[0] == 0 )
    return false;
  if (ipaddr == "0.0.0.0" || ipaddr == "255.255.255.255")
  {
    return false;
  }
  
  var each=ipaddr.split(".");
  if (each[0] == "127")
  {
    return false;
  }
  if (!ipArray || ipArray.length != 4)
  {
    return false;
  }
  else
  {
    for (i = 0; i < 4; i++)
    {
      thisSegment = ipArray[i];
      if (thisSegment != "")
      {
        if(i==3)
        {
          if (!((ipArray[3] > 0) && (ipArray[3] < 255)))
          {
            return false;
          }
        }
        else if (!(thisSegment >=0 && thisSegment <= 255))
        {
          return false;
        }
      } 
      else
      {
        return false;
      }
    }
  }
   return true;
}
