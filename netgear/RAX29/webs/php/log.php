<?
include_once 'common_utils.php';

function getCheckboxVal_allowedSite()
{
    $Offset_allowedSite = 0;
    $logCfg = intval(db_get("Device.X_BROADCOM_COM_SyslogCfg.LocalDisplayType"));
    $en = $logCfg & (1 << $Offset_allowedSite);

    return num_to_TrueFalseStr($en);
}

function getCheckboxVal_blockedSite()
{
    $Offset_blockedSite = 1;
    $logCfg = intval(db_get("Device.X_BROADCOM_COM_SyslogCfg.LocalDisplayType"));
    $en = $logCfg & (1 << $Offset_blockedSite);

    return num_to_TrueFalseStr($en);
}

function getCheckboxVal_webAccess()
{
    $Offset_webAccess = 2;
    $logCfg = intval(db_get("Device.X_BROADCOM_COM_SyslogCfg.LocalDisplayType"));
    $en = $logCfg & (1 << $Offset_webAccess);

    return num_to_TrueFalseStr($en);
}

function getCheckboxVal_routerOp()
{
    $Offset_routerOp = 3;
    $logCfg = intval(db_get("Device.X_BROADCOM_COM_SyslogCfg.LocalDisplayType"));
    $en = $logCfg & (1 << $Offset_routerOp);

    return num_to_TrueFalseStr($en);
}

function getCheckboxVal_knownAttack()
{
    $Offset_knownAttack = 4;
    $logCfg = intval(db_get("Device.X_BROADCOM_COM_SyslogCfg.LocalDisplayType"));
    $en = $logCfg & (1 << $Offset_knownAttack);

    return num_to_TrueFalseStr($en);
}

function getCheckboxVal_portForwarding()
{
    $Offset_portForwarding = 5;
    $logCfg = intval(db_get("Device.X_BROADCOM_COM_SyslogCfg.LocalDisplayType"));
    $en = $logCfg & (1 << $Offset_portForwarding);

    return num_to_TrueFalseStr($en);
}

function getCheckboxVal_wlan()
{
    $Offset_wlan = 6;
    $logCfg = intval(db_get("Device.X_BROADCOM_COM_SyslogCfg.LocalDisplayType"));
    $en = $logCfg & (1 << $Offset_wlan);

    return num_to_TrueFalseStr($en);
}

//function getCheckboxVal_internet()
//{
//    $Offset_internet = 7;
//    $logCfg = intval(db_get("Device.X_BROADCOM_COM_SyslogCfg.LocalDisplayType"));
//    $en = $logCfg & (1 << $Offset_internet);

//    return num_to_TrueFalseStr($en);
//}

function getCheckboxVal_wlanSchedule()
{
    $Offset_wlanSchedule = 8;
    $logCfg = intval(db_get("Device.X_BROADCOM_COM_SyslogCfg.LocalDisplayType"));
    $en = $logCfg & (1 << $Offset_wlanSchedule);

    return num_to_TrueFalseStr($en);
}

function getCheckboxVal_readyShare()
{
    $Offset_readyShare = 9;
    $logCfg = intval(db_get("Device.X_BROADCOM_COM_SyslogCfg.LocalDisplayType"));
    $en = $logCfg & (1 << $Offset_readyShare);

    return num_to_TrueFalseStr($en);
}

function getCheckboxVal_vpn()
{
    $Offset_vpn = 11;
    $logCfg = intval(db_get("Device.X_BROADCOM_COM_SyslogCfg.LocalDisplayType"));
    $en = $logCfg & (1 << $Offset_vpn);

    return num_to_TrueFalseStr($en);
}

function getTextVal_currentTime()
{
    //return db_get("Device.Time.CurrentLocalTime");
    return shell_exec("date +%c");
}
?>
