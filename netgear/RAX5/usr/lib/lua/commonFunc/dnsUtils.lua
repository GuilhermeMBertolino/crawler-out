local log = require"luci.log"


function file_exists(path)
   local f=io.open(path,"r")
   if f~=nil then 
      io.close(f) 
      return true 
   else 
      return false 
   end
end

function readContent(file)
    local f = assert(io.open(file, "rb"))
    local content = f:read("*all")
    f:close()
    return content
end

local M = {} 

function M.getDNS(purpose)

    local file_path = "/tmp/resolv.conf.auto"
    
    if file_exists(file_path) then
        log.console("DNS config exist!")
        local dns ={}
        for i in readContent(file_path):gmatch("nameserver (%d+%.%d+%.%d+%.%d+)[\n]") do
            dns[#dns + 1] = i
        end
        
        --log.console_r(dns)
        if purpose == "dnsmasq" then
            return dns[1]
        elseif purpose == "test" then
            log.console("DNS1:"..tostring(dns[1]))
            log.console("DNS2:"..tostring(dns[2]))
        end
        
        return ""
    else
        log.force("DNS config not found!")
        return ""
    end

end

return M
