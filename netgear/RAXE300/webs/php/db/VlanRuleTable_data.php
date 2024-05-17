<?
  include '../vlan.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getVlanRuleTable();

    echo json_encode($data);
?>
