import { atualizarConteudoUseCase, deletarConteudoUseCase, inserirConteudoUseCase, recuperarConteudoPorIdUseCase, recuperarTodosConteudosUseCase } from "../../../../../../modules/conteudo/application/use-cases";
import { RecuperarConteudoPorIdExpressController } from "./recuperar-conteudo-por-id.express.controller";
import { RecuperarTodosConteudosExpressController } from "./recuperar-todos-conteudos.express.controller";
import { AtualizarConteudoExpressController } from "./atualizar-conteudo.express.controller";
import { InserirConteudoExpressController } from "./inserir-conteudo.express.controller";
import { DeletarConteudoExpressController } from "./deletar-conteudo.express.controller";


const recuperarConteudoPorIdController = new RecuperarConteudoPorIdExpressController(recuperarConteudoPorIdUseCase);
const recuperarTodosConteudosController = new RecuperarTodosConteudosExpressController(recuperarTodosConteudosUseCase);
const atualizarConteudoController = new AtualizarConteudoExpressController(atualizarConteudoUseCase)
const inserirConteudoController = new InserirConteudoExpressController(inserirConteudoUseCase)
const deletarConteudoController = new DeletarConteudoExpressController(deletarConteudoUseCase)

export {
    recuperarConteudoPorIdController,
    recuperarTodosConteudosController,
    atualizarConteudoController,
    inserirConteudoController,
    deletarConteudoController
}