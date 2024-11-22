import { DomainException } from "../../../shared/domain/domain.exception";

class ConteudoException extends DomainException{
    constructor(message:string = "Exceção de dominio genérica da entidade informação"){
        super(message);
        this.name = "ConteudoException";
        this.message = message;
    }
}

class TituloConteudoNuloOuIndefinido extends ConteudoException{
    public constructor(message:string = "O titulo do Conteúdo é nulo ou indefinido"){
        super(message);
        this.name = "TituloConteudoNuloOuIndefinido";
        this.message = message;
    }

}

class TituloConteudoTamanhoMinimoInvalido extends ConteudoException{
    public constructor(message:string = "O titulo do Conteúdo não possui um tamanho minimo válido"){
        super(message);
        this.name = "TituloConteudoTamanhoMinimoInvalido";
        this.message = message;
    }

}

class TituloConteudoTamanhoMaximoInvalido extends ConteudoException{
    public constructor(message:string = "O titulo do Conteúdo não possui um tamanho maximo válido"){
        super(message);
        this.name = "TituloConteudoTamanhoMaximoInvalido";
        this.message = message;
    }

}

class DescricaoConteudoNuloOuIndefinido extends ConteudoException{
    public constructor(message:string = "A descrição do Conteúdo é nulo ou indefinido"){
        super(message);
        this.name = "DescricaoConteudoNuloOuIndefinido";
        this.message = message;
    }

}

class DescricaoConteudoTamanhoMinimoInvalido extends ConteudoException{
    public constructor(message:string = "A descrição do Conteúdo não possui um tamanho minimo válido"){
        super(message);
        this.name = "DescricaoConteudoTamanhoMinimoInvalido";
        this.message = message;
    }

}

class DescricaoConteudoTamanhoMaximoInvalido extends ConteudoException{
    public constructor(message:string = "A descrição do Conteúdo não possui um tamanho maximo válido"){
        super(message);
        this.name = "DescricaoConteudoTamanhoMaximoInvalido";
        this.message = message;
    }

}

export{
    TituloConteudoNuloOuIndefinido,
    TituloConteudoTamanhoMinimoInvalido,
    TituloConteudoTamanhoMaximoInvalido,
    DescricaoConteudoNuloOuIndefinido,
    DescricaoConteudoTamanhoMinimoInvalido,
    DescricaoConteudoTamanhoMaximoInvalido
}