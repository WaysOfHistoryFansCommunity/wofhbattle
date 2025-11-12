if not canControl then
  return
end
if not movingCamera then
  return
end
cameraToMinimap(getParameter("x"), getParameter("y"))
