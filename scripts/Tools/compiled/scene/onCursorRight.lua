LuaS �

xV           (w@��  if getParameter("pressed") then
	if cbInterfaceRight ~= nil then
		assert(cbScriptRight ~= nil)
		local pos = root.session_visual_scene[0].placer_position
		root.interface[cbInterfaceRight].scripts.f_run(cbScriptRight, "button", "right", "press", true, "x", pos.x, "y", pos.y)
	end
	if trySendSignal("move", getParameter("x"), getParameter("y")) then return end
	if useFrame then
		local vSession = root.session_visual
		local scene = vSession.scene[0]
		if scene.selection_units_list_size > 0 then
			if not scene.placer_on then
				local controlledFactions = vSession.controlledFactions_value
				local selectedMovableUnits = scene.f_selectedUnitsFilter(controlledFactions, true)
				movePlacer = true

				local appearance = 31
				if #selectedMovableUnits == 0 then appearance = nil end
				vSession.f_placerFree(appearance, 200, nil, "", nil, nil, "", nil, "", 0, 0, 0, 0, true)
			end
		end
	end
	if useDrag == 2 then root.session_visual.f_dragCameraStart() end
else
	if cbInterfaceRight ~= nil then
		assert(cbScriptRight ~= nil)
		local pos = root.session_visual_scene[0].placer_position
		root.interface[cbInterfaceRight].scripts.f_run(cbScriptRight, "button", "right", "press", false, "x", pos.x, "y", pos.y)
	end
	local command = root.session_gameplay_command
	if command ~= nil and root.session_visual_scene[0].selection_units_list_size == 0 then
		local res = root.session_visual.f_collideBuildPlan(getParameter("x"), getParameter("y"))
		if res ~= nil then
			command.f_buildPlanRemove(res[1], res[2])
		end
	end
	if useFrame and movePlacer then
		local vSession = root.session_visual
		if not vSession.scene[0].placer_isRotated then
			vSession.f_collideObjectAndSendCommand()
		else
			if not vSession.f_sendMoveCommand() then
				vSession.f_collideObjectAndSendCommand()
			end
		end
		vSession.f_placerTurnOff()
		movePlacer = false
	end
	if useDrag == 2 then root.session_visual.f_dragCameraStop() end
end
         �    @ A@  $� "    ��@ _�@ �� A F@A ��   �C@  C � $@ �A �A  B @B F�A G�� ��@ G�� G�� G � �@A �@ � A� �� � D AB �BD d@ �D A� � @ �  �� � @ A �  $�  "     �& �  E "   ���A @E G�E G � ���  � � �� � �@  @��@F ǀ�   C� 䀀 ǍA \� �  �  G�G � ��   A ��  D  � �  A � �� dA�@H �H  ��A @E �H $@� ���@ _�@ �� A F@A ��   �C@  C � $@ �A �A  B @B F�A G�� ��@ G�� G�� G � �@A �@ � A� �  � D AB �BD d@ �A  I _�@ @�F�A G�� G � G��  � ��F�A G@� G@� � @ �  �� � @ A �  d�  _�� � ���I ��� �� �@�F E b   @�F�F b   ��F�A G@� ��� � B� J�@  � ��@� �@� @���� ��� �@  @ ��@� �@� ��� �@�  ˍF@H �� � �F�A G@� G@� d@� & � .   getParameterpressedcbInterfaceRight assertcbScriptRightrootsession_visual_scene        placer_position
interfacescriptsf_runbuttonrightpressxytrySendSignalmove	useFramesession_visualsceneselection_units_list_size
placer_oncontrolledFactions_valuef_selectedUnitsFiltermovePlacer       f_placerFree�       useDrag       f_dragCameraStartsession_gameplay_commandf_collideBuildPlanf_buildPlanRemove       placer_isRotatedf_collideObjectAndSendCommandf_sendMoveCommandf_placerTurnOff f_dragCameraStop        �                                                                                                                                                         	   	   
   
                                                                                                                                                                                                                                                                                           !   !   "   "   "   "   %   %   %   %   %   %   &   &   '   '   '   '   '   (   (   (   *   *   *   *   +   +   .   .   /   1   1   1   1   1   1   1   2   
   pos   #   	vSession4   V   scene6   V   controlledFactions=   V   selectedMovableUnitsA   V   appearanceC   V   posl   |   command~   �   res�   �   	vSession�   �      _ENV