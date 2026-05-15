package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGetScreenshotByDomainEntityFunc func(client *HomepageScreenshotSDK, entopts map[string]any) HomepageScreenshotEntity

var NewGetScreenshotByDomainAndDateEntityFunc func(client *HomepageScreenshotSDK, entopts map[string]any) HomepageScreenshotEntity

