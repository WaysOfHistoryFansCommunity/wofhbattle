LuaS �

xV           (w@�  interfaceId = root.interface.f_getIndex(getParameter("interfaceName"))

signalScript = getParameter("signalScript")
signalHotKey = 0
movePlacer = false

envSignalTags = getParameter("envSignalTags")

cbInterfaceLeft = getParameter("cbInterfaceLeft")
cbScriptLeft = getParameter("cbScriptLeft")
cbInterfaceRight = getParameter("cbInterfaceRight")
cbScriptRight = getParameter("cbScriptRight")


addSelectionHotKey = getParameter("addSelectionHotKey")

zoomStep = getParameter("zoomStep")
if zoomStep == nil then zoomStep = 150 end

useFrame = getParameter("useFrame")
if useFrame == nil then useFrame = false end

useSingleSelect = getParameter("useSingleSelect")
if useSingleSelect == nil then useSingleSelect = 0 end

useSignals = getParameter("useSignals")
if useSignals == nil then useSignals = false end

useDrag = getParameter("useDrag")
if useDrag == nil then useDrag = 0 end


function getInterface()
	return root.interface[interfaceId]
end

function getNodes()
	return root.interface[interfaceId].nodes
end

function updateViewportSize()
	local vSes = root.session_visual
	if vSes == nil then return end
	local nodes = getNodes()
	local n = nodes[1]
	if n.sizeX > 0 and n.sizeY > 0 then
		vSes.f_setViewportSize(n.sizeX, n.sizeY)
	end
end

function initOffsets()
	local left = getParameter("left")
	local right = getParameter("right")
	local top = getParameter("top")
	local bottom = getParameter("bottom")
	if left == nil then left = 0 end
	if right == nil then right = 0 end
	if top == nil then top = 0 end
	if bottom == nil then bottom = 0 end
	assert(root.window_width >= 300)
	assert(root.window_height >= 300)
	assert(right + left < root.window_width)
	assert(bottom + top < root.window_height)

	local nodes = getNodes()
	local node = nodes[1]
	local sx = root.window_width - right - left
	node.sizeX = sx
	local sy = root.window_height - bottom - top
	node.sizeY = sy
	node.localLeft = left
	node.localTop = top

	updateViewportSize()
end

function getRelation(fromFaction, toFaction)
	return root.session_gameplay_gameplay_scene[0].relation[fromFaction][toFaction].value
end

function trySendSignal(signalType, x, y)
	if not useSignals then return false end
	if signalScript == nil then return false end
	if not getInterface().hotKeys.f_check(signalHotKey) then return false end
	local vSession = root.session_visual
	local myFactionId = vSession.currentFaction
	
	local unitId = vSession.scene[0].f_collideUnit(myFactionId, x, y)
	if unitId ~= nil then
		local unit = root.session_gameplay_gameplay_scene[0].unit[unitId]
		local rel = getRelation(myFactionId, unit.faction)
		local pos = unit.position
		local size = root.session_gameplay_gameplay_unitType[unit.type].radius / 256 / 30
		if rel == 1 then
			signalType = signalType.."Unit"
		else
			signalType = signalType.."Enemy"
		end
		assert(size > 0)
		vSession.script_scripts.f_run(signalScript, "x", pos.x / 256, "y", pos.y / 256, "size", size, "type", signalType, "unitId", unitId, "unitType", unit.type)
		return true
	end

	local envId = vSession.scene[0].f_collideEnv(myFactionId, x, y, 10000, envSignalTags)
	if envId ~= nil then
		local env = root.session_gameplay_gameplay_scene[0].env[envId]
		local pos = env.position
		local size = vSession.envType[env.type].radius / 30
		if size > 0 then
			vSession.script_scripts.f_run(signalScript, "x", pos.x / 256, "y", pos.y / 256, "size", size, "type", signalType.."Deposit", "envId", envId, "envType", env.type)
			return true
		end
	end
	
	local pos = vSession.scene[0].placer_position
	vSession.script_scripts.f_run(signalScript, "x", pos.x, "y", pos.y, "type", signalType.."Landscape")
	return true
end



local interface = getInterface()
interface.mapSceneToWidget = 1

initOffsets()
         `   @@ �@ �@ F A �@ d  $�    � A A� $�   � � A A� $�  �� A A  $�   � A A@ $�  �� A A� $�   � A A� $�  �� A A  $�   � A A@ $�  ��@D �D   ��Ĉ A A  $�   � E �D   ��B� A A@ $�  ��@E �D   �  A A� $�   ��E �D   ��B� A A� $�  ���E �D   � ,     �,@   ��,�    �,�   ��,    �,@  ���G $�� 
 ȏF�F d@� & � !   interfaceIdroot
interfacef_getIndexgetParameterinterfaceNamesignalScriptsignalHotKey        movePlacer envSignalTagscbInterfaceLeftcbScriptLeftcbInterfaceRightcbScriptRightaddSelectionHotKey	zoomStep �       	useFrameuseSingleSelectuseSignalsuseDraggetInterface	getNodesupdateViewportSizeinitOffsetsgetRelationtrySendSignalgetInterfacemapSceneToWidget               !   #         @ @@ F�@ @  &  & �    root
interfaceinterfaceId            "   "   "   "   "   #          _ENV %   '         @ @@ F�@ @  �@ &  & �    root
interfaceinterfaceIdnodes            &   &   &   &   &   &   '          _ENV )   1         @ @@ �@   �& � F�@ d�� � � �@A � �����A � �� �� B AAG�A�@�& � 	   rootsession_visual 	getNodes       sizeX        sizeYf_setViewportSize            *   *   +   +   +   ,   ,   -   .   .   .   .   .   .   /   /   /   /   1      vSes      nodes      n         _ENV 3   K     	L    @ A@  $� F @ ��  d� � @ ��  �� � @  � @A   �� @�   �A� @A  ��� @�  ��� �A FB GA�a@�  �CA  C� $A �A FB G��a@�  �CA  C� $A �A M� �B �AB`��  �CA  C� $A �A M���B ��B`��  �CA  C� $A C $�� GAC�B �AB�A � J���B ������΁�J���J �J����D $B� & �    getParameterleftrighttopbottom         assertrootwindow_width,      window_height	getNodes       sizeXsizeY
localLeft	localTopupdateViewportSize         L   4   4   4   5   5   5   6   6   6   7   7   7   8   8   8   9   9   9   :   :   :   ;   ;   ;   <   <   <   <   <   <   <   <   =   =   =   =   =   =   =   =   >   >   >   >   >   >   >   >   >   ?   ?   ?   ?   ?   ?   ?   ?   ?   A   A   B   C   C   C   C   D   E   E   E   E   F   G   H   J   J   K      left   L   right   L   top	   L   bottom   L   nodes<   L   node=   L   sxA   L   syF   L      _ENV M   O    	   � @ �@@��@��@�  �@ � A�  & �    root session_gameplay_gameplay_scene        	relationvalue         	   N   N   N   N   N   N   N   N   O      fromFaction    	   
toFaction    	      _ENV Q   v    �   � @ �@  @ ��   �  �@@ ��@ ��   �  ��@ 䀀 � ��@��A � �@  @ ��   �  ��A � �A�G��G��G�� ��   d� _������A �AC��B��C�A��C   GD䁀BDF�A G����DG��G�RB�R����� ��  � �� ��  �B ���F `@��  ��B  �� �B ����G�B@ C GCGRC��� ǃG�C�� @��� �   @��E ��D�B �� � �����B��H�  � @ �� �I �� _�@����A �A�����A�ǁ�B�G�����G��G�R�� @��@�����G�B@ C GCGRC��� ǃG�C�� @��� �  �	 ��	
 @ ��	 ����B �� � ǁ�����A���GFB@ �B �B�� G���� �  �
 ��$B � & & � +   useSignalssignalScript getInterfacehotKeysf_checksignalHotKeyrootsession_visualcurrentFactionscene        f_collideUnit session_gameplay_gameplay_sceneunitgetRelationfaction	position#session_gameplay_gameplay_unitTypetyperadius                     UnitEnemyassertscript_scriptsf_runxysizeunitId	unitTypef_collideEnv'      envSignalTagsenvenvTypeDepositenvIdplacer_position
Landscape         �   R   R   R   R   R   S   S   S   S   S   T   T   T   T   T   T   T   T   T   T   U   U   V   X   X   X   X   X   X   X   Y   Y   Z   Z   Z   Z   Z   [   [   [   [   \   ]   ]   ]   ]   ]   ]   ]   ^   ^   _   _   _   _   a   a   a   c   c   c   c   c   c   d   d   d   d   d   d   d   d   d   d   d   d   d   d   d   d   d   d   e   e   h   h   h   h   h   h   h   h   h   i   i   j   j   j   j   j   k   l   l   l   l   l   m   m   n   n   n   n   n   n   n   n   n   n   n   n   n   n   n   n   n   n   n   n   o   o   s   s   s   t   t   t   t   t   t   t   t   t   t   t   t   u   u   v      signalType    �   x    �   y    �   	vSession   �   myFactionId   �   unitId   �   unit%   T   rel)   T   pos*   T   size1   T   envId]   �   envd   �   pose   �   sizej   �   pos�   �      _ENV`                                                         	   	   	   	   
   
   
   
                                                                                                                                                               #   !   '   %   1   )   K   3   O   M   v   Q   z   z   {   }   }   }      
interface\   `      _ENV