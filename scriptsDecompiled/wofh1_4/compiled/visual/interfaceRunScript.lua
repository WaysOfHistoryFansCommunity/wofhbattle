assert(getParameter("interface") ~= nil)
local interface = root.interface[getParameter("interface")]
assert(interface ~= nil)
assert(interface.scripts_ready)
local script = tonumber(getParameter("script"))
assert(script ~= nil)
local runArray = {script}
local parameters = ""
for name, value in pairs(getParameters()) do
  if name ~= "interface" and name ~= "script" then
    table.insert(runArray, name)
    table.insert(runArray, value)
  end
end
interface.scripts_run = runArray
