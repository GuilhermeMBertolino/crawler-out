<?
  include '../upnp.php';
  if (!isset($data)) 
    $data = new stdClass();

  $data->enableUpnp = (object) null;
  $data->enableUpnp->value = getUpnpEnable();
  $data->enableUpnp->type = "checkbox";

  $data->AdverTime = (object) null;
  $data->AdverTime->value = getUpnpAdvertisementPeriod();
    
  $data->advTtl = (object) null;
  $data->advTtl->value = getUpnpAdvertisementTimetoLive();
  
  $data->hiddenAdverTime = (object) null;
  $data->hiddenAdverTime->value = $data->AdverTime->value;

  $data->hiddenTimeToLive = (object) null;
  $data->hiddenTimeToLive->value = $data->advTtl->value;

  echo json_encode($data);
?>
