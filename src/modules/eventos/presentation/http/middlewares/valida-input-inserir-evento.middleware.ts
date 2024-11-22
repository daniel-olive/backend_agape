import { HttpErrors } from "../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";
import { fromZodError } from 'zod-validation-error';

const inserirEventoSchema = z.object(
    {
        titulo: z.string().min(3).max(50),
        descricao: z.string().min(30).max(500),
        local: z.string().min(8).max(30),
        data: z.string().min(8).max(10),
        horario: z.string().min(4).max(6)
    }
).strict();

const validaInputInserirEventoMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction) => {
        try {
            inserirEventoSchema.parse(request.body);
            next();
        } catch (error: any) {
            const validationError = fromZodError(error);
            error = new HttpErrors.BadRequestError({message: validationError.message });
            next(error);
        }
}

export { validaInputInserirEventoMiddleware as validaInputInserirEvento }