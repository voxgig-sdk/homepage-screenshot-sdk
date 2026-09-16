# HomepageScreenshot SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module HomepageScreenshotFeatures
  def self.make_feature(name)
    case name
    when "base"
      HomepageScreenshotBaseFeature.new
    when "ratelimit"
      HomepageScreenshotRatelimitFeature.new
    when "retry"
      HomepageScreenshotRetryFeature.new
    when "test"
      HomepageScreenshotTestFeature.new
    when "timeout"
      HomepageScreenshotTimeoutFeature.new
    else
      HomepageScreenshotBaseFeature.new
    end
  end
end
