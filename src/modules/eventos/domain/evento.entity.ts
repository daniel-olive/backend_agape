import { Entity } from "../../../shared/domain/entity";
import { EventoMap } from "../../../modules/eventos/infra/mappers/evento.map";
import { DataEventoNuloOuIndefinido, DescricaoEventoNuloOuIndefinido, DescricaoEventoTamanhoMaximoInvalido, DescricaoEventoTamanhoMinimoInvalido, HorarioEventoNuloOuIndefinido, HorarioEventoTamanhoMaximoInvalido, HorarioEventoTamanhoMinimoInvalido, LocalEventoNuloOuIndefinido, LocalEventoTamanhoMaximoInvalido, LocalEventoTamanhoMinimoInvalido, TituloEventoNuloOuIndefinido, TituloEventoTamanhoMaximoInvalido, TituloEventoTamanhoMinimoInvalido } from "./evento.exception";
import { CriarEventoProps, EditarEventoProps, IEvento, RecuperarEventoProps } from "./evento.types";

class Evento extends Entity<IEvento> implements IEvento{
    
    private _titulo: string;
    private _descricao: string;
    private _local: string;
    private _data: string;
    private _horario: string;
    private _banner: string | null | undefined;
    

    public static readonly TAMANHO_MINIMO_TITULO = 3
    public static readonly TAMANHO_MAXIMO_TITULO = 50

    public static readonly TAMANHO_MINIMO_DESCRICAO = 30
    public static readonly TAMANHO_MAXIMO_DESCRICAO = 500

    public static readonly TAMANHO_MINIMO_LOCAL = 8
    public static readonly TAMANHO_MAXIMO_LOCAL = 50

    public static readonly TAMANHO_MINIMO_HORARIO = 4
    public static readonly TAMANHO_MAXIMO_HORARIO = 6


    public get titulo(): string {
        return this._titulo
    }

    private set titulo(titulo: string) {

        const tamanhoTitulo = titulo.trim().length

        if(titulo == null || titulo == undefined){
            throw new TituloEventoNuloOuIndefinido();
        }

        if(tamanhoTitulo < Evento.TAMANHO_MINIMO_TITULO){
            throw new TituloEventoTamanhoMinimoInvalido();
        }

        if(tamanhoTitulo > Evento.TAMANHO_MAXIMO_TITULO){
            throw new TituloEventoTamanhoMaximoInvalido();
        }

        this._titulo = titulo;
    }

    public get descricao(): string {
        return this._descricao
    }

    private set descricao(descricao: string) {
        const tamanhoDescricao = descricao.trim().length;

        if(descricao == null || descricao == undefined){
            throw new DescricaoEventoNuloOuIndefinido();
        }

        if(tamanhoDescricao < Evento.TAMANHO_MINIMO_DESCRICAO){
            throw new DescricaoEventoTamanhoMinimoInvalido();
        }
        
        if(tamanhoDescricao > Evento.TAMANHO_MAXIMO_DESCRICAO){
            throw new DescricaoEventoTamanhoMaximoInvalido();
        }

        this._descricao = descricao;
    }

    public get local(): string {
        return this._local
    }

    private set local(local:string) {
        const tamanhoLocal = local.trim().length

        if(local == null || local == undefined){
            throw new LocalEventoNuloOuIndefinido();
        }

        if(tamanhoLocal < Evento.TAMANHO_MINIMO_LOCAL){
            throw new LocalEventoTamanhoMinimoInvalido();
        }
        
        if(tamanhoLocal > Evento.TAMANHO_MAXIMO_LOCAL){
            throw new LocalEventoTamanhoMaximoInvalido();
        }

        this._local = local;
    }

    public get data(): string {
        return this._data
    }

    private set data(data:string) {
        if(data == null || data == undefined){
            throw new DataEventoNuloOuIndefinido();
        }

        this._data = data;
    }

    public get horario(): string {
        return this._horario
    }

    private set horario(horario:string) {
        const tamanhoHorario = horario.trim().length

        if(horario == null || horario == undefined){
            throw new HorarioEventoNuloOuIndefinido();
        }

        if(tamanhoHorario < Evento.TAMANHO_MINIMO_HORARIO){
            throw new HorarioEventoTamanhoMinimoInvalido();
        }
        
        if(tamanhoHorario > Evento.TAMANHO_MAXIMO_HORARIO){
            throw new HorarioEventoTamanhoMaximoInvalido();
        }

        this._horario = horario;
    }

    public get banner(): string | null | undefined {
        return this._banner;
    }
    public set banner(banner: string | null | undefined) {
        this._banner = banner;
    }

    private constructor(evento:IEvento) {
        super(evento.id);
        this.titulo = evento.titulo;
        this.descricao = evento.descricao;
        this.local = evento.local;
        this.data = evento.data;
        this.horario = evento.horario;
        this.banner = evento.banner;
    }

    public static criar(props: CriarEventoProps): Evento {
        let {titulo} = props;
        let {descricao} = props;
        let {local} = props;
        let {data} = props;
        let {horario} = props;
        let {banner} = props;
        return new Evento({titulo, descricao,local, data, horario, banner});
    }

    public static editar(props: EditarEventoProps): Evento {
        let {titulo} = props;
        let {descricao} = props;
        let {local} = props;
        let {data} = props;
        let {horario} = props;
        let {banner} = props;
        return new Evento({titulo, descricao,local, data, horario, banner});
    }

    public static recuperar(props: RecuperarEventoProps): Evento {
        return new Evento(props);
    }


    public toDTO(): IEvento {
        return EventoMap.toDTO(this);
    }
}

export { Evento };
