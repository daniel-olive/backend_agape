import { ApplicationException } from "../../../shared/application/application.exception";

class InscricaoApplicationException extends ApplicationException {
    constructor(message:string = '⚠️ Exceção de Aplicação Genérica da Entidade Inscricao') {
        super(message);
        this.name = 'InscricaoApplicationException'
        this.message = message;
    }


}

class InscricaoNaoEncontrada extends InscricaoApplicationException {
    public constructor(message:string = '⚠️ A Inscrição não foi encontrada na base de dados.') {
        super(message);
        this.name = 'InscricaoNaoEncontrada'
        this.message = message;
    }
}

const InscricaoApplicationExceptions = {
    InscricaoNaoEncontrada: InscricaoNaoEncontrada
}



export { InscricaoApplicationExceptions }