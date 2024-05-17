<?
$dbg = FALSE;
/* Internal Common Functions Begin-------------------------------------> */
function num_to_TrueFalse($num)
{
    if ($num == "1")
    {
        return "true";
    }
    else
    {
        return "false";
    }
}
/* Internal Common Functions <-------------------------------------End */

function getQosState()
{
    $qos_state = db_get("Device.X_PEGATRON_COM_IQOS.Enable");
	return num_to_TrueFalse($qos_state);
}

// get QoS speed test mode
function getQoS_SpeedTestMethod()
{	
	return db_get("Device.X_PEGATRON_COM_IQOS.SpeedMode");
}

function getSpeedtestDown()
{
	$dlSpeed = floor(db_get("Device.X_PEGATRON_COM_IQOS.DownloadSpeed")/1000*100)/100;
	//return getQoS_SpeedTestMethod() == "speedtest" ?  $dlSpeed." Mbps": "0.00 Mbps";
	return getQoS_SpeedTestMethod() == "speedtest" ?  $dlSpeed: "0.00 ";
}

function getSpeedtestUp()
{
	$ulSpeed = floor(db_get("Device.X_PEGATRON_COM_IQOS.UploadSpeed")/1000*100)/100;
	//return getQoS_SpeedTestMethod() == "speedtest" ?  $ulSpeed." Mbps" : "0.00 Mbps";
	return getQoS_SpeedTestMethod() == "speedtest" ?  $ulSpeed : "0.00 ";
}

function getSpeedtestDown_hidden()
{
	return db_get("Device.X_PEGATRON_COM_IQOS.DownloadSpeed");
}

function getSpeedtestUp_hidden()
{
	return db_get("Device.X_PEGATRON_COM_IQOS.UploadSpeed");
}

function getManuallyDownSpeed()
{
	$dlSpeed = floor(db_get("Device.X_PEGATRON_COM_IQOS.DownloadSpeed")/1000*100)/100;
	//JYang, the number format would be 1000.00 not 1,000.00
	return getQoS_SpeedTestMethod() == "manually" ?  number_format($dlSpeed, 2, '.', ''): "0.00";
}

function getManuallyUpSpeed()
{
	$ulSpeed = floor(db_get("Device.X_PEGATRON_COM_IQOS.UploadSpeed")/1000*100)/100;
	//JYang, the number format would be 1000.00 not 1,000.00
	return getQoS_SpeedTestMethod() == "manually" ?  number_format($ulSpeed, 2, '.', ''): "0.00";
}

function getDownSpeed_hidden()
{
	//$dlSpeed = floor(db_get("Device.X_PEGATRON_COM_IQOS.DownloadSpeed")/1000*100)/100;	
	//return getQoS_SpeedTestMethod() == "manually" ? $dlSpeed : "0.00";
	return db_get("Device.X_PEGATRON_COM_IQOS.DownloadSpeed");
}

function getUpSpeed_hidden()
{
	//$ulSpeed = floor(db_get("Device.X_PEGATRON_COM_IQOS.UploadSpeed")/1000*100)/100;
	//return getQoS_SpeedTestMethod() == "manually" ? $ulSpeed : "0.00";
	return db_get("Device.X_PEGATRON_COM_IQOS.UploadSpeed");
}

function getWMM_Status($wifiType)
{
	if ($wifiType == 0) //2.4G WMM
	{
		$Wmm2G = db_get("Device.WiFi.AccessPoint.1.WMMEnable");
		return num_to_TrueFalse($Wmm2G);
	}
	else if ($wifiType == 1) 
	{
		$Wmm5G = db_get("Device.WiFi.AccessPoint.3.WMMEnable");
		return num_to_TrueFalse($Wmm5G);
	}
}

function getAutoUpdateEnable()
{
    return db_get("Device.X_PEGATRON_COM_IQOS.AutoUpdateDB") === "1"? "true": "false";
}

function getUpdateDbVersion()
{
    $lookup_cmd = "cat /proc/nk_policy |grep 'Ver'| cut -d- -f2|awk '{print $1}'  ";
    $output= shell_exec($lookup_cmd );
    return ' netgear-detection-db-v'.$output;   
}

function getUpdateDbDate()
{
    return ' May 29 2021';
}

function getQosDbCheckResult()
{
    if(getQosDbCheckStart() == 0)
    {
        $filePath = "/tmp/iqos/db_version";
        if(!file_exists($filePath))
        {
            $ret = array();
            $ret["iQoS_DBCheckStatus"] = "0";
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

    /*
    newDBVersion=
    currentDBVersion=
    currentDBreleaseDate=
    currentDBreleaseTimeStamp=0
    updateRequired=0
    iQoS_DBCheckStatus=-2
    lastIQoS_DL_url=https://http.fw.updates1.netgear.com/sw-apps/dynamic-qos/brcm-tm/RAX30/
    */
}

function getQosDbCheckStart()
{
    $cmd_str= "pu_iQoS_db_update -g";
    exec($cmd_str, $res, $status);
    return $status;
}

function getQosDbUpgradeResult()
{
    if(getQosDbUpgradeStart() == 0)
    {
        $filePath = "/tmp/iqos/db_version";
        if(!file_exists($filePath))
        {
            $ret = array();
            $ret["iQoS_DBUpgradeStatus"] = "0";
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

    /*
      currentDBVersion=
      currentDBreleaseDate=
      currentDBreleaseTimeStamp=0
      updateRequired=0
      iQoS_DBCheckStatus=-2
      lastIQoS_DL_url=https://http.fw.updates1.netgear.com/sw-apps/dynamic-qos/brcm-tm/RAX30/
      iQoS_DBUpgradeStatus=-2
    */
}

function getQosDbUpgradeStart()
{
    $cmd_str= "pu_iQoS_db_update -d";
    exec($cmd_str, $res, $status);
    return $status;
}

function getDownSpeedForAttachedDev()
{
    $dlSpeed = number_format((float)db_get("Device.X_PEGATRON_COM_IQOS.DownloadSpeed")/1000, 2, '.', '');
    return $dlSpeed;
}

function getUpSpeedForAttachedDev()
{
    $ulSpeed = number_format((float)db_get("Device.X_PEGATRON_COM_IQOS.UploadSpeed")/1000, 2, '.', '');
    return $ulSpeed;
}
?>
