
import { InscricaoApplicationExceptions } from "../../../../../../modules/inscricao/application/inscricao.application.exception";
import { AtualizarInscricaoUseCase } from "../../../../../../modules/inscricao/application/use-cases/atualizar-inscricao/atualizar-inscricao.use-case";
import { RecuperarInscricaoProps } from "../../../../../../modules/inscricao/domain/inscricao.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { HttpErrors } from "../../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class AtualizarInscricaoExpressController extends ExpressController {

    private _atualizarInscricaoUseCase: AtualizarInscricaoUseCase;

    constructor(atualizarInscricaoUseCase: AtualizarInscricaoUseCase) {
        super();
        this._atualizarInscricaoUseCase = atualizarInscricaoUseCase;
    } 

    async atualizar(request: Request, response: Response, next: NextFunction) {
        try {
            const inscricaoInputDTO: RecuperarInscricaoProps = request.body as RecuperarInscricaoProps;
            const inscricaoAtualizada: boolean = await this._atualizarInscricaoUseCase.execute(inscricaoInputDTO);
            this.sendSuccessResponse(response,inscricaoAtualizada);
        } catch (error) {
            if (error instanceof InscricaoApplicationExceptions.InscricaoNaoEncontrada){
                error = new HttpErrors.NotFoundError({ message: error.message });
            }
            next(error);
        }
    }

}

export { AtualizarInscricaoExpressController }