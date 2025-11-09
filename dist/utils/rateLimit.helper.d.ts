import { RateLimitRequestHandler } from 'express-rate-limit';
interface RateLimitOptions {
    max: number;
    windowMs?: number;
    message?: string;
}
export declare const createRateLimiter: (options: RateLimitOptions) => RateLimitRequestHandler;
export {};
//# sourceMappingURL=rateLimit.helper.d.ts.map