
import { RecuperarTodasInscricoesUseCase } from "../../../../../../modules/inscricao/application/use-cases/recuperar-todas-inscricoes/recuperar-todas-inscricoes-use-case";
import { IInscricao } from "../../../../../../modules/inscricao/domain/inscricao.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

class RecuperarTodasInscricoesExpressController extends ExpressController {

    private _recuperarTodasInscricoesUseCase: RecuperarTodasInscricoesUseCase;

    constructor(recuperarTodasInscricoesUseCase: RecuperarTodasInscricoesUseCase) {
        super();
        this._recuperarTodasInscricoesUseCase = recuperarTodasInscricoesUseCase;
    }

    async recuperar(request: Request, response: Response, next: NextFunction) {
        try {
            const listainscricoesDTO: Array<IInscricao> = await this._recuperarTodasInscricoesUseCase.execute();
            this.sendSuccessResponse(response,listainscricoesDTO);
        } catch (error) {
            next(error);
        }

    }

}

export { RecuperarTodasInscricoesExpressController }