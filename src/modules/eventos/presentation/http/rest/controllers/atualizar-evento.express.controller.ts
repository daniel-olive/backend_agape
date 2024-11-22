import { EventoApplicationExceptions } from "../../../../../../modules/eventos/application/evento.application.exception";
import { AtualizarEventoUseCase } from "../../../../../../modules/eventos/application/use-cases/atualizar-evento/atualizar-evento-use-case";
import { RecuperarEventoProps } from "../../../../../../modules/eventos/domain/evento.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { HttpErrors } from "../../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class AtualizarEventoExpressController extends ExpressController {

    private _atualizarEventoUseCase: AtualizarEventoUseCase;

    constructor(atualizarEventoUseCase: AtualizarEventoUseCase) {
        super();
        this._atualizarEventoUseCase = atualizarEventoUseCase;
    } 

    async atualizar(request: Request, response: Response, next: NextFunction) {
        try {
            const eventoInputDTO: RecuperarEventoProps = request.body as RecuperarEventoProps;
            const eventoAtualizado: boolean = await this._atualizarEventoUseCase.execute(eventoInputDTO);
            this.sendSuccessResponse(response,eventoAtualizado);
        } catch (error) {
            if (error instanceof EventoApplicationExceptions.EventoNaoEncontrado){
                error = new HttpErrors.NotFoundError({ message: error.message });
            }
            next(error);
        }
    }

}

export { AtualizarEventoExpressController }