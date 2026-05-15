# ProjectName SDK exists test

import pytest
from homepagescreenshot_sdk import HomepageScreenshotSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = HomepageScreenshotSDK.test(None, None)
        assert testsdk is not None
