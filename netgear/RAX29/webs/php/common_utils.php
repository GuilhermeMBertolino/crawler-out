<?

/* Internal Common Functions Begin-------------------------------------> */
function num_to_TrueFalseStr($num)
{
    if ($num != 0)
    {
        return "true";
    }
    else
    {
        return "false";
    }
}

function escapeBackslashSinglequote($str)
{
    $escaped_str = str_replace("\\", "\\\\", $str);
    $escaped_str = str_replace("'", "\\'", $escaped_str);

    return $escaped_str;
}
/* Internal Common Functions <-------------------------------------End */
?>
