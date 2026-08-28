# frozen_string_literal: true

# Typed models for the HomepageScreenshot SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GetScreenshotByDomain entity data model.
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] screenshot_url
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
GetScreenshotByDomain = Struct.new(
  :domain,
  :id,
  :screenshot_url,
  :size,
  :timestamp,
  keyword_init: true
)

# Request payload for GetScreenshotByDomain#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] f
#   @return [String, nil]
#
# @!attribute [rw] s
#   @return [Integer, nil]
GetScreenshotByDomainLoadMatch = Struct.new(
  :id,
  :f,
  :s,
  keyword_init: true
)

# GetScreenshotByDomainAndDate entity data model.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] screenshot_url
#   @return [String, nil]
#
# @!attribute [rw] size
#   @return [Integer, nil]
#
# @!attribute [rw] timestamp
#   @return [String, nil]
GetScreenshotByDomainAndDate = Struct.new(
  :date,
  :domain,
  :screenshot_url,
  :size,
  :timestamp,
  keyword_init: true
)

# Request payload for GetScreenshotByDomainAndDate#load.
#
# @!attribute [rw] date
#   @return [String]
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] f
#   @return [String, nil]
#
# @!attribute [rw] s
#   @return [Integer, nil]
GetScreenshotByDomainAndDateLoadMatch = Struct.new(
  :date,
  :domain,
  :f,
  :s,
  keyword_init: true
)

