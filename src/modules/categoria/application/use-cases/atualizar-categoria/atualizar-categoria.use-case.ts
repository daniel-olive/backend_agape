import { IUseCase } from "../../../../../shared/application/use-case.interface";
import { RecuperarAdmProps } from "../../../../../modules/administrador/domain/administrador.types";
import { RecuperarCategoriaProps } from "../../../../../modules/categoria/domain/categoria.types";
import { Categoria } from "../../../../../modules/categoria/domain/categoria.entity";
import { ICategoriaRepository } from "../../../../../modules/categoria/domain/categoria.repository.interface";
import { CategoriaApplicationExceptions } from "../../conteudo.appication.exception";


class AtualizarCategoriaUseCase implements IUseCase<RecuperarCategoriaProps, boolean> {
    private _categoriaRepositorio: ICategoriaRepository<Categoria>;

    constructor(repositorio: ICategoriaRepository<Categoria>){
        this._categoriaRepositorio = repositorio;
    }

    async execute(categoriaProps: RecuperarCategoriaProps): Promise<boolean> {

        const existeCategoria: boolean = await this._categoriaRepositorio.existe(categoriaProps.id);

        if (!existeCategoria){
            throw new CategoriaApplicationExceptions.CategoriaNaoEncontrada();
        }

        const categoria: Categoria = Categoria.recuperar(categoriaProps);

        const atualizouCategoria: boolean = await this._categoriaRepositorio.atualizar(categoria.id, categoria);

        return atualizouCategoria;

    }

}

export { AtualizarCategoriaUseCase }