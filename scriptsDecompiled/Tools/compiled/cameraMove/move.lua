if getParameter("border") ~= nil and not bordersScroll then
  return
end
local addRight = 0
if getParameter("right") ~= nil then
  addRight = tonumber(getParameter("right"))
end
local addForward = 0
if getParameter("forward") ~= nil then
  addForward = tonumber(getParameter("forward"))
end
if getParameter("pressed") ~= nil and not toBool(getParameter("pressed")) then
  addRight = -addRight
  addForward = -addForward
end
local move = root.session_visual_scene[0].camera_controllers_move
moveRight = moveRight + addRight
moveForward = moveForward + addForward
move.moveForward = 0 < moveForward
move.moveBackward = 0 > moveForward
move.moveRight = 0 < moveRight
move.moveLeft = 0 > moveRight
if getParameter("command") ~= nil then
  local command = getParameter("command")
  local pressed = toBool(getParameter("pressed"))
  if command == "turnLeft" then
    move.turnLeft = pressed
  elseif command == "turnRight" then
    move.turnRight = pressed
  elseif command == "moveDown" then
    move.moveDown = pressed
  elseif command == "moveUp" then
    move.moveUp = pressed
  end
end
