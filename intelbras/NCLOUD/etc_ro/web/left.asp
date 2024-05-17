<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="style/menu.css" type="text/css" />
<script language="javascript" src="js/language_<% getCfgZero(1, "LanguageType"); %>.js"></script>
<script language="javascript" src="js/ajax.js"></script>
<script language="javascript" src="js/forbidView.js"></script>
</head>
<body style="background-color:#f6f6f6">
<script type="text/javascript">
var opmode = '<% getCfgZero(1, "OperationMode"); %>';
var dhcpen = '<% getCfgZero(1, "dhcpEnabled"); %>';
var vpnb = '<% getVpndBuilt(); %>';
var webLocalb = '<% getWebLocalBuilt(); %>';
var webLocalLan = '<% showWebLocal(); %>';
var wdsb = '<% getWDSBuilt(); %>';
var wscb = '<% getWSCBuilt(); %>';
var usbb = '<% getUSBBuilt(); %>';
var storageb = '<% getStorageBuilt(); %>';
var ftpb = '<% getFtpBuilt(); %>';
var httpfile = '<% getHttpFileBuilt(); %>';
var smbb = '<% getSmbBuilt(); %>';
var mediab = '<% getMediaBuilt(); %>';
var webcamb = '<% getWebCamBuilt(); %>';
var printersrvb = '<% getPrinterSrvBuilt(); %>';
var itunesb = '<% getiTunesBuilt(); %>';
var swqos = '<% getSWQoSBuilt(); %>';
var pktfilterb = '<% getPktFilterBuilt(); %>';
var ddnsb = '<% getDDNSBuilt(); %>';
var apclib = '<% getWlanApcliBuilt(); %>';
var apcli_en = '<% getCfgZero(1, "apClient"); %>';
var upnpb = '<% getUpnpBuilt(); %>';
var igmpb = '<% getIgmpProxyBuilt(); %>';
var mssidb = '<% getMBSSIDBuilt(); %>';
var torrentenabled ='<% getInfo(1, "Torrent"); %>';
var minidlnaenabled ='<% getInfo(1, "Dlna"); %>';
var wifi_off = '<% getCfgZero(1, "WiFiOff"); %>';
var counts=0;
a = new Menu('a');
//  nodeID, parent nodeID,  Name,  URL
a.add(1,   0, MM_sysstatus,        "adm/status.asp",	"view");
////////////////////////network//////////////////////////
if (opmode != "0")
{
	a.add(3,   0, MM_network,        	"internet/wan.asp",	"view");
	a.add(301,   3, MM_wan_settings,        	"internet/wan.asp");
	a.add(302,   3, MM_lan_settings,        	"internet/lan.asp");
	if (opmode != "3")
		a.add(303,   3, MM_clone_mac_settings,        	"internet/clone_mac.asp");
	if (ddnsb == "1")
		a.add(304,  3, MM_ddns_settings,        	"firewall/ddns.asp");
	if (vpnb == "1")
		a.add(305,  3, MM_vpn_settings,        	"internet/vpn.asp");
}
else
{
	a.add(3,   0, MM_network,        	"internet/lan.asp",	"view");
	a.add(302,   3, MM_lan_settings,        	"internet/lan.asp");
}
////////////////////////wireless//////////////////////////
a.add(4,   0, MM_wireless,        	"wireless/basic.asp",	"view");
a.add(401,   4, MM_basic_settings,        		"wireless/basic.asp");
if (wifi_off == 0)
{
	//a.add(402,   4, MM_security_settings,        	"wireless/security.asp");
	a.add(403,   4, MM_wireless_mac,        	"wireless/macfilter.asp");
/*	if (mssidb == "1")
		a.add(404,   4, MM_multiple_settings,        	"wireless/multipleap.asp");*/
	if (wscb == "1")
		a.add(405,   4, MM_wps_settings,        		"wps/wps.asp");
	//a.add(406,   4, MM_bridge_settings,        	"wireless/opmode.asp");
	a.add(407,   4, MM_advanced_settings,        	"wireless/advanced.asp");
	a.add(408,   4, MM_wireless_status,        	"wireless/stainfo.asp");
}
////////////////////////dhcp//////////////////////////
a.add(5,   0, MM_dhcp_server,        	"internet/dhcp.asp",	"view");
a.add(501,   5, MM_dhcp_server_settings,        "internet/dhcp.asp");
if (dhcpen == "1")
{
	a.add(502,   5, MM_client_list,        "internet/dhcpcliinfo.asp");
	a.add(503,   5, MM_static_dhcp,        "internet/static_dhcp.asp");
}

////////////////////////qos//////////////////////////
if (opmode != "0" && swqos == "1")
	a.add(6,   0, MM_qos,        	"internet/qos.asp",	"view");
////////////////////////routing//////////////////////////
//a.add(7,   0, MM_routing_table,      	"internet/routing.asp",	"view");
////////////////////////nat//////////////////////////
if (opmode != "0")
{
	a.add(8,   0, "NAT",      	"firewall/port_forward.asp",	"view");
	a.add(801,  8, MM_prrtforwarding_pt,        	"firewall/port_forward.asp");
	a.add(802,  8, MM_dmz_settings,        		"firewall/dmz.asp");
	if (upnpb == "1")
		a.add(803,  8, MM_upnp_settings,        		"internet/upnp.asp");
	//if (igmpb == "1")
	//	a.add(804,  8, MM_igmp,        		"internet/igmp.asp");
}
////////////////////////firewall//////////////////////////
if (opmode != "0" && pktfilterb != "0")
{
	a.add(9,   0, MM_firewall,      	"firewall/port_filtering.asp",	"view");
	a.add(901,  9, MM_ipportf,        			"firewall/port_filtering.asp");
	a.add(902,  9, MM_macf,        			"firewall/mac_filtering.asp");
	a.add(903,  9, MM_urlf,        				"firewall/url_filtering.asp");

	//if (webLocalb == "1" && webLocalLan =="1")
	//	a.add(904,  9, MM_weblocal,        				"firewall/weblocal.asp");
		
	a.add(905,  9, MM_remote,        				"firewall/remote.asp");
	a.add(906,  9, MM_sys_firewall,        		"firewall/system_firewall.asp");
}
////////////////////////usb//////////////////////////
if (usbb == "1")
{
	var usbapp = 1*webcamb;
	if (usbapp == 1)
		a.add(10,   0, "USB",      			"usb/uvc_webcam.asp",	"view");
	if (webcamb == "1")
		a.add(1001,  10, "Web Camera",        		"usb/uvc_webcam.asp");
	
	////////////////////////storage//////////////////////////
	if (storageb == "1")
	{
		a.add(11,   0, MM_storage,      	"usb/storage_user_admin.asp",	"view");
		a.add(1101,  11, MM_user,        				"usb/storage_user_admin.asp");
		a.add(1102,  11, MM_disk,        				"usb/storage_disk_admin.asp");
		if (ftpb == "1")
			a.add(1103,  11, MM_ftp,        				"usb/ftp_srv.asp");
		if (smbb == "1")
			a.add(1104,  11, MM_samba,        			"usb/smb_srv.asp");
		if (mediab == "1")
			a.add(1105,  11, MM_media,        			"usb/media_srv.asp");
		if (printersrvb == "1")
			a.add(1106,  11, MM_printer_srv,        		"usb/p910printer_srv.asp");
		if (torrentenabled == "1")
			a.add(1107,  11, MM_torrent_settings,        		"usb/torrent.asp");
		if (minidlnaenabled == "1")
			a.add(1108,  11, MM_minidlna_settings,        		"usb/minidlna.asp");
		if (itunesb == "1")
			a.add(1109,  11, "Servidor iTunes",        		"usb/itunes_srv.asp");
//		if (httpfile == "1")
//			a.add(1110,  11, "Http file server",        		"usb/http_files.asp");
	}
}
////////////////////////management//////////////////////////
a.add(12,   0, MM_management,      			"adm/ntp.asp",	"view");
a.add(1201,  12, MM_ntp_settings,        			"adm/ntp.asp");
//a.add(1202,  12, MM_statistics,        			"adm/statistic.asp");
//a.add(1203,  12, MM_syslog,        			"adm/syslog.asp");
a.add(1204,  12, MM_upload_firmware,        				"adm/upload_firmware.asp");
a.add(1205,  12, MM_system_config,        			"adm/settings.asp");
a.add(1206,  12, MM_load_factory_default,        		"adm/load_default.asp");
a.add(1207,  12, MM_reboot,        				"adm/reboot.asp");
a.add(1208,  12, MM_admin_settings,        			"adm/password.asp");
a.add(20,   0, MM_logout,      			"#",	"view");
document.write(a);
window.onload=function (){
	var ddnsNode = document.getElementById("304");
	ddnsNode.onclick=function (){window.counts=0;}
}
</script>
</body>
</html>
