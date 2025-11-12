local command = getParameter("command")
if command == "createUnits" then
  createUnitsCommand(getParameter("data"))
  local json = {
    type = "report",
    rid = getParameter("rid")
  }
  root.sendDataToServer = toJson(json)
elseif command == "tacticsInit" then
  tacticsInit(getParameter("data"))
end
