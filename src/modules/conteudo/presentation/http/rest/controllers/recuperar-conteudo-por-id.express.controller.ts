import { ConteudoApplicationExceptions } from "../../../../../../modules/conteudo/application/conteudo.application.exception";
import { RecuperarConteudoPorIdUseCase } from "../../../../../../modules/conteudo/application/use-cases/recuperar-conteudo-por-id/recuperar-conteudo-por-id-use-case";
import { IConteudo } from "../../../../../../modules/conteudo/domain/conteudo.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { HttpErrors } from "../../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class RecuperarConteudoPorIdExpressController extends ExpressController {

    private _recuperarConteudoPorIdUseCase: RecuperarConteudoPorIdUseCase;

    constructor(recuperarConteudoPorIdUseCase: RecuperarConteudoPorIdUseCase) {
        super();
        this._recuperarConteudoPorIdUseCase = recuperarConteudoPorIdUseCase;
    }

    async recuperar(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid:string = request.params.id;
            const conteudoOutputDTO: IConteudo = await this._recuperarConteudoPorIdUseCase.execute(uuid);
            this.sendSuccessResponse(response,conteudoOutputDTO);
        }
        catch (error) {
            if (error instanceof ConteudoApplicationExceptions.ConteudoNaoEncontrado){
                error = new HttpErrors.NotFoundError({ message: error.message });
            }
            next(error);
        }
    }

}

export { RecuperarConteudoPorIdExpressController }