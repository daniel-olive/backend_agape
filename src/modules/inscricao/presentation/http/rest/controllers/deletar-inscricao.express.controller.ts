
import { InscricaoApplicationExceptions } from "../../../../../../modules/inscricao/application/inscricao.application.exception";
import { DeletarInscricaoUseCase } from "../../../../../../modules/inscricao/application/use-cases/deletar-inscricao/deletar-inscricao.use-case";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { HttpErrors } from "../../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class DeletarInscricaoExpressController extends ExpressController {

    private _deletarInscricaoUseCase: DeletarInscricaoUseCase;   

    constructor(deletarInscricaoUseCase: DeletarInscricaoUseCase) {
        super();
        this._deletarInscricaoUseCase = deletarInscricaoUseCase;
    }

    async deletar(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid:string = request.params.id;
            const inscricaoDeletada: boolean = await this._deletarInscricaoUseCase.execute(uuid);
            this.sendSuccessResponse(response,inscricaoDeletada);
        } catch (error) {
            if (error instanceof InscricaoApplicationExceptions.InscricaoNaoEncontrada){
                error = new HttpErrors.NotFoundError({ message: error.message });
            }
            next(error);
        }
    }

}

export { DeletarInscricaoExpressController }