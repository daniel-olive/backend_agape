import { IRepository } from "../../../shared/domain/repository.interface";
import { Administrador } from "./administrador.entity";
import { CredenciaisAdmProps } from "./administrador.types";

interface IAdmRepository<T> extends IRepository<T> {

    autenticar(credenciais:CredenciaisAdmProps): Promise<boolean>;
    recuperarPorEmail(email:string):  Promise<Administrador | null>;

}

export { IAdmRepository }