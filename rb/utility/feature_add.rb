# HomepageScreenshot SDK utility: feature_add
module HomepageScreenshotUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
