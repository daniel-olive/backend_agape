import { AtualizarEventoExpressController } from "./atualizar-evento.express.controller";
import { DeletarEventoExpressController } from "./deletar-evento.express.controller";
import { InserirEventoExpressController } from "./inserir-evento.express.controller";
import { RecuperarEventoPorIdExpressController } from "./recuperar-evento-por-id.express.controller";
import { RecuperarTodosEventosExpressController } from "./recuperar-todos-eventos.express.controller";
import { recuperarEventoPorIdUseCase, recuperarTodosEventosUseCase, atualizarEventoUseCase, inserirEventoUseCase, deletarEventoUseCase } from "../../../../../../modules/eventos/application/use-cases";

const recuperarEventoPorIdController = new RecuperarEventoPorIdExpressController(recuperarEventoPorIdUseCase);
const recuperarTodosEventosController = new RecuperarTodosEventosExpressController(recuperarTodosEventosUseCase);
const atualizarEventoController = new AtualizarEventoExpressController(atualizarEventoUseCase)
const inserirEventoController = new InserirEventoExpressController(inserirEventoUseCase)
const deletarEventoController = new DeletarEventoExpressController(deletarEventoUseCase)

export {
    recuperarEventoPorIdController,
    recuperarTodosEventosController,
    atualizarEventoController,
    inserirEventoController,
    deletarEventoController
}