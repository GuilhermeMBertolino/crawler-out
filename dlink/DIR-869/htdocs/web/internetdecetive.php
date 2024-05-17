HTTP/1.1 200 OK
Content-Type: text/xml

<?

include "/htdocs/phplib/trace.php";

function pvt_shell_injection($parameter)
{
	return "\"".escape("s",$parameter)."\"";
}
if ($AUTHORIZED_GROUP != 0)
{
	$result = "Authenication fail";
}
else
{
	$result = "Failed";
	$resultfile="/var/internetcheck.result";
	$cmd = "dnsquery -p -t 1 -d dlink.com";
	setattr("/runtime/internetcheck", "get", $cmd ." > ".$resultfile);
	unlink($resultfile);
	get("x", "/runtime/internetcheck");

	if (isfile($resultfile) == 1)
	{

		$ping_result = fread("",$resultfile);
		if (strstr($ping_result, "Internet detected.") == "")
		{
			//TRACE_info("tsrites failt\n");
			$result = "Failed";
	
		}else{
			//TRACE_info("tsrites success\n");
			$result = "OK";

		}

	}
}
echo '<?xml version="1.0"?>\n';
?><diagnostic>
	<report><?=$result?></report>
</diagnostic>
