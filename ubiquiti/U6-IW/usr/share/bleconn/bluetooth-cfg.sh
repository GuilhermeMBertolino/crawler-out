#!/bin/sh

fill_default_bt_iface_json_object() {
	local fname="fill_default_bt_iface_json_object"
	[ $# -eq 10 ] || error "$fname: Invalid argument count"
	local driver_name="$1"
	local vendor_name="$2"
	local part_name="$3"
	local max_adv_cnt=$4
	local max_conn_cnt=$5
	local max_mtu=$6
	local max_att=$7
	local scanPhys="$8"
	local connPhys="$9"
	local advPhys="${10}"

	# === driver ===
	json_add_object "driver" || error "$fname: Failed to add [driver]"
	json_add_string "name" "$driver_name" || error "$fname: Failed to set [driver.name]"

	json_add_object "cfg" || error "$fname: Failed to add [driver.cfg]"
	json_close_object || error "$fname: Failed to close [driver.cfg]"

	json_close_object || error "$fname: Failed to close [driver]"

	# === device ===
	json_add_object "device" || error "$fname: Failed to add [device]"
	json_add_string "vendor" "$vendor_name" || error "$fname: Failed to set [vendor]"
	json_add_string "part" "$part_name" || error "$fname: Failed to set [part]"

	# === device.resources ===
	json_add_object "resources" || error "$fname: Failed to add [resources]"
	json_add_int "adv-cnt" $max_adv_cnt || error "$fname: Failed to set [adv-cnt]"
	json_add_int "conn-cnt" $max_conn_cnt || error "$fname: Failed to set [conn-cnt]"
	json_close_object || error "$fname: Failed to close [resources]"

	# === device.capabilities ===
	json_add_object "capabilities" || error "$fname: Failed to add [capabilities]"
	json_add_int "max-tx-power" 10 || error "$fname: Failed to set [max-tx-power]"
	json_add_int "max-mtu-size" $max_mtu || error "$fname: Failed to set [max-mtu-size]"
	json_add_boolean "adv" 1 || error "$fname: Failed to set [adv]"
	json_add_boolean "scan" 1 || error "$fname: Failed to set [scan]"
	json_add_boolean "conn" 1 || error "$fname: Failed to set [conn]"
	json_add_boolean "gatt-srv" 1 || error "$fname: Failed to set [gatt-srv]"
	json_add_boolean "gatt-cli" 1 || error "$fname: Failed to set [gatt-cli]"
	json_add_boolean "conn-adv" 1 || error "$fname: Failed to set [conn-adv]"
	json_add_boolean "scn-adv" 1 || error "$fname: Failed to set [scn-adv]"
	json_add_boolean "ext-adv" 1 || error "$fname: Failed to set [ext-adv]"
	json_add_boolean "passive-scan" 1 || error "$fname: Failed to set [passive-scan]"
	json_add_boolean "peri-role-conn-phy-change" 1 || error "$fname: Failed to set [peri-role-conn-phy-change]"
	json_add_boolean "cent-role-conn-phy-change" 1 || error "$fname: Failed to set [cent-role-conn-phy-change]"
	json_add_boolean "peri-role-conn-parms-change" 1 || error "$fname: Failed to set [peri-role-conn-parms-change]"
	json_add_boolean "cent-role-conn-parms-change" 1 || error "$fname: Failed to set [cent-role-conn-parms-change]"
	json_add_boolean "conn-latency-change" 1 || error "$fname: Failed to set [conn-latency-change]"
	json_add_boolean "conn-duplicate-mac" 1 || error "$fname: Failed to set [conn-duplicate-mac]"
	json_add_boolean "gatt-server-dynamic-gatt" 1 || error "$fname: Failed to set [gatt-server-dynamic-gatt]"
	json_add_boolean "gatt-server-polymorphic-gatt" 1 || error "$fname: Failed to set [gatt-server-polymorphic-gatt]"
	json_add_boolean "gatt-server-write-long-char" 1 || error "$fname: Failed to set [gatt-server-write-long-char]"
	json_add_boolean "gatt-client-write-long-char" 1 || error "$fname: Failed to set [gatt-client-write-long-char]"
	json_add_boolean "gatt-client-char-write-with-offset" 1 || error "$fname: Failed to set [gatt-client-char-write-with-offset]"
	json_add_boolean "gatt-client-char-write-no-response" 1 || error "$fname: Failed to set [gatt-client-char-write-no-response]"
	json_add_boolean "gatt-client-desc-write-with-offset" 1 || error "$fname: Failed to set [gatt-client-desc-write-with-offset]"
	json_add_int "max-gatt-client-char-value-len" $max_att || error "$fname: Failed to set [max-gatt-client-char-value-len]"
	json_add_int "max-gatt-client-desc-value-len" $max_att || error "$fname: Failed to set [max-gatt-client-desc-value-len]"
	json_add_int "max-gatt-server-char-value-len" $max_att || error "$fname: Failed to set [max-gatt-server-char-value-len]"
	json_add_int "max-gatt-server-desc-value-len" $max_att || error "$fname: Failed to set [max-gatt-server-desc-value-len]"

	json_add_array "scanPhys" || error "$fname: Failed to add [scanPhys]"
	for phy in $scanPhys; do
		json_add_string "" "$phy" || error "$fname: Failed to set [scanPhys] value"
	done
	json_close_array || error "$fname: Failed to close [scanPhys]"

	json_add_array "connPhys" || error "$fname: Failed to add [connPhys]"
	for phy in $connPhys; do
		json_add_string "" "$phy" || error "$fname: Failed to set [scanPhys] value"
	done
	json_close_array || error "$fname: Failed to close [connPhys]"

	json_add_array "advPhys" || error "$fname: Failed to add [advPhys]"
	for phy in $advPhys; do
		json_add_string "" "$phy" || error "$fname: Failed to set [scanPhys] value"
	done
	json_close_array || error "$fname: Failed to close [advPhys]"

	json_add_array "addr-types" || error "$fname: Failed to add [addr-types]"
	json_add_string "" "PUBLIC" || error "$fname: Failed to set [addr-types] value"
	json_add_string "" "RANDOM" || error "$fname: Failed to set [addr-types] value"
	json_close_array || error "$fname: Failed to close [addr-types]"

	json_close_object || error "$fname: Failed to close [capabilities]"

	json_close_object || error "$fname: Failed to close [device]"
}

fill_blue_gecko_bt_json_object() {
	local fname="fill_blue_gecko_bt_json_object"
	[ $# -eq 11 ] || error "$fname: Invalid argument count"
	local vendor_name="$1"
	local part_name="$2"
	local max_adv_cnt=$3
	local max_conn_cnt=$4
	local max_mtu=$5
	local max_att=$6
	local scanPhys="$7"
	local connPhys="$8"
	local advPhys="$9"
	local bt_mac="${10}"
	local bt_share_dir="${11}"
	local bt_iface_name="silabs0"

	json_add_object "ifaces" || error "$fname: Failed to add [ifaces]"
	json_add_object "$bt_iface_name" || error "$fname: Failed to add BT iface [$bt_iface_name]"

	fill_default_bt_iface_json_object "blue_gecko" "$vendor_name" "$part_name" \
		$max_adv_cnt $max_conn_cnt $max_mtu $max_att \
		"$scanPhys" "$connPhys" "$advPhys" || error "$fname: Failed to set default values"

	json_select "driver" || error "$fname: Failed to select [driver]"
	json_select "cfg" || error "$fname: Failed to select [cfg]"
	json_add_string "mac" "$bt_mac" || error "$fname: Failed to set [mac]"
	json_add_string "img-path" "$bt_share_dir/udm-b-bt-firmware.gbl" || error "$fname: Failed to set [img-path]"
	json_add_string "dfu-boot-exe" "$bt_share_dir/udm-b-bt-dfu-loader.sh" || error "$fname: Failed to set [dfu-boot-exe]"
	json_add_string "uart-path" "/dev/ttyS1" || error "$fname: Failed to set [uart-path]"
	json_add_boolean "uart-flow-ctrl-enabled" 1 || error "$fname: Failed to set [uart-flow-ctrl-enabled]"
	json_select ".."
	json_select ".."

	json_close_object || error "$fname: Failed to close BT iface [$bt_iface_name]"
	json_close_object || error "$fname: Failed to add [ifaces]"

	json_add_string "default-iface" "$bt_iface_name" || error "$fname: Failed to set [default-iface]"
}

fill_mt7915_bt_json_object() {
	local fname="fill_mt7915_bt_json_object"
	[ $# -eq 10 ] || error "$fname: Invalid argument count"
	local vendor_name="$1"
	local part_name="$2"
	local max_adv_cnt=$3
	local max_conn_cnt=$4
	local max_mtu=$5
	local max_att=$6
	local scanPhys="$7"
	local connPhys="$8"
	local advPhys="$9"
	local bt_mac="${10}"
	local bt_iface_name="mtk0"

	json_add_object "ifaces" || error "$fname: Failed to add [ifaces]"
	json_add_object "$bt_iface_name" || error "$fname: Failed to add BT iface [$bt_iface_name]"

	fill_default_bt_iface_json_object "mt7915" "$vendor_name" "$part_name" \
		$max_adv_cnt $max_conn_cnt $max_mtu $max_att \
		"$scanPhys" "$connPhys" "$advPhys" || error "$fname: Failed to set default values"

	json_select "driver" || error "$fname: Failed to select [driver]"
	json_select "cfg" || error "$fname: Failed to select [cfg]"

	json_add_object "driverCfg" || error "$fname: Failed to add [driverCfg]"
	json_add_string "mac" "$bt_mac" || error "$fname: Failed to set [mac]"
	json_close_object || error "$fname: Failed to close [driverCfg]"

	json_select ".."
	json_select ".."


	json_close_object || error "$fname: Failed to close BT iface [$bt_iface_name]"
	json_close_object || error "$fname: Failed to add [ifaces]"

	json_add_string "default-iface" "$bt_iface_name" || error "$fname: Failed to set [default-iface]"
}

fill_bluetopia_bt_json_object() {
	local fname="fill_bluetopia_bt_json_object"
	[ $# -eq 17 ] || error "$fname: Invalid argument count"
	local vendor_name="$1"
	local part_name="$2"
	local max_adv_cnt=$3
	local max_conn_cnt=$4
	local max_mtu=$5
	local max_att=$6
	local scanPhys="$7"
	local connPhys="$8"
	local advPhys="$9"
	local host_name="${10}"
	local bt_share_dir="${11}"
	local bt_src_name="${12}"
	local bt_src_type="${13}"
	local bt_src_baud_rate=${14}
	local bt_rf_comp_tx_path=${15}
	local bt_rf_comp_rx_path=${16}
	local bt_dev_appearance=${17}
	local bt_iface_name="qca0"

	json_add_object "ifaces" || error "$fname: Failed to add [ifaces]"
	json_add_object "$bt_iface_name" || error "$fname: Failed to add BT iface [$bt_iface_name]"

	fill_default_bt_iface_json_object "bluetopia" "$vendor_name" "$part_name" \
		$max_adv_cnt $max_conn_cnt $max_mtu $max_att \
		"$scanPhys" "$connPhys" "$advPhys" || error "$fname: Failed to set default values"

	json_select "driver" || error "$fname: Failed to select [driver]"
	json_select "cfg" || error "$fname: Failed to select [cfg]"

	json_add_object "driverCfg" || error "$fname: Failed to add [driverCfg]"

	json_add_object "commCfg" || error "$fname: Failed to add [commCfg]"
	json_add_int "number" -1 || error "$fname: Failed to set [number]"
	json_add_int "baudRate" $bt_src_baud_rate || error "$fname: Failed to set [baudRate]"
	json_add_string "type" "$bt_src_type" || error "$fname: Failed to set [type]"
	json_add_int "delay" 0 || error "$fname: Failed to set [delay]"
	json_add_string "name" "$bt_src_name" || error "$fname: Failed to set [name]"
	json_add_array "flags" || error "$fname: Failed to add [flags]"
	json_close_array || error "$fname: Failed to close [flags]"
	json_close_object || error "$fname: Failed to close [commCfg]"

	json_add_object "rfCompensation" || error "$fname: Failed to add [rfCompensation]"
	json_add_double "txPath" $bt_rf_comp_tx_path || error "$fname: Failed to set [txPath]"
	json_add_double "rxPath" $bt_rf_comp_rx_path || error "$fname: Failed to set [rxPath]"
	json_close_object || error "$fname: Failed to close [rfCompensation]"

	if [ "$bt_dev_appearance" != "-" ]; then
		json_add_object "gattCfg" || error "$fname: Failed to add [gattCfg]"
		json_add_object "serverCfg" || error "$fname: Failed to add [serverCfg]"
		json_add_object "genericAccessServiceCfg" || error "$fname: Failed to add [genericAccessServiceCfg]"
		json_add_string "deviceName" "$host_name" || error "$fname: Failed to set [deviceName]"
		json_add_int "appearance" $bt_dev_appearance || error "$fname: Failed to set [appearance]"
		json_close_object || error "$fname: Failed to close [genericAccessServiceCfg]"
		json_close_object || error "$fname: Failed to close [serverCfg]"
		json_close_object || error "$fname: Failed to close [gattCfg]"
	fi

	json_close_object || error "$fname: Failed to close [driverCfg]"

	json_add_object "recoveryCfg" || error "$fname: Failed to add [recoveryCfg]"
	json_add_string "cmd" "$bt_share_dir/bluetopia-recovery.sh /var/lock/SS1LCK_$(echo "$bt_src_name" | sed 's|/|_|g')" || error "$fname: Failed to set [cmd]"
	json_close_object || error "$fname: Failed to close [recoveryCfg]"

	json_select ".."
	json_select ".."


	json_close_object || error "$fname: Failed to close BT iface [$bt_iface_name]"
	json_close_object || error "$fname: Failed to add [ifaces]"

	json_add_string "default-iface" "$bt_iface_name" || error "$fname: Failed to set [default-iface]"
}
