function getRefToDivNest(divID, oDoc) 
{
  	if( !oDoc ) { oDoc = document; }
  	if( document.layers ) {
		if( oDoc.layers[divID] ) { return oDoc.layers[divID]; } else {
		for( var x = 0, y; !y && x < oDoc.layers.length; x++ ) {
			y = getRefToDivNest(divID,oDoc.layers[x].document); }
		return y; } }
  	if( document.getElementById ) { return document.getElementById(divID); }
  	if( document.all ) { return document.all[divID]; }
  	return document[divID];
}
function progressBar( oBt, oBc, oBg, oBa, oWi, oHi, oDr ) 
{
  	MWJ_progBar++; this.id = 'MWJ_progBar' + MWJ_progBar; this.dir = oDr; this.width = oWi; this.height = oHi; this.amt = 0;
  	//write the bar as a layer in an ilayer in two tables giving the border
  	document.write( '<span id = "progress_div" class = "off" > <table border="0" cellspacing="0" cellpadding="'+oBt+'">'+
	'<tr><td bgcolor="'+oBc+'">'+
		'<table border="0" cellspacing="0" cellpadding="0"><tr><td height="'+oHi+'" width="'+oWi+'" bgcolor="'+oBg+'">' );
  	if( document.layers ) {
		document.write( '<ilayer height="'+oHi+'" width="'+oWi+'"><layer bgcolor="'+oBa+'" name="MWJ_progBar'+MWJ_progBar+'"></layer></ilayer>' );
  	} 
	else {
		document.write( '<div style="position:relative;top:0px;left:0px;height:'+oHi+'px;width:'+oWi+';">'+
			'<div style="position:absolute;top:0px;left:0px;height:0px;width:0;font-size:1px;background-color:'+oBa+';" id="MWJ_progBar'+MWJ_progBar+'"></div></div>' );
  	}
  	document.write( '</td></tr></table></td></tr></table></span>\n' );
  	this.setBar = resetBar; //doing this inline causes unexpected bugs in early NS4
  	this.setCol = setColour;
}
function resetBar( a, b ) 
{
  	//work out the required size and use various methods to enforce it
  	this.amt = ( typeof( b ) == 'undefined' ) ? a : b ? ( this.amt + a ) : ( this.amt - a );
  	if( isNaN( this.amt ) ) { this.amt = 0; } if( this.amt > 1 ) { this.amt = 1; } if( this.amt < 0 ) { this.amt = 0; }
  	var theWidth = Math.round( this.width * ( ( this.dir % 2 ) ? this.amt : 1 ) );
	//alert(theWidth);
  	var theHeight = Math.round( this.height * ( ( this.dir % 2 ) ? 1 : this.amt ) );
  	var theDiv = getRefToDivNest( this.id ); if( !theDiv ) { window.status = 'Progress: ' + Math.round( 100 * this.amt ) + '%'; return; }
  	if( theDiv.style ) { theDiv = theDiv.style; theDiv.clip = 'rect(0px '+theWidth+'px '+theHeight+'px 0px)'; }
 	var oPix = document.childNodes ? 'px' : 0;
  	theDiv.width = theWidth + oPix; theDiv.pixelWidth = theWidth; theDiv.height = theHeight + oPix; theDiv.pixelHeight = theHeight;
  	if( theDiv.resizeTo ) { theDiv.resizeTo( theWidth, theHeight ); }
  	theDiv.left = ( ( this.dir != 3 ) ? 0 : this.width - theWidth ) + oPix; theDiv.top = ( ( this.dir != 4 ) ? 0 : this.height - theHeight ) + oPix;
}
function setColour( a ) 
{
  	//change all the different colour styles
  	var theDiv = getRefToDivNest( this.id ); if( theDiv.style ) { theDiv = theDiv.style; }
  	theDiv.bgColor = a; theDiv.backgroundColor = a; theDiv.background = a;
}
function openWindow(url, windowName, wide, high) 
{
	if (document.all)
		var xMax = screen.width, yMax = screen.height;
	else if (document.layers)
		var xMax = window.outerWidth, yMax = window.outerHeight;
	else
	   var xMax = 640, yMax=500;
	
	var xOffset = (xMax - wide)/2;
	var yOffset = (yMax - high)/3;

	var settings = 'width='+wide+',height='+high+',screenX='+xOffset+',screenY='+yOffset+',top='+yOffset+',left='+xOffset+',resizable=yes,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes';
	window.open(url, windowName, settings);
}
function skip () { this.blur(); }
function disableTextField (field) 
{
  	if (document.all || document.getElementById)
    	field.disabled = true;
  	else {
    	field.oldOnFocus = field.onfocus;
    	field.onfocus = skip;
  	}
}
function enableTextField (field) 
{
  	if (document.all || document.getElementById)
    	field.disabled = false;
  	else
    	field.onfocus = field.oldOnFocus;
}
function disableButton (button) 
{
  	if (document.all || document.getElementById)
    	button.disabled = true;
  	else if (button) {
		button.oldOnClick = button.onclick;
		button.onclick = null;
		button.oldValue = button.value;
		button.value = 'DISABLED';
  	}
}
function enableButton (button) 
{
  	if (document.all || document.getElementById)
    	button.disabled = false;
  	else if (button) {
    	button.onclick = button.oldOnClick;
    	button.value = button.oldValue;
  	}
}
function arpTblClick(url)
{
	openWindow(url, 'ArpTbl', 700, 400);
}
function resetForm()
{
	location=location; 
}
function get_by_id(v)
{
	return document.getElementById(v);	
}
function get_by_name(v)
{
	return document.getElementByName(v);	
}
function cls(v)
{ 
	with(event.srcElement);	
	if(value==defaultValue){ 
		value="";
		v.color='#000';
	}
}
function res(v)
{
	with(event.srcElement);
	if(value==""){ 
		value=defaultValue;
		v.color='#999';
	}
}
function atoi(s,n)
{
    	i=1;
    	if (n!=1) {
        	while (i!=n && s.length!=0){
            		if (s.charAt(0)=='.') i++;
            			s = s.substring(1);
        	}
        	if (i!=n) return -1;
    	}
    	for (i=0; i<s.length; i++){
        	if (s.charAt(i)=='.'){ 
			s=s.substring(0, i); 
			break; 
		}
    	}
    	if (s.length==0) return -1;
    	return parseInt(s, 10);
}
function trim(s)
{
    return s.replace(/(^\s*)|(\s*$)/g, "");
}
//check empty input
function isEmpty(s)
{
   	if(s=="") return 0;
    	return 1;
}
//check string
function isString(v)
{
	for (var i=0; i<v.length; i++) {
    		if ( (v.charAt(i) >= '0' && v.charAt(i) <= '9') ||
			(v.charAt(i) >= 'a' && v.charAt(i) <= 'z') || (v.charAt(i) >= 'A' && v.charAt(i) <= 'Z') || 
			(v.charAt(i) == '-') || (v.charAt(i) == '_') || (v.charAt(i) == '.') || (v.charAt(i) == '@'))
			continue;
		
		return 0;
  	}
	return 1;
}
function isString2(v)
{
	for (var i=0; i<v.length; i++) {
    		if ( (v.charAt(i) >= '0' && v.charAt(i) <= '9') ||	(v.charAt(i) >= 'a' && v.charAt(i) <= 'z') || (v.charAt(i) >= 'A' && v.charAt(i) <= 'Z'))
			continue;
		
		return 0;
  	}
	return 1;
}
function stringCheck(s,m)
{
	if(!isEmpty(s)) {alert(m+JS_msg139); return 0;}
	return 1;
}
//check empty input and space input
function blankCheck(v,m,n)
{	
	if ((v.length==0) || (v.indexOf(" ") >= 0)){
		if(m==MM_ntp_time){
			alert(JS_msg180);
			return 0;
		}
		if(m==MM_hostname){
			alert(JS_msg182);
			return 0;
		}
		if(m=="E-mail"){
			alert(JS_msg179);
			return 0;
		}
		else{
			alert(m+" "+n); return 0;
		}
	}
	return 1;
}
function blankCheck2(v)
{	
	if ((v.length==0) || (v.indexOf(" ") >= 0)){alert(JS_msg154); return 0;}
	return 1;
}
function blankCheck3(v)
{	
	if ((v.length==0) || (v.indexOf(" ") >= 0)){alert(JS_msg155); return 0;}
	return 1;
}
function blankCheckNew(v,m)
{	
	if ((v.length==0) || (v.indexOf(" ") >= 0))  return 0;
	return 1;
}
function blankCheckDir(v,m)
{	
	if ((v.length==0) || (v.indexOf(" ") >= 0)){alert(m+JS_msg151); return 0;}
	return 1;
}
function isUserString(v)
{
	for (var i=0; i<v.length; i++) {
    	if ( (v.charAt(i) >= '0' && v.charAt(i) <= '9') || (v.charAt(i) >= 'a' && v.charAt(i) <= 'z') || (v.charAt(i) >= 'A' && v.charAt(i) <= 'Z'))
			continue;
		
		return 0;
  	}
	return 1;
}
function blankUserCheck(v,n)
{	
	if ((v.length==0) || (v.indexOf(" ") >= 0)){alert(n); return 0;}
	return 1;
}
function blankUserCheck2(v,n)
{	
	if ((v.length==0) || (v.indexOf(" ") >= 0)){alert(n); return 0;}
	if (!isUserString(v)){alert(n); return 0;}
	return 1;
}
function commCheck(v,m)
{	
	if(!isUserString(v)) {alert(JS_msg192); return 0;}
	return 1;
}
//check hostname
function hostnameCheck(v,m)
{	
	if (v.value.indexOf(" ") >= 0){alert(m+JS_msg88); return 0;}
	return 1;
}
//check email
function emailCheck(v,m)
{
	if(!isString(v)) {alert(m+JS_msg49); return 0;}
  	return 1;
}
//check ssid
function isAllChar (str)
{
	if(/[\xB7]/.test(str))return 1;
	if(!(/[^\x00-\xff]/.test(str))) return 0;	
	return 1;
}
function isSSID (str)
{
	var re1=/[^\x20-\x7D]/;
	var re2=/[\x22\x24\x25\x27\x2F\x3B\x3C\x3E\x5C\x60]/;
	if(re1.test(str)||re2.test(str))	return 0;
	return 1;
}
function ssidCheck(s)
{
	if (s.length==0){alert(JS_msg206); return 0;}
	if (!isSSID(s)){alert(JS_msq207);return 0;}	
	return 1;
}
//check number
function isNumber(v) 
{
	for (var i=0; i<v.length; i++) {
    		if (v.charAt(i) >= '0' && v.charAt(i) <= '9') continue;
		return 0;
  	}
	return 1;
}
function numberCheck(v,m) 
{
	if (!blankCheck(v,m,JS_msg58)) return 0;
	if (!isNumber(v)) {alert(m+JS_msg61); return 0};
	return 1;
}
//check number range
function numberRangeCheck(v,a,b,m) 
{
    if(m==MM_total_uplink_speed||MM_total_downlink_speed){
   	if(!blankCheck(v,m, JS_msg191 +JS_msg184)) return 0;}
    else{ if(!blankCheck(v,m, JS_msg174)) return 0;}
	if (!isNumber(v)) {alert(m+JS_msg61); return 0;}
   	if ((parseInt(v)<a)||(parseInt(v)>b)){alert(m+JS_msg62+a+"-"+b+"!") ;return 0;} 
   	return 1;
}
function numberRangeCheck2(v,a,b,m) 
{
   	if (!blankCheck2(v)) return 0;
	if (!isNumber(v)) {alert(m+JS_msg61); return 0};
   	if ((parseInt(v)<a)||(parseInt(v)>b)){alert(m+JS_msg62+a+"-"+b+"!") ;return 0;} 
   	return 1;
}
function numberRangeCheck3(v,a,b,m) 
{
   	if (!blankCheck3(v)) return 0;
	if (!isNumber(v)) {alert(m+JS_msg61); return 0};
   	if ((parseInt(v)<a)||(parseInt(v)>b)){alert(m+JS_msg62+a+"-"+b+"!") ;return 0;} 
   	return 1;
}
//check port
function isPort(v) 
{
   	if (!isNumber(v)) return 0;          
   	if ((parseInt(v)<1)||(parseInt(v)>65535)) return 0;
   	return 1;
}
function portCheck(v,m) 
{
   	if (!isEmpty(v)) {alert(m+JS_msg139); return 0;}
   	if (!isPort(v)) {alert(JS_msg65+JS_msg175+"!"); return 0;}         
   	return 1;
}
function portRangeCheck(a,b) 
{
   	if (parseInt(a) > parseInt(b)) return 0;
   	return 1;
}
//check hex
function hexCheck(v,m) 
{
	for (var i=0; i<v.length; i++) {
    	if ( (v.charAt(i) >= '0' && v.charAt(i) <= '9') || (v.charAt(i) >= 'a' && v.charAt(i) <= 'f') || (v.charAt(i) >= 'A' && v.charAt(i) <= 'F'))
			continue;
		alert(m+JS_msg64);
		return 0;
  	}
	return 1;
}
//check mac address
function isMac(s)
{
	var re=/[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/;
	if(!re.test(s)) return 0;
	if(s.length!=17) return 0;
	if((s.toUpperCase()=="FF:FF:FF:FF:FF:FF")||(s.toUpperCase()=="00:00:00:00:00:00")) return 0;
	for(var k=0;k<s.length;k++){if((s.charAt(1)&0x01)||(s.charAt(1).toUpperCase()=='B')||(s.charAt(1).toUpperCase()=='D')||(s.charAt(1).toUpperCase()=='F')) return 0;}
	return 1;
}
function macCheck(s,m)
{
	if(!isEmpty(s)) {alert(m+JS_msg139); return 0;}
	if(!isMac(s)) {alert(m+JS_msg140); return 0;}
	return 1;
}
// check ip4 address
function isIpChar(s)
{
	var re=/[^0-9.]/;
	if(re.test(s)) return 0;
	var v=s.split(".");
	if(v.length!=4) return 0;
	return 1;
}
function ipTest(s,n,min,max)
{
	var d=atoi(s,n);
	if(d<min||d>max) return 0;
	return 1;
}
function isIp(s)
{
	if(!isIpChar(s)) return 0;
	if(!ipTest(s,1,1,255)||!ipTest(s,2,0,255)||!ipTest(s,3,0,255)||!ipTest(s,4,1,254)) return 0;
	return 1;
}
function ipCheck(s,m)
{
	if(!isEmpty(s)) {alert(m+JS_msg139); return 0;}
	if(!isIp(s)) {alert(JS_msg65+m+"!"); return 0;}
	return 1;
}
//check mask address
function maskTest(s,n)
{
  	var d=atoi(s,n);
  	if(!(d==0||d==128||d==192||d==224||d==240||d==248||d==252||d==254||d==255)) return 0;
  	return 1;
}
function isMask(s)
{
	if(!isIpChar(s)) return 0;
	if(!maskTest(s,1)||!maskTest(s,2)||!maskTest(s,3)||!maskTest(s,4)) return 0;
	return 1;
}
function maskCheck(s,m)
{
	if(!isEmpty(s)) {alert(m+JS_msg139); return 0;}
	if(!isMask(s)) {alert(JS_msg65+m+"!"); return 0;}
	return 1;
}
//check ip6 address
function ipv6AddrCheck(v, len, m)
{
	var ip_item = new Array();
	ip_item = v.split(":");
	for (var i=0; i<ip_item.length; i++) {
		if (parseInt(ip_item[i], 16) == "NaN") {alert(m+JS_msg64);return 0;}
	}
	return 1;
}
//check url address
function urlCheck(v)
{
	for (var i=0; i<v.length; i++) {
    	if ( (v.charAt(i) >= '0' && v.charAt(i) <= '9') ||
			(v.charAt(i) >= 'a' && v.charAt(i) <= 'z') || (v.charAt(i) >= 'A' && v.charAt(i) <= 'Z') || 
			(v.charAt(i) == '-') || (v.charAt(i) == '_') || (v.charAt(i) == '.'))
			continue;
		return 0;
  	}
  	return 1;
}
//check url address and ip address
function ipUrlCheck(v,m)
{
	if(!isIp(v)){
		if(!urlCheck(v,m))
		return 0;
	}
	return 1;
}
//check subnet ip
function subnetCheck(ip, mask, client)
{
  	ip_d = atoi(ip, 1);
  	mask_d = atoi(mask, 1);
  	client_d = atoi(client, 1);
  	if ( (ip_d & mask_d) != (client_d & mask_d ) )	return 0;

  	ip_d = atoi(ip, 2);
  	mask_d = atoi(mask, 2);
  	client_d = atoi(client, 2);
  	if ( (ip_d & mask_d) != (client_d & mask_d ) )	return 0;

  	ip_d = atoi(ip, 3);
  	mask_d = atoi(mask, 3);
  	client_d = atoi(client, 3);
  	if ( (ip_d & mask_d) != (client_d & mask_d ) )	return 0;

  	ip_d = atoi(ip, 4);
  	mask_d = atoi(mask, 4);
  	client_d = atoi(client, 4);
  	if ( (ip_d & mask_d) != (client_d & mask_d ) )	return 0;
  	return 1;
}
//check 2 ip range
function clientRangeCheck(start,end)
{
	var start_d, end_d;
	start_d = atoi(start,4);
	start_d += atoi(start,3)*256;
	start_d += atoi(start,2)*256;
	start_d += atoi(start,1)*256;
	
	end_d = atoi(end,4);
	end_d += atoi(end,3)*256;
	end_d += atoi(end,2)*256;
	end_d += atoi(end,1)*256;
	
	if ( start_d > end_d )	return 0;
	return 1;
}
function scheduleSyncTime(form_name)
{
	var currentTime = new Date();

	var seconds = currentTime.getSeconds();
	var minutes = currentTime.getMinutes();
	var hours = currentTime.getHours();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();

	var seconds_str = " ";
	var minutes_str = " ";
	var hours_str = " ";
	var month_str = " ";
	var day_str = " ";
	var year_str = " ";

	if(seconds < 10)
		seconds_str = "0" + seconds;
	else
		seconds_str = ""+seconds;

	if(minutes < 10)
		minutes_str = "0" + minutes;
	else
		minutes_str = ""+minutes;

	if(hours < 10)
		hours_str = "0" + hours;
	else
		hours_str = ""+hours;

	if(month < 10)
		month_str = "0" + month;
	else
		month_str = ""+month;

	if(day < 10)
		day_str = "0" + day;
	else
		day_str = day;

	var tmp1 = month_str + day_str + hours_str + minutes_str + year + " ";
	var tmp2 = hours_str +":"+ minutes_str +":"+seconds_str;
	form_name.CurTime1.value = tmp1;
	form_name.CurTime2.value = tmp2;
}
function scheduleWeek(form_name)
{
	if (form_name.week_all.checked == true) {
		form_name.week_1.disabled = true;
		form_name.week_2.disabled = true;
		form_name.week_3.disabled = true;
		form_name.week_4.disabled = true;
		form_name.week_5.disabled = true;
		form_name.week_6.disabled = true;
		form_name.week_7.disabled = true;

		form_name.week_1.checked = true;
		form_name.week_2.checked = true;
		form_name.week_3.checked = true;
		form_name.week_4.checked = true;
		form_name.week_5.checked = true;
		form_name.week_6.checked = true;
		form_name.week_7.checked = true;		
	} 
	else {		
		form_name.week_1.disabled = false;
		form_name.week_2.disabled = false;
		form_name.week_3.disabled = false;
		form_name.week_4.disabled = false;
		form_name.week_5.disabled = false;
		form_name.week_6.disabled = false;
		form_name.week_7.disabled = false;

		form_name.week_1.checked = false;
		form_name.week_2.checked = false;
		form_name.week_3.checked = false;
		form_name.week_4.checked = false;
		form_name.week_5.checked = false;
		form_name.week_6.checked = false;
		form_name.week_7.checked = false;
	}
}
function scheduleTime(form_name)
{
	if (form_name.time_all.checked == true) {
		form_name.time_h1.disabled = true;
		form_name.time_h2.disabled = true;
		form_name.time_m1.disabled = true;
		form_name.time_m2.disabled = true;
	} 
	else {
		form_name.time_h1.disabled = false;
		form_name.time_h2.disabled = false;
		form_name.time_m1.disabled = false;
		form_name.time_m2.disabled = false;
	}
}
function scheduleWeekCheck(form_name)
{
	if (form_name.week_all.checked == false){
		for(var i=1;i<=7;i++){			
			if(eval("form_name.week_"+i+".checked") == true)
				return 0;
		}

		alert(JS_msg113);
		return 1;
	}
	return 0;
}
function scheduleTimeRangeCheck(val, flag)
{	
	var t = /[^0-9]{1,2}/;	
	if (t.test(val)){
		alert(JS_msg108);
		return 0;
	}
		
	if (flag == 1)	{	//hour
		if (parseInt(val) < 0 || parseInt(val) > 23){  
			alert(JS_msg109);
			return 0;
		}
	}
	else {	//minute
		if (parseInt(val) < 0 || parseInt(val) > 59){  
			alert(JS_msg110);
			return 0;
		}
	}
	return 1;
}
function scheduleTimeCmpCheck(v1, v2, v3, v4)
{
	if(v1.length==2 && v1.charAt(0) == 0)
		v1 = v1.charAt(1);
	if(v2.length==2 && v2.charAt(0) == 0)
		v2 = v2.charAt(1);
	if(v3.length==2 && v3.charAt(0) == 0)
		v3 = v3.charAt(1);
	if(v4.length==2 && v4.charAt(0) == 0)
		v4 = v4.charAt(1);
	
	if (parseInt(v1) > parseInt(v2)){
		alert(JS_msg111);
		return 0;
	}

	if (parseInt(v1) == parseInt(v2)) {
		if (parseInt(v3) > parseInt(v4)){
			alert(JS_msg111);
			return 0;
		}
	}
	return 1;
}
function scheduleTimeCheck(form_name)
{
	if (form_name.time_all.checked == false) {
		if (!scheduleTimeRangeCheck(form_name.time_h1.value, 1)) return 1;
		if (!scheduleTimeRangeCheck(form_name.time_h2.value, 1)) return 1;
		if (!scheduleTimeRangeCheck(form_name.time_m1.value, 0)) return 1;
		if (!scheduleTimeRangeCheck(form_name.time_m2.value, 0)) return 1;
		if (!scheduleTimeCmpCheck(form_name.time_h1.value, form_name.time_h2.value, form_name.time_m1.value, form_name.time_m2.value)) return 1;
	}
	return 0;
}
function scheduleShowWeek(w)
{
	var tmp="";
	var flag = 0;
	if(parseInt(w)>=254)
		tmp = "Seg,Ter,Quar,Qui,Sex,Sab,Dom";
	else{
		if(parseInt(w) & (0x1<<1)){
			tmp="Seg";
			flag=1;
		}
		if(parseInt(w) & (0x1<<2)){
			if(flag == 1){
				tmp +=",Ter";
			}else{
				tmp="Ter";
				flag=1;
			}
		}
		if(parseInt(w) & (0x1<<3)){
			if(flag == 1){
				tmp +=",Quar";
			}else{
				tmp="Quar";
				flag=1;
			}
		}
		if(parseInt(w) & (0x1<<4)){
			if(flag == 1){
				tmp +=",Qui";
			}else{
				tmp="Qui";
				flag=1;
			}
		}
		if(parseInt(w) & (0x1<<5)){
			if(flag == 1){
				tmp +=",Sex";
			}else{
				tmp="Sex";
				flag=1;
			}
		}
		if(parseInt(w) & (0x1<<6)){
			if(flag == 1){
				tmp +=",Sab";
			}else{
				tmp="Sab";
				flag=1;
			}
		}
		if(parseInt(w) & (0x1<<7)){
			if(flag == 1){
				tmp +=",Dom";
			}else{
				tmp="Dom";
			}
		}
	}
	return tmp;
}

function urlShowIp(v1,v2)
{
	var tmp="";
	if(v1=="" && v2=="")
		tmp="Todos";
	else if(v1 && v2)
		tmp=v1+"-"+v2;
	else if(v1 && v2=="")
		tmp=v1;
	else if(v2 && v1=="")
		tmp=v2;
	
	return tmp;
}
function disableAllButton()
{
	var forms = document.forms;
	for (var j = 0; j < forms.length; j++) {
		var selectForm = document.forms[j];
		var control = document.forms[j].elements; 
		for (var i = 0; i < control.length; i++) {
			if (control[i].type == "button" || control[i].type == "reset" || control[i].type == "submit") {
				control[i].disabled = true;
			}
		}
	}
}

function enableAllButton()
{
	var forms = document.forms;
	for (var j = 0; j < forms.length; j++) {
		var selectForm = document.forms[j];
		var control = document.forms[j].elements; 
		for (var i = 0; i < control.length; i++) {
			if (control[i].type == "button" || control[i].type == "reset" || control[i].type == "submit") {
				control[i].disabled = false;
			}
		}
	}
}
/*验证IP或掩码是否合法*/
function checkIpMask(IPorMask,msg,type)
{
	var exp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	if(IPorMask == "" || IPorMask == null){  
		alert(JS_127+JS_msg58);
        return false;  
    } 
	var reg = IPorMask.match(exp);

	if(reg==null)
	{
		alert(msg)
		return false;
	}
	else
	{
		if(RegExp.$1 != parseInt(RegExp.$1).toString() ||
		RegExp.$2 != parseInt(RegExp.$2).toString()||
		RegExp.$3 != parseInt(RegExp.$3).toString()||
		RegExp.$4 != parseInt(RegExp.$4).toString())
		{
			alert(msg);
			return false;
		}
		if(type==1){  //1 for mask
			var part1,part2,part3,part4;
			function maskPartCheck(part){
				var maskPart=[0,128,192,224,240,248,252,254,255];
				for(var i in maskPart){
					if(part ==  maskPart[i]){
						return true;
					}
				}
				return false;
			}
			if(maskPartCheck(RegExp.$1)&&maskPartCheck(RegExp.$2)&&maskPartCheck(RegExp.$3)&&maskPartCheck(RegExp.$4)){
				if(RegExp.$1<255){
					if(RegExp.$2==0&&RegExp.$3==0&&RegExp.$4==0){
						return true;
					}else{
						alert(msg);
						return false;
					}
				}
				if(RegExp.$2<255){
					if(RegExp.$3==0&&RegExp.$4==0){
						return true;
					}else{
						alert(msg);
						return false;
					}
				}
				if(RegExp.$3<255){
					if(RegExp.$4==0){
						return true;
					}else{
						alert(msg);
						return false;
					}
				}		
			}else{
				alert(msg);
				return false;
			}
		}
		return true;
	}
}
function checkStringValue(str){
	if(/[^\d\.\-\_\a-zA-Z\u4E00-\u9FA5]/gi.test(str)){		
		return false;
	}	
	return true;
}
function checkStringValue2(str){
	if(/[^\d\.\-\_\a-zA-Z]/gi.test(str)){		
		return false;
	}	
	return true;
}
function checkStringValue3(str){
	if(/[^\d\a-zA-Z]/gi.test(str)){		
		return false;
	}	
	return true;
}
var Cookie = {
    Get : function(name){
        var arrStr = document.cookie.split("; ");
        for(var i = 0;i < arrStr.length;i ++){
            var temp = arrStr[i].split("=");
            if(temp[0] == name) 
                return unescape(temp[1]);
        }
        return null;
    },     

    Set : function(name, value, hours, path){
        var str = name + "=" + escape(value);

        if(hours != undefined && hours > 0){
            var date = new Date();
            var ms = hours * 3600 * 1000;
            date.setTime(date.getTime() + ms);
            str += "; expires=" + date.toGMTString();
        }
		 
        if(path == undefined){
			path = "/";
		}
        str += "; path=" + path;
        
        document.cookie = str;
    },    

    Delete :function(name, path){
        var date = new Date();
		var str;
        date.setTime(date.getTime() - 10000);
		
        if(path == undefined){
            path = "/";
		}
        str += "; path=" + path;
        document.cookie = name + "=; expires=" + date.toGMTString() + str;
    }
}
function checkUsbSer(ftp,smb,torrent,dlna,iTunes){
	return 0;//disabled
	var flage=0;
	if(ftp==1){
		flage=1;
		alert(JS_msg197);
	}
	if(smb==1){
		flage=1;
		alert(JS_msg198);
	}
	if(torrent==1){
		flage=1;
		alert(JS_msg199);
	}
	if(dlna==1){
		flage=1;
		alert(JS_msg200);
	}
	if(iTunes==1){
		flage=1;
		alert(JS_msg201);
	}
	return flage;
}
