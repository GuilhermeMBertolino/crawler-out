<?
    include '../interface.php';
    if (!isset($data)) 
        $data = new stdClass();

    //device name
    $data->name = (object) null;
    $data->name->value = getDeviceName();

    echo json_encode($data);
?>
