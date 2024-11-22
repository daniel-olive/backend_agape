import { atualizarLiturgiaUseCase, deletarLiturgiaUseCase, inserirLiturgiaUseCase, recuperarLiturgiaPorIdUseCase, recuperarTodasLiturgiasUseCase } from "../../../../../../modules/liturgia/application/use-cases"
import { AtualizarLiturgiaExpressController } from "./atualizar-liturgia.express.controller"
import { DeletarLiturgiaExpressController } from "./deletar-liturgia.express.controller"
import { InserirLiturgiaExpressController } from "./inserir-liturgia.express.controller"
import { RecuperarTodasLiturgiasExpressController } from "./recuperar-todas-liturgias.express.controller"
import { RecuperarLiturgiaPorIdExpressController } from "./recuperar-liturgia-por-id.express.controller"



const inserirLiturgiaController = new InserirLiturgiaExpressController(inserirLiturgiaUseCase)
const atualizarLiturgiaController = new AtualizarLiturgiaExpressController(atualizarLiturgiaUseCase)
const deletarLiturgiaController = new DeletarLiturgiaExpressController(deletarLiturgiaUseCase)
const recuperarTodasLiturgiasController = new RecuperarTodasLiturgiasExpressController(recuperarTodasLiturgiasUseCase)
const recuperarLiturgiaPorIdController = new RecuperarLiturgiaPorIdExpressController(recuperarLiturgiaPorIdUseCase)

export{
    inserirLiturgiaController,
    atualizarLiturgiaController,
    deletarLiturgiaController,
    recuperarTodasLiturgiasController,
    recuperarLiturgiaPorIdController
}

