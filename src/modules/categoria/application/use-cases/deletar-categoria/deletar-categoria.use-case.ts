import { IUseCase } from "../../../../../shared/application/use-case.interface";
import { CategoriaApplicationExceptions } from "../../conteudo.appication.exception";
import { ICategoriaRepository } from "../../../../../modules/categoria/domain/categoria.repository.interface";
import { Categoria } from "../../../../../modules/categoria/domain/categoria.entity";



class DeletarCategoriaUseCase implements IUseCase<string,boolean> {
    private _categoriaRepositorio: ICategoriaRepository<Categoria>;

    constructor(repositorio: ICategoriaRepository<Categoria>){
        this._categoriaRepositorio = repositorio;
    }

    async execute(uuid: string): Promise<boolean> {

        const existeCategoria: boolean = await this._categoriaRepositorio.existe(uuid);

        if (!existeCategoria){
            throw new CategoriaApplicationExceptions.CategoriaNaoEncontrada();
        }

        const deletouCategoria:boolean = await this._categoriaRepositorio.deletar(uuid);

        return deletouCategoria;

    }

}

export { DeletarCategoriaUseCase }