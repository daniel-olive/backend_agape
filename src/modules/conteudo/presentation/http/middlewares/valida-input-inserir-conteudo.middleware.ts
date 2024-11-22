import { HttpErrors } from "../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";
import { fromZodError } from 'zod-validation-error';

const inserirConteudoSchema = z.object(
    {
        nome: z.string().min(3).max(50)
    }
).strict();

const validaInputInserirConteudoMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction) => {
        try {
            inserirConteudoSchema.parse(request.body);
            next();
        } catch (error: any) {
            const validationError = fromZodError(error);
            error = new HttpErrors.BadRequestError({message: validationError.message });
            next(error);
        }
}

export { validaInputInserirConteudoMiddleware as validaInputInserirConteudo }