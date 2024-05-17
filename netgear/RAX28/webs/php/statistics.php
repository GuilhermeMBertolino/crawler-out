<?
include_once 'commonCfg.php';
include_once 'wifi.php';
$dbg = FALSE;

function getInterfaceStatistics()
{   
    return getAllStats();
}



function getWanLinkMode()
{
    $wanInst = 2;
    //Steven, modify for mlang
    $linkMode = db_get("Device.Ethernet.Interface.{$wanInst}.DuplexMode");
    if($linkMode === "Full")
    {
        return db_get("Device.Ethernet.Interface.{$wanInst}.MaxBitRate")."M/".'<span class="thread" ;" mlang="MRS060">Full</span></span></div>';
    }
    else
    {
        return db_get("Device.Ethernet.Interface.{$wanInst}.MaxBitRate")."M/".'<span class="thread" ;" mlang="MRS061">Half</span></span></div>';
    }
}



function getLanLinkMode($lanInst)
{
    //Steven, modify for mlang
    $linkMode = db_get("Device.Ethernet.Interface.{$lanInst}.DuplexMode");
    if($linkMode === "Full")
    {
        return db_get("Device.Ethernet.Interface.{$lanInst}.MaxBitRate")."M/".'<span class="thread" ;" mlang="MRS060">Full</span></span></div>';
    }
    else
    {
        return db_get("Device.Ethernet.Interface.{$lanInst}.MaxBitRate")."M/".'<span class="thread" ;" mlang="MRS061">Half</span></span></div>'; 
    }
}

function getAllStats()
{
    $lookup_cmd = 'cat /proc/net/dev';
    $output= shell_exec($lookup_cmd );
    $rows = explode("\n", $output);
    $wanInst = 5;
    $lan1_Inst = 1;
    $lan2_Inst = 2;
    $lan3_Inst = 3;
    $lan4_Inst = 4;
    global $radio_2g, $radio_5g;
    $wanInterfaceName = db_get("Device.Ethernet.Interface.{$wanInst}.Name");
    $lan1_InterfaceName = db_get("Device.Ethernet.Interface.{$lan1_Inst}.Name");
    $lan2_InterfaceName = db_get("Device.Ethernet.Interface.{$lan2_Inst}.Name");
    $lan3_InterfaceName = db_get("Device.Ethernet.Interface.{$lan3_Inst}.Name");
    $lan4_InterfaceName = db_get("Device.Ethernet.Interface.{$lan4_Inst}.Name");
    $radio2gInterfaceName = db_get("Device.WiFi.Radio.{$radio_2g}.Name");
    $radio5gInterfaceName = db_get("Device.WiFi.Radio.{$radio_5g}.Name");

    $wanRowIndex = 0;
    $lan1_RowIndex = 0;
    $lan2_RowIndex = 0;
    $lan3_RowIndex = 0;
    $lan4_RowIndex = 0;
    $radio2gRowIndex = 0;
    $radio5gRowIndex = 0;

    while(list($a,$b) = each($rows))
    {
      if(strpos($b,$wanInterfaceName.":"))
          $wanRowIndex = $a;
      else if(strpos($b,$lan1_InterfaceName.":"))
          $lan1_RowIndex = $a;
      else if(strpos($b,$lan2_InterfaceName.":"))
          $lan2_RowIndex = $a;
      else if(strpos($b,$lan3_InterfaceName.":"))
          $lan3_RowIndex = $a;
      else if(strpos($b,$lan4_InterfaceName.":"))
          $lan4_RowIndex = $a;
      else if(strpos($b,$radio2gInterfaceName.":"))
          $radio2gRowIndex = $a;
      else if(strpos($b,$radio5gInterfaceName.":"))
          $radio5gRowIndex = $a;
    }

    $wan_cols = preg_split('/\s+/', trim($rows[$wanRowIndex]));
    $lan1_cols = preg_split('/\s+/', trim($rows[$lan1_RowIndex]));
    $lan2_cols = preg_split('/\s+/', trim($rows[$lan2_RowIndex]));
    $lan3_cols = preg_split('/\s+/', trim($rows[$lan3_RowIndex]));
    $lan4_cols = preg_split('/\s+/', trim($rows[$lan4_RowIndex]));
    $radio2g_cols = preg_split('/\s+/', trim($rows[$radio2gRowIndex]));
    $radio5g_cols = preg_split('/\s+/', trim($rows[$radio5gRowIndex]));
    
    
    $wanEnable = db_get("Device.Ethernet.Interface.{$wanInst}.Status") === "Up" ? true : false;
    $lan1_Enable = db_get("Device.Ethernet.Interface.{$lan1_Inst}.Status") === "Up" ? true : false;
    $lan2_Enable = db_get("Device.Ethernet.Interface.{$lan2_Inst}.Status") === "Up" ? true : false;
    $lan3_Enable = db_get("Device.Ethernet.Interface.{$lan3_Inst}.Status") === "Up" ? true : false;
    $lan4_Enable = db_get("Device.Ethernet.Interface.{$lan4_Inst}.Status") === "Up" ? true : false;
    $radio2gEnable = db_get("Device.WiFi.Radio.{$radio_2g}.Enable") === "1" ? true : false;
    $radio5gEnable = db_get("Device.WiFi.Radio.{$radio_5g}.Enable") === "1" ? true : false;

    $output_value = new stdClass();

    $output_value->{"wan"} = (object) null;
    $output_value->{"wan"}->__portName = '<span class="thread" ;" mlang="MRS042">WAN</span></span></div>';
    $output_value->{"wan"}->__ifStatus = $wanEnable ? getWanLinkMode() : '<span class="thread" ;" mlang="MRS059">Link Down</span></span></div>';
    $output_value->{"wan"}->__txPkt = $wanEnable ? $wan_cols[10] : "--";
    $output_value->{"wan"}->__rxPkt = $wanEnable ? $wan_cols[2] : "--";
    $output_value->{"wan"}->__collision = $wanEnable ? $wan_cols[14] : "--";//todo
    $upTime = db_get("Device.Ethernet.Interface.{$wanInst}.LastChange");
    $output_value->{"wan"}->__txBps = $wanEnable ? intval($wan_cols[9]/$upTime) : "--";
    $output_value->{"wan"}->__rxBps = $wanEnable ? intval($wan_cols[1]/$upTime) : "--";
    $output_value->{"wan"}->__upTime = $wanEnable ? date("z",$upTime)." ".'<span mlang="ATM005">Days</span>'." ".date("H:i:s",$upTime) : "--:--:--";

    $output_value->{"lan1"} = (object) null;
    $output_value->{"lan1"}->__portName = '<span class="thread" ;" mlang="MRS032">LAN</span>1</span></div>';
    $output_value->{"lan1"}->__ifStatus = $lan1_Enable ? getLanLinkMode(1) : '<span class="thread" ;" mlang="MRS059">Link Down</span></span></div>';
    $output_value->{"lan1"}->__txPkt = $lan1_Enable ? $lan1_cols[10] : "--";
    $output_value->{"lan1"}->__rxPkt = $lan1_Enable ? $lan1_cols[2] : "--";
    $output_value->{"lan1"}->__collision = $lan1_Enable ? $lan1_cols[14] : "--";//todo
    $upTime = db_get("Device.Ethernet.Interface.{$lan1_Inst}.LastChange");
    $output_value->{"lan1"}->__txBps = $lan1_Enable ? intval($lan1_cols[9]/$upTime) : "--";
    $output_value->{"lan1"}->__rxBps = $lan1_Enable ? intval($lan1_cols[1]/$upTime) : "--";
    $output_value->{"lan1"}->__upTime = $lan1_Enable ? date("z",$upTime)." ".'<span mlang="ATM005">Days</span>'." ".date("H:i:s",$upTime) : "--:--:--";

    $output_value->{"lan2"} = (object) null;
    $output_value->{"lan2"}->__portName = '<span class="thread" ;" mlang="MRS032">LAN</span>2</span></div>';
    $output_value->{"lan2"}->__ifStatus = $lan2_Enable ? getLanLinkMode(2) : '<span class="thread" ;" mlang="MRS059">Link Down</span></span></div>';
    $output_value->{"lan2"}->__txPkt = $lan2_Enable ? $lan2_cols[10] : "--";
    $output_value->{"lan2"}->__rxPkt = $lan2_Enable ? $lan2_cols[2] : "--";
    $output_value->{"lan2"}->__collision = $lan2_Enable ? $lan2_cols[14] : "--";//todo
    $upTime = db_get("Device.Ethernet.Interface.{$lan2_Inst}.LastChange");
    $output_value->{"lan2"}->__txBps = $lan2_Enable ? intval($lan2_cols[9]/$upTime) : "--";
    $output_value->{"lan2"}->__rxBps = $lan2_Enable ? intval($lan2_cols[1]/$upTime) : "--";
    $output_value->{"lan2"}->__upTime = $lan2_Enable ? date("z",$upTime)." ".'<span mlang="ATM005">Days</span>'." ".date("H:i:s",$upTime) : "--:--:--";

    $output_value->{"lan3"} = (object) null;
    $output_value->{"lan3"}->__portName = '<span class="thread" ;" mlang="MRS032">LAN</span>3</span></div>';
    $output_value->{"lan3"}->__ifStatus = $lan3_Enable ? getLanLinkMode(3) : '<span class="thread" ;" mlang="MRS059">Link Down</span></span></div>';
    $output_value->{"lan3"}->__txPkt = $lan3_Enable ? $lan3_cols[10] : "--";
    $output_value->{"lan3"}->__rxPkt = $lan3_Enable ? $lan3_cols[2] : "--";
    $output_value->{"lan3"}->__collision = $lan3_Enable ? $lan3_cols[14] : "--";//todo
    $upTime = db_get("Device.Ethernet.Interface.{$lan3_Inst}.LastChange");
    $output_value->{"lan3"}->__txBps = $lan3_Enable ? intval($lan3_cols[9]/$upTime) : "--";
    $output_value->{"lan3"}->__rxBps = $lan3_Enable ? intval($lan3_cols[1]/$upTime) : "--";
    $output_value->{"lan3"}->__upTime = $lan3_Enable ? date("z",$upTime)." ".'<span mlang="ATM005">Days</span>'." ".date("H:i:s",$upTime) : "--:--:--";

    $output_value->{"lan4"} = (object) null;
    $output_value->{"lan4"}->__portName = '<span class="thread" ;" mlang="MRS032">LAN</span>4</span></div>';
    $output_value->{"lan4"}->__ifStatus = $lan4_Enable ? getLanLinkMode(4) : '<span class="thread" ;" mlang="MRS059">Link Down</span></span></div>';
    $output_value->{"lan4"}->__txPkt = $lan4_Enable ? $lan4_cols[10] : "--";
    $output_value->{"lan4"}->__rxPkt = $lan4_Enable ? $lan4_cols[2] : "--";
    $output_value->{"lan4"}->__collision = $lan4_Enable ? $lan4_cols[14] : "--";//todo
    $upTime = db_get("Device.Ethernet.Interface.{$lan4_Inst}.LastChange");
    $output_value->{"lan4"}->__txBps = $lan4_Enable ? intval($lan4_cols[9]/$upTime) : "--";
    $output_value->{"lan4"}->__rxBps = $lan4_Enable ? intval($lan4_cols[1]/$upTime) : "--";
    $output_value->{"lan4"}->__upTime = $lan4_Enable ? date("z",$upTime)." ".'<span mlang="ATM005">Days</span>'." ".date("H:i:s",$upTime) : "--:--:--";

    $output_value->{"2g"} = (object) null;
    //$output_value->{"2g"}->__portName = "2.4G WLAN b/g/n/ax";
    $output_value->{"2g"}->__portName = '<span>2.4G </span><span class="thread" ;" mlang="MRS043">WLAN</span> b/g/n/ax</span></div>';
    $output_value->{"2g"}->__ifStatus = ($radio2gEnable && $radio2gRowIndex !=0) ? getSelectVal_2gModeForAdv()."M" : "--";
    $output_value->{"2g"}->__txPkt = ($radio2gEnable && $radio2gRowIndex !=0) ? $radio2g_cols[10] : "--";
    $output_value->{"2g"}->__rxPkt = ($radio2gEnable && $radio2gRowIndex !=0) ? $radio2g_cols[2] : "--";
    $output_value->{"2g"}->__collision = ($radio2gEnable && $radio2gRowIndex !=0) ? $radio2g_cols[14] : "--";
    $upTime = db_get("Device.WiFi.Radio.{$radio_2g}.LastChange");
    $output_value->{"2g"}->__txBps = ($radio2gEnable && $radio2gRowIndex !=0) ? intval($radio2g_cols[9]/$upTime) : "--";
    $output_value->{"2g"}->__rxBps = ($radio2gEnable && $radio2gRowIndex !=0) ? intval($radio2g_cols[1]/$upTime) : "--";
    $output_value->{"2g"}->__upTime = ($radio2gEnable && $radio2gRowIndex !=0) ? date("z",$upTime)." ".'<span mlang="ATM005">Days</span>'." ".date("H:i:s",$upTime) : "--:--:--";
    
    $output_value->{"5g"} = (object) null;
    //$output_value->{"5g"}->__portName = "5G WLAN a/n/ac/ax";
    $output_value->{"5g"}->__portName = '<span>5G </span><span class="thread" ;" mlang="MRS043">WLAN</span> a/n/ac/ax</span></div>';
    $output_value->{"5g"}->__ifStatus = ($radio5gEnable && $radio5gRowIndex !=0) ? getSelectVal_5gModeForAdv()."M" : "--";
    $output_value->{"5g"}->__txPkt = ($radio5gEnable && $radio5gRowIndex !=0) ? $radio5g_cols[10] : "--";
    $output_value->{"5g"}->__rxPkt = ($radio5gEnable && $radio5gRowIndex !=0) ? $radio5g_cols[2] : "--";;
    $output_value->{"5g"}->__collision = ($radio5gEnable && $radio5gRowIndex !=0) ? $radio5g_cols[14] : "--";
    $upTime = db_get("Device.WiFi.Radio.{$radio_5g}.LastChange");
    $output_value->{"5g"}->__txBps = ($radio5gEnable && $radio5gRowIndex !=0) ? intval($radio5g_cols[9]/$upTime) : "--";
    $output_value->{"5g"}->__rxBps = ($radio5gEnable && $radio5gRowIndex !=0) ? intval($radio5g_cols[1]/$upTime) : "--";
    $output_value->{"5g"}->__upTime = ($radio5gEnable && $radio5gRowIndex !=0) ? date("z",$upTime)." ".'<span mlang="ATM005">Days</span>'." ".date("H:i:s",$upTime) : "--:--:--";

    return $output_value;
}

function getRadio2GStats()
{
    global $radio_2g;
    $radio_path = "Device.WiFi.Radio.2.Stats";
    $json = db_getObj($radio_path);
    if($json === FALSE)
    {
        return ;  
    }

    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
      printf("JSON Error: %s", json_last_error_msg());
    }
    
    $output_value = new stdClass();
    $radioEnable = db_get("Device.WiFi.Radio.{$radio_2g}.Enable") === "1" ? true : false;
    $port_name = "2.4G WLAN b/g/n/ax";
    $link_mode = $radioEnable ? getSelectVal_2gModeForAdv()."M" : "--";
    $tx_pkts = $radioEnable ? $data[$radio_path][0]["PacketsSent"] : "--";
    $rx_pkts = $radioEnable ? $data[$radio_path][0]["PacketsReceived"] : "--";
    $collisions = $radioEnable ? "0" : "--";//todo
    $tx_Bps = $radioEnable ? $data[$radio_path][0]["BytesSent"] : "--";
    $rx_Bps = $radioEnable ? $data[$radio_path][0]["BytesReceived"] : "--";
    $upTime = $radioEnable ? date("H:i:s",db_get("Device.WiFi.Radio.{$radio_2g}.LastChange")) : "--:--:--";
    
    $output_value->{"2g"} = (object) null;
    $output_value->{"2g"}->__portName = $port_name;
    $output_value->{"2g"}->__ifStatus = $link_mode;
    $output_value->{"2g"}->__txPkt = $tx_pkts;
    $output_value->{"2g"}->__rxPkt = $rx_pkts;
    $output_value->{"2g"}->__collision = $collisions;
    $output_value->{"2g"}->__txBps = $tx_Bps;
    $output_value->{"2g"}->__rxBps = $rx_Bps;
    $output_value->{"2g"}->__upTime = $upTime;

    return $output_value;
}

function getRadio5GStats()
{
    global $radio_5g;
    $radio_path = "Device.WiFi.Radio.{$radio_5g}.Stats";
    $json = db_getObj($radio_path);
    if($json === FALSE)
    {
        return ;  
    }

    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
      printf("JSON Error: %s", json_last_error_msg());
    }
    $output_value = new stdClass();
    $radioEnable = db_get("Device.WiFi.Radio.{$radio_5g}.Enable") === "1" ? true : false;
    $port_name = "5G WLAN a/n/ac/ax";
    $link_mode = $radioEnable ? getSelectVal_5gModeForAdv()."M" : "--";
    $tx_pkts = $radioEnable ? $data[$radio_path][0]["PacketsSent"] : "--";
    $rx_pkts = $radioEnable ? $data[$radio_path][0]["PacketsReceived"] : "--";
    $collisions = $radioEnable ? "0" : "--";//todo
    $tx_Bps = $radioEnable ? $data[$radio_path][0]["BytesSent"] : "--";
    $rx_Bps = $radioEnable ? $data[$radio_path][0]["BytesReceived"] : "--";
    $upTime = $radioEnable ? date("H:i:s",db_get("Device.WiFi.Radio.{$radio_5g}.LastChange")) : "--:--:--";
    $output_value->{"5g"} = (object) null;
    $output_value->{"5g"}->__portName = $port_name;
    $output_value->{"5g"}->__ifStatus = $link_mode;
    $output_value->{"5g"}->__txPkt = $tx_pkts;
    $output_value->{"5g"}->__rxPkt = $rx_pkts;
    $output_value->{"5g"}->__collision = $collisions;
    $output_value->{"5g"}->__txBps = $tx_Bps;
    $output_value->{"5g"}->__rxBps = $rx_Bps;
    $output_value->{"5g"}->__upTime = $upTime;
    return $output_value;
}

function getRadio5G1Stats()
{
    global $radio_5g1;
    $radio_path = "Device.WiFi.Radio.{$radio_5g1}.Stats";
    $json = db_getObj($radio_path);
    if($json === FALSE)
    {
        return ;  
    }

    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
      printf("JSON Error: %s", json_last_error_msg());
    }
    $output_value = new stdClass();
    $radioEnable = db_get("Device.WiFi.Radio.{$radio_5g1}.Enable") === "1" ? true : false;
    $port_name = "5G High WLAN a/n/ac/ax";
    $link_mode = $radioEnable ? getSelectVal_5g1ModeForAdv()."M" : "--";
    $tx_pkts = $radioEnable ? $data[$radio_path][0]["PacketsSent"] : "--";
    $rx_pkts = $radioEnable ? $data[$radio_path][0]["PacketsReceived"] : "--";
    $collisions = $radioEnable ? "0" : "--";//todo
    $tx_Bps = $radioEnable ? $data[$radio_path][0]["BytesSent"] : "--";
    $rx_Bps = $radioEnable ? $data[$radio_path][0]["BytesReceived"] : "--";
    $upTime = $radioEnable ? date("H:i:s",db_get("Device.WiFi.Radio.{$radio_5g1}.LastChange")) : "--:--:--";
    $output_value->{"5g1"} = (object) null;
    $output_value->{"5g1"}->__portName = $port_name;
    $output_value->{"5g1"}->__ifStatus = $link_mode;
    $output_value->{"5g1"}->__txPkt = $tx_pkts;
    $output_value->{"5g1"}->__rxPkt = $rx_pkts;
    $output_value->{"5g1"}->__collision = $collisions;
    $output_value->{"5g1"}->__txBps = $tx_Bps;
    $output_value->{"5g1"}->__rxBps = $rx_Bps;
    $output_value->{"5g1"}->__upTime = $upTime;
    return $output_value;
}

?>
