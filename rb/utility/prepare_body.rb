# HomepageScreenshot SDK utility: prepare_body
require_relative 'media'
module HomepageScreenshotUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return HomepageScreenshotUtilities.raw_body(ctx.reqdata) if HomepageScreenshotUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
