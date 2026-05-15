# HomepageScreenshot PHP SDK Reference

Complete API reference for the HomepageScreenshot PHP SDK.


## HomepageScreenshotSDK

### Constructor

```php
require_once __DIR__ . '/homepage-screenshot_sdk.php';

$client = new HomepageScreenshotSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## GetScreenshotByDomainEntity

```php
$get_screenshot_by_domain = $client->GetScreenshotByDomain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | ``$STRING`` | No |  |
| `screenshot_url` | ``$STRING`` | No |  |
| `size` | ``$INTEGER`` | No |  |
| `timestamp` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->GetScreenshotByDomain()->load(["id" => "get_screenshot_by_domain_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetScreenshotByDomainEntity`

Create a new `GetScreenshotByDomainEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GetScreenshotByDomainAndDateEntity

```php
$get_screenshot_by_domain_and_date = $client->GetScreenshotByDomainAndDate();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | ``$STRING`` | No |  |
| `domain` | ``$STRING`` | No |  |
| `screenshot_url` | ``$STRING`` | No |  |
| `size` | ``$INTEGER`` | No |  |
| `timestamp` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->GetScreenshotByDomainAndDate()->load(["id" => "get_screenshot_by_domain_and_date_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetScreenshotByDomainAndDateEntity`

Create a new `GetScreenshotByDomainAndDateEntity` instance with the same client and
options.

#### `getName(): string`

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

