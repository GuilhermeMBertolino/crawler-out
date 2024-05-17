#!/bin/sh

# Enable Internal GPHY port (SF2 port 0) Flow Control
ethswctl -c pause -n 0 -p 0 -v 2

# Enable 50991/SGMII-0 port (SF2 port 5) Flow Control
ethswctl -c pause -n 0 -p 5 -v 2

# Enable 53134/SGMII-1 port (SF2 port 6) Flow Control
ethswctl -c pause -n 0 -p 6 -v 2
