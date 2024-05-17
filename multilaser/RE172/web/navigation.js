/*redirect form*/
function logout_click()
{
	(function(safeLocation){
		var outcome, u;
		try { outcome = document.execCommand("ClearAuthenticationCache") }catch(e){}
		if (!outcome) {
			outcome = (function(x){
				if (x) {
					x.open("HEAD", safeLocation || location.href, true, "logout", (new Date()).getTime().toString())
					x.send("")
					return 1
				} else {
					return
				}
			})(window.XMLHttpRequest ? new window.XMLHttpRequest() : ( window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : u ))
		}
		if (!outcome) {
			alert("Your browser is too old or too weird to support log out functionality. Close all windows and restart the browser.");
		}
	})()
    return;
}

function get_form(page, wlan_id){
        return 'boafrm/formWlanRedirect?redirect-url='+page+'&wlan_id='+wlan_id ;
} 
/*add_menuItem(URL,title)*/
function add_menuItem(frameset,url,name)
{

  var str;
  document.write("<td class=\"topnavoff\">");
  str="<a href=\""+url+"\" target=\""+frameset+"\" id=\""+name+"\" rel=\""+name+"\" onclick=\"return on_click_menu(this);\">"+name+"</a>";
  //alert(str);
  document.write(str);
  document.write("</td>");
}

function add_topMenuItem(url,menu_name)
{
  add_menuItem("sub_menu",url,menu_name);
}

function add_subMenuItem(url,menu_name)
{
	var str;
  document.write("<tr height=\"35\">");
  
  document.write("<td class=\"topnavoff\">");
      
  //jeff sssss
  if(url == "wizard.htm")
  {
    str="<a href=\""+url+"\" target=\"_top\" id=\""+menu_name+"\" rel=\""+menu_name+"\" onclick=\"return on_click_menu(this);\">"+menu_name+"</a>";   
  }
  else if(url == "logout")
  {
    str="<a href=\"index.html\" target=\"_top\" id=\""+menu_name+"\" rel=\""+menu_name+"\" onclick=\"logout_click();\">"+menu_name+"</a>";   
  }
  else
  {
  str="<a href=\""+url+"\" target=\"content\" id=\""+menu_name+"\" rel=\""+menu_name+"\" onclick=\"return on_click_menu(this);\">"+menu_name+"</a>";
  }
  //jeff eeeee
  
  //alert(str);
  document.write(str);
  document.write("</td>");
  //add_menuItem("content",url,menu_name);
  document.write("</tr>");
}

function index_of(array,value){
	var i;
	for(i = 0; i < array.length; i++){
		if(array[i] == value)
			return i;		
	}
	return -1;
}

function show_subnav_element(url,menu_name,isReadable)
{
	if(isReadable){
		add_subMenuItem(url,menu_name);
	}

}

function show_topmenu_wlan(is8021xClient, isMeshDefined, is80211rSupport, isAirtimeDefined)
{	
	var subhtml_array = [<%getIndex("wlbasic.htm");%>,
						<%getIndex("wladvanced.htm");%>,
						<%getIndex("wlsecurity.htm");%>,
						<%getIndex("wlactrl.htm");%>,
						<%getIndex("wlwds.htm");%>,
						<%getIndex("wlsurvey.htm");%>,
						<%getIndex("wlwps.htm");%>,
						<%getIndex("wlsch.htm");%>];
	
	var first_show_index = index_of(subhtml_array,1); 
	
	if(first_show_index == -1){
		if(isMeshDefined){
			if(<%getIndex("wlmesh.htm")%>)
				return 1;
		}
		if(is8021xClient){
			if(<%getIndex("rsCertInstall.htm")%>)
				return 1;
		}
		if(isAirtimeDefined){
			if(<%getIndex("airtime.htm")%>)
				return 1;
		}
		return 0;
	}else
		return 1;		
}

function show_topmenu_tcpip(showLanDev)
{
	var subhtml_array = [<%getIndex("tcpiplan.htm");%>,
						<%getIndex("tcpipwan.htm");%>];
	
	var first_show_index = index_of(subhtml_array,1); 

	if(first_show_index == -1){
		if(showLanDev){
			if(<%getIndex("clients.htm");%>)
				return 1;
		}
		return 0;
	}else
		return 1;	
}

function show_topmenu_ipv6(is_mape)
{
	var subhtml_array = [<%getIndex("ipv6_wan.htm");%>,
						<%getIndex("dhcp6s.htm");%>,
						<%getIndex("radvd.htm");%>,
						<%getIndex("tunnel6.htm");%>];
	
	var first_show_index = index_of(subhtml_array,1); 

	if(first_show_index == -1){
		if(is_mape){
			if(<%getIndex("map_e.htm");%>)
				return 1;
		}
		return 0;
	}else
		return 1;	
}

function show_topmenu_firewall(ipv6_enable,route_setup_enable)
{
	var subhtml_array1 = [<%getIndex("macfilter.htm");%>,
						<%getIndex("portfw.htm");%>,
						<%getIndex("urlfilter.htm");%>,
						<%getIndex("dmz.htm");%>,
						<%getIndex("vlan.htm");%>];
	var first_show_index1 = index_of(subhtml_array1,1);
	if(first_show_index1 == -1){
		if(ipv6_enable){
			var subhtml_array2 = [<%getIndex("portfilter6.htm");%>,
								 <%getIndex("ip6filter.htm");%>,
								 <%getIndex("ip6_qos.htm");%>];
			var first_show_index2 = index_of(subhtml_array2,1);
			if(first_show_index2 != -1)
				return 1;
		}else{
			var subhtml_array2 = [<%getIndex("portfilter.htm");%>,
								<%getIndex("ipfilter.htm");%>,
								<%getIndex("ip_qos.htm");%>];
			var first_show_index2 = index_of(subhtml_array2,1);
			if(first_show_index2 != -1)
				return 1;
		}
		if(route_setup_enable){
			if(<%getIndex("route.htm");%>)
				return 1;
		}
		return 0;
	}
	else
		return 1;
}

function show_topmenu_voip(){
	var subhtml_array = [<%getIndex("voip_general.asp");%>,
						<%getIndex("voip_tone.asp");%>,
						<%getIndex("voip_ring.asp");%>,
						<%getIndex("voip_other.asp");%>,
						//<%getIndex("voip_config.asp");%>,
						<%getIndex("voip_network.asp");%>];
	var first_show_index = index_of(subhtml_array,1);
	if(first_show_index == -1)
		return 0;
	else
		return 1;
}

function show_topmenu_mng(isDisplayCPU, isEnableBT,isDisplayTR069)
{
	var subhtml_array = [<%getIndex("status.htm");%>,
						<%getIndex("stats.htm");%>,
						<%getIndex("ddns.htm");%>,
						<%getIndex("ntp.htm");%>,
						<%getIndex("dos.htm");%>,
						<%getIndex("syslog.htm");%>,
						<%getIndex("upload.htm");%>,
						<%getIndex("saveconf.htm");%>];
	var first_show_index = index_of(subhtml_array,1);
	if(first_show_index == -1){
		if(isDisplayCPU){
			if(<%getIndex("cpuShow.htm");%>)
				return 1;
		}
					
		if(isDisplayTR069){
			if(<%getIndex("tr069config.htm");%>)
				return 1;
		}

		if(isEnableBT){
			if(<%getIndex("transmission.htm");%>)
				return 1;
		}
			
		if(userDegreeFlag == 1){
			if(<%getIndex("super_password.htm");%>)
				return 1;
		}
		else{
			if(<%getIndex("password.htm");%>)
				return 1;
		}
		return 0;
	}
	else
		return 1;		
}
function show_topmenu_disk(){
	var subhtml_array = [<%getIndex("diskinfo.htm");%>,
						<%getIndex("accountmng.htm");%>,
						<%getIndex("disksharefolder.htm");%>,
						<%getIndex("diskpartition.htm");%>,
						<%getIndex("diskformat.htm");%>,];
		
	var subnav_array = ["Disk Information",
						"Account Management",
						"Share Folder",
						"Disk Partition",
						"Disk Format"];

	var first_show_index = index_of(subhtml_array,1);
	if(first_show_index != -1){
		return 0;
	}else
		return 1;
}
function init_submenu(submenuId)
{
	if(document.getElementById(submenuId))
	{
		if(document.getElementById(submenuId).click)
		{
			document.getElementById(submenuId).click();
		}
		else
		{
			var evt  = document.createEvent('MouseEvents');
			evt.initEvent('click',true,true);
			document.getElementById(submenuId).dispatchEvent(evt);
		}
	}
}


function init_submenu_wlan(is8021xClient, isMeshDefined, is80211rSupport, isAirtimeDefined)
{

	var subhtml_array1 = [<%getIndex("wlbasic.htm");%>,
						<%getIndex("wladvanced.htm");%>,
						<%getIndex("wlsecurity.htm");%>,
						<%getIndex("wlactrl.htm");%>,
						<%getIndex("wlwds.htm");%>];

	var subnav_array1 = ["Basic Setting",
						"Advanced",
						"Security",
						"Access Control",
						"WDS Setting"];

	var first_show_index1 = index_of(subhtml_array1,1);
	if(first_show_index1== -1){

		if(isMeshDefined){
			if(<%getIndex("wlmesh.htm");%>){
				init_submenu("Mesh Setting");
				return;
			}
		}	
		
		var subhtml_array2 = [<%getIndex("wlsurvey.htm");%>,
							<%getIndex("wlwps.htm");%>,
							<%getIndex("wlsch.htm");%>];
			
				var subnav_array2 = ["Site Survey","WPS","Schedule"];
		var first_show_index2 = index_of(subhtml_array2,1);
		if(first_show_index2 == -1){
				if(is8021xClient){
					if(<%getIndex("rsCertInstall.htm");%>){
						init_submenu("802.1x Cert Install");
						return;
					}
				}
				if(isAirtimeDefined){
					if(<%getIndex("airtime.htm");%>){
						init_submenu("Airtime Fairness");
						return;
					}
				}
				
		}else
			init_submenu(subnav_array2[first_show_index2]);
	}
	else
		init_submenu(subnav_array1[first_show_index1]);
}


function init_submenu_tcpip(showLanDev)
{
	if(<%getIndex("tcpiplan.htm")%> == 0){
		if(showLanDev){
			if(<%getIndex("clients.htm");%>){
				init_submenu("Lan Clients");
				return;
			}
		}
		if(<%getIndex("tcpipwan.htm");%>){
			init_submenu("Wan Setting");
			return;
		}
	}else
		init_submenu("Lan Setting");

}


function init_submenu_ipv6(is_mape)
{
	var subhtml_array = [<%getIndex("ipv6_wan.htm");%>,
						<%getIndex("dhcp6s.htm");%>,
						<%getIndex("radvd.htm");%>,
						<%getIndex("tunnel6.htm");%>];
		
	var subnav_array = ["IPv6 Wan Setting",
						"IPv6 Lan Setting",
						"Radvd",
						"Tunnel (6 over 4)"];

	var first_show_index = index_of(subhtml_array,1);
	if(first_show_index == -1){
		if(is_mape){
			if(<%getIndex("map_e.htm");%>){
				init_submenu("MAP-E");
				return;
			}
		}
	}
	else
		init_submenu(subnav_array[first_show_index]);
  
}

function init_submenu_voip()
{
	var subhtml_array = [<%getIndex("voip_general.asp");%>,
						<%getIndex("voip_tone.asp");%>,
						//<%getIndex("voip_ring.asp");%>,
						<%getIndex("voip_other.asp");%>,
						//<%getIndex("voip_config.asp");%>,
						<%getIndex("voip_network.asp");%>];
		
	var subnav_array = ["General",
						"Tone",
						//"Ring",
						"Other",
						//"Config",
						"Network"];

	var first_show_index = index_of(subhtml_array,1);
	if(first_show_index != -1){
		init_submenu(subnav_array[first_show_index]);
		return;
	}
		

}
function init_submenu_firewall(ipv6_enable,route_setup_enable){
	
	if(ipv6_enable)
	{
		var subhtml_array = [<%getIndex("portfilter6.htm");%>,
							<%getIndex("ip6filter.htm");%>,
							<%getIndex("macfilter.htm");%>,
							<%getIndex("portfw.htm");%>,
							<%getIndex("urlfilter.htm");%>,
							<%getIndex("dmz.htm");%>,
							<%getIndex("vlan.htm");%>];
		
		var subnav_array = ["Port Filtering",
							"IP Filtering",
							"MAC Filtering",
							"Port Forwarding",
							"URL Filtering",
							"DMZ",
							"vlan"];

		var first_show_index = index_of(subhtml_array,1);
		if(first_show_index != -1){
			init_submenu(subnav_array[first_show_index]);
			return;
		}
	}
	else{
		var subhtml_array = [<%getIndex("portfilter.htm");%>,
							<%getIndex("ipfilter.htm");%>,
							<%getIndex("macfilter.htm");%>,
							<%getIndex("portfw.htm");%>,
							<%getIndex("urlfilter.htm");%>,
							<%getIndex("dmz.htm");%>,
							<%getIndex("vlan.htm");%>];
		
		var subnav_array = ["Port Filtering",
							"IP Filtering",
							"MAC Filtering",
							"Port Forwarding",
							"URL Filtering",
							"DMZ",
							"vlan"];

		var first_show_index = index_of(subhtml_array,1);
		if(first_show_index != -1){
			init_submenu(subnav_array[first_show_index]);
			return;
		}
	}
	 if(route_setup_enable){
		if(<%getIndex("route.htm");%>){
			init_submenu("Route Setup");
			return;
		}
	 }

	 if(ipv6_enable){
		if(<%getIndex("ip6_qos.htm");%>){
			init_submenu("Qos");
			return;
		}
	 }else{
		if(<%getIndex("ip_qos.htm");%>){
			init_submenu("Qos");
			return;
		}
	 }
	
}

function init_submenu_mng(isDisplayCPU, isEnableBT,isDisplayTR069)
{
	var subtml_array1 = [<%getIndex("status.htm");%>,
						<%getIndex("stats.htm");%>,
						<%getIndex("ddns.htm");%>];
	var subnav_array1 = ["Status","Statistics","DDNS"];

	var first_show_index1 = index_of(subtml_array1,1); 
	if(first_show_index1 == -1){
		if(isDisplayCPU){
			if(<%getIndex("cpuShow.htm");%>){
				init_submenu("CPU Utilizaiton");
				return;
			}				
		}
		var subtml_array2 = [<%getIndex("ntp.htm");%>,
							<%getIndex("dos.htm");%>];
		var subnav_array2 = ["Time Zone Setting","Deny Of Serivce"];
		var first_show_index2 = index_of(subtml_array2,1); 
		if(first_show_index2 == -1){
			if(isDisplayTR069){
				if(<%getIndex("tr069config.htm");%>){
					init_submenu("TR-069 Config");
					return;
				}
					
			}

			var subtml_array3 = [<%getIndex("syslog.htm");%>,
								<%getIndex("upload.htm");%>,
								 <%getIndex("saveconf.htm");%>];
			var subnav_array3 = ["Log","Upgrade Firmware","Save/Reload Setting"];
			var first_show_index3 = index_of(subtml_array3,1); 
			if(first_show_index3 == -1){
				if(userDegreeFlag == 1){
					if(<%getIndex("super_password.htm");%>){
						init_submenu("Password");
						return;
					}
					
				}else{
					if(<%getIndex("password.htm");%>){
						init_submenu("Password");
						return;
					}
				}
				if(isEnableBT){
					if(<%getIndex("transmission.htm");%>){
						init_submenu("Transmission BT");
						return;
					}
				}

			}
			else
				init_submenu(subnav_array3[first_show_index3]);			
		}
		else
			init_submenu(subnav_array2[first_show_index2]);							
	}
	else
		init_submenu(subnav_array1[first_show_index1]);	 		

}

function init_submenu_disk()
{
	var subhtml_array = [<%getIndex("diskinfo.htm");%>,
						<%getIndex("accountmng.htm");%>,
						<%getIndex("disksharefolder.htm");%>,
						<%getIndex("diskpartition.htm");%>,
						<%getIndex("diskformat.htm");%>,];
		
	var subnav_array = ["Disk Information",
						"Account Management",
						"Share Folder",
						"Disk Partition",
						"Disk Format"];

	var first_show_index = index_of(subhtml_array,1);
	if(first_show_index != -1){
		init_submenu(subnav_array[first_show_index]);
		return;
	}
  
}

/*draw_topnav*/
function draw_topnav(wlan_num,ipv6,isDisplayVOIP,userDegreeFlag,is8021xClient, isMeshDefined, is80211rSupport, isAirtimeDefined,
                           showLanDev,is_mape,route_setup_enable,
                           isDisplayCPU,isEnableBT,isDisplayTR069, disk_onoff)
{
  add_topMenuItem("sub_menu_setup.htm","<% multilang("Setup"); %>"); 
  if(userDegreeFlag != 0){
    if(<%getIndex("sub_menu_wlan_support");%> != 0)
    {
		if(<%getIndex("sub_menu_wlan.htm");%>){
			if(show_topmenu_wlan(is8021xClient, isMeshDefined, is80211rSupport, isAirtimeDefined)){
				add_topMenuItem(get_form("sub_menu_wlan.htm",0),"<% multilang("wlan1"); %>");
	 			if(wlan_num==2)
	  				add_topMenuItem(get_form("sub_menu_wlan.htm",1),"<% multilang("wlan2"); %>");
			}	
		}
    }

	if(<%getIndex("sub_menu_tcpip.htm");%>){
		if(show_topmenu_tcpip(showLanDev)){
			add_topMenuItem("sub_menu_tcpip.htm","<% multilang("TCP/IP"); %>");
		}
	}

	if(ipv6){
		if(<%getIndex("sub_menu_ipv6.htm");%>)
			if(show_topmenu_ipv6(is_mape))
				add_topMenuItem("sub_menu_ipv6.htm","<% multilang("IPv6"); %>");
	}

	if (<%getInfo("show_firewall_all")%>) {
		if(<%getIndex("sub_menu_firewall.htm");%>){
			if(show_topmenu_firewall(ipv6,route_setup_enable))
				add_topMenuItem("sub_menu_firewall.htm","<% multilang("Firewall"); %>");
		}
	}
	if(isDisplayVOIP){
		if(<%getIndex("sub_menu_voip.htm");%>)
			if(show_topmenu_voip())
				add_topMenuItem("sub_menu_voip.htm","<% multilang("VoIP"); %>");
	}	
	
	if(<%getIndex("sub_menu_mng.htm");%>){
		if(show_topmenu_mng(isDisplayCPU,isEnableBT,isDisplayTR069))
			add_topMenuItem("sub_menu_mng.htm","<% multilang("Management"); %>");
	}
	
	if (disk_onoff){
		if(<%getIndex("sub_menu_disk_mng.htm");%>){
			if(show_topmenu_disk())
				add_topMenuItem("sub_menu_disk_mng.htm","<% multilang("Storage"); %>");
		}
	 }
	
	
  }
  else{
     if(<%getIndex("sub_menu_wlan_support");%> != 0)
		add_topMenuItem(get_form("sub_menu_wlan.htm",0),"<% multilang("wlan1"); %>");
 	 if(wlan_num==2)
  		add_topMenuItem(get_form("sub_menu_wlan.htm",1),"<% multilang("wlan2"); %>");
  	 add_topMenuItem("sub_menu_tcpip.htm","<% multilang("TCP/IP"); %>");
 	 if(ipv6)
  		add_topMenuItem("sub_menu_ipv6.htm","<% multilang("IPv6"); %>");
	 if (<%getInfo("show_firewall_all")%>) {
  	 	add_topMenuItem("sub_menu_firewall.htm","<% multilang("Firewall"); %>");
	 }
  	 if( isDisplayVOIP)
  		add_topMenuItem("sub_menu_voip.htm","<% multilang("VoIP"); %>");
  	 add_topMenuItem("sub_menu_mng.htm","<% multilang("Management"); %>");
	 if (disk_onoff)
  		add_topMenuItem("sub_menu_disk_mng.htm","<% multilang("Storage"); %>");

  }
  
  init_submenu("<% multilang("Setup"); %>");
  	
}

function draw_subnav_head()
{
	document.write("<table id=\"topnav_container\" border=\"0\" cellspacing=\"1\" summary=\"\">");
	document.write("<tbody>");
	document.write("<tr height=\"34\">");
	document.write("<td class=\"topHeaderMenu\">");
	document.write("<div id=\"topHeaderId\"></div>");
	document.write("</td></tr>");
}

function draw_subnav_tail()
{
	document.write("<tr><td class=\"subMenuDummy\"></td></tr>");
	document.write("</tbody></table>");
}

function draw_subnav_setup(multiple_wan_enable,OneWanSptUnderMtl,userDegreeFlag)
{
  if (<%getInfo("show_opmode_menu")%>==1) {
	  if(!multiple_wan_enable){
		  if(userDegreeFlag != 0){
			show_subnav_element("opmode.htm","<% multilang("Operation Mode"); %>",<%getIndex("opmode.htm")%>); 
		  }else
		  	add_subMenuItem("opmode.htm","<% multilang("Operation Mode"); %>");   
	  }
  } else if(<%getInfo("show_opmode_menu")%>==2) { // ulinker
	  if(!multiple_wan_enable){	  	
		  if(userDegreeFlag != 0){		  	
			show_subnav_element("ulinker_opmode.htm","<% multilang("ULinker Operation Mode"); %>",<%getIndex("ulinker_opmode.htm")%>); 		  	
		  }else
		  	add_subMenuItem("ulinker_opmode.htm","<% multilang("ULinker Operation Mode"); %>"); 
	  	}  
 }   
  add_subMenuItem("wizard.htm","<% multilang("Wizard"); %>");
  add_subMenuItem("create_your_firmware.htm","<% multilang("Create Your Firmware"); %>");
  
  init_submenu("<% multilang("Operation Mode"); %>");
}

function draw_subnav_wlan(is8021xClient, isMeshDefined, is80211rSupport, isAirtimeDefined,userDegreeFlag)
{
	if(userDegreeFlag != 0){
		show_subnav_element("wlbasic.htm","<% multilang("Basic Setting"); %>",<%getIndex("wlbasic.htm")%>);
 		show_subnav_element("wladvanced.htm","<% multilang("Advanced"); %>",<%getIndex("wladvanced.htm")%>);
  		show_subnav_element("wlsecurity.htm","<% multilang("Security"); %>",<%getIndex("wlsecurity.htm")%>);
  		show_subnav_element("wlactrl.htm","<% multilang("Access Control"); %>",<%getIndex("wlactrl.htm")%>);
  		show_subnav_element("wlwds.htm","<% multilang("WDS Setting"); %>",<%getIndex("wlwds.htm")%>);
		if(isMeshDefined==1)
	  		show_subnav_element("wlmesh.htm","<% multilang("Mesh Setting"); %>",<%getIndex("wlmesh.htm")%>);  
  		show_subnav_element("wlsurvey.htm","<% multilang("Site Survey"); %>",<%getIndex("wlsurvey.htm")%>);
  		show_subnav_element("wlwps.htm","<% multilang("WPS"); %>",<%getIndex("wlwps.htm")%>);
  		show_subnav_element("wlsch.htm","<% multilang("Schedule"); %>",<%getIndex("wlsch.htm")%>);
		if(is8021xClient==1)
     		show_subnav_element("rsCertInstall.htm","<% multilang("802.1x Cert Install"); %>",<%getIndex("rsCertInstall.htm")%>);
 		if(isAirtimeDefined==1)
   			show_subnav_element("airtime.htm","<% multilang("Airtime Fairness"); %>",<%getIndex("airtime.htm")%>);
		init_submenu_wlan(is8021xClient,isMeshDefined,is80211rSupport,isAirtimeDefined);
	}else{
		add_subMenuItem("wlbasic.htm","<% multilang("Basic Setting"); %>");
        add_subMenuItem("wlsecurity.htm","<% multilang("Security"); %>");
  		add_subMenuItem("wladvanced.htm","<% multilang("Advanced"); %>");  	
        add_subMenuItem("wlwps.htm","<% multilang("WPS"); %>");
        add_subMenuItem("wlwds.htm","<% multilang("WDS Setting"); %>");
  		add_subMenuItem("wlactrl.htm","<% multilang("Access Control"); %>");  		
 		if(isMeshDefined==1)
	  		add_subMenuItem("wlmesh.htm","<% multilang("Mesh Setting"); %>");  
        add_subMenuItem("wlsch.htm","<% multilang("Schedule"); %>");
  		add_subMenuItem("wlsurvey.htm","<% multilang("Site Survey"); %>");  		
  		
  		if(is8021xClient==1)
     		add_subMenuItem("rsCertInstall.htm","<% multilang("802.1x Cert Install"); %>");
 		 if(isAirtimeDefined==1)
   		 add_subMenuItem("airtime.htm","<% multilang("Airtime Fairness"); %>");
		 init_submenu("<% multilang("Basic Setting"); %>");
	}
}
  

function draw_subnav_tcpip(multiple_wan_enable,showLanDev,userDegreeFlag)
{
	if(userDegreeFlag != 0){
		show_subnav_element("tcpiplan.htm","<% multilang("Lan Setting"); %>",<%getIndex("tcpiplan.htm")%>);
		if(showLanDev==1)
			show_subnav_element("clients.htm","<% multilang("Lan Clients"); %>",<%getIndex("clients.htm")%>);
		if (<%getInfo("show_tcpip_wan")%>) {
			show_subnav_element("tcpipwan.htm","<% multilang("Wan Setting"); %>",<%getIndex("tcpipwan.htm")%>);
		}

		init_submenu_tcpip(showLanDev);
	}else{		
  		if(showLanDev==1)
  			add_subMenuItem("clients.htm","<% multilang("Lan Clients"); %>"); 
		if (<%getInfo("show_tcpip_wan")%>) {
			if(multiple_wan_enable)
			  	add_subMenuItem("tcpip_multiwanlist.htm","<% multilang("Wan Setting"); %>");
			 else
		  		add_subMenuItem("tcpipwan.htm","<% multilang("Wan Setting"); %>");
		}
        add_subMenuItem("tcpiplan.htm","<% multilang("Lan Setting"); %>");
		init_submenu("<% multilang("Lan Setting"); %>");	
	}
  
}

function draw_subnav_ipv6(is_mape,is_radvd_wan,userDegreeFlag)
{
	if(userDegreeFlag != 0){
		show_subnav_element("ipv6_wan.htm","<% multilang("IPv6 Wan Setting"); %>",<%getIndex("ipv6_wan.htm")%>);
  		show_subnav_element("dhcp6s.htm","<% multilang("IPv6 Lan Setting"); %>",<%getIndex("dhcp6s.htm")%>);
  		show_subnav_element("radvd.htm","<% multilang("Radvd"); %>",<%getIndex("radvd.htm")%>);
		if(is_radvd_wan)
			show_subnav_element("radvd_wan.htm","<% multilang("Wan Radvd"); %>",<%getIndex("radvd_wan.htm")%>);
  		show_subnav_element("tunnel6.htm","<% multilang("Tunnel (6 over 4)"); %>",<%getIndex("tunnel6.htm")%>);
		if(is_mape)
  			show_subnav_element("map_e.htm","MAP-E",<%getIndex("map_e.htm")%>);
		
		init_submenu_ipv6(is_mape);
	}else{
		add_subMenuItem("ipv6_wan.htm","<% multilang("IPv6 Wan Setting"); %>");
  		add_subMenuItem("dhcp6s.htm","<% multilang("IPv6 Lan Setting"); %>");
  		add_subMenuItem("radvd.htm","<% multilang("Radvd"); %>");
		if(is_radvd_wan)
			add_subMenuItem("radvd_wan.htm","<% multilang("Radvd wan"); %>");
  		add_subMenuItem("tunnel6.htm","<% multilang("Tunnel (6 over 4)"); %>");
  		if(is_mape)
  			add_subMenuItem("map_e.htm","<% multilang("MAP-E"); %>");
		
		init_submenu("<% multilang("IPv6 Wan Setting"); %>");
	}
  
}
function draw_subnav_firewall(ipv6_enable, route_setup_enable,userDegreeFlag)
{
	if (<%getInfo("show_firewall_all")%>) {
		if(userDegreeFlag != 0){
			if(ipv6_enable)
			{
				show_subnav_element("portfilter6.htm","<% multilang("Port Filtering"); %>",<%getIndex("portfilter6.htm");%>);
				show_subnav_element("ip6filter.htm","<% multilang("IP Filtering"); %>",<%getIndex("ip6filter.htm");%>);
			}
			else
			{
		 	 	show_subnav_element("portfilter.htm","<% multilang("Port Filtering"); %>",<%getIndex("portfilter.htm");%>);
		  		show_subnav_element("ipfilter.htm","<% multilang("IP Filtering"); %>",<%getIndex("ipfilter.htm");%>);
			}
		 	show_subnav_element("macfilter.htm","<% multilang("MAC Filtering"); %>",<%getIndex("macfilter.htm");%>);
		  	show_subnav_element("portfw.htm","<% multilang("Port Forwarding"); %>",<%getIndex("portfw.htm");%>);
		  	show_subnav_element("urlfilter.htm","<% multilang("URL Filtering"); %>",<%getIndex("urlfilter.htm");%>);
		  	show_subnav_element("dmz.htm","<% multilang("DMZ"); %>",<%getIndex("dmz.htm");%>);
			//if(<%getIndex("rtk_vlan_support");%>)
				//show_subnav_element("vlan.htm","vlan",<%getIndex("vlan.htm");%>);
			if(<%getIndex("linux_vlan_support");%>)
				show_subnav_element("8021q_vlan.htm","<% multilang("802.1Q VLAN"); %>",<%getIndex("8021q_vlan.htm");%>);
			if(route_setup_enable)
		  		show_subnav_element("route.htm","<% multilang("Route Setup"); %>",<%getIndex("route.htm");%>);
		  	if(ipv6_enable)
		  		show_subnav_element("ip6_qos.htm","<% multilang("QoS"); %>",<%getIndex("ip6_qos.htm");%>);
		 	 else
		  		show_subnav_element("ip_qos.htm","<% multilang("QoS"); %>",<%getIndex("ip_qos.htm");%>);

			init_submenu_firewall(ipv6_enable,route_setup_enable);
		}
		else{
			if(ipv6_enable)
			{
				add_subMenuItem("portfilter6.htm","<% multilang("Port Filtering"); %>");
				add_subMenuItem("ip6filter.htm","<% multilang("IP Filtering"); %>");
			}
			else
			{
		 	 	add_subMenuItem("portfilter.htm","<% multilang("Port Filtering"); %>");
		 	 	add_subMenuItem("ipfilter.htm","<% multilang("IP Filtering"); %>");
			}
		 		add_subMenuItem("macfilter.htm","<% multilang("MAC Filtering"); %>");
		  		add_subMenuItem("portfw.htm","<% multilang("Port Forwarding"); %>");
		  		add_subMenuItem("urlfilter.htm","<% multilang("URL Filtering"); %>");
		  		add_subMenuItem("dmz.htm","<% multilang("DMZ"); %>");
		  		
			//if(<%getIndex("rtk_vlan_support");%>)
				//add_subMenuItem("vlan.htm","vlan");
			if(<%getIndex("linux_vlan_support");%>)
				add_subMenuItem("8021q_vlan.htm","<% multilang("802.1Q VLAN"); %>");
		  
		 	if(route_setup_enable)
		  		add_subMenuItem("route.htm","<% multilang("Route Setup"); %>");
		
		  	if(ipv6_enable)
		  		add_subMenuItem("ip6_qos.htm","<% multilang("QoS"); %>");
		 	else
		  		add_subMenuItem("ip_qos.htm","<% multilang("QoS"); %>");
			if(<%getIndex("snmp_support")%>)
				add_subMenuItem("snmp.htm","<% multilang("SNMP"); %>");

		  	init_submenu("<% multilang("Port Filtering"); %>");
		}
	}
}

function draw_subnav_voip(userDegreeFlag)
{
	/*if(userDegreeFlag != 0){
		show_subnav_element("voip_general.asp","General",<%getIndex("voip_general.asp");%>);
 		show_subnav_element("voip_tone.asp","Tone",<%getIndex("voip_tone.asp");%>);
  		show_subnav_element("voip_ring.asp","Ring",<%getIndex("voip_ring.asp");%>);
 		show_subnav_element("voip_other.asp","Other",<%getIndex("voip_other.asp");%>);
  		show_subnav_element("voip_config.asp","Config",<%getIndex("voip_config.asp");%>);
  		show_subnav_element("voip_network.asp","Network",<%getIndex("voip_network.asp");%>);

		init_submenu_voip();
	}else
	*/
	{
		<% getInfo("voip_menu_new"); %>
 		add_subMenuItem("voip_tone.asp","<% multilang("Tone"); %>");
  		//add_subMenuItem("voip_ring.asp","Ring");
 		add_subMenuItem("voip_other.asp","<% multilang("Other"); %>");
  		//add_subMenuItem("voip_config.asp","Config");
  		add_subMenuItem("voip_network.asp","<% multilang("Network"); %>");
		init_submenu(<%getInfo("voip_submenu_1");%>);
	}
}

function draw_subnav_mng(isDisplayCPU, isEnableBT,isDisplayTR069,isDisplayOpenvpn,userDegreeFlag,supportSuperUser,supportDiagnostic,isSupportWeave,isSupportZigBee)
{
	if(userDegreeFlag != 0){
		show_subnav_element("status.htm","<% multilang("Status"); %>",<%getIndex("status.htm");%>);
		show_subnav_element("stats.htm","<% multilang("Statistics"); %>",<%getIndex("stats.htm");%>);
		if (<%getInfo("show_mgt_ddns")%>) {
			show_subnav_element("ddns.htm","<% multilang("DDNS"); %>",<%getIndex("ddns.htm");%>);
		}
		if(isDisplayCPU == 1)
  			show_subnav_element("cpuShow.htm","<% multilang("CPU Utilizaiton"); %>",<%getIndex("cpuShow.htm");%>);
		if (<%getInfo("show_mgt_ntp")%>) {
			show_subnav_element("ntp.htm","<% multilang("Time Zone Setting"); %>",<%getIndex("ntp.htm");%>);
		}
		if (<%getInfo("show_mgt_dos")%>) {
			show_subnav_element("dos.htm","<% multilang("Deny Of Serivce"); %>",<%getIndex("dos.htm");%>);    
		}
    	if(isDisplayTR069 == 1)
  			show_subnav_element("tr069config.htm","<% multilang("TR-069 Config"); %>",<%getIndex("tr069config.htm");%>);  
   		show_subnav_element("syslog.htm","<% multilang("Log"); %>",<%getIndex("syslog.htm");%>);
    	show_subnav_element("upload.htm","<% multilang("Upgrade Firmware"); %>",<%getIndex("upload.htm");%>);
    	show_subnav_element("saveconf.htm","<% multilang("Save/Reload Setting"); %>",<%getIndex("saveconf.htm");%>);
  		if(userDegreeFlag == 1)
 	 		show_subnav_element("super_password.htm","<% multilang("Password"); %>",<%getIndex("super_password.htm");%>);
  		else
 			show_subnav_element("password.htm","<% multilang("Password"); %>",<%getIndex("password.htm");%>); 
		if(isEnableBT == 1)
  			show_subnav_element("transmission.htm","<% multilang("Transmission BT"); %>",<%getIndex("transmission.htm");%>);

		init_submenu_mng(isDisplayCPU, isEnableBT,isDisplayTR069);
	}
	else{
		add_subMenuItem("status.htm","<% multilang("Status"); %>");
  		add_subMenuItem("stats.htm","<% multilang("Statistics"); %>");
		if (<%getInfo("show_mgt_ddns")%>) {
  			add_subMenuItem("ddns.htm","<% multilang("DDNS"); %>");
		}
  		if(isDisplayCPU == 1)
  			add_subMenuItem("cpuShow.htm","<% multilang("CPU Utilizaiton"); %>");
		if (<%getInfo("show_mgt_ntp")%>) {
  			add_subMenuItem("ntp.htm","<% multilang("Time Zone Setting"); %>");
		}
		if (<%getInfo("show_mgt_dos")%>) {
  			add_subMenuItem("dos.htm","<% multilang("Deny Of Serivce"); %>");
		}
  		if(isDisplayTR069 == 1)
  			add_subMenuItem("tr069config.htm","<% multilang("TR-069 Config"); %>");
  		add_subMenuItem("syslog.htm","<% multilang("Log"); %>");
  		add_subMenuItem("upload.htm","<% multilang("Upgrade Firmware"); %>");
  		add_subMenuItem("saveconf.htm","<% multilang("Save/Reload Setting"); %>");
		if(supportSuperUser)
			add_subMenuItem("super_password.htm","<% multilang("Password"); %>");
		else
  			add_subMenuItem("password.htm","<% multilang("Password"); %>");
		
  		if(isEnableBT == 1)
  			add_subMenuItem("transmission.htm","<% multilang("Transmission BT"); %>");
		if(isSupportWeave==1)
  			add_subMenuItem("weave.htm","<% multilang("Weave setting"); %>");
		if(isSupportZigBee==1)
  			add_subMenuItem("zigbee.htm","<% multilang("ZigBee Management"); %>");
		if(isDisplayOpenvpn == 1)
  			add_subMenuItem("openvpn.htm","<% multilang("OpenVPN Setting"); %>");
  		if(supportDiagnostic == 1)
  			add_subMenuItem("diagnostic.htm","<% multilang("System Diagnostic"); %>");

 		init_submenu("<% multilang("Status"); %>");
	}
    add_subMenuItem("logout.htm","<% multilang("Logout"); %>");
}
 
function draw_subnav_disk(userDegreeFlag)
{
	if(userDegreeFlag != 0){
		show_subnav_element("diskinfo.htm","<% multilang("Disk Information"); %>",<%getIndex("diskinfo.htm");%>);
		show_subnav_element("accountmng.htm","<% multilang("Account Management"); %>",<%getIndex("accountmng.htm");%>);
		show_subnav_element("disksharefolder.htm","<% multilang("Share Folder"); %>",<%getIndex("disksharefolder.htm");%>);
		show_subnav_element("diskpartition.htm","<% multilang("Disk Partition"); %>",<%getIndex("diskpartition.htm");%>);
		show_subnav_element("diskformat.htm","<% multilang("Disk Format"); %>",<%getIndex("diskformat.htm");%>);
		init_submenu_disk();
	}else{
		add_subMenuItem("diskinfo.htm","<% multilang("Disk Information"); %>");
  		add_subMenuItem("accountmng.htm","<% multilang("Account Management"); %>");
  		add_subMenuItem("disksharefolder.htm","<% multilang("Share Folder"); %>");
 		add_subMenuItem("diskpartition.htm","<% multilang("Disk Partition"); %>");
  		add_subMenuItem("diskformat.htm","<% multilang("Disk Format"); %>");
		init_submenu("<% multilang("Disk Information"); %>");
	}
 

}

function has_class(element, class_name)
{
        if (!element.className) {
                element.className = "";
                return false;
        }

        var regex = new RegExp("(^|\\s)\\s*" + class_name + "\\s*(\\s|$)");
        return regex.test(element.className);
}
/*add_class()*/
function add_class(element, class_name)
{
        if (has_class(element, class_name)) {
                return;
        }
        element.className += (element.className == "" ? "" : " ") + class_name;
}

/*remove_class()*/
function remove_class(element, class_name)
{
        if (!element.className) {
                element.className = "";
                return;
        }

        /*
         * This regex is similar to \bclassName\b, except that \b does not
         * treat certain legal CSS characters as "word characters": notably,
         * the . and - characters.
         */
        var regex = new RegExp("(^|\\s)\\s*" + class_name + "\\s*(\\s|$)");
        element.className = element.className.replace(regex, "$1$2");
}
/*on_click_menu(this)*/
function on_click_menu(element)
{
  var items = document.getElementsByTagName("a");
  for (var i = 0; i < items.length; i++) {
        var item = items[i];
        remove_class(item.parentNode, "topnavon");
        add_class(item.parentNode, "topnavoff");
  }
  remove_class(element.parentNode, "topnavoff");
  add_class(element.parentNode, "topnavon"); 
}
