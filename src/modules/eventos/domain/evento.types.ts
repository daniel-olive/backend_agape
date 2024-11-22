interface IEvento{
    id?: string;
    titulo: string;
    descricao: string;
    local: string;
    data: string;
    horario: string;
    banner: string | null | undefined;
}

type CriarEventoProps = Omit<IEvento, "id">

type EditarEventoProps = Omit<IEvento, "id">



type RecuperarEventoProps = IEvento & {
    id: NonNullable<IEvento['id']>
};
export{IEvento, CriarEventoProps, EditarEventoProps, RecuperarEventoProps}