# HomepageScreenshot SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "short": "The requested domain",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "screenshot_url",
            "short": "URL to the screenshot image",
            "type": "`$STRING`",
          },
          {
            "name": "size",
            "short": "Size of the screenshot",
            "type": "`$INTEGER`",
          },
          {
            "name": "timestamp",
            "short": "When the screenshot was taken",
            "type": "`$STRING`",
          },
        ],
        "name": "get_screenshot_by_domain",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "bbc.co.uk",
                      "kind": "param",
                      "name": "id",
                      "orig": "domain",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "png",
                      "kind": "query",
                      "name": "f",
                      "orig": "f",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 2048,
                      "kind": "query",
                      "name": "s",
                      "orig": "s",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{domain}",
                "parts": [
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "domain": "id",
                  },
                },
                "select": {
                  "exist": [
                    "f",
                    "id",
                    "s",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
            "short": "The date of the screenshot in YYYY-MM format",
            "type": "`$STRING`",
          },
          {
            "name": "domain",
            "short": "The requested domain",
            "type": "`$STRING`",
          },
          {
            "name": "screenshot_url",
            "short": "URL to the screenshot image",
            "type": "`$STRING`",
          },
          {
            "name": "size",
            "short": "Size of the screenshot",
            "type": "`$INTEGER`",
          },
          {
            "name": "timestamp",
            "short": "When the screenshot was taken",
            "type": "`$STRING`",
          },
        ],
        "name": "get_screenshot_by_domain_and_date",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "2026-02",
                      "kind": "param",
                      "name": "date",
                      "orig": "date",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "bbc.co.uk",
                      "kind": "param",
                      "name": "domain",
                      "orig": "domain",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "png",
                      "kind": "query",
                      "name": "f",
                      "orig": "f",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 2048,
                      "kind": "query",
                      "name": "s",
                      "orig": "s",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/{domain}/{date}",
                "parts": [
                  "{domain}",
                  "{date}",
                ],
                "select": {
                  "exist": [
                    "date",
                    "domain",
                    "f",
                    "s",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
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
