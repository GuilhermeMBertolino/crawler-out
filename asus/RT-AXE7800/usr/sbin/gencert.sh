#!/bin/sh
cd /etc
SECS=1262278080
HTTPD_ROOTCA_GEN_CERT=cacert_gen.pem
HTTPD_ROOTCA_GEN_KEY=cakey_gen.pem
HTTPD_ROOTCA_CERT=cacert.pem
HTTPD_ROOTCA_KEY=cakey.pem
HTTPD_GEN_CERT=cert_gen.pem
HTTPD_GEN_KEY=key_gen.pem
HTTPD_CERT=cert.pem
HTTPD_KEY=key.pem
UPLOAD_CACERT="/jffs/.cert/cacert.pem"
UPLOAD_CAKEY="/jffs/.cert/cakey.pem"
UPLOAD_GEN_CERT="/jffs/.cert/cert_gen.pem"
UPLOAD_GEN_KEY="/jffs/.cert/key_gen.pem"
le_enable=`nvram get le_enable`
if [ "${le_enable}" == "1" ] ; then
	exit 0
elif [ "${le_enable}" == "2" -a -e ${UPLOAD_CACERT} -a -e ${UPLOAD_CAKEY} ] ; then
	HTTPD_GEN_CERT=${UPLOAD_GEN_CERT}
	HTTPD_GEN_KEY=${UPLOAD_GEN_KEY}
fi
DATE_STR=`date +%Y%m%d%H%M%S`
reset_last_cert_nvars() {
	for nv in last_cert_lan_ipaddr last_cert_wan0_ipaddr last_cert_wan1_ipaddr last_cert_ipv6_ipaddr ; do nvram unset ${nv} ; done
}
validate_oip() {
	[ -z "${oip}" ] && return
	if [ -n "`echo ${oip}|tr -d .0123456789`" ] ; then
		oip=
		return
	fi
	if [ -z '`echo ${oip}|grep "\<[1-9][0-9]\{0,2\}\.[1-9][0-9]\{0,2\}\.[1-9][0-9]\{0,2\}\.[1-9][0-9]\{0,2\}\>`' ] ; then
		oip=
		return
	fi
	for f in 1 2 3 4 ; do
		v=`echo ${oip}|cut -d . -f ${f}`
		if [ $v -lt 0 -o $v -gt 255 ] ; then
			oip=
			return
		fi
	done
}
RELOAD=0
BACKUP=0
ECC256=0
DEFAULT_LAN_IP=192.168.50.1
while [ -n "$1" ] ; do
	case $1 in
	-b)
		BACKUP=1
		;;
	-e)
		ECC256=1
		;;
	-l)
		if [ -z "$2" ] ; then
			RELOAD=1
		else
			if [ "`echo $2|cut -c 1`" == "-" ] ; then
				RELOAD=1
			else
				if [ $2 -ge 0 -a $2 -le 2 ] ; then
					RELOAD=$2
				fi
				shift
			fi
		fi
		;;
	-L)
		if [ -n "$2" ] ; then
			oip=$2
			validate_oip
			if [ -n "${oip}" ] ; then
				DEFAULT_LAN_IP=$2
				shift
			fi
		fi
		;;
	-r)
		ECC256=0
		;;
	esac
	shift
done
echo "RELOAD=${RELOAD} BACKUP=${BACKUP} ECC256=${ECC256} DEFAULT_LAN_IP=${DEFAULT_LAN_IP}"
ONAME=`nvram get lan_hostname`
[ -z "${ONAME}" ] && ONAME=`nvram get odmpid`
[ ! -e /var/lock ] && mkdir -p /var/lock
while [ -e /var/lock/gencert.lock ] ; do
	if [ ! -e /proc/`cat /var/lock/gencert.lock`/comm ] ; then
		echo "gencert.sh: Deaded lock, old pid=`cat /var/lock/gencert.lock`, skip"
		break
	fi
	sleep 1
done
echo $$ > /var/lock/gencert.lock
cp -L openssl.cnf openssl.config
cat << EOF > ssl_server.ext
[ server_req_extensions ]
subjectKeyIdentifier = hash
basicConstraints     = CA:FALSE
subjectAltName       = @server_alt_names
authorityKeyIdentifier = keyid:always,issuer:always
extendedKeyUsage = serverAuth
[ req_distinguished_name ]
countryName = .
countryName_value = US
stateOrProvinceName = .
stateOrProvinceName_value = .
localityName = .
localityName_value = .
organizationName = .
organizationName_value = .
organizationalUnitName = .
organizationalUnitName_value = .
[ server_alt_names ]
EOF
IP_I=1
echo "IP.${IP_I} = ${DEFAULT_LAN_IP}" >> ssl_server.ext && IP_I=$((IP_I+1))
oip=`nvram get last_cert_lan_ipaddr`
validate_oip
if [ -n "${oip}" ] ; then
	echo "IP.${IP_I} = ${oip}" >> ssl_server.ext && IP_I=$((IP_I+1))
fi
oip=`nvram get lan_ipaddr`
validate_oip
if [ -n "${oip}" -a "${oip}" != "${DEFAULT_LAN_IP}" -a "${oip}" != "`nvram get last_cert_lan_ipaddr`" ] ; then
	echo "IP.${IP_I} = ${oip}" >> ssl_server.ext && IP_I=$((IP_I+1))
	nvram set last_cert_lan_ipaddr=${oip}
fi
if [ "`nvram get sw_mode`" == "1" ] ; then
	if [ "`nvram get wans_dualwan|cut -d ' ' -f 2`" == "none" ] ; then
		oip=`nvram get wan0_ipaddr`
		validate_oip
		if [ -n "${oip}" ] ; then
			echo "IP.${IP_I} = ${oip}" >> ssl_server.ext && IP_I=$((IP_I+1))
			nvram set last_cert_wan0_ipaddr=${oip}
		fi
	else
		oip=`nvram get wan0_ipaddr`
		validate_oip
		if [ -n "${oip}" ] ; then
			echo "IP.${IP_I} = ${oip}" >> ssl_server.ext && IP_I=$((IP_I+1))
			nvram set last_cert_wan0_ipaddr=${oip}
		fi
		oip=`nvram get wan1_ipaddr`
		validate_oip
		if [ -n "${oip}" ] ; then
			echo "IP.${IP_I} = ${oip}" >> ssl_server.ext && IP_I=$((IP_I+1))
			nvram set last_cert_wan1_ipaddr=${oip}
		fi
	fi
	oip=`nvram get ipv6_wan_addr|sed -e "s,/.*,,"`
	if [ -n "${oip}" ] ; then
		echo "IP.${IP_I} = ${oip}" >> ssl_server.ext && IP_I=$((IP_I+1))
		nvram set last_cert_ipv6_ipaddr=${oip}
	fi
	oip=`nvram get ddns_ipv6_ipaddr|sed -e "s,/.*,,"`
	if [ -n "${oip}" ] ; then
		echo "IP.${IP_I} = ${oip}" >> ssl_server.ext && IP_I=$((IP_I+1))
		nvram set last_cert_ipv6_ipaddr=${oip}
	fi
fi
DNS_I=1
echo "DNS.${DNS_I} = www.asusrouter.com" >> ssl_server.ext && DNS_I=$((DNS_I+1))
if [ "`nvram get sw_mode`" == "1" ] ; then
	if [ -n "`nvram get ddns_hostname_x`" ] ; then
		echo "DNS.${DNS_I} = `nvram get ddns_hostname_x`" >> ssl_server.ext && DNS_I=$((DNS_I+1))
		nvram set last_cert_ddns_hostname=`nvram get ddns_hostname_x`
	fi
fi
DNS="
router.asus.com
repeater.asus.com
www.asusrepeater.com
ap.asus.com
www.asusap.com
asusrouter.com
asusrepeater.com
asusap.com
www.asusswitch.com
asusswitch.com
www.asusnetwork.net
asusswitch.net
asusrepeater.net
asusap.net
zenwifi.net
expertwifi.net"
for n in ${DNS} ; do
	echo "DNS.${DNS_I} = ${n}" >> ssl_server.ext && DNS_I=$((DNS_I+1))
done
I=0
echo "${I}.commonName=CN" >> openssl.config
echo "${I}.commonName_value=${ONAME} Root Certificate ${DATE_STR}" >> openssl.config
echo "${I}.organizationName=O" >> openssl.config
echo "${I}.organizationName_value=${ONAME}_CA" >> openssl.config
[ ! -e /etc/index.txt ] && touch /etc/index.txt
echo "default_startdate=`date +%Y%m%d%H%M%S%Z`" >> openssl.config
[ -e ${HTTPD_ROOTCA_CERT} ] || (echo "${HTTPD_ROOTCA_CERT} doesn't exist !!!!!!" > /dev/console)
[ -e ${HTTPD_ROOTCA_KEY} ] || (echo "${HTTPD_ROOTCA_KEY} doesn't exist !!!!!! > /dev/console")
([ -e ${HTTPD_ROOTCA_GEN_CERT} ] && openssl verify -CAfile ${HTTPD_ROOTCA_GEN_CERT} ${HTTPD_ROOTCA_GEN_CERT}) \
	|| ([ "`nvram get ntp_ready`" == "1" ] && (echo "Verify Root CA failed, expired, uploaded intermediate CA, or damaged?"))
if [ -e ${HTTPD_ROOTCA_GEN_CERT} -a -e ${HTTPD_ROOTCA_GEN_KEY} ] ; then
	[ "`openssl x509 -noout -pubkey -in ${HTTPD_ROOTCA_GEN_CERT}|md5sum`" == "`openssl pkey -pubout -in ${HTTPD_ROOTCA_GEN_KEY}|md5sum`" ] \
		|| (echo "Private key mismatch !!!" ; rm -f ${HTTPD_ROOTCA_GEN_CERT} ${HTTPD_ROOTCA_GEN_KEY})
fi
if [ ! -e ${HTTPD_ROOTCA_GEN_CERT} -o ! -e ${HTTPD_ROOTCA_GEN_KEY} ] ; then
	echo "Generate new Root certificate"
	if [ "${ECC256}" == "1" ] ; then
		OPENSSL_CONF=/etc/openssl.config RANDFILE=/dev/urandom openssl ecparam -name prime256v1 -genkey -noout -out ${HTTPD_ROOTCA_GEN_KEY}
	else
		OPENSSL_CONF=/etc/openssl.config RANDFILE=/dev/urandom openssl genrsa -out ${HTTPD_ROOTCA_GEN_KEY}
	fi
	OPENSSL_CONF=/etc/openssl.config RANDFILE=/dev/urandom openssl req -x509 \
		-new -nodes -in /tmp/cert.csr -key ${HTTPD_ROOTCA_GEN_KEY} -days 7306 -sha256 -out ${HTTPD_ROOTCA_GEN_CERT}
fi
if [ "${le_enable}" == "0" ] ; then
	if [ ! -e ${HTTPD_ROOTCA_CERT} -o ! -e ${HTTPD_ROOTCA_KEY} ] ; then
		cp -f ${HTTPD_ROOTCA_GEN_CERT} ${HTTPD_ROOTCA_CERT}
		cp -f ${HTTPD_ROOTCA_GEN_KEY} ${HTTPD_ROOTCA_KEY}
		logger "Root certificate updated, auto-generated."
		reset_last_cert_nvars
	else
		cmp ${HTTPD_ROOTCA_GEN_CERT} ${HTTPD_ROOTCA_CERT} 1>/dev/null ; r1=$?
		cmp ${HTTPD_ROOTCA_GEN_KEY} ${HTTPD_ROOTCA_KEY} 1>/dev/null; r2=$?
		if [ $r1 -ne 0 -o $r2 -ne 0 ] ; then
			cp -f ${HTTPD_ROOTCA_GEN_CERT} ${HTTPD_ROOTCA_CERT}
			cp -f ${HTTPD_ROOTCA_GEN_KEY} ${HTTPD_ROOTCA_KEY}
			logger "Root certificate changed, auto-generated."
			reset_last_cert_nvars
		fi
	fi
elif [ "${le_enable}" == "2" -a -e "${UPLOAD_CACERT}" -a -e "${UPLOAD_CAKEY}" ] ; then
	if [ ! -e ${HTTPD_ROOTCA_CERT} -o ! -e ${HTTPD_ROOTCA_KEY} ] ; then
		cp -f ${UPLOAD_CACERT} ${HTTPD_ROOTCA_CERT}
		cp -f ${UPLOAD_CAKEY} ${HTTPD_ROOTCA_KEY}
		logger "Root certificate updated, uploaded root/intermediate cert."
		reset_last_cert_nvars
	else
		cmp ${UPLOAD_CACERT} ${HTTPD_ROOTCA_CERT} ; r1=$?
		cmp ${UPLOAD_CAKEY} ${HTTPD_ROOTCA_KEY} ; r2=$?
		if [ $r1 -ne 0 -o $r2 -ne 0 ] ; then
			cp -f ${UPLOAD_CACERT} ${HTTPD_ROOTCA_CERT}
			cp -f ${UPLOAD_CAKEY} ${HTTPD_ROOTCA_KEY}
			logger "Root certificate changed, uploaded root/intermediate cert."
			reset_last_cert_nvars
		fi
	fi
fi
if [ ! -e ${HTTPD_ROOTCA_CERT} -o ! -e ${HTTPD_ROOTCA_KEY} ] ; then
	cp -f ${HTTPD_ROOTCA_GEN_CERT} ${HTTPD_ROOTCA_CERT}
	cp -f ${HTTPD_ROOTCA_GEN_KEY} ${HTTPD_ROOTCA_KEY}
	reset_last_cert_nvars
fi
echo "Generate new server certificate"
if [ "${ECC256}" == "1" ] ; then
	OPENSSL_CONF=/etc/openssl.config RANDFILE=/dev/urandom openssl ecparam -name prime256v1 -genkey -noout -out ${HTTPD_GEN_KEY}
else
	OPENSSL_CONF=/etc/openssl.config RANDFILE=/dev/urandom openssl genrsa -out ${HTTPD_GEN_KEY}
fi
OPENSSL_CONF=/etc/openssl.config RANDFILE=/dev/urandom openssl req -new \
	-subj "/C=US/CN=${ONAME} Server Certificate/O=${ONAME}" \
	-batch -out /tmp/https_srv.csr -key ${HTTPD_GEN_KEY}
OPENSSL_CONF=/etc/openssl.config RANDFILE=/dev/urandom openssl x509 -req \
	-extensions server_req_extensions -extfile ssl_server.ext -in /tmp/https_srv.csr \
	-CA ${HTTPD_ROOTCA_CERT} -CAkey ${HTTPD_ROOTCA_KEY} -CAserial serial.txt -CAcreateserial -days 7306 -out ${HTTPD_GEN_CERT}
if [ "${le_enable}" == "2" ] ; then
	cp -f ${HTTPD_GEN_CERT} ${HTTPD_CERT}
	cp -f ${HTTPD_GEN_KEY} ${HTTPD_KEY}
	echo "Overwrite uploaded certificate with generated server certificate."
else
	cp -f ${HTTPD_GEN_CERT} ${HTTPD_CERT}
	cp -f ${HTTPD_GEN_KEY} ${HTTPD_KEY}
	logger "Server certificate updated."
fi
ln -sf ${HTTPD_ROOTCA_CERT} cert.crt
cat ${HTTPD_KEY} ${HTTPD_CERT} > server.pem
[ "${BACKUP}" == "1" -o "`nvram get http_enable`" == "0" ] && \
	tar czvf /jffs/cert.tgz -C / etc/cert.crt etc/${HTTPD_ROOTCA_CERT} etc/${HTTPD_ROOTCA_KEY} \
		etc/${HTTPD_ROOTCA_GEN_CERT} etc/${HTTPD_ROOTCA_GEN_KEY} \
		etc/${HTTPD_CERT} etc/${HTTPD_KEY} \
		etc/${HTTPD_GEN_CERT} etc/${HTTPD_GEN_KEY}
for f in /tmp/cert.csr ; do
	[ -e ${f} ] && rm -f ${f}
done
if [ "${RELOAD}" == "1" -o "${RELOAD}" == "2" ] ; then
       nvram set httpds_reload_cert=${RELOAD}
	if [ "`nvram get ipv6_service`" != "disabled" -a "`nvram get misc_http_x`" == "1" ] ; then
		nvram set httpds6_reload_cert=${RELOAD}
	fi
fi
rm /var/lock/gencert.lock
