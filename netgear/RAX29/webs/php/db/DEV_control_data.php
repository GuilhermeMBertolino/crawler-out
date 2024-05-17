<?
    include '../accessControl.php';
    include '../interface.php';
    if (!isset($data)) 
    $data = new stdClass();
  
    $data->enableAccessCtrl = (object) null;
    $data->enableAccessCtrl->value = getAcceccControlEnable();
    $data->enableAccessCtrl->type = 'checkbox';
  
    $data->accessRule = (object) null;
    $data->accessRule->value = getAcceccControlRule();
    $data->accessRule->type = 'radio';
    
    $data->client_mac = (object) null;
    $data->client_mac->value = getClientMac();

    $data->circleActivationStatus = (object) null;
    $data->circleActivationStatus->value = getCircleActivationStatus();

    echo json_encode($data);
?>
