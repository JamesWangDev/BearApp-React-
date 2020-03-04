import { Request, Response, NextFunction } from "express";

// extending types to access req.user without type errors
interface AuthRequest extends Request {
  user?: {
    sub: string;
    permissions: string[];
  };
}

export type AuthHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => Promise<void>;
