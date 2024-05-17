<?
include_once 'common_utils.php';

function getCheckboxVal_enableEmail()
{
    $enable = db_get("Device.X_PEGATRON_COM_EmailConfigure.Enable");
    
    return num_to_TrueFalseStr($enable);
}

function getTextVal_emailAddr1()
{
    return db_get("Device.X_PEGATRON_COM_EmailConfigure.MailAddress1");
}

function getTextVal_emailAddr2()
{
    return db_get("Device.X_PEGATRON_COM_EmailConfigure.MailAddress2");
}

function getTextVal_sender()
{
    return db_get("Device.X_PEGATRON_COM_EmailConfigure.SendAddress");
}

function getTextVal_mailServer()
{
    return db_get("Device.X_PEGATRON_COM_EmailConfigure.MailServer");
}

function getTextVal_mailServerPort()
{
    return db_get("Device.X_PEGATRON_COM_EmailConfigure.PortNum");
}

function getCheckboxVal_isServerAuth()
{
    $enable = db_get("Device.X_PEGATRON_COM_EmailConfigure.AuthCheck");
    
    return num_to_TrueFalseStr($enable);
}

function getTextVal_username()
{
    return db_get("Device.X_PEGATRON_COM_EmailConfigure.UserName");
}

function getTextVal_password()
{
    return db_get("Device.X_PEGATRON_COM_EmailConfigure.password");
}

function getCheckboxVal_sendAlert()
{
    $enable = db_get("Device.X_PEGATRON_COM_EmailConfigure.AlertCheck");
    
    return num_to_TrueFalseStr($enable);
}

function getSelectVal_sendLogType()
{
    return db_get("Device.X_PEGATRON_COM_EmailConfigure.ScheduleType");
}

function getSelectVal_day()
{
    return db_get("Device.X_PEGATRON_COM_EmailConfigure.Day");
}

function getSelectVal_hour()
{
    $time = intval(db_get("Device.X_PEGATRON_COM_EmailConfigure.TimeSlot"));
    $hour24 = $time / 60;
    
    if ($hour24 >= 12) {
        $hour12 = $hour24 - 12;
    }
    else {
        $hour12 = $hour24;
    }
    
    return $hour12;
}

function getRadioVal_am_pm()
{
    $time = db_get("Device.X_PEGATRON_COM_EmailConfigure.TimeSlot");
    $hour24 = $time / 60;
    
    if ($hour24 >= 12) {
        return "pm";
    }
    else {
        return "am";
    }
}

?>
