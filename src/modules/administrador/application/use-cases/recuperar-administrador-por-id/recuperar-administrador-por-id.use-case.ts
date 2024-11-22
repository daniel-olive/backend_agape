import { IUseCase } from "../../../../../shared/application/use-case.interface";
import { IAdministrador } from "../../../../../modules/administrador/domain/administrador.types";
import { IAdmRepository } from "../../../../../modules/administrador/domain/administrador.repository.interface";
import { Administrador } from "../../../../../modules/administrador/domain/administrador.entity";
import { AdmApplicationExceptions } from "../../administrador.application.exception";
import { AdministradorMap } from "../../../../../modules/administrador/infra/mappers/administrador.map";



class RecuperarAdmPorIdUseCase implements IUseCase<string,IAdministrador> {

    private _admRepositorio: IAdmRepository<Administrador>;

    constructor(admRepositorio:IAdmRepository<Administrador>){
        this._admRepositorio = admRepositorio;
    }

    async execute(uuid: string): Promise<IAdministrador> {

        const existeAdm: boolean = await this._admRepositorio.existe(uuid);

        if (!existeAdm){
            throw new AdmApplicationExceptions.AdmNaoEncontrado();
        }

        const adm = await this._admRepositorio.recuperarPorUuid(uuid);

        return AdministradorMap.toDTO(adm as Administrador);

    }

}

export { RecuperarAdmPorIdUseCase }