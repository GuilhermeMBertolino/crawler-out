<?
  include '../statistics.php';
  if (!isset($data)) 
    $data = new stdClass();

  $data->sysUptime = (object) null;
  $data->sysUptime->value = getSysUptime();
  $data->sysUptime->type = 'spantext';
    
    
    echo json_encode($data);
?>
