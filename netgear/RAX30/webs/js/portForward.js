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
        
        if (parseInt(ip[3]) == 0 || parseInt(ip[3]) == 255) {
            return false;
        }
        
        return true;
    }
    
    function show_PortForwardRule_form()
    {
        $("#main_page").hide();
        $("#target_PortForwardRule").show();
    }
    
    function show_PortTriggerRule_form()
    {
        $("#main_page").hide();
        $("#target_PortTriggerRule").show();
    }
    
    function check_forwardRule_Ports(externalPortRanges, internalPortRanges)
    {
        /* check input port number is empty or not*/
        if (externalPortRanges == "") {
            return 1;
        }
        if (internalPortRanges == "") {
            return 2;
        }
        
        var externalPortRange_array = externalPortRanges.split(',');
        var internalPortRange_array = internalPortRanges.split(',');
        
        /* check if the the amount of the mapping ports bewteen external ports and internal ports is same amount.
           First, check if the amount of multiple port ragnes are same in external ports and internal ports. 
           So check if the array element size are same*/
        if (externalPortRange_array.length != internalPortRange_array.length) {
            return 3;
        }
        
        /* check if the port numbers in each single port range are in range */
        var i;
        for (i = 0; i < externalPortRange_array.length; i++)
        {
            var ret = check_forwardRule_Ports_isInRange(externalPortRange_array[i], internalPortRange_array[i]);
            if (ret != 0) {
                return ret;
            }
        }
        
        /* check if the the amount of the mapping ports bewteen external ports and internal ports is same amount.
           Second, check if the port amount in each single port range are same in external ports and internal ports */ 
        for (i = 0; i < externalPortRange_array.length; i++)
        {
            var ret = check_forwardRule_Ports_isSameAmount(externalPortRange_array[i], internalPortRange_array[i]);
            if (ret != 0) {
                return ret;
            }
        }
        
        return 0;
    }

    function check_forwardRule_Ports_isInRange(externalPortRange, internalPortRange)
    {
        /* check input string is number or not */
        /* check input port number is in range */
        /* check if start port < end port */
        var externalPort = externalPortRange.split('-');
        if (externalPort.length == 1 ) {
            if (isNumStr(externalPort[0]) == false) {
                return 1;
            }
            
            if (parseInt(externalPort[0]) < 1 || parseInt(externalPort[0]) > 65534) {
                return 1;
            }
        }
        else if (externalPort.length == 2) {
            if (isNumStr(externalPort[0]) == false || isNumStr(externalPort[1]) == false) {
                return 1;
            }
            
            if (parseInt(externalPort[0]) < 1 || parseInt(externalPort[0]) > 65534 ||
                parseInt(externalPort[1]) < 1 || parseInt(externalPort[1]) > 65534) {
                return 1;
            }
            //Steven marked for TT#1045, it's already transferred in rut2_iptables.c +719
            /*
            if (parseInt(externalPort[0]) > parseInt(externalPort[1])) {
                return 1;
            }
            */
        }
        else {
            //externalPort.length == 0 or externalPort.length > 2
            return 1;
        }
        
        var internalPort = internalPortRange.split('-');
        
        if (internalPort.length == 1 ) {
            if (isNumStr(internalPort[0]) == false) {
                return 2;
            }
            
            if (parseInt(internalPort[0]) < 1 || parseInt(internalPort[0]) > 65534) {
                return 2;
            }
        }
        else if (internalPort.length == 2) {
            if (isNumStr(internalPort[0]) == false || isNumStr(internalPort[1]) == false)
            {
                return 2;   
            }
            
            if (parseInt(internalPort[0]) < 1 || parseInt(internalPort[0]) > 65534 ||
                parseInt(internalPort[1]) < 1 || parseInt(internalPort[1]) > 65534) {
                return 2;
            }
            //Steven marked for TT#1045, it's already transferred in rut2_iptables.c +758
            /*
            if (parseInt(internalPort[0]) > parseInt(internalPort[1])) {
                return 2;
            }
            */
        }
        else {
            return 2;
        }
        
        return 0;
    }
    
    function check_forwardRule_Ports_isSameAmount(externalPortRange, internalPortRange)
    {
        var externalPort = externalPortRange.split('-');
        var internalPort = internalPortRange.split('-');
        
        /* check if the the amount of the mapping ports bewteen external ports and internal ports is same amount.
           for example, external port is 80 to 90 which are 10 ports used for forward mapping, then the internal port must be 10 ports too, such as 100 to 110 */
        /* single port situation */
        if (externalPort.length == 2 && internalPort.length == 1) {
            /* make sure externalPort is single port */
            if (externalPort[0] != externalPort[1]) {
                return 3;
            }
        }
        if (externalPort.length == 1 && internalPort.length == 2) {
            /* make sure internalPort is single port */
            if (internalPort[0] != internalPort[1]) {
                return 3;
            }
        }
        /* multiple port situation */
        if (externalPort.length == 2 && internalPort.length == 2) {
            /* make sure the amount of the ports for frowarding mapping is identical */
            var amount_externalPort = parseInt(externalPort[1]) - parseInt(externalPort[0]);
            var amount_internalPort = parseInt(internalPort[1]) - parseInt(internalPort[0]);
            if (amount_externalPort != amount_internalPort ) {
                return 3;
            }
        }

        return 0;
    }
    
    function is_duplicateFwdRuleName(sel_fwd_index, action, serviceName)
    {
        var table = document.getElementById("pf_record");
        var rows = table.getElementsByTagName("tr");
        var i;
        var tmpName;
        var duplicateIndex;
        var isDuplicate = false;
        
        for (i = 1; i < rows.length; i++)
        {
            tmpName = rows[i].getElementsByTagName("td")[2].getElementsByTagName("span")[0].innerHTML;
            if (tmpName == serviceName) {
                isDuplicate = true;
                duplicateIndex = rows[i].getElementsByTagName("td")[6].innerHTML;
                break;
            }
        }
        
        if (isDuplicate == true) {
            /* Editting a rule with not changging its name is not a duplicate case */
            if (action == "edit" && sel_fwd_index == duplicateIndex) {
                isDuplicate = false;
            }
        }
        
        return isDuplicate;
    }
    
    function is_duplicateTgrRuleName(sel_tgr_index, action, serviceName)
    {
        var table = document.getElementById("pt_record");
        var rows = table.getElementsByTagName("tr");
        var i;
        var tmpName;
        var duplicateIndex;
        var isDuplicate = false;
        
        for (i = 1; i < rows.length; i++)
        {
            tmpName = rows[i].getElementsByTagName("td")[3].getElementsByTagName("span")[0].innerHTML;
            if (tmpName == serviceName) {
                isDuplicate = true;
                duplicateIndex = rows[i].getElementsByTagName("td")[7].innerHTML;
                break;
            }
        }
        
        if (isDuplicate == true) {
            /* Editting a rule with not changging its name is not a duplicate case */
            if (action == "edit" && sel_tgr_index == duplicateIndex) {
                isDuplicate = false;
            }
        }
        
        return isDuplicate;
    }
    
    function is_conflictFwdPort(sel_fwd_index, action, externalPortRanges, internalPortRanges, protocol, serverIpAddr)
    {
        var externalPortRange_array = externalPortRanges.split(',');
        var internalPortRange_array = internalPortRanges.split(',');
        
        var table = document.getElementById("pf_record");
        var rows = table.getElementsByTagName("tr");
        var i;
        var tmpExtPortRanges;
        var tmpIntPortRanges;

        var isConflict = false;
        var conflict_state;
        
        for (i = 1; i < rows.length; i++)
        {
            tmpExtPortRanges = rows[i].getElementsByTagName("td")[3].getElementsByTagName("span")[0].innerHTML.split(',');
            tmpIntPortRanges = rows[i].getElementsByTagName("td")[4].getElementsByTagName("span")[0].innerHTML.split(',');
            
            /* check if port range is conflict */
            conflict_state = is_conflict_MultiFwdPortRanges(externalPortRange_array, internalPortRange_array, tmpExtPortRanges, tmpIntPortRanges);
            if (conflict_state == "extPort_conflict" || conflict_state == "intPort_conflict") {
                isConflict = true;
            }
            else {  //conflict_state == "no_conflict"
                isConflict = false;
            }
            
            /* handle conflict exception case */
            if (isConflict == true) {
                var conflictIndex = rows[i].getElementsByTagName("td")[6].innerHTML;
                var conflictProtocol = rows[i].getElementsByTagName("td")[7].innerHTML;
                var conflictIP = rows[i].getElementsByTagName("td")[5].innerHTML;
            
                /* Editting a rule with not changging its port is not a conflict case */
                if (action == "edit" && sel_fwd_index == conflictIndex) {
                    isConflict = false;
                }

                /* Different protocol rule with the overlap port range is not a conclifct case */              
                if (protocol != "TCP_UDP" && conflictProtocol != "TCP_UDP" && protocol != conflictProtocol) {
                    isConflict = false;
                }
                
                /* Internal port conflict occurs on the different LAN clients is not a conflict case. 
                   (Different LAN clients would have different IP). */
                if (conflict_state == "intPort_conflict" && conflictIP != serverIpAddr) {
                    isConflict = false;
                }
            }
            
            /* if no conflict detected, continue the loop util all rules in table are verified */
            if (isConflict == true) {
                break;
            }
        }
        
        return isConflict;
    }
    
    function is_conflict_MultiFwdPortRanges(externalPortRanges, internalPortRanges, tmpExtPortRanges, tmpIntPortRanges)
    {
        var i;
        var j;
        var conflict_state;
        
        for (i = 0; i < externalPortRanges.length ; i++)
        {
            var extPort = externalPortRanges[i].split('-');
            var intPort = internalPortRanges[i].split('-');
            
            for (j = 0; j < tmpExtPortRanges.length ; j++)
            {
                var tmpExtPort = tmpExtPortRanges[j].split('-');
                var tmpIntPort = tmpIntPortRanges[j].split('-');
                
                /* check if port range is conflict */
                conflict_state = is_conflictFwdPortRange(extPort, intPort, tmpExtPort, tmpIntPort);
                if (conflict_state == "extPort_conflict" || conflict_state == "intPort_conflict") {
                    return conflict_state;
                }
            }
        }
        
        return conflict_state; //conflict_state == "no_conflict"
    }
    
    function is_conflictFwdPortRange(extPort, intPort, tmpExtPort, tmpIntPort)
    {
        var extPort_s, extPort_e, intPort_s, intPort_e;
        var tmpExtPort_s, tmpExtPort_e, tmpIntPort_s, tmpIntPort_e;
        var extPortAmount, intPortAmount, tmpExtPortAmount, tmpIntPortAmount;
        
        /* covert port string to start/end port number */
        extPort_s = parseInt(extPort[0]);
        if (extPort.length == 1) {
            extPort_e = parseInt(extPort[0]);
        }
        else {
            extPort_e = parseInt(extPort[1]);
        }
        intPort_s = parseInt(intPort[0]);
        if (intPort.length == 1) {
            intPort_e = parseInt(intPort[0])
        }
        else {
            intPort_e = parseInt(intPort[1])
        }
        tmpExtPort_s = parseInt(tmpExtPort[0]);
        if (tmpExtPort.length == 1) {
            tmpExtPort_e = parseInt(tmpExtPort[0]);
        }
        else {
            tmpExtPort_e = parseInt(tmpExtPort[1]);
        }
        tmpIntPort_s = parseInt(tmpIntPort[0]);
        if (tmpIntPort.length == 1) {
            tmpIntPort_e = parseInt(tmpIntPort[0]);
        }
        else {
            tmpIntPort_e = parseInt(tmpIntPort[1]);
        }
        
        /* get port amount of the port range */
        extPortAmount = extPort_e - extPort_s + 1;
        intPortAmount = intPort_e - intPort_s + 1;
        tmpExtPortAmount = tmpExtPort_e - tmpExtPort_s + 1;
        tmpIntPortAmount = tmpIntPort_e - tmpIntPort_s + 1;
            
        /* check if port range is conflict */
        if (tmpExtPortAmount >= extPortAmount) {
            if (extPort_s >= tmpExtPort_s &&
                extPort_s <= tmpExtPort_e) {
                return "extPort_conflict";
            }
            if (extPort_e >= tmpExtPort_s &&
                extPort_e <= tmpExtPort_e) {
                return "extPort_conflict";
            }
        }
                
        if (tmpExtPortAmount <= extPortAmount) {
            if (tmpExtPort_s >= extPort_s &&
                tmpExtPort_s <= extPort_e) {
                return "extPort_conflict";
            }
            if (tmpExtPort_e >= extPort_s &&
                tmpExtPort_e <= extPort_e) {
                return "extPort_conflict";
            }
        }

        if (tmpIntPortAmount >= intPortAmount) {
            if (intPort_s >= tmpIntPort_s &&
                intPort_s <= tmpIntPort_e) {
                return "intPort_conflict";
            }
            if (intPort_e >= tmpIntPort_s &&
                intPort_e <= tmpIntPort_e) {
                return "intPort_conflict";
            }
        } 
        if (tmpIntPortAmount <= intPortAmount) {
            if (tmpIntPort_s >= intPort_s &&
                tmpIntPort_s <= intPort_e) {
                return "intPort_conflict";
            }
            if (tmpIntPort_e >= intPort_s &&
                tmpIntPort_e <= intPort_e) {
                return "intPort_conflict";
            }
        }
        
        return "no_conflict";
    }
    
    function is_conflictTgrPort(sel_tgr_index, action, triggeringPort, protocol)
    {
        var table = document.getElementById("pt_record");
        var rows = table.getElementsByTagName("tr");
        var i;
        var conflictIndex;
        var conflictProtocol;
        var isConflict = false;
        
        for (i = 1; i < rows.length; i++)
        {
            tmpTriggerPort = rows[i].getElementsByTagName("td")[9].innerHTML;
            
            /* check if port is conflict */
            if (parseInt(triggeringPort) == parseInt(tmpTriggerPort)) {
                isConflict = true;
            }
            
            /* handle conflict exception case */
            if (isConflict == true) {
                conflictIndex = rows[i].getElementsByTagName("td")[7].innerHTML;
                conflictProtocol = rows[i].getElementsByTagName("td")[8].innerHTML;
                
                /* Editting a rule with not changging its port is not a conflict case */
                if (action == "edit" && sel_tgr_index == conflictIndex) {
                    isConflict = false;
                }
                
                /* Different protocol rule with the same port is not a conclifct case */  
                if (protocol != conflictProtocol) {
                    isConflict = false;
                }
            }
            
            /* if no conflict detected, continue the loop util all rules in table are verified */
            if (isConflict == true) {
                break;
            }
        }
        
        return isConflict;
    }
    
    function is_conflictInboundPort(sel_tgr_index, action, inStartPort, inEndPort, inConnType)
    {
        var table = document.getElementById("pt_record");
        var rows = table.getElementsByTagName("tr");
        var i;
        var conflictIndex;
        var conflictProtocol;
        var isConflict = false;
        
        for (i = 1; i < rows.length; i++)
        {
            tmpInStartPort = rows[i].getElementsByTagName("td")[11].innerHTML;
            tmpInEndPort = rows[i].getElementsByTagName("td")[12].innerHTML;
            
            /* check if port is conflict */
            if (is_conflictInboundPortRange(inStartPort, inEndPort, tmpInStartPort, tmpInEndPort) == true) {
                isConflict = true;
            }
            
            /* handle conflict exception case */
            if (isConflict == true) {
                conflictIndex = rows[i].getElementsByTagName("td")[7].innerHTML;
                conflictProtocol = rows[i].getElementsByTagName("td")[10].innerHTML;
                
                /* Editting a rule with not changging its port is not a conflict case */
                if (action == "edit" && sel_tgr_index == conflictIndex) {
                    isConflict = false;
                }
                
                /* Different protocol rule with the overlap port range is not a conclifct case  */
                if (inConnType != "TCP_UDP" && conflictProtocol != "TCP_UDP" && inConnType != conflictProtocol) {
                    isConflict = false;
                }
            }
            
            /* if no conflict detected, continue the loop util all rules in table are verified */
            if (isConflict == true) {
                break;
            }
        }
        
        return isConflict;
    }
    
    function is_conflictInboundPortRange(inStartPort, inEndPort, tmpInStartPort, tmpInEndPort)
    {
        /* covert port string to start/end port number */
        var inboundPort_s = parseInt(inStartPort);
        var inboundPort_e = parseInt(inEndPort);
        var tmpInboundPort_s = parseInt(tmpInStartPort);
        var tmpInboundPort_e = parseInt(tmpInEndPort);

        var inboundPortAmount, tmpInboundPortAmount;
        
        /* get port amount of the port range */
        inboundPortAmount = inboundPort_e - inboundPort_s + 1;
        tmpInboundPortAmount = tmpInboundPort_e - tmpInboundPort_s + 1;
            
        /* check if port range is conflict */
        if (tmpInboundPortAmount >= inboundPortAmount) {
            if (inboundPort_s >= tmpInboundPort_s &&
                inboundPort_s <= tmpInboundPort_e) {
                return true;
            }
            if (inboundPort_e >= tmpInboundPort_s &&
                inboundPort_e <= tmpInboundPort_e) {
                return true;
            }
        }
                
        if (tmpInboundPortAmount <= inboundPortAmount) {
            if (tmpInboundPort_s >= inboundPort_s &&
                tmpInboundPort_s <= inboundPort_e) {
                return true;
            }
            if (tmpInboundPort_e >= inboundPort_s &&
                tmpInboundPort_e <= inboundPort_e) {
                return true;
            }
        }
        
        return false;
    }
    
    function get_iids_enabledTgrRules()
    {
        var enabled_iids = [];
        var table = document.getElementById("pt_record");
        var rows = table.getElementsByTagName("tr");
        var i;
        var tmpEnable;
        var tmpIndex;
        
        for (i = 1; i < rows.length; i++)
        {
            //tmpEnable = rows[i].getElementsByTagName("td")[13].innerHTML;
            tmpEnable = rows[i].getElementsByTagName("td")[2].getElementsByTagName("input")[0].checked;
            tmpIndex = rows[i].getElementsByTagName("td")[7].innerHTML;
            
            /* add enabled iid into array */
            if (tmpEnable == true) {
                enabled_iids.push(tmpIndex);
            }
        }
        
        return enabled_iids;
    }
    
    function get_iids_disabledTgrRules()
    {
        var disabled_iids = [];
        var table = document.getElementById("pt_record");
        var rows = table.getElementsByTagName("tr");
        var i;
        var tmpEnable;
        var tmpIndex;
        
        for (i = 1; i < rows.length; i++)
        {
            tmpEnable = rows[i].getElementsByTagName("td")[2].getElementsByTagName("input")[0].checked;
            tmpIndex = rows[i].getElementsByTagName("td")[7].innerHTML;
            
            
            /* add enabled iid into array */
            if (tmpEnable == false) {
                disabled_iids.push(tmpIndex);
            }
        }
        
        return disabled_iids;
    }
