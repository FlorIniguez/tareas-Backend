import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateJWT = (id: string): string => {
    
  const payload = { id };
  const token: string = jwt.sign(payload, process.env.TOKEN_SECRET  || "", {expiresIn:60*60});
  return token;
};

export { generateJWT };
