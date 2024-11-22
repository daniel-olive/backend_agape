import { EventoApplicationExceptions } from "../../../../../../modules/eventos/application/evento.application.exception";
import { DeletarEventoUseCase } from "../../../../../../modules/eventos/application/use-cases/deletar-evento/deletar-evento-use-case";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { HttpErrors } from "../../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class DeletarEventoExpressController extends ExpressController {

    private _deletarEventoUseCase: DeletarEventoUseCase;   

    constructor(deletarEventoUseCase: DeletarEventoUseCase) {
        super();
        this._deletarEventoUseCase = deletarEventoUseCase;
    }

    async deletar(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid:string = request.params.id;
            const eventoDeletado: boolean = await this._deletarEventoUseCase.execute(uuid);
            this.sendSuccessResponse(response,eventoDeletado);
        } catch (error) {
            if (error instanceof EventoApplicationExceptions.EventoNaoEncontrado){
                error = new HttpErrors.NotFoundError({ message: error.message });
            }
            next(error);
        }
    }

}

export { DeletarEventoExpressController }