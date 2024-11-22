import { Mock, afterEach, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { Request, Response } from "express";
import { CriarConteudoProps } from "../../../../../../modules/conteudo/domain/conteudo.types";
import { InserirConteudoUseCase } from "../../../../../../modules/conteudo/application/use-cases/inserir-conteudo/inserir-conteudo-use-case";
import { InserirConteudoExpressController } from "./inserir-conteudo.express.controller";


let inserirConteudoUseCaseMock:  MockProxy<InserirConteudoUseCase>;
let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let inserirEventoController: InserirConteudoExpressController;

describe('Controller Express: Inserir Conteudo por ID', () => {

    beforeAll(async () => {
        inserirConteudoUseCaseMock = mock<InserirConteudoUseCase>();
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        inserirEventoController = new InserirConteudoExpressController(inserirConteudoUseCaseMock);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(inserirConteudoUseCaseMock);
    });

    test('Deve Inserir Uma Conteudo por UUID', async () => {

        //Dado (Given)
        const conteudoInputDTO: CriarConteudoProps = {
            titulo: "Criando Conteudo",
            descricao: "teste 222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222",
            categoria: "categoria teste",
            autor:"Deivid Pontes",
            banner:"https://aajajajjaja.com"
        };

        requestMock.body = conteudoInputDTO;
        inserirConteudoUseCaseMock.execute.mockResolvedValue(conteudoInputDTO);
        responseMock.status.mockReturnThis();

        //Quando (When)
        await inserirEventoController.inserir(requestMock, responseMock, nextMock);

        //Então (Then)
        expect(inserirConteudoUseCaseMock.execute).toHaveBeenCalledWith(conteudoInputDTO);
        expect(responseMock.status).toHaveBeenCalledWith(200);
        expect(responseMock.json).toHaveBeenCalledWith(conteudoInputDTO);
        expect(nextMock).not.toHaveBeenCalled();

    });

});