# HomepageScreenshot SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "HomepageScreenshot",
            "slug": "homepage-screenshot",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://screenshotof.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "get_screenshot_by_domain": {},
                "get_screenshot_by_domain_and_date": {},
            },
        },
        "entity": {
      "get_screenshot_by_domain": {
        "fields": [
          {
            "name": "domain",
            "title": "Domain",
            "type": "`$STRING`",
            "short": "The requested domain",
          },
          {
            "name": "screenshot_url",
            "title": "Screenshot Url",
            "type": "`$STRING`",
            "short": "URL to the screenshot image",
          },
          {
            "name": "size",
            "title": "Size",
            "type": "`$INTEGER`",
            "short": "Size of the screenshot",
          },
          {
            "name": "timestamp",
            "title": "Timestamp",
            "type": "`$STRING`",
            "short": "When the screenshot was taken",
          },
        ],
        "id": {
          "field": "domain",
          "name": "id",
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
                    "var": "id",
                  },
                ],
                "parts": [
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "domain": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "bbc.co.uk",
                    },
                  ],
                  "query": [
                    {
                      "name": "f",
                      "orig": "f",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "png",
                    },
                    {
                      "name": "s",
                      "orig": "s",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 2048,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "alternatives": [
                    {
                      "binary": True,
                      "kind": "raw",
                      "media": "image/png",
                    },
                    {
                      "kind": "raw",
                      "media": "text/markdown",
                    },
                  ],
                  "kind": "json",
                  "media": "application/json",
                },
                "alias": {
                  "id": "domain",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_screenshot_by_domain_and_date": {
        "fields": [
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
            "short": "The date of the screenshot in YYYY-MM format",
          },
          {
            "name": "domain",
            "title": "Domain",
            "type": "`$STRING`",
            "short": "The requested domain",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "screenshot_url",
            "title": "Screenshot Url",
            "type": "`$STRING`",
            "short": "URL to the screenshot image",
          },
          {
            "name": "size",
            "title": "Size",
            "type": "`$INTEGER`",
            "short": "Size of the screenshot",
          },
          {
            "name": "timestamp",
            "title": "Timestamp",
            "type": "`$STRING`",
            "short": "When the screenshot was taken",
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "date": "date",
            "domain": "domain",
          },
          "name": "id",
          "parts": [
            "domain",
            "date",
          ],
          "sep": "/",
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
                    "var": "domain",
                  },
                  {
                    "var": "date",
                  },
                ],
                "parts": [
                  "{domain}",
                  "{date}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "date",
                      "orig": "date",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "2026-02",
                    },
                    {
                      "name": "domain",
                      "orig": "domain",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "bbc.co.uk",
                    },
                  ],
                  "query": [
                    {
                      "name": "f",
                      "orig": "f",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "png",
                    },
                    {
                      "name": "s",
                      "orig": "s",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 2048,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "date",
                    "domain",
                  ],
                },
                "response": {
                  "alternatives": [
                    {
                      "binary": True,
                      "kind": "raw",
                      "media": "image/png",
                    },
                    {
                      "kind": "raw",
                      "media": "text/markdown",
                    },
                  ],
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
