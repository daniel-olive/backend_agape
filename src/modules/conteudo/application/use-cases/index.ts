import { conteudorepositorio } from "../../../../modules/conteudo/infra/database";
import { RecuperarTodosConteudosUseCase } from "./recuperar-todos-conteudos/recuperar-todos-conteudos-use-case";
import { RecuperarConteudoPorIdUseCase } from "./recuperar-conteudo-por-id/recuperar-conteudo-por-id-use-case";
import { InserirConteudoUseCase } from "./inserir-conteudo/inserir-conteudo-use-case";
import { AtualizarConteudoUseCase } from "./atualizar-conteudo/atualizar-conteudo-use-case";
import { DeletarConteudoUseCase } from "./deletar-conteudo/deletar-conteudo-use-case";

const recuperarTodosConteudosUseCase = new RecuperarTodosConteudosUseCase(conteudorepositorio);
const recuperarConteudoPorIdUseCase = new RecuperarConteudoPorIdUseCase(conteudorepositorio);
const inserirConteudoUseCase = new InserirConteudoUseCase(conteudorepositorio);
const atualizarConteudoUseCase = new AtualizarConteudoUseCase(conteudorepositorio);
const deletarConteudoUseCase = new DeletarConteudoUseCase(conteudorepositorio);


export {
    recuperarTodosConteudosUseCase,
    recuperarConteudoPorIdUseCase,
    inserirConteudoUseCase,
    atualizarConteudoUseCase,
    deletarConteudoUseCase
}