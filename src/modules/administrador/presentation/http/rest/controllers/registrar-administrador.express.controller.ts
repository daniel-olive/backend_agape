import { RegistrarAdmUseCase } from "../../../../../../modules/administrador/application/use-cases/registrar-administrador/registrar-administrador.use-case";
import { CriarAdmProps, IAdministrador } from "../../../../../../modules/administrador/domain/administrador.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

class RegistrarAdmExpressController extends ExpressController {

    private _registrarAdmUseCase: RegistrarAdmUseCase;

    constructor(registrarAdmUseCase: RegistrarAdmUseCase) {
        super();
        this._registrarAdmUseCase = registrarAdmUseCase;
    }

    async registrar(request: Request, response: Response, next: NextFunction) {
        try {
            const administradorInputDTO: CriarAdmProps = request.body as CriarAdmProps;
            const administradorRegistrado: IAdministrador = await this._registrarAdmUseCase.execute(administradorInputDTO);
            this.sendSuccessResponse(response,administradorRegistrado);
        } catch (error) {
            next(error);
        }
    }

}

export { RegistrarAdmExpressController }