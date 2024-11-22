import { categoriaRepositorio } from "../../../../modules/categoria/infra/database"
import { AtualizarCategoriaUseCase } from "./atualizar-categoria/atualizar-categoria.use-case"
import { DeletarCategoriaUseCase } from "./deletar-categoria/deletar-categoria.use-case"
import { RegistrarCategoriaUseCase } from "./registrar-categoria/registrar-categoria.use-case"
import { RecuperarTodasCategoriasUseCase } from "./recuperar-todas-categorias/recuperar-todas-categorias.use-case"


const registrarCategoriaUseCase = new RegistrarCategoriaUseCase(categoriaRepositorio)
const atualizarCategoriaUseCase = new AtualizarCategoriaUseCase(categoriaRepositorio)
const deletarCategoriaUseCase = new DeletarCategoriaUseCase(categoriaRepositorio)
const recuperarTodasCategoriasUseCase = new RecuperarTodasCategoriasUseCase(categoriaRepositorio)

export {
    registrarCategoriaUseCase,
    atualizarCategoriaUseCase,
    deletarCategoriaUseCase,
    recuperarTodasCategoriasUseCase
}