<?php
declare(strict_types=1);

// HomepageScreenshot SDK utility: feature_add

class HomepageScreenshotFeatureAdd
{
    public static function call(HomepageScreenshotContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
