
var BLANK_VALID = true;
var BLANK_INVALID = false;
var SPACE_VALID = true;
var SPACE_INVALID = false
var IS_MAC_FLT = true;
var IS_NOT_MAC_FLT = false;
var ERROR_ENCODE_URL = "(E)(R)(R)(O)(R)!!(R)(O)(R)(R)(E)";
var TYPE_NETWORK_ADDRESS = "NETWORK";
var TYPE_IP_ADDRESS = "IP";
var TYPE_BRCAST_ADDRESS = "BROADCAST";

function validNumber(val)
{
	for(i = 0; i < val.length; i ++)
		if(val.charAt(i) < '0' || val.charAt(i) > '9')
			return false;

	return true;
}

function isHexaDigit(digit) {
   var hexVals = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
                           "A", "B", "C", "D", "E", "F", "a", "b", "c", "d", "e", "f");
   var len = hexVals.length;
   var i = 0;
   var ret = false;

   for ( i = 0; i < len; i++ )
      if ( digit == hexVals[i] ) break;

   if ( i < len )
      ret = true;

   return ret;
}

//Function Name: isValidKey(val,size[,fieldname])
//Description: check value entered is a valid key for wireless key
//Parameters: val : value to be checked
//			  size: size 13(128bit)|5(64bit)	
//			  fieldname (optional): show error message if error encountered
//Output: true - no error	false: error
function isValidKey(val, size, fieldname) {
   var ret = false;
   var len = val.length;
   var dbSize = size * 2;

	var addcomment1 = "Please enter 13 ASCII characters or 26 hexadecimal digits for a 128-bit WEP encryption key.";
	var addcomment2 = "Please enter 5 ASCII characters or 10 hexadecimal digits for a 64-bit WEP encryption key.";

   if ( len == size )
      ret = true;
   else if ( len == dbSize ) {
      for ( i = 0; i < dbSize; i++ )
         if ( isHexaDigit(val.charAt(i)) == false )
            break;
      if ( i == dbSize )
         ret = true;
   } else
      ret = false;

	//if (fieldname != undefined) //show error message if fieldname is available
	if (fieldname)
	   if (ret == false){
		if (size == 5)
			alertInvalid (fieldname,val,addcomment2);
		else if (size == 13)
			alertInvalid (fieldname,val,addcomment1);
	   }

   return ret;
}


function isValidHexKey(val, size) {
   var ret = false;
   if (val.length == size) {
      for ( i = 0; i < val.length; i++ ) {
         if ( isHexaDigit(val.charAt(i)) == false ) {
            break;
         }
      }
      if ( i == val.length ) {
         ret = true;
      }
   }

   return ret;
}


function isNameUnsafe(compareChar) {
// Jerry 20040628, @ . is allow
// var unsafeString = "\"<>%\\^[]`\+\$\,='#&@.: \t";
   var unsafeString = "\"<>%\\^[]`\+\$\,='#&: \t";
	
   if ( unsafeString.indexOf(compareChar) == -1 && compareChar.charCodeAt(0) > 32
        && compareChar.charCodeAt(0) < 123 )
      return false; // found no unsafe chars, return false
   else
      return true;
}

/********************************************************************************************* Not exceed 120 chars ****
 * Function: function isExclamation(name)
 * ---------------------------------------------------------------------------------------------------------------------
 * Purpose:  check if the name include exclamation mark
 * 
 * Desc:     NA
 * 
 * Input:    name - the name to be checked
 * 
 * Output:   None
 * 
 * Return:   true - OK
 *           false - Failed
 * 
 * History:  2010924, Linus Shi, Create
 ***********************************************************************************************************************
 */
function isExclamation(name)
{
    var i;
	var val;
	
    if (name == "")
    {
		return false;
    }

	for (i=0; i<name.length; i++ )
	{
		val = name.charAt(i);
		if (i == name.length - 1)
		{
		    if (val == ' ' || val =='\t')
		    {
		        return true;
		    }
		}
		
		if(val == '!')
	    {
		    return false;
	    }
	}
		
	return true; 
}

// Check if a name valid
//Frederick,060731	add fields and modify error checks
//check if the name is URL friendly
//Function Name: isValidName(name[,fieldname][,isblankvalid][,isSpaceValid])
//Description: Check that name contains no unnecessary characters
//Parameters: name, fieldname(optional): show error message when error encountered
//			isblankvalid: BLANK_VALID - allow empty values	| BLANK_INVALID(default) - don't allow empty values
//			isSpaceValid: SPACE_VALID - allow space characetrs | SPACE_INVALID(default) - don't allow space characters
//output: true:no error		false: error
function isValidName(name,fieldname,isblankvalid,isSpaceValid) {
   var i = 0;	
   var hasField = false;

	//if (fieldname != undefined) 
	if (fieldname)	hasField = true;

   if (name=="")
	//if ((isblankvalid == undefined) || (isblankvalid == false))
	if (!isblankvalid) 
	{
		if (hasField)	alertInvalid(fieldname,name);
		return false;
	}
	
   //if ((isSpaceValid == undefined) || (isSpaceValid == false))
   if (!isSpaceValid)
   {	
	   for ( i = 0; i < name.length; i++ ) {
	      if ( isNameUnsafe(name.charAt(i)) == true )
		  {
			if (hasField)	alertInvalid(fieldname,name);
	         return false;
		  }
	   }
	}
	else
	{
	   for ( i = 0; i < name.length; i++ ) {
		      if ( isCharUnsafe(name.charAt(i)) == true ){
				if (hasField)	alertInvalid(fieldname,name);
        		 return false;
		   }
		}
	}
	

   return true;
}

// same as is isNameUnsafe but allow spaces
function isCharUnsafe(compareChar) {
   var unsafeString = "\"<>%\\^[]`\+\$\,='#&@.:\t";
	
   if ( unsafeString.indexOf(compareChar) == -1 && compareChar.charCodeAt(0) >= 32
        && compareChar.charCodeAt(0) < 123 )
      return false; // found no unsafe chars, return false
   else
      return true;
}   

// only ', ", \ is forbidden here
function is_valid_ppp (raw){
	var i;
	var ch;

	if (raw == "")
		return true;
	else if (raw.length != 0){
		for (i=0; i<raw.length; i++){
			ch = raw.charAt (i);
			if (ch.search(/['\"\\<>]/) != -1)
				return false;
		}
	}

	return true;
}


function isSameSubNet(lan1Ip, lan1Mask, lan2Ip, lan2Mask) {

   var count = 0;
   
   lan1a = lan1Ip.split('.');
   lan1m = lan1Mask.split('.');
   lan2a = lan2Ip.split('.');
   lan2m = lan2Mask.split('.');

   for (i = 0; i < 4; i++) {
      l1a_n = parseInt(lan1a[i], 10);
      l1m_n = parseInt(lan1m[i], 10);
      l2a_n = parseInt(lan2a[i], 10);
      l2m_n = parseInt(lan2m[i], 10);
      if ((l1a_n & l1m_n) == (l2a_n & l2m_n))
         count++;
   }
   if (count == 4)
      return true;
   else
      return false;
}

function is_lan_ip(ipaddr_check)
{
   ethIp = '<%ejGet(ethIpAddress)%>';
   ethMask = '<%ejGet(ethSubnetMask)%>';
   ethIp2 = '<%ejGet(lan2IpAddress)%>';
   ethMask2 = '<%ejGet(lan2SubnetMask)%>';
   if((ethIp == ipaddr_check) || (ethIp2 == ipaddr_check))
   	return true;
   else
   	return false;

}

function is_lan_side_ip(ipaddr_check)
{
   ethIp = '<%ejGet(ethIpAddress)%>';
   ethMask = '<%ejGet(ethSubnetMask)%>';
   ethIp2 = '<%ejGet(lan2IpAddress)%>';
   ethMask2 = '<%ejGet(lan2SubnetMask)%>';
   is_true = true;
   lan = ethIp.split('.');
   mask = ethMask.split('.');
   if (ethIp2 != '')
   {
      lan2 = ethIp2.split('.');
      mask2 = ethMask2.split('.');
   }
   ipaddr = ipaddr_check.split('.');
   for (i = 0; i <= 3; i++) 
   {
     if((parseInt(lan[i])&parseInt(mask[i])) != (parseInt(ipaddr[i])&parseInt(mask[i])))
     {
        is_true = false;
        break;
     }
   }
   
   if(is_true == true)
   {
     return is_true;   
   } 
   if (ethIp2 != '')
   {
     is_true = true;
     for (i = 0; i <= 3; i++) 
     {
        if((parseInt(lan2[i])&parseInt(mask2[i])) != (parseInt(ipaddr[i])&parseInt(mask[i])))
        {
          is_true = false; 
          break;
        }
     }
   }
   
   return is_true;
}
function is_valid_lan_side_ip(ipaddr_check)
{
if(true == is_lan_ip(ipaddr_check))
	return false;

if(true == is_lan_side_ip(ipaddr_check))
 return true;

return false

}

function is_private_ip(ipaddr_check)
{

if(true == is_lan_side_ip(ipaddr_check))
 return true;
	
 is_true = false;	
 wan_ip_list = '<%ejGetOther(wanInterfaceInfo, wanIpList)%>';
 wan_ip = wan_ip_list.split('|');
 for(i =0; i< wan_ip.length; i++)
 {
 	if(ipaddr_check == wan_ip[i])
		is_true = true;		
 }
 return is_true;
}

function isValidRemoteIpAddress(address,fieldname,type) 
{
   var i = 0;
   var c = '';
   var hasfield = false;
   var num = 0;
	
   if (fieldname)	hasfield = true;
	   
   if (address == "") 
   {
       if (hasfield) alertInvalid(fieldname,address);
	   return false;
   }

   for (i = 0; i < address.length; i++) 
   {
     c = address.charAt(i);
     if((c>='0'&&c<='9')||(c=='.'))
       continue;
     else	
	 {
       if (hasfield) alertInvalid(fieldname,address);
	   return false;
  	 }
   }

   var addrParts = address.split('.');

   //Frederick,060724	Make sure that everything is in decimal place
   for (i=0; i < addrParts.length; i++)
   {
	  addrParts[i] = parseInt(addrParts[i],10);
	  addrParts[i] += "";
   }

   if ( addrParts.length != 4 )
   {
       if (hasfield) alertInvalid(fieldname,address);
		return false;
   }
	
   num = parseInt(addrParts[0],10);
   //annette,20081017,224.0.0.0-255.255.255.254 and 127.x.x.x is for remote ipaddr,invalid ip
   if ((num >= 224 && num <= 255) || (num == 127))
   {
      if (hasfield) alertInvalid(fieldname,address);
         return false;
   }
   	
   for (i = 0; i < 4; i++) 
   {
      if (isNaN(addrParts[i]) || addrParts[i] =="")
	 {
       if (hasfield) alertInvalid(fieldname,address);
         return false;
	 }
      num = parseInt(addrParts[i],10);
      if ( num < 0 || num > 255 )
	 {
       if (hasfield) alertInvalid(fieldname,address);
         return false;
	 }
	  if (addrParts[i].length > 3)
	 {
       if (hasfield) alertInvalid(fieldname,address);
		return false;
	 }
   }

   return true;
}

//Frederick,060731	add optional fieldname parameter
//Function Name: isValidIpAddress(address[,fieldname][,type])
//Description: Check that address entered is valid ip address
//Parameters: address, 	fieldname(optional): entering will show error message when encountered
//			  type: TYPE_NETWORK_ADDRESS:check network address | TYPE_IP_ADDRESS (default) check of type IP address
//output: true:no error		false:has error
function isValidIpAddress(address,fieldname,type) {
   var i = 0;
   var c = '';
   var hasfield = false;
   var num = 0;
	
   //if (fieldname != undefined)	
   if (fieldname)	hasfield = true;
	   

   if (address == "") {
       if (hasfield) alertInvalid(fieldname,address);
	   return false;
  }

   for (i = 0; i < address.length; i++) {
     c = address.charAt(i);
     if((c>='0'&&c<='9')||(c=='.'))
       continue;
     else	
	 {
       if (hasfield) alertInvalid(fieldname,address);
	   return false;
  	  }
   }
   if ( address == '0.0.0.0' ||
        address == '255.255.255.255' )
	 {
       if (hasfield) alertInvalid(fieldname,address);
      return false;
	 }

   var addrParts = address.split('.');

	//Frederick,060724	Make sure that everything is in decimal place
	for (i=0; i < addrParts.length; i++){
		addrParts[i] = parseInt(addrParts[i],10);
		addrParts[i] += "";
	}

   if ( addrParts.length != 4 ) 	 {
       if (hasfield) alertInvalid(fieldname,address);
		return false;
	}
   num = parseInt(addrParts[3],10);
   //anby,20081017,xx.xx.xx.255 is for net ipaddr,invalid ip
   if ( num >= 255 )
	{
       if (hasfield) alertInvalid(fieldname,address);
         return false;
	 }
	
   for (i = 0; i < 4; i++) {
      if (isNaN(addrParts[i]) || addrParts[i] =="")
	 {
       if (hasfield) alertInvalid(fieldname,address);
         return false;
	 }
      num = parseInt(addrParts[i],10);
      if ( num < 0 || num > 255 )
	 {
       if (hasfield) alertInvalid(fieldname,address);
         return false;
	 }
     // 127.xxx.xxx.xxx,224.0.0.0-225.225.255.254,
     if ( (i == 0 ) && (num == 127 || (num > 223 && num < 226)))
     {
        if (hasfield) alertInvalid(fieldname,address);
          return false;
     }	 
	  if (addrParts[i].length > 3)
	 {
       if (hasfield) alertInvalid(fieldname,address);
		return false;
	 }
   }

	//if ((type == undefined) || (type==TYPE_IP_ADDRESS))
	if ((!type) || (type==TYPE_IP_ADDRESS))
	   if (parseInt(addrParts[0],10)==0||parseInt(addrParts[3],10)==0)
		 {
	       if (hasfield) alertInvalid(fieldname,address);
   			return false;
		 }
	else 
		if (type == TYPE_NETWORK_ADDRESS)
			if (parseInt(addrParts[0],10)==0)
			 {
		       if (hasfield) alertInvalid(fieldname,address);
   				return false;
			 }

   return true;
}

function isValidIpAddress6(address) {

   ipParts = address.split('/');
   if (ipParts.length > 2) return false;
   if (ipParts.length == 2) {
      num = parseInt(ipParts[1]);
      if (num <= 0 || num > 128)
         return false;
   }

   addrParts = ipParts[0].split(':');
   if (addrParts.length < 3 || addrParts.length > 8)
      return false;
   for (i = 0; i < addrParts.length; i++) {
      if ( addrParts[i] != "" )
         num = parseInt(addrParts[i], 16);
      if ( i == 0 ) {
//         if ( (num & 0xf000) == 0xf000 )
//            return false;	//can not be link-local, site-local or multicast address
      }
      else if ( (i + 1) == addrParts.length) {
         if ( num == 0 || num == 1)
            return false;	//can not be unspecified or loopback address
      }
      if ( num != 0 )
         break;
   }
   return true;
}

function isValidPrefixLength(prefixLen) {
	var num;

	num = parseInt(prefixLen);
	if (num <=0 || num > 128)
		return false;
	return true;
}

function getLeftMostZeroBitPos(num) {
   var i = 0;
   var numArr = [128, 64, 32, 16, 8, 4, 2, 1];

   for ( i = 0; i < numArr.length; i++ )
      if ( (num & numArr[i]) == 0 )
         return i;

   return numArr.length;
}

function getRightMostOneBitPos(num) {
   var i = 0;
   var numArr = [1, 2, 4, 8, 16, 32, 64, 128];

   for ( i = 0; i < numArr.length; i++ )
      if ( ((num & numArr[i]) >> i) == 1 )
         return (numArr.length - i - 1);

   return -1;
}

function isInvalidString(input)
{ 
	var ret = false;
	var i = 0;
	for (i=0;i<input.length;i++)
	{
		if (input.charAt(i)==' ' || input.charAt(i) == '\'' || input.charAt(i) == '\"' || input.charAt(i) == '\\' || input.charAt(i) == '|' || input.charAt(i) == '??')
		{
			ret = true;
			break;
		}
	}
	return ret;
}


//Function Name: isValidSubnetMask(mask[,fieldname])
//Description: Check if mask entered is valid subnet mask or not)
//Parameters: mask, fieldname(optional) shows error when encountered
//output: true:no error	false: has error
function isValidSubnetMask(mask,fieldname) {
   var i = 0, num = 0;
   var zeroBitPos = 0, oneBitPos = 0;
   var zeroBitExisted = false;
   var c = '';
   var hasField = false;

   if (mask == '255.255.0.255')
   {
       return true;
   }

   //if (fieldname != undefined) 
   if (fieldname)	hasField = true;

   for (i = 0; i < mask.length; i++) {
     c = mask.charAt(i);
     if((c>='0'&&c<='9')||(c=='.'))
       continue;
     else
	 {
	   if (hasField) alertInvalid(fieldname,mask);
       return false;
	 }
   }
   if ( mask == '0.0.0.0' )
	 {
	   if (hasField) alertInvalid(fieldname,mask);
      return false;
	 }

   maskParts = mask.split('.');
   if ( maskParts.length != 4 )
	 {
	   if (hasField) alertInvalid(fieldname,mask);
		 return false; //Frederick 060503, this part is buggy, an entry of 255.255.255. will not be detected
	  }

	//Frederick, 060503	check that every single digit is not blank{
	for (i=0; i<maskParts.length; i++)
		if (maskParts[i].length < 1){
	   if (hasField) alertInvalid(fieldname,mask);
			return false;
		}
	//Frederick, 060503	check that every single digit is not blank}

   for (i = 0; i < 4; i++) {
      if ( isNaN(maskParts[i]) == true ){
	   if (hasField) alertInvalid(fieldname,mask);
         return false;
		}
      num = parseInt(maskParts[i]);
      if ( num < 0 || num > 255 )	 {
	   if (hasField) alertInvalid(fieldname,mask);
         return false;
		}
		
      if ( zeroBitExisted == true && num != 0 )	 {
	   if (hasField) alertInvalid(fieldname,mask);
         return false;
		}
      zeroBitPos = getLeftMostZeroBitPos(num);
      oneBitPos = getRightMostOneBitPos(num);
      if ( zeroBitPos < oneBitPos )	 {
	   if (hasField) alertInvalid(fieldname,mask);
         return false;
		}
      if ( zeroBitPos < 8 )
         zeroBitExisted = true;
   }
   
   if (parseInt(maskParts[0])==0)	 {
	   if (hasField) alertInvalid(fieldname,mask);
   	return false;
		}

   if (parseInt(maskParts[3])>=255)	 {
	   if (hasField) alertInvalid(fieldname,mask);
   	return false;
		}

   return true;
}

//Function NAme: isValidPort(port[,fieldname])
//description: Check if the port number entered is valid or not
//Parameters: port: single integer or range (xx:yy)
//			fieldname: fieldname of port to be checked, show alert if available
//output: true: no error	false: has error
function isValidPort(port,fieldname) {
   var fromport = 0;
   var toport = 100;
   var hasField = false;

   //if (fieldname != undefined) 
   if (fieldname) hasField = true;

   portrange = port.split(':');
   if ( portrange.length < 1 || portrange.length > 2 ) {
	{
	   if (hasField) alertInvalid(fieldname,port);
       return false;
	}
   }
   if ( isNaN(portrange[0]) )
	{
	   if (hasField) alertInvalid(fieldname,port);
       return false;
	}
   //fromport = parseInt(portrange[0]);
   fromport = (portrange[0] * 1);
   if ( portrange.length > 1 ) {
       if ( isNaN(portrange[1]) )
		{
	   if (hasField) alertInvalid(fieldname,port);
          return false;
	    }
       //toport = parseInt(portrange[1]);
		toport = (portrange[1] * 1);
       if ( toport <= fromport )
		{
	   if (hasField) alertInvalid(fieldname,port);
           return false;      
		}
   }
   
   if ( fromport < 1 || fromport > 65535 || toport < 1 || toport > 65535 )
	{
	   if (hasField) alertInvalid(fieldname,port);
       return false;
	}
   
   return true;
}

function isValidNatPort(port) {
   var fromport = 0;
   var toport = 100;

   portrange = port.split('-');
   if ( portrange.length < 1 || portrange.length > 2 ) {
       return false;
   }
   if ( isNaN(portrange[0]) )
       return false;
   //fromport = parseInt(portrange[0]);
	fromport = (portrange[0] * 1);
   if ( portrange.length > 1 ) {
       if ( isNaN(portrange[1]) )
          return false;
       //toport = parseInt(portrange[1]);
		toport = (portrange[1] * 1);
       if ( toport <= fromport )
           return false;
   }

   if ( fromport < 1 || fromport > 65535 || toport < 1 || toport > 65535 )
       return false;

   return true;
}


/*Function Name: isValidMacAddress (address[,ismacflt][,fieldname])
  Description: Check if value entered is valid mac address or mac filter address
	Parameters: address - MAC address to be checked
				ismacflt - IS_MAC_FLT (is of type MAC Filter) 
						   IS_NOT_MAC_FLT (not of type MAC Filter)
				Default: IS_NOT_MAC_FLT
				fieldname - fieldname of the MAC address to be checked
  output: true: no error	false: has error
*/
function isValidMacAddress(address,ismacflt,fieldname) {
   var c = '';
   var i = 0, j = 0;
   var hasField;
   var additionalComment = " Eg. 11:22:33:AA:BB:CC";
   
	//if (fieldname != undefined)
	if (fieldname) hasField = true;
	
  //if ((ismacflt == undefined) || (ismacflt == false)){   //can also allow no input at all
	if (!ismacflt ) { 
//Yocheng temp comment it for WOL issue.	if (( address.toLowerCase() == 'ff:ff:ff:ff:ff:ff' ) || ( address.toLowerCase() == '00:00:00:00:00:00' )){
//====Temproary remove the broadcast MAC address check====//
	if ( ( address.toLowerCase() == '00:00:00:00:00:00' )){
			if (hasField) alertInvalid(fieldname,address,additionalComment);
			return false;
		}
	}

   addrParts = address.split(':');
   if ( addrParts.length != 6 ) {
		if (hasField) alertInvalid(fieldname,address,additionalComment);
		return false;
	}

   for (i = 0; i < 6; i++) {
      if ( addrParts[i] == '' ){
		if (hasField) alertInvalid(fieldname,address,additionalComment);
         return false;
	  }
	  //Frederick, 060523	one byte can consist of only 2 characters{
	  if (addrParts[i].length != 2){
		if (hasField) alertInvalid(fieldname,address,additionalComment);
		 return false;
	  }
	  //Frederick, 060523}
      for ( j = 0; j < addrParts[i].length; j++ ) {
         c = addrParts[i].toLowerCase().charAt(j);
         if ( (c >= '0' && c <= '9') ||
              (c >= 'a' && c <= 'f') )
            continue;
         else
		 {
			if (hasField) alertInvalid(fieldname,address,additionalComment);
            return false;
		 }
      }
   }

   return true;
}

function isValidMacMask(mask) {
   var c = '';
   var num = 0;
   var i = 0, j = 0;
   var zeros = 0;
   var zeroBitPos = 0, oneBitPos = 0;
   var zeroBitExisted = false;

   maskParts = mask.split(':');
   if ( maskParts.length != 6 ) return false;

   for (i = 0; i < 6; i++) {
      if ( maskParts[i] == '' )
         return false;
      for ( j = 0; j < maskParts[i].length; j++ ) {
         c = maskParts[i].toLowerCase().charAt(j);
         if ( (c >= '0' && c <= '9') ||
              (c >= 'a' && c <= 'f') )
            continue;
         else
            return false;
      }

      num = parseInt(maskParts[i], 16);
      if ( num == NaN || num < 0 || num > 255 )
         return false;
      if ( zeroBitExisted == true && num != 0 )
         return false;
      if ( num == 0 )
         zeros++;
      zeroBitPos = getLeftMostZeroBitPos(num);
      oneBitPos = getRightMostOneBitPos(num);
      if ( zeroBitPos < oneBitPos )
         return false;
      if ( zeroBitPos < 8 )
         zeroBitExisted = true;
   }
   if (zeros == 6)
      return false;

   return true;
}


function isValidMacFltAddress(address,fieldname) {
   var c = '';
   var i = 0, j = 0;
   var hasField = false;
   var additionalComment = " Eg. 11:22:33:AA:BB:CC";

   //if (fieldname != undefined) 
   if (fieldname)	hasField = true;

   addrParts = address.split(':');
   if ( addrParts.length != 6 ) return false;

   for (i = 0; i < 6; i++) {
      if ( addrParts[i] == '' )
	  {
	     alertInvalid(fieldname,address,additionalComment);
         return false;
	  }
	  //Frederick, 060523	one byte can consist of only 2 characters{
	  if (addrParts[i].length != 2)
	  {
	     alertInvalid(fieldname,address,additionalComment);
		 return false;
	  }
	  //Frederick, 060523}
      for ( j = 0; j < addrParts[i].length; j++ ) {
         c = addrParts[i].toLowerCase().charAt(j);
         if ( (c >= '0' && c <= '9') ||
              (c >= 'a' && c <= 'f') )
            continue;
         else
	     {
	     alertInvalid(fieldname,address,additionalComment);
            return false;
		 }
      }
   }

   return true;
}

var hexVals = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
              "A", "B", "C", "D", "E", "F");
var unsafeString = "\"<>%\\^[]`\+\$\,'#&";
// deleted these chars from the include list ";", "/", "?", ":", "@", "=", "&" and #
// so that we could analyze actual URLs

function isUnsafe(compareChar)
// this function checks to see if a char is URL unsafe.
// Returns bool result. True = unsafe, False = safe
{
   if ( unsafeString.indexOf(compareChar) == -1 && compareChar.charCodeAt(0) > 32
        && compareChar.charCodeAt(0) < 123 )
      return false; // found no unsafe chars, return false
   else
      return true;
}

function decToHex(num, radix)
// part of the hex-ifying functionality
{
   var hexString = "";
   while ( num >= radix ) {
      temp = num % radix;
      num = Math.floor(num / radix);
      hexString += hexVals[temp];
   }
   hexString += hexVals[num];
   return reversal(hexString);
}

function reversal(s)
// part of the hex-ifying functionality
{
   var len = s.length;
   var trans = "";
   for (i = 0; i < len; i++)
      trans = trans + s.substring(len-i-1, len-i);
   s = trans;
   return s;
}


//Frederick, 060414	Add converting of special characters for URL encoding {
function convertSpclChar (compareChar) {

	var i_ctr = 0;
	var toConvertString = "\"<>%\\^[]`\+\$\,='#&: \t";
	var returnString = "";	

	while (i_ctr < compareChar.length){

		if (toConvertString.indexOf(compareChar.charAt(i_ctr)) == -1)
			returnString = returnString + compareChar.charAt(i_ctr);			
		else
			returnString = returnString + convert(compareChar.charAt(i_ctr));			

		i_ctr++;
	}

	return returnString
}
//Frederick, 060414 Add converting of special characters for URL encoding }


//Frederick, 060503	Check if there's a ":" available or else don't allow post, issue of WinXP SP2{
//Function Name: checkFile(txtBox)
//Description: Check if the filename input is valid or not
//Parameters: txtBox : textbox containinig file path
//Output: true: no error	false: has error
function checkFile(txtBox)
{
//aids, 060719 fix for F/W upgrade linux.
var OS = GetBrowserOS();

	if (txtBox.length == 0)
	{
		alert("Please enter a valid filename.");
		return false;
	}

	if (OS.indexOf("fire")!=-1) // add by jack 2008.06.27
		return true;
	
if (OS.indexOf("win")!=-1){

	if (txtBox.indexOf("\\\\")!=-1)
		return true;

	if (OS.indexOf("safa")!=-1)
		return true;
    if (OS.indexOf("oper")!=-1)
        return true; 
	//check if a : is existing
	temp = txtBox.search(":");
	if (temp != 1)
	{
		alert("Please enter a valid filename.");
		return false;
	}
	
}

	return true;
}

//Frederick, 060503	Check if there's a ":" available or else don't allow post, issue of WinXP SP2}


function convert(val)
// this converts a given char to url hex form
{
   return  "%" + decToHex(val.charCodeAt(0), 16);
}


//Function Name: encodeUrl(val[,fieldname])
//Description: Encodes any special characers encountered to URL format
//Parameters: val, fieldname (optional) if available will show alert when error encountered
//Output: New encoded URL		
//		  ERROR_ENCODE_URL : error encountered, non-ISO-8859-1 characters found
function encodeUrl(val,fieldname)
{
   var len     = val.length;
   var i       = 0;
   var newStr  = "";
   var original = val;
   var hasField = false;

   //if (fieldname != undefined ) 
   if (fieldname)	hasField = true;

   for ( i = 0; i < len; i++ ) {
      if ( val.substring(i,i+1).charCodeAt(0) < 255 ) {
         // hack to eliminate the rest of unicode from this
         if (isUnsafe(val.substring(i,i+1)) == false)
            newStr = newStr + val.substring(i,i+1);
         else
            newStr = newStr + convert(val.substring(i,i+1));
      } else {
         // woopsie! restore.
         //alert ("Found a non-ISO-8859-1 character at position: " + (i+1) + ",\nPlease eliminate before continuing.");
         newStr = original;

		 if (hasField) {
			alertInvalid(fieldname,val,"contains non-ISO-8859-1 characters");
			newStr = ERROR_ENCODE_URL;
		 }

         // short-circuit the loop and exit
         i = len;
      }
   }

   return newStr;
}

var markStrChars = "\"'";

// Checks to see if a char is used to mark begining and ending of string.
// Returns bool result. True = special, False = not special
function isMarkStrChar(compareChar)
{
   if ( markStrChars.indexOf(compareChar) == -1 )
      return false; // found no marked string chars, return false
   else
      return true;
}

// use backslash in front one of the escape codes to process
// marked string characters.
// Returns new process string
function processMarkStrChars(str) {
   var i = 0;
   var retStr = '';

   for ( i = 0; i < str.length; i++ ) {
      if ( isMarkStrChar(str.charAt(i)) == true )
         retStr += '\\';
      retStr += str.charAt(i);
   }

   return retStr;
}

// Web page manipulation functions

function showhide(element, sh)
{
    var status;
    if (sh == 1) {
        status = "block";
    }
    else {
        status = "none"
    }
    
	if (document.getElementById)
	{
		// standard
		document.getElementById(element).style.display = status;
	}
	else if (document.all)
	{
		// old IE
		document.all[element].style.display = status;
	}
	else if (document.layers)
	{
		// Netscape 4
		document.layers[element].display = status;
	}
}

// Load / submit functions

function getSelect(item)
{
	var idx;
	if (item.options.length > 0) {
	    idx = item.selectedIndex;
	    return item.options[idx].value;
	}
	else {
		return '';
    }
}

function setSelect(item, value)
{
	for (i=0; i<item.options.length; i++) {
        if (item.options[i].value == value) {
        	item.selectedIndex = i;
        	break;
        }
    }
}

function setCheck(item, value)
{
    if ( value == '1' ) {
         item.checked = true;
    } else {
         item.checked = false;
    }
}

function setDisable(item, value)
{
    if ( value == 1 || value == '1' ) {
         item.disabled = true;
    } else {
         item.disabled = false;
    }     
}

function submitText(item)
{
	return '&' + item.name + '=' + item.value;
}

function submitSelect(item)
{
	return '&' + item.name + '=' + getSelect(item);
}


function submitCheck(item)
{
	var val;
	if (item.checked == true) {
		val = 1;
	} 
	else {
		val = 0;
	}
	return '&' + item.name + '=' + val;
}

//add by alex, 08/31/05'
/* checked is integer */
//Function Name: isInteger (val)
//Description: Check if the value entered is an integer or not
//Parameters: val
//output: true - no error	false - error
function isInteger(val)
{
	var i;

	val = val + ""; //need to convert to string because 0 is treat as ""
	
	if (val == "")
		return false;

	for (i=0; i<val.length; i++ )
	{
		ch = val.charAt(i);
		if( (ch==' ')||(ch=='\n')||(ch=='\t') )
			return false;
		if (isNaN(ch))
			return false;
	}
		
	return true;
}

/* checked invalid range */
//Frederick,060731	Add fieldname check and also support backward compatibility
//Function  Name: isInValidRange(s,low,high,fieldname(optional))
//Description: Check if s is in the range between low and high. 
//Parameters:	s: value to be checked, low:starting range	high: ending range
//				fieldname (optional), if available will show an error message upon error encountered
//output: true - no error	false - has error				
function isInValidRange(s,low,high,fieldname) {

	if(isInteger(s) == false)
	{
		//if (fieldname != undefined)
		if (fieldname)	alertInvalid(fieldname,s);
		return false;
	
	}

	s = parseInt(s,10);


 	if(s<low||s>high){
		//if (fieldname != undefined) 
		if (fieldname)	alert (fieldname + " " + s + " is out of range [" + low + "-" + high + "].");
    	return false;
	}
	else
		return true;

}

//add by koukai,2005/06/03
/* checked blank */
function isBlank(s) {
	var c;
	for(i=0;i<s.length;i++) {
		c = s.charAt(i);
		if( (c!=' ')&&(c!='\n')&&(c!='\t') )
	            return false;
	}
	return true;
}

/******************************************************************************
 * Function:function include_blank(s) 
 * ---------------------------------------------------------------------------------------
 * Purpose: check if string include blank 
 * Desc:     NA 
 * Input:    s - string
 * Output:  NULL
 * Return:  true - include blank
 *              false - do not include blank
 * 
 * History:  20081218, Lily, create
 *****************************************************************************
 */
function is_include_blank(s)
{
    var c;
    for(i=0;i<s.length;i++) 
    {
        c = s.charAt(i);
	 if(c==' ')
	 {
	     return true;
	 }
    }
    return false;
}

/* All input field should accepted [a-z],[A-Z],[0-9],[~!@#$%^&*()[]{}<>_+\|?/;:] otherwise we should filter. */
/* checked name(domain name, host name) */
function isValidName_Voice(raw)
{
	var i;
	var ch;
	
	if(raw == "")
	{
		return true;
	}
	else if(raw.length != 0)
	{
		for(i = 0; i<raw.length; i++)
		{
			ch = raw.charAt(i);
			if(ch.search(/[0-9]|[a-z]|[A-Z]|-/) == -1)  //modify by alex,08/30/2005
			{
				return false;
			}
		}
	}
	
	return true;
	
}

/* checked password field */
function isValidPassword(val)
{
    var ch;
    for(j = 0; j < val.length; j++)
    {
        ch = val.charAt(j);
        if (ch.search(/[0-9]|[a-z]|[A-Z]/) == -1)
            return false;           
    }
    return true;    
}  



/* Get form element StringIP, ex. 0.0.0.0 */
function isFormElements_UsedByAddress(name)
{
    var isExists = false;
    for(i=0; i<document.forms[0].elements.length;i++)
    {
        if(document.forms[0].elements[i].name == name)
        {
            isExists = true;
            break;
        }
    }
    if(document.forms[0].elements[i].value == "")
	{
		document.forms[0].elements[i].value = '0.0.0.0';
		return ('0.0.0.0');
	}
	else
    	return (document.forms[0].elements[i].value);
}
/* Get form elements checked */
function isFormElements_Checked(name)
{
    var isExists = false;
    for(i=0; i<document.forms[0].elements.length;i++)
    {
        if(document.forms[0].elements[i].name == name)
        {
            isExists = true;
            break;
        }
    }
    if(document.forms[0].elements[i].checked == true)
		return true;
	else
    	return false;
}
/* Get form element */
function isFormElements(name)
{
    var isExists = false;
    for(i=0; i<document.forms[0].elements.length;i++)
    {
        if(document.forms[0].elements[i].name == name)
        {
            isExists = true;
            break;
        }
    }
    if(document.forms[0].elements[i].value == "")
	{
		document.forms[0].elements[i].value = 0;
		return (0);
	}
	else
    	return (document.forms[0].elements[i].value);
}

/* Set form elements focus */
function SetFormElementsFocus(name)
{
    var isExists = false;
    for(i=0; i<document.forms[0].elements.length;i++)
    {
        if(document.forms[0].elements[i].name == name)
        {
            isExists = true;
            document.forms[0].elements[i].focus();
            break;
        }
    }
    
    return (isExists);
}

/* check Domain name or IP */
function isValidIPOrDomainName(str)
{
	var i;
	var str_array = str.split(".");

	for (i=0; i<str_array.length; i++ )
	{
		if (str_array[i] == "")
			return false;
	}
	for (i=0; i<str_array.length; i++ )
	{
		if (!isInteger(str_array[i]))
			break;
	}

	if (i == str_array.length)
	{
		if (str_array.length == 4)
		{
			if (!isValidIpAddress(str))
				return false;
		}
		else
			return false;
	}
	return true;
}


/*Frederick, 060505	Add browser detection functionality{*/
//Function Name: GetBrowserOS
//Description: Gets the current OS version and browser version of OS
//Parameters: none
//Output: <browser><OS>
function GetBrowserOS()
{

	var detect = navigator.userAgent.toLowerCase();
	var OS,browser,version,total,thestring, browseVer;

	if (do_checkstr('konqueror'))
	{
		browser = "Konqueror";
		OS = "Linux";
	}
	else if (do_checkstr('safari')) browser = "safa";
	else if (do_checkstr('omniweb')) browser = "omni";
	else if (do_checkstr('opera')) browser = "oper";
	else if (do_checkstr('webtv')) browser = "webt";
	else if (do_checkstr('icab')) browser = "icab";
	else if (do_checkstr('msie')) browser = "msie";
	//Frederick,060721	Add firefox detection
	else if(navigator.userAgent.indexOf("Firefox")!=-1){
		var versionindex=navigator.userAgent.indexOf("Firefox")+8
			if(parseInt(navigator.userAgent.charAt(versionindex))==3)
				browser="fire3.0";
			else if (parseInt(navigator.userAgent.charAt(versionindex))>=1)
				browser = "fire";
	}
	else if (!do_checkstr('compatible'))
	{
		browser = "nets"
	}
		else browser = "unknown";

	if (browser != "unknown")
		if (!OS)
		{
			if (do_checkstr('linux')) OS = "lin";
			else if (do_checkstr('x11')) OS = "uni";
			else if (do_checkstr('mac')) OS = "mac"
			else if (do_checkstr('win')) OS = "win"
			else OS = "unknown";
		}

	browseVer = browser + OS;

	return browseVer;
}


function do_checkstr(string)
{
	var detect = navigator.userAgent.toLowerCase();
	place = detect.indexOf(string) + 1;
	thestring = string;
	return place;
}

/*end add browser detection functionality}*/

/*Frederick,060724	Add re-encode IP address to make sure that it is in consistent decimal form*/
/*e.g. 0192.0168.1.1 -> 192.168.1.1*/
//Function Name:reencodeIP (IP)
//Description: Re-encodes IP address to make sure that it is in proper format *e.g. 0192.0168.1.1 -> 192.168.1.1
//Parameters: IP
//Output: IP
function reencodeIP (IP)
{
	var newIP = '';
	addrParts = IP.split('.');

	//Frederick,060724	Make sure that everything is in decimal place
	for (i=0; i < addrParts.length; i++)
		if (i == 3)
			newIP = newIP + parseInt(addrParts[i],10);
		else
			newIP = newIP + parseInt(addrParts[i],10) + '.';
		
	return newIP;
}
/*}060724*/


/*Frederick, 060731 move some functions here*/
//Function Name:isOverlapModemIp(EndIp, StartIp, ModemIp)
//Description: Check if the StartIp and EndIp is overlapping ModemIp
//Parameters: EndIp, StartIp, ModemIp
//output: true - no error	
//		  false - error
function isOverlapModemIp(EndIp, StartIp, ModemIp)
{
   addrEnd = EndIp.split('.');
   addrStart = StartIp.split('.');
   addrModem = ModemIp.split('.');
	E = parseInt(addrEnd[3],10) + 1;
    S = parseInt(addrStart[3],10) + 1;
	M = parseInt(addrModem[3],10) + 1;

	//it is assumed that end ip and start ip lie in the same subnet as checked by previous validation
	//check that modem ip it doesn't lie within ip range
	
	if ((S<=M) && (M<=E))
		return true;
	else
		return false;
}



//Add is invalid message
//Function Name: alertInvalid(fieldname, fieldvalue [,additional])
//Description: alerts invalid message containing fieldname and value
//Parameters: fieldname, fieldvalue, additional - Any additional comments to be added
//Output: MessageBox(invalid message)
function alertInvalid(fieldname, fieldvalue, additional)
{
	//if (additional == undefined)
	if (!additional)
		alert (fieldname + " " + fieldvalue + " is invalid.");
	else
		alert (fieldname + " " + fieldvalue + " is invalid " + additional+ ".");
}

//Frederick,060731	Add isValidTime function
//Function name: isValidTime(time, fieldname)
//Description: Check if the time input in hh:mm is valid or not and returns the total number of mins
//Parameters: time (hh:mm), fieldname
//Output: -1 (error), integer (in mins)
function isValidTime(time,fieldname)
{

	var vals;
	var hasField = false;
	var hour, min;
	//if (fieldname != undefined)
	if (fieldname)	hasField = true;
	
	vals = time.split(':');
	
	if (vals.length == 2){
		
		if (!isInteger(vals[0]) || !isInteger(vals[1])){
			if (hasField) alertInvalid(fieldname,time);
			return -1;
		}
		
		hour = parseInt(vals[0],10);
		min = parseInt(vals[1],10);

		if (!isInValidRange(hour,0,23)){
			if (hasField) alertInvalid(fieldname,time);
			return -1;
		}
	
		if (!isInValidRange(min,0,59)){
			//alert ("entereeD2.");
			if (hasField) alertInvalid(fieldname,time);
			return -1;
		}	
	}
	else
	{
		if (hasField) alertInvalid(fieldname,time);
		return -1;
	}
	
	return (hour * 60 + min);
}


//Function Name: DoValidateIpRange(Subnet,Mask[,type])
//Description: Check if Subnet complies to Mask input for TYPE_IP_ADDRESS and TYPE_NETWORK_ADDRESS
//				check if Subnet + Mask is of type TYPE_BRCAST_ADDRESS
//Parameters: type <TYPE_IP_ADDRESS | TYPE_NETWORK_ADDRESS | TYPE_BRCAST_ADDRESS>
//				Default: TYPE_IP_ADDRESS
//Output: true - no error
//		  false - error
function DoValidateIpRange(Subnet, Mask, type)
{
  var Subadd = Subnet.match("^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$");
  var Maskadd = Mask.match("^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$");

	//do not do anything if required parameters are not specified
	if ((Subnet == "") || (Mask =="")) return true;

 var i;
  var error=false;
  var count = 0;

    var snm1a = 255;
    var snm2a = 255;
    var snm3a = 255;
    var snm4a = 255;

    var nw1a = 0;
    var nw2a = 0;
    var nw3a = 0;
    var nw4a = 0;

    var broad1a = 255;
    var broad2a = 255;
    var broad3a = 255;
    var broad4a = 255;

	arrSubadd = Subadd[0].split(".");
  	arrMask = Maskadd[0].split(".");

    snm1a = arrMask[0];
    snm2a = arrMask[1];
    snm3a = arrMask[2];
    snm4a = arrMask[3];

    var ck1a = arrSubadd[0];
    var ck2a = arrSubadd[1];
    var ck3a = arrSubadd[2];
    var ck4a = arrSubadd[3];

  	nw1a = eval(snm1a & ck1a);
	nw2a = eval(snm2a & ck2a);
	nw3a = eval(snm3a & ck3a);
	nw4a = eval(snm4a & ck4a);

	broad1a = ((nw1a) ^ (~ snm1a) & 255);
	broad2a = ((nw2a) ^ (~ snm2a) & 255);
	broad3a = ((nw3a) ^ (~ snm3a) & 255);
	broad4a = ((nw4a) ^ (~ snm4a) & 255);

	//if ((type == undefined) || (type == TYPE_IP_ADDRESS))
	if ((!type) || (type == TYPE_IP_ADDRESS)){
		if ((broad1a == arrSubadd[0]) && (broad2a == arrSubadd[1]) && (broad3a == arrSubadd[2]) && (broad4a == arrSubadd[3]))
		{
			errVal = "IP:" + Subnet + " Mask:" + Mask;
			alertInvalid("",errVal,"Please check your subnet mask.");
			return false;
		}

	}
	else if (type == TYPE_NETWORK_ADDRESS){
		var tempIP = nw1a + "." + nw2a + "." + nw3a + "." + nw4a;
		if (tempIP != Subnet){
			errVal = Subnet + " Mask:" + Mask;				
		//	alertInvalid (tempIP+"++++++++++++++", errVal, Subnet);

			alertInvalid ("Network Address",errVal);
			return false;
		}
	}
	else if (type == TYPE_BRCAST_ADDRESS){
		var tempIP = broad1a + "." + broad2a + "." + broad3a + "." + broad4a;
		if (tempIP != Subnet)
			return false;
	}


	
  return true;


}

function DoValidateNetworkIP(Subnet, Mask)
{
  var Subadd = Subnet.match("^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$");
  var Maskadd = Mask.match("^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$");

	//do not do anything if required parameters are not specified
	if ((Subnet == "") || (Mask =="")) return true;

 var i;
  var error=false;
  var count = 0;

    var snm1a = 255;
    var snm2a = 255;
    var snm3a = 255;
    var snm4a = 255;

    var nw1a = 0;
    var nw2a = 0;
    var nw3a = 0;
    var nw4a = 0;

    var broad1a = 255;
    var broad2a = 255;
    var broad3a = 255;
    var broad4a = 255;

	arrSubadd = Subadd[0].split(".");
  	arrMask = Maskadd[0].split(".");

    snm1a = arrMask[0];
    snm2a = arrMask[1];
    snm3a = arrMask[2];
    snm4a = arrMask[3];

    var ck1a = arrSubadd[0];
    var ck2a = arrSubadd[1];
    var ck3a = arrSubadd[2];
    var ck4a = arrSubadd[3];

  	nw1a = eval(snm1a & ck1a);
	nw2a = eval(snm2a & ck2a);
	nw3a = eval(snm3a & ck3a);
	nw4a = eval(snm4a & ck4a);

	broad1a = ((nw1a) ^ (~ snm1a) & 255);
	broad2a = ((nw2a) ^ (~ snm2a) & 255);
	broad3a = ((nw3a) ^ (~ snm3a) & 255);
	broad4a = ((nw4a) ^ (~ snm4a) & 255);
	
	var tempIP = nw1a + "." + nw2a + "." + nw3a + "." + nw4a;
	
	if (tempIP == Subnet){
		errVal = Subnet + " Mask:" + Mask;		
		alertInvalid ("Network Address",errVal);
		return false;
	}
	
  return true;


}

//aids, 060810 for checking broadcast ip
function getBroadcastIP(HostIp, Mask)
{
  var Hostadd = HostIp.match("^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$");
  var Maskadd = Mask.match("^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$");
  var digits1, digits3;
  var result;
  var count = 0;

    var oct1a = 0;
    var oct2a = 0;
    var oct3a = 0;
    var oct4a = 0;

    var snm1a = 255;
    var snm2a = 255;
    var snm3a = 255;
    var snm4a = 255;

    var nw1a = 0;
    var nw2a = 0;
    var nw3a = 0;
    var nw4a = 0;

    var broad1a = 255;
    var broad2a = 255;
    var broad3a = 255;
    var broad4a = 255;

    digits1 = Hostadd[0].split(".");
    digits3 = Maskadd[0].split(".");
	
    oct1a = digits1[0];
    oct2a = digits1[1];
    oct3a = digits1[2];
    oct4a = digits1[3];

    snm1a = digits3[0];
    snm2a = digits3[1];
    snm3a = digits3[2];
    snm4a = digits3[3];

  	nw1a = eval(snm1a & oct1a);
	nw2a = eval(snm2a & oct2a);
	nw3a = eval(snm3a & oct3a);
	nw4a = eval(snm4a & oct4a);
	broad1a = ((nw1a) ^ (~ snm1a) & 255);
	broad2a = ((nw2a) ^ (~ snm2a) & 255);
	broad3a = ((nw3a) ^ (~ snm3a) & 255);
	broad4a = ((nw4a) ^ (~ snm4a) & 255);

	result = broad1a + "." + broad2a + "." + broad3a + "." + broad4a

  return result;
}

//20091116, Roger Yu for getting correct DHCP IP range
function getDhcpStart(HostIp, Mask)
{
  var Hostadd = HostIp.match("^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$");
  var Maskadd = Mask.match("^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$");
  var digits1, digits3;
  var result;
  var count = 0;

    var oct1a = 0;
    var oct2a = 0;
    var oct3a = 0;
    var oct4a = 0;

    var snm1a = 255;
    var snm2a = 255;
    var snm3a = 255;
    var snm4a = 255;

    var nw1a = 0;
    var nw2a = 0;
    var nw3a = 0;
    var nw4a = 0;

    var broad1a = 255;
    var broad2a = 255;
    var broad3a = 255;
    var broad4a = 255;

    digits1 = Hostadd[0].split(".");
    digits3 = Maskadd[0].split(".");
	
    oct1a = digits1[0];
    oct2a = digits1[1];
    oct3a = digits1[2];
    oct4a = digits1[3];

    snm1a = digits3[0];
    snm2a = digits3[1];
    snm3a = digits3[2];
    snm4a = digits3[3];

  	nw1a = eval(snm1a & oct1a);
	nw2a = eval(snm2a & oct2a);
	nw3a = eval(snm3a & oct3a);
	nw4a = eval(snm4a & oct4a);

	result = nw4a;

  return result;
}

//rick, check date
function isDateValid(year, month, day)
{
	if (month == 2) {
		if ( ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0) )
		{
		  if(day > 29) return 0;
		}
		else
		{
		  if(day > 28) return 0;
		}
  }
  else if ((month == 4)||(month == 6)||(month == 9)||(month == 11))
  {
		  if(day > 30) return 0;
  }
  return 1;

}

//Function Name: isValidEmail(fieldvalue,[fieldname]))
//Description: Check if email address entered is valid
//Parameters: fieldvalue, fieldname
//Output: true - no error
//		  false - error
function isValidEmail(fieldvalue,fieldname){
	var hasField = false;
	//if (fieldname != undefined) 
	if (fieldname) hasField = true;

	if (!isValidName(fieldvalue,fieldname,BLANK_INVALID,SPACE_INVALID)) return false;

	var tmpIndex = fieldvalue.indexOf('@');
	var dotIndex = fieldvalue.indexOf('.');

	if ((tmpIndex == -1) || (dotIndex == -1) || (tmpIndex == fieldvalue.length -1) || (dotIndex == fieldvalue.length -1) 
		|| (tmpIndex == 0) || (dotIndex == 0)){
		if (hasField) alertInvalid (fieldname,fieldvalue);
		return false;
	}

	return true;
}

function send_submit(which_form){
	get_by_id(which_form).submit();
}

function get_by_id(id){
	with(document){
		return getElementById(id);
	}
}


function showhide(element, sh)
{
    var status;
    if (sh == 1) {
        status = "block";
    }
    else {
        status = "none"
    }
	if (document.getElementById)
	{
		// standard
		document.getElementById(element).style.display = status;
	}
	else if (document.all)
	{
		// old IE
		document.all[element].style.display = status;
	}
	else if (document.layers)
	{
		// Netscape 4
		document.layers[element].display = status;
	}
}

// Load / submit functions

function getSelect(item)
{
	var idx;
	if (item.options.length > 0) {
	    idx = item.selectedIndex;
	    return item.options[idx].value;
	}
	else {
		return '';
    }
}

function setSelect(item, value)
{
	for (i=0; i<item.options.length; i++) {
        if (item.options[i].value == value) {
        	item.selectedIndex = i;
        	break;
        }
    }
}

//Frederick,070214	add disabling of all elements under 1 id given
//Function name:changeBlockState(idname,status)
//Description: This function changes the disabled and color property of elements given under id
//	Input: idname : the id of the tag or DIV, must have id property
//		   status: ENABLED | DISABLED	
function changeBlockState(idname,status){
	var i,currentcolor;
	var OS = GetBrowserOS();
	var tempelems = document.getElementById(idname).getElementsByTagName("*");

	if (status == false)
		currentcolor = "black";			
	else
		currentcolor = "#aca899";

	for (i = 0; i < tempelems.length;i++){
		if (tempelems[i].disabled != undefined)
			tempelems[i].disabled = status;

	if (OS.indexOf("msie")!= -1){	//ie returns null, firefox uses undefined.....@#@%@^#@^	
		if (tempelems[i].style.color)
			tempelems[i].style.color = currentcolor;				
	}
	else{
		if (tempelems[i].style.color != undefined)
			tempelems[i].style.color = currentcolor;				
		}
	}

	//Frederick,070226 disable the element itself
	var tempelems = document.getElementById(idname);
	if (tempelems.disabled != undefined)
		tempelems.disabled = status;

	if (OS.indexOf("msie")!= -1){	//ie returns null, firefox uses undefined.....@#@%@^#@^	
		if (tempelems.style.color)
			tempelems.style.color = currentcolor;				
	}
	else{
		if (tempelems.style.color != undefined)
			tempelems.style.color = currentcolor;				
		}

}

//check if ntp server is like ntp.dlink.com or 192.168.10.96  add by jack 2008.8.9
function isSrv(str_prf)
{
	if(!isNSrvIP(str_prf) || isValidUrl(str_prf))
		return false;
	else 
		return true;
}
  
  function isNSrv(str_prf){
  var prfok = false;
  
    if (str_prf.length < 3){
      prfok = true;
    }
    else{
      var tst_pt = str_prf.indexOf(".");
      if (tst_pt < 1 || tst_pt >=str_prf.length-1){
        prfok = true;
      }

	  var tst_last = str_prf.lastIndexOf(".");
	  if (tst_last < 1 || tst_last >= str_prf.length-1){
		prfok = true;
	  }
    }
  
    return prfok;
  }

  //check server ip address
  function isNSrvIP(str_prf){
      	var addr = new Array("","","","");
  	addr = str_prf.split(".");
	if(addr.length!=4||addr[0].value == "" ||addr[1].value == "" ||addr[2].value == "" ||addr[3] == "")
		return true;
	else
	{
	     if(addr[0] > 0 && addr[0] < 256 &&
		    addr[1] >= 0 && addr[1] < 256 &&
		       addr[2] >= 0 && addr[2] < 256 &&
		          addr[3] >= 0 && addr[3] < 256)
		             return false;
	     else
		 return true;
	}
  }

  //check if URL is valid, add by jack 2008.8.17
function isValidUrl(url){
	var addr = new Array("","","","");
	var ret=true;
	addr = url.split(".");
	//alert("addr= "+addr+"  addr.length="+addr.length+  "  url.length= "+url.length);
	if(addr.length<2)
		return false;
	else{
		for(var i=0; i<addr.length;i++){
				//alert(addr[i]);	
				if(addr[i] == '')
					return false;
				addr[i] = parseInt(addr[i],10);
				if(!isNaN(addr[i]))
					return false;
		}
	}
	return true;
}

function isInvalidNumber(input)
{ 
	var ret = false;
	var i = 0;
	for (i=0;i<input.length;i++)
	{
		if (input.charAt(i) < '0' || input.charAt(i) > '9')
		{	
			ret = true;
			break;
		}
	}
	return ret;
}
function isNValidInt(s)
{
	var i, c;
	for (i=0; i<s.length; i++)	{
		c = s.charCodeAt(i);
		if ((c < 48) || (c > 57))
			return true;
	}
	return false;
}

function isNegInt(s)
{
	if (s<0)
		return true;
	else
		return false;
}

function isNValidPort(s) {
	if((isBlank(s))||(isNaN(s))||(isNValidInt(s))||(isNegInt(s))||(s<1||s>65535))
		return true;
	else
		return false;
}

function getElementsByFieldName(target_form, field)
{
	var i;
	var form;
	var value;
	if(target_form == null || field == null) return -1;
	for(i=0; i<target_form.length; i++)
	{
		if(target_form.elements[i].name == field)
			return i;
	}
	return -1;
}

function isInvalidDomain(s, name)
{
	var src = new String(s);
	var lst = new String(" /:*?\"<>|`=+\[];,");
	var i, n;

	n = lst.length;
	for (i=0; i<n; i++) {
		var c = lst.charAt(i);
		var tmpS = new String(c);
		if (src.indexOf(tmpS) != -1) {
			alert(name + ": \\ , \" , \/ and \' are invalid.");
			return true;
		}
	}

	return false;
}

function isSpecialChar2(s, name) {
	var src = new String(s);
	var lst = new String("\\\"\'");
	var i, n;

	n = lst.length;
	for (i=0; i<n; i++) {
		var c = lst.charAt(i);
		var tmpS = new String(c);
		if (src.indexOf(tmpS) != -1) {
			alert(name + ":  \\ , \" and \' are invalid.");
			return true;
		}
	}

	return false;
}

/**********************************************************************************************************************
 * Function: function isnum(val) 
 * --------------------------------------------------------------------------------------------------------------------
 * Purpose:  check if the value is num 
 * 
 * Desc:     NA 
 * 
 * Input:    val - checked value
 * Output:   None
 * 
 * Return:   FALSE or TRUE
 * 
 * History:  20100720, Lily, Create
 **********************************************************************************************************************
 */
function isnum(val)
{
	var i;

	val = val + ""; //need to convert to string because 0 is treat as ""
		if (val == "")
		return false;

	for (i=0; i<val.length; i++ )
	{
		ch = val.charAt(i);
		if (i == val.length - 1)
		{
		    if (ch == ' ' || ch =='\t')
		    {
		        return true;
		    }
		}
		
		if((ch < '0') || (ch > '9'))
			return false;
		if (isNaN(ch))
			return false;
	}
		
	return true;
}

/********************************************************************************************* Not exceed 120 chars ****
 * Function: isValidVendorID(val)
 * ---------------------------------------------------------------------------------------------------------------------
 * Purpose:  check if VendorID is valid or not
 * 
 * Desc:     NA
 * 
 * Input:    val - checked value
 * 
 * Output:   None
 * 
 * Return:   true - OK
 *           false - Failed
 * 
 * History:  20101118, Linus Shi, Create
 ***********************************************************************************************************************
 */
function isValidVendorID(name)
{
    var i;
	var val;
	//the special characters (such as space, @, .,-, _, etc) are allowed for VendorID
	var unsafeVendorID = "\"<>%\\^[]`\+\$\,='#&:\t";
	
    if (name == "")
    {
		return true;
    }

    for ( i = 0; i < name.length; i++ ) 
    {
        val = name.charAt(i);
		if (unsafeVendorID.indexOf(val) != -1)
        {
            return false;
        }
    }

	return true;
}

function isInvalidPath(s, name) {
	var src = new String(s);
	var lst = new String(":*?\"<>|");
	var i, n, c, tmpS;

	// check special char
	n = lst.length;
	for (i=0; i<n; i++) {
		c = lst.charAt(i);
		tmpS = new String(c);
		if (src.indexOf(tmpS) != -1) {
			alert(name+"ERROR!! ");
			return true;
		}
	}

	// check invalid special case ".\", "\."
	c = new String(".");
	tmpS = new String("\\");
	i = src.indexOf(c);
	n = src.indexOf(tmpS);
	if ((i != -1) && (n != -1)) {
		if (((i + 1) == n) || ((i - 1) == n)) {
			alert(name+"ERROR!! ");
			return true;
		}
	}

	return false;
}

function isInvalidName(s)
{
    for(i=0;i<s.length;i++)
	{
		c=s.charAt(i);
		if(!(((c >= '0') && (c <= '9'))
			|| ((c >= 'a') && (c <= 'z'))
			|| ((c >= 'A') && (c <= 'Z'))
		     || (c == '_'))){
			return true;
    	}
	}
	return false;
}

