LuaS �

xV           (w@��  assert(getParameter("interface") ~= nil)
local interface = root.interface[getParameter("interface")]
assert(interface ~= nil)
assert(interface.scripts_ready)
local script = tonumber(getParameter("script"))
assert(script ~= nil)

local runArray = {script}

local parameters = ""
for name, value in pairs(getParameters()) do
	if name ~= "interface" and name ~= "script" then
		table.insert(runArray, name)
		table.insert(runArray, value)
	end
end

interface.scripts_run = runArray
         >    @ F@@ ��  d� ��   �C@  C � $@  A �@ F@@ ��  d� @  F @ �@   ��@  � � d@ F @ �@A d@ F�A �@@ �� �  d�  � @ ��   ��@  � � �@ � � � � �@� �  AB F�B d� $ @�_����_��@�F�B G�� ��dB�F�B G�� � dB�)�  ���
���& �    assertgetParameter
interface rootscripts_ready	tonumberscriptpairsgetParameterstableinsertscripts_run        >                                                                                                                     
                                                                        	   
interface   >   script   >   	runArray&   >   parameters'   >   (for generator)+   <   (for state)+   <   (for control)+   <   name,   :   value,   :      _ENV