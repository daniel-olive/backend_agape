import { Administrador } from "../../../../../modules/administrador/domain/administrador.entity";
import { IAdmRepository } from "../../../../../modules/administrador/domain/administrador.repository.interface";
import { CredenciaisAdmProps, IAdministrador } from "../../../../../modules/administrador/domain/administrador.types";
import { AdministradorMap } from "../../../../../modules/administrador/infra/mappers/administrador.map";
import { IUseCase } from "../../../../../shared/application/use-case.interface";

class AutenticarAdmUseCase implements IUseCase<CredenciaisAdmProps,IAdministrador> {
    private _administradorRepositorio: IAdmRepository<Administrador>;

    constructor(repositorio: IAdmRepository<Administrador>){
        this._administradorRepositorio = repositorio;
    }

    async execute(credenciais: CredenciaisAdmProps): Promise<IAdministrador> {
       
        const administrador: Administrador | null = await this._administradorRepositorio.recuperarPorEmail(credenciais.email);

        if (!administrador){
            throw new Error('Administrador Inexistente');  
        }

        const autenticado: boolean = await this._administradorRepositorio.autenticar(credenciais);

        if (!autenticado) {
            throw new Error('Autenticação Falhou');  
        }

        return AdministradorMap.toDTO(administrador);
    }

}

export { AutenticarAdmUseCase }