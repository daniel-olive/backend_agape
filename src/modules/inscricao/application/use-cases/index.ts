import { inscricaoRepositorio } from "../../../../modules/inscricao/infra/database"
import { AtualizarInscricaoUseCase } from "./atualizar-inscricao/atualizar-inscricao.use-case"
import { DeletarInscricaoUseCase } from "./deletar-inscricao/deletar-inscricao.use-case"
import { InserirInscricaoUseCase } from "./inserir-inscricao/inserir-inscricao.use-case"
import { RecuperarTodasInscricoesUseCase } from "./recuperar-todas-inscricoes/recuperar-todas-inscricoes-use-case";


const recuperarTodasInscricoesUseCase = new RecuperarTodasInscricoesUseCase(inscricaoRepositorio);
const inserirInscricaoUseCase = new InserirInscricaoUseCase(inscricaoRepositorio)
const atualizarInscricaoUseCase = new AtualizarInscricaoUseCase(inscricaoRepositorio)
const deletarInscricaoUseCase = new DeletarInscricaoUseCase(inscricaoRepositorio)

export {
    inserirInscricaoUseCase,
    atualizarInscricaoUseCase,
    deletarInscricaoUseCase,
    recuperarTodasInscricoesUseCase
}