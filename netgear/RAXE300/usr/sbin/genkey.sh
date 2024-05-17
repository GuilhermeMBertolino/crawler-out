#!/bin/sh

export EASYRSA="/usr/sbin/easyrsa-v3.0.6"
export EASYRSA_PKI="/data/pki"

export EASYRSA_DN="cn_only"
export EASYRSA_BATCH="yes"

export EASYRSA_REQ_COUNTRY="TW"
export EASYRSA_REQ_PROVINCE="Taipei"
export EASYRSA_REQ_CITY="Taipei"
export EASYRSA_REQ_ORG="PEGA"
export EASYRSA_REQ_EMAIL="openvpn@pega"
export EASYRSA_REQ_OU="PEGA TAIWAN TW"
export EASYRSA_REQ_CN="CN"
export EASYRSA_CERT_EXPIRE=3650
export EASYRSA_KEY_SIZE=1024

export ROOT_PATH="/data"
export CERT_PATH=${ROOT_PATH}/.cert
export SERKEY_PATH=${CERT_PATH}/keys/server
export CLIKEY_PATH=${CERT_PATH}/keys/client

cd ${ROOT_PATH}

rm -rf ./pki ./keys ./.cert

/usr/sbin/easyrsa-v3.0.6/easyrsa init-pki && openssl rand -out /data/pki/.rnd -hex 256
/usr/sbin/easyrsa-v3.0.6/easyrsa build-ca nopass

/usr/sbin/easyrsa-v3.0.6/easyrsa gen-req rax-server nopass
/usr/sbin/easyrsa-v3.0.6/easyrsa sign-req server rax-server

/usr/sbin/easyrsa-v3.0.6/easyrsa gen-req rax-client nopass
/usr/sbin/easyrsa-v3.0.6/easyrsa sign-req client rax-client

/usr/sbin/easyrsa-v3.0.6/easyrsa gen-dh
/usr/sbin/easyrsa-v3.0.6/easyrsa gen-crl

openssl verify -CAfile pki/ca.crt pki/issued/rax-server.crt
openssl verify -CAfile pki/ca.crt pki/issued/rax-client.crt

openvpn --genkey --secret pki/ta.key

ls -l pki/ca.crt pki/private/ca.key
ls -l pki/private/rax-server.key pki/reqs/rax-server.req pki/issued/rax-server.crt
ls -l pki/private/rax-client.key pki/reqs/rax-client.req pki/issued/rax-client.crt
ls -l pki/dh.pem pki/crl.pem
ls -l pki/ta.key

mkdir -p ${CERT_PATH}
mkdir -p ${SERKEY_PATH}
mkdir -p ${CLIKEY_PATH}

cp pki/ca.crt ${SERKEY_PATH}
cp pki/issued/rax-server.crt  ${SERKEY_PATH}
cp pki/private/rax-server.key ${SERKEY_PATH}
cp pki/dh.pem                 ${SERKEY_PATH}/dh1024.pem
cp pki/crl.pem                ${SERKEY_PATH}
cp pki/ta.key                 ${SERKEY_PATH}

cp pki/ca.crt                 ${CLIKEY_PATH}
cp pki/issued/rax-client.crt  ${CLIKEY_PATH}
cp pki/private/rax-client.key ${CLIKEY_PATH}
cp pki/ta.key                 ${CLIKEY_PATH}

CHK_KEY=`tail -n 2 ${SERKEY_PATH}/ta.key  | head -n 1`
echo ${CHK_KEY} > ${CERT_PATH}/genkey-done

