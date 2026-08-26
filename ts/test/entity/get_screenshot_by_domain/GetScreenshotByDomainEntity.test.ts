
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { HomepageScreenshotSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('GetScreenshotByDomainEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HOMEPAGE_SCREENSHOT_TEST_LIVE=TRUE.
  afterEach(liveDelay('HOMEPAGE_SCREENSHOT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HomepageScreenshotSDK.test()
    const ent = testsdk.GetScreenshotByDomain()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HOMEPAGE_SCREENSHOT_TEST_LIVE
    for (const op of ['load']) {
      if (maybeSkipControl(t, 'entityOp', 'get_screenshot_by_domain.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_screenshot_by_domain_ref01_data = Object.values(setup.data.existing.get_screenshot_by_domain)[0] as any

    // LOAD
    const get_screenshot_by_domain_ref01_ent = client.GetScreenshotByDomain()
    const get_screenshot_by_domain_ref01_match_dt0: any = {}
    get_screenshot_by_domain_ref01_match_dt0.id = get_screenshot_by_domain_ref01_data.id
    const get_screenshot_by_domain_ref01_data_dt0 = (await get_screenshot_by_domain_ref01_ent.load(get_screenshot_by_domain_ref01_match_dt0)).data()
    assert(get_screenshot_by_domain_ref01_data_dt0.id === get_screenshot_by_domain_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_screenshot_by_domain/GetScreenshotByDomainTestData.json')

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
    ['get_screenshot_by_domain01','get_screenshot_by_domain02','get_screenshot_by_domain03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_ENTID': idmap,
    'HOMEPAGE_SCREENSHOT_TEST_LIVE': 'FALSE',
    'HOMEPAGE_SCREENSHOT_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['HOMEPAGE_SCREENSHOT_TEST_GET_SCREENSHOT_BY_DOMAIN_ENTID']

  const live = 'TRUE' === env.HOMEPAGE_SCREENSHOT_TEST_LIVE

  if (live) {
    client = new HomepageScreenshotSDK(merge([
      {
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
