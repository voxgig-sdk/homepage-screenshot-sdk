

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { HomepageScreenshotSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetScreenshotByDomainAndDateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOMEPAGE_SCREENSHOT_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOMEPAGE_SCREENSHOT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HomepageScreenshotSDK.test()
    const ent = testsdk.GetScreenshotByDomainAndDate()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOMEPAGE_SCREENSHOT_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_screenshot_by_domain_and_date.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"date","req":false,"short":"The date of the screenshot in YYYY-MM format","type":"`$STRING`","index$":0},{"active":true,"name":"domain","req":false,"short":"The requested domain","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"screenshot_url","req":false,"short":"URL to the screenshot image","type":"`$STRING`","index$":3},{"active":true,"name":"size","req":false,"short":"Size of the screenshot","type":"`$INTEGER`","index$":4},{"active":true,"name":"timestamp","req":false,"short":"When the screenshot was taken","type":"`$STRING`","index$":5}],"id":{"field":"id","from":{"date":"date","domain":"domain"},"name":"id","parts":["domain","date"],"sep":"/"},"name":"get_screenshot_by_domain_and_date","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"2026-02","kind":"param","name":"date","orig":"date","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"example":"bbc.co.uk","kind":"param","name":"domain","orig":"domain","reqd":true,"type":"`$STRING`","index$":1}],"query":[{"active":true,"example":"png","kind":"query","name":"f","orig":"f","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":2048,"kind":"query","name":"s","orig":"s","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /{domain}/{date}","json":"{\"operationId\":\"getScreenshotByDomainAndDate\",\"parameters\":[{\"description\":\"The domain name to capture (e.g., bbc.co.uk)\",\"in\":\"path\",\"name\":\"domain\",\"required\":true,\"schema\":{\"example\":\"bbc.co.uk\",\"type\":\"string\"}},{\"description\":\"Date in YYYY-MM format (e.g., 2024-01, 2026-02)\",\"in\":\"path\",\"name\":\"date\",\"required\":true,\"schema\":{\"example\":\"2026-02\",\"pattern\":\"^\\\\d{4}-(0[1-9]|1[0-2])$\",\"type\":\"string\"}},{\"description\":\"Size of the screenshot in pixels (width)\",\"in\":\"query\",\"name\":\"s\",\"required\":false,\"schema\":{\"default\":2048,\"enum\":[128,256,512,2048],\"type\":\"integer\"}},{\"description\":\"Format of the response\",\"in\":\"query\",\"name\":\"f\",\"required\":false,\"schema\":{\"default\":\"png\",\"enum\":[\"png\",\"md\",\"json\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"date\":{\"description\":\"The date of the screenshot in YYYY-MM format\",\"type\":\"string\"},\"domain\":{\"description\":\"The requested domain\",\"type\":\"string\"},\"screenshot_url\":{\"description\":\"URL to the screenshot image\",\"type\":\"string\"},\"size\":{\"description\":\"Size of the screenshot\",\"type\":\"integer\"},\"timestamp\":{\"description\":\"When the screenshot was taken\",\"type\":\"string\"}},\"type\":\"object\"}},\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}},\"text/markdown\":{\"schema\":{\"description\":\"Markdown representation of the screenshot information\",\"type\":\"string\"}}},\"description\":\"Successful response with screenshot from the specified date\"},\"404\":{\"description\":\"Domain not found or screenshot not available for the specified date\"},\"429\":{\"description\":\"Rate limit exceeded (1,000 requests per day without API key)\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{domain}/{date}","segments":[{"var":"domain"},{"var":"date"}],"select":{"exist":["date","domain","f","s"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_screenshot_by_domain_and_date","name__orig":"get_screenshot_by_domain_and_date","Name":"GetScreenshotByDomainAndDate","name_":"get_screenshot_by_domain_and_date","name-":"get-screenshot-by-domain-and-date","NAME":"GET_SCREENSHOT_BY_DOMAIN_AND_DATE","index$":1}, {"active":true,"entity":"get_screenshot_by_domain_and_date","key$":"BasicGetScreenshotByDomainAndDateFlow","kind":"basic","name":"BasicGetScreenshotByDomainAndDateFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"get_screenshot_by_domain_and_date_ref01","srcdatavar":"get_screenshot_by_domain_and_date_ref01_data","suffix":"_dt0"},"match":{"domain":"domain01","id":"get_screenshot_by_domain_and_date01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_screenshot_by_domain_and_date_ref01"}}],"index$":0}]}, 'GetScreenshotByDomainAndDate')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_screenshot_by_domain_and_date_ref01_data = Object.values(setup.data.existing.get_screenshot_by_domain_and_date)[0] as any

    // LOAD
    const get_screenshot_by_domain_and_date_ref01_ent = client.GetScreenshotByDomainAndDate()
    const get_screenshot_by_domain_and_date_ref01_match_dt0: any = {}
    get_screenshot_by_domain_and_date_ref01_match_dt0.id = get_screenshot_by_domain_and_date_ref01_data.id
    const get_screenshot_by_domain_and_date_ref01_data_dt0 = (await get_screenshot_by_domain_and_date_ref01_ent.load(get_screenshot_by_domain_and_date_ref01_match_dt0)).data()
    assert(get_screenshot_by_domain_and_date_ref01_data_dt0.id === get_screenshot_by_domain_and_date_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_screenshot_by_domain_and_date/GetScreenshotByDomainAndDateTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = HomepageScreenshotSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['get_screenshot_by_domain_and_date01','get_screenshot_by_domain_and_date02','get_screenshot_by_domain_and_date03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_AND_DATE_ENTID': idmap,
    'HOMEPAGE_SCREENSHOT_TEST_LIVE': 'FALSE',
    'HOMEPAGE_SCREENSHOT_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_AND_DATE_ENTID']

  const live = 'TRUE' === env.HOMEPAGE_SCREENSHOT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_AND_DATE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new HomepageScreenshotSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.HOMEPAGE_SCREENSHOT_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
