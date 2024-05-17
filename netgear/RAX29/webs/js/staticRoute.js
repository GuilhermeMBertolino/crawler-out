
    
    function show_RouteRule_form()
    {
        $("#main_page").hide();
        $("#target_RouteRule").show();
    }
    
    function is_duplicateRouteRuleName(sel_route_index, action, routeName)
    {
        var table = document.getElementById("static_route");
        var rows = table.getElementsByTagName("tr");
        var i;
        var tmpName;
        var duplicateIndex;
        var isDuplicate = false;
        
        for (i = 1; i < rows.length; i++)
        {
            tmpName = rows[i].getElementsByTagName("td")[3].getElementsByTagName("span")[0].innerHTML;
            if (tmpName == routeName) {
                isDuplicate = true;
                duplicateIndex = rows[i].getElementsByTagName("td")[6].innerHTML;
                break;
            }
        }
        
        if (isDuplicate == true) {
            /* Editting a rule with not changging its name is not a duplicate case */
            if (action == "edit" && sel_route_index == duplicateIndex) {
                isDuplicate = false;
            }
        }
        
        return isDuplicate;
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
        
        return true;
    }
    
    function is_duplicateRouteRule(destIpAddr, subnetMask, action)
    {
        var table = document.getElementById("static_route");
        var rows = table.getElementsByTagName("tr");
        var i;
        var tmpIp, tmpSubnetMask, tmpNetworkAddr;
        var duplicateIndex;
        var isDuplicate = false;
        var networkAddr = toNetworkAddr(destIpAddr, subnetMask);
        
        for (i = 1; i < rows.length; i++)
        {
            tmpIp = rows[i].getElementsByTagName("td")[4].getElementsByTagName("span")[0].innerHTML;
            tmpSubnetMask = rows[i].getElementsByTagName("td")[5].getElementsByTagName("span")[0].innerHTML;
            
            tmpNetworkAddr = toNetworkAddr(tmpIp, tmpSubnetMask);
            if (tmpNetworkAddr == networkAddr) {
                isDuplicate = true;
                duplicateIndex = rows[i].getElementsByTagName("td")[6].innerHTML;
                break;
            }
        }
        
        if (isDuplicate == true) {
            /* The duplicate rule is the rule you are editing is not a duplicate case */
            if (action == "edit" && sel_route_index == duplicateIndex) {
                isDuplicate = false;
            }
        }
        
        return isDuplicate;
    }
    
    function toNetworkAddr(ip, netmask)
    {
        var tmpIp = ip.split('.');
        var numIp = new Array(4);
        var tmpNetmask = netmask.split('.');
        var numNetmask = new Array(4);
        var networkAddr;
        var numNetworkAddr = new Array(4);
        var i;

        for (i = 0; i < 4; i++) 
        {
            numIp[i] = parseInt(tmpIp[i]); 
            numNetmask[i] = parseInt(tmpNetmask[i]);
            numNetworkAddr[i] = numIp[i] & numNetmask[i];
        }
        
        networkAddr = numNetworkAddr[0].toString() + '.' + numNetworkAddr[1].toString() + '.' + numNetworkAddr[2].toString() + '.' + numNetworkAddr[3].toString();
        
        return networkAddr;
    }
    