import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { ValidateResult } from './validateHelper';

export const IDValidator = [
    param('id').notEmpty().withMessage('ID requerido, escribir por parametro'),

  
     (req: Request, res: Response, next: NextFunction) =>{
    ValidateResult(req,res,next)
}
    
]