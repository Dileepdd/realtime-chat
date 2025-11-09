import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from 'zod';

export const validate =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: unknown) {
      if (err instanceof Error) {
        // Handle standard JS errors (e.g. throw new Error("something"))
        return res.status(400).json({ message: err.message });
      }

      // Handle Mongoose or validation-style errors (objects with `errors` property)
      if (typeof err === 'object' && err !== null && 'errors' in err) {
        const errorObj = err as { errors?: Record<string, { message: string }> };
        const messages = Object.values(errorObj.errors ?? {}).map((e) => e.message);
        return res.status(400).json({ message: messages.join(', ') });
      }

      // Fallback for anything unexpected
      return res.status(400).json({ message: String(err) });
    }
  };
