function onCreateNewNetgearAccount()
{
  	if ((hasInternet == "00:00:00")&&(isFirstTime=="0"))
		//alert("The device is not connected to Internet.It must be connected to the Internet for initial installation");
		alert(getErrorMsgByVar("gsm_msg_sso_error_no_internet"));
	else
	{
		var redirect="";
		//var redirect=netgear_sso_url+'signup?redirectUrl='+redirect_url_after_login+'&id='+pingId_App_Id;
		if(is_new_sso_login=="1")
		   redirect=netgear_sso_url+'signup?redirectUrl='+redirect_url_after_login+'&devtypeid='+model_name+'&serial_num='+dev_sn+'&sessionID='+sso_session_id;
		else
		   redirect=netgear_sso_url+'signup?redirectUrl='+redirect_url_after_login+'&devtypeid='+model_name+'&serial_num='+dev_sn;
		top.location.href = redirect;
	}
}



function onSignInWithNetgearAccount()
{
  	if ((hasInternet == "00:00:00")&&(isFirstTime=="0"))
		//alert("The device is not connected to Internet.It must be connected to the Internet for initial installation");
		alert(getErrorMsgByVar("gsm_msg_sso_error_no_internet"));
	else
	{
		var redirect="";
		//var redirect=netgear_sso_url+'login?redirectUrl='+redirect_url_after_login+'&id='+pingId_App_Id;
		if(is_new_sso_login=="1")
		   redirect=netgear_sso_url+'login?redirectUrl='+redirect_url_after_login+'&devtypeid='+model_name+'&serial_num='+dev_sn+'&sessionID='+sso_session_id;
		else
		   redirect=netgear_sso_url+'login?redirectUrl='+redirect_url_after_login+'&devtypeid='+model_name+'&serial_num='+dev_sn;
		top.location.href = redirect;
	}
}
function show_sso_error_msg_popup()
{
	document.getElementById("sso_error").innerHTML = sso_error_msg;
	$('#sso_error_msg_popup, .blackBackground').fadeIn();
}

function show_local_login_help_popup()
{
	$('#local_login_help_popup, .blackBackground').fadeIn();
}



function show_internet_everlogon_login_help_popup()
{
	$('#internet_everlogon_login_help_popup, .blackBackground').fadeIn();
}


function show_internet_login_help_popup()
{
	$('#internet_login_help_popup, .blackBackground').fadeIn();
}

function show_internet_create_help_popup()
{
	$('#internet_create_help_popup, .blackBackground').fadeIn();
}

function closePupup()
{
	$('.popup, .blackBackground').fadeOut();	
}



