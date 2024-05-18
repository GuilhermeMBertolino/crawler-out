#!/bin/sh
cd /etc/speed-test/
#touch /tmp/speedtest_locally
if [ -e /tmp/speedtest_locally ]; then
	speed-test > /tmp/log/speed_test.result
else
	speed-test --configurl=http://www.speedtest.net/api/embed/tplink/config > /tmp/log/speed_test.result
fi
lua -e 'require("luci.model.speed_test").save_last_record()'
cd - > /dev/null
