if not canControl then
  return
end
if not getParameter("pressed") then
  movingCamera = false
  return
end
if trySendSignal(getParameter("x"), getParameter("y"), "lookLandscape") then
  return
end
movingCamera = getParameter("pressed")
if root.window_cursor == 1 and root.session_visual_placerScriptLeft == moveScript then
  sendUnits(getParameter("x"), getParameter("y"))
  root.session_visual.f_placerTurnOff()
  return
end
cameraToMinimap(getParameter("x"), getParameter("y"))
