LuaS �

xV           (w@��  function getNodes()
	return root.interface_session_nodes
end

local factions = root.session_visual_faction
factions[0].maskColor_value = 0xffff0000
factions[1].maskColor_value = 0xff0000ff
factions[0].minimapColor_value = 0xffff0000
factions[1].minimapColor_value = 0xff0000ff

local colorLut = root.render_scene_colorLut
colorLut.brightness = -0.065
colorLut.contrast = 0.21
            ,     �@@ �@ G�@ J@A�G�A J�A�G�@ J@A�G�A J�A�F@@ G@� J�B�J@C�& �    	getNodesrootsession_visual_faction        maskColor_value  ��           �  �    minimapColor_valuerender_scene_colorLutbrightness�p=
ף��	contrast�z�G��?                    @ @@ &  & �    rootinterface_session_nodes                               _ENV                                 	   	                     	factions      	colorLut         _ENV