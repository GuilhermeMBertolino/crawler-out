<?
include_once 'ddns.php';
include_once 'interface.php';
include_once 'utf8ize.php';

$dbg = FALSE;

function getAccessMethodTable()
{
    //$table_path = "Device.Services.StorageService.1.Capabilites";
    $table_path = "Device.Services.StorageService.1.NetworkServer";
    $json = db_getObj($table_path);
    if($json === FALSE)
    {
        return ;  
    }
    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) 
    {
        printf("JSON Error: %s", json_last_error_msg());
    }

    
    $ddnsStatus = db_get("Device.X_BROADCOM_COM_DDnsCfg.1.Status");
    if ($ddnsStatus == "HostnameUpdateSucess")
    {
        $domainIp = getTextVal_hostName();
        if(getSelectVal_ddnsService() === "netgear")
        {
            $domainIp .= ".mynetgear.com";
        }
    }
    else
    {
        $domainIp = getWanInstanceIpAddr();
    }

    if($domainIp == "")
    {
        $domainIp = "0.0.0.0";
    }

    $httpsPortStr = "";
    $ftpPortStr = "";

    if($data[$table_path][0]["X_PEGATRON_COM_HttpsPort"] !=  "443")
    {
        $httpsPortStr = ":".$data[$table_path][0]["X_PEGATRON_COM_HttpsPort"];
    }

    if($data[$table_path][0]["X_PEGATRON_COM_FtpWanPort"] != "21")
    {
        $ftpPortStr = ":".$data[$table_path][0]["X_PEGATRON_COM_FtpWanPort"];
    }

    $devName = getUsbSysDeviceName();

    $obj1 = (object) array("index"=>1, "enableName"=>"enableSamba", "enableId"=>"enable_net", "enableValue"=>($data[$table_path][0]["SMBEnable"] == 1)?"true":"false", "enableChecked"=>($data[$table_path][0]["SMBEnable"] == 1)?"checked":"", "method"=>'mlang="UAS006">Network Connection',"linkId"=> "", "linkStr"=>"\\\\".getUsbSysDeviceName(), "linkhref"=>"", "linkStyle"=>"style=\"text-decoration:none;\"", "portName"=>"", "portId"=>"", "portValue"=>"-", "portStyle"=>"style=\"border-bottom: none !important;-webkit-text-fill-color: black !important;\" disabled", "protectionName"=>"enableSambaPwd", "protectionId"=>"passwd_samba", "protectionValue"=>($data[$table_path][0]["X_PEGATRON_COM_SMBPwdEnable"] == 1)?"true":"false", "protectionChecked"=>($data[$table_path][0]["X_PEGATRON_COM_SMBPwdEnable"] == 1)?"checked":"");
    $obj2 = (object) array("index"=>2, "enableName"=>"enableHttp", "enableId"=>"enable_http", "enableValue"=>($data[$table_path][0]["X_PEGATRON_COM_HttpEnable"] == 1)?"true":"false", "enableChecked"=>($data[$table_path][0]["X_PEGATRON_COM_HttpEnable"] == 1)?"checked":"", "method"=>'>HTTP',"linkId"=> "link_http", "linkStr"=>"http://".$devName.".routerlogin.net/shares", "linkhref"=>"href=\"http://".$devName.".routerlogin.net/shares\"", "linkStyle"=>"style=\"text-decoration:underline!important; \"", "portName"=>"", "portId"=>"", "portValue"=>"80", "portStyle"=>"style=\"border-bottom: none !important;-webkit-text-fill-color: black !important;\" disabled", "protectionName"=>"enableHttpPwd", "protectionId"=>"passwd_http", "protectionValue"=>($data[$table_path][0]["X_PEGATRON_COM_HttpPwdEnable"] == 1)?"true":"false", "protectionChecked"=>($data[$table_path][0]["X_PEGATRON_COM_HttpPwdEnable"] == 1)?"checked":"");
    if($domainIp == "0.0.0.0") {
        $obj3 = (object) array("index"=>3, "enableName"=>"enableHttps", "enableId"=>"enable_http_via", "enableValue"=>($data[$table_path][0]["X_PEGATRON_COM_HttpsEnable"] == 1)?"true":"false", "enableChecked"=>($data[$table_path][0]["X_PEGATRON_COM_HttpsEnable"] == 1)?"checked":"", "method"=>'>HTTPS(<span mlang="UAS009">via internet</span>)',"linkId"=> "link_http_via", "linkStr"=>"https://{$domainIp}{$httpsPortStr}/shares", "linkhref"=>"", "linkStyle"=>"style=\"text-decoration:none; \"","portName"=>"httpsPort", "portId"=>"http_via_port", "portValue"=>$data[$table_path][0]["X_PEGATRON_COM_HttpsPort"], "portStyle"=>"", "protectionName"=>"enableHttpsPwd", "protectionId"=>"passwd_http_via", "protectionValue"=>($data[$table_path][0]["X_PEGATRON_COM_HttpsPwdEnable"] == 1)?"true":"false", "protectionChecked"=>($data[$table_path][0]["X_PEGATRON_COM_HttpsPwdEnable"] == 1)?"checked":"");
    }
    else {
        $obj3 = (object) array("index"=>3, "enableName"=>"enableHttps", "enableId"=>"enable_http_via", "enableValue"=>($data[$table_path][0]["X_PEGATRON_COM_HttpsEnable"] == 1)?"true":"false", "enableChecked"=>($data[$table_path][0]["X_PEGATRON_COM_HttpsEnable"] == 1)?"checked":"", "method"=>'>HTTPS(<span mlang="UAS009">via internet</span>)',"linkId"=> "link_http_via", "linkStr"=>"https://{$domainIp}{$httpsPortStr}/shares", "linkhref"=>"href=\"https://{$domainIp}{$httpsPortStr}/shares\"", "linkStyle"=>"style=\"text-decoration:underline!important; \"", "portName"=>"httpsPort", "portId"=>"http_via_port", "portValue"=>$data[$table_path][0]["X_PEGATRON_COM_HttpsPort"], "portStyle"=>"", "protectionName"=>"enableHttpsPwd", "protectionId"=>"passwd_http_via", "protectionValue"=>($data[$table_path][0]["X_PEGATRON_COM_HttpsPwdEnable"] == 1)?"true":"false", "protectionChecked"=>($data[$table_path][0]["X_PEGATRON_COM_HttpsPwdEnable"] == 1)?"checked":"");
    }
    $obj4 = (object) array("index"=>4, "enableName"=>"enableFtp", "enableId"=>"enable_ftp", "enableValue"=>($data[$table_path][0]["X_PEGATRON_COM_FtpEnable"] == 1)?"true":"false", "enableChecked"=>($data[$table_path][0]["X_PEGATRON_COM_FtpEnable"] == 1)?"checked":"", "method"=>">FTP","linkId"=> "link_ftp", "linkStr"=>"ftp://".$devName.".routerlogin.net/shares", "linkhref"=>"href=\"ftp://".$devName.".routerlogin.net/shares\"", "linkStyle"=>"style=\"text-decoration:underline!important; \"", "portName"=>"", "portId"=>"", "portValue"=>"21", "portStyle"=>"style=\"border-bottom: none !important;-webkit-text-fill-color: black !important;\" disabled", "protectionName"=>"enableFtpPwd", "protectionId"=>"passwd_ftp", "protectionValue"=>($data[$table_path][0]["X_PEGATRON_COM_FtpPwdEnable"] == 1)?"true":"false", "protectionChecked"=>($data[$table_path][0]["X_PEGATRON_COM_FtpPwdEnable"] == 1)?"checked":"");

    if($domainIp == "0.0.0.0") {
        $obj5 = (object) array("index"=>5, "enableName"=>"enableFtpWan", "enableId"=>"enable_ftp_via", "enableValue"=>($data[$table_path][0]["X_PEGATRON_COM_FtpWanEnable"] == 1)?"true":"false", "enableChecked"=>($data[$table_path][0]["X_PEGATRON_COM_FtpWanEnable"] == 1)?"checked":"", "method"=>'>FTP(<span mlang="UAS009">via internet</span>)',"linkId"=> "link_ftp_via","linkStr"=>"ftp://{$domainIp}{$ftpPortStr}/shares", "linkhref"=>"", "linkStyle"=>"style=\"text-decoration:none; \"","portName"=>"ftpWanPort", "portId"=>"ftp_via_port", "portValue"=>$data[$table_path][0]["X_PEGATRON_COM_FtpWanPort"], "portStyle"=>"", "protectionName"=>"enableFtpWanPwd", "protectionId"=>"passwd_ftp_via", "protectionValue"=>($data[$table_path][0]["X_PEGATRON_COM_FtpWanPwdEnable"] == 1)?"true":"false", "protectionChecked"=>($data[$table_path][0]["X_PEGATRON_COM_FtpWanPwdEnable"] == 1)?"checked":"");
    }
    else {
        $obj5 = (object) array("index"=>5, "enableName"=>"enableFtpWan", "enableId"=>"enable_ftp_via", "enableValue"=>($data[$table_path][0]["X_PEGATRON_COM_FtpWanEnable"] == 1)?"true":"false", "enableChecked"=>($data[$table_path][0]["X_PEGATRON_COM_FtpWanEnable"] == 1)?"checked":"", "method"=>'>FTP(<span mlang="UAS009">via internet</span>)',"linkId"=> "link_ftp_via", "linkStr"=>"ftp://{$domainIp}{$ftpPortStr}/shares", "linkhref"=>"href=\"ftp://{$domainIp}{$ftpPortStr}/shares\"", "linkStyle"=>"style=\"text-decoration:underline!important; \"", "portName"=>"ftpWanPort", "portId"=>"ftp_via_port", "portValue"=>$data[$table_path][0]["X_PEGATRON_COM_FtpWanPort"], "portStyle"=>"", "protectionName"=>"enableFtpWanPwd", "protectionId"=>"passwd_ftp_via", "protectionValue"=>($data[$table_path][0]["X_PEGATRON_COM_FtpWanPwdEnable"] == 1)?"true":"false", "protectionChecked"=>($data[$table_path][0]["X_PEGATRON_COM_FtpWanPwdEnable"] == 1)?"checked":"");
    }
    $json = (object) array("Device.Services.StorageService.1.NetworkServer" => array($obj1, $obj2, $obj3, $obj4, $obj5));
    $json = json_encode($json);
    

    $data= json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
    }
    $output_value = new stdClass();
    foreach($data[$table_path] as $inst)
    {
            $output_value->{$inst["index"]} = (object) null;
            $output_value->{$inst["index"]}->__enableName = $inst["enableName"];
            $output_value->{$inst["index"]}->__enableId = $inst["enableId"];
            $output_value->{$inst["index"]}->__enableValue = $inst["enableValue"];
            $output_value->{$inst["index"]}->__enableChecked = $inst["enableChecked"];
            $output_value->{$inst["index"]}->__method = $inst["method"];
            $output_value->{$inst["index"]}->__linkId = $inst["linkId"];
                $output_value->{$inst["index"]}->__linkText = $inst["linkStr"];
                $output_value->{$inst["index"]}->__linkhref = $inst["linkhref"];
                $output_value->{$inst["index"]}->__linkStyle = $inst["linkStyle"];
            $output_value->{$inst["index"]}->__portName = $inst["portName"];
            $output_value->{$inst["index"]}->__portId = $inst["portId"];
            $output_value->{$inst["index"]}->__portValue = $inst["portValue"];
            $output_value->{$inst["index"]}->__portStyle = $inst["portStyle"];
            $output_value->{$inst["index"]}->__protectionName = $inst["protectionName"];
            $output_value->{$inst["index"]}->__protectionId = $inst["protectionId"];
            $output_value->{$inst["index"]}->__protectionValue = $inst["protectionValue"];
            $output_value->{$inst["index"]}->__protectionChecked = $inst["protectionChecked"];
    }
    return $output_value;
}

function getPhysicalMediumInstanceBySerialNum($sn)
{
    $physicalMedium_path = "Device.Services.StorageService.1.PhysicalMedium";
    $instance_list = db_getInstIDList($physicalMedium_path); 
    
    if($instance_list !== FALSE)
    {
        $instance_list = json_decode($instance_list,true);
        foreach($instance_list[$physicalMedium_path] as $inst_id)
        { 
            if(db_get("Device.Services.StorageService.1.PhysicalMedium.{$inst_id}.X_PEGATRON_COM_SerialNumber") == $sn)
            {
                return $inst_id;
            }  
        }
    }
    
    return "false";//not found
}

function getPhysicalMediumNameIndexBySerialNum($sn)
{
    $physicalMedium_path = "Device.Services.StorageService.1.PhysicalMedium";
    $instance_list = db_getInstIDList($physicalMedium_path); 
    
    if($instance_list !== FALSE)
    {
        $instance_list = json_decode($instance_list,true);
        foreach($instance_list[$physicalMedium_path] as $inst_id)
        { 
            if(db_get("Device.Services.StorageService.1.PhysicalMedium.{$inst_id}.X_PEGATRON_COM_SerialNumber") == $sn)
            {
                $physicalMediumName = db_get("Device.Services.StorageService.1.PhysicalMedium.{$inst_id}.Name");
                return explode("disk", $physicalMediumName)[1];
            }  
        }
    }
    
    return "false";//not found
}

function getPhysicalMediumStatusBySerialNum($sn)
{
    $physicalMedium_path = "Device.Services.StorageService.1.PhysicalMedium";
    $instance_list = db_getInstIDList($physicalMedium_path); 
    
    if($instance_list !== FALSE)
    {
        $instance_list = json_decode($instance_list,true);
        foreach($instance_list[$physicalMedium_path] as $inst_id)
        { 
            if(db_get("Device.Services.StorageService.1.PhysicalMedium.{$inst_id}.X_PEGATRON_COM_SerialNumber") == $sn)
            {
                $physicalMediumStatus = db_get("Device.Services.StorageService.1.PhysicalMedium.{$inst_id}.Status");
                return $physicalMediumStatus == "" ? "offline" : $physicalMediumStatus;
            }  
        }
    }
    
    return "offline";//not found
}

function getVolumeSpacebySerialNum($sn)
{
    $physicalMediumInst = getPhysicalMediumInstanceBySerialNum($sn);
    
    $volume_name = db_get("Device.Services.StorageService.1.LogicalVolume.{$inst_id}.Name");
    $volume_capacity = db_get("Device.Services.StorageService.1.LogicalVolume.{$inst_id}.Capacity");
    $volume_usedSpace = db_get("Device.Services.StorageService.1.LogicalVolume.{$inst_id}.UsedSpace");
    $disk_name = explode('_',$volume_name);
      
}

function getAvailableTable()
{
    $folder_path = "Device.X_PEGATRON_COM_ShareFolder.Folder";
    $json = db_getObj($folder_path);
    if($json === FALSE)
    {
        return ;  
    }
    $data = json_decode($json,true);
    $last_error = json_last_error();
    if ($last_error == JSON_ERROR_UTF8)
    {
	$clean_json = utf8ize($json);
	$data = json_decode($clean_json,true);
    }
    else if ($last_error != JSON_ERROR_NONE)
    {
        printf("JSON Error: %s", json_last_error_msg());
    }
    $index =0;
    $output_value = new stdClass();

    foreach($data[$folder_path] as $inst)
    {
        //$physicalMediumInst = getPhysicalMediumInstanceBySerialNum($inst["refSN"]);
        $physicalMediumInst = getPhysicalMediumNameIndexBySerialNum($inst["refSN"]);
        $physicalMediumStatus = getPhysicalMediumStatusBySerialNum($inst["refSN"]);
        if($physicalMediumInst != "false" && $physicalMediumStatus != "offline")//check physical device exist
        {
            $physicalName = "PhysicalMedium.".$physicalMediumInst;
            $volume_path  = "Device.Services.StorageService.1.LogicalVolume";
            $volume_instance_list = db_getInstIDList($volume_path); 
  
            if($volume_instance_list !== FALSE)
            {
                $volume_instance_list = json_decode($volume_instance_list,true);
                foreach($volume_instance_list[$volume_path] as $volume_inst_id)
                {   
                    $foundBinding = false;
                    $physicalReference = db_get("Device.Services.StorageService.1.LogicalVolume.{$volume_inst_id}.PhysicalReference");
                    
                    if($physicalName == $physicalReference)//check volume exist
                    {
                        //$folderBindPhysicalDiskOrder = explode("_", $inst["BrcmVolume"])[1];
                        //$volumePhysicalDiskName = db_get("Device.Services.StorageService.1.LogicalVolume.{$volume_inst_id}.Name");
                        //$volumePhysicalDiskOrder = explode("_", $volumePhysicalDiskName)[1];
                        $volumeUuid = db_get("Device.Services.StorageService.1.LogicalVolume.{$volume_inst_id}.X_PEGATRON_COM_Uuid");
                        $volumeDiskTotalSize = db_get("Device.Services.StorageService.1.LogicalVolume.{$volume_inst_id}.Capacity");
                        $volumeDiskUsedSize = db_get("Device.Services.StorageService.1.LogicalVolume.{$volume_inst_id}.UsedSpace");
                        $volumeFileSystem = db_get("Device.Services.StorageService.1.LogicalVolume.{$volume_inst_id}.FileSystem");
                        $volumeName = $inst["VolumeName"] == "" ? $volumeFileSystem : $inst["VolumeName"];
                        $inst["DeviceLetter"] = db_get("Device.Services.StorageService.1.LogicalVolume.{$volume_inst_id}.DeviceLetter");
                        //if($folderBindPhysicalDiskOrder === $volumePhysicalDiskOrder)//find binding partition 
                        if($inst["refUUID"] === $volumeUuid)
                        {
                            if(db_get("Device.Services.StorageService.1.LogicalVolume.{$volume_inst_id}.Status") == "online")
                            {
                                $foundBinding = true;
                                $usb_deviceName = getUsbSysDeviceName();
                                $index++;
                                $output_value->{$index} = (object) null;
                                $output_value->{$index}->__shareName = $inst["Enable"] == "0" ? "Not shared" : "\\\\".$usb_deviceName."\\".htmlentities($inst["ShareName"]);
                                $output_value->{$index}->__readText = $inst["ReadAccess"] == "1" ? "All- no password" : "admin";
                                $output_value->{$index}->__writeText = $inst["WriteAccess"] == "1" ? "All- no password" : "admin";
                                $output_value->{$index}->__folderName = $inst["FolderName"] == " " ? $inst["DeviceLetter"].":\\" : $inst["DeviceLetter"].":\\".preg_replace('/[\/]+/','\\',$inst["FolderName"]);
                                $output_value->{$index}->__volumeName = htmlentities($volumeName);
                                $output_value->{$index}->__total = getStorageSizeUnit($volumeDiskTotalSize);
                                $output_value->{$index}->__free = getStorageSizeUnit($volumeDiskTotalSize - $volumeDiskUsedSize);
                                $output_value->{$index}->__usbDevice = htmlentities($inst["DeviceLetter"].":"."(".$volumeName.")");
                                $output_value->{$index}->__fileSystem = $volumeFileSystem;
                                $output_value->{$index}->__shareFolder = htmlentities($inst["ShareName"]);
                                $output_value->{$index}->__readAccess = $inst["ReadAccess"] == "1" ? "true" : "false";
                                $output_value->{$index}->__writeAccess = $inst["WriteAccess"] == "1" ? "true" : "false";
                                $output_value->{$index}->__diskName = $inst["BrcmVolume"];
                                $output_value->{$index}->__PhyName = $physicalName."|".$physicalReference;
                                //$output_value->{$index}->__DiskOrder = $folderBindPhysicalDiskOrder."|".$volumePhysicalDiskOrder;
                            }
                        }
                    }
                    if($foundBinding == true)
                        break;
                }
            }
        } 
    }

    return $output_value;
}

function getVolumeList()
{
    $volume_path  = "Device.Services.StorageService.1.LogicalVolume";
    $volume_instance_list = db_getInstIDList($volume_path); 
    
    if($volume_instance_list !== FALSE)
    {
        $output_value = "";
        $volume_instance_list = json_decode($volume_instance_list,true);
        foreach($volume_instance_list[$volume_path] as $volume_inst_id)
                {
            $deivceLetter = db_get("Device.Services.StorageService.1.LogicalVolume.{$volume_inst_id}.DeviceLetter");;
            $fileSystem = db_get("Device.Services.StorageService.1.LogicalVolume.{$volume_inst_id}.FileSystem");
            $diskName =  db_get("Device.Services.StorageService.1.LogicalVolume.{$volume_inst_id}.Name"); 
            $volumeFileSystem = db_get("Device.Services.StorageService.1.LogicalVolume.{$volume_inst_id}.FileSystem");
            $optionText = $deivceLetter.":(".$fileSystem.")";
            $output_value .= "<option value=\"{$diskName}\" format=\"{$volumeFileSystem}\">{$optionText}</option>";
        }
    }
    
    return $output_value;
}

function getUsbListTable()
{
    $medium_path  = "Device.Services.StorageService.1.PhysicalMedium";
    $medium_instance_list = db_getInstIDList($medium_path); 
    
    if($medium_instance_list !== FALSE)
    {
        $medium_instance_list = json_decode($medium_instance_list,true);
        $output_value = new stdClass();
        $usb_deviceName = getUsbSysDeviceName();
        foreach($medium_instance_list[$medium_path] as $inst_id)
        {
            if(db_get("Device.Services.StorageService.1.PhysicalMedium.{$inst_id}.Status") == "online")
            {
                $medium_vendor = db_get("Device.Services.StorageService.1.PhysicalMedium.{$inst_id}.X_PEGATRON_COM_Vendor");
                $medium_product = db_get("Device.Services.StorageService.1.PhysicalMedium.{$inst_id}.X_PEGATRON_COM_Product");
                $medium_name = db_get("Device.Services.StorageService.1.PhysicalMedium.{$inst_id}.Name");
                $index++;
                $output_value->{$index} = (object) null;
                $output_value->{$index}->__index = $index;
                $output_value->{$index}->__disk = $medium_name;
                $output_value->{$index}->__deviceName = $medium_vendor === "" ? ("USB_vendor".$index) : $medium_vendor;
                $output_value->{$index}->__productName = $medium_product === "" ? ("Storage".$index) : $medium_product;
                $output_value->{$index}->__volume_name = $medium_vendor === "" ? ("USB_vendor".$index) : $medium_vendor;
            }  
        }
    }
    
    return $output_value;
}

function getUsbSysDeviceName()
{
    $usb_deviceName = db_get("Device.Services.StorageService.1.NetworkServer.X_PEGATRON_COM_NetworkName");
    
    return $usb_deviceName === "" ? "readyshare" : $usb_deviceName;
}

function getUsbWorkGroup()
{
    return db_get("Device.Services.StorageService.1.NetworkServer.X_PEGATRON_COM_Workgroup");
}

function getUsbPhyNumber()
{
    return db_get("Device.Services.StorageService.1.PhysicalMediumNumberOfEntries");
}

function getUsbRegistrationState()
{
  return "1";
}

function getStorageSizeUnit($bytes, $precision = 2)
{
    $units = array('MB', 'GB', 'TB');
    $bytes = max($bytes, 0);
    if($bytes == 0)
     return "0 MB";
    $pow = floor(log($bytes) / log(1024));
    $pow = min($pow, count($units) - 1);
    return round($bytes/pow(1024,$pow), $pow+2).' '.$units[$pow];
}

function getBrowseFolders($path)
{
    $scanpath = "/mnt/{$path}/*";
    //$scan = preg_grep('/^([^.$])/',scandir($scanpath));
    $scan = preg_grep('/^([^.$*])/',glob($scanpath,GLOB_ONLYDIR));
    $folders = "";
    foreach($scan as $dir)
    {
        $folders .= "{$dir}\r\n";
        $result = getBrowseFolders(end(explode('/mnt/',$dir)));
        $folders .= $result."\r\n";
          //$folders .= $result == "" ? "{$dir}\r\n" : $result."\r\n";
          
    }
    return $folders;
    /*foreach($scan as $file)
    {
        if(!is_dir("{$path}/{$file}"))
        $folders .= "{$path}/{$file}";//.getBrowseFolders("{$path}/{$file}")."\r\n";
    }
    return $folders;*/
}

function getMediaServerEnable()
{
    $enable = db_get("Device.X_BROADCOM_COM_DLNA.DmsCfg.Enable");
    return $enable == "1" ? "true" : "false";
}
?>
