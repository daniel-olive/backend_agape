import express from 'express';
import { atualizarEventoController, deletarEventoController, inserirEventoController, recuperarEventoPorIdController, recuperarTodosEventosController } from './controllers';
import { contentType } from '../../../../../main/presentation/http/middlewares/content-type.middleware';
import { validaInputInserirEvento } from '../middlewares/valida-input-inserir-evento.middleware';
import { validaInputAtualizarEvento } from '../middlewares/valida-input-atualizar-evento.middleware';
import { upload } from '../../../../../main/presentation/http/middlewares/multer-config';

const eventoRouter = express.Router();



eventoRouter.get(
    '/:id',
    (request, response, next) =>  recuperarEventoPorIdController.recuperar(request, response, next)
)

eventoRouter.get(
    '/',
    (request, response, next) =>  recuperarTodosEventosController.recuperar(request, response, next)
)

eventoRouter.post(
    '/',
    upload.single('banner'), // 'banner' é o nome do campo do arquivo no frontend
    contentType,
    (request, response, next) =>  inserirEventoController.inserir(request, response, next)
)

eventoRouter.put(
    '/editar/:id',
    upload.single('banner'), // Se você também permite atualização de arquivos
    contentType,
    (request, response, next) =>  atualizarEventoController.atualizar(request, response, next)
)

eventoRouter.delete(
    '/:id',
    (request, response, next) =>  deletarEventoController.deletar(request, response, next)
)

export { eventoRouter };