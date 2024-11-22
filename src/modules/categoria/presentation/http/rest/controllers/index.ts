import { RegistrarCategoriaUseCase } from "../../../../../../modules/categoria/application/use-cases/registrar-categoria/registrar-categoria.use-case"
import { AtualizarCategoriaExpressController } from "./atualizar-categoria.express.controller"
import { DeletarCategoriaExpressController } from "./deletar-categoria.express.controller"
import { RegistrarCategoriaExpressController } from "./registrar-categoria.express.controller"
import { AtualizarCategoriaUseCase } from "../../../../../../modules/categoria/application/use-cases/atualizar-categoria/atualizar-categoria.use-case"
import { DeletarCategoriaUseCase } from "../../../../../../modules/categoria/application/use-cases/deletar-categoria/deletar-categoria.use-case"
import { atualizarCategoriaUseCase, deletarCategoriaUseCase, recuperarTodasCategoriasUseCase, registrarCategoriaUseCase } from "../../../../../../modules/categoria/application/use-cases"
import { RecuperarTodasCategoriasExpressController } from "./recuperar-todas-categorias.express.controller"


const registrarCategoriaController = new RegistrarCategoriaExpressController(registrarCategoriaUseCase)
const atualizarCategoriaController = new AtualizarCategoriaExpressController(atualizarCategoriaUseCase)
const deletarCategoriaController = new DeletarCategoriaExpressController(deletarCategoriaUseCase)
const recuperarTodasCategoriasController = new RecuperarTodasCategoriasExpressController(recuperarTodasCategoriasUseCase)

export{
    registrarCategoriaController,
    atualizarCategoriaController,
    deletarCategoriaController,
    recuperarTodasCategoriasController
}

