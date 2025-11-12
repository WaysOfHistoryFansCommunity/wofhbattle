local mult = tonumber(getParameter("mult"))

local function processWeapons(weapons)
  for i = 0, weapons.size - 1 do
    local damages = weapons[i].damage_damages
    local s = damages.size
    local d = 0
    while 0 < s do
      if damages[d] ~= nil then
        damages[d] = damages[d] * mult // 100
        s = s - 1
      end
      d = d + 1
    end
  end
end

for i = 0, root.attack_turret_size - 1 do
  processWeapons(root.attack_turret[i].weapon)
end
processWeapons(root.attack_weapon)
