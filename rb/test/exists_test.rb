# HomepageScreenshot SDK exists test

require "minitest/autorun"
require_relative "../HomepageScreenshot_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = HomepageScreenshotSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
