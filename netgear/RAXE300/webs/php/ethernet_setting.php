<?
include_once 'common_utils.php';

function getCheckboxVal_ethset_ethport_enable()
{
    $cmd_str= "ethswctl -c pause -n 0 -p 0 | grep \"The val8 = 2\"; echo $?";
    $enable = !exec($cmd_str);
    return num_to_TrueFalseStr($enable);
}

function getCheckboxVal_ethset_port1_enable()
{
    $cmd_str= "ethswctl -c pause -n 1 -p 3 | grep \"The val8 = 2\"; echo $?";
    $enable = !exec($cmd_str);
    return num_to_TrueFalseStr($enable);
}


function getCheckboxVal_ethset_port2_enable()
{
    $cmd_str= "ethswctl -c pause -n 1 -p 2 | grep \"The val8 = 2\"; echo $?";
    $enable = !exec($cmd_str);
    return num_to_TrueFalseStr($enable);
}


function getCheckboxVal_ethset_port3_enable()
{
    $cmd_str= "ethswctl -c pause -n 1 -p 1 | grep \"The val8 = 2\"; echo $?";
    $enable = !exec($cmd_str);
    return num_to_TrueFalseStr($enable);
}


function getCheckboxVal_ethset_port4_enable()
{
    $cmd_str= "ethswctl -c pause -n 1 -p 0 | grep \"The val8 = 2\"; echo $?";
    $enable = !exec($cmd_str);
    return num_to_TrueFalseStr($enable);

}


function getCheckboxVal_ethset_port5_enable()
{
    $cmd_str= "ethswctl -c pause -n 0 -p 5 | grep \"The val8 = 2\"; echo $?";
    $enable = !exec($cmd_str);
    return num_to_TrueFalseStr($enable);
}

?>
