"use strict";angular.module("app.config",[]).constant("pageList",{adBlock:{ctrl:"AdBlockCtrl",perms:{"Device.Services.AdBlock.":"RW","Device.USB.Storage.":"R"},view:"/apps/admin/pages/adblock/page.tpl.html",html:["/apps/admin/pages/adblock/page.tpl.html"],lazyDeps:["/apps/admin/pages/adblock/ctrl.lazy.js"]},dmz:{ctrl:"DmzCtrl",perms:{"Device.Firewall.IPv4.Rules.":"RW","Device.Network.Settings.TwinIP.":"RW"},view:"/apps/admin/pages/dmz/page.tpl.html",html:["/apps/admin/pages/dmz/page.tpl.html"],lazyDeps:["/apps/admin/pages/dmz/ctrl.lazy.js"]},dns:{ctrl:"DnsCtrl",perms:{"Device.Network.Server.DHCP.":"RW","Device.Network.DNS.After.":"RW","Device.Network.Connection.":"R","Device.Network.Group.":"R","Device.USB.Connection.":"R"},view:"/apps/admin/pages/dns/page.tpl.html",html:["/apps/admin/pages/dns/page.tpl.html"],lazyDeps:["/apps/admin/pages/dns/ctrl.lazy.js"]},upnp:{ctrl:"dynPortMappingCtrl",perms:{"Device.Network.Group.":"R","Device.DeviceInfo.":"R","Device.Services.DynamicPortMapping.":"RW"},view:"/apps/admin/pages/dynamicPortMapping/page.tpl.html",html:["/apps/admin/pages/dynamicPortMapping/page.tpl.html"],lazyDeps:["/apps/admin/pages/dynamicPortMapping/ctrl.js"]},error:{ctrl:"ErrorCtrl",perms:{},template:'<div class="nw-empty-page-state-container">                        <div class="nw-empty-page-state-image-error"></div>                        <div class="nw-empty-page-state-title">                            {{code | translate}}                        </div>                        <div class="nw-empty-page-state-subtitle">                            {{message | translate}}                        </div>                        <div class="nw-empty-page-state-buttons-panel">                            <button type="button" class="colored" ng-click="refresh()">                                {{\'refresh_page\' | translate}}                            </button>                        </div>                    </div>'},home:{ctrl:"HomeCtrl",perms:{},view:"/apps/admin/pages/hq_home/page.tpl.html",html:["/apps/admin/pages/hq_home/page.tpl.html"],lazyDeps:["/apps/admin/pages/hq_home/ctrl.lazy.js"]},igmp:{ctrl:"igmpCtrl",perms:{"Device.Firewall.IPv4.Rules.":"RW","Device.Network.Settings.":"R","Device.Services.IGMPX.":"RW","Device.Services.Udpxy.":"R","Device.DeviceInfo.DeviceMode":"R"},view:"/apps/admin/pages/igmp/page.tpl.html",html:["/apps/admin/pages/igmp/page.tpl.html"],lazyDeps:["/apps/admin/pages/igmp/ctrl.lazy.js"]},macfilter:{ctrl:"MacFilterCtrl",perms:{"Device.Firewall.IPv4.":"RW"},view:"/apps/admin/pages/macfilter/page.tpl.html",html:["/apps/admin/pages/macfilter/page.tpl.html"],lazyDeps:["/apps/admin/pages/macfilter/ctrl.lazy.js"]},misc:{ctrl:"MiscCtrl",perms:{"Device.Network.Settings.Passthrough.":"RW","Device.Network.Settings.SIP.":"RW","Device.Network.Settings.RTSP.":"RW","Device.Firewall.IPv4.":"RW"},view:"/apps/admin/pages/misc/page.tpl.html",html:["/apps/admin/pages/misc/page.tpl.html"],lazyDeps:["/apps/admin/pages/misc/ctrl.lazy.js"]},notice:{ctrl:"NoticeCtrl",perms:{},view:"/apps/admin/pages/notice/page.tpl.html",html:["/apps/admin/pages/notice/page.tpl.html"]},ports:{ctrl:"PortsCtrl",perms:{"Device.Switch.*.Ports.":"R"},view:"/apps/admin/pages/ports/page.tpl.html",html:["/apps/admin/pages/ports/page.tpl.html"],lazyDeps:["/apps/admin/pages/ports/ctrl.lazy.js"]},raccess:{ctrl:"RemoteAccessCtrl",perms:{"Device.Network.":"R","Device.Services.Transmission.":"R","Device.Firewall.":"RW","Device.Services.FTP.":"R","Device.Services.Telnet.":"R","Device.Services.Domoticz.":"R","Device.Services.SSH.":"R","Device.USB.Modem.":"R"},view:"/apps/admin/pages/raccess/page.tpl.html",html:["/apps/admin/pages/raccess/page.tpl.html"],lazyDeps:["/apps/admin/pages/raccess/ctrl.lazy.js"]},redirect:{ctrl:"RedirectCtrl",perms:{"Device.Services.Redirect.":"RW"},view:"/apps/admin/pages/redirect/page.tpl.html",html:["/apps/admin/pages/redirect/page.tpl.html"],lazyDeps:["/apps/admin/pages/redirect/ctrl.lazy.js"]},routing:{ctrl:"RoutingCtrl",perms:{"Device.Routing.":"RW","Device.Network.":"R"},view:"/apps/admin/pages/routing/page.tpl.html",html:["/apps/admin/pages/routing/page.tpl.html"],lazyDeps:["/apps/admin/pages/routing/ctrl.lazy.js"]},schedule:{ctrl:"ScheduleCtrl",perms:{"Device.System.Scheduler.":"RW","Device.System.Command.":"RW","Device.Firewall.IPv4.":"R","Device.Firewall.IPv6.":"R"},view:"/apps/admin/pages/schedule/page.tpl.html",html:["/apps/admin/pages/schedule/page.tpl.html"],lazyDeps:["/apps/admin/pages/schedule/ctrl.lazy.js"]},summary:{ctrl:"SummaryCtrl",perms:{"Device.Network.Server.DHCP.":"R"},view:"/apps/admin/pages/summary/page.tpl.html",html:["/apps/admin/pages/summary/page.tpl.html"],lazyDeps:["/apps/admin/pages/summary/ctrl.lazy.js"]},tr69:{ctrl:"Tr69Ctrl",perms:{"Device.Services.TR069.":"RW","Device.Network.Connection.":"R","Device.Network.Interface.":"R"},view:"/apps/admin/pages/tr69/page.tpl.html",html:["/apps/admin/pages/tr69/page.tpl.html"],lazyDeps:["/apps/admin/pages/tr69/ctrl.lazy.js"]},urlfilter:{ctrl:"UrlFilterCtrl",perms:{"Device.Firewall.":"RW"},view:"/apps/admin/pages/urlfilter/page.tpl.html",html:["/apps/admin/pages/urlfilter/page.tpl.html"],lazyDeps:["/apps/admin/pages/urlfilter/ctrl.lazy.js","/apps/admin/pages/urlfilter/list/ctrl.lazy.js","/apps/admin/pages/urlfilter/form/ctrl.lazy.js"]},vlan:{ctrl:"VlanCtrl",perms:{"Device.Switch.Ports.":"R","Device.Network.Interface.":"RW","Device.DeviceInfo.DeviceMode":"R"},view:"/apps/admin/pages/vlan_dsysinit/page.tpl.html",html:["/apps/admin/pages/vlan_dsysinit/page.tpl.html"],lazyDeps:["/apps/admin/pages/vlan_dsysinit/ctrl.lazy.js","/apps/admin/pages/vlan_dsysinit/list/ctrl.lazy.js","/apps/admin/pages/vlan_dsysinit/form/ctrl.lazy.js"]},wanReserv:{ctrl:"WanReservCtrl",perms:{"Device.Network.ConnectivityCheck.":"RW","Device.Network.Connection.":"R","Device.Network.Group.":"R","Device.USB.Connection.":"R"},view:"/apps/admin/pages/wanreserv_dsysinit/page.tpl.html",html:["/apps/admin/pages/wanreserv_dsysinit/page.tpl.html"],lazyDeps:["/apps/admin/pages/wanreserv_dsysinit/ctrl.lazy.js"]},ddnsInfo:{ctrl:"DdnsCtrl",perms:{"Device.Services.DDNS.":"RW","Device.Services.Anweb.":"R","Device.Network.Interface.":"R","Device.Network.Connection.":"R","Device.Network.Group.":"R"},view:"/apps/admin/pages/ddns/info/page.tpl.html",html:["/apps/admin/pages/ddns/info/page.tpl.html"],lazyDeps:["/apps/admin/pages/ddns/info/ctrl.lazy.js"]},ddnsRule:{ctrl:"DdnsRuleCtrl",perms:{},view:"/apps/admin/pages/ddns/rule/page.tpl.html",html:["/apps/admin/pages/ddns/rule/page.tpl.html"],lazyDeps:["/apps/admin/pages/ddns/rule/ctrl.lazy.js"]},upnpRule:{ctrl:"dynPortMappingRuleCtrl",perms:{},view:"/apps/admin/pages/dynamicPortMapping/rule/page.tpl.html",html:["/apps/admin/pages/dynamicPortMapping/rule/page.tpl.html"],lazyDeps:[]},ipfilterInfo:{ctrl:"IPFilterInfoCtrl",perms:{"Device.Firewall.Rules.CTState.":"RW","Device.Firewall.IPv4.":"RW","Device.Firewall.IPv6.":"RW"},view:"/apps/admin/pages/ipfilter/info/page.tpl.html",html:["/apps/admin/pages/ipfilter/info/page.tpl.html"],lazyDeps:["/apps/admin/pages/ipfilter/info/ctrl.lazy.js"]},ipfilterRule:{ctrl:"IPFilterRuleCtrl",perms:{},view:"/apps/admin/pages/ipfilter/rule/page.tpl.html",html:["/apps/admin/pages/ipfilter/rule/page.tpl.html"],lazyDeps:["/apps/admin/pages/ipfilter/rule/ctrl.lazy.js"]},ipsecInfo:{ctrl:"IPsecInfoCtrl",perms:{"Device.Services.IPsec.":"RW","Device.Network.Connection.IPsec.":"RW","Device.Firewall.IPv4.":"RW","Device.Network.Group.":"RW","Device.Network.Connection.":"R","Device.DeviceInfo.DeviceMode":"R"},view:"/apps/admin/pages/ipsec/info/page.tpl.html",html:["/apps/admin/pages/ipsec/info/page.tpl.html"],lazyDeps:["/apps/admin/pages/ipsec/info/ctrl.lazy.js"]},ipsecRule:{ctrl:"IPsecRuleCtrl",perms:{},view:"/apps/admin/pages/ipsec/rule/page.tpl.html",html:["/apps/admin/pages/ipsec/rule/page.tpl.html"],lazyDeps:["/apps/admin/pages/ipsec/rule/ctrl.lazy.js"]},lanList:{ctrl:"LanListCtrl",perms:{"Device.Network.Group.":"RW","Device.Network.Interface.":"RW","Device.Network.Connection.Static.":"RW","Device.Network.Connection.DHCP.":"RW","Device.Network.Connection.Staticv6.":"RW","Device.Network.Connection.DHCPv6.":"RW","Device.Network.IP.":"RW"},view:"/apps/admin/pages/lan/list/page.tpl.html",html:["/apps/admin/pages/lan/list/page.tpl.html"],lazyDeps:["/apps/admin/pages/lan/list/ctrl.lazy.js"]},lanEdit:{ctrl:"LanEditCtrl",perms:{},view:"/apps/admin/pages/lan/edit/page.tpl.html",html:["/apps/admin/pages/lan/edit/page.tpl.html"],lazyDeps:["/apps/admin/pages/lan/edit/ctrl.lazy.js"]},lanEditIPv6:{ctrl:"LanEditIPv6Ctrl",perms:{},view:"/apps/admin/pages/lan/edit_ipv6/page.tpl.html",html:["/apps/admin/pages/lan/edit_ipv6/page.tpl.html"],lazyDeps:["/apps/admin/pages/lan/edit_ipv6/ctrl.lazy.js"]},statsClientsSessions:{ctrl:"clientSessionsStatsCtrl",perms:{"Device.Statistics.Sessions.":"R"},view:"/apps/admin/pages/stats/clientsSessions/page.tpl.html",html:["/apps/admin/pages/stats/clientsSessions/page.tpl.html"],lazyDeps:["/apps/admin/pages/stats/clientsSessions/ctrl.lazy.js","/apps/admin/pages/stats/clientsSessions/session.ctrl.lazy.js"]},statsClientsSessionsInfo:{ctrl:"clientsSessionStatsInfoCtrl",perms:{},view:"/apps/admin/pages/stats/clientsSessions/session.page.tpl.html",html:["/apps/admin/pages/stats/clientsSessions/session.page.tpl.html"],lazyDeps:["/apps/admin/pages/stats/clientsSessions/ctrl.lazy.js","/apps/admin/pages/stats/clientsSessions/session.ctrl.lazy.js"]},statsDhcp:{ctrl:"dhcpStatsCtrl",perms:{"Device.Network.Server.":"R","Device.Hostnames.":"R"},view:"/apps/admin/pages/stats/dhcp/page.tpl.html",html:["/apps/admin/pages/stats/dhcp/page.tpl.html"],lazyDeps:["/apps/admin/pages/stats/dhcp/ctrl.lazy.js"]},statsIgmp:{ctrl:"igmpStatsCtrl",perms:{"Device.Statistics.Multicast.Groups.":"R","Device.Network.Interface.":"R","Device.System.Scheduler.":"R"},view:"/apps/admin/pages/stats/igmp/page.tpl.html",html:["/apps/admin/pages/stats/igmp/page.tpl.html"],lazyDeps:["/apps/admin/pages/stats/igmp/ctrl.lazy.js"]},statsNetwork:{ctrl:"networkStatsCtrl",perms:{"Device.Statistics.Interface.":"R","Device.Switch.":"R","Device.DeviceInfo.Uptime":"R","Device.Routing.":"R","Device.Statistics.xDSL.":"R","Device.USB.Connection.":"R"},view:"/apps/admin/pages/stats/network/page.tpl.html",html:["/apps/admin/pages/stats/network/page.tpl.html"],lazyDeps:["/apps/admin/pages/stats/network/ctrl.lazy.js"]},statsPorts:{ctrl:"portStatsCtrl",perms:{"Device.Statistics.Port.":"R","Device.Switch.1.Ports.":"R"},view:"/apps/admin/pages/stats/ports/page.tpl.html",html:["/apps/admin/pages/stats/ports/page.tpl.html"],lazyDeps:["/apps/admin/pages/stats/ports/ctrl.lazy.js","/apps/admin/pages/stats/ports/details.ctrl.lazy.js"]},statsPortDetails:{ctrl:"portDetailsStatsCtrl",perms:{},view:"/apps/admin/pages/stats/ports/details.page.tpl.html",html:["/apps/admin/pages/stats/ports/details.page.tpl.html"],lazyDeps:["/apps/admin/pages/stats/ports/ctrl.lazy.js","/apps/admin/pages/stats/ports/details.ctrl.lazy.js"]},statsRouting:{ctrl:"routingStatsCtrl",perms:{"Device.Statistics.Routing.":"R","Device.Routing.Tables.":"R","Device.Network.Interface.":"R","Device.xDSL.":"R"},view:"/apps/admin/pages/stats/routing/page.tpl.html",html:["/apps/admin/pages/stats/routing/page.tpl.html"],lazyDeps:["/apps/admin/pages/stats/routing/ctrl.lazy.js"]},statsIPsec:{ctrl:"ipsecStatsCtrl",perms:{"Device.Statistics.IPsec.":"R","Device.Network.Connection.IPsec.":"R"},view:"/apps/admin/pages/stats/ipsec/page.tpl.html",html:["/apps/admin/pages/stats/ipsec/page.tpl.html"],lazyDeps:["/apps/admin/pages/stats/ipsec/ctrl.lazy.js"]},sysConfig:{ctrl:"SysConfigCtrl",perms:{},features:{factoryReset:{title:"sysconfig_factory",perms:{}}},view:"/apps/admin/pages/system/config/page.tpl.html",html:["/apps/admin/pages/system/config/page.tpl.html"],lazyDeps:["/apps/admin/pages/system/config/ctrl.lazy.js"]},firmware:{ctrl:"SysFirmwareCtrl",perms:{"Device.Services.Autoupdate.":"RW"},view:"/apps/admin/pages/system/firmware/page.tpl.html",html:["/apps/admin/pages/system/firmware/page.tpl.html"],lazyDeps:["/apps/admin/pages/system/firmware/ctrl.lazy.js"]},syslog:{ctrl:"SysLogCtrl",perms:{},view:"/apps/admin/pages/system/log/page.tpl.html",html:["/apps/admin/pages/system/log/page.tpl.html"],lazyDeps:["/apps/admin/pages/system/log/ctrl.lazy.js"]},ntp:{ctrl:"SysNtpCtrl",perms:{"Device.System.Time.":"RW","Device.Services.NTP.":"RW"},view:"/apps/admin/pages/system/ntp/page.tpl.html",html:["/apps/admin/pages/system/ntp/page.tpl.html"],lazyDeps:["/apps/admin/pages/system/ntp/ctrl.lazy.js"]},ping:{ctrl:"SysPingCtrl",perms:{},view:"/apps/admin/pages/system/ping/page.tpl.html",html:["/apps/admin/pages/system/ping/page.tpl.html"],lazyDeps:["/apps/admin/pages/system/ping/ctrl.lazy.js"]},telnet:{ctrl:"SysTelnetCtrl",perms:{"Device.Services.Telnet.":"RW","Device.Services.SSH.":"RW"},view:"/apps/admin/pages/system/telnet/page.tpl.html",html:["/apps/admin/pages/system/telnet/page.tpl.html"],lazyDeps:["/apps/admin/pages/system/telnet/ctrl.lazy.js"]},traceroute:{ctrl:"SysTracerouteCtrl",perms:{},view:"/apps/admin/pages/system/traceroute/page.tpl.html",html:["/apps/admin/pages/system/traceroute/page.tpl.html"],lazyDeps:["/apps/admin/pages/system/traceroute/ctrl.lazy.js"]},autoprovision:{ctrl:"SysAutoProvCtrl",perms:{"Device.Services.Autoprovision.":"RW"},view:"/apps/admin/pages/system/autoprovision/page.tpl.html",html:["/apps/admin/pages/system/autoprovision/page.tpl.html"],lazyDeps:["/apps/admin/pages/system/autoprovision/ctrl.lazy.js"]},urlfilterList:{ctrl:"UrlFilterListCtrl",perms:{},view:"/apps/admin/pages/urlfilter/list/page.tpl.html",html:["/apps/admin/pages/urlfilter/list/page.tpl.html"],lazyDeps:["/apps/admin/pages/urlfilter/list/ctrl.lazy.js"]},urlfilterForm:{ctrl:"UrlFilterFormCtrl",perms:{},view:"/apps/admin/pages/urlfilter/form/page.tpl.html",html:["/apps/admin/pages/urlfilter/form/page.tpl.html"],lazyDeps:["/apps/admin/pages/urlfilter/form/ctrl.lazy.js"]},vlanList:{ctrl:"VlanListCtrl",perms:{},view:"/apps/admin/pages/vlan_dsysinit/list/page.tpl.html",html:["/apps/admin/pages/vlan_dsysinit/list/page.tpl.html"],lazyDeps:["/apps/admin/pages/vlan_dsysinit/list/ctrl.lazy.js"]},vlanForm:{ctrl:"VlanFormCtrl",perms:{},view:"/apps/admin/pages/vlan_dsysinit/form/page.tpl.html",html:["/apps/admin/pages/vlan_dsysinit/form/page.tpl.html"],lazyDeps:["/apps/admin/pages/vlan_dsysinit/form/ctrl.lazy.js"]},vserversInfo:{ctrl:"VserversInfoCtrl",perms:{"Device.Network.":"R","Device.Firewall.IPv4.":"RW","Device.Services.":"R","Device.USB.Modem.":"R"},view:"/apps/admin/pages/vservers/info/page.tpl.html",html:["/apps/admin/pages/vservers/info/page.tpl.html"],lazyDeps:["/apps/admin/pages/vservers/info/ctrl.lazy.js"]},vserversRule:{ctrl:"VserversRuleCtrl",perms:{},view:"/apps/admin/pages/vservers/rule/page.tpl.html",html:["/apps/admin/pages/vservers/rule/page.tpl.html"],lazyDeps:["/apps/admin/pages/vservers/rule/ctrl.lazy.js"]},wanInfo:{ctrl:"WanInfoCtrl",perms:{"Device.Network.":"RW","Device.Network.IP.":"RW","Device.Network.Connection.DHCP.":"RW","Device.Network.Connection.DHCPv6.":"RW"},view:"/apps/admin/pages/wan/info/page.tpl.html",html:["/apps/admin/pages/wan/info/page.tpl.html"]},wanEdit:{ctrl:"WanEditCtrl",perms:{},view:"/apps/admin/pages/wan/edit/page.tpl.html",html:["/apps/admin/pages/wan/edit/page.tpl.html"]},wanAdd:{ctrl:"WanAddCtrl",perms:{},view:"/apps/admin/pages/wan/add/page.tpl.html",html:["/apps/admin/pages/wan/add/page.tpl.html"]},wanConn:{ctrl:"WanConnCtrl",perms:{},view:"/apps/admin/pages/wan/connection/page.tpl.html",html:["/apps/admin/pages/wan/connection/page.tpl.html"]},wifiAdv:{ctrl:"wifiAdvCtrl",perms:{"Device.WiFi.":"RW"},view:"/apps/admin/pages/wifi/advanced/page.tpl.html",html:["/apps/admin/pages/wifi/advanced/page.tpl.html"],lazyDeps:["/apps/admin/pages/wifi/advanced/ctrl.lazy.js"]},wifiClient:{ctrl:"wifiClientCtrl",perms:{"Device.WiFi.":"RW"},view:"/apps/admin/pages/wifi/client/page.tpl.html",html:["/apps/admin/pages/wifi/client/page.tpl.html"],lazyDeps:["/apps/admin/pages/wifi/client/ctrl.lazy.js","/apps/admin/pages/wifi/client/table/ctrl.lazy.js"]},wifiClientMgm:{ctrl:"wifiClientMgmCtrl",perms:{"Device.WiFi.":"RW"},view:"/apps/admin/pages/wifi/client_mgm/page.tpl.html",html:["/apps/admin/pages/wifi/client_mgm/page.tpl.html"],lazyDeps:["/apps/admin/pages/wifi/client_mgm/ctrl.lazy.js"]},wifiClientShaping:{ctrl:"wifiClientShapingCtrl",perms:{"Device.WiFi.":"RW"},view:"/apps/admin/pages/wifi/client_shaping/page.tpl.html",html:["/apps/admin/pages/wifi/client_shaping/page.tpl.html"],lazyDeps:["/apps/admin/pages/wifi/client_shaping/ctrl.lazy.js"]},wifiCommon:{ctrl:"wifiCommonCtrl",perms:{"Device.WiFi.":"RW","Device.System.Scheduler.":"RW"},view:"/apps/admin/pages/wifi/common/page.tpl.html",html:["/apps/admin/pages/wifi/common/page.tpl.html"],lazyDeps:["/apps/admin/pages/wifi/common/ctrl.lazy.js"]},wifiMac:{ctrl:"wifiMacCtrl",perms:{"Device.WiFi.":"RW"},view:"/apps/admin/pages/wifi/mac/page.tpl.html",html:["/apps/admin/pages/wifi/mac/page.tpl.html"],lazyDeps:["/apps/admin/pages/wifi/mac/ctrl.lazy.js"]},wifiRoaming:{ctrl:"wifiRoamingCtrl",perms:{"Device.WiFi.":"RW"},view:"/apps/admin/pages/wifi/roaming/page.tpl.html",html:["/apps/admin/pages/wifi/roaming/page.tpl.html"],lazyDeps:["/apps/admin/pages/wifi/roaming/ctrl.lazy.js"]},wifiWMM:{ctrl:"wifiWMMCtrl",perms:{"Device.WiFi.":"RW"},view:"/apps/admin/pages/wifi/wmm/page.tpl.html",html:["/apps/admin/pages/wifi/wmm/page.tpl.html"],lazyDeps:["/apps/admin/pages/wifi/wmm/ctrl.lazy.js"]},wifiWps:{ctrl:"wifiWPSCtrl",perms:{"Device.WiFi.":"RW"},view:"/apps/admin/pages/wifi/wps/page.tpl.html",html:["/apps/admin/pages/wifi/wps/page.tpl.html"],lazyDeps:["/apps/admin/pages/wifi/wps/ctrl.lazy.js"]},statsRoutingEdit:{ctrl:"statsRoutingForm",view:"/apps/admin/pages/stats/routing/info.routes/form.tpl.html",html:["/apps/admin/pages/stats/routing/info.routes/form.tpl.html"]},wanInfoSimple:{ctrl:"WanInfoSimpleCtrl",perms:{},view:"/apps/admin/pages/wan/info/simple/page.tpl.html",html:["/apps/admin/pages/wan/info/simple/page.tpl.html"]},wanInfoAdvanced:{ctrl:"WanInfoAdvancedCtrl",perms:{},view:"/apps/admin/pages/wan/info/advanced/page.tpl.html",html:["/apps/admin/pages/wan/info/advanced/page.tpl.html"]},wanGeneral:{ctrl:"WanGeneralCtrl",perms:{},view:"/apps/admin/pages/wan/components/general/page.tpl.html",html:["/apps/admin/pages/wan/components/general/page.tpl.html"]},wanMedia:{ctrl:"WanMediaCtrl",perms:{},view:"/apps/admin/pages/wan/components/media/page.tpl.html",html:["/apps/admin/pages/wan/components/media/page.tpl.html"]},wanPpp:{ctrl:"WanPppCtrl",perms:{},view:"/apps/admin/pages/wan/components/ppp/page.tpl.html",html:["/apps/admin/pages/wan/components/ppp/page.tpl.html"]},wanIpsec:{ctrl:"WanIpsecCtrl",perms:{},view:"/apps/admin/pages/wan/components/ipsec/page.tpl.html",html:["/apps/admin/pages/wan/components/ipsec/page.tpl.html"]},wifiClientTable:{ctrl:"WifiClientTableCtrl",perms:{},view:"/apps/admin/pages/wifi/client/table/page.tpl.html",html:["/apps/admin/pages/wifi/client/table/page.tpl.html"],lazyDeps:["/apps/admin/pages/wifi/client/table/ctrl.lazy.js"]},wifiAP:{ctrl:"WifiAPForm",perms:{},view:"/apps/admin/pages/wifi/common/ap/form.tpl.html",html:["/apps/admin/pages/wifi/common/ap/form.tpl.html"]},wifiWpsEdit:{ctrl:"wifiWpsForm",perms:{"Device.WiFi.":"RW"},view:"/apps/admin/pages/wifi/wps/wps/form.tpl.html",html:["/apps/admin/pages/wifi/wps/wps/form.tpl.html"]},wifiEasymesh:{ctrl:"wifiEasymeshCtrl",perms:{"Device.Services.EasyMesh.":"RW"},view:"/apps/admin/pages/wifi/easymesh/settings/page.tpl.html",html:["/apps/admin/pages/wifi/easymesh/settings/page.tpl.html"],lazyDeps:["/apps/admin/pages/wifi/easymesh/settings/ctrl.lazy.js"]},wifiEasymeshInfo:{ctrl:"wifiEasymeshInfoCtrl",perms:{"Device.Services.EasyMesh.":"RW"},view:"/apps/admin/pages/wifi/easymesh/info/page.tpl.html",html:["/apps/admin/pages/wifi/easymesh/info/page.tpl.html"],lazyDeps:["/apps/admin/pages/wifi/easymesh/info/ctrl.lazy.js"]},portsWizard:{ctrl:"WizardPortsController",perms:{"Device.Switch.":"RW"},view:"/apps/admin/pages/wizards/ports/dsysinit/page.tpl.html",html:["/apps/admin/pages/wizards/ports/dsysinit/page.tpl.html"],lazyDeps:["/apps/admin/pages/wizards/ports/dsysinit/ctrl.lazy.js"]},wanGwif:{ctrl:"WanGwifCtrl",perms:{},view:"/apps/admin/pages/wan/info/advanced/gwif/page.tpl.html",html:["/apps/admin/pages/wan/info/advanced/gwif/page.tpl.html"]},wanMediaEthernet:{ctrl:"WanMediaEthernetCtrl",perms:{},view:"/apps/admin/pages/wan/components/media/ethernet/page.tpl.html",html:["/apps/admin/pages/wan/components/media/ethernet/page.tpl.html"]},wanMediaBridging:{ctrl:"WanMediaBridgingCtrl",perms:{},view:"/apps/admin/pages/wan/components/media/bridging/page.tpl.html",html:["/apps/admin/pages/wan/components/media/bridging/page.tpl.html"]},wanMediaWifi:{ctrl:"WanMediaWifiCtrl",perms:{},view:"/apps/admin/pages/wan/components/media/wifi/page.tpl.html",html:["/apps/admin/pages/wan/components/media/wifi/page.tpl.html"]},wanIpv4Dynamic:{ctrl:"WanIpv4DynamicCtrl",perms:{},view:"/apps/admin/pages/wan/components/ipv4/dynamic/page.tpl.html",html:["/apps/admin/pages/wan/components/ipv4/dynamic/page.tpl.html"]},wanIpv4Static:{ctrl:"WanIpv4StaticCtrl",perms:{},view:"/apps/admin/pages/wan/components/ipv4/static/page.tpl.html",html:["/apps/admin/pages/wan/components/ipv4/static/page.tpl.html"]},wanIpv6Dynamic:{ctrl:"WanIpv6DynamicCtrl",perms:{},view:"/apps/admin/pages/wan/components/ipv6/dynamic/page.tpl.html",html:["/apps/admin/pages/wan/components/ipv6/dynamic/page.tpl.html"]},wanIpv6Static:{ctrl:"WanIpv6StaticCtrl",perms:{},view:"/apps/admin/pages/wan/components/ipv6/static/page.tpl.html",html:["/apps/admin/pages/wan/components/ipv6/static/page.tpl.html"]}});