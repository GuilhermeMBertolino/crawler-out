/* ipv6 fixed section ------------------------------------->Begin */

    function is_ipv6_blank(v6Ip)
    {
        var ipv6 = v6Ip.split(':');

        if (ipv6.length != 8) {
            return true;
        }

        /* not allow all fileds blank */
        if (ipv6[0] == "" && ipv6[1] == "" && ipv6[2] == "" && ipv6[3] == "" &&
            ipv6[4] == "" && ipv6[5] == "" && ipv6[6] == "" && ipv6[7] == "" ) {
            return true;
        }

        return false;
    }

    function is_ipv6_HexNum(v6Ip)
    {
        var ipv6 = v6Ip.split(':');
        var i;

        if (ipv6.length != 8) {
            return false;
        }

        for (i = 0; i < ipv6.length; i++) {
            if (ipv6[i] == "") {
                continue;
            }

            if (ipv6[i].match(/[^a-fA-F0-9]/)) {
                return false;
            }
        }

        return true;
    }

    function isIPv6Equals(ip1,ip2)
    {
        var ip1Arr = ip1.split(":");
        var ip2Arr = ip2.split(":");
        for(var i=0;i<8;i++)
        {
            if (ip1Arr[i] == "") {
                ip1Arr[i] = "0000";
            }
            if (ip2Arr[i] == "") {
                ip2Arr[i] = "0000";
            }

            if (parseInt(ip1Arr[i],16) != parseInt(ip2Arr[i],16))
            {
                return false;
            }
        }
        return true;
    }

    function isIPv6_globalAddr(v6Ip)
    {
        var ipv6 = v6Ip.split(":");

        /* A global IP is the address with the first 3 bit as "001".
           So the first hex digit of the golbal address in binary only can be 0010 or 0011
           In the other hand, the firest hex digit only can be 2 or 3. */
        if ((ipv6[0].match(/^2/) != null || ipv6[0].match(/^3/) != null) && parseInt(ipv6[7],16) != 0) {
            return true;
        }
        else {
            return false;
        }
    }

    function isSameSubnet(ip1, ip2, prefix)
    {
        var i;
        var ip1Arr = ip1.split(":");
        var ip2Arr = ip2.split(":");
        for(i = 0; i < 8; i++)
        {
            if (ip1Arr[i] == "") {
                ip1Arr[i] = "0000";
            }
            if (ip2Arr[i] == "") {
                ip2Arr[i] = "0000";
            }

            if (prefix > 16)
            {
                if( parseInt(ip1Arr[i], 16) != parseInt(ip2Arr[i], 16))
                {
                    return false;
                }
                prefix = prefix - 16;
            }
            else
            {
                var mask = 0;
                var j;
                for (j = 0; j < prefix; j++)
                {
                    mask = mask >> 1;
                    mask = mask | 0x8000;
                }

                if((parseInt(ip1Arr[i], 16) & mask) != (parseInt(ip2Arr[i], 16) & mask))
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        }
    }

    function complement_ipv6_empty_field(ip)
    {
        var i;
        var ipArr = ip.split(":");

        if (ipArr.length != 8) {
            return ip;
        }

        for (i = 0; i < ipArr.length ; i++) {
            if (ipArr[i].length == 0) {
                ipArr[i] = '0000';
            }
            else if (ipArr[i].length == 1) {
                ipArr[i] = '000' + ipArr[i];
            }
            else if (ipArr[i].length == 2) {
                ipArr[i] = '00' + ipArr[i];
            }
            else if (ipArr[i].length == 3) {
                ipArr[i] = '0' + ipArr[i];
            }
        }

        return ipArr[0] + ':' + ipArr[1] + ':' + ipArr[2] + ':' + ipArr[3] + ':' + ipArr[4] + ':' + ipArr[5] + ':' + ipArr[6] + ':' + ipArr[7];
    }

    function is_interfaceId_blank(interfaceId)
    {
        var id = interfaceId.split(':');

        if (id.length != 4) {
            return true;
        }

        /* not allow any fileds blank */
        if (id[0] == "" || id[1] == "" || id[2] == "" || id[3] == "") {
            return true;
        }

        return false;
    }

    function is_interfaceId_HexNum(interfaceId)
    {
        var id = interfaceId.split(':');
        var i;

        if (id.length != 4) {
            return false;
        }

        for (i = 0; i < id.length; i++) {
            if (id[i].match(/[^a-fA-F0-9]/)) {
                return false;
            }
        }

        return true;
    }

    function isNumStr(str)
    {
        var i;

        if (str.length == 0) {
            return false;
        }

        for(i = 0; i < str.length; i++) {
            var c = str.substring(i, i+1);
            if("0" <= c && c <= "9") {
                continue;
            }
            return false;
        }

        return true;
    }

    function isValidIpStr(str)
    {
        var ip = str.split('.');
        var i;

        if (ip.length != 4) {
            return false;
        }

        for (i = 0; i < ip.length; i++) {
            if (isNumStr(ip[i]) == false) {
                return false;
            }

            if (parseInt(ip[i]) < 0 || parseInt(ip[i]) > 255) {
                return false;
            }
        }

        if (parseInt(ip[3]) == 0 ) {
            return false;
        }

        return true;
    }

    function validation_fixed()
    {
        var ipaddr = $('[name=ipAddr]').val();
        var gateway = $('[name=gateway]').val();
        var dns1 = $('[name=dns1]').val();
        var dns2 = $('[name=dns2]').val();
        var lanIp = $('[name=lanIp]').val();
        var ipPrefix = $('[name=ipPrefix]').val();
        var lanIpPrefix = $('[name=lanIpPrefix]').val();

        /* check ip blank */
        if (is_ipv6_blank(ipaddr) == true) {
            //"IPv6 Address and Prefix Length are required for the WAN Setup."
            alert(window.top.mlang["AIPE02"]);
            return false;
        }
        if (is_ipv6_blank(gateway) == true) {
            //"Gateway IPv6 Address is required for the WAN Setup."
            alert(window.top.mlang["AIPE05"]);
            return false;
        }
        if (is_ipv6_blank(lanIp) == true) {
            //"IPv6 Address and Prefix Length are required for the LAN Setup."
            alert(window.top.mlang["AIPE07"]);
            return false;
        }
        if (is_ipv6_blank(dns1) == true) {
            //"The Primary DNS Server is not valid;"
            alert(window.top.mlang["AIPE18"]);
            return false;
        }
        if (ipPrefix == "") {
            //"Prefix Length for the WAN Setup is not valid; it has to be a number between 4 ~ 126"
            alert(window.top.mlang["AIPE04"]);
            return false;
        }
        if (lanIpPrefix == "") {
            //"Prefix Length for the LAN Setup is not valid; it has to be a number between 4 ~ 126"
            alert(window.top.mlang["AIPE09"]);
            return false;
        }

        /* check ip hex num*/
        if (is_ipv6_HexNum(ipaddr) == false) {
            //"IPv6 Address for the WAN Setup is not valid, only hexdigits are allowed."
            alert(window.top.mlang["AIPE03"]);
            return false;
        }
        if (is_ipv6_HexNum(gateway) == false) {
            //"Gateway IPv6 Address is not valid, only hexdigits are allowed."
            alert(window.top.mlang["AIPE06"]);
            return false;
        }
        if (is_ipv6_HexNum(lanIp) == false) {
            //"IPv6 Address for the LAN Setup is not valid, only hexdigits are allowed."
            alert(window.top.mlang["AIPE08"]);
            return false;
        }
        if (is_ipv6_HexNum(dns1) == false) {
            //"Primary DNS Server setting is the IPv6 address of the primary DNS server; only hex digits are required."
            alert(window.top.mlang["AIPE11"]);
            return false;
        }
        if (is_ipv6_blank(dns2) == false && is_ipv6_HexNum(dns2) == false) {
            //"Secondary DNS Server setting is the IPv6 address of the secondary DNS server; only hex digits are required."
            alert(window.top.mlang["AIPE12"]);
            return false;
        }

        /* check ip conflict */
        if (isIPv6Equals(ipaddr, gateway) == true) {
            //"WAN IPv6 address must different from Default IPv6 Gateway."
            alert(window.top.mlang["AIP025"]);
            return false;
        }
        if (isIPv6Equals(ipaddr, dns1) == true || isIPv6Equals(ipaddr, dns2) == true) {
            //"The WAN IPv6 Address has to be different from the Primary/Secondary DNS Server."
            alert(window.top.mlang["AIPE21"]);
            return false;
        }
        if (isIPv6Equals(lanIp, dns1) == true || isIPv6Equals(lanIp, dns2) == true) {
            //"TThe LAN IPv6 Address has to be different from the Primary/Secondary DNS Server."
            alert(window.top.mlang["AIPE22"]);
            return false;
        }
        if (is_ipv6_blank(dns1) == false && is_ipv6_blank(dns2) == false)  {
            if (isIPv6Equals(dns1, dns2) == true) {
                //"The Primary DNS Server has to be different from Secondary DNS Server."
                alert(window.top.mlang["AIPE23"]);
                return false;
            }
        }

        /* check if ip is a global ip*/
        if (isIPv6_globalAddr(ipaddr) == false) {
            //"The WAN IPv6 Address is not valid; it has to be a global unicast address."
            alert(window.top.mlang["AIPE15"] + window.top.mlang["AIPE16"]);
            return false;
        }
        if (isIPv6_globalAddr(gateway) == false) {
            //"The Gateway IPv6 Address is not valid; it has to be a global unicast address."
            alert(window.top.mlang["AIPE17"] + window.top.mlang["AIPE16"]);
            return false;
        }
        if (isIPv6_globalAddr(lanIp) == false) {
            //"LAN IPv6 Address is not valid. Only global unicast address is allowed."
            alert(window.top.mlang["AIP024"]);
            return false;
        }
        if (isIPv6_globalAddr(dns1) == false) {
            //"The Primary DNS Server is not valid; it has to be a global unicast address."
            alert(window.top.mlang["AIPE18"] + window.top.mlang["AIPE16"]);
            return false;
        }
        if (is_ipv6_blank(dns1) == false && isIPv6_globalAddr(dns2) == false) {
            //"The Secondary DNS Server is not valid; it has to be a global unicast address."
            alert(window.top.mlang["AIPE19"] + window.top.mlang["AIPE16"]);
            return false;
        }

        /* check ip subnet conflict */
        //gateway should in the same subnet with wan ip
        if (isSameSubnet(gateway, ipaddr, parseInt(ipPrefix)) == false) {

            //"The Gateway IPv6 Address has to be in the same subnet as the WAN IPv6 address."
            alert(window.top.mlang["AIPE20"]);
            return false;
        }
        //lan ip and wan ip should not be in the same subnet
        var prefix_tmp;
        if (parseInt(ipPrefix) > parseInt(lanIpPrefix) ) {
            prefix_tmp = parseInt(ipPrefix);
        }
        else {
            prefix_tmp = parseInt(lanIpPrefix);
        }
        if (isSameSubnet(lanIp, ipaddr, prefix_tmp) == true) {

            //"The WAN IPv6 Address and the LAN IPv6 address has to be in different subnet."
            alert(window.top.mlang["AIPE14"]);
            return false;
        }

        /* check prefix */
        if (parseInt(ipPrefix) < 4 || parseInt(ipPrefix) > 126) {
            //"Prefix Length for the WAN Setup is not valid; it has to be a number between 4 ~ 126"
            alert(window.top.mlang["AIPE04"]);
            return false;
        }
        if (parseInt(lanIpPrefix) < 4 || parseInt(lanIpPrefix) > 126) {
            //"Prefix Length for the LAN Setup is not valid; it has to be a number between 4 ~ 126"
            alert(window.top.mlang["AIPE09"]);
            return false;
        }

        return true;
    }

/* ipv6 fixed section  <-------------------------------------End */

/* ipv6 dhcp section ------------------------------------->Begin */
    function validation_dhcp()
    {
        var dhcpUserClass = $('[name=dhcpUserClass]').val();
        var dhcpDomain = $('[name=dhcpDomain]').val();
        var dnsType = $('[name=dnsType]:checked').val();
        var dns1 = $('[name=dns1]').val();
        var dns2 = $('[name=dns2]').val();
        var enableInterfaceId = $('[name=enableInterfaceId]').val();
        var lanInterfaceId = $('[name=lanInterfaceId]').val();


        if (dhcpUserClass.match( /[^\x20-\x7E]/ )) {
            //"User Class is not valid; only printable ASCII characters are allowed."
            alert(window.top.mlang["AIPE13"]);
            return false;
        }

        if (dhcpDomain.match( /[^\x20-\x7E]/ )) {
            //"Invalid domain name."
            alert(window.top.mlang["ACB_100"]);
            return false;
        }

        /* check dns */
        if (dnsType == "fixed") {
            /* check if dns is blank */
            if (is_ipv6_blank(dns1) == true) {
                //"The Primary DNS Server is not valid;"
                alert(window.top.mlang["AIPE18"]);
                return false;
            }

            /* check if dns is hex num*/
            if (is_ipv6_HexNum(dns1) == false) {
                //"Primary DNS Server setting is the IPv6 address of the primary DNS server; only hex digits are required."
                alert(window.top.mlang["AIPE11"]);
                return false;
            }
            if (is_ipv6_blank(dns2) == false && is_ipv6_HexNum(dns2) == false) {
                //"Secondary DNS Server setting is the IPv6 address of the secondary DNS server; only hex digits are required."
                alert(window.top.mlang["AIPE12"]);
                return false;
            }

            /* check if dns is a global ip*/
            if (isIPv6_globalAddr(dns1) == false) {
                //"The Primary DNS Server is not valid; it has to be a global unicast address."
                alert(window.top.mlang["AIPE18"] + window.top.mlang["AIPE16"]);
                return false;
            }
            if (is_ipv6_blank(dns2) == false && isIPv6_globalAddr(dns2) == false) {
                //"The Secondary DNS Server is not valid; it has to be a global unicast address."
                alert(window.top.mlang["AIPE19"] + window.top.mlang["AIPE16"]);
                return false;
            }

            /* check dns1 dns2 conflict */
            if (is_ipv6_blank(dns2) == false && is_ipv6_blank(dns2) == false)  {
                if (isIPv6Equals(dns1, dns2) == true) {
                    //"The Primary DNS Server has to be different from Secondary DNS Server."
                    alert(window.top.mlang["AIPE23"]);
                    return false;
                }
            }

        }

        /* check interface id */
        if (enableInterfaceId == "true") {
            if (is_interfaceId_blank(lanInterfaceId) == true || is_interfaceId_HexNum(lanInterfaceId) == false) {
                //"Interface ID is not valid, only hex digits are allowed."
                alert(window.top.mlang["AIPE01"]);
                return false;
            }
        }

        return true;
    }
/* ipv6 dhcp section  <-------------------------------------End */

/* ipv6 pppoe section ------------------------------------->Begin */
    function validation_pppoe()
    {
        var usePPPoEv4 = $('[name=usePPPoEv4]').val();
        var dnsType = $('[name=dnsType]:checked').val();
        var dns1 = $('#dns1').val();
        var dns2 = $('#dns2').val();
        var enableInterfaceId = $('#enableInterfaceId').val();
        var lanInterfaceId = $('#lanInterfaceId').val();

        /* check usePPPoEv4 */
        if (usePPPoEv4 == "true") {
            if ($('[name=v4WanMode]').val() != "PPPoE") {
                alert(window.top.mlang["PCVP_109"]);
                return false;
            }
        }

        /* check dns */
        if (dnsType == "fixed") {
            /* check if dns is blank */
            if (is_ipv6_blank(dns1) == true) {
                //"The Primary DNS Server is not valid;"
                alert(window.top.mlang["AIPE18"]);
                return false;
            }

            /* check if dns is hex num*/
            if (is_ipv6_HexNum(dns1) == false) {
                //"Primary DNS Server setting is the IPv6 address of the primary DNS server; only hex digits are required."
                alert(window.top.mlang["AIPE11"]);
                return false;
            }
            if (is_ipv6_blank(dns2) == false && is_ipv6_HexNum(dns2) == false) {
                //"Secondary DNS Server setting is the IPv6 address of the secondary DNS server; only hex digits are required."
                alert(window.top.mlang["AIPE12"]);
                return false;
            }

            /* check if dns is a global ip*/
            if (isIPv6_globalAddr(dns1) == false) {
                //"The Primary DNS Server is not valid; it has to be a global unicast address."
                alert(window.top.mlang["AIPE18"] + window.top.mlang["AIPE16"]);
                return false;
            }
            if (is_ipv6_blank(dns2) == false && isIPv6_globalAddr(dns2) == false) {
                //"The Secondary DNS Server is not valid; it has to be a global unicast address."
                alert(window.top.mlang["AIPE19"] + window.top.mlang["AIPE16"]);
                return false;
            }

            /* check dns1 dns2 conflict */
            if (is_ipv6_blank(dns2) == false && is_ipv6_blank(dns2) == false)  {
                if (isIPv6Equals(dns1, dns2) == true) {
                    //"The Primary DNS Server has to be different from Secondary DNS Server."
                    alert(window.top.mlang["AIPE23"]);
                    return false;
                }
            }

        }

        /* check interface id */
        if (enableInterfaceId == "true") {
            if (is_interfaceId_blank(lanInterfaceId) == true || is_interfaceId_HexNum(lanInterfaceId) == false) {
                //"Interface ID is not valid, only hex digits are allowed."
                alert(window.top.mlang["AIPE01"]);
                return false;
            }
        }

        return true;
    }
/* ipv6 pppoe section  <-------------------------------------End */

    function validation_6rd()
    {
        var prefix = $('[name=prefix]').val();
        var prefixLength = $('[name=prefixLength]').val();
        var ipv4BoderAddr = $('[name=ipv4BoderAddr]').val();
        var ipv4BoderMaskLen = $('[name=ipv4BoderMaskLen]').val();
        var dnsType = $('[name=dnsType]:checked').val();
        var dns1 = $('#dns1').val();
        var dns2 = $('#dns2').val();
        var enableInterfaceId = $('[name=enableInterfaceId]').val();
        var lanInterfaceId = $('[name=lanInterfaceId]').val();

        if (isNumStr(prefixLength) == false) {
            alert("Invalid Prefix Length.");
            return false;
        }

        if (isNumStr(ipv4BoderMaskLen) == false) {
            //"Invalid Netmask Length"
            alert(window.top.mlang["D-genie_561"]);
            return false;
        }

        if (parseInt(prefixLength) <= 0 || parseInt(prefixLength) + (32 - parseInt(ipv4BoderMaskLen)) > 64) {
            alert("IPV6 Delegation Prefix Length > 64. ");
            return false;
        }

        if (parseInt(ipv4BoderMaskLen) < 0 || parseInt(ipv4BoderMaskLen) >32) {
            alert("Invalid Prefix Length.");
            return false;
        }

        if (isValidIpStr(ipv4BoderAddr) == false) {
            //"Invalid static IP address.\n"
            alert(window.top.mlang["SWPE11"]);
            return false;
        }

        /* check dns */
        if (dnsType == "fixed") {
            /* check if dns is blank */
            if (is_ipv6_blank(dns1) == true) {
                //"The Primary DNS Server is not valid;"
                alert(window.top.mlang["AIPE18"]);
                return false;
            }

            /* check if dns is hex num*/
            if (is_ipv6_HexNum(dns1) == false) {
                //"Primary DNS Server setting is the IPv6 address of the primary DNS server; only hex digits are required."
                alert(window.top.mlang["AIPE11"]);
                return false;
            }
            if (is_ipv6_blank(dns2) == false && is_ipv6_HexNum(dns2) == false) {
                //"Secondary DNS Server setting is the IPv6 address of the secondary DNS server; only hex digits are required."
                alert(window.top.mlang["AIPE12"]);
                return false;
            }

            /* check if dns is a global ip*/
            if (isIPv6_globalAddr(dns1) == false) {
                //"The Primary DNS Server is not valid; it has to be a global unicast address."
                alert(window.top.mlang["AIPE18"] + window.top.mlang["AIPE16"]);
                return false;
            }
            if (is_ipv6_blank(dns2) == false && isIPv6_globalAddr(dns2) == false) {
                //"The Secondary DNS Server is not valid; it has to be a global unicast address."
                alert(window.top.mlang["AIPE19"] + window.top.mlang["AIPE16"]);
                return false;
            }

            /* check dns1 dns2 conflict */
            if (is_ipv6_blank(dns2) == false && is_ipv6_blank(dns2) == false)  {
                if (isIPv6Equals(dns1, dns2) == true) {
                    //"The Primary DNS Server has to be different from Secondary DNS Server."
                    alert(window.top.mlang["AIPE23"]);
                    return false;
                }
            }

        }

        /* check interface id */
        if (enableInterfaceId == "true") {
            if (is_interfaceId_blank(lanInterfaceId) == true || is_interfaceId_HexNum(lanInterfaceId) == false) {
                //"Interface ID is not valid, only hex digits are allowed."
                alert(window.top.mlang["AIPE01"]);
                return false;
            }
        }

        return true;
    }

    function validation_6to4()
    {
        var relayRouterType = $('[name=relayRouterType]:checked').val();
        var relayRouterIp = $('[name=relayRouterIp]').val();
        var dnsType = $('[name=dnsType]:checked').val();
        var dns1 = $('[name=dns1]').val();
        var dns2 = $('[name=dns2]').val();
        var enableInterfaceId = $('[name=enableInterfaceId]').val();
        var lanInterfaceId = $('[name=lanInterfaceId]').val();

        if (relayRouterType == "fixed") {
            if (isValidIpStr(relayRouterIp) == false) {
                //"Invalid static IP address."
                alert(window.top.mlang["SWPE11"]);
                return false;
            }
        }

        /* check dns */
        if (dnsType == "fixed") {
            /* check if dns is blank */
            if (is_ipv6_blank(dns1) == true) {
                //"The Primary DNS Server is not valid;"
                alert(window.top.mlang["AIPE18"]);
                return false;
            }

            /* check if dns is hex num*/
            if (is_ipv6_HexNum(dns1) == false) {
                //"Primary DNS Server setting is the IPv6 address of the primary DNS server; only hex digits are required."
                alert(window.top.mlang["AIPE11"]);
                return false;
            }
            if (is_ipv6_blank(dns2) == false && is_ipv6_HexNum(dns2) == false) {
                //"Secondary DNS Server setting is the IPv6 address of the secondary DNS server; only hex digits are required."
                alert(window.top.mlang["AIPE12"]);
                return false;
            }

            /* check if dns is a global ip*/
            if (isIPv6_globalAddr(dns1) == false) {
                //"The Primary DNS Server is not valid; it has to be a global unicast address."
                alert(window.top.mlang["AIPE18"] + window.top.mlang["AIPE16"]);
                return false;
            }
            if (is_ipv6_blank(dns2) == false && isIPv6_globalAddr(dns2) == false) {
                //"The Secondary DNS Server is not valid; it has to be a global unicast address."
                alert(window.top.mlang["AIPE19"] + window.top.mlang["AIPE16"]);
                return false;
            }

            /* check dns1 dns2 conflict */
            if (is_ipv6_blank(dns2) == false && is_ipv6_blank(dns2) == false)  {
                if (isIPv6Equals(dns1, dns2) == true) {
                    //"The Primary DNS Server has to be different from Secondary DNS Server."
                    alert(window.top.mlang["AIPE23"]);
                    return false;
                }
            }

        }

        /* check interface id */
        if (enableInterfaceId == "true") {
            if (is_interfaceId_blank(lanInterfaceId) == true || is_interfaceId_HexNum(lanInterfaceId) == false) {
                //"Interface ID is not valid, only hex digits are allowed."
                alert(window.top.mlang["AIPE01"]);
                return false;
            }
        }

        if (!confirm(window.top.mlang["AIP019"])) {
            return false;
        }

        return true;
    }

    function validation_AutoConfig()
    {
        var dhcpUserClass = $('[name=dhcpUserClass]').val();
        var dhcpDomain = $('[name=dhcpDomain]').val();
        var dnsType = $('[name=dnsType]:checked').val();
        var dns1 = $('[name=dns1]').val();
        var dns2 = $('[name=dns2]').val();
        var enableInterfaceId = $('[name=enableInterfaceId]').val();
        var lanInterfaceId = $('[name=lanInterfaceId]').val();

        if (dhcpUserClass.match( /[^\x20-\x7E]/ )) {
            //"User Class is not valid; only printable ASCII characters are allowed."
            alert(window.top.mlang["AIPE13"]);
            return false;
        }

        if (dhcpDomain.match( /[^\x20-\x7E]/ )) {
            //"Invalid domain name."
            alert(window.top.mlang["ACB_100"]);
            return false;
        }

        /* check dns */
        if (dnsType == "fixed") {
            /* check if dns is blank */
            if (is_ipv6_blank(dns1) == true) {
                //"The Primary DNS Server is not valid;"
                alert(window.top.mlang["AIPE18"]);
                return false;
            }

            /* check if dns is hex num*/
            if (is_ipv6_HexNum(dns1) == false) {
                //"Primary DNS Server setting is the IPv6 address of the primary DNS server; only hex digits are required."
                alert(window.top.mlang["AIPE11"]);
                return false;
            }
            if (is_ipv6_blank(dns2) == false && is_ipv6_HexNum(dns2) == false) {
                //"Secondary DNS Server setting is the IPv6 address of the secondary DNS server; only hex digits are required."
                alert(window.top.mlang["AIPE12"]);
                return false;
            }

            /* check if dns is a global ip*/
            if (isIPv6_globalAddr(dns1) == false) {
                //"The Primary DNS Server is not valid; it has to be a global unicast address."
                alert(window.top.mlang["AIPE18"] + window.top.mlang["AIPE16"]);
                return false;
            }
            if (is_ipv6_blank(dns2) == false && isIPv6_globalAddr(dns2) == false) {
                //"The Secondary DNS Server is not valid; it has to be a global unicast address."
                alert(window.top.mlang["AIPE19"] + window.top.mlang["AIPE16"]);
                return false;
            }

            /* check dns1 dns2 conflict */
            if (is_ipv6_blank(dns2) == false && is_ipv6_blank(dns2) == false)  {
                if (isIPv6Equals(dns1, dns2) == true) {
                    //"The Primary DNS Server has to be different from Secondary DNS Server."
                    alert(window.top.mlang["AIPE23"]);
                    return false;
                }
            }

        }

        /* check interface id */
        if (enableInterfaceId == "true") {
            if (is_interfaceId_blank(lanInterfaceId) == true || is_interfaceId_HexNum(lanInterfaceId) == false) {
                //"Interface ID is not valid, only hex digits are allowed."
                alert(window.top.mlang["AIPE01"]);
                return false;
            }
        }

        return true;
    }

    function validation_AutoDetect()
    {
        var dnsType = $('[name=dnsType]:checked').val();
        var dns1 = $('[name=dns1]').val();
        var dns2 = $('[name=dns2]').val();
        var enableInterfaceId = $('[name=enableInterfaceId]').val();
        var lanInterfaceId = $('[name=lanInterfaceId]').val();

        /* check dns */
        if (dnsType == "fixed") {
            /* check if dns is blank */
            if (is_ipv6_blank(dns1) == true) {
                //"The Primary DNS Server is not valid;"
                alert(window.top.mlang["AIPE18"]);
                return false;
            }

            /* check if dns is hex num*/
            if (is_ipv6_HexNum(dns1) == false) {
                //"Primary DNS Server setting is the IPv6 address of the primary DNS server; only hex digits are required."
                alert(window.top.mlang["AIPE11"]);
                return false;
            }
            if (is_ipv6_blank(dns2) == false && is_ipv6_HexNum(dns2) == false) {
                //"Secondary DNS Server setting is the IPv6 address of the secondary DNS server; only hex digits are required."
                alert(window.top.mlang["AIPE12"]);
                return false;
            }

            /* check if dns is a global ip*/
            if (isIPv6_globalAddr(dns1) == false) {
                //"The Primary DNS Server is not valid; it has to be a global unicast address."
                alert(window.top.mlang["AIPE18"] + window.top.mlang["AIPE16"]);
                return false;
            }
            if (is_ipv6_blank(dns2) == false && isIPv6_globalAddr(dns2) == false) {
                //"The Secondary DNS Server is not valid; it has to be a global unicast address."
                alert(window.top.mlang["AIPE19"] + window.top.mlang["AIPE16"]);
                return false;
            }

            /* check dns1 dns2 conflict */
            if (is_ipv6_blank(dns2) == false && is_ipv6_blank(dns2) == false)  {
                if (isIPv6Equals(dns1, dns2) == true) {
                    //"The Primary DNS Server has to be different from Secondary DNS Server."
                    alert(window.top.mlang["AIPE23"]);
                    return false;
                }
            }

        }

        /* check interface id */
        if (enableInterfaceId == "true") {
            if (is_interfaceId_blank(lanInterfaceId) == true || is_interfaceId_HexNum(lanInterfaceId) == false) {
                //"Interface ID is not valid, only hex digits are allowed."
                alert(window.top.mlang["AIPE01"]);
                return false;
            }
        }

        return true;
    }
/* onClick/onChange functions section ------------------------------------->Begin */
    function onChange_Dhcp_dnsType()
    {
        var dnsType = $("[name=dnsType]:checked").val();

        if (dnsType == "dynamic") {
            $(".dhcp_dns").css("pointer-events", "none");
            $(".dhcp_dns").css("opacity", "0.5");
        }
        else if (dnsType == "fixed") {
            $(".dhcp_dns").css("pointer-events", "");
            $(".dhcp_dns").css("opacity", "");
        }
    }

    function onChange_Dhcp_enableInterfaceId()
    {
        var enableInterfaceId = $('[name=enableInterfaceId]').val();

        if (enableInterfaceId == "false") {
            $(".dhcp_interfaceId").css("pointer-events", "none");
            $(".dhcp_interfaceId").css("opacity", "0.5");
        }
        else {
            $(".dhcp_interfaceId").css("pointer-events", "");
            $(".dhcp_interfaceId").css("opacity", "");
        }
    }

    function onChange_Pppoe_dnsType()
    {
        var dnsType = $("[name=dnsType]:checked").val();

        if (dnsType == "dynamic") {
            $(".pppoe_dns").css("pointer-events", "none");
            $(".pppoe_dns").css("opacity", "0.5");
        }
        else if (dnsType == "fixed") {
            $(".pppoe_dns").css("pointer-events", "");
            $(".pppoe_dns").css("opacity", "");
        }
    }

    function onChange_Pppoe_enableInterfaceId()
    {
        var enableInterfaceId = $('[name=enableInterfaceId]').val();

        if (enableInterfaceId == "false") {
            $(".pppoe_interfaceId").css("pointer-events", "none");
            $(".pppoe_interfaceId").css("opacity", "0.5");
        }
        else {
            $(".pppoe_interfaceId").css("pointer-events", "");
            $(".pppoe_interfaceId").css("opacity", "");
        }
    }

    function onChange_6rd_dnsType()
    {
        var dnsType = $("[name=dnsType]:checked").val();

        if (dnsType == "dynamic") {
            $(".6rd_dns").css("pointer-events", "none");
            $(".6rd_dns").css("opacity", "0.5");
        }
        else if (dnsType == "fixed") {
            $(".6rd_dns").css("pointer-events", "");
            $(".6rd_dns").css("opacity", "");
        }
    }

    function onChange_6rd_enableInterfaceId()
    {
        var enableInterfaceId = $('[name=enableInterfaceId]').val();

        if (enableInterfaceId == "false") {
            $(".6rd_interfaceId").css("pointer-events", "none");
            $(".6rd_interfaceId").css("opacity", "0.5");
        }
        else {
            $(".6rd_interfaceId").css("pointer-events", "");
            $(".6rd_interfaceId").css("opacity", "");
        }
    }

    function onChange_6to4_relayRouterType()
    {
        var relayRouterType = $("[name=relayRouterType]:checked").val();

        if (relayRouterType == "dynamic") {
            $(".6to4_relayIp").css("pointer-events", "none");
            $(".6to4_relayIp").css("opacity", "0.5");
        }
        else if (relayRouterType == "fixed") {
            $(".6to4_relayIp").css("pointer-events", "");
            $(".6to4_relayIp").css("opacity", "");
        }
    }
    function onChange_6to4_dnsType()
    {
        var dnsType = $("[name=dnsType]:checked").val();

        if (dnsType == "dynamic") {
            $(".6to4_dns").css("pointer-events", "none");
            $(".6to4_dns").css("opacity", "0.5");
        }
        else if (dnsType == "fixed") {
            $(".6to4_dns").css("pointer-events", "");
            $(".6to4_dns").css("opacity", "");
        }
    }

    function onChange_6to4_enableInterfaceId()
    {
        var enableInterfaceId = $('[name=enableInterfaceId]').val();

        if (enableInterfaceId == "false") {
            $(".6to4_interfaceId").css("pointer-events", "none");
            $(".6to4_interfaceId").css("opacity", "0.5");
        }
        else {
            $(".6to4_interfaceId").css("pointer-events", "");
            $(".6to4_interfaceId").css("opacity", "");
        }
    }

    function onChange_AutoConfig_dnsType()
    {
        var dnsType = $("[name=dnsType]:checked").val();

        if (dnsType == "dynamic") {
            $(".auto_config_dns").css("pointer-events", "none");
            $(".auto_config_dns").css("opacity", "0.5");
        }
        else if (dnsType == "fixed") {
            $(".auto_config_dns").css("pointer-events", "");
            $(".auto_config_dns").css("opacity", "");
        }
    }

    function onChange_AutoConfig_enableInterfaceId()
    {
        var enableInterfaceId = $('[name=enableInterfaceId]').val();

        if (enableInterfaceId == "false") {
            $(".auto_config_interfaceId").css("pointer-events", "none");
            $(".auto_config_interfaceId").css("opacity", "0.5");
        }
        else {
            $(".auto_config_interfaceId").css("pointer-events", "");
            $(".auto_config_interfaceId").css("opacity", "");
        }
    }

    function onChange_AutoDetect_dnsType()
    {
        var dnsType = $("[name=dnsType]:checked").val();

        if (dnsType == "dynamic") {
            $(".autodetect_dns").css("pointer-events", "none");
            $(".autodetect_dns").css("opacity", "0.5");
        }
        else if (dnsType == "fixed") {
            $(".autodetect_dns").css("pointer-events", "");
            $(".autodetect_dns").css("opacity", "");
        }
    }

    function onChange_AutoDetect_enableInterfaceId()
    {
        var enableInterfaceId = $('[name=enableInterfaceId]').val();

        if (enableInterfaceId == "false") {
            $(".auto_detect_interfaceId").css("pointer-events", "none");
            $(".auto_detect_interfaceId").css("opacity", "0.5");
        }
        else {
            $(".auto_detect_interfaceId").css("pointer-events", "");
            $(".auto_detect_interfaceId").css("opacity", "");
        }
    }
/* onClick/onChange functions section  <-------------------------------------End */