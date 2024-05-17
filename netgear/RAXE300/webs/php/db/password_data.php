<?
  include '../password.php';
  if (!isset($data))
    $data = new stdClass();

  $data->enableReset = (object) null;
  $data->enableReset->value = getCheckboxVal_enableReset();
  $data->enableReset->type = 'checkbox';
  
  $data->question1 = (object) null;
  $data->question1->value = getSelectVal_question1();
  $data->question1->type = 'select';

  $data->answer1 = (object) null;
  $data->answer1->value = getTextVal_answer1();
  $data->answer1->type = 'input';
  
  $data->question2 = (object) null;
  $data->question2->value = getSelectVal_question2();
  $data->question2->type = 'select';
  
  $data->answer2 = (object) null;
  $data->answer2->value = getTextVal_answer2();
  $data->answer2->type = 'input';
  
  $data->lastPasswordResetTime = (object) null;
  $data->lastPasswordResetTime->value = getTextVal_lastPasswordResetTime();
  $data->lastPasswordResetTime->type = 'spantext';
  
  echo json_encode($data);
?>
