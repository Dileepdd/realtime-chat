export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof Error) {
            // Handle standard JS errors (e.g. throw new Error("something"))
            return res.status(400).json({ message: err.message });
        }
        // Handle Mongoose or validation-style errors (objects with `errors` property)
        if (typeof err === 'object' && err !== null && 'errors' in err) {
            const errorObj = err;
            const messages = Object.values(errorObj.errors ?? {}).map((e) => e.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        // Fallback for anything unexpected
        return res.status(400).json({ message: String(err) });
    }
};
//# sourceMappingURL=validate.middleware.js.map