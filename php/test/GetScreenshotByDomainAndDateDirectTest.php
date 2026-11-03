<?php
declare(strict_types=1);

// GetScreenshotByDomainAndDate direct test

require_once __DIR__ . '/../homepagescreenshot_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;

class GetScreenshotByDomainAndDateDirectTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    private static function liveOk(array $result): bool
    {
        $status = Helpers::to_int($result["status"] ?? 0);
        return empty($result["err"]) && !empty($result["ok"]) && $status >= 200 && $status < 300;
    }

    public function test_direct_load_get_screenshot_by_domain_and_date(): void
    {
        $setup = get_screenshot_by_domain_and_date_direct_setup(["id" => "direct01"]);
        [$_shouldSkip, $_reason] = Runner::is_control_skipped("direct", "direct-load-get_screenshot_by_domain_and_date", $setup["live"] ? "live" : "unit");
        if ($_shouldSkip) {
            $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
            return;
        }
        $client = $setup["client"];

        $params = [];
        $query = [];
        if ($setup["live"]) {
            $params["date"] = "2026-02";
            $params["domain"] = "bbc.co.uk";
        } else {
            $params["date"] = "direct01";
            $params["domain"] = "direct02";
        }

        $result = $client->direct([
            "path" => "{domain}/{date}",
            "method" => "GET",
            "params" => $params,
            "query" => $query,
        ]);
        if ($setup["live"]) {
            if (!self::liveOk($result)) {
                Runner::live_miss(self::LIVE_STRICT, "Live load failed: " . Runner::live_describe($result));
            }
            if (null === ($result["data"] ?? null)) {
                Runner::live_miss(self::LIVE_STRICT, "Live load returned no data: " . Runner::live_describe($result));
            }
            $this->assertNotNull($result["data"]);
        } else {
            $this->assertArrayNotHasKey("err", $result);
            $this->assertTrue($result["ok"]);
            $this->assertEquals(200, Helpers::to_int($result["status"]));
            $this->assertNotNull($result["data"]);
            if (is_array($result["data"]) && isset($result["data"]["id"])) {
                $this->assertEquals("direct01", $result["data"]["id"]);
            }
            $this->assertCount(1, $setup["calls"]);
        }
    }

}


function get_screenshot_by_domain_and_date_direct_setup($mockres)
{
    Runner::load_env_local();

    $calls = new \ArrayObject();

    $env = Runner::env_override([
        "HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_AND_DATE_ENTID" => [],
        "HOMEPAGE_SCREENSHOT_TEST_LIVE" => "FALSE",
    ]);

    $live = $env["HOMEPAGE_SCREENSHOT_TEST_LIVE"] === "TRUE";

    if ($live) {
        // Merged so the generated fields win: sdk-test-control.json's
        // test.client.options adds to the live client, it does not redirect it.
        $merged_opts = array_merge(Runner::live_client_options(), [
        ]);
        $client = new HomepageScreenshotSDK($merged_opts);
        $idmap = $env["HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_AND_DATE_ENTID"] ?? [];
        // A path parameter's example stands in for an id *_ENTID does not give.
        $idmap = array_merge(["date01" => '2026-02', "domain01" => 'bbc.co.uk'],
            is_array($idmap) ? $idmap : []);
        return [
            "client" => $client,
            "calls" => $calls,
            "live" => true,
            "idmap" => is_array($idmap) ? $idmap : [],
        ];
    }

    $mock_fetch = function ($url, $init) use ($calls, $mockres) {
        $calls[] = ["url" => $url, "init" => $init];
        return [
            [
                "status" => 200,
                "statusText" => "OK",
                "headers" => [],
                "json" => function () use ($mockres) {
                    if ($mockres !== null) {
                        return $mockres;
                    }
                    return ["id" => "direct01"];
                },
                "body" => "mock",
            ],
            null,
        ];
    };

    $client = new HomepageScreenshotSDK([
        "base" => "http://localhost:8080",
        "system" => [
            "fetch" => $mock_fetch,
        ],
    ]);

    return [
        "client" => $client,
        "calls" => $calls,
        "live" => false,
        "idmap" => [],
    ];
}
