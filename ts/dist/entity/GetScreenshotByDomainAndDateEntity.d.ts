import { HomepageScreenshotEntityBase } from '../HomepageScreenshotEntityBase';
import type { HomepageScreenshotSDK } from '../HomepageScreenshotSDK';
import type { Control } from '../types';
import type { GetScreenshotByDomainAndDate, GetScreenshotByDomainAndDateLoadMatch } from '../HomepageScreenshotTypes';
declare class GetScreenshotByDomainAndDateEntity extends HomepageScreenshotEntityBase<GetScreenshotByDomainAndDate> {
    constructor(client: HomepageScreenshotSDK, entopts: any);
    make(this: GetScreenshotByDomainAndDateEntity): GetScreenshotByDomainAndDateEntity;
    load(this: any, reqmatch?: GetScreenshotByDomainAndDateLoadMatch, ctrl?: Control): Promise<GetScreenshotByDomainAndDateEntity>;
}
export { GetScreenshotByDomainAndDateEntity };
