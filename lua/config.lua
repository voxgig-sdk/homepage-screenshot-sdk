-- HomepageScreenshot SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "HomepageScreenshot",
      slug = "homepage-screenshot",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://screenshotof.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["get_screenshot_by_domain"] = {},
        ["get_screenshot_by_domain_and_date"] = {},
      },
    },
    entity = {
      ["get_screenshot_by_domain"] = {
        ["fields"] = {
          {
            ["name"] = "domain",
            ["short"] = "The requested domain",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "screenshot_url",
            ["short"] = "URL to the screenshot image",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "size",
            ["short"] = "Size of the screenshot",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "timestamp",
            ["short"] = "When the screenshot was taken",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "get_screenshot_by_domain",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "bbc.co.uk",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "domain",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "png",
                      ["kind"] = "query",
                      ["name"] = "f",
                      ["orig"] = "f",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 2048,
                      ["kind"] = "query",
                      ["name"] = "s",
                      ["orig"] = "s",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{domain}",
                ["rename"] = {
                  ["param"] = {
                    ["domain"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "f",
                    "id",
                    "s",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "{id}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["get_screenshot_by_domain_and_date"] = {
        ["fields"] = {
          {
            ["name"] = "date",
            ["short"] = "The date of the screenshot in YYYY-MM format",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "domain",
            ["short"] = "The requested domain",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "screenshot_url",
            ["short"] = "URL to the screenshot image",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "size",
            ["short"] = "Size of the screenshot",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "timestamp",
            ["short"] = "When the screenshot was taken",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["from"] = {
            ["date"] = "date",
            ["domain"] = "domain",
          },
          ["name"] = "id",
          ["parts"] = {
            "domain",
            "date",
          },
          ["sep"] = "/",
        },
        ["name"] = "get_screenshot_by_domain_and_date",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "2026-02",
                      ["kind"] = "param",
                      ["name"] = "date",
                      ["orig"] = "date",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "bbc.co.uk",
                      ["kind"] = "param",
                      ["name"] = "domain",
                      ["orig"] = "domain",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "png",
                      ["kind"] = "query",
                      ["name"] = "f",
                      ["orig"] = "f",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 2048,
                      ["kind"] = "query",
                      ["name"] = "s",
                      ["orig"] = "s",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{domain}/{date}",
                ["segments"] = {
                  {
                    ["var"] = "domain",
                  },
                  {
                    ["var"] = "date",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "date",
                    "domain",
                    "f",
                    "s",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "{domain}",
                  "{date}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
