# HomepageScreenshot SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module HomepageScreenshotFeatures
  def self.make_feature(name)
    case name
    when "base"
      HomepageScreenshotBaseFeature.new
    when "test"
      HomepageScreenshotTestFeature.new
    else
      HomepageScreenshotBaseFeature.new
    end
  end
end
