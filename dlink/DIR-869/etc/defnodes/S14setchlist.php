<?
include "/htdocs/phplib/xnode.php";
include "/htdocs/phplib/trace.php";
include "/htdocs/phplib/wifi.php";
include "/htdocs/webinc/config.php";

/* I save the channel list into /runtime/freqrule/channellist/a & runtime/freqrule/channellist/g */
$path_a = "/runtime/freqrule/channellist/a";
$path_g = "/runtime/freqrule/channellist/g";

/* /runtime/freqrule/channellist/a0 & runtime/freqrule/channellist/a1 is used for wireless tri-band */
$path_a0 = "/runtime/freqrule/channellist/a0";
$path_a1 = "/runtime/freqrule/channellist/a1";

$path_dfs = "/runtime/freqrule/channellist/dfs";

$c = query("/runtime/devdata/countrycode");

$open_dfs = WIFI_checkDFS($c);

if ($c == "")
{
	TRACE_error("phplib/getchlist.php - GETCHLIST() ERROR: no Country Code!!! Please check if you board is initialized.");
	return;
}
if (isdigit($c)==1)
{
	TRACE_error("phplib/getchlist.php - GETCHLIST() ERROR: Country Code (".$c.") is not in ISO Name!! Please use ISO name insteads of Country Number.");
	return;
}

/* never set the channel list, so do it.*/
if (query($path_a)=="" || query($path_a0)=="" || query($path_a1)=="" || query($path_g)=="")
{
	/* map the region by country ISO name */
	if		($c == "AU")
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11,12,13";
		$list_a0 = "36,40,44,48";
		//============DFS channel============
		$list_dfs_a0 = "52,56,60,64";
		$list_dfs_a1 = "100,104,108,112,116,132,136,140";
		$list_dfs = "52,56,60,64,100,104,108,112,116,132,136,140";
		//===================================
		$list_a1 = "149,153,157,161,165";
	}
	else if	($c == "DI")
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11";
		$list_a0 = "36,40,44,48";	
		//============DFS channel============
		$list_dfs_a0 = "52,56,60,64";
		$list_dfs_a1 = "100,104,108,112,116,132,136,140";
		$list_dfs = "52,56,60,64,100,104,108,112,116,132,136,140";
		//===================================
		$list_a1 = "149,153,157,161,165"; 
	}
	else if	($c == "CA")	
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11";
		$list_a0 = "36,40,44,48";
		//============DFS channel===========
		$list_dfs_a0 = "52,56,60,64";
		$list_dfs_a1 = "100,104,108,112,116,132,136,140";
		$list_dfs = "52,56,60,64,100,104,108,112,116,132,136,140";
		//===================================
		$list_a1 = "149,153,157,161,165";
	}
	else if	($c == "CN")
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11,12,13";
		$list_a0 = "36,40,44,48";
		//============DFS channel===========
		$list_dfs_a0 = "52,56,60,64";
		$list_dfs = "52,56,60,64";
		//===================================
		$list_a1 = "149,153,157,161,165";
	}
	else if	($c == "SG")	
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11,12,13";
		$list_a0 = "36,40,44,48";
		//============DFS channel============
		$list_dfs_a0 = "52,56,60,64";
		$list_dfs ="52,56,60,64";
		//===================================
		$list_a1 = "149,153,157,161,165";
	}
	else if	($c == "LA")
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11,12,13";	
		$list_a0 = "36,40,44,48";
		$list_a1 = "149,153,157,161,165";
	}
	else if	($c == "IL")	
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11,12,13";
		$list_a0 = "36,40,44,48";
		//============DFS channel===========
		$list_dfs_a0 = "52,56,60,64";
		$list_dfs = "52,56,60,64";
		//===================================
	}
	else if	($c == "KR")	
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11,12,13";
		$list_a0 = "36,40,44,48";
		//============DFS channel============
		$list_dfs_a0 = "52,56,60,64";
		$list_dfs_a1 = "100,104,108,112,116,120,124";
		$list_dfs = "52,56,60,64,100,104,108,112,116,120,124";
		//===================================
		$list_a1 = "149,153,157,161";
	}
	else if	($c == "JP")	
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11,12,13";	
		$list_a0 = "36,40,44,48";
		//============DFS channel============
		$list_dfs_a0 = "52,56,60,64";
		$list_dfs_a1 = "100,104,108,112,116,120,124,128,132,136,140";
		$list_dfs = "52,56,60,64,100,104,108,112,116,120,124,128,132,136,140";		
		//===================================
	}
	else if	($c == "EG")	
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11,12,13";
		//============DFS channel============
		$list_dfs_a0 = "36,40,44,48,52,56,60,64";
		$list_dfs = "36,40,44,48,52,56,60,64";
		//===================================
	}
	else if	($c == "BR")	
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11,12,13";	
		$list_a0 = "36,40,44,48";
		//============DFS channel============
		$list_dfs_a0 = "52,56,60,64";
		$list_dfs_a1 = "100,104,108,112,116,120,124,128,132,136,140";
		$list_dfs = "52,56,60,64,100,104,108,112,116,120,124,128,132,136,140";
		//===================================
		$list_a1 = "149,153,157,161,165";
	}
	else if	($c == "RU")
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11,12,13";	
		$list_a0 = "36,40,44,48,52,56,60,64";
		//RU 5G can not use those channels (ref from Wi-Fi frequency table)
		//$list_a1 = "132,136,140,149,153,157,161,165";
	}
	else if	($c == "US")	
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11";
		$list_a0 = "36,40,44,48";
		//============DFS channel============
		$list_dfs_a0 = "52,56,60,64";
		$list_dfs_a1 = "100,104,108,112,116,132,136,140";
		$list_dfs = "52,56,60,64,100,104,108,112,116,132,136,140";
		//===================================
		$list_a1 = "149,153,157,161,165";
	}
	else if	($c == "NA")	
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11";	
		$list_a0 = "36,40,44,48";
		//============DFS channel============
		$list_dfs_a0 = "52,56,60,64";
		$list_dfs_a1 = "100,104,108,112,116,132,136,140";
		$list_dfs = "52,56,60,64,100,104,108,112,116,132,136,140";
		//===================================
		$list_a1 = "149,153,157,161,165";
	}
	else if ($c == "EU") 	
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11,12,13";	
		$list_a0 = "36,40,44,48";
		//============DFS channel============
		$list_dfs_a0 = "52,56,60,64";
		$list_dfs_a1 = "100,104,108,112,116,132,136,140"; //meteorological radar use (120 124 128),so remove 
		$list_dfs = "52,56,60,64,100,104,108,112,116,132,136,140"; //meteorological radar use (120 124 128),so remove 
		//===================================
	}
	/* EU == GB */
	else if ($c == "GB") 	
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11,12,13";	
		$list_a0 = "36,40,44,48";
		//============DFS channel============
		$list_dfs_a0 = "52,56,60,64";
		$list_dfs_a1 = "100,104,108,112,116,132,136,140";
		$list_dfs = "52,56,60,64,100,104,108,112,116,132,136,140";
		//===================================
	}
	else if ($c == "TW") 	
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11";	
		$list_a0 = "56,60,64";
		//============DFS channel============
		$list_dfs_a1 = "100,104,108,112,116,132,136,140";
		$list_dfs = "100,104,108,112,116,132,136,140";
		//===================================
		$list_a1 = "149,153,157,161,165";
	}
	else if ($c == "U1" || $c == "U2")
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11";
		$list_a0 = "36,40,44,48";
		//============DFS channel============
		$list_dfs_a0 = "52,56,60,64";
		$list_dfs_a1 = "100,104,108,112,116,132,136,140";
		$list_dfs = "52,56,60,64,100,104,108,112,116,132,136,140";
		//===================================
		$list_a1 = "149,153,157,161,165";
	}
	else if ($c == "IN")
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11,12,13";	
		$list_a0 = "36,40,44,48,52,56,60,64";
		$list_a1 = "149,153,157,161,165";
	}
	else if ($c == "MY")
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11,12,13";
		//============DFS channel============
		$list_dfs_a0 = "36,40,44,48,52,56,60,64";
		$list_dfs = "36,40,44,48,52,56,60,64";
		//===================================
		$list_a1 = "149,153,157,161,165";
	}
	else if ($c == "TEST")
	{
		$list_g = "1,2,3,4,5,6,7,8,9,10,11,12,13,14";
		$list_a = "36,40,44,48,52,56,60,64,100,104,108,112,116,120,124,128,132,136,140,144,149,153,157,161,165,169,173,177";
	}
	else /* match no ISO name! return ERROR message. */
	{
		return "phplib/getchlist.php - GETCHLIST() ERROR: countrycode (".$c.") doesn't match any list in GETCHLIST(). Please check it.";
	}
	
	if($open_dfs == "1")
	{
		$list_a0 = $list_a0.",".$list_dfs_a0;
		$list_a1 = $list_dfs_a1.",".$list_a1;
	}
	
	$list_a = $list_a0.",".$list_a1;

	//Cut "," at front and end
	if(substr($list_a, 0 , 1) == ",")	$list_a = substr($list_a, 1, strlen($list_a));
	if(substr($list_a, strlen($list_a)-1 , 1) == ",")	$list_a = substr($list_a, 0, strlen($list_a)-1);

	set($path_g, $list_g);
	
	if($FEATURE_DUAL_BAND == 1)
	{
		set($path_a, $list_a);
		set($path_dfs, $list_dfs);
	}
	else if($FEATURE_TRI_BAND == 1)
	{
		set($path_a0, $list_a0);
		set($path_a1, $list_a1);
		set($path_dfs, $list_dfs);
	}
}
?>
