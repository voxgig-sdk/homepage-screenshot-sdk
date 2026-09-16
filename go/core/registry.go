package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewGetScreenshotByDomainEntityFunc func(client *HomepageScreenshotSDK, entopts map[string]any) HomepageScreenshotEntity

var NewGetScreenshotByDomainAndDateEntityFunc func(client *HomepageScreenshotSDK, entopts map[string]any) HomepageScreenshotEntity

