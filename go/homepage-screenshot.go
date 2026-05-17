package voxgighomepagescreenshotsdk

import (
	"github.com/voxgig-sdk/homepage-screenshot-sdk/go/core"
	"github.com/voxgig-sdk/homepage-screenshot-sdk/go/entity"
	"github.com/voxgig-sdk/homepage-screenshot-sdk/go/feature"
	_ "github.com/voxgig-sdk/homepage-screenshot-sdk/go/utility"
)

// Type aliases preserve external API.
type HomepageScreenshotSDK = core.HomepageScreenshotSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type HomepageScreenshotEntity = core.HomepageScreenshotEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type HomepageScreenshotError = core.HomepageScreenshotError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGetScreenshotByDomainEntityFunc = func(client *core.HomepageScreenshotSDK, entopts map[string]any) core.HomepageScreenshotEntity {
		return entity.NewGetScreenshotByDomainEntity(client, entopts)
	}
	core.NewGetScreenshotByDomainAndDateEntityFunc = func(client *core.HomepageScreenshotSDK, entopts map[string]any) core.HomepageScreenshotEntity {
		return entity.NewGetScreenshotByDomainAndDateEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewHomepageScreenshotSDK = core.NewHomepageScreenshotSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
