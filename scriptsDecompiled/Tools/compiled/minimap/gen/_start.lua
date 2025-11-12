signalScript = getParameter("signalScript")
moveScript = getParameter("moveScript")
signalHotKey = 0
canControl = getParameter("canControl")
if canControl == nil then
  canControl = true
end
local interface = getInterface()
if getParameter("targetName") ~= nil then
  interface.content_target[2].name = getParameter("targetName")
end
if getParameter("textureName") ~= nil then
  interface.content_texture[5].name = getParameter("textureName")
end
interface.content.f_resetTexture(1)
interface.content.f_resetTexture(5)
local posX = getParameter("x")
local posY = getParameter("y")
local sizeX = math.floor(getParameter("sx"))
local sizeY = math.floor(getParameter("sy"))
local landSizeX = root.session_gameplay_gameplay_scene[0].landscape_size_x
local landSizeY = root.session_gameplay_gameplay_scene[0].landscape_size_y
local landSizeK = landSizeX / landSizeY
local sizeK = sizeX / sizeY
if landSizeK > sizeK then
  local prev = sizeY
  sizeY = math.floor(sizeY * sizeK / landSizeK)
  posY = posY + (prev - sizeY) // 2
else
  local prev = sizeX
  sizeX = math.floor(sizeX * landSizeK / sizeK)
  posX = posX + (prev - sizeX) // 2
end
local nodes = getNodes()
local n = nodes[5]
n.sizeX = sizeX
n.sizeY = sizeY
n.localLeft = posX
n.localTop = posY
n.horizontalAlign = getParameter("horizontalAlign")
n.verticalAlign = getParameter("verticalAlign")
if getParameter("showFow") == false then
  nodes[2].visible = false
end
nodes[4].visible = getParameter("showTerritories")
nodes[6].visible = getParameter("showEnvs")
local minimap = root.session_render_minimap
minimap.f_initFowTarget("fowMinimapTarget", sizeX, sizeY)
if getParameter("targetName") == "objectsMinimap" then
  minimap.f_initObjectsTarget("objectsMinimap", sizeX, sizeY)
end
if getParameter("targetName") == "minimapObjectsBig" then
  minimap.f_initObjectsBigTarget("minimapObjectsBig", sizeX, sizeY)
end
minimap.f_initCameraTarget("cameraMinimap", sizeX, sizeY)
