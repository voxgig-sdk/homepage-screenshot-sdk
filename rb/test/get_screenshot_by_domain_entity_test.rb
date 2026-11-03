# GetScreenshotByDomain entity test

require "minitest/autorun"
require "json"
require_relative "../HomepageScreenshot_sdk"
require_relative "runner"

class GetScreenshotByDomainEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = HomepageScreenshotSDK.test(nil, nil)
    ent = testsdk.GetScreenshotByDomain(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = HomepageScreenshotConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = HomepageScreenshotSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.GetScreenshotByDomain(nil).load({ "id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
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
    if setup[:live]
      { "get_screenshot_by_domain01" => "bbc.co.uk" }.each do |_live_key, _live_ex|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          setup[:idmap][_live_key] = _live_ex
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "get_screenshot_by_domain") do
        [{ "id" => setup[:idmap]["get_screenshot_by_domain01"] }]
      end
    end

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
      "id" => get_screenshot_by_domain_ref01_data["domain"],
    }
    get_screenshot_by_domain_ref01_data_dt0_loaded = get_screenshot_by_domain_ref01_ent.load(get_screenshot_by_domain_ref01_match_dt0, nil)
    get_screenshot_by_domain_ref01_data_dt0_load_result = Helpers.to_map(get_screenshot_by_domain_ref01_data_dt0_loaded.respond_to?(:data_get) ? get_screenshot_by_domain_ref01_data_dt0_loaded.data_get : get_screenshot_by_domain_ref01_data_dt0_loaded)
    assert !get_screenshot_by_domain_ref01_data_dt0_load_result.nil?
    assert_equal get_screenshot_by_domain_ref01_data_dt0_load_result["domain"], get_screenshot_by_domain_ref01_data["domain"]

  end
end

def get_screenshot_by_domain_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "get_screenshot_by_domain", "GetScreenshotByDomainTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  ((entity_data["existing"] || {})["get_screenshot_by_domain"] || {}).each_value do |rec|
    rec["domain"] = rec["id"] if rec.is_a?(Hash) && !rec["id"].nil?
  end

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

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
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
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
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
