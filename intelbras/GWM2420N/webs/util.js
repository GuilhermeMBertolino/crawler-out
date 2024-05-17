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

 function isValidSSID( SSID)
 	{
 	  
 	    var unsafeString = /^[a-zA-Z0-9_-]+$/;
	   if(SSID.match(unsafeString))
	   	return false;
	   else
	   	return true;
 		
 	}

function isValidKey(val, size) {
   var ret = false;
   var len = val.length;
   var dbSize = size * 2;

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
   var unsafeString = "\"<>%\\^[]`\+\$\,='#&@.: \t";
	
   if ( unsafeString.indexOf(compareChar) == -1 && compareChar.charCodeAt(0) > 32
        && compareChar.charCodeAt(0) < 123 )
      return false; // found no unsafe chars, return false
   else
      return true;
}   

// Check if a name valid
function isValidName(name) {
   var i = 0;	
   
   for ( i = 0; i < name.length; i++ ) {
      if ( isNameUnsafe(name.charAt(i)) == true )
         return false;
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

function isValidNameWSpace(name) {
   var i = 0;	
   
   for ( i = 0; i < name.length; i++ ) {
      if ( isCharUnsafe(name.charAt(i)) == true )
         return false;
   }

   return true;
}

function isSameSubNet(lan1Ip, lan1Mask, lan2Ip, lan2Mask) {

   var count = 0;
   
   lan1a = lan1Ip.split('.');
   //alert('lan1ip='+lan1a);
   lan1m = lan1Mask.split('.');
   
   lan2a = lan2Ip.split('.');
   // alert('lan2ip='+lan2a);
   lan2m = lan2Mask.split('.');

   for (i = 0; i < 4; i++) {
      l1a_n = parseInt(lan1a[i]);
      l1m_n = parseInt(lan1m[i]);
      l2a_n = parseInt(lan2a[i]);
      l2m_n = parseInt(lan2m[i]);
      if ((l1a_n & l1m_n) == (l2a_n & l2m_n))
         count++;
   }
   if (count == 4)
      return true;
   else
      return false;
}


function isValidIpAddress(address,mask) {

   ipParts = address.split('/');
   if (ipParts.length > 2) return false;
   if (ipParts.length == 2) {
      if(isNaN(parseInt(ipParts[1]))) return false;
      num = parseInt(ipParts[1]);
      if (num <= 0 || num > 32)
         return false;
      
			var tip = /^([1-9]|[1-9]\d|\d[1-9]|1\d\d|2[0-4]\d|25[0-4])\.((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){2}(\d|[1-9]\d|\d[1-9]|1\d\d|2[0-4]\d|25[0-5])$/;
			if(!tip.test(ipParts[0])){
				return false;
	}   
   }

   if (ipParts[0] == '0.0.0.0' ||
       ipParts[0] == '255.255.255.255')
      return false;

   addrParts = ipParts[0].split('.');
   if ( addrParts.length != 4 ) return false;
   if(parseInt(addrParts[0])==0 || parseInt(addrParts[0])==127 || ((parseInt(addrParts[3])==0||parseInt(addrParts[3])==255) && ipParts.length==1)){
      return false;
   }
   if(parseInt(addrParts[0])>=224){
      return false;
   }
/*
   for (i = 0; i < 4; i++) {
      if (isNaN(parseInt(addrParts[i])) || addrParts[i] =="")
         return false;
      num = parseInt(addrParts[i]);
      if ( num < 0 || num > 255 )
         return false;
   }
*/
  var tip = /^([1-9]|[1-9]\d|\d[1-9]|1\d\d|2[0-1]\d|22[0-4])\.((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){2}([1-9]|[1-9]\d|\d[1-9]|1\d\d|2[0-4]\d|25[0-4])$/;
	if(ipParts.length==1&&!tip.test(ipParts[0])){
		return false;
	}
   return true;
}


function isValidNetMask(addr) 
{
	var tip = /^([1-9]|[1-9]\d|\d[1-9]|1\d\d|2[0-4]\d|25[0-5])\.((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){2}([0-9]|[1-9]\d|\d[1-9]|1\d\d|2[0-4]\d|25[0-5])$/;
	if(!tip.test(addr)){
		return false;
	}
	var msks = addr.split(".");
	var idx = 0;

	if(parseInt(msks[0])<255&&(parseInt(msks[1])>0||parseInt(msks[2])>0||parseInt(msks[3])>0))
		return false;
	else if(parseInt(msks[0])<255)
		idx = 0;
	else	
	{
		if(parseInt(msks[1])<255&&(parseInt(msks[2])>0||parseInt(msks[3])>0))
			return false;
		else if(parseInt(msks[1])<255)
			idx = 1;
		else
		{
			if(parseInt(msks[2])<255&&parseInt(msks[3])>0)
				return false;
			else if(parseInt(msks[2])<255)
				idx = 2;
			else
				idx = 3;
		}
	}
	if(idx>0&&msks[idx]==0&&msks[idx-1]==255)
		idx--;
	var mip = /^(128|192|224|240|248|252|254|255)$/;
	if(!mip.test(msks[idx])){
		return false;
	}
	return true;
}


function isbroadcassAddress(ip,mask)
{	
	var ipParts = ip.split('.');
 	var msParts=mask.split('.');
	var iptemp=0;
	var mstemp=0
		
	var tem3=ipParts[3]&msParts[3];
	var tem2=ipParts[2]&msParts[2];
	var tem1=ipParts[1]&msParts[1];
	var tem0=ipParts[0]&msParts[0];
	
	var a=255-msParts[0]; 
	var b=255-msParts[1];
	var c=255-msParts[2];
	var d=255-msParts[3];

	var broad0=tem0+a;
	var broad1=tem1+b;
	var broad2=tem2+c;
	var broad3=tem3+d;
	
	if((broad3==ipParts[3])&&(broad2==ipParts[2])&&(broad1==ipParts[1])&&(broad0==ipParts[0]))
	return false;
	else
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
   if (num <= 0 || num > 128)
      return false;
   return true;
}

function areSamePrefix(addr1, addr2) {
   var i, j;
   var a = [0, 0, 0, 0, 0, 0, 0, 0];
   var b = [0, 0, 0, 0, 0, 0, 0, 0];

   addr1Parts = addr1.split(':');
   if (addr1Parts.length < 3 || addr1Parts.length > 8)
      return false;
   addr2Parts = addr2.split(':');
   if (addr2Parts.length < 3 || addr2Parts.length > 8)
      return false;
   j = 0;
   for (i = 0; i < addr1Parts.length; i++) {
      if ( addr1Parts[i] == "" ) {
		 if ((i != 0) && (i+1 != addr1Parts.length)) {
			j = j + (8 - addr1Parts.length + 1);
		 }
		 else {
		    j++;
		 }
	  }
	  else {
         a[j] = parseInt(addr1Parts[i], 16);
		 j++;
	  }
   }
   j = 0;
   for (i = 0; i < addr2Parts.length; i++) {
      if ( addr2Parts[i] == "" ) {
		 if ((i != 0) && (i+1 != addr2Parts.length)) {
			j = j + (8 - addr2Parts.length + 1);
		 }
		 else {
		    j++;
		 }
	  }
	  else {
         b[j] = parseInt(addr2Parts[i], 16);
		 j++;
	  }
   }
   //only compare 64 bit prefix
   for (i = 0; i < 4; i++) {
      if (a[i] != b[i]) {
	     return false;
	  }
   }
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

function isValidSubnetMask(mask) {
   var i = 0, num = 0;
   var zeroBitPos = 0, oneBitPos = 0;
   var zeroBitExisted = false;

   if ( mask == '0.0.0.0' )
      return false;

   maskParts = mask.split('.');
   if ( maskParts.length != 4 ) return false;

   for (i = 0; i < 4; i++) {
      if ( isNaN(maskParts[i]) == true )
         return false;
      num = parseInt(maskParts[i]);
      if ( num < 0 || num > 255 )
         return false;
      if ( zeroBitExisted == true && num != 0 )
         return false;
      zeroBitPos = getLeftMostZeroBitPos(num);
      oneBitPos = getRightMostOneBitPos(num);
      if ( zeroBitPos < oneBitPos )
         return false;
      if ( zeroBitPos < 8 )
         zeroBitExisted = true;
   }

   return true;
}

function isValidPort(port) {
   var fromport = 0;
   var toport = 100;

   portrange = port.split(':');
   if ( portrange.length < 1 || portrange.length > 2 ) {
       return false;
   }
   if ( isNaN(portrange[0]) )
       return false;
   fromport = parseInt(portrange[0]);
   
   if ( portrange.length > 1 ) {
       if ( isNaN(portrange[1]) )
          return false;
       toport = parseInt(portrange[1]);
       if ( toport <= fromport )
           return false;      
   }
   
   if ( fromport < 1 || fromport > 65535 || toport < 1 || toport > 65535 )
       return false;
   
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
   fromport = parseInt(portrange[0]);

   if ( portrange.length > 1 ) {
       if ( isNaN(portrange[1]) )
          return false;
       toport = parseInt(portrange[1]);
       if ( toport <= fromport )
           return false;
   }

   if ( fromport < 1 || fromport > 65535 || toport < 1 || toport > 65535 )
       return false;

   return true;
}

function isValidMacAddress(address) {
   var c = '';
   var num = 0;
   var i = 0, j = 0;
   var zeros = 0;

   addrParts = address.split(':');
   if ( addrParts.length != 6 ) return false;

   for (i = 0; i < 6; i++) {
      if ( addrParts[i] == '' )
         return false;
      for ( j = 0; j < addrParts[i].length; j++ ) {
         c = addrParts[i].toLowerCase().charAt(j);
         if ( (c >= '0' && c <= '9') ||
              (c >= 'a' && c <= 'f') )
            continue;
         else
            return false;
      }

      num = parseInt(addrParts[i], 16);
      if ( num == NaN || num < 0 || num > 255 )
         return false;
      if ( num == 0 )
         zeros++;
   }
   if (zeros == 6)
      return false;

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

function convert(val)
// this converts a given char to url hex form
{
   return  "%" + decToHex(val.charCodeAt(0), 16);
}


function encodeUrl(val)
{
   var len     = val.length;
   var i       = 0;
   var newStr  = "";
   var original = val;

   for ( i = 0; i < len; i++ ) {
      if ( val.substring(i,i+1).charCodeAt(0) < 255 ) {
         // hack to eliminate the rest of unicode from this
         if (isUnsafe(val.substring(i,i+1)) == false)
            newStr = newStr + val.substring(i,i+1);
         else
            newStr = newStr + convert(val.substring(i,i+1));
      } else {
         // woopsie! restore.
         alert ("Found a non-ISO-8859-1 character at position: " + (i+1) + ",\nPlease eliminate before continuing.");
         newStr = original;
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

function tbl_head_str(title,img,width)
{
    var m;
    if( width == null )
        m='<TABLE border=0 cellPadding=0 width=700>';
    else
        m='<TABLE border=0 cellPadding=0 width=' + width + '>';

	m+='<TR><TD valign=middle ';
	if (img)
		m+=img;
	else
		m+='background=""';

	m+=' colspan=3 class=title><span class=style1>&nbsp;&nbsp;'+title+'</span></TD></TR>';
	m+='<TR><TD class=vline rowSpan=15 width=1><BR></TD><TD style="height:200px;vertical-align:top;"><br><br>';
	return m;
}


function tbl_head(title,img,width)
{
document.write(tbl_head_str(title,img,width));
}

function tbl_tail_str(button)
{
	var m='<br>&nbsp;</TD><TD class=vline rowSpan=15 width=1><BR></TD></TR>';
	m+='<TR><TD class=hline></TD></TR>';
	if (button!='')
	{
		m+='<TR><TD valign=center height=40>&nbsp;&nbsp;';
		m+=button;
		m+='</TD></TR>';
		m+='<TR><TD class=hline></TD></TR>';
	}
	m+='</table>';
	return m;
}

function tbl_tail(button)
{
	document.write(tbl_tail_str(button));
}

function tbl_tail_save_str(f,help)
{
	var m='<br>&nbsp;</TD><TD class=vline rowSpan=15 width=1><BR></TD></TR>';
	m+='<TR><TD class=hline></TD></TR>';
	m+="<TR><TD valign=center height=40>&nbsp;&nbsp;<INPUT class=button type=button value='±£ ´æ' onClick=preSubmit("+f+")>&nbsp;";
	m+="<INPUT class=button type=button value='»¹ Ô­' onClick=init("+f+")>&nbsp;";
	m+="<INPUT class=button type=button value='°ï Öú' onClick=doHelp('"+help+"')>";
	m+='</TD></TR>';
	m+='<TR><TD class=hline></TD></TR>';
	m+='</table>';
	return m;
}

function tbl_tail_save(f,button)
{
	document.write(tbl_tail_save_str(f,button));
}



function GetReqObj()
{
	var request = false;

	try {
		req = new XMLHttpRequest();
	 } catch (trymicrosoft) 
	 {
		try {
    		req = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (othermicrosoft) {
    		try {
				req = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (failed) {
			req = false;
			}
  		}
	 }
	
	if (! req)
	{
		alert("Error initializing HttpRequest!");
		return false;
	}

	return req;
}
