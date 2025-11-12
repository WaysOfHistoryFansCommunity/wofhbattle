fastMove = tonumber(getParameter("fastMove"))
if fastMove == nil then
  fastMove = 3
end
bordersScroll = getParameter("bordersScroll")
if bordersScroll == nil then
  bordersScroll = true
end
moveRight = 0
moveForward = 0

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
