<?
include "/htdocs/phplib/xnode.php";

function dmz_setcfg($prefix, $svc)
{
	$nat = cut($svc, 1, ".");
	$base = XNODE_getpathbytarget("/nat", "entry", "uid", $nat);

	$dmzenable	= query($prefix."/nat/entry/dmz/enable");
	$dmzinf		= query($prefix."/nat/entry/dmz/inf");
	$dmzhostid	= query($prefix."/nat/entry/dmz/hostid");
	$dmzsch		= query($prefix."/nat/entry/dmz/schedule");

	set($base."/dmz/enable",	$dmzenable);
	set($base."/dmz/hostid",	$dmzhostid);
	set($base."/dmz/inf",		$dmzinf);
	set($base."/dmz/schedule",	$dmzsch);
	
	$sdmzenable	= query($prefix."/nat/entry/sdmz/enable");
	$sdmzmac	= query($prefix."/nat/entry/sdmz/mac");
	$sdmzsch	= query($prefix."/nat/entry/sdmz/schedule");
	set($base."/sdmz/enable",	$sdmzenable);
	set($base."/sdmz/mac",		$sdmzmac);
	set($base."/sdmz/schedule",	$sdmzsch);	
}

?>
