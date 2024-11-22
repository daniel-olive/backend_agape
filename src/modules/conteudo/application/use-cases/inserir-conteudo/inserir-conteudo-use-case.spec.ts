import { Conteudo } from "../../../../../modules/conteudo/domain/conteudo.entity";
import { IConteudoRepository } from "../../../../../modules/conteudo/domain/conteudo.repository.interface";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { InserirConteudoUseCase } from "./inserir-conteudo-use-case";
import { CriarConteudoProps, IConteudo } from "../../../../../modules/conteudo/domain/conteudo.types";



let conteudoRepositorioMock: MockProxy<IConteudoRepository<Conteudo>>;;
let inserirConteudoUseCase: InserirConteudoUseCase;

describe('Caso de Uso: Inserir Conteudo', () => {

    beforeAll(async () => {
        conteudoRepositorioMock = mock<IConteudoRepository<Conteudo>>();
        inserirConteudoUseCase = new InserirConteudoUseCase(conteudoRepositorioMock);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(conteudoRepositorioMock);
    });

    test('Deve Inserir Um Conteudo', async () => {

        //Dado (Given)
        const conteudoInputDTO: CriarConteudoProps = {
            titulo: 'Evento Teste do Projeto',
            descricao: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            categoria: "categoria teste",
            autor:"Deivid Pontes",
                banner:"https://aajajajjaja.com"
        };

        const conteudo: Conteudo = Conteudo.criar(conteudoInputDTO);

        conteudoRepositorioMock.inserir.mockResolvedValue(conteudo);

        //Quando (When)
		const conteudoOutputDTO: IConteudo = await inserirConteudoUseCase.execute(conteudo);

        //Então (Then)
		expect(conteudoOutputDTO).toBeDefined();
        expect(conteudoOutputDTO).toMatchObject(
            expect.objectContaining({
                id:expect.any(String),
                titulo:expect.any(String),
                descricao:expect.any(String)
            })
        );
        expect(conteudoRepositorioMock.inserir).toHaveBeenCalledTimes(1);

    });

});