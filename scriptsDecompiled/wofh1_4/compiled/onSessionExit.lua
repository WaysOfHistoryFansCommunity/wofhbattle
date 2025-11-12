local reason = getParameter("reason")
if reason == 1 or reason == 3 then
  root.interface.f_create("project/wofh1_4/interfaces/outdated", "outdated", 1, 1)
  root.interface_outdated_active = true
end
