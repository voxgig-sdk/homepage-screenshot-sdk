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
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
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
              'short' => 'The requested domain',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'screenshot_url',
              'short' => 'URL to the screenshot image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'size',
              'short' => 'Size of the screenshot',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'timestamp',
              'short' => 'When the screenshot was taken',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'get_screenshot_by_domain',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'bbc.co.uk',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'domain',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'png',
                        'kind' => 'query',
                        'name' => 'f',
                        'orig' => 'f',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 2048,
                        'kind' => 'query',
                        'name' => 's',
                        'orig' => 's',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{domain}',
                  'parts' => [
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'domain' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'f',
                      'id',
                      's',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
              'short' => 'The date of the screenshot in YYYY-MM format',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'domain',
              'short' => 'The requested domain',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'screenshot_url',
              'short' => 'URL to the screenshot image',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'size',
              'short' => 'Size of the screenshot',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'timestamp',
              'short' => 'When the screenshot was taken',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'get_screenshot_by_domain_and_date',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => '2026-02',
                        'kind' => 'param',
                        'name' => 'date',
                        'orig' => 'date',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'bbc.co.uk',
                        'kind' => 'param',
                        'name' => 'domain',
                        'orig' => 'domain',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'png',
                        'kind' => 'query',
                        'name' => 'f',
                        'orig' => 'f',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 2048,
                        'kind' => 'query',
                        'name' => 's',
                        'orig' => 's',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{domain}/{date}',
                  'parts' => [
                    '{domain}',
                    '{date}',
                  ],
                  'select' => [
                    'exist' => [
                      'date',
                      'domain',
                      'f',
                      's',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
