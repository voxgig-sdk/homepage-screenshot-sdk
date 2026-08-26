# GetScreenshotByDomain entity test

require "minitest/autorun"
require "json"
require_relative "../HomepageScreenshot_sdk"
require_relative "runner"

class GetScreenshotByDomainEntityTest < Minitest::Test
  def test_create_instance
    testsdk = HomepageScreenshotSDK.test(nil, nil)
    ent = testsdk.GetScreenshotByDomain(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = get_screenshot_by_domain_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "get_screenshot_by_domain." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    get_screenshot_by_domain_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.get_screenshot_by_domain")))
    get_screenshot_by_domain_ref01_data = nil
    if get_screenshot_by_domain_ref01_data_raw.length > 0
      get_screenshot_by_domain_ref01_data = Helpers.to_map(get_screenshot_by_domain_ref01_data_raw[0][1])
    end

    # LOAD
    get_screenshot_by_domain_ref01_ent = client.GetScreenshotByDomain(nil)
    get_screenshot_by_domain_ref01_match_dt0 = {
      "id" => get_screenshot_by_domain_ref01_data["id"],
    }
    get_screenshot_by_domain_ref01_data_dt0_loaded = get_screenshot_by_domain_ref01_ent.load(get_screenshot_by_domain_ref01_match_dt0, nil)
    get_screenshot_by_domain_ref01_data_dt0_load_result = Helpers.to_map(get_screenshot_by_domain_ref01_data_dt0_loaded.respond_to?(:data_get) ? get_screenshot_by_domain_ref01_data_dt0_loaded.data_get : get_screenshot_by_domain_ref01_data_dt0_loaded)
    assert !get_screenshot_by_domain_ref01_data_dt0_load_result.nil?
    assert_equal get_screenshot_by_domain_ref01_data_dt0_load_result["id"], get_screenshot_by_domain_ref01_data["id"]

  end
end

def get_screenshot_by_domain_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "get_screenshot_by_domain", "GetScreenshotByDomainTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = HomepageScreenshotSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["get_screenshot_by_domain01", "get_screenshot_by_domain02", "get_screenshot_by_domain03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_ENTID" => idmap,
    "HOMEPAGE_SCREENSHOT_TEST_LIVE" => "FALSE",
    "HOMEPAGE_SCREENSHOT_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["HOMEPAGE_SCREENSHOT_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = HomepageScreenshotSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["HOMEPAGE_SCREENSHOT_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["HOMEPAGE_SCREENSHOT_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
