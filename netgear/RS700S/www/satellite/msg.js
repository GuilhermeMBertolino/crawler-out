//public message
var msg_blank = "%s <%36%>";
var msg_space = "<%37%> %s\n";
var msg_blank_in = "<%38%> %s\n";
var msg_invalid = "\n<%39%> %s\n<%40%>: \n%s\n\n";
var msg_check_invalid = "%s <%41%>";
var msg_greater = "%s <%42%> %s";
var msg_less = "%s <%43%> %s";
var current_gui_language = "<%44%>";

function addstr(input_msg)
{
	var last_msg = "";
	var str_location;
	var temp_str_1 = "";
	var temp_str_2 = "";
	var str_num = 0;
	temp_str_1 = addstr.arguments[0];
	while(1)
	{
		str_location = temp_str_1.indexOf("%s");
		if(str_location >= 0)
		{
			str_num++;
			temp_str_2 = temp_str_1.substring(0,str_location);
			last_msg += temp_str_2 + addstr.arguments[str_num];
			temp_str_1 = temp_str_1.substring(str_location+2,temp_str_1.length);
			continue;
		}
		if(str_location < 0)
		{
			last_msg += temp_str_1;
			break;
		}
	}
	return last_msg;
}
