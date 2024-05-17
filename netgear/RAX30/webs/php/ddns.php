<?
include_once 'common_utils.php';
include_once 'interface.php';

function getCheckboxVal_enableDdns()
{
    $db_path = "Device.X_BROADCOM_COM_DDnsCfg";
    $json = db_getObj($db_path);
    if($json === FALSE)
    {
        return ;  
    }
    
    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
        return;
    }
    
    foreach($data[$db_path] as $inst)
    {
        $enable =  $inst["Enable"];
        return num_to_TrueFalseStr($enable);
    }
    
    return "";
}

function getSelectVal_ddnsService()
{  
    $db_path = "Device.X_BROADCOM_COM_DDnsCfg";
    $json = db_getObj($db_path);
    if($json === FALSE)
    {
        return ;  
    }
    
    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
        return;
    }
    
    foreach($data[$db_path] as $inst)
    {
        return $inst["ProviderName"];
    }
    
    return "";
}

function getRadioVal_haveNetgearAccount()
{
    $ddnsStatus = db_get("Device.X_BROADCOM_COM_DDnsCfg.1.Status");
    
    if ($ddnsStatus != "") {
        return "yes";
    }
    else {
        return "no";
    }
}

function getTextVal_hostName()
{ 
    $db_path = "Device.X_BROADCOM_COM_DDnsCfg";
    $json = db_getObj($db_path);
    if($json === FALSE)
    {
        return ;  
    }
    
    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
        return;
    }
    
    foreach($data[$db_path] as $inst)
    {
        return $inst["FullyQualifiedDomainName"];
    }
    
    return "";
}

function getTextVal_email()
{
    $db_path = "Device.X_BROADCOM_COM_DDnsCfg";
    $json = db_getObj($db_path);
    if($json === FALSE)
    {
        return ;  
    }
    
    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
        return;
    }
    
    foreach($data[$db_path] as $inst)
    {
        return $inst["UserName"];
    }
    
    return "";
}

function getTextVal_username()
{   
    $db_path = "Device.X_BROADCOM_COM_DDnsCfg";
    $json = db_getObj($db_path);
    if($json === FALSE)
    {
        return ;  
    }
    
    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
        return;
    }
    
    foreach($data[$db_path] as $inst)
    {
        return $inst["UserName"];
    }
    
    return "";
}

function getTextVal_password()
{  
    $db_path = "Device.X_BROADCOM_COM_DDnsCfg";
    $json = db_getObj($db_path);
    if($json === FALSE)
    {
        return ;  
    }
    
    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
        return;
    }
    
    foreach($data[$db_path] as $inst)
    {
        return $inst["Password"];
    }
    
    return "";
}

function getCheckboxVal_wildCards()
{
    $db_path = "Device.X_BROADCOM_COM_DDnsCfg";
    $json = db_getObj($db_path);
    if($json === FALSE)
    {
        return ;
    }

    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
        return;
    }

    foreach($data[$db_path] as $inst)
    {
        $wildCards =  $inst["WildCards"];
        return num_to_TrueFalseStr($wildCards);
    }

    return "";
}

function getMlangVal_msgNetgearUpdateFail()
{
    $errorCode = db_get("Device.X_BROADCOM_COM_DDnsCfg.1.ErrorCode");
    $internetStatus = getInternetStatusUpDown();
    
    if ($internetStatus == "Down") {
        //"The Internet connection is down, please connect to the Internet first"
        return "AQSE16";
    }
    
    if ($errorCode == "1") {
        //"Unable to reach the DDNS server, please check your Internet connection or try again later"
        return "ADDE20";
    }
    if ($errorCode == "2") {
        //"Unable to complete the job, reason:"
        return "ADDE19";
    }
    else if ($errorCode == "100") {
        //"The specified hostname is not a valid DNS name"
        return "ADDE11";
    }
    else if ($errorCode == "111") {
        //"The email/account specified does not exist"
        return "ADDE12";
    }
    else if ($errorCode == "101") {
        if (getRadioVal_haveNetgearAccount() == "yes") {
        //"Account authentication failed"
        return "ADDE14";
    }
        else if (getRadioVal_haveNetgearAccount() == "no") {
            //"The email has already been registered with a different password"
            return "ADDE13";
        }
    }
    else if ($errorCode == "113") {
        //"The specified hostname is not available"
        return "ADDE15";
    }
    else if ($errorCode == "115") {
        //"You have reached the maximum number of hostnames that you can create for this account, you can"  
        return "ADDE16";
    }
    else if ($errorCode == "200") {
        //"The email/account specified is banned by No-IP"
        return "ADDE35";
    }
    else if ($errorCode == "201") {
        //"The email/account specified is pending on activation, please try again in 30 seconds"
        return "ADDE36";
    }
    else {
        return "";
    }
}

function getMlangVal_msgNetgearUpdateFail_continue()
{
    $errorCode = db_get("Device.X_BROADCOM_COM_DDnsCfg.1.ErrorCode");
    
    if ($errorCode == "115") {
        //"click here"
        return "ADDE17";
    }
    else if ($errorCode == "2") {
        //Update failed for unknown reason. Will try again later.
        return "ADDE22";
    }
    else {
        return "";
    }
}

function getMlangVal_msgNetgearUpdateFail_continue2()
{
    $errorCode = db_get("Device.X_BROADCOM_COM_DDnsCfg.1.ErrorCode");
    
    if ($errorCode == "115") {
        //"to login to your account to upgrade your account or to remove an unwanted hostname"
        return "ADDE18";
    }
    else {
        return "";
    }
}
?>
