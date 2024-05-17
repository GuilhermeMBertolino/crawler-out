<?
  include '../blocksiteSchedule.php';
  if (!isset($data))
    $data = new stdClass();

  $data->isEveryDay = (object) null;
  $data->isEveryDay->value = getCheckboxVal_isEveryDay();
  $data->isEveryDay->type = 'checkbox';

  $data->isSunday = (object) null;
  $data->isSunday->value = getCheckboxVal_isSunday();
  $data->isSunday->type = 'checkbox';
  
  $data->isMonday = (object) null;
  $data->isMonday->value = getCheckboxVal_isMonday();
  $data->isMonday->type = 'checkbox';

  $data->isTuesday = (object) null;
  $data->isTuesday->value = getCheckboxVal_isTuesday();
  $data->isTuesday->type = 'checkbox';

  $data->isWednesday = (object) null;
  $data->isWednesday->value = getCheckboxVal_isWednesday();
  $data->isWednesday->type = 'checkbox';

  $data->isThursday = (object) null;
  $data->isThursday->value = getCheckboxVal_isThursday();
  $data->isThursday->type = 'checkbox';

  $data->isFriday = (object) null;
  $data->isFriday->value = getCheckboxVal_isFriday();
  $data->isFriday->type = 'checkbox';

  $data->isSaturday = (object) null;
  $data->isSaturday->value = getCheckboxVal_isSaturday();
  $data->isSaturday->type = 'checkbox';

  $data->allDayBlock = (object) null;
  $data->allDayBlock->value = getCheckboxVal_allDayBlock();
  $data->allDayBlock->type = 'checkbox';

  $data->startBlockTime = (object) null;
  $data->startBlockTime->value = getTextVal_startBlockTime();
  $data->startBlockTime->type = 'input';

  $data->endBlockTime = (object) null;
  $data->endBlockTime->value = getTextVal_endBlockTime();
  $data->endBlockTime->type = 'input';

  echo json_encode($data);
?>
