
interface IInscricao {
    id?: string;
    nome:string;
    email:string;
    grupo:string;
    setor:string;
    eventId: string;
    telefone:string;
    idade:number;

}

//Atributos que são necessários para criar um usuario
//Tipo representa um dos estados do ciclo de vida da entidade
//Garantir a integridade dos dados de um objeto
type CriarInscricaoProps = Omit<IInscricao, "id">;

type EditarInscricaoProps = Omit<IInscricao, "id">
//Atributos que são necessários para recuperar uma categoria
//Tipo representa um dos estados do ciclo de vida da entidade
type RecuperarInscricaoProps = IInscricao & {
    id: NonNullable<IInscricao['id']>
};
//Credenciais do Usuário
type CredenciaisInscricaoProps = Omit<IInscricao, "id" | "nome">;

export {
   IInscricao,
   CriarInscricaoProps,
   RecuperarInscricaoProps,
   CredenciaisInscricaoProps,
   EditarInscricaoProps
}