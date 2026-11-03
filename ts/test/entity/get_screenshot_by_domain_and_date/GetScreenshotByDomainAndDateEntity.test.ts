

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { HomepageScreenshotSDK, BaseFeature, config, stdutil } from '../../..'

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


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = HomepageScreenshotSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.GetScreenshotByDomainAndDate().load({"date":1,"domain":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOMEPAGE_SCREENSHOT_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_screenshot_by_domain_and_date.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"date":{"a":true,"h":"Date","n":"date","r":false,"sh":"The date of the screenshot in YYYY-MM format","t":"`$STRING`","key$":"date","index$":0},"domain":{"a":true,"h":"Domain","n":"domain","r":false,"sh":"The requested domain","t":"`$STRING`","key$":"domain","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"screenshot_url":{"a":true,"h":"Screenshot Url","n":"screenshot_url","r":false,"sh":"URL to the screenshot image","t":"`$STRING`","key$":"screenshot_url","index$":3},"size":{"a":true,"h":"Size","n":"size","r":false,"sh":"Size of the screenshot","t":"`$INTEGER`","key$":"size","index$":4},"timestamp":{"a":true,"h":"Timestamp","n":"timestamp","r":false,"sh":"When the screenshot was taken","t":"`$STRING`","key$":"timestamp","index$":5}},"id":{"field":"id","from":{"date":"date","domain":"domain"},"name":"id","parts":["domain","date"],"sep":"/"},"name":"get_screenshot_by_domain_and_date","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /{domain}/{date}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"2026-02","k":"param","n":"date","or":"date","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":"bbc.co.uk","k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":"png","k":"query","n":"f","or":"f","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":2048,"k":"query","n":"s","or":"s","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/{domain}/{date}","q":{"exist":["date","domain"]},"r":{},"rs":{"alternatives":[{"binary":true,"kind":"raw","media":"image/png"},{"kind":"raw","media":"text/markdown"}],"kind":"json","media":"application/json"},"s":[{"var":"domain"},{"var":"date"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_screenshot_by_domain_and_date","name__orig":"get_screenshot_by_domain_and_date","Name":"GetScreenshotByDomainAndDate","name_":"get_screenshot_by_domain_and_date","name-":"get-screenshot-by-domain-and-date","NAME":"GET_SCREENSHOT_BY_DOMAIN_AND_DATE","index$":1}, {"active":true,"entity":"get_screenshot_by_domain_and_date","key$":"BasicGetScreenshotByDomainAndDateFlow","kind":"basic","name":"BasicGetScreenshotByDomainAndDateFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"get_screenshot_by_domain_and_date_ref01","srcdatavar":"get_screenshot_by_domain_and_date_ref01_data","suffix":"_dt0"},"m":{"domain":"domain01","id":"get_screenshot_by_domain_and_date01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_screenshot_by_domain_and_date_ref01"}}],"unreachable":true}]}, 'GetScreenshotByDomainAndDate', {"GET /{domain}/{date}":{"protocol":"http","parameters":[{"name":"domain","in":"path","description":"The domain name to capture (e.g., bbc.co.uk)","required":true,"schema":{"type":"string","example":"bbc.co.uk"},"index$":0},{"name":"date","in":"path","description":"Date in YYYY-MM format (e.g., 2024-01, 2026-02)","required":true,"schema":{"type":"string","pattern":"^\\d{4}-(0[1-9]|1[0-2])$","example":"2026-02"},"index$":1},{"name":"s","in":"query","description":"Size of the screenshot in pixels (width)","required":false,"schema":{"type":"integer","enum":[128,256,512,2048],"default":2048},"index$":2},{"name":"f","in":"query","description":"Format of the response","required":false,"schema":{"type":"string","enum":["png","md","json"],"default":"png"},"index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_screenshot_by_domain_and_date_ref01_data = Object.values(setup.data.existing.get_screenshot_by_domain_and_date)[0] as any

  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
