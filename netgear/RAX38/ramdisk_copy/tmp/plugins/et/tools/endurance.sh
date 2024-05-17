#!/bin/sh

PLUGIN1_COMMANDS=2,6,8

P5_COMMANDS=4
P7_COMMANDS=1,4,6,12
P15_COMMANDS=4,5,6,7
P10_COMMANDS=6,9,10,12,13
P17_COMMANDS=3

P5=5-"($P5_COMMANDS)"
P7=7-"($P7_COMMANDS)"
P15=15-"($P15_COMMANDS)"
P10=10-"($P10_COMMANDS)"
P17=17-"($P17_COMMANDS)"

TEST1=7-"($PLUGIN1_COMMANDS)"


#Automation flow:
#-----------------
AUTOMATION(){
echo $P5:$P7:$P10:$P15:$P17 > /tmp/plugins/et/tools/test1.plugin
}

#Endurance test-1
#-----------------
ENDURANCETESTONE(){
echo $TEST1 > /tmp/plugins/et/tools/test1.plugin
}

