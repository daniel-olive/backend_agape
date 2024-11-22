import { liturgiaRepositorio } from "../../../../modules/liturgia/infra/database"
import { InserirLiturgiaUseCase } from "./inserir-liturgia/inserir-liturgia.use-case"
import { AtualizarLiturgiaUseCase } from "./atualizar-liturgia/atualizar-liturgia.use-case"
import { DeletarLiturgiaUseCase } from "./deletar-liturgia/deletar-liturgia.use-case"
import { RecuperarTodasLiturgiasUseCase } from "./recuperar-todas-liturgias/recuperar-todas-liturgias.use-case"
import { RecuperarLiturgiaPorIdUseCase } from "./recuperar-liturgia-por-id/recuperar-liturgia-por-id.use-case"



const inserirLiturgiaUseCase = new InserirLiturgiaUseCase(liturgiaRepositorio)
const atualizarLiturgiaUseCase = new AtualizarLiturgiaUseCase(liturgiaRepositorio)
const deletarLiturgiaUseCase = new DeletarLiturgiaUseCase(liturgiaRepositorio)
const recuperarTodasLiturgiasUseCase = new RecuperarTodasLiturgiasUseCase(liturgiaRepositorio)
const recuperarLiturgiaPorIdUseCase = new RecuperarLiturgiaPorIdUseCase(liturgiaRepositorio)

export {
    inserirLiturgiaUseCase,
    atualizarLiturgiaUseCase,
    deletarLiturgiaUseCase,
    recuperarTodasLiturgiasUseCase,
    recuperarLiturgiaPorIdUseCase
}