package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "HomepageScreenshot",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://screenshotof.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"get_screenshot_by_domain": map[string]any{},
				"get_screenshot_by_domain_and_date": map[string]any{},
			},
		},
		"entity": map[string]any{
			"get_screenshot_by_domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "domain",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "screenshot_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "size",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "timestamp",
						"type": "`$STRING`",
					},
				},
				"name": "get_screenshot_by_domain",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "bbc.co.uk",
											"kind": "param",
											"name": "id",
											"orig": "domain",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "png",
											"kind": "query",
											"name": "f",
											"orig": "f",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 2048,
											"kind": "query",
											"name": "s",
											"orig": "s",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{domain}",
								"parts": []any{
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"f",
										"id",
										"s",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"get_screenshot_by_domain_and_date": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "domain",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "screenshot_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "size",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "timestamp",
						"type": "`$STRING`",
					},
				},
				"name": "get_screenshot_by_domain_and_date",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "2026-02",
											"kind": "param",
											"name": "date",
											"orig": "date",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "bbc.co.uk",
											"kind": "param",
											"name": "domain",
											"orig": "domain",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "png",
											"kind": "query",
											"name": "f",
											"orig": "f",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 2048,
											"kind": "query",
											"name": "s",
											"orig": "s",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{domain}/{date}",
								"parts": []any{
									"{domain}",
									"{date}",
								},
								"select": map[string]any{
									"exist": []any{
										"date",
										"domain",
										"f",
										"s",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
