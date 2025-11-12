if zoomStep == 0 then
  return
end
local mh = root.session_visual_scene[0].camera_controllers_moveHeight
mh.add = mh.add + getParameter("value") * zoomStep
