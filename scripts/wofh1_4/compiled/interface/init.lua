LuaS �

xV           (w@�   root.interface_loading_active = false
root.interface_session_active = true

function getNodes()
	return root.interface_session_nodes
end

function timeToStr(value)
	if value < 10 then return "0"..value end
	return value
end


accPortraits = 
{
	{73,74,75,76},
	{67,68,69,72},
	{77,78,79,80}
}

weapons =
{
	{main = 59, distance = 56, period = 57, spread = 58, damageZone = {60, 61, 62}, damageType = {63, 64, 65, 66}, damageSpecial = {{86,106},{85,107},{84,108},{83,109},{82,110},{87,111},{88,112},{89,113},{90,114},{91,115},{92,116},{93,117}} },
	{main = 11, distance = 160, period = 161, spread = 162, damageZone = {154, 155, 156}, damageType = {153, 157, 158, 159}, damageSpecial = {{81,119},{129,131},{120,122},{123,125},{126,128},{132,134},{135,137},{138,140},{147,149},{144,146},{141,143},{150,152}} },
	{main = 163, distance = 207, period = 208, spread = 209, damageZone = {201, 202, 203}, damageType = {204, 200, 205, 206}, damageSpecial = {{164,166},{176,178},{167,169},{170,172},{173,175},{179,181},{182,184},{185,187},{194,196},{191,193},{188,190},{197,199}} }
}

tagsWidgets = { 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55 }


local nodes = getNodes()

for i = 1, #accPortraits do
	local p = accPortraits[i]
	for j = 1, #p do
		nodes[p[j]].visible = false
	end
end


replaySpeeds = {12800,3200,800,200,50,25,12,6,3,1}

local isReplay = (root.session_gameplay_streamMode == 2)
nodes[213].visible = isReplay
nodes[31].visible = isReplay

interfaceNamesInit = true

graphicsQuality =
{
	{normalMaps = false, modelsMipLevel = 3, animationsInterpolation = false, anisotropy = 1, bloom = {main = 0, reflection = 0}, landscape = {mipLevel = 4, specular = 0, method = 0, colorPriority = false, strength = false}, showParticlesPriorityBlock = 1, antialiasing = false, fog = false, occlusion = 0, maxLightRadius = 0},
	{normalMaps = false, modelsMipLevel = 2, animationsInterpolation = false, anisotropy = 1, bloom = {main = 1, reflection = 0}, landscape = {mipLevel = 3, specular = 0, method = 1, colorPriority = false, strength = false}, showParticlesPriorityBlock = 100, antialiasing = false, fog = false, occlusion = 1, maxLightRadius = 0},
	{normalMaps = false, modelsMipLevel = 1, animationsInterpolation = true, anisotropy = 2, bloom = {main = 1, reflection = 0}, landscape = {mipLevel = 2, specular = 1, method = 1, colorPriority = false, strength = false}, shadow = {quality = 2, size = {2048, 2048}, biasMin = 0.005}, reflection = {level = 3, size = {512, 512}}, showParticlesPriorityBlock = 100, antialiasing = false, fog = false, occlusion = 1, maxLightRadius = 200},
	{normalMaps = true, modelsMipLevel = 0, animationsInterpolation = true, anisotropy = 3, bloom = {main = 2, reflection = 0}, landscape = {mipLevel = 1, specular = 1, method = 1, colorPriority = true, strength = false}, shadow = {quality = 2, size = {4096, 4096}, biasMin = 0.0001}, reflection = {level = 4, size = {1024, 1024}}, showParticlesPriorityBlock = 100, antialiasing = false, fog = false, occlusion = 1, maxLightRadius = 100000},
	{normalMaps = true, modelsMipLevel = 0, animationsInterpolation = true, anisotropy = 4, bloom = {main = 2, reflection = 0}, landscape = {mipLevel = 0, specular = 1, method = 1, colorPriority = true, strength = true}, shadow = {quality = 2, size = {4096, 4096}, biasMin = 0.0001}, reflection = {level = 4, size = {2048, 2048}}, showParticlesPriorityBlock = 100, antialiasing = true, fog = false, occlusion = 2, maxLightRadius = 100000}
}

unitNames = {
	localize("<*warrior>"),
	localize("<*slinger>"),
	localize("<*lancer>"),
	localize("<*axeman>"),
	localize("<*pikeman>"),
	localize("<*bombard>"),
	"",
	"",
	localize("<*metatel>"),
	"",
	"",
	localize("<*warElephant>"),
	localize("<*clubber>"),
	localize("<*rider>"),
	localize("<*armoredCar>"),
	localize("<*dragoon>"),
	localize("<*chariot>"),
	localize("<*submachine>"),
	localize("<*machinegunner>"),
	localize("<*lightTank>"),
	localize("<*boloThrower>"),
	localize("<*squadronCannon>"),
	localize("<*soldier>"),
	localize("<*longbow>"),
	localize("<*cuirassier>"),
	localize("<*musketeer>"),
	localize("<*jager>"),
	localize("<*cavalryMan>"),
	localize("<*halberdier>"),
	localize("<*crossbowMan>"),
	localize("<*grenadier>"),
	localize("<*t90>"),
	localize("<*knight>"),
	localize("<*samurai>"),
	"",
	localize("<*scout>"),
	localize("<*archer>"),
	localize("<*swordsman>"),
	localize("<*cannon>"),
	localize("<*mortair>"),
	localize("<*guardsman>"),
	localize("<*catapult>"),
	localize("<*rutta>"),
	localize("<*settler>"),
	localize("<*morgenshtern>"),
	localize("<*onagr>"),
	localize("<*trebuchet>"),
	localize("<*grenadethrower>"),
	"",
	"",
	localize("<*infantry>"),
	localize("<*mountedArcher>"),
	localize("<*mountedCrossbowMan>"),
	"",
	"",
	"",
	localize("<*worker>"),
	localize("<*militia>"),
	localize("<*rszo>"),
	localize("<*ifv>"),
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	"",
	localize("<*robodog>"),
	localize("<*sniper>"),
	"",
	localize("<*legioner>"),
	localize("<*jaguarWarrior>"),
	localize("<*chokonu>"),
	localize("<*motorcyclist>"),
	"",
	"",
	"",
	"",
	"",
	"",
	localize("<*tankJaguar>"),
	"",
	"",
	"",
	localize("<*doubleChariot>"),
	"",
	"",
	"",
	localize("<*impi>"),
	localize("<*mamlyuck>"),
	"",
	localize("<*landsknecht>"),
	localize("<*minomet>"),
	localize("<*heavyTank>"),
	localize("<*apc1>"),
	localize("<*bm13>"),
	localize("<*flamethrower>"),
	"",
	"",
	"",
	"",
	"",
	localize("<*camp1>"),
	localize("<*camp2>"),
	localize("<*camp3>"),
	localize("<*tower1>"),
	localize("<*tower2>"),
	localize("<*tower3>"),
	localize("<*tower4>"),
	localize("<*tower5>"),
	localize("<*tower6>"),
	localize("<*blockhous1>"),
	localize("<*blockhous2>"),
	localize("<*blockhous3>")
}

function toBool(v)
	if type(v) == "number" then return v ~= 0 end
	if type(v) == "string" then
		if v == "true" then return true end
		local n = tonumber(v)
		return n ~= nil and n ~= 0
	end
	return false
end

function setGraphicsQuality(level)
	local s = graphicsQuality[level + 1]
	local q = root.render_quality

	root.session_render_entities_units_canUseAnimationsInterpolation = s.animationsInterpolation
	if s.shadow == nil then
		q.shadow = 0
		q.shadowSize_x = 1
		q.shadowSize_y = 1
	else
		q.shadow = s.shadow.quality
		q.shadowSize_x = s.shadow.size[1]
		q.shadowSize_y = s.shadow.size[2]
		q.shadowBiasMin = s.shadow.biasMin
	end
	if s.reflection == nil then
		q.reflection = 0
		q.reflectionSize_x = 1
		q.reflectionSize_y = 1
	else
		q.reflection = s.reflection.level
		q.reflectionSize_x = s.reflection.size[1]
		q.reflectionSize_y = s.reflection.size[2]
	end
	q.anisotropy = s.anisotropy
	q.mainBloom = s.bloom.main
	q.reflectionBloom = s.bloom.reflection
	q.landscape_method = s.landscape.method
	q.landscape_colorPriority = s.landscape.colorPriority
	q.landscape_strength = s.landscape.strength
	q.landscape_specular = s.landscape.specular
	q.landscape_mipLevel = s.landscape.mipLevel
	q.modelsMipLevel = s.modelsMipLevel
	q.normalsEnabled = s.normalMaps
	q.showParticlesPriorityBlock = s.showParticlesPriorityBlock
	q.antialiasing = s.antialiasing
	q.fog = s.fog
	q.occlusion = s.occlusion
	q.maxLightRadius = s.maxLightRadius
	
	q.precipitation = false
	q.shadowBiasScale = 0.005
	q.polygonOffsetFactor = 3
	q.polygonOffsetUnits = 0
	
	root.storage_set = {"rQuality", level}
	
	root.render_applyQualityChanges = ""
end



local storage = root.storage
storage.setIfEmpty = {"rQuality", "3"}
nodes[211].widget_value = tonumber(storage.rQuality)

setGraphicsQuality(math.floor(tonumber(storage.rQuality)))

local n = nodes[14]
root.interface.f_create("/project/Tools/minimap", "minimap", 1, 1, "showTerritories", false, "showFow", false, "x", n.screenLeft, "y", n.screenTop, "sx", n.sizeX, "sy", n.sizeY, "horizontalAlign", n.horizontalAlign, "verticalAlign", n.verticalAlign, "targetName", "objectsMinimap", "textureName", "minimapEnvs")
root.interface_minimap_active = true
root.interface_minimap_priority = 50
         67   @ 
��� @ 
 ��,    ��,@    � �K  �  �@ � A� k@ �  �  A A� �� �@ �   AA �� �� �@ +@� �� �K� J�ŊJ ƋJ�ƌJ Ǎ� ��� � A �@�J����  �� � A	 �A	 �@ J����  �  �	 A
 �@  AA
 ��
 +A K ��
 � kA � �A � �A � � A �A  AB �� +B K �� � kB � �B � �B � � A �B  AC �� +C K �� � kC � �C � �C �@ J� ��� ��ϊ� Ћ�@Ќ��Ѝ� �� A �A �@������  � A� � �A �@ �����   A� �� +A K � �A kA � �� � �A �  AB �A  A� �� +B K � �B kB � �� � �B �  AC �B  A� �� +C K � �C kC � �� � �C �  AD �C �@ �� ��� ʀ؊��؋� ٌ�@ٍ�A� �� � +A�� �� AA �� ��  +A � �� K �A �� kA � ��  �A � B A� �A  A� � +B K �B �� kB � ��  �B � C A� �B  A� � +C K �C �� kC � ��   �C � D  A�  �C  A�  �! +D +A � �+@�  � �A�! ��! � " A" A�" ��" �# B# A�# ��# �$ +@� ��@A $�� A@$ ��A �  �@$ h@�F�A G��A$ ��B$ �� ��B��� ��@ɧ��g �K  � % �@% �% A� ��" ��% & AB& ��& �B$ k@ @��F @ G�� _ �   �C@  C � �@g �@ ɇ�g �@ � �ϋ ��� ʀ��ʀf�ʀ���@d��  
��
���� ��A 
���
���
�i�
���
�@�� ��@��ʀ@�ʀ��ʀi�ʀ��� 
���
g�
���
Ad�K�  JA�J���
A��KA J���J���JAd�J���J�@�
A�
��
�@�
���
Ad�
���KA J���JAd�J��Jgҋ�  �A䊊���J��ҋA ��ԊA�ՊAd֊��֊�@�J�ԋ�  �g�� . A. �A ���ۊ���J��ڋ�  ����� / A/ �A ����J���J��J�@�J���JAd�J��ًA ��Њ�iъ�ъ�f�ˁ  ��ʁ�ӊ����A �A���A���Ad����ʁ@׊����  �g� AB/ �B/ +B ���ʁ�܊���ˁ  ʁ�� A�/ ��/ +B ��ۊ��ӊ�׊�@؊��؊Adي���A ���ʁi����ʁj��  
�
������B 
���
B��
Bd�
��
A����  
g�K �B/ �B/ kB 
B��
�������  
���K �. �. kB 
B���������A�ʁ���g���٫@�� Ћ  ƀp �0 � �p A1 $� F�p �A1 d� ��p ��1 �� Ɓp �1 � �p A2 $� AB2 �B2 Ƃp �2 � C2 AC2 ��p ��2 �� ƃp 3 � �p AD3 $� F�p ��3 d� ��p ��3 �� Ƅp 4 � �p AE4 $� F�p ��4 d� ��p ��4 �� ƅp 5 � �p AF5 $� F�p ��5 d� ��p ��5 �� Ɔp 6 � �p AG6 $� F�p ��6 d� ��p ��6 �� Ƈp 7 � �p AH7 $� F�p ��7 d� ��p ��7 �� ƈp 	8 � �p AI8 $� AI2 ��p ��8 �� Ɖp �8 � �p A
9 $� F�p �J9 d� ��p ��9 �� Ɗp �9 � �p A: $� F�p �K: d� ��p ��: �� Ƌp �: � �p A; $� F�p �L; d� ��p ��; �� �L2 M2 �@ ƀp �; � �p A< $� F�p �A< d� �A2 �A2 B2 F�p ��< d� ��p ��< �� Ƃp = � �p AC= $� AC2 �C2 �C2 D2 AD2 �D2 �D2 E2 AE2 �E2 �E2 F2 AF2 �F2 �F2 �p A�= $� F�p ��= d� �G2 Ƈp > � �p AH> $� F�p ��> d� ��p ��> �� �H2 I2 AI2 �I2 �I2 J2 F�p �
? d� �J2 �J2 K2 F�p �K? d� �K2 �K2 L2 F�p ��? d� ��p ��? �� �L2 �p A@ $� �� ƀp A@ � �p A�@ $� F�p ��@ d� ��p �A �� Ɓp BA � B2 AB2 �B2 �B2 C2 F�p ��A d� ��p ��A �� ƃp B � �p ADB $� F�p ��B d� ��p ��B �� Ƅp C � �p AEC $� F�p ��C d� ��p ��C �� ƅp D � �p AFD $ ��  �����D �  � ��D ��  � � E ��  �@E �� ��E  A�E �F +A � ��@F ��  �F A�F FA ��E ��d� �@��D ��  G  AAG AA�F FA ��E ��d $  �@  ��G ��  E  A�G AAH AAAH ��H ��H �H AI �  �BI   A�I ��I ����J DJ �A�J ��J ����K EK �A�K ��K �����K �K �AL �FL ��L �L $A�E  AM 
�E  AAM 
��& � 6  rootinterface_loading_active interface_session_active	getNodes
timeToStraccPortraitsI       J       K       L       C       D       E       H       M       N       O       P       weaponsmain;       	distance8       period9       spread:       damageZone<       =       >       damageType?       @       A       B       damageSpecialV       j       U       k       T       l       S       m       R       n       W       o       X       p       Y       q       Z       r       [       s       \       t       ]       u              �       �       �       �       �       �       �       �       �       �       Q       w       �       �       x       z       {       }       ~       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       �       tagsWidgets-       .       /       0       1       2       3       4       5       6       7              visiblereplaySpeeds 2      �                                         session_gameplay_streamMode       �              interfaceNamesInitgraphicsQualitynormalMapsmodelsMipLevelanimationsInterpolationanisotropybloom        reflection
landscape	mipLevel       	specularmethodcolorPriority	strengthshowParticlesPriorityBlockantialiasingfog
occlusionmaxLightRadiusd       shadowqualitysize       biasMin{�G�zt?level              -C��6?       ��     
unitNames	localize<*warrior><*slinger>
<*lancer>
<*axeman><*pikeman><*bombard><*metatel><*warElephant><*clubber>	<*rider><*armoredCar><*dragoon><*chariot><*submachine><*machinegunner><*lightTank><*boloThrower><*squadronCannon><*soldier><*longbow><*cuirassier><*musketeer>	<*jager><*cavalryMan><*halberdier><*crossbowMan><*grenadier><*t90>
<*knight><*samurai>	<*scout>
<*archer><*swordsman>
<*cannon><*mortair><*guardsman><*catapult>	<*rutta><*settler><*morgenshtern>	<*onagr><*trebuchet><*grenadethrower><*infantry><*mountedArcher><*mountedCrossbowMan>
<*worker><*militia><*rszo><*ifv><*robodog>
<*sniper><*legioner><*jaguarWarrior><*chokonu><*motorcyclist><*tankJaguar><*doubleChariot><*impi><*mamlyuck><*landsknecht><*minomet><*heavyTank><*apc1><*bm13><*flamethrower>	<*camp1>	<*camp2>	<*camp3>
<*tower1>
<*tower2>
<*tower3>
<*tower4>
<*tower5>
<*tower6><*blockhous1><*blockhous2><*blockhous3>toBoolsetGraphicsQualityrootstoragesetIfEmpty	rQuality3�       widget_value	tonumbermathfloor       
interface	f_create/project/Tools/minimapminimap       showTerritoriesshowFowxscreenLefty
screenTopsxsizeXsysizeYhorizontalAlignverticalAligntargetNameobjectsMinimaptextureNameminimapEnvsinterface_minimap_activeinterface_minimap_priority                    @ @@ &  & �    rootinterface_session_nodes                               _ENV             @ � �A@  �   ]�� f  &  & �    
       0           	   	   	   	   	   	   
         value            �   �        F @ �   d� @�  ��@   �C@  C � f  F @ �   d� �� @� A @ �C � f  F@A �   d� _�� @ ���   ��@  � � �  C   f  & �    typenumber        stringtrue	tonumber              �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �      v        n         _ENV �   �    a   F @ �@@ G�� ��@ ��@ƀ@ A� � �ǀ� ��� �� B��@���@@�@�ǀ� ����� �ǀ� � ��@�����ǀ� � ��@��� �ǀ� ����� �� � ��� �� B��@���@@���� � ����� �� � � ��@������ � � ��@��� �� � �� �ǀ� �������ǀ� � ��� �ǀ� �������ǀ� �@��� �ǀ� ����� �ǀ� �@��� �ǀ� ����� �� � �� �ǀ� ������� ����� � �� ��@� ����ǀ� �� ���� �����@K���K��@L�� B�ƀ@  A �  +A � ��ƀ@ ʀ͚& � 7   graphicsQuality       rootrender_quality<session_render_entities_units_canUseAnimationsInterpolationanimationsInterpolationshadow         shadowSize_xshadowSize_yqualitysize       shadowBiasMinbiasMinreflectionreflectionSize_xreflectionSize_ylevelanisotropy
mainBloombloommainreflectionBloomlandscape_method
landscapemethodlandscape_colorPrioritycolorPrioritylandscape_strength	strengthlandscape_specular	specularlandscape_mipLevel	mipLevelmodelsMipLevelnormalsEnablednormalMapsshowParticlesPriorityBlockantialiasingfog
occlusionmaxLightRadiusprecipitation shadowBiasScale{�G�zt?polygonOffsetFactor       polygonOffsetUnitsstorage_set	rQualityrender_applyQualityChanges         a   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �      level    a   s   a   q   a      _ENV7                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               !   !   !   !   !   "   "   #   #   #   #   $   $   $   #   !   )   )   )   )   )   )   )   )   )   )   )   )   )   +   +   +   +   +   +   ,   ,   -   -   /   1   2   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   3   4   4   4   4   4   4   4   4   4   4   4   4   4   4   4   4   4   4   4   4   4   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   5   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   7   8   8   :   ;   ;   ;   <   <   <   =   =   =   >   >   >   ?   ?   ?   @   @   @   A   B   C   C   C   D   E   F   F   F   G   G   G   H   H   H   I   I   I   J   J   J   K   K   K   L   L   L   M   M   M   N   N   N   O   O   O   P   P   P   Q   Q   Q   R   R   R   S   S   S   T   T   T   U   U   U   V   V   V   W   W   W   X   X   X   Y   Y   Y   Z   Z   Z   [   [   [   \   \   \   ]   ^   ^   ^   _   _   _   `   `   `   a   a   a   b   b   b   c   c   c   d   d   d   e   e   e   f   f   f   g   g   g   h   h   h   i   i   i   j   j   j   k   l   l   m   m   m   n   n   n   o   o   o   p   q   r   s   s   s   t   t   t   u   u   u   v   v   v   w   x   y   z   {   |   }   ~      �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �   �      nodes�   7  (for index)    (for limit)    (for step)    i    p    (for index)	    (for limit)	    (for step)	    j
    	isReplay"  7  storage�  7  n	  7     _ENV