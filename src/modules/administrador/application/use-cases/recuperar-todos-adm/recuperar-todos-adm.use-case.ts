import { Administrador } from "../../../../../modules/administrador/domain/administrador.entity";
import { IAdmRepository } from "../../../../../modules/administrador/domain/administrador.repository.interface";
import { IAdministrador } from "../../../../../modules/administrador/domain/administrador.types";
import { AdministradorMap } from "../../../../../modules/administrador/infra/mappers/administrador.map";
import { IUseCase } from "../../../../../shared/application/use-case.interface";

class RecuperarTodosAdmUseCase implements IUseCase<void,Array<IAdministrador>> {
    private _administradorRepositorio: IAdmRepository<Administrador>;

    constructor(repositorio: IAdmRepository<Administrador>){
        this._administradorRepositorio = repositorio;
    }

    async execute(): Promise<IAdministrador[]> {

        const todosAdm: Array<Administrador> = await this._administradorRepositorio.recuperarTodos();

        const todosAdmDTO = todosAdm.map(
            (administrador) => AdministradorMap.toDTO(administrador)
        );

        return todosAdmDTO;
    }

}

export { RecuperarTodosAdmUseCase }