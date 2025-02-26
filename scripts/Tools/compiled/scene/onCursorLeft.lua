LuaS �

xV           (w@�j  if getParameter("pressed") then
	if cbInterfaceLeft ~= nil then
		assert(cbScriptLeft ~= nil)
		local pos = root.session_visual_scene[0].placer_position
		root.interface[cbInterfaceLeft].scripts.f_run(cbScriptLeft, "button", "left", "press", true, "x", pos.x, "y", pos.y)
	end
	if trySendSignal("look", getParameter("x"), getParameter("y")) then return end
	if useFrame then root.session_visual.f_framingStart() end
	if useDrag == 1 then root.session_visual.f_dragCameraStart() end
	if useSingleSelect == 1 then
		local unitId = root.session_visual_scene[0].f_collideUnit(root.session_visual_currentFaction, getParameter("x"), getParameter("y"))
		if unitId ~= nil then
			local clearSelection = true
			if addSelectionHotKey ~= nil then
				clearSelection = not root.session_visual_hotKeys.f_check(addSelectionHotKey)
			end

			local unit = root.session_gameplay_gameplay_scene[0].unit[unitId]
			root.session_visual_scene[0].f_selectUnits(unitId.."/"..unit.instanceId, clearSelection)
		else
			root.session_visual_scene[0].f_selectUnits("")
		end
	end
else
	if cbInterfaceLeft ~= nil then
		assert(cbScriptLeft ~= nil)
		local pos = root.session_visual_scene[0].placer_position
		root.interface[cbInterfaceLeft].scripts.f_run(cbScriptLeft, "button", "left", "press", false, "x", pos.x, "y", pos.y)
	end
	if useFrame then
		local addSelection = false
		if addSelectionHotKey ~= nil then
			addSelection = root.session_visual_hotKeys.f_check(addSelectionHotKey)
		end

		root.session_visual.f_framingStop(addSelection, false)
	end
	if useDrag == 1 then root.session_visual.f_dragCameraStop() end
end
         �    @ A@  $� "   ���@ _�@ �� A F@A ��   �C@  C � $@ �A �A  B @B F�A G�� ��@ G�� G�� G � �@A �@ � A� �� � D AB �BD d@ �D A� � @ �  �� � @ A �  $�  "     �& �  E "   � ��A @E �E $@� �E  F � ��A @E @F $@� �F  F ���A �A  B �F F�A G � � @ �  �� � @ A �  $�  _�@ @�C � �@G _�@@���A ��G��G�@G �� [  ��A � H� B�@H�  ƀA ���� �ǀ�   A� �I�@� �@���F�A G�� G � G�� �@	 d@ ���@ _�@ �� A F@A ��   �C@  C � $@ �A �A  B @B F�A G�� ��@ G�� G�� G � �@A �@ � A� �  � D AB �BD d@  E "   ��   F@G _�� @�F�A G�� G�� �@G d�   � F�A G@� G�� �   �   d@��E  F � ��A @E �I $@� & � (   getParameterpressedcbInterfaceLeft assertcbScriptLeftrootsession_visual_scene        placer_position
interfacescriptsf_runbuttonleftpressxytrySendSignallook	useFramesession_visualf_framingStartuseDrag       f_dragCameraStartuseSingleSelectf_collideUnitsession_visual_currentFactionaddSelectionHotKeysession_visual_hotKeysf_check session_gameplay_gameplay_sceneunitf_selectUnits/instanceIdf_framingStopf_dragCameraStop        �                                                                                                                                                                     	   	   	   	   	   	   	   
   
   
                                                                                                                                                                                                                                                                     !   !   !   !   !   !   $   $   $   $   $   $   &   &   &   &   &   &   &   '      pos   #   unitIdM   o   clearSelectionP   h   unit^   h   pos~   �   addSelection�   �      _ENV