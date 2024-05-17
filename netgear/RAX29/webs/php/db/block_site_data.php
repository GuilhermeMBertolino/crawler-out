<?
    include '../blockSite.php';
    include '../interface.php';
    if (!isset($data)) 
    $data = new stdClass();

    $data->blockingType = (object) null;
    $data->blockingType->value = getBlockType();
    $data->blockingType->type = 'radio';

    $data->keyword_list = (object) null;
    $data->keyword_list->value = getBlockKeywordList();
    $data->keyword_list->type = 'selectOptionList';

    $data->allowTrustIp = (object) null;
    $data->allowTrustIp->value = getTrustIpEnable();
    $data->allowTrustIp->type = 'checkbox';

    $data->trusted = (object) null;
    $data->trusted->value = getTrustIpAddress();
    $data->trusted->type = 'ip';
    $data->trusted->idStr_prefix = 'trusted_ipaddress';
    
    $data->lanIpAddr = (object) null;
    $data->lanIpAddr->value = getLanInstanceIpAddr();
    
    $data->lanIpMask = (object) null;
    $data->lanIpMask->value = getLanInstanceIpMask();

    echo json_encode($data);
?>
