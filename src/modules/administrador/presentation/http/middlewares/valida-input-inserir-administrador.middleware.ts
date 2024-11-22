import { HttpErrors } from "../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";
import { fromZodError } from 'zod-validation-error';

const inserirAdmSchema = z.object(
    {
        nome: z.string().min(6).max(50),
        email: z.string().min(6).max(50),
        senha: z.string().min(6).max(50),
        tipo: z.string().min(6).max(50)
    }
).strict();

const validaInputInserirAdmMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction) => {
        try {
            inserirAdmSchema.parse(request.body);
            next();
        } catch (error: any) {
            const validationError = fromZodError(error);
            error = new HttpErrors.BadRequestError({message: validationError.message });
            next(error);
        }
}

export { validaInputInserirAdmMiddleware as validaInputInserirAdm }