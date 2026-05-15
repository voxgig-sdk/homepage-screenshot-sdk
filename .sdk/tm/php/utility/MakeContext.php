<?php
declare(strict_types=1);

// HomepageScreenshot SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class HomepageScreenshotMakeContext
{
    public static function call(array $ctxmap, ?HomepageScreenshotContext $basectx): HomepageScreenshotContext
    {
        return new HomepageScreenshotContext($ctxmap, $basectx);
    }
}
