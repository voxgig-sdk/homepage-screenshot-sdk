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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GetScreenshotByDomainEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HOMEPAGE_SCREENSHOT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HOMEPAGE_SCREENSHOT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HomepageScreenshotSDK.test();
        const ent = testsdk.GetScreenshotByDomain();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HOMEPAGE_SCREENSHOT_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'get_screenshot_by_domain.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "domain": { "a": true, "h": "Domain", "n": "domain", "r": false, "sh": "The requested domain", "t": "`$STRING`", "key$": "domain", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 1 }, "screenshot_url": { "a": true, "h": "Screenshot Url", "n": "screenshot_url", "r": false, "sh": "URL to the screenshot image", "t": "`$STRING`", "key$": "screenshot_url", "index$": 2 }, "size": { "a": true, "h": "Size", "n": "size", "r": false, "sh": "Size of the screenshot", "t": "`$INTEGER`", "key$": "size", "index$": 3 }, "timestamp": { "a": true, "h": "Timestamp", "n": "timestamp", "r": false, "sh": "When the screenshot was taken", "t": "`$STRING`", "key$": "timestamp", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "get_screenshot_by_domain", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /{domain}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "bbc.co.uk", "k": "param", "n": "id", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "png", "k": "query", "n": "f", "or": "f", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 2048, "k": "query", "n": "s", "or": "s", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/{domain}", "q": { "exist": ["f", "id", "s"] }, "r": { "param": { "domain": "id" } }, "s": [{ "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "get_screenshot_by_domain", "name__orig": "get_screenshot_by_domain", "Name": "GetScreenshotByDomain", "name_": "get_screenshot_by_domain", "name-": "get-screenshot-by-domain", "NAME": "GET_SCREENSHOT_BY_DOMAIN", "index$": 0 }, { "active": true, "entity": "get_screenshot_by_domain", "key$": "BasicGetScreenshotByDomainFlow", "kind": "basic", "name": "BasicGetScreenshotByDomainFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "get_screenshot_by_domain_ref01", "srcdatavar": "get_screenshot_by_domain_ref01_data", "suffix": "_dt0" }, "m": { "id": "get_screenshot_by_domain01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-get_screenshot_by_domain_ref01" } }], "index$": 0 }] }, 'GetScreenshotByDomain', { "GET /{domain}": { "protocol": "http", "parameters": [{ "name": "domain", "in": "path", "description": "The domain name to capture (e.g., bbc.co.uk)", "required": true, "schema": { "type": "string", "example": "bbc.co.uk" }, "index$": 0 }, { "name": "s", "in": "query", "description": "Size of the screenshot in pixels (width)", "required": false, "schema": { "type": "integer", "enum": [128, 256, 512, 2048], "default": 2048 }, "index$": 1 }, { "name": "f", "in": "query", "description": "Format of the response", "required": false, "schema": { "type": "string", "enum": ["png", "md", "json"], "default": "png" }, "index$": 2 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let get_screenshot_by_domain_ref01_data = Object.values(setup.data.existing.get_screenshot_by_domain)[0];
        // LOAD
        const get_screenshot_by_domain_ref01_ent = client.GetScreenshotByDomain();
        const get_screenshot_by_domain_ref01_match_dt0 = {};
        get_screenshot_by_domain_ref01_match_dt0.id = get_screenshot_by_domain_ref01_data.id;
        const get_screenshot_by_domain_ref01_data_dt0 = (await get_screenshot_by_domain_ref01_ent.load(get_screenshot_by_domain_ref01_match_dt0)).data();
        (0, node_assert_1.default)(get_screenshot_by_domain_ref01_data_dt0.id === get_screenshot_by_domain_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/get_screenshot_by_domain/GetScreenshotByDomainTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HomepageScreenshotSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['get_screenshot_by_domain01', 'get_screenshot_by_domain02', 'get_screenshot_by_domain03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_ENTID': idmap,
        'HOMEPAGE_SCREENSHOT_TEST_LIVE': 'FALSE',
        'HOMEPAGE_SCREENSHOT_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_ENTID'];
    const live = 'TRUE' === env.HOMEPAGE_SCREENSHOT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_ENTID'];
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
//# sourceMappingURL=GetScreenshotByDomainEntity.test.js.map