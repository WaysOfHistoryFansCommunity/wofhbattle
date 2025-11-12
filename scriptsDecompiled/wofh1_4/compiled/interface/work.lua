if root.session_gameplay == nil then
  return
end
local nodes = getNodes()
nodes[21].visible = root.session_gameplay_state == 5
local gameplay = root.session_gameplay_gameplay
local seconds = gameplay.time // 1000
nodes[2].widget_text = timeToStr(seconds // 3600) .. ":" .. timeToStr(seconds // 60 % 60) .. ":" .. timeToStr(seconds % 60)
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
    if 0 < accountId then
      id = accPortraits[sex + 1][race]
    end
    nodes[id].visible = true
    if countryName == nil or countryName == "" then
      nodes[10].visible = false
    else
      nodes[10].visible = true
      nodes[9].widget_text = countryName
    end
  end
end
local selectionList = root.session_visual_scene[0].selection_units_list
haveSelected = 0 < selectionList.size
nodes[32].visible = haveSelected
if not haveSelected then
  return
end
unitId = selectionList[0].id
local gUnit = gameplay.scene[0].unit[unitId]
if gUnit == nil then
  return
end
if gUnit.instanceId ~= selectionList[0].instance then
  return
end
typeId = gUnit.type
typeModId = gUnit.typeModified
local gType = gameplay.unitTypeModified[typeModId]
nodes[34].widget_text = gUnit.deathability_health // 256 .. "/" .. gType.deathability_health // 256
if lastUnitId == unitId then
  return
end
lastUnitId = unitId
local radius = gType.radius
nodes[33].widget_text = unitNames[typeId + 1]
nodes[36].widget_text = radius // 256
nodes[38].visible = gType.movementOn
nodes[37].widget_text = gType.movement_moveSpeed
nodes[35].widget_text = gType.deathability_attackThreat
nodes[40].widget_text = gType.deathability_armor_data[0] * 100 // 65536
nodes[41].widget_text = gType.deathability_armor_data[1] * 100 // 65536
nodes[42].widget_text = gType.deathability_armor_data[2] * 100 // 65536
nodes[43].widget_text = gType.deathability_armor_data[3] * 100 // 65536
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

function outWeapon(weapon, weaponId)
  local damage = weapon.damage
  local damages = damage.damages
  local weap = weapons[weaponId]
  if weap == nil then
    return
  end
  nodes[weap.main].visible = true
  for i = 1, #weap.damageZone do
    nodes[weap.damageZone[i]].visible = i == damage.area + 1
  end
  local damageType = damage.type
  if damageType == nil then
    damageType = 0
  end
  for i = 1, #weap.damageType do
    nodes[weap.damageType[i]].visible = i == damageType + 1
  end
  local dist = tostring((weapon.distanceMax - radius) // 256)
  local distanceMin = weapon.distanceMin
  if distanceMin > radius then
    local minDist = (distanceMin - radius) // 256
    dist = minDist .. "-" .. dist
  end
  nodes[weap.distance].widget_text = dist
  nodes[weap.spread].widget_text = weapon.spread // 10
  nodes[weap.period].widget_text = string.format("%.1f", weapon.rechargePeriod / 1000)
  damagesCount = 0
  for damageId = 0, 10 do
    local dmg = damages[damageId]
    local n = nodes[weap.damageSpecial[damageId + 1][1]]
    if dmg ~= nil and 0 < dmg then
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
local turrets = gType.attack_turret
local turretsCount = turrets.size
for i = 1, turretsCount do
  outWeapon(turrets[i - 1].weapon[0], weaponsCount + i)
end
for i = weaponsCount + turretsCount + 1, 3 do
  nodes[weapons[i].main].visible = false
end
