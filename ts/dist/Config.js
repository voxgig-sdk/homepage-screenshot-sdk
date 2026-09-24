"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'HomepageScreenshot',
        slug: "homepage-screenshot",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://screenshotof.com",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            get_screenshot_by_domain: {},
            get_screenshot_by_domain_and_date: {},
        }
    };
    entity = {
        "get_screenshot_by_domain": {
            "fields": [
                {
                    "name": "domain",
                    "title": "Domain",
                    "type": "`$STRING`",
                    "short": "The requested domain"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "screenshot_url",
                    "title": "Screenshot Url",
                    "type": "`$STRING`",
                    "short": "URL to the screenshot image"
                },
                {
                    "name": "size",
                    "title": "Size",
                    "type": "`$INTEGER`",
                    "short": "Size of the screenshot"
                },
                {
                    "name": "timestamp",
                    "title": "Timestamp",
                    "type": "`$STRING`",
                    "short": "When the screenshot was taken"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "get_screenshot_by_domain",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/{domain}",
                            "segments": [
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "domain": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "bbc.co.uk"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "f",
                                        "orig": "f",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "png"
                                    },
                                    {
                                        "name": "s",
                                        "orig": "s",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 2048
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "f",
                                    "id",
                                    "s"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "get_screenshot_by_domain_and_date": {
            "fields": [
                {
                    "name": "date",
                    "title": "Date",
                    "type": "`$STRING`",
                    "short": "The date of the screenshot in YYYY-MM format"
                },
                {
                    "name": "domain",
                    "title": "Domain",
                    "type": "`$STRING`",
                    "short": "The requested domain"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "screenshot_url",
                    "title": "Screenshot Url",
                    "type": "`$STRING`",
                    "short": "URL to the screenshot image"
                },
                {
                    "name": "size",
                    "title": "Size",
                    "type": "`$INTEGER`",
                    "short": "Size of the screenshot"
                },
                {
                    "name": "timestamp",
                    "title": "Timestamp",
                    "type": "`$STRING`",
                    "short": "When the screenshot was taken"
                }
            ],
            "id": {
                "field": "id",
                "from": {
                    "date": "date",
                    "domain": "domain"
                },
                "name": "id",
                "parts": [
                    "domain",
                    "date"
                ],
                "sep": "/"
            },
            "name": "get_screenshot_by_domain_and_date",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/{domain}/{date}",
                            "segments": [
                                {
                                    "var": "domain"
                                },
                                {
                                    "var": "date"
                                }
                            ],
                            "parts": [
                                "{domain}",
                                "{date}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "date",
                                        "orig": "date",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "2026-02"
                                    },
                                    {
                                        "name": "domain",
                                        "orig": "domain",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "bbc.co.uk"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "f",
                                        "orig": "f",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "png"
                                    },
                                    {
                                        "name": "s",
                                        "orig": "s",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 2048
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "date",
                                    "domain",
                                    "f",
                                    "s"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map