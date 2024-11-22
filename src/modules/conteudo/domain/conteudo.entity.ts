import { CriarConteudoProps, EditarConteudoProps, IConteudo, RecuperarConteudoProps } from "./conteudo.types";
import { ConteudoMap } from "../infra/mappers/conteudo.map";
import { Entity } from "../../../shared/domain/entity";
import { TituloConteudoNuloOuIndefinido, TituloConteudoTamanhoMinimoInvalido, TituloConteudoTamanhoMaximoInvalido, DescricaoConteudoNuloOuIndefinido, DescricaoConteudoTamanhoMinimoInvalido, DescricaoConteudoTamanhoMaximoInvalido } from "./conteudo.exception";
import { Categoria } from "../../../modules/categoria/domain/categoria.entity";
import { RecuperarCategoriaProps } from "../../../modules/categoria/domain/categoria.types";


class Conteudo extends Entity<IConteudo> implements IConteudo{
    private _titulo: string;
    private _descricao: string;
    private _categoria: string;
    private _autor: string;
    private _banner: string | null | undefined;
    private _publicadoEm: Date | undefined;
    

    public static readonly TAMANHO_MINIMO_TITULO = 3
    public static readonly TAMANHO_MAXIMO_TITULO = 50

    public static readonly TAMANHO_MINIMO_DESCRICAO = 30
    public static readonly TAMANHO_MAXIMO_DESCRICAO = 500

    public get titulo(): string {
        return this._titulo;
    }

    private set titulo(titulo:string) {
        const tamanhoTitulo = titulo.trim().length

        if(titulo == null || titulo == undefined){
            throw new TituloConteudoNuloOuIndefinido();
        }

        if(tamanhoTitulo < Conteudo.TAMANHO_MINIMO_TITULO){
            throw new TituloConteudoTamanhoMinimoInvalido();
        }

        if(tamanhoTitulo > Conteudo.TAMANHO_MAXIMO_TITULO){
            throw new TituloConteudoTamanhoMaximoInvalido();
        }

        this._titulo = titulo;
    }

    public get descricao(): string {
        return this._descricao;
    }

    private set descricao(descricao:string) {
        const tamanhoDescricao = descricao.trim().length

        if(descricao == null || descricao == undefined){
            throw new DescricaoConteudoNuloOuIndefinido();
        }

        if(tamanhoDescricao < Conteudo.TAMANHO_MINIMO_DESCRICAO){
            throw new DescricaoConteudoTamanhoMinimoInvalido();
        }

        if(tamanhoDescricao > Conteudo.TAMANHO_MAXIMO_DESCRICAO){
            throw new DescricaoConteudoTamanhoMaximoInvalido();
        }

        this._descricao = descricao;
    }

    public get categoria(): string {
        return this._categoria;
    }

    private set categoria(categoria: string) {
        this._categoria = categoria;
    }

    public get autor(): string {
        return this._autor;
    }
    public set autor(autor: string) {
        this._autor = autor;
    }

    public get banner(): string | null | undefined  {
        return this._banner;
    }
    public set banner(banner: string | null | undefined) {
        this._banner = banner;
    }

    public get publicadoEm(): Date | undefined {
        return this._publicadoEm;
    }
    public set publicadoEm(publicadoEm: Date | undefined) {
        this._publicadoEm = publicadoEm;
    }

     constructor(conteudo: IConteudo) {
        super(conteudo.id);
        this.titulo = conteudo.titulo;
        this.descricao = conteudo.descricao;
        this.categoria = conteudo.categoria;
        this.autor = conteudo.autor;
        this.banner = conteudo.banner;
        this._publicadoEm = conteudo.publicadoEm;
    }

    public static criar(props: CriarConteudoProps): Conteudo {
        let {titulo} = props;
        let {descricao} = props;
        let {categoria} = props;
        let {autor} = props;
        let {banner} = props;
        return new Conteudo({titulo, descricao, categoria, autor, banner});
    }

    public static editar(props: EditarConteudoProps): Conteudo {
        let {titulo} = props;
        let {descricao} = props;
        let {categoria} = props;
        let {autor} = props;
        let {banner} = props;
        return new Conteudo({titulo, descricao, categoria, autor, banner});
    }

    public static recuperar(props: RecuperarConteudoProps): Conteudo {
        return new Conteudo(props);
    }

    public toDTO(): IConteudo {
        return ConteudoMap.toDTO(this);
    }
}



export{Conteudo}