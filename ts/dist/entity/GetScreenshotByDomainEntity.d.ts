import { HomepageScreenshotEntityBase } from '../HomepageScreenshotEntityBase';
import type { HomepageScreenshotSDK } from '../HomepageScreenshotSDK';
import type { Control } from '../types';
import type { GetScreenshotByDomain, GetScreenshotByDomainLoadMatch } from '../HomepageScreenshotTypes';
declare class GetScreenshotByDomainEntity extends HomepageScreenshotEntityBase<GetScreenshotByDomain> {
    constructor(client: HomepageScreenshotSDK, entopts: any);
    make(this: GetScreenshotByDomainEntity): GetScreenshotByDomainEntity;
    load(this: any, reqmatch?: GetScreenshotByDomainLoadMatch, ctrl?: Control): Promise<GetScreenshotByDomainEntity>;
}
export { GetScreenshotByDomainEntity };
