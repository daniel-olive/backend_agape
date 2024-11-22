import express from 'express';
import {atualizarCategoriaController, deletarCategoriaController, recuperarTodasCategoriasController, registrarCategoriaController } from './controllers';
import { contentType } from '../../../../../main/presentation/http/middlewares/content-type.middleware';
import { authAdm } from '../../../../../main/presentation/http/middlewares/authMiddleware';
import { validaInputInserirCategoria } from '../middlewares/valida-input-inserir-categoria.middleware';


const categoriaRouter = express.Router();


categoriaRouter.post(
    '/',
    validaInputInserirCategoria,
    contentType,
    (request, response, next) =>  registrarCategoriaController.registrar(request, response, next)
)

categoriaRouter.get(
    '/',
    (request, response, next) =>  recuperarTodasCategoriasController.recuperar(request, response, next)
)


categoriaRouter.put(
    '/editar/:id',
    contentType,
    (request, response, next) =>  atualizarCategoriaController.atualizar(request, response, next)
)

categoriaRouter.delete(
    '/:id',
    (request, response, next) =>  deletarCategoriaController.deletar(request, response, next)
)

export { categoriaRouter };