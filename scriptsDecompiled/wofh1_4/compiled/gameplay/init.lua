zones = {}
resultData = {
  members = {},
  result = -1
}
unitsTown = {}
zones = {
  {
    269312,
    1813504,
    375000
  },
  {
    346624,
    1832960,
    375000
  },
  {
    235520,
    1715200,
    375000
  },
  {
    436736,
    1952256,
    522
  },
  {
    565248,
    1661952,
    375000
  },
  {
    542720,
    1533952,
    375000
  },
  {
    666112,
    1657856,
    375000
  },
  {
    785408,
    1460224,
    375000
  },
  {
    858624,
    1415168,
    375000
  },
  {
    1915904,
    123904,
    900000
  },
  {
    1858048,
    166400,
    900000
  },
  {
    1559552,
    321536,
    900000
  },
  {
    1501696,
    391680,
    900000
  },
  {
    1272832,
    579584,
    900000
  },
  {
    1280512,
    682496,
    900000
  }
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
    if buildings == 6 then
      return zones[8]
    elseif 3 < buildings then
      return zones[5]
    else
      return zones[1]
    end
  elseif buildings == 3 then
    return zones[14]
  elseif 1 < buildings then
    return zones[12]
  else
    return zones[10]
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
  if resultData.members[town] == nil then
    resultData.members[town] = {
      army = {},
      kills = {}
    }
  end
  if resultData.members[town].army == nil then
    resultData.members[town].army = {}
  end
  if resultData.members[town].kills == nil then
    resultData.members[town].kills = {}
  end
  addUnitCounter(resultData.members[town].army, unitType)
end

function decUnitCounterArmy(town, unitType)
  local ar = resultData.members[town].army
  ar[unitType] = ar[unitType] - 1
end

function addUnitCounterKill(town, unitType)
  if resultData.members[town] == nil then
    resultData.members[town] = {
      army = {},
      kills = {}
    }
  end
  if resultData.members[town].army == nil then
    resultData.members[town].army = {}
  end
  if resultData.members[town].kills == nil then
    resultData.members[town].kills = {}
  end
  addUnitCounter(resultData.members[town].kills, unitType)
end

function createUnitsCommand(rawData)
  if rawData == "" then
    return
  end
  local unitsCreate = {}
  local data = fromJson(rawData)
  for town, faction in pairs(data) do
    if faction.army ~= nil then
      for unit, count in pairs(faction.army) do
        if count <= 0 then
          return
        end
        assert(count < 1000)
        local unitType = root.unitType[unit]
        local dist = 0
        local weapon = unitType.attack_weapon
        for i = 0, weapon.size - 1 do
          local distanceMax = weapon[i].distanceMax
          if dist < distanceMax then
            dist = distanceMax
          end
        end
        local turret = unitType.attack_turret
        for i = 0, turret.size - 1 do
          local distanceMax = turret[i].weapon[0].distanceMax
          if dist < distanceMax then
            dist = distanceMax
          end
        end
        unitsCreate[#unitsCreate + 1] = {
          faction.faction,
          faction.damageBonus,
          tonumber(unit),
          count,
          dist,
          tonumber(town)
        }
      end
    end
  end
  
  function sortFunc(a, b)
    if a[5] > b[5] then
      return true
    end
    if a[5] < b[5] then
      return false
    end
    if a[3] > b[3] then
      return true
    end
    if a[3] < b[3] then
      return false
    end
    if a[4] > b[4] then
      return true
    end
    if a[4] < b[4] then
      return false
    end
    if a[6] > b[6] then
      return true
    end
    if a[6] < b[6] then
      return false
    end
    if a[1] > b[1] then
      return true
    end
    if a[1] < b[1] then
      return false
    end
    if a[2] > b[2] then
      return true
    end
    if a[2] < b[2] then
      return false
    end
    return false
  end
  
  table.sort(unitsCreate, sortFunc)
  local spawnPositions = {
    calcSpawnPosition(0),
    calcSpawnPosition(1)
  }
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
        assert(0 <= researchId and researchId <= 75)
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
  if rawData == "" then
    return
  end
  local errCode = root.f_tacticsInit(rawData)
  if errCode ~= 0 then
    log("tacticsInit error " .. errCode)
  end
end

function setWinner(winner)
  root.dataStorage.f_setIfEmpty("winner", winner)
  sendStateToServer()
  local json = {type = "win", winner = winner}
  root.f_sendDataToServer(toJson(json))
  root.f_finish()
end
