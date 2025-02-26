LuaS �

xV           (w@�c  if root.session_gameplay == nil then return end

local nodes = getNodes()

nodes[21].visible = (root.session_gameplay_state == 5)

local gameplay = root.session_gameplay_gameplay
local seconds = gameplay.time // 1000
nodes[2].widget_text = timeToStr(seconds // 3600)..":"..timeToStr((seconds // 60) % 60)..":"..timeToStr(seconds % 60)


-- INTERFACE NAMES

if interfaceNamesInit then
	local storage = gameplay.dataStorage
	local townName = storage.townName
	if townName ~= "" and townName ~= nil then
		interfaceNamesInit = false
		local accountId = tonumber(storage.accountId)
		local accountName = storage.accountName
		local sex = tonumber(storage.sex)
		local race = math.floor(tonumber(storage.race)) + 1
		local countryName = storage.countryName

		nodes[7].widget_text = townName
		nodes[6].widget_text = accountName
		
		local id = accPortraits[3][race]
		if accountId > 0 then id = accPortraits[sex + 1][race] end
		nodes[id].visible = true
		
		if countryName == nil or countryName == "" then
			nodes[10].visible = false
		else
			nodes[10].visible = true
			nodes[9].widget_text = countryName
		end
	end
end


-- SELECTION INFO

local selectionList = root.session_visual_scene[0].selection_units_list
haveSelected = (selectionList.size > 0)
nodes[32].visible = haveSelected
if not haveSelected then return end

unitId = selectionList[0].id
local gUnit = gameplay.scene[0].unit[unitId]
if gUnit == nil then return end
if gUnit.instanceId ~= selectionList[0].instance then return end

typeId = gUnit.type
typeModId = gUnit.typeModified
local gType = gameplay.unitTypeModified[typeModId]

nodes[34].widget_text = (gUnit.deathability_health // 256).."/"..(gType.deathability_health // 256)

if (lastUnitId == unitId) then return end
lastUnitId = unitId



-- SIMPLE PARAMETERS

local radius = gType.radius
nodes[33].widget_text = unitNames[typeId + 1]
nodes[36].widget_text = radius // 256
nodes[38].visible = gType.movementOn
nodes[37].widget_text = gType.movement_moveSpeed
nodes[35].widget_text = gType.deathability_attackThreat


-- ARMOR

nodes[40].widget_text = gType.deathability_armor_data[0] * 100 // 65536
nodes[41].widget_text = gType.deathability_armor_data[1] * 100 // 65536
nodes[42].widget_text = gType.deathability_armor_data[2] * 100 // 65536
nodes[43].widget_text = gType.deathability_armor_data[3] * 100 // 65536



-- TAGS

local tags = gType.tags
local tagsCount = 0
for tagId = 1, 10 do
	local tag = tags[tagId]
	local n = nodes[tagsWidgets[tagId]]
	if tag then
		n.visible = true
		n.localLeft = 8 + 25 * tagsCount
		tagsCount = tagsCount + 1
	else
		n.visible = false
	end
end


-- WEAPONS

function outWeapon(weapon, weaponId)
	local damage = weapon.damage
	local damages = damage.damages
	local weap = weapons[weaponId]
	if weap == nil then return end
	nodes[weap.main].visible = true

	for i = 1, #weap.damageZone do
		nodes[weap.damageZone[i]].visible = i == damage.area + 1
	end

	local damageType = damage.type
	if damageType == nil then damageType = 0 end
	for i = 1, #weap.damageType do
		nodes[weap.damageType[i]].visible = i == damageType + 1
	end

	local dist = tostring((weapon.distanceMax - radius) // 256)
	local distanceMin = weapon.distanceMin
	if distanceMin > radius then
		local minDist = (distanceMin - radius) // 256
		dist = minDist.."-"..dist
	end
	nodes[weap.distance].widget_text = dist
	nodes[weap.spread].widget_text = weapon.spread // 10
	nodes[weap.period].widget_text = string.format("%.1f", weapon.rechargePeriod / 1000)

	damagesCount = 0
	for damageId = 0, 10 do
		local dmg = damages[damageId]
		local n = nodes[weap.damageSpecial[damageId + 1][1]]
		if dmg ~= nil and dmg > 0 then
			n.visible = true
			n.localLeft = 43 + 35 * damagesCount

			nodes[weap.damageSpecial[damageId + 1][2]].widget_text = string.format("%.1f", dmg / 256)
			damagesCount = damagesCount + 1
		else
			n.visible = false
		end
	end
end

local weaponTypes = gType.attack_weapon
local weaponsCount = weaponTypes.size
for i = 1, weaponsCount do
	outWeapon(weaponTypes[i - 1], i)
end



-- TURRETS

local turrets = gType.attack_turret
local turretsCount = turrets.size
for i = 1, turretsCount do
	outWeapon(turrets[i - 1].weapon[0], weaponsCount + i)
end

for i = weaponsCount + turretsCount + 1, 3 do
	nodes[weapons[i].main].visible = false
end
         �    @ @@ �@   �& � �@ $�� G A � @ ��A_�A  ��@  � � J���F @ G � �@� ��B��B AC S�C$� A� �AC �D���� �� BC PD$� � ��@D �   ��ǀ� ��_ E�
�_�@@
�@ňF�E ���d� ��ƁE B�� �F �FF�E ��d $�  BGG����G ���H ����BH ��H� @��� ��BH C�����ǂ �ɂ_��@ � �� ��BI �Bł� ��BI �ɂǂI �B�� @ ������� ���` ��  �A  �  ���J FAJ 
A��AJ "A    �& � ��AK ��� �H�KFK A�@  �& � GL����AL_��  �& � G�L@�GAM@�G�� �M G����M �N�A�� G�SB��A������N �K �  �& � �K ������AO �O F�L MB�B����O BN���P B����ǁP �����Q B���ǁQ ���HRBR��ǁR ��BGRBR����R ���BRBR���S ���HRBR���A�� AB �B	 �B h�G���S ��� b  @��ɂ���Ã��Ã�BG  ��CłgB�l  @�G������   A ��ƃT U�@ �C��B��B���A � � h��F�T �U�����U	��U	�dD�g��MM��� � h�FV G�GD�GD J�ւgC�& � [   rootsession_gameplay 	getNodes       visiblesession_gameplay_state       session_gameplay_gameplaytime�             widget_text
timeToStr      :<       interfaceNamesInitdataStorage	townName 	tonumber
accountIdaccountNamesexmathfloorrace       countryName              accPortraits               
       	       session_visual_sceneselection_units_listhaveSelectedsize        unitIdidsceneunitinstanceId	instancetypeIdtype
typeModIdtypeModifiedunitTypeModified"       deathability_health       /lastUnitIdradius!       
unitNames$       &       movementOn%       movement_moveSpeed#       deathability_attackThreat(       deathability_armor_datad              )       *       +       tagstagsWidgets
localLeft              
outWeaponattack_weapon       attack_turretweapon        weaponsmain         g   �    u   � @ �@@�@ A �@  �& � GAFA� J���A� �B� �� hA�GBG�FB� �BB��A_�  ��B  �� J���g�G�B��  �A� �� �C��� ���C�B��� ���_��  ��B  �� ���A��AC ǁC  ������� �D   ��� ��C@ �B � ����D� 
���E� GE SB�
B���E� F�E G��B ǂF ���d��
B���B�� AB �� (��ÂGCG���G��G��FC� _�@@�  ����J����G �������J���CG������CH��� ��E ��D R�C䃀�Ã��G ��A��  �J�Ȃ'��& � #   damagedamagesweapons mainvisible       damageZoneareatype        damageType	tostringdistanceMax       distanceMin-	distancewidget_textspread
       periodstringformat%.1frechargePeriod�      damagesCountdamageSpecial
localLeft#       +                         u   h   i   j   j   k   k   k   l   l   l   n   n   n   n   n   o   o   o   o   o   o   o   o   o   o   n   r   s   s   s   t   t   t   t   t   u   u   u   u   u   u   u   u   u   t   x   x   x   x   x   x   y   z   z   z   {   {   {   |   |   |   |   ~   ~   ~                  �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �      weapon    u   	weaponId    u   damage   u   damages   u   weap   u   (for index)      (for limit)      (for step)      i      damageType   u   (for index)"   -   (for limit)"   -   (for step)"   -   i#   ,   dist3   u   distanceMin4   u   minDist:   >   (for index)S   t   (for limit)S   t   (for step)S   t   	damageIdT   s   dmgU   s   nZ   s      _ENVnodesradius�                                                            	   	   	   	   	   	   	   	   	   	   	   	   	   	   	                                                                                                                                           !   !   !   #   #   $   $   ,   ,   ,   ,   -   -   -   -   -   -   .   .   .   /   /   /   /   1   1   1   2   2   2   2   2   3   3   3   4   4   4   4   4   4   6   6   7   7   8   8   8   :   :   :   :   :   :   :   :   <   <   <   <   <   =   =   C   D   D   D   D   D   D   E   E   E   F   F   F   G   G   G   H   H   H   M   M   M   M   M   M   N   N   N   N   N   N   O   O   O   O   O   O   P   P   P   P   P   P   V   W   X   X   X   X   Y   Z   Z   Z   [   [   \   ]   ]   ]   ^   ^   `   X   �   g   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   '   nodes   �   	gameplay   �   seconds   �   storage&   U   	townName'   U   
accountId/   U   accountName0   U   sex3   U   race:   U   countryName;   U   idB   U   selectionListY   �   gUnitn   �   gType~   �   radius�   �   tags�   �   
tagsCount�   �   (for index)�   �   (for limit)�   �   (for step)�   �   tagId�   �   tag�   �   n�   �   weaponTypes�   �   weaponsCount�   �   (for index)�   �   (for limit)�   �   (for step)�   �   i�   �   turrets�   �   turretsCount�   �   (for index)�   �   (for limit)�   �   (for step)�   �   i�   �   (for index)�   �   (for limit)�   �   (for step)�   �   i�   �      _ENV