# HomepageScreenshot SDK utility: make_context
require_relative '../core/context'
module HomepageScreenshotUtilities
  MakeContext = ->(ctxmap, basectx) {
    HomepageScreenshotContext.new(ctxmap, basectx)
  }
end
