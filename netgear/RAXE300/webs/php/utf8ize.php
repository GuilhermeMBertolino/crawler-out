<?
/**
 * fixes the encoding of the values in an associative array
 *
 * usage:
 *   $formatted_rows = util::utf8ize($formatted_rows);
 *   echo json_encode($formatted_rows);
 * 
 * @param  assoc $arr array to be processed
 * @return assoc      processed array
 */
function utf8ize($arr){
  if (is_array($arr)) {
      foreach ($arr as $k => $v) {
          $arr[$k] = utf8ize($v);
      }
  } else if (is_string ($arr)) {
      return utf8_encode($arr);
  }
  return $arr;
}
?>
