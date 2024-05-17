var TabHeader="";
var SideItem="";
var HelpItem="";
var chipId="<%ejGetOther(sysInfo, chipId)%>";
var buildVoice="<%ejGetOther(sysInfo, buildVoice)%>";
var Sitemap = "0";
var CHome = 1;
var CAdvanced = 2;
var CVoice = 3;
var CMaintain = 4;
var CStatus = 5;
var CHelp = 6;
var CEnd = 6;
var delaytimer=300;
//some menu items define
  var mode = '<%ejGet(access_mode)%>';
  var user = '<%ejGet(curUserName)%>';
  var proto = 'PPPoA';
  var ipExt = '0';
  var dhcpen = '0';
  var std = 'annex_a';
  //var wireless = '<%ejGetWl(wlInterface)%>';
  var wireless = '1';
  var voice = '';
  var buildSnmp = '<%ejGetOther(sysInfo, buildSnmp)%>';
  var buildUpnp = '<%ejGetOther(sysInfo, buildUpnp)%>';
  var buildIPv6 = '<%ejGet(enblv6)%>';
  var supportDHCP6s = '1';
  var buildIGMP = '<%ejGetOther(sysInfo, buildMulticast)%>';
  var buildEthWan = "<%ejGetOther(sysInfo, buildEthWan)%>";
  var buildDdnsd = '1';
  var buildSntp = '1';
  var buildPureBridge = '0';
  var buildPortmap = '1';
  var buildipp = '0';
  var buildSes = '0';  //SUPPORT_SES 
  var siproxd = '0';
  var tod = '1';
  var QosEnabled = 'false';
  var buildRip = '1';  //SUPPORT_SES 
  var buildUsbHost = "<%ejGetOther(sysInfo, buildUsbHost)%>";
  var buildUsbFtp = "<%ejGetOther(sysInfo, buildUsbFtp)%>";
  var buildUsbSmb = "<%ejGetOther(sysInfo, buildUsbSmb)%>";
  var buildPwrMngt = "<%ejGetOther(sysInfo, buildPwrMngt)%>";
  var buildTc = "<%ejGetOther(sysInfo, buildTc)%>";
  var ipsec = '0';
  var certificate = '1';
  var wirelessqos = '1';
  var tr69c = '<%ejGetOther(sysInfo, buildTr69c)%>';
  var buildPptpClient = '0';
  var buildDOS = '1';
  var buildPT = '1';
  var buildQoS='1';
  var urlFilter = '1';
  var iptSchedule = '1';
  var build3gfallover = "<%ej_get_3g(build3g)%>";
  var QuickSetup=0;
  var VirtualServers=0;
  var PortTriggering=0;
  var DMZHost=0;
  var ALG=0;
  //var Outgoing=0;
  //var Incoming=0;
  var Filter=0;
  var AttackPrevent=0;
  var MACFiltering=0;
  var ParentalControl=0;
  var QualityofService=0;
  var DefaultGateway=0;
  var StaticRoute=0;
  var RIP=0;
  var Routing=0;
  var DNSServer=0;
  var DynamicDNS=0;
  var Annex="";
  var PortMapping=0;
  var PPTPClient=0;
  var IPSec=0;
  var wlBasic=0;
  var wlSecurity=0;
  var wlMACFilter=0;
  var wlBridge=0;
  var wlAdvanced=0;
  var wlQos=0;
  var wlSES=0;
  var wlStationInfo=0;
  var WirelessAdv=0;
  var MassStorage=0;
  var PrintServer=0;
  var Settings=0;
  var SNMP=0;
  var TR069Client=0;
  var UPNP =0;
  var IGMP=0;    
  var cert = 0;
  var InternetTime=0;
  //var Services=0;
  //var IPAddresses=0;
  //var Passwords=0;
  var AccessControl=0;
  var Security="";
  var UpdateSoftware=0;
  var buildnetusb = "<%ejGetOther(sysInfo, buildNetUsb)%>";

if ( user != 'support' && user != 'user') {
  if ( buildPureBridge == 0) {
      VirtualServers=1;
    if(buildPT == '1')
      PortTriggering=1;
      //add compile option
      DMZHost=1;
        if ( siproxd == '1' )
           ALG =1;
      //Outgoing=1;
      //Incoming=1;
	  //MACFiltering=1;
      Filter=1;
        if (buildDOS == '1')
          AttackPrevent=1;      
         if ( tod == '1' )
            ParentalControl=1;
  }
}

if ( buildPureBridge == 0) {
  QuickSetup=1;
  if ( user != 'user') {
      if (buildQoS == '1')
        QualityofService=1;
        DefaultGateway=1;
        //add compile option
        StaticRoute=1;
        Routing=1;
      if ( buildRip == '1')
        RIP=1;
      //add compile option
      DNSServer=1;
      if ( buildDdnsd == '1')
        DynamicDNS=1;
  }
}

if ( std == 'annex_c' )
  Annex="adslcfgc.html";
else if ('6368' != chipId )
  Annex="adslcfg.html"; 
else
  Annex="xdslcfg.html";  

if ( buildPortmap == '1' ) {
  PortMapping=1;
}

if ( buildPptpClient == '1' ) {
  PPTPClient=1;
}

if ( ipsec == '1' ) {
  IPSec=1;
}

if (certificate == '1')  {
	cert = 1;
}


if ( wireless == '1' ) {
  wlBasic=1;
  wlSecurity=1;
  wlMACFilter=1;
  wlBridge=1;
  wlAdvanced=1;
  WirelessAdv=1;
  if (buildQoS == '1'){
  if ( wirelessqos == '1' ) { 
     wlQos=1;
  }
  }
  //SUPPORT_SES
  if ( buildSes == '1' ) {
     wlSES=1;
  }
  wlStationInfo=1;
}
FWversion =  '<%ejGet(sysVersion)%>';
var FWname = FWversion.split('_'); 
if (FWname[0] == 'AU') {
	wlBridge = 0;
}
if (FWname[0] == 'NA') {
        wlBridge = 0;
}
if ( buildUsbHost == '1' ) {
  if ( buildUsbFtp == '1' || buildUsbSmb == '1' ) {
    MassStorage=1;
  }
  if ( buildipp == '1' ) {
    PrintServer=1;
  }
}

if ( user != 'user') {
  Settings=1;
  if ( buildSnmp == '1' )
  	SNMP=1;
  if ( tr69c == '1' )
  	TR069Client=1;
  if ( (buildPureBridge == '0') && (buildSntp == '1') )
   	InternetTime=1;
  if (buildUpnp == '1') 
    UPNP=1;  
  if (buildIGMP == '1') 
   IGMP=1;    	
  //Services=1;
  //IPAddresses=1;
  //Passwords=1;
  AccessControl=1;
}

var HomeMenu=new Array();
var AdvMenu=new Array();
var VoiceMenu=new Array();
var MaintainMenu = new Array();
var StatMenu=new Array();
var HelpMenu=new Array();

var TabMenu = new Array();

var tabPos = GetTABpos();
var homeMenuIndex = 0;

if ((user != 'user') && (wireless == '1'))
{
    HomeMenu[homeMenuIndex++]=new Gitem(CHome, "Wizard", "internet.html", 1, "setuphelp.js", -1);
    HomeMenu[homeMenuIndex++]=new Gitem(CHome, "Internet Setup", "wan_setting.html", 1, "setuphelp.js", 7);
    HomeMenu[homeMenuIndex++]=new Gitem(CHome, "Wireless Settings", "wlswitchinterface0.wl", wlBasic, "dihelp.js", 6);
    HomeMenu[homeMenuIndex++]=new Gitem(CHome, "Local Network",    "lan.html", 1, "setuphelp.js", -1);
    if (buildIPv6 == '1'){
		//HomeMenu[homeMenuIndex++]=new Gitem(CHome, "IPv6 Lan Host", "ipv6lancfg.html", 1, "setuphelp.js", -1);
		HomeMenu[homeMenuIndex++]=new Gitem(CHome, "IPv6", 	"ipv6internet.html", 1, "setuphelp.js", 9);	
    }
    HomeMenu[homeMenuIndex++]=new Gitem(CHome, "Time and Date",	"sntpcfg.html", 1, "setuphelp.js", -1);
    if (MassStorage == 1)
    {
        if (buildnetusb != '1')
            HomeMenu[homeMenuIndex++]=new Gitem(CHome, "USB Setup", 	"usb.html", 1, "setuphelp.js", 8);
        else
            HomeMenu[homeMenuIndex++]=new Gitem(CHome, "USB Setup", 	"usb.html", 1, "setuphelp.js", -1);
            
        HomeMenu[homeMenuIndex++]=new Gitem(CHome, "Logout",  "logouth.html",	1, "", -1); 
    }
    else
    {
        HomeMenu[homeMenuIndex++]=new Gitem(CHome, "Logout",  "logouth.html",	1, "", -1); 
    }
}
else if (user != 'user')
{
    HomeMenu[homeMenuIndex++]=new Gitem(CHome, "Wizard", "internet.html", 1, "setuphelp.js", -1);
    HomeMenu[homeMenuIndex++]=new Gitem(CHome, "Internet Setup", "cfgwan.cmd", 1, "setuphelp.js", -1);
    HomeMenu[homeMenuIndex++]=new Gitem(CHome, "Local Network",    "lan.html", 1, "setuphelp.js", -1);
	if (buildIPv6 == '1' && supportDHCP6s == '1') {
		//HomeMenu[homeMenuIndex++]=new Gitem(CHome, "IPv6 Lan Host", 	"ipv6lancfg.html", 1, "setuphelp.js", -1);
		HomeMenu[homeMenuIndex++]=new Gitem(CHome, "IPv6", 	"ipv6internet.html", 1, "setuphelp.js", -1);	
	}
    HomeMenu[homeMenuIndex++]=new Gitem(CHome, "Time and Date", 	"sntpcfg.cgi?quickSetup=0", 1, "setuphelp.js", -1);
    HomeMenu[homeMenuIndex++]=new Gitem(CHome, "Logout",  "logouth.html",	1, "", -1); 
}

//if ((user != 'user') && (mode != 'wan'))
var advMenuIndex = 0;

if (user == 'admin')    
{
    AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "Advanced Wireless", "wirelessadv.html", WirelessAdv, "advhelp.js", 3);
    AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "Port Forwarding", "scvrtsrv.html", VirtualServers, "advhelp.js", -1);
    AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "Port Triggering",    "scprttrg.html", PortTriggering, "advhelp.js", -1);
    AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "DMZ",            "scdmz.html", DMZHost, "advhelp.js", -1);
    AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "Parental Control",      "parentalctrl.html", ParentalControl, "advhelp.js", 1);
    AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "Filtering Options",	"filter.html", Filter, "advhelp.js", 0);
    //AdvMenu[5 ]=new Gitem(CAdvanced, "Bridge Filters",        "scmacflt.cmd?action=view", MACFiltering, "advhelp.html", -1);
    //AdvMenu[6 ]=new Gitem(CAdvanced, "Web Filter",      "scurlflt.cmd", urlFilter, "advhelp.html", -1);
    AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "Firewall Settings",      "doscfg.html", 1, "advhelp.js", -1);
    AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "DNS",    "dnscfg.html", DNSServer, "advhelp.js", -1);
    AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "Dynamic DNS",    "ddnscfg.html", DynamicDNS, "advhelp.js", -1);
    //AdvMenu[1 ]=new Gitem(CAdvanced, "Port Mapping",    "portmapadd.html", PortMapping, "advhelp.html", -1);
    //AdvMenu[9 ]=new Gitem(CAdvanced, "QoS",    "qoscls.cmd?action=view", QualityofService, "advhelp.html", -1);
    //AdvMenu[10]=new Gitem(CAdvanced, "ADSL", Annex, 1, "advhelp.html", -1);
    //AdvMenu[11]=new Gitem(CAdvanced, "SNMP", "snmpconfig.html", SNMP, "advhelp.html", -1);
    //AdvMenu[13]=new Gitem(CAdvanced, "Certificate", "certificate.html", cert, "advhelp.html", -1);
    AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "Network Tools", 		 "network.html", 1, "advhelp.js", 2);
    AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "Routing", 		 "routing.html", Routing, "advhelp.js", 4);
    //AdvMenu[11]=new Gitem(CAdvanced, "Schedule", 		 "sciptsched.cmd", iptSchedule, "advhelp.html", -1);
    AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "Schedules", 		 "iptschedadd.html", iptSchedule, "advhelp.js", -1);
    //AdvMenu[13]=new Gitem(CAdvanced, "Print Server", 		 "ippcfg.html", 1, "advhelp.js", -1);
    AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "TR-069 Client", 	"tr69cfg.html", TR069Client, "advhelp.js", -1);
    AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "WI-FI Protected Setup",  "wlprotected.html",	1, "advhelp.js", -1); 
    //AdvMenu[15]=new Gitem(CAdvanced, "WI-FI Schedules",  "wlschedconfig.html",	1, "advhelp.js", -1); 
    /* 20100827, Linus Shi, begin add for budget setup UI, mark: 08270945 */
	if ((buildPwrMngt == "1") && (buildTc == "1")) 
	{
        AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "Budget Quota",  "budget.html",	1, "advhelp.js");
        AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "Power Management",  "pwrmngt.html",	1, "advhelp.js", -1); 
    }
	else if ((buildPwrMngt == "1") && (buildTc == "0")) 
	{
        AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "Power Management",  "pwrmngt.html",	1, "advhelp.js", -1); 
    }
	else if ((buildPwrMngt == "0") && (buildTc == "1")) 
	{
        AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "Budget Quota",  "budget.html",	1, "advhelp.js");   
    }
    if (buildIPv6 == '1'){
    	AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "IPv6 Firewall",  "ipv6_firewall.html",	1, "advhelp.js", -1); 
    	AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "IPv6 Routing",  "ipv6_routing.html",	1, "advhelp.js", -1); 
    }
   	AdvMenu[advMenuIndex++]=new Gitem(CAdvanced, "Logout",  "logouta.html",	1, "", -1); 
	/* 20100827, Linus Shi, end -------------------------- mark: 08270945 */
 
		
    //VoiceMenu[0]=new Gitem(CVoice, "Server Setup", "vserver.htm", 1, "voicehelp.js", -1);
    //VoiceMenu[1]=new Gitem(CVoice, "User Agent", "vua.htm", 1, "voicehelp.js", -1);
    VoiceMenu[0]=new Gitem(CVoice, "Voip Account", "voipcfg.cmd?action=accountview", 1, "voicehelp.js", -1);
    VoiceMenu[1]=new Gitem(CVoice, "Pstn Connection", "vpstnconn.htm", 1, "voicehelp.js", -1);
    VoiceMenu[2]=new Gitem(CVoice, "Line Settings", "voipcfg.cmd?action=connectionview", 1, "voicehelp.js", -1);
    VoiceMenu[3]=new Gitem(CVoice, "Prefix Rules", "voipcfg.cmd?action=wregview", 1, "voicehelp.js", -1);
    VoiceMenu[4]=new Gitem(CVoice, "Call Waiting", "vcallreg.htm", 1, "voicehelp.js", -1);
    VoiceMenu[5]=new Gitem(CVoice, "Incoming Call Policy", "vincoming.htm", 1, "voicehelp.js", -1);
    VoiceMenu[6]=new Gitem(CVoice, "Peer to Peer", "vptop.htm", 1, "voicehelp.js", -1);
    VoiceMenu[7]=new Gitem(CVoice, "Telephony Setup", "vtelephony.htm", 1, "voicehelp.js", -1);
    VoiceMenu[8]=new Gitem(CVoice, "Logout", "logoutv.html", 1, "", -1);
}


var maintainMenuIndex = 0; 
if (user == 'user')
{
    MaintainMenu[maintainMenuIndex++]=new Gitem(CMaintain, "Firmware Update", "upload.html", 1, "mainhelp.js", -1);
    MaintainMenu[maintainMenuIndex++]=new Gitem(CMaintain, "Diagnostics", 	"diag.html", 1, "mainhelp.js", -1);
    MaintainMenu[maintainMenuIndex++]=new Gitem(CMaintain, "System Log", 	"logintro.html", 1, "mainhelp.js", -1);
    MaintainMenu[maintainMenuIndex++]=new Gitem(CMaintain, "Logout",  "logoutm.html",	1, "", -1);
}
else
{
    MaintainMenu[maintainMenuIndex++]=new Gitem(CMaintain, "System", 	"updatesettings.html", Settings, "mainhelp.js", -1);
    MaintainMenu[maintainMenuIndex++]=new Gitem(CMaintain, "Firmware Update", "upload.html", 1, "mainhelp.js", -1);
    MaintainMenu[maintainMenuIndex++]=new Gitem(CMaintain, "Access Controls", 	"access.html", AccessControl, "mainhelp.js", 5);
    MaintainMenu[maintainMenuIndex++]=new Gitem(CMaintain, "Diagnostics", 	"diag.html", 1, "mainhelp.js", -1);
    MaintainMenu[maintainMenuIndex++]=new Gitem(CMaintain, "Ping Test",	"diagping.html", 1, "mainhelp.js", -1);
    MaintainMenu[maintainMenuIndex++]=new Gitem(CMaintain, "System Log", 	"logintro.html", 1, "mainhelp.js", -1);
    MaintainMenu[maintainMenuIndex++]=new Gitem(CMaintain, "Logout",  "logoutm.html",	1, "", -1);
}

var statMenuIdx = 0;
StatMenu[statMenuIdx++ ]=new Gitem(CStatus, "Device Info", "info.html", 1, "statushelp.js", -1);
//StatMenu[1 ]=new Gitem(CStatus, "WAN Info", "wancfg.cmd?action=view", 1, "statushelp.html", -1);
StatMenu[statMenuIdx++ ]=new Gitem(CStatus, "Wireless Clients", 	"wlstationlist.cmd", wlStationInfo, "statushelp.js", -1);
StatMenu[statMenuIdx++ ]=new Gitem(CStatus, "DHCP Clients", "dhcpinfo.html", 1, "statushelp.js", -1);
if(buildVoice=="1")
{
	StatMenu[statMenuIdx++ ]=new Gitem(CStatus, "Voice", 	"stsvoice.html", 1, "statushelp.js", -1);
	StatMenu[statMenuIdx++]=new Gitem(CStatus, "Logs", 	"logview.cmd", 1, "statushelp.js", -1);
	//StatMenu[5 ]=new Gitem(CStatus, "LAN", 	"statsifc.html", 1, "statushelp.html", -1);
	//StatMenu[6 ]=new Gitem(CStatus, "WAN", 	"statswan.cmd", 1, "statushelp.html", -1);
	//StatMenu[7 ]=new Gitem(CStatus, "ATM", 	"statsatm.cmd", 1, "statushelp.html", -1);
	StatMenu[statMenuIdx++]=new Gitem(CStatus, "Statistics", 	"statsifcwan.html", 1, "statushelp.js", -1);
	//StatMenu[6 ]=new Gitem(CStatus, "ADSL", 	"statsadsl.html", 1, "statushelp.html", -1);
	StatMenu[statMenuIdx++]=new Gitem(CStatus, "Route Info", "rtroutecfg.cmd?action=view", 1, "statushelp.js", -1);
	StatMenu[statMenuIdx++]=new Gitem(CStatus, "Logout",  "logouts.html",	1, "", -1);
}
else
{
	//StatMenu[3 ]=new Gitem(CStatus, "Voice", 	"stsvoice.html", 1, "statushelp.js", -1);
	StatMenu[statMenuIdx++]=new Gitem(CStatus, "Logs", 	"logview.cmd", 1, "statushelp.js", -1);
	//StatMenu[5 ]=new Gitem(CStatus, "LAN", 	"statsifc.html", 1, "statushelp.html", -1);
	//StatMenu[6 ]=new Gitem(CStatus, "WAN", 	"statswan.cmd", 1, "statushelp.html", -1);
	//StatMenu[7 ]=new Gitem(CStatus, "ATM", 	"statsatm.cmd", 1, "statushelp.html", -1);
	StatMenu[statMenuIdx++]=new Gitem(CStatus, "Statistics", 	"statsifcwan.html", 1, "statushelp.js", -1);
	//StatMenu[6 ]=new Gitem(CStatus, "ADSL", 	"statsadsl.html", 1, "statushelp.html", -1);
	StatMenu[statMenuIdx++]=new Gitem(CStatus, "Route Info", "rtroutecfg.cmd?action=view", 1, "statushelp.js", -1);
	if (buildIPv6 == '1')
	{
	    StatMenu[statMenuIdx++]=new Gitem(CStatus, "IPv6 Status", "status_ipv6.html", 1, "statushelp.js", -1);/*20110827, Denny add for the status page of ipv6 menu*/
	    StatMenu[statMenuIdx++]=new Gitem(CStatus, "IPv6 Routing Info", "ipv6_routing_status.html", 1, "statushelp.js", -1);/*20110827, Denny add for the status page of ipv6 menu*/
	}
	
	StatMenu[statMenuIdx++]=new Gitem(CStatus, "Logout",  "logouts.html",	1, "", -1);
}


HelpMenu[0]=new Gitem(CHelp, "Menu", "helpmenu.html", 1, "", -1);
//if (mode == 'wan')
if (user == 'support')    
{
    HelpMenu[1]=new Gitem(CHelp, "Setup", "helpbasic.html", 1, "", -1);
	HelpMenu[2]=new Gitem(CHelp, "Maintenance", "helpmaintenance.html", 1, "", -1);
	HelpMenu[3]=new Gitem(CHelp, "Status", "helpstatus.html", 1, "", -1);	
}
else
{
    if (user == 'user')
    {
	    HelpMenu[1]=new Gitem(CHelp, "Maintenance", "helpmaintenance.html", 1, "", -1);
	    HelpMenu[2]=new Gitem(CHelp, "Status", "helpstatus.html", 1, "", -1);	
    }
	else
	{
        HelpMenu[1 ]=new Gitem(CHelp, "Setup", "helpbasic.html", 1, "", -1);
        HelpMenu[2 ]=new Gitem(CHelp, "Advanced", "helpadvanced.html", 1, "", -1);
        if(buildVoice=="1")
        {
	        HelpMenu[3 ]=new Gitem(CHelp, "Voice", "helpvoice.html", 1, "", -1);
	        HelpMenu[4 ]=new Gitem(CHelp, "Maintenance", "helpmaintenance.html", 1, "", -1);
	        HelpMenu[5 ]=new Gitem(CHelp, "Status", "helpstatus.html", 1, "", -1);
	    }	
        else
        {
	        HelpMenu[3 ]=new Gitem(CHelp, "Maintenance", "helpmaintenance.html", 1, "", -1);
	        HelpMenu[4 ]=new Gitem(CHelp, "Status", "helpstatus.html", 1, "", -1);		
        }
	}
}

var home=getDefaultPage(0); //'index.html';
var adv=getDefaultPage(1); //'scvrtsrv.cmd?action=view';
var voice=getDefaultPage(2); 
var maintenace=getDefaultPage(3);
var status=getDefaultPage(4);
var help=getDefaultPage(5);

if (user == 'user')
{
    TabMenu[0 ] =new Gtab("Maintenance", maintenace);
    TabMenu[1 ] =new Gtab("Status", status);
    TabMenu[2 ] =new Gtab("Help", help);
}
//else if (mode == 'wan') //access from wan
else if (user == 'support') //access from wan
{
    TabMenu[0 ] =new Gtab("Setup", home);
    TabMenu[1 ] =new Gtab("Maintenance", maintenace);
    TabMenu[2 ] =new Gtab("Status", status);
    TabMenu[3 ] =new Gtab("Help", help);
}
else
{
    TabMenu[0 ] =new Gtab("Setup", home);
    TabMenu[1 ] =new Gtab("Advanced", adv); //"portmap.cmd");
    if(buildVoice=="1")
    {
	TabMenu[2 ] =new Gtab("Voice", voice);
	TabMenu[3 ] =new Gtab("Maintenance", maintenace); //"upload.html");
	TabMenu[4 ] =new Gtab("Status", status);
	TabMenu[5 ] =new Gtab("Help", help);
    }
    else
    {
	//TabMenu[2 ] =new Gtab("Voice", voice);
	TabMenu[2 ] =new Gtab("Maintenance", maintenace); //"upload.html");
	TabMenu[3 ] =new Gtab("Status", status);
	TabMenu[4 ] =new Gtab("Help", help);
    }
}

function getDefaultPage(ID)
{
	var sideMenu = HomeMenu;
	
	if (ID == 1)
	{
		sideMenu = AdvMenu;
	}
	else if (ID == 2)
	{
		sideMenu = VoiceMenu;
	}	
	else if (ID == 3)
	{
		sideMenu = MaintainMenu;
	}	
	else if (ID == 4)
	{
		sideMenu = StatMenu;
	}
	else if (ID == 5)
	{
		sideMenu = HelpMenu;
	}

	for(i=0;i < sideMenu.length;i++)
    {               
		if (sideMenu[i].ishow == 1)
        	return sideMenu[i].surl;
    }
}

function Gitem(ifolder,sname,surl,ishow,shelp, idmenu)
{
    this.ifolder=ifolder;
    this.sname=sname;
    this.surl=surl;
    this.ishow=ishow;
    this.shelp=shelp;
	this.idmenu = idmenu;
}

function Gtab(sname,surl)
{
    this.sname=sname;
    this.surl=surl;
}

function doLink(surl)
{
    shref =""+surl;
    document.location.href = shref;
}

function GetTABpos()
{
	var tabOn = 0;

	for(i=0; i < TabMenu.length; i++)
	{
		if (TabHeader == TabMenu[i].sname)
			tabOn = i;
	}

	return tabOn;
}

function GetSidepos(menu)
{
	var tabOn = 0;

	for(i=0; i < menu.length; i++)
	{
		if (SideItem == menu[i].sname)
			tabOn = i;
	}

	return tabOn;
}

function WFI_user(){
	    var top1 = '<TD width=155 class=';
	var top2 = '><A href="';
	var top3 = '">';
	var top4 = '</A></TD>';

	var result = "";


	tabPos = GetTABpos();
		for(i=0; i < TabMenu.length; i++)
	{
		if (i<TabMenu.length -1)  
			top1 = '<TD width=283 class=';
		else 
			top1 = '<TD width=155 class=';
	if (tabPos == i)
			result = result + top1 + 'topnavon rowspan=2' + top2 + TabMenu[i].surl + top3 + TabMenu[i].sname + top4;
		else
			result = result + top1 + 'topnavoff' + top2 + TabMenu[i].surl + top3 + TabMenu[i].sname + top4;
			
	}		

	document.write(result);
}

function WFI_support(){
	    var top1 = '<TD width=155 class=';
	var top2 = '><A href="';
	var top3 = '">';
	var top4 = '</A></TD>';

	var result = "";


	tabPos = GetTABpos();
		for(i=0; i < TabMenu.length; i++)
	{
		if ( i<TabMenu.length -1)  
			top1 = '<TD width=188 class=';
		else 
			top1 = '<TD width=155 class=';
		if (tabPos == i)
			result = result + top1 + 'topnavon rowspan=2' + top2 + TabMenu[i].surl + top3 + TabMenu[i].sname + top4;
		else
			result = result + top1 + 'topnavoff' + top2 + TabMenu[i].surl + top3 + TabMenu[i].sname + top4;
	}		

	document.write(result);
}


function WFI_admin(){
	var top1;
	if	(buildVoice=="1")
	{
	   top1 = '<TD width=115 class=';
	}
	else
	{
	   top1 = '<TD width=138 class=';
	}
	var top2 = '><A href="';
	var top3 = '">';
	var top4 = '</A></TD>';

	var result = "";


	tabPos = GetTABpos();
	for(i=0; i < TabMenu.length; i++)
	{
	         if (TabMenu[i].sname =="Help"){
			 top1='<TD  width=155 class=';
	         	}
		else if (TabMenu[i].sname =="Voice"){
			 top1='<TD  width=105 class=';
	         	}
	
		if (tabPos == i)
			result = result + top1 + 'topnavon rowspan=2' + top2 + TabMenu[i].surl + top3 + TabMenu[i].sname + top4;
		else
			result = result + top1 + 'topnavoff' + top2 + TabMenu[i].surl + top3 + TabMenu[i].sname + top4;
	}		
	

	document.write(result);
}

function Write_Folder_Images()
{
    //if (mode == 'wan')
    if (user == 'support')
    {
        WFI_support();
    }
	else
	{
	    if (user == "user")
	    {
		    WFI_user();
	    }
	    else
	    {
	        WFI_admin();
	    }	
    }
}

/*
function Write_Folder_Images()
{
    var top1 = '<TD width=140 class=';
	var top2 = '><A href="';var top3 = '">';
	var top4 = '</A></TD>';

	var result = "";

	tabPos = GetTABpos();
	
	for(i=0; i < TabMenu.length; i++)
	{
		if (tabPos == i)
			result = result + top1 + 'topnavon rowspan=2' + top2 + TabMenu[i].surl + top3 + TabMenu[i].sname + top4;
		else
			result = result + top1 + 'topnavoff' + top2 + TabMenu[i].surl + top3 + TabMenu[i].sname + top4;
	}		

	document.write(result);
}
*/
function Write_Item_Images()
{
	var sideMenu = HomeMenu;
	var top = '<TD id=sidenav_container><DIV id=sidenav><UL>';
	var bottom = '</LI></UL></DIV></TD>';
//	var side1 = '<LI><DIV ';
//	var side2_1 = '><A href="';/var side2_2 = '><A onMouseover="showmenu(event,linkset[';
	var side2_3 = '], ';
//	var side2_4 = 'this)" onMouseout="delayhidemenu()" href="';
	var side1 = '<LI><DIV onMouseover="showmenu(event,linkset[';

	var side1_2 = '<LI><DIV ';
	var side2_1 = '><A href="';var side2_2 = '], this)" onMouseout="delayhidemenu()" ';
	var side2_3 = '><A href="';var side3 = '">';
	var side4 = '</A></DIV>';
	var result = "";
	if(buildVoice == "1" && mode != 'wan' && user == 'user')
	{
		if (tabPos == 0)
		{
			sideMenu = HomeMenu;
		}
		else if (tabPos == 1)
		{
			sideMenu = AdvMenu;
		}
		else if (tabPos == 2)
		{
			sideMenu = VoiceMenu;
		}	
		else if (tabPos == 3)
		{
			sideMenu = MaintainMenu;
		}	
		else if (tabPos == 4)
		{
			sideMenu = StatMenu;
		}
		else if (tabPos == 5)
		{
			sideMenu = HelpMenu;
		}
	}
	//else if (mode == 'wan') //access from wan
	else if (user == 'support') //access from wan
    {
		if (tabPos == 0)
		{
			sideMenu = HomeMenu;
		}
		else if (tabPos == 1)
		{
			sideMenu = MaintainMenu;
		}	
		else if (tabPos == 2)
		{
			sideMenu = StatMenu;
		}
		else if (tabPos == 3)
		{
			sideMenu = HelpMenu;
		}
	}
	else if (user == 'user')
    {
		if (tabPos == 0)
		{
			sideMenu = MaintainMenu;
		}	
		else if (tabPos == 1)
		{
			sideMenu = StatMenu;
		}
		else if (tabPos == 2)
		{
			sideMenu = HelpMenu;
		}
	}
	else
	{
		if (tabPos == 0)
		{
			sideMenu = HomeMenu;
		}
		else if (tabPos == 1)
		{
			sideMenu = AdvMenu;
		}
		else if (tabPos == 2)
		{
			sideMenu = MaintainMenu;
		}	
		else if (tabPos == 3)
		{
			sideMenu = StatMenu;
		}
		else if (tabPos == 4)
		{
			sideMenu = HelpMenu;
		}
	}

	var g_FID= GetSidepos(sideMenu);

	for(i=0;i < sideMenu.length;i++)
    {               
		if ((g_FID == i)&&(sideMenu[i].ishow == 1)){

			if (sideMenu[i].idmenu > -1)
				//result = result + side1 + ' class=sidenavoff id=' + sideMenu[i].sname + side2_2 + sideMenu[i].idmenu + side2_3 + sideMenu[i].sname + side2_4 + sideMenu[i].surl + side3 + sideMenu[i].sname + side4;				
				result = result + side1 + sideMenu[i].idmenu + side2_2 + ' class=sidenavoff id=dmenu' + sideMenu[i].idmenu + side2_3 + sideMenu[i].surl + side3 + sideMenu[i].sname + side4;
			else
				//result = result + side1 + ' class=sidenavoff id=' + sideMenu[i].sname + side2_1 + sideMenu[i].surl + side3 + sideMenu[i].sname + side4;
				result = result + side1_2 + ' class=sidenavoff' + side2_1 + sideMenu[i].surl + side3 + sideMenu[i].sname + side4;
		}else if (sideMenu[i].ishow == 1){

			if (sideMenu[i].idmenu > -1)
				//result = result + side1 + ' id=' + sideMenu[i].sname + side2_2 + sideMenu[i].idmenu + side2_3 + sideMenu[i].sname + side2_4 + sideMenu[i].surl + side3 + sideMenu[i].sname + side4;
				result = result + side1 + sideMenu[i].idmenu + side2_2 + ' id=dmenu' + sideMenu[i].idmenu + side2_3 + sideMenu[i].surl + side3 + sideMenu[i].sname + side4;
			else
				//result = result + side1 + ' id=' + sideMenu[i].sname + side2_1 + sideMenu[i].surl + side3 + sideMenu[i].sname + side4;
				result = result + side1_2 + side2_1 + sideMenu[i].surl + side3 + sideMenu[i].sname + side4;
		}
        
    }

    document.write(top);
	document.write(result);

	/*if (tabPos == 4)
	{
		document.write('<LI><DIV>&nbsp;</DIV>');
		document.write('<LI><DIV><A href="">Support</A></DIV>');
	}*/

	document.write(bottom);
	
}

function mainTableStart()
{
	var tabPos;

  document.write('<style>');
	document.write('div.overflow');
	document.write('{');
	document.write('	overflow: auto;');
	if (HelpItem != ""){
	  document.write('	width: 500px;');
	} else {
	  document.write('	width: 620px;');
	}
	document.write('}');
  document.write('</style>');

	tabPos = GetTABpos();

	if (tabPos == 4)
		document.write('<DIV align="center" style="display: hidden" id="tblmain">');
	else
		document.write('<DIV align="center" style="display: none" id="tblmain">');

	document.write('<TABLE cellSpacing=0 width="800"><TR><TD>');
	document.write('<TABLE id=header_container width="800"><TR>');
	document.write('<TD align=left width="200">Product Page: ' + "<%ejGet(modelName)%>" + '</TD>');
	//document.write('<TD align=right width="300"></TD>');
	document.write('<TD align=right width="600"><IMG alt="" src="images/img_arrow.gif"><a href="sitemap.html">Site Map</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Firmware Version: ' + "<%ejGet(sysVersion)%>" + '</TD>');
	document.write('</TR></TABLE>');
	/*
	document.write('<TABLE cellSpacing=0 width=100%>');
	document.write('<TR><td height=3 style={background:white}></td></TR>');
	document.write('</TABLE>');
	*/
}

function logo()
{
	document.write('<TABLE cellSpacing=0 width="800"><TR><TD id=masthead_container width="800"><IMG alt="" src="images/img_masthead.gif"></TD></TR></TABLE>');
}

function TopNav()
{
	document.write('<TABLE id=topnav_container border=0 width="804"><TR><TD>');
	document.write('<TABLE id=topnav_container2 border=0 cellSpacing=0><TR><TD rowspan=2><IMG alt="" src="images/img_modnum.gif"></TD>');
	Write_Folder_Images();
	document.write('</TR><TR><TD></TD><TD></TD><TD></TD><TD></TD></TR></TABLE>');
	document.write('</TD></TR></TABLE>');
}
function ThirdRowStart()
{
	document.write('<TABLE id=content_container cellSpacing=0 summary="" border=0 width="800"><TR>');
}

function mainBodyStart()
{
	document.write('<TD id=maincontent_container><TABLE><TR><TD>');
	
  if (HelpItem != ""){	
	  document.write('<DIV id=maincontent style="width:539">');
	} else {
	  document.write('<DIV id=maincontent style="width:690">');
	}
}
function mainBodyEnd()
{
	document.write('</DIV>');
	document.write('</TD></TR></TABLE></TD>');
}
function ThirdRowEnd()
{
	var sideMenu;

	if(buildVoice=="1")
	{
		if (tabPos == 0)
		{
			sideMenu = HomeMenu;
		}
		else if (tabPos == 1)
		{
			sideMenu = AdvMenu;
		}
		else if (tabPos == 2)
		{
			sideMenu = VoiceMenu;
		}	
		else if (tabPos == 3)
		{
			sideMenu = MaintainMenu;
		}	
		else if (tabPos == 4)
		{
			sideMenu = StatMenu;
		}
		else if (tabPos == 5)
		{
			sideMenu = HelpMenu;
		}
	}
	//else if (mode == 'wan') //access from wan
	else if (user == 'support') //access from wan
	{
		if (tabPos == 0)
		{
			sideMenu = HomeMenu;
		}
		else if (tabPos == 1)
		{
			sideMenu = MaintainMenu;
		}	
		else if (tabPos == 2)
		{
			sideMenu = StatMenu;
		}
		else if (tabPos == 3)
		{
			sideMenu = HelpMenu;
		}
	}
	else if (user == 'user')
	{
		if (tabPos == 0)
		{
			sideMenu = MaintainMenu;
		}	
		else if (tabPos == 1)
		{
			sideMenu = StatMenu;
		}
		else if (tabPos == 2)
		{
			sideMenu = HelpMenu;
		}
	}
	else
	{
		if (tabPos == 0)
		{
			sideMenu = HomeMenu;
		}
		else if (tabPos == 1)
		{
			sideMenu = AdvMenu;
		}
		else if (tabPos == 2)
		{
			sideMenu = MaintainMenu;
		}	
		else if (tabPos == 3)
		{
			sideMenu = StatMenu;
		}
		else if (tabPos == 4)
		{
			sideMenu = HelpMenu;
		}
	}

	var g_FID= GetSidepos(sideMenu);

  if (HelpItem != ""){	
	document.write('<TD id=sidehelp_container>');
	document.write('<DIV id=help_text>');
	document.write('<LABEL id="helpLabel"></label>');  	
	document.write('<script language="Javascript" src="' + sideMenu[g_FID].shelp + '"></script>');	
	document.write('</DIV>');
	document.write('</TD>');
	}
  else if (Sitemap == "1")
	document.write('</TR></TABLE>');
  else if (sideMenu[g_FID].shelp > -1)
	document.write('</TR></TABLE>');
	
}
function Footer()
{
	document.write('<TABLE id=footer_container cellSpacing=0 border=0><TR><TD id=leftimage>');
	//document.write('<IMG height=35 alt="" src="images/img_bottom.gif" width=114></TD>');
	document.write('<TD>&nbsp;</TD></TR></TABLE>');
	
}
function mainTableEnd()
{
	document.write('</TD></TR></TABLE><DIV id=copyright>Copyright &copy; 2010-2012 D-Link Systems, Inc.</DIV></DIV>');
	setTimeout("document.getElementById('tblmain').style.display = 'block'", delaytimer);
}

var defaultMenuWidth="130px" //set default menu width.
var baseTop = 147;
var top = 27;
var width = 127;

var linkset=new Array()
//SPECIFY MENU SETS AND THEIR LINKS. FOLLOW SYNTAX LAID OUT

//if ((user != 'user') && (mode != 'wan'))
if (user == 'admin')    
{
    linkset[0]='<DIV id=sidenav><UL>';
    linkset[0]+='<LI><DIV><A href="scinflt.html">Inbound Filter</A></DIV>';
    linkset[0]+='<LI><DIV><A href="scoutflt.html">Outbound Filter</A></DIV>';
    linkset[0]+='<LI><DIV><A href="scmacflt.html">Bridge Filter</A></DIV>';
    linkset[0]+='</LI></UL></DIV>';
    
    linkset[1]='<DIV id=sidenav><UL>';
    linkset[1]+='<LI><DIV><A href="urlfltadd.html">Block Website</A></DIV>';
    linkset[1]+='<LI><DIV><A href="todadd.html">Block MAC Address</A></DIV>';
    linkset[1]+='<LI><DIV><A href="trusted.html">Trusted Computers</A></DIV>';
    linkset[1]+='</LI></UL></DIV>';
    
    linkset[2]='<DIV id=sidenav><UL>';
    linkset[2]+='<LI><DIV><A href="portmap.cmd">Port Mapping</A></DIV>';
    linkset[2]+='<LI><DIV><A href="igmp.html">IGMP</A></DIV>';
    linkset[2]+='<LI><DIV><A href="qosclscfg.html">QoS</A></DIV>';
    linkset[2]+='<LI><DIV><A href="' + Annex + '">DSL</A></DIV>';
	if (SNMP == '1')	
	{	
    linkset[2]+='<LI><DIV><A href="snmpconfig.html">SNMP</A></DIV>';
	}
    //linkset[2]+='<LI><DIV><A href="tr69cfg.html">TR-069</A></DIV>';
    //linkset[2]+='<LI><DIV><A href="certificate.html">Certificate</A></DIV>';
	linkset[2]+='<LI><DIV><A href="upnpcfg.html">UPNP</A></DIV>';
    linkset[2]+='</LI></UL></DIV>';
}

//if ((user != 'user') && (wireless == '1') && (mode != 'wan'))
if ((user == 'admin') && (wireless == '1'))    
{
    linkset[3]='<DIV id=sidenav><UL>';
    linkset[3]+='<LI><DIV><A href="wlcfgadv.html">Advanced Settings</A></DIV>';
    linkset[3]+='<LI><DIV><A href="wlmacflt.cmd?action=view">MAC Filter</A></DIV>';
	if (wlBridge == 1)
	{
        linkset[3]+='<LI><DIV><A href="wlwds.cmd?action=view">Bridge</A></DIV>';
	}
    linkset[3]+='<LI><DIV><A href="wlqos.cmd">QoS</A></DIV>';
    //linkset[3]+='<LI><DIV><A href="wirelesssetting.html">Manual Wireless Connection Setup</A></DIV>'
	
    linkset[3]+='</LI></UL></DIV>';
}

//if ((user != 'user') && (mode != 'wan'))
if (user == 'admin')    
{
    linkset[4]='<DIV id=sidenav><UL>';
    linkset[4]+='<LI><DIV><A href="rtroutecfg.cmd?action=viewcfg">Static Route</A></DIV>';
    linkset[4]+='<LI><DIV><A href="rtdefaultcfg.html">Default Gateway</A></DIV>';
    linkset[4]+='<LI><DIV><A href="ripcfg.cmd?action=view">RIP</A></DIV>';
    linkset[4]+='</LI></UL></DIV>';
}

if (user != 'user')
{
    linkset[5]='<DIV id=sidenav><UL>';
    linkset[5]+='<LI><DIV><A href="password.html">Passwords</A></DIV>';
    linkset[5]+='<LI><DIV><A href="scsrvcntr.html">Services</A></DIV>';
    linkset[5]+='<LI><DIV><A href="scacccntr.html">IP Addresses</A></DIV>';
    linkset[5]+='</LI></UL></DIV>';
}

if ((user != 'user') && (wireless == '1'))
{
    linkset[6]='<DIV id=sidenav><UL>';
    linkset[6]+='<LI><DIV><A href="wlsecintro.html">Wireless Connection Setup Wizard</A></DIV>';
    linkset[6]+='<LI><DIV><A href="wlwps.html">Add Wireless Device With WPS</A></DIV>';
    linkset[6]+='<LI><DIV><A href="wirelesssetting.html">Manual Wireless Connection Setup</A></DIV>'	
    linkset[6]+='</LI></UL></DIV>';
}

if (user != 'user')
{
    linkset[7]='<DIV id=sidenav><UL>';
    linkset[7]+='<LI><DIV><A href="dslatm.cmd">Atm</A></DIV>';
    if (buildEthWan == 1)
    {
        linkset[7]+='<LI><DIV><A href="ethwan.cmd">Eth</A></DIV>';
    }
    linkset[7]+='<LI><DIV><A href="wancfg.cmd">Wan Service</A></DIV>';
    linkset[7]+='</LI></UL></DIV>';
}

if ((user != 'user') && MassStorage == 1 && buildnetusb != '1')
{
    linkset[8]='<DIV id=sidenav><UL>';
  //  linkset[8]+='<LI><DIV><A href="usb_main.html">USB interface</A></DIV>';
  //  if (buildUsbSmb == '1')
   // {
  //      linkset[8]+='<LI><DIV><A href="usb_fsrv.html">File Server</A></DIV>';
   // }
    //if (buildUsbFtp == '1')
    //{
    //    linkset[8]+='<LI><DIV><A href="usb_ftp_server.html">FTP Server</A></DIV>';
    //}
    linkset[8]+='<LI><DIV><A href="storagecfg.html">Storage Server</A></DIV>';
    linkset[8]+='<LI><DIV><A href="ippcfg.html">Print Server</A></DIV>';

    linkset[8]+='</LI></UL></DIV>';
}

if (user != 'user')
{
    linkset[9]='<DIV id=sidenav><UL>';
    linkset[9]+='<LI><DIV><A href="ipv6wizintro.html">IPv6 Internet Connection Setup Wizard</A></DIV>';
    linkset[9]+='<LI><DIV><A href="ipv6cfg.html">Manual IPv6 Internet Connection Setup</A></DIV>';
    linkset[9]+='</LI></UL></DIV>';
}
////No need to edit beyond here
var ie5=document.all && !window.opera
var ns6=document.getElementById


if (ie5||ns6){
	document.write('<IFRAME id="iframetemp" style="position:absolute; display=none; z-index:0; width:0; height:0" frameborder=0 scrolling=no marginwidth=0  marginheight=0></iframe>');
	document.write('<div id="popitmenu" onMouseover="clearhidemenu();" onMouseout="dynamichide(event)">menu</div>');
}

var frameTemp = ie5? document.all.iframetemp : document.getElementById("iframetemp");

function iecompattest(){
return (document.compatMode && document.compatMode.indexOf("CSS")!=-1)? document.documentElement : document.body
}

function showmenu(e, which, count){
	if (!document.all&&!document.getElementById)
		return;

	clearhidemenu();

	menuobj=ie5? document.all.popitmenu : document.getElementById("popitmenu");
	menuobj.innerHTML=which;
	menuobj.style.width=defaultMenuWidth;
	menuobj.contentwidth=menuobj.offsetWidth;
	menuobj.contentheight=menuobj.offsetHeight;

eventX=ie5? event.clientX : e.clientX;
eventY=ie5? event.clientY : e.clientY;
//Find out how close the mouse is to the corner of the window;
var rightedge=ie5? iecompattest().clientWidth-eventX : window.innerWidth-eventX;
var bottomedge=ie5? iecompattest().clientHeight-eventY : window.innerHeight-eventY;

var tempEl = count;
//var baseLeft = count.offsetParent.offsetParent.offsetParent.offsetParent.offsetLeft
var baseLeft = 0;
var tempTop =0;

while (tempEl != null){
	baseLeft += tempEl.offsetLeft;
	tempTop += tempEl.offsetTop;
	tempEl = tempEl.offsetParent;
}

if (rightedge<menuobj.contentwidth)
menuobj.style.left=baseLeft+width;
else
menuobj.style.left=baseLeft+width;

if (bottomedge<menuobj.contentheight)
menuobj.style.top= tempTop;
else
menuobj.style.top=tempTop;

frameTemp.style.display="block";
frameTemp.style.left=menuobj.style.left;
frameTemp.style.top=menuobj.style.top;
frameTemp.style.width=menuobj.contentwidth;
frameTemp.style.height=menuobj.contentheight;
menuobj.style.visibility="visible";

return false;
}

function contains_ns6(a, b) {
while (b.parentNode)
if ((b = b.parentNode) == a)
return true;
return false;
}

function hidemenu(){
if (window.menuobj)
menuobj.style.visibility="hidden";
frameTemp.style.display="none";
}

function dynamichide(e){
if (ie5&&!menuobj.contains(e.toElement))
hidemenu()
else if (ns6&&e.currentTarget!= e.relatedTarget&& !contains_ns6(e.currentTarget, e.relatedTarget))
hidemenu()
}

function delayhidemenu(){
delayhide=setTimeout("hidemenu()",300)
}

function clearhidemenu(){
if (window.delayhide)
clearTimeout(delayhide)
}

if (ie5||ns6)
document.onclick=hidemenu
