HTTP/1.1 200 OK

<?
if ($AUTHORIZED_GROUP != 0)
{
	echo "Authenication fail\n";
}
else
{
	$TEMP_MYNAME	= "onepage";
	$TEMP_MYGROUP	= "";
	$TEMP_STYLE		= "simple";
	include "/htdocs/webinc/templates.php";
}
?>
