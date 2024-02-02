import { NextFunction, Request, Response } from "express-serve-static-core";
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'asdfghjkl';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers?.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, JWT_SECRET, (err: any) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      next();
    });
  };