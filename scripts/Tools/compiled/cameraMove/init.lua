LuaS �

xV           (w@��  fastMove = tonumber(getParameter("fastMove"))
if fastMove == nil then fastMove = 3 end

bordersScroll = getParameter("bordersScroll")
if bordersScroll == nil then bordersScroll = true end
moveRight = 0
moveForward = 0

function toBool(v)
	if type(v) == "number" then return v ~= 0 end
	if type(v) == "string" then
		if v == "true" then return true end
		local n = tonumber(v)
		return n ~= nil and n ~= 0
	end
	return false
end
            @@ F�@ �   d  $�    � @ �@   � A��@ A@ $�  ��@A �@   ����  ,     �& �    	fastMove	tonumbergetParameter        bordersScroll
moveRight        moveForwardtoBool        	           F @ �   d� @�  ��@   �C@  C � f  F @ �   d� �� @� A @ �C � f  F@A �   d� _�� @ ���   ��@  � � �  C   f  & �    typenumber        stringtrue	tonumber              
   
   
   
   
   
   
   
   
   
                                                                        v        n         _ENV                                                                  	             _ENV