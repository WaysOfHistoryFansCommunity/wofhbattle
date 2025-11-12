root.interface_loading_active = false
root.interface_session_active = true

function getNodes()
  return root.interface_session_nodes
end

function timeToStr(value)
  if value < 10 then
    return "0" .. value
  end
  return value
end

accPortraits = {
  {
    73,
    74,
    75,
    76
  },
  {
    67,
    68,
    69,
    72
  },
  {
    77,
    78,
    79,
    80
  }
}
weapons = {
  {
    main = 59,
    distance = 56,
    period = 57,
    spread = 58,
    damageZone = {
      60,
      61,
      62
    },
    damageType = {
      63,
      64,
      65,
      66
    },
    damageSpecial = {
      {86, 106},
      {85, 107},
      {84, 108},
      {83, 109},
      {82, 110},
      {87, 111},
      {88, 112},
      {89, 113},
      {90, 114},
      {91, 115},
      {92, 116},
      {93, 117}
    }
  },
  {
    main = 11,
    distance = 160,
    period = 161,
    spread = 162,
    damageZone = {
      154,
      155,
      156
    },
    damageType = {
      153,
      157,
      158,
      159
    },
    damageSpecial = {
      {81, 119},
      {129, 131},
      {120, 122},
      {123, 125},
      {126, 128},
      {132, 134},
      {135, 137},
      {138, 140},
      {147, 149},
      {144, 146},
      {141, 143},
      {150, 152}
    }
  },
  {
    main = 163,
    distance = 207,
    period = 208,
    spread = 209,
    damageZone = {
      201,
      202,
      203
    },
    damageType = {
      204,
      200,
      205,
      206
    },
    damageSpecial = {
      {164, 166},
      {176, 178},
      {167, 169},
      {170, 172},
      {173, 175},
      {179, 181},
      {182, 184},
      {185, 187},
      {194, 196},
      {191, 193},
      {188, 190},
      {197, 199}
    }
  }
}
tagsWidgets = {
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55
}
local nodes = getNodes()
for i = 1, #accPortraits do
  local p = accPortraits[i]
  for j = 1, #p do
    nodes[p[j]].visible = false
  end
end
replaySpeeds = {
  12800,
  3200,
  800,
  200,
  50,
  25,
  12,
  6,
  3,
  1
}
local isReplay = root.session_gameplay_streamMode == 2
nodes[213].visible = isReplay
nodes[31].visible = isReplay
interfaceNamesInit = true
graphicsQuality = {
  {
    normalMaps = false,
    modelsMipLevel = 3,
    animationsInterpolation = false,
    anisotropy = 1,
    bloom = {main = 0, reflection = 0},
    landscape = {
      mipLevel = 4,
      specular = 0,
      method = 0,
      colorPriority = false,
      strength = false
    },
    showParticlesPriorityBlock = 1,
    antialiasing = false,
    fog = false,
    occlusion = 0,
    maxLightRadius = 0
  },
  {
    normalMaps = false,
    modelsMipLevel = 2,
    animationsInterpolation = false,
    anisotropy = 1,
    bloom = {main = 1, reflection = 0},
    landscape = {
      mipLevel = 3,
      specular = 0,
      method = 1,
      colorPriority = false,
      strength = false
    },
    showParticlesPriorityBlock = 100,
    antialiasing = false,
    fog = false,
    occlusion = 1,
    maxLightRadius = 0
  },
  {
    normalMaps = false,
    modelsMipLevel = 1,
    animationsInterpolation = true,
    anisotropy = 2,
    bloom = {main = 1, reflection = 0},
    landscape = {
      mipLevel = 2,
      specular = 1,
      method = 1,
      colorPriority = false,
      strength = false
    },
    shadow = {
      quality = 2,
      size = {2048, 2048},
      biasMin = 0.005
    },
    reflection = {
      level = 3,
      size = {512, 512}
    },
    showParticlesPriorityBlock = 100,
    antialiasing = false,
    fog = false,
    occlusion = 1,
    maxLightRadius = 200
  },
  {
    normalMaps = true,
    modelsMipLevel = 0,
    animationsInterpolation = true,
    anisotropy = 3,
    bloom = {main = 2, reflection = 0},
    landscape = {
      mipLevel = 1,
      specular = 1,
      method = 1,
      colorPriority = true,
      strength = false
    },
    shadow = {
      quality = 2,
      size = {4096, 4096},
      biasMin = 1.0E-4
    },
    reflection = {
      level = 4,
      size = {1024, 1024}
    },
    showParticlesPriorityBlock = 100,
    antialiasing = false,
    fog = false,
    occlusion = 1,
    maxLightRadius = 100000
  },
  {
    normalMaps = true,
    modelsMipLevel = 0,
    animationsInterpolation = true,
    anisotropy = 4,
    bloom = {main = 2, reflection = 0},
    landscape = {
      mipLevel = 0,
      specular = 1,
      method = 1,
      colorPriority = true,
      strength = true
    },
    shadow = {
      quality = 2,
      size = {4096, 4096},
      biasMin = 1.0E-4
    },
    reflection = {
      level = 4,
      size = {2048, 2048}
    },
    showParticlesPriorityBlock = 100,
    antialiasing = true,
    fog = false,
    occlusion = 2,
    maxLightRadius = 100000
  }
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
  if type(v) == "number" then
    return v ~= 0
  end
  if type(v) == "string" then
    if v == "true" then
      return true
    end
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
