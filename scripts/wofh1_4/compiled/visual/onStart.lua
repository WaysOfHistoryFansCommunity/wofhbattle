LuaS �

xV           (w@��  root.session_visual.f_setViewportSize(800, 600)
local scene = root.session_visual_scene[0]

local camera = scene.camera
camera.state_yaw = 0.99
camera.state_position_z = 1724
local controllers = camera.controllers
local ls = scene.landscape_size
local lx = ls.x
local ly = ls.y
scene.f_cameraShowPosition(lx / 2, ly / 2)
local camCont5min = controllers.complex_5_min
local camCont5max = controllers.complex_5_max
camCont5min.x = 0
camCont5min.y = 0
camCont5max.x = lx
camCont5max.y = ly
	
root.session.f_startGameplay()
root.interface.f_create("project/wofh1_4/interfaces/session", "session", 1, 1)

root.interface.f_create("/project/Tools/scene", "scene", 1, 1, "useDrag", 2, "useSingleSelect", 1)
root.interface_scene_active = true
root.interface_scene_priority = -100

root.interface.f_create("/project/Tools/cameraMove", "cameraMove", 1, 1, "bordersScroll", false)
root.interface_cameraMove_active = true
root.interface_cameraMove_priority = 100
         E    @ @@ �@ A�  �  $@� @ @A �A G�A J@B�J�B�� � �@C ��G���D �ADB��A���D��D��A��������A��@ EBE$B� @ �E�EA � �B C $B�@ �E�EA� �� �B C A �C �C D $B�@ 
�G�@ 
BH�@ �E�EA� �� �B C A	 �  $B�@ 
�ǒ@ 
�I�& � (   rootsession_visualf_setViewportSize       X      session_visual_scene        camera
state_yaw�G�z��?state_position_z�      controllerslandscape_sizexyf_cameraShowPosition       complex_5_mincomplex_5_maxsessionf_startGameplay
interface	f_create#project/wofh1_4/interfaces/session       /project/Tools/scenesceneuseDraguseSingleSelectinterface_scene_activeinterface_scene_priority��������/project/Tools/cameraMovecameraMovebordersScrollinterface_cameraMove_activeinterface_cameraMove_priorityd               E                                             	   
                                                                                                                                                                     scene	   E   camera
   E   controllers   E   ls   E   lx   E   ly   E   camCont5min   E   camCont5max   E      _ENV