import { Administrador } from "../../../../../modules/administrador/domain/administrador.entity";
import { IAdmRepository } from "../../../../../modules/administrador/domain/administrador.repository.interface";
import { CriarAdmProps, IAdministrador } from "../../../../../modules/administrador/domain/administrador.types";
import { AdministradorMap } from "../../../../../modules/administrador/infra/mappers/administrador.map";
import { IUseCase } from "../../../../../shared/application/use-case.interface";

class RegistrarAdmUseCase implements IUseCase<CriarAdmProps,IAdministrador> {
    private _administradorRepositorio: IAdmRepository<Administrador>;

    constructor(repositorio: IAdmRepository<Administrador>){
        this._administradorRepositorio = repositorio;
    }

    async execute(administradorProps: CriarAdmProps): Promise<IAdministrador> {
       
        const administrador: Administrador = Administrador.criar(administradorProps);

        const administradorInserido = await this._administradorRepositorio.inserir(administrador);

        return AdministradorMap.toDTO(administradorInserido);
    }
}

export { RegistrarAdmUseCase }