import { AdmApplicationExceptions } from "../../../../../../modules/administrador/application/administrador.application.exception";
import { AtualizarAdmUseCase } from "../../../../../../modules/administrador/application/use-cases/atualizar-administrador/atualizar-administrador.use-case";
import { RecuperarAdmProps } from "../../../../../../modules/administrador/domain/administrador.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { HttpErrors } from "../../../../../../shared/presentation/http/http.error"; 
import { NextFunction, Request, Response } from "express";

class AtualizarAdmExpressController extends ExpressController {

    private _atualizarAdmUseCase: AtualizarAdmUseCase;

    constructor(atualizarAdmUseCase: AtualizarAdmUseCase) {
        super();
        this._atualizarAdmUseCase = atualizarAdmUseCase;
    } 

    async atualizar(request: Request, response: Response, next: NextFunction) {
        try {
            const administradorInputDTO: RecuperarAdmProps = request.body as RecuperarAdmProps;
            const administradorAtualizado: boolean = await this._atualizarAdmUseCase.execute(administradorInputDTO);
            this.sendSuccessResponse(response,administradorAtualizado);
        } catch (error) {
            if (error instanceof AdmApplicationExceptions.AdmNaoEncontrado){
                error = new HttpErrors.NotFoundError({ message: error.message });
            }
            next(error);
        }
    }

}

export { AtualizarAdmExpressController }