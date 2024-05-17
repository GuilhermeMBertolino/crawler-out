<? include "/htdocs/phplib/html.php";
if($Remove_XML_Head_Tail != 1)	{HTML_hnap_200_header();}

include "/htdocs/webinc/config.php";

$result = "OK";

if($FEATURE_NOLAN==1) { $feature_lan = "false"; }
else { $feature_lan = "true"; }

if($FEATURE_NOAPMODE==1) { $feature_apmode = "false"; }
else { $feature_apmode = "true"; }

if($FEATURE_HAVEBGMODE==1) { $feature_bridge = "true"; }
else { $feature_bridge = "false"; }

if($FEATURE_HAVEAPCLIENT==1){ $feature_apclient = "true"; }
else { $feature_apclient = "false"; }

if($FEATURE_HAVEREPEATER==1){ $feature_repeater = "true"; }
else { $feature_repeater = "false"; }

if($FEATURE_GUESTZONE==1){ $feature_guestzone = "true"; }
else { $feature_guestzone = "false"; }

if($FEATURE_DUAL_BAND==1){ $feature_dualband = "true"; }
else { $feature_dualband = "false"; }

if($FEATURE_TRI_BAND==1){ $feature_triband = "true"; }
else { $feature_triband = "false"; }

if($FEATURE_NOIPV6==1){ $feature_ipv6 = "false"; }
else { $feature_ipv6 = "true"; }

if($FEATURE_HAVEEXTENDER==1){ $feature_extender = "true"; }
else { $feature_extender = "false"; }

if($FEATURE_TURBOMODE==1) { $feature_turbomode = "true"; }
else { $feature_turbomode = "false"; }

if($FEATURE_SMARTCONNECT==1){ $feature_smartconnect = "true"; }
else { $feature_smartconnect = "false"; }

//Russia
if($FEATURE_NORUSSIAPPTP==1 && $FEATURE_NORUSSIAPPPOE==1 && $FEATURE_NORUSSIAL2TP==1){ $feature_russia = "false"; }
else { $feature_russia = "true"; }

if($FEATURE_VLAN==1){ $feature_vlan = "true"; }
else { $feature_vlan = "false"; }

if($FEATURE_DISABLENAT==1){ $feature_nat = "true"; }
else { $feature_nat = "false"; }

//PEANUT
if(query("/runtime/devdata/countrycode") == "CN") { $FEATURE_CN = 1; }
else { $FEATURE_CN= 0; }

if($FEATURE_MODIFY_WPS==1)  {$feature_wps = "true";}
else                        {$feature_wps = "false";}
?>
<? if($Remove_XML_Head_Tail != 1)	{HTML_hnap_xml_header();}?>
		<GetDeviceFeatureAlphaResponse xmlns="http://purenetworks.com/HNAP1/">
			<GetDeviceFeatureAlphaResult><?=$result?></GetDeviceFeatureAlphaResult>
			<FeatureLAN><?=$feature_lan?></FeatureLAN>
			<FeatureAP><?=$feature_apmode?></FeatureAP>
			<FeatureBridge><?=$feature_bridge?></FeatureBridge>
			<FeatureAPClient><?=$feature_apclient?></FeatureAPClient>
			<FeatureRepeater><?=$feature_repeater?></FeatureRepeater>
			<FeatureGuestZone><?=$feature_guestzone?></FeatureGuestZone>
			<FeatureDualBand><?=$feature_dualband?></FeatureDualBand>
			<FeatureTriBand><?=$feature_triband?></FeatureTriBand>
			<FeatureIPv6><?=$feature_ipv6?></FeatureIPv6>
			<FeatureExtender><?=$feature_extender?></FeatureExtender>
			<FeatureTurboMode><?=$feature_turbomode?></FeatureTurboMode>
			<FeatureSmartConnect><?=$feature_smartconnect?></FeatureSmartConnect>
			<FeatureRussia><?=$feature_russia?></FeatureRussia>
			<FeatureVLAN><?=$feature_vlan?></FeatureVLAN>
			<FeatureNAT><?=$feature_nat?></FeatureNAT>
			<FeatureCN><?=$FEATURE_CN?></FeatureCN>
			<FeatureWPS><?=$feature_wps?></FeatureWPS>
		</GetDeviceFeatureAlphaResponse>
<? if($Remove_XML_Head_Tail != 1)	{HTML_hnap_xml_tail();}?>