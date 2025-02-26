LuaS 

xV           (w@ÿã	  if getParameter("name") ~= "mapSignal" then return end
local data = fromJson(getParameter("data"))

local signalType = data.type
local p = positionVisualToScreen(data.x, data.y)
local n5 = getNodes()[5]
local npx = n5.localLeft
local npy = n5.localTop
local sx = n5.sizeX
local sy = n5.sizeY
local x = npx + p[1]
local y = npy + p[2]
local particles = getInterface().particles

if signalType == "lookLandscape" then
	particles.f_create(0, x, y, 0.9, npx, npy, sx, sy)
	particles.f_create(3, x, y, 0.9, npx, npy, sx, sy)
	particles.f_create(2, x, y, 0.9, npx, npy, sx, sy)
elseif signalType == "moveLandscape" then
	particles.f_create(0, x, y, 0.9, npx, npy, sx, sy)
	particles.f_create(3, x, y, 0.9, npx, npy, sx, sy)
	particles.f_create(1, x, y, 0.9, npx, npy, sx, sy)
elseif signalType == "openGate" then
	particles.f_create(8, x, y, 0.9, npx, npy, sx, sy)
	particles.f_create(9, x, y, 0.9, npx, npy, sx, sy)
elseif signalType == "closeGate" then
	particles.f_create(8, x, y, 0.9, npx, npy, sx, sy)
	particles.f_create(9, x, y, 0.9, npx, npy, sx, sy)
elseif signalType == "lookUnit" then
	particles.f_create(0, x, y, 0.9, npx, npy, sx, sy)
	particles.f_create(3, x, y, 0.9, npx, npy, sx, sy)
	particles.f_create(2, x, y, 0.9, npx, npy, sx, sy)
elseif signalType == "moveUnit" then
	particles.f_create(0, x, y, 0.9, npx, npy, sx, sy)
	particles.f_create(3, x, y, 0.9, npx, npy, sx, sy)
	particles.f_create(1, x, y, 0.9, npx, npy, sx, sy)
elseif signalType == "lookEnemy" then
	particles.f_create(6, x, y, 0.9, npx, npy, sx, sy)
	particles.f_create(7, x, y, 0.9, npx, npy, sx, sy)
elseif signalType == "moveEnemy" then
	particles.f_create(6, x, y, 0.9, npx, npy, sx, sy)
	particles.f_create(7, x, y, 0.9, npx, npy, sx, sy)
elseif signalType == "lookDeposit" then
	particles.f_create(4, x, y, 0.9, npx, npy, sx, sy)
	particles.f_create(5, x, y, 0.9, npx, npy, sx, sy)
elseif signalType == "moveDeposit" then
	particles.f_create(4, x, y, 0.9, npx, npy, sx, sy)
	particles.f_create(5, x, y, 0.9, npx, npy, sx, sy)
elseif signalType == "firecracker" then
	particles.f_create(10, x, y, 0.9, npx, npy, sx, sy)
elseif signalType == "fireworks" then
	particles.f_create(11, x, y, 0.9, npx, npy, sx, sy)
elseif signalType == "snowfall" then
	particles.f_create(12, x, y, 0.9, npx, npy, sx, sy)
elseif signalType == "cursedGround" then
	particles.f_create(18, x, y, 0.9, npx, npy, sx, sy)
elseif signalType == "wonder" then
	particles.f_create(13, x, y, 0.9, npx, npy, sx, sy)
end
         m   @ A@  $ _@   &  À@ F @   d  $  G@A A ÇÀA B ¤Æ@B ä ÇÂÁÂGÃAÃÇÃÂCGDMBBD ¤ DÀÄ ÇEC @ Á   @ ÀäBÇEÃ @ Á   @ ÀäBÇE @ Á   @ ÀäB K Æ ÇEC @ Á   @ ÀäBÇEÃ @ Á   @ ÀäBÇEÃ @ Á   @ ÀäBÀB@Æ  ÇE @ Á   @ ÀäBÇEÃ @ Á   @ ÀäB = Ç  ÇE @ Á   @ ÀäBÇEÃ @ Á   @ ÀäB@7@Ç ÇEC @ Á   @ ÀäBÇEÃ @ Á   @ ÀäBÇE @ Á   @ ÀäB /Ç ÇEC @ Á   @ ÀäBÇEÃ @ Á   @ ÀäBÇEÃ @ Á   @ ÀäBÀ&ÀÇ  ÇE @ Á   @ ÀäBÇEC @ Á   @ ÀäB !È  ÇE @ Á   @ ÀäBÇEC @ Á   @ ÀäB@ÀÈ  ÇE	 @ Á   @ ÀäBÇE @ Á   @ ÀäB@É  ÇE	 @ Á   @ ÀäBÇE @ Á   @ ÀäBÀÉ ÇEÃ	 @ Á   @ ÀäB Ê ÇEC
 @ Á   @ ÀäB@	Ê ÇEÃ
 @ Á   @ ÀäB  Ë ÇEC @ Á   @ ÀäBÀË @ÇEÃ @ Á   @ ÀäB&  0   getParametername
mapSignal	fromJsondatatypepositionVisualToScreenxy	getNodes       
localLeft	localTopsizeXsizeY              getInterface
particleslookLandscape	f_create        ÍÌÌÌÌÌì?       moveLandscape	openGate       	       
closeGate	lookUnit	moveUnit
lookEnemy              
moveEnemylookDeposit       moveDepositfirecracker
       
fireworks       	snowfall       cursedGround       wonder               m                                                                 	   
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      !   !   "   "   "   "   "   "   "   "   "   "   #   #   #   #   #   #   #   #   #   #   $   $   $   $   $   $   $   $   $   $   $   %   %   &   &   &   &   &   &   &   &   &   &   '   '   '   '   '   '   '   '   '   '   '   (   (   )   )   )   )   )   )   )   )   )   )   *   *   *   *   *   *   *   *   *   *   *   +   +   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   -   -   -   -   -   -   -   -   -   -   -   .   .   /   /   /   /   /   /   /   /   /   /   0   0   0   0   0   0   0   0   0   0   0   1   1   2   2   2   2   2   2   2   2   2   2   2   3   3   4   4   4   4   4   4   4   4   4   4   4   5   5   6   6   6   6   6   6   6   6   6   6   6   7   7   8   8   8   8   8   8   8   8   8   8   8   9   9   :   :   :   :   :   :   :   :   :   :   ;      data   m  signalType   m  p   m  n5   m  npx   m  npy   m  sx   m  sy   m  x   m  y   m  
particles   m     _ENV