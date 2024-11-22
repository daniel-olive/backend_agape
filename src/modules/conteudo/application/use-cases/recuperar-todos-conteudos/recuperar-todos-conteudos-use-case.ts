import { Conteudo } from "../../../../../modules/conteudo/domain/conteudo.entity";
import { IConteudoRepository } from "../../../../../modules/conteudo/domain/conteudo.repository.interface";
import { IConteudo } from "../../../../../modules/conteudo/domain/conteudo.types";
import { ConteudoMap } from "../../../../../modules/conteudo/infra/mappers/conteudo.map";
import { IUseCase } from "../../../../../shared/application/use-case.interface";

class RecuperarTodosConteudosUseCase implements IUseCase<void, Array<IConteudo>> {
    private _conteudoRepositorio: IConteudoRepository<Conteudo>;

    constructor(repositorio: IConteudoRepository<Conteudo>) {
        this._conteudoRepositorio = repositorio;
    }

    async execute(): Promise<IConteudo[]> {

        const todosConteudos: Array<Conteudo> = await this._conteudoRepositorio.recuperarTodos();

        const todosConteudosDTO = todosConteudos.map(
            (conteudo) => ConteudoMap.toDTO(conteudo)
        );

        return todosConteudosDTO;
    }

}

export { RecuperarTodosConteudosUseCase }