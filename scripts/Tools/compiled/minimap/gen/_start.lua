LuaS �

xV           (w@��  signalScript = getParameter("signalScript")
moveScript = getParameter("moveScript")
signalHotKey = 0

canControl = getParameter("canControl")
if canControl == nil then canControl = true end

local interface = getInterface()

if getParameter("targetName") ~= nil then
	interface.content_target[2].name = getParameter("targetName")
end

if getParameter("textureName") ~= nil then
	interface.content_texture[5].name = getParameter("textureName")
end

interface.content.f_resetTexture(1)
interface.content.f_resetTexture(5)

local posX = getParameter("x")
local posY = getParameter("y")
local sizeX = math.floor(getParameter("sx"))
local sizeY = math.floor(getParameter("sy"))

local landSizeX = root.session_gameplay_gameplay_scene[0].landscape_size_x
local landSizeY = root.session_gameplay_gameplay_scene[0].landscape_size_y
local landSizeK = landSizeX / landSizeY
local sizeK = sizeX / sizeY

if landSizeK > sizeK then
	local prev = sizeY
	sizeY = math.floor(sizeY * sizeK / landSizeK)
	posY = posY + (prev - sizeY) // 2
else
	local prev = sizeX
	sizeX = math.floor(sizeX * landSizeK / sizeK)
	posX = posX + (prev - sizeX) // 2
end

local nodes = getNodes()

local n = nodes[5]
n.sizeX = sizeX
n.sizeY = sizeY
n.localLeft = posX
n.localTop = posY
n.horizontalAlign = getParameter("horizontalAlign")
n.verticalAlign = getParameter("verticalAlign")

if getParameter("showFow") == false then
	nodes[2].visible = false
end

nodes[4].visible = getParameter("showTerritories")
nodes[6].visible = getParameter("showEnvs")

local minimap = root.session_render_minimap
minimap.f_initFowTarget("fowMinimapTarget", sizeX, sizeY)
if getParameter("targetName") == "objectsMinimap" then minimap.f_initObjectsTarget("objectsMinimap", sizeX, sizeY) end
if getParameter("targetName") == "minimapObjectsBig" then minimap.f_initObjectsBigTarget("minimapObjectsBig", sizeX, sizeY) end
minimap.f_initCameraTarget("cameraMinimap", sizeX, sizeY)
         �   @@ A   $�   �@@ A�  $�   � ��@@ A@ $�  ��@A �A   ���� B $�� F@@ �@ d� _�� @�G�B G�� �@@ �@ �� J� �F@@ �@ d� _�� @�G�C G�� �@@ �@ �� J� �G D G@� �� d@ G D G@� �� d@ F@@ �� d� �@@ �  �� �@E ǀ�A@ A� $ �  AE �EFA@ � d $�  FAF G��G�G���AF ��F�A�Gҁ�� ���@ �BE ��E����   ����B��@�@��BE ��E����� �  ���BM�� FBG d�� ����� �����B ������B@ � � ����B@ � � ���B@ 	 � @�@ �����BI����C@ A
 $� ���B�C@ A�
 $� ���BF ����AC ��� $C C@ AC $� �K ���A� ��� $C C@ AC $�  L �C�A ��� $C ��A� ��� $C & � 4   signalScriptgetParametermoveScriptsignalHotKey        canControl getInterfacetargetNamecontent_target       nametextureNamecontent_texture       contentf_resetTexture       xymathfloorsxsyroot session_gameplay_gameplay_scenelandscape_size_xlandscape_size_y	getNodessizeXsizeY
localLeft	localTophorizontalAlignverticalAlignshowFow visible       showTerritories       	showEnvssession_render_minimapf_initFowTargetfowMinimapTargetobjectsMinimapf_initObjectsTargetminimapObjectsBigf_initObjectsBigTargetf_initCameraTargetcameraMinimap        �                                                            
   
   
   
   
                                                                                                                                                                            !   !   !   !   !   !   "   "   "   "   $   %   %   %   %   %   %   &   &   &   )   )   +   ,   -   .   /   0   0   0   0   1   1   1   1   3   3   3   3   3   4   4   7   7   7   7   7   8   8   8   8   8   :   :   ;   ;   ;   ;   ;   <   <   <   <   <   <   <   <   <   <   =   =   =   =   =   =   =   =   =   =   >   >   >   >   >   >      
interface   �   posX4   �   posY7   �   sizeX=   �   sizeYC   �   
landSizeXG   �   
landSizeYK   �   
landSizeKL   �   sizeKM   �   prevP   Y   prev[   d   nodesf   �   ng   �   minimap�   �      _ENV