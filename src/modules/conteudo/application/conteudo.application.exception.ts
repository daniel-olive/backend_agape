import { ApplicationException } from "../../../shared/application/application.exception";

class ConteudoApplicationException extends ApplicationException {
    constructor(message:string = '⚠️ Exceção de Aplicação Genérica da Entidade Conteudo') {
        super(message);
        this.name = 'ConteudoApplicationException'
        this.message = message;
    }


}

class ConteudoNaoEncontrado extends ConteudoApplicationException {
    public constructor(message:string = '⚠️ O Conteudo não foi encontrado na base de dados.') {
        super(message);
        this.name = 'ConteudoNaoEncontrado'
        this.message = message;
    }
}

const ConteudoApplicationExceptions = {
    ConteudoNaoEncontrado: ConteudoNaoEncontrado
}



export { ConteudoApplicationExceptions }