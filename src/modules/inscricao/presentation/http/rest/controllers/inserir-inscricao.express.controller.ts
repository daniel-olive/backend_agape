import { RegistrarCategoriaUseCase } from "../../../../../../modules/categoria/application/use-cases/registrar-categoria/registrar-categoria.use-case";
import { CriarCategoriaProps, ICategoria } from "../../../../../../modules/categoria/domain/categoria.types";
import { InserirInscricaoUseCase } from "../../../../../../modules/inscricao/application/use-cases/inserir-inscricao/inserir-inscricao.use-case";
import { CriarInscricaoProps, IInscricao } from "../../../../../../modules/inscricao/domain/inscricao.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

class InserirInscricaoExpressController extends ExpressController {

    private _inserirInscricaoUseCase: InserirInscricaoUseCase;

    constructor(inserirInscricaoUseCase: InserirInscricaoUseCase) {
        super();
        this._inserirInscricaoUseCase = inserirInscricaoUseCase;
    }

    async registrar(request: Request, response: Response, next: NextFunction) {
        try {
            const inscricaoInputDTO: CriarInscricaoProps = request.body as CriarInscricaoProps;
            const inscricaoRegistrada: IInscricao = await this._inserirInscricaoUseCase.execute(inscricaoInputDTO);
            this.sendSuccessResponse(response,inscricaoRegistrada);
        } catch (error) {
            next(error);
        }
    }

}

export { InserirInscricaoExpressController }
