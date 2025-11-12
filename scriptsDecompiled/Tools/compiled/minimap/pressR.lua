if not canControl then
  return
end
if not getParameter("pressed") then
  return
end
if trySendSignal(getParameter("x"), getParameter("y"), "moveLandscape") then
  return
end
sendUnits(getParameter("x"), getParameter("y"))
