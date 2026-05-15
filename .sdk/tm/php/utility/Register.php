<?php
declare(strict_types=1);

// HomepageScreenshot SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

HomepageScreenshotUtility::setRegistrar(function (HomepageScreenshotUtility $u): void {
    $u->clean = [HomepageScreenshotClean::class, 'call'];
    $u->done = [HomepageScreenshotDone::class, 'call'];
    $u->make_error = [HomepageScreenshotMakeError::class, 'call'];
    $u->feature_add = [HomepageScreenshotFeatureAdd::class, 'call'];
    $u->feature_hook = [HomepageScreenshotFeatureHook::class, 'call'];
    $u->feature_init = [HomepageScreenshotFeatureInit::class, 'call'];
    $u->fetcher = [HomepageScreenshotFetcher::class, 'call'];
    $u->make_fetch_def = [HomepageScreenshotMakeFetchDef::class, 'call'];
    $u->make_context = [HomepageScreenshotMakeContext::class, 'call'];
    $u->make_options = [HomepageScreenshotMakeOptions::class, 'call'];
    $u->make_request = [HomepageScreenshotMakeRequest::class, 'call'];
    $u->make_response = [HomepageScreenshotMakeResponse::class, 'call'];
    $u->make_result = [HomepageScreenshotMakeResult::class, 'call'];
    $u->make_point = [HomepageScreenshotMakePoint::class, 'call'];
    $u->make_spec = [HomepageScreenshotMakeSpec::class, 'call'];
    $u->make_url = [HomepageScreenshotMakeUrl::class, 'call'];
    $u->param = [HomepageScreenshotParam::class, 'call'];
    $u->prepare_auth = [HomepageScreenshotPrepareAuth::class, 'call'];
    $u->prepare_body = [HomepageScreenshotPrepareBody::class, 'call'];
    $u->prepare_headers = [HomepageScreenshotPrepareHeaders::class, 'call'];
    $u->prepare_method = [HomepageScreenshotPrepareMethod::class, 'call'];
    $u->prepare_params = [HomepageScreenshotPrepareParams::class, 'call'];
    $u->prepare_path = [HomepageScreenshotPreparePath::class, 'call'];
    $u->prepare_query = [HomepageScreenshotPrepareQuery::class, 'call'];
    $u->result_basic = [HomepageScreenshotResultBasic::class, 'call'];
    $u->result_body = [HomepageScreenshotResultBody::class, 'call'];
    $u->result_headers = [HomepageScreenshotResultHeaders::class, 'call'];
    $u->transform_request = [HomepageScreenshotTransformRequest::class, 'call'];
    $u->transform_response = [HomepageScreenshotTransformResponse::class, 'call'];
});
