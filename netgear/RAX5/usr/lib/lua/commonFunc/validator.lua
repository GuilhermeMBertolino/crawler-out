local M = {}

local log    = require "luci.log"
local datatype = require "luci.datatype"

function M.cgi_validator(data_type, data)

    if (data == nil) then
        return false;
    end
    
    return datatype.cgi_validator(data_type, data);
end

local function get_json_val(parm, json)
    local json_value = nil;
    
    --return json value of the specified parameter
    for json_parm , json_parm_value in pairs(json) do
        if (parm == json_parm) then
            json_value = json_parm_value;
            break;
        end
    end
    
    return json_value;
end

function M.post_data_validate(json, maps)
    local ret = true;
    --log.debug(1);
    log.console(tostring(json));
    log.console("Enter data parser...");
    
    for map_parm , map_parm_entry in pairs(maps) do
        -- find maps paramter in json data
        local json_value = get_json_val(map_parm, json);
        if (json_value == nil) then
            -- can not found parameter in json data
            log.console( map_parm .. " can not be found in json data");
            ret = false;
            break;
        end
        
        if (type(json_value) ~= "string") then
            -- can not found parameter in json data
            log.console( "json data \[" ..  map_parm .. ":" .. tostring(json_value) .. "\] is not a string value");
            ret = false;
            break;
        end
        
        -- validate the json data by data_type
        ret = M.cgi_validator(map_parm_entry["data_type"], json_value);
        if (ret == false) then
            log.console( map_parm .. "=" .. tostring(json_value) .. " validate error " .. tostring(ret));
            
            -- if data_type validation fail, validate again by handler function
            if (map_parm_entry["handler"] ~= nil ) then
                local handler = map_parm_entry["handler"];
                
                ret = handler(map_parm, json_value,json);
                if (ret == false) then
                    log.console( map_parm .. "=" .. tostring(json_value) .. "  post validate error " .. tostring(ret));
                    break;
                end
            else
                break;
            end
        end
    end
    
    if (ret == false) then
        log.console("Failed to parse the input JSON data!!!");
    end
    
    log.console("Exit data parser...");
    return ret;
end

function M.soap_data_validate(inputParameters, maps)
    local ret = true;
    
    for map_parm , map_parm_entry in pairs(maps) do
        if (type(inputParameters[map_parm]) ~= "string") then
            -- can not found parameter value
            log.console( "Input parameter ["..map_parm.."] is invalid" );
            ret = false;
            break;
        end
        
        -- validate the parameter by data_type
        ret = M.cgi_validator(map_parm_entry["data_type"], inputParameters[map_parm]);
        if (ret == false) then
            -- if data_type validation fail, validate again by handler function
            if (map_parm_entry["handler"] ~= nil ) then
                local handler = map_parm_entry["handler"];
                
                ret = handler(map_parm, inputParameters[map_parm], inputParameters);
                if (ret == false) then
                    log.console( map_parm .. "=" .. inputParameters[map_parm] .. "  parameter validate error " .. tostring(ret));
                    break;
                end
            else
                break;
            end
        end
    end
    
    if (ret == false) then
        log.console("Validation result is invalid");
    end
    
    log.console("Exit validator..."..tostring(ret));
    return ret;
end

return M
