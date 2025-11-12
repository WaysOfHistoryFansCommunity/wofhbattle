local zg = root.session_gameplay_gameplay_scene[0].landscape.f_getHeight(getParameter("xg"), getParameter("yg"))
local z = root.session_visual_f_coordinateToVisual2(zg)
root.session_visual.f_createParticles(0, getParameter("emitter"), getParameter("scale"), true, getParameter("x"), getParameter("y"), z + tonumber(getParameter("addZ")), getParameter("ex"), getParameter("ey"), getParameter("ez"), getParameter("text"))
