LuaS �

xV           (w@�s  local nodes = getNodes()

local layer = getParameter("layer")
local on = getParameter("on")

if layer == "camera" then
	nodes[1].visible = on
elseif layer == "fow" then
	nodes[2].visible = on
elseif layer == "units" then
	nodes[3].visible = on
elseif layer == "envs" then
	nodes[6].visible = on
elseif layer == "factions" then
	nodes[4].visible = on
end
         !    @ $�� F@@ ��  d� �@@ ��  ��  � � ��@A ʀ ����� � �� B ʀ �@�@� � �ǀB ʀ � ��� � �� C ʀ �� �@� @ �ǀC ʀ �& �    	getNodesgetParameterlayeroncamera       visiblefow       units       envs       	factions               !                                                	   	   	   
   
                                             nodes   !   layer   !   on   !      _ENV