import { RegistrarCategoriaUseCase } from "../../../../../../modules/categoria/application/use-cases/registrar-categoria/registrar-categoria.use-case";
import { CriarCategoriaProps, ICategoria } from "../../../../../../modules/categoria/domain/categoria.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

class RegistrarCategoriaExpressController extends ExpressController {

    private _registrarCategoriaUseCase: RegistrarCategoriaUseCase;

    constructor(registrarCategoriaUseCase: RegistrarCategoriaUseCase) {
        super();
        this._registrarCategoriaUseCase = registrarCategoriaUseCase;
    }

    async registrar(request: Request, response: Response, next: NextFunction) {
        try {
            const categoriaInputDTO: CriarCategoriaProps = request.body as CriarCategoriaProps;
            const categoriaRegistrada: ICategoria = await this._registrarCategoriaUseCase.execute(categoriaInputDTO);
            this.sendSuccessResponse(response,categoriaRegistrada);
        } catch (error) {
            next(error);
        }
    }

}

export { RegistrarCategoriaExpressController }
