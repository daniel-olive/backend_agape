import express from 'express';

import { contentType } from '../../../../../main/presentation/http/middlewares/content-type.middleware';
import { atualizarLiturgiaController, deletarLiturgiaController, inserirLiturgiaController, recuperarLiturgiaPorIdController, recuperarTodasLiturgiasController } from './controllers';

const liturgiaRouter = express.Router();

liturgiaRouter.post(
    '/',
    contentType,
    (request, response, next) =>  inserirLiturgiaController.registrar(request, response, next)
)


liturgiaRouter.put(
    '/editar/:id',
    contentType,
    (request, response, next) =>  atualizarLiturgiaController.atualizar(request, response, next)
)

liturgiaRouter.get(
    '/:id',
    (request, response, next) => recuperarLiturgiaPorIdController.recuperar(request, response, next)
  );

liturgiaRouter.get(
    '/',
    (request, response, next) =>  recuperarTodasLiturgiasController.recuperar(request, response, next)
)


liturgiaRouter.delete(
    '/:id',
    (request, response, next) =>  deletarLiturgiaController.deletar(request, response, next)
)

export { liturgiaRouter };