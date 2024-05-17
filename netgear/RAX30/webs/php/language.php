<?
$dbg = FALSE;

function getChangeLanguageResult()
{
    $seconds = 10 ;
    $result = false;
    do {
        if(file_exists("/tmp/lang_changed"))
        {
            $result = true;
            break;
        }
        sleep(1);
        $seconds--;
    }while($seconds);
    
    return $result;
}
?>

