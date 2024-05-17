var URL_FILTER_REMOVE				= 0;
var URL_FILTER_ADD					= 1;
var URL_FILTER_SET					= 2;
var TOD_RULE_ADD1					= 3;
var TOD_RULE_ADD2					= 4;
var TOD_RULE_ADD3					= 5;
var TOD_RULE_REMOVE					= 6;
var DDNS_SERVICE_ADD1				= 7;
var DDNS_SERVICE_ADD2				= 8;
var DDNS_SERVICE_ADD3				= 9;
var DDNS_SERVICE_REMOVE			= 10;
var OUTGOING_IPFILTER_ADD		= 11;
var OUTGOING_IPFILTER_REMOVE	= 12;
var INGOING_IPFILTER_ADD		= 13;
var INGOING_IPFILTER_REMOVE		= 14;
var MAC_FILTER_ADD				= 15;
var MAC_FILTER_REMOVE			= 16;
var MAC_FILTER_POLICY_CHANGE	= 17;
var QOS_QUEUE_CONFIG_ADD		= 18;
var QOS_QUEUE_TRANSMIT_OUT		= 19;
var QOS_QUEUE_CONFIG_REMOVE		= 20;
var QOS_QUEUE_CONFIG_ENABLE		= 21;
var PASSWORD_CHANGE_SUCC		= 22;
var PASSWORD_CHANGE_FAIL		= 23;
var LAN_IP_CHANGE_FAIL			= 24;
var LAN_IP_CHANGE_SUCC			= 25;
var PAGE_NOT_IMPLEMENTED		= 26;
var INVALID_SESSION_KEY			= 27;
var WL_MACFILTER_ADD_ERR		= 28;
var WL_MACFILTER_REMOVE_ERR		= 29;
var WL_WDS_MAC_ADD_ERR			= 30;
var WAN_CFG_NO_VALID_INTERFACE	= 31;
var WAN_EDIT_FAILD_GET_WANINFO	= 32;
var WAN_CFG_ERR					= 33;
var NAT_NOT_ENABLED				= 34;
var SEC_LOG_RESET_ERR			= 35;
var SEC_LOG_RESET_SUCC			= 36;
var SEC_LOG_VIEW_ERR			= 37;
var PORT_MAP_ADD_ERR			= 38;
var PORT_MAP_FILTER_ADD_ERR		= 39;
var PORT_MAP_REMOVE_ERR			= 40;
var PORT_MAP_EDIT_ERR			= 41;
var ETH_WANIF_REMOVE_ERR	= 42;
var ETH_WANIF_ADD_ERR			= 43;
var CFG_SROUTEADDR_ADD_ERR		= 44;
var CFG_SROUTEMASK_ADD_ERR		= 45;
var CFG_SROUTEADDRMASK_ADD_ERR		= 46;
var VIRSER_REMOVE_ERR		= 47;
var VIRSER_ADD_ERR		= 48;

var errmsg = new Array();
errmsg[URL_FILTER_REMOVE] 		= new Array('Url Filter Entry Remove Error','Unable to remove.');
errmsg[URL_FILTER_ADD] 			= new Array('Url Filter Entry Add Error','Configure url filter: url = %s and port number = %u failed');
errmsg[URL_FILTER_SET] 			= new Array('Url Filter Type Set Error','Configure url filter type: %s failed');
errmsg[TOD_RULE_ADD1] 			= new Array('ToD rule add error','That rule already exists.');
errmsg[TOD_RULE_ADD2] 			= new Array('ToD rule add error','A rule with that name already exists.');
errmsg[TOD_RULE_ADD3] 			= new Array('ToD rule add error','Unable to add rule.');
errmsg[TOD_RULE_REMOVE] 		= new Array('Restriction remove error','Unable to remove %s.');
errmsg[DDNS_SERVICE_ADD1]		= new Array('DDns service add error','That rule already exists.');
errmsg[DDNS_SERVICE_ADD2] 		= new Array('DDns service add error','A rule with that name already exists."');
errmsg[DDNS_SERVICE_ADD3] 		= new Array('DDns service add error','Unable to add rule.');
errmsg[DDNS_SERVICE_REMOVE] 	= new Array('Restriction remove error','Unable to remove %s.');
errmsg[OUTGOING_IPFILTER_ADD] 		= new Array('Outgoing IP filter Add Error','Failed to add outgoing IP filter %s;  Check for duplicate filter name and/or filter rules.');
errmsg[OUTGOING_IPFILTER_REMOVE] 	= new Array('Outgoing IP filter Remove Error','Cannot remove outgoing IP filter named %s.<br>Status: %d.');
errmsg[INGOING_IPFILTER_ADD] 		= new Array('Incoming IP filter Add Error','Add incoming IP filter named %s failed. Status: %d.');
errmsg[INGOING_IPFILTER_REMOVE] 	= new Array('Incoming IP filter Remove Error','Cannot remove incoming IP filter named %s.<br>Status: %d.');
errmsg[MAC_FILTER_ADD] 				= new Array('Mac filter Add Error','Add Mac filter failed. Status: %d.');
errmsg[MAC_FILTER_REMOVE] 			= new Array('MAC filter entry Remove Error','Cannot remove MAC filtering entry.<br>Status: %d.');
errmsg[MAC_FILTER_POLICY_CHANGE] 	= new Array('MAC filter policy change error','Cannot change Mac filtering policy.<br>" "Status: %d.');
errmsg[QOS_QUEUE_CONFIG_ADD] 		= new Array('Queue Config Add Error','Configure qos queue failed,because of Invalid arguments.');
errmsg[QOS_QUEUE_TRANSMIT_OUT] 		= new Array('Out of hardware transmit queue','Configure qos queue failed.,because of Invalid arguments.');
errmsg[QOS_QUEUE_CONFIG_REMOVE] 	= new Array('QoS Queue Config Error','Delete queue failed. ret=%d');
errmsg[QOS_QUEUE_CONFIG_ENABLE] 	= new Array('QoS Queue Config Error','Enable queue failed. ret=%d');
errmsg[PASSWORD_CHANGE_SUCC] 		= new Array('Message','Password change successful');
errmsg[PASSWORD_CHANGE_FAIL] 		= new Array('Message','Password change failed');
errmsg[LAN_IP_CHANGE_FAIL] 			= new Array('Message','This IP Address is used by other Group.');
errmsg[LAN_IP_CHANGE_SUCC] 			= new Array('Message','The LAN side IP address of the modem has changed.<br>Force your LAN side computer(s) to acquire the new address.');
errmsg[PAGE_NOT_IMPLEMENTED] 		= new Array('Message','The selected web page is not implemented yet.');
errmsg[INVALID_SESSION_KEY] 		= new Array('Message','Invalid Session Key, please try again');
errmsg[WL_MACFILTER_ADD_ERR] 		= new Array('Wireless MAC Filter Add Error','Add wireless MAC filter for %s failed. Status: %d.');
errmsg[WL_MACFILTER_REMOVE_ERR] 	= new Array('Wireless MAC Filter Remove Error','Cannot remove wireless mac filter for %s.<br>Status: %d.');
errmsg[WL_WDS_MAC_ADD_ERR] 			= new Array('Wireless WDS MAC Add Error','Add wireless WDS MAC for %s failed. Status: %d.');
errmsg[WAN_CFG_NO_VALID_INTERFACE]	= new Array('WAN Configuration Error','Can not get available interfaces or no available interfaces,please click menu "ATM Interface" or menu "ETH Interface" to add a WAN interface!');
errmsg[WAN_EDIT_FAILD_GET_WANINFO]	= new Array('WAN Service Edit','Failed to get WAN info for Edit.');
errmsg[WAN_CFG_ERR]					= new Array('WAN Configuration Error','Invalid WAN interface.');
errmsg[NAT_NOT_ENABLED]				= new Array('Message','NAT is not enabled. A routed WAN service with NAT enabled is needed to configure this service.');
errmsg[SEC_LOG_RESET_ERR]			= new Array('Message','Error Resetting Security Log');
errmsg[SEC_LOG_RESET_SUCC]			= new Array('Message','Security Log Successfully Reset');
errmsg[SEC_LOG_VIEW_ERR]			= new Array('Message','Error reading security log');
errmsg[PORT_MAP_ADD_ERR]			= new Array('Port Map Add Error','Configure port map failed. Group name %s cannot set the object');
errmsg[PORT_MAP_FILTER_ADD_ERR]		= new Array('Port Map Filter Add Error','Configure interface grouping failed. Group name %s cannot set the object');
errmsg[PORT_MAP_REMOVE_ERR]			= new Array('Port Map Remove Error','Port Map Remove Failed');
errmsg[PORT_MAP_EDIT_ERR]			= new Array('Port Map Edit Error','Configure port map failed to apply configuration. Status: %d.');
errmsg[ETH_WANIF_REMOVE_ERR]		= new Array('ETH WAN Interface Remove Error','You CANNOT remove this ETH Interface if it is used by a WAN Service. You need to remove the WAN Service before you can remove this ETH interface.<br>Click on "Back" button to give it an another try.<br>Or<br>click on "Reboot Router" button to reboot the DSL Router and try it again.');
errmsg[ETH_WANIF_ADD_ERR]				= new Array('ETH WAN Interface Add Error','ETH WAN Interface Add Failed, please reboot you router.');
errmsg[CFG_SROUTEADDR_ADD_ERR]				= new Array('Static Route Add Error','Configure route for address = %s failed');
errmsg[CFG_SROUTEMASK_ADD_ERR]				= new Array('Static Route Add Error','Configure route for subnet mask = %s failed');
errmsg[CFG_SROUTEADDRMASK_ADD_ERR]		= new Array('Static Route Add Error','Configure route for address = %s and subnet mask = %s failed');
errmsg[VIRSER_REMOVE_ERR]		= new Array('Virtual Server Configuration','Cannot remove virtual server entry');
errmsg[VIRSER_ADD_ERR]		= new Array('Virtual Server Configuration','Add virtual server failed.');

function getErrTitle(id)
{
	return errmsg[id][0];
}
function getErrMsg(id,param)
{
	var params = param.split('|');
	var retValue = '';
	var m_id = parseInt(id);
	var len = errmsg[m_id][1].length;
	var j=0;
	for(var i=0;i<len;i++)
	{
			if(errmsg[m_id][1].charAt(i)=='%'&&(errmsg[m_id][1].charAt(i+1)=='s'||errmsg[m_id][1].charAt(i+1)=='d'||errmsg[m_id][1].charAt(i+1)=='u'))
			{
					retValue+=params[j];i++;j++;
			}else
			{
					retValue+=errmsg[m_id][1].charAt(i);
			}
	}
	return retValue;
}