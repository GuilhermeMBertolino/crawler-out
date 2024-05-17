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
   	var APAifsn_s;
   	var APCwmin_s;
   	var APCwmax_s;
   	var APTxop_s;
   	var APACM_s;
   	var BSSAifsn_s;
   	var BSSCwmin_s;
   	var BSSCwmax_s;
   	var BSSTxop_s;
   	var BSSACM_s;
   	var AckPolicy_s;
	
	if (!numberRangeCheck(document.wmm_form.ap_aifsn_acbe.value, 1, 15, "AP AC_BE AIFSN")) 
		return false;
	
	if (!numberRangeCheck(document.wmm_form.ap_aifsn_acbk.value, 1, 15, "AP AC_BK AIFSN"))
		return false;
	
	if (!numberRangeCheck(document.wmm_form.ap_aifsn_acvi.value, 1, 15, "AP AC_VI AIFSN")) 
		return false;
	
	if (!numberRangeCheck(document.wmm_form.ap_aifsn_acvo.value, 1, 15, "AP AC_VO AIFSN")) 
		return false;

   	APAifsn_s = '';
   	APAifsn_s = APAifsn_s + document.wmm_form.ap_aifsn_acbe.value;
   	APAifsn_s = APAifsn_s + ';';
   	APAifsn_s = APAifsn_s + document.wmm_form.ap_aifsn_acbk.value;
   	APAifsn_s = APAifsn_s + ';';
   	APAifsn_s = APAifsn_s + document.wmm_form.ap_aifsn_acvi.value;
   	APAifsn_s = APAifsn_s + ';';
   	APAifsn_s = APAifsn_s + document.wmm_form.ap_aifsn_acvo.value;
   	document.wmm_form.ap_aifsn_all.value = APAifsn_s;
   	document.wmm_form.ap_aifsn_acbe.disabled = true;
   	document.wmm_form.ap_aifsn_acbk.disabled = true;
   	document.wmm_form.ap_aifsn_acvi.disabled = true;
   	document.wmm_form.ap_aifsn_acvo.disabled = true;

   	APCwmin_s = '';
   	APCwmin_s = APCwmin_s + document.wmm_form.ap_cwmin_acbe.value;
   	APCwmin_s = APCwmin_s + ';';
   	APCwmin_s = APCwmin_s + document.wmm_form.ap_cwmin_acbk.value;
   	APCwmin_s = APCwmin_s + ';';
   	APCwmin_s = APCwmin_s + document.wmm_form.ap_cwmin_acvi.value;
   	APCwmin_s = APCwmin_s + ';';
   	APCwmin_s = APCwmin_s + document.wmm_form.ap_cwmin_acvo.value;
   	document.wmm_form.ap_cwmin_all.value = APCwmin_s;
   	document.wmm_form.ap_cwmin_acbe.disabled = true;
   	document.wmm_form.ap_cwmin_acbk.disabled = true;
   	document.wmm_form.ap_cwmin_acvi.disabled = true;
   	document.wmm_form.ap_cwmin_acvo.disabled = true;

   	APCwmax_s = '';
   	APCwmax_s = APCwmax_s + document.wmm_form.ap_cwmax_acbe.value;
   	APCwmax_s = APCwmax_s + ';';
   	APCwmax_s = APCwmax_s + document.wmm_form.ap_cwmax_acbk.value;
   	APCwmax_s = APCwmax_s + ';';
   	APCwmax_s = APCwmax_s + document.wmm_form.ap_cwmax_acvi.value;
   	APCwmax_s = APCwmax_s + ';';
   	APCwmax_s = APCwmax_s + document.wmm_form.ap_cwmax_acvo.value;
   	document.wmm_form.ap_cwmax_all.value = APCwmax_s;
   	document.wmm_form.ap_cwmax_acbe.disabled = true;
   	document.wmm_form.ap_cwmax_acbk.disabled = true;
   	document.wmm_form.ap_cwmax_acvi.disabled = true;
   	document.wmm_form.ap_cwmax_acvo.disabled = true;

   	APTxop_s = '';
   	APTxop_s = APTxop_s + document.wmm_form.ap_txop_acbe.value;
   	APTxop_s = APTxop_s + ';';
   	APTxop_s = APTxop_s + document.wmm_form.ap_txop_acbk.value;
   	APTxop_s = APTxop_s + ';';
   	APTxop_s = APTxop_s + document.wmm_form.ap_txop_acvi.value;
   	APTxop_s = APTxop_s + ';';
   	APTxop_s = APTxop_s + document.wmm_form.ap_txop_acvo.value;
   	document.wmm_form.ap_txop_all.value = APTxop_s;
   	document.wmm_form.ap_txop_acbe.disabled = true;
   	document.wmm_form.ap_txop_acbk.disabled = true;
   	document.wmm_form.ap_txop_acvi.disabled = true;
   	document.wmm_form.ap_txop_acvo.disabled = true;

   	APACM_s = '';
   	if (document.wmm_form.ap_acm_acbe.checked)
      	APACM_s = APACM_s + '1';
   	else
      	APACM_s = APACM_s + '0';
   	APACM_s = APACM_s + ';';
   	if (document.wmm_form.ap_acm_acbk.checked)
      	APACM_s = APACM_s + '1';
   	else
      	APACM_s = APACM_s + '0';
   	APACM_s = APACM_s + ';';
   	if (document.wmm_form.ap_acm_acvi.checked)
      	APACM_s = APACM_s + '1';
   	else
      	APACM_s = APACM_s + '0';
   	APACM_s = APACM_s + ';';
   	if (document.wmm_form.ap_acm_acvo.checked)
      	APACM_s = APACM_s + '1';
   	else
      	APACM_s = APACM_s + '0';
   	document.wmm_form.ap_acm_acbe.disabled = true;
   	document.wmm_form.ap_acm_acbk.disabled = true;
   	document.wmm_form.ap_acm_acvi.disabled = true;
   	document.wmm_form.ap_acm_acvo.disabled = true;
   	document.wmm_form.ap_acm_all.value = APACM_s;

   	AckPolicy_s = '';
   	if (document.wmm_form.ap_ackpolicy_acbe.checked)
      	AckPolicy_s = AckPolicy_s + '1';
   	else
      	AckPolicy_s = AckPolicy_s + '0';
   	AckPolicy_s = AckPolicy_s + ';';
   	if (document.wmm_form.ap_ackpolicy_acbk.checked)
      	AckPolicy_s = AckPolicy_s + '1';
   	else
      	AckPolicy_s = AckPolicy_s + '0';
   	AckPolicy_s = AckPolicy_s + ';';
   	if (document.wmm_form.ap_ackpolicy_acvi.checked)
      	AckPolicy_s = AckPolicy_s + '1';
   	else
      	AckPolicy_s = AckPolicy_s + '0';
   	AckPolicy_s = AckPolicy_s + ';';
   	if (document.wmm_form.ap_ackpolicy_acvo.checked)
      	AckPolicy_s = AckPolicy_s + '1';
   	else
      	AckPolicy_s = AckPolicy_s + '0';
   	document.wmm_form.ap_ackpolicy_acbe.disabled = true;
   	document.wmm_form.ap_ackpolicy_acbk.disabled = true;
   	document.wmm_form.ap_ackpolicy_acvi.disabled = true;
   	document.wmm_form.ap_ackpolicy_acvo.disabled = true;
   	document.wmm_form.ap_ackpolicy_all.value = AckPolicy_s;
	
	if (!numberRangeCheck(document.wmm_form.sta_aifsn_acbe.value, 1, 15, "Station AC_BE AIFSN")) 
		return false;
	
	if (!numberRangeCheck(document.wmm_form.sta_aifsn_acbk.value, 1, 15, "Station AC_BK AIFSN")) 
		return false;
	
	if (!numberRangeCheck(document.wmm_form.sta_aifsn_acvi.value, 1, 15, "Station AC_VI AIFSN")) 
		return false;
	
	if (!numberRangeCheck(document.wmm_form.sta_aifsn_acvo.value, 1, 15, "Station AC_VO AIFSN")) 
		return false;
   
   	BSSAifsn_s = '';
   	BSSAifsn_s = BSSAifsn_s + document.wmm_form.sta_aifsn_acbe.value;
   	BSSAifsn_s = BSSAifsn_s + ';';
   	BSSAifsn_s = BSSAifsn_s + document.wmm_form.sta_aifsn_acbk.value;
   	BSSAifsn_s = BSSAifsn_s + ';';
   	BSSAifsn_s = BSSAifsn_s + document.wmm_form.sta_aifsn_acvi.value;
   	BSSAifsn_s = BSSAifsn_s + ';';
   	BSSAifsn_s = BSSAifsn_s + document.wmm_form.sta_aifsn_acvo.value;
   	document.wmm_form.sta_aifsn_all.value = BSSAifsn_s;
   	document.wmm_form.sta_aifsn_acbe.disabled = true;
   	document.wmm_form.sta_aifsn_acbk.disabled = true;
   	document.wmm_form.sta_aifsn_acvi.disabled = true;
   	document.wmm_form.sta_aifsn_acvo.disabled = true;

   	BSSCwmin_s = '';
   	BSSCwmin_s = BSSCwmin_s + document.wmm_form.sta_cwmin_acbe.value;
   	BSSCwmin_s = BSSCwmin_s + ';';
   	BSSCwmin_s = BSSCwmin_s + document.wmm_form.sta_cwmin_acbk.value;
   	BSSCwmin_s = BSSCwmin_s + ';';
   	BSSCwmin_s = BSSCwmin_s + document.wmm_form.sta_cwmin_acvi.value;
   	BSSCwmin_s = BSSCwmin_s + ';';
   	BSSCwmin_s = BSSCwmin_s + document.wmm_form.sta_cwmin_acvo.value;
   	document.wmm_form.sta_cwmin_all.value = BSSCwmin_s;
   	document.wmm_form.sta_cwmin_acbe.disabled = true;
   	document.wmm_form.sta_cwmin_acbk.disabled = true;
   	document.wmm_form.sta_cwmin_acvi.disabled = true;
   	document.wmm_form.sta_cwmin_acvo.disabled = true;

   	BSSCwmax_s = '';
   	BSSCwmax_s = BSSCwmax_s + document.wmm_form.sta_cwmax_acbe.value;
   	BSSCwmax_s = BSSCwmax_s + ';';
   	BSSCwmax_s = BSSCwmax_s + document.wmm_form.sta_cwmax_acbk.value;
   	BSSCwmax_s = BSSCwmax_s + ';';
   	BSSCwmax_s = BSSCwmax_s + document.wmm_form.sta_cwmax_acvi.value;
   	BSSCwmax_s = BSSCwmax_s + ';';
   	BSSCwmax_s = BSSCwmax_s + document.wmm_form.sta_cwmax_acvo.value;
   	document.wmm_form.sta_cwmax_all.value = BSSCwmax_s;
   	document.wmm_form.sta_cwmax_acbe.disabled = true;
   	document.wmm_form.sta_cwmax_acbk.disabled = true;
   	document.wmm_form.sta_cwmax_acvi.disabled = true;
   	document.wmm_form.sta_cwmax_acvo.disabled = true;

   	BSSTxop_s = '';
   	BSSTxop_s = BSSTxop_s + document.wmm_form.sta_txop_acbe.value;
   	BSSTxop_s = BSSTxop_s + ';';
   	BSSTxop_s = BSSTxop_s + document.wmm_form.sta_txop_acbk.value;
   	BSSTxop_s = BSSTxop_s + ';';
   	BSSTxop_s = BSSTxop_s + document.wmm_form.sta_txop_acvi.value;
   	BSSTxop_s = BSSTxop_s + ';';
   	BSSTxop_s = BSSTxop_s + document.wmm_form.sta_txop_acvo.value;
   	document.wmm_form.sta_txop_all.value = BSSTxop_s;
   	document.wmm_form.sta_txop_acbe.disabled = true;
   	document.wmm_form.sta_txop_acbk.disabled = true;
   	document.wmm_form.sta_txop_acvi.disabled = true;
   	document.wmm_form.sta_txop_acvo.disabled = true;

   	BSSACM_s = '';
   	if (document.wmm_form.sta_acm_acbe.checked)
      	BSSACM_s = BSSACM_s + '1';
   	else
      	BSSACM_s = BSSACM_s + '0';
   	BSSACM_s = BSSACM_s + ';';
   	if (document.wmm_form.sta_acm_acbk.checked)
      	BSSACM_s = BSSACM_s + '1';
   	else
      	BSSACM_s = BSSACM_s + '0';
   	BSSACM_s = BSSACM_s + ';';
   	if (document.wmm_form.sta_acm_acvi.checked)
      	BSSACM_s = BSSACM_s + '1';
   	else
      	BSSACM_s = BSSACM_s + '0';
   	BSSACM_s = BSSACM_s + ';';
   	if (document.wmm_form.sta_acm_acvo.checked)
      	BSSACM_s = BSSACM_s + '1';
   	else
      	BSSACM_s = BSSACM_s + '0';
   	document.wmm_form.sta_acm_acbe.disabled = true;
   	document.wmm_form.sta_acm_acbk.disabled = true;
   	document.wmm_form.sta_acm_acvi.disabled = true;
   	document.wmm_form.sta_acm_acvo.disabled = true;
   	document.wmm_form.sta_acm_all.value = BSSACM_s;
   	
	return true;
}

function Load_Setting()
{
   	var APAifsn    = '<% getCfgGeneral(1, "APAifsn"); %>';
   	var APCwmin    = '<% getCfgGeneral(1, "APCwmin"); %>';
   	var APCwmax    = '<% getCfgGeneral(1, "APCwmax"); %>';
   	var APTxop     = '<% getCfgGeneral(1, "APTxop"); %>';
   	var APACM      = '<% getCfgGeneral(1, "APACM"); %>';
   	var BSSAifsn   = '<% getCfgGeneral(1, "BSSAifsn"); %>';
   	var BSSCwmin   = '<% getCfgGeneral(1, "BSSCwmin"); %>';
   	var BSSCwmax   = '<% getCfgGeneral(1, "BSSCwmax"); %>';
   	var BSSTxop    = '<% getCfgGeneral(1, "BSSTxop"); %>';
   	var BSSACM     = '<% getCfgGeneral(1, "BSSACM"); %>';
   	var AckPolicy  = '<% getCfgGeneral(1, "AckPolicy"); %>';

   	if (APAifsn   == "") APAifsn = "7;3;1;1";
   	if (APCwmin   == "") APCwmin = "4;4;3;2";
   	if (APCwmax   == "") APCwmax = "6;10;4;3";
   	if (APTxop    == "") APTxop = "0;0;94;47";
   	if (APACM     == "") APACM = "0;0;0;0";
   	if (BSSAifsn  == "") BSSAifsn = "7;3;2;2";
   	if (BSSCwmin  == "") BSSCwmin = "4;4;3;2";
   	if (BSSCwmax  == "") BSSCwmax = "10;10;4;3";
   	if (BSSTxop   == "") BSSTxop = "0;0;94;47";
   	if (BSSACM    == "") BSSACM = "0;0;0;0";
   	if (AckPolicy == "") AckPolicy = "0;0;0;0";

   	var APAifsnArray   = APAifsn.split(";");
   	var APCwminArray   = APCwmin.split(";");
   	var APCwmaxArray   = APCwmax.split(";");
   	var APTxopArray    = APTxop.split(";");
   	var APACMArray     = APACM.split(";");
   	var BSSAifsnArray  = BSSAifsn.split(";");
   	var BSSCwminArray  = BSSCwmin.split(";");
   	var BSSCwmaxArray  = BSSCwmax.split(";");
   	var BSSTxopArray   = BSSTxop.split(";");
   	var BSSACMArray    = BSSACM.split(";");
   	var AckPolicyArray = AckPolicy.split(";");

   	document.wmm_form.ap_aifsn_acbe.value = APAifsnArray[0];
   	document.wmm_form.ap_aifsn_acbk.value = APAifsnArray[1];
   	document.wmm_form.ap_aifsn_acvi.value = APAifsnArray[2];
   	document.wmm_form.ap_aifsn_acvo.value = APAifsnArray[3];

   	document.wmm_form.ap_cwmin_acbe.options.selectedIndex = 1*APCwminArray[0] - 1;
   	document.wmm_form.ap_cwmin_acbk.options.selectedIndex = 1*APCwminArray[1] - 1;
   	document.wmm_form.ap_cwmin_acvi.options.selectedIndex = 1*APCwminArray[2] - 1;
   	document.wmm_form.ap_cwmin_acvo.options.selectedIndex = 1*APCwminArray[3] - 1;

   	document.wmm_form.ap_cwmax_acbe.options.selectedIndex = 1*APCwmaxArray[0] - 1;
   	document.wmm_form.ap_cwmax_acbk.options.selectedIndex = 1*APCwmaxArray[1] - 1;
   	document.wmm_form.ap_cwmax_acvi.options.selectedIndex = 1*APCwmaxArray[2] - 1;
   	document.wmm_form.ap_cwmax_acvo.options.selectedIndex = 1*APCwmaxArray[3] - 1;

   	document.wmm_form.ap_txop_acbe.value = APTxopArray[0];
   	document.wmm_form.ap_txop_acbk.value = APTxopArray[1];
   	document.wmm_form.ap_txop_acvi.value = APTxopArray[2];
   	document.wmm_form.ap_txop_acvo.value = APTxopArray[3];

   	if (1*APACMArray[0] == 1)
      	document.wmm_form.ap_acm_acbe.checked = true;
   	else
      	document.wmm_form.ap_acm_acbe.checked = false;

   	if (1*APACMArray[1] == 1)
      	document.wmm_form.ap_acm_acbk.checked = true;
   	else
      	document.wmm_form.ap_acm_acbk.checked = false;

   	if (1*APACMArray[2] == 1)
      	document.wmm_form.ap_acm_acvi.checked = true;
   	else
      	document.wmm_form.ap_acm_acvi.checked = false;

   	if (1*APACMArray[3] == 1)
      	document.wmm_form.ap_acm_acvo.checked = true;
   	else
      	document.wmm_form.ap_acm_acvo.checked = false;

   	if (1*AckPolicyArray[0] == 1)
      	document.wmm_form.ap_ackpolicy_acbe.checked = true;
   	else
      	document.wmm_form.ap_ackpolicy_acbe.checked = false;

   	if (1*AckPolicyArray[1] == 1)
      	document.wmm_form.ap_ackpolicy_acbk.checked = true;
   	else
      	document.wmm_form.ap_ackpolicy_acbk.checked = false;

   	if (1*AckPolicyArray[2] == 1)
      	document.wmm_form.ap_ackpolicy_acvi.checked = true;
   	else
      	document.wmm_form.ap_ackpolicy_acvi.checked = false;

   	if (1*AckPolicyArray[3] == 1)
      	document.wmm_form.ap_ackpolicy_acvo.checked = true;
   	else
      	document.wmm_form.ap_ackpolicy_acvo.checked = false;

   	document.wmm_form.sta_aifsn_acbe.value = BSSAifsnArray[0];
   	document.wmm_form.sta_aifsn_acbk.value = BSSAifsnArray[1];
   	document.wmm_form.sta_aifsn_acvi.value = BSSAifsnArray[2];
   	document.wmm_form.sta_aifsn_acvo.value = BSSAifsnArray[3];

   	document.wmm_form.sta_cwmin_acbe.options.selectedIndex = 1*BSSCwminArray[0] - 1;
   	document.wmm_form.sta_cwmin_acbk.options.selectedIndex = 1*BSSCwminArray[1] - 1;
   	document.wmm_form.sta_cwmin_acvi.options.selectedIndex = 1*BSSCwminArray[2] - 1;
   	document.wmm_form.sta_cwmin_acvo.options.selectedIndex = 1*BSSCwminArray[3] - 1;

   	document.wmm_form.sta_cwmax_acbe.options.selectedIndex = 1*BSSCwmaxArray[0] - 1;
   	document.wmm_form.sta_cwmax_acbk.options.selectedIndex = 1*BSSCwmaxArray[1] - 1;
   	document.wmm_form.sta_cwmax_acvi.options.selectedIndex = 1*BSSCwmaxArray[2] - 1;
   	document.wmm_form.sta_cwmax_acvo.options.selectedIndex = 1*BSSCwmaxArray[3] - 1;

   	document.wmm_form.sta_txop_acbe.value = BSSTxopArray[0];
   	document.wmm_form.sta_txop_acbk.value = BSSTxopArray[1];
   	document.wmm_form.sta_txop_acvi.value = BSSTxopArray[2];
   	document.wmm_form.sta_txop_acvo.value = BSSTxopArray[3];

   	if (1*BSSACMArray[0] == 1)
      	document.wmm_form.sta_acm_acbe.checked = true;
   	else
      	document.wmm_form.sta_acm_acbe.checked = false;

   	if (1*BSSACMArray[1] == 1)
      	document.wmm_form.sta_acm_acbk.checked = true;
   	else
      	document.wmm_form.sta_acm_acbk.checked = false;

   	if (1*BSSACMArray[2] == 1)
      	document.wmm_form.sta_acm_acvi.checked = true;
   	else
      	document.wmm_form.sta_acm_acvi.checked = false;

   	if (1*BSSACMArray[3] == 1)
      	document.wmm_form.sta_acm_acvo.checked = true;
   	else
      	document.wmm_form.sta_acm_acvo.checked = false;
}

function submit_apply()
{
  	if (formCheck() == true) {
    	document.wmm_form.submit();
    	window.close();
  	}
}
</script>
</head>
<body onLoad="Load_Setting()">
<form method=post name="wmm_form" action="/goform/wirelessWmm">
<input type="hidden" name="submit-url" value="/wireless/wmm.asp">
<p><b><script>dw(MM_wmm_parameters_ap)</script></b></p>
<table width=600 border=1 cellpadding=3 style="border-collapse: collapse" bordercolor="#C8C8C8">
<tr>
  <td align=center bgcolor="#f2f2f2" nowrap>&nbsp;</td>
  <td align=center bgcolor="#f2f2f2" nowrap>Aifsn</td>
  <td align=center bgcolor="#f2f2f2" nowrap>CWMin</td>
  <td align=center bgcolor="#f2f2f2" nowrap>CWMax</td>
  <td align=center bgcolor="#f2f2f2" nowrap>Txop</td>
  <td align=center bgcolor="#f2f2f2" nowrap>ACM</td>
  <td align=center bgcolor="#f2f2f2" nowrap>AckPolicy</td>
</tr>
<tr>
  <td align=center bgcolor="#f2f2f2" nowrap><b>AC_BE</b></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=text name=ap_aifsn_acbe size=4 maxlength=4></td>
  <td align=center bgcolor="#FFFFFF" nowrap><select name="ap_cwmin_acbe">
  <option value=1>1</option>
  <option value=2>3</option>
  <option value=3>7</option>
  <option value=4 selected>15</option></select>
  </td>
  <td align=center bgcolor="#FFFFFF" nowrap><select name="ap_cwmax_acbe">
  <option value=1>1</option>
  <option value=2>3</option>
  <option value=3>7</option>
  <option value=4>15</option>
  <option value=5>31</option>
  <option value=6 selected>63</option></select>
  </td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=text name=ap_txop_acbe size=4 maxlength=4></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=checkbox name=ap_acm_acbe value="1"></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=checkbox name=ap_ackpolicy_acbe value="1"></td>
</tr>
<input type=hidden name=ap_aifsn_all>
<input type=hidden name=ap_cwmin_all>
<input type=hidden name=ap_cwmax_all>
<input type=hidden name=ap_txop_all>
<input type=hidden name=ap_acm_all>
<input type=hidden name=ap_ackpolicy_all>
<tr>
  <td align=center bgcolor="#f2f2f2" nowrap><b>AC_BK</b></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=text name=ap_aifsn_acbk size=4 maxlength=4></td>
  <td align=center bgcolor="#FFFFFF" nowrap><select name="ap_cwmin_acbk">
  <option value=1>1</option>
  <option value=2>3</option>
  <option value=3>7</option>
  <option value=4 selected>15</option></select>
  </td>
  <td align=center bgcolor="#FFFFFF" nowrap><select name="ap_cwmax_acbk">
  <option value=1>1</option>
  <option value=2>3</option>
  <option value=3>7</option>
  <option value=4>15</option>
  <option value=5>31</option>
  <option value=6>63</option>
  <option value=7>127</option>
  <option value=8>255</option>
  <option value=9>511</option>
  <option value=10 selected>1023</option></select>
  </td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=text name=ap_txop_acbk size=4 maxlength=4></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=checkbox name=ap_acm_acbk value="1"></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=checkbox name=ap_ackpolicy_acbk value="1"></td>
</tr>
<tr>
  <td align=center bgcolor="#f2f2f2" nowrap><b>AC_VI</b></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=text name=ap_aifsn_acvi size=4 maxlength=4></td>
  <td align=center bgcolor="#FFFFFF" nowrap><select name="ap_cwmin_acvi">
  <option value=1>1</option>
  <option value=2>3</option>
  <option value=3 selected>7</option></select>
  </td>
  <td align=center bgcolor="#FFFFFF" nowrap><select name="ap_cwmax_acvi">
  <option value=1>1</option>
  <option value=2>3</option>
  <option value=3>7</option>
  <option value=4 selected>15</option></select>
  </td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=text name=ap_txop_acvi size=4 maxlength=4></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=checkbox name=ap_acm_acvi value="1"></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=checkbox name=ap_ackpolicy_acvi value="1"></td>
</tr>
<tr>
  <td align=center bgcolor="#f2f2f2" nowrap><b>AC_VO</b></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=text name=ap_aifsn_acvo size=4 maxlength=4></td>
  <td align=center bgcolor="#FFFFFF" nowrap><select name="ap_cwmin_acvo">
  <option value=1>1</option>
  <option value=2 selected>3</option></select>
  </td>
  <td align=center bgcolor="#FFFFFF" nowrap><select name="ap_cwmax_acvo">
  <option value=1>1</option>
  <option value=2>3</option>
  <option value=3 selected>7</option></select>
  </td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=text name=ap_txop_acvo size=4 maxlength=4></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=checkbox name=ap_acm_acvo value="1"></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=checkbox name=ap_ackpolicy_acvo value="1"></td>
</tr>
</table>
<br>
<p><b><script>dw(MM_wmm_parameters_station)</script></b></p>
<table width=600 border=1 cellpadding=3 style="border-collapse: collapse" bordercolor="#C8C8C8">
<tr>
  <td align=center bgcolor="#f2f2f2" nowrap>&nbsp;</td>
  <td align=center bgcolor="#f2f2f2" nowrap>Aifsn</td>
  <td align=center bgcolor="#f2f2f2" nowrap>CWMin</td>
  <td align=center bgcolor="#f2f2f2" nowrap>CWMax</td>
  <td align=center bgcolor="#f2f2f2" nowrap>Txop</td>
  <td align=center bgcolor="#f2f2f2" nowrap>ACM</td>
</tr>
<tr>
  <td align=center bgcolor="#f2f2f2" nowrap><b>AC_BE</b></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=text name=sta_aifsn_acbe size=4 maxlength=4></td>
  <td align=center bgcolor="#FFFFFF" nowrap><select name="sta_cwmin_acbe">
  <option value=1>1</option>
  <option value=2>3</option>
  <option value=3>7</option>
  <option value=4 selected>15</option></select>
  </td>
  <td align=center bgcolor="#FFFFFF" nowrap><select name="sta_cwmax_acbe">
  <option value=1>1</option>
  <option value=2>3</option>
  <option value=3>7</option>
  <option value=4>15</option>
  <option value=5>31</option>
  <option value=6>63</option>
  <option value=7>127</option>
  <option value=8>255</option>
  <option value=9>511</option>
  <option value=10 selected>1023</option></select>
  </td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=text name=sta_txop_acbe size=4 maxlength=4></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=checkbox name=sta_acm_acbe value="1"></td>
</tr>
<input type=hidden name=sta_aifsn_all>
<input type=hidden name=sta_cwmin_all>
<input type=hidden name=sta_cwmax_all>
<input type=hidden name=sta_txop_all>
<input type=hidden name=sta_acm_all>
<tr>
  <td align=center bgcolor="#f2f2f2" nowrap><b>AC_BK</b></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=text name=sta_aifsn_acbk size=4 maxlength=4></td>
  <td align=center bgcolor="#FFFFFF" nowrap><select name="sta_cwmin_acbk">
  <option value=1>1</option>
  <option value=2>3</option>
  <option value=3>7</option>
  <option value=4 selected>15</option></select>
  </td>
  <td align=center bgcolor="#FFFFFF" nowrap><select name="sta_cwmax_acbk">
  <option value=1>1</option>
  <option value=2>3</option>
  <option value=3>7</option>
  <option value=4>15</option>
  <option value=5>31</option>
  <option value=6>63</option>
  <option value=7>127</option>
  <option value=8>255</option>
  <option value=9>511</option>
  <option value=10 selected>1023</option></select>
  </td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=text name=sta_txop_acbk size=4 maxlength=4></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=checkbox name=sta_acm_acbk value="1"></td>
</tr>
<tr>
  <td align=center bgcolor="#f2f2f2" nowrap><b>AC_VI</b></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=text name=sta_aifsn_acvi size=4 maxlength=4></td>
  <td align=center bgcolor="#FFFFFF" nowrap><select name="sta_cwmin_acvi">
  <option value=1>1</option>
  <option value=2>3</option>
  <option value=3 selected>7</option></select>
  </td>
  <td align=center bgcolor="#FFFFFF" nowrap><select name="sta_cwmax_acvi">
  <option value=1>1</option>
  <option value=2>3</option>
  <option value=3>7</option>
  <option value=4 selected>15</option></select>
  </td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=text name=sta_txop_acvi size=4 maxlength=4></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=checkbox name=sta_acm_acvi value="1"></td>
</tr>
<tr>
  <td align=center bgcolor="#f2f2f2" nowrap><b>AC_VO</b></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=text name=sta_aifsn_acvo size=4 maxlength=4></td>
  <td align=center bgcolor="#FFFFFF" nowrap><select name="sta_cwmin_acvo">
  <option value=1>1</option>
  <option value=2 selected>3</option></select>
  </td>
  <td align=center bgcolor="#FFFFFF" nowrap><select name="sta_cwmax_acvo">
  <option value=1>1</option>
  <option value=2>3</option>
  <option value=3 selected>7</option></select>
  </td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=text name=sta_txop_acvo size=4 maxlength=4></td>
  <td align=center bgcolor="#FFFFFF" nowrap><input type=checkbox name=sta_acm_acvo value="1"></td>
</tr>
</table>

<br>
<table align=center width="600" border="0"> 
<tr align=center>
  <td>
    <script>dw('<input type=button class=button value="'+BT_apply+'" onClick="submit_apply()">&nbsp;&nbsp;\
    <input type=button class=button value="'+BT_reset+'" onClick="resetForm();">&nbsp;&nbsp;\
    <input type=button class=button value="'+BT_close+'" onClick="window.close()">')</script>
  </td>
</tr>
</table>
</form>
</body></html>
