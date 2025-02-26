LuaS 

xV           (w@ÿî  --ignore 'pairs' warning

zones = {}

resultData = {members={},result=-1}
unitsTown = {}

zones = {
	{269312,1813504,375000},
	{346624,1832960,375000},
	{235520,1715200,375000},
	{436736,1952256,522},
	{565248,1661952,375000},
	{542720,1533952,375000},
	{666112,1657856,375000},
	{785408,1460224,375000},
	{858624,1415168,375000},
	{1915904,123904,900000},
	{1858048,166400,900000},
	{1559552,321536,900000},
	{1501696,391680,900000},
	{1272832,579584,900000},
	{1280512,682496,900000}
}

function calcBuildings(faction)
	local result = 0
	local units = root.faction[faction].statistics_units
	for i = 110, units.size - 1 do
		result = result + units[i].live
	end
	return result
end

function sendStateToServer()
	local buildings0 = calcBuildings(0)
	local buildings1 = calcBuildings(1)

	local json = {
		type = "state",
		buildings = {buildings0, buildings1},
		statistics = toJson(resultData)
	}
	root.f_sendDataToServer(toJson(json))
end

function calcSpawnPosition(faction)
	local buildings = calcBuildings(faction)
	if buildings == 0 then
		if faction == 0 then
			buildings = 6
		else
			buildings = 3
		end
	end
	
	if faction == 0 then
		if buildings == 6 then return zones[8]
		elseif buildings > 3 then return zones[5]
		else return zones[1]
		end
	else
		if buildings == 3 then return zones[14]
		elseif buildings > 1 then return zones[12]
		else return zones[10]
		end
	end
end

function addUnitCounter(array, unitType)
	assert(array ~= nil)
	if array[unitType] == nil then
		array[unitType] = 1
	else
		array[unitType] = array[unitType] + 1
	end
end

function addUnitCounterArmy(town, unitType)
	if resultData.members[town] == nil then resultData.members[town] = {army={},kills={}} end
	if resultData.members[town].army == nil then resultData.members[town].army = {} end
	if resultData.members[town].kills == nil then resultData.members[town].kills = {} end
	addUnitCounter(resultData.members[town].army, unitType)
end

function decUnitCounterArmy(town, unitType)
	local ar = resultData.members[town].army
	ar[unitType] = ar[unitType] - 1
end

function addUnitCounterKill(town, unitType)
	if resultData.members[town] == nil then resultData.members[town] = {army={},kills={}} end
	if resultData.members[town].army == nil then resultData.members[town].army = {} end
	if resultData.members[town].kills == nil then resultData.members[town].kills = {} end
	addUnitCounter(resultData.members[town].kills, unitType)
end
	
function createUnitsCommand(rawData)
	if rawData == "" then return end
	local unitsCreate = {}
	local data = fromJson(rawData)
	
	for town, faction in pairs(data) do
		if faction.army ~= nil then
			for unit, count in pairs(faction.army) do
				if count <= 0 then return end
				assert(count < 1000)
				local unitType = root.unitType[unit]
				
				local dist = 0
				local weapon = unitType.attack_weapon
				for i = 0, weapon.size - 1 do
					local distanceMax = weapon[i].distanceMax
					if distanceMax > dist then
						dist = distanceMax
					end
				end
				local turret = unitType.attack_turret
				for i = 0, turret.size - 1 do
					local distanceMax = turret[i].weapon[0].distanceMax
					if distanceMax > dist then
						dist = distanceMax
					end
				end

				unitsCreate[#unitsCreate + 1] = {faction.faction, faction.damageBonus, tonumber(unit), count, dist, tonumber(town)}
			end
		end
	end
	
	function sortFunc(a, b)
		if a[5] > b[5] then return true end
		if a[5] < b[5] then return false end
		if a[3] > b[3] then return true end
		if a[3] < b[3] then return false end
		if a[4] > b[4] then return true end
		if a[4] < b[4] then return false end
		if a[6] > b[6] then return true end
		if a[6] < b[6] then return false end
		if a[1] > b[1] then return true end
		if a[1] < b[1] then return false end
		if a[2] > b[2] then return true end
		if a[2] < b[2] then return false end
        return false
	end 
	table.sort(unitsCreate, sortFunc)

	local spawnPositions = {calcSpawnPosition(0), calcSpawnPosition(1)}
	local scene = root.scene[0]
	for _, unitData in ipairs(unitsCreate) do
		for j = 1, unitData[4] do
			local zone = spawnPositions[unitData[1] + 1]
			local unitType = unitData[3]
			local town = unitData[6]
			local unitId = scene.f_createUnits2(unitType, 1, unitData[1], zone[1], zone[2], zone[3], 256, 2, 100000)[1]
			local unit = scene.unit[unitId]
			local instance = unit.instanceId
			unitsTown[instance] = town
			addUnitCounterArmy(town, unitType)
			
			if unitData[2] ~= 100 then
				local researchId = unitData[2] - 85
				assert(researchId >= 0 and researchId <= 75)
				unit.f_addBuff(researchId, 100000000)
			end
		end
	end
end

function createBuilding(faction, index, buildingType)
	local zone = zones[index]
	root.scene[0].f_createUnits2(buildingType, 1, faction, zone[1], zone[2], zone[3])
end

function tacticsInit(rawData)
	if rawData == "" then return end
	local errCode = root.f_tacticsInit(rawData)
	if errCode ~= 0 then
		log("tacticsInit error "..errCode)
	end
end

function setWinner(winner)
	root.dataStorage.f_setIfEmpty("winner", winner)
	sendStateToServer()

	local json = {
		type = "win",
		winner = winner
	}
	root.f_sendDataToServer(toJson(json))
	
	root.f_finish()
end
         n          K   
@ 
 Á      K  ÁÀ  k@ Á@  A «@Ë Á A  ë@AA  ÁÁ +AK ÁA  kAÁ Â A «AË AB  ëAA Â Á +BK ÁB  kBÁ Ã A «BËC A  ëBAÃ  Á +CKC Á  kCÁÃ 	 A «CËD	 A	  ëC+@  ,    ,@    ,   ,À    ,   ,@   ,  ,À   ,   ,@   ,  &  2   zonesresultDatamembersresultÿÿÿÿÿÿÿÿ
unitsTown       ¬     Ø¸      J      ø            ,      ª      Ê     
              \      H      h      *
      L      ü      H                  <      ä      »      Z            Ì      è      ê      ú      l      Ø            j
     calcBuildingssendStateToServercalcSpawnPositionaddUnitCounteraddUnitCounterArmydecUnitCounterArmyaddUnitCounterKillcreateUnitsCommandcreateBuildingtacticsInit
setWinner           !       A   @@ @  À@Á  AAAA è ÇÇÁÁMÀ çÀþf  &             rootfactionstatistics_unitsn       size       live                                                          !      faction       result      units      (for index)	      (for limit)	      (for step)	      i
         _ENV #   -         @ A@  $ F @   d À   ÁË     @ ë@ ÀÆÀA B ä À Æ@B ÇÂÁA @ $ ä@  &     calcBuildings               typestate
buildingsstatisticstoJsonresultDatarootf_sendDataToServer            $   $   $   %   %   %   '   (   )   )   )   )   )   *   *   *   *   ,   ,   ,   ,   ,   ,   -      buildings0      buildings1      json         _ENV /   D    ,   F @    d @À  @@ @ A    AÀ  @@ ÀÀ À  A @A¦    @À  A A¦   A ÀA¦  ÀÀ À  A  B¦    @À  A @B¦    A B¦  &     calcBuildings                      zones                                   
                ,   0   0   0   1   1   2   2   3   3   5   9   9   :   :   :   :   :   :   ;   ;   ;   ;   ;   ;   <   <   <   =   ?   ?   ?   ?   ?   ?   @   @   @   @   @   @   A   A   A   D      faction    ,   
buildings   ,      _ENV F   M        @ @@   Ã@  Ã  ¤@ @  @@@ 
À  @  @
 &     assert                    G   G   G   G   G   G   H   H   H   I   I   K   K   K   M      array       	unitType          _ENV O   T    +    @ @@  @À @ @@Ë    Ê   Ê À   @ @@  À@@  @ @@  Ë   À @ @@   A@  @ @@  Ë   À @A Æ @ Ç@ÀÇ ÇÀÀ  ¤@&     resultDatamembers armykillsaddUnitCounter         +   P   P   P   P   P   P   P   P   P   P   P   P   P   Q   Q   Q   Q   Q   Q   Q   Q   Q   Q   Q   R   R   R   R   R   R   R   R   R   R   R   S   S   S   S   S   S   S   T      town    +   	unitType    +      _ENV V   Y        @ @@  @Ç@ ÎÀÀÀ &     resultDatamembersarmy                   W   W   W   W   X   X   X   Y      town       	unitType       ar         _ENV [   `    +    @ @@  @À @ @@Ë    Ê   Ê À   @ @@  À@@  @ @@  Ë   À @ @@   A@  @ @@  Ë   À @A Æ @ Ç@ÀÇ Ç Á  ¤@&     resultDatamembers armykillsaddUnitCounter         +   \   \   \   \   \   \   \   \   \   \   \   \   \   ]   ]   ]   ]   ]   ]   ]   ]   ]   ]   ]   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   ^   _   _   _   _   _   _   _   `      town    +   	unitType    +      _ENV b   ¨        @   &  K   @@ À   ¤ Æ@   ä ÂÀ_ AÀ@ GÂÀ$@!@A  &  FA `ÀA  C   dC FB GCÂGÃC ÇÂD GÄÂNÃ (ÅEC
     
'DþÃAD ÄBC	Á hGGÅÃ
GEÁ
GEÃ
 @  
gÄý\ MÃÇÄEÄFD d  À D @ $ «D  J)  ªÂñé  jïì   ÀÆ E Ç@Å  FÁD ä@Ë  E AA $ FE Á d ë@  B FAAFAF  dÀÂ ÇÆÃ ¨
ÃÅÃEÇÃÆÇGDGÁÄ ÅÅGÅEGÇÅFÆ A  d GÄÅDHD	ÇH	ÅH 
	I @ $EÇ_@I
@ÇI
FA ! @ aÀI
  E   dE GJ	 
ÁE
 dE§Âôi  êAó&  *   	fromJsonpairsarmy         assertè      root	unitTypeattack_weaponsize       distanceMaxattack_turretweaponfactiondamageBonus	tonumber	sortFunctablesortcalcSpawnPosition       sceneipairs                     f_createUnits2                    unitinstanceId
unitsTownaddUnitCounterArmyd       U       K       
f_addBuff áõ                    K    @ Ç À  @   ¦   @ Ç À  À @    ¦  @@ Ç@À  @   ¦  @@ Ç@À  À @    ¦  @ ÇÀ  @   ¦  @ ÇÀ  À @    ¦  À@ ÇÀÀ  @   ¦  À@ ÇÀÀ  À @    ¦   A Ç Á  @   ¦   A Ç Á  À @    ¦  @A Ç@Á  @   ¦  @A Ç@Á  À @    ¦     ¦  &                                                       K                                                                                                                                                                                                                                       a    K   b    K          c   c   c   d   e   e   e   g   g   g   g   h   h   h   i   i   i   i   j   j   j   k   k   k   k   k   k   l   l   l   n   o   p   p   p   p   p   q   q   r   r   s   p   v   w   w   w   w   w   x   x   x   x   y   y   z   w   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   i   i   g   g                                                                                                                                                               ¡   ¡   ¡   ¢   ¢   £   £   £   £   £   £   £   £   ¤   ¤   ¤   ¤            ¨   -   rawData       unitsCreate      data      (for generator)
   L   (for state)
   L   (for control)
   L   town   J   faction   J   (for generator)   J   (for state)   J   (for control)   J   unit   H   count   H   	unitType   H   dist   H   weapon    H   (for index)$   +   (for limit)$   +   (for step)$   +   i%   *   distanceMax'   *   turret,   H   (for index)0   9   (for limit)0   9   (for step)0   9   i1   8   distanceMax5   8   spawnPositions[      scene^      (for generator)a      (for state)a      (for control)a      _b      	unitDatab      (for index)e      (for limit)e      (for step)e      jf      zonei      	unitTypej      townk      unitIdw      unity      	instancez      researchId         _ENV ª   ­       Æ @ Ç@A@ @Á@A@ A À  BÁGÁÂÁ$A&     zonesrootscene        f_createUnits2                                 «   «   ¬   ¬   ¬   ¬   ¬   ¬   ¬   ¬   ¬   ¬   ¬   ­      faction       index       buildingType       zone         _ENV ¯   µ        @   &  F@@ GÀ    d _ÀÀ   A Á@   Ý ¤@ &     rootf_tacticsInit        logtacticsInit error             °   °   °   ±   ±   ±   ±   ²   ²   ³   ³   ³   ³   ³   µ      rawData       errCode         _ENV ·   Â       F @ G@À GÀ À  À   d@F A d@ K  JÁJ  @ ÀAÆ B   ä  ¤@   @ @B¤@ &  
   rootdataStoragef_setIfEmptywinnersendStateToServertypewinf_sendDataToServertoJson	f_finish            ¸   ¸   ¸   ¸   ¸   ¸   ¹   ¹   »   ¼   ½   ¿   ¿   ¿   ¿   ¿   ¿   Á   Á   Á   Â      winner       json         _ENVn                                    	   	   	   	   	   
   
   
   
   
                                                                                                                                                                                                         !      -   #   D   /   M   F   T   O   Y   V   `   [   ¨   b   ­   ª   µ   ¯   Â   ·   Â          _ENV