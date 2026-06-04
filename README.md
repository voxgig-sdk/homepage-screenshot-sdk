# HomepageScreenshot SDK

Capture homepage screenshots and favicons for any domain, with monthly historical snapshots back to January 2024

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Homepage Screenshot API

Homepage Screenshot API is a free public endpoint provided by [screenshotof.com](https://screenshotof.com), powered by [Urlbox](https://urlbox.com). It captures and serves homepage screenshots and favicons for arbitrary domains, and maintains an archive of monthly snapshots dating back to January 2024 for over a million popular sites.

What you get from the API:

- Current homepage screenshots in PNG, with optional sizes of 128, 256, 512 or 2048 pixels (`s` query parameter)
- Historical snapshots addressable by month (`YYYY-MM`)
- Alternative response formats via the `f` parameter: `png` (default), `json` (metadata), or `md` (extracted markdown content)
- Favicons and site icons at multiple resolutions (`/icon/`, `/icon-lg/`, `/icon-best/`)

The API is unauthenticated, CORS-enabled, and aimed at web monitoring, link previews, directory listings, and similar lightweight integrations. Default request quota is 1,000/day; contact support@urlbox.com for higher limits.

## Try it

**TypeScript**
```bash
npm install homepage-screenshot
```

**Python**
```bash
pip install homepage-screenshot-sdk
```

**PHP**
```bash
composer require voxgig/homepage-screenshot-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/homepage-screenshot-sdk/go
```

**Ruby**
```bash
gem install homepage-screenshot-sdk
```

**Lua**
```bash
luarocks install homepage-screenshot-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { HomepageScreenshotSDK } from 'homepage-screenshot'

const client = new HomepageScreenshotSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o homepage-screenshot-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "homepage-screenshot": {
      "command": "/abs/path/to/homepage-screenshot-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **GetScreenshotByDomain** | Returns the most recent screenshot (or JSON metadata / markdown) for a given domain via `GET /{domain}`, with optional `s` size and `f` format query parameters. | `/{domain}` |
| **GetScreenshotByDomainAndDate** | Returns the archived monthly snapshot for a given domain and `YYYY-MM` date via `GET /{domain}/{date}`, useful for historical comparisons back to January 2024. | `/{domain}/{date}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from homepagescreenshot_sdk import HomepageScreenshotSDK

client = HomepageScreenshotSDK({})


# Load a specific getscreenshotbydomain
getscreenshotbydomain, err = client.GetScreenshotByDomain(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'homepagescreenshot_sdk.php';

$client = new HomepageScreenshotSDK([]);


// Load a specific getscreenshotbydomain
[$getscreenshotbydomain, $err] = $client->GetScreenshotByDomain(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/homepage-screenshot-sdk/go"

client := sdk.NewHomepageScreenshotSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "HomepageScreenshot_sdk"

client = HomepageScreenshotSDK.new({})


# Load a specific getscreenshotbydomain
getscreenshotbydomain, err = client.GetScreenshotByDomain(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("homepage-screenshot_sdk")

local client = sdk.new({})


-- Load a specific getscreenshotbydomain
local getscreenshotbydomain, err = client:GetScreenshotByDomain(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = HomepageScreenshotSDK.test()
const result = await client.GetScreenshotByDomain().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = HomepageScreenshotSDK.test(None, None)
result, err = client.GetScreenshotByDomain(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = HomepageScreenshotSDK::test(null, null);
[$result, $err] = $client->GetScreenshotByDomain(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.GetScreenshotByDomain(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = HomepageScreenshotSDK.test(nil, nil)
result, err = client.GetScreenshotByDomain(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:GetScreenshotByDomain(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Homepage Screenshot API

- Upstream: [https://screenshotof.com](https://screenshotof.com)

- Free tier: up to 1,000 requests per day without an API key
- Higher limits available by contacting support@urlbox.com
- No explicit licence terms are published; use is governed by the operator's standard terms
- Powered by Urlbox as a byproduct of their screenshot infrastructure

---

Generated from the Homepage Screenshot API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
