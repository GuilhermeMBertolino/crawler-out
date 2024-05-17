#!/bin/sh
xmldbc -P /etc/scripts/gen_SysLogSettings.php
echo "[$0]: System log generated!" > /dev/console
