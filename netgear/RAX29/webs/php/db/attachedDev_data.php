<?
  include '../attachedDev.php';
  include_once '../qos.php';
  if (!isset($data)) 
    $data = new stdClass();

    $data->aclStatus = (object) null;
    $data->aclStatus->value = '';
    $data->aclStatus->type = 'spantext';
    $data->aclStatus->mlang = getMlang_AclStatus();
    
    $data->generalRule = (object) null;
    $data->generalRule->value = '';
    $data->generalRule->type = 'spantext';
    $data->generalRule->mlang = getMlang_GeneralRuleStatus();

    
    
    if(getQosState() == "true")
    {
        //$data->qos_app_list = (object) null;
        //$data->qos_app_list->value = getQosAppDb();
        
        $data->speedtest_down = (object) null;
        $data->speedtest_down->value = getDownSpeedForAttachedDev();
        $data->speedtest_down->type = 'spantext';
  
        $data->speedtest_up = (object) null;
        $data->speedtest_up->value = getUpSpeedForAttachedDev();
        $data->speedtest_up->type = 'spantext';
    }


    echo json_encode($data);
?>
