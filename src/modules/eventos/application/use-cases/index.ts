import { eventoRepositorio } from "../../../../modules/eventos/infra/database";
import { RecuperarTodosEventosUseCase } from "./recuperar-todos-eventos/recuperar-todos-evento-use-case";
import { RecuperarEventoPorIdUseCase } from "./recuperar-evento-por-id/recuperar-evento-por-id-use-case";
import { InserirEventoUseCase } from "./inserir-evento/inserir-evento-use-case";
import { AtualizarEventoUseCase } from "./atualizar-evento/atualizar-evento-use-case";
import { DeletarEventoUseCase } from "./deletar-evento/deletar-evento-use-case";




const recuperarTodosEventosUseCase = new RecuperarTodosEventosUseCase(eventoRepositorio);
const recuperarEventoPorIdUseCase = new RecuperarEventoPorIdUseCase(eventoRepositorio);
const inserirEventoUseCase = new InserirEventoUseCase(eventoRepositorio);
const atualizarEventoUseCase = new AtualizarEventoUseCase(eventoRepositorio);
const deletarEventoUseCase = new DeletarEventoUseCase(eventoRepositorio);


export {
    recuperarTodosEventosUseCase,
    recuperarEventoPorIdUseCase,
    inserirEventoUseCase,
    atualizarEventoUseCase,
    deletarEventoUseCase
}