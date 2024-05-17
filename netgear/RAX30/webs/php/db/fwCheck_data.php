<?
  include '../interface.php';
  if (!isset($data)) 
  $data = new stdClass();

  $checkResult = getFwCheckResult(0);

  $data->check_status = (object) null;
  $data->check_status->value = $checkResult["updateRequired"];

  $data->lang_status = (object) null;
  $data->lang_status->value = $checkResult["isNewLanguage"];

  $data->forceUpdate_status = (object) null;
  $data->forceUpdate_status->value = $checkResult["isForceUpdate"];

  $data->cur_firm = (object) null;
  $data->cur_firm->value = getFirmwareVer();
  $data->cur_firm->type = "spantext";

  $data->new_firm = (object) null;
  $data->new_firm->value = $checkResult["newFWVersion"];
  $data->new_firm->type = "spantext";

  $data->cur_lang = (object) null;
  $data->cur_lang->value = getLanguageVersion();
  $data->cur_lang->type = "spantext";

  //StevenJu: RAXE300-27, issue4 , while lang version is null, New GUI Language Version will show "V" only
  if ($checkResult["ServerLanguageVer"] !== null)
  {
     $data->new_lang = (object) null;
     $data->new_lang->value = $checkResult["ServerLanguageVer"] !== "" ? "V".$checkResult["ServerLanguageVer"] : "";
     $data->new_lang->type = "spantext";
  }

  $data->release_note = (object) null;
  $data->release_note->value = $checkResult["note"];
  $data->release_note->type = "spantext";
  echo json_encode($data);
?>
