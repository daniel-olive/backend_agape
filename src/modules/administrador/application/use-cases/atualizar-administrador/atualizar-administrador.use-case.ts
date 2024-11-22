import { IUseCase } from "../../../../../shared/application/use-case.interface";
import { RecuperarAdmProps } from "../../../../../modules/administrador/domain/administrador.types";
import { IAdmRepository } from "../../../../../modules/administrador/domain/administrador.repository.interface";
import { Administrador } from "../../../../../modules/administrador/domain/administrador.entity";
import { AdmApplicationExceptions } from "../../administrador.application.exception";


class AtualizarAdmUseCase implements IUseCase<RecuperarAdmProps, boolean> {
    private _administradorRepositorio: IAdmRepository<Administrador>;

    constructor(repositorio: IAdmRepository<Administrador>){
        this._administradorRepositorio = repositorio;
    }

    async execute(administradorProps: RecuperarAdmProps): Promise<boolean> {

        const existeAdm: boolean = await this._administradorRepositorio.existe(administradorProps.id);

        if (!existeAdm){
            throw new AdmApplicationExceptions.AdmNaoEncontrado();
        }

        const administrador: Administrador = Administrador.recuperar(administradorProps);

        const atualizouAdm: boolean = await this._administradorRepositorio.atualizar(administrador.id, administrador);

        return atualizouAdm;

    }

}

export { AtualizarAdmUseCase }