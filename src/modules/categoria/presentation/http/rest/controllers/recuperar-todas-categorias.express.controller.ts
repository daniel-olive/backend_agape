import { RecuperarTodosAdmUseCase } from "../../../../../../modules/administrador/application/use-cases/recuperar-todos-adm/recuperar-todos-adm.use-case";
import { IAdministrador } from "../../../../../../modules/administrador/domain/administrador.types";
import { RecuperarTodasCategoriasUseCase } from "../../../../../../modules/categoria/application/use-cases/recuperar-todas-categorias/recuperar-todas-categorias.use-case";
import { ICategoria } from "../../../../../../modules/categoria/domain/categoria.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

class RecuperarTodasCategoriasExpressController extends ExpressController {

    private _recuperarTodasCategoriasUseCase: RecuperarTodasCategoriasUseCase;

    constructor(recuperarTodasCategoriasUseCase: RecuperarTodasCategoriasUseCase) {
        super();
        this._recuperarTodasCategoriasUseCase = recuperarTodasCategoriasUseCase;
    }

    async recuperar(request: Request, response: Response, next: NextFunction) {
        try {
            const listaCategoriasDTO: Array<ICategoria> = await this._recuperarTodasCategoriasUseCase.execute();
            this.sendSuccessResponse(response,listaCategoriasDTO);
        } catch (error) {
            next(error);
        }

    }

}

export { RecuperarTodasCategoriasExpressController }