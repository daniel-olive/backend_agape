import { ApplicationException } from "../../../shared/application/application.exception";

class AdmApplicationException extends ApplicationException {
    constructor(message:string = '⚠️ Exceção de Aplicação Genérica da Entidade Administrador') {
        super(message);
        this.name = 'AdmApplicationException'
        this.message = message;
    }


}

class AdmNaoEncontrado extends AdmApplicationException {
    public constructor(message:string = '⚠️ O Administrador não foi encontrado na base de dados.') {
        super(message);
        this.name = 'AdmNaoEncontrado'
        this.message = message;
    }
}

const AdmApplicationExceptions = {
    AdmNaoEncontrado: AdmNaoEncontrado
}



export { AdmApplicationExceptions }