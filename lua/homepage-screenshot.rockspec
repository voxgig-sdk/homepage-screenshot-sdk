package = "voxgig-sdk-homepage-screenshot"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/homepage-screenshot-sdk.git"
}
description = {
  summary = "HomepageScreenshot SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["homepage-screenshot_sdk"] = "homepage-screenshot_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
