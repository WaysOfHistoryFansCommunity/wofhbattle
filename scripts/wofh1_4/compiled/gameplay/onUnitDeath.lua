LuaS 

xV           (w@ÿ  local instance = getParameter("instanceId")
local killerInstance = getParameter("killerInstance")
local unitType = getParameter("unitType")

local town = unitsTown[instance]
if town == nil then return end

decUnitCounterArmy(town, unitType)

local killerTown = unitsTown[killerInstance]
if killerTown == nil then return end

if killerInstance >= 9 then
	addUnitCounterKill(killerTown, unitType)
end
             @ A@  $ F @   d  @ ÁÀ  ¤ Æ A Ç @Á  &  A @ $AA A @A  &  !@À FB  À dA&  	   getParameterinstanceIdkillerInstance	unitType
unitsTown decUnitCounterArmy	       addUnitCounterKill                                                                 
   
                                    	instance      killerInstance      	unitType	      town      killerTown         _ENV