LuaS �

xV           (w@�e  local dataStr = getParameter("data")
local data = fromJson(dataStr)
local buildings = data["buildings"]
local info = data["data"]

local zones0 = { 2, 3, 4, 6, 7, 9 }
local zones1 = { 11, 13, 15 }
local buildingTypes = { 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121 }


for i = 1, 3 do
	local id = buildings[i]
	if id > 0 then
		createBuilding(1, zones1[i], buildingTypes[id])
	end
end

for i = 1, 6 do
	local id = buildings[i + 3]
	if id > 0 then
		createBuilding(0, zones0[i], buildingTypes[id])
	end
end


local storage = root.dataStorage

local town = info["town"]
storage.set = {"townId", town[1]}
storage.set = {"townName", town[2]}

local account = info["account"]
storage.set = {"accountId", account[1]}
storage.set = {"accountName", account[2]}
storage.set = {"sex", account[3]}
storage.set = {"race", account[4]}

local country = info["country"]
if country ~= nil and #country >= 3 then
	storage.set = {"countryId", country[1]}
	storage.set = {"countryName", country[2]}
	storage.set = {"countryFlag", country[3]}
end

storage.set = {"noUnitsSec", "300"}
         {    @ A@  $� F�@ �   d� ��� �@�  A �A �� � A �B +A K��� ��  kA�� �A � A� � �B � A� � �C � A� � �A �A B AB ���ǂ �� ��F AC �����$C ���A � AB ���BA�� �� ��F A� ����$C �A��G �A���K � �BFkB �A��K �B �AkB �A��G��� �� C��B ʁ��� �	 ��B ʁ��� �B	 C��B ʁ��� ��	 ���B ʁ�����_ J@�� !������ C
 GCF�B ����� �
 GA�B ����� �
 GCA�B �����  AC �B ����& � .   getParameterdata	fromJson
buildings                                   	                            n       o       p       q       r       s       t       u       v       w       x       y                      createBuildingrootdataStoragetownsettownId	townNameaccount
accountIdaccountNamesexracecountry 
countryIdcountryNamecountryFlagnoUnitsSec300        {                                                                                                                                                                                                                                        !   !   !   !   !   "   "   "   "   "   #   #   #   #   #   $   $   $   $   $   &   '   '   '   '   '   (   (   (   (   (   )   )   )   )   )   *   *   *   *   *   -   -   -   -   -   -      dataStr   {   data   {   
buildings   {   info   {   zones0   {   zones1   {   buildingTypes#   {   (for index)&   0   (for limit)&   0   (for step)&   0   i'   /   id(   /   (for index)3   >   (for limit)3   >   (for step)3   >   i4   =   id6   =   storage@   {   townA   {   accountL   {   countrya   {      _ENV