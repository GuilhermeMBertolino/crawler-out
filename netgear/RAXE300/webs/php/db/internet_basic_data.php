<?
  include '../interface.php';
  if (!isset($data)) 
  $data = new stdClass();

  $data->wanMode = (object) null;
  $data->wanMode->value = get_wanMode();
  $data->wanMode->type = 'input';

	echo json_encode($data);
?>
