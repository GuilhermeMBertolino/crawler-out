#!/bin/sh

if openssl version 2> /dev/null
then
  if [ -r /data/newkey ]
  then
    cat /data/newkey > /var/tmp/newkey
    cat /data/newkey.cert > /var/tmp/newkey.cert
  elif (pspctl list | grep -qw sslkey ) && (pspctl list | grep -qw sslcert)
  then
    pspctl adump sslkey > /var/tmp/newkey
    pspctl adump sslcert > /var/tmp/newkey.cert
  else
    (
    cat /proc/nvram/BaseMacAddr > /dev/random
    export OPENSSL_CONF=/etc/ssl/openssl.cnf
    cd /var/tmp
    openssl req -new -newkey rsa:2048 -days 36500 -nodes -x509 -subj "/C=US/ST=Denial/L=Irvine/O=Dis/CN=example.com" -keyout newkey -out newkey.cert
    openssl rsa -noout -in newkey -modulus
    if echo > /data/newkey.cert 2>/dev/null
    then
      cp /var/tmp/newkey /data
      cp /var/tmp/newkey.cert /data
      chmod 600 /data/newkey
      chmod 600 /data/newkey.cert
      sync
    else
      pspctl set sslkey "`cat /var/tmp/newkey`"
      pspctl set sslcert "`cat /var/tmp/newkey.cert`"
    fi
    )
  fi
  (
  cd /var/tmp
  # In OpenSSL 3.0, the output key format is PKCS#8. "dropbearconvert openssh" not support PKCS#8.
  # Use the -traditional option to get the old format PKCS#1
  if (openssl version 2> /dev/null | grep 1.1.1)
  then
    echo "openssl 1.x version"
    openssl rsa -in newkey -out rsak
  else
    echo "openssl 3.x version"
    openssl rsa -in newkey -out rsak -traditional
  fi
  dropbearconvert openssh dropbear rsak dropbear_rsa_host_key 2> /dev/null
  rm rsak
  )
fi

