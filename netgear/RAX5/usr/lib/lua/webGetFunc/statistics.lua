-- Get functions for system info
local M = {}

--local json = require "luci.json"
local ubus = require "ubus"
local netUtils = require "commonFunc.netUtils"
local uci_st  = require "luci.model.uci".cursor_state(nil, "/var/state")

--// The Save Function
function tableSave(tbl,filename )

   local function exportstring( s )
      return string.format("%q", s)
   end

  local charS,charE = "   ","\n"
  local file,err = io.open( filename, "wb" )
  if err then return err end

  -- initiate variables for save procedure
  local tables,lookup = { tbl },{ [tbl] = 1 }
  file:write( "return {"..charE )

  for idx,t in ipairs( tables ) do
     file:write( "-- Table: {"..idx.."}"..charE )
     file:write( "{"..charE )
     local thandled = {}

     for i,v in ipairs( t ) do
        thandled[i] = true
        local stype = type( v )
        -- only handle value
        if stype == "table" then
           if not lookup[v] then
              table.insert( tables, v )
              lookup[v] = #tables
           end
           file:write( charS.."{"..lookup[v].."},"..charE )
        elseif stype == "string" then
           file:write(  charS..exportstring( v )..","..charE )
        elseif stype == "number" then
           file:write(  charS..tostring( v )..","..charE )
        end
     end

     for i,v in pairs( t ) do
        -- escape handled values
        if (not thandled[i]) then

           local str = ""
           local stype = type( i )
           -- handle index
           if stype == "table" then
              if not lookup[i] then
                 table.insert( tables,i )
                 lookup[i] = #tables
              end
              str = charS.."[{"..lookup[i].."}]="
           elseif stype == "string" then
              str = charS.."["..exportstring( i ).."]="
           elseif stype == "number" then
              str = charS.."["..tostring( i ).."]="
           end

           if str ~= "" then
              stype = type( v )
              -- handle value
              if stype == "table" then
                 if not lookup[v] then
                    table.insert( tables,v )
                    lookup[v] = #tables
                 end
                 file:write( str.."{"..lookup[v].."},"..charE )
              elseif stype == "string" then
                 file:write( str..exportstring( v )..","..charE )
              elseif stype == "number" then
                 file:write( str..tostring( v )..","..charE )
              end
           end
        end
     end
     file:write( "},"..charE )
  end
  file:write( "}" )
  file:flush()
  file:close()
end

--// The Load Function
function tableLoad( sfile )
  local ftables,err = loadfile( sfile )
  if err then return _,err end
  local tables = ftables()
  for idx = 1,#tables do
     local tolinki = {}
     for i,v in pairs( tables[idx] ) do
        if type( v ) == "table" then
           tables[idx][i] = tables[v[1]]
        end
        if type( i ) == "table" and tables[i[1]] then
           table.insert( tolinki,{ i,tables[i[1]] } )
        end
     end
     -- link indices
     for _,v in ipairs( tolinki ) do
        tables[idx][v[2]],tables[idx][v[1]] =  tables[idx][v[1]],nil
     end
  end
  return tables[1]
end

function convertUpTime(seconds)

	-- hours
	local hours = math.floor(seconds/3600)
	local remaining = seconds%3600
	-- minutes
	local minutes = math.floor(remaining/60)
	-- seconds
	local seconds = remaining%60
	return hours..":".. minutes..":"..seconds
end

function M.getSysUpTime()

	local sysinfo = ubusCall("system", "info", {}) or { }
	local time = sysinfo.uptime or 0

	-- days
	local days = math.floor(time/86400)
	local remaining = time%86400
	-- hours
	local hours = math.floor(remaining/3600)
	remaining = remaining%3600
	-- minutes
	local minutes = math.floor(remaining/60)
	-- seconds
	local seconds = remaining%60
	return days.." Days "..hours..":".. minutes..":"..seconds
end

--function trim (s) return (string.gsub(s, "^%s*(.-)%s*$", "%1")) end

function str_split(str, delimiter)
	local result = {}
	string.gsub(str, '[^'..delimiter..']+', function(token) table.insert(result, token) end )
	return result
end

function fetchTime(str)

	local headIdx = str:find("%[") + 1
	local tailIdx = str:find("%]") - 1
	local time = str_split(str:sub(headIdx, tailIdx), ".")
	return time[1]
end

function file_exists(name)
   local f=io.open(name,"r")
   if f~=nil then io.close(f) return true else return false end
end

function getKeyValueFromSwConfig(line)

	local str
	local result

	line = line:gsub("%s","")
	result = str_split(line, ":")

	return result[2]
end

function getCmdLastLine(cmd)
	local handle = io.popen(cmd, 'r')
	local lastLine
	for line in handle:lines() do
		lastLine = line
	end
	handle:close()

	return lastLine
end

function getCmdString(cmd)
	local handle = io.popen(cmd, 'r')
	local result = handle:read("*a")
	handle:close()
	return result:gsub("\n","")
end

function findWholeWord(str, key)

	if str:find("%f[%a]"..key.."%f[%A]") then
		return true
	else
		return false
	end
end

function ubusCall(path, method, arg)

	-- connect ubus server
	local conn = ubus.connect()
	if not conn then
		error("Failed to connect to ubusd")
	end

	local data = conn:call(path, method, arg)
	conn:close()

	return data
end

function M.getInterfaceStatistics()

	local tmpTable = {
		{["portIndex"] = 0, ["portIface"] = "eth1",   ["portName"] = "WAN" },
		{["portIndex"] = 1, ["portIface"] = "br-lan", ["portName"] = "LAN1" },
		{["portIndex"] = 2, ["portIface"] = "br-lan", ["portName"] = "LAN2" },
		{["portIndex"] = 3, ["portIface"] = "br-lan", ["portName"] = "LAN3" },
		{["portIndex"] = 4, ["portIface"] = "br-lan", ["portName"] = "LAN4" },
		{["portIndex"] = 5, ["portIface"] = "ra0",    ["portName"] = "2.4G WLAN b/g/n/ax" },
		{["portIndex"] = 6, ["portIface"] = "rax0",   ["portName"] = "5G WLAN a/n/ac/ax" }
	}

	local pktData = {}	-- ex JSON: {["WAN"] = {["prevTxByte"] = 1, ["prevRxByte"] = 0, ["prevTimestamp"] = 0}
	local prevPktData
	local data = {}
	local cmdStr, idx, info
	local portName, status, txPkts, rxPkts, collision, txRate, rxRate, upTime = "Unknown", "Link:Down", "--", "--", "--", "--", "--", "--"
	local index, speed, duplex, linkuptime, isUp = 0, "", "", 0, false
	local handle
	local sysinfo = ubusCall("system", "info", {}) or { }
	local sysUptime = tonumber(sysinfo.uptime) or 0
	local curTime = tonumber(sysinfo.localtime) or 0
	local tmp1, tmp2
	local pktPath = "/var/state/pktData"
	local tmpResult = {}

	if file_exists(pktPath) then
		prevPktData = tableLoad(pktPath) or {}
	end

	for idx, info in pairs(tmpTable) do

		-- Initial all paramter
		portName, status, txPkts, rxPkts, collision, txRate, rxRate, upTime = "Unknown", "Link:Down", "--", "--", "--", "--", "--", "--"
		index, speed, duplex, linkuptime, isUp = 0, "", "", 0, false
		-- __portName
		portName = info["portName"]

		if info["portIface"] == "eth1" or info["portIface"] == "br-lan" then
			index = info["portIndex"]
			cmdStr = "uci -c /var/state get portstate.state.port"..index.."_action"
			tmpLine = getCmdString(cmdStr)
			if tmpLine:find("linkup") then
				isUp = true
				cmdStr = "uci -c /var/state get portstate.state.port"..index.."_speed"
				speed = getCmdString(cmdStr)
				cmdStr = "uci -c /var/state get portstate.state.port"..index.."_duplex"
				duplex = getCmdString(cmdStr)
				cmdStr = "uci -c /var/state get portstate.state.port"..index.."_linkuptime"
				linkuptime = getCmdString(cmdStr)
				linkuptime = tonumber(linkuptime)
				status = speed.."/"..duplex
				upTime = convertUpTime(sysUptime - linkuptime)
			end

		else
			local bssidx = 0
			if info["portIface"] == "rax0" then
				bssidx = 2
			end
			-- cmdStr = dmesg | grep 'wifi_sys_*' | grep 'wdev idx = 1'
			cmdStr = "dmesg | grep 'wifi_sys_*'".." | grep 'wdev idx = "..bssidx.."'"
			tmpLine = getCmdLastLine(cmdStr)
			if tmpLine == nil or tmpLine:find("wifi_sys_linkup") == nil then
				status = "link:down"
				txPkts = "--"
				collision = "--"
				rxPkts = "--"
				upTime = "--:--:--"
				txRate = "--"
				rxRate = "--"
			else
				linkUpTime = 0
				linkUpTime = fetchTime(tmpLine)
				upTime = convertUpTime(sysUptime - linkUpTime)
				isUp = true
				status = "Up"
				-- cmdStr = dmesg | grep 'ra0'
				cmdStr = "iwconfig "..info["portIface"]
				local iwHandle = io.popen(cmdStr, "r")
				for iwLine in iwHandle:lines() do
					if iwLine:find("Bit Rate") then
						tmpResult = str_split(iwLine, "=")
						status = tmpResult[2]
						--tmp1 = str_split(tmpResult[3], ".")
						--status = tmp1[1].."M"
					end
				end
				iwHandle:close()
			end
		end

		-- Pkt collection
		local txUni, txMulti, txBroad, txCollision, txByte = 0, 0, 0, 0, 0
		local rxUni, rxMulti, rxBroad, rxByte = 0, 0, 0, 0
		if isUp == true then
			-- __txPkt, __rxPkt, __collision
			cmdStr = "swconfig dev switch0 port "..info["portIndex"].." show"
			local swhandle = io.popen(cmdStr)
			for line in swhandle:lines() do
				if findWholeWord(line, "TxUni") then
					txUni = tonumber(getKeyValueFromSwConfig(line))
				elseif findWholeWord(line, "TxMulti") then
					txMulti = tonumber(getKeyValueFromSwConfig(line))
				elseif findWholeWord(line, "TxBroad") then
					txBroad = tonumber(getKeyValueFromSwConfig(line))
				elseif findWholeWord(line, "TxCollision") then
					txCollision = tonumber(getKeyValueFromSwConfig(line))
				elseif findWholeWord(line, "TxByte") then
					txByte = tonumber(getKeyValueFromSwConfig(line))
				elseif findWholeWord(line, "RxUni") then
					rxUni = tonumber(getKeyValueFromSwConfig(line))
				elseif findWholeWord(line, "RxMulti") then
					rxMulti = tonumber(getKeyValueFromSwConfig(line))
				elseif findWholeWord(line, "RxBroad") then
					rxBroad = tonumber(getKeyValueFromSwConfig(line))
				elseif findWholeWord(line, "RxByte") then
					rxByte = tonumber(getKeyValueFromSwConfig(line))
				end
			end
			swhandle:close()
			txPkts = txUni + txMulti + txBroad
			rxPkts = rxUni + rxMulti + rxBroad
			collision = txCollision
			-- __txPkt, __rxPkt
			local prevTxByte = 0
			local prevRxByte = 0
			local prevTime = 0
			if prevPktData ~= nil then
				prevTxByte = tonumber(prevPktData[idx]['prevTxByte']) or 0
				prevRxByte = tonumber(prevPktData[idx]['prevRxByte']) or 0
				prevTime = tonumber(prevPktData[idx]['prevTimestamp']) or 0
			end
			local diffTxByte = txByte - prevTxByte
			local diffRxByte = rxByte - prevRxByte
			local diffTime = curTime - prevTime
			if diffTime <= 0 then
				txRate = 0
				rxRate = 0
			else
				txRate = math.floor(diffTxByte/diffTime)
				rxRate = math.floor(diffRxByte/diffTime)
			end
		end

		table.insert(data, {["__portName"] = portName, ["__ifStatus"]=status, ["__txPkt"]=txPkts,  ["__rxPkt"]=rxPkts, ["__collision"]=collision, ["__txBps"]=txRate, ["__rxBps"]=rxRate, ["__upTime"]=upTime})
		table.insert(pktData, {["portName"] = portName, ["prevTxByte"] = txByte, ["prevRxByte"] = rxByte, ["prevTimestamp"] = curTime})
	end

	tableSave(pktData, pktPath)
	return data
end

return M
