
interface ILiturgia {
    id?: string;
    primeiraLeitura:string;
    segundaLeitura: string;
    salmoResponsorial: string;
    titulo: string;
    evangelho: string;
    corLiturgica: string;
    dia: string | Date;
}

//Atributos que são necessários para criar um usuario
//Tipo representa um dos estados do ciclo de vida da entidade
//Garantir a integridade dos dados de um objeto
type CriarLiturgiaProps = Omit<ILiturgia, "id">;

//Atributos que são necessários para recuperar uma categoria
//Tipo representa um dos estados do ciclo de vida da entidade
type RecuperarLiturgiaProps = ILiturgia & {
    id: NonNullable<ILiturgia['id']>
};
//Credenciais do Usuário
type CredenciaisLiturgiaProps = Omit<ILiturgia, "id">;

export {
    ILiturgia,
    CriarLiturgiaProps,
    RecuperarLiturgiaProps,
    CredenciaisLiturgiaProps
}