import { administradorRouter } from '../../../../modules/administrador/presentation/http/rest/administrador.routes';
import { categoriaRouter } from '../../../../modules/categoria/presentation/http/rest/categoria.routes';
import { conteudoRouter } from '../../../../modules/conteudo/presentation/http/rest/conteudo.routes';
import { eventoRouter } from '../../../../modules/eventos/presentation/http/rest/evento.routes';
import { inscricaoRouter } from '../../../../modules/inscricao/presentation/http/rest/inscricao.routes';
import { liturgiaRouter } from '../../../../modules/liturgia/presentation/http/rest/liturgia.routes';
import express, { Router } from 'express';
import path from 'path';
import { contatoRouter } from '../serviceroutes/contato.routes';
import { estatisticasRouter } from '../serviceroutes/estatisticas.routes';
import { conteudosadmRouter } from '../serviceroutes/conteudosadm.routes';



const apiv1Router: Router = express.Router();

apiv1Router.use(express.json()); // Adicione isto para lidar com o corpo JSON

apiv1Router.use(
  '/enviaremail',
  contatoRouter
);

apiv1Router.use(
  '/statistics',
  estatisticasRouter
)

apiv1Router.use(
  '/conteudosadm',
  conteudosadmRouter
)


apiv1Router.use(
    '/uploads',
    express.static(path.resolve(__dirname, '../../uploads'))
)

apiv1Router.use(
    '/eventos',
    eventoRouter
);

apiv1Router.use(
    '/conteudos',
    conteudoRouter
);

apiv1Router.use(
    '/categorias',
    categoriaRouter
);

apiv1Router.use(
    '/administradores',
   administradorRouter
);

apiv1Router.use(
    '/liturgias',
    liturgiaRouter
);

apiv1Router.use(
    '/inscricoes',
    inscricaoRouter
);


export { apiv1Router }