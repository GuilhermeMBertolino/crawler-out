<?
include_once 'common_utils.php';

function getVal_xunoyou_ad_disable()
{
    $disable = db_get("Device.X_PEGATRON_COM_DeviceInfo.XunyouAdDisable");

    return num_to_TrueFalseStr($disable);
}
?>
