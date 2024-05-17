<?

$dbg = FALSE;
function getRpeEnable()
{
    $cmd_str= "getdb --bd_rpe_status | grep \"1\"; echo $?";
    $enable = !exec($cmd_str);
    return ($enable == "1") ? "true" : "false";
}

?>
