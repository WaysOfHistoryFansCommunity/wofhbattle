LuaS �

xV           (w@�  --[[local pressed = toBool(getParameter("pressed"))
local move = root.session_visual_scene[0].camera_controllers_move
if pressed then
	baseMoveSpeed = move.moveSpeed
	move.moveSpeed = move.moveSpeed * fastMove
else
	move.moveSpeed = baseMoveSpeed
end]]
            & �                          _ENV