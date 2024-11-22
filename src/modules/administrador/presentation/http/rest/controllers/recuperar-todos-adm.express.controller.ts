import { RecuperarTodosAdmUseCase } from "../../../../../../modules/administrador/application/use-cases/recuperar-todos-adm/recuperar-todos-adm.use-case";
import { IAdministrador } from "../../../../../../modules/administrador/domain/administrador.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

class RecuperarTodosAdmExpressController extends ExpressController {

    private _recuperarTodosAdmUseCase: RecuperarTodosAdmUseCase;

    constructor(recuperarTodosAdmUseCase: RecuperarTodosAdmUseCase) {
        super();
        this._recuperarTodosAdmUseCase = recuperarTodosAdmUseCase;
    }

    async recuperar(request: Request, response: Response, next: NextFunction) {
        try {
            const listaAdmDTO: Array<IAdministrador> = await this._recuperarTodosAdmUseCase.execute();
            this.sendSuccessResponse(response,listaAdmDTO);
        } catch (error) {
            next(error);
        }

    }

}

export { RecuperarTodosAdmExpressController }