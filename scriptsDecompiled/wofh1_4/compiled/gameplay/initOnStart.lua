local dataStr = getParameter("data")
local data = fromJson(dataStr)
local buildings = data.buildings
local info = data.data
local zones0 = {
  2,
  3,
  4,
  6,
  7,
  9
}
local zones1 = {
  11,
  13,
  15
}
local buildingTypes = {
  110,
  111,
  112,
  113,
  114,
  115,
  116,
  117,
  118,
  119,
  120,
  121
}
for i = 1, 3 do
  local id = buildings[i]
  if 0 < id then
    createBuilding(1, zones1[i], buildingTypes[id])
  end
end
for i = 1, 6 do
  local id = buildings[i + 3]
  if 0 < id then
    createBuilding(0, zones0[i], buildingTypes[id])
  end
end
local storage = root.dataStorage
local town = info.town
storage.set = {
  "townId",
  town[1]
}
storage.set = {
  "townName",
  town[2]
}
local account = info.account
storage.set = {
  "accountId",
  account[1]
}
storage.set = {
  "accountName",
  account[2]
}
storage.set = {
  "sex",
  account[3]
}
storage.set = {
  "race",
  account[4]
}
local country = info.country
if country ~= nil and 3 <= #country then
  storage.set = {
    "countryId",
    country[1]
  }
  storage.set = {
    "countryName",
    country[2]
  }
  storage.set = {
    "countryFlag",
    country[3]
  }
end
storage.set = {"noUnitsSec", "300"}
