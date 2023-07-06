import { NextFunction, Request, Response } from "express";
import { param} from "express-validator";
import { ValidateResult } from "./validateHelper";

export const generoValidator = [
  param('genero', 'El gènero  es requerido').notEmpty(),
  (req: Request, res: Response, next: NextFunction) =>{
    ValidateResult(req,res,next)
}
];
