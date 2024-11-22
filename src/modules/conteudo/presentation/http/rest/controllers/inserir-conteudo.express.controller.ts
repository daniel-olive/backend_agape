import { InserirConteudoUseCase } from "../../../../../../modules/conteudo/application/use-cases/inserir-conteudo/inserir-conteudo-use-case";
import { CriarConteudoProps, IConteudo } from "../../../../../../modules/conteudo/domain/conteudo.types";
import { logger } from "../../../../../../shared/helpers/logger.winston";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

class InserirConteudoExpressController extends ExpressController {

    private _inserirConteudoUseCase: InserirConteudoUseCase;

    constructor(inserirConteudoUseCase: InserirConteudoUseCase) {
        super();
        this._inserirConteudoUseCase = inserirConteudoUseCase;
    }

    async inserir(request: Request, response: Response, next: NextFunction) {
        try {
            const conteudoInputDTO: CriarConteudoProps = request.body as CriarConteudoProps;
            logger.info(conteudoInputDTO)

            // Caminho relativo para salvar no banco
            const bannerPath = request.file ? `uploads/${request.file.filename}` : 'default-banner.png'; // ou lançar um erro

            const conteudoDTO: CriarConteudoProps = {
                ...conteudoInputDTO,
                banner: bannerPath // Adiciona o caminho do arquivo no DTO
            };
           

            const conteudoOutputDTO: IConteudo = await this._inserirConteudoUseCase.execute(conteudoDTO);
            this.sendSuccessResponse(response,conteudoOutputDTO);
        }
        catch (error){
            next(error);
        }
    }

}

export { InserirConteudoExpressController }