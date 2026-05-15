<?php
declare(strict_types=1);

// HomepageScreenshot SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class HomepageScreenshotFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new HomepageScreenshotBaseFeature();
            case "test":
                return new HomepageScreenshotTestFeature();
            default:
                return new HomepageScreenshotBaseFeature();
        }
    }
}
