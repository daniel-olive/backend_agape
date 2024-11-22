import { Entity } from "../../../shared/domain/entity";
import { CriarLiturgiaProps, ILiturgia, RecuperarLiturgiaProps } from "./liturgia.types";


class Liturgia extends Entity<ILiturgia> implements ILiturgia {

    ///////////////////////
    //Atributos de Classe//
    ///////////////////////

    private _primeiraLeitura: string;
    private _segundaLeitura: string;
    private _salmoResponsorial: string;
    private _titulo: string;
    private _evangelho: string;
    private _corLiturgica: string;
    private _dia: string | Date;


    public get primeiraLeitura(): string {
        return this._primeiraLeitura;
    }
    public set primeiraLeitura(primeiraLeitura: string) {
        this._primeiraLeitura = primeiraLeitura;
    }
    
    public get segundaLeitura(): string {
        return this._segundaLeitura;
    }
    public set segundaLeitura(segundaLeitura: string) {
        this._segundaLeitura = segundaLeitura;
    }
    
    public get salmoResponsorial(): string {
        return this._salmoResponsorial;
    }
    public set salmoResponsorial(salmoResponsorial: string) {
        this._salmoResponsorial = salmoResponsorial;
    }
    
    public get titulo(): string {
        return this._titulo;
    }
    public set titulo(titulo: string) {
        this._titulo = titulo;
    }
    
    public get evangelho(): string {
        return this._evangelho;
    }
    public set evangelho(evangelho: string) {
        this._evangelho = evangelho;
    }
    
    public get corLiturgica(): string {
        return this._corLiturgica;
    }
    public set corLiturgica(corLiturgica: string) {
        this._corLiturgica = corLiturgica;
    }
    
    public get dia(): string | Date {
        return this._dia;
    }
    public set dia(dia: string | Date) {
        this._dia = dia;
    }
    
 
    ///////////////
    //Gets e Sets//
    ///////////////

   
   
   

    //////////////
    //Construtor//
    //////////////

    private constructor(liturgia: ILiturgia){
        super(liturgia.id);
        this.primeiraLeitura = liturgia.primeiraLeitura;
        this.segundaLeitura = liturgia.segundaLeitura;
        this.salmoResponsorial = liturgia.salmoResponsorial;
        this.titulo = liturgia.titulo;
        this.evangelho = liturgia.evangelho;
        this.corLiturgica = liturgia.corLiturgica;
        this.dia = liturgia.dia;
    }
   

    /////////////////////////
    //Static Factory Method//
    /////////////////////////

    public static criar(props: CriarLiturgiaProps): Liturgia {
        return new Liturgia(props);
    }

    public static recuperar(props: RecuperarLiturgiaProps): Liturgia {
        return new Liturgia(props);
    }

}



export { Liturgia };