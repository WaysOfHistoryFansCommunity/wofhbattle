LuaS �

xV           (w@��  local mult = tonumber(getParameter("mult"))


local function processWeapons(weapons)
	for i = 0, weapons.size - 1 do
		local damages = weapons[i].damage_damages
		local s = damages.size
		local d = 0
		while s > 0 do
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
             @ F@@ ��  d  $�  l   ��  � A �@�΀�� �@��� �A ����A����A � �� � � A �@��@ & � 
   	tonumbergetParametermult        rootattack_turret_size       attack_turretweaponattack_weapon               
   A   �@@ ��@��  h �G G���A��   ����_ A@�E  BBAJ���@́���g@�& �            size       damage_damages d                                             	   	   
   
   
                                    weapons       (for index)      (for limit)      (for step)      i      damages      s      d	         mult                                                                              mult      processWeapons      (for index)      (for limit)      (for step)      i         _ENV