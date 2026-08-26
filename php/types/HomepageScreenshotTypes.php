<?php
declare(strict_types=1);

// Typed models for the HomepageScreenshot SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** GetScreenshotByDomain entity data model. */
class GetScreenshotByDomain
{
    public ?string $domain = null;
    public ?string $id = null;
    public ?string $screenshot_url = null;
    public ?int $size = null;
    public ?string $timestamp = null;
}

/** Request payload for GetScreenshotByDomain#load. */
class GetScreenshotByDomainLoadMatch
{
    public string $id;
}

/** GetScreenshotByDomainAndDate entity data model. */
class GetScreenshotByDomainAndDate
{
    public ?string $date = null;
    public ?string $domain = null;
    public ?string $screenshot_url = null;
    public ?int $size = null;
    public ?string $timestamp = null;
}

/** Request payload for GetScreenshotByDomainAndDate#load. */
class GetScreenshotByDomainAndDateLoadMatch
{
    public string $date;
    public string $domain;
}

