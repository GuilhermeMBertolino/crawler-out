#!/bin/sh
MODS=$*

for MOD in ${MODS}; do
  SECTIONS=/sys/module/${MOD}/sections

  TEXT=$(cat ${SECTIONS}/.text)
  DATA=$(cat ${SECTIONS}/.data)
  BSS=$(cat ${SECTIONS}/.bss)

  echo "${MOD}.ko -s .text ${TEXT} -s .data ${DATA} -s .bss ${BSS}"
done
