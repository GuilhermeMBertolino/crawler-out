<?
include_once 'common_utils.php';

/* Armor/BD status 1: Not Active, 2: Eanble */
function getVal_armor_status()
{
    exec("getdb --bd_status | awk -F '\"' '{printf $4}'", $output, $ret);
    if( strcasecmp($output[0], "valid") == 0 )
    {
        exec("getdb --bd_is_enable | awk '{printf $1}'", $output2, $ret);
        if( strcmp($output2[0], "1") == 0 )
        {
	        return "2"; //Enabled for GUI defintion.
        }
        else
        {
            return "0"; //Not Enabled for GUI definition.
        }
    }
    else {
	return "1"; //Not Activated for GUI defintion.
    }
}

function getVal_armor_enable()
{   
    if (getVal_armor_status() == "2") {
	return "true";
    }
    else {
	return "false";
    }
}

function getVal_armorAd_disable()
{
    $disable = db_get("Device.X_PEGATRON_COM_DeviceInfo.ArmorAdDisable");
    
    return num_to_TrueFalseStr($disable);
}
?>
