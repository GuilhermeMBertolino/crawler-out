<?
  include '../upnp.php';

  if (!isset($data)) 
    $data = new stdClass();
    $data = getUpnpPortMappingTableValue();

    echo json_encode($data);
?>
