<? /* vi: set sw=4 ts=4: */
include "/htdocs/phplib/xnode.php";
include "/htdocs/webinc/feature.php";

/* Because wizard might using other language pack,
so load currently language pack before webpage start to shown. */
include "/htdocs/webinc/menu.php";		/* The menu definitions */


function is_label($group)
{
	if ($_GLOBALS["TEMP_MYGROUP"]==$group)
		echo ' class="label"';
}

function is_label_noecho($group)
{
	if ($_GLOBALS["TEMP_MYGROUP"]==$group)
		return ' class="label"';
}

?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<link rel="shortcut icon" href="/favicon.ico" >
<?
	if ($TEMP_STYLE!="progress") echo '\t<link rel="stylesheet" href="/css/general.css" type="text/css">\n';
	if ($TEMP_STYLE=="support") echo '\t<link rel="stylesheet" href="/css/support.css" type="text/css">\n';
?>	<meta http-equiv="Content-Type" content="no-cache">
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>D-LINK</title>
<?
	//---For Widget, Joseph Chao
	if (query("/runtime/services/http/server/widget") > 0)
	{
		$salt = query("/runtime/widget/salt");
		echo "	<script>";
		echo "var salt = \"".$salt."\";";
		echo "</script>";
	}
	//---For Widget, Joseph Chao
?>
	<link rel=stylesheet type="text/css" href="css/style_pages.css" media="all" />

	<script type="text/javascript" charset="utf-8" src="./js/comm.js"></script>
	<script type="text/javascript" charset="utf-8" src="./js/libajax.js"></script>
	<script type="text/javascript" charset="utf-8" src="./js/postxml.js"></script>
	<script type="text/javascript" charset="utf-8" src="./js/hmac_md5.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/initialJQ.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/i18n.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/includeLang.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/AES.js"></script>
	<script type="text/javascript" charset="utf-8" src="/config/features.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/SOAP/SOAPAction.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/SOAP/SOAPDeviceSettings.js"></script>
	<script type="text/javascript" charset="utf-8" src="/js/initEnv.js"></script>
<?
	if($_GLOBALS["TEMP_MYNAME"]=="wiz_freset" || $_GLOBALS["TEMP_MYNAME"]=="wiz_mydlink")
	{
		echo '<script type="text/javascript" charset="utf-8" src="./js/position.js"></script>\n';
	}
	if (isfile("/htdocs/webinc/js/".$TEMP_MYNAME.".php")==1 && $AUTHORIZED_GROUP >= 0)
	{
		dophp("load", "/htdocs/webinc/js/".$TEMP_MYNAME.".php");
	}
?>
	<script type="text/javascript">
	var OBJ	= COMM_GetObj;
	var XG	= function(n){return PXML.doc.Get(n);};
	var XS	= function(n,v){return PXML.doc.Set(n,v);};
	var XD	= function(n){return PXML.doc.Del(n);};
	var XA	= function(n,v){return PXML.doc.Add(n,v);};
	var GPBT= function(r,e,t,v,c){return PXML.doc.GetPathByTarget(r,e,t,v,c);};
	var S2I	= function(str) {return isNaN(str)?0:parseInt(str, 10);}
	
	//OnLoad
	var init = initEnv();

	function TEMP_IsDigit(no)
	{
		if (no==""||no==null)
			return false;
		if (no.toString()!=parseInt(no, 10).toString())
			return false;

	    return true;
	}

	function Body() {}
	Body.prototype =
	{
		ShowLogin: function()
		{
			window.location.href = "/";
		},
		ShowContent: function()
		{
			OBJ("login").style.display	= "none";
			OBJ("content1").style.display= "block";
		},
		ShowMessage: function(banner, msgArray)
		{
			var str = '<h1>'+banner+'</h1>';
			for (var i=0; i<msgArray.length; i++)
			{
				str += '<div class="emptyline"></div>';
				str += '<div class="centerline">'+msgArray[i]+'</div>';
			}
			str += '<div class="emptyline"></div>';
			OBJ("message").innerHTML = str;
			OBJ("login").style.display	= "none";
			OBJ("content1").style.display= "none";
		},
		rtnURL: null,
		seconds: null,
		timerId: null,
		timerId_rtn: null,
		Countdown: function()
		{
			this.seconds--;
			OBJ("timer").innerHTML = this.seconds;
			if (this.seconds < 1)
			{
				clearTimeout(this.timerId);
				if(!this.rtnURL) this.GotResult();
			}
			else
			{
				this.timerId = setTimeout('BODY.Countdown()',1000);
				if(this.rtnURL && this.seconds==30) this.GotResult();
			}
		},
		GotResult: function()
		{
			if (this.rtnURL)	this.ReturnCheck();
			else				this.ShowContent();
		},
		ReturnCheck: function()
		{
			BODY.timerId_rtn = setTimeout('BODY.ReturnCheck()',5000);
			var ajaxObj = GetAjaxObj("ReturnCheck");
			ajaxObj.createRequest();
			ajaxObj.onCallback = function (xml)
			{
				ajaxObj.release();
				if(xml.Get("/status/result")=="OK" || xml.Get("/status/result")=="Authenication fail")
				{
					clearTimeout(BODY.timerId);
					clearTimeout(BODY.timerId_rtn);
					self.location.href = BODY.rtnURL;
				}
			}
			ajaxObj.setHeader("Content-Type", "application/x-www-form-urlencoded");
			ajaxObj.sendRequest("check_stats.php", "CHECK_NODE=");
		},
		ShowAlert: function(msg)
		{
			alert(msg);
		},
		DisableCfgElements: function(type)
		{
			for (var i = 0; i < document.forms.length; i+=1)
		    {
				var frmObj = document.forms[i];
				for (var idx = 0; idx < frmObj.elements.length; idx+=1)
				{
					if (frmObj.elements[idx].getAttribute("usrmode")=="enable") continue;
					frmObj.elements[idx].disabled = type;
				}
			}
		},
		//////////////////////////////////////////////////
		LoginCallback: null,
		//////////////////////////////////////////////////
		LoginSubmit: function()
		{
		},
		Login: function(callback)
		{
			AUTH.AuthorizedGroup=0;
			if (callback)	this.LoginCallback = callback;
			if (AUTH.AuthorizedGroup >= 0) { AUTH.UpdateTimeout(); return true; }
			return false;
		},
		Logout: function()
		{
			AUTH.Logout(function(){AUTH.TimeoutCallback();});
		},
		//////////////////////////////////////////////////
		GetCFG: function()
		{
			var self = this;
			if (!this.Login(function(){self.GetCFG();})) return;
			if (AUTH.AuthorizedGroup >= 100) this.DisableCfgElements(true);
			if (PAGE&&PAGE.services!=null)
			{
				COMM_GetCFG(
					false,
					PAGE.services,
					function(xml) {
						PAGE.InitValue(xml);
						PAGE.Synchronize();
						COMM_DirtyCheckSetup();
						if (AUTH.AuthorizedGroup >= 100) BODY.DisableCfgElements(true);
						}
					);
			}
			return;
		},
		OnSubmit: function()
		{
			if (PAGE === null) return;
			PAGE.Synchronize();
			var dirty = COMM_IsDirty(false);
			if (!dirty && PAGE.IsDirty) dirty = PAGE.IsDirty();
			if (!dirty)
			{
				window.location.href = "bsc_internet.php";
			}

			var xml = PAGE.PreSubmit();
			if (xml === null) return;

			if('<?echo $_GLOBALS["TEMP_MYNAME"];?>' != 'bsc_sms_send')
			{
		            var msgArray =
		            [
	        	        '<?echo I18N("j","The settings are being saved and are taking effect.");?>',
	                	'<?echo I18N("j","Please wait");?> ...'
		            ];
        	   	}
            		else
            		{
		                var msgArray = ['<?echo I18N("j","Sending Message, please wait...");?>'];
            		}

			if(PAGE.ShowSavingMessage) PAGE.ShowSavingMessage();
			else this.ShowMessage('<?echo i18n("Saving");?>', msgArray);
			AUTH.UpdateTimeout();

			var self = this;
			PXML.UpdatePostXML(xml);
			PXML.Post(function(code, result){self.SubmitCallback(code,result);});
		},
		SubmitCallback: function(code, result)
		{
			if (PAGE.OnSubmitCallback(code, result)) return;
			this.ShowContent();
			switch (code)
			{
			case "OK":
				this.OnReload();
				break;
			case "BUSY":
				this.ShowAlert("<?echo I18N("j","Someone is configuring the device, please try again later.");?>");
				break;
			case "HEDWIG":
				this.ShowAlert(result.Get("/hedwig/message"));
				if (PAGE.CursorFocus) PAGE.CursorFocus(result.Get("/hedwig/node"));
				break;
			case "PIGWIDGEON":
				if (result.Get("/pigwidgeon/message")=="no power")
				{
					BODY.NoPower();
				}
				else
				{
					this.ShowAlert(result.Get("/pigwidgeon/message"));
				}
				break;
			}
		},
		NoPower: function()
		{
			AUTH.Logout();
			BODY.ShowLogin();
		},
		OnReload: function()
		{
			if(PAGE)
			{
				if(PAGE.OnReload) PAGE.OnReload();
				else PAGE.OnLoad();
			}
			this.GetCFG();
		},
		//////////////////////////////////////////////////
		OnLoad: function()
		{
			var self = this;
			if (AUTH.AuthorizedGroup < 0)	{ this.ShowLogin(); return; }
			else							this.ShowContent();
			AUTH.TimeoutCallback = function()
			{
				window.location.href = "/Home.html";
			};

			if (PAGE) PAGE.OnLoad();
			this.GetCFG();
		},
		OnUnload: function() { if (PAGE) PAGE.OnUnload(); /*OnunloadAJAX();*/ },
		OnKeydown: function(e)
		{
			switch (COMM_Event2Key(e))
			{
			case 13: this.LoginSubmit();
			default: return;
			}
		},
	};
	/**************************************************************************/

	var AUTH = new Authenticate(<?=$AUTHORIZED_GROUP?>, <?echo query("/device/session/timeout");?>);
	var PXML = new PostXML();
	var BODY = new Body();
	var PAGE = <? if (isfile("/htdocs/webinc/js/".$TEMP_MYNAME.".php")==1 && $AUTHORIZED_GROUP>=0) echo "new Page();"; else echo "null;"; ?>
<?
	/* generate cookie */
	if (scut_count($_SERVER["HTTP_COOKIE"], "uid=") == 0)
		echo 'if (navigator.cookieEnabled) document.cookie = "uid="+COMM_RandomStr(10)+"; path=/";\n';
?>	</script>
</head>

<body class="easymainbg" onload="BODY.OnLoad();" onunload="BODY.OnUnload();">
<div id="hr1" style="top:75px; width:1500px; position:absolute"><hr color="#333333"></div>
<div class="easymaincontainer">
	<div class="menu_easy">
		<table>
			<tr>
				<td style="text-align:left"><img id="image_Logo" src="/image/logo_2.png" alt="D-Link" width="102" height="20" border="0" /></td>
				<td style="text-align:right" width="40%"><script>I18N("h","Home");</script></td>
				<td style="text-align:right" width="120px"><script>I18N("h","|");</script></td>
				<td style="text-align:right" width="130px"><script>I18N("h","Settings");</script></td>
				<td style="text-align:right" width="140px"><script>I18N("h","|");</script></td>
				<td style="text-align:right" width="150px"><script>I18N("h","Advanced");</script></td>
				<td style="text-align:right" width="160px"><script>I18N("h","|");</script></td>
				<td style="text-align:right" width="170px"><script>I18N("h","Management");</script></td>
			</tr>
		</table>
	</div>
<?

// this simple style is used for wizard.
if ($TEMP_STYLE=="simple")
{
	if($_GLOBALS["TEMP_MYNAME"]=="onepage")
	{
		echo '	<div id="content1" class="easysimplecontainer2" style="width: 782px; overflow-x: hidden; overflow-y: auto; max-height: 1500px; top: 70px;">\n';
	}
	echo '		<div class="simplebody">\n'.
		 '<!-- Start of Page Depedent Part. -->\n';
	if (isfile("/htdocs/webinc/body/".$_GLOBALS["TEMP_MYNAME"].".php")==1 && $AUTHORIZED_GROUP>=0)
		dophp("load", "/htdocs/webinc/body/".$_GLOBALS["TEMP_MYNAME"].".php");
	echo '<!-- End of Page Dependent Part. -->\n'.
		 '		</div>\n'.
		 '	</div>';
}
?>
	<!-- Start of Login Body -->
	<div id="login" class="simplecontainer" style="display:none;">
		<div class="simplebody">
			<div class="orangebox">
			    <h1><?echo i18n("Login");?></h1>
				<div class="message"><?echo i18n("Login to the router");?> : </div>
				<div class="loginbox">
					<span class="name"><?echo i18n("User Name");?></span>
					<span class="delimiter">:</span>
					<span class="value">
					</span>
				</div>
				<div class="loginbox">
					<span class="name"><?echo i18n("Password");?></span>
					<span class="delimiter">:</span>
					<span class="value">
						<input type="password" id="loginpwd" size="20" maxlength="15" onkeydown="BODY.OnKeydown(event);" />
						<input type="button" id="noGAC" value="<?echo i18n("Login");?>" onClick="BODY.LoginSubmit();" />
					</span>
				</div>
			</div>
		</div>
	</div>
	<!-- End of Login Body -->
</body>
</html>
