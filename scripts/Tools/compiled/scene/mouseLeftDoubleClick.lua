LuaS �

xV           (w@��  local key = getParameter("keyId")
if key ~= 16777216 then return end

local selector = root.session_visual_scene[0].selection_units_list
if selector.size == 0 then return end

local unitId = selector[0].id
if unitId == nil then return end
local gUnit = root.session_gameplay_gameplay_scene[0].unit[unitId]
if gUnit == nil or gUnit.instanceId ~= selector[0].instance then return end

if addSelectionHotKey == nil then return end
local clearSelection = not root.session_visual_hotKeys.f_check(addSelectionHotKey)

root.session_visual_scene[0].f_viewportMassSelect(gUnit.type, root.session_visual_currentFaction, clearSelection)
         	4    @ A@  $� _�@   �& � F�@ G � G@� G�� ��� @A  �& � �@� � B@B  �& � ��@ ǀ��@����ǀ�_@� ��GA� GA�_@  �& � �C @B  �& � �@ �CDF�C $�  F�@ G�GA�GA������@ ���  dA & �    getParameterkeyId       rootsession_visual_scene        selection_units_listsizeid  session_gameplay_gameplay_sceneunitinstanceId	instanceaddSelectionHotKeysession_visual_hotKeysf_checkf_viewportMassSelecttypesession_visual_currentFaction        4                                                            	   	   	   	   	   
   
   
   
   
   
   
   
                                                                  key   4   	selector
   4   unitId   4   gUnit   4   clearSelection*   4      _ENV