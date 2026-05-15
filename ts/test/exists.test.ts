
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HomepageScreenshotSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await HomepageScreenshotSDK.test()
    equal(null !== testsdk, true)
  })

})
