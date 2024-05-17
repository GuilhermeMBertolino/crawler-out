<?
	$REBOOTTIME = 65;

	$WAN1  = "WAN-1";
	$WAN2  = "WAN-2";
	$WAN3  = "WAN-3";
	$WAN4  = "WAN-4";
	$WAN5  = "WAN-5";
	$WLAN1 = "BAND24G-1.1";
	$WLAN1_GZ = "BAND24G-1.2";
	$WLAN2 = "BAND5G-1.1";
	$WLAN2_GZ = "BAND5G-1.2";
	$WIFI_STA = "WIFI-STA";
	$LAN1  = "LAN-1";
	$LAN2  = "LAN-2";
	$LAN3  = "LAN-3";
	$LAN4  = "LAN-4";
	$BR1= "BRIDGE-1";
	$WLAN_APCLIENT = "WIFISTA-1.1";
	$WLAN2_APCLIENT = "WIFISTA-2.1";
	$WLAN_EXT24G = "BAND24G-1.1";
	$WLAN_EXT5G = "BAND5G-1.1";

	$SRVC_WLAN = "PHYINF.WIFI";
	$BAND24G_DEVNAME = "ath0";
	$BAND24G_GUEST_DEVNAME = "ath1";
	$BAND5G_DEVNAME = "ath2";
	$BAND5G_GUEST_DEVNAME = "ath3";


	$FEATURE_NOSCH = 0;			/* if this model doesn't support scheudle, set it as 1. */
	$FEATURE_NOPPTP = 0;		/* if this model doesn't support PPTP, set it as 1. */
	$FEATURE_NOL2TP = 0;		/* if this model doesn't support L2TP, set it as 1.*/

	if(query("/runtime/devdata/countrycode")=="RU")
	{
		$FEATURE_NORUSSIAPPTP = 0;	/* if this model doesn't support Russia PPTP, set it as 1.*/
		$FEATURE_NORUSSIAPPPOE = 0;	/* if this model doesn't support Russia PPPoE, set it as 1. */
		$FEATURE_NORUSSIAL2TP = 0; 	/* if this model doesn't support Russia L2TP, set it as 1. */
	}
	else
	{
		$FEATURE_NORUSSIAPPTP = 1;	/* if this model doesn't support Russia PPTP, set it as 1.*/
		$FEATURE_NORUSSIAPPPOE = 1;	/* if this model doesn't support Russia PPPoE, set it as 1. */
		$FEATURE_NORUSSIAL2TP = 1; 	/* if this model doesn't support Russia L2TP, set it as 1. */
	}

	$FEATURE_DHCPPLUS = 0;		/* if this model supports DHCP+, set it as 1. */

	$FEATURE_NOEASYSETUP = 1;	/* if this model has no easy setup page, set it as 1. */
	$FEATURE_NOIPV6 = 0;	/* if this model has no IPv6, set it as 1. */
	$FEATURE_INBOUNDFILTER = 1;	/* if this model has inbound filter, set it as 1.*/
	$FEATURE_WAN1000FTYPE = 1;  /* if this model wan port has giga speed(1000Mbps), set it as 1.*/
	$FEATURE_PARENTALCTRL = 1;  /* if this model has parental control(OpenDNS service) function, set it as 1.*/
	$FEATURE_EEE = 0;  /* if this model has Energy Efficient Ethernet, set it as 1.*/
	$FEATURE_GUESTZONE = 1;     /* if this model has Guest Zone, set it as 1.*/
	$FEATURE_VLAN = 1;              /* if this model support VLAN, set it as 1. */

	/*+++Wireless+++*/
	$FEATURE_NOAPMODE = 1;
	$FEATURE_DUAL_BAND = 1;		/* if this model has 5 Ghz, set it as 1.*/
	$FEATURE_TURBOMODE = 1;
	$FEATURE_HAVEEXTENDER = 1;
	$FEATURE_HAVEREPEATER = 1;
	$FEATURE_MODIFY_WPS = 1;
?>
