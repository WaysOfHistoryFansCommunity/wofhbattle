LuaS 

xV           (w@ĸH  if getParameter("border") ~= nil and not bordersScroll then return end

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

move.moveForward = moveForward > 0
move.moveBackward = moveForward < 0
move.moveRight = moveRight > 0
move.moveLeft = moveRight < 0

if getParameter("command") ~= nil then
	local command = getParameter("command")
	local pressed = toBool(getParameter("pressed"))

	if command == "turnLeft" then move.turnLeft = pressed
	elseif command == "turnRight" then move.turnRight = pressed
	elseif command == "moveDown" then move.moveDown = pressed
	elseif command == "moveUp" then move.moveUp = pressed
	end
end
         n    @ A@  $ _@ Ā Ā@ "@    &    F @ @ d _Ā @FA  @ Á@ Ī  d     A   @ ÁĀ Ī _@@A Æ @ Á ä  Ī  @   @ Á  Ī _@ @B Æ @  ä  Ī  Ē@  @    Y  B ĀB A CÆ@C Í ĀÆC Í@Ā ÆC `Ā   Ã@  Ã  Ā ÆC ` Á  Ã@  Ã  ĀÆ@C `Ā   Ã@  Ã  ĀÆ@C ` Á  Ã@  Ã  Ā Æ @ A ä _ĀÆ @ A ä AB F@  d $  Ä@  ĀÄ@   Å@   @Å   &     getParameterborder bordersScroll        right	tonumberforwardpressedtoBoolrootsession_visual_scenecamera_controllers_move
moveRightmoveForwardmoveBackward	moveLeftcommand	turnLeft
turnRight	moveDownmoveUp        n                                                                                    	   	   	   	   	   	                                                                                                                                                                                                                                          "      	addRight
   n   addForward   n   move3   n   commandY   m   pressed^   m      _ENV