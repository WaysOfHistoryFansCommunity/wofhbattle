LuaS �

xV           (w@��  local time = root.time
if time % 1000 ~= 0 then return end

local storage = root.dataStorage

if storage.winner == "" or storage.winner == nil then
	local gFaction0 = root.faction[0]
	local gFaction1 = root.faction[1]
	
	local hasUnits0 = gFaction0.f_calcUnitsByTags(1048576) > 0
	local hasBuildings0 = gFaction0.f_calcUnitsByTags(2097152) > 0

	local hasUnits1 = gFaction1.f_calcUnitsByTags(1048576) > 0
	local hasBuildings1 = gFaction1.f_calcUnitsByTags(2097152) > 0

	if not hasBuildings1 then
		setWinner(0)
	elseif not hasBuildings0 then
		setWinner(1)
	else
		if not(hasUnits0 or hasUnits1) then
			local sec = tonumber(storage.noUnitsSec)
			if sec == 0 then
				setWinner(255)
			else
				storage.f_set("noUnitsSec", sec - 1)
			end
		end
	end
end

if time % 10000 == 0 then
	sendStateToServer()
end

if time % 30000 == 1000 then
	createUnitsCommand(root.f_tacticsWork())
end
         [    @ @@ P�@ _��   �& � F @ G � �@� _�A� ��@� �A��� @ � B��@� @ � ��@��BA� $� ` ��  �A  � G�B� d� `@��  �CA  C� ����� �� `���  ��A  �� ǁ� � `���  ��A  �� �A  � �BC A�  $B ��bA  � �BC AB $B  �"A  ���A   ��C G�� $� �@� �FBC � dB � �GB� �� �BBdB���D �@@ ���D �@� � E �@ ��@E � @ ǀ�� � �@  & �    roottime�              dataStoragewinner faction       f_calcUnitsByTags               
setWinner	tonumbernoUnitsSec�       f_set'      sendStateToServer0u      createUnitsCommandf_tacticsWork        [                                                               
   
   
   
   
   
   
                                                                                                                                                                     !   !   $   $   $   %   %   %   %   %   &   	   time   [   storage   [   
gFaction0   M   
gFaction1   M   
hasUnits0   M   hasBuildings0"   M   
hasUnits1)   M   hasBuildings10   M   secC   M      _ENV