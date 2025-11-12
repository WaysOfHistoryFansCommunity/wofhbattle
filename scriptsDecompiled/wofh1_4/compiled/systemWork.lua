if replayLoadingId ~= nil and root.projectLoaded then
  local loaded = root.system_loader.f_check(replayLoadingId)
  assert(loaded ~= nil)
  if loaded then
    root.session.f_startReplay(root.system_loader.f_get(replayLoadingId))
    replayLoadingId = nil
  end
end
if matchDescription ~= nil and root.projectLoaded then
  root.session.f_startNetwork(matchDescription[2], matchDescription[1], root.system_localFolder .. "/replay.rep")
  matchDescription = nil
end
