
import { LiturgiaApplicationExceptions } from "../../../../../../modules/liturgia/application/liturgia.application.exception";
import { DeletarLiturgiaUseCase } from "../../../../../../modules/liturgia/application/use-cases/deletar-liturgia/deletar-liturgia.use-case";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { HttpErrors } from "../../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class DeletarLiturgiaExpressController extends ExpressController {

    private _deletarLiturgiaUseCase: DeletarLiturgiaUseCase;   

    constructor(deletarLiturgiaUseCase: DeletarLiturgiaUseCase) {
        super();
        this._deletarLiturgiaUseCase = deletarLiturgiaUseCase;
    }

    async deletar(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid:string = request.params.id;
            const liturgiaDeletada: boolean = await this._deletarLiturgiaUseCase.execute(uuid);
            this.sendSuccessResponse(response,liturgiaDeletada);
        } catch (error) {
            if (error instanceof LiturgiaApplicationExceptions.LiturgiaNaoEncontrada){
                error = new HttpErrors.NotFoundError({ message: error.message });
            }
            next(error);
        }
    }

}

export { DeletarLiturgiaExpressController }