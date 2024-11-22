import { Entity } from "../../../shared/domain/entity";
import { IAdministrador, CriarAdmProps, RecuperarAdmProps, TipoAdm } from "./administrador.types";

class Administrador extends Entity<IAdministrador> implements IAdministrador {

    ///////////////////////
    //Atributos de Classe//
    ///////////////////////

    private _nome: string;
    private _email: string;
    private _senha: string;
    private _tipo: TipoAdm;
    
 
    ///////////////
    //Gets e Sets//
    ///////////////

    public get nome(): string {
        return this._nome;
    }

    private set nome(nome: string) {
        this._nome = nome;
    }
   
    public get email(): string {
        return this._email;
    }

    public set email(email: string) {
        this._email = email;
    }

    public get senha(): string {
        return this._senha;
    }

    public set senha(senha: string) {
        this._senha = senha;
    }

    public get tipo(): TipoAdm {
        return this._tipo;
    }

    public set tipo(tipo: TipoAdm) {
        this._tipo = tipo;
    }

   

    //////////////
    //Construtor//
    //////////////

    private constructor(administrador: IAdministrador){
        super(administrador.id);
        this.nome = administrador.nome;
        this.email = administrador.email;
        this.senha = administrador.senha;
        this.tipo = administrador.tipo;
        
    }
   

    /////////////////////////
    //Static Factory Method//
    /////////////////////////

    public static criar(props: CriarAdmProps): Administrador {
        return new Administrador(props);
    }

    public static recuperar(props: RecuperarAdmProps): Administrador {
        return new Administrador(props);
    }

}



export { Administrador };