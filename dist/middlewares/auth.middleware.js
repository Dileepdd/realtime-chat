import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
export const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        // Decode JWT — assume payload has { id: string }
        const decoded = jwt.verify(token, JWT_SECRET);
        // Convert user id string to ObjectId
        req.userId = new Types.ObjectId(decoded.id);
        next();
    }
    catch (err) {
        console.error('JWT verification error:', err);
        return res.status(401).json({
            message: 'Token is not valid',
            error: err instanceof Error ? err.message : String(err),
        });
    }
};
//# sourceMappingURL=auth.middleware.js.map