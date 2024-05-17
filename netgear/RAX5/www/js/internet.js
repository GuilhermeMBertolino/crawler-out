
    function is_ipv4_blank(v4Ip)
    {
        var ipv4 = v4Ip.split('.');
        
        if (ipv4.length != 4) {
            return true;
        }
        
        /* not allow any fileds blank */
        if (ipv4[0] == "" || ipv4[1] == "" || ipv4[3] == "" || ipv4[3] == "") {
            return true;
        }
        
        return false;
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
 
 /* check openvpn and ddns status and implement the correlation behavior between openvpn and Static IP address */
    function vpn_check(wanType)
    {
        var openvpnEnable = $('[name=hidOpenvpnEnable]').val();
        var ddnsEnable = $('[name=hidDdnsEnable]').val();
        if ( wanType == "pppoe" ||  wanType == "eth" )
        {
            var ipType = $('[name=ipType]:checked').val();
        }
        else
        {
            var ipType = $('[name=ipType]').val();
        }
        var ipType_old = $('[name=runningIpType]').val();
        var ipAddr = $("[name=ipAddr]").val();
        var ipAddr_old = $("[name=runningStaticIp]").val();

        if ( openvpnEnable == "true" ) // openvpn is enabled
        {
            // When the VPN Service is enabled and Static IP address is changed in Internet Setup page, pop out warning message in an alert window
            if ( ipType == "fixed" && ipType_old == "fixed" && ipAddr != ipAddr_old )
            {
                // "You have changed your Static IP address for the Internet connection, which is being used by the VPN Service. Please follow the Step 2 and Step 3 for VPN client installation to download and install the configuration files on each of your VPN client devices (overwrite existing configuration files).”
                alert(window.top.mlang["vpn161"]);
            }
            
            if ( ddnsEnable == "false" ) // ddns is disabled
            {
                // When VPN Service is enabled and DDNS is not enabled, user changes the Internet connection type from static ip to others, pop out the message
                if ( ipType_old == "fixed" && ipType == "dynamic" )
                {
                    // “The VPN Service needs the static ip address or DDNS. Do you want to continue and disable the VPN service?
                    if ( !confirm(window.top.mlang["vpn179"]) )
                    {
                        // if user clicks the Cancel button, back to the last page and do nothing
                        window.location.href = "BAS_wan.html";
                        return false;
                    }
                    else
                    {
                        // if user clicks the OK button, continue the settings and disable the VPN Service, which will be done in post handler function
                        $('[name=disableVPN]').val("1");
                    }
                }
            }
        }
    }
 
/* internet eth section ------------------------------------->Begin */
    function validation_eth() {
        var domain = $('[name=domain]').val();
        var ipType = $('[name=ipType]:checked').val();
        var msg = "";

        //check domain.
        if (domain.match(/[^\x20-\x7E]{1,32}$/)) {
            alert(window.top.mlang["SWPE02"]);
            return false;
        }


        //check static ip switch
        if (ipType == 'fixed') {
            //validate ip address
            if (!$('#ipAddr-ip').validateIp()) {
                msg += window.top.mlang['SWPE05'];
            }
            //validate netmask
            else if (!$('#netmask-ip').validateIp()) {
                 msg += window.top.mlang['SWPE06'];
            }
            //validate gateway
            else if (!$('#gateway-ip').validateIp()) {
                msg += window.top.mlang['SWPE04'];
            }
            else
            {
                if(checkEthIP($('#ipAddr-ip').getIp(),255))
                {
                    msg+= window.top.mlang["SWPE05"];
                }
                else if(checkEthMask($('#netmask-ip').getIp(),253)|| !isNetmask(ip2int($('#netmask-ip').getIp())))
                {
                    msg+= window.top.mlang["SWPE06"];
                }
                else if(checkEthIpRange($('#netmask-ip').getIp(),$('#ipAddr-ip').getIp()))
                {
                    msg+= window.top.mlang["SWPE05"];
                }
            }
        }

        if (msg.length > 1) {
            alert(msg);
            return false;
        }
        
        if (validation_common("eth") == false) {
            return false;
        }

        if (vpn_check("eth") == false) {
            return false;
        }

        return true;
    }

    function init_eth_ipType()
    {
        onChange_eth_ipType();
    }
    
    function onChange_eth_ipType()
    {
        var ipType = $('[name=ipType]:checked').val();
        
        if (ipType == "dynamic") {
            $('#ipaddress-section :input').attr('readonly', true);

            //while WAN is dynamic IP, allow user to use dynamic DNS
            $("[name=dnsType]")[0].disabled = false;
        }
        else if (ipType == "fixed") {
            $('#ipaddress-section :input').attr('readonly', false);

            //while WAN is fixed IP, force user to use fixed DNS
            $("[name=dnsType]")[0].disabled = true;
            $("[name=dnsType]")[1].checked = true;
            $("[name=dnsType]").change();
        }
    }
    
/* internet eth section  <-------------------------------------End */

/* internet pptp section ------------------------------------->Begin */
    function validation_pptp()
    {
        var mode_autoid = $('select[name=mode_autoid]').val();
        var idleTimeout = $('[name=idleTimeout]').val();
        var username = $('[name=username]').val();
        var ipAddr = $("[name=ipAddr]").val();
        var netmask = $("[name=netmask]").val();
        var gateway = $("[name=gateway]").val();
        var serverAddr = $("[name=serverAddr]").val();
        var msg = "";
        
        //check for pppoe fields
        if (mode_autoid == "Dail on Demand" || mode_autoid == "Manually Connect") {
            if(!confirm(window.top.mlang["UAS054"])) {
                $('select[name=mode_autoid]').val("Always On");
                $('select[name=mode_autoid]').change();
                return false;
            }
        }
        
        //check username
        if (username.length == 0 || username.trim() == "") {
            //"User Name must not be blank."
            msg += window.top.mlang["SWP051"] + window.top.mlang["APPE13"];
        }
        
        if (mode_autoid == "Dail on Demand") {
            //check idle time
            if(idleTimeout.length == 0) {
                //"Please enter the idle time."
                msg+= window.top.mlang["SWPE03"];
            }
            else if(!_isNumeric(idleTimeout)) {
                //"Invalid idle time, please enter proper numeral."
                msg+= window.top.mlang["SWPE12"];
            }
        }
        
        //check ip, netmask, gateway
        if ($("[name=ipType]").val() == "fixed") {
            if (is_ipv4_blank(ipAddr) || checkIP(ipAddr, 255)) {
                msg += window.top.mlang["SWPE07"];
            }
            if (is_ipv4_blank(netmask) || checkIP(netmask, 255)) {
                msg += window.top.mlang["SWPE06"];
            }
            if (is_ipv4_blank(gateway) || checkIP(gateway, 255)) {
                msg += window.top.mlang["SWPE04"];
            }
        }
        //TODO: serverAddr need check vaild format(IP and domain)
        //if (serverAddr == "" || checkIP(serverAddr, 255)) {
        if (serverAddr == "") {
            msg += window.top.mlang["SWPE10"];
        }

        if (msg.length > 1) {
            alert(msg);
            return false;
        }

        if (validation_common("pptp") == false) {
            return false;
        }

        if (vpn_check("pptp") == false) {
            return false;
        }

        return true;
    }
    
    function init_pptp_mode_autoid()
    {
        onChange_pptp_mode_autoid();
    }
    
    function onFocus_pptp_password()
    {
        /* clear "*****" */
        $('[name=password]').val("");
        /* for user input can be visible */
        $('[name=password]').prop("type", "text");
    }

    function onChange_pptp_mode_autoid()
    {   
        var mode_autoid = $('select[name=mode_autoid]').val();
        var v6Type = $('[name=v6Type]').val();

        if (mode_autoid == "Dail on Demand") {
            $('[name=idleTimeout]').attr('readonly', false);
        }
        else {
            $('[name=idleTimeout]').attr('readonly', true);
        }

        if(v6Type== "6to4") {
            $('#pptp_dod').attr("disabled", true);
            $('[name=idleTimeout]').attr('readonly', true);
            $('select[name=mode_autoid]').val("Always On");
        }

        //sync value from mode_autoid to hidden input which is the post parameter
        var mode_map = {"Always On" : "always", 
                        "Dail on Demand" : "onDemand",
                        "Manually Connect" : "manually"};
        $('[name=mode]').val(mode_map[mode_autoid]);
    }

    function onBlur_pptp_serverAddr()
    {
        var serverAddr = $("[name=serverAddr]").val();
        // if serverAddr is domain, then disable dynamic DNS and force to be static DNS
        if (isValidIpStr(serverAddr) || serverAddr == "") {
            $("[name=dnsType]")[0].disabled = false;
            $("[name=dnsType]")[1].disabled = false;
        }
        else {
            $("[name=dnsType]")[0].disabled = true;
            $("[name=dnsType]")[1].checked = true;
        }
        onChange_dnsType();
    }
    
    
/* internet pptp section  <-------------------------------------End */

/* internet pppoe section ------------------------------------->Begin */
    function validation_pppoe()
    {
        var mode_autoid = $('select[name=mode_autoid]').val();
        var idleTimeout = $('[name=idleTimeout]').val();
        var username = $('[name=username]').val();
        var ipType = $('[name=ipType]:checked').val();
        var ipAddr = $("[name=ipAddr]").val();
        var msg = "";
        
        //check for pppoe fields
        if (mode_autoid == "Dail on Demand" || mode_autoid == "Manually Connect") {
            if(!confirm(window.top.mlang["UAS054"])) {
                $('select[name=mode_autoid]').val("Always On");
                $('select[name=mode_autoid]').change();
                return false;
            }
        }

        //check username
        if (username.length == 0 || username.trim() == "") {
            //"User Name must not be blank."
            msg += window.top.mlang["SWP051"] + window.top.mlang["APPE13"];
        }
        
        //check idle time
        if (mode_autoid == "Dail on Demand") {
            if(idleTimeout.length == 0) {
                //"Please enter the idle time."
                msg+= window.top.mlang["SWPE03"];
            }
            else if(!_isNumeric(idleTimeout)) {
                //"Invalid idle time, please enter proper numeral."
                msg+= window.top.mlang["SWPE12"];
            }
        }

        //check static ip switch
        if (ipType == 'fixed') {
            //validate ip address
            if (!$('#ipAddr-ip').validateIp()) {
                msg += window.top.mlang['SWPE05'];
            }
        }
        
        if (msg.length > 1) {
            alert(msg);
            return false;
        }
        
        if (validation_common("pppoe") == false) {
            return false;
        }

        if (vpn_check("pppoe") == false) {
            return false;
        }

        return true;
    }
    
    function init_pppoe_mode_autoid()
    {
        onChange_pppoe_mode_autoid();
    }
    
    function init_pppoe_ipType()
    {
        onChange_pppoe_ipType();
    }

    function onChange_pppoe_mode_autoid()
    {
        var mode_autoid = $('select[name=mode_autoid]').val();
        var v6Type = $('[name=v6Type]').val();

        if (mode_autoid == "Dail on Demand") {
            $('[name=idleTimeout]').attr('readonly', false);
        }
        else {
            $('[name=idleTimeout]').attr('readonly', true);
        }

        if(v6Type== "6to4") {
            $('#pppoe_dod').attr("disabled", true);
            $('[name=idleTimeout]').attr('readonly', true);
            $('select[name=mode_autoid]').val("Always On");
        }

        //sync value from mode_autoid to hidden input which is the post parameter
        var mode_map = {"Always On" : "always", 
                        "Dail on Demand" : "onDemand",
                        "Manually Connect" : "manually"};
        $('[name=mode]').val(mode_map[mode_autoid]);
    }

    function onChange_pppoe_ipType()
    {
        var ipType = $('[name=ipType]:checked').val();
        
        if (ipType == "dynamic") {
            $('#ipaddress-section :input').attr('readonly', true);
        }
        else if (ipType == "fixed") {
            $('#ipaddress-section :input').attr('readonly', false);
        }
    }
    
    function onFocus_pppoe_password()
    {
        /* clear "*****" */
        $('[name=password]').val("");
        /* for user input can be visible */
        $('[name=password]').prop("type", "text");
    }

/* internet pppoe section  <-------------------------------------End */

/* internet l2tp section ------------------------------------->Begin */
    function validation_l2tp()
    {
        var mode_autoid = $('select[name=mode_autoid]').val();
        var idleTimeout = $('[name=idleTimeout]').val();
        var username = $('[name=username]').val();
        var ipAddr = $("[name=ipAddr]").val();
        var netmask = $("[name=netmask]").val();
        var gateway = $("[name=gateway]").val();
        var serverAddr = $("[name=serverAddr]").val();
        var msg = "";
        
        //show connection mode warnning
        if (mode_autoid == "Dail on Demand" || mode_autoid == "Manually Connect") {
            if(!confirm(window.top.mlang["UAS054"])) {
                $('select[name=mode_autoid]').val("Always On");
                $('select[name=mode_autoid]').change();
                return false;
            }
        }
        
        //check username
        if (username.length == 0 || username.trim() == "") {
            //"User Name must not be blank."
            msg += window.top.mlang["SWP051"] + window.top.mlang["APPE13"];
        }
        
        //check idle time
        if (mode_autoid == "Dail on Demand") {
            if(idleTimeout.length == 0) {
                //"Please enter the idle time."
                msg+= window.top.mlang["SWPE03"];
            }
            else if(!_isNumeric(idleTimeout)) {
                //"Invalid idle time, please enter proper numeral."
                msg+= window.top.mlang["SWPE12"];
            }
        }
        
        //check ip, netmask, gateway
        if ($("[name=ipType]").val() == "fixed") {
            if (is_ipv4_blank(ipAddr) || checkIP(ipAddr, 255)) {
                msg += window.top.mlang["SWPE07"];
            }
            if (is_ipv4_blank(netmask) || checkIP(netmask, 255)) {
                msg += window.top.mlang["SWPE06"];
            }
            if (is_ipv4_blank(gateway) || checkIP(gateway, 255)) {
                msg += window.top.mlang["SWPE04"];
            }
        }
        //TODO: serverAddr need check vaild format(IP and domain)
        //if (serverAddr == "" || checkIP(serverAddr, 255)) {
        if (serverAddr == "") {
            msg += window.top.mlang["SWPE10"];
        }

        if (msg.length > 1) {
            alert(msg);
            return false;
        }
        
        if (validation_common("l2tp") == false) {
            return false;
        }

        if (vpn_check("l2tp") == false) {
            return false;
        }

        return true;
    }

    function init_l2tp_mode_autoid()
    {
        onChange_l2tp_mode_autoid();
    }
    
    function onFocus_l2tp_password()
    {
        /* clear "*****" */
        $('[name=password]').val("");
        /* for user input can be visible */
        $('[name=password]').prop("type", "text");
    }

    function onChange_l2tp_mode_autoid()
    {
        var mode_autoid = $('select[name=mode_autoid]').val();
        var v6Type = $('[name=v6Type]').val();

        if (mode_autoid == "Dail on Demand") {
            $('[name=idleTimeout]').attr('readonly', false);
        }
        else {
            $('[name=idleTimeout]').attr('readonly', true);
        }

        if(v6Type== "6to4") {
            $('#l2tp_dod').attr("disabled", true);
            $('[name=idleTimeout]').attr('readonly', true);
            $('select[name=mode_autoid]').val("Always On");
        }

        //sync value from mode_autoid to hidden input which is the post parameter
        var mode_map = {"Always On" : "always", 
                        "Dail on Demand" : "onDemand",
                        "Manually Connect" : "manually"};
        $('[name=mode]').val(mode_map[mode_autoid]);
    }

    function onBlur_l2tp_serverAddr()
    {
        var serverAddr = $("[name=serverAddr]").val();
        // if serverAddr is domain, then disable dynamic DNS and force to be static DNS
        if (isValidIpStr(serverAddr) || serverAddr == "") {
            $("[name=dnsType]")[0].disabled = false;
            $("[name=dnsType]")[1].disabled = false;
        }
        else {
            $("[name=dnsType]")[0].disabled = true;
            $("[name=dnsType]")[1].checked = true;
        }
        onChange_dnsType();
    }
    
/* internet l2tp section  <-------------------------------------End */

/* internet common section ------------------------------------->Begin */
    function validation_common(wanType)
    {
        var dnsType = $('[name=dnsType]:checked').val();
        var dns1 = $("#dns1-ip").getIp();
        var dns2 = $("#dns2-ip").getIp();
        var macClone = $('[name=macClone]:checked').val();
        var msg = "";
        //check dns switch
        if (dnsType == "fixed") {
            
            if (wanType == "eth") {
                var ipAddr = $("[name=ipAddr]").val();
                var netmask = $("[name=netmask]").val();
            
                //validate dns1
                if ((!$("#dns1-ip").validateIp())
                || checkIP(dns1, 254)
                || checkDnsIp(netmask, ipAddr, dns1) /*here need to changes to lan mask and ip!*/) {
                    msg += window.top.mlang['SWPE08'];
                }

                //validate dns2; only if dns2 is filled in and complete,
                if ($("#dns2-ip").isEmptyIp() == false) {
                    if ((!$("#dns2-ip").validateIp()) 
                        || checkIP(dns2, 254) 
                        || checkDnsIp(netmask, ipAddr, dns2) /*here need to changes to lan mask and ip!*/) {
                        msg += window.top.mlang['SWPE09'];
                    }
                }
            }
            else if (wanType == "pptp" || wanType == "pppoe" || wanType == "l2tp") {
                //validate dns1
                if ((!$("#dns1-ip").validateIp())
                || checkIP(dns1, 254)) {
                    msg += window.top.mlang['SWPE08'];
                }

                //validate dns2; only if dns2 is filled in and complete,
                if ($("#dns2-ip").isEmptyIp() == false) {                    
                    if ((!$("#dns2-ip").validateIp())
                        || checkIP(dns2, 254) ) {
                        msg += window.top.mlang['SWPE09'];
                    }
                }
            }
        
        }

        if (macClone == "user") {
            var obj_mac = $("[name=cloneMac]");
            if( (!$("[name=cloneMac]").inputmask("isComplete")) || checkMacStr(obj_mac.get(0))) {
                msg+= window.top.mlang["AAWE06"];
            }
        }
        
        if (msg.length > 1) {
            alert(msg);
            return false;
        }
        
        return true;
    }
    
    function init_dnsType()
    {
        onChange_dnsType()
    }
    
    function init_macClone()
    {
        onChange_macClone();
    }
    
    function onChange_dnsType()
    {
        var dnsType = $('[name=dnsType]:checked').val();

        if ($("input[name=circleActivationStatus]").val() == "provisioned")
        {
            $('#dns-section :input').attr('readonly', true );
        }
        else
        {
            if (dnsType == "dynamic") {
                $('#dns-section :input').attr('readonly', true );
            }
            else if (dnsType == "fixed") {
                $('#dns-section :input').attr('readonly', false );
            }
        }
    }
    
    function onChange_macClone()
    {
        var macClone = $('[name=macClone]:checked').val();
        
        if (macClone == "default") {
            $('[name=cloneMac]').attr('readonly', true );
            $('[name=cloneMac]').val($('[name=wan_hwaddr_default]').val());
        }
        else if (macClone == "pc") {
            $('[name=cloneMac]').attr('readonly', true );
            $('[name=cloneMac]').val($('[name=wan_hwaddr_client]').val());
        }
        else if (macClone == "user") {
            $('[name=cloneMac]').attr('readonly', false );
            $('[name=cloneMac]').val($('[name=wan_hwaddr_user]').val());
        }
    }
/* internet common section  <-------------------------------------End */
