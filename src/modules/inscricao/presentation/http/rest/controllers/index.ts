
import { InserirInscricaoExpressController } from "./inserir-inscricao.express.controller"
import { AtualizarInscricaoExpressController } from "./atualizar-inscricao.express.controller"
import { DeletarInscricaoExpressController } from "./deletar-inscricao.express.controller"
import { atualizarInscricaoUseCase, deletarInscricaoUseCase, inserirInscricaoUseCase, recuperarTodasInscricoesUseCase } from "../../../../../../modules/inscricao/application/use-cases"
import { RecuperarTodasInscricoesExpressController } from "./recuperar-todas-inscricoes.express.controller"


const inserirInscricaoController = new InserirInscricaoExpressController(inserirInscricaoUseCase)
const recuperarTodasInscricoesController = new RecuperarTodasInscricoesExpressController(recuperarTodasInscricoesUseCase)
const atualizarInscricaoController = new AtualizarInscricaoExpressController(atualizarInscricaoUseCase)
const deletarInscricaoController = new DeletarInscricaoExpressController(deletarInscricaoUseCase)

export{
    inserirInscricaoController,
    atualizarInscricaoController,
    deletarInscricaoController,
    recuperarTodasInscricoesController
}

