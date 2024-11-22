import express from 'express';
import { atualizarAdmController, autenticarAdmController, deletarAdmController, recuperarAdmPorIdController, recuperarTodosAdmController, registrarAdmController } from './controllers';
import { contentType } from '../../../../../main/presentation/http/middlewares/content-type.middleware';
import { validaInputAtualizarAdm } from '../middlewares/valida-input-atualizar-administrador.middleware';
import { validaInputInserirAdm } from '../middlewares/valida-input-inserir-administrador.middleware';
import { validaInputAutenticarAdm } from '../middlewares/valida-input-autenticar-administrador.middleware';

const administradorRouter = express.Router();

administradorRouter.post(
    '/',
    validaInputInserirAdm,
    contentType,
    (request, response, next) =>  registrarAdmController.registrar(request, response, next)
)

administradorRouter.post(
    '/autenticacao',
    validaInputAutenticarAdm,
    (request, response, next) =>  autenticarAdmController.autenticar(request, response, next)
)

administradorRouter.get(
    '/:id',
    (request, response, next) =>  recuperarAdmPorIdController.recuperar(request, response, next)
)

administradorRouter.get(
    '/',
    (request, response, next) =>  recuperarTodosAdmController.recuperar(request, response, next)
)


administradorRouter.put(
    '/:id',
    validaInputAtualizarAdm,
    contentType,
    (request, response, next) =>  atualizarAdmController.atualizar(request, response, next)
)

administradorRouter.delete(
    '/:id',
    (request, response, next) =>  deletarAdmController.deletar(request, response, next)
)

export { administradorRouter };