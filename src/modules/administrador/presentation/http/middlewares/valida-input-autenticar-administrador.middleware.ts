import { HttpErrors } from "../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";
import { fromZodError } from 'zod-validation-error';

const autenticarAdmSchema = z.object(
    {
        email: z.string().min(6).max(50),
        senha: z.string().min(6).max(50)
    }
).strict();

const validaInputAutenticarAdmMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction) => { 
        try {
            autenticarAdmSchema.parse(request.body);
            next();
        } catch (error: any) {
            const validationError = fromZodError(error);
            error = new HttpErrors.BadRequestError({message: validationError.message });
            next(error);
        }
}

export { validaInputAutenticarAdmMiddleware as validaInputAutenticarAdm }