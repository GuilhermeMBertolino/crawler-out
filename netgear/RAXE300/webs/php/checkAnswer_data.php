<?
  include_once '../password_reset.php';
  if (!isset($data)) 
  $data = new stdClass();

  $data->question1_text= (object) null;
  $data->question1_text->value = "";
  $data->question1_text->type = "spantext";
  $data->question1_text->mlang = get_question_mlang(1);
  
  $data->question1 = (object) null;
  $data->question1->value = getSelectVal_question1();

  
  $data->question2_text = (object) null;
  $data->question2_text->value = "";
  $data->question2_text->type = "spantext";
  $data->question2_text->mlang = get_question_mlang(2);
  
  $data->question2 = (object) null;
  $data->question2->value = getSelectVal_question2();

  
  echo json_encode($data);
?>
