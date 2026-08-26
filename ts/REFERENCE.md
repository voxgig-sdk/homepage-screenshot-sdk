# HomepageScreenshot TypeScript SDK Reference

Complete API reference for the HomepageScreenshot TypeScript SDK.


## HomepageScreenshotSDK

### Constructor

```ts
new HomepageScreenshotSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `HomepageScreenshotSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = HomepageScreenshotSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `HomepageScreenshotSDK` instance in test mode.


### Instance Methods

#### `GetScreenshotByDomain(data?: object)`

Create a new `GetScreenshotByDomain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GetScreenshotByDomainEntity` instance.

#### `GetScreenshotByDomainAndDate(data?: object)`

Create a new `GetScreenshotByDomainAndDate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GetScreenshotByDomainAndDateEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `HomepageScreenshotSDK.test()`.

**Returns:** `HomepageScreenshotSDK` instance in test mode.


---

## GetScreenshotByDomainEntity

```ts
const get_screenshot_by_domain = client.GetScreenshotByDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | No | The requested domain |
| `id` | `string` | No |  |
| `screenshot_url` | `string` | No | URL to the screenshot image |
| `size` | `number` | No | Size of the screenshot |
| `timestamp` | `string` | No | When the screenshot was taken |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GetScreenshotByDomain().load({ id: 'get_screenshot_by_domain_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GetScreenshotByDomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `HomepageScreenshotSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GetScreenshotByDomainAndDateEntity

```ts
const get_screenshot_by_domain_and_date = client.GetScreenshotByDomainAndDate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No | The date of the screenshot in YYYY-MM format |
| `domain` | `string` | No | The requested domain |
| `screenshot_url` | `string` | No | URL to the screenshot image |
| `size` | `number` | No | Size of the screenshot |
| `timestamp` | `string` | No | When the screenshot was taken |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.GetScreenshotByDomainAndDate().load({ date: 'date', domain: 'domain' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GetScreenshotByDomainAndDateEntity` instance with the same client and
options.

#### `client()`

Return the parent `HomepageScreenshotSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new HomepageScreenshotSDK({
  feature: {
    test: { active: true },
  }
})
```

