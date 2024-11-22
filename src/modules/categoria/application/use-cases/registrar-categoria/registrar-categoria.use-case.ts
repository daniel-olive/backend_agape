import { Categoria } from "../../../../../modules/categoria/domain/categoria.entity";
import { ICategoriaRepository } from "../../../../../modules/categoria/domain/categoria.repository.interface";
import { CriarCategoriaProps, ICategoria } from "../../../../../modules/categoria/domain/categoria.types";
import { CategoriaMap } from "../../../../../modules/categoria/infra/mappers/categoria.map";
import { IUseCase } from "../../../../../shared/application/use-case.interface";

class RegistrarCategoriaUseCase implements IUseCase<CriarCategoriaProps,ICategoria> {
    private _categoriaRepositorio: ICategoriaRepository<Categoria>;

    constructor(repositorio: ICategoriaRepository<Categoria>){
        this._categoriaRepositorio = repositorio;
    }

    async execute(categoriaProps: CriarCategoriaProps): Promise<ICategoria> {
       
        const categoria: Categoria = Categoria.criar(categoriaProps);

        const categoriaInserida = await this._categoriaRepositorio.inserir(categoria);

        return CategoriaMap.toDTO(categoriaInserida);
    }
}

export { RegistrarCategoriaUseCase }
