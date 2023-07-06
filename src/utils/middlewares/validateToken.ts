import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export interface IPayload {
    _id: string;
    iat: number;
} 

export const authValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json('Access Denied');
        const payload = jwt.verify(token, process.env.TOKEN_SECRET || '') as IPayload;
        req.userId = payload._id;
        next();
    } catch (e) {
        res.status(400).send('Invalid Token');
    }
}