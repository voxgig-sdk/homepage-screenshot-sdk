import { Context } from './Context';
declare class HomepageScreenshotError extends Error {
    isHomepageScreenshotError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { HomepageScreenshotError };
