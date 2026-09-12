export interface GetScreenshotByDomain {
    domain?: string;
    id?: string;
    screenshot_url?: string;
    size?: number;
    timestamp?: string;
}
export interface GetScreenshotByDomainLoadMatch {
    id: string;
    f?: string;
    s?: number;
}
export interface GetScreenshotByDomainAndDate {
    date?: string;
    domain?: string;
    id?: string;
    screenshot_url?: string;
    size?: number;
    timestamp?: string;
}
export interface GetScreenshotByDomainAndDateLoadMatch {
    date: string;
    domain: string;
    f?: string;
    s?: number;
}
