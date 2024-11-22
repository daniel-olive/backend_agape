import { AdmApplicationExceptions } from "../../../../../../modules/administrador/application/administrador.application.exception";
import { AutenticarAdmUseCase } from "../../../../../../modules/administrador/application/use-cases/autenticar-administrador/autenticar-administrador.use-case";
import { CredenciaisAdmProps, IAdministrador } from "../../../../../../modules/administrador/domain/administrador.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { HttpErrors } from "../../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

class AutenticarAdmExpressController extends ExpressController {

    private _autenticarAdmUseCase: AutenticarAdmUseCase;

    constructor(autenticarAdmUseCase: AutenticarAdmUseCase) {
        super();
        this._autenticarAdmUseCase = autenticarAdmUseCase;
    }

    async autenticar(request: Request, response: Response, next: NextFunction) {
        try {
            const credenciaisInputDTO: CredenciaisAdmProps = request.body as CredenciaisAdmProps;
           
            const administradorAutenticado: IAdministrador = await this._autenticarAdmUseCase.execute(credenciaisInputDTO);

            //Cria um objeto com dados simplificados de usuário
            const { id, nome, email, tipo } = administradorAutenticado;
            const administradorSimplificadoDTO = { id, nome, email, tipo};

            //Gera o Token JWT com os dados simplificados do usuário
            const secretKey = process.env.JWT_SECRET_KEY as string;
            const token = jwt.sign(administradorSimplificadoDTO, secretKey, { expiresIn: '1h' });
   
            this.sendSuccessResponse(response,token);
        } catch (error) {
            if (error instanceof AdmApplicationExceptions.AdmNaoEncontrado){
                error = new HttpErrors.NotFoundError({ message: error.message });
            }
            next(error);
        }
    }

}

export { AutenticarAdmExpressController }