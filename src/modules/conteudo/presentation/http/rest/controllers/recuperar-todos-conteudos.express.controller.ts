import { RecuperarTodosConteudosUseCase } from "../../../../../../modules/conteudo/application/use-cases/recuperar-todos-conteudos/recuperar-todos-conteudos-use-case";
import { IConteudo } from "../../../../../../modules/conteudo/domain/conteudo.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

class RecuperarTodosConteudosExpressController extends ExpressController {

    private _recuperarTodosConteudosUseCase: RecuperarTodosConteudosUseCase;

    constructor(recuperarTodosConteudosUseCase: RecuperarTodosConteudosUseCase) {
        super();
        this._recuperarTodosConteudosUseCase = recuperarTodosConteudosUseCase;
    }

    async recuperar(request: Request, response: Response, next: NextFunction) {
        try {
            const listaConteudosDTO: Array<IConteudo> = await this._recuperarTodosConteudosUseCase.execute();
            this.sendSuccessResponse(response,listaConteudosDTO);
        } catch (error) {
            next(error);
        }

    }

}

export { RecuperarTodosConteudosExpressController }