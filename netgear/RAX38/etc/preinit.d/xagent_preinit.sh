#!/bin/sh

# Remove overlay old xagent file.
[ -d /overlay/opt/leafp2p ] && {
	rm -irf /overlay/opt/leafp2p
}

[ -d /overlay/opt/xagent ] && {
        rm -irf /overlay/opt/xagent
}

[ -d /overlay/opt/rcagent ] && {
        rm -irf /overlay/opt/rcagent
}

[ -d /overlay/opt/remote ] && {
        rm -irf /overlay/opt/remote
}

[ -d /overlay/usr/lib ] && {
        rm -irf /overlay/usr/lib
}

[ -d /overlay/www/cgi-bin ] && {
        rm -irf /overlay/www/cgi-bin
}
