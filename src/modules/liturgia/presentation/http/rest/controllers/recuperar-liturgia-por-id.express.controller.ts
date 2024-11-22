
import { LiturgiaApplicationExceptions } from "../../../../../../modules/liturgia/application/liturgia.application.exception";
import { RecuperarLiturgiaPorIdUseCase } from "../../../../../../modules/liturgia/application/use-cases/recuperar-liturgia-por-id/recuperar-liturgia-por-id.use-case";
import { ILiturgia } from "../../../../../../modules/liturgia/domain/liturgia.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { HttpErrors } from "../../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class RecuperarLiturgiaPorIdExpressController extends ExpressController {

    private _recuperarLiturgiaPorIdUseCase: RecuperarLiturgiaPorIdUseCase;

    constructor(recuperarLiturgiaPorIdUseCase: RecuperarLiturgiaPorIdUseCase) {
        super();
        this._recuperarLiturgiaPorIdUseCase = recuperarLiturgiaPorIdUseCase;
    }

    async recuperar(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid:string = request.params.id;
            const liturgiaOutputDTO: ILiturgia = await this._recuperarLiturgiaPorIdUseCase.execute(uuid);
            this.sendSuccessResponse(response,liturgiaOutputDTO);
        }
        catch (error) {
            if (error instanceof LiturgiaApplicationExceptions.LiturgiaNaoEncontrada){
                error = new HttpErrors.NotFoundError({ message: error.message });
            }
            next(error);
        }
    }

}

export { RecuperarLiturgiaPorIdExpressController }