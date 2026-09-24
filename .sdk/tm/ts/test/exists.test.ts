
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HomepageScreenshotSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = HomepageScreenshotSDK.test()
    equal(testsdk instanceof HomepageScreenshotSDK, true,
      'HomepageScreenshotSDK.test() must return a client synchronously')
  })

})
