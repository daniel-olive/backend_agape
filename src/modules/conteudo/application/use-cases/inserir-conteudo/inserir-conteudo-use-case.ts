import { Conteudo } from "../../../../../modules/conteudo/domain/conteudo.entity";
import { IConteudoRepository } from "../../../../../modules/conteudo/domain/conteudo.repository.interface";
import { CriarConteudoProps, IConteudo } from "../../../../../modules/conteudo/domain/conteudo.types";
import { ConteudoMap } from "../../../../../modules/conteudo/infra/mappers/conteudo.map";
import { IUseCase } from "../../../../../shared/application/use-case.interface";

class InserirConteudoUseCase implements IUseCase<CriarConteudoProps,IConteudo> {
    private _conteudoRepositorio: IConteudoRepository<Conteudo>;

    constructor(repositorio: IConteudoRepository<Conteudo>){
        this._conteudoRepositorio = repositorio;
    }

    async execute(conteudoProps: CriarConteudoProps): Promise<IConteudo> {

        const conteudo: Conteudo = Conteudo.criar(conteudoProps);

        const conteudoInserido = await this._conteudoRepositorio.inserir(conteudo);

        return ConteudoMap.toDTO(conteudoInserido);
    }

}

export { InserirConteudoUseCase }