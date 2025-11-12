local interfaceName = getParameter("interfaceName")
if interfaceName ~= nil then
  interfaceId = root.interface.f_getIndex(interfaceName)
end

function getInterface()
  return root.interface[interfaceId]
end

function getNodes()
  return root.interface[interfaceId].nodes
end

function toBool(v)
  if type(v) == "number" then
    return v ~= 0
  end
  if type(v) == "string" then
    if v == "true" then
      return true
    end
    local n = tonumber(v)
    return n ~= nil and n ~= 0
  end
  return false
end

function positionVisualToScreen(x, y)
  local n = getNodes()[5]
  local s = root.session_visual_scene[0].landscape_size
  return {
    x / s.x * n.sizeX,
    (1 - y / s.y) * n.sizeY
  }
end

function getPosition(x, y)
  local sz = root.session_gameplay_gameplay_scene[0].landscape_size
  local n = getNodes()[5]
  local xg = math.floor(sz.x * x / n.sizeX)
  local yg = math.floor(sz.y * (1 - y / n.sizeY))
  local x = root.session_visual.f_coordinateToVisual2(xg)
  local y = root.session_visual.f_coordinateToVisual2(yg)
  return {
    x,
    y,
    xg,
    yg
  }
end

function cameraToMinimap(x, y)
  local pos = getPosition(x, y)
  root.session_visual_scene[0].f_cameraShowPosition(pos[1], pos[2])
end

function trySendSignal(x, y, signalType)
  if signalScript == nil then
    return false
  end
  if not getInterface().hotKeys.f_check(signalHotKey) then
    return false
  end
  local pos = getPosition(x, y)
  root.session_visual_script_scripts.f_run(signalScript, "x", pos[1], "y", pos[2], "type", signalType)
  return true
end

function sendUnits(x, y)
  if moveScript == nil then
    return
  end
  local pos = getPosition(x, y)
  root.session_visual_script_scripts.f_run(moveScript, "x", pos[1], "y", pos[2], "xg", pos[3], "yg", pos[4], "direction", 0)
end
