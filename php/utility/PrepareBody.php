<?php
declare(strict_types=1);

// HomepageScreenshot SDK utility: prepare_body

class HomepageScreenshotPrepareBody
{
    public static function call(HomepageScreenshotContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
