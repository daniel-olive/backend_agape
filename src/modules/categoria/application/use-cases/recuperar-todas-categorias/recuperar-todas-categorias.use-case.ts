import { Categoria } from "../../../../../modules/categoria/domain/categoria.entity";
import { ICategoriaRepository } from "../../../../../modules/categoria/domain/categoria.repository.interface";
import { ICategoria } from "../../../../../modules/categoria/domain/categoria.types";
import { CategoriaMap } from "../../../../../modules/categoria/infra/mappers/categoria.map";
import { IUseCase } from "../../../../../shared/application/use-case.interface";

class RecuperarTodasCategoriasUseCase implements IUseCase<void,Array<ICategoria>> {
    private _categoriaRepositorio: ICategoriaRepository<Categoria>;

    constructor(repositorio: ICategoriaRepository<Categoria>){
        this._categoriaRepositorio = repositorio;
    }

    async execute(): Promise<ICategoria[]> {

        const todasCategorias: Array<Categoria> = await this._categoriaRepositorio.recuperarTodos();

        const todasCategoriasDTO = todasCategorias.map(
            (categoria) => CategoriaMap.toDTO(categoria)
        );

        return todasCategoriasDTO;
    }

}

export { RecuperarTodasCategoriasUseCase }