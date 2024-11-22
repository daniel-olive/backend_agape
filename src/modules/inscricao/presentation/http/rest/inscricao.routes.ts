import express from 'express';

import { contentType } from '../../../../../main/presentation/http/middlewares/content-type.middleware';
import { atualizarInscricaoController, deletarInscricaoController, inserirInscricaoController, recuperarTodasInscricoesController } from './controllers';
import { validaInputInserirInscricao } from '../middlewares/valida-input-inserir-inscricao-middleware';

const inscricaoRouter = express.Router();

inscricaoRouter.post(
    '/',
    validaInputInserirInscricao,
    contentType,
    (request, response, next) =>  inserirInscricaoController.registrar(request, response, next)
)

inscricaoRouter.get(
    '/',
    (request, response, next) =>  recuperarTodasInscricoesController.recuperar(request, response, next)
)

inscricaoRouter.put(
    '/:id',
    contentType,
    (request, response, next) =>  atualizarInscricaoController.atualizar(request, response, next)
)

inscricaoRouter.delete(
    '/:id',
    (request, response, next) =>  deletarInscricaoController.deletar(request, response, next)
)

export { inscricaoRouter };