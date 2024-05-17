#!/bin/sh

addSpecialDeviceInfo()
{
	echo "------------------------------------------------------:addSpecialDeviceInfoFunc:------------------------------------------------------"
	local interface=$1
	local file_name="${output}/${interface}/Device.DeviceInfo"
	touch $file_name
	echo "Object_0=Device.DeviceInfo" >> $file_name
	echo "DeviceCategory_0=" >> $file_name
	echo "Manufacturer_0=Intel Corporation" >> $file_name
	echo "ModelName_0=" >> $file_name
	echo "ModelNumber_0=" >> $file_name
	echo "Description_0=TR069 Gateway" >> $file_name
	echo "ProductClass_0=CPE" >> $file_name
	echo "SerialNumber_0=" >> $file_name
	echo "HardwareVersion_0=" >> $file_name
	echo "SoftwareVersion_0=" >> $file_name
	echo "AdditionalHardwareVersion_0=" >> $file_name
	echo "AdditionalSoftwareVersion_0=" >> $file_name
	echo "ProvisioningCode_0=YYYY.ZZZZ" >> $file_name
	echo "UpTime_0=62" >> $file_name
	echo "FirstUseDate_0=999-12-31T23:59:59Z" >> $file_name
	echo "VendorLogFileNumberOfEntries_0=1" >> $file_name
	echo "VendorConfigFileNumberOfEntries_0=2" >> $file_name
	echo "ManufacturerOUI_0=" >> $file_name
	echo "ManufacturerOUI_0=" >> $file_name
}

addSpecialToInterface()
{
	echo "------------------------------------------------------:addSpecialToInterfaceFunc:------------------------------------------------------"
	local file_name=$1/Device.WiFi.Security_State
	echo "Object_0=Device.WiFi.Security_State" > $file_name
	echo "WpaEncMode_0=AESEncryption" >> $file_name
	echo "EncryptionMode_0=ENC_AES" >> $file_name
	echo "BasicAuthMode_0=None" >> $file_name
	echo "AuthenticationMode_0=AUTH_PSK" >> $file_name
	type=`grep "ModeEnabled_0" $1/Device.WiFi.AccessPoint.Security | awk -F "="  '{ print $2 }'`
	if [ "$type" == "WPA2-Personal" ]
	then
		type=11i
	elif [ "$type" == "None" ]
	then
		type=None
	else
		#TBD ...
		echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Error <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
	fi
	echo "BeaconType_0=${type}" >> $file_name
}

prepareRadio()
{
	echo "------------------------------------------------------:prepareRadioFunc:------------------------------------------------------"
	eval $dbXml ${xmlDataPath} ${output}/
	cd ${output}

	radioList=`ls Device.WiFi.Radio.[1-9] | awk -F "."  '{print $4}'`

	for radioNumber in $radioList
	do
		#We need decrease 1 because in WLAN the counting start from 0
		radioRPC=$radioNumber
		let radioRPC=$radioRPC-1
		let radioRPC=$radioRPC*2

		mkdir -p ${output}/radio${radioRPC}/
		for file in `ls | grep "Device\.WiFi\.[a-zA-Z]*\.${radioNumber}"`
		do
			tmp_file=`echo $file  | sed 's/\.[0-9]//1'`
			sed -i "1s/.*/Object_0=$tmp_file/" $file
			mv $file `echo $file  | sed 's/\.[0-9]//1'`
			mv $tmp_file ${output}/radio${radioRPC}/
		done

		addSpecialToInterface "${output}/radio${radioRPC}/"
	done
	mv ./Device.WiFi* ${output}/
	
	for i in $radioList
	do
		let i=$i-1
		let i=$i*2
		nondup=`ls ${output}/radio${i} | grep '.\.[0-9]$' | sed 's/.\{2\}$//' | awk '{!seen[$0]++};END{for(k in seen) if(seen[k]==1)print k}'`
		for file in $nondup
		do
			tmp_file="${file}.1"
			sed -i "1s/.*/Object_0=$file/" ${output}/radio${i}/$tmp_file
			mv ${output}/radio${i}/$tmp_file ${output}/radio${i}/$file
		done
	done
	
	for i in $radioList; do
		let i=$i-1
		let i=$i*2
		nondup=`ls ${output}/radio${i} | grep '.\.[0-9][0-9]$' | sed 's/.\{3\}$//' | awk '{!seen[$0]++};END{for(q in seen) if(seen[q]==1)print q}'`

		if [ "$nondup" ]; then
			echo " ERROR: file name ends with *.##"
			exit
		fi
	done
	# Save EndPoints SSIDs:
	mkdir /tmp/endpoints_ssids
	cp ${output}/Device.* /tmp/endpoints_ssids/
	
	rm -f ${output}/Device\.
	mkdir ${output}/radios
	mv ${output}/* ${output}/radios/
	cd -
}

prepareVap()
{
	echo "------------------------------------------------------:PrepareVapFunc:------------------------------------------------------"
	eval $dbXml ${xmlControlPath} ${output}/
	mkdir -p ${output}/vap/
	
	cd ${output}
	# TODO
	# Add attribute support for what to copy for VAP and remove workaround
	rm -f ./Device.WiFi.AccessPoint.AC*
	rm -f ./Device.WiFi.AccessPoint.X_LANTIQ_COM_Vendor.HS20.*
	#rm -f $output/Device.WiFi.AccessPoint.WPS
	mv ./Device.WiFi.AccessPoint* ${output}/vap/
	cp ./Device.WiFi.SSID* ${output}/vap/
	nondup=`ls ${output}/vap | grep '.\.[0-9]$' | sed 's/.\{2\}$//' | awk '{!seen[$0]++};END{for(i in seen) if(seen[i]==1)print i}'`
	for file in $nondup
	do
		tmp_file="${file}.1"
		sed -i "1s/.*/Object_0=$file/" ${output}/vap/$tmp_file
		mv ${output}/vap/$tmp_file ${output}/vap/$file
	done
	if [ "$nondup" ]; then
		echo " ERROR: file name ends with *.##"
		exit
	fi
	
	addSpecialToInterface "${output}/vap/"
	rm -f ${output}/*
	cd -
}

prepareEndpoint()
{
	echo "------------------------------------------------------:prepareEndpointFunc:------------------------------------------------------"
	eval $dbXml ${xmlControlPath} ${output}/
	mkdir -p ${output}/endpoint/
	
	cd ${output}

	# TODO
	# Add attribute support for what to copy for Endpoint and remove workaround
	rm -f ./Device.WiFi.AccessPoint*
	#mv ./Device.WiFi.SSID* ${output}/endpoint/
	mv /tmp/endpoints_ssids/Device.WiFi.SSID.4* ${output}/endpoint/
	mv ./Device.WiFi.EndPoint* ${output}/endpoint/
	nondup=`ls ${output}/endpoint | grep '.\.[0-9]$' | sed 's/.\{2\}$//' | awk '{!seen[$0]++};END{for(i in seen) if(seen[i]==1)print i}'`
	for file in $nondup
	do
		#tmp_file="${file}.1"
		tmp_file="${file}.4"
		sed -i "1s/.*/Object_0=$file/" ${output}/endpoint/$tmp_file
		cd ${output}/endpoint/
		# Change name of file:
		ls ${output}/endpoint/ |  sed -e 'p;s/\.[0-9]//g' | xargs -n2 mv
		cd -
		#mv ${output}/endpoint/$tmp_file ${output}/endpoint/$file
	done
	rm -rf /tmp/endpoints_ssids
//Arad: TODO: why this code exist?
	#if [ "$nondup" ]; then
	#	echo " ERROR: file name ends with *.##"
	#	exit
	#fi
	
	addSpecialToInterface "${output}/endpoint/"
	rm -f ${output}/*
	cd -
}

patchPUMA()
{
	echo "------------------------------------------------------:patchPUMAFunc:------------------------------------------------------"
	echo "EnableOnLine_0=false" >> ${output}/vap/Device.WiFi.AccessPoint.X_LANTIQ_COM_Vendor
	echo "UdmaVlanId_0=0" >> ${output}/vap/Device.WiFi.AccessPoint.X_LANTIQ_COM_Vendor
	
	echo "Object_0=Device.WiFi.X_LANTIQ_COM_Vendor" >> ${output}/Device.WiFi.X_LANTIQ_COM_Vendor
	echo "FapiMultithread_0=false" >> ${output}/Device.WiFi.X_LANTIQ_COM_Vendor
	echo "Platform_0=puma" >> ${output}/Device.WiFi.X_LANTIQ_COM_Vendor
	if [ "$PLATFORM" = "PUMA" ]
	then  
		echo "WaveAutoInitUp_0=false" >> ${output}/Device.WiFi.X_LANTIQ_COM_Vendor
	else
		echo "WaveAutoInitUp_0=true" >> ${output}/Device.WiFi.X_LANTIQ_COM_Vendor
	fi
	echo "WaveSaveConf_0=false" >> ${output}/Device.WiFi.X_LANTIQ_COM_Vendor

	echo "UdmaL2SWPort_0=5" >> ${output}/radio0/Device.WiFi.Radio.X_LANTIQ_COM_Vendor
	echo "UdmaL2SWPort_0=6" >> ${output}/radio2/Device.WiFi.Radio.X_LANTIQ_COM_Vendor
	echo "UdmaL2SWPort_0=6" >> ${output}/radio4/Device.WiFi.Radio.X_LANTIQ_COM_Vendor
	
	for i in 0 2 4
	do
		echo "WaveHostapdDebugToFile_0=1" >> ${output}/radio${i}/Device.WiFi.Radio.X_LANTIQ_COM_Vendor
		echo "UdmaVlanId_0=2" >> ${output}/radio${i}/Device.WiFi.AccessPoint.X_LANTIQ_COM_Vendor
	done
}

patchUGW()
{
	echo "------------------------------------------------------:patchUGWFunc:------------------------------------------------------"
	rm -rf ${release}/radio4
	
	sed -i '/X_LANTIQ_COM_Vendor_WaveVendorElements_0=13 DD050017353001 13 DD09001018020000900000 14 DD09001018020000900000 15 DD09001018020000900000/d' ${release}/endpoint/Device.WiFi.EndPoint 	
	
	sed -i 's/Alias_0=cpe-SSID-4/Alias_0=/g' ${release}/endpoint/Device.WiFi.SSID
	sed -i 's/LowerLayers_0=Device.WiFi.Radio.1./LowerLayers_0=Device.WiFi.Radio/g' ${release}/endpoint/Device.WiFi.SSID
	
	sed -i 's/RadioNumberOfEntries_0=3/RadioNumberOfEntries_0=2/g' ${release}/Device.WiFi
	sed -i 's/SSIDNumberOfEntries_0=6/SSIDNumberOfEntries_0=0/g' ${release}/Device.WiFi
	sed -i 's/AccessPointNumberOfEntries_0=3/AccessPointNumberOfEntries_0=0/g' ${release}/Device.WiFi
	sed -i 's/EndPointNumberOfEntries_0=3/EndPointNumberOfEntries_0=0/g' ${release}/Device.WiFi
	sed -i '/WaveFapiDaemonEnable_0=true/d' ${release}/Device.WiFi
	
	let index=0
	for i in 0 2 
	do	
		let index=$index+1
		echo $index
		sed -i 's/Alias_0=cpe-AccessPoint-'${index}'/Alias_0=/g' ${release}/radio${i}/Device.WiFi.AccessPoint
		sed -i 's/SSIDReference_0=Device.WiFi.SSID.'${index}'/SSIDReference_0=Device.WiFi.SSID/g' ${release}/radio${i}/Device.WiFi.AccessPoint
		
		sed -i 's/Alias_0=cpe-EndPoint-'${index}'/Alias_0=cpe-EndPoint/g' ${release}/radio${i}/Device.WiFi.EndPoint
		sed -i 's/SSIDReference_0=Device.WiFi.SSID.4/SSIDReference_0=Device.WiFi.SSID/g' ${release}/radio${i}/Device.WiFi.EndPoint
		sed -i 's/SSIDReference_0=Device.WiFi.SSID.5/SSIDReference_0=Device.WiFi.SSID/g' ${release}/radio${i}/Device.WiFi.EndPoint

		sed -i 's/ModeEnabled_0=WPA2-Personal/ModeEnabled_0=None/g' ${release}/radio${i}/Device.WiFi.AccessPoint.Security		
		
		sed -i 's/PPAEnable_0=true/PPAEnable_0=false/g' ${release}/radio${i}/Device.WiFi.AccessPoint.X_LANTIQ_COM_Vendor
		sed -i 's/Dot11nProtection_0=Enabled/Dot11nProtection_0=Disabled/g' ${release}/radio${i}/Device.WiFi.AccessPoint.X_LANTIQ_COM_Vendor
		
		sed -i 's/AutoChannelEnable_0=true/AutoChannelEnable_0=false/g' ${release}/radio${i}/Device.WiFi.Radio
		sed -i 's/Alias_0=cpe-Radio-'${index}'/Alias_0=/g' ${release}/radio${i}/Device.WiFi.Radio

		echo "EnableOnline_0=false" >> ${release}/radio${i}/Device.WiFi.Radio.X_LANTIQ_COM_Vendor
		sed -i 's/WaveExplicitBeamforming_0=true/WaveExplicitBeamforming_0=false/g' ${release}/radio${i}/Device.WiFi.Radio.X_LANTIQ_COM_Vendor
		sed -i 's/WaveImplicitBeamforming_0=true/WaveImplicitBeamforming_0=false/g' ${release}/radio${i}/Device.WiFi.Radio.X_LANTIQ_COM_Vendor
		sed -i 's/WaveCompleteRecoveryEnabled_0=true/WaveCompleteRecoveryEnabled_0=false/g' ${release}/radio${i}/Device.WiFi.Radio.X_LANTIQ_COM_Vendor
		sed -i 's/HtSTBCenabled_0=true/HtSTBCenabled_0=false/g' ${release}/radio${i}/Device.WiFi.Radio.X_LANTIQ_COM_Vendor
		sed -i 's/VhtSTBCtxEnabled_0=true/VhtSTBCtxEnabled_0=false/g' ${release}/radio${i}/Device.WiFi.Radio.X_LANTIQ_COM_Vendor
		sed -i 's/VhtSTBCrxEnabled_0=true/VhtSTBCrxEnabled_0=false/g' ${release}/radio${i}/Device.WiFi.Radio.X_LANTIQ_COM_Vendor
		sed -i 's/WaveTxOpMode_0=Forced/WaveTxOpMode_0=Dynamic/g' ${release}/radio${i}/Device.WiFi.Radio.X_LANTIQ_COM_Vendor
		sed -i 's/WaveTxOpStaId_0=255/WaveTxOpStaId_0=511/g' ${release}/radio${i}/Device.WiFi.Radio.X_LANTIQ_COM_Vendor
		sed -i 's/WaveMaxMpduLen_0=7000/WaveMaxMpduLen_0=11000/g' ${release}/radio${i}/Device.WiFi.Radio.X_LANTIQ_COM_Vendor
		sed -i 's/WaveVendorVhtEnable_0=true/WaveVendorVhtEnable_0=false/g' ${release}/radio${i}/Device.WiFi.Radio.X_LANTIQ_COM_Vendor
		sed -i 's/WaveFRStationIndex_0=255/WaveFRStationIndex_0=511/g' ${release}/radio${i}/Device.WiFi.Radio.X_LANTIQ_COM_Vendor
		sed -i 's/WaveFRPhyMode_0=n/WaveFRPhyMode_0=a/g' ${release}/radio${i}/Device.WiFi.Radio.X_LANTIQ_COM_Vendor
		sed -i 's/WaveFRMcs_0=0/WaveFRMcs_0=7/g' ${release}/radio${i}/Device.WiFi.Radio.X_LANTIQ_COM_Vendor

		sed -i 's/Alias_0=cpe-SSID-'${index}'/Alias_0=/g' ${release}/radio${i}/Device.WiFi.SSID
		sed -i 's/LowerLayers_0=Device.WiFi.Radio.'${index}'./LowerLayers_0=Device.WiFi.Radio/g' ${release}/radio${i}/Device.WiFi.SSID		

	done
	

	let index=0
	for i in 4 5 6
	do	
		let index=$index+1
		sed -i 's/Alias_0=cpe-SSID-'${i}'/Alias_0=/g' ${release}/Device.WiFi.SSID.${i}
		sed -i 's/LowerLayers_0=Device.WiFi.Radio.'${index}'./LowerLayers_0=Device.WiFi.Radio/g' ${release}/Device.WiFi.SSID.${i}	
	done
}


prepareENV()
{
	control=WiFi_control.xml

	if [ -z "$data" ]
	then
		data=WiFi_data.xml
	fi

	if [ -d "/opt/lantiq/wave/" ]
	then
		PLATFORM="UGW"
	else
		PLATFORM="PUMA"	
	fi
	
	if [ "$HOSTTYPE" == "x86_64-linux" ]
	then
		dbXml=./dbXml
		LD_LIBRARY_PATH=./

		if [ -z "$xmlPath" ]
		then
			errorArgs
		fi
	else
		if [ -z "$xmlPath" ]
		then
			xmlPath=/opt/lantiq/wave/db/
		fi
		dbXml=/usr/sbin/fapi_wlan_dbXml
		LD_LIBRARY_PATH=/opt/lantiq/usr/lib/	
		wavePath=/opt/lantiq/wave/
		release=/$wavePath/db/default
	fi

	export LD_LIBRARY_PATH
	
	xmlDataPath="${xmlPath}/${data}"
	xmlControlPath="${xmlPath}/${control}"
	
	output=$PWD/output/
	rm -rf ${output}/
	mkdir -p ${output}/
}

##MAIN
errorArgs()
{
	echo "Illegal number of parameters"
	echo "Usage: cmd [-m], Enter the mode of the xml files"
	echo "Usage: cmd [-x], MUST Enter xml path"
	exit
}

case $1 in
"-x")
	xmlPath=$2
;;
"-m")
	data=WiFi_${2}_data.xml
;;
"")
	echo "no dollar 1"
;;
*)
	errorArgs
;;
esac
case $3 in
"-x")
	xmlPath=$4
;;
"-m")
	data=WiFi_${4}_data.xml
;;
"")
	echo "no dollar 3"
;;
*)
	errorArgs
;;
esac


#Call Functions
prepareENV
prepareRadio
prepareVap
prepareEndpoint
addSpecialDeviceInfo
#collect all
mv ${output}/radios/* ${output}/ && rm -rf ${output}/radios/ 
patchPUMA

if [ "$PLATFORM" = "UGW" ]
then  
	mkdir -p ${release}/
	mv ${output}/* ${release}/
	patchUGW
	rm -rf ${xmlPath}/default_wave600
	mv ${xmlPath}/default ${xmlPath}/default_wave600
fi
exit
rm -rf ${output}
