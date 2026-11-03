package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/homepage-screenshot-sdk/go"
	"github.com/voxgig-sdk/homepage-screenshot-sdk/go/core"

	vs "github.com/voxgig-sdk/homepage-screenshot-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const get_screenshot_by_domain_and_dateEntityLiveStrict = true


func TestGetScreenshotByDomainAndDateEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GetScreenshotByDomainAndDate(nil)
		if ent == nil {
			t.Fatal("expected non-nil GetScreenshotByDomainAndDateEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.GetScreenshotByDomainAndDate(nil).Load(map[string]any{"date": 1, "domain": "x"}, nil)
		if sdkerr, ok := err.(*core.HomepageScreenshotError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := get_screenshot_by_domain_and_dateBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "get_screenshot_by_domain_and_date." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			t.Skip("Live coverage incomplete: the flow has no step to run")
			return
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		getScreenshotByDomainAndDateRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.get_screenshot_by_domain_and_date")))
		var getScreenshotByDomainAndDateRef01Data map[string]any
		if len(getScreenshotByDomainAndDateRef01DataRaw) > 0 {
			getScreenshotByDomainAndDateRef01Data = core.ToMapAny(getScreenshotByDomainAndDateRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = getScreenshotByDomainAndDateRef01Data

	})
}

func get_screenshot_by_domain_and_dateBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "get_screenshot_by_domain_and_date", "GetScreenshotByDomainAndDateTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read get_screenshot_by_domain_and_date test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse get_screenshot_by_domain_and_date test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"get_screenshot_by_domain_and_date01", "get_screenshot_by_domain_and_date02", "get_screenshot_by_domain_and_date03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_AND_DATE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_AND_DATE_ENTID": idmap,
		"HOMEPAGE_SCREENSHOT_TEST_LIVE":      "FALSE",
		"HOMEPAGE_SCREENSHOT_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_AND_DATE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["HOMEPAGE_SCREENSHOT_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewHomepageScreenshotSDK(core.ToMapAny(mergedOpts))
	}

	live := env["HOMEPAGE_SCREENSHOT_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["HOMEPAGE_SCREENSHOT_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
