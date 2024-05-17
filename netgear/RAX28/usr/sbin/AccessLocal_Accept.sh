#!/bin/ash

echo "Access Local Accept at $1" > /dev/console

ebtables -D FORWARD -j wlisolation_$1 >/dev/null 2>&1 || true
ebtables -X wlisolation_$1 || true

ebtables -D INPUT -j deny_router_local_$1 >/dev/null 2>&1 || true
ebtables -X deny_router_local_$1 || true
