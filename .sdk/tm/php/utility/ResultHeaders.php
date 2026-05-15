<?php
declare(strict_types=1);

// HomepageScreenshot SDK utility: result_headers

class HomepageScreenshotResultHeaders
{
    public static function call(HomepageScreenshotContext $ctx): ?HomepageScreenshotResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
