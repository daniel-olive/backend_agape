import { Entity } from "../../../shared/domain/entity";
import { CriarInscricaoProps, EditarInscricaoProps, IInscricao, RecuperarInscricaoProps } from "./inscricao.types";
import { InscricaoMap } from "../infra/mappers/inscricao.map";
import { IEvento, RecuperarEventoProps } from "../../../modules/eventos/domain/evento.types";
import { Evento } from "../../../modules/eventos/domain/evento.entity";


class Inscricao extends Entity<IInscricao> implements IInscricao {

    ///////////////////////
    //Atributos de Classe//
    ///////////////////////

    private _nome: string;
    private _email: string;
    private _grupo: string;
    private _setor: string;
    private _eventId: string;
    private _telefone: string;
    private _idade: number;
    
    


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
    
    public get grupo(): string {
        return this._grupo;
    }
    public set grupo(grupo: string) {
        this._grupo = grupo;
    }
    
    public get setor(): string {
        return this._setor;
    }
    public set setor(setor: string) {
        this._setor = setor;
    }
    
    public get eventId(): string {
        return this._eventId;
    }
    public set eventId(eventId: string) {
        this._eventId = eventId;
    }
    
    public get telefone(): string {
        return this._telefone;
    }
    public set telefone(telefone: string) {
        this._telefone = telefone;
    }
    
    public get idade(): number {
        return this._idade;
    }
    public set idade(idade: number) {
        this._idade = idade;
    }



    //////////////
    //Construtor//
    //////////////

    private constructor(inscricao: IInscricao) {
        super(inscricao.id);
        this.nome = inscricao.nome;
        this.email = inscricao.email;
        this.grupo = inscricao.grupo;
        this.setor = inscricao.setor;
        this.eventId = inscricao.eventId;
        this.telefone = inscricao.telefone;
        this.idade = inscricao.idade;

    }


    /////////////////////////
    //Static Factory Method//
    /////////////////////////

    public static criar(props: CriarInscricaoProps): Inscricao {
        return new Inscricao(props);
    }

    public static editar(props: EditarInscricaoProps): Inscricao {
        let {nome} = props;
        let {email} = props;
        let {grupo} = props;
        let {setor} = props;
        let {eventId} = props;
        let {telefone} = props;
        let {idade} = props;
        return new Inscricao({nome, email, grupo, setor, eventId, telefone, idade});
    }


    public static recuperar(props: RecuperarInscricaoProps): Inscricao {
        return new Inscricao(props);
    }

    public toDTO(): IInscricao {
        return InscricaoMap.toDTO(this);
    }
}



export { Inscricao };