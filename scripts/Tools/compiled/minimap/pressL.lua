LuaS 

xV           (w@ĸî  if not canControl then return end
if not getParameter("pressed") then
	movingCamera = false
	return
end

if trySendSignal(getParameter("x"), getParameter("y"), "lookLandscape") then return end

movingCamera = getParameter("pressed")

if root.window_cursor == 1 and root.session_visual_placerScriptLeft == moveScript then
	sendUnits(getParameter("x"), getParameter("y"))
	root.session_visual.f_placerTurnOff()
	return
end

cameraToMinimap(getParameter("x"), getParameter("y"))
         :    @ "@    &  @@ A  $ "@  @  Á&  @A F@@  d @@ ÁĀ Ī Á  $ "     &  @@ A  $  @B B ĀB @@B  C F@C @   C F@@  d @@ ÁĀ Ī  $@  @B ĀC  D $@ &  @D F@@  d @@ ÁĀ Ī  $@  &     canControlgetParameterpressedmovingCamera trySendSignalxylookLandscaperootwindow_cursor        session_visual_placerScriptLeftmoveScript
sendUnitssession_visualf_placerTurnOffcameraToMinimap        :                                                                        	   	   	   	                                                                                                       _ENV