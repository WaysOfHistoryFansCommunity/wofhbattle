interfaceId = root.interface.f_getIndex(getParameter("interfaceName"))
signalScript = getParameter("signalScript")
signalHotKey = 0
movePlacer = false
envSignalTags = getParameter("envSignalTags")
cbInterfaceLeft = getParameter("cbInterfaceLeft")
cbScriptLeft = getParameter("cbScriptLeft")
cbInterfaceRight = getParameter("cbInterfaceRight")
cbScriptRight = getParameter("cbScriptRight")
addSelectionHotKey = getParameter("addSelectionHotKey")
zoomStep = getParameter("zoomStep")
if zoomStep == nil then
  zoomStep = 150
end
useFrame = getParameter("useFrame")
if useFrame == nil then
  useFrame = false
end
useSingleSelect = getParameter("useSingleSelect")
if useSingleSelect == nil then
  useSingleSelect = 0
end
useSignals = getParameter("useSignals")
if useSignals == nil then
  useSignals = false
end
useDrag = getParameter("useDrag")
if useDrag == nil then
  useDrag = 0
end

function getInterface()
  return root.interface[interfaceId]
end

function getNodes()
  return root.interface[interfaceId].nodes
end

function updateViewportSize()
  local vSes = root.session_visual
  if vSes == nil then
    return
  end
  local nodes = getNodes()
  local n = nodes[1]
  if n.sizeX > 0 and 0 < n.sizeY then
    vSes.f_setViewportSize(n.sizeX, n.sizeY)
  end
end

function initOffsets()
  local left = getParameter("left")
  local right = getParameter("right")
  local top = getParameter("top")
  local bottom = getParameter("bottom")
  if left == nil then
    left = 0
  end
  if right == nil then
    right = 0
  end
  if top == nil then
    top = 0
  end
  if bottom == nil then
    bottom = 0
  end
  assert(root.window_width >= 300)
  assert(300 <= root.window_height)
  assert(right + left < root.window_width)
  assert(bottom + top < root.window_height)
  local nodes = getNodes()
  local node = nodes[1]
  local sx = root.window_width - right - left
  node.sizeX = sx
  local sy = root.window_height - bottom - top
  node.sizeY = sy
  node.localLeft = left
  node.localTop = top
  updateViewportSize()
end

function getRelation(fromFaction, toFaction)
  return root.session_gameplay_gameplay_scene[0].relation[fromFaction][toFaction].value
end

function trySendSignal(signalType, x, y)
  if not useSignals then
    return false
  end
  if signalScript == nil then
    return false
  end
  if not getInterface().hotKeys.f_check(signalHotKey) then
    return false
  end
  local vSession = root.session_visual
  local myFactionId = vSession.currentFaction
  local unitId = vSession.scene[0].f_collideUnit(myFactionId, x, y)
  if unitId ~= nil then
    local unit = root.session_gameplay_gameplay_scene[0].unit[unitId]
    local rel = getRelation(myFactionId, unit.faction)
    local pos = unit.position
    local size = root.session_gameplay_gameplay_unitType[unit.type].radius / 256 / 30
    if rel == 1 then
      signalType = signalType .. "Unit"
    else
      signalType = signalType .. "Enemy"
    end
    assert(0 < size)
    vSession.script_scripts.f_run(signalScript, "x", pos.x / 256, "y", pos.y / 256, "size", size, "type", signalType, "unitId", unitId, "unitType", unit.type)
    return true
  end
  local envId = vSession.scene[0].f_collideEnv(myFactionId, x, y, 10000, envSignalTags)
  if envId ~= nil then
    local env = root.session_gameplay_gameplay_scene[0].env[envId]
    local pos = env.position
    local size = vSession.envType[env.type].radius / 30
    if 0 < size then
      vSession.script_scripts.f_run(signalScript, "x", pos.x / 256, "y", pos.y / 256, "size", size, "type", signalType .. "Deposit", "envId", envId, "envType", env.type)
      return true
    end
  end
  local pos = vSession.scene[0].placer_position
  vSession.script_scripts.f_run(signalScript, "x", pos.x, "y", pos.y, "type", signalType .. "Landscape")
  return true
end

local interface = getInterface()
interface.mapSceneToWidget = 1
initOffsets()
