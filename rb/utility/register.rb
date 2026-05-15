# HomepageScreenshot SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

HomepageScreenshotUtility.registrar = ->(u) {
  u.clean = HomepageScreenshotUtilities::Clean
  u.done = HomepageScreenshotUtilities::Done
  u.make_error = HomepageScreenshotUtilities::MakeError
  u.feature_add = HomepageScreenshotUtilities::FeatureAdd
  u.feature_hook = HomepageScreenshotUtilities::FeatureHook
  u.feature_init = HomepageScreenshotUtilities::FeatureInit
  u.fetcher = HomepageScreenshotUtilities::Fetcher
  u.make_fetch_def = HomepageScreenshotUtilities::MakeFetchDef
  u.make_context = HomepageScreenshotUtilities::MakeContext
  u.make_options = HomepageScreenshotUtilities::MakeOptions
  u.make_request = HomepageScreenshotUtilities::MakeRequest
  u.make_response = HomepageScreenshotUtilities::MakeResponse
  u.make_result = HomepageScreenshotUtilities::MakeResult
  u.make_point = HomepageScreenshotUtilities::MakePoint
  u.make_spec = HomepageScreenshotUtilities::MakeSpec
  u.make_url = HomepageScreenshotUtilities::MakeUrl
  u.param = HomepageScreenshotUtilities::Param
  u.prepare_auth = HomepageScreenshotUtilities::PrepareAuth
  u.prepare_body = HomepageScreenshotUtilities::PrepareBody
  u.prepare_headers = HomepageScreenshotUtilities::PrepareHeaders
  u.prepare_method = HomepageScreenshotUtilities::PrepareMethod
  u.prepare_params = HomepageScreenshotUtilities::PrepareParams
  u.prepare_path = HomepageScreenshotUtilities::PreparePath
  u.prepare_query = HomepageScreenshotUtilities::PrepareQuery
  u.result_basic = HomepageScreenshotUtilities::ResultBasic
  u.result_body = HomepageScreenshotUtilities::ResultBody
  u.result_headers = HomepageScreenshotUtilities::ResultHeaders
  u.transform_request = HomepageScreenshotUtilities::TransformRequest
  u.transform_response = HomepageScreenshotUtilities::TransformResponse
}
