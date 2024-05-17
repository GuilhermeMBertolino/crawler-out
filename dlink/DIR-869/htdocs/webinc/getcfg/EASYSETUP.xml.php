<module>
	<service><?=$GETCFG_SVC?></service>
	<inet>
<?
include "/htdocs/phplib/xnode.php";
$entry = XNODE_getpathbytarget("/inet", "entry", "uid", "INET-3", 0);
	echo "\t\t<entry>\n";
	echo dump(2, $entry);
	echo "\t\t</entry>\n";
?>	</inet>
	<inf>
<?
		$inf = XNODE_getpathbytarget("", "inf", "uid", "WAN-1", 0);
		if ($inf!="") echo dump(2, $inf);
?>	</inf>
	<runtime>
<?
$path = XNODE_getpathbytarget("/runtime", "inf", "uid", "WAN-1", 0);
	echo "\t\t<inf>\n";
	echo dump(3, $path);
	echo "\t\t</inf>\n";
$phyinf = XNODE_getpathbytarget("/runtime", "phyinf", "uid", "ETH-3", 0);
	echo "\t\t<phyinf>\n";
	echo dump(3, $phyinf);
	echo "\t\t</phyinf>\n";
?>
	</runtime>

	<FATLADY>ignore</FATLADY>
	<SETCFG>ignore</SETCFG>
	<ACTIVATE>ignore</ACTIVATE>
</module>
