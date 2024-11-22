import { InserirEventoUseCase } from "../../../../../../modules/eventos/application/use-cases/inserir-evento/inserir-evento-use-case";
import { CriarEventoProps, IEvento } from "../../../../../../modules/eventos/domain/evento.types";
import { ExpressController } from "../../../../../../shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";
import path from 'path';

class InserirEventoExpressController extends ExpressController {
    private _inserirEventoUseCase: InserirEventoUseCase;

    constructor(inserirEventoUseCase: InserirEventoUseCase) {
        super();
        this._inserirEventoUseCase = inserirEventoUseCase;
    }

    async inserir(request: Request, response: Response, next: NextFunction) {
        try {
            const eventoInputDTO: CriarEventoProps = request.body as CriarEventoProps;

             // Caminho relativo para salvar no banco
             const bannerPath = request.file ? `uploads/${request.file.filename}` : 'default-banner.png'; // ou lançar um erro

            const eventoDTO: CriarEventoProps = {
                ...eventoInputDTO,
                banner: bannerPath // Adiciona o caminho do arquivo no DTO
            };

            const eventoOutputDTO: IEvento = await this._inserirEventoUseCase.execute(eventoDTO);

            this.sendSuccessResponse(response, eventoOutputDTO);
        } catch (error) {
            next(error);
        }
    }
}

export { InserirEventoExpressController };
