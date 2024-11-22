import { HttpErrors } from "../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";
import { fromZodError } from 'zod-validation-error';

const inserirInscricaoSchema = z.object(
    {
        nome: z.string().min(5).max(30),
        email: z.string().min(8).max(25),
        grupo: z.string().min(8).max(30),
        setor: z.string().min(4).max(15),
        eventId: z.string().min(30).max(40),
        telefone: z.string().min(8).max(11),
        idade: z.number().int().min(10).max(100)
    }
).strict();

const validaInputInserirInscricaoMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction) => {
        try {
            inserirInscricaoSchema.parse(request.body);
            next();
        } catch (error: any) {
            const validationError = fromZodError(error);
            error = new HttpErrors.BadRequestError({message: validationError.message });
            next(error);
        }
}

export { validaInputInserirInscricaoMiddleware as validaInputInserirInscricao }