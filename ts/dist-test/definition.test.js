"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "get_screenshot_by_domain",
        "accessor": "GetScreenshotByDomain",
        "op": "load",
        "method": "GET",
        "path": "/{domain}",
        "args": [
            {
                "name": "id",
                "wire": "domain",
                "value": "bbc.co.uk"
            }
        ],
        "select": {
            "f": "png",
            "s": 2048
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "image/png",
            "text/markdown",
            "application/json"
        ],
        "query": [
            "s",
            "f"
        ],
        "queryArgs": [
            {
                "name": "f",
                "wire": "f"
            },
            {
                "name": "s",
                "wire": "s"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "domain": "x",
            "screenshot_url": "x",
            "size": 1,
            "timestamp": "x"
        },
        "idField": "domain"
    },
    {
        "entity": "get_screenshot_by_domain_and_date",
        "accessor": "GetScreenshotByDomainAndDate",
        "op": "load",
        "method": "GET",
        "path": "/{domain}/{date}",
        "args": [
            {
                "name": "date",
                "wire": "date",
                "value": "2026-02"
            },
            {
                "name": "domain",
                "wire": "domain",
                "value": "bbc.co.uk"
            }
        ],
        "select": {
            "f": "png",
            "s": 2048
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "image/png",
            "text/markdown",
            "application/json"
        ],
        "query": [
            "s",
            "f"
        ],
        "queryArgs": [
            {
                "name": "f",
                "wire": "f"
            },
            {
                "name": "s",
                "wire": "s"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "domain": "x",
            "date": "x",
            "screenshot_url": "x",
            "size": 1,
            "timestamp": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map