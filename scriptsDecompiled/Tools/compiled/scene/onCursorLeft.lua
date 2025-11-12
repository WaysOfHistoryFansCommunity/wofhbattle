if getParameter("pressed") then
  if cbInterfaceLeft ~= nil then
    assert(cbScriptLeft ~= nil)
    local pos = root.session_visual_scene[0].placer_position
    root.interface[cbInterfaceLeft].scripts.f_run(cbScriptLeft, "button", "left", "press", true, "x", pos.x, "y", pos.y)
  end
  if trySendSignal("look", getParameter("x"), getParameter("y")) then
    return
  end
  if useFrame then
    root.session_visual.f_framingStart()
  end
  if useDrag == 1 then
    root.session_visual.f_dragCameraStart()
  end
  if useSingleSelect == 1 then
    local unitId = root.session_visual_scene[0].f_collideUnit(root.session_visual_currentFaction, getParameter("x"), getParameter("y"))
    if unitId ~= nil then
      local clearSelection = true
      if addSelectionHotKey ~= nil then
        clearSelection = not root.session_visual_hotKeys.f_check(addSelectionHotKey)
      end
      local unit = root.session_gameplay_gameplay_scene[0].unit[unitId]
      root.session_visual_scene[0].f_selectUnits(unitId .. "/" .. unit.instanceId, clearSelection)
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
  if useDrag == 1 then
    root.session_visual.f_dragCameraStop()
  end
end
