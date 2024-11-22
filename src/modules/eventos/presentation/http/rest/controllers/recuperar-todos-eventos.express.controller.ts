import { RecuperarTodosEventosUseCase } from "../../../../../../modules/eventos/application/use-cases/recuperar-todos-eventos/recuperar-todos-evento-use-case";
import { IEvento } from "../../../../../../modules/eventos/domain/evento.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

class RecuperarTodosEventosExpressController extends ExpressController {

    private _recuperarTodosEventosUseCase: RecuperarTodosEventosUseCase;

    constructor(recuperarTodosEventosUseCase: RecuperarTodosEventosUseCase) {
        super();
        this._recuperarTodosEventosUseCase = recuperarTodosEventosUseCase;
    }

    async recuperar(request: Request, response: Response, next: NextFunction) {
        try {
            const listaEventosDTO: Array<IEvento> = await this._recuperarTodosEventosUseCase.execute();
            this.sendSuccessResponse(response,listaEventosDTO);
        } catch (error) {
            next(error);
        }

    }

}

export { RecuperarTodosEventosExpressController }