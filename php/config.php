<?php
declare(strict_types=1);

// HomepageScreenshot SDK configuration

class HomepageScreenshotConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "HomepageScreenshot",
                "slug" => "homepage-screenshot",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'now' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://screenshotof.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "get_screenshot_by_domain" => [],
                    "get_screenshot_by_domain_and_date" => [],
                ],
            ],
            "entity" => [
        'get_screenshot_by_domain' => [
          'fields' => [
            [
              'name' => 'domain',
              'title' => 'Domain',
              'type' => '`$STRING`',
              'short' => 'The requested domain',
            ],
            [
              'name' => 'screenshot_url',
              'title' => 'Screenshot Url',
              'type' => '`$STRING`',
              'short' => 'URL to the screenshot image',
            ],
            [
              'name' => 'size',
              'title' => 'Size',
              'type' => '`$INTEGER`',
              'short' => 'Size of the screenshot',
            ],
            [
              'name' => 'timestamp',
              'title' => 'Timestamp',
              'type' => '`$STRING`',
              'short' => 'When the screenshot was taken',
            ],
          ],
          'id' => [
            'field' => 'domain',
            'name' => 'id',
          ],
          'name' => 'get_screenshot_by_domain',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{domain}',
                  'segments' => [
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'domain' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'domain',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'bbc.co.uk',
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'f',
                        'orig' => 'f',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'png',
                      ],
                      [
                        'name' => 's',
                        'orig' => 's',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 2048,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'response' => [
                    'alternatives' => [
                      [
                        'binary' => true,
                        'kind' => 'raw',
                        'media' => 'image/png',
                      ],
                      [
                        'kind' => 'raw',
                        'media' => 'text/markdown',
                      ],
                    ],
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                  'alias' => [
                    'id' => 'domain',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'get_screenshot_by_domain_and_date' => [
          'fields' => [
            [
              'name' => 'date',
              'title' => 'Date',
              'type' => '`$STRING`',
              'short' => 'The date of the screenshot in YYYY-MM format',
            ],
            [
              'name' => 'domain',
              'title' => 'Domain',
              'type' => '`$STRING`',
              'short' => 'The requested domain',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'screenshot_url',
              'title' => 'Screenshot Url',
              'type' => '`$STRING`',
              'short' => 'URL to the screenshot image',
            ],
            [
              'name' => 'size',
              'title' => 'Size',
              'type' => '`$INTEGER`',
              'short' => 'Size of the screenshot',
            ],
            [
              'name' => 'timestamp',
              'title' => 'Timestamp',
              'type' => '`$STRING`',
              'short' => 'When the screenshot was taken',
            ],
          ],
          'id' => [
            'field' => 'id',
            'from' => [
              'date' => 'date',
              'domain' => 'domain',
            ],
            'name' => 'id',
            'parts' => [
              'domain',
              'date',
            ],
            'sep' => '/',
          ],
          'name' => 'get_screenshot_by_domain_and_date',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{domain}/{date}',
                  'segments' => [
                    [
                      'var' => 'domain',
                    ],
                    [
                      'var' => 'date',
                    ],
                  ],
                  'parts' => [
                    '{domain}',
                    '{date}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'date',
                        'orig' => 'date',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => '2026-02',
                      ],
                      [
                        'name' => 'domain',
                        'orig' => 'domain',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'bbc.co.uk',
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'f',
                        'orig' => 'f',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'png',
                      ],
                      [
                        'name' => 's',
                        'orig' => 's',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 2048,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                      'domain',
                    ],
                  ],
                  'response' => [
                    'alternatives' => [
                      [
                        'binary' => true,
                        'kind' => 'raw',
                        'media' => 'image/png',
                      ],
                      [
                        'kind' => 'raw',
                        'media' => 'text/markdown',
                      ],
                    ],
                    'kind' => 'json',
                    'media' => 'application/json',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return HomepageScreenshotFeatures::make_feature($name);
    }
}
