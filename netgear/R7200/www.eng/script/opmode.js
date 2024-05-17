/*router ap extender pages*/
function select_type( type)
{
	if(type === undefined)
		type =document.forms[0].operation_type.value;

	if(type == 0 )
		location.href="WLG_opmode_router.htm";
	else if(type == 1 )
		location.href="WLG_opmode_ap.htm";
	else if(type == 2 )
		location.href="WLG_opmode_bridge.htm";
}
