
import { Context } from './Context'


class HomepageScreenshotError extends Error {

  isHomepageScreenshotError = true

  sdk = 'HomepageScreenshot'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  HomepageScreenshotError
}

