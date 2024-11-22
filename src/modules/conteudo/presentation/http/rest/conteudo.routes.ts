import express from 'express';
import {
  atualizarConteudoController,
  deletarConteudoController,
  inserirConteudoController,
  recuperarConteudoPorIdController,
  recuperarTodosConteudosController
} from './controllers';
import { contentType } from '../../../../../main/presentation/http/middlewares/content-type.middleware';
import { upload } from '../../../../../main/presentation/http/middlewares/multer-config';


const conteudoRouter = express.Router();

// Defina os tipos permitidos para cada rota


conteudoRouter.get(
  '/:id',
  (request, response, next) => recuperarConteudoPorIdController.recuperar(request, response, next)
);

conteudoRouter.get(
  '/',
  (request, response, next) => recuperarTodosConteudosController.recuperar(request, response, next)
);


conteudoRouter.post(
  '/',
  upload.single('banner'),
  contentType,
  (request, response, next) => inserirConteudoController.inserir(request, response, next)
);

conteudoRouter.put(
  '/editar/:id',
 
  upload.single('banner'),
  contentType,
  (request, response, next) => atualizarConteudoController.atualizar(request, response, next)
);

conteudoRouter.delete(
  '/:id',
  
  (request, response, next) => deletarConteudoController.deletar(request, response, next)
);

export { conteudoRouter };
