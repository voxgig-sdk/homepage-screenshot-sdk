# HomepageScreenshot PHP SDK Reference

Complete API reference for the HomepageScreenshot PHP SDK.


## HomepageScreenshotSDK

### Constructor

```php
require_once __DIR__ . '/homepagescreenshot_sdk.php';

$client = new HomepageScreenshotSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HomepageScreenshotSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = HomepageScreenshotSDK::test();
```


### Instance Methods

#### `GetScreenshotByDomain($data = null)`

Create a new `GetScreenshotByDomainEntity` instance. Pass `null` for no initial data.

#### `GetScreenshotByDomainAndDate($data = null)`

Create a new `GetScreenshotByDomainAndDateEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): HomepageScreenshotUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## GetScreenshotByDomainEntity

```php
$get_screenshot_by_domain = $client->GetScreenshotByDomain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | No | The requested domain |
| `id` | `string` | No |  |
| `screenshot_url` | `string` | No | URL to the screenshot image |
| `size` | `int` | No | Size of the screenshot |
| `timestamp` | `string` | No | When the screenshot was taken |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->GetScreenshotByDomain()->load(["id" => "get_screenshot_by_domain_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GetScreenshotByDomainEntity`

Create a new `GetScreenshotByDomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GetScreenshotByDomainAndDateEntity

```php
$get_screenshot_by_domain_and_date = $client->GetScreenshotByDomainAndDate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No | The date of the screenshot in YYYY-MM format |
| `domain` | `string` | No | The requested domain |
| `screenshot_url` | `string` | No | URL to the screenshot image |
| `size` | `int` | No | Size of the screenshot |
| `timestamp` | `string` | No | When the screenshot was taken |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->GetScreenshotByDomainAndDate()->load(["date" => "date", "domain" => "domain"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GetScreenshotByDomainAndDateEntity`

Create a new `GetScreenshotByDomainAndDateEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new HomepageScreenshotSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

