//Todos os atributos/propriedades que um usuário deve ter no sistema
//Auxilia na criação de invariantes e modelos ricos
interface ICategoria {
    id?: string;
    nome:string;
}

//Atributos que são necessários para criar um usuario
//Tipo representa um dos estados do ciclo de vida da entidade
//Garantir a integridade dos dados de um objeto
type CriarCategoriaProps = Omit<ICategoria, "id">;

//Atributos que são necessários para recuperar uma categoria
//Tipo representa um dos estados do ciclo de vida da entidade
type RecuperarCategoriaProps = ICategoria & {
    id: NonNullable<ICategoria['id']>
};
//Credenciais do Usuário
type CredenciaisCategoriaProps = Omit<ICategoria, "id">;

export {
    ICategoria,
    CriarCategoriaProps,
    RecuperarCategoriaProps,
    CredenciaisCategoriaProps
}