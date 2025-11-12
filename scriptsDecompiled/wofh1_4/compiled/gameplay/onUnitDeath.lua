local instance = getParameter("instanceId")
local killerInstance = getParameter("killerInstance")
local unitType = getParameter("unitType")
local town = unitsTown[instance]
if town == nil then
  return
end
decUnitCounterArmy(town, unitType)
local killerTown = unitsTown[killerInstance]
if killerTown == nil then
  return
end
if 9 <= killerInstance then
  addUnitCounterKill(killerTown, unitType)
end
