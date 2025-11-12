function getNodes()
  return root.interface_session_nodes
end

local factions = root.session_visual_faction
factions[0].maskColor_value = 4294901760
factions[1].maskColor_value = 4278190335
factions[0].minimapColor_value = 4294901760
factions[1].minimapColor_value = 4278190335
local colorLut = root.render_scene_colorLut
colorLut.brightness = -0.065
colorLut.contrast = 0.21
