# HomepageScreenshot SDK utility: make_context

from homepagescreenshot_sdk.core.context import HomepageScreenshotContext


def make_context_util(ctxmap, basectx):
    return HomepageScreenshotContext(ctxmap, basectx)
