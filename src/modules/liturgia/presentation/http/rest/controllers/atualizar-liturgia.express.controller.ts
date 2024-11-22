
import { LiturgiaApplicationExceptions } from "../../../../../../modules/liturgia/application/liturgia.application.exception";
import { AtualizarLiturgiaUseCase } from "../../../../../../modules/liturgia/application/use-cases/atualizar-liturgia/atualizar-liturgia.use-case";
import { RecuperarLiturgiaProps } from "../../../../../../modules/liturgia/domain/liturgia.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { HttpErrors } from "../../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class AtualizarLiturgiaExpressController extends ExpressController {

    private _atualizarLiturgiaUseCase: AtualizarLiturgiaUseCase;

    constructor(atualizarLiturgiaUseCase: AtualizarLiturgiaUseCase) {
        super();
        this._atualizarLiturgiaUseCase = atualizarLiturgiaUseCase;
    } 

    async atualizar(request: Request, response: Response, next: NextFunction) {
        try {
            const liturgiaInputDTO: RecuperarLiturgiaProps = request.body as RecuperarLiturgiaProps;
            const liturgiaAtualizada: boolean = await this._atualizarLiturgiaUseCase.execute(liturgiaInputDTO);
            this.sendSuccessResponse(response,liturgiaAtualizada);
        } catch (error) {
            if (error instanceof LiturgiaApplicationExceptions.LiturgiaNaoEncontrada){
                error = new HttpErrors.NotFoundError({ message: error.message });
            }
            next(error);
        }
    }

}

export { AtualizarLiturgiaExpressController }