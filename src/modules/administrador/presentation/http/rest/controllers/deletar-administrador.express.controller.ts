import { AdmApplicationExceptions } from "../../../../../../modules/administrador/application/administrador.application.exception";
import { DeletarAdmUseCase } from "../../../../../../modules/administrador/application/use-cases/deletar-administrador/deletar-administrador.use-case";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { HttpErrors } from "../../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class DeletarAdmExpressController extends ExpressController {

    private _deletarAdmUseCase: DeletarAdmUseCase;   

    constructor(deletarAdmUseCase: DeletarAdmUseCase) {
        super();
        this._deletarAdmUseCase = deletarAdmUseCase;
    }

    async deletar(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid:string = request.params.id;
            const administradorDeletado: boolean = await this._deletarAdmUseCase.execute(uuid);
            this.sendSuccessResponse(response,administradorDeletado);
        } catch (error) {
            if (error instanceof AdmApplicationExceptions.AdmNaoEncontrado){
                error = new HttpErrors.NotFoundError({ message: error.message });
            }
            next(error);
        }
    }

}

export { DeletarAdmExpressController }