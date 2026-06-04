<?php
declare(strict_types=1);

// HomepageScreenshot SDK configuration

class HomepageScreenshotConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "HomepageScreenshot",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'screenshot_url',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'size',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'timestamp',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 3,
            ],
          ],
          'name' => 'get_screenshot_by_domain',
          'op' => [
            'load' => [
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
                        'active' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'png',
                        'kind' => 'query',
                        'name' => 'f',
                        'orig' => 'f',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 2048,
                        'kind' => 'query',
                        'name' => 's',
                        'orig' => 's',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                    ],
                  ],
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
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'domain',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'screenshot_url',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'size',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'timestamp',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 4,
            ],
          ],
          'name' => 'get_screenshot_by_domain_and_date',
          'op' => [
            'load' => [
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
                        'active' => true,
                      ],
                      [
                        'example' => 'bbc.co.uk',
                        'kind' => 'param',
                        'name' => 'domain',
                        'orig' => 'domain',
                        'reqd' => true,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'png',
                        'kind' => 'query',
                        'name' => 'f',
                        'orig' => 'f',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                      [
                        'example' => 2048,
                        'kind' => 'query',
                        'name' => 's',
                        'orig' => 's',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                        'active' => true,
                      ],
                    ],
                  ],
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
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
