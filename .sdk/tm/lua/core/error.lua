-- HomepageScreenshot SDK error

local HomepageScreenshotError = {}
HomepageScreenshotError.__index = HomepageScreenshotError


function HomepageScreenshotError.new(code, msg, ctx)
  local self = setmetatable({}, HomepageScreenshotError)
  self.is_sdk_error = true
  self.sdk = "HomepageScreenshot"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function HomepageScreenshotError:error()
  return self.msg
end


function HomepageScreenshotError:__tostring()
  return self.msg
end


return HomepageScreenshotError
