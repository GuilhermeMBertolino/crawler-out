<!--
Copyright (C) 2022, Broadcom. All Rights Reserved.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

<<Broadcom-WL-IPTag/Open:>>

$Id:
-->

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="en">
<head>
<title>Broadcom Home Gateway Reference Design: DPP</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" type="text/css" href="style.css" media="screen">
<script language="JavaScript" type="text/javascript" src="overlib.js"></script>
<script language="JavaScript" type="text/javascript">
<!--

var dpp_interval = 0;
var dpp_refresh = "<% dpp_refresh(); %>";
if(dpp_refresh) {
	dpp_interval = parseInt(dpp_refresh);
}

function dpp_akm_change()
{
/* Retaining place holder for now */
}

/*Refresh the webpage for every few seconds to get the updated DPP status */
function autoRefresh()
{
	if (dpp_interval > 0)
		setTimeout("location.reload(true);", dpp_interval * 1000);
}

function dpp_onLoad()
{
	dpp_akm_change();

	autoRefresh();
}

//-->
</script>
</head>

<body onload="dpp_onLoad();">
<div id="overDiv" style="position: absolute; visibility: hidden; z-index: 1000;"></div>

<table id="page_header" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#cc0000">
  <% asp_list(); %>
</table>

<table width="100%" border="0" cellpadding="0" cellspacing="0">
  <tbody><tr class="page_title">
    <td colspan="2" class="edge"><img src="blur_new.jpg" alt="" border="0"></td>
  </tr>
  <tr>
    <td class="page_title"><img src="logo_new.gif" alt="" border="0"></td>
    <td valign="top" width="100%">
	<br>
	<span class="title">DPP</span><br>
	<span class="subtitle">This page allows you to configure DPP.</span>
    </td>
  </tr>
</tbody></table>

<form method="post" action="dpp.asp">
<input name="page" value="dpp.asp" type="hidden">
<input name="invite_name" value="0" type="hidden">
<input name="invite_mac" value="0" type="hidden">
<p>
<table border="0" cellpadding="0" cellspacing="0">
  <tr>
    <th width="310"
	onMouseOver="return overlib('Selects which wireless interface to configure.', LEFT);"
	onMouseOut="return nd();">
	Wireless Interface:&nbsp;&nbsp;
    </th>
    <td>&nbsp;&nbsp;</td>
    <td>
	<select name="wl_unit" onChange="submit();">
	  <% wl_list("INCLUDE_SSID" , "INCLUDE_VIFS", "CHECK_MAP"); %>
	</select>
    </td>
    <td>
	<button type="submit" name="action" value="Select">Select</button>
    </td>
  </tr>
</table>

<p>
<% dpp_display(); %>

<p>
<p class="label">&#169;2001-2016 Broadcom Limited. All rights reserved. 54g and XPress are trademarks of Broadcom Limited.</p>

</form></body></html>
