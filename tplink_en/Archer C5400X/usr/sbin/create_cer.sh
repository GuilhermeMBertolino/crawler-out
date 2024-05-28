#!/bin/sh

#####prepare dir for cert
cd /tmp/
mkdir cert

#####create cert
cd cert/
openssl req -newkey rsa:2048 -nodes -keyout rsa_private.key -x509 -days 365 -out cert.crt -subj "/C=CN/ST=GD/L=SZ/O=TP-LINK/OU=dev/CN=tp-link.com/emailAddress=c5400x@tp-link.com"
chmod 755 *

#####mv to /etc/certificate
mv rsa_private.key /etc/certificate/key.pem
mv cert.crt /etc/certificate/cert.pem

#####reload nginx
nginx -s reload