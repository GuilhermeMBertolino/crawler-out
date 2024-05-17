<?
$dbg = FALSE;

$board = db_get("Device.DeviceInfo.ModelName");

function autoLang()
{
    $langArray = array(
        "de" => "German",
        "ko" => "Korean",
        "ru" => "Russian",
        "es" => "Spanish",
        "pl" => "Polish",
        "fr" => "French",
        "it" => "Italian",
        "sv" => "Swedish",
        "da" => "Danish",
        "nl" => "Dutch",
        "el" => "Greek",
        "no" => "Norwegian",
        "cs" => "Czech",
        "sl" => "Slovenian",
        "pt" => "Portuguese",
        "hu" => "Hungarian",
        "ro" => "Romanian",
        "fi" => "Finnish",
        "sk" => "Slovak",
        "tr" => "Turkish",
	"en" => "English",
    );

    $httpLang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);

    if ( $httpLang == "zh" ) {
	if (substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 5) == "zh-TW") {
	    $langAbbr = 'cht';
	    $langName = 'Traditional-Chinese';
	}
	else if (substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 5) == "zh-HK") {
	    $langAbbr = 'cht';
	    $langName = 'Traditional-Chinese';
	}
	else {
	    $langAbbr = 'chs';
	    $langName = 'Chinese';
	}
    }
    else if ($httpLang == "no" || $httpLang == "nn" || $httpLang == "nb") {
        $langAbbr = 'no';
        $langName = 'Norwegian';
    }
    else if ($httpLang == "ja") {
        $langAbbr = 'jp';
        $langName = 'Japanese';
    }
    else {
        foreach( $langArray as $langAbbr => $langName ) {
            if ($httpLang == $langAbbr) {
                break;
	    }
        }
    }

    $langType = db_get("Device.X_PEGATRON_COM_DeviceInfo.Language");
    $currLang= shell_exec("cat /data/lang/auto_lang | awk '{printf $1}'");
    if ($currLang == $langName || $langType != "Auto")
	return 0;

    $cmd_str="echo ".$langName." > /data/lang/auto_lang";
    exec($cmd_str, $res, $status);

    $cmd_str="cp -f /data/lang/lang-".$langAbbr.".js /data/lang/mlang.js";
    exec($cmd_str, $res, $status);

    return 1;
}

function getAutoLanguage()
{
    $filePath="/data/lang/auto_lang";

    $autoLang="None";

    if(!file_exists($filePath))
    {
        return $autoLang;
    }

    $fp =  fopen($filePath, 'r');
    if($fp)
    {
        $autoLang = trim(fgets($fp), "\n");
        fclose($fp);
    }

    return $autoLang;
}

function getHardwareVersion()
{
    return db_get("Device.DeviceInfo.HardwareVersion");
}

function getLanguageVersion()
{
    return db_get("Device.X_PEGATRON_COM_DeviceInfo.LanguageVersion");
}

function getGUILanguage()
{
    return db_get("Device.X_PEGATRON_COM_DeviceInfo.Language");
}

function getModelNameStr()
{
    return db_get("Device.DeviceInfo.ModelName");
}

function getModelSpeedStr()
{
    $model_name=db_get("Device.DeviceInfo.ModelName");
   
    if ($model_name == "RAXE300")
    	return "Nighthawk AXE7800";
    else
    if ($model_name == "RAXE290")
    	return "Nighthawk AXE7300";
    else
    	return "Nighthawk AX5";
}

function getFirmwareVer()
{
    return db_get("Device.DeviceInfo.SoftwareVersion");
}

function getSerialNumber()
{
    return db_get("Device.DeviceInfo.SerialNumber");
}

function getDefaultState()
{
    return db_get("Device.X_PEGATRON_COM_DeviceInfo.BlankState");;
}

function getWizardNightHawkAppDisable()
{
    return db_get("Device.X_PEGATRON_COM_DeviceInfo.WizardNightHawkAppDisable");;
}

function getWizardTNCDisable()
{
    return db_get("Device.X_PEGATRON_COM_DeviceInfo.WizardTNCDisable");;
}

function getPageCfg() {
	//TODO: remove this function, it's just for debug.
	return print("0");
}

function getVer() {
	//for debug, we don't want to cache
	return print("?v=".substr(time(), 0, -2));
}

function bodyBegin($fetchData, $helpName, $headerMlang, $headerName, $preFilloutCallback, $postFilloutCallback) {

	return print(sprintf('
    <script language="javascript" type="text/javascript">
        $(document).ready(function()
        {
            fetchData(\'target\', \'%s\', \'%s\', \'%s\');
        });
    </script>
    <body onload="window.top.change_size($(this));loadhelp(\'%s\',\'\');" class="page-body" onResize="window.top.change_size($(this));">
	<div class="page-header" style="position: relative;" mlang="%s">%s</div>
	<form id="target"  name="formname" method="POST" >
	<input type="hidden" name="buttonHit">
	<input type="hidden" name="buttonValue">'
	, $fetchData, $preFilloutCallback, $postFilloutCallback, $helpName, $headerMlang, $headerName));
}

function bodyEnd($btnType, $refreshUrl) {
	return genDefaultBtns($btnType, $refreshUrl).genHelpSection();
}

function genDefaultBtns($btnType, $refreshUrl) {
	if ($btnType === 1) {
		return print(sprintf('
			<!-- btns -->
			<div class="form-btn-row">
				<button type="button" value="test"  onClick="formSubmit($(this));" name="Test" id="test" class="button-common common_bt" mlang="SWP045" >Test</button>
				<button type="button" value="BUTTON"  onClick="location.href=\'%s\';" name="Cancel" id="cancel" class="button-cancel cancel_bt" mlang="UAS021">Cancel</button>
				<button type="button" value="apply"  onClick="formSubmit($(this))" name="apply" id="apply" class="button-apply apply_bt" mlang="LUP004" >Apply</button>
			</div>
			</form>'
			, $refreshUrl));
	} else if ($btnType === 2){
		return print(sprintf('
			<!-- btns -->
			<div class="form-btn-row">
			</div>
			</form>'
			));
	} else {
		return print(sprintf('
			<!-- btns -->
			<div class="form-btn-row" id="form_btn_div">
				<button type="button" value="BUTTON"  onClick="location.href=\'%s\';" name="Cancel" id="cancel" class="button-cancel cancel_bt" mlang="UAS021">Cancel</button>
				<button type="button" value="apply"  onClick="formSubmit($(this))" name="apply" id="apply" class="button-apply apply_bt" mlang="LUP004" >Apply</button>
			</div>
			</form>'
			, $refreshUrl));
	}
}

function genHelpSection() {
  return print('
    <div class="help-section">
      <div class="help-frame-div" >
          <iframe id="helpframe" class="help-iframe" scrolling="no" name="helpframe" frameborder="0">
          </iframe>
	  </div>
	  <div class="help-btns">
	    <div class="subhead2-bottom" >
	    <span style="float:left;padding-left:10px;padding-top:5px">
	      <img src="images/help-icon.png" onmouseover="changeCursorPointer();" onclick="showHelpIframe();" onmouseout="changeCursorDefault();">
	    </span>
	    <span class="subhead2-text" style="float:left;padding-left:3px;" onclick="showHelpIframe();" onmouseover="changeCursorPointer();" onmouseout="changeCursorDefault();" mlang="genie_51" >
	      Help Center
	    </span>
	    <span class="button-help-arrow">
	      <img src="images/helparrowup-icon.png" id="help-button" onclick="showHelpIframe();" onmouseover="changeCursorPointer();" onmouseout="changeCursorDefault();" >
	    </span>
	    <span class="subhead2-text" style="text-decoration:underline;float:right;padding-right:10px" onclick="showHelpIframe();" onmouseover="changeCursorPointer();" onmouseout="changeCursorDefault();" mlang="genie_51" >
	      Help Center
	    </span>
	 	</div>
		</div>
	</div>
	</body>');
}

function getDeviceMode()
{
    return db_get("Device.X_PEGATRON_COM_DeviceInfo.OperationMode");
}

function getNmrpRegion()
{
    return db_get("Device.X_PEGATRON_COM_DeviceInfo.Region");
}

function getNmrpSKU()
{
    return db_get("Device.X_PEGATRON_COM_DeviceInfo.SKU");
}

function getParentalControl()//to do, same as opendns_parental_ctrl;
{
    $PC_setting = "";
    if($PC_setting === "true")
        return "1";
    else
        return "0";
}

function getFwAutoUpdateEnable()
{
    return db_get("Device.X_PEGATRON_COM_DeviceInfo.AutoUpdate") == "1" ? "true" : "false";
}

function getFwCheckStart($onWizard)
{
    if($onWizard == 1)
    {
        $cmd_str= "pufwUpgrade -i";
    }
    else
    {
        $cmd_str= "pufwUpgrade -g";
    }
    exec($cmd_str, $res, $status);
    return $status;
}

function isForceUpdate()
{
    $filePath = "/tmp/forceUpdate";
    if(!file_exists($filePath))
    {
        return "false";
    }
    else
    {
        return "true";
    }
}
function is_newFW_available()
{
    $filePath = "/data/fwLastChecked";
    if(!file_exists($filePath))
    {
        return "0";  
    }
    
    $fp =  fopen($filePath, 'r');
    if($fp)
    {
        $lines = array();
        while(!feof($fp))
        {
            $line = trim(fgets($fp), "\n");
            $obj = explode('=',$line);
            $lines[$obj[0]] = $obj[1];
        }
        fclose($fp);
    }
    else {
        return "0";
    }
        
    return $lines["updateRequired"];
}

function getFwCheckResult($onWizard)
{
    if(getFwCheckStart($onWizard) == 0)
    {
        $filePath = "/data/fwLastChecked";
        if(!file_exists($filePath))
        {
            $ret = array();
            $ret["updateRequired"] = "0";
            $ret["isNewLanguage"] = "0";
            return $ret;  
        }
        else
        {
            $fp =  fopen($filePath, 'r');
            if($fp)
            {
                $lines = array();
                while(!feof($fp))
                {
                    $line = trim(fgets($fp), "\n");
                    $obj = explode('=',$line);
                    $lines[$obj[0]] = $obj[1];
                }
                $notePath = "/tmp/fw/dl_fw_msg";
                if(!file_exists($notePath))
                {
                    $lines["note"] = " "; 
                }
                else
                {
                    $lines["note"] = nl2br(file_get_contents($notePath));
                }
                fclose($fp);
                return $lines;
            }
        }
    }

    /*
    newFWVersion=
    updateRequired=0
    lastChecked=1604536526
    FwCheckStatus=-2
    Img_file=RAX30-V1.0.0.0_1.0.0.img
    Img_md5=d9cb9ba5ed53eccc572f69ec869833c1
    Img_ftpsite=https://http.fw.updates1.netgear.com/rax30/auto
    Img_size=38805712
    FwUpgradeStatus=4
    DL_S=0
    DL_ST=0
    lastDL_sku=ww
    */
}

function getFwDownloadStart()
{
    $cmd_str= "pufwUpgrade -D";
    exec($cmd_str, $res, $status);
    return $status;
}

function getFwDownloadResult()
{
    if(getFwDownloadStart()==0)
    {
        $filePath = "/data/fwLastChecked";
        if(!file_exists($filePath))
        {
            $ret = array();
            $ret["FwUpgradeStatus"] = "Fail";
            return $ret;  
        }
        else
        {
            $fp =  fopen($filePath, 'r');
            if($fp)
            {
                $lines = array();
                while(!feof($fp))
                {
                    $line = trim(fgets($fp), "\n");
                    $obj = explode('=',$line);
                    $lines[$obj[0]] = $obj[1];
                }
                fclose($fp);
                return $lines;
            }
        }
    }
}

function getFwUpgradeStart()
{
    if(getDefaultState() === "1")
    {
        $cmd_str= "touch /data/wizardFwUpgradeInProgress";
        exec($cmd_str, $res, $status);
        $cmd_str= "rm /data/wizardWifiConfigured";
        exec($cmd_str, $res, $status);
    }
    sleep(3);
    $cmd_str= "pufwUpgrade -W";
    exec($cmd_str, $res, $status);
    return $status;
}

function getFwUpgradeResult()
{

    if(getFwUpgradeStart()==0)
    {
        $filePath = "/data/fwLastChecked";
        if(!file_exists($filePath))
        {
            $ret = array();
            $ret["FwUpgradeStatus"] = "Fail";
            return $ret;  
        }
        else
        {
            $fp =  fopen($filePath, 'r');
            if($fp)
            {
                $lines = array();
                while(!feof($fp))
                {
                    $line = trim(fgets($fp), "\n");
                    $obj = explode('=',$line);
                    $lines[$obj[0]] = $obj[1];
                }
                fclose($fp);
                return $lines;
            }
        }
    }
}

function getFwUpgradeCancel()
{
    $cmd_str= "kill `pidof pufwUpgrade`";
    return exec($cmd_str, $res, $status);
    
}
function getMlangIndexByRegion($region)
{
    $index_List = array(
        "AF" => [ "Africa", "SWS003"],
        "TH" => [ "Asia", "SWS004"],
        "AU" => [ "Australia", "SWS005"],
        "CA" => [ "Canada", "SWS006"],
        "CN" => [ "China", "PCVP_046"],
        "EU" => [ "Europe", "SWS007"],
        "IN" => [ "India", "3G32"],
        "IL" => [ "Israel", "SWS008"],
        "JP" => [ "Japan", "SWS009"],
        "KO" => [ "Korea", "SWS010"],
        "MY" => [ "Malaysia", "3G35"],
        "MX" => [ "Mexico", "SWS012"],
        "DZ" => [ "Middle East(Algeria/Syria/Yemen)", "SWS082"],
        "QA" => [ "Middle East(Iran/Lebanon/Qatar)", "SWS083"],
        "KW" => [ "Middle East(Egypt/Tunisia/Kuwait)", "PCVP_047"],
        "TR" => [ "Middle East(Turkey)", "PCVP_048"],
        "AE" => [ "United Arab Emirates", "PCVP_049"],
        "RU" => [ "Russia", "3G43"],
        "SG" => [ "Singapore", "3G44"],
        "BR" => [ "South America", "SWS013"],
        "TW" => [ "Taiwan", "3G49"],
        "US" => [ "United States", "SWS015"],
        "HK" => [ "Hong Kong", "3G30" ],
    );
  return $index_List[$region][1];
}

function getWanLanConflictFile()
{
    if(file_exists('/var/conflict_alarm'))
        return 1;
    else
		return 0;
}

function removeWanLanConflictFile()
{
    $cmd_str = "rm /var/conflict_alarm";
    exec($cmd_str , $res, $status);

    return 1;
}

function getFwUploadResult()
{
        $filePath = "/tmp/fw/guiCheck";
        if(!file_exists($filePath))
        {
            $ret = array();
            $ret["fwChecked"] = "0";
            return $ret;  
        }
        else
        {
            $fp =  fopen($filePath, 'r');
            if($fp)
            {
                $lines = array();
                while(!feof($fp))
                {
                    $line = trim(fgets($fp), "\n");
                    $obj = explode('=',$line);
                    $lines[$obj[0]] = $obj[1];
                }
                $lines["fwChecked"] = "1";
                fclose($fp);
                return $lines;
            }
        }
}

function getNightHawkAppAdDisable()
{
    return db_get("Device.X_PEGATRON_COM_DeviceInfo.NightHawkAdDisable"); 
}

function getApModeHint()
{
    $mode =  db_get("Device.X_PEGATRON_COM_DeviceInfo.OperationMode");
    if($mode === "AP")
    {
        return '<font color="#EEDA00" mlang="MRS078"></font><font color="#EEDA00">:</font><font color="#EEDA00" mlang="ATM080"></font>';
    }
    else
    {
        return "";
    }    
}

function generate_EmbedProgressBar()
{
    return print('    
        <div class="form-group" id="pgbar-div" style="display:none;height:600px;overflow:auto;scrolling:auto">
            <div class="form-row prgbar">
                <h1 name="barTitle" id="pls_wait_div" mlang="D-genie_377">Rebooting the router now, please wait ?K</h1>
            </div>
            <div class="form-row prgbar">
                <input type="text" name="progress" id="progressEmbed" value="" disabled />
            </div>
            <div class="divider">&nbsp;</div>
        </div>');
}

function generate_LoadingIcon()
{
    return print('
        <div name="loadingIcon" id="progress" align="center" style="position: absolute; left: 35%; top: 40%; margin-left: -225px; width: 634px; max-height: 280px; z-index: 10001;">
            <img frameborder="0" border="0" src="/images/wait.gif"></img>
            <br>
            <span mlang="SWP011">Please wait a moment...</span>
        </div>');
}

function getOperationMode()
{
    $mode = getRadioVal_mode();
    if($mode === "router")
      return '<span mlang="genie_1091">Router<span>';
    else if($mode === "ap")
      return '<span mlang="genie_1092">AP<span>';
    else if($mode === "bridge")
      return '<span mlang="M-genie_33">Bridge<span>';
}

function getCpuLoad()
{
    $lookup_cmd = 'top -n 1 -l2';
    $output= shell_exec($lookup_cmd );
    $rows = explode("\n", $output);
    $cols = preg_split('/\s+/', trim($rows[1]));
    return $cols[1];
}

function getmemoryUsage()
{
    $lookup_cmd = 'top -n 1 -l2';
    $output= shell_exec($lookup_cmd );
    $rows = explode("\n", $output);
    $cols = preg_split('/\s+/', trim($rows[0]));
    $used = round(preg_replace("/[a-zA-Z]/", "",$cols[1])/1024);
    //$total = preg_replace("/[a-zA-Z]/", "",$cols[3]) + $used;
    return $used."MB/512MB";
}

function getflashUsage()
{
    $lookup_cmd = 'df -P /data';
    $output= shell_exec($lookup_cmd );
    $rows = explode("\n", $output);
    $cols = preg_split('/\s+/', trim($rows[1]));
    return round($cols[2]/1024)."MB/64MB";
}

function getSysUptime()
{
    $lookup_cmd = "cat /proc/uptime | awk '{printf $1}'";
    $output = shell_exec($lookup_cmd );
    $output = (int)$output;
    $dtF = new \DateTime('@0');
    $dtT = new \DateTime("@$output");
    return $dtF->diff($dtT)->format('%a <span mlang="ATM005">Days</span> %H:%I:%S');
    //return date("H:i:s", $output);
}

function _genCsrfTokenFilePhp($input, $filename)
{
    $csrftoken = mt_rand(10000000,mt_getrandmax());//8 to 16 ditids
    $file = fopen($filename, "w");
    fwrite($file, $csrftoken.PHP_EOL);
    fclose($file);

    if($input == "noOutput")
        return ;

    if($input == "tokenNumber")
        return $csrftoken;

    if($input == "inlineHTML" )
        return print( sprintf('<input type="hidden" name="csrftokenJs" value="%s">',$csrftoken) );
}

function genCsrfTokenFilePhp($input)
{
    return _genCsrfTokenFilePhp($input, "/var/CsrfTokenFile");
}

function genCsrfTokenTopFilePhp($input)
{
    return _genCsrfTokenFilePhp($input, "/var/CsrfTokenFile_top");
}

function genCsrfTokenSubFilePhp($input)
{
    return _genCsrfTokenFilePhp($input, "/var/CsrfTokenFile_sub");
}

function genCsrfTokenSub2FilePhp($input)
{
    return _genCsrfTokenFilePhp($input, "/var/CsrfTokenFile_sub2");
}


function getCircleActivationStatus()
{
    # Disable SPC at PR SKU
    if (getNmrpSKU() == "PR")
    {
        return "none";
    }

    # If not support SPC, then return 'none' directly
    $filePath = "/etc/ntgr_spc_config.ini";
    if(!file_exists($filePath))
    {
        return "none";
    }

    $mode = db_get("Device.X_PEGATRON_COM_DeviceInfo.OperationMode");

    if ($mode == "RT")
    {
        $lookup_cmd = "d2 circleStatus.activationStatus | awk '{printf $2}'";
        $output= shell_exec($lookup_cmd );
        return $output;
    }
    else
    {
        return "none";
    }
}
?>

