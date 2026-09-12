import { GetScreenshotByDomainEntity } from './entity/GetScreenshotByDomainEntity';
import { GetScreenshotByDomainAndDateEntity } from './entity/GetScreenshotByDomainAndDateEntity';
export type * from './HomepageScreenshotTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { HomepageScreenshotEntityBase } from './HomepageScreenshotEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class HomepageScreenshotSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    GetScreenshotByDomain(entopts?: Record<string, any>): GetScreenshotByDomainEntity;
    GetScreenshotByDomainAndDate(entopts?: Record<string, any>): GetScreenshotByDomainAndDateEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): HomepageScreenshotSDK;
    tester(testopts?: any, sdkopts?: any): HomepageScreenshotSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof HomepageScreenshotSDK;
export { stdutil, config, BaseFeature, HomepageScreenshotEntityBase, HomepageScreenshotSDK, SDK, };
