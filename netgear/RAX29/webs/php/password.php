<?
include_once 'common_utils.php';

$question1_mlang_list =
array(
    "genie_97",
    "genie_149",
    "genie_150",
    "genie_145",
    "genie_144",
    "genie_63",
    "genie_142",
    "genie_141",
    "genie_64",
    "genie_138"
);

$question2_mlang_list =
array(
    "genie_97",
    "genie_147",
    "genie_146",
    "genie_140",
    "genie_143",
    "genie_148",
    "genie_62",
    "genie_61",
    "genie_139"
);

function getCheckboxVal_enableReset()
{
    $enable = db_get("Device.X_PEGATRON_COM_LoginCfg.RecoveryCheck");
    
    return num_to_TrueFalseStr($enable);
}

function getSelectVal_question1()
{
    return db_get("Device.X_PEGATRON_COM_LoginCfg.SecurityQuestion1");
}

function getTextVal_answer1()
{
    return db_get("Device.X_PEGATRON_COM_LoginCfg.SecurityAnswer1");
}

function getSelectVal_question2()
{
    return db_get("Device.X_PEGATRON_COM_LoginCfg.SecurityQuestion2");
}

function getTextVal_answer2()
{
    return db_get("Device.X_PEGATRON_COM_LoginCfg.SecurityAnswer2");
}

function getTextVal_lastPasswordResetTime()
{
    $resetTime = db_get("Device.X_PEGATRON_COM_LoginCfg.PasswordResetTime");
    if ($resetTime != "9999-12-31T23:59:59Z") {
	$date = new DateTime($resetTime);
	return $date->format('M d, Y H:i:s');
    }
}

function get_question_mlang($question_num)
{
     if($question_num == 1)
     {
          return $GLOBALS['question1_mlang_list'][getSelectVal_question1()];
     }
     else if($question_num == 2)
     {
          return $GLOBALS['question2_mlang_list'][getSelectVal_question2()];
     }
}
?>
