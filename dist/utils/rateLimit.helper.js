import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
export const createRateLimiter = (options) => {
    const { max, windowMs = 24 * 60 * 60 * 1000, // default 24h
    message = 'Too many requests, please try again later.', } = options;
    return rateLimit({
        windowMs,
        max,
        message,
        keyGenerator: (req) => {
            // If the request has an authenticated user ID, use that
            const userId = req.userId;
            if (userId)
                return userId.toString();
            // ✅ Fix typing issue: explicitly cast req to expected type
            return ipKeyGenerator(req);
        },
        standardHeaders: true,
        legacyHeaders: false,
    });
};
//# sourceMappingURL=rateLimit.helper.js.map