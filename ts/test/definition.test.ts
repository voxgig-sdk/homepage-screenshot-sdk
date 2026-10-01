import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "get_screenshot_by_domain",
    "accessor": "GetScreenshotByDomain",
    "op": "load",
    "method": "GET",
    "path": "/{domain}",
    "args": [
      {
        "name": "id",
        "wire": "domain",
        "value": "bbc.co.uk"
      }
    ],
    "select": {
      "f": "v1",
      "s": "v1"
    },
    "headers": [],
    "query": [
      "s",
      "f"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "domain": "x",
      "screenshot_url": "x",
      "size": 1,
      "timestamp": "x"
    },
    "idField": "id"
  },
  {
    "entity": "get_screenshot_by_domain_and_date",
    "accessor": "GetScreenshotByDomainAndDate",
    "op": "load",
    "method": "GET",
    "path": "/{domain}/{date}",
    "args": [
      {
        "name": "date",
        "wire": "date",
        "value": "2026-02"
      },
      {
        "name": "domain",
        "wire": "domain",
        "value": "bbc.co.uk"
      }
    ],
    "select": {
      "f": "v1",
      "s": "v1"
    },
    "headers": [],
    "query": [
      "s",
      "f"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "domain": "x",
      "date": "x",
      "screenshot_url": "x",
      "size": 1,
      "timestamp": "x"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
