#!/bin/bash

#Help to clean the .svn in the files

touchall() {
touch *
for i in *
do
	rm -rf .svn
        if [ -d "$i" ]
        then
		cd $i
		touchall
		cd ..
        fi
done
}
touchall

