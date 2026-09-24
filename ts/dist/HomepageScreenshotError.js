"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomepageScreenshotError = void 0;
class HomepageScreenshotError extends Error {
    isHomepageScreenshotError = true;
    sdk = 'HomepageScreenshot';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.HomepageScreenshotError = HomepageScreenshotError;
//# sourceMappingURL=HomepageScreenshotError.js.map