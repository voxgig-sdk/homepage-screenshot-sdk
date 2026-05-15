# HomepageScreenshot SDK feature factory

from feature.base_feature import HomepageScreenshotBaseFeature
from feature.test_feature import HomepageScreenshotTestFeature


def _make_feature(name):
    features = {
        "base": lambda: HomepageScreenshotBaseFeature(),
        "test": lambda: HomepageScreenshotTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
