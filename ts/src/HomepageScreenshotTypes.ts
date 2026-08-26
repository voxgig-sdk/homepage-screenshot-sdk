// Typed models for the HomepageScreenshot SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GetScreenshotByDomain {
  domain?: string
  id?: string
  screenshot_url?: string
  size?: number
  timestamp?: string
}

export interface GetScreenshotByDomainLoadMatch {
  id: string
}

export interface GetScreenshotByDomainAndDate {
  date?: string
  domain?: string
  screenshot_url?: string
  size?: number
  timestamp?: string
}

export interface GetScreenshotByDomainAndDateLoadMatch {
  date: string
  domain: string
}

