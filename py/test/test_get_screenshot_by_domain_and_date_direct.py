# GetScreenshotByDomainAndDate direct test

import json
import os
import pytest

from homepagescreenshot_sdk.utility.voxgig_struct import voxgig_struct as vs
from homepagescreenshot_sdk import HomepageScreenshotSDK
from homepagescreenshot_sdk.core import helpers
from test import runner


# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


def _live_ok(result):
    status = helpers.to_int(result.get("status"))
    return result.get("err") is None and bool(result.get("ok")) and 200 <= status < 300


class TestGetScreenshotByDomainAndDateDirect:

    def test_should_direct_load_get_screenshot_by_domain_and_date(self):
        setup = _get_screenshot_by_domain_and_date_direct_setup({"id": "direct01"})
        _skip, _reason = runner.is_control_skipped("direct", "direct-load-get_screenshot_by_domain_and_date", "live" if setup["live"] else "unit")
        if _skip:
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        client = setup["client"]

        params = {}
        query = {}
        if setup["live"]:
            params["date"] = "2026-02"
            params["domain"] = "bbc.co.uk"
            pass
        else:
            params["date"] = "direct01"
            params["domain"] = "direct02"
            pass

        result = client.direct({
            "path": "{domain}/{date}",
            "method": "GET",
            "params": params,
            "query": query,
        })
        if setup["live"]:
            if not _live_ok(result):
                runner.live_miss(LIVE_STRICT, "Live load failed: " + runner.live_describe(result))
            if result.get("data") is None:
                runner.live_miss(LIVE_STRICT, "Live load returned no data: " + runner.live_describe(result))
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert result["data"] is not None
            if isinstance(result["data"], dict):
                assert result["data"]["id"] == "direct01"
            assert len(setup["calls"]) == 1



def _get_screenshot_by_domain_and_date_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_AND_DATE_ENTID": {},
        "HOMEPAGE_SCREENSHOT_TEST_LIVE": "FALSE",
    })

    live = env.get("HOMEPAGE_SCREENSHOT_TEST_LIVE") == "TRUE"

    if live:
        # sdk-test-control.json's test.client.options seeds the live
        # client; the generated fields below overwrite anything they name.
        merged_opts = dict(runner.live_client_options())
        merged_opts.update({
        })
        client = HomepageScreenshotSDK(merged_opts)
        idmap = env.get("HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_AND_DATE_ENTID")
        # A path parameter's example stands in for an id *_ENTID does not give.
        idmap = {"date01": "2026-02", "domain01": "bbc.co.uk",
                 **(idmap if isinstance(idmap, dict) else {})}
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": idmap if isinstance(idmap, dict) else {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = HomepageScreenshotSDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }
