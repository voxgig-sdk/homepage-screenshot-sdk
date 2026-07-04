-- Typed models for the HomepageScreenshot SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GetScreenshotByDomain
---@field domain? string
---@field screenshot_url? string
---@field size? number
---@field timestamp? string

---@class GetScreenshotByDomainLoadMatch
---@field id string

---@class GetScreenshotByDomainAndDate
---@field date? string
---@field domain? string
---@field screenshot_url? string
---@field size? number
---@field timestamp? string

---@class GetScreenshotByDomainAndDateLoadMatch
---@field date string
---@field domain string

local M = {}

return M
