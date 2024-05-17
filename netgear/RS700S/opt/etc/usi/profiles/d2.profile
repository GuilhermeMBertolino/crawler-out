### this file should NOT be modificated!!!

set = d2 -c xagentcfg[0].%KEY% '%VALUE%'
get = d2 xagentcfg[0].%KEY% | awk '{print $2}'
show = d2 xagentcfg[0]
unset = d2 -c xagentcfg[0].%KEY% ''
