<?
    include '../blockServices.php';
    include '../interface.php';
    if (!isset($data)) 
    $data = new stdClass();

    $data->blockingType = (object) null;
    $data->blockingType->value = getBlockServicesType();
    $data->blockingType->type = 'radio';
    
    $data->single = (object) null;
    $data->single->value = getLanInstanceIpAddr();
    $data->single->type = 'ip';
    $data->single->idStr_prefix = 'single_ipaddress';
    
    $data->rangeStart = (object) null;
    $data->rangeStart->value = $data->single->value;
    $data->rangeStart->type = 'ip';
    $data->rangeStart->idStr_prefix = 'range_start_ipaddress';
    
    $data->rangeEnd = (object) null;
    $data->rangeEnd->value = $data->single->value;
    $data->rangeEnd->type = 'ip';
    $data->rangeEnd->idStr_prefix = 'range_end_ipaddress';
    
    $data->iptype = (object) null;
    $data->iptype->value = "all";
    $data->iptype->type = 'radio';

    $data->lanIp = (object) null;
    $data->lanIp->value = getLanInstanceIpAddr();

    $data->lanMask = (object) null;
    $data->lanMask->value = getLanInstanceIpMask();

    echo json_encode($data);
?>
