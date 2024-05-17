#!/bin/sh
JSON_FILE=/tmp/hidden.json
rm $JSON_FILE
show_product_info > /tmp/hidden_info
echo "{" >> $JSON_FILE
while read line
do 
	echo $line
	find=`echo "$line" |grep -nr "N/A"`
	if [ "x$find" == "x" ];then
		echo $line, >> $JSON_FILE
	fi
done < /tmp/hidden_info
sed -i '$s/,//g' $JSON_FILE
echo "}" >> $JSON_FILE

