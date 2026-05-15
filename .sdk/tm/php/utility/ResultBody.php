<?php
declare(strict_types=1);

// HomepageScreenshot SDK utility: result_body

class HomepageScreenshotResultBody
{
    public static function call(HomepageScreenshotContext $ctx): ?HomepageScreenshotResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
