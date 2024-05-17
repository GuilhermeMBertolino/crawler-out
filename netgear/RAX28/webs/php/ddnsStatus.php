<?
function getMlang_ddnsStatus()
{   
    $status = db_get("Device.X_BROADCOM_COM_DDnsCfg.1.Status");
    $enable = db_get("Device.X_BROADCOM_COM_DDnsCfg.1.Enable");
    
    if ($enable == "0") {
        //"Dynamic DNS service is not enabled."
        $mlang = "ADD006";
        return $mlang;
    }
    
    if ($status == "ServiceNotEnable") {
        //"Dynamic DNS service is not enabled."
        $mlang = "ADD006";
    }
    else if ($status == "NoUpdateAction") {
        //"No update action. There is no IP address on the Internet port."
        $mlang= "ADD007";
    }
    else if ($status == "HostnameUpdateSucess") {
        //"updated successfully at"
        $mlang = "ADD008";
    }
    else if ($status == "HostnameError") {
        //"Update failed. Host Name is not correct."
        $mlang = "ADD010";
    }
    else if ($status == "AuthenticationFail") {
        //"Authentication failed. User Name/Password is not correct."
        $mlang = "ADDE31";
        
    }
    else if ($status == "HostnameUpdateFail") {
        //"Update failed. Feature unavailable."
        $mlang= "ADDE33";
    }
    
    return $mlang;
}

function getDdnsService()
{
    return db_get("Device.X_BROADCOM_COM_DDnsCfg.1.ProviderName");
}

function getDdnsHostname()
{
    return db_get("Device.X_BROADCOM_COM_DDnsCfg.1.FullyQualifiedDomainName");
}

function getDdnsddnsUpdatedTimestamp()
{
    return db_get("Device.X_BROADCOM_COM_DDnsCfg.1.UpdatedTimestamp");
}

?>
