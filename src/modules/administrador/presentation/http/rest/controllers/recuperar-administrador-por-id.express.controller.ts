import { AdmApplicationExceptions } from "../../../../../../modules/administrador/application/administrador.application.exception";
import { RecuperarAdmPorIdUseCase } from "../../../../../../modules/administrador/application/use-cases/recuperar-administrador-por-id/recuperar-administrador-por-id.use-case";
import { IAdministrador } from "../../../../../../modules/administrador/domain/administrador.types";
import { IConteudo } from "../../../../../../modules/conteudo/domain/conteudo.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { HttpErrors } from "../../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class RecuperarAdmPorIdExpressController extends ExpressController {

    private _recuperarAdmPorIdUseCase: RecuperarAdmPorIdUseCase;

    constructor(recuperarAdmPorIdUseCase: RecuperarAdmPorIdUseCase) {
        super();
        this._recuperarAdmPorIdUseCase = recuperarAdmPorIdUseCase;
    }

    async recuperar(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid:string = request.params.id;
            const admOutputDTO: IAdministrador = await this._recuperarAdmPorIdUseCase.execute(uuid);
            this.sendSuccessResponse(response,admOutputDTO);
        }
        catch (error) {
            if (error instanceof AdmApplicationExceptions.AdmNaoEncontrado){
                error = new HttpErrors.NotFoundError({ message: error.message });
            }
            next(error);
        }
    }

}

export { RecuperarAdmPorIdExpressController }