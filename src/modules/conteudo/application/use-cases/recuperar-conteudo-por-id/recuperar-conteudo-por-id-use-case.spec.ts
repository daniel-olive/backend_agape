import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { IConteudo } from "../../../../../modules/conteudo/domain/conteudo.types";
import { IConteudoRepository } from "../../../../../modules/conteudo/domain/conteudo.repository.interface";
import { Conteudo } from "../../../../../modules/conteudo/domain/conteudo.entity";
import { RecuperarConteudoPorIdUseCase } from "./recuperar-conteudo-por-id-use-case";
import { ConteudoApplicationExceptions } from "../../conteudo.application.exception";



let conteudoRepositorioMock: MockProxy<IConteudoRepository<Conteudo>>;;
let recuperarConteudoPorIdUseCase: RecuperarConteudoPorIdUseCase;

describe('Caso de Uso: Recuperar Conteudo por ID', () => {

    beforeAll(async () => {
        conteudoRepositorioMock = mock<IConteudoRepository<Conteudo>>();
        recuperarConteudoPorIdUseCase = new RecuperarConteudoPorIdUseCase(conteudoRepositorioMock);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(conteudoRepositorioMock);
    });

    test('Deve Recuperar Um Conteudo por UUID', async () => {

        //Dado (Given)
        const conteudoInputDTO = {
            id: "2a013b24-8dc5-4198-946b-7e1a1c7f2bfd",
            titulo: 'Acampamento na Chacara Agape',
            descricao: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            categoria: "categoria teste",
            autor:"Deivid Pontes",
            banner:"https://aajajajjaja.com",
            publicadoEm: new Date() // ou a data que desejar
        };

        conteudoRepositorioMock.existe.mockResolvedValue(true);

        conteudoRepositorioMock.recuperarPorUuid.mockResolvedValue(Conteudo.recuperar(conteudoInputDTO));

        //Quando (When)
        const conteudoOutputDTO: IConteudo = await recuperarConteudoPorIdUseCase.execute(conteudoInputDTO.id);

        //Então (Then)
        expect(conteudoOutputDTO).toEqual(conteudoInputDTO);
        expect(conteudoRepositorioMock.existe).toHaveBeenCalledTimes(1);
        expect(conteudoRepositorioMock.recuperarPorUuid).toHaveBeenCalledTimes(1);

    });

    test('Deve Lançar uma Exceção ao Tentar Recuperar uma Categoria que Não Existe', async () => {

        //Dado (Given)
        const conteudoInputDTO = {
            id: "2a013b24-8dc5-4198-946b-7e1a1c7f2bfd",
            titulo: 'Acampamento na Chacara Agape',
            descricao: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            categoria: "categoria teste"
        };

        conteudoRepositorioMock.existe.mockResolvedValue(false);

        //Quando (When) e Então (Then)
        await expect(() => recuperarConteudoPorIdUseCase.execute(conteudoInputDTO.id))
            .rejects
            .toThrowError(ConteudoApplicationExceptions.ConteudoNaoEncontrado);

    });

});