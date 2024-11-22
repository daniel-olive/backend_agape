import { EventoApplicationExceptions } from "../../../../../../modules/eventos/application/evento.application.exception";
import { RecuperarEventoPorIdUseCase } from "../../../../../../modules/eventos/application/use-cases/recuperar-evento-por-id/recuperar-evento-por-id-use-case";
import { IEvento } from "../../../../../../modules/eventos/domain/evento.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { HttpErrors } from "../../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class RecuperarEventoPorIdExpressController extends ExpressController {

    private _recuperarEventoPorIdUseCase: RecuperarEventoPorIdUseCase;

    constructor(recuperarEventoPorIdUseCase: RecuperarEventoPorIdUseCase) {
        super();
        this._recuperarEventoPorIdUseCase = recuperarEventoPorIdUseCase;
    }

    async recuperar(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid:string = request.params.id;
            const eventoOutputDTO: IEvento = await this._recuperarEventoPorIdUseCase.execute(uuid);
            this.sendSuccessResponse(response,eventoOutputDTO);
        }
        catch (error) {
            if (error instanceof EventoApplicationExceptions.EventoNaoEncontrado){
                error = new HttpErrors.NotFoundError({ message: error.message });
            }
            next(error);
        }
    }

}

export { RecuperarEventoPorIdExpressController }