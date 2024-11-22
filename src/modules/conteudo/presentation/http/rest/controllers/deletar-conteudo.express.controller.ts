import { ConteudoApplicationExceptions } from "../../../../../../modules/conteudo/application/conteudo.application.exception";
import { DeletarConteudoUseCase } from "../../../../../../modules/conteudo/application/use-cases/deletar-conteudo/deletar-conteudo-use-case";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { HttpErrors } from "../../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class DeletarConteudoExpressController extends ExpressController {

    private _deletarConteudoUseCase: DeletarConteudoUseCase;   

    constructor(deletarConteudoUseCase: DeletarConteudoUseCase) {
        super();
        this._deletarConteudoUseCase = deletarConteudoUseCase;
    }

    async deletar(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid:string = request.params.id;
            const conteudoDeletado: boolean = await this._deletarConteudoUseCase.execute(uuid);
            this.sendSuccessResponse(response,conteudoDeletado);
        } catch (error) {
            if (error instanceof ConteudoApplicationExceptions.ConteudoNaoEncontrado){
                error = new HttpErrors.NotFoundError({ message: error.message });
            }
            next(error);
        }
    }

}

export { DeletarConteudoExpressController }