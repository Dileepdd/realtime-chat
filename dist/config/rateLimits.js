export const DEFAULT_RATE_LIMIT = { max: 100, windowMs: 60 * 1000 }; // 100/minute
export const RATE_LIMITS = {
    SEND_MAIL: { max: 100, windowMs: 24 * 60 * 60 * 1000 }, // 100/day
    GET_DATA: { max: 2, windowMs: 24 * 60 * 60 * 1000 }, // 2/day
    FEEDBACK: { max: 20, windowMs: 24 * 60 * 60 * 1000 }, // 20/day
    LOGIN: { max: 10, windowMs: 60 * 60 * 1000 }, // 10/hour
    DEFAULT: { max: 100, windowMs: 60 * 1000 },
    CREATE_MESSAGE: { max: 50, windowMs: 60 * 1000 }, // 50/minute
};
//# sourceMappingURL=rateLimits.js.map