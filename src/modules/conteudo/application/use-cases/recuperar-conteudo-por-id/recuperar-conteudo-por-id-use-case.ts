import { Conteudo } from "../../../../../modules/conteudo/domain/conteudo.entity";
import { IConteudoRepository } from "../../../../../modules/conteudo/domain/conteudo.repository.interface";
import { IConteudo } from "../../../../../modules/conteudo/domain/conteudo.types";
import { IUseCase } from "../../../../../shared/application/use-case.interface";
import { ConteudoApplicationExceptions } from "../../conteudo.application.exception";
import { ConteudoMap } from "../../../../../modules/conteudo/infra/mappers/conteudo.map";



class RecuperarConteudoPorIdUseCase implements IUseCase<string,IConteudo> {

    private _conteudoRepositorio: IConteudoRepository<Conteudo>;

    constructor(conteudoRepositorio:IConteudoRepository<Conteudo>){
        this._conteudoRepositorio = conteudoRepositorio;
    }

    async execute(uuid: string): Promise<IConteudo> {

        const existeConteudo: boolean = await this._conteudoRepositorio.existe(uuid);

        if (!existeConteudo){
            throw new ConteudoApplicationExceptions.ConteudoNaoEncontrado();
        }

        const conteudo = await this._conteudoRepositorio.recuperarPorUuid(uuid);

        return ConteudoMap.toDTO(conteudo as Conteudo);

    }

}

export { RecuperarConteudoPorIdUseCase }