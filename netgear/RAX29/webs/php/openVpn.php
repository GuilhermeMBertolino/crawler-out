<?
$dbg = FALSE;

function getOpenVpnEnable()
{
    $enable = db_get("Device.X_PEGATRON_COM_Openvpn.Enable");
    
    return ($enable == "0") ? "false" : "true";
}

function getOpenVpnTunType()
{
    $type = db_get("Device.X_PEGATRON_COM_Openvpn.TunProto");
    
    return ($type == "tcp" || $type == "TCP") ? "TCP" : "UDP";
}

function getOpenVpnTunPort()
{
    $port = db_get("Device.X_PEGATRON_COM_Openvpn.TunPort");
    
    return $port;
}

function getOpenVpnTapType()
{
    $type = db_get("Device.X_PEGATRON_COM_Openvpn.TapProto");
    
    return ($type == "tcp" || $type == "TCP") ? "TCP" : "UDP";
}

function getOpenVpnTapPort()
{
    $port = db_get("Device.X_PEGATRON_COM_Openvpn.TapPort");
    
    return $port;
}

function getOpenVpnAccessType()
{
    $type = db_get("Device.X_PEGATRON_COM_Openvpn.AccessType");
    
    return $type;
}

?>
