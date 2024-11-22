
import { RecuperarTodasLiturgiasUseCase } from "../../../../../../modules/liturgia/application/use-cases/recuperar-todas-liturgias/recuperar-todas-liturgias.use-case";
import { ILiturgia } from "../../../../../../modules/liturgia/domain/liturgia.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

class RecuperarTodasLiturgiasExpressController extends ExpressController {

    private _recuperarTodasLiturgiasUseCase: RecuperarTodasLiturgiasUseCase;

    constructor(recuperarTodasLiturgiasUseCase: RecuperarTodasLiturgiasUseCase) {
        super();
        this._recuperarTodasLiturgiasUseCase = recuperarTodasLiturgiasUseCase;
    }

    async recuperar(request: Request, response: Response, next: NextFunction) {
        try {
            const listaLiturgiasDTO: Array<ILiturgia> = await this._recuperarTodasLiturgiasUseCase.execute();
            this.sendSuccessResponse(response,listaLiturgiasDTO);
        } catch (error) {
            next(error);
        }

    }

}

export { RecuperarTodasLiturgiasExpressController }