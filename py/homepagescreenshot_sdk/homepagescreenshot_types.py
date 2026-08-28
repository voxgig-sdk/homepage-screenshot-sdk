# Typed models for the HomepageScreenshot SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class GetScreenshotByDomain(TypedDict, total=False):
    domain: str
    id: str
    screenshot_url: str
    size: int
    timestamp: str


class GetScreenshotByDomainLoadMatchRequired(TypedDict):
    id: str


class GetScreenshotByDomainLoadMatch(GetScreenshotByDomainLoadMatchRequired, total=False):
    f: str
    s: int


class GetScreenshotByDomainAndDate(TypedDict, total=False):
    date: str
    domain: str
    screenshot_url: str
    size: int
    timestamp: str


class GetScreenshotByDomainAndDateLoadMatchRequired(TypedDict):
    date: str
    domain: str


class GetScreenshotByDomainAndDateLoadMatch(GetScreenshotByDomainAndDateLoadMatchRequired, total=False):
    f: str
    s: int
