
ledpm_start()
{      
    /sbin/ledpm &
}

ledpm_stop()
{
    local pid=$(cat /var/run/ledpm.pid)
    [ -n "$pid" ] && kill $pid
    rm -f /var/fun/ledpm.pid
}

ledpm_restart()
{
    ledpm_stop
    ledpm_start
}

ledpm_reload()
{
    ledpm_start
}

