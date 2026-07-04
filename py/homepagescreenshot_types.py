# Typed models for the HomepageScreenshot SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class GetScreenshotByDomain:
    domain: Optional[str] = None
    screenshot_url: Optional[str] = None
    size: Optional[int] = None
    timestamp: Optional[str] = None


@dataclass
class GetScreenshotByDomainLoadMatch:
    id: str


@dataclass
class GetScreenshotByDomainAndDate:
    date: Optional[str] = None
    domain: Optional[str] = None
    screenshot_url: Optional[str] = None
    size: Optional[int] = None
    timestamp: Optional[str] = None


@dataclass
class GetScreenshotByDomainAndDateLoadMatch:
    date: str
    domain: str

