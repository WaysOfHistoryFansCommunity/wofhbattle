LuaS 

xV           (w@ĸC  local command = getParameter("command")
if command == "createUnits" then
	createUnitsCommand(getParameter("data"))
	--report back
	local json = {
		type = "report",
		rid = getParameter("rid")
	}
	root.sendDataToServer = toJson(json)
elseif command == "tacticsInit" then
	tacticsInit(getParameter("data"))
end
             @ A@  $ @  FĀ@  @ Á  Ī  d@  K  JÁ @ ÁĀ Ī J B ÆB   ä ĀĀB  FĀB  @ Á  Ī  d@  &     getParametercommandcreateUnitscreateUnitsCommanddatatypereportridrootsendDataToServertoJsontacticsInit                                                           	   	   	   	   	   	   
   
                        command      json         _ENV