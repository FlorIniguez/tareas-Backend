//archivo sirve para declarar como voy a extender la interfaz
declare namespace Express {
    export interface Request {
        userId: string;
    }
}