# HomepageScreenshot SDK feature factory

from homepagescreenshot_sdk.feature.base_feature import HomepageScreenshotBaseFeature
from homepagescreenshot_sdk.feature.ratelimit_feature import HomepageScreenshotRatelimitFeature
from homepagescreenshot_sdk.feature.retry_feature import HomepageScreenshotRetryFeature
from homepagescreenshot_sdk.feature.test_feature import HomepageScreenshotTestFeature
from homepagescreenshot_sdk.feature.timeout_feature import HomepageScreenshotTimeoutFeature


_FEATURES = {
    "base": lambda: HomepageScreenshotBaseFeature(),
    "ratelimit": lambda: HomepageScreenshotRatelimitFeature(),
    "retry": lambda: HomepageScreenshotRetryFeature(),
    "test": lambda: HomepageScreenshotTestFeature(),
    "timeout": lambda: HomepageScreenshotTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
