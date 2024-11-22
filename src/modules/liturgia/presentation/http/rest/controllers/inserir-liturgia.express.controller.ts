
import { InserirLiturgiaUseCase } from "../../../../../../modules/liturgia/application/use-cases/inserir-liturgia/inserir-liturgia.use-case";
import { CriarLiturgiaProps, ILiturgia } from "../../../../../../modules/liturgia/domain/liturgia.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

class InserirLiturgiaExpressController extends ExpressController {

    private _inserirLiturgiaUseCase: InserirLiturgiaUseCase;

    constructor(inserirLiturgiaUseCase: InserirLiturgiaUseCase) {
        super();
        this._inserirLiturgiaUseCase = inserirLiturgiaUseCase;
    }

    async registrar(request: Request, response: Response, next: NextFunction) {
        try {
            const liturgiaInputDTO: CriarLiturgiaProps = request.body as CriarLiturgiaProps;
            const liturgiaRegistrada: ILiturgia = await this._inserirLiturgiaUseCase.execute(liturgiaInputDTO);
            this.sendSuccessResponse(response,liturgiaRegistrada);
        } catch (error) {
            next(error);
        }
    }

}

export { InserirLiturgiaExpressController }
