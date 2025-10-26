import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { users } from '../storage';
import dotenv from 'dotenv';
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authenticate: (req: Request, res: Response, next: NextFunction) => void = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.status(401).json({ message: 'No token provided.' });
    return;
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Invalid token.' });
    return;
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.userId = payload.userId;
    if (!users[payload.userId]) {
      res.status(401).json({ message: 'User not found.' });
      return;
    }
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
