import { ConteudoApplicationExceptions } from "../../../../../../modules/conteudo/application/conteudo.application.exception";
import { AtualizarConteudoUseCase } from "../../../../../../modules/conteudo/application/use-cases/atualizar-conteudo/atualizar-conteudo-use-case";
import { RecuperarConteudoProps } from "../../../../../../modules/conteudo/domain/conteudo.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { HttpErrors } from "../../../../../../shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class AtualizarConteudoExpressController extends ExpressController {

    private _atualizarConteudoUseCase: AtualizarConteudoUseCase;

    constructor(atualizarConteudoUseCase: AtualizarConteudoUseCase) {
        super();
        this._atualizarConteudoUseCase = atualizarConteudoUseCase;
    } 

    async atualizar(request: Request, response: Response, next: NextFunction) {
        try {
            const conteudoInputDTO: RecuperarConteudoProps = {
                id: request.params.id, // Certifique-se de que o ID está sendo corretamente extraído da URL
                ...request.body
            };
            

            // Caminho relativo para salvar no banco
            const bannerPath = request.file ? `uploads/${request.file.filename}` : 'default-banner.png'; // ou lançar um erro

            const conteudoDTO: RecuperarConteudoProps = {
                ...conteudoInputDTO,
                banner: bannerPath // Adiciona o caminho do arquivo no DTO
            };

            const conteudoAtualizado: boolean = await this._atualizarConteudoUseCase.execute(conteudoDTO);
            this.sendSuccessResponse(response,conteudoAtualizado);

            
        } catch (error) {
            if (error instanceof ConteudoApplicationExceptions.ConteudoNaoEncontrado){
                error = new HttpErrors.NotFoundError({ message: error.message });
            }
            next(error);
        }
    }

}

export { AtualizarConteudoExpressController }