local time = root.time
if time % 1000 ~= 0 then
  return
end
local storage = root.dataStorage
if storage.winner == "" or storage.winner == nil then
  local gFaction0 = root.faction[0]
  local gFaction1 = root.faction[1]
  local hasUnits0 = 0 < gFaction0.f_calcUnitsByTags(1048576)
  local hasBuildings0 = 0 < gFaction0.f_calcUnitsByTags(2097152)
  local hasUnits1 = 0 < gFaction1.f_calcUnitsByTags(1048576)
  local hasBuildings1 = 0 < gFaction1.f_calcUnitsByTags(2097152)
  if not hasBuildings1 then
    setWinner(0)
  elseif not hasBuildings0 then
    setWinner(1)
  elseif not hasUnits0 and not hasUnits1 then
    local sec = tonumber(storage.noUnitsSec)
    if sec == 0 then
      setWinner(255)
    else
      storage.f_set("noUnitsSec", sec - 1)
    end
  end
end
if time % 10000 == 0 then
  sendStateToServer()
end
if time % 30000 == 1000 then
  createUnitsCommand(root.f_tacticsWork())
end
