#!/bin/sh
########################################################################
#   
#  Nome: Salvar.sh
#
#  Descri: Script para salvar a senha criptografada do 
#          arquivo "/etc/passwd" para as variaveis de
#          ambiente, apos o usuario executar o comando
#          "passwd" no terminal. Isto eh necessario para
#          que a senha alterada pelo usuario nao seja 
#          sobreescita pela senha padrao em caso de 
#          reboot. 
#
#          Obs.: Este script é chamado no arquivo
#                /home/rtl8186/W441a/AP/busybox-1.00-pre8/loginutils
#
#  Autor: Leonardo Alexandre Pletsch 
#         pletsch@intelbras.com.br
#
#  Data: 04/05/2010
#
#########################################################################
index=0
cat /etc/passwd | while read LINHA; 
do 
	#debug
	#echo "$LINHA" 
	#echo "$index"
	#
        if [ $index -eq 0 ]
        then
		eval `flash set SSH_PASSWD1 $LINHA`	
	else
		eval `flash set SSH_PASSWD2 $LINHA`	
        fi

	index=`expr $index + 1`
done








