<?
include "/htdocs/phplib/xnode.php";

$LDAP_MODULE="/lib/modules/lacp.ko";

fwrite("w", $START, "#!/bin/sh\n");
fwrite("w", $STOP,  "#!/bin/sh\n");

if (isfile($LDAP_MODULE)==1)
{
	fwrite("a", $START, "nvram set lacp=1\n");
	fwrite("a", $START, "nvram set lacpdev=eth0.1\n");
	fwrite("a", $START, "nvram set lacpmode=1\n");
	fwrite("a", $START, "nvram set lacpports=\"2 3\"\n");
	fwrite("a", $START, "nvram set lacpdebug=0\n");
	fwrite("a", $START, "insmod ".$LDAP_MODULE."\n");
	fwrite("a", $STOP, "rmmod ".$LDAP_MODULE."\n");
}
else
{
	fwrite("a", $START, "echo \"LINKAGG no lacp module!\" > /dev/console\n");
}

fwrite("a", $START, "exit 0\n");
fwrite("a", $STOP, "exit 0\n");
?>
