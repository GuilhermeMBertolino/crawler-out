<?
include_once 'common_utils.php';

function getWizardRestoreConfigInProgress()
{
    if (file_exists("/data/wizardRestoreConfigInProgress")) {
        return "true"; 
    }
    else {
        return "false";
    }
}

function getWizardFwUpgradeInProgress()
{
    if (file_exists("/data/wizardFwUpgradeInProgress")) {
        return "true"; 
    }
    else {
        return "false";
    }
}

function getWizardWifiConfigured()
{
    if (file_exists("/data/wizardWifiConfigured")) {
        return "true"; 
    }
    else {
        return "false";
    }
}
?>
