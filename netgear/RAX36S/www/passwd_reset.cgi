<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<link rel="stylesheet" href="/style/advanced.css">
<script language=javascript type=text/javascript src=/funcs.js></script>
<script language=javascript type=text/javascript src=/jquery-3.6.1.min.js></script>
<script language=javascript type=text/javascript src=/jquery.base64.min.js></script>
<% new_hijack_flow_head() %>
<% hijack_language() %>
</head>
<style>
.install-card .content div ul{margin: 10px 0 10px 22px !important; padding-left:0 !important;}
li img{margin-left:-22px;}
.passwd_hint_class span{color:red !important;}
.passwd_hint_class div{padding-left:5px;margin-bottom:5px;}
input[type="text"]:disabled {
    background-color: transparent;
}
</style>

<body onload="loadvalue();">
<div id="top" class="standalone-top">
<div id="logo"> </div>
<% top_hardware_version() %>
<div id="firm_version" name="firm_version">$router_firmware_version<br /><% cat_file("/firmware_version") %></div>
</div>
<% refresh_timestamp("passwd_reset") %>
<script>
var ts = "12345678";
var wait = 1000;
var timeoutID = null;
var game_router_flag = "<% show_game_router_flag() %>";
<% single_page_web_flag() %>
function loadvalue()
{
	document.getElementById("admin_account_next").disabled = true;	
	document.getElementById("new_passwd_div").style.width="44%";
	document.getElementById("confirm_passwd_div").style.width="44%";
	document.getElementById("pwd_warn").src="image/warning_flag.jpg";
	document.getElementById("passwd_hint_content").style.backgroundImage="url(../image/passwd_bg.jpg)";

	if(game_router_flag == "1")
	{
		document.getElementById("passwd_hint").className="passwd_hint_class";
		document.getElementById("quest1_div").className="input-field";
		document.getElementById("quest2_div").className="input-field";
	}
	else
	{
		document.getElementById("quest1_label1").style.display="";
		document.getElementById("quest1_label2").style.display="none";
		document.getElementById("quest2_label1").style.display="";
		document.getElementById("quest2_label2").style.display="none";
	}
}
function debounce() {
	clearTimeout(timeoutID);
	timeoutID = setTimeout(function() {
   	validatepassword();
  	}, wait);
};

function isValidChar_space(each_char)
{
	if( each_char < 32 || each_char > 127)
		return false;
}
var valid_pwd =0;
function validatepassword()
{
	var disabled="image/checkbox-selected-gry.svg";
	var enabled="image/checkbox-selected.svg";
	var meet_complex=0, meet_len=0;
	var cf = document.forms[0];
	var passwd=cf.sysNewPasswd.value;
	cf.admin_account_next.disabled = true;
	valid_pwd = 0;

	var re = new RegExp("[A-Z]");
	len=re.test(passwd);
	if(len)
	{
		cf.pwd_complex1.src=enabled;
		meet_complex++;
	}else
		cf.pwd_complex1.src=disabled;
	re = new RegExp("[a-z]");
	len=re.test(passwd);
	if(len)
	{
		cf.pwd_complex2.src=enabled;
		meet_complex++;
	}else
		cf.pwd_complex2.src=disabled;

	if(((use_black_logo == 1 && passwd.length>=8) || (use_black_logo == 0 && passwd.length>=10)) && passwd.length<=32)
	{
		cf.pwd_len.src=enabled;
		meet_len=1;
	}else
		cf.pwd_len.src=disabled;

	if(meet_complex>=2 && meet_len){
		document.getElementById("passwd_hint").style.display="none";
		cf.pwd_warn.src="image/check.png";
		document.forms[0].admin_account_next.disabled = "";
		valid_pwd=1;
	}else{
		document.getElementById("passwd_hint").style.display="";
		cf.pwd_warn.src="image/warning_flag.jpg";
	}
}
function change_display()
{
	//document.forms[0].admin_account_next.disabled = "";
	document.forms[0].pwd_warn.style.display="";
	document.getElementById("passwd_hint").style.display="none";
}
function checkpasswd(cf)
{
	if(cf.sysNewPasswd.value == "")
	{
		alert(bh_must_enter_passwd);
		return false;
	}
	if(cf.sysNewPasswd.value == "password" || cf.sysNewPasswd.value == "Password")
	{
		cf.admin_account_next.disabled = true;
	//	document.getElementById("admin_account_next").disabled = true;
		alert(bh_must_change_passwd);
		return false;
	}
	if((use_black_logo == 0 && cf.sysNewPasswd.value.length < 10) || (use_black_logo == 1 && cf.sysNewPasswd.value.length<8))
	{
		alert(bh_password_length_error_weak);
		return false;
	}
	if (cf.sysNewPasswd.value.length >= 33 || cf.sysConfirmPasswd.value.length >= 33)
	{
		alert(bh_max_pwd_len);
		return false;
	}
	if(cf.sysNewPasswd.value != cf.sysConfirmPasswd.value)
	{ 
		alert(bh_pwd_no_match);
		return false;	
	}

	cf.hidden_enable_recovery.value="1";
	if( cf.question1.value == "0" || cf.question2.value == "0")
	{
		alert(bh_select_quest);
		return false;
	}
	
	if( cf.answer1.value == "" || cf.answer2.value == "" )
	{
		alert(bh_enter_answer);
		return false;
	}
	if( cf.answer1.value.length > 64 || cf.answer2.value.length > 64 )/* to fix bug 26920 */
	{
		alert(bh_invalid_answer);
		return false;
	}
	
	for(i=0; i< cf.answer1.value.length; i++)/* to fix bug 26920 */
	{
		if( isValidChar_space(cf.answer1.value.charCodeAt(i))==false )
		{
			alert(bh_invalid_answer);
			return false;
		}
	}
	for(i=0; i< cf.answer2.value.length; i++)/* to fix bug 26920 */
	{
		if( isValidChar_space(cf.answer2.value.charCodeAt(i))==false )
		{
			alert(bh_invalid_answer);
			return false;
		}
	}

	jQuery.noConflict();
	validatepassword();
	if(valid_pwd != 1)
		{
			alert(bh_password_error);
			return false;
		}
	cf.sysNewPasswd.value=$$.base64.encode(cf.sysNewPasswd.value);
	cf.hidden_answer1.value=$$.base64.encode(cf.answer1.value);
	cf.hidden_answer2.value=$$.base64.encode(cf.answer2.value);
	document.getElementById("answer1").disabled = true;
	document.getElementById("answer2").disabled = true;
	cf.sysConfirmPasswd.value=cf.sysNewPasswd.value;
	return true;
}

</script>
<div id="container">
<form method="post" action="/recover.cgi?/passwd_reset.cgi timestamp=<% cfg_get("passwd_reset") %>">
<input type=hidden name=submit_flag value="passwd_reset">
<input type="hidden" name="hidden_enable_recovery" value="1" />
<input type="hidden" name="hidden_answer1" />
<input type="hidden" name="hidden_answer2" />
	<div class="dialog-content">
		<!-- Orbi Admin Account Settings-->
		<div id="card-orbi-admin-account" class="install-card clearfix">
		     <div class="content">
			<div class="desc-title"><script>document.write(bh_password_reset);</script></div>
			<div class="desc-text"><script>document.write(bh_verify_passwd_reset);</script></div>

			<div class="row input-row">
				<div class="input-field col m6">
					<input type="text" id="brs_username" placeholder="<% cfg_get("http_loginname") %>" autocomplete="off" disabled="disabled" class="validate"/>
					<label for="brs_username"><script>document.write(bh_username);</script></label>
				</div>
				<div class="input-field col m6" id="new_passwd_div">
				 	<input type="password" style="display:none">
					<input type="password" placeholder="password" autocomplete="off" size="20" name="sysNewPasswd" id="sys_new_passwd" onFocus="this.select();" class="validate" onkeyup="debounce()" onkeydown="change_display()"/>
					<label for="sys_new_passwd"><script>document.write(bh_new_password);</script></label>
				</div>
				<span style="width:6%;display:inline-block;"><img id="pwd_warn" src="" style="display:none; margin-top:30px;"></span>
			</div>
			<div class="row input-row" id="passwd_hint" style="display:none;">
				<div id="passwd_hint_content" style="border-radius:20px;float:right;max-width:550px;">
					<ul style="margin: 10px 0 10px 22px; padding-left:0;">
						<li>
							<span><script>document.write(bh_passwd_condition_weak);</script></span>
						</li>
						<li>
							<ul style="margin: 10px 0 10px 22px;padding-left:0;">
								<li>
									<img id="pwd_len" src="">
									<span ><script>document.write(bh_password_reset_conditions5_1_weak);</script></span>
								</li>
								<li>
									<img id="pwd_complex1" src="">
									<span><script>document.write(bh_password_reset_conditions1_contains);</script></span>
								</li>
								<li>
									<img id="pwd_complex2" src="">
									<span ><script>document.write(bh_password_reset_conditions2_contains);</script></span>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<div class="row input-row">
				<div class="input-field col m6 offset-m6" id="confirm_passwd_div">
					<input type="password" placeholder="password" autocomplete="off" size="20" name="sysConfirmPasswd" id="sys_confirm_passwd" onFocus="this.select();" class="validate"/>
					<label for="sys_confirm_passwd"><script>document.write(bh_passwd_repas);</script></label>
				</div>
			</div>
			<div class="row input-row">
              <div id="quest1_div">
				<label id="quest1_label1" style="display: none; color: #aaa"><script>document.write(bh_security_question_1);</script></label>
				<select name="question1" id="sec_question_one" value="Select a question">
					<script>document.write('<option selected value="0">'+bh_select_a_question+'</option>'+
					'<option value="1">'+bh_quest1_1+'</option>'+
					'<option value="2">'+bh_quest1_2+'</option>'+
					'<option value="3">'+bh_quest1_3+'</option>'+
					'<option value="4">'+bh_quest1_4+'</option>'+
					'<option value="5">'+bh_quest1_5+'</option>'+
					'<option value="6">'+bh_quest1_6+'</option>'+
					'<option value="7">'+bh_quest1_7+'</option>'+
					'<option value="8">'+bh_quest1_8+'</option>'+
					'<option value="9">'+bh_quest1_9+'</option>');
					</script>
				</select>
				<label id="quest1_label2"><script>document.write(bh_security_question_1);</script></label>
			  </div>
			  <div class="input-field">
				<input type="text" autocomplete="off" maxLength="64" size="30" name="answer1" id="answer1"  onFocus="this.select();" class="validate"/>
				<label for="answer1"><script>document.write(bh_answer);</script></label>
			  </div>
			</div>
			
			<div class="row input-row">
              <div id="quest2_div">
				<label id="quest2_label1" style="display: none; color: #aaa"><script>document.write(bh_security_question_2);</script></label>
				<select name="question2" id="sec_question_two" value="Select a question">
					<script>document.write('<option selected value="0">'+bh_select_a_question+'</option>'+
					'<option value="1">'+bh_quest2_1+'</option>'+
					'<option value="2">'+bh_quest2_2+'</option>'+
					'<option value="3">'+bh_quest2_3+'</option>'+
					'<option value="4">'+bh_quest2_4+'</option>'+
					'<option value="5">'+bh_quest2_5+'</option>'+
					'<option value="6">'+bh_quest2_6+'</option>'+
					'<option value="7">'+bh_quest2_7+'</option>'+
					'<option value="8">'+bh_quest2_8+'</option>');
					</script>
				</select>
				<label id="quest2_label2"><script>document.write(bh_security_question_2);</script></label>
			   </div>
				<div class="input-field">
					<input type="text" autocomplete="off" maxLength="64" size="30" name="answer2" id="answer2" onFocus="this.select();" class="validate"/>
					<label for="answer2"><script>document.write(bh_answer);</script></label>
				</div>
			 </div>
			</div>
		    <div class="buttons">
			<button id="admin_account_next" type="submit" class="waves-effect waves-light btn button-nav btn-icon icon-right" onclick="return checkpasswd(document.forms[0])" disabled>
				<span><script>document.write(bh_orbi_next_mark);</script></span><i class="material-icons">navigate_next</i>
			</button>
		    </div>
		</div>
	</div>

</form>
</div>

</body>

</html>
