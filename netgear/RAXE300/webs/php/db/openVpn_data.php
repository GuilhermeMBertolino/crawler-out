<?
    include_once '../openVpn.php';
    include_once '../ddns.php';
    include_once '../interface.php';
    
    if (!isset($data)) 
    $data = new stdClass();

    $data->enable = (object) null;
    $data->enable->value = getOpenVpnEnable();
    $data->enable->type = "checkbox";

    $data->tunModeType = (object) null;
    $data->tunModeType->value = getOpenVpnTunType();
    $data->tunModeType->type = "radio";

    $data->tunModePort = (object) null;
    $data->tunModePort->value = getOpenVpnTunPort();

    $data->tapModeType = (object) null;
    $data->tapModeType->value = getOpenVpnTapType();
    $data->tapModeType->type = "radio";

    $data->tapModePort = (object) null;
    $data->tapModePort->value = getOpenVpnTapPort();

    $data->clientAccessType = (object) null;
    $data->clientAccessType->value = getOpenVpnAccessType();
    $data->clientAccessType->type = "radio";

    $data->openVpn_enable = (object) null;
    $data->openVpn_enable->value = getOpenVpnEnable();

    $data->ddns_enable = (object) null;
    $data->ddns_enable->value = (getCheckboxVal_enableDdns() == "true") ? "true" : "false";

    $data->wanIsStatic = (object) null;
    $data->wanIsStatic->value = checkWanIsStatic();

    $data->wan_type = (object) null;
    $data->wan_type->value = getWanInstanceProtocol();

    $data->oldTunModeType = (object) null;
    $data->oldTunModeType->value = $data->tunModeType->value;

    $data->oldTunModePort = (object) null;
    $data->oldTunModePort->value = $data->tunModePort->value;

    $data->oldTapModeType = (object) null;
    $data->oldTapModeType->value = $data->tapModeType->value;

    $data->oldTapModePort = (object) null;
    $data->oldTapModePort->value = $data->tapModePort->value;

    $data->oldClientAccessType = (object) null;
    $data->oldClientAccessType->value = $data->clientAccessType->value;

    $data->ppp_conn_type = (object) null;
    $data->ppp_conn_type->value = getPppoeMode();

    echo json_encode($data);
?>
