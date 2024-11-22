import { Entity } from "../../../shared/domain/entity";
import { CriarCategoriaProps, ICategoria, RecuperarCategoriaProps } from "./categoria.types";


class Categoria extends Entity<ICategoria> implements ICategoria {

    ///////////////////////
    //Atributos de Classe//
    ///////////////////////
    
    private _nome: string;
    
 
    ///////////////
    //Gets e Sets//
    ///////////////

    public get nome(): string {
        return this._nome;
    }

    private set nome(nome: string) {
        this._nome = nome;
    }
   
   

    //////////////
    //Construtor//
    //////////////

    private constructor(categoria: ICategoria){
        super(categoria.id);
        this.nome = categoria.nome;
        
    }
   

    /////////////////////////
    //Static Factory Method//
    /////////////////////////

    public static criar(props: CriarCategoriaProps): Categoria {
        return new Categoria(props);
    }

    public static recuperar(props: RecuperarCategoriaProps): Categoria {
        if (!props.id) {
            throw new Error('ID da categoria não pode ser nulo ou indefinido');
        }
        return new Categoria(props);
    }

}



export { Categoria };