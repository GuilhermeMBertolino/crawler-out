<?

$dbg = FALSE;
function getRemoteMgmtEnable()
{
    if(db_get("Device.NAT.X_PEGATRON_COM_RmoteManagment.Enable") == "1")
        return "true";
    else
        return "false";
}

function getRemoteMgmtType()
{
    return db_get("Device.NAT.X_PEGATRON_COM_RmoteManagment.AccessType");
}

function getRemoteMgmtRangeStart()
{
    return db_get("Device.NAT.X_PEGATRON_COM_RmoteManagment.IPAddress");
}

function getRemoteMgmtRangeEnd()
{
    return db_get("Device.NAT.X_PEGATRON_COM_RmoteManagment.EndIPAddress");
}

function getRemoteMgmtPort()
{
    return db_get("Device.NAT.X_PEGATRON_COM_RmoteManagment.PortNum");
}

?>
