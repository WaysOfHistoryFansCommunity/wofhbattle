LuaS 

xV           (w@’Ó  if replayLoadingId ~= nil and root.projectLoaded then
	local loaded = root.system_loader.f_check(replayLoadingId)
	assert(loaded ~= nil)
	if loaded then
		root.session.f_startReplay(root.system_loader.f_get(replayLoadingId))
		replayLoadingId = nil
	end
end

if matchDescription ~= nil and root.projectLoaded then
	root.session.f_startNetwork(matchDescription[2], matchDescription[1], root.system_localFolder.."/replay.rep")
	matchDescription = nil
end
         3    @ _@@ @ Ą@ "   @  A @A F @ $ FA @@   @    d@ "   @F@ GĄĮ G Ā @  A@BĘ @ ¤  d@  @@B _@@  @ Ą@ "    @ ĄA ĄB FB G Ć B @CĘ@ ĒĆĮ Ż $@ @@&     replayLoadingId rootprojectLoadedsystem_loaderf_checkassertsessionf_startReplayf_getmatchDescriptionf_startNetwork              system_localFolder/replay.rep        3                                                                                             
   
   
   
   
   
   
                                                loaded         _ENV