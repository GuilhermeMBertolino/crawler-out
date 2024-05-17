<?
include_once 'common_utils.php';

function getStaticRouteTable()
{
    $db_path = "Device.Routing.Router.1.IPv4Forwarding";
    $json = db_getObj($db_path);
    if($json === FALSE)
    {
        return ;  
    }

    $data = json_decode($json,true);
    if (json_last_error() != JSON_ERROR_NONE) {
        printf("JSON Error: %s", json_last_error_msg());
    }
    $output_value = new stdClass();
    $count = 1;
    foreach($data[$db_path] as $inst)
    {
        /* only show a static route, not a dynamic route. */
        if ($inst["StaticRoute"] != "1") {
            continue;
        }

        /* don't show the default router when WAN is static IP */
        if (strcmp($inst["StaticRouteName"], "") == 0) {
            continue;
        }

        $index = $inst["instanceID"];
        
        if ($inst["Enable"] == "1") {
            $isActive = "true";
            $active = "Yes";
        }
        else if ($inst["Enable"] == "0") {
            $isActive = "false";
            $active = "No";
        }
        
        if ($inst["EnablePrivate"] == "1") {
            $isPrivate = "true";
        }
        else if ($inst["EnablePrivate"] == "0") {
            $isPrivate = "false";
        }
        
        $output_value->{$count} = (object) null;
        $output_value->{$count}->__index = $index;
        $output_value->{$count}->__count = $count;
        $output_value->{$count}->__routeName = htmlentities($inst["StaticRouteName"]);
        $output_value->{$count}->__escapedRouteName = escapeBackslashSinglequote($output_value->{$count}->__routeName);
        $output_value->{$count}->__active = $active;
        $output_value->{$count}->__isActive = $isActive;
        $output_value->{$count}->__isPrivate = $isPrivate;
        $output_value->{$count}->__destIpAddr = $inst["DestIPAddress"];
        $output_value->{$count}->__subnetMask = $inst["DestSubnetMask"];
        $output_value->{$count}->__gateway = $inst["GatewayIPAddress"];
        $output_value->{$count}->__metric = $inst["ForwardingMetric"];
        $count++;
    }
    return $output_value;        
}
?>
