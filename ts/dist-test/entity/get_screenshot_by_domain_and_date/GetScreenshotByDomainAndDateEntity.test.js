"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GetScreenshotByDomainAndDateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HOMEPAGE_SCREENSHOT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HOMEPAGE_SCREENSHOT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HomepageScreenshotSDK.test();
        const ent = testsdk.GetScreenshotByDomainAndDate();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HOMEPAGE_SCREENSHOT_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'get_screenshot_by_domain_and_date.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "date", "req": false, "short": "The date of the screenshot in YYYY-MM format", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "domain", "req": false, "short": "The requested domain", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "screenshot_url", "req": false, "short": "URL to the screenshot image", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "size", "req": false, "short": "Size of the screenshot", "type": "`$INTEGER`", "index$": 4 }, { "active": true, "name": "timestamp", "req": false, "short": "When the screenshot was taken", "type": "`$STRING`", "index$": 5 }], "id": { "field": "id", "from": { "date": "date", "domain": "domain" }, "name": "id", "parts": ["domain", "date"], "sep": "/" }, "name": "get_screenshot_by_domain_and_date", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "2026-02", "kind": "param", "name": "date", "orig": "date", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "bbc.co.uk", "kind": "param", "name": "domain", "orig": "domain", "reqd": true, "type": "`$STRING`", "index$": 1 }], "query": [{ "active": true, "example": "png", "kind": "query", "name": "f", "orig": "f", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": 2048, "kind": "query", "name": "s", "orig": "s", "reqd": false, "type": "`$INTEGER`", "index$": 1 }] }, "contract": { "id": "GET /{domain}/{date}", "json": "{\"operationId\":\"getScreenshotByDomainAndDate\",\"parameters\":[{\"description\":\"The domain name to capture (e.g., bbc.co.uk)\",\"in\":\"path\",\"name\":\"domain\",\"required\":true,\"schema\":{\"example\":\"bbc.co.uk\",\"type\":\"string\"}},{\"description\":\"Date in YYYY-MM format (e.g., 2024-01, 2026-02)\",\"in\":\"path\",\"name\":\"date\",\"required\":true,\"schema\":{\"example\":\"2026-02\",\"pattern\":\"^\\\\d{4}-(0[1-9]|1[0-2])$\",\"type\":\"string\"}},{\"description\":\"Size of the screenshot in pixels (width)\",\"in\":\"query\",\"name\":\"s\",\"required\":false,\"schema\":{\"default\":2048,\"enum\":[128,256,512,2048],\"type\":\"integer\"}},{\"description\":\"Format of the response\",\"in\":\"query\",\"name\":\"f\",\"required\":false,\"schema\":{\"default\":\"png\",\"enum\":[\"png\",\"md\",\"json\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"date\":{\"description\":\"The date of the screenshot in YYYY-MM format\",\"type\":\"string\"},\"domain\":{\"description\":\"The requested domain\",\"type\":\"string\"},\"screenshot_url\":{\"description\":\"URL to the screenshot image\",\"type\":\"string\"},\"size\":{\"description\":\"Size of the screenshot\",\"type\":\"integer\"},\"timestamp\":{\"description\":\"When the screenshot was taken\",\"type\":\"string\"}},\"type\":\"object\"}},\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}},\"text/markdown\":{\"schema\":{\"description\":\"Markdown representation of the screenshot information\",\"type\":\"string\"}}},\"description\":\"Successful response with screenshot from the specified date\"},\"404\":{\"description\":\"Domain not found or screenshot not available for the specified date\"},\"429\":{\"description\":\"Rate limit exceeded (1,000 requests per day without API key)\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/{domain}/{date}", "segments": [{ "var": "domain" }, { "var": "date" }], "select": { "exist": ["date", "domain", "f", "s"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "get_screenshot_by_domain_and_date", "name__orig": "get_screenshot_by_domain_and_date", "Name": "GetScreenshotByDomainAndDate", "name_": "get_screenshot_by_domain_and_date", "name-": "get-screenshot-by-domain-and-date", "NAME": "GET_SCREENSHOT_BY_DOMAIN_AND_DATE", "index$": 1 }, { "active": true, "entity": "get_screenshot_by_domain_and_date", "key$": "BasicGetScreenshotByDomainAndDateFlow", "kind": "basic", "name": "BasicGetScreenshotByDomainAndDateFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "get_screenshot_by_domain_and_date_ref01", "srcdatavar": "get_screenshot_by_domain_and_date_ref01_data", "suffix": "_dt0" }, "match": { "domain": "domain01", "id": "get_screenshot_by_domain_and_date01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-get_screenshot_by_domain_and_date_ref01" } }], "index$": 0 }] }, 'GetScreenshotByDomainAndDate');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let get_screenshot_by_domain_and_date_ref01_data = Object.values(setup.data.existing.get_screenshot_by_domain_and_date)[0];
        // LOAD
        const get_screenshot_by_domain_and_date_ref01_ent = client.GetScreenshotByDomainAndDate();
        const get_screenshot_by_domain_and_date_ref01_match_dt0 = {};
        get_screenshot_by_domain_and_date_ref01_match_dt0.id = get_screenshot_by_domain_and_date_ref01_data.id;
        const get_screenshot_by_domain_and_date_ref01_data_dt0 = (await get_screenshot_by_domain_and_date_ref01_ent.load(get_screenshot_by_domain_and_date_ref01_match_dt0)).data();
        (0, node_assert_1.default)(get_screenshot_by_domain_and_date_ref01_data_dt0.id === get_screenshot_by_domain_and_date_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/get_screenshot_by_domain_and_date/GetScreenshotByDomainAndDateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HomepageScreenshotSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['get_screenshot_by_domain_and_date01', 'get_screenshot_by_domain_and_date02', 'get_screenshot_by_domain_and_date03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_AND_DATE_ENTID': idmap,
        'HOMEPAGE_SCREENSHOT_TEST_LIVE': 'FALSE',
        'HOMEPAGE_SCREENSHOT_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_AND_DATE_ENTID'];
    const live = 'TRUE' === env.HOMEPAGE_SCREENSHOT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_AND_DATE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.HomepageScreenshotSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.HOMEPAGE_SCREENSHOT_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=GetScreenshotByDomainAndDateEntity.test.js.map