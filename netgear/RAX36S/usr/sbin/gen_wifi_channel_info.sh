#!/bin/sh

factory_mode="$(/bin/config get factory_mode)"
if [ "${factory_mode}" = "1" ]; then
	return 0;
fi

sh /sbin/radardetect_cli &

. /etc/wlan/wifi_conf

DEBUG=0

action="$1"

#wifi1_band_mode="$(/bin/config get wifi1_band_mode)"
#wifi2_band_mode="$(/bin/config get wifi2_band_mode)"
#board_DFS_region="$(/bin/config get board_DFS_region)"
#board_band_info="$(/bin/config get board_band_info)"
#board_outdoor_mode="$(/bin/config get board_outdoor_mode)"
#board_outdoor_region="$(/bin/config get board_outdoor_region)"

module_name=$(cat /module_name)
if [ "$(config get radio_number)" = "0x3" ]; then #RAX10
	if [ "${module_name}" = "RAX36S" ]; then
		board_DFS_region="Africa, Asia, Australia, Canada, Europe, Israel, Japan, Korea, Mexico, South America, United States, China, India, Malaysia, Algeria, Iran, Egypt, Turkey, Saudi Arabia, Russia, Singapore, Taiwan, Hong Kong, Vietnam, New Zealand, United Arab Emirates"
	else #need remove NA/CA DFS channel when project is RAX10/RAX10v2
		board_DFS_region="Africa, Asia, Australia, Europe, Israel, Japan, Korea, Mexico, South America, China, India, Malaysia, Algeria, Iran, Egypt, Turkey, Saudi Arabia, Russia, Singapore, Hong Kong, Vietnam, New Zealand, United Arab Emirates"
	fi
else
	board_DFS_region="Africa, Asia, Australia, Canada, Europe, Israel, Japan, Korea, Mexico, South America, United States, China, India, Malaysia, Algeria, Iran, Egypt, Turkey, Saudi Arabia, Russia, Singapore, Taiwan, Hong Kong, Vietnam, New Zealand, United Arab Emirates"
fi

board_outdoor_mode=""
board_outdoor_region=""

CHAN_REG_FILE="/etc/channel_regulations.conf"
JSON_FILE="/tmp/channel_info.json"
BOARD_REGULAR_CHANNEL="/etc/board_regular_channel.json"
DEV_ASP="/www/channel_info.json"
MAX_REGION_NUM=25

#    "0": "Africa",
#    "1": "Asia",
#    "2": "Australia",
#    "3": "Canada",
#    "4": "Europe",
#    "5": "Israel",
#    "6": "Japan",
#    "7": "Korea",
#    "8": "Mexico",
#    "9": "South America",
#    "10": "United States"
#    "11": "China",
#    "12": "India",
#    "13": "Malaysia",
#    "14": "xxxx",
#    "15": "xxxx",
#    "16": "Turkey",
#    "17": "Saudi Arabia",
#    "18": "United Arab Emirates",
#    "19": "Russia",
#    "20": "Singapore",
#    "21": "Taiwan, Province of China",
#    "22": "xxxx",



json_header()
{
        echo "    \"$1\":[" >> $JSON_FILE
}

json_tail()
{
        sed -i '$s/},/}/g'  $JSON_FILE
        echo >> $JSON_FILE
        echo  -n "            ]," >> $JSON_FILE
        echo >>  $JSON_FILE
}


gen_channel_json()
{
    num=$1

    RADIOS="wifi0 wifi1 wifi2"
    if [ "x$board_band_info" == "xtriad-band" ];then
        RADIOS="wifi0 wifi1 wifi2"
    elif [ "x$board_band_info" == "xdual-band" ];then
        RADIOS="wifi0 wifi1"
    fi

    for radio in $RADIOS
    do

        local ht20_chan=""
        local ht20_channels=""
        local ht40_chan=""
        local ht40_channels=""
        local ht80_chan=""
        local ht80_channels=""
        local ht160_chan=""
        local ht160_channels=""
        local region=""
        local items=""

        if [ "x$radio" = "xwifi0" ];then
            radio_class="2G"
        else
            radio_class="5G"
        fi

        for mode in HT20 HT40 HT80 HT160
        do
            local channel_info=""

            channel_info=$(cat $CHAN_REG_FILE | grep -E "^$num " | grep "$radio_class" | grep "$mode")
            region=$(echo $channel_info | awk -F# '{print $2}'| sed 's/^[ \t]*//g' | sed 's/[ \t]*$//g')
            [ "x$region" = "x" ] && region="xxxx"
            [ $DEBUG -eq 1 ] && echo "region: $region" 
            case $mode in
                HT20) 
                    ht20_chan=$(echo $channel_info | awk -F# '{print $NF}'| sed 's/ //g' | \grep -o "\[.*\]")
                    # if this region not support dfs channel, we should filter them
                    echo "$board_DFS_region" | grep "$region" > /dev/null 
                    if [ $? -ne 0 ];then
                        ht20_channels=$(echo $ht20_chan | sed 's/,/,\n/g' | sed 's/]/\n]/g'| \grep -vi DFS | xargs | sed 's/, ]/ ]/g')
                    else
                        ht20_channels=$ht20_chan
                    fi
                    [ $DEBUG -eq 1 ] && echo "rht20_channels: $ht20_channels" 

                    ;;
                HT40) 
                    ht40_chan=$(echo $channel_info | awk -F# '{print $NF}'| sed 's/ //g' | \grep -o "\[.*\]")
                    # if this region not support dfs channel, we should filter them
                    echo "$board_DFS_region" | grep "$region" > /dev/null 
                    if [ $? -ne 0 ];then
                        ht40_channels=$(echo $ht40_chan | sed 's/,/,\n/g' | sed 's/]/\n]/g'| \grep -vi DFS | xargs | sed 's/, ]/ ]/g')
                    else
                        ht40_channels=$ht40_chan
                    fi
                    [ $DEBUG -eq 1 ] && echo "rht40_channels: $ht40_channels" 
                    ;;
                HT80) ht80_chan=$(echo $channel_info | awk -F# '{print $NF}'| sed 's/ //g' | \grep -o "\[.*\]")
                    # if this region not support dfs channel, we should filter them
                    echo "$board_DFS_region" | grep "$region"  > /dev/null
                    if [ $? -ne 0 ];then
                        ht80_channels=$(echo $ht80_chan | sed 's/,/,\n/g' | sed 's/]/\n]/g'| \grep -vi DFS | xargs | sed 's/, ]/ ]/g')
                    else
                        ht80_channels=$ht80_chan
                    fi
                    [ $DEBUG -eq 1 ] && echo "rht80_channels: $ht80_channels" 
                    ;;
                HT160) ht160_chan=$(echo $channel_info | awk -F# '{print $NF}'| sed 's/ //g' | \grep -o "\[.*\]")
                    # if this region not support dfs channel, we should filter them
                    echo "$board_DFS_region" | grep "$region"  > /dev/null
                    if [ $? -ne 0 ];then
                        ht160_channels=$(echo $ht160_chan | sed 's/,/,\n/g' | sed 's/]/\n]/g'| \grep -vi DFS | xargs | sed 's/, ]/ ]/g')
                    else
                        ht160_channels=$ht160_chan
                    fi
                    [ $DEBUG -eq 1 ] && echo "rht160_channels: $ht160_channels" 
                    ;;
            esac
        done

        ht20_channels_final=$(echo $ht20_channels |sed 's/\[//g' | sed 's/\]//g' | sed 's/[ \t]*//g')
        ht40_channels_final=$(echo $ht40_channels |sed 's/\[//g' | sed 's/\]//g' | sed 's/[ \t ]*//g')
        ht80_channels_final=$(echo $ht80_channels |sed 's/\[//g' | sed 's/\]//g' | sed 's/[ \t ]*//g')
        ht160_channels_final=$(echo $ht160_channels |sed 's/\[//g' | sed 's/\]//g' | sed 's/[ \t ]*//g')

        # sort the high/low band channel for wifi1 and wifi2
        # if wifi1 works in low band, then will remove the high band from channel list, verse
        # if wifi2 works in high band, then will remove the low band from channel list, verse
        case $radio in
            wifi1)
                if [ "x$wifi1_band_mode" = "xlow" ];then
                    ht20_channels_final=$(echo "$ht20_channels_final" | sed 's/,/,\n/g' | grep -E -v "^1" | xargs | sed 's/,$//')
                    ht40_channels_final=$(echo "$ht40_channels_final" | sed 's/,/,\n/g' | grep -E -v "^1" | xargs | sed 's/,$//')
                    ht80_channels_final=$(echo "$ht80_channels_final" | sed 's/,/,\n/g' | grep -E -v "^1" | xargs | sed 's/,$//')
                    ht160_channels_final=$(echo "$ht160_channels_final" | sed 's/,/,\n/g' | grep -E -v "^1" | xargs | sed 's/,$//')
                elif [ "x$wifi1_band_mode" = "xhigh"  ];then
                    ht20_channels_final=$(echo "$ht20_channels_final" | sed 's/,/,\n/g' | grep -E "^1" | xargs | sed 's/,$//')
                    ht40_channels_final=$(echo "$ht40_channels_final" | sed 's/,/,\n/g' | grep -E "^1" | xargs | sed 's/,$//')
                    ht80_channels_final=$(echo "$ht80_channels_final" | sed 's/,/,\n/g' | grep -E "^1" | xargs | sed 's/,$//')
                    ht160_channels_final=$(echo "$ht160_channels_final" | sed 's/,/,\n/g' | grep -E "^1" | xargs | sed 's/,$//')
		else
                    ht20_channels_final=$(echo "$ht20_channels_final" | sed 's/,/,\n/g' | xargs | sed 's/,$//')
                    ht40_channels_final=$(echo "$ht40_channels_final" | sed 's/,/,\n/g' | xargs | sed 's/,$//')
                    ht80_channels_final=$(echo "$ht80_channels_final" | sed 's/,/,\n/g' | xargs | sed 's/,$//')
                    ht160_channels_final=$(echo "$ht160_channels_final" | sed 's/,/,\n/g' | xargs | sed 's/,$//')
                fi
                ;;
            wifi2)
                if [ "x$wifi2_band_mode" = "xlow" ];then
                    ht20_channels_final=$(echo "$ht20_channels_final" | sed 's/,/,\n/g' | grep -E -v "^1" | xargs | sed 's/,$//')
                    ht40_channels_final=$(echo "$ht40_channels_final" | sed 's/,/,\n/g' | grep -E -v "^1" | xargs | sed 's/,$//')
                    ht80_channels_final=$(echo "$ht80_channels_final" | sed 's/,/,\n/g' | grep -E -v "^1" | xargs | sed 's/,$//')
                    ht160_channels_final=$(echo "$ht160_channels_final" | sed 's/,/,\n/g' | grep -E -v "^1" | xargs | sed 's/,$//')
                elif [ "x$wifi2_band_mode" = "xhigh"  ];then
                    ht20_channels_final=$(echo "$ht20_channels_final" | sed 's/,/,\n/g' | grep -E "^1" | xargs | sed 's/,$//')
                    ht40_channels_final=$(echo "$ht40_channels_final" | sed 's/,/,\n/g' | grep -E "^1" | xargs | sed 's/,$//')
                    ht80_channels_final=$(echo "$ht80_channels_final" | sed 's/,/,\n/g' | grep -E "^1" | xargs | sed 's/,$//')
                    ht160_channels_final=$(echo "$ht160_channels_final" | sed 's/,/,\n/g' | grep -E "^1" | xargs | sed 's/,$//')
                    if [ "x$board_outdoor_mode" = "xenable" ];then
                        #current support outdoor mode region including 'Australia, Europe, Japan, China' 
                        if [ "x$(echo "$board_outdoor_region" | grep "$region")" != "x" ];then
                                case $region in  #spec define below regions for outdoor mode, if have new region defined, should add case in below switch item.
                                    Europe)  # band3 for outdoor mode
                                        outdoor_ht20_channels_final=$ht20_channels_final
                                        outdoor_ht40_channels_final=$ht40_channels_final
                                        outdoor_ht80_channels_final=$ht80_channels_final
                                        outdoor_ht160_channels_final=$ht160_channels_final
                                        ;;
                                    Australia)  # band4 for outdoor mode
                                        outdoor_ht20_channels_final=$(echo $ht20_channels_final | sed 's/,/,\n/g' | sed 's/]/\n]/g'| \grep -vi DFS | xargs | sed 's/, ]/ ]/g')
                                        outdoor_ht40_channels_final=$(echo $ht40_channels_final | sed 's/,/,\n/g' | sed 's/]/\n]/g'| \grep -vi DFS | xargs | sed 's/, ]/ ]/g')
                                        outdoor_ht80_channels_final=$(echo $ht80_channels_final | sed 's/,/,\n/g' | sed 's/]/\n]/g'| \grep -vi DFS | xargs | sed 's/, ]/ ]/g')
                                        outdoor_ht160_channels_final=$(echo $ht160_channels_final | sed 's/,/,\n/g' | sed 's/]/\n]/g'| \grep -vi DFS | xargs | sed 's/, ]/ ]/g')
                                        ;;
                                    Japan)  # band3 for outdoor mode
                                        outdoor_ht20_channels_final=$ht20_channels_final
                                        outdoor_ht40_channels_final=$ht40_channels_final
                                        outdoor_ht80_channels_final=$ht80_channels_final
                                        outdoor_ht160_channels_final=$ht160_channels_final
                                        ;;
                                    China) # band4 for outdoor mode
                                        outdoor_ht20_channels_final=$(echo $ht20_channels_final | sed 's/,/,\n/g' | sed 's/]/\n]/g'| \grep -vi DFS | xargs | sed 's/, ]/ ]/g')
                                        outdoor_ht40_channels_final=$(echo $ht40_channels_final | sed 's/,/,\n/g' | sed 's/]/\n]/g'| \grep -vi DFS | xargs | sed 's/, ]/ ]/g')
                                        outdoor_ht80_channels_final=$(echo $ht80_channels_final | sed 's/,/,\n/g' | sed 's/]/\n]/g'| \grep -vi DFS | xargs | sed 's/, ]/ ]/g')
                                        outdoor_ht160_channels_final=$(echo $ht160_channels_final | sed 's/,/,\n/g' | sed 's/]/\n]/g'| \grep -vi DFS | xargs | sed 's/, ]/ ]/g')
                                        ;;
                                esac    
                        fi 
                    fi
                fi
                ;;
        esac 

        
        if [ "x$board_outdoor_mode" = "xenable" -a "x$radio" = "xwifi2" ];then
            # if the reigon belong to outdoor region, should handle it
            if [ "x$(echo "$board_outdoor_region" | grep "$region")" != "x" ];then
                items="\"$radio\":{
                            \"HT20\":\"$ht20_channels_final\",
                            \"HT40\":\"$ht40_channels_final\",
                            \"HT80\":\"$ht80_channels_final\",
                            \"HT160\":\"$ht160_channels_final\",
                            \"HT20_outdoor\":\"$outdoor_ht20_channels_final\",
                            \"HT40_outdoor\":\"$outdoor_ht40_channels_final\",
                            \"HT80_outdoor\":\"$outdoor_ht80_channels_final\",
                            \"HT160_outdoor\":\"$outdoor_ht160_channels_final\""
            else
                items="\"$radio\":{
                            \"HT20\":\"$ht20_channels_final\",
                            \"HT40\":\"$ht40_channels_final\",
                            \"HT80\":\"$ht80_channels_final\",
                            \"HT160\":\"$ht160_channels_final\""
            fi
        else
			if [ "$num" = "22" -a "x$board_band_info" == "xdual-band" ]; then
				ht20_channels_final=$(echo $ht20_channels_final | sed 's/120(DFS), 124(DFS), 128(DFS), //g' | sed 's/144(DFS), //g')
				ht40_channels_final=$(echo $ht40_channels_final | sed 's/116(DFS), 120(DFS), 124(DFS), 128(DFS), //g' | sed 's/140(DFS), 144(DFS), //g')
				ht80_channels_final=$(echo $ht80_channels_final | sed 's/116(DFS), 120(DFS), 124(DFS), 128(DFS), 132(DFS), 136(DFS), 140(DFS), 144(DFS), //g')
			fi
            items="\"$radio\":{
                            \"HT20\":\"$ht20_channels_final\",
                            \"HT40\":\"$ht40_channels_final\",
                            \"HT80\":\"$ht80_channels_final\",
                            \"HT160\":\"$ht160_channels_final\""
        fi


        case $radio in
            wifi0)
                wifi0_channel=$items
                ;;
            wifi1)
                wifi1_channel=$items
                ;;
            wifi2)
                wifi2_channel=$items
                ;;
        esac 
    done

    if [ "x$board_band_info" == "xdual-band" -o  "x$wifi2_channel" = "x" ];then
        wifi2_channel="\"wifi2\":{
                        \"HT20\":\"\",
                        \"HT40\":\"\",
                        \"HT80\":\"\",
                        \"HT160\":\"\""
    fi

    if [ $num -eq $MAX_REGION_NUM ];then
        echo >> $BOARD_REGULAR_CHANNEL
        echo "  \"region-$num\":{
                    \"region\":\"$region\",
                    $wifi0_channel
                            },
                    $wifi1_channel
                            },
                    $wifi2_channel
                        }    
        }
        " >> $BOARD_REGULAR_CHANNEL
    else
        echo >> $BOARD_REGULAR_CHANNEL
        echo "  \"region-$num\":{
                    \"region\":\"$region\",
                    $wifi0_channel
                            },
                    $wifi1_channel
                            },
                    $wifi2_channel
                        }    
        },
        " >> $BOARD_REGULAR_CHANNEL
    fi
}


gen_board_channel_info()
{
        for num in $(seq 0 $MAX_REGION_NUM)
        do
            gen_channel_json $num $radio
        done
}

gen_current_channel_info()
{
    dfs_region="$board_DFS_region"
    outdoor_region="$board_outdoor_region"

    RADIOS="wifi0 wifi1 wifi2"
    if [ "x$board_band_info" == "xtriad-band" ];then
        RADIOS="wifi0 wifi1 wifi2"
    elif [ "x$board_band_info" == "xdual-band" ];then
        RADIOS="wifi0 wifi1"
    fi

	endis_wl_radio="$(/bin/config get endis_wl_radio)"
	endis_wla_radio="$(/bin/config get endis_wla_radio)"
	endis_wla_2nd_radio="$(/bin/config get endis_wla_2nd_radio)"
    for radio in $RADIOS
    do
        case $radio in
            wifi0)
				wifi0_config_channel="$(/bin/config get wl_channel)"
				if [ "x$wifi0_config_channel" == "x0" ];then # 2G Auto channel
					channel_2g="Auto"
				elif [ "x$endis_wl_radio" == "x0" ];then
					channel_2g="$(/bin/config get wl_hidden_channel)"
				else 
					channel_2g=$(wl -i ${mainifname_2G} channel |grep current |awk '{print $4}')
				fi
                ;;
            wifi1)
				if [ "x$endis_wla_radio" == "x0" ];then
					channel_5g="$(/bin/config get wla_hidden_channel)"
				else 
					channel_5g=$(wl -i ${mainifname_5GL} channel |grep current |awk '{print $4}')
				fi
                ;;
            wifi2)
				if [ "x$endis_wla_2nd_radio" == "x0" ];then
					channel_5g2="$(/bin/config get wla_2nd_hidden_channel)"
				else 
					channel_5g2=$(wl -i ${mainifname_5GH} channel |grep current |awk '{print $4}')
				fi
                ;;
        esac
    done

    if [ "x$board_band_info" = "xtriad-band" ];then
        echo >> $JSON_FILE
        echo " \"current_info\":{
                \"dfs_region\":\"$dfs_region\",
                \"outdoor_region\":\"$outdoor_region\",
                \"wifi0\":\"$channel_2g\",
                \"wifi1\":\"$channel_5g\",
                \"wifi2\":\"$channel_5g2\",
                \"wifi1_band_mode\":\"$wifi1_band_mode\",
                \"wifi2_band_mode\":\"$wifi2_band_mode\"
            },
        " >> $JSON_FILE
    elif [ "x$board_band_info" = "xdual-band"  ];then
        echo >> $JSON_FILE
        echo " \"current_info\":{
                \"dfs_region\":\"$dfs_region\",
                \"outdoor_region\":\"$outdoor_region\",
                \"wifi0\":\"$channel_2g\",
                \"wifi1\":\"$channel_5g\"
            },
        " >> $JSON_FILE
    fi
}


main()
{
    rm -f $JSON_FILE

    if [ "x$action" = "xsetup"  ];then
        rm -f $BOARD_REGULAR_CHANNEL
        gen_board_channel_info
    fi

    echo "{" >> $JSON_FILE
    gen_current_channel_info
    cat $BOARD_REGULAR_CHANNEL >> $JSON_FILE

    sed -i '$s/],/]/g'  $JSON_FILE
    echo "}" >> $JSON_FILE

	eval sed -i 's/wifi0/${mainifname_2G}/g' $JSON_FILE	#2G
	eval sed -i 's/wifi1/${mainifname_5GL}/g' $JSON_FILE	#5G L
	eval sed -i 's/wifi2/${mainifname_5GH}/g' $JSON_FILE	#5G H

    rm -f $DEV_ASP
    cp -f $JSON_FILE $DEV_ASP

}

main $action

