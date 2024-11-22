//Todos os atributos/propriedades que um usuário deve ter no sistema
//Auxilia na criação de invariantes e modelos ricos

enum TipoAdm {
    ADMGERAL = "ADMGERAL",
    ADMEVENTOS = "ADMEVENTOS",
    ADMCONTEUDOS = "ADMCONTEUDOS",
    ADMLITURGIA = "ADMLITURGIA",
    ADMEVENTOS_E_CONTEUDOS = "ADMEVENTOS_E_CONTEUDOS",
    ADMEVENTOS_CONTEUDOS_E_LITURGIA = "ADMEVENTOS_CONTEUDOS_E_LITURGIA",
    ADMEVENTOS_E_LITURGIA = "ADMEVENTOS_E_LITURGIA",
    ADMCONTEUDOS_E_LITURGIA = "ADMCONTEUDOS_E_LITURGIA"
}

interface IAdministrador {
    id?: string;
    nome:string;
    email: string;
    senha: string;
    tipo: TipoAdm;
}

//Atributos que são necessários para criar um usuario
//Tipo representa um dos estados do ciclo de vida da entidade
//Garantir a integridade dos dados de um objeto
type CriarAdmProps = Omit<IAdministrador, "id">;

//Atributos que são necessários para recuperar uma categoria
//Tipo representa um dos estados do ciclo de vida da entidade
type RecuperarAdmProps = IAdministrador & {
    id: NonNullable<IAdministrador['id']>
};

//Credenciais do Usuário
type CredenciaisAdmProps = Omit<IAdministrador, "id" | "nome" | "tipo">;

export {
    IAdministrador,
    CriarAdmProps,
    RecuperarAdmProps,
    CredenciaisAdmProps,
    TipoAdm
}