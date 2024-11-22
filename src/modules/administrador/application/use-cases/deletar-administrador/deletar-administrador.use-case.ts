import { IUseCase } from "../../../../../shared/application/use-case.interface";
import { Administrador } from "../../../../../modules/administrador/domain/administrador.entity";
import { IAdmRepository } from "../../../../../modules/administrador/domain/administrador.repository.interface";
import { AdmApplicationExceptions } from "../../administrador.application.exception";



class DeletarAdmUseCase implements IUseCase<string,boolean> {
    private _administradorRepositorio: IAdmRepository<Administrador>;

    constructor(repositorio: IAdmRepository<Administrador>){
        this._administradorRepositorio = repositorio;
    }

    async execute(uuid: string): Promise<boolean> {

        const existeAdm: boolean = await this._administradorRepositorio.existe(uuid);

        if (!existeAdm){
            throw new AdmApplicationExceptions.AdmNaoEncontrado();
        }

        const deletouAdm:boolean = await this._administradorRepositorio.deletar(uuid);

        return deletouAdm;

    }

}

export { DeletarAdmUseCase }