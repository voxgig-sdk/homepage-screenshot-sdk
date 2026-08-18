-- HomepageScreenshot SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "HomepageScreenshot",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "screenshot_url",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "size",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "timestamp",
            ["type"] = "`$STRING`",
          },
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
                ["parts"] = {
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["domain"] = "id",
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
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "domain",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "screenshot_url",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "size",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "timestamp",
            ["type"] = "`$STRING`",
          },
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
                ["parts"] = {
                  "{domain}",
                  "{date}",
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
